---
bomId: "bom-0-5"
itemName: "Site Power, Arrays and Storage"
itemSlug: "solar-power-arrays"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-5 Site Power, Arrays and Storage: Consensus Synthesis

## Key Specifications

- **The site is single-digit MW, and the 50 MW round-2 figure is rejected.** All three revised proposals size the NEA site well below the round-2 35–50 MW proposals:
  - Claude: 2.0 MW (Class P) or 3.8 MW (Class E) BOL at 1 AU, within a 1.2–8 MW envelope.
  - Gemini: 5.0 MW BOL, about 3.5 MW EOL at 1.3 AU.
  - GPT: 8 MW BOL at 1 AU (6–10 MW), 2.49 MW EOL at 1.5 AU.
  - Claude and GPT attribute the larger round-2 totals to the abandoned station's demands, or to tug arrays being counted in.
- **Tug arrays are excluded from bom-0-5.** Claude and GPT state this explicitly (tug arrays sit in bom-0-4). Gemini's 5 MW is a per-site figure with no tug content.
- **The 200–500 MWh bank is deleted, and storage is 1–2.5 MWh nameplate.**
  - Claude: 1.0 MWh (P) or 2.1 MWh (E).
  - Gemini: 2.5 MWh.
  - GPT: 2.0 MWh (four 0.5 MWh units).
  - Storage covers survival, controlled shutdown and fault ride-through, not production through darkness.
  - All three reject the 10–15 MWh round-2 figures as a baseline.
  - Chemistry is space-qualified Li-ion at 100–160 Wh/kg pack level (Claude 125, Gemini 160 NMC, GPT 100–160).
- **Arrays use a ROSA-type roll-out blanket and a ~30% III-V reference cell, with silicon as a qualified alternate.**
  - Claude: ≥29.5% triple-junction.
  - Gemini: IMM at ~30%.
  - GPT: favours III-V but keeps competition open.
  - Wing-level specific power is about 80–130 W/kg (Claude ~87 W/kg at SPU level, Gemini 110, GPT 80–130).
- **Wing hardware is priced near $70–75/W within the agreed $30–150/W envelope.** Claude uses a $75/W central value, Gemini $70/W and GPT $30–150/W. Launch and delivery are carried in bom-0-8 by all three.
- **The 0B recurring line lands at roughly $0.5–0.8B central.** Claude gives a P50 of about $0.65B, Gemini $530M (including $80M of NRE) and GPT about $0.8B. Each excludes delivery and contingency (bom-0-17).
- **Distribution is kV-class DC with SiC switching and fibre data.**
  - All three use a 2–3 kV DC primary bus with SiC solid-state protection.
  - All three step down to secondary buses, and Claude and Gemini specify 120 V DC.
  - Optical fibre runs in power cables and tethers for EMI-immune control.
  - Claude and GPT add two rules: no use of regolith as ground or return, and continuous insulation monitoring.
- **Radiator scope is split by owner.** bom-0-5 rejects only PMAD, converter and battery losses. Furnace and process heat belong to bom-0-3.
- **Microgrid autonomy follows tiered load-shedding.** The priority order is: survival, avionics and comms first; then thermal/plant hold; then robot tethers; then process loads. Protection runs locally with no ground-in-the-loop, and the site must ride through comms outages (Claude and GPT require 30 days of safe-mode records or operations).
- **Production distance is 1.3–1.5 AU, with throttling beyond.** Claude and Gemini design for 1.3 AU and GPT for 1.5 AU. Claude and GPT both specify curtailment toward 1.7–2.0 AU.

## Divergent Views

- **Site nameplate and delivered mass:**
  - Claude recommends 2.0 MW / about 45 t (Class P), or 3.8 MW / about 79 t (Class E), built from 200 kW Site Power Units with N+1 redundancy.
  - Gemini prefers 5.0 MW with about 45 t of array plus 15.6 t of battery.
  - GPT suggests 8 MW from 16 × 500 kW modules at 110–185 t.
  - The differences come mostly from the energy-per-kg basis: Claude uses 2.34 kWh/kg process plus house load, while GPT uses a 4.5–6.75 kWh/kg whole-site envelope. They also come from the illumination assumption and from mass allowances for anchoring and structure.
- **Bus voltage and topology:**
  - Claude recommends bipolar ±1 kV (2 kV pole-to-pole), qualified to ±1.5 kV, with array strings ≤300 V and encapsulated. The rationale is that it allows 3.3 kV SiC parts at ≤50% stress for single-event-burnout margin.
  - Gemini prefers a 3.0 kV DC bus exported directly to plant and robots, mitigated by conformal coating and plasma contactors if needed.
  - GPT suggests 3 kV DC as a ±1.5 kV bipolar reference, with two sectionalised buses and a protected tie.
- **Storage sizing basis and price:**
  - Claude recommends survival-only storage, conditional on every bom-0-3 unit being cold-shutdown tolerant. He uses 4 h × 130 kW (P) or 6 h of night keep-alive (E), at $40–120M/MWh.
  - Gemini prefers 2.5 MWh sized for 1 h of 2.5 MW furnace keep-alive to prevent melt freezing, at about $10M/MWh. That keep-alive figure is internally inconsistent with Gemini's own "10% of full load" hold estimate.
  - GPT suggests an explicit emergency budget of about 0.73 MWh (25 kW essential × 12 h plus shutdown and robot recovery). This closes on 2.0 MWh nameplate with one unit out, at $50–140M/MWh.
- **Illumination and array mounting strategy:**
  - Claude recommends a polar-mast "Class P" site with vertical tracking wings on 15–25 m masts, giving 0.85–0.95 illumination. He wants spin state made a formal target-gate criterion, worth about $0.35B and 34 t against Class E, and would fail tumbling targets.
  - Gemini prefers radially deployed wings around a central hub, with no spin-state treatment.
  - GPT suggests spatially separated articulated array fields with terrain-resolved illumination modelling, rejecting targets whose geometry fails rather than proposing a polar layout.
- **Phase 0A pathfinder and cost attribution:**
  - Claude recommends $10–25M in this line. Separately, a 4–6 t, ~50 kW subscale SPU kit (1 SPU-P, mini-hub with 100 kWh, 1 PDN with tethered robot) would fly on the target NEA via bom-0-12 ($60–150M). It must anchor and operate for ≥6 months, and Claude treats this as mandatory for TRL 6.
  - Gemini prefers a 100 kW pathfinder at SEL1 or a proxy NEA, with $152M (including $120M NRE) carried in this line.
  - GPT suggests a 100–250 kW demonstrator, preferably on the target body, with $160–400M attributed to bom-0-11 and bom-0-12 rather than bom-0-5.
- **Power-system heat rejection:**
  - Claude recommends about 120–170 m² of two-sided radiator at 320 K (60–120 kW of hub losses).
  - Gemini prefers 1.5 MWth on an ammonia loop with about 1,500 m².
  - GPT suggests 110–220 kW of duty with about 700 m² reference area at 300–330 K.

## Open Questions

1. **What is the actual process energy per kg of accepted Fe-Ni?** Estimates span 1.6–3.5 kWh/kg for induction (Claude), 3.5–7 kWh/kg if carbonyl refining is used, and 4.5–6.75 kWh/kg whole-site (GPT). The answer is driven by native-metal grade and recovery: 20% versus 2% grade changes feed mass tenfold. It sets the module count and must come from the bom-0-3 mass and energy balance before PDR.
2. **What shutdown and thermal-hold energy does the plant need?** Specifically: can every bom-0-3 unit tolerate an uncommanded cold shutdown, and what residual hold load does the Fe-Ni process need? The answer moves storage from about 1 MWh to several MWh (Claude Q5, Gemini thermal hold, GPT's 25 kW essential-load question).
3. **Can arrays be anchored and tracked on rubble?** The concern is anchoring and tracking stability in cohesionless, ~10⁻⁴ m/s² regolith, given Philae's failed harpoons and Bennu's negligible surface resistance. All three see this as the likely project-ending T15 issue, and none believes ground analogues alone can reach TRL 6.
4. **Do kV interfaces survive dust and plasma?** This covers kV insulation, dust-tolerant blind-mate connectors and cable behaviour in charged dust and terminator plasma, with plant vents and EP plume (iodine) deposition added. It also includes whether 3 kV, rather than ±1 kV, is worth the arcing risk (T09).
5. **What is the target's illumination history and spin state?** The needs are a full-orbit illumination record, spin state, pole orientation and terrain shadowing at candidate pads, plus an allowable aphelion. This determines the array class and storage, and must be settled before the target gate.
6. **Can the array supply chain deliver both customers?** Suppliers would need to provide the combined tug and site demand (roughly 10–15 MW/yr) with qualified interplanetary radiation data. A related question is whether silicon is a real merchant alternative. This needs an RFI by the 0A mid-term.

## Recommended Approach

1. **Fix the boundary.** Tug arrays go in bom-0-4. bom-0-5 keeps a site-variant delta specification on a single shared wing product line covering cell, blanket, qualification and supplier contract. Record this in the configuration-controlled boundary table, along with robot tethers and batteries (bom-0-2) and process radiators (bom-0-3).
2. **Size in modules from demand, and report four ratings.** Procure standard 200–500 kW units whose count is set by the bom-0-3 energy balance, target spin state and heliocentric distance. Carry a planning envelope of 2–8 MW BOL at 1 AU, with about 4 MW as the interim interface-control value for 1.3 kt/yr. Always quote four values together:
   - BOL at 1 AU;
   - EOL at design distance;
   - delivered bus power;
   - annual energy after darkness.
3. **Make illumination a target-gate criterion.** Add spin state, pole orientation and terrain-resolved shadowing to the D-02 target gate. Adopt Claude's polar-mast Class P where the target allows it, Class E as the fallback, and reject tumbling or unanchorable targets rather than buying storage to compensate.
4. **Baseline a bipolar DC bus.** Use ±1 kV (2 kV pole-to-pole) as the operating baseline and qualify insulation at ±1.5 kV, so that 3 kV stays open for a 0A TRL-5 trade on plasma and dust margins and SiC single-event-burnout data. Keep exposed strings ≤300 V and encapsulated. Put SSCBs on every feeder, use two sectionalised buses, monitor insulation continuously, and never use regolith as a return path.
5. **Size storage for survival only.**
   - Use 1–2.5 MWh nameplate, about 2 MWh as the interim value, split into ≥4 geographically separated strings plus small PDN buffers.
   - Size it with GPT's explicit emergency-budget method, closed with one string out.
   - Make cold-shutdown tolerance a binding bom-0-3 requirement.
   - Price at $40–140M/MWh. Reject Gemini's $10M/MWh as inconsistent with space-qualified packs.
6. **Require a relevant-environment demonstration on the target NEA.** Place the requirement on bom-0-12: a subscale (50–250 kW) site-power kit, preferably on the 0B target body. It must anchor, track, operate a PDN and a tethered robot, and log ≥6 months or ≥1,000 rotations. Without it, T15 and T09 cannot reach TRL 6 without waivers at KDP-0B. Keep bom-0-5's own 0A line small (about $10–25M) and carry NRE in bom-0-11.
7. **Separate wing pricing from system pricing.** Use $30–150/W for wings only. Plan the installed site system at about $150–400/W, because masts, anchors, PMAD, storage and distribution are 50–60% of cost. Set a 0B P50 of about $0.6–0.8B against a scenario range of $0.3–1.8B.
   - Size power-system radiators from actual losses, about 100–220 kW and 150–700 m². Treat Gemini's 1.5 MWth as inconsistent with a 5 MW site's ~3% PMAD loss.
   - Release modules incrementally after KDP-0B, tied to signed Phase 1 demand.