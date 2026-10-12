---
phase: phase-0
item: bom-0-1
round: 2
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:10:45.484Z
seconds: 237.77
---

# bom-0-1 Prospecting Satellites: Round 2 Re-assessment (phase-0)

**Basis.** I used the BOM table, the 2026-01-31 consensus, the divergent-views file, findings P0-F06 and P0-F16, and the round-1 reconciliation. I have not seen the transport or ISPP spec files. I also have no target catalogue or trajectory runs. Every Δv and fleet figure below is therefore a sizing estimate, not an optimised result.

---

## 1. Findings

### P0-F06: "20 asteroids per satellite per year is not reachable by a 100 kg spacecraft"

**Verdict: agree on substance. I partly disagree with the title's causal claim.** Mass is not the binding limit. Δv per target, transfer time and encounter geometry are. A heavier craft does not fix the rate; it only moves it from about 0.3 to about 0.6 targets per year.

**What "survey" can mean, and what each meaning supports:**

| Mode | Per-target cost driver | Achievable rate per craft | Can it inform bom-0-2/0-3/0-6? |
|---|---|---|---|
| **Rendezvous** (station-keep, map, gravity) | 1–3 km/s from C3≈0 for the most accessible NEAs. Inter-NEA hops are typically 1.5–4 km/s, with 1–3 yr transfers | ~0.2–0.5 /yr; 1–3 over a 7 yr life | Yes. Resolved mineralogy, shape, mass and density, regolith context |
| **Flyby tour** | Retargeting is cheap (tens to hundreds of m/s) but needs geometric alignment. Encounters are minutes long at 5–15 km/s | ~0.5–1.5 /yr | Weakly. Disk-integrated or coarse spectra, rough size and albedo. No mass, porosity or regolith data |
| **Remote** (small telescope in heliocentric orbit) | Aperture and SNR | Tens to hundreds of objects per year | Population triage only. It duplicates SPHEREx (launched 2025, 0.75–5 µm all-sky spectrophotometry), NEO Surveyor (planned ~2027, thermal IR) and IRTF-class ground spectroscopy |

**Rocket-equation check (rendezvous):**
- Δv = Isp·g₀·ln(m₀/m_f).
- For 200 kg wet at Isp 1,600 s (Hall, Xe/Kr), 20 rendezvous × ~2 km/s = 40 km/s gives a mass ratio of e^(40,000/15,700) ≈ 12.8. That is ~92 % propellant, which is physically impossible for this class.
- Even at Isp 3,000 s (gridded ion) the ratio is 3.9, i.e. 74 % propellant. Thrust time also explodes.
- At ~1 kW and ~55 mN, the acceleration on 150 kg is 3.7×10⁻⁴ m/s². Each 2 km/s hop then needs ~63 days of continuous thrust, before power derating and coast arcs.
- So 20 rendezvous per year is roughly 50–100× beyond what is achievable. **Very unlikely (<1 %), high confidence.**

**Proposed change:**
- Define "survey" as **rendezvous characterisation of pre-screened targets**.
- Replace the rate with a **fleet deliverable: 15–20 characterised targets (range 10–30) within ~5 yr of first launch**.
- Size Δv and fleet from that deliverable (§2). Remote triage is not this item's job; it comes from SPHEREx, NEO Surveyor and ground data (§4).

### P0-F16: "Consensus documents disagree with the BOM they describe"

**Verdict: agree.**

- **Prospecting.** I verified the discrepancy directly: the consensus says 50 units / $250M, the BOM says 32 units / $160M. The consensus also states "All models agree … 50 satellites", which contradicts the BOM it is supposed to describe.
- **Transport.** The BOM row for bom-0-4 does specify krypton/iodine. I cannot see the transport consensus, so I accept the "all assume xenon" discrepancy as reported but unverified.
- **ISPP.** The same applies to the ISPP lunar-vs-NEA conflict.

**Additional problems:**
1. The BOM labels the $5M unit cost **"high" confidence**. No deep-space smallsat heritage supports that (§2).
2. The round-1 reconciliation has its own provenance defect. Response headers and YAML model fields disagree for all three responses. Regenerating consensus "from the current specs" is ill-posed until it is clear which specs exist and who wrote them.

**Proposed change:**
- The **configuration-controlled BOM line is authoritative**, revised only through a recorded change request.
- Consensus documents are **derived artefacts**. They should be regenerated after each BOM change and stamped with the BOM version and input-spec hashes.
- A newer model version is not by itself authoritative. On this I side with GPT-6.1 Sol over Claude Opus 5.5 and Gemini 3.8 Flash.

---

## 2. Revised specification

Sizing chain: required targets, then hit rate, then attrition, then targets per craft, then Δv, then mass and power.

**Fleet sizing (judgement plus binomial check):**
- Phase 0 needs roughly **2 commit-grade targets**: one prime and one backup for bom-0-2/0-6.
- Assume a pre-screened hit rate of p = 0.15–0.30 (Claude's figure; unvalidated).
- Probability of at least 2 hits from n characterisations at p = 0.2:
  - n = 15 gives 1 − 0.8¹⁵ − 15(0.2)(0.8¹⁴) = 0.83.
  - n = 20 gives 0.93.
  - So **15–20 characterisations** are needed.
- Deep-space smallsat attrition is high:
  - AstroForge Odin was lost after launch (2025).
  - NEA Scout was never contacted.
  - Lunar Flashlight's propulsion failed.
  - LunaH-Map could not reach lunar orbit because its propulsion failed.
  - MarCO A/B both succeeded.
  - About half the Artemis I cubesats met their objectives.
  - For 150–250 kg class units with a pathfinder learning cycle I assume **mission survival of 70–85 %**.
- Craft needed = 15–20 / (1.5–2.5 targets per surviving craft × 0.7–0.85) ≈ **8–19, nominal 12**.

**Δv and mass:**
- Assume a dedicated or deep-space rideshare injection to C3 ≈ 0–2 km²/s².
- Budget: first NEA 1.5–3 km/s, second NEA 1.5–3 km/s, plus ~10 % margin, giving **5 km/s (4–6.5)**.
- At Isp 1,600 s: m₀/m_f = e^(5,000/15,700) = 1.375. On 200 kg wet that is **~55 kg propellant** and ~145 kg dry.
- **GTO-rideshare penalty.** A low-thrust escape from GTO adds roughly 2–3 km/s and ~1 yr. This is why "design for rideshare" in the consensus is not free (see the Janus point in §6).

**Thrust time and life:**
- At 1 kW and ~55 mN, ṁ ≈ 3.4 mg/s, so 55 kg takes ~4,500 h of firing.
- That is comparable to the qualified lifetimes of 0.6–1.5 kW Hall thrusters. Throughput qualification is a real risk item.

**Iodine caution:**
- Flown iodine EP is tens of watts, ~1 mN: ThrustMe NPT30-I2 (2020) and Busek BIT-3.
- At 1.1 mN on 180 kg, 2.5 km/s takes ~13 yr.
- Commonality with bom-0-4 on iodine therefore needs a ~1 kW iodine Hall thruster, which is not flight-proven. Krypton is the more realistic commonality choice. Its storage density is ~2× worse than xenon, so tank mass rises.

| Parameter | Old | New (nominal) | Range | Basis | Confidence |
|---|---|---|---|---|---|
| Mission definition | "Survey 20+/sat/yr" | Rendezvous characterisation of pre-screened NEAs | — | calculation | high |
| Fleet deliverable | unspecified | 18 characterised targets | 10–30 | calculation / judgement | low |
| Fleet size | 32 (BOM) / 50 (consensus) | 12 (2 pathfinders + 10 gated) | 8–20 | calculation | low |
| Targets per craft | 20/yr | 2 over life | 1–3 | calculation | medium |
| Onboard Δv (post-injection) | unspecified | 5.0 km/s | 4–6.5 | calculation | medium |
| Wet mass | 80–120 kg | 200 kg | 170–250 | calculation | medium |
| Propellant (Xe or Kr) | unspecified | 55 kg | 40–75 | calculation | medium |
| Array power, BOL at 1 AU | unspecified | 1.2 kW | 1.0–1.8 | calculation | medium |
| Main propulsion | monoprop/EP/hybrid | ~1 kW Hall EP + green-monoprop or cold-gas RCS for proximity ops | — | literature | medium |
| Spectral range | 0.4–2.5 µm | 0.4–3.6 µm (or 2.5 µm + dedicated 2.6–3.6 µm channel) | 3.2–4.3 µm upper | literature (NIRS3, OVIRS) | medium |
| Thermal IR | optional | 8–14 µm microbolometer, 1–2 kg | — | judgement | medium |
| Design life | 7 yr | 5 yr primary, 7 yr goal | 5–8 | judgement | medium |
| Survival assumption | unspecified | 0.8 | 0.7–0.85 | literature / judgement | low |
| Recurring unit cost | $5M (high) | $22M | 15–35 | literature / judgement | low |
| NRE | unspecified | $110M | 80–160 | judgement | low |
| BOM line (hardware + NRE) | $160M | $375M | 260–580 | calculation | low |

**Cost heritage.**
- NASA SIMPLEx missions are capped at ~$55M each, and several overran or slipped: Janus, Lunar Trailblazer, LunaH-Map.
- MarCO cost ~$18.5M for two 13.5 kg flyby-relay cubesats.
- No 200 kg, 5 km/s EP rendezvous craft has been flown near $5M.

**Lifecycle total.**
- Launch: $40–150M, e.g. one dedicated medium launch to C3≈0 carrying 8–10 craft (~2 t) plus pathfinder rideshare.
- Operations: $70–175M over 7 yr.
- Line plus these gives a lifecycle of **~$0.4–0.9B**.

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-2 Mining Robots | data | Per-target product, 0.5–3 GB compressed: shape model, mass and density, mineral maps, thermal inertia, boulder and regolith context. Optional nav beacon (not baseline) | false (no data or acceptance spec) |
| bom-0-3 Processing Station | data | Bulk composition class and metal/hydrated-silicate fractions for process design. Requires a defined acceptance threshold | false |
| bom-0-4 Transport | data / propellant | Target accessibility list. Propellant commonality: Kr 0.5–0.9 t one-time (≈0.1 t/yr), negligible against bom-0-4 demand | false |
| bom-0-5 Solar Power | power | 0 MW (self-powered, ~1.2 kW per craft) | true (correctly none) |
| bom-0-6 ISPP | data | Hydration band depth (~2.7–3 µm), thermal inertia, optional GRNS hydrogen (rendezvous only). **Cannot by itself establish recoverable water** | false |
| bom-0-7 Organisation | other | Data rights, target-claim policy under the Outer Space Treaty, US/Luxembourg/UAE/Japan resource laws, DSN/ESTRACK agreements | false |
| Ground segment (new) | data | 10–50 kbps X-band at 0.2–0.5 AU to a 34 m dish. Estimate: ~3.8 W RF / MarCO-class radios give ~8 kbps at 1 AU to 70 m; scale −6 dB for 34 m and +6 to +14 dB for distance. 1 GB at 20 kbps ≈ 110 h. Fleet needs ~3,000–6,000 antenna-h/yr | false |

Gemini's 50–200 GB per target does not close. At 100 kbps, 100 GB takes ~93 days of continuous downlink per target. It should be dropped.

---

## 4. Missing items or scope

1. **Launch and injection to C3 ≈ 0** ($40–150M). The architecture assumes it, but no line provides it.
2. **Deep-space ground segment and mission operations** ($70–175M over 7 yr). DSN is oversubscribed, and commercial deep-space apertures are limited.
3. **Target-screening programme** ($5–20M). This covers SPHEREx and NEO Surveyor data access, IRTF/Keck NIR spectroscopy time, and a NHATS-type accessibility analysis. Without it the hit-rate assumption is not credible.
4. **Resource ground-truth step** ($50–200M, judgement). This could be a sampling or extraction test, or an instrumented touch-and-go.
   - OSIRIS-REx is the evidence. Remote OVIRS correctly identified hydrated phyllosilicates on Bennu.
   - But the regolith's near-zero cohesion was not predicted: the TAG head sank ~0.5 m (Lauretta et al. 2022, *Science*; Walsh et al. 2022, *Sci. Adv.*).
   - That is exactly the property bom-0-2 and the bom-0-6 bucket-wheel depend on.
5. **A schedule gate in the phase plan.** bom-0-2, 0-3 and 0-6 procurement depends on prospecting results 3–5 yr after launch. No gate currently exists.
6. **Attrition and spares policy.** Not budgeted anywhere.

---

## 5. Remaining disagreements and open questions

- **Flyby scouts versus all-rendezvous.** This is a **trade-off point**: more targets triaged per dollar against less decision-grade information per target. It is a values question about the acceptable risk of a wrong commit, not a fact to settle. I lean all-rendezvous, because remote triage is already available externally. Claude's mixed fleet is defensible.
- **Small (200 kg, ~5 km/s) versus larger (~300 kg, ~10 km/s) craft.** Cost per characterised target is unresolved. A larger craft reduces launch slots but concentrates the loss risk.
- **Number of commit-grade targets.** It is 2 if the plan commits to one site, and possibly 3–5 if bom-0-2 and bom-0-6 target different bodies (metal vs hydrated). This choice moves the fleet size by ~2×.
- **Kr versus Xe.** Fleet xenon of ~0.7 t is a small fraction of world supply, so the bom-0-4 constraint does not bind here. Commonality is a logistics preference, not a necessity.
- **Ground truth.** Is a sampling or extraction test mandatory before the $10B station? I think yes. Others may accept remote data plus a small first robot (bom-0-2 unit 1) as the test.

---

## 6. Decision-quality critique

**Methods used.**
- Composite Scaffold for each decision.
- **ACH** on fleet size, because round 1 shows anchoring on the BOM number.
- **GRADE EtD** on the schedule gate, because that is where the unstated values sit.
- **QOC** on flyby versus rendezvous.
- Cost of Delay and reversibility from §8 of the reference.

### D1. Redefine "survey" and drop the 20/yr rate (blocking)

1. **Frame.** A property decision on bom-0-1, cheaply reversible on paper. Complicated (Cynefin): the physics is knowable.
2. **Criteria.** Decision value for downstream commits (0.5), cost (0.25), schedule (0.15), duplication with external assets (0.10). These weights are mine; round 1 stated none.
3. **Options.** Rendezvous; flyby tour; remote telescope; hybrid; **null: buy or use external data only**. Round 1 never evaluated the null.
4. **Matrix.**
   - Rendezvous scores high on decision value and medium on cost.
   - Flyby is medium on cost and low on value.
   - Remote is low on value and duplicates SPHEREx/NEO Surveyor.
   - The null is lowest on cost but cannot see regolith, mass or density.
5. **Sensitivity point.** Mode drives Δv, and therefore mass and cost. It is not a trade-off point for the rate itself.
6. **Certainty.** "20 rendezvous/yr infeasible": very unlikely to be feasible (<1 %), **high confidence** (robust physics, full agreement).
7. **Key assumption.** External surveys can pre-screen to p ≥ 0.15. *Falsifier:* retrospective test, i.e. the fraction of IRTF/SPHEREx-classified NEAs with spectral types confirmed by spacecraft or sample data.
8. **Decision.** In the context of a phase that commits >$13B downstream, facing infeasible rendezvous rates and duplicated remote assets, choose rendezvous characterisation of a pre-screened list, to obtain decision-grade data, accepting ~2 targets per craft.
9. **Consequences.** This unlocks fleet sizing, and it creates the screening-programme and ground-segment lines.

**Weakest link: frame.** Round 1 answered "what kind of satellite" without first asking "what information does the phase need to commit, and is a satellite fleet the cheapest source".

### D2. Fleet size, 12 / 16 / 32 (blocking for cost)

**ACH.**

| Evidence | H1: 32 is right | H2: 8–20 is right | H3: <8 / external data suffice |
|---|---|---|---|
| Need ~2 commit targets at p 0.15–0.3 | inconsistent (oversized ~2×) | consistent | partly (needs high p) |
| Attrition 15–30 % | neutral | consistent | inconsistent (single loss is fatal) |
| 32 came from the BOM, not from analysis | disconfirms (anchoring) | — | — |
| Gemini's arithmetic errors (32 × 1–2 ≠ 30–50) | disconfirms | — | — |
| No trajectory study exists | weakens all | weakens all | weakens all |

H2 is least disconfirmed. Round 1 preserved Gemini's "high" confidence without flagging that its only grounds were the number under review. Preserving a divergence is right; not labelling its evidential basis is a reasoning failure.

**Scaffold notes.**
- **Decision type.** An executive/existence decision, semi-reversible. Gated batch procurement makes it a two-way door. A single 32-unit buy would be one-way.
- **Trade-off point.** Fleet size pushes coverage probability and cost in opposite directions, so it is a values question about how much ensures ≥2 hits.
- **Certainty.** The optimum lies in 8–20: *likely* (~65 %), **low confidence** (no trajectory study).
- **Falsifier.** A NHATS-based multi-rendezvous accessibility study showing fewer than ~30 candidates reachable at ≤3 km/s per hop within the launch window. That would push towards H3 plus a larger craft.
- **Weakest link: information.** No catalogue, hit rate or attrition data were used. Round 1's coverage-gap note admitted this but did not lower the confidence labels accordingly.

### D3. Flyby scouts versus all-rendezvous (QOC)

- **Question.** Does a cheap flyby tier improve cost per *validated* candidate?
- **Options.** All-rendezvous; 2:1 mixed; flyby-heavy.
- **Criteria.** Information per target, targets triaged, cost, attrition robustness.
- **Assessment.** Flyby gains on triage and robustness (more units). It loses on information and duplicates external remote triage.
- This is a **trade-off point**, so it should be resolved by stating the acceptable false-commit risk, not by more argument.
- **Weakest link: values.** No model stated how much a wrong commit costs. At bom-0-3 scale (~$10B), even a 5 % reduction in the probability of a wrong commit is worth ~$0.5B. That justifies rendezvous-grade data over flyby savings of tens of millions.
- **Certainty.** Rendezvous-primary is *likely* preferable (~70 %), low–medium confidence.

### D4. Unit cost and cost scope

- **Frame defect.** Round 1's "consolidated $10–35M" envelope mixes flyaway, hardware-plus-NRE and full-programme scopes. Taking the envelope of incompatible quantities is not a consensus.
- **Decision.** State the scope first, then the range. My figures: recurring $15–35M; line $260–580M; lifecycle $0.4–0.9B.
- **Certainty.** $5M per unit is very unlikely (<5 %), high confidence. My nominal $22M is *about as likely as not* to be within ±30 %, low confidence.
- **Falsifier.** Firm vendor quotes for a ~1 kW EP deep-space bus, or pathfinder actuals.
- **Weakest link: reasoning**, specifically the scope mixing.

### D5. Authority after P0-F16

- **Frame.** This is decision *rights* (RAPID/DACI), not decision content. Round 1 treated it as a content disagreement among three positions.
- **Options.** Newest model; current BOM; configuration-controlled baseline with derived consensus.
- **Assessment.**
  - "Newest model" fails, because model provenance in round 1 is itself unverifiable.
  - "Current BOM" entrenches an unsupported $5M "high" figure.
  - Only the third option survives.
- **Certainty.** Configuration control is the right answer: *very likely*, high confidence. This is standard systems-engineering practice.
- **Weakest link: commitment.** No owner or change process is named. A human programme authority must be assigned.

### D6. Gate bom-0-2/0-3/0-6 on prospecting results (blocking for the phase; GRADE EtD)

| EtD element | Assessment |
|---|---|
| Benefits | Avoids committing ~$13B to an uncharacterised body. OSIRIS-REx regolith shows surprises are realistic |
| Harms | 3–5 yr delay to downstream procurement |
| Certainty of evidence | Moderate that remote data plus rendezvous change target choice. **Low** that they establish ore grade or excavability (GPT is correct) |
| Values | How much schedule is the project willing to trade for risk reduction? Unstated by all three models |
| Resources | Gate cost ≈ $0.4–0.9B plus a $50–200M ground-truth step, against $13B at risk |
| Feasibility | Moderate; launch windows and DSN capacity are constraints |
| Acceptability | Long-horizon project (bom-0-7 assumes multi-century); a 3–5 yr gate is proportionate |

- **Cost of Delay.** Downstream long-lead design can proceed in parallel, so only fabrication commitment is gated. The real delay cost is far smaller than 3–5 yr of the whole phase. Real-options logic favours the gate.
- **This is a trade-off point** (schedule against commit risk), so it is a values decision for the programme.
- **Certainty.** Gating plus ground truth is the better decision: *likely* (~75 %), medium confidence.
- **Falsifier.** A demonstration that bom-0-2/0-6 designs are robust across the full plausible regolith-property envelope, i.e. site-agnostic. That would shrink the gate's value.
- **Weakest link: alternatives.** Round 1 did not consider making bom-0-2 unit 1 the ground-truth demonstrator, which may be cheaper than a separate one.

---

```yaml
item: bom-0-1
model: claude-opus-4-7
findings:
  - id: P0-F06
    verdict: agree
    summary: 20 rendezvous per craft per year is infeasible by roughly 50-100x on rocket-equation and thrust-time grounds, but the binding limit is per-target delta-v and geometry, not spacecraft mass.
    proposed_change: Define survey as rendezvous characterisation of externally pre-screened NEAs, with a fleet deliverable of about 18 characterised targets, 2 per craft, 5 km/s onboard delta-v and 12 craft (8-20).
  - id: P0-F16
    verdict: agree
    summary: The prospecting consensus (50 units / $250M, "all models agree") contradicts the BOM (32 / $160M), and the BOM's $5M "high" confidence is itself unsupported; the transport and ISPP discrepancies are accepted as reported but unverified here.
    proposed_change: Make the configuration-controlled BOM line authoritative via change requests, and regenerate consensus as a derived artefact stamped with the BOM version and input-spec hashes after model provenance is verified.
revised_spec:
  - parameter: mission_definition
    old: survey 20+ asteroids per satellite per year
    new: rendezvous characterisation of pre-screened NEAs
    range: [rendezvous, rendezvous]
    unit: mode
    basis: calculation
    confidence: high
  - parameter: fleet_characterised_targets
    old: unspecified
    new: 18
    range: [10, 30]
    unit: targets
    basis: calculation
    confidence: low
  - parameter: fleet_size
    old: 32
    new: 12
    range: [8, 20]
    unit: spacecraft
    basis: calculation
    confidence: low
  - parameter: targets_per_craft
    old: 20 per year
    new: 2
    range: [1, 3]
    unit: rendezvous per life
    basis: calculation
    confidence: medium
  - parameter: onboard_delta_v
    old: unspecified
    new: 5.0
    range: [4.0, 6.5]
    unit: km/s
    basis: calculation
    confidence: medium
  - parameter: wet_mass
    old: 80-120
    new: 200
    range: [170, 250]
    unit: kg
    basis: calculation
    confidence: medium
  - parameter: propellant_mass
    old: unspecified
    new: 55
    range: [40, 75]
    unit: kg Xe or Kr
    basis: calculation
    confidence: medium
  - parameter: array_power_bol_1au
    old: unspecified
    new: 1.2
    range: [1.0, 1.8]
    unit: kW
    basis: calculation
    confidence: medium
  - parameter: spectral_upper_limit
    old: 2.5
    new: 3.6
    range: [3.2, 4.3]
    unit: um
    basis: literature
    confidence: medium
  - parameter: mission_survival_assumption
    old: unspecified
    new: 0.8
    range: [0.7, 0.85]
    unit: fraction
    basis: judgement
    confidence: low
  - parameter: recurring_unit_cost
    old: 5
    new: 22
    range: [15, 35]
    unit: USD million
    basis: literature
    confidence: low
  - parameter: nre
    old: unspecified
    new: 110
    range: [80, 160]
    unit: USD million
    basis: judgement
    confidence: low
  - parameter: downlink_rate
    old: unspecified
    new: 20
    range: [10, 50]
    unit: kbps X-band to 34 m at 0.2-0.5 AU
    basis: calculation
    confidence: medium
interfaces:
  - with: bom-0-2
    flow: data
    value: 0.5-3 GB compressed per target (shape, mass/density, mineral and thermal maps)
    in_bom: false
  - with: bom-0-3
    flow: data
    value: bulk composition class per target, acceptance threshold undefined
    in_bom: false
  - with: bom-0-4
    flow: propellant
    value: 0.5-0.9 t Kr or Xe one-time (about 0.1 t/yr), plus accessibility data
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0 MW (self-powered, about 1.2 kW per craft)
    in_bom: true
  - with: bom-0-6
    flow: data
    value: 2.7-3 um hydration band depth and thermal inertia per target; not sufficient for recoverable water
    in_bom: false
  - with: bom-0-7
    flow: other
    value: data rights, resource-law compliance, ground-station agreements
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-1
    quantity: 12 (2 pathfinders + 10 gated)
    unit_cost_usd: [22000000, 48000000]
    rationale: Rendezvous-only sizing from 18 targets at 2 per craft with 0.8 survival; unit cost includes amortised NRE, hardware only.
  - action: add
    item: Launch and injection to C3~0 (phase-wide)
    quantity: 1
    unit_cost_usd: [40000000, 150000000]
    rationale: GTO rideshare adds 2-3 km/s and about 1 yr, so deep-space injection must be explicitly funded.
  - action: add
    item: Deep-space ground segment and mission operations (7 yr)
    quantity: 1
    unit_cost_usd: [70000000, 175000000]
    rationale: About 3,000-6,000 antenna-hours/yr are needed and DSN is oversubscribed.
  - action: add
    item: Target-screening and accessibility programme
    quantity: 1
    unit_cost_usd: [5000000, 20000000]
    rationale: The hit-rate assumption depends on SPHEREx, NEO Surveyor and ground spectra plus trajectory analysis.
  - action: add
    item: Resource ground-truth step (sampling or extraction test, possibly bom-0-2 unit 1)
    quantity: 1
    unit_cost_usd: [50000000, 200000000]
    rationale: Bennu showed that remote spectra did not predict the regolith mechanics that mining and ISPP depend on.
open_questions:
  - How many NEAs are reachable at 3 km/s or less per hop for two-target rendezvous sequences in the planned launch window (NHATS-type study)?
  - What is the validated hit rate of external pre-screening for commit-grade targets?
  - How many commit-grade targets does the phase need (2 for a single site, or 3-5 if metal and water targets differ)?
  - What false-commit risk is acceptable, which decides flyby versus rendezvous and fleet size?
  - Is a 1 kW-class krypton or iodine Hall thruster qualified for about 4,500 h throughput, or is xenon retained?
  - Can bom-0-2 unit 1 serve as the ground-truth demonstrator instead of a separate mission?
  - Who holds configuration authority for the BOM, and how is model provenance verified before consensus regeneration?
```
