---
phase: phase-0
item: phase
round: 1
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
generated: 2026-10-11T23:29:39.259Z
---

# Phase 0 Re-assessment: Panel Reconciliation (phase-0, round 1)

**Panel labels used throughout.** These follow the response headers:

- **Claude**: Claude Opus 5.5. Its YAML self-identifies as "Claude (Anthropic)".
- **Gemini**: Gemini 3.8 Flash. Its YAML self-identifies as "senior-space-systems-engineer".
- **GPT**: GPT-6.1 Sol. Its YAML self-identifies as "GPT-5.2".

The rapporteur does not adjudicate. Every number below is attributed to the model that stated it.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| P0-F01 Transport vs. throughput | agree | agree | **partly** |
| P0-F02 Mining-rate consistency | agree | agree | agree |
| P0-F03 Station power | **partly** | agree | **partly** |
| P0-F04 100 MW / storage | agree | agree | **partly** |
| P0-F05 $5/W array price | agree | agree | agree |
| P0-F06 Prospecting cadence | agree | agree | **partly** |
| P0-F07 Robot mass/power | agree | agree | agree |
| P0-F08 Launch line | agree | agree | agree |
| P0-F09 Comms/ops line | agree | agree | agree |
| P0-F10 Crew | agree | agree | agree |
| P0-F11 Tug propellant / ISPP customer | agree | agree | agree |
| P0-F12 NRE, pathfinders, contingency | agree | agree | agree |
| P0-F13 Organization spec | agree | agree | agree |
| P0-F14 Debris/contamination | agree | agree | agree |
| P0-F15 Deliberations not written back | **partly** | agree | **partly** |
| P0-F16 Consensus docs vs. BOM | agree | agree | agree |
| P0-F17 "Pure research" | agree | agree | agree |
| P0-F18 Metallurgy fallback | agree | agree | **partly** |
| P0-F19 Phase 1 demand link | agree | agree | agree |

No model returned "disagree" on any finding.

### Where the panel stands, finding by finding

**P0-F01.** All three say transport does not close against 50 kt/yr.
- Claude puts the shortfall at about 100–170× and Gemini at about 185×.
- GPT agrees on the failure but disputes the finding's derivation, because the return leg is lighter. Claude also splits the legs.
- Proposed fixes differ (see D1 and D6).

**P0-F02.** Unanimous that duty cycle and yield must be defined.
- Duty-factor values differ: Claude 20–35%, Gemini 15%, GPT about 11%.
- Claude and GPT both independently flag rq‑0‑26's torque/power figures as inconsistent, at about 10 kN·m implied. Gemini does not.

**P0-F03.**
- Claude and GPT say 1–2.5 MW is roughly adequate for a narrow Fe route at kt scale, but not for the mixed product slate.
- Gemini agrees outright and sizes refining at 20–35 MW.

**P0-F04.** Unanimous that the 100 MW is unallocated and the large storage is unjustified.
- GPT's "partly" rests on its view that continuous sunlight still needs safe-mode and transient storage.
- Gemini keeps a 100 MW total.

**P0-F05.** Unanimous that $5/W is unsupported.

**P0-F06.** Unanimous that 20 rendezvous per craft per year is not credible.
- GPT's "partly" rests on its view that 20 remote observations per year is plausible.

**P0-F07.** Unanimous that onboard solar cannot power the robots and that tether power is needed. Robot mass and power values diverge.

**P0-F08.** Unanimous that a launch line is needed. Mass and cost differ by up to about 20× across models.

**P0-F09.** Unanimous that comms, ground and operations lines are needed.

**P0-F10.** Unanimous: uncrewed Phase 0.

**P0-F11.**
- Unanimous that EP propellant must be budgeted and that LOX/LH₂ has no Phase 0 consumer.
- The propellant choice and ISPP scale diverge.

**P0-F12.** Unanimous. The line structure differs: Gemini carries a single reserve line, while Claude and GPT itemize.

**P0-F13.** Unanimous. Budgets fall within $100–300M.

**P0-F14.** Unanimous that a containment requirement and a budget line are needed. The threshold differs by orders of magnitude.

**P0-F15.** Unanimous that configuration control failed.
- Claude and GPT caution that the deliberation texts were not available to them.
- Gemini writes the conclusions in as specifications.

**P0-F16.** Unanimous that one authoritative baseline is needed. The baselines the models propose differ.

**P0-F17.** Unanimous: split into 0A and 0B. Cost envelopes differ.

**P0-F18.** Unanimous that a fallback is needed.
- The baseline process and the fallback ranking differ.
- GPT disputes the finding's "eight orders of magnitude" scale argument.

**P0-F19.** Unanimous that output must be tied to Phase 1 at SEL1. Demand estimates and the remedy (relocate vs. co-locate) differ.

---

## 2. Agreed changes (supported by all three models)

| # | Change | Consolidated value / range | Notes on attribution |
|---|---|---|---|
| A1 | Split Phase 0 into **0A** (research and pathfinders) and **0B** (industrial), with gates before 0B | Structure only. Costs diverge (D13) | All three. Gate sets differ (D18). |
| A2 | Phase 0 is **uncrewed**. Remove the habitat and quarterly visits. Keep structural and docking interfaces for later | 0 crew visits | All three. GPT adds that structural reserve must not be described as "human-rated". |
| A3 | **Withdraw 50 kt/yr as a Phase 0 commitment** and downscale | Proposals span Claude 1–2.5 kt/yr product, GPT 10 kt/yr feed / 2 kt/yr product, Gemini 5–15 kt/yr refining capacity | Direction agreed; magnitude not (D2). |
| A4 | **Abandon Sun–Earth L4/L5** as the processing site. Phase 1 receiving point is **SEL1** | SEL1 delivery node | All three. Where processing goes instead diverges (D1). |
| A5 | **Raise tug power to MW class** | 0.6–3 MWe per tug (GPT 0.6–1.0; Gemini 1.5–2.5; Claude 1.5–3) | All agree the ~0.1–0.25 MW implied by the current arrays is insufficient. |
| A6 | **Power robots from a site source by tether**. Onboard battery only for mobility and safe mode | Battery: Claude 10–30 kWh; Gemini 50 kWh; GPT unquantified | Gemini also lists wireless/beamed power as an option. |
| A7 | **Delete the 200–500 MWh storage**. Size storage to asteroid shadow and critical loads | About 1–10 MWh (Claude 1.5–5; GPT 1–3 site plus 20–100 kWh per tug; Gemini 10 MWh station buffer plus unquantified mining-base storage) | All three. |
| A8 | **Replace $5/W** | Hardware-only overlap is about **$30–100/W** (Claude $25–120; GPT $30–100). Installed incl. launch: Claude $30–200, Gemini $45–75, GPT $50–300 | Claude and GPT carry launch separately. Gemini's figure folds in transport. |
| A9 | **Redefine prospecting**: separate remote survey from rendezvous characterization | Counts diverge (D11) | All three. They agree a 100 kg monopropellant bus has well under 1 km/s: Gemini 0.3–0.5, GPT 0.5, Claude 0.85 km/s, under differing propellant fractions. |
| A10 | **Add a launch / Earth-delivery line** | Values diverge (D12) | All three. |
| A11 | **Add comms/ground and mission-operations lines**. DSN capacity is not assumed free | Claude about $0.9–2.7B total; Gemini $0.7–1.0B; GPT $0.25–0.75B capex plus $1.5–4B ops over 10 yr | All three. |
| A12 | **Add development, pathfinder and contingency accounts** | Contingency 20–40% (GPT 20–35; Gemini 30; Claude 30–40, with 40% on 0A) | Gemini carries one combined reserve line. Claude and GPT itemize NRE, pathfinders and spares. |
| A13 | **Budget imported EP propellant**. Recognize that **LOX/LH₂ has no Phase 0 consumer**. Production-scale chemical ISPP is not base Phase 0A scope | Iodine appears as a candidate in all three | The resolution diverges (D7, D8). |
| A14 | **Specify the organization**: entity, national authorization, ITU, export control, liability, planetary protection, succession | **$100–300M** over the phase (Claude, GPT); Gemini $150M | All three. |
| A15 | **Add debris and contamination requirements and a budget** | Threshold and cost diverge (D14) | All three. |
| A16 | **Issue one configuration-controlled baseline** and write deliberation outcomes into it | n/a | All three. Claude and GPT add that the deliberation texts must be checked first. |
| A17 | **Add costed metallurgy fallbacks**, including both Earth-supplied Phase 1 material and lunar processing | Ranking and cost diverge (D15) | All three name both options. |
| A18 | **Remove the universal 1,000 °C extraction requirement** | Claude 500–800 °C; GPT 200–700 °C test envelope | Explicitly proposed by Claude and GPT. Gemini's energy basis uses 300–600 °C desorption but proposes no change to the spec. This is near-agreement, not full agreement. |

---

## 3. Preserved divergences

### D1. Where processing is sited

**Position A: co-locate processing at the target NEA and ship only product to SEL1.**
- Held by Claude and GPT. Gemini lists it as its F01 primary option and as "Option B".
- Claude: removes ore transport, and processing energy is used where it is collected.
- GPT: minimizes transported mass, and the current BOM cannot support central-station logistics.
- Gemini: drastically cuts propulsion needs, but requires replicating complex centrifuge reactors in dusty, hazardous environments.

**Position B: a central station at SEL1, fed with beneficiated ore by tugs.**
- Gemini's F19 YAML says "Relocate the primary Phase 0 processing … to Sun-Earth L1".
- Gemini's interfaces retain 50 kt/yr of beneficiated ore delivered by tugs.
- Gemini's reasoning: a benign thermal environment and continuous power, at the cost of hauling slag (over 80% of ore mass).
- Claude also records this as a legitimate alternative: easier later maintenance, and one station can serve several asteroids.

**Sub-question, raised only by Claude:** a surface-anchored station needs storage and is exposed to dust. A standoff or terminator-orbit station needs a material shuttle and is perturbed by solar radiation pressure.

### D2. Phase 0B scale and mass-flow chain

| Quantity | Claude | Gemini | GPT |
|---|---|---|---|
| Excavated / feed | 15–40 kt/yr | 65.7 kt/yr at 20 robots (text); 250–400 kt/yr regolith (interfaces) | 10 kt/yr (8–12) |
| Concentrate / station feed | 3–8 kt/yr | 50 kt/yr (interfaces); 5–15 kt/yr refining (revised spec) | No pre-concentration credited |
| Product | 1–2.5 kt/yr Fe(‑Ni) | 5–10 kt/yr metals and SOG-Si to Phase 1 | 2 kt/yr native Fe–Ni |
| Delivered to SEL1 | 0.6–1.7 kt/yr | 8 kt/yr (YAML) | 1 kt/yr contracted (0.5–1.5) |
| Tailings | 12–35 kt/yr | n/a | about 8 kt/yr |

Gemini's figures differ between its text, revised spec and interfaces. See the Reviewer note.

### D3. Process baseline and product slate

| Model | Baseline process | Melt routes | SOG-Si |
|---|---|---|---|
| **Claude** | Gas/solid-phase routes: H₂ reduction of magnetite or metal, carbonyl refining, thermal dehydration. Chosen because they need no gravity. | Pilot at 10–100 t/yr in a 0.05–0.15 g rotating module | Deferred to Phase 1+ |
| **GPT** | Native Fe–Ni recovery by melting and casting as the first process, with rotating modules. Treats 0.05–0.15 g as a "development hypothesis". | Oxide reduction as separate development projects | No guaranteed base-scope production; cells Earth-supplied |
| **Gemini** | Centrifugal rotating furnaces at about 0.1 g for liquid-phase smelting. Gates G0 on drop-tower production of >99.99% Si. | Primary route | The diagram shows SOG-Si as a Phase 0 output |

Gemini also records an unresolved MRE vs. thermal desorption plus carbonyl trade:
- MRE needs inert anodes, with iridium supply limits.
- Carbonyl refining leaves silicates unreduced.

### D4. Process specific energy and station power

| Process | Claude | Gemini | GPT |
|---|---|---|---|
| Fe‑Ni melting | 0.6–1.0 kWh/kg | 0.4–0.6 | 0.5–1.5 |
| H₂ reduction of Fe₃O₄ | 3–4 kWh/kg Fe | n/a | n/a |
| Si/Al reduction | Al 15–30; MG-Si 11–15 | 10–14 (carbothermal/MRE) | Al 13–18; Si 11–15 |
| Solar-grade Si | +20–100 | 20–40 | "tens of kWh/kg" more |
| Water | 4–15 kWh/kg water (at 500–800 °C) | 0.8–1.5 kWh/kg (at 300–600 °C) | n/a |
| **Station power** | **1.5–3.5 MWe plus 0.3–1 MWth** | **20–35 MW (25)** | **4 MW connection** (0.5–1.3 MW average) |

- GPT argues that the finding conflates energy per kg of product with energy per kg of feed.
- Gemini sizes for a 50 kt/yr mix at 80% melting and 20% reduction.

### D5. Total power allocation

- **Claude:** about 17–35 MWe, of which tugs take about 85%.
- **GPT:** 20 MW delivered, from 24–32 MW BOL nameplate. GPT notes that array sizing scales with r² beyond 1 AU.
- **Gemini:** keeps 100 MW, re-allocated as station 30, mining/ISPP 15, tugs 35 and growth 20.

### D6. Tug fleet and trip time

| Parameter | Claude | Gemini | GPT |
|---|---|---|---|
| Count | 10 (range 6–15) | 15 | 15 |
| Power each | 1.5–3 MWe | 1.5–2.5 MWe | 0.75 MW (0.6–1.0) |
| Payload | 250–300 t | n/a (200 t in F01 calc) | 200 t |
| Isp | 2,000–2,500 s | 2,500 s (iodine) | 2,500 s |
| Round-trip Δv | 4–8 km/s | 8–12 km/s | 6 km/s reference; 10 km/s sensitivity |
| Round-trip time | 1.5–4 yr, **window-limited** | 3–5 yr | 1.2–1.8 yr at 6 km/s |
| Fleet delivery | 0.6–1.7 kt/yr | n/a | 1.7–2.5 kt/yr capacity; 1 kt/yr contracted |

- Claude alone argues that cadence is set by return windows, not thrust. Its reason is that low-Δv NEAs have long synodic periods.
- GPT states that no universal trip time exists without optimized trajectories.

### D7. Tug propellant

**Argon or iodine, with water EP as a later upgrade.** Held by Claude.
- Argon has trivial supply and Starlink heritage, but needs cryogenic or high-pressure storage.
- Iodine is about 1–2% of world output, but its corrosion and MW-class operation are undemonstrated.

**Dual-mode: iodine Hall for outbound legs, water thermal/arcjet/plasma for bulk cargo, fed by ISPP.** Held by Gemini.
- Water gives "complete self-sustaining closure" at an Isp of 200–800 s.

**Iodine as the reference *study*, krypton as an alternative, selection gated.** Held by GPT.

**On krypton supply:**
- Claude says supply "fails" at about 10² t/yr, but notes it has found no authoritative figure.
- Gemini says krypton output of about 150–180 t/yr "breaks" supply.
- GPT says neither the krypton nor the xenon supply claim should be retained without a dated, traceable audit.

**On iodine supply:** all three cite world production on the order of 3×10⁴ t/yr. Claude and GPT cite USGS.

### D8. ISPP scale, site and the rq-0-14 threshold

**Scale:**
- **Claude:** 4 units in 0B, sized to tug water demand of 0.1–0.6 kt/yr. Claude explicitly disagrees with rq‑0‑14's ≥25 kt/yr because no consumer exists.
- **Gemini:** ISPP supplies tug water at 15–30 kt/yr (20 kt/yr in YAML) plus LOX. It moves large-scale ISPP to 0B without disputing the threshold.
- **GPT:** one water pilot at 10–30 t/yr. GPT treats ≥25 kt/yr as a "proposed economic gate" whose customer must be defined, and removes the EML1 depot.

The three scales differ by roughly three orders of magnitude.

**Lunar site:**
- Claude removes the lunar south pole from the Phase 0 ISPP spec.
- Gemini keeps a "secondary lunar south pole pilot demonstration".
- GPT does not retain lunar ISPP in base scope.

### D9. Cryogenic storage (rq-0-30, rq-0-47, rq-0-48)

- **Gemini:** integrate 20 K and 90 K cryocoolers, zero boil-off below 0.01%/day, and Kapton/aluminium sunshields.
- **Claude:** most of this drops out with iodine or water. If argon is used, specify about 90 K ZBO cryocooling and sunshields.
- **GPT:** no operational cryogenic inventory in base scope. Any future depot must specify heat leak, cooler load and transfer loss.

### D10. Mining robots

| Parameter | Claude | Gemini | GPT |
|---|---|---|---|
| Count | 20 (10–14 active), plus 6–10 replacements | 20, or 80 for 250 kt/yr | 6 (4 working) |
| Mass | 1–2 t | 3 t | 3–4 t |
| Excavation power | 2–10 kW mechanical; 5–15 kW total | 20–50 kW retained | 20–50 kW mechanical; 40–100 kW electrical |
| Duty | 20–35% | 15% | about 11% |

- Claude derives its lower power from terrestrial bucket-wheel specific energy times a 3–10× microgravity factor, at low confidence. It concedes that 20–50 kW may be right if consolidated clasts dominate.
- GPT proposes an excavator subsystem mass allowance of 150–400 kg, replacing 60–80 kg.

### D11. Prospecting fleet composition

- **Claude:** 10–14 EP craft of 150–250 kg at $15–40M each. Remote survey relies on NEO Surveyor and ground telescopes, with no Project hardware.
- **Gemini:** 3 heliocentric survey telescopes plus 29 rendezvous microsats.
- **GPT:** 12 remote survey craft of 100–200 kg plus 4 rendezvous scouts of 200–400 kg, at $10–30M each.

### D12. Launch mass and cost

| Model | Mass | Unit basis | Cost |
|---|---|---|---|
| Claude | 0.8–1.6 kt hardware plus 1.2–4.8 kt propellant, giving 3–10 kt LEO-equivalent | $300–1,500/kg to LEO | **$2–12B** (central about $4B) |
| Gemini | about 4.5 kt (range 4.2–5.5) | 45 Starship launches at $80–110M | **$3.5–5.0B** |
| GPT | 4–9 kt delivered over the programme | $3,000–12,000/kg delivered | **$12–108B** |

The cost difference is driven mainly by the per-kg basis: LEO vs. delivered, and Starship target prices vs. demonstrated prices. GPT explicitly declines to adopt Starship target prices.

### D13. Total cost and phase split

| Model | Phase 0A | Phase 0B | Total |
|---|---|---|---|
| Claude | $3.5–9B | $22–80B | $26–89B, central about $43B |
| Gemini | $3.5B | $18.5B | $20–24B |
| GPT | $8–20B | $25–180B incremental | $33–201B ("$35–200B for planning") |

### D14. Debris and containment

- **Claude:** at least 99.5% containment (goal 99.9%). Tailings must be managed, and tailings are the larger stream. Budget $50–150M.
- **Gemini:** above 99.5% (gate G1), plus mandatory electrostatic curtains and aspiration. Budget under bom‑0‑7, not quantified.
- **GPT:** at most 10 kg/yr escaped per site, which it equates to about 99.9999% retention at 10 kt/yr. Also sets a cap of <1% attributable array power loss per year. Budget $100–300M.

### D15. Metallurgy fallback ranking

- **Claude:** change the baseline to gas/solid routes. Then:
  - (a) rotating melt module, $1–3B;
  - (b) lunar processing, $10–25B;
  - (c) Earth feedstock, $0.5–5B/yr, triggered by G5.
- **Gemini:**
  - Primary: centrifuge furnaces.
  - Fallback: the surface of the Moon or a large body (e.g. Ceres, or an asteroid over 5 km), or Earth import.
  - Trigger: a year‑3 centrifuge test.
- **GPT:**
  - Preferred fallback: Earth-manufactured material, about $3–12B/yr per kt/yr of demand.
  - Secondary: a lunar pilot at $5–15B.
  - GPT also rejects the finding's batch-mass vs. annual-throughput comparison.

### D16. Whether Phase 0B is economically justified

- **Claude:** ISRU product costs about $3–7M/kg against $500–2,500/kg for Earth supply to SEL1. Phase 0B is a capability investment only, and G5 must test this case explicitly.
- **GPT:** delivery economics dominate. A smaller pilot plus Earth supply may outperform the proposed build-out, and "engineers could reasonably conclude" even 10 kt/yr is premature.
- **Gemini:** does not address cost-effectiveness against Earth supply.

### D17. Phase 1 demand

- **Claude:** ISRU-eligible demand of 0.1–11 kt/yr. Gate 0B on a demand specification within 3×.
- **GPT:** total demand of 0.35–22.7 kt/yr, before deciding what is ISRU-eligible. Require a signed material demand schedule.
- **Gemini:** relocates the processing hub but proposes no demand gate.

### D18. Gate criteria

| Criterion | Claude | Gemini | GPT |
|---|---|---|---|
| Characterized targets | at least 2, by rendezvous | at least 3 | at least 1, close-proximity |
| Resource threshold | water ≥2 wt% or metal ≥10 wt% | water >8 wt%, plus free metal | yield supports the process |
| Δv bound | round trip ≤8 km/s | rendezvous <4.5 km/s | optimized trajectory, not a scalar |
| Excavation endurance | ≥500 h at ≥0.5 t/h, in situ | thermal-vacuum chamber containment demo | ≥1,000 h plus flight demo |
| Process scale-up | 1–10 t product, ≥1,000 h | 0.1 g free-flyer phase separation | 100–1,000 t/yr pilot before 10 kt/yr |
| Demand / economics | G5 | none | demand gate plus economics vs. Earth supply |

### D19. rq-0-28 cost methodology and rq-0-11 gravity

**rq-0-28:**
- **Claude:** "approximately correct" is unsupported, and the BOM is low by about 3×.
- **Gemini:** adopt capacity-based costing.
- **GPT:** retain ordinary procurement costing for Phase 0. GPT disputes that a capacity model makes cost logarithmic in output.

**rq-0-11:**
- **Gemini:** writes twin centrifuges in as a specification.
- **Claude:** pilot scale only.
- **GPT:** a hypothesis to be demonstrated process by process.

### D20. Comms rates and ops staffing

**Site aggregate data rate:**
- Claude: 2–20 Mbps.
- GPT: 1–10 Mbps, scheduled.
- Gemini: 2.5 TB/day. Gemini also proposes relay satellites at L1/L5.

**Operations staff:**
- Claude: 150–400 FTE.
- GPT: 50–120.

---

## 4. Proposed BOM delta

**All entries are proposals for human review.** None is adopted.

Confidence is quoted as each model stated it. "n.s." means the model stated no confidence for that item.

| Item | Action | Claude | Gemini | GPT | Stated confidence |
|---|---|---|---|---|---|
| Phase 0 structure | split | 0A / 0B | 0A $3.5B / 0B $18.5B (split action) | 0A / 0B | Gemini high; others n.s. |
| bom‑0‑1 prospecting | resize/split | 12 × $15–40M | 3 telescopes + 29 microsats, cost n.s. | 12 remote + 4 scouts × $10–30M | Claude medium; GPT low |
| bom‑0‑2 robots | resize | 20 × $30–80M | no delta (20 retained) | 6 × $20–60M | Claude low; GPT low |
| Robot replacements | add | 8 × $30–80M | n/a | inside $0.8–2.5B spares line | n.s. |
| bom‑0‑3 station | resize/relocate | 1 × $8–20B, co-located, 300–500 t | 1 × $6–8B, 10 kt/yr centrifuge, uncrewed | 1 × $4–9B, co-located, 250–450 t | all low |
| Rotating melt module | add / include | separate line, $1–3B | within station | within station ($0.5–1.5B allowance) | n.s. / low |
| bom‑0‑4 tugs | resize | 10 × $100–200M (excl. power) | 15 (cost n.s.) | 15 × $100–250M (excl. arrays) | Claude medium (count); GPT low |
| bom‑0‑5 arrays | resize | 25 MWe × $25–120/W | 100 MW × $45–75/W | 24–32 MW BOL × $30–100/W | Claude low; Gemini high; GPT low |
| bom‑0‑6 ISPP | resize/split | 4 × $120–500M in 0B | no delta; coupled to tugs | 1 water pilot, $150–400M | Claude low; GPT low |
| bom‑0‑7 organization | resize | $100–300M | $150M (text) | $100–300M | GPT medium |
| Launch / delivery | add | $2–12B (incl. Earth propellant) | 45 × $80–110M | 4–9 Mkg × $3,000–12,000/kg | all low |
| EP propellant commodity | add | inside launch line | n/a | 200–450 t/yr × $30–100/kg (iodine) | GPT low |
| Comms / ground | add | $0.3–0.9B | $0.7–1.0B (combined with ops) | $0.25–0.75B | GPT low |
| Mission operations | add | $0.6–1.8B (phase) | in comms line | $0.15–0.40B/yr × 10 | GPT low |
| NRE | add | $3.3–9.8B (incl. $0.3–1B autonomy) | in reserve line | $5–12B | n.s. / low |
| 0A ground R&D | add | $0.7–1.9B | in reserve line | in NRE | n.s. |
| 0A pathfinder / demo flight | add | $1.5–3.5B (300 kW SEP, 2 robots, 10–20 t plant) | in reserve line | $1–3B | n.s. / low |
| Spares / replacements | add | robots only (above) | n/a | $0.8–2.5B | GPT low |
| SEL1 receiving node | add | $0.2–0.6B | n/a | n/a (transport to L1 "budgeted") | n.s. |
| Debris / contamination | add | $50–150M | under bom‑0‑7, n.s. | $100–300M | GPT low |
| Contingency / reserve | add | $6–26B (30–40%) | $3.5–5.0B (30%) | $5.5–52B (20–35%) | GPT low |
| Crew systems, 200–500 MWh batteries | remove | supported in text | supported in text | explicit remove | GPT high |
| Operational cryogenic depot / EML1 | remove | implied (no LOX/LH₂ consumer) | **retain** (ZBO cryocoolers) | explicit remove | divergent |
| Lunar ISPP pilot | remove / retain | remove from Phase 0 | retain as secondary | not in base scope | divergent |

---

## 5. Open questions and what would settle them

| Divergence | What would settle it |
|---|---|
| D1 Siting | A trade study of co-located vs. SEL1 central station: transported mass including slag, power, servicing access, and replication cost of reactors at multiple sites. Raised by all three. For a co-located station, add a surface vs. standoff analysis covering dust, storage and SRP (Claude). |
| D2, D17 Scale | An authoritative Phase 1 material baseline by mass, material, purity, date and delivery point (Claude, GPT). Then a mass-flow chain closed against it. |
| D3, D4 Process route | Representative-feed pilot tests that measure specific energy, yield and purity for each route: H₂ reduction, carbonyl, native-metal melting, MRE. Partial-g separation tests to confirm or reject 0.05–0.15 g (all three). Anode lifetime and iridium demand for MRE (Gemini). |
| D5, D6 Power and transport | Optimized low-thrust trajectories and return-window cadence for the top ~10 candidate NEAs (Claude, GPT). These would resolve the Δv (4–12 km/s across models), trip-time and fleet-size disagreements. |
| D7 Propellant | A dated, traceable krypton supply audit (all three note uncertainty). MW-class Hall life tests on argon, iodine and water: Claude's G4 specifies ≥10,000 h; GPT specifies total-impulse qualification. Water-EP TRL maturation (Claude). |
| D8, D9 ISPP and cryogenics | A defined Phase 0 water/propellant customer and demand quantity. The rq‑0‑14 conclusion text, and the economic definition of its 25 kt/yr threshold (GPT). The propellant decision (D7) determines whether D9 applies (Claude). |
| D10 Robots | DEM simulation and in-situ excavation tests measuring force/torque spectra and specific energy (Claude, GPT). C-type boulder tensile strength at excavation scale (Claude). A re-run of rq‑0‑26 with consistent τ, ω, P and mass (Claude, GPT). |
| D11 Prospecting | Clarify what NEO Surveyor and ground assets will deliver, versus what Project-owned survey assets must add (Claude, Gemini, GPT). |
| D12, D13 Launch and cost | Supplier quotations for arrays, delivery and propellant (GPT). An independent cost estimate at ±30% (Claude G8). Agreement on a single $/kg basis and reference orbit. |
| D14 Debris | Ejecta and particle-trajectory modelling by size, speed and charge (Claude, GPT). Agreement with the licensing authority on an applicable standard. |
| D15, D16 Fallback and economics | An explicit ISRU delivered-cost trajectory vs. Earth supply at SEL1 (Claude G5; GPT propulsion/logistics gate). The rotating-process test result as trigger (Gemini year 3; GPT; Claude G3). |
| D18 Gates | Reconcile thresholds once the resource survey data (wt% water/metal) exist. |
| D19 Deliberations | Obtain the full text of rq‑0‑11, 14, 18, 26, 28, 29, 30, 47 and 48 (Claude, GPT). |

---

## Reviewer note

These points are rapporteur observations on the submissions. They are not new technical positions.

1. **Model identification.** The YAML `model` fields ("Claude (Anthropic)", "senior-space-systems-engineer", "GPT-5.2") do not match the response headers. Attribution here follows the headers. The record should be confirmed.

2. **Conflicting statements on which deliberation text was supplied.**
   - Claude's text says it had only titles for eight of nine deliberations.
   - Claude's YAML says "only rq-0-26 text was provided".
   - GPT says only rq‑0‑28 was supplied in full.
   - The source package should be checked.

3. **Gemini internal inconsistencies.**
   - In P0‑F01, per-ship throughput is written as "≈18 kt/yr" while the 15-ship total is 0.27 kt/yr. These are mutually inconsistent as written.
   - The revised spec gives 5–15 kt/yr refining capacity, but the interfaces still show 50 kt/yr ore and 250–400 kt/yr regolith.
   - The revised spec gives 3.5–5 yr round trips, while the F01 calculation gives 10–12 yr. Different power levels are assumed, but this is not stated.
   - Gemini agrees with P0‑F04 that the 100 MW is unallocated, yet retains 100 MW.

4. **Cost bases differ.** GPT states constant 2026 USD and Claude states "real" dollars; Gemini gives no basis. Launch $/kg is quoted to LEO (Claude), per launch (Gemini) and delivered (GPT). The totals in D13 are therefore not directly comparable.

5. **Possible omission.** No model explicitly budgets waste-heat rejection (radiator mass and cost) for the MW-class tugs or the processing plant. Gemini mentions radiators only as a dust-fouling concern. The panel may wish to confirm whether this sits inside existing mass allowances.
