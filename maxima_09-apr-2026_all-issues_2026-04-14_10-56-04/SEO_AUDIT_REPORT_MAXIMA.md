# Maxima.ai - Comprehensive SEO Audit Report

**Date:** April 14, 2026
**Site:** [https://www.maxima.ai](https://www.maxima.ai)
**Platform:** Framer
**Total pages in sitemap:** 32
**Data sources:** Ahrefs Site Audit export + live site crawl

---

## Table of Contents

1. [Technical SEO Audit](#1-technical-seo-audit)
2. [Indexation Audit](#2-indexation-audit)
3. [Crawlability Audit](#3-crawlability-audit)
4. [Canonical Tag Audit](#4-canonical-tag-audit)
5. [Structured Data (JSON-LD) Audit](#5-structured-data-json-ld-audit)
6. [Meta Descriptions Audit](#6-meta-descriptions-audit)
7. [Internal Linking Audit](#7-internal-linking-audit)
8. [Broken Link & Redirect Audit](#8-broken-link--redirect-audit)
9. [URL Structure Audit](#9-url-structure-audit)
10. [XML Sitemap Review](#10-xml-sitemap-review)
11. [Robots.txt Review](#11-robotstxt-review)
12. [Alt Text & Image Filename Audit](#12-alt-text--image-filename-audit)
13. [Thin/Duplicate Content Identification](#13-thinduplicate-content-identification)
14. [Priority Action Items](#14-priority-action-items)

---

## 1. Technical SEO Audit

### Title Tag Issues

**Too Long (>60 chars) - 3 pages:**


| Page                                                 | Title                                                                                                           | Length |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------ |
| /articles/maxima-seed-series-a-agentic-ai-accounting | Announcing Maxima's seed and Series A to launch the first AI-powered agentic platform for enterprise accounting | 111    |
| /articles/ai-tools-for-accounting                    | AI tools for accounting: best software, categories, and buyer guide (2026)                                      | 74     |
| /articles/what-is-variance-analysis-a-complete-guide | Variance analysis: the definitive guide to explaining the numbers without the grind                             | 83     |


**Too Short (<30 chars) - 2 pages:**


| Page                  | Title          | Length |
| --------------------- | -------------- | ------ |
| /legal/privacy-policy | Privacy Policy | 14     |
| /legal/cookie-policy  | Cookie Policy  | 13     |


**Recommendation:** Shorten long titles to under 60 characters. For legal pages, consider adding brand: "Privacy Policy | Maxima" (still short but branded).

### H1 Tag Issues

**Multiple H1 tags - Critical issue on most pages:**
The site is built on Framer, and the navigation/footer elements are being rendered as H1 tags alongside the actual page H1. For example, the homepage has the following all wrapped in H1 tags:

- "Agentic accounting automation, from record to report" (correct H1)
- "Platform", "How it works", "Product overview", "Security", "Company", "About", "Career", "Blog", "Newsroom" (navigation items incorrectly rendered as H1)
- "Privacy Policy", "Terms of Service", "Cookie Policy" (footer links incorrectly rendered as H1)

This appears to be a **Framer template issue** where navigation and footer components use `<h1>` tags instead of `<div>`, `<span>`, or `<nav>` elements.

**Solution:** Fixed the Framer template to use proper semantic HTML. Switched to h4, h5 for navigation items in footer

**Duplicate H1 tags (Framer platform behavior):**  
Framer automatically creates copies of the H1 heading for different screen sizes (desktop, tablet, mobile). Ahref flag these as duplicates, but Google ignores the hidden copies - so this does not affect rankings. See [Framer's explanation](https://www.framer.com/help/articles/are-multiple-h1-tags-in-framer-a-problem/).


| Page              | Duplicate H1 count | H1 Text                                                  |
| ----------------- | ------------------ | -------------------------------------------------------- |
| /                 | 4x                 | "Agentic accounting automation, from record to report"   |
| /product-overview | 2x                 | "Close the books without the sprawl"                     |
| /how-it-works     | 2x                 | "Put your record to report on autopilot"                 |
| /security         | 2x                 | "Uncompromising security & trust for agentic accounting" |


**Status:** No fix needed — this is expected Framer behavior and does not impact SEO.

**Footer pipe separators tagged as `<h1>`:**
The `|` pipe characters used as visual separators between footer links (e.g., Privacy Policy **|** Terms of Service **|** Cookie Policy) are wrapped in `<h1>` tags. Every page has 6-8 of these pipe H1s in the footer.

**Fix in Framer:** Change the text element containing `|` from H1 to a `<span>` or `<p>` tag in the Framer layer properties.

**Subheadings incorrectly tagged as `<h1>` (select pages):**
On some pages, subtitles and section descriptions are tagged as H1 instead of the appropriate semantic tag:


| Page          | Text incorrectly tagged as H1                                                                   | Should be |
| ------------- | ----------------------------------------------------------------------------------------------- | --------- |
| /how-it-works | "From journal entries through flux, Maxima eliminates errors..." (subtitle)                     | `<p>`     |
| /how-it-works | "One transaction-level view for all your record-to-report data..." (section heading)            | `<p>`     |
| /security     | "Designed from the ground up to protect the most sensitive financial data..." (intro paragraph) | `<p>`     |


**Fix in Framer:** In the layer panel for these text elements, change the tag from H1 to the appropriate semantic tag (`<p>` for paragraphs, `<h2>` for section headings).

---

## 2. Indexation Audit

### Pages to Submit to IndexNow

The Ahrefs audit flagged **all 32 pages** in the sitemap as candidates for IndexNow submission. This suggests these pages have been updated recently but haven't been re-crawled by search engines.

### Pages with Organic Traffic Drops:


| Page                                                                    | Status                       |
| ----------------------------------------------------------------------- | ---------------------------- |
| /articles/7-best-financial-close-software-solutions-to-evaluate-in-2026 | Organic traffic dropped to 0 |


### Referring Domain Drops:


| Page                    | Impact                    |
| ----------------------- | ------------------------- |
| /legal/terms-of-service | Referring domains dropped |
| /legal/privacy-policy   | Referring domains dropped |
| /legal/cookie-policy    | Referring domains dropped |


**Recommendation:** Submit updated pages via IndexNow or Google Search Console. Investigate the ranking drops for the homepage and "7 best financial close software" article - check for algorithm updates or competitor movement.

---

## 3. Crawlability Audit

### Orphan Pages (No Incoming Internal Links) - 4 pages:

3 article pages are entries in the Framer CMS blog collection that link to external articles. 

On the /blog page, they correctly open the external URL. However, Framer still generates an empty article page for each, which then appears in the sitemap and gets flagged as an orphan. 

Framer does not currently support customizing the sitemap - see [Framer community discussion](https://www.framer.community/c/support/customize-sitemap-xml-file). The redirect ensures anyone landing on these pages reaches the intended external article.


| Page                                               | Title                                                            | Next Steps                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| /articles/reuters-exclusive-maxima                 | AI accounting startup Maxima raises $41 million                  | External press link. **Fix implemented:** Redirected to [https://www.reuters.com/business/ai-accounting-startup-maxima-raises-41-million-kleiner-perkins-backed-round-2025-11-18/](https://www.reuters.com/business/ai-accounting-startup-maxima-raises-41-million-kleiner-perkins-backed-round-2025-11-18/) |
| /articles/kleiner-perkins-investment-perspective   | Maxima: Bringing AI agents to the heart of enterprise accounting | External press link. Original link ([https://www.kleinerperkins.com/perspectives/maxima-seed-and-series-a/](https://www.kleinerperkins.com/perspectives/maxima-seed-and-series-a/)) is returning a 404. **Fix to be implemented:** Correct the link and redirected to the updated URL.                       |
| /legal                                             | Maxima.ai - Agentic AI Accounting for Modern Finance Teams       | To be removed. Duplicate for this page (linked in footer): [https://www.maxima.ai/legal/cookie-policy](https://www.maxima.ai/legal/cookie-policy)                                                                                                                                                            |
| /articles/ey-alumni-spotlight-maxima-ceo-yogi-goel | EY Alumni spotlight: Maxima CEO, Yogi Goel                       | External press link. **Fix implemented:** Redirected to [https://www.ey.com/en_us/alumni/yogi-goel-tech-teamwork-and-triumphs](https://www.ey.com/en_us/alumni/yogi-goel-tech-teamwork-and-triumphs)                                                                                                         |


### Pages with Only 1 Incoming Internal Link - 6 pages:


| Page                                                                       | Single Link From |
| -------------------------------------------------------------------------- | ---------------- |
| /articles/spoton-mastering-high-volume-cash-complexity-with-maxima         | /blog            |
| /articles/how-rewst-automated-revenue-recognition-and-prepaids-with-maxima | /blog            |
| /articles/ai-tools-for-accounting                                          | /blog            |
| /articles/what-is-variance-analysis-a-complete-guide                       | /blog            |
| /articles/the-definitive-guide-to-reconciliations-in-accounting            | /blog            |
| /articles/7-best-financial-close-software-solutions-to-evaluate-in-2026    | /blog            |


All 6 pages are blog articles that only receive a link from the /blog listing page. They have no contextual internal links from other articles or pages.

**Detailed cross-linking recommendations with exact anchor text and placement for all 6 articles are in: `INTERNAL_LINKING_STRATEGY_MAXIMA.md`**

---

## 4. Canonical Tag Audit

### Summary

All 32 pages have correct self-referencing canonical tags (e.g., `<link rel="canonical" href="https://www.maxima.ai/about">`).


| Status                               | Count |
| ------------------------------------ | ----- |
| Self-referencing canonical (correct) | 32    |


Framer auto-generates canonical tags for all CMS collection pages and static pages. No manual intervention is needed — Framer handles this correctly out of the box.

**Status: Clean - No action needed.**

---

## 5. Structured Data (JSON-LD) Audit

### Current Implementation

Every page on the site has **two JSON-LD blocks:**

1. **Organization schema** (correct, on all pages):

```json
{
  "@type": "Organization",
  "name": "Maxima AI",
  "url": "https://www.maxima.ai",
  "logo": "https://www.maxima.ai/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/maximaai/",
    "https://www.crunchbase.com/organization/maxima-ai",
    "https://www.g2.com/products/maxima/",
    "https://www.youtube.com/@Maximaaiofficial"
  ]
}
```

1. **FAQPage schema** (injected via Framer head snippet `ZhCoGA1DF` on every page) - **CRITICAL ISSUE: Same on ALL 32 pages:**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the difference between AI-assisted and agentic AI accounting tools?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most AI tools in accounting still play an assistive role. They help surface anomalies, suggest matches, or draft explanations, but a human is still responsible for doing the work. Agentic AI changes that model. Instead of assisting, it prepares the work..."
      }
    },
    {
      "@type": "Question",
      "name": "How much do AI accounting tools cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Pricing varies widely depending on category and complexity. Spend management tools often offer free or low-cost entry points, while close management and compliance platforms are typically priced based on transaction volume..."
      }
    },
    {
      "@type": "Question",
      "name": "Can AI tools replace accountants?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, but they will change how accounting teams operate. Much of the work in accounting today is preparation: collecting data, matching transactions, drafting entries, and building reconciliations..."
      }
    },
    {
      "@type": "Question",
      "name": "What are the best AI tools for the monthly close?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Maxima, BlackLine, and FloQast represent three different approaches to the monthly close..."
      }
    },
    {
      "@type": "Question",
      "name": "How do AI tools improve SOX compliance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most SOX compliance challenges come from how work is performed, not just how it is documented. Traditional processes often rely on manual preparation followed by after-the-fact evidence collection..."
      }
    }
  ]
}
```

**Note:** The Organization schema is injected via a separate Framer snippet (`legacy-bodyEnd`) before `</body>`. The FAQPage schema is injected via snippet `ZhCoGA1DF` in the `<head>`. Both are site-wide global snippets.

### Issues Found

**CRITICAL - Same FAQ on every page:**
The FAQ schema contains 5 questions about "AI accounting tools" (pricing, types, SOX compliance, etc.). While these questions are relevant to the /articles/ai-tools-for-accounting page, they are **irrelevant** to pages like:

- /legal, /legal/privacy-policy, /legal/terms-of-service
- /careers
- /book-a-demo
- /about
- Customer case study pages

Google may flag this as spammy structured data if the same FAQ appears on 32 different pages. At minimum, it dilutes the FAQ schema's value and risks a manual action.

**MISSING schema types:**

- Blog articles: No `Article` or `BlogPosting` schema
- Case studies: No `Article` or `CaseStudy` schema
- Comparison page (/maxima-vs-floqast): No `Product` or comparison schema
- Homepage: No `WebSite` schema with `SearchAction`
- No `BreadcrumbList` schema on any page

### Recommendations

1. **IMMEDIATE:** Remove the site-wide FAQPage snippet from Framer's global head settings
2. **Per-page FAQ schemas:** Add FAQPage schema only to pages that actually have visible FAQ content (e.g., /how-it-works, /product-overview, /articles/ai-tools-for-accounting)
3. **Add Article/BlogPosting schema** to all blog articles in the Frame Blog collection. This should include:
  - `headline`, `author`, `datePublished`, `dateModified`, `image`, `publisher`
  - This requires creating a new component in the Framer Blog collection as noted in the checklist
4. **Add BreadcrumbList schema** to article and sub-pages
5. Keep the Organization schema as-is (correctly implemented site-wide)

---

## 6. Meta Descriptions Audit

### Full Page-by-Page Audit


| Page                    | Meta Description                                                                                                                                                                                   | Length | Status        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------- |
| /                       | Maxima is an AI-native accounting platform that automates journal entries, reconciliations, flux analysis, and financial close with audit-ready accuracy.                                          | 151    | OK            |
| /how-it-works           | Learn how Maxima connects your financial systems, applies AI agents, and automates record-to-report workflows with built-in controls and human review.                                             | 151    | OK            |
| /product-overview       | Maxima centralizes journals, reconciliations, transaction matching and flux analysis into one AI-native platform for efficient accounting and human review.                                        | 155    | OK            |
| /about                  | Maxima builds an AI-powered accounting platform to help teams close faster, reduce errors, and focus on higher-value work.                                                                         | 120    | OK            |
| /security               | Enterprise-grade security at Maxima: SOC 1 & SOC 2 Type II compliant, with audit-ready controls, data encryption, and secure infrastructure built for accounting workflows.                        | 171    | TOO LONG      |
| /blog                   | Perspectives and insights on accounting, financial close, record to report, and AI powered automation from the team at Maxima.                                                                     | 123    | OK            |
| /newsroom               | Stay up to date with Maxima's announcements, press coverage, product updates, and perspectives on the future of accounting and finance.                                                            | 137    | OK            |
| /careers                | Join Maxima to build an AI-native accounting platform and help leading accounting teams transform their month end close process                                                                    | 122    | OK            |
| /book-a-demo            | See how Maxima automates accounting preparation, reconciliations, flux analysis, and financial close orchestration with built-in controls.                                                         | 139    | OK            |
| /maxima-vs-floqast      | Compare Maxima vs FloQast. Automate journal entries, account reconciliations, flux analysis, and transaction matching with agent-prepared, accountant-reviewed workflows and audit-ready controls. | 194    | TOO LONG      |
| /legal                  | Maxima automates accounting with agentic AI...                                                                                                                                                     | -      | GENERIC/WRONG |
| /legal/privacy-policy   | Maxima automates accounting with agentic AI...                                                                                                                                                     | -      | GENERIC/WRONG |
| /legal/terms-of-service | Maxima automates accounting with agentic AI...                                                                                                                                                     | -      | GENERIC/WRONG |
| /legal/cookie-policy    | Maxima automates accounting with agentic AI...                                                                                                                                                     | -      | GENERIC/WRONG |


### Article Meta Descriptions


| Article                                    | Meta Description                                                                                                                                 | Status                                              |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| accuracy-in-accounting...                  | Can AI do accounting accurately? Learn why intelligence is not enough and how systems, controls, and context drive reliable accounting outcomes. | OK                                                  |
| maxima-seed-series-a...                    | Maxima announces $41M in funding to build an agentic AI platform for enterprise accounting...                                                    | OK                                                  |
| maxima-named-to-ai64...                    | Maxima announces $41M in funding to build an agentic AI platform for enterprise accounting...                                                    | OK (but same as above - possible duplication issue) |
| product-success-one-team                   | Learn why product and deployment or success teams need to be unified                                                                             | WEAK - too short and vague                          |
| the-office-of-the-cfo-in-2030...           | What will the office of the CFO look like in 2030? Learn how AI agents are transforming finance workflows...                                     | OK                                                  |
| the-definitive-guide-to-reconciliations... | The definitive guide to reconciliations in accounting, including real examples, common workflows...                                              | OK                                                  |
| what-is-variance-analysis...               | What is variance analysis in accounting? Learn how to analyze, explain, and document variances...                                                | OK                                                  |
| scale-ai-staying-ahead...                  | How Scale AI uses Maxima to automate accounting workflows, improve accuracy, and stay ahead of the general ledger...                             | OK                                                  |
| how-rippling-built-sox-ready...            | How Rippling built SOX-ready cash accounting with Maxima, automating reconciliations...                                                          | OK                                                  |
| gorgias-on-the-forefront...                | Gorgias case study: how a high-growth company automates accounting workflows...                                                                  | OK                                                  |
| spoton-mastering-high-volume...            | How SpotOn manages high-volume cash accounting with Maxima, automating reconciliations...                                                        | OK                                                  |
| how-rewst-automated...                     | Rewst case study: how a high-growth company automates revenue recognition and prepaid accounting...                                              | OK                                                  |
| ey-alumni-spotlight...                     | Maxima automates accounting with agentic AI...                                                                                                   | GENERIC/WRONG                                       |
| kleiner-perkins-investment...              | Maxima automates accounting with agentic AI...                                                                                                   | GENERIC/WRONG                                       |
| why-blackline-s-former-cmo...              | Maxima automates accounting with agentic AI...                                                                                                   | GENERIC/WRONG                                       |
| reuters-exclusive-maxima                   | Maxima automates accounting with agentic AI...                                                                                                   | GENERIC/WRONG                                       |
| ai-tools-for-accounting                    | Discover the best AI tools for accounting. Compare platforms across close management, billing...                                                 | OK                                                  |
| 7-best-financial-close...                  | Compare the 7 best financial close software solutions in 2026...                                                                                 | OK                                                  |


### Summary of Issues


| Issue                            | Count | Pages                                                                                                                                                           |
| -------------------------------- | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Generic/default meta description | 8     | /legal, /legal/privacy-policy, /legal/terms-of-service, /legal/cookie-policy, ey-alumni-spotlight, kleiner-perkins-investment, why-blackline, reuters-exclusive |
| Too long (>160 chars)            | 2     | /security (171), /maxima-vs-floqast (194)                                                                                                                       |
| Too short/vague                  | 1     | product-success-one-team                                                                                                                                        |
| Potentially duplicated           | 1     | maxima-named-to-ai64 (same as seed-series-a?)                                                                                                                   |


### Recommended Meta Descriptions

#### Generic/Wrong — Legal Pages (replace "Maxima automates accounting with agentic AI...")


| Page                    | Recommended Meta Description                                                                                                                       | Length |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| /legal                  | Maxima's cookie policy: how we use strictly necessary, functional, performance, targeting, and social media cookies on maxima.ai.                  | 129    |
| /legal/privacy-policy   | How Maxima collects, uses, and protects your personal data — covering account info, device logs, third-party disclosures, and your privacy rights. | 146    |
| /legal/terms-of-service | Terms governing access to Maxima's AI accounting platform and websites, including usage rights, IP, liability limits, and California jurisdiction. | 145    |
| /legal/cookie-policy    | Maxima's cookie policy: how we use strictly necessary, functional, performance, targeting, and social media cookies on maxima.ai.                  | 129    |


**Note:** The /legal page currently renders the cookie policy content. If /legal is intended as a landing page for all legal docs, use instead: "Access Maxima's legal documents — privacy policy, terms of service, and cookie policy for our AI accounting platform." (130 chars)

#### Generic/Wrong — Articles (replace "Maxima automates accounting with agentic AI...")


| Page                                               | Recommended Meta Description                                                                                                                   | Length |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| /articles/ey-alumni-spotlight-maxima-ceo-yogi-goel | EY alumni spotlight: CEO Yogi Goel on how Maxima's agentic AI automates journals, reconciliations, and flux for multi-entity accounting teams. | 143    |
| /articles/kleiner-perkins-investment-perspective   | How Maxima's agentic AI platform automates record-to-report workflows with audit-ready agents for high-volume enterprise accounting.           | 131    |
| /articles/why-blackline-s-former-cmo...            | BlackLine's former CSO Andres Botero on why he's investing in Maxima and how AI agents are moving accounting beyond legacy close software.     | 138    |
| /articles/reuters-exclusive-maxima                 | AI accounting startup Maxima raises $41M to build agentic automation for enterprise journals, reconciliations, and financial close.            | 130    |


#### Too Long — Shortened Versions (under 160 chars)


| Page               | Current Length | Recommended Meta Description                                                                                                                   | New Length |
| ------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| /security          | 171            | Maxima security: SOC 1 & SOC 2 Type II, ISO 42001 certified. AES-256 encryption, US-only hosting, zero model training on customer data.        | 137        |
| /maxima-vs-floqast | 194            | Maxima vs FloQast: native integrations with 100+ systems, continuous daily automation, and AI agents that draft entries for accountant review. | 143        |


#### Too Short/Vague — Rewritten


| Page                               | Current                                                              | Recommended Meta Description                                                                                                                     | Length |
| ---------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| /articles/product-success-one-team | Learn why product and deployment or success teams need to be unified | Why Maxima merged product and deployment into one team — how unified incentives cut resolution times from months to days in accounting software. | 143    |


#### Potentially Duplicated — Unique Version


| Page                              | Current (duplicated from seed-series-a)                                                       | Recommended Meta Description                                                                                                       | Length |
| --------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ |
| /articles/maxima-named-to-ai64... | Maxima announces $41M in funding to build an agentic AI platform for enterprise accounting... | Maxima named to Redpoint's AI64 list of top enterprise AI apps — delivering up to 80% faster close cycles and 95% task automation. | 129    |


---

## 7. Internal Linking Audit

### Current State

The site has **zero article-to-article body content links**. Every article's only unique body link is `/book-a-demo`. The auto-generated "Related Articles" section shows the same 3 articles on nearly every page.


| Metric                                           | Value                                 |
| ------------------------------------------------ | ------------------------------------- |
| Total article-to-article body links              | **0**                                 |
| Pages completely orphaned (zero inbound links)   | 4                                     |
| Pages with only 1 inbound link (from /blog only) | 6                                     |
| Link equity distribution                         | 95%+ concentrated in nav/footer pages |


### Key Findings

- Blog articles have **no cross-linking** between related content despite heavy topic overlap (reconciliation, variance analysis, financial close, AI accounting)
- The "Related Articles" Framer component is static/hardcoded — it shows the same 3 articles (Accuracy, Seed announcement, AI64) on every page instead of topically relevant content
- Case studies don't link to the educational guides that explain the concepts they demonstrate
- Content naturally organizes into **4 pillar clusters**: AI Tools, Reconciliations, Variance Analysis, and Financial Close — but none are interlinked

### Recommendations

~72 new internal links are needed across the site. See `INTERNAL_LINKING_STRATEGY_MAXIMA.md` for the full breakdown including:

- 4-cluster pillar page architecture with visual cluster map
- Per-article linking tables (all 18 articles) with exact anchor text and section placement
- 5-phase implementation checklist prioritized by impact

---

## 8. Broken Link & Redirect Audit

### Redirects Found


| Source                                         | Status | Destination                                      | Type                  |
| ---------------------------------------------- | ------ | ------------------------------------------------ | --------------------- |
| [http://www.maxima.ai/](http://www.maxima.ai/) | 308    | [https://www.maxima.ai/](https://www.maxima.ai/) | HTTP->HTTPS (correct) |


- **No broken internal links (4xx errors)** found in the Ahrefs crawl
- **No redirect chains** detected
- **No redirect loops** detected
- The HTTP to HTTPS redirect is properly implemented as a 308 (Permanent Redirect)

### Broken External Links


| Page (source)                | Broken External URL                                                                                                                            | Status | Fix                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------ |
| /blog (Kleiner Perkins card) | [https://www.kleinerperkins.com/perspectives/maxima-seed-and-series-a/](https://www.kleinerperkins.com/perspectives/maxima-seed-and-series-a/) | 404    | **Fixed:** Corrected the link to the updated URL |


**Note:** The Ahrefs crawl only checks internal links. External outbound links were verified manually.

---

## 9. URL Structure Audit

### Current URL Patterns


| Section       | Pattern            | Example                           |
| ------------- | ------------------ | --------------------------------- |
| Core pages    | /slug              | /how-it-works, /about, /security  |
| Blog articles | /articles/slug     | /articles/ai-tools-for-accounting |
| Legal pages   | /legal/slug        | /legal/privacy-policy             |
| Demo page     | /book-a-demo       | /book-a-demo                      |
| Comparison    | /maxima-vs-floqast | /maxima-vs-floqast                |


### Issues Found

1. **Inconsistent blog URL pattern:** Articles use `/articles/` prefix but the listing page is `/blog`. Consider whether these should align (either `/blog/slug` or keep `/articles/slug` but be consistent in navigation labels).
2. **Overly long article slugs:**
  - `/articles/the-definitive-guide-to-reconciliations-in-accounting` (57 chars)
  - `/articles/how-rewst-automated-revenue-recognition-and-prepaids-with-maxima` (74 chars)
  - `/articles/gorgias-on-the-forefront-of-accounting-automation-with-maxima` (71 chars)
  - `/articles/spoton-mastering-high-volume-cash-complexity-with-maxima` (65 chars)
  - `/articles/7-best-financial-close-software-solutions-to-evaluate-in-2026` (71 chars)
3. **Comparison page structure:** Currently `/maxima-vs-floqast` is at root level. If more comparison pages are planned, consider `/compare/maxima-vs-floqast` for better organization.

### Recommendations

- For **future** articles, use shorter slugs (target 3-5 words). Don't change existing URLs as this would require redirects and could lose any existing link equity.
- If adding more comparison pages, create a `/compare/` or `/vs/` subfolder
- The `/blog` vs `/articles/` inconsistency is a **minor** issue - not worth creating redirects to fix, but keep naming consistent going forward.

---

## 10. XML Sitemap Review

### Current State

- **Location:** [https://www.maxima.ai/sitemap.xml](https://www.maxima.ai/sitemap.xml)
- **Format:** XML Sitemap Protocol 0.9
- **Total URLs:** 32
- **Sub-sitemaps:** None
- **Last modified dates:** Not present on any URL
- **Change frequency:** Not specified
- **Priority values:** Not specified

### URLs in Sitemap (32)

**Core pages (11):**
/, /product-overview, /how-it-works, /about, /careers, /blog, /book-a-demo, /legal, /newsroom, /maxima-vs-floqast, /security

**Articles (18):**
All 18 articles under /articles/ are listed.

**Legal pages (3):**
/legal/cookie-policy, /legal/terms-of-service, /legal/privacy-policy

### Issues Found

1. **No** `<lastmod>` **dates** on any URL. This is a Framer limitation.
2. **All pages in a single sitemap.** With 32 URLs this is fine, but if content grows, consider splitting into separate sitemaps (pages, articles, legal).
3. **No image sitemap.** Given the number of images across the site, an image sitemap could help with image indexation.

### Recommendations

- Add `<lastmod>` dates if Framer supports it (or via a custom sitemap solution)
- Monitor sitemap as content grows; split into sub-sitemaps when exceeding 100 URLs
- Consider an image sitemap for key product screenshots and diagrams

---

## 11. Robots.txt Review

### Current Content

```
User-agent: *
Allow: /

Sitemap: https://www.maxima.ai/sitemap.xml
```

### Analysis

- Allows all crawlers full access to the entire site
- Correctly references the sitemap
- No disallowed paths

### Recommendations

- **Consider blocking** Framer internal paths if any exist (e.g., preview/draft URLs)
- The current setup is otherwise clean and correct
- No issues detected

---

## 12. Alt Text & Image Filename Audit

### Summary


| Metric                                       | Value                       |
| -------------------------------------------- | --------------------------- |
| Total unique images missing alt text         | **83**                      |
| Total missing-alt instances across all pages | **~170**                    |
| Pages affected                               | 30 (every page on the site) |
| Images with alt text typos                   | 2 (homepage)                |


### Biggest wins (fix once, fix everywhere)

2 decorative/background images are shared across **every page** via Framer's global header/footer. Adding `alt=""` to these in Framer resolves the issue across all pages at once:


| Image                             | Appears On   | Action                    |
| --------------------------------- | ------------ | ------------------------- |
| `Sfz6mVl5Wq1Zdym07lodksvCE.png`   | All 30 pages | Add `alt=""` (decorative) |
| `vl8RF4iXhvG4IFYwq1fc6JhmF2c.png` | All 30 pages | Add `alt=""` (decorative) |


**Note:** Ahrefs also flagged `oSCs67tz...png` and `JEiyjUqswVbHLA4wnNdJYRZMTFQ.png` as site-wide issues. On verification: `oSCs67tz` only exists on `/blog` (not site-wide), and `JEiyjUq` only renders at viewport widths 1906-2486px (ultra-wide screens). Both are Framer responsive variant artifacts that Ahrefs' headless browser captured during its April 9 crawl but are not visible at normal screen sizes.

### Pages with most missing alt text


| Page                              | Missing Alt | What's missing                                                                                                                    |
| --------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------- |
| /about                            | 34          | 30 team headshots (832x832) + 4 shared site-wide                                                                                  |
| /maxima-vs-floqast                | 15          | 4 testimonial headshots, 5 comparison icons, 1 FloQast logo, customer logos, trust badges                                         |
| /articles/ai-tools-for-accounting | 15          | 11 platform screenshots (Maxima, BlackLine, FloQast, Tabs, Zuora, Brex, Ramp, Trullion, Klarity, Pigment, Abacum) + shared images |
| /newsroom                         | 9           | 6 press outlet logos/thumbnails + shared                                                                                          |
| /book-a-demo                      | 7           | Trust badges, customer logos, product screenshot                                                                                  |
| /blog                             | 7           | 4 article thumbnails + shared                                                                                                     |


### Alt text errors on existing images


| Page         | Image                  | Current Alt                                 | Fix                      |
| ------------ | ---------------------- | ------------------------------------------- | ------------------------ |
| / (homepage) | Vipin Sethi headshot   | "Vipin Sethi, Controller at **Ripping**"    | Change to "**Rippling**" |
| / (homepage) | Jack Chalfant headshot | "Jack Chalfant, Controller, SpotOn**.png**" | Remove ".png"            |


### Image Filename Issue

All images use Framer-generated hash filenames (e.g., `Sfz6mVl5Wq1Zdym07lodksvCE.png`). This is a Framer platform limitation. For future uploads, name files descriptively before uploading.

### Full Details

See `ALT_TEXT_AUDIT_MAXIMA.md` for the complete page-by-page audit with:

- Every image listed by Framer filename with its context/purpose identified
- Suggested alt text for each image (including all 30 team headshots mapped to names/titles)
- Prioritized fix list (10 tiers from critical to low)

---

## 13. Thin/Duplicate Content Identification

### Content Analysis from Ahrefs Crawl Data


| Page              | Word Count | Assessment                        |
| ----------------- | ---------- | --------------------------------- |
| / (homepage)      | 2,762      | OK                                |
| /product-overview | 2,130      | OK                                |
| /newsroom         | 1,189      | Borderline - mostly link listings |
| /blog             | -          | Listing page - expected thin      |
| /careers          | -          | Likely thin if only job listings  |
| /book-a-demo      | -          | Expected thin - form page         |
| /legal            | -          | Parent page for legal sub-pages   |


### Duplicate/Near-Duplicate Content Issues

1. **Legal pages using generic meta description:** /legal, /legal/privacy-policy, /legal/terms-of-service, /legal/cookie-policy all share the same generic meta description: "Maxima automates accounting with agentic AI..." This is not their actual content description.
2. **Newsroom articles with identical "Customer story" labels:** The newsroom page has several entries all labeled "Customer story" followed by the same article title repeated multiple times in the page text. This suggests **rendering duplication** in the Framer template (showing mobile + desktop versions simultaneously in HTML).
3. **H1 duplication across viewports:** The Ahrefs crawl shows H1 tags being duplicated 4x on the homepage (same text repeated in desktop, tablet, mobile, and menu versions). This is a Framer rendering issue where responsive variants produce duplicate HTML elements.
4. **Cross-page content similarity:** The 4 newsroom/investor articles (Reuters, Kleiner Perkins, EY Alumni, BlackLine CMO) are press-focused but share:
  - Same generic meta description
  - Same site-wide FAQ schema
  - No internal links
   This makes them appear thin/low-value to search engines even if the actual content is unique.

### Recommendations

1. **Fix Framer responsive rendering** to ensure H1 and heading tags aren't duplicated across viewport variants (use CSS display:none instead of separate DOM elements)
2. **Write unique meta descriptions** for all pages currently using the generic default
3. **Ensure /newsroom and /blog listing pages** have enough unique introductory content beyond just article cards

---

## 14. Priority Action Items

### Critical (Fix Immediately)


| #   | Issue                                                                                | Impact                                                 | Pages Affected |
| --- | ------------------------------------------------------------------------------------ | ------------------------------------------------------ | -------------- |
| 1   | **Remove site-wide FAQPage schema** - same FAQ duplicated on all 32 pages            | High - risk of structured data manual action           | All 32 pages   |
| 2   | **Fix multiple H1 tags** - nav/footer elements rendered as H1                        | High - confuses search engines about page topic        | All pages      |
| 3   | **Add Article/BlogPosting JSON-LD** to blog articles (requires new Framer component) | High - missing rich result eligibility for 18 articles | 18 articles    |


### High Priority


| #   | Issue                                                           | Impact                                                | Pages Affected                   |
| --- | --------------------------------------------------------------- | ----------------------------------------------------- | -------------------------------- |
| 4   | **Fix orphan pages** - add internal links                       | High - 4 pages invisible to crawlers via links        | 4 pages                          |
| 5   | **Fix generic meta descriptions**                               | Medium-High - 8 pages with wrong/generic descriptions | 8 pages                          |
| 6   | **Add canonical tags** to 2 articles                            | Medium - duplicate content risk                       | 2 pages                          |
| 7   | **Add alt text** to all images (see `ALT_TEXT_AUDIT_MAXIMA.md`) | Medium - accessibility and image SEO                  | 83 unique images across 30 pages |


### Medium Priority


| #   | Issue                                                                                           | Impact                                      | Pages Affected  |
| --- | ----------------------------------------------------------------------------------------------- | ------------------------------------------- | --------------- |
| 8   | **Improve internal linking** - ~72 new links needed (see `INTERNAL_LINKING_STRATEGY_MAXIMA.md`) | Medium - link equity not flowing to content | All 18 articles |
| 9   | **Shorten long titles**                                                                         | Low-Medium - truncation in SERPs            | 3 pages         |
| 10  | **Shorten long meta descriptions**                                                              | Low - truncation in SERPs                   | 2 pages         |
| 11  | **Add lastmod to sitemap**                                                                      | Low-Medium - crawl efficiency               | All 32 pages    |


### Low Priority / Long-term


| #   | Issue                                                                | Impact                                | Pages Affected |
| --- | -------------------------------------------------------------------- | ------------------------------------- | -------------- |
| 12  | **Add BreadcrumbList schema**                                        | Low - navigation enhancement in SERPs | All sub-pages  |
| 13  | **Add WebSite schema with SearchAction**                             | Low - site search feature in SERPs    | Homepage       |
| 14  | **Image filenames** - Framer limitation, optimize for future uploads | Low                                   | Ongoing        |
| 15  | **URL slug length** - optimize for future articles                   | Low                                   | Future content |
| 16  | **Submit pages via IndexNow**                                        | Low-Medium - speed up re-indexation   | 32 pages       |


---

*Report generated from Ahrefs Site Audit data (April 9, 2026 crawl) and live site verification (April 14, 2026).*