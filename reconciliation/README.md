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

# 4. Round 2: a panel critiques round 1's reconciliation with the decision frameworks
node scripts/run-reassessment.js --phase=phase-0 --round=2 --prior-round=1 --panel=latest --profile=claude-code
node scripts/run-reassessment.js --phase=phase-0 --round=2 --synthesize --synthesizer=<newest claude key> --profile=claude-code
```

Critique rounds (`--prior-round=N`) hold the previous reconciliation to
[`src/content/methodology/decision-frameworks.md`](../src/content/methodology/decision-frameworks.md):
each model walks the key decisions through its nine-step Composite Scaffold (frame,
criteria before options, options incl. the null option, QOC matrix, sensitivity vs
trade-off points, calibrated evidence certainty, falsifiable key assumptions, decision
with warrant and accepted downside, consequences) and names the weakest link in each
decision's Decision Quality chain. The synthesis adds a *Decision-quality audit*, and
every critique-round output records the framework's hash (`framework:` in frontmatter).
Edit the framework there; `scripts/lib/critique.js` builds the prompt from it.

Re-running skips outputs that exist (resume after a failure); `--force` re-queries.
`--items=bom-0-4,phase` limits the run; `--include-specs` adds every per-model spec
to the prompts (longer, more context).

## Models

All scripts share [`scripts/lib/llm.js`](../scripts/lib/llm.js):

| Panel | Models | Transport |
|---|---|---|
| `feb` (default for existing debates) | Claude Opus 4.6, Gemini 3 Pro, GPT-5.2 | serving endpoints |
| `may` | Claude Opus 4.7, Gemini 3.1 Pro, GPT-5.5 Pro | AI Gateway |
| `oct` | Claude Opus 5.5, Gemini 3.8 Flash, GPT-6.1 Sol | AI Gateway (dev workspace) |
| `latest` | newest Claude Opus / Gemini Pro / GPT found by `--discover`; a family with no flagship falls back to its newest tier | AI Gateway |

The `oct` panel lives on the dev workspace `adb-1355704782079007`, which serves no
Gemini Pro, so Gemini 3.8 Flash takes that seat. Point the scripts at it with
`DATABRICKS_HOST=https://adb-1355704782079007.7.azuredatabricks.net` and either a PAT in
`DATABRICKS_TOKEN` or `--profile=eva`.

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

## Technology readiness (TRL) re-baseline

[`phase-0/trl/WORKPACKAGE.md`](phase-0/trl/WORKPACKAGE.md) — after D-01/D-02. A panel rates
each critical technology of the revised architecture on the NASA TRL scale with AD²
(`scripts/run-trl-assessment.js`: inventory → assess → gates), then the apply step rebuilds
the TRL data, gates, analysis pages and explorer lenses from the result.
`scripts/check-stale-narratives.js` is the acceptance check (WP-A: TRL and gates;
WP-B: the BOM and its narratives).

