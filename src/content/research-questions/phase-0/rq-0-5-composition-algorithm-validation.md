---
questionId: "rq-0-5"
slug: "composition-algorithm-validation"
title: "Asteroid composition algorithm validation"
questionType: "experimentation"
priority: "high"
status: "investigating"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-1"
sourceBOMItemSlug: "prospecting-satellites"
sourceBOMItemName: "Prospecting Satellites"
relatedBOMItems:
  - "bom-0-1"
tags:
  - "algorithm-validation"
  - "spectral-analysis"
  - "ground-truth"
arxivReferences:
  - "2203.11229"
  - "2210.01006"
  - "1903.11559"
  - "1703.10574"
  - "1409.4704"
  - "2110.06611"
  - "1406.6645"
  - "1502.06302"
  - "2404.12536"
createdDate: "2026-01-31"
---

## Background

Prospecting Satellites form the reconnaissance backbone of Project Dyson's resource acquisition strategy, tasked with surveying near-Earth asteroids (NEAs) to identify optimal mining targets for swarm construction materials. The consensus document specifies a fleet of 50 satellites, each equipped with visible/NIR spectroscopy (0.4-2.5 μm) as the essential composition analysis instrument, with some configurations including thermal infrared mapping (3-14 μm). These satellites must operate with Level 3 autonomy enabling 30-day independent operation and achieve survey rates of 20+ asteroids per satellite per year.

The open questions section explicitly identifies algorithm validation as a critical research need: "How to validate asteroid composition algorithms before deployment?" This question emerges because the satellites' core mission—determining asteroid mineralogy from spectral data—depends entirely on software algorithms that translate reflectance spectra into actionable composition estimates. Without validated algorithms, the $250M constellation investment could yield unreliable data that misdirects subsequent mining operations.

## Why This Matters

Algorithm validation directly impacts the entire downstream Dyson swarm construction timeline. Prospecting Satellites must correctly identify asteroids rich in iron, nickel, silicates, and volatiles to prioritize targets for extraction spacecraft. False positives waste mission delta-V and operational time pursuing unsuitable targets, while false negatives cause the fleet to overlook viable resources.

The consensus document notes divergent views on "on-board spectral unmixing compared to ground processing," making validation even more critical. If on-board algorithms are deployed without adequate validation, errors propagate through 30-day autonomous operation windows before ground controllers can intervene. With a 7-year design life and 50 satellites surveying 1,000+ asteroids annually, systematic algorithm errors compound into mission-threatening data quality issues.

The phased deployment strategy—5 pathfinders before full constellation—provides a validation opportunity, but only if ground-truth methodologies are established beforehand. The pathfinder phase cannot validate algorithms if no validation framework exists.

## Key Considerations

**Spectral Resolution Tradeoffs**: The consensus identifies "optimal spectrometer resolution vs. mass/power tradeoff" as an open question. Algorithm validation must account for the actual spectral resolution achievable within the 80-120 kg satellite mass budget, as lower resolution degrades mineral identification accuracy.

**Ground-Truth Data Availability**: Validated asteroid composition data exists only for bodies visited by sample-return missions (Ryugu, Bennu, Itokawa) or meteorite parent bodies with established spectral links. This limited dataset constrains statistical validation approaches.

**Spectral Unmixing Complexity**: Asteroid surfaces present intimate mineral mixtures, space weathering effects, and viewing geometry variations. Algorithms must handle these confounding factors across the 0.4-2.5 μm range (and 3-14 μm if TIR is included).

**Processing Location**: On-board processing reduces data downlink requirements but limits algorithm complexity. Ground processing enables sophisticated analysis but conflicts with 30-day autonomous operation requirements. Validation must address both processing modes.

**Cost and Schedule Constraints**: The $5M per-unit budget with limited contingency (15-20% recommended) restricts extensive pre-flight validation campaigns. Validation approaches must be cost-effective.

## Research Directions

1. **Compile Reference Spectral Library**: Assemble laboratory reflectance spectra of meteorite samples with known mineralogy, spanning carbonaceous, ordinary, and enstatite chondrite classes plus iron meteorites. Degrade spectra to expected flight instrument resolution and signal-to-noise ratios to create realistic test datasets.

2. **Conduct Blind Algorithm Testing**: Develop a validation protocol where algorithm developers process degraded spectra without access to ground-truth compositions. Compare algorithm outputs against known mineralogy to quantify accuracy, precision, and systematic biases for key mineral phases (olivine, pyroxene, phyllosilicates, metals).

3. **Leverage Existing Telescope Observations**: Cross-reference algorithm predictions against NEAs with published ground-based spectral classifications (Bus-DeMeo taxonomy) and radar-derived bulk density estimates. While not direct composition validation, consistency checks identify gross algorithm failures.

4. **Design Pathfinder Validation Experiments**: Structure the 5-satellite pathfinder deployment to observe asteroids with existing spacecraft flyby data (e.g., Eros, Mathilde, Lutetia) as calibration targets. Plan observation geometries that replicate conditions from previous missions for direct comparison.

5. **Establish Uncertainty Quantification Framework**: Develop algorithms that output composition probability distributions rather than point estimates. Validate that reported uncertainties accurately reflect true error distributions through Monte Carlo testing with synthetic spectra incorporating realistic noise models.
