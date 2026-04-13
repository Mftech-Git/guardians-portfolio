import { motion } from 'framer-motion'
import {
  Award,
  Heart,
  MapPin,
  CheckCircle,
  GraduationCap,
} from 'lucide-react'

const timeline = [
  {
    year: 'Jul 2024 – Jan 2026',
    title: 'Systems Administrator',
    company: 'Arizona Community Physicians',
    description: 'Led Windows 11 migration across 48 medical sites, deploying 1,200+ endpoints with custom PowerShell automation that slashed deployment time by 87%.',
    highlights: ['W11 Migration', 'PowerShell Automation', 'Snipe-IT', 'SmartDeploy'],
  },
  {
    year: 'Oct 2023 – Jul 2024',
    title: 'Tier II/III Engineer',
    company: 'InTegriLogic',
    description: 'Supported 80+ enterprise clients in an MSP environment. M365 administration, network infrastructure, and endpoint security across diverse environments.',
    highlights: ['MSP Operations', 'M365 Admin', 'Networking', 'Endpoint Security'],
  },
  {
    year: 'Apr 2022 – Aug 2023',
    title: 'IT Director',
    company: 'Old Pueblo Community Services',
    description: 'Built the organization\'s first internal IT department from scratch. Achieved IT Director title by age 28 with no degree. Implemented SmartDeploy/WDS automation cutting deployment from 2 hours to under 20 minutes.',
    highlights: ['IT Leadership', 'Dept. Creation', 'SmartDeploy/WDS', 'Budget Management'],
  },
  {
    year: 'Nov 2021 – Apr 2022',
    title: 'IT Support Specialist',
    company: 'La Frontera',
    description: 'Technical support and infrastructure maintenance for healthcare organization.',
    highlights: ['Healthcare IT', 'Technical Support'],
  },
  {
    year: 'Feb 2020 – Jul 2021',
    title: 'IT Engineer',
    company: 'Tech Solutions',
    description: 'Foundation role covering systems administration, networking, and end-user support.',
    highlights: ['Systems Admin', 'Networking', 'End-User Support'],
  },
]

const certifications = [
  { name: 'CompTIA A+', date: 'Sep 2023' },
  { name: 'Addigy Certified Expert', date: 'Nov 2023' },
  { name: 'Addigy Academy Basics', date: 'Nov 2023' },
  { name: 'RightFax Advanced Administrator', date: '' },
]

export default function About() {
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
            <span className="text-white">About</span>{' '}
            <span className="text-guardian-cyan">Me</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            I'm Levi Oniszko, an IT professional who reached IT Director by 28 without a college degree.
            I believe in proving competence through results, not credentials.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Story */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="font-display text-2xl font-bold text-white mb-6 heading-accent">
                My Story
              </h2>
              <div className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  I started my IT career with a simple belief: <span className="text-white">if something takes too long,
                  automate it</span>. That mindset has driven every role I've held, from helpdesk to IT Director.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  My most recent role at Arizona Community Physicians had me leading a Windows 11 migration
                  across 48 medical sites, deploying over 1,200 machines. The team dreaded the auto-logon
                  user creation process — it was tedious, error-prone, and slow. So I automated it with
                  PowerShell. Deployment tasks that consumed 2 hours per machine were reduced to 15 minutes, hands-free.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Before that, at Old Pueblo Community Services, I built their first internal IT department from
                  the ground up and was promoted to IT Director within months. I implemented SmartDeploy and WDS
                  automation that cut imaging time from 2 hours to under 20 minutes — a pattern I've repeated
                  in every org I've touched.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  I didn't go the traditional route — no degree, just certifications and a track record. I made
                  IT Director by 28 because I focused on <span className="text-guardian-gold">solving real problems</span> and
                  <span className="text-guardian-gold"> delivering results</span>.
                </p>
              </div>
            </motion.section>

            {/* Timeline */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="font-display text-2xl font-bold text-white mb-6 heading-accent">
                Experience
              </h2>
              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="relative pl-8 border-l-2 border-guardian-trace/50 hover:border-guardian-cyan/50 transition-colors"
                  >
                    <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] bg-guardian-navy border-2 border-guardian-cyan rounded-full" />
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono text-sm text-guardian-cyan">{item.year}</span>
                      <span className="text-gray-600">&bull;</span>
                      <span className="text-gray-400 text-sm">{item.company}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-1 bg-guardian-trace/30 text-gray-300 text-xs rounded"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Philosophy */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="font-display text-2xl font-bold text-white mb-6 heading-accent">
                My Philosophy
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'Automate Everything', desc: 'If you do it twice, script it. Time saved compounds.' },
                  { title: 'Document Obsessively', desc: 'Future you will thank present you. So will your team.' },
                  { title: 'Results Over Credentials', desc: 'Certifications open doors. Competence keeps them open.' },
                  { title: 'Mend and Defend', desc: 'Fix problems before they escalate. Protect systems proactively.' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-4 bg-guardian-navy/30 border border-guardian-trace/30 rounded-lg"
                  >
                    <h3 className="font-display text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg"
            >
              <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="text-guardian-gold" size={20} />
                Quick Facts
              </h3>
              <ul className="space-y-3">
                {[
                  'IT Director by age 28',
                  'No college degree — results-driven',
                  '1,200+ machines deployed',
                  '48 sites managed simultaneously',
                  '6+ years in enterprise IT',
                ].map((fact) => (
                  <li key={fact} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="text-guardian-cyan mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-400">{fact}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg"
            >
              <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="text-guardian-gold" size={20} />
                Certifications
              </h3>
              <ul className="space-y-2">
                {certifications.map((cert) => (
                  <li key={cert.name} className="text-sm text-gray-400">
                    {cert.name}
                    {cert.date && <span className="text-guardian-cyan/60 ml-1">({cert.date})</span>}
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-guardian-trace/30">
                <p className="text-xs text-gray-500">
                  WGU — BS Information Technology (on hiatus)
                </p>
              </div>
            </motion.div>

            {/* Personal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg"
            >
              <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Heart className="text-guardian-gold" size={20} />
                Personal
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin className="text-guardian-cyan mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-gray-400">Based in Phoenix, Arizona</span>
                </li>
              </ul>
            </motion.div>

            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-gradient-to-br from-guardian-cyan/10 to-guardian-gold/5 border border-guardian-cyan/30 rounded-lg"
            >
              <h3 className="font-display text-lg font-semibold text-white mb-2">
                Guardians AZ
              </h3>
              <p className="text-guardian-cyan text-xs uppercase tracking-widest mb-3">
                "To Mend and Defend"
              </p>
              <p className="text-gray-400 text-sm">
                Inspired by the Canadian show <em>ReBoot</em> — a nod to the guardian code
                that protects systems and users. It's what I do.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
