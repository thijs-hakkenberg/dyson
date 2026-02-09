---
slug: "tracking-progress-resolution-system"
title: "Tracking Progress: New Resolution System for Research Questions"
description: "Introducing our resolution tracking system that documents how research questions are answered, providing transparency into Project Dyson's decision-making process."
author: "Project Dyson Team"
date: "2026-02-05"
category: "Announcements"
tags:
  - "announcement"
  - "research-questions"
  - "tracking"
  - "features"
---

# Tracking Progress: New Resolution System for Research Questions

Project Dyson now has **over 100 open research questions** spanning three construction phases. As we answer these questions through simulation, literature review, and expert analysis, we need a systematic way to track what's been resolved and what those resolutions mean for the project.

Today we're launching the **Resolution Tracking System**—a comprehensive way to document how research questions move from "open" to "resolved."

## Why Track Resolutions?

Research questions don't just disappear when answered. Each resolution:
- **Informs design decisions** for BOM items
- **Updates cost estimates** with new data
- **Identifies follow-up questions** that emerge from answers
- **Creates institutional memory** for the project

Without formal tracking, we risk losing context on why decisions were made.

## Resolution Statuses

Questions can now have one of four resolution statuses:

| Status | Meaning |
|--------|---------|
| **Open** | Not yet answered—research ongoing |
| **Partially Resolved** | Some aspects answered, others remain open |
| **Resolved** | Fully answered with documented conclusions |
| **Superseded** | Replaced by a different question or approach |

## What Gets Documented

Each resolved question now includes:

### Resolution Summary
A concise explanation of what was learned and how it affects the project.

### Resolution Source
How the answer was determined:
- **Simulation** — Monte Carlo or discrete event modeling
- **Literature** — Published research and mission data
- **Expert Analysis** — Multi-LLM consensus synthesis
- **Experiment** — Empirical validation (future)

### Implications
Specific impacts on:
- Cost estimates (updates to BOM items)
- Design decisions (architecture changes)
- Follow-up questions (what new questions emerged)

## Resolution Statistics

The new [Resolved Questions](/questions/resolved) page provides:
- **Progress tracking** — Percentage of questions resolved per phase
- **Resolution timeline** — When questions were answered
- **Source breakdown** — How answers were determined
- **Phase filtering** — Focus on specific construction phases

## Example: RQ-0-20 Xenon Propellant Sourcing

Our first formally tracked resolution is [RQ-0-20: Xenon propellant sourcing at scale](/questions/xenon-propellant-sourcing-scale).

**Status:** Resolved

**Summary:** Xenon-primary propulsion is infeasible at Project Dyson scale. Global production is 40-50 tonnes/year; we would need 15-20× that amount. Krypton and iodine are viable alternatives with proven flight heritage.

**Source:** Literature review + Tsiolkovsky equation analysis

**Implications:**
- Transport vehicle specifications updated to require propellant flexibility
- $50-100M added to budget for alternative propellant qualification
- New research question opened for thruster qualification programs

## Try It Yourself

Visit [/questions/resolved](/questions/resolved) to explore:
- All resolved questions with full context
- Filter by phase and resolution status
- View the resolution timeline
- See statistics on project progress

## What's Next

We're working on:
1. **Automated updates** — Resolution status propagates to affected BOM items
2. **Dependency tracking** — Questions that block other questions
3. **Notification system** — Alerts when key questions are resolved

The resolution tracking system brings transparency to how Project Dyson makes decisions. Every answer is documented, every implication is traced, and the reasoning is preserved for future reference.

---

**Explore:** [Resolved Questions](/questions/resolved) | [All Research Questions](/questions)
