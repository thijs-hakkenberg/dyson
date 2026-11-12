---
bomId: "bom-0-10"
itemName: "Mission Operations"
itemSlug: "mission-operations"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-10 Mission Operations (0A + 0B): Consensus Synthesis

## Key Specifications

- **Control concept.** Supervisory, management-by-exception operations with no teleoperation of NEA assets.
  - One-way light time runs from about 1 s to about 17 min (round trip up to about 33–35 min), so ground stays out of fast control loops.
  - Ground uplinks campaign- and task-level goals; onboard autonomy handles reflexes, fault protection and safing.
  - Each model expresses this as a tiered hierarchy: Claude T0–T4, GPT four control levels, Gemini three functional tiers with local "Level 4" autonomy.
- **Ops is a separate line from comms.** bom-0-10 owns staff, MOC facilities and ground ops software. bom-0-9 owns antennas, DSN and commercial aperture time, and link services.
  - Gemini's round-2 bundling into a $1.1–1.5B comms+ops line is undone. Gemini's own revised table now excludes ground stations.
- **The round-2 $100–300M/yr run rate is rejected as a sustained base.** It implies $1–3B over 10 years, or roughly 330–1,000 FTE.
  - Claude uses the low end (~$100–120M/yr) as its pessimistic autonomy-failure case.
  - GPT accepts $100–160M/yr only for heavy commissioning or anomaly years.
  - Gemini calls the figure a "standing army" estimate.
- **Lifecycle cost convergence band is about $0.65–0.87B**, excluding programme reserve.
  - Claude: $0.57–0.87B base.
  - Gemini: $0.47–0.67B base, or $0.61–0.87B with its embedded 30%.
  - GPT: $0.65–1.21B.
- **Loaded labour rate is about $240–350k per FTE-year.**
  - Claude: $250–350k, point $300k.
  - Gemini: $250k.
  - GPT: $240–340k.
- **Facilities.**
  - One leased primary MOC and one geographically separated backup or recovery MOC, using commercial IT.
  - Ground equipment is not mass-driving.
  - Flight computing stays in vehicle and site BOMs.
- **Ground software reuses an open-source or COTS core.** Examples are Yamcs, OpenC3 COSMOS and Major Tom.
  - Custom work is limited to mining and plant supervision, fleet scheduling, the digital twin or state model, and integration.
- **Command security.**
  - Command generation sits in an air-gapped or segregated environment under zero-trust principles.
  - Claude and GPT add two-person, hardware-key signing for hazardous or irreversible commands.
- **Data volume.** Telemetry is edge-processed at the NEA and only summaries and anomaly data are downlinked. Claude and GPT reject the 2.5 TB/day figure.
  - Claude: 10–50 GB/day total.
  - GPT: 5–30 GB/day routine in 0B, about 0.5–2.8 Mbps day-averaged, plus 50–250 GB/event bursts.
  - Gemini gives no figure, only edge processing.

## Divergent Views

- **Lifecycle duration and phase split**: Claude recommends about 12 years of ops (5.5 yr 0A + 6.5 yr 0B), arguing the first tonne reaches SEL1 at about Y10 and that ops should be priced per year so KDP-0B can resize the tail. Gemini prefers 10 years (4 yr 0A + 6 yr 0B), with its 0B gate at Y5. GPT suggests 10 years (4 + 6) as an estimating convention only, with gate dates set by evidence and 0A extensions costed separately.
- **0A/0B cost split**: Claude recommends 0A $165–270M (point $210M) and 0B $400–600M (point $490M). Gemini prefers 0A about $180–260M plus a share of $50–80M in external contracts, but only about $240–330M for 0B, front-loading $80–120M of custom software into 0A. GPT suggests 0A $187–344M and 0B $461–865M, with mature 0B recurring cost of $75–130M/yr.
- **Staffing levels**: Claude recommends 0A peaking at 125 FTE (about 450 FTE-yr) and 0B at about 180 FTE steady state with a 230 FTE commissioning peak (about 4 FTE per operated asset). Gemini prefers about 60 FTE in 0A and about 120 FTE in 0B on 24/7 shifts. GPT suggests 80–120 FTE in 0A and 180–260 FTE in 0B, noting each continuously staffed console costs about 5–5.5 FTE.
- **Unattended-operation requirement**: Claude recommends MO-01, covering ≥45 days of survival without contact and ≥50% production for ≥21 days unattended, with a ≥14-day blackout demonstrated on the pathfinder. Gemini prefers onboard "Level 4" safe-mode autonomy with no stated duration. GPT suggests a ≥30-day safe-interval design objective in 0B, allowing production suspension rather than continuation, with only a 72 h minimum disconnected-survival demonstration in 0A.
- **Reserve treatment**: Claude recommends no hidden reserve in bom-0-10, carrying a named $200–300M autonomy-shortfall risk in bom-0-17. Gemini prefers embedding a 30% reserve in the ops envelope ($610–870M). GPT suggests excluding all reserve from bom-0-10 and leaving it to bom-0-17.
- **Digital twin and autonomy maturity**: Claude rates the microgravity-metallurgy twin at TRL 2–3 and the site autonomy controller at TRL 3–4, treating both as effectively project-ending and requiring TRL 6 on the pathfinder at KDP-0B. Gemini projects the twin reaching TRL 6–8 by Y4 and assumes a 15%/yr cut in human-in-the-loop effort from AI maturation. GPT warns that the twin must carry model version, calibration and uncertainty, and is never a certification substitute or a safety basis.

## Open Questions

1. **Intervention-rate model.** What is the real ground-intervention rate per robot-day and per plant-day for tethered microgravity excavation and processing?
   - Only pathfinder data can answer it.
   - It drives roughly ±$300M of 0B ops cost (Claude) and determines whether 0B ops economics close at contracted throughput (GPT).
2. **Permitted unattended states.** Which mining, processing and loading tasks may continue, finish, suspend or isolate during solar conjunction and extended outages?
   - Conjunction blackouts are about 2–5 weeks.
   - The answer must be consistent with bom-0-5 safe-state energy and thermal design.
3. **Objective TRL 6 evidence for an E4 multi-asset site supervisor.** Candidate criteria are pathfinder operating hours, fault-injection coverage, blackout survival and twin prediction error.
   - These need agreement with D-02 reviewers.
   - GPT notes ground simulation alone cannot establish relevant-environment maturity.
4. **SEL1 node operations and handover.** Who operates the node and when does it pass to Phase 1? This affects about 10–15 FTE in the 0B tail. Docking, inspection and rejected-lot handling must also be agreed with Phase 1.
5. **Command authority geography and regulation.**
   - Is follow-the-sun operation, with split primary and backup MOC shifts, acceptable to the licensing state?
   - What reporting burden will the licensing state impose? The estimate is 2–10 FTE.
   - How do ITAR/EAR constrain hiring, contracted navigation and the open-data mandate?
6. **Phase 1 product acceptance specification.** Composition, S/P/C/O limits, physical form, quantity, dates and acceptance method are needed before ops can define lot certification and custody.

## Recommended Approach

1. **Approve bom-0-10 as a standalone line, split 0A/0B, and price it per year.**
   - **0A (committed): $190–300M.** This spans Claude's point to GPT's mid-range. Release it by life-cycle milestones.
   - **0B (gated): $450–700M as a conditional planning allowance** for about 6–6.5 operating years, resized at KDP-0B against signed Phase 1 demand.
   - The nominal programme is 10–12 years. Replace the round-2 "10 yr" quantity with phase-by-phase annual rates:
     - 0A: about $35–55M/yr.
     - 0B steady state: about $70–130M/yr.
     - Commissioning surge: up to about $100–160M/yr.
2. **Hold no reserve inside bom-0-10.**
   - Drop Gemini's embedded 30%.
   - Carry a **named $200–300M autonomy-shortfall risk in bom-0-17**, released only if pathfinder data show intervention rates above target.
   - Budget an explicit **gate-slip holding core of about 40 FTE (about $13–16M/yr)** so a KDP-0B delay does not leave a 125-person team idle.
3. **Staff lean in 0A and scale only after KDP-0B.**
   - 0A: 80–125 FTE peak, with lights-out cruise and 24/7 coverage only for encounters, commissioning and hazardous tests.
   - 0B: 180–230 FTE with 3 core 24/7 positions plus day specialists, using Claude's and GPT's basis.
   - Gemini's ~120 FTE in 0B is a stretch case, contingent on demonstrated E4 autonomy.
   - Set fleet targets of **≤0.5 controller-FTE per tug in cruise** and **≤0.2 interventions per robot-day** (target 0.05) at 0B steady state.
4. **Designate site supervisory autonomy and the process twin as project-ending technologies.**
   - Both require **TRL 6 on the pathfinder, without waiver, at KDP-0B**.
   - The pathfinder must run the same supervisory software and ground system planned for 0B.
   - Required evidence:
     - ≥60 days of continuous autonomous operation, including a commanded ≥14-day zero-contact interval;
     - measured intervention-rate trends;
     - twin prediction error within an agreed envelope;
     - at least one end-to-end certified lot genealogy record.
   - Under GPT's caution, every twin prediction carries version, calibration and uncertainty, and safety interlocks stay onboard and independent of production scheduling.
5. **Adopt a single, configuration-controlled ground system and design-for-operability (DFO) rules from Y1.**
   - Build on an open-source TM/TC core with a target of ≥70% reuse, and write procedures as executable code.
   - Use one telemetry and command standard (CCSDS/XTCE) across all assets.
   - Keep the tugs block-identical, since each tug variant adds about 3–5 FTE of permanent sustaining load.
   - Require dual-image software rollback, a ≥60-day onboard historian at the site, and daily health digests.
   - Give Ops a voting seat at PDR/CDR/ORR for bom-0-1 through 0-6, 0-12 and 0-13.
6. **Engineer resilience and security to explicit numbers.** These are proposed values, to be confirmed with bom-0-9 and the licensing state.
   - Backup MOC at least 500 km away on a separate grid.
   - Recovery: safety-critical positions within ≤4 h and full operations within ≤72 h. GPT's tighter ≤2 h recovery target is to be evaluated for 0B.
   - Annual full failover drill.
   - NIST SP 800-53 moderate baseline, rising to high on command paths.
   - Two-person HSM signing for irreversible actions, including departure burns with product, plant thermal start, HV tether re-energisation, excavation-regime changes and disposal.
   - Size the ground archive for the 10–50 GB/day downlink allocation.
7. **Report ops cost to the economics gate as a near-fixed cost per tonne.**
   - Mature 0B ops alone is about **$30k–125k per delivered tonne** at 0.6–2.5 kt/yr (Claude). GPT's wider range reaches about $217k/t at the low-throughput end.
   - Report $/t and FTE per asset quarterly (MO-10), with a not-to-exceed tripwire at KDP-0B.
   - Because ops cost barely scales with throughput, size 0B to signed demand at the upper end of the delivered range. A half-utilised site roughly doubles ops cost per tonne.