---
bomId: "bom-3-1"
itemName: "Computational Substrate Tiles"
itemSlug: "computational-substrate-tiles"
type: "consensus"
generated: "2026-02-07"
phase: "phase-3"
---



# Computational Substrate Tiles (BOM-3-1) — Consensus Synthesis Document
## Phase 3: Matroska Brain

---

## Key Specifications

Where all contributing models converge, the following specifications represent firm consensus:

- **Tile Geometry:** Regular hexagonal tessellation is universally adopted for optimal packing efficiency, uniform neighbor count (6), and structural isotropy across the shell membrane.

- **Three-Class Architecture:** All models specify three tile variants sharing a common interface standard but differing in semiconductor materials — a **Hot class (800–1200 K)** using wide-bandgap substrates (SiC/GaN/diamond), a **Mid class (200–400 K)** using advanced silicon, and a **Cold class (40–80 K)** supporting superconducting interconnects and cryogenic operation.

- **Sandwich Layer Stack:** All models agree on the fundamental sunward-to-anti-sunward ordering: **TPV/PV energy harvester → thermal backbone / heat spreader → compute and memory core → spectral-selective radiator**. The tile is simultaneously a power converter, computer, and thermal emitter.

- **Spectral-Selective Radiator Emission:** The anti-sunward face must emit waste heat in a **narrow infrared band matched to the absorber bandgap of the next outward shell's tiles**, with in-band emissivity **≥0.85–0.95** and out-of-band emissivity **≤0.1**. Photonic crystal or metasurface technology is the consensus approach.

- **Photon Recycling on Sunward Face:** All models specify a sub-bandgap reflective filter behind the TPV cells to return unusable photons to the inner shell's radiators, boosting effective system conversion efficiency.

- **Thermal Spreader Material:** Pyrolytic graphite sheet (PGS) and/or carbon-carbon composites are universally specified for the thermal interface layer, with diamond composites noted for the hot-layer variant.

- **Intra-Shell Communications:** Free-space optical (FSO) transceivers at tile edges, operating at **≥100 Gbps per link**, forming a mesh network across the shell surface. All models specify 1550 nm as the baseline wavelength.

- **Mid-Layer (Class II/CST-M) as Bulk Compute Workhorse:** All models agree that the 200–400 K silicon-based mid-layer tile will constitute the majority of the swarm's computational mass and deliver the highest compute density per kilogram, owing to mature semiconductor manufacturing.

- **Initial Operational Capability (IOC) Population:** ~**10¹² tiles** across all layers, requiring asteroid-scale material inputs (~10¹³–10¹⁴ kg total mass) sourced from Phase 2 mining infrastructure.

- **Tiles as Consumables:** All models design for routine replacement rather than indefinite longevity, with annual attrition rates of **1–5%** built into manufacturing schedules to account for micrometeoroid damage, radiation degradation, and component drift.

---

## Divergent Views

- **Tile Area / Form Factor:** Gemini specifies a **~16.2 m² hexagon (2.5 m side length)** as the single standard; GPT proposes a **family approach with a 10 m² baseline (CST-10) and a 50 m² scaling option (CST-50)**, arguing that lifecycle economics and deployment logistics should determine optimal size. No third model (Claude) specification was provided for arbitration, leaving the 10–16 m² range as the active design trade space.

- **Tile Mass (Mid-Layer Baseline):** Gemini specifies **45 kg** for its ~16 m² tile (~2.8 kg/m²); GPT specifies **35 kg** for its 10 m² tile (~3.5 kg/m²), reflecting different assumptions about structural mass fraction and compute cartridge density. The areal density disagreement (2.8 vs. 3.5 kg/m²) implies different structural and packaging philosophies.

- **Compute Performance per Tile (Mid-Layer):** Gemini specifies **25 PFLOPS FP16** for a ~16 m² tile at ~4.5 kW input; GPT specifies **60 PFLOPS FP16-equivalent** for a 10 m² tile at ~14.4 kW input. This divergence stems from different assumptions about incident flux density (Gemini: 280 W/m²; GPT: 8 kW/m²), TPV efficiency targets (Gemini: 45% monochromatic; GPT: 18% broadband system), and resulting available electrical power. GPT's higher flux assumption implies a tighter inner-shell spacing or hotter Layer 1 radiators.

- **Modularity Philosophy (Cartridge vs. Monolithic):** GPT strongly advocates a **replaceable "Compute Cartridge" model** bonded to a standardized Thermal Backbone Plane, enabling in-situ technology upgrades and robotic swap-outs. Gemini designs the tile as a **monolithic sandwich structure** with integrated 3D-stacked logic, treating the entire tile as the replaceable unit. This is a fundamental architectural divergence affecting maintenance strategy, manufacturing complexity, and upgrade cadence.

- **Cold-Layer Power Strategy:** Gemini assumes **HgCdTe TPV harvesting** of far-IR radiation is viable for Class III tiles; GPT explicitly flags that **TPV at low source temperatures (<120 K) is impractical** and recommends a **hybrid approach combining trickle TPV with beamed power delivery** (from BOM-3-7). GPT assigns this a TRL of 2–4 and considers it a major program risk, while Gemini lists it as a baseline technology without flagging feasibility concerns.

- **Reversible Logic Dependency:** Gemini makes **adiabatic/reversible CMOS** the baseline compute architecture for the mid-layer tile (citing the Landauer limit as the driving rationale), with standard CMOS reserved only for the control plane. GPT treats reversible logic as an **aspirational upgrade path (TRL 2–3)** and explicitly recommends that the IOC tile must function with **conventional ASIC accelerators**, with the cartridge modularity enabling a later transition. This represents a significant difference in technology risk posture.

---

## Open Questions

1. **Mid-Temperature TPV Viability:** Can thermophotovoltaic cells achieve ≥10–15% system efficiency when harvesting radiation from 300–600 K sources? Both models identify this as the critical link in the thermodynamic cascade. If mid-temperature TPV underperforms, the outer compute layers become power-starved and the entire multi-shell energy cascade loses its economic rationale. Demonstrated photon recycling at these temperatures remains at TRL 2–4.

2. **Hot-Layer Compute vs. Energy-Only Role:** Is high-density computation at 800–1200 K junction temperatures achievable with wide-bandgap semiconductors (SiC, GaN, diamond FETs), or should Class I / CST-H tiles be redesigned as primarily **energy conversion and routing layers** with minimal logic, pushing the bulk of computation to the thermally favorable mid-layer? Both models acknowledge this uncertainty but take different default positions.

3. **Spectral-Selective Emitter Durability at Scale:** Photonic crystal and metasurface narrowband emitters are central to the thermodynamic cascade, yet their long-term stability under micrometeoroid sputtering, atomic oxygen erosion, and UV degradation over decades is uncharacterized. What is the achievable Δλ/λ stability over a 10–30 year operational life, and what in-situ recoating or refresh strategies are feasible at trillion-tile scale?

4. **Optimal Tile Size for Lifecycle Economics:** The design trade between smaller tiles (~1–10 m², higher part count, easier replacement, lower per-unit failure impact) and larger tiles (~16–50 m², fewer units, lower assembly complexity, higher per-unit failure cost) remains unresolved. This interacts directly with manufacturing throughput assumptions (BOM-3-4), robotic maintenance capacity (BOM-3-8), and membrane structural design (BOM-3-3).

5. **Persistent Memory Technology for In-Space Fabrication:** What is the best radiation-tolerant, long-lifetime, in-space-manufacturable non-volatile memory technology? 3D NAND offers density but extreme fabrication complexity; ReRAM and PCM offer simpler processing but lower maturity. The choice directly affects tile storage capacity (models range from 1 PB to 10 PB per tile) and data integrity guarantees for the distributed OS (BOM-3-5).

6. **Dopant and III-V Material Supply Chain:** Both models flag the dependence on indium, gallium, and other Group 13/15 elements for TPV cells. Can asteroid mining (Phase 1/2 infrastructure) reliably supply these at the required purity and volume, or must the design pivot to lower-efficiency but elementally abundant alternatives (e.g., perovskite or organic TPV) for outer layers?

---

## Recommended Approach

1. **Adopt the Three-Class Architecture with Standardized Interfaces as the program baseline.** All thermal, electrical (HVDC bus), optical communication, and mechanical attachment interfaces must be frozen early and held common across CST-H, CST-M, and CST-C variants. Internal compute and harvester implementations may vary by class and evolve over time. This is the single highest-leverage decision for program flexibility and is endorsed by all models.

2. **Prioritize the Mid-Layer (CST-M) tile for IOC development and initial mass production.** The 200–400 K silicon regime offers the highest technology readiness, the best compute density per kilogram, and the most mature manufacturing base. Design the IOC tile as a **10–16 m² hexagonal unit, 35–45 kg, delivering 25–60 PFLOPS FP16-equivalent**, with the exact parameters resolved through the prototype campaign. Begin Layer 2 deployment first; Layer 1 and Layer 3 follow as their respective material technologies mature.

3. **Implement GPT's Compute Cartridge modularity within Gemini's monolithic sandwich thermal structure.** The Thermal Backbone Plane and radiator/harvester faces should be designed for the full tile lifetime (10–30 years), while the compute and memory subsystem should be a **field-replaceable cartridge** bonded to the TBP. This reconciles Gemini's thermodynamic integration philosophy with GPT's upgrade-path pragmatism, and directly enables Recommendation 4.

4. **Baseline IOC compute on conventional ASIC accelerators; design the cartridge interface to accept reversible/adiabatic logic modules as a future upgrade.** Do not make the IOC deployment dependent on TRL 2–3 reversible logic. Instead, invest in parallel reversible logic R&D with a target insertion at the second or third cartridge generation. The energy savings from reversible logic are transformative but must not gate initial capability.

5. **Immediately fund and execute a TPV demonstration campaign spanning the full temperature cascade.** The single highest technical risk is the thermophotovoltaic chain. Prioritize: (a) InGaAs TPV with photon recycling at 1200 K source temperature (Layer 1→2 coupling, target 35–45% monochromatic efficiency); (b) low-bandgap TPV at 400–600 K source temperature (Layer 2→3 coupling, target ≥15% system efficiency); (c) hybrid beamed-power receiver design for cold-layer tiles where passive TPV is insufficient. Gate Layer 3 architecture decisions on the results of (b) and (c).

6. **Design for puncture and degradation as normal operating conditions, not failure modes.** Adopt GPT's "aggressive replacement economics" philosophy: tiles are consumable units with a 1–5% annual replacement rate. Build tile-level BIST, fleet-wide telemetry-driven manufacturing feedback loops, and robotic replacement infrastructure (BOM-3-8) into the baseline program from day one. Do not attempt to make individual tiles immortal.

7. **Adopt a staged manufacturing closure plan aligned with Phase 2 infrastructure maturity.** Begin with in-space production of structures, thermal planes, radiator coatings, and TPV cells (moderate fabrication complexity), while importing advanced compute die from the most capable available foundries. Progress to full in-space semiconductor fabrication only after autonomous lithography, contamination control, and metrology are demonstrated at scale. This staged approach (GPT's Stage A→B→C model) avoids gating the entire program on the hardest manufacturing problem.