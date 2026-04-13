import { useState, useEffect, useRef, useCallback } from 'react'

interface TerminalLine {
  text: string
  color: string
}

const COLORS = {
  cyan: '#00E5FF',
  gold: '#F5C518',
  text: '#E6EDF3',
  muted: '#8B949E',
  red: '#F85149',
  green: '#3FB950',
}

const introLines: TerminalLine[] = [
  { text: 'Windows PowerShell', color: COLORS.muted },
  { text: 'Copyright (C) Microsoft Corporation. All rights reserved.', color: COLORS.muted },
  { text: '', color: COLORS.text },
  { text: "PS C:\\Users\\Levi> Get-Portfolio -Candidate 'Levi Oniszko'", color: COLORS.cyan },
  { text: '', color: COLORS.text },
  { text: '  Name       : Levi "Eli" Oniszko', color: COLORS.gold },
  { text: '  Title      : Systems Administrator & Automation Engineer', color: COLORS.gold },
  { text: '  Location   : Phoenix, AZ', color: COLORS.gold },
  { text: '  Experience : 6+ Years in Enterprise IT', color: COLORS.gold },
  { text: '  Highlight  : IT Director by 28 — No Degree Required', color: COLORS.gold },
  { text: '  Brand      : Guardians AZ — "To Mend and Defend"', color: COLORS.gold },
  { text: '', color: COLORS.text },
  { text: "  Type 'help' for available commands.", color: COLORS.cyan },
]

const commandResponses: Record<string, TerminalLine[]> = {
  help: [
    { text: '  Available commands:', color: COLORS.cyan },
    { text: '  skills      - Technical skills overview', color: COLORS.text },
    { text: '  experience  - Work history summary', color: COLORS.text },
    { text: '  projects    - Key project highlights', color: COLORS.text },
    { text: '  certs       - Certifications', color: COLORS.text },
    { text: '  contact     - Get in touch', color: COLORS.text },
    { text: '  clear       - Clear terminal', color: COLORS.text },
  ],
  skills: [
    { text: '  ╔══════════════════════════════════════════════════════════╗', color: COLORS.cyan },
    { text: '  ║  CORE COMPETENCIES                                      ║', color: COLORS.cyan },
    { text: '  ╠══════════════════════════════════════════════════════════╣', color: COLORS.cyan },
    { text: '  ║  Windows Server 2012R2–2022  │  AD / GPO / NPS / RADIUS ║', color: COLORS.gold },
    { text: '  ║  M365 Admin  │  Azure AD / Entra ID  │  SharePoint     ║', color: COLORS.gold },
    { text: '  ║  PowerShell Automation  │  Wazuh Security               ║', color: COLORS.gold },
    { text: '  ║  WDS / SmartDeploy / FOG / MDT / PXE Boot              ║', color: COLORS.gold },
    { text: '  ║  ConnectWise / NinjaOne RMM  │  Veeam / Wasabi         ║', color: COLORS.gold },
    { text: '  ║  UniFi / Sophos / Fortigate / Meraki / SonicWall       ║', color: COLORS.gold },
    { text: '  ║  VLAN / ACL / VPN / DHCP / DNS  │  Hyper-V / VMware   ║', color: COLORS.gold },
    { text: '  ║  Docker / Ansible / Linux  │  Citrix VDI               ║', color: COLORS.gold },
    { text: '  ║  3CX / GoTo / FreePBX / Allworx / Crexendo VoIP       ║', color: COLORS.gold },
    { text: '  ╚══════════════════════════════════════════════════════════╝', color: COLORS.cyan },
  ],
  experience: [
    { text: '  ┌─ ACP — Systems Administrator (Jul 2024 – Jan 2026)', color: COLORS.gold },
    { text: '  │  W11 migration: 48 sites, 1200+ machines', color: COLORS.text },
    { text: '  │  PowerShell automation: 2hr → 15min deployments', color: COLORS.text },
    { text: '  │  Snipe-IT asset management, BIOS tagging', color: COLORS.text },
    { text: '  ├─ InTegriLogic — Tier II/III Engineer (Oct 2023 – Jul 2024)', color: COLORS.gold },
    { text: '  │  80+ enterprise clients across MSP environment', color: COLORS.text },
    { text: '  │  M365, networking, endpoint security', color: COLORS.text },
    { text: '  ├─ OPCS — IT Director (Apr 2022 – Aug 2023)', color: COLORS.gold },
    { text: '  │  Built first internal IT dept from scratch', color: COLORS.text },
    { text: '  │  Promoted to Director within months', color: COLORS.text },
    { text: '  │  SmartDeploy/WDS automation: 2hr → under 20min', color: COLORS.text },
    { text: '  ├─ La Frontera — IT Support Specialist (Nov 2021 – Apr 2022)', color: COLORS.gold },
    { text: '  └─ Tech Solutions — IT Engineer (Feb 2020 – Jul 2021)', color: COLORS.gold },
  ],
  projects: [
    { text: '  ► Windows 11 Migration — 48 sites, 1200+ machines', color: COLORS.gold },
    { text: '  ► SmartDeploy/WDS Automation — 2hr → 15min build time', color: COLORS.gold },
    { text: '  ► PowerShell Deployment Suite — BIOS asset tagging', color: COLORS.gold },
    { text: '  ► Snipe-IT Asset Management — Full org implementation', color: COLORS.gold },
    { text: '  ► SharePoint Migration — Cloud transition project', color: COLORS.gold },
    { text: '  ► VoIP Migration (GoTo Connect) — Infra overhaul', color: COLORS.gold },
    { text: '  ► NinjaOne RMM Deployment — 25% efficiency gain', color: COLORS.gold },
    { text: '  ► Compliance Keystone — Regulatory framework build', color: COLORS.gold },
    { text: '  ► Electronic Forms Workflow — M365 automation', color: COLORS.gold },
    { text: '  ► Self-Hosted DMZ — Portfolio + services hosting', color: COLORS.gold },
  ],
  certs: [
    { text: '  ✓ CompTIA A+ (Sep 2023)', color: COLORS.green },
    { text: '  ✓ Addigy Certified Expert (Nov 2023)', color: COLORS.green },
    { text: '  ✓ Addigy Academy Basics (Nov 2023)', color: COLORS.green },
    { text: '  ✓ RightFax Advanced Administrator', color: COLORS.green },
    { text: '  ◎ WGU — BS Information Technology (on hiatus)', color: COLORS.muted },
  ],
  contact: [
    { text: '  ✉  mftech@mainframetech.us', color: COLORS.gold },
    { text: '  ☎  520.906.4889', color: COLORS.gold },
    { text: '  🏢  Mainframe Tech LLC — Phoenix, AZ', color: COLORS.gold },
  ],
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [ready, setReady] = useState(false)
  const [typing, setTyping] = useState(true)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idxRef = useRef(0)

  // Auto-type intro
  useEffect(() => {
    idxRef.current = 0
    const interval = setInterval(() => {
      if (idxRef.current < introLines.length) {
        const line = introLines[idxRef.current]
        setLines(prev => [...prev, line])
        idxRef.current++
      } else {
        clearInterval(interval)
        setTyping(false)
        setReady(true)
      }
    }, 140)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  // Focus input when ready
  useEffect(() => {
    if (ready && inputRef.current) inputRef.current.focus()
  }, [ready])

  const handleCommand = useCallback((cmd: string) => {
    const c = cmd.trim().toLowerCase()
    const prompt: TerminalLine = { text: `PS C:\\Users\\Levi> ${cmd}`, color: COLORS.cyan }

    if (c === 'clear') {
      setLines([])
      return
    }

    const resp = commandResponses[c] || [
      { text: `  '${cmd}' is not recognized. Type 'help' for commands.`, color: COLORS.red },
    ]

    setLines(prev => [...prev, prompt, { text: '', color: COLORS.text }, ...resp, { text: '', color: COLORS.text }])
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <div className="w-full max-w-2xl rounded-xl overflow-hidden border border-guardian-border glow-cyan">
      {/* Title Bar */}
      <div className="bg-[#1E1E1E] px-4 py-2 flex items-center justify-between border-b border-guardian-trace/50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#F85149]" />
            <div className="w-3 h-3 rounded-full bg-[#F5C518]" />
            <div className="w-3 h-3 rounded-full bg-[#3FB950]" />
          </div>
          <span className="text-[11px] font-mono text-gray-500 ml-2">Windows PowerShell</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div
        ref={bodyRef}
        onClick={focusInput}
        className="bg-[#0C0C0C] p-4 h-[360px] overflow-y-auto font-mono text-[12.5px] leading-7 cursor-text"
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{
              color: line.color,
              whiteSpace: 'pre-wrap',
              minHeight: line.text === '' ? 12 : 'auto',
            }}
          >
            {line.text}
          </div>
        ))}
        {ready && (
          <div className="flex items-center" style={{ color: COLORS.cyan }}>
            <span>PS C:\Users\Levi&gt;&nbsp;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono text-[12.5px]"
              style={{ caretColor: COLORS.cyan }}
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <span className="animate-blink" style={{ color: COLORS.cyan }}>▌</span>
          </div>
        )}
        {typing && <span className="animate-blink" style={{ color: COLORS.cyan }}>▌</span>}
      </div>
    </div>
  )
}
