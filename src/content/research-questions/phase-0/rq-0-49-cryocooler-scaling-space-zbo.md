---
questionId: "rq-0-49"
slug: "cryocooler-scaling-space-zbo"
title: "Cryocooler scaling from milliwatt to hundred-watt class for space ZBO"
questionType: "engineering-decision"
status: "investigating"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-3"
  - "bom-0-6"
parentQuestionId: "rq-0-30"
tags:
  - "cryocooler"
  - "scaling"
  - "zero-boiloff"
  - "power-systems"
  - "L4-L5"
externalReferences:
  - "Plachta-2018"
  - "NASA/TM-2015-0000134"
  - "NASA/TP-2017-219389"
  - "Zagarola-2006"
  - "Gandolfi-2024"
createdDate: "2026-02-13"
---

## Background

Current flight-qualified cryocoolers deliver less than 1 watt of cooling at 20 K. The JWST MIRI cryocooler — the state of the art — produces approximately 0.25 W at 14 K. For 90 K (LOX temperatures), the largest space units provide about 20 W. The Material Processing Station requires 100-500 W of cooling at 20 K for zero-boiloff LH2 storage — a gap of 2-3 orders of magnitude. The NASA GODU-LH2 ground demonstration (Notardonato, NASA/TP-2017-219389) achieved 390 W at 20 K using a Linde LR1620 industrial refrigerator, proving the physics works at the required scale but using hardware far too massive and power-hungry for spaceflight. The reverse turbo-Brayton cycle (Zagarola 2006, developed by Creare) is the leading candidate for bridging this gap, offering high reliability, negligible vibration, long maintenance-free lifetimes, and the ability to directly cool remote and distributed loads.

## Why This Matters

Without cryocoolers capable of 100+ W at 20 K in a flight-qualified package, zero-boiloff LH2 storage at station scale is impossible. The alternative — accepting boiloff and producing excess propellant to compensate — fundamentally changes the economics of in-situ propellant production. Cryocooler power requirements (100-500 kW) represent 3-15% of the station's power budget, making cooler efficiency directly impact station capability. This is arguably the single most critical technology gap for the propellant storage system.

## Key Considerations

- JWST MIRI: 0.25 W at 14 K (flight heritage, but 3 orders of magnitude below requirement)
- GODU-LH2: 390 W at 20 K (ground demo, proves physics, non-flight hardware)
- Carnot efficiency at 20 K is just 7% (Plachta 2015) — most input power becomes waste heat
- Reverse turbo-Brayton (Creare/Zagarola): leading scaling pathway, 20 W at 20 K demonstrated on ground
- 90 K broad area cooling within MLI reduces effective temperature differential for 20 K stage
- Multiple smaller distributed cryocoolers vs. single large unit trade
- 30-year operational lifetime requirement exceeds all existing space cryocooler missions

## Research Directions

1. **Turbo-Brayton scaling roadmap**: Map the development pathway from current 20 W ground units to 100-500 W flight-qualified systems, identifying key engineering challenges at each step.

2. **Distributed vs. centralized cooling**: Compare a single large cryocooler vs. multiple smaller units (10-50 W each) for redundancy, efficiency, and maintenance considerations.

3. **Staged cooling architecture**: Optimize the combination of passive thermal control (sunshield + MLI) → 90 K broad area cooling → 20 K final cooling to minimize 20 K cryocooler capacity requirements.

4. **Power-mass-cooling optimization**: Model the coupled optimization of cryocooler capacity, power consumption, radiator mass, and station power budget allocation.

5. **Reliability and maintenance**: Assess cryocooler failure modes and redundancy architectures for 30-year operation with maintenance capability.
