# The Bedouins Website - Working Instructions

Last updated: 2026-07-31

## Communication

- Speak with the user in Hebrew.
- Keep code, commands, paths, technical names, and commit messages in English.
- Be direct and practical.
- Do not invent content about projects, clients, or results.
- When content is missing, ask for a short team questionnaire instead of filling with generic marketing copy.

## Stack And Workflow

Use the existing stack:

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui
- Wouter
- pnpm
- Cloudflare Workers

Use these commands:

```bash
pnpm check
pnpm build
pnpm exec wrangler deploy
```

Deploy target:

```text
https://the-bedouins-production-house.shilla-bahar.workers.dev/
```

Cloudflare config:

```text
wrangler.toml
```

## Design Rules

- Preserve the black premium background direction.
- Use cyan `#3abfb5` as the primary brand color.
- Use orange `#ff9500` as a selective accent only.
- Keep Playfair Display for display titles and prominent CTAs.
- Keep Inter for readable body text.
- Keep Barlow Condensed for compact labels only when it fits the hierarchy.
- Avoid sudden heavy bold text that feels foreign to the page.
- Use rounded frames and internal frames consistently.
- Keep cyan borders thin and subtle.
- Do not add decorative UI that competes with the videos.
- Do not add cards inside cards unless there is a clear functional reason.

## Navigation Rules

- Header navigation labels are:
  - Work
  - Services
  - Team
  - Contact
- Navigation should account for the fixed header.
- Work should jump to the featured film card, not only to the top of the portfolio section.
- Contact should land so visitors understand there are both direct contact cards and a form.

## Video Rules

- Portfolio videos should start muted.
- Users can play/pause, mute/unmute, and control volume using custom controls.
- Keep custom controls small and design-consistent.
- Do not use large native browser controls unless explicitly requested.
- The logo/camel hero animation is decorative:
  - autoplay
  - loop
  - muted
  - no visible player controls
  - no speaker icon
- Intro logo audio is separate from the animation and should attempt to play once on page load or refresh.
- Do not loop intro audio.
- Browser autoplay policies may block audible sound without user interaction. Do not add a manual sound prompt unless the user requests it again.
- Use poster images for videos.
- Lazy load non-priority videos.
- Optimize large videos before adding them.

## Contact Rules

- Keep visible Email and WhatsApp contact paths.
- Keep the contact form below the direct contact cards.
- The form should submit immediately via AJAX.
- The form should not open Gmail compose.
- `Send Brief` should match the hero CTA style and should not include an icon.

## Content Rules

- Do not use fake testimonials.
- Do not claim client work, awards, metrics, or production details without approval.
- Portfolio context should be based on team answers.
- Preferred project-description structure:
  - Brief
  - What we made
  - AI role
  - Direction / animation / edit / sound role
  - Approved public sentence

## SEO Rules

- Keep metadata current in `client/index.html`.
- Do not reintroduce old names such as `Yaron Bachar` or `Ella Tern`.
- Do not point `og:image` to a non-existing file.
- Keep structured data aligned with the current team and services.
- After domain setup, update canonical URL, sitemap, robots, and Open Graph URLs.

## Testing Rules

Before committing:

```bash
pnpm check
pnpm build
git diff --check
```

For visual changes:

- Verify desktop and mobile layout.
- Check that text does not overlap or overflow.
- Check that video controls remain usable.
- Check that the Work jump shows the featured video frame.
- Check browser console for warnings/errors when feasible.

## Git And Rollback

- Commit focused changes with clear English messages.
- Do not revert user changes unless explicitly requested.
- Stable rollback checkpoint:

```text
12753a4 checkpoint-before-ux-content-seo-20260730
```

Latest documented checkpoint:

```text
ae1b0e5 Refine work anchor and contact CTA
```
