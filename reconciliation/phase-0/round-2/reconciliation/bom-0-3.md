---
phase: phase-0
item: bom-0-3
round: 2
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
framework: 18f503fe4ec6
generated: 2026-10-12T10:11:12.250Z
---

# Reconciliation: bom-0-3 Material Processing Station, Phase 0, Round 2

**Panel:** Claude Opus 5.5 ("Claude"), Gemini 3.8 Flash ("Gemini"), GPT-6.1 Sol ("GPT").
**Rapporteur role:** this document consolidates and attributes. It does not adjudicate. Every value is attributed to the model(s) that stated it. Rapporteur observations appear only in the final Reviewer note.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| P0-F01 Transport vs. throughput | agree (conclusion holds; method corrected) | agree | partly |
| P0-F02 Mining, transport and processing rates | agree | agree | agree |
| P0-F03 Station power vs. 50 kt/yr | agree (with re-framing) | agree | partly |
| P0-F10 Crew not budgeted | agree | agree | agree |
| P0-F15 Deliberations not written back | partly | agree | partly |
| P0-F18 No metallurgy fallback | agree | agree | partly |
| P0-F19 Output not tied to Phase-1 demand | agree | agree | agree |

**Where the panel stands, per finding:**

- **F01:** All three hold that the fleet cannot supply 50 kt/yr. Their fleet estimates are similar:
  - Claude: 0.2–0.65 kt/yr.
  - Gemini: 300–600 t/yr.
  - GPT: 200–450 t/yr.

  Claude and GPT both correct the finding's constant-loaded-mass timing and its 150–250 kW array figure. GPT records "partly" on that basis. Claude records "agree" with the method corrected.
- **F02:** Unanimous. The mass chain needs an explicit duty cycle and concentration ratio. The three models still differ on the concentration ratio itself.
- **F03:** All agree 50 kt/yr is underpowered for the stated mixed products. GPT records "partly" because energy must be computed per flowsheet, product and yield, not with one intensity per kg of feed. Claude makes a similar per-product correction but records "agree".
- **F10:** Unanimous. Phase 0 is uncrewed.
- **F15:** All agree the supplied conclusions (rq-0-11, -14, -30) are missing from the spec. They split on whether to write them back as stated or corrected:
  - Gemini writes them back as stated.
  - Claude and GPT write them back corrected.
  - Claude and GPT both say the repository-wide "eight of nine" count cannot be verified.
- **F18:** All agree a qualified, costed fallback is missing. GPT records "partly" because it disputes the finding's claimed microgravity impossibility and its "eight orders of magnitude" scaling argument.
- **F19:** Unanimous. Output is not tied to Phase-1 demand, and no SE-L1 delivery leg exists. The models differ on delivery quantity and product mix.

---

## 2. Agreed changes

These are changes all three models support in direction. Where reference values differ, each model's value is shown. The union of ranges and the common overlap are given only as arithmetic over the stated ranges, not as a new estimate.

| Parameter | Claude | Gemini | GPT | Consolidated (union / overlap) |
|---|---|---|---|---|
| Station role | Uncrewed native-Fe-Ni process demonstrator | Autonomous pilot demonstrator | Gated uncrewed materials demonstrator | Uncrewed demonstrator; 50 kt/yr refinery role withdrawn |
| Phase-0A feed throughput (t/yr) | 400 (200–1,000) | 400 (250–600) | 300 (200–450) | Union 200–1,000; overlap 250–450 |
| 50 kt/yr target | Unfunded Phase-1+ objective, gated | Phase 1/2 scale-up, contingent | Unfunded expansion objective | Uncommitted. The gating conditions diverge (see §3, D2). |
| Crew | None | None | None | Zero crew visits, habitat and life support |
| Full-build mass (800–1,000 t) | Withdrawn | Withdrawn / unfunded | Withdrawn | Withdrawn |
| Process gravity, reference | 0.1 g (0.03–0.3) | 0.1 g (0.05–0.15) | 0.1 g (0.05–0.15) | 0.1 g; union 0.03–0.3; overlap 0.05–0.15. Geometry diverges (D10). |
| Design life (yr) | 12 (10–15), replaceable modules | 15 (10–20), modular | 12 (10–15), replaceable modules | Union 10–20; overlap 10–15; replaceable process modules |
| Solar-grade (6N) Si | Removed | Downgraded to crude metallurgical Si (2N–3N) | Removed | No solar-grade Si in Phase 0. Whether any Si is produced diverges (D7). |
| Electrolysis hardware in bom-0-3, Phase 0A | None; interfaces only | Deferred to Phase 0B; passive condenser traps only | No deployed plant in bom-0-3 | No electrolysis in bom-0-3 for Phase 0A |
| bom-0-5 power allocation | Required (0.8 MWe) | Required (2.2 MWe) | Required (1 MW) | An explicit allocation is required. The value diverges (D8). |
| Initial station mass | Reduced (180 t) | Reduced (380 t) | Reduced (350 t) | All below the old 400–500 t; union 120–500 t (D13) |
| Mass-flow chain | Publish with explicit duty cycle and concentration | Publish closed chain | Publish with peak vs. annual utilisation separated | One closed chain, duty cycle and concentration stated in both bom-0-2 and bom-0-3 |
| Asteroid-side beneficiation | Add | Add | Add | Add (see §4) |
| Station-to-SE-L1 product delivery | Add | Add | Add | Add (see §4) |
| Earth-supplied fallback | Add | Add | Add | Add. Scope diverges (D17). |
| Location | Trajectory study decides; leans cislunar | Trajectory study; re-evaluate toward DRO/EML2 | Trajectory-selected; do not freeze L4/L5 first | Do not freeze SE-L4/L5 before an integrated trajectory/target study |

---

## 3. Preserved divergences

### D1. Transport derivation and the F01 verdict

**Claude:**
- Assumptions: v_e 20 km/s; 95–155 kWe; 5–9 N; propellant for both legs loaded at the station.
- Result: 93 t propellant per cycle at 4 km/s per leg; 6.5–11.8 yr thrusting per cycle; 0.25–0.46 kt/yr at 4 km/s.
- Across a 3–5 km/s per-leg sensitivity: 0.19–0.65 kt/yr.
- Also gives a 1 km/s ARM-class case of 0.3–2 kt/yr, noting that synodic phasing usually dominates there.
- Verdict "agree": the conclusion stands with the method corrected.

**GPT:**
- Same leg-mass method and 93 t, but adds an 85% thrust duty factor and 0.5 yr of non-thrust operations.
- Result: about a 9.8 yr cycle and about 310 t/yr; 230–420 t/yr over 6–10 km/s total.
- Notes that steady-state flow begins only after the first long returns, so a station commissioned earlier has no feed.
- Verdict "partly", because the finding's timing method and power were wrong.

**Gemini:**
- Assumptions: Isp 2,500 s (v_e 24.5 km/s); 150 kWe; 7.5 N; outbound wet mass about 100 t, return about 310 t.
- Thrust time computed as Δv/a using the loaded return mass: about 5.3 yr per return leg, 6.5–8.5 yr per round trip.
- Result: about 400 t/yr (300–600).
- Verdict "agree". Gemini does not discuss the leg-mass correction.

### D2. Path to 50 kt/yr

- **Claude:** 50 kt/yr through an Earth-propellant electric fleet is "an architecture impossibility, not a sizing problem". It needs one of:
  - co-located processing at the ore body;
  - asteroid-derived propellant;
  - very low-Δv targets with a cislunar station.

  Claude estimates about 23 kt/yr of Kr/I and 150–400 MWe of jet power.
- **Gemini:** 50 kt/yr is a Phase 1/2 scale-up "contingent on higher-thrust/megawatt-class logistics". Its D1 falsifier is an NTR or momentum-exchange tether delivering more than 10,000 t/yr. It estimates about 1,250–1,800 vehicles and hundreds of MW.
- **GPT:** About 2,450 vehicles, or about 160× cargo productivity. Tens of MW per vehicle if power alone is increased. "Do not scale the fleet … by simple multiplication." GPT lists source-side processing as an option but does not declare impossibility.

### D3. Iodine and krypton supply constraint

- **Claude:** World iodine output is about 30 kt/yr (citing USGS), so the fleet would take about 70% of it. Krypton is "a few hundred t/yr"; Claude flags this as its own estimate, to be verified.
- **GPT:** "Assess iodine and krypton supply independently; do not accept an unsupported global-production claim."
- **Gemini:** Silent.

### D4. Concentration ratio and excavation

| | Claude | Gemini | GPT |
|---|---|---|---|
| Concentration (excavated : concentrate) | 5–15:1, ref. 10 | 10:1 (10–20:1 also cited) | about 33:1 |
| Basis | H/L chondrite 7–19 wt% metal; 10% feed; 60–80% grade; 60–85% recovery | Beneficiation rejects 90–95% silicates | 3.2 wt% recoverable metal; 75% beneficiation recovery; 80% grade |
| Excavated (t/yr) | 4,000 (1,300–10,000) | 3,000–6,000 | 10,000 (7,000–15,000) |

Claude characterises a 33:1 ratio (GPT's round-1 value, retained here by GPT) as "target-selection pessimism, not a separation limit". It holds that both views remain defensible until feed tests exist.

GPT says the concentration assumptions "must vary together", and independent extremes must not be combined to manufacture closure.

### D5. Mining robot fleet (bom-0-2)

- **Claude:** 2–4 robots at 20–40% duty plus 1–2 spares, so resize to 4–6 units bought in stages. Claude judges the current 20 robots oversized by about 4–10×.
- **Gemini:** 4–6 robots at 5% effective utilisation (in text). No BOM line.
- **GPT:** Stage procurement and state utilisation. Notes that 20 robots need only 1.1–2.9% utilisation at 10 kt/yr. Proposes no fleet count.

### D6. Slag and residue

- **Claude:** Slag/silicate is a product (ceramic, shielding), 120 t/yr (60–250).
- **GPT:** 75 t/yr (50–115) of residues and off-spec material, needing a storage or recycling provision that is currently omitted.
- **Gemini:** Not separately addressed.

### D7. Phase-0A product mix

- **Claude:** Fe-Ni alloy plus slag. Oxide reduction at research scale only (0–50 t/yr). Al is a "poor product from chondrites" (about 1.1–1.5 wt% Al), and lunar highlands are the right source.
- **GPT:** Native Fe-Ni only. Committed Al and Si are removed. Any expansion gets its own flowsheet.
- **Gemini:** A multi-stream pilot: 200 t/yr Fe-Ni melting, 50 t/yr pilot molten regolith electrolysis (MRE), 50 t/yr volatile capture. Crude metallurgical Si retained. Phase-1 deliveries include oxygen. Phase-0A volatile capture 25 t/yr (10–50).

### D8. Installed and average station power

| | Claude | Gemini | GPT |
|---|---|---|---|
| Installed | 0.8 MWe (0.5–1.5) | 2.2 MWe (1.8–3.0) | 1 MW (0.5–1.5) |
| Average | 0.35 MWe (0.2–0.6) | not separately stated | 0.2 MW (0.13–0.32) |
| Basis | Fe-Ni line tens of kW; load dominated by robotics, beneficiation and thermal | Enthalpy for a multi-stream line including pilot MRE | 1–2 kWh/kg concentrate plus 100–250 kW auxiliaries |

Claude and GPT overlap at 0.5–1.5. Gemini's range lies above both, which follows from its D7 product mix.

### D9. Power backbone

- **Claude:** A 1 MW modular bus with couplers to 5 MW. The 4–5 MW backbone in rq-0-14 is "a deferral option bought before its exercise conditions are feasible".
- **Gemini:** 5.0 MWe (4–6) backbone as a design-for requirement for Phase-0B expansion, following rq-0-14.
- **GPT:** A reserved modular connection, with its rating set after a customer decision.

### D10. Partial-gravity geometry, rotating mass and rotor power transfer

| | Claude | Gemini | GPT |
|---|---|---|---|
| Radius | 5 m (2–10) | 50 m (40–60) | 50 m (40–60), "packaging provisional", low confidence |
| Rate | about 4.2 rpm at 5 m (2–12 rpm range) | 1.4 rpm (0.9–1.8) | 1.34 rpm at 50 m (0.95–1.64) |
| Rotating mass | 8–25 t cartridge | 25–35 t penalty | 40 t (20–60) allowance |
| Rotor power transfer | ≤0.3 MW, or arrays on the rotor; no MW slip ring | MW-class (>2 MWe) rotary joint; development line $150–250M | No guaranteed multi-MW joint; compare on-rotor generation, contactless transfer and batch interfaces |
| Configuration | Short-arm centrifuge cartridge | Rotating arm module; microgravity hub retained | Enclosed, replaceable centrifuged cartridges; no station-wide ring |

**Reasoning given:**
- **Claude:** 50 m is a human-comfort heuristic, irrelevant to an uncrewed station. At 5 m, Coriolis acceleration is under 1% of the body force and the gradient across a 0.3 m melt is about 6%.
- **Gemini:** Adopts the rq-0-11 value. Buoyancy separation needs Gr > 10⁴; Bo > 1 at r > 0.05 m.
- **GPT:** The 50 m kinematics are reasonable, but rotation does not prove separation. Bo is about 29 at 0.1 m and about 0.29 at 0.01 m.

### D11. Write-back of rq-0-11, rq-0-14 and rq-0-30 (F15)

- **Gemini (write back as stated):**
  - 50 m / 1.4 rpm arm.
  - "Design-for, defer-until" propellant with 5–10 t condenser traps and an oversized bus.
  - 30 × 30 m sunshield.
  - Active cryocooler budget of 15 kWe (10–25).
- **Claude (write back corrected):**
  - Reject the 50 m geometry, the 10–15 t penalty and the contingency cut to 15–20%.
  - The rq-0-14 "70–90 t/yr" is H₂ only. Total is 365–550 t/yr including extraction and liquefaction, or about 750 t/yr for electrolysis alone.
  - 100 t LH₂ + 600 t LOX is an engine mixture ratio, leaving about 200 t of surplus O₂.
  - The payback arithmetic is inconsistent (less than one year, not 5–10).
  - rq-0-30 cryocooler power is 1.1–5.6 kW per tank, not 700 W, unless an 80 K intercept is used.
  - Margin is 3–8 yr, not 190 days.
  - Pressurant management is needed at 15 K.
- **GPT (write back corrected, unavailable records marked unresolved):**
  - Combined electrolysis products 660–790 t/yr.
  - The same mixture-ratio and Carnot corrections as Claude (1.1–5.6 kW).
  - Subcooling margin about 4–11 yr; subcooling does not reduce steady-state leak.
  - The six-month libration claim is not general.
  - Rotating allowance 20–60 t.
  - Remove the 25 kt/yr gate.
  - Gives provisional dispositions for rq-0-18, -26, -28, -29, -47 and -48.

  Claude says rq-0-18, -28, -29, -47 and -48 were not supplied.

### D12. Cryogenics and sunshield

- **Claude:** Reserve shadow-zone volume and keep-out geometry only. No cryogenic hardware.
- **GPT:** Preserve a depot option. Withdraw the numerical design. Do not adopt 900 m² or 200–500 kg.
- **Gemini:** Sunshield of 900 m² (600–1,200), "high" confidence. Cryocooler 15 kWe.

### D13. Initial station mass

- **Claude:** 180 t (120–300), bottom-up judgement sketch.
- **Gemini:** 380 t (320–460), including the rotating truss, counterweight and sunshield. Its D1 consequences text separately states process equipment falls "from 500 t to <200 t".
- **GPT:** 350 t (200–500), "not a validated rollup".

### D14. Unit cost and contingency

| | Claude | Gemini | GPT |
|---|---|---|---|
| Reference (range) | $11B ($8–16B) | $12.5B ($9.5–15.5B) | $12B ($8–18B) |
| Includes | Hardware at $40–80k/kg, launch $0.4–2B, precursor $0.5–1B | Rotating hub, sunshield, precursors, 35% contingency | Development/acquisition and precursor; uncertainty reserve |
| Excludes | Power generation, transport, robots | Not stated | Generation, mining, tugs, launch/transfer, propellant, long-term operations |
| Contingency | 50% (40–60%) | 35% | Should follow risk and estimate maturity; selecting an architecture "does not earn a reduction" |

- **GPT:** The apparent convergence "is not independent evidence". There is "no evidence-based requirement to raise the central estimate above $10B simply because three models proposed $12B". GPT also states the phase BOM sums to about $15.71B, which is not a closed programme budget.
- **Claude:** The round-1 "overlap $9.5–14B" averaged across three different scopes.

### D15. bom-0-5 array pricing ($5/W)

- **Claude:** One to two orders of magnitude below flown deep-space array cost (ROSA/iROSA-class "well above $100/W", flagged as an estimate). Flag to the bom-0-5 reviewer.
- **GPT:** The round-1 assertion of $300–1,000/W is "insufficiently sourced; I do not adopt it". "$5M per unit" is dimensionally unclear. An independent estimate is needed.
- **Gemini:** Silent.

### D16. Process route: carbonyl status and ACH outcome

- **Claude:** Carbonyl Fe-Ni runs as a parallel bench-to-pilot line, a co-baseline with the centrifuge. In Claude's ACH, H1 (partial-gravity melt) and H3 (carbonyl) are both least disconfirmed. H2 (pure microgravity) survives only as a refining step. CO make-up from low-carbon feed is an open risk.
- **Gemini:** Partial gravity is baseline and least disconfirmed "across full multi-element extraction". Carbonyl is the Track-A fallback for Fe-Ni only.
- **GPT:** Qualify centrifuged cartridges first "without declaring alternatives impossible". Carbonyl is "legitimate" but not a qualified replacement: selectivity, toxic gas, CO supply and deposition are open. GPT disputes the finding's microgravity-impossibility and "eight orders of magnitude" claims, which neither of the others addresses.

### D17. Fallback design, gates and Earth delivery cost

- **Claude:**
  - Fallbacks: F-A carbonyl-only; F-B Earth supply; F-C lunar-surface processing ($15–40B).
  - G1 at year 4–5: ≥90% recovery on ≥10 kg batches, ≤2 kWh/kg feed, ≥100 autonomous cycles.
  - G2 at pilot + 2 yr: delivered cost below Earth-launch $/kg, and ≥50% of nameplate for 6 months.
  - Earth delivery: $5–15k/kg expendable today, $0.5–3k/kg if refuelled reusable. Report both; do not average.
  - Null option costed at $1–35B.
- **Gemini:**
  - Track A: carbonyl. Track B: Earth billets and PV.
  - Trigger: failure to show >70% purity separation at TRL 6 by Year 4.
  - Fallback: 100–200 t at $1–2B.
- **GPT:**
  - Gate: ≥100 cycles with injected faults, ≥90% recovery, compliant alloy, ≤2 kWh/kg concentrate, ≥70% availability, and autonomous shutdown/restart. GPT labels these as proposed, not published, thresholds.
  - Fallback: 100 t at $1–3B ($10–30k/kg including manufacturing).
  - Trigger at the Phase-1 procurement decision.
  - A lunar refinery "is a separate major program, not a cheap flight-proven fallback".

### D18. Phase-1 deliveries to SE-L1

- **Claude:** ISRU Fe-Ni is a substitution option for structure and shielding, 20–200 t/yr, from commissioning + 2 yr. Phase 1 baselined as Earth-supplied. Alloy spec required.
- **GPT:** 20–60 t/yr accepted-alloy demonstration lots, from commissioning + 2 yr at earliest. Throttle the plant rather than stockpile. A signed customer material breakdown is needed before authorisation.
- **Gemini:** 150–300 t/yr of structural Fe-Ni, ballast and oxygen/water volatiles.

All three note that PV, cells and semiconductor-grade material must come from Earth.

### D19. Station location

- **Claude:** Leans cislunar (DRO or EML1/2), citing ARM-class return Δv, 1.3 s latency and low-energy manifold transfer. L4/L5 has few known Trojans (e.g. 2010 TK7 at 20.9°), which makes co-location there impractical. Concedes reasonable engineers can prefer L4/L5.
- **Gemini:** The F19 proposed change says "re-evaluate toward DRO/EML2", citing <0.5 km/s and <30 days to SE-L1, against 1.2–1.8 km/s from L4/L5. Its §5 lists both advocate positions.
- **GPT:** A "genuine multi-attribute trade-off, not something orbital stability settles". Asteroid co-location is a third option. The round-1 1–3 km/s figures are "not universal transfer costs".

### D20. EP propellant at the station

- **Claude:** About 190 t/yr Kr/I transferred and loaded at the station, so a procurement line is needed.
- **GPT:** About 140 t/yr (100–200) procurement. GPT's cycle assumes no propellant is supplied at the asteroid.
- **Gemini:** 0 t/yr propellant exchange in Phase 0A.

### D21. bom-0-6 in Phase 0

- **Claude:** No Phase-0 LOX/LH₂ consumer exists. Question whether bom-0-6 should exist in Phase 0. The trade (optionality against $2B) is a values question.
- **GPT:** Keep as a separate gated scope ($0.3–1B). Deploy only against a measured water yield and a customer.
- **Gemini:** Keep. A volatile interface of 15–40 t/yr feeds Phase-0B electrolysis.

### D22. Docking provisions and "human-rated" language

- **Claude:** Robotic berthing only. Drop "human-rated".
- **GPT:** Robotic servicing interfaces and optional docking clearance. "Structural provisions are not human-rating."
- **Gemini:** Passive IDSS docking interfaces for potential Phase-1 upgrade. Silent on the label.

### D23. Communications and autonomy

| | Claude | Gemini | GPT |
|---|---|---|---|
| Average | 1–10 Mbit/s | 0.5 Mbit/s (robot link); 10–100 Mbit/s station telemetry/teleop | 0.1–1 Mbit/s |
| Burst | 50 Mbit/s | 10 Mbit/s (robot link) | 10–100 Mbit/s |
| Ground segment in BOM | No | Yes | No |
| Autonomy | Local autonomy | Tele-robotics benefits from DRO latency | 8.3 min one-way at L4/L5 requires local fault containment |

### D24. Heat rejection

- **Claude:** About 1 MW at 350 K, about 700 m², 4–7 t plus high-temperature loops.
- **GPT:** 0.3–0.6 MW, 420–830 m² ideal, with a 500–1,500 m² allowance.
- **Gemini:** No radiator line.

### D25. Energy per kg at 50 kt/yr

| Product | Claude | Gemini | GPT |
|---|---|---|---|
| Fe-Ni | 3.4–8.6 MW | — | 3–9 MW |
| Al | 85–170 MW (15–30 kWh/kg) | MRE 10–15 kWh/kg | 86–170 MW (15–30 kWh/kg) |
| Solar-grade Si | 340–850 MW (60–150 kWh/kg) | 30–60 kWh/kg | 340–1,140 MW (60–200 kWh/kg) |
| Mixed oxides | — | 57 MW average at 10 kWh/kg; 70–90 MWe installed | — |

GPT adds that whether 50 kt/yr means feed or product is unresolved in the original spec.

---

## 4. Proposed BOM delta

> **All entries are proposals for human review.** None is a panel decision. Costs are as stated by each model. "Conf." is the model's own stated confidence where given; "n/s" means not stated.

| # | Action | Item | Supporting models | Quantity | Unit-cost range (by model) | Conf. |
|---|---|---|---|---|---|---|
| 1 | Resize | bom-0-3 station | Claude, Gemini, GPT | 1 uncrewed demonstrator (Claude 0.2–1 kt/yr feed; Gemini 300–500 t/yr; GPT gated, 200–450 t/yr) | Claude $8–16B; Gemini $9.5–15.5B; GPT $8–18B. Scopes differ (D14). | Claude low; Gemini medium; GPT low |
| 2 | Remove | Crew habitat, life support, visits | Claude, GPT (explicit lines); Gemini (within resize rationale) | All | $0 credit. GPT: "no defensible cost credit established." Gemini: 20–40 t mass saved. | Claude high; GPT high; Gemini high |
| 3 | Add | Asteroid-side beneficiation and packaging | Claude, Gemini, GPT | Claude 1–2; Gemini 2; GPT 1 staged capability | Claude $0.2–0.5B; Gemini $0.25–0.45B; GPT $0.3–1B | n/s |
| 4 | Add | Product transfer, station to SE-L1 | Claude, Gemini, GPT | Claude 1–2 vehicles or tasked bom-0-4; Gemini 2 tugs (text says 2–3); GPT 2 vehicles | Claude $150–400M; Gemini $150–300M (text: $300–500M total); GPT $150–400M (text: $0.3–0.8B for two) | n/s; GPT low |
| 5 | Add | Earth-supplied Phase-1 fallback / null option | Claude, Gemini, GPT | Claude: scenario at $0.5–15k/kg; Gemini 100–200 t; GPT 100 t | Claude $1–35B; Gemini $1–2B; GPT $1–3B | GPT low |
| 6 | Add | Precursor / qualification programme | Gemini (BOM line); Claude, GPT (inside bom-0-3 envelope) | 1 | Gemini $350–500M (orbital centrifuge flight); Claude $0.5–1B; GPT $0.5–1B | Claude low; GPT low |
| 7 | Add | Short-arm centrifuge furnace (within bom-0-3) | Claude only. Gemini and GPT carry a 50 m rotating module (D10). | 1–2 | $0.3–1B | Claude medium (geometry), low (process) |
| 8 | Add | Carbonyl Fe-Ni line (within bom-0-3) | Claude only. Gemini: fallback track. GPT: to be tested. | 1 bench-to-pilot | $0.2–0.8B | Claude low |
| 9 | Add | Integrated trajectory and propellant study | Claude (BOM line); Gemini and GPT call for the analysis without a line | 1 | $5–20M | n/s |
| 10 | Add | EP propellant procurement (Kr/I) | Claude (BOM line); GPT (interface and missing item); Gemini 0 t/yr | Claude about 190 t/yr; GPT 100–200 t/yr | Claude $50–400M per yr | n/s |
| 11 | Add | Ground segment, operations, spares logistics | Claude (BOM line); GPT (missing item); Gemini lists ground segment as already in BOM | 1 | Claude $0.3–1B, ops $0.15–0.4B/yr; GPT ops $0.1–0.3B/yr | n/s |
| 12 | Add | Station launch, transfer, assembly, checkout | GPT (BOM line); Claude (missing item; launch $0.4–2B inside unit cost) | 1 campaign | GPT $1–5B | GPT low |
| 13 | Add | MW-scale rotary joints and dynamic seals | Gemini only (missing items, not in YAML). Claude and GPT propose avoiding MW joints (D10). | 1 development | $150–250M | n/s |
| 14 | Resize | bom-0-2 mining robots | Claude (BOM line); Gemini (text: 4–6 robots); GPT (stage procurement, no count) | Claude 4–6 units, staged | Claude $50M per unit | n/s |
| 15 | Split | bom-0-5 into a station allocation plus a conditional remainder | Claude, GPT. Gemini gives an allocation with no split. | Claude 0.8 MWe; GPT 0.5–1.5 MW | $0, accounting only | Claude medium; GPT medium |
| 16 | Keep or question | bom-0-6 | GPT keep as a separate gated scope; Gemini keep (Phase-0B interface); Claude questions Phase-0 existence (D21) | 1 | GPT $0.3–1B | n/s |
| 17 | Add | Missing scope items without BOM lines: startup-feed strategy; electrical distribution and heat rejection ownership; robotic servicing; Phase-1 material procurement; containment and contamination control; phase-wide cost baseline | GPT | — | n/s | — |
| 18 | Add | Alloy acceptance specification and Phase-1 demand model | Claude, GPT. Gemini silent. | 1 | n/s | — |

---

## 5. Open questions

| # | Question | What would settle it | Raised by |
|---|---|---|---|
| 1 | Which NEA targets and station orbit minimise feed plus product delivery Δv and time, including synodic windows? Is cislunar, L4/L5 or co-location preferred? | Integrated target × orbit × SE-L1 trajectory study (Claude: $5–20M) with validated low-thrust solutions, degradation and eclipses (GPT) | All |
| 2 | Does fleet delivery hold within 200–650 t/yr once real trajectories, duty factor and startup lag are included? | The same study. GPT's falsifier: a validated trajectory giving <200 t/yr. | Claude, GPT |
| 3 | Can 50 kt/yr ever close, and by which route: co-location, asteroid propellant, or high-thrust/MW logistics? | Phase-1 architecture study. Independent assessment of Kr/I world supply (GPT disputes the unsourced figure; Claude flags krypton as an estimate). | Claude, Gemini, GPT |
| 4 | What concentration ratio and recovery does real feed give: 5–15:1, 10:1 or 33:1? | Beneficiation tests on representative chondrite feed and assays (bom-0-1 data) | All |
| 5 | Does 0.1 g, with or without filtration, give ≥90% recovery? Does Coriolis flow at 4–7 rpm degrade it? What minimum g is needed to suppress foaming? | Rotating-tank analogue tests and CFD (Claude falsifier: >10% loss vs. static). Orbital centrifuge flight with 1–5 kg melts (Gemini). ≥100-cycle representative-feed campaign (Claude, GPT). | All |
| 6 | Which radius: short arm (2–10 m) or 50 m? | Process tests above plus a rotating-system mass and dynamics design. GPT: a subsystem BOM and dynamic/thermal design. | Claude, Gemini, GPT |
| 7 | Can MW-class rotary electrical joints survive 10+ yr in vacuum, or can rotor power stay ≤0.3 MW? | Life testing (Gemini). Trade of on-rotor generation, contactless and batch transfer (GPT). | Gemini, GPT, Claude |
| 8 | Can carbonyl close its CO loop on low-carbon feed? Is selectivity on mixed Fe-Ni adequate? | Bench test on chondrite-analogue concentrate. Claude falsifier: <50% Ni recovery or >5% CO loss per cycle. | Claude, Gemini, GPT |
| 9 | What Earth-to-SE-L1 delivered $/kg applies, and does the station beat it for structural mass? | Supplier-informed costing across scenarios. Claude: report both scenario ends and do not average. Claude falsifier: refuelled heavy lift below $2k/kg. | Claude, GPT |
| 10 | Does Phase-1 collector mass include blankets? What fraction can station alloy supply, and to what spec? | Customer material breakdown and alloy acceptance spec | Claude, GPT |
| 11 | Is there any Phase-0/1 LOX/LH₂ consumer at ≥100 t/yr? If not, should bom-0-6 exist in Phase 0? | Mission model (Claude's falsifier for deletion) | Claude, GPT |
| 12 | Is $5/W for bom-0-5 credible? | Independent sourced array cost and mass estimate | Claude, GPT |
| 13 | How is the station supplied before first indigenous feed arrives? | Startup-feed strategy: pre-positioning, delayed deployment or Earth commissioning batches | GPT |
| 14 | What is a normalised, common-scope cost for the station? | Scope normalisation before comparing estimates | GPT, Claude |
| 15 | What do rq-0-18, -28, -29, -47 and -48 actually conclude? | Supply the records | Claude, GPT |
| 16 | Can autonomous operation contain molten-process faults without crew? | Fault-injection campaigns. GPT falsifier: frequent unrecoverable failures. Gemini falsifier: MTBF <2,000 h for furnace cleaning. | GPT, Gemini |
| 17 | Can iodine propulsion meet the required power throughput and lifetime? | Thruster qualification data | GPT |

---

## 6. Decision-quality audit

### 6.1 Per decision

**A. Phase-0A throughput (and location, for GPT)**

- **Claude (D1):**
  - Weakest link: **frame**. Round 1 treated throughput as a station property when it is a transport-architecture outcome.
  - Sensitivity point: the throughput × Δv product.
  - Trade-off point: demonstration scale (more process data) against cost and closure risk.
  - Certainty: "very likely, high confidence".
- **Gemini (D1):**
  - No weakest link named.
  - Sensitivity point: throughput coupled to exhaust velocity and power.
  - Trade-off point: lower throughput against early material independence from Earth.
  - Certainty: ">99%, Grade A".
  - Falsifier: an NTR or tether delivering >10,000 t/yr.
- **GPT (DQ-1):**
  - Weakest link: **information**, then **values**. The project has not said whether output or learning is the primary benefit.
  - Trade-off point: Earth accessibility against source proximity.
  - Unsupported: ARM-based productivity is not evidence unless its target and Δv assumptions also hold.
  - Certainty: "very likely, high confidence" for failure at 50 kt. Meeting 300 t/yr is "plausible" with no likelihood assigned.

**B. Rotating module and partial gravity**

- **Claude (D2):**
  - Weakest link: **alternatives**. Only the inherited geometry was considered.
  - Unsupported: the A6 "convergence" on 50 m / 1.4 rpm. All three models inherited it from rq-0-11, and "agreement is not evidence".
  - Trade-off: radius against mass. Claude calls this "close to a dominance case" for an uncrewed process.
- **Gemini (D3):**
  - No weakest link named.
  - Treats the rq-0-11 geometry as the adopted decision.
  - Accepted downside: 25–35 t and MW joints.
- **GPT (DQ-2):**
  - Weakest link: **information**.
  - Unsupported: sufficiency of a fixed 0.05–0.15 g band for industrial product (no probability assigned, low confidence). The case for lowering contingency to 15–20% (GRADE: mechanism, maturity and feasibility are separate evidence categories).
  - Trade-off: added gravity against mechanical mass, disturbance and maintenance.

**C. Process route (ACH)**

- **Claude (D3):** Weakest link: **information**. No representative-feed data exist.
- **Gemini (D3, within ACH):** No weakest link named. Partial gravity is least disconfirmed for multi-element extraction.
- **GPT (DQ-2):** Weakest link: **information**. Alternatives should not be declared impossible.

**D. Power allocation and backbone**

- **Claude (D4):**
  - Weakest link: **reasoning**. rq-0-14 sized the backbone for a propellant plant with no consumer.
  - Reclassified as a **values / real-options trade-off**: up-front cost against later retrofit cost.
- **GPT (DQ-3):**
  - Covers power within product scope.
  - Weakest link: **values and commitment**. Round 1 proposed outputs without a committed customer.
  - Reclassified strategic learning versus near-term production as a **values trade-off, not a missing measurement**.
- **Gemini:** No decision record on power.

**E. Propellant, cryogenics and bom-0-6**

- **Claude (D5):**
  - Weakest link: **frame**. Supply was designed without demand.
  - Missing step: the null option (no electrolysis in Phase 0) was never scored.
  - Reclassified optionality for future chemical tugs against $2B now as a **values trade-off**.
- **GPT (DQ-4):**
  - Weakest link: **alternatives and information**. Round 1 discussed crew-visit frequency without a quantified failure/intervention model.
  - Unsupported: depot-scale reliability inferred from small-cryocooler heritage.
  - Trade-off: interface mass now against redesign avoided later.
- **Gemini:** No decision record. It adopts the rq-0-14 and rq-0-30 provisions.

**F. Station existence, fallback and product mix**

- **Claude (D6, GRADE EtD):**
  - Weakest link: **alternatives**. The null option is missing.
  - Reclassified as a **values trade-off**: long-run independence against near-term Phase-1 cost.
  - Likelihood the station beats Earth supply by year 15: "about as likely as not", low confidence.
- **GPT (DQ-1 and DQ-3):** Includes an Earth-supply option in both matrices. Weakest link: **values and commitment**.
- **Gemini:** No existence or null-option decision record. Its D1 options are status quo, pilot, and massive fleet.

**G. Crew**

- **Claude (D7):**
  - Weakest link: **commitment**. "Human-rated provisions" language keeps an unfunded requirement alive.
  - Uncrewed dominates: "very likely, high confidence".
- **Gemini (D2):** Weakest link: **alternatives**. Round 1 framed the choice as quarterly against annual visits and overlooked fully autonomous operation.
- **GPT (DQ-4):** Weakest link: **alternatives and information**. No intervention model exists.

### 6.2 Cross-cutting critiques of Round 1

- **Cost convergence:**
  - Claude: the A11 "overlap $9.5–14B" averages three different scopes and has no referent.
  - GPT: the $11.5–12B convergence is "not independent evidence"; normalise scope first.
  - Gemini: silent.
- **Null option:** Claude says it was never evaluated in any round. GPT includes it. Gemini does not.
- **Contingency:** Claude (50%) and GPT reject the cut to 15–20%. GPT: contingency follows risk, not architecture choice.
- **Qualification gates:** GPT says the round-1 gates (fixed 6N Si purity, ≥25 kt/yr throughput, ≥1 MW rotary joint) are not linked to customer requirements or the resized architecture.
- **Divergences reclassified as trade-off or values points rather than averaged:**
  - Design life, 10–15 vs. 30 yr (GPT: values/economics; "not a number to average").
  - Earth $/kg (Claude: a scenario; report both ends).
  - Location (GPT: multi-attribute trade-off).
  - Power backbone and bom-0-6 (Claude: real options and values).
  - Station existence (Claude: values).
  - Learning vs. production (GPT: values).
- **Governance:** GPT names **commitment** as the weakest link in the entire reconciliation. Each accepted change needs an owner, a controlled requirement, a funding disposition and a verification event.

### 6.3 Coverage of the models' own decision records

- **Claude:** Seven decisions, using the Composite Scaffold, QOC, ACH and GRADE EtD. D3 (ACH) and D5 are abbreviated and do not run all nine scaffold steps.
- **Gemini:** Three decisions (throughput, crew, partial gravity). Its D3 omits explicit criteria and weights, sensitivity analysis, certainty, falsifier and consequences. Weakest links are named only for D2. No records for power, propellant, fallback or existence.
- **GPT:** Four decision records, each covering all nine steps, plus a cross-cutting section.

---

## Reviewer note

These are rapporteur observations on the panel's output. They are not technical claims.

1. **Transport method.** Gemini's F01 derivation computes thrust time from acceleration at the loaded return mass. Claude and GPT identify that constant-loaded-mass method as the error in the finding. Gemini does not engage with the correction, and its exhaust velocity (24.5 km/s) differs from the 20 km/s used by the others. The three fleet ranges overlap, but their bases are not comparable.
2. **Internal inconsistencies within individual responses:**
   - Gemini states a 380 t initial mass in its spec but "<200 t" process equipment in its D1 consequences.
   - Gemini's tug cost differs between its missing-items list and its BOM line.
   - Gemini marks the bom-0-2 interface `in_bom: false`, while Claude and GPT mark it true.
   - Claude's bom-0-2 unit cost is a single point ($50M–$50M) rather than a range.
3. **No normalised cost.** No model produced a common-scope cost comparison. GPT and Claude both say this is required before the three station estimates can be compared.
4. **Confidence labels diverge on shared quantities.** Gemini rates the 50 m geometry and the 900 m² sunshield "high". GPT rates the same geometry "low". Claude and GPT reject or decline to adopt the sunshield value. Human reviewers may wish to request each model's evidence basis for these ratings.
5. **Mass-only interfaces.** No model specified the bom-0-1 to bom-0-3 assay acceptance criteria beyond data rate, although Claude, Gemini and GPT all make concentration and recovery depend on feed assays. GPT notes that the acceptance criteria are absent.
