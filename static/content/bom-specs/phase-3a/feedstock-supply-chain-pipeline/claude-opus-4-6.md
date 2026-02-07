---
bomId: "bom-3-6"
itemName: "Feedstock Supply Chain and Logistics Pipeline"
itemSlug: "feedstock-supply-chain-pipeline"
modelId: "claude-opus-4-6"
modelName: "Claude Opus 4.6"
generated: "2026-02-07"
phase: "phase-3"
---



# Feedstock Supply Chain and Logistics Pipeline
## Technical Proposal for Phase 3 — Matroska Brain Construction
### Project Dyson | BOM-3-6

**Author:** Principal Systems Engineer, Logistics Architecture Division
**Revision:** 1.0
**Date:** 2025

---

## Executive Summary

The Matroska Brain requires the sustained delivery of approximately **10⁹ tonnes/year** of refined and semi-refined feedstock to construction foundries distributed across nested computational shells spanning radii from ~0.1 AU to ~50 AU. This is not a single pipeline — it is a **multi-regime logistics architecture** that must simultaneously operate:

1. **A high-throughput centralized pipeline** from the Main Belt to inner shells (0.1–2 AU)
2. **A distributed direct-consumption network** where outer-shell foundries mine and process local Kuiper Belt Objects (KBOs), Trojans, and Centaurs in situ
3. **A trans-system transfer network** for specialty materials (rare earths, actinides, specific isotopes) that cannot be sourced locally at every shell radius

My core design philosophy: **the supply chain IS the megastructure's circulatory system.** It must be designed with the same rigor as the computational shells themselves, because a 1% throughput shortfall compounds into decade-scale construction delays.

---

## 1. System Architecture Overview

### 1.1 Three-Regime Model

The fundamental insight is that optimal logistics strategy varies dramatically with heliocentric distance. I propose three distinct regimes:

```
                        REGIME MAP (not to scale)
  ┌─────────────────────────────────────────────────────────────────┐
  │                                                                 │
  │  REGIME A: Centralized Pipeline     REGIME B: Hybrid    REGIME C│
  │  (Main Belt → Inner Shells)         (Trojans/Centaurs)  (KBO    │
  │                                                          Direct)│
  │         ☀                                                       │
  │    ···/···\···                                                  │
  │   / Shell 1  \    ← 0.1 AU                                     │
  │  |  Shell 2   |   ← 0.3 AU                                     │
  │   \ Shell 3  /    ← 1.0 AU                                     │
  │    ···\···/···                                                  │
  │         |                                                       │
  │    [Mass Drivers]  ← 2.0–3.5 AU (Main Belt)                    │
  │         |                                                       │
  │    ─────┼─────── 5.2 AU (Jupiter Trojans) ──────               │
  │         |                                                       │
  │    ─────┼─────── 10–30 AU (Centaurs/Scattered Disk) ───        │
  │         |                                                       │
  │    ─────┼─────── 30–50 AU (Kuiper Belt) ────────────           │
  │                                                                 │
  └─────────────────────────────────────────────────────────────────┘

  REGIME A (0.1–5 AU):  Electromagnetic mass drivers on belt asteroids
                         → ballistic cargo slugs → catcher tugs at shells
                         Throughput: ~7 × 10⁸ t/yr

  REGIME B (5–15 AU):   Autonomous mining ships extract Trojans/Centaurs
                         → local refining → slow-boat delivery or
                         secondary mass drivers
                         Throughput: ~2 × 10⁸ t/yr

  REGIME C (15–50 AU):  Von Neumann-derived foundries consume KBOs
                         directly, minimal long-range transport
                         Throughput: ~1 × 10⁸ t/yr (growing over time)
```

### 1.2 Top-Level Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                    FEEDSTOCK SUPPLY CHAIN ARCHITECTURE                │
│                                                                      │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────────────────┐ │
│  │  PROSPECTING │───▶│   EXTRACTION  │───▶│   PRIMARY PROCESSING    │ │
│  │  & SURVEY    │    │   (Mining)    │    │   (Beneficiation,       │ │
│  │              │    │              │    │    Smelting, Sorting)    │ │
│  └─────────────┘    └──────────────┘    └───────────┬─────────────┘ │
│                                                      │               │
│                                                      ▼               │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    LAUNCH / TRANSFER                          │   │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │   │
│  │  │ Mass Driver │  │ Ion-Tug    │  │ Direct Foundry Feed    │ │   │
│  │  │ (Regime A)  │  │ (Regime B) │  │ (Regime C)             │ │   │
│  │  └─────┬──────┘  └─────┬──────┘  └──────────┬─────────────┘ │   │
│  └────────┼──────────────┼──────────────────────┼───────────────┘   │
│           │              │                      │                    │
│           ▼              ▼                      ▼                    │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                 TRANSIT MANAGEMENT LAYER                      │   │
│  │  • Trajectory optimization (10⁵ simultaneous slugs)          │   │
│  │  • Collision avoidance                                       │   │
│  │  • Course correction (slug-mounted cold-gas thrusters)       │   │
│  │  • Scheduling & sequencing                                   │   │
│  └──────────────────────────┬───────────────────────────────────┘   │
│                              │                                       │
│                              ▼                                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                    RECEPTION & DISTRIBUTION                   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │   │
│  │  │ Catcher Tugs  │  │ Orbital      │  │ Foundry Intake   │   │   │
│  │  │ (mag braking) │  │ Stockyards   │  │ Buffers          │   │   │
│  │  └──────┬───────┘  └──────┬───────┘  └────────┬─────────┘   │   │
│  └─────────┼────────────────┼─────────────────────┼─────────────┘   │
│            │                │                     │                   │
│            ▼                ▼                     ▼                   │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │              SHELL CONSTRUCTION FOUNDRIES                     │   │
│  │  (Computational substrate fabrication, thermal radiators,     │   │
│  │   structural elements, power systems)                         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ═══════════════════════════════════════════════════════════════════ │
│  │  LOGISTICS COORDINATION AI  │  RESOURCE DEPLETION PLANNER  │    │
│  │  (Distributed consensus)    │  (Millennial timescale)       │    │
│  ═══════════════════════════════════════════════════════════════════ │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 2. Regime A: Centralized Main Belt Pipeline

This is the backbone. The Main Belt contains approximately **3.2 × 10²¹ kg** of material (roughly 4% of lunar mass). At our extraction rate of ~7 × 10¹¹ kg/yr, the belt provides ~4,500 years of feedstock — sufficient for the inner-shell construction campaign but requiring careful depletion planning.

### 2.1 Mining Ships

**Quantity:** ~10,000 autonomous mining vessels
**Classification by size:**

| Class | Count | Mass (empty) | Cargo Capacity | Role |
|-------|-------|-------------|----------------|------|
| Prospector | 2,000 | 500 t | 50 t (samples) | Survey, assay, tagging |
| Excavator | 5,000 | 5,000 t | 20,000 t | Surface/subsurface mining |
| Processor | 2,000 | 15,000 t | 50,000 t | Beneficiation, smelting |
| Hauler | 1,000 | 3,000 t | 100,000 t | Transfer to mass drivers |

**Total mining fleet mass:** ~7.5 × 10⁷ tonnes

#### 2.1.1 Excavator-Class Specifications

The workhorse of the fleet:

```
┌─────────────────────────────────────────────┐
│         EXCAVATOR-CLASS MINING SHIP          │
│                                              │
│  Length: 120 m                               │
│  Beam: 45 m                                 │
│  Dry mass: 5,000 t                          │
│  Cargo hold: 20,000 t                       │
│                                              │
│  ┌──────┐ ┌──────────────┐ ┌──────────────┐│
│  │ PROP │ │  CARGO HOLD  │ │  MINING HEAD ││
│  │ENGINE│ │  (4 bays ×   │ │  • Laser     ││
│  │      │ │   5,000 t)   │ │    ablation  ││
│  │ VASIMR│ │              │ │  • Mechanical││
│  │ array │ │  Centrifugal │ │    drill     ││
│  │ 4×2MW│ │  separator   │ │  • Regolith  ││
│  │      │ │  integrated  │ │    collector ││
│  └──────┘ └──────────────┘ └──────────────┘│
│                                              │
│  Power: 12 MW fission (U-235 or Pu-238)    │
│  Propulsion: VASIMR array, 8 MW total       │
│    Isp: 5,000 s | Thrust: 40 N continuous  │
│  Delta-V budget: ~15 km/s (loaded)          │
│  Autonomy: 5 years between servicing        │
│  AI: Level 4 autonomy (strategic decisions  │
│      with human-in-loop for novel targets)  │
│                                              │
│  Mining rate: ~200 t/day (depends on target)│
│  Cycle time: ~100 days mine + 60 days       │
│              transit = 160 day cycle         │
│  Annual throughput: ~45,000 t/ship          │
│  Fleet annual: 5,000 × 45,000 = 2.25×10⁸ t │
└─────────────────────────────────────────────┘
```

**Assumption:** VASIMR-class electric propulsion at TRL 5–6 today, projected TRL 9 by Phase 3 start. Fission power at 12 MW is consistent with NASA Kilopower scaling projections.

#### 2.1.2 Mining Strategy

The belt is not uniform. I recommend a tiered extraction strategy:

**Tier 1 — C-type asteroids (75% of belt):** Carbon, water ice, silicates. Primary source for structural carbon composites, radiation shielding, propellant (water → H₂/O₂), and silicon for computational substrates.

**Tier 2 — S-type asteroids (17%):** Iron-nickel, silicates, magnesium. Structural metals, magnetic materials.

**Tier 3 — M-type asteroids (8%):** Pure iron-nickel, platinum group metals, rare earths. High-value electronics, catalysts, specialty alloys.

**Target selection algorithm:**
1. Minimize Δv to nearest mass driver (< 2 km/s preferred)
2. Maximize compositional match to current demand profile
3. Avoid targets < 100 m diameter (insufficient anchoring mass)
4. Prefer rubble-pile targets for ease of excavation (counterintuitively — see §2.3 on anchoring)

### 2.2 Electromagnetic Mass Drivers

**Quantity:** ~500 installations
**Distribution:** Across the Main Belt, concentrated in the inner belt (2.0–2.5 AU) for minimum transfer energy to inner shells.

#### 2.2.1 Mass Driver Specifications

```
┌──────────────────────────────────────────────────────────────┐
│              ELECTROMAGNETIC MASS DRIVER STATION              │
│                                                              │
│  Host asteroid: > 10 km diameter (gravitational anchoring)   │
│  Track length: 5–20 km (depending on host body gravity)      │
│  Bore diameter: 2.0 m (standard slug)                        │
│  Exit velocity: 5–30 km/s (adjustable per trajectory)        │
│  Acceleration: 50–500 g (material-dependent)                 │
│  Cycle time: 60 seconds (slug loading + launch)              │
│  Throughput: 1 slug/min × 10 t/slug = 14,400 t/day          │
│            = 5.26 × 10⁶ t/year per driver                   │
│                                                              │
│  Power requirement: ~2 GW peak (during launch pulse)         │
│  Average power: ~500 MW (duty cycle ~25%)                    │
│  Power source: Solar array (inner belt) or fission cluster   │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                                                        │  │
│  │  [Solar Array / Reactor Farm]                          │  │
│  │         │                                              │  │
│  │         ▼                                              │  │
│  │  ══╦════╦════╦════╦════╦════╦════╦════╦════╦══▶ EXIT  │  │
│  │    ║    ║    ║    ║    ║    ║    ║    ║    ║           │  │
│  │  Superconducting coil stages (100–500 stages)          │  │
│  │                                                        │  │
│  │  [Slug Loader] ──▶ [Acceleration Track] ──▶ [Exit     │  │
│  │   (robotic)        (linear synchronous      Guide &   │  │
│  │                     motor)                   Aiming]   │  │
│  │                                                        │  │
│  │  Anchoring: Deep pilings (3–5 km) into host asteroid   │  │
│  │  + reaction mass compensation system                   │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  Station mass: ~200,000 t (including solar arrays)           │
│  Construction time: ~2 years per station (with existing      │
│                     Phase 2 infrastructure)                   │
│                                                              │
│  500 drivers × 5.26 × 10⁶ t/yr = 2.63 × 10⁹ t/yr capacity │
│  (Operated at ~27% utilization = 7 × 10⁸ t/yr actual)      │
└──────────────────────────────────────────────────────────────┘
```

**Why 27% utilization?** Maintenance windows, trajectory alignment constraints (not all targets are in favorable geometry at all times), and demand-side buffering. Over-provisioning capacity is cheap insurance against bottlenecks.

#### 2.2.2 Cargo Slug Design

The cargo slug is the fundamental unit of transport in Regime A:

```
┌────────────────────────────────────────┐
│           STANDARD CARGO SLUG          │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  ┌────┐                  ┌────┐ │  │
│  │  │Nose│  ████████████████│Tail│ │  │
│  │  │cone│  █ Payload 10 t █│    │ │  │
│  │  │    │  ████████████████│    │ │  │
│  │  └────┘                  └────┘ │  │
│  └──────────────────────────────────┘  │
│                                        │
│  Total mass: 10,500 kg                 │
│  Payload: 10,000 kg                    │
│  Shell: 400 kg (ferromagnetic steel    │
│         for mass driver coupling and   │
│         magnetic braking at catcher)   │
│  Avionics: 50 kg                       │
│    • Star tracker (pointing)           │
│    • Cold-gas thruster array           │
│      (4 × 50 N, 200 m/s Δv budget)    │
│    • Transponder (X-band, 10 W)        │
│    • Radiation-hardened FPGA controller │
│  Ablative nose cone: 50 kg             │
│                                        │
│  Dimensions: 1.8 m dia × 4.5 m length │
│  Design life: Single use (shell is     │
│    recycled at destination)            │
│                                        │
│  Mid-course correction capability:     │
│    200 m/s Δv for trajectory trim      │
│    Pointing accuracy: < 0.01°          │
│    Position knowledge: < 10 m (via     │
│    ground-based radar + onboard IMU)   │
└────────────────────────────────────────┘
```

**Key design choice:** I'm making slugs **expendable but recyclable.** The ferromagnetic shell is itself useful feedstock at the destination. The avionics package is the only "waste" at 50 kg per slug — 0.5% of payload mass, acceptable.

#### 2.2.3 Mass Driver Anchoring on Rubble Piles

This is identified as a key technical challenge, and rightly so. My proposed solution:

**Problem:** Most asteroids > 200 m are gravitationally-bound rubble piles with near-zero tensile strength. A mass driver exerts reaction forces of ~10⁶ N during launch pulses. On a rubble pile, this would simply push the driver through the surface.

**Solution: Distributed Reaction Architecture (DRA)**

```
                    CROSS-SECTION: MASS DRIVER ON RUBBLE PILE

                         Mass Driver Track
                    ═══════════════════════════
                    │   │   │   │   │   │   │
                    ▼   ▼   ▼   ▼   ▼   ▼   ▼
               ┌────────────────────────────────────┐
               │  Regolith-sintered foundation pad   │
               │  (microwave-sintered in situ,       │
               │   50 m wide × 20 km long × 10 m    │
               │   deep)                             │
               ├────────────────────────────────────┤
               │         │         │         │       │
               │    ┌────┴────┐┌───┴───┐┌───┴───┐  │
               │    │Deep Pile ││Deep   ││Deep   │  │
               │    │(sintered ││Pile   ││Pile   │  │
               │    │ column   ││       ││       │  │
               │    │ 3-5 km)  ││       ││       │  │
               │    └─────────┘└───────┘└───────┘  │
               │                                    │
               │    Rubble pile asteroid interior    │
               │    (loose regolith, boulders)       │
               │                                    │
               └────────────────────────────────────┘

  Technique:
  1. Microwave sintering robots create a continuous
     foundation slab by fusing regolith in situ
  2. Deep pilings are sintered columns extending 3-5 km
     into the asteroid body
  3. Reaction forces are distributed across the entire
     foundation area (50 m × 20 km = 10⁶ m²)
  4. Peak pressure: 10⁶ N / 10⁶ m² = 1 Pa
     (well within sintered regolith strength of ~10⁶ Pa)
  5. Additionally: mass driver is oriented so reaction
     force vector passes through asteroid center of mass,
     minimizing torque
```

**Backup approach:** For the smallest viable host asteroids (10–50 km), we can alternatively use a **free-flying mass driver** that maintains station near the asteroid using low-thrust propulsion, with the asteroid serving only as the feedstock source, not the structural anchor. This adds propellant cost but eliminates the anchoring problem entirely.

**My recommendation:** Use anchored drivers on asteroids > 50 km (Ceres, Vesta, Pallas, Hygiea, etc. — about 30 bodies), and free-flying drivers for smaller sources. The 30 largest bodies contain ~85% of belt mass, so this covers the majority case.

### 2.3 Transit Management

With 500 mass drivers firing ~1 slug/minute each, we have approximately **500 slugs launched per minute**, or **~720,000 slugs in transit at any given time** (assuming average transit time of ~1 day for inner-belt to 1 AU transfers at 20 km/s).

Actually, let me recalculate more carefully:

- Average transfer distance: ~1.5 AU (belt at 2.5 AU to shells at ~1 AU)
- Average slug velocity: ~15 km/s
- Transit time: 1.5 × 1.496 × 10⁸ km / 15 km/s ≈ 1.5 × 10⁷ s ≈ 170 days

So: 500 drivers × 1 slug/min × 60 min/hr × 24 hr/day × 170 days ≈ **1.2 × 10⁸ slugs in transit simultaneously.**

This is an order of magnitude higher than the BOM estimate of 10⁵. Let me reconcile: the BOM says 10⁵ "cargo slugs" but I think this refers to a different slug size or a different operational tempo. At 10 t/slug and 7 × 10⁸ t/yr, we need 7 × 10⁷ slug-launches per year, which at 170-day transit means ~3.3 × 10⁷ in transit. My calculation above assumed all 500 drivers at full rate; at 27% utilization, we get ~3.2 × 10⁷ in transit.

**Revised: ~3 × 10⁷ slugs in simultaneous transit.**

This is a staggering traffic management problem. My approach:

#### 2.3.1 Traffic Management Architecture

```
┌──────────────────────────────────────────────────────────────┐
│            TRANSIT MANAGEMENT SYSTEM (TMS)                    │
│                                                              │
│  Layer 1: STRATEGIC PLANNING (months–years ahead)            │
│  ├─ Demand forecasting from shell construction schedules     │
│  ├─ Asteroid depletion modeling                              │
│  ├─ Mass driver assignment optimization                      │
│  └─ Hohmann-like transfer window scheduling                  │
│                                                              │
│  Layer 2: TACTICAL SCHEDULING (days–weeks ahead)             │
│  ├─ Launch sequencing per driver                             │
│  ├─ Trajectory deconfliction (minimum separation: 100 km)    │
│  ├─ Catcher tug pre-positioning                              │
│  └─ Weather (solar activity) adjustments                     │
│                                                              │
│  Layer 3: REAL-TIME TRACKING (seconds–hours)                 │
│  ├─ Radar tracking network (phased array stations on         │
│  │   shells and dedicated tracking platforms)                │
│  ├─ Slug transponder polling                                 │
│  ├─ Collision probability computation                        │
│  ├─ Emergency course correction commands                     │
│  └─ Catcher tug final approach guidance                      │
│                                                              │
│  COMPUTING REQUIREMENT:                                      │
│  ~10¹⁸ FLOPS continuous for trajectory propagation           │
│  of 3 × 10⁷ objects with mutual perturbation analysis        │
│  (Trivial for Phase 3 — the Matroska Brain itself            │
│   can dedicate a tiny fraction of capacity to this)          │
│                                                              │
│  TRACKING NETWORK:                                           │
│  ~1,000 phased-array radar stations distributed across       │
│  inner solar system, each with 100 m aperture                │
│  Detection range: 10⁶ km for 10 t slug                      │
│  Position accuracy: < 1 km at 10⁶ km range                  │
│  Update rate: 1 Hz per tracked object                        │
└──────────────────────────────────────────────────────────────┘
```

**Key insight:** The slugs travel in **streams** — many slugs launched from the same driver toward the same catcher, forming a "river" of cargo. Within a stream, slugs are separated by ~1,000 km (1 minute at 15 km/s). Deconfliction is primarily **inter-stream**, not intra-stream. With ~500 active streams, this is manageable.

**Collision risk:** At 3 × 10⁷ slugs in a volume of ~10³⁴ m³ (inner solar system), the spatial density is ~3 × 10⁻²⁷ slugs/m³. The collision cross-section of a slug is ~3 m². Mean free path: ~10²⁶ m. **Slug-slug collisions are negligible.** The real collision risk is slug-vs-existing-infrastructure (shells, stations, other spacecraft), which is managed by exclusion zones and the tracking network.

### 2.4 Catcher Tugs

**Quantity:** ~50,000 (distributed across all shell construction sites)
**Primary role:** Decelerate incoming cargo slugs and deliver them to foundry intake buffers.

#### 2.4.1 Catcher Tug Specifications

```
┌──────────────────────────────────────────────────────────┐
│              CATCHER TUG — CLASS SPECIFICATIONS           │
│                                                          │
│  ┌──────────────────────────────────────────────────┐    │
│  │                                                  │    │
│  │   [Magnetic Brake    [Tug Body]   [Propulsion]   │    │
│  │    Array]                                        │    │
│  │                                                  │    │
│  │   ┌─────────┐    ┌──────────┐   ┌──────────┐   │    │
│  │   │ 200m dia│    │ 50m hull │   │ MPD      │   │    │
│  │   │ supercon│    │ fuel/    │   │ thruster │   │    │
│  │   │ loop    │    │ cargo    │   │ array    │   │    │
│  │   │ array   │    │ grapple  │   │          │   │    │
│  │   └─────────┘    └──────────┘   └──────────┘   │    │
│  │                                                  │    │
│  └──────────────────────────────────────────────────┘    │
│                                                          │
│  Mass: 2,000 t (dry)                                     │
│  Propellant capacity: 500 t (argon/xenon)                │
│  Magnetic brake array: 200 m diameter                    │
│    Superconducting loops generating 2 T field            │
│    Effective braking force on ferromagnetic slug:        │
│    ~10⁵ N at 100 km approach distance                    │
│    (eddy current braking in slug shell)                  │
│                                                          │
│  Braking sequence:                                       │
│  1. Slug approaches at 15 km/s relative                  │
│  2. At 10,000 km: tug matches trajectory, begins         │
│     co-moving approach                                   │
│  3. At 1,000 km: magnetic field begins slug decel        │
│  4. At 100 km: peak braking force, ~500 g on slug        │
│     (slug is solid material — can handle this)           │
│  5. At 0 km: slug captured in magnetic grapple           │
│  6. Tug uses MPD thrusters to deliver slug to foundry    │
│                                                          │
│  Cycle time: ~4 hours (approach + brake + deliver)       │
│  Throughput: 6 slugs/day × 10 t = 60 t/day              │
│  Annual: ~22,000 t/tug                                   │
│  Fleet annual: 50,000 × 22,000 = 1.1 × 10⁹ t/yr ✓     │
│                                                          │
│  Power: 50 MW fusion (for superconducting magnets        │
│         and MPD thrusters)                               │
│  Design life: 20 years (magnet refurbishment at 10 yr)   │
└──────────────────────────────────────────────────────────┘
```

#### 2.4.2 Magnetic Braking — Technical Deep Dive

This is flagged as TRL 1 in the BOM, and I agree it's the highest-risk subsystem. Let me detail the physics:

**Principle:** A ferromagnetic slug passing through a strong magnetic field gradient experiences eddy current braking. The braking force is:

F = (σ × v × B² × V_slug) / 2

Where:
- σ = electrical conductivity of slug shell (~10⁷ S/m for steel)
- v = relative velocity (m/s)
- B = magnetic field strength (T)
- V_slug = volume of conductive material in slug (~0.05 m³ for 400 kg shell)

At v = 15,000 m/s, B = 2 T:
F = (10⁷ × 15,000 × 4 × 0.05) / 2 = 1.5 × 10¹⁰ N

This is actually **far too high** — it would decelerate the slug in microseconds and vaporize it. The key is that the field falls off as 1/r³, so at realistic engagement distances (100+ km), the field is negligible. The braking must be done in a **controlled approach** where the tug actively manages the field geometry.

**Revised approach — Active Field Shaping:**

Rather than passive eddy current braking, I now recommend a **magnetohydrodynamic catch** system:

1. The catcher tug deploys a large (200 m) superconducting loop
2. As the slug approaches, the tug fires a plasma stream toward the slug
3. The slug's ferromagnetic shell interacts with the magnetized plasma, creating drag
4. This is essentially a **magnetic parachute** — the slug decelerates through momentum transfer to the plasma, which is confined by the tug's magnetic field
5. Deceleration is spread over ~1,000 km, keeping forces manageable

**Required Δv dissipation:** 15 km/s on a 10.5 t slug = 1.18 × 10¹² J of kinetic energy per catch.

**At 6 catches/day:** 7.1 × 10¹² J/day = 82 MW average thermal load.

This energy must be radiated. The tug needs ~40,000 m² of radiator area at 500 K (Stefan-Boltzmann: 82 MW / (5.67 × 10⁻⁸ × 500⁴) = ~23,000 m²). Call it 150 m × 150 m of radiator panels — large but feasible for a 200 m-class vehicle.

**Alternative: Expendable Braking Stages**

If magnetic braking proves infeasible, the fallback is to equip each slug with a small solid-rocket retro stage (adds ~30% to slug mass, reducing payload fraction to ~77%). This is the conservative option and I recommend it as the baseline until magnetic braking reaches TRL 4+.

---

## 3. Regime B: Hybrid Trojan/Centaur Operations

### 3.1 Operational Concept

Jupiter Trojans (~6 × 10²⁰ kg total mass) and Centaurs (scattered between Jupiter and Neptune) are rich in volatiles and organics. They feed the mid-range shells (5–15 AU) and provide specialty volatiles (nitrogen, carbon compounds) for the entire system.

```
┌──────────────────────────────────────────────────────────┐
│              REGIME B OPERATIONAL CONCEPT                  │
│                                                          │
│  Jupiter L4/L5 Trojan Clouds                             │
│  ┌─────────────────────────────┐                         │
│  │  • ~10⁶ objects > 1 km      │                         │
│  │  • Rich in C, N, H₂O ice   │                         │
│  │  • Low Δv between Trojans   │                         │
│  │    (~0.5 km/s)              │                         │
│  │                             │                         │
│  │  Operations:                │                         │
│  │  1. Mining ships extract    │                         │
│  │     and process locally     │                         │
│  │  2. Secondary mass drivers  │                         │
│  │     on largest Trojans      │                         │
│  │     (624 Hektor, 617       │                         │
│  │      Patroclus, etc.)      │                         │
│  │  3. Slugs sent sunward to  │                         │
│  │     mid-shell foundries    │                         │
│  │  4. Transfer time: 2-5 yr  │                         │
│  └─────────────────────────────┘                         │
│                                                          │
│  Fleet allocation:                                       │
│  • 1,000 mining ships (Excavator class, ice-adapted)     │
│  • 50 mass drivers (on largest Trojans)                  │
│  • 5,000 catcher tugs (at mid-shell destinations)        │
│                                                          │
│  Throughput: ~2 × 10⁸ t/yr                              │
└──────────────────────────────────────────────────────────┘
```

### 3.2 Ice-Adapted Mining

Trojan mining differs from belt mining:
- **Composition:** 50–80% water ice, 10–30% organics, 10–20% silicates
- **Temperature:** ~120 K (vs ~200 K in inner belt)
- **Extraction method:** Thermal sublimation (solar concentrators or nuclear heaters) rather than mechanical excavation
- **Processing:** Electrolysis for H₂/O₂, pyrolysis for carbon extraction, fractional distillation for volatiles

**Modified Excavator specs for Trojan operations:**
- Solar power replaced with 25 MW fission (solar flux at 5.2 AU is only 3.7% of Earth's)
- Mining head replaced with thermal lance array (focused microwave/IR heating)
- Cargo hold insulated and pressurized for volatile storage
- Additional Δv budget for Trojan-to-Trojan transfers (~2 km/s per hop)

---

## 4. Regime C: Direct KBO Consumption

### 4.1 Philosophy

For shells at 15–50 AU, shipping material from the inner solar system is energetically absurd. Instead, we bring the factory to the feedstock.

This regime leverages **Von Neumann-derived self-replicating foundries** (inherited from Phase 2's assembler hive technology) that land on KBOs, consume them, and produce computational substrate in situ.

```
┌──────────────────────────────────────────────────────────┐
│           REGIME C: DIRECT CONSUMPTION FOUNDRY            │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                                                    │  │
│  │         KBO Surface (50-500 km diameter)            │  │
│  │  ┌──────────────────────────────────────────────┐  │  │
│  │  │                                              │  │  │
│  │  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐   │  │  │
│  │  │  │Intake│  │Refine│  │ Fab  │  │Launch│   │  │  │
│  │  │  │ Maw  │→ │Plant │→ │Center│→ │ Rail │   │  │  │
│  │  │  │      │  │      │  │      │  │      │   │  │  │
│  │  │  └──────┘  └──────┘  └──────┘  └──────┘   │  │  │
│  │  │      ↑                              │       │  │  │
│  │  │      │    Self-replication loop      │       │  │  │
│  │  │      └──────────────────────────────┘       │  │  │
│  │  │                                              │  │  │
│  │  │  Power: 500 MW fission (local U/Th if        │  │  │
│  │  │         available, otherwise shipped in)      │  │  │
│  │  │  Replication time: ~2 years per copy          │  │  │
│  │  │  Throughput: 10,000 t/yr per foundry          │  │  │
│  │  │  Output: Finished computational substrate     │  │  │
│  │  │          panels, launched to shell orbit       │  │  │
│  │  └──────────────────────────────────────────────┘  │  │
│  │                                                    │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  Initial seed foundries: 100 (shipped from inner system) │
│  Self-replication to: ~10,000 foundries over 30 years    │
│  Steady-state throughput: 10⁸ t/yr                       │
│                                                          │
│  KEY CHALLENGE: KBOs are 50-80% ice. Computational       │
│  substrate requires silicon, metals, rare earths.         │
│  Solutions:                                              │
│  a) Selective mining of rocky cores                      │
│  b) Transmutation (speculative — see §4.2)              │
│  c) Specialty material shipments from inner system       │
│     (~1% of total mass, high-value elements only)        │
└──────────────────────────────────────────────────────────┘
```

### 4.2 Transmutation — Honest Assessment

The BOM mentions "autonomous transmutation of light elements into structural materials" and flags it as highly speculative. I agree. Let me be blunt:

**Nuclear transmutation at industrial scale is not feasible with any known or projected technology.** Converting oxygen-16 to silicon-28 requires adding 12 nucleons — this is not fission or fusion, it's nucleosynthesis. The energy requirements are ~10 MeV per nucleon, or ~10¹⁴ J per kg of silicon produced. At 10⁸ t/yr, this would require ~10²² W — roughly the entire solar luminosity.

**My recommendation:** Do not plan for transmutation. Instead:

1. **Selective mining:** KBOs are not pure ice. Pluto's density (1.86 g/cm³) suggests ~65% rock. Even "icy" KBOs contain 20–40% silicates and metals by mass. This is sufficient for structural components.

2. **Specialty shipments:** For elements genuinely absent in KBOs (platinum group metals, rare earths, actinides for fission fuel), maintain a small but dedicated trans-system shipping line from the inner system. At ~1% of outer-shell mass requirements, this is ~10⁶ t/yr — manageable with ~200 ion-drive freighters on multi-year transfer orbits.

3. **Adapted architectures:** Design outer-shell computational substrates to minimize rare-element usage. Carbon-based computing (graphene, diamond NV centers, carbon nanotube transistors) can potentially replace silicon, leveraging the abundant carbon in KBOs.

---

## 5. Specialty Material Distribution Network

### 5.1 The "Rare Earth Express"

Certain materials are geologically concentrated and cannot be sourced everywhere:

| Material | Primary Source | Annual Demand | Transport Mode |
|----------|---------------|---------------|----------------|
| Platinum group | M-type asteroids (inner belt) | ~10⁴ t/yr | Mass driver → all shells |
| Rare earths (Nd, Dy, etc.) | Differentiated asteroids | ~10⁵ t/yr | Mass driver → all shells |
| Uranium/Thorium | Specific C-type asteroids | ~10³ t/yr | Dedicated secure transport |
| Helium-3 | Gas giant atmospheres | ~10² t/yr | Atmospheric scoop missions |
| Lithium | Specific S-type asteroids | ~10⁴ t/yr | Mass driver → all shells |

### 5.2 Gas Giant Atmospheric Mining (He-3)

If fusion power is used extensively (likely for outer-system operations), He-3 from Jupiter/Saturn/Uranus/Neptune atmospheres may be needed. This is a specialized sub-pipeline:

```
┌──────────────────────────────────────────────┐
│     ATMOSPHERIC SCOOP VEHICLE (CONCEPT)       │
│                                              │
│  • Aeroshell-equipped drone                  │
│  • Dips into gas giant upper atmosphere      │
│  • Ram-scoop collects H₂/He mixture         │
│  • Onboard centrifuge separates He-3         │
│  • Ascends using collected H₂ as propellant  │
│  • Transfers He-3 to orbital tanker          │
│                                              │
│  Mass: 500 t                                 │
│  Payload per dive: 10 t He-3                 │
│  Dive cycle: 30 days                         │
│  Fleet: 50 vehicles (primarily at Uranus —   │
│         best He-3/He-4 ratio)                │
│  Annual yield: ~6,000 t He-3                 │
│                                              │
│  TRL: 2 (concept only)                       │
│  RISK: HIGH — gas giant atmospheric flight   │
│         is extremely challenging              │
└──────────────────────────────────────────────┘
```

---

## 6. Logistics Coordination AI

### 6.1 Architecture

The entire supply chain is coordinated by a distributed AI system I call **HERMES** (Heuristic Engine for Resource Management and Extraction Scheduling).

```
┌──────────────────────────────────────────────────────────────┐
│                    HERMES ARCHITECTURE                         │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              STRATEGIC LAYER (HERMES-S)               │    │
│  │  • 1000-year resource depletion model                 │    │
│  │  • Shell construction demand forecasting              │    │
│  │  • Fleet composition optimization                     │    │
│  │  • New mass driver site selection                     │    │
│  │  • Update cycle: monthly                              │    │
│  │  • Runs on: Matroska Brain Shell 1 (dedicated         │    │
│  │    partition, ~10¹⁵ FLOPS)                            │    │
│  └──────────────────────────────────────────────────────┘    │
│                          │                                    │
│                          ▼                                    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              TACTICAL LAYER (HERMES-T)                │    │
│  │  • Launch scheduling for all 500 mass drivers         │    │
│  │  • Mining ship task assignment                        │    │
│  │  • Catcher tug pre-positioning                        │    │
│  │  • Maintenance scheduling                             │    │
│  │  • Update cycle: hourly                               │    │
│  │  • Runs on: Distributed across mass driver stations   │    │
│  │    (~10¹² FLOPS per station)                          │    │
│  └──────────────────────────────────────────────────────┘    │
│                          │                                    │
│                          ▼                                    │
│  ┌──────────────────────────────────────────────────────┐    │
│  │              OPERATIONAL LAYER (HERMES-O)             │    │
│  │  • Real-time slug tracking                            │    │
│  │  • Collision avoidance                                │    │
│  │  • Catcher tug final approach guidance                │    │
│  │  • Emergency response (slug failures, etc.)           │    │
│  │  • Update cycle: 1 Hz                                 │    │
│  │  • Runs on: Tracking network processors               │    │
│  │    (~10¹⁸ FLOPS aggregate)                            │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  COMMUNICATION:                                              │
│  • Inner system (< 5 AU): Laser comm, < 40 min latency     │
│  • Mid system (5-15 AU): Laser comm, < 2 hr latency        │
│  • Outer system (15-50 AU): Laser comm, < 7 hr latency     │
│  • Each layer operates autonomously within its authority     │
│  • Consensus protocol for cross-layer decisions              │
│  • Human oversight: Policy-level only (construction          │
│    priorities, safety constraints)                            │
└──────────────────────────────────────────────────────────────┘
```

### 6.2 Resource Depletion Planning

The 1000-year model must account for:

1. **Asteroid depletion curves:** Each asteroid has a finite mass. Mining rate must account for diminishing returns as surface area decreases.

2. **Orbital mechanics evolution:** As asteroids are consumed, their orbits change (mass loss → different perturbation response). The belt's orbital element distribution evolves over centuries.

3. **Demand evolution:** Inner shells are built first, then progressively outer shells. Demand shifts from metals/silicon (inner shells) to carbon/volatiles (outer shells) over time.

4. **Fleet aging:** Mining ships and mass drivers have finite lifetimes. Replacement manufacturing must be scheduled.

5. **Discovery of new resources:** As mining progresses, previously unknown deposits will be found. The model must incorporate Bayesian updating of resource estimates.

**Projected depletion timeline:**

| Source | Total Mass | Extraction Rate | Depletion Time |
|--------|-----------|----------------|----------------|
| Main Belt | 3.2 × 10²¹ kg | 7 × 10¹¹ kg/yr | ~4,500 years |
| Jupiter Trojans | 6 × 10²⁰ kg | 2 × 10¹¹ kg/yr | ~3,000 years |
| Centaurs | ~10²⁰ kg | 5 × 10¹⁰ kg/yr | ~2,000 years |
| Kuiper Belt | ~10²³ kg | 10¹¹ kg/yr (growing) | ~100,000+ years |
| Oort Cloud | ~10²⁵ kg | Future expansion | Effectively unlimited |

**The Kuiper Belt and Oort Cloud provide effectively unlimited feedstock for the Matroska Brain's operational lifetime.** The Main Belt is the near-term bottleneck, but it's sufficient for the inner shells.

---

## 7. Manufacturing Considerations

### 7.1 Fleet Production

The logistics fleet itself must be manufactured. Total fleet mass: ~2 × 10⁸ tonnes.

**Production timeline:** Assuming Phase 3 begins with Phase 2's manufacturing infrastructure capable of ~10⁷ t/yr of spacecraft production:

- Mining fleet (7.5 × 10⁷ t): ~8 years
- Mass drivers (500 × 200,000 t = 10⁸ t): ~10 years
- Catcher tugs (50,000 × 2,000 t = 10⁸ t): ~10 years

**Total: ~20 years for full fleet deployment** (with significant parallelism — mining ships are produced first and begin operations while mass drivers are still being built).

### 7.2 Self-Repair and Replacement

At steady state, the fleet requires continuous replacement:

| Component | Design Life | Annual Replacement | Replacement Mass/yr |
|-----------|------------|-------------------|-------------------|
| Mining ships | 30 years | 333 ships | 2.5 × 10⁶ t |
| Mass drivers | 100 years | 5 drivers | 10⁶ t |
| Catcher tugs | 20 years | 2,500 tugs | 5 × 10⁶ t |
| Cargo slugs | 1 use | 7 × 10⁷ slugs | 3.5 × 10⁷ t (shell only) |

**Total replacement manufacturing: ~4.4 × 10⁷ t/yr** — about 6% of throughput, which is the "overhead" of the logistics system. This is acceptable.

### 7.3 Standardization Philosophy

I strongly advocate for **radical standardization:**

- **One slug size** (10 t payload, 1.8 m × 4.5 m). All mass drivers, all catchers, all foundry intakes designed for this single form factor.
- **Three ship classes** only (Prospector, Excavator, Processor). Haulers are eliminated — excavators deliver directly to mass driver loading bays.
- **Modular mass driver segments** — each 500 m section is identical, assembled in series to desired track length.
- **Common avionics bus** across all vehicles — same rad-hard processor, same star tracker, same comm system.

This reduces manufacturing complexity by an estimated 10× compared to bespoke designs.

---

## 8. Power Budget

```
┌──────────────────────────────────────────────────────────────┐
│              SUPPLY CHAIN POWER BUDGET                        │
│                                                              │
│  Component              Count    Unit Power   Total Power    │
│  ─────────────────────  ───────  ──────────   ───────────    │
│  Mining ships           10,000   12 MW        120 GW         │
│  Mass drivers           500      500 MW avg   250 GW         │
│  Catcher tugs           50,000   50 MW        2,500 GW       │
│  Tracking network       1,000    10 MW        10 GW          │
│  KBO foundries          10,000   500 MW       5,000 GW       │
│  Orbital stockyards     200      100 MW       20 GW          │
│  HERMES compute         —        —            1 GW           │
│  ─────────────────────────────────────────────────────────── │
│  TOTAL                                        ~7,900 GW      │
│                                               ≈ 8 TW         │
│                                                              │
│  For context: Solar luminosity = 3.8 × 10²⁶ W               │
│  Supply chain power = 2 × 10⁻¹⁴ of solar luminosity         │
│  (Negligible — well within Phase 2 power infrastructure)     │
└──────────────────────────────────────────────────────────────┘
```

**Power sources by regime:**
- **Regime A (inner system):** Solar photovoltaic (abundant at 1–3 AU) + fission for mobile assets
- **Regime B (Trojans):** Fission exclusively (solar flux too low for practical arrays)
- **Regime C (KBOs):** Fission, transitioning to fusion as He-3 supply matures

---

## 9. Development Roadmap

```
YEAR    MILESTONE                                           TRL→
────    ─────────────────────────────────────────────────   ────
  0     Phase 3 authorization; supply chain design freeze    —
  1     Magnetic braking prototype (10 kg slug, lab)         3
  2     Mass driver segment prototype (100 m, ground test)   4
  3     Excavator-class prototype (1 ship, belt trials)      5
  5     Magnetic braking space demo (100 kg slug)            5
  7     First mass driver operational (Vesta)                7
  8     Mining fleet at 1,000 ships                          8
 10     Mass driver network at 100 units                     8
 12     Catcher tug fleet at 10,000 units                    7
 15     Full Regime A operational (500 drivers, 10k ships)   9
 18     Regime B initial operations (Trojan mining begins)   7
 20     Full fleet deployment complete                       9
 25     Regime C seed foundries deployed to first KBOs       6
 30     KBO foundry self-replication reaches 1,000 units     7
 50     Regime C at full capacity (10,000 foundries)         9
100     First resource depletion events (small asteroids)    —
500     Main Belt 10% depleted; shift to outer sources       —
```

### 9.1 Technology Readiness Assessment

| Subsystem | Current TRL | Required TRL | Gap Assessment |
|-----------|------------|-------------|----------------|
| Electric propulsion (VASIMR-class) | 5 | 9 | Moderate — scaling and lifetime |
| Space fission reactors (10+ MW) | 4 | 9 | Significant — no flight heritage at this scale |
| Electromagnetic mass drivers | 3 | 9 | Significant — largest ground demo is ~100 m |
| Magnetic braking / catching | 1 | 7 | **Critical** — fundamental physics validated but no engineering demo |
| Autonomous mining | 3 | 9 | Moderate — terrestrial mining automation is mature |
| Self-replicating foundries | 2 | 7 | **Critical** — no demonstrated self-replication |
| Long-duration autonomy (5+ yr) | 4 | 9 | Moderate — Mars rovers demonstrate years of autonomy |
| Superconducting magnets (space) | 4 | 9 | Moderate — AMS-02 demonstrates space superconductors |

---

## 10. Cost Analysis

### 10.1 Capital Costs

| Item | Unit Cost | Quantity | Total |
|------|----------|---------|-------|
| Mining ships (avg) | $500M equiv | 10,000 | $5 × 10¹² |
| Mass drivers | $10B equiv | 500 | $5 × 10¹² |
| Catcher tugs | $200M equiv | 50,000 | $1 × 10¹³ |
| Tracking network | $1B equiv | 1,000 stations | $1 × 10¹² |
| KBO seed foundries | $5B equiv | 100 | $5 × 10¹¹ |
| HERMES development | — | — | $1 × 10¹¹ |
| **TOTAL CAPEX** | | | **~$2.2 × 10¹³** |

### 10.2 Operating Costs (Annual)

| Item | Annual Cost |
|------|-----------|
| Fleet replacement manufacturing | $4 × 10¹¹ |
| Propellant (mining fleet) | $1 × 10¹¹ |
| Fission fuel | $5 × 10¹⁰ |
| HERMES operations | $1 × 10¹⁰ |
| **TOTAL OPEX** | **~$5.6 × 10¹¹/yr** |

### 10.3 Cost Per Tonne Delivered

**CAPEX amortized over 100 years:** $2.2 × 10¹¹/yr
**Plus OPEX:** $5.6 × 10¹¹/yr
**Total annual cost:** ~$7.8 × 10¹¹/yr
**Throughput:** 10⁹ t/yr
**Cost per tonne:** ~$780/t

For comparison, terrestrial bulk shipping is ~$10–50/t. Our cost is ~50× higher, which is reasonable given we're shipping across interplanetary distances.

**Note:** All costs are in "equivalent manufacturing capacity" units, not 2025 USD. By Phase 3, the economy is post-scarcity for most goods; these numbers represent opportunity costs in terms of what else the manufacturing infrastructure could be producing.

---

## 11. Risk Assessment

### 11.1 Risk Matrix

```
┌─────────────────────────────────────────────────────────────┐
│                    RISK MATRIX                               │
│                                                             │
│  IMPACT    │ Negligible │ Moderate │ Major │ Catastrophic   │
│  ──────────┼────────────┼──────────┼───────┼──────────────  │
│  Almost    │            │          │  R3   │                │
│  Certain   │            │          │       │                │
│  ──────────┼────────────┼──────────┼───────┼──────────────  │
│  Likely    │            │   R5     │  R1   │                │
│  ──────────┼────────────┼──────────┼───────┼──────────────  │
│  Possible  │            │   R6     │  R2   │     R4         │
│  ──────────┼────────────┼──────────┼───────┼──────────────  │
│  Unlikely  │            │          │  R7   │                │
│  ──────────┼────────────┼──────────┼───────┼──────────────  │
│  Rare      │            │          │       │     R8         │
│  ──────────┼────────────┼──────────┼───────┼──────────────  │
└─────────────────────────────────────────────────────────────┘
```

| ID | Risk | Likelihood | Impact | Mitigation |
|----|------|-----------|--------|------------|
| R1 | Magnetic braking infeasible at scale | Likely | Major | Fallback to expendable retro-stages on slugs; 30% mass penalty |
| R2 | Self-replicating foundries fail to achieve closure | Possible | Major | Maintain inner-system manufacturing pipeline for outer shells; accept 10× slower outer-shell construction |
| R3 | Rubble-pile anchoring failures | Almost Certain (for some bodies) | Major | Free-flying mass drivers as backup; concentrate on consolidated bodies |
| R4 | Cascade collision event (slug hits shell under construction) | Possible | Catastrophic | Exclusion zones, redundant tracking, slug self-destruct capability |
| R5 | Resource composition models inaccurate | Likely | Moderate | Extensive prospecting campaign before committing mass drivers; flexible mining fleet |
| R6 | Fleet autonomy failures (systematic software bugs) | Possible | Moderate | Diverse AI architectures across fleet; human-in-loop for novel situations; graceful degradation |
| R7 | Solar activity disrupts mass driver operations | Unlikely | Major | Hardened electronics; operational pauses during extreme events; slug trajectory correction margin |
| R8 | Hostile interference (if other civilizations exist) | Rare | Catastrophic | Distributed architecture provides resilience; no single point of failure |

### 11.2 Critical Risk Deep Dive: R4 — Cascade Collision

A 10 t slug at 15 km/s carries 1.1 × 10¹² J of kinetic energy — equivalent to ~270 tonnes of TNT. If a slug impacts a computational shell under construction, it could:
- Destroy ~1 km² of shell surface
- Generate debris that damages adjacent sections
- Potentially trigger a Kessler-syndrome cascade at that orbital radius

**Mitigation architecture:**

1. **Exclusion zones:** No slug trajectory passes within 10,000 km of any shell or construction site. All deliveries are to dedicated "catcher stations" in safe orbital corridors.

2. **Slug self-destruct:** Every slug carries a 5 kg shaped charge that can fragment it into sub-kg pieces if it deviates from its corridor. Fragments disperse and are individually non-threatening.

3. **Triple-redundant tracking:** Each slug is tracked by ≥3 independent radar stations. If any station loses track, the slug is flagged for immediate course correction or destruction.

4. **Catcher station placement:** Catcher stations are positioned "upstream" (in terms of orbital mechanics) from construction sites, so a missed catch results in the slug continuing into empty space rather than toward the shell.

---

## 12. Open Engineering Questions

These are the problems I cannot solve on paper and require experimental programs:

### 12.1 Magnetic Braking Feasibility
**Question:** Can we decelerate a 10 t