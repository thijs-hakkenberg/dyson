---
bomId: "bom-0-17"
itemName: "Contingency and Reserve"
itemSlug: "contingency-reserve"
type: "consensus"
generated: "2026-10-21"
phase: "phase-0"
---

## Key Specifications

- **All three reject the round-2 Gemini figure of 25% for 0B.** Every model now places current-maturity 0B reserve at 40% or more:
  - Claude: project contingency 50% (range 40–65) plus 18% owner reserve.
  - Gemini: 45% (range 40–50).
  - GPT: 40–50% total.

  The shared reasoning is that 0A does not retire the risks that dominate 0B dollars. These are scale-up, fleet production, coupled mining/metallurgy/power/thermal/EP logistics, and long-duration remote operations.
- **0A reserve converges near 35–40% at the project level.**
  - Claude: 40% project contingency (range 35–50), the P70 level.
  - Gemini: 35% (range 30–40).
  - GPT: 35–40% total.

  All three move to or above the upper half of the round-2 "30–40%" band. The reason given is that 0A is dominated by NRE and first-of-kind pathfinder work.
- **0A and 0B use separate ledgers.**
  - Only 0A reserve is a current funding requirement under D-01.
  - The 0B figure is a planning provision carried into the economics gate, not an appropriation.
  - Claude and GPT explicitly forbid using 0B allowances as informal 0A money. Claude also forbids rolling unused 0A contingency into 0B.
- **About 10% of base sits at a higher authority than the project manager.**
  - Claude: owner reserve of 10% (0A) and 14–18% (0B).
  - Gemini: 10% Board strategic reserve in 0B.
  - GPT: 10% programme management reserve in both phases.

  Exogenous threats are routed to this higher layer: licensing and the D-03 ALARP outcome, launch-provider failure, and policy changes.
- **Release authority is tiered, and every draw needs a documented risk or change ID.**
  - Claude: project manager up to $10M (0A) or $25M (0B); change board up to $100M or $250M; Owner Board above that and for any owner-reserve use.
  - Gemini: subsystem, then project, then Board.
  - GPT: up to 1% of phase base, then up to 3%, then owner approval.
- **Three buffers are kept separate:** financial reserve, schedule reserve and engineering margin. Mass, power, Δv and radiator margins are physical. Money cannot create radiator area after deployment. Schedule slips are costed mainly as standing-army burn.
- **Reserve is a pure financial line.** It has no flight mass, power, thermal load or staff. Analysts, cost-risk tools and independent cost estimates are charged elsewhere:
  - Claude places them in bom-0-7, at about $5–15M/yr.
  - GPT places them in bom-0-7 or the NRE lines.
  - Gemini is silent on this.
- **The 0B percentage must be re-estimated at KDP-0B** using pathfinder-measured yield, reliability and supplier evidence, with an independent cost estimate. None of the three treat today's 0B figure as final.

## Divergent Views

- **0B reserve at the KDP-0B gate:** Claude recommends a pre-stated drop to 35% project contingency (range 30–40, the P80 level) plus 14% owner reserve, to reach P90 once the estimate reaches AACE Class 3. Gemini prefers holding 40–50% at the KDP-0B gate, drawn down only as operational milestones are met. GPT suggests recalculating from evidence and explicitly refusing to "promise a lower percentage in advance."
- **Reserve layering:** Claude recommends three layers: project contingency, owner reserve, and a non-monetary descope ladder worth about 10% (0A) and 25–35% (0B) of base. Gemini prefers a three-tier money split: 0A is 15% subsystem plus 20% project manager; 0B is 10% subsystem, 25% project manager and 10% Board. GPT suggests exactly two monetary layers in 0A: 25–30% project contingency plus 10% programme reserve. GPT allows "no third automatic owner contingency" stacked above these.
- **Confidence-level basis:** Claude maps percentages to P70/P80/P90 using a lognormal cost-ratio model.
  - 0A uses σ(ln) = 0.25.
  - 0B now uses σ(ln) = 0.35.
  - 0B at gate uses σ(ln) = 0.20.

  The bottom-up element rates are cross-checked against this. Gemini cites NASA NPR 7120.5F norms without stating a confidence level. GPT targets a joint cost-and-schedule P80 (from at least 10,000 runs) but forbids labelling any percentage-derived budget "P80" before that analysis exists.
- **Dollar sizing:**
  - Claude carries working bases of $6.0B for 0A (range 3.5–9.0) and $19B for 0B (range 10–40). This gives reserve of $3.0B for 0A (1.5–5.6) and $12.9B for 0B (5.5–34).
  - Gemini assumes bases of $2.5–4.0B (0A) and $12–18B (0B), for a total reserve of $6.3–9.5B.
  - GPT gives only normalized rates per $1B, plus an illustrative $2B/$20B case totalling $8.7–10.8B.

  Claude and GPT both say the round-2 "$5–27B" figure is not adoptable because it mixes phases and layers.
- **Fundamental technology failure:** Claude recommends treating outright failure of microgravity Fe-Ni metallurgy as a gate decision that triggers the Earth-supplied fallback, not a reserve draw. GPT agrees and adds reporting of gate probability, spend-to-gate and bounded shutdown cost. Gemini lists the fallback pivot as something that "will consume massive schedule and financial reserve."
- **Schedule reserve and margins:**
  - Claude: 1 month per year before I&T and 2 months per year during I&T; a backup NEA with a window within 24 months; one funded 12-month 0B slip (about $0.7B); power EOL margin of 25/20/15/10% across SRR/PDR/CDR/launch; Δv +10%.
  - Gemini: 2 months per year in 0A and 3 months per year in 0B, plus a 12-month window reserve; 30% power margin; Δv +15%.
  - GPT: stress-tests 6–12 months (0A) and 12–24 months (0B) only, with no fixed allowance.

  Claude and Gemini agree on dry-mass growth allowances of 30% at SRR/PDR, 20% at PDR/CDR, and 10% at delivery.

## Open Questions

1. **Reconciled phase bases.** None of the 0A or 0B base estimates is frozen. The three models' working bases differ by up to about 2.4× for 0A. Reserve dollars cannot be fixed until bom-0-1 through bom-0-16 have consistent boundaries and are stripped of duplicate padding.
2. **Correlation and common-cause modelling.** Claude estimates that choosing ρ = 0.3 versus 0.5 moves 0B P80 by 5–8 points. GPT flags batch-wide tug defects and target-property coupling as correlated drivers. Sensitivity runs are needed before SRR.
3. **Standing-army burn rates and the cost of a missed window.**
   - Long synodic periods for low-Δv NEAs (about 7.5 years at a = 1.1 AU) make a missed window disproportionately expensive.
   - Monthly burn rates for 0A and 0B are unknown (raised by Gemini and Claude).
   - It is also unresolved whether a backup target with a window within 24 months is achievable.
4. **Fallback comparator and its financing.** The contingency to carry on the Earth-supplied fallback at the economics gate is undecided. Claude proposes 20–25%. GPT wants the fallback to be a separately approved Phase 1 procurement.
5. **Non-profit funding realism.** Open items are:
   - whether reserve is held as cash, callable pledges or a mix;
   - how in-kind contributions carry default risk (Claude suggests 30–50%);
   - inflation treatment: Claude and GPT keep escalation as a separate line, while Gemini proposes tying 15% of Board reserve to an inflation index.
6. **Exogenous decisions not yet settled.** These are the final D-03 ALARP and licensing ceiling, a possible re-decision of the SEL1 receiving node (D-04), and the iodine/argon choice (D-05). Each could move element rates by about 10–15 points. They need agreed routing to owner reserve versus scope change.

## Recommended Approach

1. **Adopt interim rates on a contingency-free base, in constant FY2026 USD, with escalation carried separately.**
   - 0A: total reserve of 40–50% (point 45%), made up of 35–40% project contingency plus about 10% owner/programme reserve. This sets the funded 0A authority.
   - 0B: total of 55–70% (point about 65%), made up of 45–50% project contingency (range 40–65) plus 15–18% owner reserve. This is recorded only as an uncommitted planning provision.
   - All three models reject the round-2 25% figure for 0B and the uniform 30–40% rate across both phases.
2. **Use two monetary layers plus a non-monetary descope ladder.** Project contingency sits with the programme manager and change board. Owner reserve sits with the Owner Board and covers licensing/ALARP, policy, D-04/D-05 re-decisions and launch-market regime change. Pre-agree descope steps that protect every test needed to reach TRL 6 for KDP-0B. Example 0B steps include:
   - deferring the water pilot;
   - reducing the tug fleet from 14 to 10;
   - shrinking the receiving node to minimum product acceptance.
3. **Make contingency computed, not chosen.**
   - Run a bottom-up element-rate method (TRL/AD², heritage, estimate class) now, cross-checked against a top-down lognormal model.
   - From SRR, replace both with an integrated cost-and-schedule Monte Carlo model that includes explicit correlation and common-cause drivers.
   - Do not label any figure "P80" until that model supports it.
4. **Set the KDP-0B reserve criterion rather than a pre-promised number.**
   - Base plus project contingency must reach at least 80% joint cost-and-schedule confidence on a Class 3 estimate validated by an independent cost estimate.
   - Base plus all reserve must reach at least 90%.
   - If more than about 45% project contingency is needed to get there, the gate fails or is re-scoped. Reserve is not piled on.
5. **Keep project-ending outcomes out of reserve.** These include metallurgy failure, no viable target, no signed demand, no licence, and failed economics. Each is a gate decision. Report its probability, spend-to-gate and bounded safe-shutdown cost. At the economics gate, compare 0B with its contingency against the Earth-supplied fallback with its own contingency (provisionally 20–25%).
6. **Fund schedule reserve explicitly and keep margins with the owning items.**
   - Schedule allowances: 1–2 months per year in 0A, at least 6 months per 0B campaign, and one funded 12-month 0B deployment slip.
   - Require a qualified backup NEA within 24 months, since target diversity is cheaper than funding a slip.
   - Mass-growth policy: 30% at SRR, 20% at PDR, 10% at CDR, and 5% system margin at launch. Power, Δv and radiator margins are set by the owning items.
   - Margin shortfalls are restored by design, not by drawing contingency.
7. **Install governance suited to a non-profit.**
   - Every draw cites a risk ID, with tiered release limits.
   - A Reserve Coverage Ratio below 1.0 triggers a recovery plan within 30 days.
   - Independent review is triggered if more than 20% of reserve is consumed before PDR or more than 40% before CDR.
   - Contingency must be in cash or callable pledges before authority to proceed.
   - No 0A-to-0B rollover is allowed, and all reporting is against the single frozen configuration baseline.