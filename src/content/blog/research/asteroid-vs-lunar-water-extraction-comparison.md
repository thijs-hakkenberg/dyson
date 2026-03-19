---
slug: "asteroid-vs-lunar-water-extraction-comparison"
title: "Asteroid vs. Lunar Water: Which Source Wins for Space Propellant?"
description: "Monte Carlo analysis of 10,000 scenarios shows C-type asteroids deliver water to L4/L5 at $3,333/kg vs $4,845/kg for lunar ice. Asteroids win 90% of the time, driven by electric propulsion's payload fraction advantage."
author: "Project Dyson Team"
date: "2026-03-19"
category: "Research"
tags:
  - "isru"
  - "water"
  - "asteroid-mining"
  - "lunar-ice"
  - "monte-carlo"
  - "propellant"
  - "economics"
  - "paper-05"
---

# Asteroid vs. Lunar Water: Which Source Wins for Space Propellant?

Any large-scale space infrastructure program needs water. Lots of it. Electrolyzed into hydrogen and oxygen, water becomes the highest-performance cryogenic propellant available. The question is where to get it: C-type near-Earth asteroids or lunar polar ice deposits?

We built a Monte Carlo cost model to answer this, and the results are clear but nuanced.

## The Bottom Line

Over 10,000 Monte Carlo trials sampling across all major uncertainties:

| Source | Median Cost/kg to L4/L5 | P10-P90 Range |
|--------|:-----------------------:|:-------------:|
| **C-type NEA** | **$3,333** | $2,567 - $4,251 |
| Lunar polar ice | $4,845 | $3,719 - $6,289 |

**Asteroids are cheaper 90.4% of the time.**

## Why Asteroids Win: The Transport Asymmetry

The single biggest factor isn't water content or extraction difficulty. It's how you move the water.

**From an asteroid to L4/L5:** Electric propulsion (Hall thrusters, Isp ~2,500s) delivers a payload fraction of **83%**. For every tonne of vehicle, you deliver 5 tonnes of water. But the trip takes 5+ years.

**From the Moon to L4/L5:** Chemical propulsion (Isp ~450s) for lunar ascent delivers a payload fraction of only **57%**. Nearly half the vehicle mass is propellant just to leave the Moon. But you arrive in days.

This 2.3x payload fraction advantage for electric propulsion from NEAs overwhelms the Moon's lower delta-v. The transport cost per kilogram is $649 from asteroids vs. $2,060 from the Moon.

## What About That 5-Year Trip?

The obvious objection: water locked in a slow-moving cargo vessel for 5 years is working capital you can't use. We model this as an opportunity cost, and it narrows the gap by about 30%. But even with the transit penalty, asteroids still win decisively.

## When Does the Moon Win?

Lunar sources become competitive only when:
- NEA delta-v exceeds ~6 km/s (applies to only ~15% of known C-types, avoidable through target selection)
- NEA water fraction falls below ~4% (inconsistent with OSIRIS-REx Bennu data showing 10%+ for CI chondrites)

Both conditions must apply simultaneously, which has <5% probability across our parameter draws.

## The Sensitivity Ranking

What matters most for asteroid water cost (Spearman rank correlation):

1. **Extraction yield** (rho = -0.61): Getting more water out of the regolith matters most
2. **Transport fleet capital** (rho = +0.51): Vehicle costs are the second biggest driver
3. **Availability** (rho = -0.37): Keeping the extraction system running
4. **Water fraction** (rho = -0.33): Higher water content helps but matters less than yield
5. **Delta-v** (rho = +0.28): Target selection within the C-type population

## Ground Truth from Bennu

The OSIRIS-REx Bennu sample (121.6g returned in 2023) provides the first ground-truth calibration for these models. Key findings:
- CI-chondrite-like composition with abundant hydrated phyllosilicates
- More volatile-rich than Ryugu (Hayabusa2)
- 11 evaporite minerals from ancient saltwater, suggesting concentrated volatile deposits
- Supports the 5-15% water fraction range used in our Monte Carlo

## What This Means for Project Dyson

The water source decision is clear: **design for C-type NEA extraction as the primary pathway, with lunar capability maintained as a hedge.** The 34% cost advantage and 90% probability of superiority justify the commitment, especially since the same Hall thruster technology needed for NEA transport is already being developed for the Gateway program (HERMeS/AEPS, TRL 8-9).

## Technical Details

The simulation code (`water_extraction_model.py` v2.0 and `water_extraction_mc.py` v2.0) is open-source in the Project Dyson repository. All 25 tests pass. The model derives transport costs from the Tsiolkovsky rocket equation and fleet economics rather than sampling them independently, addressing a methodological concern raised in peer review.

Full analysis: Paper 05, *ISRU Water Extraction for Space Propellant* (Version B, under review)
