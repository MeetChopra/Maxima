#!/usr/bin/env node
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const URLS = [
  "https://www.maxima.ai/bank-integrations",
  "https://www.maxima.ai/blog",
  "https://www.maxima.ai/book-a-demo",
  "https://www.maxima.ai/careers",
  "https://www.maxima.ai/how-it-works",
  "https://www.maxima.ai/security",
  "https://www.maxima.ai/legal",
  "https://www.maxima.ai/legal/cookie-policy",
  "https://www.maxima.ai/legal/privacy-policy",
  "https://www.maxima.ai/articles/accuracy-in-accounting-why-ai-needs-more-than-intelligence",
  "https://www.maxima.ai/articles/ai-tools-for-accounting",
  "https://www.maxima.ai/articles/best-bank-reconciliation-software-in-2026",
  "https://www.maxima.ai/articles/ey-alumni-spotlight-maxima-ceo-yogi-goel",
  "https://www.maxima.ai/articles/gorgias-on-the-forefront-of-accounting-automation-with-maxima",
  "https://www.maxima.ai/articles/how-rewst-automated-revenue-recognition-and-prepaids-with-maxima",
  "https://www.maxima.ai/articles/how-rippling-built-sox-ready-cash-accounting-with-maxima",
  "https://www.maxima.ai/articles/kleiner-perkins-investment-perspective",
  "https://www.maxima.ai/articles/maxima-named-to-ai64-s-top-enterprise-ai-companies",
  "https://www.maxima.ai/articles/maxima-seed-series-a-agentic-ai-accounting",
  "https://www.maxima.ai/articles/product-success-one-team",
  "https://www.maxima.ai/articles/reuters-exclusive-maxima",
  "https://www.maxima.ai/articles/the-office-of-the-cfo-in-2030-how-ai-agents-change-the-equation",
  "https://www.maxima.ai/articles/what-is-variance-analysis-a-complete-guide",
  "https://www.maxima.ai/articles/why-blackline-s-former-cmo-is-investing-in-maxima",
];

const STRATEGIES = ["mobile", "desktop"];
const CONCURRENCY = 6;
const MAX_RETRIES = 3;
const TIMEOUT_MS = 90_000;

const PSI_BASE =
  "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
const CATEGORIES = ["performance", "accessibility", "best-practices", "seo"];

function buildPsiUrl(url, strategy) {
  const params = new URLSearchParams();
  params.set("url", url);
  params.set("strategy", strategy);
  for (const c of CATEGORIES) params.append("category", c);
  return `${PSI_BASE}?${params.toString()}`;
}

async function fetchWithTimeout(url, ms) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

async function runPSI(url, strategy) {
  const apiUrl = buildPsiUrl(url, strategy);
  let lastErr;
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(apiUrl, TIMEOUT_MS);
      if (res.status === 429 || res.status >= 500) {
        const wait = 2_000 * attempt;
        await new Promise((r) => setTimeout(r, wait));
        lastErr = new Error(`HTTP ${res.status}`);
        continue;
      }
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
      }
      const json = await res.json();
      if (!json.lighthouseResult) {
        throw new Error("no lighthouseResult in response");
      }
      return json;
    } catch (err) {
      lastErr = err;
      const wait = 1_500 * attempt;
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

async function pLimit(items, concurrency, worker) {
  const results = new Array(items.length);
  let i = 0;
  async function next() {
    while (true) {
      const idx = i++;
      if (idx >= items.length) return;
      const start = Date.now();
      try {
        results[idx] = { ok: true, value: await worker(items[idx]) };
        const ms = Date.now() - start;
        process.stderr.write(
          `  [${idx + 1}/${items.length}] ${items[idx].url} ${items[idx].strategy} ✓ ${ms}ms\n`,
        );
      } catch (err) {
        results[idx] = { ok: false, error: err };
        process.stderr.write(
          `  [${idx + 1}/${items.length}] ${items[idx].url} ${items[idx].strategy} ✗ ${err.message}\n`,
        );
      }
    }
  }
  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    next,
  );
  await Promise.all(workers);
  return results;
}

function getScore(lhr, cat) {
  const c = lhr?.categories?.[cat];
  if (!c || c.score == null) return null;
  return Math.round(c.score * 100);
}

function getFailingAudits(lhr) {
  if (!lhr?.audits) return [];
  const failing = [];
  for (const [id, a] of Object.entries(lhr.audits)) {
    if (a.scoreDisplayMode === "notApplicable") continue;
    if (a.scoreDisplayMode === "informative") continue;
    if (a.scoreDisplayMode === "manual") continue;
    if (a.score == null) continue;
    if (a.score >= 0.9) continue;
    failing.push({
      id,
      title: a.title,
      description: a.description,
      displayValue: a.displayValue,
    });
  }
  return failing;
}

function stripMdLinks(s) {
  if (!s) return "";
  return s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
}

function pageTitle(lhr, fallbackUrl) {
  const t = lhr?.audits?.["document-title"]?.details?.items?.[0]?.title;
  if (t) return t;
  const finalUrl = lhr?.finalUrl ?? lhr?.requestedUrl ?? fallbackUrl;
  return finalUrl;
}

function formatPageMd(url, mobile, desktop) {
  const title =
    pageTitle(mobile?.lighthouseResult, url) ||
    pageTitle(desktop?.lighthouseResult, url) ||
    url;
  const date = (
    mobile?.analysisUTCTimestamp ||
    desktop?.analysisUTCTimestamp ||
    new Date().toISOString()
  ).slice(0, 10);

  const lines = [];
  lines.push(`### ${title}`);
  lines.push("");
  lines.push(`**URL:** ${url}`);
  lines.push("");
  lines.push(`_Tested: ${date}_`);
  lines.push("");

  for (const [label, data] of [
    ["Mobile", mobile],
    ["Desktop", desktop],
  ]) {
    if (!data || !data.lighthouseResult) {
      lines.push(`#### ${label}`);
      lines.push("");
      lines.push(`_Audit failed: ${data?.error?.message || "no data"}_`);
      lines.push("");
      continue;
    }
    const lhr = data.lighthouseResult;
    const perf = getScore(lhr, "performance");
    const a11y = getScore(lhr, "accessibility");
    const bp = getScore(lhr, "best-practices");
    const seo = getScore(lhr, "seo");
    const failing = getFailingAudits(lhr);

    lines.push(`#### ${label}`);
    lines.push("");
    lines.push(`- Performance: ${perf ?? "—"}`);
    lines.push(`- Accessibility: ${a11y ?? "—"}`);
    lines.push(`- Best Practices: ${bp ?? "—"}`);
    lines.push(`- SEO: ${seo ?? "—"}`);
    lines.push("");
    lines.push(`**Failing audits (${failing.length}):**`);
    lines.push("");
    for (const a of failing) {
      const head = a.displayValue
        ? `**${a.title}** — ${a.displayValue}`
        : `**${a.title}**`;
      lines.push(`- ${head}`);
      lines.push(`  ${stripMdLinks(a.description)}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function formatReport(results) {
  const today = new Date().toISOString().slice(0, 10);
  const out = [];
  out.push(`# Lighthouse / PageSpeed Report — Site (Coverage Gap)`);
  out.push("");
  out.push(`**Generated:** ${today}`);
  out.push(
    `**Pages with PageSpeed data:** ${results.filter((r) => r.mobile?.lighthouseResult || r.desktop?.lighthouseResult).length}`,
  );
  out.push("");
  out.push(
    `**Note:** This report covers the 25 sitemap URLs not included in \`seo-audit-site-lighthouse-2026-05-07.md\`. Methodology and format match the source audit.`,
  );
  out.push("");
  out.push(`---`);
  out.push("");

  // Summary
  const mobileScores = results
    .map((r) => r.mobile?.lighthouseResult)
    .filter(Boolean);
  const desktopScores = results
    .map((r) => r.desktop?.lighthouseResult)
    .filter(Boolean);
  const avg = (arr) =>
    arr.length
      ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length)
      : "—";

  out.push(`## Mobile Summary`);
  out.push("");
  out.push(`- Pages tested: ${mobileScores.length}`);
  out.push(
    `- Avg Performance: ${avg(mobileScores.map((l) => getScore(l, "performance")).filter((v) => v != null))}`,
  );
  out.push(
    `- Avg Accessibility: ${avg(mobileScores.map((l) => getScore(l, "accessibility")).filter((v) => v != null))}`,
  );
  out.push(
    `- Avg Best Practices: ${avg(mobileScores.map((l) => getScore(l, "best-practices")).filter((v) => v != null))}`,
  );
  out.push(
    `- Avg SEO: ${avg(mobileScores.map((l) => getScore(l, "seo")).filter((v) => v != null))}`,
  );
  out.push("");
  out.push(`## Desktop Summary`);
  out.push("");
  out.push(`- Pages tested: ${desktopScores.length}`);
  out.push(
    `- Avg Performance: ${avg(desktopScores.map((l) => getScore(l, "performance")).filter((v) => v != null))}`,
  );
  out.push(
    `- Avg Accessibility: ${avg(desktopScores.map((l) => getScore(l, "accessibility")).filter((v) => v != null))}`,
  );
  out.push(
    `- Avg Best Practices: ${avg(desktopScores.map((l) => getScore(l, "best-practices")).filter((v) => v != null))}`,
  );
  out.push(
    `- Avg SEO: ${avg(desktopScores.map((l) => getScore(l, "seo")).filter((v) => v != null))}`,
  );
  out.push("");

  // Ranked table
  out.push(`## Pages Ranked by Performance`);
  out.push("");
  out.push(
    `| Page | Mobile Perf | Mobile A11y | Mobile BP | Mobile SEO | Desktop Perf |`,
  );
  out.push(`|---|---|---|---|---|---|`);
  const sorted = [...results].sort((a, b) => {
    const ap = getScore(a.mobile?.lighthouseResult, "performance") ?? 999;
    const bp = getScore(b.mobile?.lighthouseResult, "performance") ?? 999;
    return ap - bp;
  });
  for (const r of sorted) {
    const t =
      pageTitle(r.mobile?.lighthouseResult, r.url) ||
      pageTitle(r.desktop?.lighthouseResult, r.url) ||
      r.url;
    const mp = getScore(r.mobile?.lighthouseResult, "performance");
    const ma = getScore(r.mobile?.lighthouseResult, "accessibility");
    const mb = getScore(r.mobile?.lighthouseResult, "best-practices");
    const ms = getScore(r.mobile?.lighthouseResult, "seo");
    const dp = getScore(r.desktop?.lighthouseResult, "performance");
    out.push(
      `| [${t}](${r.url}) | ${mp ?? "—"} | ${ma ?? "—"} | ${mb ?? "—"} | ${ms ?? "—"} | ${dp ?? "—"} |`,
    );
  }
  out.push("");
  out.push(`---`);
  out.push("");
  out.push(`## Per-Page Detail`);
  out.push("");
  for (const r of results) {
    out.push(formatPageMd(r.url, r.mobile, r.desktop));
  }
  return out.join("\n");
}

async function main() {
  const tasks = [];
  for (const url of URLS) {
    for (const strategy of STRATEGIES) {
      tasks.push({ url, strategy });
    }
  }
  process.stderr.write(
    `Running ${tasks.length} PSI audits (${URLS.length} URLs × ${STRATEGIES.length} strategies) at concurrency ${CONCURRENCY}…\n`,
  );
  const t0 = Date.now();
  const out = await pLimit(tasks, CONCURRENCY, async (t) => {
    const json = await runPSI(t.url, t.strategy);
    return { url: t.url, strategy: t.strategy, json };
  });
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  process.stderr.write(`Done in ${elapsed}s\n`);

  // Group by URL
  const byUrl = new Map();
  for (const url of URLS) byUrl.set(url, { url, mobile: null, desktop: null });
  for (let i = 0; i < tasks.length; i++) {
    const t = tasks[i];
    const r = out[i];
    if (r.ok) {
      byUrl.get(t.url)[t.strategy] = r.value.json;
    } else {
      byUrl.get(t.url)[t.strategy] = { error: { message: r.error.message } };
    }
  }
  const grouped = [...byUrl.values()];

  const md = formatReport(grouped);
  const outPath = path.resolve(
    "/Users/meetchopra/Documents/Personal/Agency/Maxima/Lighthouse report/seo-audit-site-lighthouse-2026-05-07-additional.md",
  );
  await writeFile(outPath, md, "utf8");
  process.stderr.write(`Wrote ${outPath}\n`);

  // Also dump raw JSON for traceability
  const rawDir = path.resolve(
    "/Users/meetchopra/Documents/Personal/Agency/Maxima/Lighthouse report/raw-2026-05-07-additional",
  );
  await mkdir(rawDir, { recursive: true });
  for (const g of grouped) {
    const slug =
      g.url.replace(/^https?:\/\//, "").replace(/[^a-z0-9]+/gi, "_") ||
      "root";
    await writeFile(
      path.join(rawDir, `${slug}.json`),
      JSON.stringify(g, null, 2),
      "utf8",
    );
  }
  process.stderr.write(`Wrote raw JSON to ${rawDir}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
