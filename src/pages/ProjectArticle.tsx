import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Tag, Building2 } from 'lucide-react'
import { projects } from '../data/projects'
import { renderMarkdown } from '../lib/markdown'

export default function ProjectArticle() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((p) => p.id === id && p.hasArticle)

  if (!project) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-display text-4xl text-guardian-cyan mb-4">404</p>
          <p className="text-gray-400 mb-8">That write-up doesn't exist yet.</p>
          <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      <section className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-guardian-black via-transparent to-guardian-black" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-guardian-cyan transition-colors text-sm mb-6 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              All Projects
            </Link>

            {project.employer && (
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-sm">
                <Building2 size={14} className="text-guardian-gold" />
                <span className="font-mono text-xs uppercase tracking-widest text-guardian-gold">
                  {project.employerShort}
                </span>
                <span className="text-gray-400">
                  {project.employer}
                  {project.period ? ` | ${project.period}` : ''}
                </span>
              </div>
            )}

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-6">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-guardian-cyan/10 border border-guardian-cyan/20 rounded text-guardian-cyan text-xs font-mono"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>

            {project.metrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {project.metrics.map((m) => (
                  <div key={m.label} className="p-4 rounded-lg border border-guardian-trace/40 bg-guardian-navy/40">
                    <div className="font-display text-2xl sm:text-3xl font-bold text-guardian-cyan whitespace-nowrap">
                      {m.value}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
      >
        <div className="prose-guardian" dangerouslySetInnerHTML={{ __html: renderMarkdown(project.body) }} />
        <div className="mt-12 pt-6 border-t border-guardian-trace/30">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-guardian-cyan transition-colors text-sm group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            All Projects
          </Link>
        </div>
      </motion.article>
    </div>
  )
}
