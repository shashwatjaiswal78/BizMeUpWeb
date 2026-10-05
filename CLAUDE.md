# BizMeUp Website: Project Brief for Claude Code (v2, design locked)

Read this whole file before writing any code. It is the source of truth for the build.

**The homepage design is final and locked.** It was approved as "Homepage, desktop: orange hero". Its exact markup and inline styles are in `homepage-design-reference.html` (included alongside this brief). Treat that file as the visual reference for every colour, size, spacing, rotation and piece of copy. It is a design file, not production code: rebuild it properly in the stack below, but do not change the layout, section order, colours, type, copy or visual details. If anything here conflicts with the reference file, the reference file wins, except for the approved changes in Section 0, which override both. If you think something should change, flag it at a checkpoint and wait. Never "improve" the design on your own.

---

## 0. Approved changes since the design lock

The client approved these changes during the build. They override the rest of this brief and `homepage-design-reference.html` wherever the two disagree.

- **Section colours (October 2026):** Hero cream; Stat bar split cream over white on desktop (the seam runs through the tiles' midline; all cream below 1024px); Manifesto white (#FFFFFF); Founder cream (no divider lines above or below it: the colour changes divide it from the Manifesto and Services); Services white; Case Files blue; Reels fan cream (CTA "See our social work" sits under the fan's arrows); Process mustard with espresso text; Testimonials cream; Audit CTA orange with white heading, text and outline button (Button variant `outline-light`), plus a soft mustard glow; Footer white. The hero spotlight veil is cream. theme-color is #FDF6EC.
- **Process is animated (October 2026):** four custom illustrations on cream sticker circles (Spot: magnifier finds a shop; Plan: checklist and pencil; Build: page assembles in a browser; Blow up: rocket launch) above a numbered track. Desktop: the track fills left to right scrubbed by scroll and each step lights up as it is reached, then keeps a small idle loop (paused off screen). Below 1024px the steps form a vertical timeline: a rail on the left joins nodes 1 to 4 (each node level with its sticker's centre), sticker and copy sit to the right, and each step lights up and fills its rail segment downward as it scrolls in. No-JS and reduced motion show the finished state. This is an approved addition to the motion list in Section 8.
- **Why choose us (October 2026):** new section after Process (`WhyUs.astro`), white background. Six reasons (Fast Turnaround, Strategic Planning, Clear Pricing, Proactive Updates, Dedicated Partnership, Active Support) on white tiles with the stat tiles' outline and soft shadow, each with a line icon in an orange, mustard or blue circle. Static. Descriptions are drafts awaiting client review.
- **No brown (October 2026).** The espresso family is now neutral: `espresso` #191919 (Dark Slate Black), `espresso-soft` #2E2E2E, `espresso-card` #242424, `espresso-line` #4A4A4A, `muted` #666666, and shadows use rgba(25,25,25,…). Token names are unchanged. Wherever this brief says "espresso", read #191919.
- **Hero is cream, not orange.** Cream ("ivory") background, espresso text and a cream spotlight veil. The composition is centred, and the scene scales down on short screens.
- **Hero scene:** Kutsu product photos in the website mockup, 8 client social posts in the phone grid, and 3 floating social logos in their original brand colours (YouTube, Instagram, WhatsApp), enlarged.
- **Hero controls:** no "Turn on the lights" / "Dim the lights" button (the client found it confusing). The lights come on at the first scroll, a click in the hero or any key press; the "Move your cursor" hint fades out when they do.
- **Hero scene polish:** one light source (shadows grow with stacking height: cards, browser, phone), alternating tilts (browser -3, phone 4, cards -3 and 2), nothing tucked under the phone, scene text 13px minimum, "yourbrand" used in both the mockup and the phone. Side by side, the scene's lowest card lines up with the bottom of the buttons. The "Websites from ₹15K" sticker is 100px (92px on phones) with more space from the buttons.
- **Hero headline** breaks after the first sentence: "Great businesses don’t fail." / "They go unseen."
- **Audit buttons** all read "Book my audit" (hero, CTA bands, service pages, nav, form). Descriptive copy still says "free visibility audit".
- **Typography:** curly apostrophes in display copy. The Manifesto headline is framed by two slab quote marks (cap-height tall, opening mark hanging left, closing mark inline after "problem.").
- **Homepage order:** Hero, Stat bar, Manifesto, Founder note, Services (Poster Wall), Case Files, Reels fan, Process, Why choose us, Testimonials, Audit CTA.
- **Header:** thinner nav (63px). The wordmark full stop is orange on light pages and cream on dark pages.
- **Poster Wall:** compact 3x3 grid on desktop. Illustrations on Social media, Performance marketing and Automations only, with none on Websites.
- **Case Files:** 4 real cases (Rudra, Nevoxel, Kutsu, Elemento) with a full-page site viewer.
- **Testimonials:** an animated testimonial box with 3 real clients. The group chat panel was removed (October 2026); on desktop the card stack sits left and the quote leads on the right.
- **Footer contact block:** only "India" plus Instagram and LinkedIn logos.
- **Industries marquee replaced by a Stat bar** (`StatBar.astro`): four floating tiles (white, 1.5px espresso outline, soft drop shadow; no solid offset shadow), no stars or band; 5+ Years, 40+ Clients, 120+ Projects delivered, ₹1 Cr In ad spends. On desktop screens at least 800px tall the row rises 40px into the hero's bottom padding. Static, 2 x 2 equal tiles on phones.
- **Founder photo** is `Image Assets/Hero.png` (optimised to `src/assets/founder/shashwat.webp`). On stacked layouts (below 1024px) the "Hi, I’m Shashwat." heading sits above the photo.
- **Watch us build was removed** (October 2026) and replaced by the Reels fan section (4.7).

---

## 1. Working rules

1. **Build in phases and stop at every checkpoint** (Section 13). Summarise what was built, list assumptions, and wait for explicit approval before continuing.
2. **No em dashes anywhere** in copy, alt text, metadata or rendered text. Use commas, full stops or colons.
3. **No emojis** anywhere on the site.
4. Use the copy exactly as written. Text in `[square brackets]` is a placeholder: render it visibly so it is easy to find and replace later.
5. One component per homepage section. Clean, readable code.
6. Mobile first. Most visitors arrive on phones, often from Instagram or WhatsApp in-app browsers, on mobile data.

---

## 2. Project overview

**Client:** BizMeUp, a marketing and digital execution agency in Mohali/Chandigarh, India. Founder: Shashwat Jaiswal.
**Core service:** website development. **Supporting:** social media, content strategy, performance marketing, SEO and blogs, automations.
**Positioning:** "It's not a product problem. It's a visibility problem."
**Tagline:** "Turning Business Challenges into Success Stories"
**Primary goal:** enquiries via the Free Visibility Audit form and WhatsApp.
**Vibe:** nostalgic, warm, human. A studio that tells great stories. Bold and campaign-like, never templated.

**Concept:** Spotlight hero plus Poster Wall services. Good businesses sit unseen; BizMeUp turns the lights on.

---

## 3. Locked design tokens

### Colour palette

| Token | Hex | Role |
|---|---|---|
| `cream` | `#FDF6EC` | Base background (about 55% of the page) |
| `espresso` | `#191919` | Text, dark blocks, marquee, buttons on light/orange (about 20%) |
| `mustard` | `#F4B942` | Process section, audit section, stickers, highlights (about 15%) |
| `orange` | `#E76F51` | Hero background, Websites poster, accents (about 6%) |
| `blue` | `#457B9D` | Case Files section, Content Strategy poster (about 4%) |

Supporting shades already used in the reference file (keep them exactly):

| Token | Hex | Use |
|---|---|---|
| `white` | `#FFFFFF` | Hero headline, subline and prompt; white posters; chat bubbles |
| `espresso-soft` | `#2E2E2E` | Body text on cream cards, mockup frames |
| `espresso-card` | `#242424` | Audit form card |
| `espresso-line` | `#4A4A4A` | Form field and chip borders on dark |
| `orange-deep` | `#B4472C` | Small orange text on cream (case kickers, links, Automations headline) |
| `cream-deep` | `#EFE2CC` | Testimonial chat panel, placeholders |
| `muted` | `#666666` | Secondary text, timestamps |
| `dashed` | `#D6C4A8` | Wireframe dashed boxes |

Define all of these as CSS custom properties and Tailwind theme colours. Do not introduce any other colours. Pure black (#000) is never used; the dark tone is Dark Slate Black #191919 (see Section 0).

### Typography (as approved in the design)

- **Display / headlines:** Bricolage Grotesque, weights 700 and 800, tight negative letter-spacing as in the reference.
- **Body / UI:** Instrument Sans, weights 400 to 700.
- **Accent:** Instrument Serif Italic, only in the Manifesto supporting line and the Founder note's first paragraph.

All three are Google Fonts. Self-host them as woff2 with `font-display: swap`; preload Bricolage Grotesque 800. Match the font sizes, line heights and letter-spacing in the reference file, including the `clamp()` values.

### Graphic details to preserve exactly

- Poster rotations (between -2deg and 2deg), tape strips, soft shadows, the peeled corner on the Performance poster.
- Rotated circular stickers ("Websites from ₹15K", "Starting ₹15K").
- Thin mustard underline under the word "visibility".
- Mustard four-point stars between marquee items.
- Fully rounded pill buttons.

---

## 4. Homepage: locked section-by-section spec

Order is fixed. Values below summarise the reference file; always check the file for exact styles.

### 4.1 Header (sits over the hero)
Transparent over the orange hero. Wordmark "BizMeUp" in espresso with a cream full stop. Nav links in espresso: Services, Work, About, Blog, Contact. Button "Book my audit": espresso background, cream text. On scroll the header becomes solid (use espresso background with cream text and keep the same layout). Mobile: wordmark plus a round menu button opening a full-screen espresso menu.

### 4.2 Hero (Spotlight, orange)
- Background **orange `#E76F51`**, min-height about 860px, content bottom-aligned on the left, scene on the right.
- **Spotlight interaction:** an orange veil covers the scene: `radial-gradient(circle 220px at X Y, rgba(231,111,81,0) 0%, rgba(231,111,81,0) 50%, rgba(231,111,81,0.95) 100%)`, with X and Y following the pointer (throttle with `requestAnimationFrame`). On mobile the visitor drags to move the light; if no touch within 2 seconds the light sweeps gently on its own. The "Turn on the lights" button fades the veil out over 700ms and changes to "Dim the lights". First scroll also turns the lights on. Reduced motion: no veil, scene fully visible.
- Prompt (white, 16px, 600): "Move your cursor. Find the business." On mobile: "Drag to turn on the lights."
- Toggle button: transparent, white text, `1px solid rgba(255,255,255,0.7)` border.
- **Headline (white, Bricolage 800, `clamp(48px, 6.2vw, 92px)`):** Great businesses don't fail. They go unseen.
- **Subline (white, 21px):** BizMeUp builds websites, content and campaigns that make you impossible to miss.
- Buttons: "Get a free visibility audit" (espresso background, cream text) and "See our work" (espresso outline and text).
- Sticker: mustard circle, espresso text, rotated 12deg: "Websites from ₹15K" `[confirm price]`.
- Scene (decorative, `aria-hidden`): a website mockup card, a phone with an Instagram-style grid, a search result card ("best jeweller near me" / "Your business, on page 1") and a mustard "New enquiry" card. Replace with a real hero image later if supplied; keep the composition.

### 4.3 Industries marquee
Espresso background, cream Bricolage 700 text at 40px, mustard stars. Items: Jewellery, Hospitality, Interiors, Law, Education, Resorts, Footwear, Home Solutions. Infinite scroll, pause on hover, static row with reduced motion.

### 4.4 Manifesto
Cream background. Headline espresso, Bricolage 800, `clamp(48px, 8.4vw, 132px)`: "It's not a product problem. It's a visibility problem." with a thin mustard underline under "visibility". Supporting line in Instrument Serif Italic, `#3A2E24`: "You've built something good. Nobody's seeing it. That's the part we fix." In the build, the headline words reveal one by one on scroll.

### 4.5 Services (Poster Wall)
Cream background, espresso rule above. Title: "Six ways we turn the lights on." Right-hand line: "Websites are the main event. Everything else makes sure people actually see them."

Three-column grid; Websites spans two columns and two rows. One column on mobile.

| Poster | Background | Text | Headline | Description |
|---|---|---|---|---|
| Websites (large) | orange | headline white; label, description and link espresso; sticker espresso with mustard text "Starting ₹15K" | Your 24/7 salesperson. | Fast, gorgeous websites built to turn visitors into enquiries, from landing pages to full Shopify stores. |
| Social media | mustard | espresso | Scroll-stoppers, on schedule. | Content, captions and community management that keep your brand showing up every week. |
| Content strategy | blue | white | Plans, not random posts. | A clear content plan built around your customers, your goals and what actually gets saved and shared. |
| Performance marketing | white, peeled corner | espresso, link orange-deep | Put ₹1 in. Get more out. | Meta and Google ads that are tracked, tested and scaled on what makes money. |
| SEO and blogs | espresso | cream, label mustard | Page 1, not page 4. | Search-friendly sites and regular blogs so customers find you when they're already looking. |
| Automations | white | espresso, headline orange-deep | Robots doing your boring stuff. | Lead capture, follow-ups and reporting on autopilot, so nothing slips through. |

Interaction: desktop hover lifts the poster slightly and peels a corner; mobile tap expands; keyboard focus reveals. Each poster links to its service page.

### 4.6 Case Files
**Blue `#457B9D` background**, cream text. Title "The Case Files." with subline "Real businesses. Real problems. Lights on." Progress label "Case 1 of 4" with a mustard progress bar.

- Desktop: pinned section, horizontal scroll driven by vertical scroll. Mobile: swipe with scroll-snap and dot indicators.
- Cards: cream background, `#3A2E24` text, 8px radius. The centred card is fully lit; others sit at 32% opacity and light up as they reach the centre.
- Card content: kicker in orange-deep ("Case 01 / Jewellery and Crystals"), client name, giant result headline in espresso ("[X]x more enquiries in [N] days"), "The problem:" line, espresso service chips with cream text, "Open the case file" link, laptop and phone mockups.
- Button below: "See all our work" (mustard background, espresso text).
- All card content comes from the case study content collection (Section 9).

### 4.7 Reels fan (replaces Watch us build)
Cream background, espresso text. Title "Content that stops the scroll.", a supporting line and a "See our social work" button (espresso) linking to the Social media service page. Copy is a draft awaiting client review.

Client reels (9:16 cards) in a card fan (`src/components/ui/CardFanCarousel.astro`, ported from the 21st.dev card-fan-carousel to vanilla TypeScript and GSAP). Seven cards are visible; arrows, dots, swipe and the arrow keys cycle through the rest. Hover lifts a card and pushes its neighbours aside. The centre card plays its muted video if it has one. The fan animates in when it first scrolls into view. Reduced motion: same layout, no animation. Reel data lives in `src/config/reels.ts`. Originals stay in `Video Gallery/` (gitignored); `node scripts/optimise-reels.mjs` encodes them to `public/reels/` (540x960 H.264, no audio, 1.2 Mbps cap) and makes poster frames in `src/assets/reels/`.

### 4.8 Process
**Mustard background**, espresso text. Title: "Spot. Plan. Build. Blow up." Four columns with a 3px espresso rule on top: Step 1 Spot. "We find what's keeping you invisible." Step 2 Plan. "A strategy built around your customers." Step 3 Build. "Website, content and campaigns, done properly." Step 4 Blow up. "Launch, measure and scale what works." No heavy animation.

### 4.9 Testimonials
Cream background. Title: "Don't take our word for it." Chat panel: `#EFE2CC` background, 2px espresso border, 20px radius; espresso header with a mustard "B" avatar, "Happy clients", "BizMeUp, you and 3 others". Three white incoming bubbles (name in orange-deep, quote, timestamp) as `[placeholders]`, then an espresso outgoing bubble: "Lights are on. Go check your enquiries." with mustard read ticks. Use `figure`, `blockquote` and `figcaption` underneath.

### 4.10 Founder note
Cream background. Taped photo print (white border, slight rotation, mustard tape) with `[Founder photo]`. Title "Hi, I'm Shashwat." Serif italic paragraph: "I've spent five years in marketing, across brand management, social and paid ads, watching good businesses lose to louder ones." Body: "BizMeUp exists to flip that. We're small on purpose, so you work with the people actually doing the work."

### 4.11 Audit CTA
**Mustard background** with a soft orange radial glow on the right. Title (espresso): "Ready to be seen?" Line (espresso): "Get a free visibility audit. We'll show you exactly what's keeping you invisible, and how to fix it." Outline button: "Chat on WhatsApp".

Form card: `#362A1F` background, mustard hairline border `rgba(244,185,66,0.45)`, 16px radius. Fields with espresso backgrounds and cream text: Name, Business name, Phone (WhatsApp), Website or Instagram link; chips "What do you need help with?" (Websites, Social media, Content strategy, Performance marketing, SEO and blogs, Automations) with orange checkboxes; "Monthly budget (optional)" select (Under ₹25K, ₹25K to ₹50K, ₹50K to ₹1L, ₹1L and above). Submit "Book my audit": mustard background, espresso text. Note under it: "We reply on WhatsApp within one working day."

Success message: "Audit booked. We'll message you on WhatsApp within one working day."
Error message: "That didn't go through. Check your phone number and try again, or message us on WhatsApp."

### 4.12 Footer
**Cream background**, espresso text, thin top border `rgba(43,33,24,0.2)`. Links: Services, Work, About, Blog, Contact. Contact block: `[Email]`, `[Phone]`, Mohali / Chandigarh, India, `[Instagram]` `[LinkedIn]`. Giant "BizMeUp" wordmark at `21vw`. Bottom row: tagline in espresso 600 and "© [current year] BizMeUp".

### 4.13 Floating WhatsApp button
Fixed bottom right on every page: 60px mustard circle, 1.5px espresso border, espresso chat icon, `aria-label="Chat on WhatsApp"`, pre-filled message "Hi BizMeUp, I'd like a free visibility audit." `[WhatsApp number]`.

### Contrast items to flag, not fix
Build these exactly as designed, then raise them at Checkpoint 2 and Checkpoint 5 for a decision. Do not change them without approval:
- White 16 to 21px text on the orange hero is slightly below WCAG AA for small text.
- The "Chat on WhatsApp" outline button in the Audit CTA has a cream border on mustard, which is hard to see.

---

## 5. Mobile layout

The homepage is the same design stacked into one column, in the same order with the same colours. Key rules: hero headline about 46px, buttons full width and stacked, sticker beside the buttons; posters in a single column keeping their rotations; Case Files becomes a swipe carousel with dots; form fields stack to one column with comfortable 48px touch targets. The `Homepage, mobile` board on the design canvas is the spacing guide. Where it differs in colour from the desktop design, the desktop design wins.

---

## 6. Other pages

Inner pages use the same tokens, header, footer (cream, as in 4.12) and floating WhatsApp button as the homepage. Follow the case study, service page and 404 boards on the design canvas for structure.

- **Service pages (6):** hero with the poster headline and a poster graphic, "What you get" grid, "How a website happens" style four-step process on mustard, related case files, FAQ accordion, CTA band.
- **Work:** all case studies, filterable by service.
- **Case study page:** breadcrumb, kicker, client name, result headline, meta row (industry, location, services, live site), large mockups, three stat cards, The challenge / The strategy / The build / The results with an in-page nav, client quote bubble, "Next case file" band in blue, CTA band.
- **About:** founder story expanded from 4.10, how BizMeUp works, values.
- **Blog:** index and post template.
- **Contact:** the Audit CTA section as a full page, plus email, phone and location.
- **404:** "This page is in the dark. Even we can't find it." with a "Back to home" button.

---

## 7. Tech stack

- **Astro** (latest stable), static output.
- **Tailwind CSS** with the tokens in Section 3.
- **GSAP + ScrollTrigger** for the spotlight, marquee, manifesto reveal, Case Files pin and the Reels fan. **Lenis** smooth scroll on desktop only.
- Vanilla TypeScript for interactive pieces; no UI framework unless genuinely needed.
- **Astro Content Collections** (Markdown/MDX) for case studies, services and blog posts.
- Astro image optimisation (AVIF/WebP, responsive `srcset`, lazy loading below the fold).
- Hosting: Vercel or Netlify `[to confirm]`.
- Analytics: GA4 and Meta Pixel, loaded on idle, IDs from environment variables.

Suggested structure:

```
src/
  components/
    home/     Hero, StatBar, Manifesto, PosterWall, CaseFiles,
              ReelsFan, Process, Testimonials, FounderNote, AuditCta
    ui/       Button, Sticker, Poster, Tape, ChatBubble, WhatsAppFloat
    layout/   Header, Footer, SEO
  content/
    case-studies/  services/  blog/
  pages/
    index.astro  services/[slug].astro  work/index.astro  work/[slug].astro
    about.astro  blog/index.astro  blog/[slug].astro  contact.astro  404.astro
  styles/tokens.css
```

---

## 8. Motion rules

Only these moments move: hero spotlight and lights-on, manifesto word reveal, Process step illustrations and track, poster lift/peel, Case Files horizontal scroll with dim-to-lit cards, Reels fan reels, button hover feedback. Everything else appears without entrance animation. Every motion has a `prefers-reduced-motion` fallback. Animate `transform` and `opacity` only. Kill and refresh ScrollTriggers on resize.

---

## 9. Content models

### Case study (`src/content/case-studies/*.md`)

```yaml
title: "[Client name]"
slug: "client-slug"
industry: "Jewellery and Crystals"
location: "[City, State]"
services: ["Shopify build", "Meta ads"]
featured: true          # show on homepage
order: 1
resultHeadline: "[X]x more enquiries in [N] days"
problem: "[One sentence on what was holding them back]"
stats:
  - { label: "Enquiries", value: "[+X%]" }
  - { label: "Page load time", value: "[Xs]" }
  - { label: "Return on ad spend", value: "[X]x" }
mockupDesktop: "./images/desktop.png"
mockupMobile: "./images/mobile.png"
liveUrl: "https://..."
testimonial: { quote: "...", name: "...", role: "..." }
publishedAt: 2026-10-01
```

Body sections: The challenge, The strategy, The build, The results. Seed four placeholder cases. Adding a case must never need code changes.

### Service (`src/content/services/*.md`)

```yaml
title: "Websites"
slug: "websites"
posterHeadline: "Your 24/7 salesperson."
shortDescription: "..."
posterColor: "orange"   # matches the Poster Wall
startingPrice: "₹15,000"
order: 1
seoTitle: "..."
seoDescription: "..."
```

### Blog post (`src/content/blog/*.md`)
`title`, `slug`, `description`, `cover`, `tags`, `publishedAt`.

---

## 10. Forms and integrations

- Form posts to a Google Apps Script web app (URL in an environment variable) that appends the lead to a Google Sheet and sends an email alert.
- Validate Indian 10-digit phone numbers (optional +91) and required fields. Honeypot for spam, no visible CAPTCHA.
- Fire GA4 and Meta Pixel `Lead` events on success.
- After submit, show a "Continue on WhatsApp" button with a pre-filled message including the visitor's name and business.

---

## 11. Sharing, SEO and performance

- Every page outputs its title, description and Open Graph/Twitter tags in static HTML so WhatsApp, Instagram, LinkedIn and X previews always work.
- **Auto-generated preview images per page** at build time (cream or orange background, espresso type, BizMeUp wordmark): case studies show the client name and result headline; service pages show the poster headline. Keep each image under 300 KB.
- `sitemap.xml`, `robots.txt`, JSON-LD: `Organization` and `LocalBusiness` (Mohali/Chandigarh) on home, `Service` on service pages, `Article` on posts, `BreadcrumbList` on inner pages. One `h1` per page.
- Lighthouse mobile targets: Performance 90+, LCP under 2.5s, CLS under 0.1. Test inside Instagram and WhatsApp in-app browsers on a mid-range Android phone.
- Accessibility: full keyboard navigation with a visible focus outline, meaningful alt text, decorative elements `aria-hidden`, reduced-motion support throughout.

---

## 12. Assets needed from BizMeUp

Logo files (SVG), founder photo, optional hero scene image, 3 to 4 case studies with real results and client permission, 3 testimonials, email, phone, WhatsApp number, social links, public starting prices, domain and hosting choice, GA4 and Meta Pixel IDs. Use visible placeholders until supplied.

---

## 13. Build phases and checkpoints

Stop at the end of each phase and wait for approval.

1. **Setup and tokens.** Astro, Tailwind tokens, self-hosted fonts, base layout, header, footer, floating WhatsApp button, and a `/styleguide` page showing colours, type, buttons, stickers and a sample poster. *Checkpoint 1.*
2. **Hero.** The orange Spotlight hero only, desktop and mobile, with lights-on and reduced-motion fallback. Raise the hero contrast item. *Checkpoint 2.*
3. **Homepage part one.** Stat bar (originally the industries marquee), Manifesto, Poster Wall. *Checkpoint 3.*
4. **Homepage part two.** Case Files (with placeholder collection), Reels fan (originally Watch us build), Process. *Checkpoint 4.*
5. **Homepage part three.** Testimonials, Founder note, Audit CTA with working form, footer. Compare side by side with `homepage-design-reference.html` and raise the CTA contrast item. *Checkpoint 5: homepage sign-off.*
6. **Inner pages.** Services, Work, case study template, About, Contact, 404. *Checkpoint 6.*
7. **Blog, SEO and integrations.** Blog, schema, sitemap, preview images, analytics, Apps Script form. *Checkpoint 7.*
8. **QA and launch.** Lighthouse, cross-device and in-app browser testing, accessibility pass, content swap, deploy. *Checkpoint 8: launch.*

---

## 14. Definition of done

- The homepage matches `homepage-design-reference.html` section for section: same order, colours, type, copy and details.
- No em dashes and no emojis anywhere.
- Lighthouse mobile targets met on Home, a service page and a case study page.
- All motion has a reduced-motion fallback.
- New case studies need only a Markdown file and images.
- Leads reach the Google Sheet and fire analytics events.
- Every placeholder is replaced or listed for the client.
