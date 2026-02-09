---
slug: "constellation-size-simulation-results"
title: "Simulation Reveals: Propulsion, Not Fleet Size, Limits NEA Survey Coverage"
description: "Monte Carlo analysis of 5,500+ simulated missions shows that electric propulsion choice matters more than constellation size for identifying high-value mining targets."
author: "Research Team"
date: "2026-02-01"
category: "Research"
tags:
  - "simulation"
  - "research-question"
  - "phase-0"
  - "propulsion"
  - "monte-carlo"
relatedPhases:
  - "phase-0"
---

# Simulation Reveals: Propulsion, Not Fleet Size, Limits NEA Survey Coverage

We built an interactive Monte Carlo simulator to answer a fundamental question for Phase 0: **How many prospecting satellites do we actually need?** The answer surprised us—and could save Project Dyson $100 million.

## The Question

The consensus specification for Prospecting Satellites calls for a 50-satellite constellation at $5M per unit—a $250M investment. But was this number rigorously validated, or just a reasonable planning estimate?

We built a [Monte Carlo simulator](/questions/minimum-constellation-size/simulator) to find out, running 500+ simulations for each parameter configuration across 11 constellation sizes (20-70 satellites).

## The Surprising Finding

**High-value NEA coverage plateaus at ~38% regardless of constellation size.**

Whether you deploy 20 satellites or 70, with electric propulsion you'll identify roughly the same proportion of high-value mining targets (metallic M-type and carbonaceous C-type asteroids). Adding more satellites only increases coverage of *low-value* targets.

| Constellation Size | Total Coverage | High-Value Coverage |
|-------------------|----------------|---------------------|
| 20 satellites | 12.8% | **38.8%** |
| 50 satellites | 30.7% | **38.2%** |
| 70 satellites | 41.9% | **35.8%** |

The high-value coverage is essentially flat—even slightly *decreasing* at larger fleet sizes as resources get spread thinner.

## What Does Matter: Propulsion Type

The real determinant of survey effectiveness isn't fleet size—it's propulsion choice:

| Propulsion | High-Value Coverage | Delta |
|------------|---------------------|-------|
| Electric (Ion) | 38.2% | baseline |
| Hybrid | 36.6% | -4% |
| Chemical | **14.2%** | **-63%** |

**Chemical propulsion is catastrophic for high-value target identification.** The limited delta-V budget means satellites simply cannot reach the orbital families where valuable asteroids reside.

## The Physics Explanation

Why does this happen? It comes down to delta-V accessibility:

1. **High-value NEAs aren't uniformly distributed**—they cluster in orbital families that require specific delta-V to reach
2. **Electric propulsion's ~15 km/s budget** can access about 38% of these families
3. **Additional satellites** can survey more targets within those families, but can't reach the 62% of high-value NEAs that remain inaccessible

Think of it like fishing: more boats help you catch more fish in the reachable waters, but no number of boats will catch fish in waters you can't reach. You need a faster boat.

## Mission Duration and Reliability

We also tested mission duration (5-10 years) and failure rates (0-10%). Neither significantly affected high-value coverage:

**Mission Duration (Electric, 50 sat, 3% failure):**
- 5 years: 23% total, 38% high-value
- 7 years: 31% total, 38% high-value
- 10 years: 41% total, 38% high-value

**Failure Rate (Electric, 50 sat, 7 years):**
- 0% failure: 39% total, 38% high-value
- 3% failure: 31% total, 38% high-value
- 10% failure: 25% total, 38% high-value

The high-value ceiling is consistent across all configurations. Time and reliability affect how many low-value targets you survey, but not the fundamental accessibility constraint.

## Implications for Project Dyson

### 1. Reduce Constellation Size from 50 to 30-35 Satellites

This saves **$75-100 million** with:
- Zero impact on high-value target identification
- Only 12% reduction in total coverage (low-value targets)
- Sufficient redundancy for the 7-year mission

### 2. Electric Propulsion is Non-Negotiable

The 63% reduction with chemical propulsion makes it essentially unusable for our primary mission objective. This validates the consensus specification's emphasis on high-Isp systems.

### 3. Consider Higher Delta-V Systems for Phase 2

To break the 38% ceiling, future prospecting missions would need:
- Higher Isp propulsion (>15 km/s delta-V budget)
- In-space refueling capability
- Or acceptance that 38% coverage is sufficient for Phase 1 mining operations

### 4. 38% May Be Enough

Even 38% of high-value NEAs represents hundreds of potential mining targets. For Phase 1's production goals, this is likely more than sufficient. The question becomes: is it worth spending $100M+ to survey targets we'll never mine?

## Try It Yourself

We've published the [interactive simulator](/questions/minimum-constellation-size/simulator) so you can explore these trade-offs yourself. Adjust constellation size, mission duration, failure rates, and propulsion type to see how coverage changes.

## Methodology

The simulation uses:
- **2,000 synthetic NEAs** with realistic orbital element distributions based on known population statistics
- **Greedy target assignment** prioritizing high-value asteroids (M-type, C-type)
- **Simplified Hohmann transfer** delta-V calculations
- **Bernoulli failure model** for satellite reliability
- **500 Monte Carlo runs** per configuration for statistical significance

Results should be interpreted as relative comparisons between configurations, not absolute predictions of real-world coverage.

## What's Next

This research answers RQ-0-3 and marks the first time we've used simulation to validate a consensus specification. We're now evaluating which other research questions could benefit from similar computational analysis.

The $100M savings identified here could be redirected to:
- Higher-capability propulsion development
- Additional redundancy in processing platforms
- Accelerating Phase 1 collector production

---

**Research Question:** [RQ-0-3: Minimum constellation size for survey coverage](/questions/minimum-constellation-size)

**Interactive Tool:** [NEA Constellation Coverage Simulator](/questions/minimum-constellation-size/simulator)
