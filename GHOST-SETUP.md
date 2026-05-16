# Ghost CMS Setup Guide — Guardians AZ Portfolio

Your blog is now powered by Ghost CMS. Ghost runs as a Docker container alongside your portfolio, giving you a full admin panel with a beautiful editor for writing posts — no code changes needed to publish.

## Architecture

```
┌─────────────────────────────────────────────┐
│  Your DMZ / Server                          │
│                                             │
│  ┌─────────────┐     ┌──────────────────┐   │
│  │ Ghost CMS   │◄────│ Portfolio (Vite)  │   │
│  │ :2368       │ API │ :3000            │   │
│  │ SQLite DB   │     │ React + Tailwind │   │
│  └─────────────┘     └──────────────────┘   │
│                                             │
│  nginx reverse proxy                        │
│  blog.yourdomain.com → :2368                │
│  yourdomain.com      → :3000 (or dist/)    │
└─────────────────────────────────────────────┘
```

## Quick Start (5 minutes)

### Step 1: Start Ghost

```bash
cd /path/to/portfolio-v2
docker compose up -d
```

Wait ~30 seconds, then open http://localhost:2368/ghost

### Step 2: Create Your Admin Account

Ghost will walk you through account creation on first visit. Use your real email — this is YOUR CMS, it's all local.

### Step 3: Create a Content API Integration

1. In Ghost admin, go to **Settings → Integrations**
2. Click **+ Add custom integration**
3. Name it **"Portfolio"**
4. Copy the **Content API Key** (looks like: `a1b2c3d4e5f6g7h8i9j0`)

### Step 4: Configure Your Portfolio

```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_GHOST_URL=http://localhost:2368
VITE_GHOST_CONTENT_KEY=a1b2c3d4e5f6g7h8i9j0  # ← paste your key
```

### Step 5: Rebuild & Run

```bash
npm run build    # Rebuilds with Ghost config baked in
npm run dev      # Or start dev server to test
```

Visit your blog page — it now pulls from Ghost!

## Writing Your First Post

1. Go to http://localhost:2368/ghost
2. Click the **+** button or go to **Posts → New post**
3. Write your content using Ghost's editor (supports markdown, images, embeds, code blocks)
4. Set **Tags** — these become your blog categories
5. Toggle **Featured** to highlight a post on your blog page
6. Click **Publish** → it appears on your portfolio immediately

No git push. No rebuild. Just write and publish.

## Production Setup (Self-Hosted DMZ)

### Update Ghost URL

In `docker-compose.yml`, set the actual URL:
```yaml
environment:
  url: https://blog.yourdomain.com
```

In `.env`:
```
VITE_GHOST_URL=https://blog.yourdomain.com
```

### Nginx Config (Ghost)

```nginx
server {
    listen 443 ssl http2;
    server_name blog.yourdomain.com;

    ssl_certificate     /etc/ssl/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/ssl/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:2368;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### CORS (if Ghost is on a different subdomain)

Ghost handles CORS for the Content API automatically. If you run into issues, add to your Ghost nginx block:

```nginx
add_header Access-Control-Allow-Origin "https://yourdomain.com" always;
add_header Access-Control-Allow-Methods "GET, OPTIONS" always;
```

### Backups

Ghost data lives in a Docker volume. Back it up:

```bash
# Export Ghost content (JSON + images)
docker exec guardians-ghost ghost export --output /var/lib/ghost/content/data/backup.json

# Or backup the entire volume
docker run --rm -v portfolio-v2_ghost_data:/data -v $(pwd):/backup alpine tar czf /backup/ghost-backup.tar.gz /data
```

## How It Works

### When Ghost IS configured:
- Blog page fetches posts from Ghost's Content API
- Tags become filterable categories in the sidebar
- Featured posts get highlighted cards
- Clicking a post shows the full Ghost-rendered HTML
- Feature images, reading time, and excerpts all come from Ghost
- Ghost admin panel link appears in the sidebar

### When Ghost is NOT configured:
- Blog page shows placeholder posts (hardcoded in Blog.tsx)
- A banner tells visitors Ghost CMS is ready to connect
- Everything still looks great — the placeholders match your real content plan
- Zero errors, graceful fallback

## Ghost Editor Tips

- **Code blocks**: Use the `/` menu → Code, or triple backtick. Ghost supports syntax highlighting.
- **Feature images**: Click the image icon at the top of any post. These display as hero images on your blog.
- **Tags**: First tag = primary tag (used for filtering). Add multiple tags per post.
- **Scheduling**: Write posts ahead of time and schedule them to publish later.
- **SEO**: Each post has SEO settings (meta title, description, og:image). Ghost handles this well.
- **Drafts**: Posts are drafts until you explicitly publish. Safe to experiment.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Blog shows placeholders | Check `.env` has `VITE_GHOST_CONTENT_KEY` set, rebuild |
| "Ghost API unreachable" in console | Is Ghost running? `docker compose ps` |
| Posts not updating | Content API is read-time — no rebuild needed, just refresh |
| CORS errors | Check Ghost URL matches between `.env` and `docker-compose.yml` |
| Ghost admin won't load | `docker compose logs ghost` — check for port conflicts |

## What's Next

Now that Ghost is running, your blog roadmap items are basically done:
- ✅ Blog CMS / editor → Ghost admin panel
- ✅ Blog posts with categories, tags, featured posts
- ✅ No code changes needed to publish
- ⬜ Newsletter subscribers → Configure Ghost's built-in email (requires SMTP)
- ⬜ Custom theme for Ghost's own pages (optional — your React frontend is the primary)
