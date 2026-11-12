---
bomId: "bom-0-5"
itemName: "Site Power, Arrays and Storage"
itemSlug: "solar-power-arrays"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# Proposal: bom-0-5 — Site Power, Arrays and Storage

**Configuration:** Proposed revised Phase 0B reference  
**Scope:** Electrical generation, local distribution, distributed storage, and power-system heat rejection at one industrial NEA site  
**Decision status:** Fund maturation in 0A; do not authorize industrial procurement before KDP-0B

## 1. Executive recommendation

Build a **modular, sunlight-following NEA microgrid**, with production scheduled around available sunlight rather than supported by a large battery bank.

For engineering development and interface control, adopt the following **conditional reference site**:

| Parameter | Reference configuration | Preliminary sizing range |
|---|---:|---:|
| PV rating at 1 AU, beginning of life, reference temperature | **8 MW DC** | 6–10 MW |
| Delivered power at 1.5 AU, end of life, unshadowed | **2.49 MW** | Target-dependent |
| Delivered power with one array module unavailable | **2.34 MW** | Same conditions |
| Scheduled production load | **1.5 MW nominal** | 1.0–1.8 MW |
| Short-duration operating peak | **2.2 MW** | Subject to load scheduling |
| Installed battery nameplate energy | **2.0 MWh** | 1–3 MWh |
| Primary distribution | **3 kV DC** | Qualified operating range to be established |
| Robot supply interfaces | **1–3 kV DC** | Regulated by local converters |
| Array modules | **16 × 500 kW** | 12–20 modules |
| Array deployed aperture | **25,000–32,000 m²** | Reference 8 MW installation |
| Delivered site-power hardware mass | **110–185 t** | Reference installation |
| Initial recurring hardware cost | **$0.44–1.75 billion** | Reference installation; delivery excluded |

These are **engineering assumptions, not approved programme quantities or supplier quotations**.

### The key architectural choices

1. **Generate power at the NEA.** Do not transmit power from SEL1 or another remote node.
2. **Keep tug arrays in bom-0-4.** They are not included in this proposal.
3. **Use batteries for survival, controlled shutdown, and transient support—not full-shift production.**
4. **Operate native/reduced Fe-Ni processing only.** No power allowance for production oxide reduction, solar-grade silicon, or LOX/LH₂.
5. **Treat illumination and anchoring as first-order design drivers.** A megawatt array that cannot maintain pointing or survive local dynamics is not a power system.
6. **Procure incrementally.** Standardize the module, then authorize the number of modules supported by target data and signed Phase 1 demand.
7. **Do not assume the present reference site is viable at every NEA.** A target with unsuitable rotation, shadowing, aphelion, or surface mechanics may fail the target gate.

The 8 MW rating is a **1 AU reference rating**, not a claim that the plant receives 8 MW continuously.

---

## 2. Scope and accounting boundaries

### Included in bom-0-5

- Photovoltaic blankets, support structures, pointing mechanisms, and electrical collection.
- Array-specific anchoring, restraint, deployment, and servicing hardware.
- Source converters and maximum-power-point tracking.
- Site HV trunks, sectionalizing switchgear, protection, and grounding/reference architecture.
- Distributed stationary batteries, battery converters, enclosures, and thermal control.
- Local load-interface converters and robot-tether electrical connection stations.
- Power-system computers, local instrumentation, and autonomous energy management.
- Radiators and thermal transport for power electronics and stationary storage.
- Initial installed redundancy.

### Excluded, with explicit interfaces

| Scope | Responsible item |
|---|---|
| Tug propulsion arrays and tug batteries | bom-0-4 |
| Robot onboard batteries, motors, and robot-side tether handling | bom-0-2 |
| Process furnaces, process converters internal to machinery, and process heat rejection | bom-0-3 |
| Conditional water-pilot equipment | bom-0-6 |
| Earth launch, transfer stages, delivery propulsion, and associated integration | bom-0-8 |
| External communications and ground systems | bom-0-9 |
| Routine operations staffing | bom-0-10 |
| Technology development and qualification | bom-0-11 |
| 0A flight demonstrator | bom-0-12 |
| Replacement inventory and later replacement hardware | bom-0-14 |
| Site-wide debris/contamination controls | bom-0-15 |
| Delivery EP propellant | bom-0-16 |
| Programme contingency and reserve | bom-0-17 |

The power hardware must meet contamination requirements, and its local protective features are included here. Programme-wide debris modelling, licensing support, and monitoring are not charged again.

**SEL1 remains a receiving-node reference, not the location of this site-power installation.**

---

## 3. Sizing basis: derive power from the site, not from legacy totals

### 3.1 Reference assumptions

The following assumptions must be replaced by controlled inputs before KDP-0B.

| Assumption | Reference value | Status |
|---|---:|---|
| Industrial sites initially deployed | One | Proposed procurement strategy |
| Product | Native/reduced Fe-Ni meeting Phase 1 acceptance specifications | Binding architectural direction |
| Product scale | Order 1 kt/year delivered | Programme context; not an electrical guarantee |
| Maximum distance for routine reference production | 1.5 AU | Provisional target-selection constraint |
| Initial industrial service life | 10 years | Proposed |
| Array retained output used for sizing | 0.80 | Qualification requirement to be substantiated |
| Power conversion and distribution efficiency | 0.90 | Preliminary allocation |
| Unshadowed pointing/thermal operating factor | 0.972 | Preliminary allocation |
| Production during prolonged darkness | None | Proposed baseline |
| Critical-service darkness endurance | 12 hours | Provisional requirement, not a measured NEA night |

The 0.80 retained-output factor covers an allocated degradation envelope. It must ultimately include radiation, thermal cycling, contamination, mechanical damage, and manufacturing variation without counting the same loss twice.

### 3.2 Reference electrical load budget

These are **power-system allocations to be reconciled with bom-0-2 and bom-0-3**, not measured process loads.

| Consumer | Production-mode allocation | Control approach |
|---|---:|---|
| Mining and beneficiation | 0.35–0.60 MW | Interruptible; stagger major drives |
| Fe-Ni processing and forming | 0.45–0.80 MW | Batch scheduling; controlled shutdown |
| Materials transfer and handling | 0.08–0.15 MW | Sequence large motions |
| Process thermal-control auxiliaries | 0.05–0.12 MW | Essential subset retained during shutdown |
| Robot charging and support | 0.05–0.15 MW | Predominantly surplus-power charging |
| Controls, communications, and site services | 0.03–0.06 MW | Tiered essential loads |
| Stationary battery charging | 0–0.30 MW | Curtailed before production loads |
| **Scheduled concurrent total** | **About 1.1–1.8 MW** | Nominal dispatch: 1.5 MW |

Do not add every upper bound and call it a continuous requirement: the architecture depends on validated scheduling.

A brief 2.2 MW peak is permitted only when generation and battery state permit it. Motors require controlled starting; direct-on-line starting of major loads is prohibited.

### 3.3 Annual energy and throughput closure

At 1.5 MW scheduled production load and 3,000–4,500 productive hours annually:

\[
E_{\rm production}=4.5\text{–}6.75\ {\rm GWh/year}
\]

For 1,000 t/year of accepted output, this corresponds to:

\[
4.5\text{–}6.75\ {\rm kWh/kg\ of\ accepted\ product}
\]

That is a **whole-site energy envelope**, including beneficiation and auxiliaries—not a proposed metal-melting energy requirement.

Whether this envelope is sufficient depends strongly on native-metal abundance, recovery, feed handling, and product quality. It also does not establish that 1,000 t/year will be delivered: transport losses, inventory, and receiving acceptance remain separate interfaces.

For example:

\[
M_{\rm feed}=\frac{M_{\rm accepted\ product}}{f_{\rm recoverable\ metal}\,\eta_{\rm recovery}}
\]

At 20% recoverable metal and 80% recovery, 1,000 t of product requires approximately 6,250 t of feed. At 2%, it requires approximately 62,500 t. Those cases cannot share an unexamined mining-power assumption.

**Recommendation:** reject poor targets rather than automatically scaling power to compensate for unfavorable mineralogy.

---

## 4. Generation system

### 4.1 Array sizing

Use:

\[
P_{\rm delivered} =
P_{\rm BOL,1AU}\frac{1}{r^2}
f_{\rm retained}\eta_{\rm electrical}f_{\rm operating}
\]

For the reference installation:

\[
P_{\rm delivered} =
8\frac{1}{1.5^2}(0.80)(0.90)(0.972)
=2.49\ {\rm MW}
\]

With one of sixteen equal modules unavailable:

\[
P_{\rm delivered,N-1}=2.49\frac{15}{16}=2.34\ {\rm MW}
\]

This leaves approximately 0.54 MW above a 1.8 MW production schedule, before battery charging.

That margin is **not** an allowance for local shadowing. Terrain-resolved illumination must be modelled separately.

At 2 AU, the same array produces only about 1.40 MW under the same factors. The reference production schedule would then require curtailment.

### 4.2 Module architecture

Each of sixteen modules comprises:

- One 500 kW BOL/1 AU photovoltaic assembly.
- Several independently isolated blanket strings.
- Local conversion and MPPT channels.
- Section-level disconnects and fault monitoring.
- Pointing and deployment structure.
- Mechanical restraint and anchor interfaces.
- Local inspection targets and replaceable electrical interfaces.

Approximate module dimensions:

| Parameter | Preliminary specification |
|---|---:|
| Deployed photovoltaic aperture | 1,560–2,000 m² |
| Representative aperture envelope | Approximately 32 × 55 m |
| Wing-level mass | 3.8–6.3 t |
| BOL reference specific power, wing level | 80–130 W/kg |
| Output connection | Isolated interface to 3 kV site bus |

The representative dimensions describe an aperture, not a finalized continuous membrane. Multiple narrower blankets may be preferable for deployment and damage isolation.

### 4.3 Cell selection

**Recommendation:** retain technology competition through 0A; favor qualified III-V if supply and delivered cost close, but do not make III-V mandatory.

Selection criteria:

1. Delivered end-of-life energy per kilogram.
2. Qualified manufacturing capacity.
3. Delivered hardware cost.
4. Radiation and thermal-cycle performance.
5. Compatibility with segmentation and HV isolation.
6. Repairability and tolerance of local damage.

A preliminary effective aperture output of **250–320 W/m² at 1 AU BOL** gives the reference 25,000–32,000 m² aperture.

Do not baseline unqualified tandem technology. Conversely, do not exclude silicon solely from cell-level efficiency comparisons.

For this revised site scale, a blanket requirement for a new **25 MW/year** production line is not justified. A supplier must instead demonstrate capacity for the actual contracted deployment—for example, roughly **2–4 MW/year over a multi-year delivery campaign**, plus the separately managed tug demand.

### 4.4 Mechanical arrangement

Use spatially separated array fields on restrained, articulated supports. Avoid a single mechanically coupled megastructure.

A surface installation is acceptable only if target dynamics permit practical tracking. On a small NEA, “surface-mounted” still requires a spacecraft-level attitude and structural analysis:

- Solar pressure and tether forces react through anchors.
- Array tracking imposes reaction torque.
- Local escape velocity may be very low.
- Deployment may disturb regolith.
- Cables and membranes can contact terrain as the site rotates.

The initial reference layout occupies approximately **0.08–0.20 km²**, including separation, servicing paths, cable corridors, and preliminary shadow clearance. Actual terrain may require more area.

An orbital power platform or power beaming system is **not the baseline**. If surface geometry fails, reopen the target/architecture trade rather than treating beaming as a qualified fallback.

---

## 5. Electrical architecture

```text
             ARRAY FIELD A                     ARRAY FIELD B
          8 × 500 kW modules                8 × 500 kW modules
                   |                                 |
          MPPT / source isolation           MPPT / source isolation
                   |                                 |
             3 kV BUS A -------- protected tie ----- 3 kV BUS B
                   |                                 |
          +--------+---------+              +--------+---------+
          |                  |              |                  |
      Battery A/B       Process zones   Battery C/D       Mining zones
      2 × 0.5 MWh       isolated DC/DC  2 × 0.5 MWh      isolated DC/DC
          |                  |              |                  |
          +----- essential service buses ---+          1–3 kV tether
                             |                                |
                    Controls / thermal /                Robot converter
                    shutdown actuators                  + onboard battery
```

Operate as two sectionalized buses with a normally controlled tie. A bus fault must not collapse both halves.

### 5.1 Voltage selection

Adopt **3 kV DC as the development baseline**.

- Conceptual bipolar reference: ±1.5 kV relative to a controlled electrical reference.
- All insulation must nevertheless tolerate the defined full differential and credible fault/transient voltages.
- Do not use regolith as a return conductor or protective earth.
- Use two-conductor circuits, bonding networks, insulation monitoring, and isolated load converters.

This voltage reduces cable mass without making a jump to substantially higher, less mature operating voltages.

### 5.2 Distribution requirements

| Parameter | Preliminary requirement |
|---|---|
| Primary voltage | 3 kV DC nominal |
| Typical controlled feeder | 250–500 kW |
| Essential low-voltage services | Redundant isolated DC buses; voltage standardized with site equipment |
| Fault protection | Converter current limiting plus independently powered isolation |
| Fault containment | Single branch fault must not disable both essential buses |
| Robot interfaces | Dead-front connectors; interlocked mate/demate |
| Cable routing | Restrained, mapped corridors separated from excavation and hot-product handling |
| Live connector operations | Prohibited unless specifically qualified |

A representative 500 kW feeder draws 167 A at 3 kV. For a 500 m one-way route using two 70 mm² copper conductors:

- Loop resistance: approximately 0.25 Ω at room temperature.
- Resistive loss: approximately 7 kW.
- Bare copper mass: approximately 0.63 t.

This is an electrical screening calculation, **not a qualified cable design**. Vacuum ampacity, insulation temperature, solar heating, terminations, and fault energy determine the final cross-section.

### 5.3 Arc and stored-energy control

Protection cannot rely on terrestrial breaker assumptions. A local fault can be sustained by batteries and converter capacitors even after array isolation.

Required measures include:

- Segmented source capacitance.
- Precharge and controlled discharge circuits.
- Arc detection and converter shutdown.
- Independent battery contactors.
- Insulation resistance monitoring.
- Voltage-presence indication at service interfaces.
- Verified isolation before robotic handling.
- Fault tests covering solar-wind plasma, dust, and exposed dielectric charging.

Final trip times and let-through energies must follow equipment damage tests, not arbitrary generic thresholds.

---

## 6. Distributed storage

### 6.1 Recommended configuration

Install **four stationary 0.5 MWh battery units**, geographically separated and connected through independent bidirectional converters.

| Parameter | Reference |
|---|---:|
| Installed nameplate energy | 2.0 MWh |
| Initial permitted depth of discharge | 80% |
| End-of-life capacity retention | 80% |
| Discharge-path efficiency | 94% |
| Deliverable energy at design EOL | Approximately 1.20 MWh |
| Deliverable energy with one unit unavailable | Approximately 0.90 MWh |
| Preliminary aggregate discharge capability | 1 MW continuous; higher short pulse subject to test |
| Pack-level specific energy | 100–160 Wh/kg |
| Battery assembly mass | 13–20 t |

The energy calculation is:

\[
E_{\rm usable}=2.0(0.8)(0.8)(0.94)=1.20\ {\rm MWh}
\]

This pack-level mass allowance includes normal battery containment and internal thermal provisions; external site radiators are separate.

### 6.2 Illustrative emergency energy budget

| Emergency function | Allowance |
|---|---:|
| Essential services: 25 kW for 12 h | 300 kWh |
| Additional controlled process shutdown: 75 kW for 2 h | 150 kWh |
| Robot recovery and transient support: 250 kW for 15 min | 62.5 kWh |
| Restart/control reserve | 50 kWh |
| Subtotal | 562.5 kWh |
| 30% energy allowance | 169 kWh |
| **Required emergency budget** | **Approximately 0.73 MWh** |

This closes with one stationary unit unavailable under the stated assumptions.

However, the 25 kW essential-load allocation is demanding. It must include all required keep-alive services, including power-system thermal management and the agreed plant survival subset.

### 6.3 Operating policy

- Production stops before predictable darkness.
- Furnaces complete a qualified shutdown or retain only a demonstrated low-power hold mode.
- Batteries recharge before discretionary production restarts.
- A protected survival energy floor cannot be overridden by throughput optimization.
- Robot onboard batteries remain in bom-0-2; this line includes the power to charge them, not their hardware.

There is no assumed molten-regolith-electrolysis keep-alive load because oxide-derived metals are not the Phase 0 baseline.

If native-metal processing nevertheless requires substantial prolonged thermal hold, that load must be measured and added. Storage is not declared sufficient by analogy.

**No 200–500 MWh bank is retained.** If a selected target requires many hours of megawatt production through darkness, reopen the operating concept rather than enlarging the battery by default.

---

## 7. Thermal design and waste-heat rejection

### 7.1 Responsibility split

- **bom-0-5:** losses in stationary batteries, converters, switchgear, controls, and associated thermal transport.
- **bom-0-3:** process furnaces, cooling circuits, hot-product handling, and process radiators.

This split prevents importing the abandoned station’s 15–60 MW thermal estimates into a much smaller native-metal site.

### 7.2 Power-system thermal allowance

Preliminary design cases:

| Heat source | Design allowance |
|---|---:|
| Power converters and local electrical equipment | 100–180 kW |
| Battery conditioning and cycling losses | 10–40 kW |
| **Power-system radiator duty** | **110–220 kW** |

This is a preliminary operating envelope, not an assertion that every electrical distribution loss reaches a central radiator. Cable losses radiate locally.

Use segmented pumped or heat-pipe radiator assemblies with approximately:

- **300–330 K** operating temperature where compatible with equipment.
- **400–1,400 m² effective emitting area**, depending on temperature, view factors, degradation, and environmental heating.
- Reference allocation: approximately **700 m²**.

The basis is:

\[
Q=\epsilon\sigma A(T^4-T_{\rm sink,eff}^4)
\]

The effective sink is not simply deep-space temperature. Sunlight, asteroid infrared emission, and terrain view factors matter.

PV blankets reject their own absorbed heat locally. Their thermal load is not routed through the electronics radiators.

Process radiator duty remains an unresolved bom-0-3 interface and must close before the power configuration is frozen.

---

## 8. Autonomy, control, and communications

Earth cannot provide real-time electrical protection.

### Control hierarchy

1. **Local protection:** hardware-level overcurrent, arc, insulation, and thermal protection.
2. **Converter control:** voltage regulation, current limiting, MPPT, and battery control.
3. **Site energy management:** forecast-driven scheduling, load admission, and reserve management.
4. **Ground supervision:** planning, anomaly review, software authorization, and performance trending.

### Required autonomous functions

- Black-start one essential bus from any healthy battery unit.
- Recover from a failed controller without losing essential power.
- Reconfigure around a failed array or distribution section.
- Forecast generation from rotation, ephemeris, and terrain horizon maps.
- Admit production batches only if completion/shutdown energy is available.
- Defer charging and production before violating survival reserves.
- Detect declining insulation resistance and quarantine suspect branches.
- Operate safely through communications outages.

Use redundant fiber links for primary site control where practical. Local wireless may support inspection and mobility but must not be the sole protection channel.

Preliminary external telemetry allocation:

- **20–100 kbps average** power-system telemetry.
- Event-triggered waveform records and inspection imagery.
- Local buffering sized for at least 30 days of routine records, with protected retention of critical fault data.

These are interfaces to bom-0-9, not an additional communications system budget.

---

## 9. Manufacturing, deployment, and maintenance

### 9.1 Production philosophy

Manufacture repeatable, independently testable modules rather than one bespoke 8 MW deployment.

Standardize:

- Array blanket sections.
- Source converter channels.
- Battery units.
- Feeder isolation modules.
- Robotic mechanical and electrical interfaces.
- Inspection targets and diagnostic connections.

Require production acceptance tests for every blanket section, converter channel, battery assembly, and HV termination.

### 9.2 Deployment sequence

1. Survey terrain and verify selected anchor locations.
2. Establish a low-power bootstrap station and communications.
3. Deploy the first stationary battery and essential bus.
4. Deploy and commission one array module.
5. Verify restraint loads, pointing, insulation, and thermal behavior.
6. Expand sequentially, testing each new section before connection.
7. Commission process loads only after both essential buses and required storage are available.
8. Demonstrate autonomous fault recovery before industrial operation.

No human visits are assumed.

### 9.3 Maintainability

The operational servicing unit should be a blanket section, converter, battery assembly, or restraint component—not an entire 500 kW module where avoidable.

Include:

- Accessible standardized fasteners.
- Captive covers and restrained small parts.
- Isolation points visible to robotic inspection.
- No dependence on manual connector cleaning.
- Replaceable sacrificial protection near dusty work zones.
- Installation geometry that permits replacement without crossing energized equipment.

---

## 10. Preliminary mass estimate

**Reference: one 8 MW/2 MWh installation.**

| Subsystem | Mass range |
|---|---:|
| PV wings and integral deployment structures | 62–100 t |
| Additional site anchoring, restraints, and deployment hardware | 12–22 t |
| PMAD, converters, and switchgear | 10–18 t |
| Distribution cables and connection stations | 4–10 t |
| Stationary battery assemblies | 13–20 t |
| Power-system radiators and thermal transport | 4–8 t |
| Controls, instrumentation, and local service interfaces | 3–6 t |
| **Total, rounded** | **110–185 t** |

This excludes transfer stages, delivery propellant, transport packaging, uninstalled spares, and plant-owned equipment.

Mass confidence is low to medium. Anchoring and module structural mass are especially target-dependent.

---

## 11. Development roadmap and technology readiness

The supplied panel envelopes place the critical systems below industrial readiness. Mature cells do not make a complete NEA microgrid mature.

### 11.1 0A development sequence

| Stage | Demonstration | Exit objective |
|---|---|---|
| Laboratory breadboards | HV converters, dust-exposed interfaces, battery controls, representative process-load profiles | TRL 4 |
| Integrated environmental testing | Plasma/vacuum HV tests, deployment tests, thermal cycling, representative anchor and cable trials | TRL 5 |
| Relevant-environment demonstration | Array deployment, local transfer, storage, fault isolation, autonomous operation | Evidence toward TRL 6 |
| Production-representative qualification | Repeated-unit architecture, full-scale critical deployment elements, endurance and fault testing | TRL 6 evidence package |

A **100–250 kW flight demonstrator** can establish important evidence, but does not automatically qualify a 500 kW module. Full-scale critical structures, electrical stresses, fault energies, and scaling laws require separate demonstration.

Prefer a target-body pathfinder that exercises real surface attachment and rotation conditions. Ground facilities can reproduce some plasma and thermal conditions, but not all coupled NEA deployment dynamics.

### 11.2 Technology-specific closure

| Technology | Required evidence |
|---|---|
| **T02: MW-scale deployable arrays** | Production-representative deployment units, stable pointing, output retention, structural dynamics, and a validated repeated-module scaling approach |
| **T09: HV tethers/distribution** | Dust/plasma insulation behavior, cable handling, fault isolation, connector endurance, and robotic servicing |
| **T15: site generation and transfer** | Integrated generation-to-load operation with relevant deployment, attachment, and site dynamics |
| **T20: storage/microgrid management** | Endurance, fault containment, black start, load shedding, reserve enforcement, and validated shutdown energy |

Under D-02, **T02 and T15 must reach TRL 6 with no waivers before KDP-0B**. I also recommend requiring T09 and T20 at TRL 6 for this selected architecture: their failure would otherwise force a late industrial redesign.

Internal 0A milestones remain TRL 4–5.

### 11.3 KDP-0B conditions

In addition to technology readiness:

- **Target:** measured illumination, mineralogy, surface mechanics, and dynamics support the design.
- **Demand:** signed Phase 1 material, purity, quantity, delivery-date, and receiving specifications.
- **Economics:** supplier-backed hardware estimates and closed delivery mass/trajectory model.
- **Licence:** approved contamination, debris, electrical safety, and operations case.

A development schedule should be evidence-driven. As a planning allowance, expect **several years of ground development followed by a multi-year flight demonstration and evaluation campaign**, not immediate industrial deployment.

---

## 12. Cost and budget treatment

All figures are **rough-order-of-magnitude constant-2026-dollar estimates**. They are not statistical confidence intervals.

### 12.1 Phase 0A attribution

Development belongs in bom-0-11; the flight demonstrator belongs in bom-0-12.

| Power-related 0A activity | Attributed allowance |
|---|---:|
| Ground R&D, qualification, full-scale critical articles, and controls validation | $120–280M |
| Pathfinder power payload and power-specific flight integration | $40–120M |
| **Total attributed 0A scope** | **$160–400M** |

These are allocations for programme planning, **not extra bom-0-5 charges**. They exclude launch and whole-spacecraft costs.

### 12.2 Phase 0B recurring hardware

**Reference: 8 MW PV and 2 MWh stationary storage.**

| Hardware scope | Basis | Cost range |
|---|---|---:|
| PV wings and integral deployment hardware | $30–150/W at 1 AU BOL | $240–1,200M |
| Additional anchoring and site deployment equipment | Target-dependent allowance | $20–60M |
| PMAD, conversion, and switchgear | Separate from PV-wing price | $40–100M |
| Cables and connection stations | Route-dependent allowance | $10–30M |
| Distributed storage | $50–140M/MWh installed battery assembly | $100–280M |
| External power-system thermal hardware | Preliminary allowance | $15–45M |
| Controls and instrumentation | Preliminary allowance | $10–30M |
| **Total recurring hardware** | Rounded | **$0.44–1.75B** |

A working reference estimate is approximately **$0.8B**, before delivery, separately funded development, replacements, and programme reserve.

Across the broader **6–10 MW / 1–3 MWh** configuration family, use roughly **$0.3–2.2B** as a preliminary hardware scenario envelope. Capacity and cost assumptions must remain correlated; that envelope is not a probability distribution.

Supplier quotations must explicitly state whether PMAD, deployment structures, or thermal equipment are included. The table assumes the PV price excludes site-wide PMAD and stationary storage.

### 12.3 Delivery exposure

At 110–185 t delivered, a screening transport allowance of **$3,000–10,000/kg to destination** implies approximately:

\[
\$0.33\text{–}1.85\ {\rm billion}
\]

This is an attributed exposure in **bom-0-8**, not an addition to the bom-0-5 hardware line. It is not a trajectory closure or quotation.

Do not add another delivery-propellant charge if the adopted transport quotation already includes it. Otherwise, the unpriced propellant obligation remains in bom-0-16.

### 12.4 Procurement strategy

Authorize:

1. Supplier and manufacturing-capacity studies.
2. Qualification and initial production tooling.
3. A small initial module batch after KDP-0B.
4. Remaining modules after successful site commissioning milestones.

Do not pre-buy the entire installation merely to obtain an assumed volume discount.

---

## 13. Risk assessment

| Risk | Consequence | Primary mitigation / gate |
|---|---|---|
| Illumination worse than assumed | Throughput collapse or excessive storage | Terrain-resolved annual illumination model before target selection |
| Anchoring or deployment failure | Loss of expensive array modules; debris | Relevant-environment demonstration; independent modules |
| HV arcing in plasma/dust | Bus outage, erosion, fire-like thermal damage | Segmentation, qualified insulation, fault-energy testing |
| Feed grade or recovery poorer than assumed | Excess mining energy per accepted kilogram | Integrated feed-to-product pilot and target rejection criteria |
| Process shutdown energy underestimated | Battery depletion or plant damage | Measured shutdown tests before final storage sizing |
| Supplier capacity insufficient | Schedule slip and cost escalation | Capacity audit and production-representative contracts |
| Array pointing excites structural dynamics | Reduced output, anchor overload | Coupled flexible-body/attitude model and flight validation |
| Battery internal failure | Loss of reserve or propagation | Geographical separation, isolation, containment |
| Dust accumulation and excavation ejecta | PV degradation and radiator damage | Stand-off distance, source control, contamination budget |
| Delivery mass grows | Transport cost and schedule failure | Packing, trajectory, and deployment closure before procurement |
| Autonomous load management fails | Unstable bus or reserve exhaustion | Hardware-in-the-loop fault campaigns; independent reserve protection |
| Demand changes | Stranded industrial capacity | Modular procurement tied to signed Phase 1 demand |

For debris and contamination, follow the interim **ALARP** approach. Do not invent a “safe” release fraction. Model credible deployment, excavation, cable, and array-fragment release mechanisms and establish acceptance limits with the licensing state.

---

## 14. Where this proposal disagrees with Round 2

### 14.1 Reject 35–100 MW site totals as the revised baseline

Those figures largely retain power demands from the abandoned high-throughput mixed-product architecture or aggregate site and tug requirements.

They do not follow from a one-site, order-1-kt/year native/reduced Fe-Ni capability programme.

**My reference is 8 MW at 1 AU BOL, delivering approximately 2.5 MW at 1.5 AU EOL in sunlight.** Larger systems require a demonstrated load and demand case.

### 14.2 Accept the smaller site scale, but clarify its rating

Claude’s revised 2.5–8 MW site range is directionally closest to this proposal. However, “site MW” is ambiguous unless it distinguishes:

- BOL/1 AU array rating;
- EOL output at target distance;
- delivered bus power;
- and annual energy after darkness.

This proposal makes those distinctions explicit.

### 14.3 Storage should stay near 1–3 MWh unless measured loads justify more

The 10–15 MWh proposals are not impossible, but they are not justified by the current reference operating policy. Full-power night production is deliberately excluded.

The 2 MWh reference is supported by a stated emergency budget, with target-specific verification still required.

### 14.4 Reject $5/W, but do not treat $30–150/W as proven

The supplied hardware allowance is suitable for scenario planning, not a procurement commitment. Heritage flight contracts also cannot be scaled mechanically into a definitive industrial price.

### 14.5 Do not carry obsolete process radiator quantities

Radiator sizing must follow the revised heat balance. Neither PV nameplate nor abandoned mixed-product plant power determines site radiator duty.

---

## 15. Open engineering questions

Before preliminary design review:

1. What is the target’s full-orbit illumination history at candidate deployment locations?
2. Is routine production at or beyond 1.5 AU required?
3. What recoverable metal grade and recovery efficiency are supported by samples?
4. What is the measured whole-site energy per accepted kilogram?
5. What shutdown sequence and residual thermal load does the actual Fe-Ni process require?
6. Can the essential site survive on 25 kW, including thermal control?
7. What anchor concept closes under deployment, solar-pressure, cable, and tracking loads?
8. What tracking arrangement remains practical through the target’s rotation?
9. What qualified battery chemistry best balances calendar life, containment, cold survival, and mass?
10. What 3 kV insulation and connector design survives the relevant plasma/dust environment?
11. What are the process-plant radiator duty and allowable placement?
12. Can suppliers meet both site and tug array demand without an unbudgeted production-line programme?
13. What delivered mass, packing volume, transfer time, and propellant consumption actually close?
14. What contamination and fragment-release limits will the licensing state approve?

## Final recommendation

**Develop a modular 8 MW-reference / 2 MWh NEA microgrid in 0A, but purchase industrial capacity only after the target, demand, economics, licence, and TRL gates close.**

The central design principle is simple: **use sunlight to make product, and storage to keep the site safe.** Do not spend launch mass and capital forcing an unproven first industrial site to behave like a continuously powered terrestrial factory.