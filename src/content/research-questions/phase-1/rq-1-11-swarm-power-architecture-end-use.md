---
questionId: "rq-1-11"
slug: "swarm-power-architecture-end-use"
title: "Swarm-level power architecture and end-use"
questionType: "discussion"
priority: "critical"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-2"
sourceBOMItemSlug: "pv-blanket-arrays"
sourceBOMItemName: "PV Blanket Arrays"
relatedBOMItems:
  - "bom-1-2"
  - "bom-1-1"
  - "bom-2-1"
tags:
  - "power-architecture"
  - "power-beaming"
  - "system-design"
createdDate: "2026-02-01"
---

## Background

PV Blanket Arrays form the fundamental energy-harvesting infrastructure of the Dyson swarm, with individual units generating between 400 kW (GPT's 1,200 m² design) and 2.1 GW (Gemini's 1 km diameter units at 0.3 AU). The consensus document identifies a critical architectural gap: while cell technology, deployment mechanisms, and electrical bus specifications have reached preliminary agreement, the fundamental question of *what happens to the generated power* remains undefined. This is not a secondary consideration—it determines voltage regulation schemes, duty cycles, pointing accuracy requirements, and the entire receiver infrastructure that must be developed in parallel with the swarm itself.

The three source models diverge significantly: Claude specifies integrated 1064 nm laser power beaming with 200 MW optical output per unit; Gemini assumes beaming to Mercury-based rectennas or relay satellites; GPT explicitly leaves power delivery as an open interface question. This divergence reflects genuine uncertainty about mission architecture rather than technical disagreement.

## Why This Matters

This question sits at the apex of the system design hierarchy—nearly every downstream specification depends on its resolution. The consequences cascade through multiple critical paths:

**Voltage Regulation and Power Electronics**: Local use (e.g., electric propulsion, in-situ manufacturing) tolerates voltage variation and intermittent loads. Power beaming demands tight regulation, continuous operation, and high-efficiency DC-to-optical conversion. The consensus 800V DC bus may be optimal for one application but suboptimal for another.

**Pointing and Attitude Control**: Laser power beaming to Earth or Mercury receivers requires sub-milliradian pointing accuracy sustained over hours. Local power use or inter-unit distribution has far looser requirements. This directly affects the mass budget for attitude control systems and the autonomy algorithms for station-keeping.

**Receiver Infrastructure Investment**: If power beaming is selected, receiver infrastructure (rectennas, optical collectors, thermal management) may dominate total system cost and development timeline. A 200 MW laser transmitter per 1 km² unit implies receiver arrays sized for terawatt-scale collection at full swarm deployment.

**Orbital Selection Feedback**: The 0.3 AU vs 1.0 AU orbital debate cannot be resolved without knowing the end-use. Inner solar system deployment offers 11× higher flux but creates severe thermal and communications challenges for power beaming to Earth. Local use for Mercury-based manufacturing favors the inner orbit; Earth power delivery may favor 1 AU operations.

## Key Considerations

**Conversion Efficiency Chain**: Laser power beaming involves multiple conversion steps—PV to DC (15-28% BOL), DC to laser optical (40-60% for fiber lasers), atmospheric transmission (variable), and optical to electrical at receiver (50-70% for tuned photovoltaics). End-to-end efficiency may be 3-12%, compared to near-unity for local electrical use.

**Thermal Dissipation**: At 0.3 AU with 11× solar flux, units operating at 15-28% efficiency must reject 70-85% of incident energy. Adding laser conversion losses (40-60% waste heat) compounds thermal management requirements beyond the passive radiative cooling baseline (250-340K operating range).

**Duty Cycle and Storage**: Power beaming to fixed ground stations implies intermittent transmission windows. Either energy storage (mass penalty) or continuous beaming to orbital relay infrastructure (additional system complexity) is required.

**Scalability of Receiver Infrastructure**: A single 1 km² unit at 200 MW optical output requires receiver infrastructure comparable to a large terrestrial power plant. Full swarm deployment implies receiver capacity scaling to petawatt levels—a construction program potentially larger than the swarm itself.

**Inter-Unit Distribution**: Mesh network topology (specified for communications) could extend to power sharing, enabling load balancing and redundancy. This requires standardized power interfaces and potentially different voltage architectures than point-to-point beaming.

## Research Directions

1. **End-to-End Efficiency Modeling**: Develop parametric models comparing total system efficiency for three architectures—laser beaming to Earth, laser beaming to Mercury/orbital relays, and local use for in-situ manufacturing. Include all conversion stages, thermal penalties, and pointing losses.

2. **Receiver Infrastructure Scaling Study**: Quantify the mass, cost, and timeline for receiver infrastructure at 1 GW, 100 GW, and 10 TW received power levels. Determine whether receiver development becomes the critical path for Earth power delivery scenarios.

3. **Hybrid Architecture Trade Study**: Evaluate mixed-use scenarios where early swarm units power in-situ manufacturing (bootstrapping larger production) while later units transition to power beaming. Define interface standards enabling this flexibility.

4. **Pointing Budget Analysis**: Derive pointing accuracy requirements for laser beaming at various distances (0.3 AU to Earth, 0.3 AU to Mercury, 1 AU to Earth) and compare against achievable performance with the mass-constrained attitude control systems implied by 35-50 g/m² areal density targets.

5. **Phase 1 Demonstration Scope Definition**: Recommend minimum viable power delivery demonstration for Phase 1 flights—whether symbolic (watts to ground receiver), functional (powering co-orbital systems), or scalable (prototype of full architecture).
