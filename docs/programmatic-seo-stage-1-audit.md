# Programmatic SEO Stage 1 Audit

## Decision

Stage 1 is approved as a remediated foundation batch only.

Phase 2 expansion remains blocked until this batch is deployed, manually spot-checked, and monitored. The current system is safe enough to keep live because weak locality pages are noindexed, duplicate intent conflicts are fixed, and generated-page validation now blocks the known failure modes.

## Current Batch

- Product/category pages: 30
- State/region pages: 36
- City pages: 135
- Explicit locality pages: 30
- Total programmatic pages: 231
- Indexable programmatic pages: 201
- Noindexed programmatic pages: 30

## Remediation Summary

Phase 1 cleanup fixed the issues found during the deeper Stage 1 audit:

- Duplicate titles are now blocked at validation time.
- Duplicate primary queries are now blocked at validation time.
- Bilaspur, Chhattisgarh and Bilaspur, Himachal Pradesh are disambiguated in title, query, breadcrumb, and page copy.
- State intent is separated from city intent with `CPVC plumbing guide for {state}` queries instead of `CPVC pipes in {state}`.
- Delhi, Chandigarh, and Puducherry state/region pages use region-level query wording to avoid conflict with city pages.
- Product pages now carry product-specific decision guidance for the highest-value CPVC topics.
- State pages now include state-specific planning lenses for coastal, hill, hard-water, industrial, renovation, and regional contexts.
- City pages now use stronger template variation for coastal, hill/cold, hard-water, apartment, commercial, renovation, hot-climate, and residential contexts.
- Locality pages are held noindex during Phase 1 because they need stronger local proof before they should enter the sitemap.
- Validation now checks generated pages, not only seed data.

## Validation Gate

`npm run validate-content` now verifies:

- unique generated routes
- zero duplicate generated titles
- zero duplicate generated primary queries
- minimum page counts by type
- localities remain noindex in Phase 1
- every indexable page is `indexable-ready`
- every page has neutral Astral CPVC Pro context
- every page has at least 5 useful links
- every page has practical limit/caution language
- indexable generated-page similarity stays below the Phase 1 risk ceiling

Latest validation result:

- Total pages: 231
- Indexable: 201
- Noindex: 30
- Duplicate titles: 0
- Duplicate primary queries: 0
- Indexable similarity average: 0.214
- Indexable similarity max: 0.709

## Similarity Audit

Before remediation:

- Product average similarity: 0.624
- State average similarity: 0.631
- City average similarity: 0.474
- Locality average similarity: 0.540
- City risky pairs at or above 0.35: 9,045

After remediation:

- Product average similarity: 0.440
- State average similarity: 0.426
- City average similarity: 0.359
- Locality average similarity: 0.524
- City risky pairs at or above 0.35: 2,818

Locality similarity remains high, so the correct Phase 1 decision is noindex for all locality pages until Phase 2 adds richer locality data and manual review.

## Manual Sample Review Set

Review these after deployment:

- Product: `/products/cpvc-pipes`
- Product: `/products/cpvc-pipe-for-geyser`
- Product: `/products/cpvc-pipe-for-commercial-buildings`
- State: `/state/maharashtra`
- State: `/state/rajasthan`
- State: `/state/himachal-pradesh`
- City: `/city/mumbai-cpvc-pipes`
- City: `/city/ahmedabad-cpvc-pipes`
- City: `/city/rajkot-cpvc-pipes`
- City: `/city/bilaspur-cpvc-pipes`
- City: `/city/bilaspur-hp-cpvc-pipes`
- City: `/city/shimla-cpvc-pipes`
- Locality: `/location/mumbai/andheri-cpvc-pipes`
- Locality: `/location/pune/hinjewadi-cpvc-pipes`
- Locality: `/location/bengaluru/whitefield-cpvc-pipes`

## Sitemap And Indexing Decision

Approved for sitemap:

- Product pages that are `indexable-ready`
- State pages that are `indexable-ready`
- City pages that are `indexable-ready`

Not approved for sitemap:

- All locality pages in Phase 1
- Any future page with `qualityState: "publishable"` unless manually promoted with clear justification
- Any page that fails duplicate title, duplicate query, link, caution-language, or similarity validation

## Phase 2 Go/No-Go

Go for deployment of remediated Stage 1: yes.

Go for Phase 2 expansion: not yet.

Phase 2 can start only after:

- remediated Stage 1 is deployed
- sample pages pass manual mobile and content review
- sitemap contains only the 201 indexable programmatic pages
- Search Console shows discovery/indexing without a serious quality rejection pattern
- Phase 2 city and locality data includes stronger local value than the current Phase 1 locality set
