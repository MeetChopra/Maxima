# CTA & Anchor-Text Audit — maxima.ai

**Audit date:** 2026-04-30
**Scope:** Full sitemap (35 URLs) — homepage, product pages, legal pages, blog index, newsroom, and all article pages.
**Goal:** Identify and clean up generic CTAs ("Learn More," "Read More," "Click Here," "here," etc.) and surface any broken/incorrect destination URLs uncovered during the link sweep.

---

## 1. Decisions framework

The following CTA patterns were reviewed and **kept as-is** because they are contextually clear or templated:


| Pattern                     | Locations                                          | Rationale                                                                                           |
| --------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| "Request demo"              | Header, footer, end-of-article on every page       | Specific, verb-led, action-oriented. Passes Google's link-text guidance.                            |
| "Learn More" / "Learn more" | Homepage hero (×2)                                 | Contextual to surrounding section copy; low-risk.                                                   |
| "See all"                   | Latest-articles 3-card section, site-wide template | Contextual — paired with 3 visible article cards immediately above; the destination is unambiguous. |
| "Read more"                 | Newsroom (under each press item)                   | Contextual — appears as a label below each article excerpt.                                         |
| "Back to blog"              | Every article page                                 | Explicit destination.                                                                               |


---

## 2. Per-page audit table

### Static pages


| Page                 | Generic CTA / Issue                 | Decision                         |
| -------------------- | ----------------------------------- | -------------------------------- |
| `/` (Homepage)       | "Learn More" → /product-overview    | Keep — contextual                |
| `/` (Homepage)       | "Learn more" → /how-it-works        | Keep — contextual                |
| `/` (Homepage)       | "See all" → /blog                   | Keep — contextual                |
| `/product-overview`  | "See all" → /blog                   | Keep — contextual                |
| `/how-it-works`      | "See all" → /blog                   | Keep — contextual                |
| `/security`          | None                                | Clean                            |
| `/about`             | "See all" → /blog                   | Keep — contextual                |
| `/careers`           | "See all" → /blog                   | Keep — contextual                |
| `/blog`              | None                                | Clean                            |
| `/newsroom`          | "Read more" ×2 (FinTech.tv, PYMNTS) | Keep — labels under each article |
| `/newsroom`          | "See all" → /blog                   | Keep — contextual                |
| `/bank-integrations` | "See all" → /blog                   | Keep — contextual                |
| `/maxima-vs-floqast` | "See all" → /blog                   | Keep — contextual                |
| `/book-a-demo`       | "See all" → /blog                   | Keep — contextual                |


### Article / blog pages


| Page                                                                         | Generic CTA / Issue                                                                  | Decision                                               |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| `/articles/the-definitive-guide-to-reconciliations-in-accounting`            | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/best-bank-reconciliation-software-in-2026`                        | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/ai-tools-for-accounting`                                          | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/ai-tools-for-accounting`                                          | Inline anchor "here" → /maxima-vs-floqast                                            | **FIXED** — replaced with "FloQast compares to Maxima" |
| `/articles/7-best-financial-close-software-solutions-to-evaluate-in-2026`    | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/what-is-variance-analysis-a-complete-guide`                       | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/what-is-variance-analysis-a-complete-guide`                       | End-CTA pointed to Framer staging URL (`gray-success-777494.framer.app/book-a-demo`) | **FIXED** — repointed to `/book-a-demo`                |
| `/articles/the-definitive-guide-to-journal-entries-in-accounting`            | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/scale-ai-staying-ahead-of-the-gl-curve-with-maxima`               | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/how-rippling-built-sox-ready-cash-accounting-with-maxima`         | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/the-office-of-the-cfo-in-2030-how-ai-agents-change-the-equation`  | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/accuracy-in-accounting-why-ai-needs-more-than-intelligence`       | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/gorgias-on-the-forefront-of-accounting-automation-with-maxima`    | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/spoton-mastering-high-volume-cash-complexity-with-maxima`         | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/how-rewst-automated-revenue-recognition-and-prepaids-with-maxima` | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/maxima-seed-series-a-agentic-ai-accounting`                       | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/maxima-named-to-ai64-s-top-enterprise-ai-companies`               | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/product-success-one-team`                                         | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/why-blackline-s-former-cmo-is-investing-in-maxima`                | "Request demo" + "See all"                                                           | Keep                                                   |
| `/articles/reuters-exclusive-maxima`                                         | 308 redirect to reuters.com                                                          | N/A                                                    |
| `/articles/ey-alumni-spotlight-maxima-ceo-yogi-goel`                         | 308 redirect to ey.com                                                               | N/A                                                    |
| `/articles/kleiner-perkins-investment-perspective`                           | 308 redirect to kleinerperkins.com                                                   | N/A                                                    |


### Legal pages


| Page                      | Generic CTA / Issue                                                                                                                                              | Decision                                |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `/legal`                  | None (index page, nav only)                                                                                                                                      | Clean                                   |
| `/legal/privacy-policy`   | Anchor text: "Terms of Service," "Google," "Facebook," "Network Advertising Initiative," "Digital Advertising Alliance," "AppChoices mobile app," "Do Not Track" | Clean — all descriptive                 |
| `/legal/privacy-policy`   | "Cookies Policy" → `https://site-qa4g4s7va-maxima-a88c3b73.vercel.app/cookies`                                                                                   | **Fixed — broken Vercel preview URL**   |
| `/legal/terms-of-service` | "Privacy Policy" (1st instance) → `/legal/privacy-policy`                                                                                                        | Clean                                   |
| `/legal/terms-of-service` | "Privacy Policy" (3rd instance, "Contacting Us") → `https://maxima.ai/privacy-policy`                                                                            | **Fixed — missing** `/legal/` **(404)** |
| `/legal/terms-of-service` | "Cookie Policy" → `https://maxima.ai/cookie-policy`                                                                                                              | **Fixed — missing** `/legal/` **(404)** |
| `/legal/cookie-policy`    | "Terms of Service," "Privacy Policy" ×3                                                                                                                          | Clean                                   |


---

