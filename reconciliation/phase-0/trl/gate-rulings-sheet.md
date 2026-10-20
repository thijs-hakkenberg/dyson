# Gate rulings: owner decision sheet (rq-0-65 … rq-0-75)

*2026-10-20. Built from each question's `divergent-views.yaml` (synthesised by GPT-6.1 Sol) and
the alternate synthesis by Claude Opus 5.5, read against
[`round-1/gates/ruling-syntheses-comparison.md`](round-1/gates/ruling-syntheses-comparison.md).
Positions are attributed by model. This sheet does not recommend any of them.*

**How to use.** Part 1 lists the points where the panel converged: confirm or amend each one.
Part 2 lists the open choices: tick one option or write your own. Each item carries the
question that owns it. Where neither synthesis showed convergence, the options are positions, not
a consensus. Rulings are recorded in [`gate-rulings.yaml`](gate-rulings.yaml) and in each question's status.
After that, `gates-proposal.yaml` is final and WP-A Part 2 can start.

Panel: **C** Claude Opus 5.5 · **G** Gemini 3.1 Pro · **P** GPT-6.1 Sol

---

## Part 1 — Converged: confirm or amend

**Owner: all eight confirmed 2026-10-20**, recorded in [`gate-rulings.yaml`](gate-rulings.yaml) (G-1.1 … G-1.8).

These count as converged only where both syntheses agree and the round-1 responses bear it out.

| # | Ruling | From | ☐ |
|---|---|---|---|
| 1.1 | **"Within 3×"** in the demand gate is a *quantity* ratio (capacity vs signed demand), not a timing tolerance. | rq-0-68 | ☑ **confirmed 2026-10-20** |
| 1.2 | **"Signed" demand** means specified, financially backed commitments, not endorsements or planning allowances. Backing details are open (2.7). | rq-0-68 | ☑ **confirmed 2026-10-20** |
| 1.3 | **Licence-gate failure:** at most one bounded redesign and reapplication for a remediable failure. Requirements are unchanged, nothing is authorised for production meanwhile, and the 0A-only fallback stays. | rq-0-70 | ☑ **confirmed 2026-10-20** |
| 1.4 | **D-02 for flight projects:** TRL 4–5 can release reversible 0A funding tranches. A scout or pathfinder PDR is a separate gate needing TRL 6 for flight-critical technology. | rq-0-74 | ☑ **confirmed 2026-10-20** |
| 1.5 | **Scout PDR:** T11 (scouts) and T18 (sampling and assay) at TRL 6. | rq-0-73 | ☑ **confirmed 2026-10-20** |
| 1.6 | **Sunset, direction:** M180 acts automatically, not as a prompt for review. *How* it acts is open (2.9). | rq-0-69 | ☑ **confirmed 2026-10-20** |
| 1.7 | **Economics premium:** any cost above Earth supply needs a separate, explicit owner authorisation. D-01's purpose does not authorise one by itself. | rq-0-67 | ☑ **confirmed 2026-10-20** |
| 1.8 | **KDP-0B secondary technologies:** no blanket duplicate TRL 6 demonstration. Applicable 0A evidence is reused. | rq-0-66 | ☑ **confirmed 2026-10-20** |

---

## Part 2 — Open: choose

**Status 2026-10-20: not ruled. Routed to evidence.** The owner chose not to rule from
intuition where deliberation did not converge. Each item below is routed to an evidence question
(rq-0-76 … rq-0-83; see [`../open-questions.md`](../open-questions.md)). When those report, this
part is re-issued with the evidence attached, or the panel deliberates again with it.

| Items | Evidence question |
|---|---|
| 2.1, 2.2, 2.4 | rq-0-77 fallback dossiers (+ rq-0-76 for the classification method) |
| 2.3, 2.15, 2.16 | rq-0-80 target-grade evidence standard (+ rq-0-76 for TRL 8 wording) |
| 2.5, 2.6 | rq-0-82 economics-gate practice |
| 2.7, 2.8 | rq-0-81 demand qualification and capacity sizing |
| 2.9, 2.10, 2.11 | rq-0-83 sunsets, preservation and licence recovery |
| 2.12, 2.13 | rq-0-78 scale-up evidence base (+ rq-0-76) |
| 2.14, 2.17, 2.18 | rq-0-76 agency practice |
| 2.19 | rq-0-79 MW-class EP test path (+ rq-0-78) |

### rq-0-65 · Risk class of the eight split technologies

The two syntheses disagree here. The alternate finds a C+P core on *method*; the primary lists three positions.

**2.1 How a class is set**

| | Position | Held by |
|---|---|---|
| A | Generating rule: a technology is **project-ending unless** an independently reviewed fallback dossier shows a credible, costed, non-common-cause fallback that keeps 0B production viable. | C, P |
| B | Judge each technology on how viable its known fallbacks are, with no general rule. | G |

☐ A ☐ B ☐ other: ____

**2.2 Interim classes before any dossier exists**

| Tech | C | G | P |
|---|---|---|---|
| T02 MW solar arrays | project-ending | architecture-change | project-ending |
| T15 site power | project-ending | architecture-change | project-ending |
| T22 product qualification | project-ending | architecture-change | project-ending |
| T10 autonomy | split: safety part project-ending, productivity part arch-change (provisional) | project-ending | project-ending |
| T14 propellant storage and feed | arch-change, provisional on a storable-propellant branch | project-ending | project-ending |
| T24 dust-tolerant mechanisms | arch-change, provisional on life tests | project-ending | project-ending |
| T25 navigation | arch-change, provisional on a funded path to TRL 6 | project-ending | project-ending |
| T26 comms | keep the rq-0-64 ruling (arch-change) | keep arch-change | keep, with automatic elevation if no fallback service is shown by KDP-0A |

Note: both C and P flagged C's provisional classes as inconsistent with C's own rule A.

☐ P column (all project-ending until a dossier exists) ☐ C column ☐ G column ☐ per row: ____

### rq-0-66 · TRL 6 at KDP-0B for T11, T18, T09, T12, T20

**2.3 T18 sampling and assay** (project-ending)

| | Position | Held by |
|---|---|---|
| A | Project-ending, and needs **in-situ bulk-grade evidence on the selected target**; ground TRL 6 alone is not enough. No waiver. | C |
| B | TRL 6 for the sampling-and-assay capability **plus** acceptable target-specific results, assessed separately. | P |
| C | Assess through 0A mission evidence; no separate pre-gate TRL requirement. | G |

☐ A ☐ B ☐ C ☐ other: ____ (also settles rq-0-73's KDP-0B T18 item: C operational demonstration, P TRL 6 floor plus target evidence, G TRL 7 on target)

**2.4 T09 power tethers, T12 heavy handling, T20 energy storage**

| | Position | Held by |
|---|---|---|
| A | Default TRL 6. TRL 5 only with TRL 6 fallbacks, joint-fallback economics, baseline penalties and an independent authority. | C |
| B | TRL 6 for irreversible dependencies. Otherwise TRL 5 only with independently demonstrated substitution or deferral. | P |
| C | TRL 5 with an approved waiver, a defined fallback and a fully funded maturation plan. | G |

☐ A ☐ B ☐ C ☐ other: ____

*Also open:* whether T11 leaves the KDP-0B list (C: yes, unless Phase 1 inherits its hardware or software).

### rq-0-67 · Economics gate and capability premium

**2.5 Can an authorised premium produce a pass?** The primary synthesis is the accurate one here (see comparison).

| | Position | Held by |
|---|---|---|
| A | Yes. A premium pre-authorised within approved ratio and dollar caps can support a pass, with the parity result reported separately. | C |
| B | No. Above-parity cost is still an **economics fail**. A separate owner decision may let 0B proceed anyway. | G, P |

☐ A ☐ B ☐ other: ____

**2.6 When the premium is authorised**

| | Position | Held by |
|---|---|---|
| A | In advance, normally by the 0A mid-term review. Amendments recorded before the KDP-0B package. | C |
| B | At KDP-0B, on the evidence at the time, as a distinct finding. | G, P |

☐ A ☐ B ☐ other: ____

*Also open:* the cost test (C: project P70 vs Earth P50 with ±30% estimate readiness; P: equivalent expected costs plus a P70 funding envelope), and C's low-launch-price and market-backed exceptions, which P rejects.

### rq-0-68 · Demand gate terms

**2.7 What backs "signed" demand**

| | Position | Held by |
|---|---|---|
| A | Committed purchase funding **or** a costed Earth-supply baseline it displaces (it must exist if 0B is cancelled). Independent, budget-authorised signatory. Must **not** be conditional on 0B approval. | C |
| B | Independent customer budget authority with funded commitment. External demand also needs counterparty-performance evidence. Explicit KDP-0B conditions may qualify. | P |
| C | Binding external offtake **or** a formally funded internal Phase 1 line item. | G |

☐ A ☐ B ☐ C ☐ other: ____

**2.8 Capacity authorised after a pass**

| | Position | Held by |
|---|---|---|
| A | Nameplate ≤ the smaller of 3× accepted demand and accepted demand ÷ (justified availability × yield). | C |
| B | The smallest feasible configuration that meets accepted demand and reliability. Any surplus needs its own economic case. | P |
| C | Up to 3× funded or contracted annual demand (e.g. 0.2 kt/yr → 0.6 kt/yr). | G |

☐ A ☐ B ☐ C ☐ other: ____

*Also open:* the measurement window (C: 3-yr average and first delivery ≤ 24 months; P: each pre-declared annual period, frozen in advance; G: owner sets it).

### rq-0-69 · Month-180 sunset

**2.9 What happens at M180**

| | Position | Held by |
|---|---|---|
| A | 0B authority **expires**; fallback becomes the default. **No extension in place**: continuing needs a new owner decision, priced as a new commitment. | C |
| B | 0B authority expires. Explicit, **bounded replacement authority** is allowed for preservation or corrective work (scope, cap, expiry, stop conditions); it is not a KDP-0B approval. | P |
| C | Fallback is **executed** automatically. Only an extraordinary owner-level **clock pause** for catastrophic external shocks (e.g. a global launch stand-down). | G |

☐ A ☐ B ☐ C ☐ other: ____

*Also open:* the planning buffer (C: KDP-0B ≥ 24 months before M180; P: derive it from rq-0-63, not a fixed buffer). Whether fallback commits Earth-supply procurement: C and P say it doesn't; G frames it as an irreversible 15-year commitment.

### rq-0-70 · Licence reapplication (details on top of 1.3)

**2.10 Recovery window**

☐ 6 months (G) ☐ 12 months, fixed before the first gate (P) ☐ 18 months (C) ☐ other: ____

**2.11 What may change within the option**

| | Position | Held by |
|---|---|---|
| A | Limited containment, instrumentation, operations and throughput *reduction*. Changes to site, architecture, throughput *increase* or licensing state need a new KDP. | C |
| B | Every resubmission goes back through KDP-0B. Material site, process, throughput, hazard or jurisdiction changes need owner-level rebaselining. | P |
| C | Minor changes, including limited scaling and possibly site adjustments; no fundamental technology change. | G |

☐ A ☐ B ☐ C ☐ other: ____

*Also open:* eligibility (C: pre-committed failure classes, including a 10×-limit terminal threshold that P challenges). C and P agree an absent licensing basis means "not ready", not "failed", so it doesn't use up the retry; P adds a hold sunset.

### rq-0-71 · Scale extrapolation for TRL 6

**2.12 Power and throughput limit**

| | Position | Held by |
|---|---|---|
| A | 10× default. 10–100× with a pre-registered regime case and an intermediate anchor. **Never above 100×.** | C |
| B | No universal ratio. Acceptance limited to an independently reviewed, test-supported deployment envelope. | P |
| C | No fixed limit when the governing regimes match. | G |

☐ A ☐ B ☐ C ☐ other: ____

**2.13 Duration and wear**

☐ numerical runtime and equivalent-life rules, set apart from power (C) ☐ ≤ 10× duration extrapolation, ≥ 10% of design life physically tested (G) ☐ validated degradation mechanisms, no universal fraction (P) ☐ other: ____

*Also open:* when criteria freeze (C: a "Scaling Basis" frozen at the 0A mid-term review; P: pre-agreed evidence plans with independent concurrence).

### rq-0-72 · Headline TRL of a composite technology

The primary synthesis overstated convergence here (see comparison).

**2.14 Headline rule**

| | Position | Held by |
|---|---|---|
| A | Integration assessment **bounded by the weakest critical function**. Sub-ratings may be updated from applicable integrated evidence before the bound applies. Above TRL 4 only with a tested integrated article covering every critical function and coupled interface. | C (all three voted APPROVE) |
| B | As A, but published sub-ratings are **not** automatically inherited. A lower rating can be reconciled by applicable evidence or a justified scope distinction. The integrated-article bar follows the claimed boundary. | P (own written rule) |

C noted B's scope reconciliation could become a way around the gate.

☐ A ☐ B ☐ other: ____

*Also open:* whether this rule changes T26 (P: no; G: it justifies it retroactively, which C and P challenge), and a calibration pilot (C and P agree one is needed).

### rq-0-73 · Scout milestones (details on top of 1.5)

**2.15 What the target gate tests**

| | Position | Held by |
|---|---|---|
| A | Validated, target-specific sampled-data thresholds. TRL is supporting evidence, not the pass criterion. | C, P |
| B | T18 at TRL 7 through successful in-situ sampling and assay. | G |

☐ A ☐ B ☐ other: ____

**2.16 Before launch**

☐ flight qualification, as ISO TRL 8 with a NASA crosswalk (C) ☐ TRL 8 for each integrated flight system; no prior flight required (P) ☐ no TRL 8 before launch (G; C and P dispute G's premise) ☐ other: ____

### rq-0-74 · D-02 for flight projects (details on top of 1.4)

**2.17 Technologies flown as experiments**

| | Position | Held by |
|---|---|---|
| A | TRL 5 at PDR, with documented environments and targeted ground tests before CDR. Owner-signed waivers for scouts. No waivers for the pathfinder if it exceeds 25% of the 0A budget. | C |
| B | Below flight-enabling thresholds, under an independently reviewed demonstration assurance case (bounded failure effects, verified interfaces, explicit acceptance of experiment-failure risk). | P |
| C | No separate experimental path. TRL 6 at PDR for everything flight-critical. | G |

☐ A ☐ B ☐ C ☐ other: ____

**2.18 Form of the change:** ☐ amend D-02 explicitly (C, P) ☐ interpretation note on D-02 (G)

### rq-0-75 · T01 MW-class SEP: path to TRL 6

**2.19 Baseline evidence path**

| | Position | Held by |
|---|---|---|
| A | Ground modules plus a validated cluster model **plus a small flight anchor** (2–4 modules, ≤ 5× power extrapolation). Escalate if validation fails. | C |
| B | Ground qualification plus a **representative flight subset**, sized by interaction coverage. Ground-only substitution only if independently approved. | P |
| C | Ground modules plus a peer-reviewed cluster model, **no planned flight** (modules at ≤ 5×10⁻⁵ Torr). | G |

C and P both hold that single-module tests and a model don't close cluster-level behaviour.

☐ A ☐ B ☐ C ☐ other: ____

*Also open:* the facility basis (P: neither ground infeasibility nor flight unaffordability is established; it wants a configuration-specific facility comparison and a host, budget and schedule study).

---

## After signing

1. Record each ruling in `gate-rulings.yaml` (date, `decided_by: owner`, source question, what is still open).
2. Set each rq-0-65…75 to `answered`, or leave it `investigating` where items marked *also open* are deferred.
3. Regenerate `round-1/gates-proposal.yaml` from the rulings, then start WP-A Part 2.
4. Before more framework-mode runs, consider the pipeline fix from the comparison: at least two
   rounds, and synthesizers quote each model's own rule before declaring convergence.
