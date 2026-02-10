---
questionId: "rq-0-32"
slug: "crew-presence-propellant-tending"
title: "Crew presence frequency for propellant system tending"
questionType: "engineering-decision"
status: "open"
priority: "medium"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-3"
  - "bom-0-6"
parentQuestionId: "rq-0-14"
tags:
  - "crew"
  - "propellant"
  - "operations"
  - "maintenance"
  - "autonomy"
createdDate: "2026-02-10"
---

## Background

The consensus recommendation for the Material Processing Station specifies human-tended operations with quarterly crew visits. However, the addition of propellant production capability (resolved in rq-0-14) adds operational complexity that may require more frequent human presence. Electrolysis systems, cryogenic storage, and propellant transfer operations involve failure modes (leaks, valve failures, ice blockages) that may exceed the autonomous fault-recovery capabilities of the station's control systems.

## Why This Matters

Crew visit frequency directly affects:
- Transport vehicle scheduling and propellant consumption for crew transit
- Station life support provisioning requirements
- The boundary between autonomous and human-supervised operations
- Risk tolerance for propellant system anomalies between visits
- Overall program operating costs ($50-200M per crew rotation mission)

If propellant systems require monthly rather than quarterly tending, crew transport costs could double or triple, potentially eroding the economic benefit of in-situ propellant production.

## Key Considerations

- Electrolysis cell maintenance intervals (membrane replacement, electrode cleaning)
- Cryogenic valve and seal inspection requirements
- Propellant transfer operations during vehicle docking
- Autonomous fault detection and recovery capability limits
- Teleoperation potential for routine maintenance tasks
- Comparison with ISS experience for analogous fluid systems

## Research Directions

1. **Failure mode analysis**: Catalog propellant system failure modes and classify by autonomous recoverability vs. crew intervention required.

2. **Maintenance interval estimation**: Based on terrestrial and ISS analogs, estimate time between required human maintenance actions for each propellant subsystem.

3. **Teleoperation feasibility study**: Assess which maintenance tasks could be performed via teleoperated robotics, reducing crew visit frequency.

4. **Crew visit optimization**: Model combined maintenance schedules for metal refining and propellant production to maximize work accomplished per visit.

5. **Autonomous system design requirements**: Define the minimum autonomous capability needed to maintain quarterly visit schedule with propellant production active.
