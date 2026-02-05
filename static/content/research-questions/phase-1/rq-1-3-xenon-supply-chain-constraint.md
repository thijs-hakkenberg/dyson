---
questionId: "rq-1-3"
slug: "xenon-supply-chain-constraint"
title: "Xenon supply chain constraint for Phase 1"
questionType: "meta-research"
priority: "critical"
status: "answered"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-1"
sourceBOMItemSlug: "collector-units"
sourceBOMItemName: "Collector Units"
relatedBOMItems:
  - "bom-1-1"
  - "bom-1-6"
  - "bom-0-4"
tags:
  - "xenon"
  - "propellant"
  - "supply-chain"
  - "krypton"
createdDate: "2026-02-01"
resolutionStatus: "resolved"
resolutionDate: "2026-02-03"
resolutionSource: "industry-data"
resolutionSummary: "Resolved via rq-0-20 analysis. Global xenon production (70 tonnes/year) is insufficient for 150-tonne Phase 1 requirements. Krypton adopted as primary propellant with 80-85% of xenon Isp at 10x availability."
implications:
  - "SCU propulsion subsystem redesigned for krypton operation"
  - "Mass budget increased 18-25% for propellant to compensate for lower Isp"
  - "Thruster procurement shifted to krypton-optimized Hall-effect variants"
---

## Background

The Solar Collector Unit (SCU) design specifies ion propulsion systems for station-keeping operations, requiring 20-100 m/s ΔV capability over each unit's mission life. Ion thrusters conventionally use xenon as propellant due to its high atomic mass, chemical inertness, and favorable ionization characteristics. The consensus document identifies a critical supply chain bottleneck: Phase 1 deployment at the scale proposed by Claude's model requires approximately 150 tonnes of xenon, while global annual production currently stands at only ~70 tonnes. This represents a fundamental mismatch between project requirements and available industrial capacity that could constrain deployment timelines, drive prohibitive costs, or force architectural changes to the propulsion subsystem.

## Why This Matters

This supply chain constraint sits on the critical path for Phase 1 deployment. Without adequate propellant reserves, SCU production cannot proceed regardless of manufacturing readiness for other subsystems. The consequences cascade through multiple project dimensions:

**Schedule Risk**: If xenon procurement requires 2+ years of global production allocation, Phase 1 deployment timelines extend proportionally. Competing demand from semiconductor manufacturing, medical imaging, and other space missions further constrains availability.

**Cost Risk**: Scarcity-driven pricing could escalate propellant costs from current rates (~$1,500-3,000/kg) by 3-10x, potentially adding $200-400M to Phase 1 budgets at the 150-tonne requirement level.

**Architecture Lock-in**: Early propellant selection influences thruster design, power conditioning, tankage mass, and operational procedures. Switching propellants mid-program incurs significant redesign costs.

**Scalability Ceiling**: If Phase 1 consumes 2+ years of global xenon production, subsequent phases become untenable without alternative propellants or fundamentally different station-keeping approaches.

The recommended approach already suggests beginning deployment at 1.0 AU to reduce thermal stress, but this does not eliminate station-keeping requirements—it may actually increase them due to greater gravitational perturbations from Earth and other bodies.

## Key Considerations

**Specific Impulse Tradeoffs**: Xenon delivers 1,500-4,000 seconds Isp depending on thruster type. Krypton offers ~80-85% of xenon's Isp at roughly 10x greater global availability (~700 tonnes/year). This Isp reduction translates directly to increased propellant mass requirements—approximately 18-25% more krypton by mass for equivalent ΔV.

**Mass Budget Sensitivity**: Claude's 1,850 kg total unit mass and Gemini's aggressive 85 kg design both assume optimized propellant fractions. A 20% propellant mass increase could push lighter designs over feasibility thresholds or reduce payload margins on heavier variants.

**Thruster Compatibility**: Hall-effect thrusters and gridded ion engines require different optimization for krypton versus xenon operation. Krypton's lower atomic mass and different ionization characteristics affect discharge chamber design, magnetic field topology, and cathode operation.

**Ionic Liquid Propellants**: Electrospray thrusters using ionic liquids (e.g., EMI-BF4) eliminate noble gas dependency entirely but currently offer lower thrust density and less flight heritage. The consensus document mentions electrospray as an alternative but does not quantify performance penalties.

**Solar Radiation Pressure Utilization**: Gemini's heliogyro approach and the recommended hybrid attitude control strategy could reduce propellant requirements by 30-60% if solar pressure handles routine attitude maintenance, reserving chemical/electric propulsion for station-keeping maneuvers only.

## Research Directions

1. **Quantify Krypton Performance Penalty**: Model the specific ΔV budget for Phase 1 orbital maintenance at 1.0 AU, then calculate mass penalties for krypton substitution across the 20-100 m/s mission requirement range. Determine if the 100-1000 m² compromise unit size can absorb additional propellant mass.

2. **Survey Thruster Qualification Status**: Catalog existing flight-qualified or near-qualified thrusters optimized for krypton operation. Assess TRL levels, thrust ranges, and power requirements against SCU electrical budgets. Identify qualification gaps requiring development investment.

3. **Develop Xenon Procurement Strategy**: Engage with major xenon suppliers (Air Liquide, Linde, Praxair) to assess multi-year allocation agreements, pricing structures for 50-150 tonne commitments, and production capacity expansion timelines. Evaluate strategic reserve establishment.

4. **Model Hybrid Propulsion Architecture**: Analyze a dual-propellant system using xenon for high-precision maneuvers and krypton for bulk station-keeping. Quantify mass, complexity, and cost tradeoffs against single-propellant approaches.

5. **Assess Solar Pressure Station-Keeping Limits**: Conduct high-fidelity orbital dynamics simulations to determine what fraction of station-keeping ΔV can be provided by solar radiation pressure management alone, establishing the irreducible minimum propellant requirement that must be sourced regardless of strategy.
