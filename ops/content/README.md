# Content Packets

This directory stores operational packets for the repo's multi-agent content workflow.

Each topic packet is created with:

```bash
npm run content:init -- --title "What pipe size should I use for a two-bathroom house?" --primary-query "How do you size CPVC for a two-bathroom house?" --page-type article --category standards --pillar "Standards, Sizing, and Engineering" --intent-type application
```

Each packet contains:

- `00-similarity-report.md`
- `01-topic-intake.md`
- `02-research-brief.md`
- `03-draft.md`
- `04-editorial-review.md`
- `05-technical-review.md`
- `06-publish-decision.md`
- `07-indexability-decision.md`
- `state.json`

Optional follow-up commands:

```bash
npm run content:similarity -- --primary-query "How do you size CPVC for a two-bathroom house?"
npm run content:advance -- --slug how-do-you-size-cpvc-for-a-two-bathroom-house --stage research-brief --status complete --owner "Research Agent"
npm run content:score -- --slug how-do-you-size-cpvc-for-a-two-bathroom-house --answer-quality 4 --technical-usefulness 5 --practical-examples 4 --trust-language 4 --aeo-extractability 4 --duplication-risk 4
npm run content:gate -- --slug how-do-you-size-cpvc-for-a-two-bathroom-house --reviewer "Technical Review Team" --technical-status pass --publish true --indexable false --quality-state publishable --notes "Publish now; add deeper examples before indexing."
npm run content:manifest -- --slug how-do-you-size-cpvc-for-a-two-bathroom-house
```

The intent is operational control:

- similarity is checked before drafting
- publish and indexability are separate decisions
- technical review can block risky content
- manifest changes only happen after the final gate
