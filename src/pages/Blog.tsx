import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Tag, Clock, Star, PenLine } from 'lucide-react'
import { getPosts, getTags, hasPosts, type Post } from '../lib/posts'

const PLACEHOLDER_POSTS: Post[] = [
  {
    slug: 'windows-11-enterprise-migration-lessons',
    title: 'Lessons From a 1,200-Machine Windows 11 Migration',
    excerpt: 'What actually goes wrong when you push Win11 to 48 medical sites simultaneously — and how PowerShell automation saved us from ourselves.',
    body: '',
    date: '2024-09-15T00:00:00.000Z',
    reading_time: 8,
    tags: ['Windows', 'PowerShell'],
    featured: true,
  },
  {
    slug: 'm365-licensing-audit',
    title: 'How I Found $100K in Unused M365 Licenses in My First Month',
    excerpt: 'A walkthrough of the PowerShell queries and Entra ID reports that exposed ghost accounts, orphaned mailboxes, and license stacking no one knew about.',
    body: '',
    date: '2024-08-01T00:00:00.000Z',
    reading_time: 6,
    tags: ['Microsoft 365', 'Licensing'],
    featured: true,
  },
  {
    slug: 'smartdeploy-wds-powershell',
    title: 'Building a Zero-Touch Deployment Pipeline with SmartDeploy + WDS',
    excerpt: 'From 2-hour manual builds to 15-minute automated deployments. The full stack: WDS, SmartDeploy, PowerShell, BIOS tagging, and Snipe-IT inventory.',
    body: '',
    date: '2024-07-10T00:00:00.000Z',
    reading_time: 10,
    tags: ['Deployment', 'PowerShell'],
    featured: false,
  },
  {
    slug: 'decap-cms-azure-static-web-app',
    title: 'Running a Free Blog CMS on Azure Static Web Apps with Decap',
    excerpt: 'How I wired Decap CMS into my Vite portfolio, stored posts as markdown in GitHub, and got a full editor UI with zero hosting cost.',
    body: '',
    date: '2024-06-20T00:00:00.000Z',
    reading_time: 5,
    tags: ['Azure', 'Decap'],
    featured: false,
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function PostCard({ post, isPlaceholder }: { post: Post; isPlaceholder: boolean }) {
  const inner = (
    <div className="flex flex-col h-full">
      {post.feature_image && !isPlaceholder && (
        <img src={post.feature_image} alt={post.title} className="w-full h-40 object-cover rounded mb-4" />
      )}
      <div className="flex flex-wrap gap-2 mb-3">
        {post.tags.map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-guardian-cyan/10 border border-guardian-cyan/20 rounded text-guardian-cyan text-xs font-mono">
            <Tag size={10} />{tag}
          </span>
        ))}
        {post.featured && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-guardian-gold/10 border border-guardian-gold/30 rounded text-guardian-gold text-xs">
            <Star size={10} />Featured
          </span>
        )}
      </div>
      <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-guardian-cyan transition-colors leading-snug">{post.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-guardian-trace/30">
        <span className="text-gray-500 text-xs">{formatDate(post.date)}</span>
        <span className="flex items-center gap-1 text-xs text-gray-500"><Clock size={12} />{post.reading_time} min</span>
      </div>
    </div>
  )

  if (isPlaceholder) {
    return <div className="group p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg opacity-60 cursor-default card-scan">{inner}</div>
  }

  return (
    <Link to={`/blog/${post.slug}`} className="group p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg hover:border-guardian-cyan/50 transition-all duration-300 card-scan flex flex-col">
      {inner}
    </Link>
  )
}

const PER_PAGE = 9

export default function Blog() {
  const live = hasPosts()
  const allTags = useMemo(() => getTags(), [])
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const { posts, total } = useMemo(() => getPosts({ limit: PER_PAGE, page, tag: activeTag ?? undefined }), [activeTag, page])

  const displayPosts = live ? posts : PLACEHOLDER_POSTS
  const displayTags = live ? allTags : [
    { name: 'Microsoft 365', slug: 'm365', count: 4 },
    { name: 'PowerShell', slug: 'powershell', count: 6 },
    { name: 'Windows', slug: 'windows', count: 3 },
    { name: 'Azure', slug: 'azure', count: 2 },
    { name: 'Deployment', slug: 'deployment', count: 3 },
  ]
  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <div className="pt-16 min-h-screen">
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-guardian-black via-transparent to-guardian-black" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-guardian-cyan/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-guardian-cyan/10 border border-guardian-cyan/30 rounded-full mb-6">
              <PenLine size={14} className="text-guardian-cyan" />
              <span className="text-guardian-cyan text-sm font-mono">
                {live ? `${total} post${total !== 1 ? 's' : ''} published` : 'Blog — Coming Soon'}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Field</span>{' '}<span className="text-guardian-cyan">Notes</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Real-world IT writeups — migrations, automation, M365 deep dives, and whatever I learned the hard way so you don't have to.
            </p>
          </motion.div>
        </div>
      </section>

      {!live && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex items-start gap-3 p-4 bg-guardian-gold/5 border border-guardian-gold/30 rounded-lg">
            <BookOpen size={18} className="text-guardian-gold mt-0.5 shrink-0" />
            <div>
              <p className="text-guardian-gold text-sm font-display font-semibold mb-1">No Posts Yet</p>
              <p className="text-gray-400 text-sm">
                These are placeholder posts. Go to{' '}
                <a href="/admin" className="text-guardian-cyan hover:underline font-mono">/admin</a>
                {' '}to write your first post — it'll publish automatically via GitHub.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="p-5 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg">
                <h3 className="font-display text-xs uppercase tracking-widest text-guardian-gold mb-4 flex items-center gap-2">
                  <Tag size={12} />Topics
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => { setActiveTag(null); setPage(1) }}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center justify-between ${activeTag === null ? 'bg-guardian-cyan/10 text-guardian-cyan border border-guardian-cyan/30' : 'text-gray-400 hover:text-white hover:bg-guardian-trace/30'}`}
                  >
                    <span>All Posts</span>
                    <span className="text-xs text-gray-500">{live ? total : PLACEHOLDER_POSTS.length}</span>
                  </button>
                  {displayTags.map((tag) => (
                    <button
                      key={tag.slug}
                      onClick={() => { if (live) { setActiveTag(tag.slug); setPage(1) } }}
                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center justify-between ${activeTag === tag.slug ? 'bg-guardian-cyan/10 text-guardian-cyan border border-guardian-cyan/30' : 'text-gray-400 hover:text-white hover:bg-guardian-trace/30'} ${!live ? 'cursor-default' : ''}`}
                    >
                      <span>{tag.name}</span>
                      <span className="text-xs text-gray-500">{tag.count}</span>
                    </button>
                  ))}
                </div>
              </div>
              <a href="/admin" className="flex items-center gap-2 w-full px-4 py-3 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg text-gray-400 hover:text-guardian-cyan hover:border-guardian-cyan/30 transition-all text-sm">
                <PenLine size={14} />Write a Post
              </a>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              {displayPosts.map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <PostCard post={post} isPlaceholder={!live} />
                </motion.div>
              ))}
            </motion.div>

            {live && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-4 py-2 text-sm font-display uppercase tracking-wider text-gray-400 border border-guardian-trace/50 rounded hover:text-guardian-cyan hover:border-guardian-cyan/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all">Prev</button>
                <span className="text-gray-500 text-sm font-mono px-2">{page} / {totalPages}</span>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-4 py-2 text-sm font-display uppercase tracking-wider text-gray-400 border border-guardian-trace/50 rounded hover:text-guardian-cyan hover:border-guardian-cyan/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all">Next</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
