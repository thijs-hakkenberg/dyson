---
bomId: "bom-3-1"
itemName: "Computational Substrate Tiles"
itemSlug: "computational-substrate-tiles"
modelId: "gemini-3-pro"
modelName: "Gemini 3 Pro"
generated: "2026-02-07"
phase: "phase-3"
---

This is a detailed technical proposal for **Computational Substrate Tiles**, the fundamental hardware unit of the Phase 3 Matroska Brain.

**To:** Project Dyson Directorate
**From:** Chief Systems Engineer, Phase 3 Architecture
**Date:** 2245.05.12
**Subject:** Technical Specification: Computational Substrate Tiles (BOM-3-1)

---

## 1. Executive Summary & Design Philosophy

The **Computational Substrate Tile (CST)** is the "cell" of the Matroska Brain organism. Unlike traditional satellite design, where computation is a subsystem supported by power and thermal control, the CST *is* the thermal control.

Our design philosophy is **Thermodynamic Computation**. In a Matroska Brain, energy is not "consumed"; it is cascaded. High-quality energy (low entropy) enters the sunward face, performs logical work (increasing entropy), and is radiated from the anti-sunward face as lower-quality heat to be harvested by the next shell.

Therefore, the CST is designed as a **sandwich structure**: an energy harvester on the bottom, a computational core in the center, and a spectral radiator on top. To accommodate the vast temperature differences between the inner and outer shells, we propose a **Three-Class Architecture** sharing a common structural form factor but utilizing distinct semiconductor materials.

---

## 2. System Architecture: The Three-Class Standard

To maximize manufacturing throughput (BOM-3-4), all tiles share a standardized hexagonal geometry and interface bus, but the internal "wafer stack" varies by orbital radius.

### Common Form Factor
*   **Geometry:** Regular Hexagon
*   **Dimensions:** 2.5m side length (~16.2 m² surface area)
*   **Interconnects:** Edge-mounted Free-Space Optical (FSO) transceivers for mesh networking.
*   **Structural Frame:** Carbon-Carbon composite weave (derived from Phase 2 manufacturing).

### The Class Variants

| Class | Designation | Target Shell | Operating Temp | Harvester Tech | Compute Substrate | Radiator Target |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Class I** | *Inferno* | Layer 1 (0.5-1.0 AU) | 800–1200 K | Multi-junction PV | **SiC / Diamond** (Wide Bandgap) | Near-IR (to Layer 2) |
| **Class II** | *Temperate* | Layer 2 (2.5 AU) | 200–400 K | InGaAs TPV | **Silicon / SOI** (Standard) | Mid-IR (to Layer 3) |
| **Class III** | *Cryo* | Layer 3+ (>8 AU) | 40–80 K | HgCdTe TPV | **SFQ / Josephson Junction** (Superconducting) | Far-IR (to Deep Space) |

---

## 3. Technical Specifications (Class II Baseline)

*The Class II tile represents the bulk of the swarm's mass and is the most analogous to current technology. Specifications for Class I and III scale relative to this baseline.*

### 3.1 Physical Characteristics
*   **Mass:** 45 kg (Areal density: ~2.8 kg/m²)
*   **Dimensions:** 5m diameter (point-to-point), 15mm thickness (excluding structural ribs).
*   **Power Input:** ~4.5 kW (assuming 280 W/m² harvested from Layer 1 emission).

### 3.2 Layer Stack (Sunward to Anti-Sunward)

1.  **Harvester Layer (Sunward Face):**
    *   *Material:* Indium Gallium Arsenide (InGaAs) Thermophotovoltaic (TPV) cells.
    *   *Function:* Absorbs narrow-band IR emission from Layer 1.
    *   *Efficiency:* Target 45% monochromatic efficiency.
    *   *Backplane:* Highly reflective spectral filter to recycle sub-bandgap photons back to Layer 1.

2.  **Logic Layer (Core):**
    *   *Architecture:* 3D-stacked Reversible CMOS (Adiabatic Logic).
    *   *Node:* 3nm equivalent (manufactured in zero-g).
    *   *Clock Speed:* 5 GHz (variable based on thermal headroom).
    *   *Throughput:* 25 PFLOPS (FP16) per tile.
    *   *Memory:* 5 PB 3D-NAND equivalent (high-density local storage).

3.  **Thermal Interface Layer:**
    *   *Material:* Pyrolytic Graphite Sheet (PGS) heat spreaders.
    *   *Function:* Rapidly moves waste heat from logic hotspots to the radiator surface.

4.  **Radiator Layer (Anti-Sunward Face):**
    *   *Material:* Nanostructured Photonic Crystal (Silicon/SiO2).
    *   *Function:* Emits waste heat in a specific IR band (e.g., 5–8 μm) matched to the bandgap of Class III tiles.
    *   *Emissivity:* >0.95 in target band; <0.1 out of band.

### 3.3 ASCII Diagram: Tile Cross-Section

```text
      [ SPACE / NEXT SHELL ]
             ^ ^ ^ ^
             | | | |  <-- Narrow-band IR Emission
+-------------------------------+
|  Photonic Crystal Radiator    |  <-- Layer C: Thermal Management
+-------------------------------+
|  Graphite Thermal Spreader    |
+-------------------------------+
|  3D Logic & Memory Stack      |  <-- Layer B: Compute Core
|  (Reversible Logic Gates)     |
+-------------------------------+
|  Power Conditioning / PMIC    |
+-------------------------------+
|  TPV / PV Harvester Array     |  <-- Layer A: Energy Input
+-------------------------------+
             ^ ^ ^ ^
             | | | |  <-- Incident Radiation (Solar or Waste Heat)
      [ SUN / INNER SHELL ]
```

---

## 4. Subsystems Breakdown

### 4.1 Compute Substrate: The Reversible Logic Imperative
Standard CMOS logic destroys information (erasing a bit), which generates heat ($k_B T \ln 2$ joules per bit). At the scale of the Matroska Brain, this heat is unmanageable.
*   **Solution:** We utilize **Adiabatic/Reversible Logic**. By recycling charge within the circuit rather than dumping it to ground, we reduce energy dissipation per operation by factors of 100–1000x.
*   **Hardware:** The logic gates are designed as transmission gates that recover signal energy. This requires slower clock speeds but allows massive parallelism.

### 4.2 Communications: The "Optical Mesh"
Each tile possesses 6 edge-mounted optical transceivers (100 Gbps each) to communicate with neighbors, creating a massive intra-shell mesh.
*   **Inter-Shell Link:** 1 in every 1,000 tiles includes a dorsal telescope aperture (part of BOM-3-2) to beam aggregated data to the next shell or relay nodes.

### 4.3 Station Keeping
Tiles are not physically bolted together; they fly in formation.
*   **Propulsion:** Solar/Thermal Photon Pressure. By adjusting the reflectivity of the radiator surface (using electrochromic elements), the tile can modulate the photon pressure vector for station keeping.
*   **Backup:** Small cold-gas thrusters (fed by sublimating solid iodine) for initial orbit insertion and emergency collision avoidance.

---

## 5. Manufacturing Considerations (BOM-3-4 Interface)

The feasibility of the CST relies entirely on **In-Space Manufacturing (ISM)**. We cannot launch $10^{12}$ tiles from Earth.

1.  **Substrate Growth:** Silicon and SiC boules are grown in microgravity, yielding defect-free crystals impossible on Earth.
2.  **Lithography:** Without gravity, we can use large-area membrane masks for lithography without sagging, allowing us to print entire 16 m² layers in fewer steps.
3.  **Vacuum Processing:** The hard vacuum of space eliminates the need for energy-intensive cleanroom vacuum pumps.

**Critical Risk:** The supply of dopants and rare earth elements (Indium, Gallium) for the TPV layers.
*   *Mitigation:* Aggressive asteroid mining (Phase 1/2 infrastructure) targeting Group 13 elements, or shifting to lower-efficiency but abundant organic/perovskite TPV materials for outer layers.

---

## 6. Development Roadmap

*   **Phase 3.0 (Year 0-5):** **Prototype "The Monolith."** A single Class II tile deployed at L2. Validation of TPV efficiency and radiative cooling.
*   **Phase 3.1 (Year 5-15):** **The Equatorial Ring.** Manufacture and deployment of $10^8$ tiles to form a sparse ring at 1 AU. This serves as the pilot plant for the Distributed OS (BOM-3-5).
*   **Phase 3.2 (Year 15-30):** **Shell Closure.** Exponential ramp-up of manufacturing. Completion of Layer 1 (Class I tiles).
*   **Phase 3.3 (Year 30+):** **Outward Expansion.** Waste heat from Layer 1 powers the construction and activation of Layer 2.

---

## 7. Cost & Resource Analysis

*   **Unit Cost (Mature):** The concept of "$" is abstract here.
    *   *Energy Cost:* ~50 GJ per tile (embodied energy in silicon purification and crystallization).
    *   *Labor:* 0 human hours. Fully automated.
*   **Total Mass (Initial Capability):**
    *   $10^{12}$ tiles × 45 kg = $4.5 \times 10^{13}$ kg.
    *   This is roughly equivalent to the mass of a medium-sized asteroid (e.g., 40 km diameter). This is well within the capacity of the Phase 2 mining infrastructure.

---

## 8. Open Engineering Questions & Risks

1.  **The "Annealing" Problem (Class I):**
    *   *Issue:* Class I tiles operate at 1000K. While SiC can handle this, dopant migration over centuries may degrade the logic gates.
    *   *Proposal:* Design logic circuits that can be "re-flashed" or dynamically reconfigured to route around drifted transistors.

2.  **Micrometeoroid Abrasion:**
    *   *Issue:* Over 100 years, the optical surfaces (TPV and Radiator) will be pitted by dust, reducing efficiency.
    *   *Proposal:* Tiles must be considered consumable. A 1% annual replacement rate is built into the manufacturing schedule.

3.  **Reversible Logic Stability:**
    *   *Issue:* Reversible logic is highly sensitive to thermal noise.
    *   *Proposal:* We may need hybrid architectures: Reversible logic for bulk data processing, standard CMOS for error correction and control, accepting the higher heat penalty for the control plane.

---

## 9. Conclusion

The Computational Substrate Tile is a convergence of energy generation, thermal management, and computation into a single solid-state device. By standardizing the form factor while varying the semiconductor chemistry, we can build the Matroska Brain as a modular, scalable system.

**Recommendation:** Immediate authorization to begin TRL 4 testing of **Indium-Gallium-Arsenide TPV cells** optimized for 1200K blackbody radiation (Layer 1 to Layer 2 coupling). This is the critical link in the thermodynamic chain.