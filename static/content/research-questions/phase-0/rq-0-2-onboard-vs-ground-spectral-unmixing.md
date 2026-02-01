---
questionId: "rq-0-2"
slug: "onboard-vs-ground-spectral-unmixing"
title: "On-board vs ground spectral unmixing effectiveness"
questionType: "simulation"
priority: "medium"
status: "open"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-1"
sourceBOMItemSlug: "prospecting-satellites"
sourceBOMItemName: "Prospecting Satellites"
relatedBOMItems:
  - "bom-0-1"
tags:
  - "data-processing"
  - "autonomy"
  - "spectral-analysis"
createdDate: "2026-01-31"
---

## Background

Prospecting Satellites are the 50-unit constellation designed to survey near-Earth asteroids (NEAs) for resource characterization, enabling informed target selection for subsequent mining operations. Each satellite (80-120 kg) carries visible/NIR spectrometers covering 0.4-2.5 μm wavelengths to determine asteroid surface composition—identifying water ice, metal oxides, silicates, and carbonaceous materials critical to Dyson swarm construction feedstock planning.

Spectral unmixing is the computational process of decomposing mixed spectral signatures into constituent mineral endmembers and their relative abundances. Asteroid surfaces present complex spectral mixtures due to regolith heterogeneity, space weathering effects, and sub-pixel compositional variation. The consensus document identifies this question explicitly: determining whether unmixing algorithms should execute on-board during the 30-day autonomous operation windows or defer processing to ground stations with superior computational resources.

## Why This Matters

This decision directly impacts three critical project parameters:

**Data Volume and Communication Budget**: Raw hyperspectral datacubes require substantially more downlink bandwidth than processed abundance maps. With X-band primary communication and the survey target of 20+ asteroids per satellite per year, communication windows become a limiting resource. On-board unmixing could reduce downlink requirements by 10-100x depending on compression schemes, but risks discarding scientifically valuable raw data.

**Autonomy Architecture**: The Level 3 autonomy specification enabling 30-day independent operation implies satellites must make targeting decisions without ground intervention. If unmixing occurs on-board, satellites can autonomously prioritize follow-up observations of high-value targets. Ground-based processing introduces latency that may exceed encounter windows for fast-moving NEAs.

**Algorithm Validation Risk**: The consensus document flags algorithm validation as an open question. On-board processing commits to specific unmixing models before comprehensive ground-truth validation. Errors in autonomous classification could cause the constellation to deprioritize valuable targets or waste observation time on misidentified asteroids.

**Cost Implications**: The $5M per-unit budget with limited contingency margin means on-board processing hardware (radiation-hardened GPUs or FPGAs) competes directly with spectrometer quality for mass and power allocation.

## Key Considerations

**Computational Requirements**: Linear spectral unmixing (least-squares methods) requires modest processing power achievable with space-qualified processors. Non-linear unmixing models accounting for intimate mineral mixtures demand significantly more computation—potentially exceeding what radiation-hardened hardware can deliver within power constraints of deployable solar arrays.

**Spectral Library Completeness**: Unmixing accuracy depends on comprehensive endmember libraries. Asteroid spectra exhibit variations from space weathering, phase angle effects, and temperature dependencies that may not be fully characterized pre-launch. Ground processing allows library updates; on-board libraries are frozen at deployment.

**Spectrometer Resolution Tradeoffs**: The consensus identifies spectrometer resolution vs. mass/power as an open question. Higher spectral resolution improves unmixing accuracy but increases data volume, strengthening the case for on-board processing. Lower resolution may permit raw data downlink but reduces unmixing fidelity regardless of processing location.

**Latency Tolerance**: NEA encounter geometries vary from hours to days. The 30-day autonomy window suggests some encounters will require real-time decision-making incompatible with ground-loop processing.

**Hybrid Architectures**: On-board screening algorithms could flag high-priority targets for immediate follow-up while queuing raw data for eventual downlink and ground reprocessing—balancing autonomy with data preservation.

## Research Directions

1. **Benchmark Simulation Study**: Using existing asteroid spectral databases (RELAB, PDS), simulate unmixing performance comparing linear (NNLS, FCLS) and non-linear (Hapke model inversion) algorithms. Quantify accuracy degradation when constraining computation to space-qualified processor specifications (e.g., RAD750, GR740) versus ground-based GPU clusters.

2. **Communication Link Budget Analysis**: Model downlink capacity across the 7-year mission for various orbital geometries. Determine the raw-to-processed data ratio threshold where on-board unmixing becomes necessary to meet survey rate targets of 20+ asteroids per satellite per year.

3. **Decision Latency Impact Assessment**: Simulate encounter scenarios with realistic NEA orbital parameters. Quantify how many high-value targets would be missed if unmixing decisions require ground-loop turnaround versus on-board processing.

4. **Hybrid Architecture Trade Study**: Design and evaluate a tiered processing approach: fast on-board classification for autonomy decisions, selective raw data retention for ground validation, and over-the-air algorithm updates. Assess mass, power, and storage implications against the 80-120 kg satellite budget.

5. **Pathfinder Validation Protocol**: Define specific experiments for the 5-satellite pathfinder phase to empirically compare on-board versus ground unmixing using identical spectral acquisitions, establishing ground-truth performance metrics before full constellation commitment.
