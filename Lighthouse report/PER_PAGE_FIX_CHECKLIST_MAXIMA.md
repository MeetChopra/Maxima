# Lighthouse Remediation — Per-Page Fix Checklist

**Site:** maxima.ai
**Date:** 2026-05-07
**Source audit:** `[FRESH]seo-audit-site-lighthouse-2026-05-07 (1).md`
**Pages covered:** 35 (full sitemap)

Each page below lists every user-fixable Lighthouse finding, with the precise location in the rendered HTML and the exact Framer setting to change. The companion document `LIGHTHOUSE_REMEDIATION_PLAN_MAXIMA.md` provides the strategic context, scoring summary, and recommended sequencing.

**Excluded from this checklist:**

- Items resolved at the template / shared-component level (listed in the next section).
- Platform-controlled items (JavaScript bundle size, cache lifetimes, render pipeline, etc.) — see remediation plan §5.
- Color contrast — requires a brand-color decision and is tracked separately in remediation plan §4.1.

---

## Already Resolved at the Template Level

The following fixes have been applied to shared components and propagate to every page on the site. Per-page entries below exclude any finding addressed by these fixes.

### Heading order — eyebrow / label texts changed from `<h6>` / `<h4>` → `<p>`

- "Insights, news and content"
- "Company"
- "Article"
- "Agentic AI"
- "News"
- "Accounting"
- "Platform"
- "COMPANY INFO"

These resolve the recurring **h2→h6**, **h4→h6**, and **h2→h4 ("Platform")** skips site-wide.

### Accessible link names

- The site logo link (in every page header) has `aria-label="Maxima — go to homepage"`.

### Follow-ups recommended in the same Smart-Component pass

- **Article-card titles in the "The latest" block.** With the eyebrow categories now `<p>`, each article-card title follows `<h2>The latest</h2>` directly. Change the article-card title's Tag from `<h4>` to `<h3>` so the section descends correctly. The fix propagates to every page that shows the latest-news block.
- **Footer column labels.** "Platform" is being changed to `<p>`; the sibling footer columns "Company", "Comparison", "Social", and "Compliance" sit alongside it in the footer component and were previously `<h4>` too. Apply the same change so the footer is consistent.

### Audits suppressed

- *List items (`<li>`) are not contained within `<ul>`, `<ol>` or `<menu>` parent elements.* — verified clean in the live DOM on 2026-05-07; Lighthouse's flag appears to have been a transient false positive. Re-confirm with a fresh Lighthouse run after the next deploy.
- *Elements use prohibited ARIA attributes* and *ARIA attributes are not valid* — these flag `aria-label` set on plain `<div>` elements (decorative ✓ / ✗ icons in comparison tables, and the FAQ accordion `+` toggles on Maxima vs FloQast, Security, and Bank Integrations). The decorative icons have no real-world impact; the FAQ toggles have a soft keyboard/screen-reader impact (no `role="button"`). Recommend addressing only if WCAG 2.1 AA conformance is required for enterprise procurement. The fix in that case: remove the aria-label on decorative icons; convert the FAQ toggle Frame to a Button component (or add `role="button"` via the Attributes panel) — one Smart Component change covers both pages.

## Index

1. [/articles/ey-alumni-spotlight-maxima-ceo-yogi-goel](#yogi-goel-tech-teamwork-and-triumphs-ey-us)
2. [/book-a-demo](#book-a-demo-of-maxima-ai-accounting-automation)
3. [/legal/cookie-policy](#maxima-ai-agentic-ai-accounting-for-modern-finance-teams)
4. [/articles/accuracy-in-accounting-why-ai-needs-more-than-intelligence](#accuracy-in-accounting-why-ai-needs-more-than-intelligence)
5. [/legal/privacy-policy](#maxima-ai-agentic-ai-accounting-for-modern-finance-teams)
6. [/articles/spoton-mastering-high-volume-cash-complexity-with-maxima](#how-spoton-streamlined-high-volume-cash-complexity-with-maxima)
7. [/articles/the-definitive-guide-to-journal-entries-in-accounting](#journal-entries-in-accounting-the-definitive-guide)
8. [/careers](#careers-at-maxima-build-the-future-of-accounting)
9. [/security](#maxima-security-compliance-data-privacy-secure-infrastructure)
10. [/articles/why-blackline-s-former-cmo-is-investing-in-maxima](#maxima-ai-agentic-ai-accounting-for-modern-finance-teams)
11. [/bank-integrations](#bank-integrations-for-accounting-automation-connect-banks-erps-and-payment-systems)
12. [/articles/best-bank-reconciliation-software-in-2026](#best-bank-reconciliation-software-in-2026)
13. [/articles/how-rewst-automated-revenue-recognition-and-prepaids-with-maxima](#maxima-ai-agentic-ai-accounting-for-modern-finance-teams)
14. [/legal](#maxima-ai-agentic-ai-accounting-for-modern-finance-teams)
15. [/articles/what-is-variance-analysis-a-complete-guide](#maxima-ai-agentic-ai-accounting-for-modern-finance-teams)
16. [/](#maxima-ai-accounting-financial-close-automation-platform)
17. [/articles/7-best-financial-close-software-solutions-to-evaluate-in-2026](#7-best-financial-close-software-solutions-to-evaluate-in-2026)
18. [/articles/how-rippling-built-sox-ready-cash-accounting-with-maxima](#how-rippling-built-sox-ready-cash-accounting-with-maxima)
19. [/maxima-vs-floqast](#maxima-vs-floqast-ai-accounting-automation-for-close)
20. [/articles/maxima-seed-series-a-agentic-ai-accounting](#announcing-maxima-s-seed-and-series-a-to-launch-the-first-ai-powered-agentic-platform-for-enterprise-accounting)
21. [/articles/kleiner-perkins-investment-perspective](#maxima-bringing-ai-agents-to-the-heart-of-enterprise-accounting-kleiner-perkins)
22. [/articles/product-success-one-team](#the-unified-product-and-deployment-model)
23. [/articles/scale-ai-staying-ahead-of-the-gl-curve-with-maxima](#how-scale-ai-achieved-accuracy-at-billion-dollar-scale-with-maxima)
24. [/articles/the-definitive-guide-to-reconciliations-in-accounting](#reconciliations-in-accounting-the-definitive-guide)
25. [/articles/maxima-named-to-ai64-s-top-enterprise-ai-companies](#maxima-named-to-ai64-s-top-enterprise-ai-companies)
26. [/how-it-works](#how-ai-accounting-automation-works-maxima)
27. [/articles/ai-tools-for-accounting](#ai-tools-for-accounting-best-software-categories-and-buyer-guide-2026)
28. [/articles/the-office-of-the-cfo-in-2030-how-ai-agents-change-the-equation](#maxima-ai-agentic-ai-accounting-for-modern-finance-teams)
29. [/about](#about-maxima-ai-native-accounting-automation)
30. [/product-overview](#maxima-product-overview)
31. [/blog](#accounting-financial-close-and-ai-insights-maxima-blog)
32. [/newsroom](#maxima-newsroom-press-announcements-and-media)
33. [/articles/gorgias-on-the-forefront-of-accounting-automation-with-maxima](#maxima-ai-agentic-ai-accounting-for-modern-finance-teams)
34. [/legal/terms-of-service](#maxima-ai-agentic-ai-accounting-for-modern-finance-teams)
35. [/articles/reuters-exclusive-maxima](#ai-accounting-startup-maxima-raises-41-million-in-kleiner-perkins-backed-round-reuters)

---

## Per-Page Detail

### Yogi Goel: tech, teamwork and triumphs | EY - US

**URL:** [https://www.maxima.ai/articles/ey-alumni-spotlight-maxima-ceo-yogi-goel](https://www.maxima.ai/articles/ey-alumni-spotlight-maxima-ceo-yogi-goel)

> Note: redirected to [https://www.ey.com/en_us/alumni/yogi-goel-tech-teamwork-and-triumphs](https://www.ey.com/en_us/alumni/yogi-goel-tech-teamwork-and-triumphs)

**Scores —** Mobile: Perf 26 / A11y 95 / BP 81 / SEO 100  •  Desktop: Perf 35 / A11y 90 / BP 81 / SEO 92

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (1).** Change each heading's Framer **Tag** to the recommended level.
    - **h1→h5** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "In brief"
- **Elements with visible text labels do not have matching accessible names.** — An aria-label conflicts with the visible button/link text. Audit aria-labels added during the recent ARIA pass and either remove them or rewrite so the visible text appears at the start.

**SEO**

- **Anchors without href** — found 7 `<a>` element(s) with no href in the rendered HTML.
  - **Fix in Framer:** for each — Properties panel → Link field → set a real URL or page reference. Avoid driving navigation via Interactions only.

**Best Practices**

- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 15 KiB)*

**Other (review manually)**

- `[role]`s are not contained by their required parent element

---

### Book a Demo of Maxima | AI Accounting Automation

**URL:** [https://www.maxima.ai/book-a-demo](https://www.maxima.ai/book-a-demo)

**Scores —** Mobile: Perf 33 / A11y 87 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Multiple `<h1>` elements (2).** A page should have exactly one. Hero may be duplicated for mobile/desktop variants.
    - h1: "Transform your accounting operations with AI agents"
    - h1: "Transform your accounting operations with AI agents"
    - **Fix:** keep only the visible hero h1; change duplicates' Tag to `<p>` (or consolidate variants).
  - **Heading skips (1).** Change each heading's Framer **Tag** to the recommended level.
    - **h1→h4** (1× on this page) — change Tag → `<h2>`:
      - "Close faster with confidence"

**Best Practices**

- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 395 KiB)*

---

### Maxima.ai — Agentic AI Accounting for Modern Finance Teams

**URL:** [https://www.maxima.ai/legal/cookie-policy](https://www.maxima.ai/legal/cookie-policy)

**Scores —** Mobile: Perf 38 / A11y 88 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (1).** Change each heading's Framer **Tag** to the recommended level.
    - **FAQ schema headings — h1→h4** (1× on this page) — fix in the FAQ schema block, change Tag → `<h2>`:
      - "What are Cookies?"
- **Touch targets do not have sufficient size or spacing.** — Increase target size to ≥24×24 CSS px or add padding/line-height.

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 348 KiB)*
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Accuracy in accounting: Why AI needs more than intelligence

**URL:** [https://www.maxima.ai/articles/accuracy-in-accounting-why-ai-needs-more-than-intelligence](https://www.maxima.ai/articles/accuracy-in-accounting-why-ai-needs-more-than-intelligence)

**Scores —** Mobile: Perf 39 / A11y 92 / BP 77 / SEO 100  •  Desktop: Perf 47 / A11y 95 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - ✅ Heading order: all skips on this page are resolved by the template-level fixes.

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 134 KiB)*
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima.ai — Agentic AI Accounting for Modern Finance Teams

**URL:** [https://www.maxima.ai/legal/privacy-policy](https://www.maxima.ai/legal/privacy-policy)

**Scores —** Mobile: Perf 39 / A11y 92 / BP 77 / SEO 100  •  Desktop: Perf 65 / A11y 95 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (1).** Change each heading's Framer **Tag** to the recommended level.
    - **FAQ schema headings — h1→h4** (1× on this page) — fix in the FAQ schema block, change Tag → `<h2>`:
      - "What is Personal Information?"

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### How SpotOn streamlined high volume cash complexity with Maxima

**URL:** [https://www.maxima.ai/articles/spoton-mastering-high-volume-cash-complexity-with-maxima](https://www.maxima.ai/articles/spoton-mastering-high-volume-cash-complexity-with-maxima)

**Scores —** Mobile: Perf 43 / A11y 92 / BP 54 / SEO 100  •  Desktop: Perf 61 / A11y 92 / BP 54 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Multiple `<h1>` elements (2).** A page should have exactly one. Hero may be duplicated for mobile/desktop variants.
    - h1: "How SpotOn streamlined high volume cash complexity with Maxima"
    - h1: "About SpotOn"
    - **Fix:** keep only the visible hero h1; change duplicates' Tag to `<p>` (or consolidate variants).
- **Links / buttons without an accessible name** — 1 `<a>` element(s) on this page lack visible text and an `aria-label`.
  - **Fix in Framer:** select each → Properties → Accessibility → set `aria-label` to a concise description of the destination or action. Most offenders are icon-only links in shared header/footer/CTA components — fix once at the component level to propagate.
  - Example element attributes:
    - `class="framer-text framer-styles-preset-1ue32gk" data-styles-preset="ZglCJHLIv" href="https://www.spoton.com" target="_b…`

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 348 KiB)*
- **Uses third-party cookies** — Project Settings → Custom Code → audit and remove/defer non-essential third-party scripts. *(LH: 5 cookies found)*
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Journal entries in accounting: the definitive guide

**URL:** [https://www.maxima.ai/articles/the-definitive-guide-to-journal-entries-in-accounting](https://www.maxima.ai/articles/the-definitive-guide-to-journal-entries-in-accounting)

**Scores —** Mobile: Perf 45 / A11y 92 / BP 77 / SEO 100  •  Desktop: Perf 91 / A11y 95 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (2).** Change each heading's Framer **Tag** to the recommended level.
    - **FAQ schema headings — h1→h3** (1× on this page) — fix in the FAQ schema block, change Tag → `<h2>`:
      - "What is a journal entry in accounting?"
    - **h2→h4** (1× on this page) — change Tag → `<h3>`:
      - "Example 1: unbilled revenue accrual with reversal"
- **Fixed Tables without** `<th>` **headers** — 7 table(s) on page; cells without headers detected.
  - Table 1: 0 `<th>` / 24 `<td>`
  - Table 2: 0 `<th>` / 27 `<td>`
  - Table 3: 0 `<th>` / 12 `<td>`
  - Table 4: 0 `<th>` / 12 `<td>`
  - Table 5: 0 `<th>` / 12 `<td>`
  - Table 6: 0 `<th>` / 12 `<td>`
  - Table 7: 0 `<th>` / 48 `<td>`

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Careers at Maxima | Build the Future of Accounting

**URL:** [https://www.maxima.ai/careers](https://www.maxima.ai/careers)

**Scores —** Mobile: Perf 47 / A11y 91 / BP 77 / SEO 100  •  Desktop: Perf 59 / A11y 95 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Multiple `<h1>` elements (2).** A page should have exactly one. Hero may be duplicated for mobile/desktop variants.
    - h1: "Work at Maxima"
    - h1: "Join us to tackle a decades-old problem and leverage LLMs and agents to eliminat…"
    - **Fix:** keep only the visible hero h1; change duplicates' Tag to `<p>` (or consolidate variants).
  - **Heading skips (3).** Change each heading's Framer **Tag** to the recommended level.
    - **h1→h3** (1× on this page) — change Tag → `<h2>`:
      - "Closing the books is one of enterprise’s hardest problems—billions of transactio…"
    - **h2→h4** (2× on this page) — change Tag → `<h3>`:
      - "Equity and top of market salary"
      - "Engineering and Product"

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 519 KiB)*
- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima Security | Compliance, Data Privacy, Secure Infrastructure

**URL:** [https://www.maxima.ai/security](https://www.maxima.ai/security)

**Scores —** Mobile: Perf 47 / A11y 85 / BP 77 / SEO 100  •  Desktop: Perf 60 / A11y 89 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (5).** Change each heading's Framer **Tag** to the recommended level.
    - **FAQ schema headings — h2→h4** (1× on this page) — fix in the FAQ schema block, change Tag → `<h3>`:
      - "How does Maxima define customer data?"
    - **h2→h4** (4× on this page) — change Tag → `<h3>`:
      - "Data segregation"
      - "Zero model training"
      - "Dedicated security leadership"
      - "Nothing posts without approval"
- **Add `<main>` landmark** — confirmed missing in HTML. Top-level content frame → Properties → Accessibility → Tag → `Main`.

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 348 KiB)*
- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima.ai — Agentic AI Accounting for Modern Finance Teams

**URL:** [https://www.maxima.ai/articles/why-blackline-s-former-cmo-is-investing-in-maxima](https://www.maxima.ai/articles/why-blackline-s-former-cmo-is-investing-in-maxima)

**Scores —** Mobile: Perf 48 / A11y 91 / BP 54 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Multiple `<h1>` elements (2).** A page should have exactly one. Hero may be duplicated for mobile/desktop variants.
    - h1: "Why BlackLine's former CMO is investing in Maxima"
    - h1: "About Andres"
    - **Fix:** keep only the visible hero h1; change duplicates' Tag to `<p>` (or consolidate variants).

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 348 KiB)*
- **Uses third-party cookies** — Project Settings → Custom Code → audit and remove/defer non-essential third-party scripts. *(LH: 5 cookies found)*
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Bank Integrations for Accounting Automation | Connect Banks, ERPs, and Payment Systems

**URL:** [https://www.maxima.ai/bank-integrations](https://www.maxima.ai/bank-integrations)

**Scores —** Mobile: Perf 49 / A11y 85 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (2).** Change each heading's Framer **Tag** to the recommended level.
    - **h2→h4** (2× on this page) — change Tag → `<h3>`:
      - "Legacy systems"
      - "Transaction-level foundation"
- **Add `<main>` landmark** — confirmed missing in HTML. Top-level content frame → Properties → Accessibility → Tag → `Main`.

**Best Practices**

- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 408 KiB)*

---

### Best bank reconciliation software in 2026

**URL:** [https://www.maxima.ai/articles/best-bank-reconciliation-software-in-2026](https://www.maxima.ai/articles/best-bank-reconciliation-software-in-2026)

**Scores —** Mobile: Perf 50 / A11y 92 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (1).** Change each heading's Framer **Tag** to the recommended level.
    - **FAQ schema headings — h1→h3** (1× on this page) — fix in the FAQ schema block, change Tag → `<h2>`:
      - "What is the best bank reconciliation software?"

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima.ai — Agentic AI Accounting for Modern Finance Teams

**URL:** [https://www.maxima.ai/articles/how-rewst-automated-revenue-recognition-and-prepaids-with-maxima](https://www.maxima.ai/articles/how-rewst-automated-revenue-recognition-and-prepaids-with-maxima)

**Scores —** Mobile: Perf 50 / A11y 92 / BP 54 / SEO 100  •  Desktop: Perf 62 / A11y 92 / BP 54 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Multiple `<h1>` elements (2).** A page should have exactly one. Hero may be duplicated for mobile/desktop variants.
    - h1: "How Rewst automated revenue recognition and prepaids with Maxima"
    - h1: "About Rewst"
    - **Fix:** keep only the visible hero h1; change duplicates' Tag to `<p>` (or consolidate variants).
- **Links / buttons without an accessible name** — 1 `<a>` element(s) on this page lack visible text and an `aria-label`.
  - **Fix in Framer:** select each → Properties → Accessibility → set `aria-label` to a concise description of the destination or action. Most offenders are icon-only links in shared header/footer/CTA components — fix once at the component level to propagate.
  - Example element attributes:
    - `class="framer-text framer-styles-preset-1ue32gk" data-styles-preset="ZglCJHLIv" href="https://www.rewst.io" target="_bla…`

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 348 KiB)*
- **Uses third-party cookies** — Project Settings → Custom Code → audit and remove/defer non-essential third-party scripts. *(LH: 5 cookies found)*
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima.ai — Agentic AI Accounting for Modern Finance Teams

**URL:** [https://www.maxima.ai/legal](https://www.maxima.ai/legal)

> Note: redirected to [https://www.maxima.ai/legal/privacy-policy](https://www.maxima.ai/legal/privacy-policy)

**Scores —** Mobile: Perf 50 / A11y 92 / BP 77 / SEO 100  •  Desktop: Perf 71 / A11y 95 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (1).** Change each heading's Framer **Tag** to the recommended level.
    - **FAQ schema headings — h1→h4** (1× on this page) — fix in the FAQ schema block, change Tag → `<h2>`:
      - "What is Personal Information?"

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima.ai — Agentic AI Accounting for Modern Finance Teams

**URL:** [https://www.maxima.ai/articles/what-is-variance-analysis-a-complete-guide](https://www.maxima.ai/articles/what-is-variance-analysis-a-complete-guide)

**Scores —** Mobile: Perf 52 / A11y 92 / BP 77 / SEO 100  •  Desktop: Perf 71 / A11y 95 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (2).** Change each heading's Framer **Tag** to the recommended level.
    - **FAQ schema headings — h1→h3** (1× on this page) — fix in the FAQ schema block, change Tag → `<h2>`:
      - "How do you set materiality thresholds for variance analysis?"
    - **h2→h5** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "Example 1: revenue decline that is not actually a decline"

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima | AI Accounting & Financial Close Automation Platform

**URL:** [https://www.maxima.ai/](https://www.maxima.ai/)

**Scores —** Mobile: Perf 53 / A11y 88 / BP 77 / SEO 92  •  Desktop: Perf 64 / A11y 91 / BP 77 / SEO 92

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Multiple `<h1>` elements (5).** A page should have exactly one. Hero may be duplicated for mobile/desktop variants.
    - h1: "Agentic accounting automation,from record to report"
    - h1: "Agentic accounting automation, from record to report"
    - h1: "$300B+"
    - h1: "100%"
    - h1: "150+"
    - **Fix:** keep only the visible hero h1; change duplicates' Tag to `<p>` (or consolidate variants).
  - **Heading skips (5).** Change each heading's Framer **Tag** to the recommended level.
    - **h1→h6** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "TRUSTED BY ICONIC PUBLIC AND PRIVATE ENTERPRISES"
    - **h2→h6** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "Agent Prepared"
    - **h2→h4** (2× on this page) — change Tag → `<h3>`:
      - "The most complete view of your financial data"
    - **h2→h5** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "$300B+"

**SEO**

- **Links with non-descriptive text** — found 4 anchor(s) with generic text ("click here", "learn more", arrow chars, etc.).
  - **Fix in Framer:** rewrite anchor text to describe the destination (e.g., "Read the Scale AI case study" instead of "Read more").

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 483 KiB)*

---

### 7 best financial close software solutions to evaluate in 2026

**URL:** [https://www.maxima.ai/articles/7-best-financial-close-software-solutions-to-evaluate-in-2026](https://www.maxima.ai/articles/7-best-financial-close-software-solutions-to-evaluate-in-2026)

**Scores —** Mobile: Perf 53 / A11y 92 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (3).** Change each heading's Framer **Tag** to the recommended level.
    - **"What’s the difference between close software and consolidation software?"** appears 2× with different tags:
      1. Fix heading in FAQ schema (h1→h5, change Tag → `<h2>`).
      2. Other suggested heading fix in blog content (h2→h5, change Tag → `<h3>`).
    - **h2→h5** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "Data integration and ERP connectivity"

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### How Rippling built SOX-ready cash accounting with Maxima

**URL:** [https://www.maxima.ai/articles/how-rippling-built-sox-ready-cash-accounting-with-maxima](https://www.maxima.ai/articles/how-rippling-built-sox-ready-cash-accounting-with-maxima)

**Scores —** Mobile: Perf 53 / A11y 92 / BP 77 / SEO 100  •  Desktop: Perf 65 / A11y 92 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Multiple `<h1>` elements (2).** A page should have exactly one. Hero may be duplicated for mobile/desktop variants.
    - h1: "How Rippling built SOX-ready cash accounting with Maxima"
    - h1: "About Rippling"
    - **Fix:** keep only the visible hero h1; change duplicates' Tag to `<p>` (or consolidate variants).
- **Links / buttons without an accessible name** — 1 `<a>` element(s) on this page lack visible text and an `aria-label`.
  - **Fix in Framer:** select each → Properties → Accessibility → set `aria-label` to a concise description of the destination or action. Most offenders are icon-only links in shared header/footer/CTA components — fix once at the component level to propagate.
  - Example element attributes:
    - `class="framer-text framer-styles-preset-1ue32gk" data-styles-preset="ZglCJHLIv" href="https://www.rippling.com" target="…`

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 348 KiB)*
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima vs FloQast | AI Accounting Automation for Close

**URL:** [https://www.maxima.ai/maxima-vs-floqast](https://www.maxima.ai/maxima-vs-floqast)

**Scores —** Mobile: Perf 53 / A11y 86 / BP 77 / SEO 100  •  Desktop: Perf 75 / A11y 90 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (5).** Change each heading's Framer **Tag** to the recommended level.
    - **FAQ schema headings — h2→h4** (1× on this page) — fix in the FAQ schema block, change Tag → `<h3>`:
      - "How is Maxima different from FloQast?"
    - **h1→h6** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "proven in production By Leading Accounting Teams"
    - **h2→h4** (3× on this page) — change Tag → `<h3>`:
      - "Native integrations + transaction level lineage"
      - "1"
      - "Close faster with confidence"
- **Add `<main>` landmark** — confirmed missing in HTML. Top-level content frame → Properties → Accessibility → Tag → `Main`.
- **Elements with visible text labels do not have matching accessible names.** — An aria-label conflicts with the visible button/link text. Audit aria-labels added during the recent ARIA pass and either remove them or rewrite so the visible text appears at the start.

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 99 KiB)*
- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.

---

### Announcing Maxima's seed and Series A to launch the first AI-powered agentic platform for enterprise accounting

**URL:** [https://www.maxima.ai/articles/maxima-seed-series-a-agentic-ai-accounting](https://www.maxima.ai/articles/maxima-seed-series-a-agentic-ai-accounting)

**Scores —** Mobile: Perf 54 / A11y 92 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (1).** Change each heading's Framer **Tag** to the recommended level.
    - **h1→h3** (1× on this page) — change Tag → `<h2>`:
      - "From human-prepared to agent-prepared"

**Best Practices**

- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 598 KiB)*

---

### Maxima: Bringing AI agents to the heart of enterprise accounting | Kleiner Perkins

**URL:** [https://www.maxima.ai/articles/kleiner-perkins-investment-perspective](https://www.maxima.ai/articles/kleiner-perkins-investment-perspective)

> Note: redirected to [https://www.kleinerperkins.com/perspectives/maxima-bringing-ai-agents-to-the-heart-of-enterprise-accounting/](https://www.kleinerperkins.com/perspectives/maxima-bringing-ai-agents-to-the-heart-of-enterprise-accounting/)

**Scores —** Mobile: Perf 55 / A11y 95 / BP 96 / SEO 92  •  Desktop: Perf 74 / A11y 95 / BP 96 / SEO 92

**Accessibility**

- **Heading order**
  - **Heading skips (1).** Change each heading's Framer **Tag** to the recommended level.
    - **h1→h4** (1× on this page) — change Tag → `<h2>`:
      - "By"
- **Touch targets do not have sufficient size or spacing.** — Increase target size to ≥24×24 CSS px or add padding/line-height.

**SEO**

- **Missing meta description** — confirmed: no `<meta name="description">` tag in HTML.
  - **Fix in Framer:** open the page (or CMS entry) → SEO section in the right-side panel → fill in **Description** field (target ~150-160 chars).

**Best Practices**

- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 1,058 KiB)*

---

### The unified product and deployment model

**URL:** [https://www.maxima.ai/articles/product-success-one-team](https://www.maxima.ai/articles/product-success-one-team)

**Scores —** Mobile: Perf 55 / A11y 92 / BP 77 / SEO 100  •  Desktop: Perf 76 / A11y 95 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - ✅ Heading order: all skips on this page are resolved by the template-level fixes.

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 367 KiB)*
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### How Scale AI achieved accuracy at billion-dollar scale with Maxima

**URL:** [https://www.maxima.ai/articles/scale-ai-staying-ahead-of-the-gl-curve-with-maxima](https://www.maxima.ai/articles/scale-ai-staying-ahead-of-the-gl-curve-with-maxima)

**Scores —** Mobile: Perf 55 / A11y 91 / BP 54 / SEO 100  •  Desktop: Perf 64 / A11y 95 / BP 54 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Multiple `<h1>` elements (2).** A page should have exactly one. Hero may be duplicated for mobile/desktop variants.
    - h1: "How Scale AI achieved accuracy at billion-dollar scale with Maxima"
    - h1: "About Scale"
    - **Fix:** keep only the visible hero h1; change duplicates' Tag to `<p>` (or consolidate variants).

**Best Practices**

- **Uses third-party cookies** — Project Settings → Custom Code → audit and remove/defer non-essential third-party scripts. *(LH: 5 cookies found)*
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 388 KiB)*

---

### Reconciliations in accounting: the definitive guide

**URL:** [https://www.maxima.ai/articles/the-definitive-guide-to-reconciliations-in-accounting](https://www.maxima.ai/articles/the-definitive-guide-to-reconciliations-in-accounting)

**Scores —** Mobile: Perf 55 / A11y 92 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (4).** Change each heading's Framer **Tag** to the recommended level.
    - **FAQ schema headings — h1→h3** (1× on this page) — fix in the FAQ schema block, change Tag → `<h2>`:
      - "What is the difference between reconciliation and matching?"
    - **h2→h5** (3× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "Accounts receivable reconciliation"
      - "Bank reconciliation statement (March 31)"
      - "1. Partial Matches"

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima named to AI64's top enterprise AI companies

**URL:** [https://www.maxima.ai/articles/maxima-named-to-ai64-s-top-enterprise-ai-companies](https://www.maxima.ai/articles/maxima-named-to-ai64-s-top-enterprise-ai-companies)

**Scores —** Mobile: Perf 57 / A11y 92 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - ✅ Heading order: all skips on this page are resolved by the template-level fixes.

**Best Practices**

- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 348 KiB)*

---

### How AI Accounting Automation Works | Maxima

**URL:** [https://www.maxima.ai/how-it-works](https://www.maxima.ai/how-it-works)

**Scores —** Mobile: Perf 60 / A11y 91 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (4).** Change each heading's Framer **Tag** to the recommended level.
    - **h2→h4** (3× on this page) — change Tag → `<h3>`:
      - "Current reality"
      - "Connect directly to your finance stack"
    - **h4→h6** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "Integrations"

**Best Practices**

- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 440 KiB)*

---

### AI tools for accounting: best software, categories, and buyer guide (2026)

**URL:** [https://www.maxima.ai/articles/ai-tools-for-accounting](https://www.maxima.ai/articles/ai-tools-for-accounting)

**Scores —** Mobile: Perf 61 / A11y 92 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (2).** Change each heading's Framer **Tag** to the recommended level.
    - **"What is the difference between AI-assisted and agentic AI accounting tools?"** appears 2× with different tags:
      1. Fix heading in FAQ schema (h1→h5, change Tag → `<h2>`).
      2. Other suggested heading fix in blog content (h2→h5, change Tag → `<h3>`).

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 56 KiB)*

---

### Maxima.ai — Agentic AI Accounting for Modern Finance Teams

**URL:** [https://www.maxima.ai/articles/the-office-of-the-cfo-in-2030-how-ai-agents-change-the-equation](https://www.maxima.ai/articles/the-office-of-the-cfo-in-2030-how-ai-agents-change-the-equation)

**Scores —** Mobile: Perf 61 / A11y 92 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - ✅ Heading order: all skips on this page are resolved by the template-level fixes.

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 62 KiB)*
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### About Maxima | AI-Native Accounting Automation

**URL:** [https://www.maxima.ai/about](https://www.maxima.ai/about)

**Scores —** Mobile: Perf 63 / A11y 91 / BP 77 / SEO 92  •  Desktop: Perf 68 / A11y 91 / BP 77 / SEO 92

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (5).** Change each heading's Framer **Tag** to the recommended level.
    - **h2→h6** (4× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "About us"
      - "INVESTORS"
      - "The Team"
      - "Formerly at"
    - **h3→h6** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "Founders"
- **Links / buttons without an accessible name** — 33 `<a>` element(s) on this page lack visible text and an `aria-label`.
  - **Fix in Framer:** select each → Properties → Accessibility → set `aria-label` to a concise description of the destination or action. Most offenders are icon-only links in shared header/footer/CTA components — fix once at the component level to propagate.
  - Example element attributes:
    - `class="framer-1hix09f framer-9g9stw" data-framer-name="linkedin-container" href="https://www.linkedin.com/in/yogi-goel" …`
    - `class="framer-13f6chn framer-9g9stw" data-framer-name="linkedin-container" href="https://www.linkedin.com/in/akshayasriv…`
    - `class="framer-10ppi84 framer-9g9stw" data-framer-name="linkedin-container" href="https://www.linkedin.com/in/jackliao07"…`
    - `class="framer-we7f95 framer-1l2gq4y" data-framer-name="linked-in-container" href="https://www.linkedin.com/in/koaaron/" …`
    - `class="framer-we7f95 framer-1l2gq4y" data-framer-name="linked-in-container" href="https://www.linkedin.com/in/abbbbyhe/"…`

**SEO**

- **Anchors without href** — found 1 `<a>` element(s) with no href in the rendered HTML.
  - **Fix in Framer:** for each — Properties panel → Link field → set a real URL or page reference. Avoid driving navigation via Interactions only.

**Best Practices**

- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima | Product Overview

**URL:** [https://www.maxima.ai/product-overview](https://www.maxima.ai/product-overview)

**Scores —** Mobile: Perf 63 / A11y 91 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (13).** Change each heading's Framer **Tag** to the recommended level.
    - **FAQ schema headings — h2→h4** (1× on this page) — fix in the FAQ schema block, change Tag → `<h3>`:
      - "Why should I choose Maxima over BlackLine or Floqast?"
    - **h1→h6** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "Agent Prepared"
    - **h2→h6** (11× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "No-code logic"
      - "Materiality and policy"
      - "Continuous matching"
      - "Real-time monitoring"
      - "Daily visibility"

**Best Practices**

- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 85 KiB)*

---

### Accounting, Financial Close, and AI Insights | Maxima Blog

**URL:** [https://www.maxima.ai/blog](https://www.maxima.ai/blog)

**Scores —** Mobile: Perf 64 / A11y 91 / BP 77 / SEO 100  •  Desktop: no data

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (14).** Change each heading's Framer **Tag** to the recommended level.
    - **h4→h6** (14× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "Featured"
      - "Customer stories"

**Best Practices**

- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 488 KiB)*
- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

### Maxima Newsroom | Press, Announcements, and Media

**URL:** [https://www.maxima.ai/newsroom](https://www.maxima.ai/newsroom)

**Scores —** Mobile: Perf 67 / A11y 89 / BP 77 / SEO 100  •  Desktop: Perf 68 / A11y 93 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (11).** Change each heading's Framer **Tag** to the recommended level.
    - **h1→h6** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "Customer stories"
    - **h3→h6** (3× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "Customer stories"
    - **h2→h4** (1× on this page) — change Tag → `<h3>`:
      - "Yogi Goel, founder of Maxima, Live on TBPN"
    - **h2→h6** (1× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "press release"
    - **h4→h6** (5× on this page) — change Tag → `<p>` (these are eyebrow/decorative labels, not headings):
      - "press release"
- **Add `<main>` landmark** — confirmed missing in HTML. Top-level content frame → Properties → Accessibility → Tag → `Main`.

**Best Practices**

- **LCP request discovery** — Place hero image as a top-level Image element on the canvas so Framer's heuristic marks it as eager.
- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 383 KiB)*

---

### Maxima.ai — Agentic AI Accounting for Modern Finance Teams

**URL:** [https://www.maxima.ai/articles/gorgias-on-the-forefront-of-accounting-automation-with-maxima](https://www.maxima.ai/articles/gorgias-on-the-forefront-of-accounting-automation-with-maxima)

**Scores —** Mobile: no data  •  Desktop: Perf 77 / A11y 91 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Multiple `<h1>` elements (2).** A page should have exactly one. Hero may be duplicated for mobile/desktop variants.
    - h1: "How Gorgias automated reconciliation and journal prep with Maxima"
    - h1: "About Gorgias"
    - **Fix:** keep only the visible hero h1; change duplicates' Tag to `<p>` (or consolidate variants).
- **Links / buttons without an accessible name** — 1 `<a>` element(s) on this page lack visible text and an `aria-label`.
  - **Fix in Framer:** select each → Properties → Accessibility → set `aria-label` to a concise description of the destination or action. Most offenders are icon-only links in shared header/footer/CTA components — fix once at the component level to propagate.
  - Example element attributes:
    - `class="framer-text framer-styles-preset-1ue32gk" data-styles-preset="ZglCJHLIv" href="https://www.gorgias.com" target="_…`

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 1,093 KiB)*

---

### Maxima.ai — Agentic AI Accounting for Modern Finance Teams

**URL:** [https://www.maxima.ai/legal/terms-of-service](https://www.maxima.ai/legal/terms-of-service)

**Scores —** Mobile: no data  •  Desktop: Perf 81 / A11y 92 / BP 77 / SEO 100

**Accessibility**

- **Background and foreground colors do not have a sufficient contrast ratio.** — Brand-color decision required (see §4.1 of remediation plan).
- **Heading order**
  - **Heading skips (1).** Change each heading's Framer **Tag** to the recommended level.
    - **h1→h4** (1× on this page) — change Tag → `<h2>`:
      - "Your use of the sites"
- **Touch targets do not have sufficient size or spacing.** — Increase target size to ≥24×24 CSS px or add padding/line-height.

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.
- **Improve image delivery** — Confirm hero/large images are top-level Image elements (not nested in Smart Components, code components, or rich text). Upload at sensible source dimensions. *(LH: Est savings of 1,093 KiB)*

---

### AI accounting startup Maxima raises $41 million in Kleiner Perkins-backed round | Reuters

**URL:** [https://www.maxima.ai/articles/reuters-exclusive-maxima](https://www.maxima.ai/articles/reuters-exclusive-maxima)

> ⚠️ HTML fetch returned HTTP 401. Drill-down skipped.

**Scores —** Mobile: Perf — / A11y 94 / BP 92 / SEO 82  •  Desktop: Perf — / A11y 94 / BP 92 / SEO 82

**Accessibility**

- **Document does not have a main landmark.** — Page is missing a `<main>` landmark. Top-level content frame → Properties → Accessibility → Tag → Main.

**SEO**

- **Page lacks the HTML doctype, thus triggering quirks-mode** — Investigate page configuration — likely a redirect/custom-code page rather than normal Framer page.
- **Document does not have a meta description** — CMS entry → SEO section → Description (~150-160 chars).
- **Page has unsuccessful HTTP status code** — Page returns non-2xx. Check publish state, redirects, and CMS entry status. *(LH: 401)*

**Best Practices**

- **Browser errors were logged to the console** — Open DevTools Console → triage user-script errors (HubSpot, custom code components). framer.com errors are out of scope.

---

