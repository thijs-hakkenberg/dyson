---
bomId: "bom-3b-3"
itemName: "Solar Wind Collectors"
itemSlug: "solar-wind-collectors"
modelId: "gemini-3-pro"
modelName: "Gemini 3 Pro"
generated: "2026-02-07"
phase: "phase-3b"
---

# Technical Proposal: Solar Wind Collectors (SWC)
**Project Dyson | Phase 3b: Stellar Engine**
**Document ID:** BOM-3B-3-PROP-v1.4
**Author:** Dr. Aris Thorne, Lead Systems Architect, Propulsion Division
**Date:** [Standard Mission Time]

---

## 1. Executive Summary & Design Philosophy

The construction of a Caplan-style Stellar Engine requires a staggering mass flow rate of approximately $10^{12}$ kg/s to achieve meaningful acceleration of the solar system. While the primary mass lifting systems (BOM-3B-4) will handle the bulk of chromospheric extraction, the **Solar Wind Collectors (SWC)** represent a critical "low-hanging fruit" infrastructure.

**Philosophy: "Intercept, Don't Lift."**
The Sun naturally ejects approximately $1.3 \times 10^9$ kg/s of mass via the solar wind. While this is only ~0.1% of the total mass requirement for the full Caplan thruster, it represents free kinetic energy and pre-ionized plasma. My design philosophy for the SWC is **Electro-Magnetic Funneling**. Rather than building physical scoops which suffer from immense thermal degradation and sputtering, we will deploy a vast array of magnetic field generators to redirect the charged solar wind into high-density streams for processing.

This system serves two purposes:
1.  **Feedstock Acquisition:** Provides the initial startup mass for the fusion reactors before the active lifting beams are fully operational.
2.  **Space Weather Control:** By manipulating the solar wind, we protect the inner Dyson Swarm (Phase 2) and the Matrioshka Brain (Phase 3a) from Coronal Mass Ejections (CMEs).

---

## 2. Technical Specifications

The SWC is not a single monolith, but a distributed constellation of **Magnetic Funnel Satellites (MFS)** operating in a tight formation at 0.1 AU.

### 2.1 Performance Metrics
*   **Total Mass Collection Target:** $1.5 \times 10^9$ kg/s (Baseline Solar Wind + CME buffering)
*   **Collection Efficiency:** >92% of intercepted flux
*   **Operating Orbit:** 0.1 AU (15 million km), Equatorial Plane $\pm 30^\circ$
*   **Power Consumption (Constellation):** 45 Petawatts (PW) – Sourced from Phase 2 Swarm
*   **Plasma Compression Ratio:** 10,000:1 (Ambient to Feedstock)

### 2.2 Single Unit (MFS-Class) Specifications
*   **Dimensions:** 2km (Length) x 500m (Diameter)
*   **Dry Mass:** 45,000 metric tons
*   **Magnetic Field Strength:** 150 Tesla (Peak throat field)
*   **Thermal Tolerance:** 2,500 K (Shield surface)
*   **Propulsion:** Ion station-keeping + Solar Radiation Pressure sails

---

## 3. System Architecture

The SWC operates as a "virtual nozzle." We do not catch particles; we bend their trajectories.

### 3.1 The Magnetic Lattice
The constellation consists of 12,000 MFS units arranged in a hexagonal lattice. They generate overlapping magnetospheres that create a "magnetic wall" impermeable to protons and electrons, funneling them toward specific collection nodes.

```ascii
      [Solar Wind Flow]  >>>  p+  e-  He++  >>>
            |
            v
    +-------+-------+       +-------+-------+
    | MFS-01 (N)    | <---> | MFS-02 (S)    |  (Alternating Polarity)
    +-------+-------+       +-------+-------+
            |                       |
            \                       /
             \   [Magnetic Flux]   /
              \                   /
               \                 /
                v               v
          [High Density Plasma Stream]
                        |
                        v
              [Processing Node / Feed Line]
```

### 3.2 Subsystems Breakdown

#### A. The Superconducting Solenoid Spine (S3)
*   **Description:** The core of the MFS. A 2km long solenoid using ReBCO (Rare-earth Barium Copper Oxide) high-temperature superconductors.
*   **Function:** Generates the primary deflection field.
*   **Cooling:** Active closed-loop Helium cryocoolers, dumping heat into the shadow-side radiators.

#### B. Electrostatic Harvesters
*   **Description:** Grid arrays located at the "throat" of the magnetic funnel.
*   **Function:** While the magnetic field guides the bulk plasma, these grids use kV-range potentials to separate electrons from ions, effectively harvesting electric power from the solar wind itself to supplement station-keeping (the "Dyson-Harrop" effect).

#### C. Thermal Shielding (The "Umbrella")
*   **Material:** Multi-layer insulation of Tungsten-Hafnium-Carbide and Aerogel.
*   **Geometry:** A conical forward shield protecting the superconducting spine from direct solar irradiance and particle sputtering.

#### D. Interface: The Feed Line
*   **Connection:** The SWC does not store mass. It directs the concentrated plasma stream to the **Helium Separation Plants (BOM-3B-5)**.
*   **Mechanism:** Magnetic confinement "pipelines" – essentially vacuum tubes without walls, defined by field lines, guiding plasma to the separation plants.

---

## 4. Autonomy, Control, and Communication

### 4.1 Swarm Intelligence (SI) Level 4
The SWC requires sub-millisecond reaction times to fluctuations in solar wind density. Speed-of-light lag to Earth (8 minutes) makes remote control impossible.
*   **Local Control:** Each MFS unit possesses an AI core capable of adjusting magnetic field topology autonomously.
*   **Swarm Consensus:** The lattice operates as a neural network. If MFS-104 detects a pressure spike (CME precursor), it signals neighbors to tighten the magnetic weave instantly.

### 4.2 Data Link
*   **Primary:** Optical Laser Mesh (Inter-satellite).
*   **Secondary:** Neutrino Pulse (Emergency broadcast through solar interference).
*   **Bandwidth:** 500 Tbps (Telemetry + Plasma diagnostics).

---

## 5. Manufacturing Considerations

We cannot launch 12,000 units of 45,000 tons from Earth. This is strictly an **In-Situ Resource Utilization (ISRU)** project.

*   **Primary Material Source:** Mercury.
    *   Mercury is already being dismantled for Phase 2. We will divert iron and heavy metals for the MFS cores.
*   **Superconductor Fabrication:** Zero-G vapor deposition facilities (Phase 2 infrastructure) will print the ReBCO tapes in continuous kilometer-long segments.
*   **Assembly:** Automated assemblers at the L1 Lagrange point of Mercury, ferrying completed units to the 0.1 AU orbit.

---

## 6. Development Roadmap

*   **T-Minus 10 Years:** Prototype "Magnetic Sail" testing in Earth orbit (Technology Readiness Level 6 -> 9).
*   **Year 0:** Commissioning of Mercury-L1 Assembly Yards.
*   **Year 5:** Deployment of "The Ring" – the first equatorial ring of 1,000 MFS units.
*   **Year 15:** Full Constellation Deployment (12,000 units).
*   **Year 20:** Integration with Mass Lifting Systems (Phase 3b full activation).

---

## 7. Cost Analysis (Energy Adjusted)

In a post-scarcity Dyson context, currency is irrelevant. We measure cost in **Energy** and **Mass**.

*   **Total Mass Budget:** $5.4 \times 10^{11}$ kg (approx. 0.001% of Mercury's mass).
*   **Energy Cost (Fabrication):** $2.5 \times 10^{24}$ Joules.
*   **Operational Cost:** 45 PW continuous draw.
    *   *Note:* This power draw is negligible compared to the output of the Phase 2 Dyson Swarm (~$10^{26}$ Watts).

---

## 8. Risk Assessment

| Risk | Probability | Impact | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **CME Overload** | High | Critical | Dynamic field expansion; "dumping" plasma rather than collecting it to save the hardware. |
| **Sputtering Erosion** | Certain | Moderate | Ablative shield regeneration using collected solar material (self-healing). |
| **Magnetic Reconnection** | Medium | High | Strict topology controls to prevent field lines from snapping and releasing stored plasma violently. |
| **Orbit Instability** | Low | High | Active photon-pressure balancing using the Phase 2 mirrors. |

---

## 9. Open Engineering Questions

1.  **Isotope Separation Efficiency:** Can we perform rough Helium/Hydrogen separation *in-flight* within the magnetic funnel using ion cyclotron resonance, or must this wait for the physical plant? Doing it in-flight saves massive processing overhead later.
2.  **The "Back-Pressure" Problem:** As we funnel plasma into high density, thermal pressure increases. Will the magnetic confinement required to hold the stream exceed the structural limits of the MFS spine?
3.  **Solar Cycle Interaction:** How will a permanent magnetic ring at 0.1 AU affect the Sun's internal dynamo? There is a non-zero risk of dampening (or exciting) the solar cycle.

---

**Conclusion:**
The Solar Wind Collectors are the intake manifold of the Stellar Engine. While they provide only a fraction of the reaction mass, they are the necessary first step in mastering solar plasma manipulation. I recommend immediate authorization of the Mercury-L1 foundry expansion to support MFS fabrication.

**Dr. Aris Thorne**
*Project Dyson | Propulsion Division*