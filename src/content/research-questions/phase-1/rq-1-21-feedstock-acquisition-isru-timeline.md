---
questionId: "rq-1-21"
slug: "feedstock-acquisition-isru-timeline"
title: "Feedstock acquisition and ISRU transition timeline"
questionType: "discussion"
priority: "high"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-4"
sourceBOMItemSlug: "assembly-node"
sourceBOMItemName: "Assembly Node Hub"
relatedBOMItems:
  - "bom-1-4"
  - "bom-0-2"
  - "bom-0-3"
  - "bom-2-3"
relatedResearchQuestions:
  - "rq-1-49"
  - "rq-1-50"
  - "rq-1-51"
  - "rq-2-32"
tags:
  - "ISRU"
  - "feedstock"
  - "supply-chain"
  - "timeline"
arxivReferences:
  - "2110.15198"
  - "1808.05099"
  - "1810.03836"
createdDate: "2026-02-01"
---

## Background

The Assembly Node Hub (ANH) serves as the primary orbital manufacturing and assembly platform for Phase 1 of the Dyson swarm deployment, targeting production throughput of 1–1.7 MW-equivalent solar collector capacity per month. The consensus document specifies a "Phase 1 Feedstock Strategy" relying on semi-processed or pre-fabricated materials from Earth or near-Earth sources, with ISRU (In-Situ Resource Utilization) transition planned for later phases. However, the three source models diverge significantly on feedstock acquisition methods: Claude assumes conventional cargo delivery via tugs from asteroid sources, Gemini proposes electromagnetic interception of hypervelocity packets from a Mercury surface mass driver, and GPT assumes standardized cargo canisters with cooperative docking.

This question emerges directly from the tension between the recommended approach—which explicitly defers in-space refining and mass-driver catch systems to Phase 2+—and the long-term economic viability of the swarm construction program. The ANH's dry mass range of 120,000–450,000 kg and continuous manufacturing operations create substantial ongoing material demands that Earth-based supply chains may not sustainably support.

## Why This Matters

The feedstock strategy fundamentally determines the ANH's operational economics, design requirements, and scaling trajectory. Key dependencies and risks include:

**Launch Cost Sensitivity**: At current launch costs ($1,500–3,000/kg to LEO, significantly more to heliocentric orbit at 1 AU), Earth-supplied feedstock represents the dominant operational expense. A 100 m² solar collector tile at ~45 kg requires feedstock delivery costs potentially exceeding the manufactured unit's energy-generation value for years.

**Design Lock-In Risk**: If ISRU transition timing is not established early, the ANH architecture may lack necessary interfaces for future feedstock processing equipment. The modular pallet architecture provides flexibility, but thermal, power, and structural margins must be preserved. The recommended 150% thermal rejection oversizing (2.4–4.0 MW capacity) partially addresses this, but feedstock processing may require additional thermal loads not currently budgeted.

**Program Cost Divergence**: The three models estimate total program costs between $9.5B and $18B through 5–10 years of operations. Much of this variance traces to feedstock assumptions—Gemini's Mercury mass-driver approach front-loads infrastructure investment but dramatically reduces per-unit delivery costs, while GPT's conservative Earth-supply baseline maintains lower technical risk at higher recurring expense.

**Throughput Ceiling**: The target of 1–1.7 MW-equivalent monthly production cannot scale indefinitely on Earth-supplied materials. Identifying the crossover point where ISRU becomes mandatory—versus merely economical—determines Phase 2 planning timelines.

## Key Considerations

- **Material Composition Requirements**: Solar collector production requires specific feedstock forms—metal coils, PV rolls, packaged electronics per the recommended approach. ISRU systems must match these specifications or the ANH requires additional on-site processing capability.

- **Orbital Location Coupling**: The feedstock strategy interacts strongly with the unresolved orbital location trade. A 0.39 AU position (Gemini's preference) enables Mercury mass-driver integration but imposes severe thermal penalties. The recommended 1 AU baseline simplifies thermal management but extends supply lines from potential asteroid sources.

- **Processing Energy Budget**: Refining raw asteroid or lunar regolith into manufacturing-grade feedstock requires substantial energy input. The ANH's 1.5–2.0 MW power class may prove insufficient for simultaneous manufacturing and ISRU operations without significant power system expansion.

- **Contamination Concerns**: The open question on waste and contamination management becomes more acute with ISRU. Raw material processing generates slag, particulates, and outgassing that threaten the clean manufacturing environment required for thin-film PV production.

- **Autonomy Requirements**: ISRU operations add complexity to the three-tier autonomy system. Feedstock quality assessment, adaptive processing, and supply chain optimization require tactical-level decision-making currently scoped for assembly operations only.

## Research Directions

1. **Develop Feedstock Mass Flow Model**: Quantify monthly material consumption by category (structural metals, semiconductor materials, adhesives, electronics) for the 1–1.7 MW production target. Map each category to potential ISRU sources (C-type asteroids, lunar regolith, Mercury surface) with associated processing requirements.

2. **Conduct Launch Cost Crossover Analysis**: Calculate the cumulative launch cost for Earth-supplied feedstock over 5, 10, and 20-year operational periods. Determine the ISRU infrastructure investment threshold at which in-space sourcing achieves cost parity, accounting for different orbital locations.

3. **Define Minimum Viable ISRU Capability**: Specify the smallest ISRU system that meaningfully reduces Earth dependency—potentially focusing on bulk structural materials while continuing Earth supply for high-purity electronics and PV substrates. Estimate mass, power, and thermal requirements for integration with the modular pallet architecture.

4. **Assess Asteroid Redirect Mission Heritage**: Review NASA ARM and related mission studies for applicable feedstock delivery concepts. Evaluate whether near-Earth asteroid capture and processing represents a lower-risk ISRU pathway than planetary surface extraction.

5. **Model Phased Transition Scenarios**: Develop three timeline scenarios (aggressive: ISRU at Phase 1 year 3; moderate: Phase 2 year 1; conservative: Phase 3) with associated ANH design implications, cost profiles, and risk assessments.
