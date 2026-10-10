# Guardians AZ Portfolio

Personal portfolio website for Levi "Eli" Oniszko, IT Professional and Systems Administrator.

**Brand:** Guardians AZ - "To Mend and Defend"

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # dist/
npm run preview   # preview production build
```

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** with custom Guardians AZ design tokens
- **Framer Motion** for page transitions and scroll animations
- **Lucide React** for icons
- **React Router** for client-side routing (SPA)
- **Markdown content** in `src/content/` (blog posts and project articles), editable through the CMS at `/admin`

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home: hero, interactive terminal, core technologies, featured project rotator |
| `/about` | Story, roles, homelab, Microsoft 365 depth, certifications sidebar |
| `/projects` | Featured and other projects with metrics |
| `/projects/:id` | Full project write-up (Problem and goal, Stakeholders, Approach, Risks and rollback, Results, What I'd do differently) |
| `/blog` and `/blog/:slug` | Blog posts from `src/content/posts` |
| `/resume` | Full resume with work history, skills, certs, education, and PDF download |
| `/contact` | Contact form and direct contact info |

## Content

- **Project articles:** one markdown file per project in `src/content/projects/`. The front matter drives the cards, stats, and rotator. A project page goes live once its body has text under at least one heading.
- **Blog posts:** markdown files in `src/content/posts/`.
- **Resume PDF:** `public/Levi_Oniszko_Resume.pdf`.

## Brand Colors

| Name | Hex | Usage |
|------|-----|-------|
| Guardian Cyan | `#00E5FF` | Primary accent, links, highlights |
| Guardian Gold | `#F5C518` | Secondary accent, headings |
| Deep Black | `#0A0A0F` | Background |
| Navy | `#0D1117` | Cards, sections |

## Interactive Terminal

The homepage features an interactive PowerShell-style terminal where visitors can type commands to explore the background. Available commands: `help`, `skills`, `experience`, `projects`, `certs`, `contact`, `clear`.

## Deployment

The site runs on **Azure Static Web Apps**, deployed by GitHub Actions (`.github/workflows/azure-static-web-apps.yml`).

- A pull request into `main` builds a preview environment.
- Merging to `main` publishes the site.
- A push to any other branch deploys nothing.

## TODO

- [ ] Working contact form (backend handler)
- [x] Blog and project CMS at `/admin`
- [x] PDF resume download
- [ ] Public Ollama chatbot (trained on resume)
- [ ] Pyramid certification display
