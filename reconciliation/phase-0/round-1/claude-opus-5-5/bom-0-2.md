---
phase: phase-0
item: bom-0-2
round: 1
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: 8607ae186f99
priorRound: null
generated: 2026-10-11T21:40:12.523Z
seconds: 1337.216
---

# bom-0-2 Mining Robots: Re-assessment

## Summary

- **Mining rate (P0-F02).** The robot specification does not close internally. The excavator rate, the annual target and the station capacity are each based on a different, unstated duty cycle.
- **Power and mass (P0-F07).** The 20–50 kW excavation power is overstated by roughly 3–10×, and the reaction-torque figure in rq-0-26 is low by one to two orders of magnitude.
- **Anchoring is the real limit.** Anchoring capacity on a rubble-pile surface, not the torque balance, sets the excavation rate.
- **Debris and contamination (P0-F14).** These are unbudgeted. The tailings from ISPP are a much larger debris source than fugitive excavator dust.
- **Cost.** The $1B line understates the item, and launch and delivery to the asteroid are not on any BOM line.

---

## 1. Findings

### P0-F02: Mining rate, robot target and station throughput disagree

**Verdict: agree.** I also disagree with the implied fix of simply choosing one of the existing numbers. None of the three numbers was derived from a duty cycle, so I rebuild the chain from that.

**The inconsistency.**

- 2–5 t/h × 8,766 h/yr = 17.5–43.8 kt/yr per robot if digging is continuous.
- Hitting the 1,000 t/yr target at that rate implies a duty cycle of only 2.3–5.7%.
- The rq-0-26 design life (20,000 h over 5 yr = 4,000 h/yr, i.e. 46%) implies 8–20 kt/yr per robot.
- So the same document carries three mutually incompatible duty cycles.

**Duty cycle, built up.** The target bodies are Bennu- or Ryugu-class rubble piles, with rotation periods of 4.3 h and 7.6 h.

| Loss factor | Basis | Remaining fraction |
|---|---|---|
| Daylight-only digging (recommended, see P0-F07) | Half of each rotation | ≤ 50% |
| Traverse, re-anchoring, canister hand-off, comms or ground holds, maintenance and safing | Judgement | 35–60% of daylight hours |
| **Digging hours** | 8,766 h × 0.5 × (0.35–0.60) | **1,500–2,600 h/yr (17–30% of calendar time)** |
| Average achieved fraction of nameplate | Clasts, voids, anchor resets | 0.5–0.8 |
| Fleet availability over 5 years | Failures and attrition | 70–90% |

The nameplate rate is revised to 1–3 t/h; see P0-F07 for why.

**Per-robot output:**

- (1–3 t/h) × (1,500–2,600 h) × (0.5–0.8) = 0.75–6.2 kt/yr.
- Planning range: **1–5 kt/yr per robot**.
- Central case: 2 t/h × 2,200 h × 0.65 ≈ **2.9 kt/yr**.

**Fleet output:**

- 20 robots × 0.8 availability × 2.9 kt/yr ≈ **46 kt/yr** central.
- Planning range: **20–60 kt/yr**.

This central case matches the 50 kt/yr station nameplate. That match only matters if the station can actually receive the material, which depends on where it is.

**Concentration ratio.**

On-robot concentration should be minimal for C-type feed. I side with GPT's position here.

- Water is held in phyllosilicates distributed through the matrix. It is not concentrated in a separable phase.
- Magnetic or electrostatic separation on the robot removes only magnetite and sulfide, at a few weight percent. That is not worth the mass, power and dust exposure on a mobile unit.
- On-robot step: reject oversize clasts above about 5 cm only.
- On-robot concentration ratio: **1.0–1.2 : 1** by mass.

For metal-bearing ordinary-chondrite or S-type feed, magnetic separation of free FeNi metal (5–20 wt% of the rock) gives a 5–20 : 1 ratio. That step belongs at the hub on dried residue, not on the robot.

**Consistent mass-flow chain.** Baseline: C-type body, ISPP hub and processing station co-located with the mining site.

| Stage | t/yr (central) | Range | Notes |
|---|---|---|---|
| Excavated (run-of-mine) | 46 kt | 20–60 kt | 20 robots, as above |
| Oversize rejected at face | ~5 kt | 0–10 kt | This is tailings and needs a disposal plan (P0-F14) |
| Delivered to ISPP hub (bom-0-6) | 41 kt | 18–55 kt | Moved in sealed canisters, not by direct coupling (§4) |
| Water product | 2–4 kt | 1–5 kt | 5–10 wt% recoverable water (CM–CI) |
| Dried residue to station (bom-0-3) | 37–39 kt | 16–52 kt | Within the 50 kt/yr nameplate |
| Station products | 2–8 kt | — | Defined by bom-0-3; e.g. a metal fraction of 5–20% |
| Transported off-site (bom-0-4) | 3–10 kt | 2–12 kt | Water/propellant net of local use, plus refined product |

Two consequences follow.

- **If the station is remote** from the mining body, transport must move 20–55 kt/yr. That is 20–50× the ~1 kt/yr implied for the current transport fleet (P0-F01).
- **Even co-located,** transport needs about 3–10 kt/yr, which is still 3–10× short.

**Proposed change.**

1. Adopt the chain above and state the duty-cycle assumptions explicitly.
2. Replace "1,000+ t/robot/yr" with "1–5 kt/robot/yr at 1–3 t/h nameplate and 1,500–2,600 dig-h/yr".
3. Require bom-0-3 to declare its location relative to the mining body.
4. Hand the transport shortfall to the P0-F01 owner.

---

### P0-F07: Robot mass and power are internally inconsistent

**Verdict: partly agree.** The mass inconsistency is real. On power, the finding accepted the 20–50 kW figure, which I think is the actual error.

**(a) Excavation power is overstated.**

Specific excavation energy, from published ranges:

- Terrestrial bucket-wheel excavators in soil: about 0.2–1 kWh/m³ for the whole machine. As a reference point, Bagger 288 moves ~10,000 m³/h with ~16 MW installed.
- Roadheaders in 20–100 MPa rock: 5–30 kWh/m³.
- Asteroid material is weak:
  - Ryugu boulder tensile strength is about 0.2–0.3 MPa (Grott et al., 2019, *Nature Astronomy*).
  - Bennu's surface regolith has near-zero cohesion; the OSIRIS-REx TAG event met almost no resistance (Walsh et al., 2022, *Science Advances*; Lauretta et al., 2022, *Science*).

My estimate for specific energy:

| Material | Specific energy |
|---|---|
| Loose regolith | ~0.1–0.5 kWh/t |
| Weak consolidated boulders and matrix | ~0.5–4 kWh/t |

At 1–3 t/h this gives **0.1–12 kW mechanical**. A planning value of **2–10 kW** covers loose material through weak boulders.

The 20–50 kW figure is only justified for intact strong rock. Bucket wheels should not be attempting that material in any case.

**(b) The rq-0-26 torque number is wrong, and the error matters for anchoring.**

- Torque = P/ω. A bucket wheel turns at roughly 10–30 rpm, i.e. ω ≈ 1–3 rad/s.
  - At 10 kW: ~3–10 kN·m.
  - At 2–10 kW: **~1–10 kN·m per wheel**.
- The stated 50–200 N·m at 10 kW implies ω = 50–200 rad/s, or 500–1,900 rpm. That is not a bucket wheel.
- Counter-rotation remains correct, and is actually more necessary than stated:
  - Residual net torque at 5–10% is **0.1–1 kN·m**.
  - The 15–25 kg mass for the second wheel is not credible. A gearbox for kN·m output torque is roughly 50–150 kg per wheel, based on harmonic-drive torque density of ~50–100 N·m/kg.
  - Revised excavation subsystem mass: **150–300 kg** (previously 60–80 kg).

**(c) Counter-rotation cancels torque, not thrust.**

- The crowd (penetration) reaction does not cancel between the wheels. Estimate it at 0.2–1× the tangential cutting force.
- Tangential force is F = P/v_tip. For a 1 m wheel at 20 rpm, v_tip ≈ 1 m/s, so 2–10 kW gives **2–10 kN tangential** and **0.4–10 kN normal**.
- Compare the weight available to resist it:
  - A 2,500 kg robot on Bennu (g ≈ 6×10⁻⁵ m/s²) weighs about **0.15 N**.
  - Anchoring must therefore carry the full load.
- Microspine grippers hold on the order of 10²–10³ N each on competent rock (JPL LEMUR / microspine work, Parness et al.). Weak or porous boulders and cohesionless regolith hold far less.
- There is a real trade here:
  - Raising tip speed lowers the reaction force.
  - But it raises ejecta velocity well above the 0.2–0.4 m/s escape velocity of these bodies.

**Conclusion:** anchoring capacity, not power, sets the achievable dig rate. That is why I reduce the nameplate to 1–3 t/h, and why the anchoring trade (rq-0-7) is critical. Robot mass is almost irrelevant to anchoring; it matters only for inertia.

**(d) Robot mass.**

Bottom-up estimate (judgement):

| Subsystem | Mass |
|---|---|
| Legs and structure | 600–900 kg |
| Excavation | 150–300 kg |
| Anchoring | 150–300 kg |
| Arrays | 50–150 kg |
| Battery | 130–350 kg |
| Sealed canister bay (1–2 t payload capacity, empty) | 100–250 kg |
| Avionics and comms | 50–100 kg |
| Thermal | 80–150 kg |
| Margin | 20–25% |
| **Total** | **~1,500–3,000 kg** |

The 500 kg used in the deliberation is simply wrong. It should be replaced throughout rq-0-26. This changes no conclusion, because weight is negligible against the kN-scale loads.

**(e) Where the power comes from.**

- **Revised demand per robot:** 2–10 kW excavation at about 85% drive efficiency, plus 1–3 kW for mobility, anchoring, avionics and thermal. That is **5–15 kW electrical peak**.
- **Own arrays (baseline):**
  - Array output: ~250–300 W/m² at 1 AU and ~150–180 W/m² at 1.3 AU, after cell efficiency, packing and dust derate.
  - Required area: **20–60 m²**, compared with the 150–400 m² in the finding.
  - Digging is daylight-only.
  - Battery of **20–60 kWh** (Li-ion at about 150–200 Wh/kg pack level) covers night-side mobility, survival heat and safing, not digging.
- **Hub recharge (supplement):** robots dock at the ISPP hub, which takes power from bom-0-5, when they drop off canisters.
- **Surface power tether:** rejected. Tangling and snagging on boulder fields, combined with legged mobility, is a reliability risk.
- **Beamed power:** rejected for Phase 0 on maturity grounds.

**Thermal note.** At 2–10 kW, motor waste heat is only 0.3–1.5 kW, so 1–3 m² of radiator suffices.

Heat deposited into the regolith is about (3–10 kWh)/(3 t) ≈ 4–12 kJ/kg, giving **ΔT ≈ 5–15 K**. Phyllosilicates are stable to above 300 °C, and free ice is not expected on NEAs. The "excavation heat drives off volatiles" concern in rq-0-26 is therefore negligible. I would downgrade it from a requirement to a verification item.

---

### P0-F14: Debris, contamination and regulatory compliance are unbudgeted

**Verdict: agree.** I would extend the finding in two ways.

**(1) The ">99% mass containment" metric is the wrong metric.**

- At 46 kt/yr, 1% is ~460 t/yr fugitive, and 0.5% is ~230 t/yr.
- Most fugitive grains leave at well under escape velocity. Bennu's escape velocity is ~0.2 m/s and Ryugu's ~0.37 m/s, so most of this material falls back.
- What matters is:
  - mass actually escaping into heliocentric co-orbit around the site, and
  - deposition flux onto arrays, radiators and optics.

**(2) Tailings are the larger debris source.**

- Rejected oversize is 0–10 kt/yr.
- If bom-0-3 does not consume all the dried residue, up to ~40 kt/yr of spent material sits at the hub.
- Loose spent fines on a body with Pa-level cohesion are a far bigger debris source than excavator leakage.

**Proposed limits.** These are initial values set by judgement, with low confidence, to be replaced by the fleet contamination model.

| Limit | Value |
|---|---|
| On-robot excavation containment | ≥ 99.5% by mass |
| Escaping mass, fleet total (all sources) | ≤ 1–10 t/yr |
| Dust deposition at hub and station | Keeps array degradation ≤ 0.5–1 %/yr |
| Particles > 1 mm on escape trajectories toward co-located assets | None permitted (design intent) |
| Tailings | Contained: bagged, sintered, or returned into excavation pits. No free piles. |

**Mitigation hardware:**

- Enclosed cutting housing with seals.
- Low tip speed, at or below 1 m/s.
- Sealed transfer canisters.
- Electrostatic dust shields on arrays and radiators (NASA KSC EDS heritage).
- Witness plates and QCM dust monitors at the hub.
- Tailings bagging or sintering at the hub.

Cost: about $50–200M for development plus fleet hardware. This is my estimate.

**Who certifies.**

- **Authorizing state.** Under Outer Space Treaty Art. VI, the authorizing state supervises the activity; Art. IX imposes "due regard" and avoidance of harmful contamination. The operating entity (bom-0-7) should therefore be domiciled in a state with a resource-activity authorization regime:
  - Luxembourg, Law of 20 July 2017;
  - Japan, Space Resources Act 2021;
  - UAE, Federal Law 12/2019.
- **United States.** 51 U.S.C. §51303 grants resource rights but there is no mission-authorization process for novel in-space activity yet. That is a gap if US-domiciled.
- **Planetary protection.** COSPAR categories apply: likely Category I–II outbound, and "unrestricted Earth return" for most NEA material.
- **Spectrum.** ITU, through the national administration.
- **Debris guidelines.** IADC guidelines and ISO 24113 are Earth-orbit-centric and do not directly cover small-body surface operations. The project should publish its own small-body contamination standard and have it independently verified.

---

## 2. Revised specification

| Parameter | Old | New (range) | Basis | Confidence |
|---|---|---|---|---|
| Robot dry mass | 2,500–3,500 kg | 1,500–3,000 kg (nominal ~2,200) | Bottom-up estimate | medium-low |
| Deliberation design-basis mass | 500 kg | Same as robot mass | Correction | high |
| Excavation mechanical power | 20–50 kW | 2–10 kW | Specific-energy calculation from literature | medium |
| Robot electrical peak | unspecified | 5–15 kW | Calculation | medium |
| Array area (1–1.3 AU) | unspecified | 20–60 m² | Calculation | medium |
| Battery | unspecified | 20–60 kWh | Calculation | medium |
| Reaction torque per wheel | 50–200 N·m | 1–10 kN·m | P/ω | high |
| Residual net torque | unspecified | 0.1–1 kN·m | 5–10% residual | medium |
| Crowd/thrust reaction to be anchored | unspecified | 0.4–10 kN | P/v_tip × 0.2–1 | low-medium |
| Excavation subsystem mass | 60–80 kg | 150–300 kg | Gearbox torque density | medium-low |
| Nameplate dig rate | 2–5 t/h | 1–3 t/h | Anchoring-limited | low-medium |
| Digging hours | 20,000 h / 5 yr | 1,500–2,600 h/yr (7.5–13 kh over 5 yr) | Duty-cycle build-up | low-medium |
| Output per robot | 1,000+ t/yr | 1–5 kt/yr (central ~3) | Calculation | low-medium |
| Fleet output | ~20 kt/yr | 20–60 kt/yr | Calculation | low-medium |
| On-robot concentration ratio | unspecified | 1.0–1.2 : 1 | Judgement / mineralogy | medium |
| Containment metric | >99% by mass | ≥99.5% by mass, plus ≤1–10 t/yr escaping (fleet) | Judgement | low |
| Excavation heat into regolith | "thermal isolation required" | ΔT 5–15 K; verification item only | Calculation | medium |
| Unit recurring cost | $50M | $35–80M | Analogy (VIPER, Mars rovers, learning curve) | low |
| Item total including NRE | $1.0B | $1.3–2.5B | Judgement | low |

---

## 3. Interfaces

| With | Flow | Value | In BOM? |
|---|---|---|---|
| bom-0-6 ISPP | Mass (regolith in sealed canisters) | 18–55 kt/yr | yes. Scope overlap: bom-0-6 also claims bucket-wheel excavation. |
| bom-0-3 Station | Mass (dried residue, via ISPP) | 16–52 kt/yr | yes, if co-located |
| bom-0-4 Transport | Mass (bulk feed, if station is remote) | 20–55 kt/yr against ~1 kt/yr capacity | **no** |
| bom-0-5 Power | Hub recharge for robots | 0.05–0.3 MW peak | Arrays yes; charging and distribution **no** |
| bom-0-1 Prospecting | Data (site maps, regolith properties) | Required before site selection | yes |
| Relay / site network | Data | 10–100 kbps per robot telemetry; 1–5 Mbps aggregate to Earth | **no** |
| Earth launch and delivery | Mass (robots to target asteroid) | 30–60 t | **no** |
| Propellant (safing / hop cold gas) | Propellant | 10–50 kg per robot; ≤1 t over life | **no** |
| bom-0-7 Organization | Other (authorization and certification) | Licence before operations | Partial |

---

## 4. Missing items or scope

1. **Robot delivery to the target body.** About 30–60 t of landed robots need launch plus SEP cruise and landing. This is $0.5–1.5B (estimate) and is not on any BOM line. bom-0-4 covers only inter-asteroid transport.

2. **Mining robot NRE.** The consensus document says development "may consume $300–400M" inside the $1B. I estimate $400–900M, and it should be a separate line.

3. **Material transfer architecture.**
   - "Direct ISPP coupling, no hoppers" is incompatible with a walking robot, unless the ISPP unit is on the robot. That is impossible at 0.7–1.6 MW thermal for heating 46 kt/yr to 700–1,000 °C, at about 0.25 MWh/t before recuperation.
   - Replace it with sealed 1–2 t canisters shuttled to a hub within about 100–300 m. Accept the duty-cycle cost of shuttling.
   - Resolve the excavation scope overlap between bom-0-2 and bom-0-6.

4. **Surface relay and comms infrastructure.**

5. **Tailings and contamination management**, including monitoring.

6. **Site charging and power distribution.**

7. **Mission operations and ground segment** for 5+ years of autonomous fleet operations.

8. **Spares and attrition replacement.** Planning for a fleet availability of 70–90% implies 2–6 robots lost over the phase.

---

## 5. Remaining disagreements and open questions

- **Anchoring may make bucket wheels the wrong choice for rubble piles.** If reaction loads cannot be anchored in cohesionless material, alternatives may beat bucket wheels:
  - bagging or containment-first methods (e.g. TransAstra-style),
  - scraper and drag-line systems against a fixed anchor,
  - pneumatic methods.

  Reasonable engineers could keep bucket wheels only for boulder-rich sites.

- **Fleet of 20 versus fewer, larger robots.** My chain closes with 20 only because the station is sized at 50 kt/yr. A Phase-0 pilot could justify 6–10 robots if bom-0-3 is resized.

- **Mobility architecture.** The hexapod versus wheels versus hybrid question remains open. Wheels have almost no traction at about 10⁻⁵ g, which favours legs plus anchors, but this is unproven.

- **Day-only operation.** Day-only digging halves the battery mass but caps the duty cycle. Hub-recharge night digging is an alternative.

- **Escape-mass limit.** The 1–10 t/yr limit is a placeholder. The real limit depends on co-orbital dust dynamics and on where assets are located.

- **Remote versus co-located station.** A remote station drives a 20–50× increase in transport capacity.
