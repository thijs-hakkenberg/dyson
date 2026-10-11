---
phase: phase-0
item: bom-0-5
round: 1
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
generated: 2026-10-11T23:20:54.685Z
---

# Reconciliation: bom-0-5 Solar Power Arrays (Phase 0, Round 1)

**Models are identified by their response headers: Claude Opus 5.5, Gemini 3.8 Flash and GPT-6.1 Sol.** The `model:` fields in their YAML blocks give different names (claude-opus-4, claude-3-7-sonnet and GPT-5.2 respectively). See the Reviewer note.

---

## 1. Verdict matrix

| Finding | Claude Opus 5.5 | Gemini 3.8 Flash | GPT-6.1 Sol |
|---|---|---|---|
| **P0-F03**: Station power cannot refine 50 kt/yr | agree | agree | **partly** |
| **P0-F04**: 100 MW with ~5 MW of identified loads, no site split, storage where there is no night | **partly** | agree | agree (with qualifications) |
| **P0-F05**: $5/W excludes realistic hardware and launch cost | agree | agree | agree |

**Where the panel stands**

- **P0-F03.** All three models agree that the station's 1–2.5 MW cannot support a mixed metal, oxide and silicon slate at 50 kt/yr.
  - GPT-6.1 Sol dissents only on the title's absoluteness. It holds that a narrowly defined native-metal melting operation could approach 50 kt/yr at 1.7–2.9 MW.
  - Estimates of the required station load differ widely (see §3).
- **P0-F04.** All three agree that allocation and site split are missing and that the 200–500 MWh of storage is unjustified at L4/L5.
  - Claude Opus 5.5 rejects the claim that ~95 MW has no load. It argues the station absorbs most of it, so the defect is documentation, not oversizing.
  - Gemini 3.8 Flash concludes that 100 MW is oversized for Phase 0 and should be cut to 70 MW.
  - GPT-6.1 Sol keeps 100 MW. It treats the unallocated part as deliberate headroom rather than load.
- **P0-F05.** The panel is unanimous that $5/W and $500M are not credible. Revised values span more than an order of magnitude: about $2.5B to $75B for the line.

---

## 2. Agreed changes

Each item below is supported by all three models. Where the models agree on direction but not value, the consolidated range is the union of their positions. The detailed split is in §3.

| Change | Consolidated value / range | Attribution and notes |
|---|---|---|
| Station operates at Sun–Earth L4/L5, ~1 AU, with no eclipse | — | All three |
| Replace the station's 1–2.5 MW power requirement with a product-dependent budget supplied from bom-0-5 | Station load 24–77 MW across the panel | Claude: 24–54 MW average load. Gemini: 37–47 MWe. GPT: 29–77 MW running, about 45 MW nominal |
| Split bom-0-5 explicitly into station and mining-site allocations, with mining sites powered locally | Station 50–85 MW. Mining sites 6–20 MW in aggregate | Claude, Gemini, GPT. GPT states explicitly that no power transfer between sites is assumed. Gemini raises power beaming as an alternative (§3) |
| Delete the 200–500 MWh bulk-storage requirement | Replace with distributed small storage, 1–35 MWh in total | All three. Sizing basis differs (§3) |
| Reject $5/W and $500M; re-estimate including flight hardware and delivery | ≥ $20/W across the panel | All three. Values diverge (§3) |
| System specific power as the mass basis | Overlap of all three ranges: 90–150 W/kg. Central values 100–120 W/kg | Claude 60–150 (100). Gemini 90–150 (120). GPT 70–150 (100) |
| Mass of 100 MW at about 100 W/kg is about 1,000 t, so the original finding's figure is correct | About 670–1,700 t for 100 MW | Claude and GPT state this explicitly. Gemini computes 580 t for 70 MW at 120 W/kg |
| PMAD and high-voltage distribution infrastructure is missing and must be added | — | All three list it as missing scope (Claude item 3, Gemini item 1, GPT item 1). Voltage value: see §3 |
| Array structure, deployment and assembly hardware is not accounted for | — | Claude (robotic assembly), Gemini (trusses, gimbals, slip-rings), GPT (deployment and servicing equipment) |

---

## 3. Preserved divergences

### 3.1 Total installed capacity
- **Keep 100 MW, now allocated (range 80–130 MW).** Claude Opus 5.5.
  - Once P0-F03 is applied, the station takes 70–85 MW. Mining sites take 6–12 MW and a reserve takes 5–10 MW.
  - An oxide-only feed would push the station alone to about 100–120 MW.
- **Reduce to 70 MW (range 60–80 MW).** Gemini 3.8 Flash.
  - Total Phase 0 load is about 57 MW, or about 70 MW with degradation, margin and distance penalties.
  - 100 MW "is oversized for Phase 0 or represents Phase 1 pre-deployment."
- **Keep exactly 100 MW reference BOL nameplate, with site-specific EOL delivered power stated separately.** GPT-6.1 Sol.
  - Includes about 9 MW of deliberate station headroom to absorb orbital distance, dust and process uncertainty.

### 3.2 Station allocation and refining specific energy

| Model | Station allocation | Key specific-energy assumptions | Assumed slate |
|---|---|---|---|
| Claude | 78 MW BOL (70–85) | Al and Si by MRE: 15–25 and 15–30 kWh/kg. Solar-grade upgrade +30–100 kWh/kg | 35 kt Fe-Ni, 4 kt Al, 5 kt Si (1 kt upgraded to solar grade) |
| Gemini | 55 MW (50–60) | MRE 10–14 kWh/kg. Solar-grade +25–40 kWh/kg | 30 kt Fe-Ni, 15 kt reduced metals, 5 kt solar-grade Si |
| GPT | 80 MW reference (≈54 MW EOL) | Al 15–30, Si 15–30, solar-grade Si 40–100+ kWh/kg including reduction | 40 kt Fe-Ni, 8 kt Al, 2 kt solar-grade Si |

- Claude and GPT both flag that the slate is the dominant uncertainty and that 10–15 kWh/kg is not universal.
- Claude makes a native-metal-rich feed a **design requirement**. GPT keeps 50 kt/yr only as a **conditional target**.
- Gemini rates the station allocation at **high** confidence. Claude rates it medium and GPT rates it low.

### 3.3 Mining-site allocation

| Model | Allocation | Basis |
|---|---|---|
| Claude | 9 MW total (6–12): 4 sites × 1.5–3 MW | 0.4–0.8 MW peak load per site, × 2.2 day/night factor, at 1.3–1.5 AU |
| Gemini | 15 MW (10–20) | 4 × 1.5 MW for ISPP plus 1 MW robots, with derates |
| GPT | 20 MW: 4 × 5 MW | About 2 MW EOL per site at 1.3 AU, including about 1 MW per propellant plant |

- **ISPP power per site.** Claude keeps 0.25 MWe per unit, which yields about 240 t/yr of water. Gemini uses 1.5 MW, and GPT about 1 MW. GPT states that the original plant power "is inadequate" for its illustrative production range.

### 3.4 Storage sizing

| Model | Station | Per mining site | Total | Basis |
|---|---|---|---|---|
| Claude | 10 MWh (5–15) | 2 MWh (0.5–4) | ≈7–30 MWh | Controlled shutdown at 3–5 MW for 1–3 h. NEA nights of 1–5 h with 0.1–0.5 MW critical load. 15,000–60,000 cycles |
| Gemini | 12.5 MWh (15 min at full station power) | ~2 MWh (4 h × 500 kW) | 25 MWh (20–35) | Operational buffer and fault clearing. Asteroid night buffering |
| GPT | 0.09–0.87 MWh | 0.14–1.04 MWh | **1–6 MWh baseline**. **30–120 MWh** optional for full-night production | Critical loads only (0.2–0.5 MW at the station). Night duration illustrative only |

- **Chemistry.** Claude specifies LFP or LTO at shallow depth of discharge and rejects flow batteries. GPT says flow batteries "do not presently justify a baseline." Gemini does not address chemistry.

### 3.5 Unit cost and line cost

| Model | $/W | Line cost | Delivery assumption | Confidence |
|---|---|---|---|---|
| Claude | 20–160, central 45 (all-in, including launch) | $2–16B, central $4.5B | LEO $500–2,000/kg, plus a 1.5–3× multiplier to L4/L5 | low |
| Gemini | 35 (25–50) for hardware, plus launch | $2.5–4.0B in prose. $3.0B in the proposed change. $2.80B in YAML | $500–1,000/kg delivered to L4/L5 via electric tug | medium |
| GPT | 40–200 for hardware. **$100–750/W delivered**, including a 30% reserve | **$10–75B** | $5,000–25,000/kg to operating sites, as a scenario allowance | low |

**Reasoning behind the gap:**
- GPT treats delivery as $33–357/W on its own and declines to assume mass-production prices.
- Claude and Gemini assume mass-produced flexible blankets, with Starship-class launch implied in Gemini's case.
- GPT notes that its array budget alone would exceed the original ~$15.7B phase BOM in many scenarios. On that basis it calls for a revised programme architecture.

### 3.6 Cell technology

| Model | Position | Reasoning |
|---|---|---|
| Claude | Technology-neutral: thin III-V or space silicon, chosen by delivered $/W at EOL. 20–34% BOL efficiency | Interplanetary radiation is modest, so silicon is viable |
| Gemini | Flexible ROSA-style III-V | Silicon specific power drops to about 40–60 W/kg. Gemini also raises perovskite-on-silicon tandems as an open question |
| GPT | 29–32% qualified reference efficiency | Supplier datasheets do not establish 36% as a routine qualified baseline |

### 3.7 Distribution voltage

| Model | Position | Basis |
|---|---|---|
| Claude | 1.5–5 kV DC trunk (3 kV), stepping down at the MRE loads | At 600 V and 1 MW, a 400 m round trip at 2% loss needs about 1.7 t of aluminium per module (about 130 t station-wide). At 3 kV this falls to about 5 t |
| GPT | Segmented 2–5 kV candidate trunks (3 kV) | 47 kW loss at 600 V versus 0.7 kW at 5 kV for the same conductor. Flags insulation and plasma-arcing risk: higher voltage is "not … already qualified." Rated low–medium confidence |
| Gemini | Internally inconsistent | The interface section specifies a 600–1,000 VDC bus. The missing-items section says 1,000–3,000 VDC or high-frequency AC is needed |

### 3.8 Module size
- **Claude:** 1–2 MW modules, each about 13–33 t and one launch.
- **GPT:** 50–200 kW deployable subarrays, aggregated into 1–2 MW electrical blocks.
- **Gemini:** refers to 5–10 MW wings.

### 3.9 Degradation
- **Claude:** 0.5–1.2%/yr in the interplanetary environment, central 0.8%/yr.
- **GPT:** 72–81% of output retained after 15 years, with a replacement capability.
- **Gemini:** does not revise degradation.

### 3.10 Concentrators
These positions address different uses, so they are not in direct conflict.
- **Claude:** solar-thermal concentrators for **process heat**, displacing 3–15 MW_th, as an optional line.
- **Gemini:** rejects **PV concentrators** because of pointing below 0.1° and the mass and radiator burden. It favours thin blankets above 200 W/kg.
- **GPT:** flat plates as the baseline. PV concentrators remain possible but carry added pointing, thermal and deployment risk.

### 3.11 Power delivery at asteroid sites
- **Claude and GPT:** local arrays with local storage.
- **Gemini:** raises orbital power beaming as an option. It would remove surface batteries but adds about 40–50% round-trip conversion loss.

### 3.12 Whether launch and transport is a separate line
- **Claude:** add a separate line of $1–5B, while also carrying launch within its $/W table.
- **Gemini:** includes launch ($525M for 700 t) inside the bom-0-5 total.
- **GPT:** includes destination delivery inside the bom-0-5 envelope. GPT also states that "launch to Earth orbit is not delivery to L4/L5 or an asteroid."

---

## 4. Proposed BOM delta

> **All items below are proposals for human review. None is adopted.**

| # | Action | Item | Supporting model(s) | Quantity | Unit-cost range | Confidence |
|---|---|---|---|---|---|---|
| 1 | Resize | bom-0-5 arrays | Claude | 100 MW | $20–160/W | low |
| | | | Gemini | 70 MW | $35–45M/MW in YAML ($25–50/W in table) | medium |
| | | | GPT | 100 MW reference BOL across 5 sites | $100–750M/MW | low |
| 2 | Split | bom-0-5 by site | Claude | Station 70–85 MW; NEA sites 6–12 MW; reserve 5–10 MW | $20–160/W | medium (station) / low (sites) |
| | | | Gemini (prose and spec; not in YAML delta) | Station 55 MW; NEA 15 MW | — | high / medium (Gemini's ratings) |
| | | | GPT | Station 80 MW; 4 × 5 MW | — | low |
| 3 | Remove / resize | Battery storage, replacing 200–500 MWh | Claude | Station ~10 MWh plus 0.5–4 MWh per site | $1–3k/kWh (in cost table) | medium / low |
| | | | Gemini | 25 MWh distributed | — | high (Gemini's rating) |
| | | | GPT | 1–6 MWh critical-load (within the bom-0-5 envelope) | $1–10M/MWh | low |
| 4 | Add | Launch and in-space transport, Earth to L4/L5 and NEAs | Claude only as a separate line (GPT and Gemini fold delivery into #1) | 1 campaign, ~1,000 t arrays plus station | $1–5B | low |
| 5 | Add | Station heat rejection | Claude (costed); GPT (missing scope, uncosted) | 45–70 MW (Claude) | $0.5–3B (Claude) | low |
| 6 | Add | Station-wide power distribution and protection (PMAD, HV trunk) | GPT (costed); Claude and Gemini (missing scope; Claude carries $3–15/W PMAD inside #1) | 1 station network | $0.2–2B (GPT) | low |
| 7 | Add | Array deployment, assembly and servicing infrastructure | GPT (costed); Claude (missing scope; integration and assembly carried at $2–15/W inside #1); Gemini (trusses, gimbals, slip-rings, uncosted) | 1 multi-site capability | $0.2–2B (GPT) | low |
| 8 | Add (optional) | Solar-thermal process-heat concentrators | Claude | 3–15 MW_th | $50–500M | low |
| 9 | Add | Asteroid-surface dust mitigation and anchoring | Gemini | Not quantified | Not costed | — |
| 10 | Add | Cryogenic propellant storage and transfer | GPT | Not quantified | Not costed | — |

**Risk of double-counting.** Items 4, 6 and 7 partly overlap with cost elements that Claude and GPT already carry inside item 1. A human reviewer should decide which basis applies before summing.

---

## 5. Open questions

The table lists what would settle each remaining disagreement. Sources are the models that raised the question.

| Question | Settles | What would resolve it | Raised by |
|---|---|---|---|
| What does "50 kt/yr" measure (feed, concentrate, metal, or all products including O₂), and what is the product slate? | §3.1, §3.2 | A product-slate specification from bom-0-3, stating kWh/kg per product | Claude, GPT |
| Native Fe-Ni-rich feed versus oxide feed | §3.1, §3.2 (about 60 MW versus over 100 MW per Claude) | Composition data from bom-0-1 prospecting | Claude, GPT |
| Can MRE and solar-grade routes reach the assumed specific energy with asteroid feedstock? | §3.2 (10–14 versus 15–30 kWh/kg) | Pilot-scale process testing. Terrestrial benchmarks (IAI, IEA PVPS T12-19:2020) are noted by GPT as not validating orbital production | GPT, Claude |
| Content of P0-F01 | Reserve allocation; ISPP sizing | Supply the P0-F01 text | Claude, GPT |
| Actual NEA targets: orbit and heliocentric range, rotation, pole, illumination | §3.3, §3.4 | Site characterisation from bom-0-1 | All three |
| Daylight-only versus night-side mining | §3.4 (GPT's 1–6 versus 30–120 MWh; Claude's throughput halving) | Operations trade study | Claude, GPT |
| Launch $/kg and the transfer architecture to L4/L5 and NEAs | §3.5, §3.12 | Launch and transfer quotations; trajectory analysis | All three |
| Qualified cell and blanket prices at 100 MW scale | §3.5, §3.6 | Supplier quotations and production-capacity commitments | GPT, Claude, Gemini (perovskite tandems) |
| Thin III-V versus space silicon versus tandems | §3.6 | EOL delivered-$/W trade at production scale | Claude, Gemini |
| Qualification of 2–5 kV space DC trunks | §3.7 | Insulation and plasma-arcing testing | GPT |
| Surface arrays versus orbital beaming at NEAs | §3.11 | Architecture trade including dust, eclipse and conversion loss | Gemini |
| Propellant compatibility and supply: krypton availability for SEP; LH₂/LOX versus Kr/iodine tugs | Transport line; ISPP value | Propulsion architecture definition | Claude (krypton supply, figure flagged as uncertain), GPT (fuel compatibility) |
| Propellant for array carriers and station keeping | Mass and cost completeness | Vehicle and orbit definition | GPT |
| Timing of station-produced solar-grade Si for array replacement | Later-phase cost | Production roadmap | Claude, GPT (warns that relying on it for initial supply is circular) |
| Who funds heat rejection, cryogenics and lifetime replacement? | BOM ownership | Programme-level BOM review | GPT, Claude |

---

## Reviewer note

These are the rapporteur's observations only; no technical claims are added.

1. **Model identity mismatch.** The YAML `model:` fields do not match the response headers:
   - Claude Opus 5.5 → claude-opus-4
   - Gemini 3.8 Flash → claude-3-7-sonnet
   - GPT-6.1 Sol → GPT-5.2

   Provenance should be confirmed before the record is filed.
2. **Internal inconsistencies to return to the authors:**
   - **Gemini, line cost.** Three different values are given: $2.5–4.0B, $3.0B and $2.80B. The $/W range also differs between table and YAML (25–50 versus 35–45).
   - **Gemini, distribution voltage.** 600–1,000 VDC in the interfaces section versus 1,000–3,000 VDC in missing scope.
   - **Gemini, old-value column.** The storage entry reads "500 (Claude) / 200 (Gemini)", which refers to panel models rather than the specification.
   - **Gemini, ISPP sizing.** ISPP sites are listed as "local arrays" (6 MW) within the load total, which mixes arrays and loads.
   - **Claude, station power.** The interface table states 45–70 MW average delivered to the station. Claude's own F03 table gives 24–54 MW average load and 31–71 MW EOL.
3. **Uneven coverage:**
   - Only Claude and GPT acknowledge that P0-F01 was not supplied.
   - Only Claude costs heat rejection.
   - No model costs the 15-year replacement campaign. Claude gives 10–30 t/yr of spares mass, and GPT lists replacement as unfunded.
   - Gemini states **high** confidence on station allocation, storage and specific power, while the other two rate the same parameters low to medium.
