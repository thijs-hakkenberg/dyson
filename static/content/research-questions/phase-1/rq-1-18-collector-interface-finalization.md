---
questionId: "rq-1-18"
slug: "collector-interface-finalization"
title: "Tile/Collector interface finalization"
questionType: "engineering-decision"
priority: "critical"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-3"
sourceBOMItemSlug: "assembly-robots"
sourceBOMItemName: "Assembly Robots"
relatedBOMItems:
  - "bom-1-3"
  - "bom-1-1"
  - "bom-1-2"
  - "bom-1-4"
tags:
  - "interfaces"
  - "standards"
  - "deployment-mechanisms"
createdDate: "2026-02-01"
---

## Background

Assembly Robots for Phase 1 of the Dyson swarm must manipulate, position, and join solar collector elements—referred to as "tiles" in the consensus documentation. The robot architecture specifies three classes with distinct capabilities: heavy handlers (1,000–2,500 kg) for positioning large assemblies, dexterous workers (150–500 kg) for precision tasks, and logistics drones (50–100 kg) for material transport. These robots require sub-millimeter positioning accuracy (±0.5mm for heavy manipulators, ±0.1mm for precision work) and must interface with collector tiles through standardized mechanical grapple/docking fixtures.

However, the consensus document explicitly identifies that the final mass, stiffness, and deployment mechanisms for swarm elements remain undefined. This creates a critical dependency: robot force requirements, gripper designs, manipulation sequences, and throughput calculations cannot be finalized until the tile/collector interface is locked. The recommended approach emphasizes locking interface standards before detailed design, yet this foundational specification remains open.

## Why This Matters

The tile/collector interface specification directly determines robot design parameters across all three classes:

**Force and Torque Requirements**: A 50 kg deployable tile with compliant hinges requires fundamentally different handling than a 500 kg rigid panel. Heavy handlers sized for 500 kg payload capacity and 500 N end-force may be overbuilt or undersized depending on final tile mass. Precision assemblers with ±0.1mm accuracy must know whether they're aligning rigid kinematic features or managing flexible membrane deployment.

**Throughput and Fleet Sizing**: The consensus shows radical divergence in production philosophy—from Claude's 350 robots total to Gemini's 10,000 units/month target. Tile handling time directly scales fleet requirements. A tile requiring 30 minutes of robotic manipulation versus 3 minutes changes fleet size by an order of magnitude.

**Joining Technology Selection**: The recommended approach prioritizes mechanical joining (kinematic docking, compliant latches, captive fasteners) over welding for Phase 1. However, this assumes tile interfaces can accommodate mechanical connections. Thin-film collectors may require adhesive bonding or thermal welding, contradicting the risk-reduction strategy.

**Deployment Mechanism Compatibility**: If tiles self-deploy from a stowed configuration, robots must manage stored elastic energy and coordinate timing. If tiles arrive pre-deployed, logistics drones must transport larger volumes. Either approach cascades into propellant budgets, work cell geometry, and collision avoidance algorithms.

Delaying this decision risks expensive redesign cycles. Robots prototyped for one interface concept may require fundamental architecture changes when tile specifications finalize.

## Key Considerations

**Mass Range Uncertainty**: Current estimates span at least one order of magnitude. Heavy handler designs assume 500 kg payload capacity, but actual tile mass could range from 20 kg (thin-film concentrators) to 800 kg (rigid structural elements with integrated power conditioning).

**Stiffness and Handling Dynamics**: Flexible structures require distributed grapple points and coordinated multi-robot manipulation. Rigid tiles permit single-point handling but demand higher interface loads. The eight-legged Spider-class concept assumes traversable 3D structures—incompatible with membrane-based collectors.

**Deployment Mechanism Options**: Candidates include spring-loaded hinges, inflatable booms, shape-memory actuators, and centrifugal deployment. Each imposes different constraints on stowage density, deployment reliability, and robotic intervention requirements.

**Thermal Cycling Durability**: Interfaces must survive decades of thermal cycling at 0.7–1.0 AU (initial operations) with growth path to 0.5 AU where solar flux reaches 5,480 W/m². Mechanical latches, adhesive bonds, and welded joints exhibit different fatigue characteristics.

**Contamination Sensitivity**: The consensus identifies contamination control as an open question. Interface mechanisms that generate debris (mechanical wear, fastener insertion) may be incompatible with thin-film photovoltaic surfaces.

## Research Directions

1. **Conduct trade study on collector architectures**: Evaluate rigid panel, tensioned membrane, and hybrid approaches against robot capability requirements. Quantify mass, stiffness, and deployed area for each option with explicit robot handling implications.

2. **Define interface control document (ICD) requirements**: Establish minimum specification set required to proceed with robot detailed design—grapple fixture geometry, alignment feature tolerances, maximum handling loads, and deployment sequence constraints.

3. **Prototype candidate interfaces with robot mockups**: Build physical representations of 2–3 tile interface concepts and test with representative manipulator hardware. Measure actual positioning accuracy, cycle times, and failure modes.

4. **Model thermal-structural behavior of interface options**: Simulate mechanical latch, adhesive bond, and welded joint performance under 0.5–1.0 AU thermal cycling. Identify designs meeting 20-year life requirements.

5. **Establish interface review gate in development schedule**: Define milestone where tile/collector interface specifications must freeze, with explicit robot design dependencies documented. Align with Years 1–2 ground prototype phase from the convergent roadmap.
