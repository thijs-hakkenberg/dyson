---
questionId: "rq-0-31"
slug: "propellant-demand-modeling-precision"
title: "Propellant demand modeling precision for Phase 0-1 operations"
questionType: "engineering-decision"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-3"
  - "bom-0-4"
  - "bom-0-6"
parentQuestionId: "rq-0-14"
tags:
  - "propellant"
  - "demand-modeling"
  - "logistics"
  - "mission-planning"
createdDate: "2026-02-10"
---

## Background

The rq-0-14 resolution established propellant production as a core Phase 0 capability, but the current propellant demand range of 100-250 tonnes per year is too wide for infrastructure sizing. This 2.5x uncertainty propagates into electrolysis system sizing, storage tank capacity, power budget allocation, and crew visit frequency. Without a precise demand model tied to specific mission profiles, the station risks either under-building (creating a propellant bottleneck) or over-building (wasting mass and power budget on excess capacity).

## Why This Matters

The propellant production system's design point directly determines:
- Electrolysis power allocation (500-750 kW vs. 1+ MW)
- Storage tank sizing and associated thermal management
- Solar array capacity requirements (the 2.5 vs. 3.25 MW decision)
- Number of asteroid retrieval missions supportable per year
- Transport vehicle fleet utilization rates

A 100 t/yr system and a 250 t/yr system are fundamentally different pieces of hardware. The wrong choice could either strand the program with insufficient propellant or consume budget on unused capacity.

## Key Considerations

- Asteroid retrieval missions consume the largest propellant budget (trajectory-dependent)
- Transport vehicle stationkeeping and orbital transfers add continuous baseline demand
- Emergency reserves must account for abort scenarios and contingency operations
- Demand grows as Phase 1 operations begin and mission tempo increases
- Propellant type (LH2/LOX vs. storable) affects consumption rates per mission

## Research Directions

1. **Mission-by-mission propellant budget**: Model specific Phase 0-1 missions (asteroid retrieval, material transport, stationkeeping) with detailed delta-V and propellant mass calculations.

2. **Fleet utilization modeling**: Simulate transport vehicle fleet operations over 5-year periods to establish steady-state propellant consumption under various operational tempos.

3. **Sensitivity analysis**: Identify which mission parameters (number of retrievals/year, target asteroid distance, transport payload mass) have the largest impact on total demand.

4. **Growth trajectory modeling**: Project demand evolution from Phase 0 commissioning through Phase 1 ramp-up to establish capacity expansion milestones.

5. **Contingency reserve methodology**: Define appropriate propellant reserve margins for deep-space operations where resupply from Earth takes months.
