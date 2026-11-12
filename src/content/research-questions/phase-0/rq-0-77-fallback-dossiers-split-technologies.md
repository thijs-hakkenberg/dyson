---
questionId: "rq-0-77"
slug: "fallback-dossiers-split-technologies"
title: "Does each split technology have a credible, costed fallback that keeps 0B production viable?"
questionType: "analysis"
status: "open"
priority: "critical"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-7"
sourceBOMItemSlug: "organizational-infrastructure"
sourceBOMItemName: "Organizational Infrastructure"
relatedBOMItems:
  - "bom-0-7"
  - "bom-0-3"
  - "bom-0-4"
relatedResearchQuestions:
  - "rq-0-61"
  - "rq-0-62"
  - "rq-0-65"
  - "rq-0-66"
tags:
  - "gates"
  - "risk-classification"
  - "fallbacks"
  - "economics"
createdDate: "2026-10-20"
---

## Background

The panel split on whether eight technologies are project-ending or architecture-change (rq-0-65: T02, T10, T14, T15, T22, T24, T25, T26), and on the exceptions for T09, T12 and T20 at KDP-0B (rq-0-66). Claude and GPT agree on the test: a technology is project-ending unless an independently reviewed fallback shows a credible, costed, non-common-cause alternative that keeps viable 0B production. Gemini named fallbacks (smaller arrays, localised power, Earth-based packaging, DSN or commercial comms) that no one has costed. The disagreement is about facts nobody has produced.

Feeds decision-sheet items 2.1, 2.2 and 2.4, and the T11 re-entry item under rq-0-66.

## Why This Matters

The risk class decides whether a technology must reach TRL 6 with no waiver before KDP-0B. A wrong project-ending label makes the gate stricter than it needs to be. A wrong architecture-change label lets 0B commit on a technology with no real way out.

## How this gets answered

- **Analysis** — One fallback dossier per technology (T02, T09, T10 split into safety and productivity autonomy, T12, T14, T15, T20, T22, T24, T25, T26): the fallback, its own maturity, cost and schedule, common-cause dependencies, and the 0B output and cost per kg with it.
- **Simulation** — Run the production and cost effect of each fallback through the existing ISRU economics, supply-chain and reliability models (`src/lib/services/simulation/isru-economics`, `supply-chain`, `reliability-model.ts`), with uncertainty.
- **Literature** — Heritage for each named fallback (e.g. 100 kW-class arrays, storable-propellant tugs, single-craft navigation on Hayabusa2 and OSIRIS-REx, DSN capacity planning).

## Research Directions

1. A dossier template: fallback, maturity, cost, schedule, common-cause check, effect on 0B output and economics.
2. Fill it for each technology; mark where no fallback exists.
3. Apply the C+P test to each dossier; report the class it supports and how sensitive that is.
4. For T11: does Phase 1 inherit scout hardware or software? If not, T11 drops from the KDP-0B list.

**Owner decides afterwards:** the boundary for "viable 0B production" (minimum output, maximum cost increase) that each dossier is judged against. D-01's weights are the starting point.
