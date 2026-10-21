---
bomId: "bom-0-11"
itemName: "NRE, Ground R&D and Qualification"
itemSlug: "nre-qualification"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-11 NRE, Ground R&D and Qualification: Consensus Synthesis

## Key Specifications

- **The 0A/0B split is structural, and both 0A estimates came in below the round-2 ceiling.**
  - All three models budget 0A and gated 0B separately.
  - All three 0A ranges fall at or below about $6.6B, which is below the $8B top of GPT's round-2 0A figure:
    - Claude: $2.6–6.0B (point $4.0B)
    - Gemini: $4.3–6.6B
    - GPT: $3.9–6.6B (point $5.2B)
  - All three 0B ranges sit within $2.1–4.8B:
    - Claude: $2.1–4.8B (point $3.2B)
    - Gemini: $2.5–4.5B
    - GPT: $2.1–3.8B (point $2.9B)
  - Combined totals cluster at about $6–11B.

- **TRL boundaries.** 0A matures technologies from TRL 3–4 to TRL 6 in a relevant environment, with internal milestones at TRL 4–5. Qualification (TRL 6→8) belongs to 0B. All three state this split. Claude and GPT explicitly warn against pulling qualification spend ahead of KDP-0B.

- **Ground testing cannot close the microgravity-sensitive technologies.**
  - Excavation, anchoring, granular transfer and melt behaviour need in-space evidence from the bom-0-12 pathfinder.
  - All three name this as a hard dependency.
  - Drop towers (about 4–10 s) and parabolic flights (about 20 s) are used to anchor models, not to qualify hardware.

- **EP wear-life testing is the critical path and must start early in 0A.**
  - Elapsed test time cannot be bought back with money.
  - GPT's arithmetic shows the constraint: a 4-year calendar test yields only about 28,000 powered hours at 80% utilisation.

- **Iodine imposes facility-specific design features** that existing xenon heritage does not cover:
  - corrosion-resistant chamber linings (Claude: Ni/Ti/Hastelloy; Gemini: titanium);
  - deposition control and recovery;
  - dedicated or segregated test infrastructure (GPT).

- **Common facility set.** All three call for:
  - a dusty, charged-simulant thermal-vacuum chamber, needed for robots, HV tethers and beneficiation;
  - a dedicated EP endurance capability;
  - micro-g and metallurgy test rigs;
  - a hardware-in-the-loop (HIL) and digital-twin integration environment for long-latency autonomy and fault injection.

- **Dedicated 0A ground-facility capital of roughly $0.4–1.6B** is needed beyond existing infrastructure:
  - Claude: $0.39–0.98B
  - GPT: $0.65–1.10B
  - Gemini: $0.8–1.6B

- **HV tether qualification must go beyond vacuum withstand.** It must cover dust films, outgassing or process-gas transients, connector wear and fault interruption, across the 1–3 kV DC and 10–50 kWh battery envelope.

## Divergent Views

- **EP ground-test facility scale**:
  - Claude recommends a new 10 m Ø × 25 m iodine chamber ($150–350M), plus three endurance stands ($50–120M).
    - The chamber would hold ≤1×10⁻⁵ Torr at 1 MW using about 1,500 m² of LN₂ shrouds.
    - Claude argues argon is untestable at MW cluster scale, because it would need about 1.7×10⁷ L/s of pumping. That makes facility feasibility a criterion for the D-05 propellant down-select.
  - Gemini prefers a larger 15 m × 30 m "Iodine Cave" with more than 500,000 L/s of cryopumping (about $400M).
  - GPT suggests no full-power multi-MW endurance chamber. Instead it proposes 2–4 cells at 50–300 kW per channel, with cluster interactions confirmed in flight.

- **Refining and consolidation route**:
  - Claude recommends carbonyl (Mond) refining as the primary route, in a gravity-agnostic rotating packed-bed reactor. The pilot would run at 50–200 kg/day with ≥99.5% CO recovery per pass. Melt/sinter would be a funded alternate, cut at TG-2 (month ~36).
  - Gemini prefers a micro-g metallurgy lab built around electromagnetic levitation melting and drop-tower capsules, with carbonyl and electrolytic routes both open.
  - GPT suggests the least ambitious process Phase 1 will accept: cold compaction, then sintering (700–1,300 °C), then melting (1,400–1,650 °C) only if required. Its energy allowance is 1–5 kWh/kg.

- **Facilities as a separate line, and NRE consolidation**:
  - Claude recommends folding facilities into this item as visible sub-line 11.F, and consolidating all element DDT&E here. If the element lines keep their own DDT&E, 0B here falls by $1.2–2.5B.
  - Gemini prefers explicitly budgeted facility capex ($0.8–1.6B), endorsing round-2's separate $0.5–1.5B line.
  - GPT suggests facilities stay inside NRE. Each contract would declare whether design and qualification are charged here or in the equipment contract, with no consolidation mandate.

- **Schedule to KDP-0B**:
  - Claude recommends KDP-0B at months 90–96 (2034–2035), followed by 4–5 years of 0B.
  - Gemini prefers KDP-0B at year 5, with flight qualification models complete by year 8.
  - GPT suggests 0A runs 7–10 years, followed by 3–5 years of 0B.

- **EP life evidence required at the gate**:
  - Claude recommends ≥10 kh of wear testing plus a validated erosion model predicting ≥1.5× the 30 kh required life, with the full 30–45 kh demonstration completed in 0B.
  - Gemini prefers MW EP long-duration wear tests in years 3–4, without a numeric target.
  - GPT suggests 20,000–40,000 powered hours on representative articles, revised once duty cycles are defined.

- **Labour basis and T01–T26 register**:
  - Claude recommends a basis of about 1,000 average FTE over 7 years at $0.3M per FTE-year. It uses a criticality-classed register (16 Class A technologies, targeted down to ≤12).
  - Gemini prefers about 2,000 FTE over 5 years (about $2.5B) and offers no register.
  - GPT suggests 7,000–11,000 staff-years at $220–300k each. Its register is a different working crosswalk, ending with T26 as the integrated production chain.

## Open Questions

1. **Relevant-environment definitions for TRL 6.** It is unresolved which T-numbers (excavation, transfer, refining) must close with pathfinder data, and whether KDP-0B therefore slips one-for-one with the pathfinder. Claude sets a data deadline of month ~78.

2. **Simulant fidelity.** It is unknown whether Bond-number-scaled or synthetic simulants reproduce rubble-pile cohesion, electrostatics and native-metal liberation. A recovery plan is needed if pathfinder data invalidates the simulant programme.

3. **Phase 1 product form, and whether melting is needed at the NEA.** The options are compacted feedstock, sintered billet, carbonyl powder/CVD or cast ingot. The choice sets the plant architecture, radiator temperature and area, and whether forming is a critical technology.

4. **Propellant and facility feasibility.** Open items are:
   - whether iodine facilities can be qualified without excessive corrosion and contamination penalties, and whether partners will host iodine testing;
   - whether argon's ground-test infeasibility at MW scale is accepted as a D-05 criterion;
   - the optimum thruster unit power (100 vs 150–250 kW);
   - whether the test site has 5–10 MW of continuous grid capacity.

5. **Process-gas and heat closure.** Open items are:
   - the source of CO make-up for the carbonyl route (target carbon or Earth-supplied);
   - what fraction of process heat can be rejected at elevated (400–500 K) rather than electronics-loop temperatures.

6. **Licensing evidence and economic stop threshold.** It is open what ejecta and release validation (Claude proposes within a factor of 2) the licensing state will accept under the D-03 ALARP ceiling. It is also open at what economics threshold the programme stops at capability demonstration and falls back to Earth-supplied material.

## Recommended Approach

1. **Adopt a single bom-0-11 line with visible sub-lines** for technology maturation, ground facilities, element qualification, and systems engineering/independent TRL boards.
   - Ratify one charging rule before the first budget baseline. Either element DDT&E is consolidated here, or contracts declare where it is charged. This rule is worth ±$1.2–2.5B in 0B.
   - Do not add a separate facilities item on top of the NRE figure.

2. **Baseline the costs as follows:**
   - **0A at $3.9–6.6B, planning point about $4.5–5.0B.**
   - **0B (gated) at $2.1–4.5B, planning point about $3.0B,** to be re-sized at KDP-0B against signed Phase 1 demand.
   - Contingency stays in bom-0-17, and pathfinder flight hardware stays in bom-0-12.
   - Reject the round-2 $8B 0A ceiling. It front-loads qualification and erodes the D-01 option value.
   - Treat Gemini's round-2 $7.5B envelope as incomplete, because it was not split into 0A and 0B.

3. **Start EP life testing in year 1–2 on representative 100–250 kW iodine modules.**
   - Use leased chambers with retrofitted LN₂ shrouds while dedicated iodine endurance cells are built. These cells are budgeted at about $200–450M combined.
   - Carry argon only to a dated propellant gate at about month 30, using facility feasibility as one criterion.
   - Require ≥10–20 kh of wear testing plus a validated erosion model at KDP-0B. Complete 30–45 kh in 0B.

4. **Design out the test gap.**
   - Require gravity-agnostic (spin- or flow-dominated, ≥3 g effective) beneficiation and refining where possible, so that 1-g data counts as relevant.
   - Pursue the minimum consolidation process Phase 1 accepts. Fund one reference route (carbonyl) and one fallback (compaction/sinter or melt) to a down-select at about month 36.

5. **Build or lease a four-tier micro-g evidence ladder:**
   - a dusty regolith thermal-vacuum complex, about 8–10 m Ø ($70–300M);
   - at least 2,000 drop-tower and parabolic runs;
   - a long-duration free-flyer or commercial-station payload ($40–100M), contracted by about month 18 to hedge ISS retirement;
   - pathfinder in-situ data at least 12 months before KDP-0B.

   Make the pathfinder dependency explicit: if it slips, KDP-0B slips.

6. **Enforce a fleet qualification and autonomy standard:**
   - dedicated qualification units, with no protoflight for tugs, robots or arrays;
   - MRL 6 at KDP-0B for arrays and thrusters;
   - array manufacturing-readiness work aimed at ≤$75/W, the highest-leverage NRE dollar;
   - a HIL/digital-twin testbed proving 30-day no-contact safe-hold, ≥10⁵ Monte Carlo runs per release, and deterministic protection separated from machine-learning planning.

7. **Reconcile the T01–T26 register within 90 days.**
   - Reconcile it against the configuration-controlled baseline using a merged crosswalk of the Claude and GPT working registers.
   - Classify each item as project-ending or not. Target ≤12 project-ending technologies by the TRL 5 gate, reached through architecture changes rather than relabelling.
   - Hold all evidence in a single controlled repository, reviewed by an independent board with veto power at KDP-0B.