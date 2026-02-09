---
slug: "failure-mode-distribution"
title: "How Will Ten Million Space Collectors Break Down? The Search for Failure Mode Data"
description: "Research into satellite failure patterns reveals mature optimization frameworks but critical data gaps for Dyson swarm maintenance fleet sizing."
author: "Project Dyson Team"
date: "2026-02-09"
category: "Research Resolutions"
tags:
  - "failure-modes"
  - "maintenance"
  - "fleet-sizing"
  - "research"
  - "Phase 2"
relatedPhases:
  - "phase-2"
---

# How Will Ten Million Space Collectors Break Down? The Search for Failure Mode Data

When you are designing a maintenance fleet for ten million satellite collectors scattered across heliocentric orbit, one question dominates all others: what will actually break, and how often?

This is not an academic curiosity. The answer determines whether Project Dyson needs 12,000 servicer drones or 40,000. It decides whether the swap-and-replace maintenance philosophy will handle 90% of failures or only 60%. It shapes billions of dollars in procurement decisions and years of development timelines. Without reliable failure mode distributions, the entire maintenance architecture rests on assumptions rather than evidence.

Our research team set out to find answers in the academic literature. What we discovered was both encouraging and sobering.

## The Frameworks Exist, But the Data Does Not

The good news: researchers have developed sophisticated theoretical frameworks for exactly this problem. The competing failure process model from Yousefi, Coit, and Zhu provides a rigorous mathematical approach to multi-component systems where parts can fail from gradual degradation or sudden shocks. Their work addresses precisely the scenario we face: solar collectors experiencing slow optical coating degradation alongside random micrometeorite impacts.

Song, Yousefi, and Coit extended this work to optimize failure detection thresholds. Their research shows that inspector drone fleet sizing depends not just on patrol coverage, but on how sensitive the detection criteria are. Set thresholds too low and you dispatch servicers for minor anomalies; set them too high and you miss failures that cascade into element loss.

The STARFAB project, documented by Wang, Post, and Deremetz, demonstrates that modular orbital servicing architectures actually work. Their ground demonstration of an automated orbital warehouse validates the two-tier fleet concept: lightweight inspection units for patrol and fault detection, heavier servicers for repairs. The engineering is feasible.

The sobering news: none of this research includes failure mode data for large-scale satellite swarms.

## Why Heritage Data Falls Short

You might expect that decades of space operations would provide the numbers we need. The International Space Station has accumulated extensive ORU (Orbital Replaceable Unit) replacement data. Commercial GEO satellites have comprehensive anomaly databases. Surely someone has catalogued what breaks and why?

The problem is scope and environment. ISS operates in low Earth orbit with regular crew intervention. GEO satellites sit in a benign radiation environment with occasional station-keeping. Neither prepares us for collectors at 0.6 AU experiencing solar flux nearly three times Earth-normal, or elements at 1.2 AU facing the different thermal challenges of greater distance from the Sun.

More fundamentally, the published literature does not contain the raw failure mode statistics from heritage programs. The STARFAB researchers acknowledge this gap. Kim, Sung, and Hwang, who developed an integrated on-orbit servicing strategy for satellite constellations, had to work with assumed failure rates rather than measured ones.

## What the Research Does Tell Us

Despite the data gaps, the literature provides several actionable insights.

**Fleet architecture is validated.** Multiple independent research teams have converged on the two-tier model: lightweight inspectors for continuous patrol and heavier servicers dispatched in response to findings. This is not coincidence. The economics of inspection versus intervention, combined with the physics of propellant budgets, drive toward this solution. The consensus in our project documents aligns with the academic consensus.

**Depot placement optimization is mature.** Shimane, Gollins, and Ho formulated the Orbital Facility Location Problem specifically for satellite constellation servicing. Their framework handles the unique constraints of orbital mechanics, including delta-v budgets and transfer times. Choi and Ho extended this to incorporate low-thrust propulsion and servicer route optimization. When we know the failure rates, we have the tools to optimize depot networks.

**Reinforcement learning offers a path to adaptive optimization.** Pliego Marugan, Pinar-Perez, and Garcia Marquez demonstrated that RL agents can learn optimal maintenance policies even when repairs are imperfect. This matters because ORU swaps may not always restore full functionality. If thermal stress damaged components beyond the replaced unit, the "repair" achieves only partial restoration. RL systems can learn these patterns from operational experience.

**Degradation and shock failures require different responses.** The literature consistently distinguishes between gradual performance decline (optical coatings, solar cell efficiency) and sudden damage events (impacts, thermal shock). The former enables condition-based maintenance with predictive dispatch. The latter requires rapid response capability and robust spares inventory. Fleet sizing must accommodate both.

## The Path Forward: Adaptive Planning Under Uncertainty

Given the data gaps, what should Project Dyson do?

The research literature points toward adaptive planning. Kalosi, Kapodistria, and Resing developed condition-based maintenance frameworks that work with incomplete information. Bismut and Straub created adaptive inspection planning methods that use Bayesian updating as data accumulates.

Applied to our problem, this suggests:

**Parametric fleet sizing models** that can be updated as failure data arrives. Rather than committing to 12,000 servicers based on assumptions, design a production system that can scale between 8,000 and 20,000 based on observed failure rates.

**Instrumented early deployments** with enhanced telemetry. The first collector cohorts should prioritize data collection over power generation. Every anomaly, every degradation curve, every failure event feeds the models.

**Modular drone platforms** designed for capability upgrades. If Class III failures (requiring in-situ repair beyond ORU swap) prove more common than expected, servicers need welding and brazing capability. Design for that upgrade even if initial deployment does not include it.

**Standardized failure taxonomy** established before first servicing operations. We proposed a four-class system: Class I (self-healing or inspector-diagnosable), Class II (ORU swap), Class III (in-situ repair), Class IV (element replacement). Consistent classification from day one enables meaningful statistical analysis.

## Confidence Assessment: Low, But Upgradeable

Our research status is "partial answer" with low confidence. That sounds discouraging, but it is honest.

We have validated frameworks. We have applicable optimization methods. We have architectural consensus. What we lack is the empirical foundation to parameterize the models.

Confidence upgrades to medium when Phase 1 collector prototypes complete ground qualification testing and environmental simulation provides degradation rate estimates. Confidence reaches high when we have operational failure data from the first deployed swarm elements.

The maintenance drone fleet cannot wait for perfect information. But it can be designed to adapt as information arrives. That is what the research literature teaches: plan for uncertainty, instrument for learning, and build flexibility into procurement.

Ten million collectors will eventually tell us how they break. Our job is to be ready to listen.

---

*This article summarizes research conducted for Project Dyson research question RQ-2-12. Key papers cited include work by Yousefi et al. on competing failure processes, Wang et al. on the STARFAB modular servicing project, Shimane et al. on orbital facility location, and Pliego Marugan et al. on reinforcement learning for maintenance optimization.*
