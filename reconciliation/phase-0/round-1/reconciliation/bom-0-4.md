---
phase: phase-0
item: bom-0-4
round: 1
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
generated: 2026-10-11T23:18:45.622Z
---

# Reconciliation: bom-0-4 Transport Vehicles, Phase-0 Re-assessment, Round 1

**Panel:** Claude Opus 5.5 ("Claude"), Gemini 3.8 Flash ("Gemini"), GPT-6.1 Sol ("GPT"). Responses are attributed by section header. The YAML self-labels differ from the headers; see the Reviewer note.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F01** Transport capacity vs. station throughput | agree | agree | partly |
| **P0-F10** Crew transport/habitation not budgeted | partly | agree | agree |
| **P0-F11** Tug propellant not in BOM; ISPP has no consumer | agree | agree | partly |
| **P0-F15** Deliberations not written back | agree | agree | partly |
| **P0-F16** Consensus vs. BOM disagree | agree | agree | agree |

**Where the panel stands on each finding:**

- **P0-F01:** All three accept that the specified fleet cannot feed 50 kt/yr.
  - GPT's "partly" concerns the finding's numbers, not its conclusion. GPT says the original array power is optimistic and that unloading must be accounted for.
  - Claude also says the finding's power figure is optimistic.
- **P0-F10:** All three accept that crew is unbudgeted and that Phase 0 transport should be uncrewed.
  - Claude's "partly" reflects its view that rq-0-18's human-rating of tugs is physically inconsistent with multi-year transits.
  - Gemini, despite agreeing, retains structural human-rating provisions.
- **P0-F11:** All three accept that EP propellant is unbudgeted and that Hall-type tugs cannot consume bom-0-6 LOX/LH₂.
  - GPT's "partly" concerns the finding's ~100 t/trip demand figure, which GPT says is not universal.
- **P0-F15:** All three accept the configuration-control failure. They differ on whether concluded deliberations should be adopted as written:
  - Gemini writes rq-0-18 back.
  - Claude reverses rq-0-18 for tugs.
  - GPT requires an engineering disposition register rather than automatic adoption.
- **P0-F16:** Unanimous. All three take the BOM's 15 vehicles and non-xenon propellant over the consensus document's 10 vehicles with xenon, and all three say neither document's physics or cost closes.

---

## 2. Agreed changes

These are changes all three models support. Where values differ, each model's figure is shown and the consolidated range is the union.

| Change | Claude | Gemini | GPT | Consolidated |
|---|---|---|---|---|
| Fleet quantity | 15 (12–20) | 15 (12–18) | 15 positions: 10 active, 5 reserve/maintenance/phased | **15** (12–20); GPT's active/reserve split is not shared by the others |
| Phase 0 interplanetary delivered mass | 1.2 kt/yr (0.6–1.5) | 0.9 kt/yr (0.6–1.2) | ~1.0 kt/yr (0.67–1.33) | **~1 kt/yr pilot scale** (0.6–1.5 kt/yr) |
| Round-trip / mission cycle time | 2.5 yr (2–4) | 2.5 yr (2.0–3.2) | 2 yr (1.5–3) | **~2–2.5 yr** (1.5–4) |
| Original array power at 1 AU (300–500 m²) is lower than 150–250 kWe | ~90–175 kWe | ~100–160 kWe | ~60–150 kW | **~60–175 kWe** |
| Current-spec claim of 10+ cycles in 15 yr is not achievable | wrong by 5–10× | 2–3 round trips at best | multi-year thrusting per trip | Agreed |
| Vehicle power must increase from the current spec | to 300 kWe | to 800 kWe | to 1–2 MW | Agreed in direction; **magnitude diverges** (§3, D2) |
| Phase 0 transport vehicles carry no crew | uncrewed baseline | restrict to uncrewed cargo | uncrewed; no crew kits | Agreed. Structural provisions diverge (§3, D4) |
| Xenon is not the production propellant | iodine baseline / Kr fallback | Xe "physically impossible at this scale" | Xe as demonstration/qualification option only | Agreed for the production fleet |
| Add an EP propellant procurement/delivery line | 270 t/yr (180–400) | ~250–350 t/yr in text; 300–450 t/yr in missing items; ~450 t/yr in BOM delta | 200–400 t/yr reference (100–800 allowance) | **Add line**; ~200–450 t/yr reference, with GPT's 100–800 t/yr planning allowance |
| bom-0-6 ISPP has no Phase 0 tug consumer; defer to Phase 0B | yes (move to 0B) | yes (0B depot demos or auxiliary chemical) | yes (defer unless a customer is specified) | Agreed |
| Reference operation is near-Earth / ~1 AU, not main belt | Δv-restricted NEAs | 1 AU calculation; main belt 15–33 kWe | 0.9–1.3 AU; main belt "invalidates" baseline | Agreed |
| Launch and deployment of the fleet is missing scope | 15–30 heavy launches | ~15 heavy launches | launch, injection, assembly | Agreed as missing; **sizing diverges** |
| Unit cost must rise above $133M | $250M | $165M | $200–500M | Agreed in direction; **value diverges** (§3, D7) |
| Docking is at a non-rotating/despun interface (rq-0-11) | yes | not addressed | station-level; container compatibility | Claude and GPT only. Gemini silent; not unanimous |

---

## 3. Preserved divergences

### D1. How the 50 kt/yr station mismatch is resolved

All three agree transport delivers only ~1 kt/yr. They differ on what absorbs the gap.

- **Claude:**
  - Resize bom-0-3 to a 1–2 kt/yr pilot.
  - Move 50 kt/yr to Phase 0B using water-propellant tugs refuelled at the asteroid (Option D, 10–50 kt/yr) combined with beneficiation at the asteroid (Option E, ore mass ÷3–10).
  - Reasoning: at Isp ~450 s, trip time is set by orbital mechanics, not power.
- **Gemini:**
  - Down-scope Phase 0 station throughput to pilot scale (1,000–2,000 t/yr).
  - Leaves co-location with the asteroid as an open question, citing the inefficiency of hauling "80% slag/waste mass".
- **GPT:**
  - Co-locate the processing station at the mining site.
  - Add a separately specified 50 kt/yr local bulk-handling system.
  - Use tugs only for ~1 kt/yr of selected products, equipment and supplies.
  - If co-location is rejected, "reopen the whole phase architecture and budget."
  - GPT keeps bom-0-3 at the $10B placeholder without endorsing its cost.

### D2. Vehicle design point

| Parameter | Claude | Gemini | GPT |
|---|---|---|---|
| EP power per vehicle | 300 kWe (250–400) | 800 kWe (600–1,000) | 1.5 MW (1–2) |
| Array area | ~1,000 m² (800–1,300) | not stated; ROSA-type, 150–250 W/kg | ~10,000 m² (6,000–16,000) |
| Isp | 1,800 s (1,500–2,200) | 2,200 s (1,900–2,800) | 2,500 s (2,000–3,000) |
| Efficiency η assumed | 0.50 (Kr penalty) | 0.55–0.60 | 0.55 |
| Thrust | 17 N (13–22) | 40 N (30–55) | ~67 N |
| Dry mass | 35 t (30–45) | 28 t (24–32), includes human-rating | 60 t (40–80) |
| Payload reference | 200 t (100–250) | 150 t (100–175) | 200 t (150–250) |
| Round-trip Δv | 5 km/s (4–7), restricted to selected NEAs | 8 km/s | 8 km/s (6–10), retained as provisional |
| Propellant per round trip | 45 t (35–70) | not stated for revised spec | ~60 t (30–120) |
| Cycles over life | 5 (3–7) | not stated | 5–10 |

How each model gets there:

- **Claude** controls throughput mainly by restricting targets to low Δv. It uses the metric k ≈ 0.1–0.3 t delivered per kWe-yr and treats payload size as having little effect on throughput.
- **Gemini** sizes power for an approximately 2.5-year cycle at 8 km/s.
- **GPT** sizes for an approximately 1.5–3-year cycle at 8 km/s. It states this is "not a trajectory-derived trip time."

### D3. Power required to close 50 kt/yr by solar-electric propulsion

| Model | Estimate | Context |
|---|---|---|
| Claude | 170–500 MWe | "1.7–5× the entire 100 MW array line" |
| Gemini | 15–25 MWe | 8 km/s round trips |
| GPT | 0.4–1.5 GW | 375–750 active vehicles |

The three estimates span roughly two orders of magnitude. None of the models reconciles this.

### D4. Structural human-rating provisions (rq-0-18)

- **Remove them:**
  - **Claude:** −2 to −4 t per vehicle and −$0.24 to −0.40B. Multi-year transits make crew carriage untenable, and rq-0-18's "60–90 day transits" are physically inconsistent with this vehicle.
  - **GPT:** rejects mandatory human-rating and the three crew kits. It argues:
    - crew demand is "asserted, not demonstrated";
    - the 12–20% premium and 2–3× retrofit penalty are unsupported;
    - a 30-day shelter is not an adequate rescue strategy for multi-year mission cycles;
    - the 3g structural requirement is unexplained (~9.4 MN vs. ~67 N EP thrust).
- **Retain them:**
  - **Gemini:** keep passive structural and volume margins per rq-0-18, a +3,000 kg allocation, and modular docking kit provisions. Gemini's 28 t dry mass includes this allocation.

### D5. Propellant selection

| Model | Position |
|---|---|
| Claude | Iodine baseline; krypton-qualified thruster variant as schedule fallback; krypton use capped by supply contracts |
| Gemini | Iodine or krypton, from terrestrial supply |
| GPT | Defer the down-select. Iodine is a "supply-screened development candidate", krypton an alternative, xenon a demonstration/qualification option. None is approved for the production fleet |

Iodine readiness at scale:

- **Claude:** TRL ~3 for 50 kW-class iodine Hall thrusters; cathode and surface corrosion are open issues.
- **GPT:** the only in-orbit iodine demonstration was ~20 W. It establishes "feasibility, not scalable readiness."
- **Gemini:** cites "BHT-6000/I2" heritage as the basis for its Isp, and flags cathode poisoning and corrosion over 15 years.

Note: Claude describes the ThrustMe NPT30-I2 iodine demonstration as ~60 W; GPT cites ~20 W for what appears to be the same demonstration.

### D6. World krypton (and xenon) supply

| Model | Krypton | Xenon |
|---|---|---|
| Claude | ~100–500 t/yr, "my estimate, low confidence". Fleet demand could take 50–100%+ of world output | not stated |
| Gemini | ~8,000 t/yr | ~50 t/yr |
| GPT | Declines to estimate; requires industrial-gas supplier assessment | Says the source's "15–20×" claim is unsupported |

On iodine, all three cite USGS at ~30–35 kt/yr. The panel's figures agree on iodine and differ by more than an order of magnitude on krypton.

### D7. Unit and fleet cost

| Model | Unit cost | Confidence | Basis | Fleet cost |
|---|---|---|---|---|
| Claude | $250M ($180–400M) | low | Gateway PPE analogue (60 kW, ~$375M contract) | $3.75B ($2.7–6.0B) |
| Gemini | $165M ($140–190M) flyaway, with +$25M launch integration in text | medium | "aerospace CERs for 800 kWe electric tug" | not stated |
| GPT | $200–500M | low | unprecedented MW-class system | $4–10.5B, including $1–3B development |

### D8. Treatment of concluded deliberations (P0-F15)

- **Gemini:** write them back as concluded, including rq-0-18's mass penalty, the passive sunshield architecture and 15-year degradation factors.
- **Claude:** write back rq-0-14, reverse rq-0-18 for tugs, and treat the other deliberations as minor:
  - rq-0-30 does not apply to solid iodine;
  - rq-0-47/48 matter only for iodine feed heating, ~1–3 kW.
- **GPT:** issue an accepted/modified/deferred/rejected disposition register. It declines to import numbers from deliberations that were not supplied in full, for example rq-0-28 savings and rq-0-48 penalties.

### D9. Thermal deliberations (rq-0-30/47/48)

- **Gemini:** apply passive sunshield and MLI degradation factors to the tug.
- **Claude:** boil-off does not apply to iodine. Krypton tankage is ~10–15% of propellant mass. Thermal design is relevant only to propellant temperature control.
- **GPT:** do not assign a cryogenic sunshield to a non-cryogenic tug by default. Separately flags ~0.7 MW of non-directed power at 1.5 MW needing heat-deposition modelling.

### D10. Interface values

- **bom-0-1 data:**
  - Claude: a target list of ≥5–10 NEAs with round-trip Δv ≤6 km/s.
  - Gemini: ~1 Gbps aggregate comms.
  - GPT: 1–10 GB/day planning allowance.
  - These rates differ by orders of magnitude.
- **bom-0-5 power:**
  - Claude: tugs carry their own ~4.5 MW fleet arrays inside the tug cost, so there is "no overlap" (in_bom: true).
  - GPT: requires an explicit accounting split between stationary and mobile arrays, plus 0.1–0.3 MW of dockside service power (in_bom: false).
- **bom-0-6 in_bom flag:** Claude marks it true but orphaned; Gemini and GPT mark it false.

### D11. Current-spec burn and trip time

| Model | Estimate |
|---|---|
| Claude | ~9 yr of continuous thrust (8 km/s); ~6 yr at 6 km/s |
| Gemini | 6.3 yr burn; 4–7 yr round trip |
| GPT | 5–13 yr of thrusting at 60–150 kW |

---

## 4. Proposed BOM delta (proposals for human review; not decisions)

| # | Action | Item | Supporting models | Quantity | Unit-cost range | Confidence |
|---|---|---|---|---|---|---|
| 1 | resize | bom-0-4 transport vehicles | All three | 15 (GPT: staged procurement, 10 active + 5 reserve) | Claude $180–400M; Gemini $140–190M; GPT $200–500M | Claude low; Gemini medium; GPT low |
| 2 | add | EP propellant supply and delivery (iodine/krypton) | All three. Claude and Gemini in YAML; GPT in text and interfaces | Claude 270 t/yr; Gemini ~450 t/yr; GPT 200–400 t/yr (100–800) | Claude $500–3,000/kg delivered (~$0.15–0.8B/yr); Gemini $300–500M, period ambiguous ("over Phase 0 operations"); GPT not costed | not stated |
| 3 | add | Launch and deployment of transport fleet | Claude (YAML); Gemini, GPT (missing scope) | Claude 15–30 heavy launches; Gemini ~15 | Claude $50–150M per launch; Gemini $750M–1.5B total | not stated |
| 4 | add | Thruster/PPU spares and robotic servicing | Claude (YAML); GPT (missing scope) | Claude 15–40 modules/yr (50–100 per vehicle over life) | Claude $2–8M per module | Claude: medium for module count |
| 5 | add | Ground segment and deep-space communications | Claude (YAML); GPT (missing scope, plus bom-0-7 interface) | 1 | Claude $100–400M | not stated |
| 6 | add | Transport development and qualification program | GPT | 1 program | $1–3B | low |
| 7 | add | Standard cargo containers / latching hardware | Claude; Gemini (missing scope) | Claude ~30–45 units | not costed | not stated |
| 8 | add | Local bulk-material handling, 50 kt/yr at co-located site | GPT only; depends on D1 | 1 system | not costed | low |
| 9 | resize | bom-0-3 station to 1–2 kt/yr pilot | Claude (YAML); Gemini (F01 text) | 1 station | Claude keeps $10B placeholder pending bom-0-3 reassessment | not stated |
| 9-alt | keep | bom-0-3 with co-location and uncrewed requirements | GPT | 1 station | $10B placeholder, not endorsed | not stated |
| 10 | remove / defer | bom-0-6 ISPP to Phase 0B | Claude (remove); GPT (split/defer); Gemini (realign to 0B demos or auxiliary chemical systems) | 0 in Phase 0 | Claude cites $500M; GPT refers to a "$2B ISPP line" (see Reviewer note) | not stated |
| 11 | split | bom-0-5: stationary arrays vs. mobile tug arrays (accounting only) | GPT. Claude states no overlap, which is compatible but not a split | — | $0 (accounting) | not stated |
| 12 | add (study) | Phase 0B transport architecture trade: water-propellant tugs and/or beneficiation | Claude | 1 study | not costed | not stated |
| 13 | conditional | Crew visit services + habitat, outside bom-0-4, behind a decision gate | Claude; GPT as a "separately funded program" if crew is later required | conditional | Claude: crew sorties ~$0.2–1B+ each, ~$1–4B/yr if quarterly | Claude: own estimate |
| 14 | remove | Structural human-rating mass from bom-0-4 | Claude, GPT (Gemini opposes, D4) | 0 t per vehicle | Claude: saves $0.24–0.40B | medium (Claude, GPT) |

---

## 5. Open questions and what would settle them

1. **Architecture for the station gap (D1).** A system-level trade between three options:
   - pilot-scale station (Claude, Gemini);
   - co-location at the mine (GPT; Gemini open question);
   - Phase 0B water tugs plus beneficiation (Claude).

   Inputs needed:
   - product yield from 50 kt/yr input (GPT);
   - asteroid water yield (Claude);
   - contamination and gravity-zone feasibility at the mine (GPT);
   - whether a ~1 kt/yr pilot justifies a ~$10B station (Claude).
2. **Design point (D2, D3).** Low-thrust trajectory optimisation against a named target set and operating orbit. Claude, Gemini and GPT all flag Δv, synodic access or route as unknown. This would fix:
   - Δv;
   - cycle time;
   - cycles over life;
   - power per vehicle;
   - the power needed for 50 kt/yr by SEP.
3. **Target list.** A prospecting/NHATS-type survey output (bom-0-1) identifying ≥5–10 NEAs with round-trip Δv ≤6 km/s, which is Claude's requirement.
4. **Propellant down-select (D5, D6).** Three inputs are needed:
   - a krypton market study and supplier-backed propulsion-grade capacity and price (Claude, GPT);
   - iodine thruster qualification at 50 kW to MW class, including cathode and corrosion lifetime testing (Claude, Gemini, GPT);
   - a xenon fleet-scale availability calculation (GPT).
5. **Thruster lifetime.** Lifetime testing at the chosen propellant and power. In parallel, a feasibility study of robotic module replacement at 15–40 modules/yr. This rests on Claude's estimate that each tug needs ~225 t of lifetime throughput against 2–4 t per current thruster; GPT also raises it.
6. **Human-rating (D4).** Needs two things:
   - an itemised design that substantiates or refutes rq-0-18's 12–20% premium, 2–3× retrofit penalty and 3g requirement (GPT);
   - a station-level decision on whether Phase 0 is operable uncrewed, via teleoperation or autonomy (Claude, GPT).
7. **Deliberation disposition (D8, D9).** Supply the full rq-0-28, rq-0-47 and rq-0-48 records (GPT notes they were not supplied), then produce the disposition register.
8. **Cost (D7).** A bottoms-up estimate for the selected design point, including development and qualification (GPT), MW-class tug mass, and heat rejection (GPT).
9. **Interfaces (D10).** A communications link budget for the 15 tugs plus NEA sites, and a bom-0-5 accounting decision.
10. **Fleet structure.** Is a fleet of 15 preferable to fewer MWe-class tugs (Claude) or to a smaller staged fleet preceded by demonstrators (GPT)?

---

## Reviewer note

These points are rapporteur observations on the responses. They are not new technical claims.

- **Model labelling.** The YAML `model:` fields do not match the section headers:
  - Claude's block says "Claude (Anthropic)".
  - Gemini's block says "claude-opus-4-6".
  - GPT's block says "GPT-5.2".

  Attribution here follows the headers. Provenance should be confirmed.
- **Internal inconsistency (Gemini).** Gemini's current-spec trip time (4–7 yr round trip) has a lower bound below its own stated pure burn time (6.3 yr).
- **Internal inconsistency (Gemini).** Gemini gives three different propellant demand figures (~250–350, 300–450 and ~450 t/yr). It does not state propellant per trip for its revised 800 kWe design.
- **Source reading differs.** Gemini's "old consensus" column lists values (dry mass 20–25 t, Isp 1,800–3,000 s, payload 150–250 t) that Claude and GPT treat as unspecified, or retain as 150–250 t in GPT's case. The source documents should be checked.
- **bom-0-6 line value.** Claude cites $500M; GPT refers to a "$2B ISPP line". The figure should be verified against the BOM before any removal or deferral is costed.
- **Iodine demonstration power.** Claude's ~60 W and GPT's ~20 W for the in-orbit iodine demonstration should be checked against the cited reference (Rafalskyi et al., 2021).
- **Revised design points unreconciled.** The three revised design points reach similar ~1 kt/yr delivery with roughly 5× different per-vehicle power. No model explains the difference against the others' assumptions. Claude and GPT state their cycle times are not trajectory-optimised; Gemini labels its cycle time "high" confidence without showing a trajectory.
- **Revised Phase 0 total.** Only GPT estimates a revised Phase 0 total (~$17.7–24.2B before other omitted scope). No consolidated cost view across the proposed adds exists yet.
