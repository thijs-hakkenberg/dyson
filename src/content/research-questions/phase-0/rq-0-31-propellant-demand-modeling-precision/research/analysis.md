---
questionId: "rq-0-31"
analysisDate: "2026-03-17"
status: "insufficient-data"
confidence: "very-low"
---

# Propellant Demand Modeling Precision: Literature Analysis

## Executive Summary

Arxiv coverage of propellant depot sizing, logistics modeling, and demand precision for cislunar operations is **extremely sparse**. The relevant papers found address adjacent topics: cryogenic fluid management forecasting, alternative propellant development, and spacecraft mission optimization. The core problem — how precisely can we model propellant demand for Phase 0-1 operations, and what are the uncertainty drivers — is addressed in AIAA conference papers, NASA mission studies, and space logistics research that is not on arxiv.

---

## 1. Available Arxiv Literature

### 1.1 Cryogenic Fluid Management

Cheng et al. (arxiv:2508.21802) address a key uncertainty in propellant demand: boil-off prediction. Their ML-based forecasting framework for cryogenic tank behavior demonstrates that propellant loss rates can be predicted with reasonable accuracy using adaptive models. This directly affects demand precision — if boil-off cannot be accurately predicted, demand models must include large margins.

### 1.2 Propellant Options

Du et al. (arxiv:2509.26567) explore alternative propellants for electric propulsion. If Project Dyson's EP systems can use non-xenon propellants (krypton, iodine, or novel compounds), the entire demand model changes. Xenon scarcity at scale is a known concern (rq-0-20, already resolved).

### 1.3 Mission Planning Integration

Isaji et al. (arxiv:2110.07323) provide MDO frameworks for coupled mission-vehicle optimization. This methodology is relevant because propellant demand is not independent of vehicle design and trajectory — optimizing all three simultaneously gives more precise demand estimates than sequential analysis.

## 2. What Drives Propellant Demand Uncertainty

Based on the Phase 0-1 architecture, propellant demand uncertainty comes from:

1. **Mission rate uncertainty** — How many trips per year? Depends on construction schedule.
2. **Delta-v uncertainty** — Trajectory optimization, gravity assists, low-thrust spiral accuracy.
3. **Vehicle mass uncertainty** — Payload mass, structural mass growth factors.
4. **Isp uncertainty** — Thruster performance degradation over life (links to rq-0-16).
5. **Boil-off uncertainty** — For cryogenic propellants, storage loss rate (links to rq-0-30, rq-0-47).
6. **Reserves and margins** — Standard practice adds 5-20% margins depending on mission maturity.

Of these, only boil-off has any arxiv coverage.

## 3. Assessment for Project Dyson

Propellant demand modeling for Phase 0-1 requires:
- A logistics model coupling mission profiles, vehicle performance, and depot operations
- Uncertainty quantification across all input parameters
- Sensitivity analysis to identify which uncertainties matter most
- Comparison with analogous mission demand estimates (e.g., NASA lunar Gateway resupply)

**None of this can be done from arxiv literature alone.** The handover to an external researcher must request specific NASA logistics studies and AIAA operations research papers.

## 4. Recommended Next Steps

1. **NASA Gateway logistics studies** — Most directly analogous to our depot operations
2. **AIAA space logistics papers** — Ho, Chen, Ishimatsu research groups
3. **ULA ACES studies** — Commercial cryogenic depot demand analysis
4. **ISECG Global Exploration Roadmap** — International propellant demand estimates
