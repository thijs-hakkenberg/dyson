---
slug: "phase-3b-stellar-engine"
title: "Phase 3b: Stellar Engine - Moving the Solar System"
description: "Introducing Phase 3b, a parallel development track that transforms the Dyson swarm into a stellar propulsion system capable of moving the entire Solar System through the galaxy."
author: "Project Dyson Team"
date: "2026-02-07"
category: "Announcements"
tags:
  - "phase-3b"
  - "stellar-engine"
  - "shkadov"
  - "caplan"
  - "propulsion"
  - "megastructure"
relatedPhases:
  - "phase-3b"
---

# Phase 3b: Stellar Engine - Moving the Solar System

Today we're announcing **Phase 3b: Stellar Engine**, a parallel development track that runs alongside Phase 3a (Matrioshka Brain). While 3a transforms the Dyson swarm into computational substrate, 3b transforms it into a propulsion system—enabling controlled movement of the entire Sun and Solar System through the galaxy.

## Why Move the Sun?

A stellar engine could serve multiple critical purposes over cosmic timescales:

- **Avoiding cosmic hazards**: Supernovae, gamma-ray bursts, rogue stars
- **Adjusting stellar orbits**: Optimizing position within the galactic habitable zone
- **Maintaining habitability**: Compensating for long-term changes in solar output
- **Interstellar migration**: Eventually moving the Solar System to other star systems

## Two Complementary Approaches

Based on Caplan's 2019 paper "Stellar Engines: Design Considerations for Maximizing Acceleration," Phase 3b implements two complementary propulsion systems:

### Shkadov Mirror Array (Passive Thruster)

A distributed array of reflective statite elements forming a partial spherical cap on one side of the Sun. By reflecting solar photons asymmetrically, net thrust is generated through pure momentum transfer—**no fuel required**.

| Parameter | Specification |
|-----------|--------------|
| Acceleration | ~10⁻¹² to 10⁻¹³ m/s² |
| Fuel Required | None (passive) |
| Time to move 1 ly | ~1 billion years |
| Architecture | Distributed statite swarm |

Key consensus from our multi-model technical review:
- **Standoff distance**: 0.1 AU baseline (vs 1.0 AU alternative)
- **Reflectivity**: ≥95% minimum, ≥99.5% goal
- **Areal density**: ~1.0 g/m² target
- **Interception fraction**: Start at 1-5%, scale to 10-25%

### Thermonuclear Jet Engine (Active Thruster)

An array of fusion-powered engines using mass lifted from the Sun's surface. Helium-4 is separated from collected solar material and burned in D-³He fusion reactions, producing directed exhaust at ~0.01c.

| Parameter | Specification |
|-----------|--------------|
| Acceleration | ~10⁻⁹ m/s² (1000x Shkadov) |
| Thrust | ~10¹⁸ N total |
| Mass flow | ~10¹² kg/s |
| Time to move 1 ly | ~1 million years |

Key consensus:
- **Architecture**: ~10,000 modular engine units at ~10¹⁴ N each
- **Fusion reaction**: D-³He baseline with D-D fallback
- **Ignition**: Magnetized target fusion with heavy-ion beam assist
- **Magnetic nozzle**: 200-250 T throat field, 70-80% efficiency

## Phase 3b Bill of Materials

The complete Phase 3b BOM includes 8 major systems:

1. **Shkadov Mirror Array** - Passive radiation pressure thrust ($10-100T)
2. **Thermonuclear Jet Engine** - Fusion-powered directed thrust ($10-100T)
3. **Solar Wind Collectors** - Plasma collection infrastructure ($10-50T)
4. **Mass Lifting Systems** - Solar chromosphere extraction ($50-200T)
5. **Helium Separation Plant** - Isotope separation for fuel ($10-50T)
6. **Electromagnetic Accelerators** - Hydrogen return and helium jets ($10-50T)
7. **Dyson Integration Layer** - Power routing from swarm ($5-20T)
8. **Thrust Stabilization Systems** - Long-term trajectory control ($5-20T)

**Total estimated cost**: ~$110T (over 200-500 years)

## Parallel with Phase 3a

Phase 3b runs in parallel with Phase 3a (Matrioshka Brain). Both phases:
- Depend on Phase 2 (completed Dyson swarm) infrastructure
- Can proceed independently
- Share manufacturing and logistics systems
- Require coordination for geometric constraints

The timeline visualization at [/plan](/plan) now shows this fork with separate development tracks for 3a and 3b.

## Key Open Questions

Our multi-model consensus identified several critical unresolved issues:

### For Shkadov Mirror:
- Optimal standoff distance (0.1 AU vs 1.0 AU trade study needed)
- Long-term membrane degradation from solar wind sputtering
- Planetary insolation impact at high interception fractions
- Torque management over geological timescales

### For Thermonuclear Jet:
- ³He supply and isotopic economics
- Magnetic nozzle plasma detachment at scale
- Solar response to continuous mass extraction
- Array-level electromagnetic interference

## Next Steps

1. **Prototype campaigns** at multiple standoff distances (0.05-1.0 AU)
2. **Subscale fusion demonstrators** at 1-1000 kg pellet scale
3. **Coupled stellar-engineering models** for solar response prediction
4. **Interface control documents** for Shkadov/Caplan/Dyson swarm integration

## Explore the Specifications

Full technical specifications from Claude Opus 4.6, Gemini 3 Pro, and GPT-5.2 are available for each BOM item:

- [Shkadov Mirror Array](/plan/phase-3b/bom/shkadov-mirror-array)
- [Thermonuclear Jet Engine](/plan/phase-3b/bom/thermonuclear-jet-engine)
- [Solar Wind Collectors](/plan/phase-3b/bom/solar-wind-collectors)
- [Mass Lifting Systems](/plan/phase-3b/bom/mass-lifting-systems)
- [Helium Separation Plant](/plan/phase-3b/bom/helium-separation-plant)
- [Electromagnetic Accelerators](/plan/phase-3b/bom/em-accelerators)
- [Dyson Integration Layer](/plan/phase-3b/bom/dyson-integration-layer)
- [Thrust Stabilization Systems](/plan/phase-3b/bom/thrust-stabilization)

Each page includes individual model proposals, consensus documents, and divergent views where the models disagree.

---

*The addition of Phase 3b represents a major expansion of Project Dyson's scope—from energy harvesting to stellar-scale propulsion. Moving from "collect the Sun's energy" to "move the Sun itself" requires solving some of the most challenging engineering problems ever conceived, but the multi-model consensus approach gives us a structured path forward.*
