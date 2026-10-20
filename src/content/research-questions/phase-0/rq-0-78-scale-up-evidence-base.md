---
questionId: "rq-0-78"
slug: "scale-up-evidence-base"
title: "How far have space and process technologies been extrapolated from test to flight or plant, and where did scale-up fail?"
questionType: "meta-research"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-7"
sourceBOMItemSlug: "organizational-infrastructure"
sourceBOMItemName: "Organizational Infrastructure"
relatedBOMItems:
  - "bom-0-7"
  - "bom-0-4"
relatedResearchQuestions:
  - "rq-0-54"
  - "rq-0-71"
  - "rq-0-75"
tags:
  - "gates"
  - "trl"
  - "scale-up"
  - "reliability"
createdDate: "2026-10-20"
---

## Background

rq-0-71 left three positions on how far a TRL 6 test may be extrapolated: a 10× default with a 100× hard limit (Claude), no fixed limit when governing regimes match (Gemini), and a test-supported envelope with no universal ratio (GPT). On duration and wear: numerical runtime rules (Claude), ≤ 10× extrapolation with ≥ 10% of design life tested (Gemini), and validated degradation mechanisms (GPT). Each model rated its own numbers as low confidence. Nobody produced base rates.

Feeds decision-sheet items 2.12, 2.13 and the scale part of 2.19.

## Why This Matters

Most project-ending technologies need MW-class power or kt/yr throughput that no facility reaches. The limit decides the size and cost of pathfinders.

## How this gets answered

- **Literature** — Build a case set of scale-ups: the article tested, the article flown or built, the ratio in power, throughput and duration, and whether performance or life fell short.
- **Analysis** — Shortfall rate against extrapolation ratio and against whether the governing regime changed. Test whether a fixed ratio or a regime test separates successes from failures better.

## Research Directions

1. **Electric propulsion:** the NSTAR, NEXT and AEPS lineage; 100 kW-class nested-channel Hall tests; life-test vs flight-life records.
2. **Space power and structures:** array scale-ups (ISS arrays, roll-out arrays), deployables.
3. **Process plants:** first-of-a-kind plant performance against pilot plants, e.g. the RAND pioneer-plant study (Merrow et al.) and later chemical-engineering scale-up reviews.
4. **Wear and life:** accelerated-life-test practice and physics-of-failure validation, and cases where acceleration models failed.
5. Report base rates with their uncertainty, and the regime variables that predicted failure.

**Owner decides afterwards:** how much false-rejection risk (larger pathfinders) to accept in return for protection at the one-way gate.
