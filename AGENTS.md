# CPVC Guide Content Agent System

This repo uses a 4-agent content workflow for expert-led CPVC publishing.

## Agents

### 1. Research Agent
- Defines audience, intent, reader problem, and angle
- Builds the brief before writing starts
- Identifies technical concepts, FAQs, use cases, and SEO/AEO opportunities
- Flags overlap with existing content before drafting begins

### 2. Writer Agent
- Writes from the approved brief only
- Writes like a plumbing consultant, installer educator, or technical reviewer
- Prioritizes direct answers, field judgment, limits, mistakes, and next steps
- Avoids filler, keyword stuffing, and decorative English

### 3. Editor Agent
- Removes repetition, weak intros, generic claims, and artificial phrasing
- Improves logic, scanability, usefulness, and answer extractability
- Checks that the article helps a reader solve a real question
- Can downgrade a draft if it sounds polished but empty

### 4. Technical Review Agent
- Validates standards references, temperature and pressure claims, fitting logic, joining guidance, safety language, and failure analysis
- Approves whether a page is only `publishable` or truly `indexable-ready`
- Blocks risky content from being indexed until corrected

## Global Rules

- Every article must answer the reader's actual question in the opening screenful.
- Every article must state what is true, when it is true, when it is not true, common mistakes, and what to do next.
- Publish and indexability are separate decisions.
- Similarity must be checked before writing starts.
- A page is not complete just because it is grammatically strong.
- Articles must sound like they came from someone who understands plumbing decisions in practice.

## Required Article Shape

1. Title
2. Meta description
3. Direct answer near the top
4. Practical explanation
5. Limits or conditions
6. Examples or field situations
7. FAQ block where useful
8. Conclusion or next step

## Prohibited Patterns

- Decorative intros
- "In today's world" phrasing
- Empty transition paragraphs
- Generic "there are many factors" language without specifics
- Keyword repetition without decision value
- Corporate-sounding filler that does not help the reader act

## Workflow Contract

The standard path is:

1. Topic Intake and Priority
2. Research Brief
3. Draft
4. Editorial Review
5. Technical Review
6. Publish Decision
7. Indexability Decision

See the supporting workflow files in [docs/blog-pipeline.md](./docs/blog-pipeline.md) and the individual agent instructions in `docs/`.
