---
phase: phase-0
item: bom-0-5
round: 2
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:33:47.391Z
seconds: 351.208
---

# bom-0-5 Solar Power Arrays (Phase 0): Re-assessment, Round 2

**Summary.** The round-1 panel was right on the direction of all three findings. It did not catch four things:

1. **The station load is set by the product slate, and the panel never tested lowering throughput instead of raising power.** Depending on the slate, the station needs anywhere from about 20 MW to about 170 MW of BOL arrays. Lowering throughput to fit the power was never evaluated as an option.
2. **III-V supply capacity is a hard constraint, not a cost detail.** 100 MW of space III-V is far beyond the production rate I would expect from that supply base. This makes the cell-technology choice a feasibility screen.
3. **Battery mass is the largest mass error in the spec.** At pack level, 500 MWh of storage weighs about 3,000–5,000 t, several times the arrays it supports.
4. **The ISPP output has no Phase-0 customer.** The tugs burn Kr or iodine, not H₂/O₂. This changes what the mining-site arrays are for.

---

## 1. Findings

### P0-F03: Station power cannot refine 50 kt/yr. **Verdict: agree (major)**

There is one qualification: the finding, like the round-1 panel, assumes 50 kt/yr of *product* is the fixed quantity.

**Specific energy per product.** All values are electrical, delivered at the process.

| Product / route | Thermodynamic floor | Practical estimate | Basis |
|---|---|---|---|
| Native Fe-Ni, melt and cast | Sensible heat ~1.0 MJ/kg (300→1,810 K, c_p ~0.65 kJ/kg·K) plus latent heat 0.25 MJ/kg ≈ **0.35 kWh/kg** | **0.5–1.5 kWh/kg**, including 50–70% furnace efficiency, superheat, separation and handling | Calculation. Comparable to terrestrial induction melting at ~0.5–0.7 kWh/kg |
| Al by molten-regolith electrolysis (MRE) | ΔH(Al₂O₃) ≈ 31 MJ/kg Al = **8.6 kWh/kg** | **15–30 kWh/kg** | Hall-Héroult runs at 13–15 kWh/kg *with* carbon anodes supplying chemical energy. Inert-anode MRE has no such help and must also heat silicate melt to ~1,600 °C. Estimate |
| Si (metallurgical grade) by MRE or carbothermal | ΔH(SiO₂) ≈ 32.5 MJ/kg Si = **9.0 kWh/kg** | **15–30 kWh/kg** | Terrestrial metallurgical-grade Si takes 11–13 kWh/kg using carbon. Estimate |
| Solar-grade upgrade (Siemens or FBR route) | — | **+40–100 kWh/kg** | IEA PVPS Task 12 LCI data (Frischknecht et al., T12-19:2020) put modern polysilicon at roughly 40–110 kWh/kg. It also needs chlorine and hydrogen chemistry, and no BOM line supplies those consumables |
| O₂ co-product from MRE | Comes with the metal | — | Not an extra energy cost, but it counts in the tonnage if "50 kt" includes O₂ |
| Station auxiliaries (comminution, beneficiation, fabrication, thermal) | — | +10–25% of process energy | Judgement |

**Resulting station power under three slates.** Assumptions for the conversion to BOL nameplate:
- 85% plant availability
- PMAD efficiency 0.92
- 15-year EOL/BOL 0.82
- So BOL = average ÷ (0.85 × 0.92 × 0.82) ≈ average × 1.56

| Slate (kt/yr) | Energy (GWh/yr) | Average (MW) | Delivered capability (MW) | BOL array at 1 AU (MW) |
|---|---|---|---|---|
| **Low:** 45 Fe-Ni, 5 MG-Si | 27 + 75 + 15% → ~120 | 14 | 16 | **~20** |
| **Central:** 40 Fe-Ni, 5 Al, 4 Si, 1 solar-grade upgrade | 40 + 100 + 80 + 70 + 15% → ~335 | 38 | 45 | **~60** |
| **High (oxide-rich):** 20 Fe-Ni, 15 Al, 10 Si, 5 solar-grade | 20 + 375 + 250 + 400 + 15% → ~1,200 | 137 | 160 | **~210** |

The energy column uses mid-range specific energies. Applying the full ranges widens the central case to about 40–95 MW BOL.

**Conclusions.**
- 1–2.5 MW is short by 10–60× for any slate that includes reduced Al or Si.
- 1–2.5 MW can support the *melting* of roughly 15–40 kt/yr of native metal, and nothing else.
- The power line that should supply the station is bom-0-5. Today no document allocates it.

**What the panel missed.** The finding's own question implies two ways to close:
- (a) raise station power to 40–95 MW, or
- (b) reduce Phase-0 throughput and slate to what a smaller allocation supports. For example, 5–10 MW would cover native-metal melt plus about 1 kt/yr of MRE demonstration.

Option (b) is a legitimate Phase-0 choice, because the phase is prospecting plus pilot. It should be put to the human reviewers as a values question (§6, D1).

**Proposed change.** bom-0-3 must publish a product slate (in t/yr per product, with O₂ stated separately) and kWh/kg per product. bom-0-5 then allocates **station EOL delivered power = 45 MW (range 15–110 MW)**, or equivalently **~60 MW BOL (20–170 MW)**. This holds unless the programme chooses option (b).

---

### P0-F04: 100 MW with ~5 MW of identified loads, no site split, storage where there is no night. **Verdict: agree on site split and storage; partly on "~95 MW has no load"**

**Load side.** Once F03 is applied, the station absorbs most of the 100 MW. "~95 MW unassigned" is therefore a documentation defect, not proof of oversizing. That matches Claude's round-1 position.

**Location correction.** The finding says the station and the NEAs are "tens of millions of km apart." Sun–Earth L4/L5 lie about **1 AU (~150 million km) from Earth**. Their distance to typical NEA targets ranges from tens to more than 200 million km over a synodic cycle.

The practical consequence is the same: **no power transfer between sites. Every site is self-powered.**

**Mining-site loads**, assuming 4 sites with 5 robots and 1 ISPP unit each:

| Load per site | Peak (kW) | Notes |
|---|---|---|
| Excavation, 5 robots × 20–50 kW | 100–250 | See the flag below on feed tonnage |
| ISPP, as specified | 250 | Check: heating 10 kg of regolith per kg of water to 1,000 °C takes ~8–10 MJ, plus 3–5 MJ dehydroxylation, so 3–4 kWh/kg thermal. Electrolysis ~5.5–6 kWh/kg H₂O. Liquefaction ~1.5–2.5 kWh/kg H₂O. Total **10–13 kWh/kg H₂O** without heat recovery, so 250 kWe yields **~110–220 t/yr of water** per unit (day-only to continuous) |
| Housekeeping, thermal and communications | 20–50 | Includes deep-space comms (DSN-class link at 1–2 AU) |
| **Total** | **~0.4–0.55 MW** | Rises to ~1.3 MW if ISPP is scaled to ~1 MW, as GPT proposed |

**Site array sizing.** BOL rating at 1 AU = load ÷ (heliocentric factor × EOL × PMAD × dust/pointing):

- **Design point at 1.5 AU:** 1/r² = 0.44.
  - 0.5 MW ÷ (0.44 × 0.82 × 0.92 × 0.85) = 0.5 ÷ 0.28 ≈ **1.8 MW BOL per site**, for day-only operation.
- **With night-side operation:**
  - This multiplies the array by about 2.1–2.3 to recharge storage at 90% round-trip efficiency, giving **~4 MW per site**.
- **Distant aphelia:**
  - Many Amor-class NEAs reach aphelia above 2 AU (factor 0.25). If operations continue through aphelion, the array grows by a further 1.8×.
  - Otherwise, plan seasonal standby.

**Allocation I propose.** The figures below are BOL at 1 AU.

| Site | Central (MW) | Range (MW) |
|---|---|---|
| Station (L4/L5) | 60 | 20–170, set by slate; 40–95 for the central slate's full ranges |
| 4 NEA sites, day-only baseline | 4 × 2.5 = 10 | 8–20 (night operations or scaled ISPP push this toward 20) |
| Unallocated reserve / replacement wings | 10 | 5–15 |
| **Total** | **~80** | **~50–115 for a central-type slate** |

**Storage per site, from actual eclipse profiles:**

- **Station (no eclipse).**
  - Storage serves fault ride-through, the attitude-transient bridge and, critically, **MRE keep-alive**. A frozen electrolyte cell is a likely loss of the cell.
  - Sizing: keep-alive at 5–10% of MRE load (2–5 MW) for 1–2 h, plus avionics, gives **2–10 MWh (central 5 MWh)**.
  - The distributed, independently tracking wings make loss of the whole array improbable. Storage covers controlled shutdown, not continuity.
- **NEA sites.**
  - Rotation periods are mostly 2.2–20 h, so nights last ~1–10 h.
  - **Day-only baseline:** 20–50 kW critical load × 2–10 h = **0.1–0.5 MWh per site**.
  - **Night-operations option:** 0.4–0.5 MW × 3–6 h ≈ **2–6 MWh per site**. That roughly doubles site throughput and requires about 2× the array.
- **Mass check on the original spec.**
  - Space Li-ion/LFP packs achieve ~100–160 Wh/kg at pack level.
  - 500 MWh therefore weighs **3,100–5,000 t**. 200 MWh weighs 1,250–2,000 t.
  - Both exceed the arrays themselves (~800 t).
  - The finding's 1,000–2,500 t is a cell-level figure, so it understates the problem.

**Feed-tonnage flag (affects bom-0-2, not resolved here).**
- If the station's 50 kt of product comes from a native-metal-poor regolith, the excavated feed could be 100–500 kt/yr.
- At 0.02–0.1 kWh/kg for excavation and magnetic beneficiation, that is 2–50 GWh/yr, or **0.3–6 MW** of mining load.
- The 20-robot fleet at 0.4–1.0 MW sits at the low end.
- Site power could therefore be under-allocated by a factor of 1–5.

**Proposed change.** Replace "100 MW, co-located" with a per-site table of EOL delivered power and storage, as above. Delete 200–500 MWh. Specify station storage at 5 MWh (2–10) and site storage at 0.3 MWh (0.1–0.5) for day-only operation, with night operations as a priced option.

---

### P0-F05: $5/W is far below current prices and excludes launch. **Verdict: agree (major)**

**Price basis.** These are estimates; no supplier quotations are public at this scale.

| Basis | Array-level $/W (cells, blanket or panel, structure, tracking, PMAD, integration) | Evidence quality |
|---|---|---|
| Heritage rigid III-V (GEO-comsat class) | ~$300–1,000/W | Low–moderate. Widely quoted industry ranges; no public price lists |
| Flexible III-V, ROSA/iROSA class, at modest volume | ~$100–400/W | Low |
| Mass-produced space silicon (Starlink-class supply chain) | ~$10–40/W | **Very low.** Inferred from constellation economics. Not published |
| Terrestrial utility PV (what $5/W resembles) | <$1/W modules | High, but not applicable |

**Supply-chain constraint (missed by round 1).**
- **III-V:** By my estimate (low confidence), global space III-V cell output is of order a few MW/yr. 100 MW of III-V would take decades of output, or a new production line.
- **Silicon:** Space-silicon array production for constellations is plausibly tens of MW/yr. Estimate: ~2,000 satellites/yr × ~10–30 kW, *unverified*.
- **Consequence:** The consensus spec of "III-V triple-junction" is, in my judgement, *likely infeasible at 100 MW on a Phase-0 schedule*. Medium-low confidence; it is falsifiable by a supplier capacity RFI.

**Mass.**
- At 100 W/kg system level (range 60–150), 80 MW is **~800 t (350–1,900 t)**.
- Storage and spares add 30–80 t.

**Delivery to destination.**
- **LEO launch prices:**
  - Falcon 9/Heavy class: ~$1,500–4,000/kg at list price.
  - Starship class: *assumed* $200–1,000/kg; not yet demonstrated.
- **Beyond LEO:**
  - L4/L5 and NEA destinations require escape plus phasing or rendezvous: ~3.5–4.5 km/s chemical from LEO, or ~6–8 km/s low-thrust.
  - Delivered multiplier on LEO $/kg: 1.5–3×.
- **Self-delivery option:**
  - Arrays can power their own Kr/iodine SEP stage during transit.
  - For a krypton Hall stage at Isp 2,000 s and 7 km/s from LEO, the propellant fraction is exp(0.36) − 1 ≈ 0.43, so **~350 t of propellant for 800 t of arrays**.
  - Launching to C3 ≈ 0 instead cuts SEP ΔV to ~0.5–1.5 km/s (L4/L5 phasing) and propellant to ~20–60 t.
  - Krypton at the hundreds-of-tonnes scale must be checked against world supply, which I have not verified. The BOM already found xenon non-viable.
- **Robotic deployment and commissioning at site:** +$5–20/W (judgement).

**Re-estimate.** Low confidence throughout.

| Scenario | Hardware $/W | Delivery + deploy $/W | All-in $/W | 80 MW line |
|---|---|---|---|---|
| Low (space-Si line built for the programme, Starship-class delivery) | 15–25 | 5–15 | **~25–40** | $2.0–3.2B |
| Central (Si or thin III-V at volume, partly reusable heavy lift plus SEP) | 30–60 | 15–40 | **~70** (45–100) | **~$5.6B** ($3.6–8B) |
| High (heritage III-V pricing, current launch) | 300–600 | 40–150 | **~350–750** | $28–60B |

- **Credible span:** roughly $25–450/W. I would put an 80% interval on **$3–20B for the line**.
- The low and central scenarios require **$0.3–1B of non-recurring production investment**, a line no BOM provides.
- **Disagreement with the round-1 range:**
  - GPT's $100–750/W treats heritage pricing as baseline. I judge it unlikely that a 100 MW procurement would be bought at heritage prices: either a dedicated line is built or the programme cannot proceed.
  - Gemini's "high confidence" on ~$35/W is not warranted by any public evidence.

**Proposed change.** Hardware $40/W (15–300). Delivery and deployment carried on a separate line at ~$30/W equivalent. Line cost (hardware only) $3.2B (central), total all-in ~$5.6B.

---

## 2. Revised specification

| Parameter | Old | New (central) | Range | Basis | Confidence |
|---|---|---|---|---|---|
| Total BOL nameplate at 1 AU | 100 MW | 80 MW | 50–115 (central slate); 30–200 across slates | Calculation | low |
| Station EOL delivered power | unspecified (station spec 1–2.5 MW) | 45 MW | 15–110 | Calculation (F03) | low (slate-driven) |
| Station BOL allocation | unspecified | 60 MW | 20–170 | Calculation | low |
| Per-NEA-site BOL, day-only operation | unspecified | 2.5 MW | 1.8–5 | Calculation at 1.5 AU design point | low |
| Station storage | 500 MWh (Claude) / 200 MWh (Gemini) | 5 MWh | 2–10 | Calculation (MRE keep-alive) | medium |
| Per-site storage | 0 | 0.3 MWh (day-only) | 0.1–0.5; night-ops option 2–6 | Calculation | low |
| Storage chemistry | Li-ion / flow | LFP or LTO, shallow DoD; flow batteries rejected for mass and freeze risk | — | Judgement / literature | medium |
| Cell technology | III-V TJ | Technology-neutral. Must-pass screen: ≥25 MW/yr qualified supply. Choose on delivered EOL $/W | — | Judgement | medium |
| BOL cell efficiency | 32–36% | 22–32% (space Si ~22–24%; qualified III-V 29–32%) | 20–33 | Literature (datasheets) | medium |
| 15-yr EOL/BOL | "<1.5%/yr" | ≥0.80 | 0.72–0.88 | Judgement. Interplanetary solar-proton fluence over a solar cycle; Si at the low end | low–medium |
| System specific power | unspecified | 100 W/kg | 60–150 | Literature (ROSA-class) / judgement | low–medium |
| Array mass | unspecified | 800 t | 350–1,900 | Calculation | low |
| Station array area | unspecified | ~2×10⁵ m² | 0.7–6×10⁵ | Calculation (~300 W/m² BOL) | medium |
| Primary distribution | 600 V DC | 1–3 kV DC trunk. Evaluate feeding series MRE pot-lines directly (terrestrial pot-lines run ~1–1.5 kV DC) | 0.6–5 kV | Calculation / literature | low–medium |
| Module size | 2 MW | 100–250 kW deployable wings in 1–2 MW electrical blocks | — | Judgement | medium |
| Hardware $/W | $5 | $40 | 15–300 | Estimate | low |
| All-in delivered $/W | $5 | $70 | 25–450 | Estimate | low |
| Line cost | $500M | $5.6B all-in | $2–35B (80% interval: $3–20B) | Estimate | low |

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-3 Station | Power | 45 MW EOL delivered (15–110), from ~60 MW BOL | **No.** Station spec says 1–2.5 MW |
| bom-0-3 Station | Other (heat) | 15–35 MW_th average rejected (central ~28 MW_th). ~25–30% of input leaves as chemical energy in metal and O₂. Most rejection is at furnace temperature; ~3–4 MW_th at ~330 K from power electronics (~3,000–5,000 m² of radiator) | **No** |
| bom-0-3 Station | Data | Load forecast and shedding commands, ms-level fault isolation | No |
| bom-0-2 Mining robots | Power | 0.4–1.0 MW peak aggregate across 4 sites; possibly 0.3–6 MW if feed is 100–500 kt/yr | No |
| bom-0-6 ISPP | Power | 1.0 MW aggregate as specified (4 × 0.25 MW); 4–6 MW if scaled | No |
| bom-0-6 ISPP | Other (thermal) | Optional solar-thermal regolith heating, 0.5–1 MW_th per site | No |
| bom-0-4 Transport | Mass | Deliver ~800 t of arrays (350–1,900) to L4/L5 and NEAs, or provide SEP self-delivery | **No** |
| bom-0-4 Transport | Propellant | Kr or iodine: ~20–60 t from C3≈0, or ~350 t (150–800) from LEO | **No.** Krypton supply unverified |
| bom-0-1 Prospecting | Data | NEA heliocentric range, rotation period, pole and dust properties for site sizing | No |
| bom-0-3 (later phases) | Mass | Station-produced Si and Al for replacement arrays. Not for initial supply (circular) | No |

---

## 4. Missing items or scope

1. **Delivery and robotic deployment** of ~800 t of arrays to five sites: $1–8B.
2. **Production-line non-recurring investment** for low-cost space blankets: $0.3–1B. The low and central cost cases depend on it.
3. **Station heat rejection:** 15–35 MW_th average, central ~28. Owned by bom-0-3 but driven by this line. Smaller than Claude's round-1 45–70 MW_th, because chemical storage in the products and high-temperature radiation are credited.
4. **PMAD / HV trunk and MRE pot-line interface.** I carry this inside hardware $/W; do not add it again.
5. **15-year spares and replacement:** ~0.5–1.5%/yr of nameplate plus a failure allowance, about 5–15 t/yr. Costed at $0.2–1.5B life-cycle.
6. **NEA site anchoring and dust mitigation** for surface arrays.
7. **A Phase-0 customer for ISPP H₂/O₂.** The tugs use Kr/iodine. Without a customer, ISPP array power is pure demonstration, and the night-operations storage option loses most of its value.
8. **Space-environment qualification** of a 1–3 kV trunk in the solar-wind plasma.
   - Solar-wind density is ~5–10 cm⁻³, versus ~10⁵–10⁶ cm⁻³ in LEO. The LEO-derived arcing concern is therefore largely relieved, but ESD during solar particle events is not.
   - Near NEA surfaces, dust charging adds a further risk.

---

## 5. Remaining disagreements and open questions

- **Throughput or power (a values question).**
  - Raise station power to ~60 MW BOL, or shrink Phase-0 output to a 5–10 MW pilot.
  - Reasonable engineers will differ depending on what Phase 0 is meant to prove.
- **Total nameplate.**
  - My 80 MW, Gemini's 70 MW and GPT/Claude's 100 MW all fall inside the slate-driven range.
  - None of them should be adopted before bom-0-3 publishes a slate.
- **Cell technology.**
  - Silicon offers supply and cost, but lower efficiency, more degradation and lower W/kg.
  - III-V offers performance but has no visible capacity.
  - I hold the supply-capacity screen as decisive. Others may prefer funding a III-V line.
- **Cost central value.** Mine is $70/W all-in; GPT's floor is $100/W. The disagreement is real and turns on whether a dedicated production line exists.
- **Night operations at NEAs.** It doubles throughput but needs 2× the array plus 2–6 MWh per site. Its value depends on the missing ISPP customer.
- **Site power for beneficiation.** If feed tonnage is high, site allocation could be 5× larger.
- **Krypton availability** for SEP self-delivery at the hundreds-of-tonnes scale.

---

## 6. Decision-quality critique

**Methods used:**
- The Composite Scaffold for all four decisions.
- ACH on D1, because I suspected the panel had anchored on "50 kt/yr is fixed."
- QOC on D2 and D3.
- GRADE Evidence-to-Decision on D4.
- Kepner-Tregoe must/want screening on D4.

**General observation on the reconciliation's frame.** Its "Agreed changes" table reports *unions* of ranges, such as station load 24–77 MW, as agreements. The models agree on direction only. The values are disagreement driven by an unstated common input, the slate. Reporting them as agreement hides the fact that a single upstream number dominates every downstream decision.

### D1: Station power allocation (F03). Blocking.

1. **Frame.**
   - Property decision on bom-0-3/bom-0-5, in the complicated Cynefin domain.
   - Partly reversible: arrays are modular. The station process architecture, however, is close to a one-way door.
2. **Criteria (before options).** Each must be stated with a range, so that swing weights can be applied:
   - Phase-0 objective: demonstration versus production.
   - Mass and cost.
   - Process risk (MRE maturity).
   - Schedule.
3. **Options.**
   - (a) Full slate at 50 kt/yr, ~60 MW BOL (20–170).
   - (b) Native-metal-only 50 kt/yr, ~5–10 MW.
   - (c) Pilot: native melt plus ~1 kt/yr MRE, ~5–10 MW.
   - (null) Keep 1–2.5 MW and accept ~15–40 kt/yr of melted Fe-Ni only.
   - The panel evaluated only (a), plus GPT's partial (b).
4. **Assessment (QOC summary).**

   | Option | Mass and cost | Process risk | Phase-0 objective |
   |---|---|---|---|
   | (a) | Highest, $4–5B in arrays | High | Serves production |
   | (c) | Low | Low | Serves demonstration |
   | (b) | Low | Low | Depends on undiscovered native-metal targets |

5. **Sensitivity and trade-off points.**
   - *Slate* is a **sensitivity point**: it moves power by about 8× (20 → 170 MW) and is a fact to obtain.
   - *Throughput versus mass/cost* is a **trade-off point**: more output means more arrays, mass and money, so it is a values question for the programme.
6. **Evidence certainty.**
   - Specific-energy floors: high certainty (thermodynamics).
   - Practical MRE kWh/kg: low (no pilot-scale data with asteroid feed).
7. **ACH and key assumption.**
   - Hypotheses tested:
     - H1: the 1–2.5 MW spec is right.
     - H2: a 50 kt mixed product slate.
     - H3: 50 kt of mostly native metal.
     - H4: "50 kt" is feed tonnage, not product.
   - The listing of Al and solar-grade Si disconfirms H1 and H3 as complete descriptions.
   - H4 is *not* disconfirmed by any evidence supplied, yet no model considered it.
   - **Falsification test:** the bom-0-3 author states product t/yr and whether O₂ is counted.
8. **Decision, warrant, accepted downside.**
   - *In the context of a Phase-0 refinery, facing a 10–60× power gap, we choose to allocate ~60 MW BOL conditional on slate, to make station production credible, accepting ~$4B and ~600 t of arrays.*
   - The warrant (that Phase 0 must produce at 50 kt/yr) is unstated in any document.
9. **Consequences.** Sets heat rejection, PMAD and delivery mass. It constrains Phase-1 array supply via station-made Si.

- **Weakest link: alternatives.** The throughput-reduction and pilot options were not generated.
- **Calibrated certainty:**
  - It is *very likely* (>90%) that any slate including reduced Al or Si needs more than 10 MW delivered. High confidence.
  - It is *about as likely as not* that the central 60 MW BOL is within ±30% of need. Low confidence.

### D2: Total capacity and site split (F04). Blocking.

1. **Frame.** Existence and property decision. Modular, so two-way at the margin.
2. **Criteria.**
   - Must: meet EOL delivered power per site at its worst heliocentric distance.
   - Wants: minimum mass, reserve for uncertainty.
3. **Options.**
   - 100 MW unallocated (status quo).
   - 100 MW allocated (Claude, GPT).
   - 70 MW (Gemini).
   - 80 MW derived from per-site requirements (this review).
   - Phased deployment: station blocks added as MRE throughput is proven.
4. **Assessment.**
   - All three fixed numbers sit inside the slate-driven range.
   - Phased deployment dominates on regret, because modularity makes it cheap.
5. **Sensitivity point:** design heliocentric distance for the NEA sites (1.3 versus 2 AU is a 2.4× change in per-site array).
6. **Evidence.**
   - Moderate on array physics.
   - Very low on NEA targets: none selected.
7. **Key assumption:** day-only operation at NEAs and no ISPP customer. **Falsification test:** the transport and propulsion architecture names a consumer of H₂/O₂.
8. **Decision.**
   - Specify by per-site EOL delivered power, not by nameplate.
   - The 80 MW total is an output of that specification, not an input.
9. **Consequences.** Unlocks delivery mass and site storage sizing. Requires bom-0-1 data.

- **Weakest link: frame.** The panel debated a single nameplate number. The decision is really four site requirements plus a station requirement.
- **Calibrated certainty:** *Likely* (66–90%) that the final Phase-0 total falls between 50 and 120 MW for any production-oriented slate. Low confidence.

### D3: Storage (F04). Not blocking; decidable now.

1. **Frame.** Property decision, reversible, in the clear Cynefin domain at the station.
2. **Criteria.** Protect MRE cells from freezing; mass; site throughput.
3. **Options.**
   - 500 MWh.
   - 200 MWh.
   - 25 MWh distributed (Gemini).
   - 1–6 MWh critical-only (GPT).
   - 5 MWh station plus 0.3 MWh per site (this review).
   - Night-operations sites at 2–6 MWh each.
4. **Assessment (QOC).**
   - 500 MWh weighs 3,100–5,000 t to bridge an eclipse that does not occur at L4/L5. It is dominated.
   - GPT's 0.09–0.87 MWh at the station omits MRE keep-alive, which is the one real station storage driver.
5. **Trade-off point:** NEA night operations. It raises throughput but also array area, mass and cost. This is a values question tied to whether any customer exists.
6. **Evidence.** High certainty on "no eclipse at L4/L5." Low certainty on MRE thermal hold time.
7. **Key assumption:** an MRE cell survives at least 1 h at 5–10% keep-alive power. **Falsification test:** a thermal model or pilot test of cell cooldown.
8. **Decision.** Station 5 MWh (2–10), sites 0.3 MWh, night operations as an option. *Accepting:* a site goes dormant every night.
9. **Consequences.** Frees ~3,000+ t of mass from the delivery plan.

- **Weakest link: information.** No MRE thermal-hold data.
- **Calibrated certainty:** *Virtually certain* (>99%) that 200–500 MWh at L4/L5 is unjustified. High confidence.

### D4: Cost basis and cell technology (F05). Blocking.

1. **Frame.** Executive and property decision. Effectively one-way once a production line is committed. In the complex Cynefin domain, because price depends on industrial response.
2. **Criteria (Kepner-Tregoe).**
   - **Must:** qualified supply of at least 25 MW/yr within the Phase-0 schedule.
   - **Wants:** delivered EOL $/W, W/kg, radiation tolerance.
3. **Options.**
   - Heritage III-V.
   - Flexible III-V with a new line.
   - Space silicon from the constellation supply chain.
   - Perovskite/Si tandem (immature).
   - Null option: defer the large arrays until a station-made-Si supply exists. This is circular for Phase 0, so it is rejected.
4. **Assessment (GRADE EtD).**

   | EtD element | Heritage III-V | Flexible III-V, new line | Space Si | Tandem |
   |---|---|---|---|---|
   | Benefits | Best efficiency and radiation tolerance | High efficiency, good W/kg | Lower efficiency and W/kg | Uncertain |
   | Harms | — | — | Higher degradation | Unqualified stability |
   | Certainty of evidence | Low on price | Low on price | Very low on price | Very low |
   | Resource use | $28–60B for the line | Moderate | $2–6B for the line | — |
   | **Feasibility (supply)** | Fails the must screen | Requires NRE | Plausible | Unqualified |
   | Acceptability | — | — | — | — |

   - Acceptability: an all-in line at or above the original ~$15.7B phase BOM is unacceptable without a programme re-baseline.
5. **Trade-off point:** efficiency and radiation hardness versus cost and supply. This is a values question about schedule risk versus mass.
6. **Evidence certainty.**
   - The round-1 cost spans are built on unpublished prices.
   - Gemini's "medium" confidence and the reconciliation's "≥$20/W across the panel" floor are not traceable to any citation.
7. **Key assumption:** a space-Si or thin-III-V line at roughly $15–60/W can be contracted. **Falsification test:** a supplier RFI for 25 MW/yr, with quoted $/W and qualification plan.
8. **Decision.**
   - Technology-neutral specification with a supply must-screen.
   - Central $70/W all-in.
   - *Accepting* low confidence and a wide range ($3–20B, 80% interval).
9. **Consequences.**
   - bom-0-5 alone would plausibly be 20–100% of the original phase budget.
   - That forces a programme-level re-baseline. GPT was right on this point.

- **Weakest link: information,** with a secondary weakness in **frame.** Supply capacity was never posed as a must criterion.
- **Calibrated certainty:**
  - *Very likely* (>90%) that the true all-in cost exceeds $20/W. Medium confidence.
  - *Unlikely* (10–33%) that III-V can supply 100 MW on a Phase-0 schedule without a new line. Low–medium confidence.

### D5: Delivery as a separate line (accounting)

- **Weakest link: reasoning.** Double-counting risk, which the reconciliation flagged but did not resolve.
- **My resolution:**
  - Hardware, PMAD and integration go in bom-0-5.
  - Delivery and deployment go on one new line.
  - SEP self-delivery is evaluated there.

```yaml
item: bom-0-5
model: Claude (Anthropic)
findings:
  - id: P0-F03
    verdict: agree
    summary: Practical specific energies (Fe-Ni melt 0.5-1.5, MRE Al/Si 15-30, solar-grade upgrade +40-100 kWh/kg) give ~45 MW EOL delivered (15-110) for a central slate, 10-60x the station's 1-2.5 MW, and bom-0-5 is the only power line able to supply it.
    proposed_change: bom-0-3 publishes a product slate in t/yr with kWh/kg; bom-0-5 allocates ~60 MW BOL (20-170) to the station, or the programme explicitly chooses a 5-10 MW pilot throughput instead.
  - id: P0-F04
    verdict: partly
    summary: Site split and storage criticisms hold (500 MWh is 3,100-5,000 t at pack level with no eclipse at L4/L5), but most of the 100 MW is absorbed by the station once F03 is applied, so the defect is missing allocation rather than oversizing.
    proposed_change: Specify per-site EOL delivered power (station ~45 MW; 4 NEA sites ~2.5 MW BOL each at a 1.5 AU design point), total ~80 MW BOL, with storage 5 MWh at the station and 0.3 MWh per site (night operations optional at 2-6 MWh).
  - id: P0-F05
    verdict: agree
    summary: $5/W is a terrestrial price; space arrays cost roughly $15-300/W in hardware plus ~$5-150/W for delivery and deployment of ~800 t, and III-V supply capacity likely cannot meet 100 MW on schedule.
    proposed_change: Re-baseline to ~$70/W all-in (25-450), with a technology-neutral cell specification gated by a supply must-screen and a separate delivery line.
revised_spec:
  - parameter: total BOL nameplate at 1 AU
    old: 100 MW
    new: 80
    range: [50, 115]
    unit: MW
    basis: calculation
    confidence: low
  - parameter: station EOL delivered power
    old: unspecified
    new: 45
    range: [15, 110]
    unit: MW
    basis: calculation
    confidence: low
  - parameter: per-NEA-site BOL array (day-only operation)
    old: unspecified
    new: 2.5
    range: [1.8, 5]
    unit: MW
    basis: calculation
    confidence: low
  - parameter: station storage
    old: 500 MWh
    new: 5
    range: [2, 10]
    unit: MWh
    basis: calculation
    confidence: medium
  - parameter: per-site storage (day-only operation)
    old: unspecified
    new: 0.3
    range: [0.1, 0.5]
    unit: MWh
    basis: calculation
    confidence: low
  - parameter: BOL cell efficiency (technology-neutral)
    old: 32-36%
    new: 22-32
    range: [20, 33]
    unit: percent
    basis: literature
    confidence: medium
  - parameter: 15-year EOL/BOL power ratio
    old: <1.5%/yr degradation
    new: 0.80
    range: [0.72, 0.88]
    unit: ratio
    basis: judgement
    confidence: low
  - parameter: system specific power
    old: unspecified
    new: 100
    range: [60, 150]
    unit: W/kg
    basis: literature
    confidence: low
  - parameter: array mass
    old: unspecified
    new: 800
    range: [350, 1900]
    unit: t
    basis: calculation
    confidence: low
  - parameter: primary distribution voltage
    old: 600 V DC
    new: 1-3 kV DC trunk
    range: [600, 5000]
    unit: V
    basis: calculation
    confidence: low
  - parameter: hardware cost
    old: 5
    new: 40
    range: [15, 300]
    unit: USD/W
    basis: judgement
    confidence: low
  - parameter: all-in delivered cost
    old: 5
    new: 70
    range: [25, 450]
    unit: USD/W
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-3
    flow: power
    value: 45 MW EOL delivered (15-110)
    in_bom: false
  - with: bom-0-3
    flow: other
    value: 15-35 MW_th average heat rejection (central ~28 MW_th) driven by array power
    in_bom: false
  - with: bom-0-2
    flow: power
    value: 0.4-1.0 MW peak aggregate across 4 sites (up to 6 MW if feed is 100-500 kt/yr)
    in_bom: false
  - with: bom-0-6
    flow: power
    value: 1.0 MW aggregate as specified (4-6 MW if ISPP is scaled)
    in_bom: false
  - with: bom-0-4
    flow: mass
    value: ~800 t of arrays (350-1,900) delivered to L4/L5 and 4 NEA sites
    in_bom: false
  - with: bom-0-4
    flow: propellant
    value: 20-60 t Kr/iodine from C3~0, or ~350 t from LEO, for SEP self-delivery
    in_bom: false
  - with: bom-0-1
    flow: data
    value: NEA heliocentric range, rotation period, pole and dust data for site sizing
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-5
    quantity: 80 MW BOL
    unit_cost_usd: [15000000, 300000000]
    rationale: Hardware including PMAD and integration at $15-300/W per MW (central $40/W), sized from per-site EOL requirements.
  - action: split
    item: bom-0-5
    quantity: station 60 MW; 4 NEA sites x 2.5 MW; reserve 10 MW
    unit_cost_usd: [15000000, 300000000]
    rationale: Sites are 0.4-2 AU apart with no power transfer, so each needs its own array and storage.
  - action: resize
    item: bom-0-5 energy storage
    quantity: 5 MWh station + 4 x 0.3 MWh
    unit_cost_usd: [6000000, 20000000]
    rationale: No eclipse at L4/L5; storage covers MRE keep-alive and NEA-night critical loads, saving 3,000+ t versus 500 MWh.
  - action: add
    item: Array delivery and robotic deployment
    quantity: ~800 t to 5 sites
    unit_cost_usd: [1000000000, 8000000000]
    rationale: Launch, SEP transfer and in-situ deployment are excluded from every current line.
  - action: add
    item: Space PV blanket production line NRE
    quantity: 1 line, >=25 MW/yr
    unit_cost_usd: [300000000, 1000000000]
    rationale: The low and central cost cases and the supply must-screen depend on dedicated capacity.
  - action: add
    item: Station heat rejection
    quantity: 15-35 MW_th
    unit_cost_usd: [300000000, 2000000000]
    rationale: Most array power ends as waste heat at the station and no line carries radiators.
  - action: add
    item: Array spares and 15-year replacement
    quantity: 5-15 t/yr
    unit_cost_usd: [200000000, 1500000000]
    rationale: Degradation and failures over 15 years are unfunded.
open_questions:
  - What is the bom-0-3 product slate in t/yr per product, and does "50 kt/yr" count feed, metal or O2?
  - Should Phase 0 be a 5-10 MW pilot refinery instead of a ~60 MW production station (values decision)?
  - Can any supplier commit to at least 25 MW/yr of qualified space PV, and at what $/W?
  - Which NEAs are targeted (aphelion, rotation, pole), and do operations continue through aphelion?
  - Who consumes ISPP H2/O2 in Phase 0, given the tugs use Kr/iodine?
  - How long can an MRE cell hold molten at 5-10% keep-alive power?
  - Is krypton available at the hundreds-of-tonnes scale for SEP self-delivery?
  - What feed tonnage do the mining sites process, and does beneficiation power exceed the 0.4-1.0 MW robot allocation?
```
