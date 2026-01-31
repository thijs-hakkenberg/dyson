---
bomId: "bom-0-1"
itemName: "Prospecting Satellites"
itemSlug: "prospecting-satellites"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-01-31"
phase: "phase-0"
---

# Prospecting Satellites - Technical Specifications

## 1. Executive Summary

### Purpose and Role in Phase 0
The Prospecting Satellite constellation represents Project Dyson's eyes in the asteroid belt, providing comprehensive multi-spectral characterization of near-Earth asteroids. This 50-satellite fleet employs a hybrid approach combining autonomous operation with strategic human oversight, ensuring maximum scientific return while maintaining operational flexibility.

### Key Design Philosophy
- **Full-Spectrum Sensing:** Comprehensive payload from visible through thermal infrared
- **Hybrid Autonomy:** AI-driven operations with human-in-the-loop for critical decisions
- **Robust Design:** Emphasis on reliability and radiation tolerance over mass optimization
- **Ground-Integrated:** Tight coupling with Earth-based processing infrastructure

### Critical Success Factors
1. Achieving 99%+ compositional classification accuracy for surveyed asteroids
2. Identifying and prioritizing top 50 mining candidates within 4 years
3. Establishing comprehensive asteroid database for long-term mission planning
4. Validating AI-human teaming protocols for future Phase 1 operations

## 2. Technical Specifications

### Physical Specifications
| Parameter | Value |
|-----------|-------|
| Mass (dry) | 95 kg |
| Mass (wet, with propellant) | 135 kg |
| Dimensions (stowed) | 0.7m × 0.7m × 0.9m |
| Dimensions (deployed) | 2.8m × 0.7m × 0.9m (with solar arrays) |
| Solar Array Area | 4.0 m² |
| Power Generation (1 AU) | 580 W |
| Power Generation (1.5 AU) | 258 W |

### Performance Requirements
- **Survey Rate:** Each satellite shall characterize ≥25 asteroids per year
- **Spectral Resolution:** 4 nm in visible, 15 nm in near-infrared, 50 nm in thermal IR
- **Spatial Resolution:** 8 m/pixel at 100 km range
- **Position Accuracy:** ±250 m absolute, ±25 m relative to catalog
- **Data Downlink:** 15 Mbps minimum at 1 AU

### Environmental Tolerances
| Environment | Requirement |
|-------------|-------------|
| Operating Temperature | -60°C to +80°C |
| Radiation (TID) | 50 krad (behind 3mm Al shielding) |
| Single Event Latchup | Immune to LET ≤ 75 MeV·cm²/mg |
| Vacuum Operation | Full operational capability |
| Thermal Cycling | 12,000+ cycles, ΔT = 160°C |

### Operational Lifetime
- **Design Life:** 7 years
- **Extended Mission:** 10 years with performance degradation
- **Propellant Margin:** 25% reserve for extended operations

## 3. System Design

### Architecture Overview
The satellite design prioritizes comprehensive sensing capability and reliable operations. A modular architecture enables payload flexibility while maintaining consistent bus performance across the constellation.

```
┌─────────────────────────────────────────────────────┐
│              GPT PROSPECTOR ARCHITECTURE            │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────────────────────────────────┐  │
│  │            Multi-Spectral Payload             │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────────────┐  │  │
│  │  │ VIS/NIR │ │ Thermal │ │  High-Res Cam   │  │  │
│  │  │ Spectro │ │   IR    │ │  + Laser Alt    │  │  │
│  │  └────┬────┘ └────┬────┘ └───────┬─────────┘  │  │
│  │       └───────────┼──────────────┘            │  │
│  └───────────────────┼───────────────────────────┘  │
│                      │                              │
│  ┌───────────────────┴───────────────────────────┐  │
│  │         Intelligent Processing Core           │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────┐  │  │
│  │  │ ML Engine  │  │ Nav/GNC    │  │ Health │  │  │
│  │  │ (on-board) │  │ Computer   │  │ Monitor│  │  │
│  │  └────────────┘  └────────────┘  └────────┘  │  │
│  └───────────────────────────────────────────────┘  │
│                      │                              │
│  ┌───────────────────┴───────────────────────────┐  │
│  │              Spacecraft Bus                   │  │
│  │  ┌───────┐ ┌───────┐ ┌───────┐ ┌──────────┐  │  │
│  │  │ Power │ │ Comms │ │ ADCS  │ │Propulsion│  │  │
│  │  │ (EPS) │ │ X+S   │ │3-axis │ │ Hybrid   │  │  │
│  │  └───────┘ └───────┘ └───────┘ └──────────┘  │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Major Subsystems Breakdown

**1. Multi-Spectral Payload Suite (40 kg, 180 W)**
- Visible/NIR Imaging Spectrometer (0.35-2.5 μm, 4nm resolution)
- Thermal Infrared Imager (3-14 μm, uncooled microbolometer)
- High-Resolution Context Camera (1 m/pixel at 50 km)
- Laser Altimeter/Rangefinder (50 km range)

**2. Intelligent Processing Core (12 kg, 60 W)**
- Radiation-hardened AI accelerator (edge ML inference)
- Primary flight computer (RAD750 class)
- 512 GB solid-state storage
- On-board mineral classification algorithms

**3. Communication System (10 kg, 50 W)**
- X-band high-gain antenna (12 Mbps at 1 AU)
- S-band omni antennas (backup)
- Ka-band experimental uplink (future upgrade path)
- Deep Space Network compatible

**4. Hybrid Propulsion System (15 kg dry, 40 kg wet)**
- Primary: Hall-effect thruster (300 W, 1800s Isp)
- Secondary: Cold gas thrusters (precision pointing)
- Propellant: 25 kg xenon + 2 kg nitrogen
- Delta-V capability: 4.5 km/s

**5. Power & Thermal (18 kg)**
- Quad-junction solar cells (32% efficiency)
- Li-ion battery bank (1 kWh)
- Active thermal control for IR detector
- Radiator panels with variable conductance heat pipes

### Interfaces with Other Phase 0 Components
| Interface | Description |
|-----------|-------------|
| Mining Robots | Detailed target packages with mineralogy maps |
| Transport Vehicles | Precision ephemeris for rendezvous planning |
| Material Processing | Ore composition predictions for process planning |
| Ground Control | Full telemetry and command authority |

## 4. Control Systems

### Autonomy Level Required
- **Level 3 Autonomy:** Supervised autonomy with human oversight
- On-board anomaly detection with ground notification
- Autonomous safe mode with human recovery
- Human approval required for trajectory changes
- Daily ground contact windows

### Communication Architecture
```
            Deep Space Network
          (Goldstone/Canberra/Madrid)
                    │
                    │ X-band 15 Mbps
                    │
           ┌────────┴────────┐
           │  Mission Ops    │
           │    Center       │
           └────────┬────────┘
                    │
    ┌───────────────┼───────────────┐
    │               │               │
┌───┴────┐    ┌────┴────┐    ┌────┴────┐
│ Sat 01 │    │ Sat 02  │    │ Sat 03  │
│(direct)│    │(direct) │    │(direct) │
└────────┘    └─────────┘    └─────────┘
    ...          ...            ...
         (50 satellites total)
```

- **Primary Link:** X-band direct to DSN (15 Mbps)
- **Backup:** S-band to commercial ground stations
- **Contact Schedule:** 4-8 hour passes daily
- **Latency:** 3-40 minutes (distance dependent)

### Fault Tolerance and Redundancy
| Component | Approach |
|-----------|----------|
| Processor | Dual-redundant with cold spare |
| Memory | EDAC protection + voting |
| Star Trackers | 3 units (2 required) |
| Reaction Wheels | 4 wheels in tetrahedral config |
| Thrusters | Primary + backup branches |
| Solar Arrays | 2 wings with bypass diodes |

### Software/Firmware Requirements
- **Flight Software:** 800 KSLOC, DO-178C Level B
- **ML Models:** Pre-trained mineral classifiers, updateable
- **Autonomy Engine:** Reactive planning with ground override
- **Telemetry:** Comprehensive health monitoring (2000+ channels)
- **Security:** Encrypted command links, authenticated uplinks

## 5. Manufacturing & Assembly

### Production Approach
**Earth-Built, Quality-Focused:** Prioritize reliability over schedule. Each satellite undergoes comprehensive testing. Accept higher per-unit cost for improved mission success rate.

### Production Strategy
| Phase | Units | Timeline | Cost/Unit |
|-------|-------|----------|-----------|
| Prototype | 2 | Year 1-2 | $18M |
| Qualification | 3 | Year 2-2.5 | $10M |
| Initial Production | 15 | Year 2.5-3.5 | $6M |
| Full Production | 30 | Year 3.5-5 | $5.5M |

### Key Manufacturing Challenges
1. **Thermal IR Integration:** Calibration and contamination control
2. **AI Accelerator:** Radiation qualification of ML hardware
3. **Hybrid Propulsion:** Integrating both electric and cold gas systems
4. **Extended Testing:** 6-week environmental test campaign per unit

### Assembly and Integration Procedures
1. Bus structure assembly and inspection (2 weeks)
2. Propulsion system integration and leak checks (1 week)
3. Payload integration and optical alignment (2 weeks)
4. Avionics integration and software load (1 week)
5. Environmental testing (thermal-vac, vibe, EMC) (6 weeks)
6. Post-test verification and closeout (2 weeks)
7. Launch site processing (2 weeks)

### Quality Assurance Requirements
- AS9100 aerospace quality system
- NASA-STD-8739 workmanship standards
- Independent review at each major milestone
- 100% inspection on critical components
- Comprehensive flight heritage tracking

## 6. Development Roadmap

### Technology Readiness Level (Current)
| Subsystem | TRL | Notes |
|-----------|-----|-------|
| Spacecraft Bus | 8 | Adapt existing deep space platform |
| VIS/NIR Spectrometer | 7 | Flight heritage, minor modifications |
| Thermal IR Imager | 6 | Space-qualify commercial detector |
| On-board ML | 5 | Algorithm validation required |
| Hybrid Propulsion | 6 | Integration testing needed |

### Required R&D Milestones
| Milestone | TRL Target | Date |
|-----------|------------|------|
| Thermal IR space qualification | 6→8 | Month 18 |
| ML algorithm validation | 5→7 | Month 20 |
| Hybrid propulsion integration | 6→8 | Month 22 |
| End-to-end system test | 7→8 | Month 30 |
| Protoflight model complete | 8→9 | Month 36 |

### Prototype and Testing Phases
1. **Algorithm Development:** Months 1-18 (ground testbed)
2. **Engineering Unit:** Months 18-30
3. **Protoflight Unit:** Months 30-40
4. **Production Units:** Months 40-60
5. **Fleet Deployment:** Months 48-72

### Timeline to Operational Status
- **First Launch:** Year 4
- **Initial Ops (5 sats):** Year 4.5
- **Growth Phase (25 sats):** Year 5.5
- **Full Constellation (50 sats):** Year 6
- **Survey Complete:** Year 9

## 7. Cost Breakdown

### Development Costs
| Category | Cost |
|----------|------|
| Payload Development | $45M |
| Bus Adaptation | $20M |
| AI/ML Development | $15M |
| Ground Systems | $12M |
| Systems Engineering | $18M |
| Program Management | $10M |
| **Total Development** | **$120M** |

### Production Costs per Unit
| Category | Cost/Unit |
|----------|-----------|
| Payload | $2.2M |
| Bus & Avionics | $1.8M |
| Propulsion | $0.6M |
| Integration & Test | $0.8M |
| Launch (shared) | $1.1M |
| **Total per Unit** | **$6.5M** |

### Operations and Maintenance (Annual)
| Category | Cost/Year |
|----------|-----------|
| Mission Operations | $12M |
| DSN Charges | $5M |
| Data Processing | $4M |
| ML Model Updates | $2M |
| Sustaining Engineering | $3M |
| **Total O&M** | **$26M/year** |

### Total Program Cost (12 years)
| Category | Cost |
|----------|------|
| Development | $120M |
| Production (50 units) | $325M |
| Operations (8 years) | $208M |
| **Total** | **$653M** |

*Note: Exceeds $250M allocation; requires phased deployment or scope reduction.*

### Cost Reduction Opportunities
1. **Payload Descope:** Remove thermal IR (-$50M development, -$0.5M/unit)
2. **Commercial Ground:** Use commercial stations vs DSN (-$3M/year)
3. **Reduced Redundancy:** Single-string avionics (-$0.3M/unit)
4. **Longer Production:** Extend timeline for learning curve benefits

## 8. Risk Analysis

### Top 5 Technical Risks

| # | Risk | Likelihood | Impact | Risk Score |
|---|------|------------|--------|------------|
| 1 | Thermal IR detector degradation in radiation | Medium | High | **High** |
| 2 | On-board ML accuracy below requirements | Medium | Medium | **Medium** |
| 3 | Higher-than-planned operations costs | High | Medium | **High** |
| 4 | DSN availability constraints | Medium | Medium | **Medium** |
| 5 | Schedule slip from extended testing | Medium | Low | **Low** |

### Mitigation Strategies
1. **IR Detector:** Qualification testing with radiation margin; backup visible-only mode
2. **ML Accuracy:** Extensive ground validation; human review of classifications
3. **Ops Costs:** Automate routine operations; commercial ground station backup
4. **DSN Availability:** Reserve capacity early; S-band backup capability
5. **Schedule:** Parallel integration lines; accept risk on later units

### Fallback Options
- **Thermal IR Failure:** Operate visible/NIR only (reduced but viable capability)
- **ML Underperformance:** Ground-based processing backup
- **Cost Overrun:** Reduce constellation to 30 satellites
- **DSN Constraints:** Accept lower data return rate

## 9. Open Questions

### Unresolved Engineering Challenges
1. **Detector Lifetime:** What is actual thermal IR performance after 7 years?
2. **ML Model Updates:** How to efficiently update on-board models in flight?
3. **Data Volume:** Can ground processing keep up with 50-satellite data rate?
4. **Cross-Calibration:** How to ensure consistent measurements across fleet?

### Required Research/Experiments
1. Radiation testing of candidate thermal IR detectors
2. Field validation of mineral classification algorithms
3. DSN loading analysis for 50-satellite constellation
4. End-to-end data pipeline simulation

### Key Decisions Pending
1. **Thermal IR:** Include at higher cost/risk or descope?
2. **Ground Network:** DSN primary vs. commercial primary?
3. **Fleet Size:** 50 satellites or reduced scope for budget?
4. **AI Autonomy:** How much authority for on-board decisions?
5. **Data Policy:** Open release or proprietary period?
