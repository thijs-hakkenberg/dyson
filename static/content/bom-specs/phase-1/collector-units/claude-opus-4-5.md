---
bomId: "bom-1-1"
itemName: "Solar Collector Units"
itemSlug: "collector-units"
modelId: "claude-opus-4-5"
modelName: "Claude Opus 4.5"
generated: "2026-02-01"
phase: "phase-1"
---

# Technical Proposal: Solar Collector Units for Project Dyson
## Phase 1 - Initial Swarm Deployment

**Document Version:** 1.0
**Author:** Space Systems Engineering Division
**Classification:** Project Dyson Internal

---

## Executive Summary

This proposal presents a comprehensive design for the Solar Collector Unit (SCU), the fundamental energy-harvesting element of the Dyson swarm. After extensive trade studies, I recommend a **modular thin-film photovoltaic sail architecture** optimized for autonomous deployment, minimal mass-to-area ratio, and graceful degradation. The Phase 1 deployment targets **10,000 SCUs** generating a combined **50 GW** of continuous power, establishing the industrial and operational foundation for exponential scaling.

---

## 1. Design Philosophy and Approach

### 1.1 Core Design Principles

My recommended approach prioritizes:

1. **Mass Efficiency Over Peak Performance**: At interplanetary scales, launch mass dominates cost. I accept lower conversion efficiency (15-18%) in exchange for ultra-thin, lightweight structures achieving <100 g/m².

2. **Graceful Degradation**: No single-point failures. Each SCU operates independently; swarm functionality degrades linearly with unit loss.

3. **Design for Manufacturing**: Every component optimized for automated production. Complexity pushed to ground-based facilities; space-side assembly minimized.

4. **Evolutionary Architecture**: Phase 1 units are intentionally conservative, serving as operational testbeds while delivering useful power.

### 1.2 Trade Study Summary

| Architecture Option | Mass/Area | Efficiency | Complexity | Recommendation |
|---------------------|-----------|------------|------------|----------------|
| Rigid Si panels | 2.5 kg/m² | 22% | Medium | Rejected - mass prohibitive |
| Thin-film CIGS | 85 g/m² | 16% | Low | **Selected** |
| Multi-junction concentrator | 1.2 kg/m² | 35% | High | Phase 3 consideration |
| Rectenna (microwave) | 150 g/m² | 40% | Very High | Future technology |

**Decision Rationale**: Thin-film CIGS (Copper Indium Gallium Selenide) on polyimide substrate offers the optimal balance. The 6× mass reduction versus rigid panels outweighs the efficiency penalty when considering total system economics.

---

## 2. Technical Specifications

### 2.1 Primary Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Collector Area** | 10,000 m² (100m × 100m) | Hexagonal packing in swarm |
| **Total Mass** | 1,850 kg | Includes all subsystems |
| **Areal Density** | 185 g/m² | System-level, not film only |
| **Solar Cell Efficiency** | 16% BOL, 12% EOL | 15-year design life |
| **Power Output (1 AU)** | 5.2 MW BOL | At solar constant 1,361 W/m² |
| **Power Output (0.7 AU)** | 10.6 MW BOL | Optimal orbital position |
| **Operating Temperature** | -40°C to +120°C | Passive thermal management |
| **Design Life** | 15 years | With degradation margin |
| **Orbital Altitude** | 0.7 AU heliocentric | Inside Venus orbit |

### 2.2 Mass Budget

```
SOLAR COLLECTOR UNIT - MASS BREAKDOWN
══════════════════════════════════════════════════════════════
Subsystem                          Mass (kg)    Percentage
──────────────────────────────────────────────────────────────
Photovoltaic Array                    850          45.9%
  - CIGS cells on polyimide (650)
  - Interconnects & busbars (120)
  - Protective coatings (80)

Structural System                     380          20.5%
  - Deployable booms (280)
  - Tensioning system (60)
  - Hub structure (40)

Power Management                      185          10.0%
  - DC-DC converters (95)
  - Power routing (50)
  - Cabling harness (40)

Avionics & Control                    145           7.8%
  - Flight computer (25)
  - Attitude sensors (35)
  - Reaction wheels (55)
  - Magnetorquers (30)

Communications                         85           4.6%
  - Laser comm terminal (45)
  - RF backup system (25)
  - Antennas (15)

Propulsion                            120           6.5%
  - Ion thruster (40)
  - Xenon tank & feed (65)
  - PPU (15)

Thermal Control                        45           2.4%
  - MLI blankets (25)
  - Radiator panels (20)

Margin (10%)                           40           2.2%
──────────────────────────────────────────────────────────────
TOTAL                               1,850         100.0%
══════════════════════════════════════════════════════════════
```

### 2.3 Power Budget (Housekeeping)

```
SCU POWER CONSUMPTION - NOMINAL OPERATIONS
══════════════════════════════════════════════════════════════
Subsystem                          Power (W)    Duty Cycle
──────────────────────────────────────────────────────────────
Avionics & Computing                   85          100%
  - Flight computer (45W)
  - Attitude determination (25W)
  - Health monitoring (15W)

Attitude Control                      120           20%
  - Reaction wheels (100W peak)
  - Magnetorquers (20W)

Communications                        150           15%
  - Laser terminal (120W active)
  - RF backup (30W)

Propulsion                            450            5%
  - Ion thruster (400W)
  - Valve/feed system (50W)

Thermal Management                     25          100%
  - Heaters (survival mode)

──────────────────────────────────────────────────────────────
Average Continuous Load:              145 W
Peak Load:                            830 W
Available for Transmission:      5,199,855 W (99.97%)
══════════════════════════════════════════════════════════════
```

---

## 3. System Architecture

### 3.1 Overall Configuration

```
                            SOLAR COLLECTOR UNIT - DEPLOYED CONFIGURATION
                                        (Top View - Not to Scale)
    
                                              100 m
                            ◄─────────────────────────────────────────►
                            
                    ┌─────────────────────────────────────────────────────┐
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  ▲
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ 100 m
                    │░░░░░░░░░░░░░░░░░░┌───────┐░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░│  HUB  │░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░└───────┘░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  │
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  ▼
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    │░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│
                    └─────────────────────────────────────────────────────┘
                    
                    ░░░ = Photovoltaic Array Segments (25 modules, 20m × 20m each)
                    
                    
                            STOWED CONFIGURATION (Launch Package)
                            
                                    ┌─────────┐
                                    │         │  2.0 m
                                    │   HUB   │  diameter
                                    │         │
                                    ├─────────┤
                                    │▓▓▓▓▓▓▓▓▓│
                                    │▓▓▓▓▓▓▓▓▓│  Folded array
                                    │▓▓▓▓▓▓▓▓▓│  stack
                                    │▓▓▓▓▓▓▓▓▓│  (4.5 m)
                                    │▓▓▓▓▓▓▓▓▓│
                                    │▓▓▓▓▓▓▓▓▓│
                                    └─────────┘
                                    
                                    Total stowed: 2.0m × 2.0m × 6.5m
                                    Volume: 26 m³
```

### 3.2 Structural Architecture

The SCU employs a **spin-stabilized tensioned membrane** architecture:

```
                    DEPLOYMENT SEQUENCE
                    
    STAGE 1: Launch         STAGE 2: Hub Deploy      STAGE 3: Boom Extension
    
        ┌───┐                    ┌───┐                      ╱───╲
        │▓▓▓│                   ╱│   │╲                   ╱╱     ╲╲
        │▓▓▓│                 ╱  │HUB│  ╲               ╱╱   HUB   ╲╲
        │▓▓▓│               ╱    │   │    ╲           ╱╱     ┌─┐     ╲╲
        └───┘               ╲    └───┘    ╱           ╲╲     └─┘     ╱╱
                             ╲          ╱               ╲╲         ╱╱
                              ╲        ╱                  ╲╲     ╱╱
                               ╲──────╱                     ╲───╱
                               
                            Booms begin              4 primary booms
                            unfolding                extend to 70m
    
    
    STAGE 4: Membrane Deploy     STAGE 5: Tensioning      STAGE 6: Spin-Up
    
           ╱ ─ ─ ─ ─ ╲              ┌─────────────┐         ┌─────────────┐
         ╱             ╲            │░░░░░░░░░░░░░│         │░░░░░░░░░░░░░│
       ╱    ░░░░░░░      ╲          │░░░░░░░░░░░░░│    ──►  │░░░░░░░░░░░░░│ ──►
      │   ░░░░░░░░░░░     │         │░░░░░░░░░░░░░│         │░░░░░░░░░░░░░│
      │  ░░░░░┌─┐░░░░░    │         │░░░░░┌─┐░░░░░│         │░░░░░┌─┐░░░░░│
      │   ░░░░└─┘░░░░░    │         │░░░░░└─┘░░░░░│         │░░░░░└─┘░░░░░│
       ╲    ░░░░░░░      ╱          │░░░░░░░░░░░░░│    ◄──  │░░░░░░░░░░░░░│ ◄──
         ╲             ╱            │░░░░░░░░░░░░░│         │░░░░░░░░░░░░░│
           ╲ ─ ─