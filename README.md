# gh-stats

GitHub stats dashboard. [ghstats.fun](https://ghstats.fun)

## Development

```bash
docker compose --profile dev up --build
```

Access at `http://localhost:3000`

## Production (Raspberry Pi + Cloudflare Tunnel)

1. Create tunnel at [Cloudflare Zero Trust](https://one.dash.cloudflare.com) → Networks → Tunnels
2. Configure public hostname: `ghstats.fun` → `http://caddy:80`
3. Create `.env`:

```bash
TUNNEL_TOKEN=your_token_here
```

4. Run:

```bash
docker compose --profile prod --profile tunnel up -d
```

## Optional: GitHub OAuth

For login functionality, create OAuth App at https://github.com/settings/developers and add to `.env`:

```bash
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
```
