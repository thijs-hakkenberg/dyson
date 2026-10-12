---
phase: phase-0
item: bom-0-2
round: 2
type: reassessment
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:14:43.264Z
seconds: 413.125
---

# bom-0-2 Mining Robots: Round 2 Re-assessment

**Reviewer stance.** I checked the three findings and the round-1 reconciliation against first-order physics and the published small-body data. The key data are:

- Ryugu boulder tensile strength of about 200–280 kPa (Grott et al., *Nat. Astron.* 2019).
- The Ryugu SCI crater, which formed in the gravity regime and implies near-surface cohesion of order ≤1 kPa (Arakawa et al., *Science* 2020).
- Bennu TAG penetration, which showed very low near-surface resistance (Walsh et al., *Sci. Adv.* 2022; Lauretta et al., *Science* 2022).
- Boulder-dominated surfaces with scarce fine regolith on Bennu and Ryugu (Lauretta et al., *Nature* 2019; Sugita et al., *Science* 2019).
- The NASA KSC RASSOR counter-rotating drum excavator as the nearest hardware analogue (Mueller et al., ASCE Earth & Space 2013). It is a lunar-gravity prototype of tens of kilograms that excavates of order tonnes per day, not per hour.

Values marked "estimate" are my engineering judgement.

---

## 1. Findings

### P0-F02: Mining rate, robot target and station throughput disagree. Verdict: **agree**

**Check of the numbers in the finding**

- Continuous operation: 2–5 t/h × 8,766 h/yr = 17.5–43.8 kt/yr per robot. This is correct.
- The 1,000 t/yr per robot target at 2–5 t/h implies 200–500 cutting hours per year, a 2.3–5.7% duty cycle. Neither the consensus nor rq-0-26 states this.
- rq-0-26 says "20,000 t/yr requires 10–20 robots at 2–5 t/h". That implies 2.3–11% duty, which is again unstated.

I agree with GPT's round-1 point that the hourly and annual figures are not logically contradictory. However, an unstated 2–6% duty cycle on a $50M asset is a substantive gap, not a cosmetic one. Without it, the fleet size cannot be checked.

**My duty-cycle build-up (estimate)**

| Factor | Range | Basis |
|---|---|---|
| Calendar hours | 8,766 h/yr | — |
| Illuminated fraction (on-robot solar, day-only cutting) | 0.45–0.55 | Fast rotators (Bennu 4.3 h, Ryugu 7.6 h) give near-equal day and night at low latitude |
| Productive fraction of daylight | 0.30–0.60 | Walking, re-anchoring, canister swaps, stalls and clog clearing, comms-gated autonomy holds |
| Fleet availability | 0.60–0.85 | Abrasive service with no flight heritage; no basis for higher |
| **Cutting hours** | **~800–2,250 h/yr** (9–26% of calendar). I specify **1,000–2,500 h/yr, reference 1,500 h** | Upper end allows night cutting on fast rotators with a modest battery (see F07) |

**Nameplate rate.** I set it to **1–3 t/h in fine regolith, and 0.1–0.5 t/h when comminuting weak boulders**. The rate is limited by reaction and anchoring forces and by material handling, not by power (see F07 and the ACH in §6).

**Output per robot:** 1–3 t/h × 1,000–2,500 h gives **1–7.5 kt/yr, reference ~3 kt/yr**. The existing "1,000+ t/yr" sits at the bottom of this range. It is not wrong, but it was never derived.

**On-robot concentration ratio.** I set it to **1.0–1.3:1 (mass excavated : mass delivered)**. The only on-robot step is rejecting oversize material (above roughly 5–10 cm) back to the surface at low velocity. I agree with round-1 agreed change A4 that magnetic or electrostatic beneficiation should not be baselined. Its yield on CI/CM material is unknown, and C-types contain little free metal. The real concentration step is water extraction in bom-0-6, at roughly 15–50:1 feed-to-water.

**One consistent mass-flow chain.** The chain cannot be closed by bom-0-2 alone, because it depends on where bom-0-3 sits. I give the two internally consistent branches and recommend which one Phase 0 should baseline.

*Branch W: water-first, transport-limited. Recommended Phase-0 baseline.*

| Stage | t/yr | Notes |
|---|---|---|
| Excavated (robots) | 15,000–35,000 | 5–12 robots at ~3 kt/yr each; 6–14 units bought, allowing for availability |
| Delivered to ISPP after oversize rejection | 12,000–35,000 | Ratio 1.0–1.3 |
| Water recovered (bom-0-6) | 300–2,500 | 3–8 wt% recoverable water-equivalent × 70–90% recovery. CI/CM hydrated silicates hold more bound water, but full release needs high temperature |
| Used locally (robot safing, hops, transport refuelling) | 50–800 | 10–40% |
| Exported by bom-0-4 | 250–1,000 | Capped by the ~1 kt/yr transport figure (P0-F01, unverified) |
| Received at bom-0-3 | ≤1,000 | Water or propellant only. **A 50 kt/yr mineral station is not fed in this branch** |
| Tailings retained on the body | 12,000–33,000 | ~9,000–25,000 m³/yr at 1.3 t/m³. Must be managed (see F14) |

*Branch C: co-located minerals station at the asteroid.*

| Stage | t/yr | Notes |
|---|---|---|
| Excavated | 50,000–65,000 | 17–22 robots at ~3 kt/yr |
| Dried feed to co-located bom-0-3 | 47,000–62,000 | After water extraction |
| Products | unspecified; probably 2,000–10,000 | Exceeds the ~1 kt/yr transport capacity. The P0-F01 shortfall remains |
| Implication | — | The $10B station must be delivered to and operated at the asteroid. That is not what bom-0-3 currently describes |

A remote 50 kt/yr station fed by transport would need 50–65 kt/yr of transport, 50–65 times the stated capacity. That option is not viable and is dropped.

**Proposed change**

- State the duty cycle (1,000–2,500 cutting h/yr), nameplate rate (1–3 t/h in fines) and on-robot ratio (1.0–1.3) in the bom-0-2 spec.
- Size bom-0-2 to Branch W, with Branch C as a conditional growth ceiling of 20 units.
- Escalate the station location to the phase owner as a blocking decision.

### P0-F07: Robot mass and power are inconsistent. Verdict: **agree**

The finding is right but understated. The 500 kg reference is plainly an error. The larger error is that 20–50 kW is not derived from cutting physics, and that torque and force, not power, govern the design.

**Torque check.** P = Tω. At 10 kW and 50–200 N·m, ω = 50–200 rad/s, which is 480–1,900 rpm. With a wheel radius of 0.4 m, tip speed would be 20–80 m/s, or 100–400 times the escape velocity of Bennu (~0.2 m/s) or Ryugu (~0.37 m/s). I confirm the Claude and GPT round-1 finding: the rq-0-26 torque figure is not physically coherent for a bucket wheel.

**Cutting force from material strength (estimate).** Specific cutting energy is roughly 1–10 times the governing strength, in J/m³ = Pa.

| Material | Specific energy | Cut section (0.3 m wide × 0.03 m) | Tangential force | Power at 0.15 m/s tip |
|---|---|---|---|---|
| Fine regolith, cohesion ≤1 kPa (Arakawa 2020) | 10⁴–10⁵ J/m³ | 9×10⁻³ m² | 90–900 N | 15–135 W |
| Weak boulder, tensile 0.2–0.3 MPa, compressive ~1–3 MPa (Grott 2019) | 1–5 MJ/m³ | same | 9–45 kN | 1.4–7 kW |
| Same boulder at 3 mm cut depth | 1–5 MJ/m³ | 9×10⁻⁴ m² | 0.9–4.5 kN | 0.1–0.7 kW, at ~1/10 the throughput |

**Throughput at low tip speed.** Volume rate per wheel = tip speed × cut thickness × width × fill/efficiency:

0.15 m/s × 0.02–0.04 m × 0.3 m × (0.3–0.5) = 2.7×10⁻⁴ to 9×10⁻⁴ m³/s, i.e. **1.3–4.5 t/h** at 1.3 t/m³.

So 1–3 t/h in fines needs well under 1 kW at the cutter. The power actually goes into:

- conveying and auger work into canisters: 0.5–2 kW (estimate, friction-dominated);
- mobility and anchoring actuation: 0.3–1 kW;
- thermal control and avionics: 0.3–0.6 kW.

**Reaction limits.** Robot weight on Bennu: 2,500 kg × (4–8)×10⁻⁵ m/s² ≈ **0.1–0.2 N**. Mass is essentially irrelevant to holding the robot down; anchors and mechanism geometry are everything.

- Counter-rotation cancels the tangential reactions to first order.
- It does **not** cancel the crowd/thrust force, typically 0.3–1 times the tangential force.
- In fines that is 30–900 N, which is within plausible anchor capacity. Microspine grippers have shown 10²–10³ N on competent rock; capacity in porous, weak material is unproven.
- In boulders it is kN-class, so cut depth, and therefore rate, must drop.

**Conclusion: the dig rate is anchoring-limited and handling-limited, not power-limited.**

**Revised power envelope**

| Item | New value |
|---|---|
| Excavation subsystem mechanical power (cutter plus conveying) | 1–3 kW, range 0.5–5 |
| Robot electrical power while digging | 2–6 kW |
| Robot electrical peak (stall, boulder engagement, simultaneous move) | 5–10 kW |

This is lower than round-1 Gemini (20 kW) and GPT (20–50 kW test envelope). It is consistent with Claude's 2–10 kW but goes further: the cutter itself is sub-kW in fines.

I agree with GPT that a test rig should be capable of more, to find stall limits. I specify rig capacity of 10 kW and 10 kN·m per wheel stall. That is a test-facility requirement, not a flight power allocation.

**Arrays.** Assumptions:

- Effective output 150–250 W/m² of array at 1.0–1.3 AU: 28–30% cells, packing, pointing loss on a rotating body, and dust-degradation margin.
- Peak 5–10 kW → **20–50 m²** (≈1,361 W/m² at 1 AU; 0.59× at 1.3 AU).
- Flexible roll-out arrays, ROSA class, are roughly 100–150 W/kg at array level, or ~3–5 kg/m² with gimbal, deployment and dust protection. That gives **80–250 kg**.
- Loads on a deployed wing in milli-g are negligible. The real risks are dust deposition from the robot's own excavator and snagging during walking, so stowage while walking is required.

**Battery.**

- Night-side survival and safing: 0.3–0.8 kW × 2–4 h (half-rotation on Bennu or Ryugu) = 1–3 kWh.
- Night-side digging on a fast rotator: 3–5 kW × 2–4 h = 6–20 kWh.
- **Specify 15–40 kWh, about 130–330 kg at ~120 Wh/kg pack level.** Night digging is optional: it applies only on fast rotators, and the arrays must then be sized for about twice the average load.
- On a slow rotator (rotation period > ~12 h), digging is day-only.

**Where excavation power comes from.** The baseline is **own arrays plus battery, with recharge and canister exchange at a site hub**. A short umbilical (≤300 m) is an option for fixed-face or pit mining once the work pattern is known.

Beamed power is rejected for Phase 0. It adds a second spacecraft and a pointing problem to solve a problem that ~5 kW does not have.

This differs from GPT's tether baseline. For 2–3 pathfinders on an uncharacterised boulder field, a robot that depends on site cabling has a single-point failure that is not yet characterised (snagging, abrasion of cable jacket by regolith). For a production fleet working a known pit, an umbilical may well win. See §5 and §6.

**Mass (bottom-up estimate)**

| Subsystem | Low kg | High kg |
|---|---|---|
| Structure and legs | 400 | 800 |
| Anchoring (microspines, augers or harpoons) | 100 | 300 |
| Excavation (dual wheels or drums, low-speed high-torque drives, enclosure, seals) | 150 | 300 |
| Conveying and canister bay (empty) | 150 | 300 |
| Arrays and deployment | 80 | 250 |
| Battery | 130 | 330 |
| Thermal | 80 | 200 |
| Avionics, sensors, comms | 80 | 150 |
| Harness | 80 | 150 |
| Safing/hop propulsion (dry) | 50 | 150 |
| Subtotal | 1,300 | 2,930 |
| Margin (20–30%) | 1,560 | 3,810 |

**Dry mass: 2,500 kg reference, range 1,600–4,000 kg.** The existing consensus of 2,500–3,500 kg survives; the derivation is now explicit.

The excavation subsystem moves from 60–80 kg to **150–300 kg**. RASSOR-class machines at tens of kilograms move roughly 0.1 t/h. Scaling throughput 10–30 times, with enclosure and sealing, cannot plausibly stay under 100 kg (estimate).

**Proposed change**

- Strike the 500 kg reference.
- Replace 20–50 kW with 1–3 kW mechanical and 5–10 kW electrical peak.
- Add a tip-speed limit (see F14).
- Add the array, battery and mass budget above.
- Raise the excavation subsystem mass to 150–300 kg.

### P0-F14: Debris, contamination and regulation unbudgeted. Verdict: **agree**, but I partly disagree with the round-1 remedy

I agree it is unbudgeted. I disagree with round-1 agreed change A3, which tightens the mass-containment fraction (99.5% to 99.9995%). The fraction is the wrong control variable. Escape is governed by **launch velocity**, and harm by **deposition flux at protected surfaces**.

**1. Ejection velocity is a design choice.**

- Gemini's round-1 claim that tip speeds of 0.5–2 m/s "inevitably" exceed escape velocity is incorrect as a design statement. My throughput calculation above shows 1–3 t/h at **0.1–0.2 m/s** tip speed.
- Escape velocities of candidate bodies:
  - Bennu ≈ 0.20 m/s;
  - Ryugu ≈ 0.37 m/s;
  - a 100 m-diameter body at 1.2 g/cm³ ≈ 0.04 m/s.
- I therefore specify **tip speed and every material-handling velocity outside the enclosure ≤ 0.5 v_esc of the target**. That is 0.02–0.2 m/s, depending on body.
- The penalty is higher torque per kW (more gearbox mass). That is a trade-off point (§6).
- With this limit, most fugitive grains stay bound and fall back. The hazard becomes **local redeposition**, not heliocentric debris.
  - Exception: electrostatic lofting of fines, which is observed indirectly on small bodies. Its contribution is uncertain.

**2. Deposition limit, from array tolerance (calculation).**

- Fractional area coverage by grains of diameter d and density ρ is about 1.5·σ/(ρd), where σ is the areal mass.
- For 1% power loss with d = 10 µm and ρ = 2,000 kg/m³: σ ≈ 0.01 × ρd/1.5 ≈ **0.13 g/m²**.
- **Limit: ≤0.1 g/m²/yr of <100 µm dust at protected surfaces**, giving ≤1%/yr array or radiator degradation.
- This is achieved by four means together:
  - a containment enclosure;
  - stand-off distance between pits and hub arrays (hub ≥300 m from the active face, estimate);
  - array stowage when the robot is near the face;
  - electrodynamic dust shields on hub arrays and radiators (NASA KSC EDS heritage on MISSE; lunar flight demonstration on Blue Ghost, 2025).

For scale, 99% containment at 30 kt/yr releases ~300 t/yr locally. Spread even over 10 km², that is 30 g/m²/yr, about 300 times the limit. So 99% is grossly inadequate, as all of round 1 found. But demanding 99.9995% from a seal on an open face is not verifiable. Combining geometry, stand-off and velocity limits is.

**3. Escape budget.**

- Site total ≤1 t/yr of material on escape trajectories (range 0.1–10). This is demonstrated by keeping velocities ≤0.5 v_esc plus witness-plate and camera monitoring.
- This is looser than GPT's 10–100 kg/yr and in line with Claude's 1–10 t/yr.
- Rationale: escaped μm–mm grains in heliocentric orbit are swept away by radiation pressure and Poynting–Robertson drag over 10²–10⁵ yr. They pose no identified hazard to Earth. The risk falls on our own transport vehicles during approach.
- **Rule: no particles >1 mm on escape trajectories** (operational, by velocity limit).

**4. Tailings dominate.**

- Branch W leaves 12–33 kt/yr of dried residue; Branch C leaves 45–60 kt/yr. That is 30–100 times any plausible excavator leakage.
- They are hot (from ISPP), friable and fine, so tailings must be bagged, compacted or sintered and placed at ≤0.5 v_esc.
- This is a site-services item, not bom-0-2. Claude and GPT both flagged it in round 1; Gemini did not.

**Regulation and certification**

- No international body certifies an asteroid mine or sets numerical dust limits. I agree with GPT here.
- The authorising state supervises under Outer Space Treaty Art. VI, with Art. IX due-regard and harmful-contamination obligations.
- COSPAR planetary protection for an NEA mining site is most likely Category II (documentation only). Earth return of processed material from Ryugu- or Bennu-like bodies has precedent as "unrestricted Earth return" (Hayabusa2, OSIRIS-REx).
- ISO 24113 and the IADC guidelines are Earth-orbit-centric and do not directly apply.
- ITU spectrum filing is needed for site comms.
- **Proposed owner:**
  - bom-0-7 picks an operator domicile with a resource statute (Luxembourg 2017, UAE 2019, Japan 2021).
  - The project publishes its own small-body contamination standard (the limits above), independently reviewed.
  - The authorising state's licence conditions are the binding certification.
  - US operators face a mission-authorisation gap for novel activities, which Claude flagged in round 1. I agree.

**Proposed change**

- Replace ">99% containment" with three requirements:
  - (a) velocity limit ≤0.5 v_esc outside the enclosure;
  - (b) deposition ≤0.1 g/m²/yr at protected surfaces;
  - (c) site escape budget ≤1 t/yr.
- Keep an enclosure efficiency target (≥99%) as a derived design goal only.
- Add dust-monitoring and EDS hardware, plus a tailings-retention line.

---

## 2. Revised specification

| Parameter | Old | New (reference, range) | Basis | Confidence |
|---|---|---|---|---|
| Robot dry mass | 2,500–3,500 kg; "500 kg" in rq-0-26 | 2,500 kg (1,600–4,000) | Calculation (bottom-up §1) | medium-low |
| Excavation subsystem mass | 60–80 kg | 220 kg (150–300) | Judgement; RASSOR scaling | low |
| Excavation mechanical power (cutter + conveying) | 20–50 kW | 2 kW (0.5–5) | Calculation (specific energy) | medium |
| Robot electrical peak | unspecified | 7 kW (3–12) | Calculation | medium |
| Array area | unspecified | 35 m² (20–50) | Calculation | medium |
| Battery | "backup" | 25 kWh (15–40) | Calculation | medium |
| Nameplate rate, fines | 2–5 t/h | 2 t/h (1–3) | Calculation; anchoring-limited | low-medium |
| Nameplate rate, weak boulder comminution | unspecified | 0.3 t/h (0.1–0.5) | Calculation (Grott 2019 strength) | low |
| Cutting hours | unstated | 1,500 h/yr (1,000–2,500) | Calculation (duty build-up) | low |
| Output per robot | 1,000+ t/yr | 3,000 t/yr (1,000–7,500) | Calculation | low |
| On-robot mass ratio | unstated | 1.1:1 (1.0–1.3) | Judgement | medium |
| Tip speed / handling velocity | unstated | ≤0.5 v_esc (0.02–0.2 m/s) | Calculation | high (as requirement) |
| Reaction torque per wheel (flight, fines) | 50–200 N·m | 0.1–1 kN·m; stall rating 5 kN·m | Calculation | medium |
| Uncancelled crowd force to anchors | unaddressed | 30–900 N fines; ≤2 kN boulder mode | Calculation | low-medium |
| Containment requirement | >99% by mass | ≤0.1 g/m²/yr deposition at protected surfaces; ≤1 t/yr site escape; ≤0.5 v_esc | Calculation and judgement | low-medium |
| Excavation thermal isolation | "required" | Verification item only. ΔT of excavated material = 2 kW / (0.56 kg/s × 800 J/kg·K) ≈ 4 K (range 2–15 K). Phyllosilicate water releases above ~300 °C | Calculation | medium |
| Design life | 5 yr, 20,000+ h (46% duty) | 5 yr calendar; 7,500 cutting h (5,000–12,500); teeth and seals replaceable at hub | Calculation | low |
| Interface to ISPP | "direct coupling, no hoppers" | Sealed 1–2 t canisters to hub at ≤300 m | Judgement (fault tolerance) | medium |
| Fleet | 20 | 3 pathfinders + up to 17 conditional (Branch W needs 6–14 total) | Calculation | medium |
| Unit recurring cost | $50M | $30–70M | Judgement (planetary rover cost analogues, learning over 20 units) | low |
| Robot NRE/qualification | inside $1B | Separate line, $400–800M | Judgement | low |

---

## 3. Interfaces

| With | Flow | Value | Currently in BOM? |
|---|---|---|---|
| bom-0-6 ISPP | Mass (ore in sealed canisters) | 12–35 kt/yr (Branch W); 50–65 kt/yr (Branch C) | Item exists. **The interface is undefined, and bom-0-6 also claims its own bucket-wheel excavation, which is double scope.** Propose that excavation sits wholly in bom-0-2 and that bom-0-6 begins at the canister inlet |
| bom-0-6 ISPP | Propellant (safing/hop, cold gas or water-derived) | 0.2–1 t/yr fleet (10–50 kg/robot/yr) | No |
| bom-0-5 Power | Power (hub charging; or umbilical) | Fleet average 20–80 kW; peak ≤0.2 MW | Partly. bom-0-5 has no stated location or site distribution |
| bom-0-3 Station | Mass | Branch W: none directly (water via bom-0-4 ≤1 kt/yr). Branch C: 47–62 kt/yr dried feed, co-located | Station location undefined (blocking) |
| bom-0-4 Transport | Mass | ~0 from robots directly; water ≤1 kt/yr via ISPP | Yes, but capacity unverified (P0-F01) |
| bom-0-1 Prospecting | Data | Rotation state, gravity field, fines distribution, boulder size-frequency, thermal inertia; ~GB per target | Yes, but remote sensing cannot give subsurface strength. **A contact/penetrometer probe is missing** |
| Site comms / Earth | Data | 0.1–1 Mbps per robot on site; aggregate Earth downlink 0.1–2 Mbps at 1–2 AU (DSN-class, contention-limited); autonomy for ≥1 day without contact | No |
| bom-0-7 Organisation | Other (authorisation, licence conditions, contamination standard) | 1 licence; standard published before launch | Item exists; scope not assigned |
| Site services (new) | Mass (tailings) | 12–33 kt/yr Branch W; 45–60 kt/yr Branch C | No |
| Launch/delivery (new) | Mass | 20 × 2.5 t ≈ 50 t (32–80 t) landed, plus 3 pathfinders ≈ 7.5 t first | No |

---

## 4. Missing items or scope

1. **Robot delivery to the target.** About 50 t (range 32–80 t) landed. This requires SEP cruise and a landing/attachment system. **Estimate $0.5–1.5B.**
2. **Site hub.** Canister depot, charging posts or an umbilical PDU, tooth and seal replacement station, local relay. **$150–500M.**
3. **Tailings retention.** Bagging, compaction or sintering, and placement at ≤0.5 v_esc. **$50–300M.**
4. **Dust monitoring and mitigation.** Witness plates, cameras, EDS on hub arrays and radiators, and contamination modelling. **$50–150M.**
5. **Subsurface mechanics precursor.** Penetrometer or excavation probe at the target before fleet commitment. **$100–300M.** The pathfinders can partly serve as the flight demonstration GPT asked for, but they arrive after the robot design is frozen. A cheap probe earlier breaks that circularity.
6. **Mission operations and ground segment**, including DSN time. **$30–60M/yr**, or $150–300M over 5 years.
7. **Spares and attrition:** 2–4 robots (at unit cost).
8. **Anchoring R&D (rq-0-7).** It is currently embedded in the $17M rq-0-26 programme, which cannot carry it. Treat it as part of NRE.
9. **Scope correction.** bom-0-6's excavation hardware should be deleted or moved, to avoid paying twice.

---

## 5. Remaining disagreements and open questions

- **Tether vs on-board arrays.** I baseline on-board arrays for the pathfinders; GPT baselined site cable. This is a genuine trade-off point (autonomy and robustness to snagging vs mass and dust exposure). It should be revisited after pathfinder terrain data, not settled now.
- **Containment limit.** My ≤1 t/yr escape budget is looser than GPT's 10–100 kg/yr. Reasonable engineers can differ on the risk appetite for co-orbital debris near our own transport approach corridors.
- **Bucket wheels at all.** If the target's fines fraction is small (Bennu- or Ryugu-like boulder fields), the binding operation is comminution. A drum or wheel may then be the wrong tool; percussive crushing, bagging or a drag-line may be better. I hold this as **about as likely as not (40–60%), low confidence**.
- **Station branch W vs C.** This is a phase-level values question: an early demonstration with low capital at risk versus early scale. It is not a fact to be measured.
- **Recoverable water fraction** (3–8 wt% assumed) and whether 1,000 °C heating is needed. This is bom-0-6's question, but it sets the bom-0-2 fleet size by a factor of 2–3.
- **Electrostatic lofting** contribution to deposition flux is unquantified.
- **Unit cost** remains low confidence. No production-run analogue exists for abrasive-service planetary robots.

---

## 6. Decision-quality critique

**Methods used:**

- Composite Scaffold, for every decision below.
- ACH, for the rate-limiting hypothesis (DQ3).
- QOC, for power source (DQ4).
- GRADE Evidence-to-Decision, for containment (DQ5).
- ATAM sensitivity and trade-off labels throughout.

The **likelihood** that an assumption holds is stated separately from **confidence**, which reflects evidence quality × agreement.

### DQ1. Fleet procurement quantity (blocking)

1. **Frame.** This is a property/executive decision. It is partly reversible: production units can be cancelled, but NRE and launch slots cannot. Cynefin domain: complex (productivity unknown until operated).
2. **Criteria and weights** (swing weights over the realistic ranges):

| Criterion | Weight |
|---|---|
| Capital at risk before productivity is demonstrated | 0.30 |
| Time to Phase-0 throughput | 0.25 |
| Learning value | 0.20 |
| Closure with downstream chain | 0.15 |
| Unit-cost learning curve | 0.10 |

3. **Options.**
   - (a) 20 at once (current BOM).
   - (b) 2–3 pathfinders, then up to 17 more (GPT round 1; my recommendation).
   - (c) 6–10 pilot (Claude round 1).
   - (d) Null option: no robots; a precursor probe only.
4. **Assessment.**
   - (a) scores worst on capital at risk. It buys roughly $1B or more of robots designed on surface-only data.
   - (b) scores best on capital at risk and learning, and worst on time. Each follow-on decision cycle adds about 2–4 years, given launch plus cruise to an NEA.
   - (c) is intermediate.
   - (d) is cheap but delays everything.
5. **Sensitivity and trade-off.** Fleet size is a **trade-off point**: schedule versus capital at risk. It is a values question for the phase owner. The round-1 reconciliation presented it as a technical divergence.
6. **Evidence certainty.** It is likely (60–75%) that first-generation productivity will fall short of design by ≥2×. Basis: VIPER, InSight HP³ mole failure in unexpected regolith, and Philae anchoring failure. Medium confidence.
7. **Key assumption.** Pathfinder data will change the production design enough to justify the delay. **Falsifier:** the pathfinder achieves ≥70% of nameplate and ≥70% availability in the first 6 months with no design change logged. In that case (a) would have been right in hindsight.
8. **Decision, warrant, downside.** *In the context of no subsurface data, facing a 2–6× uncertainty in per-robot output, we choose 3 pathfinders plus 17 conditional, to cap capital at risk at about $0.3–0.5B, accepting a 2–4 year delay to full throughput.*
9. **Consequences.** This constrains bom-0-3 (cannot be fed at 50 kt/yr early). It enables a cheaper precursor probe (§4). It forces launch campaigns to be split.

**Weakest DQ link: alternatives.** Round 1 compared 20 versus 2–3 versus 6–10 but never priced the null or precursor option, or the delay cost (Cost of Delay was not quantified).

### DQ2. Phase mass-flow architecture and station location (blocking, phase-level)

1. **Frame.** This is an existence decision for bom-0-3, which is a one-way door at $10B. It is not decidable inside bom-0-2.
2. **Criteria:**

| Criterion | Weight |
|---|---|
| Closure with transport capacity | 0.30 |
| Capital at risk | 0.25 |
| Strategic value of products | 0.25 |
| Operational complexity at a remote site | 0.20 |

3. **Options.**
   - W: water-first with a deferred station.
   - C: co-located station.
   - R: remote station plus a transport build-up of 50–65×.
   - Null: no station in Phase 0.
4. **Assessment.**
   - W closes with ~1 kt/yr transport.
   - C closes in mass at the site, but products still exceed transport, and the $10B station must be delivered to the asteroid.
   - R fails the transport "must" (Kepner-Tregoe screening) and should be struck.
5. **Trade-off point.** W versus C trades early scale against capital and complexity. This is a values question.
6. **Evidence.** Transport capacity of ~1 kt/yr is an unverified figure (P0-F01). Low confidence.
7. **Key assumption.** Transport capacity is about 1 kt/yr. **Falsifier:** bom-0-4 trajectory and turnaround analysis showing ≥20 kt/yr is feasible within budget. That would revive R.
8. **Decision.** *In the context of ~1 kt/yr transport, facing an unfundable remote-feed chain, we baseline W for bom-0-2 sizing, to keep robot procurement closed with what can move, accepting that the 50 kt/yr station is unsupported in Phase 0 until bom-0-3 declares a location.*
9. **Consequences.** bom-0-3 must re-scope or relocate. bom-0-2 caps at 6–14 production robots unless C is chosen.

**Weakest DQ link: frame.** Round 1 let each model pick its own downstream architecture (Claude co-located, Gemini transported, GPT water-first). It then reported three fleet sizes as a "divergence" when they were answers to three different questions.

**Correction to round 1.** Gemini's Branch (50 kt/yr transported) violates transport by 50×. It should have been screened out as failing a "must", not preserved as a position.

### DQ3. Excavation architecture and power envelope (dual bucket wheel, 20–50 kW)

1. **Frame.** This is a property decision. It is reversible until the hardware freeze, so match rigour to reversibility. Cynefin domain: complicated (analysable with tests).
2. **Criteria:**

| Criterion | Weight |
|---|---|
| Reaction loads within anchor capacity | 0.30 |
| Throughput in the actual material mix | 0.25 |
| Ejection velocity and containment | 0.20 |
| Mass | 0.15 |
| Wear life | 0.10 |

3. **Options.**
   - Dual counter-rotating wheels.
   - Opposed drums (RASSOR-type).
   - Single wheel with anchor reaction.
   - Percussive or comminution head plus scoop.
   - Bagging or drag-line.
   - Null: surface scraping of ponded fines only.
4. **ACH on what limits the dig rate** (C = consistent, I = inconsistent, – = neutral):

| Evidence | H1 Power-limited (rq-0-26 implicit) | H2 Reaction/anchor-limited | H3 Handling-limited (conveying, clogs, swaps) | H4 Feedstock-limited (fines scarce) |
|---|---|---|---|---|
| Cutting power in ≤1 kPa fines is <0.2 kW at 1–3 t/h (calculation; Arakawa 2020) | **I** | C | C | – |
| Robot weight ~0.15 N; crowd force uncancelled | – | C | – | – |
| Boulder strength 0.2–0.3 MPa tensile (Grott 2019) → kN forces | C (boulder mode only) | C | – | C |
| Bennu/Ryugu are boulder-dominated with scarce fines (Lauretta 2019; Sugita 2019) | – | C | – | C |
| Terrestrial and lunar prototype downtime dominated by jams and transfer | – | – | C | – |

   H1 is the most disconfirmed. H2, H3 and H4 survive. The **20–50 kW figure answers a question that is not binding.**
5. **Sensitivity and trade-off.**
   - Rate is **sensitive** to anchor capacity (sensitivity point).
   - Tip speed is a **trade-off point**: lower tip speed improves containment but raises torque per unit power, and so gearbox mass.
6. **Evidence certainty.**
   - It is likely (65–80%) that robots operating on Bennu- or Ryugu-like bodies will be anchoring- or feedstock-limited rather than power-limited. Medium confidence: consistent with physics, but no in-situ excavation data.
   - The "90–95% torque cancellation" figure has no supporting test or DEM result. Very low confidence.
7. **Key assumption.** Target fines are deep enough (≥0.5 m) over a workable area (≥10³ m²). **Falsifier:** prospecting or precursor probe showing fines <0.2 m thick, or ponded fines only. That would favour a comminution head over wheels.
8. **Decision.** *In the context of weak, boulder-rich rubble piles, facing unknown subsurface strength, we keep counter-rotating wheels or drums as a candidate (not a hard requirement), sized to 1–3 kW and ≤0.5 v_esc tip speed, accepting the risk that boulder-dominated sites need a different head.*
9. **Consequences.** Anchoring (rq-0-7) becomes the pacing technology. The $17M programme must add anchor-reaction measurement and a comminution alternative.

**Weakest DQ link: reasoning.** rq-0-26's "unanimous" resolution rested on a torque figure implying 480–1,900 rpm. Unanimity among models sharing an error is not evidence.

Round 1 caught the torque error but still allowed "high confidence" on 20 kW (Gemini). That confidence rating should be withdrawn.

### DQ4. Robot power source (QOC)

**Question:** Where do 5–10 kW peak and 2–6 kW average come from?

| Option | Mass to robot | Robustness on unknown terrain | Dust exposure | Site infrastructure dependence | Night operation |
|---|---|---|---|---|---|
| Own arrays 20–50 m² + 15–40 kWh | +200–550 kg | High (independent) | Array near face (stow when digging close) | Low (hub for recharge only) | Fast rotators only |
| Umbilical ≤300 m from hub | +50–150 kg (reel, cable) | Snag and abrasion risk unknown | Arrays remote from face (good) | High | Yes, if hub has storage |
| Pulsed buffer (Gemini) | Similar to own arrays | High | As own arrays | Low | Limited |
| Beamed | Receiver small; second spacecraft needed | Pointing | Low | Very high | Yes |

- This is a **trade-off point**: autonomy versus mass and dust exposure.
- **Weakest DQ link: information.** Nobody has snag data for cables on boulder fields in milli-g. Claude rejected the tether and GPT baselined it on equal ignorance.
- Likelihood that umbilical snagging is operationally significant on a Bennu-like surface: about as likely as not. Low confidence.
- **Falsifier:** a parabolic-flight or air-bearing test of a robot dragging cable through boulder simulant, measuring snag rate per 100 m traversed.
- **Decision:** own arrays for the pathfinders; umbilical to be re-traded for production after site data.

### DQ5. Containment metric and limit (GRADE Evidence-to-Decision)

| EtD domain | Assessment |
|---|---|
| Problem priority | High. 99% gives ~300 times the tolerable deposition at 30 kt/yr |
| Benefits | Protects hub arrays and radiators and own spacecraft; keeps licence conditions credible |
| Harms / burdens | Tighter limits push tip speed down (torque and mass up) and add enclosure mass. Unverifiable limits stall the programme |
| Certainty of evidence | Low. No small-body excavation plume data; electrostatic lofting uncertain; the deposition-to-loss relation is well established only for lunar and Mars dust |
| Values | Self-protection versus third-party and environmental due regard (OST Art. IX). Round 1 never separated these |
| Resources | Dust hardware $50–150M; the velocity-limit penalty is roughly +50–100 kg/robot of gearing (estimate) |
| Acceptability | Regulators can check a velocity limit and witness-plate flux. They cannot check a "99.9995% by mass" claim |
| Feasibility | A velocity limit is feasible by design; flux is measurable on site; a seal efficiency of 99.999% is not demonstrable |

- **Recommendation:** conditional, for the three-part requirement in F14. Low certainty.
- **Weakest DQ link: values.** Round 1 debated numbers (99.5% vs 99.95% vs 10 kg/yr) without stating whose harm each number protects against. It also never weighed tailings, which are 30–100 times larger.
- **Key assumption:** most fugitive material launched at ≤0.5 v_esc stays bound. **Falsifier:** DEM plus electrostatic-lofting modelling, or pathfinder witness plates, showing escape fraction >10% of fugitive mass at that velocity.

### DQ6. Cost roll-up and NRE split

- Round 1 split out NRE but never summed the new lines. Using my ranges:
  - robots (3 + 17) at $30–70M: $0.6–1.4B;
  - NRE: $0.4–0.8B;
  - delivery: $0.5–1.5B;
  - hub, tailings and dust: $0.25–0.95B;
  - precursor probe: $0.1–0.3B;
  - operations: $0.15–0.3B;
  - spares: $0.06–0.28B.
- **Total ≈ $2.1–5.5B, against the $1.0B line.** This is likely (≥80%) to exceed $2B. Medium confidence.
- **Weakest DQ link: commitment.** No owner was assigned to accept or reject the overrun.

---

```yaml
item: bom-0-2
model: Claude (Anthropic)
findings:
  - id: P0-F02
    verdict: agree
    summary: The 1,000 t/yr target implies an unstated 2.3-5.7% duty at 2-5 t/h, and the chain cannot close with a remote 50 kt/yr station under ~1 kt/yr transport.
    proposed_change: State 1,000-2,500 cutting h/yr, 1-3 t/h nameplate in fines, 1.0-1.3 on-robot mass ratio, and size the fleet to a water-first chain (12-35 kt/yr excavated, <=1 kt/yr exported) with a co-located-station branch as a conditional ceiling.
  - id: P0-F07
    verdict: agree
    summary: The 500 kg basis and 20-50 kW are both wrong; cutting power in weak regolith is sub-kW and the dig rate is anchoring- and handling-limited, giving 5-10 kW electrical peak on a ~2,500 kg robot.
    proposed_change: Replace 20-50 kW with 1-3 kW mechanical and 5-10 kW electrical peak from 20-50 m2 own arrays plus 15-40 kWh battery, raise the excavator mass to 150-300 kg, and keep an umbilical as a production-phase option.
  - id: P0-F14
    verdict: agree
    summary: Contamination is unbudgeted, but a tighter mass-containment fraction is the wrong control; launch velocity, deposition flux and tailings govern the hazard.
    proposed_change: Require handling velocities <=0.5 v_esc, <=0.1 g/m2/yr deposition at protected surfaces and <=1 t/yr site escape, fund dust monitoring, EDS and tailings retention, and make the authorising-state licence (via bom-0-7) the certifying instrument.
revised_spec:
  - parameter: robot dry mass
    old: 2,500-3,500 kg (500 kg in rq-0-26)
    new: 2500
    range: [1600, 4000]
    unit: kg
    basis: calculation
    confidence: low
  - parameter: excavation subsystem mass
    old: 60-80
    new: 220
    range: [150, 300]
    unit: kg
    basis: judgement
    confidence: low
  - parameter: excavation mechanical power (cutter plus conveying)
    old: 20-50
    new: 2
    range: [0.5, 5]
    unit: kW
    basis: calculation
    confidence: medium
  - parameter: robot electrical peak power
    old: unspecified
    new: 7
    range: [3, 12]
    unit: kW
    basis: calculation
    confidence: medium
  - parameter: on-robot solar array area
    old: unspecified
    new: 35
    range: [20, 50]
    unit: m2
    basis: calculation
    confidence: medium
  - parameter: battery capacity
    old: unspecified
    new: 25
    range: [15, 40]
    unit: kWh
    basis: calculation
    confidence: medium
  - parameter: nameplate excavation rate in fines
    old: 2-5
    new: 2
    range: [1, 3]
    unit: t/h
    basis: calculation
    confidence: low
  - parameter: nameplate rate in weak boulder comminution
    old: unspecified
    new: 0.3
    range: [0.1, 0.5]
    unit: t/h
    basis: calculation
    confidence: low
  - parameter: cutting hours per robot
    old: unspecified
    new: 1500
    range: [1000, 2500]
    unit: h/yr
    basis: calculation
    confidence: low
  - parameter: output per robot
    old: 1000+
    new: 3000
    range: [1000, 7500]
    unit: t/yr
    basis: calculation
    confidence: low
  - parameter: on-robot mass ratio (excavated to delivered)
    old: unspecified
    new: 1.1
    range: [1.0, 1.3]
    unit: ratio
    basis: judgement
    confidence: medium
  - parameter: tip speed and external handling velocity
    old: unspecified
    new: 0.5 x v_esc
    range: [0.02, 0.2]
    unit: m/s
    basis: calculation
    confidence: high
  - parameter: reaction torque per wheel in fines (flight)
    old: 50-200 N.m
    new: 0.5
    range: [0.1, 1.0]
    unit: kN.m
    basis: calculation
    confidence: medium
  - parameter: uncancelled crowd force to anchors
    old: unspecified
    new: 500
    range: [30, 2000]
    unit: N
    basis: calculation
    confidence: low
  - parameter: deposition limit at protected surfaces
    old: ">99% containment by mass"
    new: 0.1
    range: [0.05, 0.3]
    unit: g/m2/yr
    basis: calculation
    confidence: low
  - parameter: site escaping-mass budget
    old: unspecified
    new: 1
    range: [0.1, 10]
    unit: t/yr
    basis: judgement
    confidence: low
  - parameter: design cutting life
    old: 20,000+
    new: 7500
    range: [5000, 12500]
    unit: h
    basis: calculation
    confidence: low
  - parameter: fleet quantity
    old: 20
    new: 3 pathfinders + up to 17 conditional
    range: [6, 20]
    unit: robots
    basis: calculation
    confidence: medium
  - parameter: unit recurring cost
    old: 50
    new: 50
    range: [30, 70]
    unit: USD M
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-6
    flow: mass
    value: 12-35 kt/yr ore in sealed 1-2 t canisters (Branch W); 50-65 kt/yr (Branch C)
    in_bom: false
  - with: bom-0-6
    flow: propellant
    value: 0.2-1 t/yr fleet safing/hop propellant
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 20-80 kW fleet average, <=0.2 MW peak via hub charging or umbilical
    in_bom: false
  - with: bom-0-3
    flow: mass
    value: 0 t/yr (Branch W) or 47-62 kt/yr dried feed if co-located (Branch C)
    in_bom: false
  - with: bom-0-4
    flow: mass
    value: <=1 kt/yr water via ISPP; ~0 directly from robots
    in_bom: true
  - with: bom-0-1
    flow: data
    value: rotation, gravity, fines depth and boulder size-frequency per target, ~GB per target
    in_bom: true
  - with: bom-0-7
    flow: other
    value: 1 authorising-state licence and a published small-body contamination standard before launch
    in_bom: false
  - with: site services (new)
    flow: mass
    value: 12-33 kt/yr tailings (Branch W); 45-60 kt/yr (Branch C)
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-2
    quantity: 3 pathfinders + up to 17 conditional
    unit_cost_usd: [30000000, 70000000]
    rationale: Cap capital at risk until in-situ productivity, which is uncertain by 2-6x, is demonstrated; Branch W needs only 6-14 robots in total.
  - action: split
    item: Mining robot NRE and qualification (incl. anchoring rq-0-7)
    quantity: 1 programme
    unit_cost_usd: [400000000, 800000000]
    rationale: The $17M rq-0-26 programme cannot qualify a 5-year abrasive-service robot or its anchoring.
  - action: add
    item: Robot launch and delivery to target body (~50 t landed)
    quantity: 1 campaign (2 phases)
    unit_cost_usd: [500000000, 1500000000]
    rationale: No BOM line delivers 32-80 t of robots to an NEA.
  - action: add
    item: Mining site hub (canister depot, charging/umbilical PDU, wear-part replacement, relay)
    quantity: 1 site
    unit_cost_usd: [150000000, 500000000]
    rationale: Sealed canister transfer and recharge require site infrastructure that no current item provides.
  - action: add
    item: Tailings retention (bagging, compaction or sintering, low-velocity placement)
    quantity: 1 site
    unit_cost_usd: [50000000, 300000000]
    rationale: 12-60 kt/yr of residue is the dominant debris source.
  - action: add
    item: Dust monitoring and mitigation (witness plates, EDS, contamination modelling)
    quantity: fleet and site
    unit_cost_usd: [50000000, 150000000]
    rationale: Required to verify the deposition-flux and escape-budget requirements.
  - action: add
    item: Subsurface mechanics precursor probe
    quantity: 1
    unit_cost_usd: [100000000, 300000000]
    rationale: Remote sensing cannot give the subsurface strength that sets the rate-limiting anchoring loads.
  - action: add
    item: Mission operations and ground segment (5 yr)
    quantity: 1
    unit_cost_usd: [150000000, 300000000]
    rationale: Fleet autonomy still needs DSN-class links and an operations team.
  - action: add
    item: Spare and attrition robots
    quantity: 2-4
    unit_cost_usd: [30000000, 70000000]
    rationale: Losses are expected in first-of-kind abrasive service.
  - action: resize
    item: bom-0-6
    quantity: remove excavation scope
    unit_cost_usd: [0, 0]
    rationale: Excavation is double-counted between bom-0-2 and bom-0-6; ISPP should begin at the canister inlet.
open_questions:
  - Is bom-0-3 remote, co-located or deferred, and is Phase 0 water-first or minerals-first (blocking phase decision)?
  - What anchor capacity is achievable in porous, weakly cohesive rubble-pile material, and does it cap the dig rate as calculated?
  - What depth and areal extent of fines exist at the target, and does a boulder-dominated site require a comminution head instead of wheels?
  - What is the snag and abrasion rate of an umbilical dragged across boulder fields in milli-g?
  - What fraction of fugitive dust launched at <=0.5 v_esc escapes, including electrostatic lofting?
  - What recoverable water fraction and extraction temperature does the target support, given that it sets fleet size by 2-3x?
  - Is transport capacity really ~1 kt/yr (P0-F01)?
  - Which authorising state and licence conditions will bind the contamination standard?
  - Who owns the roughly $2.1-5.5B programme total against the $1.0B line?
```
