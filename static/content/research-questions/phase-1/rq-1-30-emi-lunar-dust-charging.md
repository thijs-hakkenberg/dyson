---
questionId: "rq-1-30"
slug: "emi-lunar-dust-charging"
title: "EMI and lunar dust charging effects"
questionType: "experimentation"
priority: "medium"
status: "open"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-5"
sourceBOMItemSlug: "mass-drivers"
sourceBOMItemName: "Mass Drivers"
relatedBOMItems:
  - "bom-1-5"
tags:
  - "EMI"
  - "lunar-dust"
  - "charging"
  - "shielding"
createdDate: "2026-02-01"
---

## Background

Mass drivers for Project Dyson's Phase 1 deployment utilize linear synchronous motor (coilgun) architecture with pulsed power systems drawing 120 MW to 2.8 GW during launch pulses. These systems generate intense, rapidly changing magnetic fields across track lengths of 650 m to 3,400 m, with coil switching occurring at millisecond intervals to accelerate payloads at 100-1,000 g. The consensus document identifies electromagnetic interference (EMI) and dust charging effects as a critical but undefined concern, noting that "high pulsed magnetic fields may charge lunar dust and interfere with nearby electronics" while leaving site layout constraints and shielding requirements unresolved.

The lunar polar deployment environment—recommended as the primary location for the pilot system—presents unique challenges. Lunar regolith contains fine, electrostatically active dust particles that already exhibit complex charging behavior from solar UV exposure and plasma interactions. Superimposing high-energy pulsed magnetic fields onto this environment creates potential failure modes not encountered in terrestrial electromagnetic launcher testing.

## Why This Matters

Mass driver operations depend on precise autonomous control systems operating at multiple timescales: millisecond-level local coil switching, seconds-level thermal management, and hours-level mission planning. EMI from the pulsed power system could corrupt sensor readings, disrupt timing synchronization between track segments, or cause spurious triggering of safety interlocks. Given the modular maintenance philosophy requiring all components with <10 year life to be robotically replaceable without crewed intervention, autonomous systems must function reliably in the electromagnetic environment they themselves create.

Lunar dust charging presents compounding risks. Charged dust particles attracted to or repelled from mass driver components could:
- Contaminate optical sensors used for payload tracking and timing
- Accumulate on thermal radiators, degrading the cooling systems that maintain superconducting coils at 40 K operating temperature
- Infiltrate sealed coil cavities despite mitigation measures (electrostatic repulsion, berms/trenches, sacrificial bore liners)
- Create unpredictable electrical discharge paths during high-voltage switching events

The consensus document specifies dust mitigation as a "critical requirement across all proposals," but current strategies assume passive or steady-state charging conditions. Pulsed operation at 5-30 launches per hour introduces dynamic charging cycles that may overwhelm static mitigation approaches.

## Key Considerations

**Field Intensity and Frequency Spectrum**: Coilgun operation generates broadband EMI from DC through RF frequencies. The distributed capacitor/supercapacitor banks discharge in microsecond-scale pulses, producing harmonics that extend into frequency ranges used by communication and control systems. Peak magnetic field strengths at coil surfaces may exceed 10 T, with fringe fields extending tens of meters from the track.

**Dust Particle Dynamics**: Lunar dust particles (predominantly 20-100 μm) have high surface-area-to-mass ratios, making them highly responsive to electrostatic forces. Triboelectric charging from particle-particle and particle-surface interactions compounds photoelectric charging effects. Time-varying magnetic fields induce eddy currents in conductive dust particles, creating additional heating and force interactions.

**Shielding Mass Budget**: Effective EMI shielding typically requires conductive enclosures with mass proportional to protected volume. For a 300-500 m pilot system with distributed electronics, shielding mass could represent a significant fraction of imported Earth-sourced components unless in-situ aluminum production proves viable.

**Thermal Coupling**: EMI shielding and dust mitigation systems must not compromise the thermal management architecture. Superconducting coils operating at 40 K require unobstructed radiator view factors to deep space; metallic shielding enclosures could create thermal short circuits.

**Cadence Effects**: At the proposed 10-30 launches/hour nominal rate, the electromagnetic environment never fully relaxes between shots. Cumulative dust charging and residual field effects may differ substantially from single-shot behavior.

## Research Directions

1. **Pulsed-Field Dust Chamber Testing**: Construct a vacuum chamber with simulated lunar regolith and expose it to representative pulsed magnetic fields (1-10 T, millisecond duration, 10-minute repetition). Measure particle velocity distributions, charge accumulation rates, and surface adhesion changes over 100+ cycles.

2. **EMI Spectrum Characterization**: Model and measure the electromagnetic emission spectrum of a subscale coilgun section (2-10 m segment) operating with flight-representative capacitor discharge profiles. Identify frequency bands requiring shielding versus those manageable through filtering or protocol design.

3. **Integrated Shielding/Thermal Design Study**: Develop candidate architectures that combine EMI shielding with dust exclusion and thermal management. Evaluate mass, complexity, and in-situ manufacturability for each approach. Target <5% mass overhead relative to unshielded baseline.

4. **Autonomous System Hardening Assessment**: Catalog all sensors, processors, and communication links in the baseline mass driver control architecture. Determine susceptibility thresholds and identify components requiring radiation-hardened or EMI-tolerant alternatives.

5. **Site Layout Optimization**: Model fringe field propagation for candidate lunar polar sites and establish minimum separation distances between mass driver track and sensitive infrastructure (power conditioning, communication relays, robotic maintenance facilities).
