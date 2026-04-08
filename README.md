# CPVC Guide

Technical content platform for CPVC plumbing systems, built with Next.js App Router and MDX.

## What is included
- public knowledge site
- manifest-driven publication control
- separate publish and index decisions
- internal publication dashboard at `/analytics`
- build-time content validation
- article feedback and review-comment sections

## Local setup
```bash
npm install
cp .env.example .env.local
npm run dev -- --hostname 127.0.0.1 --port 3300
```

## Quality gates
```bash
npm run validate-content
npm run typecheck
npm run lint
npm run build
```

## Content workflow automation
This repo includes a packet-based content pipeline for the Research Agent, Writer Agent, Editor Agent, and Technical Review Agent.

```bash
npm run content:init -- --title "What is CPVC pipe?" --primary-query "What is CPVC pipe?" --page-type article --category cpvc-basics --pillar "CPVC Fundamentals" --intent-type definition
npm run content:status -- --slug what-is-cpvc-pipe
```

Full first-pass automation:

```bash
npm run content:run -- --title "How to Allow for CPVC Expansion and Contraction" --primary-query "How do you allow for CPVC expansion and contraction?" --page-type article --category technical-guides --pillar "Technical Properties" --intent-type application
```

Stage-by-stage automation:

```bash
npm run content:autobrief -- --slug how-do-you-allow-for-cpvc-expansion-and-contraction
npm run content:autodraft -- --slug how-do-you-allow-for-cpvc-expansion-and-contraction
npm run content:autoedit -- --slug how-do-you-allow-for-cpvc-expansion-and-contraction
npm run content:final-review -- --slug how-do-you-allow-for-cpvc-expansion-and-contraction
```

Packets are created in `ops/content/` with:
- topic intake
- similarity report
- research brief
- draft
- editorial review
- technical review
- publish decision
- indexability decision

Final decisions can then be synced into `lib/publication-manifest.ts` with:

```bash
npm run content:manifest -- --slug what-is-cpvc-pipe
```

Important:
- automated briefs and drafts are first-pass working documents
- technical review is still required before risky content becomes indexable
- publish and indexability remain separate decisions by design

## Publication model
Publication state lives in `lib/publication-manifest.ts`.

Each entry controls:
- `published`
- `indexable`
- `qualityState`
- reviewer and review date

This keeps the site safer as content scales toward 50 articles and beyond.
