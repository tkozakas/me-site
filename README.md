# GitHub Stats

GitHub analytics dashboard with contribution streaks, language stats, and country rankings. [ghstats.fun](https://ghstats.fun)

![](./demo.png)

## Features

- Contribution streaks (current and longest)
- Language usage across all repositories
- Recent commits from all repositories
- Country rankings by contributions

## Setup

Create `.env` with GitHub credentials:

```bash
GITHUB_TOKEN=xxx              # https://github.com/settings/tokens
GITHUB_CLIENT_ID=xxx          # https://github.com/settings/developers
GITHUB_CLIENT_SECRET=xxx
```

## Usage

```bash
docker compose --profile dev up   # development
docker compose --profile prod up  # production
```

## License

MIT
