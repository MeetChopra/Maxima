# Lighthouse Remediation Plan

**Date:** 2026-05-07
**Pages covered:** 35
**Companion document:** `PER_PAGE_FIX_CHECKLIST_MAXIMA.md` (precise locations and Framer steps for every per-page fix)

---

## 1. Summary


| Score          | Mobile (avg) | Desktop (avg) |
| -------------- | ------------ | ------------- |
| Performance    | 51           | 67            |
| Accessibility  | 91           | 93            |
| Best Practices | 75           | 76            |
| SEO            | 99           | 98            |


- **SEO is in great shape** (99 mobile / 98 desktop). Almost every page scores 100. The two outliers that previously dragged the SEO average — `/articles/reuters-exclusive-maxima` and `/articles/kleiner-perkins-investment-perspective` — are now configured as redirects to the Reuters and Kleiner Perkins sites respectively, which removes them from the indexable surface (see §2.4).
- **Accessibility has the highest ROI for hands-on remediation.** Every accessibility finding raised in the audit is fixable inside Framer's editor, except color contrast which depends on a brand-color decision (§3.1).
- **A large share of the accessibility findings have already been resolved at the template / shared-component level** — applied but not yet live. See §2.1 for the list. Once published, these template fixes alone close the heading-order finding on most of the 32 pages it appeared on, and the link-accessible-name finding on most of the 30 pages it appeared on.
- **Performance and Best Practices scores are largely Framer-platform-controlled.** Framer's [official guidance](https://www.framer.com/help/articles/guide-to-lighthouse-scores/) explicitly states that Lighthouse is a debugging tool, not a Google ranking factor, and asks users not to chase a perfect mobile PageSpeed score. Real-user Core Web Vitals from Search Console are the metric that matters for SEO.
- **Worst-scoring pages worth a focused look:**
  - `/book-a-demo` — Performance 33 mobile. This is the conversion page; LCP and layout shift issues here have direct revenue impact.
  - `/security` and `/bank-integrations` — Accessibility 85 mobile (lowest on the site). Heading-order skips on both pages have already been fixed in Framer (not live); the remaining accessibility lift is the missing `<main>` landmark on each (§2.2.2).
  - `/maxima-vs-floqast` — Accessibility 86 mobile. Same shape as Security and Bank Integrations: heading-order fixes applied; `<main>` landmark still needed.

---

## 2. Fixes in Framer

This section is organized by what has been done and what remains. Per-page detail (precise headings, anchor attributes, Framer paths) lives in `PER_PAGE_FIX_CHECKLIST_MAXIMA.md`.

### 2.1 Resolved at the template / shared-component level (applied, not yet live)

The following fixes are applied to shared components and propagate to every page on the site once published:

**Heading order — eyebrow / label texts re-tagged from `<h6>` / `<h4>` → `<p>`**

These small all-caps or category labels were being announced by screen readers as headings, which produced the recurring `h2→h6`, `h4→h6`, and `h2→h4` skips that surfaced on virtually every page:

- "Insights, news and content"
- "Company"
- "Article"
- "Agentic AI"
- "News"
- "Accounting"
- "Platform"
- "COMPANY INFO"

**Article-card titles in the "The latest" block** — Tag changed from `<h4>` to `<h3>` so that with the eyebrow categories now `<p>`, each article card descends correctly under `<h2>The latest</h2>`.

**Footer column labels** — "Platform", "Company", "Comparison", "Social", and "Compliance" re-tagged from `<h4>` to `<p>`.

**Site logo link** — `aria-label="Maxima — go to homepage"` added in the shared header. This single change closes the link-accessible-name finding on the 30 pages where the logo was the only flagged anchor.

### 2.2 Per-page accessibility fixes

#### 2.2.1 Heading order — sequentially descending — **WCAG 1.3.1 / 2.4.6**

After the template-level eyebrow fixes above, three classes of heading-order issues remain at the page level. Almost all of them have been addressed inside Framer (not yet live); the items still to be applied are flagged in the per-page checklist.

**(a) Multiple `<h1>` on case-study articles.** Each customer-story article (SpotOn, Rewst, Rippling, Scale AI, Gorgias, Why Blackline's Former CMO) has the article title as `<h1>` plus a second `<h1>` on the "About Customer" block. **Fix:** keep the title `<h1>`; change the "About Customer" Tag to `<h2>`.

**(b) FAQ schema headings on long-form articles and product pages.** The FAQ's section or FAQ schema component on Journal Entries, Best Bank Reconciliation Software, Variance Analysis, 7 Best Financial Close Software, AI Tools for Accounting, Reconciliations, Security, Maxima vs FloQast, and Product Overview emits its question headings at the wrong level (typically `h1→h3` or `h2→h4` skips). Fixed the FAQ schema block. changed the question Tag to `<h2>` (or `<h3>` where the surrounding section is `<h2>`).

**(c) Sub-section headings inside long-form blog content.** A small number of body sub-headings on legal pages and a handful of articles use `h1→h4`, `h2→h4`, or `h2→h5` skips. **Fix:** change the body Tag to `<h2>` or `<h3>` so it descends from its parent - or, where the text is decorative (an example label, a numbered step), change to `<p>`.

#### 2.2.2 Document does not have a `<main>` landmark — **WCAG 1.3.1 / 2.4.1**

**Affected:** `/maxima-vs-floqast`, `/security`, `/bank-integrations`, `/newsroom` (4 pages)

These four pages slipped through the prior site-wide landmark fix. Newsroom is a CMS collection page, so the layout template needs the landmark applied separately. The other three are stand-alone pages.

**Fix in Framer: T**hese pages don't currently have a single parent container in Framer that `<main>` can wrap. Needs a small Framer restructure on those four pages before the landmark can be added.

#### 2.2.3 Links without a discernible accessible name — **WCAG 2.4.4 / 4.1.2**

After the logo `aria-label` template fix, this finding remains on the customer-story articles (Rewst, Rippling, Gorgias). The offender on each is a plain inline text link inside the article's CMS Rich Text body. A "Website" link in the "About Customer]" block pointing to `rewst.io` / `rippling.com` / `gorgias.com`.

**Framer constraint:** the Accessibility panel for text layers and for text-styled inline links inside CMS Rich Text only exposes **Tag**, **Tab Index**, and **Google Bot** - `aria-label` is **not** a configurable property for these elements. `aria-label` is only exposed on Frames and a handful of other element types (which is how the logo-link template fix was possible). 

**The two viable paths are therefore:**

1. **Make the visible link text fully self-describing.** Where Framer cannot add `aria-label`, the visible text *is* the accessible name - so editing the rich-text content so the link wraps a descriptive phrase (e.g. "Visit the Rewst website" instead of a bare "Website") satisfies WCAG 2.4.4 directly.
2. **Treat as a Framer platform limitation.** If the visible text must remain as currently designed and the offending anchor cannot be made self-describing inside the editor, the finding is platform-controlled. Framer does not expose the property the audit asks for on this element type. This is the same class of limitation as the items in §4.

#### 2.2.4 Tables without `<th>` headers — **WCAG 1.3.1**

**Affected:** Journal Entries article (`/articles/the-definitive-guide-to-journal-entries-in-accounting`) — applied, not yet live.

The seven tables in this article had data cells without column / row headers. **Fix applied:** opened the article CMS entry → located each table inside the Rich Text field → right-clicked the cells in the first row → **Set as header**. (This option is only available on tables created inside a CMS Rich Text field.)

#### 2.2.5 Touch targets do not have sufficient size or spacing — **WCAG 2.5.8 (AA, WCAG 2.2)**

**Affected:** `/legal/cookie-policy` (and by template extension `/legal/terms-of-service`, `/legal/privacy-policy`)

Inline links inside dense legal text fall below the 24×24 CSS-pixel minimum spacing requirement. **Fix in Framer:** increase line-height on body text in the legal page template, or add padding around inline link styles. The legal pages share a template, so a single text-style update closes all three.

### 2.3 Per-page SEO fixes

#### 2.3.1 Anchor without `href` — `/about`

The `/about` page has one `<a>` element rendered without an `href`. We traced it: it is the LinkedIn icon on a team-member card inside the team / investors / founders section which belongs to Xiao Xi.

**Suggested Fix:**  Fill in the LinkedIn URL field so it doesn't render when the URL field is empty.

#### 2.3.2 Generic anchor text — Homepage (`/`)

Lighthouse flagged 4 anchors with generic text ("learn more" / arrow characters / etc.). Review confirmed these are mostly contextual CTAs whose surrounding heading and copy make the destination obvious to a sighted reader. 

**No action recommended** — keep the visual design.

### 2.4 Pages now configured as redirects

Three pages from the audit are now configured as redirects to third-party publications and are no longer Maxima-served indexable pages. Lighthouse findings on these pages no longer apply to the site:

- `/articles/ey-alumni-spotlight-maxima-ceo-yogi-goel` → `ey.com/en_us/alumni/yogi-goel-tech-teamwork-and-triumphs`
- `/articles/kleiner-perkins-investment-perspective` → `kleinerperkins.com/perspectives/maxima-bringing-ai-agents-to-the-heart-of-enterprise-accounting/`
- `/articles/reuters-exclusive-maxima` → `reuters.com/business/ai-accounting-startup-maxima-raises-41-million-kleiner-perkins-backed-round-2025-11-18/`

The "missing doctype" / "unsuccessful HTTP status" / "missing meta description" findings on the Reuters and Kleiner Perkins pages are explained by the redirect configuration — the pages return a 3xx response by design rather than rendering HTML. **No action needed**.

### 2.5 Best Practices

#### 2.5.1 Uses third-party cookies

**Affected:** the four customer-story articles whose footers include the partner-customer CTA module — `/articles/spoton-...`, `/articles/scale-ai-...`, `/articles/how-rewst-...`, `/articles/why-blackline-s-former-cmo-...` (5 cookies each).

The cookies originate from third-party scripts loaded via Framer's Custom Code slots. The fact that all four affected pages are case studies / investment articles indicates a "case study" template-level script (likely HubSpot forms, an analytics tag, or a chat widget) that the editorial articles do not load. **Fix:** identify the case-study template's Custom Code blocks → audit which third-party tags are required → either remove unused tags or load them after explicit consent (cookie banner gating).

#### 2.5.2 Improve image delivery

**Affected:** 24 of 33 pages (mobile), 15 of 21 (desktop)

Framer auto-converts images to WebP, generates responsive `srcset`, and lazy-loads below-the-fold images by default — but it skips this optimization when images are buried inside CMS rich text, code components, or variable-driven Smart Components.

**Suggested fix in Framer:** for each flagged page, confirm the hero / large images are placed as **top-level Image elements** on the canvas, not nested inside a Smart Component slot, code component, or rich-text body. For source images, upload at sensible dimensions — anything larger than ~2× the maximum displayed width is wasted bytes regardless of Framer's compression.

#### 2.5.3 LCP image is lazy-loaded

**Affected:** `/about`, `/book-a-demo`, `/how-it-works`, `/bank-integrations`, `/security`, `/careers`, `/blog`, `/newsroom`, `/maxima-vs-floqast`, `/product-overview`, plus `/articles/maxima-named-to-ai64-s-top-enterprise-ai-companies` and `/articles/maxima-seed-series-a-agentic-ai-accounting` (12 pages — down from 14 once the redirected articles are excluded).

Framer does not expose a first-class "Loading: Eager" or `fetchpriority="high"` toggle in the editor, but its internal heuristic does mark top-level above-the-fold Image elements as eager. The fact that 12 different pages all fail this check indicates a shared layout pattern is putting hero images one wrapper too deep.

**Fix in Framer:** for each affected page, confirm the LCP image (typically the hero) is placed as a **top-level Image element directly on the canvas** — not inside a Smart Component, not inside a code component, not inside a CMS rich-text field. If the hero is a CMS-driven image on a collection template (Newsroom, Blog, articles), confirm the binding is on a top-level Image element rather than a nested wrapper. If a single hero component is reused across these pages, fixing it once at the component level closes most of the spread.

#### 2.5.4 Browser console errors

**Affected:** every page

**Fix:** open each page in Chrome → DevTools → Console → record each error. Errors originating from `framer.com` runtime files are platform-controlled and out of scope (§4). Errors originating from HubSpot, custom code components, or other user-added scripts should be triaged and either fixed or the script removed if no longer needed.

---

## 3. Requires Brand / Design Approval

### 3.1 Background and foreground colors do not have a sufficient contrast ratio — **WCAG 1.4.3 (AA)**

**Affected:** 31 of 33 pages (mobile), 19 of 21 (desktop) — effectively every page

Multiple text/background combinations fall below the 4.5:1 contrast ratio required for normal text (3:1 for large text, 18 pt+ or 14 pt bold+).

This is not a Framer platform limitation — colors are fully editable in the design — but the affected colors are part of Maxima's brand palette and existing design system. Changing them unilaterally would break visual consistency across the site, marketing assets, and product UI.

**Recommended next step (for Maxima brand / design team):**

1. Run Framer's marketplace **Contrast Checker** plugin against each page to enumerate every offending text/background pair.
2. For each pair, decide on a brand-approved adjustment — typically darkening light-grey body text on white backgrounds, or selecting a higher-contrast variant of the brand accent color for buttons/links.
3. Update the design-system / Framer color tokens once, and let the change propagate site-wide.

This is the highest-leverage accessibility lift remaining on the site, but it must be owned by the brand team rather than executed inside the consulting scope.

---

## 4. Platform-Controlled (Framer)

The following items are caused by Framer's build pipeline, runtime, or hosting layer and **cannot be remediated from the Framer editor**. They are documented here for the audit record but require no action.


| Lighthouse audit                                                  | Why it is out of scope                                                                                                                                                                                                                                  | Affected pages                               |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Reduce unused JavaScript**                                      | Framer ships a single bundled React + Motion runtime. No tree-shaking, code-splitting, or "disable animations" toggle is exposed to site owners.                                                                                                        | All                                          |
| **Reduce JavaScript execution time**                              | Same — Framer's runtime hydration.                                                                                                                                                                                                                      | All                                          |
| **Minimize main-thread work**                                     | Same — Framer's runtime hydration.                                                                                                                                                                                                                      | All                                          |
| **Reduce unused CSS**                                             | Framer generates the stylesheet from the design; no CSS purge control is exposed.                                                                                                                                                                       | All                                          |
| **Legacy JavaScript** (~28 KiB every page)                        | Browser-target list and polyfill set are fixed by Framer's build pipeline.                                                                                                                                                                              | All                                          |
| **Use efficient cache lifetimes** (~122 KiB every page)           | Framer's Custom Headers feature uses a strict 14-header allow-list — `Cache-Control` is **not** on it. The only workaround is fronting Framer's hosting with a reverse proxy (Vercel, Cloudflare, Netlify), which is outside the current hosting setup. | All                                          |
| **Forced reflow**                                                 | React/runtime hydration; not exposed.                                                                                                                                                                                                                   | All                                          |
| **Network dependency tree**                                       | Framer runtime dependency chain; not exposed.                                                                                                                                                                                                           | All                                          |
| **Font display**                                                  | Framer applies `font-display: swap` by default on standard weights. The remaining savings are negligible and from edge-case font weights Framer intentionally leaves on `block` to avoid jarring fallback shifts.                                       | Selected pages                               |
| **Avoid enormous network payloads**                               | Bulk of the payload is the JS/CSS bundle Framer controls. The user-controllable share (images, embeds, font weights) is addressed in §2.5.2.                                                                                                            | All                                          |
| **Cumulative Layout Shift / Layout shift culprits**               | CLS is driven primarily by Framer's animation and progressive-render pipeline. The user-controllable share (image dimensions on lazy-loaded media) is captured by §2.5.2 / §2.5.3.                                                                      | `/book-a-demo`, `/bank-integrations`, others |
| **Uses deprecated APIs** (1 warning every page)                   | Emitted by Framer's runtime.                                                                                                                                                                                                                            | All                                          |
| **Core Web Vitals: LCP / FCP / TTI / TBT / Speed Index** (mobile) | Driven primarily by the JS bundle size and execution time above. The user-controllable share (LCP image discovery, third-party scripts, oversized images) is addressed in §2.5.2 and §2.5.3.                                                            | All                                          |


**Framer's own guidance** ([Guide to Lighthouse Scores](https://www.framer.com/help/articles/guide-to-lighthouse-scores/), [How to optimize PageSpeed Insights](https://www.framer.com/help/articles/how-to-optimize-pagespeed-insights/)): Lighthouse is a debugging tool, not a ranking factor; mobile PSI simulates a 2016 Motorola phone; real-user Core Web Vitals in Search Console are the metric Google uses for SEO.

---

## 5. Recommended Sequencing

1. **Publish the template-level fixes** already applied in §2.1. This is the single largest accessibility step and unlocks accurate re-measurement of every page.
2. **Apply the four `<main>` landmark fixes** (§2.2.2) and the remaining per-page heading-order fixes flagged in `PER_PAGE_FIX_CHECKLIST_MAXIMA.md`.
3. **Fix the /about LinkedIn anchor** (§2.3.1) — choose between filling in the missing CMS URL (fast) or adding the visibility condition on the Smart Component (durable).
4. **Add `aria-label` to the customer-website outbound links** on the customer-story articles (§2.2.3).
5. **Fix the `<th>` markup** on the Journal Entries article tables (§2.2.4) and the touch-target spacing on the legal-pages template (§2.2.5).
6. **Brand / design team:** schedule the color-contrast review (§3.1) — the highest-leverage accessibility item remaining once §2 is published.
7. **Re-run Lighthouse** on the same 35-page set after each batch goes live, to confirm the audit deltas land as expected.

