# The Bedouins Website - TODO

Last updated: 2026-07-31

## Done

- [x] Remove Lemon widget and all visible widget traces.
- [x] Update metadata and remove old names from SEO.
- [x] Standardize main cyan color around `#3abfb5`.
- [x] Add Ben-Gurion portfolio video in a web-optimized version.
- [x] Add custom video controls for portfolio examples: play/pause, mute/unmute, volume.
- [x] Keep logo animation decorative, muted, looping, and control-free.
- [x] Add intro logo sound as a separate one-time audio attempt on page load.
- [x] Remove visible speaker prompt from the logo animation.
- [x] Add poster images for videos.
- [x] Lazy load non-priority portfolio videos.
- [x] Add Services cards.
- [x] Integrate the process strip inside Services.
- [x] Add top navigation anchors: Work, Services, Team, Contact.
- [x] Adjust Work navigation so the featured video frame is visible after jump.
- [x] Add Email and WhatsApp contact cards above the form.
- [x] Make contact form send via AJAX instead of opening Gmail compose.
- [x] Restyle Send Brief CTA to match hero buttons and remove the icon.
- [x] Deploy latest version to Cloudflare Workers.

## Next Content Tasks

- [ ] Create a very short team questionnaire for each portfolio item:
  - What was the brief?
  - What did we create?
  - What was AI-generated or AI-assisted?
  - What did we do in direction, editing, animation, or sound?
  - One sentence we are allowed to publish.
- [ ] Add real portfolio context only after the team answers.
- [ ] Add 2-3 real testimonials or collaboration proof if the team can provide approved text.
- [ ] Decide whether to add captions/subtitles for videos with speech.
- [ ] If captions are added, keep them easy to disable by config.

## Next Technical Tasks

- [ ] Connect Google Search Console.
- [ ] Submit `sitemap.xml`.
- [ ] Add analytics events for:
  - WhatsApp clicks
  - Email clicks
  - Contact form submits
  - Work navigation clicks
  - Video play/unmute/volume interactions
- [ ] Run a Lighthouse pass on production.
- [ ] Check real mobile devices after each video-heavy change.
- [ ] Optimize any new large videos before adding them to `client/public/videos`.

## Open Decisions

- [ ] Buy or connect a clean domain for the group.
- [ ] Decide whether the site should stay English-only for now.
- [ ] Decide whether to add social proof as quotes, client logos, or selected collaborations.
- [ ] Decide whether to add deeper case-study pages later.
