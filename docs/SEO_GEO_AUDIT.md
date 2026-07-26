# SEO and Entity Audit

Audit date: 2026-07-26

## Scope

The audit covered the 12 public French and English pages, initial server-rendered HTML, metadata, canonical and alternate links, structured data, internal links, sitemap, robots directives, redirects, social profiles, and crawler responses.

## Production Baseline

- `/` returned a 307 redirect to `/fr`.
- All 12 indexed routes returned HTTP 200.
- Googlebot, OAI-SearchBot, and ClaudeBot each received HTTP 200 on all 12 routes.
- Every route had a unique title and description, canonical URL, FR/EN/x-default alternates, Open Graph metadata, Twitter metadata, and no `noindex`.
- The sitemap contained both homepages, both About pages, and eight localized project pages.
- Identity, location, professional positioning, project names, and social links were present in initial HTML.

## Route Metadata Inventory

| Route | Title | Description |
| --- | --- | --- |
| `/fr` | Chamsoudine THIENTA \| Ingénieur logiciel & Data Analyst | Chamsoudine THIENTA conçoit avec Shamsi Digital des logiciels, des API backend, des bases de données et des solutions d’analyse de données. |
| `/en` | Chamsoudine THIENTA \| Software Engineer & Data Analyst | Chamsoudine THIENTA builds software systems, backend APIs, databases and data analytics solutions through Shamsi Digital. |
| `/fr/about` | À propos de Chamsoudine THIENTA — Shams \| Ingénieur logiciel & Data Analyst | Découvrez Chamsoudine THIENTA, Shams, Software Engineer & Data Analyst à Bamako et fondateur de Shamsi Digital. |
| `/en/about` | About Chamsoudine THIENTA — Shams \| Software Engineer & Data Analyst | Learn about Chamsoudine THIENTA, Shams, a Software Engineer & Data Analyst in Bamako and founder of Shamsi Digital. |
| `/fr/projects/kalansup` | KalanSUP — ERP de gestion scolaire \| Chamsoudine THIENTA | KalanSUP est le projet de gestion scolaire et universitaire conçu par Chamsoudine THIENTA avec React, Spring Boot et PostgreSQL. |
| `/en/projects/kalansup` | KalanSUP — School Management ERP \| Chamsoudine THIENTA | KalanSUP is a school and university management project designed by Chamsoudine THIENTA with React, Spring Boot and PostgreSQL. |
| `/fr/projects/digital-queue` | File d’attente numérique \| Projet de Chamsoudine THIENTA | Découvrez le prototype de file d’attente numérique conçu par Chamsoudine THIENTA pour visualiser files, agences et indicateurs de service. |
| `/en/projects/digital-queue` | Digital Queue Management \| Chamsoudine THIENTA | Explore the digital queue-management prototype designed by Chamsoudine THIENTA for queue, branch and service monitoring. |
| `/fr/projects/agritech-mali` | AgritechMali — IA appliquée à l’agriculture \| Chamsoudine THIENTA | AgritechMali est une expérimentation de Chamsoudine THIENTA autour de la recommandation de cultures et des maladies des plantes. |
| `/en/projects/agritech-mali` | AgritechMali — AI for Agriculture \| Chamsoudine THIENTA | AgritechMali is an experiment by Chamsoudine THIENTA around crop recommendation and plant-disease recognition. |
| `/fr/projects/storesup` | StoreSup — Application MERN de gestion de stock \| Chamsoudine THIENTA | StoreSup est une application MERN de gestion de stock et d’opérations développée par Chamsoudine THIENTA. |
| `/en/projects/storesup` | StoreSup — MERN Inventory Management \| Chamsoudine THIENTA | StoreSup is a MERN inventory and operations management application developed by Chamsoudine THIENTA. |

All routes use their absolute official canonical, FR/EN/x-default alternates, matching Open Graph and Twitter metadata, and no `noindex`. No sitemap route was missing.

## Corrected Gaps

- Consolidated the Person entity under `https://shamsi-dev.vercel.app/#chamsoudine-thienta`.
- Added the Shamsi Digital organization under `https://shamsi-dev.vercel.app/#shamsi-digital`.
- Reused the Person identifier from About and project structured data.
- Added localized ProfilePage structured data to both About pages.
- Assigned an evidence-based schema type to each project and added specific keywords and a modification date.
- Replaced the legacy social image reference with the current official WebP portrait.
- Added explicit allow rules for OAI-SearchBot and ClaudeBot while retaining the general allow rule.
- Added a short factual `llms.txt` as a supplementary machine-readable summary. It is not treated as a ranking directive.

## Unchanged

- No routes, visible design, animation, image, project claims, client claims, testimonials, or performance behavior were changed.
- Existing canonical URLs, hreflang strategy, sitemap route set, and root redirect were preserved.

## Structured Data Validation

The automated validation parses every JSON-LD block as JSON and checks the entity topology and required factual fields:

- one Person entity with the stable `#chamsoudine-thienta` identifier;
- one Organization entity with the stable `#shamsi-digital` identifier;
- localized ProfilePage entities referencing the Person;
- SoftwareApplication for KalanSUP and Digital Queue;
- CreativeWork for AgritechMali;
- SoftwareSourceCode for StoreSup;
- project creator references, modification dates, keywords, and public repository URL only where verified.

Google does not provide a supported automated API for its Rich Results Test, and these entity types do not all produce Google rich results. The JSON-LD was therefore validated through JSON parsing, schema-property review, rendered-HTML inspection, and Playwright assertions.

## Dependency Audit

- Production dependencies: 0 known vulnerabilities.
- Full development tree: 13 high-severity advisories in the ESLint toolchain through `minimatch` and `brace-expansion`.
- npm proposed incompatible downgrades or major changes, so no forced dependency mutation was included in this SEO/GEO commit.
