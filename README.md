# Chamsoudine THIENTA — Portfolio

Public portfolio for Chamsoudine THIENTA, also known as Shams.

Positioning: Software Engineer & Data Analyst based in Bamako, Mali, focused on backend systems, APIs, databases, data analytics and practical data systems. The site is localized in English and French with `next-intl`.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Scripts

```bash
npm run lint
npm run typecheck
npm run build
```

## Structure

```text
app/[locale]/          Localized pages and metadata
components/sections/   Page sections
components/ui/         Shared UI components
messages/{en,fr}.json  Localized copy
public/projects/       Verified project screenshots used by the page
docs/                  Local audit notes
i18n.ts / middleware.ts next-intl routing
```

## Content Rules

Keep public copy factual and verifiable. Do not add fake clients, fake metrics, demo links, testimonials, legal company claims or technology claims inferred only from dependencies.

`prompt.md` is a local prompting file and is not part of the hosted portfolio.
