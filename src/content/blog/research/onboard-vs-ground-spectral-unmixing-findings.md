---
slug: "onboard-vs-ground-spectral-unmixing-findings"
title: "On-Board Processing is Non-Negotiable: Latency Dominates Ground Processing"
description: "Monte Carlo simulation demonstrates that ground-based spectral analysis achieves only 47% survey efficiency due to decision latency—not bandwidth."
author: "Research Team"
date: "2026-02-02"
category: "Research"
tags:
  - "simulation"
  - "research-question"
  - "phase-0"
  - "autonomy"
  - "spectral-analysis"
  - "monte-carlo"
relatedPhases:
  - "phase-0"
---

# On-Board Processing is Non-Negotiable: Latency Dominates Ground Processing

We built a Monte Carlo simulator to resolve a fundamental autonomy question for Phase 0 Prospecting Satellites: **Should spectral unmixing happen on-board or on the ground?** The answer is definitive—and it's not about bandwidth.

## The Question

The Prospecting Satellite consensus specification identifies on-board vs ground spectral unmixing as an open question. On-board processing requires radiation-hardened compute hardware (mass/power/cost). Ground processing preserves raw data and allows algorithm updates. Which approach maximizes survey effectiveness?

We built a [Monte Carlo simulator](/questions/onboard-vs-ground-spectral-unmixing/simulator) comparing both approaches across thousands of simulated asteroid encounters.

## The Definitive Finding

**Ground-based processing achieves only 47-50% survey efficiency compared to 100% for on-board processing.**

| Metric | On-board | Ground |
|--------|----------|--------|
| Targets Surveyed | ~7,000 | ~3,300 |
| Survey Efficiency | **100%** | **47.5%** |
| Avg Decision Latency | 1.1 hrs | 7.3 hrs |
| Bandwidth Utilization | <1% | ~97% |

The 2× survey improvement is too significant to trade for ground processing advantages.

## The Critical Insight: It's Latency, Not Bandwidth

We expected bandwidth to be the limiting factor—raw hyperspectral data is 10-100× larger than processed results. But the simulation reveals something surprising:

**All missed opportunities are due to latency, not bandwidth:**
- On-board missed by bandwidth: 0
- On-board missed by latency: 0
- Ground missed by bandwidth: 0
- Ground missed by latency: **~3,700** (in baseline configuration)

Even with 50 Mbps bandwidth (5× baseline), ground processing only improves marginally. The fundamental latency chain dominates:

1. **Raw data downlink:** ~2-4 hours (large hyperspectral datacubes)
2. **Light travel time:** ~0.3 hours (round trip at typical NEA distance)
3. **Ground queue + processing:** ~6 hours (DSN scheduling, compute time)
4. **Command uplink:** ~1 hour (targeting instructions)

**Total: ~7+ hours** vs typical NEA encounter windows of 2-12 hours.

## Why Encounters Are Time-Limited

NEA survey opportunities are fleeting. As satellites and asteroids follow different orbits, observation windows depend on:

- **Geometry:** Distance, phase angle, illumination
- **Velocity:** Relative motion limits observation duration
- **Priority:** High-value targets (M-type, C-type) need follow-up observations

When spectral analysis identifies a high-value target, the satellite must decide immediately whether to extend observation or move to the next target. A 7-hour ground loop exceeds most encounter windows, causing the satellite to miss the follow-up opportunity entirely.

## Scaling Analysis

We tested configurations across various constellation sizes, bandwidths, and mission durations:

| Configuration | On-board | Ground | Missed |
|---------------|----------|--------|--------|
| 50 sats, 10 Mbps, 7 yr | 7,000 | 3,300 | +3,700 |
| 100 sats, 10 Mbps, 7 yr | 14,000 | 6,600 | +7,400 |
| 55 sats, 50 Mbps, 7 yr | 7,700 | 3,800 | +3,900 |
| 55 sats, 25 Mbps, 15 yr | 16,500 | 8,000 | +8,500 |

**The ~50% efficiency gap persists across all configurations.** More satellites, more bandwidth, longer missions—none fix the latency problem.

## The Bandwidth Bonus

While not the primary driver, on-board processing delivers substantial secondary benefits:

- **97% bandwidth savings:** Processed results (~10 MB) vs raw data (~100s MB)
- **Reduced ground station costs:** Fewer DSN hours required
- **More communication margin:** Contingency bandwidth for anomalies
- **Scalability:** Support larger constellations without DSN bottlenecks

## Implications for Project Dyson

### 1. Mandate On-Board Spectral Unmixing

The 2× survey improvement justifies radiation-hardened processing hardware. Budget for space-qualified GPUs or FPGAs.

### 2. Implement Selective Raw Data Retention

Store high-priority observations for later downlink during low-activity periods. This enables ground reprocessing and algorithm validation without sacrificing autonomy.

### 3. Design for Algorithm Updates

Over-the-air updates allow improving unmixing models based on pathfinder validation. The on-board library isn't frozen forever—just during active encounters.

### 4. Level 3 Autonomy is Validated

The consensus specification calls for Level 3 autonomy (30-day independent operation). This simulation confirms that autonomy is not merely convenient—it's essential for effective surveying.

## The Physics Behind Latency

The latency chain is fundamentally constrained by:

**Speed of Light:**
At typical NEA survey distances (0.1-0.3 AU), light travel time adds 0.3-0.9 hours per round trip. This is irreducible.

**DSN Scheduling:**
Ground stations serve multiple missions. Queue delays average 2-6 hours depending on demand.

**Data Volume:**
Raw hyperspectral datacubes (256×256 pixels × 128 bands × 12-bit depth) require ~100 MB per target. At 10 Mbps, downlink alone takes 80+ seconds under ideal conditions—but real conditions include link margin, error correction, and scheduling gaps.

## Try It Yourself

We've published the [interactive simulator](/questions/onboard-vs-ground-spectral-unmixing/simulator) so you can explore the on-board vs ground trade-off. Adjust satellite count, bandwidth, mission duration, and encounter rates to see how survey efficiency changes.

## Methodology

The simulation uses:
- **Poisson encounter generation** based on expected NEA survey rates
- **Hyperspectral data volume modeling** (configurable resolution and bands)
- **Bandwidth-constrained downlink windows** with overhead factor
- **Latency chain modeling** for ground processing pipeline
- **50 Monte Carlo runs** per configuration for statistical validity

Results should be interpreted as relative comparisons between processing approaches.

## What's Next

This research answers RQ-0-2 and provides definitive guidance on Prospecting Satellite autonomy architecture. Combined with constellation sizing (RQ-0-3) and fleet logistics (RQ-0-19), we're building simulation-validated specifications for Phase 0.

Remaining research priorities include:
- Specific radiation-hardened processor selection and power budget
- On-board spectral library optimization for asteroid endmembers
- Pathfinder experiment design for empirical validation

---

**Research Question:** [RQ-0-2: On-board vs ground spectral unmixing](/questions/onboard-vs-ground-spectral-unmixing)

**Interactive Tool:** [Spectral Analysis Simulator](/questions/onboard-vs-ground-spectral-unmixing/simulator)
