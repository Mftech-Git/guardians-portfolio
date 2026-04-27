// Local markdown post reader — replaces Ghost Content API
// Posts live in src/content/posts/*.md
// Decap CMS writes to that folder via GitHub commits

export interface Post {
  slug: string
  title: string
  excerpt: string
  body: string
  date: string
  tags: string[]
  featured: boolean
  feature_image?: string
  reading_time: number
}

// Vite glob — imports all markdown files as raw strings at build time
const modules = import.meta.glob('/src/content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function estimateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const yamlBlock = match[1]
  const content = match[2]

  // Simple YAML key: value parser (handles strings, booleans, lists)
  const data: Record<string, unknown> = {}
  const lines = yamlBlock.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const kvMatch = line.match(/^(\w+):\s*(.*)$/)
    if (!kvMatch) { i++; continue }

    const key = kvMatch[1]
    const val = kvMatch[2].trim()

    if (val === '') {
      // Could be a list
      const listItems: string[] = []
      i++
      while (i < lines.length && lines[i].match(/^\s*-\s+/)) {
        listItems.push(lines[i].replace(/^\s*-\s+/, '').replace(/^['"]|['"]$/g, ''))
        i++
      }
      data[key] = listItems
      continue
    } else if (val === 'true') {
      data[key] = true
    } else if (val === 'false') {
      data[key] = false
    } else {
      data[key] = val.replace(/^['"]|['"]$/g, '')
    }
    i++
  }

  return { data, content }
}

function slugFromPath(path: string): string {
  return path.replace(/^.*\//, '').replace(/\.md$/, '')
}

function parsePost(path: string, raw: string): Post {
  const { data, content } = parseFrontmatter(raw)
  const slug = slugFromPath(path)

  const tags = Array.isArray(data.tags)
    ? (data.tags as string[])
    : typeof data.tags === 'string'
    ? [data.tags]
    : []

  return {
    slug,
    title: (data.title as string) || 'Untitled',
    excerpt: (data.excerpt as string) || '',
    body: content,
    date: (data.date as string) || new Date().toISOString(),
    tags,
    featured: Boolean(data.featured),
    feature_image: (data.feature_image as string) || undefined,
    reading_time: estimateReadingTime(content),
  }
}

let _cache: Post[] | null = null

function getAllPosts(): Post[] {
  if (_cache) return _cache
  _cache = Object.entries(modules)
    .map(([path, raw]) => parsePost(path, raw))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return _cache
}

export function getPosts(options: {
  limit?: number
  page?: number
  tag?: string
  featured?: boolean
} = {}): { posts: Post[]; total: number } {
  let posts = getAllPosts()

  if (options.tag) {
    posts = posts.filter((p) =>
      p.tags.some((t) => t.toLowerCase() === options.tag!.toLowerCase())
    )
  }
  if (options.featured) {
    posts = posts.filter((p) => p.featured)
  }

  const total = posts.length
  const limit = options.limit || 15
  const page = options.page || 1
  const start = (page - 1) * limit
  posts = posts.slice(start, start + limit)

  return { posts, total }
}

export function getPost(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) || null
}

export function getTags(): { name: string; slug: string; count: number }[] {
  const posts = getAllPosts()
  const counts: Record<string, number> = {}

  for (const post of posts) {
    for (const tag of post.tags) {
      counts[tag] = (counts[tag] || 0) + 1
    }
  }

  return Object.entries(counts)
    .map(([name, count]) => ({ name, slug: name.toLowerCase().replace(/\s+/g, '-'), count }))
    .sort((a, b) => b.count - a.count)
}

export function hasPosts(): boolean {
  return getAllPosts().length > 0
}
