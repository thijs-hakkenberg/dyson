---
questionId: "rq-0-34"
slug: "storable-propellant-alternatives"
title: "Storable propellant alternatives from asteroid organics"
questionType: "engineering-decision"
status: "open"
priority: "medium"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-6"
sourceBOMItemSlug: "ispp-systems"
sourceBOMItemName: "In-Situ Propellant Production Systems"
relatedBOMItems:
  - "bom-0-6"
  - "bom-0-3"
  - "bom-0-4"
parentQuestionId: "rq-0-14"
tags:
  - "propellant"
  - "storable"
  - "organics"
  - "asteroid-chemistry"
createdDate: "2026-02-10"
---

## Background

The rq-0-14 resolution identified storable propellants from asteroid organics as a fallback pathway if cryogenic LH2/LOX storage proves too challenging at L4/L5. Carbonaceous chondrite asteroids contain 1-5% organic compounds including hydrocarbons, amino acids, and nitrogen-bearing molecules. These could potentially serve as feedstock for storable propellants such as hydrazine derivatives, ammonium dinitramide (ADN), or simple hydrocarbon fuels that avoid the cryogenic storage problem entirely.

## Why This Matters

If cryogenic boiloff management (rq-0-30) proves impractical or prohibitively power-intensive, storable propellants become the critical fallback. The performance penalty (lower Isp) would need to be weighed against:
- Elimination of active cryogenic cooling power requirements
- Indefinite storage without boiloff losses
- Simpler propellant transfer operations
- Compatibility with different thruster types

This decision affects transport vehicle engine selection, mission delta-V budgets, and the entire propellant logistics architecture.

## Key Considerations

- Asteroid organic content varies significantly by type and individual body
- Synthesis pathways from raw organics to usable propellants are complex
- Storable propellants typically offer 250-320s Isp vs. 450s for LH2/LOX
- Toxicity of traditional storables (hydrazine, NTO) complicates handling
- Green storable alternatives (ADN, HAN) have less flight heritage
- Chemical processing complexity may exceed water electrolysis

## Research Directions

1. **Asteroid organic inventory**: Characterize the organic compounds available in carbonaceous chondrite feedstock and identify which propellant synthesis pathways are thermodynamically favorable.

2. **Synthesis complexity assessment**: Compare the processing chain complexity for storable propellant production against water electrolysis + cryogenic storage, including mass, power, and crew requirements.

3. **Performance impact modeling**: Calculate mission delta-V penalties for switching from LH2/LOX to storable propellants across Phase 0-1 mission profiles.

4. **Green storable propellant feasibility**: Evaluate whether ADN or HAN-based propellants can be synthesized from asteroid-derived feedstock.

5. **Hybrid propellant architecture**: Assess a dual-propellant strategy using storable propellants for stationkeeping/low-delta-V operations and reserving cryogenics for high-performance asteroid retrieval missions.
