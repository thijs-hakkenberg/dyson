---
phase: phase-0
item: bom-0-2
round: 1
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
generated: 2026-10-11T23:12:41.709Z
---

# Reconciliation: bom-0-2 Mining Robots (Phase 0, Round 1)

**Panel:** Claude Opus 5.5 ("Claude"), Gemini 3.8 Flash ("Gemini"), GPT-6.1 Sol ("GPT").

**Rapporteur's stance:** All figures below are attributed to the model(s) that stated them. The rapporteur has not verified them and adds no technical claims, except for the flagged items in the Reviewer note.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F02** Mining rate / robot target / station throughput disagree | agree | agree | partly |
| **P0-F07** Robot mass and power internally inconsistent | partly | agree | partly |
| **P0-F14** Debris, contamination and regulation unbudgeted | agree | agree | agree |

**P0-F02: the mass-flow chain does not close, and the duty cycle is unstated.**
- All three agree on this core point.
- All three compute that 1,000 t/yr at 2–5 t/h implies a 2.3–5.7% duty cycle.
- GPT's "partly" rests on one argument: the hourly and annual figures are not inherently contradictory, only unexplained.
- Claude and Gemini treat the figures as a substantive inconsistency.
- The models diverge sharply on what the corrected throughput should be.

**P0-F07: the 500 kg reference is wrong.**
- All three agree on this point.
- Claude and GPT go further and say the finding missed the larger error, which is the torque, power and anchoring budget.
- Claude argues the 20–50 kW power figure is itself overstated.
- Gemini accepts 20 kW peak and focuses on the on-robot array problem.

**P0-F14: the containment requirement needs tightening and an owner.**
- The panel is unanimous on this.
- The models disagree on:
  - the metric (mass-containment fraction versus escaping mass versus uncontrolled release);
  - the numerical limit;
  - who sets the standard.

---

## 2. Agreed changes (supported by all three models)

| # | Change | Consolidated value / range | Notes |
|---|---|---|---|
| A1 | Strike the "500 kg robot" design-basis reference in rq-0-26 | Replace with the actual robot mass (value contested, see D4) | All three |
| A2 | State the excavation duty cycle explicitly and derive annual output from it | No consolidated value; see D1 | All three show that the current 2–5 t/h and ≥1 kt/robot/yr imply only 2.3–5.7% duty |
| A3 | Replace the ">99% by mass" containment requirement with a substantially tighter requirement | Tighter than 99%. Proposed values span Claude ≥99.5% to GPT ~99.9995%, so no consolidated value; see D7 | All three compute that 99% releases hundreds of tonnes per year at their respective throughputs: Claude ~460 t/yr; Gemini ~600 t/yr; GPT ~200 t/yr |
| A4 | Do not baseline significant on-robot physical beneficiation | ~1:1 mass retention. Claude 1.0–1.2:1; Gemini 1:1–1.5:1 | GPT gives no on-robot ratio but states its 25:1 figure is a water-extraction ratio, "not a demonstrated magnetic/electrostatic concentration ratio" |
| A5 | Replace "direct ISPP coupling, no hoppers" with sealed intermediate containment | Sealed transfer canisters, pods or surge buffer. Claude specifies 1–2 t canisters; others give no size | Claude: sealed canisters to a hub within ~100–300 m. Gemini: standardized sealed transfer pods/bins. GPT: "sealed, instrumented surge buffer permitted" |
| A6 | Explicitly define the bom-0-2 / bom-0-6 interface | Boundary to be defined | Claude and GPT identify scope overlap, with both items claiming excavation; GPT proposes excavation goes to robots and heating/capture/electrolysis to ISPP. Gemini states the interface was "omitted" |
| A7 | Assign contamination and authorization responsibility to a named owner, with bom-0-7 involved | Owner to be named | Who sets the numerical standard is contested; see D9 |
| A8 | Fund dust-mitigation hardware explicitly | Hardware list varies by model | All three list enclosed or sealed cutting interfaces and dust monitoring or repelling hardware |

**Changes with two-model support (not unanimous):**

- **Torque figure.**
  - Claude and GPT both find that the stated 50–200 N·m at 10 kW implies roughly 480–1,900 rpm, which is not credible for a bucket wheel.
  - They give different replacement values (see D5).
  - Gemini is silent on this.
- **Excavation subsystem mass of 60–80 kg is too low.**
  - Claude proposes 150–300 kg.
  - GPT proposes 200–800 kg.
  - The overlap is 200–300 kg.
  - Gemini is silent.
- **Counter-rotation does not cancel crowd/thrust forces.**
  - Claude and GPT both make this point.
  - Gemini is silent.
- **Robot NRE should be a separate line.**
  - Claude and GPT support this; Gemini does not address it.
- **Launch and delivery to the asteroid, and tailings retention, are missing from the BOM.**
  - Claude and GPT both flag these.
  - Gemini does not.

---

## 3. Preserved divergences

### D1. Throughput, nameplate rate and duty cycle

| Parameter | Claude | Gemini | GPT |
|---|---|---|---|
| Nameplate rate | **1–3 t/h**, reduced because the rate is anchoring-limited | **2.5 t/h** (2–5), high confidence | **2–5 t/h** "test target", low confidence because no flight demonstration exists |
| Cutting hours / duty cycle | 1,500–2,600 dig-h/yr (17–30% of calendar time), built up from day-only digging and loss factors | 1,000–1,200 h/yr (**~14%**, range 10–20%), derived from mass-balance closure | Reference **25%**, envelope 11–71% for 2–3 robots |
| Output per robot | **1–5 kt/yr** (central ~2.9) | **3 kt/yr** (2.5–4) | Not set per robot. The fleet total implies roughly 7–10 kt/robot/yr |
| Fleet output | **20–60 kt/yr** (central 46) for 20 robots | **60 kt/yr** (50–75) for 20 robots | **15–25 kt/yr** for 2–3 initial robots |

**How each model derives its figures:**

- **Claude** builds its figures bottom-up from rotation-period daylight, operational losses, achieved fraction and fleet availability.
  - Claude itself notes that its central case "matches" the 50 kt/yr station nameplate only conditionally.
  - Claude also says it closes with 20 robots only because the station is sized at 50 kt/yr.
- **Gemini** works top-down: it sizes the fleet to meet station plus ISPP demand.
- **GPT** sizes the fleet to fit the provisional ~1 kt/yr transport capacity under a water-first architecture.

### D2. Downstream architecture and station role

**Claude: co-located C-type site.**
- Mass flow: 41 kt/yr to the ISPP hub, then 2–4 kt/yr water, and 37–39 kt/yr dried residue to a co-located station.
- Transport still needs 3–10 kt/yr even co-located, which is 3–10× the ~1 kt/yr capacity.
- If the station is remote, transport would need 20–55 kt/yr (20–50× the capacity).
- Claude requires bom-0-3 to declare its location and hands the transport shortfall to the P0-F01 owner.

**Gemini: transported feed to the station.**
- Mass flow: 50 kt/yr is transported by bom-0-4 to bom-0-3, and 10 kt/yr goes to ISPP.
- Gemini does not address the ~1 kt/yr transport capacity.
- Gemini's reasoning text cites an ISPP feed need of 2,000–4,000 t/yr, but its proposed change allocates 10,000 t/yr. The response does not reconcile the two.

**GPT: water-first demonstration.**
- Mass flow: 20 kt/yr excavated, about 800 t/yr water captured (5 wt% at 80% recovery), and about 700 t/yr transported to the station.
- This stays within the ~1 kt/yr transport figure, which GPT treats as provisional and unverified.
- GPT says the 50 kt/yr mineral refinery "is not justified" by this flow and proposes deferring full-scale construction.

### D3. Excavation power

| Model | Mechanical power | Electrical power | Reasoning |
|---|---|---|---|
| **Claude** | **2–10 kW** (overstated 3–10×) | 5–15 kW peak | Specific-energy estimates of ~0.1–0.5 kWh/t for loose regolith and 0.5–4 kWh/t for weak boulders. Cites Ryugu boulder tensile strength (Grott et al. 2019) and Bennu TAG (Walsh 2022; Lauretta 2022) |
| **Gemini** | **20 kW peak** (15–30), high confidence | 4 kW continuous (3–6) plus 20 kW pulsed peak | Retains the rq-0-26 mechanical load |
| **GPT** | Retains **20–50 kW** as a *test envelope* | 25–70 kW active | States 20–50 kW "may be excessive for loose regolith yet inadequate for competent inclusions"; only measured loads can resolve this |

### D4. Robot dry mass

| Model | Range | Nominal | Basis | Confidence |
|---|---|---|---|---|
| Claude | 1,500–3,000 kg | ~2,200 kg | Bottom-up subsystem table | medium-low |
| Gemini | 2,400–3,200 kg | 2,800 kg | Sizing | high |
| GPT | 2,500–5,000 kg | 3,500 kg | Provisional allocation; GPT says no bottom-up budget is available | low |

- The ranges overlap only at about **2,500–3,000 kg**.
- Claude argues mass is nearly irrelevant to anchoring, because weight on Bennu is about 0.15 N for a 2,500 kg robot.

### D5. Reaction torque (Claude and GPT only)

- **Claude:** 1–10 kN·m per wheel at 2–10 kW and 1–3 rad/s. Residual net torque is 0.1–1 kN·m. Claude rates the per-wheel figure high confidence.
- **GPT:** 4–50 kN·m, "for illustration," if 20–50 kW reaches the shaft at 1–5 rad/s. GPT states the present numbers cannot support anchoring design.

### D6. Power architecture

| Model | Baseline | Rejected or secondary options |
|---|---|---|
| **Claude** | Own arrays of **20–60 m²**, **20–60 kWh** battery for night-side mobility and safing, **day-only digging**, hub recharge at canister drop-off | Surface tether **rejected** (tangling and snagging risk on boulder fields). Beamed power rejected for Phase 0 |
| **Gemini** | Hybrid: either 15–20 m² arrays (~3–4 kW) charging a 30–50 kWh high-rate buffer for **pulsed 30–45 min** 20 kW bursts, **or** an umbilical tether from a stationary power node | A 150 m² on-robot array is called "mechanically unviable" |
| **GPT** | **Anchored site power plant with cable distribution**. Batteries are for safe shutdown and limited repositioning only. Cutting stops when site power is unavailable | GPT calculates that 8 h of battery excavation would need 200–560 kWh (1.1–4.7 t) |

- The tether question is directly opposed: Claude rejects it, Gemini offers it as an option, and GPT makes it the baseline.
- The models' array specific-power assumptions differ:
  - Claude: 250–300 W/m² at 1 AU.
  - Gemini: about 210 W/m² at 1.2 AU.
  - GPT: 286–347 W/m² at 1 AU.

### D7. Containment metric and limit

| Model | Metric | Limit | Fate of fugitive dust |
|---|---|---|---|
| **Claude** | The mass-containment fraction is "the wrong metric." Escaping mass and deposition flux matter | ≥99.5% on-robot. Fleet escaping mass ≤1–10 t/yr (all sources). Array degradation ≤0.5–1%/yr. No >1 mm particles on escape trajectories toward assets | Most grains leave below escape velocity and fall back. Tip speed ≤1 m/s |
| **Gemini** | Containment fraction | **≥99.95%** (99.90–99.99) | Tip speeds of 0.5–2 m/s "inevitably" exceed escape velocity, so 99% would mean about 600 t/yr ejected to heliocentric and co-orbital space. Tip speed ≤0.2 m/s |
| **GPT** | Uncontrolled site release | **10–100 kg/yr per site** (≈99.9995–99.99995%). ≤1% annual protected-surface performance loss | GPT calls this a "risk allocation, not a demonstrated capability" and says it may prove too strict or unattainable |

- All three give their limits low-to-medium confidence.
- Claude and Gemini disagree on whether escaping dust is the dominant hazard.
- Claude separately argues that **tailings** (up to about 40 kt/yr) are a larger debris source than excavator leakage. GPT also sizes tailings retention, at 15–24 kt/yr and 9,600–19,200 m³/yr. Gemini does not address tailings.

### D8. Excavator, mobility and fleet procurement

**Dual counter-rotating wheels:**
- Claude: counter-rotation is "more necessary than stated."
- GPT: it is a "candidate architecture, not a non-negotiable physical requirement."
- Gemini assumes it.

**Bucket wheels at all:**
- Claude raises the possibility that bucket wheels are wrong for rubble piles. Alternatives it names are bagging, drag-line and pneumatic methods.
- GPT lists opposed drums, coring and enclosed collection as competitors.

**Mobility:**
- Claude: legs plus anchors are favoured but unproven.
- Gemini: hexapod versus anchored winch-and-tether frames is open.
- GPT: an anchored work platform, with the relocation method traded separately.

**Fleet procurement:**
- Claude: 20 robots, or 6–10 for a pilot if bom-0-3 is resized.
- Gemini: 20 robots.
- GPT: **2–3 initial robots**, with 20 as a conditional ceiling after demonstrated productivity.

### D9. Regulatory pathway

- **Claude:**
  - The authorizing state supervises under OST Art. VI, with Art. IX due regard.
  - The operator should be domiciled in a state with a resource-authorization regime (Luxembourg 2017, Japan 2021, UAE 2019).
  - Claude flags a US mission-authorization gap.
  - COSPAR, ITU and IADC/ISO 24113 apply, but the latter two are Earth-orbit-centric.
  - The project should publish its own small-body standard, independently verified.
- **Gemini:** task bom-0-7 with "establishing international microgravity dust emission thresholds and ITU/COSPAR compliance protocols."
- **GPT:**
  - The national authority authorizes and supervises under Art. VI and IX.
  - "There is no universal international body that certifies an asteroid mine or prescribes the above dust limits."

### D10. Cost

| Model | Unit recurring | Programme | NRE treatment |
|---|---|---|---|
| Claude | $35–80M | $1.3–2.5B incl. NRE (low confidence) | Separate line, $400–900M |
| Gemini | $45–65M | Not stated | Not split |
| GPT | $30–60M | $0.9–1.8B, excluding launch and shared infrastructure (low confidence) | Separate line, $300–600M |

GPT adds that the proposed $17M/18-month effort can be early risk reduction but "cannot establish five-year flight readiness."

### D11. Items raised by a single model (not contested, but not endorsed)

- **Excavation heat (Claude).** ΔT is about 5–15 K, so Claude proposes downgrading the rq-0-26 thermal-isolation requirement to a verification item. GPT says recovery temperature "depends on the actual material." Gemini is silent.
- **Design life (Claude and GPT).**
  - Claude notes 20,000 h over 5 yr implies 46% duty, inconsistent with other figures.
  - GPT says calendar life is "not continuous abrasive-service heritage" and wear life should be demonstrated incrementally.
- **Subsurface consolidation (Gemini).** If sintered rock appears at about 0.5 m, wheels may stall without percussive assist.

---

## 4. Proposed BOM delta (for human review; not adopted)

| Action | Item | Supporting model(s) | Quantity | Unit-cost range | Confidence |
|---|---|---|---|---|---|
| Resize | bom-0-2 mining robots | Claude, Gemini, GPT (quantity contested) | Claude 20 (pilot 6–10 if station resized); Gemini 20; GPT 2–3 initial, 20 conditional ceiling | Claude $35–80M; Gemini $45–65M; GPT $30–60M | low (Claude, GPT); not stated (Gemini) |
| Split | Mining robot NRE / qualification as a separate line | Claude, GPT | 1 programme | Claude $400–900M; GPT $300–600M | low |
| Add | Robot launch and delivery to the target body (30–60 t landed, SEP cruise, landing) | Claude (costed); GPT (flagged as missing, uncosted) | 1 campaign | Claude $0.5–1.5B | low (Claude) |
| Add | Mining site services and tailings retention infrastructure | GPT (costed); Claude (tailings bagging/sintering, flagged) | 1 initial site | GPT $100–400M | low |
| Add | Contamination / dust-mitigation development and fleet hardware, plus monitoring | Claude (costed); Gemini (in robot tooling); GPT (in site services) | Fleet | Claude $50–200M | low |
| Add | Site power distribution / charging (cables, umbilical PDUs, charging posts) | Claude (charging); Gemini (1–3 km, 1–5 kV cables or posts); GPT (cable distribution) | Site | Not costed | — |
| Add | Sealed transfer canisters / depots / surge buffers | Gemini (separate item); Claude (part of robot canister bay); GPT (permitted surge buffer) | Fleet | Not costed | — |
| Add | Surface relay / site communications | Claude, GPT | Site | Not costed | — |
| Add | Mission operations and ground segment / mission assurance | Claude, GPT | 1 | Not costed | — |
| Add | Spares and attrition replacement (Claude: 2–6 robots lost over the phase) | Claude; GPT (maintenance infrastructure) | 2–6 robots (Claude) | Not costed | — |
| Add | Instrumented asteroid excavation flight demonstration before fleet commitment | GPT | 1 | Not costed | — |
| Add | Robot safing/hop propellant line | Claude (10–50 kg/robot, ≤1 t over life); GPT says it cannot yet be assigned but is "not zero" | Fleet | Not costed | — |
| Resize / defer | bom-0-3 station | GPT (defer full-scale pending closure; retain $10B placeholder); Claude (declare location); Gemini (retain 50 kt/yr) | — | GPT $10B placeholder unchanged | — |
| Re-scope | bom-0-6 vs bom-0-2 excavation boundary | Claude, GPT | — | — | — |
| Escalate | bom-0-4 transport shortfall to the P0-F01 owner | Claude explicitly; GPT treats ~1 kt/yr as an unverified constraint | — | — | — |

---

## 5. Open questions and what would settle them

| Question | Divergences affected | What would settle it |
|---|---|---|
| What are the actual cutting forces, torque and specific energy in representative asteroid material? | D3, D5, D1 | Instrumented excavation tests in regolith/boulder simulants across the strength range (Claude, GPT), then a flight excavation trial (GPT) |
| What anchoring capacity is achievable on rubble-pile surfaces? Does it cap the dig rate? | D1, D8 | The rq-0-7 anchoring trade (Claude); microspine/anchor tests on weak porous simulants. Claude cites a microspine heritage of 10²–10³ N on competent rock |
| Is the station co-located or remote, and is Phase 0 water-first or minerals-first? | D1, D2 | A bom-0-3 location declaration (Claude); a phase-architecture decision (GPT) |
| What is the real transport capacity? | D2 | Transport payload, trajectory and turnaround analysis (GPT); P0-F01 resolution (Claude) |
| What fraction of fugitive dust escapes, and where does it deposit? | D7 | Fleet contamination / co-orbital dust-dynamics model (Claude, GPT); receiver sensitivity of arrays, radiators and optics (GPT) |
| Can an enclosure meet tightened containment through stalls and maintenance? | D7 | Enclosure leak testing under fault conditions (GPT) |
| Day-only on-robot solar, pulsed buffer, or tethered site power? | D6 | Reliability trade on tether snagging (Claude's concern) versus array and battery mass, informed by target rotation and illumination geometry (GPT) |
| Achievable availability and duty cycle | D1, D11 | Demonstrated operations with 2–3 robots (GPT); wear-rate testing for the five-year objective (GPT) |
| What water yield does the actual target support? | D2 | Prospecting data (bom-0-1). GPT notes spectroscopy alone cannot establish subsurface strength or recovery |
| Which national authority authorizes, and who sets numerical dust limits? | D9 | Operator domicile decision (Claude); bom-0-7 legal analysis |
| Is subsurface material consolidated below ~0.5 m? | D3, D8 | Prospecting or subsurface probing (Gemini) |
| Bottom-up robot mass | D4 | A closed subsystem mass budget once power architecture and anchoring are chosen (all three, implicitly) |

---

## Reviewer note

These are rapporteur observations on the responses. They are not new technical positions.

1. **Model-label mismatches in the YAML blocks.**
   - The Gemini 3.8 Flash response's YAML declares `model: claude-3-7-sonnet`.
   - The GPT-6.1 Sol response's YAML declares `model: GPT-5.2`.
   - The provenance of these blocks should be confirmed before they are ingested.
2. **Unreconciled internal inconsistency in Gemini.** Its reasoning gives ISPP feed demand as 2,000–4,000 t/yr, but its proposed change and interface allocate 10,000 t/yr.
3. **Confidence labelling in Gemini.** Gemini rates fleet output, duty cycle and per-robot output "high" confidence. These values are derived by sizing the fleet to the downstream demand rather than from an independent duty-cycle build-up. Reviewers may wish to weigh this against the low-to-medium ratings Claude and GPT give comparable figures.
4. **Circularity acknowledged by Claude.** Claude's fleet closure matches the station nameplate only because the station is sized at 50 kt/yr. Claude states this itself in its §5.
5. **Transport capacity is unexamined in Gemini.** Neither Gemini's mass flow nor its BOM delta addresses the ~1 kt/yr transport figure. Claude and GPT both treat it as binding or provisional.
6. **No model supplied a closed cost roll-up for the item plus its newly identified missing lines.** These lines are launch, site services, comms, operations and spares. The total programme impact of the proposed delta is therefore unquantified.
