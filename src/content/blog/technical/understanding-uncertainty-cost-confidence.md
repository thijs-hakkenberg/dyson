---
slug: "understanding-uncertainty-cost-confidence"
title: "Understanding Uncertainty: Cost Confidence Intervals and Reconciliation"
description: "New cost analysis tools help quantify uncertainty in Dyson swarm budgets, from confidence intervals on BOM items to reconciliation analysis across LLM estimates."
author: "Project Dyson Team"
date: "2026-02-05"
category: "Technical"
tags:
  - "technical"
  - "cost-analysis"
  - "uncertainty"
  - "BOM"
relatedPhases:
  - "phase-0"
  - "phase-1"
  - "phase-2"
---

# Understanding Uncertainty: Cost Confidence Intervals and Reconciliation

Project Dyson's Phase 0 estimate is $9 billion. But what does that number actually mean?

Is it a floor that assumes everything goes perfectly? A ceiling with maximum contingency? A median with equal probability of over/under? Without understanding the uncertainty, a cost estimate is just a number.

Today we're releasing **cost confidence intervals** and **reconciliation analysis**—tools that quantify and explain uncertainty in our estimates.

## The Problem with Point Estimates

Our three-LLM consensus approach produces different estimates for every BOM item:

| BOM Item | Claude | GPT | Gemini |
|----------|--------|-----|--------|
| Prospecting Satellites | $250M | $280M | $220M |
| Processing Platform | $800M | $1.2B | $650M |
| Transport Vehicles | $2.0B | $1.8B | $2.2B |

Which estimate is "right"? They all are—under different assumptions about technology readiness, launch costs, development complexity, and risk margins.

## Cost Confidence Intervals

Each BOM item now includes three cost levels:

| Level | Definition | Use Case |
|-------|------------|----------|
| **Low** | 10th percentile estimate | Best-case with favorable assumptions |
| **Medium** | 50th percentile estimate | Most likely outcome |
| **High** | 90th percentile estimate | Conservative with risk margins |

### How Intervals Are Determined

1. **LLM Variation** — Range across Claude, GPT, and Gemini estimates
2. **Historical Analogs** — NASA cost growth factors for comparable missions
3. **TRL Adjustment** — Higher uncertainty for lower technology readiness
4. **Divergent Views** — Explicit disagreements widen intervals

### Example: Processing Platform

| Metric | Value |
|--------|-------|
| Low Estimate | $650M |
| Medium Estimate | $850M |
| High Estimate | $1.2B |
| Confidence Spread | 1.85× |

The 1.85× spread reflects significant uncertainty about ISRU processing efficiency and first-of-a-kind development costs.

## Cost Reconciliation Analysis

The new [Cost Reconciliation](/analysis/cost-reconciliation) tool answers: **Where do our LLMs disagree, and why?**

### Reconciliation Categories

| Category | Meaning |
|----------|---------|
| **Aligned** | All models within 20% of consensus |
| **Minor Divergence** | 20-50% spread, different assumptions |
| **Major Divergence** | >50% spread, fundamental disagreement |

### Major Divergence Example: ISRU Capital Costs

Claude estimates $50B for seed factory infrastructure. Gemini estimates $30B. GPT estimates $100B.

**Root Cause:** Different assumptions about:
- Self-replication capability (Claude: partial, GPT: minimal, Gemini: full)
- Material processing efficiency
- Automation level required

**Resolution Path:** The simulation (RQ-1-12) suggests $50B baseline is reasonable, but the range should be $30-100B until design matures.

## Divergent View Prioritization

Not all disagreements matter equally. The new **prioritization system** ranks divergent views by:

1. **Cost Impact** — Absolute dollar difference
2. **Schedule Impact** — Effect on critical path
3. **Technical Risk** — Likelihood of being wrong
4. **Actionability** — Can we resolve through research?

### Top Divergent Views (February 2026)

| Rank | Topic | Impact | Status |
|------|-------|--------|--------|
| 1 | ISRU capital investment | $70B range | Research planned |
| 2 | Collector unit size | 3× cost difference | Under simulation |
| 3 | Assembly Hub location | $5B logistics delta | Resolved (L4/L5) |

## Using Cost Tools

### For BOM Items

Each BOM detail page now shows:
- Low/Medium/High cost range
- Confidence interval visualization
- Divergent views affecting that item
- Links to reconciliation analysis

### For Phases

Phase summary pages include:
- Aggregate confidence intervals
- Monte Carlo probability distribution
- Top cost risks for the phase

### For Project-Wide Analysis

The [Cost Reconciliation](/analysis/cost-reconciliation) page provides:
- All major divergences ranked by impact
- Resolution status for each divergence
- Trend tracking as research progresses

## Why This Matters

A $9B estimate with ±50% uncertainty means something very different from $9B with ±10% uncertainty. By quantifying and explaining cost uncertainty:

- **Funders** understand the range of outcomes
- **Engineers** know where to focus cost reduction
- **Planners** can build appropriate contingencies
- **Critics** see we're honest about what we don't know

The goal isn't to eliminate uncertainty—it's to measure and manage it.

---

**Explore:** [Cost Reconciliation](/analysis/cost-reconciliation) | [Phase 0 BOM](/plan/phase-0) | [Phase 1 BOM](/plan/phase-1)
