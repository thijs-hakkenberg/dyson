---
questionId: "rq-0-85"
slug: "site-debris-escape-ballistics"
title: "What fraction of handled regolith escapes the target, by particle size and release speed?"
questionType: "simulation"
status: "open"
priority: "high"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-15"
sourceBOMItemSlug: "debris-contamination"
sourceBOMItemName: "Debris and Contamination Control"
relatedBOMItems:
  - "bom-0-15"
  - "bom-0-2"
  - "bom-0-3"
  - "bom-0-12"
relatedResearchQuestions:
  - "rq-0-41"
  - "rq-0-70"
tags:
  - "debris"
  - "containment"
  - "electrostatics"
  - "d-03"
createdDate: "2026-10-25"
---

## Background

D-03 sets an interim ALARP escape ceiling. The regenerated consensus documents disagree on its value (≤1×10⁻⁴ of handled mass for bom-0-15, GPT's 10⁻⁶ study case, ≤1×10⁻³ for the pathfinder) and share open questions: electrostatic lofting of fresh fines at ~10⁻⁴ g, the target's natural shedding rate, and the fraction of lofted mass that reaches arrays (η).

## Why This Matters

The ceiling sizes containment hardware in three BOM lines and is a licence-gate criterion.

## How this gets answered

- **Simulation**: Ballistic Monte Carlo on a rotating, irregular body (gravity, centrifugal, solar radiation pressure, a photoelectron-sheath charging model) for released particles by size bin and release speed relative to local escape. Output: escape and re-impact fractions, interception by site assets, and their sensitivity to spin period and body size.
- **Literature**: Bennu particle-ejection events, Apollo and lab electrostatic lofting, Hayabusa2 SCI and OSIRIS-REx TAG ejecta.

## Research Directions

1. Escape fraction against release speed and size, for two or three body classes.
2. Which particle sizes dominate escape at a given placement-speed limit (bom-0-2 uses ≤0.25–0.3 v_esc).
3. A defensible interim ceiling, and what the pathfinder must measure to replace it.
