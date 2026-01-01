# GitHub Stats

GitHub analytics dashboard. [ghstats.fun](https://ghstats.fun)

![Preview](./demo.png)

## Setup

Create `.env` with GitHub OAuth credentials from https://github.com/settings/developers:

```bash
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
TUNNEL_TOKEN=xxx # prod only
```

## Run

```bash
docker compose --profile dev up   # development
docker compose --profile prod up  # production
```
