# Schema Markup Implementation - [maxima.ai](http://maxima.ai)  
**Date:** April 16, 2026

## Current Issues

1. **Same FAQ schema on all 32 pages.** The site currently has one FAQ snippet (about AI accounting tools) injected on every page, including legal pages, careers, and the homepage. Google may flag this as spammy structured data since the FAQ content doesn't match what's visible on most pages.
2. **No Article schema on any blog post.** The 18 articles/case studies have no structured data, which means they're not eligible for article rich results in Google.
3. **No breadcrumb schema.** Google can't display breadcrumb navigation in search results for any page.

---

## Summary: How FAQ schema will look across all pages


| #     | Page                        | Schema Types             | Rich Result                                                         |
| ----- | --------------------------- | ------------------------ | ------------------------------------------------------------------- |
| 1     | `/` (Homepage)              | WebSite                  | Sitelinks in search                                                 |
| 2     | `/product-overview`         | FAQPage + BreadcrumbList | FAQ dropdowns + breadcrumbs                                         |
| 3     | `/how-it-works`             | BreadcrumbList           | Breadcrumbs                                                         |
| 4     | `/security`                 | FAQPage + BreadcrumbList | FAQ dropdowns + breadcrumbs                                         |
| 5     | `/about`                    | BreadcrumbList           | Breadcrumbs                                                         |
| 6     | `/careers`                  | BreadcrumbList           | Breadcrumbs                                                         |
| 7     | `/book-a-demo`              | BreadcrumbList           | Breadcrumbs                                                         |
| 8     | `/blog`                     | BreadcrumbList           | Breadcrumbs                                                         |
| 9     | `/newsroom`                 | BreadcrumbList           | Breadcrumbs                                                         |
| 10    | `/maxima-vs-floqast`        | FAQPage + BreadcrumbList | FAQ dropdowns + breadcrumbs                                         |
| 11    | `/legal`                    | BreadcrumbList           | Breadcrumbs                                                         |
| 12    | `/legal/privacy-policy`     | BreadcrumbList           | Breadcrumbs                                                         |
| 13    | `/legal/terms-of-service`   | BreadcrumbList           | Breadcrumbs                                                         |
| 14    | `/legal/cookie-policy`      | BreadcrumbList           | Breadcrumbs                                                         |
| 15–29 | All articles (CMS template) | Article + BreadcrumbList | Article rich results + breadcrumbs — single CMS template covers all |
| 30–32 | 3 redirected articles       | None needed              | Pages redirect to external sites                                    |


---

## 1: Updated Site-Wide Organization Schema

This schema tells Google who Maxima is - company name, contact info, founders, and social profiles. It appears on all pages automatically.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Maxima",
  "legalName": "Indus AI Technologies, Inc.",
  "url": "https://www.maxima.ai",
  "logo": "https://framerusercontent.com/images/w4qDXkV1aaFbj3Sqhn4VzNrD0B0.png",
  "description": "Maxima is an AI-native accounting platform that automates journal entries, reconciliations, flux analysis, and financial close with audit-ready accuracy.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2261 Market Street, Suite 10910",
    "addressLocality": "San Francisco",
    "addressRegion": "CA",
    "postalCode": "94119",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "support@maximahq.com",
    "telephone": "+1-650-644-4831",
    "contactType": "customer support"
  },
  "founder": [
    {
      "@type": "Person",
      "name": "Yogi Goel",
      "jobTitle": "CEO & Co-founder",
      "sameAs": "https://www.linkedin.com/in/yogi-goel"
    },
    {
      "@type": "Person",
      "name": "Akshaya Srivatsa",
      "jobTitle": "CPO & Co-founder",
      "sameAs": "https://www.linkedin.com/in/akshayasrivatsa"
    },
    {
      "@type": "Person",
      "name": "Jack Liao",
      "jobTitle": "CTO & Co-founder",
      "sameAs": "https://www.linkedin.com/in/jackliao07"
    }
  ],
  "sameAs": [
    "https://www.linkedin.com/company/maximaai/",
    "https://www.crunchbase.com/organization/maxima-ai",
    "https://www.g2.com/products/maxima/",
    "https://www.youtube.com/@Maximaaiofficial"
  ],
  "foundingDate": "2024",
}
</script>
```

---

## 2: Disabled the Site-Wide FAQ Snippet

This is the snippet that currently injects the same 5 FAQ questions on all 32 pages. Removed it. Keeping it risks a Google manual action for spammy structured data.

---

## FAQ Schema for Articles

FAQ schema should only be added to pages that have a visible FAQ section on the page. Google requires the schema to match what users can actually see.

**Articles that need FAQ schema:**

- `/articles/ai-tools-for-accounting` — 5 FAQs (AI-assisted vs agentic, cost, replacing accountants, best tools, SOX compliance)

As the site grows and more articles get FAQ sections, manually adding FAQ schema to each page doesn't scale. One way to solve this is with a **custom Framer code component** that allow us to automatically generate FAQ schema for the respective pages.

This is one approach to implementing schema at scale — there are other ways to achieve the same result depending on your setup.

### How it works

1. **Add a custom CMS field** (e.g., "FAQ Schema") to the Blog / Posts collection in Framer
2. **Create a FAQ component** on the page with the FAQ content (questions as headings, answers as paragraphs)
3. **Set the component to 0 opacity** — it's invisible to visitors but the code reads the DOM content
4. **Apply the code override below** to that component — it extracts Q&A pairs and injects FAQPage schema into the page `<head>` automatically

### Framer Code Override

Create this as a **Code Override** in Framer (Assets → Code → New Override):

```tsx
import { forwardRef, type ComponentType } from "react"
import * as React from "react"

export function withFAQSchema(Component): ComponentType {
    return forwardRef((props: any, ref) => {
        const localRef = React.useRef<HTMLElement | null>(null)
        const combinedRef = (node) => {
            if (typeof ref === "function") ref(node)
            else if (ref) ref.current = node
            localRef.current = node
        }

        React.useEffect(() => {
            const root = localRef.current
            if (!root) return

            const faqs: { question: string; answer: string }[] = []

            // Look for any heading (h1–h6) followed by a <p>
            const headingTags = root.querySelectorAll("h1, h2, h3, h4, h5, h6")

            headingTags.forEach((heading) => {
                const question = heading.textContent?.trim()
                const next = heading.nextElementSibling
                const isParagraph = next?.tagName.toLowerCase() === "p"
                const answer = isParagraph ? next.innerHTML?.trim() : null

                if (question && answer) {
                    faqs.push({
                        question,
                        answer: answer.replace(/\n/g, "").replace(/\s+/g, " "),
                    })
                }
            })

            if (faqs.length === 0) {
                console.warn("FAQSchema: No FAQ content found.")
                return
            }

            const faqSchema = {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: faq.answer,
                    },
                })),
            }

            const script = document.createElement("script")
            script.type = "application/ld+json"
            script.innerHTML = JSON.stringify(faqSchema)
            document.head.appendChild(script)

            return () => {
                document.head.removeChild(script)
            }
        }, [])

        return <Component ref={combinedRef} {...props} />
    })
}
```

> **Dev notes:**
>
> - The component scans for heading + paragraph pairs inside itself and builds the FAQ schema from them
> - The Article schema pulls the page title and meta description automatically
> - The script tag is injected into `<head>` at runtime and cleaned up when the component unmounts
> - Apply this override to the FAQ component on any page that has FAQ content — it handles the rest

---

## Page-by-Page Schema Blocks

Below is the exact code I pasted into each page's Custom Code in Framer.

---

### Page 1: Homepage (`/`)

**Schema types:** WebSite
**Rich result:** Helps Google associate the site name "Maxima" with maxima.ai in search results.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Maxima",
  "url": "https://www.maxima.ai",
  "publisher": {
    "@type": "Organization",
    "name": "Maxima",
    "url": "https://www.maxima.ai"
  }
}
</script>
```

---

### Page 2: Product Overview (`/product-overview`)

**Schema types:** FAQPage + BreadcrumbList
**Rich result:** FAQ dropdowns in search results + breadcrumb navigation.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.maxima.ai/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Product Overview"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why should I choose Maxima over BlackLine or Floqast?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Legacy vendors like BlackLine and FloQast track tasks, route approvals, and log work — but the accounting work still happens in spreadsheets. Maxima is the AI-native alternative where agents automate the close itself, preparing journal entries, reconciliations, and flux with audit-ready controls, native integrations and intuitive user experiences."
          }
        },
        {
          "@type": "Question",
          "name": "Does Maxima support multi-entity, multi-currency, and consolidation scenarios?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Maxima is built to handle the complexity of enterprise accounting, including multi-entity structures, varied currencies, high transaction volumes, custom policies, evolving workflows, and complex approval chains. Today, customers are using Maxima to process millions of transactions and billions of dollars across hundreds of entities and product lines, with the audit rigor, depth, and governance enterprise finance demands."
          }
        },
        {
          "@type": "Question",
          "name": "How does Maxima work alongside our existing systems and tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maxima is an ERP-agnostic platform that connects natively to over 100 financial systems, including banks, billing and other applications. Built from the ground up to work alongside your existing stack, Maxima delivers value from day one, without rip-and-replace, lengthy implementations, or heavy IT involvement."
          }
        },
        {
          "@type": "Question",
          "name": "How long is the implementation process?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike legacy vendors, Maxima is live in weeks, not months. Most teams hit ROI milestones in under 2 weeks for simple workflows and 4 weeks for complex ones, with zero downtime during implementation."
          }
        },
        {
          "@type": "Question",
          "name": "Are Maxima's modules SOX approved?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. All Maxima modules are SOC 1 Type II and SOC 2 Type II certified, and have been successfully used in SOX and audit cycles."
          }
        },
        {
          "@type": "Question",
          "name": "How much does Maxima cost?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maxima's pricing includes a platform fee based on the size of your business, along with per-module fees depending on the workflows you need. It's tailored to your transaction volume, number of entities, and system complexity. Please reach out to get a quote that fits your use case."
          }
        },
        {
          "@type": "Question",
          "name": "How do Maxima's agents automate close tasks while keeping humans in control?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maxima's agents act as co-preparers — handling the heavy lift but never bypassing human reviews. Every output is routed for review and approval, with full evidence, segregation of duties and built-in validation checks. Moreover, our agents operate within your organization's custom guardrails, to produce deterministic outcomes with step-by-step proof of work. Every action includes the full context (inputs, logic, lineage, and approval) captured in a clear, immutable trail that auditors can re-perform and controllers can verify."
          }
        },
        {
          "@type": "Question",
          "name": "How does Maxima keep customer data private and secure? Do they use customer data to train models?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "All data is encrypted in transit and at rest, governed by strict access controls, and never used to train models by default — your data stays your data. We undergo annual SOC 1 Type II and SOC 2 Type II audits to independently validate our security and privacy practices."
          }
        }
      ]
    }
  ]
}
</script>
```

---

### Page 3: How It Works (`/how-it-works`)

**Schema types:** BreadcrumbList
**Rich result:** Breadcrumb navigation in search results.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.maxima.ai/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "How It Works"
    }
  ]
}
</script>
```

---

### Page 4: Security (`/security`)

**Schema types:** FAQPage + BreadcrumbList
**Rich result:** FAQ dropdowns in search results + breadcrumb navigation.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.maxima.ai/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Security"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does Maxima define customer data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maxima defines customer data as any information ingested from, processed for, or generated on behalf of your financial systems. This includes general ledger transactions, journal entries, bank statements, reconciliation records, supporting documentation, and agent-prepared outputs. All such data is classified and handled as Customer Confidential under Maxima's data classification policy."
          }
        },
        {
          "@type": "Question",
          "name": "Can I request a copy of Maxima's SOC reports?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Maxima's SOC 2 Type II and SOC 1 Type II reports are available under NDA. Customers and prospective customers can request access through their Maxima representative or by contacting security@maxima.com."
          }
        },
        {
          "@type": "Question",
          "name": "Where is customer data hosted?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maxima processes and stores customer data in Google Cloud Platform data centers located in the United States. Customer data is not transferred or hosted outside the U.S."
          }
        },
        {
          "@type": "Question",
          "name": "How does Maxima ensure customer data is not used for model training?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maxima maintains contractual agreements with providers including OpenAI, Anthropic, and Google that explicitly prohibit the training, fine-tuning, or retention of customer data. All model usage is limited to inference-only workflows and is configured for zero data retention."
          }
        },
        {
          "@type": "Question",
          "name": "Who at Maxima can access customer data?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Access to customer data is governed by zero-trust and least-privilege principles. Permissions are enforced through role-based and attribute-based access controls, with regular access reviews conducted by Maxima's security team. When access is no longer required, including during employee offboarding, permissions are removed on a defined and controlled schedule."
          }
        },
        {
          "@type": "Question",
          "name": "How does Maxima enforce controls over agent-prepared outputs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maxima is designed so agents prepare work while authorized accounting users remain in control of review, approval, and posting. Approval gates and segregation of duties are enforced within the product, and every action is captured in an immutable audit trail with clear source-to-output lineage."
          }
        }
      ]
    }
  ]
}
</script>
```

---

### Page 5: About (`/about`)

**Schema types:** BreadcrumbList
**Rich result:** Breadcrumb navigation in search results.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.maxima.ai/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "About"
    }
  ]
}
</script>
```

---

### Page 6: Careers (`/careers`)

**Schema types:** BreadcrumbList

**Breadcrumb (always include):**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.maxima.ai/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Careers"
    }
  ]
}
</script>
```

---

### Page 7: Book a Demo (`/book-a-demo`)

**Schema types:** BreadcrumbList
**Rich result:** Breadcrumb navigation in search results.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.maxima.ai/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Book a Demo"
    }
  ]
}
</script>
```

---

### Page 8: Blog (`/blog`)

**Schema types:** BreadcrumbList
**Rich result:** Breadcrumb navigation in search results.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.maxima.ai/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog"
    }
  ]
}
</script>
```

---

### Page 9: Newsroom (`/newsroom`)

**Schema types:** BreadcrumbList
**Rich result:** Breadcrumb navigation in search results.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.maxima.ai/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Newsroom"
    }
  ]
}
</script>
```

---

### Page 10: Maxima vs FloQast (`/maxima-vs-floqast`)

**Schema types:** FAQPage + BreadcrumbList
**Rich result:** FAQ dropdowns in search results + breadcrumb navigation.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.maxima.ai/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Maxima vs FloQast"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How is Maxima different from FloQast?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "FloQast is a close management and checklist tool. It helps teams track tasks, document completion, and manage workflow during the month-end close. The preparation of journals, reconciliations, transaction matching, and flux analysis is still manual. Maxima is an AI-native accounting automation platform. Instead of tracking manual work, Maxima automates close preparation end to end, with AI agents pulling source transactions, preparing reconciliations, generating journal entries with audit-ready documentation, auto-matching transactions, and drafting variance explanations. Accounting teams review and approve instead of preparing from scratch."
          }
        },
        {
          "@type": "Question",
          "name": "Why do teams see higher ROI with Maxima than FloQast?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Close management tools like FloQast improve visibility and coordination, but close preparation still lives in spreadsheets, email threads, and manual exports. Maxima delivers higher ROI and faster time to value by automating close preparation end to end, completing multi-step workflows like journal preparation, reconciliations, transaction matching, and flux analysis, then routing review-ready outputs for approval. ROI comes from automation, not just better tracking, and most teams see value quickly because the work lands prepared, not just tracked."
          }
        },
        {
          "@type": "Question",
          "name": "Does Maxima include close management and checklist features?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Maxima includes checklist management, task dependencies, collaboration tools, and workflow tracking through its Close Command Center. The difference is that many checklist items are completed automatically by AI agents before reaching a human reviewer, combining close management software with accounting automation."
          }
        },
        {
          "@type": "Question",
          "name": "How does Maxima pricing compare to FloQast?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maxima uses SaaS subscription pricing with a base platform fee plus module-based pricing, tailored to your transaction volume, number of entities, and system complexity. Compared to close management tools like FloQast, Maxima typically delivers higher ROI because it automates close preparation work, not just checklist and workflow tracking. Many customers see 50–80% time savings in automated workflows and reduce close cycles by 2–10 days."
          }
        },
        {
          "@type": "Question",
          "name": "What kind of support do you offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Maxima provides white-glove onboarding with dedicated implementation, comprehensive documentation, ongoing training, and responsive customer success management to every customer. Our deployment team includes former accountants and controllers from PwC and EY, as well as Fintech and AI engineers from companies like Meta, Netflix, and Robinhood to ensure customers get value out of Maxima long-term."
          }
        }
      ]
    }
  ]
}
</script>
```

---

### Pages 11–13: Legal Sub-Pages (Single CMS Template)

**Applies to:** `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/cookie-policy`
**Schema types:** BreadcrumbList
**Rich result:** Breadcrumb navigation in search results.

All legal sub-pages use one shared template. The `{{Title | json}}` variable pulls each page's title automatically.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.maxima.ai/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Legal",
      "item": "https://www.maxima.ai/legal"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": {{Title | json}}
    }
  ]
}
</script>
```

---

## Article Schemas (All Articles - Single CMS Template)

All articles use one shared schema template added to the CMS collection page in Framer. The CMS variables automatically pull the correct data for each article. No per-article configuration needed.

> **Where:** [Custom Code Section](https://framer.com/projects/Maxima-Fall-Series-A-Seed--W6mZSgvOo0BTWTXYP64g-1gXtO?node=gNcKnO4YA&view=settings%3AcustomCode)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.maxima.ai/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Blog",
          "item": "https://www.maxima.ai/blog"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": {{ Title | json }}
        }
      ]
    },
    {
      "@type": "Article",
      "headline": {{ Title | json }},
      "description": {{ Meta Description | json }},
      "image": {{ Header Image | json }},
      "author": {
        "@type": "Person",
        "name": {{ Blog Author.Title | json }}
      },
      "publisher": {
        "@type": "Organization",
        "name": "Maxima",
        "logo": {
          "@type": "ImageObject",
          "url": "https://framerusercontent.com/images/w4qDXkV1aaFbj3Sqhn4VzNrD0B0.png"
        }
      },
      "datePublished": {{ Date | json }},
      "mainEntityOfPage": "https://www.maxima.ai/articles/{{ Slug }}",
      "articleSection": {{ Category.Title | json }}
    }
  ]
}
</script>
```

**CMS variables used:**


| Variable                         | What it pulls                                 |
| -------------------------------- | --------------------------------------------- |
| `{{ Slug | json }}`              | Article URL slug                              |
| `{{ Title | json }}`             | Article headline                              |
| `{{ Meta Description | json }}`  | Article meta description                      |
| `{{ Header Image | json }}`      | Featured image URL                            |
| `{{ Blog Author.Title | json }}` | Author name from linked Author collection     |
| `{{ Date | json }}`              | Publish date                                  |
| `{{ Category.Title | json }}`    | Category name from linked Category collection |


---

## Redirected Articles — No Schema Needed

The following 3 article pages redirect to external websites. Since visitors and search engines are sent to the external URL, no schema markup is needed on these pages.


| Article                                              | Redirects to                                                                       |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `/articles/reuters-exclusive-maxima`                 | Reuters — AI accounting startup Maxima raises $41 million                          |
| `/articles/kleiner-perkins-investment-perspective`   | Kleiner Perkins — Maxima: Bringing AI agents to the heart of enterprise accounting |
| `/articles/ey-alumni-spotlight-maxima-ceo-yogi-goel` | EY — Alumni spotlight: Maxima CEO, Yogi Goel                                       |


If redirects are removed in the future and these pages serve their own content, add Article + BreadcrumbList schema following the same pattern as the other articles above.