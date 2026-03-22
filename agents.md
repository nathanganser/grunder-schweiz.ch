# Gründer Schweiz — Agent Instructions

Editorial portal for Swiss founders and freelancers. Reviews and compares business software (accounting, invoicing, banking, time tracking).

## Stack

Nuxt 4 + Nuxt Content 3 + Nuxt UI 4 + Tailwind CSS 4 + TypeScript. Deployed on Vercel as a statically prerendered site. Package manager: pnpm.

## Critical Rules

### URL slugs must NOT contain umlauts
File names and URL paths use `ae`, `oe`, `ue`, `ss` instead of `ä`, `ö`, `ü`, `ß`. The build crawls all internal links and **fails on any 404**, so every link must match an actual file.

- Link text may use umlauts: `[Firma gründen](/blog/firma-gruenden-schweiz-kosten)`
- The `href`/`to` path must NOT: `/blog/firma-gruenden-schweiz-kosten` (not `firma-gründen`)
- Always verify internal link targets against actual file names in `content/`

### German text uses real umlauts
All UI text, content body, and comments use `ä ö ü ß` — never `ae oe ue ss` substitutions. This rule applies to display text only, not to slugs/paths.

## Project Structure

```
content/                    # Numbered folders → URL paths (number stripped)
  3.blog/**/*.md            # → /blog/{slug}
  5.bestenlisten/**/*.md    # → /bestenlisten/{slug}
  6.reviews/**/*.md         # → /reviews/{slug}
  7.legal/**/*.md           # → /legal/{slug}
  8.methodik.md             # → /methodik
  9.kategorien.yml          # → /kategorien
  10.vergleiche/**/*.md     # → /vergleiche/{slug}

app/pages/                  # File-based routing with [slug].vue for dynamic pages
app/components/             # Vue components
content.config.ts           # Zod schemas for all content collections
nuxt.config.ts              # Modules, route rules, prerender config
```

## Content Conventions

- File names: `{sort-number}-{slug}.md` — number controls ordering, slug becomes the URL
- Frontmatter schemas defined in `content.config.ts` — follow them strictly
- Every review/ranking includes mandatory affiliate transparency fields
- Collections: articles, rankings, reviews, comparisons, legal, methodology, categories

## Commands

- `pnpm dev` — dev server
- `pnpm build` — production build (fails on prerender 404s)
- `pnpm lint` — ESLint
- `pnpm typecheck` — TypeScript check
