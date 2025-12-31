# me-site

Minimal personal website. Edit YAML, deploy.

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/me-site.git
cd me-site
npm install
npm run dev
```

## Customize

Edit `config/profile.yaml` (your info) and `config/dotfiles.yaml` (dev setup).

## Deploy

**GitHub Pages**: Settings → Pages → Source → GitHub Actions. Deploys on push.

**Docker**: `docker build -t me-site . && docker run -p 80:80 me-site`

**Other**: `npm run build` → deploy `out/` folder.
