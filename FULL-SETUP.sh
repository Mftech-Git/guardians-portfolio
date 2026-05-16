# Guardians AZ — Full Setup From Scratch
# Assumes: Fresh Ubuntu 22.04/24.04 server with sudo access
# End result: Portfolio on :3000, Ghost CMS on :2368

# ══════════════════════════════════════════════════════════════
# STEP 1: System basics
# ══════════════════════════════════════════════════════════════

sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git unzip wget

# ══════════════════════════════════════════════════════════════
# STEP 2: Install Node.js (v20 LTS via NodeSource)
# ══════════════════════════════════════════════════════════════

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
node -v    # should show v20.x
npm -v     # should show 10.x

# ══════════════════════════════════════════════════════════════
# STEP 3: Install Docker + Docker Compose
# ══════════════════════════════════════════════════════════════

# Add Docker's official GPG key and repo
sudo apt install -y ca-certificates gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Let your user run docker without sudo
sudo usermod -aG docker $USER
newgrp docker

# Verify
docker --version          # Docker 24.x or 27.x
docker compose version    # Docker Compose v2.x

# ══════════════════════════════════════════════════════════════
# STEP 4: Install nginx (reverse proxy)
# ══════════════════════════════════════════════════════════════

sudo apt install -y nginx
sudo systemctl enable nginx

# ══════════════════════════════════════════════════════════════
# STEP 5: Get the portfolio project
# ══════════════════════════════════════════════════════════════

# Option A: If you have the zip file
mkdir -p ~/portfolio && cd ~/portfolio
# scp or transfer guardians-portfolio-v2.zip here
unzip guardians-portfolio-v2.zip

# Option B: If you push to a git repo first
# git clone https://github.com/yourusername/guardians-portfolio.git ~/portfolio
# cd ~/portfolio

# ══════════════════════════════════════════════════════════════
# STEP 6: Install dependencies & build the portfolio
# ══════════════════════════════════════════════════════════════

cd ~/portfolio
npm install
npm run build    # Creates dist/ folder — this is what nginx serves

# Quick test (optional — kill with Ctrl+C)
# npm run dev

# ══════════════════════════════════════════════════════════════
# STEP 7: Start Ghost CMS
# ══════════════════════════════════════════════════════════════

cd ~/portfolio
docker compose up -d

# Wait for Ghost to boot (~30 seconds)
sleep 30

# Check it's running
docker compose ps
# Should show "guardians-ghost" as "running (healthy)"

# Test Ghost is reachable
curl -s http://localhost:2368 | head -5
# Should return HTML

# ══════════════════════════════════════════════════════════════
# STEP 8: Configure Ghost → Get your Content API Key
# ══════════════════════════════════════════════════════════════

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  MANUAL STEP: Open http://YOUR-SERVER-IP:2368/ghost"
echo ""
echo "  1. Create your admin account"
echo "  2. Go to Settings → Integrations"
echo "  3. Click '+ Add custom integration'"
echo "  4. Name it 'Portfolio'"
echo "  5. Copy the Content API Key"
echo "═══════════════════════════════════════════════════════════"
echo ""

# ══════════════════════════════════════════════════════════════
# STEP 9: Connect portfolio to Ghost
# ══════════════════════════════════════════════════════════════

cd ~/portfolio
cp .env.example .env

# Edit .env — paste your Content API key
nano .env
# Change VITE_GHOST_CONTENT_KEY=your_content_api_key_here
# to     VITE_GHOST_CONTENT_KEY=abc123def456   (your actual key)

# Rebuild with Ghost config baked in
# (Vite bakes VITE_ env vars into the JS bundle at build time)
npm run build

# ══════════════════════════════════════════════════════════════
# STEP 10: Configure nginx
# ══════════════════════════════════════════════════════════════

# Create the site config
sudo tee /etc/nginx/sites-available/portfolio > /dev/null << 'NGINX'
# Portfolio — static SPA
server {
    listen 80;
    server_name yourdomain.com;    # ← change this

    root /home/YOUR_USER/portfolio/dist;    # ← change YOUR_USER
    index index.html;

    # SPA routing — all paths serve index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Ghost CMS — reverse proxy
server {
    listen 80;
    server_name blog.yourdomain.com;    # ← change this

    location / {
        proxy_pass http://127.0.0.1:2368;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
    }
}
NGINX

# Enable the site
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test config & reload
sudo nginx -t
sudo systemctl reload nginx

# ══════════════════════════════════════════════════════════════
# STEP 11 (OPTIONAL): SSL with Let's Encrypt
# ══════════════════════════════════════════════════════════════

# Only if your domain DNS is pointing to this server
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d blog.yourdomain.com

# Certbot auto-renews via systemd timer — verify:
sudo systemctl status certbot.timer

# After SSL, update Ghost's URL:
cd ~/portfolio
# Edit docker-compose.yml → change url to https://blog.yourdomain.com
nano docker-compose.yml
docker compose down && docker compose up -d

# Also update .env:
# VITE_GHOST_URL=https://blog.yourdomain.com
nano .env
npm run build
sudo systemctl reload nginx

# ══════════════════════════════════════════════════════════════
# DONE! Verify everything works:
# ══════════════════════════════════════════════════════════════

echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  ✓ Portfolio:    http://yourdomain.com"
echo "  ✓ Ghost Admin:  http://blog.yourdomain.com/ghost"
echo "  ✓ Ghost API:    http://blog.yourdomain.com/ghost/api/content/"
echo "═══════════════════════════════════════════════════════════"
echo ""
echo "  To write a blog post:"
echo "  1. Go to Ghost Admin"
echo "  2. Click + → Write your post"
echo "  3. Hit Publish"
echo "  4. It appears on your portfolio immediately"
echo ""

# ══════════════════════════════════════════════════════════════
# USEFUL COMMANDS REFERENCE
# ══════════════════════════════════════════════════════════════

# Ghost logs
# docker compose logs -f ghost

# Restart Ghost
# docker compose restart ghost

# Rebuild portfolio after code changes
# cd ~/portfolio && npm run build

# Ghost backup
# docker exec guardians-ghost ghost export

# Stop everything
# docker compose down

# Start everything
# docker compose up -d
