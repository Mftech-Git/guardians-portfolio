import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Server,
  Code,
  Shield,
  ArrowRight,
  Network,
  Workflow,
  Terminal as TerminalIcon,
  Cpu,
  Cloud,
} from 'lucide-react'
import Terminal from '../components/Terminal'

const stats = [
  { value: '1,200+', label: 'Machines Deployed' },
  { value: '48', label: 'Sites Managed' },
  { value: '6+', label: 'Years Experience' },
  { value: '$100K', label: 'Licensing Saved' },
]

const skills = [
  { icon: Cloud, label: 'Microsoft 365', desc: 'Exchange Online, Entra ID, SharePoint, Teams, Intune, Purview' },
  { icon: Server, label: 'Infrastructure', desc: 'Windows Server, AD, GPO, Hyper-V, Veeam, Storage' },
  { icon: Code, label: 'Automation', desc: 'PowerShell, SmartDeploy, WDS, PXE, BIOS Tagging' },
  { icon: Network, label: 'Networking', desc: 'UniFi, Sophos, FortiGate, VLANs, VPN, 802.1X' },
]

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 circuit-bg opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-guardian-black via-transparent to-guardian-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-guardian-cyan/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-guardian-gold/5 rounded-full blur-3xl animate-pulse animation-delay-500" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-guardian-cyan/10 border border-guardian-cyan/30 rounded-full mb-6">
                <span className="w-2 h-2 bg-guardian-cyan rounded-full animate-pulse" />
                <span className="text-guardian-cyan text-sm font-mono">Available for opportunities</span>
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-guardian-trace/30">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-guardian-cyan/20 rounded-full blur-3xl scale-150" />
                <img
                  src="/logo.png"
                  alt="Mainframe Tech Shield"
                  className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain animate-float"
                />
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4">
                    <TerminalIcon className="text-guardian-cyan/60" size={24} />
                  </div>
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }}>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4">
                    <Cpu className="text-guardian-gold/60" size={24} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-guardian-cyan to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Interactive Terminal Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-guardian-black via-guardian-navy/20 to-guardian-black" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-white">Explore My</span>{' '}
              <span className="text-guardian-cyan">Background</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Type <code className="text-guardian-cyan font-mono bg-guardian-navy/50 px-2 py-0.5 rounded">help</code> to
              see available commands. Try <code className="text-guardian-cyan font-mono bg-guardian-navy/50 px-2 py-0.5 rounded">m365</code>,{' '}
              <code className="text-guardian-cyan font-mono bg-guardian-navy/50 px-2 py-0.5 rounded">skills</code>, or{' '}
              <code className="text-guardian-cyan font-mono bg-guardian-navy/50 px-2 py-0.5 rounded">experience</code>.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Terminal />
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-white">Core</span>{' '}
              <span className="text-guardian-cyan">Expertise</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Deep specialization in Microsoft 365 and Windows infrastructure. I learn what needs to be learned and deliver.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg hover:border-guardian-cyan/50 transition-all duration-300 card-scan"
              >
                <div className="w-12 h-12 bg-guardian-cyan/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-guardian-cyan/20 transition-colors">
                  <skill.icon className="text-guardian-cyan" size={24} />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">
                  {skill.label}
                </h3>
                <p className="text-gray-400 text-sm">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project Teaser */}
      <section className="py-24 bg-guardian-navy/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-8 sm:p-12 bg-gradient-to-br from-guardian-navy to-guardian-black border border-guardian-trace/50 rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 circuit-bg opacity-20" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-guardian-gold/10 border border-guardian-gold/30 rounded-full text-guardian-gold text-sm mb-4">
                  <Workflow size={14} />
                  Featured Project
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                  Windows 11 Enterprise Migration
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Led and executed a comprehensive Windows 11 migration across 48 medical sites
                  at Arizona Community Physicians, deploying 1,200+ machines with custom
                  PowerShell automation that reduced deployment time from 2 hours to 15 minutes per device.
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    'Custom PowerShell automation scripts',
                    'SmartDeploy + WDS integration & optimization',
                    'Automated BIOS asset tagging & site-based naming',
                    'Snipe-IT asset tracking implementation',
                    'Zero disruption to clinical operations',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 bg-guardian-cyan rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/projects" className="btn-primary inline-flex items-center gap-2">
                  View All Projects
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="relative">
                <div className="aspect-video bg-guardian-black/50 rounded-lg border border-guardian-trace/50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <TerminalIcon className="mx-auto text-guardian-cyan mb-4" size={48} />
                    <pre className="font-mono text-xs text-guardian-cyan/80 text-left inline-block">
{`# Deployment automation sample
$sites = Import-Csv "SiteList.csv"
foreach ($site in $sites) {
  $machines = Get-ADComputer -Filter *
    -SearchBase $site.OU
  foreach ($pc in $machines) {
    Deploy-Win11 -Target $pc.Name
    Set-BIOSAssetTag -Serial $pc.Serial
    Update-SnipeIT -Status "Deployed"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-white">Ready to</span>{' '}
              <span className="text-guardian-gold">Work Together?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              I'm currently open to new opportunities in systems administration,
              M365 &amp; cloud infrastructure, or IT leadership roles. Let's discuss how I can help your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/resume" className="btn-primary">View Resume</Link>
              <Link to="/contact" className="btn-secondary">Contact Me</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
