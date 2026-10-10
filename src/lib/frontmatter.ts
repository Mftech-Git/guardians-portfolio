// Shared front matter parser for markdown content (blog posts and project articles).
// Handles: key: value, quoted strings (with escapes), booleans, lists of strings,
// and folded or literal block scalars (>- and |) that a CMS may write for long text.

function unquote(v: string): string {
  const t = v.trim()
  if (t.length >= 2 && t.startsWith('"') && t.endsWith('"')) {
    return t.slice(1, -1).replace(/\\(["\\])/g, '$1')
  }
  if (t.length >= 2 && t.startsWith("'") && t.endsWith("'")) {
    return t.slice(1, -1).replace(/''/g, "'")
  }
  return t
}

export function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const lines = match[1].split(/\r?\n/)
  const data: Record<string, unknown> = {}
  let i = 0

  while (i < lines.length) {
    const kv = lines[i].match(/^(\w+):\s*(.*)$/)
    if (!kv) { i++; continue }

    const key = kv[1]
    const val = kv[2].trim()

    // Block scalar: key: >- or key: |
    if (/^[>|][+-]?$/.test(val)) {
      const folded = val.startsWith('>')
      const parts: string[] = []
      i++
      while (i < lines.length && (lines[i] === '' || /^\s+/.test(lines[i]))) {
        parts.push(lines[i].trim())
        i++
      }
      data[key] = folded ? parts.join(' ').replace(/\s+/g, ' ').trim() : parts.join('\n').trim()
      continue
    }

    // List
    if (val === '') {
      const items: string[] = []
      i++
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(unquote(lines[i].replace(/^\s*-\s+/, '')))
        i++
      }
      data[key] = items
      continue
    }

    // Quoted string that continues on following indented lines
    if ((val.startsWith('"') || val.startsWith("'")) && !(val.length > 1 && val.endsWith(val[0]))) {
      const quote = val[0]
      let joined = val
      i++
      while (i < lines.length && !joined.trimEnd().endsWith(quote)) {
        joined += ' ' + lines[i].trim()
        i++
      }
      data[key] = unquote(joined)
      continue
    }

    if (val === 'true') data[key] = true
    else if (val === 'false') data[key] = false
    else data[key] = unquote(val)
    i++
  }

  return { data, content: match[2] }
}
