---
questionId: "rq-0-80"
slug: "target-grade-evidence-standard"
title: "What sampling and assay evidence bounds a target's bulk grade well enough for the target gate and KDP-0B?"
questionType: "simulation"
status: "open"
priority: "critical"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-1"
sourceBOMItemSlug: "prospecting-satellites"
sourceBOMItemName: "Prospecting Satellites"
relatedBOMItems:
  - "bom-0-1"
  - "bom-0-2"
relatedResearchQuestions:
  - "rq-0-50"
  - "rq-0-66"
  - "rq-0-73"
tags:
  - "prospecting"
  - "sampling"
  - "resource-estimation"
  - "gates"
createdDate: "2026-10-20"
---

## Background

The panel agreed that T11 and T18 must be at TRL 6 at scout PDR, but not on what the target gate and KDP-0B require of T18 (sampling and in-situ bulk-grade assay). Claude and GPT want validated, target-specific sampled-data thresholds, with TRL as supporting evidence. Gemini wants T18 at TRL 7 through successful in-situ sampling. For KDP-0B, Claude requires operational demonstration on the target, GPT a TRL 6 floor plus separate target evidence, and Gemini TRL 7 on the target. All three positions depend on one unanswered question: how many samples, from what depth, bound the bulk grade of a rubble pile to what confidence?

Feeds decision-sheet items 2.3, 2.15 and the T18 part of 2.16. Builds on rq-0-50 (target class and recoverable grade).

## Why This Matters

The target gate commits 0B to one asteroid. Terrestrial mining does not commit capital on one drill hole; the asteroid case has fewer samples and less access.

## How this gets answered

- **Simulation** — Monte Carlo of grade estimation on synthetic rubble-pile bodies: heterogeneity models drawn from meteorite and returned-sample data, sampling designs (count, depth, spread), and the resulting confidence interval on bulk grade. Reuses the spectral-analysis and NEA-population modules where they fit.
- **Literature** — Ryugu and Bennu sample-representativeness studies; Fe-Ni heterogeneity in meteorites; terrestrial resource-reporting standards (JORC Code, NI 43-101, CRIRSCO template) for how sampling density maps to inferred, indicated and measured resources.
- **Stakeholder** — Sample-return teams and resource-estimation "competent persons" on what evidence would justify committing capital (outreach drafts: JAXA oq-10-2, CRIRSCO oq-13-1).

## Research Directions

1. Grade confidence against sampling design for two or three plausible heterogeneity models.
2. Map the result onto resource-confidence categories: what would count as "indicated" for an asteroid?
3. Translate into a target-gate threshold (data, not a TRL label) and into what T18 must do to produce it.

**Owner decides afterwards:** the confidence level required before committing 0B to a target.
