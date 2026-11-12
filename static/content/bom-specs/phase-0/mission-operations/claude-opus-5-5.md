---
bomId: "bom-0-10"
itemName: "Mission Operations"
itemSlug: "mission-operations"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-10 Mission Operations (0A + 0B): Technical Proposal

**Project Dyson, Phase 0 (Space Resource Processing), revised architecture**
**Status:** Proposal for configuration-control board. All numbers are ranges with a stated basis. This is not an approved baseline.

---

## 0. Executive Summary

Mission Operations is the line that turns hardware into delivered tonnes. In the revised Phase 0 architecture the hardware is spread across three places:

- a remote, uncrewed mineral-processing site at a near-Earth asteroid (NEA), 0.1–2 AU from Earth;
- a fleet of 10–18 MW-class electric-propulsion (EP) cargo tugs on multi-year low-thrust trajectories;
- a receiving node at Sun–Earth L1 (SEL1).

Before all of that, 0A must operate 4–10 rendezvous scouts and a pathfinder demonstrator.

My position, in one sentence: **Mission Operations should be run as a remote-factory operations centre with autonomy-first supervisory control, not as a flagship-science flight-control team, and its cost is a design output of the other BOM items, not a fixed overhead.**

| | 0A (committed) | 0B (gated option, sized at KDP-0B) | Phase 0 total |
|---|---|---|---|
| Duration (ops-active) | ~5.5 yr (Y1–Y6.5) | ~6.5 yr (Y6.5–Y13), resizable | ~12 yr |
| Staff, peak / steady | 125 / ~80 avg FTE | ~230 / ~180 FTE | — |
| Cost, base range | **$165–270M** | **$400–600M** | **$0.57–0.87B** |
| Point estimate | $210M | $490M | **$0.70B** |
| Pessimistic (autonomy shortfall) | $290M | $800M | ~$1.1B |
| Annual run rate | avg ~$38M/yr, peak ~$55M/yr | steady ~$70–80M/yr | — |

**Position on the round-2 figures:**

- **Claude ($0.5–1.5B):** My base sits in the lower half of this range. The upper half corresponds to an autonomy failure. That case should be carried as a named risk in bom-0-17, not in the base estimate.
- **Gemini ($525M inside a $1.1–1.5B comms+ops line):** Close to my point estimate. However, the bundling with comms must be undone, and the figure must be split into 0A and 0B.
- **GPT ($100–300M/yr, i.e. $1–3B over 10 yr):** Rejected as a base. At $300k loaded per full-time equivalent (FTE), it implies 330–1,000 FTE, which is a flagship-scale or Rio-Tinto-scale organisation for 1 kt/yr. GPT's *low* end ($100M/yr) is, however, a credible 0B outcome if site autonomy only reaches ESA level E3. I use it as my pessimistic bound.

**What the economics gate should see:** 0B operations alone cost roughly **$30k–125k per delivered tonne** (central ~$58k/t at 1.3 kt/yr). Operations is not a rounding error on the Phase 1 business case.

---

## 1. Scope and Boundaries

### 1.1 In scope (bom-0-10)

1. **Operations staff.** Flight control, flight dynamics, site/plant/robot supervision, sustaining engineering, planning and logistics, product QA, training, and ops-level mission assurance. Covers 0A and 0B.
2. **Operations facilities.** Primary Mission Operations Centre (MOC), backup MOC, operations sustainment testbed, and operations IT.
3. **Ground operations software.** Telemetry and telecommand core, fleet manager, planning and scheduling, flight dynamics tools, plant supervisory system (manufacturing execution system, MES, plus historian), digital twin, anomaly detection, archive, and product-genealogy database. Includes its build, licences, hosting and sustainment.
4. **Execution labour** for:
   - launch and early-orbit phase (LEOP) and commissioning of every Phase 0 asset;
   - debris and contamination procedures, where bom-0-15 owns the requirement, models and hardware;
   - spares and propellant logistics planning, where bom-0-14 and bom-0-16 own the hardware and propellant.
5. **Operation of the SEL1 receiving node** until handover to the Phase 1 operator.

### 1.2 Out of scope (owned elsewhere; interfaces in §5)

| Item | Owns | bom-0-10 provides |
|---|---|---|
| bom-0-9 Comms & Ground Segment | Antennas, Deep Space Network (DSN) and commercial aperture time, link encryption, Space Link Extension (SLE) delivery to the MOC | Contact requests, priorities, link-budget usage feedback |
| bom-0-11 NRE & Qualification | Flight software development, onboard autonomy development, development testbeds | Design-for-operability requirements, ops concept, ops-led verification of autonomy |
| bom-0-7 Organisation | HR, legal, finance, corporate IT, licensing counsel | Regulatory compliance reports, ops data for licence filings |
| bom-0-14 Spares | Spare hardware | Manifest planning, failure-trend data |
| bom-0-15 Debris & Contamination | ALARP requirement, models, mitigation hardware | Execution labour, monitoring, incident reports |
| bom-0-16 EP Propellant | Iodine/argon procurement and depots | Consumption forecasts, fleet refuel scheduling |
| bom-0-17 Contingency | All programme reserve | No hidden reserve is carried in bom-0-10 |

### 1.3 Disagreement on the round-2 quantity ("10 yr")

Ten years is too short if 0B is exercised:

- 0A runs to KDP-0B at about Y6.
- 0B deployment and commissioning take about 2–3 years.
- Tug transit to SEL1 takes 1–2 years.

The first delivered tonne therefore arrives at about Y10. **I price operations per year and per phase so the 0B gate can resize the tail.** The nominal plan is about 12 years: 5.5 years of 0A and 6.5 years of 0B.

---

## 2. Design Philosophy

### 2.1 Five principles

1. **Autonomy-first, ground-supervisory.**
   - One-way light time to the NEA ranges from 50 s to 17 min, and round trips run up to about 35 min.
   - Solar conjunctions impose multi-week blackouts.
   - The site must therefore run itself. The ground sets goals, tunes the process, diagnoses root causes and approves irreversible actions.
   - Robots are never directly teleoperated at the NEA.
2. **Fleet operations, not mission operations.**
   - Ten to eighteen identical tugs are operated as a fleet, with management by exception, shared procedures and one telemetry dictionary.
   - Starlink-style automation is the model, not one control team per spacecraft.
   - Target: **≤0.5 controller-FTE per tug in cruise.**
3. **Remote-factory analogue.**
   - The best terrestrial analogue is remote-operated mining, for example Rio Tinto's Perth operations centre running Pilbara mines 1,500 km away.
   - The NEA site is structured on the ISA-95 enterprise/control-system hierarchy and run like a factory with a historian, batch records and lot genealogy.
4. **Stringency follows reversibility (D-02 applied to commanding).**
   - Reversible actions, such as process setpoint changes within an envelope or robot task assignments, are routine. One authorised operator commands them, and onboard authority applies.
   - Irreversible or hazardous actions require a two-person rule, a twin-simulated preview and a hold point. Examples: tug departure burns with product, plant thermal start, HV tether energisation after a fault, excavation-regime changes affecting ejecta, end-of-life disposal.
5. **Ops cost is designed in.**
   - Most lifetime ops cost is locked in by hardware and flight-software decisions made in 0A.
   - Mission Operations therefore holds **design-for-operability (DFO) authority** at all life-cycle reviews of bom-0-1 to 0-6 and 0-13 (§5.3).

### 2.2 What I reject

- **24/7 flagship-style staffing in 0A.** Scouts in cruise do not need it. Use lights-out monitoring with on-call staff, and staff 24/7 only for critical events.
- **One operator per robot.** If pathfinder data show this is needed, that is a KDP-0B failure signal, not a staffing plan.
- **A bespoke ground system per asset class.** One ground system covers scouts, pathfinder, tugs, site and node.
- **Funding full 0B ops build-out in 0A.** Under D-01, 0A builds only what generates gate evidence: a production-architecture supervisory system exercised on the pathfinder. Scale-up waits for KDP-0B.

---

## 3. Operational Environment and Driving Requirements

### 3.1 Latency and contact environment

| Asset | Range from Earth | One-way light time | Round trip | Contact strategy (via bom-0-9) |
|---|---|---|---|---|
| SEL1 receiving node | 1.5 Mkm | 5 s | 10 s | Daily 2–4 h; near-real-time possible |
| Tugs, cruise | 0.01–1.5 AU | 0.1 s–12.5 min | up to 25 min | 1–2 h/week each, plus event passes |
| Scouts, cruise | 0.05–1.5 AU | up to 12.5 min | up to 25 min | 2–3 passes/week |
| Scouts, proximity ops | 0.1–1.5 AU | up to 12.5 min | up to 25 min | Daily 6–12 h during campaigns |
| NEA site (0B) | 0.1–2.0 AU | 50 s–16.7 min | 1.7–33 min | Daily 4–8 h; continuous during commissioning |

**Conjunction.** When the Sun–Earth–probe angle is below about 3–5°, there are blackouts of roughly 2–5 weeks. For Earth-like NEA orbits the synodic period is long, often 2–10+ years, so blackouts are rare but long and must be designed for.

### 3.2 Top-level Mission Operations requirements (proposed)

| ID | Requirement | Rationale and verification |
|---|---|---|
| MO-01 | The NEA site shall survive ≥45 days without ground contact and continue production at ≥50% of nominal rate for ≥21 days unattended. | Conjunction plus a ground-outage margin. Verified on the pathfinder (scaled, ≥14-day simulated blackout) and by twin analysis. |
| MO-02 | Ground intervention rate at 0B steady state shall be ≤0.2 interventions per robot-day (target 0.05), and ≤1 per plant-day. | Main ops-cost driver. Measured on the pathfinder; this is a KDP-0B evidence item. |
| MO-03 | Tug cruise operations shall require ≤0.5 controller-FTE per tug. | Fleet automation. |
| MO-04 | Hazardous or irreversible commands shall carry two-person authorisation, a twin-predicted outcome and an onboard pre-condition check. Ground shall not attempt closed-loop control of any process with time constant <10× the round-trip light time. | Latency safety. |
| MO-05 | All assets shall enter a safe, power-positive, thermally stable state autonomously within ≤60 s of a fault. Ground shall acknowledge within one contact plus one round-trip light time. | Standard fault protection. |
| MO-06 | ≥99% of downlinked telemetry shall be captured and archived. Raw data shall be retained ≥15 years, and science/characterisation data released openly (PDS4-compatible) within 12 months unless export-controlled. | Non-profit open-data mandate. |
| MO-07 | Every shipped product lot shall be traceable to its mining cell, beneficiation batch, process batch, assay and tug manifest. | Phase 1 material/purity/date specification. |
| MO-08 | The backup MOC shall assume safety-critical positions within ≤4 h and full operations within ≤72 h. | Single-site loss. |
| MO-09 | The ground system shall meet NIST SP 800-53 moderate baseline (high for command paths), with zero-trust architecture, hardware-token two-person command signing and an air-gapped command-authorisation enclave. | Uncrewed high-value assets. |
| MO-10 | Ops cost shall be reported as $/delivered-tonne and FTE/asset every quarter, with a not-to-exceed tripwire at the 0B gate. | Economics gate (D-02). |
| MO-11 | Execution of the bom-0-15 ALARP regime: excavation and handling ejecta shall be kept below the local escape speed (computed per target) or contained, with lidar/camera monitoring and incident reporting within 24 h. | Debris/contamination requirement. |

**Physical note on MO-11.** For a 500 m NEA with bulk density 2 g/cm³, mass M ≈ 1.3×10¹¹ kg and escape speed v_esc ≈ √(2GM/r) ≈ **0.26 m/s**. For a 150 m body it is about 0.08 m/s. Excavation tooling speeds of order 0.1 m/s can therefore loft material off the body, so containment, not just procedure, is required. Ops enforces the regime; bom-0-2 and bom-0-15 own the hardware.

---

## 4. System Architecture

### 4.1 End-to-end operations architecture

```
 SPACE SEGMENT (autonomy owned by bom-0-11 SW, hardware by 0-1..0-6, 0-13)
 ┌──────────────────────────── NEA SITE (0B) ─────────────────────────────┐
 │  Mining robots (0-2) ──HV tether 1–3 kV── Site power/storage (0-5)     │
 │       │ task-level                         │ power arbitration         │
 │  ┌────▼──────────────────────────────────────▼─────┐                   │
 │  │ SITE AUTONOMY CONTROLLER (SAC) – T2 supervisor  │◄── Plant (0-3)    │
 │  │ goal executive, scheduler, power/thermal mgr,   │◄── Water pilot    │
 │  │ batch control (ISA-88), local historian 30–60 d │     (0-6)         │
 │  └────────────────────┬────────────────────────────┘                   │
 └───────────────────────┼────────────────────────────────────────────────┘
   Scouts (0-1)          │        Tugs ×10–18 (0-4)        SEL1 node (0-13)
   Pathfinder (0-12)     │        T1 executives            T1/T2
        │                │              │                       │
 ═══════╪════════════════╪══════════════╪═══════════════════════╪══════════
        └────────────────┴──────┬───────┴───────────────────────┘
                     bom-0-9: DSN / commercial apertures, SLE, link crypto
 ═══════════════════════════════╪══════════════════════════════════════════
 GROUND (bom-0-10)              │
 ┌──────────────────────────────▼───────────────────────────────────────┐
 │ FRONT END: SLE/CCSDS gateway · frame sync · COP-1 · time correlation │
 ├──────────────────────────────────────────────────────────────────────┤
 │ TM/TC CORE (Yamcs or OpenC3 COSMOS, XTCE dictionaries)               │
 │   ├─ Command Authorisation Enclave (air-gapped, 2-person HW tokens)  │
 │   ├─ Fleet Manager (tugs, scouts: mgmt-by-exception, alarm triage)   │
 │   ├─ Planning & Scheduling (goal-based campaigns, contact plans)     │
 │   ├─ Flight Dynamics (GMAT + low-thrust optimiser; OD w/ optical nav)│
 │   ├─ Plant Supervisory / MES + Historian (ISA-95 L3)                 │
 │   ├─ Digital Twin (plant process sim, robot/regolith sim, power)     │
 │   ├─ Anomaly Detection (residual + ML, per-parameter baselines)      │
 │   └─ Product Genealogy & QA DB (lot → cell → batch → assay → tug)    │
 ├──────────────────────────────────────────────────────────────────────┤
 │ ARCHIVE (raw + L1–L3 products, PDS4 export) · Analytics · Reporting  │
 └──────────────────────────────────────────────────────────────────────┘
     Primary MOC ◄══ replicated ══► Backup MOC (≥500 km, separate grid)
            ▲
            └── Ops Sustainment Testbed (flight-spare SAC, tug avionics,
                robot controller HIL) — sustainment only; dev beds in 0-11
```

### 4.2 Control hierarchy and autonomy tiers

Autonomy tiers are mapped to ESA ECSS-E-ST-70-11C autonomy levels (E1–E4) and to ISA-95 levels.

```
 Tier  Where        Time scale     Function                          ECSS / ISA-95
 ────  ───────────  ─────────────  ────────────────────────────────  ─────────────
 T0    each asset   ms – s         reflexes, FDIR, safe mode         E3 / L1
 T1    each asset   min – h        task execution (excavate cell,    E3–E4 / L2
                                   thrust arc, transfer product)
 T2    SAC @ NEA    h – days       site scheduling, power arbitration E4 / L2–L3
                                   across robots/plant/storage,
                                   batch sequencing, local recovery
 T3    Ground MOC   days – weeks   campaign goals, process tuning,   — / L3
                                   root cause, fleet logistics,
                                   irreversible-action approval
 T4    Programme    months         gates, Phase 1 demand, target     — / L4
                                   changes
```

**Required autonomy levels.**

| Level | Assets |
|---|---|
| **E4** (goal-based onboard re-planning) | NEA site (SAC), tugs in cruise |
| **E3** (event-based onboard operations) | Scouts, robots individually, SEL1 node |
| E2 (time-tagged commands) | Not used for any Phase 0 asset |

**Commanding granularity.**

- Ground uplinks weekly campaign plans, for example: "process 18 t ore this week, prioritise zone C, hold furnace below X kW during storage-recharge windows".
- Daily delta plans adjust the campaign.
- Robots receive task-level goals from the SAC, never motion commands from Earth.
- At SEL1 (10 s round trip), supervised near-real-time manipulation is allowed for product acceptance and docking contingencies.

**Bridging latency.** The ground digital twin runs **predictive displays**. Operators see the twin's estimate of "now" at the site, with uncertainty bounds, propagated from the last telemetry plus the commanded plan. Divergence between twin and telemetry is itself an anomaly trigger.

### 4.3 Operations concepts by phase

**0A: scouts.**

- **Cruise:** Autonomous EP thrust arcs. Weekly orbit determination (OD), with trajectory updates every 2–4 weeks. Monitoring is lights-out.
- **Approach:** Optical navigation campaign over 30–60 days.
- **Proximity operations:** 3–6 month characterisation campaigns. Small-body gravity and shape modelling follow the OSIRIS-REx and Hayabusa2 heritage, with more onboard autonomy.
- **Data products:** Feed the **target gate** (D-02 discriminating gate).

**0A: pathfinder (bom-0-12).** This is the ops-critical demonstrator. It must run the **same SAC software architecture and ground system** intended for 0B, so that KDP-0B evidence is about the flight-like system and not a surrogate. Required ops evidence for KDP-0B:

1. ≥60 days continuous autonomous operation, including ≥1 commanded 14-day zero-contact interval.
2. Intervention rate measured and trending to ≤0.5 per asset-day, with an extrapolation case to MO-02.
3. Zero unrecoverable operator-induced anomalies.
4. Twin prediction error within an agreed envelope for key process variables (furnace/reduction temperature, throughput, product composition).
5. At least one end-to-end lot genealogy record from mining cell to assay.

**0B: deployment and commissioning (~18–24 months).**

- Covers LEOP for each tug and cargo element, site build-up and power-on, robot deployment, and progressive plant start-up.
- This is the staffing surge: 24/7 operations, continuous site contact through bom-0-9, and daily anomaly boards.

**0B: production (steady state).**

- The site runs at E4.
- Ground staffing is 24/7 with 3 core positions overnight and 8–10 daytime positions.
- Tugs cycle the NEA → SEL1 route, with departure burns as irreversible-action hold points.
- Product lots are certified against the Phase 1 specification before tug acceptance and again at SEL1 receipt.

**Wind-down or Earth-fallback.** If microgravity metallurgy fails at KDP-0B, or during 0B, ops scales down to scouts, pathfinder disposal and tug repurposing. The trained team is the asset most easily redirected to Earth-supplied-material logistics. This is part of the real-option value of D-01.

---

## 5. Subsystems and Interfaces

### 5.1 Ground software (functional specification)

| Element | Baseline approach | Scale (0B) | TRL now |
|---|---|---|---|
| Front end / SLE gateway | COTS or open-source CCSDS SLE (RAF/RCF/CLTU) | ~25 simultaneous assets | 9 |
| TM/TC core | Open-source (Yamcs / OpenC3 COSMOS), XTCE dictionaries | 50k–150k site parameters; ~5k per tug | 9 |
| Command Authorisation Enclave | Custom on hardened COTS, HSM tokens | 2-person rule, signed command loads | 7 |
| Fleet manager | Custom on TM/TC core; rules plus ML triage | 10–18 tugs, 4–10 scouts | 6–7 |
| Planning and scheduling | Goal/timeline planner (ASPEN/CASPER-class concepts); contact scheduling interface to bom-0-9 | Weekly campaigns, daily deltas | 6 |
| Flight dynamics | GMAT (open source) plus low-thrust optimiser; OD with optical navigation; JPL MONTE optional via licence | 25+ trajectories; NEA gravity field | 8 (prox ops) / 7 (fleet automation) |
| Plant supervisory / MES / historian | ISA-95 L3 MES and time-series historian (PI-class or open-source) | ~10⁵ tags at 0.1–1 Hz after downsampling | 9 on Earth / 4 for remote space plant |
| Digital twin | Process simulation (reduction, magnetic separation, melt/consolidation), regolith-tool interaction, power/thermal | Faster than real time ×10 | 2–3 for microgravity metallurgy |
| Anomaly detection | Residual-to-twin plus per-parameter learned baselines | All assets | 5–6 |
| Product genealogy / QA DB | Relational DB, immutable lot records | ~10³–10⁴ lots/yr | 8 |
| Archive | Object storage, PDS4 export | 0.1–0.6 PB total | 9 |

**Data volume basis.** The round-2 figure of 2.5 TB/day is rejected, consistent with bom-0-9.

| Source | Rate during contact | Contact | Daily volume |
|---|---|---|---|
| NEA site | 2–10 Mbps | 4–8 h/day | ~4–36 GB/day |
| Tug fleet (18 tugs) | — | weekly | <1 GB/day total |
| Scouts in proximity ops | — | daily | 1–5 GB/day |
| **Total** | | | **~10–50 GB/day** |

Over 12 years this gives about 50–200 TB raw, or ≤0.6 PB with derived products. **Storage and compute are not cost drivers**: about $0.2–0.5M/yr hosted.

### 5.2 Facilities specification

| Facility | Specification | Basis |
|---|---|---|
| **Primary MOC** | 1,800–2,500 m² leased and fitted out. Operations floor ~400 m² with 24–32 consoles, plus a 6-console critical-events room. Simulation/training room ~150 m². Anomaly room. ~150 on-site seats; the rest hybrid. | 0B peak ~230 FTE; about 60–70% on-site |
| Power and resilience | ~250 kW total (≤100 kW IT, as most compute is hosted). Dual utility feeds, 72 h generator, UPS. Uptime-Tier-III-equivalent ops floor. | Commercial practice |
| Network | Dual diverse 10 Gbps fibre. Dedicated, encrypted SLE circuits to bom-0-9 stations. | Low data rate; resilience is the driver |
| **Backup MOC** | 400–600 m², 10–12 consoles, warm standby. ≥500 km from the primary, on a different grid and seismic zone. Continuous replication of databases, twin and plans. | MO-08 |
| **Ops sustainment testbed** | Flight-spare SAC computer, tug avionics string, one robot controller, and a power-management emulator. Hardware-in-the-loop with the twin. Used for procedure validation, command-load verification and patch testing. ~150 m². | Development beds stay in bom-0-11 |
| Location (open question) | Prefer partnering with a university-affiliated operations centre. The LASP (Boulder) model shows small-mission ops at lower loaded rates. | Non-profit cost discipline |

### 5.3 Design-for-operability requirements flowed to other items

These are cheap to impose now and very expensive to retrofit:

1. **One telemetry and command standard** across all assets: CCSDS Space Packet, PUS-C services or an equivalent, XTCE dictionaries, and common time correlation.
2. **One onboard autonomy framework.** Common executive and FDIR patterns for scouts, tugs, robots, SAC and node, owned by bom-0-11.
3. **Tug commonality.** All 10–18 tugs are block-identical in avionics and software. Block changes are rare and configuration-controlled. Each unique tug variant adds about 3–5 FTE of permanent sustaining load.
4. **Onboard historian** at the SAC holding ≥60 days of full-rate data, so post-blackout analysis is possible.
5. **Self-describing health summaries.** Each asset produces a ≤1 kB/day "state of health" digest for management by exception.
6. **In-flight software update capability** with dual-image rollback on all assets.
7. **Instrumentation for genealogy.** Mass and assay data captured at each process step, a requirement on bom-0-3.
8. **Ops participation as a voting member** at every PDR/CDR/ORR for bom-0-1 through 0-6, 0-12 and 0-13.

### 5.4 Interface summary

```
            requirements, DFO ─────────────►  0-1..0-6, 0-12, 0-13 (hardware)
 bom-0-10   ◄──── flight SW, autonomy, V&V ─  0-11 (NRE)
 MISSION    contact requests ───────────────► 0-9  (comms, DSN, stations)
 OPERATIONS ◄──── data via SLE ─────────────  0-9
            manifests, failure trends ──────► 0-14 (spares)
            consumption forecasts ──────────► 0-16 (propellant)
            execution logs, incidents ──────► 0-15 (debris/contamination)
            LEOP staffing ◄────────────────►  0-8  (launch)
            compliance reports ─────────────► 0-7  (licence gate)
            lot certificates ───────────────► Phase 1 (via 0-13 node)
            $/t, FTE/asset KPIs ────────────► Programme gates (D-02)
```

---

## 6. Staffing Model

### 6.1 Loaded labour rate

- Basis: US aerospace salary of $130–180k with a wrap of 1.7–2.0, giving **$220–360k per FTE-year**.
- I use **$300k as the point value and $250–350k as the range.**
- A partner-site model, such as a university-affiliated centre or a lower-cost region, can approach $220k. A full-cost commercial contractor would sit at $350–400k.
- **Export control.** ITAR/EAR applies to some flight-dynamics and spacecraft data. It constrains international hiring and may require a segregated US-persons enclave. This is a cost and diversity issue to resolve in bom-0-7.

### 6.2 0A staffing (peak Y5, ~125 FTE)

| Function | Y1 | Y3 | Y5 (peak) | Notes |
|---|---|---|---|---|
| Ops leadership and mission management | 4 | 5 | 6 | |
| Real-time flight control | 3 | 10 | 16 | Lights-out cruise; 24/7 only for events |
| Flight dynamics and navigation | 3 | 10 | 14 | Small-body prox ops is the heaviest load |
| Planning and scheduling | 1 | 3 | 5 | |
| Survey and target characterisation ops | 2 | 10 | 14 | Feeds target gate |
| Pathfinder process and robotics operators | 0 | 6 | 18 | Prototype 0B team |
| Sustaining engineering (scouts, pathfinder) | 2 | 14 | 22 | |
| Ground software, data, IT, cyber | 8 | 16 | 20 | Builds production-architecture ground system |
| Mission assurance, safety, compliance | 1 | 2 | 4 | |
| Training, simulation, readiness | 1 | 4 | 6 | |
| **Total** | **25** | **80** | **125** | |

FTE-years in 0A, by year Y1–Y6.5: 25 + 50 + 80 + 110 + 125 + 60 ≈ **450 FTE-yr.**

### 6.3 0B staffing (steady state ~180 FTE; commissioning peak ~230)

| Function | FTE | Notes |
|---|---|---|
| Programme/mission management, ops leadership | 8 | |
| Real-time flight and site control | 30 | 3 positions 24/7 (site supervisor, process/robot, fleet/node) ≈ 16 FTE, plus 8–10 day positions ≈ 14 FTE |
| Flight dynamics and navigation | 12 | Fleet low-thrust automation, NEA ephemeris and gravity |
| Planning, scheduling, logistics | 10 | Campaigns, spares/propellant manifests, tug cycles |
| Process engineering and metallurgy | 16 | Off-shift on-call; process tuning against twin |
| Robotics and excavation engineering | 12 | Robot behaviours, tool wear, ejecta regime |
| Sustaining engineering | 34 | Tugs ~10, power/thermal ~6, plant ~8, robots ~6, node/water pilot ~4 |
| Ground software, data, IT, cybersecurity | 26 | Includes 24/7 security operations coverage share |
| Product QA and Phase 1 interface | 6 | Lot certification against Phase 1 specification |
| Mission assurance, safety, debris/licence compliance execution | 8 | |
| Training, simulation, ops readiness | 8 | |
| Local ops administrative support | 10 | HR/finance in bom-0-7 |
| **Total** | **180** | |

**Ratio check.**

- About 25–30 robots, 1 plant, 10–18 tugs, 1 node and the site power system make roughly 45 operated assets, or **about 4 FTE per asset all-in**.
- This compares with about 150–300 FTE per single spacecraft for flagship missions.
- The reduction is plausible only with E4 autonomy and fleet commonality. That is exactly why autonomy is a KDP-0B critical technology (§8).

FTE-years in 0B over ~6.5 years: 160 + 220 + 4 × 185 + 90 ≈ **1,210 FTE-yr.**

### 6.4 Shift model

```
 0A cruise:   [Day 08–18 staffed, M–F] + automated alerting + on-call (≤30 min)
 0A events:   24/7, 2–3 console positions, 4–8 weeks per event
 0B:          ┌── 24/7 core: Site Supervisor · Process/Robot · Fleet/Node ──┐
              │   + Day (07–19): FD, Process Eng, Robotics, Sustaining,     │
              │     Planning, QA, Twin analysts                             │
              └── Follow-the-sun option: primary + backup MOC split shifts ─┘
                  (reduces night-shift premium, keeps backup "hot")
```

I recommend the **follow-the-sun option** if the backup MOC is in a time zone 6–9 h offset. It turns a cost centre (warm standby) into productive capacity and continuously proves MO-08.

---

## 7. Cost Analysis

### 7.1 0A (committed): $165–270M, point $210M

| Element | Low | Point | High | Basis |
|---|---|---|---|---|
| Labour (450 FTE-yr) | 113 | 135 | 158 | $250–350k/FTE-yr |
| Facilities: primary MOC fit-out, backup MOC (initial), opex 5.5 yr | 22 | 30 | 42 | Fit-out $8–15M, backup $3–5M, opex $2–4M/yr |
| Ground software build (production architecture, open-source core) | 15 | 25 | 35 | ~50–100 FTE-yr equivalent plus COTS; core reused, custom MES/twin integration |
| IT, licences, hosting, cyber tooling (5.5 yr) | 6 | 8 | 11 | $1–2M/yr |
| Ops sustainment testbed (0A portion) | 5 | 7 | 10 | Flight-spare avionics supplied by 0-14/0-11; HIL integration here |
| Independent ops readiness reviews | 3 | 5 | 8 | External review boards per launch and KDP |
| **0A total** | **164** | **210** | **264** | |

### 7.2 0B (gated; resized at KDP-0B): $400–600M, point $490M

| Element | Low | Point | High | Basis |
|---|---|---|---|---|
| Labour (1,210 FTE-yr) | 303 | 363 | 424 | $250–350k |
| Facilities: MOC expansion, opex 6.5 yr | 43 | 55 | 72 | Expansion $10–20M; opex $5–8M/yr |
| Ground software scale-up (MES/historian/twin/fleet manager to production) | 30 | 45 | 60 | |
| IT, licences, hosting, 24/7 cyber (6.5 yr) | 20 | 27 | 39 | $3–6M/yr |
| Independent assessment, ops reviews | 5 | 7 | 10 | |
| **0B total** | **401** | **497** | **605** | Rounded to $400–600M, point ~$490M |

**Pessimistic 0B case (~$800M).**

- Trigger: autonomy reaches E3 only, so the intervention rate is about 1 per robot-day.
- Consequences:
  - an extra 60–100 FTE of robot/process supervisors;
  - a commissioning surge stretched by about 12 months;
  - follow-the-sun becomes mandatory.
- This is GPT's low-end run rate (~$100–120M/yr).
- **I recommend carrying the difference ($200–300M) in bom-0-17 as a named autonomy risk**, released only if pathfinder evidence forces it. Note that this pessimistic case is also the one in which KDP-0B should probably *not* be passed.

### 7.3 Phase 0 summary and annual profile

```
 $M/yr
  90 |                                      ┌──┐
  80 |                                 ┌────┤  ├──┬──┬──┐
  70 |                                 │    │  │  │  │  │
  60 |                       ┌──┐      │    │  │  │  │  │
  50 |                  ┌────┤  ├──┐   │    │  │  │  │  └─┐
  40 |             ┌────┤    │  │  │   │    │  │  │  │    │
  30 |        ┌────┤    │    │  │  │   │    │  │  │  │    │
  20 |   ┌────┤    │    │    │  │  │   │    │  │  │  │    │
  10 |┌──┤    │    │    │    │  │  │   │    │  │  │  │    │
     └┴──┴────┴────┴────┴────┴──┴──┴───┴────┴──┴──┴──┴────┴──
      Y1  Y2   Y3   Y4   Y5   Y6 ▲KDP-0B Y8  Y9 Y10 Y11 Y12 Y13
      ◄───────────── 0A ~$210M ──────►◄────── 0B ~$490M ─────►
                                       (commissioning surge Y8)
```

**Gate-slip holding cost.** If KDP-0B slips, 0A ops shrinks to a ~40 FTE core: pathfinder extended operations, ground system and twin maintenance, and key-person retention. This costs about **$13–16M/yr**. The programme should budget this explicitly rather than let a 125-person team idle, since a "standing army" is a classic ops-cost failure.

### 7.4 Ops cost per delivered tonne (input to the economics gate)

| Delivered rate | 0B steady ops cost ($75M/yr) | $/t |
|---|---|---|
| 0.6 kt/yr (low) | $75M | ~$125k/t |
| 1.3 kt/yr (central) | $75M | ~$58k/t |
| 2.5 kt/yr (high) | $80M | ~$32k/t |

Ops cost is nearly fixed with respect to throughput, so **operations strongly rewards the high end of the 0.6–2.5 kt/yr range.** It is one of the clearest arguments for sizing 0B at the gate against signed Phase 1 demand (D-01): a half-utilised site doubles ops cost per tonne.

### 7.5 Where I disagree with round-2, and why

| Round-2 source | Figure | My view |
|---|---|---|
| Claude | $0.5–1.5B total | Agree with the floor. The ceiling corresponds to the autonomy-failure case, which belongs in reserve (bom-0-17), not base. |
| Gemini | $525M inside a $1.1–1.5B comms+ops line | Near my point estimate, but bundling with comms hides that ops labour is the dominant and most gate-sensitive cost. It must be split 0A/0B: 0A is committed, 0B is not. |
| GPT | $100–300M/yr | Rejected as base. $1–3B implies 330–1,000 FTE, more than a flagship mission team and comparable to an operations centre running about 16 terrestrial mines at hundreds of Mt/yr. It is not consistent with uncrewed, autonomy-first, fleet-common design at ~1 kt/yr. Its low end is my pessimistic bound. GPT is right that ops is a first-order cost driver per tonne. |
| All three | "10 yr" quantity | Too short if 0B is exercised: the first tonne reaches SEL1 at ~Y10. Price per year and per phase, with a nominal ~12 years. |

---

## 8. Development Roadmap and Technology Readiness

### 8.1 Timeline (Y = years from 0A start)

```
        Y1    Y2    Y3    Y4    Y5    Y6    Y7    Y8    Y9    Y10   Y11   Y12   Y13
 0A     ├─MOC build/GDS v1─┤
        ├Ops concept, DFO reqs┤
              ▲Scout ORR/LEOP
              ├──scout cruise──┼─prox ops campaigns─┤
                    ▲Target gate (D-02)
                          ▲Pathfinder ORR
                          ├──pathfinder ops ≥60 d auto + blackout test──┤
                                      ▲KDP-0B (ops evidence, autonomy TRL 6)
 0B                                      ├GDS v2 scale-up┤
                                            ├─tug/site LEOP & deploy─┤
                                                  ├commissioning┤
                                                        ├──── production ──────┤
                                                              ▲first lot @SEL1
                                                                            ▲Phase1 handover
```

### 8.2 Ops-related technology readiness (D-02: TRL plus AD²)

| Technology | TRL now | 0A internal target | KDP-0B requirement | Project-ending? | AD² (difficulty) |
|---|---|---|---|---|---|
| TM/TC core, SLE, archive | 9 | 9 | 9 | No | 1 |
| Low-thrust trajectory design / OD | 8 | 8 | 8 | No | 2 |
| Automated fleet low-thrust ops (≤0.5 FTE/tug) | 6–7 | 7 (scouts) | 7 | No (cost driver) | 3 |
| Autonomous small-body proximity navigation | 6–7 | 7 (scouts) | 8 | No | 3 |
| **Site autonomy controller (E4 supervisory, multi-asset, power arbitration, latency-tolerant)** | **3–4** | **5 (ground HIL + pathfinder partial)** | **6, in relevant environment on pathfinder** | **Yes** | **6–7** |
| **Multi-robot autonomous excavation in microgravity** | **3** (terrestrial autonomous mining is 9) | 4–5 | 6 | **Yes** (shared with 0-2) | 7 |
| Digital twin for microgravity metallurgy | 2–3 | 4 | 6 (prediction envelope verified on pathfinder) | Effectively yes: without it, latency-tolerant supervision fails | 6 |
| ML anomaly detection on sparse telemetry | 5–6 | 6 | 7 | No | 3 |
| Lot genealogy / MES for remote space plant | 4 | 5 | 7 | No (Phase 1 acceptance) | 2 |

**Position.** Site autonomy is a **project-ending technology** under D-02. Without E4 autonomy, 0B either cannot operate through conjunction or requires the pessimistic staffing case, which degrades the economics gate. It must therefore reach **TRL 6 on the pathfinder with no waiver** at KDP-0B. The pathfinder's ops campaign is designed specifically to generate this evidence (§4.3).

### 8.3 Operations readiness milestones

| Milestone | Timing | Exit criteria |
|---|---|---|
| Ops Concept Review | Y1 | Concept frozen; DFO requirements flowed to all items |
| GDS v1 operational | Y2 | Before scout ORR; ≥3 end-to-end simulations with flight software |
| Scout ORR | Y2 | Standard ORR plus ≥2 contingency simulations with injected faults |
| Pathfinder ORR | Y4 | Twin–HIL correlation; blackout procedure rehearsed |
| KDP-0B ops evidence package | Y6 | MO-01/02 extrapolation, autonomy TRL 6, $/t projection, staffing plan |
| GDS v2 / 0B ORR | Y7–Y8 | Fleet manager at scale; backup MOC failover demonstrated |
| Production Readiness Review | Y9 | ≥30 days commissioning at ≥70% rate; first certified lot |
| Phase 1 ops handover | ~Y12–13 | Node and fleet procedures, data and staff transferable |

---

## 9. "Manufacturing" Considerations for an Operations Line

Operations does not build flight hardware. It does have production-like activities:

1. **Ground system production.**
   - Adopt open-source cores: Yamcs or OpenC3, GMAT, OpenMCT-class displays.
   - Write custom code only for the SAC interface, MES integration, twin coupling and genealogy.
   - Target ≥70% reuse by line count.
   - Use a DevSecOps pipeline with signed builds and a testbed gate before any operational deployment.
2. **Procedure production.**
   - Procedures are written as executable scripts (COSMOS/Yamcs scripting) with formal pre- and post-conditions, not as documents.
   - Each tug procedure is written once and is fleet-wide.
   - Estimated library: ~800–1,500 procedures in 0B.
3. **Product as manufactured output.**
   - The NEA site is a factory. Ops runs ISA-88 batch records and ISA-95 MES functions.
   - The QA team issues **lot certificates** against the Phase 1 material/purity/date specification: Fe-Ni composition, impurity limits (S, P, C, O), form factor and mass.
   - Each certificate cross-checks SAC assay telemetry against a sampled re-assay at SEL1 (bom-0-13 instrument).
4. **Configuration control.**
   - Ops maintains the as-flown configuration database for every asset: software versions, parameter tables and hardware states.
   - This feeds the single configuration-controlled baseline required by the re-assessment.

---

## 10. Risk Assessment

| # | Risk | L | I | Mitigation |
|---|---|---|---|---|
| R1 | Site autonomy reaches only E3; intervention rate ≫0.2 per robot-day, causing a staffing explosion (+$200–300M) | M | H | Pathfinder autonomy campaign; KDP-0B hard criterion; named reserve in bom-0-17; DFO authority |
| R2 | Twin cannot predict microgravity process behaviour, so latency-tolerant supervision fails | M | H | Twin calibration on pathfinder; conservative process envelopes onboard; slower campaign cadence |
| R3 | KDP-0B slip leaves a standing army | M | M | Explicit ~40 FTE hold core ($13–16M/yr); cross-train staff; secondment partners |
| R4 | 12-year staff turnover and knowledge loss | H | M | Procedures as code; twin as institutional memory; ≥2-deep coverage on every critical role; retention incentives at gates |
| R5 | Cyber compromise of command path | L–M | Very high | MO-09 enclave; 2-person HSM signing; bom-0-9 link encryption; red-team exercises yearly |
| R6 | Operator error with latency, e.g. a command based on stale state | M | H | Predictive twin displays; onboard pre-condition checks; two-person rule for irreversible actions |
| R7 | DSN/aperture contention, causing contact loss in critical events | M | M | Owned by bom-0-9; ops uses ≥45-day autonomy (MO-01) and pre-booked event coverage |
| R8 | Primary MOC loss | L | H | Backup MOC, follow-the-sun, replication; annual failover drill |
| R9 | Tug fleet heterogeneity (block changes) erodes fleet ops efficiency | M | M | Block-change control; each variant costed at +3–5 FTE |
| R10 | Ejecta/contamination incident threatens the licence gate | L–M | H | MO-11 monitoring; automatic excavation halt on lidar ejecta detection; 24 h reporting |
| R11 | Export control limits hiring and international partnership | M | M | Segregated data enclaves; early classification review in bom-0-7 |
| R12 | Low throughput (0.6 kt/yr) makes ops $/t uneconomic | M | H | Size 0B to signed demand; MO-10 tripwire at gate |
| R13 | Iodine vs argon (D-05) changes tug ops, e.g. iodine feed-line heater management and condensation risks | M | L | Ops concept carries both; finalise after supply audit and life tests |

---

## 11. Open Engineering Questions

1. **Intervention-rate model.** What is the real distribution of ground interventions per robot-day for tethered excavation in microgravity? Only pathfinder data can answer this, and it drives roughly ±$300M.
2. **Where the SAC lives and who owns its requirements.** It is hosted in bom-0-3 hardware with software in bom-0-11, but ops must own its functional requirements. This should be confirmed by the configuration-control board.
3. **24/7 vs follow-the-sun.** Is a geographically split operation acceptable to the licensing state for command authority?
4. **In-house vs contracted navigation.** Small-body navigation specialist contractors (KinetX-class) versus building an in-house team: cost, continuity and ITAR trade-offs.
5. **SEL1 node operator.** Is the node operated by Phase 0 ops throughout, or handed to Phase 1 at the first delivery? This affects the 0B tail cost (~10–15 FTE).
6. **Open data vs export control.** How much characterisation and process data can be released without compromising ITAR/EAR obligations or commercial agreements with Phase 1 customers?
7. **Autonomy V&V acceptance.** What objective evidence constitutes TRL 6 for an E4 supervisory controller? Proposed: pathfinder hours, fault-injection coverage, and blackout-survival demonstration. This needs agreement with D-02 reviewers.
8. **Licensing-state reporting cadence.** No regulator currently authorises asteroid mining operations as such. The ops reporting burden is unknown, at roughly 2–10 FTE.
9. **Water pilot (bom-0-6) ops burden** if a C-type target is confirmed: volatile handling adds hazards. Estimated +4–8 FTE.
10. **Lunar or Earth-fallback ops reuse.** If the fallback is triggered, how much of the ground system and team transfers? Preliminary estimate: >60% of software and >50% of staff.
11. **Location and labour-rate strategy.** A university partnership could cut about 15–25% of labour cost. Is this compatible with 24/7 security and continuity requirements?

---

## 12. Recommendation to the Board

1. **Approve bom-0-10 as a separate line** from bom-0-9, split 0A and 0B:
   - 0A: $165–270M (point $210M), committed.
   - 0B: $400–600M (point $490M), gated and resized at KDP-0B.
2. **Carry $200–300M autonomy-shortfall reserve in bom-0-17**, not in this line.
3. **Grant Mission Operations DFO voting authority** at all Phase 0 hardware reviews from Y1.
4. **Designate site supervisory autonomy as a project-ending technology** requiring TRL 6 on the pathfinder at KDP-0B, with the ops evidence package defined in §4.3 and §8.3.
5. **Adopt MO-10:** report ops $/tonne and FTE/asset quarterly, with a not-to-exceed tripwire at the 0B gate, so the economics gate sees operations as the near-fixed cost it is.