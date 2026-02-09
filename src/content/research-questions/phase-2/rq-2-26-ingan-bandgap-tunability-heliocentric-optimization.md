---
questionId: "rq-2-26"
slug: "ingan-bandgap-tunability-heliocentric-optimization"
title: "InGaN Bandgap Tunability for Heliocentric Optimization"
questionType: "engineering-decision"
priority: "medium"
status: "open"
sourcePhase: "phase-2"
category: "materials"
sourceReference: "arxiv:1201.2911"
relatedBOMItems:
  - "bom-2-1"
  - "bom-1-1"
tags:
  - "InGaN"
  - "bandgap-engineering"
  - "heliocentric-distance"
  - "photovoltaics"
  - "III-V-semiconductors"
createdDate: "2026-02-09"
---

## Background

Indium gallium nitride (InGaN) alloys exhibit a unique property among photovoltaic materials: their bandgap can be continuously tuned from 0.7 eV (pure InN) to 3.4 eV (pure GaN) by adjusting the indium composition. This covers essentially the entire solar spectrum, theoretically enabling single-junction efficiencies exceeding 50% at optimal compositions. Research documented in arxiv paper 1201.2911 explores the potential of InGaN for high-efficiency solar cells, noting that the material system's bandgap range encompasses the theoretical Shockley-Queisser optimal of approximately 1.4 eV.

For the Dyson swarm construction program, collector satellites will operate at various heliocentric distances ranging from approximately 0.5 AU (Phase 2 inner collectors) to beyond 1.0 AU. The solar spectrum at different heliocentric distances remains essentially unchanged in shape, but the optimal photovoltaic bandgap shifts slightly due to temperature differences—collectors closer to the Sun operate at higher temperatures, shifting the optimal bandgap toward higher values.

More significantly, different orbital positions serve different functions within the swarm architecture. Inner collectors may prioritize power density (watts per square meter) to maximize output from the more intense solar flux, while outer collectors might prioritize power per unit mass to minimize transportation costs. These different optimization targets imply different optimal bandgaps, suggesting potential value in deploying collectors with heliocentric-distance-specific photovoltaic designs.

## Why This Matters

**Multi-Orbit Architecture Optimization**: The consensus collector design assumes relatively uniform photovoltaic specifications across all deployment locations. If significant efficiency gains are achievable through orbit-specific bandgap optimization, the swarm architecture might benefit from manufacturing multiple collector variants. The decision to pursue this complexity versus accepting suboptimal performance at some orbital locations affects manufacturing process design, logistics planning, and overall system optimization.

**Temperature-Dependent Performance**: At 0.5 AU, collector operating temperatures may exceed 200°C, while at 1.0 AU they may remain below 100°C. Photovoltaic efficiency degrades with increasing temperature, with the rate of degradation depending on bandgap—higher-bandgap materials generally perform better at elevated temperatures. InGaN's tunability could enable temperature-matched collector designs optimized for specific orbital thermal environments.

**Manufacturing Process Unification vs. Specialization**: InGaN thin films are grown by metal-organic chemical vapor deposition (MOCVD) or molecular beam epitaxy (MBE), with composition controlled by precursor flow rates. A single manufacturing line could potentially produce variable-bandgap materials by adjusting process parameters, enabling orbit-specific optimization without entirely separate production facilities. Understanding the practical limits of this flexibility is essential for manufacturing architecture decisions.

## Key Considerations

**Indium-Rich InGaN Growth Challenges**: While the InGaN bandgap range is theoretically attractive, practical challenges increase dramatically at higher indium content. Phase separation, high defect densities, and the "green gap" (reduced efficiency in the green spectral range) have limited demonstrated InGaN solar cell efficiencies to well below theoretical predictions. The optimal-bandgap compositions (approximately 40-60% indium for Shockley-Queisser maximum) fall squarely in this challenging compositional range.

**Material Availability Constraints**: Indium is a relatively scarce element on Earth and must be sourced for in-space manufacturing either from Earth launch or asteroid extraction. The availability of indium in target asteroid populations is poorly characterized. If indium proves limiting, lower-indium compositions with suboptimal bandgaps may be necessary regardless of theoretical advantages.

**Radiation Tolerance**: III-V semiconductors generally exhibit superior radiation tolerance compared to silicon, but InGaN-specific radiation response data is limited. Indium-rich compositions may be more susceptible to displacement damage due to the heavier indium atoms and weaker In-N bonds. Radiation testing across the composition range is needed to confirm suitability for 20-25 year operational lifetimes.

**Thermal Stability**: InGaN decomposition becomes thermodynamically favorable at elevated temperatures, with indium-rich compositions decomposing at lower temperatures. At 0.5 AU operating temperatures potentially exceeding 200°C, long-term thermal stability of high-indium compositions requires verification.

**Process Control Precision**: Achieving target bandgaps requires precise control of indium incorporation, which is sensitive to growth temperature, III/V ratio, and precursor purity. Manufacturing tolerances for orbit-specific optimization may be challenging to maintain at the production rates required (2,000-5,000 m²/day per node).

## Research Directions

1. **Compositional Optimization Study**: Fabricate InGaN solar cells across the composition range (0-70% indium) and characterize efficiency as a function of bandgap at temperatures representing different orbital operating conditions (50°C, 100°C, 150°C, 200°C). Map the actual efficiency versus theoretical predictions to quantify practical optimization potential.

2. **Heliocentric Optimization Analysis**: Model the combined effects of solar flux intensity, operating temperature, and optimal bandgap across the 0.3-1.5 AU range to quantify the efficiency advantage of orbit-specific designs versus a single universal composition. Determine whether the complexity of multiple variants is justified.

3. **Radiation Tolerance Characterization**: Expose InGaN cells of varying composition to proton irradiation at cumulative doses representing 25-year exposure at different orbital distances. Compare degradation rates across the composition range to identify any composition-dependent vulnerabilities.

4. **MOCVD Process Window Mapping**: Characterize the relationship between MOCVD growth parameters (temperature, precursor flows, pressure) and resulting film composition and quality. Determine whether rapid composition switching for orbit-specific production is practical within single manufacturing campaigns.

5. **Indium Resource Assessment**: Survey available data on indium abundance in target asteroid populations (M-type, S-type, C-type) and estimate total indium availability for swarm-scale manufacturing. Identify potential supply constraints that might limit high-indium compositions regardless of performance advantages.

6. **Alternative Material Comparison**: Benchmark InGaN against other variable-bandgap material systems (AlGaAs, InGaP, CuInGaSe) to determine whether InGaN's broader tuning range provides sufficient advantage to justify its growth challenges. Consider whether multi-junction approaches using more mature materials might achieve similar optimization flexibility.
