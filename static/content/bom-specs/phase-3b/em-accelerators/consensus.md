---
bomId: "bom-3b-6"
itemName: "Electromagnetic Accelerators"
itemSlug: "em-accelerators"
type: "consensus"
generated: "2026-02-07"
phase: "phase-3b"
---



# Electromagnetic Accelerators (BOM-3b-6) — Consensus Synthesis Document

## Phase 3b: Caplan Stellar Engine

---

## Key Specifications

- **Dual-stream architecture**: All models agree the EMA system must handle two distinct mass streams — a hydrogen return jet directed sunward and a helium exhaust jet directed anti-sunward — with fundamentally different velocity and power requirements.

- **Helium exhaust velocity target**: All models converge on **~0.01c (3,000 km/s)** as the design exhaust velocity for the helium thrust stream.

- **Hydrogen return velocity**: All models agree the hydrogen return stream operates at significantly lower velocity (~0.005c or less), with consensus that minimizing return energy expenditure is critical to system efficiency.

- **Staged acceleration**: All models specify a multi-stage acceleration architecture — no single mechanism can efficiently span from thermal plasma velocities (~10 km/s) to 0.01c. Stages include MHD/inductive pre-acceleration, linear induction main acceleration, and magnetic nozzle final shaping.

- **Superconducting magnets**: All models specify high-temperature superconductors (HTS, REBCO-class or advanced derivatives) operating at peak fields of **50–100 T**, with active cryogenic cooling required given the near-solar thermal environment.

- **Distributed/modular architecture**: All models reject monolithic accelerator designs in favor of large numbers of independent, replicated units — enabling graceful degradation, thrust vectoring, and tractable manufacturing.

- **Total system power**: All models place the EMA electrical power requirement in the range of **10²¹–10²⁷ W** depending on mass flow rate and operating point, representing a fraction of solar luminosity accessible via the Phase 2 Dyson swarm (with higher acceleration targets requiring supplemental fusion power from BOM-3b-7).

- **Waste heat / thermal management as dominant design driver**: All models identify radiator area as a critical constraint, with consensus that **high-temperature radiators (1,500–5,000 K)** and/or **liquid droplet radiators** are required to keep radiator area manageable.

- **Beam collimation requirement**: All models specify tight exhaust jet divergence — **< 1–3° half-angle** — to avoid intercepting Dyson swarm elements and to maximize long-range momentum transfer efficiency.

- **Plasma (not solid projectile) acceleration**: All models agree the mass flow rates demand bulk plasma acceleration using MHD and electromagnetic induction principles, not particle-beam or railgun approaches.

---

## Divergent Views

- **Number and size of accelerator units**: Claude recommends ~100,000 units each ~500 km long and ~4×10¹⁴ kg; Gemini prefers 10⁹ smaller units each 50 km long and ~5×10⁹ kg; GPT suggests a hierarchical approach with 1,000–10,000 "macro-strings" each bundling 100–1,000 parallel beam channels over ~200 km, with individual tiles of ~1.5×10⁸ kg. The optimal granularity remains unresolved.

- **Total system mass**: Claude estimates ~4×10¹⁹ kg (~7 Earth masses); Gemini estimates ~5×10¹⁸ kg (~1 Earth mass); GPT estimates ~1.5×10¹⁴ kg per string scaling to ~10¹⁴–10¹⁸ kg total depending on replication count. The order-of-magnitude disagreement stems directly from differing assumptions about mass flow rate and unit count.

- **Primary power source for full-capability operation**: Claude concludes that achieving 10⁻⁹ m/s² stellar acceleration requires power exceeding solar luminosity, necessitating fusion-powered thermonuclear jet engines (BOM-3b-7) as the primary energy source with EMAs serving as beam shapers; Gemini sizes the system at ~1.2% of solar luminosity (4.5×10²¹ W) powered entirely by the Dyson swarm; GPT sizes at ~4.5×10²¹ W for an initial design point but acknowledges scaling to full Caplan-class requires fusion supplementation.

- **Hydrogen return strategy**: Claude specifies electromagnetic acceleration of hydrogen to 0.005c (1,500 km/s) as a full jet impacting the Sun; Gemini proposes antiparallel dual-bore units where hydrogen return balances helium exhaust momentum locally; GPT recommends a minimal-energy "magnetically guided fall line" conveyor approach, accelerating hydrogen only enough to overcome local pressure gradients, explicitly arguing against wasting energy on high-velocity hydrogen return.

- **Beam neutralization**: GPT explicitly specifies electron injection to neutralize the helium ion beam before long free-flight to mitigate space-charge divergence, treating this as a critical subsystem; Claude and Gemini do not address neutralization as a distinct design element, implicitly assuming magnetically confined plasma jets remain coherent without neutralization.

- **Manufacturing source material**: Claude sources material primarily from asteroid belt mining (~1% of belt mass); Gemini specifies partial disassembly of Mercury (~0.01% of crust); GPT assumes inner-belt/Mercury industrial nodes from Phase 2 without committing to a single source body.

---

## Open Questions

1. **Plasma stability at megastructure scale**: All three models identify MHD instabilities (kink, sausage, Rayleigh-Taylor, firehose) as the highest technical risk. No validated physics models exist for plasma confinement and acceleration in km-bore, 50–100 T channels at 10³–10⁷ kg/s mass flow. Claude and GPT both flag this as potentially requiring centuries of incremental scaling experiments before full deployment.

2. **Magnetic nozzle plasma detachment physics**: Claude and GPT identify the transition from magnetically guided plasma to free-streaming jet as a fundamental unsolved problem, particularly at mildly relativistic velocities (0.01c) where standard MHD breaks down. Detachment efficiency directly determines thrust efficiency and beam divergence.

3. **Hydrogen return jet interaction with the solar atmosphere**: All models raise the question of what happens when a high-velocity plasma jet impacts the Sun's chromosphere/photosphere — whether it penetrates, creates destructive shocks, disrupts mass lifting operations nearby, or radiates away its energy before reaching useful depth. Claude and Gemini both flag this "back-splash" problem explicitly.

4. **Optimal exhaust velocity vs. mass flow trade-off under radiator area constraints**: GPT frames this most explicitly — when power is abundant but radiator area is the binding constraint, the system-level optimum for v_e and ṁ may differ significantly from the canonical 0.01c. This is a coupled optimization across EMAs, thermonuclear engines, separation plants, and thermal management that no model fully resolves.

5. **Superconductor survival and cryogenic feasibility at 3–10 solar radii**: Claude notes ambient radiation temperatures of 1,000–2,000 K at operational orbits, requiring aggressive thermal shielding to maintain superconductors at 20–50 K. The mass and power penalty for cryogenic systems in this environment is unquantified and could be design-limiting.

6. **Bootstrapping sequence**: Claude raises the circular dependency — EMAs require materials from solar mass lifting, which requires EMAs to operate. Defining the minimum viable seed system that can self-bootstrap to full capability is an unsolved systems engineering problem.

---

## Recommended Approach

1. **Adopt a hierarchical modular architecture** combining elements from all three models: build "macro-strings" (GPT's concept) of ~200–500 km length, each containing bundled parallel beam channels, with ~10,000–100,000 macro-strings comprising the full array. This balances Claude's emphasis on per-unit capability with Gemini's and GPT's emphasis on replication and resilience, while keeping the number of independent free-flying objects manageable for formation control.

2. **Begin at a conservative operating point of ~10⁻¹¹ to 10⁻¹² m/s² stellar acceleration**, powered by the Dyson swarm alone at ~0.1–1% of solar luminosity (per Claude's and GPT's phased approach). Defer the full 10⁻⁹ m/s² Caplan target until thermonuclear jet engines (BOM-3b-7) are proven and integrated. This reduces initial EMA power requirements by 2–3 orders of magnitude and makes thermal management tractable.

3. **Prioritize the three-stage acceleration chain** — MHD pre-acceleration (0→100 km/s), linear induction main acceleration (100→1,000 km/s), and magnetic nozzle final acceleration/collimation (1,000→3,000 km/s) — as the baseline architecture. Invest heavily in plasma stability research at each stage boundary, scaling bore diameter incrementally from 1 m → 10 m → 100 m → 1 km prototypes before committing to full-scale manufacturing.

4. **Minimize hydrogen return velocity** following GPT's "mass conveyor" philosophy rather than Claude's and Gemini's high-velocity jet approach. Design the hydrogen return path as a magnetically guided low-energy conveyor (50–300 km/s), reserving high-velocity acceleration energy exclusively for the helium exhaust stream. This dramatically reduces total system power and radiator requirements.

5. **Mandate high-temperature radiator development (1,500–2,000 K minimum operating temperature)** as a critical-path technology gate, supplemented by liquid droplet radiator systems (Claude's recommendation) for bulk waste heat. All models agree thermal management is the binding constraint; radiator technology readiness directly determines achievable per-unit power and therefore total system scale.

6. **Co-develop EMAs with thermonuclear jet engines (BOM-3b-7) from the outset**, as Claude strongly recommends. The interface between fusion exhaust and electromagnetic beam shaping is a critical integration point — the EMA system must be designed to operate both as a standalone cold-plasma accelerator (initial capability) and as a beam shaper/final-stage accelerator for hot fusion exhaust (full capability). Deferring this integration risks fundamental architecture incompatibility.

7. **Implement beam neutralization (GPT's recommendation) as a baseline subsystem** for the helium exhaust path. Electron injection before long free-flight mitigates space-charge-driven divergence and is likely essential for maintaining the <1–3° collimation requirement over astronomical distances. Design the neutralization system as a modular, replaceable element at the exit of each macro-string's magnetic nozzle.

---

*Synthesized from three independent technical analyses for Project Dyson Phase 3b Technical Review*
*Document: BOM-3b-6-CONSENSUS-v1.0*