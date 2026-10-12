import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Award,
  MapPin,
  CheckCircle,
  GraduationCap,
  Cloud,
  Users,
  Brain,
  Headphones,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Server,
  Quote,
  Linkedin,
} from 'lucide-react'

// ─── Work history with expandable projects ─────────────────────────
const workHistory = [
  {
    title: 'Remote Senior Escalation Engineer',
    company: '',
    location: 'Remote',
    context: 'Managed services provider - NOC and escalation team',
    projects: [
      { name: 'Escalation Engineering', detail: 'Engineer on a managed services provider\'s NOC and escalation team, handling RMM, EDR, backup, and Microsoft 365 escalations. Converted from contract to full-time ahead of the original six-month term.' },
      { name: 'P1 Incident Response', detail: 'Worked P1 incidents through a structured response process, from first response to post-incident review.' },
      { name: 'Firewall Hardening Project', detail: 'Contributed to an internal firewall hardening project across WatchGuard, FortiGate, and UniFi, building the configuration inventory and running the cross-platform analysis.' },
      { name: 'Endpoint Remediation Documentation', detail: 'Documented an endpoint remediation procedure in the team knowledge base.' },
    ],
  },
  {
    title: 'Systems Administrator',
    company: 'Arizona Community Physicians',
    location: 'Tucson, AZ',
    context: "Arizona's largest physician-owned medical group - 50+ clinics, 800+ employees, HIPAA-regulated",
    projects: [
      { name: 'Windows 11 Enterprise Migration', detail: 'Led deployment of 1,200+ machines across 48 medical sites with zero disruption to clinical operations. Built PowerShell automation suite integrated with SmartDeploy and WDS, cutting per-machine deployment from 2 hours to 15 minutes.' },
      { name: 'M365 Licensing Audit', detail: 'Showed leadership that buying Microsoft 365 direct would cost over $100,000 more every year than staying with the reseller. Documented 100+ unassigned E1 and E3 licenses for reduction at renewal.' },
      { name: 'OneDrive & SharePoint Cloud Migration', detail: 'Led OneDrive migration for all staff from on-premises mapped drives. Assisted with organization-wide SharePoint migration. Produced end-user training videos in Clipchamp and Sway.' },
      { name: 'Sophos Email Security Administration', detail: 'Managed Sophos Email Security end-to-end: policy management, quarantine workflows, mail flow controls, escalation coordination with Exchange Online.' },
      { name: 'User Termination Workflow', detail: 'Designed standardized workflow enforcing immediate session revocation, license reclamation, and data preservation - replacing an inconsistent manual process.' },
      { name: 'BIOS Asset Tagging & Snipe-IT', detail: 'Implemented automated BIOS asset tagging and site-based computer naming standard across all 48 locations. Integrated with Snipe-IT for real-time inventory tracking.' },
      { name: 'Veeam M365 Backup & Storage Migration', detail: 'Managed Veeam Backup for M365 covering Exchange, SharePoint, and OneDrive with tested recovery procedures. Assisted with enterprise storage migration from Pure Storage to TrueNAS.' },
    ],
  },
  {
    title: 'NIST Engineer (Network Infrastructure & Escalations)',
    company: 'InTegriLogic',
    location: 'Tucson, AZ',
    context: 'Healthcare-focused MSP - 80+ clients across medical, legal, financial, and nonprofit sectors',
    projects: [
      { name: 'Multi-Client Escalation Engineering', detail: 'Handled complex ticket escalations across diverse multi-client environments on the network infrastructure team.' },
      { name: 'Sophos Security Stack', detail: 'Administered Sophos security stack for multiple clients. Earned Sophos Certified Engineer credential.' },
      { name: 'M365 Lighthouse & PIM Evaluation', detail: 'Evaluated Microsoft 365 Lighthouse and Privileged Identity Management for prospective client deployments.' },
    ],
  },
  {
    title: 'IT Director',
    company: 'Old Pueblo Community Services',
    location: 'Tucson, AZ',
    context: 'Nonprofit human services - built the organization\'s first internal IT department',
    projects: [
      { name: 'IT Department Creation', detail: 'Built the organization\'s first internal IT department from scratch. Promoted from Lead SysAdmin to IT Director within two weeks based on immediate technical impact.' },
      { name: 'SmartDeploy/WDS Imaging Infrastructure', detail: 'Implemented SmartDeploy and WDS on Hyper-V and Windows Server 2022. Cut machine build times from 2+ hours to under 20 minutes.' },
      { name: 'VoIP Migration', detail: 'Led platform migration to GoTo Connect. Managed IT budget, vendor relationships, and compliance coordination.' },
    ],
  },
  {
    title: 'Systems Administrator Technician',
    company: 'La Frontera Arizona',
    location: 'Tucson, AZ',
    context: 'HIPAA-regulated behavioral health environment',
    projects: [
      { name: 'AD & Group Policy Administration', detail: 'Active Directory administration, Group Policy management, and infrastructure support. Served as escalation resource for end-user support and infrastructure incidents.' },
    ],
  },
  {
    title: 'IT Engineer',
    company: 'Technology Solutions',
    location: 'Tucson, AZ',
    context: 'Small and mid-sized business environments',
    projects: [
      { name: 'Systems Admin & Networking', detail: 'Systems administration, networking, and end-user support across diverse SMB clients.' },
    ],
  },
]

const certifications = [
  { name: 'CompTIA A+', date: 'Sep 2023' },
  { name: 'Sophos Certified Engineer', date: '2024' },
  { name: 'Addigy Certified Expert', date: 'Nov 2023' },
  { name: 'Addigy Academy Basics', date: 'Nov 2023' },
  { name: 'RightFax Advanced Administrator', date: '' },
]

// ─── M365 interactive data ──────────────────────────────────────────
const m365Skills = [
  {
    name: 'Exchange Online',
    icon: '📧',
    depth: 'Advanced',
    details: [
      'Mail flow rules and transport configuration',
      'Shared mailboxes, distribution lists, M365 groups',
      'Quarantine and spam filter policy management',
      'Sophos Email Security integration',
      'Veeam M365 backup with tested recovery',
    ],
  },
  {
    name: 'Entra ID / Azure AD',
    icon: '🔐',
    depth: 'Advanced',
    details: [
      'User and group lifecycle management (cloud + hybrid)',
      'AD Connect / Entra Connect Sync administration',
      'MFA enforcement and conditional access policies',
      'PIM (Privileged Identity Management) evaluation',
      'Role-based access control (RBAC)',
      'License assignment, optimization, and reclamation',
      'Session revocation and termination workflows',
    ],
  },
  {
    name: 'SharePoint / OneDrive',
    icon: '📂',
    depth: 'Advanced',
    details: [
      'Organization-wide migration from on-prem file shares',
      'Site architecture and permissions management',
      'Known Folder Move via GPO and Intune',
      'Data preservation during user termination',
      'End-user training content creation',
    ],
  },
  {
    name: 'Teams / Intune / Purview',
    icon: '💬',
    depth: 'Proficient',
    details: [
      'Teams admin and meeting/voice policies',
      'Intune endpoint management and compliance',
      'Purview DLP and sensitivity labels',
      'HIPAA compliance considerations',
    ],
  },
  {
    name: 'Licensing & Tenant Admin',
    icon: '💰',
    depth: 'Expert',
    details: [
      'Showed buying direct would cost $100K+ more every year',
      'SKU analysis and right-sizing',
      'M365 admin center + PowerShell management',
      'M365 Lighthouse evaluation (multi-tenant)',
    ],
  },
]

// ─── Expandable work history component ──────────────────────────────
function WorkHistoryItem({ job }: { job: typeof workHistory[0] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative pl-8 border-l-2 border-guardian-trace/50 hover:border-guardian-cyan/50 transition-colors">
      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] bg-guardian-navy border-2 border-guardian-cyan rounded-full" />
      {job.company && (
        <div className="mb-1">
          <span className="font-mono text-sm text-guardian-cyan">{job.company}</span>
        </div>
      )}
      <h3 className="font-display text-lg font-semibold text-white mb-1">{job.title}</h3>
      <p className="text-xs text-gray-500 italic mb-3">{job.context}</p>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-sm text-guardian-cyan hover:text-white transition-colors mb-2"
      >
        {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        {job.projects.length} project{job.projects.length !== 1 ? 's' : ''} - click to {expanded ? 'collapse' : 'expand'}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pb-2">
              {job.projects.map((proj) => (
                <div key={proj.name} className="p-3 bg-guardian-navy/30 border border-guardian-trace/30 rounded-lg">
                  <h4 className="font-display text-sm text-white font-semibold mb-1">{proj.name}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{proj.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── M365 Explorer ──────────────────────────────────────────────────
function M365Explorer() {
  const [selected, setSelected] = useState(0)
  const depthColor: Record<string, string> = {
    Expert: 'text-guardian-gold',
    Advanced: 'text-guardian-cyan',
    Proficient: 'text-green-400',
  }

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="space-y-1">
        {m365Skills.map((skill, i) => (
          <button
            key={skill.name}
            onClick={() => setSelected(i)}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
              selected === i
                ? 'bg-guardian-cyan/10 border border-guardian-cyan/30 text-white'
                : 'text-gray-400 hover:text-white hover:bg-guardian-trace/20 border border-transparent'
            }`}
          >
            <span className="text-lg">{skill.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-display truncate">{skill.name}</div>
              <div className={`text-xs ${depthColor[skill.depth]}`}>{skill.depth}</div>
            </div>
            {selected === i && <ChevronRight size={14} className="text-guardian-cyan" />}
          </button>
        ))}
      </div>
      <div className="md:col-span-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-xl h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{m365Skills[selected].icon}</span>
              <div>
                <h4 className="font-display text-lg font-semibold text-white">{m365Skills[selected].name}</h4>
                <span className={`text-xs font-mono ${depthColor[m365Skills[selected].depth]}`}>{m365Skills[selected].depth}</span>
              </div>
            </div>
            <ul className="space-y-2">
              {m365Skills[selected].details.map((detail, i) => (
                <motion.li key={detail} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-2 text-sm text-gray-400">
                  <CheckCircle size={14} className="text-guardian-cyan mt-0.5 flex-shrink-0" />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// ─── Main About Page ────────────────────────────────────────────────
export default function About() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8"
        >
          <img
            src="/levi-oniszko.jpg"
            alt="Levi Oniszko"
            width={160}
            height={160}
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border border-guardian-cyan/30 glow-cyan flex-shrink-0"
          />
          <div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">About</span>{' '}
              <span className="text-guardian-cyan">Me</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Systems administrator. Problem solver. The person who figures it out.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 min-w-0">

            {/* Who I Am */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="font-display text-2xl font-bold text-white mb-6 heading-accent">
                Who I Am
              </h2>
              <div className="space-y-4">
                <p className="text-gray-400 leading-relaxed">
                  I&apos;m the person who walks into an environment, sees a challenge and accepts it.
                  &ldquo;Victory loves preparation&rdquo;, many projects shipped under my care prove this point. I learn
                  fast, retain what I&apos;ve learned and use it to handle anything.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  The work is <span className="text-white">Microsoft 365, Windows infrastructure, and automation</span>,
                  across healthcare, nonprofit, and MSP environments where systems have to stay up and data has to
                  stay protected.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Hard problems are where I volunteer first, even the ones nobody asked me to take on, like
                  a <Link to="/projects/m365-licensing" className="text-guardian-cyan hover:underline">licensing analysis that saved over $100K a year</Link>.
                  Delivering on them earned the trust of leadership, who kept bringing me into bigger projects and
                  let me lead several, including a <Link to="/projects/win11-migration" className="text-guardian-cyan hover:underline">1,200+ machine Windows 11 migration</Link> across
                  48 sites.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Formal education and hands-on work built the foundation. I also mentor and train IT staff, and
                  I&apos;m glad to help a team get up to speed.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Above all, it comes down to <span className="text-white">critical thinking</span>: attacking every
                  problem with relentless focus and landing on the best solution in an efficient time frame.
                </p>
                <p className="text-gray-400 leading-relaxed text-sm italic">
                  Detailed write-ups of selected projects are on the <Link to="/projects" className="text-guardian-cyan hover:underline">Projects</Link> page,
                  with more added over time.
                </p>
              </div>
            </motion.section>

            {/* Where I've Been - expandable projects */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <h2 className="font-display text-2xl font-bold text-white mb-2 heading-accent">
                Roles I&apos;ve Held
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Click any role to expand and see what I delivered.
              </p>
              <div className="space-y-8">
                {workHistory.map((job, i) => (
                  <WorkHistoryItem key={`${job.title}-${job.company}-${i}`} job={job} />
                ))}
              </div>
            </motion.section>

            {/* Homelab & Self-Teaching */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="font-display text-2xl font-bold text-white mb-6 heading-accent flex items-center gap-3">
                <Server className="text-guardian-gold" size={24} />
                The Homelab
              </h2>
              <div className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-xl mb-6">
                <p className="text-gray-400 leading-relaxed mb-4">
                  I don't just work with this stuff 9 to 5 - I build with it at home. My homelab is where I test
                  ideas, break things safely, and teach myself whatever I need to know next. If I'm not sure I
                  can do something, I spin it up at home first and figure it out before it ever touches production.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: 'UniFi Infrastructure', desc: 'UXG gateway and managed switches' },
                    { label: 'Cloud-Hosted Portfolio', desc: 'This site: React and Vite on Azure Static Web Apps, deployed with GitHub Actions' },
                    { label: 'Docker & Containerization', desc: 'Open WebUI, Ollama, and other services in Docker Compose' },
                    { label: 'Local AI Stack', desc: 'Ollama + Open WebUI - private LLM with voice cloning (AllTalk TTS) and Whisper STT' },
                    { label: 'Windows Server / AD', desc: 'Lab domain controllers, GPO testing, deployment automation staging' },
                    { label: 'Network Segmentation', desc: 'VLANs and firewall rules to segment the home network' },
                    { label: 'Backup & Recovery', desc: 'Veeam, Synology NAS, offsite replication testing' },
                    { label: 'Home Automation', desc: 'Home Assistant integration with security, sensors, and voice control' },
                  ].map((item) => (
                    <div key={item.label} className="p-3 bg-guardian-navy/30 border border-guardian-trace/30 rounded-lg">
                      <h4 className="text-sm font-display text-guardian-cyan mb-1">{item.label}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* M365 Depth */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="font-display text-2xl font-bold text-white mb-2 heading-accent">
                Microsoft 365 Depth
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Click any service to see hands-on experience - from managing a 50+ location M365 tenant
                in a HIPAA-regulated healthcare environment.
              </p>
              <M365Explorer />
            </motion.section>

            {/* What I Bring */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="font-display text-2xl font-bold text-white mb-6 heading-accent">
                What I Bring
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-5 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-guardian-cyan/10 rounded-lg flex items-center justify-center">
                      <Brain className="text-guardian-cyan" size={20} />
                    </div>
                    <h3 className="font-display text-white font-semibold">Critical Thinking</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    I look for why something broke and how to keep it from breaking again. That habit produced a termination workflow that closed security gaps nobody had documented and deployment automation that cut per-machine deployment from 2 hours to 15 minutes. I see systems, not just symptoms.
                  </p>
                </div>

                <div className="p-5 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-guardian-gold/10 rounded-lg flex items-center justify-center">
                      <Headphones className="text-guardian-gold" size={20} />
                    </div>
                    <h3 className="font-display text-white font-semibold">Customer Service</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Six years of direct end-user support across healthcare, legal, and nonprofit environments, including being the person on the phone when a clinic can't access patient records. The senior escalation resource at every organization along the way.
                  </p>
                </div>

                <div className="p-5 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-guardian-cyan/10 rounded-lg flex items-center justify-center">
                      <Users className="text-guardian-cyan" size={20} />
                    </div>
                    <h3 className="font-display text-white font-semibold">Communication</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Training videos that guided 800+ employees through a OneDrive migration. Site coordination across 48 locations. Vendor relationships and technical recommendations presented to leadership. I translate IT for everyone else.
                  </p>
                </div>

                <div className="p-5 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-guardian-gold/10 rounded-lg flex items-center justify-center">
                      <Cloud className="text-guardian-gold" size={20} />
                    </div>
                    <h3 className="font-display text-white font-semibold">Ownership</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    I don't wait to be told what needs doing. When an organization had no IT department, I built one. I take ownership of the environment, not just the ticket in front of me.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* LinkedIn Recommendations */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <h2 className="font-display text-2xl font-bold text-white mb-6 heading-accent flex items-center gap-3">
                <Quote className="text-guardian-gold" size={24} />
                What Others Say
              </h2>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-guardian-navy/50 to-guardian-cyan/5 border border-guardian-cyan/30 rounded-xl">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-12 h-12 bg-[#0A66C2]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Linkedin className="text-[#0A66C2]" size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base sm:text-lg text-white font-semibold mb-2">
                      LinkedIn Recommendations
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Don't just take my word for it - read what colleagues, managers, and clients have
                      written about working with me.
                    </p>
                    <a
                      href="https://www.linkedin.com/in/loniszko/details/recommendations/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm px-4 sm:px-6"
                    >
                      <Linkedin size={16} />
                      View Recommendations
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* ─── Sidebar ──────────────────────────────────────────── */}
          <div className="space-y-8">
            {/* Quick Facts */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg">
              <h3 className="font-display text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Award className="text-guardian-gold" size={20} />
                At a Glance
              </h3>
              <ul className="space-y-3">
                {[
                  'IT Director by age 28',
                  '6+ years in enterprise IT',
                  '1,200+ machines deployed',
                  '48 sites managed',
                  'HIPAA-regulated environments',
                  'Senior escalation resource',
                  'Self-taught through homelab',
                ].map((fact) => (
                  <li key={fact} className="flex items-start gap-3 text-sm">
                    <CheckCircle className="text-guardian-cyan mt-0.5 flex-shrink-0" size={16} />
                    <span className="text-gray-400">{fact}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg">
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
                <p className="text-xs text-gray-500">Pima Community College - STEM Studies</p>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="text-guardian-cyan flex-shrink-0" size={18} />
                <span className="text-gray-400">Tucson, Arizona</span>
              </div>
            </motion.div>

            {/* Brand */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="p-6 bg-gradient-to-br from-guardian-cyan/10 to-guardian-gold/5 border border-guardian-cyan/30 rounded-lg">
              <h3 className="font-display text-lg font-semibold text-white mb-2">Mainframe Tech</h3>
              <p className="text-guardian-gold text-xs uppercase tracking-widest mb-3">
                Guardians AZ - "To Mend and Defend"
              </p>
              <p className="text-gray-400 text-sm">
                Inspired by the Canadian show <em>ReBoot</em> - a nod to the guardian code
                that protects systems and users. It's what I do.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
