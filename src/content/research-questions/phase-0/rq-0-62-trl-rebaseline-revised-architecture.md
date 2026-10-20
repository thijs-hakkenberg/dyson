---
questionId: "rq-0-62"
slug: "trl-rebaseline-revised-architecture"
title: "Technology readiness re-baseline for the revised Phase 0 architecture"
questionType: "analysis"
status: "answered"
priority: "critical"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-3"
sourceBOMItemSlug: "material-processing-station"
sourceBOMItemName: "Material Processing Station"
relatedBOMItems:
  - "bom-0-1"
  - "bom-0-2"
  - "bom-0-3"
  - "bom-0-4"
  - "bom-0-5"
  - "bom-0-6"
relatedResearchQuestions:
  - "rq-0-11"
  - "rq-0-16"
  - "rq-0-26"
tags:
  - "trl"
  - "ad2"
  - "gates"
  - "readiness"
createdDate: "2026-10-12"
---

## Background

The TRL table (`src/lib/services/trl-assessment.ts`) covers 6 of 33 BOM items (CI-19) and describes the original architecture. It rates "high-power SEP (100+ kW)" at TRL 6–7, while the revised design needs 1–2.5 MWe tugs the panel rates at TRL 2–4. The round-2 gates used no TRL at all because the re-assessment prompts did not include the table. <!-- stale-ok: quotes the superseded rating -->

Raised by the Phase 0 re-assessment (round 2, 2026-10-12): `reconciliation/phase-0/round-2/reconciliation/phase.md` and `reconciliation/phase-0/decisions.md`.

## Why This Matters

D-02 puts a TRL target and an AD² rating on every critical technology at KDP-0B. That needs a current, scale-specific baseline.

## How this gets answered

- **Analysis** — Technology readiness assessment per NASA NPR 7123.1 / ECSS-E-HB-11A for each critical technology at the revised scale and environment, with AD² (advancement degree of difficulty).
- **Literature research** — Heritage evidence per technology.

## Research Directions

1. List critical technologies of the revised architecture.
2. TRL and AD² each, with evidence.
3. Feed gate thresholds and the schedule (rq-0-63).
