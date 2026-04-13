// Ghost Content API client
// No SDK needed — Ghost's API is just REST + JSON

const GHOST_URL = import.meta.env.VITE_GHOST_URL || 'http://localhost:2368'
const GHOST_KEY = import.meta.env.VITE_GHOST_CONTENT_KEY || ''

export interface GhostPost {
  id: string
  slug: string
  title: string
  excerpt: string
  html: string
  feature_image: string | null
  published_at: string
  reading_time: number
  tags: { name: string; slug: string }[]
  featured: boolean
}

export interface GhostTag {
  name: string
  slug: string
  count?: { posts: number }
}

interface GhostResponse<T> {
  posts?: T[]
  tags?: T[]
  meta?: {
    pagination: {
      page: number
      limit: number
      pages: number
      total: number
    }
  }
}

async function ghostFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T | null> {
  if (!GHOST_KEY) return null

  const url = new URL(`/ghost/api/content/${endpoint}/`, GHOST_URL)
  url.searchParams.set('key', GHOST_KEY)
  
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }

  try {
    const res = await fetch(url.toString())
    if (!res.ok) {
      console.warn(`Ghost API ${res.status}: ${endpoint}`)
      return null
    }
    return await res.json()
  } catch (err) {
    console.warn('Ghost API unreachable:', err)
    return null
  }
}

/**
 * Fetch all published posts
 */
export async function getPosts(options: {
  limit?: number
  page?: number
  tag?: string
  featured?: boolean
} = {}): Promise<{ posts: GhostPost[]; total: number }> {
  const params: Record<string, string> = {
    include: 'tags',
    fields: 'id,slug,title,excerpt,feature_image,published_at,reading_time,featured',
    limit: String(options.limit || 15),
    order: 'published_at desc',
  }

  if (options.page) params.page = String(options.page)

  // Build filter string
  const filters: string[] = []
  if (options.tag) filters.push(`tag:${options.tag}`)
  if (options.featured) filters.push('featured:true')
  if (filters.length) params.filter = filters.join('+')

  const data = await ghostFetch<GhostResponse<GhostPost>>('posts', params)
  
  return {
    posts: data?.posts || [],
    total: data?.meta?.pagination?.total || 0,
  }
}

/**
 * Fetch a single post by slug (includes full HTML content)
 */
export async function getPost(slug: string): Promise<GhostPost | null> {
  const data = await ghostFetch<GhostResponse<GhostPost>>(`posts/slug/${slug}`, {
    include: 'tags',
  })
  return data?.posts?.[0] || null
}

/**
 * Fetch all tags with post counts
 */
export async function getTags(): Promise<GhostTag[]> {
  const data = await ghostFetch<GhostResponse<GhostTag>>('tags', {
    include: 'count.posts',
    limit: 'all',
    order: 'count.posts desc',
  })
  return data?.tags || []
}

/**
 * Check if Ghost is configured and reachable
 */
export function isGhostConfigured(): boolean {
  return Boolean(GHOST_KEY)
}
