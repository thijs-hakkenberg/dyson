---
questionId: "rq-2-1"
slug: "multi-kilovolt-arc-management"
title: "Multi-kilovolt arc management in kilometer-scale membranes"
questionType: "experimentation"
priority: "critical"
status: "open"
sourcePhase: "phase-2"
sourceBOMItemId: "bom-2-1"
sourceBOMItemSlug: "collector-satellites"
sourceBOMItemName: "Collector Satellites"
relatedBOMItems:
  - "bom-2-1"
  - "bom-1-1"
  - "bom-1-2"
tags:
  - "high-voltage"
  - "arcing"
  - "membrane"
  - "testing"
createdDate: "2026-02-01"
---

## Background

Solar Collector Satellites for Phase 2 Swarm Expansion are designed as thin-film membrane structures with deployed areas ranging from 5,000 m² to 1,000,000 m² per unit. The consensus electrical architecture specifies high-voltage DC distribution at **1–5 kV** across these expansive surfaces, with **100–200 independent electrical zones** per satellite to enable graceful degradation. This combination of multi-kilovolt potentials and kilometer-scale conductive surfaces operating in the space plasma environment creates a critical engineering challenge: preventing and detecting electrical arcing that could cascade into catastrophic membrane failure.

The consensus document explicitly identifies high-voltage arc management as one of six open questions requiring resolution before finalizing electrical architecture. At operating orbits of 0.5–0.8 AU, the solar wind plasma density and UV flux create conditions significantly different from low Earth orbit, where most existing high-voltage space systems have been validated.

## Why This Matters

Arc events in multi-kilovolt membrane systems pose existential risk to individual satellites and potentially to swarm integrity. A single uncontrolled arc can:

- **Vaporize thin-film substrate material** (Kapton or polyimide variants at ~25 μm thickness), creating propagating tears across membrane sections
- **Generate conductive plasma plumes** that bridge adjacent electrical zones, defeating the segmentation strategy designed to limit damage
- **Produce electromagnetic interference** disrupting peer-to-peer mesh networking and swarm coordination algorithms
- **Trigger cascade failures** where debris from one arc event damages neighboring satellites maintaining 10–50 km separation

The consensus recommends **20% zone loss tolerance** with automatic bypass—but this assumes arc events remain localized. Without validated arc suppression and detection systems, a single manufacturing defect or micrometeoroid strike could propagate beyond design margins.

The manufacturing philosophy explicitly accepts "statistical defect rates over perfection" for billion-unit production. This means arc initiation sites will exist in deployed hardware. The question is not whether arcs will occur, but whether they can be contained.

## Key Considerations

**Voltage and Scale Interaction**: At 1–5 kV DC across surfaces spanning 5,000–1,000,000 m², conductor spacing and insulation requirements scale non-linearly. Paschen curve behavior in the 10⁻⁶ to 10⁻³ Torr pressure regime (typical for solar wind at 0.5 AU) creates minimum breakdown voltages that may fall within the operating range.

**Plasma Environment Variability**: Solar wind density at 0.5 AU averages ~15 particles/cm³ but can spike 10× during coronal mass ejections. Arc initiation thresholds will vary with ambient plasma conditions, requiring adaptive voltage management or conservative derating.

**Thermal Gradient Effects**: The consensus notes concern about thermal warping between sun-facing and dark sides. Temperature differentials also affect insulation dielectric strength and can create mechanical stress concentrations where arcs preferentially initiate.

**Detection Latency vs. Propagation Speed**: Electrical arcs propagate at 10–100 m/s in thin-film systems. With 100–200 zones per satellite and autonomous fault isolation required, detection-to-isolation latency must be under 100 ms to prevent multi-zone cascade.

**Material Selection Constraints**: Roll-to-roll manufacturing compatibility limits insulation material choices. Corona-resistant coatings that perform well in vacuum may not survive the 10–25 year design lifetime under intense UV flux at 0.5 AU.

## Research Directions

1. **Construct dedicated vacuum arc characterization facility** operating at 10⁻⁵ to 10⁻³ Torr with variable plasma density injection to simulate 0.3–1.0 AU solar wind conditions. Test candidate thin-film PV and substrate materials at 1–5 kV with accelerated UV exposure equivalent to 25-year mission doses.

2. **Develop and validate distributed arc detection architecture** using current signature analysis, optical emission spectroscopy, and acoustic emission sensors. Characterize detection latency across representative membrane geometries and establish minimum sensor density for 100 ms isolation response.

3. **Model arc propagation dynamics in segmented membrane topologies** using magnetohydrodynamic simulation validated against facility test data. Determine critical zone boundary designs (gap width, insulation thickness, plasma barrier geometry) that reliably arrest propagation.

4. **Investigate active arc suppression techniques** including rapid voltage collapse circuits, sacrificial fuse elements at zone boundaries, and localized gas injection systems. Quantify mass and complexity penalties against passive segmentation approaches.

5. **Characterize insulation degradation mechanisms** for candidate materials (Kapton HN, Upilex-S, PEEK films) under combined UV, atomic oxygen, and thermal cycling representative of 0.5 AU operations. Establish end-of-life dielectric strength margins and identify self-healing polymer candidates for extended missions.
