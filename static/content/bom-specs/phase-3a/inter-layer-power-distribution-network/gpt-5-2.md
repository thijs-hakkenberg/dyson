---
bomId: "bom-3-7"
itemName: "Inter-Layer Power Distribution Network"
itemSlug: "inter-layer-power-distribution-network"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-07"
phase: "phase-3"
---

## Inter‑Layer Power Distribution Network (ILPDN) — Phase 3 Matroska Brain  
**BOM alignment:** This proposal specifies **bom-3-7 `inter-layer-power-distribution-network`** consistent with the consensus: **two-mode power architecture** (intra-layer HVDC + inter-layer optical/microwave beaming), sized for **10⁸–10¹¹ power interface units** and **10⁷–10⁹ backbone relays**, with strong emphasis on safety, fault isolation, manufacturability, and governance to prevent “power-beam as weapon” failure modes.

---

# 1) Recommended approach & design philosophy

### 1.1 Why a dedicated power network is required (even with TPV-per-tile)
A pure Matroska cascade (each layer powered only by TPV harvesting of inner-layer waste heat) is elegant but brittle. In practice Phase 3 needs **deliberate power routing** for:

- **Manufacturing foundries** (bom-3-4): power demand is spiky, not co-located with optimal thermal gradients, and must continue during partial shell outages.
- **Outer/cold layers**: at large radii, geometry, shadowing, and low radiative flux make “local-only” harvesting unreliable; moreover cryogenic systems (bom-3-3) require controllable power.
- **Bootstrapping & recovery**: after faults, you need power to restart comms, attitude control, and thermal control before compute tiles can rejoin the cascade.
- **Decoupling**: power contracts between layers allow changes in shell radii/temperatures without redesigning every tile.

### 1.2 Design philosophy
1. **Local first, backbone second:** each computational tile remains primarily self-powered by local TPV/PV; ILPDN provides *make-up power*, *export power*, and *operational resilience*.
2. **No long continuous conductors across AU:** avoid kilometer-to-AU physical cables between shells (micrometeoroids + dynamics + mass). Use **beamed power** for inter-layer transfer.
3. **HVDC microgrids within each layer:** short-range distribution and buffering using **segmented HVDC** with aggressive fault isolation.
4. **Safety by physics + protocol:** beams are **inherently non-lethal by default** via divergence floors, coded pilots, and receiver-auth gating; any “high intensity” mode requires multi-party authorization and is geographically constrained.
5. **Standardized power interfaces (“Power API”):** every tile/foundry/relay implements a small set of electrical and optical power contracts so the swarm can evolve.

---

# 2) Top-level architecture

### 2.1 Functional blocks
- **Intra-layer HVDC Microgrid (IL-HVDC):** connects tiles, radiators, relays, robots, and local storage within a shell region (“power cell”).
- **Inter-layer Beamed Power Links (IBPL):** optical (primary) and microwave (secondary) power transfer between shells and to off-shell assets (foundries, logistics nodes).
- **Power Interface Units (PIUs):** ubiquitous converters/controllers at endpoints (tiles, foundries, relay stations).
- **Backbone Power Relay Stations (BPRS):** dedicated beaming hubs with large apertures, storage, and thermal rejection.
- **Energy Storage & Ride-through:** short-duration (seconds–hours) storage everywhere; longer storage (days) at hubs/foundries.

### 2.2 ASCII architecture diagram (conceptual)

```
   Inner Shell (hot)          Mid Shell(s)                 Outer/Cryo Shell
  [TPV/PV Tiles]            [TPV Tiles + Compute]          [Cold compute + cryo]
      |   |                       |   |                        |   |
      |  IL-HVDC microgrid        |  IL-HVDC microgrid         |  IL-HVDC microgrid
      |   |                       |   |                        |   |
   [PIU][PIU]                  [PIU][PIU]                   [PIU][PIU]
      \   |                       /   |                        /   |
       \  |                      /    |                       /    |
        \ |     Inter-layer beamed power (optical primary)    /     |
         \|   (BPRS hubs + authenticated receivers + storage) /      |
        [BPRS] <=====> [BPRS] <=====> [BPRS] <=====> [BPRS] <------/
           \                 \                 \
            \                 \                 +--> Foundries / logistics nodes
             +--> Foundries    +--> Comm relays / time authority constellation
```

---

# 3) Key assumptions (explicit)
These drive numbers; adjust as Phase 3 radii/temperatures firm up.

1. **Layer radii:** not fixed here; assume representative separations of **0.5–5 AU** between adjacent functional “power domains” for early build-out, potentially larger later.
2. **Power needs:**
   - Compute tiles primarily self-powered; ILPDN supplies **~1–10% make-up** and **contingency/restart**.
   - Foundries: assume **10–100 MW average** per large foundry during steady production (dominated by refining + fab + thermal control), with peaks higher.
   - Cryogenic systems: assume **kW–MW-class** per cryo unit depending on architecture; aggregate can be enormous, so the design must scale.
3. **Beamed power wavelength:** **1.06 µm** (Nd:YAG/Yb fiber class) preferred for high-efficiency lasers and manageable optics; **1.55 µm** acceptable; microwave at **5.8 GHz or 35 GHz** as fallback where pointing is difficult.
4. **Optical conversion:** receiver uses **laser PV (LPV)** at **50–70%** electrical efficiency (aggressive but plausible with narrowband, high-intensity illumination and photon recycling).
5. **End-to-end beamed power efficiency (optical):** target **25–45%** (laser 60–75% × transmission 90–99% × LPV 50–70% × power electronics 90–97%).
6. **Micrometeoroid environment:** constant attrition; all nodes must tolerate punctures and have graceful degradation.

---

# 4) Technical specifications (numbers)

## 4.1 Intra-layer HVDC microgrid (IL‑HVDC)

### 4.1.1 “Power Cell” concept
A shell is partitioned into **power cells** (local microgrids) sized to keep conductors short and fault domains small.

- **Cell linear scale:** 1–10 km typical (layer dependent)
- **Cell served load:** 10–500 MW equivalent (tiles + relays + robots + storage charging)
- **Topology:** ring + radial spurs, normally-open tie switches between adjacent cells
- **Nominal bus voltage:** **±10 kV to ±50 kV DC** (selected per layer to balance conductor mass vs arcing risk)
- **Distribution medium:** thin-film aluminum/copper conductors laminated into structural membranes where available; otherwise free-flying “power truss ribbons” with periodic droppers.

### 4.1.2 Conductor & protection approach
- **Segmentation:** isolation every **100–500 m** via solid-state DC breakers.
- **DC breaker spec (typical PIU-scale):**
  - Interrupt: **5–50 kA** (layer dependent)
  - Voltage: **10–50 kV**
  - Clearing time: **<50 µs** detection + **<1 ms** isolation
- **Fault detection:** traveling-wave + differential current + arc signature.
- **Arc management:** operate conductors in **controlled plasma-free standoff**; use **field grading** and **conformal insulation** in regions with higher particle density; prefer **distributed small conductors** over single large ones.

### 4.1.3 Power quality
- **DC bus ripple:** <1% (PIU regulates locally)
- **EMI control:** spread-spectrum switching; optical comms immune but sensors/quantum candidates are not.

---

## 4.2 Power Interface Unit (PIU) — endpoint standard module

PIUs exist at every meaningful endpoint: compute tile clusters, relay nodes, foundries, cryo units, robotics depots.

### 4.2.1 PIU functions
- HVDC/DC-DC conversion (buck/boost, isolation as needed)
- Battery/supercap interface
- Beam receiver interface (LPV or rectenna)
- Metering + authentication (“power contract” enforcement)
- Fault isolation + safe shutdown
- Thermal management interface to radiator system (bom-3-3)

### 4.2.2 PIU variants (representative)
**PIU‑T (Tile PIU, mass-produced)**
- Power: **0.5–10 kW** continuous
- Input: local TPV/PV + HVDC spur + optional micro-beam receiver
- Mass: **0.5–2 kg**
- Efficiency: **>96%** DC-DC at rated load
- Storage: **0.1–1 MJ** supercap (seconds of ride-through)

**PIU‑R (Relay PIU)**
- Power: **1–50 kW**
- Mass: **2–20 kg**
- Adds: high-reliability power conditioning for optics, pointing actuators

**PIU‑F (Foundry PIU / substation)**
- Power: **10–200 MW** per substation module (stackable)
- Mass: **20–200 tonnes** (dominated by power electronics + thermal)
- Efficiency: **>98%** at scale (multi-level converters)
- Storage: **0.1–5 GJ** local (minutes–hours), plus longer-duration storage at site

**PIU‑C (Cryo PIU)**
- Power: **10 kW–10 MW**
- Extreme low-noise mode for superconducting/quantum-ready loads
- Adds: vibration isolation interface, harmonic filtering, fail-safe thermal dump

### 4.2.3 Standard electrical interfaces (the “Power API”)
- **HVDC bus:** ±10/±20/±50 kV (layer chooses one; adapters exist)
- **Local DC rails:** 48 V, 400 V, 1 kV (industrial standards)
- **Control:** deterministic time-stamped messages over the optical comm backbone (bom-3-2) with local fallback bus.

---

## 4.3 Inter-layer Beamed Power Links (IBPL)

### 4.3.1 Optical beaming (primary)
**Use case:** high-efficiency transfer between shells and to foundries; precise pointing available via existing optical comm infrastructure.

**Representative link classes**

**Class O‑A (Short inter-layer, “adjacent shells”)**
- Range: **0.01–0.2 AU**
- Transmitter optical power: **10–500 MW**
- Aperture: **5–50 m** (segmented membrane telescope)
- Pointing: **0.05–0.5 µrad** (closed loop with beacon)
- Receiver: **LPV array** 50–500 m diameter equivalent (distributed)
- Delivered electrical: **3–200 MW** (after losses)

**Class O‑B (Medium, “shell to foundry cluster”)**
- Range: **0.2–2 AU**
- Transmitter optical power: **0.1–5 GW**
- Aperture: **50–300 m**
- Receiver: **0.5–5 km** distributed LPV/thermal receiver field
- Delivered electrical: **30 MW–2 GW**

**Class O‑C (Long, “outer layer support / emergency restoration”)**
- Range: **2–10+ AU**
- Transmitter optical power: **1–20 GW**
- Aperture: **0.3–2 km** sparse phased array of laser subapertures
- Receiver: **5–50 km** sparse LPV field (low areal mass)
- Delivered electrical: **0.2–5 GW**
- Note: used sparingly; economics push you toward *staged relays* instead.

### 4.3.2 Relay-staged beaming (preferred over extreme apertures)
Rather than a single 10 AU shot, use **power-hop relays** every 0.2–1 AU (or co-located with comm relays where practical). This:
- reduces aperture sizes,
- reduces pointing stringency,
- allows dynamic rerouting around dust or failures,
- makes “beam weaponization” harder (no single node has line-of-sight + power to reach far targets).

### 4.3.3 Microwave beaming (secondary / robustness mode)
**Use case:** degraded pointing, dusty lines of sight, or when optical components are damaged/darkened.

- Frequency: **5.8 GHz** (mature rectenna tech) or **35 GHz** (smaller apertures, more pointing)
- End-to-end efficiency: **10–25%** typical (lower than optical)
- Aperture: larger for same divergence; mass may be higher but easier materials.

---

## 4.4 Backbone Power Relay Station (BPRS)

A BPRS is the “substation + beamport” of the ILPDN.

### 4.4.1 BPRS baseline module (BPRS‑100)
- Delivered electrical throughput: **100 MW** continuous (bidirectional)
- Peak: **300 MW** (minutes)
- Mass: **200–800 tonnes**
- Components:
  - Laser/phased-array transmitter (60–75% electrical-to-optical)
  - Receiver LPV field (if acting as relay)
  - Power electronics + HVDC yard
  - Storage: **1–10 GJ**
  - Radiators: sized for **(1/η - 1)×P** waste; e.g., at 35% end-to-end, for 100 MW delivered you may dump ~200 MW locally across stages depending on where inefficiency occurs.
- Aperture: **50–200 m** class for O‑A/O‑B ranges
- Pointing: inherits comm backbone star trackers + beacon tracking

### 4.4.2 Scale-out
- **10⁷–10⁹ BPRS units** in the full concept is too many at this mass; therefore:
  - the majority of “backbone relays” in the consensus count should be **lightweight beam taps / micro-relays** (1–10 MW class) co-hosted with comm relays,
  - only **10⁴–10⁶ heavy BPRS** exist (100 MW–GW class), concentrated near foundries and major shell junctions.

I recommend interpreting the consensus “10⁷–10⁹ backbone relays” as **including small co-packaged beam nodes** (sub-ton to few-ton class) rather than all being hundred-ton stations.

---

# 5) Subsystems breakdown & interfaces

## 5.1 Subsystems
1. **IL‑HVDC conductors & switchgear**
2. **PIUs (tile/relay/foundry/cryo)**
3. **Optical power transmitters** (lasers, phased optical arrays, thermal control)
4. **Optical power receivers** (LPV arrays, thermal dump, protective shutters)
5. **Microwave transmit/receive** (fallback)
6. **Energy storage** (supercaps, flywheels, high-temp thermal storage, possibly metal-air or regenerative fuel cells where volatiles exist)
7. **Protection & governance layer** (authentication, beam gating, audit)
8. **Metrology & pointing** (beacons, ranging, calibration)

## 5.2 Interfaces to other Phase 3 BOM items
- **bom-3-1 compute tiles:** PIU‑T integrated; optional micro-beam receiver for blackstart and deficit compensation.
- **bom-3-2 optical backbone:** shared apertures, shared pointing sensors, shared time/frequency authority for coherent phased arrays.
- **bom-3-3 thermal management:** ILPDN is a major heat source; every BPRS/PIU‑F needs radiator coupling and possibly spectral-selective emission constraints.
- **bom-3-4 foundries:** primary customers; foundries also manufacture ILPDN components (power electronics, optics, membranes).
- **bom-3-5 distributed OS:** dispatches power flows, enforces contracts, schedules beam time, performs contingency restoration.
- **bom-3-6 logistics:** power delivery to mass-driver stations, catcher tugs, and transport depots.
- **bom-3-8 robotics:** robots use standardized PIU ports for charging and can deploy/repair conductors and receiver fields.

---

# 6) Autonomy, control, and communication requirements

## 6.1 Control hierarchy
- **Local (milliseconds–seconds):** PIU droop control, DC breaker action, beam interlocks.
- **Cell (seconds–minutes):** microgrid optimization, storage dispatch, local load shedding.
- **Inter-layer (minutes–hours):** beam scheduling, relay selection, congestion management.
- **Strategic (days–months):** capacity planning, maintenance routing, governance/audit.

## 6.2 Beam safety & anti-weaponization (mandatory)
**Hard requirement:** No single compromised node can repurpose ILPDN into a high-energy weapon.

Mechanisms:
1. **Receiver-authenticated power:** transmitter only ramps above a low safe pilot level when it receives a cryptographic + physical-layer handshake from the intended receiver (coded retroreflector modulation / beacon signature).
2. **Geofencing by ephemeris:** allowed beam corridors are precomputed; if pointing solution deviates, power clamps to pilot.
3. **Multi-party authorization for high power:** >X MW requires quorum from independent authority nodes (distributed OS + time authority constellation).
4. **Divergence floor:** never focus to “knife-edge” unless within a controlled relay corridor; enforce minimum spot size at any non-receiver distance.
5. **Fast abort:** <10 ms abort on loss of lock; local hardware interlock independent of software.
6. **Auditable power ledger:** every joule beamed is logged redundantly; anomalies trigger automatic isolation.

## 6.3 Blackstart & islanding
- Every power cell must survive as an **island** for extended periods.
- Minimum blackstart capability: enough to boot comms + attitude + thermal safing:
  - Tiles: seconds–minutes via supercap
  - Relays: minutes–hours
  - Foundries: hours–days (dedicated storage)

---

# 7) Manufacturing considerations (build on Phase 0–2)

## 7.1 What can be made with Phase 2 capabilities
- HVDC conductors (Al/Cu foils), structural membranes, radiators
- Basic power electronics packaging (not necessarily leading-edge semiconductors)
- Large-area optics membranes (moderate precision) for microwave and low-grade optical
- Rectennas (microwave receivers) are comparatively easy

## 7.2 What requires Phase 3 foundries (bom-3-4) maturity
- High-efficiency laser diodes / fiber lasers at massive scale
- High-performance wide-bandgap power semiconductors (SiC/GaN/diamond)
- High-efficiency LPV cells tuned to laser wavelength with photon recycling
- Precision segmented apertures and durable coatings

## 7.3 Mass production strategy
- **Standardize** PIUs to a small family; avoid bespoke designs per shell.
- Manufacture optics as **tiled segments** (like compute tiles) so damage only reduces capacity.
- Use **statistical quality control** + redundancy rather than perfection.

---

# 8) Development roadmap & TRL plan

## 8.1 Near-term demonstrations (Phase 2 extension → Phase 3 entry)
1. **10–100 kW optical power link** at 10⁴–10⁶ km range using existing collector-satellites as platforms.
2. **MW-class microwave beaming** to a moving receiver (tests pointing + rectenna).
3. **HVDC microgrid** on a dense collector cluster: demonstrate fast DC fault isolation and islanding.
4. **Receiver-auth handshake + abort** validated against adversarial scenarios.

## 8.2 Phase 3 early operational capability (EOC)
- Deploy **BPRS‑10** (10 MW) class hubs co-located with early foundries and comm relays.
- Provide power to:
  - foundry bootstrapping,
  - cryo testbeds,
  - emergency restoration for compute shell segments.

## 8.3 Full scale-out
- Transition to **relay-staged optical corridors** between major shells.
- Add GW-class hubs only where economics demand (foundry megaclusters, outer-layer cryo backbones).

---

# 9) Cost analysis (order-of-magnitude, “manufacturing-node-years” framing)

Dollar costs become abstract at Dyson scales; still, to align with consensus:

- **Total ILPDN program cost estimate:** **$10¹²–$10¹⁴** equivalent  
  **Confidence: Medium** (physics is sound; scale and manufacturing dominate).

Cost drivers:
1. Laser/LPV manufacturing at enormous scale
2. Power electronics (wide-bandgap devices) and thermal rejection hardware
3. Deployment/maintenance robotics time (ties to bom-3-8)
4. Governance/security engineering (ties to bom-3-5)

A more actionable internal metric:
- **Optical beaming capacity manufactured per year** (GW/year)
- **PIUs per year** (10⁹/year scale eventually)
- **Aperture area per year** (m²/year)

---

# 10) Risk assessment (with mitigations)

## 10.1 Technical risks
1. **LPV efficiency and degradation**
   - Risk: radiation darkening, thermal cycling, micrometeoroid pitting
   - Mitigation: tiled receivers, sacrificial front films, annealing protocols, easy replacement

2. **Laser diode lifetime at GW scale**
   - Risk: catastrophic optical damage, contamination
   - Mitigation: massive parallelism (10⁶–10⁹ emitters), derating, in-situ cleaning, modular swap

3. **Pointing and jitter**
   - Risk: maintaining µrad pointing across huge apertures
   - Mitigation: phased arrays with adaptive optics, beacon-assisted tracking, staged relays to reduce range

4. **Thermal management**
   - Risk: BPRS waste heat becomes local hot spot that disrupts Matroska thermal ladder
   - Mitigation: locate hubs where heat can be “usefully” radiated to next layer; integrate with bom-3-3 spectral plans; throttle and distribute

5. **HVDC arcing / insulation failure**
   - Risk: plasma events during solar storms, debris impacts
   - Mitigation: segmentation, fast breakers, redundant parallel conductors, storm-mode voltage reduction

## 10.2 Systemic / governance risks
1. **Weaponization**
   - Mitigation: receiver-auth gating, divergence floors, quorum authorization, auditable ledger, corridor geofencing

2. **Cascading failures (power + comm)**
   - Mitigation: local storage blackstart, independent safing channels, islanding, conservative load shedding

3. **Economic trap: ILPDN grows faster than useful compute**
   - Mitigation: strict rule: ILPDN capacity expands only to satisfy foundry throughput and cold-layer needs; compute tiles remain primarily local-powered.

---

# 11) Open engineering questions (specific, decision-driving)

1. **What fraction of total power must be routable?**  
   Is ILPDN sized for 1%, 5%, or 20% of total captured energy? This is the single biggest sizing variable.

2. **Optimal wavelength(s) for optical power beaming:**  
   1.06 µm vs 1.55 µm vs ~2 µm for dust tolerance and eye-safety is irrelevant in space, but optics/coatings and LPV bandgaps matter.

3. **Receiver architecture:**  
   Dense LPV “panel” vs sparse “LPV mesh” vs hybrid LPV + thermal receiver (heat engine). What is the best mass-per-delivered-watt?

4. **How to integrate ILPDN heat into the Matroska thermal cascade without breaking spectral selectivity?**  
   BPRS radiators may need their own spectral shaping or placement rules.

5. **HVDC voltage standardization across shells:**  
   Do we enforce one global HVDC standard (simplifies manufacturing) or allow per-layer standards (optimizes mass/efficiency)?

6. **Storage technology choice by layer temperature:**  
   Supercaps everywhere, but for hours-days: thermal storage, flywheels, chemical? Outer layers may have volatiles; inner layers may prefer high-temp thermal.

7. **Security model and governance:**  
   What constitutes an “authorized receiver” in a civilization-scale distributed OS? How are keys rotated over centuries?

---

# 12) Opinionated recommendation (executive engineering stance)

- Build ILPDN around **relay-staged optical power corridors** tightly coupled to the **optical comm backbone** (shared pointing, metrology, and routing philosophy).  
- Use **HVDC microgrids** only locally (km-scale), aggressively segmented, with PIUs as the universal “power appliance.”  
- Treat **beam safety/governance** as a *first-class hardware requirement*, not a software feature.  
- Do **not** attempt AU-scale single-hop “hero beams” as a baseline; they force extreme apertures and create unacceptable security and reliability risks.  
- Size ILPDN initially for **foundries + blackstart + cryo prototypes** (a few percent of local layer power), then scale as outer layers and cryogenic loads prove out.

If you provide your current Phase 3 shell radii/temperature ladder and a target foundry count/throughput, I can turn this into a parameterized sizing run (number of hubs per AU, aperture areas, GW capacity per corridor, storage mass, and expected delivered power at each layer).