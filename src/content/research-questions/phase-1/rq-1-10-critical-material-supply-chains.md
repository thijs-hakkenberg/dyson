---
questionId: "rq-1-10"
slug: "critical-material-supply-chains"
title: "Critical material supply chains (Tellurium, Indium)"
questionType: "meta-research"
priority: "high"
status: "answered"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-2"
sourceBOMItemSlug: "pv-blanket-arrays"
sourceBOMItemName: "PV Blanket Arrays"
relatedBOMItems:
  - "bom-1-2"
  - "bom-2-1"
  - "bom-2-3"
tags:
  - "materials"
  - "supply-chain"
  - "tellurium"
  - "indium"
createdDate: "2026-02-01"
---

## Background

PV Blanket Arrays form the foundational energy-harvesting infrastructure of the Dyson swarm, with Phase 1 targeting deployment of thin-film photovoltaic membranes at scales ranging from 1,000 m² to 1 km² per unit. The consensus document identifies two primary thin-film cell technologies under consideration: Cadmium Telluride (CdTe), favored by Claude for its TRL 9 maturity and radiation hardness, and Perovskite-based cells, recommended by Gemini for extreme mass reduction and roll-to-roll manufacturing compatibility. Both pathways—along with CIGS alternatives and transparent conductive oxide layers—depend critically on elements with constrained terrestrial supply: tellurium for CdTe cells and indium for transparent conductors (typically indium tin oxide, ITO) used across multiple thin-film architectures.

This meta-research question emerges directly from Open Question #4 in the consensus document, which explicitly flags that "Tellurium (for CdTe) and Indium (for transparent conductors) face supply constraints at Dyson-scale production."

## Why This Matters

The scale differential between current terrestrial PV production and Dyson swarm requirements is staggering. A single 1 km² unit at 45 g/m² areal density represents 45,000 kg of laminate material. CdTe thin-film cells typically contain 5-7 g/m² of tellurium; at this loading, one 1 km² unit would require approximately 5,000-7,000 kg of tellurium. Global annual tellurium production is roughly 500 metric tons, meaning a single large unit could consume 1-1.4% of annual world supply.

Indium faces similar constraints. Annual global production is approximately 900 metric tons, with ITO coatings for displays and solar cells already competing for supply. Transparent conductors are required regardless of cell chemistry choice—CdTe, CIGS, and perovskite architectures all typically incorporate ITO or similar indium-based layers.

If Phase 1 proceeds with Earth-based manufacturing as recommended, material availability directly gates production rate. A supply chain bottleneck could delay swarm deployment by years or decades, fundamentally undermining project timelines. Conversely, early identification of viable alternatives or recycling pathways could de-risk the entire manufacturing strategy and inform the dual-track cell technology development approach.

## Key Considerations

**Tellurium Supply Dynamics**: Tellurium is primarily recovered as a byproduct of copper refining, with no dedicated primary mining. Supply is inelastic to price signals—increased demand cannot easily stimulate new production without proportional increases in copper mining.

**Indium Concentration**: Approximately 70% of indium production occurs in China, creating geopolitical supply risk. Indium is also a byproduct (primarily of zinc refining), with similarly inelastic supply characteristics.

**Loading Reduction Potential**: The consensus targets 35-50 g/m² areal mass density for the complete laminate. Reducing critical material loading per unit area through thinner active layers or alternative architectures could extend available supply by 2-5×.

**Alternative Transparent Conductors**: Aluminum-doped zinc oxide (AZO), fluorine-doped tin oxide (FTO), silver nanowires, and graphene-based conductors offer potential ITO replacements with varying performance tradeoffs in conductivity, transparency, and space environment stability.

**Recycling Feasibility**: End-of-life recovery rates for tellurium and indium from terrestrial PV are currently below 10%. The 5-25 year lifetime target implies eventual need for recovery infrastructure, potentially in-space.

**In-Situ Resource Availability**: Asteroid and lunar regolith compositions include trace tellurium and indium. Gemini's assertion that in-situ manufacturing is "mandatory from the start" may be driven partly by material constraints, not just launch mass limitations.

## Research Directions

1. **Quantitative Supply-Demand Modeling**: Develop a parametric model mapping Phase 1 deployment scenarios (unit count, size, cell technology mix) against projected material availability through 2040. Include sensitivity analysis for loading reduction and recycling rate improvements.

2. **Alternative Transparent Conductor Qualification**: Survey space heritage and radiation testing data for ITO alternatives (AZO, FTO, silver nanowires). Define a test campaign to characterize conductivity degradation under proton and electron fluence representative of 0.3-1.0 AU environments.

3. **Tellurium-Free Cell Architecture Assessment**: Evaluate perovskite formulations and CIGS variants that eliminate or minimize tellurium and indium content. Quantify efficiency, stability, and mass penalties relative to baseline CdTe.

4. **Asteroid Resource Characterization**: Compile spectroscopic and sample-return data on tellurium and indium concentrations in accessible near-Earth asteroids. Estimate minimum viable extraction infrastructure for supplementing terrestrial supply.

5. **Closed-Loop Recovery Process Design**: Develop conceptual process flow for in-space recovery of critical materials from degraded PV blankets, including collection logistics, separation chemistry, and reprocessing into manufacturing feedstock.
