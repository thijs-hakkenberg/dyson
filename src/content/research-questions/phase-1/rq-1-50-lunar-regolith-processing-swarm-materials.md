---
questionId: "rq-1-50"
slug: "lunar-regolith-processing-swarm-materials"
title: "Lunar regolith processing for Dyson swarm materials"
questionType: "analysis"
priority: "high"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-1"
sourceBOMItemSlug: "collector-units"
sourceBOMItemName: "Solar Collector Units"
relatedBOMItems:
  - "bom-1-1"
  - "bom-1-5"
  - "bom-2-3"
relatedResearchQuestions:
  - "rq-1-21"
  - "rq-1-12"
tags:
  - "Moon"
  - "lunar"
  - "regolith"
  - "ISRU"
  - "feedstock"
  - "alternative-sources"
arxivReferences:
  - "2109.02201"
  - "2601.14719"
  - "2308.14331"
  - "2506.06392"
createdDate: "2026-02-13"
---

## Background

The Moon represents the closest and most accessible extraterrestrial material source, with a well-characterized surface composition, existing infrastructure roadmaps (Artemis, CLPS), and a 2.4 km/s escape velocity that makes material export far cheaper than from Earth (11.2 km/s) or Mars (5.0 km/s). Lunar regolith contains all major elements needed for solar collector manufacturing: silicon (20-21 wt% as SiO₂), aluminum (10-18 wt% as Al₂O₃), iron (5-15 wt% as FeO), titanium (1-8 wt% as TiO₂), and oxygen (43-45 wt%) as the dominant constituent by mass.

Recent research has advanced multiple processing pathways. Shaw et al. (2021, arxiv:2109.02201) evaluate lunar regolith processing routes including molten regolith electrolysis (MRE), which can extract metals and oxygen from unbeneficiated whole regolith—eliminating the need for mineral separation. De Guzman et al. (2026, arxiv:2601.14719) demonstrate oxygen production from lunar simulants, critical both as propellant and as a co-product of metal extraction. Gupta et al. (2023, arxiv:2308.14331) show that lunar regolith can be sintered into structural bricks without binders, enabling construction from raw material. McCallum et al. (2025, arxiv:2506.06392) demonstrate additive manufacturing of structural blocks from lunar regolith simulant, advancing in-situ construction capabilities.

Project Dyson's feedstock strategy (rq-1-21) currently focuses on asteroid ISRU with lunar sources not explicitly analyzed. Given the Moon's proximity, established characterization, and near-term accessibility via Artemis-era infrastructure, lunar materials could serve as either a bootstrap feedstock source for early phases or a sustained parallel supply chain.

## Why This Matters

Lunar regolith processing addresses several critical gaps in the current feedstock strategy:

**Near-Term Accessibility**: The Moon is 3 light-seconds away, enabling near-real-time teleoperation. Round-trip travel time is ~6 days. Compared to asteroid targets (months to years of transit), lunar materials could support construction operations within the first decade of Phase 1.

**Whole-Regolith Processing**: MRE and similar electrolytic methods process undifferentiated regolith, avoiding the need to identify and mine specific mineral deposits. This is a major advantage over asteroid ISRU where target composition varies between objects and even across a single body.

**Oxygen Co-Production**: Every tonne of metal extracted from lunar regolith co-produces 0.5-1.5 tonnes of oxygen. This oxygen is valuable as propellant for orbital transfer vehicles (bom-1-6), life support for crewed operations, and as a chemical processing reagent.

**Construction Material Pathway**: Sintering and additive manufacturing from raw regolith (Gupta 2023, McCallum 2025) provide a pathway for constructing lunar surface infrastructure—processing plants, launch facilities, habitats—without importing construction materials from Earth.

**Technology Readiness**: Lunar ISRU is the most actively funded space resource technology. NASA, ESA, JAXA, and commercial entities (Blue Origin, ispace) are investing billions in lunar surface processing demonstrations. Project Dyson could leverage this investment rather than developing asteroid-specific technology from scratch.

## Key Considerations

- **Silicon Purity Challenge**: Lunar regolith contains ~20 wt% silicon as SiO₂, but achieving solar-grade purity (6N, 99.9999%) requires energy-intensive refining. Our rq-0-15 analysis found UMG-Si (4N-5N) may be viable for space PV, which aligns better with MRE output purity levels.

- **Gravity Well Export Cost**: Despite lower escape velocity than Earth, launching material from the lunar surface still requires significant energy. Mass drivers (bom-1-5) are the leading candidate for economical bulk export, with lunar electromagnetic catapults proposed since O'Neill's 1970s studies.

- **Highland vs. Mare Composition**: Lunar highlands are aluminum-rich (anorthosite, ~18 wt% Al₂O₃) while mare regions are iron/titanium-rich (~15 wt% FeO, ~8 wt% TiO₂). The choice of processing site determines available element mix, potentially favoring highlands for aluminum reflectors and mare for iron structural elements.

- **Dust Mitigation**: Lunar regolith dust is notoriously abrasive and electrostatically charged. Processing equipment must manage fine particle adhesion to mechanisms, optics, and seals—a challenge shared with asteroid ISRU but better characterized on the Moon.

- **Volatile Scarcity**: Unlike C-type asteroids, lunar regolith is extremely dry (<100 ppm water in equatorial regions). Polar ice deposits offer water access but are localized. Carbon and nitrogen are scarce, limiting organic chemistry and some processing routes.

## Research Directions

1. **MRE Output Characterization for PV Manufacturing**: Determine whether molten regolith electrolysis can produce silicon at sufficient purity for UMG-Si solar cells. Map the impurity profile of MRE-extracted silicon against the minimum purity requirements from rq-0-15.

2. **Lunar Mass Driver Export Economics**: Calculate the $/kg cost of electromagnetic launch from the lunar surface to L1, L2, or 1 AU heliocentric orbit. Include facility construction cost (amortized over throughput), energy cost (solar power at lunar surface), and maintenance cadence for the launch system.

3. **Element Mix Optimization**: Given the differing compositions of highland and mare regolith, determine the optimal processing site(s) and whether multiple sites with different specializations outperform a single general-purpose facility.

4. **Bootstrap Scenario Modeling**: Model a scenario where lunar materials supply the first 100-1,000 solar collector units while asteroid ISRU infrastructure is being established. Determine whether the lunar bootstrap pathway accelerates or delays the overall construction timeline.

5. **Artemis Infrastructure Leverage**: Identify which planned Artemis-era infrastructure (power systems, surface habitats, communication relays) could be directly leveraged for a Dyson swarm lunar feedstock operation, reducing the marginal investment required.
