---
bomId: "bom-3b-8"
itemName: "Thrust Stabilization Systems"
itemSlug: "thrust-stabilization"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-07"
phase: "phase-3b"
---

## bom-3b-8: Thrust Stabilization Systems (TSS) — Technical Proposal (Phase 3b Stellar Engine)

### Executive intent
Thrust Stabilization Systems (TSS) provide **multi‑million‑year attitude and thrust-vector stability** for a combined **Shkadov mirror + Caplan engine** stellar propulsion architecture. TSS is not “more thrust”; it is the **metrology, control authority, and fault-tolerant coordination layer** that keeps the net thrust vector aligned to the long-term trajectory while rejecting disturbances from solar variability, plume asymmetries, structural drift, and failures.

This proposal assumes Phase 2 Dyson swarm infrastructure exists (power, comm relays, manufacturing, and large-area structures), and Phase 3b thrust hardware (mirror and jet) is being deployed in parallel.

---

# 1) Recommended approach & design philosophy

### 1.1 Design philosophy: “Bias-stable thrust with distributed trimming”
The stellar engine produces enormous momentum exchange over geological time; even tiny misalignments integrate into large trajectory errors. The correct philosophy is:

1. **Make the primary thrust geometry inherently stable** (passive stability wherever possible).
2. **Measure thrust vector continuously** using redundant, physics-diverse observables (photon pressure, plume momentum, stellar limb imaging, helioseismology proxies).
3. **Trim with many small actuators** distributed across the mirror array and jet nozzle/field shapers, rather than relying on a few high-authority gimbals.
4. **Fail gracefully**: loss of any single node, mirror segment, or jet module must only reduce performance, not destabilize the thrust vector.
5. **Control in the lowest bandwidth that works**: avoid “chasing noise” from solar dynamics; use long time-constant estimators and only correct secular drift.

### 1.2 Control authority strategy (layered)
TSS is implemented as three nested layers:

- **Layer A — Passive geometric stability**
  - Shkadov mirror center-of-pressure alignment, curvature control, and “weathervane” tendencies designed into the array.
- **Layer B — Quasi-static trimming (hours to months)**
  - Mirror segment micro-tilt, reflectivity modulation, and small differential thrust in jet modules to null drift.
- **Layer C — Long-horizon guidance (years to millennia)**
  - Trajectory optimization, thrust scheduling, and health-aware reconfiguration.

### 1.3 Why this approach is best
- **Distributed control** scales with swarm size and is robust to attrition.
- **Mirror-based trimming** is propellantless and extremely reliable for the required timescales.
- **Jet asymmetry trimming** is powerful but should be minimized because it couples to thermal/plasma instabilities; it is reserved for slower corrections and contingencies.

---

# 2) Key assumptions (explicit)

| Parameter | Assumption | Rationale |
|---|---:|---|
| Solar luminosity | \(L_\odot = 3.846\times10^{26}\,\text{W}\) | Standard |
| Caplan-engine net acceleration | \(a \sim 10^{-9}\,\text{m/s}^2\) | From prompt |
| Shkadov acceleration | \(a \sim 10^{-12}\,\text{m/s}^2\) | From prompt |
| Required thrust-vector pointing error | ≤ **10 nrad** (1σ, long-term mean) | Keeps lateral acceleration ≤1e-17 m/s² at 1e-9 m/s² thrust; integrates to manageable cross-track over 10^6 yr |
| Control update cadence | 10–10,000 s (inner), days–months (outer) | Solar variability + structural drift |
| Mirror distance from Sun | 2–5 AU equivalent station-keeping region (design-dependent) | Keeps thermal manageable; matches common Shkadov concepts |
| Time horizon | 10^6 years with maintainable modules | Stellar engine timescale |

*Note:* 10 nrad is aggressive. The system is designed to **achieve ~10–100 nrad** depending on epoch and health; guidance can tolerate larger short-term errors if long-term mean is corrected.

---

# 3) What TSS must do (requirements)

### 3.1 Functional requirements
1. **Estimate net thrust vector** (magnitude + direction) of combined mirror + jet to ≤10–100 nrad (direction) and ≤10^-6 relative (magnitude) over averaging windows.
2. **Actuate trimming** to keep thrust vector aligned to commanded inertial direction within allocated error budget.
3. **Reject disturbances**:
   - Solar luminosity and wind fluctuations
   - Jet plume asymmetries
   - Mirror shape drift, micrometeoroid damage, thermal gradients
   - Module failures and communication partitions
4. **Maintain long-term ephemeris and trajectory** in barycentric frame; coordinate with Phase 3a compute layer for prediction and planning.

### 3.2 Performance requirements (top-level)
- **Directional stability (net thrust vector):**
  - Short-term (10^3–10^5 s): ≤1 µrad
  - Long-term mean (≥1 year): ≤10–100 nrad (health-dependent)
- **Trim authority:**
  - Ability to command **±1% differential thrust** across mirror and jet subsystems at any time (for vector trimming).
- **Availability:**
  - ≥0.9999 effective uptime (with graceful degradation)
- **Radiation/particle resilience:**
  - Designed for high-energy particle environment and long-duration fatigue.

---

# 4) System architecture

## 4.1 High-level architecture
TSS is a **distributed sensing + distributed actuation + hierarchical control** network spanning:

- Shkadov Mirror Array (SMA)
- Caplan Jet Array (CJA)
- Reference Metrology Constellation (RMC) — free-flying “truth” sensors
- Dyson Integration Layer (DIL) — power, timing, comm backbone
- Trajectory and Attitude Control Compute (TACC) — redundant compute nodes

### ASCII overview
```
                     [Dyson Integration Layer (power/time/comm)]
                                  |            |
                                  |            |
        --------------------------+------------+-------------------------
        |                         |            |                        |
 [Shkadov Mirror Array]     [Reference]   [Trajectory &]        [Caplan Jet Array]
 (actuators + sensors)      [Metrology]   [Attitude Ctrl]       (actuators + sensors)
        |                   Constellation     Compute                  |
        |                         |            |                        |
   micro-tilt,                star imaging,  guidance,             jet module
 reflectivity trim,           radiometry,    estimation,           throttling,
 shape control                inertial refs  fault mgmt            field shaping
```

## 4.2 Control partitioning
- **Local Control (segment/module level):** kHz–Hz loops for pointing/shape/thermal.
- **Regional Control (clusters):** seconds–hours for trim and load balancing.
- **Global Control (TACC):** hours–months for net thrust vector alignment and trajectory.

---

# 5) Subsystems breakdown & interfaces

## 5.1 TSS-1: Reference Metrology Constellation (RMC)
**Purpose:** Provide inertial and radiometric truth independent of mirror/jet structural biases.

### Elements
- **RMC Nodes:** free-flying spacecraft in heliocentric orbits (e.g., 1–10 AU), with long baseline geometry.
- **Instruments (per node):**
  - Solar limb imager (coronagraphic capability)
  - Absolute radiometer (solar constant + anisotropy)
  - Spectrometer (plume line diagnostics if in view)
  - Laser ranging transceiver (inter-node + to mirror/jet beacons)
  - Atomic clock (optical lattice class) or pulsar timing receiver (as backup)

### Proposed scale (initial operational)
- **N = 48 nodes** in 3 rings (inner ~1 AU, mid ~3 AU, outer ~8 AU), 16 each.
- **Node dry mass:** ~2,000 kg
- **Power:** 20–50 kW (Dyson-beamed or onboard)
- **Comms:** optical crosslinks 10–100 Gbps burst, kbps continuous housekeeping
- **Pointing:** <50 nrad knowledge (averaged), <1 µrad control

**Interfaces**
- Time sync from DIL (primary) + inter-node clock discipline
- Optical ranging to SMA and CJA fiducials
- Data uplink to TACC

**Why this matters:** Without an external metrology layer, the system risks “closing the loop on its own biases” (mirror deformation interpreted as thrust error, etc.), causing slow divergence over millennia.

---

## 5.2 TSS-2: Shkadov Mirror Trim & Shape Control (SMTSC)
**Purpose:** Provide propellantless fine control of net photon thrust direction and magnitude.

### Actuation methods (recommended combination)
1. **Segment micro-tilt actuators**  
   - Each mirror segment has ±10–100 µrad tilt range, nrad resolution.
   - Implement via electrostatic or piezoelectric truss elements (scaled for vacuum and radiation).
2. **Reflectivity modulation (“gray trim”)**  
   - Variable reflectance coatings or electrochromic layers to modulate local photon pressure by ±0.1–1%.
   - Used for ultra-low bandwidth trimming and failure compensation.
3. **Curvature/figure control**  
   - Maintains parabolic geometry and center-of-pressure predictability.
   - Uses distributed edge actuators and laser metrology.

### Segment-level notional specs (illustrative; actual Phase 2 mirror segmentation may differ)
- **Segment characteristic size:** 1–10 km class panels (assembled from smaller tiles)
- **Local actuator authority:** equivalent to changing local normal vector by ±100 µrad
- **Local power:** 10–100 W per km² for actuators + sensors (excluding comm)
- **Metrology:** laser interferometric ranging between segment nodes; thermal sensors

### SMTSC performance
- **Net thrust vector trim authority:** at least **±0.5 µrad** instantaneous via differential tilts (global), with long-term mean down to **10–100 nrad** using averaging and gray trim.
- **Response time:** minutes to hours (intentionally slow to avoid exciting structural modes).

**Interfaces**
- Receives thrust-vector error from TACC
- Sends segment health, pose, and optical figure state
- Power and timing from DIL

---

## 5.3 TSS-3: Caplan Jet Vector Control & Symmetry Management (CJVCSM)
**Purpose:** Ensure jet thrust is symmetric, stable, and aligned; provide trimming when mirror authority is insufficient or unavailable.

### Actuation methods
1. **Module throttling & differential flow control**
   - If jet is composed of many parallel nozzles/accelerators, adjust thrust distribution.
2. **Electromagnetic nozzle field shaping**
   - Adjust magnetic/electric field topology to steer exhaust by tiny angles (µrad–mrad range).
3. **Fuel mix / burn phasing control**
   - Control helium fusion power distribution to stabilize plume.

### Notional module architecture
- **Jet array** composed of **M = 10,000–1,000,000** modules (scales with Caplan design)
- **Per-module thrust:** chosen so that loss of a module is negligible (<10^-6 net)
- **Per-module sensors:** plume spectroscopy, magnetometer, current/voltage, particle flux

### CJVCSM performance targets
- **Vector trim authority:** ±1–10 µrad (global) using distributed steering; reserve ±0.1 mrad for contingency.
- **Stability:** suppress low-frequency “wander” from plasma instabilities to <1 µrad over 10^4 s averaged.

**Interfaces**
- Receives vector trim commands from TACC
- Sends plume diagnostics and thrust estimates
- Requires high-reliability power conditioning from DIL

---

## 5.4 TSS-4: Thrust Vector Estimation & Fusion (TVEF)
**Purpose:** Convert heterogeneous sensor data into a single best estimate of net thrust vector and uncertainty.

### Inputs
- RMC radiometry (anisotropy of solar radiation field)
- SMA segment pose + reflectivity state + optical figure
- CJA module thrust telemetry + plume diagnostics
- Solar activity forecasts (from helioseismology + magnetograms, likely Phase 3a products)
- Orbital dynamics and barycentric ephemeris

### Estimation approach (recommended)
- **Factor-graph / smoothing** (not just Kalman) over long windows (days–months)
- Explicit modeling of:
  - Solar luminosity variations
  - Mirror deformation modes
  - Jet module bias drift
- Produce:
  - Net thrust vector \(\vec{T}(t)\)
  - Covariance (uncertainty ellipsoid)
  - Bias estimates per subsystem for calibration

**Compute**
- Runs on redundant TACC nodes; uses Matrioshka Brain compute if available, but must be able to operate in reduced mode locally.

---

## 5.5 TSS-5: Global Guidance, Scheduling, and Fault Management (GGSFM)
**Purpose:** Convert mission trajectory goals into thrust-vector commands and reconfigure around failures.

### Functions
- Long-horizon thrust scheduling (account for solar cycles, maintenance windows)
- Allocation of trim between mirror and jet (optimize for stability and wear)
- Fault detection, isolation, and recovery (FDIR)
- Safe modes:
  - “Passive-only” mode: mirror holds coarse thrust, jets idle
  - “Jet-only” mode: mirror stowed or degraded
  - “Hold-vector” mode: prioritize direction over magnitude

### Control allocation philosophy
- Use mirror trim for **continuous fine correction** (propellantless, low noise).
- Use jet trim for **coarse correction** and **contingency** (higher authority, higher coupling).

---

# 6) Technical specifications (system-level numbers)

Because the stellar engine’s physical scale is extreme and depends on Phase 2/3 hardware choices, TSS is specified as **fractions and capabilities**, plus concrete sizing for the metrology and compute layers.

## 6.1 System-level mass & power (initial operational capability, IOC)
- **RMC total mass:** ~48 × 2,000 kg = **96,000 kg**
- **TACC compute nodes:** 12 nodes × 20,000 kg = **240,000 kg** (radiation-hardened, redundant, with large radiators)
- **SMA incremental TSS hardware mass:** dominated by actuators/metrology embedded in mirror; allocate **0.1–1 kg/m²** of mirror area for TSS functions (actuators, wiring, beacons, sensors). (Exact depends on mirror areal density.)
- **CJA incremental TSS hardware mass:** **1–5%** of jet module mass (sensors, field control, comm).

**Power**
- **RMC:** 1–2 MW total (beamed or local)
- **TACC:** 5–50 MW total depending on compute intensity and comm routing
- **SMA TSS embedded:** ~0.01–0.1 W/m² average for steady trim; peaks higher during reconfiguration
- **CJA TSS embedded:** ~0.1–1% of jet electrical power for field shaping and diagnostics

## 6.2 Pointing/knowledge performance (aggregate)
- **Net thrust vector knowledge:** 10–100 nrad (annual mean), 1 µrad (hourly)
- **Net thrust vector control:** 100 nrad–1 µrad (annual mean), depending on health and actuation margin
- **Time synchronization:** <1 ns across TACC/RMC for coherent ranging; <1 µs for most control loops

---

# 7) Autonomy, control, and communications

## 7.1 Autonomy requirements
TSS must operate with **intermittent partitions** and **centuries-scale software evolution**.

- **Local autonomy:** mirror segments and jet modules maintain safe pointing and thermal limits without global commands for months.
- **Regional autonomy:** clusters elect leaders, maintain trim targets, and reconcile when comm returns.
- **Global autonomy:** TACC can run fully automated for decades with periodic policy updates.

## 7.2 Control loops (bandwidth separation)
- **Fast loops (Hz–kHz):** local structural damping, magnetic field stabilization, thermal regulation.
- **Medium loops (10^-4–10^-2 Hz):** thrust trimming, segment alignment, module balancing.
- **Slow loops (10^-8–10^-5 Hz):** trajectory correction, bias estimation, calibration.

## 7.3 Communications
- **Optical backbone** via Dyson comm relays:
  - Regional: Tbps burst for state sync and software distribution
  - Continuous: Mbps–Gbps per cluster for telemetry summaries
- **Time transfer:** optical two-way time/frequency transfer on backbone; atomic clocks at key nodes.

---

# 8) Manufacturing and deployment considerations

## 8.1 Manufacturing
- **Mirror segment TSS hardware** should be manufactured inline with mirror fabrication:
  - Printed conductor grids for electrostatic actuators
  - Embedded fiber-optic strain/temperature sensors
  - Integrated corner-cube/laser beacon fiducials
- **RMC nodes** are conventional spacecraft by Dyson-era standards; mass-producible with high-reliability optics and clocks.
- **TACC nodes** are “data-center spacecraft” with extreme redundancy and long-life thermal management.

## 8.2 Deployment sequence (recommended)
1. Deploy **RMC inner ring** first to establish inertial truth and timebase.
2. Bring up **SMA trim** capabilities early (even before full mirror aperture) to validate control authority.
3. Deploy **CJA diagnostics + symmetry control** before full thrust operation; run “cold plume” tests if possible.
4. Expand RMC to mid/outer rings to improve geometry and robustness.

---

# 9) Development roadmap & TRL

### 9.1 Near-term precursors (TRL uplift)
- **Distributed optical metrology at AU baselines** (TRL 3→6): build on LISA-like interferometry, deep-space optical comm.
- **Ultra-large segmented mirror control** (TRL 2→5): extrapolate from telescope segment phasing + solar sail attitude control.
- **Plasma jet vector control** (TRL 2→4): requires significant research; closest analogs are magnetic nozzles and fusion plasma confinement control.

### 9.2 Milestones
- **M1 (Phase 2 late):** Demonstrate 10 nrad-class attitude knowledge on a 10^6 km baseline (prototype RMC pair).
- **M2:** Demonstrate segment micro-tilt + optical figure control on a 1–10 km mirror demonstrator.
- **M3:** Demonstrate multi-module jet symmetry estimation and control in a scaled plasma facility / heliophysics testbed.
- **M4 (Phase 3b IOC):** RMC inner ring + partial SMA + partial CJA closed-loop vector control to 1 µrad (hourly).
- **M5 (Phase 3b FOC):** Achieve 10–100 nrad annual mean alignment with full redundancy.

---

# 10) Cost analysis / budget estimates (order-of-magnitude)

Given Dyson-scale economics, “cost” is dominated by **energy, mass throughput, and opportunity cost**. Still, for planning:

### 10.1 Mass-production cost proxy (in-space manufactured)
Assume mature in-space manufacturing cost equivalent:
- **$10–$100/kg** (energy + maintenance amortized) for bulk structures
- **$1,000–$10,000/kg** for high-precision optics/clocks/electronics

### 10.2 TSS cost buckets (IOC)
- **RMC:** 96,000 kg × ($5k/kg avg) ≈ **$0.5B**
- **TACC nodes:** 240,000 kg × ($5k/kg avg) ≈ **$1.2B**
- **SMA embedded TSS:** depends on mirror area; allocate **1–5%** of SMA program mass/cost
- **CJA embedded TSS:** allocate **2–10%** of CJA program cost (plume diagnostics + field control are nontrivial)

### 10.3 Programmatic estimate
- **Non-recurring engineering (NRE):** $5–$50B equivalent (precision metrology, autonomy, plasma control)
- **Recurring (production/deployment):** $2–$20B equivalent for IOC, scaling with redundancy goals

*Interpretation:* Relative to the stellar engine megastructure, TSS is a **single-digit percent** cost adder that prevents catastrophic long-term trajectory loss—high leverage.

---

# 11) Risk assessment

## 11.1 Top risks (and mitigations)

1. **Unmodeled solar variability causes thrust-vector noise floor**
   - *Mitigation:* long-window estimators; incorporate helioseismology/magnetogram forecasting; avoid high-gain control.

2. **Mirror structural modes / creep induce slow bias**
   - *Mitigation:* continuous laser metrology; periodic recalibration using RMC truth; design mirror with passive thermal symmetry.

3. **Jet plume instabilities couple into vector control**
   - *Mitigation:* enforce symmetry by design (many small modules); keep steering small; use plume diagnostics to detect bias early.

4. **Time/clock drift over centuries**
   - *Mitigation:* multi-source time discipline (optical clocks + pulsar timing); periodic re-baselining via RMC geometry.

5. **Software/AI alignment and long-term autonomy failures**
   - *Mitigation:* verifiable control laws at low level; policy constraints; layered safe modes; diversity in implementations.

6. **Communication partitions**
   - *Mitigation:* regional autonomy; consensus algorithms tolerant to delays; store-and-forward with eventual consistency.

---

# 12) Open engineering questions (must be answered early)

1. **Where is the Shkadov mirror located (AU, geometry), and what is its segmentation/areal density?**  
   TSS actuator sizing and metrology topology depend strongly on this.

2. **Caplan engine architecture detail:** number of jet modules, nozzle physics, and how thrust is distributed.  
   Determines whether vector control is primarily electromagnetic steering or throttling-based.

3. **Required trajectory accuracy:** what cross-track error over 10^6 years is acceptable?  
   This sets the pointing requirement (10 nrad vs 1 µrad changes everything).

4. **Metrology observables selection:** is radiometric anisotropy sufficient, or must we rely on dynamical measurement (acceleration inferred from ephemeris drift)?  
   Likely both; need a formal observability analysis.

5. **Failure/attrition model:** expected micrometeoroid damage rates and replacement cadence.  
   Drives redundancy and the economics of “overbuild vs maintain.”

6. **Governance and control authority:** who sets trajectory policy, and how are commands authenticated over millennia?  
   This is a technical requirement (crypto agility, key management, consensus).

---

# 13) Opinionated summary: best approach
Build TSS as a **metrology-first, distributed-trim** system:

- **External truth (RMC)** prevents slow bias accumulation.
- **Mirror micro-tilt + reflectivity trim** provides the cleanest, most reliable fine control.
- **Jet symmetry management** is essential but should be used sparingly for fine pointing; keep the jet array massively modular to average out instabilities.
- **Hierarchical autonomy** is non-negotiable: the system must keep the thrust vector sane even when half the network is down.

---

If you provide (a) the intended Shkadov mirror geometry (radius, distance, subtended angle), (b) the Caplan engine module count and layout, and (c) the allowed cross-track error budget at 1 million years, I can tighten this into a fully quantified control error budget (sensor noise → estimator → actuator authority) and produce concrete sizing for segment actuator resolution, RMC baseline geometry, and comm/time-transfer requirements.