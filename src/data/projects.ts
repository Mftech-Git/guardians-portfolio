import {
  Monitor,
  Code,
  Database,
  Network,
  Shield,
  Phone,
  Server,
  Cloud,
  Mail,
  type LucideIcon,
} from 'lucide-react'

export const ORGS = {
  ACP: { name: 'Arizona Community Physicians', period: 'Jul 2024 to Jan 2026' },
  OPCS: { name: 'Old Pueblo Community Services', period: 'Apr 2022 to Aug 2023' },
} as const

export type OrgKey = keyof typeof ORGS

export interface ProjectHeadline {
  value: string
  label: string
  /** Always shown in the home page stats strip */
  fixed?: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  icon: LucideIcon
  tags: string[]
  metrics: { label: string; value: string }[]
  highlights: string[]
  featured: boolean
  /** Short tab label for the home page project rotator */
  shortTitle?: string
  /** Employer where the work was done */
  org?: OrgKey
  /** Eligible for the home page project rotator (three of these are shown per load) */
  rotator?: boolean
  /** Headline stat shown on the home page. Omit to keep the project out of the stats strip. */
  headline?: ProjectHeadline
}

export const projects: Project[] = [
  {
    id: 'win11-migration',
    shortTitle: 'Windows 11 Migration',
    org: 'ACP',
    rotator: true,
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
    headline: { value: '1,200+', label: 'Machines Deployed', fixed: true },
  },
  {
    id: 'm365-licensing',
    shortTitle: 'M365 License Audit',
    org: 'ACP',
    rotator: true,
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
    headline: { value: '$100K', label: 'Licensing Saved', fixed: true },
  },
  {
    id: 'onedrive-sharepoint',
    shortTitle: 'OneDrive Migration',
    org: 'ACP',
    rotator: true,
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
    headline: { value: '800+', label: 'Users Moved to OneDrive' },
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
    headline: { value: '50+', label: 'Clinics Covered' },
  },
  {
    id: 'smartdeploy-wds',
    shortTitle: 'SmartDeploy + WDS',
    org: 'OPCS',
    rotator: true,
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
    headline: { value: '<20 min', label: 'Builds, was 2 hrs' },
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
    headline: { value: '15 min', label: 'Per Deployment, was 2 hrs' },
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
    headline: { value: '1,500+', label: 'Assets Tracked' },
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
