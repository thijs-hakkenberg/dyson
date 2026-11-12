---
bomId: "bom-0-17"
itemName: "Contingency and Reserve"
itemSlug: "contingency-reserve"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-21"
phase: "phase-0"
---

# bom-0-17 — Contingency and Reserve
## Technical and Financial Control Proposal for Phase 0A and Gated Phase 0B

### Executive recommendation

Treat contingency and reserve as a **controlled financial capability**, not a miscellaneous hardware allowance and not permission to proceed with an immature design.

I recommend the following initial planning provisions:

| Phase | Recommended contingency and reserve | Percentage basis | Funding treatment |
|---|---:|---|---|
| **0A — Research, qualification and pathfinders** | **35–40%** | Unburdened, estimate-at-completion cost of the authorized 0A scope | Fund with 0A, subject to annual appropriation and release controls |
| **0B — Industrial deployment** | **40–50% at present maturity** | Unburdened estimate for the selected, demand-sized 0B configuration | Record as an **uncommitted planning provision**, not authorized expenditure |
| **0B at KDP-0B** | Recalculate from demonstrated performance, contracts and integrated risk analysis | Frozen 0B cost and schedule baseline | Fund only after all four discriminating gates and mandatory TRL requirements pass |

These percentages are **engineering planning recommendations**, not demonstrated statistical confidence levels. The programme should target a jointly assessed **P80 cost-and-schedule funding envelope**, but must not label a percentage-derived budget “P80” before completing the analysis.

The principal recommendation is:

> **Authorize 0A with explicit reserves; preserve 0B as a real option. Do not spend reserve to evade a failed target, demand, economics, licence or technology gate.**

All monetary examples below are in **constant 2026 USD**, excluding financing costs. Future-year inflation and currency exposure require separate, explicit treatment.

---

## 1. Scope and design philosophy

### 1.1 What this item purchases

This line provides controlled funding for uncertainty within the approved Phase 0 architecture:

- Additional iterations of research, qualification and demonstration.
- Cost growth in contracted equipment and services.
- Unplanned but scope-consistent engineering changes.
- Recovery from bounded test or deployment failures.
- Schedule extension, including mission operations and supplier retention.
- Responses to unresolved technical and regulatory uncertainties.

It does **not** procure arrays, spacecraft, spares, propellant or processing capacity directly. Those remain in bom-0-1 through bom-0-16.

When reserve is released, the expenditure is assigned to the relevant execution item and the reserve balance is reduced. This preserves traceability and avoids counting the same expenditure twice.

### 1.2 What reserve must not conceal

The following belong in base estimates, not contingency:

- Planned qualification articles and destructive tests.
- The approved pathfinder campaign.
- Expected spares and replacements.
- Nominal launch and delivery.
- Nominal mission operations and paid communications services.
- Planned EP propellant purchases.
- Required containment, debris mitigation and waste-heat rejection.
- Known design changes already accepted by configuration control.

Likewise, these are **not ordinary reserve-funded overruns**:

- Increasing industrial output beyond signed Phase 1 demand.
- Adding water production without an approved C-type target and business case.
- Adding solar-grade silicon or oxide-derived aluminium production.
- Introducing crew, habitats or cryogenic propellant production.
- Returning to centralized bulk-ore processing at SEL4/L5.

Those constitute scope changes or violations of the revised architecture.

---

## 2. Reserve architecture

### 2.1 Two financial layers, one reported total

For this proposal, use the following internal definitions. Contract-specific terminology may differ.

| Layer | Purpose | 0A planning provision | 0B planning provision |
|---|---|---:|---:|
| **Project contingency** | Identified and modelled uncertainties within approved scope | 25–30% of base | 30–40% of base |
| **Programme management reserve** | Unallocated allowance for emergent, in-scope uncertainty and model incompleteness | 10% of base | 10% of base |
| **Total bom-0-17** | Sum of the two layers | **35–40%** | **40–50%** |

Both components use the **same unburdened base**. They are added, not compounded.

There is no third automatic “owner contingency” stacked above these figures. Any owner-held programme-change fund must be reported separately and justified explicitly.

### 2.2 Percentage basis

For phase \(p\):

\[
B_p=\sum_{i=1}^{16}B_{i,p}
\]

where \(B_{i,p}\) is the approved, scope-complete base estimate for item \(i\), allocated to that phase and stripped of duplicate financial contingency.

\[
R_p=r_pB_p
\]

\[
F_p=B_p+R_p
\]

where:

- \(B_p\): base cost.
- \(r_p\): reserve fraction.
- \(R_p\): bom-0-17 provision.
- \(F_p\): total phase funding requirement in constant dollars.

**Important accounting distinction:** a supplier’s firm-fixed-price bid is a purchase price, even if the supplier has priced its own business risk. Do not attempt to remove an imaginary supplier contingency. Remove only identifiable duplicate programme allowances.

### 2.3 Control architecture

```text
       Signed Phase 1 requirements / approved 0A objectives
                              |
                              v
              Configuration-controlled scope baseline
                              |
               +--------------+---------------+
               |                              |
               v                              v
      Base estimates, items 1–16      Integrated risk model
               |                     cost + schedule + gates
               +--------------+---------------+
                              |
                              v
                   Phase funding envelope
                              |
               +--------------+---------------+
               |                              |
               v                              v
        Project contingency           Programme reserve
        Controlled drawdown           Higher-level approval
               |                              |
               +--------------+---------------+
                              |
                              v
                  Authorized change package
                              |
                              v
             Execution cost assigned to correct BOM item
```

Separate ledgers are required for 0A and 0B. An uncommitted 0B planning allowance cannot be used as an informal source of additional 0A funds.

---

## 3. Quantities, costs and estimating basis

### 3.1 Recommended quantities

The deliverable consists of:

- **Two phase-specific reserve accounts:** one for 0A and one for 0B.
- **Two integrated cost-and-schedule risk models**, with a shared interface and dependency register.
- **One programme-wide configuration and risk taxonomy.**
- Monthly reserve reconciliation.
- Quarterly integrated risk updates.
- Independent reserve-adequacy reviews before major commitments.

These are administrative and analytical quantities, not flight hardware.

### 3.2 Cost per unit of base programme expenditure

| Unburdened phase base | 0A reserve, 35–40% | 0B reserve, 40–50% |
|---:|---:|---:|
| $1 billion | $350–400 million | $400–500 million |
| $5 billion | $1.75–2.00 billion | $2.00–2.50 billion |
| $10 billion | $3.50–4.00 billion | $4.00–5.00 billion |

This normalized presentation is preferable to asserting a stand-alone dollar total before the other sixteen items have reconciled bases.

### 3.3 Worked example — illustrative, not an approved programme estimate

Assume, solely to demonstrate the arithmetic:

- 0A base: **$2 billion**.
- Demand-sized 0B base: **$20 billion**.

| Phase | Illustrative base | Reserve | Total including reserve |
|---|---:|---:|---:|
| 0A | $2.0B | $0.70–0.80B | $2.70–2.80B |
| 0B | $20.0B | $8.0–10.0B | $28.0–30.0B |
| Combined conditional envelope | $22.0B | $8.70–10.80B | $30.70–32.80B |

Only the 0A amount would be eligible for current authorization under D-01. The 0B figures remain conditional.

### 3.4 Disagreement with the round-2 proposals

**Claude: 30–40% for 0A; 35–50% for 0B**

Broadly reasonable. I recommend the upper part of the 0A range because the programme combines uncertain target properties, microgravity process development and long-duration autonomous operations. For present-day 0B planning, I would not use 35% without stronger evidence.

The quoted **$5–27B** reserve range cannot be adopted independently: it needs explicit phase bases, price-year treatment and a statement of included risks.

**Gemini: 30% for 0A; 25% for 0B**

I disagree with the implied reduction to 25% for industrial deployment at current maturity. Replication of flight-qualified equipment can reduce unit uncertainty, but 0B still couples mining, metallurgy, power, thermal rejection, EP logistics and receiving operations. These risks are not independent.

A 25% 0B provision might eventually be justified by a mature estimate and favourable risk analysis. It is not justified simply because 0A precedes 0B.

**GPT: 30–40% for both phases**

Reasonable for 0A. For 0B, I recommend a higher provisional upper bound until the target, process yield, delivered throughput, tug availability and supplier pricing are demonstrated together.

---

## 4. Technical specifications and engineering interfaces

### 4.1 Physical specification

Contingency is not a spacecraft subsystem.

| Attribute | Specification for bom-0-17 |
|---|---|
| Flight dimensions | Not applicable |
| Flight mass | No independently assigned mass |
| Flight electrical load | No independently assigned load |
| Thermal dissipation | No independently assigned thermal load |
| Storage volume | Not applicable |
| Direct production throughput | None |
| Primary performance measure | Ability to absorb approved uncertainty without violating gates or concealing scope changes |

Financial reserves must nevertheless reflect mass, power and thermal uncertainty in the equipment lines.

### 4.2 Financial reserve is not engineering margin

Three separate concepts must remain visible:

1. **Engineering margin:** capacity intentionally designed into equipment.
2. **Financial reserve:** money available to respond to uncertainty.
3. **Schedule reserve:** time available before an external commitment is missed.

For example, a larger radiator may consume mass and launch capacity; reserve money alone cannot create spare radiator area after deployment.

The risk model must therefore propagate:

```text
Lower process efficiency
          |
          +--> More electrical energy per tonne
          |          |
          |          +--> Array / distribution growth
          |
          +--> More rejected heat --> Radiator growth
          |
          +--> Lower throughput --> More operating time
                                      |
                                      +--> Operations cost
                                      +--> Delivery-date risk
```

The radiator, power-system and operations changes remain owned by their corresponding BOM items.

### 4.3 Required baseline interfaces

Every relevant subsystem estimate must provide:

- Current best-estimate mass and uncertainty.
- Peak and average electrical loads.
- Heat rejection by temperature regime.
- Production or transport performance assumptions.
- Design life and replacement assumptions.
- Supplier and launch pricing basis.
- Schedule dependencies.
- Existing engineering margins.
- Existing financial allowances.
- Relevant technology readiness and advancement difficulty.
- Evidence supporting each uncertainty distribution.

The model must use the revised architecture: at-target beneficiation and primary processing, Fe-Ni baseline product, MW-class cargo tugs, uncrewed operations and a conditional SEL1 receiving node.

---

## 5. Risk-analysis method

### 5.1 Integrated cost and schedule model

Use an integrated stochastic model containing:

- Work-package cost uncertainty.
- Discrete risk events.
- Schedule dependencies.
- Resource-constrained critical paths.
- Delivery opportunities and transport timing.
- Correlations and common-cause failures.
- Decision branches for target rejection, redesign or termination.

Cost uncertainty should not be represented only by independent triangular distributions. That approach tends to understate shared risks.

Examples of important dependencies:

- Target properties affect excavation, recovery yield and equipment wear.
- Process performance affects power, radiator sizing and production rate.
- EP performance affects propellant demand, payload fraction and delivery cadence.
- Common software or manufacturing defects affect multiple robots or tugs.
- Launch delays can affect commissioning, operations cost and delivery dates simultaneously.

### 5.2 Statistical performance requirements

Recommended analytical requirements:

- At least **10,000 simulated programme outcomes** for routine updates.
- Increase runs until reported decision percentiles are stable; target **less than 1% movement** in the reported P80 cost under additional sampling.
- Report P50 and P80 cost, schedule and joint outcomes.
- Report the probability of programme termination separately.
- Test sensitivity to correlation assumptions and tail-event treatment.
- Independently review model structure before KDP-0B.

The intended funding criterion is:

\[
P(C\leq F \;\land\; T\leq D)\geq 0.80
\]

where \(F\) is the funding envelope and \(D\) the approved delivery date.

Two separate P80 results—one for cost and one for date—do **not** establish 80% joint confidence.

### 5.3 Programme-ending outcomes

Some outcomes should terminate or redirect the programme rather than generate an arbitrarily large contingency requirement.

Examples:

- No suitable target is confirmed.
- Native/reduced Fe-Ni processing fails to meet product requirements.
- Licensing cannot be obtained.
- Phase 1 does not provide signed demand.
- Industrial economics fail the approved decision criterion.
- A project-ending technology fails the mandatory TRL 6 requirement.

For these cases, report:

1. Probability of reaching the gate.
2. Expenditure to the gate.
3. Bounded safe-shutdown or preservation cost.
4. Consequences for Phase 1 procurement.

Earth-supplied material is the fallback planning case, not an unlimited reserve-funded continuation of asteroid industrialization.

---

## 6. Phase-specific risk priorities

### 6.1 Phase 0A

Reserve priorities should be:

1. Representative-material testing and target characterization.
2. Repeated microgravity processing experiments.
3. Integrated power, thermal and containment testing.
4. Autonomous excavation and anchoring demonstrations.
5. EP life testing and propellant qualification.
6. Recovery from a failed or inconclusive pathfinder.
7. Additional regulatory evidence and environmental modelling.

A second demonstration opportunity may be prudent, but a **planned** second article belongs in the base estimate. Reserve covers an unplanned repeat or recovery within the approved demonstration strategy.

### 6.2 Phase 0B

Dominant uncertainties include:

| Risk | Principal consequence | Reserve treatment |
|---|---|---|
| Recoverable metal fraction below expectation | Lower production; more processing time | Model yield, energy and operating-cost effects together |
| Abrasive or adhesive feedstock behaviour | Wear and downtime | Link to maintenance and replacement assumptions |
| Metallurgy or product-quality shortfall | Rework, rejection or failure to qualify | Do not assume reserve can rescue an unproven process |
| Tug availability below prediction | Missed delivery cadence | Model fleet-level reliability and common causes |
| EP propellant qualification or supply disruption | Redesign, procurement delay | Maintain iodine-reference/argon-alternate scenarios |
| Array or radiator growth | Mass, launch and integration cost growth | Propagate through the physical design |
| Licence conditions tighten | Design changes or reduced operations | Include bounded compliance scenarios; preserve stop option |
| Receiving-node delay | Product storage and transport disruption | Model jointly with Phase 1 |

The economics gate should use **delivered, accepted product**, not extracted material or nameplate plant output.

---

## 7. Schedule reserve

Schedule reserve must be stated in time as well as money.

For initial scenario analysis, test:

- **0A:** a recoverable **6–12-month** extension.
- **0B:** a **12–24-month** commissioning or ramp-up delay.

These are stress-test ranges, not approved schedule allowances. The final values must follow the critical path, launch availability and target-specific transport opportunities.

For each delay scenario:

\[
C_{\text{delay}}=
C_{\text{staff retention}}
+C_{\text{operations}}
+C_{\text{supplier extension}}
+C_{\text{storage}}
+C_{\text{revalidation}}
+C_{\text{logistics change}}
\]

Do not apply the programme’s average monthly expenditure indiscriminately. A commissioning delay does not necessarily repeat hardware purchases, while a missed transport opportunity may trigger costs disproportionate to the delay duration.

---

## 8. Autonomy, control and communications requirements

### 8.1 Financial control remains human-authorized

No autonomous spacecraft or production controller may authorize financial reserve expenditure.

Automated systems may:

- Detect performance deviations.
- Forecast maintenance or replacement needs.
- Estimate likely effects on throughput.
- Generate evidence for a change request.

They must not change the approved production commitment or initiate unbounded procurement.

### 8.2 Proposed release authority

| Reserve action | Minimum approval |
|---|---|
| Draw up to 1% of the phase base, within approved scope | Project manager and independent cost-control concurrence |
| Draw above 1% and up to 3% of phase base | Programme change-control board |
| Draw above 3%, or with material architecture/interface effects | Owner approval |
| Any gate waiver or prohibited scope expansion | Not permitted through reserve release |

Every draw must include:

- Risk or change identifier.
- Technical justification.
- Alternatives considered.
- Cost and schedule effect.
- Revised estimate at completion.
- Remaining risk exposure.
- Required configuration changes.

Monthly reporting should show commitments, expenditure, forecast exposure and remaining reserve separately.

### 8.3 Operational data interfaces

Use existing communications and ground-segment services; no separate spacecraft communications network is required.

Necessary evidence includes:

- Equipment duty cycles and degradation.
- Actual process yield.
- Product rejection and rework rates.
- Power and thermal performance.
- Propellant consumption and thruster condition.
- Failures, recovery time and maintenance interventions.

Operational communications latency must not prevent safe local shutdown. That autonomy belongs in the relevant equipment specifications, not in this reserve line.

---

## 9. Manufacturing and procurement considerations

Reserve management should reflect how failures propagate through production.

### Recommended procurement approach

- Qualify first articles before committing the full industrial batch.
- Use staged purchase options rather than unconditional fleet orders.
- Preserve supplier traceability and configuration records.
- Distinguish random unit failure from batch-wide defects.
- Identify long-lead replacement bottlenecks.
- Carry contractual pricing and schedule exposure explicitly.

For example, a manufacturing defect common to multiple tug propulsion units cannot be modelled as independent failure probabilities for every tug. It may require inspection, rework or replacement across a batch.

Base-budget spares remain under bom-0-14. Reserve should not duplicate them. It should address departures from the assumptions used to size those spares.

The personnel, tools and independent reviews needed to operate this control system belong under organizational infrastructure and relevant NRE lines. Their recurring costs should not be charged to the reserve principal.

---

## 10. Development roadmap and readiness

| Milestone | Required reserve-management deliverable |
|---|---|
| **0A authorization** | Separate 0A base and reserve; preliminary conditional 0B provision |
| **Early 0A** | Risk taxonomy, linked cost/schedule model, supplier and launch estimate reconciliation |
| **Internal TRL 4–5 milestones** | Updated uncertainty distributions using measured evidence |
| **Integrated pathfinder review** | Demonstrated yield, reliability, autonomy and thermal-performance inputs |
| **Pre-KDP-0B** | Independent estimate; correlated risk analysis; contractual exposure review |
| **KDP-0B** | Demand-sized baseline; funded reserve; approved schedule; all mandatory gates passed |
| **0B deployment and commissioning** | Monthly controls, quarterly model updates and staged reserve release |

The reserve-control process itself is not usefully assigned a spacecraft TRL.

Under D-02, **every project-ending technology must reach TRL 6 in a relevant environment before KDP-0B, without waivers**. Additional money is not equivalent to technical readiness.

---

## 11. Reserve consumption and warning thresholds

Reserve adequacy should be assessed against **remaining risk**, not merely percentage spent.

Proposed review triggers:

- More than **20% of initial reserve consumed before preliminary design review**.
- More than **40% consumed before critical design review**.
- Remaining reserve below the modelled cost of remaining uncertainty.
- A single risk capable of consuming more than **25% of remaining reserve**.
- Forecast delivery outside the approved joint-confidence envelope.
- A critical technology’s readiness evidence becomes invalid after redesign.

These trigger independent review and possible replanning, not automatic cancellation.

Reserve should be released only when the underlying risk is demonstrably retired. Passing a calendar milestone is not sufficient.

---

## 12. Open engineering and programme questions

Before adopting final dollar values, Project Dyson must resolve:

1. **What are the reconciled 0A and 0B bases?**  
   The reserve cannot be priced credibly until all sixteen other items have consistent boundaries.

2. **What delivery specification will Phase 1 sign?**  
   Quantity, alloy composition, impurity limits, physical form, acceptance testing, location and delivery dates materially affect uncertainty.

3. **What constitutes acceptable relevant-environment evidence?**  
   Especially for microgravity excavation, feed handling, metallurgy and long-duration containment.

4. **How representative are terrestrial test materials?**  
   Laboratory success may not adequately characterize actual target variability.

5. **Which EP propellant and supply chain will be selected?**  
   Continue costing iodine as reference and argon as alternate; retain water EP only as the conditional desk study specified in D-05.

6. **What debris and contamination ceiling will be licensed?**  
   D-03 remains interim. Reserve is not permission to operate above the eventual requirement.

7. **Will SEL1 remain the receiving location?**  
   D-04 is the reference case, not an irrevocable decision.

8. **What is the bounded closeout obligation after a failed gate?**  
   Include spacecraft safing, tracking, disposal or preservation, contractual termination and data retention.

9. **How will Earth-supplied fallback material be financed?**  
   It should be a separately approved Phase 1 procurement decision, not hidden inside asteroid-processing contingency.

---

## Final recommendation

Adopt **35–40% for funded 0A** and **40–50% for the current conditional 0B planning estimate**, both applied to clearly defined, contingency-free phase bases.

Re-estimate 0B at KDP-0B using measured performance, signed demand, supplier evidence and an integrated cost-and-schedule model. Do not promise a lower percentage in advance.

The most important reserve is the ability to **stop before industrial commitment**. Phase 0A should purchase evidence; bom-0-17 should protect that evidence-gathering programme from ordinary uncertainty—not finance an attempt to overcome a failed fundamental premise.