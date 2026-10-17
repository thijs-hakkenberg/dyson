# Work package WP-A — Phase 0 TRL re-baseline and gate rebuild

*Opened 2026-10-12 after the owner accepted D-01 and D-02
([`../decisions.md`](../decisions.md)). Research question: rq-0-62 (and rq-0-63 for timing).
Runs on a machine with Databricks access to current models; the apply step can run
there or anywhere.*

## Why

The technology-readiness table (`src/lib/services/trl-assessment.ts`), the decision gates
(`src/lib/services/decision-gates.ts`) and every page and lens built on them describe the
**March 2026 architecture**:
- a 50 kt/yr central station at SEL4/5;
- LOX/LH₂ production;
- 100 kW solar-electric propulsion.

The revised architecture (D-01, round-2 §2) changes which technologies are critical, the
scale they are needed at, and how gates work (D-02).

Concretely:
- The table's "top strength", SEP at TRL 6–7, describes 100 kW. The tugs now need
  1–2.5 MWe, rated TRL 2–4.
- Five of the ten rows are off the Phase 0 critical path.
- Seven technologies the revised plan depends on are missing.

The owner asked for a **thorough rebuild, not patches**: no stale narrative may survive
anywhere on the live site.

## Part 1 — Panel run (Databricks machine)

```bash
git checkout feature/trl-workpackage   # or main once merged
npm install

# Which models are available? Prefer a flagship Gemini (Pro) if the workspace has one.
node scripts/run-trl-assessment.js --discover --profile=<profile>

# 1. Inventory: is this the right set of critical technologies?
node scripts/run-trl-assessment.js --phase=phase-0 --step=inventory --panel=latest --profile=<profile>
node scripts/run-trl-assessment.js --phase=phase-0 --step=inventory --synthesize --profile=<profile>
#    → reconciliation/phase-0/trl/inventory.yaml
#    CHECKPOINT: read trl/round-1/inventory/synthesis/inventory.md and edit inventory.yaml
#    (resolve `disputed: true` entries; keep ids stable) before rating.

# 2. Rate every technology (TRL range, AD², target, evidence, path, risk, fallback)
node scripts/run-trl-assessment.js --phase=phase-0 --step=assess --panel=latest --profile=<profile>
node scripts/run-trl-assessment.js --phase=phase-0 --step=assess --synthesize --profile=<profile>
#    → trl/round-1/assess/synthesis/<id>.md and trl/round-1/trl-baseline.yaml
#    CHECKPOINT: technologies with panel.agreement = diverge — read the synthesis; check
#    any citation only one model gives or that a model marked unsure.

# 3. Gates under D-02, from the baseline
node scripts/run-trl-assessment.js --phase=phase-0 --step=gates --panel=latest --profile=<profile>
node scripts/run-trl-assessment.js --phase=phase-0 --step=gates --synthesize --profile=<profile>
#    → trl/round-1/gates/synthesis/gates.md and trl/round-1/gates-proposal.yaml

# Before spending tokens: --dry-run writes every prompt to …/prompts/ (git-ignored)
```

Notes:
- **Context in the prompts.** Every rating prompt carries:
  - the revised architecture and decisions D-01/D-02;
  - the NASA TRL definitions with exit criteria and the AD² anchors;
  - strict rating rules (consensus is not evidence; rate at the required scale; cite or
    say unsure);
  - the old table entry;
  - each related research question with its conclusion and literature review.
- **Resuming.** Re-running skips outputs that exist; `--force` re-queries, and `--only=T01,T07`
  limits the run.
- **Archive.** Raw exchanges are archived under `trl/round-1/*/raw/`.
- **Optional critique round.** Run `--round=2` with the next panel after reviewing round 1. The
  baseline of the latest reviewed round is the one the apply step uses.
- **Commit.** Commit `reconciliation/phase-0/trl/` (including `raw/`) and open a PR.

**Done when:**
- `trl-baseline.yaml` covers every technology in `inventory.yaml`;
- `gates-proposal.yaml` exists;
- both syntheses have been read at the checkpoints.

## Part 2 — Apply: rebuild, don't patch

Do this as one PR after Part 1 is merged. Rules:

1. **Data first, narrative from data.** Every number, rating, date and ranking on a page must
   come from the data files. Hand-written prose may explain method and meaning, but must
   not restate figures that live in data; it will go stale. Rewrite pages so this holds.
2. **Account for every legacy row and gate.** Each March 2026 TRL row and gate is either
   replaced, split, re-tagged (0B / Phase 1) or retired, with the reason recorded in data
   (`supersedes`, `retiredReason`). Nothing disappears silently.
3. **Keep divergence.** Where `panel.agreement = diverge`, the page shows the range and the
   per-model ratings, not a single number.
4. **Provenance.** Each assessment records `assessedAt`, the panel and the source synthesis
   path.

### A. Data layer

| File | Change |
|---|---|
| `src/lib/services/trl-assessment.ts` | Rebuild from `trl-baseline.yaml` and the syntheses. Extend `TRLAssessment` and keep the existing fields, which the explorer's Risk and Gates lenses read (`currentTRL`, `currentTRLMax`, `targetTRL`, `riskIfFail`, `yearsToTarget(Max)`, `relatedQuestionIds`, `relatedBOMIds`, `threadId`, `experimentsNeeded`, `fallbackApproach`). Add: `ad2`, `phaseNeed`, `required` (scale/environment/duration), `evidence[]` (claim, source, scale ratio, confident), `unmetExitCriterion`, `panelRatings` (per model), `agreement`, `supersedes`, `assessedAt`, `source`. Move deferred legacy rows to `phaseNeed: 'phase-1' \| '0B'` rather than deleting them. |
| `src/lib/services/decision-gates.ts` | Rebuild from `gates-proposal.yaml` on the D-02 model: KDP-0A, 0A mid-term review, KDP-0B, and the target/demand/economics/licence gates. Thresholds that cannot be set yet say so and name the question that sets them. Add `type` (kdp/review/discriminating), a month range, and pre-committed `fail` outcomes including the fallback to "0A only, Earth supply". Mark the five March gates retired, with reasons. |
| `src/lib/services/critical-path.ts` | Update thread narratives and `gateDescription`s that mention retired gates or old TRLs. Set rq-0-62 to answered and rq-0-63 to the status the gates step supports. |
| `src/content/research-questions/phase-0/rq-0-62-…` | Write `rq-0-62-…/conclusion.md` summarising the baseline (link the synthesis). Set its status to answered. |

### B. Pages — rewrite against the new data

| Page | Required |
|---|---|
| `/analysis/feasibility` | **Full rewrite.** The executive summary, top risks and strengths, recommendation, gate schedule, risk register, experimental roadmap, conclusions and "what would change the assessment" are generated from TRL, gate, question and decision data. It cites D-01/D-02 and the open-question register. No hand-typed TRLs, gate months, costs or counts. |
| `/analysis/technology-readiness` | Show the new schema: required scale vs demonstrated, AD², per-model ratings and divergence, evidence with sources, phase need. Deferred technologies go in their own section. |
| `/analysis/decision-gates` | The KDP model, discriminating gates, thresholds pending (with the question that sets each), and fail outcomes. Retired gates go in a collapsed history section. |
| `/analysis/critical-path` | Re-read its prose for gate and TRL statements; derive them from data. |
| `/analysis/cost-reconciliation` | Check gate and phase-cost references (coordinate with WP-B). |

### C. Explorer

| Where | Required |
|---|---|
| `core/gates.ts`, `GateTunnelScene`, `GatePanel`, `GateInspector` | The tunnel shows KDPs and discriminating gates by month range; criteria arcs per gate; "late" technologies from the new `yearsToTarget`. Update `__tests__/gates.test.ts`. |
| `core/risk.ts`, `RiskPanel` | Include AD² in the technology term (document the formula). Treat unassessed items explicitly. Update `__tests__/risk.test.ts`. |
| `core/nebula.ts`, `NebulaPanel`, `TopBar` | Gate counts and criteria-met figures come from the new gates. |
| `hud/Inspector.svelte`, `WorkbenchInspector`, `WorkbenchScene` | The TRL block shows a range, AD², phase need, and divergence where present. |
| `core/tours.ts` | Rewrite the "Gates" and Phase 0 tour captions that cite gates or TRLs; the interface tour's Gates and Risk captions must stay true. |

### D. Content

| File | Required |
|---|---|
| `src/content/validation-roadmap/experiments.yaml` | Re-map experiments to the new technologies and paths (`path[]` from the baseline); TRL targets per D-02. |
| `src/content/validations/index.yaml` | Check claims that cite TRLs or retired gates. |
| `src/content/external-organizations/index.yaml` | Outreach questions (e.g. oq-5-1, "100+ kW") restated for MW-class EP. |
| `src/lib/explore/CONSENSUS-ISSUES.md` | Close or update CI-18 (gates before readiness) and CI-19 (TRL coverage) with the outcome. |
| Blog posts that cite TRLs or gates (`feasibility-reassessment-march-2026`, `strategic-pivot-depth-over-breadth`, `phase-0-critical-questions-arxiv-review`, `resolution-microgravity-metallurgy-scaling`, `xenon-propellant-crisis-alternative-solutions`, others found by the sweep) | **Don't rewrite history.** Add a dated "Update, <date>" note at the top saying what changed, linking the new baseline. |
| New blog post | "Phase 0 technology readiness, re-baselined": what changed and why, with the D-01/D-02 framing. |

### E. Acceptance

```bash
node scripts/check-stale-narratives.js --wp=A   # must exit 0
npm run check && npm run test:run && npm run build
```

The checker matches known stale patterns only. Also read every page in B and C end to end,
and grep for the legacy ids (`solar-electric-propulsion`, `cryocooler-scaling`, `gate-1`…`gate-5`)
outside data history fields. Screenshot the four analysis pages and the Gates/Risk lenses
for the PR.

---

## WP-B — Apply D-01 and the agreed architecture to the BOM (separate PR)

WP-A rebuilds readiness and gates. The BOM and everything narrated from it still describe the
50 kt/yr station. They need their own package, so that no stale narrative remains.
`node scripts/check-stale-narratives.js --wp=B` lists the known locations (18 at the time
of writing):

- **BOM data.** `content.ts` and `bom-data.ts` (kept in sync): the Phase 0A/0B split and the
  round-2 BOM delta ([`../round-2/reconciliation/phase.md`](../round-2/reconciliation/phase.md)
  §4). Use D-03/D-04/D-05 as signed, or their interim positions marked as interim.
- **Specs.** Phase 0 consensus documents are regenerated (`query-bom-specs.js --consensus-only`
  on the new panel), with `divergent-views.yaml` carrying the preserved divergences (§3).
- **Explorer.** `core/metrics.ts`, `models.ts`, `placements.ts`, `logistics.ts`, `clouds.ts`
  and the tours that cite the station, its location, throughput or crew.
- **Homepage.** "Phase 0 is pure research" is replaced by the D-01 framing; the phase cost
  comes from the BOM.
- **Research questions.** Backgrounds that present the old station as current get a dated
  note (rq-0-11, 0-14, 0-28, 0-29, 0-32).
- **Issue log.** CI-15 to CI-20 are closed or updated.

**Acceptance:** `node scripts/check-stale-narratives.js` (both packages) exits 0.
