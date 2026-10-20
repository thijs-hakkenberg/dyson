---
questionId: "rq-0-79"
slug: "t01-mw-ep-ground-flight-evidence"
title: "Can ground facilities plus a cluster model take MW-class EP (T01) to TRL 6, and what would a flight subset cost?"
questionType: "simulation"
status: "open"
priority: "critical"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-4"
sourceBOMItemSlug: "transport-vehicles"
sourceBOMItemName: "Transport Vehicles"
relatedBOMItems:
  - "bom-0-4"
relatedResearchQuestions:
  - "rq-0-53"
  - "rq-0-54"
  - "rq-0-75"
  - "rq-0-78"
tags:
  - "electric-propulsion"
  - "trl"
  - "test-facilities"
  - "gates"
createdDate: "2026-10-20"
---

## Background

rq-0-75 left three test paths for the MW-class SEP cluster: ground modules + cluster model + a small flight anchor of 2–4 modules (Claude), ground modules + model with no flight (Gemini), and ground qualification + a representative flight subset sized by interaction coverage (GPT). They disagree on facts: whether ground facilities can pump the flow of a MW-class cluster at representative background pressure, whether cluster interactions can be modelled to closure, and what a flight subset would cost. GPT's point stands: neither ground infeasibility nor flight unaffordability is established.

Feeds decision-sheet item 2.19. Complements rq-0-54 (life, thermal load, plume compatibility), which asks what the technology must survive; this question asks how to prove it.

## Why This Matters

T01 is project-ending and the largest scale gap in the baseline. The test path is the largest single cost and schedule driver in WP-A.

## How this gets answered

- **Simulation** — Facility model: propellant flow against pumping speed and resulting background pressure, per propellant (Xe, Kr, Ar, I) and module size, for the main existing vacuum facilities. A cluster-interaction model (plume overlap, thermal, electromagnetic coupling) to see which effects a 2–4 module anchor captures.
- **Literature** — Facility-effect studies on Hall and gridded thrusters (background-pressure sensitivity), multi-thruster cluster tests, published facility capabilities, rideshare and host-spacecraft options.
- **Stakeholder** — Facility owners and thruster makers on achievable test conditions and on how much flight costs (outreach drafts: NASA oq-1-6, JPL oq-2-3, Busek oq-4-2, Aerojet Rocketdyne oq-5-2).

## Research Directions

1. A facility-gap table: required vs achievable pumping per propellant and module size.
2. Which cluster effects appear at 2, 4 and N modules, and which only at full scale.
3. Cost and schedule bands for a flight subset (host, rideshare, power) against the ground-only path.
4. Redo after rq-0-53 selects or ranks propellants.

**Owner decides afterwards:** whether a flight anchor's cost is worth the reduced risk at KDP-0B.
