---
phase: phase-0
item: bom-0-3
round: 1
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T18:46:27.951Z
seconds: 274.023
---

# 1. Findings

## Assessment basis

**The present specification is not a closed industrial design.** Its throughput, transportation, power, maintenance concept and Phase 1 demand were developed on incompatible assumptions.

I recommend treating Phase 0 as a **materials-processing demonstration**, with approximately **200–600 t/year of delivered concentrate**, not a 50,000 t/year refinery. Retain 50,000 t/year only as an **unfunded expansion objective**, conditional on a different logistics architecture and a validated process.

Unless stated otherwise:

- A tonne is \(1,000\ \mathrm{kg}\).
- Annual rates are calendar-year averages, including downtime.
- Costs are rough-order-of-magnitude **2026 USD**, not supplier estimates.
- Station mass excludes separate transportation vehicles and separately procured generating arrays.
- “Throughput” means **feed entering the station**, not saleable product.
- The proposed initial product is **native Fe–Ni alloy**, not aluminum or solar-grade silicon.
- Feedstock composition and recoverability remain assumptions requiring assay and beneficiation tests.

### P0-F01 — Transport capacity versus station throughput

**Verdict: agree with the closure failure; partly disagree with the trip-time derivation.**

The finding correctly identifies a very large shortfall. However, applying the loaded spacecraft mass throughout both legs overstates flight time: the outbound vehicle is substantially lighter. Conversely, its solar-array power estimate is optimistic.

At 1 AU, using 30% cell efficiency and an 80% installed-system factor:

\[
P=A(1,361\ \mathrm{W/m^2})(0.30)(0.80)
\]

For \(A=300–500\ \mathrm{m^2}\):

\[
P \approx 98–163\ \mathrm{kW}
\]

Higher-performance assumptions might reach approximately 200 kW; 250 kW requires especially favorable area and efficiency definitions.

For electric propulsion:

\[
T=\frac{2\eta P}{v_e}
\]

With \(\eta=0.60\), \(P=150\ \mathrm{kW}\), and \(v_e=20,000\ \mathrm{m/s}\):

\[
T=9\ \mathrm{N}
\]

A representative two-leg calculation illustrates the problem:

- Dry vehicle: 80 t.
- Delivered cargo: 200 t.
- Each leg: \(4\ \mathrm{km/s}\).
- Exhaust velocity: \(20\ \mathrm{km/s}\).
- Propellant acquired initially; none replenished at the asteroid.

Inbound propellant:

\[
m_{p,\mathrm{in}}=(80+200)\left(e^{4/20}-1\right)=62\ \mathrm{t}
\]

Outbound propellant, carrying the inbound propellant:

\[
m_{p,\mathrm{out}}=(80+62)\left(e^{4/20}-1\right)=31\ \mathrm{t}
\]

Total thrusting time:

\[
t=\frac{m_pv_e}{T}
=\frac{93,000\ \mathrm{kg}\times20,000\ \mathrm{m/s}}{9\ \mathrm{N}}
\approx6.6\ \mathrm{years}
\]

At 80% thrust availability, that becomes approximately **8.2 calendar years**, before additional operational delays.

For 15 vehicles:

\[
\dot m=\frac{15(200\ \mathrm{t})}{8.2\ \mathrm{yr}}
\approx365\ \mathrm{t/yr}
\]

Allowing for power, payload, trajectory and availability variation, **approximately 200–600 t/year** is a reasonable planning envelope—not a validated fleet schedule.

At this representative performance, 50,000 t/year would require approximately:

\[
N=\frac{50,000(8.2)}{200}\approx2,050\ \mathrm{vehicles}
\]

Alternatively, keeping 15 vehicles would require roughly a hundredfold cadence improvement. Scaling the representative power alone gives about **20 MW per vehicle**, which is an entirely different vehicle, including its power structure, thrusters, cooling and docking dynamics.

**Proposed change:** Reduce Phase 0 station feed throughput to 200–600 t/year. Use **15**, not 10, transportation vehicles consistently. Require integrated trajectory, propellant and lifetime analysis before approving station construction.

A steady-state rate also does not describe startup: deliveries may take years to arrive unless feed is prepositioned or much more accessible targets are selected.

---

### P0-F02 — Mining rate, duty cycle and concentration

**Verdict: agree.**

The two excavation figures can coexist only if one is a peak excavation rate and the other an annual target.

For 1,000 t/year per robot:

\[
D=\frac{1,000}{(2–5)(8,760)}=2.3–5.7\%
\]

Thus, “continuous excavation” cannot mean continuous year-round operation at the stated annual target.

For the revised demonstration, I propose this **reference mass balance**, explicitly conditional on suitable feedstock:

| Stage | Reference rate | Definition |
|---|---:|---|
| Excavated material | 10,000 t/year | Fleet total |
| Local beneficiation rejects | 9,700 t/year | Remain at mining site |
| Concentrate shipped | 300 t/year | 3% mass yield; approximately 33:1 reduction |
| Station feed | 300 t/year | After transport; excludes separately supplied propellant |
| Fe–Ni product | 225 t/year | Assumed 75% product yield |
| Station residues and captured volatiles | 75 t/year | Stored, recycled or separately dispositioned |

The implied original recoverable-metal fraction is approximately:

\[
\frac{225}{10,000}=2.25\%
\]

That is an **assumed target-selection criterion**, not a measured asteroid resource.

For 20 robots and the reference excavation rate:

\[
D=\frac{10,000}{20(2–5)(8,760)}=1.1–2.9\%
\]

This low utilization reflects a logistics-limited demonstration. It is not justification for procuring 20 robots immediately.

A reasonable coupled envelope is:

- Excavation: **5,000–15,000 t/year**.
- Concentrate mass yield: **2–6%**, constrained so shipped material remains **200–600 t/year**.
- Product yield from concentrate: **60–85%**.
- Product: approximately **120–510 t/year**.

These endpoints cannot all be combined independently.

**Proposed change:** Specify peak rate, scheduled duty cycle, beneficiation recovery and concentrate grade separately. Stage robot procurement. Do not use a presumed concentration ratio to claim closure before representative-feed tests.

---

### P0-F03 — Station power

**Verdict: agree that the stated mixed-product refinery is not powered; partly disagree with treating feed mass as product mass.**

Energy must be assigned by process and product yield. Melting native alloy is very different from reducing aluminum oxide or producing semiconductor feedstock.

The following are screening values, not qualified space-process performance:

| Process | Energy basis | Screening requirement | Power if producing 50,000 t/year |
|---|---|---:|---:|
| Heat and melt native Fe–Ni | Per kg product | Approximately 0.3–0.5 kWh/kg ideal thermal; 0.5–1.5 kWh/kg practical melting | 2.9–8.6 MW |
| Produce aluminum from prepared oxide feed | Per kg Al | Approximately 15–25 kWh/kg for an expanded process boundary | 86–143 MW |
| Produce metallurgical silicon | Per kg Si | Approximately 12–20 kWh/kg | 68–114 MW |
| Produce solar-grade silicon | Per kg purified Si | Provisionally 60–200 kWh/kg, strongly process-dependent | 342–1,142 MW |

For example:

\[
P=\frac{50\times10^6\ \mathrm{kg/yr}\times15\ \mathrm{kWh/kg}}
{8,760\ \mathrm{h/yr}}
=85.6\ \mathrm{MW}
\]

These industrial values **must not be relabeled as demonstrated molten-regolith-electrolysis performance**. Aluminum extraction from asteroid minerals requires a complete separation/reduction flowsheet, including reagents, anodes and recycling.

For the proposed native-metal demonstration, use **0.7–2 kWh/kg of station feed**, including process heating and modest refining:

\[
P_\mathrm{process}
=\frac{300,000(0.7–2)}{8,760}
=24–68\ \mathrm{kW}
\]

Add approximately **0.1–0.3 MW** for handling, controls, thermal equipment, communications and operating margin. Provision **0.5–1.5 MW installed electrical capacity**, with batch operation where useful.

Direct solar heat can reduce electrical consumption, but requires its own collectors, pointing, shielding and thermal interfaces. It is not free capacity.

**Proposed change:** Allocate station generation explicitly from **bom-0-5**. Defer oxide reduction and solar-grade silicon. Do not retain a 4–5 MW expansion backbone as if it were sufficient for a 50 kt/year mixed-product refinery.

---

### P0-F10 — Crew transport and habitation

**Verdict: agree.**

**Phase 0 should be uncrewed.** Remove quarterly and annual crew-visit assumptions, habitat and life-support requirements from the baseline.

At Sun–Earth L4/L5, Earth distance is approximately 1 AU:

\[
t_\mathrm{light}=\frac{1.496\times10^{11}\ \mathrm{m}}
{3.00\times10^8\ \mathrm{m/s}}
\approx499\ \mathrm{s}
\]

That is about **8.3 minutes one way**, not an Earth-near servicing environment. Crew visits require deep-space vehicles, radiation protection, abort provisions and substantial logistics not present in this BOM.

Provide robotic inspection, exchangeable process cartridges, isolation valves, redundant controls and safe shutdown. Reserve future docking geometry if inexpensive, but **do not describe structural provisions alone as human-rating**.

**Proposed change:** No crew systems in Phase 0. Any later crewed configuration requires a separately approved architecture and budget.

---

### P0-F15 — Conclusions not incorporated into specifications

**Verdict: partly.**

The supplied material demonstrates contradictions between the station specification and three detailed conclusions. It does **not** provide enough evidence to verify “eight of nine” across the entire repository. Several conclusions are named but not supplied.

Moreover, conclusions should be written back **after technical correction**, not automatically accepted as authoritative.

| Conclusion | Station-specification disposition |
|---|---|
| **rq-0-11: gravity zones** | Adopt a centrifuged primary melting/separation module as the leading candidate. Do not accept the claimed 10–15 t penalty or reduced contingency without structural and process validation. Reserve approximately **20–80 t** for centrifuge-associated structure, containment, bearings, drives and interfaces; this is a planning allowance within the station mass range. |
| **rq-0-14: propellant sequencing** | Retain modular interfaces, but replace the **25 kt/year deployment gate** with measured water yield, customer demand and a separate energy budget. Charge electrolysis/liquefaction hardware to **bom-0-6**, not twice. Initially allow **0–15 t/year** of captured water, dependent on feed. |
| **rq-0-18: human-rating** | Detailed conclusion unavailable. For this station, retain robotic servicing interfaces; no crew safety claim or crew accommodation. Tug requirements must be assessed separately. |
| **rq-0-28: ISRU costing** | Detailed conclusion unavailable. Require a costed WBS separating development, launch, arrays, transport, processing consumables, spares and operations. No numerical saving can be justified from the supplied title. |
| **rq-0-29: governance** | Detailed conclusion unavailable. Require ownership, operating authority, safety decisions and product acceptance through **bom-0-7**; no station mass or power change established. |
| **rq-0-30: cryogenics** | Reserve a thermally isolated expansion location; do not install a 700–900 t propellant inventory during the demonstration. Revise the quantitative claims below before sizing hardware. |
| **rq-0-47: sunshield** | Detailed conclusion unavailable. Include process/cryogenic view-factor requirements and shield accommodation; deployment hardware remains conditional on an approved thermal model. |
| **rq-0-48: MLI degradation** | Detailed conclusion unavailable. Require end-of-life heat-leak margins, contamination control and replaceable insulation/shields. No supplied evidence establishes a degradation rate. |

Two numerical corrections materially affect these decisions:

**Electrolysis product accounting.** At 50–60 kWh/kg of hydrogen, 500 kW produces:

\[
m_{\mathrm{H_2}}
=\frac{500(8,760)}{50–60}
=73–88\ \mathrm{t/yr}
\]

Water electrolysis produces eight kilograms of oxygen per kilogram of hydrogen. Combined production is therefore **approximately 660–790 t/year**, before downtime, liquefaction and losses—not 70–90 t/year of combined propellant. Also, **100 t H₂ requires 800 t O₂ stoichiometrically**, not 600 t. A 6:1 engine mixture is possible, but leaves excess oxygen.

**Cryocooler performance.** For a 20 K cold stage rejecting at 300 K:

\[
COP_\mathrm{Carnot}=\frac{20}{300-20}=0.071
\]

A screening actual COP of 10–20% of Carnot implies **approximately 1–6 kW electrical** for a 15–40 W cold load, before the 80 K shield and other loads. Consequently, **700 W per tank is not a defensible baseline without a demonstrated cooler specification**.

Ground zero-boiloff testing and space cryocooler heritage do not establish a flight-proven, repeatedly refilled 100 t LH₂ depot. Subcooling is useful, but the quoted 190-day margin cannot be accepted without a transient thermal model.

Finally, the stated simple propellant payback arithmetic does not yield 5–10 years: $500 million divided by the claimed $0.5–2 billion/year avoided purchases gives roughly **0.25–1 year**, before operating costs and actual utilization. This illustrates why a demand-based lifecycle model is required.

---

### P0-F18 — Metallurgy fallback

**Verdict: partly.**

I agree that the station lacks a qualified industrial process and a costed fallback. I disagree that pure-microgravity metallurgy has been shown to be fundamentally impossible. Crucibles, wetting control, electromagnetic forces, filters and centrifugal separation provide alternatives to freely levitating an entire industrial melt.

Likewise, partial gravity is promising, not proven to solve all separation and heat-transfer problems.

For a 50 m rotation radius:

\[
a=\omega^2r
\]

At 1.4 rpm:

\[
a=\left(1.4\frac{2\pi}{60}\right)^2(50)
=1.07\ \mathrm{m/s^2}
\approx0.11g
\]

The proposed 0.05–0.15g range requires approximately **0.95–1.64 rpm** at that radius.

Whether gravity dominates depends on scale. For an illustrative density difference of \(3,000\ \mathrm{kg/m^3}\), interfacial tension \(1\ \mathrm{N/m}\), and \(0.1g\):

\[
Bo=\frac{\Delta\rho\,g_\mathrm{eff}L^2}{\gamma}
\]

- At \(L=0.1\ \mathrm{m}\), \(Bo\approx29\): gravity is important.
- At \(L=0.01\ \mathrm{m}\), \(Bo\approx0.29\): interfacial effects remain important.

Thus, a single gravity threshold cannot guarantee slag-droplet removal.

**Proposed architecture:** Nonrotating receiving/beneficiation core; enclosed rotating melting/separation cartridge; nonrotating product handling and optional experimental vacuum refining. No dedicated solar-grade silicon module.

**Gate before production-station commitment:**

1. Representative-feed ground campaign and a flight centrifuge demonstration.
2. At least 100 representative processing cycles.
3. Approximately **≥70% saleable alloy yield from accepted concentrate**.
4. **≤2 kWh/kg feed** for the selected process boundary.
5. Demonstrated autonomous recovery from relevant faults and manageable consumable use.

Allow **$0.5–1 billion** for the combined precursor program, as a judgement-based planning range. Its precise scope requires study.

**Costed fallback:** Purchase Earth-produced metal, silicon and finished PV components for a deliberately limited Phase 1 demonstrator. For **100 t delivered to L1**, an assumed transportation procurement allowance of **$10,000–30,000/kg** gives:

\[
100,000\ \mathrm{kg}\times \$10,000–30,000/\mathrm{kg}
=\$1–3\ \mathrm{billion}
\]

This is a contingency allowance, not a quoted transport price; manufacturing and assembly are additional. Trigger it if the processing gate fails or if asteroid-product delivery misses the Phase 1 critical path.

Lunar processing remains a possible later alternative, but it is **not a cheap, flight-proven fallback** to orbital metallurgy.

---

### P0-F19 — Phase 1 demand and delivery

**Verdict: agree.**

Assuming the two supplied categories are additive:

\[
1,000(69–1,850)\ \mathrm{kg}=69–1,850\ \mathrm{t}
\]

\[
5,000(690–45,000)\ \mathrm{kg}=3,450–225,000\ \mathrm{t}
\]

Combined mass is **3,519–226,850 t**. If blankets are already included in collector mass, this addition double-counts them. That boundary must be resolved first.

Even spread over ten years, the additive envelope implies approximately **350–22,700 t/year of hardware**, not necessarily raw feedstock. Native alloy output does not satisfy demand for purified silicon, junction fabrication, encapsulation, conductors, electronics or finished blankets.

No binding delivery date or material breakdown is supplied. I therefore propose an explicitly **provisional Phase 1 demonstration interface**, not an invented full-phase requirement:

| Material/service | Provisional demand | Acceptance | Delivery |
|---|---:|---|---|
| Structural Fe–Ni alloy | 20 t/year initially | Customer-approved alloy chemistry, cleanliness and mechanical-property coupons | L1 assembly node |
| Al, Cu and specialty alloys | Unresolved; Earth-supplied initially | Component-specific specifications | L1 |
| Solar-grade silicon or finished cells/blankets | Unresolved; Earth-supplied initially | Qualified PV/component specifications | L1 |
| Qualification samples | 0.1–1 t/year, included in alloy delivery | Traceable assay and processing history | L1 or Earth-return service |

Proposed alloy delivery starts **no earlier than commissioning plus two years**, subject to transfer qualification. There is no supported calendar date in the supplied evidence.

Add a product-transfer service: a preliminary allowance of **two 30–60 t-payload EP vehicles**, each approximately **0.2–0.5 MW**, targeting **20–60 t/year** delivered. This is not trajectory-validated; transfer duration and orbit selection may change the fleet.

**Proposed change:** Do not freeze L4/L5 before jointly optimizing asteroid access and L1 delivery. L4/L5 stability does not imply low transportation cost or convenient maintenance.

# 2. Revised specification

| Parameter | Old → proposed | Basis | Confidence |
|---|---|---|---|
| Phase 0 purpose | Industrial refinery → uncrewed processing and logistics demonstration | Closure assessment | High |
| Station feed | 50,000 → **200–600 t/year**, reference 300 | Fleet calculation | Medium |
| Initial product | Al, Fe, Ni and solar-grade Si → **qualified native Fe–Ni alloy** | Process maturity and power | Medium |
| Saleable output | Unspecified → **120–510 t/year**, reference 225 | Assumed 60–85% yield | Low |
| Excavated mass supporting station | Unspecified → **5,000–15,000 t/year** | Coupled beneficiation scenario | Low |
| Electrical allocation | 1–2.5 → **0.5–1.5 MW installed**, approximately 0.15–0.4 MW annual average | Process calculation plus auxiliaries | Medium |
| Installed solar generation source | Unallocated → station allocation within **bom-0-5** | Interface correction | High |
| Processing gravity | Unspecified → **0.05–0.15g candidate**, with adjustable test capability | Rotation physics; separation unqualified | Medium for mechanics; low for process adequacy |
| Rotation geometry | Unspecified → **40–60 m radius**, approximately **0.9–1.8 rpm** | \(a=\omega^2r\) | High |
| Initial dry mass | 400–500 t → **200–500 t planning allowance** | Smaller process line, substantial robotic/thermal infrastructure | Low |
| Industrial full-build mass | 800–1,000 t → **withdrawn pending industrial design** | No validated equipment or radiator inventory | High |
| Location | L4/L5 fixed → **trajectory-selected; L4/L5 remains a candidate** | Logistics and demand | Medium |
| Crew | Periodic visits and habitat → **none in Phase 0** | Scope and safety closure | High |
| Propellant role | Ambiguous/integrated → capture measured volatiles; electrolysis and cryogenics under bom-0-6 | Avoid double counting | High |
| Initial water capture | Unspecified → **0–15 t/year** | Feed-dependent allowance | Low |
| Design life | 30 years → **10–15 year funded demonstration service**, replaceable modules; longer platform life an objective | Reliability judgement | Low |
| Station budget | $10B, medium confidence → **$8–16B**, low confidence | ROM, including precursor development and 40–60% contingency; excludes separately listed tugs, generation and propellant plant | Low |

The mass and cost ranges are **budgetary envelopes**, not demonstrated savings. Shrinking throughput does not proportionally shrink development cost.

The **100 MW generation line should become a phased expansion allowance**, not a requirement to deploy all 100 MW during the pilot. Initial phase-wide demand is more plausibly several MW, but cannot be closed until mining and bom-0-6 loads are specified.

### Published and flight-heritage anchors

- **NASA/NREL, *Solar Cell and Array Technology*, NASA/TP-2017-219489:** supports distinguishing cell efficiency from installed-array output.
- **Goebel and Katz, *Fundamentals of Electric Propulsion*, JPL Space Science and Technology Series, 2008:** thrust, efficiency and propellant relations used above.
- **ESA ISS Electromagnetic Levitator; JAXA Electrostatic Levitation Furnace:** flight heritage for small-sample materials processing, not continuous industrial refining.
- **International Aluminium Institute, primary-aluminum smelting energy-intensity statistics:** contemporary electrolysis is approximately 13–15 kWh/kg Al, before expanding the process boundary.
- **IEA PVPS Task 12, *Life Cycle Inventories and Life Cycle Assessments of Photovoltaic Systems*, 2020:** silicon/PV energy depends strongly on process and system boundary.
- **DOE, *Technical Targets for Proton Exchange Membrane Electrolysis*:** approximately 50–60 kWh/kg H₂ is an appropriate current-system screening range.
- **NASA, *Cryogenic Fluid Management Technology Roadmap*, 2015:** distinguishes storage, transfer, liquefaction and cryogenic-fluid-management development needs.

The proposed mass, costs, beneficiation yield and transfer fleet are **engineering estimates**, not values established by these references.

# 3. Interfaces

The reference operating point is **300 t/year feed and 225 t/year alloy product**.

| Interface | Proposed exchange | Closure status |
|---|---|---|
| **bom-0-1 prospectors → station/mining** | Composition, mineralogy, orbit and uncertainty database; assay information for every candidate source | In BOM, but remote spectra cannot certify concentrate grade |
| **bom-0-2 mining → bom-0-4 transport → station** | 10,000 t/year excavation produces 300 t/year shipped concentrate; 9,700 t/year local rejects | Beneficiation plant and reject handling omitted |
| **bom-0-4 raw-material fleet → station** | 200–600 t/year feed; reference 300 | Existing fleet must be respecified and scheduled |
| **bom-0-5 → station** | 0.5–1.5 MW installed allocation; approximately 0.15–0.4 MW average load | Generation exists in BOM; distribution and allocation unspecified |
| **bom-0-5 → raw-material vehicles** | Approximately 1.5–3 MW aggregate onboard generation for 15 vehicles | Clarify whether vehicle price already includes arrays |
| **Station → bom-0-6** | 0–15 t/year captured water; impurity and yield data | Water treatment and storage interfaces required |
| **bom-0-6 → station** | No mandatory initial propellant supply | Deployment conditional on demand and feed |
| **Imported EP propellant → bom-0-4** | Reference approximately **140 t/year** krypton/iodine-equivalent mass, for 300 t/year cargo under the representative trajectory | **Supply and lifecycle budget omitted** |
| **Station → L1 assembly** | Initially 20 t/year accepted alloy; potential 20–60 t/year service envelope | **Product-transfer capability omitted** |
| **Imported EP propellant → product-transfer fleet** | Preliminary **3–20 t/year** | **Omitted; trajectory-dependent** |
| **Station → storage** | Reference 205 t/year product accumulation if only 20 t/year is delivered; 75 t/year residues | Storage and disposition need explicit funding |
| **bom-0-7 ↔ station** | Operating authority, safety decisions, materials traceability and customer acceptance | Governance scope incomplete |

Water-derived H₂/O₂ **does not close the existing krypton/iodine Hall-thruster supply interface**. Switching propellant species requires a propulsion redesign.

Communications planning allowance: **0.1–1 Mbit/s average**, **10–100 Mbit/s burst capability**, buffered for outages. This is a design estimate; latency requires local fault management rather than continuous Earth teleoperation.

# 4. Missing items or scope

1. **On-asteroid beneficiation:** crushing, sorting, separation, concentrate packaging and assay.
2. **Bulk receiving and storage:** feed containers, contamination control, product stockpile and residue containment.
3. **L4/L5-to-L1 product transportation:** separate from the fleet already needed for raw-material delivery.
4. **EP propellant procurement and replenishment:** hundreds of tonnes over the demonstration, with compatible tanks and handling.
5. **Robotic assembly and servicing:** inspection, cartridge exchange, manipulators, spares and repair logistics.
6. **Power distribution and thermal rejection:** generation capacity alone does not provide buses, converters, radiator loops or process heat.
7. **Qualification/metrology:** chemical assay, mechanical testing, witness samples and product traceability.
8. **Precursor development program:** centrifuged processing, representative-feed testing and autonomous fault recovery.
9. **Station emplacement and commissioning transportation:** not automatically included in mining cargo vehicles.
10. **Earth-sourced Phase 1 contingency supply:** procurement and delivery to L1.
11. **Lifecycle operations funding:** replacements, communications, navigation, consumables, insurance and end-of-life disposition.

No crew vehicles, habitat or life support should be silently assumed.

# 5. Remaining disagreements and open questions

- **Siting:** L4/L5 may be dynamically attractive, but asteroid co-location or an Earth-accessible processing orbit may dominate total logistics cost. Target trajectories must decide.
- **Partial gravity:** centrifuging is a credible baseline candidate, not proof that 0.05–0.15g is sufficient for all slag chemistries and droplet sizes.
- **Microgravity refinement:** beneficial material-quality effects do not necessarily improve plant productivity or lifecycle cost.
- **Resource mix:** water-rich carbonaceous feed and high-grade native-metal concentrate should not be assumed to be the same stream.
- **Phase 1 scope:** the collector/PV mass envelope is too broad, and possibly overlapping, to justify any industrial capacity.
- **Metal usefulness:** Fe–Ni may demonstrate resource extraction while offering limited value to a PV-dominated deployment architecture.
- **Autonomy:** flight heritage exists for autonomous spacecraft, not unattended, continuously operating molten-metal plants with industrial consumable handling.
- **Cost:** $10B might support a carefully bounded demonstrator; it is not evidence that a megatonne-class platform, industrial refinery and deep-space crew infrastructure are affordable together.
- **Cryogenics:** passive shielding and active cooling are credible technologies, but long-duration bulk LH₂ storage and transfer still require system-level qualification.
- **Fallback scale:** Earth supply is viable for a limited demonstrator, not automatically affordable for the upper Phase 1 mass estimate.

```yaml
item: bom-0-3
model: GPT-5.2
findings:
  - id: P0-F01
    verdict: partly
    summary: The transport shortfall is real, but trip time must account for unequal leg masses and installed array performance.
    proposed_change: Reduce initial station feed to 200-600 t/yr and require a trajectory-validated 15-vehicle logistics plan.
  - id: P0-F02
    verdict: agree
    summary: Peak excavation rate, annual utilization and concentration yield are not consistently defined.
    proposed_change: Adopt a reference chain of 10000 t/yr excavated, 300 t/yr concentrate transported and 225 t/yr alloy produced.
  - id: P0-F03
    verdict: partly
    summary: The mixed-product industrial refinery is underpowered, although power must be calculated from product yield rather than treating all feed as product.
    proposed_change: Limit initial production to native Fe-Ni alloy and allocate 0.5-1.5 MW installed electrical capacity from bom-0-5.
  - id: P0-F10
    verdict: agree
    summary: Periodic crew visits require transportation and safety infrastructure absent from the BOM.
    proposed_change: Make Phase 0 uncrewed and remove habitat and crew-visit assumptions.
  - id: P0-F15
    verdict: partly
    summary: Supplied conclusions contradict the specification, but the repository-wide eight-of-nine claim cannot be verified and several conclusions contain quantitative errors.
    proposed_change: Incorporate corrected gravity and modular propellant requirements while withholding unsupported human-rating, cryogenic and cost claims.
  - id: P0-F18
    verdict: partly
    summary: A qualified process and fallback are missing, but neither microgravity impossibility nor partial-gravity success has been demonstrated.
    proposed_change: Qualify a centrifuged processing cartridge before station commitment and reserve an Earth-supplied 100 t L1 demonstrator fallback.
  - id: P0-F19
    verdict: agree
    summary: Phase 1 mass, composition, schedule and delivery requirements are not tied to station output.
    proposed_change: Establish a provisional 20 t/yr structural-alloy delivery interface at L1 and add product-transfer capacity.
revised_spec:
  - parameter: annual_station_feed
    old: 50000
    new: 300
    range: [200, 600]
    unit: t/yr
    basis: calculation
    confidence: medium
  - parameter: annual_alloy_product
    old: unspecified
    new: 225
    range: [120, 510]
    unit: t/yr
    basis: judgement
    confidence: low
  - parameter: supporting_excavation
    old: unspecified
    new: 10000
    range: [5000, 15000]
    unit: t/yr
    basis: judgement
    confidence: low
  - parameter: concentrate_mass_yield
    old: unspecified
    new: 3
    range: [2, 6]
    unit: percent
    basis: judgement
    confidence: low
  - parameter: installed_station_electrical_capacity
    old: 1-2.5
    new: 1
    range: [0.5, 1.5]
    unit: MW
    basis: calculation
    confidence: medium
  - parameter: average_station_electrical_load
    old: unspecified
    new: 0.25
    range: [0.15, 0.4]
    unit: MW
    basis: calculation
    confidence: medium
  - parameter: native_metal_process_energy_per_feed_mass
    old: unspecified
    new: 1.2
    range: [0.7, 2]
    unit: kWh/kg
    basis: judgement
    confidence: low
  - parameter: primary_processing_acceleration
    old: unspecified
    new: 0.1
    range: [0.05, 0.15]
    unit: g
    basis: judgement
    confidence: low
  - parameter: centrifuge_radius
    old: unspecified
    new: 50
    range: [40, 60]
    unit: m
    basis: calculation
    confidence: medium
  - parameter: centrifuge_rotation_rate
    old: unspecified
    new: 1.4
    range: [0.9, 1.8]
    unit: rpm
    basis: calculation
    confidence: high
  - parameter: initial_station_dry_mass
    old: 400-500
    new: 350
    range: [200, 500]
    unit: t
    basis: judgement
    confidence: low
  - parameter: funded_demonstration_service_life
    old: 30
    new: 12
    range: [10, 15]
    unit: yr
    basis: judgement
    confidence: low
  - parameter: initial_water_capture
    old: unspecified
    new: 5
    range: [0, 15]
    unit: t/yr
    basis: judgement
    confidence: low
  - parameter: station_program_budget
    old: 10000000000
    new: 12000000000
    range: [8000000000, 16000000000]
    unit: USD_2026
    basis: judgement
    confidence: low
  - parameter: initial_L1_alloy_delivery
    old: unspecified
    new: 20
    range: [20, 60]
    unit: t/yr
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-1
    flow: data
    value: "Assay and orbit information for every candidate source and accepted feed lot"
    in_bom: true
  - with: bom-0-2
    flow: mass
    value: "300 t/yr concentrate from 10000 t/yr reference excavation"
    in_bom: true
  - with: bom-0-4
    flow: mass
    value: "300 t/yr inbound concentrate; planning range 200-600 t/yr"
    in_bom: true
  - with: bom-0-5
    flow: power
    value: "1 MW installed station allocation; range 0.5-1.5 MW"
    in_bom: true
  - with: bom-0-6
    flow: mass
    value: "0-15 t/yr captured water"
    in_bom: true
  - with: bom-0-6
    flow: propellant
    value: "0 t/yr mandatory initial H2/O2 supply"
    in_bom: true
  - with: bom-0-7
    flow: data
    value: "Operating authority and acceptance records for every product lot"
    in_bom: true
  - with: EP_propellant_supply
    flow: propellant
    value: "Approximately 140 t/yr for reference raw-material logistics"
    in_bom: false
  - with: Phase_1_product_transfer
    flow: mass
    value: "20 t/yr initial alloy delivery to L1; service objective 20-60 t/yr"
    in_bom: false
  - with: Phase_1_product_transfer
    flow: propellant
    value: "3-20 t/yr imported EP propellant"
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-3
    quantity: "1 uncrewed processing demonstrator"
    unit_cost_usd: [8000000000, 16000000000]
    rationale: Bound initial scope to transport-supported native-metal production and include precursor development and contingency.
  - action: split
    item: bom-0-5
    quantity: "Initial generation allocations plus conditional 100 MW expansion"
    unit_cost_usd: [0, 0]
    rationale: This is an allocation change only and generating-system prices require separate reassessment.
  - action: resize
    item: bom-0-2
    quantity: "Up to 20 robots procured in stages"
    unit_cost_usd: [50000000, 50000000]
    rationale: Retain the supplied unit-cost placeholder but stage procurement to match excavation and transport demand.
  - action: keep
    item: bom-0-4
    quantity: "15 raw-material vehicles pending trajectory closure"
    unit_cost_usd: [133000000, 133000000]
    rationale: Retain the BOM quantity and cost placeholder without endorsing its vehicle design or lifecycle closure.
  - action: add
    item: Phase_1_product_transfer
    quantity: "2 vehicles with 30-60 t payload each"
    unit_cost_usd: [150000000, 400000000]
    rationale: Provide separately budgeted product delivery to L1 without consuming the raw-material fleet allocation.
  - action: add
    item: Earth_supplied_Phase_1_fallback
    quantity: "1 contingent transportation package for 100 t delivered to L1"
    unit_cost_usd: [1000000000, 3000000000]
    rationale: Preserve a limited Phase 1 demonstrator if asteroid processing or delivery fails qualification.
  - action: remove
    item: Phase_0_crew_habitat_and_visit_assumptions
    quantity: "All baseline crew accommodation and periodic crew visits"
    unit_cost_usd: [0, 0]
    rationale: No crew transportation or safety infrastructure is funded in the phase.
open_questions:
  - Which asteroid targets support the assumed concentrate grade and beneficiation recovery?
  - What trajectories and startup schedule establish the actual annual delivery rate?
  - Does Phase 1 collector mass already include PV blanket mass?
  - What alloy chemistry and mechanical properties will the L1 assembly customer accept?
  - Does partial gravity provide adequate slag separation at relevant viscosity and droplet size?
  - What consumables and repair frequency are required for autonomous processing?
  - Should processing be asteroid-co-located, Earth-accessible or at L4/L5?
  - What is the full krypton or iodine procurement and thruster-lifetime budget?
  - What is the Phase 1 delivery calendar and material-specific demand?
  - Can measured volatile supply justify electrolysis and cryogenic deployment?
  - What station mass, launch and thermal-control inventories support a defensible cost estimate?
```
