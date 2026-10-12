---
phase: phase-0
item: bom-0-3
round: 2
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:21:36.417Z
seconds: 293.691
---

# Re-assessment: bom-0-3 Material Processing Station

**Recommendation:** replace the committed 50,000 t/year refinery with a **gated, uncrewed demonstrator rated for about 300 t/year of delivered concentrate**, with a planning range of **200–450 t/year** under the stated transport architecture. Retain 50,000 t/year only as an **unfunded industrial expansion objective**.

This is not an endorsement of building a $10B station to produce a few hundred tonnes annually. The investment must pass a demand-and-economics gate before production hardware is authorized.

**Evidence convention:** calculations below are reproducible engineering estimates. Published terrestrial process data and flight heritage establish useful bounds, but neither demonstrates an autonomous asteroid refinery. Unavailable deliberations are not treated as evidence. Costs are rough-order-of-magnitude allowances, not supplier quotations.

## 1. Findings

### P0-F01 — Transport capacity versus processing throughput

**Verdict: partly agree.** The blocking mismatch is real. The finding's constant-loaded-mass calculation overstates propulsion time, while its photovoltaic power estimate is optimistic.

#### Array power

At 1 AU, using solar irradiance \(S=1,361\ \mathrm{W/m^2}\), cell efficiency \(\eta_{\rm cell}=30\%\), and an illustrative aggregate derating factor of 0.8:

\[
P=A S\eta_{\rm cell}f
\]

\[
P=(300\text{–}500)\ \mathrm{m^2}
(1,361\ \mathrm{W/m^2})(0.30)(0.80)
=98\text{–}163\ \mathrm{kW}.
\]

The irradiance is supported by Kopp and Lean, *Solar Physics* (2011). The efficiency and derating are design assumptions; packing, pointing, temperature, degradation and distance must ultimately be modeled separately.

At the finding's thrust-to-power ratio:

\[
F=(50\ \mathrm{mN/kW})(98\text{–}163\ \mathrm{kW})
=4.9\text{–}8.2\ \mathrm{N}.
\]

This is broadly consistent with the order of magnitude of NASA's 12.5-kW-class HERMeS Hall-thruster work. It is **not** evidence that a hundreds-of-tonnes iodine-powered transport is qualified.

#### Unequal-mass outbound and return legs

Illustrative reference assumptions:

- 15 vehicles;
- dry mass \(D=80\ \mathrm{t}\);
- delivered cargo \(C=200\ \mathrm{t}\);
- exhaust velocity \(v_e=20\ \mathrm{km/s}\);
- \(4\ \mathrm{km/s}\) per leg;
- electrical power 150 kW, thrust 7.5 N;
- thrust duty factor 85%;
- 0.5 year combined loading, unloading and other non-thrust operations;
- no propellant supplied at the asteroid.

The loaded return departs with:

\[
m_{\rm return,start}=(D+C)e^{\Delta v/v_e}
=280e^{0.2}=342\ \mathrm{t}.
\]

Return propellant is approximately 62 t. The outbound spacecraft must carry this:

\[
m_{\rm outbound,start}=(80+62)e^{0.2}=173\ \mathrm{t}.
\]

Outbound propellant is approximately 31 t; total cycle propellant is approximately 93 t.

Total thrust duration follows from impulse:

\[
t_{\rm thrust}=\frac{m_pv_e}{F}
=\frac{93,000\ \mathrm{kg}\times20,000\ \mathrm{m/s}}
{7.5\ \mathrm{N}}
\approx7.9\ \mathrm{yr}.
\]

\[
t_{\rm cycle}\approx\frac{7.9}{0.85}+0.5
\approx9.8\ \mathrm{yr}.
\]

Steady-state fleet delivery:

\[
\dot m=\frac{15(200\ \mathrm{t})}{9.8\ \mathrm{yr}}
\approx310\ \mathrm{t/yr}.
\]

For 6–10 km/s total mission Δv at the reference power, this calculation gives approximately **230–420 t/year**. Allowing array-power and operating variation supports a planning range of **200–450 t/year**, not a guaranteed capability.

These are propulsion-duration estimates, **not trajectory solutions**. They omit launch-window constraints, detailed low-thrust steering, eclipses and some degradation.

**Important additional omission:** steady-state flow starts only after the first long return missions. A station commissioned before that would have no indigenous feed unless stock was pre-positioned.

At the reference performance, 50,000 t/year would require roughly:

\[
N\approx\frac{50,000(9.8)}{200}\approx2,450\ \mathrm{vehicles}.
\]

Alternatively, keeping 15 vehicles requires approximately 160 times the cargo-delivery productivity. Increasing vehicle power alone would imply tens of megawatts per vehicle before accounting for the mass of the larger power system.

**Proposed change:** rate the initial processing line for **300 t/year concentrate**, range 200–450 t/year; require a trajectory-selected supply architecture before freezing station location. Do not scale the fleet to industrial throughput by simple multiplication.

---

### P0-F02 — Mining rate, duty cycle and concentration

**Verdict: agree.** Excavator peak rate, operational availability and required production are different quantities.

At 2–5 t/h, the original 1,000 t/year target implies:

\[
f=\frac{1,000\ \mathrm{t/yr}}
{(2\text{–}5)\ \mathrm{t/h}\times8,760\ \mathrm{h/yr}}
=2.3\text{–}5.7\%.
\]

Thus, these specifications could coexist if the annual rate includes idle time, anchoring, relocation, sorting, maintenance and transport-limited operation. They presently do not state that.

#### Proposed reference mass-flow chain

This chain is an **assay-dependent design case**, not a claim about typical asteroids.

| Flow | Reference, t/year |
|---|---:|
| Excavated material | 10,000 |
| Asteroid-side rejects | 9,700 |
| Concentrate packaged and transported | 300 |
| Station feed | 300 |
| Accepted Fe–Ni alloy | 225 |
| Station residues, losses and retained off-spec material | 75 |

Assumptions:

- raw feed contains 3.2 wt% potentially recoverable native metal: 320 t/year;
- beneficiation recovers 75% of it: 240 t/year;
- concentrate is 80 wt% metal: \(240/0.8=300\) t/year;
- station metal recovery is about 94%: approximately 225 t/year;
- concentration ratio is approximately **33:1 by mass**.

For 20 robots, 10,000 t/year is 500 t/year per robot, requiring only **1.1–2.9%** utilization at the stated peak excavation rates.

A correlated planning envelope is:

- excavated: **7–15 kt/year**;
- concentrate: **200–450 t/year**;
- accepted alloy: **150–340 t/year**.

The concentration assumptions must vary together. Independent extremes must not be combined to manufacture closure.

**Proposed change:** specify peak excavation and annual utilization separately; stage robot procurement; add beneficiation, assay, packaging and reject handling. A water-rich stream must have its own mass balance—this metal-rich case does not imply 5–20% recoverable water.

---

### P0-F03 — Station power

**Verdict: partly agree.** The mixed-product promise is underpowered. However, power must be calculated from a flowsheet and product yield, not by assigning one energy intensity to every kilogram of feed.

For native Fe–Ni, sensible heat plus fusion is of order **0.25–0.4 kWh/kg metal**. Real equipment additionally heats gangue and containers and incurs thermal losses. I use **1–2 kWh/kg concentrate** as a conservative initial design allowance for separation, melting and casting, pending tests.

At 300 t/year:

\[
P_{\rm process}=
\frac{300,000\ \mathrm{kg/yr}(1\text{–}2)\ \mathrm{kWh/kg}}
{8,760\ \mathrm{h/yr}}
=34\text{–}68\ \mathrm{kW}.
\]

Adding 100–250 kW average for robotics, pumps, controls, communications and thermal equipment gives approximately **0.13–0.32 MW average**. Specify **1 MW installed**, range 0.5–1.5 MW, to support batch peaks, redundancy and degraded operation.

#### Energy anchors for future products

These are terrestrial benchmarks or preliminary allowances, **not demonstrated asteroid-process performance**.

| Product/process | Preliminary energy basis | Boundary and qualification |
|---|---:|---|
| Native Fe–Ni melting/refining | 0.5–1.5 kWh/kg product | Assumes clean metallic feed; excludes mining and transport |
| Initial concentrate-processing line | 1–2 kWh/kg feed | Includes gangue and process losses; design allowance |
| Primary aluminum | 13–16 kWh/kg Al for electrolysis alone | International Aluminium Institute industrial data; excludes major upstream processing |
| Asteroid-to-Al chain | 15–30 kWh/kg Al | Engineering allowance; chemistry and consumables unqualified |
| Metallurgical silicon | 10–20 kWh/kg Si | Approximate terrestrial furnace benchmark; upstream boundary matters |
| Solar-grade silicon chain | 60–200 kWh/kg Si | Broad screening allowance, technology-dependent; not a zone-refining guarantee |

For 50 kt/year **of product**:

\[
P[\mathrm{MW}]
=\frac{50\times10^6\ \mathrm{kg/yr}\ e[\mathrm{kWh/kg}]}
{8,760\times1,000}.
\]

This gives:

- native-metal product: approximately **3–9 MW**;
- aluminum product: approximately **86–170 MW**;
- solar-grade silicon: approximately **340–1,140 MW**.

If 50 kt/year means *feed*, each product's mass fraction and recovery must be applied first. The original specification never resolves that distinction.

**Proposed change:** allocate 0.5–1.5 MW installed generation from bom-0-5 to the demonstrator. Remove committed Al and solar-grade Si production. Give any expansion its own flowsheet, generation and heat-rejection budget.

The $500M/100 MW array entry is **$5/W**, but “$5M per unit” is dimensionally unclear when quantity is expressed in MW. Round 1's assertion that flown arrays universally cost $300–1,000/W is insufficiently sourced; I do not adopt it. Generation needs an independent cost and mass estimate.

---

### P0-F10 — Crew transport and habitation

**Verdict: agree.**

**Phase 0 is uncrewed.** Remove quarterly visits, annual visits, habitat and life-support assumptions.

At Sun–Earth L4/L5, distance to Earth is approximately 1 AU:

\[
t_{\rm one-way}\approx\frac{1.496\times10^{11}\ \mathrm{m}}
{3.00\times10^8\ \mathrm{m/s}}
\approx499\ \mathrm{s}.
\]

That is approximately **8.3 minutes one-way**, requiring local fault containment and autonomous safe shutdown—not continuous real-time teleoperation.

Retain robotic servicing interfaces and optional docking clearance. **Structural provisions are not human-rating.** Human-rating is a system-level safety and assurance undertaking.

**Proposed change:** zero crew systems and crew missions in the initial station scope. Any future crew option requires a separate transport, radiation protection, abort, life-support and cost baseline.

---

### P0-F15 — Deliberation write-back

**Verdict: partly agree.** The supplied station specification is stale against the supplied conclusions. The repository-wide “eight of nine” count cannot be independently verified from this evidence.

| Deliberation | Disposition for bom-0-3 |
|---|---|
| **rq-0-11: gravity zones** | Include a replaceable centrifuged process module as the leading architecture. Carry 20–60 t preliminary rotating-system allowance, not a proven 10–15 t net penalty. Retain substantial contingency. |
| **rq-0-14: propellant sequencing** | Reserve interfaces; deploy production only against measured water yield and an identified customer. Remove the arbitrary 25 kt/year materials gate. Charge electrolysis/liquefaction to bom-0-6. |
| **rq-0-18: structural human-rating** | Full text unavailable. Reserve docking geometry where economical; do not claim human-rating or assign a precise mass saving. |
| **rq-0-28: ISRU costing** | Full text unavailable. Apply explicit development, deployment, consumables, replacement, operations and transport boundaries now; no quantitative conclusion can be imported. |
| **rq-0-29: governance** | Full text unavailable. Require a named configuration authority and stage-gate owner under bom-0-7; no defensible station mass or power delta. |
| **rq-0-30: cryogenic management** | Preserve a shielded depot option, but withdraw its numerical design from the committed demonstrator. Correct chemistry and cooler calculations below. |
| **rq-0-47: sunshield** | Full text unavailable. Reserve a thermally isolated location; do not adopt 900 m² or 200–500 kg as qualified values. |
| **rq-0-48: MLI degradation** | Full text unavailable. Require end-of-life thermal performance, contamination control and inspection/replacement provisions. Quantitative delta remains open. |
| **rq-0-26: excavation** | Incorporate duty cycle and concentrate yield at the mining interface as described under F02. |

#### Corrections to propellant arithmetic

At 50–60 kWh/kg H₂, 500 kW continuous electrolysis produces:

\[
m_{H_2}=\frac{500(8,760)}{50\text{–}60}
=73\text{–}88\ \mathrm{t/yr}.
\]

Electrolysis produces approximately **8 kg O₂ per kg H₂**, so combined products are approximately **660–790 t/year**, before extraction, purification, liquefaction, outages and losses.

Therefore, “70–90 tonnes/year of propellant” is approximately an **H₂-only** number mislabeled as total propellant.

A tank inventory of 100 t H₂ plus 600 t O₂ is a plausible **engine mixture ratio of six**, but it is not the stoichiometric electrolysis output; another approximately 200 t O₂ must be used or stored elsewhere.

#### Corrections to cryogenic claims

For a 20 K cold stage rejecting heat at 300 K:

\[
COP_{\rm Carnot}=\frac{20}{300-20}=0.0714.
\]

At 10–20% of Carnot efficiency, removing 15–40 W requires:

\[
P_{\rm electric}=\frac{Q}{COP}
\approx1.1\text{–}5.6\ \mathrm{kW}.
\]

Thus 700 W is not a defensible general requirement for the stated heat leak. Actual cooler performance must be demonstrated.

For scale, 100 t of LH₂ at approximately 71 kg/m³ occupies about 1,400 m³: a spherical tank would be about **14 m in diameter**. Shield area, supports, plumbing and nearby hot equipment cannot be inferred from an ideal shaded surface.

A simple sensible-heat check using \(c_p\sim10\ \mathrm{kJ/(kg\,K)}\) and 5 K subcooling gives:

\[
E\sim100,000(10,000)(5)=5\times10^9\ \mathrm{J}.
\]

At 15–40 W, this corresponds to roughly **4–11 years**, not 190 days. Neither result is a validated failure-survival time: stratification, pressure constraints, penetrations and off-normal heating require a transient model.

Also, subcooling **adds stored thermal margin**; it does not inherently reduce steady-state heat leakage. The claimed six-month L4/L5 libration period is not a general property of these points.

**Proposed change:** write back corrected decisions, with explicit “provisional” or “unavailable evidence” status. Do not reduce contingency because a consensus selected partial gravity.

---

### P0-F18 — Metallurgy fallback

**Verdict: partly agree.** A qualified fallback is missing. The claimed physics impossibility and “eight orders of magnitude” argument are not established.

A 100 g batch is a mass; 50 kt/year is a rate. Comparing them directly does not define a valid scale-up ratio. Relevant scaling variables include bath dimensions, interfacial forces, residence time, throughput per module and repetition rate.

#### Rotation calculation

\[
a=\omega^2r.
\]

At \(r=50\ \mathrm{m}\), \(a=0.1g=0.981\ \mathrm{m/s^2}\):

\[
\omega=\sqrt{0.981/50}=0.140\ \mathrm{rad/s}
\]

\[
n=\frac{60\omega}{2\pi}=1.34\ \mathrm{rpm}.
\]

For 0.05–0.15g at 50 m, speed is approximately **0.95–1.64 rpm**. The quoted 1.4 rpm geometry is reasonable.

But rotation does not prove separation performance. Illustratively:

\[
Bo=\frac{\Delta\rho\,aL^2}{\gamma}.
\]

Using \(\Delta\rho=3,000\ \mathrm{kg/m^3}\), \(a=0.981\ \mathrm{m/s^2}\), and \(\gamma=1\ \mathrm{N/m}\):

- \(L=0.1\) m gives \(Bo\approx29\);
- \(L=0.01\) m gives \(Bo\approx0.29\).

A bath can be gravity-dominated while small inclusions remain surface-tension-dominated.

**Proposed baseline:** enclosed, replaceable centrifuged melting/separation cartridges. Do not require a station-wide gravity ring or a dedicated microgravity silicon factory.

**Qualification gate before production commitment:**

- representative mineralogy and contamination;
- at least 100 repeated batch cycles, including injected faults;
- ≥90% recovery of metal entering the process;
- alloy meeting the actual downstream composition and inclusion specification;
- ≤2 kWh/kg concentrate for the selected route;
- measured process availability ≥70% over an extended campaign;
- autonomous containment, shutdown and restart demonstrated.

These are **proposed acceptance requirements**, not thresholds established by published experiments.

**Costed fallback:** procure and deliver an initial **100 t Phase-1 demonstration package from Earth**, with a **$1–3B delivered allowance**. This corresponds to $10,000–30,000/kg including manufacturing and delivery assumptions; it is not a commercial launch quote.

Trigger the fallback if qualification fails by the Phase-1 procurement decision, or if no trajectory-validated supply chain exists. Do not wait for an operating station to miss years of deliveries.

A lunar refinery is a separate major program, not a cheap flight-proven fallback. Carbonyl processing is a legitimate terrestrial alternative—especially for nickel—but mixed asteroid Fe–Ni selectivity, toxic-gas containment, CO supply and autonomous deposition still require qualification.

---

### P0-F19 — Phase-1 demand and delivery

**Verdict: agree.**

If the categories are additive:

\[
M_{\rm collectors}=1,000(69\text{–}1,850)\ \mathrm{kg}
=69\text{–}1,850\ \mathrm{t}
\]

\[
M_{\rm blankets}=5,000(690\text{–}45,000)\ \mathrm{kg}
=3,450\text{–}225,000\ \mathrm{t}
\]

\[
M_{\rm total}=3,519\text{–}226,850\ \mathrm{t}.
\]

For an illustrative ten-year deployment, annual hardware demand is approximately **350–22,700 t/year**. This is not raw-feed demand. The categories may also overlap.

The initial station's approximately 225 t/year of Fe–Ni does not constitute PV blankets, semiconductor devices, aluminum structures, conductors or complete collectors.

#### Proposed provisional customer interface

| Deliverable | Annual station commitment | Acceptance | Delivery point/date |
|---|---:|---|---|
| Fe–Ni alloy demonstration lots | 20–60 t/year | Customer-approved alloy chemistry, inclusions, mechanical properties and geometry | SE-L1 assembly node; commissioning +2 years at earliest, and only after cargo-transfer qualification |
| Solar-grade silicon/cells | 0 | Earth supplied initially; purity alone does not define cell performance | Phase-1 procurement schedule |
| Aluminum, copper, electronics, polymer/insulation materials | 0 | Earth supplied initially | Phase-1 procurement schedule |
| Water or H₂/O₂ | 0 committed | Depends on assay and an identified propulsion customer | Separate depot decision |

The 20–60 t/year is a proposed demonstration allocation, not sourced Phase-1 demand. Until a customer accepts the remaining alloy output, the plant should throttle rather than accumulate an assumed valuable stockpile.

**Proposed change:** add the station-to-L1 delivery task and obtain a signed material-demand breakdown before authorizing the refinery. Do not freeze L4/L5 location first and optimize the supply chain afterward.

---

## 2. Revised specification

| Parameter | Old → proposed new | Basis | Confidence |
|---|---|---|---|
| Station role | Industrial refinery → gated uncrewed materials demonstrator | System closure and judgment | High that a scope reset is needed |
| Rated delivered-feed capacity | 50,000 → **300 t/year**, range **200–450** | Transport calculation | Medium, conditional on mission assumptions |
| Industrial expansion | Committed full build → **unfunded objective** | No closed logistics, process or demand model | High |
| Main product | Al, Fe, Ni, solar-grade Si → **native Fe–Ni alloy** | Lower-energy route; qualification pending | Medium for route choice, low for feed availability |
| Accepted alloy capacity | Unspecified → **225 t/year**, range **150–340** | Reference mass balance | Low |
| Installed electrical allocation | 1–2.5 → **1 MW**, range **0.5–1.5** | Batch-power allowance | Medium |
| Average station electricity | Unspecified → **0.2 MW**, range **0.13–0.32** | Process energy plus auxiliaries | Low–medium |
| Process energy | Unspecified → **1.5 kWh/kg concentrate**, range **1–2** | Preliminary engineering allowance | Low |
| Process gravity | Unspecified → **0.1g**, test/design range **0.05–0.15g** | Leading qualification candidate | Low for sufficiency |
| Rotation geometry | Unspecified → **50 m radius**, range **40–60 m** | Acceleration calculation; packaging provisional | Medium for kinematics |
| Rotation speed | Unspecified → **1.34 rpm at 50 m**, range **0.95–1.64 rpm at that radius** | Calculation | High |
| Rotating-system mass allowance | Claimed 10–15 t net penalty → **40 t**, range **20–60 t** | Judgment; includes mechanisms and balancing provision | Low |
| Initial station dry mass | 400–500 t → **350 t**, range **200–500 t** | Preliminary subsystem allowances, not a validated rollup | Low |
| Full-build mass | 800–1,000 t → **withdrawn** | No industrial equipment inventory | High |
| Heat rejection | Unspecified → reserve **0.3–0.6 MW** rejection capability | Preliminary peak thermal balance | Low |
| Crew | Quarterly/annual visits → **none** | Scope and logistics decision | High |
| Service life | 30-year facility → **10–15-year funded demonstration**, replaceable modules | Judgment; retain long-lived interface provisions | Low |
| Propellant plant | Ambiguous integrated scope → **no deployed plant in bom-0-3** | Consumer and duplication check | High |
| Station development/acquisition allowance | $10B → **$12B reference, $8–18B envelope** | Judgment, including precursor work and uncertainty reserve | Low |
| Qualification program | Unfunded actions → **$0.5–1B** within station envelope | Proposed program allowance | Low |

The cost range excludes generation hardware, mining, tugs, station launch/transfer, propellant production and long-term operations. **There is no evidence-based requirement to raise the central estimate above $10B simply because three models proposed $12B.** The $12B reference is a planning allowance, not a derived price.

At 350 K and emissivity 0.85, an ideal radiator emits:

\[
q=\epsilon\sigma T^4\approx720\ \mathrm{W/m^2}.
\]

Rejecting 0.3–0.6 MW therefore requires approximately **420–830 m² of emitting surface** before environmental loads, view factors, degradation and redundancy. A preliminary **500–1,500 m² allowance** is appropriate; it must not be omitted from mass estimates.

No guaranteed multi-megawatt rotary electrical joint is required at this stage. Separate electrical generation on a rotating module, contactless transfer and batch-limited interfaces should be compared before selecting the mechanism.

## 3. Interfaces

Values are steady-state planning values, not simultaneous guaranteed commitments.

| Other item / destination | Exchange | Proposed value | Status |
|---|---|---:|---|
| **bom-0-1 prospectors** | Composition/mineralogy and target-selection data | Buffered assay, mapping and uncertainty products; station receives approximately 0.01–0.1 Mbit/s average planning traffic | Data interface present in concept; acceptance criteria absent |
| **bom-0-2 mining robots** | Asteroid-side concentrate production | 200–450 t/year; reference 300 | Beneficiation and packaging omitted |
| **bom-0-4 transport vehicles** | Concentrate received | 200–450 t/year | Mission and startup schedule unclosed |
| **bom-0-4 transport vehicles** | EP propellant procurement supporting feed delivery | Approximately 100–200 t/year Kr/I-equivalent; reference about 140 | Supply, cost and qualification omitted |
| **bom-0-5 arrays** | Station electrical supply | 0.5–1.5 MW installed; 0.13–0.32 MW average | Allocation newly required |
| **bom-0-6 propellant systems** | Captured water | **0 t/year committed**; exploration allowance 0–15 t/year for this feed stream | Yield unproven; no electrolysis duplicate |
| **bom-0-6 propellant systems** | Future electrical/fluid interfaces | Reserved modular connection; power rating set after customer decision | No deployed station propellant plant |
| **bom-0-7 organization** | Configuration, authorization and operating accountability | One accountable stage-gate owner and configuration authority | Governance deliverable, not a mass flow |
| **Phase-1 SE-L1 node** | Accepted alloy lots | 20–60 t/year initially | Delivery service omitted |
| **Earth operations** | Telemetry and commands | 0.1–1 Mbit/s average, 10–100 Mbit/s burst; buffered | Link budget and ground service omitted |
| **Station stores/residue modules** | Process residues | Reference 75 t/year; approximately 50–115 t/year correlated range | Storage/recycling provision omitted |

The EP propellant estimate follows the reference cycle:

\[
\dot m_p=\frac{15(93\ \mathrm{t})}{9.8\ \mathrm{yr}}
\approx140\ \mathrm{t/yr}.
\]

H₂/O₂ production does **not** supply a krypton/iodine Hall-thruster fleet without a propulsion redesign.

For product delivery, two preliminary 50-t-class EP vehicles could provide an initial 20–60 t/year service with schedule margin. Their capability must be established using an actual station-to-L1 trajectory; the 1–3 km/s figures in Round 1 are not universal transfer costs.

## 4. Missing items or scope

1. **Asteroid-side beneficiation and logistics:** separation, assay, sealed containers, reject control and loading interfaces.
2. **Station deployment:** launch, transfer, assembly, checkout and initial spares. Preliminary allowance: **$1–5B**, highly orbit- and launcher-dependent.
3. **Startup-feed strategy:** pre-positioning indigenous cargo, delayed station deployment or Earth-supplied commissioning batches.
4. **Product transfer to SE-L1:** preliminary two-vehicle allowance of **$0.3–0.8B**, excluding propellant and recurring operations.
5. **Electrical distribution and heat rejection:** separate scope ownership from generation to prevent omissions and double counting.
6. **Robotic servicing and replacement logistics:** the station cannot rely on undefined crew intervention.
7. **EP propellant production/procurement:** assess iodine and krypton supply independently; do not accept an unsupported global-production claim.
8. **Ground operations and communications:** preliminary **$0.1–0.3B/year** operational allowance, subject to fleet-wide sharing.
9. **Earth-supply fallback:** **100 t delivered, $1–3B** initial authorization envelope.
10. **Phase-1 material procurement:** cells, conductors, electronics, aluminum and other unavailable products.
11. **Containment and contamination control:** molten metal, dust, toxic reagents, volatiles, and deposition on arrays/radiators.
12. **A phase-wide integrated cost baseline.**

The present phase BOM sums to approximately **$15.71B**. That is not a closed deployed-and-operated program budget: the exclusions above remain substantial.

## 5. Remaining disagreements and open questions

- **Location:** Earth–Moon space improves access and communications; asteroid co-location avoids raw-feed transport; L4/L5 may offer operational advantages. This is a genuine multi-attribute trade-off, not something “orbital stability” settles.
- **Purpose:** an industrial resource supplier and a technology demonstrator have different success criteria. A 300-t/year demonstration cannot justify itself through throughput rhetoric.
- **Feed selection:** the reference concentration ratio requires a suitable native-metal inventory and demonstrated beneficiation. It cannot be transferred to arbitrary carbonaceous material.
- **Partial gravity:** plausible assistance is not demonstrated process adequacy. Crucibles, filtering, electromagnetic separation and centrifugation should remain alternatives.
- **Carbonyl route:** worth testing, but not yet a qualified gravity-independent replacement.
- **Product value:** Fe–Ni may be poorly matched to a lightweight PV-dominated Phase 1. Lower transport mass does not automatically mean useful output.
- **Demand:** are blankets included in collector masses? What fraction of hardware mass can actually be supplied as station alloy?
- **Schedule:** calendar dates cannot responsibly be assigned without a project start, target missions and first-return dates.
- **Costs:** delivered Earth-to-L1 pricing, station deployment and array costs need supplier-informed estimates. Neither Round 1 cost extreme is established.
- **Cryogenics:** an operational-scale depot is not demonstrated merely because small cryocoolers and passive shielding have flight heritage. NASA cryogenic-fluid-management work remains the relevant qualification path.
- **Human-rating:** future compatibility is a choice; calling it human-rating now is incorrect.
- **Unavailable records:** rq-0-18, 28, 29, 47 and 48 must be supplied before their numerical effects can be incorporated.

## 6. Decision-quality critique

The following are proposed decision records, not numerical “consensus scores.” Weights describe the range of outcomes under consideration and require approval by the project's decision authority.

### DQ-1 — Throughput, fleet and station location

**Methods:** Composite Scaffold, QOC and ACH.

1. **Frame & type:** an architecture/existence decision: build a remote refinery, a smaller demonstrator, or a source-side plant. Deployment is expensive and substantially irreversible.
2. **Criteria and weights:** mandatory mass/energy closure; then delivered useful-material performance 35%, lifecycle cost 30%, schedule 20%, adaptability 15%.
3. **Options:** current 50-kt remote plant; 300-t remote demonstrator; asteroid-co-located processing; Earth-supplied Phase 1 with no production station.
4. **Assessment matrix:**

   | Option | Logistics closure | Cost evidence | Phase-1 usefulness | Reversibility |
   |---|---|---|---|---|
   | Current 50-kt remote plant | Fails | Very weak | Unknown | Poor |
   | 300-t remote demonstrator | Conditional | Weak | Limited | Moderate |
   | Source-side processing | Potentially better | Weak | Unknown | Moderate |
   | Earth-supply demonstrator | Avoids asteroid chain | Better heritage, price uncertain | Direct | High |

5. **Sensitivity/trade-offs:** Δv, dry mass and array output are sensitivity points. Earth accessibility versus source proximity is a **trade-off point**: improving one can worsen the other.
6. **Certainty:** failure of the stated fleet to supply 50 kt/year is **very likely, with high confidence**. Meeting 300 t/year is plausible but unquantified in likelihood, with medium confidence in propulsion arithmetic and low confidence in mission execution.
7. **Assumption/falsifier:** the reference vehicle can execute the stated route and loading cycle. A validated low-thrust trajectory, array degradation or payload redesign producing <200 t/year would falsify the adopted envelope.
8. **Decision/warrant/downside:** select a 300-t/year design reference but defer station orbit and production authorization. It matches the present logistics order of magnitude, accepting a modest industrial contribution.
9. **Consequences:** withdraw the 50-kt commitment; commission joint target/orbit/trajectory selection; phase station commissioning after feed availability.

**Weakest Decision Quality link:** **information**, followed by **values**—the project has not said whether industrial output or learning is the primary benefit.

**ACH contribution:** low transport productivity is consistent with several plausible power and mass assumptions. ARM-based productivity is not evidence for this route unless its target, destination and Δv assumptions also hold.

---

### DQ-2 — Partial gravity and metallurgy architecture

**Methods:** Composite Scaffold, ACH and GRADE Evidence-to-Decision.

1. **Frame & type:** process-architecture property decision under experimental uncertainty; preserve replaceable modules.
2. **Criteria and weights:** containment is a must; process quality/recovery 40%, autonomous availability 25%, mass/power 20%, development cost 15%.
3. **Options:** partial-gravity crucible/cartridge; zero-g controlled processing; carbonyl separation; defer indigenous metallurgy.
4. **Assessment matrix:**

   | Option | Separation evidence | Space maturity | Additional hazards |
   |---|---|---|---|
   | Partial gravity | Favorable physics; scale uncertain | Low | Rotation and molten inventory |
   | Zero-g alternatives | Process-specific | Laboratory heritage | Confinement and inclusions |
   | Carbonyl | Strong terrestrial nickel heritage | Very low | Toxic gas, reagents, deposition |
   | Deferral | No indigenous output | Earth supply heritage | Supply-chain dependence |

5. **Sensitivity/trade-offs:** droplet size, viscosity and residence time are sensitivity points. Added gravity versus mechanical mass, disturbances and maintenance is a trade-off point.
6. **Certainty:** gravity assisting bulk separation is **likely, with medium confidence**. A fixed 0.05–0.15g range delivering autonomous industrial-quality product is not assigned a probability; confidence is low.
7. **Assumption/falsifier:** partial gravity yields compliant alloy within energy and recovery limits. Representative repeated-cycle tests failing those limits falsify it.
8. **Decision/warrant/downside:** qualify centrifuged cartridges first, without declaring alternatives impossible. Accept development expense and the possibility of rejection.
9. **Consequences:** fund experiments before a large rotating structure; define customer quality requirements; retain Earth supply.

**Weakest link:** **information**.

**GRADE contribution:** favorable mechanism, terrestrial maturity and feasibility are separate evidence categories. They do not justify lowering contingency to 15–20%.

---

### DQ-3 — Product mix, power allocation and Phase-1 fallback

**Methods:** Composite Scaffold and QOC.

1. **Frame & type:** scope and procurement decision; deciding what to manufacture precedes sizing generation.
2. **Criteria and weights:** downstream acceptance is a must; delivered useful product 40%, schedule 25%, cost 25%, strategic learning 10%.
3. **Options:** full Al/Si/Fe refinery; native-metal demonstrator with Earth PV; Earth-only Phase-1 demonstration; postponement.
4. **Assessment matrix:**

   | Option | Product relevance | Process maturity | Energy burden |
   |---|---|---|---|
   | Full refinery | Potentially high | Low in space | High/uncertain |
   | Fe–Ni plus Earth PV | Conditional | Most credible indigenous starting route | Low |
   | Earth-only | Direct | High manufacturing heritage | No station-processing burden |
   | Postpone | No near-term output | Avoids commitment | Lowest immediate spending |

5. **Sensitivity/trade-offs:** alloy demand and yield are sensitivity points. Strategic learning versus near-term useful production is a **values trade-off**, not a missing measurement.
6. **Certainty:** Earth manufacture is very likely feasible, with high confidence. The $1–3B delivery allowance has low confidence. Fe–Ni's value to Phase 1 is uncertain, with low confidence.
7. **Assumption/falsifier:** Phase 1 has an accepted use for 20–60 t/year alloy. A customer material breakdown excluding Fe–Ni falsifies the proposed production commitment.
8. **Decision/warrant/downside:** adopt the narrow metal demonstrator only if a customer and learning case justify it; procure initial PV and unavailable materials from Earth. Accept reduced ISRU breadth.
9. **Consequences:** limit installed power to 0.5–1.5 MW; establish separate expansion decisions; fund Earth fallback before schedule failure.

**Weakest link:** **values and commitment**—Round 1 proposes outputs without a committed customer.

---

### DQ-4 — Crew, propellant and cryogenic provisions

**Methods:** Composite Scaffold, QOC and GRADE Evidence-to-Decision.

1. **Frame & type:** modular scope decisions with valuable deferral options; installed crew/depot systems are costly commitments.
2. **Criteria and weights:** safe unmanned operation is a must; cost 35%, reliability 30%, future compatibility 20%, near-term customer benefit 15%.
3. **Options:** uncrewed interface-ready station; periodic crew visits; immediate integrated cryogenic depot; no depot provisions.
4. **Assessment matrix:**

   | Option | Immediate burden | Operational benefit | Future flexibility |
   |---|---|---|---|
   | Uncrewed, interface-ready | Moderate | Requires strong autonomy | Good |
   | Crew visits | High/unbudgeted | Potential maintenance benefit | Mixed |
   | Immediate depot | High/unjustified | No identified fleet consumer | Good but costly |
   | No provisions | Lowest | Simple initially | Poor if demand emerges |

5. **Sensitivity/trade-offs:** intervention frequency and customer demand are sensitivity points. Interface mass now versus avoided redesign later is a genuine trade-off.
6. **Certainty:** quarterly visits lacking budget are clearly an omission, with high confidence. Whether visits would economically improve availability is uncertain. Depot thermal feasibility is plausible, with medium confidence; its stated power and mass values have low confidence.
7. **Assumption/falsifier:** remote operation can safely contain faults. Tests showing frequent unrecoverable failures requiring physical intervention falsify the unattended architecture.
8. **Decision/warrant/downside:** remain uncrewed, preserve economical servicing/depot geometry, and defer propellant hardware. Accept lower recoverability from some failures.
9. **Consequences:** fund autonomous recovery and robotic servicing; require an actual propellant customer; do not duplicate bom-0-6 or claim human-rating.

**Weakest link:** **alternatives and information**—Round 1 discusses crew visit frequency without a quantified failure/intervention model.

**GRADE contribution:** small cryocooler heritage does not establish depot-scale transfer, reliability, resource use or operational acceptability.

---

### Cross-cutting critique of the remaining Round-1 decisions

- **Mass estimates and rotating penalties:** useful allowances, not validated architecture conclusions. Their weakest link is information; a subsystem bill of materials and dynamic/thermal design can falsify them.
- **The apparent $11.5–12B cost convergence:** not independent evidence. Different exclusions make the figures non-comparable. Normalize scope before comparing.
- **Contingency:** should follow risk and estimate maturity. Selecting a favored architecture does not earn a reduction.
- **Qualification gates:** fixed 6N silicon purity, ≥25 kt/year throughput and ≥1 MW rotary-joint gates are not linked consistently to customer requirements or the resized architecture. Replace them with product acceptance, measured availability and actual component requirements.
- **Design life:** 10–15 versus 30 years trades present qualification and replacement cost against long-term capability. It is a values/economics decision informed by reliability evidence, not a number to average.
- **Communications:** data rates are engineering allocations, not demonstrated needs. A task-level telemetry budget and link analysis can settle them.
- **BOM additions:** launch, servicing, transfer and qualification must be assigned exactly once. Their presence is necessary; the quoted prices remain low-confidence.
- **Governance:** the weakest link in the entire reconciliation is ultimately **commitment**. Each accepted change needs an owner, controlled requirement, funding disposition and verification event—not just a revised consensus paragraph.

```yaml
item: bom-0-3
model: OpenAI ChatGPT
findings:
  - id: P0-F01
    verdict: partly
    summary: The fleet cannot supply 50 kt/year, although constant-loaded-mass timing and array power in the finding need correction.
    proposed_change: Adopt a 300 t/year concentrate design reference and require trajectory-validated logistics before selecting the station orbit.
  - id: P0-F02
    verdict: agree
    summary: Peak excavation, annual utilization, beneficiation yield and transport capacity are not reconciled.
    proposed_change: Baseline a conditional 10 kt/year excavation to 300 t/year concentrate to 225 t/year accepted-alloy mass balance.
  - id: P0-F03
    verdict: partly
    summary: Mixed-product refining is underpowered, but energy must be calculated by flowsheet, product yield and process boundary.
    proposed_change: Allocate 0.5-1.5 MW installed station power and defer committed aluminum and solar-grade silicon production.
  - id: P0-F10
    verdict: agree
    summary: Crew visits and habitation lack transport, safety and budget closure.
    proposed_change: Make Phase 0 uncrewed and retain only economical robotic-servicing and future-interface provisions.
  - id: P0-F15
    verdict: partly
    summary: Supplied conclusions are not incorporated, but the repository-wide count and unavailable conclusions cannot be verified.
    proposed_change: Write back corrected supplied conclusions and mark unavailable deliberations as unresolved rather than importing unsupported values.
  - id: P0-F18
    verdict: partly
    summary: A qualified fallback is missing, but microgravity impossibility and partial-gravity sufficiency are not demonstrated.
    proposed_change: Qualify centrifuged processing cartridges and authorize a costed Earth-supplied Phase-1 demonstration fallback.
  - id: P0-F19
    verdict: agree
    summary: Phase-1 demand, material acceptance, schedule and delivery to SE-L1 are unclosed.
    proposed_change: Obtain a customer material breakdown and add an initial 20-60 t/year accepted-alloy delivery service to SE-L1.
revised_spec:
  - parameter: Rated delivered concentrate throughput
    old: 50000
    new: 300
    range: [200, 450]
    unit: t/year
    basis: calculation
    confidence: medium
  - parameter: Accepted native Fe-Ni alloy capacity
    old: unspecified
    new: 225
    range: [150, 340]
    unit: t/year
    basis: calculation
    confidence: low
  - parameter: Installed station electrical allocation
    old: 1-2.5
    new: 1
    range: [0.5, 1.5]
    unit: MW
    basis: judgement
    confidence: medium
  - parameter: Average station electricity
    old: unspecified
    new: 0.2
    range: [0.13, 0.32]
    unit: MW
    basis: calculation
    confidence: low
  - parameter: Concentrate processing energy
    old: unspecified
    new: 1.5
    range: [1, 2]
    unit: kWh/kg feed
    basis: judgement
    confidence: low
  - parameter: Candidate process acceleration
    old: unspecified
    new: 0.1
    range: [0.05, 0.15]
    unit: Earth g
    basis: judgement
    confidence: low
  - parameter: Candidate rotation radius
    old: unspecified
    new: 50
    range: [40, 60]
    unit: m
    basis: judgement
    confidence: low
  - parameter: Rotation speed at 50 m radius
    old: unspecified
    new: 1.34
    range: [0.95, 1.64]
    unit: rpm
    basis: calculation
    confidence: high
  - parameter: Rotating-system mass allowance
    old: 10-15 claimed net penalty
    new: 40
    range: [20, 60]
    unit: t
    basis: judgement
    confidence: low
  - parameter: Initial station dry mass
    old: 400-500
    new: 350
    range: [200, 500]
    unit: t
    basis: judgement
    confidence: low
  - parameter: Heat rejection capability
    old: unspecified
    new: 0.45
    range: [0.3, 0.6]
    unit: MW
    basis: judgement
    confidence: low
  - parameter: Radiator emitting area allowance
    old: unspecified
    new: 1000
    range: [500, 1500]
    unit: m2
    basis: calculation
    confidence: low
  - parameter: Phase-0 crew visits
    old: Quarterly or annual
    new: 0
    range: [0, 0]
    unit: visits/year
    basis: judgement
    confidence: high
  - parameter: Funded demonstration life
    old: 30
    new: 12
    range: [10, 15]
    unit: year
    basis: judgement
    confidence: low
  - parameter: Station development and acquisition allowance excluding deployment and generation
    old: 10000000000
    new: 12000000000
    range: [8000000000, 18000000000]
    unit: USD
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-1
    flow: data
    value: 0.01-0.1 Mbit/s average planning and assay traffic
    in_bom: true
  - with: bom-0-2
    flow: mass
    value: 300 t/year reference concentrate production
    in_bom: true
  - with: bom-0-4
    flow: mass
    value: 200-450 t/year received concentrate
    in_bom: true
  - with: bom-0-4
    flow: propellant
    value: 100-200 t/year EP propellant procurement supporting feed delivery
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0.5-1.5 MW installed allocation
    in_bom: true
  - with: bom-0-6
    flow: mass
    value: 0 t/year committed water and 0-15 t/year exploratory capture allowance
    in_bom: true
  - with: bom-0-7
    flow: other
    value: 1 accountable configuration and stage-gate authority
    in_bom: true
  - with: Phase-1 SE-L1 assembly node
    flow: mass
    value: 20-60 t/year accepted alloy demonstration deliveries
    in_bom: false
  - with: Earth operations
    flow: data
    value: 0.1-1 Mbit/s average and 10-100 Mbit/s burst
    in_bom: false
  - with: Station residue storage
    flow: mass
    value: 75 t/year reference residues and off-spec material
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-3
    quantity: 1 gated uncrewed demonstrator
    unit_cost_usd: [8000000000, 18000000000]
    rationale: Replace the unclosed industrial refinery with a qualified narrow-product demonstrator and include precursor development once.
  - action: remove
    item: Phase-0 crew visits and habitation
    quantity: All Phase-0 crew systems
    unit_cost_usd: [0, 0]
    rationale: No crew transport or habitation program is authorized and no defensible cost credit is established.
  - action: add
    item: Asteroid-side beneficiation and packaging scope
    quantity: 1 staged capability
    unit_cost_usd: [300000000, 1000000000]
    rationale: Delivered concentrate requires assay separation reject handling and compatible cargo containers.
  - action: add
    item: Station launch transfer assembly and checkout
    quantity: 1 deployment campaign
    unit_cost_usd: [1000000000, 5000000000]
    rationale: Station acquisition does not include an established deployment architecture.
  - action: add
    item: Product transfer to SE-L1
    quantity: 2 preliminary cargo vehicles
    unit_cost_usd: [150000000, 400000000]
    rationale: Phase-1 alloy deliveries require a separately qualified transport task.
  - action: add
    item: Earth-supplied Phase-1 fallback
    quantity: 1 package of 100 t delivered hardware
    unit_cost_usd: [1000000000, 3000000000]
    rationale: Protect the initial Phase-1 demonstration against process or asteroid-logistics failure.
  - action: split
    item: bom-0-5
    quantity: Initial station allocation and conditional industrial expansion
    unit_cost_usd: [0, 0]
    rationale: This is an accounting split only and generation hardware pricing remains subject to independent reassessment.
  - action: keep
    item: bom-0-6
    quantity: Separate gated propellant-production scope
    unit_cost_usd: [300000000, 1000000000]
    rationale: Propellant hardware is not duplicated inside the station and deployment requires a customer and measured water yield.
open_questions:
  - Does Phase 1 require enough Fe-Ni alloy to justify a dedicated station?
  - Are PV blanket masses already included in collector masses?
  - Which target and station orbit minimize combined feed and product delivery cost?
  - Can representative feed achieve the assumed concentration grade and metal recovery?
  - Can the selected process meet customer quality and autonomous availability requirements at partial gravity?
  - What is the first indigenous-feed delivery date and how is station startup supplied?
  - What are supplier-informed costs for generation station deployment EP propellant and Earth-to-L1 delivery?
  - Can iodine propulsion meet the required power throughput and lifetime?
  - Who owns qualification acceptance configuration control and fallback authorization?
  - What changes follow from the unavailable rq-0-18 rq-0-28 rq-0-29 rq-0-47 and rq-0-48 records?
```
