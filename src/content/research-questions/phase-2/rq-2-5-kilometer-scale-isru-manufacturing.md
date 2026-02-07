---
questionId: "rq-2-5"
slug: "kilometer-scale-isru-manufacturing"
title: "In-space manufacturing readiness for kilometer-scale structures"
questionType: "experimentation"
priority: "critical"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-1"
sourceBOMItemSlug: "collector-satellites"
sourceBOMItemName: "Collector Satellites"
relatedBOMItems:
  - "bom-2-1"
  - "bom-2-3"
  - "bom-0-3"
tags:
  - "ISRU"
  - "manufacturing"
  - "kilometer-scale"
  - "zero-gravity"
createdDate: "2026-02-01"
---

## Background

Solar Collector Satellites represent the fundamental energy-harvesting infrastructure of the Dyson swarm, with Phase 2 specifications calling for deployed areas ranging from 5,000 m² to potentially 1,km² per unit. The consensus document reveals a critical architectural divergence: Claude and GPT assume Earth-based manufacturing transitioning to in-space production over time, while Gemini requires Mercury surface mining and L2 orbital foundries from program inception. This question directly addresses whether we can reliably manufacture kilometer-scale conductive tethers, thin-film photovoltaics, and structural elements in zero-gravity using asteroid or lunar materials—a capability that the consensus explicitly identifies as driving "the entire program architecture."

The recommended approach calls for building the first 1,000–10,000 units from Earth while developing in-space manufacturing capability in parallel. However, scaling to billions of units at 225 kg to 2,500 kg each makes sustained Earth launch economically and logistically prohibitive. The transition point from terrestrial to in-situ manufacturing represents a fundamental program gate.

## Why This Matters

The manufacturing location decision cascades through every major system parameter. At the proposed production scales, launching even the smaller 225 kg Gemini-class satellites from Earth at billions of units would require launch mass exceeding all historical spaceflight by orders of magnitude. In-space resource utilization (ISRU) maturity directly determines:

- **Program timeline**: If ISRU readiness requires 15+ years of development, Phase 2 deployment schedules must accommodate this constraint or accept Earth-launch cost penalties
- **Material selection**: Designs must specify materials available from lunar regolith, asteroid feedstock, or Mercury surface—potentially excluding optimal terrestrial materials like high-purity Kapton variants
- **Interface standardization**: The consensus recommends "ISRU-compatible interfaces" but this requires knowing what ISRU processes will actually produce
- **Capital investment allocation**: Premature commitment to Mercury foundries (Gemini approach) versus Earth manufacturing (GPT/Claude approach) represents billions in infrastructure investment

If kilometer-scale zero-G manufacturing proves infeasible within program timescales, the entire swarm architecture must pivot toward smaller, Earth-manufacturable units with orbital assembly—fundamentally changing mass budgets, deployment logistics, and power transmission architectures.

## Key Considerations

**Structural Scale Requirements**: The divergent unit scales—from GPT's 5,000 m² to Claude's 1,000,000 m²—impose vastly different manufacturing challenges. A 1 km² membrane requires handling and tensioning structures spanning 1,000+ meters, with boom or tether elements potentially exceeding current zero-G fabrication experience by two orders of magnitude.

**Roll-to-Roll Process Adaptation**: The consensus emphasizes roll-to-roll manufacturing for thin-film PV production. Terrestrial roll-to-roll systems rely on gravity for web tensioning, material handling, and defect inspection. Zero-G equivalents require fundamentally different approaches—electrostatic tensioning, magnetic handling, or centrifugal artificial gravity.

**Material Purity and Consistency**: Thin-film photovoltaics targeting 25–42% conversion efficiency require semiconductor-grade material purity. ISRU feedstock from regolith or asteroid sources contains contaminants that terrestrial refining handles through gravity-dependent processes (settling, flotation, centrifugation). Zero-G purification at required scales remains undemonstrated.

**Defect Tolerance**: The consensus accepts "statistical defect rates over perfection" with 100–200 independent electrical zones providing graceful degradation. This philosophy may relax manufacturing precision requirements, but acceptable defect rates for kilometer-scale structures remain undefined.

**Thermal Environment**: Manufacturing at 0.5 AU (5,480 W/m² solar flux) versus shielded facilities at Earth-Moon L2 presents different thermal management challenges for precision fabrication equipment.

## Research Directions

1. **Demonstrate subscale zero-G thin-film deposition**: Conduct ISS or free-flyer experiments depositing multi-junction PV cells on flexible substrates in microgravity. Target 10 m² continuous deposition runs to characterize web handling, layer uniformity, and defect rates compared to terrestrial baselines.

2. **Characterize ISRU feedstock variability**: Analyze lunar and asteroid simulants to establish compositional bounds for silicon, aluminum, and other collector materials. Map purification process requirements against achievable zero-G separation techniques (electrostatic, magnetic, vapor-phase).

3. **Prototype kilometer-scale boom deployment and fabrication**: Test continuous pultrusion or extrusion of structural elements exceeding 100 m length in thermal vacuum conditions. Evaluate dimensional stability, joint reliability, and handling approaches for elements approaching the 1 km scale.

4. **Model manufacturing facility mass and power requirements**: Develop parametric models comparing Earth-launch of finished collectors versus in-space manufacturing facility amortization. Identify crossover points where ISRU becomes economically favorable at different production rates and unit scales.

5. **Validate electrostatic membrane tensioning at scale**: Demonstrate active tensioning systems capable of maintaining flatness across 100+ meter membrane spans without gravity assistance, characterizing power requirements and failure modes relevant to both manufacturing and operational phases.
