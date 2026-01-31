---
bomId: "bom-0-1"
itemName: "Prospecting Satellites"
itemSlug: "prospecting-satellites"
modelId: "claude-opus-4-5"
modelName: "Claude Opus 4.5"
generated: "2026-01-31"
phase: "phase-0"
---

# Prospecting Satellites - Technical Specifications

## 1. Executive Summary

### Purpose and Role in Phase 0
Prospecting Satellites form the intelligence backbone of Phase 0, enabling systematic identification and characterization of near-Earth asteroids (NEAs) suitable for mining operations. These spacecraft will map asteroid composition, surface properties, orbital parameters, and accessibility metrics to inform mining target selection.

### Key Design Philosophy
- **Swarm Architecture:** 50 small, standardized satellites operating as a coordinated constellation
- **Rapid Iteration:** Modular design enabling rapid production and technology upgrades
- **Autonomous Operations:** Minimal ground intervention required for routine operations
- **Data-Centric:** Optimized for spectroscopic data collection and transmission

### Critical Success Factors
1. Achieving comprehensive spectral coverage of 1,000+ NEAs within 5 years
2. Maintaining >90% constellation availability throughout mission
3. Generating actionable mining target rankings with <15% uncertainty in resource estimates
4. Establishing validated asteroid database for subsequent mission planning

## 2. Technical Specifications

### Physical Specifications
| Parameter | Value |
|-----------|-------|
| Mass (dry) | 85 kg |
| Mass (wet, with propellant) | 120 kg |
| Dimensions (stowed) | 0.6m × 0.6m × 0.8m |
| Dimensions (deployed) | 2.4m × 0.6m × 0.8m (with solar arrays) |
| Solar Array Area | 3.2 m² |
| Power Generation (1 AU) | 480 W |
| Power Generation (1.5 AU) | 213 W |

### Performance Requirements
- **Survey Rate:** Each satellite shall characterize ≥20 asteroids per year
- **Spectral Resolution:** 5 nm in visible, 20 nm in near-infrared
- **Spatial Resolution:** 10 m/pixel at 100 km range
- **Position Accuracy:** ±500 m absolute, ±50 m relative to catalog
- **Data Downlink:** 10 Mbps minimum at 1 AU

### Environmental Tolerances
| Environment | Requirement |
|-------------|-------------|
| Operating Temperature | -40°C to +65°C |
| Radiation (TID) | 30 krad (behind 2mm Al shielding) |
| Single Event Latchup | Immune to LET ≤ 60 MeV·cm²/mg |
| Vacuum Operation | Full operational capability |
| Thermal Cycling | 10,000+ cycles, ΔT = 150°C |

### Operational Lifetime
- **Design Life:** 7 years
- **Extended Mission:** 10 years with degraded performance
- **Propellant Margin:** 30% reserve for extended operations

## 3. System Design

### Architecture Overview
Each satellite employs a 3-axis stabilized bus with integrated payload. The architecture prioritizes reliability through redundancy of critical systems while accepting graceful degradation of non-critical functions.

```
┌─────────────────────────────────────────────┐
│              PROSPECTING SATELLITE          │
├─────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────────┐  │
│  │ Imaging │  │Spectro- │  │   LIDAR     │  │
│  │ Camera  │  │ meter   │  │  Altimeter  │  │
│  └────┬────┘  └────┬────┘  └──────┬──────┘  │
│       │            │              │         │
│  ┌────┴────────────┴──────────────┴────┐    │
│  │        Payload Data Processor       │    │
│  └─────────────────┬───────────────────┘    │
│                    │                        │
│  ┌─────────────────┴───────────────────┐    │
│  │         Spacecraft Bus              │    │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ ┌───────┐  │    │
│  │  │ C&DH│ │ EPS │ │ADCS │ │Propul.│  │    │
│  │  └─────┘ └─────┘ └─────┘ └───────┘  │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### Major Subsystems Breakdown

**1. Payload Suite (35 kg, 150 W)**
- Visible/NIR Imaging Spectrometer (0.4-2.5 μm)
- Thermal Infrared Mapper (3-5 μm, 8-14 μm)
- Laser Altimeter/Ranger
- Context Imaging Camera

**2. Spacecraft Bus (50 kg, 80 W average)**
- Command & Data Handling (RAD750 processor, 256 GB storage)
- Electrical Power System (Li-ion batteries, 800 Wh)
- Attitude Determination & Control (star trackers, reaction wheels, thrusters)
- Propulsion (green monopropellant, 400 m/s ΔV)
- Thermal Control (passive with heaters)
- Communications (X-band HGA, S-band omni)

### Interfaces with Other Phase 0 Components
| Interface | Description |
|-----------|-------------|
| Mining Robots | Provides target coordinates, surface maps, composition data |
| Transport Vehicles | Validates orbital parameters for rendezvous planning |
| Material Processing Station | Transmits expected ore composition profiles |
| Ground Systems | Receives commands, transmits science/telemetry data |

## 4. Control Systems

### Autonomy Level Required
- **Level 3 Autonomy:** Spacecraft shall operate independently for up to 30 days without ground contact
- On-board trajectory optimization for asteroid approach sequences
- Automated target prioritization based on observation quality and science value
- Self-diagnosis and fault recovery without ground intervention

### Communication Architecture
```
                    DSN 34m
                       │
          ┌────────────┴────────────┐
          │     Ground Station      │
          └────────────┬────────────┘
                       │ X-band (10 Mbps)
        ┌──────────────┴──────────────┐
        │                             │
   ┌────┴────┐                   ┌────┴────┐
   │ Sat #1  │ ← Inter-sat →    │ Sat #2  │
   └────┬────┘   S-band link    └────┬────┘
        │                             │
   ┌────┴────┐                   ┌────┴────┐
   │ Sat #3  │                   │ Sat #4  │
   └─────────┘                   └─────────┘
```

- **Primary:** X-band to Deep Space Network (8.4 GHz, 10 Mbps at 1 AU)
- **Backup:** S-band to commercial ground stations (2.2 GHz, 1 Mbps)
- **Inter-satellite:** S-band mesh network for data relay and coordination

### Fault Tolerance and Redundancy
| Component | Redundancy Approach |
|-----------|---------------------|
| Processor | Dual-string with voting |
| Reaction Wheels | 4 wheels (3 required) |
| Star Trackers | 2 units (1 required) |
| Thrusters | 8 thrusters in 2 branches |
| Communications | Dual X-band + S-band backup |
| Solar Cells | 20% margin on array sizing |

### Software/Firmware Requirements
- **Flight Software:** 500 KSLOC, RTEMS-based
- **Autonomy Engine:** Goal-based scheduling with constraint checking
- **Image Processing:** On-board spectral unmixing and compression
- **Navigation:** Optical navigation using asteroid imagery
- **Updates:** Field-reprogrammable via encrypted uplink

## 5. Manufacturing & Assembly

### Production Approach
**Earth-Built:** All prospecting satellites will be manufactured on Earth. The small form factor and need for early deployment preclude in-space manufacturing.

### Production Strategy
| Phase | Units | Timeline | Cost/Unit |
|-------|-------|----------|-----------|
| Prototype | 2 | Year 1-2 | $15M |
| Pathfinder | 5 | Year 2-3 | $8M |
| Production Block 1 | 20 | Year 3-4 | $5M |
| Production Block 2 | 23 | Year 4-5 | $4.5M |

### Key Manufacturing Challenges
1. **Spectrometer Optics:** Achieving required spectral resolution with compact design
2. **Radiation Hardening:** Balancing component availability with radiation requirements
3. **Thermal Design:** Managing wide temperature swings during asteroid proximity operations
4. **Production Rate:** Scaling to 10+ satellites per year while maintaining quality

### Assembly and Integration Procedures
1. Bus integration and functional test (4 weeks)
2. Payload integration and calibration (3 weeks)
3. Environmental testing (thermal-vacuum, vibration) (4 weeks)
4. Final integration and pre-ship review (2 weeks)
5. Launch site processing (2 weeks)

### Quality Assurance Requirements
- ISO 9001:2025 certified production facility
- NASA-STD-8739 soldering and workmanship standards
- 100% functional test at unit and system level
- Statistical process control on all critical parameters
- Independent verification of all safety-critical functions

## 6. Development Roadmap

### Technology Readiness Level (Current)
| Subsystem | TRL | Notes |
|-----------|-----|-------|
| Spacecraft Bus | 8 | Based on proven SmallSat platforms |
| Imaging Spectrometer | 6 | Requires miniaturization development |
| Thermal IR Mapper | 5 | Cooling system needs optimization |
| Autonomy Software | 5 | Algorithm validation required |
| Laser Altimeter | 7 | Adaptation from lunar heritage |

### Required R&D Milestones
| Milestone | TRL Target | Date |
|-----------|------------|------|
| Spectrometer breadboard | 5→6 | Month 12 |
| Thermal IR detector qualification | 5→6 | Month 18 |
| Autonomy software V&V | 5→7 | Month 24 |
| Integrated payload test | 6→7 | Month 30 |
| Flight unit qualification | 7→8 | Month 36 |

### Prototype and Testing Phases
1. **Engineering Model (EM):** Months 18-24
2. **Qualification Model (QM):** Months 24-30
3. **Protoflight Model (PFM):** Months 30-36
4. **Flight Models (FM):** Months 36-60

### Timeline to Operational Status
- **First Launch:** Year 3 (2 pathfinder satellites)
- **Initial Operating Capability:** Year 4 (15 satellites)
- **Full Operating Capability:** Year 5 (50 satellites)

## 7. Cost Breakdown

### Development Costs
| Category | Cost |
|----------|------|
| Payload Development | $35M |
| Bus Development | $15M |
| Ground System | $12M |
| Systems Engineering | $18M |
| Program Management | $10M |
| **Total Development** | **$90M** |

### Production Costs per Unit
| Category | Cost/Unit |
|----------|-----------|
| Payload | $1.8M |
| Bus | $1.5M |
| Integration & Test | $0.6M |
| Launch (shared) | $1.1M |
| **Total per Unit** | **$5.0M** |

### Operations and Maintenance (Annual)
| Category | Cost/Year |
|----------|-----------|
| Mission Operations | $8M |
| Ground Network | $4M |
| Data Processing | $3M |
| Sustaining Engineering | $2M |
| **Total O&M** | **$17M/year** |

### Total Program Cost (10 years)
| Category | Cost |
|----------|------|
| Development | $90M |
| Production (50 units) | $250M |
| Launch Services | (included) |
| Operations (7 years) | $119M |
| **Total** | **$459M** |

*Note: Budget allocation of $250M covers production only. Full program requires ~$460M.*

### Cost Reduction Opportunities
1. **Commercial Components:** 30% bus cost reduction using automotive-grade parts
2. **Rideshare Launches:** 40% launch cost reduction via ESPA-class deployment
3. **Automated Testing:** 25% I&T cost reduction through parallel test operations
4. **Operations Automation:** 50% ops cost reduction via autonomous scheduling

## 8. Risk Analysis

### Top 5 Technical Risks

| # | Risk | Likelihood | Impact | Risk Score |
|---|------|------------|--------|------------|
| 1 | Spectrometer fails to achieve required resolution | Medium | High | **High** |
| 2 | Radiation-induced degradation exceeds predictions | Medium | Medium | **Medium** |
| 3 | Inter-satellite link performance insufficient | Low | High | **Medium** |
| 4 | Propellant throughput limits asteroid survey rate | Medium | Medium | **Medium** |
| 5 | Launch delays compress commissioning schedule | High | Low | **Medium** |

### Mitigation Strategies
1. **Spectrometer Risk:** Parallel development of two spectrometer designs; early breadboard testing
2. **Radiation Risk:** Conservative shielding design; radiation-tolerant processor selection; on-orbit monitoring
3. **Inter-sat Link:** Design for standalone operation; mesh architecture provides graceful degradation
4. **Propellant Risk:** Green propellant allows higher Isp; trajectory optimization reduces consumption
5. **Schedule Risk:** Pathfinder satellites launched early; rolling acceptance testing

### Fallback Options
- **Spectrometer:** Reduce spectral resolution from 5nm to 10nm (acceptable for target selection)
- **Constellation Size:** Minimum viable constellation of 25 satellites meets core objectives
- **Mission Duration:** Extended mission to 10 years compensates for reduced survey rate
- **Commercial Data:** Purchase supplementary spectral data from commercial asteroid surveys

## 9. Open Questions

### Unresolved Engineering Challenges
1. **Thermal IR Calibration:** How to maintain absolute calibration accuracy over 7-year mission with no ground truth?
2. **Spectrometer Contamination:** What decontamination approach is needed for operations near outgassing asteroids?
3. **Autonomy Validation:** How to validate goal-based scheduling behavior across millions of possible scenarios?
4. **Data Fusion:** Optimal algorithms for combining multi-satellite observations of same target?

### Required Research/Experiments
1. Ground-based observation campaign to validate spectral interpretation algorithms
2. Laboratory measurements of asteroid analog materials under vacuum conditions
3. Demonstration mission to validate optical navigation at asteroid
4. Long-duration radiation testing of candidate detector arrays

### Key Decisions Pending
1. **Propellant Selection:** Green monopropellant vs. electric propulsion (affects mass, cost, timeline)
2. **Launcher Selection:** Dedicated launch vs. rideshare (affects deployment timeline and orbit flexibility)
3. **Ground Network:** DSN allocation vs. commercial ground stations (affects data return rate)
4. **Data Policy:** Open data release vs. proprietary period for Project Dyson (affects partnerships)
5. **International Partnerships:** ESA or JAXA contribution to constellation (affects cost sharing and capabilities)
