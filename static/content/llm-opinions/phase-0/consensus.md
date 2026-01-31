---
phase: 0
phase_title: "Space Resource Processing"
generated_date: "2026-01-31"
type: "consensus"
models_consulted: ["gemini-3-pro", "gpt-5-2", "claude-opus-4-5"]
consensus_cost_estimate: 7500000000
consensus_cost_range_low: 5400000000
consensus_cost_range_high: 14500000000
consensus_duration_years: 10
---

# Phase 0 Consensus Analysis: Space Resource Processing

## Executive Consensus

After cross-reviewing analyses from Gemini 3 Pro and GPT-5.2, the following consensus emerges for Phase 0 of Project Dyson.

### Core Strategic Agreement

Both models agree on fundamental architecture:

1. **ISRU First:** Breaking the "tyranny of the rocket equation" by processing resources in space rather than launching from Earth
2. **Water Priority:** Prioritizing water/propellant extraction over metals in early operations
3. **Boulder Scale:** Starting with 1,000-10,000 ton targets rather than 100m+ asteroids
4. **Avoid LEO:** Processing in cislunar space (NRHO/DRO/L5) to minimize debris and contamination risks
5. **SEP Propulsion:** Solar Electric Propulsion for tugs is the credible near-term choice

### Divergent Perspectives

| Topic | Gemini 3 Pro | GPT-5.2 |
|-------|-------------|---------|
| Location | Earth-Moon L5 | NRHO or DRO |
| Target Mass | 20,000-200,000 tons | 1,000-10,000 tons |
| Timeline | 7 years | 5.5-7 years (realistic: 10-12) |
| Cost | $5.4B | $9.5B |
| Metals Processing | Include in Phase 0 | Defer to later phase |

### Synthesized Recommendations

Based on cross-review feedback:

1. **Start smaller:** Target 1,000-5,000 ton boulder (GPT-5.2's conservative approach validated by Gemini's review)
2. **Water-only Phase 0:** Both reviewers suggest deferring metals processing reduces risk significantly
3. **Extend timeline to 10 years:** Both reviewers flagged 7-year timelines as aggressive
4. **Budget $7-10B:** Split the difference with appropriate reserves (35%+)

---

## Dependency Graph: Phase 0 Activities

### Work Breakdown Structure

```
PHASE 0: SPACE RESOURCE PROCESSING
├── WBS 1.0: Program Foundation
│   ├── 1.1 Requirements Definition
│   ├── 1.2 Target Selection & Survey
│   ├── 1.3 Regulatory/Legal Framework
│   └── 1.4 Safety Case Development
│
├── WBS 2.0: Target Characterization
│   ├── 2.1 Ground-Based Survey Analysis
│   ├── 2.2 Reconnaissance Probe Development
│   ├── 2.3 Recon Probe Launch & Operations
│   └── 2.4 Target Final Selection
│
├── WBS 3.0: Capture System Development
│   ├── 3.1 SEP Tug Design & Development
│   ├── 3.2 Anchoring/Containment System
│   ├── 3.3 Autonomous GNC Software
│   └── 3.4 Ground Testing & Qualification
│
├── WBS 4.0: Processing Infrastructure
│   ├── 4.1 Water Extraction Module
│   ├── 4.2 Electrolysis & Storage System
│   ├── 4.3 Thermal Management System
│   └── 4.4 Power System (Solar Arrays)
│
├── WBS 5.0: Robotics & Assembly
│   ├── 5.1 Heavy Manipulator Arms
│   ├── 5.2 Surface Crawlers/Miners
│   ├── 5.3 Maintenance/Repair Robots
│   └── 5.4 Assembly Aids & Tooling
│
├── WBS 6.0: Launch & Deployment
│   ├── 6.1 Infrastructure Launch Campaign
│   ├── 6.2 In-Space Assembly
│   ├── 6.3 System Checkout & Commissioning
│   └── 6.4 Tug Launch & Transit
│
├── WBS 7.0: Capture & Return
│   ├── 7.1 Rendezvous Operations
│   ├── 7.2 Anchoring & Stabilization
│   ├── 7.3 Tow to Cislunar Orbit
│   └── 7.4 Docking with Processing Node
│
└── WBS 8.0: Operations & Scale-Up
    ├── 8.1 Initial Processing Demo
    ├── 8.2 Production Ramp-Up
    ├── 8.3 Propellant Storage & Transfer Demo
    └── 8.4 Autonomous Operations Validation
```

---

## Critical Path Analysis

### Critical Path (Longest Duration Chain)

```
1.1 Requirements → 2.1 Survey → 2.2 Recon Dev → 2.3 Recon Ops → 2.4 Target Select
                                                                        ↓
3.1 Tug Design ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
    ↓
3.2 Anchoring → 3.3 GNC Software → 3.4 Ground Test → 6.4 Tug Launch
                                                            ↓
7.1 Rendezvous → 7.2 Anchoring → 7.3 Tow → 7.4 Docking → 8.1 Processing Demo
```

### Critical Path Duration: ~10 years

| Phase | Activity | Duration | Dependencies |
|-------|----------|----------|--------------|
| Year 0-1 | Requirements & Survey | 12 mo | None |
| Year 1-2.5 | Recon Probe Dev & Launch | 18 mo | Requirements |
| Year 2.5-3.5 | Recon Operations | 12 mo | Probe Launch |
| Year 1-4 | Tug Development | 36 mo | Target Selection |
| Year 3-5 | Ground Testing & Qual | 24 mo | Tug Dev, Anchoring Dev |
| Year 5-5.5 | Tug Launch & Transit | 6 mo | Ground Testing |
| Year 5.5-6.5 | Rendezvous & Anchoring | 12 mo | Tug Transit |
| Year 6.5-8.5 | Tow to Cislunar | 24 mo | Anchoring Success |
| Year 8.5-10 | Processing Operations | 18 mo | Docking Complete |

### Near-Critical Paths

**Infrastructure Path (Parallel):**
```
4.1 Water Module → 4.2 Electrolysis → 6.1 Launch → 6.2 Assembly → 6.3 Checkout
Duration: ~5 years (Years 1-6)
```

**Robotics Path (Parallel):**
```
5.1 Manipulators → 5.2 Crawlers → 5.3 Maintenance Robots → 6.1 Launch
Duration: ~4 years (Years 1-5)
```

---

## Activity Dependencies Matrix

| ID | Activity | Predecessors | Successors | Duration | Float |
|----|----------|--------------|------------|----------|-------|
| 1.1 | Requirements Definition | - | 1.2, 2.1, 3.1 | 6 mo | 0 |
| 1.2 | Target Selection Criteria | 1.1 | 2.1 | 3 mo | 3 mo |
| 1.3 | Regulatory Framework | 1.1 | 7.1 | 24 mo | 48 mo |
| 2.1 | Survey Analysis | 1.1 | 2.2 | 6 mo | 0 |
| 2.2 | Recon Probe Dev | 2.1 | 2.3 | 18 mo | 0 |
| 2.3 | Recon Operations | 2.2 | 2.4 | 12 mo | 0 |
| 2.4 | Final Target Select | 2.3 | 3.1, 3.2 | 3 mo | 0 |
| 3.1 | SEP Tug Development | 2.4 | 3.4 | 36 mo | 0 |
| 3.2 | Anchoring System Dev | 2.4 | 3.4 | 30 mo | 6 mo |
| 3.3 | Autonomous GNC | 3.1 | 3.4 | 24 mo | 6 mo |
| 3.4 | Ground Testing | 3.1, 3.2, 3.3 | 6.4 | 18 mo | 0 |
| 4.1 | Water Extraction Module | 1.1 | 4.2, 6.1 | 30 mo | 18 mo |
| 4.2 | Electrolysis System | 4.1 | 6.1 | 24 mo | 18 mo |
| 4.3 | Thermal Management | 1.1 | 6.1 | 24 mo | 36 mo |
| 4.4 | Power System | 1.1 | 6.1 | 30 mo | 24 mo |
| 5.1 | Heavy Manipulators | 1.1 | 6.1 | 24 mo | 30 mo |
| 5.2 | Surface Crawlers | 1.1 | 6.1 | 30 mo | 24 mo |
| 6.1 | Infrastructure Launch | 4.1, 4.2, 4.3, 4.4, 5.1, 5.2 | 6.2 | 12 mo | 18 mo |
| 6.2 | In-Space Assembly | 6.1 | 6.3 | 12 mo | 18 mo |
| 6.3 | Checkout | 6.2 | 7.4 | 6 mo | 18 mo |
| 6.4 | Tug Launch | 3.4 | 7.1 | 3 mo | 0 |
| 7.1 | Rendezvous Ops | 6.4, 1.3 | 7.2 | 6 mo | 0 |
| 7.2 | Anchoring & Stabilization | 7.1 | 7.3 | 6 mo | 0 |
| 7.3 | Tow to Cislunar | 7.2 | 7.4 | 24 mo | 0 |
| 7.4 | Docking | 7.3, 6.3 | 8.1 | 3 mo | 0 |
| 8.1 | Processing Demo | 7.4 | 8.2 | 6 mo | 0 |
| 8.2 | Production Ramp-Up | 8.1 | 8.3, 8.4 | 12 mo | 0 |

---

## Open Questions Requiring Resolution

### Technical Questions (Funding Priority: HIGH)

1. **Anchoring Mechanics**
   - What is the shear strength of C-type asteroid regolith?
   - How do rubble-pile bodies respond to multi-point tethered towing?
   - *Recommended: Ground testing program with simulants ($15-30M)*

2. **Microgravity Material Separation**
   - How efficiently can water be extracted via thermal processing in micro-g?
   - What are the fouling/clogging rates for regolith handling systems?
   - *Recommended: ISS experiment or suborbital campaign ($20-50M)*

3. **Dust Mitigation**
   - Electrostatic charging behavior of regolith in cislunar plasma environment
   - Long-term radiator degradation rates
   - *Recommended: CubeSat demonstration mission ($10-25M)*

4. **Autonomous Operations**
   - Fault detection/isolation/recovery for fluid systems without crew
   - Robotic maintenance capability validation
   - *Recommended: Ground analog + orbital demo ($30-60M)*

### Regulatory Questions (Funding Priority: MEDIUM)

5. **Legal Framework**
   - Liability for asteroid trajectory modification
   - Export control implications for ISRU technology
   - Outer Space Treaty compliance for resource extraction
   - *Recommended: Legal study + international engagement ($5-10M)*

6. **Safety Case**
   - Planetary defense coordination requirements
   - Debris risk assessment for cislunar operations
   - *Recommended: Independent safety review ($3-5M)*

### Economic Questions (Funding Priority: MEDIUM)

7. **Market Validation**
   - Propellant pricing for cislunar customers
   - Metal feedstock demand from in-space manufacturing
   - *Recommended: Market study + LOI from potential customers ($2-5M)*

---

## Funding Priorities Summary

### Immediate (Year 0-2): $50-100M
- Target survey and characterization
- Ground-based technology demonstrations
- Regulatory/legal framework development
- Detailed system design

### Near-Term (Year 2-5): $2-3B
- Reconnaissance probe mission
- Capture tug development
- Processing module development
- Robotics development

### Operations (Year 5-10): $4-6B
- Launch campaign
- Capture and return operations
- Processing facility operations
- Scale-up demonstrations

### Total Phase 0 Investment: $7-10B over 10 years

---

## Success Criteria (Phase 0 Complete When)

1. **Capture:** ≥1,000 tons asteroid material stabilized in cislunar orbit
2. **Processing:** ≥1 ton/day ore intake sustained for ≥90 days at >70% uptime
3. **Output:** ≥10 tons water produced and stored; closed-loop refueling demonstrated
4. **Dust:** <10% radiator performance degradation over 6 months
5. **Autonomy:** ≥95% fault recovery rate for defined fault classes

Meeting these criteria enables progression to Phase 1: Structural Closure.
