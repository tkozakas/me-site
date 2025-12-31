# me-site

A minimal, customizable personal website template. Clone it, edit the config files, and deploy.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/me-site.git
cd me-site

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Customization

Edit these files in the `config/` directory:

### `config/profile.yaml`

Your personal information: name, bio, social links, skills, experience, and projects.

### `config/dotfiles.yaml`

Your development environment setup: terminal, shell, editor configs, and dotfiles repository link.

## Deployment

### GitHub Pages (Recommended)

1. Fork this repository
2. Go to Settings → Pages → Source → GitHub Actions
3. Push to `main` branch - the site deploys automatically
4. Access at `https://YOUR_USERNAME.github.io/me-site`

**Custom Domain**: Add your domain in Settings → Pages, then update `next.config.ts` if needed.

### Other Platforms

The site exports to static HTML. Run `npm run build` and deploy the `out/` directory to any static host (Vercel, Netlify, Cloudflare Pages).

## Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run typecheck    # Run TypeScript checks
npm run format       # Format with Prettier
```

## Structure

```
me-site/
├── config/              # Your customization files
│   ├── profile.yaml     # Personal info
│   └── dotfiles.yaml    # Dev environment config
├── src/
│   ├── app/             # Next.js app router
│   ├── components/      # React components
│   └── lib/             # Utilities and types
├── .github/workflows/   # CI and deployment
└── public/              # Static assets
```

## License

MIT
