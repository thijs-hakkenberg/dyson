---
bomId: "bom-3-1"
itemName: "Computational Substrate Tiles"
itemSlug: "computational-substrate-tiles"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-07"
phase: "phase-3"
---

## Computational Substrate Tiles (bom-3-1) — Detailed Technical Proposal  
**Project Dyson | Phase 3: Matroska Brain | Category: Computing | slug: `computational-substrate-tiles`**

### Executive intent
Computational Substrate Tiles (CSTs) are the mass-produced “cells” of the Matroska Brain: each is a self-contained power-harvesting + compute + memory + networking + thermal-interface module designed to be manufactured autonomously, deployed in vast numbers, and to fail gracefully. The CST design must make the thermodynamic cascade *predictable* (known heat flux, known spectrum, known emissivity) while remaining flexible in compute architecture (ASIC vs neuromorphic vs reversible) and in operating temperature regime (hot/mid/cold variants).

The key engineering choice I recommend: **standardize the mechanical/thermal/electrical/network interfaces across all layers**, and allow **compute “cartridges”** to vary by layer temperature and technology maturity. This de-risks the program: tiles can begin life as conventional high-efficiency ASIC compute and later transition to adiabatic/reversible logic without changing the swarm’s structural/thermal architecture.

---

# 1) Recommended approach & design philosophy

### 1.1 “Thermal-first” design
A Matroska Brain is fundamentally a **heat engine made of computation**. Therefore CSTs are specified primarily by:

- **Allowed heat flux density** (W/m²) into/out of tile  
- **Spectral emissivity/reflectivity** on each face  
- **Permissible junction temperatures** and gradients  
- **Power conversion efficiency** (TPV/PV) and its degradation

Compute performance is a dependent variable.

### 1.2 Interface standardization + cartridge modularity
Each tile is built around a **Thermal Backbone Plane (TBP)** with standardized:
- thermal contact pads / heat spreader geometry
- HVDC bus voltage and connector protocol
- optical comm transceiver mount points and alignment fiducials
- mechanical latch/hinge points for membrane integration

Compute and memory are implemented as replaceable **Compute Cartridges** bonded to the TBP. This enables:
- in-situ upgrade cycles
- layer-specific compute tech
- high yield despite fab variability

### 1.3 Three tile variants (same interfaces)
- **CST-H (Hot Layer tile):** ~800–1200 K environment, wide-bandgap electronics (SiC/GaN/diamond), TPV tuned to inner radiator spectrum.
- **CST-M (Mid Layer tile):** ~200–400 K, advanced silicon/3D integration, highest compute density per mass.
- **CST-C (Cold Layer tile):** ~40–80 K (and optionally lower with active cooling infrastructure), superconducting interconnect options, quantum-*ready* footprints but not quantum-dependent.

---

# 2) Operating context & assumptions (explicit)

### 2.1 Layer model (for sizing)
To keep numbers concrete, I assume an initial 3-layer computational deployment (expanding later):

- **Layer L1 (hot compute):** absorber sees ~1200 K effective radiation from inner radiator surfaces (not solar photosphere).  
- **Layer L2 (mid compute):** absorber sees ~300–500 K effective radiation.  
- **Layer L3 (cold compute):** absorber sees ~60–120 K effective radiation and/or receives beamed power (per Phase 3 power backbone).

This aligns with the consensus that TPV at low source temperature is hard; therefore outer layers cannot rely purely on passive TPV for all power.

### 2.2 Tile population
- **Initial operational capability (IOC):** ~10¹² tiles total across layers  
- **Full build-out:** 10¹³–10¹⁴ tiles

### 2.3 Reliability target
- Designed for **continuous partial failure**: tolerate **≥5% tile loss/year** without systemic collapse (software + routing + task replication handle it).
- Tile physical lifetime goal: **10–30 years median**, with refurbishment cycles.

---

# 3) System architecture (tile-level)

## 3.1 Tile functional block diagram (generic)

```
          Sunward / inward-facing side (power harvest)
   ┌────────────────────────────────────────────────────────┐
   │  Spectral filter / photon recycling layer               │
   │  TPV/PV array + MPPT + DC/DC                            │
   │  Micrometeoroid self-healing topcoat (thin)             │
   └───────────────┬────────────────────────────────────────┘
                   │  HVDC (tile internal bus)
   ┌───────────────┴────────────────────────────────────────┐
   │   Thermal Backbone Plane (TBP)                          │
   │   - heat spreader (pyrolytic graphite / C-C)            │
   │   - thermal diodes / heat switch options                │
   │   - power conditioning + protection                     │
   │   - timing/clock module                                 │
   │   - network switch + optical transceiver(s)             │
   └───────────────┬────────────────────────────────────────┘
                   │
   ┌───────────────┴────────────────────────────────────────┐
   │ Compute Cartridges (layer-specific)                     │
   │  - logic (ASIC/neuromorphic/reversible-ready)           │
   │  - local memory (NVM + DRAM-like)                       │
   │  - ECC + scrubbing + checkpoint engine                  │
   └───────────────┬────────────────────────────────────────┘
                   │
   ┌───────────────┴────────────────────────────────────────┐
   │ Anti-sunward / outward-facing radiator surface          │
   │  - spectral-selective emitter (matched to next layer)   │
   │  - emissivity control zones (optional)                  │
   └────────────────────────────────────────────────────────┘
```

## 3.2 Tiling & integration into shell membranes
Tiles mount to a **tensioned structural membrane** (part of bom-3-3 + bom-3-8), with small gaps for:
- deployment strain relief
- thermal expansion
- micrometeoroid puncture isolation

Recommended tessellation: **hexagonal** for packing efficiency and uniform neighbor count.

---

# 4) Technical specifications (dimensions, mass, power, performance)

Because consensus spans 1–50 m², I specify a **family** with one common interface set.

## 4.1 Mechanical form factors
### CST-10 (baseline) — recommended for IOC mass production
- **Area:** 10 m² hex tile (≈3.4 m flat-to-flat)  
- **Thickness:** 8–20 mm (excluding deployable skirts if used)  
- **Mass:** 20–60 kg depending on variant  
  - structure + TBP: 8–15 kg  
  - TPV/PV + filter stack: 4–12 kg  
  - compute + memory cartridges: 6–30 kg  
  - comm + control: 1–3 kg

### CST-50 (high-area) — later scaling option
- **Area:** 50 m² hex tile (≈7.6 m flat-to-flat)  
- **Mass:** 120–300 kg  
Used where deployment/handling economics favor fewer, larger units.

## 4.2 Electrical power (per 10 m² tile)
Power is dominated by incident radiative flux and conversion efficiency. For design sizing, specify **rated electrical output** at a reference irradiance.

### CST-H (hot) power
- **Reference incident radiative flux:** 20–60 kW/m² (engineering target; achieved by proximity to hot radiators rather than solar constant)  
- **TPV net efficiency target (system, incl. MPPT/DC/DC):** 25–40% at high source temperature with photon recycling  
- **Rated electrical output:** **50–200 kWe per 10 m² tile** (design range)  
- **Internal distribution:** 1–5 kV HVDC tile bus (lower current, lower conductor mass)

### CST-M (mid) power
- **Reference incident flux:** 2–15 kW/m²  
- **TPV efficiency:** 10–25% (hard; depends on narrowband emitters + good sub-bandgap reflection)  
- **Rated output:** **5–40 kWe per 10 m² tile**

### CST-C (cold) power
- Pure TPV from cold sources is poor. Baseline assumes **hybrid power**:
  - local TPV trickle + **beamed power pickup** (from bom-3-7) or local RTG-like sources only for control survival.
- **Rated output:** **0.5–10 kWe per 10 m² tile** (with beamed power), otherwise far less.

## 4.3 Compute performance (per 10 m² tile)
Compute is intentionally expressed as **performance per watt** and **per kg**, since absolute PFLOPS depends on architecture.

### IOC target (conservative, achievable with advanced ASIC + 3D packaging)
- **CST-H:** 5–50 PFLOP/s FP16-equivalent (or mixed precision AI TOPS)  
- **CST-M:** 20–200 PFLOP/s FP16-eq (best thermal regime for silicon)  
- **CST-C:** 1–50 PFLOP/s FP16-eq (lower clocks, but good for memory-heavy tasks)

Power-to-compute target at IOC:
- **10–50 GFLOP/s/W** at tile level (aggressive but plausible with specialized accelerators and low-voltage operation)

Aspirational (adiabatic/reversible):
- **100× improvement** in ops/J for suitable workloads, but TRL is low. The tile must not *require* this to function.

## 4.4 Memory & storage (per tile)
- **Fast memory:** 1–16 TB (HBM-like stacks or cryo SRAM variants)  
- **Persistent storage:** 0.1–10 PB (3D NAND-like or resistive NVM; radiation-hardened with heavy ECC)  
- **Checkpoint bandwidth:** ≥50 GB/s local write for fault tolerance

## 4.5 Thermal performance
Each tile is a controlled heat source that must present predictable outward emission.

- **Allowable internal ΔT (hot spot to radiator):**
  - CST-H: ≤40 K  
  - CST-M: ≤25 K  
  - CST-C: ≤10 K (to avoid local cold-stage overload)

- **Outward face emissivity (effective):** ≥0.85 in target band, ≤0.1 outside band (goal; achieved by photonic crystal/metasurface—high risk)

- **Heat flux capability (radiation-limited):**
  - CST-H outward emission at ~800–1200 K can reject very high flux
  - CST-M at ~250–400 K is much more area-limited
  - CST-C relies on very large radiators and/or active cooling (bom-3-3)

---

# 5) Subsystems breakdown & interfaces

## 5.1 Power harvesting subsystem (sunward face)
### Components
- **Spectral-selective absorber / filter stack**
  - goal: pass only useful band to TPV, reflect sub-bandgap back to inner radiator (photon recycling)
- **TPV cell array** (or PV for innermost special case)
  - CST-H: InGaAs/InGaAsSb/GaSb class bandgaps (tunable), or other III-V; radiation hardening required
  - CST-M: lower bandgap TPV cells are challenging; may require multi-junction + extreme photon recycling
- **MPPT + DC/DC**
  - radiation-tolerant, redundant, designed for graceful degradation
- **Protection**
  - arc detection, overvoltage clamps, isolation on puncture events

### Interfaces
- **Tile HVDC bus:** 1–5 kV nominal, negotiated by layer standards
- **Inter-tile power sharing:** optional, but recommended only for local smoothing; bulk power routing belongs to bom-3-7

## 5.2 Thermal Backbone Plane (TBP)
The TBP is the tile’s “contract” with the Matroska layer.

- **Heat spreader:** pyrolytic graphite sheet + carbon-carbon frame, or diamond composite in hot variant  
- **Embedded heat pipes / loop heat pipes:** where compatible with temperature regime  
- **Thermal fusing:** segment isolation so a puncture doesn’t cause runaway heat conduction into a torn membrane region  
- **Metrology:** distributed temperature sensors, heat flux estimation, emissivity health monitoring

## 5.3 Compute cartridges
### Cartridge concept
A cartridge is a sealed compute module with:
- logic die stack + interposer
- memory stacks
- local power regulation
- error detection + telemetry
- thermal interface pad to TBP

Cartridges are installed/removed by Phase 3 maintenance robots (bom-3-8).

### Recommended compute architectures by regime
- **CST-H (800–1200 K environment):**
  - keep compute die *thermally isolated* and run at lower junction temps if possible; otherwise use wide-bandgap electronics
  - candidate: SiC logic (lower density), GaN, diamond FET research
  - alternative: place compute on slightly shaded/insulated side and accept lower local temperature (but then you’re not truly a “hot compute” layer)
- **CST-M (200–400 K):**
  - advanced silicon ASIC accelerators; best manufacturing yield and density
- **CST-C (40–80 K):**
  - conventional silicon can operate cold with characterization; superconducting interconnects become attractive
  - reserve footprints for future quantum modules, but do not depend on them

## 5.4 Networking & timing
Each tile includes:
- **Intra-layer optical transceiver(s):** short range (10–10,000 km depending on mesh topology)  
- **Neighbor discovery + routing agent:** participates in hierarchical network (bom-3-2)  
- **Time sync client:** disciplined by time/frequency authority constellation (bom-3-2)

Physical layer recommendation:
- **1550 nm** for mature components + low loss optics; add **2 µm band** option for thermal background regimes where needed.
- Tile transceivers: 10–400 Gb/s per link IOC; scale by WDM lanes.

## 5.5 Mechanical attachment & serviceability
- **Mounting:** 3–6 kinematic mounts to membrane rails; allows thermal expansion without warping optics
- **Robotic service features:** fiducials, grapple points, standardized fasteners, alignment pins
- **Damage containment:** tear-stops and sacrificial edges; tile is replaceable rather than repair-in-place for most failures

---

# 6) Autonomy, control, and communication requirements

## 6.1 On-tile autonomy (must be minimal but robust)
Tile firmware responsibilities:
- safe boot, self-test
- power management + MPPT
- thermal safety (throttle compute, adjust emissivity zones if available)
- radiation upset recovery (watchdogs, triple modular redundancy for control MCU/FPGA)
- secure identity + attestation to distributed OS

## 6.2 Control hierarchy
- **Tile controller (milliseconds–seconds):** local stability, protect hardware  
- **Layer cluster manager (seconds–minutes):** allocate workloads, reroute around failures  
- **Global OS (minutes–hours):** long-horizon scheduling, data placement, replication strategy

## 6.3 Networking requirements (tile role)
- Must support **store-and-forward** and **delay-tolerant** modes for AU-scale partitions.
- Must support “dark operation”: if comm is lost, tile enters safe thermal mode, continues local tasks, and queues results.

---

# 7) Manufacturing considerations (critical path alignment with Phase 2)

## 7.1 Manufacturing strategy: stage-gated closure
I recommend a 3-step closure plan that explicitly acknowledges that full semiconductor fabs in space are the hardest part.

### Stage A (early Phase 3): “Package-in-space”
- Import or locally produce *coarse* electronics; import advanced die initially.
- In-space manufacturing focuses on:
  - membranes, TBP structures, radiator surfaces
  - TPV cell production at moderate node requirements
  - optical components and assembly

### Stage B: “Mature packaging + specialty materials”
- In-space grows III-V TPV wafers, deposits metasurfaces, produces high-reliability power electronics.

### Stage C: “Full in-space advanced fab”
- Only when autonomous lithography, contamination control, and metrology are proven.

This aligns with consensus: cost and feasibility hinge on semiconductor closure.

## 7.2 Materials & processes (tile)
- **Structural:** carbon-carbon composites, aluminum-lithium where temperatures allow, ceramic frames for hot
- **Thermal spreaders:** pyrolytic graphite, diamond composites (hot), graphene laminates (if manufacturable)
- **Optical coatings:** photonic crystal / metamaterial emission control (high risk)
- **Radiation mitigation:** shielding is mass-expensive; prefer:
  - rad-hard design
  - ECC + scrubbing
  - annealing cycles (where materials allow)
  - redundancy and rapid replacement

## 7.3 Quality control at trillion-unit scale
You cannot test everything fully. Use:
- wafer-level built-in self test (BIST)
- statistical sampling
- in-field telemetry to drive manufacturing corrections (“fleet learning”)
- robotic visual/IR inspection during deployment

---

# 8) Development roadmap & TRL evolution

## 8.1 Key demonstrations (in order)
1. **Thermal interface contract demo (TRL 4→6):**  
   A tile that maintains outward emission spectrum and heat flux under varying compute loads.
2. **Photon recycling TPV demo at relevant temperatures (TRL 3→6):**  
   Especially for mid-temperature sources (300–600 K equivalent).
3. **Cartridge replacement demo (TRL 5→7):**  
   Robotic swap at scale on an operational membrane.
4. **Radiation + micrometeoroid endurance (TRL 4→7):**  
   Demonstrate puncture tolerance and graceful degradation.
5. **Mass production pilot (TRL 7→8):**  
   10⁶–10⁸ tiles/year equivalent production line (distributed across foundries).

## 8.2 Technology readiness summary (honest)
- Tile structural membranes, HVDC distribution, optical comm modules: **TRL 6–8** (scaling is hard but physics is known)
- TPV at high source temp with photon recycling: **TRL 4–6**
- TPV at low source temp (mid layers): **TRL 2–4** (major risk)
- Metasurface narrowband thermal emitters at gigantic scale: **TRL 2–4**
- Wide-bandgap high-density compute at 800–1200 K: **TRL 2–3**
- Practical reversible/adiabatic computing at scale: **TRL 2–3**

---

# 9) Cost analysis & budget estimates (tile-specific)

Dollar costs are weakly meaningful; I’ll provide both **$** and **manufacturing capacity equivalents**.

## 9.1 Unit cost bands (IOC era)
Assuming large-scale in-space production with high automation:

- **CST-10 structure + radiator + TBP (no advanced die):** $50–$200/kg equivalent  
- **TPV stack:** $1k–$10k per m² equivalent early, falling with scale  
- **Compute cartridges:** dominant uncertainty  
  - if imported die: high $/tile but fast start  
  - if in-space fab: huge capex in foundries, low marginal

Working estimate (IOC):
- **CST-H:** $300–$2,000 per m² → **$3k–$20k per 10 m² tile** (structure+TPV) + compute cartridge cost  
- **CST-M:** similar or lower for structure; compute may be denser  
- **CST-C:** higher due to cryo-compatible materials and insulation interfaces

At **10¹² tiles**, even $1k/tile is $10¹5; hence consensus “$10¹²–$10¹⁴” only makes sense if most value is accounted as internalized manufacturing output rather than currency.

## 9.2 Better metric: Foundry-node-years
Define **1 Foundry-Node-Year (FNY)** as the annual output of a standard self-replicating foundry line producing:
- 10⁶ CST-10 TBPs + structures + coatings (excluding advanced die)

Then:
- IOC (10¹² tiles) requires ~10⁶ FNY of structure output. With 10⁶ foundries at peak, that is ~1 year; with 10⁴ foundries, ~100 years. This ties directly to replication rate assumptions (bom-3-4).

---

# 10) Risk assessment (tile-focused)

## 10.1 Top risks
1. **Mid-temperature TPV efficiency shortfall**  
   If TPV at 300–600 K equivalent cannot reach even ~10–15% system efficiency, outer compute layers become power-starved and the cascade loses value.

2. **Hot-layer electronics materials**  
   “Compute at 800–1200 K” is not solved with silicon. If wide-bandgap logic remains low-density, CST-H may need to become primarily an **energy conversion + routing layer**, pushing most compute to mid layers.

3. **Spectral-selective emitter durability**  
   Metasurfaces can drift under sputtering, dusting, and micrometeoroid damage—ruining photon recycling and TPV matching.

4. **Micrometeoroid puncture and contamination**  
   Trillion tiles means punctures are routine. Must design for puncture *as a normal operating condition*.

5. **Manufacturing yield & metrology**  
   At scale, small yield losses become catastrophic. Tiles must be tolerant of parameter spread (efficiency bins, compute bins).

## 10.2 Mitigations (designed-in)
- **Interface standardization** so failed tech (e.g., reversible compute) can be swapped without redesigning shells.
- **Binning + OS-aware scheduling**: tiles report their actual power/compute/thermal parameters; OS schedules accordingly.
- **Redundant spectral control**: accept broader emission bands initially; tighten with improved coatings later.
- **Aggressive replacement economics**: design tiles to be cheap to replace, not immortal.

---

# 11) Open engineering questions (specific to CSTs)

1. **What is the actual achievable narrowband thermal emission at scale?**  
   Need demonstrated Δλ/λ and stability under space environment for decades.

2. **What is the optimal “tile area” for lifecycle economics?**  
   1 m² tiles are agile but increase part count; 50 m² reduces count but increases handling risk and tear coupling.

3. **Do we truly compute in the hot layer, or only harvest/route there?**  
   If hot compute is too hard, CST-H becomes a power/comm layer with minimal logic, and compute shifts outward.

4. **How much tile-to-tile power sharing is worth it?**  
   Local sharing can smooth transients but adds conductor mass and fault modes.

5. **What is the best persistent memory tech for radiation + longevity + in-space fab?**  
   3D NAND is complex; ReRAM/PCM may be easier but needs maturity.

6. **How do we calibrate and maintain tile emissivity over time?**  
   Need in-situ IR spectroscopy and periodic “recoating” or film refresh strategies.

---

# 12) Concrete “IOC Tile” specification (opinionated baseline)

If I had to freeze an IOC design to start Phase 3:

### CST-10M (Mid-layer baseline tile)
- **Area:** 10 m² hex  
- **Mass:** 35 kg  
- **Power in:** 8 kW/m² incident (from inner radiator)  
- **TPV net:** 18% → **14.4 kWe output**  
- **Compute:** 60 PFLOP/s FP16-eq at 8–12 kW (accelerator-heavy)  
- **Memory:** 8 TB fast + 1 PB NVM  
- **Networking:** 4 optical links × 100 Gb/s (WDM upgradable)  
- **Outward emission:** 300–400 K effective, emissivity ≥0.85 in target band  
- **Service:** compute cartridge replaceable; TPV face replaceable as a panel

This is deliberately “mid-layer first” because it is the most manufacturable regime and provides the bulk of early useful compute without requiring extreme materials.

---

# 13) Interfaces to other Phase 3 BOM items (how CSTs fit)

- **bom-3-2 Inter-layer optical backbone:**  
  CST provides edge transceivers and routing participation; dedicated relays handle long-haul.

- **bom-3-3 Thermal management/radiators:**  
  CST outward face must match radiator spectral/thermal contracts; CST is both heat source and spectral shaper endpoint.

- **bom-3-4 Manufacturing foundries:**  
  Foundries produce TBPs, TPV panels, compute cartridges (eventually), and perform refurb/recycle.

- **bom-3-5 Distributed OS:**  
  OS uses CST telemetry (power, thermal headroom, error rates) to place workloads and manage degradation.

- **bom-3-7 Inter-layer power distribution:**  
  CST-C and some CST-M clusters accept beamed power; CST includes standardized power receiver interface where needed.

- **bom-3-8 Construction/maintenance swarm:**  
  Robots deploy tiles, replace cartridges, patch membranes, and remove failed units for recycling.

---

## Appendix A — ASCII: Tile-to-shell integration concept

```
      inward radiation (from inner shell radiators)
                     ↓↓↓↓↓↓↓↓↓↓↓
   [gap]  ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡  (CST tiles on tensioned membrane)
         / \ / \ / \ / \ 
        ⬡-⬡-⬡-⬡-⬡-⬡-⬡        <-- optical crosslinks (short range)
         \ / \ / \ / \ /
   [gap]  ⬡ ⬡ ⬡ ⬡ ⬡ ⬡ ⬡

  outward emission →→→→→ (narrowband, feeds next layer TPV)
```

---

If you want, I can follow this with a **layer-by-layer CST variant datasheet** (CST-H, CST-M, CST-C) including candidate material stacks (coatings, TPV bandgaps, thermal spreaders), and a **production flow** that maps directly onto Phase 2 infrastructure (mass drivers → foundry feedstock → tile line → robotic deployment).