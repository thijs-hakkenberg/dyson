---
slug: "orbital-location-trade-analysis-findings"
title: "Where to Build: Multi-Objective Analysis Reveals Optimal Hub and Depot Locations"
description: "Pareto frontier analysis comparing 8 orbital locations for Assembly Hub and depot placement. Sun-Earth L4/L5 emerges as optimal for Phase 1, with 0.7 AU heliocentric as a Phase 2 option."
author: "Research Team"
date: "2026-02-03"
category: "Research"
tags:
  - "simulation"
  - "research-question"
  - "phase-1"
  - "orbital-mechanics"
  - "trade-study"
  - "monte-carlo"
relatedPhases:
  - "phase-1"
---

# Where to Build: Multi-Objective Analysis Reveals Optimal Hub and Depot Locations

Orbital location selection is one of the most consequential decisions for Dyson swarm construction. We built a multi-objective Monte Carlo trade model to compare 8 candidate locations across cost, risk, and capability dimensions.

## The Questions

Two related research questions drove this analysis:
- **RQ-1-19**: Where should the Assembly Node Hub be located?
- **RQ-1-36**: Where should logistics depots be positioned?

These decisions are coupled—hub location affects depot requirements, and depot placement constrains operational flexibility.

## The Candidates

We evaluated 8 orbital locations spanning cislunar space to Mercury orbit:

| Location | Distance | Solar Flux | Delta-V from Earth |
|----------|----------|------------|-------------------|
| Lunar NRHO | 0.0026 AU | 1,361 W/m² | 3.5 km/s |
| Sun-Earth L1 | 1.0 AU | 1,361 W/m² | 4.0 km/s |
| Sun-Earth L4/L5 | 1.0 AU | 1,361 W/m² | 4.5 km/s |
| Heliocentric 1.0 AU | 1.0 AU | 1,361 W/m² | 4.0 km/s |
| Heliocentric 0.7 AU | 0.7 AU | 2,780 W/m² | 6.0 km/s |
| Heliocentric 0.5 AU | 0.5 AU | 5,444 W/m² | 8.0 km/s |
| Venus L4/L5 | 0.72 AU | 2,620 W/m² | 5.5 km/s |
| Sun-Mercury L1 | 0.39 AU | 8,900 W/m² | 12.0 km/s |

## The Key Finding: L4/L5 for Phase 1, Inner System for Phase 2

**Sun-Earth L4/L5 provides the optimal balance for Phase 1 operations.**

| Objective | Winner | Why |
|-----------|--------|-----|
| Lowest Cost | Sun-Earth L1 | Minimum delta-V from Earth |
| Highest Capability | 0.7 AU Heliocentric | 2× power density |
| Lowest Risk | Sun-Earth L4/L5 | Gravitationally stable, proven thermal |
| **Overall** | **Sun-Earth L4/L5** | **Best risk-adjusted performance** |

## The Pareto Frontier

Multi-objective optimization reveals that no single location dominates across all criteria. The Pareto-optimal solutions are:

1. **Sun-Earth L4/L5** - Best for risk-averse Phase 1
2. **Heliocentric 0.7 AU** - Best for power-optimized Phase 2
3. **Lunar NRHO** - Best for cislunar staging only

Mercury orbit (0.39 AU) falls off the Pareto frontier due to thermal management challenges that increase risk without proportionate capability gains.

## The Thermal Cliff

The simulation reveals a critical threshold at 0.5 AU:

| Distance | Radiator Requirement | Feasibility |
|----------|---------------------|-------------|
| >0.7 AU | ~3,000 m² | Standard design |
| 0.5-0.7 AU | ~6,000 m² | Oversized radiators |
| <0.5 AU | >10,000 m² | Active cooling mandatory |

**Operations inside 0.5 AU require fundamental thermal architecture changes.**

For Phase 1, staying outside this thermal cliff dramatically reduces risk.

## Delta-V Budget Analysis

Round-trip mission costs from each depot location:

| Depot Location | To Swarm (1 AU) | Round Trip | Tank Sizing |
|----------------|-----------------|------------|-------------|
| NRHO | 3.5 km/s | 7.0 km/s | Large |
| L4/L5 | 2.5 km/s | 5.0 km/s | Moderate |
| 0.7 AU | 1.5 km/s | 3.0 km/s | Small |

**L4/L5 provides excellent logistics efficiency**—close enough to Earth for resupply, close enough to swarm for deployment.

## The Two-Tier Architecture

Based on the analysis, we recommend:

### Tier 1: Cislunar Staging (NRHO)
- Receives Earth-launched cargo
- Propellant depot for outbound tugs
- Human-accessible for crewed operations

### Tier 2: Heliocentric Operations (L4/L5)
- Primary Assembly Hub location
- Swarm deployment staging
- Long-duration autonomous operations

This architecture:
- Keeps humans in cislunar space (safer, shorter rescue time)
- Positions manufacturing where solar power is reliable
- Minimizes total delta-V across the logistics chain

## Communication Latency Analysis

| Location | Earth Light-Time (one-way) | Impact |
|----------|---------------------------|--------|
| NRHO | 1.3 seconds | Real-time control possible |
| L4/L5 | 8+ minutes | Requires autonomy |
| 0.7 AU | 4+ minutes | Requires autonomy |

**Any heliocentric location requires Level 3+ autonomy.** The consensus specification already requires 30-day autonomous operation, so this constraint is already met.

## Try It Yourself

We've published the [interactive simulator](/questions/orbital-location-trade-analysis/simulator) so you can explore these trade-offs. Adjust candidate locations, feedstock sources, objective weights, and fleet parameters to see how recommendations change.

## Methodology

The simulation uses:
- **Hohmann transfer delta-V calculations** for logistics costs
- **Thermal equilibrium modeling** for feasibility assessment
- **Light-time calculations** for communication latency
- **100 Monte Carlo runs** with weighted multi-objective scoring

Results should be interpreted as relative comparisons between locations.

## What's Next

This research answers RQ-1-19 and RQ-1-36, providing validated location recommendations for Phase 1. The L4/L5 baseline allows Phase 1 to proceed with known thermal technology while inner-system expansion remains an option for Phase 2.

Remaining work:
- Detailed swarm deployment geometry optimization
- Autonomy latency impact assessment
- Propellant logistics cost modeling for each architecture

---

**Research Questions:**
- [RQ-1-19: Optimal orbital location for Assembly Hub](/questions/orbital-location-trade-analysis)
- [RQ-1-36: Standard depot orbit selection](/questions/standard-orbit-depot-selection)

**Interactive Tool:** [Orbital Trade Simulator](/questions/orbital-location-trade-analysis/simulator)
