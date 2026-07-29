# The Bedouins Production House - Project Summary

**Project Name:** THE BEDOUINS WEBSITE  
**Project ID:** eRNWBWnjMrYtVstHLgJTd3  
**Project Path:** /home/ubuntu/the-bedouins-production-house  
**Current Version:** 808604f9 (Restored from 824b8b24)  
**Status:** Active Development  
**Last Updated:** 2026-02-09

---

## Project Overview

**Purpose:** Build a professional website for The Bedouins Production House, a creative studio specializing in AI-driven video production, animation, sound design, and storytelling.

**Target Audience:** Creative agencies, brands, filmmakers, and content creators looking for high-quality production services.

**Key Differentiators:**
- Hybrid AI + human creative team
- World-class sound design (Yaron Bahar)
- Cutting-edge AI animation capabilities
- Premium storytelling and visual experiences

---

## Team Members

1. **Nimrod Reshef** - Director
2. **Yaron Bahar** - Composer/Sound Designer
3. **Ella Taran** - AI Animator
4. **Shilla Bahar** - Founder, AI Creator & Designer
5. **Gal Ziv** - Content Creator, Entrepreneur & Producer

---

## Design Philosophy

**Theme:** Modern, Tech-Forward Creative Studio  
**Color Palette:**
- Primary: Turquoise/Cyan (#3abfb5)
- Secondary: Orange/Gold (#ff9500)
- Background: Deep Black (#000000)
- Accent: Neon effects with glow

**Typography:**
- Display Font: Playfair Display (600, 700, 800 weights)
- Body Font: Inter (400, 500, 600, 700 weights)
- Condensed: Barlow Condensed (400, 500, 600, 700 weights)

**Visual Elements:**
- Animated camel mascot (colorful, neon-styled)
- Dark theme with neon accents
- Smooth animations and transitions
- Professional yet creative aesthetic

---

## Technical Stack

**Frontend:**
- React 19 with TypeScript
- Tailwind CSS 4
- Wouter for client-side routing
- shadcn/ui components
- Vite build tool

**Hosting:**
- Manus platform (built-in hosting)
- Available domains:
  - bedouinsph-lwtxgd7j.manus.space
  - thebedouins-ai.manus.space

**SEO:**
- sitemap.xml (created)
- robots.txt (created)
- Meta tags configured
- Open Graph tags for social sharing

---

## Current Layout & Components

### Hero Section
- **Left Side (40% width):** Main headline, subheadline, description, and CTA buttons
  - "Bringing Stories to Life with AI, Art and World-Class Sound"
  - Two CTAs: "View Our Work" and "Start a Project"
  - Adequate top padding to separate from banner
  
- **Right Side (60% width):** Animated camel video
  - Positioned with `translate-x-24` to move right and utilize empty space
  - Prevents overlap with text on desktop
  - Responsive scaling on mobile

### Navigation
- Top banner with logo and navigation (TBD)
- Smooth scroll anchors to sections

### Portfolio Section
- Video-first showcase
- Featured project: "ARI'S KNIFE"
- Placeholder cards for additional projects

### Team Section
- Team member profiles with photos and roles

### Contact CTA
- **Status:** Email and WhatsApp links are active
- **Location:** Header icons and contact section
- **Current phone link:** +972-54-5534560

---

## Known Issues & Decisions

### 1. Contact CTA
**Status:** Resolved with direct Email and WhatsApp contact paths.  
**Current implementation:** Header icons and the contact section route visitors directly to email or WhatsApp.

### 2. Desktop Layout Overlap (FIXED)
**Issue:** Animation was overlapping with headline text on desktop  
**Solution Applied (v824b8b24):**
- Text container: 40% width (reduced from 45%)
- Animation container: 60% width (increased from 55%)
- Animation positioned right with `translate-x-24`
- Result: Clean separation, no overlap

### 3. Content Placeholders
**Status:** Still present  
**Items to Replace:**
- Lorem Ipsum text
- "Project 1, 2, 3" placeholders
- Generic descriptions

**Needed Content:**
- Real project descriptions
- Client testimonials
- Services breakdown
- Process explanation

---

## SEO Status

**Completed:**
- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (Facebook/social sharing)
- ✅ Twitter card tags
- ✅ sitemap.xml created
- ✅ robots.txt created
- ✅ Favicon configured

**Next Steps:**
- Connect to Google Search Console
- Submit sitemap to Google
- Replace placeholder content with real text
- Add more descriptive content for better indexing

---

## Landing Page Audit Results

**Overall Score:** 68/100

### Strengths
- Strong visual impact and hero section (8/10)
- Clean responsive design (9/10)
- Team profiles build trust (positive)
- Clear core message

### Areas for Improvement
- **Trust & Social Proof (4/10):** Need testimonials, client logos, case studies
- **Services Presentation (5/10):** No dedicated services section
- **Value Proposition (6/10):** AI advantage not clearly articulated
- **Conversion Elements (7/10):** CTAs mostly in hero, need mid-page CTAs

### High Priority Recommendations
1. Replace all placeholder content
2. Add Services section with clear offerings
3. Add social proof (testimonials, client logos)

### Medium Priority Recommendations
1. Add contact form
2. Add project descriptions/context
3. Create "Why Choose Us" section

---

## Recent Changes & Checkpoints

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| 808604f9 | 2026-02-09 | Rollback to 824b8b24 | Current |
| eb90096a | 2026-02-09 | Removed third-party contact service | Rolled back |
| 88490553 | 2026-02-09 | Added sitemap.xml & robots.txt | Superseded |
| 824b8b24 | 2026-02-09 | Fixed desktop overlap (animation moved right) | Restored |
| 27fc7508 | 2026-02-09 | Initial layout adjustments | Superseded |
| 59f3d9eb | 2026-01-22 | Project initialized | Initial |

---

## Next Steps (Priority Order)

### Immediate (This Session)
1. **Portfolio and Video Controls:**
   - Add the Ben-Gurion video to the portfolio
   - Add native player controls to portfolio examples
   - Keep the hero logo animation decorative and control-free

2. **Contact Path QA:**
   - Verify email and WhatsApp links

### Short Term (Next Session)
1. **Content Replacement:**
   - Replace Lorem Ipsum with real descriptions
   - Add project context and descriptions
   - Add team member bios

2. **Add Missing Sections:**
   - Services section (3-4 core offerings)
   - Process/How It Works section
   - Testimonials/Social Proof section

3. **Improve Conversions:**
   - Add mid-page CTAs
   - Add contact form
   - Optimize CTA placement

### Medium Term
1. **SEO Optimization:**
   - Connect to Google Search Console
   - Submit sitemap
   - Monitor indexing status
   - Add blog/insights section

2. **Portfolio Enhancement:**
   - Fill all project slots with real work
   - Add case studies
   - Add video descriptions

3. **Performance:**
   - Lighthouse audit
   - Optimize video loading
   - Test on various devices

---

## Important Notes for Next Session

1. **Contact CTA:** Direct Email and WhatsApp links are active. Keep contact routes simple.

2. **Placeholder Content:** The site currently has Lorem Ipsum and generic text. Real content is critical for SEO and conversions.

3. **Design is Solid:** The layout, colors, and animations are working well. Focus should be on content and functionality.

4. **Domains Available:** Two custom domains are ready:
   - bedouinsph-lwtxgd7j.manus.space
   - thebedouins-ai.manus.space

5. **Publishing Ready:** Once current content and video updates are verified, the site is ready to publish.

---

## File Structure

```
/home/ubuntu/the-bedouins-production-house/
├── client/
│   ├── public/
│   │   ├── sitemap.xml (NEW)
│   │   ├── robots.txt (NEW)
│   │   └── images/
│   │       ├── favicon-camel-v2.png
│   │       └── logo.png
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.tsx (Main landing page)
│   │   ├── components/
│   │   │   └── (shadcn/ui components)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css (Global styles & theme)
│   └── index.html (HTML entry point and SEO metadata)
├── server/ (Placeholder - not used)
├── shared/ (Placeholder - not used)
└── package.json
```

---

## Contact & Communication

**User Preferences:**
- Primary Language: Hebrew (עברית)
- Communication Style: Direct and practical
- Decision Making: User provides clear approval before implementation

---

## End of Summary

This document should be referenced at the start of the next session to maintain context and continuity of the project.
