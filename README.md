# me-site

Personal GitHub stats dashboard.

## Features

- Profile, contributions graph, streak stats
- Top repositories with language filtering
- Semantic commit search
- Auto-updates via GitHub webhooks

## Run

```bash
# Development
GITHUB_TOKEN=xxx docker compose --profile dev up --build

# Production
GITHUB_TOKEN=xxx DOMAIN=example.com docker compose --profile prod up -d
```

Frontend: http://localhost:3000  
Backend: http://localhost:8080
