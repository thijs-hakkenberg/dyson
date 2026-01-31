---
bomId: "bom-0-4"
itemName: "Transport Vehicles"
itemSlug: "transport-vehicles"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-01-31"
phase: "phase-0"
---

# Transport Vehicles Technical Specification

## 1. Executive Summary

### Purpose

The Transport Vehicle system constitutes the primary logistics infrastructure for Phase 0 Space Resource Processing, enabling reliable transfer of extracted and processed materials between distributed asteroid mining sites and the central orbital processing station. This specification defines a robust, high-capacity cargo spacecraft designed for sustained operations in the main asteroid belt with provisions for future human-rating.

### Design Philosophy

The GPT-5.2 specification advocates for a **maximum-payload, future-adaptable architecture** that prioritizes:

- **Large single-shipment capacity** to minimize trip frequency and operational complexity
- **Hall-effect thruster propulsion** for proven reliability and operational simplicity
- **Human-rating pathway** enabling crew transport capability in Phase 1+
- **Robust docking systems** with multiple redundancy levels for critical cargo operations
- **Structural margins** accommodating future mission profile evolution

This approach accepts higher per-vehicle costs in exchange for operational simplicity, reduced coordination overhead, and evolutionary growth potential.

### Critical Success Factors

| Factor | Target | Rationale |
|--------|--------|-----------|
| Payload capacity | >25,000 kg | Minimizes required trip frequency |
| Docking reliability | >99.9% success | Critical for autonomous operations |
| Structural life | 15+ years | Amortizes high unit cost |
| Human-rating margin | 1.4x safety factor | Enables future crewed missions |
| Propulsion availability | >98% | Hall thrusters proven heritage |

---

## 2. Technical Specifications

### Physical Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| Overall length | 42.0 m | Extended configuration with cargo |
| Structural beam | 8.5 m | Primary load-bearing width |
| Solar array span | 52.0 m | Four-panel deployable wings |
| Dry mass | 8,500 kg | Includes docking systems |
| Maximum cargo capacity | 28,000 kg | Pressurized + unpressurized |
| Propellant capacity | 6,200 kg | Xenon primary, krypton backup |
| Total wet mass (loaded) | 42,700 kg | Maximum design mass |
| Pressurizable volume | 45 m³ | Future crew module location |
| Solar array area | 420 m² | High-efficiency cells |

### Performance Requirements

| Metric | Requirement | Verification Method |
|--------|-------------|---------------------|
| Maximum delta-V | 14.0 km/s | Full propulsion test |
| Total thrust | 4.8 N | Cluster acceptance test |
| Specific impulse | 3,200 s | Performance characterization |
| Power generation | 95 kW @ 2.5 AU | Array illumination test |
| Transit time (full load) | 75-120 days | Mission simulation |
| Pointing accuracy | <0.05 degree | Fine guidance verification |
| Docking alignment | <2 cm, <0.5° | Sensor + actuator testing |

### Environmental Tolerances

| Condition | Operating Range | Design Limit |
|-----------|-----------------|--------------|
| Solar distance | 1.5 - 4.0 AU | 1.2 - 5.0 AU |
| Thermal extremes | -160°C to +140°C | -200°C to +180°C |
| Radiation (annual) | 75 krad | 150 krad lifetime |
| Debris environment | 10⁻⁵ g/cm³ flux | Whipple shielding on critical areas |
| Acceleration loads | 0.001 g sustained | 5 g emergency abort |

### Operational Lifetime

| Phase | Duration | Configuration |
|-------|----------|---------------|
| Initial checkout | 3 months | Earth vicinity shakedown |
| Primary cargo ops | 12 years | Full autonomous capability |
| Extended operations | 5 years | Periodic refurbishment |
| Human-rated upgrade | +10 years | With ECLSS installation |

---

## 3. System Design

### Architecture Diagram

```
              TRANSPORT VEHICLE - EXPLODED VIEW SCHEMATIC

    ═══════════════════════════════════════════════════════════════════
                           FORWARD SECTION (Docking End)
    ═══════════════════════════════════════════════════════════════════

                        ┌─────────────────────────┐
                        │   DOCKING ADAPTER       │
                        │  ┌───────────────────┐  │
                        │  │ Primary Port      │  │◄── IDSS-Compatible
                        │  │ (Human-rated)     │  │
                        │  └───────────────────┘  │
                        │  ┌───────────────────┐  │
                        │  │ Secondary Port    │  │◄── Cargo-only backup
                        │  │ (Autonomous)      │  │
                        │  └───────────────────┘  │
                        │   Capture Sensors      │
                        │   Alignment Guides     │
                        └───────────┬─────────────┘
                                    │
    ═══════════════════════════════════════════════════════════════════
                           CENTRAL SECTION (Cargo Bay)
    ═══════════════════════════════════════════════════════════════════

    ┌───────────────────────────────┼───────────────────────────────────┐
    │                               │                                    │
    │  SOLAR ARRAY A         ┌─────┴─────┐          SOLAR ARRAY B       │
    │  ┌────────────┐        │           │          ┌────────────┐      │
    │  │ 105 m²     │◄───────┤  AVIONICS ├─────────►│ 105 m²     │      │
    │  │ 23.75 kW   │        │    BAY    │          │ 23.75 kW   │      │
    │  └────────────┘        │           │          └────────────┘      │
    │  ┌────────────┐        └─────┬─────┘          ┌────────────┐      │
    │  │ 105 m²     │              │                │ 105 m²     │      │
    │  │ 23.75 kW   │              │                │ 23.75 kW   │      │
    │  └────────────┘              │                └────────────┘      │
    │                              │                                    │
    │  ┌───────────────────────────┴───────────────────────────────┐   │
    │  │                    CARGO BAY STRUCTURE                     │   │
    │  │  ┌─────────────────────────────────────────────────────┐  │   │
    │  │  │     PRESSURIZABLE SECTION (Future ECLSS)            │  │   │
    │  │  │     Volume: 45 m³ | Mass Capacity: 8,000 kg         │  │   │
    │  │  └─────────────────────────────────────────────────────┘  │   │
    │  │  ┌─────────────────────────────────────────────────────┐  │   │
    │  │  │     UNPRESSURIZED CARGO BAYS                        │  │   │
    │  │  │     ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐        │  │   │
    │  │  │     │Bay 1│ │Bay 2│ │Bay 3│ │Bay 4│ │Bay 5│        │  │   │
    │  │  │     │4t   │ │4t   │ │4t   │ │4t   │ │4t   │        │  │   │
    │  │  │     └─────┘ └─────┘ └─────┘ └─────┘ └─────┘        │  │   │
    │  │  │     Total unpressurized capacity: 20,000 kg         │  │   │
    │  │  └─────────────────────────────────────────────────────┘  │   │
    │  └───────────────────────────┬───────────────────────────────┘   │
    │                              │                                    │
    └──────────────────────────────┼────────────────────────────────────┘
                                   │
    ═══════════════════════════════════════════════════════════════════
                           AFT SECTION (Propulsion)
    ═══════════════════════════════════════════════════════════════════

                    ┌──────────────┴──────────────┐
                    │     PROPULSION MODULE       │
                    │  ┌────────────────────────┐ │
                    │  │  Xenon Tank Farm       │ │
                    │  │  6,200 kg capacity     │ │
                    │  │  4 x COPV @ 200 bar    │ │
                    │  └────────────────────────┘ │
                    │  ┌────────────────────────┐ │
                    │  │  Hall Thruster Cluster │ │
                    │  │    ┌──┐  ┌──┐  ┌──┐   │ │
                    │  │    │T1│  │T2│  │T3│   │ │
                    │  │    └──┘  └──┘  └──┘   │ │
                    │  │       ┌──┐  ┌──┐      │ │
                    │  │       │T4│  │T5│      │ │
                    │  │       └──┘  └──┘      │ │
                    │  │    ┌──┐  ┌──┐  ┌──┐   │ │
                    │  │    │T6│  │T7│  │T8│   │ │
                    │  │    └──┘  └──┘  └──┘   │ │
                    │  │  8 x 600W Hall Effect │ │
                    │  └────────────────────────┘ │
                    └─────────────────────────────┘
```

### Major Subsystems

**1. Hall-Effect Propulsion System (HEPS)**
- Eight SPT-140 class Hall thrusters in redundant cluster configuration
- Xenon propellant with krypton backup capability
- Centralized Power Processing Unit (PPU) with individual thruster switching
- Magnetic field optimization for >15,000 hour operational life
- Thrust vector control via selective thruster firing patterns

**2. Advanced Docking System (ADS)**
- IDSS-compatible primary port for human-rated operations
- Autonomous cargo docking secondary port with wider capture envelope
- LIDAR proximity sensors (range 10 km to contact)
- Machine vision system for relative navigation
- Soft-capture mechanism with load attenuation

**3. Electrical Power System (EPS)**
- Four-panel deployable solar array with dual-axis tracking
- 150 Ah lithium-polymer battery system (eclipse + peak loads)
- Distributed power architecture with zone isolation
- 28V / 120V / 300V bus structure for varied loads

**4. Thermal Control System (TCS)**
- Variable-conductance heat pipes for load spreading
- Deployable radiator panels (32 m² total area)
- Multi-layer insulation with low-alpha coating
- Electrical heater circuits for cold-case survival
- Phase-change material buffers for transient loads

### Interfaces

| Interface | Standard | Capability | Maturity |
|-----------|----------|------------|----------|
| Station docking | IDSS | Human-rated + cargo | Flight proven |
| Mining platform | Custom LIDS-derived | Cargo only | Development |
| Communication | CCSDS | All protocols | Flight proven |
| Propellant transfer | Custom QD | Xenon resupply | Development |
| Power transfer | 120V DC | 5 kW continuous | Qualified |

---

## 4. Control Systems

### Autonomy Level

The Transport Vehicle implements **tiered autonomy** with graceful degradation:

| Mode | Autonomy Level | Trigger Condition |
|------|----------------|-------------------|
| Full autonomous | Level 5 | Normal operations |
| Supervised autonomous | Level 4 | Complex proximity ops |
| Teleoperated | Level 2 | Ground command override |
| Safe mode | Level 3 | Fault detection |
| Crewed override | Level 1 | Future human-rated ops |

### Communication Architecture

```
                    COMMUNICATION SYSTEM ARCHITECTURE

    ┌─────────────────────────────────────────────────────────────────┐
    │                      PRIMARY LINKS                               │
    └─────────────────────────────────────────────────────────────────┘

         EARTH                                          ASTEROID BELT
           │                                                  │
    ┌──────┴──────┐                                   ┌──────┴──────┐
    │   DSN 34m   │                                   │  TRANSPORT   │
    │   Complex   │◄══════════════════════════════════►│   VEHICLE   │
    └─────────────┘        X-Band (8 GHz)             └──────┬──────┘
           │               1 Mbps downlink                    │
           │               64 kbps uplink                     │
    ┌──────┴──────┐                                          │
    │   Mission   │                                          │
    │  Control    │                                          │
    └─────────────┘                                          │
                                                             │
    ┌─────────────────────────────────────────────────────────────────┐
    │                      LOCAL LINKS                                 │
    └─────────────────────────────────────────────────────────────────┘

              PROCESSING                          MINING
               STATION                           PLATFORM
                  │                                  │
           ┌──────┴──────┐                   ┌──────┴──────┐
           │   Station   │                   │  Platform   │
           │   Relay     │                   │   Beacon    │
           └──────┬──────┘                   └──────┬──────┘
                  │          S-Band (2 GHz)        │
                  │◄═══════════════════════════════►│
                  │          UHF Proximity         │
                  └─────────────┬─────────────────┘
                                │
                         ┌──────┴──────┐
                         │  TRANSPORT   │
                         │   VEHICLE   │
                         └─────────────┘

    Link Budget Summary:
    • DSN X-band: 35 dB margin at 4 AU
    • Local S-band: 20 dB margin at 1000 km
    • Proximity UHF: 15 dB margin at 10 km
```

### Fault Tolerance Design

| System | Redundancy Level | Failure Response |
|--------|------------------|------------------|
| Flight computers | Triple modular | 2-of-3 voting |
| Propulsion | 8 thrusters (5 required) | Automatic reconfiguration |
| Power buses | Dual string | Cross-tie switching |
| Communication | X-band + S-band + UHF | Automatic failover |
| Docking sensors | Triple-redundant | Sensor fusion |
| Attitude control | RW + CMG + RCS | Mode switching |

### Software Architecture

| Subsystem | Implementation | Certification |
|-----------|---------------|---------------|
| Core flight software | VxWorks 7 RTOS | DO-178C Level A |
| GNC algorithms | Model-based (Simulink) | DO-178C Level A |
| Docking automation | Computer vision + ML | Custom V&V |
| Health monitoring | Rule-based + anomaly detection | DO-178C Level B |
| Ground interface | CCSDS MO services | ECSS-E-ST-70 |

---

## 5. Manufacturing & Assembly

### Production Approach

A **design-for-manufacturing** philosophy guides vehicle production:

- **Modular construction**: Vehicle separates into four major modules for parallel fabrication
- **Commercial partnerships**: Primary structure from Lockheed Martin, propulsion from Busek
- **Vertical integration**: Final assembly, integration, and test at dedicated facility
- **Lot production**: All 10 vehicles produced in single continuous lot

### Production Schedule

| Milestone | Timeline | Deliverables |
|-----------|----------|--------------|
| Module fabrication start | T+0 months | Long-lead materials |
| Structural qualification | T+18 months | Qualification article |
| First flight unit assembly | T+24 months | Unit 1 structure complete |
| Unit 1 integration complete | T+30 months | Full vehicle ready |
| Production rate achieved | T+36 months | 1 unit per 3 months |
| Final unit delivery | T+60 months | Fleet complete |

### Manufacturing Challenges

| Challenge | Technical Detail | Resolution Approach |
|-----------|------------------|---------------------|
| Large composite structures | 8.5m diameter cargo bay requires large autoclave | Partnership with aerospace composites vendor |
| Hall thruster cluster alignment | <0.1° pointing requirement across 8 units | Optical metrology during integration |
| Pressurizable section certification | Future human rating adds requirements now | Build to crewed vehicle standards upfront |
| Docking mechanism reliability | Complex mechanical system, 10,000 cycle life | Extensive ground cycling program |
| Wiring harness mass | 42m vehicle length drives harness weight | Fiber optic data, wireless sensors |

### Quality Assurance

| Test Phase | Scope | Pass Criteria |
|------------|-------|---------------|
| Component screening | 100% flight hardware | Manufacturer specifications |
| Module acceptance | Each of 4 modules | Functional + environmental |
| Vehicle integration | Complete vehicle | End-to-end functional |
| Thermal vacuum | Full vehicle | 3 cycles, full temperature range |
| Vibration/acoustic | Full vehicle | Launch environment qualification |
| RF compatibility | Full vehicle | EMI/EMC compliance |

---

## 6. Development Roadmap

### Technology Readiness Assessment

| Technology | Current TRL | Target TRL | Gap Assessment |
|------------|-------------|------------|----------------|
| Hall thruster cluster | 9 | 9 | Flight heritage sufficient |
| IDSS docking adapter | 9 | 9 | ISS operations heritage |
| Autonomous rendezvous | 7 | 9 | Additional flight demonstrations |
| Large solar arrays | 8 | 9 | Minor scaling required |
| Crewed spacecraft margins | 6 | 8 | Design analysis + testing |

### R&D Milestones

| Milestone | Date | Technical Objectives |
|-----------|------|---------------------|
| Requirements review | Q2 2027 | Baseline specifications frozen |
| Preliminary design review | Q4 2027 | Architecture validated |
| Autonomous docking demo | Q2 2028 | LEO demonstration mission |
| Critical design review | Q4 2028 | Detailed design complete |
| Propulsion life test complete | Q2 2029 | 20,000 hour validation |
| Qualification review | Q4 2029 | All testing complete |
| Flight readiness review | Q2 2030 | First vehicle cleared |

### Development Timeline

```
YEAR    2026        2027        2028        2029        2030        2031
        ├───────────┼───────────┼───────────┼───────────┼───────────┤

PHASE A │▓▓▓▓▓▓▓▓▓▓▓│           │           │           │           │
Concept │ Requirements Analysis  │           │           │           │
Study   │ Trade Studies         │           │           │           │
        │ System Concept        │           │           │           │

PHASE B │           │▓▓▓▓▓▓▓▓▓▓▓│▓▓▓▓▓▓     │           │           │
Prelim  │           │ Preliminary Design     │           │           │
Design  │           │ Risk Reduction         │           │           │
        │           │ PDR ────────►         │           │           │

PHASE C │           │           │    ▓▓▓▓▓▓▓│▓▓▓▓▓▓▓▓▓▓▓│           │
Detailed│           │           │ Detailed Design       │           │
Design  │           │           │ Long-Lead Procurement │           │
        │           │           │ CDR ──────────────►  │           │

PHASE D │           │           │           │     ▓▓▓▓▓▓│▓▓▓▓▓▓▓▓▓▓▓│
Fab &   │           │           │           │ Fabrication            │
Test    │           │           │           │ Integration            │
        │           │           │           │ Testing                │
        │           │           │           │       FRR ─────────►  │
```

---

## 7. Cost Breakdown

### Development Costs

| Category | Cost ($M) | Notes |
|----------|-----------|-------|
| Program management | 65 | 5-year development phase |
| Systems engineering | 95 | Requirements through verification |
| Propulsion development | 85 | Cluster integration + PPU |
| Structures development | 75 | Composite cargo bay qualification |
| Avionics development | 110 | Flight computers + sensors |
| Docking system development | 80 | IDSS + autonomous system |
| Software development | 90 | Flight + ground software |
| Ground systems | 45 | Mission control + simulators |
| Test facilities & campaigns | 85 | Thermal vacuum, vibration, EMI |
| Risk reserve (15%) | 110 | Program contingency |
| **Development Total** | **840** | |

### Production Costs (Per Unit)

| Element | Cost ($M) | Basis |
|---------|-----------|-------|
| Primary structure | 28 | Large composite fabrication |
| Propulsion system | 38 | 8 thrusters + tanks + PPU |
| Solar array system | 22 | 420 m² deployable arrays |
| Avionics suite | 18 | Computers + sensors + harness |
| Docking systems | 15 | Dual port configuration |
| Thermal control | 8 | Radiators + MLI + heaters |
| Integration & test | 22 | 9-month I&T flow |
| **Per Unit Total** | **151** | |
| **Fleet Production (10 units)** | **1,360** | Includes tooling amortization |

### Operations Costs (12-Year Primary Mission)

| Category | Annual ($M) | Total ($M) |
|----------|-------------|------------|
| Flight operations | 18 | 216 |
| Navigation & tracking | 6 | 72 |
| Software maintenance | 4 | 48 |
| Hardware sustaining | 8 | 96 |
| Propellant logistics | 12 | 144 |
| **Operations Total** | **48** | **576** |

### Total Program Cost

| Phase | Cost ($M) | Percentage |
|-------|-----------|------------|
| Development | 840 | 30.3% |
| Production (10 units) | 1,360 | 49.0% |
| Operations (12 years) | 576 | 20.7% |
| **Total Program** | **2,776** | 100% |

**Note**: Total exceeds $2B budget allocation. Value engineering or scope reduction required. Options include:
- Reduce to 8 vehicles ($2,504M)
- Reduce operations phase to 10 years ($2,680M)
- Defer human-rating provisions ($2,450M)

---

## 8. Risk Analysis

### Top 5 Risks

| ID | Risk | Likelihood | Consequence | Score | Trend |
|----|------|------------|-------------|-------|-------|
| R1 | Autonomous docking failure causes vehicle loss | Low | Critical | 15 | Stable |
| R2 | Cost growth exceeds budget allocation | High | High | 16 | Increasing |
| R3 | Hall thruster cluster EMI causes avionics upset | Medium | High | 12 | Decreasing |
| R4 | Solar array deployment failure | Low | Critical | 10 | Stable |
| R5 | Docking port incompatibility with stations | Medium | Medium | 9 | Decreasing |

### Mitigation Strategies

| Risk | Primary Mitigation | Fallback |
|------|-------------------|----------|
| R1 - Docking failure | Comprehensive simulation + LEO demo | Ground-commanded backup mode |
| R2 - Cost growth | Design-to-cost gates, descope options | Fleet size reduction |
| R3 - EMI interference | Early EMC testing, thruster shielding | Operational sequencing constraints |
| R4 - Array deployment | Heritage mechanisms, redundant actuators | Partial deployment operations |
| R5 - Port incompatibility | Early ICD coordination, adapter design | Universal docking adapter kit |

### Fallback Options

| Scenario | Response | Mission Impact |
|----------|----------|----------------|
| Single vehicle loss | Redistribute cargo manifest | 10% throughput reduction |
| Propulsion degradation | Reduced delta-V operations | Extended transit times |
| Docking system failure | Alternative port or EVA assist | Schedule delay |
| Communication loss | Autonomous safe mode | 72-hour recovery |
| Fleet attrition >30% | Emergency procurement | 36-month fleet reconstitution |

---

## 9. Open Questions

### Technical Challenges Requiring Resolution

1. **Human-rating cost-benefit**: Should full human-rating margins be implemented now, or deferred until Phase 1 requirement is confirmed? Current specification adds approximately $326M for provisions that may never be used.

2. **Propellant standardization**: The asteroid mining platforms may use different propellants. Should transport vehicles carry adapter equipment for xenon transfer to non-xenon spacecraft?

3. **Cargo bay pressurization**: The pressurizable section could enable sensitive cargo transport. What are the specific use cases, and do they justify the mass penalty?

4. **Docking port quantity**: Current design has two ports. Would a third port (nadir-facing) significantly improve operational flexibility?

5. **Power margin allocation**: At 95 kW generation, should more power be reserved for future payload growth, or optimized for current mission?

### Research Needs

| Topic | Objective | Priority |
|-------|-----------|----------|
| Composite fatigue life | Validate 15-year structural life | Critical |
| Hall thruster clustering effects | Characterize plume interactions | High |
| Autonomous docking ML validation | Certify vision algorithms | High |
| Xenon long-term storage | Validate tank seal integrity | Medium |
| Human factors for future crewing | Pre-position ECLSS interfaces | Low |

### Pending Decisions

| Decision | Options Under Consideration | Required By |
|----------|---------------------------|-------------|
| Budget reconciliation | Descope vs. additional funding request | Q3 2026 |
| Docking standard final selection | IDSS vs. NDS vs. hybrid | Q4 2026 |
| Thruster vendor selection | Busek vs. Aerojet vs. international | Q1 2027 |
| Launch vehicle | Starship vs. SLS vs. commercial heavy | Q2 2027 |
| Operations contractor | In-house vs. commercial provider | Q3 2027 |

---

## Appendix A: Human-Rating Provisions

The following provisions are incorporated to enable future crew transport capability:

| System | Cargo-Only Requirement | Human-Rated Requirement | Current Implementation |
|--------|----------------------|------------------------|------------------------|
| Structural factor | 1.25 | 1.4 | 1.4 (human-rated) |
| Pressure vessel | Not required | 14.7 psia, double wall | Volume reserved, single wall |
| ECLSS interfaces | None | Full life support | Utility routing only |
| Abort capability | None | Separation + return | Structural hardpoints |
| Radiation protection | 50 rad/year | 20 rad/year | Shielding provisions |

### Upgrade Path to Human-Rated Operations

| Phase | Modifications Required | Cost Estimate | Schedule |
|-------|----------------------|---------------|----------|
| Phase 1 | ECLSS module installation | $45M/vehicle | 6 months |
| Phase 2 | Crew accommodations | $25M/vehicle | 3 months |
| Phase 3 | Emergency systems | $35M/vehicle | 4 months |
| Certification | NASA/ESA review | $80M program | 18 months |

## Appendix B: Docking System Details

### Primary Port (IDSS-Compatible)

| Parameter | Specification |
|-----------|--------------|
| Capture envelope | 10 cm lateral, 5° angular |
| Contact velocity | 0.01 - 0.1 m/s |
| Attenuator stroke | 25 cm |
| Seal diameter | 80 cm |
| Utility connections | Power (28V, 120V), data (Ethernet, 1553), fluid |
| Cycle life | 500 mate/demate |

### Secondary Port (Cargo Autonomous)

| Parameter | Specification |
|-----------|--------------|
| Capture envelope | 30 cm lateral, 15° angular |
| Contact velocity | 0.05 - 0.3 m/s |
| Soft capture mechanism | Three-petal design |
| Utility connections | Power only (28V) |
| Cycle life | 2,000 mate/demate |

## Appendix C: Acronyms and Abbreviations

| Acronym | Definition |
|---------|------------|
| ADS | Advanced Docking System |
| CDR | Critical Design Review |
| CMG | Control Moment Gyroscope |
| COPV | Composite Overwrapped Pressure Vessel |
| ECLSS | Environmental Control and Life Support System |
| EMC | Electromagnetic Compatibility |
| EMI | Electromagnetic Interference |
| FRR | Flight Readiness Review |
| GNC | Guidance, Navigation, and Control |
| HEPS | Hall-Effect Propulsion System |
| ICD | Interface Control Document |
| IDSS | International Docking System Standard |
| LIDS | Low Impact Docking System |
| NDS | NASA Docking System |
| PDR | Preliminary Design Review |
| PPU | Power Processing Unit |
| QD | Quick Disconnect |
| RCS | Reaction Control System |
| RTOS | Real-Time Operating System |
| RW | Reaction Wheel |
| SPT | Stationary Plasma Thruster |
| TCS | Thermal Control System |
| TRL | Technology Readiness Level |
| V&V | Verification and Validation |
