---
bomId: "bom-0-13"
itemName: "Phase 1 Receiving Node (SEL1)"
itemSlug: "receiving-node"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

## Key Specifications

- **Function is logistics only, never processing.** All three models define the node as an uncrewed "warehouse" or "terminal." It does custody transfer, inventory buffering, inspection and handoff to Phase 1. It does not melt, refine, beneficiate, produce cryogenic propellant, or host crew. Claude and GPT explicitly reject a human-rating label; they specify structural reserve and docking/servicing interfaces instead.
- **Orbit.** The node flies an SEL1 halo (GPT also allows Lissajous), not a fixed point. SEL1 is treated as unstable and is held only as the D-04 reference case, to be re-decided with Phase 1 at KDP-0B.
- **Autonomy.** One-way light time is about 5 s. All contact operations (capture, latching, cargo moves) therefore run under onboard autonomy. Ground authorises bounded activities at hold points.
- **Throughput.** The design envelope is up to **2.5 kt/yr** of native/reduced Fe-Ni:
  - Claude: 0.6–2.5 kt/yr, central 1.3.
  - Gemini: 1.0–2.5 kt/yr.
  - GPT: 0.6–2.5 kt/yr envelope, about 1 kt/yr nominal.
  
  Claude and GPT both derive about **2–17 tug arrivals per year** from 150–300 t loads.
- **Power is tens of kilowatts, not megawatts.** The range is **60–150 kW**: Claude 60 kWe BOL, Gemini 75 kW EOL, GPT 100–150 kW BOL. The node does not power visiting MW-class tugs.
- **Physical layout.**
  - A central truss or spine of **20–35 m** (Claude 30 m, Gemini 20 m, GPT 20–35 m).
  - Separate inbound (Phase 0 tug) and outbound (Phase 1) berthing positions.
  - At least two robotic handling systems: a rail transporter and/or arms.
- **Station-keeping propulsion.** Electric propulsion per D-05, with iodine costed as reference and argon as alternate. No irreversible propellant selection is made.
- **Phasing.** No flight hardware is procured in 0A. 0A covers interfaces, product specification, dynamics modelling and breadboards at TRL 4–5. Hardware is built in 0B, gated at KDP-0B.
- **Cost accounting.** Node cost falls within or near the round-2 **$200–600M** envelope. Launch, operations and spares belong to bom-0-8, bom-0-10 and bom-0-14 respectively. Claude and GPT both stress that launch (about **$70–300M** across the models) is comparable to node hardware and must be visible at KDP-0B.

## Divergent Views

- **Inventory capacity and handling unit**:
  - Claude recommends a **3.0 kt** buffer: 20 whole-berthed 150 t pallets of about 1 t billets, expandable to 6 kt only by gate. This sizing covers a one-year Phase 1 slip.
  - Gemini prefers a **600 t** buffer (3–6 months) handled as standardised **5 t hexagonal cassettes**.
  - GPT suggests **600 t** (growth to 900 t) handled as **5–20 t units** on a rail carriage.
- **Cost and its basis**:
  - Claude recommends a bottom-up estimate excluding launch:
    - 0A: **$5–12M** in this item (plus $5–12M of breadboards in bom-0-11).
    - 0B: **$160–380M**, central $250M.
    - Claude rejects the upper half of the round-2 range as Tier 2 "active hub" scope.
  - Gemini prefers to keep the round-2 $200–600M range:
    - 0A: $35–60M.
    - 0B: $250–450M, including $70–150M launch.
  - GPT suggests a procurement range excluding launch:
    - 0B: **$300–550M**, calling $200M optimistic for first-of-kind heavy-cargo handling.
    - 0A: $15–35M, charged to bom-0-11 and bom-0-12.
- **Station-keeping Δv and Earth-safety design driver**:
  - Claude recommends **3 m/s/yr nominal and 10 m/s/yr design**. It adds biased station-keeping so that loss of control departs sunward, plus an independent Dead-man Disposal Unit.
    - Claude's interim ceiling is P(Earth-intersecting departure) ≤ 10⁻⁴.
    - It treats Earth-impact safety as a licence-ending technology.
  - Gemini prefers about **50 m/s/yr**, with redundant thrusters and generous reserves as the main safety measure.
  - GPT suggests **5–20 m/s/yr** for station-keeping within a **30–60 m/s/yr** total budget. GPT's safety emphasis is debris containment (≤10⁻⁶ of handled mass escaping) and tugs able to wait 30–90 days if acceptance is delayed.
- **Propellant role for tugs**:
  - Claude recommends **sealed propellant-module swap berths** with no fluid transfer, costing +$8–20M.
  - Gemini prefers an active **fluid-transfer EP depot** to maximise tug payload fraction.
  - GPT suggests **no depot function**: the tug remains self-sufficient.
- **Capture method**:
  - Claude recommends the tug performs autonomous hard docking to a 400 t-class Large Berthing Interface at ≤3 cm/s, then nulls the stack's rotation rates.
  - Gemini prefers that the tug holds at **50 m** while the node's arms grapple and berth it, ISS Dragon/Cygnus-style.
  - GPT suggests capturing a standardised transport fixture at ≤0.02 m/s, using a separate structural latch for storage.
- **Mass, power and communications sizing**:

  | Model | Dry mass | Power | Battery | Comms baseline |
  |---|---|---|---|---|
  | Claude | 21–35 t | 60 kWe BOL | 30 kWh | X-band ≥10 Mbps; Ka rejected (Sun-proximity geometry) |
  | Gemini | 45–65 t | 75 kW EOL | Not stated | Ka-band |
  | GPT | 25–40 t | 100–150 kW BOL | 100–250 kWh | RF baseline, optical as supplement; 10–50 Mbps event downlink |

## Open Questions

1. **Passive Earth-impact safety of a multi-kiloton iron stockpile.**
   - What does biased station-keeping actually cost in Δv?
   - What probability of sunward departure is achievable?
   - Do interior-branch departures re-encounter Earth within 100 years?
   - Can SEL1 be licensed at all, compared with the lunar DRO alternate Claude proposes?
2. **Phase 1 product form and specification.** Phase 1 might consume billets, plate, bar, wire or finished members. The answer sets the handling unit (1 t, 5–20 t, or 150 t pallet), the robotics and the end-effectors. The S, P, C and O limits also need agreeing; Claude's FN-A/FN-B strawman is a starting point.
3. **What "acceptance" means.** Options include certificate-led acceptance, in-situ LIBS/XRF/EMAT verification, mass determination, or successful downstream fabrication. A related question is whether C and O can be measured in vacuum to the required limits.
4. **Economic buffer size and ownership.**
   - How much inventory has value: 600 t or 3 kt?
   - Who owns the cargo carriers (tug-retained, node-retained or circulating)?
   - Will Phase 1 accept title at acceptance and an end-of-life obligation to consume or relocate inventory?
5. **Heliophysics and plume contamination.** Iodine or argon pickup ions could affect operational L1 space-weather and science missions. Iodine could also deposit on optics and latches. Which separation, cone and plume rules are sufficient?
6. **Relevant-environment qualification for high-mass capture.** It is unclear how to reach TRL 6 for capturing and moving 150–400 t through flexible structures when ground tests cannot reproduce full-scale inertia. Options include hardware-in-the-loop rigs, subscale flight tests and incremental certification.

## Recommended Approach

1. **Baseline a passive, uncrewed warehouse (Claude's "Tier 1").**
   - Quantity is **0–1**. The tier is chosen explicitly at KDP-0B.
   - Direct tug-to-Phase 1 handover is the fallback (Claude's Tier 0, GPT's contingency handoff).
   - Exclude any active hub: no tug servicing, no fluid transfer, no power export.
   - Optional sealed propellant-module berths are carried as a costed option pending the bom-0-16 logistics study, not as a fluid depot.
2. **Freeze a common cargo interface across bom-0-3, bom-0-4, the node and Phase 1 before tug and processor design freeze.**
   - Capture a standardised fixture or reusable interface plate, never the product surface.
   - Store on separate preloaded, two-fault-tolerant latches.
   - Defer the handling-unit choice (150 t pallet versus 5–20 t units) to a 0A trade tied to a signed Phase 1 product specification. That specification is an entry criterion for node authority to proceed (ATP).
3. **Size inventory by signed demand and grow by berths.**
   - Initial installed capacity: about **0.6–1.0 kt**.
   - Structural provision to grow toward **3 kt**, released only by gate.
   - Contractual controls in bom-0-7: a Phase 0 throttle and a 30–90 day tug delayed-acceptance capability.
4. **Make Earth-impact safety the design driver and the only licence-ending critical technology.**
   - Adopt biased station-keeping plus an independent disposal unit.
   - Set interim D-03 ceilings: P(Earth-intersecting departure) ≤10⁻⁴, disposal availability ≥99.9%, and escaped solids ≤10⁻⁶ of handled mass.
   - Require two-person authorisation for release or orbit-change commands.
   - Fund independent analysis in 0A. Carry lunar DRO as the formal D-04 alternate.
5. **Size subsystems conservatively but small.**
   - Dry mass: **25–40 t**. Gemini's 45–65 t should be justified or rejected at mass-design review.
   - Power: **60–100 kW BOL**, with about 30–250 kWh of safe-mode battery.
   - Station-keeping budget: **10–20 m/s/yr design**, plus a separate disposal and avoidance reserve. Gemini's 50 m/s/yr is to be reconciled by integrated trajectory analysis.
   - Hall thrusters for station-keeping: iodine as reference, argon as alternate. Record Claude's contamination argument for argon in D-05.
   - Communications: X-band RF at ≥10 Mbps, with an S/UHF proximity link.
6. **Replace the round-2 $200–600M figure with explicitly scoped lines.**
   - 0A: **$5–15M** in bom-0-13, plus $15–35M of node risk reduction in bom-0-11 and bom-0-12.
   - 0B hardware, development and integration and test, **excluding launch**: **$160–550M**, planning value about **$300M**.
   - Launch: **$90–300M** in bom-0-8.
   - Contingency: 35–40% in bom-0-17.
   - Present a node life-cycle cost of about **$350–900M** at KDP-0B so that launch and operations are not hidden. Confidence is low.
7. **Run heliophysics coordination and plume rules from 0A.** Engage NOAA, NASA, ESA and ISRO. Proposed rules:
   - ≥10,000 km separation from other spacecraft.
   - No EP firing within a 2° downstream cone of any operational spacecraft.
   - Plume keep-outs for both the node and tug terminal approaches.
   
   Treat these as inputs to the licence gate and to the D-04 location re-decision.