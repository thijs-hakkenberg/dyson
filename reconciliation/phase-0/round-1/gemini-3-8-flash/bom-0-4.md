---
phase: phase-0
item: bom-0-4
round: 1
type: reassessment
modelId: gemini-3-8-flash
modelName: "Gemini 3.8 Flash"
endpoint: databricks-gemini-3-8-flash
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T18:51:28.167Z
seconds: 214.189
---

## 1. Findings Assessment

### P0-F01: Transport capacity is one to two orders of magnitude below station throughput
- **Verdict**: Agree.
- **Reasoning / Calculation**:
  - The finding's orbital mechanics and physics checks are entirely correct. 
  - Solar array power: $300\text{--}500\text{ m}^2$ at $1\text{ AU}$ yields $\sim 100\text{--}160\text{ kWe}$ (assuming $30\%$ efficient triple-junction cells and derating for $250\text{ W/m}^2$ operational output). In the main asteroid belt ($2.2\text{--}3.2\text{ AU}$, where flux falls by $1/r^2$), this drops to $15\text{--}33\text{ kWe}$. Even if operating between near-Earth asteroids (NEAs) at $\sim 1\text{ AU}$, $150\text{ kWe}$ Hall-effect propulsion ($I_{\text{sp}} \approx 1,800\text{ s} \approx 17.65\text{ km/s}$, $\eta \approx 0.60$) yields thrust $T = 2\eta P / v_e = 2(0.60)(150,000) / 17,650 \approx 10.2\text{ N}$.
  - Loaded vehicle mass: Dry mass ($\sim 25\text{ t}$) + payload ($200\text{ t}$) + propellant ($\sim 80\text{ t}$) $\approx 305\text{ t}$.
  - Initial acceleration: $a_0 = 10.2\text{ N} / 305,000\text{ kg} \approx 3.34 \times 10^{-5}\text{ m/s}^2$ ($2.89\text{ m/s}/\text{day}$).
  - Burn time for $\Delta v = 8\text{ km/s}$: $\Delta v / a_{\text{avg}} \approx 8,000\text{ m/s} / (4.0 \times 10^{-5}\text{ m/s}^2) \approx 2.0 \times 10^8\text{ s} \approx 6.3\text{ years}$ of pure engine burn time alone. Adding orbital transfer coasts makes a single round trip take $4\text{--}7\text{ years}$.
  - Over a 15-year lifetime, a vehicle can complete at best 2 to 3 round trips, not 10+. At 3 round trips per vehicle over 15 years, a fleet of 15 vehicles delivers $15 \times 3 \times 200\text{ t} / 15\text{ yr} = 600\text{ t/yr}$.
  - The station target in `bom-0-3` is $50,000\text{ t/yr}$. The transport shortfall is a factor of $80\times$.
  - Sizing electric propulsion tugs to move $50,000\text{ t/yr}$ over $8\text{ km/s}$ round trips requires roughly $15\text{--}25\text{ MWe}$ of continuous propulsion power across the fleet, or moving the processing station directly to the target asteroid (co-location architecture), or changing Phase 0 throughput to a pilot demonstration level ($\sim 1,000\text{ t/yr}$).
- **Proposed Change**: Decouple Phase 0 processing station nominal target to pilot scale ($1,000\text{--}2,000\text{ t/yr}$ delivered raw regolith), resize vehicle power from $150\text{ kWe}$ to $1\text{ MWe}$ (deployable lightweight roll-out arrays) to achieve 2-year round trips, and set fleet size to 15 vehicles carrying $150\text{ t}$ payload per trip.

---

### P0-F10: Crew transport and habitation for a human-tended station are not budgeted
- **Verdict**: Agree.
- **Reasoning / Calculation**:
  - Deliberation `rq-0-18` specifies that primary vehicle structures must be human-ratable, with crew module kits procured separately. However, neither the BOM nor the cost models provide budget lines for crew modules, ECLSS consumables, Earth-to-orbit crew delivery, or radiation shelters.
  - Adding human operations to an asteroid/cislunar tug dramatically drives program complexity, safety factors ($1.4\times$ structural margin, dual fault tolerance), and operations costs. Phase 0 is fundamentally an autonomous precursor industrial demonstration.
- **Proposed Change**: Formally restrict Phase 0 transport vehicles to uncrewed cargo operations. Maintain mechanical and structural volume margins for future modular kits per `rq-0-18`, but zero out crew-support operational expectations from the Phase 0 transport specification and station interfaces.

---

### P0-F11: Propellant supply for tugs is not in BOM; ISPP output has no Phase 0 consumer
- **Verdict**: Agree.
- **Reasoning / Calculation**:
  - Global xenon production is $\sim 50\text{ t/yr}$. A fleet of 15 vehicles needing $\sim 50\text{ t}$ each per trip burns $\sim 250\text{--}350\text{ t/yr}$ of propellant. Xenon is physically impossible at this scale.
  - Krypton global production is $\sim 8,000\text{ t/yr}$, and pure iodine production is $\sim 35,000\text{ t/yr}$. Kr or Iodine is chemically and industrially viable from terrestrial supply.
  - However, `bom-0-6` produces cryogenic LOX/LH$_2$ (via water electrolysis). Hall/ion thrusters cannot directly consume cryogenic LOX/LH$_2$ without deep cryogenic storage and dedicated plasma thruster tech (e.g., electrodeless/helicon or water resistojets/arcjets). Neither the propellant supply logistics (buying terrestrial Kr/I$_2$) nor the vehicle compatibility with LOX/LH$_2$ is budgeted or technically aligned.
- **Proposed Change**: Baseline iodine ($I_2$) or krypton ($Kr$) electric propulsion, purchased from Earth commercial suppliers and delivered to LEO/HEO for mission departure. Specify Phase 0 tug propellant procurement in the transport BOM, and realign `bom-0-6` water/LH$_2$/LOX production either to Phase 0B depot demonstrations or auxiliary chemical attitude/orbital maneuvering systems.

---

### P0-F15: Eight of nine concluded deliberations were never written back into the specs
- **Verdict**: Agree.
- **Reasoning / Calculation**:
  - Deliberation `rq-0-18` requires modular structural human-rating provisions (adds $2,000\text{--}4,000\text{ kg}$ dry mass penalty per vehicle) and standardized mechanical docking adapters.
  - Deliberations `rq-0-30`, `rq-0-47`, and `rq-0-48` govern thermal isolation, sunshields, and MLI degradation over 15-year design lifetimes.
  - The static specs in `consensus.md` completely ignore these findings, retaining contradictory xenon references and ignoring mass penalties.
- **Proposed Change**: Update `transport-vehicles` specifications to reflect structural human-rating interfaces ($+3,000\text{ kg}$ structural allocation), passive sunshield thermal architecture, and 15-year degradation factors.

---

### P0-F16: Consensus documents disagree with the BOM they describe
- **Verdict**: Agree.
- **Reasoning / Calculation**:
  - The BOM table explicitly says: `15 units | $133M | $2.00B | Krypton/iodine propulsion`.
  - The consensus document states: `Fleet of 10 vehicles`, `$200M/unit`, and `All assume xenon initially`.
  - These documents contradict each other in quantity (15 vs 10), unit cost ($133M vs $200M), and propulsion propellant chemistry (Krypton/Iodine vs Xenon).
- **Proposed Change**: Adopt the BOM line of 15 vehicles using Krypton/Iodine electric propulsion as authoritative, with an updated realistic unit flyaway cost of $\$150\text{M}\text{--}\$175\text{M}$ ($+\$25\text{M}$ allocated to Earth-to-orbit launch integration).

---

## 2. Revised Specification

| Parameter | Old Consensus | Revised Value | Range | Unit | Basis | Confidence |
|---|---|---|---|---|---|---|
| Fleet Size | 10 (cons.) / 15 (BOM) | 15 | 12 – 18 | vehicles | Ops requirement (fleet rotation) | High |
| Propellant Type | Xenon | Iodine ($I_2$) / Krypton ($Kr$) | $I_2$ or $Kr$ | - | Industrial availability (xenon exhausted) | High |
| Power Plant Output (at 1 AU) | $\sim 150\text{--}250\text{ kWe}$ ($300\text{--}500\text{ m}^2$) | 800 | 600 – 1,000 | kWe | Sized for trajectory closure | Medium |
| Array Technology | Generic triple-junction III-V | Ultra-flex / Roll-out (ROSA) thin-film | 150 – 250 | W/kg specific power | Literature (ROSA heritage) | High |
| Thrust Level | 8 – 13 N | 40 | 30 – 55 | N | Physics calc ($P=800\text{ kWe}, \eta=0.55$) | High |
| Specific Impulse ($I_{\text{sp}}$) | 1,800 – 3,000 | 2,200 | 1,900 – 2,800 | s | Hall/Iodine thruster heritage (e.g., BHT-6000/I2) | High |
| Vehicle Dry Mass | $\sim 20\text{--}25\text{ t}$ | 28 | 24 – 32 | t | Structural human-rating + high-power array | Medium |
| Payload Capacity (Outbound/Inbound) | 150 – 250 t | 150 | 100 – 175 | t | Trajectory trade for $\le 2.5\text{ yr}$ mission | High |
| Mission Cycle Time (Round Trip) | 1.5 years (claimed) | 2.5 | 2.0 – 3.2 | years | Low-thrust trajectory calc ($8\text{ km/s}$) | High |
| Fleet Lifetime Delivery | 50,000 t/yr (implied by station) | 900 | 600 – 1,200 | t/yr | Fleet calculation: $15 \times 150\text{ t} / 2.5\text{ yr}$ | High |
| Unit Procurement Cost | $133M (BOM) / $200M (cons.) | 165 | 140 – 190 | $M USD | Aerospace CERs for 800 kWe electric tug | Medium |

---

## 3. Interfaces

- **bom-0-1 (Prospecting Satellites)**: Data interface. Orbital ephemerides, target physical rotation parameters, and surface mineralogy maps ($\sim 1\text{ Gbps}$ aggregate comms via Deep Space Network / Lunar Relay).
- **bom-0-2 (Mining Robots)**: Physical/Cargo interface. Direct surface-to-orbit or canister handoff of extracted raw ore: $150\text{ t}$ bulk regolith canisters per vehicle docking.
- **bom-0-3 (Material Processing Station)**: Physical cargo delivery interface. Inbound raw material delivery: $600\text{--}1,200\text{ t/yr}$ aggregate fleet delivery. *Flag: BOM currently expects $50,000\text{ t/yr}$, mismatch is unresolved without station down-scoping or in-situ co-location.*
- **bom-0-6 (ISPP Systems)**: Currently non-existent in Phase 0. Transport tugs use iodine/krypton; ISPP makes cryogenic H$_2$/O$_2$. *Flag: Interface is uncoupled.*
- **Earth Commercial Supply (Off-BOM)**: Terrestrial propellant delivery to LEO/HEO departure staging depot: $\sim 300\text{--}450\text{ t/yr}$ of high-purity Iodine or pressurized Krypton.

---

## 4. Missing Items or Scope

1. **Propellant Resupply & Refueling Logistics Line**: No line item exists for purchasing and launching the $300\text{--}450\text{ t/yr}$ of iodine or krypton required to operate the fleet from Earth.
2. **Cargo Canisters and Latching/Exchange Mechanisms**: Autonomous berthing/docking of standardized $150\text{ t}$ regolith pods requires handling hardware, latching collars, and orbital container tug infrastructure.
3. **Orbital Departure Tug / Earth-to-Orbit Launch Integration**: Launching 15 tugs with $28\text{ t}$ dry mass and $60\text{ t}$ propellant each requires $\sim 15$ heavy-lift launches (e.g., Starship or New Glenn) totaling $\sim \$750\text{M}\text{--}\$1.5\text{B}$ not captured in unit flyaway costs.

---

## 5. Remaining Disagreements and Open Questions

1. **Architectural Realignment (Orbital Transport vs. Asteroid Co-location)**: Sizing transport tugs to haul raw unprocessed regolith over deep-space $\Delta v$ is thermodynamically inefficient (moving 80% slag/waste mass). An open question remains whether to move the processing station (`bom-0-3`) directly to the NEA/belt target, eliminating the long-haul ore transport requirement entirely.
2. **Propellant Selection ($I_2$ vs. $Kr$ vs. Water Arcjet)**: Iodine offers dense, unpressurized solid storage with high Isp, but poses cathode poisoning and coupon corrosion risks over a 15-year design life. Krypton is inert but requires heavy, high-pressure composite tanks (increasing vehicle dry mass).
3. **Down-scoping Phase 0 Station Throughput**: Does Phase 0 need $50,000\text{ t/yr}$ throughput immediately, or can it operate as a $1,000\text{ t/yr}$ demonstration facility with full throughput deferred to Phase 1?

---

```yaml
item: bom-0-4
model: claude-opus-4-6
findings:
  - id: P0-F01
    verdict: agree
    summary: Physics and orbital mechanics limit the 15-vehicle fleet to delivering ~600-1,200 t/yr, falling nearly two orders of magnitude short of the 50,000 t/yr station requirement.
    proposed_change: Resize vehicle power to 800 kWe, derate cycle cadence to 2.5-year round trips, and officially down-scope Phase 0 transport capacity to pilot-scale (~1,000 t/yr).
  - id: P0-F10
    verdict: agree
    summary: Crew transport hardware and life-support operational budgets are absent from Phase 0 transport lines despite station human-tending assumptions.
    proposed_change: Remove human-tended operational requirements from Phase 0 transport vehicles, maintaining only passive structural interfaces per rq-0-18.
  - id: P0-F11
    verdict: agree
    summary: Xenon is industrially exhausted, and ISPP-produced LOX/LH2 cannot be consumed by the electric propulsion Hall tugs.
    proposed_change: Formally baseline terrestrial iodine or krypton electric propulsion, add propellant procurement lines, and decouple Phase 0 tugs from bom-0-6 ISPP output.
  - id: P0-F15
    verdict: agree
    summary: Deliberation rq-0-18 structural human-rating provisions and long-duration thermal requirements were omitted from vehicle specifications.
    proposed_change: Add a 3,000 kg structural margin allocation and modular docking kit provisions to the vehicle dry mass budget.
  - id: P0-F16
    verdict: agree
    summary: BOM counts, propulsion type, and costs directly contradict the earlier consensus documents.
    proposed_change: Establish the BOM line of 15 vehicles using Krypton/Iodine electric propulsion as authoritative, with an updated flyaway unit cost of $165M.
revised_spec:
  - parameter: fleet_size
    old: "10 (consensus) / 15 (BOM)"
    new: "15"
    range: [12, 18]
    unit: "vehicles"
    basis: judgement
    confidence: high
  - parameter: propellant_type
    old: "Xenon"
    new: "Iodine (I2) or Krypton (Kr)"
    range: [0, 0]
    unit: "chemical"
    basis: literature
    confidence: high
  - parameter: vehicle_power_at_1au
    old: "150-250 kWe"
    new: "800"
    range: [600, 1000]
    unit: "kWe"
    basis: calculation
    confidence: medium
  - parameter: vehicle_dry_mass
    old: "20-25 t"
    new: "28"
    range: [24, 32]
    unit: "t"
    basis: calculation
    confidence: medium
  - parameter: payload_capacity_inbound
    old: "150-250 t"
    new: "150"
    range: [100, 175]
    unit: "t"
    basis: calculation
    confidence: high
  - parameter: mission_cycle_time
    old: "1.5 years"
    new: "2.5"
    range: [2.0, 3.2]
    unit: "years"
    basis: calculation
    confidence: high
  - parameter: annual_fleet_delivery_capacity
    old: "50,000 t/yr (implied)"
    new: "900"
    range: [600, 1200]
    unit: "t/yr"
    basis: calculation
    confidence: high
  - parameter: unit_cost
    old: "$133M (BOM) / $200M (cons.)"
    new: "165"
    range: [140, 190]
    unit: "$M"
    basis: judgement
    confidence: medium
interfaces:
  - with: bom-0-3
    flow: mass
    value: "900 t/yr raw regolith"
    in_bom: true
  - with: bom-0-2
    flow: mass
    value: "150 t payload per docking"
    in_bom: true
  - with: bom-0-1
    flow: data
    value: "1 Gbps comms/ephemeris"
    in_bom: true
  - with: bom-0-6
    flow: propellant
    value: "0 t/yr (uncoupled in Phase 0)"
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-4
    quantity: 15
    unit_cost_usd: [140000000, 190000000]
    rationale: "Resize power from 150 kWe to 800 kWe, update mass for structural human-rating margins, and adopt Iodine/Krypton thrusters."
  - action: add
    item: "bom-0-4b Earth-Supplied EP Propellant and Depot Resupply"
    quantity: 1
    unit_cost_usd: [300000000, 500000000]
    rationale: "Procurement and orbital delivery of ~450 t/yr Iodine/Krypton propellant required for 15 transport tugs over Phase 0 operations."
open_questions:
  - "Should Phase 0 processing be co-located at the asteroid target to eliminate the massive low-thrust raw ore haulage requirement?"
  - "Can iodine propellant contamination and corrosion over a 15-year operational lifecycle be mitigated to acceptable thruster reliability thresholds?"
```
