# Repository Instructions

## Pathway logic maintenance

When changing clinical criteria, thresholds, formulas, routing, or result
messages in `src/pathway.ts` or `src/config.ts`:

1. Update `docs/pathway-logic.md` so its Mermaid diagram matches the executable
   branches.
2. Update or add tests in `src/pathway.test.ts`, including exact threshold
   boundaries where relevant.
3. Keep unresolved clinical decisions explicit in the diagram. Do not present a
   prototype fallback as a finalized recommendation.
