---
bomId: "bom-3b-2"
itemName: "Thermonuclear Jet Engine"
itemSlug: "thermonuclear-jet-engine"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
generated: "2026-02-07"
phase: "phase-3b"
---

## Thermonuclear Jet Engine (bom-3b-2) — Technical Proposal  
**Project Dyson — Phase 3b (Stellar Engine), parallel with Phase 3a**

### 0) Executive intent
Design and deploy a **thermonuclear jet engine** that converts a controlled stream of **solar-extracted helium-3–rich fuel** (and/or D–He³ blend) into a **highly collimated, relativistic-leaning plasma exhaust** with **effective exhaust velocity ~0.01c**, producing sustained thrust for **~10⁶–10⁷ years** with minimal maintenance, extreme redundancy, and graceful degradation.

This engine is one “cell” in a distributed Caplan-style active thruster array. The thermonuclear jet engine is not a single monolithic rocket; it is a **modular fusion jetline** that can be replicated and phased to manage thrust vectoring, maintenance, and long-duration reliability.

---

## 1) Recommended approach & design philosophy

### 1.1 Design choice: “Magneto-Inertial Fusion Jetline” (MIFJ)
I recommend a **magneto-inertial fusion (MIF)** approach rather than steady-state tokamak-like confinement:

- **Why not tokamak/stellarator?**  
  Continuous steady-state fusion at the scale implied (multi-exawatt jet power) becomes a maintenance and plasma-facing-material nightmare over million-year duty cycles. It also drives huge, delicate superconducting structures close to intense radiation and particle flux.

- **Why MIF?**  
  MIF (pulsed) allows:
  - **Replaceable reaction chambers / liners** (consumable, manufactured in bulk).
  - Higher tolerance to impurities and variable fuel composition.
  - Easier throttling and redundancy (many units, phase-shifted pulses).
  - Natural coupling to a **pulsed magnetic nozzle** for directed exhaust.

### 1.2 Fuel philosophy: D–He³ baseline with He³ ramp-up
Caplan’s concept assumes helium separation and use of helium for thrust. For actual fusion power with manageable neutron load:

- **Primary reaction:** D + He³ → He⁴ (3.6 MeV) + p (14.7 MeV)  
  - Mostly charged products → directable by magnetic nozzle → high jet efficiency.
  - Low neutron fraction compared to D–T.
- **Bootstrap mode:** start with **D–D** (harder ignition, more neutrons) only if He³ supply is initially low; transition to D–He³ as He³ stockpiles grow.
- **Avoid D–T** unless absolutely necessary; neutron damage over 10⁶ years is a system killer.

### 1.3 System philosophy: many small engines, not one giant engine
A single engine sized for ~10¹³–10¹⁴ N thrust is structurally and operationally fragile. Instead:

- Build **N = 10³–10⁵ identical engine modules** arranged in a ring/arc behind the Sun (at safe standoff), each delivering **10⁸–10¹⁰ N** class thrust.
- Benefits:
  - Maintenance by swap-out.
  - Fault isolation.
  - Thrust vectoring by differential throttling.
  - Manufacturing learning curves and replication.

---

## 2) Assumptions and top-level performance targets

### 2.1 Mission-level thrust requirement (order-of-magnitude)
Target acceleration: **a ≈ 10⁻⁹ m/s²** on Solar mass:

- Solar mass: \( M_\odot \approx 2.0 \times 10^{30} \, \text{kg} \)
- Required thrust:  
  \( F = M a \approx 2.0 \times 10^{21} \, \text{N} \)

This is consistent with Caplan-class performance.

### 2.2 Mass flow and exhaust velocity
Assume effective exhaust velocity:
- \( v_e = 0.01c \approx 3.0 \times 10^6 \, \text{m/s} \)

Then required propellant mass flow:
- \( \dot{m} = F / v_e \approx (2.0 \times 10^{21})/(3.0 \times 10^6) \approx 6.7 \times 10^{14} \, \text{kg/s} \)

Caplan’s paper often cites **~10¹² kg/s** extraction; that implies either:
- lower thrust/acceleration, or
- higher effective exhaust velocity, and/or
- using solar radiation pressure synergy, and/or
- only moving a fraction of solar mass effectively (practically, you move the Sun + bound system, so thrust must couple to Sun).

**Proposal stance:** For the thermonuclear jet engine spec, I will design a module architecture that scales. The system should support:
- **Nominal array operating point:** \( \dot{m}_\text{total} \sim 10^{12} \, \text{kg/s} \) to \(10^{15}\, \text{kg/s}\) (scalable),  
- with \( v_e \sim 0.003c \) to \(0.03c\) depending on nozzle temperature and direct energy conversion fraction.

### 2.3 Jet power scale
Jet kinetic power:
\[
P_{jet} \approx \tfrac{1}{2}\dot{m} v_e^2
\]
At \( \dot{m}=10^{12}\,\text{kg/s},\, v_e=3\times10^6 \):
- \(P_{jet} \approx 0.5 \times 10^{12} \times 9\times10^{12} = 4.5\times10^{24}\,\text{W}\)

That is **~1% of solar luminosity** (Sun is \(3.8\times10^{26}\) W).  
This is “astronomically large,” but Phase 2 Dyson infrastructure is presumed.

**Key implication:** the thermonuclear jet engine is less about “creating energy from fusion” and more about **efficiently converting available power + controlled fusion into directed momentum** without melting itself.

---

## 3) Top-level technical specification (single module)

### 3.1 Module designation
**Thermonuclear Jet Engine Module (TJEM)** — a pulsed MIF reactor + magnetic nozzle + propellant conditioning line.

### 3.2 Nominal module performance (one of many)
To reach extreme thrust, we replicate modules. Pick a conservative, manufacturable unit:

- **Thrust (per module):** \(F_m = 1\times10^9 \, \text{N}\) (1 GN)  
- **Exhaust velocity:** \(v_e = 3\times10^6 \, \text{m/s}\) (0.01c)  
- **Mass flow:** \(\dot{m}_m = F_m/v_e \approx 333 \, \text{kg/s}\)  
- **Jet power:** \(P_{jet,m} \approx 0.5 \dot{m} v_e^2 \approx 1.5\times10^{15}\,\text{W}\) (1.5 PW)

Number of modules for \(2\times10^{21}\) N total thrust:
- \(N \approx 2\times10^{12}\) modules at 1 GN each — clearly too many.

So the module must be much bigger, or we accept lower acceleration, or we use fewer but far larger engines.

**Revised pragmatic scaling:** define **three module classes**:

| Class | Thrust | Mass flow @0.01c | Jet Power | Purpose |
|---|---:|---:|---:|---|
| TJEM-S | 10¹⁰ N | 3.3×10³ kg/s | 1.5×10¹⁶ W | early prototypes, scalable factory learning |
| TJEM-M | 10¹² N | 3.3×10⁵ kg/s | 1.5×10¹⁸ W | mainline building block |
| TJEM-L | 10¹³–10¹⁴ N | 3.3×10⁶–3.3×10⁷ kg/s | 1.5×10¹⁹–10²⁰ W | fewer units, final array |

**This proposal specifies TJEM-M** as the baseline.

### 3.3 TJEM-M baseline specs (per engine)
- **Thrust:** \(1\times10^{12}\,\text{N}\)  
- **Exhaust velocity:** \(3\times10^6\,\text{m/s}\)  
- **Mass flow:** \(3.3\times10^5\,\text{kg/s}\)  
- **Jet kinetic power:** \(1.5\times10^{18}\,\text{W}\)  
- **Fusion gain target (Q):** 5–20 (pulsed), depending on fuel purity  
- **External power input:** 0.1–0.5× jet power during startup; <0.05× steady-state (for compression, magnets, control, pumping)

### 3.4 Physical size / mass (per TJEM-M)
Because this is unprecedented, I’ll be explicit about assumptions:

- Reaction chamber is pulsed; nozzle is the dominant structure.
- Radiators are enormous unless we keep waste heat fraction very low.

**Dimensions (order-of-magnitude):**
- **Magnetic nozzle throat radius:** 50–200 m  
- **Nozzle length:** 50–300 km (long magnetic plume shaping; structure is field-dominated, not solid)
- **Reaction chamber “can” diameter:** 200–1000 m (pulsed liner region)
- **Standoff from Sun:** 3–10 solar radii (≈2–7 million km), to reduce thermal load and allow stable formation flying.

**Dry mass per TJEM-M:**  
- **Core + magnets + structure:** 10¹¹–10¹² kg  
- **Consumables (liners, pellet casings) inventory:** 10¹⁰–10¹¹ kg on-site  
- **Total installed mass:** ~10¹² kg (asteroid-scale), but Phase 2 implies that is feasible.

---

## 4) System architecture

### 4.1 Functional block diagram (one TJEM-M)

```
   Solar-extracted feedstock (H/He/trace ions)
                |
                v
   +---------------------------+
   | Propellant Conditioning   |
   | - ionization              |
   | - impurity removal        |
   | - isotopic blending       |
   +-------------+-------------+
                 |
                 +----------------------+
                 |                      |
                 v                      v
        +----------------+     +----------------------+
        | Fusion Fuel    |     | Working Mass Stream  |
        | (D + He3)      |     | (H/He as needed)     |
        +-------+--------+     +----------+-----------+
                |                          |
                v                          v
      +-------------------+       +--------------------+
      | Pulsed MIF Driver |       | Pre-Accel / Pump   |
      | - liner injection |       | - EM acceleration  |
      | - compression     |       | - flow shaping     |
      +---------+---------+       +---------+----------+
                |                           |
                v                           |
       +------------------+                 |
       | Fusion Chamber   |<----------------+
       | (pulsed)         |
       +--------+---------+
                |
                v
       +------------------+
       | Magnetic Nozzle  |
       | + MHD shaping    |
       +--------+---------+
                |
                v
          Collimated Jet
```

### 4.2 Array-level architecture (many engines)
Engines are arranged so net thrust vector passes through the Sun’s center of mass, with active trim for torque cancellation.

```
          [Shkadov Mirror Array]  (Phase 3b passive)
                    \
                     \
   Sun --------------->  Net thrust direction
                     /
        (arc/ring of TJEM modules)
     [TJEM][TJEM][TJEM][TJEM]...
```

---

## 5) Subsystems breakdown & interfaces

### 5.1 Propellant Conditioning & Feed System (PCFS)
**Purpose:** Turn raw lifted solar plasma into controlled streams:
- (a) fusion fuel (D + He³, with optional He³ enrichment)
- (b) working mass (H/He) for nozzle loading, plume stability, and thrust tuning

**Functions**
- Ion separation (mass/charge): electromagnetic and cryogenic where feasible
- Dust/metal impurity filtering (critical to avoid radiative collapse of plasma)
- Fuel metering at **10⁵–10⁷ kg/s** per TJEM-M
- Buffer tanks: magnetic bottles / electrostatic traps (no “tanks” in classical sense)

**Interfaces**
- Input: solar mass-lifter trunkline (multi-terawatt pumping)
- Output A: pellet/liner manufacturing feedstock (He³, D)
- Output B: continuous propellant stream into nozzle throat

### 5.2 Pulsed Fusion Driver (PFD)
**Approach:** Magnetized target fusion with replaceable liners
- Inject magnetized plasma target into chamber
- Implode conductive liner (electromagnetic) to compress to fusion conditions
- Pulse frequency: **0.1–10 Hz** (tunable); many chambers can be interleaved for quasi-continuous thrust

**Key components**
- Capacitor/inductor banks (but at astronomical scale: superconducting SMES rings)
- Liner injector (mass-manufactured conductive shells)
- Pre-magnetization coils
- Fast valves (plasma shutters) and magnetic “plugs” instead of mechanical valves

**Interfaces**
- Power: Dyson Integration Layer (DIL) provides multi-PW burst capability
- Consumables: liner feedstock and fuel pellets

### 5.3 Fusion Chamber (FC)
**Design:** Sacrificial inner liner + magnetic insulation
- Inner surfaces are not expected to survive indefinitely
- Chamber is a “serviceable cartridge” replaced by robotic systems
- Neutron shielding: minimized via D–He³; still include shadow shields for coils

**Thermal management**
- Waste heat fraction target: **<1–5% of jet power** routed to radiators
- Use direct conversion where possible (charged particle energy extraction)

### 5.4 Magnetic Nozzle & MHD Exhaust Shaping (MNES)
**Purpose:** Convert fusion product energy + heated working mass into directed momentum with high collimation.

**Design features**
- Multi-coil magnetic nozzle (nested solenoids) creating expanding field lines
- MHD electrodes (virtual electrodes via plasma waves) to manage plume rotation and instabilities
- Variable geometry via coil current profiles (no moving parts)

**Performance targets**
- Nozzle efficiency: **η_noz = 0.7–0.9**
- Beam divergence half-angle: **<1–5 mrad** (critical to avoid wasting momentum and heating local environment)

### 5.5 Power Conditioning & Energy Storage (PCES)
Because fusion is pulsed, the power system must buffer:
- SMES rings (superconducting magnetic energy storage)
- High-voltage DC buses
- Fast solid-state switching (wide-bandgap semiconductors or plasma switches)

**Interface**
- Dyson Integration Layer: provides steady power; PCES delivers pulse power.

### 5.6 Structure, Shielding, and Thermal Control (SSTC)
- Primary loads are electromagnetic forces and plume reaction loads
- Shadow shields protect coils and electronics from direct line-of-sight radiation
- Radiators: thin-film droplet radiators or rotating liquid sheet radiators (more robust than solid panels at these scales)

### 5.7 Metrology, Guidance, Navigation, Control (GNC)
- Maintain engine position relative to Sun and to other TJEMs
- Thrust vector alignment to avoid imparting torque to Sun (or to control it intentionally)
- Use interferometric ranging across the array (laser links) + solar limb trackers

---

## 6) Autonomy, control, and communications

### 6.1 Autonomy requirement
Human-in-the-loop is impossible at million-year scale. Each TJEM must be:
- **Fully autonomous** with local fault management
- Capable of safe shutdown and restart
- Able to operate in degraded mode (reduced thrust, higher divergence) rather than fail hard

### 6.2 Control loops
- **Inner loop (microseconds–milliseconds):** pulse timing, liner implosion symmetry, plasma stability  
- **Mid loop (seconds–hours):** thrust level, nozzle field shaping, thermal balance  
- **Outer loop (days–years):** station keeping, array phasing, torque balancing, trajectory optimization

### 6.3 Communication
- Optical comms between modules: redundant laser mesh network
- Latency is minutes across solar-scale distances; control must be distributed
- Data products:
  - health telemetry (low rate)
  - event logs (burst)
  - physics diagnostics (selective, compressed)

---

## 7) Manufacturing considerations

### 7.1 Manufacturing paradigm
- **In-situ industrialization** using Mercury/asteroid belt materials
- Replicate “engine foundries” as part of Phase 2 swarm expansion
- Consumables (liners, pellets, coil segments) are produced continuously

### 7.2 Materials
- Superconductors: high-temperature superconductors (HTS) preferred; operate at 20–80 K with large radiators and sunshields
- Structural: carbon composites, refractory ceramics, tungsten where needed (but avoid large tungsten masses near neutron flux)
- Plasma-facing: sacrificial liners + magnetic insulation to avoid long-life plasma-facing materials

### 7.3 Assembly and maintenance
- Modular replacement:
  - reaction chamber cartridges
  - coil modules
  - power switch modules
- Robotic servicing swarms; no single-point maintenance craft

---

## 8) Development roadmap & TRL progression

### 8.1 Stage A — Physics & simulation (TRL 2→3)
- High-fidelity MIF implosion + nozzle coupling simulations
- Plume divergence and stability modeling at 0.01c effective exhaust
- Materials and radiation transport models for long-life coils

### 8.2 Stage B — Subscale demonstrators (TRL 3→5)
- 1–10 MW pulsed MIF in deep space (far from Earth)
- Demonstrate:
  - repeatable liner injection
  - stable magnetized target formation
  - magnetic nozzle collimation of charged products

### 8.3 Stage C — Pilot jetline (TRL 5→6)
- 1–10 GW class “TJEM-S” near Mercury orbit
- End-to-end: feedstock conditioning → fusion pulses → nozzle → thrust measurement

### 8.4 Stage D — First operational array segment (TRL 6→8)
- Deploy 10–100 TJEM-M units
- Validate:
  - long-duration autonomy
  - array thrust vector control
  - maintenance cadence and consumables logistics

### 8.5 Stage E — Full Caplan array (TRL 8→9)
- Scale to required thrust by replication + incremental upgrades
- Integrate with Shkadov mirror for hybrid control authority

---

## 9) Cost analysis / budget estimates (very rough, Phase-3b scale)

At this scale, “cost” is better expressed in **mass-energy-industrial capacity** than currency. Still, for a non-profit planning framework, we can define “equivalent 2026 USD” based on mass-to-orbit and manufacturing energy. These numbers are necessarily speculative.

### 9.1 Cost drivers
- Superconducting coil mass and fabrication
- Power electronics and SMES
- Radiator area and deployment
- Autonomous robotics and spares
- Consumables production (liners/pellets)

### 9.2 Order-of-magnitude budget
Assume per TJEM-M installed mass ~10¹² kg. If mature space industry cost is effectively dominated by energy and feedstock, you might target:
- **Energy to refine/manufacture:** ~10–100 MJ/kg (optimistic advanced automation)  
  → 10¹³–10¹⁴ MJ per engine = 10¹⁹–10²⁰ J  
  Equivalent to days to weeks of a small fraction of solar output captured by the swarm.

If forced into USD-equivalent using a far-future $/kg in-space manufacturing:
- At **$1/kg** (extremely optimistic): $10¹² per engine
- At **$0.01/kg**: $10¹⁰ per engine

**Program-level:** for 10³–10⁴ TJEM-M units, $10¹³–10¹⁶ equivalent.  
This is not a “fundraising budget”; it’s a civilization-scale industrial allocation. For Project Dyson planning, I recommend budgeting in:
- **kg of refined mass/year**
- **W of manufacturing power**
- **number of autonomous fab-lines**

---

## 10) Risk assessment

### 10.1 Major technical risks
1. **Fusion feasibility at required duty cycle**  
   - MIF is promising but not yet demonstrated at high gain and high repetition reliably.
2. **Nozzle collimation and plume stability**  
   - Beam divergence kills effective exhaust velocity and can deposit destructive energy into nearby structures.
3. **Waste heat management**  
   - Even 1% of 10¹⁸–10²⁰ W is enormous; radiator systems must be ultra-robust.
4. **Neutron damage (if fuel mix not ideal)**  
   - Any fallback to D–D or D–T increases neutron flux dramatically.
5. **Control of Sun-coupled thrust vector**  
   - Misalignment can induce torque, excite solar oscillation modes, or cause long-term trajectory errors.

### 10.2 Programmatic risks
- Supply chain for He³ separation and storage at scale
- Manufacturing yield and quality control for trillion-component systems
- Governance: million-year continuity, safety constraints, and ethical oversight

### 10.3 Mitigations
- Start with small arrays, validate plume and control before scaling
- Overbuild redundancy: N+2 modularity everywhere
- Design for graceful degradation: thrust reduction rather than catastrophic failure
- Keep passive Shkadov mirror online for baseline thrust and stabilization authority

---

## 11) Open engineering questions (must be closed before final design freeze)

1. **What is the true achievable effective exhaust velocity?**  
   0.01c is a target; actual depends on nozzle physics, working mass fraction, and how much fusion product energy can be directed.

2. **What fraction of thrust comes from fusion products vs heated working mass?**  
   This drives fuel requirements and engine architecture.

3. **Can we maintain milliradian-class collimation over million-km plume lengths?**  
   Needs detailed plasma stability and interaction with solar wind / magnetic fields.

4. **What is the optimal standoff distance from the Sun?**  
   Trade between feedstock transport losses, thermal load, and formation flying stability.

5. **He³ availability and separation energy cost**  
   Quantify realistic He³ fraction in extracted solar material and separation throughput.

6. **Long-life superconducting coil survivability**  
   Radiation, micrometeoroids, and thermal cycling over 10⁶ years.

7. **Array-level torque management**  
   How many independent thrust vectors are needed to null torque and control solar spin/orbit coupling?

---

## 12) Opinionated recommendation summary
- Build the thermonuclear jet engine as a **replicable, pulsed MIF jetline** with **magnetic nozzle** and **serviceable reaction cartridges**.  
- Optimize for **collimation, autonomy, and maintainability**, not peak fusion elegance.  
- Treat fusion as a **momentum-amplifying energy source** integrated with Dyson power, not the sole energy provider.  
- Scale via **industrial replication**: thousands of TJEM-L or tens of thousands of TJEM-M, rather than millions of tiny units.

---

If you want, I can deliver a **companion “Interface Control Document (ICD)”** for bom-3b-2 that pins down: mass-lifter trunkline pressure/ionization state, DIL electrical bus standards (voltage/current), timing synchronization across the array, and the thrust-vector authority allocation between TJEM and Shkadov mirror.