---
bomId: "bom-0-17"
itemName: "Contingency and Reserve"
itemSlug: "contingency-reserve"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-21"
phase: "phase-0"
---

# Technical Proposal: bom-0-17 Contingency and Reserve (0A+0B)

## 1. Recommended Approach and Design Philosophy

For a first-of-its-kind space resource utilization architecture, "Contingency and Reserve" cannot be treated merely as a flat percentage applied at the end of a spreadsheet. It must be a rigorously managed, multi-dimensional buffer encompassing **Financial Reserve (Unallocated Future Expenses - UFE)**, **Schedule Margin**, and **Technical Margin** (mass, power, delta-v). 

My philosophy aligns with NASA NPR 7120.5F guidelines for high-risk, high-value flagship missions, tailored for the gated real-option structure of Project Dyson (D-01, D-02). 

**Disagreement with Round-2 Proposals:** 
Gemini proposed 25% for Phase 0B. I strongly reject this. Phase 0B represents the transition from pathfinder to industrial-scale autonomous mining and metallurgy in deep space. Historically, scaling up chemical/metallurgical processes introduces massive unforeseen complexities (e.g., thermal management in microgravity, dust fouling). I align closer to Claude's assessment: **0A should carry 30–40% UFE**, and **0B must carry 40–50% UFE** at the KDP-0B gate, drawing down only as operational milestones are met.

## 2. Reserve Architecture and Specifications

The reserve is divided into three distinct pools, managed at different levels of the Project Dyson hierarchy.

### 2.1 Financial Reserve (UFE)
*   **Phase 0A (Research & Pathfinders): 35%** (Range: 30–40%)
    *   *Basis:* Standard for Phase A/B formulation of complex space systems. Covers NRE overruns, qualification failures, and launch vehicle integration delays for the pathfinder.
*   **Phase 0B (Industrial Scale): 45%** (Range: 40–50%)
    *   *Basis:* Standard for unprecedented systems (TRL 6 transitioning to TRL 9). The leap from 100 kg pathfinder processing to 1 kt/yr continuous processing is non-linear.

### 2.2 Schedule Margin
*   **Phase 0A:** 2 months per year of development (approx. 17%).
*   **Phase 0B:** 3 months per year of development (approx. 25%), plus a hard 12-month launch window reserve for the MW-class cargo tugs and mining plant.

### 2.3 Technical Margin (Held at System Level)
*   **Mass Margin:** 30% on all dry masses prior to PDR; 20% at CDR; 10% at Delivery.
*   **Power Margin:** 30% reserve on peak power load (critical for the 1-3 kV tethered mining robots and EP tugs).
*   **Delta-V Margin:** 15% above nominal trajectory requirements for EP tugs (accounting for missed thrust days and safe-mode recoveries).

## 3. Subsystem Breakdown: Contingency Allocation

```text
[Project Dyson Total Budget]
   |
   +-- [Base Cost Estimate - BCE]
   |      |-- 0A: Pathfinders, R&D, NRE
   |      |-- 0B: Tugs, Plant, Launch, Ops
   |
   +-- [Contingency & Reserve - UFE]
          |
          +-- 0A Reserve Pool (35% of 0A BCE)
          |     |-- 15% Held by Subsystem Managers (Design tweaks)
          |     |-- 20% Held by Project Manager (Major redesigns/Launch delays)
          |
          +-- 0B Reserve Pool (45% of 0B BCE)
                |-- 10% Held by Subsystem Managers
                |-- 25% Held by Project Manager
                |-- 10% Held by Dyson Board (Strategic reserve / Option gate)
```

## 4. Management, Control, and Release Authority

Reserves are not a slush fund. Release of UFE requires formal Change Requests (CRs) evaluated against the D-02 life-cycle gates.
*   **Level 1 (Subsystem):** Managed by technical leads for component-level mass/power/cost growth.
*   **Level 2 (Project):** Managed by the Phase 0 Director. Triggered by interface mismatches, test failures, or schedule slips requiring overtime/expediting.
*   **Level 3 (Board):** Managed by Project Dyson Executive Board. Triggered by exogenous shocks (e.g., launch provider bankruptcy, regulatory delays under D-03 ALARP requirements).

## 5. Cost Analysis and Budget Estimates

Assuming a baseline cost estimate (BCE) derived from the aggregation of bom-0-1 through bom-0-16:

*   **Phase 0A BCE Estimate:** ~$2.5B - $4.0B
    *   **0A Contingency (35%):** $0.88B - $1.40B
*   **Phase 0B BCE Estimate:** ~$12.0B - $18.0B
    *   **0B Contingency (45%):** $5.40B - $8.10B

**Total bom-0-17 Cost Range: $6.28B - $9.50B**
*(Note: This fits within the lower-to-mid end of Claude's $5–27B range, assuming strict cost controls on the baseline architecture).*

## 6. Risk Assessment and Open Questions

### Primary Risks to the Reserve
1.  **Microgravity Metallurgy Failure:** If the primary Fe-Ni extraction fails in the relevant environment (TRL 6), the pivot to Earth-supplied material (fallback) will consume massive schedule and financial reserve.
2.  **EP Propellant Volatility:** If iodine (D-05) causes unforeseen corrosion on the MW-class tugs during life tests, pivoting to argon will require redesigning the feed systems and thermal management, eating into the 0A reserve.
3.  **Regulatory Delays:** Licensing an autonomous nuclear/high-power mining operation may stall, burning standing-army costs (schedule reserve).

### Open Engineering & Programmatic Questions
*   *Burn Rate:* What is the standing army cost per month during Phase 0B integration? (This directly sizes the schedule-driven financial reserve).
*   *Currency/Inflation:* Are reserves held in nominal dollars adjusted for inflation over the 10-15 year Phase 0 lifecycle, or real dollars? Recommendation: Tie 15% of the Board-level reserve to an inflation index.