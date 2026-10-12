---
phase: phase-0
item: phase
round: 2
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:48:49.839Z
seconds: 608.346
---

# Phase 0 (Space Resource Processing): Re-assessment, Round 2

**Reviewer:** Claude (Anthropic), acting as an independent senior space-systems reviewer. I did not author the round-1 Claude submission and I check it as critically as the others.

**Cost basis:** constant 2026 USD. Launch prices are quoted per kg to LEO unless stated otherwise. Where a figure is my own estimate rather than published data, I say so.

**Source limits.** Of the nine deliberations, I have the full text of rq-0-28. For rq-0-26 I have its resolution as written into the mining-robots consensus. The other seven I know only by the one-line summaries in P0-F15. Anything I propose for those seven is a proposal to be checked against the actual conclusion texts.

---

## 0. Headline

1. **Phase 0 does not close as specified, and it cannot be closed by resizing.**
   - It can be closed by changing the architecture:
     - co-locate primary processing at the target NEA;
     - narrow the product to native or reduced Fe‑Ni at the 1–2 kt/yr scale;
     - give the tugs MW-class power;
     - move only product to SEL1.
   - Even then, the phase costs roughly **$22–85B, central about $40B**. That is about 1.4–5× the current $15.7B.
2. **Ore transport is not the binding constraint; transport energy is.** Moving 50 kt/yr of ore 6 km/s round-trip by electric propulsion (EP) needs about **150–300 MWe of continuous tug power**. That is more than the entire 100 MW array line. This calculation, not the finding's trip-time estimate, is what kills the central-station architecture.
3. **The round-1 economics statement is wrong by 1,000×.** Round-1 Claude stated ISRU product at "$3–7M/kg". The panel's own cost and output numbers give about **$2,000–6,000/kg**. I read this as a per-tonne vs per-kg units error.
   - On the corrected figure, Phase 0B ISRU Fe‑Ni is **comparable to current Earth delivery to SEL1** ($2,500–12,000/kg).
   - It is **worse than Starship-mature delivery** ($500–2,500/kg, not yet demonstrated).
   - The 0B decision is therefore a **sensitivity point on launch price**, not a settled loss. The reconciliation carried the error forward without comment.
4. **The rq‑0‑26 torque figures are physically inconsistent by 10–200×.** This strengthens the case for counter-rotation but invalidates the 60–80 kg subsystem mass.
5. **Imported EP propellant is a $0.3–2B/yr recurring launch cost** at current prices. This is the strongest argument for a water-EP future. It is also the only credible Phase 0 consumer for ISPP output, at hundreds of t/yr, not ≥25 kt/yr.

---

## 1. Findings

### P0-F01: Transport capacity vs. station throughput (blocking)

**Verdict: agree on the conclusion. Partly agree on the derivation.**

**Vehicle power.** 300–500 m² of III‑V cells at 1 AU gives 1,361 W/m² × 0.30 cell efficiency × ~0.85 packing ≈ 350 W/m² at beginning of life (BOL). That is **≈105–175 kWe**. The finding's 150–250 kWe is slightly generous.

**Thrust per unit power.** T/P = 2η/(g₀·Isp).
- At η = 0.6 and Isp = 2,500 s: 49 mN/kW. The finding's 50 mN/kW holds at 2,500 s.
- At Isp = 1,800 s it is 68 mN/kW.
- So 150 kWe gives **≈7–10 N**.

**Where the finding's derivation is wrong.** It applies the loaded mass to the whole round trip. The outbound leg is empty.

Reference trip: 6 km/s round trip, split 3 km/s each way. Payload 200 t, dry mass 30 t, vₑ = 24.5 km/s.
- **Return (loaded).** Mass ratio = e^(3/24.5) = 1.13. With 230 t end mass, propellant ≈ 30 t.
- **Outbound.** 30 t dry + 30 t of return propellant gives propellant ≈ 8 t.
- **Total** ≈ 38 t per round trip, so total impulse ≈ 38,000 kg × 24.5 km/s ≈ 9.3×10⁸ N·s.
- **Thrust time** at 7.5–10 N: **3.0–3.9 yr**.
- At 10 km/s, thrust time is about 5–7 yr. Coast and phasing add to both.

So the true cadence is **3–7 yr per round trip**. The finding's 5–10 yr is about 2× pessimistic. Both are far longer than the 1.5 yr implied by "10 cycles in 15 years".

**Delivered mass.** 15 tugs × 200 t ÷ 3–7 yr ≈ **0.4–1.0 kt/yr**. That is **50–125× short of 50 kt/yr**. The finding's blocking severity stands.

**The decisive calculation is transport energy per kg delivered.**
- Propellant per tonne delivered ≈ 38/200 ≈ 0.19 t/t at 6 km/s.
- Electrical energy per kg of propellant = ½vₑ²/η = 3.0×10⁸ J ÷ 0.6 = 5.0×10⁸ J ≈ 139 kWh/kg.
- So **≈26 kWh per kg delivered** at 6 km/s, and about 45–50 kWh/kg at 10 km/s.

Applied to 50 kt/yr:
- 50×10⁶ kg × 26 kWh/kg = 1.3 TWh/yr, which is **148 MW average**.
- At 60–70% thrusting duty that becomes **≈210–250 MWe**, and **≈400–500 MWe** at 10 km/s.

No reallocation of the 100 MW line closes this.

**What does close.** Co-locate beneficiation and primary processing at the NEA and ship product only, at 1–2 kt/yr.
- Tug energy ≈ 1.5×10⁶ kg × 26 kWh/kg ≈ 39 GWh/yr ≈ 4.5 MW average, about 7–10 MWe with duty.

**Proposed tug design.** 1.0–1.5 MWe; Isp 2,500 s (range 2,000–3,000); thrust ≈ 50–75 N; payload 200–300 t; dry mass 40–60 t including about 7–15 t of arrays at 100–150 W/kg.
- Thrust time per 6 km/s round trip ≈ 1.0×10⁹ N·s ÷ 50–75 N ≈ **0.45–0.65 yr**.
- Cadence is then **window-limited at 1.5–3 yr**.
- 12 tugs × 200–300 t ÷ 1.5–3 yr ≈ **0.8–2.4 kt/yr capacity**.
- The fleet must also spend its first 1–2 years ferrying the 300–600 t plant outbound.

**Caveat.** A 1 MWe array is about 5,000 m², or about 7,000 m² sized for 1.2 AU. That is roughly 8–12× the ISS arrays and has no flight heritage at that size. NASA's 50–300 kW SEP studies and the Gateway PPE (~60 kW) are the nearest precedents. TRL is about 4 at MW scale.

### P0-F02: Mining rate inconsistency

**Verdict: agree.**

**Duty cycle (my estimate).** Multiply four factors:
- sunlit fraction for tethered solar power without large storage: about 0.5;
- maintenance and anomaly time: 0.8–0.9;
- repositioning and re-anchoring: 0.7–0.8;
- comms and safe-mode: 0.9.

The product is **≈25%, range 15–30%**.

**Per-robot excavation.** 2–5 t/h × 8,760 h × 0.15–0.30 ≈ **2.6–13 kt/yr**.

**The two figures can be reconciled.** The 1,000 t/yr "extraction" target is consistent with 2–5 t/h if it means **concentrate**:
- at a 5–15:1 concentration ratio, 1 kt of concentrate needs 5–15 kt excavated;
- that implies a 6–85% duty cycle.

I recommend stating it explicitly that way.

**Concentration ratio (estimate).** Ordinary-chondrite-like S-type regolith carries native metal at about 2% (LL), 7% (L) and 15–20% (H). Magnetic and size separation recovers about 50–80% into a 60–90%-metal concentrate. Excavated-to-concentrate is **5–15:1**.

**Mass-flow chain (Phase 0B steady state, S-type Fe‑Ni case):**

| Stage | Central | Range | Note |
|---|---|---|---|
| Excavated | 30 kt/yr | 15–50 | 4–6 working robots at 2.6–13 kt/yr each |
| Concentrate (station feed) | 3 kt/yr | 1.5–6 | 5–15:1 |
| Product (Fe‑Ni ingot, or carbonyl Fe/Ni) | 1.5 kt/yr | 0.7–2.5 | ~0.9 yield on contained metal |
| Transported to SEL1 | 1.3 kt/yr | 0.6–2.2 | tug-capacity limited |
| Tailings and slag kept on site | 28 kt/yr | 13–47 | larger debris stream than excavator fugitives |
| Water (C-type case only) | 10–100 t/yr | — | ISPP pilot |

**rq‑0‑26 is internally inconsistent.** The stated relation is torque = power ÷ angular speed.
- A 0.5–1 m bucket wheel with 0.5–1 m/s rim speed turns at 1–4 rad/s (10–40 rpm).
- At 10 kW that gives **τ ≈ 2.5–10 kN·m**.
- At 20–50 kW and about 5 rpm it gives **≈40–95 kN·m**.
- The stated "50–200 N·m at 10+ kW" needs 50–200 rad/s (500–1,900 rpm), which is not a bucket wheel.

Consequences:
- The 90–95% cancellation still leaves **0.25–5 kN·m residual**, which is an anchoring design driver.
- A 60–80 kg subsystem cannot carry kN·m-class gearing at 20–50 kW.
- "~100 Hz differential speed control" is presumably a control-loop bandwidth, not a speed difference.

rq‑0‑26 should be re-run with consistent torque, speed, power and mass.

### P0-F03: Station power

**Verdict: partly agree.** The finding is right for the stated product slate. The remedy is to narrow the slate, not to multiply power.

**Specific energy per kg of product.** These are my estimates against terrestrial references.

| Product / route | Theoretical | Practical | Basis |
|---|---|---|---|
| Fe‑Ni melting and casting | 0.35 kWh/kg | 0.6–1.5 | cp ≈ 0.65 kJ/kg·K × 1,500 K + 0.25 MJ/kg latent heat; furnace efficiency 40–70%; slag carry-over |
| Fe by H₂ reduction of magnetite (closed water loop) | 1.9 kWh/kg | 3–4 | electrolysis of 4/3 mol H₂O per mol Fe at ~70% efficiency, plus heating |
| Fe/Ni by carbonyl (Mond) refining | low | 1–3 | gas phase at 50–200 °C, 1–100 bar; Vale terrestrial heritage; no space heritage |
| Al from anorthite (molten salt or MRE) | — | 15–30 | Hall–Héroult is about 13–15 kWh/kg from alumina; silicate feed is worse |
| Metallurgical-grade Si | — | 11–15 | terrestrial carbothermal |
| Solar-grade Si, increment | — | +50–100 | Siemens-class |
| O₂ by MRE | — | 10–15 per kg O₂ | literature range |
| Water by thermal desorption (5 wt%, 500–800 °C) | 3–4.5 per kg H₂O | 4–10 | heating regolith at 0.4–0.65 MJ/kg plus vaporisation at 2.5 MJ/kg |

Gemini's 0.8–1.5 kWh/kg for water requires >15 wt% feed plus heat recuperation. I reject it as a baseline.

**Resulting power:**
- Current slate at 50 kt/yr (80% melting, 20% reduction): about 40 + 150 GWh/yr, or **≈22 MW**. Including SOG‑Si it rises to 30–90 MW, so the finding stands for that slate.
- Revised slate (1.5 kt/yr Fe‑Ni), melt route: 1.5–2.3 GWh/yr ≈ 0.2–0.3 MW for process heat.
- Revised slate, H₂ route: ~0.6 MW.
- Plus beneficiation (0.1–0.3 kWh/kg feed × 30 kt ≈ 0.4–1 MW), thermal control, autonomy and comms.
- **Total: 1–2.5 MWe average, 2–4 MWe peak connection.**

So 1–2.5 MW is adequate for the narrowed slate. That matches GPT and Claude round 1.

Solar-thermal concentrators can supply melt heat at higher efficiency than PV-to-resistance and should remain an option.

**Supplying line:** bom‑0‑5, resized to site power (see F04).

### P0-F04: 100 MW allocation and storage

**Verdict: agree.**

**Allocation, with tug arrays moved into bom‑0‑4 for clean accounting:**

| Site / load | MWe delivered | Nameplate BOL at 1 AU | Line |
|---|---|---|---|
| NEA site: processing plant | 1–2.5 | — | bom‑0‑5 |
| NEA site: 4–6 robots × 5–15 kW (30 kW peak) | 0.03–0.2 | — | bom‑0‑5 |
| NEA site: beneficiation | 0.4–1 | — | bom‑0‑5 |
| NEA site: water pilot (C-type case) | 0.05–0.25 | — | bom‑0‑6 / bom‑0‑5 |
| NEA site subtotal | 1.5–4 | **2.5–8**, sized at aphelion (1.2–1.5 AU, ×1.4–2.3) and 15-yr EOL | bom‑0‑5 |
| Tugs: 12 × 1–1.5 MWe | 12–18 | 13–20 | bom‑0‑4 |
| SEL1 receiving node | 0.05–0.2 | 0.1–0.25 | new |
| 0A pathfinder SEP | 0.3–0.5 | 0.35–0.6 | 0A line |
| **Total** | **≈14–23** | **≈16–29 (call it 15–30 MW)** | |

**Storage, sized to each site's eclipse profile:**
- **SEL1 node and tugs.** No eclipse in cruise. Safe-mode and transient storage only: 20–100 kWh per tug, 0.1–0.3 MWh at SEL1.
- **NEA surface.** NEA rotation periods are typically 2–20 h; small bodies spin faster than the ~2.2 h spin barrier only if monolithic. Nights therefore last about 1–10 h.
  - Carrying the full 1.5–4 MW through a 5 h night needs 7.5–20 MWh, which is 40–130 t of Li-ion at 150–200 Wh/kg pack level. Not justified.
  - Instead, duty-cycle processing to daylight (already in the duty factor), carry 50–300 kW of critical load (furnace hold, thermal, robot safe-mode), and use **thermal storage** for furnace hold.
  - Result: **0.5–3 MWh electrochemical** plus 1–5 MWh thermal.
- **Alternative.** A standoff or terminator-orbit plant has no eclipse but needs a material shuttle. This is an open trade (D1 sub-question).

**Delete** the 200–500 MWh of Li-ion.

### P0-F05: $5/W array price

**Verdict: agree.**

**Basis (estimates; supplier quotes are needed):**
- **Legacy space-qualified III‑V array hardware:** about $300–1,000/W (historical comsat and science-mission range).
- **High-volume commercial arrays (Starlink class):** not public. Industry estimates are about $10–50/W, but these arrays are mostly silicon, built for LEO and short-lived.
- **Dedicated 15–30 MW production run of III‑V or radiation-tolerant thin film:** **$30–150/W hardware** including PMAD and deployment structure.
- **Launch:**
  - At 50–100 W/kg system level and $1,500–4,000/kg to LEO (Falcon 9 class today), launch adds **$15–80/W**.
  - At $300–1,000/kg (Starship-mature, not demonstrated), it adds $3–20/W.
- **Spiral degradation.** Low-thrust spirals through the Van Allen belts degrade arrays by roughly 5–20% for III‑V cells. Avoid by launching to high elliptical orbit or accept the oversizing.

**Installed: $50–230/W, central about $90/W.** 20 MW × $90/W ≈ $1.8B, range $0.8–4.5B. About half sits in the tug line.

Confidence: low.

### P0-F06: Prospecting cadence

**Verdict: agree.** I side with GPT that remote observation is a different instrument and mission class.

**Δv available to a 100 kg green-monopropellant bus.** At Isp 235 s and 30% propellant fraction: Δv = 2,305 m/s × ln(1/0.7) ≈ **0.82 km/s**.

That is less than a single NEA rendezvous from Earth escape, which typically needs about 1.5–5 km/s low-thrust. It allows at most 1–3 flyby retargetings.

**Definitions:**
- **Remote survey** (orbit, size, albedo, spectral class): NEO Surveyor (launch NET 2027), Rubin/LSST and ground NIR spectroscopy (IRTF-class). The Project buys observing time and analysis for **$20–60M**. No Project spacecraft is needed.
- **Flyby characterization:** 1 target per 3–12 months, 1–3 km/s budget. Optional.
- **Rendezvous characterization** (needed for the gates: in-situ composition, regolith mechanics, spin and binarity): EP scouts of 200–400 kg with 5–8 km/s. Each visits **1–3 targets over 7 years**. Hayabusa2, at about 3.2 km/s of ion Δv, managed one target plus an extended mission.

**Fleet:** 6 rendezvous scouts (range 4–8) at **$30–80M each** including launch share. For reference, NASA SIMPLEx Janus was capped at about $55M for two ~36 kg flyby craft.

The $5M/unit figure is about 5–15× too low for deep-space operations.

### P0-F07: Robot mass and power

**Verdict: agree.**

**Onboard solar is not workable.** 20–50 kW mechanical at about 50% electrical-to-mechanical efficiency is 40–100 kWe. At about 250 W/m² that is **160–400 m²**, and more at aphelion. That is not credible on an anchored walker with night and dust exposure.

**Revised power.** Specific excavation energy:
- Terrestrial bucket-wheel excavators run about 1–1.6 kWh/m³ whole-machine (Bagger‑288 class). Cutting alone is about 0.2–0.5 kWh/t.
- Apply a 3–10× microgravity and anchoring penalty, my judgement.
- Result: **1–3 kWh/t**, giving 2–15 kWe at 2–5 t/h. Allow a 30 kW peak for consolidated clasts.
- This is low confidence. If clasts dominate, 20–50 kW may be right.

**Power source: tether from the site plant.**
- 2–3 kV DC, 1–2 km reach.
- At 3 kV and 10 A, with 5% loss, an aluminium conductor over 4 km of loop length needs about 7.5 mm². Cable mass is **≈50–150 kg** including insulation.
- At 1 kV it would be about 0.7 t. Hence the high voltage.

**Revised robot:**
- Mass 1.5–3 t.
- Excavator subsystem 150–400 kg, replacing 60–80 kg. The kN·m gearing drives this.
- Battery 10–30 kWh for mobility and safe-mode.

### P0-F08: Launch line

**Verdict: agree.**

**Earth-launched mass (revised architecture, my estimate):**

| Element | Mass |
|---|---|
| Plant (co-located) | 250–500 t |
| Tugs: 12 × 40–60 t dry | 480–720 t |
| Site power | 30–120 t |
| Robots: 12 × 1.5–3 t (incl. replacements) | 18–36 t |
| Scouts | ~2 t |
| ISPP pilot | 5–20 t |
| SEL1 node | 20–50 t |
| 0A pathfinder | 15–40 t |
| Spares | 80–150 t |
| **Hardware subtotal** | **≈0.9–1.6 kt** |
| EP propellant: LEO-to-escape spirals (~7 km/s, ~25% of departing mass) | ≈0.3–0.5 kt |
| EP propellant: plant ferrying | ≈0.15–0.2 kt |
| EP propellant: operations, 150–450 t/yr × 8 yr | ≈1.2–3.6 kt |
| **Total** | **≈2.5–6 kt** |

**Cost:**
- At current $1,500–4,000/kg: **$4–24B**.
- At Starship-mature $300–1,000/kg: $0.8–6B.
- **Planning range: $3–15B, central ~$6B.**

### P0-F09: Comms, ground and operations

**Verdict: agree.**

**Link capability.** MRO, with a 3 m HGA and 100 W at X-band into a 34 m antenna, achieves about 0.5–6 Mbps over 0.4–2.5 AU. Ka-band gives about 3–4× more.

**Site aggregate:** 2–10 Mbps at Ka-band with 2–3 m dishes. The plant acts as local relay for the robots over S-band or UHF.

**Ground segment.**
- NASA OIG (2023) reported DSN demand exceeding capacity, so DSN cannot be assumed free.
- Procure commercial deep-space apertures, or build three 18–35 m stations: **$0.15–0.5B**.
- Optical comms is a later upgrade. DSOC on Psyche demonstrated up to 267 Mbps at about 0.2 AU in 2023–24.
- Gemini's 2.5 TB/day (about 230 Mbps continuous) is not achievable by RF at 1 AU. Reject it unless optical comms is baselined.

**Operations.**
- 80–250 FTE at a loaded $0.25–0.4M each, plus software sustaining, gives **$50–150M/yr**.
- Over a 10-yr operations phase that is **$0.5–1.5B**.

### P0-F10: Crew

**Verdict: agree. Uncrewed.**

- A crewed SEL1 or NEA capability would add tens of $B in crew vehicles, habitat and ECLSS, with no Phase 0 function that robotics cannot plausibly perform.
- Remove the habitat and quarterly visits.
- Replace "structural human-rating" (rq‑0‑18) with **"structural reserve plus IDSS-compatible docking interfaces"**. Budget +3–8% of tug structure mass. I agree with GPT that calling it human-rating is misleading.

### P0-F11: Tug propellant and ISPP consumer

**Verdict: agree.**

**Demand.** About 38 t per round trip at 6 km/s, rising to about 65–70 t at 10 km/s. With 12 tugs at 1.5–3 yr cadence, demand is **≈150–450 t/yr**, plus about 150–200 t one-time for plant ferrying.

**Supply:**
- **Xenon:** world output is commonly cited at order 50–100 t/yr. Not viable, as the BOM already says.
- **Krypton:** world output is poorly documented, estimated at order 10²–10³ t/yr. Demand is comparable to or larger than total supply. Starlink's 2023 move from krypton to argon Hall thrusters is a market signal. Do not baseline krypton without a dated supply audit.
- **Iodine:** USGS gives world production of about 3×10⁴ t/yr, so demand is ≈0.5–1.5% of it. Price is about $35–70/kg. Flight heritage is small: ThrustMe NPT30‑I2 flew in 2020–21 at about 60 W. Iodine Hall thrusters have been tested in the lab at kW class. Corrosion and MW-class operation are undemonstrated.
- **Argon:** effectively unlimited, a few $/kg. Starlink V2 Mini flies argon Hall thrusters at kW class. Penalties are lower Hall efficiency (η ≈ 0.45–0.55) and high-pressure tankage of 15–30% of propellant mass.

**The commodity cost is trivial. The launch cost is not.** 150–450 t/yr × $2,000–4,000/kg is **$0.3–1.8B/yr**. This is the strongest economic case for water EP. It is also the only plausible Phase 0 consumer of ISPP output, and it sets the demand at **hundreds of t/yr, not ≥25 kt/yr**.

**Proposal:**
- No LOX/LH₂ production in Phase 0.
- ISPP becomes a C-type-conditional water pilot at 10–100 t/yr in 0B.
- A water-EP qualification track is the only route to a real ISPP customer.

### P0-F12: NRE, pathfinders, spares, contingency

**Verdict: agree.**

**Bases:**
- **MW-class SEP tug NRE: $1–3B.** For scale, the Gateway PPE (~60 kW) contract was about $375M in 2019.
- **Robots NRE: $0.3–1B.** This matches the BOM's "$300–400M" at the low end.
- **Plant NRE: $1.5–5B.** TRL 3–4 processes.
- **Autonomy and software: $0.5–2B.**
- **NRE total: $4–11B.**
- **Ground test facilities and simulants: $0.3–1B.**
- **0A pathfinder demo: $1.5–4B.** A 300–500 kW SEP vehicle, 2 robots and a 10–100 t/yr pilot plant with a rotating module. Psyche (~$1B) and Dawn (~$0.5B) are reference points for a single deep-space mission.
- **Replacements.** Robots have a 5-yr life over about 10 yr of operations, so about 4 replacements. Tugs have a 15-yr life: no hull replacements, but thruster and PPU spares.
- **Spares total: $0.5–1.5B.**
- **Contingency.** 30–40% on 0A. **35–50% on 0B**, consistent with TRL 3–4 elements at a 70% joint-confidence target.

### P0-F13: Organization spec

**Verdict: agree.** Draft scope, pending the rq‑0‑29 text:
- **Legal entity.** A foundation plus an operating company, domiciled in a state with a space-resources law: US CSLCA 2015, Luxembourg 2017, UAE, or Japan 2021.
- **Authorization.** Mission authorization and supervision under OST Article VI. The US currently has a mission-authorization gap for novel activities.
- **Spectrum and export control.** ITU filings; ITAR/EAR compliance.
- **Liability and insurance.** Liability Convention 1972; third-party insurance.
- **Planetary protection.** COSPAR categories. Most NEAs are Category I–II; SEL1 delivery is unrestricted.
- **Coordination.** Artemis Accords safety-zone notifications; space-traffic coordination.
- **Disputes.** PCA Optional Rules for outer-space disputes (2011).
- **Continuity.** IP and data policy; succession charter and endowment.

**Budget:** $100–300M over the phase ($7–20M/yr, about 20–40 staff). Insurance premiums are excluded and should be carried in the launch and contingency lines.

### P0-F14: Debris, contamination and regulation

**Verdict: agree.**

**Escape velocity sets the scale.** For a 500 m body at ρ = 2,000 kg/m³: M ≈ 1.3×10¹¹ kg and v_esc = √(2GM/r) ≈ **0.26 m/s**. Almost any disturbed grain can escape.

**Fate of escaped material.**
- Small grains below about 100 µm are pushed outward by solar radiation pressure.
- Larger grains form a co-orbital trail.
- The main hazard is to the Project's own arrays, optics and approaching tugs. Hazard to Earth is negligible at kt scale; for comparison, the DART impact produced order 10⁷ kg of ejecta.
- The **tailings stream (13–47 kt/yr) is a bigger management problem than excavator fugitives**.

**Proposed requirements:**
- Escaped mass at most 0.1–1 t/yr per site initially, tightened after ejecta modelling.
- No ≥1 mm particles above v_esc into designated approach corridors.
- Attributable array and optics degradation <1%/yr.
- Tailings bagged, sintered or compacted into berms.

**Budget:** $50–200M.

**Certification:** the licensing state's authority (see F13). No international standard exists, so the Project should propose one.

GPT's limit of ≤10 kg/yr (99.9999%) is defensible but probably mass-expensive. Where to set it is a values choice (see §5).

### P0-F15: Deliberations not written back

**Verdict: partly.** Configuration control did fail. However, seven of the conclusions are visible to me only as one-line summaries.

Proposed write-backs:

| Deliberation | Proposed change |
|---|---|
| rq‑0‑11 | 0.05–0.15 g rotating melt module at pilot scale (10–100 t/yr product). At r = 5–10 m, 0.1 g needs 3–4 rpm. Adds +20–60 t and $0.5–2B. Treat as a hypothesis to be gated, not as a baseline for all processes. |
| rq‑0‑14 | Keep "design-for" interfaces. **Replace "≥25 kt/yr"** with a customer-defined threshold: a named consumer with demand ≥ X t/yr and delivered cost below the Earth-supplied equivalent. Today the derivable demand is 0.15–0.45 kt/yr (tugs). |
| rq‑0‑18 | Structural reserve plus docking interfaces (see F10). |
| rq‑0‑28 | I disagree with its claim that Phase 0–1 costs are "approximately correct". This review puts Phase 0 at 1.4–5× the BOM. Keep procurement costing for Phase 0. Its "logarithmic" cost scaling is asserted, not derived. |
| rq‑0‑29 | Becomes the bom‑0‑7 spec (see F13). |
| rq‑0‑30, ‑47, ‑48 | Cryogenic boil-off and sunshield requirements apply only if cryogens are carried. With iodine or argon at ambient high pressure they drop out. MLI degradation still applies to plant thermal control and is aggravated by dust: carry a 1.5–2× MLI degradation margin. |

### P0-F16: Consensus documents vs. BOM

**Verdict: agree.**
- Freeze one configuration-controlled baseline.
- BOM line values are authoritative until a numbered change is approved.
- Regenerate the consensus documents against the current specs, including the Opus 4.6 versions.

### P0-F17: "Pure research" vs. $15.7B of hardware

**Verdict: agree.**
- Even 0A buys flight hardware (scouts and the pathfinder). The homepage should say "research and pathfinders".
- **0A: $5–15B. 0B: $17–70B.**

### P0-F18: Metallurgy fallback

**Verdict: agree.** I partly side with GPT on the scale argument.
- Comparing a 100 g batch with 50 kt/yr throughput mixes batch size with annual rate.
- The honest gap is from mm-scale levitated melts on the ISS Electromagnetic Levitator to 1–10 t batches. That is still **4–6 orders of magnitude** with **no data on bulk metal/slag separation in microgravity**. "Paradigm gap" is fair.

**Baseline:** routes that need no gravity where possible:
- magnetic beneficiation, then carbonyl refining or H₂ reduction;
- centrifugal melting only at pilot scale.

**Fallbacks, with the trigger** that the G3 process gate fails at the 1 t-scale pilot:
- **(a) Earth-supplied Phase 1 material at SEL1:** $2,500–12,000/kg today, $500–2,500/kg if Starship matures. Per kt/yr of demand this is $0.5–12B/yr.
- **(b) Lunar processing:** gravity solves separation, but the Moon has no native-metal ore body (about 0.1–0.5% meteoritic Fe) and adds about 2.5–3 km/s to reach SEL1. Cost $10–25B. This is a poor fit for an Fe‑Ni product.

I rank (a) first for Phase 1 continuity and (b) as the capability fallback.

### P0-F19: Phase 1 demand

**Verdict: agree.**
- Phase 1 mass, from the given ranges: 69–1,850 t of collectors plus 3.45–225 kt of PV blankets. That is a 65× spread.
- Over about 10 years this is 0.35–23 kt/yr total.
- Crude Fe‑Ni serves structure, shielding and ballast, not PV. I estimate the ISRU-eligible fraction at 10–50%, giving **≈0.04–11 kt/yr**.
- Delivery point is SEL1. Purity needs are unknown; 95–99% structural Fe‑Ni is assumed.
- **Gate 0B on a signed Phase 1 material demand schedule** (mass, material, purity, date, delivery point) that is known within 3×.

---

## 2. Revised specification (phase level)

| Parameter | Old | New | Range | Basis | Confidence |
|---|---|---|---|---|---|
| Processing site | SEL4/L5 central station | Co-located at target NEA; product to SEL1 | (central-SEL1 kept as alternative) | calculation (F01 energy) | medium |
| Processing throughput | 50 kt/yr | 3 kt/yr concentrate feed | 1.5–6 | calculation | low |
| Product | Al, Fe, Ni, SOG-Si | Fe‑Ni ingot or carbonyl Fe/Ni | 0.7–2.5 kt/yr | judgement | low |
| Excavated mass | 20–880 kt/yr (inconsistent) | 30 kt/yr | 15–50 | calculation | low |
| Robot duty cycle | unstated | 25% | 15–30 | judgement | low |
| Robots deployed | 20 | 8 + 4 replacements | 6–14 | calculation | low |
| Robot mass | 2.5–3.5 t (or 500 kg) | 2 t | 1.5–3 | judgement | low |
| Excavation power | 20–50 kW | 2–15 kWe nominal, 30 kW peak | 2–50 | literature + judgement | low |
| Excavator subsystem mass | 60–80 kg | 250 kg | 150–400 | calculation (torque) | low |
| Excavator torque | 50–200 N·m | 2.5–95 kN·m | — | calculation | medium |
| Robot power source | onboard solar | 2–3 kV tether from site | — | calculation | medium |
| Station power | 1–2.5 MW | 1–2.5 MWe average, 2–4 MWe peak | 1–4 | calculation | medium |
| Array total | 100 MW | 15–30 MW BOL | 15–30 | calculation | medium |
| Storage | 200–500 MWh Li-ion | 0.5–3 MWh site + thermal; 20–100 kWh per tug | 0.5–3 | calculation | medium |
| Array installed cost | $5/W | $90/W | 50–230 | literature + judgement | low |
| Tug count | 10 / 15 | 12 | 10–15 | calculation | medium |
| Tug power | ~0.1–0.25 MWe | 1.25 MWe | 1.0–1.5 | calculation | medium |
| Tug payload | 150–250 t | 250 t | 200–300 | judgement | medium |
| Tug Isp | Hall (unstated) | 2,500 s | 2,000–3,000 | calculation | medium |
| Round-trip Δv | 6–10 km/s | 6 km/s reference | 4–10 | literature (NEA accessibility) | medium |
| Round-trip time | ~1.5 yr implied | 1.5–3 yr (window-limited) | 1.5–4 | calculation | low |
| Fleet delivery | ~1.3–2 kt/yr claimed | 1.3 kt/yr | 0.8–2.4 | calculation | low |
| Tug propellant | Kr/I | Iodine or argon (gated); water-EP upgrade | — | literature | medium |
| EP propellant demand | unstated | 300 t/yr | 150–450 | calculation | medium |
| ISPP | 4 × LOX/LH₂ units | 1 water pilot, C-type-conditional | 10–100 t/yr | judgement | low |
| Extraction temperature | 1,000 °C | 300–800 °C test envelope | — | literature | medium |
| Prospecting | 32–50 × 100 kg at $5M | ground survey + 6 EP scouts (200–400 kg) | 4–8 | calculation | medium |
| Crew | quarterly visits | none | — | judgement | high |
| Containment | >99% | ≤0.1–1 t/yr escaped per site | — | judgement | low |
| Contingency | none | 0A 30–40%, 0B 35–50% | — | literature | medium |
| Phase cost | $15.7B | $40B central | 22–85 | calculation | low |

### Closed Phase 0 budget table

**Mass flow:** see the F02 chain (excavated → concentrate → product → SEL1).

**Power:** see F04.

**Δv and trip time per vehicle class:**

| Vehicle | Power | Δv | Trip time / cadence |
|---|---|---|---|
| Cargo tug | 1–1.5 MWe | 4–10 km/s round trip | Thrust 0.3–1.2 yr; cadence 1.5–4 yr |
| Plant ferry (tugs, one-time) | — | LEO/HEO→NEA ≈ 5–8 km/s low-thrust | 1–2.5 yr |
| 0A pathfinder SEP | 0.3–0.5 MWe | 8–12 km/s (spiral + rendezvous + return of a sample cargo) | 3–5 yr |
| Rendezvous scout | 1–5 kW | 5–8 km/s | 1–3 targets in 7 yr |

**Cost** (2026 $B; "0A + 0B → total" means the low end of each phase and the high end of each phase summed separately):

| Account | 0A | 0B | Total |
|---|---|---|---|
| Ground R&D and facilities | 0.5–1.5 | — | 0.5–1.5 |
| Prospecting | 0.2–0.55 | — | 0.2–0.55 |
| NRE | 1.5–4 | 2–6 | 3.5–10 |
| Pathfinder demo | 1.5–4 | — | 1.5–4 |
| Tugs (incl. arrays) | — | 1.5–5.3 | 1.5–5.3 |
| Robots | — | 0.36–0.96 | 0.36–0.96 |
| Plant | — | 4–12 | 4–12 |
| Site power | — | 0.2–1.2 | 0.2–1.2 |
| ISPP pilot | — | 0.15–0.4 | 0.15–0.4 |
| SEL1 node | — | 0.2–0.6 | 0.2–0.6 |
| Launch (incl. propellant) | in pathfinder | 3–15 | 3–15 |
| Comms, ground and operations | 0.2–0.6 | 0.7–2 | 0.9–2.6 |
| Organization | 0.05–0.12 | 0.05–0.18 | 0.1–0.3 |
| Debris | — | 0.05–0.2 | 0.05–0.2 |
| Spares | — | 0.5–1.5 | 0.5–1.5 |
| Subtotal | 4.0–10.8 | 12.7–45.3 | 16.7–56 |
| Contingency | 30–40% | 35–50% | — |
| **Phase total** | **5–15** | **17–68** | **22–83 (central ~40)** |

---

## 3. Interfaces

| From → To | Flow | Value | In current BOM? |
|---|---|---|---|
| Robots → plant | concentrate/ore (short-haul on site) | 15–50 kt/yr excavated, 1.5–6 kt/yr concentrate | no (on-site haul unspecified) |
| Site power → robots | power by tether | 0.03–0.2 MW (30 kW peak each) | no (tether) |
| Site power → plant | power | 1–2.5 MWe average | partly |
| Plant → tugs | product | 0.7–2.5 kt/yr | no |
| Tugs → SEL1 node | product | 0.6–2.2 kt/yr | no (node absent) |
| Earth → tugs | EP propellant | 150–450 t/yr | no |
| ISPP pilot → tugs (water EP, conditional) | water | 10–100 t/yr | no |
| Scouts → mission ops | data | 0.1–1 Mbps each | no |
| Site → ground | data | 2–10 Mbps Ka-band | no |
| Plant → environment | tailings and fugitives | 13–47 kt/yr tailings; ≤0.1–1 t/yr escaped | no |
| Plant/tugs → space | waste heat | plant 1–3 MWth; tug PPU ~50–75 kWth each | no |
| SEL1 node → Phase 1 | Fe‑Ni stock | 0.04–11 kt/yr eligible demand | no |

---

## 4. Missing items or scope

1. **Waste-heat rejection** (round-1 Reviewer note 5, confirmed).
   - Plant at 1–3 MWth: at 300 K with a two-sided ε = 0.9 radiator rejecting about 700 W/m², that is 1,500–4,000 m² and **15–40 t**.
   - At a 500 K furnace-loop radiator it is about 5× smaller.
   - Tug PPU losses (≈5%) of 50–75 kWth need about 70–100 m², under 1 t.
   - Must be carried explicitly in plant and tug mass.
2. **SEL1 receiving node:** berthing, product storage, inventory. $0.2–0.6B.
3. **On-site haulage, regolith tether network and tailings handling.**
4. **Ground test infrastructure:** large thermal-vacuum chambers, regolith simulant production, DEM validation.
5. **Trajectory and target-selection study:** optimized low-thrust trajectories for the top ~10 candidates.
6. **Water-EP qualification track:** $0.2–0.6B, conditional.
7. **Insurance, cybersecurity, end-of-life disposal** of tugs and the plant.
8. **Standard cargo container** and product form (ingot, bagged powder).

---

## 5. Remaining disagreements and open questions

- **Target class (new divergence).**
  - S-type gives native Fe‑Ni, simple melt or carbonyl processing, and no water.
  - C-type gives water (an ISPP customer if water EP matures) plus magnetite reducible by H₂ in a closed water loop (3–4 kWh/kg Fe), but less free metal.
  - One site cannot do both. This is a **trade-off point**: product simplicity vs. propellant closure. Decide it after 0A rendezvous data.
- **Siting (D1).** I favour co-location on the energy argument in F01.
  - A central SEL1 station does have real advantages: serviceability, multiple sources, a benign thermal environment.
  - It only closes if ore is concentrated more than about 20:1 before shipment, which pushes most of the processing to the asteroid anyway.
  - A surface vs. standoff plant remains open.
- **Economics of 0B (D16, corrected).**
  - ISRU Fe‑Ni at ~$2,000–6,000/kg vs. Earth delivery at $500–12,000/kg.
  - Whether 0B is a capability investment worth its premium is a values question.
- **Containment threshold:** 0.1–1 t/yr (this review) vs ≤10 kg/yr (GPT). A values question, settled with the licensing authority.
- **Excavation specific energy:** 1–3 kWh/t (this review, low confidence) vs. 20–50 kW retained (Gemini). Settled by DEM and in-situ tests.
- **Propellant:** argon (storage penalty, heritage) vs. iodine (density, corrosion risk). Settled by MW-class life tests.
- **Gemini's 100 MW and 50 kt/yr central station** is internally inconsistent in its own submission but remains a stated position.
- **Phase 1 demand:** unknown within 65×.

### Gate criteria: 0A → 0B

| Gate | Criterion | Where models differ |
|---|---|---|
| G1 Target | ≥2 rendezvous-characterized targets with water ≥2–8 wt% or native metal ≥5–10 wt%; spin and binarity known | Thresholds: Claude ≥2 / Gemini ≥3 / GPT ≥1 |
| G2 Access | Optimized low-thrust round trip ≤8 km/s and return cadence ≤3 yr | GPT prefers an optimized trajectory over a scalar threshold |
| G3 Process | Representative-feed pilot producing ≥1–10 t of product, ≥1,000 h, measured specific energy within 1.5× of plan; partial-g separation demonstrated or a no-melt route qualified | — |
| G4 Excavation | ≥500–1,000 h in situ at ≥0.5 t/h with measured force/torque spectra and containment | Duration |
| G5 Propulsion | ≥10,000 h on a MW-class thruster cluster, or total-impulse qualification, on the selected propellant | — |
| G6 Demand | Signed Phase 1 material schedule known within 3× | Gemini had no demand gate |
| G7 Economics | ISRU delivered cost vs. Earth supply at SEL1 using the then-current launch price; explicit capability-premium decision | — |
| G8 Cost | Independent cost estimate at ±30% | — |
| G9 Regulatory | Mission authorization and containment standard agreed with the licensing state | — |

---

## 6. Decision-quality critique

**Methods used:**
- the Composite Scaffold for each decision;
- **QOC** for siting;
- **ACH** for the 0B economics, where an anchoring and units error was carried forward;
- **GRADE EtD** for the 0A/0B gate structure;
- ATAM sensitivity/trade-off labelling throughout;
- IPCC-style calibrated language: likelihood stated separately from confidence.

### DQ1. Processing siting (D1; drives blocking finding F01)

1. **Frame.** A one-way-door existence decision. It fixes plant design, tug fleet and power siting. Cynefin: complicated, because it is analyzable from transport energy.
2. **Criteria (weights stated before options):** transported energy and mass (0.35); process-environment risk (0.25); serviceability (0.15); replicability to later sites (0.15); cost (0.10).
3. **Options:**
   - (O1) Central SEL1 station fed with raw ore.
   - (O2) Central SEL1 station fed with concentrate at ≥20:1.
   - (O3) Co-located surface plant.
   - (O4) Co-located standoff plant.
   - (O0) Null: no 0B; Earth supply.
4. **QOC matrix:**

| Option | Transport | Process environment | Serviceability | Replicability | Cost |
|---|---|---|---|---|---|
| O1 Central, raw ore | ✗✗ 150–300 MWe of tugs | ✓ | ✓ | ✓ | ✗✗ |
| O2 Central, concentrate | ~ about 10–15 MWe | ✓ | ✓ | ✓ | ~ |
| O3 Co-located surface | ✓ 7–10 MWe | ✗ dust, night | ✗ | ~ | ~ |
| O4 Co-located standoff | ✓ | ~ | ~ | ~ | ~ (needs shuttle) |
| O0 No 0B | ✓ | n/a | ✓ | ✗ no capability | ✓ / ✗ depends on launch price |

5. **Points.**
   - Ore mass per tonne of product is a **sensitivity point**: transport energy is linear in it.
   - Siting is a **trade-off point** between transport energy and process-environment risk. Moving processing onto the asteroid saves energy but worsens dust and night exposure.
6. **Evidence certainty.**
   - Transport energy: high confidence, from basic physics. It is **very likely (>90%)** that O1 cannot close inside 100 MW.
   - Process risk at a dusty site: low confidence, limited evidence.
7. **Key assumption.** Beneficiation reaching ≥5:1 works in microgravity. Falsified if the 0A pilot magnetic or size separation achieves <3:1 at representative feed.
8. **Decision.** In the context of a power-limited EP logistics chain, facing a 50–125× transport shortfall, adopt O3/O4 with O2 retained as an alternative, to cut transport energy by ≥10×, accepting site dust and eclipse exposure and harder servicing.
9. **Consequences.** This constrains plant mass (it must be launched and ferried), makes power siting dual, and makes target selection (G1) a prerequisite for plant design.

**Weakest DQ link: alternatives.** Round 1 framed D1 as a binary (co-located vs. central). It omitted O2 (central with high pre-concentration), which is the real competitor, and O0 (null). This matters because O2 keeps the serviceability benefit Gemini wanted.

### DQ2. Phase 0B scale (A3 and D2)

1. **Frame.** A property decision, two-way door in principle (a modular plant can be scaled up). Complicated, but demand is unknown.
2. **Criteria:** Phase 1 usefulness (0.3); demonstration value (0.3); cost (0.25); transport closure (0.15).
3. **Options:** 0.1 kt/yr pilot only; 1–2.5 kt/yr; 5–15 kt/yr; 50 kt/yr.
4. **Matrix.**
   - 50 kt/yr fails transport and power (musts).
   - 5–15 kt/yr fails transport at 100 MW.
   - 1–2.5 kt/yr closes.
   - The pilot-only option closes but delivers little Phase 1 value.
5. **Points.** Scale is a **trade-off point**: demonstration value and Phase 1 usefulness pull against cost and economic exposure (DQ3). Values, not facts.
6. **Evidence certainty.** Phase 1 demand is uncertain by 65× (very low confidence).
7. **Key assumption.** Phase 1 needs ≥1 kt/yr of crude Fe‑Ni at SEL1. Falsified if the Phase 1 material schedule shows ISRU-eligible demand <0.3 kt/yr.
8. **Decision.** Choose 1–2.5 kt/yr, gated by G6, accepting that it may be oversized for actual demand.
9. **Consequences.** This sets fleet, robot and power sizing. It must be revisited at G6.

**Weakest link: information.** The scale was chosen before the demand schedule existed. Round 1 had three numbers differing 10× without a common demand anchor.

### DQ3. Is Phase 0B justified against Earth supply? (D16)

**ACH.** Three hypotheses:
- **H1:** 0B ISRU is cheaper than Earth supply.
- **H2:** 0B is roughly comparable to Earth supply.
- **H3:** 0B is far more expensive.

**Evidence and how it bears:**
- (E1) Round-1 Claude's "$3–7M/kg" ISRU figure supports H3 strongly. On recomputation, $26–89B ÷ 8–20 kt ≈ $1,300–11,000/kg, which shows E1 is a units error. **E1 is invalid.**
- (E2) Earth delivery to SEL1 at $2,500–12,000/kg today is consistent with H2 and H1.
- (E3) Starship-mature delivery at $500–2,500/kg disconfirms H1 and supports H3 moderately.
- (E4) The marginal cost of ISRU after capex is low. It supports H1 for Phase 1 and later.

**Least disconfirmed:** H2 at current prices; H3 if launch costs fall roughly 5×. Round 1 anchored on H3 through E1 and the rapporteur did not test it.

**Scaffold:**
1. **Frame.** Executive, one-way, about $17–68B. Complex domain: it depends on the launch market.
2. **Criteria:** $/kg delivered; strategic capability; risk.
3. **Options:** build 0B; pilot plus Earth supply; defer 0B with a real option.
4. **Matrix.** Pilot plus deferral preserves option value. Building 0B buys learning at a premium.
5. **Points.** The decision is a **sensitivity point on launch $/kg**.
6. **Certainty.** It is **about as likely as not (33–66%)** that 0B beats Earth supply on delivered cost over the phase. Medium confidence.
7. **Key assumption.** Launch prices stay above about $1,500/kg. Falsified by demonstrated Starship commercial pricing below $1,000/kg to LEO.
8. **Decision.** Defer the 0B commitment to G7. Value the deferral explicitly as a real option. Accept that capability learning is delayed.
9. **Consequences.** G7 becomes a hard gate, and the Phase 1 supply plan needs an Earth-supplied baseline.

**Weakest link: reasoning**, specifically the unchecked arithmetic.

### DQ4. Tug power and propellant (A5 and D7)

1. **Frame.** Property decisions, partly reversible (thrusters can be swapped, arrays cannot). Complicated.
2. **Criteria:** supply security; recurring cost; TRL; storage mass; Isp and efficiency.
3. **Options:** Kr; I₂; Ar; water EP; null (Xe).
4. **Matrix.**
   - Xe and Kr fail supply (a must).
   - I₂ is good on density and has low TRL at MW.
   - Ar has heritage and a storage penalty.
   - Water EP closes logistics but is at TRL ~3.
5. **Points.**
   - Isp at fixed power is a **trade-off point**: higher Isp cuts propellant launch ($0.3–1.8B/yr) but cuts thrust and cadence.
   - The propellant choice is mainly a sensitivity point on recurring launch cost.
6. **Certainty.** Iodine supply is adequate: very likely, high confidence. MW-class iodine life: low confidence, very limited evidence.
7. **Key assumption.** A MW-class Hall cluster reaches ≥10,000 h on Ar or I₂ with η ≥0.5. Falsified by G5 erosion or corrosion results.
8. **Decision.** Iodine or argon, gated by G5; water EP as a funded upgrade path. Accept iodine corrosion risk or the argon tankage penalty.
9. **Consequences.** This defines the ISPP customer and removes cryogenic scope.

**Weakest link: frame.** Round 1 framed propellant choice as a supply question. It omitted the recurring launch-cost driver and the Isp trade-off, which is a values choice between cadence and recurring cost.

### DQ5. The 0A/0B split and gate set (A1 and D18)

**GRADE EtD:**
- **Benefits:** risk retirement before ~$17–68B is committed.
- **Harms:** 3–6 yr of schedule.
- **Certainty of evidence:** low for the process, excavation and demand gates.
- **Values:** the stakeholders' tolerance for delay vs. risk is unelicited.
- **Resources:** 0A costs $5–15B.
- **Acceptability and feasibility:** high.

**Recommendation:** strong for the split; conditional for the specific thresholds.

**Scaffold:**
1. **Frame.** An executive decision, reversible in structure.
2. **Criteria:** risk retired per dollar; schedule; discriminating power of each gate.
3. **Options:** single phase; split with 9 gates; split with fewer gates.
4. **Matrix.** Each gate is mapped to the assumption it discriminates (Platt strong inference): G3 against the microgravity-separation hypothesis, G7 against economics, and so on.
5. **Points.** Gate stringency is a **trade-off point** between schedule and risk. Values.
6. **Certainty.** It is **likely (66–90%)** that at least one of G3, G6 or G7 fails or forces re-scope. Medium confidence.
7. **Key assumption.** 0A can produce G3 data within ~6 yr. Falsified if the pathfinder slips past year 7.
8. **Decision.** Split with gates G1–G9. Accept the delay.
9. **Consequences.** 0B design freezes after G3–G5.

**Weakest link: values.** Round 1's gate thresholds (2–8 wt% water, 500–1,000 h) were listed without any elicited risk appetite.

### DQ6. Uncrewed Phase 0 (A2)

- Reversible and low-cost. Evidence and agreement are high, so it is **very likely** correct.
- **Weakest link: commitment.** The rq‑0‑18 "human-rating" language still appears in the specs and must be purged.

### Other round-1 decisions that hold, with caveats

- **A8 ($/W):** holds. The hardware-only overlap of $30–100/W is reasonable. Installed cost belongs in the $50–230/W range.
- **A7 (storage):** holds. Round 1 missed thermal storage and processing duty-cycling as the main lever.
- **A6 (tether):** holds. Round 1 did not size the cable; it needs 2–3 kV to stay at 50–150 kg.
- **A18 (extraction temperature):** holds.

---

```yaml
item: phase
model: Claude (Anthropic)
findings:
  - id: P0-F01
    verdict: partly
    summary: Transport fails by ~50-125x (finding's trip time ~2x pessimistic because the outbound leg is empty), and moving 50 kt/yr ore at 6 km/s needs ~150-300 MWe of tug power, which no reallocation provides.
    proposed_change: Co-locate processing at the NEA, ship 0.7-2.5 kt/yr product to SEL1 with 10-15 tugs of 1-1.5 MWe, 200-300 t payload, Isp ~2500 s.
  - id: P0-F02
    verdict: agree
    summary: At 15-30% duty a robot excavates 2.6-13 kt/yr; the 1 kt/yr target is consistent only if it means concentrate; rq-0-26 torque figures are off by 10-200x.
    proposed_change: Adopt chain 30 kt/yr excavated -> 3 kt/yr concentrate -> 1.5 kt/yr product -> 1.3 kt/yr to SEL1, and re-run rq-0-26.
  - id: P0-F03
    verdict: partly
    summary: 1-2.5 MW cannot refine 50 kt/yr of the mixed slate (~22-90 MW) but suffices for 0.7-2.5 kt/yr Fe-Ni.
    proposed_change: Narrow product to Fe-Ni; station power 1-2.5 MWe average from resized bom-0-5.
  - id: P0-F04
    verdict: agree
    summary: Total need is ~15-30 MW BOL, mostly tugs; storage belongs at the rotating asteroid, not at L-points.
    proposed_change: Move tug arrays into bom-0-4, resize bom-0-5 to 2.5-8 MW site power, 0.5-3 MWh battery plus thermal storage.
  - id: P0-F05
    verdict: agree
    summary: Installed space array cost is ~$50-230/W including launch, not $5/W.
    proposed_change: Use $90/W central ($50-230) with supplier quotes required.
  - id: P0-F06
    verdict: agree
    summary: A 100 kg monoprop bus has ~0.8 km/s, less than one rendezvous.
    proposed_change: Use ground and NEO Surveyor data for remote survey plus 6 (4-8) EP rendezvous scouts at $30-80M.
  - id: P0-F07
    verdict: agree
    summary: Onboard solar for 40-100 kWe is infeasible and the excavator mass ignores kN-m torques.
    proposed_change: 1.5-3 t robots, 2-15 kWe nominal, 2-3 kV tether power, 150-400 kg excavator.
  - id: P0-F08
    verdict: agree
    summary: Phase 0 launches ~2.5-6 kt including EP propellant.
    proposed_change: Add launch line $3-15B (central ~$6B).
  - id: P0-F09
    verdict: agree
    summary: DSN cannot be assumed free and the site needs 2-10 Mbps Ka-band.
    proposed_change: Add ground segment $0.15-0.5B and operations $50-150M/yr.
  - id: P0-F10
    verdict: agree
    summary: No Phase 0 function needs crew.
    proposed_change: Uncrewed; replace human-rating with structural reserve plus docking interfaces.
  - id: P0-F11
    verdict: agree
    summary: Tugs need 150-450 t/yr EP propellant whose launch costs $0.3-1.8B/yr; LOX/LH2 has no consumer.
    proposed_change: Iodine or argon gated by life test; ISPP becomes a C-type water pilot tied to a water-EP track.
  - id: P0-F12
    verdict: agree
    summary: NRE $4-11B, pathfinder $1.5-4B, spares and contingency are missing.
    proposed_change: Add itemised NRE, pathfinder, spares and 30-50% contingency lines.
  - id: P0-F13
    verdict: agree
    summary: Organization line lacks scope.
    proposed_change: Specify entity, authorization, ITU, export, liability, planetary protection, succession at $100-300M.
  - id: P0-F14
    verdict: agree
    summary: Escape velocity ~0.26 m/s makes containment critical and tailings (13-47 kt/yr) are the larger stream.
    proposed_change: Escaped mass <=0.1-1 t/yr per site, tailings management, $50-200M.
  - id: P0-F15
    verdict: partly
    summary: Configuration control failed but seven deliberation texts were unavailable to check.
    proposed_change: Write back proposals per conclusion, replacing the rq-0-14 25 kt/yr threshold with a customer-defined one.
  - id: P0-F16
    verdict: agree
    summary: Consensus documents contradict the BOM.
    proposed_change: Freeze one numbered baseline with BOM authoritative.
  - id: P0-F17
    verdict: agree
    summary: Phase 0 buys hardware even in its research stage.
    proposed_change: Split into 0A ($5-15B) and 0B ($17-68B) with gates G1-G9.
  - id: P0-F18
    verdict: partly
    summary: The real gap is 4-6 orders of magnitude in batch scale with no microgravity slag-separation data; still a paradigm gap.
    proposed_change: Baseline no-melt routes, pilot centrifugal melting, fallback to Earth-supplied material first and lunar second, triggered by G3.
  - id: P0-F19
    verdict: agree
    summary: ISRU-eligible Phase 1 demand is 0.04-11 kt/yr and unknown within 65x.
    proposed_change: Gate 0B on a signed Phase 1 material schedule known within 3x.
revised_spec:
  - parameter: processing_site
    old: Sun-Earth L4/L5 central station
    new: co-located at target NEA, product to SEL1
    range: [co-located, central-SEL1 with >=20:1 concentrate]
    unit: n/a
    basis: calculation
    confidence: medium
  - parameter: station_feed
    old: 50000
    new: 3000
    range: [1500, 6000]
    unit: t/yr
    basis: calculation
    confidence: low
  - parameter: product_output
    old: 50000 (mixed Al Fe Ni Si)
    new: 1500 (Fe-Ni)
    range: [700, 2500]
    unit: t/yr
    basis: judgement
    confidence: low
  - parameter: excavated_mass
    old: unspecified
    new: 30000
    range: [15000, 50000]
    unit: t/yr
    basis: calculation
    confidence: low
  - parameter: robot_duty_cycle
    old: unspecified
    new: 25
    range: [15, 30]
    unit: percent
    basis: judgement
    confidence: low
  - parameter: robots_deployed
    old: 20
    new: 12
    range: [6, 14]
    unit: units incl 4 replacements
    basis: calculation
    confidence: low
  - parameter: robot_mass
    old: 2500-3500
    new: 2000
    range: [1500, 3000]
    unit: kg
    basis: judgement
    confidence: low
  - parameter: excavation_power
    old: 20-50
    new: 8
    range: [2, 50]
    unit: kWe
    basis: judgement
    confidence: low
  - parameter: excavator_subsystem_mass
    old: 60-80
    new: 250
    range: [150, 400]
    unit: kg
    basis: calculation
    confidence: low
  - parameter: station_power
    old: 1-2.5
    new: 1.75
    range: [1, 4]
    unit: MWe
    basis: calculation
    confidence: medium
  - parameter: array_total_BOL
    old: 100
    new: 20
    range: [15, 30]
    unit: MW
    basis: calculation
    confidence: medium
  - parameter: site_storage
    old: 200000-500000
    new: 1500
    range: [500, 3000]
    unit: kWh electrochemical plus thermal
    basis: calculation
    confidence: medium
  - parameter: array_installed_cost
    old: 5
    new: 90
    range: [50, 230]
    unit: USD/W
    basis: literature
    confidence: low
  - parameter: tug_count
    old: 15
    new: 12
    range: [10, 15]
    unit: units
    basis: calculation
    confidence: medium
  - parameter: tug_power
    old: 0.15-0.25
    new: 1.25
    range: [1.0, 1.5]
    unit: MWe
    basis: calculation
    confidence: medium
  - parameter: tug_round_trip_time
    old: 1.5
    new: 2.2
    range: [1.5, 4]
    unit: yr
    basis: calculation
    confidence: low
  - parameter: fleet_delivery_to_SEL1
    old: unspecified
    new: 1300
    range: [800, 2400]
    unit: t/yr
    basis: calculation
    confidence: low
  - parameter: EP_propellant_demand
    old: unspecified
    new: 300
    range: [150, 450]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: ISPP_output
    old: LOX/LH2, 4 units
    new: water pilot (C-type only)
    range: [10, 100]
    unit: t/yr
    basis: judgement
    confidence: low
  - parameter: prospecting_rendezvous_scouts
    old: 32 x 100 kg at $5M
    new: 6
    range: [4, 8]
    unit: units (200-400 kg EP)
    basis: calculation
    confidence: medium
  - parameter: crew_visits
    old: quarterly
    new: 0
    range: [0, 0]
    unit: per yr
    basis: judgement
    confidence: high
  - parameter: escaped_debris
    old: ">99% containment"
    new: 0.5
    range: [0.01, 1]
    unit: t/yr per site
    basis: judgement
    confidence: low
  - parameter: phase_total_cost
    old: 15.7
    new: 40
    range: [22, 83]
    unit: USD billion (2026)
    basis: calculation
    confidence: low
interfaces:
  - with: bom-0-2
    flow: mass
    value: 15000-50000 t/yr excavated to plant
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0.03-0.2 MW tether to robots
    in_bom: false
  - with: bom-0-3
    flow: power
    value: 1-2.5 MWe from site power
    in_bom: true
  - with: bom-0-4
    flow: mass
    value: 700-2500 t/yr product plant to tugs
    in_bom: false
  - with: SEL1-receiving-node
    flow: mass
    value: 600-2200 t/yr product
    in_bom: false
  - with: bom-0-4
    flow: propellant
    value: 150-450 t/yr iodine or argon from Earth
    in_bom: false
  - with: bom-0-6
    flow: propellant
    value: 10-100 t/yr water (conditional on C-type and water EP)
    in_bom: false
  - with: mission-operations
    flow: data
    value: 2-10 Mbps Ka-band per site
    in_bom: false
  - with: bom-0-3
    flow: other
    value: 13000-47000 t/yr tailings retained on site
    in_bom: false
  - with: bom-0-3
    flow: other
    value: 1-3 MWth waste heat via 15-40 t radiators
    in_bom: false
bom_delta:
  - action: split
    item: phase-0
    quantity: 0A and 0B
    unit_cost_usd: [22000000000, 83000000000]
    rationale: Research and pathfinders must retire process, excavation, propulsion, demand and economics risk before industrial commitment.
  - action: resize
    item: bom-0-1
    quantity: ground survey program plus 6 EP rendezvous scouts
    unit_cost_usd: [30000000, 80000000]
    rationale: 100 kg monoprop buses have ~0.8 km/s, insufficient for rendezvous.
  - action: resize
    item: bom-0-2
    quantity: 8 plus 4 replacements
    unit_cost_usd: [30000000, 80000000]
    rationale: 4-6 working robots at 15-30% duty meet 15-50 kt/yr excavation.
  - action: resize
    item: bom-0-3
    quantity: 1 co-located plant 250-500 t incl rotating pilot module
    unit_cost_usd: [4000000000, 12000000000]
    rationale: Transport energy forbids central ore processing; slate narrowed to Fe-Ni.
  - action: resize
    item: bom-0-4
    quantity: 12 tugs at 1-1.5 MWe incl arrays
    unit_cost_usd: [150000000, 350000000]
    rationale: MW-class power is required for 1.5-3 yr cadence.
  - action: resize
    item: bom-0-5
    quantity: 2.5-8 MW BOL site power plus 0.5-3 MWh storage
    unit_cost_usd: [200000000, 1200000000]
    rationale: Tug arrays moved to bom-0-4; site sized at aphelion.
  - action: resize
    item: bom-0-6
    quantity: 1 water pilot 10-100 t/yr, conditional
    unit_cost_usd: [150000000, 400000000]
    rationale: No Phase 0 LOX/LH2 consumer; tug water EP is the only plausible customer.
  - action: resize
    item: bom-0-7
    quantity: 1 organization
    unit_cost_usd: [100000000, 300000000]
    rationale: Licensing, liability, ITU, export and succession scope.
  - action: add
    item: launch-and-delivery
    quantity: 2500-6000 t
    unit_cost_usd: [3000000000, 15000000000]
    rationale: Hardware plus EP propellant at $300-4000/kg to LEO.
  - action: add
    item: comms-ground-segment
    quantity: 3 deep-space apertures or commercial equivalent
    unit_cost_usd: [150000000, 500000000]
    rationale: DSN oversubscribed.
  - action: add
    item: mission-operations
    quantity: 10 yr at 80-250 FTE
    unit_cost_usd: [500000000, 1500000000]
    rationale: Fleet of ~30 assets needs continuous operations.
  - action: add
    item: non-recurring-development
    quantity: 1
    unit_cost_usd: [3500000000, 10000000000]
    rationale: TRL 3-4 tug, robot, plant and autonomy development.
  - action: add
    item: 0A-ground-R&D-facilities
    quantity: 1
    unit_cost_usd: [500000000, 1500000000]
    rationale: Vacuum chambers, simulants and DEM validation.
  - action: add
    item: 0A-pathfinder-demo
    quantity: 1 mission
    unit_cost_usd: [1500000000, 4000000000]
    rationale: 300-500 kW SEP, 2 robots and a pilot plant to feed gates G3-G5.
  - action: add
    item: SEL1-receiving-node
    quantity: 1
    unit_cost_usd: [200000000, 600000000]
    rationale: Phase 1 delivery point.
  - action: add
    item: spares
    quantity: 1
    unit_cost_usd: [500000000, 1500000000]
    rationale: Thrusters, PPUs and plant modules over 10 yr operations.
  - action: add
    item: debris-contamination
    quantity: 1
    unit_cost_usd: [50000000, 200000000]
    rationale: Containment hardware, tailings handling and ejecta modelling.
  - action: add
    item: contingency
    quantity: 30-40% on 0A and 35-50% on 0B
    unit_cost_usd: [5000000000, 27000000000]
    rationale: TRL 3-4 elements at a 70% confidence target.
  - action: remove
    item: crew-systems-and-200-500-MWh-storage
    quantity: 0
    unit_cost_usd: [0, 0]
    rationale: Uncrewed phase; no eclipse at L-points.
  - action: remove
    item: EML1-cryogenic-depot-and-lunar-ISPP
    quantity: 0
    unit_cost_usd: [0, 0]
    rationale: No Phase 0 consumer of LOX/LH2.
open_questions:
  - S-type (native Fe-Ni) or C-type (water plus magnetite, H2 reduction) as the 0B target, given that one site cannot serve both?
  - Does magnetic or size beneficiation reach >=5:1 at representative feed in microgravity?
  - What is in-situ excavation specific energy (1-3 kWh/t vs 20-50 kW-class)?
  - Does bulk metal/slag separation work at 0.05-0.15 g at >=1 t batch?
  - What are optimized low-thrust round-trip delta-v and return cadence for the top 10 candidate NEAs?
  - Do MW-class argon or iodine Hall clusters reach >=10,000 h, and can water EP mature in time?
  - What is the signed Phase 1 material demand (mass, purity, date) at SEL1?
  - At what demonstrated launch price does Phase 0B lose to Earth supply, and is a capability premium accepted?
  - What escaped-debris limit will the licensing state accept, and how does it trade against containment mass?
  - What do the full texts of rq-0-11, 14, 18, 29, 30, 47 and 48 actually conclude?
```
