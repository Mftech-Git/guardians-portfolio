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
  Linkedin,
} from 'lucide-react'

const experience = [
  {
    title: 'Systems Administrator',
    company: 'Arizona Community Physicians',
    context: "Arizona's largest physician-owned medical group | 50+ clinic locations, 800+ employees | HIPAA-regulated environment",
    location: 'Tucson, AZ',
    period: 'Jul 2024 – Jan 2026',
    responsibilities: [
      'Identified approximately $100,000 in unnecessary Microsoft 365 licensing before renewal, preventing the expenditure entirely; recognized with an out-of-cycle 8% merit raise and performance bonus within the first four months',
      'Led enterprise Windows 11 migration across 48 medical sites, deploying 1,200+ machines with zero disruption to clinical operations',
      'Built a PowerShell automation suite integrated with SmartDeploy and WDS that reduced per-machine deployment time from 2 hours to 15 minutes (87%)',
      'Led OneDrive migration for all staff from on-premises mapped drives as part of an organization-wide SharePoint and OneDrive modernization effort; assisted with SharePoint migration and produced end-user training videos using Clipchamp and Microsoft Sway',
      'Designed user termination workflow enforcing immediate session revocation, license reclamation, and data preservation, standardizing a previously inconsistent manual process',
      'Administered Sophos Email Security end-to-end: policy management, quarantine workflows, mail flow controls, and escalation coordination with Exchange Online',
      'Served as the designated Microsoft 365 SME: Exchange Online, Teams, SharePoint, OneDrive, Entra ID/Azure AD, and user and license lifecycle management',
      'Managed Veeam Backup for Microsoft 365 covering Exchange, SharePoint, and OneDrive with tested recovery procedures; assisted with enterprise storage migration from Pure Storage to TrueNAS',
      'Implemented automated BIOS asset tagging and site-based computer naming standard across all 48 locations; integrated with Snipe-IT for real-time inventory tracking',
      'Served as senior escalation resource for helpdesk, resolving complex infrastructure, endpoint, and Microsoft 365 issues beyond tier support scope',
    ],
  },
  {
    title: 'NIST Engineer (Network Infrastructure & Escalations)',
    company: 'InTegriLogic',
    context: 'Healthcare-focused MSP | 80+ clients across medical, legal, financial, and nonprofit sectors',
    location: 'Tucson, AZ',
    period: 'Oct 2023 – Jul 2024',
    responsibilities: [
      'Handled complex ticket escalations as part of the network infrastructure team across diverse multi-client environments',
      'Administered Sophos security stack for multiple clients; earned Sophos in-house certifications',
      'Evaluated Microsoft 365 Lighthouse and Privileged Identity Management for prospective client deployments',
      'Delivered remote and on-site support across healthcare, legal, financial, and nonprofit environments; maintained least-privilege access discipline throughout',
    ],
  },
  {
    title: 'IT Director',
    company: 'Old Pueblo Community Services',
    context: 'Nonprofit human services organization | Built the organization\'s first internal IT department',
    location: 'Tucson, AZ',
    period: 'Apr 2022 – Aug 2023',
    responsibilities: [
      'Promoted from Lead SysAdmin to IT Director within two weeks based on immediate technical impact and ownership',
      'Implemented SmartDeploy and WDS imaging infrastructure on Hyper-V and Windows Server 2022, cutting machine build times from 2+ hours to under 20 minutes',
      'Led VoIP platform migration to GoTo Connect; managed IT budget, vendor relationships, and compliance-related coordination',
    ],
  },
  {
    title: 'Systems Administrator Technician',
    company: 'La Frontera Arizona',
    location: 'Tucson, AZ',
    period: 'Nov 2021 – Apr 2022',
    responsibilities: [
      'Active Directory administration, Group Policy management, and infrastructure support in a HIPAA-regulated behavioral health environment',
      'Served as escalation resource for end-user support and infrastructure incidents',
    ],
  },
  {
    title: 'IT Engineer',
    company: 'Technology Solutions',
    location: 'Tucson, AZ',
    period: 'Feb 2020 – Jul 2021',
    responsibilities: [
      'Systems administration, networking, and end-user support across small and mid-sized business environments',
    ],
  },
]

const skills = {
  'Systems & Infrastructure': [
    'Windows Server 2012R2–2022',
    'Active Directory / Group Policy',
    'NPS / RADIUS',
    'Hyper-V / VMware / Citrix VDI',
    'Linux (Ubuntu)',
  ],
  'Cloud & Microsoft 365': [
    'Microsoft 365 Administration (SME)',
    'Exchange Online',
    'Entra ID / Azure AD',
    'AD Connect / Entra Connect Sync',
    'MFA / Conditional Access / PIM',
    'SharePoint / OneDrive / Teams',
    'Microsoft Purview / Intune / MDM',
  ],
  'Deployment & Imaging': [
    'SmartDeploy / WDS / MDT',
    'FOG Project / PXE Boot',
    'PowerShell Automation',
    'BIOS Asset Tagging',
  ],
  'Security & Email': [
    'Sophos Firewall & Email Security',
    'Wazuh / Bitdefender / Webroot',
    'Trend Micro / Proofpoint / Barracuda',
  ],
  'Networking': [
    'UniFi / Sophos / FortiGate',
    'Meraki / SonicWall',
    'VLAN / VPN / DHCP / DNS',
    '802.1X / NPS',
  ],
  'Tools & Management': [
    'ConnectWise / NinjaOne / Addigy (RMM)',
    'Veeam (on-prem + M365) / Wasabi / Synology',
    'Snipe-IT / Asset Tiger',
    '3CX / GoTo / FreePBX / Allworx / Crexendo (VoIP)',
  ],
}

const certifications = [
  { name: 'CompTIA A+', date: 'Sep 2023' },
  { name: 'Sophos Certified Engineer', date: '2024' },
  { name: 'Addigy Certified Expert', date: 'Nov 2023' },
  { name: 'Addigy Academy Basics', date: 'Nov 2023' },
  { name: 'RightFax Advanced Administrator', date: '' },
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
                Levi <span className="text-guardian-cyan">"Eli"</span> Oniszko
              </h1>
              <p className="text-xl text-guardian-cyan font-display">
                Systems Administrator | Microsoft 365 &amp; Infrastructure Specialist
              </p>
            </div>
            <button className="btn-primary inline-flex items-center gap-2 self-start">
              <Download size={16} />
              Download PDF
            </button>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <a href="mailto:loniszko@mainframetech.us" className="flex items-center gap-2 hover:text-guardian-cyan transition-colors">
              <Mail size={14} />
              loniszko@mainframetech.us
            </a>
            <a href="tel:5209064889" className="flex items-center gap-2 hover:text-guardian-cyan transition-colors">
              <Phone size={14} />
              520.906.4889
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} />
              Tucson, AZ
            </span>
            <a href="https://linkedin.com/in/loniszko" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-guardian-cyan transition-colors">
              <Linkedin size={14} />
              linkedin.com/in/loniszko
            </a>
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
              Systems Administrator with 6+ years of experience across Microsoft 365, Windows infrastructure,
              endpoint management, and enterprise automation. Designated M365 SME managing Exchange Online,
              Entra ID, SharePoint, OneDrive, Teams, and Intune across 50+ locations in a HIPAA-regulated
              healthcare environment. Experienced across on-prem, cloud, and hybrid environments at every
              scale from small business to 1,000+ endpoint enterprise.
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
            Professional Experience
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
                  {job.context && (
                    <p className="text-xs text-gray-500 italic mt-1">{job.context}</p>
                  )}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  Certified{cert.date && ` - ${cert.date}`}
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
            <h3 className="font-display text-white">Pima Community College</h3>
            <p className="text-sm text-gray-400">
              STEM Studies &bull; Secretary, STEM Club
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
