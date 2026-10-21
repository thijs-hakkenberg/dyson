---
bomId: "bom-0-14"
itemName: "Spares and Replacements"
itemSlug: "spares-replacements"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-14 Spares and Replacements: Technical Proposal

**Item:** bom-0-14 Spares and Replacements (Phase 0B, with a small 0A enabling slice)
**Baseline context:** NEA-co-located Fe-Ni beneficiation and primary processing; MW-class EP tugs; SEL1 receiving node (D-04 interim); iodine reference propellant with argon alternate (D-05 interim); uncrewed.
**Author position:** opinionated engineering proposal. Every number is a planning range with its basis stated; none is an approved value.

---

## 1. Executive summary

1. **The spares programme is a logistics system, not a stockpile.** It covers four things:
   - the hardware (ORUs, wear parts, attrition replacements);
   - a three-echelon supply chain (Earth → SEL1 → NEA);
   - a robot-serviceable interface standard;
   - a reliability-data loop that sizes stock from failure physics.

   Flat percentage buffers, such as Gemini's 20%, are rejected.

2. **Make SEL1 the logistics hub and tug-servicing point.** The NEA site holds a forward depot sized to cover a 2.5–4 year resupply lead time.
   - Spares ride the outbound, near-empty tug leg in standard Logistics Pods.
   - The outbound leg has spare payload capacity, so spares cost almost nothing in tug Δv.
   - The cost that matters is Earth launch (bom-0-8) and hardware.

3. **Three drivers dominate.** They are, in order:
   - EP thruster wear-out on the tug fleet, which depends on the propellant choice.
   - Plant and robot wear at the regolith interface.
   - Robot attrition.

   Structure, arrays and avionics are second-order if they are designed with internal redundancy.

4. **0B cost over a 10-year production campaign is P10 $1.1B / P50 $2.0B / P90 $3.4B (FY2026), hardware plus logistics engineering, excluding launch.** That is about $200M/yr at steady state.
   - Mass imported from Earth is 150–600 t over the campaign (central ~270 t, ~27 t/yr).
   - This is roughly 15–30 kg imported per tonne of product delivered.
   - Launch of this mass is costed in bom-0-8 and is a further $0.3–1.8B.

5. **0A slice: $20–50M (central $30M).** It funds the ORU interface standard, the sparing model, the reliability database, and the test ORUs flown on the bom-0-12 pathfinder.

6. **Robotic ORU exchange at the NEA surface is a project-ending technology.** Under D-02 it must reach TRL 6 in a relevant environment with no waiver before KDP-0B.

7. **Unit cost of sustainment is a gate-relevant number.** At P50, spares alone cost ~$150 per kg of product delivered. This should go to the economics gate as a headline. It does not break a capability programme (D-01), but it should end any claim that Phase 0 Fe-Ni is cheap.

---

## 2. Scope boundary (to avoid double-counting)

| Included in bom-0-14 | Excluded (owner) |
|---|---|
| ORUs, LRUs and wear parts for robots, plant, tugs and site power, from start of 0B operations | Initial fleets and day-one installed redundancy (bom-0-2, -3, -4, -5) |
| Whole-unit attrition replacements for robots after initial deployment | Initial robot fleet incl. day-one hot spares (bom-0-2) |
| Initial provisioning (IP) of NEA forward depot and SEL1 cache | SEL1 node structure and its own spares (bom-0-13); bom-0-14 specifies the cache interface |
| Logistics Pods (standard spares carriers) and their attach interface | Tug hardpoints themselves (bom-0-4) |
| Logistics engineering, sparing analytics, obsolescence management, lifetime buys of EEE parts | Life tests and qualification campaigns (bom-0-11) |
| Spares acceptance testing, packaging, ground depot | Launch and delivery to SEL1 (bom-0-8), for which bom-0-14 supplies the mass manifest |
| Block-upgrade ORUs (reliability growth delivered via the swap path) | Ops staffing and maintenance planning labour (bom-0-10) |
| Optional 0B Local Fabrication Cell for wear parts (gated option) | EP propellant (bom-0-16), comms ground segment (bom-0-9) |
| ORU end-of-life disposition hardware (retention and storage of failed units) | Debris policy and thresholds (bom-0-15), against which bom-0-14 complies |
| — | Unknown-unknown reserve above P50 (bom-0-17) |

**Rule:** spares follow the hardware they serve. Site-mounted comms terminals and tug transponders are spared here, because they are robot, plant, tug or power flight hardware. The ground segment is not.

**Upstream sizing assumptions** (owned by other items; replace them when those baselines freeze):

| Parameter | Assumed central | Range | Source / basis |
|---|---|---|---|
| Delivered product | 1.3 kt/yr | 0.6–2.5 | Re-assessment agreed band |
| 0B production campaign | 10 yr | 8–12 | My costing horizon |
| Mining/haul robots | 16 × 1.0 t | 10–30 × 0.5–1.5 t | Feed ~15–25 kt/yr at 8–15 wt% metal, 70% recovery |
| Processing plant dry mass | 60 t | 30–120 t | Parallel trains (2–4) |
| Site power | 1.0 MWe, 3 MWh | 0.5–2 MWe, 0.5–15 MWh | Agreed storage band |
| Tug fleet | 14 × 1.5 MWe | 10–18 × 1.0–2.5 MWe | Agreed band |
| Tug dry mass | 25 t | 15–45 t | ~180 W/kg arrays, ~5 kg/kW EP string |
| EP thruster | 100 kW-class Hall, 15 active + 3 redundant per 1.5 MWe tug | 50–200 kW units | Reference; argon may force a different thruster type |
| Tug thrust time | 5,000 h/yr | 3,500–7,000 | ~2 yr NEA–SEL1 round trips, coast phases |
| Installed 0B dry hardware | ~480 t | 230–1,100 t | Sum of the above |

---

## 3. Design philosophy

### 3.1 Eight principles

1. **Size spares from physics, not percentages.** Each ORU's stock comes from three inputs:
   - its demand process (random failure, wear-out, or attrition);
   - the resupply lead time at its echelon;
   - a stock-out risk target tied to its criticality.

   A flat 20% buffer is roughly right for nothing. Ground-engaging tools consume about 250% of their installed mass over 10 years, while primary structure needs 0%.

2. **Design for replacement rather than repair.**
   - At the NEA site, maintenance is Level 2: robots remove and replace ORUs.
   - There is no component-level repair in 0B except tether splicing and wear-part changes.
   - Component repair needs dexterity, contamination control and test equipment that cost more than the parts they save.

3. **Commonality is the strongest cost lever.** One actuator family, one battery module, one avionics computer, one 25 kW power-converter module, and one ORU interface family serve robots, plant, tugs and site power. The target is ≤400 ORU part numbers for the whole 0B system. Each unique part number carries roughly fixed costs: qualification, safety stock, and obsolescence tracking.

4. **Put the long lead times on the short legs.**
   - Tugs are serviced at SEL1, which is about 1 year from an Earth order.
   - The NEA site is 2.5–4 years from an Earth order and holds only what NEA hardware needs.
   - Class-L tug ORUs (thrusters, array segments) are not stocked at the NEA.

5. **Degrade gracefully.**
   - Plant runs in parallel trains.
   - Tugs carry N+k thruster and PPU redundancy sized to complete one round trip at ≥99% probability without service.
   - The robot fleet is sized for 80% availability.

   Spares restore margin. They are not the first line of defence.

6. **The spares path is the upgrade path.** Field failures drive redesigned ORUs that drop into the same interface. 10–15% of the hardware budget is reserved for block-upgrade ORUs, which is where reliability growth happens.

7. **Nothing is jettisoned.** Failed ORUs are kept for one of three fates:
   - cannibalisation;
   - return to SEL1 on product tugs (selected units only);
   - storage in a tethered or contained scrap pod (bom-0-15 compliance).

   Packaging must not shed: no loose MLI and no outgassing foams.

8. **Local manufacture is an option, not a baseline.** Fe-Ni wear parts made on site are attractive: wear parts are about 40% of spares mass but only about 10% of cost. However, the 0B baseline must close without local manufacture (§8.3).

### 3.2 What I am deliberately not proposing

- **No crewed or human-dexterity repair.** This follows from the uncrewed Phase 0 decision.
- **No return-to-Earth repair loop.** The return Δv and schedule kill it. Root-cause analysis relies on in-situ inspection imagery, plus a small number of units returned to SEL1 for inspection by node robotics.
- **No battery-heavy site architecture as a default.** If site power sits on a rotating NEA surface with a 3–8 h day, the battery cycles 1,000–3,000 times a year and becomes a consumable that dominates spares mass. I recommend that bom-0-5 strongly prefer a free-flying or polar-mast array that avoids eclipse (§5.4).

---

## 4. System architecture

### 4.1 Logistics network

```
  ECHELON E3: EARTH                      ECHELON E1: SEL1 HUB (bom-0-13 host)
 ┌──────────────────────────────┐       ┌────────────────────────────────────┐
 │ Suppliers / OEM lines        │       │ SPARES CACHE (bom-0-14 contents)   │
 │  - thruster & PPU line (warm)│       │  - tug Class-L ORUs (thrusters,    │
 │  - robot ORU line            │ bom-  │    array segments, PPU modules)    │
 │  - EEE lifetime-buy store    │ 0-8   │  - NEA-bound pods staged           │
 │ Ground Depot & Acceptance    │══════>│ TUG SERVICING: node manipulator,   │
 │  - kitting into Logistics Pod│launch │  swap Class-L/M tug ORUs between   │
 │  - TVAC sample / functional  │       │  trips (24–72 h per tug visit)     │
 │ Sparing model + inventory DB │       │ Failed-unit inspection bay         │
 └──────────────┬───────────────┘       └───────┬───────────────▲────────────┘
                │ reorder (s,S) policy           │ outbound tug  │ inbound tug
                │ lead time 9–24 mo to SEL1      │ carries 1 Pod │ carries product
                │                                │ (5–10 t)      │ + selected
                ▼                                ▼ 6–18 mo       │ failed ORUs
       ┌───────────────────────────────────────────────────────────────────┐
       │ ECHELON E0: NEA FORWARD DEPOT                                     │
       │  Docked Pods (2–4 at any time) + shaded rack, 0–25 °C stores,     │
       │  heater power 2–6 kW                                              │
       │  Contents: robot ORUs, wear parts, tethers, plant ORUs, power     │
       │  ORUs, attrition robots (crated)                                  │
       │  Served by: site robots (Class S/M), plant gantry (Class M/L)     │
       │  Scrap/retention pod for failed units  ── bom-0-15 compliance     │
       └───────────────────────────────────────────────────────────────────┘
   Total Earth→NEA lead time = fab 6–24 mo + launch manifest 3–6 mo
                             + SEL1 dwell 0–6 mo + tug transfer 6–18 mo
                             = 2.5–4 yr (design value 3.0 yr)
```

### 4.2 Why SEL1 is the hub

- **Every tug passes SEL1.** It is the product destination under D-04, so tug servicing there costs no extra trip.
- **Lead time.** Earth-to-SEL1 delivery is about a quarter of the Earth-to-NEA lead time. For random-failure ORUs, safety stock scales as about √(λ·L), so tug safety stock falls by roughly half when tugs are spared at SEL1 rather than at the NEA.
- **Fallback if D-04 flips.** If the 0B gate moves the receiving node (e.g., to SEL4/5 or cislunar), the hub moves with it. The architecture is location-agnostic as long as the hub sits on the product route.

### 4.3 Pod flow check

- **Demand:** ~27 t/yr central, 15–60 t/yr range.
- **Supply:** 6–9 outbound tug departures per year at 5–10 t pod each gives 30–90 t/yr capacity.
- **Margin:** at the high-demand end with a small fleet, the margin is thin. This makes a constraint on bom-0-4: **every tug must accept one Logistics Pod outbound without reducing its product capacity inbound.** The pod is dropped at the NEA before loading product.

---

## 5. Technical specifications

### 5.1 ORU interface standard (PD-ORU-1), delivered in 0A

| Class | Mass | Envelope (max) | Handler | Swap time target (incl. checkout) | Examples |
|---|---|---|---|---|---|
| S | ≤25 kg | 0.4 × 0.4 × 0.6 m | Robot manipulator end-effector | ≤1 h | Sensors, avionics cards, cathodes, valves, cutter teeth cassettes |
| M | 25–500 kg | 1.0 × 1.0 × 1.5 m | Robot pair or plant gantry; SEL1 node arm | ≤8 h | Drive actuators, 25 kW PPU modules, pumps, battery modules (10 kWh), tether reels |
| L | 0.5–5 t | 2.5 × 2.5 × 4 m | SEL1 node arm, plant gantry, dedicated fixture | ≤72 h | 100 kW thrusters (incl. gimbal), array segments (25–50 kW), crusher assemblies, robot chassis |

**Mechanical interface**
- Self-aligning guide cone with a capture envelope of ±25 mm and ±3°.
- Single-actuator latch with preload ≥5 kN (S), ≥20 kN (M), ≥80 kN (L).
- Latch life ≥200 cycles.

**Electrical interface**
- *Low-voltage bus:* 120 V DC, ≤5 kW per connector. Dust-tolerant: shuttered, with wiper seals, scoop-proof, mate-under-dust tested.
- *HV path:* 1–3 kV for robot tether power and site PMAD, through a separate shuttered HV connector rated for ≥100 mate cycles in regolith-dust environment. This connector is the single highest-risk interface item.
- *Low-power Class-S ORUs (<200 W):* contactless inductive power and optical data, which removes exposed pins entirely.

**Data and thermal**
- *Data:* SpaceWire or TSN Ethernet, with an ORU electronic ID (EEPROM plus optical fiducial/2D code) read before latch closure.
- *Thermal:* conductive interfaces only at the NEA, with no fluid quick-disconnects in regolith dust. Fluid-loop plant components are spared as sealed assemblies including their own heat exchanger. Fluid QDs are allowed for tug ORUs at SEL1.

**Materials**
- No elastomeric seals on stored ORUs; use metal C-seals.
- Dry lubricants (MoS₂/WS₂ sputtered) or space-grade PFPE with a demonstrated 10-year shelf life.
- Iodine-compatible materials where ORUs see propellant (bom-0-16 / bom-0-4 coordination).

### 5.2 Logistics Pod

| Parameter | Value |
|---|---|
| Gross capacity | 10 t (5 t typical load) |
| Tare | 12–18% of gross (1.2–1.8 t) |
| Envelope | Fits a 9 m-class fairing; internal racks 2.4 × 2.4 × 5 m |
| Thermal | Passive MLI enclosure (non-shedding outer layer) plus 300–800 W heaters from host; stores 0 to +25 °C; batteries at 30–50% SOC, 0–15 °C |
| Radiation | ≥3 mm Al-equivalent around EEE ORU bays; 3-year transit dose budget |
| Interfaces | Tug hardpoint (bom-0-4), PD-ORU-1 Class-L latch at the depot, inventory telemetry via host (≤1 kbps) |
| Reuse | Pods stay at the NEA as depot storage and finally as a sealed scrap/retention vault; no return |
| Quantity | 25–45 over the campaign (central 35) |

### 5.3 Sparing method

**Demand classes**
- **R, random failure (exponential):** avionics, power electronics, sensors. Fleet demand rate λ = N·d/MTBF, where N is installed population and d is duty hours per year.
- **W, wear-out (deterministic plus scatter):** thrusters, cathodes, cutters, liners, crucibles, batteries. Demand is installed population × usage / life, with Weibull β = 2–4 scatter and 10–20% infant mortality.
- **A, attrition (catastrophic loss):** whole robots, tethers. Annual loss probability per unit p_A.

**Stock level per echelon:** smallest S such that P(demand over L > S) ≤ α, where:
- α = 2% for criticality-1 items (those whose loss stops production);
- α = 10% for criticality-2 items;
- α = 25% for criticality-3 items.

The full model is a multi-echelon METRIC-type optimisation coupled to a Monte Carlo tug-traffic simulation. The 0A deliverable optimises availability per dollar across all ORUs jointly, not item by item.

**Worked examples (central assumptions):**

| ORU | Echelon | Population | Demand basis | λ (fleet/yr) | Lead L | Mean demand over L | Stock (α) | Unit mass |
|---|---|---|---|---|---|---|---|---|
| Robot drive actuator | E0 NEA | 96 (16 × 6) | R/W, MTBF 20 kh, 4,380 h/yr | 21 | 3.0 yr | 63 | 77 (α=2%) | 8 kg |
| Robot tether (300 m, 2 kV) | E0 | 16 | A, 0.8/robot-yr | 13 | 3.0 yr | 38 | 49 (α=2%) | 60 kg |
| 25 kW PPU module | E1 SEL1 | 840 (14 × 60) | R, MTBF 500 kh, 8,760 h/yr | 15 | 1.0 yr | 15 | 23 (α=2%) | 50 kg |
| 100 kW Hall thruster | E1 SEL1 | 210 active | W, 30 kh life, 5,000 h/yr | 35 | 1.0 yr | 35 | 46 (α=2%, incl. infant) | 200 kg |
| Plant crusher liner set | E0 | 3 trains | W, ~6 kt feed per set | 3 | 3.0 yr | 9 | 12 (α=10%) | 400 kg |

The actuator example shows the leverage. Doubling MTBF to 40 kh roughly halves the NEA actuator stock and its 3-year pipeline mass. **A reliability dollar spent in bom-0-2 design returns several spares dollars here.** I recommend a formal trade, with joint authority between bom-0-2 and bom-0-14, before robot CDR.

### 5.4 Demand drivers by subsystem (central, 10-year campaign)

| Code | Subsystem / category | Demand basis | 10-yr mass (t) | 10-yr cost ($M) | Key sensitivity |
|---|---|---|---|---|---|
| A | Tug EP thrusters and cathode ORUs | 210 positions, 5,000 h/yr, life 30 kh; ~300 thrusters + ~400 cathodes | 62 | 450 | Propellant (iodine cathode erosion; argon may need a different thruster); life 15–60 kh |
| B | Tug PPU/PMAD modules | 840 modules, MTBF 500 kh | 7.5 | 110 | Rad-hard EEE MTBF, iodine deposits on HV |
| C | Tug bus ORUs (avionics, GNC, feed valves/heaters, gimbals, thermal) | ~70 kg/tug-yr | 9 | 280 | Internal redundancy level in bom-0-4 |
| D | Tug array segments (25–50 kW) | ~5% of 21 MW over 10 yr (damage plus non-recoverable strings), at $30–150/W | 6 | 80 | BOL oversizing vs replacement trade |
| E | Robot attrition (whole units) | 10%/robot-yr × 16 robots × 10 yr = 16 units | 16 | 140 | p_A = 5–25%/yr is the least-known number in the item |
| F | Robot ORUs, tethers, batteries (10–50 kWh) | ~10%/yr of fleet mass; batteries 3 × fleet | 15 | 230 | Dust ingress, HV tether abrasion |
| G | Robot ground-engaging wear parts | ~20 kt/yr excavated × 50–200 g/t wear ÷ ~30% usable fraction | 40 | 70 | Local-manufacture candidate |
| H | Plant ORUs (motors, pumps, separators, sensors, induction PSUs) | ~2.5%/yr of plant mass | 12.5 | 250 | Plant architecture (bom-0-3) |
| I | Plant wear parts (liners, crucible/skull hardware, coils, filters) | Throughput-driven | 48 | 120 | Refractory choice; cold-crucible induction reduces it |
| J | Site power (array segments, battery modules, PMAD, radiators) | 3 MWh × 1.5 replacements central | 45 | 70 | Eclipse cycling: 5 t (free-flyer) to 190 t (15 MWh surface, 4 replacements) |
| — | Subtotal hardware | | 261 | 1,800 | |
| K | Logistics infrastructure (pods, cache fixtures, ground depot, GSE) | 35 pods + depot | (pod tare in mass below) | 90 | |
| L | Logistics engineering, analytics, obsolescence, acceptance | ~8% of hardware | — | 150 | |
| | **Total (deterministic central)** | | **~270 t incl. ~35 t pod tare and ~25 t residual safety stock, less double-counts** | **~2,040** | |

**Cost-per-mass basis used:**

| Category | Basis |
|---|---|
| Precision electronics and mechanisms | $20–40k/kg |
| Robots | $8–10k/kg |
| Thrusters in production quantity | ~$7.5k/kg (~$1.5M per 100 kW unit) |
| Arrays | $30–150/W (central $75/W ≈ $13k/kg) |
| Space-hardened Li-ion packs | $1.5–6/Wh |
| Qualified wear parts | $1.5–3k/kg |

These are recurring production costs. Spares NRE sits with the parent item in bom-0-11.

**Two consequential observations**
- **Cost and mass are concentrated in different places.** Tugs are about 46% of cost and about 30% of mass. Wear parts plus batteries are about 13% of cost and about 50% of mass.
  - Cost reduction comes from thruster life and commonality.
  - Mass (launch) reduction comes from wear-part local manufacture and from killing eclipse cycling.
- **Thruster life is the single largest swing.** At 15 kh life the A-line roughly doubles; at 60 kh it roughly halves to cathode-dominated.

  Magnetically shielded Hall thrusters have demonstrated pole/channel erosion lifetimes well beyond 30 kh on xenon. The open question is cathode and wall-material behaviour on iodine (reactive, corrosive) or argon (poor Hall efficiency at this scale). This is why D-05's life tests directly gate this budget.

---

## 6. Subsystems breakdown and interfaces

### 6.1 Programme work breakdown

```
bom-0-14 Spares & Replacements
├── 14.1 Logistics Engineering (0A+0B)
│    ├── PD-ORU-1 interface standard & conformance testing
│    ├── Multi-echelon sparing model + Monte Carlo traffic coupling
│    ├── Reliability database (ground life tests, pathfinder, fleet)
│    └── Obsolescence & lifetime-buy management (EEE, rad-hard)
├── 14.2 Initial Provisioning (0B, procured T-30 to T-0 months)
│    ├── NEA forward depot load (~80–110 t, ~$500–700M)
│    └── SEL1 cache load (~25–40 t)
├── 14.3 Sustaining Replenishment (0B, years 1–10)
│    ├── Tug ORU stream (A–D)
│    ├── Robot stream (E–G)
│    ├── Plant stream (H–I)
│    └── Site-power stream (J)
├── 14.4 Logistics Infrastructure
│    ├── Logistics Pods (25–45)
│    ├── Ground depot, kitting, acceptance test sets
│    └── Cache/depot fixtures (to bom-0-13 / bom-0-3 interface specs)
├── 14.5 Block-Upgrade ORUs (10–15% of 14.3, inside the totals)
└── 14.6 [OPTION, gated] Local Fabrication Cell for Fe-Ni wear parts
```

### 6.2 Interface matrix

| Item | Interface | bom-0-14 provides | bom-0-14 needs |
|---|---|---|---|
| bom-0-2 Robots | ORU partitioning, PD-ORU-1, attrition policy | Interface standard, stock, replacement units | MTBF/life predictions, FMECA, robot-to-robot swap capability |
| bom-0-3 Plant | Wear-part and ORU partition; gantry | Wear-part stream | Throughput-to-wear model, gantry rated for Class L |
| bom-0-4 Tugs | Thruster/PPU ORUs, pod hardpoint, N+k | Spares, pod | One outbound pod slot per tug; thruster ORUs swappable at SEL1 |
| bom-0-5 Power | Array segment/battery ORU sizes | Replacement modules | Eclipse profile decision; PMAD ORU sizes ≤ Class M |
| bom-0-8 Launch | Mass manifest | 15–60 t/yr manifest, pod envelope | Launch cadence ≥4/yr to SEL1 or rideshare |
| bom-0-9 / -10 Comms, Ops | Inventory/PHM telemetry, reorder decisions | Data model, Maintenance Executive software requirements | 1–10 kbps average allocation, burst imagery for failure analysis |
| bom-0-11 NRE | Life tests | Test priorities from the sparing model | Weibull parameters for top-20 drivers |
| bom-0-12 Pathfinder | Swap demonstration | Test ORUs (S/M), conformance kit | Flight demo slots, ≥200 robot-hours of failure data |
| bom-0-13 SEL1 node | Cache and servicing | Cache contents, fixture spec | Manipulator for Class L, 25–40 t storage, 1–3 kW heater power |
| bom-0-15 Debris | Retention | Scrap/retention pods, non-shedding packaging | Threshold and compliance method |
| bom-0-16 Propellant | Material compatibility | Compatibility constraints on feed-system ORUs | Final propellant (D-05) |
| bom-0-17 Contingency | Risk above P50 | Quantified P50–P90 delta (~$1.4B) | — |

---

## 7. Autonomy, control and communications

**Maintenance Executive (ME), onboard the site controller**
- Runs prognostics and health management (PHM) on every ORU: current signatures, vibration, temperature, thruster discharge oscillation, battery impedance.
- Schedules pre-emptive swaps during low-production windows.
- Tracks inventory by serial number and maintains a digital twin of depot contents.

**Light time and supervision**
- NEA one-way light time is 2–20 min, depending on the target and epoch.
- Swaps therefore execute autonomously. Ground approves in a supervisory mode for criticality-1 swaps; routine Class-S/M swaps proceed without ground approval.
- Safe-mode rule: a failed swap leaves the ORU latched or parked, never free.

**Verification before install**
- The robot reads the ORU electronic ID and optical code.
- The ME confirms the part number, configuration revision and shelf-life status.
- A built-in test runs before the ORU is returned to service.
- Wrong-revision installs are blocked in software.

**Reorder logic**
- Lead-time-aware (s, S) policy, run on the ground in bom-0-10, using fleet telemetry.
- Reorders roll into the next available outbound pod. Monthly reconciliation runs against the digital twin.

**Data budget**
- Inventory and PHM summary: about 1–10 kbps average.
- Failure-event imagery and teardown video: 1–5 GB per event, with 10–40 events per year.
- This is well inside any credible bom-0-9 allocation and is not a driver.

**Cannibalisation policy**
- Allowed by rule, with a designated "donor" robot retired when fleet availability exceeds target.
- The ME must prevent a cannibalisation spiral: never strip more than one operating unit to restore another.

---

## 8. Manufacturing considerations

### 8.1 Earth production strategy

**Keep the thruster and PPU line warm.** About 30–50 thrusters per year is a genuine production rate. Spares and the initial tug build should share one line and one supplier qualification. A lifetime buy for thrusters is wrong, because the design will change with life data.

**Make a lifetime buy of rad-hard EEE parts at KDP-0B.**
- Scope: processors, FPGAs and HV power semiconductors, for 12–15 years of demand plus 30%.
- Cost: about $40–80M inside line L.
- Rationale: obsolescence of rad-hard parts on a 10-year horizon is close to certain.

**Batch acceptance for wear parts; full functional test for precision ORUs.**
- Thermal-vacuum testing applies to sample units per lot (1 in 5 to 1 in 10), not every unit.
- This is about 30% cheaper than per-unit TVAC and is justified by commonality and production volume.

**Shelf life**
- Spares spend up to 3 years in transit and depot.
- Qualification (bom-0-11) must include a 3-year storage-equivalent test for batteries, lubricants, adhesives and HV insulation.

### 8.2 Configuration control

All spares are built to the frozen baseline (§1 re-assessment directive). Block upgrades are issued as new part numbers with a documented form-fit-function interchange. Mixed-revision fleets are expected and tracked.

### 8.3 Optional 0B Local Fabrication Cell (LFC)

**What it would do:** produce simple wear parts from local Fe-Ni product, such as cutter bodies, bucket edges, liner backing plates and structural brackets.

**Material issues**
- Native kamacite (Fe with ~5–7% Ni) is soft, about 150–200 HV, and makes poor wear parts unalloyed.
- Troilite (FeS) inclusions risk sulfur embrittlement.

**Candidate routes**
- Sinter or cast Fe-Ni bodies with hardfacing from imported WC-Co powder. The import is about 5–10% of part mass.
- Alloy with an imported C/Cr/Mo masterbatch.

**Value and cost**
- Potential saving: 40–80% of G+I mass (35–70 t over 10 years), or about $50–250M of avoided launch at bom-0-8 rates.
- Hardware saving is small, about $50–100M.
- LFC cost: $60–150M including qualification.

**Recommendation:** carry the LFC as a gated option decided around 0B year 3, using in-situ wear data. Do not carry it in the baseline. It is TRL 2–3 today.

---

## 9. Development roadmap and technology readiness

### 9.1 Critical technologies

| Technology | Current TRL | Needed for internal 0A milestone | Needed at KDP-0B | Project-ending? | Demo path |
|---|---|---|---|---|---|
| Robotic ORU swap, Class S/M, on NEA surface in dust | 3–4 (lunar dust-connector lab work; free-space servicing flown) | 4–5 | **6, no waiver** | Yes | bom-0-12 pathfinder: ≥20 swaps, ≥3 ORU types incl. one HV connector |
| Dust-tolerant HV (1–3 kV) connector | 3 | 4–5 | **6, no waiver** | Yes (robot power depends on it) | Vacuum dust chamber ≥100 mate cycles, then pathfinder |
| Class-L ORU swap in free space (thruster, array segment) | 6–7 for cooperative interfaces (commercial GEO servicing, station robotics) | 5 | **6, no waiver** | Yes (tug fleet unsustainable otherwise) | Cislunar or LEO demo with a PD-ORU-1 Class-L interface; free space is a relevant environment |
| 100 kW-class EP life on selected propellant | 2–3 at this power on iodine (small iodine thrusters have flown) | Wear mechanism identified | Life ≥50% of design life on ground test with validated wear model | Not alone (more spares can cover a short life), but cost-ending above about 2× the budget | bom-0-11 life tests |
| Multi-echelon sparing models | 9 (terrestrial) | — | Validated on pathfinder failure data | No | 0A analytics |
| PHM for ORUs | 5–6 | 5 | 6 | No | Pathfinder |
| 3-year storage of batteries and lubricants in deep-space thermal conditions | 5 | — | 6 | No | Ground storage test |
| Local Fe-Ni wear-part fabrication | 2–3 | — | Not needed (option) | No | 0B option |

### 9.2 Schedule (relative; T0 = first 0B production)

```
        0A ─────────────────────────────────────►│KDP-0B│ 0B ─────────────────────►
Year:  -7   -6   -5   -4   -3   -2   -1    T0   +1 ... +10
14.1   [PD-ORU-1 v1]──[v2 after pathfinder]
       [Sparing model v1]──[validated w/ pathfinder data]──[fleet-calibrated]──►
       [Reliability DB]────────────────────────────────────────────────────────►
12     (pathfinder swap demos)   [■■■]
                                   │KDP-0B: TRL6 swap+HV conn+ClassL
14.2                                    [IP procurement T-30..T-0]
                                        [EEE lifetime buy]
14.3                                                  [sustaining ~$200M/yr]──►
14.6                                                       [LFC gate ~T+3]
```

**Initial provisioning risk.** IP must be committed 24–30 months before T0. That is effectively at or just before KDP-0B. Under D-02, this commitment is part of the irreversible KDP-0B decision, and bom-0-14 cannot pre-commit IP before the gate.

**Recommendation:** fund a long-lead authorisation of only $50–80M for EEE and thruster-line slots about 6 months before KDP-0B. This is reversible at roughly 50% recovery.

---

## 10. Cost analysis

### 10.1 0A (enabling, $20–50M; central $30M)

| Element | Range ($M) | Basis |
|---|---|---|
| PD-ORU-1 standard, conformance hardware, dust-chamber tests of interface (not HV connector qualification, which is bom-0-11) | 6–15 | 8–15 FTE × 3 yr + test articles |
| Sparing model and reliability database | 4–10 | 5–8 FTE × 4 yr, tools |
| Test ORUs for pathfinder (5–12 units, S/M) | 6–15 | $1–1.5M each, flight-quality |
| Obsolescence/lifetime-buy study, supply-chain audit (coordinated with D-05 audit) | 2–5 | |
| Logistics Pod and SEL1 cache concept to PDR | 2–5 | |

### 10.2 0B (10-year campaign)

| Line | P10 | P50 | P90 | Notes |
|---|---|---|---|---|
| Tug ORUs (A–D) | 400 | 920 | 1,700 | Thruster life and propellant dominate |
| Robot stream (E–G) | 220 | 440 | 900 | Attrition rate dominates |
| Plant stream (H–I) | 180 | 370 | 750 | |
| Site power (J) | 25 | 70 | 260 | Eclipse cycling dominates |
| Infrastructure and logistics engineering (K–L) | 130 | 240 | 380 | |
| **Total (correlated Monte Carlo, not a sum of extremes)** | **~1,100** | **~2,040** | **~3,400** | |
| Of which initial provisioning (pre-T0) | 400 | 600 | 900 | |
| Of which steady state, per year | 70 | 145 | 250 | |
| **Earth-imported mass** | 150 t | 270 t | 600 t | → bom-0-8 |
| Launch of that mass (bom-0-8, not here) | 150 | 550 | 1,800 | At $1,000–3,000/kg to SEL1 |

**Carrying recommendation:** put P50 ($2.0B) in bom-0-14. The P50–P90 increment (~$1.4B) goes to bom-0-17 as a named, quantified risk.

**Scaling rule for the 0B gate** (the gate will resize 0B to signed Phase 1 demand under D-01):

> Annual spares ≈ $24M (fixed logistics) + $4.4M × (installed tug MWe) + $68M × (product kt/yr ÷ 1.3)^0.7

For a minimal 0B (10 tugs × 1.0 MWe, 0.6 kt/yr) this gives about $110M/yr, or ~$1.1B over 10 years. For a large 0B (18 × 2.5 MWe, 2.5 kt/yr) it gives about $340M/yr, or ~$3.4B.

### 10.3 Where I disagree with the round-2 figures

| Round-2 proposal | My view | Why |
|---|---|---|
| Claude $0.5–1.5B | **Too low** unless 0B is at its minimum size | Appears to under-weight tug thruster wear-out (~$450M central on its own) and robot attrition (~$140M). It overlaps my P10–P30 only for a ~10 MWe tug fleet. |
| GPT $0.8–2.5B excl. robots | **Right magnitude for the non-robot content** (my non-robot P50 ≈ $1.6B), **but excluding robots is a scope hole** | The accepted scope explicitly includes robots. Robot replacement belongs either here or in bom-0-2. I recommend here, so bom-0-2 means "initial fleet" and attrition is managed with the other sustaining flows. My robot stream adds $0.2–0.9B. |
| Gemini 20% inventory buffer | **Reject as a method** | (1) It mixes structure (0% demand) with wear parts (~250% over 10 years). (2) It has no time basis, and an inventory buffer is not a pipeline over a 3-year lead time. (3) It omits pod logistics, obsolescence and upgrades. Numerically, 20% of ~$5B installed 0B hardware is ~$1B, which lands near my P10 by coincidence. |
| All three | **No time basis was stated** | Spares cost is a rate. I normalise to a 10-year campaign plus $/yr and $/t-product, so the 0B gate can rescale. |
| All three | **Launch of spares was not separated** | Spares mass (150–600 t) is a material bom-0-8 driver and must appear in its manifest explicitly. |

**Headline metric for the economics gate:**
- P50 spares cost is $2.0B over ~13 kt delivered, about $155/kg of product.
- With spares launch added, it is about $200/kg.

---

## 11. Risk assessment

| # | Risk | L | C | Mitigation | Residual owner |
|---|---|---|---|---|---|
| R1 | EP thruster or cathode life on iodine or argon <50% of the 30 kh assumption | M-H | H (+$0.4–1.0B) | Gate on bom-0-11 life data; cathode-only ORU design; keep a magnetically shielded architecture; D-05 alternate | bom-0-14 / -11 / -16 |
| R2 | Robot attrition >20%/yr (anchoring failure, tether severance, dust) | M | H | Pathfinder attrition data at KDP-0B; robots designed for robot-to-robot recovery; tether ORU | bom-0-2 / -14 |
| R3 | Dust-tolerant HV connector fails qualification | M | Project-ending | Two parallel designs in 0A (shuttered contact and inductive); fallback of a hard-wired tether swapped as a whole reel ORU | bom-0-11 / -14 |
| R4 | Common-mode design defect across the fleet (e.g., PPU module batch) | M | H | Lot diversity, early-life burn-in, block-upgrade budget, fleet-wide recall capacity in pods | bom-0-14 |
| R5 | Rad-hard EEE obsolescence | H | M | Lifetime buy at KDP-0B; form-fit-function redesign budget | bom-0-14 |
| R6 | Lead-time stock-out at NEA because a pod misses its tug | M | M-H | 3-year safety stock; ≥2 pods always docked; any outbound tug can carry any pod | bom-0-14 / -10 |
| R7 | Battery cycling if site is on a rotating surface | M | M (+$0.1–0.2B, +100 t) | Push bom-0-5 to an eclipse-free array; thermal storage | bom-0-5 |
| R8 | Shelf-life degradation in a 3-year pipeline | L-M | M | Storage qualification; FIFO by ME; SOC/thermal control in pods | bom-0-14 |
| R9 | Cannibalisation spiral collapses fleet availability | L | H | ME rule limits; donor-unit policy | bom-0-10 |
| R10 | Failed-ORU retention mass becomes a debris liability | L-M | M (licence) | Sealed retention pods; no jettison; bom-0-15 compliance audit | bom-0-15 |
| R11 | Launch cadence to SEL1 insufficient (<4/yr) | M | M | Pod design compatible with multiple launchers; rideshare; buffer at SEL1 | bom-0-8 |
| R12 | 0B sized differently at the gate, invalidating IP | M | M | IP committed only at KDP-0B; parametric scaling rule (§10.2) | bom-0-14 |

---

## 12. Open engineering questions

1. **Thruster wear on the selected propellant.** What are the cathode and wall-erosion lifetimes of a 100 kW-class thruster on iodine, and on argon? Does argon force a different thruster class (RF gridded, or other), with different ORU sizes? This is the largest single budget lever.

2. **Robot attrition physics.** What is the realistic annual loss rate for tethered robots working ordinary-chondrite regolith in milli-g? The pathfinder must log at least about 200 robot-hours of fault data to bound it.

3. **Eclipse cycling.** Will the bom-0-5 site power avoid eclipse? This alone moves spares mass by up to about 150 t.

4. **Wear rates.** What are the ground-engaging-tool and liner wear rates (g/t) in regolith and boulder simulant under vacuum? Terrestrial values of 10–200 g/t may not transfer because of vacuum cold-welding and the absence of lubricating films.

5. **Tug repair location.** Should tugs be serviced only at SEL1? Or should NEA site robots carry Class-M tug spares for contingencies, accepting duplicate inventory? Current view: a minimal Class-S/M tug contingency kit only at the NEA (~2 t).

6. **N+k thruster redundancy versus spares.** What thruster and PPU redundancy per tug minimises the combined cost of tug mass and spares, while meeting ≥99% completion of a round trip without service? A joint trade with bom-0-4 is needed.

7. **Local manufacture.** Is Fe-Ni with imported hardfacing durable enough to replace Earth wear parts? What import fraction makes the LFC break even against bom-0-8 launch prices?

8. **Ownership boundary at SEL1.** Does the SEL1 node manipulator (bom-0-13) carry the Class-L servicing role, or does bom-0-14 need its own servicing free-flyer? Current view: node manipulator, specified by bom-0-14.

9. **Failed-unit return.** How many failed units should return to SEL1 for root-cause analysis, and is in-situ imaging enough for the top-20 failure modes?

10. **Licensing and retention.** What retention requirement will the licensing state impose on failed ORUs, under D-03 ALARP? Will scrap need eventual disposal rather than indefinite retention?

11. **If D-04 flips.** If the 0B gate moves the receiving node away from SEL1, does the hub move with it? How much of the SEL1 cache investment (fixtures, ~$20–40M) is stranded?

---

**Bottom line:** fund 0A at about $30M to deliver the interface standard, the sparing model, and the TRL-6 swap evidence that KDP-0B requires. Carry 0B at P50 $2.0B over 10 years, with about $1.4B of P90 risk in bom-0-17 and 150–600 t of spares mass in the bom-0-8 manifest. Then cut the number by buying reliability where the leverage is: thruster life, robot actuator MTBF, eclipse-free site power, and commonality.