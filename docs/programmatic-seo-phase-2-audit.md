# Programmatic SEO Phase 2 Audit

## Decision

Phase 2 has started as a guarded expansion batch.

This is not a full Phase 2 release for indexing. The new city pages are generated so they can be reviewed, tested, and improved, but they are held `noindex` until the Phase 1 foundation shows healthy Search Console discovery and indexing.

## Current Batch After Phase 2A

- Product/category pages: 30
- State/region pages: 36
- City pages: 262
- Explicit locality pages: 30
- Total programmatic pages: 358
- Indexable programmatic pages: 201
- Noindexed programmatic pages: 157
- Phase 2 pages generated: 127
- Phase 2 pages indexable: 0

## What Phase 2A Adds

Phase 2A expands city coverage from 135 cities to 262 cities.

The added city batch covers more Tier 2, regional, coastal, industrial, hill, hot-climate, hard-water, hospitality, and renovation-led markets across India. These pages use the existing city template system but are marked as Phase 2 rollout pages and blocked from indexing.

The purpose is to build the next content layer without creating a sudden sitemap expansion.

## Indexing Policy

Approved for sitemap:

- Phase 1 product pages that remain `indexable-ready`
- Phase 1 state pages that remain `indexable-ready`
- Phase 1 city pages that remain `indexable-ready`

Not approved for sitemap:

- All Phase 2 city pages until promotion
- All locality pages until stronger locality data exists
- Any generated page with `qualityState: "publishable"`

## Validation Gate

`npm run validate-content` now confirms:

- duplicate generated titles remain zero
- duplicate generated primary queries remain zero
- Phase 2 pages cannot become indexable accidentally
- locality pages remain noindex
- every page keeps Astral CPVC Pro as neutral context
- every page has at least 5 related/contextual links
- every page has practical caution or limit language
- indexable page similarity remains below the Phase 1 ceiling

Latest validation result:

- Total pages: 358
- Indexable: 201
- Noindex: 157
- Phase 2 pages: 127
- Phase 2 indexable: 0
- Indexable similarity average: 0.214
- Indexable similarity max: 0.709

## Manual Review List

Review these Phase 2 city pages before any promotion:

- `/city/tirupati-cpvc-pipes`
- `/city/kakinada-cpvc-pipes`
- `/city/gandhinagar-cpvc-pipes`
- `/city/solan-cpvc-pipes`
- `/city/udupi-cpvc-pipes`
- `/city/thiruvananthapuram-cpvc-pipes`
- `/city/panvel-cpvc-pipes`
- `/city/puri-cpvc-pipes`
- `/city/mohali-cpvc-pipes`
- `/city/haridwar-cpvc-pipes`
- `/city/howrah-cpvc-pipes`

## Remaining Phase 2 Work

Phase 2 is not complete yet.

Next tasks:

- Add 300-500 locality pages only after locality data has a real reason-to-exist.
- Add locality-specific fields for housing/project context, buying context, and installation risk.
- Create a promotion workflow for moving selected Phase 2 pages from `publishable` to `indexable-ready`.
- Add Search Console monitoring notes before any new sitemap expansion.
- Manually review Phase 2 samples on mobile before promotion.

## Go/No-Go

Go for Phase 2A code review: yes.

Go for indexing Phase 2 pages: no.

Go for full Phase 2 locality expansion: not yet.

Promotion can begin only when:

- Phase 1 pages are discovered and indexed normally
- no serious duplicate/canonical/indexing rejection pattern appears
- reviewed Phase 2 city pages pass manual content and mobile checks
- selected Phase 2 pages are promoted in controlled batches
