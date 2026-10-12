---
phase: phase-0
item: bom-0-6
round: 1
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T18:58:42.571Z
seconds: 170.995
---

# Re-assessment of bom-0-6 — In-Situ Propellant Production Systems

**Recommendation:** retain propellant-production capability in the Phase 0 design, but replace the four fully deployed mining/electrolysis plants with **Phase 0A volatile capture and reserved interfaces, followed by demand-gated Phase 0B production modules**. Do not baseline a lunar mine or EML1 depot for an otherwise asteroid-fed processing phase.

The principal problem is architectural, not merely numerical: the specified transport fleet consumes krypton or iodine, while this item produces water, oxygen and hydrogen. These are not interchangeable without changing propulsion hardware.

All production rates below are **net recovered or processed mass**, not asteroid water abundance. Costs are preliminary engineering allowances, not vendor quotations.

## 1. Findings

### P0-F11 — Propellant supply and absence of an ISPP customer

**Verdict: agree with the interface gap; partly disagree with the demand estimate.**

#### Tug demand cannot be determined from fleet count alone

For an electric-propulsion maneuver,

\[
m_p=m_f\left[\exp\left(\frac{\Delta v}{g_0 I_{sp}}\right)-1\right].
\]

At the finding’s assumed \(I_{sp}=1{,}800\ \mathrm{s}\),

\[
v_e=g_0I_{sp}=17.65\ \mathrm{km/s}.
\]

For an illustrative total maneuver requirement of \(3–6\ \mathrm{km/s}\),

\[
\frac{m_p}{m_f}=0.185–0.405.
\]

Thus **100 tonnes of propellant per trip implies a final transported mass of approximately 250–540 tonnes**, under a simplified constant-payload calculation. It is not a consequence of having 10–15 vehicles. Real outbound and inbound legs must be calculated separately because their payloads differ.

If every vehicle makes one such round trip annually:

\[
(10–15)\ \mathrm{vehicles}
\times100\ \mathrm{t/trip}
\times1\ \mathrm{trip/(vehicle\,yr)}
=1{,}000–1{,}500\ \mathrm{t/yr}.
\]

The finding’s \(10^2–10^3\ \mathrm{t/yr}\) range therefore implicitly assumes fewer trips, smaller loads or incomplete fleet utilization.

There is a more consequential phase-level check. If the station receives **25,000 t/yr**, and loaded inbound transport alone requires \(1.5–3\ \mathrm{km/s}\), then:

\[
m_{p,\mathrm{inbound}}
\ge25{,}000\ \mathrm{t/yr}
\left[\exp\left(\frac{1.5–3}{17.65}\right)-1\right]
\approx2{,}200–4{,}600\ \mathrm{t/yr}.
\]

This excludes tug dry mass, outbound propellant and reserves. It is only an illustrative scenario—not a validated trajectory—but it shows that **station throughput, source orbit and propulsion architecture must be closed together**.

Power also constrains this logistics model:

\[
P_{\mathrm{electric}}\approx
\frac{\dot m_pv_e^2}{2\eta}.
\]

For \(1{,}000\ \mathrm{t/yr}\), \(I_{sp}=1{,}800\ \mathrm{s}\), and thruster efficiency \(\eta=0.5–0.65\), fleet-average propulsion power is approximately **7.6–9.9 MW**. Tug solar arrays are therefore a major separate requirement; the station’s power allocation cannot silently cover them.

#### Supply implications

- **Iodine:** USGS reports world mine production excluding withheld US production at roughly **30,000–35,000 t/yr**. A purchase of 1,000–1,500 t/yr would represent approximately **3–5%** of that supply. It is not obviously impossible, but needs procurement, purification, storage and compatible thruster qualification.[1]
- **Krypton:** no sufficiently reliable public production inventory is supplied here. At approximately **1.1 ppm by volume in air**, krypton represents roughly \(3.2\times10^{-6}\) of dry-air mass. Even perfect recovery requires about **0.3 million tonnes of air per tonne of krypton**. A 1,000 t/yr requirement therefore corresponds to roughly **300 million tonnes/year of processed air**, before recovery losses. This is an industrial-capacity check, not a production forecast.
- Neither water electrolysis nor ordinary carbonaceous-asteroid processing supplies industrial quantities of krypton or iodine.

Iodine electric propulsion has flight demonstration heritage, but that does **not** establish the life, power and propellant throughput required by these cargo tugs.[2]

#### Proposed change

1. Assign **zero committed Phase 0A tug consumption** to ISPP output.
2. Stockpile purified water as process inventory; release it to propellant production only against a defined customer.
3. Move electrolysis and liquefaction deployment to Phase 0B.
4. Add a separate Kr/I procurement and logistics scope under bom-0-4.
5. Treat water-fed propulsion as a potential **vehicle redesign**, not an assumed interface.

---

### P0-F15 — Deliberations not incorporated

**Verdict: partly agree.**

The supplied ISPP consensus clearly conflicts with rq-0-14 and does not incorporate the later thermal architecture coherently. However, the exact claim that “eight of nine” conclusions were omitted from *all* documents cannot be verified from this excerpt. Several cited conclusions are not provided.

Moreover, writing conclusions back must not mean accepting their numerical claims without checking them.

| Conclusion | Change to this item | Engineering disposition |
|---|---|---|
| **rq-0-11: hybrid gravity zones** | Separate dusty/hot processing from clean fluid and cryogenic equipment; accept feedstock across a rotating/nonrotating interface if required. | No global ISPP spin requirement. No defensible mass or power increment without the station layout. |
| **rq-0-14: design-for, defer-until** | Phase 0A capture/storage and reserved connections; production in Phase 0B. | Adopt sequencing. Use ≥25 kt/yr as a program gate, supplemented by measured water yield, customer demand and delivered-power margin. |
| **rq-0-18: human-rated tugs** | Define human-access exclusion zones, vent directions, pressure-system isolation and transfer interlocks. | Human-rating cost belongs primarily to bom-0-4. No permanent ISPP crew requirement follows automatically. |
| **rq-0-28: cost methodology** | Separate development, recurring hardware, deployment, operations and delivered-product cost. | Adopt this structure; the actual conclusion is absent, so no numerical cost rule can be verified. |
| **rq-0-29: governance** | Assign authority over resource ownership, hazardous operations, stockpile allocation and interface changes. | Organizational cost belongs to bom-0-7; the conclusion’s details are not supplied. |
| **rq-0-30: boil-off** | Add sunshield provision, intercepted supports, active cooling interfaces and failure-mode analysis. | Adopt architecture, reject claimed thermal closure as established. |
| **rq-0-47: shield deployment** | Reserve modular shield construction and repair access; keep the main station nonrotating unless another requirement justifies rotation. | Adopt modularity provisionally. Do not automatically assign a 60 m, 10–13 t shield to a small pilot inventory. |
| **rq-0-48: MLI degradation** | Add thermal instrumentation, replaceable insulation and end-of-life cooling margin. | Adopt maintainability. Treat 2–3.5× degradation and LBMLI preference as hypotheses to validate, not demonstrated lifetime performance. |

#### Power arithmetic in rq-0-14 is wrong as stated

Terrestrial PEM systems typically consume approximately **50–60 kWh/kg of hydrogen**, equivalent to:

\[
\frac{50–60}{9}
=5.6–6.7\ \mathrm{kWh/kg\ water}.
\]

A preliminary allowance for purified-water electrolysis, auxiliaries and oxygen liquefaction—**excluding hydrogen liquefaction**—is **6–10 kWh/kg water**.[3]

At 500 kW and 80% operating availability:

\[
E=500\ \mathrm{kW}\times8{,}760\ \mathrm{h/yr}\times0.8
=3.50\ \mathrm{GWh/yr}.
\]

Therefore:

\[
\dot m_w=\frac{3.50\times10^6\ \mathrm{kWh/yr}}
{6–10\ \mathrm{kWh/kg}}
\approx350–580\ \mathrm{t/yr}.
\]

The stated **70–90 t/yr** would imply **39–50 kWh/kg water** at that availability. It could describe a particularly costly complete extraction chain, but not ordinary electrolysis alone.

Likewise, the phase BOM contains **100 MW of solar capacity**, while the deliberation assumes only **1–2.5 MW available at the station**. These can coexist only if they refer to different locations, deployment stages or allocations. They must not be treated as one consistent power budget.

#### Cryogenic conclusions also need correction

For cooling at \(T_c=20\ \mathrm{K}\) with rejection at \(T_h=300\ \mathrm{K}\):

\[
COP_{\mathrm{Carnot}}=\frac{20}{300-20}=0.071.
\]

A 15–40 W cold load needs at least **210–560 W electrical input**, even ideally. Assuming a preliminary **5–20% of Carnot performance**, the corresponding input is approximately **1–11 kW**, before the 80 K intercept load, redundancy and controls.

Thus **700 W per tank is not a conservative design allowance** across the stated heat-leak range. A complete depot might eventually fit within 10–20 kW, but the supplied calculations do not establish that.

Additional corrections:

- \(100\ \mathrm{t}\) hydrogen plus \(600\ \mathrm{t}\) oxygen is **6:1**, not stoichiometric. Electrolysis produces **8:1 oxygen-to-hydrogen mass**.
- A 100 t LH₂ inventory occupies approximately **1,400 m³**, equivalent to a spherical tank about **14 m diameter**, before insulation and structural allowances.
- Subcooling increases failure hold time but does **not inherently reduce steady-state environmental heat leak**. The asserted 190-day hold time needs an explicit inventory enthalpy and heat-leak calculation.
- Ground demonstrations and space-science cryocoolers do not establish operational heritage for a 100 t orbital LH₂ depot with repeated transfer.[4]

**Proposed change:** incorporate the architectural decisions, but replace the unsupported production, cooler-power and lifetime claims with qualified requirements and verification gates.

---

### P0-F16 — Consensus/BOM mismatch

**Verdict: agree on the mismatch; disagree that regenerating prose alone resolves it.**

Three different architectures are mixed together:

1. NEA excavation and extraction;
2. lunar south-pole production with EML1 delivery;
3. volatile recovery at an asteroid-fed L4/L5 processing station.

They have different excavation, transport, power and customer requirements. They cannot be represented by a single “consensus” unit price.

For this reassessment, the **phase-level BOM is the quantity and budget baseline**, but its contradictory technical description is superseded by the revised specification below. Adopt **station-integrated volatile recovery** as the provisional architecture because it uses the feedstock already required by bom-0-3.

- Retain **32 prospectors** and **15 transport vehicles** as current phase quantities pending their own reassessments.
- Treat lunar extraction and an EML1 depot as **separate options requiring additional BOM lines**, not defaults.
- Replace four mandatory flight plants with **up to four conditional Phase 0B modules**.
- Record requirements version, source-document revision and decision authority separately from model-generation metadata.

I cannot regenerate consensus from “current specs” that were not supplied. The metadata are demonstrably inconsistent, but a model-version label does not determine which engineering requirement is correct.

## 2. Revised specification

### Provisional design point and assumptions

- **Location:** the existing material-processing station; no new lunar node.
- **Orbit:** must be specified explicitly. Thermal numbers here assume a roughly **1 AU heliocentric environment**, not an unspecified Earth–Moon L4/L5 location.
- **Station solids throughput:** 25,000 t/yr at the Phase 0B gate.
- **Water-equivalent abundance:** 5–20 wt%, a scenario range—not a demonstrated production resource.
- **Net recovery:** 50–90%, pending experiments on representative material.
- **Operating availability:** 70–85%; 80% used in illustrative calculations.
- **Initial customer-backed conversion target:** 100–300 t/yr water across the fleet, with no LH₂ liquefaction baseline.

Bennu samples establish hydrated mineral feedstock, not readily excavatable ice or an industrial recovery rate. LCROSS measured substantial local lunar water, but its result is not an asteroid-resource estimate.[5][6]

### Changed parameters

| Parameter | Old → revised value/range | Basis | Confidence |
|---|---|---|---|
| Deployment | Four operational units → Phase 0A capture; **0–4 modules** in Phase 0B | Architecture judgement; rq-0-14 | Medium |
| Production location | Lunar-first/NEA mobile units → **station-integrated recovery**, pending orbit definition | Phase interface consistency | Medium |
| Product | LOX/LH₂ baseline → **purified water first; LOX plus managed H₂ when demanded** | Risk and customer compatibility | High |
| Extraction temperature | Universal 1,000°C → feedstock-specific staged processing; approximately **200–400 K for free-ice sublimation**, **600–1,100 K for hydrated-material trials** | Mineralogy and vacuum-process physics; final setpoints require tests | Medium |
| Excavation | Dual bucket wheel → **no dedicated station-side excavation**; enclosed crushing, feeding and vapor capture | Avoid duplication with bom-0-2/3 | Medium |
| Water conversion | Unreconciled 100–120 t/module/yr → **25–75 t/module/yr**, fleet 100–300 t/yr if all four deployed | Demand-limited pilot judgement | Low |
| Downstream electrical energy | 4–8 kWh/kg electrolysis; 13–22 full chain → **6–10 kWh/kg purified water**, excluding LH₂ liquefaction and raw-material heating | DOE data plus auxiliary allowance | Medium |
| Conversion power | 250 kWe/module → **20–120 kWe/module**, including preliminary operating margin | Production × specific energy ÷ available hours | Medium |
| Module dry mass | Conflicting 2.5–18 t → **2–8 t/module provisional**, excluding excavation, arrays and bulk tank farm | Early mass allowance, not heritage | Low |
| LH₂ liquefaction | Included/optional → **deferred** | No defined customer; unresolved flight-scale storage/transfer | High |
| Cryogenic parasitic power | “700 W per 100 t LH₂ tank” → **performance requirement derived from heat-leak model**, not a fixed tank allowance | Carnot bound and realistic efficiency | High |
| Cost confidence | Medium → **low**, until scope and delivery are defined | Missing logistics and customer closure | High |

For each 25–75 t/yr module, stoichiometry gives:

\[
\dot m_{O_2}=\frac89\dot m_w=22–67\ \mathrm{t/yr},
\qquad
\dot m_{H_2}=\frac19\dot m_w=2.8–8.3\ \mathrm{t/yr}.
\]

For the four-module pilot fleet: **89–267 t/yr oxygen** and **11–33 t/yr hydrogen**. These are production quantities, not guaranteed customer deliveries.

### Extraction throughput and heat

At the station gate:

\[
\dot m_{w,\mathrm{recovered}}
=25{,}000\ \mathrm{t/yr}\times(0.05–0.20)\times(0.50–0.90)
=625–4{,}500\ \mathrm{t/yr}.
\]

Average solids throughput is approximately **2.9 t/h**, or **3.6 t/h during operation at 80% availability**. The old 60–200 kg/h module values therefore cannot describe recovery from the whole station feed.

For \(c_p=0.7–1.0\ \mathrm{kJ/(kg\,K)}\) and heating by 500–800 K:

\[
q=c_p\Delta T\approx0.10–0.22\ \mathrm{kWh/kg\ solids}.
\]

An initial allowance of **0.15–0.45 kWh/kg solids**, including losses but before validated heat recovery, gives **0.5–1.6 MW thermal during operating hours** at 25 kt/yr. This is shared with material processing, not automatically an additional ISPP load. Dehydration enthalpy, vapor handling and actual thermal losses still require measurement.

### Cost correction

Retain **$2B as a conditional program envelope**, not “four identical units at $500M.”

A provisional allocation is:

- Development and qualification: **$300–600M**.
- Four production skids: **$100–250M each**, hardware only.
- Station integration and volatile-capture provision: **$100–300M combined**, booked once across bom-0-3 and bom-0-6.

Total: approximately **$0.8–1.9B before excluded deployment and major depot infrastructure**. These are judgement ranges; they do not demonstrate affordability.

The listed phase BOM totals **$15.71B**, not $10B. The latter is the station line alone.

Nor does the $200–500/kg production-cost claim close for this pilot:

\[
\frac{\$2B}{10\ \mathrm{yr}\times100–300\ \mathrm{t/yr}}
\approx\$670–2{,}000/\mathrm{kg},
\]

before financing, operating cost, transport and losses. Mature-scale economics may improve, but cannot be claimed from four pilot modules.

## 3. Interfaces

| Other item | Exchange and provisional value | Status |
|---|---|---|
| **bom-0-1 Prospecting** | Mineralogy, water speciation, estimated recoverable yield and uncertainty for each candidate source; resource estimate must support **625–4,500 t/yr recovered water** at the station gate | Scientific intent exists; production-grade resource certification omitted |
| **bom-0-2 Mining robots** | Feedstock excavation for the station’s **25,000 t/yr** solids stream; no additional ISPP mining fleet assumed | Avoid double-counting excavation |
| **bom-0-3 Processing station** | Shared feed: **25,000 t/yr**; recovered water **625–4,500 t/yr**; pilot conversion draw **100–300 t/yr**; shared heating **0.5–1.6 MWth** | Capture, purification and ownership boundaries omitted |
| **bom-0-4 Transport vehicles** | Guaranteed compatible ISPP propellant: **0 t/yr under current Kr/I configuration**; future chemical customer allocation conditional | Major unresolved interface |
| **bom-0-5 Solar arrays** | Approximately **0.1–0.5 MWe** allocated to pilot conversion including preliminary margin; extraction power depends on shared heating architecture | Capacity exists nominally; delivered allocation does not |
| **bom-0-7 Organization** | Resource rights, hazardous-operation authority, inventory allocation and procurement commitments | Responsibilities need explicit assignment |

If all recovered water is retained while only 100–300 t/yr is converted, inventory grows by approximately **325–4,400 t/yr**. Consequently, the specified “5–10 t capture/storage system” cannot imply unlimited water storage. Tank capacity and storage duration need separate requirements.

## 4. Missing items or scope

1. **Kr/I supply chain:** annual purchase contracts, purity requirements, launch packaging and replenishment transport.
2. **Tug power systems:** multi-megawatt fleet power may be required; solar-array and power-processing mass must appear in bom-0-4.
3. **Volatile purification:** separation of water from CO₂, sulfur-bearing species, organics and particulates; electrolyzer-compatible water quality.
4. **Bulk water storage and inventory policy:** hundreds to thousands of tonnes per year cannot accumulate without tanks, export or deliberate disposal.
5. **Hydrogen disposition:** consumption, export, finite compressed storage or controlled venting. “Defer LH₂” does not eliminate hydrogen handling.
6. **Cryogenic transfer equipment and demonstrations:** pumps, chilldown, phase separation, couplings, settling/PMDs, metering and loss accounting.
7. **Sunshield and tank-farm infrastructure:** reserve interfaces now; size hardware against actual inventory and geometry later.
8. **Power distribution and thermal rejection:** electrolysis, compressors and liquefaction create heat loads as well as electrical demand.
9. **Deployment and servicing:** launch, assembly, spares and robotic replacement capability are not included merely by pricing a production skid.
10. **Resource-validation campaign:** sample-based process testing and sustained extraction demonstration before economic claims.

A lunar mine, lander fleet and EML1 depot would be additional scope—not incidental accessories to this line.

## 5. Remaining disagreements and open questions

- **Station-side versus source-side extraction:** transporting hydrated rock can support the metals mission, but source-side extraction may reduce volatile logistics mass. This depends on material demand and trajectories.
- **Chemical propulsion versus Kr/I electric propulsion:** neither is universally superior. Propellant cost, power mass, trip time and payload throughput must be traded together.
- **Production gate:** 25 kt/yr is a sensible programmatic maturity gate, but not a physical prerequisite. A smaller plant could be justified earlier by a real customer.
- **Cryogenic risk:** sunshields make storage feasible; they do not establish autonomous industrial transfer or decades of maintainability.
- **Nuclear versus solar:** neither a 10 kWe-class reactor nor megawatt-scale scaling should be treated as flight heritage. KRUSTY was a ground demonstration.[7]
- **L4/L5 definition:** Sun–Earth and Earth–Moon locations imply materially different radiation, communication and logistics environments.
- **MRE:** oxygen-from-regolith remains useful research, but it is not water extraction and should have a separate development scope.
- **Autonomy:** the need is credible, but numerical autonomy “levels” are not universal requirements. Specify unattended duration, fault containment and demonstrated recovery instead.

### Evidence references

1. **USGS, *Mineral Commodity Summaries 2025*, “Iodine.”**
2. Rafalskyi et al., **“In-orbit demonstration of an iodine electric propulsion system,” Nature 599, 411–415 (2021)**.
3. **US DOE, Technical Targets for Proton Exchange Membrane Electrolysis**—system energy consumption is stated per kilogram of hydrogen.
4. **NASA Cryogenic Fluid Management project**—ground testing and development status; not operational heritage for a large orbital LH₂ depot.
5. Lauretta et al., **“Asteroid (101955) Bennu in the laboratory: Properties of the sample collected by OSIRIS-REx,” Meteoritics & Planetary Science (2024)**.
6. Colaprete et al., **“Detection of Water in the LCROSS Ejecta Plume,” Science 330, 463–468 (2010)**.
7. **NASA/DOE Kilopower Reactor Using Stirling Technology—KRUSTY test reports, 2018.**

```yaml
item: bom-0-6
model: GPT-5.2
findings:
  - id: P0-F11
    verdict: partly
    summary: The propellant interface gap is real, but annual tug demand cannot be established from fleet count and an unsupported per-trip allowance.
    proposed_change: Defer conversion hardware to customer-gated Phase 0B and add a separate Kr/I supply and trajectory-based demand model.
  - id: P0-F15
    verdict: partly
    summary: The supplied specification omits relevant decisions, but several deliberation numbers fail physics checks and the full eight-of-nine claim cannot be verified.
    proposed_change: Incorporate staged deployment and maintainable thermal architecture while replacing unsupported production and cooling estimates.
  - id: P0-F16
    verdict: agree
    summary: The BOM and consensus describe incompatible sites, products and quantities.
    proposed_change: Baseline station-integrated volatile recovery with up to four conditional modules and separate lunar or depot options.
revised_spec:
  - parameter: Phase 0A production modules
    old: 4 operational units
    new: 0 operational units with reserved interfaces
    range: [0, 0]
    unit: modules
    basis: judgement
    confidence: medium
  - parameter: Conditional Phase 0B modules
    old: 4 mandatory units
    new: Up to 4 customer-gated modules
    range: [0, 4]
    unit: modules
    basis: judgement
    confidence: medium
  - parameter: Fleet pilot water conversion
    old: Unreconciled module production figures
    new: 100-300 when four modules are deployed
    range: [100, 300]
    unit: t/yr
    basis: judgement
    confidence: low
  - parameter: Downstream electrical specific energy
    old: 4-8 for electrolysis and 13-22 for the full chain
    new: 6-10 excluding raw-material heating and hydrogen liquefaction
    range: [6, 10]
    unit: kWh/kg purified water
    basis: literature
    confidence: medium
  - parameter: Production module electrical rating
    old: 250
    new: 20-120 including preliminary margin
    range: [20, 120]
    unit: kWe
    basis: calculation
    confidence: medium
  - parameter: Recovered water at station gate
    old: unspecified
    new: 625-4500 conditional on abundance and recovery assumptions
    range: [625, 4500]
    unit: t/yr
    basis: calculation
    confidence: low
  - parameter: Shared solids heating duty
    old: unspecified
    new: 0.5-1.6 during operating hours before validated heat recovery
    range: [0.5, 1.6]
    unit: MWth
    basis: calculation
    confidence: low
  - parameter: Production skid dry mass
    old: Conflicting 2.5-18
    new: 2-8 excluding arrays and bulk storage
    range: [2, 8]
    unit: t/module
    basis: judgement
    confidence: low
  - parameter: Initial program cost allowance
    old: 2 billion for four identical units
    new: 0.8-1.9 billion before excluded deployment and major depot infrastructure
    range: [800000000, 1900000000]
    unit: USD
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-1
    flow: data
    value: Resource characterization supporting a 25000 t/yr solids feed
    in_bom: false
  - with: bom-0-2
    flow: mass
    value: 25000 t/yr shared station feedstock
    in_bom: true
  - with: bom-0-3
    flow: mass
    value: 625-4500 t/yr recovered water at the deployment gate
    in_bom: false
  - with: bom-0-3
    flow: power
    value: 0.5-1.6 MWth shared operating heating duty
    in_bom: false
  - with: bom-0-4
    flow: propellant
    value: 0 t/yr guaranteed compatible ISPP output under current Kr/I propulsion
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0.1-0.5 MWe pilot conversion allocation
    in_bom: false
  - with: bom-0-7
    flow: data
    value: One controlled resource-allocation and hazardous-operations authority
    in_bom: false
bom_delta:
  - action: split
    item: bom-0-6
    quantity: One development and qualification program
    unit_cost_usd: [300000000, 600000000]
    rationale: Separate nonrecurring development from recurring flight hardware.
  - action: split
    item: bom-0-6
    quantity: Zero to four conditional Phase 0B production skids
    unit_cost_usd: [100000000, 250000000]
    rationale: Deploy only after resource, power and customer requirements close.
  - action: add
    item: Phase 0A volatile capture and reserved ISPP interfaces
    quantity: One station installation booked once across bom-0-3 and bom-0-6
    unit_cost_usd: [100000000, 300000000]
    rationale: Capture feedstock and prevent later integration redesign without prematurely deploying cryogenic production.
  - action: add
    item: Kr/I procurement and replenishment scope
    quantity: One supply-chain program with mission-dependent annual purchases
    unit_cost_usd: [null, null]
    rationale: Existing ISPP chemistry does not supply the specified tug propellants and costs remain unestimated.
  - action: add
    item: Bulk water storage and hydrogen disposition
    quantity: One inventory-sized installation
    unit_cost_usd: [null, null]
    rationale: Recovered water and electrolysis hydrogen require explicit storage or export capacity and costs remain unestimated.
  - action: add
    item: Cryogenic storage and transfer qualification
    quantity: One demand-gated development scope
    unit_cost_usd: [null, null]
    rationale: Large autonomous depot operations lack relevant flight heritage and must be separately sized and costed.
open_questions:
  - What trajectories, payload masses and annual utilization determine actual tug propellant demand?
  - Is the station at Sun-Earth or Earth-Moon L4/L5?
  - Which customer consumes water, oxygen or hydrogen during Phase 0B?
  - What recoverable water yield and process temperature are demonstrated on representative feedstock?
  - How much of the nominal 100 MW reaches the station at each deployment stage?
  - Should water be recovered at the asteroid or after delivery to the station?
  - What inventory size justifies cryogenic storage instead of water storage and deferred conversion?
  - Can iodine or krypton propulsion meet required lifetime and throughput at cargo-tug scale?
```
