# neal-bliki

public repo for making neals bliki for him to become a Netlify Certified Partner

## Overview
public repo for making neals bliki for him to become a Netlify Certified Partner

## Tech Stack
- React
- Vite
- Netlify (deployed)

## Project Structure
```
neal-bliki/
  - public
  - scripts
  - src
  (123 files total)
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
```bash
git clone https://github.com/1nc0gn30/neal-bliki.git
cd neal-bliki
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Available Scripts
  npm run dev - vite --port=3000 --host=0.0.0.0
  npm run prebuild - tsx scripts/generate-prerender-manifest.ts && tsx scripts/generate-llms-txt.ts && tsx scripts/generate-rss-feed.ts
  npm run build - vite build
  npm run preview - vite preview
  npm run clean - rm -rf dist
  npm run lint - tsc --noEmit
  npm run prerender:manifest - tsx scripts/generate-prerender-manifest.ts
  npm run images:generate - python3 scripts/generate-local-placeholder-textures.py
  npm run images:optimize - bash scripts/optimize-images-ffmpeg.sh

## Original README
<details>
<summary>Click to expand original README</summary>

<!-- ═══════════════════════════════════════════════════════════════ -->
<!--                        NEAL BLIKI                             -->
<!--              Web Systems · Local SEO · AI Automation           -->
<!-- ═══════════════════════════════════════════════════════════════ -->

<div align="center">
  <br>
  <img src="public/logo-neal-avatar-transparent-bg.webp" width="96" height="96" alt="Neal Frazier" style="border-radius: 50%;">
  <br><br>
  
  <sup>
    <span style="color: #4285F4">●</span> Web Systems
    <span style="color: #9ca3af">·</span>
    <span style="color: #34A853">●</span> Local SEO
    <span style="color: #9ca3af">·</span>
    <span style="color: #EA4335">●</span> AI Automation
  </sup>
  
  <h1>NEAL BLIKI</h1>
  
  <p>
    A living portfolio, knowledge wiki, and service storefront — <br>
    prerendered to static HTML with surgical SEO precision.
  </p>
  
  <br>
</div>

---

## What This Is

This is not a template. It is a production-ready **bliki** — a hybrid of blog and wiki — built to demonstrate what happens when graphic design discipline meets web systems architecture.

Every route gets its own prerendered HTML file with unique metadata, heading hierarchies, and social previews. No placeholder copy. No generic SaaS chrome. Just clean composition, real content, and pages that index.

---

## Architecture

```
┌─────────────────────────────────────────┐
│  React 19        +  Vite 6              │
│  TypeScript      +  Tailwind CSS 4      │
│  React Router    +  Framer Motion       │
│  Custom Vite Plugin  →  22 Static HTML  │
└─────────────────────────────────────────┘
                    │
                    ▼
            ┌───────────────┐
            │    Netlify    │
            │  Edge Delivery │
            └───────────────┘
```

| Concern | Implementation |
|---------|---------------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 with custom design tokens |
| Routing | React Router (SPA with prerender) |
| Animation | Framer Motion + custom shader effects |
| Prerender | Custom Vite plugin — 22 routes to static HTML |
| Hosting | Netlify with pretty URLs + SPA redirects |
| Forms | Netlify Forms (contact + lead capture) |

---

## Route Map

```
/
├── wiki/
│   ├── wiki_100_websites
│   ├── wiki_ai_powerhouse_setup
│   ├── wiki_conversion_copy
│   ├── wiki_launch_sprint
│   ├── wiki_netlify_partner
│   ├── wiki_one_page_rapid_offer
│   ├── wiki_vb_booking_stack
│   └── wiki_vb_local_seo
├── blog/
│   ├── post_004
│   ├── post_005
│   ├── post_006
│   ├── post_007
│   ├── post_008
│   ├── post_009
│   ├── post_010
│   ├── post_011
│   └── post_012
├── offerings/          Services & pricing
└── contact/            Contact form with validation
```

**22 total prerendered routes.** Each with unique `title`, `meta description`, `canonical`, `og:title`, `og:description`, `og:url`, `og:image`, `twitter:card`, `twitter:title`, `twitter:description`, and `twitter:image`.

---

## Local Development

```bash
# Install
npm install

# Dev server (http://localhost:3000)
npm run dev

# Type check
npm run lint

# Production build + prerender
npm run build

# Preview production build
npm run preview

# Clean build artifacts
npm run clean
```

---

## SEO & Performance

- **Prerendered HTML** — Every route has its own `index.html` with complete metadata
- **Heading hierarchy** — One `h1` per page, logical `h2`/`h3` structure, no skipped levels
- **Sitemap** — `sitemap.xml` with 22 URLs, priorities, and changefreq
- **Robots** — `robots.txt` allowing all, sitemap referenced
- **Open Graph** — 1200x630 branded PNG with pixel art avatar + Three.js geometric flare
- **Canonical discipline** — Every page has canonical URL matching production domain
- **Netlify Forms** — Two forms (contact + lead capture) with honeypot spam protection
- **Pretty URLs** — Netlify `pretty_urls` enabled, no `.html` extensions
- **SPA Fallback** — `/* → /index.html 200` for client-side routing
- **Image optimization** — Netlify automatic image compression on deploy

---

## Deployment

**Target:** Netlify

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Prerender | Enabled |
| Pretty URLs | Enabled |
| SPA Redirect | `/* → /index.html` |
| Canonical Redirect | `www.nealfrazier.tech → 100websitesin30days.nealfrazier.tech` |

See [`netlify.toml`](netlify.toml) for full configuration.

---

## License

Copyright 2026 Neal Frazier. All rights reserved.

</details>

## TODO / Roadmap
- [ ] Add unit tests
- [ ] Add LICENSE file
- [ ] Add Dockerfile for containerized deployment
- [ ] Consider adding Tailwind CSS
- [ ] Add CI/CD pipeline
- [ ] Add contribution guidelines (CONTRIBUTING.md)
- [ ] Improve error handling and edge cases
- [ ] Add environment variable documentation
- [ ] Update dependencies to latest versions
- [ ] Add code comments and inline documentation

## Deployment
This project is deployed on Netlify. See netlify.toml for configuration.

## Author
**Neal Frazier** - [@AshAmplifies](https://github.com/1nc0gn30)

## Links
- GitHub: https://github.com/1nc0gn30/neal-bliki

---
*This README was enhanced as part of the neals-projects-2026 batch update.*
