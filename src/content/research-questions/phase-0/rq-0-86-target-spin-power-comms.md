---
questionId: "rq-0-86"
slug: "target-spin-power-comms"
title: "How do the target's spin state and pole set site power storage and Earth visibility?"
questionType: "simulation"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-5"
sourceBOMItemSlug: "solar-power-arrays"
sourceBOMItemName: "Site Power, Arrays and Storage"
relatedBOMItems:
  - "bom-0-5"
  - "bom-0-9"
  - "bom-0-3"
relatedResearchQuestions:
  - "rq-0-50"
  - "rq-0-52"
tags:
  - "power"
  - "illumination"
  - "communications"
  - "target-selection"
createdDate: "2026-10-25"
---

## Background

The regenerated bom-0-5 and bom-0-9 consensus both make the target's spin state a target-gate criterion. They do not say what values pass: storage moves from about 1 to over 2.5 MWh with plant hold loads, and a fast rotator may need terminals 180° apart and slew rates of ≥5°/min.

## Why This Matters

Turns two open questions into thresholds the remote survey and scouts can check before a target is chosen.

## How this gets answered

- **Simulation**: Illumination and Earth-visibility time series for synthetic bodies over spin period, pole orientation and orbit (the rq-0-52 shortlist). Pad shadowing from shape models where they exist. Storage sized for cold shutdown and hold loads with one string out (GPT's method), and link availability for two terminal placements.

## Research Directions

1. Storage MWh and array oversizing against spin period and pole for each illumination class.
2. Earth-visibility fraction and conjunction outages for the shortlist.
3. Pass or fail thresholds for the target gate.
