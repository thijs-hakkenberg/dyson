---
phase: phase-0
item: bom-0-4
round: 2
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
framework: 18f503fe4ec6
generated: 2026-10-12T10:15:08.213Z
---

# Reconciliation: bom-0-4 Transport Vehicles (Phase 0, Round 2)

**Panel:** Claude Opus 5.5 ("Claude"), Gemini 3.8 Flash ("Gemini"), GPT-6.1 Sol ("GPT").
Attribution follows the response headers. The YAML `model:` fields do not match those headers; see the Reviewer note.

**Status:** Everything below consolidates panel positions for human review. No item is approved.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F01** Transport capacity vs. station throughput | agree | agree | **partly** |
| **P0-F10** Crew transport/habitation not budgeted | agree | agree | agree |
| **P0-F11** Tug propellant not in BOM; ISPP has no consumer | agree | agree | **partly** |
| **P0-F15** Deliberations not written back | agree | agree | **partly** |
| **P0-F16** Consensus vs. BOM disagree | agree | agree | agree |

**Where the panel stands on each finding**

- **P0-F01.** All three accept that the shortfall blocks the design.
  - All three reject round 1's 15–25 MWe figure for 50 kt/yr.
  - GPT's "partly" covers two points: the finding overstates array output, and it treats the outbound leg as if the vehicle were loaded.
  - Claude also says the finding's power figure is slightly optimistic, but still records "agree".
- **P0-F10.** Unanimous that bom-0-4 should be uncrewed. The panel differs on what interface hardware to keep (see §3).
- **P0-F11.** All three accept that the propellant supply chain is missing and that ISPP has no Phase 0 consumer.
  - GPT's "partly" rests on two points: the round-1 "100 t per trip" figure is not universal, and the xenon and krypton supply figures are unsourced.
- **P0-F15.** All three want a formal disposition process.
  - GPT cannot verify the "eight of nine" count from the supplied records.
  - GPT also objects to importing concluded deliberations automatically. Gemini makes the same objection.
- **P0-F16.** Unanimous that the documents conflict and that neither closes on physics.
  - All three treat the BOM as the administrative baseline, with different emphasis.
  - GPT states it cannot regenerate the consensus from specifications it was not given.

---

## 2. Agreed changes

These are changes all three models support. Where values differ, the consolidated range is the union of the three ranges, and each model's point value is shown.

| Parameter / change | Claude | Gemini | GPT | Consolidated |
|---|---|---|---|---|
| bom-0-4 crewing | Uncrewed | Uncrewed | Uncrewed | **Uncrewed cargo tug** |
| Human-rating label, 3g load case, crew kits | Remove | Remove | Remove | **Remove** (interface retention diverges, §3.4) |
| Fleet quantity | 15 (10–20) | 15 (12–18) | 15 positions (12–20); 12 operational | **15 (10–20)** |
| Payload per trip | 200 t (100–250) | 200 t (150–250) | 200 t (150–250) | **200 t (100–250)** |
| Fleet delivered mass | 1.0 kt/yr (0.5–2) | 1.1 kt/yr (0.8–1.4) | 1.0 kt/yr (0.6–1.5) | **~1 kt/yr (0.5–2)** |
| Transport-fed station throughput | Cap at ≤2 kt/yr pending trade | Resize to 1–2 kt/yr pilot | Provisional 1–2 kt/yr pilot | **1–2 kt/yr pilot** (station cost diverges, §3.6) |
| EP propellant demand (new supply line) | 300 t/yr (150–600) | 350 t/yr | 350 t/yr (200–600) | **~300–350 t/yr (150–600)** |
| Xenon as production propellant | Excluded on supply | Excluded ("fatal") | Not a production candidate; permitted for tests | **Not baselined for production** (reason diverges, §3.2) |
| ISPP (bom-0-6) deployment | Defer to Phase 0B | Defer to Phase 0B | Defer to Phase 0B | **Defer to Phase 0B** (BOM action type diverges, §4) |
| Current array output (300–500 m²) | ~75–150 kWe BOL | Old value "60–150 (derived)" | ~80–185 kW BOL | **Below the finding's 150–250 kWe** |
| Power to close 50 kt/yr by SEP | ~100–400 MWe | ~210 MWe | ≥225 MW energy floor; 0.3–1 GW envelope | **Hundreds of MWe; round-1 15–25 MWe rejected** |
| Unit recurring cost | $250M ($180–400M) | $240M ($190–320M) | $400M ($250–600M) | **Above $133M; $180–600M** (point value diverges) |
| Tug arrays costed inside bom-0-4, not bom-0-5 | Yes | Yes ("accounting distinction required") | Yes | **Split accounting** |
| rq-0-18 for tugs | Mostly rejected | Reject | Reject mandatory human-rating | **Reject for bom-0-4** |
| rq-0-14 ISPP to Phase 0B | Accept | Adopt | Accept deferral (adds conditions) | **Accept deferral** |
| rq-0-11 berthing | Despun/non-rotating hub | Non-rotating docking interfaces | Despun interface | **Tugs berth at a despun interface** |
| Missing scope: propellant supply, development/qualification, launch, thruster replacement, containers | Listed | Listed (no development line in §4, but in BOM delta) | Listed | **All five acknowledged** |

---

## 3. Preserved divergences

### 3.1 Vehicle design point: power per vehicle, array area, cadence

| Quantity | Claude | Gemini | GPT |
|---|---|---|---|
| EP power per vehicle | 300 kWe (200–500) | 350 kWe (300–500) | 0.8 MW usable at 1.3 AU EOL (0.6–1.2) |
| Array area | 1,300 m² (900–2,500), 1 AU EOL | 1,400 m² (1,200–2,000) | 5,000 m² (3,500–9,000), sized at 1.3 AU EOL |
| Thrust | 17 N (11–28) | 16.8 N | 41 N (25–70) |
| Isp | 1,800 s (1,500–2,500) | 1,950 s (1,750–2,200) | 2,200 s (1,800–2,800) |
| Dry mass | 35 t (25–50) | 32 t (28–40) | 40 t (30–70) |
| Round-trip Δv | ≤6 km/s target criterion (3–8) | 6.5 km/s (5–8.5) | 8 km/s reference (6–10) |
| Propellant per cycle | 60 t (45–85) | ~63 t (53 return + 10 outbound) | 67 t (40–120) |
| Cycle time | 2.5 yr (2–8 in YAML; may be window-limited 4–8), low confidence | 2.7 yr (2.2–3.5), **high** confidence | 2.5 yr (2–3.5), low confidence |
| Fleet EP power | 4.5 MWe (3–7.5) | Not stated as a fleet total | 12 MW usable |

**Claude's reasoning**
- Throughput is power-limited only up to about 300–500 kWe. Above that, the trajectory sets the cadence, so extra power buys cost without throughput.
- Round 1's 800 kWe and 1.5 MW designs "bought power their assumed cadence cannot use".
- Synodic periods of low-Δv NEAs (about 4–15 yr) may cap cadence further. This is the item's "single most important unverified assumption".

**Gemini's reasoning**
- A 350 kWe vehicle gives about 1.96 yr of return-leg thrusting.
- Adding outbound transit, phasing and docking gives 2.5–3.5 yr.
- Gemini rates its cycle time at high confidence.

**GPT's reasoning**
- At 0.8 MW, thrusting takes about 1.1 yr, or about 1.5 calendar years at 75% duty.
- An assumed 0.5–2 yr for coasts and operations is "an operational allowance, not trajectory proof".
- The array is rated at 1.3 AU EOL because sunlight there is 0.59 of the 1 AU value.
- GPT treats 0.8 MW as a planning value, not a down-select. It states that "fewer higher-power vehicles may outperform fifteen smaller ones".

**Tension to preserve.** Claude and GPT reach about 1 kt/yr with about 2.7× different per-vehicle power. By Claude's Step 6 logic, GPT's 0.8 MW point would sit in the trajectory-limited region. GPT holds that power "strongly affects thrust duration", and that restricting targets to cut power trades target flexibility against cost. The panel has not resolved this.

GPT also states that the previous round's "high confidence" cycle times were unjustified. Gemini's round-2 table again assigns high confidence to cycle time.

### 3.2 Propellant down-select and supply figures

| Position | Model | Reasoning |
|---|---|---|
| Krypton for pathfinders; iodine for production at PDR only if wear testing passes | Claude | Krypton has far higher heritage at power (Starlink; X3 at ~100 kW). Iodine wins on supply and tankage. The choice between schedule and supply risk is "a values question". |
| Iodine as baseline; krypton as secondary qualification path | Gemini | Noble-gas supply limits are binding. Solid storage at ~4.9 g/cm³. Accepts the qualification and corrosion burden. |
| No production selection until supply, performance and lifetime gates pass; iodine and krypton are candidates; xenon permitted for tests | GPT | Neither krypton supply figure is adequately sourced. Supplier contracts and representative qualification tests must decide. |

**Supply and readiness figures as stated by each model**

| Item | Claude | Gemini | GPT |
|---|---|---|---|
| Xenon world supply | ~50–100 t/yr; fleet = 3–10× output | ~50–70 t/yr; "impossible without ~6× expansion" | "Physically impossible" and "15–20×" are unsupported without a dated estimate. Unattractive is not the same as impossible. |
| Krypton world supply | ~300–700 t/yr, derived from Kr:Xe ratio, **low** confidence; fleet = 40–170% | ~800–1,200 t/yr, "industrial gas reports", **very high** certainty; fleet = 30–45% | No authoritative figure. The Kr:Xe ratio (~8 by mass) is a sanity check only. |
| Iodine world supply | ~30–33 kt/yr (USGS 2024); fleet ~1–2% | >35 kt/yr; fleet <1% | 30–40 kt/yr (USGS 2025) |
| ThrustMe I₂ flight power | "Tens of watts"; ~20 W thruster vs ~60 W system | — | ~50–60 W-class gridded-ion system |
| High-power iodine TRL | TRL 2–3 at ≥50 kW | TRL 3–4 at >20 kWe | Laboratory work only; not flight-qualified |
| Krypton "flight proven at >20 kWe" | Heritage at power cited from Starlink and ground tests (X3) | Marked "Consistent" in its ACH | X3 at 102 kW is ground-test evidence |
| Krypton storage | Supercritical in COPVs, ~10–15% tank fraction, ~100 m³ per 60 t | High-pressure (~300 bar), heavy | Ambient-temperature compressed; no cryogenics by default |

### 3.3 Propellant cost

| Model | Value |
|---|---|
| Claude | $0.15–0.9B/yr, from $500–3,000/kg delivered to cislunar space |
| Gemini | $150–300M/yr in §4; BOM delta lists $0.5–1.5M per tonne |
| GPT | Unpriced. Supplier-backed procurement is required first. |

Claude alone concludes that delivered ore at about $500–1,500/kg makes Phase 0 transport "a demonstration, not an economic supply chain".

### 3.4 What to keep from human-rating

| Position | Model | Reasoning |
|---|---|---|
| Keep an IDSS-compatible docking port (~0.3–0.6 t, a few $M per vehicle) with fault-tolerant docking avionics | Claude | A cheap real option that is useful for cargo berthing anyway. Claude classes Gemini's round-1 dissent as a values position on option value. |
| Keep standardised docking, power and data interfaces, not labelled human-rated | GPT | Generic interfaces are inexpensive options. Genuine crew compatibility "may constrain the entire vehicle"; "only 3 t" is not established. |
| Strip human-rating completely | Gemini | Minimum dry mass. Any future crew need gets a purpose-built high-thrust vehicle. |

**Related divergences on crew**

- **Station crewing.**
  - Claude: a crew decision gate at the bom-0-3 SRR, defaulting to uncrewed and teleoperated, with crew sorties at $1–8B/yr if quarterly visits are adopted.
  - GPT: remove quarterly visits and habitat from the station baseline; crew becomes a separately funded decision.
  - Gemini: remove crew provisions from bom-0-3.
- **Physical feasibility of crew carriage.**
  - GPT rejects "crew carriage is physically impossible" as too strong. Its position is that crew carriage is not justified for *this* tug.
  - Gemini rates crewed 2-yr transits as "extremely unlikely (<5%)".
  - Claude cites dose of ~0.5–1 Sv against a 600 mSv career limit (NASA-STD-3001).
- **Structural loads.**
  - Claude: launch loads (4–6 g) are the only real structural loads.
  - GPT: launch loads "may justify particular structural requirements", but a generic 3g case does not.

### 3.5 Phase architecture for the 50 kt/yr gap

| Model | Preferred option | Others kept open |
|---|---|---|
| Claude | H1 (pilot cislunar station, ~1–2 kt/yr) plus H5 (KISS-style whole-object or boulder retrieval) | H2 co-location; H3 Phase 0B water tug. Rejects H0 and H4. |
| Gemini | Option 2, pilot fleet and pilot station (scored 8.2/10) | Option 3 co-location (7.6/10); Option C water-fuelled propulsion |
| GPT | Provisional 1–2 kt/yr pilot | Co-location as a separately evaluated architecture; chemical transport with distributed refuelling |

**Points raised by one model only**

- **Claude**
  - Only Claude raises whole-object retrieval. It cites Brophy et al., 2012: ~40 kW returning ~250–1,300 t, giving k ≈ 1–3 t/kWe·yr for select objects.
  - Only Claude raises the synodic-access constraint.
  - Claude argues teleoperation (1.3 s light time) favours a cislunar station.
- **GPT**
  - GPT alone computes the LOX/LH₂ alternative: ~940 t propellant per cycle at 450 s, station-refuel only.
- **Gemini**
  - Gemini's falsification condition assumes NEA round-trip Δv ≥6 km/s. Claude's target criterion is ≤6 km/s, with 3–4 km/s for aggressive selection and a few hundred m/s return for KISS-class objects.

### 3.6 Cost of resizing the station (bom-0-3) and the phase total

| Model | Station | Phase total |
|---|---|---|
| Claude | $10B retained as a placeholder, "not endorsed" | Phase 0 rises to ~$20–30B before crew scope; needs a decision-rights owner |
| Gemini | $2–4B for a 1–2 kt/yr pilot | Option 2 "budget preserved (~$3.6B)" |
| GPT | Unpriced. "No $10B station price should be retained as validated." | $16.46–23.71B arithmetic envelope before omitted scope and station resize. "Not a validated revised phase estimate." |

### 3.7 Development and qualification (NRE)

| Model | Value |
|---|---|
| Claude | $1.5B ($0.8–3.0B). Includes ≥10,000 h wear testing at ≥50 kW. |
| Gemini | $0.3–0.6B, for 50 kWe iodine thrusters |
| GPT | $1–3B |

### 3.8 Interfaces

| Interface | Claude | Gemini | GPT |
|---|---|---|---|
| Fleet data | 10–100 kbps cruise; 1–10 Mbps prox ops; fleet <1 GB/day | ~10 kbps average per vehicle | 1–10 GB/day fleet-wide allowance; "not a link budget" |
| Dockside power | 0.05–0.15 MW peak | "Zero operational interface" with bom-0-5 | 0.1–0.3 MW peak |
| bom-0-2 robots outbound | 20 robots, est. 2–20 t each; carriage not in BOM | Not listed | Equipment outbound 0–0.1 kt/yr |
| bom-0-1 target list | Requirement not stated in bom-0-1 (in_bom: false) | in_bom: true | Not explicit (in_bom: false) |

### 3.9 Thruster life and replacement

| Model | Position |
|---|---|
| Claude | Require ≥5 t throughput per module (2–10), robotically replaceable. Fleet needs 30–250 modules/yr. AEPS-class qualified ~1–2 t. |
| Gemini | ~70 t throughput per vehicle over 15 yr against <5 t demonstrated. Proposes a swap robot or 8–12 thruster heads. |
| GPT | 270–470 t per tug over 4–7 cycles. Replacement count cannot be inferred until a module's qualified throughput is known. Cites NEXT at 918 kg. |

### 3.10 Disposition details where Claude and GPT differ

Gemini addressed only rq-0-18, rq-0-14 and rq-0-11.

| Deliberation | Claude | GPT |
|---|---|---|
| rq-0-14 | Accept | Accept deferral, but "≥25 kt/yr is not sufficient". Deployment also needs feedstock, customers, reliability and cost advantage. |
| rq-0-47 sunshield | Reject for tug | Reassess against actual thermal requirements |
| rq-0-48 MLI | Accept narrowly: iodine feed heating 1–3 kW | Include EOL thermal analysis; the previous round understated thermal scope |
| rq-0-18 mass | −2 to −4 t per vehicle; −$0.2–0.4B for the fleet | Claimed savings "not booked" |
| rq-0-28 | Report $/kg delivered as the figure of merit | Keep Earth-delivered and ISRU-supported estimates separate; accept no savings without the full method |

---

## 4. Proposed BOM delta

**These are proposals for human review only. None is approved.**

Confidence is the model's own, where it stated one for the matching spec line.

| # | Action | Item | Supporting models | Quantity | Unit-cost range (by model) | Confidence |
|---|---|---|---|---|---|---|
| 1 | resize | bom-0-4 fleet | All | 15 vehicles. Claude: 2 pathfinders + 13 production. GPT: staged. | Claude $180–400M; Gemini $190–320M; GPT $250–600M | Low (all three) |
| 2 | add | EP propellant supply and delivery | All | 150–600 t/yr (Claude ~300; Gemini 350; GPT ~350) | Claude $0.15–0.9B/yr total; Gemini $0.5–1.5M/t; GPT unpriced | Medium on quantity (Claude, GPT); cost not rated |
| 3 | add | Transport development and qualification | All | 1 programme | Claude $0.8–3B; Gemini $0.3–0.6B; GPT $1–3B | Low (Claude); not rated by others |
| 4 | add | Fleet launch, injection, assembly | All | Claude 15–30 launches; Gemini 15 (15–25 in text); GPT TBD after mass closure | Claude $50–150M per launch; Gemini $100–180M; GPT unpriced | Not rated. GPT: count "not yet defensible". |
| 5 | add | Thruster/PPU spares and robotic replacement | All (Gemini as missing scope, not in BOM delta) | Claude 30–250 modules/yr; GPT TBD; Gemini 8–12 heads per tug or swap robot | Claude $2–8M per module; others unpriced | Low (Claude) |
| 6 | add | Cargo containers and handling | All (Gemini as missing scope only) | Claude 30–60; GPT 30–45 | Claude $0.5–3M each; GPT unpriced | Not rated |
| 7 | add | Ground segment and deep-space comms | Claude (standalone); GPT (bundled with containers and depot) | 1 | Claude $100–400M; GPT unpriced | Not rated |
| 8 | add | Trajectory/access and architecture trade study | Claude (BOM line); GPT (named as principal missing input, not a line item) | 1 | Claude $5–20M | Not rated |
| 9 | add | Propellant depot/transfer hardware at station | Claude, GPT (interface not in BOM) | ~300–350 t/yr throughput | Unpriced | — |
| 10 | remove | Structural human-rating provisions and crew kits in bom-0-4 | All | 0 kits | Claude saves ~$0.2–0.4B and 2–4 t per vehicle; GPT books no savings | Medium (Claude, GPT) |
| 11 | resize | bom-0-3 station to 1–2 kt/yr pilot | All | 1 | Claude $10B placeholder, not endorsed; Gemini $2–4B; GPT unpriced | Not rated |
| 12 | split / remove | bom-0-6 ISPP deferred to Phase 0B | All on deferral. Claude: *split* (design in Phase 0, deploy in 0B). Gemini and GPT: *remove* from Phase 0. | 4 units | Claude and GPT $500M per unit; Gemini [0, 0] | Not rated |
| 13 | split | bom-0-5 stationary vs. mobile tug arrays (accounting) | All | Claude 4.5 MWe; GPT 12 MW usable | $0 (accounting) | — |

**Notes on rows 3–8.** GPT records unpriced scope as `[0, 0]` and says this "denotes unpriced scope rather than zero cost". Gemini also uses `[0, 0]` for the bom-0-6 removal.

---

## 5. Open questions

| Question | Divergence it would settle | What would settle it (as proposed by the models) |
|---|---|---|
| Do ≥10 NEAs with round-trip Δv ≤6 km/s give enough phased windows over 2035–2050? | 3.1 cadence and power knee; 3.5 architecture | NHATS query plus low-thrust optimisation (GMAT, Copernicus or EMTG) (Claude). Named targets and station orbit with optimised trajectories (GPT). Falsified if fleet-wide windows fall below ~5/yr (Claude). |
| Is the cycle power-limited at 300 kWe, or does 0.8 MW shorten it? | 3.1 | Same trajectory study. Claude would drop to ~200 kWe if minimum transfer-plus-window time exceeds ~2.5 yr. |
| Do enough objects with return Δv below 1 km/s exist for whole-object retrieval to beat shuttling? | 3.5 | Target survey and trajectory study (Claude) |
| Is the station cislunar or co-located, and what *product* mass must Phase 0 deliver? | 3.5, 3.6 | Phase-level values decision on learning vs. production (GPT, Claude). For co-location: handling and anchoring demonstrations (GPT). |
| What is sourced world krypton production and propulsion-grade price at 150–600 t/yr? | 3.2, 3.3 | Industrial-gas supplier survey (Claude). Supplier contracts (GPT). |
| Can an iodine Hall thruster at ≥20 kW reach ≥5,000 h with <20% degradation before PDR? | 3.2 | Wear test (Claude's falsification test). Gemini's threshold is >8,000 h. GPT requires throughput, restarts, cathode wear and contamination representative of the mission, not hours alone. |
| Does iodine attack array cover glass, valve seals or spacecraft surfaces? | 3.2 | Life and contamination testing (Gemini, GPT) |
| What per-module throughput can magnetically shielded Hall thrusters show on Kr or I₂? | 3.9 | Endurance testing of the selected module (Claude, GPT) |
| Can the pilot run uncrewed on robotic maintenance? | 3.4 | Fault-injection and end-to-end maintenance trials (GPT). Gemini's falsification test is that failure modes prove intractable without on-site crew. |
| Is the IDSS port or generic-interface option worth its mass? | 3.4 | Not specified beyond Claude's ~0.3–0.6 t estimate and GPT's call for evidence on "only 3 t" |
| What packaged mass and injection orbit set launch count? | Row 4 | Mass closure plus launch-performance analysis (GPT) |
| What is the consolidated Phase 0 cost, and who holds decision rights? | 3.6 | Work-breakdown estimate separating development, recurring and operations (GPT). RAPID "Decide" owner (Claude). |
| What do the full thermal, governance and ISRU-cost deliberations require? | 3.10 | Retrieve the complete deliberation records (GPT) |
| What justifies later ISPP deployment? | 3.10 | Verified feedstock, contracted consumer and cost advantage (GPT). Claude adds a Phase 0B water-tug trade as the potential consumer. |

---

## 6. Decision-quality audit

### 6.1 Architecture: closing the 50 kt/yr gap

| | Claude (Decision A) | Gemini (Decision 1) | GPT (Decision A) |
|---|---|---|---|
| **Weakest link named** | **Information**: no trajectory work exists | None named | **Values**: the phase has not said whether its purpose is learning or producing 50 kt/yr |
| **Scaffold steps found missing or unsupported** | Round 1's *frame* was wrong: it asked "how to feed 50 kt/yr" and not what Phase 0 must output. Option H5 was missed. Claude's own weights are its values and "should be replaced by the project's". | — | Weights are "proposed stakeholder priorities, not elicited". Co-location is not "an already closed alternative". |
| **Reclassified as trade-off point** | Station location: operability vs. transport mass and windows, which is a values question about remote-autonomy risk appetite. Δv is a *sensitivity*. | Raw ore vs. beneficiated material. Throughput vs. power is a *sensitivity*. | Co-location trades transport efficiency against site dependence. Pilot scale trades learning and affordability against production ambition. Δv and duty are *sensitivities*. |
| **Method** | ACH plus Composite Scaffold | QOC / Kepner-Tregoe musts and wants, with weighted scores | QOC plus ACH (rejects the claim that the current fleet supports station throughput) |

### 6.2 Vehicle power, fleet size and propellant

| | Claude (B: power; C: propellant) | Gemini (Decision 3: propellant) | GPT (Decision B: combined) |
|---|---|---|---|
| **Weakest link named** | B: **reasoning**, since round 1 had the data to reconcile D3 and did not. C: **information**, since world krypton supply is unsourced. | None named | **Information**: no named trajectories, verified supplier capacity or representative lifetime tests |
| **Scaffold steps found missing or unsupported** | Round-1 designs at 800 kWe and 1.5 MW sit in the flat, trajectory-limited region | Rates supply figures "very high" certainty, citing "industrial gas reports" | GRADE shows that the previous round's "high confidence" cycle times and "medium confidence" costs were unjustified |
| **Reclassified as trade-off point** | Isp: supply security vs. throughput (values). Kr vs. I₂: schedule risk vs. supply risk (values). Fleet kW is a *sensitivity*. Payload is a weak sensitivity. | Supply scalability vs. qualification and corrosion risk | Power vs. mass/cost. Isp vs. cadence. Restricted targets vs. flexibility. |

### 6.3 Human-rating and crew

| | Claude (Decision D) | Gemini (Decision 2) | GPT (Decision C) |
|---|---|---|---|
| **Weakest link named** | **Frame** in rq-0-18: it assumed 60–90-day transits | None named | **Reasoning** in rq-0-18: it jumps from station complexity to inevitable crew demand to cheap modular human-rating |
| **Scaffold steps found missing or unsupported** | rq-0-18's evidence is "very low" (asserted premium and penalty). Crew risk acceptance was never stated (values). | 3g requirement is decoupled from EP accelerations | Crew demand is asserted. The 30-day shelter does not establish rescue. The premium is unitemised. Safety is a *must*, "not a weighted compensating attribute". |
| **Reclassified as trade-off point** | Gemini's round-1 dissent is reclassified from a physics claim to a values position on option value | Premature crew optimisation vs. guaranteed mass, cost and schedule penalty | Future compatibility vs. current cost is a values trade-off, but it cannot substitute for safety closure |
| **Method** | GRADE EtD | QOC / Toulmin | GRADE EtD |

### 6.4 Baseline control and BOM delta as a whole

| | Claude (Decision E) | Gemini | GPT (Decision D) |
|---|---|---|---|
| **Weakest link named** | **Commitment and frame**: no consolidated Phase 0 cost after the adds | No separate decision (ECP process proposed under P0-F15) | **Commitment**: no owner, approval authority or executable closure gate |
| **Scaffold steps found missing or unsupported** | Needs a RAPID "Decide" owner before acceptance | — | Every BOM delta needs an owner and an evidence gate (launch, modules, ground segment, containers, ISPP, station, cost) |
| **Reclassified as trade-off point** | — | — | Extra review vs. schedule and rework risk |

### 6.5 Calibrated-likelihood statements

| Claim | Model | Stated likelihood and confidence |
|---|---|---|
| Shuttle throughput far below 50 kt/yr | Claude | Virtually certain, high |
| Shuttle throughput far below 50 kt/yr | Gemini | Virtually certain (>99%), high |
| Shuttle throughput far below 50 kt/yr | GPT | Virtually certain, high, under stated assumptions |
| Enough low-Δv targets for k ≥0.2 | Claude | About as likely as not, low |
| 300 kWe is near the knee | Claude | Likely, medium |
| Iodine qualified at scale by ~2032 | Claude | About as likely as not, low |
| Crewed 2-yr transits on tugs in Phase 0 | Gemini | Extremely unlikely (<5%), high |
| Supplied crew/rescue plan inadequate | GPT | Very likely, high |
| Station operable uncrewed | GPT | Plausible, medium |

---

## Reviewer note

These are consistency observations on the panel's own outputs. They are not new technical positions.

1. **Model labels.** The YAML `model:` fields conflict with the response headers.
   - "Gemini 3.8 Flash" carries `model: Claude Opus 5.5`.
   - "GPT-6.1 Sol" carries `model: GPT-5.2`.
   - "Claude Opus 5.5" carries `model: Claude (Anthropic), round-2 reviewer`.
   - This reconciliation attributes by header. Provenance should be confirmed.
2. **Gemini's outbound propellant.** Gemini's outbound leg is stated as 35 t dry mass with ~10 t propellant. Claude and GPT both carry the return propellant on the outbound leg (GPT: 88.9 t outbound mass, giving 18.1 t). Whether Gemini's figure omits this should be checked.
3. **Gemini's thruster throughput.** Gemini's "~70 t throughput per vehicle over 15 years" is close to its own *per-cycle* propellant (53 + 10 t). Its own 2.7-yr cycle implies several cycles in 15 years. GPT's 270–470 t lifetime figure is the comparable quantity. This should be checked.
4. **Unresolved power question.** Claude's argument that round-1 high-power tugs were over-powered relative to cadence was not answered by GPT. GPT's 0.8 MW design point is close to round-1's 800 kWe. This tension is preserved in §3.1, and the trajectory study is the panel's named way to settle it.
5. **Gemini's architecture scores.** Gemini reports weighted scores (8.2 / 7.6 / 2.1) but does not show per-criterion scores, so the result cannot be reproduced from the response.
6. **No consolidated phase cost.** No model produced a phase cost that includes a priced station resize. The three phase-level figures in §3.6 rest on different station assumptions, so they cannot be compared directly.
