---
phase: phase-0
item: bom-0-1
round: 2
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
framework: 18f503fe4ec6
generated: 2026-10-12T10:02:35.700Z
---

# Reconciliation: bom-0-1 Prospecting Satellites (phase-0, round 2)

**Provenance caveat.** The panel's model attribution is still inconsistent. Each response's header names one model and its YAML `model:` field names another:

| Response header | YAML `model:` field |
|---|---|
| Claude Opus 5.5 | claude-opus-4-7 |
| Gemini 3.8 Flash | Claude-3.7-Sonnet-Thinking |
| GPT-6.1 Sol | GPT-5.2 |

In this reconciliation, **Claude**, **Gemini** and **GPT** refer to the response headers. The defect matters because two responses (Claude §1, GPT §1) argue that consensus regeneration depends on verified provenance.

Several responses also refer to round-1 positions by model name, for example "Claude's mixed fleet" in the Claude response and "Gemini favors 32" in the Gemini response. These are read as references to round-1 positions, not to the current authors.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F06**: 20 asteroids/sat/yr unreachable by a 100 kg craft | **agree** (on substance; disputes the title's causal claim) | **agree** | **partly** |
| **P0-F16**: consensus documents disagree with the BOM | **agree** | **agree** | **agree** (with evidence limitation) |

**P0-F06.** All three reject the 20/yr requirement as written.
- **Claude** and **GPT** both say spacecraft mass is not the binding constraint. Claude names per-target Δv, transfer time and geometry. GPT names transfer duration, thrust, geometry, navigation and dwell time.
- **GPT** alone holds that 20 remote observations per year is "not intrinsically impossible" and that no universal flyby limit has been established.
- **Gemini** accepts the finding fully. It argues that remote data from a small aperture is inadequate for characterisation.

**P0-F16.** All three confirm the prospecting discrepancy: 32 units / $160M in the BOM against 50 units / $250M in the consensus.
- **Claude** and **GPT** both say they could not verify the transport and ISPP discrepancies, because those specs were not supplied.
- **Claude** and **Gemini** additionally reject the $5M unit cost. Claude also objects to its "high" confidence label.
- **Claude** and **GPT** both reject "newer model version = authoritative".

---

## 2. Agreed changes

These are changes all three models support. Where values differ, the consolidated figure is the envelope of the three positions, with each model's nominal shown. No single value is selected.

| Change | Claude | Gemini | GPT | Consolidated |
|---|---|---|---|---|
| Remove the "20+ asteroids/sat/yr" rate | yes | yes | yes | Remove |
| Redefine mission as rendezvous characterisation of externally pre-screened/shortlisted targets | yes | yes | yes | Rendezvous primary mode |
| Targets per craft | 2 (1–3) over life | 1 primary + 1 extended (1–2) | 1 primary, 2nd conditional on trajectory (1–2) | 1–2 baseline; Claude's upper bound 3 |
| Fleet reduced from 32/50 and gated in tranches | 12 (8–20); 2 pathfinders + 10 | 16 (12–24); 4 pathfinders + 12 | 16 as costing scenario only (8–32); 4 initial pathfinders | Gated tranches agreed; quantity **not** agreed (see §3) |
| Wet mass | 200 kg (170–250) | 210 kg (180–260) | 200 kg reference, pending mass closure (150–300) | ~200 kg nominal; 150–300 kg envelope |
| Main propulsion: solar-electric | ~1 kW Hall + monoprop/cold-gas RCS | Hall or gridded ion, Isp 1,800–3,000 s | SEP baseline + separate proximity control | EP main + separate proximity propulsion |
| Array power, BOL at 1 AU | 1.2 kW (1.0–1.8) | 1.4 kW (1.1–1.8) | 1.5 kW (1–2) | 1.2–1.5 kW nominal; 1.0–2.0 kW envelope |
| Spectral upper limit extended for the ~3 µm hydration band | 3.6 µm (3.2–4.3) | 3.6 µm (to 3.8) | ≥ ~3.2 µm (3.2–4.3) | ≥3.2 µm; 3.2–4.3 µm envelope |
| Hydration band ≠ proof of extractable water | yes | yes (raises solar-wind OH confound) | yes | Agreed |
| $5M unit cost unsupported; recurring unit cost | $22M (15–35) | $25M (18–35) | $12–25M recurring hardware | $12–35M envelope; scope differences noted in §4 |
| Prospectors self-powered; 0 MW from bom-0-5 | yes | yes | yes | 0 MW external |
| Primary mission life | 5 yr primary, 7 yr goal (5–8) | 3–5 yr primary | 3–5 yr primary, 7 yr goal | 3–5 yr primary (Claude: 5); 7 yr goal (Claude, GPT) |
| Add launch/injection, deep-space ground segment and ops, target-screening programme | separate lines | separate lines | inside an all-inclusive work package | Scope agreed; accounting treatment divergent |
| Spacecraft data products cross-interface to bom-0-2/0-3/0-6 lack specs (`in_bom: false`) | yes | yes | yes | Agreed |

---

## 3. Preserved divergences

### 3.1 Fleet size

**Claude: 12 (8–20).**
- Basis: ~2 commit-grade targets needed; pre-screen hit rate p = 0.15–0.30.
- Claude's binomial check gives P(≥2 hits) of 0.83 at n = 15 and 0.93 at n = 20, at p = 0.2.
- Assumes 70–85 % survival and 1.5–2.5 targets per surviving craft.
- Confidence: low.

**Gemini: 16 (12–24).**
- Basis: 85 % survival, 65 % qualification yield and 1.25 targets/craft give ≈ 11 qualified targets.
- Purpose: supply the target pool for 20 robots and 4 ISPP plants with 2–3 redundant sites.
- Its ACH judges 12 craft "vulnerable" to attrition.
- Confidence: medium.

**GPT: 16 as a costing scenario only (8–32); no quantity endorsed.**
- An illustrative binomial with q = 0.16 and ≥3 qualifying targets gives P = 48 % at N = 16 and 91 % at N = 32.
- GPT says this shows attrition and yield must enter sizing, but "does not justify 32".
- Confidence: low.

The models differ on the required number of commit-grade targets and the hit rate (see §5).

### 3.2 Pathfinder tranche

| Model | Position |
|---|---|
| Claude | 2 pathfinders |
| Gemini | 4 pathfinders |
| GPT | 4 initial (range 2–4) |

GPT's YAML records the old tranche as "5". No other response cites that figure.

### 3.3 Onboard Δv and propellant

| Model | Δv | Propellant | Basis |
|---|---|---|---|
| Claude | 5.0 km/s (4–6.5) | 55 kg Xe/Kr | Two rendezvous at 1.5–3 km/s each + 10 % margin |
| Gemini | 3.2 km/s (2.5–4.2) | 65 kg | One primary rendezvous from C3 ≈ 0 with 30–40 % contingency |
| GPT | ~3 km/s (2–4) | ~30 kg (21–41) at 1,800 s | One primary target; explicitly "not a transfer solution" |

The difference tracks the targets-per-craft assumption.

### 3.4 Flyby tier vs all-rendezvous

**Claude.**
- Leans all-rendezvous, because remote triage is available externally (SPHEREx, NEO Surveyor, ground).
- Calls round 1's mixed fleet "defensible".
- Classifies the choice as a values trade-off.

**Gemini.**
- Favours all-rendezvous.
- Weighted score: 8.25 for all-rendezvous, 6.75 for mixed, 2.35 for flyby tour.
- Says flybys cannot provide thermal inertia, mass/density or fine-scale mineralogy.

**GPT.**
- Keeps flyby/mixed as "an alternative, not an agreed change".
- Calls it a values trade-off, provided both options have costed trajectories.
- Says no universal flyby yield limit has been established.

### 3.5 Throughput of non-rendezvous survey

- **Claude:** flyby rate ~0.5–1.5/yr. Remote triage gives tens to hundreds of objects per year but duplicates external assets.
- **Gemini:** flyby rate ~0.3–1.0/yr. Smallsat-aperture remote spectroscopy is inadequate for composition.
- **GPT:** 20/yr remote is not intrinsically impossible. Neither 20/yr nor a 0.5–1.5/yr flyby limit is established. Remote and flyby modes should be separately budgeted supplementary products.

### 3.6 Propellant choice

- **Claude: Kr or Xe.**
  - Flown iodine EP is ~1 mN class; at 1.1 mN on 180 kg, 2.5 km/s takes ~13 yr.
  - A ~1 kW iodine Hall thruster is not flight-proven.
  - Krypton is the more realistic commonality choice, at a tank-mass penalty.
  - Fleet Xe (~0.7 t) does not bind; commonality is "a logistics preference".
- **Gemini: Kr or I₂, high confidence.** The aim is to avoid xenon cost and scarcity. It treats commonality with bom-0-4 as an architecture standard, marked `in_bom: true`.
- **GPT: the xenon concern should "not automatically be inherited".** A sub-tonne allocation does not establish a bottleneck. Qualification, efficiency, storage and contamination matter more than commonality.

### 3.7 Downlink volume per target and ground time

| Model | Per-target volume | Ground time / rate |
|---|---|---|
| Claude | 0.5–3 GB | 10–50 kbps; ~3,000–6,000 antenna-h/yr fleet. Says round-1 50–200 GB/target "does not close" (100 GB at 100 kbps ≈ 93 days) |
| Gemini | 5–20 GB (YAML: 10 GB) | 10–50 kbps; 200 h/yr per satellite |
| GPT | 1–5 GB | ~220–1,110 antenna-h per target at 10 kb/s effective. Says the round-1 0.1–200 GB estimates cannot share one allocation |

### 3.8 Thermal-IR payload

- **Claude:** 8–14 µm microbolometer, 1–2 kg, medium confidence.
- **Gemini:** 8–14 µm uncooled microbolometer, medium confidence.
- **GPT:** trade a calibrated thermal radiometer against cost and power. No continuous 3–14 µm requirement.

### 3.9 Elemental/GRNS and lidar

- **Claude:** GRNS optional, rendezvous only.
- **Gemini:** treats GRNS (4–6 kg, weeks of integration, low altitude) as an open question alongside penetrators and impactors. Lists micro-lidar in its rendezvous option and "Level 4 proximity" autonomy.
- **GPT:** keep GRNS/lidar optional until sensitivity and accommodation close. Rejects adopting a 3–6 kg GRNS "from an asserted mass alone". Replaces autonomy level labels with testable scenarios.

### 3.10 Nav beacon for bom-0-2

| Model | Position |
|---|---|
| Claude | Optional, not baseline |
| Gemini | Lists a direct RF beacon interface |
| GPT | Not proposed |

### 3.11 Resource ground-truth step

- **Claude:** mandatory before the ~$10B station; $50–200M (judgement).
  - Cites OSIRIS-REx: OVIRS identified phyllosilicates, but the regolith's near-zero cohesion was not predicted.
  - Raises bom-0-2 unit 1 as a possibly cheaper demonstrator.
- **GPT:** needed before industrial commitment, but its architecture and cost are not established. The $50–200M allowance "is not a validated mission estimate".
- **Gemini:** proposes no ground-truth line. It gates bom-0-2 on prospecting orbital data and lists penetrators or impactors as possible options.

### 3.12 Gating of downstream procurement

- **Claude:** gate fabrication commitment of bom-0-2/0-3/0-6 on prospecting results 3–5 yr after launch. Long-lead design proceeds in parallel. ~75 % likely the better decision, medium confidence.
- **Gemini:** hard gate. bom-0-2 "cannot be built or deployed" until probes return orbital data.
- **GPT:** three evidence-based gates (A: fleet sizing; B: production expansion; C: industrial commitment). Gate C blocks irreversible procurement only. Rejects a fixed "3–5 year gate" as a forecast, not a pass criterion.

### 3.13 Authority after P0-F16

- **Claude:** the configuration-controlled BOM line is authoritative, changed via change requests. Consensus is a derived artefact stamped with BOM version and spec hashes.
- **GPT:** keep the current BOM as a record of the existing baseline, "not as proof that its quantities are correct". Mark the prospecting consensus superseded pending approval. Establish one configuration-controlled baseline with named technical authority.
- **Gemini:** does not address authority. Its P0-F16 change is a direct re-baseline to 16 units.

### 3.14 Cost scope and totals

| Model | Breakdown | Total |
|---|---|---|
| Claude | Recurring $15–35M; NRE $80–160M; line $260–580M; + launch $40–150M + ops $70–175M | Lifecycle ~$0.4–0.9B |
| Gemini | Recurring $25M → ~$400M hardware; + launch $120–180M + ground $100–150M + screening $15–30M | ACH quotes "$400M HW + $150M launch/ops" for 16 |
| GPT | Hardware $192–400M + development $80–160M + launch $60–180M + ops/screening $70–140M + 25–35 % reserve | All-inclusive $0.5–1.2B; phase total moves to $16.05–16.75B |

Only GPT carries an explicit reserve. Only GPT computes the phase-total effect.

### 3.15 Cost heritage figures cited

- **Claude:** MarCO ~$18.5M for two; SIMPLEx cap ~$55M, with Janus, Lunar Trailblazer and LunaH-Map overrunning or slipping.
- **Gemini:** MarCO ~$20M each; CAPSTONE ~$30M; Janus ~$50M for two; ESCAPADE ~$80M for two.
- **GPT:** SIMPLEx ~$55M cap excluding launch; Janus ~$49.7M award with no asteroid-operation heritage.

The two MarCO figures conflict (see Reviewer note).

### 3.16 Reversibility of the mission-mode decision

| Model | Classification |
|---|---|
| Claude | "Cheaply reversible on paper" |
| Gemini | "Type 1: irreversible commitment of payload and bus sizing" |
| GPT | "Partly irreversible once industrial assets are procured" |

---

## 4. Proposed BOM delta (for human review; not approved)

| Action | Item | Supported by | Quantity | Unit-cost range (USD) | Confidence | Notes |
|---|---|---|---|---|---|---|
| resize | bom-0-1 | Claude | 12 (2 pathfinders + 10 gated) | 22M–48M (hardware with amortised NRE) | low | Claude rationale: 18 targets ÷ 2/craft ÷ 0.8 survival |
| resize | bom-0-1 | Gemini | 16 (4 + 12) | 18M–35M (recurring flyaway) | medium | Sized for 10–12 viable targets |
| resize | bom-0-1 | GPT | 16 conditional scenario (4 initial) | 31.25M–75M (all-inclusive average incl. development, launch, ops, reserve) | low | "Costing scenario rather than an optimized fleet requirement" |
| add | Launch / injection to C3 ≈ 0 | Claude (separate line); Gemini (separate line); GPT (inside package) | Claude 1; Gemini 2 | Claude 40M–150M; Gemini 60M–90M each; GPT 60M–180M total | low (Claude, GPT); not stated (Gemini) | Claude: GTO rideshare adds 2–3 km/s and ~1 yr. GPT: LEO rideshare ≠ asteroid access |
| add | Deep-space ground segment and ops (7 yr) | Claude; Gemini; GPT (inside package, with screening) | 1 | Claude 70M–175M; Gemini 100M–150M; GPT 70M–140M incl. screening | low | |
| add | Target-screening / accessibility programme | Claude; Gemini; GPT (inside package) | 1 | Claude 5M–20M; Gemini 15M–30M | low | |
| add | Resource ground-truth step | Claude (line); GPT (need only, uncosted) | 1 | Claude 50M–200M; GPT: not established | low | Gemini does not propose it |
| add (implicit) | Common NRE | Claude (110M, 80–160M, inside line); GPT (80–160M, inside package) | 1 | 80M–160M | low | Gemini does not state NRE separately |
| keep | bom-0-5, 100 MW external capacity, unchanged | GPT | as is | GPT lists 5M–5M | — | Claude and Gemini only state 0 MW draw from prospectors |

**Accounting divergence for the reviewer.** Claude and Gemini put launch, ground and screening on separate lines. GPT bundles them into bom-0-1 and warns against double counting if they later move to phase-wide lines. The bom-0-1 unit-cost ranges above are therefore not comparable across models.

---

## 5. Open questions (and what would settle them)

| Question | Raised by | Settling evidence |
|---|---|---|
| How many NEAs are reachable at ≤3 km/s per hop, for one- and two-target sequences, in the launch window? | Claude, GPT; Gemini via missing ephemeris table | NHATS-type accessibility study with optimised low-thrust transfers (Claude falsifier: fewer than ~30 candidates). Would settle the Δv divergence (§3.3) and targets per craft |
| How many commit-grade targets does the phase need, and at what probability? | Claude (2, or 3–5 if metal and water differ); GPT; Gemini (10–12 viable) | Programme decision on site strategy plus acceptance thresholds. Drives fleet size (§3.1) by ~2× per Claude |
| What is the validated hit rate of external pre-screening? | Claude, Gemini, GPT | Claude: retrospective test of IRTF/SPHEREx classes against spacecraft or sample truth. Gemini: ground-truth sampling of 5 C-complex bodies |
| Mission survival and correlated-failure probabilities? | Claude, Gemini, GPT | Reliability model; pathfinder actuals (GPT Gate B) |
| What false-commit risk is acceptable? | Claude, GPT (values link) | Programme-authority statement. Settles flyby vs rendezvous and fleet-size trade-offs |
| Does a 3 µm feature indicate structural hydration or surface OH? | Gemini, GPT (ACH of three hypotheses) | Laboratory/sample correlation; GRNS or sampling performance study |
| Can a ~200 kg reference close mass, power, thermal and comms budgets? | GPT; Claude implicitly | Subsystem mass budget and link budget |
| Is a 1 kW-class Kr or I₂ Hall thruster qualified for ~4,500 h of throughput, or is Xe retained? | Claude; Gemini (Kr vs I₂ trade with bom-0-4) | Life-test data and vendor qualification status |
| Does a flyby variant improve cost per decision-relevant candidate enough to justify separate qualification? | GPT; Claude | Costed flyby trajectories plus value-of-information study |
| Which instruments meet hydration, thermal and elemental sensitivity within accommodation limits? | GPT; Gemini (GRNS) | Instrument sensitivity and accommodation trade |
| What deep-space antenna capacity and launch services can be procured? | GPT, Claude, Gemini | Negotiated DSN/ESTRACK/commercial capacity; launch quotes. Settles §3.7 |
| Can bom-0-2 unit 1 serve as the ground-truth demonstrator? | Claude | Joint bom-0-2/0-6 concept study |
| Should launch and ground stay inside prospecting or move to phase-wide lines? | GPT | Programme cost-ownership decision |
| Who holds configuration authority, how is model provenance verified, and who supplies current transport/ISPP specs? | Claude, GPT | Named authority (bom-0-7); provenance audit |

---

## 6. Decision-quality audit

### D-A. Mission mode / redefinition of "survey"
(Claude D1, Gemini D1, GPT D1)

**Weakest link named.** The three models name three different links:
- **Claude: frame.** Round 1 asked "what kind of satellite" before "what information does the phase need, and is a fleet the cheapest source?"
- **Gemini: alternatives.** The original consensus assumed a high survey rate without trading rendezvous against remote observation.
- **GPT: values.** The required resource confidence and tolerated investment loss are missing.

**Missing or unsupported steps identified.**
- Claude: round 1 stated no criteria weights and never evaluated a null option (external data only).
- GPT: weights are "proposed discussion weights", not an agreed utility function. It avoids numerical scores as unsupported.
- Gemini provides numeric weighted scores (0.40/0.25/0.20/0.15).

**Certainty.**
- Claude: 20 rendezvous/yr feasible <1 %, high confidence.
- Gemini: impossible >99 %, high confidence.
- GPT: rendezvous at 20/yr "not a credible baseline". High confidence that spectra alone do not demonstrate extraction. Medium confidence that rendezvous improves characterisation.

**Trade-off and sensitivity reclassification.**
- Claude: mode is a sensitivity point (it drives Δv, mass and cost), not a trade-off point for the rate.
- Gemini: breadth vs depth is a trade-off point, "strongly" tilted to depth by false-positive cost. Target water fraction is a sensitivity point.
- GPT: depth vs speed/cost is "a genuine trade-off, not a fact to average". Dwell time is a sensitivity point.

**Falsifiers.**
- Claude: retrospective pre-screen hit-rate test.
- Gemini: 5-target ground-truth sampling.
- GPT: value-of-information study showing cheaper measurements give equivalent decisions.

### D-B. Fleet size and tranching
(Claude D2, Gemini D2, GPT D2)

**Weakest link: information (all three agree).** There is no target catalogue or trajectory study, and no hit-rate or reliability data.

**Missing or unsupported steps identified.**
- Claude: round 1 anchored on the BOM figure of 32.
- Claude: round 1 preserved Gemini's round-1 "high" confidence without flagging that it rested only on the number under review. Claude calls this a reasoning failure.
- Claude: round 1 admitted the information gaps but did not lower its confidence labels.
- Claude: notes Gemini's round-1 arithmetic error (32 × 1–2 ≠ 30–50).
- GPT: twelve, sixteen and thirty-two are "options, not evidence-derived answers".
- GPT: the previous reconciliation substituted "an envelope of opinions for a decision basis".

**ACH outcomes.**
- Claude: H2 (8–20) is least disconfirmed.
- Gemini: H2 (16) is "consistent" on budget and attrition; H3 (12) is "vulnerable".
- GPT: GRADE EtD shows strong evidence that the old count is unsupported, but weak evidence for any replacement.

**Trade-off reclassification.**
- Claude: coverage probability vs cost is a values question.
- GPT: more simultaneous targets trades money for schedule and success probability.

**Reversibility.**
- Claude: two-way door if batch-gated; a single 32-unit buy is one-way.
- Gemini: two-way via pathfinders; one-way at full production.
- GPT: initial tranches reversible, full production less so.

### D-C. Flyby vs rendezvous
(Claude D3; Gemini inside D1; GPT inside D1 and "Disposition")

**Weakest link.**
- **Claude: values.** No model stated the cost of a wrong commit. Claude argues a 5 % reduction in wrong-commit probability at ~$10B scale is worth ~$0.5B.
- Gemini and GPT do not name a separate weakest link for this decision.

**Trade-off reclassification.**
- **Claude and GPT:** a values trade-off, settled by stating the acceptable false-commit risk.
- **Gemini:** a trade-off point, resolved in favour of depth.

**Certainty.**
- Claude: rendezvous-primary ~70 % preferable, low–medium confidence.
- Gemini: flyby data insufficient to certify an excavation site 90–95 %, high confidence.

### D-D. Cost scope
(Claude D4, GPT D5)

**Weakest link.**
- **Claude: reasoning.** Round 1's "$10–35M" envelope mixed flyaway, hardware-plus-NRE and programme scopes.
- **GPT: commitment.** Round 1 added scope without an owner or funding boundary.

**Missing steps.**
- Claude: state the scope before the range.
- GPT: the reserve percentage needs a risk model, and services must not be double counted.

**Certainty.**
- Claude: $5M unit <5 % likely, high confidence; its $22M nominal is ~50 % likely within ±30 %, low confidence.
- GPT: high confidence that launch, ops and development must be funded; low confidence in $0.5–1.2B, and exceeding it is plausible.

**Trade-off identified.** GPT names compression (science detail) vs antenna use, and shared infrastructure (less duplication) vs coordination dependence.

**Gemini** has no separate cost decision. It assigns medium confidence to $25M.

### D-E. Authority after P0-F16
(Claude D5, GPT D5)

**Weakest link: commitment (Claude and GPT agree).** No owner or change process is named, and a human or named technical authority is required.

**Frame correction (Claude).** This is a decision-rights question (RAPID/DACI), but round 1 treated it as content among three positions.

**Gemini** does not address this decision.

### D-F. Downstream gate
(Claude D6; GPT D1 and Gates A–C; Gemini D1 consequences)

**Weakest link.**
- **Claude: alternatives.** Round 1 did not consider bom-0-2 unit 1 as the ground-truth demonstrator.
- **GPT: values** (shared with D-A).
- Gemini names none for this decision.

**Trade-off reclassification.** Claude classes schedule vs commit risk as a values decision for the programme.

**Unsupported step (GPT).** A fixed 3–5 yr gate is a forecast, not a pass criterion.

**Divergence on gate severity.** This remains open: see §3.12.

### D-G. Mass, propulsion and multi-target ambition
(GPT D3 only)

**Weakest link: reasoning.** Round 1 stepped from ideal Δv to an encounter count without justification. GPT says Claude's round-1 rocket-equation result (6.76 km/s) is correct but its 2–4 rendezvous claim "does not follow". It also says Gemini's round-1 "≤3.5 km/s" contradicts its own inputs (8.75 km/s).

**Trade-offs.** Propellant fraction vs dry-mass allowance; larger arrays vs mass and complexity.

**Sensitivity points.** Solar distance and EP lifetime.

### D-H. Payload and the resource claim
(GPT D4 only)

**Weakest link: information.** Detection thresholds and the resource/process correlation are missing.

**Method.** ACH across extractable ice, bound hydration with poor recovery, and an unrepresentative surface signature. Hydration-band evidence is "not strongly discriminating by itself".

**Trade-off.** Instruments compete for mass, power and cost, which makes this a value choice once performance is measured.

---

## Reviewer note

These items were not raised by any model, or are internal inconsistencies within a submission. No new technical position is taken here.

1. **Provenance defect persists in round 2.** All three header/YAML model names disagree. Claude and GPT both flagged this defect in round 1, but none of the three responses noted it in its own submission.

2. **Gemini's Δv and propellant figures are internally inconsistent.**
   - Gemini's own calculation note gives ~7.6 km/s for 65 kg at 2,100 s.
   - It specifies 3.2 km/s and attributes the 65 kg to the formula with Δv = 3.2 km/s.
   - It then explains the gap as low-thrust losses and contingency.
   - The reviewer should confirm which figure is intended.

3. **Gemini uses two different hit-rate assumptions.** Its fleet-sizing warrant uses a 65 % qualification yield. Its D1 key assumption uses a ≥20 % pre-screen probability. Its D2 ACH also refers to "60 % success/viability".

4. **Gemini's ground time may not cover its own per-target volume.** It allocates 10–50 kbps and 200 h/yr per satellite. Its per-target volume is 5–20 GB. The reviewer may wish to check whether these close. GPT's general arithmetic for 1 GB at 10 kb/s (≈222 h) is relevant.

5. **Conflicting MarCO cost citations.** Claude gives ~$18.5M for two; Gemini gives ~$20M each. These need source verification.

6. **Self-referential model names.** Claude ("I side with GPT-6.1 Sol over Claude Opus 5.5 and Gemini 3.8 Flash") and Gemini ("Gemini favors 32 … this assessment favors 16") refer to round-1 positions under the current authors' names. This adds to the attribution ambiguity.

7. **Transport and ISPP P0-F16 discrepancies remain unverified.** No model had the specs, so this finding is confirmed only for prospecting.

8. **Only GPT states the cost-basis year (2026 USD) and computes the phase-total impact.** Claude's and Gemini's totals are not year-stamped.
