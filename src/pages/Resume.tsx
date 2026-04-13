import { motion } from 'framer-motion'
import {
  Download,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
} from 'lucide-react'

const experience = [
  {
    title: 'Systems Administrator',
    company: 'Arizona Community Physicians',
    location: 'Tucson, AZ',
    period: 'Jul 2024 – Jan 2026',
    responsibilities: [
      'Led Windows 11 migration across 48 medical sites, deploying 1,200+ endpoints',
      'Developed PowerShell automation reducing deployment time by 87% (2 hours to 15 minutes)',
      'Implemented SmartDeploy for standardized imaging with zero-touch deployment workflows',
      'Automated auto-logon user creation, eliminating major pain point for support team',
      'Designed computer naming scheme with BIOS asset tagging (site prefix + serial)',
      'Deployed and automated Snipe-IT for organization-wide asset management',
      'Managed NinjaOne RMM deployment, achieving 25% operational efficiency gain',
      'Coordinated site operations and trained site coordinators on deployment procedures',
    ],
  },
  {
    title: 'Tier II/III Engineer',
    company: 'InTegriLogic',
    location: 'Tucson, AZ',
    period: 'Oct 2023 – Jul 2024',
    responsibilities: [
      'Supported 80+ enterprise clients in managed services environment',
      'Microsoft 365 administration, Azure AD / Entra ID management',
      'Network infrastructure — firewall, VLAN, VPN configuration',
      'Endpoint security and RMM tooling across diverse client environments',
    ],
  },
  {
    title: 'IT Director',
    company: 'Old Pueblo Community Services',
    location: 'Tucson, AZ',
    period: 'Apr 2022 – Aug 2023',
    responsibilities: [
      'Built organization\'s first internal IT department from scratch',
      'Promoted from Lead SysAdmin to IT Director within 2 weeks',
      'Achieved IT Director position by age 28 without a college degree',
      'Implemented SmartDeploy/WDS automation cutting deployment from 2 hours to under 20 minutes',
      'Managed IT budget, vendor relationships, and team operations',
      'Led VoIP migration to GoTo Connect',
      'Built regulatory compliance framework (Compliance Keystone)',
    ],
  },
  {
    title: 'IT Support Specialist',
    company: 'La Frontera',
    location: 'Tucson, AZ',
    period: 'Nov 2021 – Apr 2022',
    responsibilities: [
      'Technical support and infrastructure maintenance for healthcare organization',
      'Active Directory administration and Group Policy management',
    ],
  },
  {
    title: 'IT Engineer',
    company: 'Tech Solutions',
    location: 'Tucson, AZ',
    period: 'Feb 2020 – Jul 2021',
    responsibilities: [
      'Systems administration and end-user support',
      'Networking fundamentals and infrastructure maintenance',
    ],
  },
]

const skills = {
  'Systems & Servers': [
    'Windows Server 2012R2–2022',
    'Active Directory / GPO / NPS / RADIUS',
    'Azure AD / Entra ID',
    'Hyper-V / VMware / Citrix VDI',
    'Linux (Ubuntu, RHEL basics)',
  ],
  'Deployment & Imaging': [
    'SmartDeploy',
    'WDS / MDT / PXE Boot',
    'FOG Project',
    'PowerShell Automation',
    'BIOS Asset Tagging',
  ],
  'Networking & Security': [
    'UniFi / Sophos / Fortigate',
    'Meraki / SonicWall',
    'VLAN / ACL / VPN / DHCP / DNS',
    'Wazuh Security Automation',
    'Bitdefender / Webroot / TrendMicro',
  ],
  'Cloud & Tools': [
    'Microsoft 365 Admin',
    'ConnectWise / NinjaOne RMM',
    'Veeam / Wasabi / Synology Backup',
    'Snipe-IT / Asset Tiger',
    'Docker / Ansible basics',
  ],
}

const certifications = [
  { name: 'CompTIA A+', status: 'Certified', date: 'Sep 2023' },
  { name: 'Addigy Certified Expert', status: 'Certified', date: 'Nov 2023' },
  { name: 'Addigy Academy Basics', status: 'Certified', date: 'Nov 2023' },
  { name: 'RightFax Advanced Administrator', status: 'Certified', date: '' },
]

export default function Resume() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">
                Levi Oniszko
              </h1>
              <p className="text-xl text-guardian-cyan font-display">
                Systems Administrator & Automation Specialist
              </p>
            </div>
            <button className="btn-primary inline-flex items-center gap-2 self-start">
              <Download size={16} />
              Download PDF
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <a href="mailto:mftech@mainframetech.us" className="flex items-center gap-2 hover:text-guardian-cyan transition-colors">
              <Mail size={14} />
              mftech@mainframetech.us
            </a>
            <a href="tel:5209064889" className="flex items-center gap-2 hover:text-guardian-cyan transition-colors">
              <Phone size={14} />
              520.906.4889
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              Phoenix, Arizona
            </span>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="p-6 bg-guardian-navy/50 border border-guardian-trace/50 rounded-lg">
            <h2 className="font-display text-sm uppercase tracking-wider text-guardian-gold mb-3">
              Professional Summary
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Results-driven IT professional with 6+ years of experience in systems administration,
              automation, and enterprise infrastructure management. Achieved IT Director position by age 28
              without a college degree through demonstrated competence and measurable results.
              Most recently led a Windows 11 migration across 48 medical sites, deploying 1,200+ machines
              with custom PowerShell automation that reduced deployment time by 87%. Passionate about
              turning tedious manual processes into efficient automated workflows.
            </p>
          </div>
        </motion.section>

        {/* Experience */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Briefcase className="text-guardian-cyan" size={24} />
            Experience
          </h2>
          <div className="space-y-8">
            {experience.map((job) => (
              <div
                key={`${job.company}-${job.period}`}
                className="relative pl-6 border-l-2 border-guardian-trace/50"
              >
                <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] bg-guardian-cyan rounded-full" />
                <div className="mb-2">
                  <h3 className="font-display text-lg font-semibold text-white">{job.title}</h3>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="text-guardian-cyan">{job.company}</span>
                    <span className="text-gray-600">&bull;</span>
                    <span className="text-gray-400">{job.location}</span>
                    <span className="text-gray-600">&bull;</span>
                    <span className="text-gray-500 font-mono">{job.period}</span>
                  </div>
                </div>
                <ul className="space-y-1.5 mt-3">
                  {job.responsibilities.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className="w-1 h-1 bg-guardian-gold rounded-full mt-2 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Wrench className="text-guardian-cyan" size={24} />
            Technical Skills
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="p-4 bg-guardian-navy/30 border border-guardian-trace/30 rounded-lg">
                <h3 className="font-display text-sm uppercase tracking-wider text-guardian-gold mb-3">
                  {category}
                </h3>
                <ul className="space-y-1.5">
                  {items.map((skill) => (
                    <li key={skill} className="text-sm text-gray-400">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Award className="text-guardian-cyan" size={24} />
            Certifications
          </h2>
          <div className="flex flex-wrap gap-4">
            {certifications.map((cert) => (
              <div key={cert.name} className="px-4 py-3 bg-guardian-navy/30 border border-guardian-trace/30 rounded-lg">
                <div className="font-display text-white">{cert.name}</div>
                <div className="text-xs text-guardian-cyan">
                  {cert.status}{cert.date && ` — ${cert.date}`}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-display text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <GraduationCap className="text-guardian-cyan" size={24} />
            Education
          </h2>
          <div className="p-4 bg-guardian-navy/30 border border-guardian-trace/30 rounded-lg">
            <h3 className="font-display text-white">Western Governors University</h3>
            <p className="text-sm text-gray-400">
              BS Information Technology &bull; Currently on hiatus
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Pursuing degree alongside full-time career. Focus on systems and infrastructure management.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
