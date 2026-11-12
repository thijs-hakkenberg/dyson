---
bomId: "bom-0-7"
itemName: "Organizational Infrastructure"
itemSlug: "organizational-infrastructure"
modelId: "gemini-3-1-pro"
modelName: "Gemini 3.1 Pro"
generated: "2026-10-20"
phase: "phase-0"
---

# Technical Proposal: Organizational Infrastructure (bom-0-7)
**Phase 0A - Space Resource Processing**

## 1. Recommended Approach and Design Philosophy
The organizational infrastructure for Project Dyson’s Phase 0 must bridge the gap between a globally distributed, open-source research community and a highly regulated, high-liability deep-space industrial operation. 

Our design philosophy treats the organization as a critical system architecture. We adopt a **bifurcated entity model**: separating the governance and IP-holding functions (prioritizing openness and long-term mission alignment) from the flight operations and liability-holding functions (prioritizing regulatory compliance, export control, and risk ring-fencing). 

## 2. System Architecture (Governance & Legal)

The architecture utilizes two distinct legal entities bound by a master charter and licensing agreements.

```text
+---------------------------------------+       +---------------------------------------+
|           ENTITY A (Governance)       |       |           ENTITY B (Operator)         |
|---------------------------------------|       |---------------------------------------|
| Type: Swiss Verein (Association)      |       | Type: Luxembourg S.A. or US C-Corp    |
| Role: IP Holder, Mission Charter,     |=====> | Role: Flight Ops, Hardware Ownership, |
|       Community Management, Standards | (IP & |       Launch Licensing, Liability     |
| Board: 5-7 Members (Staggered 3yr)    | Funds)| Board: Appointed by Entity A + Indep. |
| Licensing: CERN OHL v2, CC-BY-SA 4.0  |       | Compliance: ITAR/EAR, COSPAR, ITU     |
+---------------------------------------+       +---------------------------------------+
        |                  |                                      |
        v                  v                                      v
+---------------+  +---------------+                      +---------------+
| Independent   |  | Independent   |                      | PM / SE / MA  |
| Safety Review |  | Cost Review   |                      | (Excluded     |
| (1-2 FTE)     |  | (1-2 FTE)     |                      | from bom-0-7) |
+---------------+  +---------------+                      +---------------+
```

## 3. Technical Specifications

Unlike flight hardware, bom-0-7 exists entirely terrestrially.
*   **Orbital Allocation:** 0 t/yr mass, 0 MW orbital power, 0 t/yr propellant.
*   **Terrestrial Power:** 0.02 MW (20 kW) continuous for IT infrastructure, archive mirrors, and core office facilities.
*   **Staffing (Phase 0A):** 15 Full-Time Equivalents (FTEs). Range: 14–20.
*   **Data Archive:** 3 independent geographic replicas. Logical ingest of 2–20 TB/yr, scaling to ~600 TB over 10 years. Annual bare-metal restore testing required.

## 4. Subsystems Breakdown and Interfaces

*   **Legal and Regulatory Subsystem:** Handles mission authorization, COSPAR Category II notifications (uncrewed deep space), ITU spectrum filings, and export control (ITAR/EAR). A strict "export classification before publication" gateway is implemented to prevent open-source mandate violations.
*   **IT and Archive Subsystem:** Maintains the triple-redundant engineering and governance archive. Hosts the restricted annex for export-controlled hardware specifications.
*   **Independent Assurance Subsystem:** Houses the Independent Safety Authority and Independent Cost Estimate Review. Placed within bom-0-7 (rather than PM/SE) to ensure structural independence from schedule pressure.
*   **Interfaces:** bom-0-7 interfaces with PM/SE/MA (which manages the actual $1.5B+ hardware engineering effort) strictly through funding gates, compliance audits, and IP licensing.

## 5. Development Roadmap (Phase 0A)

*   **Month 1-3:** Legal incorporation of Entity A (Switzerland) and Entity B (Jurisdiction TBD - Luxembourg or US).
*   **Month 4-6:** Establishment of IT infrastructure, 3x redundant archive, and initial staffing (Core 15 FTEs).
*   **Month 6-9:** Finalization of export control framework, restricted annex protocols, and independent review board charters.
*   **Month 12:** KDP-0A Review (Readiness to support pathfinder hardware procurement).

## 6. Cost Analysis and Budget Estimates (10-Year Baseline)

The budget for bom-0-7 is sized for a 10-year duration covering Phase 0A and the governance of 0B. *Note: Flight hardware, PM/SE, launch delivery, and in-orbit Third-Party Liability (TPL) premiums are excluded from this specific BOM line.*

| Item | 10-Year Cost Estimate (USD) | Basis of Estimate |
| :--- | :--- | :--- |
| **Entity Formation & Setup** | $5,000,000 | Legal counsel, jurisdiction selection, charter drafting. |
| **Core Staffing (15 FTEs)** | $37,500,000 | 15 FTEs @ $250k/yr fully burdened average over 10 years. |
| **External Counsel & Filings** | $15,000,000 | ITU, COSPAR, Export Control, IP filings (~$1.5M/yr). |
| **IT Infrastructure & Archive** | $10,000,000 | 600 TB 3x redundant storage, secure enclaves, bandwidth. |
| **Insurance Administration** | $2,500,000 | Broker fees and admin (Premiums/Loss reserves excluded). |
| **Contingency (20%)** | $14,000,000 | Standard programmatic reserve for legal/regulatory delays. |
| **TOTAL (bom-0-7)** | **$84,000,000** | **Range: $65M - $110M** |

*Liquidity Reserve (Financing): An additional $10M-$15M (1-2 years OpEx) must be held as a financing reserve, not booked as sunk expenditure.*

## 7. Risk Assessment

1.  **Regulatory Denial (High Impact, Medium Probability):** The chosen jurisdiction (US or Luxembourg) may refuse to license a deep-space resource mission governed by an open-source/copyleft entity. *Mitigation:* The bifurcated structure isolates the operator; strict export-control annexes demonstrate compliance.
2.  **Export Control Violations (High Impact, Low Probability):** Accidental publication of ITAR/EAR restricted thruster or power systems data to the public archive. *Mitigation:* Pre-publication classification review is mandatory.
3.  **Governance Capture (Medium Impact, Medium Probability):** The Swiss Verein board is captured by specific industrial interests, violating the non-profit mandate. *Mitigation:* Staggered terms, strict term limits (8 years max), and sortition-based advisory panels.

## 8. Open Engineering & Legal Questions

*   **Jurisdiction Selection:** Will Luxembourg's 2017 space resources law or the US Commercial Space Launch Competitiveness Act (CSLCA) provide a more stable licensing environment for Entity B? (Requires formal counsel opinion).
*   **Insurance Premiums:** What are the actual in-orbit TPL premiums for a 1-2.5 MWe cargo tug operating near a NEA? (Requires broker indications based on actual flight profiles; currently excluded from bom-0-7).
*   **Phase 0A/0B Boundary:** At what exact calendar date does the organization transition from 0A (research) to 0B (industrial), triggering the need for the full liquidity reserve?