---
bomId: "bom-1-2"
itemName: "PV Blanket Arrays"
itemSlug: "pv-blanket-arrays"
modelId: "claude-opus-4-5"
modelName: "Claude Opus 4.5"
generated: "2026-02-01"
phase: "phase-1"
---

# Technical Proposal: PV Blanket Arrays for Project Dyson Phase 1

## Executive Summary

This proposal presents a comprehensive design for ultra-thin, large-area photovoltaic blanket arrays optimized for mass production and autonomous deployment in a Dyson swarm configuration. The design philosophy prioritizes **manufacturability at scale** over peak efficiency, recognizing that the fundamental challenge of a Dyson swarm is not converting sunlight efficiently, but deploying sufficient collecting area economically.

I propose a modular "Solar Sail Cell" (SSC) architecture: 100m × 100m blanket units with integrated attitude control, achieving 15% conversion efficiency at 12 g/m² areal density. Each unit generates approximately 200 kW at 1 AU equivalent solar flux, with a target production cost of $50/m² at scale.

---

## 1. Design Philosophy and Approach

### 1.1 Core Principles

**Mass-to-Area Ratio is King.** For a Dyson swarm, the limiting factor is not efficiency but total deployed area. A 10% efficient panel at 10 g/m² beats a 30% efficient panel at 50 g/m² for swarm economics. Every gram saved per square meter compounds across billions of units.

**Graceful Degradation Over Peak Performance.** Individual units will fail. Micrometeorite impacts, manufacturing defects, and radiation damage are inevitable. The architecture must assume 2-5% annual attrition and design for easy replacement rather than extreme longevity.

**Autonomous Operation is Non-Negotiable.** With millions of units, ground control of individual elements is impossible. Each blanket must maintain station, orient to the sun, and report status without human intervention for years.

**Design for Manufacturing, Not Laboratory Performance.** The best panel is one we can build a million of per year. This means:
- Roll-to-roll compatible processes
- Abundant materials (no rare earths in primary structure)
- Tolerance for manufacturing variation
- Simple deployment mechanisms

### 1.2 Why Blankets Over Rigid Panels

Traditional rigid solar panels (ISS-style) achieve ~30% efficiency but at 5-10 kg/m². For a Dyson swarm intercepting even 0.001% of solar output (~4 × 10²² W), we need approximately 3 × 10¹⁴ m² of collector area at 15% efficiency. At 10 kg/m², that's 3 × 10¹⁵ kg of panels—roughly 500× the mass of Ceres.

Blanket architecture at 12 g/m² reduces this to 3.6 × 10¹² kg—still enormous but within the realm of asteroid mining feasibility over century timescales.

---

## 2. Technical Specifications

### 2.1 Unit Dimensions and Mass Budget

```
╔══════════════════════════════════════════════════════════════════╗
║                    SSC-100 BLANKET UNIT                          ║
╠══════════════════════════════════════════════════════════════════╣
║  Deployed Dimensions:     100m × 100m × 0.05mm (nominal)         ║
║  Stowed Dimensions:       2m × 2m × 0.5m (folded package)        ║
║  Total Collecting Area:   10,000 m²                              ║
║  Total Mass:              145 kg                                 ║
║  Areal Density:           14.5 g/m² (including all systems)      ║
╚══════════════════════════════════════════════════════════════════╝
```

**Mass Breakdown:**

| Subsystem | Mass (kg) | % of Total | Notes |
|-----------|-----------|------------|-------|
| PV Active Layer | 45 | 31% | Perovskite-silicon tandem, 4.5 g/m² |
| Substrate/Encapsulation | 35 | 24% | Kapton + SiOx barrier, 3.5 g/m² |
| Structural Booms | 25 | 17% | 4× CFRP deployable booms |
| Power Management | 12 | 8% | MPPT, DC-DC conversion |
| Attitude Control | 10 | 7% | Reaction wheels, magnetorquers |
| Avionics/Comms | 8 | 6% | Processor, radio, sensors |
| Cabling/Interconnects | 6 | 4% | Embedded copper traces |
| Margin | 4 | 3% | Contingency |
| **TOTAL** | **145** | **100%** | |

### 2.2 Photovoltaic Performance

**Cell Technology: Perovskite-on-Silicon Tandem (2-Terminal)**

I recommend a tandem architecture combining:
- **Top cell:** Formamidinium lead iodide perovskite (FAPbI₃), bandgap 1.55 eV
- **Bottom cell:** Ultrathin crystalline silicon (c-Si), 20 μm thickness, bandgap 1.1 eV

```
CELL CROSS-SECTION (not to scale)
═══════════════════════════════════════════════════════════════

    ┌─────────────────────────────────────────────────────┐
    │  Anti-Reflection Coating (MgF₂, 100nm)              │  ↑ Sunlight
    ├─────────────────────────────────────────────────────┤
    │  Transparent Conductor (ITO, 150nm)                 │
    ├─────────────────────────────────────────────────────┤
    │  Electron Transport Layer (SnO₂, 30nm)              │
    ├─────────────────────────────────────────────────────┤
    │  Perovskite Absorber (FAPbI₃, 500nm)                │  ← Top Cell
    ├─────────────────────────────────────────────────────┤
    │  Hole Transport Layer (Spiro-OMeTAD, 200nm)         │
    ├─────────────────────────────────────────────────────┤
    │  Recombination Layer (ITO/nc-Si, 50nm)              │
    ├─────────────────────────────────────────────────────┤
    │  c-Si Absorber (n-type, 20μm)                       │  ← Bottom Cell
    ├─────────────────────────────────────────────────────┤
    │  Back Surface Field (Al-BSF, 1μm)                   │
    ├─────────────────────────────────────────────────────┤
    │  Back Reflector (Ag, 200nm)                         │
    ├─────────────────────────────────────────────────────┤
    │  Substrate (Kapton HN, 25μm)                        │
    ├─────────────────────────────────────────────────────┤
    │  Encapsulation (SiOx/Parylene, 5μm)                 │
    └─────────────────────────────────────────────────────┘

    Total Stack Thickness: ~50 μm
```

**Performance Parameters:**

| Parameter | Value | Assumption/Basis |
|-----------|-------|------------------|
| AM0 Efficiency (BOL) | 22% | Lab demonstrated 29%, derate for manufacturing |
| AM0 Efficiency (EOL, 10yr) | 15% | 3% annual degradation from radiation |
| Operating Voltage | 1.8 V (per cell) | Tandem Voc ~2.1V, Vmp ~1.8V |
| Operating Current | 18 mA/cm² | Jsc ~22 mA/cm², FF ~0.82 |
| Temperature Coefficient | -0.25%/°C | Better than pure Si (-0.4%/°C) |
| Operating Temperature | 80°C | Equilibrium at 1 AU, α/ε = 0.85/0.80 |
| Power per Unit (BOL) | 300 kW | 1361 W/m² × 10,000 m² × 22% |
| Power per Unit (EOL) | 205 kW | After 10 years degradation |

**Why Perovskite-Silicon Tandem?**

1. **Efficiency ceiling:** Single-junction Si maxes at ~29% (Shockley-Queisser). Tandems can reach 45%+ theoretically.
2. **Thin-film compatible:** Perovskite deposits at low temperature onto flexible substrates.
3. **Material abundance:** Lead is concerning but present at <1 g/m². Silicon is literally sand.
4. **Radiation tolerance:** Perovskites show surprising self-healing behavior under some radiation conditions.

**Known Risks:**
- Perovskite long-term stability in space environment is unproven beyond ~3 years
- Lead toxicity complicates manufacturing (contained system required)
- Ion migration under bias causes hysteresis

### 2.3 Structural Architecture

The blanket uses a tensioned membrane architecture with four deployable booms providing the structural frame:

```
                         DEPLOYED CONFIGURATION (Top View)
                         
                                    100m
                    ←─────────────────────────────────────→
                    
               ┌────────────────────────────────────────────┐    ↑
               │╲                                          ╱│    │
               │ ╲         QUADRANT 1      QUADRANT 2     ╱ │    │
               │  ╲                                      ╱  │    │
               │   ╲                                    ╱   │    │
               │    ╲                                  ╱    │    │
               │     ╲                                ╱     │    │
               │      ╲                              ╱      │    │
               │       ╲                            ╱       │    │
               │        ╲                          ╱        │    │
               │         ╲                        ╱         │    │
               │          ╲                      ╱          │   100m
               │           ╲                    ╱           │    │
               │            ╲                  ╱            │    │
               │             ╲                ╱             │    │
               │              ╲    ┌────┐    ╱              │    │
               │               ╲   │ HUB│   ╱               │    │
               │                ╲  │    │  ╱                │    │
               │                 ╲ └────┘ ╱                 │    │
               │                  ╲      ╱                  │    │
               │                   ╲    ╱                   │    │
               │         QUADRANT 4 ╲  ╱  QUADRANT 3        │    │
               │                     ╲╱                     │    │
               │                     ╱╲                     │    │
               │                    ╱  ╲                    │    │
               │                   ╱    ╲                   │    │
               │                  ╱      ╲                  │    │
               │                 ╱        ╲                 │    │
               │                ╱          ╲                │    │
               │               ╱            ╲               │    │
               │              ╱              ╲              │    │
               │             ╱                ╲             │    │
               │            ╱                  ╲            │    │
               │           ╱                    ╲           │    │
               │          ╱                      ╲          │    │
               │         ╱                        ╲         │    │
               │        ╱                          ╲        │    │
               │       ╱                            ╲       │    │
               │      ╱                              ╲      │    │
               │     ╱                                ╲     │    │
               │    ╱                                  ╲    │    │
               │   ╱                                    ╲   │    │
               │  ╱                                      ╲  │    │
               │ ╱                                        ╲ │    │
               │╱                                          ╲│    ↓
               └────────────────────────────────────────────┘
               
               ╲ ╱ = Deployable CFRP boom (70.7m length)
               
               Membrane tension: 0.1 N/m (very light, just enough to flatten)
               Boom tip deflection under tension: <0.5m
```

**Boom Specifications:**

| Parameter | Value |
|-----------|-------|
| Type | Storable Tubular Extendible Member (STEM) |
| Material | T800 CFRP, 0.1mm wall thickness |
| Deployed Length | 70.7 m (diagonal to corner) |
| Deployed Diameter | 50 mm |
| Stowed Configuration | Flattened coil, 400mm diameter |
| Mass per Boom | 5.2 kg |
| Bending Stiffness (EI) | 850 N·m² |
| Deployment Mechanism | Motor-driven uncoiling, 10 min deployment |

### 2.4 Electrical Architecture

```
POWER SYSTEM BLOCK DIAGRAM

    ┌─────────────────────────────────────────────────────────────────────┐
    │                         PV BLANKET (10,000 m²)                      │
    │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                   │
    │  │ String 1│ │ String 2│ │ String 3│ │String N │   N = 400 strings │
    │  │ 50 cells│ │ 50 cells│ │ 50 cells│ │ 50 cells│   25 m² per string│
    │  │  90V    │ │  90V    │ │  90V    │ │  90V    │                   │
    │  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘                   │
    │       │           │           │           │                        │
    │       └───────────┴─────┬─────┴───────────┘                        │
    │                         │                                          │
    └─────────────────────────┼──────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   String        │
                    │   Combiner Box  │
                    │   (4 units)     │
                    │   100 strings   │
                    │   each          │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │   Central MPPT  │
                    │   Controller    │
                    │                 │
                    │   Input: 90V    │
                    │   Output: 120V  │
                    │   Pmax: 350 kW  │
                    │   Eff: 98%      │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐  ┌──────────┐  ┌──────────┐
        │ Avionics │  │ Attitude │  │  Power   │
        │  Bus     │  │ Control  │  │  Output  │
        │  28V     │  │  28V     │  │  Port    │
        │  200W    │  │  150W    │  │  120V    │
        └──────────┘  └──────────┘  └──────────┘
                                         │
                                         ▼
                              To Power Transmission
                              System (separate proposal)
```

**Electrical Specifications:**

|