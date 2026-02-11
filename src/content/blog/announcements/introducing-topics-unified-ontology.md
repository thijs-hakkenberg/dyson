---
slug: "introducing-topics-unified-ontology"
title: "Introducing Topics: Unified Ontology for 250+ Artifacts"
description: "A new taxonomy system organizes Project Dyson's research questions, BOM specs, blog posts, and validations into 13 engineering domains and 52 topics — enabling cross-artifact discovery without changing a single tag."
author: "Project Dyson Team"
date: "2026-02-11"
category: "Announcements"
tags:
  - "announcement"
  - "feature"
  - "methodology"
  - "architecture"
relatedPhases:
  - "phase-0"
  - "phase-1"
  - "phase-2"
  - "phase-3a"
  - "phase-3b"
---

# Introducing Topics: Unified Ontology for 250+ Artifacts

Project Dyson has grown to over 250 artifacts: 140 research questions, 57 blog posts, 33 BOM items, plus validations, experiments, and organization records. Each uses ad-hoc `tags` in its frontmatter — "propulsion", "isru", "thermodynamics" — but until now, there was no formal taxonomy connecting them.

Today we're launching **Topics**, a unified ontology that defines engineering domains and topics, then resolves existing tags to them at runtime. Browse it at [/topics](/topics).

## The Problem: Fragmented Discovery

If you wanted to find everything related to propellant systems, you'd need to know that some artifacts use "propellant", others use "krypton", "xenon", "fuel-economics", or "propellant-transfer". Blog posts might tag "alternative-propellants" while validations use "ion-propulsion". There was no way to say "show me everything about propellant" across artifact types.

## The Approach: Tag Resolution, Not Tag Replacement

Rather than migrating tags across 250+ content files, we defined a **taxonomy YAML** where each topic declares which legacy tags map to it:

```yaml
- id: "propellant-systems"
  name: "Propellant Systems"
  legacyTags:
    - "propellant"
    - "krypton"
    - "xenon"
    - "iodine"
    - "fuel-economics"
    - "propellant-transfer"
```

At runtime, the ontology service builds a reverse index from every legacy tag to its topic(s). When a research question has `tags: ["krypton", "propulsion"]`, the system resolves these to the "Propellant Systems" and "Propulsion (General)" topics — zero migration required.

## What's in the Taxonomy

The ontology organizes knowledge into **13 domains** with **52 topics**:

| Domain | Topics | Example Tags |
|--------|--------|--------------|
| Propulsion & Orbital Mechanics | 6 | ion-propulsion, station-keeping, delta-v |
| Materials & Manufacturing | 5 | thin-film, perovskite, cold-welding |
| Energy & Power Systems | 5 | photovoltaics, power-beaming, batteries |
| Space Environment & Protection | 5 | radiation, debris, thermal-management |
| Robotics & Autonomous Systems | 4 | self-replication, maintenance, autonomy |
| Computing & Communications | 3 | laser-comm, distributed-systems, ML |
| Mining & Resource Processing | 3 | asteroid-mining, ISRU, water |
| Swarm Architecture & Control | 4 | swarm-control, deployment, fleet-sizing |
| Membrane & Collector Design | 3 | membrane-dynamics, flutter, optics |
| Mission Design & Logistics | 5 | launch-strategy, supply-chain, cost-analysis |
| Advanced Concepts | 3 | matrioshka-brain, stellar-engines |
| Governance & Organization | 3 | governance, safety, non-profit |
| Research Methodology | 3 | multi-model, simulation, testing |

## Coverage

The bootstrap script scanned all 334 content files and found 422 unique tags. The taxonomy maps **90%** of them (380/422). The remaining 42 unmapped tags are structural identifiers like `phase-1`, `research-question`, and `resolution` — classification labels rather than engineering topics.

## BOM Item Mappings

BOM items don't have tags in their frontmatter, so we created an explicit `artifact-mappings.yaml` that assigns 2-3 topics to each of the 33 items. For example, "Orbital Tugs" maps to `ion-propulsion`, `fleet-management`, and `propellant-systems`.

## What Changed in the UI

- **New `/topics` page** — Browse all 13 domains with artifact counts per topic
- **New `/topics/[topic]` pages** — See all linked artifacts grouped by type (questions, BOM items, blog posts, validations), plus sibling and related topics
- **TopicPill component** — Tags on QuestionCard now link to their topic page (mapped tags get cyan styling; unmapped tags stay dimmed)
- **Header navigation** — "Topics" link added between "Questions" and "Organizations"

## Future Directions

The ontology is designed as a living taxonomy. Running `node scripts/bootstrap-ontology.js --show-unmapped` reports which tags still need mapping. As new content is added, simply add legacy tags to existing topics or create new ones — no content file changes needed.

Next steps may include:
- Topic-aware search and filtering on the questions page
- "Related Topics" sections on BOM item detail pages
- Topic-based RSS feeds for subscribers interested in specific domains
