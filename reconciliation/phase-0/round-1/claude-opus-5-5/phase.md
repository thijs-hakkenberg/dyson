---
phase: phase-0
item: phase
round: 1
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: b907d2fc76f4
priorRound: null
generated: 2026-10-11T22:56:33.828Z
seconds: 644.972
---

# Phase 0 (Space Resource Processing): System Re-assessment

## Bottom line

The Phase 0 numbers do not close. The findings are largely correct, and in three places the real problem is worse than the finding states:

1. **Transport.** The tug figure in P0‑F01 is optimistic. 300–500 m² of III‑V array gives about 100–175 kWe, not 150–250 kWe. Launch and return windows to low‑Δv near‑Earth asteroids (NEAs), not thrust alone, set the cadence. Moving 50 kt/yr of raw ore by electric propulsion (EP) would need about 200 MWe of thrusters and about 22 kt/yr of propellant. That is roughly 50–200× world krypton output (estimate) and about 70% of world iodine output.
2. **Economics.** At any scale the current hardware can support (about 1–2 kt/yr delivered), ISRU product costs about $10⁶/kg. Earth launch in the Starship era is about $10³/kg. Phase 0B is therefore a capability investment, not a cost saving. Its gate must say so.
3. **Process route.** The cheapest fix for the microgravity metallurgy problem (P0‑F18) is to change the process, not to add gravity. Hydrogen reduction of magnetite or metal, and carbonyl refining, are solid‑ or gas‑phase and do not need melt settling. They should be the Phase 0B baseline. Melt routes (molten regolith electrolysis, smelting) become a pilot line in a 0.05–0.15 g rotating module.

The proposed architecture:

- **Processing:** co‑located at the asteroid, not at L4/L5.
- **Delivered product:** about 1–2 kt/yr to the Sun–Earth L1 (SEL1) Phase 1 node.
- **Tugs:** 10 tugs of 1.5–3 MWe each.
- **Power:** about 20–35 MWe in total, not 100 MW.
- **Cost:** about $26–89B for the phase (central about $43B), including development, launch, operations and contingency. The current BOM total is $15.7B.

All numbers below are engineering estimates unless a source is cited.

---

## 1. Findings

### P0‑F01: Transport capacity vs. station throughput. **Agree; the finding is optimistic.**

**Power.** 1361 W/m² × 0.30 cell efficiency × 0.85 packing ≈ 350 W/m² at beginning of life. 300–500 m² therefore gives 105–175 kWe, falling to about 90–150 kWe at end of life.

**Thrust per kW.** Thrust/power = 2η/(g₀·Isp). At Isp 1,800 s with η = 0.45–0.55 (krypton runs at lower efficiency than xenon), this is 51–62 mN/kW. Thrust is therefore about 5–10 N.

**Propellant per round trip.** Assumptions: dry mass 40 t, payload 200 t, round‑trip Δv 8 km/s split equally, exhaust velocity vₑ = 17.66 km/s.
- Loaded leg: 240 t × (e^(4/17.66) − 1) = 61 t.
- Empty leg: about 26 t.
- Total ≈ 87 t per trip.

**Burn time.** t = m_p·vₑ/T = 87,000 kg × 17,660 m/s ÷ 8.25 N ≈ 1.9×10⁸ s, about 6 years. At 100 kWe it is about 9 years.

**Delivered mass.** 200 t ÷ 6–9 yr ≈ 22–33 t/yr per tug. Fifteen tugs deliver about **0.3–0.5 kt/yr**, which is 100–170× short of 50 kt/yr.

**Additional constraint.** Low‑Δv NEAs are low‑Δv because their orbits resemble Earth's. That makes the synodic period long, so return windows are often 2–5 years apart or more. Even with infinite thrust, cadence is window‑limited.

**What closing the original target would need.** Delivering 50 kt/yr of ore at Isp 1,800 s needs about 22 kt/yr of propellant (0.69 kg/s).
- Jet power = ½ ṁ vₑ² ≈ 108 MW.
- Electrical power ≈ 200 MWe.
- This does not close on power or on propellant supply.

**Proposed change.** Stop transporting ore.
- Co‑locate beneficiation and primary processing at the asteroid.
- Transport only refined product, about 1–2 kt/yr in Phase 0B.
- Fleet: 10 tugs, each 1.5–3 MWe, 250–300 t payload, Isp 2,000–2,500 s.

**Resized tug check** (2 MWe, 50 t dry, 250 t payload, 4–8 km/s round trip):
- Thrust ≈ 90–100 N.
- Propellant 38–80 t per trip.
- Burn time 0.25–0.5 yr.
- Round trip 1.5–4 yr, window‑limited.
- Delivery 60–170 t/yr per tug, so **0.6–1.7 kt/yr for the fleet**.

Scaling to 50 kt/yr remains a Phase 1+ growth path. It would need about 30× more tugs, or electromagnetic launch from the asteroid. The latter is not credible for Phase 0.

### P0‑F02: Mining rate, robot target and station throughput disagree. **Agree.**

The "1,000 t/yr per robot" figure and the "2–5 t/h continuous" figure imply a 2–6% duty factor, and neither document states one.

A second inconsistency sits inside rq‑0‑26. Since P = τω, 10 kW at 50–200 N·m means ω = 50–200 rad/s, or 500–1,900 rpm. Bucket wheels turn at about 5–20 rpm. At 10 kW and 1 rad/s the reaction torque is about 10 kN·m. The torque or the power figure is wrong by about 100×.

The qualitative conclusion of rq‑0‑26 still holds: counter‑rotation is needed. The numbers do not.

**Proposed duty cycle and rates:**
- Nameplate: 1–3 t/h.
- Duty factor: 20–35%. This covers rotation and night, thermal limits, anchoring repositioning, maintenance, and feed buffering.
- Per‑robot output: 1.8–9 kt/yr.
- Fleet: 20 robots, of which 10–14 are active.

The consistent mass‑flow chain for a C‑type design case is in §2.1.

### P0‑F03: Station power cannot refine 50 kt/yr. **Partly agree.**

At 50 kt/yr the finding is correct. The station would need roughly 25–90 MW.

The 1–2.5 MW figure is about right for a 1–2.5 kt/yr product plant on a gas‑ or solid‑phase route. The fix is to make throughput, product mix and power consistent, not simply to add power.

**Energy per kilogram, by product:**

| Product / process | Theoretical | Practical (estimate) | Basis |
|---|---|---|---|
| Melt native Fe‑Ni (25→1,550 °C, plus latent heat) | ~0.36 kWh/kg | 0.6–1.0 kWh/kg | cp ≈ 0.6 kJ/kg·K plus 0.25 MJ/kg latent |
| H₂ reduction of Fe₃O₄, with H₂ regenerated by electrolysis | ~1.9 kWh/kg Fe | 3–4 kWh/kg Fe | 4 mol H₂O to electrolyse per 3 mol Fe, at 70% efficiency, plus heating |
| Carbonyl (Mond) refining of Fe‑Ni | n/a | 1–3 kWh/kg (low confidence) | Terrestrial Ni carbonyl practice; CO is a recycled "vitamin" |
| Molten regolith electrolysis (O₂ plus Fe/Si alloy) | n/a | 10–25 kWh/kg O₂ | Published MRE studies; wide spread |
| Al (Hall–Héroult equivalent) | n/a | 15–30 kWh/kg | Terrestrial 13–15 kWh/kg from alumina, plus alumina extraction |
| Metallurgical‑grade Si | n/a | 11–15 kWh/kg | Terrestrial carbothermal |
| Solar‑grade Si (Siemens / fluidised bed) | n/a | +20–100 kWh/kg | Terrestrial; needs chlorine reagents, which are imports |
| Water by thermal dehydroxylation at 500–800 °C | n/a | 4–15 kWh/kg water (mostly thermal) | 0.5 MJ/kg rock at 2–5 wt% yield |

**Proposed change:**
- Phase 0B product: Fe (with Ni) at 1–2.5 kt/yr by H₂ reduction, plus water.
- Station power: 1.5–3.5 MWe plus 0.3–1 MWth of direct solar thermal.
- Al, Si and O₂ become pilot lines at 10–100 t/yr.
- Solar‑grade Si is deferred to Phase 1+.
- Supply: a site allocation from bom‑0‑5, plus solar concentrators (currently not in any BOM line).

### P0‑F04: 100 MW of arrays, about 5 MW of loads, storage where there is no night. **Agree.**

Load allocation is in §2.2. The total comes to about 17–35 MWe, of which tugs are about 85%.

**Storage, sized per site:**
- **L4/L5 or SEL1 node, and a station in a terminator or standoff orbit:** no eclipse. Safe‑mode storage only, about 0.1–1 MWh.
- **Asteroid surface:** rotation periods of about 2–20 h (Bennu 4.3 h, Ryugu 7.6 h), so nights last about 1–10 h.
  - Robots stop excavating at night and run survival loads of about 1–2 kW. Each needs 10–30 kWh.
  - A surface‑anchored ISPP or plant at 0.5–1 MW needs 1–4 MWh, unless its thermal processes are allowed to cycle with the day.

**Phase storage total:** about 1.5–5 MWh, 10–35 t, against 200–500 MWh and 1,000–2,500 t today.

### P0‑F05: $5/W excludes launch and is below space prices. **Agree.**

**Basis for the re‑estimate (estimates, cross‑checked against public figures):**
- **Space III‑V rigid arrays:** typically quoted at hundreds of $/W at the 10–30 kW spacecraft scale.
- **Volume III‑V flexible blankets (ROSA class):** roughly $50–150/W at a production rate of tens of MW (estimate).
- **Silicon or thin‑film at volume (Starlink‑class):** likely $10–40/W. The trade‑off is lower efficiency and higher degradation.
- **Mass:** array‑plus‑structure specific power is 100–200 W/kg, so 25 MW is 125–250 t.
- **Launch:** delivered cost to deep space is $1,000–5,000/kg, or $5–40/W.
- **Integration and deployment:** $5–20/W.

**Result:** about $30–200/W installed, central $60–100/W.
- At the original 100 MW: $3–20B.
- At the resized 25 MWe: about $1–5B including launch.

In the BOM, power hardware is costed at $25–120/W and launch is carried separately.

### P0‑F06: 20 asteroids per satellite per year is unreachable. **Agree.**

**What a 100 kg bus can carry:**
- Green monopropellant (Isp ~240 s, 30 kg propellant): Δv ≈ 2.35 ln(100/70) ≈ 0.85 km/s.
- EP (Isp 1,500 s, 15 kg propellant): about 2.4 km/s.

**What that buys:** one or two rendezvous, or a flyby chain of 2–5 targets over the spacecraft's life. Lucy needs 12 years and a large bus for its 8+ targets.

**Survey tiers, defined:**

| Tier | Method | Rate |
|---|---|---|
| **Remote** | NEO Surveyor, ground IRTF‑class spectroscopy | Hundreds of objects per year; no Project Dyson hardware needed |
| **Flyby** | Visible/NIR and thermal IR spectroscopy | 2–5 targets per craft per life |
| **Rendezvous** | Mining‑grade characterisation: gamma/neutron spectroscopy for H and Fe, gravity, regolith mechanics, rotation state | 1–2 targets per craft |

**Proposed change:**
- Fleet: 10–14 craft of 150–250 kg with EP. Five pathfinders and five follow‑ons fly in Phase 0A; 2–4 more in Phase 0B.
- Unit cost: $15–40M. Heritage: MarCO cost about $18.5M for two cubesats; JANUS cost about $55M for two small craft.
- Mission output: 10–20 rendezvous plus 20–40 flybys over 5–7 years. This is enough to select 2–5 mining candidates.

### P0‑F07: Robot mass and power are inconsistent. **Agree, with an addition.**

**Solar alone does not work.** 30 kW at about 300 W/m² is 100 m² peak. A body‑fixed array on a rotating asteroid averages about 1/π of peak, so continuous operation would need about 300 m² on a walking robot.

**The power figure itself looks overstated (estimate, low confidence):**
- Terrestrial bucket wheels in soft ground use about 0.1–0.6 kWh/m³, or about 0.07–0.4 kWh/t.
- Containment and conveyance in microgravity add a factor of about 3–10.
- That gives 0.5–3 kWh/t, so 1–3 t/h needs about 2–10 kW mechanical.

**Proposed change:**
- Robot mass 1–2 t.
- Excavation 2–10 kW mechanical, 5–15 kW total.
- Excavation power from the site grid through a 0.1–1 km power/data tether.
- Onboard 20–30 m² of array plus a 10–30 kWh battery for mobility and survival.
- rq‑0‑26 must be re‑run with consistent τ, ω, P and robot mass.

### P0‑F08: No launch line. **Agree.**

**Phase 0B hardware mass:**

| Element | Mass |
|---|---|
| Prospecting craft | 1.5–4 t |
| Robots (20 plus 6–10 replacements) | 26–60 t |
| Station | 300–500 t |
| Tugs (10 × dry, excluding power) | 250–400 t |
| Power hardware | 125–350 t |
| ISPP | 20–80 t |
| Relays | 3–10 t |
| Spares | 80–200 t |
| **Total hardware** | **≈0.8–1.6 kt** |

**Earth‑supplied EP propellant:** 10 initial loads plus 100–500 t/yr for 8 years is about 1.2–4.8 kt. Water EP would cut this to about 0.4–0.8 kt.

**Launch mass and cost:**
- The low‑Earth‑orbit (LEO) equivalent multiplier is about 1.3–1.6× for SEP delivery from LEO, giving about 3–10 kt to LEO.
- At $300–1,500/kg, launch costs **$2–12B, central about $4B**.

This is added as a BOM line.

### P0‑F09: No comms, ground or operations line. **Agree.**

**Data rates:**
- Site aggregate: 2–20 Mbps. This covers 20 robots at 10–50 kbps nominal plus imaging bursts, and station telemetry.
- Prospecting downlink: about 1–10 Gb per target.
- Range: 0.05–2 AU.

**Architecture:**
- Site: local S/UHF mesh to the station hub, then a 3 m Ka‑band dish at 100–200 W RF.
  - Mars Reconnaissance Orbiter (3 m, about 100 W, X‑band) returns about 0.5–6 Mbps. Ka‑band should give several times more.
  - An optical terminal is an upgrade path. Psyche's DSOC demonstration reported tens of Mbps at about 1.5 AU.
- Ground: the DSN is oversubscribed. Plan for 2–3 dedicated or contracted 34 m‑class apertures at about $60–100M each (estimate), plus one optical ground terminal.

**Operations:**
- 150–400 FTE at about $250k loaded, plus aperture fees: $50–140M/yr.

**Cost lines:** ground segment capex $0.3–0.9B; operations $0.6–1.8B over the phase.

### P0‑F10: Crew not budgeted. **Agree.**

Quarterly crew visits are not credible:
- Sun–Earth L4/L5 is about 1 AU (about 8 light‑minutes) from Earth.
- An asteroid‑co‑located station is 0.05–2 AU away.
- Each visit would be a multi‑month, multi‑billion‑dollar deep‑space crewed mission.

**Proposed change:**
- Phase 0 is uncrewed.
- Remove the crew habitat and crew assumptions from the station.
- Keep rq‑0‑18 structural provisions: tug structure about +5–10% mass; human‑ratable docking interfaces.
- Revisit crew at the Phase 1 gate.

### P0‑F11: Tug propellant not in BOM; ISPP has no Phase 0 consumer. **Agree.**

**Demand.** The original fleet (15 tugs × 87 t × 0.67 trips/yr) would need about 870 t/yr. The resized fleet needs **100–500 t/yr**.

**Supply, by candidate propellant:**

| Propellant | World supply | Assessment |
|---|---|---|
| Krypton | ~10² t/yr scale (estimate); Starlink already a major consumer | **Fails**, as xenon did |
| Argon | ~10⁶ t/yr | Trivial supply. Starlink V2‑mini flies argon Hall thrusters (SpaceX reports ~2.4× thrust and ~1.5× Isp vs. its Kr thruster). Needs high‑pressure or cryogenic storage. |
| Iodine | ~3×10⁴ t/yr (USGS) | 1–2% of world output. Dense, low‑pressure solid storage. Flown at small scale (ThrustMe 2020). Corrosion and MW‑class operation are undemonstrated. |
| Water | Produced at the asteroid | Closes the ISPP loop. MW‑class water EP is TRL 3–4. |

**ISPP has no consumer.** It produces LOX/LH₂, and nothing in Phase 0 burns LOX/LH₂.

**Proposed change:**
- Tug baseline: argon or iodine. Both positions are kept in §5.
- Water EP is a Phase 0B upgrade and the only Phase 0 consumer for ISPP output.
- Move bom‑0‑6 to Phase 0B, sized to tug water demand of 0.1–0.6 kt/yr, not 25 kt/yr (see P0‑F15 on rq‑0‑14).
- Remove the lunar south‑pole site from the Phase 0 ISPP spec.
- Extraction temperature 500–800 °C, not 1,000 °C:
  - Phyllosilicate dehydroxylation is largely complete by about 800 °C.
  - 1,000 °C adds about 30–40% sensible heat.
  - It also liberates sulfur that poisons PEM electrolysers.

### P0‑F12: No development, pathfinder, spares or contingency lines. **Agree.**

Added (bases in §2.4):

| Line | Cost |
|---|---|
| NRE | $3.3–9.8B |
| Phase 0A ground R&D | $0.7–1.9B |
| Integrated demonstration mission | $1.5–3.5B |
| Robot replacements (5‑year life over a 10‑year phase) | 6–10 units |
| Contingency, Phase 0A | 40% |
| Contingency, Phase 0B | 30–40% |

Development figures are scaled from analogue programmes, for example AEPS 12 kW Hall development and New Frontiers‑class missions. They are estimates.

### P0‑F13: Organizational infrastructure unspecified. **Agree.**

**Minimum specification, drawing on rq‑0‑29 (whose text I have not seen; this is reconstructed from the finding):**
- **Legal entity:** an international non‑profit holding foundation for succession and charter, plus one or more operating companies in jurisdictions with space‑resource law (US, Luxembourg, UAE, Japan).
- **Authorisation:** Outer Space Treaty Article VI national supervision.
- **Spectrum and export control:** ITU filings; ITAR/EAR compliance.
- **Liability:** Liability Convention exposure.
- **Planetary protection:** COSPAR Category I/II, with no sample return planned.
- **Space traffic:** coordination at SEL1 and Earth departure.
- **Debris:** the contamination standard from P0‑F14.
- **Succession:** charter‑level succession and dispute resolution.

**Staffing and cost:** 20–50 FTE; $100–300M over the phase (the $50M figure is low). Insurance is handled by self‑insurance plus a third‑party liability policy near Earth.

### P0‑F14: Debris and contamination unbudgeted. **Agree. The bigger stream is tailings, not fugitive dust.**

**Fugitive dust.** A 500 m body with density 1.2 g/cm³ has an escape velocity of about 0.2 m/s, so almost all fugitive dust escapes.
- At 99.5–99.9% containment and the resized rates: about 15–200 t/yr for the fleet.

**Tailings.** These are 12–35 kt/yr: about 85% of excavated mass on the metals route.

**Proposed limits:**
- Containment ≥99.5% (goal 99.9%).
- No release into the station proximity‑orbit corridor.
- Tailings bagged, sintered or compacted on the surface, never discarded loose.
- Ejecta modelling before hardware freeze.

**Certification.** No authority regulates heliocentric debris today. Use national mission authorisation plus a published Project Dyson standard reviewed independently.

**Cost:** $50–150M, plus mass in the robot housing and tailings handling.

### P0‑F15: Concluded deliberations not written back. **Partly agree.**

I agree with the finding. I only have the titles of eight of the nine conclusions, so these impacts are inferred and need checking against the source text.

| Deliberation | What it changes |
|---|---|
| **rq‑0‑11** (0.05–0.15 g smelting) | Adds a rotating melt module, or avoids it with gas/solid routes. At 0.1 g and r = 50 m: ω = √(0.981/50) = 0.14 rad/s, about 1.3 rpm. Cost about +50–150 t and $1–3B. Proposed: pilot‑scale only in 0B (see P0‑F18). |
| **rq‑0‑14** (ISPP designed for 0A, deployed in 0B at ≥25 kt/yr) | Move bom‑0‑6 to 0B; I agree. **I disagree with ≥25 kt/yr**: no Phase 0 consumer exists above about 0.6 kt/yr unless water EP is adopted. Size to demand. |
| **rq‑0‑18** (structural human‑rating of tugs) | Tug structure +5–10% (2–4 t); +$5–15M per tug. |
| **rq‑0‑28** (cost methodology) | Its claim that Phase 0–1 costs are "approximately correct" is not supported. The BOM omits development, launch, operations and contingency and is low by about 3×. Its $5–10B governance‑software line should start in Phase 0B as $0.3–1B of autonomy software, which is included in NRE. |
| **rq‑0‑29** (governance) | Feeds the bom‑0‑7 specification (P0‑F13). |
| **rq‑0‑30, rq‑0‑47, rq‑0‑48** (boil‑off, sunshield, MLI degradation) | Apply only if cryogenic propellants or argon are stored. With iodine or water, most of this drops out of Phase 0. With argon, specify about 90 K zero‑boil‑off cryocooling and sunshield sizing. MLI degradation from dust at the site affects any cryogenic tank there. |

### P0‑F16: Consensus documents disagree with the BOM. **Agree.**

- The re‑assessed BOM in this document should be authoritative. All consensus documents should be regenerated from it.
- The ISPP document should be rewritten. It is dated 2025, names Claude Opus 4.6, and recommends a lunar site that conflicts with the NEA architecture.

### P0‑F17: "Pure research" vs. $15.7B of hardware. **Agree.**

**Proposed split:**
- **Phase 0A** (research and flight pathfinders): about $3.5–9B.
- **Phase 0B** (industrial build‑out): about $22–80B, behind a gate.

The homepage wording should change to "research and pathfinders before industrial hardware", because pathfinders are hardware.

### P0‑F18: No fallback if microgravity metallurgy does not scale. **Agree, and the fallback should become the baseline.**

**Proposed baseline:** solid‑ and gas‑phase routes do not need gravity.
- H₂ reduction of magnetite or metal grains.
- Carbonyl refining of Fe‑Ni.
- Thermal dehydration for water.

**Melt routes** (MRE, Al, Si) become a 10–100 t/yr pilot in an rq‑0‑11 rotating module.

**Costed fallbacks:**
- **(a) Rotating melt module:** $1–3B. Triggered if melt‑phase products are required for Phase 1.
- **(b) Lunar‑surface processing at 1/6 g:** about $10–25B for an equivalent plant. Δv to SEL1 is about 2.5–3 km/s with lunar LOX. Triggered if partial‑g separation fails in orbit.
- **(c) Earth‑launched feedstock for Phase 1:**
  - Cost: $500–2,500/kg delivered to SEL1, or $0.5–5B/yr at Phase 1's ISRU‑eligible demand (P0‑F19).
  - Trigger: Gate G5 shows ISRU delivered cost is not below Earth supply within the programme horizon.

### P0‑F19: Phase 0 output not tied to Phase 1 demand. **Agree.**

**Phase 1 totals:**
- Collectors: 1,000 × 69–1,850 kg = 0.07–1.85 kt.
- PV blankets: 5,000 × 690–45,000 kg = 3.5–225 kt.

**ISRU‑eligible share:**
- Structure and frames: about 30–70%.
- Blankets: about 0–50%. Semiconductor layers are "vitamins".
- Result: about 1–110 kt, or **0.1–11 kt/yr over a 10‑year Phase 1**.

**Product mismatch.** Phase 1 needs mostly Al, Si‑based films, polymers and some steel. Phase 0's Fe‑rich output fits frames, ballast and shielding only.

**Location.** L4/L5 is 60° of solar orbit away from the SEL1 assembly node. Phase 0 product should therefore go directly from the asteroid to SEL1.

**Timing.** First product arrives in about years 9–12. Phase 1 must not depend on it earlier.

**Proposed change.** Phase 0B sizing is gated on a Phase 1 demand specification with no more than 3× uncertainty. The current per‑model spread is 65×.

---

## 2. Revised specification: the closed Phase 0 budget

### 2.1 Mass flow (Phase 0B design case: C‑type hydrated NEA, metals plus water)

| Stage | t/yr (range) | Notes |
|---|---|---|
| Excavated | 15,000–40,000 | 10–14 active robots × 1–3 t/h × 20–35% duty |
| Fugitive loss | 15–200 | 99.5–99.9% containment |
| Magnetic/size concentrate | 3,000–8,000 | Magnetite or metal fraction; assumes about 10–20% mass yield |
| Water extracted (500–800 °C) | 300–1,500 | 2–4 wt% recovered |
| Tailings (managed) | 12,000–35,000 | Bagged, sintered or redeposited |
| Fe(‑Ni) product (H₂ reduction or carbonyl) | 1,000–2,500 | Water/H₂ loop recycled |
| Pilot products (O₂, Si, Al) | 10–100 | Rotating module, if funded |
| Water to tugs or depot | 100–600 | Only if water EP is adopted; otherwise stockpiled |
| **Delivered to SEL1** | **600–1,700** | Matches 10 tugs × 60–170 t/yr |
| Earth‑supplied EP propellant | 100–500 | Argon or iodine; about 0 at steady state with water EP |

### 2.2 Power, by load and site

| Site | Load | MWe | MWth |
|---|---|---|---|
| Asteroid | Robots (20 × 5–15 kW, via tether grid) | 0.1–0.3 | n/a |
| Asteroid | Beneficiation | 0.05–0.2 | n/a |
| Asteroid | Water extraction | 0.05 | 0.3–1.0 (solar concentrator) |
| Asteroid | Fe reduction and H₂ electrolysis loop | 0.4–1.5 | n/a |
| Asteroid | Housekeeping, robotics, comms | 0.2–0.5 | n/a |
| Asteroid | ISPP (4 × 0.25 MWe if electrolysing; 0.1–0.3 if water‑only) | 0.1–1.0 | n/a |
| **Asteroid subtotal** | | **1.5–3.5** | **0.3–1.0** |
| Tugs | 10 × 1.5–3 MWe | 15–30 | n/a |
| SEL1 receiving node | n/a | 0.05–0.2 | n/a |
| **Phase total** | | **≈17–35 MWe** (vs. 100 MW) | n/a |
| Storage | Surface only | 1.5–5 MWh | n/a |

### 2.3 Δv and trip time, by vehicle class

| Vehicle | Δv | Propulsion | Trip time |
|---|---|---|---|
| Prospector (150–250 kg) | 2–5 km/s after rideshare to C3 ≈ 0 | EP, about 0.5–1 kW | 1–3 yr to first target |
| Tug (2 MWe, 50 t dry, 250–300 t payload) | 4–8 km/s round trip | Ar/I Hall, Isp 2,000–2,500 s, thrust 90–100 N | Burn 0.25–0.5 yr; round trip 1.5–4 yr (window‑limited); 38–80 t propellant per trip |
| Hardware delivery from LEO | ~6–7 km/s SEP spiral, or Starship refuelled to C3 ≈ 0 plus 2–5 km/s SEP | n/a | 1–2 yr; early tug trips carry station modules |

### 2.4 Cost table ($B, real; estimates)

| Line | Phase 0A | Phase 0B | Basis |
|---|---|---|---|
| Ground R&D (process, excavation, EP life test, autonomy) | 0.6–1.5 | n/a | Analogue programmes |
| Microgravity / partial‑g process experiments | 0.1–0.4 | n/a | ISS/free‑flyer payloads |
| Prospecting (10 in 0A, 2–4 in 0B) | 0.15–0.4 | 0.04–0.16 | MarCO and JANUS heritage |
| Integrated demonstration mission (300 kW SEP, 2 robots, 10–20 t pilot plant) | 1.5–3.5 | n/a | New Frontiers/Discovery scaling |
| NRE for industrial items (includes $0.3–1B autonomy software) | n/a | 3.3–9.8 | Judgement |
| Station (300–500 t, co‑located) | n/a | 8–20 | $25–40k/kg complex flight hardware |
| Robots (20 + 6–10 replacements × $30–80M) | n/a | 0.8–2.4 | Judgement |
| Tugs (10 × $100–200M, excluding power) | n/a | 1.0–2.0 | Judgement |
| Power hardware (20–35 MWe × $25–120/W) | n/a | 0.5–4.2 | P0‑F05 |
| ISPP (4 × $120–500M, 0B) | n/a | 0.5–2.0 | ISPP document's own range |
| SEL1 receiving node | n/a | 0.2–0.6 | Judgement |
| Comms and ground segment | 0.1–0.2 | 0.2–0.7 | DSN antenna costs |
| Launch and Earth propellant | (in demo) | 2–12 | P0‑F08 |
| Operations | 0.05–0.2 | 0.5–1.4 | 150–400 FTE |
| Debris and contamination | n/a | 0.05–0.15 | n/a |
| Organisation, licensing, insurance | 0.03–0.08 | 0.1–0.3 | n/a |
| **Subtotal** | **2.5–6.3** | **17–58** | n/a |
| Contingency (40% / 30–40%) | 1.0–2.5 | 5–23 | n/a |
| **Total** | **3.5–9** | **22–80** | n/a |
| **Phase 0 total** | **≈$26–89B, central ≈$43B** | | vs. $15.7B |

**Economic check, stated plainly.** Phase 0B delivers about 5–14 kt over about 8 years for about $38B, or **about $3–7M/kg**. Earth supply to SEL1 costs about $500–2,500/kg.
- Breakeven on capex alone needs about 15–80 kt delivered.
- At 1–2 kt/yr, that takes decades.
- Phase 0B is justified only as a bootstrap toward scale. Gate G5 must test this case explicitly.

### 2.5 Gate criteria: Phase 0A → Phase 0B

| Gate | Criterion |
|---|---|
| **G1 Target** | At least 2 candidates characterised by rendezvous. Each has recoverable water ≥2 wt% or metal ≥10 wt%; measured regolith mechanics and rotation; round‑trip Δv ≤8 km/s; return windows giving ≤3 yr round trips. |
| **G2 Excavation** | In‑situ demo of ≥500 operating hours at ≥0.5 t/h; containment ≥99.5%; reaction loads within anchoring budget. rq‑0‑26 numbers re‑derived. |
| **G3 Process** | Pilot plant produces ≥1–10 t of product in situ. Purity meets the Phase 1 specification; specific energy is within 1.5× of model; ≥1,000 h continuous operation. Melt route tested at partial g, or declared out of scope. |
| **G4 Transport** | MW‑class EP string passes a ≥10,000 h ground life test. 100–300 kW SEP flight demonstration complete. Propellant (Ar, I or water) selected, with supply contracted. |
| **G5 Demand and economics** | Phase 1 ISRU demand specified within 3× (mass, purity, date, SEL1). ISRU delivered‑cost trajectory beats Earth supply within an agreed horizon; otherwise fallback (c). |
| **G6 Autonomy** | ≥30‑day unattended site operation with demonstrated fault recovery. |
| **G7 Regulatory** | Mission authorisation pathway confirmed; debris/contamination standard adopted. |
| **G8 Cost** | Phase 0B estimate at ±30% with an independent cost estimate. |

---

## 3. Interfaces

| From → To | Flow | Value | In current BOM? |
|---|---|---|---|
| bom‑0‑1 → 0‑2/0‑3 | Data | 1–10 Gb per target; 10–20 rendezvous targets | Implicit |
| bom‑0‑2 → bom‑0‑3 | Mass (regolith) | 15–40 kt/yr | Yes, but at inconsistent rates |
| bom‑0‑2 → bom‑0‑6 | Mass (feed split) | 2–15 kt/yr; a feed splitter is needed because rq‑0‑26 couples excavation directly to ISPP | **No** |
| bom‑0‑5 → bom‑0‑2 | Power via tether grid | 0.1–0.3 MWe | **No** (tether, grid) |
| bom‑0‑5 → bom‑0‑3 | Power | 1.5–3.5 MWe | Not allocated |
| (new) solar concentrator → bom‑0‑3/0‑6 | Thermal | 0.3–1 MWth | **No** |
| bom‑0‑5 → bom‑0‑4 | Power | 15–30 MWe | Not allocated |
| bom‑0‑3 → bom‑0‑4 | Mass (product) | 0.6–1.7 kt/yr | Yes, but at the wrong location |
| bom‑0‑6 → bom‑0‑4 | Propellant (water) | 0.1–0.6 kt/yr, if water EP | **No** |
| Earth → bom‑0‑4 | Propellant (Ar/I) | 100–500 t/yr | **No** |
| bom‑0‑4 → Phase 1 SEL1 node | Mass | 0.6–1.7 kt/yr | **No** |
| All → ground | Data | 2–20 Mbps | **No** |
| bom‑0‑2/0‑3 → environment | Debris and tailings | 15–200 t/yr fugitive; 12–35 kt/yr tailings | **No** |

---

## 4. Missing items or scope

- **Programme lines:**
  - Launch services.
  - Earth‑supplied EP propellant.
  - Communications and ground segment.
  - Mission operations.
- **Development and test:**
  - NRE per item, including autonomy and swarm software.
  - Phase 0A ground R&D and test facilities.
  - A partial‑g test capability.
  - The integrated demonstration mission.
- **Hardware at the site and the node:**
  - Robot replacements and spares.
  - A surface power grid and tethers.
  - Solar thermal concentrators.
  - Surface‑to‑station material transfer (shuttle, tether, or an anchored station).
  - Tailings handling.
  - The SEL1 receiving node or depot.
- **Contingency** in both phases.
- **Organisational extras:** licensing, spectrum, export control and insurance, beyond the current $50M.

---

## 5. Remaining disagreements and open questions

1. **Station location.**
   - *Co‑located at the asteroid* (my position): no ore transport, and processing energy is used where it is collected.
   - *SEL1 or L4/L5 near Phase 1*: easier maintenance and crew access later; one processing station can serve several asteroids.
   - A related sub‑question: should a co‑located station be surface‑anchored (needs storage, has dust exposure) or in standoff/terminator orbit (needs a material shuttle; solar radiation pressure perturbation is large for a high area‑to‑mass station)?
2. **Tug propellant.**
   - *Argon:* supply and flight heritage, but storage burden.
   - *Iodine:* density, but corrosion and no MW‑class demonstration.
   - *Water:* closes the ISPP loop, but TRL 3–4.
   - Claude's original LOX/LH₂ and Gemini's water‑only positions both still apply in Phase 1.
3. **Target type.**
   - *C‑type:* water plus magnetite; little Ni or Al.
   - *S/LL‑type:* 5–20 wt% native Fe‑Ni; little water.
   - One site or two.
4. **Excavation power.**
   - My estimate is 2–10 kW for 1–3 t/h.
   - rq‑0‑26 states 20–50 kW.
   - If consolidated clasts dominate, the higher figure may be right. DEM simulation and the demo mission decide.
5. **ISPP scale.**
   - rq‑0‑14 sets ≥25 kt/yr.
   - Demand‑sizing gives ≤0.6 kt/yr in Phase 0.
6. **Lunar‑first vs. NEA‑only.**
   - Claude's ISPP position: Moon first, for latency, Artemis customers and gravity.
   - Gemini's position: NEA only, to avoid gravity wells.
   - Lunar processing is kept here as fallback (b), not dropped.
7. **Whether Phase 0B should proceed at all before Phase 1 demand closes.** The economic check suggests Earth supply may beat ISRU throughout Phase 1, given cheap launch.
8. **Open questions:**
   - Actual window cadence for the best 10 candidate NEAs.
   - Krypton world production; I have not found an authoritative figure.
   - Lifetime of MW‑class Hall thrusters running on argon or iodine.
   - Tensile strength of C‑type boulders at excavation scale.
   - Phase 1 blanket architecture, which sets the ISRU‑eligible fraction.

---

```yaml
item: phase
model: Claude (Anthropic)
findings:
  - id: P0-F01
    verdict: agree
    summary: 300–500 m2 gives ~100–175 kWe and 5–10 N, so a 6–10 km/s round trip needs 6–9 yr of thrust; 15 tugs deliver ~0.3–0.5 kt/yr, and moving 50 kt/yr of ore would need ~200 MWe and ~22 kt/yr of propellant.
    proposed_change: Co-locate processing at the asteroid and ship only product (0.6–1.7 kt/yr) with 10 tugs of 1.5–3 MWe, 250–300 t payload, Isp 2000–2500 s, window-limited 1.5–4 yr round trips.
  - id: P0-F02
    verdict: agree
    summary: The 1000 t/yr target implies a 2–6% duty factor against 2–5 t/h, and rq-0-26's torque and power figures imply ~1000 rpm, inconsistent by ~100x.
    proposed_change: Set nameplate 1–3 t/h at 20–35% duty with 10–14 active robots, and adopt the mass chain 15–40 kt/yr excavated, 3–8 kt/yr concentrate, 1–2.5 kt/yr Fe, 0.6–1.7 kt/yr delivered.
  - id: P0-F03
    verdict: partly
    summary: 1–2.5 MW cannot refine 50 kt/yr (needs ~25–90 MW) but is about right for 1–2.5 kt/yr of Fe by H2 reduction at 3–4 kWh/kg.
    proposed_change: Resize the product mix to Fe plus water with Al/Si/O2 pilot lines, and supply 1.5–3.5 MWe from bom-0-5 plus 0.3–1 MWth from solar concentrators.
  - id: P0-F04
    verdict: agree
    summary: Identified loads total ~17–35 MWe, of which tugs are ~85%, and storage is needed only on the asteroid surface.
    proposed_change: Resize bom-0-5 to 20–35 MWe allocated by site and cut storage from 200–500 MWh to 1.5–5 MWh.
  - id: P0-F05
    verdict: agree
    summary: Space arrays cost ~$30–200/W installed including launch at 100–200 W/kg, not $5/W.
    proposed_change: Carry power hardware at $25–120/W with launch costed separately.
  - id: P0-F06
    verdict: agree
    summary: A 100 kg bus has ~0.85–2.4 km/s of delta-v, enough for 1–2 rendezvous or 2–5 flybys per life, not 20 per year.
    proposed_change: Define remote, flyby and rendezvous tiers, rely on NEO Surveyor and ground telescopes for remote survey, and fly 10–14 EP craft of 150–250 kg at $15–40M each.
  - id: P0-F07
    verdict: agree
    summary: 20–50 kW from onboard solar needs ~300 m2 on a walking robot, the 500 kg assumption conflicts with 2.5–3.5 t, and excavation power appears overstated.
    proposed_change: Specify 1–2 t robots with 5–15 kW total supplied by a site-grid tether, and re-run rq-0-26 with consistent torque, speed, power and mass.
  - id: P0-F08
    verdict: agree
    summary: Phase 0 delivers ~0.8–1.6 kt of hardware plus 1.2–4.8 kt of Earth propellant, about 3–10 kt LEO-equivalent.
    proposed_change: Add a launch and propellant line at $2–12B.
  - id: P0-F09
    verdict: agree
    summary: 2–20 Mbps from 0.05–2 AU needs a Ka-band (later optical) hub and dedicated 34 m-class ground apertures, plus 150–400 FTE of operations.
    proposed_change: Add a comms and ground segment line ($0.3–0.9B) and an operations line ($0.6–1.8B).
  - id: P0-F10
    verdict: agree
    summary: Quarterly crew visits at 1–2 AU are not credible within Phase 0.
    proposed_change: Make Phase 0 uncrewed, remove crew habitat assumptions, and keep only rq-0-18 structural provisions.
  - id: P0-F11
    verdict: agree
    summary: Tugs need 100–500 t/yr of propellant, which krypton supply cannot meet, and nothing in Phase 0 burns ISPP LOX/LH2.
    proposed_change: Baseline argon or iodine with water EP as an upgrade, move ISPP to 0B sized to tug water demand, and set extraction at 500–800 C at an NEA site.
  - id: P0-F12
    verdict: agree
    summary: NRE, pathfinders, the demonstration mission, replacements and contingency are all missing.
    proposed_change: Add NRE ($3.3–9.8B), 0A R&D and demo ($2.2–5.4B), 6–10 replacement robots and 30–40% contingency.
  - id: P0-F13
    verdict: agree
    summary: Organizational infrastructure has no specification and $50M is too low for a decade of licensing, legal and coordination work.
    proposed_change: Specify entity, authorisation, ITU, export control, liability, planetary protection, debris standard and succession at $100–300M.
  - id: P0-F14
    verdict: agree
    summary: Fugitive dust is 15–200 t/yr, but managed tailings of 12–35 kt/yr are the larger stream, and no regulator covers heliocentric debris.
    proposed_change: Set containment at 99.5% or better, require tailings management and ejecta modelling, adopt a self-imposed standard with independent review, and budget $50–150M.
  - id: P0-F15
    verdict: partly
    summary: Conclusions were not written back, but only rq-0-26 text was provided, and rq-0-14's 25 kt/yr ISPP scale has no Phase 0 consumer.
    proposed_change: Apply the per-deliberation deltas in section 1 and size ISPP to demand rather than 25 kt/yr.
  - id: P0-F16
    verdict: agree
    summary: Fleet sizes, propellant and site in the consensus documents conflict with the BOM.
    proposed_change: Make this re-assessed BOM authoritative and regenerate all consensus documents, including rewriting the ISPP document for an NEA site.
  - id: P0-F17
    verdict: agree
    summary: The homepage's "pure research" claim conflicts with $15.7B of industrial hardware.
    proposed_change: Split into Phase 0A ($3.5–9B, research and pathfinders) and Phase 0B ($22–80B, industrial) behind gates G1–G8.
  - id: P0-F18
    verdict: agree
    summary: Melt-phase scale-up is a paradigm gap, but gas- and solid-phase routes avoid the gravity requirement.
    proposed_change: Baseline H2 reduction and carbonyl routes, carry melt pilots in a 0.1 g rotating module ($1–3B), and keep lunar and Earth-supply fallbacks with triggers at G3 and G5.
  - id: P0-F19
    verdict: agree
    summary: Phase 1 ISRU-eligible demand is ~0.1–11 kt/yr at SEL1 and mostly Al and films, which mismatches a 50 kt/yr Fe-rich station at L4/L5.
    proposed_change: Gate 0B sizing on a Phase 1 demand specification within 3x and deliver product directly to SEL1.
revised_spec:
  - parameter: delivered product to SEL1
    old: 50 kt/yr processed at L4/L5
    new: 1.2 kt/yr
    range: [0.6, 1.7]
    unit: kt/yr
    basis: calculation
    confidence: medium
  - parameter: excavated regolith (fleet)
    old: 20 to 880 kt/yr (inconsistent)
    new: 25
    range: [15, 40]
    unit: kt/yr
    basis: calculation
    confidence: low
  - parameter: robot nameplate rate and duty
    old: 2–5 t/h, duty unspecified
    new: 2 t/h at 25% duty
    range: [1, 3]
    unit: t/h
    basis: judgement
    confidence: low
  - parameter: robot mass
    old: 2500–3500 kg (500 kg in rq-0-26)
    new: 1500
    range: [1000, 2000]
    unit: kg
    basis: judgement
    confidence: low
  - parameter: robot excavation power
    old: 20–50 kW
    new: 5
    range: [2, 10]
    unit: kW mechanical
    basis: calculation
    confidence: low
  - parameter: station location
    old: Sun-Earth L4/L5
    new: co-located at target NEA
    range: [asteroid proximity, SEL1]
    unit: n/a
    basis: calculation
    confidence: medium
  - parameter: station mass
    old: 400–1000 t
    new: 400
    range: [300, 500]
    unit: t
    basis: judgement
    confidence: low
  - parameter: station power
    old: 1–2.5 MW
    new: 2.5 MWe plus 0.6 MWth
    range: [1.5, 3.5]
    unit: MWe
    basis: calculation
    confidence: medium
  - parameter: station cost
    old: 10 $B
    new: 12
    range: [8, 20]
    unit: $B
    basis: judgement
    confidence: low
  - parameter: tug count
    old: 15 (BOM) / 10 (consensus)
    new: 10
    range: [6, 15]
    unit: vehicles
    basis: calculation
    confidence: medium
  - parameter: tug electric power
    old: 150–250 kWe (implied by 300–500 m2)
    new: 2
    range: [1.5, 3]
    unit: MWe
    basis: calculation
    confidence: medium
  - parameter: tug round-trip time
    old: ~1.5 yr implied
    new: 2.5
    range: [1.5, 4]
    unit: yr
    basis: calculation
    confidence: medium
  - parameter: tug propellant
    old: krypton/iodine
    new: argon or iodine, water EP as upgrade
    range: [100, 500]
    unit: t/yr fleet demand
    basis: calculation
    confidence: medium
  - parameter: total array capacity
    old: 100 MW
    new: 25
    range: [17, 35]
    unit: MWe
    basis: calculation
    confidence: medium
  - parameter: array installed cost
    old: 5 $/W
    new: 60
    range: [30, 200]
    unit: $/W including launch
    basis: literature
    confidence: low
  - parameter: energy storage
    old: 200–500 MWh
    new: 3
    range: [1.5, 5]
    unit: MWh
    basis: calculation
    confidence: medium
  - parameter: prospecting fleet
    old: 32 x 100 kg at $5M
    new: 12 x 150–250 kg at $15–40M
    range: [10, 14]
    unit: spacecraft
    basis: literature
    confidence: medium
  - parameter: prospecting targets per craft
    old: 20 per yr
    new: 1–2 rendezvous or 2–5 flybys per life
    range: [1, 5]
    unit: targets per craft
    basis: calculation
    confidence: high
  - parameter: ISPP extraction temperature
    old: 1000 C
    new: 650
    range: [500, 800]
    unit: C
    basis: literature
    confidence: medium
  - parameter: ISPP output and phase
    old: unspecified, lunar first, Phase 0
    new: 0.3 kt/yr water at NEA, Phase 0B
    range: [0.1, 0.6]
    unit: kt/yr
    basis: calculation
    confidence: low
  - parameter: Earth-launched mass (LEO-equivalent)
    old: unspecified
    new: 5
    range: [3, 10]
    unit: kt
    basis: calculation
    confidence: low
  - parameter: crew
    old: human-tended quarterly
    new: uncrewed, structural human-rating only
    range: [0, 0]
    unit: crew visits
    basis: judgement
    confidence: medium
  - parameter: Phase 0 total cost
    old: 15.7 $B
    new: 43
    range: [26, 89]
    unit: $B
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-3
    flow: mass
    value: 15–40 kt/yr regolith from robots
    in_bom: true
  - with: bom-0-6
    flow: mass
    value: 2–15 kt/yr feed split from excavation
    in_bom: false
  - with: bom-0-2
    flow: power
    value: 0.1–0.3 MWe via site-grid tether
    in_bom: false
  - with: bom-0-3
    flow: power
    value: 1.5–3.5 MWe from bom-0-5 plus 0.3–1 MWth solar thermal
    in_bom: false
  - with: bom-0-4
    flow: power
    value: 15–30 MWe tug arrays from bom-0-5
    in_bom: false
  - with: bom-0-4
    flow: mass
    value: 0.6–1.7 kt/yr product from station to SEL1
    in_bom: true
  - with: bom-0-4
    flow: propellant
    value: 100–500 t/yr Ar or I from Earth, or 0.1–0.6 kt/yr water from bom-0-6
    in_bom: false
  - with: bom-0-1
    flow: data
    value: 1–10 Gb per target for 10–20 rendezvous targets
    in_bom: true
  - with: phase
    flow: data
    value: 2–20 Mbps site-to-ground at 0.05–2 AU
    in_bom: false
  - with: bom-0-2
    flow: other
    value: 15–200 t/yr fugitive dust and 12–35 kt/yr tailings
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-1
    quantity: 12
    unit_cost_usd: [15000000, 40000000]
    rationale: Rendezvous and flyby EP craft of 150–250 kg, mostly flown in Phase 0A.
  - action: resize
    item: bom-0-2
    quantity: 20
    unit_cost_usd: [30000000, 80000000]
    rationale: 1–2 t tether-powered robots at 1–3 t/h.
  - action: add
    item: mining robot replacements
    quantity: 8
    unit_cost_usd: [30000000, 80000000]
    rationale: 5-year robot life over a ~10-year Phase 0B.
  - action: resize
    item: bom-0-3
    quantity: 1
    unit_cost_usd: [8000000000, 20000000000]
    rationale: Asteroid-co-located plant of 300–500 t producing 1–2.5 kt/yr Fe on gas/solid-phase routes.
  - action: add
    item: partial-g melt pilot module (rq-0-11)
    quantity: 1
    unit_cost_usd: [1000000000, 3000000000]
    rationale: 0.05–0.15 g pilot for MRE, Al and Si; doubles as the fallback test bed.
  - action: resize
    item: bom-0-4
    quantity: 10
    unit_cost_usd: [100000000, 200000000]
    rationale: 1.5–3 MWe Ar/I tugs with 250–300 t payload, power costed in bom-0-5.
  - action: resize
    item: bom-0-5
    quantity: 25 MWe
    unit_cost_usd: [25000000, 120000000]
    rationale: Unit cost is per MWe, hardware only, allocated to site (1.5–3.5 MWe) and tugs (15–30 MWe).
  - action: resize
    item: bom-0-6
    quantity: 4
    unit_cost_usd: [120000000, 500000000]
    rationale: Moved to Phase 0B at an NEA, sized to tug water demand, extraction at 500–800 C.
  - action: resize
    item: bom-0-7
    quantity: 1
    unit_cost_usd: [100000000, 300000000]
    rationale: Full specification per rq-0-29, including licensing, spectrum and export control.
  - action: add
    item: launch services and Earth-supplied EP propellant
    quantity: 1
    unit_cost_usd: [2000000000, 12000000000]
    rationale: 3–10 kt LEO-equivalent at $300–1500/kg.
  - action: add
    item: comms and ground segment
    quantity: 1
    unit_cost_usd: [300000000, 900000000]
    rationale: Ka/optical site hub plus 2–3 34 m-class apertures.
  - action: add
    item: mission operations
    quantity: 1
    unit_cost_usd: [600000000, 1800000000]
    rationale: 150–400 FTE plus aperture fees over the phase.
  - action: add
    item: non-recurring development (Phase 0B)
    quantity: 1
    unit_cost_usd: [3300000000, 9800000000]
    rationale: Station, MW-class EP, robots, ISPP, power and autonomy software.
  - action: add
    item: Phase 0A ground R&D and process experiments
    quantity: 1
    unit_cost_usd: [700000000, 1900000000]
    rationale: Excavation, process, EP life testing and partial-g experiments.
  - action: add
    item: Phase 0A integrated asteroid demonstration mission
    quantity: 1
    unit_cost_usd: [1500000000, 3500000000]
    rationale: 300 kW SEP, 2 robots and a 10–20 t pilot plant to retire G2, G3, G4 and G6.
  - action: add
    item: SEL1 receiving node
    quantity: 1
    unit_cost_usd: [200000000, 600000000]
    rationale: Product delivery point for Phase 1, absent from the current BOM.
  - action: add
    item: debris and contamination mitigation
    quantity: 1
    unit_cost_usd: [50000000, 150000000]
    rationale: Containment, tailings handling and ejecta modelling.
  - action: add
    item: contingency
    quantity: 1
    unit_cost_usd: [6000000000, 26000000000]
    rationale: 40% on Phase 0A and 30–40% on Phase 0B for TRL 3–5 elements.
open_questions:
  - Should the processing station be co-located at the asteroid (surface-anchored or standoff) or at SEL1/L4 near Phase 1?
  - Which tug propellant should be baselined, argon, iodine or water EP, given the supply, storage and TRL trade-offs?
  - Should the first site be a C-type (water plus magnetite) or S/LL-type (native Fe-Ni) target, and is a single site sufficient?
  - Is excavation power 2–10 kW or 20–50 kW for 1–3 t/h in real asteroid regolith?
  - Should ISPP be sized to the rq-0-14 25 kt/yr figure or to Phase 0 tug demand of at most 0.6 kt/yr?
  - Does ISRU-delivered product beat Earth supply at SEL1 within the programme horizon, given Starship-era launch prices?
  - What is Phase 1's ISRU-eligible demand by material, purity and date, given the current 65x spread across models?
  - What are the return-window cadences for the best ten candidate NEAs?
  - What is the lifetime of MW-class Hall thrusters running on argon or iodine?
```
