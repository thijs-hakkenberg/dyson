---
slug: "megaswarm-lifetime-lacki-review"
title: "How Long Does a Dyson Swarm Last? A New Paper Says Not as Long as You'd Think"
description: "Lacki (2025) calculates that an uncontrolled megaswarm at 1 AU grinds itself to dust in 41,000 years. We reviewed his findings against our existing plans—and found two gaps we hadn't considered."
author: "Project Dyson Team"
date: "2026-02-12"
category: "Research"
tags:
  - "research"
  - "arxiv"
  - "collision-avoidance"
  - "orbital-mechanics"
  - "swarm-longevity"
  - "Kessler-syndrome"
  - "phase-2"
relatedPhases:
  - "phase-1"
  - "phase-2"
---

# How Long Does a Dyson Swarm Last? A New Paper Says Not as Long as You'd Think

Brian C. Lacki of the Breakthrough Listen project published a paper in *The Astrophysical Journal* this year that should be required reading for anyone designing a megastructure: "Ground to Dust: Collisional Cascades and the Fate of Kardashev II Megaswarms" (arxiv:2504.21151). His central question is simple and devastating: if you build a swarm of satellites around a star, how long before they collide with each other and grind themselves into debris?

The answer, for an uncontrolled swarm at 1 AU around a Sun-like star: **about 41,000 years.**

That is not a typo. Even though the average time between individual element collisions is roughly a million years, the stochastic nature of early collisions triggers a cascading chain—each collision producing fragments that cause more collisions—that destroys the swarm far sooner than the average would suggest.

This is, in essence, Kessler syndrome scaled to stellar proportions.

## What Lacki Found

Lacki's analysis is elegant. A minimal megaswarm that can occult its star from any viewing angle needs at least 340 planet-sized (but thin) elements at 1 AU. He randomizes their velocities and calculates collision probabilities, finding that:

- **Average collision time**: ~1 million years between any two elements
- **Cascade destruction time**: ~41,000 years, because a few unlucky early collisions seed exponentially growing debris
- **Jupiter's gravitational perturbation** alone would destroy a 1 AU swarm in a few hundred thousand years by differentially accelerating elements into crossing orbits
- **Ring-based architectures** (elements grouped at different orbital altitudes, like Earth's satellite shells) extend intrabelt collision times to tens of thousands of years
- The cascade timescale is highly sensitive to stellar type: a swarm around a red giant (25 solar radii) survives 5.3 billion years, while a swarm around an M-dwarf (0.1 solar radii) fragments in just four months

Lacki's conclusion is sobering: "stellar megaswarms, without maintenance, are expected to be destroyed in most cases within a few million years."

## How Does This Map to Project Dyson?

We systematically reviewed Lacki's eight core concerns against our existing research questions and specifications. The results were better than expected—six of eight concerns are already addressed in our planning. But two significant gaps emerged.

### Already Covered: What We Got Right

**Kessler syndrome and collision avoidance** are central to our design. Research question [rq-1-6](/questions/swarm-collision-probability) (answered) established a three-layer collision avoidance architecture—predictive, reactive, and emergency—targeting less than 10⁻⁶ collision probability per unit-year. Question [rq-2-3](/questions/billion-unit-collision-avoidance) (open, critical priority) extends this to billion-unit certification, explicitly calling out cascade risk as existential.

**Station-keeping and active guidance** are thoroughly modeled. Question [rq-1-2](/questions/station-keeping-propellant-budget) (answered) quantifies station-keeping requirements at various orbital distances, demonstrates that solar radiation pressure can serve as a primary station-keeping mechanism for our lightweight membrane collectors, and budgets 20-100 m/s ΔV over mission life.

**Solar radiation pressure** effects are well characterized. Our collectors, with areal densities of 13-85 g/m², experience substantial solar pressure forces—up to 182 mN for a 10,000 m² collector at 0.5 AU. We treat this as an asset (free propulsion) rather than purely a perturbation.

**Collision avoidance strategies** include boid-like flocking algorithms, 10-50 km minimum separations, hierarchical shepherd/flock coordination architecture, and dynamic spatial partitioning. The infrastructure is designed to actively prevent exactly the scenario Lacki describes.

In short: our swarm is designed to be actively controlled, not passively orbiting. Lacki's 41,000-year cascade applies to abandoned swarms. Ours has station-keeping.

### The Gaps: What We Missed

But station-keeping does not last forever. Propellant runs out. Thrusters degrade. Software becomes obsolete. Control systems fail. And this is where Lacki's analysis exposed two blind spots in our planning.

**Gap 1: Century-to-millennium-scale degradation.** Our existing analysis covers 10-25 year operational timescales. We model collision probability during deployment and early operation, and we plan for element end-of-life disposal. But we had no question asking: *What happens to the swarm over 100, 1,000, or 10,000 years as elements progressively lose station-keeping capability?*

This matters because the swarm represents a civilization-scale investment. If 1% of elements lose station-keeping per year, and those elements drift into collision-hazardous orbits within a decade, the debris flux from uncontrolled elements could overwhelm the collision avoidance systems of the remaining swarm. There is a threshold—some minimum fraction of elements that must remain under active control—below which cascade onset becomes inevitable. We do not know what that threshold is.

We have created [rq-2-30](/questions/megaswarm-collisional-cascade-timescales) to address this: modeling cascade timescales for our specific swarm parameters, determining the maintenance floor, and connecting swarm longevity to our governance requirements ([rq-0-29](/questions/multi-century-governance-structure)).

**Gap 2: Planetary gravitational perturbation over centuries.** Our station-keeping budget accounts for planetary perturbations, but only over operational element lifetimes. Lacki's finding that Jupiter alone destroys an uncontrolled 1 AU swarm in hundreds of thousands of years has a subtler implication: the ΔV required to counteract Jupiter's differential acceleration on swarm elements accumulates continuously. Over 100 years, this may consume 10-100 m/s—comparable to the *entire* station-keeping budget.

This means century-scale swarm operation may require either refueling infrastructure, propellant-free station-keeping (pure solar sailing), or deliberate avoidance of orbital resonance zones where perturbation effects are amplified.

We have created [rq-2-31](/questions/planetary-perturbation-century-scale-stability) to quantify this: century-scale N-body simulations, resonance mapping, ΔV budget refinement, and modeling how quickly failed elements drift into hazardous orbits.

## The Deeper Implication: Maintenance Is the Mission

Lacki's paper reframes how we think about a Dyson swarm. Building the swarm is not the hard part. *Keeping it alive is.*

A swarm is not a monument you erect and walk away from. It is a living system that requires continuous maintenance: replacing failed elements, removing debris, correcting orbits, updating software, refueling thrusters. The moment maintenance stops, the clock starts ticking toward cascade destruction.

This connects directly to our governance question ([rq-0-29](/questions/multi-century-governance-structure)). If the swarm requires active maintenance to survive, then the institution maintaining it must outlast the swarm's degradation timescale. A 41,000-year cascade timeline for an uncontrolled swarm means the maintenance organization needs to function for—at minimum—centuries, and ideally millennia. No human institution has ever operated continuously for that long.

The ring-based orbital architecture that Lacki identifies as more resilient also deserves evaluation against our phased-array power transmission requirements. If grouping elements into altitude-separated rings extends cascade timescales by orders of magnitude, that architectural choice may be worth the constraints it imposes on beam forming geometry.

## What We're Doing About It

The two new research questions will drive specific analyses:

1. **Cascade threshold modeling** (rq-2-30): Monte Carlo simulation of our swarm under progressive element failure. The key deliverable is the *maintenance floor*—the minimum repair rate that prevents cascade onset.

2. **Century-scale perturbation analysis** (rq-2-31): N-body simulation of swarm elements at candidate orbital distances (0.3-1.0 AU) over 100-1,000 year timescales. The key deliverable is a refined ΔV budget and a resonance hazard map.

We have also added Lacki's paper (arxiv:2504.21151) as a reference to our existing collision avoidance questions ([rq-1-6](/questions/swarm-collision-probability), [rq-2-3](/questions/billion-unit-collision-avoidance)) to ensure future work on those questions incorporates his cascade dynamics framework.

## The Silver Lining

Lacki's paper is a warning, not a death sentence. His 41,000-year figure applies to *uncontrolled* swarms with *randomized* velocities. Our swarm has:

- Active station-keeping on every element
- Autonomous collision avoidance with three redundancy layers
- Planned element replacement and debris removal
- A governance structure designed for multi-century operation

The question is not whether an uncontrolled swarm would eventually destroy itself—Lacki shows it clearly would. The question is whether our control systems, maintenance infrastructure, and institutional continuity are robust enough to prevent that outcome for as long as we need the swarm to function.

That is the question we now need to answer.
