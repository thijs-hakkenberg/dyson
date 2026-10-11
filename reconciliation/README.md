# BOM reconciliation

Re-assessing the BOM with current models, phase by phase, against completeness and closure
findings. Start with [`phase-0/assessment.md`](phase-0/assessment.md).

```
reconciliation/
  phase-0/
    assessment.md      the review, for people
    findings.yaml      the same findings, structured; this is what the models receive
    round-1/           written by scripts/run-reassessment.js
      <model>/<item>.md        each model's re-assessment (bom-0-1 … bom-0-7, phase)
      raw/<model>/*.raw.json   full request/response archive (content-addressed)
      reconciliation/<item>.md synthesis: verdict matrix, agreed changes,
                               preserved divergences, proposed BOM delta
      summary.md
    round-2/           …newer models reviewing round 1
```

## Running it (on a machine with Databricks access)

```bash
# 0. Auth: either a token…
export $(cat .env | xargs)            # DATABRICKS_TOKEN, DATABRICKS_WORKSPACE
# …or a databricks CLI profile (as the review scripts use)
databricks auth login --profile claude-code

# 1. See what the workspace offers, and what "latest" resolves to
node scripts/run-reassessment.js --discover --profile=claude-code
node scripts/run-reassessment.js --list-models

# 2. Check the prompts before spending tokens (writes round-1/prompts/, no API calls)
node scripts/run-reassessment.js --phase=phase-0 --dry-run

# 3. Round 1: initial reconciliation with the May 2026 panel
node scripts/run-reassessment.js --phase=phase-0 --panel=may --profile=claude-code
node scripts/run-reassessment.js --phase=phase-0 --synthesize --synthesizer=claude-opus-4-7 --profile=claude-code

# 4. Round 2: newest models join and review round 1's reconciliation
node scripts/run-reassessment.js --phase=phase-0 --round=2 --prior-round=1 --panel=latest --profile=claude-code
node scripts/run-reassessment.js --phase=phase-0 --round=2 --synthesize --synthesizer=<newest claude key> --profile=claude-code
```

Re-running skips outputs that exist (resume after a failure); `--force` re-queries.
`--items=bom-0-4,phase` limits the run; `--include-specs` adds every per-model spec
to the prompts (longer, more context).

## Models

All scripts share [`scripts/lib/llm.js`](../scripts/lib/llm.js):

| Panel | Models | Transport |
|---|---|---|
| `feb` (default for existing debates) | Claude Opus 4.6, Gemini 3 Pro, GPT-5.2 | serving endpoints |
| `may` | Claude Opus 4.7, Gemini 3.1 Pro, GPT-5.5 Pro | AI Gateway |
| `latest` | newest Claude Opus / Gemini Pro / GPT found by `--discover` | AI Gateway |

Any endpoint can be named directly: `--models=databricks-claude-opus-5-5,gemini-3-5-pro`.
Unregistered endpoints are added on the fly (name derived from the endpoint, GPT on the
Responses API, others on chat completions). To make a new model permanent, add it to
`MODELS` in `scripts/lib/llm.js` and `KNOWN_MODELS` in `src/lib/services/models.ts`
(a test keeps the two in step).

The same flags now work for the debates and spec generation:

```bash
node scripts/run-discussion.js --question=<slug> --auto --panel=latest
node scripts/query-bom-specs.js --phase=phase-0 --item=transport-vehicles --panel=latest --generate-consensus
```

The site renders any model key (names and family colours are derived), and the
deliberation chamber seats whoever took part in a thread.

## After a round

1. Read `round-N/reconciliation/*.md`.
2. Accept, amend or reject each proposed BOM delta.
3. Update `src/lib/services/content.ts` and `bom-data.ts` (keep them in sync), and the
   item's consensus. Where models still disagree, record the disagreement in
   `divergent-views.yaml`.
4. Mirror changed figures into the explorer (`src/lib/explore/core/metrics.ts`,
   `models.ts`), and close or update the matching `CONSENSUS-ISSUES.md` entries.
5. Write the next phase's `findings.yaml` (Phase 1 depends on Phase 0's outputs; see P0-F19).
