---
phase: phase-0
item: bom-0-2
round: 2
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:14:43.267Z
seconds: 275.746
---

## 1. Findings

**Recommendation:** Treat Phase 0 as a **water-first mining demonstration**, not yet a 50 kt/yr industrial mineral-processing system. Authorize three mining robots initially, with procurement of the remaining 17 conditional on measured excavation, recovery, containment and transport performance.

This is an architecture recommendation, not a conclusion compelled by physics. A minerals-first phase remains possible, but it requires a different transport system or a co-located refinery.

### Assumptions and evidence limits

For the calculations below:

- One selected carbonaceous asteroid; its actual recoverable water content remains to be established.
- Reference location: **1.0–1.5 AU** from the Sun.
- Three installed robots, normally all contributing production.
- Annual excavation: **15–25 kt/yr**, reference **20 kt/yr**.
- Reference recoverable-water calculation: **5 wt% feed water × 80% recovery**.
- The cited **approximately 1 kt/yr transport capacity** is treated as a provisional constraint. The supplied evidence does not contain the vehicle payload, trajectories or turnaround times needed to verify it.
- The station’s **50 kt/yr** rating comes from the finding; its process definition and location are not supplied.
- All proposed production rates, service lives and costs are engineering allocations, not demonstrated asteroid-mining performance.

### P0-F02 — Mining rate, robot target and station throughput disagree

**Verdict: partly agree.** The phase does not close, but the hourly and annual robot figures are not inherently contradictory.

An annual target requires an explicit productive duty factor:

\[
M_{\rm annual}=Nq(8{,}760\ {\rm h/yr})D
\]

For the original 1,000 t/robot/yr:

\[
D=\frac{1{,}000\ {\rm t/yr}}
{(2\text{–}5\ {\rm t/h})(8{,}760\ {\rm h/yr})}
=2.3\text{–}5.7\%
\]

Thus, the “17–44× disagreement” is the difference between calendar-continuous nameplate production and a low-duty annual target. It is not proof that either rate is physically impossible.

The substantive failure is that **duty cycle, material yield, transport mass and station feed are not connected**.

#### Proposed reference mass-flow chain

Use minimal physical beneficiation on the robot. Recover water at the surface processing hub; do not ship bulk regolith merely to reconcile the station rating.

| Stage | Reference flow | Interpretation |
|---|---:|---|
| Excavated | 20,000 t/yr | Raw feed |
| Screened/“concentrated” feed delivered locally | Approximately 20,000 t/yr | Approximately 1:1 mass retention; screening is not demonstrated beneficiation |
| Water captured at ISPP | 800 t/yr | \(20{,}000\times0.05\times0.80\) |
| Residual solids and unrecovered water retained locally | 19,200 t/yr | Must be contained; not dumped |
| Captured water retained for local use/testing | 100 t/yr | Planning allocation |
| Water transported off-site | 700 t/yr | Within the provisional 1,000 t/yr transport ceiling |
| Station feed | 700 t/yr water | Not 50,000 t/yr mineral feed |
| Saleable/useful product after conditioning | Approximately 665–700 t/yr | Assumed 95–100% conditioning yield; rejects remain accounted for |

The balance is:

\[
20{,}000=19{,}200+100+700\quad {\rm t/yr}
\]

A **correlated operating envelope**, rather than independently selectable extremes, is:

- Excavation: **15–25 kt/yr**.
- Captured water: **0.6–1.0 kt/yr**, requiring captured-water fractions of roughly **2.4–6.7%**, depending on the selected excavation rate.
- Local water use: **0.05–0.15 kt/yr**.
- Off-site water: **0.45–0.95 kt/yr**.
- Retained residual material: **14.0–24.4 kt/yr**.
- Conditioned product: approximately **0.43–0.95 kt/yr**.

The export envelope is deliberately transport-limited. If prospecting shows insufficient yield, production falls; if yield is higher, retain inventory or expand transport rather than silently exceeding its capacity.

For three robots at a reference achieved rate of 3 t/h:

\[
D=\frac{20{,}000}{3(3)(8{,}760)}\approx25\%
\]

Across 15–25 kt/yr and 2–5 t/h, the productive calendar duty factor is **11–48%**. With only two robots productive, it becomes **17–71%**, showing that loss of one robot can eliminate operating margin.

**Proposed change:** Replace the conflicting output statements with this conditional mass-flow architecture. Defer or resize the 50 kt/yr mineral station. If the phase retains that station, require either:

1. A co-located surface refinery and defined local material-handling system; or
2. Demonstrated transport capacity for tens of kilotonnes per year.

A 50 kt/yr remote mineral refinery is not supported by this water-first flow.

---

### P0-F07 — Robot mass and power are internally inconsistent

**Verdict: partly agree.** The 500 kg reference is erroneous, but a 2.5–3.5 t robot with 20–50 kW excavation power is not intrinsically impossible. Its power and reaction-load architecture are simply unclosed.

#### Power source

Adopt a **fixed, anchored site power node with managed cable distribution**. Robots excavate while docked or tethered within a bounded work area. They do not walk continuously while dragging high-power cables through unrestricted terrain.

Using an assumed drive efficiency of 80–90% and auxiliary loads:

\[
P_{\rm electrical}\approx
\frac{20\text{–}50\ {\rm kW}}{0.8\text{–}0.9}
+2\text{–}7\ {\rm kW}
\approx25\text{–}70\ {\rm kW}
\]

This remains a **test envelope**, not an established requirement.

With delivered array output estimated at 200–300 W/m² at 1 AU:

\[
A=\frac{25{,}000\text{–}70{,}000\ {\rm W}}
{200\text{–}300\ {\rm W/m^2}}
\approx80\text{–}350\ {\rm m^2}
\]

At 1.5 AU, area increases approximately by \(1.5^2=2.25\), before additional pointing and shading penalties. The finding’s 150–400 m² is therefore plausible under some assumptions, but is not a universal area requirement.

Eight hours of battery-powered excavation would require:

\[
E=(25\text{–}70\ {\rm kW})(8\ {\rm h})
=200\text{–}560\ {\rm kWh}
\]

At an assumed **120–180 Wh/kg usable pack-level energy density**, battery mass alone is approximately **1.1–4.7 t**. Do not baseline night-side excavation from robot batteries. Allocate **10–30 kWh usable** for safe shutdown, communications and limited repositioning; verify duration against measured standby loads.

#### The more serious error: torque

\[
P=T\omega
\]

At 10 kW, the original 50–200 N·m implies:

\[
\omega=50\text{–}200\ {\rm rad/s}
\approx480\text{–}1{,}900\ {\rm rpm}
\]

That is not a credible unqualified bucket-wheel design basis.

For illustration, if **total power across both wheels** is 20–50 kW, divided approximately equally, with shaft speed 1–5 rad/s:

\[
T_{\rm wheel}\approx
\frac{10\text{–}25\ {\rm kW}}{1\text{–}5\ {\rm rad/s}}
=2\text{–}25\ {\rm kN\,m}
\]

The result depends strongly on wheel speed and power split. Neither this illustration nor the original number is sufficient for anchor design.

Counter-rotation can reduce matched reaction moments. It does **not** automatically cancel:

- Cutting thrust and crowd force;
- Unequal wheel loads;
- Jam transients;
- Conveyor reactions;
- Loads introduced by differing wheel geometry.

I disagree with treating dual wheels as a non-negotiable physical requirement. **Reaction management is mandatory; one particular mechanism is not.**

**Proposed change:** Remove the 500 kg reference; use a provisional **3–5 t landed dry-mass allocation**, excluding detached site arrays, shared plant and bulk feed. Retain dual wheels as a candidate. Replace torque claims with a measured six-axis load-envelope requirement.

---

### P0-F14 — Debris, contamination and regulatory compliance are unbudgeted

**Verdict: agree.** The specification acknowledges the hazard but does not provide a defensible release budget, qualification method or authorization owner.

At the reference annual excavation:

\[
M_{\rm release}=20{,}000\ {\rm t/yr}(1-0.99)
=200\ {\rm t/yr}
\]

Even 99.95% containment releases:

\[
20{,}000(0.0005)=10\ {\rm t/yr}
\]

Neither value establishes acceptable contamination risk.

Adopt an initial **10–100 kg/yr site-wide uncontrolled-release allocation**, covering excavation, transfer, processing, maintenance and tailings. At 20 kt/yr, the equivalent aggregate containment is:

\[
1-\frac{10\text{–}100\ {\rm kg}}
{20{,}000{,}000\ {\rm kg}}
=99.9995\text{–}99.99995\%
\]

This is a **provisional risk allocation**, not a published legal limit or demonstrated capability. It may prove impractical and must be revised using particle trajectories, receiver sensitivity and consequences.

Additional provisional acceptance conditions:

- No intentional uncontained tailings disposal.
- No planned ballistic discharge intersecting protected assets.
- Mining-attributable performance loss on protected arrays, radiators and optics: **≤1%/yr**, subject to receiver-specific requirements.
- Automatic stop/isolation on detected enclosure failure or abnormal particle release.
- Separate accounting for particle size, velocity, composition and destination—not merely mass containment.

**Hardware:** enclosed excavation interfaces, secondary catch enclosures, sealed surge vessels and canisters, isolation valves, restrained tailings storage, protected connectors, witness surfaces and particle monitoring. Electrostatic cleaning is supplementary; it is not a substitute for containment.

**Responsibility:** a named project safety/contamination authority owns the technical assurance case; independent reviewers verify it. The applicable national authority authorizes and supervises operations under the Outer Space Treaty framework. There is no universal international asteroid-mine certification body.

---

## 2. Revised specification

| Parameter | Old → proposed value | Basis | Confidence |
|---|---|---|---|
| Initial fleet | 20 committed → **3 initial robots; 20 conditional ceiling** | Judgement: preserve learning and avoid premature replication | Medium |
| Annual excavation | ≥1 kt/robot/yr; undefined fleet operation → **15–25 kt/yr initial fleet**, reference 20 | Conditional mass-flow calculation | Low for achievement; high for arithmetic |
| Achieved excavation rate | 2–5 t/h “validated” → **2–5 t/h test objective** | No industrial asteroid-excavation flight heritage | Low |
| Productive duty factor | Unspecified → **11–48%**, reference 25%, three productive robots | Calculation | High, conditional on rate |
| Physical concentration ratio | Unspecified → **approximately 1:1 baseline** | Judgement; no credited beneficiation gain | Medium |
| Reference captured-water fraction | Unspecified → **4% of raw feed**; prospecting-dependent envelope | 5 wt% water × 80% recovery assumption | Low |
| Robot dry mass | 2.5–3.5 t; inconsistent 0.5 t reference → **3–5 t allocation** | Judgement; bottom-up mass budget still required | Low |
| Mechanical excavation power | 20–50 kW established → **20–50 kW total test envelope** | Retained for test-system sizing, not demonstrated necessity | Low |
| Electrical power while cutting | Unspecified → **25–70 kW/robot** | Efficiency and auxiliary-load calculation | Medium |
| Main power architecture | Robot solar plus night batteries → **site power, managed cable/docking** | Architecture judgement | Medium |
| Robot battery | Unspecified → **10–30 kWh usable; safing/repositioning only** | Allocation pending measured loads | Low |
| Excavator mass | 60–80 kg → **200–800 kg provisional allocation** | Judgement; enclosure, gearing and loads are not sized | Low |
| Torque cancellation | Guaranteed 90–95% → **measured load envelope; cancellation credited only when demonstrated** | Mechanics | High |
| Wheel geometry/control | Fixed asymmetric sizing and ~100 Hz → **trade variables** | No supplied validation of robustness benefit | High that validation is absent |
| Transfer | No hoppers → **sealed instrumented surge storage permitted** | Decouples intermittent excavation from processing | Medium |
| Calendar life | ≥5 years → **5-year objective** | No abrasive-service flight heritage | Low |
| Cutting-life requirement | ≥20,000 h → **roughly 5,000–21,000 h over five years**, reference ~11,000 h | Duty calculation; qualification must cover selected mission | Medium |
| Debris release | >99% containment → **10–100 kg/yr site-wide provisional uncontrolled release budget** | Risk allocation | Low |
| Station | 50 kt/yr mineral station → **defer industrial build; define 0.45–0.95 kt/yr water-conditioning service** | Phase mass-flow closure | Medium |

### What published evidence supports—and does not support

- **Lauretta et al., Science (2022), “Spacecraft sample collection and subsurface excavation of asteroid (101955) Bennu.”** Supports highly disturbed, weak near-surface material at the sampling location; does not establish industrial cutting energy or deep anchor capacity.
- **Walsh et al., Science Advances (2022), “Near-zero cohesion and loose packing of Bennu’s near subsurface revealed by spacecraft contact.”** Supports weak, loosely packed near-surface material; does not establish conditions across all candidate asteroids.
- **Grott et al., Nature Astronomy (2019), “Low thermal conductivity boulder with high porosity identified on C-type asteroid (162173) Ryugu.”** Supports porous, thermally insulating material. It is not a direct industrial excavation-strength measurement.
- **NASA RASSOR ground-development work** demonstrates the engineering rationale for opposed excavation mechanisms in reduced-gravity applications. It is not flight validation of this asteroid excavator.
- Hayabusa2, OSIRIS-REx and Philae provide valuable small-body contact heritage. None demonstrates tonne-per-hour excavation, five-year abrasive operation or reliable industrial anchoring.

I therefore do **not** endorse Round 1’s “high confidence” excavation power, production or robot-mass estimates.

---

## 3. Interfaces

| Other item | Exchange and proposed values | Closure issue |
|---|---|---|
| **bom-0-1 Prospecting satellites** | Composition, thermal environment, shape/rotation and hazard maps; preliminary robot planning allocation **1–10 GB/day per active robot** for returned engineering/science data | Remote spectroscopy does not replace subsurface probing, anchor testing or volatile-recovery tests |
| **bom-0-3 Processing station** | **0.45–0.95 kt/yr water feed**, reference 0.70; useful conditioned product approximately **0.43–0.95 kt/yr** | Requires a water-conditioning role; incompatible with justifying 50 kt/yr mineral throughput |
| **bom-0-4 Transport vehicles** | **0.45–0.95 kt/yr sealed water cargo** | Provisional 1 kt/yr capacity must be verified; cargo containers and docking interfaces need scope |
| **bom-0-5 Solar arrays** | Excavation electrical demand **0.075–0.210 MW** with all three robots cutting; reserve **0.1–0.3 MW** delivered for robots and local services | Generation capacity is not delivered surface power; transmission, storage, illumination and distance need closure |
| **bom-0-6 ISPP** | **15–25 kt/yr raw local feed**; **0.6–1.0 kt/yr captured water** | Robots own excavation; ISPP owns heating, capture and optional electrolysis |
| **bom-0-7 Organization** | Authorization dossier, hazard inventory, operating limits, incident reporting and independent assurance | Legal/safety staffing and continuing supervision are not adequately scoped |

### Processing energy matters more than excavation power

For an assumed full-process heat input of **0.2–0.6 kWh/kg of feed**:

\[
E_{\rm heat}=20\times10^6\ {\rm kg/yr}
(0.2\text{–}0.6\ {\rm kWh/kg})
=4\text{–}12\ {\rm GWh/yr}
\]

\[
P_{\rm heat,annual}=0.46\text{–}1.37\ {\rm MW}
\]

This is only a planning envelope. Heating mineral feed by approximately 1,000 K with \(c_p=0.7\text{–}1.0\ {\rm kJ/(kg\,K)}\) already requires approximately **0.19–0.28 kWh/kg** of sensible heat before heat recovery, reaction energies and losses.

The BOM’s fixed **1,000°C** requirement should not be retained without mineral-specific extraction tests. Free ice and hydrated minerals require different processes.

Electrolyzing all 800 t/yr of reference captured water would add approximately **4–5 GWh/yr** at an assumed 5–6 kWh/kg-water system input. The proposed baseline instead exports water; electrolysis is limited to demonstrations and actual local demand.

Thus, **roughly 0.5–2 MW annual-average site demand** is a preliminary water-first planning envelope, excluding full-stream electrolysis and industrial mineral refining. Peak plant demand depends on operating schedules and storage.

### Propellant

Mining has no established continuous attitude-control propellant requirement. Do not use thrusters to absorb routine excavation loads.

- Robot repositioning/safing propellant: **provisional 0.01–0.10 t/yr fleet allocation**, low confidence.
- ISPP local water allocation: **0.05–0.15 kt/yr**, but this is not all credited as propulsion consumption.
- Transport propulsion demand: **unclosed**; requires payload, trajectory, propulsion performance and turnaround calculations.

---

## 4. Missing items or scope

1. **Anchored site structure and reaction-load path.** Anchors must be qualified on the actual substrate; robot weight is not the relevant restraint.
2. **Power distribution and protection.** Managed reels, docking points, switchgear, grounding/charging control and fault isolation.
3. **Sealed local logistics.** Surge vessels, feed conveyance, cargo containers and servicing tools.
4. **Tailings containment.** At the reference residual flow and assumed bulk density of 0.8–1.5 t/m³:

   \[
   V=\frac{19{,}200\ {\rm t/yr}}{0.8\text{–}1.5\ {\rm t/m^3}}
   \approx13{,}000\text{–}24{,}000\ {\rm m^3/yr}
   \]

   This is major infrastructure, not a dust-control accessory.

5. **Flight excavation demonstration**, including instrumented anchoring and transfer.
6. **Surface communications and navigation.** No supplied design demonstrates visibility, relay availability or safe autonomous operation.
7. **Maintenance and replacements.** Wear cartridges, seal replacement, inspection and failed-robot recovery.
8. **Launch, cruise and landing.** Three 3–5 t robots alone imply **9–15 t landed dry mass**, before shared services and delivery hardware.
9. **Mission operations, assurance and regulatory work.**

### Preliminary cost roll-up

These are **2026-dollar engineering estimates**, not supplier quotations. Avoid double-counting dust hardware or demonstrations in several lines.

| Initial three-robot campaign | Estimate |
|---|---:|
| Three recurring flight robots, $30–80M each | $90–240M |
| NRE, qualification and instrumented demonstration development | $400–900M |
| Site services, containment, distribution, local logistics and spares | $100–400M |
| Five-year operations, assurance and ground segment | $100–250M |
| Launch, cruise and landing campaign | $200–700M |
| **Mining campaign subtotal** | **$0.9–2.5B** |

This excludes the shared ISPP plant, main solar generation, transport fleet, prospectors and processing station. It is therefore **not a phase total**.

The original $1B mining line is inadequate as an all-in campaign allowance. The original phase BOM totals about **$15.7B**; much of that is committed to an industrial station whose feed is unclosed. The phase should rebaseline architecture before reallocating those funds.

The $17M/18-month research program can be retained **inside NRE as early risk reduction**. It cannot establish five-year flight readiness.

---

## 5. Remaining disagreements and open questions

- **Water-first versus minerals-first:** A genuine strategic choice. Water-first reduces transported mass and near-term process scope but defers the mineral-production capability ultimately needed for a swarm.
- **Tethered versus independent power:** A trade-off between smaller robots and cable-related operational constraints. Tethers are not inherently unacceptable; unrestricted tethered walking is a poor baseline.
- **Dual wheels versus alternatives:** Opposed drums, enclosed coring, restrained collection and other approaches remain credible competitors. Selection requires measured system loads, not model unanimity.
- **Mechanical power:** Round 1’s lower 2–10 kW estimate may be appropriate for some loose material. Surface-contact heritage does not substantiate its specific-energy ranges, and competent inclusions may demand substantially more.
- **Mass:** The proposed 3–5 t range is a reserve allocation, not evidence that lighter robots cannot work.
- **Dust fate:** Neither “most grains fall back” nor “tip-speed particles inevitably escape” is supported without particle-release distributions and target dynamics. Escape from the asteroid does not necessarily mean permanent disappearance from the operating environment.
- **Thermal effects:** Round 1’s blanket 5–15 K rise is not defensible over the full power/rate envelope. For example:

  \[
  \frac{20\text{–}50\ {\rm kW}}{2\text{–}5\ {\rm t/h}}
  =4\text{–}25\ {\rm kWh/t}
  \]

  If all that energy entered the feed, with \(c_p=0.7\text{–}1.0\ {\rm kJ/(kg\,K)}\), the bulk rise would be roughly **14–130 K**. Actual partitioning and local hot spots require measurement.

- **Regulation:** COSPAR planetary-protection guidance, ITU spectrum rules and Earth-orbit debris standards address different obligations. They are not interchangeable asteroid dust certificates. No claim about the current national authorization pathway should be made without jurisdiction-specific legal review.
- **Autonomy:** Months without continuous ground control is a reasonable objective; months without any ground intervention should not be a procurement guarantee before fault-recovery demonstrations.

---

## 6. Decision-quality critique

The most consequential Round 1 weakness is that **several alternative architectures were presented as competing parameter estimates**. A water-first demonstration, a remote mineral refinery and a co-located industrial site are different phase decisions.

For the following assessments, **closure, safe restraint and lawful operation are binary musts**, not attributes that can be outweighed by lower cost. Among feasible options, proposed deliberation weights are:

- Mission learning and useful output: **30%**
- Lifecycle cost and schedule exposure: **30%**
- Reliability and maintainability: **25%**
- Expansion flexibility: **15%**

These weights are proposed stakeholder values, not technical facts. They should be approved before numerical scoring.

### Decision A — Phase architecture and fleet commitment

1. **Frame/type:** Largely irreversible existence/executive decision: commit an industrial fleet and station, or purchase information first.
2. **Criteria/weights:** Apply the musts and weights above; require a closed feed-to-product chain.
3. **Options:** Null/defer; water-first pilot; remote mineral processing; co-located mineral processing.
4. **Assessment matrix — QOC:**

   | Option | Current transport closure | Learning | Capital exposure | Mineral capability |
   |---|---|---|---|---|
   | Defer entirely | Pass | Low | Low | None |
   | Water-first pilot | Conditional pass | High | Moderate | Deferred |
   | Remote minerals | Fail on supplied capacity | High | High | Potentially high |
   | Co-located minerals | Local logistics unresolved | High | High | Potentially high |

5. **Sensitivity/trade-off:** Water yield is a sensitivity point. Learning versus early mineral output is a **values trade-off**.
6. **Evidence certainty:** It is very likely that tens of kilotonnes of remote mineral feed exceed a 1 kt/yr transport system, **high confidence conditional on that capacity**. Successful water-first productivity is plausible but not assigned a reliable probability, **low confidence**.
7. **Assumption/falsifier:** The target supports approximately 4% captured-water yield. Falsify with representative-depth samples and closed recovery tests.
8. **Decision/warrant/downside:** Choose three robots first because their results can change the industrial architecture; accept delayed mineral output.
9. **Consequences:** Defer the full station, define water conditioning and make 17 additional robots conditional.

**Weakest Decision Quality link:** **Frame**—Round 1 never establishes which mission it is sizing.  
**Additional method:** GRADE EtD separates weak productivity evidence from the strong argument for reducing irreversible expenditure.

### Decision B — Excavator, anchoring and power architecture

1. **Frame/type:** Property decision, reversible before tooling but expensive afterward.
2. **Criteria/weights:** Reaction-force safety is a must; then reliability 40%, mass/power 30%, production 20%, relocation flexibility 10%.
3. **Options:** Managed site-powered excavator; independent solar robot; buffered intermittent robot; alternative enclosed collectors; no excavation until contact tests.
4. **Assessment matrix — QOC:**

   | Option | Power closure | Mobility freedom | Added infrastructure | Current validation |
   |---|---|---|---|---|
   | Site power | Most direct | Restricted | Cables/docks | Low |
   | Own full arrays | Conditional | Greater | Large deployables | Low |
   | Small array + buffer | Low average throughput unless recharge closes | Greater | Batteries/charging | Low |
   | Alternative collector | Mechanism-dependent | Mechanism-dependent | Unknown | Low |

5. **Sensitivity/trade-off:** Wheel speed strongly affects torque. Tethering improves power/mass closure while reducing mobility: a genuine trade-off.
6. **Evidence certainty:** Counter-rotation alone is very likely insufficient to establish safe anchoring, **high confidence**. Managed site power is preferred, **medium confidence**, without a defensible reliability probability.
7. **Assumption/falsifier:** Bounded work areas permit safe cable management. Falsify using representative terrain operations, jam recovery and relocation trials.
8. **Decision/warrant/downside:** Use site power as the reference, retain alternative collectors, and accept constrained excavation locations.
9. **Consequences:** Site geometry, cable reels, anchor loads and emergency isolation become explicit requirements.

**Weakest link:** **Information**—missing six-axis loads, substrate strength and power histories.  
**Additional method:** ACH should test “dual wheels are sufficient,” “anchoring dominates” and “another collection mechanism is superior.” Current contact evidence does not discriminate adequately among them.

### Decision C — Release limit and containment architecture

1. **Frame/type:** Safety property and operating-policy decision; tightening late can force redesign.
2. **Criteria/weights:** Avoid unacceptable asset/public risk as a must; then operational feasibility 40%, lifecycle burden 35%, productivity 25%.
3. **Options:** Percentage-only containment; absolute site release allocation; receiver-risk limits; no operation until demonstrated containment.
4. **Assessment matrix — QOC:**

   | Option | Scales with production | Captures tailings/maintenance | Links to consequence |
   |---|---|---|---|
   | Percentage alone | Poorly | Often not | No |
   | Absolute release allocation | Yes | Yes, if site-wide | Partly |
   | Receiver-risk limits | Yes | Yes | Best, but model-intensive |
   | No operation | Eliminates operating releases | Yes | Maximum restriction |

5. **Sensitivity/trade-off:** Grain-size and velocity distributions are sensitivity points. Tighter containment versus maintainability/productivity is a trade-off, subject to safety musts.
6. **Evidence certainty:** One-percent leakage produces a large mass release, **virtually certain, high confidence**. Its actual damage probability and the feasibility of 10–100 kg/yr are unresolved, **low confidence**.
7. **Assumption/falsifier:** An enclosure and tailings system can meet the allocation through faults and servicing. Falsify with measured full-cycle release tests and receiver exposure modelling.
8. **Decision/warrant/downside:** Adopt a provisional absolute budget plus receiver limits; accept added enclosure mass and possible production pauses.
9. **Consequences:** Include all handling stages, independent verification and operational stop rules.

**Weakest link:** **Values/information**—Round 1 supplies numbers without an accepted consequence threshold or validated transport model.  
**Additional method:** GRADE EtD prevents a speculative numerical allocation from being mistaken for an established regulatory standard.

### Decision D — Qualification gates and expenditure commitment

1. **Frame/type:** Executive stage-gate decision; spending commitments become progressively less reversible.
2. **Criteria/weights:** Safe test evidence and representative scaling are musts; learning per dollar 40%, schedule 30%, industrial relevance 30%.
3. **Options:** Original 18-month program as qualification; ground/reduced-gravity risk reduction only; flight demonstration before replication; immediate fleet manufacture.
4. **Assessment matrix:**

   | Option | Early learning | Long-duration validity | Flight-environment validity | Commitment risk |
   |---|---|---|---|---|
   | Original program as full qualification | Moderate | Poor | Poor | High |
   | Ground/reduced-gravity program | High | Partial | Partial | Lower |
   | Instrumented flight demonstration | High | Partial | High | Moderate |
   | Immediate replication | Low before commitment | Unproven | Unproven | Highest |

5. **Sensitivity/trade-off:** Test duration and representative failure coverage affect assurance. Faster deployment versus evidence maturity is a values trade-off.
6. **Evidence certainty:** An 18-month prototype program is very unlikely to demonstrate five-year abrasive life, **high confidence**.
7. **Assumption/falsifier:** Prototype results scale to flight hardware. Falsify with divergent full-scale loads, release rates or wear mechanisms. Parabolic flights alone cannot establish this.
8. **Decision/warrant/downside:** Fund early research, then a flight demonstration before fleet replication; accept schedule delay.
9. **Consequences:** Replace torque-percentage gates with system gates:
   - Loads below demonstrated restraint limits, including jams;
   - Sustained achieved throughput and measured energy;
   - Full-cycle release and containment;
   - Wear and service intervals;
   - Autonomous fault recovery;
   - Closed transfer and processing operations.

**Weakest link:** **Reasoning/commitment**—simulation agreement is treated as validation, and no binding owner controls fleet release.  
**Additional method:** An assurance case is needed to trace each gate to a hazard or mission requirement.

### Disposition of the remaining Round 1 proposals

| Proposal | Disposition and weakest link |
|---|---|
| Separate NRE from recurring cost | **Adopt.** Weakest link: information; estimates lack work breakdown and quotations |
| Add delivery, operations, relay, spares and site services | **Adopt explicit scope.** Whether separate BOM lines or cost-account elements is bookkeeping, not physics |
| Fixed 1–2 t canisters | **Do not freeze.** Capacity depends on excavation bursts, hub cadence and handling loads |
| Fixed 2–6 lost robots | **Do not accept as a forecast.** No reliability model; provision replacements through explicit scenarios |
| Fixed subsurface transition at 0.5 m | **Reject as a general design fact.** Requires target-specific probing |
| Lower excavation power based on surface heritage | **Retain as a hypothesis.** Measure specific energy across representative materials |
| 99.5% containment as sufficient | **Reject sufficiency claim.** It would permit 100 t/yr release at the reference flow |
| bom-0-7 “establishes international thresholds” | **Reject that authority claim.** It develops project limits and obtains applicable authorization |
| No intermediate hoppers | **Replace with sealed surge storage.** Reliability versus containment is a design trade-off |
| Five years and 20,000 h as demonstrated capability | **Reject wording.** Retain objectives tied to an actual duty and maintenance plan |

```yaml
item: bom-0-2
model: ChatGPT
findings:
  - id: P0-F02
    verdict: partly
    summary: Hourly and annual rates can coexist at low duty cycle, but the phase lacks a closed mass-flow and transport architecture.
    proposed_change: Adopt a conditional three-robot water-first pilot with 15-25 kt/yr excavation and defer the 50 kt/yr mineral station pending architecture closure.
  - id: P0-F07
    verdict: partly
    summary: The 500 kg reference and torque rationale are wrong, while the stated power is possible only with an explicit power and restraint architecture.
    proposed_change: Use a 3-5 t provisional robot allocation, managed site power, and measured six-axis excavation loads rather than guaranteed torque cancellation.
  - id: P0-F14
    verdict: agree
    summary: Debris containment, tailings retention, verification and authorization responsibility are not adequately scoped or budgeted.
    proposed_change: Allocate 10-100 kg/yr provisional site-wide uncontrolled release, add containment infrastructure, and assign technical assurance and national authorization owners.
revised_spec:
  - parameter: Initial robot fleet
    old: 20 committed robots
    new: 3 initial robots with 20 as a conditional fleet ceiling
    range: [3, 20]
    unit: robots
    basis: judgement
    confidence: medium
  - parameter: Initial fleet annual excavation
    old: At least 1000 t per robot per year with unspecified duty
    new: 20000 reference annual excavation
    range: [15000, 25000]
    unit: t/yr
    basis: judgement
    confidence: low
  - parameter: Achieved excavation rate objective
    old: 2-5 t/h treated as validated
    new: 2-5 t/h test objective
    range: [2, 5]
    unit: t/h per robot
    basis: judgement
    confidence: low
  - parameter: Productive calendar duty factor
    old: unspecified
    new: 25 percent reference for three productive robots
    range: [11, 48]
    unit: percent
    basis: calculation
    confidence: high
  - parameter: Physical beneficiation ratio
    old: unspecified
    new: Approximately 1 to 1 with no credited beneficiation gain
    range: [1, 1]
    unit: raw-feed to retained-feed mass ratio
    basis: judgement
    confidence: medium
  - parameter: Robot landed dry mass
    old: 2500-3500 kg with inconsistent 500 kg reference
    new: Provisional allocation excluding detached site infrastructure
    range: [3000, 5000]
    unit: kg
    basis: judgement
    confidence: low
  - parameter: Active electrical excavation power
    old: unspecified
    new: Site-supplied power while cutting
    range: [25, 70]
    unit: kW per robot
    basis: calculation
    confidence: medium
  - parameter: Mechanical excavation power
    old: 20-50 kW validated requirement
    new: Total two-wheel test envelope rather than established necessity
    range: [20, 50]
    unit: kW per robot
    basis: judgement
    confidence: low
  - parameter: Usable robot battery
    old: unspecified
    new: Safing and limited repositioning only
    range: [10, 30]
    unit: kWh
    basis: judgement
    confidence: low
  - parameter: Excavation subsystem mass
    old: 60-80 kg
    new: Provisional allocation pending load and enclosure sizing
    range: [200, 800]
    unit: kg
    basis: judgement
    confidence: low
  - parameter: Site uncontrolled particle release
    old: Greater than 99 percent containment
    new: Provisional annual allocation covering all material handling
    range: [10, 100]
    unit: kg/yr
    basis: judgement
    confidence: low
  - parameter: Off-site water shipment
    old: unspecified
    new: 700 reference shipment with correlated yield and transport constraints
    range: [450, 950]
    unit: t/yr
    basis: calculation
    confidence: low
interfaces:
  - with: bom-0-1
    flow: data
    value: 1-10 GB/day per active robot planning allocation plus target characterization
    in_bom: true
  - with: bom-0-3
    flow: mass
    value: 450-950 t/yr water feed
    in_bom: true
  - with: bom-0-4
    flow: mass
    value: 450-950 t/yr sealed water cargo
    in_bom: true
  - with: bom-0-5
    flow: power
    value: 0.1-0.3 MW delivered robot and local-service reserve
    in_bom: true
  - with: bom-0-5
    flow: other
    value: Managed cables, docking power and fault protection for one site
    in_bom: false
  - with: bom-0-6
    flow: mass
    value: 15000-25000 t/yr raw feed delivered locally
    in_bom: true
  - with: bom-0-6
    flow: propellant
    value: 0.01-0.10 t/yr provisional robot safing and repositioning allocation
    in_bom: false
  - with: bom-0-7
    flow: data
    value: One site assurance case and continuing authorization record
    in_bom: true
bom_delta:
  - action: resize
    item: bom-0-2
    quantity: 3 initial robots
    unit_cost_usd: [30000000, 80000000]
    rationale: Purchase flight learning before committing to the remaining seventeen robots.
  - action: split
    item: Mining robot NRE and qualification
    quantity: 1 programme
    unit_cost_usd: [400000000, 900000000]
    rationale: Separate development and demonstration from recurring hardware and include early dust research within this scope.
  - action: add
    item: Mining site services and containment
    quantity: 1 site
    unit_cost_usd: [100000000, 400000000]
    rationale: Include anchors, power distribution, sealed logistics, tailings retention, local communications and spares without duplicating shared generation or ISPP.
  - action: add
    item: Mining mission operations and assurance
    quantity: 1 five-year campaign
    unit_cost_usd: [100000000, 250000000]
    rationale: Fund ground operations, independent assurance and continuing regulatory support.
  - action: add
    item: Mining launch cruise and landing
    quantity: 1 campaign
    unit_cost_usd: [200000000, 700000000]
    rationale: Delivery of robots and mining site services is not included in recurring robot cost.
  - action: resize
    item: bom-0-3
    quantity: 0 industrial stations authorized before phase architecture closure
    unit_cost_usd: [10000000000, 10000000000]
    rationale: Retain the original cost placeholder but defer industrial commitment until station feed, location and transport are closed.
  - action: keep
    item: bom-0-6
    quantity: 4 units pending plant sizing
    unit_cost_usd: [500000000, 500000000]
    rationale: Assign heating and water capture to ISPP and remove duplicate excavation scope before revising plant quantity.
open_questions:
  - Does the selected asteroid support the assumed captured-water yield at representative excavation depth?
  - Is the provisional 1000 t/yr transport capacity supported by payload trajectory and turnaround calculations?
  - Is Phase 0 water-first or minerals-first, and where is the processing station located?
  - What six-axis cutting and jam loads can the actual substrate and anchoring system sustain?
  - Which excavation architecture minimizes total restraint containment energy and maintenance burden?
  - Can managed cable operations meet reliability requirements on representative terrain?
  - Can the full site meet the provisional release allocation through servicing and fault recovery?
  - What heating process and recovery temperature are appropriate for the target mineralogy?
  - What wear life and maintenance cadence can be demonstrated before fleet replication?
  - Which national authority will authorize and supervise the operation?
```
