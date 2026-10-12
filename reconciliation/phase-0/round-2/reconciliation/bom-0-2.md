---
phase: phase-0
item: bom-0-2
round: 2
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
framework: 18f503fe4ec6
generated: 2026-10-12T10:06:38.806Z
---

# bom-0-2 Mining Robots: Phase-0 Round-2 Reconciliation

**Panel:** Claude Opus 5.5 ("Claude"), Gemini 3.8 Flash ("Gemini"), GPT-6.1 Sol ("GPT").
**Scope:** findings P0-F02, P0-F07 and P0-F14.

All values below are attributed to the model or models that stated them. The rapporteur adds no technical claims. Internal inconsistencies and labelling problems are listed in the final Reviewer note.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F02**: mining rate, robot target and station throughput disagree | agree | agree | **partly** |
| **P0-F07**: robot mass and power are inconsistent | agree | agree | **partly** |
| **P0-F14**: debris, contamination and regulation unbudgeted | agree | agree | agree |

**Where the panel stands**

- **P0-F02.** All three agree that the phase mass flow does not close. All three agree that a remote 50 kt/yr station cannot be fed through roughly 1 kt/yr of transport.
  - GPT's "partly" turns on one point: the hourly and annual figures can coexist at a 2.3–5.7% duty cycle, so they are not inherently contradictory.
  - Claude accepts that logic. It still calls an unstated 2–6% duty on a $50M asset a substantive gap.
- **P0-F07.** All three agree that the 500 kg reference is wrong. All three agree that the rq-0-26 torque figure (50–200 N·m at 10 kW) is physically incoherent.
  - Claude and Gemini judge 20–50 kW to be an overestimate.
  - GPT's "partly" holds that 20–50 kW is not intrinsically impossible on a 2.5–3.5 t robot. In GPT's view the power and restraint architecture is simply unclosed, so it keeps 20–50 kW as a test envelope.
- **P0-F14.** The panel is unanimous that the hazard is unbudgeted and that ">99% containment by mass" is inadequate. All three also agree that tailings dominate the residue stream. They disagree on the replacement metric and its value (see §3).

---

## 2. Agreed changes

These are supported by all three models unless a dissent or silence is noted.

| # | Change | Consolidated value / range | Support and notes |
|---|---|---|---|
| A1 | Strike the "500 kg robot" reference in rq-0-26 | — | All three |
| A2 | Withdraw the rq-0-26 torque basis (50–200 N·m at 10 kW). It implies roughly 480–1,900 rpm (Claude, GPT) or about 955 rpm at 100 N·m (Gemini) | Replacement torque values diverge (§3, D7) | All three |
| A3 | State an explicit excavation duty cycle in the spec, linking nameplate rate to annual output | Values diverge (§3, D4) | All three |
| A4 | Baseline on-robot physical beneficiation at about 1:1. Do not baseline magnetic or electrostatic beneficiation | ~1:1. Claude 1.0–1.3 (ref 1.1); Gemini 1.0–1.05; GPT ~1:1 with no credited gain. Combined envelope 1.0–1.3 | All three |
| A5 | A 50 kt/yr mineral station fed remotely through roughly 1 kt/yr transport is not viable. The station must be co-located, deferred or re-scoped. Escalate the station's location and role as a phase-level decision | — | All three. Claude strikes "Branch R" as failing a must. Gemini says bom-0-3 must be co-located or repurposed for volatiles. GPT says defer or resize |
| A6 | Size the initial robot procurement to a water-first, transport-limited chain rather than the 50 kt/yr station | Quantity diverges (§3, D1) | All three |
| A7 | Procure in phases (pathfinders first) instead of committing 20 robots at once | Claude 3 pathfinders + up to 17 conditional; Gemini 2 pathfinders scaling to 6 operational; GPT 3 initial with a 20 conditional ceiling | All three |
| A8 | Raise the excavation subsystem mass from 60–80 kg | 150–800 kg combined. Claude 150–300 (ref 220); Gemini 180–280 (ref 220); GPT 200–800 (provisional) | All three |
| A9 | Counter-rotating dual wheels need a stated reaction-load treatment. Thrust, crowd force and transients are not removed by counter-rotation alone | — | Claude and GPT explicitly. Gemini still credits 90–95% torque cancellation (§3, D7) |
| A10 | Replace ">99% containment by mass" as the governing requirement | Replacement metric diverges (§3, D8). Claude would keep ≥99% only as a derived design goal | All three |
| A11 | Add tailings retention or management as explicit scope | Tailings mass: Claude 12–33 kt/yr (Branch W) or 45–60 kt/yr (Branch C); Gemini 18–38 kt/yr; GPT 19.2 kt/yr reference (14.0–24.4) | All three |
| A12 | Separate robot NRE and qualification from recurring unit cost. The $17M rq-0-26 programme cannot qualify a 5-year robot | NRE $350–900M combined (see §4) | All three |
| A13 | Replace "direct coupling, no hoppers" with sealed intermediate transfer between robot and ISPP | Claude and Gemini specify sealed 1–2 t canisters. GPT permits sealed surge storage but says do not freeze the 1–2 t capacity | All three |
| A14 | Remove duplicate excavation scope from bom-0-6. Excavation belongs to bom-0-2; ISPP begins at the feed or canister inlet | — | All three. Claude: resize bom-0-6. GPT: keep bom-0-6 but remove duplicate scope. Gemini: interface notes bom-0-6 "claims its own excavation" |
| A15 | Regulatory framing: no international body certifies an asteroid mine. The authorising national state supervises under OST Art. VI and IX. The project develops its own limits. bom-0-7 owns the assurance and authorisation work | — | All three. GPT explicitly rejects bom-0-7 "establishing international thresholds" |
| A16 | Withdraw round-1 "high confidence" ratings on excavation power, production and mass | — | Claude (withdraws Gemini's round-1 20 kW high confidence) and GPT (does not endorse round-1 high-confidence estimates). **Gemini dissents in effect:** it assigns high confidence to its own new 4 kW / 8 kW values (§3, D2) |

**Two-of-three agreements (third model silent)**

- **Design cutting life of 20,000+ h is not derived and should be tied to duty.** Claude gives 7,500 h (5,000–12,500). GPT gives about 11,000 h (5,000–21,000). Gemini is silent.
- **Dual bucket wheels should be a candidate, not a hard requirement.** Claude and GPT hold this. Gemini retains the wheel and does not address alternatives to it.

---

## 3. Preserved divergences

### D1. Fleet size and initial commitment

| Position | Held by | Reasoning |
|---|---|---|
| 3 pathfinders + up to 17 conditional. Branch W needs only 6–14 in total | Claude | Caps capital at risk at about $0.3–0.5B. Productivity is uncertain by 2–6×. It is likely (60–75%) that first-generation output falls ≥2× short |
| 2 pathfinders → 6 operational (range 2–8) | Gemini | 6 robots × 2,600 t/yr ≈ 15.6 kt/yr closes with co-located ISPP and about 1–2 kt/yr transport. This cuts recurring cost to $300–400M |
| 3 initial, 20 as a conditional ceiling | GPT | Buys flight learning before replication. Loss of one of three robots raises required duty to 17–71%, eliminating margin |

### D2. Excavation and electrical power

| Position | Held by | Reasoning |
|---|---|---|
| Mechanical 2 kW (0.5–5) including conveying; cutter sub-kW in fines. Electrical peak 7 kW (3–12). Test rig 10 kW and 10 kN·m stall per wheel | Claude | Specific energy of about 1–10× strength. Fines ≤1 kPa cohesion give 15–135 W at 0.15 m/s tip speed. Weak boulders need 1.4–7 kW at full cut depth. Power is not the binding constraint; anchoring and handling are |
| Mechanical 4 kW (2–8). Electrical 8 kW (5–12). **High confidence** | Gemini | Specific energy 0.05–0.5 kWh/t. Clast grinding at about 2 kWh/t keeps cutting under about 5 kW. 20–50 kW reflects terrestrial hard-rock metrics |
| Mechanical 20–50 kW retained as a two-wheel **test envelope**. Electrical 25–70 kW. Low confidence | GPT | Surface-contact heritage does not establish specific energy. Competent inclusions may need much more. The lower 2–10 kW "may be appropriate for some loose material" but is a hypothesis to measure |

### D3. Power source architecture

| Position | Held by | Reasoning |
|---|---|---|
| Own arrays (20–50 m², ref 35) + 15–40 kWh battery, recharged at a hub. Umbilical ≤300 m is a production option. Beamed power rejected | Claude | Pathfinders on uncharacterised boulder fields should not depend on cabling with unknown snag or abrasion behaviour |
| Small housekeeping array (15–25 m², 3–5 kW) + 30–50 kWh battery as pathfinder baseline (DQ decision and YAML). Umbilical (1–3 kV DC) as growth path. The spec table instead lists "tethered umbilical + buffer" as primary, high confidence | Gemini | Large arrays on a walking robot create inertial coupling, snagging and attitude problems. See Reviewer note on the internal inconsistency |
| Fixed anchored site power node with managed cable/docking. Robots work within a bounded area, not unrestricted walking. Battery 10–30 kWh for safing only | GPT | At 25–70 kW, 8 h of battery operation needs 200–560 kWh (1.1–4.7 t). Tethers are not inherently unacceptable, but unrestricted tethered walking is a poor baseline |

All three label this a **trade-off point**: autonomy and mobility versus mass, power and dust exposure.

### D4. Dig rate, duty cycle and per-robot output

| Parameter | Claude | Gemini | GPT |
|---|---|---|---|
| Nameplate rate | 2 t/h (1–3) in fines; 0.3 t/h (0.1–0.5) in weak-boulder comminution | 2.0 t/h (1.5–3.5) | 2–5 t/h, as a test objective only |
| Duty / cutting hours | 1,500 h/yr (1,000–2,500) | 15% (10–25%), about 1,300 h/yr | 25% reference (11–48%) for three robots |
| Output | 3,000 t/yr per robot (1,000–7,500) | 2,600 t/yr per robot (1,800–3,500) | 15–25 kt/yr fleet total (ref 20) from three robots |
| Rate-limiting factor | Anchoring and handling (ACH, see §6) | Not stated | Not asserted; six-axis loads must be measured |

### D5. Robot dry mass

- **Claude:** 2,500 kg (1,600–4,000), from a bottom-up budget including 20–30% margin.
- **Gemini:** 2,800 kg (2,400–3,200), from a subsystem build-up (no table given).
- **GPT:** 3,000–5,000 kg landed. This is a reserve allocation, excludes detached site infrastructure, and "is not evidence that lighter robots cannot work".

### D6. Battery and night operation

- **Claude:** 15–40 kWh. Night digging only on fast rotators, at 3–5 kW for 2–4 h, needing 6–20 kWh.
- **Gemini:** 30–50 kWh buffer. Continuous night digging would need "several tonnes" of battery per robot.
- **GPT:** 10–30 kWh, safing only. Night-side excavation from robot batteries is not to be baselined.

### D7. Reaction torque and cancellation

- **Claude:** 0.1–1 kN·m per wheel in fines, with a 5 kN·m stall rating. Uncancelled crowd force is 30–900 N in fines and ≤2 kN in boulder mode. The "90–95% cancellation" figure has no supporting test or DEM result (very low confidence).
- **Gemini:** about 1,000 N·m per wheel at 2 kW and 2 rad/s. Counter-rotation cancels 90–95%, leaving a residual of 75 N·m (25–150).
- **GPT:** illustratively 2–25 kN·m per wheel at 20–50 kW and 1–5 rad/s. Cancellation is credited only when demonstrated. GPT requires a measured six-axis load envelope.

### D8. Containment metric and limits

| Position | Held by | Reasoning |
|---|---|---|
| Three-part requirement: (a) all external handling velocities ≤0.5 v_esc; (b) deposition ≤0.1 g/m²/yr of <100 µm dust at protected surfaces; (c) site escape ≤1 t/yr (0.1–10). Mass fraction is "the wrong control variable" | Claude | Escape is governed by velocity and harm by deposition flux. 99.9995% from a seal on an open face is not verifiable. Escaped fine grains are cleared by radiation pressure and P-R drag. Claude states explicitly that its budget is looser than GPT's |
| ≤10 kg/robot/yr (≥99.99%; range 99.95–99.999%), ≤60–100 kg/yr fleet. Tip speed ≤0.2 m/s. Electrostatic curtains | Gemini | >99.999% is infeasible because of seal abrasion; 99.99% balances seal life against <0.5%/yr array degradation |
| 10–100 kg/yr site-wide uncontrolled release across all handling stages (≈99.9995–99.99995% at 20 kt/yr). Receiver limit ≤1%/yr performance loss. Automatic stop rules | GPT | A provisional risk allocation that "may prove impractical". Accounting must cover particle size, velocity and destination, not mass alone |

**Velocity limit**

- Claude makes the limit relative to the body: 0.5 v_esc, i.e. 0.02–0.2 m/s.
- Gemini fixes it at ≤0.2 m/s.
- GPT sets no tip-speed limit.

### D9. Fate of fugitive dust

- **Claude:** at ≤0.5 v_esc, most fugitive grains stay bound and fall back, so the hazard is local redeposition. Electrostatic lofting is an uncertain exception. Claude calls Gemini's round-1 "inevitably exceeds escape velocity" incorrect as a design statement.
- **Gemini (F14 reasoning):** tool tip speeds of 0.5–2.0 m/s exceed v_esc, so 600+ t/yr becomes orbital and heliocentric debris. (Its own proposal sets ≤0.2 m/s; see Reviewer note.)
- **GPT:** neither "most grains fall back" nor "particles inevitably escape" is supported without particle-release distributions. Escape does not imply leaving the operating environment.

### D10. Excavated-material temperature rise

- **Claude:** about 4 K (2–15 K) at 2 kW. Thermal isolation becomes a verification item only.
- **GPT:** round-1's blanket 5–15 K "is not defensible". At 20–50 kW with all energy entering the feed, the rise is 14–130 K, and partitioning must be measured.
- **Gemini:** silent.

This divergence follows from D2.

### D11. Water yield, export and station feed

| | Claude | Gemini | GPT |
|---|---|---|---|
| Water assumption | 3–8 wt% recoverable × 70–90% recovery | 5–10 wt% H₂O in CI/CM | 5 wt% × 80% |
| Exported | 250–1,000 t/yr | 1,200 t/yr (800–2,000) to bom-0-4 | 700 t/yr (450–950) |
| bom-0-3 feed | 0 directly (Branch W); 47–62 kt/yr dried feed if co-located (Branch C) | 0 t/yr (0–1,000) | 450–950 t/yr water; bom-0-3 re-scoped as a water-conditioning service |
| Transport ceiling | ~1 kt/yr, unverified (P0-F01) | 1–2 kt/yr, "physically bounded by Kr/I electric propulsion" | ~1 kt/yr, provisional and unverified |

### D12. Mobility concept

- **Claude:** walking robot, with arrays stowed near the face and while walking.
- **Gemini:** raises an anchored gantry or tether frame with winch traversal as an alternative to walking hexapods or rovers.
- **GPT:** robots excavate docked or tethered within a bounded work area.

### D13. Excavation mechanism

- **Claude:** whether bucket wheels or drums suit the target at all is "about as likely as not (40–60%), low confidence". Percussive crushing, bagging or a drag-line may suit boulder-dominated sites better.
- **GPT:** opposed drums, enclosed coring and restrained collection remain credible competitors.
- **Gemini:** retains the bucket wheel. It flags stall and shock torque on competent (>50 MPa) inclusions.

### D14. Evidence readings

- **Grott et al. (2019):**
  - Claude cites it for boulder tensile strength of about 200–280 kPa.
  - GPT reads it as a low-conductivity, high-porosity result and "not a direct industrial excavation-strength measurement".
  - Gemini cites it for micro-compressive strength below 1 MPa.
- **Near-surface cohesion:** Claude ≤1 kPa (Arakawa 2020); Gemini 0.1–10 Pa.

### D15. Interface values (non-exhaustive)

- **Power to bom-0-5:**
  - Claude: fleet average 20–80 kW, peak ≤0.2 MW.
  - Gemini: 60 kW (30–100).
  - GPT: 0.075–0.21 MW cutting and a 0.1–0.3 MW reserve. GPT separately flags 0.5–2 MW site demand for ISPP heating.
- **Data:**
  - Claude: 0.1–1 Mbps per robot on site; 0.1–2 Mbps aggregate to Earth.
  - Gemini: 100 kbps to bom-0-7.
  - GPT: 1–10 GB/day per active robot.
- **Robot propellant:** Claude 0.2–1 t/yr fleet; GPT 0.01–0.10 t/yr; Gemini none stated.
- **"in_bom" flags differ:**
  - Claude marks the bom-0-5 power and bom-0-6 mass interfaces as not in the BOM.
  - GPT marks both as in the BOM, but marks cables and docking as not in it.

### D16. Regulatory specifics

- **Claude:** COSPAR planetary-protection category for an NEA mining site is most likely Category II. Earth return has precedent as "unrestricted". US operators face a mission-authorisation gap. Candidate domiciles: Luxembourg, UAE, Japan.
- **Gemini:** names the US Commercial Space Launch Competitiveness Act and the Luxembourg Space Resources Act.
- **GPT:** COSPAR, ITU and debris standards are not interchangeable. No claim on the national pathway should be made without jurisdiction-specific legal review.

### D17. Programme cost

- **Claude:** total about $2.1–5.5B against the $1.0B line. It is likely (≥80%) to exceed $2B, at medium confidence.
- **GPT:** mining-campaign subtotal for three robots is $0.9–2.5B. This excludes shared ISPP, generation, transport, prospecting and station, so it is not a phase total.
- **Gemini:** no roll-up. Recurring cost falls to $300–400M.

---

## 4. Proposed BOM delta

**These are proposals for human review. None is adopted by this reconciliation.**

| # | Action | Item | Supporting models | Quantity | Unit-cost range (USD) | Confidence (as stated) |
|---|---|---|---|---|---|---|
| 1 | **resize** | bom-0-2 Mining robots | All three (quantities differ) | Claude: 3 + up to 17 conditional. Gemini: 6 (2 pathfinder + 4 pilot; range 2–8). GPT: 3 initial, 20 ceiling | Claude 30–70M; Gemini 45–65M; GPT 30–80M | Claude: fleet medium, unit cost low. Gemini: medium. GPT: fleet medium |
| 2 | **split** | Robot NRE and qualification | All three | 1 programme | Claude 400–800M (incl. anchoring rq-0-7); Gemini 350–600M; GPT 400–900M (incl. dust research; rq-0-26 $17M retained inside) | Claude low; others not stated |
| 3 | **add** | Launch, cruise and landing of robots | Claude, GPT | Claude: 1 campaign in 2 phases, ~50 t (32–80 t) landed for 20 robots. GPT: 1 campaign, 9–15 t for 3 robots | Claude 0.5–1.5B; GPT 200–700M | Not stated |
| 4 | **add** | Site hub / site services | Claude, GPT; Gemini in part (power distribution and canisters only) | 1 site | Claude hub (depot, charging/PDU, wear-part station, relay) 150–500M. GPT site services incl. anchors, distribution, sealed logistics, tailings, comms, spares 100–400M. Gemini surface power distribution and umbilicals 80–150M | Not stated |
| 5 | **add** | Hermetic transfer canisters | Gemini (separate line); Claude and GPT (inside hub or site services) | Gemini: 24 | Gemini 2–5M each | Not stated |
| 6 | **add** | Tailings retention | Claude, Gemini separately; GPT inside item 4 | 1 site | Claude 50–300M; Gemini 50–120M | Not stated |
| 7 | **add** | Dust monitoring and mitigation (witness plates, EDS, modelling) | Claude separately; Gemini $50M dust-mitigation qualification (text only); GPT inside NRE or site services | Fleet and site | Claude 50–150M; Gemini ~50M | Not stated |
| 8 | **add** | Subsurface-mechanics precursor probe | Claude. GPT folds an instrumented flight demonstration into NRE. Gemini raises subsurface strength as an open question only | 1 | Claude 100–300M | Not stated |
| 9 | **add** | Mission operations and ground segment (5 yr) | Claude, GPT | 1 | Claude 150–300M; GPT 100–250M (incl. assurance and regulatory support) | Not stated |
| 10 | **add** | Spare / attrition robots | Claude. GPT folds spares into site services and rejects a fixed loss forecast | Claude: 2–4 | At unit cost (Claude 30–70M) | Not stated |
| 11 | **resize** | bom-0-6 ISPP: remove excavation scope | Claude (resize), GPT (keep 4 units at 500M with scope removed); Gemini notes the double scope | — | Claude 0; GPT 500M per unit unchanged | Not stated |
| 12 | **resize / defer** | bom-0-3 Processing station | GPT (0 authorised before closure; $10B placeholder retained). Claude escalates as a blocking phase decision. Gemini defers full 50 kt/yr throughput | GPT: 0 | GPT 10B placeholder | Not stated |

---

## 5. Open questions

| Question | Raised by | What would settle it |
|---|---|---|
| Is bom-0-3 remote, co-located or deferred, and is Phase 0 water-first or minerals-first? | All three | A phase-owner decision. Claude and GPT treat it as a values question, not a measurement |
| Is transport capacity really about 1 kt/yr (P0-F01)? | Claude, GPT; Gemini asserts 1–2 kt/yr | bom-0-4 payload, trajectory and turnaround analysis. Claude's falsifier: ≥20 kt/yr feasible within budget would revive a remote station |
| Subsurface strength, fines depth and areal extent at the target | All three | Precursor penetrometer or excavation probe (Claude). Representative-depth samples (GPT). Claude's falsifier: fines <0.2 m thick favours a comminution head |
| Achievable anchor capacity in porous rubble under cyclic loads | All three. Gemini sets a >500 N microspine threshold | Instrumented anchoring tests on representative simulant; flight demonstration (GPT) |
| Six-axis cutting and jam loads, and whether counter-rotation cancels them | Claude, GPT; Gemini assumes 90–95% | Measured load envelopes, DEM, full-scale rig with stall capability (Claude: 10 kW and 10 kN·m) |
| Specific cutting energy across representative materials, including competent inclusions | GPT; Claude (boulder mode); Gemini (>50 MPa inclusions) | Excavation tests on representative simulants and inclusions; flight demonstration |
| Umbilical snag and abrasion rate on boulder fields in milli-g | All three | Claude: parabolic-flight or air-bearing test dragging cable through boulder simulant, giving snag rate per 100 m. Gemini: simulation on OLA topography. GPT: representative terrain, jam recovery and relocation trials |
| Fraction of fugitive dust that escapes at ≤0.5 v_esc, including electrostatic lofting | Claude, GPT, Gemini (as a falsifier) | DEM plus lofting modelling. Pathfinder witness plates (Claude falsifier: >10% escape). Full-cycle release tests and receiver exposure modelling (GPT) |
| Is a 10–100 kg/yr (GPT) or ≤10 kg/robot/yr (Gemini) release budget achievable through servicing and faults? | GPT, Gemini | Full-cycle vacuum-chamber and in-situ release tests |
| Recoverable water fraction and extraction temperature (is 1,000 °C needed?) | Claude, GPT | Mineral-specific closed recovery tests. Claude notes this sets fleet size by 2–3× |
| Wear life and maintenance cadence | GPT; Claude (replaceable teeth and seals) | Long-duration abrasive testing before replication (GPT gate) |
| Which authorising state and licence conditions bind the contamination standard? | Claude, GPT | Jurisdiction-specific legal review (GPT); domicile choice by bom-0-7 (Claude) |
| Who owns the programme overrun against the $1.0B line? | Claude; GPT (no binding owner of fleet release) | Executive assignment |

---

## 6. Decision-quality audit

### 6.1 Per decision

**Phase architecture and station location** (Claude DQ2; GPT Decision A; Gemini Decision 2)

- **Weakest link**
  - Claude: *frame*. Round 1 let each model choose its own downstream architecture, then reported three fleet sizes as a divergence.
  - GPT: *frame*. Round 1 never established which mission it was sizing.
  - Gemini: no weakest link named.
- **Missing or unsupported steps**
  - Claude: round-1 Gemini's 50 kt/yr transported option should have been screened out as failing a Kepner-Tregoe "must", not preserved.
  - GPT: closure, safe restraint and lawful operation are binary musts, not weighted attributes. Stakeholder weights should be approved before scoring.
- **Reclassified as trade-off points**
  - Claude: W vs C is a values question (early scale vs capital and complexity).
  - GPT: learning vs early mineral output is a values trade-off; water yield is a sensitivity point.
  - Gemini: station throughput is a sensitivity point.

**Fleet procurement** (Claude DQ1; GPT within Decision A and Decision D; Gemini within Decision 2)

- **Weakest link**
  - Claude: *alternatives*. The null or precursor option and the cost of delay were never priced.
  - GPT (Decision D): *reasoning and commitment*. Simulation agreement was treated as validation, and no binding owner controls fleet release.
- **Missing or unsupported steps**
  - Claude: Cost of Delay is not quantified.
  - GPT: the 18-month programme was treated as qualification; torque-percentage gates should become system gates.
- **Reclassified as trade-off points**
  - Claude: fleet size is a schedule vs capital-at-risk trade-off, which round 1 had presented as a technical divergence.
  - GPT: faster deployment vs evidence maturity is a values trade-off.

**Excavation architecture and power** (Claude DQ3 and DQ4; GPT Decision B; Gemini Decision 1)

- **Weakest link**
  - Claude: *reasoning* for DQ3. rq-0-26's "unanimous" resolution rested on an incoherent torque figure, and "unanimity among models sharing an error is not evidence". Round-1 Gemini's high confidence on 20 kW should be withdrawn.
  - Claude: *information* for DQ4. There are no cable-snag data, so Claude's round-1 rejection and GPT's round-1 baseline of the tether rested on equal ignorance.
  - GPT: *information*. Six-axis loads, substrate strength and power histories are missing.
  - Gemini: none named.
- **Missing or unsupported steps**
  - Claude: ran an ACH. H1 (power-limited) was most disconfirmed; H2–H4 (anchoring, handling, feedstock) survive.
  - GPT: calls for an ACH on "dual wheels sufficient", "anchoring dominates" and "another mechanism superior". It states that current evidence does not discriminate among them.
  - Gemini: rates evidence certainty "high" for its low-power estimate. Both Claude (medium) and GPT (low) dispute that level of certainty for the power figures.
- **Reclassified as trade-off points**
  - Claude: tip speed (containment vs torque and gearbox mass); power source (autonomy vs mass and dust). Anchor capacity is a sensitivity point.
  - GPT: tethering (power and mass closure vs mobility). Wheel speed is a sensitivity point.
  - Gemini: robot operating range vs mechanical complexity.

**Containment metric** (Claude DQ5; GPT Decision C; Gemini Decision 3)

- **Weakest link**
  - Claude: *values*. Round 1 debated 99.5% vs 99.95% vs 10 kg/yr without saying whose harm each protects against, and never weighed tailings.
  - GPT: *values and information*. No accepted consequence threshold and no validated transport model.
  - Gemini: none named.
- **Missing or unsupported steps**
  - Claude (GRADE EtD): self-protection and third-party due regard were never separated. A mass-fraction claim is not verifiable by a regulator.
  - GPT: a speculative numerical allocation must not be mistaken for a regulatory standard. Accounting must cover all handling stages.
- **Reclassified as trade-off points**
  - Claude: containment tightness vs torque and enclosure mass.
  - GPT: tighter containment vs maintainability and productivity, subject to safety musts. Grain-size and velocity distributions are sensitivity points.
  - Gemini: cutting speed vs seal tightness.

**Cost roll-up** (Claude DQ6; GPT in §4)

- **Weakest link**
  - Claude: *commitment*. No owner accepts or rejects the overrun.
  - GPT: *information* on NRE separation. Estimates lack a work breakdown and quotations.

### 6.2 GPT's disposition of round-1 proposals

Recorded as stated by GPT. Claude and Gemini did not issue a comparable list.

- **Adopt:** NRE split; explicit delivery, operations, relay, spares and site-services scope.
- **Do not freeze:** 1–2 t canisters. Note: Claude and Gemini both specify 1–2 t.
- **Reject as forecast:** fixed 2–6 lost robots. Note: Claude adds 2–4 spares.
- **Reject as general fact:** a 0.5 m subsurface transition.
- **Retain as hypothesis:** lower excavation power.
- **Reject:** 99.5% containment as sufficient; bom-0-7 setting international thresholds; 5 yr / 20,000 h as demonstrated capability.
- **Replace:** "no hoppers" with sealed surge storage.

### 6.3 Points of convergence and divergence in the critiques

**Convergence**

- Claude and GPT independently name *frame* as the weakest link for phase architecture.
- Claude (DQ6) and GPT (Decision D) independently identify a missing commitment owner.
- All three classify tether vs own power as a trade-off point.

**Divergence**

- Claude and GPT treat the low-power figure as an unvalidated or medium-confidence estimate; Gemini treats it as high certainty.
- Claude regards velocity limits as the verifiable control. GPT treats dust fate as undetermined either way. Gemini's reasoning text asserts that escape is likely at 0.5–2 m/s.

---

## Reviewer note

These are observations on the submissions, not new technical claims.

1. **Model labelling.** Gemini's YAML `model:` field reads "Claude-3.5-Sonnet-Engineering-Review". Its content is attributed here to Gemini 3.8 Flash per the section heading. GPT's YAML reads "ChatGPT".
2. **Gemini's power source is stated inconsistently.**
   - Its F07 proposed change and spec table baseline a tethered umbilical as primary (spec table: "high" confidence).
   - Its DQ Decision 1 and YAML baseline a small array plus battery (Option B), with the umbilical as a growth path.
   - Panel position D3 records both statements.
3. **Gemini's F14 reasoning does not match its own proposal.**
   - The reasoning computes 657 t/yr loss for 20 robots at 15% duty, and states that tip speeds of 0.5–2.0 m/s exceed v_esc.
   - Its own proposal is 6 robots, 15 rpm and ≤0.2 m/s tip speed.
   - Claude gives Bennu v_esc as about 0.20 m/s, so Gemini's fixed ≤0.2 m/s limit coincides with escape velocity on that body as Claude states it. Claude's body-relative 0.5 v_esc limit and Gemini's fixed limit were not reconciled by either model.
4. **Gemini's exported water exceeds the shared ceiling.** Its 1,200 t/yr (800–2,000) exceeds the ~1 kt/yr transport ceiling that Claude and GPT use. Gemini's own 1–2 kt/yr bound is attributed to electric-propulsion limits without a supporting calculation.
5. **Gemini's critiques lack a weakest link.** None of Gemini's three DQ critiques names a weakest DQ link, and none includes a null or defer option. Claude and GPT both include null options.
6. **Unexplained or minor consistency issues**
   - Gemini's canister quantity (24) is unexplained.
   - Claude's YAML fleet range [6, 20] and its "3 pathfinders" text use different bases.
   - Claude's dry-mass confidence is "medium-low" in its table and "low" in its YAML.
7. **Unreconciled cost bases.** No model reconciled its cost roll-up with the others' scope boundaries. Claude's $2.1–5.5B and GPT's $0.9–2.5B cover different scopes (20 robots including delivery vs a 3-robot campaign excluding shared plant), so they are not directly comparable.
