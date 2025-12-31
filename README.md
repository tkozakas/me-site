# me-site

Personal GitHub stats dashboard. Fetches data via `gh` CLI at build time.

## Features

- Profile overview (avatar, bio, followers, repos)
- Contribution graph (GitHub-style heatmap)
- Streak stats (current, longest, total contributions)
- Top repositories
- Language breakdown
- Recent activity

## Setup

```bash
git clone https://github.com/tkozakas/me-site.git
cd me-site
npm install
npm run dev
```

Requires `gh` CLI authenticated locally.

## Deploy

Deploys to GitHub Pages via Actions. The workflow uses `github.token` for API access.

Live: https://tkozakas.github.io/me-site
