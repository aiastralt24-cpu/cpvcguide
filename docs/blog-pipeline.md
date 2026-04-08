# Blog Pipeline

## Goal

Produce CPVC articles that are useful for both human readers and answer engines, while keeping publishing and indexing under explicit control.

## Pipeline

### 1. Topic Intake and Priority

Input sources:

- target keywords
- support and sales questions
- product and standards pages
- competitor gaps
- industry pain points

Required decision:

- proceed
- merge
- narrow
- reject

### 2. Research Brief

The Research Agent creates the brief and similarity check.

Output:

- audience
- intent
- reader problem
- facts
- technical concepts
- use cases
- outline
- avoid-list

### 3. Draft

The Writer Agent creates the first full article.

Output:

- title
- meta description
- direct answer
- body
- FAQ
- takeaway

### 4. Editorial Review

The Editor Agent improves clarity, removes filler, and checks usefulness.

Output:

- final edited draft
- quality notes
- SEO and AEO validation

### 5. Technical Review

The Technical Review Agent validates factual and risk-sensitive content.

Output:

- pass or fail
- approval level
- corrections

### 6. Publish Decision

A page can become `published: true` only after editorial and technical review are complete.

### 7. Indexability Decision

A page can become `indexable: true` only after it is considered safe, strong, and differentiated enough to rank.

## Scorecard

Each article should be scored on:

- answer quality
- technical usefulness
- practical examples
- trust language
- AEO extractability
- duplication risk

## Quality State Mapping

- `raw`: topic approved, no strong draft
- `polished`: readable draft exists
- `publishable`: public-ready but not automatically safe to rank
- `indexable-ready`: strong enough and safe enough to be indexed

## Required AEO Elements

- direct answer near the top
- structured headings
- concise definitions
- explicit comparisons where relevant
- scannable summaries
- FAQ section
- clear conclusion or next step

## Hard Rules

- Do not publish because the draft sounds polished.
- Do not index because a page exists.
- Do not let overlap create cannibalization.
- Do not allow generic SEO writing into the live set.

## Automation Commands

Use the repo CLI to run the workflow as an actual packet-based system:

```bash
npm run content:init -- --title "What is CPVC pipe?" --primary-query "What is CPVC pipe?" --page-type article --category cpvc-basics --pillar "CPVC Fundamentals" --intent-type definition
npm run content:autobrief -- --slug what-is-cpvc-pipe
npm run content:autodraft -- --slug what-is-cpvc-pipe
npm run content:autoedit -- --slug what-is-cpvc-pipe
npm run content:final-review -- --slug what-is-cpvc-pipe
npm run content:similarity -- --primary-query "What is CPVC pipe?"
npm run content:advance -- --slug what-is-cpvc-pipe --stage research-brief --status complete --owner "Research Agent"
npm run content:score -- --slug what-is-cpvc-pipe --answer-quality 4 --technical-usefulness 5 --practical-examples 4 --trust-language 4 --aeo-extractability 4 --duplication-risk 5
npm run content:gate -- --slug what-is-cpvc-pipe --reviewer "Technical Review Team" --technical-status pass --publish true --indexable true --quality-state indexable-ready --notes "Safe to rank."
npm run content:manifest -- --slug what-is-cpvc-pipe
```

Operational packet files are stored in `ops/content/`.

For a single-command first pass:

```bash
npm run content:run -- --title "How to Allow for CPVC Expansion and Contraction" --primary-query "How do you allow for CPVC expansion and contraction?" --page-type article --category technical-guides --pillar "Technical Properties" --intent-type application
```
