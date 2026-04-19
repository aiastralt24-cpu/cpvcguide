# Programmatic SEO Stage 1 Audit

## Decision

Stage 1 is approved as a controlled foundation batch, not a full India-scale rollout.

The current programmatic layer is allowed to stay small and quality-gated. It should not be expanded toward 800-1,000 pages until Stage 2 data enrichment is complete.

## Current Batch

- Product/category pages: 30
- State/region pages: 36
- City pages: 135
- Explicit locality pages: 30
- Total programmatic pages: 231

## Stage 1 Technical Audit

Passed checks:

- Product, state, city, and locality route groups build through static generation.
- Programmatic pages are included in sitemap only when `indexable` and `indexable-ready`.
- `llms.txt` and `llms-full.txt` include the programmatic content layer.
- Footer includes public discovery links into the India CPVC page system.
- Programmatic validation blocks duplicate slugs/routes and too-small batches.
- Production build generated all programmatic routes successfully.

## Stage 1 Content Quality Audit

The first version had a real repetition risk because several page types used only three similar content sections.

Fixes applied:

- Added a computed `qualityScore` and `auditNotes` model for every programmatic page.
- Pages below 80 are automatically `publishable` and not indexable.
- Pages at 80 or above are `indexable-ready`.
- Product pages now include a product-comparison section.
- State pages now include priority city coverage.
- City pages now include contextual profiles such as coastal, hard-water, hill, apartment, and renovation contexts.
- Locality pages now include a clear "why this locality page exists" section.
- Every page retains neutral Astral CPVC Pro context without using it as a sales close.

## Manual Sample Review Set

These page types should be manually spot-checked after deployment:

- Product: `/products/cpvc-pipes`
- Product: `/products/cpvc-pipe-for-geyser`
- State: `/state/maharashtra`
- State: `/state/rajasthan`
- City: `/city/mumbai-cpvc-pipes`
- City: `/city/pune-cpvc-pipes`
- City: `/city/jaipur-cpvc-pipes`
- City: `/city/shimla-cpvc-pipes`
- Locality: `/location/mumbai/andheri-cpvc-pipes`
- Locality: `/location/pune/hinjewadi-cpvc-pipes`
- Locality: `/location/bengaluru/whitefield-cpvc-pipes`

## Stage 1 Publish Decision

Approved:

- Keep the 231-page programmatic foundation.
- Keep all pages quality-gated.
- Allow sitemap inclusion only for `indexable-ready` pages.
- Do not expand locality count until real locality data exists.

Not approved:

- No automatic 1,000-city rollout yet.
- No 10,000-locality generation.
- No product x city x locality multiplication.
- No locality page without a specific local reason-to-exist.

## Stage 2 Entry Criteria

Before Stage 2 begins:

- Enrich city data for at least 250 target cities.
- Add real top-locality data for 300-500 pages.
- Add water/climate/building/project context for each new city and locality.
- Review 20-30 deployed pages manually.
- Check Search Console indexing behavior after deployment.

