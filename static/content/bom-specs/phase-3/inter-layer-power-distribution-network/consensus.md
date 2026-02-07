---
bomId: "bom-3-7"
itemName: "Inter-Layer Power Distribution Network"
itemSlug: "inter-layer-power-distribution-network"
type: "consensus"
generated: "2026-02-07"
phase: "phase-3"
---



# Inter-Layer Power Distribution Network (ILPDN) — Consensus Synthesis
## Phase 3: Matroska Brain | BOM ID: bom-3-7

---

## Key Specifications

All three models converge on the following technical parameters:

- **Primary beaming wavelength:** 1064 nm (Nd:YAG / Yb-fiber laser class), selected for mature high-efficiency photovoltaic receivers, manageable optics, and acceptable zodiacal dust scattering losses across AU-scale distances.

- **Monochromatic laser photovoltaic (LPV) receiver efficiency:** 50–70% electrical conversion (all models specify InGaAs or equivalent narrowband-tuned cells; Gemini cites 65%, GPT brackets 50–70%, both noting photon recycling as an enabler).

- **End-to-end beamed power efficiency (optical path):** 25–45% wall-to-receiver-bus, accounting for laser wall-plug efficiency (40–75%), free-space transmission losses, LPV conversion, and power electronics.

- **Intra-layer distribution:** Segmented HVDC microgrids at ±10 kV to ±100 kV DC, with solid-state breakers providing fault isolation in <1 ms clearing time, and power cells on the order of 1–10 km linear scale.

- **Superconducting distribution on cold outer layers:** MgB₂ (Tc ≈ 39 K) or REBCO (Tc ≈ 90 K) conductors operating passively at ambient cryogenic temperatures (10–40 K at 25 AU), requiring no active refrigeration — enabling effectively lossless local grids.

- **Beam safety architecture:** All models mandate a receiver-authenticated pilot beam interlock as a hard hardware requirement. Transmitters can only emit high power along the vector from which a cryptographically coded pilot/beacon signal is received; loss of lock triggers abort in <10 ms (GPT) to microseconds (Gemini).

- **Optical Power Beaming Station (transmitter) scale:** Individual stations in the 1–20 GW optical output class, with effective apertures of 10 m (short-range/phased array) to 300+ m (long-range segmented membrane), massing 200–800 tonnes per major hub.

- **Power Interface Units (PIUs):** Standardized endpoint converters at every tile, relay, and foundry. Tile-class PIUs are 0.5–10 kW, 0.5–2 kg, >96% DC-DC efficiency, with seconds of local supercapacitor ride-through for blackstart and fault tolerance.

- **Primary customers:** Self-replicating manufacturing foundries (bom-3-4) requiring GW-class burst power, and outer cryogenic shell subsystems requiring reliable make-up power beyond what passive thermal cascade provides.

- **Total program cost estimate:** $10¹²–$10¹⁴ in manufacturing-node-year equivalents, dominated by laser/LPV mass production, power electronics, superconductor cabling, and deployment robotics.

---

## Divergent Views

- **Single-hop vs. relay-staged beaming topology:** Gemini designs around direct long-range beams (up to 25 AU single hop) with large catchment zones (100–1,000 km diameter spots), accepting km-class sparse phased arrays at the transmitter; GPT strongly opposes "hero beams" as a baseline, recommending relay-staged optical corridors with hops every 0.2–1 AU to reduce aperture requirements, pointing stringency, and weaponization risk. (Note: Claude's specification was not provided for this synthesis.)

- **HVDC voltage standardization:** Gemini specifies a single ±100 kV DC backbone standard for the Layer 4 superconducting grid with 2 GW per cable bundle; GPT proposes per-layer voltage selection from a family of ±10/±20/±50 kV standards, arguing that a single global standard over-constrains inner layers where cryogenic superconductors are unavailable and arcing risk differs.

- **Microwave fallback mode:** GPT includes a dedicated secondary microwave beaming capability (5.8 GHz or 35 GHz rectennas, 10–25% efficiency) as a robustness/degraded-mode option when optical components are damaged or pointing is compromised; Gemini does not address microwave power transfer, relying entirely on the optical path with redundant apertures and dust mitigation.

- **ILPDN sizing philosophy (fraction of total captured energy):** GPT frames ILPDN as a make-up/resilience overlay carrying ~1–10% of local layer power, with compute tiles remaining primarily self-powered by local TPV; Gemini sizes the system as a primary power delivery mechanism for outer shells and foundries, implying a larger fraction of total energy budget routed through the network. GPT explicitly flags this fraction as the single biggest open sizing variable.

- **Backbone relay count interpretation:** GPT reinterprets the consensus figure of 10⁷–10⁹ backbone relays as predominantly lightweight co-packaged beam taps (sub-ton to few-ton, 1–10 MW class) with only 10⁴–10⁶ heavy BPRS hubs; Gemini specifies 10⁸ transmitter units at 500 tonnes each, implying a much larger total mass commitment to the transmitter constellation.

- **Governance and multi-party authorization:** GPT specifies multi-party quorum authorization from independent distributed OS authority nodes for any beam above a defined power threshold, plus an auditable power ledger logging every joule; Gemini relies primarily on physics-based safety (retro-directive pilot beam, sidelobe suppression) with less emphasis on cryptographic governance layers.

---

## Open Questions

1. **What fraction of total Matroska-captured energy must be actively routable through ILPDN?** This is the dominant sizing variable — 1% vs. 10% vs. 20% changes total infrastructure mass by orders of magnitude and determines whether ILPDN is a resilience overlay or a primary power backbone. No model commits to a definitive answer.

2. **Zodiacal dust interaction at scale:** Over multi-AU paths, will cumulative scattering of 1064 nm power beams create a diffuse optical "fog" that raises the noise floor for the separate optical communications backbone (bom-3-2)? Can spectral isolation alone prevent cross-system interference, or are spatial/temporal multiplexing strategies required?

3. **HVDC cable dynamics in swarm architectures:** Can physical superconducting cables survive the tidal forces, differential Keplerian shear, and station-keeping maneuvers between tiles on outer shells? If not, what is the optimal transition point to wireless inductive resonant coupling or short-hop optical transfer for intra-layer distribution?

4. **Thermal integration of BPRS waste heat into the Matroska thermal cascade:** Major relay stations dumping hundreds of MW of waste heat create local hot spots that could disrupt the carefully designed spectral-selective thermal ladder (bom-3-3). What placement rules, spectral shaping of radiator emission, or heat-useful-reuse strategies are needed?

5. **Long-duration energy storage technology selection by layer temperature:** Supercapacitors provide seconds of ride-through everywhere, but foundries and cryo systems need hours-to-days of storage. What is the optimal technology per thermal regime — high-temperature thermal storage for inner layers, flywheels for mid-layers, chemical/metal-air for volatile-rich outer regions?

6. **Century-scale security model:** What constitutes an "authorized receiver" in a civilization-scale distributed OS operating over centuries? How are cryptographic keys rotated, revoked, and audited across 10⁸+ nodes with light-hour communication delays, and how does the governance model prevent slow-onset compromise?

---

## Recommended Approach

1. **Adopt relay-staged optical power corridors as the baseline architecture**, with hops of 0.2–1 AU co-located with optical communications relay infrastructure (bom-3-2) to share pointing, metrology, and aperture assets. Reserve direct long-range beaming (>2 AU single hop) only for emergency restoration or dedicated high-priority foundry supply lines where relay infrastructure is not yet deployed.

2. **Implement beam safety as a first-class hardware requirement, not a software feature.** Mandate receiver-authenticated pilot beam interlocks with <10 ms hardware abort, minimum divergence floors at all non-receiver distances, and multi-party quorum authorization for any beam exceeding 100 MW. Log all power transfers to an auditable distributed ledger.

3. **Standardize a small family of Power Interface Units (PIUs)** — tile-class (0.5–10 kW), relay-class (1–50 kW), foundry-substation-class (10–200 MW), and cryo-class (10 kW–10 MW) — as the universal "power appliance" across all layers. Enforce a common "Power API" of HVDC bus voltages (±10 kV / ±20 kV / ±50 kV selectable per layer) and local DC rails (48 V / 400 V / 1 kV) to enable swarm-wide interoperability while permitting per-layer optimization.

4. **Size the initial ILPDN deployment conservatively for foundry bootstrapping, blackstart resilience, and cryogenic prototype support** (targeting ~1–5% of local layer power), then scale capacity in lockstep with validated outer-shell compute demand and foundry throughput. Avoid building speculative GW-class infrastructure ahead of proven load.

5. **Exploit cryogenic synergy on outer layers** by deploying MgB₂ or REBCO superconducting HVDC backbones where ambient temperatures are passively below Tc, but limit physical cable runs to intra-cell distances (1–10 km) with aggressive segmentation. Use short-hop optical or inductive transfer between cells to avoid cable dynamics problems from Keplerian shear.

6. **Include microwave beaming (5.8 GHz or 35 GHz) as a formally supported degraded-mode capability**, particularly for early deployment phases before high-efficiency laser/LPV manufacturing reaches scale, and as a fallback when optical paths are compromised by dust accumulation or component degradation. Accept the lower 10–25% efficiency as the cost of robustness.

7. **Validate the architecture through a phased demonstration campaign:** 10–100 kW optical power links at 10⁴–10⁶ km range during late Phase 2, then 10 MW-class relay-staged corridors powering the first seed foundry at the Layer 4 construction site, scaling to full constellation deployment in parallel with shell construction over a 15–50 year build-out timeline.