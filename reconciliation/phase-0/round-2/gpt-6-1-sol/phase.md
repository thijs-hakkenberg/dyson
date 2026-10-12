---
phase: phase-0
item: phase
round: 2
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:48:49.841Z
seconds: 410.965
---

# 1. Findings

## Assessment basis and principal conclusion

**The original Phase 0 is not a closed industrial system.** The first-round reconciliation correctly identifies most omissions, but it does not establish a single mass-flow, transport, power or cost baseline. Several of its proposed replacements also remain unsupported.

I recommend:

- **Phase 0A:** resource characterization, ground development and flight pathfinders.
- **Phase 0B:** a gated, uncrewed, single-resource-site industrial demonstration.
- **Reference 0B architecture:** process at a characterized NEA; deliver selected structural-metal products to a receiving node near Sun–Earth L1, or another location selected by the Phase 1 logistics study.
- **Do not commit to 50 kt/year, solar-grade silicon, production-scale chemical ISPP or self-replication in Phase 0.**

The reference case below is a **conditional engineering design**, not evidence that a suitable asteroid or commercially competitive process already exists.

### Common assumptions

| Parameter | Reference assumption |
|---|---|
| Currency | Constant 2026 USD |
| Operating horizon | Ten industrial operating years; 0A precedes this |
| Resource | Accessible native-metal-bearing material; suitability must be established by sampling |
| Mining feed | 8 kt/year nominal; 6–10 kt/year design envelope |
| Recoverable native-metal content | 20 wt% nominal; a gate condition, not a measured NEA average |
| Beneficiation | Concentrate is 25% of excavated mass, at 80 wt% metal |
| Refining recovery | 90% of concentrate metal |
| Product allocation | 70% delivered; 30% retained for local fabrication, inventory and qualification |
| Transport | Ten tugs, 250 t payload, 2 MWe available to propulsion each |
| Reference tug propulsion | \(I_{sp}=2{,}500\ \mathrm{s}\), electrical-to-jet efficiency 60% |
| Resource-site distance | Approximately 1 AU; array sizing evaluated through 1.2 AU |
| Crew | None |
| Confidence | High in conservation equations; low in resource, process, cost and trajectory assumptions |

**Ranges below are envelopes, not independent variables to combine arbitrarily.**

---

## P0-F01 — Transport capacity versus station throughput

**Verdict: partly.** The closure failure is real. The finding overstates array output somewhat and treats the entire round trip as if the spacecraft remained fully loaded.

At 1 AU:

\[
P=A\,S\,\eta_\mathrm{cell}\,f_\mathrm{packing}\,f_\mathrm{electrical}
\]

Using \(S=1{,}361\ \mathrm{W/m^2}\), efficiency 32–36%, and combined packing/electrical factor 0.75–0.90:

\[
P(300\text{–}500\ \mathrm{m^2})\approx98\text{–}220\ \mathrm{kW}.
\]

This is beginning-of-life output; useful end-of-life propulsion power is lower.

For electric propulsion:

\[
T=\frac{2\eta P}{g_0I_{sp}}.
\]

At \(I_{sp}=1{,}800\text{–}2{,}500\ \mathrm{s}\), \(\eta=0.5\text{–}0.65\), the original arrays imply approximately **4–16 N**. This is consistent with the broad thrust-per-power range of flight electric propulsion, not an independent guarantee of thruster performance.

### Reference replacement tug

For \(P=2\ \mathrm{MW}\), \(\eta=0.60\), \(I_{sp}=2{,}500\ \mathrm{s}\):

\[
v_e=24{,}525\ \mathrm{m/s},\qquad T=97.9\ \mathrm{N}.
\]

Assume:

- 60 t dry mass, including arrays;
- 250 t return cargo;
- 3 km/s outbound and 3 km/s inbound;
- both legs’ propellant initially supplied at the receiving node.

Inbound propellant:

\[
m_{p,\mathrm{in}}=310\left(e^{3000/24525}-1\right)=40.3\ \mathrm{t}.
\]

Outbound propellant, including carriage of inbound propellant:

\[
m_{p,\mathrm{out}}=(60+40.3)
\left(e^{3000/24525}-1\right)=13.1\ \mathrm{t}.
\]

Total:

\[
m_p\approx53.4\ \mathrm{t/cycle}.
\]

Ideal accumulated thrust time:

\[
t_\mathrm{thrust}=\frac{m_pv_e}{T}\approx155\ \mathrm{days}=0.43\ \mathrm{yr}.
\]

For 5 km/s each way, the same calculation gives approximately **100 t/cycle and 0.79 thrust-years**.

These are **thrust times, not mission durations**. Coast arcs, solar-power variation, rendezvous geometry, cargo handling and launch windows remain necessary. I budget **1.5–3 years per cycle**, subject to trajectory optimization.

At 80% effective fleet availability:

\[
\dot m_\mathrm{delivered}
=\frac{10(250\ \mathrm{t})(0.8)}{1.5\text{–}3\ \mathrm{yr}}
=0.67\text{–}1.33\ \mathrm{kt/yr}.
\]

The nominal two-year cycle gives **1 kt/year**.

The original arrays, applied to this same mass model, would require several to roughly fifteen accumulated thrust-years per cycle. A fleet carrying 200 t per cycle at that power cannot support 50 kt/year.

**Proposed change:** process at the asteroid and transport products, not bulk ore. Contract initially for **0.6–1.0 kt/year** delivery; retain expansion capability to approximately 1.3 kt/year. A central 50 kt/year ore-processing station would need a completely different logistics system.

---

## P0-F02 — Mining rate, duty cycle and concentration

**Verdict: agree.**

A single consistent nominal chain is:

| Stage | Nominal flow |
|---|---:|
| Excavated material | 8,000 t/year |
| Concentrate to local refinery | 2,000 t/year |
| Beneficiation rejects | 6,000 t/year |
| Metal in concentrate | 1,600 t/year |
| Qualified metal product | 1,440 t/year |
| Refinery rejects/residue | 560 t/year |
| Product delivered | 1,008 t/year |
| Product retained locally | 432 t/year |

This conserves mass:

\[
8{,}000=6{,}000+560+1{,}008+432\ \mathrm{t/yr}.
\]

For four working excavators at 2.5 t/hour:

\[
d=\frac{8{,}000}{4(2.5)(8{,}760)}=0.091.
\]

Thus the required **calendar excavation duty factor is approximately 9%**, not continuous operation. Six deployed machines provide four working positions and two service/spare positions.

The 6–10 kt/year feed envelope produces:

- concentrate: **1.5–2.5 kt/year**;
- qualified product: **1.08–1.80 kt/year**;
- delivered product at 70% allocation: **0.76–1.26 kt/year**;
- retained product: **0.32–0.54 kt/year**;
- total rejects: **4.92–8.20 kt/year**.

The upper delivery endpoint requires the faster end of the transport envelope. Otherwise excess product is stockpiled, and excavation is throttled.

**Proposed change:** replace conflicting annual and hourly targets with rated excavation capacity, calendar duty factor, feed grade, concentration yield and product recovery.

---

## P0-F03 — Refinery power

**Verdict: partly.** The mixed-product promise is unsupported, but energy per kilogram of product must not be applied indiscriminately to every kilogram of incoming ore.

Indicative delivered-process-energy allowances are:

| Route | Energy basis | Planning range |
|---|---|---:|
| Native Fe–Ni separation, melting and casting | Per kg qualified metal | 0.6–1.5 kWh/kg |
| Iron-oxide reduction | Per kg Fe product | 3–8 kWh/kg, including reductant regeneration where applicable |
| Primary aluminium from oxide | Per kg Al product | 13–20 kWh/kg electricity, plus feed preparation and heat |
| Metallurgical silicon | Per kg Si product | 11–20 kWh/kg |
| Additional solar-grade Si purification | Per kg purified Si | 20–100+ kWh/kg; strongly route-dependent |

The aluminium and silicon ranges are anchored to terrestrial industry, **not validated asteroid processes**. Native-metal melting is an engineering allowance including losses; its thermodynamic minimum is lower.

If 50 kt/year actually meant 50 kt/year of metal product:

\[
P_\mathrm{avg}=\frac{\dot m e}{8{,}760}.
\]

- Native metal at 0.6–1.5 kWh/kg: **3.4–8.6 MW**.
- Aluminium at 13–20 kWh/kg: **74–114 MW**.
- Metallurgical silicon at 11–20 kWh/kg: **63–114 MW**, before purification.

Conversely, 50 kt/year of **feed**, with only 10% recovered metal, consumes far less. The original specification never defines this distinction.

For the replacement 1.44 kt/year metal product:

\[
P_\mathrm{metal}\approx0.10\text{–}0.25\ \mathrm{MW\ average}.
\]

Feed conditioning, beneficiation, heating batches, pumps, casting, maintenance and thermal losses dominate the uncertainty. I allocate **0.5–1.5 MW average and 2.5 MW peak** for the process plant, plus site services.

**Proposed change:** native-metal recovery is the production baseline; Al and silicon are separate pilot processes. Supply the refinery from the explicitly allocated site-power line.

---

## P0-F04 — Power allocation and storage

**Verdict: partly.** The unallocated capacity and arbitrary storage are genuine problems. “No night” does not mean “no storage requirement.”

Reference allocation:

| Site/load | Available electrical capacity | Typical average |
|---|---:|---:|
| Ten transport tugs | 20 MW total | Mission-dependent; propulsion not continuously active |
| Excavation machines | 0.4 MW | 0.04–0.10 MW |
| Beneficiation/refining | 2.5 MW peak | 0.5–1.5 MW |
| Water/process pilot | 0.2 MW | 0.03–0.10 MW |
| Site communications, thermal systems, servicing | 0.5 MW | 0.2–0.4 MW |
| Receiving node | 0.3 MW | 0.05–0.15 MW |
| **Total connection capacity** | **24.3 MW** | Not the sum of simultaneously continuous loads |

Arrays must deliver these values after distance, age and conversion losses:

\[
P_\mathrm{available}
=P_\mathrm{BOL,1AU}\frac{f_\mathrm{EOL}f_\mathrm{distribution}}{r^2}.
\]

At \(r=1.2\ \mathrm{AU}\), \(f_\mathrm{EOL}=0.8\), and distribution factor 0.9:

\[
P_\mathrm{BOL,1AU}
=\frac{24.3(1.2)^2}{0.8(0.9)}
\approx49\ \mathrm{MW}.
\]

Therefore specify **35–50 MW BOL at 1 AU**, depending on selected trajectories and operating distance, rather than an unexplained 100 MW.

Storage is site-specific:

- **Mining site:** shed excavation and furnace loads during darkness; preserve approximately 100 kW critical load.
- For a selected target with 6–12 hours worst operational shadow and 80% usable storage:

\[
E=\frac{0.1\ \mathrm{MW}(6\text{–}12\ \mathrm{h})}{0.8}
=0.75\text{–}1.5\ \mathrm{MWh}.
\]

Use **1–2 MWh** after reserve and degradation allowances.
- **Receiving node:** 0.1–0.3 MWh for transients, fault recovery and orderly shutdown.
- **Tugs:** 20–100 kWh each for avionics, docking and safe mode—not propulsion.

Total fleet/site installed storage is approximately **1.3–3.3 MWh**. A target with longer shadow periods must be rejected, provided with distributed sunlight collectors, or independently resized.

**Proposed change:** delete the 200–500 MWh default; allocate power and storage geographically.

---

## P0-F05 — Array cost

**Verdict: agree with the budget criticism; partly with the claimed price evidence.**

No current supplier quotations are supplied, and I cannot verify live quotations here. Neither the original $5/W nor the first-round $30–100/W should be presented as an established market price.

A transparent planning allowance is:

| Component | Allowance |
|---|---:|
| Qualified cells and interconnects | $10–40/W |
| Substrates, deployment structure and harness | $10–35/W |
| Qualification, power electronics and integration | $10–25/W |
| **Recurring installed hardware, excluding launch** | **$30–100/W** |

These are **estimating allowances**, with low confidence. Development and delivery are separate.

At 100–200 W/kg deployed-system specific power:

\[
m_\mathrm{array}(35\text{–}50\ \mathrm{MW})=175\text{–}500\ \mathrm{t}.
\]

At a delivered-mass allowance of $3,000–12,000/kg, array transportation alone adds roughly **$15–120/W**. Thus an indicative hardware-plus-delivery envelope is **$45–220/W**, before programme-level development and reserve.

**Proposed change:** budget approximately **$1.05–5.0B recurring array hardware** and separately account for its launch mass. Obtain competitive quotations before 0B authorization.

---

## P0-F06 — Prospecting cadence

**Verdict: partly.** Twenty rendezvous annually is not credible; twenty remote observations may be entirely credible.

A 100 kg monopropellant spacecraft with a 20% propellant fraction and \(I_{sp}=230\ \mathrm{s}\) has:

\[
\Delta v=g_0I_{sp}\ln(100/80)\approx503\ \mathrm{m/s}.
\]

That does not support repeated kilometre-per-second rendezvous.

A 300 kg electric-propulsion scout with 20% propellant and \(I_{sp}=2{,}500\ \mathrm{s}\) has an ideal:

\[
\Delta v\approx5.5\ \mathrm{km/s},
\]

before reserve, tank, power and trajectory limitations.

**Proposed change:**

- Purchase remote-survey data and observing time from existing/planned astronomical infrastructure, including NEO Surveyor where available.
- Deploy **4–8 dedicated rendezvous scouts**, approximately **250–500 kg each**.
- Plan **one primary rendezvous per scout**, with a second encounter an optional trajectory-dependent objective.
- Perform visible/NIR spectroscopy, thermal measurements, radio science and physical sampling.

Remote spectra constrain mineralogy; they do not certify bulk grade, excavability or recoverable water. “Twenty observations” must never be recorded as “twenty characterized mining targets.”

---

## P0-F07 — Robot mass and power

**Verdict: agree on inconsistency; disagree with “onboard solar cannot power robots” as a universal statement in round 1.**

Onboard arrays are physically possible but operationally unattractive for this architecture.

For 20–50 kW mechanical power and 70–85% drive efficiency:

\[
P_\mathrm{drive}=24\text{–}71\ \mathrm{kWe}.
\]

Including auxiliaries, allow **40–100 kWe per working machine**. At 200–300 W/m² usable array output, this requires roughly **130–500 m²**, not a compact rover appendage.

Use **3–4 t tether-powered machines**, with 20–50 kWh onboard energy for mobility, control and safe shutdown.

The excavation deliberation has a separate mechanical inconsistency:

\[
P=\tau\omega.
\]

At 20 kW and 10 rpm:

\[
\tau=\frac{20{,}000}{1.047}\approx19{,}100\ \mathrm{N\,m}.
\]

Conversely, 50–200 N·m at 10 kW implies approximately **480–1,900 rpm**. The stated torque and power cannot describe the same low-speed bucket-wheel shaft.

Counter-rotation cancels some angular reaction. It does **not** inherently cancel cutting translation forces, unequal wheel loads or anchoring requirements.

**Proposed change:** retain dual counter-rotation as a candidate, not a validated excavation solution. Re-establish wheel speed, cutting force, shaft torque, anchoring loads and subsystem mass experimentally. Allow **150–500 kg** for the excavation subsystem until demonstrated otherwise.

---

## P0-F08 — Earth-to-space delivery

**Verdict: agree.**

Reference Earth-manufactured mass, including deployed arrays but excluding imported propulsion consumables:

| Element | Mass envelope |
|---|---:|
| Refinery, site equipment and radiators | 180–300 t |
| Ten tug buses, excluding arrays | 250–450 t |
| All power arrays | 175–500 t |
| Robots, scouts, receiving node, ground-flight interfaces and miscellaneous hardware | 70–150 t |
| Replacement hardware over programme | 100–200 t |
| **Total hardware** | **Approximately 0.8–1.6 kt** |

Imported electric-propulsion propellant adds approximately **1.6–6 kt over ten years**, depending on trajectory and fleet usage.

Total delivered Earth-origin mass is therefore approximately **2.5–8 kt**, excluding the launch vehicle and expendable delivery-stage masses.

Use **$3,000–12,000/kg delivered to the operating logistics network** as a scenario allowance, not a quotation:

\[
C_\mathrm{delivery}\approx \$8\text{–}96\ \mathrm{B}.
\]

The lower end requires low-cost launches, efficient cargo aggregation and economical solar-electric delivery. The upper end reflects much less favourable delivery arrangements.

Published Falcon 9 pricing and maximum advertised LEO payload provide a useful **LEO** anchor, but do not establish this deep-space delivered price. Starship target prices are not flight-proven cost evidence.

**Proposed change:** add a separate delivery line, with destination-specific quotations and vehicle performance models.

---

## P0-F09 — Communications and operations

**Verdict: agree.**

Specify:

- Local wired/fibre links where practical; redundant RF mesh for mobile assets.
- A dedicated site relay and independent backup terminal.
- X-band command/telemetry; Ka-band high-rate downlink where link analysis supports it.
- Scheduled access to multiple commercial/deep-space-capable ground stations.
- DSN use only under an explicit capacity agreement.
- Delay/disruption-tolerant networking, authenticated commands, independent safing and software rollback.

Planning data envelope:

- resource site: **0.5–5 Mb/s scheduled downlink**;
- each scout: **0.1–2 Mb/s during scheduled passes**;
- tug: **1–50 kb/s routine**, occasional larger navigation/engineering downloads;
- receiving node: **0.1–2 Mb/s**;
- local site traffic: **10–100 Mb/s**, not continuously sent to Earth.

The round-1 proposal of 2.5 TB/day implies about **230 Mb/s continuously**, before coding overhead. It requires a different antenna and ground-capacity design and has no demonstrated need.

Allow **80–180 operational FTE**, plus specialist contractor support. Budget **$0.1–0.3B/year** industrial operations, and **$0.2–0.5B** recurring communications/ground infrastructure. Autonomy reduces repetitive commanding; it does not remove engineering, maintenance planning or assurance staff.

---

## P0-F10 — Crew

**Verdict: agree.**

Phase 0 is **uncrewed**. Remove habitat, crew visits, life support, rescue and crew-transport assumptions.

Sun–Earth L4/L5 is approximately an AU from Earth, with roughly eight minutes one-way light time. It is not a location with straightforward quarterly crew access.

Reserve suitable structural attachment and servicing interfaces if economical. Do **not** describe these provisions as “human-rating”: human-rating includes system-level safety and certification requirements, not just structural margins.

---

## P0-F11 — Tug propellant and ISPP customer

**Verdict: agree on missing supply and mismatched consumers; partly on the estimated demand.**

At the reference 6 km/s cycle, consumption is approximately 53 t/cycle. Ten tugs, 80% availability and a two-year cycle execute four equivalent cycles annually:

\[
\dot m_p\approx4(53)=213\ \mathrm{t/yr}.
\]

The 6–10 km/s and 1.5–3 year cycle envelope gives approximately **150–550 t/year**, or **160–600 t/year including operational reserve**.

Propellant candidates:

- **Iodine:** plausible commodity supply; approximately tens of thousands of tonnes annually in USGS production reporting. A 200–600 t/year programme is not automatically a global supply impossibility. However, megawatt-class thruster operation, materials compatibility and long life are unproven.
- **Argon:** abundant and flown on large satellite constellations, but storage and lower-performance implementation require a new vehicle mass model.
- **Krypton:** substantial flight heritage, but annual accessible supply and programme allocation require an audited industrial supply study.
- **Water EP:** attractive integration hypothesis, not a qualified replacement.
- **Xenon:** retain only as a pilot-scale candidate until supply is quantified. The original “15–20× world production” assertion is unsupported by the supplied evidence.

Iodine flight heritage exists at very small scale [Rafalskyi et al., 2021]; it does not qualify an MW-class iodine Hall system.

**Proposed change:** carry iodine as a costing study case, with argon and krypton alternatives. Select only after propulsion life tests and a supply contract.

Remove production LOX/LH₂ and the EML1 depot from the base 0B architecture. Retain a **10–30 t/year water-handling/process pilot**, using imported water if the metal target has no accessible indigenous water. Its consumers are process experiments and local water-propulsion demonstrations, not the baseline transport fleet.

---

## P0-F12 — Development, replacements and reserve

**Verdict: agree.**

Separate:

1. non-recurring engineering;
2. ground and flight qualification;
3. pathfinder flight articles;
4. production hardware;
5. replacements;
6. operations;
7. delivery;
8. risk reserve.

Two complete five-year robot cohorts over ten operating years require at least **six replacement machines**, plus tooling and critical-module spares. Tug lifetime must be demonstrated against **total impulse and powered hours**, not merely a calendar-life declaration.

At the reference duty, a tug can accumulate approximately **20,000–40,000 propulsion hours** over the programme, depending on trajectory. A generic 10,000-hour test is not sufficient qualification.

**Proposed change:** adopt the cost accounts in Section 4. Reserve is not a substitute for identified development work.

---

## P0-F13 — Organizational infrastructure

**Verdict: agree on the missing specification.**

The full rq-0-29 conclusion was not supplied; I cannot reconstruct or authenticate its detailed provisions.

Proposed specification:

- A legally constituted operating entity and separate asset-owning/licensing entities where necessary.
- Identified authorizing state or states and continuing supervision.
- Launch and operating licences; national resource-rights analysis.
- Registration, ITU frequency coordination and export-control compliance.
- Liability allocation, insurance strategy and financially bounded indemnities.
- Planetary-protection review consistent with applicable national requirements and COSPAR guidance.
- Space-traffic and close-approach coordination.
- Independent safety authority with stop-work power.
- Configuration-controlled technical records and public change logs.
- Succession, insolvency, asset-transfer, data-escrow and software-key continuity arrangements.
- Periodic governance review; no assertion that a present charter guarantees multi-century continuity.

Allow **$150–350M across 0A and 0B**, excluding mission operations and large launch-specific insurance premiums included in delivery contracts.

---

## P0-F14 — Debris and contamination

**Verdict: agree.**

At 8 kt/year feed, 99% containment permits **80 t/year escaped material**. Even 99.9% permits 8 t/year. Neither is an acceptable default near arrays, optical equipment and transport lanes.

Adopt provisional engineering objectives:

- **Unintentional escaped solid mass:** ≤10 kg/year per resource site.
- **Attributable array degradation from mining contamination:** <1%/year.
- No intentional uncontained tailings discharge.
- Particle-size-resolved limits near vulnerable equipment, determined by impact and optical-contamination analysis.

At 8 kt/year:

\[
f_\mathrm{retained}\ge1-\frac{10}{8\times10^6}
=99.999875\%.
\]

This is a **system objective**, not a demonstrated excavator capability or an existing legal standard.

Hardware includes enclosed cutting interfaces, capture shrouds, sealed transfer, dust traps, replaceable filters, baffled vents, contained tailings bags/bins and contamination witness sensors. “Aspiration” in vacuum requires a closed gas loop; ambient suction is not available.

The operator’s independent safety function certifies readiness internally; national licensing authorities approve operations. COSPAR does not issue a mining operating licence.

Allow **$100–300M development and mitigation**, allocated within plant and development accounts.

---

## P0-F15 — Unwritten deliberations

**Verdict: partly.** Configuration control has failed. However, only rq-0-28 is supplied in full, and rq-0-26 is reproduced substantially. The other conclusions are summaries, not sufficient evidence for blindly issuing final specifications.

| Deliberation | Proposed disposition and specification effect |
|---|---|
| rq-0-11: gravity zones | Add independently rotating process modules; **0.05–0.15 g test envelope**, not universal minimum gravity |
| rq-0-14: ≥25 kt/year ISPP | Retain expansion interfaces; reject an unconditional deployment threshold without a customer and economic case |
| rq-0-18: human-rating | Reserve attachment/docking interfaces; no present human-rating claim |
| rq-0-28: costing | Use procurement plus measured capacity/operating models; no assumed logarithmic cost reduction |
| rq-0-29: governance | Add the specification above, pending review of the actual conclusion |
| rq-0-30: boil-off | No operational cryogenic inventory in the base architecture; retain a separate optional experiment |
| rq-0-47: sunshield | Add to any future cryogenic option with explicit solar geometry and heat-leak analysis |
| rq-0-48: MLI degradation | Require contamination/aging allowances, inspection and replaceable shielding in any cryogenic option |
| rq-0-26: excavation | Reopen torque, force, power, mass and containment qualification; consensus is not experimental validation |

For a rotating module:

\[
a=\omega^2r.
\]

At radius 10–20 m and acceleration 0.05–0.15 g, speed is approximately **1.5–3.7 rpm**. Provisionally allocate **20–60 t and $0.5–1.5B** for rotating modules, bearings, containment and material-transfer systems, included in the plant envelope.

Optional cryogenic systems must instead be sized from:

\[
\dot m_\mathrm{boiloff}=\frac{Q_\mathrm{leak}}{h_\mathrm{vap}}.
\]

For example, 10 W into LH₂, using approximately 446 kJ/kg latent heat, corresponds to about **1.9 kg/day**, absent cooling. “Zero boil-off below 0.01%/day” is internally imprecise: zero boil-off and a nonzero loss allowance are different requirements.

---

## P0-F16 — Consensus versus BOM

**Verdict: agree.**

The quantity, propellant, site, thermal-process and model-version conflicts invalidate the documents as procurement baselines.

I cannot regenerate consensus from “current specs” that were not provided. The appropriate action is a new configuration-controlled baseline, approved by a named change authority.

**Authoritative proposal for this review:** the conditional reference case in Sections 2–4—not either existing inconsistent document.

The previous documents remain evidence records, clearly marked **superseded**, rather than silently overwritten.

---

## P0-F17 — Research versus industrial hardware

**Verdict: agree.**

The homepage claim is false as written: research and flight pathfinders require hardware expenditure.

Replace it with:

> Phase 0A purchases evidence through analysis, laboratory work and flight pathfinders. Industrial Phase 0B is authorized only after technical, demand, safety and funding gates.

Proposed envelopes:

- **0A:** approximately **$7–16B**.
- **0B incremental:** approximately **$23–175B**.
- **Combined:** approximately **$30–195B**.

These wide envelopes are dominated by delivery and technology uncertainty. They are not estimates at a PDR-quality confidence level.

---

## P0-F18 — Metallurgy fallback

**Verdict: partly.**

The missing fallback is real. The “eight orders of magnitude” claim is not a valid dimensional comparison between a 100 g experimental batch and annual production. A 50 kt batch would be \(5\times10^8\) times 100 g, but annual output consists of repeated batches or continuous processing.

Likewise, 0.05–0.15 g is a development hypothesis. Wetting, bubbles, slag separation and casting each require different tests.

Fallback hierarchy:

1. **Preferred operational fallback:** Earth-manufactured structural components delivered directly to Phase 1.
2. **Process fallback:** beneficiation plus solid-state processing or limited rotating melt/cast modules.
3. **Separate strategic alternative:** a lunar-surface processing programme.

For 1 kt/year Earth-supplied material over five years:

\[
5\times10^6\ \mathrm{kg}\times\$3{,}000\text{–}12{,}000/\mathrm{kg}
=\$15\text{–}60\ \mathrm{B},
\]

plus approximately **$0.5–2B** manufacturing and receiving-node preparation. Avoid double-counting delivery that Phase 1 already budgets.

A lunar pilot is provisionally **$5–15B**, excluding a full sustained logistics network. A commercially useful lunar alternative could cost considerably more; it is not demonstrated to beat direct Earth supply.

**Trigger:** failure to qualify representative product and stable material transfer at pilot scale, or failure of the delivery/economic gate. Do not build an industrial station merely because gravity experiments succeed.

A >5 km asteroid is not an adequate natural-gravity substitute. For a 5 km diameter sphere at \(2{,}000\ \mathrm{kg/m^3}\):

\[
g=\frac{4\pi G\rho R}{3}\approx0.0014\ \mathrm{m/s^2}
=1.4\times10^{-4}g_\oplus.
\]

This is hundreds of times below 0.05 g.

---

## P0-F19 — Phase 1 demand interface

**Verdict: agree.**

The supplied model ranges imply:

\[
M_\mathrm{collectors}=69\text{–}1{,}850\ \mathrm{t},
\]

\[
M_\mathrm{blankets}=3{,}450\text{–}225{,}000\ \mathrm{t},
\]

or **3.52–226.85 kt total**. This is approximately **0.35–22.7 kt/year over ten years**, or twice that rate over five years. Neither duration is supplied.

These masses are not all substitutable by Fe–Ni. PV cells, semiconductor feedstocks, dopants, polymers, copper, aluminium structures and precision hardware require distinct sourcing decisions.

Provisional Phase 0 delivery specification:

| Product | Initial specification | Annual delivery | Point/date |
|---|---|---:|---|
| Fe–Ni structural stock | Assayed composition; mechanical, weldability and dimensional acceptance by Phase 1 | 0.6–1.0 kt/year contracted | Selected Phase 1 receiving node; begins approximately three years after 0B authorization |
| Al structural stock | Pilot only; no base production commitment | 0 committed | Separate qualification |
| Solar-grade Si | No base commitment; impurity species and cell-process acceptance required | 0 committed | Earth-supplied initially |
| Water/LOX/LH₂ | No contracted external supply | 0 committed | Local pilot only |

“99.99% silicon” is not a sufficient solar-grade acceptance specification: relevant impurities and downstream cell performance matter.

The Fe–Ni output can substitute for only a subset of Phase 1 structure. If Phase 1 is optimized around lightweight aluminium/composite components and has no useful Fe–Ni demand, the reference 0B architecture should **not** be authorized.

---

# 2. Revised specification

## Conditional reference baseline

| Parameter | Old → proposed | Basis | Confidence |
|---|---|---|---|
| Phase structure | Single phase → 0A evidence programme + gated 0B industry | Programme judgement | High |
| Prospecting | 32/50 small satellites → 4–8 rendezvous scouts plus purchased remote data | Rocket equation; existing survey infrastructure | Medium |
| Scout mass | 80–120 kg → 250–500 kg | Power, propulsion and sampling allowance | Low |
| Scout encounters | 20/year → one primary rendezvous, optional second encounter | Trajectory constraint | Medium |
| Mining fleet | 20 → six deployed, four working; six replacement machines | Mass-flow calculation | Medium |
| Robot mass | Conflicting 0.5/2.5–3.5 t → 3–4 t | Engineering allowance | Low |
| Excavation duty | Unspecified → 7–12% calendar at four × 2.5 t/h | Mass-flow calculation | High, conditional |
| Feed processing | 50 kt/year → 6–10 kt/year excavated; 1.5–2.5 kt/year concentrate | Closed reference flow | Medium, conditional |
| Product | Al/Fe/Ni/solar Si → 1.08–1.80 kt/year qualified native-metal product | Assumed grade and recovery | Low |
| Process site | L4/L5 → co-located with resource site | Logistics trade | Medium |
| Plant mass | 400–1,000 t → 180–300 t excluding arrays | Preliminary allowance | Low |
| Process gravity | Unspecified → 0.05–0.15 g experimental rotating modules | Process-test hypothesis | Low |
| Process power | 1–2.5 MW → 0.5–1.5 MW average; 2.5 MW process peak | Product-specific energy budget | Low–medium |
| Tug fleet | 10/15 → ten reference vehicles | Delivery calculation | Medium, conditional |
| Tug payload | 150–250 t → 250 t | Selected design point | Low |
| Tug power | Approximately 0.1–0.2 MW → 2 MW available | Thrust/time calculation | Medium |
| Tug dry mass | Unspecified → approximately 60 t including arrays | Preliminary vehicle allowance | Low |
| Round-trip Δv | 6–10 km/s → retain 6–10 km/s study envelope | Requires optimized trajectory | Low |
| Mission cycle | Implied 1.5 years → 1.5–3 years, trajectory-dependent | Thrust calculation plus scheduling allowance | Low |
| Arrays | 100 MW → 35–50 MW BOL at 1 AU | Explicit site allocation and derating | Medium |
| Storage | 200–500 MWh → 1.3–3.3 MWh total | Critical-load/shadow calculation | Medium, target-dependent |
| ISPP | Four chemical-production plants → one 10–30 t/year water/process pilot | No chemical customer | Medium |
| Crew | Periodic visits → none | Scope and safety decision | High |
| Operational cryogenics | Implicit depot → none in baseline | No consumer | High |
| Earth-origin delivery | Unspecified → 2.5–8 kt over operating programme | Hardware plus consumables | Low |
| Whole-phase budget | $15.71B → approximately $30–195B | Explicit accounts below | Low |

## Heat rejection: a missing load and mass driver

Round 1’s omission of radiators is important.

For a tug at 60% thruster efficiency, 2 MW input leaves approximately **0.8 MW not converted to jet kinetic power**. Much may depart in the plume; the fraction conducted into thrusters, power electronics and spacecraft must be measured.

Allow provisionally **0.2–0.8 MW spacecraft heat rejection per tug**:

\[
A=\frac{Q}{\epsilon\sigma T^4}.
\]

At emissivity 0.9 and 350–400 K, emitted flux is approximately 0.77–1.31 kW/m². Required effective radiating area is therefore approximately **150–1,050 m² per tug**, before view-factor and degradation allowances.

At the plant, 1–3 MW low-temperature rejected heat requires approximately **0.8–3.9 thousand m²** under comparable conditions. High-temperature furnace rejection can use substantially smaller areas.

Radiators, plumbing, deployment, dust shielding and thermal isolation are included in the plant/tug mass and cost envelopes. Their closure is a mandatory preliminary-design task; they cannot simply be assumed negligible.

---

# 3. Interfaces

## Mass and consumables

| Interface | Flow | Reference value | Current BOM coverage |
|---|---|---:|---|
| Mining → beneficiation | Enclosed excavated feed | 6–10 kt/year | Only implicit |
| Beneficiation → refinery | Concentrate | 1.5–2.5 kt/year | Undefined |
| Beneficiation/refinery → contained storage | Rejects | 4.92–8.20 kt/year | **Missing** |
| Refinery → local inventory/fabrication | Qualified metal | 0.32–0.54 kt/year | Undefined |
| Refinery → tugs | Export metal | 0.76–1.26 kt/year, trajectory-limited | Implicit, not closed |
| Tugs → Phase 1 receiving node | Contracted stock/components | Initially 0.6–1.0 kt/year | **Receiving node missing** |
| Earth → tug depot | Electric-propulsion propellant | 160–600 t/year | **Missing** |
| Water pilot → local experiments | Water/process fluid | 10–30 t/year | Wrongly represented as chemical supply |
| Earth → plant | Reagents, seals, electronics and precision spares | To be established by process BOM | **Unquantified import stream** |

The product chain is nominally closed, but **the reagent and spare-parts chain is not yet physically closed**. Carbonyl, hydrogen-reduction or oxide-processing alternatives must add their gas/reagent inventories and recycling losses before adoption.

## Power and data

- Solar arrays → tugs: **20 MW available propulsion capacity**.
- Solar arrays → resource-site loads: **3.6 MW peak connection capacity**.
- Solar arrays → receiving node: **0.3 MW**.
- Resource site → Earth: **0.5–5 Mb/s scheduled**.
- Tug → Earth/receiving node: **1–50 kb/s routine**.
- Scout → Earth: **0.1–2 Mb/s scheduled**.
- Plant → operating organization: quality records, material genealogy, calibration and safety evidence; these are part of the delivered product, not optional telemetry.

---

# 4. Missing items or scope

## Closed financial accounts

“Closed” here means every identified expenditure is assigned once. It does **not** mean the estimates are validated.

### Phase 0A budget

| Account | Range, $B | Basis |
|---|---:|---|
| Non-recurring engineering and ground qualification | 4–8 | Excavation, anchoring, partial-g processes, propulsion, autonomy and thermal systems |
| Pathfinder flight hardware | 0.6–1.5 | Scouts and one integrated mining/process/transport demonstrator |
| Pathfinder delivery | 0.3–0.9 | Mission-specific allowance |
| Operations | 0.3–0.6 | Pathfinder campaign |
| Governance and independent assurance | 0.05–0.15 | Establishment and authorization |
| **Subtotal** | **5.25–11.15** | |
| Reserve, 30–40% | 1.6–4.5 | Applied to subtotal |
| **0A total** | **Approximately 7–16** | |

### Phase 0B incremental budget

| Account | Range, $B | Basis |
|---|---:|---|
| Production hardware, replacements and commodity propellant | 7–21 | BOM below |
| Additional non-recurring engineering | 2–5 | Industrial integration after 0A |
| Earth-to-operating-network delivery | 8–96 | 2.5–8 kt; $3,000–12,000/kg |
| Ten-year operations | 1–3 | Staff, stations, software maintenance and support |
| **Subtotal** | **18–125** | |
| Reserve, 30–40% | 5.4–50 | Applied to subtotal |
| **0B total** | **Approximately 23–175** | |

**Combined planning envelope: approximately $30–195B.** This is a capability programme, not an established positive-return mining investment.

At 1 kt/year delivered over ten years, tens of billions of dollars imply millions of dollars per kilogram on a fully allocated programme basis. Consequently, a claim that 0B provides cheaper near-term Phase 1 material is presently very unlikely to be supportable. Long-term learning and industrial capability must be valued explicitly.

## Proposed BOM delta

All costs below exclude delivery, programme NRE and operations unless stated otherwise.

| Action/item | Quantity | Unit cost range | Basis/confidence |
|---|---:|---:|---|
| Split bom-0-1 into scouts and survey services | 4–8 scouts | $25–75M/scout | Recurring deep-space/science/payload allowance; low |
| Add survey-data/observing programme | One programme | $20–100M | Purchased services; low |
| Resize bom-0-2 | Six initial machines | $30–70M | Recurring hardware; low |
| Add robot replacements | Six | $30–70M | Five-year lifetime over ten years; low |
| Resize/relocate bom-0-3 | One resource-site plant | $3–7B | Includes rotating modules, radiators and containment; low |
| Resize bom-0-4 | Ten tugs | $150–350M | Excludes arrays; includes thermal/control/cargo systems; low |
| Resize bom-0-5 | 35–50 million W | $30–100/W | Array hardware and integration; low |
| Add distributed storage hardware | 1.3–3.3 MWh total | $50–140M/MWh | Space-qualified integrated allowance, not battery-cell price; low |
| Resize bom-0-6 | One pilot | $100–300M | Water handling and experimental consumers; low |
| Resize bom-0-7 | One programme | $150–350M across both stages | Legal/governance/assurance; medium |
| Add receiving node | One | $200–600M | Cargo handling, assay and storage; low |
| Add comms/ground infrastructure | One network | $200–500M | Ground access and site relay; low |
| Add imported propellant | 160–600 t/year | $30–100/kg iodine study case | Commodity allowance only; low |
| Add other spares/replacements | One programme | $0.8–2.5B | Excludes separately listed robot replacements; low |
| Add Earth-to-space delivery | 2.5–8 million kg | $3,000–12,000/kg | Destination-dependent scenario; low |
| Add development/test/pathfinders | Separate 0A/0B accounts | As above | No duplication in production prices |
| Add operations | Ten industrial years | $100–300M/year | Staffing/ground/support; low |
| Remove crew/habitation | Zero | — | No Phase 0 crew |
| Remove production LOX/LH₂/EML1 depot | Zero base-scope units | — | No baseline customer |
| Remove generic bulk battery bank | Zero 200–500 MWh banks | — | Replace with site-specific storage |

The upper and lower component sums are rounded into the production-hardware account; quoting more precise totals would be misleading.

## Phase 0A → 0B gates

**PDR alone is not an industrial authorization gate.**

1. **Demand gate**
   - Approved Phase 1 material schedule: composition, mechanical properties, annual mass, delivery point and dates.
   - Fe–Ni substitution accepted by actual component designers.
   - Delivered-cost comparison with Earth supply, including capability value.

2. **Resource gate**
   - At least one sampled primary target and one credible alternate.
   - Representative bulk grade, heterogeneity, particle mechanics and recoverable yield measured.
   - Approximately 20% recoverable metal must be demonstrated for this reference flow; lower grade triggers redesign.

3. **Excavation/containment gate**
   - At least 1,000 hours representative ground endurance, supplemented by in-situ excavation.
   - Validated cutting-force and torque spectra.
   - Demonstrated sealed transfer and an independently reviewed escaped-particle model.
   - Calendar duty factor capable of achieving the contracted mass flow.

4. **Process gate**
   - Representative feed produces qualified structural stock.
   - Pilot demonstrates repeated transfer, separation, casting and quality control.
   - Scale up modularly through approximately 100–1,000 t/year feed capacity before full 0B.
   - Measured energy and consumable use support the plant budget.

5. **Transport gate**
   - Optimized trajectories, including return windows and solar-power variation.
   - Integrated vehicle mass closure including propellant, tankage, arrays and radiators.
   - Thruster total-impulse qualification for the actual programme duty.
   - Licensed, contracted propellant supply.

6. **Autonomy and maintenance gate**
   - At least 90 days integrated unattended demonstration.
   - Successful robotic replacement of critical modules.
   - Safe response to link loss, navigation faults, contamination and common-mode software errors.

7. **Safety and funding gate**
   - Authorized debris/traffic/planetary-protection plan.
   - Independently reviewed cost and schedule estimates.
   - Funding for the complete operating tranche and its termination/decommissioning obligations.

Passing a gate authorizes a **limited tranche**, not immediate construction of all ten tugs and full-capacity processing.

---

# 5. Remaining disagreements and open questions

## Corrections to round 1

1. **Downsizing is justified; the exact industrial scale is not established.** The proposed 6–10 kt/year feed case is a testable reference, not a consensus fact.
2. **Co-location is favoured but not universally optimal.** Central refining can improve serviceability and reactor reuse, at the expense of transporting rejects. This is a real cost/reliability trade-off.
3. **Abandoning L4/L5 is justified for the supplied logistics, but relocating automatically to L1 is too strong.** The receiving orbit must be optimized with Phase 1. L1 requires stationkeeping and operational traffic management.
4. **Onboard solar is not physically impossible.** Tether power is preferred because it separates fragile power structures from digging operations.
5. **Water at 200–800 s does not create self-sustaining transport closure.** At 6 km/s:
   \[
   m_0/m_f=e^{6000/(g_0I_{sp})}
   \]
   is about 21 at 200 s and 2.15 at 800 s. At 10 km/s those ratios are about 164 and 3.58. Payload, power and tankage must be recalculated.
6. **Gas/solid metallurgy is not automatically gravity-independent.** Gas-solid contact, fines management, product collection and reagent regeneration remain engineering problems. Carbonyl processing introduces toxic/reactive compounds and selective recovery limitations.
7. **99.5–99.9% containment is insufficient as a fleet safety requirement.** Escaped mass and particle trajectories matter more than a convenient percentage.
8. **A five-kilometre asteroid is not a partial-gravity smelter platform.**
9. **Array and launch prices remain estimates, not supplier evidence.**
10. **The capacity-cost argument is overstated.** Factory count, replacement parts, imported components, energy, support and waste do not generally scale logarithmically with output. Replication may reduce purchased fabrication, but it does not eliminate physical resource accounting.
11. **The rq-0-28 assertion that Phase 0 costs are approximately correct is contradicted by its own omitted cost categories.**
12. **Radiators, tailings storage, reagent imports, decommissioning and material-quality assurance need explicit closure.**

## Alternatives worth retaining

| Position | Reason to retain it | What would resolve it |
|---|---|---|
| Small pilot plus Earth-supplied Phase 1 | Lowest technology commitment; may achieve programme objectives faster | Demand and whole-life logistics comparison |
| Co-located native-metal processing | Lowest transported reject mass | Sampled resource and integrated plant demonstration |
| Central refinery near receiving node | Easier servicing, potentially serves multiple sources | Concentration ratio versus reactor replication/service cost |
| Gas/solid-state process baseline | Avoids some liquid phase-management problems | Representative-feed yield, reagent recycling and impurity tests |
| Rotating melt/cast baseline | More conventional metal-product route | Long-duration partial-g process qualification |
| Argon transport | Strong supply case and relevant flight heritage | MW vehicle storage/performance/lifetime closure |
| Iodine transport | Convenient solid storage and plausible commodity scale | MW-class endurance and materials qualification |
| Lunar processing | Known gravity and potentially separate customers | Complete lunar logistics and economic comparison |

Neither the resource composition nor a particular propellant should be forced into consensus before testing.

### Selected evidence anchors

- **NASA NEO Surveyor:** mission description and approximately 50 cm infrared telescope; relevant to remote discovery, not resource certification.  
  https://science.nasa.gov/mission/neo-surveyor/
- **NASA OSIRIS-REx and JAXA Hayabusa2:** sample-return heritage and evidence of heterogeneous, low-gravity surface mechanics; neither demonstrates industrial mining.
- **NASA NEXT-C / AEPS technical publications:** relevant electric-propulsion thrust, efficiency, life and qualification heritage; not proof of a complete MW cargo tug.
- **Rafalskyi et al. (2021), “In-orbit demonstration of an iodine electric propulsion system,” Nature 599, 411–415.**  
  https://doi.org/10.1038/s41586-021-04015-y
- **USGS, Mineral Commodity Summaries, Iodine:** commodity production and supply basis; use the dated edition in procurement analysis.  
  https://www.usgs.gov/centers/national-minerals-information-center/iodine-statistics-and-information
- **International Aluminium Institute / US DOE industrial energy studies:** terrestrial aluminium electrolysis energy anchors; not asteroid-process qualification.
- **NASA iROSA/ROSA and large deployable-array publications:** relevant deployment heritage; system-specific power and cost must be quoted consistently.
- **SpaceX Falcon 9 published capabilities/pricing:** LEO anchor only; maximum advertised payload is not guaranteed payload on a reusable mission or to an NEA.
- **Outer Space Treaty Articles VI–IX; Liability and Registration Conventions; COSPAR Planetary Protection Policy:** organizational and authorization framework.

No live supplier quotation, complete trajectory solution or missing deliberation text was available for this assessment.

---

# 6. Decision-quality critique

The previous reconciliation is useful as an issue map, but agreement among models is not a substitute for a decision warrant. Below I use the **Composite Scaffold**, supplemented by **QOC**, **GRADE Evidence-to-Decision** and **ACH**.

Weights are proposed decision-discussion weights, not stakeholder-approved preferences. Safety and physical closure are binary **musts**, not attributes that a favourable cost score can offset.

## Decision A — Whether, where and at what scale to build 0B

1. **Frame & type:** executive investment and architectural existence decision; expensive, partly irreversible; complex domain.
2. **Criteria and weights:** after musts, delivered useful material 30%, lifecycle cost 30%, capability learning 25%, schedule/reversibility 15%.
3. **Options:** no industrial build; small pilot; co-located refinery; central refinery; lunar alternative.
4. **Assessment matrix — QOC:**

   | Option | Near-term useful material | Cost exposure | Learning | Reversibility |
   |---|---|---|---|---|
   | Earth supply + pilot | Strong conditional on launch | Lower technology risk | Moderate | High |
   | Co-located 0B | Resource-dependent | High | High | Medium |
   | Central refinery | Transport-dependent | Very high for low-grade ore | High | Low |
   | Lunar programme | Different resource/logistics case | High | High but less asteroid-specific | Low |

5. **Sensitivity/trade-off points:** recoverable grade and accepted product demand are sensitivity points. Co-location trades lower transported mass against harder servicing and duplicated plant infrastructure: **a values question once quantified**.
6. **Evidence certainty:** original 50 kt/year logistics failure is extremely likely, with high confidence. Co-location being best is likely only under low concentration yield and infrequent servicing; confidence medium. Commercial superiority is unestablished.
7. **Key assumption/falsifier:** Phase 1 can use the recovered material. Falsify with an approved Phase 1 design that rejects Fe–Ni substitution, or sampled resource that cannot achieve useful grade.
8. **Decision/warrant/downside:** authorize 0A, retain co-located 0B as the reference, accepting that industrial construction may never be justified. The warrant is reduced reject transport—not model unanimity.
9. **Consequences:** defers irreversible station procurement; requires product contracts, samples and Earth-supply comparison first.

**Weakest Decision Quality link in round 1: frame and values.** It jumps from “50 kt/year does not close” to “build a smaller industry” without establishing why industry, rather than evidence plus Earth supply, is the desired outcome.

**GRADE EtD contribution:** separates capability benefit from near-term financial return and highlights acceptability/funding constraints.

---

## Decision B — Tug architecture, power and propellant

1. **Frame & type:** coupled vehicle/property decision; propulsion selection constrains tanks, arrays, heat rejection and consumables.
2. **Criteria and weights:** delivered mass/year 35%, qualified life/reliability 30%, total delivered cost 25%, resource closure 10%.
3. **Options:** original low-power tugs; MW noble-gas EP; iodine EP; water EP; water thermal propulsion; lower-Δv target selection.
4. **Assessment matrix — QOC:**

   | Option | Cadence | Heritage | Supply/storage | Principal risk |
   |---|---|---|---|---|
   | Original arrays | Fails reference throughput | Relevant small EP | Manageable scale | Power limitation |
   | MW argon/Kr | Potentially adequate | Component heritage | Argon strong; Kr audit needed | Integrated scale/life |
   | MW iodine | Potentially adequate | Small flight demo only | Solid storage advantageous | Corrosion and endurance |
   | Water EP | Unestablished | Insufficient for this duty | Potential ISRU fit | Efficiency/lifetime |
   | Low-Isp water thermal | Poor for 6–10 km/s cargo | Some relevant components | Simple fluid | Mass ratio and heating |

5. **Sensitivity/trade-off points:** \(\Delta v\), efficiency and \(I_{sp}\) affect propellant and thrust time. Higher \(I_{sp}\) reduces propellant but reduces thrust at fixed power—a genuine trade-off. Larger power shortens thrusting but adds array/radiator mass.
6. **Evidence certainty:** thrust and rocket-equation conclusions are high confidence. A 1.5–3 year cycle is plausible, not demonstrated; confidence low without optimized trajectories.
7. **Key assumption/falsifier:** route geometry permits the nominal two-year cycle. Falsify with optimized trajectory solutions including variable sunlight and return windows, or a vehicle mass model exceeding the allocated dry mass.
8. **Decision/warrant/downside:** use 2 MW and iodine only as study reference; retain argon/Kr alternatives. Accept imported propellant and an unclosed technology choice rather than asserting self-sufficiency.
9. **Consequences:** imports dominate delivery mass; qualification needs total impulse, not generic lifetime; resource selection and receiving orbit become propulsion decisions.

**Weakest link in round 1: information.** Different models used incompatible mass, trajectory, launch and propellant bases.

**ACH contribution:** require each propellant hypothesis to survive disconfirming evidence—especially lifetime, storage and supply failures. The attractive “ISPP closes transport” hypothesis currently fails the consumer and performance checks.

---

## Decision C — Metallurgy route and artificial gravity

1. **Frame & type:** process architecture and technology-risk decision; modular choices are more reversible than a monolithic station.
2. **Criteria and weights:** qualified product yield 35%, endurance/maintainability 25%, energy/consumables 20%, scale-up risk 20%.
3. **Options:** native-metal recovery; oxide reduction; gas/solid routes; rotating melts; Earth supply.
4. **Assessment matrix:**

   | Option | Scope | Main advantage | Main limitation |
   |---|---|---|---|
   | Native-metal recovery | Narrow | Lower chemical conversion burden | Requires suitable resource |
   | Gas/solid routes | Selective | Avoids some melt-handling issues | Gas/reagent/collection complexity |
   | Rotating melts | Metal stock | Familiar product operations | Rotating transfer and containment |
   | MRE/oxide reduction | Broad | More feedstocks and oxygen | Electrode life, energy, separation |
   | Earth supply | Broad | Qualified products available | Launch dependence |

5. **Sensitivity/trade-off points:** free-metal grade is a sensitivity point. Process breadth trades against energy, development scope and reliability. Artificial gravity trades simpler fluid behaviour against mechanical complexity.
6. **Evidence certainty:** partial gravity can influence separation—high confidence. The exact 0.05–0.15 g window being sufficient for all relevant processes is uncertain, with low confidence.
7. **Key assumption/falsifier:** sampled feed yields qualified stock without excessive consumables. Falsify by repeated pilot failures in impurity control, slag separation, transfer or mechanical properties.
8. **Decision/warrant/downside:** choose narrow native-metal production as the reference; rotating modules remain experimentally gated. Accept a limited product slate and continued Earth imports.
9. **Consequences:** no solar-grade silicon production promise; qualification and feedstock sampling lead station design.

**Weakest link in round 1: reasoning.** A gravity deliberation was treated by some positions as if it were a validated universal process requirement.

**GRADE EtD contribution:** terrestrial metallurgy offers useful indirect evidence, but extraterrestrial feedstock and partial-g scale-up materially reduce certainty.

---

## Decision D — Power, storage, thermal management and containment

1. **Frame & type:** safety-critical infrastructure sizing; site-specific rather than fleet-average.
2. **Criteria and weights:** safety/environmental musts; availability 40%, mass/delivery burden 35%, maintainability 25%.
3. **Options:** central tethered power; onboard arrays; standoff arrays with feeders; night shutdown; full overnight storage.
4. **Assessment matrix:**

   | Option | Hardware burden | Operational burden | Availability |
   |---|---|---|---|
   | Tether + process shutdown | Moderate | Cable management | Adequate if duty permits |
   | Large onboard arrays | High on moving robot | Deployment/collision risk | Locally independent |
   | Full night operation | Very high storage | Lower scheduling burden | High |
   | Distributed sunlit collectors | Site-dependent | Installation complexity | Potentially high |

5. **Sensitivity/trade-off points:** shadow duration drives storage. Continuing production through darkness trades availability against battery and launch mass. Greater containment generally increases mechanism complexity and maintenance.
6. **Evidence certainty:** deletion of arbitrary 500 MWh is justified with high confidence. Ability to meet ≤10 kg/year escaped solids is uncertain; confidence low.
7. **Key assumption/falsifier:** the site’s shadow profile allows shutdown without losing annual throughput. Falsify by measured rotation/terrain shadows or duty-cycle simulation. Containment assumptions are falsified by particle-resolved integrated tests.
8. **Decision/warrant/downside:** use tether power, critical-load-only storage and contained tailings; accept intermittent production and a demanding qualification programme.
9. **Consequences:** site selection, rotor thermal design, tether routing and tailings storage become explicit design tasks.

**Weakest link in round 1: information and safety reasoning.** Convenient retention percentages replaced environmental consequences; heat rejection was not closed.

**QOC contribution:** exposes that onboard power is a rejected option with disadvantages—not a physical impossibility.

---

## Decision E — Cost model, stage gates and governance

1. **Frame & type:** executive authorization and decision-rights design; staged commitments preserve options.
2. **Criteria and weights:** safety/legal musts; credible evidence 35%, affordability 30%, reversibility 20%, strategic capability 15%.
3. **Options:** single industrial commitment; staged tranches; pure research; presumed self-replication economics.
4. **Assessment matrix:**

   | Option | Evidence before commitment | Reversibility | Cost credibility |
   |---|---|---|---|
   | Single build | Low | Low | Weak |
   | Gated tranches | High | High | Improves with evidence |
   | Research only | High for feasibility | High | Does not deliver industry |
   | Replication-assumed budget | Low | Low | Unsupported closure assumptions |

5. **Sensitivity/trade-off points:** delivery price and imported propellant dominate cost. Faster industrial commitment trades schedule against risk and deferral value.
6. **Evidence certainty:** omitted costs are highly likely to be material, with high confidence. The proposed programme envelope has low confidence; no probabilistic confidence interval is claimed.
7. **Key assumption/falsifier:** 0A can reduce uncertainty enough for responsible investment. Falsify if representative tests and supply quotations still leave core mass, lifetime or demand uncertainties unresolved.
8. **Decision/warrant/downside:** adopt staged procurement and measured capacity models, rejecting presumed logarithmic cost scaling. Accept delay and the possibility of terminating 0B.
9. **Consequences:** appoint an accountable baseline authority; independent reviewers can veto gate passage; published consensus does not authorize expenditure.

**Weakest link in round 1: commitment.** It proposes many incompatible alternatives but assigns neither decision rights nor a funded, authoritative baseline.

**GRADE EtD and real-options contribution:** separate affordability, feasibility and stakeholder values; recognize the value of not yet committing to an industrial station.

### Disposition of other first-round recommendations

- **Remove crew:** supported; weakest link was scope control, not physics.
- **Add launch, operations and development accounts:** supported; pricing information remains weak.
- **Adopt $30–100/W:** acceptable estimating assumption, not authoritative supplier evidence.
- **Adopt a ≥25 kt/year chemical ISPP threshold:** not supported without customers.
- **Require 99.5% containment:** rejected as an adequate system safety criterion.
- **Require two or three characterized targets:** useful risk-reduction preference, not a universal physical threshold.
- **Require a fixed eight-kilometre-per-second route bound:** replace with integrated vehicle/trajectory closure.
- **Require silicon purity before any industrial activity:** unnecessarily couples a difficult optional product to native-metal production.
- **Reserve future human interfaces:** retain where inexpensive; avoid a misleading human-rating label.
- **Claim multi-century governance is resolved:** reject; establish reviewable succession mechanisms instead.

```yaml
item: phase
model: GPT-5.2
findings:
  - id: P0-F01
    verdict: partly
    summary: Transport fails to support 50 kt/year, but round-trip calculations must account for the lighter outbound leg and actual useful array output.
    proposed_change: Co-locate processing and study ten 2 MW tugs delivering initially 0.6–1.0 kt/year of products.
  - id: P0-F02
    verdict: agree
    summary: Hourly capacity, annual production, duty factor and beneficiation yield are inconsistent or unspecified.
    proposed_change: Adopt a conditional 6–10 kt/year feed chain with 25 percent concentrate yield and 18 percent qualified-product yield.
  - id: P0-F03
    verdict: partly
    summary: Mixed oxide-derived products cannot be supported by the stated power, but feed and product energy bases must be distinguished.
    proposed_change: Limit baseline production to native metal and allocate 0.5–1.5 MW average process power with 2.5 MW peak.
  - id: P0-F04
    verdict: partly
    summary: Power and storage are unallocated, although continuous sunlight does not eliminate transient and safe-mode storage.
    proposed_change: Replace 100 MW and bulk storage with 35–50 MW BOL arrays and 1.3–3.3 MWh distributed storage.
  - id: P0-F05
    verdict: agree
    summary: The 5 USD/W installed array budget is unsupported and omits delivery and development.
    proposed_change: Use 30–100 USD/W hardware as a low-confidence allowance and obtain supplier quotations.
  - id: P0-F06
    verdict: partly
    summary: Twenty annual rendezvous are implausible, while twenty remote observations may be feasible.
    proposed_change: Purchase remote survey services and deploy four to eight scouts with one primary rendezvous each.
  - id: P0-F07
    verdict: agree
    summary: Robot mass references conflict and excavation torque is inconsistent with stated power at plausible wheel speeds.
    proposed_change: Use tether-powered 3–4 t machines and reopen excavation force, torque, mass and containment qualification.
  - id: P0-F08
    verdict: agree
    summary: Earth-to-space delivery is a major missing account.
    proposed_change: Add 2.5–8 kt programme delivery with a destination-dependent 8–96 billion USD allowance.
  - id: P0-F09
    verdict: agree
    summary: Ground capacity, local relays and industrial mission operations are not budgeted.
    proposed_change: Add scheduled X-band and Ka-band communications, ground contracts and 80–180 operational staff.
  - id: P0-F10
    verdict: agree
    summary: Human-tended operation assumes an unbudgeted and demanding crew infrastructure.
    proposed_change: Make Phase 0 uncrewed and retain only economical future servicing interfaces.
  - id: P0-F11
    verdict: agree
    summary: Imported EP propellant is missing and chemical ISPP has no baseline transport customer.
    proposed_change: Budget 160–600 t/year imported EP propellant and replace production chemical ISPP with a water-process pilot.
  - id: P0-F12
    verdict: agree
    summary: Development, qualification, replacements and risk reserves require separate accounts.
    proposed_change: Add explicit NRE, pathfinder, spares, replacement and 30–40 percent reserve accounts.
  - id: P0-F13
    verdict: agree
    summary: Organizational infrastructure lacks an actionable legal and continuity specification.
    proposed_change: Establish authorization, licensing, liability, succession, records and independent safety functions.
  - id: P0-F14
    verdict: agree
    summary: Percentage containment alone permits unacceptable escaped mass at industrial throughput.
    proposed_change: Adopt provisional escaped-solid and contamination limits with enclosed handling and contained tailings.
  - id: P0-F15
    verdict: partly
    summary: Configuration control failed, but most deliberation texts are unavailable and their summaries are not validated engineering requirements.
    proposed_change: Review full conclusions and issue quantified changes with gravity and cryogenic provisions experimentally gated.
  - id: P0-F16
    verdict: agree
    summary: Conflicting quantities, propulsion, sites and document versions prevent an authoritative procurement baseline.
    proposed_change: Issue a versioned approved baseline and mark earlier consensus records superseded.
  - id: P0-F17
    verdict: agree
    summary: Pure research is inconsistent with industrial hardware commitments and flight research itself requires hardware spending.
    proposed_change: Split Phase 0A evidence generation from gated Phase 0B industrial construction.
  - id: P0-F18
    verdict: partly
    summary: A fallback is necessary, but batch mass versus annual throughput is not a valid scale-gap comparison.
    proposed_change: Gate rotating processing and retain Earth supply as the preferred operational fallback.
  - id: P0-F19
    verdict: agree
    summary: Product composition, accepted demand, delivery location and schedule are undefined.
    proposed_change: Require an approved Phase 1 material contract before industrial authorization.
revised_spec:
  - parameter: excavated_feed
    old: conflicting annual and hourly targets
    new: 8000
    range: [6000, 10000]
    unit: t/year
    basis: calculation
    confidence: medium
  - parameter: concentrate_flow
    old: unspecified
    new: 2000
    range: [1500, 2500]
    unit: t/year
    basis: calculation
    confidence: low
  - parameter: qualified_metal_product
    old: unspecified mixed product slate
    new: 1440
    range: [1080, 1800]
    unit: t/year
    basis: calculation
    confidence: low
  - parameter: contracted_product_delivery
    old: unspecified
    new: 1000
    range: [600, 1000]
    unit: t/year
    basis: calculation
    confidence: low
  - parameter: initial_mining_fleet
    old: 20
    new: 6
    range: [6, 6]
    unit: machines
    basis: calculation
    confidence: medium
  - parameter: robot_mass
    old: conflicting 500 and 2500–3500
    new: 3500
    range: [3000, 4000]
    unit: kg
    basis: judgement
    confidence: low
  - parameter: process_average_power
    old: 1–2.5 MW without product energy basis
    new: 1
    range: [0.5, 1.5]
    unit: MW
    basis: calculation
    confidence: low
  - parameter: tug_propulsion_power
    old: approximately 0.1–0.2
    new: 2
    range: [2, 2]
    unit: MW/vehicle
    basis: calculation
    confidence: medium
  - parameter: tug_round_trip_delta_v
    old: 6–10
    new: 6
    range: [6, 10]
    unit: km/s
    basis: judgement
    confidence: low
  - parameter: tug_cycle_time
    old: implied approximately 1.5
    new: 2
    range: [1.5, 3]
    unit: years
    basis: judgement
    confidence: low
  - parameter: arrays_BOL_at_1_AU
    old: 100
    new: 40
    range: [35, 50]
    unit: MW
    basis: calculation
    confidence: medium
  - parameter: distributed_storage
    old: 200–500
    new: 2
    range: [1.3, 3.3]
    unit: MWh
    basis: calculation
    confidence: medium
  - parameter: imported_EP_propellant
    old: unspecified
    new: 230
    range: [160, 600]
    unit: t/year
    basis: calculation
    confidence: low
  - parameter: water_process_pilot
    old: four production chemical ISPP systems
    new: 20
    range: [10, 30]
    unit: t/year
    basis: judgement
    confidence: low
  - parameter: rotating_process_acceleration
    old: unspecified
    new: 0.1
    range: [0.05, 0.15]
    unit: Earth-g
    basis: judgement
    confidence: low
  - parameter: total_Earth_origin_delivered_mass
    old: unspecified
    new: 4500
    range: [2500, 8000]
    unit: t/programme
    basis: calculation
    confidence: low
  - parameter: Phase_0A_budget
    old: unspecified
    new: 10
    range: [7, 16]
    unit: billion_2026_USD
    basis: judgement
    confidence: low
  - parameter: Phase_0B_incremental_budget
    old: unspecified
    new: 70
    range: [23, 175]
    unit: billion_2026_USD
    basis: judgement
    confidence: low
  - parameter: total_phase_budget
    old: 15.71
    new: 80
    range: [30, 195]
    unit: billion_2026_USD
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-2
    flow: mass
    value: 8000 t/year excavated feed
    in_bom: true
  - with: bom-0-3
    flow: mass
    value: 2000 t/year concentrate
    in_bom: true
  - with: bom-0-4
    flow: mass
    value: 1008 t/year nominal export product
    in_bom: true
  - with: bom-0-5
    flow: power
    value: 24.3 MW total peak connection capacity across sites and vehicles
    in_bom: true
  - with: bom-0-4
    flow: propellant
    value: 160–600 t/year imported EP propellant
    in_bom: false
  - with: bom-0-6
    flow: mass
    value: 10–30 t/year water-process pilot throughput
    in_bom: true
  - with: contained_tailings_storage
    flow: mass
    value: 6560 t/year nominal rejects
    in_bom: false
  - with: Phase_1_receiving_node
    flow: mass
    value: 600–1000 t/year contracted structural metal
    in_bom: false
  - with: communications_ground_segment
    flow: data
    value: 0.5–5 Mb/s scheduled resource-site downlink
    in_bom: false
bom_delta:
  - action: split
    item: bom-0-1
    quantity: 4–8 rendezvous scouts plus purchased survey services
    unit_cost_usd: [25000000, 75000000]
    rationale: Remote discovery and resource-certifying rendezvous require different missions.
  - action: resize
    item: bom-0-2
    quantity: 6 initial machines
    unit_cost_usd: [30000000, 70000000]
    rationale: Four working machines and two service positions close the reference mining flow.
  - action: add
    item: robot_replacements
    quantity: 6
    unit_cost_usd: [30000000, 70000000]
    rationale: Five-year robot life requires replacements over ten industrial operating years.
  - action: resize
    item: bom-0-3
    quantity: 1 co-located processing plant
    unit_cost_usd: [3000000000, 7000000000]
    rationale: Limit production to qualified native metal and include radiators rotating modules and containment.
  - action: resize
    item: bom-0-4
    quantity: 10 tugs
    unit_cost_usd: [150000000, 350000000]
    rationale: MW-class vehicles transport products rather than bulk low-grade ore.
  - action: resize
    item: bom-0-5
    quantity: 35000000–50000000 W BOL at 1 AU
    unit_cost_usd: [30, 100]
    rationale: Allocate power by site and include distance age and conversion derating.
  - action: add
    item: distributed_storage
    quantity: 1.3–3.3 MWh
    unit_cost_usd: [50000000, 140000000]
    rationale: Size integrated space storage for critical loads and actual shadow duration.
  - action: resize
    item: bom-0-6
    quantity: 1 water-process pilot
    unit_cost_usd: [100000000, 300000000]
    rationale: Production chemical propellant lacks a baseline customer.
  - action: resize
    item: bom-0-7
    quantity: 1 phase governance programme
    unit_cost_usd: [150000000, 350000000]
    rationale: Add authorization liability succession records and independent safety functions.
  - action: add
    item: Phase_1_receiving_node
    quantity: 1
    unit_cost_usd: [200000000, 600000000]
    rationale: Product delivery requires handling storage assay and interface acceptance.
  - action: add
    item: communications_ground_segment
    quantity: 1 network
    unit_cost_usd: [200000000, 500000000]
    rationale: Deep-space communications and ground capacity are not free.
  - action: add
    item: imported_EP_propellant
    quantity: 160000–600000 kg/year
    unit_cost_usd: [30, 100]
    rationale: Commodity iodine is a study basis pending propulsion qualification and supply contracting.
  - action: add
    item: Earth_to_operating_network_delivery
    quantity: 2500000–8000000 kg
    unit_cost_usd: [3000, 12000]
    rationale: Account separately for destination-specific hardware and consumable transportation.
  - action: add
    item: industrial_operations
    quantity: 10 years
    unit_cost_usd: [100000000, 300000000]
    rationale: Autonomy does not eliminate engineering ground services and maintenance support.
  - action: add
    item: other_spares_and_replacements
    quantity: 1 programme
    unit_cost_usd: [800000000, 2500000000]
    rationale: Replace critical modules tooling and hardware other than separately budgeted robots.
  - action: remove
    item: crew_habitation_and_visits
    quantity: 0
    unit_cost_usd: [0, 0]
    rationale: Phase 0 is uncrewed and structural reserves are not human-rating.
  - action: remove
    item: production_LOX_LH2_and_EML1_depot
    quantity: 0 base-scope units
    unit_cost_usd: [0, 0]
    rationale: No qualified baseline vehicle consumes these propellants.
  - action: remove
    item: generic_200_to_500_MWh_battery_bank
    quantity: 0
    unit_cost_usd: [0, 0]
    rationale: Replace arbitrary bulk storage with geographically allocated critical-load storage.
open_questions:
  - Which sampled resource can support the assumed metal grade recovery and excavation duty factor?
  - Does Phase 1 accept Fe–Ni structures in sufficient quantity to justify industrial construction?
  - Which receiving orbit minimizes total Phase 0 and Phase 1 logistics cost?
  - Do optimized trajectories support two-year tug cycles after return windows and solar-power variation?
  - Which propellant survives MW-class lifetime materials storage and supply qualification?
  - Can representative processes meet product quality and containment limits at pilot scale?
  - What fraction of propulsion losses must spacecraft radiators reject?
  - What are actual supplier quotations for arrays delivery ground services and propellant?
  - Are reagent recycling and precision-spare import streams compatible with the delivery budget?
  - Do capability benefits justify Phase 0B when direct Earth supply is cheaper?
  - What do the complete missing deliberation texts require and which requirements survive engineering review?
```
