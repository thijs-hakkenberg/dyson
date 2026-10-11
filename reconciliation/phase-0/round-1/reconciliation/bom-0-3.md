---
phase: phase-0
item: bom-0-3
round: 1
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
generated: 2026-10-11T23:16:07.938Z
---

# Reconciliation: bom-0-3 Material Processing Station, Phase-0, Round 1

**Panel inputs**

| Label used here | Header in response | Self-identification in YAML | Completeness |
|---|---|---|---|
| **Claude** | Claude Opus 5.5 | "Claude (Anthropic)" | YAML truncated partway through `revised_spec`. There are no YAML `interfaces`, `bom_delta` or `open_questions`; the prose §3–§5 are used instead. |
| **Gemini** | Gemini 3.8 Flash | "senior-space-systems-engineer" | Complete |
| **GPT** | GPT-6.1 Sol | "GPT-5.2" | Complete |

Positions are attributed by response header. The mismatched self-identifications are recorded in the Reviewer note.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F01** Transport capacity vs. station throughput | agree | agree | **partly** |
| **P0-F02** Mining, transport and processing rates disagree | agree | agree | agree |
| **P0-F03** Station power vs. 50 kt/yr | agree (with refinement) | agree | **partly** |
| **P0-F10** Crew not budgeted | agree | agree | agree |
| **P0-F15** Concluded deliberations not written back | agree (with corrections) | agree | **partly** |
| **P0-F18** No metallurgy fallback | agree | agree | **partly** |
| **P0-F19** Phase-0 output not tied to Phase-1 demand | agree | agree | agree |

**Where the panel stands on each finding**

- **P0-F01:** All three agree the fleet falls short of 50 kt/yr by about two orders of magnitude.
  - Claude: 0.3–1.0 kt/yr, or ≤4–5 kt/yr for ultra-low-Δv targets.
  - Gemini: about 430 t/yr.
  - GPT: 200–600 t/yr.
  - GPT's "partly" concerns method. It argues that applying loaded mass to both legs overstates trip time, and that the vehicle array power is optimistic: 98–163 kW at 1 AU for 300–500 m².
- **P0-F02:** Unanimous that duty cycle and concentration ratio must be stated. The proposed values diverge widely (see D5).
- **P0-F03:** All agree the mixed-product refinery is underpowered. GPT's "partly" is that power must be computed per product yield, not per feed mass, and that industrial energy figures must not be relabelled as demonstrated molten-regolith electrolysis (MRE) performance.
- **P0-F10:** Unanimous: Phase 0 is uncrewed.
- **P0-F15:** All agree rq-0-11, rq-0-14 and rq-0-30 contradict the current specification.
  - Claude and GPT both find quantitative errors in rq-0-14 and rq-0-30.
  - GPT adds that the repository-wide "eight of nine" claim cannot be verified from the supplied material.
- **P0-F18:** All agree a qualified process and a costed fallback are missing. GPT disputes that pure-microgravity metallurgy has been shown impossible, and that partial gravity has been shown sufficient.
- **P0-F19:** Unanimous that demand, composition, schedule and delivery to SE-L1 are not tied to station output, and that a product-delivery leg is missing.

---

## 2. Agreed changes

These are changes all three models support, at least in direction. Where the values do not converge, the change is listed here and the numbers are carried into §3.

| # | Change | Consolidated value / range | Notes on convergence |
|---|---|---|---|
| A1 | **Phase 0 is uncrewed.** Remove quarterly crew visits, habitat and life support. | No crew systems in Phase 0 | All three. Claude estimates a 20–40 t saving. Whether to keep docking provisions and call them "human-rated" is divergent (D10). |
| A2 | **Cut Phase-0 (initial) station throughput well below 50 kt/yr.** | Direction agreed; magnitude **not** converged | Claude 1–5 kt/yr (ref. 3 kt). Gemini 3–8 kt/yr (ref. 5 kt). GPT 200–600 t/yr (ref. 300 t). No range is common to all three (D1). |
| A3 | **Allocate station power explicitly from bom-0-5.** | Allocation required; value not converged | Claude 1.5–3 MWe plus 1–3 MWth. Gemini 4–7.5 MW. GPT 0.5–1.5 MW installed (D4). |
| A4 | **Define the full mass-flow chain**, with peak rate, duty cycle, beneficiation and concentration stated separately in the bom-0-2 and bom-0-3 specs. | Required; values not converged | See D5. |
| A5 | **Add a beneficiation/concentration step at the asteroid.** Today the BOM implies raw ore is shipped. | Required | Claude: on-robot beneficiation. Gemini: a separate facility (BOM add). GPT: crushing, sorting, separation, packaging and assay. |
| A6 | **Adopt a rotating partial-gravity melting/separation module** as baseline (Claude, Gemini) or leading candidate (GPT). | **0.1 g (0.05–0.15 g), 50 m radius (40–60 m), ~1.4 rpm (0.9–1.8 rpm)** | Rotation-rate ranges: Claude 0.95–1.7, Gemini 1.2–1.8, GPT 0.9–1.8. GPT gives low confidence that this solves process adequacy. Mass penalty is divergent (D7). |
| A7 | **Add product delivery from the station to the Phase-1 node at SE-L1.** It is not in the BOM. | New line or task required | Delivery Δv depends on location (D3). |
| A8 | **Phase propellant production.** No full electrolysis or liquefaction in Phase 0A; volatile capture only. | Volatile capture in 0A; propellant plant deferred | Claude: 5–10 t capture hardware. GPT: 0–15 t/yr captured water, with electrolysis charged to bom-0-6. Gemini: capture active in 0A, full plant at a 25 kt/yr gate. The gate criterion and the existence of a consumer are divergent (D13). |
| A9 | **Define a costed fallback that includes Earth-supplied material or PV for Phase 1** if station processing fails. | Required; cost basis divergent | Other fallback branches differ (D12). |
| A10 | **Write rq-0-11, rq-0-14 and rq-0-30 back into the bom-0-3 spec.** | Required | GPT and Claude say: only after correction. Gemini proposes incorporating them as stated. |
| A11 | **Raise the bom-0-3 unit cost above the current $10B.** | Point estimates $11.5–12B. Common overlap of ranges: **$9.5–14B** | Claude $12B ($8–20B). Gemini $11.5B ($9.5–14B). GPT $12B ($8–16B). Scope boundaries differ (D19). |

---

## 3. Preserved divergences

### D1 — Magnitude of Phase-0A throughput

| Position | Held by | Reasoning |
|---|---|---|
| **1–5 kt/yr** (ref. 3 kt) | Claude | Keck ARM scaling (Brophy et al., 2012) gives about 1.2 t/yr per kWe. At 3 MWe fleet power that is ≤4–5 kt/yr, but only with return Δv ≤0.5 km/s and an Earth–Moon destination. Claude's own non-ARM fleet estimate is 0.3–1.0 kt/yr. |
| **3–8 kt/yr** (ref. 5 kt) | Gemini | Sized to "initial transport and 5 MW power". Gemini's own F01 fleet estimate is about 430 t/yr, so the 5 kt/yr figure assumes an up-scaled transport architecture. |
| **200–600 t/yr** (ref. 300 t) | GPT | Two-leg rocket-equation calculation: 80 t dry, 200 t cargo, 4 km/s per leg, v_e 20 km/s, 9 N thrust. That gives about 8.2 calendar years per cycle and about 365 t/yr for 15 vehicles. GPT calls Phase 0 a demonstration, not a refinery. |

### D2 — Status of the 50 kt/yr target

| Position | Held by | Reasoning |
|---|---|---|
| Gated "design-for" goal for Phase 0B/1 (20–50 kt/yr, low confidence) | Claude | Needs a 100–300 MWe transport system, or primary processing at the asteroid. |
| Committed Phase 0B full build (35–60 kt/yr, medium confidence); full-build mass 950 t (850–1,150 t) | Gemini | 28 MW bus and scaled transport. |
| Unfunded expansion objective; full-build mass **withdrawn** pending industrial design | GPT | No validated equipment or radiator inventory. 50 kt/yr would need about 2,050 vehicles of the reference design, or about 20 MW per vehicle. |

### D3 — Station location

| Position | Held by | Reasoning |
|---|---|---|
| **Relocate to Earth–Moon space** (lunar DRO / EML1-2) | Claude | Supporting points: <br>• ARM heritage. <br>• 1.3 s latency, which enables teleoperation. <br>• 0.05–0.5 km/s manifold transfers to SE-L1 (Genesis-type heritage). <br>• By contrast, SE-L4→L1 costs about 1–3 km/s. |
| **Retain SE-L4/L5**, with co-location at the asteroid as an open alternative | Gemini | L4/L5 gives fixed geometry, a benign environment and permanent Earth line-of-sight. Gemini puts L4/L5→L1 at 1.2–2.0 km/s via low-energy transfers. |
| **Trajectory-selected**; L4/L5 remains a candidate. Do not freeze it before jointly optimising asteroid access and L1 delivery. | GPT | L4/L5 stability does not imply low transport cost. Co-location or an Earth-accessible orbit may dominate. |

Claude also lists asteroid co-location and SE-L4 as defensible. It notes that co-location still leaves 10–20 kt/yr of product needing about 20+ MWe of tugs, and that Earth Trojans are few and high-inclination.

### D4 — Power: allocation, 50 kt/yr estimate, and bom-0-5 pricing

| Topic | Claude | Gemini | GPT |
|---|---|---|---|
| Phase-0A allocation | 2 MWe (1.5–3), plus 2 MWth (1–3) solar thermal, plus a 4–5 MW backbone per rq-0-14 | 5 MW (4–7.5) | 1 MW installed (0.5–1.5); 0.15–0.4 MW average |
| Power at 50 kt/yr | 10–20 MW (5–10 MWe electric); 50–90 MW for a pure-MRE flowsheet | 18–25 MW in text; 28 MW (22–35) in spec and summary | Product-dependent. Producing 50 kt/yr of a single product needs: <br>• Fe-Ni: 2.9–8.6 MW <br>• Al: 86–143 MW <br>• Metallurgical Si: 68–114 MW <br>• Solar-grade Si: 342–1,142 MW |
| Backbone | Retain 4–5 MW | Not stated separately | Do not retain 4–5 MW as if it suited a 50 kt/yr refinery |
| bom-0-5 pricing ($5/W) | Underpriced by 1–2 orders of magnitude. Flown arrays cost about $300–1,000/W; aggressive future values are $20–50/W. Reprice. | Draw 25–30 MW from the 100 MW array; no pricing comment | Split into initial allocations plus a conditional 100 MW expansion. Prices need separate reassessment. |

Divergent energy-per-kg anchors:

| Process | Claude | Gemini | GPT |
|---|---|---|---|
| Al | 13–20 kWh/kg | 11–15 kWh/kg | 15–25 kWh/kg (expanded boundary) |
| Solar-grade Si (incremental or total) | +40–100 kWh/kg | 25–40 kWh/kg (zone refining) | 60–200 kWh/kg |

### D5 — Mass-flow chain values and robot fleet

| Parameter | Claude | Gemini | GPT |
|---|---|---|---|
| Duty cycle | 20–40% engineering duty cycle; robots transport-limited to about 5–10% utilisation | 25% | 1.1–2.9% at the reference excavation rate. GPT notes the original 1,000 t/yr target implies 2.3–5.7%. |
| Concentration | 2–4× (30–60% metal concentrate from 10–20 wt% metal in chondrites) | 2.5:1 | About 33:1 (3% mass yield; range 2–6%). Recoverable metal fraction of 2.25% is an assumed target-selection criterion. |
| Excavated | 4–20 kt/yr | 100–150 kt/yr (full build) | 5–15 kt/yr |
| Robot fleet | Cut to 4–8 units | 20, implied by the chain | Up to 20, procured in stages |
| Caveat | — | — | Do not use a presumed concentration ratio to claim closure before representative-feed tests |

### D6 — Initial station mass

| Value | Held by | Basis |
|---|---|---|
| 300 t (250–400), down from 400–500 t | Claude | Judgement (bottom-up) |
| 450 t (420–520), essentially unchanged | Gemini | Rollup including rotating truss and counterweights |
| 350 t (200–500) | GPT | Smaller process line, but substantial robotic and thermal infrastructure |

### D7 — Rotating-module mass penalty and contingency

| Topic | Claude | Gemini | GPT |
|---|---|---|---|
| Penalty (rq-0-11 says 10–15 t) | 15–40 t (ref. 25 t), because of counterweight, bearings and a MW-class power rotary joint; +$0.5–1.5B | Not quantified; lists rotary power-transfer joints as an unaccounted mass/cost item | 20–80 t allowance; does not accept 10–15 t without validation |
| Contingency | 40% (30–50%) until gate G1 is passed; rejects rq-0-11's 15–20% | Not stated | 40–60%, within the $8–16B budget |
| Rotary joint | MW-class joints have no flight heritage (ISS SARJ is tens of kW) | Requires slip rings or rotary transformers | Not separately addressed |

### D8 — Microgravity feasibility and primary process route

| Position | Held by | Reasoning |
|---|---|---|
| Zero-g molten droplet containment is "unfeasible"; the rotating module eliminates it | Gemini | Buoyancy separation replaces zero-g slag separation. A <10⁻⁵ g hub would support zone refining, but needs counter-rotating momentum compensation and active vibration isolation. |
| Gravity zones as baseline, **plus a gravity-independent carbonyl (Mond) route** for Fe-Ni | Claude | Gas-phase process with Vale Clydach heritage since 1902; no melt or slag handling. CO comes from C-type volatiles or Earth. |
| Pure microgravity is **not shown impossible**; partial gravity is **not shown sufficient** | GPT | Crucibles, wetting control, EM forces, filters and centrifuging are alternatives. Bond-number argument: at 0.1 g, Bo ≈ 29 at 0.1 m but ≈ 0.29 at 0.01 m, so no single g threshold guarantees slag-droplet removal. Proposes an enclosed rotating cartridge with no dedicated solar-grade Si module. |

### D9 — Solar-grade silicon and product mix

| Position | Held by |
|---|---|
| Solar-grade Si is R&D only (0.001–1 t/yr); Al/Si pilot only; prioritise Fe-Ni, O₂/water and ceramics | Claude |
| Keep Si in scope, gated: if 0-g refining fails to reach 6N by a TRL-6 gate in year 3, fall back to terrestrial cells. Align products to structural Al/Fe-Ni, glass/fused silica and crude Si ingots. | Gemini |
| Initial product is native Fe-Ni only; defer oxide reduction and solar-grade Si; Al, Cu, Si and cells Earth-supplied initially | GPT |

GPT also raises whether Fe-Ni has limited value to a PV-dominated Phase 1.

### D10 — Docking provisions and "human-rating"

| Position | Held by |
|---|---|
| Keep human-rated docking ports and structural provisions per rq-0-18 (about +1–3 t) | Claude |
| Keep docking interfaces and an unpressurised berthing node to human-rating structural specs per rq-0-18 | Gemini |
| Reserve future docking geometry only if inexpensive. **Do not describe structural provisions alone as human-rating.** The rq-0-18 detail was unavailable. | GPT |

### D11 — Teleoperation and communications

| Position | Held by |
|---|---|
| Teleoperated; 1.3 s latency (Earth–Moon) makes this practical; about 10–100 Mbps continuous | Claude |
| Autonomous and tele-robotic; about 100 Mbps uplink/downlink | Gemini |
| 0.1–1 Mbit/s average, 10–100 Mbit/s burst, buffered. Latency requires local fault management rather than continuous Earth teleoperation (at the 8.3 min L4/L5 distance). | GPT |

### D12 — Fallback set, gates and Earth-supply cost

| Element | Claude | Gemini | GPT |
|---|---|---|---|
| Fallback branches | A. Carbonyl-only Fe-Ni ($1–3B) <br>B. Earth-launched material <br>C. Lunar-surface processing ($15–40B) | Terrestrial PV cells, with station output limited to structural material; asteroid-surface or lunar processing if rotating smelting fails | Earth-supplied metal, Si and PV for a limited Phase-1 demonstrator. Lunar processing is "not a cheap, flight-proven fallback". |
| Gates | G1 (year 4–5): slag separation <90% on ≥10 kg at ≤0.15 g, or rotary joint unqualified at ≥1 MW. <br>G2 (pilot +2 yr): <50% of nameplate for 6 months, or >$2,000/kg delivered. | TRL-6 gate at year 3 for 6N Si | Before production commitment: <br>• ≥100 representative cycles <br>• ≥70% saleable alloy yield <br>• ≤2 kWh/kg feed <br>• autonomous fault recovery |
| Earth delivery cost | $500–2,000/kg to SE-L1, giving $2B to >$400B across the 3.5–227 kt demand range | Not costed | $10,000–30,000/kg allowance, giving $1–3B for 100 t (a contingency, not a quoted price) |
| Precursor programme | $0.55–0.81B (rq-0-11 campaign) | Not stated | $0.5–1B |

### D13 — rq-0-14 propellant figures and the LOX/LH₂ consumer

| Topic | Claude | Gemini | GPT |
|---|---|---|---|
| "500 kW → 70–90 t/yr" | Wrong by 5–8×. 500 kW gives 440–730 t/yr at 6–10 kWh/kg including extraction. 1,000 t/yr needs 0.8–1.4 MW, not "2+ MW". | Not challenged | 70–90 t/yr is H₂ only (50–60 kWh/kg H₂). Combined H₂+O₂ is about 660–790 t/yr before losses. 100 t H₂ needs 800 t O₂ stoichiometrically, not 600 t. |
| Payback arithmetic | — | — | $500M ÷ $0.5–2B/yr gives 0.25–1 yr, not 5–10 yr; a demand-based lifecycle model is needed |
| Deployment gate | — | 25 kt/yr | Replace with measured water yield, customer demand and a separate energy budget |
| Consumer | **No Phase-0 BOM line consumes LOX/LH₂**, since bom-0-4 uses Kr/I electric propulsion | 500–1,000 t/yr LOX/LH₂ outbound to bom-0-4 tugs in Phase 0B | Water-derived H₂/O₂ does not close the Kr/I interface; switching propellant would need a propulsion redesign |
| Where hardware is charged | Phase 0B module in bom-0-3 (noted as duplicated with bom-0-6) | 2–3 MWe drop to bom-0-6 | bom-0-6, not double-counted |

### D14 — rq-0-30 cryogenics

| Topic | Claude | Gemini | GPT |
|---|---|---|---|
| 700 W per 100 t LH₂ tank | Optimistic. 1–6 kW for a 15–40 W leak at a 20 K stage (10–20% of Carnot). | Accepted | Not defensible without a demonstrated cooler; 1–6 kW |
| Total cryocooler budget | 10–20 kW "still holds"; spec 15 kW (10–30) | 15 kW (10–20) | No total endorsed |
| 190-day margin | Implies a ~275 W leak; at 15–40 W the margin is 3.5–9 yr (inconsistent but conservative) | Not discussed | Cannot be accepted without a transient thermal model |
| Propellant inventory in demo | Phase 0B module | Phase 0B cryo-depot | Reserve a location; do not install 700–900 t inventory during the demonstration |
| Sunshield | 900 m², 1–3 t with structure | 30 m × 30 m deployable | Conditional on an approved thermal model (rq-0-47) |

### D15 — Scope of the P0-F15 write-back

| Position | Held by |
|---|---|
| rq-0-28, rq-0-47 and rq-0-48 not provided; marked open | Claude |
| Lists rq-0-47 among incorporated conclusions but details only rq-0-11, rq-0-14 and rq-0-30 | Gemini |
| "Eight of nine" cannot be verified; gives provisional dispositions for each named conclusion (rq-0-18, 28, 29, 47, 48), noting the detail is unavailable | GPT |

### D16 — Phase-1 demand

| Quantity | Claude | Gemini | GPT |
|---|---|---|---|
| Total | 3.5–227 kt | About 1.5 kt collectors + 25 kt blankets (1,500 kg and 5,000 kg averages) | 3,519–226,850 t if the categories are additive. **Flags possible double-counting** if blankets are included in collector mass. |
| Annual | 0.35–23 kt/yr over ~10 yr | 5–10 kt/yr | 350–22,700 t/yr of hardware, not necessarily feedstock |
| Provisional interface | Fe-Ni, O₂/water, ceramics | Structural, glass, crude Si | 20 t/yr structural alloy initially, no earlier than commissioning +2 yr |

### D17 — Electric-propulsion propellant supply

| Position | Held by |
|---|---|
| Krypton demand of hundreds of t/yr likely exceeds global production. Claude's own estimate of global production (tens of t/yr) is flagged as needing verification. Iodine is the only scalable listed choice. | Claude |
| Not addressed | Gemini |
| About 140 t/yr Kr/I-equivalent for 300 t/yr cargo, plus 3–20 t/yr for product transfer; supply budget omitted | GPT |

GPT also states that 15 (not 10) vehicles should be used consistently.

### D18 — Design life

GPT alone proposes a 10–15 yr funded demonstration life (ref. 12 yr), down from 30 yr, with replaceable modules. Claude and Gemini do not address design life. Claude does assume 30-yr operations costs of $0.2–0.5B/yr.

### D19 — Cost scope

The point estimates nearly agree ($11.5–12B), but the scopes differ:

- **Claude:** $25–50k/kg all-in. Station launch ($1–4B), servicing and ground segment ($0.3–1B) and operations ($0.2–0.5B/yr) are listed as separate missing items.
- **Gemini:** includes the hybrid gravity module, sunshield and phased 5–28 MW bus.
- **GPT:** includes precursor development and 40–60% contingency. Excludes tugs, generation and the propellant plant.

---

## 4. Proposed BOM delta

**All entries are proposals for human review. None is adopted by this reconciliation.**

| Action | Item | Supported by | Quantity | Unit cost (USD) | Confidence |
|---|---|---|---|---|---|
| **Resize** | bom-0-3 station | All three (scopes differ, D19) | 1. Claude: 1–5 kt/yr pilot. Gemini: 5 kt/yr (0A). GPT: uncrewed 200–600 t/yr demonstrator. | Claude $8–20B (ref. 12). Gemini $9.5–14B (ref. 11.5). GPT $8–16B (ref. 12). | Claude low; Gemini medium; GPT low |
| **Remove** | Crew habitat, life support and visit assumptions | All three | All | Claude: −20 to −40 t. GPT: $0 (allocation change). | Claude high; Gemini high; GPT high |
| **Add (within bom-0-3)** | Rotating partial-gravity module | All three | 1 module | Claude +$0.5–1.5B, +15–40 t. GPT: 20–80 t mass allowance, cost not separated. Gemini: included in the resize. | Claude low (mass); GPT low (process) |
| **Add** | Asteroid-side beneficiation | All three in principle; differ on form | Gemini: 2 facilities. Claude: on-robot capability in bom-0-2. GPT: plant plus reject handling, unquantified. | Gemini $250–450M each; others not costed | Gemini: not stated; others not stated |
| **Add** | Product transfer, station → SE-L1 | All three | GPT: 2 EP vehicles, 30–60 t payload, 0.2–0.5 MW each, 20–60 t/yr. Gemini: task bom-0-4 or add a line. Claude: new line, 0.5–4 kt/yr. | GPT $150–400M each; others not costed | GPT low |
| **Add** | Earth-supplied Phase-1 fallback | GPT (costed); Claude (Fallback B); Gemini (terrestrial PV) | GPT: 100 t delivered to L1 | GPT $1–3B. Claude $500–2,000/kg (scales to demand). | GPT low |
| **Add (within bom-0-3)** | Carbonyl (Mond) Fe-Ni route | Claude only | 1 process line | $1–3B if used as the Fallback-A replacement for the smelter arm | Claude medium |
| **Add** | Metallurgy precursor / R&D campaign | Claude, GPT | 1 programme | Claude $0.55–0.81B; GPT $0.5–1B | Claude: not stated; GPT judgement |
| **Add** | Station launch and orbit transfer | Claude, GPT | 250–400 t (Claude) | Claude $1–4B | Claude: not stated |
| **Add** | Robotic servicing, spares logistics, teleoperation ground segment | Claude, GPT (Gemini lists comms only) | Claude: 10–30 t/yr resupply | Claude $0.3–1B, plus operations at $0.2–0.5B/yr | Not stated |
| **Add** | EP propellant procurement (Kr/I) | GPT (Claude flags as a bom-0-4 issue) | GPT: about 140 t/yr plus 3–20 t/yr | Not costed | Not stated |
| **Add** | Power distribution, rotary power transfer, thermal rejection | Gemini, GPT (Claude flags the rotary joint) | — | Not costed | Not stated |
| **Add (within bom-0-3)** | Solar-thermal concentrators | Claude | 1–3 MWth | Not costed | Claude medium |
| **Split** | bom-0-5 into initial allocations plus a conditional 100 MW expansion | GPT. Claude separately proposes **repricing**; Gemini proposes drawing 25–30 MW. | — | GPT $0 (allocation only) | Not stated |
| **Resize** | bom-0-2 mining robots | Claude (4–8 units); GPT (up to 20, staged) | Divergent | GPT retains $50M placeholder | Not stated |
| **Keep** | bom-0-4 transport, 15 vehicles pending trajectory closure | GPT | 15 | $133M placeholder (not endorsed) | Not stated |

Claude's proposals come from prose §3–§5 because its YAML `bom_delta` is missing.

---

## 5. Open questions

What would settle each remaining divergence:

| Divergence | What would settle it | Raised by |
|---|---|---|
| D1, D2, D3, D17 (throughput, location, EP propellant) | **Integrated trajectory and propellant analysis** for candidate targets and station orbits (DRO/EML, L4/L5, co-location). Inputs: unequal leg masses, installed array power at 1 AU, a startup schedule, and delivery Δv to SE-L1. Also a verified krypton supply figure and an iodine trade. | All (GPT: trajectory-validated plan; Claude: Kr supply to verify) |
| D5 (concentration, duty cycle) | **Assays and beneficiation tests on representative feed**, establishing achievable concentrate grade and recovery. Separate metal-rich and water-rich feed streams. | GPT, Claude |
| D4, D9 (power, product mix) | A **flowsheet-level energy model per product**, with reagents, anodes and recycling. Resolve the Al and solar-grade Si energy anchors (Claude, Gemini and GPT differ by 2–5×). Reprice bom-0-5 against flown-array cost data. | GPT, Claude |
| D6, D7 (mass, rotation penalty, contingency) | **Bottom-up mass rollup** including counterweight, bearings and radiators. A **rotary power-joint qualification plan at ≥1 MW** (Claude G1). Bearing lifetime and disturbance analysis at about 1.4 rpm (Gemini). | Claude, Gemini, GPT |
| D8 (microgravity vs. partial gravity) | **Partial-gravity separation tests across droplet sizes and viscosities.** Claude proposes ≥10 kg batches with a <90% efficiency gate. GPT proposes ≥100 cycles, ≥70% yield and ≤2 kWh/kg. Plus ground analogue, ISS and CFD work. A carbonyl-route bench demonstration with an asteroid-sourced CO inventory. | Claude, GPT, Gemini |
| D9 (solar-grade Si) | Evidence on whether 6N Si can be reached without terrestrial chemical precursors (Gemini's year-3 TRL-6 gate). | Gemini, Claude, GPT |
| D10 (docking) | The rq-0-18 text itself, and a definition of what "human-rated" provisions mean for an uncrewed station. | GPT |
| D11 (teleop vs. autonomy) | Follows from D3. Also autonomous fault-recovery demonstrations for a molten-metal plant. | GPT, Claude |
| D12 (fallback cost) | An agreed **Earth-to-SE-L1 delivered $/kg** basis. Claude ($500–2,000/kg) and GPT ($10,000–30,000/kg) differ by over 5×. Also a Phase-1 demand bound (D16). | Claude, GPT |
| D13 (propellant) | Identify a **consumer for LOX/LH₂**, or a decision to change propulsion. Reconcile the Claude and GPT corrections to rq-0-14 (one includes extraction energy and the other is electrolysis-only). Settle the O₂:H₂ ratio basis. | Claude, GPT |
| D14 (cryogenics) | A **transient thermal model** and a demonstrated 20 K cooler specification. The rq-0-47 and rq-0-48 texts. | Claude, GPT |
| D15 | Supply all nine concluded deliberations, including rq-0-28, rq-0-47 and rq-0-48. | GPT, Claude |
| D16 (Phase-1 demand) | Confirm whether **collector mass includes blanket mass**. Fix the Phase-1 duration, delivery calendar, material breakdown and alloy acceptance specification. | GPT, Claude |
| Programme | Whether a Phase-0 station is worth building at all if Phase-1 demand is at the low end (~3.5 kt). | Claude |
| D18 | Reliability and module-replacement analysis to set design life. | GPT |

---

## Reviewer note

These are procedural observations only. They introduce no new technical claims.

1. **Model identity mismatches.** Gemini's YAML gives `model: senior-space-systems-engineer`, and GPT-6.1 Sol's YAML gives `model: GPT-5.2`. Attribution here follows the response headers. Provenance should be confirmed before results are archived.
2. **Truncated submission.** Claude's YAML ends partway through `revised_spec`, so its machine-readable `interfaces`, `bom_delta` and `open_questions` are absent. Its §4 BOM entries here come from prose and should be confirmed with the author.
3. **Internal inconsistencies within single responses**, noted so their authors can confirm intent:
   - Gemini's Phase-0A throughput (5 kt/yr, said to match "initial transport") is about 10× its own F01 fleet estimate (~430 t/yr).
   - Gemini's 50 kt/yr power figure is 18–25 MW in the F03 text but 28 MW (22–35) in its spec and summary.
   - Gemini's F02 chain closes at 50 kt/yr station feed, which its own F01 says transport cannot deliver.
4. **Converging transport estimates.** All three non-ARM fleet estimates (Claude 0.3–1.0 kt/yr, Gemini ~430 t/yr, GPT 200–600 t/yr) overlap at roughly 0.3–0.6 kt/yr. The divergence in proposed throughput (D1) comes mainly from different assumptions about target Δv, station location and transport up-scaling, not from disagreement about the baseline fleet. Panel members may wish to make those assumptions explicit in round 2.
5. **Unit mismatch in "volatile capture".** Claude's 5–10 t is hardware mass, while GPT's 0–15 t/yr is captured water. They should not be merged into one specification parameter.
