---
slug: "isru-economic-crossover-paper"
title: "39 Versions, 3 AI Reviewers, 1 Answer: When Does Space Manufacturing Win?"
description: "Our ISRU economic crossover paper achieves 3/3 Accept after 39 rounds of AI peer review. A 10,000-run Monte Carlo with 20 stochastic parameters finds crossover in 85% of draws at r=5%, with ISRU capital cost K explaining 63% of variance."
author: "Thijs Hakkenberg"
date: "2026-02-22"
category: "Research"
tags:
  - "publication"
  - "ISRU"
  - "economics"
  - "monte-carlo"
  - "peer-review"
  - "phase-1"
  - "NPV"
relatedPhases:
  - "phase-1"
  - "phase-2"
---

# 39 Versions, 3 AI Reviewers, 1 Answer: When Does Space Manufacturing Win?

We set out to answer what might be the most consequential economic question for large-scale space infrastructure: at what production scale does in-situ resource utilization become cheaper than building on Earth and launching? After 39 versions of iterative AI peer review, the paper "Economic Inflection Points in Space Manufacturing" has achieved 3/3 Accept from Claude, Gemini, and GPT.

Here is what we found, how we found it, and what it means for the Dyson swarm roadmap.

## The Question, Rigorously Stated

Earlier this year we published [preliminary crossover estimates](/blog/isru-crossover-point-findings) from a simplified simulator: ~3,500 units, 100 Monte Carlo runs, no discounting. Those results were directionally correct but lacked the rigor needed for planning decisions. The questions that kept coming back from reviewers were precise: What happens when you discount future cash flows? How do you handle the fact that ISRU delivers later than Earth launch? What if learning curves saturate? What fraction of each unit *must* come from Earth regardless?

The paper addresses all of these.

## The Model

We compare two pathways for serial production of unpressurized structural modules (1,850 kg each):

**Earth pathway:** Manufacture on Earth, launch to GEO. Unit cost follows a Wright learning curve (baseline LR = 0.85), with launch cost decomposed into a physics-driven propellant floor ($200/kg) and a learnable operational component. Manufacturing costs decline with experience; launch costs have limited learning potential.

**ISRU pathway:** Deploy a seed factory (capital K), ramp production along an S-curve, pay operational costs per unit. Ops costs follow their own Wright curve (baseline LR = 0.90) but may saturate at a stochastic plateau. A "vitamin fraction" captures the irreducible share of each unit that must be Earth-sourced (e.g., electronics, specialty alloys).

Both pathways are discounted at their own delivery schedules using a standard NPV framework. The discount rate is treated as a fixed scenario parameter (not a stochastic variable), which avoids conflating time preferences with physical uncertainty.

### 20 Stochastic Parameters

The Monte Carlo samples 20 parameters simultaneously, including:

- Launch cost ($/kg), ISRU capital K, Earth and ISRU learning rates
- Production rate, ramp-up midpoint, availability
- Materials cost floor, labor fraction, mass penalty
- Transport cost and time, fuel floor
- Learning plateau onset and severity, dynamic vitamin fraction decay
- Earth manufacturing break-even point and scaling efficiency

Parameters are correlated via a 6-dimensional Gaussian copula (e.g., higher K correlates with longer ramp-up and lower availability). All distributions are documented with engineering justification.

## The Results

At r = 5% (canonical configuration), 10,000 Monte Carlo runs find:

| Metric | Value |
|--------|-------|
| Convergence probability | **85%** |
| Conditional median crossover | **~4,300 units** |
| Kaplan-Meier median | ~5,350 units |
| 95% CI on conditional median | [4,200, 4,420] |
| Analytically permanent crossover | 22% of converging runs |
| Functionally permanent (savings window ~196k units) | 78% of converging runs |

In plain language: across a wide range of plausible futures, ISRU achieves cost parity in 85% of scenarios. When it does, the median crossover is around 4,300 units. And once crossover happens, it sticks -- the savings window extends over nearly 200,000 units in the typical case.

### The 15% That Don't Converge

Not every future favors ISRU. In 15% of draws, crossover never occurs within the 40,000-unit planning horizon. These are dominated by scenarios where K is very high (>$150B), Earth learning is very aggressive, or the vitamin fraction remains stubbornly large. This is an honest result, not a failure of the model. It means ISRU is *probable* but not *guaranteed*.

### K Dominates Everything

ISRU capital cost K and Earth learning rate LR_E together explain ~83% of crossover variance. K alone explains 63%. This produces a clean conditional surface:

| K median | Crossover probability |
|----------|----------------------|
| $50B | 92% |
| $65B (baseline) | 85% |
| $100B | 67% |
| $150B | 46% |

The practical implication: **reducing uncertainty about K has far more decision value than refining any other parameter.** A factor-of-two change in K estimates shifts the crossover probability by 20+ percentage points.

### Discount Rate Effects

| Discount rate | Convergence | Conditional median |
|---------------|-------------|-------------------|
| 0% (undiscounted) | 92% | ~4,300 |
| 3% | 89% | ~4,400 |
| 5% | 85% | ~4,300 |
| 8% | 77% | ~4,100 |

The discount rate primarily affects *whether* crossover occurs, not *where* it occurs among converging scenarios. At commercial rates above ~20%, the upfront capital penalty overwhelms ISRU's long-term advantage entirely.

### Three Crossover Killers

The model identifies three conditions that prevent crossover regardless of other parameters:

1. **Vitamin costs > ~$50,000/kg** -- if Earth-sourced components are expensive enough, the ISRU pathway can never escape them
2. **Discount rates > ~20%** -- the time value of money kills the investment case
3. **ISRU success probability < ~70%** -- if there's a meaningful chance the whole program fails, expected costs overwhelm the savings

### Revenue Breakeven

For infrastructure that generates revenue (e.g., space solar power), there is a subtlety: ISRU delivers later than Earth launch, so faster deployment has opportunity-cost value. Above ~$0.94M/unit/year in revenue, the deployment delay from ISRU's ramp-up offsets the cost savings. This means **the ISRU advantage is strongest for non-revenue infrastructure** like habitats, stations, and structural frameworks.

## What Changed From the Preliminary Results

The [earlier blog post](/blog/isru-crossover-point-findings) reported ~3,500 units from a simplified model. The rigorous analysis shifts this to ~4,300 (conditional median) or ~3,750 (deterministic phased-K baseline). The direction is the same; the confidence in it is dramatically higher.

Key methodological upgrades:

| Feature | Preliminary | Paper (Version AM) |
|---------|-------------|-------------------|
| Monte Carlo runs | 100 | 10,000 |
| Stochastic parameters | ~5 | 20 |
| Discounting | None | Full NPV with pathway-specific schedules |
| Launch cost model | Fixed $/kg | Two-component (fuel floor + learnable ops) |
| Learning curves | Simple Wright | Wright with stochastic saturation plateau |
| Vitamin fraction | None | Dynamic, decaying with production maturity |
| Correlation structure | Independent | 6D Gaussian copula |
| Permanent/transient distinction | None | Analytical + savings window survival |
| Revenue analysis | None | Breakeven rate with deployment delay |
| Sensitivity method | One-at-a-time | PRCC + rank-regression R-squared |

## Implications for the Dyson Swarm Roadmap

### Phase 1 Strategy is Confirmed

The hybrid approach remains optimal: Earth manufacturing for the first ~1,000-2,000 units while deploying ISRU infrastructure in parallel, transitioning around unit 4,000. This is consistent with the Phase 1 BOM architecture already in the plan.

### K is the Decision Variable

The single most valuable investment for Phase 0 is reducing uncertainty about ISRU capital costs. This means:
- Detailed seed factory design studies (not conceptual -- engineering-level mass/cost budgets)
- Technology demonstrations for the highest-cost subsystems (mineral processing, fabrication)
- Reference class data collection from analogous terrestrial megaprojects

### The >20,000 Unit Threshold

A hybrid strategy (Earth-first, switch at N*) is value-positive at program scales >= 20,000 units. Below that, the option value of maintaining both pathways may not justify the dual-investment overhead.

### Revenue Infrastructure Needs Different Math

Space solar power and other revenue-generating applications cannot simply use the cost crossover. The deployment delay matters. For SSP specifically, if each satellite generates >$0.94M/year, faster Earth-launch deployment may be preferable even at higher per-unit cost.

## The Peer Review Journey

This paper went through 39 versions of iterative review by three AI models (Claude Opus, Gemini Pro, GPT-5.2), with each version receiving independent reviews scored across six criteria.

The verdict progression tells its own story:

- **Gemini** reached Minor Revision by Version D and Accept by Version O. Consistently the most favorable reviewer.
- **Claude** oscillated between Minor and Major Revision for 37 versions, reaching stable Minor at Version AL. Tended to raise new concerns as old ones were resolved.
- **GPT** maintained Major Revision for 38 consecutive versions before finally reaching Accept at Version AM. The most demanding reviewer, focused on cash-flow timing consistency and distributional assumptions.

The process added: NPV discounting, pathway-specific delivery schedules, two-component launch learning, vitamin fractions, learning plateaus, copula correlations, Kaplan-Meier survival analysis, PRCC sensitivity, revenue breakeven analysis, permanent/transient crossover classification, a canonical configuration table, and a K-conditional result surface. Each of these was prompted by specific reviewer feedback.

## Code Availability

The simulation code (Python, MIT license) is open source:
- `isru_model.py` -- pure cost model (Equations 1-9 + NPV extensions)
- `isru_mc.py` -- Monte Carlo engine with sampling, statistics, and PRCC
- `generate_isru_figures.py` -- reproduces all 6 publication figures

All results use random seed 42 for exact reproducibility. Run `python generate_isru_figures.py` from the `publications/scripts/` directory.

## What's Next

The paper is ready for submission to *Advances in Space Research*. Meanwhile, the findings feed directly into Phase 1 planning:

1. **Update the ISRU economics simulator** to match the paper's NPV methodology
2. **Seed factory design studies** to narrow the K distribution
3. **Material availability assessment** by ISRU source (lunar regolith, asteroidal, Mercury)
4. **Revenue breakeven analysis** for specific SSP architectures

---

**Research Question:** [RQ-1-12: In-space vs Earth manufacturing transition point](/questions/isru-manufacturing-transition-point)

**Interactive Tool:** [ISRU Economics Simulator](/questions/isru-manufacturing-transition-point/simulator) (uses preliminary model; update planned)
