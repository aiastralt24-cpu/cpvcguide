# CPVC Guide Implementation Brief

## MVP decisions locked
- Fresh build from scratch
- Standalone content site structure
- Next.js App Router + Tailwind + MDX
- Vercel deployment target
- Category-based URLs
- Build-time metadata validation
- One neutral Astral CPVC Pro reference allowed per page where it supports CPVC product context
- Publishable and indexable-ready are separate and enforced states

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
- Root-level WebSite and publisher structured data
- Canonical routes on all public pages
- Answer-engine fields required for live content
