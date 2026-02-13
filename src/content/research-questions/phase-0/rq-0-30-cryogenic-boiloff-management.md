---
questionId: "rq-0-30"
slug: "cryogenic-boiloff-management"
title: "Cryogenic boiloff management at L4/L5 thermal environment"
questionType: "engineering-decision"
status: "investigating"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-3"
  - "bom-0-6"
parentQuestionId: "rq-0-14"
tags:
  - "cryogenics"
  - "boiloff"
  - "propellant"
  - "thermal-management"
  - "L4-L5"
arxivReferences:
  - "2501.18451"
  - "2508.21802"
  - "1303.5112"
  - "1307.0890"
  - "1304.1959"
  - "1108.1332"
createdDate: "2026-02-10"
---

## Background

The resolution of rq-0-14 (propellant production scope) established that in-situ propellant production should be designed into the Material Processing Station from Day 1 and deployed at 18-24 months. However, the resolution explicitly identified cryogenic boiloff management as the highest-uncertainty technical element remaining. Liquid hydrogen and liquid oxygen storage at the L4/L5 Lagrange points presents a severe thermal challenge: full solar thermal loading at 1 AU with no planetary shadow for passive cooling.

At projected production rates of 70-130 tonnes of propellant per year, the station must store significant quantities of cryogenic fluids while maintaining acceptable boiloff rates. Active cooling systems compete for the station's limited 2.5-3.25 MW power budget, and excessive boiloff directly reduces the economic benefit of in-situ production.

## Why This Matters

Boiloff rates determine whether cryogenic propellant storage is economically viable at L4/L5. If boiloff exceeds production rates during storage periods, the station effectively cannot accumulate propellant reserves. This would force either:

1. Just-in-time propellant production synchronized with vehicle arrival schedules
2. Adoption of storable propellants instead of high-performance LH2/LOX
3. Massive investment in active cooling infrastructure

Each alternative has cascading effects on station power budget, vehicle design, and mission planning flexibility.

## Key Considerations

- Solar thermal loading at 1 AU is approximately 1,360 W/m^2 — storage tanks receive continuous heating
- Liquid hydrogen boils at 20.3 K; liquid oxygen at 90.2 K — very large temperature differentials to maintain
- Multi-layer insulation (MLI) alone may be insufficient for large-scale storage
- Active cooling (cryocoolers) at this scale consumes 100-500 kW depending on storage volume
- Zero-boiloff storage has been demonstrated at small scales but not at 50-100+ tonne capacity
- Propellant depot concepts from NASA and commercial studies provide baseline designs

## Research Directions

1. **Thermal modeling of large-scale cryogenic storage at L4/L5**: Model boiloff rates for 50, 100, and 200 tonne LH2/LOX tanks with MLI and sunshield configurations specific to L4/L5 thermal environment.

2. **Active cooling power trade study**: Quantify cryocooler power requirements for zero-boiloff storage at various tank sizes, comparing against the station's power budget allocation.

3. **Hybrid storage architecture**: Evaluate designs combining passive thermal control (sunshields, shadow-casting structures) with active cooling to minimize power draw.

4. **Subcooled storage concepts**: Assess whether subcooling propellants below boiling point during production provides sufficient thermal margin for storage periods between vehicle visits.

5. **Comparison with storable alternatives**: Quantify the performance penalty of switching to storable propellants if cryogenic storage proves impractical, informing the fallback decision point.
