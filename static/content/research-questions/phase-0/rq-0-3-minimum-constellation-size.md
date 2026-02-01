---
questionId: "rq-0-3"
slug: "minimum-constellation-size"
title: "Minimum constellation size for survey coverage"
questionType: "simulation"
priority: "high"
status: "answered"
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
  - "monte-carlo"
  - "propulsion"
createdDate: "2026-01-31"
answeredDate: "2026-02-01"
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

## Answer

**Monte Carlo simulation reveals that propulsion type, not constellation size, is the primary constraint on high-value NEA coverage.**

### Key Finding: High-Value Coverage Has a Hard Ceiling

With electric propulsion, high-value coverage plateaus at approximately **38%** regardless of:
- Constellation size (20-70 satellites)
- Mission duration (5-10 years)
- Failure rate (0-10%)

This plateau indicates that delta-V accessibility, not fleet size or operational time, determines which high-value asteroids can be surveyed.

### Propulsion Comparison (50 satellites, 7 years, 3% failure rate)

| Propulsion | Total Coverage | High-Value Coverage |
|------------|----------------|---------------------|
| Electric (Ion) | 30.7% | **38.2%** |
| Hybrid | 24.1% | **36.6%** |
| Chemical | 17.2% | **14.2%** |

Chemical propulsion results in a **63% reduction** in high-value target identification compared to electric propulsion.

### Recommended Constellation Size

| Scenario | Fleet Size | Rationale |
|----------|------------|-----------|
| **Minimum viable** | 25 satellites | Achieves same high-value coverage as larger fleets |
| **Recommended** | 30-35 satellites | Provides redundancy margin against failures |
| **Baseline (current plan)** | 50 satellites | Overkill for mining target identification |

### Cost Implications

Reducing from 50 to 30 satellites saves **$100M** (20 × $5M/unit) with:
- **Zero impact** on high-value target identification
- Only -12% total coverage (low-value targets matter less for mining)

### Additional Findings

**Mission duration affects total coverage but NOT high-value coverage:**
- 5 years: 23% total, 38% high-value
- 7 years: 31% total, 38% high-value
- 10 years: 41% total, 38% high-value

**Reliability affects total coverage with minimal high-value impact:**
- 0% failure: 39% total, 38% high-value
- 3% failure: 31% total, 38% high-value
- 10% failure: 25% total, 38% high-value

## Recommendation

1. **Reduce baseline from 50 to 30-35 satellites** — saves $75-100M with negligible impact on mining target identification

2. **Prioritize electric propulsion** — critical for reaching high-value metallic and carbonaceous asteroids

3. **Accept the 38% high-value coverage constraint** — this represents hundreds of viable mining targets, sufficient for Phase 1 operations

4. **Consider higher delta-V propulsion for future phases** — propulsion improvements would unlock additional high-value targets currently inaccessible

## Methodology

Results derived from Monte Carlo simulation with 500 runs per configuration:
- Synthetic NEA population: 2,000 objects with realistic orbital distributions
- Greedy target assignment algorithm prioritizing high-value asteroids
- Simplified Hohmann transfer delta-V approximations
- Annual failure modeling using Bernoulli distribution

[Launch Interactive Simulator](/questions/minimum-constellation-size/simulator)

## Key Considerations

**Survey rate and mission duration**: At 20 asteroids/satellite/year across 7 years, a single satellite characterizes ~140 asteroids. The known NEA population exceeds 30,000 objects, but only a fraction meet accessibility and composition criteria for Dyson swarm materials.

**Orbital mechanics constraints**: NEA survey opportunities are not uniformly distributed. Satellites require sufficient delta-V to reach diverse orbital families. The propulsion divergence (green monopropellant vs. electric vs. hybrid) affects individual satellite reach, which in turn affects how many satellites are needed for comprehensive coverage.

**Spectroscopic confirmation requirements**: Visible/NIR spectroscopy (0.4-2.5 μm) provides primary composition data, but the optional thermal infrared capability (3-14 μm) may reduce the number of required observation passes per target. Constellation sizing depends on whether TIR is included.

**Redundancy and reliability**: With 7-year design life, statistical satellite failures must be modeled. A 50-satellite constellation tolerates losses differently than a 25-satellite minimum-viable constellation.

**Communication architecture**: Gemini's mesh networking emphasis versus Claude/GPT's ground-primary approach affects whether satellites can share survey data to avoid redundant observations, directly impacting effective coverage per unit.

## Research Directions (Completed)

1. ~~**Monte Carlo orbital simulation**: Model NEA population accessibility from Earth-departure trajectories, incorporating realistic delta-V budgets for each propulsion option.~~ **COMPLETED** — see simulator

2. ~~**Failure mode sensitivity analysis**: Using reliability data from comparable SmallSat missions, simulate constellation degradation over the 7-year lifespan.~~ **COMPLETED** — failure rate has minimal impact on high-value coverage

3. ~~**Marginal value curve generation**: Plot survey completeness against constellation size to identify diminishing returns thresholds.~~ **COMPLETED** — coverage scales linearly with size; high-value coverage is flat

## Future Research

- Coverage optimization algorithm development comparing centralized vs. distributed scheduling
- Launch manifest integration study for rideshare availability analysis
- Higher delta-V propulsion options to break the 38% high-value ceiling
