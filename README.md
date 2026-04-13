# Guardians AZ — Portfolio v2

Personal portfolio website for Levi "Eli" Oniszko, IT Professional and Systems Administrator.

**Brand:** Guardians AZ — "To Mend and Defend"

## Quick Start

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # → dist/
npm run preview   # preview production build
```

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** — custom Guardians AZ design tokens
- **Framer Motion** — page transitions and scroll animations
- **Lucide React** — icons
- **React Router** — client-side routing (SPA)
- **Ghost CMS** — headless blog backend (Docker) — see `GHOST-SETUP.md`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, interactive PowerShell terminal, skills, featured project |
| `/about` | Story, timeline, philosophy, certifications sidebar |
| `/projects` | Featured + other projects with metrics |
| `/blog` | Blog — Ghost CMS powered with fallback placeholders |
| `/resume` | Full resume with work history, skills, certs, education |
| `/contact` | Contact form + direct contact info |

## Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Guardian Cyan | `#00E5FF` | Primary accent, links, highlights |
| Guardian Gold | `#F5C518` | Secondary accent, headings |
| Deep Black | `#0A0A0F` | Background |
| Navy | `#0D1117` | Cards, sections |

## Interactive Terminal

The homepage features an interactive PowerShell-style terminal where visitors can type commands to explore your background. Available commands: `help`, `skills`, `experience`, `projects`, `certs`, `contact`, `clear`.

## Deployment

### Static hosting (Vercel, Netlify, etc.)
```bash
npm run build
# Deploy the dist/ folder
```

### Self-hosted (nginx)
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;
    root /var/www/portfolio/dist;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## TODO

- [ ] Working contact form (backend handler)
- [x] Blog CMS / editor — Ghost CMS integrated
- [ ] Public Ollama chatbot (trained on resume)
- [ ] PDF resume download
- [ ] Pyramid certification display
- [ ] Ghost SMTP for newsletter subscribers
