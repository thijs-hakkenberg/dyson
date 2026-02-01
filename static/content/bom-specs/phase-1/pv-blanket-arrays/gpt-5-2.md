---
bomId: "bom-1-2"
itemName: "PV Blanket Arrays"
itemSlug: "pv-blanket-arrays"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-01"
phase: "phase-1"
---

## PV Blanket Arrays — Phase 1 Initial Swarm Deployment (Project Dyson)  
**Proposal author:** Space systems engineering lead (PV power & deployables)  
**Scope:** A manufacturable, high-throughput photovoltaic “blanket array” product line suitable for early Dyson swarm power generation: lightweight, rollable, modular, autonomously deployed, and compatible with mass production and in-space assembly.

---

# 1) Recommended Approach & Design Philosophy

### 1.1 Philosophy: “Manufacturing-first, deployment-second, performance-third”
For Phase 1, the dominant cost and schedule drivers are **throughput, yield, and reliability**—not absolute peak efficiency. The PV blanket array should be:

1. **Simple to manufacture in volume** (roll-to-roll lamination, minimal exotic materials).  
2. **Simple to deploy and operate** (few moving parts, high tolerance to partial damage).  
3. **Modular and repairable** (tile/strip replacement, graceful degradation).  
4. **Radiation/thermal tolerant at 1 AU** (UV, proton events, atomic oxygen not relevant in deep space; micrometeoroids and thermal cycling are).

### 1.2 Recommended architecture: **Rollable PV blanket + perimeter booms + segment-level MPPT**
A proven space approach is a **thin-film/ultrathin cell blanket** tensioned by **deployable booms**. The key Phase 1 upgrade is **distributed power electronics**: MPPT per segment to handle shading, damage, and cell mismatch.

### 1.3 Orbit/operating assumption (Phase 1)
- **Heliocentric orbit near 1 AU** (or slightly inside, e.g., 0.8–1.0 AU), not close-solar.  
- **Solar constant:** 1361 W/m² at 1 AU.  
- **Array pointing:** Sun-normal within ±5° most of the time using low-torque attitude control.  
- **Lifetime target:** 5 years per unit (Phase 1), with replace/augment strategy.

---

# 2) Technical Specifications (Baseline Product)

I propose a **family** of blanket arrays, with one baseline “workhorse” unit optimized for early swarm scaling.

## 2.1 Baseline unit: **PD-PVBA-250** (≈250 kW class at 1 AU)

### Geometry & deployment
- **Active PV area:** 1,200 m²  
- **Blanket shape:** 30 m × 40 m rectangle (active), with 0.5 m perimeter margin for harnessing and reinforcement  
- **Stowed volume:** ~1.2 m³ (rolled blanket) + booms/electronics ~0.6 m³ → **~1.8 m³ total**  
- **Deployment method:** motorized spool-out + passive tensioning booms (4 perimeter booms)

### Electrical performance assumptions
Assumptions (explicit):
- **Cell technology:** high-efficiency thin, flexible III–V or perovskite/Si tandem on metal/polyimide carrier  
- **Beginning-of-life (BOL) cell efficiency:** 28% (conservative for near-term high-end flexible)  
- **Packing factor:** 0.90 (interconnect gaps, margins)  
- **End-of-life (EOL) derating over 5 years:** 0.85 (radiation + micrometeoroids + thermal cycling)  
- **Cosine loss:** average 0.98 (good pointing)  
- **Soiling:** negligible (deep space)

Power:
- **BOL power density (electric):** 1361 × 0.28 × 0.90 ≈ **343 W/m²**  
- **BOL output:** 343 × 1200 ≈ **412 kW**  
- **EOL output (5 yr):** 412 × 0.85 ≈ **350 kW**  
- **Nameplate rating (marketing):** **~400 kW BOL**  
- **Delivered bus power after conversion & wiring:** assume 95% → **~390 kW BOL**, **~330 kW EOL**

### Mass budget (target)
Assumptions:
- Blanket areal mass (cells + substrate + encapsulation + conductors): **0.35 kg/m²** (aggressive but plausible with ultrathin cells; if using more conventional flexible, 0.5–0.8 kg/m²)  
- Booms + deployment hardware: 120 kg  
- Power electronics (distributed MPPT + PDU): 80 kg  
- Harness, sensors, structure margin: 70 kg

Mass:
- Blanket: 1200 × 0.35 = **420 kg**  
- Total dry mass: 420 + 120 + 80 + 70 = **690 kg**  
- **Specific power (BOL delivered):** 390,000 W / 690 kg ≈ **565 W/kg**  
- **Areal power (BOL):** 390,000 W / 1200 m² ≈ **325 W/m²**

This is intentionally “mid-risk”: not the absolute lightest possible, but scalable.

### Thermal/environment
- Operates in vacuum, radiative equilibrium.  
- Expect blanket temperatures **~250–330 K** depending on emissivity and backsheet design.  
- Use high-emissivity backsheet to limit temperature and improve efficiency.

---

# 3) System Architecture

## 3.1 High-level block diagram

```
                 +------------------------------+
                 |        PV Blanket (1200 m²)  |
                 |  Segments S1..S48 (25 m² ea) |
                 +---------------+--------------+
                                 |
                                 | HV DC strings (200-600 V)
                                 v
                 +------------------------------+
                 | Distributed MPPT Modules     |
                 | (1 per segment, hot-swappable|
                 +---------------+--------------+
                                 |
                                 | Regulated HVDC (e.g., 800 V bus)
                                 v
+---------+     +------------------------------+      +------------------+
| ADCS    |<--->| Power Distribution Unit (PDU)|<---->| Payload / Link / |
| + GNC   |     | contactors, fuses, telemetry |      | Propulsion bus   |
+---------+     +------------------------------+      +------------------+
      ^                     ^
      |                     |
      |                     v
      |            +------------------+
      +----------->| Avionics / C&DH  |
                   | autonomy, comms  |
                   +------------------+
```

## 3.2 Mechanical deployment concept (ASCII)

```
Stowed (side view):                     Deployed (top view):
+-------------------+                   +----------------------------------+
| Blanket roll      |                   |  Boom----30 m----Boom            |
| on drum/spool     |                   |  |----------------------------|  |
| + boom canisters  |   ---> deploy --> |  |  PV blanket 30 x 40 m      |  |
+-------------------+                   |  |  segmented + ripstop grid  |  |
                                        |  |----------------------------|  |
                                        |  Boom----30 m----Boom            |
                                        +----------------------------------+
```

Key: **ripstop reinforcement grid** limits tear propagation after micrometeoroid punctures.

---

# 4) Subsystems Breakdown & Interfaces

## 4.1 PV blanket laminate
**Functions:** convert sunlight to DC power; survive thermal cycling; tolerate punctures.

**Layer stack (front to back, indicative):**
1. **Front cover:** 25–75 µm radiation-hard fluoropolymer (e.g., FEP) or thin ceria-doped cover film  
2. **Cell layer:** flexible cells in strings, with redundant interconnect paths  
3. **Encapsulant:** space-rated silicone/adhesive  
4. **Substrate:** polyimide or thin metal foil carrier (metal improves thermal spreading, micrometeoroid robustness)  
5. **Backsheet:** high-emissivity coating (AZ-93-like equivalent or sputtered oxide) to radiate heat  
6. **Embedded conductors:** aluminum/copper mesh or printed conductors; sized for <2% resistive loss per segment

**Interfaces:**
- Electrical: segment outputs to MPPT modules via flex harness  
- Mechanical: attachment points to perimeter booms and tension cords  
- Data: temperature/IV sensors per segment to C&DH (via MPPT module)

## 4.2 Distributed MPPT modules (48 modules @ 25 m² each)
**Rationale:** limits mismatch losses; isolates failed segments; enables graceful degradation.

- MPPT input: 200–600 V variable (string-dependent)  
- MPPT output: regulated **800 V DC bus** (recommend HVDC to reduce harness mass)  
- Power per module (BOL): 8–10 kW typical  
- Efficiency: 98% target at nominal  
- Radiation tolerance: Phase 1 goal 10–30 krad(Si) with shielding; design for solar particle events with latch-up protection  
- Hot-swap capable via solid-state disconnect + precharge

**Interfaces:**
- HVDC bus to PDU  
- Telemetry: voltage/current/temp, fault flags  
- Commands: enable/disable, MPPT mode, safe mode

## 4.3 Power Distribution Unit (PDU)
- Bus: **800 V DC** primary  
- Outputs: configurable (e.g., 28–120 V via DC/DC modules for avionics/actuators; optional direct HV output if powering electric propulsion or beaming payload)  
- Protection: contactors, current limiting, arc-fault detection  
- Energy storage: Phase 1 optional; if needed, small battery (1–5 kWh) for eclipse/contingencies. Many heliocentric orbits avoid eclipses; storage can be minimized.

## 4.4 Deployment system
- Spool/drum with motor + brake  
- 4 perimeter booms (tape-spring or coilable longerons)  
- Tensioning cords and corner hardpoints  
- Sensors: deployment length encoders, tension estimation, camera or photodiodes for verification

**Interfaces:**  
- Power from PDU low-voltage rail  
- Commands from avionics  
- Deployment status telemetry

## 4.5 ADCS (attitude determination and control)
For a large, low-mass blanket, torques from solar pressure matter.

- Actuators: reaction wheels + magnetic torquers are useless heliocentrically; use **reaction wheels + cold gas or electric microthrusters** for momentum dumping.  
- Sensors: coarse sun sensors + star tracker (optional) + IMU  
- Control mode: Sun-pointing with slow slews; keep array normal within ±5°.

**Assumption:** solar radiation pressure ~4.5 µN/m²; for 1200 m², force ~5.4 mN. With offset CP/CM, torque can be significant—design CM alignment and trim tabs.

## 4.6 Communications & avionics
- Intra-swarm: UHF/S-band mesh (short range)  
- Earth link: not required per unit if swarm-managed; a subset acts as gateways  
- Autonomy: required for deployment, fault isolation, safeing

---

# 5) Autonomy, Control, and Communication Requirements

## 5.1 Autonomy functions (must-have)
1. **Autonomous deployment sequencing** with abort/retry and tension monitoring.  
2. **Segment health management:** detect degraded IV curve, isolate segment, reconfigure MPPT.  
3. **Attitude safe mode:** Sun-safe pointing to avoid thermal runaway and minimize torque.  
4. **Solar storm response:** enter “storm mode” (reduce bias, isolate vulnerable electronics, reorient if needed).  
5. **Micrometeoroid damage handling:** detect sudden string open/short, re-route around damage.

## 5.2 Control requirements
- Pointing knowledge: ~1–2° (sun sensors)  
- Pointing control: ±5° typical; ±10° survival  
- Structural mode damping: avoid exciting blanket flutter; slew rates limited.

## 5.3 Communications
- Telemetry budget per unit: low (kbit/s class)  
- Required data: power output, segment status, ADCS state, deployment status, temperatures  
- Commanding: mode changes, MPPT config, firmware updates (secure boot)

---

# 6) Manufacturing Considerations (Phase 1 scaling)

## 6.1 Manufacturing strategy
**Goal:** move toward **roll-to-roll PV blanket fabrication** with standardized segment sizes.

- Segment module: 5 m × 5 m (25 m²) electrically independent tile/strip  
- Lamination line: substrate unwind → cell placement/printing → interconnect → encapsulation → cover film → test → rewind  
- Final assembly: integrate segments into 30×40 m blanket with ripstop grid + harness trunk lines.

## 6.2 Materials and supply chain risks
- III–V flexible supply is constrained and expensive; perovskite tandem is promising but stability risk.  
- Recommendation: **two-track procurement**:
  - Track A: flexible III–V (higher cost, known space heritage) for first flight articles  
  - Track B: tandem thin-film (perovskite/Si or CIGS tandem) for cost-down once validated

## 6.3 Test and QA
- 100% segment IV testing at multiple illumination/temperature points  
- Thermal vacuum cycling of coupons and full segment units  
- Hail/microparticle impact analog testing on coupons (hypervelocity facilities as budget allows)  
- Arc-fault and HV insulation testing for 800 V bus

---

# 7) Development Roadmap & TRL

## 7.1 Current TRL estimates (typical)
- Rollable blanket deployment: **TRL 7–9** (heritage exists)  
- Distributed MPPT at segment scale: **TRL 5–7** (needs integration and radiation testing)  
- Ultralight flexible high-efficiency cells: **TRL varies (4–8)** depending on tech  
- HVDC 800 V spacecraft bus: **TRL 5–7** (common in some EP systems; needs arc management)

## 7.2 Roadmap (opinionated)
**Phase 1A (0–12 months):**  
- Freeze architecture: segment size, bus voltage, deployment method  
- Build and test 1–2 full-scale segments (25 m²) + MPPT  
- Coupon radiation/UV/thermal cycling tests  
- Deployment rig ground demos (gravity offload)

**Phase 1B (12–24 months):**  
- Build 1/4-scale blanket (e.g., 15×20 m) flight-like deployment test in thermal vacuum (if possible)  
- HV bus arc-fault characterization  
- Software autonomy v1 (fault isolation, safe mode)

**Phase 1C (24–36 months):**  
- First orbital demo (single unit or half-size)  
- Validate degradation model, micrometeoroid damage response, pointing control

**Phase 1D (36–60 months):**  
- Production ramp: 10–100 units/year equivalent  
- Standardize interfaces for swarm assembly and logistics

---

# 8) Cost Analysis & Budget Estimates (Phase 1)

Costs vary wildly with cell technology. Below are **order-of-magnitude** estimates with explicit assumptions.

## 8.1 Assumptions
- Early units are not yet at “Dyson-scale” mass production; think **dozens** of units.  
- Launch costs excluded unless requested; proposal focuses on PV blanket array product cost.  
- Flexible III–V cost can be **$1,000–$10,000/m²** today depending on vendor and spec; thin-film could be far lower once mature.

## 8.2 Non-recurring engineering (NRE)
- Architecture, power electronics, deployment, software, qualification: **$120M–$250M** over ~3–5 years  
  - PV blanket development & qualification: $40–80M  
  - MPPT/PDU HV architecture: $30–60M  
  - Deployment mechanism & structural testing: $20–50M  
  - Autonomy software & avionics integration: $15–30M  
  - Environmental testing & facilities: $15–30M

## 8.3 Recurring unit cost (PD-PVBA-250)
Two scenarios:

### Scenario A: “Heritage-first” (flex III–V, low volume)
- PV blanket fabrication: 1200 m² × $2,000/m² = **$2.4B** (dominant)  
- Electronics + booms + integration: **$15–30M**  
- Total per unit: **$2.4B–$2.5B**  
This is not acceptable for a non-profit scaling plan; it’s for first demonstrators only.

### Scenario B: “Scale-first” (thin-film tandem, high throughput)
Assume mature cost: **$50–$200/m²** fabricated blanket.
- PV blanket: 1200 m² × ($50–$200/m²) = **$60M–$240M**  
- Electronics + booms + integration: **$15–30M**  
- Total per unit: **$75M–$270M**

**Recommendation:** fund Phase 1 around Scenario B economics, but **fly early demos** with whatever cell tech is available, even if expensive, to validate deployment + autonomy.

## 8.4 Cost per delivered watt (BOL)
Using Scenario B mid: $150M unit / 390 kW ≈ **$385/W** (still high).  
The path to meaningful swarm economics requires **order(s) of magnitude reduction**—which comes from:
- much larger production volumes,
- in-space manufacturing later phases,
- cheaper PV materials.

Phase 1 is about proving the platform and manufacturing learning curves.

---

# 9) Risk Assessment

## 9.1 Top technical risks
1. **Blanket tear propagation / deployment snag**  
   - Mitigation: ripstop reinforcement grid; segmented architecture; extensive ground deployment testing; conservative tension margins.

2. **HVDC arcing and insulation breakdown (800 V)**  
   - Mitigation: spacing rules, conformal coatings, potting, arc-fault detection, gradual ramp-up, segment isolation.

3. **Cell tech stability (if perovskite-based)**  
   - Mitigation: dual-source cell tech; accelerated life testing; start with more proven cells for first flight.

4. **Solar radiation pressure torque & attitude instability**  
   - Mitigation: CM alignment, passive aerodynamic-like trim (reflective tabs), robust ADCS with microthrusters.

5. **Micrometeoroid damage**  
   - Mitigation: redundancy in interconnects, segment-level isolation, accept degradation, oversize initial power.

## 9.2 Programmatic risks
- Supply chain for advanced flexible PV  
- Test facility availability for large deployables  
- Cost growth from qualification and yield issues

---

# 10) Open Engineering Questions (need early closure)

1. **Bus voltage selection:** 300–400 V vs 800–1000 V HVDC trade (harness mass vs arcing risk).  
2. **Segment size optimization:** 25 m² vs 10 m² vs 50 m² (fault isolation granularity vs electronics count).  
3. **Cell technology decision:** III–V vs CIGS vs tandem perovskite/Si; define acceptance criteria (EOL power, stability, radiation).  
4. **Thermal design:** back emissivity and temperature impact on efficiency and lifetime; need detailed thermal model.  
5. **Structural dynamics:** flutter modes, control-structure interaction, slew constraints; require coupled FEM + GNC simulation.  
6. **Swarm-level interface:** what does the array power? Local propulsion? Power beaming? Energy storage? This impacts voltage, regulation, and duty cycles.  
7. **Repair/upgrade concept:** do we plan for robotic patching or simply deploy additional units?

---

# Proposed “Best Approach” Summary (opinionated)

For Phase 1, build a **standardized rollable blanket array** around **segment-level MPPT** and **moderate-voltage HVDC**, prioritize **manufacturability and graceful degradation**, and accept that early cost/W is high. The platform’s value is that it becomes the **repeatable unit** the swarm can scale with, while cell technology and manufacturing economics improve.

If you tell me:
- target orbit (1 AU vs 0.7 AU),
- whether power is used locally or beamed,
- desired unit power class (50 kW vs 500 kW),
- and launch/transport constraints,

…I can tighten the design to a specific voltage, segment count, deployment method, and a more defensible cost model tied to your production volume assumptions.