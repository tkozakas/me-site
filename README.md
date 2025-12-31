# me-site

Personal GitHub stats dashboard with live updates and semantic commit search.

## Architecture

```
me-site/
├── frontend/          # Next.js static site
│   └── src/
│       ├── components/   # React components
│       └── lib/          # API client, types
├── backend/           # Go API server
│   ├── cmd/server/    # HTTP server entry point
│   └── internal/
│       ├── github/    # GitHub API client
│       ├── search/    # Semantic search (uses ck CLI)
│       ├── cache/     # In-memory stats cache
│       └── api/       # HTTP handlers
└── docker-compose.yml
```

## Features

- Profile overview (avatar, bio, followers, repos)
- Contribution graph (GitHub-style heatmap)
- Streak stats (current, longest, total contributions)
- Top repositories with language filtering
- Language breakdown (click to filter repos)
- Semantic commit search via `ck`
- Live data refresh via GitHub webhooks

## Quick Start

### Local Development

**Backend:**
```bash
cd backend
export GITHUB_TOKEN=your_token
go run ./cmd/server
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### Docker Compose

```bash
export GITHUB_TOKEN=your_token
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GITHUB_TOKEN` | Yes | - | GitHub personal access token |
| `GITHUB_USERNAME` | No | tkozakas | GitHub username to fetch stats for |
| `WEBHOOK_SECRET` | No | - | Secret for verifying GitHub webhooks |
| `PORT` | No | 8080 | Backend server port |
| `NEXT_PUBLIC_API_URL` | No | http://localhost:8080 | Backend API URL for frontend |

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stats` | GET | Get GitHub stats (optional `?language=X` filter) |
| `/api/search` | GET | Semantic commit search (`?q=query`) |
| `/api/webhook/github` | POST | GitHub webhook for live updates |
| `/health` | GET | Health check |

## GitHub Webhook Setup

1. Go to your GitHub repo settings → Webhooks
2. Add webhook:
   - Payload URL: `https://your-domain/api/webhook/github`
   - Content type: `application/json`
   - Secret: Set `WEBHOOK_SECRET` env var
   - Events: Push, Pull request, Issues
