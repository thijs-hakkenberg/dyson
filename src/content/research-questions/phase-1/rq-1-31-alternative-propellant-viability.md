---
questionId: "rq-1-31"
slug: "alternative-propellant-viability"
title: "Argon/krypton propellant viability for Hall thrusters"
questionType: "experimentation"
priority: "high"
status: "investigating"
sourcePhase: "phase-1"
sourceBOMItemId: "bom-1-6"
sourceBOMItemSlug: "orbital-tugs"
sourceBOMItemName: "Orbital Tugs"
relatedBOMItems:
  - "bom-1-6"
  - "bom-0-4"
  - "bom-1-1"
tags:
  - "propellant"
  - "argon"
  - "krypton"
  - "Hall-thruster"
  - "iodine"
externalReferences:
  - "SETS-2025-xenon-krypton-argon-hall-thruster"
  - "TechMech-2025-st40m-hall-thruster"
  - "ActaAstro-2023-low-power-hall-thruster-propellants"
  - "ActaAstro-2023-alternative-propellants-review"
  - "VacuumTech-2018-argon-hall-thruster-enhancement"
resolutionStatus: "partially-resolved"
resolutionDate: "2026-02-13"
resolutionSource: "industry-data"
resolutionSummary: "SpaceX Starlink V2 Mini satellites operationally deploy argon-fueled Hall thrusters at constellation scale, achieving 2.4x thrust and 1.5x Isp over previous krypton thrusters. Argon costs $7-15/kg vs xenon at $5,000-12,000/kg. Krypton-primary/argon-fallback strategy validated for Project Dyson orbital tugs."
implications:
  - "Argon viability at scale confirmed by SpaceX operational deployment — eliminates xenon supply chain risk"
  - "Krypton-primary/argon-fallback strategy recommended for Phase 1 orbital tugs"
  - "Iodine identified as additional alternative with near-xenon performance at lower cost"
  - "Purpose-built argon-optimized thrusters achieve significantly better performance than xenon-adapted designs"
createdDate: "2026-02-01"
---

## Background

Orbital Tugs represent critical logistics infrastructure for Phase 1 Initial Swarm Deployment, responsible for transporting 2,000–8,000 kg payloads between staging depots and assembly locations. The consensus specification establishes Hall-Effect Thrusters (HET) operating at 1,600–2,800 seconds specific impulse as the primary propulsion system, with xenon as the baseline propellant. However, all three engineering models flagged propellant selection as a significant open question, with Gemini explicitly recommending "securing xenon futures contracts with urgent transition to argon/krypton." This experimentation priority emerges from the fundamental tension between xenon's proven flight heritage and its constrained global supply chain versus alternative propellants that offer better scalability but uncertain performance at required operating points.

## Why This Matters

Xenon scarcity poses an existential risk to fleet-scale operations. Global xenon production is approximately 40–50 metric tons annually, primarily as a byproduct of air separation for steel manufacturing. A fleet of 800 tugs (per Claude's production estimate) with 200–400 kg propellant capacity each could require 160–320 metric tons for initial fueling alone—representing 4–8 years of current global production before accounting for refueling cycles or competing demand from semiconductor manufacturing and medical imaging.

The cost implications are equally severe. Xenon prices have historically ranged from $1,000–$3,000/kg with significant volatility. Argon costs approximately $2–5/kg, and krypton $300–500/kg. For a program targeting unit costs between $1.15M (Gemini) and $120M (GPT), propellant economics at scale could shift from negligible to dominant cost drivers depending on propellant selection.

The consensus recommendation to "baseline xenon for Phase 1 reliability but require thruster qualification for krypton operation as a fallback" directly depends on experimental validation that alternative propellants can achieve the required >2,000 seconds Isp threshold while maintaining thruster lifetimes of 20,000–50,000 hours.

## Key Considerations

**Performance Parameters**: The consensus specifies 10–12.5 kW individual thrusters producing 0.5–1.2 N thrust. Argon and krypton have lower atomic masses than xenon (40, 84, and 131 amu respectively), which fundamentally affects ionization efficiency and thrust-to-power ratios. Heavier propellants generally produce higher thrust at lower Isp; lighter propellants offer higher Isp but reduced thrust density.

**Thruster Lifetime Impacts**: Channel erosion rates in Hall thrusters correlate with ion energy and mass. Lighter propellants may accelerate erosion of boron nitride discharge channels, potentially reducing the 25,000+ hour lifetime target. Magnetic field topology optimization for alternative propellants requires dedicated development.

**System-Level Changes**: Argon and krypton have different storage densities and vapor pressures than xenon. Tank sizing, feed system components, and thermal management may require modification. The consensus 180–210 m² solar array sizing assumes xenon-optimized thrust levels; reduced thrust-to-power with lighter propellants could extend transfer times or require larger arrays.

**Operating Environment Compatibility**: Gemini's 0.3 AU Mercury-adjacent operations experience 10× solar flux, affecting propellant storage temperatures. Krypton and argon have different boiling points and storage requirements that must be validated across the 0.3–1.5 AU operating envelope.

**Supply Chain Readiness**: Krypton production is roughly 10× xenon volumes; argon is essentially unlimited as 0.93% of Earth's atmosphere. However, space-qualified propellant purity standards and delivery infrastructure must be established.

## Research Directions

1. **Conduct parametric thruster testing** at the 10–12.5 kW power class using xenon, krypton, and argon propellants on identical thruster hardware. Measure specific impulse, thrust, efficiency, and beam divergence across the operating envelope to establish performance mapping against the 1,600–2,800 second Isp requirement.

2. **Perform accelerated lifetime testing** using krypton and argon propellants to characterize channel erosion rates. Establish erosion models predicting whether 25,000-hour lifetime targets are achievable with magnetic field or channel geometry modifications.

3. **Develop mixed-propellant operational profiles** evaluating krypton for high-thrust maneuvers and argon for cruise phases. Quantify mission timeline impacts for representative 2,000 kg and 8,000 kg payload transfers between cislunar staging and heliocentric assembly yards.

4. **Analyze feed system compatibility** for argon and krypton, including flow controller sizing, tank mass penalties, and thermal management requirements across the 0.3–1.5 AU operating range. Identify required modifications to xenon-baseline designs.

5. **Conduct supply chain risk assessment** modeling propellant demand curves for 800-unit fleet operations over 15-year design lifetime, comparing xenon procurement constraints against krypton and argon availability and establishing price sensitivity thresholds for propellant switching decisions.
