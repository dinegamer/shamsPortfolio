# Portfolio Audit

Date: 2026-07-22

## Repository and Deployment Context

- App: Next.js 14, TypeScript, Tailwind CSS, next-intl.
- Local branch: `master`.
- Git remote: no remote configured in this checkout.
- Vercel local project file exists at `.vercel/project.json` with project name `shams-portfolio`.
- Public target from prompt: `https://shamsi-dev.vercel.app`.

## Claims Found Before Cleanup

- "Full-Stack MERN Engineer who ships."
- "Senior MERN full-stack developer."
- "15+ products shipped."
- "Real products, real users."
- "< 48h to first demo."
- "MVP in 3 weeks."
- Fixed prices: `$4,900`, `$80/hr`, `$3,000/mo`.
- "Fractional CTO."
- "Logistics lead by day, MERN engineer by night."
- Bank references that implied client relationships: BNDA Mali, BOA, BDM and Ecobank.
- Broad project/demo claims for Cardify, ShamsAI Tools, Global Eid Wall, Klassir and Bank-Auto.
- Public `cv.pdf` included broader claims and phone/reference details not suitable for the verified portfolio page.

## Scroll Performance Diagnosis

The slow scroll risk came from cumulative visual effects rather than one scroll listener:

- `@paper-design/shaders-react` rendered two full-screen animated shader layers in the hero.
- `PulsingBorder` added another animated shader effect.
- `GooeyText` ran a continuous `requestAnimationFrame` loop and animated CSS `filter: blur(...)`.
- `framer-motion` was used across nearly every section for viewport animations.
- The fixed navbar and contact card used `backdrop-filter`/`backdrop-blur`.
- Project images included several large unused assets, with multiple files around 2-3 MB.
- `scroll-behavior: smooth` changed native scroll behavior globally.

## Corrections Implemented

- Replaced shader and morph effects with static CSS gradients and lightweight transform/opacity animation.
- Removed `framer-motion` and `@paper-design/shaders-react` from dependencies.
- Removed unused `GooeyText` and `ShineBorder` components.
- Removed global smooth scrolling and backdrop filters.
- Added `prefers-reduced-motion` rules.
- Rebuilt project cards as factual case studies with status, problem, contribution, features, stack and screenshot availability.
- Replaced services with Software Engineering, Data Analytics and Data Systems.
- Replaced Gmail compose and Calendly links with `mailto:`, GitHub and LinkedIn.
- Removed WhatsApp from the visible page because no explicit confirmation to keep the number public was available.
- Removed obsolete public screenshots and the public CV.
- Added localized metadata, canonical URLs, hreflang alternates, Open Graph, Twitter card, manifest, icon, robots, sitemap and JSON-LD Person.
- Added a keyboard-usable mobile menu and visible focus styles.

## Validation Results

- `npm install`: passed. NPM reports 8 dependency vulnerabilities and a Node engine warning for one transitive ESLint package.
- `npm run lint`: passed with no warnings or errors.
- `npm run typecheck`: passed.
- `npm run test:e2e`: passed, 11 Playwright tests.
- `npm run build`: passed.
- External links checked with HTTP requests:
  - GitHub profile: 200 OK.
  - StoreSup GitHub: 200 OK.
  - AgritechMali GitHub: 200 OK.
  - APEDA GitHub: 200 OK.
  - AE2C GitHub: 200 OK.
  - BambooLab GitHub: 200 OK.
  - LinkedIn blocks direct curl with 999, but public search results confirm the profile exists.
- Public site check before deployment: `https://shamsi-dev.vercel.app` returns 200 OK but still serves the previously deployed version.

## Lighthouse Local Production Run

Target: `http://localhost:3000` after `next build` and `next start`.

- Performance: 94.
- Accessibility: 96.
- Best Practices: 100.
- SEO: 92.
- LCP: 2.3 s.
- CLS: 0.
- Total Blocking Time: 240 ms.

The remaining SEO penalty is the canonical audit while testing on `localhost`; the rendered canonical points to `https://shamsi-dev.vercel.app`, which is correct for production but not same-origin for the local Lighthouse run.

## Remaining Risks

- The checkout has no Git remote configured, so pushing and deployment verification cannot be completed from this repository until a remote is added.
- The installed Next.js version is `14.2.15`; npm warns that this version has a security advisory and should be upgraded separately.
- NPM audit reports 8 vulnerabilities in the dependency tree after install/update.
- Production deployment and production Lighthouse should be rerun after a Git remote and Vercel deployment path are available.
