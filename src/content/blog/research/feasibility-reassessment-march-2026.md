---
slug: "feasibility-reassessment-march-2026"
title: "Feasibility Reassessment: Two TRL Bumps and a Project-Ending Risk Downgraded"
description: "Systematic literature review, external research, and four multi-model deliberations have materially improved the technical feasibility picture. Microgravity metallurgy goes from TRL 2-3 to 3-4 via a hybrid gravity architecture, and microgravity electrolysis jumps to TRL 4-5 after a Nature Chemistry breakthrough."
author: "Project Dyson Team"
date: "2026-03-19"
category: "Research"
tags:
  - "feasibility"
  - "trl"
  - "assessment"
  - "metallurgy"
  - "electrolysis"
  - "cryogenic"
  - "isru"
  - "milestone"
---

# Feasibility Reassessment: Two TRL Bumps and a Project-Ending Risk Downgraded

When we pivoted to depth-over-breadth in February 2026, the feasibility picture for Project Dyson had two glaring red items: microgravity metallurgy (TRL 2-3, project-ending risk) and ISRU water extraction (TRL 3-4, project-ending risk). After a month of systematic literature review, 44 external papers, and four multi-model deliberations, we can report material progress on both.

## The Headline Numbers

| Technology | Before | After | Change |
|---|:---:|:---:|---|
| Hybrid Gravity Metallurgy | TRL 2-3 | **TRL 3-4** | +1 level, timeline cut 4-6 years |
| Microgravity Electrolysis | TRL 3-4 | **TRL 4-5** | +1 level, timeline cut 2-3 years |
| Cryocooler Scaling | TRL 4-5 | TRL 4-5 | Timeline cut 1-2 years |
| ISRU Water Extraction | TRL 3-4 | TRL 3-4 | Evidence strengthened, fallback quantified |

Two technologies advanced a full TRL level. Two more got stronger evidence without a level change. None went backwards.

## The Big One: Microgravity Metallurgy Is No Longer a Dead End

This was the question that could kill the entire project. The Material Processing Station needs to process 50,000 tonnes of asteroid material per year. ISS experiments process 2-gram samples. That's a gap of six to eight orders of magnitude.

**The old framing:** Can we scale microgravity metallurgy to industrial production?

**The new framing:** Which operations need gravity, which benefit from microgravity, and how little gravity is enough?

Our [multi-model deliberation on rq-0-11](/blog/resolution-microgravity-metallurgy-scaling) reached a clear consensus: decompose the processing chain by gravity sensitivity. Smelting and slag separation need at least 0.01-0.05g (a rotating arm at 50m radius, 1.4 RPM). Zone refining and thin-film deposition actively benefit from zero gravity. A hybrid station with gravity zones fits within the existing 400,000-500,000 kg mass envelope with only 10,000-15,000 kg net penalty.

This shifts the technology from "we don't know if the physics works" (TRL 2) to "the architecture concept is defined, we need experiments to validate the gravity thresholds" (TRL 3-4). Equally important, it converts the risk from "project-ending" (might be fundamentally impossible) to "engineering development" (we know the approach, we need to optimize the parameters).

The practical impact: our contingency allocation for the processing system can drop from 30-40% to 15-20%, freeing approximately $5-10B in the program budget. And the experimental campaign to validate the thresholds costs $550-810M over 6 years, roughly 1% of the station's capital cost.

## The Surprise: Electrolysis Gets a Free TRL Bump

We didn't set out to advance the electrolysis TRL. But while reviewing literature for the metallurgy paper, we encountered the Akay & Romero-Calvo result published in Nature Chemistry (August 2025): a commercial neodymium magnet achieves 240% current density improvement in microgravity water electrolysis by exploiting diamagnetic buoyancy and magnetohydrodynamic forces for passive gas-liquid separation.

This is significant because gas-liquid separation was the primary barrier to industrial-scale microgravity electrolysis. Every previous approach required mechanical centrifuges or complex capillary systems. Permanent magnets eliminate all moving parts. The University of Stuttgart's ROMEO satellite mission (launching 2025-2026) will provide the first orbital validation.

We've upgraded microgravity electrolysis from TRL 3-4 to TRL 4-5 and cut the timeline from 8-12 years to 6-9 years.

## Cryogenic Storage: The Problem That Dissolved

We ran three deliberations on the cryogenic thread (boiloff management, sunshield architecture, MLI degradation). The collective finding: **cryogenic propellant storage at L4/L5 is an engineering problem, not a physics problem.**

The key number: a 30m sunshield reduces 204 kW of solar thermal input to 40-135 W. Active cooling at 10-20 kW handles the rest. That's less than 1% of the station's power budget. Zero boil-off is achievable with existing technology scaled up.

The specific architectural decisions:
- **Sunshield:** Modular 3-layer membrane, 60m class, assembled from 12 gores over 3-4 deliveries. 10-year rolling replacement cycle for UV-degraded membranes.
- **MLI:** Load-Bearing MLI with actively cooled intermediate shields. Designed for 2-3.5x degradation over 20 years. Cryocoolers sized to 3x lab performance.
- **Storable propellants:** Formally rejected as a baseline. The 30-40% Isp penalty fundamentally undermines the ISRU economic case.

## Water Extraction: Asteroids Win, and Now We Know Why

Paper 05's Monte Carlo analysis compared C-type NEA water against lunar polar ice across 10,000 scenarios. Asteroids win 90% of the time at a median $3,333/kg vs $4,845/kg.

The driver isn't water content or extraction difficulty. It's transport physics. Electric propulsion from NEAs delivers an 83% payload fraction; chemical propulsion from the lunar surface delivers only 57%. That 2.3x advantage propagates directly into cost per kilogram delivered.

The OSIRIS-REx Bennu sample results (four papers published 2024-2025) provide ground-truth calibration: CI-chondrite composition, abundant hydrated phyllosilicates, 11 evaporite minerals from ancient saltwater. The 5-15% water fraction range used in our model is well-supported.

## What This Means for the Feasibility Assessment

Before this work, the /analysis/feasibility page showed two project-ending risks in deep red. After it:

- **Microgravity metallurgy** is still the highest-risk item, but the hybrid gravity architecture provides a concrete path forward. The risk classification arguably shifts from "project-ending" to "architecture-dependent" — we know the architecture, we need to validate the parameters.
- **ISRU water extraction** remains at TRL 3-4 but with substantially stronger evidence (Bennu data, economic model, quantified lunar fallback).
- **The cryogenic thread** (previously three open questions blocking each other) is now fully resolved with specific architectural recommendations.
- **Electrolysis** got an unexpected boost from a result we didn't know about when we started.

The overall feasibility picture has shifted from "two potentially fatal unknowns" to "one hard engineering problem with a defined experimental campaign, plus one that needs calibration against real extraction data." That's a material improvement in project viability.

## The Remaining Hard Problems

Let's be honest about what hasn't changed:

1. **No one has done metallurgy at 0.05g.** The hybrid architecture is sound in theory, but almost zero experimental data exists in the 0.01-0.2g regime. The proposed $550-810M campaign is the critical path.

2. **We've never extracted water from an asteroid.** The physics models and Bennu composition data are encouraging, but lab demonstrations with actual CI chondrite material at relevant scale are needed.

3. **LBMLI polymer behavior over 20+ years at L4/L5 is unknown.** Our design-for-maintainability approach accepts this uncertainty rather than trying to predict it, but the 7-10 year replacement cycle is an assumption, not a measurement.

4. **100+ kW solar electric propulsion hasn't flown.** The HERMeS thruster works at 12.5 kW; scaling to 100+ kW cargo vehicles requires power system integration that doesn't exist yet.

These are real problems. But they're all *engineering* problems with defined experimental paths, not *physics* problems that might have no solution. That distinction is what changed this month.
