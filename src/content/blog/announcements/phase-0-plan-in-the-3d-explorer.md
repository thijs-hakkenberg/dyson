---
slug: "phase-0-plan-in-the-3d-explorer"
title: "The New Phase 0 Plan, in 3D"
description: "The 3D explorer now shows the re-baselined Phase 0: research and pathfinders first, a gated production option, a plant at the asteroid and a receiving node at Sun–Earth L1. Here is what changed and where to look."
author: "Project Dyson Team"
date: "2026-10-25"
category: "Announcements"
tags:
  - "explorer"
  - "phase-0"
  - "visualisation"
  - "announcement"
---

# The New Phase 0 Plan, in 3D

The [3D explorer](/explore) used to show Phase 0 as it was planned in March: a large central refinery at Sun–Earth L4/L5, crew visits, and 100 kW freighters. That plan is gone (see [the re-baseline](/blog/phase-0-technology-readiness-rebaselined) and [the new BOM](/blog/phase-0-bom-regenerated-first-simulations)). The explorer now shows the plan that replaced it, and every number in it comes from the regenerated consensus.

## What you will see

- **One target asteroid, not a mining field.** The mining robots, the processing plant, the 0A pathfinder and the containment monitoring all sit at a single target. Six rendezvous scouts sample candidates first; Gemini's proposal of twelve impactor scouts is shown as a ghost alternative.
- **A plant built from process trains.** The plant model is three trains of about 0.6 kt a year each, with 1,000–2,000 m² of radiators. The old 180 m station model is retired.
- **Tugs sized from the consensus.** The cargo tug's array span is the geometric mean of the three models' designs, and Claude's and GPT's versions stand beside it at true relative scale.
- **A receiving node at L1.** Product goes to a passive warehouse at Sun–Earth L1, the interim location under decision D-04, and Phase 1 builds from there.
- **Services as services.** Launch, ground stations, operations, ground R&D, spares, propellant and contingency are in the BOM, but they aren't drawn as spacecraft.

## Lenses worth opening

- **[Logistics](/explore?lens=logistics):** the Phase 0 chain now runs robots → plant → tugs → L1 node. Each stage's capacity comes from deployed units and consensus throughput. The plant and the tug fleet, at about 1 kt a year each, are the bottleneck.
- **[Gates](/explore?lens=gates):** the decision gates of D-02 as rings on a month axis. Each technology column arrives at the readiness level its gate requires, and links turn red when a technology would miss its window.
- **[Risk](/explore?lens=risk):** risk halos now blend the readiness gap with how hard the remaining path is (AD²), from the October TRL re-baseline.
- **[Phase 0 tour](/explore?tour=phase-0):** a two-and-a-half-minute walk-through with the new figures, including the committed 0A cost and the cost if production goes ahead.

## A calmer sky

The Milky Way panorama is shown far larger than its resolution allows, so its stars looked like soft pixel blocks competing with the hardware. The sky shader now separates the smooth band of the galaxy from its point stars and keeps only 30% of the stars' brightness. It also darkens the grainy faint background. The dust lanes and the galactic centre stay where they really are; the stars step back.

## What's next

Today the asteroids in the explorer are a statistical sample. The [asteroid screen](/questions/low-thrust-trajectories-cadence) has now produced a shortlist of real, reachable objects, and we plan to show those instead. The tug cycle times and the iodine supply from the new chain model will go into the Logistics lens. As always, divergent model positions are shown, not resolved.
