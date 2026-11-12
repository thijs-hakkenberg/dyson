---
bomId: "bom-0-3"
itemName: "Processing Plant at the Target NEA"
itemSlug: "material-processing-station"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-3 Processing Plant at the Target NEA: Consensus Synthesis

## Key Specifications

- **Configuration.** All three models propose one uncrewed, modular plant anchored at the target NEA.
  - It produces native/reduced Fe-Ni only and ships product, not ore, to SEL1 (bom-0-13).
  - There are no crew provisions, habitat, LOX/LH₂, Si/Al or molten regolith electrolysis.
  - Maintenance is by robotic ORU/LRU replacement, with Earth outside the real-time safety loop. Claude and GPT both specify a hardwired or independent equipment-protection layer beneath the software.

- **Throughput.** Reference output is about 1.0–1.5 kt/yr of accepted product.
  - Claude: 1.3 kt/yr annual-average delivered (1.8 kt/yr nameplate, 3 trains at 72% availability).
  - Gemini: 1.5 kt/yr.
  - GPT: 1.14 kt/yr accepted, 1.0 kt/yr contracted.
  - All three say the final capacity is set at KDP-0B by signed Phase 1 demand, not built speculatively.

- **Feed and tailings.** Excavated feed is about 12–20 kt/yr, so beneficiation tailings (≈10–18 kt/yr) are the dominant mass stream.
  - Claude: 20.1 kt/yr ROM, 17.8 kt/yr tailings.
  - Gemini: about 15 kt/yr feed.
  - GPT: 12 kt/yr feed, 10.5 kt/yr tailings.
  - This is two orders of magnitude above the round-2 figure of 75–120 t/yr, and it creates a matching demand on the bom-0-2 mining fleet.

- **No large rotating structure.** All three reject the legacy 50 m rotating arm as a human-comfort heuristic.
  - Any partial-gravity processing uses about 5 m arms at about 4.2 rpm for 0.1 g, inside replaceable cartridges.
  - None proposes a multi-MW mechanical rotary joint.

- **Delivered mass.** Estimates fall roughly in the 220–450 t band, launched in packages and delivered by 1–2 tug loads of 150–300 t.
  - Claude: 264 t dry MEV, about 305 t delivered (240–390).
  - Gemini: 220 t.
  - GPT: 270–450 t.

- **0B acquisition cost.** Estimates converge on about $4–10B (2026 USD), excluding power, robots and tugs.
  - Claude: $4.5–9.5B, reference about $6.8B.
  - Gemini: $4.7–9.8B.
  - GPT: $4–8B.
  - Claude and GPT both judge the round-2 $3B low end too optimistic. Both recommend a 40–60% reserve held in bom-0-17 rather than in this line.

- **Heat rejection.** Radiators belong to bom-0-3, sized for about 0.9–1.5 MWth, with segmented, isolatable temperature loops.
  - Claude: 0.9 MW peak.
  - Gemini: 1.2 MWth.
  - GPT: 1.0–1.5 MWth.

- **Communications.** Event-selected downlink averages about 0.1–1 Mbit/s, with diagnostic bursts of 10–50 Mbit/s.
  - Claude and GPT reject the round-1 ~230 Mbit/s (2.5 TB/day) figure. Gemini's 10 Mbit/s burst is consistent with the 10–50 Mbit/s band.
  - Onboard storage covers 30–90 days.
  - DSN access is not assumed free.

- **Design life and gating.** Design life is 10–15 years with replaceable process modules.
  - Claude and GPT state that KDP-0B requires TRL 6 in a relevant environment, with no waivers, for the selected route, beneficiation, solids handling, containment, autonomy, maintenance and product qualification.
  - Gemini proposes a performance-based gate instead: >90% metal recovery, <2 kWh/kg, and 100+ autonomous cycles.

## Divergent Views

- **Primary process route.**
  - Claude baselines no-melt carbonyl refining (T06), with short-arm melting (T07/T23) as a qualified alternate up to a Route Selection Review around 2029/30. Its main argument is that melting dissolves troilite sulfur into the metal, and desulfurising would need imported CaO flux of 30–80 t/yr.
  - Gemini baselines induction melting in twin 15 t centrifuge cartridges, with slag skimmed at 0.1 g.
  - GPT baselines rotating melt cartridges plus coalescence surfaces and melt filtration. It keeps carbonyl and H₂ reduction as research-only alternatives, and also notes that melting does not remove dissolved S or P.

- **Electrical power.**
  - Claude recommends 0.85 MWe installed (0.6–1.1) and about 0.5 MWe average (≈3.4 kWh/kg product), with a 120 kW night load.
  - Gemini specifies 1.5 MWe installed, including about 800 kW peak for induction.
  - GPT requests 1.5–2.5 MWe connected and 0.45–0.9 MWe average (4–8 GWh/yr).

- **Radiator area.**
  - Claude sizes about 950 m² (700–1,300) at 6–9 t across low-, mid- and high-temperature loops.
  - Gemini specifies 750 m² of two-phase radiators at 350 K for 1.2 MWth.
  - GPT calculates 1,800–3,000 m² emitting area (1,000–2,000 m² physical). It explicitly rejects "1 MW at 350 K in ~700 m²", because ideal emission at 350 K is only about 0.72 kW/m² before derating.

- **Tailings method and escape ceiling.**
  - Claude proposes face-side backfill into the mined void, capped with Fe-Ni foil from the CVD line (about 4 t/yr of product). Its interim ceiling is ≤0.5 t/yr (≈2.5×10⁻⁵ of ROM throughput).
  - Gemini proposes sintered blocks or bags, "safe ejection" as an option, and electrostatic precipitators. It sets no numeric ceiling.
  - GPT proposes compacted or contained blocks handed over to a bom-0-15 repository. Its interim ceiling is <10⁻⁶ of processed mass (about 12 kg/yr), supplemented by particle-size, velocity and trajectory limits.

- **Product form and packaging.**
  - Claude recommends CVD/carbonyl granules (CF-1) or powder (CF-2) in 1 t CVD-formed Fe-Ni canisters, in 20 t certified lots. The canister counts as product.
  - Gemini prefers 5 t ingots or billets with tug grapple fixtures.
  - GPT suggests 25–100 kg remelt billets with lot traceability. It sets an initial envelope of Fe+Ni ≥97 wt%, S ≤0.10 wt% and P ≤0.10 wt%.

- **Cost scope and the 0A split.**
  - Claude puts $80–200M of 0A plant engineering in bom-0-3, with $0.6–1.4B of maturation demand on bom-0-11 and $0.3–0.8B on bom-0-12.
  - Gemini includes $1.5–3.5B of launch and assembly inside bom-0-3, which conflicts with the bom-0-8 boundary. It treats 0A as amortized.
  - GPT puts zero 0A procurement in bom-0-3, and $1.2–2.8B of enabling work in bom-0-11 and bom-0-12.

## Open Questions

1. **Feed reality.** The recoverable free-metal fraction, metal grain size and liberation behaviour, troilite content, and lateral variability of the actual target are unknown. These factors control feed rate, comminution energy, wear and whether the target is accepted. Claude proposes acceptance criteria of ≥6 wt% free metal and ≥50 µm grains. GPT warns that a 5 wt% target needs about 25 kt/yr of feed.

2. **Route physics.** For the carbonyl route, the unknowns are carbonylation kinetics and CO loss on fresh meteoritic kamacite/taenite, and microgravity condensing and phase separation. For the melt route, they are droplet coalescence at 0.1 g, Coriolis effects (Gemini estimates about 6% across a 0.3 m pool), crucible and filter life, and sulfur partition.

3. **Microgravity bulk-solids handling.** It is open whether forced-feed comminution (HPGR), conveyors and classifiers can run for more than 500 h without unrecoverable jams with cohesive fines in vacuum.

4. **Long-term retention of tailings.** Retaining about 130–200 kt of tailings over 12 years against electrostatic lofting, micrometeoroid gardening and handling energy on a body with roughly 0.26 m/s escape velocity is unresolved. So is the containment ceiling the licensing state will accept. If that ceiling is ≤10⁻⁶ of throughput, it may force sintered crusts and re-allocated power.

5. **Product acceptance by Phase 1.** The Phase 1 customer has not specified chemistry, form (granule, powder, billet or ingot) or use class (shielding, remelt or structural). Each option changes the finishing hardware.

6. **Delivery closure.** Tug cycle time and phasing may cap delivered output below plant capacity. GPT notes that 12 tugs carrying 200 t on a 2-year cycle deliver about 1.0 kt/yr, but a 3-year cycle gives only about 0.68 kt/yr. The best product-transfer method is also open: Claude's catapult-plus-lighter with the tug in stand-off, or direct berthing.

## Recommended Approach

1. **Adopt a modular plant sized at the gate.** Build the plant from identical process trains of about 0.6 kt/yr nameplate each. Use a 3-train reference (about 1.0–1.3 kt/yr delivered). At KDP-0B, set the train count N = 2–6 from signed demand. Size common infrastructure for N = 4.

2. **Carry two routes through 0A and pick one.** Take both carbonyl (T06) and short-arm melt-plus-filtration (T07/T23) to TRL 4–5 against falsifiable criteria, then select one at a Route Selection Review.
   - Carbonyl falsifiers (Claude): ≥70–80% Fe extraction in ≤72 h, CO loss ≤0.3%, product C ≤0.1% after anneal.
   - Melt falsifiers: ≥90% recovery and measured S partition.
   - Take only the selected route to TRL 6, and treat it as project-ending with no waiver.
   - Treat sulfur rejection as a discriminating criterion. Keep H₂ reduction (T17) as desk/bench research unless the target is L/LL-type.

3. **Make tailings the plant's design driver.**
   - Plan for 10–20 kt/yr (envelope 9–45) of enclosed, low-velocity tailings handling. Claude specifies ≤0.05 m/s discharge.
   - Carry backfill-and-cap and compacted-block repository options to pathfinder trials.
   - Bracket the interim ALARP ceiling between GPT's 10⁻⁶ and Claude's 2.5×10⁻⁵ of throughput, with particle-size and velocity sub-limits. bom-0-15 owns the final number under D-03.
   - Prohibit tug EP thrusting within about 5 km of the site during product transfer (Claude PP-R-012), to avoid plume lofting of regolith and iodine deposition.

4. **Size power and thermal conservatively until the route is chosen.**
   - Request a 0.6–2.5 MWe allocation envelope from bom-0-5. Carbonyl sits at the low end, melt at the high end.
   - Size radiators with GPT's derated method (view factor to hot ground, dust, failed segments). Plan on 1,000–2,000 m² of physical panel area.
   - Rotary power should be ≤0.35 MW per cartridge, using a slip ring or contactless transfer, never MW-class.

5. **Freeze controlled interfaces now.**
   - Target-acceptance criteria to bom-0-1 (based on Claude's TA-1 to TA-9).
   - A product specification countersigned by the Phase 1 customer before KDP-0B. Combine Claude's CF-1 granule grade with GPT's billet envelope.
   - ROM delivery rate to bom-0-2: about 30–125 t/day.
   - Launch inert. No CO or carbonyls aboard (Claude), and no process consumables beyond formic acid and inert gas. Earth make-up ≤25 t/yr.

6. **Normalise the budget across lines.**
   - 0A bom-0-3 systems engineering: $80–200M. Plant-related maturation is carried in bom-0-11 ($0.6–1.8B) and pathfinder content in bom-0-12 ($0.3–1.0B), reconciled to avoid double-counting.
   - 0B acquisition: $4.5–9B, reference about $6.5B for N = 3. Launch is excluded and belongs to bom-0-8; Gemini's launch-inclusive figure should be restated on this basis.
   - Mass: 250–400 t delivered.
   - Hold a 40–60% risk reserve in bom-0-17.
   - Disagreements with round 2: GPT's $3B low end is too low, and Claude's $12B high end applies only if the large-rotor melt scope returns.

7. **Gate on a demonstration with real target material.**
   - KDP-0B for this item requires bom-0-12 pathfinder evidence on target regolith: ≥10 t of ROM processed and ≥500 h of beneficiation; ≥100 fault-injected process cycles; ≥30 days uncontacted autonomy; ≥20 robotic ORU swaps at ≥90% first-attempt success; 6 months of measured particle escape below the ceiling; and a ≥100 kg product lot accepted by the Phase 1 customer.
   - If the selected metallurgy route fails, stop the industrial commitment and fall back to Earth-supplied material. A lunar refinery is a separate major programme, not an immediate substitute.