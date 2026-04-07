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

## Publication model
Publication state lives in `lib/publication-manifest.ts`.

Each entry controls:
- `published`
- `indexable`
- `qualityState`
- reviewer and review date

This keeps the site safer as content scales toward 50 articles and beyond.
