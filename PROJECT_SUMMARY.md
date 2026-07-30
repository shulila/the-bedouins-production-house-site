# The Bedouins Production House - Project Summary

**Project:** The Bedouins Production House website
**Status:** Active development
**Last updated:** 2026-07-31
**Current branch:** `main`
**Current checkpoint:** `ae1b0e5` - `Refine work anchor and contact CTA`
**Stable rollback checkpoint:** `12753a4` - `checkpoint-before-ux-content-seo-20260730`

## Live Site

Production URL:

`https://the-bedouins-production-house.shilla-bahar.workers.dev/`

Latest verified deploy:

- Commit: `ae1b0e5`
- Cloudflare Version ID: `6b26a721-44db-496d-a93f-e954b4508540`
- Cache-busted preview: `https://the-bedouins-production-house.shilla-bahar.workers.dev/?v=ae1b0e5`

The Workers URL still includes the account/subdomain name. A cleaner group URL requires connecting a custom domain or moving the Worker under a different Cloudflare account/subdomain.

## Project Purpose

Build a premium, high-performance website for **The Bedouins Production House** - a creative group specializing in AI video production, animation, sound design, creative direction, and cinematic storytelling.

Target audience:

- Creative agencies
- Brands
- Filmmakers
- Content creators
- Teams looking for cinematic AI-assisted production

## Brand And Design Direction

Core direction:

- Premium black background
- Neon cyan/turquoise: `#3abfb5`
- Orange accent: `#ff9500`
- High-end, cinematic, AI-forward production studio
- Neon camel mascot / logo animation
- Video-first portfolio
- Rich but restrained creative energy

Typography:

- Display: `Playfair Display`
- Body: `Inter`
- Condensed labels: `Barlow Condensed`

Current typography decisions:

- Large section titles use Playfair Display.
- Portfolio/service/process card titles use Playfair Display with medium/semibold weight.
- Body text stays clean and readable.
- CTA buttons use Playfair Display to match the hero buttons.
- Avoid heavy bold text where it feels visually foreign.

UI shape decisions:

- Frames use rounded corners, thin cyan borders, and subtle cyan-tinted dark fills.
- Buttons are rounded pill CTAs with cyan glow.
- Do not add nested cards unless the component is truly framed.
- Header navigation uses subtle Playfair styling and cyan text.

## Technical Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui components
- Wouter routing
- pnpm workflow
- Cloudflare Workers deployment via Wrangler

Important scripts:

```bash
pnpm check
pnpm build
pnpm exec wrangler deploy
```

Cloudflare config:

- File: `wrangler.toml`
- Worker name: `the-bedouins-production-house`
- Assets directory: `./dist/public`
- SPA fallback: enabled

## Current Site Structure

### Header

- Logo without camel in the fixed top bar.
- Section navigation: `Work`, `Services`, `Team`, `Contact`.
- Header contact icons: Email, WhatsApp, theme toggle.
- Navigation uses smooth scroll and adjusted offsets for the fixed header.
- `Work` now jumps directly to the featured film card so the video frame is visible instead of hidden below the fold.

### Hero

- Main headline: `Bringing Stories to Life with AI, Art and Sound`.
- CTAs: `View Our Work`, `Start a Project`.
- Animated camel/logo video is decorative, muted, autoplaying, and looping.
- A short intro logo sound exists as a separate audio file and attempts to play once on page load or refresh.
- There is no visible sound control on the logo animation.
- Browser limitation: Chrome/iOS may block audible autoplay until a user interaction. The code should not add a manual speaker icon unless explicitly requested again.

### Portfolio / Work

- Section title: `The Craft`.
- Featured project:
  - ID: `showreel`
  - Title: `From Script to Soul`
  - Video: `/videos/showreel.mp4`
  - Poster: `/images/posters/showreel.jpg`
- Featured video uses `object-contain` so the full frame is visible.
- Smaller portfolio videos keep cropped `object-cover` cards for a consistent grid.
- Portfolio videos have custom controls:
  - Play/pause
  - Mute/unmute
  - Volume slider
- Videos start muted and can be unmuted by the visitor.
- Lazy loading is active: key videos load eagerly, the rest load as the visitor approaches them.

Current portfolio examples:

- `Who Killed Arlozorov`
- `Ben-Gurion`
- `Motion Graphics`
- `Animated Worlds Beyond Reality`
- `Experimental Visual Experiences`
- `Historical Reconstructions`
- `AI Cinematic Storytelling`
- `Creative Concepts`

### Services

Current service cards:

- `Story Alchemy`
- `Echo-Crafted Sound`
- `Fast Track Studio`
- `End-to-End Visual Production`

Process strip:

- Main heading: `A lean production path, built for cinematic outcomes.`
- Subline: `From brief to finished film`
- Steps: `Brief`, `Concept`, `AI / Production`, `Sound & Delivery`

The process strip is intentionally integrated into Services instead of a separate large Process section.

### Team

Section title: `Our Tent`.

Current members:

- Shilla Bahar - Founder, AI Creator & Designer
- Nimrod Reshef - Director
- Ella Taran - AI Animation & Editor
- Yaron Bahar - Sound Designer & Composer
- Gal Ziv - Content Creator, Entrepreneur & Producer

Team mobile layout was intentionally left untouched when the user said not to change it.

### Contact

Contact layout:

- Email and WhatsApp cards first.
- Contact form below.
- `Send Brief` button matches the hero CTA style and has no icon.

Contact paths:

- Email: `thebedouins.ai@gmail.com`
- WhatsApp: `https://wa.me/972545534560`
- Form endpoint: `https://formsubmit.co/ajax/thebedouins.ai@gmail.com`

Form behavior:

- The form sends immediately via AJAX.
- It should not open a Gmail compose draft.
- Keep Email and WhatsApp fallbacks visible.

## SEO / Metadata Status

Completed:

- Removed old names from metadata.
- Updated title/description/Open Graph direction.
- Removed Lemon widget references from `client/index.html`.
- Added structured data basics.
- `sitemap.xml` and `robots.txt` exist.

Still recommended:

- Connect Google Search Console.
- Submit sitemap.
- Add real case-study text for portfolio items after the team answers a short questionnaire.
- Add captions/subtitles only when final spoken-video content is confirmed.

## Performance Notes

Current improvements:

- Project videos use poster images.
- Non-priority portfolio videos lazy load as the user approaches.
- Custom video controls are small and design-consistent.
- The large Ben-Gurion source was optimized into a web version.

Known risk:

- The page is video-heavy. Any new large videos should be converted to web-optimized MP4/WebM before deployment.

## Recent Change Log

| Commit | Date | Summary |
| --- | --- | --- |
| `ae1b0e5` | 2026-07-31 | Refined Work anchor, featured video fit, Process text order, and Send Brief CTA |
| `c6db1b8` | 2026-07-31 | Removed visible intro sound prompt from logo animation |
| `f4a60ea` | 2026-07-30 | Unified CTA typography and intro sound fallback |
| `06fb056` | 2026-07-30 | Refined typography and contact layout |
| `8f21574` | 2026-07-30 | Unified text hierarchy and frame styling |
| `64a8ab4` | 2026-07-30 | Stabilized section navigation offsets |
| `cb7080e` | 2026-07-30 | Busted cached audio video URL |
| `8450870` | 2026-07-30 | Fixed media audio and contact UX |

## Important User Preferences

- Communicate with the user in Hebrew.
- Keep code, file paths, commands, and technical identifiers in English.
- Use pnpm.
- Preserve React + TypeScript + Vite + Tailwind stack.
- Use short hyphens, not em dashes.
- Do not reintroduce Lemon widget or any hidden third-party chat widget.
- Do not touch the mobile team-card text unless the user explicitly changes direction.
- Ask before adding speculative content that could sound fake.
- Do not invent project case-study details. Use a short team questionnaire first.
- Deploy after approved visual/code changes unless the user says not to.

## Key Files

```text
client/src/pages/Home.tsx      Main landing page
client/src/index.css           Global styles and theme tokens
client/index.html              SEO metadata and HTML entry
client/public/videos/          Public video assets
client/public/images/posters/  Video poster images
client/public/audio/           Intro sound asset
wrangler.toml                  Cloudflare Workers config
PROJECT_SUMMARY.md             Current project summary
todo.md                        Current task list
INSTRUCTIONS.md                Working instructions
```
