---
slug: "resolution-sunshield-deployment-architecture"
title: "Resolved: What Kind of Sunshield Does a Space Propellant Depot Need?"
description: "Consensus: a modular 3-layer membrane sunshield, ~60m class, assembled incrementally from gore-shaped segments over 3-4 deliveries. No full-station spin required."
author: "Project Dyson Team"
date: "2026-03-19"
category: "Research Resolutions"
tags:
  - "resolution"
  - "discussion"
  - "phase-0"
  - "sunshield"
  - "cryogenic"
  - "thermal"
  - "deployment"
---

# Resolved: What Kind of Sunshield Does a Space Propellant Depot Need?

With cryogenic boiloff management confirmed viable (see [that resolution](/blog/resolution-cryogenic-boiloff-management)), the next question is what the sunshield actually looks like. JWST's 5-layer sunshield is the only flight heritage, but a propellant depot has very different requirements.

The deliberation concluded in 2 rounds with one key unresolved debate.

## The Answer: Modular, Incrementally Assembled, Three Layers

The consensus architecture:
- **3 membrane layers** with 2m vacuum gaps, achieving >99.99% solar flux blockage
- **12-gore wedge construction** enabling robotic assembly over 3-4 Starship deliveries
- **Total system mass**: 10-13 tonnes for a 60m-class shield
- **No full-station spin** (abandoned due to docking complexity, antenna pointing issues, and incompatibility with material processing)

The sunshield reduces heat input by three orders of magnitude, from ~204 kW of direct solar flux down to ~40-135 W through secondary pathways.

## The Unresolved Debate: Cone vs. Disk

The one point where models did not converge:
- **Truncated cone** (ULA heritage): natural approach corridors, structural rigidity, well-studied
- **Planar disk** (offset sunward): simpler construction, decoupled tank geometry, easier maintenance

Both work thermally. The choice requires finite element structural analysis at the 60m scale.

## Why No Spin?

An earlier design concept had the whole station rotating for propellant settling. The deliberation firmly rejected this: the operational penalties (docking complexity, solar array pointing, incompatibility with microgravity refining) far outweigh benefits. Capillary propellant management devices handle settled propellant management without spinning anything.

## Planned Maintenance

The sunshield isn't install-and-forget. UV degradation of polyimide membranes drives a 10-year rolling replacement cycle (2-3 gores per year), transforming it from a lifetime-limited deployable into indefinitely maintainable infrastructure.

## Read More


- Related: [Cryogenic Boiloff Management](/blog/resolution-cryogenic-boiloff-management)
