---
bomId: "bom-0-7"
itemName: "Organizational Infrastructure"
itemSlug: "organizational-infrastructure"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-7 Organizational Infrastructure: Consensus Specification (Phase 0A)

## Key Specifications

- **No orbital allocation.** All three models assign bom-0-7 zero orbital mass, zero orbital power and zero propellant.
  - Terrestrial facility and IT load is about 20 kW. Claude puts it at 0.02 MW (range 0.01–0.05). Gemini puts it at 0.02 MW. GPT puts it at 10–50 kW.
  - This load is explicitly not drawn from bom-0-5.
- **Staffing of about 16 FTE in a 14–20 FTE envelope.** Claude says 16. Gemini says 15. GPT says 16.
  - Burdened cost is about $250k per FTE-year. Claude uses $210–290k. Gemini uses $250k. GPT uses $220–320k.
  - Outside counsel is bought for peaks rather than staffed permanently.
- **Two legal entities, with a third only if a demonstrated requirement arises.**
  - Entity A is a public-interest association: a Swiss Verein, provisional and subject to counsel verification. It owns the charter and mission.
  - Entity B is the operator and licence holder, in Luxembourg or the US. It holds authorizations, contracts and liability.
- **Scope exclusions.** PM/SE/MA, comms hardware (bom-0-9), flight operations (bom-0-10), launch (bom-0-8) and flight-specific third-party liability (TPL) premiums all sit outside bom-0-7.
  - bom-0-7 administers insurance only. Claude estimates corporate policies at $0.2–0.6M/yr. Gemini allows $2.5M over 10 years for broker fees and administration.
- **Liquidity reserve is financing, not expenditure.** Claude sizes it at $8–20M (central $12M). Gemini sizes it at $10–15M. GPT sizes it at $4.7–20M (12–24 months of run-rate).
- **Governance archive.** The archive holds three independently administered copies, with at least an annual full restore test.
  - Raw flight telemetry is excluded. Engineering data stays with its technical owners.
- **Export control before publication.** Every public release passes an export-classification gate first.
  - Controlled material goes into a restricted annex.
  - Open licences are CERN OHL v2 for hardware and CC BY-SA 4.0 for documents.
- **Independent review functions.** An Independent Safety function and an Independent Cost function (1–2 FTE each) are structurally independent of the programme executive.
  - They assess the adequacy of evidence. They do not redo engineering assurance.
- **All three reject the round-2 envelope of $100–350M as the bom-0-7 baseline.**
  - Claude: $64M for 0A, $98M for 0A+0B.
  - Gemini: $84M over 10 years.
  - GPT: $44M for 0A, about $65–135M for 0A+0B.
  - The stated reasons are scope, duration and contingency double-counting.

## Divergent Views

- **Contingency treatment**: Claude recommends excluding it entirely and holding it in bom-0-17. Gemini prefers including a 20% contingency ($14M) inside bom-0-7. GPT suggests excluding it, as Claude does, and warns that embedding it would fund uncertainty twice.
- **Costing frame and totals**:
  - Claude recommends a 7-year 0A at $64M central (plausible $40–100M; corners $30–130M), plus a gated 0B increment of $34M (plausible $20–55M).
  - Gemini prefers a single 10-year baseline covering 0A and 0B governance, at $84M (range $65–110M).
  - GPT suggests a 6-year 0A at $44M (range $31–66M), plus an illustrative 5-year 0B at $46M (range $34–69M) with 18–26 FTE.
- **Archive sizing and cost**:
  - Claude recommends about 1 TB/yr of governance data plus 10 TB/yr of released-baseline escrow. That totals about 230 TB raw over 0A, at under $3M including labour. Claude calls Gemini's figure about 4× too high.
  - Gemini prefers a 600 TB triple-redundant archive at $10M over 10 years.
  - GPT suggests 2–20 TB/yr logical ingest with a 54–720 TB infrastructure allowance. Archive sits inside about $0.4M/yr for IT, archive and security combined.
- **Reporting line of independent reviews**:
  - Claude recommends the Independent Safety Authority (ISA) report to the Operator Board Safety Committee. Its non-concurrence could be overridden only by both boards, with public disclosure. The Independent Cost Review would report to the Association Board.
  - Gemini prefers housing both functions under the governance entity (Entity A) within bom-0-7.
  - GPT suggests both report to a board committee and hold a "hold recommendation" power that ordinary management cannot override.
- **Readiness and licence-gate formalism**:
  - Claude recommends a Regulatory Readiness Level (RRL 1–6) scale. KDP-0B would require RRL 6 with no waivers; the current level is RRL 1–2.
  - Gemini prefers an early KDP-0A organizational review at month 12 and offers no licence-maturity scale.
  - GPT suggests a checklist of organizational readiness criteria and explicitly rejects assigning the organization a TRL-like rating.
- **Jurisdiction selection timing and the Earth-proximity issue**:
  - Claude recommends a must/want screen decided at month 12, with Luxembourg as lead. He flags that SEL1 deliveries of 150–300 t Fe-Ni make 0B a near-Earth liability problem. He proposes a placeholder Earth-impact ceiling of no looser than 10⁻⁶ per transfer and possible 0B TPL of $1–10M/yr.
  - Gemini prefers incorporating Entity B in months 1–3 with the jurisdiction still TBD. It frames TPL around tugs near the NEA.
  - GPT suggests selection within 6–9 months. GPT also notes that SEL1 delivery invalidates any "remote from Earth" risk assumption, but it does not quantify the exposure.

## Open Questions

1. **Where do PM/SE/MA live?** The function is unassigned in bom-0-1 to bom-0-17, and all three models exclude it from bom-0-7. Claude rates this as the largest unowned scope risk. It needs a WBS dictionary decision within about 90 days.
2. **Which state can authorize and supervise the operator?** The state must accept a non-profit-owned deep-space resource mission. Every legal citation is unverified ("verify") until counsel opinions and pre-application meetings exist.
3. **What are the approved 0A duration and pathfinder launch date?**
   - These set the cost total (5–9 years across the models).
   - They also test Claude's claim that bom-0-7 is on the critical path from month 0. Claude estimates about 4.5 years of regulatory lead before pathfinder launch.
4. **What TPL, financial-security and planetary-protection treatment applies to 0B SEL1 deliveries?**
   - The open points are the Earth-impact probability ceiling, premiums and state indemnity.
   - A further question is whether SEL1 delivery without atmospheric entry counts as "Earth return."
   - Broker indications and a regulator determination are needed before KDP-0B.
5. **What are the T26 relevant-environment criteria and command-authority design?**
   - Criteria must be defined before testing: degraded links, credential compromise and revocation, and recovery.
   - Root-key custody and operator-of-last-resort arrangements must survive both an architecture change and organizational insolvency.
6. **Are the inherited decisions valid?** The disputed "eight of nine not written back" count needs a repository audit. Each inherited deliberation needs a disposition, including undefined legacy figures such as rq-0-14's "25 kt/yr."

## Recommended Approach

1. **Adopt the two-entity structure as the 0A baseline.**
   - The Association holds reserved matters: charter, budget envelope, open-licence policy and KDP-0B approval.
   - The Operator has an independent-majority board and holds every authorization, contract and export licence.
   - Sortition is limited to bounded advisory panels.
   - The Charter Trust remains a design study only ($0.3–1.0M) until at least KDP-0B.
2. **Re-baseline cost at roughly $45–65M central for 0A (planning range about $30–100M).**
   - Build it as run-rate plus one-time costs, tied to the 0A duration rather than a 10-year total.
   - Show a separate gated 0B increment of about $34–46M, sized at KDP-0B by signed demand under D-01.
   - Record formally that the round-2 $100–350M figure is rejected because it double-counted contingency, included flight premiums and pre-funded 0B.
3. **Keep three things out of bom-0-7 as expenditure.**
   - Contingency belongs in bom-0-17.
   - Flight TPL premiums travel with their flight items. Pass the indicative $0.5–3M pathfinder premium to bom-0-12 pending a broker quote.
   - Hold the liquidity reserve ($8–20M) and a 0A wind-down escrow ($3–10M) as financing lines.
4. **Start the regulatory critical path in month 0.**
   - Commission counsel opinions in 3–4 states ($0.5–1.5M).
   - Select the jurisdiction by must/want screening within 9–12 months. A weighted score cannot rescue a failed legal prerequisite.
   - File architecture-neutral X and Ka ITU filings covering both the deep-space (NEA) and near-Earth (SEL1) regimes.
   - Own the licence gate with a no-waiver criterion at KDP-0B, mirroring the TRL-6 rule. An RRL-style scale is the recommended tracking tool.
5. **In the first 90 days, carry out three actions.**
   - Force the PM/SE/MA ownership decision.
   - Freeze configuration baseline B0 and stamp all pre-2026 L4/L5 and LOX/LH₂ documents SUPERSEDED.
   - Audit and disposition every inherited deliberation. The target is 100% dispositioned within 90 days of each conclusion.
6. **Own the governance half of T26.**
   - Root-key custody uses a 3-of-5 quorum across at least 2 jurisdictions and 3 HSM sites.
   - Operational keys must be revocable within 4 hours.
   - The organizational IT network has no direct command path to spacecraft.
   - A pre-negotiated operator of last resort is exercised annually.
   - Technical TRL maturation remains with bom-0-9 and bom-0-10.
7. **Treat SEL1 as a near-Earth licensing driver now.**
   - Negotiate the Earth-impact ceiling under the D-03 ALARP process, using bom-0-15's analysis.
   - Obtain 0B TPL indications before the licence gate.
   - Make the demand-gate offtake contract require a funded Phase 1 signatory and a full material, purity, quantity and date specification.
   - Require a side-by-side Earth-supply alternative before KDP-0B.