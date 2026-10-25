# Olive House — Kigamboni, Dar es Salaam

A production-ready marketing and booking-inquiry website for **Olive House**, a two-bedroom holiday home in Kigamboni, Dar es Salaam, Tanzania. Built with Vite, React 19, TypeScript and Tailwind CSS v4, with GSAP + Lenis for motion, an embedded Google map, and a code-split gallery and booking flow.

Official listing: <https://www.airbnb.com/rooms/1759153791039194505>

## Quick start

```bash
npm install
cp .env.example .env     # then fill in the values you have
npm run dev              # http://localhost:5173
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run build` | Type-checks and builds the production bundle into `dist/` (also emits `robots.txt` and `sitemap.xml`). |
| `npm run preview` | Serves the production build locally. |
| `npm run lint` | ESLint (flat config, TypeScript + React Hooks rules). |
| `npm run typecheck` | TypeScript project references, no emit. |
| `npm run images` | Regenerates responsive WebP images and the image manifest from `photos/`. |

Requires Node 20 or newer.

## Configuration (`.env`)

All values are optional; the site degrades gracefully when one is missing.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public URL of the deployed site. Used for canonical links, Open Graph tags, `sitemap.xml` and `robots.txt`. |
| `VITE_WHATSAPP_NUMBER` | WhatsApp number in international format, digits only (e.g. `255712345678`). When set, the booking form offers "Send via WhatsApp" and the footer shows a WhatsApp link. When empty, inquiries continue on Airbnb. |
| `VITE_CONTACT_EMAIL` | Optional e-mail address; adds a "Send by e-mail" option and a footer link. |
| `VITE_AIRBNB_URL` | Airbnb listing URL (defaults to the Olive House listing). |
| `VITE_MAP_LAT` / `VITE_MAP_LNG` | Precise map pin for the embedded Google map. Leave blank to centre the map on Kigamboni generally. When set, the coordinates are also added to the Schema.org data and geo meta tags at build time. |
| `VITE_GOOGLE_MAPS_URL` | The house's Google Maps place link, used by "Open in Google Maps". Falls back to a search link. |

Environment variables are read at build time, so rebuild after changing them.

## Photographs

The site only uses real photographs of Olive House. The originals in `photos/` were taken from the owner's Airbnb listing and the owner's own files, renamed descriptively:

| File | Shows |
| --- | --- |
| `hero-exterior.jpg` | Front veranda, red gate and timber door (hero + social image) |
| `living-room.jpg`, `living-room-detail.jpg` | Living room, art wall and macramé curtain |
| `bedroom-one.jpg`, `bedroom-one-detail.jpg` | Bedroom one (queen bed, en-suite) |
| `bedroom-two.jpg`, `bedroom-two-detail.jpg` | Bedroom two (double bed) |
| `kitchen.jpg` | Kitchen |
| `bathroom.jpg`, `bathroom-shower.jpg`, `bathroom-vanity.jpg`, `detail-shower-gel.jpg` | Bathrooms and bath essentials |
| `wardrobe.jpg` | Wardrobe storage |

### Adding or replacing photos

1. Drop the original JPEG/PNG/HEIC into `photos/` using a descriptive, lowercase, hyphenated name (e.g. `outdoor-space.jpg`).
2. Run `npm run images`. This writes `public/images/<name>-{480,768,1080,1440,1920}.webp`, a blurred placeholder, the `og-image.jpg` social card from `hero-exterior`, and regenerates `src/data/images.generated.ts`.
3. Register the photo in `src/data/gallery.ts` with its alt text, caption and room. Use it anywhere with `<Picture image="outdoor-space" />`.

Only commit photos that genuinely show the property.

## Content and configuration files

Everything editorial lives in `src/data/` so copy changes never touch components:

- `property.ts` — verified facts (beds, baths, guests, check-in times), room descriptions, the seven headline amenities, the "also in the house" list, honest "good to know" notes, nearby places and the approximate map area.
- `gallery.ts` — every photo with alt text and caption, plus the curated homepage preview.
- `reviews.ts` — guest reviews. Only entries with `published: true` render. The one real Airbnb review is included but unpublished until you decide to show it.
- `navigation.ts` — menu items.

## Booking flow

The booking page (`/book`) validates dates (no past dates, check-out after check-in), guests (1–3), name and contact with Zod + React Hook Form, then:

- **Direct inquiry** — drafts a message with dates, nights, guests and contact details and opens WhatsApp (`wa.me`) or an e-mail client. This is clearly labelled as an inquiry, never a confirmation.
- **Book on Airbnb** — opens the listing with `check_in`, `check_out` and `adults` prefilled, so Airbnb handles availability and payment.

The architecture in `src/lib/booking/` separates `InquiryChannel`s from an `AvailabilityProvider`. The default provider returns `unknown` and blocks no dates. To connect a calendar later, implement `AvailabilityProvider` (e.g. from an iCal feed or your backend) and swap it in `availability.ts`; the date picker will disable blocked dates automatically.

## Design system

- **Type**: Cormorant Garamond (editorial serif) + Manrope (sans), loaded non-blocking from Google Fonts.
- **Palette** (`src/styles/global.css` `@theme`): deep olive `#454D37`, ivory `#F6F3EB`, sage `#A8B19A`, sand `#D9C8AD`, charcoal `#252722`, terracotta `#B77C62`, plus darker olive tones for the moody sections.
- **Motion**: GSAP + ScrollTrigger for reveals, clip-path wipes and parallax; Lenis for smooth scrolling (disabled under `prefers-reduced-motion`); Motion for React for the header, mobile menu, page transitions and the sticky mobile CTA. All reveal styles fall back to visible content without JavaScript.

## Performance and accessibility

Measured with Lighthouse 12 against `npm run preview` on the home page:

| | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile (simulated 4G) | 91 | 100 | 100 | 100 |
| Desktop | 100 | 100 | 100 | 100 |

Images are served as responsive WebP with width/height set (no layout shift), the hero is preloaded, below-the-fold images and the Google map embed lazy-load, and the lightbox and booking page are separate chunks loaded on demand.

## SEO

- Per-route `<title>`, description, canonical and Open Graph tags (`src/components/layout/Seo.tsx`, hoisted by React 19).
- `VacationRental` Schema.org JSON-LD in `index.html` (no invented coordinates).
- `sitemap.xml` and `robots.txt` generated at build time from `VITE_SITE_URL`.

## Deploying

The output is static. Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, S3 + CDN). Because the site uses client-side routing, configure the host to serve `index.html` for unknown paths (a "SPA fallback" / rewrite rule).

## Project structure

```
photos/                  original property photographs (source of truth)
public/images/           generated responsive WebP + og-image.jpg
public/icons/            favicon and touch icon
scripts/optimize-images.mjs
src/
  components/
    animations/          Reveal, SplitWords, ParallaxImage (GSAP)
    booking/             BookingForm, DateRangeField, GuestStepper, schema
    gallery/             Lightbox (code-split), RoomCarousel (Embla)
    layout/              SmoothScroll, ScrollManager, PageTransition, Footer, Seo, StickyBookingBar
    location/            GoogleMap (keyless embed)
    navigation/          Header, MobileMenu
    ui/                  Button (magnetic), Picture (responsive), Eyebrow, Wordmark, BrandIcons
  data/                  property, gallery, reviews, navigation, images.generated
  hooks/                 useReducedMotion, useScrolled, useBodyLock, useMediaQuery
  lib/                   config (env), motion (GSAP setup), scroll (Lenis helpers), images, format, booking/
  pages/                 Home, GalleryPage, BookPage, PrivacyPage, NotFound
  sections/              Hero, Intro, TheHouse, GalleryPreview, Amenities, Location, Atmosphere, FinalCta
  styles/global.css      Tailwind v4 theme tokens and base styles
```

## Notes on accuracy

- Every amenity shown was verified against the Airbnb listing. The site also states what is *not* provided (no air conditioning, no TV) so guests arrive with the right expectations.
- The embedded Google map centres on the house when coordinates are supplied via `.env`, otherwise on Kigamboni generally.
- No fabricated reviews, availability or confirmations.
