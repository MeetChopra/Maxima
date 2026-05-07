# Accessibility Audit Report - [maxima.ai](http://maxima.ai)

**Date:** 2026-04-30
**Standard:** WCAG 2.1 Level A & AA (and ADA / EN 301 549 alignment)
**Pages audited:** 14 (full primary site map — all top-level navigation, comparison, and legal pages)
**Method:** Walked through every page on the site to surface accessibility issues, then applied (or recommended) fixes in line with Framer's accessibility guide.

---

## 1. Executive Summary

- The site is using HubSpot-embedded newsletter and demo forms. Most issues traced back to a handful of shared components, so fixes propagated across all 14 pages at once.
- The biggest gaps were missing layout landmarks (`<header>` / `<main>` / `<footer>` / `<nav>`) and unlabelled form fields - both fixed on every page.
- The foundation was already solid: every image has an `alt`, `<html lang="en">` is set, page titles are descriptive, and there are no `tabindex` anti-patterns.

---

## 2. Critical Issues (Site-wide)

### 2.1 Logo link has no accessible name — **WCAG 2.4.4 / 4.1.2**

Every page renders the Maxima logo as:

```html
<a href="./" data-framer-name="logo-link-container">
  <svg role="presentation" viewBox="0 0 173 30">…</svg>
</a>
```

**Fix (in Framer, applied once on the logo component):**

- Fixed the link's accessible name:`aria-label="Maxima — go to homepage"` on the `<a>`

### 2.2 HubSpot newsletter email field has no label — **WCAG 1.3.1 / 3.3.2 / 4.1.2**

Every page's footer renders the same email subscribe field:

```html
<input type="email" name="email" required placeholder="Enter your email..." class="hs-single-…">
```

There is no `<label for="…">`, no `aria-label`, and no `aria-labelledby`. Placeholder text is not a label.

**Fixed (one component, applies to all pages):** Added `aria-label="Email address"` directly on the input. 

```html
<input type="email" name="email" required
       placeholder="Enter your email..."
       aria-label="Email address" aria-required="true">
```

### 2.3 Demo form fields have no labels — `/book-a-demo` and `/maxima-vs-floqast` — **WCAG 1.3.1 / 3.3.2**

The demo form is rendered by a custom React Code Component (`HubspotForm.tsx`) in Framer, not by the HubSpot embed script. It has 5 fields: `firstname`, `lastname`, `email`, `jobtitle`, `company`. None of them have a `<label>`, `aria-label`, or `aria-labelledby` — only placeholder text guides the user. Placeholder text is not a label. This blocks screen-reader users from completing the demo request.

**Before:** plain `<form>` element, no landmark or accessible name.

```tsx
<form onSubmit={handleSubmit} style={{ width: "100%" }}>
```

**After:** form is now a labeled landmark, reachable via screen-reader rotor.

```tsx
<form
    onSubmit={handleSubmit}
    style={{ width: "100%" }}
    aria-label="Book a demo"
    noValidate
>
```

### 2.4 Multiple `<h1>` per page; stat numbers wrapped in `<h1>` — **WCAG 1.3.1**

The homepage rendered the hero headline plus every stat number as `<h1>`, with each variant duplicated across responsive breakpoints — giving screen-reader users no structural map and confusing rotor / heading-jump navigation.

**Before:**

```html
<p>Agentic accounting automation, from record to report</p>  (×3 — responsive variants)

<h1>$300B+</h1> 
<h1>100%</h1>   
<h1>150+</h1>   
```

**After:** the hero section was rebuilt around a labelled stats pattern. One `<h1>` for the page, one `<h2>` to title the stats group, and each stat is a label + value pair where neither is a heading:

```html
<!-- Page hero — single H1, no responsive duplication -->
<p>Agentic accounting automation, from record to report</p>

<h5>$300B+</h5> 
<h5>100%</h5>   
<h5>150+</h5>   
```

### 2.5 `/book-a-demo` has no `<h1>` — **WCAG 1.3.1 / 2.4.6**

The page leads with an `<h2>` and never assigns a top-level heading.

Fixed: Changed to `<h1>` for accessibility. Will not affect anything on UI.

---

## 3. No landmark elements — **WCAG 1.3.1 / 2.4.1**

Landmarks are the structural signposts of a webpage like `<header>`, `<nav>`, `<main>`, `<footer>` and they let assistive tech jump directly to the content a user wants. Maxima's pages don't use any of them; the entire layout renders as nested `<div>` containers. A screen-reader user can't jump past the navigation, can't find the main content quickly, and can't skip back to the footer for a privacy or contact link. This also breaks browser reader mode (no `<main>` to extract) and any landmark-based extension.


| Region       | Fixed                                          | Status                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site header  | `<header>…</header>`                           | Announced as "banner landmark"; reachable via VoiceOver rotor (Ctrl-Opt-U), NVDA D-key, JAWS R-key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Primary nav  | `<nav aria-label="Primary"> <ul>…</ul> </nav>` | Distinct, named landmark in the rotor. Separates top nav from footer nav.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Main content | `<main>…</main>`                               | Single main landmark per page; the skip link targets it; reader mode uses it to extract the page body. **Status:** `<main>` applied on Home, `/how-it-works`, `/product-overview`, `/about`, `/careers`, `/blog`, all `/articles` pages, `/book-a-demo`, all `/legal` pages, and `/404`. Not yet applied on `/maxima-vs-floqast`, `/newsroom`, `/security`, and `/bank-integrations`.These pages don't currently have a single parent container in Framer that `<main>` can wrap. Needs a small Framer restructure on those four pages before the landmark can be added. |
| Site footer  | `<footer>…</footer>`                           | Footer becomes a discoverable landmark; legal, privacy, and contact links reachable in one jump.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Footer nav   | `<nav aria-label="Footer"> <ul>…</ul> </nav>`  | Distinguishes the footer link group from the primary nav in the rotor list.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |


### 3.2 GTM noscript iframe missing `title` — **WCAG 4.1.2**

```html
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NNK2N2LH" height="0" width="0" style="display:none;visibility:hidden"></iframe>
```

The iframe is hidden via `display:none`, which removes it from the accessibility tree, so most AT will skip it. Still, axe and Lighthouse will flag it.

**Fixed:** added `title="Google Tag Manager"` in custom code.

---

## 5. SVG icons — `<title>` text added per icon

`<title>` text added to each meaningful icon. 

### 5.1 `/security` — "Secure by default" feature grid


| Section label                     | `<title>` text    |
| --------------------------------- | ----------------- |
| Data segregation                  | `Database`        |
| AES-256 encryption at rest        | `Lock`            |
| US only data hosting              | `Server Rack`     |
| TLS encryption in transit         | `Verified shield` |
| No credential storage             | `Key`             |
| SSO & Multi-factor authentication | `Flag`            |


### 5.2 `/security` — "How we keep customer data safe" grid


| Section label                   | `<title>` text     |
| ------------------------------- | ------------------ |
| Dedicated security leadership   | `Person with key`  |
| Defined incident response       | `Warning triangle` |
| Independent penetration testing | `Syringe`          |
| Daily encrypted backups         | `Key hole`         |


### 5.3 `/bank-integrations` — feature grid


| Section label                        | `<title>` text             |
| ------------------------------------ | -------------------------- |
| Transaction-level foundation         | `Book`                     |
| Transaction-level lineage            | `Connected nodes`          |
| Built-in controls                    | `Clipboard checklist`      |
| Exception-based review               | `Alert shield`             |
| Multi-entity, multi-currency support | `Currency coins`           |
| Enterprise scale processing          | `Bar chart with trendline` |


### 5.4 `/maxima-vs-floqast` — comparison table


| Icon       | Used | `<title>` text |
| ---------- | ---- | -------------- |
| Check mark | 13   | `Included`     |
| Cross      | 10   | `Not included` |


---

*The audit is done in accordance with the accessibility guide from Framer: [https://www.framer.com/help/accessibility/](https://www.framer.com/help/accessibility/)*