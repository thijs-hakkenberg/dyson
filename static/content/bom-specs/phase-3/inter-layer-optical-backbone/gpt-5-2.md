---
bomId: "bom-3-2"
itemName: "Inter-Layer Optical Communication Backbone"
itemSlug: "inter-layer-optical-backbone"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-07"
phase: "phase-3"
---

## Inter-Layer Optical Communication Backbone (bom-3-2) — Detailed Technical Proposal  
**Project Dyson — Phase 3 (Matroska Brain)**  
**Category:** Communications  
**Scope:** End-to-end data transport + time/frequency distribution between Matroska layers and within each layer, enabling the distributed OS (bom-3-5) and compute substrate tiles (bom-3-1) to function as a coherent (but not globally synchronous) computational entity.

---

# 1) Recommended Approach & Design Philosophy

### 1.1 Philosophy: “Hierarchical optical fabric with ruthless locality”
At Matroska scales, the only workable networking principle is:

- **>99.99% of traffic must remain local** (within a layer sector or neighboring sectors).
- Inter-layer transport is **a spine**, not a flat mesh.
- The backbone is designed for **graceful degradation** and **statistical reliability**, not perfect links.

We therefore implement a **3-tier architecture**:

1. **Tile edge links (Tier-0):** short-range optical links embedded in every computational tile for intra-sector traffic (meters to tens of km depending on tile density).  
2. **Sector routers (Tier-1):** dedicated relay nodes that aggregate tile traffic, provide buffering, routing, and time services.  
3. **Inter-layer trunk relays (Tier-2):** high-aperture, high-stability optical terminals that connect adjacent shells (and optionally “skip links” for resilience).

### 1.2 Philosophy: “Adjacent-layer first, skip links second”
Beam divergence and pointing complexity explode with distance. The backbone is optimized for:
- **Adjacent-layer links** (Layer n ↔ Layer n+1) as the primary transport.
- **Sparse skip links** (n ↔ n+2) for fault isolation, congestion relief, and recovery after large-scale partition events.

### 1.3 Wavelength strategy: 1550 nm baseline + 2 µm option
- **Baseline:** **1550 nm** (mature lasers, coherent receivers, WDM ecosystem, radiation-tolerant photonics pathways).
- **Option:** **~2000 nm** for dust/scatter tradeoffs and eye-safety is irrelevant, but component maturity is lower.
- **Not recommended as primary:** visible (harder pointing, higher scatter), mid-IR (component immaturity, larger diffraction for same aperture).

### 1.4 Multiplexing: WDM first, OAM only where it wins
- **WDM (dense coherent):** primary scaling method; simplest to manufacture, test, and route.
- **OAM:** allowed as a *link-level enhancement* on a subset of trunk links, not a universal dependency. OAM is sensitive to pointing jitter, optics aberrations, and contamination. Treat it as a “performance mode,” not a baseline requirement.

---

# 2) Top-Level Requirements (Phase 3 IOC → Full Build)

## 2.1 Performance targets (assumptions and rationale)
Because the BOM consensus cites **~10²⁴ bps aggregate** as an aspirational inter-layer throughput, we split targets:

- **IOC (Initial Operational Capability):**
  - Aggregate adjacent-layer throughput: **10²⁰–10²¹ bps**
  - Backbone availability: **≥ 0.999** (per-sector), **≥ 0.99** end-to-end across multiple sectors
  - Time distribution: **≤ 10 ns** relative time error *within a sector*, **≤ 1 µs** across a layer, with explicit uncertainty metadata

- **Full build-out:**
  - Aggregate adjacent-layer throughput: **10²³–10²⁴ bps**
  - Support **10⁸–10⁹ relay nodes** + embedded transceivers in **10¹²–10¹³ tiles**
  - Multi-hour light-time tolerance (no global lockstep)

## 2.2 Latency model (physical reality)
- Inter-layer propagation is bounded by **c** and geometry; the OS must assume **minutes to hours** between far shells.
- Backbone provides:
  - **Deterministic local latency** inside sectors (microseconds to milliseconds)
  - **Predictable trunk latency** with timestamping and delay estimation
  - **Delay-tolerant networking (DTN)** primitives for long-haul consistency

---

# 3) System Architecture

## 3.1 Logical architecture (routing domains)
We partition each shell into **sectors** (think: “autonomous systems”):

- Sector size chosen to keep:
  - local optical ranges manageable
  - orbital shear manageable
  - routing tables bounded

A workable starting point is **10⁵–10⁶ sectors per layer** at scale, each with **10⁶–10⁸ tiles**, depending on tile area and shell radius.

### ASCII: hierarchy overview
```
                 (Layer n+1 shell)
      [Tier-2 Trunk Relay Ring / Spine Nodes]
          ||      ||      ||      ||
          ||      ||      ||      ||
     +----++------+|------+|------+|----+
     |  Sector Router Cluster (Tier-1)   |
     |   /   /   /   /   /   /   /      |
     | Tile Edge Links (Tier-0)          |
     +-----------------------------------+

                 (Layer n shell)
     +-----------------------------------+
     | Tile Edge Links (Tier-0)          |
     |   \   \   \   \   \   \   \      |
     |  Sector Router Cluster (Tier-1)   |
     +----++------+|------+|------+|----+
          ||      ||      ||      ||
      [Tier-2 Trunk Relay Ring / Spine Nodes]
```

## 3.2 Physical topology
**Within a layer (intra-layer):**
- Tiles form a dense local mesh (Tier-0), but most tiles only need **2–6 neighbor links**.
- Sector routers (Tier-1) are placed to minimize average tile-to-router distance and to provide redundancy (N+2).

**Between layers (inter-layer):**
- Tier-2 trunk relays arranged as:
  - **rings** (following shell geometry) plus
  - **radial chains** (linking adjacent layers at matched longitudes)
- Trunk relays actively compensate for relative motion (different orbital angular velocities).

---

# 4) Node Types and Technical Specifications

## 4.1 Tier-0: Tile Embedded Optical Transceiver (TEOT)
**Installed in every computational tile (bom-3-1).**  
Purpose: local data exchange + uplink/downlink to sector router.

**Baseline TEOT spec (mid-temperature layers; variants for hot/cold):**
- **Mass:** 50–250 g (packaged photonics + micro-gimbal or beam-steering)
- **Electrical power:** 0.5–5 W typical, 20 W peak (burst)
- **Optical output power:** 10–200 mW per channel (coherent)
- **Aperture:** 5–30 mm micro-telescope or metasurface collimator
- **Range:** 10 m to 10 km (tile density dependent)
- **Data rate:** 10–200 Gbps per link (IOC), 1–5 Tbps per link (full build; requires advanced photonics)
- **Channels:** 4–32 WDM channels at 25–100 GHz spacing (sector-dependent)
- **Pointing:** coarse via tile attitude, fine via MEMS beam steering
- **Radiation tolerance:** designed for long life; photonic components with redundancy and annealing strategies where possible

**Interface to tile:**
- **Data:** chiplet-scale SerDes or optical-on-interposer
- **Time:** disciplined clock input + timestamping
- **Power:** regulated DC bus from tile power system

## 4.2 Tier-1: Sector Router Cluster Node (SRCN)
Dedicated relay nodes: aggregate tile traffic, perform routing, buffering, congestion control, and time distribution.

**SRCN baseline (IOC):**
- **Mass:** 20–200 kg (depends on aperture count and storage)
- **Power:** 200 W–5 kW (mostly comm + compute + pointing)
- **Optical terminals:** 16–256 tile-facing terminals + 4–32 trunk-facing terminals
- **Apertures:**
  - tile-facing: 2–10 cm
  - trunk-facing: 10–30 cm (IOC), 30–100 cm (full build for high-capacity trunks)
- **Switching fabric:** optical-electrical-optical (OEO) packet/circuit hybrid
- **Throughput:** 10–200 Tbps aggregate (IOC), 1–50 Pbps aggregate (full build per SRCN cluster)
- **Storage:** 1–100 TB solid-state for buffering + DTN bundles
- **Time service:** acts as sector grandmaster (disciplined by Tier-2 time authority beacons)

**Routing model:**
- **Intra-sector:** fast local routing (link-state or segment routing)
- **Inter-sector:** hierarchical addressing, aggregated routes, DTN for long-haul

## 4.3 Tier-2: Inter-Layer Trunk Relay Node (ILTRN)
These are the “backbone routers” with the most stringent pointing and stability requirements.

**ILTRN baseline (full build target aligned with consensus “~500 kg relay satellites with ~1 m apertures”):**
- **Mass:** 300–800 kg (target ~500 kg)
- **Power:** 2–20 kW (depends on number of simultaneous trunks)
- **Primary aperture:** 0.5–1.5 m telescope (diffraction-limited goal)
- **Optical transmit power:** 10–200 W per trunk terminal (coherent), scalable via parallel terminals
- **Multiplexing:** 256–2048 WDM channels @ 10–100 Gbps/channel (IOC→full build), coherent DP-QPSK/16QAM as SNR allows
- **Aggregate per-node trunk capacity:** 10–200 Tbps (IOC), 1–10 Pbps (full build; achieved via many parallel terminals and channels)
- **Pointing:** <0.1 µrad RMS jitter (goal), with micro-radian acquisition
- **Attitude control:** reaction wheels + microthrusters; vibration isolation platform for telescope
- **Autonomy:** fully autonomous acquisition/tracking/handovers

**Key note on physics:**  
At λ=1550 nm and D=1 m, diffraction half-angle ~1.22λ/D ≈ 1.9 µrad. Over 1 AU this is ~300 km spot. That is manageable *only if* receivers have sufficient aperture and we avoid multi-AU single hops for “core” trunks. Hence the adjacent-layer approach and relay density.

---

# 5) Time/Frequency Synchronization (“Time Authority Constellation” integrated into backbone)

## 5.1 Why it must exist
Even with causal/eventual consistency, we still need:
- bounded local clock error for scheduling, packet timestamping, and coherent comm DSP
- a common timescale for scientific workloads and auditability
- stable frequency references for coherent receivers

## 5.2 Architecture
- Each layer has **Time Authority Nodes (TANs)**: a subset of ILTRNs with enhanced clocks.
- TANs cross-discipline each other via two-way optical time transfer (TWOTT).
- Sector routers discipline to TANs; tiles discipline to sector routers.

**Clock tech options:**
- **IOC:** space-qualified optical atomic clocks at TANs; chip-scale atomic clocks at SRCNs
- **Full build:** optical lattice clocks at TANs, with redundant ensembles

**Performance targets:**
- **Within sector:** 1–10 ns (practical)
- **Across a layer:** 0.1–1 µs (practical with TWOTT and good geometry)
- **Across multiple AU:** maintain a timescale with explicit uncertainty; do not promise “simultaneity,” promise “traceable time with error bars.”

---

# 6) Link Engineering (Representative Numbers)

## 6.1 Trunk link budget example (adjacent-layer, ~0.5 AU hop)
Assumptions (illustrative, not worst-case):
- λ=1550 nm
- Tx aperture Dtx=1.0 m, Rx aperture Drx=1.0 m
- Range R=0.5 AU ≈ 7.5e10 m
- Diffraction divergence θ ≈ 1.22λ/D ≈ 1.9e-6 rad
- Spot radius ≈ θR ≈ 1.4e5 m (140 km)
- Receiver collects fraction ≈ (Arx / Aspot) ≈ (0.785 m²) / (π(1.4e5)²) ≈ 1.3e-11  
This seems brutal, but coherent comm can run at extremely low received power if bandwidth is managed, and we can:
- increase effective collection with **multiple receivers**
- use **shorter hops** where geometry allows
- use **terminal arrays** (many parallel apertures)
- push Tx power up (tens to hundreds of watts optical) where power is abundant

**Design implication:** trunk capacity scales primarily with **number of parallel terminals** and **relay density**, not single-link heroics.

## 6.2 Dust/contamination margin
Zodiacal dust and micrometeoroid pitting drive:
- gradual throughput loss
- increased pointing error (scattering)
- higher background noise

We design for:
- **3–10 dB link margin** on critical trunks
- periodic **optics “sacrificial window” replacement**
- contamination control via maintenance swarm (bom-3-8)

---

# 7) Subsystems Breakdown & Interfaces

## 7.1 ILTRN subsystem list
1. **Optical terminal assembly**
   - telescope, fast steering mirror, beacon detector, coarse gimbal
2. **Laser/photonic payload**
   - narrow-linewidth lasers, modulators, coherent receivers, WDM mux/demux
3. **Pointing/acquisition/tracking (PAT)**
   - beaconing, spiral search, Kalman tracking, handover logic
4. **Switching/routing compute**
   - packet/circuit hybrid, DTN bundle agent, QoS enforcement
5. **Time authority package (for TAN variants)**
   - optical clock, TWOTT transceiver, holdover algorithms
6. **Power + thermal**
   - DC bus interface, radiators, heat straps
7. **Propulsion/attitude**
   - microthrusters, reaction wheels, star trackers, inertial sensors
8. **Fault management**
   - self-test, graceful degradation, key management, secure boot

## 7.2 Interfaces to other Phase 3 BOM items
- **To computational tiles (bom-3-1):** TEOT link standards, addressing, time discipline, congestion signals.
- **To distributed OS (bom-3-5):** routing policy hooks, telemetry, time uncertainty metadata, partition detection.
- **To thermal/radiator systems (bom-3-3):** thermal mounting standards, keep-out zones for radiative glare into optics.
- **To manufacturing foundries (bom-3-4):** optical component production specs, calibration tooling, acceptance tests.
- **To construction/maintenance swarm (bom-3-8):** ORU replacement procedures, optics cleaning/window swap, alignment aids.

---

# 8) Autonomy, Control, and Network Operations

## 8.1 Autonomy requirements (non-negotiable at 10⁸–10⁹ nodes)
- **Zero human-in-the-loop** for link acquisition, routing convergence, and failure recovery.
- Local policies only; global policies distributed via signed updates.

Key autonomous behaviors:
- self-organized neighbor discovery
- continuous link quality estimation
- predictive handover (relative motion)
- congestion control with explicit backpressure
- partition detection and DTN store-and-forward activation
- “safe mode” that preserves timekeeping and minimal comm even during partial failures

## 8.2 Control plane vs data plane
- **Data plane:** optical links, packet/circuit switching.
- **Control plane:** low-rate but ultra-robust channels (separate wavelengths and/or modulation) for:
  - key distribution updates
  - routing summaries
  - time authority beacons
  - emergency beam-abort coordination (important given coexistence with inter-layer power beaming, bom-3-7)

## 8.3 Security model (overview)
- Hardware root of trust in SRCN/ILTRN.
- Post-quantum cryptography is recommended early (longevity).
- Signed routing updates; anomaly detection for spoofed beacons.
- “Optical beam authentication”: beacon challenge-response to prevent hijacking or misrouting.

---

# 9) Manufacturing & Deployment Considerations

## 9.1 Optical components at extreme scale
The backbone is “mature tech” only until you multiply by 10⁹. The manufacturing plan must prioritize:

- **photonic integrated circuits (PICs)** for transceivers (TEOT and parts of SRCN)
- standardized **telescope modules** (ILTRN)
- automated optical alignment and metrology
- radiation-hard coatings and sacrificial windows

**Opinionated recommendation:**  
Do not attempt to custom-build precision 1 m telescopes like traditional spacecraft optics at scale. Instead:
- use **segmented, replicated mirrors** with relaxed figure requirements compensated by coherent DSP and adaptive optics
- accept that some fraction are “below spec” and route around them

## 9.2 ORU strategy (line-replaceable units)
Every relay node is built from ORUs:
- laser module ORU
- photonics receiver ORU
- mirror/window ORU
- attitude sensor ORU
- compute/switch ORU

Maintenance swarm performs replacements; foundries recycle precious materials (InP, GaAs, rare dopants).

## 9.3 Use of Phase 0–2 infrastructure
- Phase-2 **maintenance-drones** evolve into optics cleaning/window swap units.
- Phase-1/2 **swarm-control-system** provides the initial control plane and later becomes a supervisory layer under the distributed OS.
- Phase-1 **assembly-robots** and **assembly-node hubs** bootstrap the first sector routers and trunk relays near early shells.

---

# 10) Development Roadmap & TRL

## 10.1 Roadmap (practical sequencing)
**Step A — Standards first (Year 0–2 of Phase 3 program):**
- Define optical link PHY/MAC, timing metadata, addressing, routing hierarchy.
- Define ORU mechanical/electrical/thermal interfaces.

**Step B — Demonstrate sector networking (Year 2–5):**
- 10⁴–10⁶ tiles + 10²–10³ SRCNs in a single layer region.
- Validate autonomous routing, congestion control, time distribution.

**Step C — Demonstrate adjacent-layer trunk (Year 4–7):**
- Deploy 10–100 ILTRNs linking two shells.
- Validate PAT, handovers, and DTN behavior under induced partitions.

**Step D — Scale manufacturing (Year 6–15):**
- Shift to mass production of TEOT PICs and standardized telescope modules.
- Begin exponential replication via foundries (bom-3-4).

**Step E — Full fabric build-out (Year 15+ depending on industrial scaling):**
- Expand to 10⁸–10⁹ relay nodes.
- Introduce skip links and enhanced TANs.

## 10.2 TRL assessment (today → required)
- Coherent WDM lasercom: TRL 6–8 in limited forms; must be ruggedized and mass-produced.
- Autonomous PAT at massive node counts: TRL 3–5 (needs major work).
- Optical time transfer at scale: TRL 4–6.
- PIC-based transceivers: TRL 7–9 (terrestrial), but space rad-hard + self-manufacture: TRL 3–6.

---

# 11) Cost / Budget Estimate (aligned to consensus)

Consensus range: **$10¹¹–$10¹³ total** (medium confidence).  
I would refine it as manufacturing-capacity-driven:

### 11.1 Cost drivers
1. **Precision optics + coatings** (ILTRN telescopes, windows)
2. **PIC fabrication yield** at astronomical volumes
3. **Metrology and calibration automation**
4. **Maintenance operations** (ORUs, drone time)

### 11.2 Rough order-of-magnitude breakdown (full build)
- TEOT embedded transceivers (10¹²–10¹³ units): effectively “free” only if PICs are produced as part of tile manufacturing; otherwise dominant.
- SRCNs (10⁶–10⁸): moderate.
- ILTRNs (10⁸–10⁹): dominant mass and precision cost.

A plausible internal accounting (not “Earth dollars,” but industrial effort equivalent):
- **IOC network:** ~$10¹¹–10¹² equivalent
- **Full network:** ~$10¹²–10¹³ equivalent

---

# 12) Risk Assessment

## 12.1 Top risks (and mitigations)

### R1 — Pointing/acquisition/tracking failure at scale
- **Risk:** sub-µrad pointing across billions of links is brittle.
- **Mitigation:** hierarchical short hops; multi-terminal diversity; beacon-assisted acquisition; accept partial link failure and route around.

### R2 — Optics degradation (dust, pitting, darkening)
- **Risk:** throughput decays faster than maintenance can restore.
- **Mitigation:** sacrificial windows; coating choices; keep-out zones; continuous cleaning; design with link margin and redundancy.

### R3 — Routing instability / congestion collapse
- **Risk:** yottabit-scale routing can thrash.
- **Mitigation:** strict hierarchy; aggregated routes; admission control; circuit-like scheduling for trunk links; DTN fallback.

### R4 — Time authority compromise or drift
- **Risk:** loss of coherent comm performance and scheduling.
- **Mitigation:** redundant TAN ensembles; cross-check; local holdover; “time uncertainty” propagated as metadata.

### R5 — Manufacturing yield / calibration bottleneck
- **Risk:** optics alignment becomes the pacing item.
- **Mitigation:** standardized modules; self-calibrating terminals; robotic metrology; accept lower optical quality compensated by DSP.

---

# 13) Open Engineering Questions (specific to the backbone)

1. **Optimal sector size vs orbital shear:** what sector geometry minimizes handovers given differential angular velocities between shells?  
2. **Best trunk strategy:** fewer high-power 1–2 m terminals vs many 30–50 cm terminals in parallel? (Manufacturing and maintenance may favor smaller apertures.)  
3. **WDM channel plan:** 25 GHz vs 50/100 GHz spacing; coherent modulation order vs required SNR under dust background.  
4. **Control-plane hardening:** what minimum “always-works” modulation and coding scheme survives worst-case contamination and mispointing?  
5. **OAM practicality:** does OAM provide net capacity gains once pointing jitter, contamination, and manufacturing tolerances are included?  
6. **Interference with power beaming (bom-3-7):** how do we enforce spectral/pointing deconfliction and emergency abort across both networks?  
7. **Lifecycle maintenance rate:** what is the realistic replacement cadence for windows/lasers, and does the maintenance swarm capacity scale accordingly?  
8. **Radiation effects on PICs and coatings:** what annealing or redundancy strategy is optimal across centuries?

---

# 14) Opinionated Baseline Design (what I would build)

If forced to choose a concrete baseline today:

- **Wavelength:** 1550 nm coherent WDM everywhere.
- **No OAM dependency** (optional only).
- **Adjacent-layer trunks only** for baseline capacity; skip links at ≤1% of trunk count.
- **Many medium apertures** (30–50 cm) rather than fewer 1–2 m apertures *until* manufacturing proves it can mass-produce and maintain meter-class optics cheaply.
- **DTN as a first-class feature** from day one (not an afterthought).
- **Time uncertainty metadata** mandated in every timing and scheduling interface; ban assumptions of global simultaneity.

This produces a backbone that is scalable, manufacturable, and robust under partial failure—aligned with the consensus architecture and the physical constraints of AU-scale distributed computation.

---

If you want, I can add a **quantitative sizing model** (relay counts per layer as a function of shell radius, sector angular width, and desired bps/m² of compute) and a **detailed PHY/MAC proposal** (coding, modulation, beaconing, acquisition sequences, and routing protocol stack).