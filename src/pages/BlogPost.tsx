import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Tag, Clock, Calendar } from 'lucide-react'
import { getPost, type Post } from '../lib/posts'

// Lightweight markdown renderer — no external deps
function renderMarkdown(md: string): string {
  return md
    .replace(/^#{6}\s(.+)/gm, '<h6>$1</h6>')
    .replace(/^#{5}\s(.+)/gm, '<h5>$1</h5>')
    .replace(/^#{4}\s(.+)/gm, '<h4>$1</h4>')
    .replace(/^#{3}\s(.+)/gm, '<h3>$1</h3>')
    .replace(/^#{2}\s(.+)/gm, '<h2>$1</h2>')
    .replace(/^#{1}\s(.+)/gm, '<h1>$1</h1>')
    .replace(/```(\w*)\n([\s\S]*?)```/gm, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^>\s(.+)/gm, '<blockquote>$1</blockquote>')
    .replace(/^\s*[-*]\s+(.+)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>(\n|$))+/g, (m) => `<ul>${m}</ul>`)
    .replace(/^\d+\.\s+(.+)/gm, '<li>$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/^---$/gm, '<hr />')
    .replace(/^(?!<[a-z]).+/gm, (line) => line.trim() ? `<p>${line}</p>` : '')
    .replace(/\n{2,}/g, '\n')
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<Post | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    const found = getPost(slug)
    if (!found) setNotFound(true)
    else setPost(found)
  }, [slug])

  if (notFound || (!post && slug)) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-guardian-cyan mb-4">404</p>
          <p className="text-gray-400 mb-8">Post not found.</p>
          <Link to="/blog" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} />Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  if (!post) return null

  return (
    <div className="pt-16 min-h-screen">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-guardian-black via-transparent to-guardian-black" />
        {post.feature_image && (
          <div className="absolute inset-0">
            <img src={post.feature_image} alt="" className="w-full h-full object-cover opacity-10" />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-guardian-cyan transition-colors text-sm mb-8 group">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Field Notes
            </Link>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-guardian-cyan/10 border border-guardian-cyan/20 rounded text-guardian-cyan text-xs font-mono">
                  <Tag size={10} />{tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
              <span className="flex items-center gap-2"><Calendar size={14} className="text-guardian-gold" />{formatDate(post.date)}</span>
              <span className="flex items-center gap-2"><Clock size={14} className="text-guardian-cyan" />{post.reading_time} min read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {post.feature_image && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <img src={post.feature_image} alt={post.title} className="w-full rounded-lg border border-guardian-trace/50" />
        </div>
      )}

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"
      >
        <div className="prose-guardian" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body) }} />
        <div className="mt-16 pt-8 border-t border-guardian-trace/30 flex justify-between items-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-guardian-cyan transition-colors text-sm group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            All Posts
          </Link>
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Go Back</button>
        </div>
      </motion.article>
    </div>
  )
}
