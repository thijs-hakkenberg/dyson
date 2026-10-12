---
phase: phase-0
item: phase
round: 2
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
framework: 18f503fe4ec6
generated: 2026-10-12T10:30:58.584Z
---

# Phase 0 Re-assessment, Round 2: Panel Reconciliation

**Rapporteur scope.** This document consolidates three round-2 submissions:

- **Claude Opus 5.5.** It self-identifies as "Claude (Anthropic)" and says it did not author the round-1 Claude submission.
- **Gemini 3.8 Flash.** Its YAML `model` field reads "senior-space-systems-engineer".
- **GPT-6.1 Sol.** Its YAML `model` field reads "GPT-5.2".

All claims are attributed. No winner is selected. Every BOM item is a **proposal for human review**.

**Source limits stated by the models:**
- Claude and GPT both say they had the full text only for rq-0-28. Claude also had rq-0-26 as resolved in the mining-robots consensus; GPT had it "substantially reproduced".
- Both say the other deliberations were available only as summaries.
- Gemini states no source limits.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| P0-F01 Transport vs throughput (blocking) | partly ¹ | agree | partly |
| P0-F02 Mining rate inconsistency | agree | agree | agree |
| P0-F03 Station power | partly | agree | partly |
| P0-F04 100 MW allocation / storage | agree | agree | partly |
| P0-F05 $5/W arrays | agree | agree | agree ² |
| P0-F06 Prospecting cadence | agree | agree | partly |
| P0-F07 Robot mass/power | agree | agree | agree ³ |
| P0-F08 Launch line | agree | agree | agree |
| P0-F09 Comms/ground/ops | agree | agree | agree |
| P0-F10 Crew | agree | agree | agree |
| P0-F11 Tug propellant / ISPP consumer | agree | agree | agree ⁴ |
| P0-F12 NRE/pathfinders/spares/contingency | agree | agree | agree |
| P0-F13 Organization spec | agree | agree | agree |
| P0-F14 Debris/contamination | agree | agree | agree |
| P0-F15 Deliberations not written back | partly | agree | partly |
| P0-F16 Consensus docs vs BOM | agree | agree | agree |
| P0-F17 "Pure research" vs $15.7B | agree | agree | agree |
| P0-F18 Metallurgy fallback | partly ⁵ | agree | partly |
| P0-F19 Phase 1 demand | agree | agree | agree |

**Notes on the matrix:**
1. Claude's prose says "agree on the conclusion, partly agree on the derivation"; its YAML says `partly`.
2. GPT agrees with the budget criticism but only "partly" with the claimed price evidence.
3. GPT agrees on the inconsistency but disagrees that onboard solar is universally impossible.
4. GPT agrees on the missing supply but only "partly" with the demand estimate.
5. Claude's prose says "agree"; its YAML says `partly`.

**Where the panel stands on each finding:**

- **F01:** Unanimous that 50 kt/yr central ore processing cannot close.
  - Claude and GPT say the finding's derivation wrongly keeps the vehicle loaded on the outbound leg, so the trip time is about 2× pessimistic.
  - Claude adds a transport-energy argument: about 150–300 MWe of tug power for 50 kt/yr of ore.
- **F02:** Unanimous that the rates are inconsistent. The three models give three different closed mass-flow chains (see §3).
- **F03:** Unanimous that 1–2.5 MW cannot refine the mixed slate.
  - Claude and GPT say 1–2.5 MW (Claude) or 0.5–1.5 MW average (GPT) suffices once the slate is narrowed to Fe-Ni.
  - Gemini sizes the station at 8.5 MWe.
- **F04:** Unanimous that the 100 MW is unallocated and the 200–500 MWh is unjustified.
  - GPT holds that continuous sunlight does not remove all storage need. Claude makes a similar point via safe-mode storage.
- **F05:** Unanimous that $5/W is wrong. The models differ on whether launch is included and on how much their figures rest on evidence versus allowances.
- **F06:** Unanimous that 20 rendezvous per satellite per year is not feasible. GPT notes that 20 *remote observations* per year may be feasible.
- **F07:** Unanimous on tether power. GPT says onboard solar is physically possible but operationally unattractive.
- **F08–F10, F12–F14, F16, F17, F19:** Unanimous on the need. The models differ on magnitudes.
- **F11:** Unanimous on the missing propellant line and that LOX/LH₂ has no consumer. Propellant demand differs by about 2–7× between models.
- **F15:**
  - Gemini would write back all eight deliberations via an engineering change order.
  - Claude and GPT would review the full texts first. Both dispute rq-0-28's claim that Phase 0 costs are "approximately correct".
- **F18:** Unanimous that a fallback is needed.
  - Claude and GPT dispute the scale-gap framing.
  - Gemini baselines a centrifugal melt furnace. Claude baselines no-melt routes. GPT gates rotating modules experimentally.

---

## 2. Agreed changes (supported by all three models)

Where the values differ, the consolidated figure is the envelope spanned by the three models. A value marked "→ §3" means the specific number is contested.

| Change | Consolidated value / range | Attribution and caveats |
|---|---|---|
| Split Phase 0 into 0A (research + pathfinders) and gated 0B (industrial) | Structure agreed; budgets → §3 | All three |
| Abandon 50 kt/yr central SEL4/L5 ore processing | — | All three |
| Co-locate at least beneficiation and primary processing at the target NEA; ship product, not ore | Reference architecture | All three. GPT: "favoured but not universally optimal". Claude retains a central station fed with ≥20:1 concentrate as an alternative. Gemini's own weighted QOC scores SEL1 marginally higher (see §6). |
| Narrow product to native/reduced Fe-Ni; defer solar-grade Si and oxide-derived Al/Si | Fe-Ni baseline; Al/Si pilot or deferred | All three |
| Delivered product scale of order 1 kt/yr | 0.6–2.5 kt/yr | Claude 0.6–2.2 (central 1.3); Gemini 1.0–2.5 (1.5, of which 0.3 is water); GPT 0.6–1.0 contracted (0.67–1.33 capacity) |
| MW-class cargo tugs | 1.0–2.5 MWe each; 10–18 tugs; 150–300 t payload | → §3 for point values |
| Robots powered by HV tether from site power, with onboard battery for mobility and safe-mode | 1–3 kV; battery 10–50 kWh | Claude 2–3 kV, 10–30 kWh; Gemini 1–3 kV, 15–25 kWh; GPT 20–50 kWh, voltage unspecified |
| Delete the 200–500 MWh Li-ion line; size storage per site | 0.5–15 MWh total | Claude 0.5–3 MWh + thermal; GPT 1.3–3.3 MWh; Gemini <15 MWh (YAML 10 MWh) |
| Reject $5/W array pricing | Hardware ~$30–150/W, launch separately accounted | Claude $30–150/W hardware ($50–230 installed incl. launch); Gemini $60–100/W (spec $75, range $50–110); GPT $30–100/W allowance ($45–220 with delivery) |
| Replace 32–50 × 100 kg monoprop prospectors | Remote survey + 4–10 EP rendezvous scouts of 200–600 kg | All three agree a monoprop bus has ~0.5–0.8 km/s Δv. Remote-survey method differs (→ §3). |
| Add an Earth-to-space launch/delivery line | Line agreed; magnitude → §3 | All three |
| Add a comms, ground segment and mission-operations line; DSN not assumed free | Line agreed | All three. Claude and GPT reject the round-1 2.5 TB/day (~230 Mbps) figure. |
| Phase 0 uncrewed; remove habitat and quarterly visits | 0 crew visits | All three. Claude and GPT reject the "human-rating" label in favour of structural reserve plus docking/servicing interfaces. Gemini keeps docking ports and structural margins without commenting on the label. |
| Add an EP propellant supply line; xenon not baselined | Line agreed; demand → §3 | All three |
| No production LOX/LH₂ in Phase 0 | — | All three. Claude and GPT remove the EML1 depot; Gemini "defers" cryo depots to 0B/Phase 1. |
| Add NRE, pathfinder, spares and contingency lines | Lines agreed; values → §3 | All three |
| Write a full organization (bom-0-7) specification | ~$100–350M | Claude $100–300M; Gemini $150–250M (text $200M); GPT $150–350M |
| Add a debris/contamination requirement and budget tighter than 99% | $50–300M | Threshold → §3 |
| Freeze one configuration-controlled baseline; mark legacy documents superseded | — | All three |
| Earth-supplied material as a fallback if microgravity metallurgy fails | — | All three. Ranking relative to lunar → §3. |
| Tie Phase 0 output to Phase 1 demand with a material/purity/date specification | — | All three |
| Add waste-heat rejection (radiators) explicitly | Item agreed; sizing → §3 | All three |

**Not unanimous (two models only):**
- **rq-0-26 torque inconsistency** — Claude and GPT. Both compute that 50–200 N·m at ≥10 kW implies roughly 480–1,900 rpm, not a bucket wheel. Gemini still uses "50–200 N·m residual torque" and an interface of "≤10 N·m". → §3.
- **Rejection of rq-0-28 "approximately correct" Phase 0 costing** — Claude and GPT. Gemini is silent.

---

## 3. Preserved divergences

### 3.1 Mass-flow chain and resource assumptions

| Parameter | Claude | Gemini | GPT |
|---|---|---|---|
| Excavated | 30 kt/yr (15–50) | 35 kt/yr (25–50); text gives 39.4–40 | 8 kt/yr (6–10) |
| Concentration ratio | 5–15:1 | ~5–8:1 (5–8 kt concentrate from 40 kt) | 4:1 (25% yield) |
| Concentrate | 3 kt/yr (1.5–6) | 5–8 kt/yr | 2 kt/yr (1.5–2.5) |
| Native-metal content assumed | 2% (LL) / 7% (L) / 15–20% (H) | 8–12 wt% in C/M-type | 20 wt% recoverable (a gate condition) |
| Duty cycle | 25% (15–30) | 15% (10–25) | 9% (7–12) |
| Robots | 8 + 4 replacements (range 6–14) | 12 active + 8 reserve | 6 deployed + 6 replacements |
| Robot mass | 2 t (1.5–3) | 2.8 t (2.2–3.2) | 3.5 t (3–4) |
| Retained product | none specified | none specified | 30% retained locally |

**Reasoning behind each position:**
- **Claude:** duty cycle is the product of sunlit fraction, maintenance, repositioning and comms. The 1,000 t/yr extraction target is consistent with the rq-0-26 rates only if it means concentrate.
- **Gemini:** cites anchoring fatigue, thermal limits and batch transfer as the duty-cycle constraints.
- **GPT:** treats its chain as a "conditional reference" that requires a demonstrated 20% recoverable metal. A lower grade triggers redesign.

### 3.2 Target class: S-type vs C-type, metal plus water

- **Claude:** one site cannot do both. S-type gives native Fe-Ni; C-type gives water plus magnetite reducible by H₂. Claude calls this a trade-off point between product simplicity and propellant closure, to be decided after 0A rendezvous data.
- **Gemini:** assumes a C/M-type chondrite yielding both metal (8–12 wt%) and water (5–10 wt%) from the same feed. It delivers 300 t/yr of water to SEL1.
- **GPT:** a metal-bearing target. The water pilot may use imported water if the target has none.

### 3.3 Excavation power and mechanics

| | Claude | Gemini | GPT |
|---|---|---|---|
| Excavation power | 2–15 kWe nominal, 30 kW peak (low confidence) | 30 kW continuous (20–45) | 20–50 kW mechanical → 40–100 kWe per working machine |
| Torque | 2.5–95 kN·m; 0.25–5 kN·m residual after cancellation | 50–200 N·m residual; interface ≤10 N·m, 15–35 N | ~19 kN·m at 20 kW, 10 rpm |
| Excavator subsystem mass | 150–400 kg | 60–80 kg not revisited | 150–500 kg |
| Counter-rotation | strengthens the case; re-run rq-0-26 | adopted, high confidence | candidate only; does not cancel translation forces |

- **Claude's basis:** terrestrial bucket-wheel specific energy with a 3–10× microgravity penalty. It notes that if clasts dominate, 20–50 kW may be right.

### 3.4 Station / plant power

- **Claude:** 1–2.5 MWe average, 2–4 MWe peak, for 1.5 kt/yr Fe-Ni plus beneficiation. Solar-thermal concentrators remain an option.
- **Gemini:**
  - Spec: 8.5 MWe (6–12) for centrifuge plus smelter.
  - F03 text: 2.5–4.0 MWe for 10–15 kt/yr feedstock.
  - Gemini's interface table: 6.5–9.5 MWth waste heat.
- **GPT:** 0.5–1.5 MW average, 2.5 MW peak. GPT says energy per kg of product must not be applied to every kg of ore.

### 3.5 Array total and allocation

| | Claude | Gemini | GPT |
|---|---|---|---|
| Total | 15–30 MW BOL | 50 MW (BOM delta); F04 allocation sums to ~51–64 MW | 35–50 MW BOL at 1 AU |
| Tugs | 12–18 MWe | 24 MWe (YAML says 28) | 20 MW |
| Growth reserve | none | 15–20 MWe | none |
| Derating | site sized at aphelion and EOL | not stated | all loads derated to 1.2 AU, EOL 0.8, distribution 0.9 |

### 3.6 Tug design and cadence

| | Claude | Gemini | GPT |
|---|---|---|---|
| Power | 1.25 MWe (1.0–1.5) | 2.0 MWe (1.5–2.5) | 2 MW |
| Count | 12 (10–15) | 14 (10–18) | 10 |
| Payload | 250 t (200–300) | 200 t (150–250) | 250 t |
| Isp | 2,500 s (2,000–3,000) | 2,200 s iodine (1,800–2,600) | 2,500 s |
| Dry mass | 40–60 t | 35 t (F08) | ~60 t incl. arrays |
| Round trip | 1.5–3 yr, window-limited (spec 2.2) | 3.8 yr (3–5), incl. synodic wait | 1.5–3 yr (nominal 2) |

- **Claude and GPT:** thrust time is about 0.43–0.65 yr per 6 km/s cycle. Cadence is set by launch windows and scheduling.
- **Gemini:** includes 1.5–4 yr synodic waits.

### 3.7 EP propellant demand and supply

**Demand:**
- **Claude:** 150–450 t/yr, from per-cycle accounting.
- **Gemini:** ~1,060 t/yr (900–1,200), from continuous 60% burn duty across 12 tugs.
- **GPT:** 160–600 t/yr, from per-cycle accounting including reserve.

**Supply estimates:**

| Propellant | Claude | Gemini | GPT |
|---|---|---|---|
| Xenon | 50–100 t/yr | 60–70 t/yr | Calls the original "15–20× world production" claim unsupported; keeps xenon as a pilot-scale candidate |
| Krypton | order 10²–10³ t/yr, poorly documented | 150–180 t/yr | Requires an audited supply study |
| Iodine | ~3×10⁴ t/yr | ~3.5×10⁴ t/yr | "Tens of thousands" of t/yr |

**Baseline choice:**
- **Claude:** iodine or argon, gated by life test.
- **Gemini:** iodine primary, argon secondary.
- **GPT:** iodine as a costing study case, with argon and krypton as alternatives. Select only after life tests and a supply contract.

**Recurring launch cost:** Claude alone frames imported propellant as a $0.3–1.8B/yr launch cost and the strongest case for water EP.

### 3.8 Water EP and ISPP scale

- **Claude:** a 10–100 t/yr water pilot, conditional on a C-type target. A funded water-EP qualification track ($0.2–0.6B) is "the only route to a real ISPP customer".
- **Gemini:** 1,500 t/yr (1,000–2,500) of industrial water as reaction mass and life-support commodity, with 300–500 t/yr delivered to SEL1.
- **GPT:** a 10–30 t/yr water/process pilot. "Water at 200–800 s does not create self-sustaining transport closure": the mass ratio is ~21 at 200 s for 6 km/s. Water EP is a hypothesis, not a qualified replacement.

### 3.9 Metallurgy route and artificial gravity

**Baseline route:**
- **Claude:** routes needing no gravity (magnetic beneficiation, then carbonyl or H₂ reduction). Centrifugal melting only at pilot scale.
- **Gemini:** a rotating centrifuge smelting furnace at 0.05–0.15 g per rq-0-11 (spec range 0.05–0.20). Gemini lists carbonyl versus centrifugal melting as an open divergence.
- **GPT:** narrow native-metal production. Rotating modules are an experimentally gated hypothesis. "Gas/solid metallurgy is not automatically gravity-independent."

**Rotating module sizing:**
- **Claude:** r = 5–10 m, 3–4 rpm, +20–60 t, $0.5–2B.
- **GPT:** r = 10–20 m, 1.5–3.7 rpm, 20–60 t, $0.5–1.5B.

**Scale gap:**
- **Claude:** 4–6 orders of magnitude, from mm-scale ISS levitated melts to 1–10 t batches. "Paradigm gap is fair."
- **GPT:** the "eight orders" comparison of batch size against annual rate is dimensionally invalid. GPT gives no replacement figure.
- **Gemini:** calls it a "major physics barrier".

### 3.10 Fallback ranking

- **Claude:** (a) Earth-supplied material first, at $2,500–12,000/kg today. (b) Lunar processing as the capability fallback, $10–25B, "a poor fit for an Fe-Ni product".
- **Gemini:** Earth-supplied alloys and wafers, with in-situ scope reduced to water extraction.
- **GPT:**
  1. Earth supply ($15–60B for 1 kt/yr over 5 yr).
  2. Solid-state or limited rotating processing.
  3. A lunar pilot as a separate strategic alternative ($5–15B).
  
  GPT also rejects a >5 km asteroid as a gravity substitute (~1.4×10⁻⁴ g).

### 3.11 Delivery node

- **Claude:** SEL1.
- **Gemini:** SEL1 (±5,000 km), high confidence. Gemini cites a 1.5–2.5 km/s each-way penalty from L4/L5.
- **GPT:** relocating automatically to L1 is "too strong". The receiving orbit should be optimized with Phase 1, and L1 needs stationkeeping and traffic management.

### 3.12 Prospecting architecture

- **Claude:**
  - Remote survey: buy NEO Surveyor, Rubin and ground NIR time ($20–60M).
  - Rendezvous: 6 (4–8) scouts of 200–400 kg at $30–80M, 1–3 targets each over 7 yr.
- **Gemini:**
  - Remote survey: 2 *dedicated* IR space telescopes.
  - Rendezvous: 8 scouts of 350–600 kg (spec 450), 1–2 targets each over 4 yr.
- **GPT:**
  - Remote survey: purchased data ($20–100M).
  - Rendezvous: 4–8 scouts of 250–500 kg at $25–75M, one primary rendezvous each.
  - "Remote spectra … do not certify bulk grade."

### 3.13 Communications and operations

| | Claude | Gemini | GPT |
|---|---|---|---|
| Site data rate | 2–10 Mbps Ka-band | 15–30 Mbps aggregate, optical + Ka | 0.5–5 Mb/s scheduled |
| Ground segment | commercial apertures or 3 × 18–35 m stations, $0.15–0.5B | 3 × 35 m stations $350M + 2 relay spacecraft $250M | $0.2–0.5B |
| Staffing | 80–250 FTE | 150 FTE | 80–180 FTE |
| Operations cost | $50–150M/yr | $525M over 10 yr | $0.1–0.3B/yr |

### 3.14 Debris and containment threshold

- **Claude:** ≤0.1–1 t/yr escaped per site. GPT's ≤10 kg/yr is "defensible but probably mass-expensive". Claude calls the threshold a values choice to be settled with the licensing authority. It also says the tailings stream (13–47 kt/yr) is the larger problem. Budget $50–200M.
- **Gemini:** >99.9% capture by mass for grains >5 µm (range 99.9–99.99%), using electrostatic curtains. Budget $150M. Its G2 gate requires >99.9%.
- **GPT:** ≤10 kg/yr per site, which is 99.999875% at 8 kt/yr. It rejects 99.5–99.9% as a fleet safety criterion. Budget $100–300M. GPT also notes that "aspiration" in vacuum needs a closed gas loop.

### 3.15 Heat rejection sizing

| | Claude | Gemini | GPT |
|---|---|---|---|
| Plant heat | 1–3 MWth, 1,500–4,000 m², 15–40 t at 300 K (≈5× smaller at 500 K) | 6.5–9.5 MWth, 1,800–2,500 m² at 450–600 K | 1–3 MW, 0.8–3.9 thousand m² |
| Tug heat | PPU losses ≈5%, 50–75 kWth, 70–100 m², <1 t | not given | 0.2–0.8 MW per tug, 150–1,050 m² |

The main divergence is on how much of the thruster inefficiency the tug structure must reject.
- **Claude:** counts PPU losses only.
- **GPT:** says the fraction of the ~0.8 MW not converted to jet power that is conducted into the spacecraft "must be measured".

### 3.16 Launch mass, launch price and delivery cost

| | Claude | Gemini | GPT |
|---|---|---|---|
| Total mass | 2.5–6 kt | 2.1–2.65 kt (F08) / 2.5–3.5 kt (proposal) | 2.5–8 kt |
| Hardware | 0.9–1.6 kt | — | 0.8–1.6 kt |
| Price basis | $/kg to LEO: $1,500–4,000 current, $300–1,000 Starship-mature | $/kg to LEO: $1,200–2,500 | $/kg delivered to the operating network: $3,000–12,000. GPT notes LEO prices "do not establish this deep-space delivered price". |
| Cost | $3–15B (central ~$6B) | $3–6B | $8–96B |

### 3.17 Phase cost

| | 0A | 0B | Total |
|---|---|---|---|
| Claude | $5–15B | $17–68B | $22–83B (central ~40); the headline says 22–85 |
| Gemini | $3.5–5.0B (Y-statement: $3.8B) | $20–35B (Y-statement: $18.5B) | ~$22B+ |
| GPT | $7–16B | $23–175B | $30–195B (central 80) |

**Contingency:**
- **Claude:** 30–40% on 0A, 35–50% on 0B.
- **Gemini:** 30% on 0A, 25% on 0B.
- **GPT:** 30–40% on both.

**NRE:**
- **Claude:** $4–11B (table: $3.5–10B).
- **Gemini:** $4.5–7.5B.
- **GPT:** $4–8B in 0A plus $2–5B in 0B.

**Pathfinder:**
- **Claude:** $1.5–4B.
- **Gemini:** $1.8–2.5B.
- **GPT:** $0.6–1.5B hardware plus $0.3–0.9B delivery.

### 3.18 0B economics versus Earth supply

- **Claude:**
  - Round-1 "$3–7M/kg" was a units error. The panel's numbers give ~$2,000–6,000/kg (recomputed as $1,300–11,000/kg).
  - That is comparable to current Earth delivery to SEL1 ($2,500–12,000/kg) but worse than Starship-mature pricing.
  - "About as likely as not (33–66%)" that 0B beats Earth supply. Claude proposes deferring the 0B commitment to an economics gate (G7).
- **GPT:** "At 1 kt/year delivered over ten years, tens of billions of dollars imply millions of dollars per kilogram". A claim that 0B gives cheaper near-term material is "very unlikely to be supportable". 0B is a capability programme.
- **Gemini:** no per-kg comparison.

(See the Reviewer note on the arithmetic.)

### 3.19 Phase 1 demand commitment

- **Claude:** ISRU-eligible demand is 0.04–11 kt/yr, unknown within 65×. Gate 0B on a signed schedule known within 3×.
- **Gemini:** commit to 1,200 t/yr structural Fe-Ni sheets/tubes plus 500 t/yr water to SEL1 by Year 10. Gemini has no demand gate.
- **GPT:**
  - Contract 0.6–1.0 kt/yr Fe-Ni; commit zero Al, Si or water.
  - "99.99% silicon is not a sufficient solar-grade acceptance specification".
  - Do not authorize 0B if Phase 1 has no useful Fe-Ni demand.

### 3.20 Deliberation write-back (F15)

- **Gemini:** issue an engineering change order incorporating rq-0-11, 14, 18, 28, 29, 30, 47 and 48 as written.
- **Claude:** specific write-backs. rq-0-14's ≥25 kt/yr becomes a customer-defined threshold. rq-0-30/47/48 apply only if cryogens are carried, with a 1.5–2× dust-aggravated MLI margin.
- **GPT:** similar dispositions. GPT says "zero boil-off below 0.01%/day" is internally imprecise and gives a boil-off sizing equation. Consensus "is not experimental validation".

### 3.21 Gate set and thresholds

| Gate area | Claude (G1–G9) | Gemini (G1–G4) | GPT (7 gates) |
|---|---|---|---|
| Target | ≥2 rendezvous targets; water ≥2–8 wt% *or* metal ≥5–10 wt% | ≥2 NEAs with ≥8 wt% water *and* ≥6 wt% metal | 1 sampled primary + 1 alternate; ~20% recoverable metal |
| Access | round trip ≤8 km/s, cadence ≤3 yr | ≤7.5 km/s | replace a scalar bound with integrated trajectory/vehicle closure |
| Excavation | ≥500–1,000 h in situ at ≥0.5 t/h | ≥500 h (parabolic + subscale), >99.9% containment | ≥1,000 h ground plus in situ |
| Process | ≥1–10 t product, ≥1,000 h | ≥1,000 kg simulant in an orbital rotating furnace, <2% slag | modular scale-up through 100–1,000 t/yr feed |
| Propulsion | ≥10,000 h MW-class or total-impulse qualification | 5,000 h at ≥100 kWe iodine, cathode ≥15,000 h projected | total-impulse qualification for the actual 20,000–40,000 h duty; "a generic 10,000-hour test is not sufficient" |
| Demand | G6, within 3× | none | demand gate |
| Economics | G7 | none | within the demand gate |
| Cost | G8 ICE ±30% | none | independent review within the funding gate |
| Regulatory | G9 | none | safety gate |
| Autonomy | none | none | ≥90 days unattended |
| Funding | none | none | full operating tranche plus decommissioning |

---

## 4. Proposed BOM delta (for human review; not approved)

"Supported by" lists the models proposing the action. "Conf." is the confidence each model stated; most cost figures are self-described low-confidence allowances.

| Action | Item | Supported by | Quantity | Unit-cost range (2026 USD) | Conf. |
|---|---|---|---|---|---|
| split | Phase 0 → 0A / 0B | all | 2 sub-phases | totals: Claude $22–83B; Gemini $3.8B + $18.5B; GPT $30–195B | low (Claude, GPT); high on structure (Gemini) |
| split/resize | bom-0-1 prospecting → remote survey + rendezvous scouts | all | Claude 6 (4–8); Gemini 8 scouts + 2 telescopes; GPT 4–8 scouts | scouts: Claude $30–80M; GPT $25–75M; Gemini $45–120M per unit (applied across 10 units incl. telescopes) | medium (Claude); high (Gemini); low (GPT) |
| add | survey data / observing programme | Claude, GPT | 1 | Claude $20–60M; GPT $20–100M | low |
| resize | bom-0-2 mining robots | all | Claude 8 + 4 replacements; Gemini 20 (12 + 8); GPT 6 + 6 replacements | Claude $30–80M; Gemini $35–55M; GPT $30–70M | low (Claude, GPT); medium (Gemini) |
| resize/relocate | bom-0-3 processing plant, co-located | all | 1 | Claude $4–12B (250–500 t); Gemini $6.5–9.5B; GPT $3–7B (180–300 t) | low |
| resize | bom-0-4 cargo tugs | all | Claude 12 @ 1–1.5 MWe incl. arrays; Gemini 14 @ 2 MWe; GPT 10 @ 2 MW excl. arrays | Claude $150–350M; Gemini $180–260M; GPT $150–350M | medium (Claude); high (Gemini, power); low (GPT) |
| resize | bom-0-5 site power / arrays | all | Claude 2.5–8 MW site (tug arrays moved to bom-0-4); Gemini 50 MW; GPT 35–50 MW total | Claude $0.2–1.2B line; Gemini $60–100M per MW; GPT $30–100/W | low–medium |
| add | distributed storage | Claude (within bom-0-5), Gemini, GPT | Claude 0.5–3 MWh + thermal; Gemini ≤10–15 MWh; GPT 1.3–3.3 MWh | GPT $50–140M/MWh; others not separately priced | medium (Claude, GPT) |
| resize | bom-0-6 ISPP → water pilot | all | Claude 1 × 10–100 t/yr (C-type conditional); Gemini 2 units, 1,500 t/yr; GPT 1 × 10–30 t/yr | Claude $150–400M; Gemini $250–450M; GPT $100–300M | low (Claude, GPT); high (Gemini) |
| resize | bom-0-7 organization | all | 1 | Claude $100–300M; Gemini $150–250M; GPT $150–350M | medium (GPT) |
| add | Earth-to-space launch/delivery | all | Claude 2.5–6 kt; Gemini 2.5–3.5 kt; GPT 2.5–8 kt | Claude $3–15B total; Gemini $3–6B total; GPT $3,000–12,000/kg | low |
| add | comms / ground segment | all | Claude 3 apertures or commercial; Gemini 3 × 35 m + 2 relays; GPT 1 network | Claude $0.15–0.5B; Gemini ~$0.6B (incl. relays); GPT $0.2–0.5B | low |
| add | mission operations | all | 10 yr | Claude $0.5–1.5B total; Gemini $525M (within a $1.1–1.5B comms+ops line); GPT $100–300M/yr | low |
| add | NRE / qualification | all | 1 | Claude $3.5–10B; Gemini $4.5–7.5B; GPT $4–8B (0A) + $2–5B (0B) | low |
| add | 0A ground R&D / facilities | Claude (GPT includes it in NRE) | 1 | Claude $0.5–1.5B | low |
| add | 0A pathfinder demonstrator | all | 1 mission | Claude $1.5–4B; Gemini $1.8–2.5B; GPT $0.6–1.5B hardware + $0.3–0.9B delivery | low |
| add | Phase 1 receiving node | Claude, GPT (Gemini names an SEL1 depot in its interfaces, not in its BOM) | 1 | $200–600M (Claude, GPT) | low |
| add | spares / replacements | all (Gemini as a 20% inventory buffer in missing items) | 1 programme | Claude $0.5–1.5B; GPT $0.8–2.5B excl. robots | low |
| add | debris / contamination | all | 1 | Claude $50–200M; Gemini $150M; GPT $100–300M (within plant/development) | low |
| add | imported EP propellant (commodity) | Claude, GPT; Gemini as an interface only | Claude 150–450 t/yr; Gemini 900–1,200 t/yr; GPT 160–600 t/yr | Claude iodine $35–70/kg; GPT $30–100/kg | low–medium |
| add | water-EP qualification track (conditional) | Claude | 1 | $0.2–0.6B | not stated |
| add | contingency / reserve | all | Claude 30–40% (0A), 35–50% (0B); Gemini 30% / 25%; GPT 30–40% both | Claude $5–27B | medium (Claude) |
| remove | crew systems, habitat, quarterly visits | all | 0 | — | high |
| remove | 200–500 MWh generic battery bank | all | 0 | — | medium–high |
| remove | production LOX/LH₂ and EML1 depot | Claude, GPT (Gemini defers) | 0 | — | high (GPT) |

---

## 5. Open questions and what would settle them

| Question | Positions it would settle | Settling evidence (as proposed by the models) |
|---|---|---|
| S-type vs C-type target; can one site yield both metal and water? | §3.2 | 0A rendezvous characterization and sampling (Claude, GPT); a G1 composition gate (all) |
| Recoverable metal grade and beneficiation ratio in microgravity | §3.1, siting | Pilot magnetic/size separation at representative feed. Claude's falsifier: below 3:1. Gemini's: metal bonded in clay matrices. |
| Excavation specific energy and torque | §3.3 | DEM plus in-situ tests with force/torque spectra (Claude, GPT); a re-run of rq-0-26 (Claude, GPT) |
| Optimized low-thrust Δv and cadence for candidate NEAs | §3.6 | Trajectory study of the top ~10 candidates, including return windows and solar-power variation (Claude, GPT) |
| Propellant: argon vs iodine vs krypton; MW-class life | §3.7 | MW-class Hall cluster life tests (Claude ≥10,000 h; Gemini 5,000 h at 100 kWe; GPT total impulse for 20,000–40,000 h); a dated supply audit (Claude, GPT) |
| Water EP maturity and value | §3.8 | Water-EP qualification track (Claude); vehicle mass-ratio closure at 200–800 s (GPT) |
| Partial-g separation sufficiency; no-melt route viability | §3.9 | ≥1 t-batch slag/metal separation at 0.05–0.15 g (Claude, Gemini); representative-feed gas/solid yield and reagent recycling (GPT) |
| Escaped-debris limit | §3.14 | Ejecta/particle-trajectory modelling, integrated containment tests, agreement with the licensing state (all) |
| Fraction of tug propulsion losses rejected by spacecraft radiators | §3.15 | Thruster thermal measurement (GPT) |
| Delivered launch price to the operating network | §3.16, §3.18 | Destination-specific quotations (GPT); demonstrated Starship pricing (Claude falsifier: below $1,000/kg to LEO) |
| Signed Phase 1 material demand: mass, material, purity, date, point | §3.19 | Phase 1 material schedule (all) |
| Receiving orbit | §3.11 | Joint Phase 0/1 logistics study (GPT) |
| Array, launch, ground and propellant supplier quotes | §3.5, §3.16 | Competitive quotations before 0B (all) |
| Reagent and precision-spare import stream | process chain | Process BOM with recycling losses (GPT) |
| Full texts of rq-0-11, 14, 18, 29, 30, 47, 48 | §3.20 | Retrieve and review the conclusions (Claude, GPT) |
| Solar-grade Si in space vs Earth-supplied | Si scope | Open camp split (Gemini); impurity and cell-process acceptance criteria (GPT) |
| HV tether insulation life on abrasive regolith; iodine plume corrosion of arrays | robot and tug design | Raised as open by Gemini only |

---

## 6. Decision-quality audit

### 6.1 Processing siting

**Claude (DQ1):**
- **Weakest link:** *alternatives*. Round 1 framed the choice as a binary and omitted O2 (central station fed with ≥20:1 concentrate) and O0 (no 0B).
- **Missing steps:** the option set.
- **Reclassified:** siting is a *trade-off point* (transport energy vs process-environment risk); ore mass per tonne of product is a *sensitivity point*.

**Gemini (Decision 1):**
- **Weakest link:** none named.
- **Points:** trade-off between propulsion mass fraction and plant simplicity/contamination; beneficiation concentration is a sensitivity point.
- **Internal inconsistency:** Gemini's weighted QOC gives SEL1 6.85 versus co-location 6.65, yet its Y-statement chooses co-location without explaining why.

**GPT (Decision A, combined with 0B scale):**
- **Weakest link:** *frame and values*. Round 1 jumped from "50 kt/yr does not close" to "build a smaller industry" without establishing why industry, rather than evidence plus Earth supply, is the goal.
- **Reclassified:** co-location vs servicing is "a values question once quantified".

### 6.2 0B scale (Claude DQ2; folded into GPT Decision A)

- **Claude:** weakest link *information*. Scale was chosen before a demand schedule existed. Scale is a *trade-off point* between demonstration value/Phase 1 usefulness and cost/exposure, and is "values, not facts".
- **GPT:** recoverable grade and accepted demand are *sensitivity points*.
- **Gemini:** no separate critique.

### 6.3 0B economics vs Earth supply (Claude DQ3)

- **Claude:**
  - Weakest link *reasoning*: unchecked arithmetic. The round-1 rapporteur carried the round-1 Claude $3–7M/kg figure (E1) without testing it.
  - Using ACH, Claude finds H2 (comparable to Earth supply) the least disconfirmed at current prices.
  - Reclassified as a *sensitivity point on launch $/kg*.
- **GPT:** addresses this inside Decision A and its cost accounts. It reaches a different per-kg conclusion (see §3.18 and the Reviewer note). GPT names GRADE EtD and real options as separating capability benefit from financial return.
- **Gemini:** no critique.

### 6.4 Tug power and propellant

- **Claude (DQ4):** weakest link *frame*. Round 1 treated propellant as a supply question and omitted recurring launch cost and the Isp trade-off. Isp at fixed power is a *trade-off point* (a values choice between cadence and recurring cost).
- **GPT (Decision B):** weakest link *information*. The models used incompatible mass, trajectory, launch and propellant bases. Isp and power are trade-off points. Under ACH, "ISPP closes transport" fails the consumer and performance checks.
- **Gemini:** no critique.

### 6.5 Metallurgy route and artificial gravity (GPT Decision C)

- **GPT:** weakest link *reasoning*. A gravity deliberation was treated "as if it were a validated universal process requirement". Process breadth and artificial gravity are trade-off points; free-metal grade is a sensitivity point.
- **Claude:** covers this in F18 and the §5 target-class divergence. Target class (S vs C) is a *trade-off point*: product simplicity vs propellant closure.
- **Gemini:** no critique. Gemini baselines the centrifuge in its spec.

### 6.6 Power, storage, thermal and containment (GPT Decision D)

- **GPT:** weakest links *information and safety reasoning*. Convenient retention percentages replaced consequence analysis, and heat rejection was not closed. Storage vs availability and containment vs complexity are trade-off points. QOC shows onboard power is a rejected option, not a physical impossibility.
- **Claude:** containment threshold is a values question (§5); excavation energy is to be settled by testing.
- **Gemini:** no critique.

### 6.7 0A/0B split and gates

- **Claude (DQ5):**
  - Weakest link *values*. Round-1 thresholds were listed without any elicited risk appetite.
  - GRADE EtD: strong recommendation for the split; conditional for the thresholds.
  - "Likely (66–90%)" that at least one of G3, G6 or G7 fails or forces a re-scope.
  - Gate stringency is a *trade-off point* between schedule and risk.
- **Gemini (Decision 2):**
  - Weakest link: none named.
  - GRADE "High" from Apollo, ISS and Artemis history. "Extremely likely (>95%)" that an unvalidated refinery fails.
  - Trade-off: 2–3 yr delay vs >80% less capital exposure.
  - Its consequences section refers to gates G1–G5, but only four are listed.
- **GPT (Decision E):**
  - Weakest link *commitment*. Round 1 proposed incompatible alternatives with neither decision rights nor an authoritative baseline.
  - Rejects presumed logarithmic cost scaling.
  - Faster commitment vs risk/deferral value is a trade-off point.

### 6.8 Uncrewed Phase 0

- **Claude (DQ6):** weakest link *commitment*. The rq-0-18 "human-rating" language persists in the specs.
- **GPT:** weakest link was "scope control, not physics".
- **Gemini:** no critique.

### 6.9 Other round-1 dispositions (GPT and Claude)

- **GPT:**
  - Rejects the ≥25 kt/yr ISPP threshold, 99.5% containment, the fixed 8 km/s bound, and "multi-century governance resolved".
  - Accepts $30–100/W only as an assumption.
  - Considers "2–3 characterized targets" a preference, not a physical threshold.
- **Claude:**
  - Says A8 ($/W), A7 (storage), A6 (tether) and A18 (extraction temperature) hold.
  - Caveats: round 1 missed thermal storage and duty-cycling for A7, and did not size the cable for A6.

---

## Reviewer note

These items are rapporteur observations on internal consistency and gaps. They are not new technical positions.

1. **Model identity.** Two YAML `model` fields do not match the submission labels: Gemini's reads "senior-space-systems-engineer" and GPT-6.1 Sol's reads "GPT-5.2". Attribution here follows the submission headers.

2. **Per-kg economics.** GPT's statement that tens of $B for ~1 kt/yr over ten years implies "millions of dollars per kilogram" is inconsistent with its own envelope. Simple division of $30–195B by ~10 kt gives roughly $3,000–20,000/kg, the same order as Claude's recomputation. This bears directly on Claude's DQ3 finding and should be checked before G7 is framed.

3. **Internal inconsistencies to resolve with the authors:**
   - **Gemini:** station power is 8.5 MWe in the spec but 2.5–4.0 MWe in the F03 text; tug array power is 24 vs 28 MWe; the siting score contradicts the chosen option; the gates are called G1–G5 but four are listed; the F11 formula is computed per tug but the fleet is stated as both 15 and 12.
   - **Claude:** the phase total is $22–85B in the headline but $22–83B in the table; F18 is "agree" in prose but `partly` in YAML; robots are "8 + 4" but range 6–14.
   - **GPT:** the excavation allocation of 0.4 MW sits beside a per-machine figure of 40–100 kWe for four working machines.

4. **Cost bases are not comparable.** Launch price is quoted per kg to LEO by Claude and Gemini but per kg delivered to the operating network by GPT. Much of the 2–10× spread in launch and total cost (§3.16–3.17) may come from this basis difference rather than from engineering disagreement.

5. **Propellant demand method.** Gemini derives demand from continuous burn duty; Claude and GPT derive it from per-cycle Δv. The two methods should be reconciled before the propellant line is sized.

6. **Missing integrated schedule.** No model provided a schedule for 0A, the gates and the 0B ramp. Claude (3–6 yr delay) and GPT (deliveries start ~3 yr after 0B authorization) give fragments only. Schedule is cited as a decision criterion in several critiques.
