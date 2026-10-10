import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { projects } from '../data/projects'

export default function Projects() {
  const { hash } = useLocation()

  // Scroll to a project when arriving from a stat link (/projects#id)
  useEffect(() => {
    if (!hash) return
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 350)
    return () => clearTimeout(t)
  }, [hash])

  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">My</span>{' '}
            <span className="text-guardian-cyan">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Real-world projects I've delivered - from enterprise migrations to cloud modernization
            to building infrastructure from scratch.
          </p>
        </motion.div>

        {/* Featured Projects */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-white mb-8 heading-accent">
            Featured Projects
          </h2>
          <div className="space-y-8">
            {featuredProjects.map((project, i) => (
              <motion.article
                key={project.id}
                id={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="scroll-mt-24 p-6 sm:p-8 bg-guardian-navy/50 border border-guardian-trace/50 rounded-xl hover:border-guardian-cyan/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-guardian-cyan/10 rounded-lg">
                        <project.icon className="text-guardian-cyan" size={28} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.slice(0, 5).map(tag => (
                            <span key={tag} className="px-2 py-0.5 bg-guardian-trace/30 text-guardian-cyan text-xs rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {project.longDescription}
                    </p>
                    <div className="space-y-2">
                      <h4 className="font-display text-sm uppercase tracking-wider text-guardian-gold">
                        Key Accomplishments
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {project.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 bg-guardian-cyan rounded-full mt-1.5 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="lg:w-48 flex-shrink-0">
                    <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="text-center lg:text-left">
                          <div className="font-display text-2xl font-bold text-guardian-cyan">{m.value}</div>
                          <div className="text-xs text-gray-500 uppercase tracking-wider">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section>
          <h2 className="font-display text-2xl font-bold text-white mb-8 heading-accent">
            Other Projects
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project, i) => (
              <motion.article
                key={project.id}
                id={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="scroll-mt-24 p-6 bg-guardian-navy/30 border border-guardian-trace/30 rounded-lg hover:border-guardian-cyan/30 transition-all duration-300 card-scan"
              >
                <div className="p-2 bg-guardian-cyan/10 rounded-lg w-fit mb-4">
                  <project.icon className="text-guardian-cyan" size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-guardian-trace/20 text-gray-400 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                {project.metrics && (
                  <div className="flex gap-4 mt-4 pt-4 border-t border-guardian-trace/20">
                    {project.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <div className="font-display text-lg font-bold text-guardian-cyan">{m.value}</div>
                        <div className="text-xs text-gray-500">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
