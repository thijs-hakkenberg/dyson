---
questionId: "rq-0-38"
slug: "crew-compartment-com-propulsion"
title: "Modular crew compartment effect on vehicle center of mass and propulsion geometry"
questionType: "engineering-decision"
status: "open"
priority: "medium"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-4"
sourceBOMItemSlug: "transport-vehicles"
sourceBOMItemName: "Transport Vehicles"
relatedBOMItems:
  - "bom-0-4"
parentQuestionId: "rq-0-18"
tags:
  - "propulsion"
  - "center-of-mass"
  - "vehicle-design"
  - "crew-module"
  - "structural"
createdDate: "2026-02-10"
---

## Background

The modular crew compartment approach from rq-0-18 means transport vehicles must operate in two configurations: cargo-only and crew-equipped. Installing a crew kit (estimated 15,000-25,000 kg including shielding) on a vehicle designed primarily for 150,000-250,000 kg cargo payloads changes the mass distribution and center of mass (CoM) location. Since the vehicles use ion propulsion (Hall-effect thrusters) with thrust vectors that must pass through the CoM for stable operation, this configuration change has direct implications for propulsion system design.

## Why This Matters

CoM shift between configurations affects:
- Thrust vector alignment and gimbal range requirements
- Attitude control system sizing and propellant budget
- Structural load paths during thrust and docking operations
- Solar array orientation relative to thrust direction
- Docking port accessibility in both configurations

If the crew module location is not carefully designed, vehicles may require different thruster configurations or software modes for crew vs. cargo operations, adding complexity and potential failure modes.

## Key Considerations

- Crew module placement options: forward (near docking), aft (near propulsion), lateral
- Hall-effect thrusters have limited gimbal range (typically 5-10 degrees)
- Cargo mass varies mission-to-mission while crew kit mass is fixed
- Crew compartment requires specific orientation relative to thrust vector for habitability
- Structural hardpoints must accommodate both configurations without modification
- Vibration and acoustic environment differs between locations on the vehicle

## Research Directions

1. **CoM envelope analysis**: Calculate the CoM range across all cargo loading conditions with and without crew kit, establishing the required thrust vector adjustment range.

2. **Crew module placement optimization**: Evaluate forward, aft, and centerline crew module locations for minimal CoM disruption, structural efficiency, and crew safety.

3. **Propulsion system gimbal study**: Determine whether existing Hall-effect thruster gimbal capability accommodates both configurations or if dedicated attitude thrusters are needed.

4. **Structural interface design**: Define the mechanical and electrical interfaces for crew kit installation that maintain structural integrity without permanent modification.

5. **Dynamic simulation**: Model vehicle dynamics during thrust, docking, and attitude maneuvers in both configurations to verify stability and control authority.
