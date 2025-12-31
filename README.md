# me-site

Personal GitHub stats dashboard with live updates and semantic commit search.

## Features

- Profile, contributions graph, streak stats
- Top repositories with language filtering
- Semantic commit search
- Auto-updates via GitHub webhooks

## Run

```bash
# Create .env
echo "GITHUB_TOKEN=your_token" > .env

# Development (build from source)
docker compose --profile dev up --build

# Production (pre-built images, auto-updates)
docker login ghcr.io -u tkozakas
docker compose --profile prod up -d
```

Frontend: http://localhost:3000  
Backend API: http://localhost:8080

## Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `GITHUB_TOKEN` | Yes | GitHub personal access token |
| `GITHUB_USERNAME` | No | Username to fetch (default: tkozakas) |
| `WEBHOOK_SECRET` | No | For GitHub webhook verification |
