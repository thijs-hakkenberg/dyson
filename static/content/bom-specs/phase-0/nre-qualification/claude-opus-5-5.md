---
bomId: "bom-0-11"
itemName: "NRE, Ground R&D and Qualification"
itemSlug: "nre-qualification"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-11: NRE, Ground R&D and Qualification

**Proposal for Phase 0 (0A and gated 0B) of Project Dyson**
*Status: proposal. The numbers below are not approved. The T01–T26 mapping in §4 is my working version and must be reconciled with the configuration-controlled TRL register.*

---

## 0. Executive summary

bom-0-11 is the line that buys evidence. Its only product before KDP-0B is a set of audited TRL-6 evidence packages for every project-ending technology, with no waivers. After KDP-0B, its product is qualified designs that can be built as a fleet.

My recommendations:

1. **Consolidate all non-recurring engineering for Phase 0 flight elements here**, through qualification and first-article production qualification.
   - Element lines (bom-0-2 to -5, -13) then carry recurring units only.
   - The pathfinder flight hardware stays in bom-0-12.
   - This removes the most likely double count in the Phase 0 baseline.
   - Ground facilities sit inside this line as a visible sub-line (11.F), not as a separate item.
2. **Design for gravity-agnostic processing, so that ground tests count as "relevant environment".**
   - Beneficiation and refining reactors should be spin- or flow-dominated, with ≥3 g effective acceleration or Bond/Froude numbers far from the 1-g regime.
   - This makes 1-g ground data representative.
   - Only excavation, anchoring and bulk handling at the surface are irreducibly microgravity-sensitive. Those depend on the bom-0-12 pathfinder for TRL 6. This is stated as a hard dependency, not hidden.
3. **Run the EP life test as the critical path from year 1.**
   - Thruster wear-life evidence at 100–250 kW per thruster is the longest-lead item in Phase 0.
   - It cannot be compressed by money once started late.
4. **Use the propellant decision to size the facilities.**
   - Iodine is condensable. It can be pumped with LN₂-temperature surfaces at roughly 10× lower facility cost than argon at the same power.
   - Argon at MW scale would need pumping speeds of order 10⁷ L/s, which no facility in the world has.
   - I recommend that the D-05 down-select happen at month ~30, using facility feasibility as one of its criteria.
5. **Budget.** Figures exclude contingency (held in bom-0-17).
   - **0A: $2.6–6.0B, point $4.0B.**
   - **0B (gated): $2.1–4.8B, point $3.2B.**
   - **Total: $4.7–10.8B, point $7.2B.**

---

## 1. Design philosophy

| Principle | What it means for this line |
|---|---|
| **Evidence, not hardware, is the deliverable** | Every dollar maps to a TRL/AD² evidence item for a named T-number, or to a facility that produces one. No "general R&D". |
| **Stringency follows reversibility (D-02)** | 0A spends to TRL 6 (prototype in relevant environment). Qualification (TRL 7–8 path) sits after KDP-0B unless it is long-lead and cheap. Do not buy 0B certainty with 0A money. |
| **Design out the test gap** | Prefer designs whose physics can be verified on Earth: spin reactors, enclosed conveyance, magnetically dominated separation. Each microgravity-sensitive design choice must justify itself against the extra flight evidence it needs. |
| **Dual-path only to a dated down-select** | Iodine/argon (D-05) and carbonyl/melt-consolidation each get funded parallel paths to a gate, then one is cut. No indefinite dual tracks. |
| **Fleet, not flagship** | There are 10–18 tugs, tens of robots and multi-MW of arrays. Use dedicated qualification units, plus first-article and lot acceptance. Protoflight is not appropriate for fleet items. MRL is tracked alongside TRL. |
| **Spend NRE where recurring leverage is highest** | Arrays at $30–150/W across ~15–45 MWe of fleet power make array manufacturing NRE the highest-return dollar in Phase 0 (§9.4). |
| **Residual value** | Facilities and EP technology are chosen so that if KDP-0B fails, ≥20–30% of 0A value is recoverable: lease, sale, licensing, or reuse in Phase 1. |

---

## 2. Scope boundary

### 2.1 In scope (bom-0-11)

- Technology maturation from the current TRL to TRL 6 for T01–T26 (Class A and B), and desk work for Class C.
- New ground test facilities and use of existing facilities (11.F).
- Simulants and meteoritic feedstock.
- Engineering models (EMs), qualification units, life tests, and material allowables for the product.
- Element design NRE through CDR and qualification for: robots (0-2), processing plant (0-3), tugs (0-4), site power (0-5), the water pilot design if triggered (0-6), and receiving-node critical interfaces (0-13).
- Flight software and autonomy development and V&V, including the digital twin and hardware-in-the-loop (HIL) testbeds.
- Production-process qualification and first-article inspection (0B).
- NRE systems engineering and integration, mission assurance, and independent TRL review boards.

### 2.2 Out of scope (owned elsewhere)

| Item | Owner | Interface |
|---|---|---|
| Pathfinder flight hardware, launch, ops | bom-0-12 | 0-11 qualifies the pathfinder's process payload technologies; the pathfinder returns in-situ data that closes TRL 6 for T01/T02/T24. |
| Recurring flight units, spares | 0-2…0-5, 0-14 | 0-11 hands over qualified build-to-print baselines and acceptance test procedures. |
| Debris/contamination requirement and ops | bom-0-15 | 0-11 delivers the validated ejecta/containment models and test data (T25). |
| Propellant procurement and supply audit | bom-0-16 | The audit result is an input to propellant gate TG-1. |
| Ops, DSN and ground segment | 0-9, 0-10 | The digital twin and testbed are shared with ops training (cost split: 0-11 builds, 0-10 sustains after KDP-0B). |
| Contingency | bom-0-17 | No reserve is embedded in these numbers. |

**Condition on the cost figures.** If element lines retain their own DDT&E, 0B here falls by **$1.2–2.5B**. The configuration board must enforce one rule or the other. My recommendation is consolidation here.

---

## 3. Architecture of the NRE programme

```
            ┌──────────────────────────────────────────────────────────────┐
            │                 bom-0-11  NRE / R&D / QUAL                   │
            ├──────────────┬───────────────┬──────────────┬────────────────┤
            │ 11.A Tech    │ 11.F Ground   │ 11.Q Element │ 11.S SE&I, MA, │
            │ maturation   │ facilities &  │ design NRE & │ TRL boards,    │
            │ T01–T26      │ simulants     │ qualification│ evidence repo  │
            │ (0A heavy)   │ (0A build)    │ (0B heavy)   │ (both)         │
            └──────┬───────┴──────┬────────┴──────┬───────┴───────┬────────┘
                   │              │               │               │
   ┌───────────────▼──┐  ┌────────▼────────┐  ┌───▼────────────┐  │
   │ Bench/lab TRL3-4 │→ │ Ground relevant │→ │ Flight relevant│  │
   │ (vac, simulant)  │  │ env. TRL5-6     │  │ (bom-0-12 PF,  │  │
   └──────────────────┘  │ TVAC, drop      │  │ LEO free-flyer)│  │
                         │ tower, PHIL     │  └───────┬────────┘  │
                         └────────┬────────┘          │           │
                                  ▼                   ▼           ▼
                         ┌──────────────────────────────────────────┐
                         │ Evidence package per T-number            │
                         │ (test reports, models validated vs data, │
                         │  margins, AD² residual, MRL)             │
                         └──────────────────┬───────────────────────┘
                                            ▼
               TG-1 propellant ─ TG-2 refining route ─ TG-4 TRL5 ─ TG-5 TRL6
                                            ▼
                                       KDP-0B (no waivers)
                                            ▼
                         11.Q qualification → production qual → handover
```

---

## 4. Critical technology register (working T01–T26) with TRL and AD²

Class definitions:
- **A**: project-ending. Must be at TRL 6, no waiver, at KDP-0B.
- **B**: major cost or performance impact. TRL 5 at KDP-0B, with a credible plan to 6 by element CDR.
- **C**: enhancing or deferred.

Current TRLs are my estimates as of 2026. AD² runs from 1 to 9 (9 = hardest).

| ID | Technology | Now TRL | AD² | Class | "Relevant environment" for TRL 6 (proposed definition) |
|---|---|---|---|---|---|
| T01 | Excavation and anchoring in micro-g regolith/rubble | 3 | 7 | A | TVAC on cohesion-scaled simulant **plus** low-g granular campaign **plus** pathfinder in-situ excavation ≥100 kg at ≥10 kg/h |
| T02 | Enclosed bulk conveyance and dust containment | 2–3 | 6 | A | TVAC closed-loop flow at 1/1 cross-section; micro-g flow regime via drop tower/parabolic; pathfinder transfer ≥100 kg |
| T03 | Magnetic beneficiation of native Fe-Ni, ≥20:1 concentrate | 3–4 | 4 | A | Spin/drum separator ≥3 g_eff, vacuum, meteorite feed, 1/5 flight throughput, 500 h |
| T04 | Comminution in vacuum | 3 | 4 | B | Vacuum mill on meteorite metal and chondrite simulant, wear life ≥1,000 h |
| T05 | Carbonyl (Mond) refining, gravity-agnostic reactor (primary) | 3 (space) / 9 (terrestrial) | 6 | A* | Rotating packed-bed reactor in thermal-vac jacket, 50–200 kg/day, ≥1,000 h, meteorite feed |
| T06 | Melt/sinter consolidation (alternate) | 2–3 | 7 | A* | As T05; carried only to TG-2 unless T05 fails |
| T07 | Product forming (carbonyl CVD on mandrels, pellet/plate) | 3 | 5 | B | Pilot-scale deposition, dimensional and property spec met on 3 lots |
| T08 | In-situ assay and product purity control | 4 | 3 | B | XRF/LIBS/gas analysis on pilot stream, ±0.2 wt% on Ni, Co, S, C |
| T09 | Process gas containment, CO recovery ≥99.5%/pass, make-up | 3 | 5 | A | Full-loop leak and recovery test in TVAC, ≥1,000 h, thermal cycling |
| T10 | MW-class arrays at $30–150/W, deployable | 4–5 | 4 | A | Full-scale wing segment deployment (offloaded), radiation, UV, TVAC; MRL 6 cost demonstration |
| T11 | 1–3 kV distribution, tethers, dust-tolerant HV connectors | 3–4 | 5 | A | Plasma/UV chamber, dusty and CO-contaminated (10⁻⁶–10 Torr, Paschen sweep), 10⁴ mate cycles |
| T12 | MW-class radiators (pumped loop, deployable) | 4 | 5 | A | Full-scale panel string in large TVAC, 300–400 K, 1,000 cycles, dust deposition test |
| T13 | Site storage, battery plus thermal | 6 / 4 | 2 | C | Thermal storage TVAC test |
| T14 | High-power iodine EP thruster, 100–250 kW (reference) | 3 | 6 | A† | Full-power EM in iodine chamber; performance map; ≥10 kh wear with validated erosion model to 1.5× life |
| T15 | High-power argon EP thruster (alternate) | 3–4 | 6 | A† | Carried to TG-1 at ≤100–250 kW single thruster only |
| T16 | Iodine feed, storage, materials compatibility at kg/day | 4 | 4 | A† | Flight-like feed at full flow, 5,000 h, corrosion coupons in place |
| T17 | 100+ kW PPU / direct-drive, high-voltage | 4 | 4 | A | Integrated thruster+PPU at full power, TVAC, fault injection |
| T18 | EP lifetime ≥30 kh, cluster interactions | 3 | 6 | A | Wear test plus model; cluster test (2–4 thrusters) at reduced power |
| T19 | Tethered robot mobility and tether management | 3 | 5 | A | Gravity-offloaded (6-DOF) tether dynamics, TVAC tether, pathfinder data |
| T20 | Long-latency site autonomy, FDIR, rad-tolerant compute | 3–4 | 6 | A | HIL plus digital twin, 10⁵ Monte Carlo runs, 30-day no-contact run on integrated testbed |
| T21 | Robotic ORU servicing, standard interfaces | 5 | 3 | B | 1/1 ORU swap in TVAC with dust |
| T22 | Dust-tolerant mechanisms, seals, vacuum tribology | 3–4 | 5 | A | Mechanism life tests at 2× predicted cycles in dusty TVAC |
| T23 | Bulk product packaging, transfer and capture (NEA and SEL1) | 3 | 4 | B | 1/1 mock transfer on air-bearing/robotic HIL |
| T24 | Proximity ops and anchoring of 150–300 t tug at rubble pile | 4–5 | 4 | B | GNC HIL with pathfinder-derived gravity/shape models |
| T25 | Ejecta/debris model and containment verification (ALARP) | 3 | 5 | A (licence) | Ejecta velocity distributions measured in TVAC and low-g; model validated to factor 2 |
| T26 | Water extraction (C-type) | 3–4 | 4 | C | Desk study only in 0A (D-05) |

\* Only one of T05/T06 must reach TRL 6 (the down-selected route).
† Only the down-selected propellant must reach TRL 6. The other stops at TG-1.

**Count after down-selects: 16 Class A technologies.** That is too many for a well-controlled programme. I set an explicit target for element designers: get to ≤12 Class A by TG-4. Examples:

- Keep site storage on mature batteries (T13 stays C).
- Use standard ORU interfaces from heritage (T21 stays B).
- Make the product form one that does not require CVD forming in 0B, such as pellet/powder in canisters (T07 stays B).

---

## 5. Technical specifications by cluster

### 5.1 Electric propulsion (T14–T18). Critical path.

**Reference tug.** 1.0–2.5 MWe, 150–300 t payload. Assume a cluster of 6–12 thrusters at 150–250 kW, Hall-type with magnetic shielding, Isp 2,000–2,800 s, η ≈ 0.55–0.65.

At 1 MW, Isp 2,500 s, η 0.6:
- Thrust: F = 2ηP/(g₀Isp) ≈ **49 N**.
- Mass flow: ṁ ≈ **2.0 g/s** (≈ 63 t/yr at 100% duty).

**Facility discriminator (a key finding).**

*Argon:*
- 2 g/s argon ≈ 67 slm ≈ 850 Torr·L/s.
- Holding 5×10⁻⁵ Torr would need ≈1.7×10⁷ L/s. That is ~5–8× the largest EP chamber in existence.
- Even one 250 kW thruster needs ~4×10⁶ L/s, which is at the edge of existing capability.
- So argon cluster testing at MW scale is not feasible on the ground.

*Iodine:*
- Iodine's vapour pressure falls below ~10⁻⁶ Torr at roughly −90 °C, so LN₂-cooled (≈80–100 K) panels pump it effectively without limit.
- Pumping is solved by cold surface area, not by 20 K cryopumps.
- The remaining problems are corrosion, deposit handling and beam-dump heat.

**Facility F-EP1, iodine high-power chamber (new build):**

| Parameter | Spec |
|---|---|
| Vessel | 10 m Ø × 25 m, 316L/Ni-lined, Hastelloy or Ti on hot-plume surfaces |
| Pumping | ~1,500 m² LN₂ shrouds (iodine), 6–10 × 20 K cryopumps for non-condensables; ≥1×10⁶ L/s equivalent for Xe/Kr calibration |
| Operating pressure | ≤1×10⁻⁵ Torr at 1 MW iodine (design target ≤5×10⁻⁶) |
| Beam dump | 1.5 MW water-cooled, graphite-tiled, iodine-compatible |
| Power | 2 × 1.5 MW programmable DC supplies plus PPU-in-the-loop bay |
| Iodine recovery | Shroud warm-up regeneration into a closed recovery train; ≥90% recovery |
| LN₂ demand | ~20–60 t/day at full power (to be refined) |
| Diagnostics | Faraday/RPA/ExB probes, thrust stand to 100 N, laser profilometry for in-situ erosion |
| Cost | $150–350M (point $230M); 3–4 yr build; available month ~36 |

**Facility F-EP2, endurance stands:** 3 chambers at 4 m Ø × 8 m, iodine-capable, each for one thruster at up to 250 kW in continuous life test. Cost $50–120M. These must be running by month ~40.

**Before F-EP1 exists:** run a 100–150 kW iodine EM in a leased existing large chamber with retrofitted LN₂ shrouds and a deposition-acceptance agreement, starting month ~24. This needs partner negotiation. Iodine contamination of shared facilities is a real barrier.

**Life evidence logic for TRL 6 at KDP-0B**, modelled on NASA's magnetically shielded Hall approach:
- ≥10 kh wear test on the flight-like EM, at ≥2 operating points.
- An erosion model validated against measurements at 3 time points.
- A predicted life of ≥1.5× the required 30 kh throughput.
- The full 30–45 kh demonstration finishes in 0B (11.Q).

**Argon path (to TG-1 only):** a single thruster at ≤150 kW in an existing facility with background-pressure correction studies. Budget $60–150M within the EP cluster.

**PPU:** 100–250 kW units, 600–1,000 V input with a direct-drive option. EM in year 3, integrated test in F-EP1 in year 4.

### 5.2 Power, HV distribution and thermal (T10–T13)

**Arrays (T10).**
- Total fleet power: 10–18 tugs × 1.0–2.5 MWe plus site power ≈ **15–45 MWe**.
- At ~250–300 W/m² BOL at 1 AU, 1 MWe needs ≈3,500–4,000 m² per tug.

| Activity | Spec |
|---|---|
| Wing segment qual | Full-length segment (≥40 m) deployment on a gravity-offload rig in a large hangar; 10 deploy cycles |
| Environments | Proton/electron dose for 10 yr at SEL1/NEA, 1 AU UV, 10³–10⁴ thermal cycles −150/+100 °C (coupons and subpanels), dust abrasion coupons |
| Large TVAC | Existing large facility (e.g. NASA Armstrong Test Facility class, 30 m Ø) via campaign fees |
| MRL work | Automated cell string/blanket line pilot showing ≤$75/W at rate; this is the cost lever |
| Cost (0A) | $150–350M |

**HV distribution (T11).**
- Tethers at 1–3 kV with 10–50 kWh robot batteries.
- **A specific hazard:** CO and carbonyl leaks from the plant can raise local pressure into the Paschen-minimum region (~0.1–10 Torr·cm) near connectors.
- Requirement: no breakdown at 1.5× working voltage across the range 10⁻⁶–10 Torr in CO, CO₂ and Ar, with charged dust present.
- Facility: a plasma/UV/dust chamber (2 m Ø) with gas-dosing manifold. Cost ~$10–20M as part of the regolith complex.

**Radiators (T12).**
- At 350 K, ε = 0.85, two-sided, net of the 1 AU environment: ≈0.8–1.0 kW/m².
- 2 MWth of plant waste heat therefore needs ≈2,000–2,500 m².
- Qualification:
  - A full-scale panel string of 3 panels plus a pumped loop in large TVAC, 1,000 cycles.
  - A 10,000 h pump life test.
  - A dust deposition and emissivity degradation test.
  - Micrometeoroid hypervelocity test (existing light-gas gun facilities).
- Cost (0A): $100–220M.

**Storage (T13).** Battery packs are COTS-derived and need only delta-qualification. Thermal (sensible/PCM) storage gets a TVAC test. Cost $20–60M.

### 5.3 Mining, beneficiation and handling (T01–T04, T22)

**The physics problem.** On a 0.5–2 km NEA, g ≈ 10⁻⁵–10⁻⁴ m/s². Cohesion between fine grains (van der Waals, granular Bond number ≫1) dominates over weight. The OSIRIS-REx TAG event showed that rubble-pile surfaces can be almost strengthless. No 1-g test reproduces this.

**Evidence strategy, four tiers:**

1. **Cohesion-scaled simulants in TVAC.**
   - Match the Bond number by scaling grain size and surface energy on Earth.
   - Vary the simulant: CI/CM (Exolith-type), LL/L chondrite, and metal-rich synthetic with 5–30 wt% Fe-Ni grains.
2. **Low-g granular campaigns.**
   - Einstein-Elevator class: ~4 s, up to ~100+ drops/day.
   - ZARM catapult: ~9 s.
   - Parabolic flights: ~20 s × 30/flight.
   - Suborbital: ~3 min.
   - Target: ≥2,000 low-g runs in 0A.
3. **A long-duration LEO free-flyer or commercial-station centrifuge** (months at 10⁻⁴–10⁻² g) for granular flow and conveyance, purchased as a payload service.
   - ISS end-of-life around 2030 makes timing a risk.
   - Budget $40–100M.
4. **Pathfinder in-situ** (bom-0-12): TRL 6 for T01/T02 cannot close without it. **If the pathfinder slips or fails, KDP-0B slips. This is deliberate.**

**Facility F-REG, regolith thermal-vacuum complex (new build):**

| Parameter | Spec |
|---|---|
| Main chamber | 8 m Ø × 12 m, ≤1×10⁻⁵ Torr with dust-hardened pumping (cryo with pre-filters, no oil) |
| Bed | 20–40 t simulant, reconfigurable, boulder field up to 1.5 m |
| Thermal | Shroud 100–400 K; IR/solar lamp array 1 sun over 4 m² |
| Robotics | 6-DOF gravity-offload gantry, active, ≥2 t payload |
| Diagnostics | 4 × high-speed cameras (≥10 kfps), witness plates and dust collectors for T25 ejecta |
| Satellite chambers | Plasma/UV/dust HV chamber (T11); tribology chamber (T22) |
| Cost | $70–180M (point $110M); available month ~30 |

**Beneficiation (T03).** Drum/spin magnetic separator at ≥3 g_eff with gas-free operation, so that 1 g is a ≤30% perturbation. Test in ≥2 orientations to bound the gravity term. Target **≥20:1 concentration of native metal** from 10–20 wt% metal feed at ≥85% recovery.

**Feedstock.**
- 5–15 t of iron meteorite (Campo del Cielo/Gibeon class, roughly $0.3–1.5/g in bulk) for validation runs.
- 50–200 t of synthetic chondrite-plus-metal simulant for volume work.
- Cost $20–60M.

### 5.4 Processing and product (T05–T09)

**Flight-scale reference.** 1.3 kt/yr delivered ≈ 3.6 t/day product. At ~70–85% overall yield this means 4.5–5 t/day concentrate.

**Primary route: carbonyl.**
- Ni(CO)₄ forms at ~50–100 °C and Fe(CO)₅ at ~150–200 °C, at 20–200 bar CO.
- Decomposition on heated mandrels or in powder reactors at ~200–300 °C.
- Sulfur from troilite helps the kinetics.
- Advantages:
  - Gas-solid kinetics run in a rotating packed bed and do not depend on gravity.
  - It separates Fe, Ni and Co by distillation.
  - Terrestrial heritage (Clydach, Norilsk).
- Disadvantages:
  - Needs CO make-up (carbon from the target or from Earth; a mass-budget item).
  - Pressure-vessel mass.
  - Extreme ground-test toxicity: Ni(CO)₄ exposure limits are ppb-level, and IDLH is about 2 ppm.

**Facility F-PROC, licensed carbonyl pilot plant**, ideally at an industrial partner with carbonyl licensing:

| Stage | Capacity | Purpose | Timing |
|---|---|---|---|
| Bench | 1–5 kg/day | Kinetics on meteorite metal, S effects, reactor geometry | months 6–24 |
| Pilot | 50–200 kg/day (1/20–1/70 of flight) | Rotating reactor in thermal-vacuum jacket; ≥1,000 h campaigns; CO recovery ≥99.5%/pass; 3 product lots | months 30–72 |
| 0B qual unit | 1/1 flight reactor module (≈1 t/day class) | Qualification and life | 0B |

Pilot facility cost: $60–150M, covering containment, scrubbing, detection, and the licensing pathway.

**Alternate route: melt/sinter consolidation (T06).**
- Concentrate is induction-sintered or melted in a crucible with electromagnetic positioning.
- Slag separation without buoyancy is the core unknown.
- Funded to TG-2 (month ~36) at $60–150M. It is then cut unless carbonyl fails.
- If kept, it needs long-duration micro-g melt data. That adds a free-flyer payload of ~$50–100M, which is a reason to prefer carbonyl.

**Product allowables (T07/T08).**
- The Phase 1 interface needs a material/purity/date specification.
- 0-11 delivers a property database on ground-made carbonyl Fe and Fe-Ni from meteorite feed: tensile, fatigue, creep, and lot variability. A-basis where Phase 1 needs it.
- Cost $20–50M.
- The specification number itself is a Phase 1 input.

### 5.5 Robotics, autonomy and GNC (T19–T24)

**Tether dynamics (T19).**
- 6-DOF active-offload rig plus an air-bearing floor (≥20 × 30 m).
- Tether lengths up to 200–500 m on a reel test stand, with snag and recovery scenarios.
- The robot keeps a battery-only safe-mode return of ≥2 h.

**Dust tribology and mechanisms (T22).**
- Life testing at 2× predicted cycles (ECSS-E-ST-33-01 practice) in dusty vacuum.
- Seals, bearings, harmonic drives, and slip rings for tether reels.

**Autonomy (T20).** Requirements that this line must verify:

| Requirement | Value |
|---|---|
| One-way light time | 3–20 min nominal |
| Contact gaps | Up to 14 days (solar conjunction) or longer at some geometries |
| Plant safe-hold | ≥30 days with no ground contact; automatic recovery from any single fault |
| Robot fault response | Local, <1 s for tether/arc faults; site-level re-plan <10 min |
| Ground commanding | Goal-level only; no joint-level teleoperation assumed |
| V&V | ≥10⁵ Monte Carlo digital-twin runs per release; formally verified safety kernel for FDIR and HV interlocks; 30-day no-contact soak on the integrated testbed |
| Compute | Rad-tolerant processors; TID ≥100 krad(Si) for long-life units; SEE-tolerant AI inference co-processor qualified to TRL 6 |

**Facility F-INT, integrated site testbed and digital twin.**
- A hangar-scale, power-hardware-in-the-loop (PHIL) test bed:
  - 1 MW array simulator.
  - 3 kV distribution with real tethers.
  - 2–4 robot EMs on the offload floor.
  - Plant-controller HIL.
  - Latency and outage injection.
- Cost $40–120M.
- It is shared with bom-0-10 for operator training after KDP-0B, with sustainment transferred to 0-10.

**GNC (T24).** HIL proximity-ops facility using pathfinder shape and gravity models. Covers anchoring of a 150–300 t loaded tug and plume impingement on the surface (feeds T25). Use existing GNC facilities where possible. Cost $80–200M.

### 5.6 Debris and contamination verification (T25)

- Measure ejecta mass-velocity distributions from excavation, conveyance spill and venting, in F-REG and low-g.
- Validate the ejecta model to within a factor of 2 in mass above 1 cm/s escape-relevant velocities.
- This test data is what makes D-03's interim ALARP ceiling defensible to a licensing state.
- Cost $40–110M, with the requirement owned by bom-0-15.

### 5.7 Water (T26)

- Desk study and bench tests on CI simulant only, at $5–20M in 0A.
- Anything more is triggered only by a confirmed C-type target at the target gate.

---

## 6. Qualification approach

| Item | Approach | Standard basis (tailored) |
|---|---|---|
| Tugs (10–18) | Dedicated qual unit for structure, EP string and power; first-article acceptance on unit 1; lot acceptance after | GSFC-STD-7000 / SMC-S-016 qual margins (+6 dB random over acceptance, ±10 °C thermal) |
| EP thrusters | 1 qual thruster plus 2 life units; 30–45 kh total demonstrated in 0B; acceptance hot-fire on every flight unit | NASA EP life qualification practice (test plus validated model, ≥1.5× life) |
| Robots (tens) | 2 qual units; 2× cycle life on mechanisms; dusty TVAC | ECSS-E-ST-33-01 |
| Plant modules | 1/1 qual module of each process unit (separator, reactor, decomposer, gas loop) at ≥1,000 h in TVAC jacket | ASME BPVC-derived pressure vessel rules plus space TVAC |
| Arrays and radiators | Qual wing segment and radiator string; coupon-level life | AIAA S-111/S-112 (arrays) |
| Software | Class-A-equivalent safety kernel (FDIR, HV interlock); B-equivalent for planners | NPR 7150.2-style classification |
| Production | MRL 6 at KDP-0B for arrays and thrusters; MRL 8 by first article | DoD MRL deskbook |

There is **no protoflight for fleet items.** The marginal cost of a qual unit is small next to fleet risk.

---

## 7. Interfaces

```
 bom-0-16 propellant audit ──►┐
 bom-0-1 target data ────────►│
                              ▼
 ┌──────── bom-0-11 NRE ─────────────────────────────────┐
 │ TG-1 propellant  TG-2 refining  TG-4 TRL5  TG-5 TRL6  │
 └──┬──────────┬──────────┬───────────┬──────────┬───────┘
    │          │          │           │          │
    ▼          ▼          ▼           ▼          ▼
 bom-0-12   bom-0-15   bom-0-2..5,  bom-0-9/10  bom-0-13
 pathfinder debris     -13 recurring digital twin, receiving
 payload    model +    build-to-    ops training node interface
 qual  ◄────verif.     print, ATPs  (handover)  qual (T23)
 in-situ data           (0B)
 closes T01/T02/T24
```

- **Pathfinder (bom-0-12) data deadline:** in-situ data must be available ≥12 months before KDP-0B. Otherwise KDP-0B moves.
- **Configuration control:** every evidence package references the frozen baseline. Legacy L4/L5 station documents are marked superseded and are not used as design inputs.

---

## 8. Roadmap

Year 1 = ATP. Assumed early 2027.

```
Year:            1     2     3     4     5     6     7     8 │ 0B →
                 ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
EP iodine EM     ██████████▲EM(100-150kW, leased chamber)
F-EP1 build      ░░░░░░░░░░░░░░░░█ ready m36
EP wear tests                  ███████████████████████(≥10kh)→ 30-45kh in 0B
Argon path       ████████████│TG-1 (m30) cut alt
Arrays MRL line     █████████████████████▲MRL6
F-REG build      ░░░░░░░░░░░█ ready m30
Excav/handling   ████████████████████████████
Low-g campaigns     ███████████████████████
Pathfinder data                         ▓▓▓▓▓▓ (bom-0-12) → T01/T02 TRL6
Carbonyl bench   ████████│TG-2(m36)
Carbonyl pilot              █████████████████████
Melt alternate   ██████████│cut at TG-2 (unless carbonyl fails)
F-INT testbed          ░░░░░░░░█ █████████████████ 30-day soak
Autonomy SW      ████████████████████████████████
Gates:              TG-3 PF payload freeze (m24)
                          TG-1 m30  TG-2 m36
                                      TG-4 TRL5 (m54)
                                                  TG-5 TRL6 pkg (m84)
                                                        KDP-0B (m90-96)
```

**Implied KDP-0B: 2034–2035.** If any of the following happens, KDP-0B slips one-for-one:
- EP wear test start slips past month 42.
- Pathfinder in-situ data arrives after month 78.

**Indicative 0B NRE duration: 4–5 years** of qualification and production qualification, overlapping the start of fleet production.

---

## 9. Cost analysis

Basis:
- 2026 $.
- Analogy to NASA/ESA DDT&E for EP, arrays, robotics and process plant, discounted ~0.6–0.8× for commercial procurement practice, then cross-checked against labour.
- Ranges reflect estimating uncertainty only. Contingency is in bom-0-17.

### 9.1 0A, bottom-up ($M)

| Sub-line | Low | Point | High | Notes |
|---|---|---|---|---|
| EP T14–T18 (iodine ref + argon to TG-1) | 450 | 650 | 900 | Thrusters, PPU, feed, wear test start, cluster test |
| Arrays T10 incl. MRL pilot | 150 | 230 | 350 | Highest recurring leverage |
| HV distribution T11 | 80 | 120 | 180 | |
| Radiators T12 | 100 | 150 | 220 | |
| Storage T13 | 20 | 35 | 60 | |
| Excavation/handling T01–T02, T04 | 200 | 300 | 450 | Includes low-g campaigns and LEO free-flyer service |
| Beneficiation T03 | 100 | 150 | 220 | |
| Refining T05/T06, gas loop T09 | 300 | 450 | 650 | Two routes to TG-2 |
| Product T07/T08 incl. allowables | 60 | 100 | 150 | |
| Robotics T19, T21, T22 | 180 | 270 | 400 | |
| Autonomy/FSW/compute T20 | 250 | 380 | 550 | |
| GNC T23–T24 | 80 | 130 | 200 | |
| Debris verification T25 | 40 | 70 | 110 | |
| Water desk T26 | 5 | 10 | 20 | |
| **11.A subtotal** | **2,015** | **3,045** | **4,460** | |
| F-EP1 iodine chamber | 150 | 230 | 350 | |
| F-EP2 endurance stands (×3) | 50 | 80 | 120 | |
| F-REG regolith complex | 70 | 110 | 180 | |
| F-PROC carbonyl pilot plant | 60 | 90 | 150 | |
| F-INT site testbed / digital twin | 40 | 70 | 120 | |
| Simulants and meteorite feedstock | 20 | 35 | 60 | |
| **11.F subtotal** | **390** | **615** | **980** | Existing-facility fees are inside 11.A |
| **11.S** SE&I, MA, TRL boards (~8–12%) | 200 | 340 | 550 | |
| **0A total** | **~2,600** | **~4,000** | **~6,000** | |

**Labour cross-check.**
- Average ~1,000 FTE (peak ~1,300) over 7 years at ~$0.3M per loaded FTE-year ≈ $2.1B.
- Add test hardware and EMs (~$0.8B), facilities (~$0.6B) and test services (~$0.3B).
- Result ≈ $3.8B. This is consistent with the $4.0B point.

**Indicative phasing ($B, Y1–Y7):** 0.30 / 0.50 / 0.65 / 0.70 / 0.70 / 0.60 / 0.55.

### 9.2 0B, gated ($M)

| Sub-line | Low | Point | High |
|---|---|---|---|
| Tug DDT&E through qual (bus, EP string at flight scale, 30–45 kh life completion) | 500 | 750 | 1,000 |
| Plant 1/1 module qual (reactor, separator, gas loop, decomposer) | 400 | 600 | 900 |
| Robot qual units and mechanism life | 150 | 230 | 350 |
| Power/thermal flight-scale qual | 200 | 300 | 450 |
| Flight software to release, V&V | 200 | 300 | 450 |
| Receiving-node critical interface qual (T23) | 50 | 90 | 150 |
| Production engineering and first-article / MRL 8 | 150 | 250 | 400 |
| Facility sustainment during 0B | 100 | 160 | 250 |
| SE&I/MA (~10%) | 200 | 300 | 450 |
| **0B total** | **~2,100** | **~3,200** | **~4,800** |

- If bom-0-2…5 retain their own DDT&E, subtract $1.2–2.5B from 0B.
- If argon is selected at TG-1, add $150–400M (a larger cryopumped facility and reduced-scale-only test logic) and add ~1 year of schedule risk.

### 9.3 Disagreements with the round-2 figures

| Round-2 | My view | Why |
|---|---|---|
| **Claude $3.5–10B NRE + $0.5–1.5B facilities** | The total range is broadly right; I disagree on structure | A separate facilities item creates an ownership seam between the people who need test data and those who build chambers. Fold it in as visible sub-line 11.F. Facilities at $0.4–1.0B, lower than Claude, because iodine's condensability removes the need for a 20 K mega-chamber. Claude's $3.5B floor is too low with dual-path propellant, two refining routes, and ~16 Class A technologies starting at TRL 2–4. |
| **Gemini $4.5–7.5B, no split** | Ceiling too low; split is needed | Under D-01/D-02 the 0A/0B split is mandatory for a gated real option. The $7.5B ceiling does not cover MW-class EP life qualification plus a full-scale plant qual module plus fleet production qualification at the high end. |
| **GPT $4–8B (0A) + $2–5B (0B)** | 0B agrees. 0A is too high, especially the $8B top | It appears to pull qualification ahead of KDP-0B. TRL 6 is a prototype in a relevant environment, not qualification. Spending up to $8B before a reversible gate contradicts "stringency follows reversibility" and erodes the option value D-01 was meant to protect. My 0A ceiling is $6.0B. |

### 9.4 Where NRE pays for itself

- **Arrays.** 15–45 MWe of fleet power. Moving the hardware cost from $100/W to $60/W saves $0.6–1.8B recurring. The roughly $100M MRL line inside T10 is the best-return item in Phase 0.
- **EP life.** Each extra 10 kh of demonstrated life avoids roughly one thruster replacement set per tug. Across 10–18 tugs that is ~$100–300M in bom-0-14 spares.

### 9.5 Residual value if KDP-0B fails

Assume F-EP1 and F-EP2 lease or sale value, iodine EP IP licensing, and F-REG or F-PROC reuse in Phase 1 or for lunar/other programmes. Estimated recoverable value is **$0.5–1.2B of the ~$4B (12–30%)**.

---

## 10. Risk assessment

| # | Risk | L | C | Mitigation |
|---|---|---|---|---|
| R1 | EP wear life shortfall or late start (T18) | M | H | Start a leased-chamber EM at month ~24; 3 endurance stands; magnetic shielding baseline; derate power per thruster |
| R2 | Iodine contaminates or corrodes facilities; partners refuse hosting | M | M | Dedicated F-EP1 early; Ni/Ti linings; recovery train; decide TG-1 by month 30 |
| R3 | Microgravity excavation and handling (T01/T02) cannot reach TRL 6 without pathfinder; pathfinder slips | H | H | Treat as a hard KDP-0B dependency; fund the low-g tiers heavily; design enclosed, cohesion-insensitive capture |
| R4 | Carbonyl CO losses or make-up mass do not close (T09) | M | H | ≥99.5%/pass target verified at pilot scale; carbon accounting from target assay; melt route as funded hedge to TG-2 |
| R5 | Ni(CO)₄ ground-test safety incident or licensing delay | L–M | H | Industrial partner with carbonyl heritage; containment cell design; independent safety authority |
| R6 | HV arcing in CO-contaminated plasma near plant (T11) | M | M | Paschen sweep qualification; keep-out geometry; gas-detection interlocks |
| R7 | Array cost target not met at MRL 6 | M | H (recurring) | Automation pilot; dual suppliers; accept the higher bound in bom-0-5 if missed |
| R8 | Autonomy V&V does not converge (T20) | M | H | Safety kernel formally verified; restrict autonomy envelope; long soak testing |
| R9 | ISS retirement removes long-duration micro-g platform | M | M | Commercial station or free-flyer contracts by month 18 |
| R10 | Too many Class A technologies, with review fatigue and waiver pressure | H | M | ≤12 Class A target by TG-4; independent TRL board with veto; publish evidence packages |
| R11 | Double counting NRE with element lines | H | M | Configuration board rule (§2.2) ratified before the first budget baseline |
| R12 | Phase 1 product spec changes after allowables testing | M | M | Freeze the spec at TG-4; fund delta-allowables in 0B |

---

## 11. Data, control and comms for the test enterprise

- **Evidence repository.** A single configuration-controlled system holding:
  - raw data,
  - model versions,
  - test procedures,
  - TRL/AD² rationale per T-number.
- **Retention.** Life-of-programme plus 10 years.
- **Peak ingest.** ~5–20 TB/month during concurrent EP wear tests and high-speed imaging campaigns.
- **Facility control.** Automated unattended operation for life tests with remote monitoring and safe shutdown. Target ≥95% uptime for wear tests: every 1% of downtime costs ~90 h per year per stand.
- **Independent reviews.** The TRL board includes external members with standing to block KDP-0B evidence.

---

## 12. Open engineering questions

1. **Relevant-environment definitions.** Are the TRL-6 definitions in §4 accepted? This is especially important for T01/T02/T05, and must be settled before TG-3. It decides whether KDP-0B depends on pathfinder success.
2. **Propellant facility feasibility as a D-05 criterion.** Does the board accept that argon's ground-test infeasibility at MW cluster scale is a down-select criterion?
3. **Thruster unit power.** 100 kW vs 250 kW per thruster trades facility cost, thruster count per tug, and life risk. I lean to 150–200 kW. This needs a trade by month 12.
4. **CO make-up.** Is CO make-up from target carbon (CM/CI-like content or carbides) or from Earth? This affects T09 test targets and the bom-0-8 logistics mass.
5. **Gravity-agnostic plant designs.** Will bom-0-3 accept spin- or flow-dominated designs as a requirement? If not, the 0A budget for long-duration micro-g testing grows by $100–300M.
6. **Product form for Phase 1.** Powder/pellet versus CVD sheet/shape. This decides whether T07 is Class A or B.
7. **Low-g simulant validity.** How well does Bond-number scaling reproduce rubble-pile behaviour? Pathfinder data will validate or invalidate the 0A simulant programme. A plan is needed if it invalidates.
8. **NRE consolidation rule.** Consolidation here versus DDT&E in element lines must be ratified before baselining.
9. **Partnering.** Can existing agency EP and TVAC facilities be accessed on terms compatible with a non-profit and iodine contamination? This affects 11.F by ±$100–200M.
10. **Water EP and C-type pilot triggers.** Exact criteria that would move T26 from desk study to funded maturation.

---

### Bottom line

| | Low | Point | High |
|---|---|---|---|
| **bom-0-11, 0A** | $2.6B | **$4.0B** | $6.0B |
| **bom-0-11, 0B (gated)** | $2.1B | **$3.2B** | $4.8B |
| **Total** | $4.7B | **$7.2B** | $10.8B |

- Quantity: 1 consolidated line, with sub-lines 11.A / 11.F / 11.Q / 11.S.
- Excludes contingency (bom-0-17) and pathfinder flight hardware (bom-0-12).
- Confidence: low–medium for 0A, low for 0B.
- The two schedule drivers are an EP wear test running by month ~40 and pathfinder in-situ data by month ~78. Neither can be bought back later.