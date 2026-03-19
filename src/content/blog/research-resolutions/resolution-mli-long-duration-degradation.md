---
slug: "resolution-mli-long-duration-degradation"
title: "Resolved: Will Our Thermal Insulation Survive 20+ Years in Space?"
description: "Consensus: MLI will degrade 2-3.5x over 20 years at L4/L5. Design for it with LBMLI, active intermediate shields, and planned replacement cycles rather than hoping it won't happen."
author: "Project Dyson Team"
date: "2026-03-19"
category: "Research Resolutions"
tags:
  - "resolution"
  - "discussion"
  - "phase-0"
  - "mli"
  - "insulation"
  - "degradation"
  - "thermal"
  - "cryogenic"
---

# Resolved: Will Our Thermal Insulation Survive 20+ Years in Space?

Multi-layer insulation (MLI) is the workhorse of spacecraft thermal control. But every flight dataset we have comes from LEO missions lasting at most a few years. The Material Processing Station needs thermal insulation that works for 20-30 years at L4/L5, an environment with no existing long-duration data.

Unanimous consensus in 1 round, with a clear design philosophy: **plan for degradation, don't hope against it.**

## The Environment: Different from LEO

L4/L5 is not simply "better" or "worse" than LEO for MLI:

**Advantages:** No atomic oxygen (the #1 destroyer of MLI in LEO), no thermal cycling from eclipses
**Disadvantages:** Continuous solar UV (~2x cumulative fluence vs comparable LEO), decades of micrometeoroid accumulation, long-term radiation damage to polymer substrates

## The Degradation Model: 2-3.5x Over 20 Years

The recommended three-regime model:
1. **Years 0-2:** Rapid initial degradation from installation imperfections (1.3-1.8x)
2. **Years 2-10:** Slow UV-driven outer-layer degradation (additional 1.2-1.5x)
3. **Years 10-30:** Uncertain long-term regime from cumulative micrometeoroid and radiation damage (additional 1.1-1.5x)

Net at 20 years: **2.0-3.5x** degradation from laboratory values.

## The Solution: LBMLI + Active Cooling + Maintainability

**Load-Bearing MLI (LBMLI)** is strongly preferred over traditional MLI. Traditional MLI is catastrophically sensitive to compression (1% area compression = 10-20x local heat flux increase). LBMLI provides structural consistency and supports active intermediate cooling shields.

The recommended architecture:
- LBMLI with 2-3 actively cooled intermediate shields
- Consolidated "service chimney" penetrations
- Embedded thermal monitoring throughout the stack
- **Planned outer-layer replacement every 7-10 years**
- Cryocoolers sized to 3x lab performance, power to 4x

## The Design Philosophy

The key insight: **don't try to predict exact degradation rates; build a system that tolerates uncertainty.** Size the active cooling for worst-case MLI performance, monitor continuously, and replace layers on a fixed schedule. This converts an unknowable degradation prediction problem into a manageable maintenance operation.

## Read More


- Related: [Cryogenic Boiloff Management](/blog/resolution-cryogenic-boiloff-management)
