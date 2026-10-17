---
step: gates
item: gates
modelId: gemini-3-1-pro
modelName: "Gemini 3.1 Pro"
endpoint: databricks-gemini-3-1-pro
generated: 2026-10-17T21:55:17.811Z
seconds: 29.273
---

Here is the proposed Phase 0 gate set under the D-02 rule, reflecting the revised architecture, the TRL baseline, and the open-question register.

### 1. KDP Structure

*   **KDP-0A (Month 0):** Authorises Phase 0A (research, remote survey, ground R&D, pathfinder demonstrator). Pre-committed outcome on pass: fund 0A.
*   **0A Mid-Term Review (Month 36–60):** Assesses ground R&D, early scout data, and pathfinder progress. Timing is driven by the 3–6 year minimums to reach TRL 4–5 for high-AD² technologies (e.g., T04 excavation, T07/T23 or T06 metallurgy). Pre-committed outcome on pass: continue 0A, down-select contested metallurgy route. On fail: restructure 0A or cancel pathfinder.
*   **KDP-0B (Month 72–120):** The gated real option for Phase 0B in-space production. Timing is driven by the 6–10+ year estimates to reach TRL 6 for project-ending technologies (T01 MW SEP, T04 excavation, T18 subsurface assay). Pre-committed outcome on pass: authorise 0B production ramp, sized by demand. On fail: fallback to "0A only, Earth supply for Phase 1".

### 2. Technology Criteria

*   **0A Mid-Term Review:** Requires TRL 4–5 (component/breadboard validation in laboratory or relevant environment) for critical path items. High AD² (6–7) items like T04 (Excavation), T07 (Partial-g melting), and T16 (Anchoring) must show physical experimental evidence (not just simulation) to pass.
*   **KDP-0B:** Requires strict TRL 6 (system/subsystem model or prototype demonstration in a relevant environment) for all project-ending technologies (T01, T02, T03, T04, T05, T08, T10, T11, T14, T15, T16, T18, T19, T21, T22, T24, T25). No waivers permitted.

### 3. Discriminating Gates (Non-TRL)

*   **Target (g-target):** Requires physical sampling (T18) confirming recoverable native Fe-Ni grade. Threshold set by `rq-0-50`.
*   **Demand (g-demand):** Requires signed Phase 1 schedule within 3× of Phase 0 output capacity. Threshold set by `rq-0-58`.
*   **Economics (g-economics):** Delivered $/kg of Fe-Ni to SEL1 must undercut Earth supply costs. Threshold set by `rq-0-61`.
*   **Licence (g-licence):** Licensing state must agree to the debris/tailings management plan. Threshold: interim ≤1 t/yr escaped per site (D-03), validated by `rq-0-41`.

### 4. Failure Outcomes

Failure at KDP-0B or any of the four discriminating gates triggers the pre-committed fallback: **"0A only, Earth supply"**. The project will not proceed with in-space production (0B) and will instead source Phase 1 materials from Earth, utilizing 0A assets solely for science, prospecting, and long-term R&D.

### 5. What Changes from the Current Gates

*   **Retire `gate-2` (Cryogenic Propellant):** Phase 0 architecture explicitly excludes production LOX/LH2.
*   **Revise `gate-1` (Microgravity Materials):** Narrowed strictly to native/reduced Fe-Ni (Si and Al deferred). Split into the contested metallurgy routes (T06, T07, T23).
*   **Revise `gate-3` (ISRU Water):** Scaled down to a 10–100 t/yr pilot at a C-type target only (T13). No longer a critical path for Phase 0 transport closure.
*   **Revise `gate-4` (Target):** Replaced by `g-target` and tied to physical scout sampling (T11, T18) rather than just telescopic data.
*   **Revise `gate-5` (PDR):** Replaced by `KDP-0B` and the four discriminating gates, enforcing strict TRL 6 without waivers.

```yaml
gates:
  - id: kdp-0a
    name: Phase 0A Authorisation
    type: kdp
    month: { min: 0, max: 0 }
    purpose: Authorise Phase 0A research, scout builds, and pathfinder demonstrator.
    criteria:
      - id: kdp-0a-c1
        description: Baseline architecture and funding approved
        metric: Signed D-01 and D-02 decisions
        threshold: Approved
        technologies: []
        trl_required: null
        evidence_from: [decisions.md]
    pass: Fund 0A.
    fail: Project hold.
  - id: 0a-mtr
    name: Phase 0A Mid-Term Review
    type: review
    month: { min: 36, max: 60 }
    purpose: Assess ground R&D and down-select metallurgy route before pathfinder integration.
    criteria:
      - id: 0a-mtr-c1
        description: Critical sub-systems reach laboratory validation
        metric: TRL assessment
        threshold: TRL 4
        technologies: [T04, T06, T07, T16, T18, T23]
        trl_required: 4
        evidence_from: [rq-0-11, rq-0-26, rq-0-56]
    pass: Continue 0A; down-select metallurgy route.
    fail: Restructure 0A ground R&D; delay pathfinder.
  - id: g-target
    name: Target Grade Confirmation
    type: discriminating
    month: { min: 48, max: 84 }
    purpose: Confirm recoverable Fe-Ni grade at candidate NEA.
    criteria:
      - id: g-target-c1
        description: Sampled recoverable grade
        metric: Fe-Ni mass fraction
        threshold: set by rq-0-50
        technologies: [T11, T18]
        trl_required: 7
        evidence_from: [rq-0-50]
    pass: Target baselined for 0B.
    fail: 0A only, Earth supply.
  - id: g-demand
    name: Phase 1 Demand Signature
    type: discriminating
    month: { min: 60, max: 96 }
    purpose: Ensure Phase 1 actually requires Phase 0 output.
    criteria:
      - id: g-demand-c1
        description: Signed Phase 1 material demand
        metric: kt/yr demanded vs capacity
        threshold: set by rq-0-58
        technologies: []
        trl_required: null
        evidence_from: [rq-0-58]
    pass: Demand baseline set.
    fail: 0A only, Earth supply.
  - id: g-economics
    name: Delivered Cost Viability
    type: discriminating
    month: { min: 60, max: 96 }
    purpose: Prove in-space production is cheaper than Earth launch.
    criteria:
      - id: g-economics-c1
        description: Delivered $/kg to SEL1
        metric: $/kg
        threshold: set by rq-0-61
        technologies: []
        trl_required: null
        evidence_from: [rq-0-57, rq-0-61]
    pass: Economic case closed.
    fail: 0A only, Earth supply.
  - id: g-licence
    name: Debris and Tailings Licence
    type: discriminating
    month: { min: 60, max: 96 }
    purpose: Secure regulatory approval for asteroid processing.
    criteria:
      - id: g-licence-c1
        description: Escaped mass per site
        metric: t/yr
        threshold: <= 1
        technologies: [T08]
        trl_required: 6
        evidence_from: [rq-0-41]
    pass: Regulatory approval granted.
    fail: 0A only, Earth supply.
  - id: kdp-0b
    name: Phase 0B Authorisation
    type: kdp
    month: { min: 72, max: 120 }
    purpose: Authorise Phase 0B in-space production ramp.
    criteria:
      - id: kdp-0b-c1
        description: All project-ending technologies validated in relevant environment
        metric: TRL assessment
        threshold: TRL 6
        technologies: [T01, T02, T03, T04, T05, T08, T10, T14, T15, T16, T18, T19, T21, T22, T24, T25]
        trl_required: 6
        evidence_from: [rq-0-62, rq-0-54]
    pass: Authorise 0B production ramp.
    fail: 0A only, Earth supply.
retired: [gate-1, gate-2, gate-3, gate-4, gate-5]
```
