---
questionId: "rq-0-47"
slug: "sunshield-deployment-architecture"
title: "Sunshield deployment architecture for L4/L5 cryogenic storage"
questionType: "engineering-decision"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-3"
  - "bom-0-6"
parentQuestionId: "rq-0-30"
tags:
  - "sunshield"
  - "cryogenics"
  - "deployable-structures"
  - "thermal-management"
  - "L4-L5"
externalReferences:
  - "AIAA-2008-7644"
  - "US20100187365A1"
  - "AIAA-2009-6756"
  - "NASA/TM-2012-010675"
createdDate: "2026-02-13"
---

## Background

The ULA cryogenic depot papers (Kutter & Zegler, AIAA 2008-7644) and patent (US20100187365A1) establish that a deployable conical sunshield is the single most critical component for cryogenic storage at Lagrange points. At L4/L5, the thermal environment is dramatically simplified compared to LEO or lunar orbit — the sun is the only significant radiation source, eliminating Earth IR and albedo complications documented in NASA's CPD thermal analysis (NASA/TM-2012-010675). The ULA design uses a truncated cone with slow axial spin for centrifugal liquid settling, with the docking port directed at the sun. However, this design has never been modeled or tested at the scale required for the Material Processing Station's 50-100+ tonne propellant storage.

## Why This Matters

The sunshield determines whether passive thermal control can reduce heat ingress to levels manageable by reasonably-sized cryocoolers. Without an effective sunshield, cryocooler power requirements could consume 15%+ of the station's power budget. The sunshield architecture also constrains tank arrangement, vehicle docking approach, and station attitude control — making it a foundational design decision.

## Key Considerations

- ULA truncated cone design optimized for single radiation source (Lagrange point)
- JWST heritage demonstrates large deployable sunshield technology at L2
- Station scale (50-100m class) far exceeds any deployed sunshield to date (JWST: ~21m × 14m)
- Slow axial spin (Kutter concept) provides centrifugal settling but constrains station operations
- Integration with MLI and broad area cooling systems
- Micrometeoroid/debris protection for deployed membrane
- Deployment reliability for single-point-of-failure component

## Research Directions

1. **Scale analysis**: Model sunshield effectiveness at 50-100m scale for L4/L5 thermal environment, determining minimum size and layer count for <1% solar flux transmission.

2. **Deployment mechanism**: Evaluate rigid vs. inflatable vs. membrane sunshield architectures at station scale, with failure mode analysis for deployment.

3. **Integration with station operations**: Assess how sunshield geometry constrains tank layout, vehicle approach corridors, and attitude control requirements.

4. **Spin stabilization trade**: Quantify the benefits of slow axial spin (centrifugal settling, uniform thermal loading) vs. operational constraints (docking, communications pointing).

5. **Long-duration survivability**: Model sunshield degradation from UV, micrometeoroid impacts, and thermal cycling over 20-30 year station lifetime.
