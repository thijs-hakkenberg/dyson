---
bomId: "bom-0-1"
itemName: "Prospecting Satellites"
itemSlug: "prospecting-satellites"
modelId: "gemini-3-pro"
modelName: "Gemini 3 Pro"
generated: "2026-01-31"
phase: "phase-0"
---

# Prospecting Satellites - Technical Specifications

## 1. Executive Summary

### Purpose and Role in Phase 0
The Prospecting Satellite constellation serves as Project Dyson's distributed intelligence network for asteroid characterization. By deploying 50 interconnected spacecraft, we establish a resilient mesh network capable of comprehensive near-Earth asteroid (NEA) surveying while minimizing single-point failures.

### Key Design Philosophy
- **Mesh-First Architecture:** Every satellite acts as both sensor and relay node
- **Graceful Degradation:** System maintains functionality even with 40% constellation loss
- **Electric Propulsion Focus:** High-Isp thrusters enable extended mission flexibility
- **Lean Payload:** Prioritize spectroscopy over thermal imaging to reduce mass and complexity

### Critical Success Factors
1. Establishing persistent mesh network coverage across NEA population
2. Achieving 95%+ data delivery rate through redundant pathways
3. Characterizing 800+ asteroids in primary mission phase
4. Validating distributed computing architecture for future swarm operations

## 2. Technical Specifications

### Physical Specifications
| Parameter | Value |
|-----------|-------|
| Mass (dry) | 75 kg |
| Mass (wet, with propellant) | 105 kg |
| Dimensions (stowed) | 0.5m × 0.5m × 0.7m |
| Dimensions (deployed) | 2.0m × 0.5m × 0.7m (with solar arrays) |
| Solar Array Area | 2.8 m² |
| Power Generation (1 AU) | 420 W |
| Power Generation (1.5 AU) | 187 W |

### Performance Requirements
- **Survey Rate:** Each satellite shall characterize ≥16 asteroids per year
- **Spectral Resolution:** 8 nm in visible, 25 nm in near-infrared
- **Spatial Resolution:** 15 m/pixel at 100 km range
- **Position Accuracy:** ±1 km absolute, ±100 m relative
- **Mesh Throughput:** 5 Mbps aggregate network capacity

### Environmental Tolerances
| Environment | Requirement |
|-------------|-------------|
| Operating Temperature | -50°C to +70°C |
| Radiation (TID) | 25 krad (behind 2mm Al shielding) |
| Single Event Effects | Tolerant to LET ≤ 40 MeV·cm²/mg |
| Vacuum Operation | Full operational capability |
| Thermal Cycling | 8,000+ cycles, ΔT = 140°C |

### Operational Lifetime
- **Design Life:** 8 years
- **Extended Mission:** 12 years with mesh support
- **Propellant Margin:** 40% reserve for orbit maintenance

## 3. System Design

### Architecture Overview
The satellite architecture emphasizes inter-satellite communication and distributed processing. Each node runs identical software, enabling seamless task migration and load balancing across the constellation.

```
┌────────────────────────────────────────────────┐
│           GEMINI PROSPECTOR DESIGN             │
├────────────────────────────────────────────────┤
│                                                │
│   ┌──────────────────────────────────────┐     │
│   │        Mesh Communication Array       │    │
│   │    ┌────┐  ┌────┐  ┌────┐  ┌────┐    │    │
│   │    │ TX │  │ RX │  │ TX │  │ RX │    │    │
│   │    └────┘  └────┘  └────┘  └────┘    │    │
│   └──────────────────────────────────────┘    │
│                      │                        │
│   ┌──────────────────┴──────────────────┐    │
│   │      Distributed Processing Unit     │    │
│   │  ┌─────────┐      ┌─────────────┐   │    │
│   │  │ Mesh    │      │ Spectral    │   │    │
│   │  │ Router  │      │ Analysis    │   │    │
│   │  └─────────┘      └─────────────┘   │    │
│   └──────────────────────────────────────┘    │
│                      │                        │
│   ┌──────────────────┴──────────────────┐    │
│   │           Payload Section            │    │
│   │  ┌─────────────┐  ┌──────────────┐  │    │
│   │  │  Imaging    │  │   Laser      │  │    │
│   │  │  Spectro    │  │   Ranger     │  │    │
│   │  └─────────────┘  └──────────────┘  │    │
│   └──────────────────────────────────────┘    │
│                                               │
│   ┌──────────────────────────────────────┐   │
│   │     Ion Propulsion Module            │   │
│   │         ┌─────────────┐              │   │
│   │         │ Hall Effect │              │   │
│   │         │  Thruster   │              │   │
│   │         └─────────────┘              │   │
│   └──────────────────────────────────────┘   │
└────────────────────────────────────────────────┘
```

### Major Subsystems Breakdown

**1. Payload Suite (25 kg, 100 W)**
- Compact Visible/NIR Spectrometer (0.4-2.4 μm)
- Laser Rangefinder (10 km range)
- Context Camera (wide field)
- *Note: Thermal IR omitted to reduce complexity*

**2. Mesh Communication System (15 kg, 80 W)**
- 4× phased array antennas (S-band inter-satellite)
- X-band ground link antenna
- Software-defined radio for flexible protocols
- Store-and-forward buffer (64 GB)

**3. Distributed Processing Unit (10 kg, 50 W)**
- Radiation-tolerant ARM processor cluster
- 128 GB local storage
- Mesh routing firmware
- On-board spectral unmixing capability

**4. Propulsion System (12 kg dry, 30 kg wet)**
- Hall-effect thruster (200 W, 1500s Isp)
- Xenon propellant (18 kg capacity)
- Delta-V capability: 3.5 km/s

**5. Power & Thermal (13 kg)**
- Triple-junction GaAs solar arrays
- Li-ion battery (600 Wh)
- Passive thermal control with louvers

### Interfaces with Other Phase 0 Components
| Interface | Description |
|-----------|-------------|
| Other Prospectors | Mesh network for data relay and coordination |
| Mining Robots | Target packages via mesh relay |
| Ground Stations | Aggregated data downlink through gateway nodes |
| Transport Vehicles | Orbital element updates for navigation |

## 4. Control Systems

### Autonomy Level Required
- **Level 4 Autonomy:** Fully autonomous constellation management
- Distributed consensus algorithms for task allocation
- Autonomous orbit determination via inter-satellite ranging
- Self-organizing network topology
- Minimal ground intervention (weekly health checks)

### Communication Architecture
```
                Ground Station
                      │
                      │ X-band (gateway)
                      │
            ┌─────────┴─────────┐
            │   Gateway Node    │
            │    (rotating)     │
            └─────────┬─────────┘
                      │
      ┌───────────────┼───────────────┐
      │               │               │
 ┌────┴────┐    ┌────┴────┐    ┌────┴────┐
 │ Node A  │────│ Node B  │────│ Node C  │
 └────┬────┘    └────┬────┘    └────┬────┘
      │               │               │
      └───────────────┴───────────────┘
           S-band mesh (5 Mbps)
```

- **Mesh Network:** S-band inter-satellite links (2.2 GHz, 5 Mbps aggregate)
- **Ground Gateway:** Rotating gateway role among 3-5 satellites
- **Latency Tolerance:** Up to 10 hops acceptable for data delivery
- **Redundancy:** Any node can assume gateway role

### Fault Tolerance and Redundancy
| Component | Approach |
|-----------|----------|
| Processing | Distributed across constellation |
| Communication | Mesh topology with multiple paths |
| Navigation | Inter-satellite ranging backup |
| Propulsion | Single thruster (graceful mission degradation) |
| Power | Oversized arrays for degradation margin |

### Software/Firmware Requirements
- **Mesh Protocol:** Custom delay-tolerant networking (DTN) stack
- **Consensus Algorithm:** Byzantine fault-tolerant voting
- **Total Code Size:** 400 KSLOC
- **Hot Updates:** Over-the-air firmware capability
- **Simulation:** Full constellation digital twin

## 5. Manufacturing & Assembly

### Production Approach
**Earth-Built, High-Volume:** Leverage commercial SmallSat manufacturing techniques for cost efficiency. Target 2-week integration cycle per unit.

### Production Strategy
| Phase | Units | Timeline | Cost/Unit |
|-------|-------|----------|-----------|
| Engineering Models | 3 | Year 1-2 | $12M |
| Qualification | 5 | Year 2 | $6M |
| Production Block 1 | 20 | Year 2-3 | $4.5M |
| Production Block 2 | 22 | Year 3-4 | $4M |

### Key Manufacturing Challenges
1. **Phased Array Antennas:** Precision manufacturing for mesh communication
2. **Ion Thruster Integration:** Handling and testing of electric propulsion
3. **Consistent Quality:** Maintaining uniformity across 50-unit production
4. **Schedule Compression:** Achieving 2-week integration cycle

### Assembly and Integration Procedures
1. Bus structure and harness integration (1 week)
2. Propulsion system integration (3 days)
3. Payload and comm integration (1 week)
4. Functional and environmental testing (2 weeks)
5. Batch acceptance testing (1 week per 5 units)

### Quality Assurance Requirements
- ISO 9001:2025 certified facility
- Statistical sampling for batch acceptance
- Automated test equipment for throughput
- Digital thread for component traceability

## 6. Development Roadmap

### Technology Readiness Level (Current)
| Subsystem | TRL | Notes |
|-----------|-----|-------|
| SmallSat Bus | 8 | Commercial platforms available |
| Hall Thruster | 7 | Flight heritage, integration needed |
| Mesh Communication | 5 | Protocol development required |
| Compact Spectrometer | 6 | Miniaturization from existing designs |
| Distributed Processing | 5 | Algorithm validation needed |

### Required R&D Milestones
| Milestone | TRL Target | Date |
|-----------|------------|------|
| Mesh protocol demonstration | 5→7 | Month 12 |
| Spectrometer qualification | 6→8 | Month 18 |
| Hall thruster integration | 7→8 | Month 20 |
| Constellation simulator V&V | 5→7 | Month 24 |
| 3-node mesh flight test | 7→9 | Month 30 |

### Prototype and Testing Phases
1. **Software Simulation:** Months 1-12 (full constellation model)
2. **Hardware-in-Loop:** Months 12-18 (3-node testbed)
3. **Engineering Units:** Months 18-24
4. **Qualification Flight:** Month 30 (3 satellites)
5. **Production:** Months 30-48

### Timeline to Operational Status
- **Mesh Demonstration (3 sats):** Year 3
- **Initial Constellation (15 sats):** Year 3.5
- **Full Constellation (50 sats):** Year 4.5
- **Survey Completion:** Year 7

## 7. Cost Breakdown

### Development Costs
| Category | Cost |
|----------|------|
| Mesh Protocol Development | $25M |
| Spectrometer Development | $20M |
| Bus Adaptation | $10M |
| Ground System | $8M |
| Systems Engineering | $12M |
| **Total Development** | **$75M** |

### Production Costs per Unit
| Category | Cost/Unit |
|----------|-----------|
| Satellite Hardware | $2.5M |
| Propulsion System | $0.8M |
| Integration & Test | $0.4M |
| Launch (rideshare) | $0.8M |
| **Total per Unit** | **$4.5M** |

### Operations and Maintenance (Annual)
| Category | Cost/Year |
|----------|-----------|
| Constellation Management | $5M |
| Ground Network | $2M |
| Software Maintenance | $2M |
| Anomaly Resolution | $1M |
| **Total O&M** | **$10M/year** |

### Total Program Cost (10 years)
| Category | Cost |
|----------|------|
| Development | $75M |
| Production (50 units) | $225M |
| Operations (7 years) | $70M |
| **Total** | **$370M** |

*Note: $120M under budget allocation enables contingency or constellation expansion.*

### Cost Reduction Opportunities
1. **Commercial Components:** 40% cost reduction using COTS parts
2. **Batch Manufacturing:** Assembly line approach for 50 units
3. **Rideshare Launches:** $0.8M vs $2M dedicated launch
4. **Autonomous Operations:** Minimal ground crew requirements

## 8. Risk Analysis

### Top 5 Technical Risks

| # | Risk | Likelihood | Impact | Risk Score |
|---|------|------------|--------|------------|
| 1 | Mesh protocol fails to scale beyond 20 nodes | Medium | High | **High** |
| 2 | Inter-satellite link performance in deep space | Medium | Medium | **Medium** |
| 3 | Electric propulsion lifetime insufficient | Low | High | **Medium** |
| 4 | Spectral resolution inadequate for mineral ID | Medium | Medium | **Medium** |
| 5 | Production rate cannot meet schedule | Low | Medium | **Low** |

### Mitigation Strategies
1. **Mesh Scaling:** Hierarchical network topology; extensive simulation before deployment
2. **Link Performance:** Conservative link budget; adaptive data rates
3. **Propulsion Life:** Select flight-proven thruster; carry propellant margin
4. **Spectral Resolution:** Ground-truth validation campaigns; algorithm refinement
5. **Production Rate:** Parallel integration lines; supplier redundancy

### Fallback Options
- **Mesh Failure:** Operate as independent satellites with direct ground links
- **Propulsion:** Chemical propulsion backup design (higher mass, lower capability)
- **Constellation Size:** 25-satellite minimum viable constellation
- **Survey Scope:** Prioritize highest-value targets if coverage limited

## 9. Open Questions

### Unresolved Engineering Challenges
1. **Network Scaling:** How does mesh performance degrade beyond 30 active nodes?
2. **Distributed Consensus:** Optimal algorithm for task allocation across constellation?
3. **Orbit Maintenance:** Coordination of station-keeping across mesh?
4. **Data Fusion:** Best approach for combining observations from multiple satellites?

### Required Research/Experiments
1. Ground-based mesh network testbed with 50+ emulated nodes
2. Delay-tolerant networking simulation in deep space scenario
3. Inter-satellite ranging accuracy characterization
4. Spectral algorithm validation with asteroid simulants

### Key Decisions Pending
1. **Thermal IR:** Include simplified thermal sensor or omit entirely?
2. **Gateway Strategy:** Fixed gateway satellites vs. rotating role?
3. **Propellant Loading:** 18 kg baseline vs. 25 kg extended mission?
4. **Launch Strategy:** Dedicated vs. rideshare (schedule vs. cost tradeoff)
5. **International Partners:** Include ESA nodes for global coverage?
