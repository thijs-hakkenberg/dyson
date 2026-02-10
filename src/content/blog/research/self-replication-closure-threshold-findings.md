---
slug: "self-replication-closure-threshold-findings"
title: "Self-Replication: Quality Control Beats Closure Ratio Every Time"
description: "Monte Carlo simulation of self-replicating foundries reveals that manufacturing degradation per generation—not closure ratio—is the critical factor. At 5% degradation, 31% of scenarios never reach target scale."
author: "Research Team"
date: "2026-02-10"
category: "Research"
tags:
  - "simulation"
  - "research-question"
  - "phase-3a"
  - "self-replication"
  - "manufacturing"
  - "monte-carlo"
relatedPhases:
  - "phase-3a"
---

# Self-Replication: Quality Control Beats Closure Ratio Every Time

Von Neumann self-replication is the linchpin of Dyson swarm construction at scale. Without foundries that can build copies of themselves from in-situ resources, we are stuck launching millions of tonnes from Earth—a logistical impossibility. The entire Matrioshka brain timeline rests on exponential manufacturing growth, and that growth depends on how well each foundry can reproduce.

We built a Monte Carlo replication simulator to quantify exactly what drives success or failure.

## The Question

The consensus specification targets a mass closure ratio of 96% or higher—meaning 96% of a foundry's mass can be produced by an identical foundry using only local materials. The remaining 4% ("vitamins") must be imported from Earth or specialized facilities.

But is 96% enough? Is 99% worth the engineering effort? And what happens when manufacturing quality degrades across generations—when the copy of a copy of a copy starts drifting out of spec?

We simulated the full replication chain from a single seed foundry to 10,000 operational units across a range of closure ratios and degradation rates.

## The Surprising Answer

**All closure ratios from 85% to 99% reach the 10,000-foundry target with 100% probability—when degradation is zero.** The difference is time and vitamin cost, not feasibility.

| Closure Ratio | Time to 10,000 | Vitamin Mass | Success Rate |
|---------------|-----------------|--------------|--------------|
| 85% | 34.1 years | 170K tonnes | 100% |
| 90% | 30.8 years | 142K tonnes | 100% |
| 93% | 28.7 years | 121K tonnes | 100% |
| 96% | 27.0 years | 105K tonnes | 100% |
| 98% | 25.9 years | 95K tonnes | 100% |
| 99% | 25.2 years | 91K tonnes | 100% |

Going from 85% to 99% closure saves roughly 9 years and 79K tonnes of vitamins. That is significant, but the real story is elsewhere.

## The Degradation Cliff

When we introduce manufacturing degradation—each generation of foundry producing slightly worse copies—the picture changes dramatically.

| Degradation/Gen | Time to 10,000 | Vitamin Mass | Success Rate |
|-----------------|-----------------|--------------|--------------|
| 0% | 15.2 years | 23K tonnes | 100% |
| 0.5% | 17.8 years | 38K tonnes | 100% |
| 1% | 21.4 years | 62K tonnes | 100% |
| 2% | 29.3 years | 108K tonnes | 98% |
| 5% | 66.1 years | 296K tonnes | 69% |

At 5% degradation per generation, **31% of simulation runs never reach the 10,000-foundry target**. The foundry population plateaus as later-generation units become too degraded to reliably produce offspring. This is a showstopper.

At 0% degradation, the same scenario completes in just 15 years with only 23K tonnes of vitamins. The difference between perfect replication fidelity and modest degradation is a factor of 4x in time and 13x in vitamin mass.

## Why Degradation Dominates

The mathematics are straightforward but unforgiving.

**Closure ratio** determines how much vitamin material each foundry needs. A 96% closure ratio means 4% of each foundry's mass must be imported. This scales linearly: twice as many foundries, twice the vitamins. It is a constant tax on the supply chain.

**Degradation** compounds exponentially. If each generation loses 5% of manufacturing precision, by generation 10 the effective closure ratio has dropped from 96% to roughly 60%. By generation 15, foundries can barely function. The replication chain collapses not because of vitamin shortages but because later-generation foundries cannot produce viable offspring.

This is the compounding quality loss problem. A constant vitamin import rate is manageable—supply chains scale linearly. But exponential quality degradation cannot be solved by importing more material. It can only be solved by maintaining manufacturing fidelity.

## The Vitamin Supply Chain

Regardless of closure ratio, the vitamin supply chain requires between 85,000 and 170,000 tonnes of imported material over the replication campaign. This material is dominated by:

- **Semiconductor-grade silicon and germanium** for compute substrate manufacturing equipment
- **Rare earth elements** for precision magnets and optical components
- **Noble metals** for electrical contacts and reflective coatings
- **High-purity process gases** for chemical vapor deposition and etching

The vitamin mass is substantial but not insurmountable. It is roughly equivalent to 1,000-2,000 heavy-lift launches, which can be amortized over the 15-35 year replication timeline. The supply chain must be planned early, but it is not the binding constraint.

The binding constraint is degradation.

## Design Implications

The simulation results point to a clear engineering priority: **invest in manufacturing quality control, not in pushing closure ratio from 96% to 99%.**

### Metrology and Self-Inspection

Every foundry must include comprehensive metrology systems capable of measuring the precision of its own output. If a foundry detects that its copies are drifting out of spec, it should flag the degradation before those copies attempt to replicate further.

### Periodic Refresh Cycles

Rather than relying on indefinite replication chains, the system should incorporate periodic "refresh" cycles where higher-fidelity seed foundries produce new generation-zero units. This resets the degradation clock and prevents compounding quality loss.

### Redundant Critical Subsystems

The components most susceptible to degradation—lithography optics, precision alignment mechanisms, vacuum chamber seals—should be designed with redundancy and field-replaceable modules. A foundry that can swap out a degraded subsystem extends the viable replication chain.

### Quality Gates Between Generations

Each new foundry should undergo acceptance testing before being authorized to replicate. A foundry that fails quality gates becomes a production-only unit (building Dyson swarm components) rather than a replicating unit. This prevents degraded units from propagating errors.

## Try It Yourself

We have published the [interactive simulator](/questions/self-replication-closure-threshold/simulator) so you can explore these dynamics. Adjust closure ratio, degradation rate, vitamin supply rate, and target population to see how the replication campaign unfolds. Watch how the foundry population grows—or plateaus—under different assumptions.

## Methodology

The simulation uses:
- **Exponential replication model** with generation tracking
- **Per-generation degradation** applied to effective closure ratio
- **Stochastic failure modeling** for individual foundry replication attempts
- **Vitamin supply constraints** as a throughput limiter
- **500 Monte Carlo runs** per parameter combination for statistical validity

Results should be interpreted as relative comparisons between strategies.

## What's Next

This research answers RQ-3a-2 and provides critical guidance for Phase 3a foundry design. The simulation validates the consensus target of 96% closure while revealing that manufacturing fidelity is the true bottleneck.

Remaining work:
- Detailed metrology system design for self-inspecting foundries
- Refresh cycle optimization (how often, from what source)
- Component-level degradation analysis to identify the weakest links
- Integration with vitamin supply chain logistics modeling

---

**Research Question:** [RQ-3a-2: Self-replication closure threshold](/questions/self-replication-closure-threshold)

**Interactive Tool:** [Self-Replication Simulator](/questions/self-replication-closure-threshold/simulator)
