---
slug: "resolution-node-end-of-life-disposal"
title: "Resolved: Passive Disposal for Failed Swarm Nodes"
description: "Consensus: use solar radiation pressure for passive orbital segregation. Design the failure state, not just the operational state. Tracking thousands of dead nodes is the real challenge."
author: "Project Dyson Team"
date: "2026-02-07"
category: "Research Resolutions"
tags:
  - "resolution"
  - "discussion"
  - "phase-1"
  - "disposal"
  - "swarm"
  - "debris"
  - "solar-sailing"
---

# Resolved: Passive Disposal for Failed Swarm Nodes

How do you dispose of a failed swarm element that has no propulsion, no communication, and no attitude control? Our multi-model discussion reached consensus after two rounds: **you don't—you let physics do it for you**.

## The Propulsion Problem

Traditional disposal approaches fail immediately:

| Approach | ΔV Required | Available Budget |
|----------|-------------|------------------|
| Heliocentric graveyard transfer | 100s of m/s | 0.5-62 m/s/year (operational) |
| Solar deorbit | ~30 km/s | Impossible |

Worse, the most critical constraint: **any viable strategy must work precisely when propulsion has failed**, since propulsion failure is among the most likely failure modes.

Reserving ΔV for end-of-life maneuvers would degrade station-keeping throughout each node's operational lifetime for a capability that may be unavailable when needed.

## The Physics-First Solution

The insight: **exploit what makes these satellites unique**—their high area-to-mass ratio.

50 m² solar sails at 35-50 g/m² experience solar radiation pressure (SRP) accelerations producing several m/s of ΔV per month. Active nodes continuously articulate their sails for station-keeping; failed nodes experience a different time-averaged SRP vector, causing **natural drift out of operational bands**.

Quantitative analysis:
- SRP acceleration at full sail area: ~0.8 m/s/day at 0.3 AU
- Orbital separation timescale: months to years
- No propulsion required

## Design the Failure State

Passive drift alone is non-deterministic: certain failure attitudes could keep nodes within—or drive them deeper into—operational zones.

The solution: **engineer the default failure state**.

A spring-loaded or bi-stable sail mechanism defaults to a specific attitude (e.g., ~45° cone angle or feathered edge-on) when power is lost. This ensures the most probable failure mode produces **predictable outward drift**, rather than relying on random tumble dynamics.

**Mass impact**: ~100g for mechanical bias mechanism

## The Tiered Architecture

| Tier | Trigger | Action |
|------|---------|--------|
| 0 | Power loss | Mechanical sail bias (passive, no power) |
| 1 | Health degradation with ≥48h warning | Autonomous sail-oriented disposal maneuver |
| 2 | Degraded but receptive | Cluster-commanded disposal via hardcoded receiver |
| 3 | Catastrophic no-warning failure | Accept persistence, track indefinitely |

Each tier addresses a different failure scenario, with Tier 0 providing the unconditional backstop.

## Tracking is the Real Challenge

A mature swarm will accumulate **thousands of failed nodes** over its operational lifetime. The collision avoidance system requires accurate ephemerides for all of them.

**Catalog maintenance of failed nodes is the operationally dominant challenge**, surpassing the disposal maneuver itself.

The solution: invest in trackability from day one.

| Component | Mass | Purpose |
|-----------|------|---------|
| Survival beacon | 50g | Active tracking (20+ year design life) |
| Corner-cube retroreflector | 20g | Passive optical tracking |
| Mechanical sail bias | 100g | Predictable drift behavior |
| Hardcoded disposal receiver | 80g | Command reception for degraded nodes |
| **Total** | **~250g** | ~0.5% of 50 kg node mass |

## Graveyard Instability

A critical finding: **graveyard regions are not permanently stable**.

Over 50-100 year timescales:
- Differential SRP on tumbling debris
- Jupiter perturbations
- Poynting-Robertson drag

These effects cause graveyard populations to spread and potentially re-enter operational zones.

**Implication**: Indefinite tracking is required. There is no "dispose and forget."

## Design for Instability

The most elegant recommendation: **design the operational orbit regime to be inherently unstable without active control**.

If the station-keeping SRP vector required to maintain position is continuously fighting a natural drift gradient, then any loss of attitude control immediately initiates passive segregation. The node doesn't have to "do something" to leave—it just has to stop actively staying.

This is a fundamental architecture decision that must precede orbital slot allocation algorithms.

## Unresolved Questions

1. What is the statistical distribution of failure attitudes for the actual sail geometry?
2. How should beacon tracking capacity scale as dead node populations grow (100-300/year indefinitely)?
3. What battery discharge level balances thermal runaway risk against survival beacon power?
4. What regulatory framework applies to heliocentric debris accumulation?

## Recommended Actions

1. **Conduct tumble dynamics simulations** for actual sail geometry across failure modes
2. **Baseline 250g disposal package** into node specification immediately
3. **Develop autonomous failure prediction algorithm** with ≥48h lead time
4. **Design operational orbit regime for inherent instability** before slot allocation algorithms
5. **Establish long-term debris accumulation model** with quantitative review thresholds

---

*This resolution addresses [RQ-1-42: End-of-life disposal for failed swarm nodes](/questions/node-end-of-life-disposal). View the full discussion thread including both rounds of deliberation on the question page.*
