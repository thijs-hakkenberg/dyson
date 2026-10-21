---
bomId: "bom-0-2"
itemName: "Mining Robots"
itemSlug: "mining-robots"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-2 Mining Robots: Consensus Synthesis (Phase 0, revised architecture)

## Key Specifications

All three models agree on the following points.

- **Tether power at 2 kV DC.** Claude specifies ±1 kV bipolar (2 kV pole-to-pole); Gemini and GPT specify 2 kV nominal. All three keep this inside the binding 1–3 kV envelope. Site generation, storage and power nodes belong to bom-0-5; the robot carries its own tether, reel and DC-DC conversion. GPT and Claude add explicitly that the electrical tether is never a load-bearing or safety line.
- **30 kWh onboard battery.** Usable capacity is about 20–24 kWh (Claude 24, GPT 20–23, Gemini LTO chemistry). It covers mobility, tether-loss safe-hold and recovery. Claude and GPT state outright that routine production digging on battery is not baselined.
- **Excavation head.** The reference is an enclosed counter-rotating or opposed drum pair: Claude's up-cut drums, Gemini's dual bucket drums, GPT's opposed-drum candidate. Nameplate rate is about **2 t/h, with a range of 1–3 t/h**; Gemini gives 1.5–2.5. All three expect to downselect against alternates (grab, coring, scraping) during 0A.
- **Unbeneficiated feed through a sealed interface.** Fines go to bom-0-3 unbeneficiated (1:1). Transfer is through sealed containers or a double-door port, never open hopper transfer.
- **Robot mass of about 2.65–3.4 t dry.** Claude gives 2,650 kg MEV, Gemini 2,800 kg and GPT 3,400 kg. The excavation head is allocated 240–550 kg. The stowed envelope is about 3–3.5 m × 2.2–2.4 m.
- **Production fleet of about 6 robots plus reserves, not 20.**
  - Claude: 6 active + 2 spare + 3 replacements.
  - GPT: 6 operating + 2 reserve + 2–4 conditional replacements.
  - Gemini: 5 new 0B units plus 2 spares, alongside its 3 pathfinders. This implicitly withdraws its own round-2 figure of 20.
  - Final N is fixed at KDP-0B from signed Phase 1 demand and measured pathfinder productivity.
- **Recurring unit cost of about $28–65M per production robot.** Robot NRE is $300–850M and is carried outside the bom-0-2 recurring line, except that Gemini folds it into its 0A budget. Claude and GPT state, and Gemini's own figures imply, that the round-2 **$30–80M is only plausible as a unit price**, not as a fleet or programme cost.
- **Containment governed by more than mass fraction.** Particle velocity or kinematic limits plus enclosure are the controls, and site-wide ownership sits with bom-0-15 under the D-03 ALARP interim ceiling.
- **Precursor anchoring and geotechnical data before pathfinder build.** Claude recommends a 20–40 kg anchor-pull and penetrometer package on ≥2 bom-0-1 scouts. Gemini proposes a precursor penetrometer probe. GPT states attachment-data requirements that bom-0-1 must satisfy.

## Divergent Views

- **0A pathfinder count**
  - Claude recommends 2 flight units plus 1 ground QM (in bom-0-11). Its reason is that a peer-servicing pair is needed to retire T21, and a QM tested to failure is worth more than a third flight unit.
  - Gemini prefers 3 flight pathfinders at about $50M each ($150M).
  - GPT suggests 2 instrumented flight pathfinders at $90–160M total, preceded by ground prototypes.
- **Electrical power and heat rejection**
  - Claude recommends 2.5 kW average and 8 kW peak, with tether and PMAD rated to 15 kW for growth. Radiators are about 2 × 3 m² rejecting 1–1.5 kW.
  - Gemini prefers a 25 kW excavation peak and 3–5 kW for tramming.
  - GPT suggests 12–20 kW while excavating, a 30 kW continuous rating and a 40 kW peak (10 s). Radiators are about 30 m² rejecting 10–15 kW. GPT allocates 200 kW of site branch capacity for the fleet.
- **Mobility and anchoring**
  - Claude recommends a wheel-less sled moved as a cable-driven parallel robot inside pre-anchored 30 m cells. Anchors are boulder slings and screw-umbrella piles. The viability threshold is ≥200 N sustained and ≥1 kN transient per anchor.
  - Gemini prefers a hexapod with micro-spine feet rated >500 N holding force.
  - GPT suggests winch-assisted restrained repositioning with multiple attachment modes (bands, clamps, drilled anchors, reaction frames). Its restraint allocation is much larger: 10 kN working resultant, 15 kN·m moment and 5 kN transient.
- **Drum torque, tip speed and reaction cancellation**
  - Claude recommends ≤2 rpm and ≤0.05 m/s tip speed scheduled to v_esc. Steady torque is 3–30 N·m, with a 50–200 N·m clutch and 500 N·m stall. No cancellation fraction is credited.
  - Gemini credits 90–95% reaction-torque cancellation at a ≤0.2 m/s tip speed.
  - GPT suggests 0.2 m/s tip speed with 2–8 kN·m normal and 12 kN·m jam torque per drum, also with no cancellation credit.
- **Containment rule**
  - Claude recommends body-relative limits: ≤0.3 v_esc for tool-imparted particle velocity and ≤0.25 v_esc for body speed. Its release allocation is ≤10 kg per robot per year, of which ≤1 kg may be at >0.5 v_esc.
  - Gemini prefers a fixed mechanical tip-speed governor of ≤0.2 m/s.
  - GPT suggests a site ceiling of 100 kg/yr, with 60 kg/yr allocated to mining and a 10 kg/yr escape analysis target. It holds that tip speed is not a particle-release limit.
- **Duty and 0B cost**
  - Claude recommends 2,000 cutting h/yr in 0B (400–1,000 h in 0A), giving about 4 kt/yr per robot. Its 0B cost is $345–730M for 8 + 3 robots.
  - Gemini prefers about 1,800 h/yr and 3 kt/yr per robot. Its 0B cost is $250–300M.
  - GPT suggests 1,100 h/yr (12.6% of calendar time). Its 0B cost is $370–825M for 10–12 robots.

## Open Questions

1. **Real anchor capacity under cyclic load in target rubble.** This is the dominant project-ending unknown (T16). Claude rates the likelihood of failing 200 N sustained at 40–60%, and it sets clutch limits, cut depth and dig rate.
2. **Accessible free-metal grade and how it partitions by size.** Effective yield of about 2.5–15% moves excavation demand from about 4 kt/yr to over 50 kt/yr. If the metal sits in coarse clasts or coherent masses, a different head or a plant crusher is needed.
3. **Enclosure-to-natural-surface seal and release verification.** Can kilogram-scale release bounds be demonstrated, with upper confidence limits, against kiloton-scale flows? The verification must cover repositioning, servicing and faults, and electrostatic lofting must be characterised.
4. **Residual six-axis head loads.** Does counter-rotating or up-cut geometry actually produce net bearing rather than uplift in pascal-cohesion fines? Neither the 90–95% cancellation claim nor any other figure is yet supported by measurement.
5. **HV tether snag, abrasion and partial discharge on boulder fields.** Abrasion and partial discharge must be checked with dust and plasma charging present. The allowed snag rate and maximum tether length (50–350 m) are unresolved.
6. **Seal and port wear life in vacuum abrasive fines, and real peer-servicing capability.** Wear sets LRU intervals (500–3,000 h), the bom-0-14 spares demand and the true replacement count.

## Recommended Approach

1. **Fund 0A bom-0-2 at 2 instrumented flight pathfinders.** The cost is about $90–245M for hardware including research instrumentation. Add 1 ground QM for test-to-failure and concurrent life testing, funded in bom-0-11.
   - Reject Gemini's third flight unit. Two units are the minimum to demonstrate peer LRU swaps (T21) and still tolerate one loss.
   - Carry robot NRE of $300–850M in bom-0-11. Do not double-count it in bom-0-2.
2. **Hold 0B as a gated option sized by formula, not forecast.**
   - Size excavation demand as M_exc = P / (g·r·a·d), with N_active = ⌈M_exc / measured per-robot output⌉.
   - The planning reference is **6 active + 2 reserve, plus 2–4 reliability-derived replacements (10–12 total), costing about $280–825M recurring.**
   - Cap the fleet at about 16. Above that, re-target rather than scale.
   - This replaces all three round-2 figures. Gemini's 20 has no Fe-Ni closure. GPT's 6 replacements on 6 is an unsupported loss forecast. The round-2 $30–80M totals are unit prices.
3. **Freeze the interfaces now, but not the head, anchors or fleet size.**
   - Freeze the 2 kV DC tether and 30 kWh battery for safe mode and recovery only, with no production digging on battery.
   - Freeze sealed transfer with the robot specifying its hopper and port. bom-0-3 owns container and surge sizing in its 0.5–2 t trade range.
   - Downselect the head (enclosed drums, sealed grab, coring) and the mobility concept (cable-driven cell, restrained winch, legged) at PDR, using six-axis vacuum test data.
4. **Bound the power and thermal allocation to cover the model spread until measured.**
   - Rate the robot PMAD and tether at 15–30 kW.
   - Design radiators for the upper case with derating as the fallback.
   - Have bom-0-5 carry about 120–200 kW of fleet branch capacity until pathfinder data narrows it.
   - Credit no torque cancellation in any load case.
5. **Make anchoring the first-retired risk.**
   - Fly an anchor-pull and penetrometer package on ≥2 bom-0-1 scouts before pathfinder CDR.
   - Adopt Claude's thresholds as KDP-0B criteria: P10 ≥200 N sustained and ≥1 kN transient over ≥30 anchors, with a 100 N concept-break threshold triggering a grab head or target rejection.
6. **Adopt layered containment controls as the robot allocation to bom-0-15 under the D-03 interim ceiling.**
   - Use body-relative kinematic limits (≤0.25 v_esc body, ≤0.3 v_esc tool-imparted) in place of a fixed 0.2 m/s, which approximately equals v_esc on Bennu-class bodies.
   - Add per-robot kg/yr release allocations consistent with GPT's site budget (about 60 kg/yr for mining) and automatic stop rules.
   - Verify with upper-bound methods that include maintenance and fault releases.
7. **Set quantitative KDP-0B exit criteria with no waivers (D-02).** Each project-ending technology must reach TRL 6 at the target. T09 must also reach TRL 6, even though it is architecture-changing, because the fleet depends on tethers. The criteria are:
   - sustained dig rate ≥1.25 t/h over ≥200 cutting h;
   - extrapolated output ≥2.5 kt/yr per robot;
   - ≥95% intervention-free cutting hours;
   - ≥3 peer LRU swaps;
   - ≤1 snag-stop per 100 m of tether;
   - wear supporting ≥1,000 h LRU intervals;
   - bom-0-3 feed acceptance at an 8–18 wt% metal grade.