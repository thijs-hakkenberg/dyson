---
questionId: "rq-1-8"
slug: "high-voltage-arcing-thin-substrates"
title: "High-voltage arcing prevention on ultra-thin substrates"
questionType: "experimentation"
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
  - "high-voltage"
  - "arcing"
  - "insulation"
  - "thin-film"
createdDate: "2026-02-01"
---

## Background

PV Blanket Arrays form the foundational energy collection infrastructure for Phase 1 of the Dyson swarm. These deployable thin-film photovoltaic structures operate at aggressive areal mass densities of 35-50 g/m², requiring ultra-thin substrates—typically polyimide films in the 12-25 μm range—to achieve target mass budgets. The consensus architecture specifies high-voltage DC bus operation, with the recommended baseline at 800V DC and tiered architectures potentially reaching 10 kV on main distribution buses.

This voltage-mass tradeoff creates a fundamental engineering tension: higher voltages reduce conductor mass (critical for meeting the 35-50 g/m² target) but dramatically increase arcing risk on substrates that cannot accommodate traditional insulation thicknesses. The solar wind plasma environment at operational distances (0.3-1.0 AU) provides a conductive medium that exacerbates Paschen breakdown and surface flashover phenomena, particularly at the intermediate pressures equivalent to space plasma densities.

## Why This Matters

Arcing events on PV blanket arrays represent a potential single-point failure mode that could cascade across electrically connected segments, directly contradicting the graceful degradation philosophy central to the design. A sustained arc can vaporize thin-film conductors in milliseconds, potentially propagating along bus lines and destroying far more capacity than the initiating fault.

The 800V DC baseline voltage sits in a particularly challenging regime—high enough to sustain arcs once initiated, but not so high that corona onset provides early warning. At the tiered architecture's 10 kV main bus level, traditional spacing rules would require centimeter-scale clearances incompatible with the mass budget.

This question gates multiple critical decisions:
- **Cell technology selection**: Perovskite cells on polyimide versus CdTe on metal foil have fundamentally different substrate conductivity and arc propagation characteristics
- **Bus voltage finalization**: Without validated arc mitigation, the project may be forced to lower voltages, increasing harness mass by 40-60% and potentially breaking the mass budget
- **Orbital location selection**: Inner solar system deployment (0.3 AU per Gemini's recommendation) exposes arrays to denser solar wind plasma, potentially requiring more conservative voltage derating

## Key Considerations

**Plasma Environment Variability**: Solar wind density varies from ~5 particles/cm³ at 1 AU to ~50 particles/cm³ at 0.3 AU during quiet conditions, with order-of-magnitude increases during coronal mass ejections. Arc initiation thresholds shift accordingly.

**Substrate Thickness Constraints**: At 35-50 g/m² areal density, substrate and encapsulation layers total approximately 20-40 μm. Traditional aerospace insulation (Kapton tape at 50+ μm per layer) would exceed the entire mass allocation.

**Operating Temperature Range**: The 250-340K thermal envelope affects both insulation dielectric strength and plasma sheath characteristics. Higher temperatures at 0.3 AU reduce insulation margins while increasing plasma density—a compounding risk.

**Segment Isolation Architecture**: The consensus specifies 10-50 m² electrically independent segments with segment-level MPPT. Arc detection and isolation must operate faster than propagation timescales (microseconds) to prevent cascade failures.

**Surface Contamination**: Outgassing from thin-film materials and micrometeoroid ejecta create conductive surface films that reduce flashover thresholds over operational lifetime.

## Research Directions

1. **Paschen Curve Characterization for Space Plasma**: Conduct vacuum chamber testing with calibrated plasma sources simulating solar wind conditions at 0.3, 0.7, and 1.0 AU equivalent densities. Map breakdown voltage versus electrode spacing for candidate substrate materials (polyimide, metal foil, ceramic-coated polymer) across the 100V-10kV range.

2. **Arc-Resistant Coating Development**: Evaluate atomic-layer-deposited (ALD) dielectric coatings (Al₂O₃, SiO₂, HfO₂) at 100-500 nm thicknesses for arc initiation suppression. Target coatings must add <2 g/m² while providing >2 kV/mm dielectric strength and surviving thermal cycling.

3. **Fast Arc Fault Detection and Isolation**: Develop detection algorithms using current derivative (di/dt) sensing capable of identifying arc signatures within 10 μs and commanding segment isolation within 100 μs. Validate detection reliability against false positives from normal MPPT transients.

4. **Conductor Geometry Optimization**: Model and test recessed conductor traces, guard ring configurations, and graded potential distributions that increase effective creepage distance without adding mass. Quantify mass penalty versus voltage capability tradeoff.

5. **Long-Duration Plasma Exposure Testing**: Subject instrumented test coupons to simulated 5-year equivalent plasma exposure (accelerated via increased flux) while monitoring insulation resistance degradation, surface charging accumulation, and arc threshold evolution.
