---
questionId: "rq-2-31"
slug: "planetary-perturbation-century-scale-stability"
title: "Planetary gravitational perturbations on century-scale swarm stability"
questionType: "analysis"
priority: "high"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-1"
sourceBOMItemSlug: "collector-satellites"
sourceBOMItemName: "Collector Satellites"
relatedBOMItems:
  - "bom-2-1"
  - "bom-1-1"
tags:
  - "orbital-mechanics"
  - "gravitational-perturbation"
  - "Jupiter"
  - "swarm-longevity"
  - "N-body"
arxivReferences:
  - "2504.21151"
createdDate: "2026-02-12"
---

## Background

Lacki (2025, arxiv:2504.21151) calculates that Jupiter's gravitational perturbations would destroy an uncontrolled megaswarm at Earth's orbit in **a few hundred thousand years**—far shorter than the million-year collision timescale for randomized element velocities alone. Planetary perturbations differentially accelerate swarm elements based on their exact orbital parameters, causing orbital elements to diverge over time and increasing collision probability between neighbors.

Existing question rq-1-2 addresses station-keeping propellant budgets and mentions "gravitational perturbations from planetary bodies" as a perturbation source, but only in the context of calculating ΔV requirements for 10-25 year operational lifetimes. It does not model the cumulative effect of planetary perturbations over 100-1,000 year timescales, nor does it quantify how perturbation-induced orbital dispersion interacts with collision cascade dynamics.

For a swarm with active station-keeping, planetary perturbations are a continuous ΔV tax. Over centuries, this tax accumulates: elements that lose station-keeping capability (propellant depletion, thruster failure) will drift into crossing orbits with maintained elements, creating collision hazards. The question is how quickly this happens and how large the resulting debris flux becomes.

## Why This Matters

**Station-keeping budget implications:** If Jupiter's perturbations impose a higher ΔV requirement than currently budgeted, propellant reserves deplete faster, shortening element operational life. The current 20-100 m/s lifetime ΔV budget may be insufficient for century-scale operation.

**Orbital architecture constraints:** Certain orbital geometries may be inherently more resistant to planetary perturbations. The choice of swarm orbital distribution (single shell vs. multi-ring vs. distributed cloud) has consequences for perturbation sensitivity that are not yet quantified.

**Resonance hazards:** Swarm elements near orbital resonances with Jupiter (e.g., 2:1, 3:1 Kirkwood gaps in the asteroid belt) will experience enhanced perturbation effects. If the swarm operates near any solar system resonance, entire orbital bands could become unstable on shorter timescales.

**Decommissioned element drift:** Failed elements that lose station-keeping will drift under planetary perturbations into new orbits. The timescale for drift into collision-hazardous trajectories determines how quickly failed elements must be removed by the repair/disposal fleet.

## Key Considerations

**Perturbation Sources in Our Solar System:**
| Body | Perturbation Magnitude at 1 AU | Timescale for Significant Drift |
|------|-------------------------------|-------------------------------|
| Jupiter | Dominant | ~10⁴-10⁵ years (uncontrolled) |
| Venus | Moderate | ~10⁵-10⁶ years |
| Earth-Moon | Moderate (if swarm at ~1 AU) | ~10⁴-10⁵ years |
| Saturn | Minor | ~10⁶ years |
| Mars | Minor | ~10⁶+ years |

**Orbital Distance Sensitivity:**
- Swarm at 0.3-0.5 AU (closer to Sun): reduced Jupiter perturbation, increased Venus perturbation
- Swarm at 1.0 AU: maximum Jupiter perturbation (near resonance zones)
- Swarm distributed across 0.3-1.0 AU: differential perturbation rates across the swarm

**Interaction with Station-Keeping:**
- Active station-keeping counteracts perturbations—but at a cost
- ΔV requirement from Jupiter perturbation: estimated 0.1-1 m/s per year per element
- Over 100 years: 10-100 m/s cumulative—comparable to the entire station-keeping budget
- Implication: century-scale operation may require refueling or propellant-free station-keeping (solar sailing)

## Research Directions

1. **Century-scale N-body simulation**: Run full N-body simulations of representative swarm elements at candidate orbital distances (0.3, 0.5, 0.7, 1.0 AU) including all planetary perturbations over 100-1,000 year timescales. Quantify orbital element dispersion and crossing-orbit collision probability.

2. **Resonance mapping**: Identify all significant orbital resonances with solar system planets in the 0.3-1.5 AU range. Map "danger zones" where swarm elements should not be placed due to enhanced perturbation sensitivity.

3. **ΔV budget refinement**: Calculate the actual ΔV required to counteract planetary perturbations at each candidate orbital distance over 100+ year timescales. Compare against current 20-100 m/s budget to determine if propellant reserves are adequate or if solar sailing must become the primary station-keeping mechanism.

4. **Failed-element drift modeling**: Simulate the trajectory of elements that lose station-keeping at various orbital positions. Determine the timescale for drift into collision-hazardous orbits and the resulting debris flux to maintained swarm regions.

5. **Orbital architecture optimization**: Evaluate whether specific orbital geometries (inclined rings, eccentric orbits, Lagrange-point-adjacent) offer inherent perturbation resistance. Compare longevity of ring-based architecture (as Lacki suggests) against Project Dyson's current distributed formation.
