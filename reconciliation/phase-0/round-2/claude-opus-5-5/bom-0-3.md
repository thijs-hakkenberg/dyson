---
phase: phase-0
item: bom-0-3
round: 2
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:21:36.414Z
seconds: 349.26
---

# Re-assessment: bom-0-3 Material Processing Station (Phase 0), Round 2

**Bottom line.** All seven findings stand, two with method corrections. The station as specified is a 50 kt/yr refinery attached to a transport system that delivers about 0.3–0.6 kt/yr. Even if transport were scaled up, 50 kt/yr cannot be closed with Earth-supplied krypton or iodine propellant. I recommend:

- Re-scoping the Phase-0 station as an uncrewed native-Fe-Ni process demonstrator of about 0.2–1 kt/yr feed.
- Making the 50 kt/yr target an unfunded, gated Phase-1+ objective.
- Re-deriving the rotating-module geometry, which was set for comfort rather than metallurgy.
- Adding the null option (no station; Phase 1 supplied from Earth), which no previous round evaluated.

---

## 1. Findings

### P0-F01: Transport capacity vs. station throughput. **Agree** (conclusion holds; method corrected)

**Assumptions** (estimates, consistent with the bom-0-4 consensus):

- **Array:** 300–500 m² of III-V cells at 1 AU. Taking 1,361 W/m² × 0.30 efficiency × 0.90 packing × 0.85 thermal/wiring losses gives about 310 W/m². That is **95–155 kWe** at beginning of life. This agrees with GPT's round-1 98–163 kW. The finding's 150–250 kW is optimistic.
- **Thrust:** Hall thrusters at 1,800–2,200 s give about 50–60 mN/kW. Krypton costs roughly 10–15% in thrust-to-power, so thrust is **about 5–9 N**.
- **Mass:** dry 80 t, cargo 200 t, exhaust velocity v_e = 20 km/s.
- **Refuelling:** propellant for both legs is loaded at the station. The empty leg carries only the return propellant. This is the correction to the finding, which applied loaded mass to both legs.

**Rocket equation, 4 km/s per leg** (mass ratio e^(4/20) = 1.221):

- Loaded return leg: m_f = 280 t, so m₀ = 342 t and propellant is 62 t.
- Empty outbound leg: m_f = 80 + 62 = 142 t, so m₀ = 173 t and propellant is 31 t.
- Total: **93 t of propellant per cycle**, about 0.47 t per t of cargo.
- Mass flow is ṁ = F/v_e = 7 N / 20,000 m/s = 3.5×10⁻⁴ kg/s, about 11 t/yr. Thrusting time is therefore about **8.4 yr per cycle** (6.5 yr at 9 N).

**Sensitivity to Δv per leg:**

| Δv per leg | Propellant per cycle | Thrusting time per cycle (5–9 N) | Fleet of 15 × 200 t |
|---|---|---|---|
| 3 km/s | 65 t | 4.6–8.3 yr | 0.36–0.65 kt/yr |
| 4 km/s | 93 t | 6.5–11.8 yr | 0.25–0.46 kt/yr |
| 5 km/s | 125 t | 8.8–15.9 yr | 0.19–0.34 kt/yr |
| 1 km/s (ARM-class retrieval to cislunar space) | 19 t | 1.4–2.4 yr, but synodic phasing usually dominates (3–10+ yr) | 0.3–2 kt/yr |

A 15-year vehicle life allows **1–3 cycles, not 10+**. Fleet delivery is **0.2–0.65 kt/yr** at the stated 6–10 km/s round trip, which is **80–250× short** of 50 kt/yr.

**What 50 kt/yr would require** at 4 km/s per leg (this is the point the earlier rounds under-weighted):

- Propellant: 50 kt × 0.47 ≈ **23 kt/yr of krypton or iodine**.
- Jet power: P = ½ ṁ v_e² / η = 0.5 × 0.73 kg/s × (2×10⁴)² / 0.55 ≈ **265 MWe**, with a range of 150–400 MWe.
- Iodine supply: world production is about 30 kt/yr (USGS Mineral Commodity Summaries, about 31–33 kt in recent years). The fleet would need **roughly 70% of world output**.
- Krypton supply: world production is plausibly a few hundred t/yr. This is my estimate and should be verified, but under any estimate 23 kt/yr is two orders of magnitude beyond it.
- Launch: delivering the propellant alone costs $12–230B/yr at $0.5–10k/kg.

Fifty kt/yr through an Earth-propellant electric fleet is therefore **not a sizing problem but an architecture impossibility**.

**Proposed change.**
- Phase 0A throughput is set by transport: **about 0.4 kt/yr of delivered concentrate (range 0.2–1)**.
- 50 kt/yr is achievable only with one of:
  - (a) processing co-located at the ore body, so only product moves;
  - (b) propellant made from asteroid material (water or O₂ for electrothermal or chemical propulsion, or a mass-driver concept);
  - (c) very low-Δv targets and an Earth–Moon-space station.
- Record this as a Phase-1 architecture gate, not a fleet-size tweak.

### P0-F02: Mining, transport and processing rates disagree. **Agree**

- **Continuous excavation:** 2–5 t/h × 8,760 h = 17.5–44 kt/yr per robot. The 1,000 t/yr target therefore implies a **2.3–5.7% duty cycle**, which no document states.
- **Concentration (magnetic and gravity-free separation of crushed chondrite):**
  - H and L ordinary chondrites contain about 7–19 wt% Fe-Ni metal (L ≈ 7–8%, H ≈ 15–19%; standard meteoritics compilations).
  - Mass ratio of excavated to concentrate = (concentrate grade / feed grade) ÷ recovery.
  - With 10% feed, 60–80% concentrate grade and 60–85% recovery, the ratio is **5–15:1, reference 10**.
- **Comparison with round 1:**
  - Claude's 2–4× implicitly assumes 100% recovery. It is too optimistic.
  - GPT's 33:1 assumes 2.25% *recoverable* metal. That is a target-selection pessimism, not a separation limit.
  - Both remain defensible until feed tests exist.

**Phase-0A chain (reference, with range):**

| Stage | t/yr | Basis |
|---|---|---|
| Excavated | 4,000 (1,300–10,000) | Concentrate × 5–15 |
| Concentrated, at asteroid | 400 (250–650) | Transport-limited (F01) |
| Transported to station | 400 (250–650) | F01 |
| Processed | 400 | Station sized to transport, with 2× surge capacity |
| Product: Fe-Ni alloy | 220 (100–450) | 70% metal in concentrate × 80% melt/carbonyl yield |
| Product: slag/silicate (ceramic, shielding) | 120 (60–250) | Remainder minus losses |
| Volatiles | ≈0 from ordinary chondrite; 0–40 from a separate C-type stream | Feed-dependent |

- **Robots:** excavating 1.3–10 kt/yr at 2–5 t/h needs 260–5,000 robot-hours per year. **Two to four robots at 20–40% engineering duty, plus one or two spares**, suffice. Twenty robots are oversized by about 4–10×.

**Proposed change.** Publish the chain above in both bom-0-2 and bom-0-3. Resize bom-0-2 to 4–6 units bought in stages, and state duty cycle and concentration ratio explicitly.

### P0-F03: Station power vs. 50 kt/yr. **Agree** (with re-framing)

Energy per kg of **product** (feed energy scales by 1/yield):

| Product | kWh/kg product | Basis | Power at 50 kt/yr (1 kWh/kg ≈ 5.7 MW) | Power at Phase-0A rate |
|---|---|---|---|---|
| Fe-Ni, melted | 0.6–1.5 | Sensible plus latent heat ≈ 1.25 MJ/kg (0.35 kWh/kg) ÷ 40–60% induction and vacuum efficiency, plus handling. Calculation. | 3.4–8.6 MW | 220 t/yr → **15–40 kW** |
| Fe-Ni, carbonyl (Mond) | 1–4 (estimate) | Low-temperature gas loop (Ni(CO)₄ at ~50–60 °C; Fe(CO)₅ needs ~100–200 bar and ~200 °C), plus CO recycle and compression. Judgement. | 6–23 MW | 10–100 kW |
| Al from silicate, MRE/FFC | 15–30 | Hall–Héroult is 13–15 kWh/kg (IAI). Silicate feed and co-reduced Si/Fe raise the cost. | 85–170 MW | — |
| Metallurgical Si | 12–25 | Carbothermic 11–13 kWh/kg industrial; MRE higher | 70–140 MW | — |
| Solar-grade Si (total from oxide) | 60–150 | Siemens/FBR purification ~40–100 kWh/kg incremental | 340–850 MW | — |

Two further points:

- **Al is a poor product from chondrites in any case.** Chondrites carry only about 1.1–1.5 wt% Al (CI ≈ 0.86%). Aluminium belongs to lunar highland anorthite (13–18% Al), not to asteroids. Neither the finding nor round 1 raised this.
- **At the transport-limited rate, power is no longer the binding constraint.** A native-Fe-Ni line needs tens of kW; the station load is dominated by robotics, beneficiation, thermal control and avionics. Installed **0.5–1.5 MWe** covers this plus a 10–50 t/yr oxide-reduction research line (20 kWh/kg × 50 t ≈ 115 kW average).

**Supply.** Allocate 0.8 MWe (range 0.5–1.5) from bom-0-5. The remaining roughly 99 MW of bom-0-5 has no user until transport is re-architected.

**bom-0-5 pricing.** $5/W is one to two orders of magnitude below flown deep-space array cost (ROSA/iROSA-class arrays sit well above $100/W at system level; this is an estimate). Flag it to the bom-0-5 reviewer.

### P0-F10: Crew not budgeted. **Agree.** Phase 0 is uncrewed.

- Crewing L4/L5 or cislunar space needs Orion-class vehicles (order $1–4B per mission, estimate), deep-space life support and radiation shelter. That is a programme larger than the station itself, and it buys nothing a molten-metal demonstrator needs.
- Remove the habitat, life support and quarterly visits.
- Keep only a robotic berthing and servicing interface.
- Do not call the station "human-rated". Structural margins without crew systems, safety analysis or certification are not human-rating, and the label creates a false requirement trail (I side with GPT on D10).

### P0-F15: Deliberations not written back. **Partly**

The three supplied conclusions (rq-0-11, rq-0-14, rq-0-30) are indeed missing from the spec. However, each contains errors and must be **written back corrected, not as stated**. The repository-wide "eight of nine" claim cannot be verified from the material provided here.

**rq-0-11, gravity zones.**
- *Adopt* the principle: separate gravity-dependent steps from microgravity-tolerant ones.
- *Reject* the 50 m / 1.4 rpm geometry. That radius is a human-comfort heuristic, and Phase 0 is uncrewed. For a process, Coriolis and gravity-gradient limits allow a short-arm centrifuge:
  - 0.1 g at r = 5 m needs ω = √(0.98/5) = 0.44 rad/s (4.2 rpm).
  - Coriolis acceleration on a 1 cm/s melt flow is 2ωv ≈ 0.009 m/s², under 1% of the 0.98 m/s² body force.
  - The radial g-gradient across a 0.3 m melt is about 6%.
- A 2–10 m rotating furnace cartridge (estimate 8–25 t) replaces the 50 m truss and counterweight.
- *Reject* the 10–15 t penalty and the contingency cut to 15–20%. Neither is supported by any test data.

**rq-0-14, propellant.**
- The figure "500 kW → 70–90 t/yr" equals only the **H₂ mass**. Total propellant:
  - Electrolysis at about 50–55 kWh/kg H₂ is 5.6–6.1 kWh/kg H₂O (HHV of water = 4.4 kWh/kg).
  - Adding extraction (1–4 kWh/kg H₂O at 10–20% water content) and liquefaction (≈1.5 kWh/kg) gives 8–12 kWh/kg propellant.
  - 500 kW × 8,760 h ÷ 8–12 kWh/kg = **365–550 t/yr** of H₂ + O₂, or about 750 t/yr counting electrolysis alone.
- "100 t LH₂ + 600 t LOX" is an engine mixture ratio, not stoichiometric. Water yields 8:1, so that farm vents or stores 200 t of surplus O₂.
- The payback arithmetic is internally inconsistent: $500M against $1–2B/yr is under one year, not 5–10.
- Most importantly, **no Phase-0 line consumes LOX/LH₂**. bom-0-4 is Kr/I electric propulsion. The same objection applies to bom-0-6, which is a $2B line with no consumer.
- *Write-back:* reserve volatile-capture interfaces only; no electrolysis hardware in bom-0-3. Replace the 4–5 MW backbone with a **modular 1 MW bus with expansion couplers** (see the decision critique).

**rq-0-30, cryogenics.**
- Carnot COP at 20 K rejecting at about 300 K is 20/280 = 0.071. At 10–20% of Carnot, a 15–40 W leak needs **1.1–5.6 kW per tank**, not 700 W. About 700 W is reachable only if an 80 K intercept cuts the 20 K load to about 5–10 W.
- The 190-day margin is wrong:
  - Subcooling 100 t of LH₂ from 15 K to 20.3 K stores about 5.3 K × ~8 kJ/kg·K × 10⁵ kg ≈ 4 GJ.
  - At 15–40 W that lasts **3–8 years**.
  - 190 days implies a leak of about 250 W.
  - LH₂ at 15 K has a vapour pressure of about 0.13 bar, so pressurant management is needed (triple point 13.8 K).
- *Write-back:* reserve a shadow-zone volume and keep-out geometry only. No cryogenic hardware in Phase 0.

**rq-0-18, 28, 29, 47, 48.** Not supplied. Disposition is open. Provisionally, rq-0-47 (sunshield) and rq-0-48 (MLI) apply only if a cryogenic depot survives the consumer question.

### P0-F18: No metallurgy fallback. **Agree**

The station needs three things: a qualified process route, a gate, and a costed alternative that includes the **null option**.

- **Process routes in Phase 0A** (ACH ranking in §6):
  - (i) Short-arm centrifuge melt and separation.
  - (ii) Carbonyl Fe-Ni, which is gravity-independent and has Vale/Inco Clydach heritage since 1902.
- **Fallback branches:**
  - **F-A:** carbonyl-only station.
  - **F-B:** Earth-supplied Phase-1 material.
  - **F-C:** lunar-surface processing. This is the correct source for Al and Si; it has 0.165 g natively and Apollo/CLPS-era feed knowledge. Cost about $15–40B (judgement).
- **Earth delivery cost to SE-L1:**
  - Present-day expendable heavy lift: about $5–15k/kg (Falcon Heavy expendable at about $150M for about 15 t to C3 ≈ 0).
  - Conditional on refuelled, fully reusable heavy lift: $0.5–3k/kg.
  - Claude's and GPT's round-1 figures are each one end of this scenario range. Report both; do not average them.
- **Gates:**
  - **G1 (year 4–5, precursor):** on representative concentrate, ≥90% metal recovery on ≥10 kg batches, ≤2 kWh/kg feed, ≥100 autonomous cycles. Failure triggers F-A or F-B.
  - **G2 (pilot + 2 yr):** delivered cost at SE-L1 below the then-current Earth-launch $/kg for equivalent product, and ≥50% of nameplate for 6 months. Failure stops expansion.

### P0-F19: Phase-0 output not tied to Phase-1 demand. **Agree**

- **Phase-1 hardware mass:**
  - Collectors: 69–1,850 t.
  - Blankets: 3,450–225,000 t.
  - Total 3.5–227 kt, if additive. Whether collector mass already includes blanket mass is unconfirmed.
- **What Phase 1 actually needs:** PV blankets are mostly cells, polymer, cover glass and conductors. The station's realistic product (Fe-Ni alloy, slag ceramic) serves only structure, ballast and shielding, plausibly 10–30% of mass (judgement).
- **Mismatch:** station output is 0.1–0.45 kt/yr against a structural demand of perhaps 0.35–70 kt over about 10 years. The station could cover 0.5–100% of the structural fraction and essentially none of the PV fraction.
- **Material quality:** kamacite Fe-Ni (5–7% Ni, ~0.5% Co, with P, S and C) is usable for trusses, cable and shielding. It is not the light alloy a PV structure wants.
- **Proposed change:**
  - Set the Phase-1 baseline as Earth-supplied.
  - Make ISRU Fe-Ni a substitution option for structural and shielding mass, with first deliveries no earlier than commissioning + 2 yr, at 20–200 t/yr to SE-L1.
  - Add an alloy acceptance specification.
  - Add a product-delivery leg from the station to SE-L1.

---

## 2. Revised specification

| Parameter | Old | New (reference) | Range | Basis | Confidence |
|---|---|---|---|---|---|
| Role | Refinery, 50 kt/yr | Uncrewed native-Fe-Ni process demonstrator | — | Calculation (F01) | Medium |
| Feed throughput (Phase 0A) | 50,000 t/yr | 400 t/yr concentrate | 200–1,000 | Calculation | Medium |
| Fe-Ni product | Unspecified | 220 t/yr | 100–450 | Calculation | Low |
| 50 kt/yr target | Committed | Unfunded Phase-1+ objective, gated on non-Earth propellant or co-location | — | Calculation | Medium |
| Initial mass | 400–500 t | 180 t | 120–300 | Judgement (bottom-up sketch below) | Low |
| Full-build mass | 800–1,000 t | Withdrawn | — | — | — |
| Installed power | 1–2.5 MW | 0.8 MWe, allocated from bom-0-5 | 0.5–1.5 | Calculation | Medium |
| Average power | — | 0.35 MWe | 0.2–0.6 | Calculation | Low |
| Power backbone | 4–5 MW (rq-0-14) | 1 MW modular, couplers to 5 MW | — | Judgement (real option) | Medium |
| Partial-gravity module | None (rq-0-11: 50 m, 1.4 rpm) | Short-arm centrifuge furnace, 0.1 g | 0.03–0.3 g; r 2–10 m; 2–12 rpm | Calculation | Medium (geometry), low (process) |
| Rotor power transfer | Unspecified (MW slip ring) | ≤0.3 MW, or arrays on a sun-pointed rotor (no power slip ring) | 0.05–0.3 MW | Judgement; ISS SARJ heritage is tens of kW per joint | Low |
| Process routes | Solar/arc/hybrid smelting | Induction melting in centrifuge, and carbonyl bench line in parallel | — | Judgement (ACH) | Low |
| Products | Al, Fe, Ni, solar-grade Si | Fe-Ni alloy, slag ceramic; oxide reduction research only | Oxide research 0–50 t/yr | Calculation (chondrite Al ≈ 1.2%) | Medium |
| Crew | Quarterly visits | None; robotic berthing only | — | Judgement | High |
| Design life | 30 yr | 12 yr mission; process modules 5–10 yr replaceable; bus 20 yr | 10–15 | Judgement | Medium |
| Location | SE-L4/L5 | Trajectory-selected. Lead candidate cislunar DRO or EML1/2; L4/L5 retained | — | Judgement | Low |
| Propellant/cryogenics | Implied by rq-0-14/30 | Interfaces and volume reserved only; no hardware | — | Calculation (no consumer) | Medium |
| Communications | Unspecified | Local autonomy; 1–10 Mbit/s average, 50 Mbit/s burst | 0.1–100 | Judgement | Low |
| Unit cost (station, precursor, launch; excludes power generation, transport, robots) | $10B | $11B | $8–16B | Judgement: $40–80k/kg hardware + launch $0.4–2B + precursor $0.5–1B | Low |
| Contingency | 30–40% | 50% | 40–60% | Judgement | Medium |

**Mass sketch** (judgement):

| Element | Mass |
|---|---|
| Centrifuge furnace(s) | 8–25 t |
| Beneficiation, receiving and storage | 15–30 t |
| Power: 0.8 MWe at 50–150 W/kg | 5–16 t |
| Radiators: ~1 MW at 350 K, two-sided, ≈1.45 kW/m² → ~700 m² at 5–10 kg/m² | 4–7 t (plus high-temperature loops) |
| Carbonyl line | 5–15 t |
| Bus, structure, robotics, spares, avionics and propulsion | 60–150 t |
| **Total** | **≈100–250 t** |

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-2 | Mass: concentrate grade and assay data | 400 t/yr (250–650) at 60–80% metal | Partial (rates inconsistent) |
| bom-0-4 | Mass inbound: concentrate | 400 t/yr | Yes (rate unstated) |
| bom-0-4 or new line | Mass outbound: product to SE-L1 | 100–450 t/yr | **No** |
| bom-0-4 | Propellant: Kr/I transfer at station | ≈190 t/yr (0.47 t per t cargo) | **No** (no procurement) |
| bom-0-5 | Power | 0.8 MWe installed (0.5–1.5) | **No** (no allocation) |
| bom-0-6 | Volatiles | 0 t/yr (ordinary chondrite); 0–40 t/yr if C-type stream | Yes, but **no consumer** |
| bom-0-7 / Earth | Data, operations | 1–10 Mbit/s average, 50 Mbit/s burst | **No** ground segment |
| Earth | Mass: spares and consumables (CO make-up, crucibles, filters) | 5–15 t/yr | **No** |
| Phase-1 SE-L1 node | Mass: Fe-Ni alloy | 20–200 t/yr from commissioning + 2 yr | **No** |

---

## 4. Missing items or scope

1. **Integrated trajectory and propellant study.** Covers candidate NEAs × station orbits × L1 delivery, including synodic windows. Cost $5–20M. This is the gating analysis for everything else.
2. **Asteroid-side beneficiation** (crush, magnetic separation, packaging, assay). This belongs in bom-0-2 or a new line; estimate 10–30 t, $0.2–0.5B.
3. **Product transfer from station to SE-L1.**
4. **EP propellant procurement and launch.** About 190 t/yr Kr/I at Phase-0A rate. At 50 kt/yr it exceeds world supply.
5. **Station launch and orbit transfer** (120–300 t).
6. **Precursor programme:** centrifuge melt tests, carbonyl bench tests, ground analogue, CFD. $0.5–1B.
7. **Ground segment, operations and spares logistics.** Ground segment $0.3–1B; operations $0.15–0.4B/yr.
8. **Alloy acceptance specification and Phase-1 demand model.**
9. **Null-option cost case** (Earth-supplied Phase 1).

---

## 5. Remaining disagreements and open questions

- **Location.** I lean towards cislunar space for ARM-class low return Δv, 1.3 s latency and low-energy manifold transfer to SE-L1. L4/L5 has a stable environment but only a handful of known Earth Trojans (e.g. 2010 TK7 at 20.9° inclination), which makes co-location there impractical. Reasonable engineers can still prefer L4/L5. The trajectory study decides this.
- **Concentration ratio** (5–15 vs 33 vs 2–4). Only feed tests can settle it.
- **Carbonyl as co-baseline vs fallback.** CO make-up from low-carbon ordinary chondrites (≈0.1–0.5% C) may force a C-type feed or Earth-supplied CO.
- **Earth delivery $/kg.** This is a scenario, not a fact. It drives the null-option comparison.
- **Is the Phase-0 station worth building** if Phase-1 demand sits near 3.5 kt and refuelled heavy lift reaches about $1k/kg? At $1k/kg, $11B buys about 11 kt delivered.
- **Does bom-0-6 have any Phase-0 purpose,** given there is no LOX/LH₂ consumer?

---

## 6. Decision-quality critique

**Methods used:**
- The Composite Scaffold for every decision.
- QOC for location.
- ACH for process route.
- GRADE Evidence-to-Decision for station existence and fallback.

**Calibrated language:** likelihood (*likely* ≈ 66–90%, *very likely* ≈ 90–99%) is given separately from confidence (from evidence × agreement).

**General defects of the round-1 reconciliation:**

- **A11 "overlap $9.5–14B" averages across three different scopes.** D19 shows they differ, so the overlap has no referent.
- **A6 reports convergence on 50 m / 1.4 rpm.** All three inherited this from rq-0-11; agreement is not evidence.
- **The null option is never evaluated.**

### Decision 1: Phase-0A throughput (A2/D1). Blocking (F01)

| Step | Content |
|---|---|
| 1. Frame | Property decision; partly reversible because modules can be added. Cynefin: complicated, since physics can resolve it. |
| 2. Criteria (stated before options) | Mass-flow closure (must); information value of the demonstrator (want, 0.4); cost (0.3); scalability path (0.3) |
| 3. Options | 50 kt/yr (status quo); 3–8 kt/yr (Gemini); 1–5 kt/yr (Claude r1); 0.2–1 kt/yr (GPT and this review); null (no station) |
| 4. Matrix | 50 kt and 3–8 kt fail the closure must on current transport. 1–5 kt passes only at about 1 km/s per leg with favourable windows. 0.2–1 kt passes. Null passes, but its information value is zero. |
| 5. Sensitivity/trade-off | **Sensitivity point:** the throughput–Δv product. **Trade-off point:** demonstration scale (more process data) against cost and closure risk. |
| 6. Certainty | Fleet ≤0.65 kt/yr at ≥3 km/s/leg: *very likely*, high confidence (rocket equation, three independent agreeing estimates). |
| 7. Key assumption | Δv per leg ≥3 km/s. *Falsifier:* the trajectory study finds ≥3 targets with ≤1 km/s legs and ≤3-yr windows. |
| 8. Decision | *In the context of a transport-limited fleet, facing a 100× closure gap, we chose a 0.2–1 kt/yr demonstrator, to retire process risk on real feed, accepting that Phase 0 produces no meaningful Phase-1 supply.* |
| 9. Consequences | Constrains bom-0-2 (resize down) and bom-0-5 (allocation is under 2% of the line). Enables a smaller rotor. |

**Weakest DQ link: frame.** Round 1 treated throughput as a station property when it is a transport-architecture outcome.

### Decision 2: Rotating module geometry (A6). Major

| Step | Content |
|---|---|
| 1. Frame | Property decision; one-way once the truss is built. Complicated. |
| 2. Criteria | Process adequacy (separation, heat transfer); mass; rotor power transfer; disturbance to the 0 g zone |
| 3. Options | 50 m arm at 1.4 rpm; 2–10 m centrifuge cartridge; free-flying spin cartridge; pure microgravity with EM/filtration |
| 4. Matrix | The 50 m arm is heavy (Claude r1 15–40 t; GPT 20–80 t) and needs an MW-class slip ring. The cartridge is 8–25 t and ≤0.3 MW. Free-flyer: no slip ring, but needs docking cycles. Microgravity: unproven at kg scale. |
| 5. Sensitivity/trade-off | **Trade-off point:** radius trades Coriolis and g-gradient uniformity against mass and rotor power. For process (no humans) both are acceptable at ≥2 m, so this is close to a dominance case. |
| 6. Certainty | Partial gravity sufficient for bulk slag separation: *likely*. Stokes rise of a 1 mm slag droplet at 0.1 g in liquid Fe is about 3.6 cm/s, while a 10 µm droplet is about 3.6 µm/s, so filtration is still needed. Medium confidence, because there are no data in the 0.01–0.2 g regime. |
| 7. Key assumption | Coriolis-driven flow does not degrade separation at 4–7 rpm. *Falsifier:* rotating-tank analogue tests or CFD showing >10% recovery loss vs. static at matched g. |
| 8. Decision | *Chose the short-arm cartridge, to fit an uncrewed demonstrator, accepting new rotor-furnace development.* |
| 9. Consequences | Retires the MW slip ring. Unlocks a free-flyer test on an existing platform. |

**Weakest DQ link: alternatives.** Only the inherited geometry was considered.

### Decision 3: Process route (D8). ACH

Scores against each hypothesis: C = consistent, I = inconsistent, ? = untested.

| Evidence | H1: Partial-gravity melt | H2: Pure-microgravity melt | H3: Carbonyl |
|---|---|---|---|
| No 0 g kg-scale melt separation exists | C | I | C |
| Terrestrial carbonyl heritage at industrial scale | — | — | C |
| Bond-number spread across droplet sizes | C (partly) | I | C (no melt) |
| CO make-up from low-C feed | — | — | ? / I |
| Sulfur (troilite ~5%) effect on kinetics | — | — | ? |

- **Least disconfirmed:** H1 and H3. H2 is retained only as a microgravity refining step, not as smelting.
- **Weakest DQ link: information.** No representative-feed data exist.
- **Falsifier for H3:** a bench test on chondrite-analogue concentrate showing <50% Ni recovery, or CO losses above 5% per cycle.

### Decision 4: Power allocation and 4–5 MW backbone (A3/D4)

| Step | Content |
|---|---|
| Frame | Real-options decision. Building the backbone now is partly one-way (mass, cost). |
| Options | 4–5 MW installed now; 1 MW with couplers; 0.5 MW minimum |
| Assessment | Demand at Phase-0A rate is 0.2–0.6 MW. A 4–5 MW backbone is a deferral option bought before its exercise conditions (transport, consumer) are even feasible. |
| Trade-off point | Up-front cost against later retrofit cost. This is a **values and real-options question**. |
| Certainty | Phase 0A needs <1.5 MW: *very likely*, medium confidence. |
| Key assumption | Retrofit couplers cost less than about $50–150M. *Falsifier:* a bus design study showing coupler mass or cost above that of the oversized bus. |
| Decision | 1 MW modular, accepting retrofit risk. |

**Weakest DQ link: reasoning.** rq-0-14 sized the backbone for a propellant plant with no consumer.

### Decision 5: Propellant production phasing (A8/D13)

- **Frame:** existence decision.
- **Null option** (no electrolysis anywhere in Phase 0) was never scored.
- **Consumer:** none exists. bom-0-4 uses Kr/I.
- **Decision:** defer, and question whether bom-0-6 should exist in Phase 0 at all. The trade-off is optionality for future chemical tugs against $2B today, and that is a values question.
- **Certainty:** the rq-0-14 figures are wrong by 4–8×: high confidence (stoichiometry and HHV).
- **Falsifier for deletion:** a mission model showing a Phase-0/1 LOX/LH₂ consumer at ≥100 t/yr.
- **Weakest DQ link: frame.** Supply was designed without a demand.

### Decision 6: Station existence and fallback (A9/D12). GRADE EtD

| EtD element | Assessment |
|---|---|
| Benefits | Process data on real feed; a long-run ISRU path |
| Harms | Opportunity cost of $11B (range $8–16B), against Phase-1 demand that may be ≤3.5 kt |
| Certainty of evidence | Low. No representative-feed processing exists at any scale. |
| Values | How much the programme weights long-run independence over near-term Phase-1 cost. This is a **trade-off point**, not a fact. |
| Resource use | Strongly dependent on the Earth $/kg scenario ($0.5–15k/kg) |
| Feasibility | Demonstrator: plausible. Refinery: not, under current transport. |

- **Recommendation:** conditional. Build the demonstrator only if G1 passes. Carry the null option as a costed branch.
- **Likelihood the station beats Earth supply for Phase-1 structure by year 15:** *about as likely as not* (judgement), low confidence.
- **Key assumption:** Earth-to-L1 cost stays above about $3k/kg. *Falsifier:* demonstrated operational refuelled heavy-lift pricing below $2k/kg to C3 ≈ 0.
- **Weakest DQ link: alternatives** (the null option is missing).

### Decision 7: Uncrewed (A1)

- Two-way-ish decision; criteria are cost and safety against servicing.
- Uncrewed dominates. *Very likely* correct, high confidence.
- Residual weakest link: **commitment**. "Human-rated provisions" language keeps the crew requirement alive without funding it.

```yaml
item: bom-0-3
model: Claude
findings:
  - id: P0-F01
    verdict: agree
    summary: Correcting leg masses, a 95-155 kWe and 5-9 N vehicle needs 6.5-12 yr per 4 km/s-per-leg cycle, so 15 vehicles deliver 0.2-0.65 kt/yr, and 50 kt/yr would need about 23 kt/yr Kr/I (about 70% of world iodine) and 150-400 MWe.
    proposed_change: Size Phase 0A to transport (about 0.4 kt/yr) and make 50 kt/yr a Phase-1+ objective gated on co-located processing or non-Earth propellant.
  - id: P0-F02
    verdict: agree
    summary: The 1,000 t/yr robot target implies an unstated 2.3-5.7% duty cycle, and a realistic 5-15:1 concentration gives 1.3-10 kt/yr excavated for 0.4 kt/yr delivered.
    proposed_change: Publish one mass-flow chain (about 4,000 to 400 to 400 to 220 t/yr Fe-Ni) and resize bom-0-2 to 4-6 robots bought in stages.
  - id: P0-F03
    verdict: agree
    summary: At 50 kt/yr the station needs 3-9 MW for Fe-Ni and 85-850 MW for Al or Si, but at the transport-limited rate power is not binding and chondrite Al content (about 1.2%) makes Al a poor product.
    proposed_change: Allocate 0.8 MWe (0.5-1.5) from bom-0-5, limit products to Fe-Ni and slag, and confine oxide reduction to research scale.
  - id: P0-F10
    verdict: agree
    summary: Crewing a deep-space station costs more than the station and buys nothing a robotic demonstrator needs.
    proposed_change: Phase 0 uncrewed; robotic berthing only; drop the human-rated label.
  - id: P0-F15
    verdict: partly
    summary: rq-0-11, rq-0-14 and rq-0-30 are missing from the spec but contain errors (50 m arm basis, propellant figures 4-8x low, cryocooler power 2-8x low, 190-day margin inconsistent), and eight of nine cannot be verified.
    proposed_change: Write back corrected versions, namely a short-arm centrifuge, interfaces-only propellant and cryogenic provisions, and a 1 MW modular bus.
  - id: P0-F18
    verdict: agree
    summary: No qualified process, gate or costed alternative exists, and the null option of an Earth-supplied Phase 1 was never evaluated.
    proposed_change: Run centrifuge and carbonyl routes to gate G1 (at least 90% recovery, at most 2 kWh/kg, 100 autonomous cycles), with fallbacks carbonyl-only, Earth supply and lunar processing.
  - id: P0-F19
    verdict: agree
    summary: Station Fe-Ni output (0.1-0.45 kt/yr) serves only the structural fraction of a 3.5-227 kt Phase-1 demand that is mostly PV, and no leg delivers to SE-L1.
    proposed_change: Baseline Phase 1 as Earth-supplied, treat ISRU Fe-Ni as a substitution option at 20-200 t/yr to SE-L1, and add a delivery leg and an alloy specification.
revised_spec:
  - parameter: feed_throughput_phase0A
    old: 50000
    new: 400
    range: [200, 1000]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: fe_ni_product_output
    old: unspecified
    new: 220
    range: [100, 450]
    unit: t/yr
    basis: calculation
    confidence: low
  - parameter: initial_mass
    old: 400-500
    new: 180
    range: [120, 300]
    unit: t
    basis: judgement
    confidence: low
  - parameter: installed_power
    old: 1-2.5
    new: 0.8
    range: [0.5, 1.5]
    unit: MWe
    basis: calculation
    confidence: medium
  - parameter: power_backbone
    old: 4-5
    new: 1
    range: [1, 5]
    unit: MW (modular, expandable)
    basis: judgement
    confidence: medium
  - parameter: partial_gravity_level
    old: 0.05-0.15 (50 m arm)
    new: 0.1
    range: [0.03, 0.3]
    unit: g
    basis: calculation
    confidence: medium
  - parameter: centrifuge_radius
    old: 50
    new: 5
    range: [2, 10]
    unit: m
    basis: calculation
    confidence: medium
  - parameter: rotor_power_transfer
    old: unspecified
    new: 0.2
    range: [0.05, 0.3]
    unit: MW
    basis: judgement
    confidence: low
  - parameter: crew
    old: quarterly visits
    new: none
    range: [0, 0]
    unit: visits/yr
    basis: judgement
    confidence: high
  - parameter: design_life
    old: 30
    new: 12
    range: [10, 15]
    unit: yr
    basis: judgement
    confidence: medium
  - parameter: fe_ni_melt_energy
    old: unspecified
    new: 1.0
    range: [0.6, 1.5]
    unit: kWh/kg product
    basis: calculation
    confidence: medium
  - parameter: unit_cost
    old: 10
    new: 11
    range: [8, 16]
    unit: USD billion
    basis: judgement
    confidence: low
  - parameter: contingency
    old: 30-40
    new: 50
    range: [40, 60]
    unit: percent
    basis: judgement
    confidence: medium
interfaces:
  - with: bom-0-2
    flow: mass
    value: 400 t/yr concentrate (250-650) at 60-80% metal
    in_bom: true
  - with: bom-0-4
    flow: mass
    value: 400 t/yr inbound concentrate
    in_bom: true
  - with: bom-0-4
    flow: propellant
    value: about 190 t/yr Kr/I transferred at station
    in_bom: false
  - with: product transfer to SE-L1 (new)
    flow: mass
    value: 100-450 t/yr Fe-Ni and slag
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0.8 MWe installed (0.5-1.5)
    in_bom: false
  - with: bom-0-6
    flow: propellant
    value: 0-40 t/yr water, no Phase-0 consumer
    in_bom: true
  - with: bom-0-7
    flow: data
    value: 1-10 Mbit/s average, 50 Mbit/s burst
    in_bom: false
  - with: Earth logistics (new)
    flow: mass
    value: 5-15 t/yr spares and consumables
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-3
    quantity: 1 uncrewed demonstrator, 0.2-1 kt/yr feed
    unit_cost_usd: [8000000000, 16000000000]
    rationale: Station throughput must match the transport-limited mass flow, and the cost includes precursor work, launch and 40-60% contingency.
  - action: remove
    item: crew habitat, life support and visits
    quantity: all
    unit_cost_usd: [0, 0]
    rationale: Phase 0 is uncrewed.
  - action: add
    item: short-arm centrifuge furnace (within bom-0-3)
    quantity: 1-2
    unit_cost_usd: [300000000, 1000000000]
    rationale: Partial gravity for melt separation without a 50 m truss or MW slip ring.
  - action: add
    item: carbonyl Fe-Ni process line (within bom-0-3)
    quantity: 1 bench-to-pilot line
    unit_cost_usd: [200000000, 800000000]
    rationale: Gravity-independent route with industrial heritage, and fallback F-A.
  - action: add
    item: integrated trajectory and propellant study
    quantity: 1
    unit_cost_usd: [5000000, 20000000]
    rationale: Gates location, throughput and the 50 kt/yr feasibility question.
  - action: add
    item: asteroid-side beneficiation
    quantity: 1-2
    unit_cost_usd: [200000000, 500000000]
    rationale: Shipping concentrate rather than raw ore cuts transported mass 5-15x.
  - action: add
    item: product transfer station to SE-L1
    quantity: 1-2 vehicles or tasked bom-0-4 capacity
    unit_cost_usd: [150000000, 400000000]
    rationale: No line moves product to the Phase-1 node.
  - action: add
    item: EP propellant procurement (Kr/I)
    quantity: about 190 t/yr
    unit_cost_usd: [50000000, 400000000]
    rationale: Propellant supply and launch are unbudgeted (annual cost).
  - action: add
    item: ground segment, operations and spares logistics
    quantity: 1
    unit_cost_usd: [300000000, 1000000000]
    rationale: An uncrewed station requires remote operations and resupply.
  - action: add
    item: Earth-supplied Phase-1 fallback (null option)
    quantity: scenario at 0.5-15 kUSD/kg to SE-L1
    unit_cost_usd: [1000000000, 35000000000]
    rationale: The station must be compared against direct Earth supply.
  - action: resize
    item: bom-0-2
    quantity: 4-6 units, bought in stages
    unit_cost_usd: [50000000, 50000000]
    rationale: 1.3-10 kt/yr excavation needs 2-4 robots plus spares.
  - action: split
    item: bom-0-5
    quantity: 0.8 MWe station allocation plus conditional remainder
    unit_cost_usd: [0, 0]
    rationale: Only about 1% of the line has a Phase-0A user; repricing is flagged separately.
open_questions:
  - Which NEA targets and station orbit give at most 1-2 km/s legs and acceptable synodic windows, and does this favour cislunar space over SE-L4/L5?
  - Can 50 kt/yr ever close without asteroid-derived propellant, given Kr/I demand of about 23 kt/yr?
  - What concentrate grade and recovery does real chondrite feed give (5-15:1 assumed)?
  - Does partial gravity at 0.1 g with filtration give at least 90% recovery, and does Coriolis flow at 4-7 rpm degrade it?
  - Can carbonyl processing close its CO loop on low-carbon ordinary-chondrite feed?
  - What Earth-to-SE-L1 delivered cost should be used, and does the station beat it for Phase-1 structural mass?
  - Does any Phase-0 or Phase-1 element consume LOX/LH2, and if not should bom-0-6 exist in Phase 0?
  - Does Phase-1 collector mass include blanket mass, and what structural alloy specification applies?
```
