---
bomId: "bom-1-1"
itemName: "Solar Collector Units"
itemSlug: "collector-units"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-01"
phase: "phase-1"
---

Below is my proposed **Solar Collector Unit (SCU)** design for **Project Dyson, Phase 1: Initial Swarm Deployment**. I’m optimizing for (1) rapid manufacturability, (2) high specific power, (3) graceful degradation, and (4) minimal moving parts, while still enabling useful power export and/or beamed power demonstration.

---

## 0) Executive Summary (what I recommend and why)

**Recommendation:** Deploy **many identical, modular “tile” SCUs**—each a **~10 kW-class photovoltaic collector** with **simple 1-axis articulation**, **high-voltage DC power bus**, and optional **beamed-power payload slot**. Use **thin-film PV on a tensioned frame** (or roll-out blanket) with **edge-mounted electronics and radiators**. Prioritize **mass-producible, low-complexity units** rather than fewer large, complex spacecraft.

**Design philosophy:**
- **Mass production beats elegance.** The swarm grows by replication; the unit must be easy to build, test, and launch in bulk.
- **Degrade gracefully.** No single-point failures that kill the unit; accept partial power loss.
- **Keep it cold and simple.** PV efficiency and lifetime depend on temperature and radiation; thermal design is first-class.
- **Operate at high voltage.** Minimize I²R losses and harness mass by distributing power at **~600–1200 VDC** internally.
- **Avoid fragile high-precision pointing in Phase 1.** Demonstrate stable power generation and basic formation operations first; treat precision beaming as an optional module.

---

## 1) Mission Context & Assumptions (explicit)

### Phase 1 objectives (SCU-relevant)
1. Deploy initial swarm elements into **heliocentric orbit** (baseline: near 1 AU, low inclination).
2. Demonstrate:
   - autonomous attitude/orbit maintenance,
   - health monitoring & safe mode,
   - power generation and storage,
   - power export interface (electrical) and optionally **low-power beamed energy demo**.

### Environmental assumptions (1 AU baseline)
- Solar constant: **1361 W/m²**
- PV beginning-of-life (BOL) efficiency: **28%** (space-grade multi-junction or advanced thin-film equivalent)
- PV end-of-life (EOL) after 5 years at 1 AU: assume **20–25% relative degradation** depending on shielding and mission profile; I’ll budget **0.8×** power.
- Average incidence factor due to pointing/seasonal effects: **0.9** (good 1-axis tracking)
- Temperature: design for PV operating **~40–80°C** with radiative cooling.

---

## 2) SCU Concept: “Dyson Tile-10” (DT-10)

### Top-level performance targets
- **BOL electrical output:** ~**10 kW** (at 1 AU, normal incidence)
- **EOL electrical output (5 years):** **~7–8 kW**
- **Specific power (unit-level, including structure, avionics, thermal):** **>150 W/kg** (Phase 1 achievable), stretch **>250 W/kg** with maturation.

### Physical configuration
A **rectangular PV blanket** supported by a lightweight perimeter frame, with a **central spine** containing avionics, comms, attitude sensors, and a **power conditioning module**. One-axis articulation about the spine provides sun tracking without complex gimbals.

#### ASCII concept sketch

```
         Sunlight ->
  +--------------------------------------------------+
  |                 PV Blanket (≈40 m²)              |
  |  (thin-film or multi-junction on polymer)        |
  +--------------------------------------------------+
          |                             |
          |                             |
   [Edge harness]                 [Edge harness]
          |                             |
          +-----------[Spine]-----------+
                      |  Avionics
                      |  PCDU (HV bus)
                      |  Comms
                      |  ADCS sensors
                      |  Reaction wheels (optional)
                      |  Radiators (rear-facing)
                      |
               1-axis hinge/actuator
```

---

## 3) Technical Specifications (DT-10 baseline)

### 3.1 Dimensions & area
- PV active area: **40 m²**
  - Example geometry: **5 m × 8 m** blanket
- Stowed volume: designed for rideshare:
  - Blanket roll/fold + spine: **~0.3 m³** target (depends on packaging)
- Deployed thickness: **<10 cm** effective (blanket + frame)

### 3.2 Mass budget (baseline, opinionated but realistic)
Assuming near-term thin-film blanket with integrated conductors and moderate shielding for electronics.

| Subsystem | Mass (kg) | Notes |
|---|---:|---|
| PV blanket + encapsulation | 20 | ~0.5 kg/m² class (aggressive but plausible for thin-film) |
| Frame/tension system | 12 | CFRP perimeter + tension booms |
| Harness & slip ring/hinge cabling | 3 | HV-rated |
| PCDU (MPPT + HV bus + protection) | 6 | Rad-tolerant power electronics |
| Avionics (OBC, FDIR, GN&C) | 2 | |
| ADCS actuators | 6 | 3 small reaction wheels + magnetorquers not usable heliocentric; include wheels + microthrusters alternative |
| Propulsion (micro) + tank | 6 | cold gas or ionic liquid electrospray; includes propellant |
| Comms (UHF/S-band + patch) | 2 | optical comm optional later |
| Thermal (radiators, heat straps) | 3 | |
| Structure margins (15%) | 9 | |
| **Total** | **69 kg** | Baseline |

**Specific power (BOL):** 10,000 W / 69 kg ≈ **145 W/kg**  
With maturation (lighter blanket, simplified ADCS), **>200 W/kg** is realistic.

### 3.3 Power generation estimate (BOL)
Power ≈ Insolation × Area × Efficiency × Incidence

- 1361 W/m² × 40 m² × 0.28 × 0.90  
= **13.7 kW**

Now subtract:
- wiring + MPPT + conversion losses (~7%): → **12.7 kW**
- thermal/soiling/mismatch margin (~15%): → **10.8 kW**

So **~10–11 kW BOL** is a reasonable delivered DC output.

### 3.4 Electrical output & bus
- Internal collection: strings to **~600–1200 VDC** bus (selectable)
- Export options:
  1. **HVDC direct** via docking/power tether interface (Phase 1 demo)
  2. **Regulated 48 VDC** auxiliary output for hosted payloads
  3. Optional **beamed power module** (see §7)

### 3.5 Energy storage (Phase 1 minimal)
- Battery: **1–2 kWh** Li-ion (space-rated) for safe mode, eclipse events, transients
- Battery mass: **8–12 kg** if included; I kept it implicit in avionics/power mass above—if you want eclipse tolerance at 1 AU heliocentric, you may not need much, but you do need safe-mode reserve.

---

## 4) System Architecture

### 4.1 Functional block diagram

```
         +-------------------+
         |   PV Array (40m²) |
         +---------+---------+
                   |
               (HV strings)
                   |
         +---------v---------+
         | MPPT + Protection |
         |  (PCDU, rad-tol)  |
         +----+--------+-----+
              |        |
          HV BUS    48V BUS (aux)
              |        |
   +----------v--+  +--v----------------+
   | Export IF   |  | Avionics + ADCS   |
   | (dock/tether|  | OBC, FDIR, GN&C   |
   |  or payload)|  | Sensors, Comms    |
   +-------------+  +---------+---------+
                               |
                         +-----v-----+
                         | Propulsion|
                         | (station  |
                         | keeping)  |
                         +-----------+
```

### 4.2 Mechanical architecture
- **Blanket + perimeter frame** for deployment stability.
- **Single hinge line** between blanket plane and spine for coarse sun tracking (±60°).
- **Backside radiators** on spine, always anti-sun.

---

## 5) Subsystems Breakdown & Interfaces

### 5.1 Power subsystem (PCDU)
**Functions**
- MPPT per string group (e.g., 8–16 channels)
- HV bus regulation and fault isolation
- Arc fault detection & isolation (critical at HV)
- Telemetry: IV curves, string health, temperature

**Key specs**
- MPPT efficiency: **>97%**
- HV bus: **600–1200 VDC**, configurable
- Protection: fast solid-state disconnects + pyro backup
- Radiation: target **30 krad(Si)** (Phase 1), with parts screening

**Interfaces**
- PV string connectors (redundant)
- Avionics (CAN-FD or SpaceWire-lite)
- Export port (HVDC + comm handshake)

### 5.2 ADCS (attitude determination & control)
**Phase 1 requirement:** keep array within **±5–10°** of sun vector most of the time; maintain stable comm pointing.

**Sensors**
- Coarse sun sensors (CSS) on corners
- 1× star tracker (optional but recommended for robust inertial knowledge)
- IMU (rad-tolerant MEMS)

**Actuators**
- **Reaction wheels** for fine pointing (3 + optional skew spare)
- **Micropropulsion** for momentum dumping and orbit trim
  - In heliocentric orbit, magnetorquers are ineffective.

**Pointing**
- 1-axis mechanical articulation does most work; wheels trim.

### 5.3 Propulsion (station keeping, formation maintenance)
For early swarm, you need:
- collision avoidance capability,
- slow phasing and spacing control,
- momentum dumping.

**Recommended:** **electrospray propulsion** (ionic liquid) or small **cold gas** for Phase 1 simplicity.
- Electrospray offers high Isp (1000–2000 s) with small prop mass, but more dev risk.
- Cold gas is TRL-high but prop-mass heavy.

**Baseline spec**
- Δv capability: **20–50 m/s** over 2–5 years (enough for phasing, avoidance)
- Thrust: **0.1–5 mN** class (electrospray) or **10–100 mN** (cold gas bursts)

### 5.4 Thermal
- PV efficiency drops with temperature; keep backside radiators on spine.
- Use **high-emissivity coatings** on radiators, low-absorptivity on non-PV surfaces.
- Provide conductive paths from PCDU to radiator.

### 5.5 Communications
**Phase 1 comm goals**
- Telemetry + command at modest rates
- Swarm neighbor discovery and relative nav support (optional)

**Baseline**
- S-band patch antenna, **0.5–2 Mbps** to ground when geometry permits
- UHF backup for safe mode (low rate)
- Inter-satellite link (ISL): optional UHF ranging or S-band crosslink

### 5.6 Flight software & autonomy
**Core autonomy features**
- FDIR: detect string failures, isolate, reconfigure MPPT
- Safe mode: sun-point + minimal comm + thermal survival
- Simple formation rules: maintain keep-out zones, execute avoidance burns
- Time sync: GPS not available heliocentric; use onboard clock + ground updates, or optical nav later.

---

## 6) Control, Autonomy, and Swarm Operations Requirements

### 6.1 Autonomy level (Phase 1)
- **Unit-level autonomy**: high
- **Swarm-level autonomy**: moderate (ground-supervised)

**Why:** early swarm should not rely on continuous ground control; but fully distributed formation control is a Phase 2+ capability.

### 6.2 Navigation
- Absolute orbit determination: ground radiometric + onboard propagation
- Relative: initial approach uses scheduled deployment dispersions; later add ISL ranging.

### 6.3 Fault handling examples
- PV string short: isolate string, reroute MPPT
- HV arc detection: trip HV bus section in <10 ms
- Reaction wheel saturation: dump momentum via microthrusters
- Thermal overtemp: reduce power draw / reorient slightly off-sun

---

## 7) Optional Module: Beamed Power Demonstrator (Phase 1 “nice-to-have”)

I do **not** recommend making beamed power mandatory for DT-10 baseline; it adds pointing, thermal, and regulatory complexity. But a small demo is valuable.

### Option A: Low-power laser (most controllable)
- 1550 nm fiber laser
- Output: **100–500 W optical** (requires ~1–3 kW electrical)
- Aperture: **10–20 cm** telescope
- Pointing: **<100 µrad** for meaningful spot sizes at long range (hard but doable for demo at shorter distances)

### Option B: Microwave phased patch (simpler pointing, larger aperture)
- 5.8 GHz or 2.45 GHz
- Output RF: **200–1000 W**
- Aperture: **1–3 m** equivalent to get decent beamwidth (bulky)

**My stance:** For Phase 1, keep it to **hundreds of watts** and short-range receiver tests (tens to hundreds of km), not Earth beaming.

---

## 8) Manufacturing & Scalability Considerations

### 8.1 PV blanket manufacturing
- Roll-to-roll deposition (CIGS/perovskite tandem is promising but radiation risk) vs. space-grade III-V.
- For Phase 1, I’d choose **space-proven multi-junction cells** *if budget allows*, but mounted on a **light blanket substrate** to reduce structure.
- Encapsulation must handle UV, atomic oxygen (LEO only), and thermal cycling.

### 8.2 Electronics
- Use rad-tolerant power MOSFETs/SiC where possible; derate aggressively.
- Design MPPT boards as identical slices for easy replacement.

### 8.3 Integration/test
- Factory acceptance: IV curve mapping, thermal vacuum bakeout, deployment test (gravity offload), vibration.
- Emphasize **design-for-test**: built-in string-level telemetry, switchable loads.

### 8.4 Launch packaging
- Standardize to a “crate” compatible with ESPA-class rings or rideshare plates.
- Blanket roll with restrained deployment; burn-wire or pin-puller release.

---

## 9) Development Roadmap & TRL

### Phase 1A (12–18 months): Ground prototypes
- PV blanket coupon testing (UV, thermal vacuum, radiation proxy)
- MPPT/PCDU brassboard at full voltage
- Deployment mechanism life testing (100+ cycles)
- ADCS-in-the-loop simulation

**Exit criteria:** full-scale engineering model (EM) producing >8 kW equivalent under solar simulator.

### Phase 1B (18–30 months): Orbital demo (1–3 units)
- Launch 1–3 SCUs to LEO or GTO transfer to validate deployment, power, comm, autonomy.
- LEO adds atomic oxygen risk; mitigate with coatings or choose higher orbit.

**Exit criteria:** >3 months stable operation, validated power and fault handling.

### Phase 1C (30–60 months): Initial swarm tranche (50–200 units)
- Begin batch manufacturing, automate test lines.
- Establish ops center + swarm monitoring software.

**TRL outlook**
- PV arrays: TRL 7–9 depending on cell choice
- HV distribution at kW scale: TRL 5–7 (spacecraft typically lower voltage; needs careful validation)
- Electrospray propulsion: TRL 5–7 (varies by vendor)
- Swarm autonomy: TRL 3–6 depending on ambition

---

## 10) Cost Analysis / Budgetary Estimates (Phase 1)

Costs vary wildly with PV choice and rad-hardness. I’ll provide a **range** and my “most likely” for a non-profit that still needs space reliability.

### Per-unit recurring cost (at scale: 100+ units/year)
- PV blanket (40 m²):
  - space-grade III-V: **$1.0M–$3.0M** (dominant cost)
  - advanced thin-film: **$0.2M–$0.8M** (riskier)
- PCDU + harness (HV): **$150k–$400k**
- Avionics/ADCS: **$100k–$300k**
- Propulsion: **$50k–$250k**
- Structure/thermal/mechanisms: **$80k–$200k**
- Integration & test: **$150k–$500k**

**Total per DT-10 at scale:**
- **Conservative / high-reliability:** **$1.6M–$4.9M**
- **Aggressive low-cost thin-film path:** **$0.7M–$2.1M**

### Non-recurring engineering (NRE)
- Design, qualification, tooling, software, test infrastructure:
  - **$20M–$60M** depending on qualification depth and beamed-power demo.

### Launch cost (Phase 1 tranche)
At ~69 kg each:
- 100 units ≈ 6.9 t to heliocentric transfer.
- Launch: **$30M–$80M** depending on provider and rideshare vs dedicated.
- In-space transfer tug costs not included (major program element).

**Cost per delivered watt (hardware only, BOL)**
- If $1.5M per 10 kW → **$150/W**
- If $0.8M per 10 kW → **$80/W**
Phase 1 is expensive; the goal is learning + scaling down via manufacturing.

---

## 11) Risk Assessment (top items)

### Technical risks
1. **PV blanket durability (radiation, micrometeoroids, UV)**
   - Mitigation: segmented strings, protective coatings, coupon testing, redundancy.
2. **High-voltage arcing and contamination**
   - Mitigation: conservative spacing, conformal coats, arc detection, gradual ramp-up, bakeout.
3. **Thermal runaway / hot spots**
   - Mitigation: string-level monitoring, bypass diodes, thermal straps, operational limits.
4. **Deployment failure**
   - Mitigation: simplest possible deployment, extensive ground cycling, redundant release.
5. **ADCS propellant depletion / wheel failures**
   - Mitigation: low-disturbance design, wheel redundancy, efficient momentum management.
6. **Swarm conjunctions / collision**
   - Mitigation: keep-out zones, deterministic dispersions, minimal cross-plane intersections, onboard avoidance Δv.

### Programmatic risks
- Supply chain for space PV and rad-hard parts
- Test infrastructure cost and schedule
- Launch availability and rideshare constraints

---

## 12) Open Engineering Questions (need answers early)

1. **Orbit regime for Phase 1:** remain near 1 AU Earth-trailing/leading? How much inclination? This drives comm geometry, thermal environment, and collision risk.
2. **PV technology choice:** prioritize TRL (III-V) or cost (thin-film)? What lifetime requirement is acceptable for Phase 1 units (1 year vs 5–10 years)?
3. **Power export concept:** electrical docking/tethers vs beamed power vs purely “generation-only” for now. Phase 1 should pick one clear demonstration.
4. **Unit size optimization:** 10 kW is a sweet spot for handling and packaging, but 1 kW “chips” may scale manufacturing faster; 50 kW units reduce avionics overhead. Need a cost-per-watt vs complexity trade.
5. **Radiation design point:** what total dose and SEP event survivability is required? Impacts shielding mass and electronics selection.
6. **Swarm control concept of operations:** centralized scheduling vs distributed autonomy; what is the acceptable collision probability?
7. **End-of-life strategy:** passivation and disposal orbit? Avoid creating long-term hazards.

---

## 13) My Opinionated “Best Phase 1 Path”

- Build **DT-10** as above with **no beamed power required**, but include a **standard payload bay** (power + data + pointing accommodation) so a subset of units can host a beaming demo later.
- Invest heavily in **HV power management + arc fault protection** and **deployment reliability**—those are the swarm multipliers.
- Use **reaction wheels + microprop** for robust sun pointing; do not overcomplicate with precision gimbals until you have operational data.
- Start with **3–10 pathfinder units**, then ramp to **50–200** with a manufacturing learning curve.

---

If you tell me:
1) target orbit (e.g., Earth-trailing 1 AU, Venus-like, etc.),  
2) whether Phase 1 must include beamed power, and  
3) acceptable unit lifetime (1 year vs 5+ years),  

…I can tighten this into a more formal specification set (ICDs, detailed power/thermal models, and a bottom-up costed BOM).