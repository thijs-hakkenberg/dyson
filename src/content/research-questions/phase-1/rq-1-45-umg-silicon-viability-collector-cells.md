---
questionId: "rq-1-45"
slug: "umg-silicon-viability-collector-cells"
title: "UMG Silicon Viability for Collector Cells"
questionType: "analysis"
priority: "high"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-1"
sourceBOMItemSlug: "collector-units"
sourceBOMItemName: "Collector Units"
relatedBOMItems:
  - "bom-1-1"
  - "bom-2-1"
tags:
  - "materials"
  - "silicon"
  - "photovoltaic"
  - "cost-reduction"
category: "materials"
createdDate: "2026-02-09"
arxivSources:
  - "2101.08019"
---

## Background

Semiconductor-grade silicon (SoG-Si) used in conventional photovoltaic cells requires extensive purification processing, contributing significantly to cell cost and energy intensity. Upgraded metallurgical-grade silicon (UMG-Si) offers a potentially lower-cost alternative that has demonstrated efficiencies reaching 20.76% in research settings—competitive with many space-qualified cell technologies.

The Siemens process for producing SoG-Si is energy-intensive and capital-intensive, requiring temperatures exceeding 1000°C and complex chemical handling. UMG-Si processes use metallurgical refining techniques that reduce both energy consumption and facility costs, potentially enabling faster production scale-up for the Dyson swarm's terawatt-scale requirements.

Research paper arXiv:2101.08019 examines UMG-Si as a pathway to lower-cost terawatt-scale photovoltaic production, documenting achieved efficiencies, remaining purity challenges, and economic projections for high-volume manufacturing.

## Why This Matters

This question carries **high priority** because material cost and supply chain constraints fundamentally affect Phase 1 manufacturing economics and scale-up feasibility.

**Cost Structure Impact**: Silicon feedstock represents a significant fraction of crystalline silicon cell costs. If UMG-Si proves viable for collector cells, total program costs could decrease substantially while relaxing supply chain constraints on high-purity silicon.

**Production Scaling**: The Siemens process is capital-intensive with long facility construction times. UMG-Si production scales more readily using established metallurgical industry infrastructure, potentially accelerating the production rate growth required for Phase 2 deployment.

**Purity Requirements Clarification**: Space-based PV cells operate in a different environment than terrestrial cells—no atmospheric oxygen, different thermal cycling, radiation exposure. Some terrestrial purity requirements may be driven by factors irrelevant in space, while other space-specific requirements may dominate.

**ISRU Material Processing Implications**: If UMG-Si proves sufficient, in-space silicon refining requirements become less stringent, potentially simplifying Phase 2 ISRU facility design and reducing their mass and power requirements.

**Technology Pathway Validation**: Determining UMG-Si viability informs broader technology selection decisions, including whether to pursue crystalline silicon approaches or redirect toward thin-film alternatives that avoid silicon purity constraints entirely.

## Key Considerations

**Efficiency vs. Purity Relationship**: UMG-Si contains higher levels of transition metal impurities (iron, titanium, chromium) that create recombination centers reducing cell efficiency. The functional relationship between impurity levels and space-relevant performance metrics requires characterization.

**Radiation Tolerance Uncertainty**: Impurities in silicon can either enhance or degrade radiation tolerance depending on their nature and concentration. Some impurities may provide beneficial defect engineering effects while others may accelerate radiation damage propagation.

**Thermal Performance**: Space PV operates at temperatures different from terrestrial conditions. Impurity-related effects may have different magnitudes at elevated operating temperatures (100-150°C) typical of inner solar system deployment.

**Reliability Implications**: Long mission lifetimes (15-25 years) provide extended exposure to any impurity-related degradation mechanisms. Accelerated testing must adequately capture these long-term effects.

**Gettering Optimization**: Phosphorus diffusion gettering, commonly used in cell processing, removes metallic impurities from the active region. Optimized gettering protocols specific to UMG-Si may achieve acceptable performance at lower starting purity levels.

**Economic Crossover Analysis**: Even if UMG-Si cells have lower efficiency, their lower cost may provide better economics on a $/watt basis. This tradeoff must be quantified across realistic production volume scenarios.

## Research Directions

1. **Space Environment Testing Program**: Fabricate test cells from UMG-Si feedstock and subject them to simulated space conditions including radiation exposure, thermal cycling, and vacuum operation to characterize performance relative to SoG-Si baseline cells.

2. **Impurity Tolerance Mapping**: Systematically vary individual impurity concentrations to establish tolerance thresholds for each species, identifying which impurities are acceptable and which require removal.

3. **Optimized Processing Development**: Develop cell processing recipes optimized for UMG-Si feedstock, including enhanced gettering, hydrogen passivation, and defect engineering approaches.

4. **Economic Modeling**: Construct detailed cost models comparing UMG-Si and SoG-Si pathways at various production scales, incorporating efficiency differences, process costs, and supply chain considerations.

5. **Hybrid Approach Evaluation**: Assess whether partial purification approaches (intermediate between UMG and SoG) offer optimal cost-performance tradeoffs for space applications.
