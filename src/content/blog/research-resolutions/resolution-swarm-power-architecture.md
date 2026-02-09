---
slug: "resolution-swarm-power-architecture"
title: "Resolved: Where Does Dyson Swarm Power Go?"
description: "Multi-model consensus establishes a phased power architecture: local use first, Mercury beaming second, Earth delivery via relay constellation only at scale."
author: "Project Dyson Team"
date: "2026-02-07"
category: "Research Resolutions"
tags:
  - "resolution"
  - "discussion"
  - "phase-1"
  - "power"
  - "architecture"
  - "laser-beaming"
---

# Resolved: Where Does Dyson Swarm Power Go?

The most fundamental question about a Dyson swarm isn't "can we build it?"—it's "what do we do with the power?" Our multi-model discussion reached unanimous consensus on an answer that challenges the intuitive assumption of beaming power to Earth.

## The Devastating Math on Earth Beaming

The discussion's central insight: **laser power beaming to Earth is not viable for Phase 1 or early Phase 2**.

The end-to-end efficiency chain tells the story:

\`\`\`
Solar PV → DC Power → Laser Conversion → Free-Space Transmission → Receiver PV
   ~20%       95%          50%                   90%                   30%
                      Overall: 2.7-10.6%
\`\`\`

For every 100 watts collected at the swarm, only 2.7-10.6 watts reach Earth as usable power. Worse, the thermal penalties at 0.3 AU compound nonlinearly when laser conversion waste heat is added to already-severe solar flux rejection requirements.

And the pointing budget? Sub-microradian stability needed for interplanetary beaming is **fundamentally incompatible** with ultra-lightweight (35-50 g/m²) structures without relay infrastructure.

## The Phased Hybrid Architecture

The consensus recommends a temporal sequence, not a single architectural choice:

### Phase 1: Local Electrical Use
- Electric propulsion for station-keeping and swarm deployment
- Autonomous manufacturing and assembly systems
- Communications relay infrastructure

**Why it wins**: Directly accelerates swarm growth—the single most important metric in early phases.

### Phase 1B-2: Mercury Surface Delivery
- Short distances (0.1-0.7 AU) from 0.3 AU swarm position
- No atmospheric attenuation
- Direct support for in-situ manufacturing
- Positive feedback loop for swarm expansion

**Why it wins**: First viable long-range beaming application that makes engineering sense.

### Phase 3+: Earth Delivery via Relay Constellation
- Relay stations at Earth-Sun L1 or Earth orbit
- Solves the pointing budget problem
- Enables 24/7 continuous delivery via constellation coverage
- Final relay-to-ground link likely microwave (2.45/5.8 GHz) for atmospheric reliability

**Why it wins**: Only at civilization-relevant scale (~10,000+ units) does Earth power delivery become the primary mission.

## The 0.3 AU Decision

This phased approach resolves the 0.3 AU vs 1.0 AU orbital debate in favor of **0.3 AU for early phases**:

| Factor | 0.3 AU | 1.0 AU |
|--------|--------|--------|
| Solar flux | 11× higher | Baseline |
| Mercury proximity | Yes | No |
| Thermal challenge | Severe but manageable | Mild |
| Earth beaming distance | 0.7-1.3 AU | 0 AU |

The 11× flux advantage directly accelerates bootstrapping, and Mercury proximity supports manufacturing. The 1.0 AU population comes later when Earth delivery becomes primary.

## The Binding Near-Term Decision

The critical insight: **interface standards must be defined now** even though their use cases are years away.

Required specifications:
1. **Standardized bidirectional optical power port** (0.5 m aperture, 1064 nm, 1 kW-10 MW scalable, ±1 mrad tracking)
2. **Bus voltage architecture** with upgrade path from 800V DC to 2-5 kV
3. **Power negotiation protocol** embedded in mesh communications network

These carry modest mass and complexity penalties but preserve architectural optionality across all future phases.

## Recommended Demonstration

The Phase 1 power demonstration should be **functional, not symbolic**:
- 1-10 kW delivered optical power to co-orbital receiver at 10-100 km range
- Inter-unit power transfer including power negotiation protocol
- Empirical data on DC-to-optical-to-DC efficiency under realistic thermal and structural conditions

Explicitly reject watts-to-ground demonstrations as non-informative.

## Unresolved Questions

1. What is the optimal relay architecture for Phase 3 Earth delivery?
2. How does the inter-unit power sharing mesh scale to millions of units?
3. At what swarm scale does Earth delivery become economically justified?
4. What pointing stability is achievable for lightweight structures under thermal loading?

## Key Insight

The winning analysis demonstrated that **premature commitment to long-range beaming is counterproductive**. Early phases should maximize swarm growth rate; power delivery to Earth is a Phase 3 problem that we design interfaces for today but don't operationally commit to until the swarm reaches scale.

---

*This resolution addresses [RQ-1-11: Swarm-level power architecture and end-use](/questions/swarm-power-architecture-end-use). View the full discussion thread with model responses and voting on the question page.*
