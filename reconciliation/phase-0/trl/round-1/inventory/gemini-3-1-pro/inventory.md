---
step: inventory
item: inventory
modelId: gemini-3-1-pro
modelName: "Gemini 3.1 Pro"
endpoint: databricks-gemini-3-1-pro
generated: 2026-10-12T23:50:35.334Z
seconds: 21.905
---

```yaml
technologies:
  - id: T01
    action: keep
    technology: MW-class solar electric propulsion cluster (thrusters, PPU, propellant feed)
    required: 1.0–2.5 MWe per tug; Isp 2,000–3,000 s; total-impulse duty 20,000–40,000 h; iodine or argon
    phase_need: 0B
    legacy: solar-electric-propulsion
    rqs: [rq-0-16, rq-0-54, rq-0-53, rq-0-19, rq-0-20]
    reason: Directly matches the revised cargo tug propulsion requirements for Phase 0B.
  - id: T02
    action: keep
    technology: MW-scale deployable solar arrays
    required: 1–2.5 MWe per tug and 2.5–8 MW per site, sized at 1.2 AU and end of life; 10–15 yr
    phase_need: 0B
    legacy: null
    rqs: [rq-0-21, rq-0-22, rq-0-25]
    reason: Required for both tug and site power at the specified scale.
  - id: T03
    action: keep
    technology: MW-class waste-heat rejection
    required: 1–9 MWth at the plant (300–600 K); 50–800 kWth per tug
    phase_need: 0B
    legacy: null
    rqs: []
    reason: Necessary to reject heat from MW-class power and processing systems in vacuum.
  - id: T04
    action: keep
    technology: Asteroid excavation with anchoring (counter-rotating bucket wheel or alternative)
    required: 0.5–5 t/h per machine, 9–25% duty, torque reaction, ≥5 yr on abrasive charged regolith
    phase_need: 0B
    legacy: asteroid-mining-bucket-wheel
    rqs: [rq-0-6, rq-0-7, rq-0-26, rq-0-39, rq-0-42]
    reason: Core mining capability sized to the revised multi-robot architecture.
  - id: T05
    action: keep
    technology: Microgravity beneficiation of native Fe-Ni (magnetic and size separation)
    required: concentration 4–15:1 at representative feed, 2–8 kt/yr concentrate
    phase_need: 0B
    legacy: null
    rqs: [rq-0-51, rq-0-10]
    reason: Required for the primary processing step at the NEA before refining.
  - id: T06
    action: keep
    technology: No-melt Fe-Ni refining in microgravity (carbonyl or H₂ reduction), with reagent recycling
    required: 0.6–2.5 kt/yr product; reagent make-up imported
    phase_need: 0B
    legacy: microgravity-metallurgy
    rqs: [rq-0-56, rq-0-13]
    reason: One of the three contested metallurgy routes requiring separate rating.
  - id: T07
    action: keep
    technology: Partial-gravity (0.05–0.15 g) melting and slag/metal separation in a rotating module
    required: 1–10 t batches; rotating radius 5–20 m at 1.5–4 rpm
    phase_need: 0B
    legacy: microgravity-metallurgy
    rqs: [rq-0-11, rq-0-12, rq-0-13]
    reason: The second contested metallurgy route (smelting) requiring separate rating.
  - id: T08
    action: keep
    technology: Particle containment and tailings management at the mining site
    required: escape ≤1 t/yr per site interim; tailings 13–47 kt/yr
    phase_need: 0B
    legacy: null
    rqs: [rq-0-41, rq-0-9]
    reason: Critical for meeting the ALARP debris ceiling and managing large tailings volumes.
  - id: T09
    action: keep
    technology: High-voltage power tethers and site power distribution on regolith
    required: 1–3 kV, tens to hundreds of kW per robot circuit, abrasive charged dust, thermal cycling
    phase_need: 0B
    legacy: null
    rqs: [rq-0-60]
    reason: Required to power the tethered mining robots from the central site power.
  - id: T10
    action: keep
    technology: Long-duration autonomy for unattended mining and processing
    required: ≥90 days unattended, fault detection and recovery, 1–25 min light-time
    phase_need: 0B
    legacy: null
    rqs: [rq-0-42, rq-0-8]
    reason: Essential for uncrewed operations with significant communication latency.
  - id: T11
    action: keep
    technology: Asteroid rendezvous scouts with subsurface sampling
    required: 4–10 scouts of 200–600 kg, 1–3 targets each, sampling at depth for bulk grade
    phase_need: 0A
    legacy: autonomous-asteroid-prospecting
    rqs: [rq-0-50, rq-0-1, rq-0-2, rq-0-3, rq-0-5, rq-0-39]
    reason: Core requirement for Phase 0A research and survey operations.
  - id: T12
    action: keep
    technology: Handling, docking and transfer of 150–300 t cargo payloads
    required: autonomous capture and transfer at the site and the delivery node (SEL1)
    phase_need: 0B
    legacy: null
    rqs: [rq-0-17]
    reason: Required for product shipment and tug turnaround operations.
  - id: T13
    action: keep
    technology: Asteroid water extraction pilot
    required: 10–100 t/yr, only at a C-type target
    phase_need: 0B
    legacy: isru-water-extraction
    rqs: [rq-0-27, rq-0-33, rq-0-40, rq-0-55]
    reason: Retained as a pilot program per the revised architecture.
  - id: T14
    action: add
    technology: Distributed MWh-class energy storage
    required: 0.5–15 MWh distributed battery banks, vacuum and thermal cycling at 0.9–1.3 AU
    phase_need: 0B
    legacy: null
    rqs: []
    reason: Added to address the revised architecture's shift from a 200-500 MWh bank to distributed 0.5-15 MWh storage.
  - id: T15
    action: add
    technology: Native-metal production/consolidation in rotating modules
    required: 0.6–2.5 kt/yr product, narrow native-metal consolidation in 0.05-0.15g
    phase_need: 0B
    legacy: microgravity-metallurgy
    rqs: [rq-0-11, rq-0-13]
    reason: The third contested metallurgy route (GPT hypothesis) requiring separate rating per instructions.
deferred_ok: true
deferred_notes: All legacy deferred technologies (LOX/LH2 cryocoolers, sunshields, MLI, industrial electrolysis, solar-grade Si) correctly align with the revised Phase 0 architecture which removes cryogenic depots and defers silicon/aluminum production.
```
