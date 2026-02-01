---
questionId: "rq-0-3"
slug: "minimum-constellation-size"
title: "Minimum constellation size for survey coverage"
questionType: "simulation"
priority: "high"
status: "open"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-1"
sourceBOMItemSlug: "prospecting-satellites"
sourceBOMItemName: "Prospecting Satellites"
relatedBOMItems:
  - "bom-0-1"
tags:
  - "constellation-design"
  - "survey-coverage"
  - "mission-planning"
createdDate: "2026-01-31"
---

## Background

Prospecting Satellites form the reconnaissance backbone of Project Dyson's resource acquisition strategy, tasked with surveying and characterizing near-Earth asteroids (NEAs) to identify optimal mining candidates for swarm construction materials. The consensus document establishes a baseline fleet of 50 satellites, each capable of surveying 20+ asteroids per year over a 7-year design life. However, this fleet size represents a planning estimate rather than a rigorously validated minimum. The question of minimum constellation size emerges directly from the open questions identified across all three AI models: determining the smallest viable fleet that achieves acceptable survey coverage is essential for optimizing the $250M budget allocation ($5M/unit) while maintaining mission objectives.

## Why This Matters

The minimum constellation size directly determines capital expenditure, launch logistics, and operational complexity. If simulation demonstrates that 30 satellites achieve 95% of the survey value of 50 satellites, Project Dyson could reallocate $100M toward other critical path items—potentially accelerating collector panel production or refinery development. Conversely, if coverage analysis reveals that 50 satellites are insufficient for comprehensive NEA characterization within mission timelines, early identification allows for budget reallocation before hardware commitments.

**Critical dependencies include:**
- **Launch strategy**: The consensus recommends rideshare launches, but constellation size affects whether dedicated launches become necessary for deployment cadence
- **Ground operations scaling**: Level 3 autonomy enables 30-day independent operation, but ground station capacity must scale with constellation size
- **Phased deployment planning**: The recommended 5-unit pathfinder phase assumes eventual scale-up; simulation must validate this ratio

**Risk implications:**
- Underestimating minimum size delays resource identification, creating downstream bottlenecks for mining operations
- Overestimating minimum size wastes capital and operational resources that could advance other project elements
- Incorrect sizing may invalidate the 15-20% contingency buffer already flagged as tight

## Key Considerations

**Survey rate and mission duration**: At 20 asteroids/satellite/year across 7 years, a single satellite characterizes ~140 asteroids. The known NEA population exceeds 30,000 objects, but only a fraction meet accessibility and composition criteria for Dyson swarm materials.

**Orbital mechanics constraints**: NEA survey opportunities are not uniformly distributed. Satellites require sufficient delta-V to reach diverse orbital families. The propulsion divergence (green monopropellant vs. electric vs. hybrid) affects individual satellite reach, which in turn affects how many satellites are needed for comprehensive coverage.

**Spectroscopic confirmation requirements**: Visible/NIR spectroscopy (0.4-2.5 μm) provides primary composition data, but the optional thermal infrared capability (3-14 μm) may reduce the number of required observation passes per target. Constellation sizing depends on whether TIR is included.

**Redundancy and reliability**: With 7-year design life, statistical satellite failures must be modeled. A 50-satellite constellation tolerates losses differently than a 25-satellite minimum-viable constellation.

**Communication architecture**: Gemini's mesh networking emphasis versus Claude/GPT's ground-primary approach affects whether satellites can share survey data to avoid redundant observations, directly impacting effective coverage per unit.

## Research Directions

1. **Monte Carlo orbital simulation**: Model NEA population accessibility from Earth-departure trajectories, incorporating realistic delta-V budgets for each propulsion option. Vary constellation size from 20-60 satellites and measure percentage of high-value targets (metallic M-type, carbonaceous C-type) reachable within 7 years.

2. **Coverage optimization algorithm development**: Implement scheduling algorithms that assign asteroid targets to satellites while minimizing observation overlap. Compare centralized ground-based scheduling against distributed mesh-network coordination to quantify coverage efficiency gains from inter-satellite communication.

3. **Failure mode sensitivity analysis**: Using reliability data from comparable SmallSat missions, simulate constellation degradation over the 7-year lifespan. Determine the minimum initial deployment size that maintains 80% survey capability at end-of-life with 90% confidence.

4. **Marginal value curve generation**: Plot survey completeness (percentage of priority targets characterized) against constellation size to identify diminishing returns thresholds. This directly informs whether the 5-pathfinder strategy provides sufficient data to validate full-scale deployment decisions.

5. **Launch manifest integration study**: Cross-reference constellation size options against projected rideshare availability (2027-2032 timeframe) to identify deployment bottlenecks. Determine if minimum constellation sizes below 35 units enable purely rideshare deployment versus requiring dedicated launches.
