---
bomId: "bom-3-2"
itemName: "Inter-Layer Optical Communication Backbone"
itemSlug: "inter-layer-optical-backbone"
type: "consensus"
generated: "2026-02-07"
phase: "phase-3"
---



# Inter-Layer Optical Communication Backbone (bom-3-2) — Consensus Synthesis

## Phase 3: Matroska Brain

---

## Key Specifications

- **Primary Wavelength:** All models converge on **1550 nm (C-band)** as the baseline operating wavelength, leveraging mature coherent photonics, radiation-tolerant component pathways, and existing WDM ecosystem compatibility.

- **3-Tier Hierarchical Architecture:** All models agree on a three-tier topology: **Tier-0 tile-embedded transceivers** (short-range mesh), **Tier-1 sector/aggregation routers** (regional traffic management and time distribution), and **Tier-2 inter-layer trunk relay nodes** (long-haul backbone between shells), with strict traffic locality enforced at each level.

- **Trunk Relay Node Mass & Aperture Class:** All models converge on inter-layer relay satellites in the **~300–850 kg mass range** with **primary apertures of 0.5–1.5 m**, diffraction-limited at 1550 nm, with the consensus target near **~500 kg and ~1 m aperture**.

- **Tile-Embedded Transceiver (Tier-0):** All models specify a compact, low-mass photonic transceiver integrated directly into computational substrate tiles (bom-3-1), with **mass ≤ 0.5 kg**, **silicon photonics / PIC-based construction**, **non-mechanical beam steering** (MEMS or liquid crystal phased arrays), and intra-shell ranges of **~10 km to 50,000 km** depending on link type.

- **Pointing Accuracy:** All models agree that sub-microradian pointing is required for trunk links, with specifications converging on **< 0.1 µrad RMS jitter** achieved through multi-stage stabilization (coarse reaction wheels/CMGs → fine steering mirrors/piezo actuators → ultrafine adaptive optics).

- **WDM as Primary Multiplexing:** All models agree that **dense Wavelength Division Multiplexing** (256–2048 channels) with coherent modulation (DP-QPSK or higher-order QAM as SNR permits) is the primary capacity scaling method.

- **Delay-Tolerant Networking (DTN) as First-Class Requirement:** All models agree that inter-shell latencies of **minutes to hours** (light-speed over 0.3–25 AU) mandate DTN store-and-forward as a core protocol feature, not an afterthought, with no assumption of global synchrony.

- **Ephemeris-Based / Predictive Routing:** All models agree that routing tables must be **pre-computed from deterministic orbital mechanics** rather than discovered reactively, since Keplerian shear between shells makes topology changes predictable.

- **Time Authority Constellation:** All models agree on a dedicated timing subsystem using **high-stability atomic clocks** (optical or mercury-ion trap, stability ≥ 10⁻¹⁶) distributed across the network, providing sector-level synchronization to **≤ 10 ns** and cross-layer timekeeping with **explicit uncertainty metadata** rather than claims of simultaneity.

- **Autonomous Operation:** All models agree that at 10⁸–10⁹ relay nodes, the network must be **fully autonomous** for link acquisition, tracking, handover, failure recovery, and routing convergence, with zero human-in-the-loop for operational decisions.

---

## Divergent Views

- **OAM (Orbital Angular Momentum) Multiplexing Role**: Gemini treats OAM as a **baseline multiplexing dimension** (16 OAM modes × 1024 WDM channels per Class A relay, integral to achieving 10 Pbps per link); GPT treats OAM as an **optional link-level enhancement only**, explicitly recommending no OAM dependency in the baseline design due to sensitivity to pointing jitter, optics aberrations, and contamination, and flagging OAM practicality as an open question.

- **Optimal Trunk Aperture Size Strategy**: Gemini specifies **1.5 m SiC monolithic mirrors** for Class A relays as the baseline, emphasizing zero-gravity surface-tension molding for fabrication; GPT recommends **many 30–50 cm apertures in parallel** rather than fewer large apertures, arguing this is more manufacturable and maintainable at scale, with segmented/replicated mirrors compensated by coherent DSP and adaptive optics, deferring meter-class optics until manufacturing proves cost-effective.

- **Per-Link Throughput Claims**: Gemini specifies **~10 Pbps per trunk link** (enabled by OAM+WDM on a single 1.5 m aperture); GPT specifies **10–200 Tbps per node at IOC scaling to 1–10 Pbps at full build** achieved via many parallel terminals and channels rather than single-link heroics, explicitly noting that capacity scales with relay density and terminal count, not individual link performance.

- **Adjacent-Layer vs. Multi-Hop Trunk Topology**: Gemini's architecture implies **direct long-haul links spanning 5–10 AU** between non-adjacent shells via Class A relays in inter-shell gaps; GPT strongly advocates **adjacent-layer links only** (Layer n ↔ n+1) as the primary transport, with skip links at ≤1% of trunk count, arguing that beam divergence and pointing complexity make multi-AU single hops impractical for core capacity.

- **Cost Estimate Scale**: Gemini estimates a total backbone cost of **~10¹⁵ manufacturing-node-years**, driven primarily by 2×10⁹ Class A relays at $250K each; GPT estimates **~10¹²–10¹³ equivalent**, with 10⁸–10⁹ relay nodes as the dominant cost driver, representing a **2–3 order of magnitude disagreement** that reflects fundamentally different assumptions about relay count, unit cost, and aperture strategy.

- **Security and Control Plane Emphasis**: GPT provides a detailed **security model** (hardware root of trust, post-quantum cryptography, signed routing updates, optical beam authentication, control-plane hardening) and explicit control-plane/data-plane separation on dedicated wavelengths; Gemini does not address security or control-plane architecture, focusing instead on physical-layer and protocol-level design.

---

## Open Questions

- **OAM Coherence Over AU Distances:** Can Orbital Angular Momentum modes maintain sufficient coherence and mode purity over distances exceeding 1 AU, given zodiacal dust scattering, pointing jitter, and optics manufacturing tolerances? Both models flag this; Gemini proposes a Phase 2 long-baseline interferometry experiment, while GPT questions whether OAM provides net capacity gains once real-world impairments are included.

- **Precision Optics Manufacturing at Scale:** Can diffraction-limited mirrors (whether 1.5 m monolithic SiC or 30–50 cm segmented) be fabricated at quantities of 10⁸–10⁹ with sufficient surface accuracy (λ/20 or better) using in-space manufacturing techniques? Gemini proposes surface-tension molding in free-fall but flags it as unvalidated; GPT recommends relaxed figure requirements compensated by DSP/AO but acknowledges calibration as a potential pacing bottleneck.

- **Optimal Sector Geometry vs. Orbital Shear:** What sector size and shape minimizes routing handovers given differential Keplerian angular velocities between shells? This determines the fundamental partitioning of the network and affects routing table size, handover frequency, and the "make-before-break" problem across light-minutes of delay.

- **Interference with Power Beaming (bom-3-7):** How are spectral allocation, pointing deconfliction, and emergency beam-abort coordination enforced between the communication backbone and inter-layer power beaming systems, which may share similar wavelength bands and pointing geometries? Both models identify this but neither provides a resolution.

- **Optics Degradation Lifecycle and Maintenance Cadence:** What is the realistic replacement rate for sacrificial windows, laser modules, and mirror coatings under continuous zodiacal dust bombardment and radiation exposure, and does the maintenance swarm (bom-3-8) capacity scale to match? This determines whether the network degrades faster than it can be repaired at full scale.

- **Relay Count and Density Optimization:** The 10× disagreement in relay node count (Gemini: ~2×10⁹; GPT: 10⁸–10⁹) reflects an unresolved tradeoff between fewer high-power large-aperture nodes and many smaller parallel terminals. What is the true cost-optimal and reliability-optimal relay density as a function of shell radius, tile density, and desired aggregate throughput?

---

## Recommended Approach

1. **Adopt the 3-tier hierarchical architecture as the canonical baseline**, with Tier-0 PIC-based tile transceivers, Tier-1 sector router clusters, and Tier-2 inter-layer trunk relays. Enforce strict traffic locality (>99.9% intra-layer) and design the inter-layer spine for graceful degradation, not perfect availability.

2. **Baseline on 1550 nm coherent WDM without OAM dependency.** Use dense WDM (256–2048 channels, coherent DP-QPSK minimum) as the primary capacity scaling method. Authorize OAM as a performance-mode enhancement on a subset of trunk links only after a dedicated Phase 2/early Phase 3 validation experiment confirms net capacity gains over AU distances under realistic pointing and contamination conditions.

3. **Pursue a dual-track aperture strategy:** Begin manufacturing and deployment with **30–50 cm standardized, segmented telescope modules** (GPT's approach) to establish initial operational capability and validate autonomous PAT at scale. In parallel, develop **1.0–1.5 m monolithic SiC mirror fabrication** (Gemini's surface-tension molding) as a second-generation upgrade path. Transition to larger apertures only when in-space manufacturing demonstrates consistent λ/20 surface quality at production volumes.

4. **Design for adjacent-layer trunks as the primary inter-shell transport**, with relay chains and multi-hop routing between non-adjacent shells. Authorize sparse skip links (≤1–5% of trunk count) for fault isolation and congestion relief. Do not design baseline capacity around single-hop links exceeding ~1 AU until link budget analysis and relay density optimization confirm feasibility.

5. **Implement DTN and ephemeris-based predictive routing from day one** as core protocol features within the Delay-Tolerant Photonic Switching Protocol (DT-PSP). Mandate time-uncertainty metadata in every packet header and scheduling interface. Integrate the Chronos/TAN timing authority as a backbone subsystem, not a separate system, with two-way optical time transfer and redundant clock ensembles at every tier.

6. **Define ORU (Orbital Replacement Unit) interfaces and maintenance protocols before freezing hardware design.** Every relay node must be constructed from standardized, swarm-replaceable modules (laser ORU, receiver ORU, mirror/window ORU, compute/switch ORU, attitude sensor ORU). Coordinate ORU specifications with the construction/maintenance swarm (bom-3-8) and manufacturing foundries (bom-3-4) to ensure replacement cadence can match predicted optics degradation rates.

7. **Resolve the relay count and cost divergence through a parametric trade study** that models aggregate throughput as a function of relay density, aperture size, per-node capacity, and manufacturing cost curves. Use this to converge on a single baseline relay count and unit specification before committing to mass production tooling. Target cost reconciliation between the 10¹³ and 10¹⁵ estimates by explicitly accounting for whether Class B transceiver costs are marginal (integrated into tile fabrication) or standalone.