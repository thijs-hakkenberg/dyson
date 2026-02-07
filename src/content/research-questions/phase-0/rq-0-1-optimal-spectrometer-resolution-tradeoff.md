---
questionId: "rq-0-1"
slug: "optimal-spectrometer-resolution-tradeoff"
title: "Optimal spectrometer resolution vs. mass/power tradeoff"
questionType: "engineering-decision"
priority: "high"
status: "open"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-1"
sourceBOMItemSlug: "prospecting-satellites"
sourceBOMItemName: "Prospecting Satellites"
relatedBOMItems:
  - "bom-0-1"
tags:
  - "spectrometry"
  - "instrumentation"
  - "asteroid-survey"
createdDate: "2026-01-31"
---

## Background

The Prospecting Satellites are a planned constellation of 50 spacecraft designed to conduct comprehensive surveys of near-Earth asteroids (NEAs) to identify optimal mining candidates for Dyson swarm construction materials. Each satellite is specified at 80-120 kg with a 7-year design life and must achieve a survey rate of 20+ asteroids per satellite per year. The consensus document identifies visible/NIR spectroscopy (0.4-2.5 μm) as essential for composition analysis, with this spectrometer development designated as the critical path item.

This question arises because spectrometer performance directly scales with mass, power consumption, and cost—all severely constrained on an 80-120 kg platform operating in deep space. Higher spectral resolution enables finer discrimination of mineral signatures (distinguishing olivine from pyroxene, identifying hydrated minerals, quantifying metal content), but demands larger optics, more sensitive detectors, increased thermal management, and greater onboard processing capability. The consensus document explicitly flags this tradeoff as an open question requiring resolution before finalizing the instrument specification.

## Why This Matters

The spectrometer is the primary science payload determining whether the constellation can fulfill its core mission: identifying asteroids with compositions suitable for Dyson swarm construction (high metal content, volatiles for propellant, silicates for structural materials). An under-specified instrument may fail to distinguish between economically viable and marginal targets, leading to wasted follow-up missions and delayed material acquisition. An over-specified instrument consumes mass and power budgets that could otherwise support propulsion, communications, or redundancy.

**Dependencies:**
- Propulsion system selection (electric vs. chemical) affects available power budget for instruments
- Thermal infrared capability decision (currently divergent among models) competes for the same mass/power envelope
- On-board spectral unmixing capability (another open question) determines required signal-to-noise ratio
- Per-unit cost target of ~$5M leaves limited margin; spectrometer cost assumptions already drive the $4.5M-$6M estimate range

**Risk implications:**
- Insufficient resolution: False positives in target selection, wasted delta-V on unsuitable asteroids
- Excessive resolution: Reduced fleet size due to cost overruns, compromised reliability from complexity
- The 15-20% contingency recommendation suggests the budget is already tight

## Key Considerations

**Spectral Resolution Requirements:**
- Mineral identification typically requires 10-20 nm resolution in the 0.4-1.0 μm range
- Distinguishing hydration features near 1.9 μm and 2.7 μm demands <50 nm resolution
- Metal abundance estimation benefits from continuum slope measurements rather than narrow features

**Mass/Power Constraints:**
- Total satellite mass: 80-120 kg (spectrometer typically 5-15% of spacecraft mass for survey missions)
- Deployable solar arrays suggest power budget of 100-200W; spectrometer allocation likely 10-30W continuous
- Cooling requirements for extended NIR sensitivity (beyond 2.0 μm) add 2-5 kg and 5-15W

**Performance Benchmarks:**
- OSIRIS-REx OVIRS: 20 nm resolution, 17.8 kg, ~8W (high-heritage but oversized for this application)
- Dawn VIR: 10 nm resolution, 14.5 kg, ~10W
- Commercial miniaturized spectrometers: 3-5 kg, 2-5W, but typically 50-100 nm resolution

**Operational Factors:**
- Level 3 autonomy with 30-day independent operation requires robust on-board data reduction
- Survey rate of 20+ asteroids/year implies short observation windows; integration time affects SNR
- X-band downlink capacity constrains raw data volume; higher resolution generates more data

## Research Directions

1. **Conduct trade study with three reference designs**: Define low (50 nm), medium (20 nm), and high (10 nm) resolution configurations with complete mass, power, volume, and cost estimates. Use actual vendor quotes for detectors and gratings.

2. **Simulate mineral discrimination accuracy**: Using existing asteroid spectral libraries (RELAB, USGS), quantify classification accuracy for target minerals (Fe-Ni metal, olivine, pyroxene, phyllosilicates) at each resolution level. Determine the minimum resolution that achieves 90% classification confidence.

3. **Evaluate on-board processing requirements**: Assess whether spectral unmixing at each resolution level is feasible within a radiation-hardened processor typical of SmallSat missions, or if ground processing is required—affecting downlink bandwidth needs.

4. **Analyze pathfinder mission strategy**: Determine if the 5-unit pathfinder phase could deploy mixed-resolution instruments to empirically validate the tradeoff before committing the full constellation.

5. **Survey commercial-off-the-shelf options**: Identify existing miniaturized spectrometers with space heritage or qualification pathways that could reduce development cost and schedule risk while meeting minimum performance thresholds.
