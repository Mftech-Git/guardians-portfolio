// Projects are markdown files in src/content/projects/*.md (editable in the CMS).
// Front matter holds the tile, stat and rotator details. The markdown body is the
// full write-up shown at /projects/<file name>. A project links to its write-up
// only when the body has content.

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
import { parseFrontmatter } from '../lib/frontmatter'

const ICONS: Record<string, LucideIcon> = {
  monitor: Monitor,
  code: Code,
  database: Database,
  network: Network,
  shield: Shield,
  phone: Phone,
  server: Server,
  cloud: Cloud,
  mail: Mail,
}

export interface ProjectHeadline {
  value: string
  label: string
  /** Always shown in the home page stats strip */
  fixed?: boolean
}

export interface Project {
  id: string
  title: string
  /** Short tab label for the home page project rotator */
  shortTitle?: string
  description: string
  /** Longer lead paragraph used on featured cards */
  overview?: string
  icon: LucideIcon
  tags: string[]
  metrics: { label: string; value: string }[]
  highlights: string[]
  featured: boolean
  /** Eligible for the home page project rotator (three are shown per load) */
  rotator: boolean
  order: number
  employer?: string
  employerShort?: string
  period?: string
  /** Headline stat for the home page. Omit to keep it out of the stats strip. */
  headline?: ProjectHeadline
  /** Markdown write-up */
  body: string
  hasArticle: boolean
}

const modules = import.meta.glob('/src/content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function splitPair(s: string): { value: string; label: string } {
  const i = s.indexOf(' | ')
  return i < 0 ? { value: s.trim(), label: '' } : { value: s.slice(0, i).trim(), label: s.slice(i + 3).trim() }
}

function asList(v: unknown): string[] {
  return Array.isArray(v) ? (v as string[]) : typeof v === 'string' && v ? [v] : []
}

function asString(v: unknown): string | undefined {
  return typeof v === 'string' && v.trim() ? v.trim() : undefined
}

// Sections (a heading plus its text) with no text are dropped, so a new project can start
// from a headings-only template and only the sections that have real content are shown.
function removeEmptySections(md: string): string {
  const out: string[] = []
  let section: string[] = []
  const flush = () => {
    if (section.slice(/^#{1,6}\s/.test(section[0] ?? '') ? 1 : 0).some((l) => l.trim())) out.push(...section)
    section = []
  }
  for (const line of md.split(/\r?\n/)) {
    if (/^#{1,6}\s/.test(line)) flush()
    section.push(line)
  }
  flush()
  return out.join('\n').trim()
}

function parseProject(path: string, raw: string): Project {
  const { data, content } = parseFrontmatter(raw)
  const id = path.replace(/^.*\//, '').replace(/\.md$/, '')
  const headlineRaw = asString(data.headline)
  const body = removeEmptySections(content)

  return {
    id,
    title: asString(data.title) ?? id,
    shortTitle: asString(data.short_title),
    description: asString(data.summary) ?? '',
    overview: asString(data.overview),
    icon: ICONS[String(data.icon ?? '').toLowerCase()] ?? Server,
    tags: asList(data.tags),
    metrics: asList(data.stats).map(splitPair),
    highlights: asList(data.highlights),
    featured: Boolean(data.featured),
    rotator: Boolean(data.rotator),
    order: Number(data.order) || 999,
    employer: asString(data.employer),
    employerShort: asString(data.employer_short),
    period: asString(data.period),
    headline: headlineRaw ? { ...splitPair(headlineRaw), fixed: Boolean(data.headline_fixed) } : undefined,
    body,
    hasArticle: body.length > 0,
  }
}

export const projects: Project[] = Object.entries(modules)
  .map(([path, raw]) => parseProject(path, raw))
  .sort((a, b) => a.order - b.order)
