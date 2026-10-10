# Tattva Mindlabs

A Next.js App Router website based on the supplied **Tattva Mindlabs.docx** and gold logo, with reusable page components and all editorial content in source control. The default production build creates a standalone Node.js application for Hostinger; a static export is also available.

## Included

- Homepage, philosophy and founder page, programme overview and dedicated ANTARAA page.
- Eleven confirmed practices with individual detail pages and accessible category tabs.
- Nine illustrated starting points, three Telugu interview players and the two confirmed products.
- Responsive navigation, keyboard-accessible dialogs and FAQ, reduced-motion support, local fonts and compressed WebP photography.
- Enquiry preparation with context carried from each service, programme or product. Visitors review their details before choosing WhatsApp or email. No message is sent by the website and no database or inbox is claimed.

## Run and verify

```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run build
```

Use Node.js 24.15 or newer within the 24.x release line. The default build outputs `.next/standalone/`, including the production server, images, fonts and compiled assets. Run `npm start` after building. See [HOSTINGER_DEPLOYMENT.md](HOSTINGER_DEPLOYMENT.md) for GitHub deployment settings.

For static hosting, run `npm run build:static` and serve `out/`. The existing Sites configuration in `.openai/hosting.json` refers to this static output. Private review metadata is set to `noindex, nofollow` in `app/layout.tsx`; update the canonical domain and indexing policy when preparing the approved public launch.

## Content and imagery

Confirmed: holistic wellbeing and self-transformation; mind, body, energy and soul; the 11 practices; ANTARAA; Artisanal Bath Salts; Divine Vibrance handmade multipurpose powder. Yoga appeared twice in the supplied document and is presented once.

ANTARAA is marked **Launch planned · 20 December**. The client has not supplied a year, curriculum, duration, format or fees. The page invites an enquiry rather than inventing these details. Product composition, pricing and pack photography also remain for client confirmation.

The phone, email and Hyderabad address were verified against the brand’s existing official contact page on 7 October 2026: https://www.tattvamindlabs.com/contact. Keep them in `lib/content.ts`.

The uploaded logo is preserved in `public/media/tattva-logo.png`. The header displays its monogram through CSS cropping. Founder and event photographs came from the earlier project’s reference collection; the amber hero and riverside image are previously generated banner treatments. The ritual still life is an original AI-generated editorial illustration, not a photograph of the client’s packaged products. Its caption makes that distinction on the products page.

## Design sources

- Warm ivory, terracotta, amber, umber and the client’s gold logo; Cormorant and DM Sans typography. Original layout inspired by the client’s spiritual-editorial references.
- UI UX Pro Max: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill — spacing, accessibility, responsive and typography guidance.
- Magic UI: https://github.com/magicuidesign/magicui — official BlurFade registry component, used sparingly with reduced-motion support.
- Emil Kowalski’s design engineering skill: https://github.com/emilkowalski/skills — deliberate transitions, touch targets and restrained interaction feedback.
- shadcn/ui official registry: Sheet, Dialog, Tabs, Accordion and Button, backed by Radix UI. Registry imports adapted to the project aliases.
- Lucide line icons; no unverified testimonials, performance metrics or healing guarantees.

## Verification boundaries

Production compilation, TypeScript checks, static route/asset checks and DOM interaction tests are performed for this version. Full visual/browser QA is not available in this environment because the required browser-control skill is unavailable. Confirm real-device appearance, client content and media approvals before using the client’s production domain.

## October 2026 visual update

The homepage now uses a portrait-composed, high-detail generated hero, a deep amber editorial layout, entrance and staggered scroll animations, light scroll-linked parallax and Lenis smooth scrolling. Motion honors reduced-motion settings, keeps native touch scrolling, and stops behind dialogs. Typography is larger throughout.

The supplied social banner is used as the photographic reference in the new native HTML “Explore. Reflect. Grow.” section. Its links and text are real, accessible HTML; all three supplied profiles also appear in the footer and mobile menu. Tracking parameters were removed from the social profile URLs.

Brand icons: Font Awesome Free, https://fontawesome.com/license/free (CC BY 4.0 icons), fetched from the official 7.x SVG repository. Lenis: https://github.com/darkroomengineering/lenis.

## Service photography update

All ten service images supplied on 8 October 2026 are integrated into the practices catalogue and corresponding detail pages. The previously generated Colour Therapy prism image completes the eleven-practice collection. The homepage's three existing wellbeing pathways and related-practice links also use matching imagery. These are editorial illustrations, not photographs documenting sessions or evidence of results.

`lib/practice-images.ts` records the service-to-image mapping and descriptive alternative text. `components/practice-image.tsx` serves WebP images at 480, 960 and 1536 pixels, preserves the full 3:2 composition, reserves image dimensions, and lazy-loads images except the service-page lead image. Card titles remain accessible HTML. Hover motion respects reduced-motion preferences. Original uploads remain unchanged.

## ANTARAA homepage invitation

A compact programme banner appears directly after the founder introduction and before the interview collection. It adapts the supplied three-column reference into Tattva's brown, amber, ivory and gold palette, reuses the approved white-saree portrait, and keeps the copy and links as accessible HTML. The interest button opens the existing enquiry form with ANTARAA selected; the secondary link opens the programme page. Mobile layouts stack without overlapping the portrait and copy. The existing reduced-motion-aware reveal supplies the entrance animation. No unconfirmed step count, results, dates or programme details were added.

## Volunteering and recognition update

The homepage now includes all seven supplied recognition logos between the founder introduction and ANTARAA invitation, with equal visual frames, monochrome CSS treatment and separate awards/organisation/association/speaking-platform captions. The JPEG originals are preserved exactly in `public/media/recognitions`; no logos or lettering were redrawn, no award categories or accomplishments were invented, and TEDx is identified as a speaking platform.

The volunteering homepage invitation links to `/volunteering/`, also available through the header, mobile navigation and footer. Its dedicated form validates required contact details, city, interest, availability and permission to be contacted; it prepares a reviewable message for the established WhatsApp/email handoff. It does not submit to a database, claim a completed registration, send a message automatically or store personal details in browser storage. Editing the form invalidates a prepared message. Privacy copy covers both forms. Suggested areas are expressions of interest; opportunities are confirmed by the team.
