---
bomId: "bom-0-6"
itemName: "Water Pilot (C-type target only)"
itemSlug: "ispp-systems"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: bom-0-6 Water Pilot  
## Conditional C-type asteroid demonstration, Phase 0B

**Recommendation:** Develop and qualify a **single, electrically heated, batch-retort water-extraction pilot at the selected C-type NEA**, then fly it only after the target, technology, demand, economics and licensing gates are satisfied.

The pilot should demonstrate **10–30 tonnes/year of recoverable, purified water at the asteroid**, with a **20 t/year reference operating point**. It should not be sized around hypothetical tug consumption.

The principal deliverable is a validated extraction capability: measured yield, energy consumption, reliability, contamination control and product quality. Water production is a secondary deliverable until a customer and delivery route are contracted.

**Explicit exclusions:** No production electrolysis, LOX/LH₂ production, hydrogen liquefaction, cryogenic depot, EML1 infrastructure, ore shipment to a central processing station, or crew visits.

All figures below are **proposed engineering requirements or estimating assumptions**, not approved programme values. Costs are in **constant 2026 USD**.

---

## 1. Recommended approach and design philosophy

### 1.1 Why this architecture

C-type classification is a screening criterion, not a resource guarantee. Much of the potentially recoverable water may be chemically bound in hydrated minerals rather than present as accessible ice. Extraction therefore depends on:

- Mineralogy and alteration history.
- Water-release temperature and residence time.
- Particle size and thermal conductivity.
- Sulfur, organics and other evolved gases.
- Actual recovery and purification efficiency.
- Feed-handling behaviour in microgravity.

The appropriate first flight system is consequently a **flexible experimental process plant**, not a miniature version of an assumed future propellant factory.

I recommend five governing principles:

1. **Heat material where it is mined.** Ship qualified product only if a customer justifies shipment.
2. **Use mechanical confinement rather than gravity.** Every material-transfer step must work with negligible weight.
3. **Keep the first process electrically simple.** Resistance-heated retorts are easier to meter, control and qualify than a first-flight microwave, solar-furnace or chemical-reduction system.
4. **Stop production when storage or demand is exhausted.** Do not manufacture a disposal problem.
5. **Do not force a propulsion decision to create a water customer.** Iodine remains the costing reference and argon the alternate under D-05; water EP remains a separate study unless subsequently authorized.

### 1.2 Scope boundary

The pilot owns its **metered feed inlet through its qualified water outlet and sealed residue outlet**.

| Function | Scope owner |
|---|---|
| Resource survey, target selection and sampling | bom-0-1 |
| Excavation and delivery to pilot feed interface | bom-0-2 |
| Shared site structures and other primary processing | bom-0-3 |
| Pilot retorts, dedicated vapour cleanup, condensation and product qualification | **bom-0-6** |
| Shared electrical generation and site storage | bom-0-5 |
| Pilot-specific thermal loops and radiators | **bom-0-6**, unless formally transferred to a shared thermal system |
| Launch and delivery | bom-0-8 |
| External communications and ground infrastructure | bom-0-9 |
| Mission operations | bom-0-10 |
| Development and qualification work | bom-0-11 |
| Relevant-environment pathfinder flight | bom-0-12 |
| Programme-wide debris/contamination analysis and licensing support | bom-0-15 |
| Tug propellant procurement and logistics | bom-0-16 |

Shared capture equipment must be assigned once. This proposal assumes the pilot has a **dedicated, instrumented capture train**, because extraction performance cannot be validated reliably through an uncharacterized shared off-gas system.

---

## 2. Configuration-controlled reference design

### 2.1 Principal specifications

| Parameter | Proposed reference | Design/qualification range or limitation |
|---|---:|---|
| Flight quantity | 1 pilot | No second flight unit committed |
| Site | Selected C-type NEA | Resource confirmation required |
| Water output | 20 t/year | 10–30 t/year qualified operating envelope |
| Product location | Pilot outlet at asteroid | Not delivered to SEL1 |
| Annual productive operation | 6,000 hours | Approximately 68% calendar utilization |
| Average feed during productive operation | 78 kg/hour | Approximately 40–150 kg/hour, feed-dependent |
| Feed throughput | 468 t/year | Reference mass balance below |
| Retorts | 2 independently isolatable batch vessels | Approximately 100–200 kg feed/batch each |
| Routine process temperatures | Feed-specific staged heating | Approximately 150–750°C |
| Maximum qualification temperature | 800°C | Not a universal operating setpoint |
| Average electrical load while producing | 30–45 kWe | Includes auxiliaries; strongly feed-dependent |
| Site electrical allocation | 75 kWe continuous available | Approximately 100 kWe short-duration peak |
| Standby/survival load | 1–3 kWe | Environment and inventory dependent |
| Dry installed mass | 5–8 tonnes | Includes pilot radiator and local tanks |
| Reference dry mass | 6.2 tonnes | Before unallocated mass growth |
| Local water capacity | 1–3 tonnes | Reference: 2 tonnes |
| Operating life | 3 years after commissioning | Replaceable wear components |
| Normal site interface | 1–3 kV DC | Local isolated power conversion |
| Pilot ride-through battery | 5–15 kWh | Counted within the site storage total |
| Internal process pressure | Operating-mode dependent | Vacuum extraction through low-pressure vapour handling |
| Product storage | Approximately 280–300 K | Freeze protection and pressure management required |

The 10–30 t/year range is **not guaranteed for every C-type feedstock**. The qualified operating map must specify the feed properties under which each output is achievable.

### 2.2 Physical arrangement

A practical packaging concept is:

- **Process skid:** approximately **3.0 × 2.2 × 2.2 m**.
- **Water storage and transfer skid:** approximately **2.5 × 2.0 × 2.0 m**.
- **Radiators:** approximately **80–180 m² effective emitting area**, deployed outside the excavation and hot-residue exclusion zones.
- Flexible or articulated utility connections to accommodate site layout and thermal movement.

These are packaging envelopes, not final launch fairing dimensions.

The plant attaches to a shared anchored foundation. It is not dependent on its own weight for stability. Anchor reactions, thermal strain and batch-transfer forces must be included in the site structural model.

---

## 3. Process architecture

```text
                 SHARED SITE SYSTEMS
        Mining robot                Site power
             |                     1–3 kV DC
             v                         |
   [Sealed feed canister]              v
             |                [Isolation / conversion]
============= bom-0-6 boundary ==========================
             |
   [Weigh / assay / feed lock]
             |
       +-----+-----+
       |           |
 [Retort A]   [Retort B]
       |           |
       +-----+-----+----------------------+
             |                           |
       Hot vapour                  Solid residue
             |                           |
 [Knock-out / dust filtration]    [Closed cooling bin]
             |                           |
 [Staged condenser / cold trap]   [Sealed return canister]
             |
 [Water cleanup and polishing]
             |
 [Quality sample / quarantine]
             |
     +-------+--------+
     |                |
 [Accepted water] [Off-spec hold]
     |
 [1–3 t local storage]
     |
 [Metered transfer port]
     |
 Contracted local use or separately approved export

Non-condensables:
[Analysis] -> [sorbent / contained collection]
             -> licensed disposition, if required
```

### 3.1 Feed acceptance and preparation

Feed arrives in sealed, positively restrained canisters from bom-0-2.

The pilot should not include a separate excavation system. It should include limited screening or deagglomeration needed for its own process:

- Nominal accepted particle size: **1–20 mm**.
- Oversize rejection or controlled crushing only where justified by tests.
- Fine-particle handling without intentional free release.
- Batch mass measurement through calibrated inertial, mechanical or other microgravity-compatible methods.

A terrestrial load cell cannot simply be assumed to measure batch mass at the asteroid.

Each batch receives a feed identifier linking:

- Excavation location.
- Available mineralogical observations.
- Particle-size distribution.
- Initial temperature.
- Batch mass.
- Thermal history and product assay.

### 3.2 Retorts and thermal cycle

Use **two modular sealed retorts**, alternately heating and cooling. This provides:

- Independent experimentation.
- Reduced peak load through staggered heating.
- Continued limited operation after one vessel failure.
- Better maintenance isolation than a single continuous kiln.

A representative cycle is:

1. Load and close.
2. Leak check and establish extraction pressure.
3. Low-temperature desorption stage.
4. Higher-temperature dehydration stage, if justified.
5. Controlled vapour removal.
6. Closed cooling and optional heat recovery.
7. Discharge into a sealed residue container.

A useful starting envelope is **100–200 kg per retort with a roughly 3–5 hour total cycle**, including loading and cooling. Actual scheduling must be demonstrated: the reference throughput is about **78 kg/hour across both retorts**.

**Do not impose one release temperature on all feedstocks.** The 150–800°C envelope from the reassessment is a qualification space. The commanded cycle should maximize recoverable product value subject to energy, contamination and component-life constraints.

### 3.3 Vapour capture and purification

The capture train must handle water vapour mixed with dust and potentially:

- CO₂ and CO.
- Sulfur-bearing species.
- Ammonia or other nitrogen-bearing species.
- Organic compounds.
- Entrained soluble salts and aerosols.

Recommended sequence:

1. Hot particulate knock-out.
2. Replaceable high-temperature filtration.
3. Staged condensation/cold trapping.
4. Non-condensable gas analysis and containment.
5. Water polishing using qualified sorbents, filtration and, if necessary, batch distillation.
6. Product quarantine until assay passes.

Avoid assuming that a terrestrial activated-carbon cartridge alone will remove the full contaminant suite. Sulfur loading, volatile organics and cartridge breakthrough must be measured.

Electrolysis-grade purification is **not a baseline requirement** unless a future customer specifies it.

---

## 4. Performance basis and mass balance

### 4.1 Reference assumptions

For preliminary sizing, assume:

- Feed water-equivalent content released within the qualified cycle: **6 wt%**.
- Extraction recovery: **75%** of that releasable content.
- Capture and purification recovery: **95%**.
- Productive operating time: **6,000 hours/year**.

These are **design assumptions**, not measured properties of the selected target.

The net water yield is:

\[
y_{\rm net}=0.06 \times 0.75 \times 0.95 = 0.04275
\]

Thus:

\[
M_{\rm feed}=\frac{20{,}000}{0.04275}
\approx468{,}000\ {\rm kg/year}
\]

and:

\[
\dot m_{\rm feed}\approx78\ {\rm kg/hour}
\]

### 4.2 Reference annual water balance

| Flow | Approximate quantity |
|---|---:|
| Feed processed | 468 t |
| Releasable water-equivalent in feed | 28.1 t |
| Water extracted into capture train | 21.1 t |
| Accepted water product | 20.0 t |
| Water not extracted | 7.0 t |
| Water retained in off-spec streams, traps or process hold-up | 1.1 t |

The last row is **not an authorized environmental release allowance**. Recoverable material remains in contained process streams.

Non-water gases and residue composition require a separate measured elemental balance.

### 4.3 Sensitivity to actual net yield

At the same 468 t/year feed throughput:

| Net accepted-water yield | Annual product |
|---:|---:|
| 1% | 4.7 t |
| 2% | 9.4 t |
| 4.3% | 20 t |
| 6% | 28 t |

This is why spectral C-type classification alone is inadequate for procurement approval.

A low-yield target may still justify a small scientific experiment, but it does **not** automatically justify this 0B pilot configuration.

---

## 5. Power and thermal design

### 5.1 Process energy

Use the reassessment’s **0.15–0.45 kWhₜₕ/kg feed** as an initial qualification envelope. It must be verified for the actual cycle and clearly defined measurement boundary.

At 468 t/year:

- Annual process heat: **70–211 MWhₜₕ**.
- Average thermal demand during productive operation: **12–35 kWₜₕ**.

At the reference **0.25 kWhₜₕ/kg**, feed heating consumes approximately:

\[
468{,}000 \times 0.25 = 117\ {\rm MWh/year}
\]

or **19.5 kWₜₕ** during productive operation.

Including heater conversion losses and approximately **8–15 kWe** for pumps, condensation, controls and purification yields a reference production load of roughly **30–40 kWe**.

The requested **75 kWe continuous allocation and 100 kWe short peak** provide operating flexibility, startup capacity and margin. They do not imply continuous consumption at those levels.

### 5.2 Heat rejection

Provide a dedicated preliminary radiator allocation of:

- **40–80 kW** normal rejection capability.
- **80–180 m² effective emitting area**, depending on operating temperature, orientation and absorbed environmental heat.
- Reference point: approximately **120 m² at 450 W/m² net rejection**, or **54 kW**.

“Effective emitting area” means the area used in the thermal model, with any two-sided emission treated explicitly.

Use:

- A warm coolant loop for condensers, electronics and product-temperature management.
- Insulated hot retorts with separately characterized radiative losses.
- Thermal isolation from arrays, water tanks and dust-sensitive equipment.

Not all heater power immediately reaches the coolant loop; some energy leaves temporarily in hot residue. Nevertheless, the complete site energy balance must account for it. **Smelter or retort waste heat is not a cold sink.**

### 5.3 Storage and outages

This pilot does not justify a large battery farm.

A **5–15 kWh local UPS allocation** supports:

- Controller continuity.
- Valve actuation.
- Essential sensing.
- Orderly isolation.
- Limited transfer and freeze protection.

It does not maintain full extraction during an extended outage. The thermal design must make a loss-of-power batch safe through passive cooling and containment.

---

## 6. Product specification, storage and disposition

### 6.1 Provisional water specification

The following is a proposed **utility-water acceptance class**, pending signed customer requirements:

| Attribute | Preliminary requirement |
|---|---|
| Water mass fraction | ≥99.5% |
| Suspended solids | ≤10 mg/L |
| Total nonvolatile residue | ≤500 mg/L |
| Organic and sulfur species | Quantified by species; customer-specific limits |
| Free gas | Controlled to receiving-system requirement |
| Delivery temperature | 280–300 K nominal |
| Delivery pressure | Receiver-specific; low-pressure transfer preferred |
| Traceability | Batch certificate and complete process history |

These limits do **not** establish suitability for drinking, electrolysis, a particular thruster or precision thermal equipment.

### 6.2 Storage

Provide **1–3 tonnes capacity**, nominally 2 tonnes, using approximately **2–4 modular tanks** with capillary management, diaphragms or bladders selected by compatibility testing.

At 20 t/year and 6,000 productive hours, production averages **3.3 kg/hour**. A 2-tonne inventory therefore fills in about **600 productive hours**.

Accordingly:

- Extraction pauses at the high-inventory threshold.
- Off-spec product remains segregated.
- There is no routine disposal vent.
- Export requires a separate approved container, trajectory, tug allocation and receiving interface.

The pilot specification guarantees a qualified site outlet, **not delivery to SEL1**. SEL1 remains the interim receiving-node reference only if an export case is approved jointly with Phase 1.

---

## 7. Subsystems and mass allocation

| Subsystem | Reference dry mass |
|---|---:|
| Feed interface, metering and transfer locks | 650 kg |
| Two retorts, heaters, insulation and discharge hardware | 1,300 kg |
| Vapour transport, filters and condensers | 700 kg |
| Cleanup, assay and quarantine equipment | 450 kg |
| Empty water tanks and transfer equipment | 450 kg |
| Coolant system and deployed radiators | 1,100 kg |
| Structure, restraints and service interfaces | 650 kg |
| Power electronics, avionics and local battery | 600 kg |
| Instrumentation, harness and local shielding | 300 kg |
| **Reference dry mass** | **6,200 kg** |

A **5–8 t design range** is appropriate at the current maturity. The upper value is not a statistical confidence limit. Launch commitment requires a formal mass-growth allowance and a delivered-mass estimate that includes deployment hardware and any commissioning consumables.

---

## 8. Autonomy, controls and communications

### 8.1 Control architecture

Use three layers:

1. **Independent protection layer:** overtemperature, overpressure, electrical faults and critical valve interlocks.
2. **Deterministic process control:** heater ramps, pressure control, condenser operation and transfer sequences.
3. **Supervisory autonomy:** batch scheduling, anomaly diagnosis and resource allocation.

Safety must not depend on an unconstrained learning algorithm.

### 8.2 Required autonomous behaviours

The pilot shall:

- Complete or safely abort a batch without Earth intervention.
- Reject a batch with uncertain closure or contamination status.
- Detect filter blockage and declining condenser performance.
- Isolate a failed retort.
- Stop on storage-full, insufficient thermal margin or uncertain product quality.
- Preserve diagnostic data across resets.
- Remain in safe storage mode through a **30-day communications outage**, subject to the site power survival allocation.

Thirty-day safe-mode survival is not a requirement for 30 days of unattended full production.

### 8.3 Telemetry

Preliminary allocation:

- **10–50 kbps average** housekeeping and summarized process telemetry.
- **0.1–1 Mbps bursts** for commissioning, imagery and anomaly review.
- **1–4 TB local storage** for spectra, images, raw sensor data and event logs.

These are pilot-level requirements. bom-0-9 owns the external link budget, antenna system and contracted ground capacity.

### 8.4 Metrology

Measurements should resolve:

- Accepted water yield to approximately **±5% relative** per campaign.
- Electrical energy per accepted kilogram to approximately **±5%**.
- Feed mass, retained water and process hold-up sufficiently well to close campaign water balances to **±10% initially**, improving with calibration.

A pilot without credible mass-balance closure is not a successful resource-processing demonstration.

---

## 9. Manufacturing and qualification

### 9.1 Hardware choices

Recommended initial materials and processes:

- Welded stainless steel or nickel-alloy hot process boundaries, selected after corrosion testing.
- Replaceable retort liners where abrasion or sulfur attack is significant.
- Ceramic insulation and shielded resistance heaters.
- Replaceable vapour filters and sorbent cartridges.
- Mechanically simple, positively driven feed mechanisms.
- Thermally isolated seals, with metallic seals where temperatures require them.

Do not mandate “all-metal contacts” everywhere. Polymer seals and diaphragms may be appropriate in cool water-handling zones after radiation, contamination and life qualification.

### 9.2 Design for robotic servicing

Provide standardized:

- Grapple fixtures.
- Captive fasteners.
- Electrical and data disconnects.
- Double-isolated fluid connections.
- Replaceable filter and sorbent cartridges.
- Accessible heater and valve modules.

Remote replacement is an enabling maintainability feature, not an assumed mature capability. The minimum mission must survive without an intricate repair operation.

### 9.3 Test feedstocks

Qualification should combine:

- Representative CI/CM-like simulants.
- Controlled mineral mixtures.
- Abrasive and low-conductivity bounding cases.
- Sulfur- and organic-rich challenge mixtures.
- Scientifically available asteroid sample measurements for validation of assumptions.

Precious returned material need not supply bulk endurance tests. It should anchor simulant fidelity and release chemistry.

---

## 10. Development roadmap and TRL closure

T13 is currently assessed at **TRL 2–4**, with **AD² 5–6**. Its difficulty is integrated extraction and handling, not merely heating a wet sample.

### 10.1 Phase 0A: evidence and qualification

No bom-0-6 production pilot flies in 0A.

**Stage A — Resource/process characterization**

- Release curves versus temperature and time.
- Particle-size and permeability effects.
- Contaminant identification.
- Water-origin and mass-balance methods.
- Preliminary corrosion and seal testing.

**Exit:** TRL 4 integrated laboratory evidence for the proposed process.

**Stage B — Engineering breadboard**

- Representative retort and capture components.
- Vacuum operation and realistic thermal interfaces.
- Automated loading, isolation and discharge.
- Repeated dirty-feed cycles.
- Loss-of-power and blocked-flow tests.

**Exit:** TRL 5 evidence with documented remaining environmental gaps.

**Stage C — Relevant-environment pathfinder**

Conducted under **bom-0-12**, not purchased again here:

- Representative confinement and feed transfer in microgravity.
- Dust/vapour separation.
- Condensation and liquid management.
- Representative thermal-vacuum conditions.
- Sufficient integrated operation to validate scaling.

A short reduced-gravity experiment alone does not establish full-system TRL 6. Nor does an orbital water boiler establish asteroid-regolith handling maturity.

### 10.2 KDP-0B technology requirement

Before irreversible 0B production commitment, every project-ending technology must reach **TRL 6 in a relevant environment, with no waiver**.

This includes, as applicable:

- Confined feed transfer.
- Heated extraction.
- Dirty-vapour capture.
- Non-gravity phase management.
- Residue containment.
- Integrated autonomous fault response.

The relevant-environment demonstration must therefore occur through the 0A qualification/pathfinder programme **before** the 0B pilot is authorized. The 0B pilot then demonstrates useful-scale operation on the actual resource; it cannot be the evidence retrospectively used to pass its own commitment gate.

### 10.3 Indicative schedule

From authorization of the detailed 0A work:

- **Year 1:** feed characterization and process selection.
- **Years 1–3:** breadboard, materials and endurance work.
- **Years 3–5:** pathfinder qualification and flight evidence.
- **After gate approval:** approximately **2–3 years** for flight build, qualification and readiness for delivery.

These are planning durations, not promised calendar dates. Target accessibility and pathfinder results can dominate the schedule.

---

## 11. Activation gates

### Target gate

Require more than a C-type taxonomy:

- Measured or adequately constrained hydrated mineral content.
- Representative release curves.
- Accessible feed inventory and excavation feasibility.
- Contaminant loading within the qualified envelope.
- A conservative production case consistent with the selected pilot size.

I would use **approximately 2% net accepted-water yield** as a preliminary screening threshold for the reference feed-handling capacity. It is an economic/design screen, not a universal scientific cutoff.

### Demand gate

Require a signed specification identifying:

- Quantity.
- Purity.
- Location.
- Delivery date.
- Transfer conditions.
- Responsibility for storage and transport.

A funded, bounded research campaign can justify a capability pilot, but it must be described as such. It must not be represented as contracted commodity demand.

### Economics gate

Compare:

- This pilot.
- A smaller capture-only experiment.
- Deferral.
- Earth-supplied water or material for the relevant mission.

No avoided tug-propellant expenditure is credited without an approved propulsion and logistics case.

### Licence gate

Require accepted:

- Resource-activity authorization.
- Contamination and debris model.
- Gas and residue disposition.
- Fault and end-of-life plan.
- Any applicable planetary-protection determination.

### Technology gate

All project-ending technologies at TRL 6, without waiver, as required by D-02.

---

## 12. Cost estimate and accounting

### 12.1 Phase 0A attributable work

These costs are **water-pilot-related work packages**, booked under the existing NRE and pathfinder lines—not additional duplicate bom-0-6 hardware procurement.

| Work package | Range |
|---|---:|
| Feedstock characterization and process modelling | $5–12M |
| Breadboards, materials, seals and endurance tests | $15–30M |
| Controls, metrology and integrated qualification | $10–23M |
| Water-specific contribution to shared pathfinder | $15–35M |
| **0A attributable total** | **$45–100M** |

The pathfinder allocation assumes shared spacecraft and mission infrastructure. A dedicated standalone flight could exceed this allowance and requires an explicit programme decision.

### 12.2 Conditional Phase 0B pilot

| Hardware/integration element | Range |
|---|---:|
| Retorts, heaters and feed equipment | $25–45M |
| Capture, purification and assay | $20–40M |
| Product tanks and transfer equipment | $12–25M |
| Thermal control and radiators | $10–20M |
| Avionics, power conversion and software | $12–25M |
| Structure and robotic service interfaces | $8–18M |
| Flight integration and acceptance testing | $20–40M |
| Commissioning engineering and acceptance support | $13–27M |
| **Conditional 0B bom-0-6 total** | **$120–240M** |

**Direct attributable development plus flight pilot: $165–340M**, before separately owned delivery, operations, replacements and programme reserve.

### 12.3 Separately booked exposure

For programme planning—not addition to the bom-0-6 purchase price:

- Launch and delivery: preliminary **$20–100M** allowance, requiring a route-specific quote.
- Incremental three-year mission operations: approximately **$12–24M**.
- Spares and replacement cartridges: approximately **$5–15M**, refined by endurance tests.
- Risk reserve: test **30–50% of the applicable uncertain development/hardware base** in programme cost-risk analysis; hold the resulting reserve under bom-0-17.

These are low-confidence estimates. They are not a closed lifecycle budget.

### 12.4 Unit-cost interpretation

At 20 t/year for three fully productive years, the pilot produces **60 tonnes**.

Direct attributable development and hardware divided by that output gives approximately:

\[
\$2{,}750–5{,}700/{\rm kg}
\]

before delivery, operations and reserve.

That is a **capital-allocation diagnostic**, not a commodity-water price or a delivered-cost forecast. The pilot is justified by learning and demonstrated capability, consistent with D-01.

---

## 13. Position on the round-2 proposals

### Claude: one 10–100 t/year pilot, $150–400M

**Broadly agree with the lower part of the scope and cost envelope.**

I would narrow the initial flight requirement to **10–30 t/year**. A 100 t/year requirement can drive a substantially different feed train, storage policy and thermal system before demand is established.

### GPT: one 10–30 t/year pilot, $100–300M

**Closest to my recommendation.**

My **$120–240M conditional flight estimate** is consistent with that envelope, but I would make the separately booked **$45–100M of 0A evidence and qualification work explicit**. A low hardware estimate must not conceal the cost of closing T13.

### Gemini: two units, 1,500 t/year, $250–450M

**Reject for this item.**

If 1,500 t/year is aggregate output, the reference net yield would require roughly:

\[
1{,}500/0.04275 \approx 35{,}000\ {\rm t/year\ of\ feed}
\]

At 0.25 kWhₜₕ/kg feed, heating alone would require about **8.8 GWhₜₕ/year**, or **1.5 MWₜₕ during 6,000 productive hours**, before auxiliaries.

That is industrial production, not a conditional pilot. It also presupposes customers, storage and transport that have not been established.

### Older reconciliation architecture

The reconciliation’s L4/L5 processing plant, electrolysis modules, large water inventories and hydrogen-system calculations are **not governing inputs for this revised item**. The binding reassessment supersedes those architectures.

---

## 14. Principal risks and mitigations

| Risk | Consequence | Mitigation / decision response |
|---|---|---|
| Taxonomy overpredicts useful water | Poor output and economics | Target-specific characterization; resize or cancel |
| Water release requires excessive temperature | Higher power, corrosion and wear | Optimize net yield rather than maximum extraction |
| Feed bridges or jams | Loss of operation | Positive-displacement transfer, reversible drives, representative testing |
| Dust fouls filters and condensers | Reduced capture, contamination | Staged separation, replaceable filters, pressure monitoring |
| Sulfur/organics exceed cleanup capacity | Off-spec water, corrosion | Challenge testing, segregated batches, monitored breakthrough |
| Seals degrade through thermal cycling | Vapour leakage | Thermally isolated seals, replaceable closures, cycle-life tests |
| Microgravity phase management fails | Loss of condensation or transfer | Relevant-environment demonstration before KDP-0B |
| Tanks fill without a customer | Idle asset | Small inventory, automatic stop, no speculative stockpile |
| Power outage during heating | Trapped vapour or overpressure | Passive-safe thermal state and contained relief path |
| Pathfinder fails to close TRL | Gate delay or cancellation | Preserve real option; no technology waiver |
| Pilot contaminates site or spacecraft | Safety/licensing failure | Closed transfer, contained residue, integrated plume analysis |

### Debris and contamination requirement

Adopt ALARP with a **provisional pilot allocation**, pending modelling and licensing:

- No intentional routine release of solids.
- No open residue dumping.
- No normal-process gas venting without authorization.
- Preliminary externally escaped solid-mass allocation: **less than 0.1–1 kg/year**, to be refined by particle size, velocity and trajectory.

For the reference 468 t/year feed, that corresponds to roughly **99.9998–99.99998% solids retention**.

This is not a claim that such retention has been demonstrated, nor that a mass fraction alone establishes safety. A few large fragments may dominate collision risk; very fine particles may dominate optical contamination. Both require separate limits.

Pilot seals, filters and containment are included here. Programme-wide analysis, monitoring and licensing remain under bom-0-15.

---

## 15. Open engineering questions

The following should be closed before detailed design freeze:

1. **What is the selected target’s actual release curve?**  
   Water content alone does not determine process yield.

2. **How heterogeneous is the accessible resource?**  
   Qualification must encompass the material the mining system can reliably deliver.

3. **What fraction of measured water is indigenous versus introduced contamination or reaction product?**  
   This affects both scientific interpretation and resource accounting.

4. **Can a low-temperature cycle meet the useful production requirement?**  
   Lower yield may be preferable if it sharply reduces contamination and wear.

5. **What feed mechanism survives abrasive material without gravity assistance?**

6. **What are the contaminant species and their cartridge breakthrough rates?**

7. **What cycle life is achievable for retort closures and heaters?**

8. **Can hot-residue heat recovery materially improve performance without adding unacceptable dust-handling complexity?**

9. **Who accepts the water, at which location, and to what specification?**

10. **What evidence will the independent review board accept as relevant-environment TRL 6 for the integrated process?**

11. **What environmental release limits will the licensing state approve?**

12. **Does actual demand justify export, or is local use the better first application?**

---

## Final recommendation

Approve **0A characterization, qualification and shared-pathfinder work now**, with explicit TRL closure objectives.

Retain a **single 10–30 t/year, 5–8 tonne, approximately 75 kWe-allocation water pilot** as a conditional 0B option. Do not order flight hardware until the selected C-type target, relevant-environment evidence, product disposition, economics and licence all close.

The right first achievement is **repeatable, metered and contained recovery of useful water from the actual asteroid**—not an oversized propellant plant searching for a customer.