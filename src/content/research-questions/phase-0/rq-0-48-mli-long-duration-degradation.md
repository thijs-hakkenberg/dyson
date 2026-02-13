---
questionId: "rq-0-48"
slug: "mli-long-duration-degradation"
title: "MLI long-duration performance and degradation at L4/L5"
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
  - "mli"
  - "insulation"
  - "degradation"
  - "thermal-management"
  - "L4-L5"
externalReferences:
  - "NASA/TP-1999-209263"
  - "Johnson-MLI-Large-Tanks"
  - "Johnson-2014-LBMLI"
  - "Johnson-MLI-Penetrations"
createdDate: "2026-02-13"
---

## Background

Multi-layer insulation (MLI) is the primary passive thermal protection for cryogenic storage tanks, but real-world performance degrades significantly from laboratory values. Finckenor (NASA/TP-1999-209263) documents degradation from Hubble Space Telescope servicing missions, where astronauts had to apply MLI repair patches where the insulation had degraded in orbit. Johnson et al. show degradation factors of 1.6 to 4× for large tanks, with MLI contributing 70-90% of total heat input to cryogenic propellant tanks. The newer Load Bearing MLI (LBMLI) technology (Johnson 2014) offers 51% less heat leakage per layer and 38% less mass, while also providing structural support for broad area cooled shields. However, all degradation data comes from LEO missions — the L4/L5 environment (no atomic oxygen, different micrometeoroid flux, continuous solar UV) is fundamentally different and may be either better or worse for MLI longevity.

## Why This Matters

MLI performance directly determines the heat load that cryocoolers must overcome. A factor of 2-4× degradation from laboratory values could double or quadruple cryocooler power requirements. For a 20-30 year station life, understanding how MLI degrades — and whether it can be maintained or replaced — is essential to sizing the thermal management system correctly.

## Key Considerations

- Hubble MLI degradation documented (Finckenor 1999) but was in LEO (atomic oxygen, different thermal cycling)
- Large tank degradation factors 1.6-4× (Johnson): seams, penetrations, structural supports are major contributors
- LBMLI offers 51% heat leak reduction — is this sustainable over decades?
- L4/L5 environment lacks atomic oxygen (beneficial) but has continuous solar UV (detrimental)
- Micrometeoroid environment at L4/L5 differs from LEO — may be lower flux but higher velocity
- Penetrations for plumbing, instrumentation, and structural attachments are unavoidable

## Research Directions

1. **L4/L5-specific degradation model**: Develop a degradation model for MLI at Sun-Earth L4/L5, accounting for continuous solar UV, micrometeoroid flux, and absence of atomic oxygen.

2. **LBMLI long-duration performance**: Assess whether LBMLI's performance advantages persist over 10-30 year timescales, particularly the structural integrity of load-bearing spacers.

3. **Maintenance and repair strategies**: Evaluate whether MLI can be inspected and repaired robotically, and what replacement schedule might be needed.

4. **Penetration mitigation**: Design penetration and seam approaches that minimize thermal degradation based on Johnson experimental data.

5. **Conservative design margins**: Establish appropriate design safety factors for MLI thermal performance at station scale, accounting for all known degradation mechanisms.
