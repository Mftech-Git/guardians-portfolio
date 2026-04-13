import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Tag,
  BookOpen,
  PenTool,
  Ghost,
  ExternalLink,
  Loader2,
} from 'lucide-react'
import {
  getPosts,
  getPost,
  getTags,
  isGhostConfigured,
  type GhostPost,
  type GhostTag,
} from '../lib/ghost'

// ─── Fallback posts (shown when Ghost isn't configured) ─────────────
const placeholderPosts: GhostPost[] = [
  {
    id: 'windows-11-migration-lessons',
    slug: 'windows-11-migration-lessons',
    title: 'Lessons from Deploying 1,200 Windows 11 Machines',
    excerpt:
      'What I learned leading a massive Windows 11 migration across 48 medical sites, and the automation that made it possible.',
    html: '',
    feature_image: null,
    published_at: '2026-02-01T00:00:00.000Z',
    reading_time: 8,
    tags: [
      { name: 'Windows 11', slug: 'windows-11' },
      { name: 'Automation', slug: 'automation' },
      { name: 'Enterprise', slug: 'enterprise' },
    ],
    featured: true,
  },
  {
    id: 'powershell-deployment-scripts',
    slug: 'powershell-deployment-scripts',
    title: 'PowerShell Scripts That Saved My Team Hours',
    excerpt:
      'The auto-logon automation, SmartDeploy integration, and AD scripts that turned 2-hour tasks into 15-minute wins.',
    html: '',
    feature_image: null,
    published_at: '2026-01-15T00:00:00.000Z',
    reading_time: 12,
    tags: [
      { name: 'PowerShell', slug: 'powershell' },
      { name: 'Automation', slug: 'automation' },
      { name: 'Scripts', slug: 'scripts' },
    ],
    featured: true,
  },
  {
    id: 'smartdeploy-wds-guide',
    slug: 'smartdeploy-wds-guide',
    title: 'SmartDeploy + WDS: A Practical Guide',
    excerpt:
      'How I set up SmartDeploy with WDS at two different organizations and the lessons that carried over.',
    html: '',
    feature_image: null,
    published_at: '2026-01-01T00:00:00.000Z',
    reading_time: 10,
    tags: [
      { name: 'SmartDeploy', slug: 'smartdeploy' },
      { name: 'WDS', slug: 'wds' },
      { name: 'Imaging', slug: 'imaging' },
    ],
    featured: false,
  },
  {
    id: 'it-director-no-degree',
    slug: 'it-director-no-degree',
    title: 'How I Became IT Director by 28 Without a Degree',
    excerpt:
      "My unconventional path to IT leadership, and why results matter more than credentials.",
    html: '',
    feature_image: null,
    published_at: '2025-12-15T00:00:00.000Z',
    reading_time: 6,
    tags: [
      { name: 'Career', slug: 'career' },
      { name: 'Leadership', slug: 'leadership' },
      { name: 'Personal', slug: 'personal' },
    ],
    featured: false,
  },
]

// ─── Helpers ────────────────────────────────────────────────────────
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function dayNum(dateString: string) {
  return new Date(dateString).getDate().toString()
}

// ─── Single Post View ───────────────────────────────────────────────
function PostView({ slug, onBack }: { slug: string; onBack: () => void }) {
  const [post, setPost] = useState<GhostPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isGhostConfigured()) {
      const found = placeholderPosts.find((p) => p.slug === slug) || null
      setPost(found)
      setLoading(false)
      return
    }
    getPost(slug).then((p) => {
      setPost(p)
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-guardian-cyan" size={32} />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl font-bold text-white mb-4">Post Not Found</h1>
          <button onClick={onBack} className="btn-primary">← Back to Blog</button>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-guardian-cyan transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Back to Blog
        </button>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span key={tag.slug} className="px-2 py-0.5 bg-guardian-cyan/10 text-guardian-cyan text-xs rounded">
              {tag.name}
            </span>
          ))}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-guardian-trace/30">
          <span className="flex items-center gap-1"><Calendar size={14} /> {formatDate(post.published_at)}</span>
          <span className="flex items-center gap-1"><Clock size={14} /> {post.reading_time} min read</span>
        </div>

        {post.feature_image && (
          <img src={post.feature_image} alt={post.title} className="w-full rounded-xl mb-8 border border-guardian-trace/30" />
        )}

        {post.html ? (
          <div
            className="prose prose-invert prose-cyan max-w-none prose-headings:font-display prose-headings:text-white prose-a:text-guardian-cyan prose-a:no-underline hover:prose-a:underline prose-code:text-guardian-gold prose-code:bg-guardian-navy/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-guardian-navy prose-pre:border prose-pre:border-guardian-trace/30 prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        ) : (
          <div className="p-8 bg-guardian-navy/50 border border-guardian-trace/50 rounded-xl text-center">
            <Ghost className="mx-auto text-guardian-cyan mb-4" size={40} />
            <p className="text-gray-400 mb-2">Full post content will appear here once Ghost CMS is connected.</p>
            <p className="text-gray-500 text-sm">Write and publish this post in your Ghost admin panel.</p>
          </div>
        )}
      </article>
    </motion.div>
  )
}

// ─── Post Card ──────────────────────────────────────────────────────
function PostCard({ post, index, onClick, featured = false }: { post: GhostPost; index: number; onClick: () => void; featured?: boolean }) {
  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={onClick}
        className="group p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-xl hover:border-guardian-cyan/30 transition-all duration-300 card-scan cursor-pointer"
      >
        {post.feature_image && (
          <img src={post.feature_image} alt={post.title} className="w-full h-40 object-cover rounded-lg mb-4 border border-guardian-trace/20" />
        )}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <span key={tag.slug} className="px-2 py-0.5 bg-guardian-cyan/10 text-guardian-cyan text-xs rounded">{tag.name}</span>
          ))}
        </div>
        <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-guardian-cyan transition-colors">{post.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.published_at)}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.reading_time} min read</span>
          </div>
          <ArrowRight size={14} className="text-guardian-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + index * 0.05 }}
      onClick={onClick}
      className="group flex gap-4 p-4 bg-guardian-navy/30 border border-guardian-trace/30 rounded-lg hover:border-guardian-cyan/30 transition-all duration-300 cursor-pointer"
    >
      <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-guardian-trace/20 rounded-lg flex-shrink-0">
        <span className="font-display text-xl font-bold text-guardian-cyan">{dayNum(post.published_at)}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-white font-semibold mb-1 group-hover:text-guardian-cyan transition-colors truncate">{post.title}</h3>
        <p className="text-gray-400 text-sm mb-2 line-clamp-1">{post.excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><Calendar size={12} /> {formatDate(post.published_at)}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {post.reading_time} min read</span>
          <div className="flex gap-1">
            {post.tags.slice(0, 2).map((tag) => (
              <span key={tag.slug} className="text-guardian-cyan">#{tag.slug}</span>
            ))}
          </div>
        </div>
      </div>
      <ArrowRight size={16} className="text-guardian-cyan opacity-0 group-hover:opacity-100 transition-opacity self-center flex-shrink-0" />
    </motion.article>
  )
}

// ─── Main Blog Component ────────────────────────────────────────────
export default function Blog() {
  const [posts, setPosts] = useState<GhostPost[]>([])
  const [tags, setTags] = useState<GhostTag[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [viewingSlug, setViewingSlug] = useState<string | null>(null)
  const [ghostActive, setGhostActive] = useState(false)

  useEffect(() => {
    loadContent()
  }, [activeTag])

  async function loadContent() {
    setLoading(true)

    if (!isGhostConfigured()) {
      let filtered = [...placeholderPosts]
      if (activeTag) {
        filtered = filtered.filter((p) => p.tags.some((t) => t.slug === activeTag))
      }
      setPosts(filtered)
      setTags([
        { name: 'All Posts', slug: '', count: { posts: placeholderPosts.length } },
        { name: 'Automation', slug: 'automation', count: { posts: 2 } },
        { name: 'Career', slug: 'career', count: { posts: 1 } },
        { name: 'Imaging', slug: 'imaging', count: { posts: 1 } },
      ])
      setGhostActive(false)
      setLoading(false)
      return
    }

    setGhostActive(true)
    const [postData, tagData] = await Promise.all([
      getPosts({ tag: activeTag || undefined }),
      getTags(),
    ])
    setPosts(postData.posts)
    setTags([
      { name: 'All Posts', slug: '', count: { posts: postData.total } },
      ...tagData,
    ])
    setLoading(false)
  }

  // Single post view
  if (viewingSlug) {
    return <PostView slug={viewingSlug} onBack={() => setViewingSlug(null)} />
  }

  const featuredPosts = posts.filter((p) => p.featured)
  const ghostUrl = import.meta.env.VITE_GHOST_URL || 'http://localhost:2368'

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mb-16">
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">The</span>{' '}
            <span className="text-guardian-cyan">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Technical deep-dives, automation tips, and lessons learned from the trenches of IT.
          </p>
          {ghostActive && (
            <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
              <Ghost size={12} className="text-guardian-cyan" />
              <span>
                Powered by Ghost CMS —{' '}
                <a href={`${ghostUrl}/ghost`} target="_blank" rel="noopener noreferrer"
                  className="text-guardian-cyan hover:underline inline-flex items-center gap-1">
                  Open Editor <ExternalLink size={10} />
                </a>
              </span>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-12">
          {/* Main */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="animate-spin text-guardian-cyan" size={32} />
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div key={activeTag || 'all'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {/* Featured */}
                  {!activeTag && featuredPosts.length > 0 && (
                    <section className="mb-12">
                      <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <BookOpen className="text-guardian-gold" size={20} />
                        Featured Posts
                      </h2>
                      <div className="grid sm:grid-cols-2 gap-6">
                        {featuredPosts.map((post, i) => (
                          <PostCard key={post.id} post={post} index={i} featured onClick={() => setViewingSlug(post.slug)} />
                        ))}
                      </div>
                    </section>
                  )}

                  {/* All Posts */}
                  <section>
                    <h2 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
                      <PenTool className="text-guardian-gold" size={20} />
                      {activeTag ? `Posts tagged "${tags.find((t) => t.slug === activeTag)?.name || activeTag}"` : 'All Posts'}
                    </h2>
                    {posts.length === 0 ? (
                      <div className="p-8 bg-guardian-navy/30 border border-guardian-trace/30 rounded-xl text-center">
                        <p className="text-gray-400">No posts found{activeTag ? ' for this tag' : ''}.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {posts.map((post, i) => (
                          <PostCard key={post.id} post={post} index={i} onClick={() => setViewingSlug(post.slug)} />
                        ))}
                      </div>
                    )}
                  </section>

                  {/* Ghost CMS hint when not connected */}
                  {!ghostActive && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                      className="mt-12 p-6 bg-guardian-gold/5 border border-guardian-gold/20 rounded-lg text-center">
                      <Ghost className="mx-auto text-guardian-gold mb-3" size={28} />
                      <p className="text-guardian-gold font-display text-lg mb-2">Ghost CMS Ready</p>
                      <p className="text-gray-400 text-sm">
                        These are placeholder posts. Run{' '}
                        <code className="text-guardian-cyan bg-guardian-navy/50 px-1.5 py-0.5 rounded text-xs">docker compose up -d</code>
                        {' '}and configure your Content API key to start publishing real content.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg">
              <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Tag className="text-guardian-gold" size={18} /> Categories
              </h3>
              <ul className="space-y-1">
                {tags.map((tag) => (
                  <li key={tag.slug || 'all'}>
                    <button
                      onClick={() => setActiveTag(tag.slug || null)}
                      className={`w-full flex items-center justify-between py-2 px-3 text-sm rounded transition-colors ${
                        (activeTag === null && !tag.slug) || activeTag === tag.slug
                          ? 'text-guardian-cyan bg-guardian-cyan/10'
                          : 'text-gray-400 hover:text-white hover:bg-guardian-trace/20'
                      }`}
                    >
                      <span>{tag.name}</span>
                      <span className="text-guardian-cyan text-xs">{tag.count?.posts ?? ''}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="p-6 bg-gradient-to-br from-guardian-cyan/10 to-guardian-gold/5 border border-guardian-cyan/30 rounded-lg">
              <h3 className="font-display text-lg font-semibold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm mb-4">Get notified when I publish new posts.</p>
              <input type="email" placeholder="your@email.com"
                className="w-full px-4 py-2 bg-guardian-black/50 border border-guardian-trace/50 rounded text-white text-sm placeholder-gray-500 focus:border-guardian-cyan focus:outline-none mb-3" />
              <button className="w-full btn-primary text-sm">Subscribe</button>
            </motion.div>

            {ghostActive && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="p-4 bg-guardian-navy/30 border border-guardian-trace/30 rounded-lg">
                <a href={`${ghostUrl}/ghost`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-gray-400 hover:text-guardian-cyan transition-colors">
                  <Ghost size={18} />
                  <div>
                    <div className="font-medium text-white">Ghost Admin</div>
                    <div className="text-xs">Write &amp; manage posts</div>
                  </div>
                  <ExternalLink size={14} className="ml-auto" />
                </a>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
