---
phase: phase-0
item: bom-0-2
round: 2
type: reassessment
modelId: gemini-3-8-flash
modelName: "Gemini 3.8 Flash"
endpoint: databricks-gemini-3-8-flash
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:14:43.266Z
seconds: 61.065
---

# Senior Space-Systems Engineering Assessment: bom-0-2 Mining Robots (Phase 0)

---

## 1. Findings Assessment

### Finding P0-F02: Mining rate, robot target, and station throughput disagree
- **Verdict**: **Agree**.
- **Reasoning & Calculation**:
  The existing specification contains an unclosed mass balance:
  - Consensus text states: $\ge 1,000\text{ t/yr/robot} \times 20\text{ robots} = 20,000\text{ t/yr}$.
  - Resolution rq-0-26 states: $2\text{--}5\text{ t/h/robot}$ continuous. At 8,766 h/yr, continuous excavation yields $17,500\text{--}43,800\text{ t/yr/robot}$, or $350,000\text{--}876,000\text{ t/yr}$ for 20 robots.
  - Sizing an annual output of $1,000\text{ t/yr}$ from a $2\text{--}5\text{ t/h}$ excavator implies an unstated cutting duty cycle of:
    $$\text{Duty Cycle} = \frac{1,000\text{ t/yr}}{2\text{--}5\text{ t/h} \times 8,766\text{ h/yr}} \approx 2.3\% \text{ to } 5.7\%$$
  - Downstream sinks: bom-0-3 Material Processing Station specifies $50\text{ kt/yr}$ throughput. Transport vehicles (bom-0-4) provide roughly $1\text{--}2\text{ kt/yr}$ fleet lift under Phase 0 orbital dynamics. bom-0-6 ISPP consumes water, not bulk regolith.
  - Physical beneficiation on a walking microgravity robot (magnetic/electrostatic) is low-TRL and counterproductive: extracting water or volatiles requires heating raw hydrated phyllosilicates ($5\text{--}10\text{ wt}\%\ \text{H}_2\text{O}$ in CI/CM chondrites; e.g., Ryugu/Bennu samples, Lauretta et al. 2022, Watanabe et al. 2019). The concentration ratio before thermal extraction is $\sim 1:1$ (no discard of bulk matrix on-robot without losing bound volatiles).
- **Proposed Change**: 
  Establish an explicit, unified mass-flow baseline for Phase 0 based on a co-located demonstration target:
  - Sizing nameplate dig rate at $2.0\text{ t/h}$ (range $1.5\text{--}3.0\text{ t/h}$).
  - Explicit duty cycle: $15\%$ calendar duty ($\sim 1,300\text{ dig-hours/yr}$), accounting for solar day/night rotation ($50\%$), canister transit/docking ($20\%$), maintenance/positioning ($10\%$).
  - Per-robot output: $2,600\text{ t/yr}$ (range $2,000\text{--}3,900\text{ t/yr}$).
  - Initial Phase 0 active fleet: Deploy a pathfinder flight demo (2 units), scaling to $6\text{--}8$ operational robots yielding $\sim 15\text{--}20\text{ kt/yr}$ bulk regolith directly fed to co-located bom-0-6 ISPP. Defer 20-robot/50 kt/yr full station throughput until transport (bom-0-4) capacity scales.

---

### Finding P0-F07: Robot mass and power are internally inconsistent
- **Verdict**: **Agree**.
- **Reasoning & Calculation**:
  - The text in rq-0-26 notes: *"unmanageable for a 500 kg robot"*, whereas the top-level consensus sets dry mass at $2,500\text{--}3,500\text{ kg}$. The 500 kg phrase was an uncorrected artifact from an earlier exploratory sizing run; it must be formally expunged.
  - Power & Solar sizing: At 1.0–1.2 AU, solar flux is $1,361\text{ W/m}^2 \to 945\text{ W/m}^2$. With advanced GaAs cells (28% efficiency, packing/thermal derating $\approx 0.75$), specific power generation is $\sim 200\text{--}280\text{ W/m}^2$. Generating $20\text{--}50\text{ kW}$ requires $70\text{--}250\text{ m}^2$ of arrays. Erecting a $150\text{ m}^2$ rigid or flexible solar wing on a dynamic, walking/anchored excavator on a rotating asteroid ($\mu g$ environment, dust ejection, high structural flexibility) creates unacceptable inertial coupling, snagging, and view-factor shadowing.
  - Excavation Power Physics: Cutting specific energy ($E_s$) for unbonded/weakly coherent asteroid regolith (Bennu/Ryugu cohesion $c \sim 0.1\text{--}10\text{ Pa}$, micro-compressive strength $< 1\text{ MPa}$, Grott et al. 2019) is $0.05\text{--}0.5\text{ kWh/t}$. For $2.5\text{ t/h}$, cutting power at the tool face is:
    $$P_{\text{cut}} = 2.5\text{ t/h} \times 0.2\text{ kWh/t} = 0.5\text{ kW}$$
    Even allowing for consolidated clast grinding ($E_s \approx 2\text{ kWh/t}$), cutting power rarely exceeds $5\text{ kW}$. Mechanical sizing of $20\text{--}50\text{ kW}$ represents terrestrial hard-rock bucket-wheel excavator metrics, not microgravity granular regolith handling.
  - Torque mechanics: A $10\text{ kW}$ shaft delivering $50\text{--}200\text{ N}\cdot\text{m}$ implies rotational angular velocity $\omega = P/\tau = 10,000 / 100 = 100\text{ rad/s} \approx 955\text{ rpm}$. A bucket wheel rotating at $\sim 1,000\text{ rpm}$ would fling regolith at $>25\text{ m/s}$ (vastly exceeding asteroid escape velocity $v_{esc} \sim 0.1\text{--}0.5\text{ m/s}$), pulverizing material and destroying containment. A realistic bucket wheel rotates at $1\text{--}3\text{ rad/s}$ ($10\text{--}30\text{ rpm}$). At $2\text{ kW}$ tool power, torque is $\tau = 2,000 / 2 = 1,000\text{ N}\cdot\text{m}$ per wheel. Counter-rotation cancels $90\text{--}95\%$ of this, leaving $50\text{--}100\text{ N}\cdot\text{m}$ residual unbalance.
- **Proposed Change**:
  - Baseline robot dry mass: $2,500\text{--}3,200\text{ kg}$.
  - Baseline excavation electrical power: $3.0\text{--}6.0\text{ kW}$ average cutting power; $10.0\text{ kW}$ peak (stall margin).
  - Power delivery architecture: Onboard solar array sized for housekeeping and mobility only ($15\text{--}25\text{ m}^2$, $3\text{--}5\text{ kW}$ at 1 AU) coupled to a $30\text{--}50\text{ kWh}$ battery buffer. During cutting operations in active zones, power is supplied via a high-voltage ($1\text{--}3\text{ kV}$ DC) surface umbilical deployed from a central surface power node (bom-0-5) or mobile power sled to eliminate huge articulating arrays on the digging platform.

---

### Finding P0-F14: Debris, contamination, and regulatory compliance are unbudgeted
- **Verdict**: **Agree**.
- **Reasoning & Calculation**:
  - The rq-0-26 specification of "$>99\%$ containment" means $1\%$ fugitive dust. At $2.5\text{ t/h}$ across 20 robots operating at $15\%$ duty cycle:
    $$\text{Annual Excavation} = 20 \times 2.5\text{ t/h} \times 1,314\text{ h} = 65,700\text{ t/yr}$$
    $$1\% \text{ loss} = 657\text{ t/yr} \text{ of fugitive particulate dust!}$$
  - Escape velocity on a 500-m C-type asteroid (e.g., Bennu, density $1,190\text{ kg/m}^3$) is:
    $$v_{\text{esc}} = \sqrt{\frac{2 G M}{R}} \approx 0.20\text{ m/s}$$
  - Cutting tool tip speeds ($0.5\text{--}2.0\text{ m/s}$) exceed $v_{\text{esc}}$. Emitting $600+\text{ t/yr}$ of orbital and heliocentric debris creates severe self-fouling of solar arrays (obscuration rate $>10\%/\text{month}$), abrasive degradation of bearing seals, sensor blinding, and planetary defense tracking hazards.
  - Tailings: Extracting $5\text{--}10\%$ water from carbonaceous chondrites leaves $90\text{--}95\%$ dry spent regolith ($18\text{--}38\text{ kt/yr}$). Leaving raw tailings uncontained on the surface invites electrostatic levitation and plume displacement from thrusters/traffic.
  - Regulatory: Outer Space Treaty (OST) Article VI (state authorization and continuous supervision) and Article IX (avoidance of harmful contamination and adverse changes in the celestial environment) apply. There is no international asteroid mining registry, leaving national authorizing states (e.g., under the US Commercial Space Launch Competitiveness Act or Luxembourg Space Resources Act) responsible for licensing.
- **Proposed Change**:
  - Revise the fugitive dust containment metric from mass percentage to an absolute emission limit: $\le 100\text{ kg/yr}$ total fleet fugitive particulate release ($\ge 99.998\%$ mechanical retention at the cutting head via brush-labyrinth seals, enclosed cowlings, suction/screw take-up, and tip speeds restricted to $\le 0.2\text{ m/s}$).
  - Add explicit tailings management scope: sintered tailings consolidation or geotechnical backfill/bagging.
  - Add an explicit line item for dust mitigation technology qualification ($50\text{M}$) and assign certification governance to bom-0-7 in coordination with the national authorizing state under COSPAR/OST guidelines.

---

## 2. Revised Specification

| Parameter | Old Value | New Value | Range | Unit | Basis | Confidence |
|---|---|---|---|---|---|---|
| Active Fleet Size (Phase 0) | 20 | 6 (pathfinder: 2; pilot: 4) | [2, 8] | units | Judgement / System closure | medium |
| Robot Dry Mass | 2,500–3,500 (rq-0-26: 500) | 2,800 | [2,400, 3,200] | kg | Literature / Subsystem build-up | medium |
| Mechanical Excavation Power | 20–50 | 4.0 | [2.0, 8.0] | kW | Calculation ($E_s \approx 0.1\text{--}0.5\text{ kWh/t}$) | high |
| Peak Electrical Power (Active) | Unspecified (implied >50) | 8.0 | [5.0, 12.0] | kW | Calculation (tool + mobility + thermal) | high |
| Nameplate Dig Rate (per robot) | 2–5 | 2.0 | [1.5, 3.5] | t/h | Calculation / DEM simulations | medium |
| Excavation Duty Cycle | Unstated (~2–5%) | 15 | [10, 25] | % | Operational timeline calculation | medium |
| Annual Regolith Output (per robot)| 1,000+ | 2,600 | [1,800, 3,500] | t/yr | Calculation (Rate $\times$ Duty) | medium |
| Cutting Tool Angular Velocity | Implied ~950 | 15 | [5, 25] | rpm | Physics (tangential speed $< v_{\text{esc}}$) | high |
| Net Unbalanced Reaction Torque | 50–200 | 75 | [25, 150] | N·m | Calculation ($95\%$ counter-rotation cancel) | medium |
| Primary Power Source | Robot-mounted solar array | Tethered umbilical + buffer | 1–3 kV umbilical; 40 kWh batt | — | Architecture trade / Feasibility | high |
| Particle Containment Efficiency | >99% by mass | >99.99% ($\le 10\text{ kg/robot/yr}$) | [99.95, 99.999] | % | Environmental fouling limit calculation | medium |
| Excavator Subsystem Mass | 60–80 | 220 | [180, 280] | kg | Subsystem sizing (housing, motors, seals)| high |
| On-robot Beneficiation Ratio | Variable | 1.0 (raw transfer) | [1.0, 1.05] | mass ratio | Volatile retention physics | high |

---

## 3. Interfaces

| Interfacing Item | Flow Type | Value (Baseline) | Value (Range) | Documented in BOM? |
|---|---|---|---|---|
| **bom-0-6 (ISPP Systems)** | Mass (Bulk Feed) | $15,600\text{ t/yr}$ (for 6 robots) | $10,000\text{--}25,000\text{ t/yr}$ | **False** (Interface unallocated; bom-0-6 claims its own excavation) |
| **bom-0-5 (Solar Power Arrays)**| Electrical Power | $60\text{ kW}$ total active site feed | $30\text{--}100\text{ kW}$ | **False** (Assumed autonomous on-robot solar) |
| **bom-0-4 (Transport Vehicles)**| Mass (Water / Prod) | $1,200\text{ t/yr}$ extracted water | $800\text{--}2,000\text{ t/yr}$ | **True** (Matches transport capacity scale) |
| **bom-0-3 (Processing Station)**| Mass (Refined Feed) | $0\text{ t/yr}$ (Direct orbital feed) | $0\text{--}1,000\text{ t/yr}$ | **False** (Station expects 50 kt/yr raw regolith) |
| **bom-0-7 (Governance/Assurance)**| Compliance / Data | Dust emission & safety telemetry | continuous | **False** (No emission monitoring plan) |
| **Surface Environment** | Mass (Fugitive Loss) | $\le 60\text{ kg/yr}$ (fleet total) | $10\text{--}150\text{ kg/yr}$ | **False** (Omitted environmental impact) |

---

## 4. Missing Items or Scope

1. **Surface Power Distribution Infrastructure (Site PDU & Umbilicals)**:
   - High-voltage ($1\text{--}3\text{ kV}$) power distribution lines, automated spooling deployment systems, and junction boxes connecting bom-0-5 to mobile mining platforms.
2. **Standardized Hermetic Transfer Canisters & Docking Interfaces**:
   - Closed-loop dry transfer canisters ($1\text{--}2\text{ t}$ payload) to convey excavated material from the mining face to the ISPP reactor without exposed dumping.
3. **Tailings Stabilization & Disposal System**:
   - Geotechnical stabilization (sintering, chemical binder, or geotextile containment) for the $90\text{--}95\%$ mass fraction of de-volatilized dry regolith residue.
4. **Non-Recurring Engineering (NRE) & Microgravity Flight Test Campaign**:
   - Qualification of microgravity excavation dynamics, low-gravity traction/anchoring, and dynamic dust seals cannot be funded out of per-unit recurring production ($50\text{M}$). Dedicated NRE line required.
5. **Surface Logistics / Positioning Anchoring Probes**:
   - Replaceable anchoring consumables (drilled micro-anchors, grouting, or tensioned tether lines) needed to secure the robots against reaction forces.

---

## 5. Remaining Disagreements and Open Questions

1. **Mobility vs. Anchored Platform**:
   - Claude and Gemini favor walking hexapods or rovers. However, operating on a rubble pile where loose dust and boulders have compressive strengths $< 1\text{ kPa}$ makes walking mobility high-risk for anchoring stability. An anchored gantry/tether frame with winch traversal may offer higher rigidity and continuous force reaction at substantially lower mass.
2. **Umbilical Tether Snagging vs. Onboard Battery Weight**:
   - Tether deployment on asteroid surfaces presents severe snagging hazards on jagged, fractured topography. Conversely, carrying enough battery capacity to dig continuously through asteroid nights requires several tonnes of battery mass per robot. This operational trade requires simulation against actual laser topography (e.g., OLA/OSIRIS-REx data).
3. **Subsurface Cohesion and Boulder Inclusion**:
   - If the bucket wheel strikes a solid, competent metallic or silicate boulder ($>50\text{ MPa}$ compressive strength) within the loose regolith matrix, the excavator will stall and impart sudden shock torques to the anchoring system. Autonomous load-shedding and sensing methods remain unvalidated.
4. **Station Location (Co-located vs. Cis-lunar/Orbital)**:
   - If bom-0-3 is in high lunar orbit or Sun-Earth L2, shipping raw ore via bom-0-4 is completely infeasible ($1\text{ kt/yr}$ fleet lift vs $50\text{ kt/yr}$ ore). bom-0-3 must either be co-located with the mining site or repurposed strictly for volatile processing in Phase 0.

---

## 6. Decision-Quality Critique

### Decision 1: Excavator Power Sizing & Sourcing Architecture
*Method used: QOC (Questions, Options, Criteria) & ATAM*

1. **Frame & Decision Type**: Architectural property decision; fundamental to mass budgets and robot operational envelope.
2. **Criteria & Weights**:
   - System Feasibility & Mass Budget: 0.35
   - Operational Reliability & Mobility: 0.25
   - Microgravity Stability & Dynamic Disturbance: 0.25
   - Complexity / Cost: 0.15
3. **Options**:
   - *Option A*: 20–50 kW onboard solar arrays ($150\text{--}300\text{ m}^2$ per robot).
   - *Option B*: 3–6 kW cutting head, onboard $20\text{ m}^2$ array + 40 kWh battery buffer (daylight digging, pulsed battery peak).
   - *Option C*: Central surface power plant (bom-0-5) with high-voltage flexible surface umbilical tether.
4. **Assessment Matrix**:
   - *Option A*: Fails feasibility. A $150\text{ m}^2$ array on a 2.5 t microgravity walking robot produces massive solar radiation pressure moments, attitude instability, and severe snagging risks.
   - *Option B*: Strong on autonomy and mobility; limited to 15–20% duty cycle and daylight ops; low mechanical risk.
   - *Option C*: Maximizes continuous power; eliminates robot solar wings; vulnerable to tether snagging and abrasion on regolith.
5. **Sensitivity vs. Trade-off Points**:
   - *Trade-off Point*: Robot operational range vs. mechanical complexity. Option B maximizes independence at the expense of lower annual throughput per robot. Option C maximizes throughput but tethers robot to a fixed radius ($\le 500\text{ m}$).
6. **Evidence Certainty**:
   - High certainty that $20\text{--}50\text{ kW}$ cutting power is grossly overestimated for microgravity loose regolith ($E_s \approx 0.1\text{--}0.5\text{ kWh/t}$). High certainty that large articulating arrays will destabilize anchor loads.
7. **Key Assumptions & Falsification**:
   - *Assumption*: Regolith at depth ($0.2\text{--}1.0\text{ m}$) is granular/weakly cemented ($<1\text{ MPa}$). *Falsification*: Deep permafrost sintering or massive monolithic rock requiring $>10\text{ kWh/t}$ specific energy.
8. **Decision & Warrant**:
   - Adopt **Option B as baseline** for pathfinders (3–6 kW cutting head, battery buffer, modest solar wing for safing/housekeeping), with **Option C as growth path** for dense mining fields.
9. **Consequences**:
   - Radically shrinks excavator motor and thermal radiator masses; reduces robot structural mass.

---

### Decision 2: Mass-Flow Closure & Fleet Sizing (Finding P0-F02)
*Method used: GRADE Evidence-to-Decision (EtD)*

1. **Frame & Decision Type**: Executive / Scope Alignment decision. Harmonizes excavation output, transport capabilities, and refinery intake.
2. **Criteria & Weights**:
   - BOM Mass-Flow Closure (no stranded inventory or starved plants): 0.40
   - Capital Cost / Phase 0 Budget: 0.30
   - Technical Risk / Demonstration Scale: 0.30
3. **Options**:
   - *Option 1*: Full 20-robot fleet producing $50\text{ kt/yr}$ raw ore to feed bom-0-3 (requires massive expansion of bom-0-4 transport fleet by $25\times$).
   - *Option 2*: Maintain 20 robots, but restrict mining output to $1,000\text{ t/yr/robot}$ ($20\text{ kt/yr}$ total) with $2.5\%$ duty cycle.
   - *Option 3*: Phased deployment: 2 pathfinder robots scaling to 6 operational units producing $\sim 15\text{ kt/yr}$ total, dedicated primarily to co-located ISPP water extraction.
4. **Assessment Matrix**:
   - *Option 1*: Violates Phase 0 budget and transportation closure.
   - *Option 2*: Highly inefficient capital allocation ($1.0\text{B}$ for machines operating at $2.5\%$ duty).
   - *Option 3*: Closes the loop with realistic transport capacity, minimizes initial capital exposure, and aligns with volatile-first strategy.
5. **Sensitivity vs. Trade-off Points**:
   - *Sensitivity Point*: Station throughput requirement. If bom-0-3 is non-negotiably $50\text{ kt/yr}$ in Phase 0, either the station must be co-located at the asteroid surface, or transport costs blow out Phase 0.
6. **Evidence Certainty**:
   - Transport vehicle (bom-0-4) capacity is physically bounded by Krypton/Iodine electric propulsion delta-V to $\sim 1\text{--}2\text{ kt/yr}$ across 15 vehicles.
7. **Key Assumptions & Falsification**:
   - *Assumption*: Phase 0 primary objective is propellant extraction (ISPP) to enable subsequent swarm expansion, rather than large-scale structural metal refining. *Falsification*: Swarm solar concentrator manufacturing mandates early high-volume structural nickel-iron extraction in Phase 0.
8. **Decision & Warrant**:
   - Select **Option 3**: Downscale initial active fleet to 6 operational units ($15\text{--}20\text{ kt/yr}$ total regolith) directly interfaced with bom-0-6 ISPP. Defer high-rate metal ore shipping until transport infrastructure matures.
9. **Consequences**:
   - Reduces bom-0-2 recurring acquisition cost from $\$1,000\text{M}$ to $\$300\text{--}400\text{M}$, freeing capital for NRE, anchoring qualification, and transfer logistics.

---

### Decision 3: Dust Containment Architecture & Threshold (Finding P0-F14)
*Method used: Toulmin Argumentation & FMEA*

1. **Frame & Decision Type**: Safety and assurance executive decision.
2. **Criteria & Weights**:
   - Asset Lifetime & Degradation (Solar/Radiator/Optics): 0.40
   - Seal Mechanical Complexity & Friction Torque: 0.30
   - System Mass: 0.20
   - Planetary Protection / Debris Compliance: 0.10
3. **Options**:
   - *Option A*: Status quo baseline ($>99\%$ mass containment).
   - *Option B*: Ultra-strict zero-leakage ($>99.999\%$, $\le 1\text{ kg/yr}$ release).
   - *Option C*: Balanced absolute threshold: $\le 10\text{ kg/robot/yr}$ particulate leakage ($\ge 99.99\%$) achieved via low tip-speed cutting ($\le 0.2\text{ m/s}$), mechanical labyrinth skirts, and electrostatic dust repellers around critical optical/solar assets.
4. **Assessment Matrix**:
   - *Option A*: Unacceptable risk. $600+\text{ t/yr}$ of escaping dust rapidly blinds solar arrays and degrades station optics.
   - *Option B*: Technically unfeasible in vacuum granular mechanics; dynamic seals in contact with sharp asteroid dust experience rapid seal abrasion and torque binding.
   - *Option C*: Feasible engineering compromise balancing mechanical seal life with tolerable array degradation rates ($<0.5\%/\text{yr}$).
5. **Sensitivity vs. Trade-off Points**:
   - *Trade-off Point*: Cutting speed vs. seal tightness. Slower cutting reduces throw velocity below $v_{\text{esc}}$, reducing reliance on hermetic contact seals.
6. **Evidence Certainty**:
   - Hayabusa2 and OSIRIS-REx revealed that non-cohesive gravels and dust fluidize vigorously under microgravity touch. Escape velocity on small asteroids is demonstrably low ($<0.5\text{ m/s}$).
7. **Key Assumptions & Falsification**:
   - *Assumption*: Regolith particles thrown inside the housing lose kinetic energy via inelastic collisions with baffle walls and settle into the auger feed. *Falsification*: High electrostatic charging causes particles to remain suspended and migrate through minute seal clearances.
8. **Decision & Warrant**:
   - Adopt **Option C**: Mandate absolute particulate emission limit $\le 10\text{ kg/yr}$ per robot. Restrict bucket-wheel tangential speed to $\le 0.2\text{ m/s}$. Add electrostatic mitigation curtains.
9. **Consequences**:
   - Requires rigorous multi-stage seal and baffle design; establishes unambiguous criteria for ground vacuum chamber testing.

---

```yaml
item: bom-0-2
model: Claude-3.5-Sonnet-Engineering-Review
findings:
  - id: P0-F02
    verdict: agree
    summary: Annual robot mining capacity, duty cycle, transport throughput, and station intake diverge by up to an order of magnitude.
    proposed_change: Baseline robot excavation at 2.0 t/h with an explicit 15% duty cycle (2,600 t/yr/robot), sizing an initial active fleet of 6 robots to deliver ~15.6 kt/yr raw feed to co-located ISPP.
  - id: P0-F07
    verdict: agree
    summary: Mechanical excavation power of 20-50 kW is gross overkill for weak asteroid regolith and physically unviable for robot-mounted solar arrays.
    proposed_change: Reduce cutting electrical power to 4-8 kW, eliminate 150 m2 robot arrays in favor of 20 m2 housekeeping arrays with battery buffering, and strike the 500 kg reference.
  - id: P0-F14
    verdict: agree
    summary: The 99% containment specification releases hundreds of tonnes of fugitive dust per year in microgravity, causing severe self-fouling.
    proposed_change: Replace percentage metric with an absolute limit of <= 10 kg/yr per robot (>= 99.99% containment), limit tool tip speeds to <= 0.2 m/s, and add dedicated NRE and tailings lines.
revised_spec:
  - parameter: active_fleet_size
    old: "20"
    new: "6"
    range: [2, 8]
    unit: units
    basis: judgement
    confidence: medium
  - parameter: robot_dry_mass
    old: "2,500-3,500 (text mentions 500)"
    new: "2,800"
    range: [2400, 3200]
    unit: kg
    basis: literature
    confidence: medium
  - parameter: mechanical_cutting_power
    old: "20-50"
    new: "4.0"
    range: [2.0, 8.0]
    unit: kW
    basis: calculation
    confidence: high
  - parameter: active_electrical_power
    old: "unspecified (implied >50)"
    new: "8.0"
    range: [5.0, 12.0]
    unit: kW
    basis: calculation
    confidence: high
  - parameter: nameplate_dig_rate
    old: "2-5"
    new: "2.0"
    range: [1.5, 3.5]
    unit: t/h
    basis: calculation
    confidence: medium
  - parameter: excavation_duty_cycle
    old: "unspecified (~2.3-5.7%)"
    new: "15"
    range: [10, 25]
    unit: "%"
    basis: calculation
    confidence: medium
  - parameter: annual_regolith_output_per_robot
    old: "1,000+"
    new: "2600"
    range: [1800, 3500]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: bucket_wheel_rotational_speed
    old: "unspecified (implied ~950)"
    new: "15"
    range: [5, 25]
    unit: rpm
    basis: calculation
    confidence: high
  - parameter: particle_containment_efficiency
    old: ">99% by mass"
    new: "99.99"
    range: [99.95, 99.999]
    unit: "%"
    basis: calculation
    confidence: medium
  - parameter: excavator_subsystem_mass
    old: "60-80"
    new: "220"
    range: [180, 280]
    unit: kg
    basis: literature
    confidence: high
interfaces:
  - with: bom-0-6
    flow: mass
    value: 15600 t/yr
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0.06 MW
    in_bom: false
  - with: bom-0-4
    flow: mass
    value: 1200 t/yr
    in_bom: true
  - with: bom-0-7
    flow: data
    value: 100 kbps
    in_bom: false
  - with: space_environment
    flow: mass
    value: 0.06 t/yr
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-2
    quantity: 6
    unit_cost_usd: [45000000, 65000000]
    rationale: Right-sizes fleet to match realistic Phase 0 transport and ISPP intake while reducing upfront procurement.
  - action: add
    item: Mining Robot NRE and Microgravity Qualification
    quantity: 1
    unit_cost_usd: [350000000, 600000000]
    rationale: Development, anchoring dynamics testing, and vacuum dust seal qualification cannot be absorbed by unit recurring costs.
  - action: add
    item: Surface Power Distribution and Umbilicals
    quantity: 1
    unit_cost_usd: [80000000, 150000000]
    rationale: Eliminates unviable multi-hundred m2 articulating arrays on dynamic mining platforms.
  - action: add
    item: Hermetic Ore Transfer Canisters and Handling
    quantity: 24
    unit_cost_usd: [2000000, 5000000]
    rationale: Enables sealed transfer from excavator to ISPP reactors without open-space hopper dumping.
  - action: add
    item: Tailings Containment and Stabilization System
    quantity: 1
    unit_cost_usd: [50000000, 120000000]
    rationale: Necessary to prevent tens of thousands of tonnes of devolatilized dry regolith from contaminating the asteroid orbit.
open_questions:
  - What is the subsurface shear strength and boulder distribution below 0.5 m depth at candidate carbonaceous target bodies?
  - Can flexible power umbilicals operate reliably across rough microgravity boulder fields without snagging or severe abrasion?
  - Will microspine anchors maintain sufficient holding force (>500 N) during cyclic excavation reaction loads in low-cohesion rubble?
  - Is bom-0-3 intended to operate co-located with the mining asteroid, or does it require high-capacity inter-orbital transport?
```
