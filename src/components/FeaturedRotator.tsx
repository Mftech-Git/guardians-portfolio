import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Workflow } from 'lucide-react'
import { projects, ORGS } from '../data/projects'

// Three of the showcase projects, in random order. Chosen once per page load.
const showcase = projects.filter(p => p.rotator && p.org)
const picks = [...showcase].sort(() => Math.random() - 0.5).slice(0, 3)

// Metrics that read weakly as a headline number
const HIDE_METRICS = ['Timeline']

export default function FeaturedRotator() {
  const [active, setActive] = useState(0)
  const p = picks[active]
  if (!p || !p.org) return null
  const org = ORGS[p.org]
  const metrics = p.metrics.filter(m => !HIDE_METRICS.includes(m.label)).slice(0, 3)

  return (
    <div className="relative p-6 sm:p-8 bg-gradient-to-br from-guardian-navy to-guardian-black border border-guardian-trace/50 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 circuit-bg opacity-20" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-guardian-gold/10 border border-guardian-gold/30 rounded-full text-guardian-gold text-sm">
            <Workflow size={14} />
            Featured Projects
          </div>
          <div role="tablist" aria-label="Featured projects" className="flex flex-wrap gap-2">
            {picks.map((tab, i) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                  i === active
                    ? 'bg-guardian-cyan/20 border-guardian-cyan/60 text-guardian-cyan'
                    : 'border-guardian-trace/50 text-gray-400 hover:text-white hover:border-guardian-cyan/40'
                }`}
              >
                {tab.shortTitle ?? tab.title}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2 text-sm">
                <span className="font-mono text-xs uppercase tracking-widest text-guardian-gold">{p.org}</span>
                <span className="text-gray-400">
                  {org.name} | {org.period}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">{p.title}</h3>
              <p className="text-gray-400 mb-5 leading-relaxed">{p.description}</p>
              <ul className="space-y-2 mb-6">
                {p.highlights.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 bg-guardian-cyan rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to={`/projects#${p.id}`} className="btn-primary inline-flex items-center gap-2">
                Read full project
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 content-start">
              {metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-lg border border-guardian-trace/40 bg-guardian-black/40">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-guardian-cyan whitespace-nowrap">{m.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
