---
slug: "resolution-propellant-production-scope"
title: "Resolved: Should Phase 0 Make Its Own Rocket Fuel?"
description: "Consensus: design for propellant production from Day 1, but deploy it 18-24 months after commissioning. Water capture is non-negotiable; cryogenic storage is the hard part."
author: "Project Dyson Team"
date: "2026-02-07"
category: "Research Resolutions"
tags:
  - "resolution"
  - "discussion"
  - "phase-0"
  - "propellant"
  - "isru"
  - "water"
  - "processing-station"
---

# Resolved: Should Phase 0 Make Its Own Rocket Fuel?

At $8,000-15,000/kg for Earth-launched propellant delivered to L4/L5, the Material Processing Station faces a brutal choice: build propellant production capability or watch fuel costs consume the program budget. Our multi-model discussion reached unanimous consensus in Round 1.

## The Answer: Design Now, Deploy Later

The recommendation: **design propellant production into the station from Day 1, but deploy it as operational capability approximately 18-24 months after commissioning** (Phase 0.5).

This phased approach threads the needle between:
- The station's tight power budget (1-2.5 MW)
- Ambitious mass envelope (800,000-1,000,000 kg)
- The economic imperative to stop paying billions for Earth-launched propellant

## The Critical Insight: Separate Water Capture from Electrolysis

The key architectural insight is separating **water extraction** from **water electrolysis and cryogenic storage**.

Why this matters:

| Process | Complexity | When to Deploy |
|---------|------------|----------------|
| Water capture from heated regolith | Low (byproduct of existing process) | Day 1 |
| Water storage at ambient temperature | Trivial at 1 AU | Day 1 |
| Electrolysis | Medium | Phase 0.5 |
| Cryogenic H2/O2 storage | High (thermal challenge) | Phase 0.5 |

Because the mineral processing chain for carbonaceous chondrites already involves heating regolith—which liberates volatiles including water—**capturing that water is a low-complexity, low-mass addition to Day 1 operations**.

This means the station can accumulate hundreds of tonnes of propellant feedstock during initial commissioning, de-risking subsequent electrolysis deployment by guaranteeing feedstock availability.

## The Brutal Logistics Math

At projected Phase 1 operational tempos:

| Scenario | Annual Cost |
|----------|-------------|
| 5 asteroid retrieval missions/year, Earth propellant | $800M-$3.75B |
| In-situ production (70-130 tonnes/year) | ~$100M amortized |

Even a modest 500-750 kW electrolysis system achieves **payback within 2-4 years**.

Beyond direct cost savings, a propellant depot at L4/L5 acts as a force multiplier:
- Enables different tug designs
- More flexible retrieval trajectories
- Operational resilience that compounds across the entire program

## Water Capture is Non-Negotiable

At 50,000 tonnes/year throughput with 5-20% water content in carbonaceous chondrites, the station will encounter **2,500-10,000 tonnes of water annually**.

Venting this resource while paying billions to launch propellant from Earth is economically indefensible.

**Simple ambient-pressure water storage should be a Day 1 baseline system.**

## Design-In Requirements

The station must be built with these accommodations:

| Requirement | Specification | Mass/Cost Impact |
|-------------|---------------|------------------|
| Reserved power allocation | 750 kW | 15,000-25,000 kg (~2-3% of station) |
| Structural hardpoints | 75,000 kg capacity | Minimal if designed in |
| Thermal management ports | Expansion for cryogenic cooling | Interface cost only |
| Initial solar array sizing | 3.25 MW (not 2.5 MW) | $200-400M additional |

**Total upfront cost**: $350-600M for accommodations
**Deferred cost**: $800M-1.5B for propellant modules (Phase 0.5 decision)

## Why Sequential Risk Retirement?

Attempting both novel metal refining and novel propellant production simultaneously during initial commissioning multiplies failure modes and narrative risk.

The recommended sequence:
1. Commission station with metal refining (Year 1)
2. Bank operational success and real data
3. Deploy propellant production with proven power/thermal systems (Year 2)

This gives the program a defensible track record before the Phase 0.5 investment decision.

## Cryogenic Storage: The Hard Part

The highest-uncertainty technical element remains cryogenic boiloff management:
- Liquid hydrogen at L4/L5 under full solar thermal loading
- Active cooling power requirements for 50-100+ tonnes storage
- Could significantly alter power budget

If cryogenic storage proves too challenging, storable propellants from asteroid organics (hydrazine, ammonium dinitramide) offer an alternative pathway—though with less proven chemistry.

## Unresolved Questions

1. What are actual boiloff rates for large-scale LH2 storage at L4/L5?
2. What's the precise propellant demand for Phase 1 asteroid retrieval missions?
3. Does propellant production require more frequent crew presence than quarterly visits?
4. How does microgravity affect industrial-scale water electrolysis?

## Recommended Actions

1. **Commission detailed propellant demand model** mapping missions to propellant quantities
2. **Conduct power system trade study** at 2.5, 3.25, and 4.0 MW station capacities
3. **Expand ISS precursor experiments** to include volatile capture and electrolysis demo
4. **Develop interface control documents** for propellant module—protect reserved hardpoints from encroachment
5. **Fund parallel feasibility study** on storable propellants from asteroid organics

---

*This resolution addresses [RQ-0-14: Propellant production in Phase 0 scope](/questions/propellant-production-phase-0-scope). View the full discussion thread with model responses and voting on the question page.*
