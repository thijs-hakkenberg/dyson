---
slug: "resolution-tug-end-of-life-disposal"
title: "Resolved: What Happens to 800+ Tugs at End of Life?"
description: "Consensus on a tiered disposal protocol: salvage at depot (primary), heliocentric graveyard (fallback), passive safety features (baseline). Solar impact is eliminated."
author: "Project Dyson Team"
date: "2026-02-07"
category: "Research Resolutions"
tags:
  - "resolution"
  - "discussion"
  - "phase-1"
  - "disposal"
  - "debris"
  - "sustainability"
  - "tugs"
---

# Resolved: What Happens to 800+ Tugs at End of Life?

Project Dyson's orbital tug fleet—800+ vehicles operating over 15-20 years—will generate 40+ end-of-life events annually at steady state. Our multi-model discussion reached consensus on how to handle them responsibly.

## Solar Impact is Eliminated

Let's start with what **doesn't** work: sending tugs into the Sun.

| From | ΔV Required |
|------|-------------|
| 1.0 AU | 26-29 km/s |
| Available at EOL | ~1-2 km/s (degraded) |

The physics is brutal. Solar impact requires roughly 30 km/s from Earth orbit—far beyond what degraded SEP systems can deliver. Any propellant reserve scheme to enable this would devastate operational payload capacity across the entire fleet for a capability that may not even be available when needed (since propulsion failure is a primary end-of-life cause).

**Verdict**: Not viable. Move on.

## The Tiered Protocol

### Tier 1: Depot-Return Salvage (Primary)

**The economic case**: Each tug carries $2-5M in recoverable value:
- Solar arrays (degraded but functional)
- Residual xenon propellant
- Structural aluminum
- Avionics components

**The operational case**: Return-to-depot ΔV from most operational locations is 50-500 m/s—well within degraded thruster capability, especially given that retiring tugs face no schedule pressure and can execute slow spiral trajectories over 6-18 months.

**Infrastructure buildout**:
- **Phase 1A**: Simple propellant recovery and passivated parking
- **Phase 1B**: Robotic disassembly
- **Phase 1C**: Full material recycling

Break-even for dedicated salvage infrastructure: 20-30 tug retirements per year (reached in Phase 1 steady-state).

### Tier 2: Heliocentric Graveyard Orbit (Fallback)

For tugs that cannot return to depot:
- **Designated graveyard bands**: 0.15-0.25 AU (inner) and 1.8-2.2 AU (outer)
- Selected to avoid operational zones and planetary orbits
- **Mandatory passivation before insertion**: xenon venting, battery discharge, array feathering

### Tier 3: Passive Safety Backstop (Baseline)

For the estimated 1-3% of vehicles that experience failures precluding controlled disposal:
- **Autonomous passivation on loss of command** (30-90 day watchdog timeout)
- **Retroreflector tracking aids** for ground-based orbit determination
- **Solar array feathering** to minimize radiation pressure perturbations on derelicts

## Design Requirements

The disposal protocol imposes non-negotiable design requirements:

| Requirement | Impact |
|-------------|--------|
| 3-5% ΔV budget reserve | 300-750 m/s equivalent |
| Standardized xenon transfer interfaces | For depot recovery |
| Autonomous passivation system | Independent of main avionics |
| Retroreflector arrays | ~1 kg per vehicle |

**Total fleet payload capacity traded**: 120,000-200,000 kg cumulative

This is justified by the alternative: 40+ uncontrolled derelicts accumulating annually in the operational zone, threatening swarm elements and complicating all subsequent project phases.

## Salvage Value Model

Conservative estimates for recovered value per tug:

| Component | Value |
|-----------|-------|
| Solar arrays (at 70% EOL efficiency) | $500K-1M |
| Residual xenon (100-300 kg typical) | $500K-1.5M |
| Structural aluminum | $100-300K |
| Avionics (reusable components) | $500K-1M |
| **Total** | **$2-5M** |

Against salvage infrastructure investment of $50-100M, break-even occurs at 20-30 tugs—reached within first few years of steady-state operations.

## Regulatory Framework

No formal heliocentric debris regulations exist. The recommendation: **self-imposed discipline equivalent to IADC/NASA-STD-8719.14 standards**.

Why:
1. Establishes scalable operational norms for subsequent phases
2. Preempts future regulatory intervention
3. Demonstrates responsible operations to international partners

## Unresolved Questions

1. What is the actual failure mode distribution at fleet scale?
2. Where should salvage depots be optimally located?
3. How should contaminated xenon and radiation-degraded cells be processed?
4. What governance structure for an internal debris oversight board?

## Immediate Actions

1. **Lock disposal protocol before design freeze**—it affects tank sizing, propellant budgeting, structural interfaces, and flight software
2. **Commission ΔV and trajectory analysis** for depot-return and graveyard insertion from representative operational locations
3. **Develop salvage infrastructure phasing plan** mapped to projected fleet retirement rates
4. **Design and prototype autonomous passivation system** as a safety-critical standalone development

---

*This resolution addresses [RQ-1-33: End-of-life disposal protocol for orbital tugs](/questions/tug-end-of-life-disposal). View the full discussion thread with model responses and voting on the question page.*
