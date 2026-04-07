# CPVC Guide Implementation Brief

## MVP decisions locked
- Fresh build from scratch
- Standalone content site structure
- Next.js App Router + Tailwind + MDX
- Vercel deployment target
- Category-based URLs
- Build-time metadata validation
- Astral references disallowed by default

## Required page modules
- Quick Answer
- Sticky table of contents
- FAQ block
- Related reading
- Breadcrumbs
- Spec summary cards for technical pages
- Comparison table for comparison pages

## Public routes in scope
- Home
- Category archives
- Content detail pages
- About
- Editorial policy

## Quality gates
- No missing required frontmatter
- No duplicate primary queries
- No orphan pages in starter pack
- Structured data on content pages
- Canonical routes on all public pages
