# Lighthouse Remediation Plan

**Date:** 2026-05-07  
**Pages covered:** 35

---

## 1. Summary


| Score          | Mobile (avg) | Desktop (avg) |
| -------------- | ------------ | ------------- |
| Performance    | 51           | 67            |
| Accessibility  | 91           | 93            |
| Best Practices | 75           | 76            |
| SEO            | 99           | 98            |


- **SEO is in great shape** (99 mobile / 98 desktop). Almost every page scores 100. Two outliers drag the average — `/articles/reuters-exclusive-maxima` (SEO 82, see §2.2.4) and `/articles/kleiner-perkins-investment-perspective` (SEO 92). Closing those two will push the site to a flat 100.
- **Accessibility has the highest ROI for hands-on remediation.** Every accessibility issue surfaced is fixable inside Framer's editor, except color contrast which depends on a brand-color decision (§4.1).
- **Performance and Best Practices scores are largely Framer-platform-controlled.** Framer's [official guidance](https://www.framer.com/help/articles/guide-to-lighthouse-scores/) explicitly states that Lighthouse is a debugging tool, not a Google ranking factor, and asks users not to chase a perfect mobile PageSpeed score. Real-user Core Web Vitals from Search Console are the metric that matters for SEO.
- **The ARIA regression pattern extends to four pages, not one.** Maxima vs FloQast, Security, Bank Integrations, and the EY Alumni article all show the "prohibited ARIA" or "label / accessible-name mismatch" pattern that surfaced after the recent ARIA pass. These should be remediated together.
- **Worst-scoring pages worth a focused look:**
  - `/articles/ey-alumni-spotlight-maxima-ceo-yogi-goel` — Performance 26 / 35 (mobile / desktop), the lowest on the site.
  - `/book-a-demo` — Performance 33 mobile. This is the conversion page; LCP and layout shift issues here have direct revenue impact.
  - `/security` and `/bank-integrations` — Accessibility 85 mobile (lowest on the site), each with three ARIA-family issues plus a missing `<main>` landmark.

---

## 2. Fixable in Framer

### 2.1 Accessibility

#### 2.1.1 Heading order is not sequentially descending — **WCAG 1.2.1 / 2.4.6**

**Affected:** 32 of 33 pages (mobile), 20 of 21 (desktop) — effectively every page

Lighthouse reports heading levels skipping (e.g. `<h2>` followed directly by `<h4>`). This breaks screen-reader navigation and document outline.

**Remediation in Framer:**

- Select the text layer → **Properties → Accessibility → Tag** dropdown → choose the correct heading level (h1, h2, h3, h4, h5, h6, p).
- For text inside CMS rich-text fields, use the H1 / H2 / H3 buttons in the formatting toolbar.
- Each page should have exactly one `<h1>`, then descend without skipping.
- Because this hits virtually every page, audit the Framer **text styles** first — if a style is set to `<h4>` but visually positioned as a sub-heading after an `<h2>`, fixing the style propagates the fix everywhere it is reused.

#### 2.1.2 Links without a discernible accessible name — **WCAG 2.4.4 / 4.1.2**

**Affected:** 30 of 33 pages (mobile)

Continuation of the logo-link issue already fixed in `ACCESSIBILITY_AUDIT_REPORT_MAXIMA.md`. Remaining offenders are typically icon-only links (social icons, navigation arrows, expand toggles, "X" close buttons) and most likely sit in shared header/footer components, so a single component-level fix will propagate site-wide.

**Remediation in Framer:**

- Select the link/button → **Properties → Accessibility** section → set `aria-label` to a concise description of the destination or action (e.g. `aria-label="Maxima on LinkedIn"`).
- Where the icon already sits next to a visible text label, the visible text becomes the accessible name automatically — no aria-label needed.
- Audit the shared header/footer/CTA components first (they account for most of the 30-page spread).

#### 2.1.3 Document does not have a `<main>` landmark — **WCAG 1.2.1 / 2.4.1**

**Affected:** `/maxima-vs-floqast`, `/newsroom`, `/security`, `/bank-integrations`, `/articles/reuters-exclusive-maxima` (5 pages)

These five pages slipped through the site-wide landmark fix from the prior accessibility pass. Newsroom is a CMS collection page, so the layout template needs the landmark applied separately. The remaining four are stand-alone pages that need the landmark added directly.

**Remediation in Framer:**

- Open each page → select the top-level content frame (the wrapper that holds the page body, between header and footer) → **Properties → Accessibility → Tag → Main**.
- Only one `<main>` per page; it must sit as a child of the document body.

#### 2.1.4 Visible text label does not match accessible name — **WCAG 2.5.3**

**Affected:** `/maxima-vs-floqast`, `/articles/ey-alumni-spotlight-maxima-ceo-yogi-goel`

Triggered when an `aria-label` value differs from the visible button or link text. Screen-reader users hear one thing while sighted users see another, and voice-control users cannot activate the element by speaking its visible label.

**Remediation in Framer:**

- For each page → identify each `aria-label` added in the recent ARIA pass → either remove the `aria-label` (so the visible text becomes the accessible name) or rewrite it so the visible text appears at the start of the label (e.g. visible text "Book a demo" → label "Book a demo with Maxima").

#### 2.1.5 Elements use prohibited ARIA attributes — **WCAG 4.1.2**

**Affected:** `/maxima-vs-floqast`, `/security`, `/bank-integrations`

Some ARIA attributes were added on element roles that do not accept them (for example, `aria-label` on a non-interactive container without a role, or `aria-expanded` on a non-disclosure element). The pattern is consistent across all three pages, suggesting a shared component (likely a CTA card or pricing-row component) is the source.

**Remediation in Framer:**

- Audit each element changed during the ARIA pass on these three pages → in **Properties → Accessibility / Attributes**, remove ARIA attributes from elements where they are not valid, or set the element's role first if the ARIA attribute is intentional.
- If the offending element is a Smart Component instance, fix it once at the component level so the fix propagates.

#### 2.1.6 `<td>` cells in a large table do not have headers — **WCAG 1.2.1**

**Affected:** Journal Entries article (`/articles/the-definitive-guide-to-journal-entries-in-accounting`)

Screen readers cannot associate data cells with column or row headers without `<th>` elements.

**Remediation in Framer:**

- Open the article CMS entry → locate the table inside the Rich Text field → right-click the cells in the first row (and first column if applicable) → **"Set as header"**.
- This option is only available on tables created inside a CMS Rich Text field. If the table was hand-built as stacked frames on the canvas, rebuild it inside a Rich Text field to gain semantic table markup.

#### 2.1.7 List items not contained within `<ul>` / `<ol>` / `<menu>` — **WCAG 1.2.1**

**Affected:** Homepage (`/`), `/book-a-demo`

Loose `<li>` elements appear without a list parent, breaking screen-reader list announcements ("list, 5 items"). Both pages likely have the same root cause — a hand-built canvas list rather than a CMS rich-text list.

**Remediation in Framer:**

- The Framer canvas does not expose `ul` / `ol` / `li` in the Tag dropdown for hand-built frames.
- Locate the visually list-styled content on each page → rebuild the affected block inside a CMS Rich Text field (or a code component) using the bulleted/numbered list controls so Framer emits proper `<ul><li>` markup.

#### 2.1.8 Touch targets do not have sufficient size or spacing — **WCAG 2.5.8 (AA, WCAG 2.2)**

**Affected:** `/legal/terms-of-service`, `/legal/cookie-policy`, `/articles/kleiner-perkins-investment-perspective`

Inline links inside dense text fall below the 24×24 CSS-pixel minimum spacing requirement.

**Remediation in Framer:**

- Increase line-height on body text in the legal pages and the affected article so adjacent inline links have at least 24 px of vertical separation, or
- Add padding around inline link styles in the page's text style.
- The two legal pages share a template, so a single text-style update closes both.

---

### 2.2 SEO

#### 2.2.1 Links are not crawlable

**Affected:** `/about`, `/articles/ey-alumni-spotlight-maxima-ceo-yogi-goel`

Lighthouse flagged anchors whose `href` is missing or non-navigable (typically caused by driving navigation through a Framer interaction or effect rather than the Link field).

**Remediation in Framer:**

- Open each page → locate the affected element(s) → in the right-side **properties panel → Link** field, set a real URL or page reference.
- Avoid using Interactions → Navigate as the only navigation mechanism — Interactions trigger on click but the underlying element is not rendered as `<a href>` for crawlers.

#### 2.2.2 Links do not have descriptive text

**Affected:** Homepage (`/`)

Generic anchor text such as "click here", "learn more", or icon-only arrows reduces SEO value and screen-reader usability.

**Remediation in Framer:**

- Identify the flagged anchors on the homepage → rewrite the visible text to describe the destination (e.g. "Read the Scale AI case study" instead of "Read more").

#### 2.2.3 Document does not have a meta description

**Affected:** `/articles/kleiner-perkins-investment-perspective`, `/articles/reuters-exclusive-maxima`

Both articles are missing a `<meta name="description">` tag. Search engines fall back to auto-generated snippets, which usually rank worse and convert worse.

**Remediation in Framer:**

- Open each article's CMS entry → **SEO** section in the right-side panel → fill in the **Description** field (target ~150–160 characters, lead with the article's primary value proposition).

#### 2.2.4 Reuters article — multiple critical SEO issues

**Affected:** `/articles/reuters-exclusive-maxima` (SEO score 82 — the lowest on the site)

This page surfaces three problems that together drag its score down materially:

1. **"Page lacks the HTML doctype, thus triggering quirks-mode"** — the page is being rendered without `<!DOCTYPE html>`, putting browsers into quirks mode. This is unusual for a Framer page and likely indicates the page is configured as a redirect target, an iframe wrapper, or a custom-code page rather than a normal Framer page.
2. **"Page has unsuccessful HTTP status code"** — the page is returning a non-2xx response (likely a 3xx or 4xx). Search engines may de-index it.
3. **"Document does not have a meta description"** (also called out in §2.2.3).

---

### 2.3 Best Practices

#### 2.3.1 Uses third-party cookies

**Affected:** `/articles/spoton-mastering-high-volume-cash-complexity-with-maxima`, `/articles/scale-ai-staying-ahead-of-the-gl-curve-with-maxima`, `/articles/how-rewst-automated-revenue-recognition-and-prepaids-with-maxima`, `/articles/why-blackline-s-former-cmo-is-investing-in-maxima` (5 cookies each)

Cookies originate from third-party scripts loaded via Framer's Custom Code slots — most likely HubSpot (forms), an analytics tag, or a chat widget. The fact that all four affected pages are case studies / investment articles suggests there is a "case study" template-level script that the editorial articles do not load.

#### 2.3.2 Browser console errors and DevTools issues

**Affected:** Every page

**Remediation in Framer:**

- Open each page in Chrome → DevTools → Console → record each error.
- Errors originating from `framer.com` runtime files are platform-controlled and out of scope.
- Errors originating from HubSpot, custom code components, or other user-added scripts should be triaged and fixed (or the scripts removed if no longer needed).

#### 2.3.3 Improve image delivery

**Affected:** 24 of 33 pages (mobile), 15 of 21 (desktop)

Framer auto-converts images to WebP, generates responsive `srcset`, and lazy-loads below-the-fold images by default - but it skips this optimization when images are buried inside CMS rich text, code components, or variable-driven Smart Components.

**Remediation in Framer:**

- For each flagged page, confirm the hero/large images are placed as **top-level Image elements** on the canvas, not nested inside a Smart Component slot, code component, or rich-text body.
- For source images, upload at sensible dimensions — anything larger than ~2× the maximum displayed width is wasted bytes regardless of Framer's compression.
- Confirm `alt` text is set on every image (already covered in the prior accessibility pass).

#### 2.3.4 LCP image is lazy-loaded

**Affected:** 14 pages — `/about`, `/book-a-demo`, `/how-it-works`, `/bank-integrations`, `/security`, `/careers`, `/blog`, `/newsroom`, `/maxima-vs-floqast`, `/product-overview`, plus 4 articles (`/ey-alumni-spotlight`, `/kleiner-perkins`, `/maxima-named-to-ai64`, `/maxima-seed-series-a`)

This is now visible as a **site-wide pattern**, not isolated cases. Framer does not expose a first-class "Loading: Eager" or `fetchpriority="high"` toggle in the editor, but its internal heuristic does mark top-level above-the-fold Image elements as eager. The fact that 14 different pages all fail this check suggests a shared layout pattern is putting hero images one wrapper too deep.

**Remediation in Framer:**

- For each affected page, confirm the LCP image (typically the hero) is placed as a **top-level Image element directly on the canvas** — not inside a Smart Component, not inside a code component, not inside a CMS rich-text field, not inside a variable-driven container.
- If the hero is a CMS-driven image on a collection template (Newsroom, Blog, articles), confirm the binding is on a top-level Image element rather than a nested wrapper.
- If a single hero component is reused across these pages, fixing it once at the component level closes most of the 14-page spread.

---

## 3. Requires Brand / Design Approval

### 3.1 Background and foreground colors do not have a sufficient contrast ratio — **WCAG 1.4.3 (AA)**

**Affected:** 31 of 33 pages (mobile), 19 of 21 (desktop) — effectively every page

Multiple text/background combinations fall below the 4.5:1 contrast ratio required for normal text (3:1 for large text, 18 pt+ or 14 pt bold+).

This is not a Framer platform limitation — colors are fully editable in the design — but the affected colors are part of Maxima's brand palette and existing design system. Changing them unilaterally would break visual consistency across the site, marketing assets, and product UI.

**Recommended next step (for Maxima brand/design team):**

1. Run Framer's marketplace **Contrast Checker** plugin against each page to enumerate every offending text/background pair.
2. For each pair, decide on a brand-approved adjustment — typically darkening light-grey body text on white backgrounds, or selecting a higher-contrast variant of the brand accent color for buttons/links.
3. Update the design system / Framer color tokens once, and let the change propagate site-wide.

This is the highest-leverage accessibility lift remaining on the site, but it must be owned by the brand team rather than executed inside the consulting scope.

---

## 4. Platform-Controlled (Framer)

The following items are caused by Framer's build pipeline, runtime, or hosting layer and **cannot be remediated from the Framer editor**. They should be acknowledged in the audit record but not actioned.


| Lighthouse audit                                                  | Why it is out of scope                                                                                                                                                                                                                                  | Affected pages                                                                     |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| **Reduce unused JavaScript**                                      | Framer ships a single bundled React + Motion runtime. No tree-shaking, code-splitting, or "disable animations" toggle is exposed to site owners.                                                                                                        | All                                                                                |
| **Reduce JavaScript execution time**                              | Same — Framer's runtime hydration.                                                                                                                                                                                                                      | All                                                                                |
| **Minimize main-thread work**                                     | Same — Framer's runtime hydration.                                                                                                                                                                                                                      | All                                                                                |
| **Reduce unused CSS**                                             | Framer generates the stylesheet from the design; no CSS purge control is exposed.                                                                                                                                                                       | All                                                                                |
| **Legacy JavaScript** (~28 KiB every page)                        | Browser-target list and polyfill set are fixed by Framer's build pipeline.                                                                                                                                                                              | All                                                                                |
| **Use efficient cache lifetimes** (~122 KiB every page)           | Framer's Custom Headers feature uses a strict 14-header allow-list — `Cache-Control` is **not** on it. The only workaround is fronting Framer's hosting with a reverse proxy (Vercel, Cloudflare, Netlify), which is outside the current hosting setup. | All                                                                                |
| **Forced reflow**                                                 | React/runtime hydration; not exposed.                                                                                                                                                                                                                   | All                                                                                |
| **Network dependency tree**                                       | Framer runtime dependency chain; not exposed.                                                                                                                                                                                                           | All                                                                                |
| **Font display**                                                  | Framer applies `font-display: swap` by default on standard weights. The remaining savings are negligible and from edge-case font weights Framer intentionally leaves on `block` to avoid jarring fallback shifts.                                       | Selected pages                                                                     |
| **Avoid enormous network payloads**                               | Bulk of the payload is the JS/CSS bundle Framer controls. The user-controllable share (images, embeds, font weights) is addressed in §3.3.3.                                                                                                            | All                                                                                |
| **Cumulative Layout Shift / Layout shift culprits**               | CLS is driven primarily by Framer's animation and progressive-render pipeline. The user-controllable share (image dimensions on lazy-loaded media) is captured by §3.3.3 / §3.3.4.                                                                      | `/book-a-demo`, `/bank-integrations`, `/articles/reuters-exclusive-maxima`, others |
| **Uses deprecated APIs** (1 warning every page)                   | Emitted by Framer's runtime.                                                                                                                                                                                                                            | All                                                                                |
| **Core Web Vitals: LCP / FCP / TTI / TBT / Speed Index** (mobile) | Driven primarily by the JS bundle size and execution time above. The user-controllable share (LCP image discovery, third-party scripts, oversized images) is addressed in §3.3.3 and §3.3.4.                                                            | All                                                                                |


**Framer's own guidance** ([Guide to Lighthouse Scores](https://www.framer.com/help/articles/guide-to-lighthouse-scores/), [How to optimize PageSpeed Insights](https://www.framer.com/help/articles/how-to-optimize-pagespeed-insights/)): Lighthouse is a debugging tool, not a ranking factor; mobile PSI simulates a 2016 Motorola phone; real-user Core Web Vitals in Search Console are the metric Google uses for SEO.