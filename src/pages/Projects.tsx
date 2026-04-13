import { motion } from 'framer-motion'
import {
  Monitor,
  Code,
  Database,
  Network,
  Shield,
  Phone,
  FileSearch,
  Server,
  Cloud,
  Mail,
} from 'lucide-react'

const projects = [
  {
    id: 'win11-migration',
    title: 'Windows 11 Enterprise Migration',
    description: 'Led comprehensive Windows 11 migration across 48 medical sites, deploying 1,200+ machines with custom automation.',
    longDescription: `Managed the complete lifecycle of a Windows 11 migration at Arizona Community Physicians. Developed custom PowerShell scripts to automate deployment tasks, reducing per-machine setup from 2 hours to 15 minutes. Implemented SmartDeploy integration, created automated asset tracking with Snipe-IT, and designed a naming scheme using site prefix + serial number that simplified inventory across all sites.`,
    icon: Monitor,
    tags: ['Windows 11', 'PowerShell', 'SmartDeploy', 'WDS', 'Enterprise'],
    metrics: [
      { label: 'Machines Deployed', value: '1,200+' },
      { label: 'Sites Managed', value: '48' },
      { label: 'Time Saved', value: '87%' },
    ],
    highlights: [
      'Custom PowerShell automation for deployment pipeline',
      'SmartDeploy image management and customization',
      'Automated computer naming with BIOS asset tagging',
      'Snipe-IT integration for real-time inventory tracking',
      'Auto-logon user creation automation',
      'Zero disruption to clinical operations',
    ],
    featured: true,
  },
  {
    id: 'm365-licensing',
    title: 'M365 Licensing Audit & Optimization',
    description: 'Identified approximately $100,000 in unnecessary Microsoft 365 licensing before renewal, preventing the expenditure entirely.',
    longDescription: `Conducted a comprehensive audit of the organization's Microsoft 365 licensing ahead of renewal at Arizona Community Physicians. Analyzed SKU assignments across 800+ users, identified redundant and over-provisioned licenses, and presented findings to leadership. The $100K savings was recognized with an out-of-cycle 8% merit raise and performance bonus within four months of hire.`,
    icon: Cloud,
    tags: ['M365', 'Licensing', 'Cost Optimization', 'Entra ID'],
    metrics: [
      { label: 'Savings', value: '~$100K' },
      { label: 'Users Audited', value: '800+' },
      { label: 'Timeline', value: '4 months' },
    ],
    highlights: [
      'Full SKU analysis across 800+ users',
      'Identified redundant and over-provisioned licenses',
      'Presented recommendations to leadership',
      'Earned out-of-cycle merit raise and bonus',
    ],
    featured: true,
  },
  {
    id: 'onedrive-sharepoint',
    title: 'OneDrive & SharePoint Cloud Migration',
    description: 'Led organization-wide migration from on-premises mapped drives to OneDrive and SharePoint Online.',
    icon: Cloud,
    tags: ['OneDrive', 'SharePoint', 'M365', 'Migration'],
    metrics: [
      { label: 'Users Migrated', value: '800+' },
      { label: 'Scope', value: 'Org-wide' },
    ],
    highlights: [
      'Migrated all staff from on-prem mapped drives to OneDrive',
      'Assisted with SharePoint Online migration',
      'Produced end-user training videos (Clipchamp, Sway)',
      'Data preservation and Known Folder Move via GPO',
    ],
    featured: false,
  },
  {
    id: 'sophos-email',
    title: 'Sophos Email Security Administration',
    description: 'End-to-end administration of Sophos Email Security integrated with Exchange Online.',
    icon: Mail,
    tags: ['Sophos', 'Email Security', 'Exchange Online', 'HIPAA'],
    metrics: [
      { label: 'Coverage', value: '50+ clinics' },
    ],
    highlights: [
      'Policy management and quarantine workflows',
      'Mail flow controls and transport rules',
      'Escalation coordination with Exchange Online',
      'Spam filter tuning for healthcare compliance',
    ],
    featured: false,
  },
  {
    id: 'smartdeploy-wds',
    title: 'SmartDeploy/WDS Automation (OPCS)',
    description: 'Built imaging and deployment infrastructure at Old Pueblo Community Services, cutting build times from 2 hours to under 20 minutes.',
    longDescription: `At OPCS, implemented SmartDeploy integrated with WDS and Hyper-V on Server 2022 to create a streamlined imaging pipeline. This was the foundation that proved the concept I later scaled at ACP.`,
    icon: Server,
    tags: ['SmartDeploy', 'WDS', 'Hyper-V', 'Server 2022'],
    metrics: [
      { label: 'Build Time', value: '<20min' },
      { label: 'Previous', value: '2 hours' },
    ],
    highlights: [
      'WDS + SmartDeploy integration on Server 2022',
      'Hyper-V for image testing and management',
      'Custom answer files and post-imaging scripts',
      'Documented and trained team on processes',
    ],
    featured: false,
  },
  {
    id: 'deployment-automation',
    title: 'PowerShell Deployment Suite',
    description: 'Suite of scripts that transformed tedious deployment tasks into streamlined automated workflows.',
    icon: Code,
    tags: ['PowerShell', 'Automation', 'Active Directory', 'BIOS'],
    metrics: [
      { label: 'Time per Deploy', value: '15 min' },
      { label: 'Previous Time', value: '2 hours' },
    ],
    highlights: [
      'Auto-logon user creation automation',
      'AD computer account auto-placement by site OU',
      'BIOS asset tag scripting for inventory',
      'SmartDeploy task automation integration',
    ],
    featured: false,
  },
  {
    id: 'asset-management',
    title: 'Snipe-IT Asset Management',
    description: 'Deployed and configured Snipe-IT for organization-wide asset tracking synced with deployment pipeline.',
    icon: Database,
    tags: ['Snipe-IT', 'Asset Management', 'Automation'],
    metrics: [
      { label: 'Assets Tracked', value: '1,500+' },
      { label: 'Sites', value: '48' },
    ],
    highlights: [
      'Full Snipe-IT deployment and configuration',
      'Automated sync with deployment process',
      'Serial number-based naming and tracking',
      'Custom reporting for leadership',
    ],
    featured: false,
  },
  {
    id: 'veeam-backup',
    title: 'Veeam M365 Backup & Storage Migration',
    description: 'Managed Veeam Backup for M365 and assisted with enterprise storage migration from Pure Storage to TrueNAS.',
    icon: Database,
    tags: ['Veeam', 'M365 Backup', 'Pure Storage', 'TrueNAS'],
    metrics: [
      { label: 'Services Covered', value: '3' },
    ],
    highlights: [
      'Veeam M365 covering Exchange, SharePoint, OneDrive',
      'Tested recovery procedures and documentation',
      'Assisted with Pure Storage to TrueNAS migration',
    ],
    featured: false,
  },
  {
    id: 'voip-migration',
    title: 'VoIP Infrastructure Migration',
    description: 'Led VoIP platform migration to GoTo Connect with infrastructure overhaul.',
    icon: Phone,
    tags: ['VoIP', 'GoTo Connect', 'Infrastructure'],
    metrics: [
      { label: 'Platform', value: 'GoTo Connect' },
    ],
    highlights: [
      'Platform evaluation and selection',
      'Infrastructure planning and implementation',
      'User training and documentation',
      'Experience across 3CX, GoTo, FreePBX, Allworx, Crexendo',
    ],
    featured: false,
  },
  {
    id: 'network-infrastructure',
    title: 'Network Infrastructure',
    description: 'Managed multi-site network infrastructure with UniFi, Sophos, and FortiGate equipment.',
    icon: Network,
    tags: ['UniFi', 'Sophos', 'FortiGate', 'VLANs'],
    metrics: [
      { label: 'Sites', value: '48' },
    ],
    highlights: [
      'UniFi network management across sites',
      'VLAN segmentation design',
      'VPN configuration and management',
      'Firewall rule management (Sophos, FortiGate, Meraki, SonicWall)',
    ],
    featured: false,
  },
  {
    id: 'dmz-selfhost',
    title: 'Self-Hosted DMZ Infrastructure',
    description: 'Designed and built a secure DMZ for self-hosting this portfolio, Ghost CMS, and AI services.',
    icon: Shield,
    tags: ['Self-Hosting', 'DMZ', 'Docker', 'UniFi', 'Ollama'],
    metrics: [
      { label: 'Services', value: '5+' },
    ],
    highlights: [
      'Dual WAN configuration on UXG',
      'Proper network segmentation from home network',
      'Self-hosted portfolio (React/Vite) + Ghost CMS',
      'Ollama AI chatbot integration',
      'Docker Compose orchestration',
    ],
    featured: false,
  },
]

export default function Projects() {
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 sm:p-8 bg-guardian-navy/50 border border-guardian-trace/50 rounded-xl hover:border-guardian-cyan/30 transition-all duration-300"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-6 bg-guardian-navy/30 border border-guardian-trace/30 rounded-lg hover:border-guardian-cyan/30 transition-all duration-300 card-scan"
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
