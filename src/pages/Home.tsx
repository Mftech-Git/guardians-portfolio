import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Server,
  Code,
  ArrowRight,
  ArrowUpRight,
  Network,
  Cloud,
} from 'lucide-react'
import Terminal from '../components/Terminal'
import FeaturedRotator from '../components/FeaturedRotator'
import { projects } from '../data/projects'

// Two fixed headline stats plus two picked at random from the pool.
// Chosen once per page load, and each links to its source project.
const headlineProjects = projects.filter(p => p.headline)
const fixedStats = headlineProjects.filter(p => p.headline?.fixed)
const pool = headlineProjects.filter(p => !p.headline?.fixed)
const picked = [...pool].sort(() => Math.random() - 0.5).slice(0, 2)
const stats = [...fixedStats, ...picked].map(p => ({
  id: p.id,
  value: p.headline!.value,
  label: p.headline!.label,
  to: p.hasArticle ? `/projects/${p.id}` : `/projects#${p.id}`,
}))

const skills = [
  { icon: Cloud, label: 'Microsoft 365', desc: 'Exchange Online, Entra ID, SharePoint, Teams, Intune, Purview' },
  { icon: Server, label: 'Infrastructure', desc: 'Windows Server, AD, GPO, Hyper-V, Veeam, Storage' },
  { icon: Code, label: 'Automation', desc: 'PowerShell, Python, SmartDeploy, WDS, PXE, BIOS Tagging' },
  { icon: Network, label: 'Networking', desc: 'UniFi, Sophos, FortiGate, VLANs, VPN, 802.1X' },
]

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-guardian-black via-transparent to-guardian-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-guardian-cyan/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-guardian-gold/5 rounded-full blur-3xl animate-pulse animation-delay-500" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid xl:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-guardian-cyan/10 border border-guardian-cyan/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-guardian-cyan rounded-full animate-pulse" />
                <span className="text-guardian-cyan text-sm font-mono">Available for side projects</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
                <span className="text-white">Levi Oniszko</span>
              </h1>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">
                <span className="text-guardian-cyan">M365 &amp; Infrastructure</span>{' '}
                <span className="text-guardian-gold">Specialist</span>
              </h2>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed max-w-xl">
                Systems administrator with 6+ years in enterprise IT, specializing in
                Microsoft 365 administration, Windows infrastructure, and PowerShell automation.
                I solve problems at scale and leave every environment better than I found it.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
                  View My Work
                  <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
                  Get In Touch
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-12 pt-8 border-t border-guardian-trace/30">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Link
                        to={stat.to}
                        title="See the project behind this stat"
                        className="group relative block h-full p-3 pr-7 rounded-lg border border-guardian-trace/40 bg-guardian-navy/40 hover:border-guardian-cyan/60 hover:bg-guardian-navy/70 transition-all"
                      >
                        <ArrowUpRight
                          size={14}
                          className="absolute top-2.5 right-2.5 text-guardian-cyan/40 group-hover:text-guardian-gold transition-colors"
                        />
                        <div className="stat-value sm:!text-2xl whitespace-nowrap group-hover:text-guardian-gold transition-colors">
                          {stat.value}
                        </div>
                        <div className="stat-label min-h-[2.5rem] leading-5 group-hover:text-gray-300 transition-colors">
                          {stat.label}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-3 text-xs font-mono text-gray-500">Select a stat to see the project behind it.</p>
              </div>
            </motion.div>

            {/* Right Content - Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center xl:justify-end"
            >
              <Terminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Technologies */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
            <span className="text-white">Core</span>{' '}
            <span className="text-guardian-cyan">Technologies</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
            {skills.map((skill) => (
              <div key={skill.label} className="border-l-2 border-guardian-trace/60 pl-4">
                <h3 className="flex items-center gap-2 font-display text-base font-semibold text-white mb-1.5">
                  <skill.icon className="text-guardian-cyan" size={16} />
                  {skill.label}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 bg-guardian-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedRotator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-white">Ready to</span>{' '}
            <span className="text-guardian-gold">Work Together?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            I work a full-time IT role during the week, and I make time on the side for the right
            projects in Microsoft 365, cloud infrastructure, and automation. I have also mentored and
            trained IT staff, so if you want a second set of eyes or help getting your team up to speed,
            get in touch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/resume" className="btn-primary">View Resume</Link>
            <Link to="/contact" className="btn-secondary">Contact Me</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
