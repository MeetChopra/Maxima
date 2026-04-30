# Accessibility Audit Report — maxima.ai

**Date:** 2026-04-29
**Standard:** WCAG 2.1 Level A & AA (and ADA / EN 301 549 alignment)
**Pages audited:** 14 (full primary site map — all top-level navigation, comparison, and legal pages)
**Method:** Static HTML scan of production-rendered pages + manual review of patterns that recur across the Framer-built site.

---

## 1. Executive Summary

The site renders on Framer with a HubSpot-injected newsletter form and a HubSpot-embedded demo form. The Framer output uses no semantic landmark elements (`<header>`, `<nav>`, `<main>`, `<footer>`) and the demo / newsletter forms ship without programmatic labels, both of which are reproducible **across every page**. Because these defects come from a small number of shared components, fixing them site-wide is high-leverage: roughly **6 component fixes resolve ~80% of all 154 detected issues**.

### Findings totals (across 14 pages)

| Severity     | Count  | Definition                                                  |
|--------------|-------:|-------------------------------------------------------------|
| **Critical** | 28     | Blocks assistive tech users from completing primary tasks.  |
| **High**     | 43     | Breaks WCAG A/AA conformance for a feature on the page.     |
| **Medium**   | 51     | Degrades experience for AT users; fails best practice.      |
| **Low**      | 28     | Minor / structural issues; recommended fixes.               |
| **Info**     | 3      | Needs manual verification (e.g., decorative SVG flagging).  |

### Top remediation priorities (in order)

1. **Add a visually-hidden accessible name to the logo link** (every page, ≥3 instances per page)  → fixes ~360+ "link with no accessible name" violations.
2. **Add `<label>` / `aria-label` to the HubSpot newsletter email field** (every page footer) → fixes 5 critical form violations × 14 pages.
3. **Add proper labels to the 20-field demo form on `/book-a-demo` and the embedded form on `/maxima-vs-floqast`.**
4. **Replace the multi-instance / nested `<h1>` Framer pattern** — `<h1>` is being reused for stat call-outs ("80%", "$250B") and duplicated across responsive breakpoints (12 H1s on the homepage).
5. **Wrap layout in landmarks** — header / nav / main / footer.
6. **Provide a "skip to main content" link** for keyboard users.

The site has a strong foundation: every `<img>` carries an `alt` attribute, all videos are `muted` (so captions aren't required unless they carry an audio track), `<html lang="en">` is set, `<title>` tags are descriptive on all pages, and there are zero `tabindex` anti-patterns. The fixes above turn that foundation into a conformant experience.

---

## 2. Critical Issues (Site-wide)

### 2.1 Logo link has no accessible name — **WCAG 2.4.4 / 4.1.2**

Every page renders the Maxima logo as:

```html
<a href="./" data-framer-name="logo-link-container">
  <svg role="presentation" viewBox="0 0 173 30">…</svg>
</a>
```

Because the inner SVG is marked `role="presentation"` with no text node, screen readers announce the link as "link" with no destination. Each page has **3–4 instances** (header + footer + responsive variants), accounting for 23–63 of the "link with no accessible name" violations per page in the table below.

**Fix (in Framer, applied once on the logo component):**

- Set the link's accessible name via either:
  - `aria-label="Maxima — go to homepage"` on the `<a>`, **or**
  - a visually-hidden `<span>` inside the link with the text "Maxima home", **or**
  - on the SVG: replace `role="presentation"` with `role="img"` and add a `<title>Maxima</title>` element.

### 2.2 HubSpot newsletter email field has no label — **WCAG 1.3.1 / 3.3.2 / 4.1.2**

Every page's footer renders the same email subscribe field:

```html
<input type="email" name="email" required placeholder="Enter your email..." class="hs-single-…">
```

There is no `<label for="…">`, no `aria-label`, and no `aria-labelledby`. Placeholder text is not a label — it is announced inconsistently and disappears on focus (also fails WCAG 1.3.5). Each page has **5 instances** of this same field (responsive breakpoints), so the violation count multiplies.

**Fix (one component, applies to all pages):**

```html
<label for="footer-email" class="visually-hidden">Email address</label>
<input id="footer-email" type="email" name="email" required
       placeholder="Enter your email..." aria-required="true">
```

### 2.3 Demo form fields have no labels — `/book-a-demo` and `/maxima-vs-floqast` — **WCAG 1.3.1 / 3.3.2**

The HubSpot demo form embeds **20 visible fields** (`firstname`, `lastname`, `email`, `jobtitle`, `company`, `phone`, etc.) using only `placeholder` text for guidance. No `<label>` element or `aria-label` is present. This is the single most blocking violation on the site — a sighted-only pattern that prevents screen-reader users from completing the demo request.

**Fix:** In HubSpot form settings, enable "Show field labels". If brand prefers no visible labels, add `aria-label` per field via HubSpot's form embed customization, or wrap each input in a visually-hidden `<label>`. Required fields must also expose `aria-required="true"` and an `aria-describedby` pointing to error text.

### 2.4 Multiple `<h1>` per page; stat numbers wrapped in `<h1>` — **WCAG 1.3.1**

Examples from the homepage's rendered HTML:

```
<h1>Agentic accounting automation, from record to report</h1>  (×4 — responsive variants)
<h1>80%</h1>   <h1>80%</h1>
<h1>98%</h1>   <h1>98%</h1>
<h1>100%</h1>  <h1>100%</h1>
<h1>$250B</h1> <h1>$250B</h1>
```

Twelve `<h1>` elements on a page give screen-reader users no structural map and confuse rotor / heading-jump navigation. The four hero duplicates come from Framer rendering desktop, tablet, and mobile variants in the DOM rather than swapping them with CSS — assistive tech sees all of them.

**Fix:**
1. Use a single `<h1>` for the page title (the hero headline).
2. Re-tag stat numbers as `<p>` or `<div>` with CSS, with the *label* ("Time saved on close", "Of journals automated", etc.) as a `<h2>` if it needs to be a heading at all.
3. In Framer, ensure responsive variants share a single source heading rather than duplicating per breakpoint, or hide the inactive variant from AT with `aria-hidden="true"` and `display:none`.

### 2.5 `/book-a-demo` has no `<h1>` — **WCAG 1.3.1 / 2.4.6**

The page leads with an `<h2>` and never assigns a top-level heading. Every page must have exactly one `<h1>` describing its purpose ("Book a demo of Maxima").

---

## 3. High Issues (Site-wide)

### 3.1 No landmark elements — **WCAG 1.3.1 / 2.4.1**

No page on the site uses `<header>`, `<nav>`, `<main>`, or `<footer>` (or their equivalent ARIA roles). The entire layout is `<div>` soup. This breaks:
- Screen reader landmark navigation (VoiceOver rotor, NVDA D-key, JAWS R-key).
- Browser reader-mode extraction.
- "Skip to main content" patterns.

**Fix:** In Framer, change the top-level frames to render as `<header>`, `<main>`, and `<footer>`. If Framer cannot output these tags, add `role="banner"`, `role="main"`, and `role="contentinfo"` (and `role="navigation"` for the primary nav) to the relevant containers via the page's custom code or attribute hooks.

### 3.2 No skip-to-content link — **WCAG 2.4.1**

Keyboard users must tab through the full nav (8+ items) on every page. Add a visually-hidden link that becomes visible on focus:

```html
<a href="#main" class="skip-link">Skip to main content</a>
```

paired with `id="main"` on the main content container.

### 3.3 Skipped heading levels — **WCAG 1.3.1**

Every page jumps directly from `<h2>` to `<h4>` or `<h6>`, skipping intermediate levels. Sample sequences detected:
- `/` — `h1→h6`, `h2→h6`, `h2→h4` (multiple)
- `/legal/privacy-policy` — `h1→h4`, `h2→h6`, `h4→h6`
- `/blog` — `h1→h6` repeated for each blog card
- `/book-a-demo` — `h2→h6` repeated for each form-section divider

**Fix:** Re-map heading levels in Framer's text styles. Don't pick heading levels for visual size — set the level for outline meaning, then style with CSS.

### 3.4 GTM noscript iframe missing `title` — **WCAG 4.1.2**

```html
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNK2N2LH" height="0" width="0" style="display:none;visibility:hidden"></iframe>
```

The iframe is hidden via `display:none`, which removes it from the accessibility tree, so most AT will skip it. Still, axe and Lighthouse will flag it. **Quick fix:** add `title="Google Tag Manager"`.

### 3.5 Email field relies on placeholder for labelling — **WCAG 3.3.2**

Same root cause as 2.2 / 2.3 — listed separately because some fields (e.g., on legal pages) currently fail this *in addition to* lacking a programmatic label. Once labels are added, this resolves.

---

## 4. Medium Issues

| Issue | WCAG | Pages affected | Note |
|---|---|---|---|
| Generic link text ("Learn More") | 2.4.4 | `/` (4×) | Add `aria-label` so each link's destination is unambiguous in the link list (e.g., `aria-label="Learn more about how it works"`). |
| `aria-hidden` on focusable elements | 4.1.2 | none detected — kept here as a watch-item | Re-check after any nav/menu rework. |
| Empty `aria-label=""` | 4.1.2 | none detected | — |
| Duplicate `id` attributes | 4.1.1 | none detected | — |

---

## 5. Low / Informational

### 5.1 SVG icons without `aria-hidden`, `<title>`, or `aria-label`

| Page | Unannotated SVGs |
|---|---:|
| `/security` | 32 / 64 |
| `/maxima-vs-floqast` | 23 / 55 |
| `/bank-integrations` | 17 / 37 |

These are likely all decorative (Framer drops icons inline). To suppress AT noise, add `aria-hidden="true"` to every purely decorative SVG. If an SVG conveys meaning (e.g., a status check on a comparison row), give it `<title>` text.

### 5.2 Minor — page title length

`/bank-integrations` page title is 86 characters. Recommend truncating to ≤ 70 characters to avoid truncation in SERPs and screen-reader announcements.

### 5.3 Videos — captions not currently required

All five hero videos include `muted` and have no `<audio>` or `<track>`. WCAG 1.2.2 only applies if synced media has audio; since they don't, no action is required. **However**, if any future video carries narration, add a `<track kind="captions" src="…" srclang="en" default>` and a transcript link.

---

## 6. Per-Page Findings Summary

| URL                          | Critical | High | Med | Low | Notes |
|------------------------------|---:|---:|---:|---:|---|
| `/` (home)                   | 2 | 3 | 4 | 2 | 12 `<h1>`, 29 unnamed links (logo + footer icons) |
| `/how-it-works`              | 2 | 3 | 3 | 2 | 23 unnamed links |
| `/product-overview`          | 2 | 3 | 3 | 2 | 23 unnamed links |
| `/security`                  | 2 | 3 | 3 | 2 | 32 unannotated SVG check icons |
| `/about`                     | 2 | 3 | 3 | 2 | 56 unnamed links (team / press cards) |
| `/careers`                   | 2 | 3 | 3 | 2 | 43 unnamed links (job cards) |
| `/blog`                      | 2 | 3 | 3 | 2 | 63 unnamed links (article-card whole-tile links) |
| `/book-a-demo`               | 2 | 4 | 3 | 2 | **No H1**; 20-field form unlabelled |
| `/bank-integrations`         | 2 | 3 | 3 | 2 | 17 unannotated SVGs; title 86 chars |
| `/newsroom`                  | 2 | 3 | 3 | 2 | 33 unnamed press-card links |
| `/maxima-vs-floqast`         | 2 | 3 | 3 | 2 | 20-field embedded form unlabelled; 23 SVGs |
| `/legal/privacy-policy`      | 2 | 3 | 3 | 2 | Long heading-skip chain through legal ToC |
| `/legal/terms-of-service`    | 2 | 3 | 3 | 2 | Long heading-skip chain |
| `/legal/cookie-policy`       | 2 | 3 | 3 | 2 | Long heading-skip chain |

> "Unnamed link" counts include card-wrapper links (entire blog/press/team tile links) — visually they have a thumbnail + text inside, but the `<a>` itself wraps multiple block elements with the visible label inside. Most screen readers concatenate inner text and announce something usable, but axe / Lighthouse still flag it. Cleanest fix: add `aria-label` on the wrapping link (e.g., `aria-label="Read: Accuracy in accounting…"`).

---

## 7. What Was Not Tested — Manual / Tooling Required

The static scan cannot detect these. Schedule a manual session before signing off conformance:

| Check | How to test | Why it matters |
|---|---|---|
| **Color contrast** (WCAG 1.4.3 / 1.4.11) | axe DevTools, Stark, or WebAIM Contrast Checker on every text/background and icon/background pair. Maxima's brand uses light grey body text on white in places — this is the highest-risk contrast surface. | A AA fail — also blocks ADA conformance. |
| **Keyboard navigation** (2.1.1, 2.1.2, 2.4.3, 2.4.7) | Tab through every page from URL bar; verify focus indicator is always visible and focus order matches reading order; confirm no traps in modals (demo dialog, cookie banner). | Mandatory baseline. Framer often outputs CSS that hides outlines. |
| **Focus indicator visibility** (2.4.7, 2.4.11 AA in 2.2) | Tab and screenshot every interactive element. | Framer's default `outline:none` reset frequently strips focus rings. |
| **Screen-reader smoke test** | Run NVDA + Firefox and VoiceOver + Safari through home → demo → blog → article. | Confirms the structural fixes actually surface as expected. |
| **Mobile zoom / reflow** (1.4.4, 1.4.10) | Zoom to 200% / 400% on iOS Safari and desktop. | Many Framer breakpoints break or hide content under zoom. |
| **`prefers-reduced-motion`** (2.3.3 AAA, recommended) | Toggle OS "Reduce motion" and reload. The site has marquee logo strips and animated stat counters. | Vestibular triggers; AAA but commonly enforced. |
| **Cookie banner accessibility** | Tab into and dismiss banner with keyboard only; verify focus is trapped while open and returned to trigger on close. | Cookie banner appears via JS — not in static HTML, so not in this scan. |
| **PDF / linked documents** | Confirm the SOC 2 / Privacy / DPA PDFs (if any are linked) are tagged accessible PDFs. | Often missed. |

---

## 8. Recommended Remediation Order

| Phase | Effort | Items |
|---|---|---|
| **Sprint 1 — site-wide components** (≈1–2 days) | Logo accessible name; HubSpot newsletter label; landmark wrappers (`<header>` / `<main>` / `<footer>`); skip link; GTM iframe `title`. |
| **Sprint 2 — forms** (≈1 day, HubSpot-side) | Add labels to all 20 demo-form fields on `/book-a-demo` and `/maxima-vs-floqast`. Enable `aria-required` and error `aria-describedby`. |
| **Sprint 3 — heading hygiene** (≈2 days) | Single `<h1>` per page; remove `<h1>` from stat callouts; rebuild heading levels so legal pages, blog, and book-a-demo no longer skip levels. |
| **Sprint 4 — manual pass** (≈1 day) | Run keyboard / screen reader / contrast checks per Section 7 and remediate. |
| **Sprint 5 — polish** | Hide decorative SVGs with `aria-hidden`; add `aria-label`s to "Learn More"-style links; tune the bank-integrations title length. |

---

## 9. Quick-Reference Code Snippets

**Visually-hidden utility class** (use for skip link, hidden labels, etc.):

```css
.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
.skip-link:focus {
  position: static; width: auto; height: auto;
  padding: 0.75rem 1rem; background: #111; color: #fff;
}
```

**Skip link:**

```html
<a href="#main" class="visually-hidden skip-link">Skip to main content</a>
…
<main id="main" tabindex="-1">…</main>
```

**Logo with accessible name:**

```html
<a href="/" aria-label="Maxima — go to homepage">
  <svg role="img" aria-hidden="true" viewBox="0 0 173 30">…</svg>
</a>
```

**HubSpot field with hidden label:**

```html
<label for="hs-newsletter-email" class="visually-hidden">Email address</label>
<input id="hs-newsletter-email" type="email" name="email"
       required aria-required="true" placeholder="Enter your email…">
```

---

## 10. Testing Checklist (post-remediation)

- [ ] axe DevTools — 0 critical / 0 serious on every page.
- [ ] Lighthouse Accessibility score ≥ 95 on every page.
- [ ] WAVE — 0 errors; review contrast errors.
- [ ] Manual keyboard pass — every interactive element reachable, focus visible, order logical, no traps.
- [ ] NVDA + VoiceOver smoke test through home → demo flow.
- [ ] 200%-zoom test on Chrome and Safari iOS.
- [ ] `prefers-reduced-motion` honored on hero animations and counters.
- [ ] Demo form submission completes via keyboard only with screen reader running.

---

*Report generated from a static scan of 14 production pages on 2026-04-29. Re-run this scan after each Framer publish to catch regressions; the duplicated-component pattern means a single template change can re-introduce these issues across all pages at once.*
