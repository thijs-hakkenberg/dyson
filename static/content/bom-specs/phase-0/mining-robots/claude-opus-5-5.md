---
bomId: "bom-0-2"
itemName: "Mining Robots"
itemSlug: "mining-robots"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-2 Mining Robots: Technical Proposal

**Item:** bom-0-2 Mining Robots. Pathfinder units in 0A; production fleet in gated 0B.
**Baseline context:** Fe-Ni product co-located at the target NEA; SEL1 reference receiving node (D-04, interim); robots tether-powered from site power.
**Status:** Proposal for configuration control. All numbers are ranges with a stated basis. Confidence is stated per number. Nothing here is adopted until the owner accepts it.

---

## 0. Executive summary

I recommend a robot concept called the **Anchored Cell Excavator (ACE)**. Its main features:

- **Body and mobility.** It is a low, wide, wheel-less sled. It moves as a cable-driven parallel robot inside a pre-anchored work cell of about 30 m, using four on-board winches on four anchor lines.
- **Power.** It is fed by a ±1 kV DC bipolar tether (2 kV pole-to-pole) from a cell power node supplied under bom-0-5.
- **Excavation.** It collects fines with an enclosed pair of slow, counter-rotating, up-cut drums. The drums are arranged so their steady reaction pulls the head into the material rather than pushing the robot off the body.
- **Cobbles.** A second manipulator with a grab clears cobbles and services anchors and other robots.

The design follows five principles.

1. **On a rubble pile you cannot push on the ground.** The robot weighs about 0.1–0.5 N on a Bennu- or Itokawa-class body. At milli-g, digging is a load-path problem, not a power problem.
   - Every steady force must close inside the robot–material system.
   - Anchors must carry only pretension and bounded transients.
   - Slip clutches must cap transients below the anchor capacity actually demonstrated.
2. **Collect, don't mine.** The robot takes the <25 mm fines fraction at about 1:1 (per A4) and does no comminution. Competent ordinary-chondrite clasts are pushed aside, not cut.
   - This puts baseline electrical demand at about 2.5 kW average and 8 kW peak, not tens of kW.
3. **Size for the actual product.** Round 2 sized the fleet for a water-first chain. The binding baseline is native and reduced Fe-Ni, so the excavated tonnage is set by **metal grade × recovery**.
   - At 1.3 kt/yr product, 10 wt% metal and 60% recovery, the robots must deliver about **22 kt/yr** of run-of-mine fines.
4. **Nothing the robot does may exceed 0.25–0.3 v_esc.** This applies to the robot body and to anything the robot touches.
   - A robot that loses every anchor at maximum speed therefore stays gravitationally bound and recoverable.
   - Material the robot handles cannot be launched to escape by the robot's own kinematics.
5. **Buy evidence before replicas.**
   - 0A: two flight pathfinders, plus one ground qualification model under bom-0-11.
   - 0B: a fleet sized at KDP-0B from signed Phase 1 demand and measured pathfinder productivity. Reference: 8 delivered (6 active + 2 spare/servicing) and 3 later replacements.

**Cost (bom-0-2 recurring hardware only; low confidence):**

| | Range | Reference |
|---|---|---|
| 0A | $120–245M | $170M |
| 0B (gated) | $345–730M | $500M |

Robot-specific NRE is $300–650M (ref $450M) and is carried in **bom-0-11**, not here.

**Where I depart from the round-2 panel:**

- Fleet basis: Fe-Ni rather than water.
- Power: reject 25–70 kW as baseline.
- Mobility: reject walking and bucket wheels.
- Pathfinders: 2 rather than 3.
- Duty cycle: higher in 0B, lower in 0A.
- Velocity rule: tighter and body-relative.
- Test rig: no 10 kN·m stall rig.

Details are in §11.

---

## 1. What changes when the binding context is applied

| Driver | Round-2 assumption | Binding context | Consequence for robots |
|---|---|---|---|
| Product | Water-first (Claude W, GPT, Gemini) | Native/reduced Fe-Ni; water only as a C-type pilot (bom-0-6) | Tonnage is set by metal grade × recovery, not water wt% |
| Plant location | Disputed | Co-located at the target NEA | Short haul (≤50 m) to a sealed dock; no on-robot beneficiation |
| Power | Arrays vs tether disputed | HV tether, 1–3 kV, 10–50 kWh battery | Arrays on the robot are deleted. The robot is sized round tether and anchors |
| Delivered product | — | 0.6–2.5 kt/yr | Fleet range 3–16 robots across the full envelope (§3) |
| Crew | — | Uncrewed | Peer robotic servicing is a design driver (T21) |

---

## 2. Physical environment the design is built round

| Parameter | Design range | Basis / note |
|---|---|---|
| Body diameter | 0.3–1.5 km rubble pile | Typical accessible S-type NEA. Fe-Ni favours H/L-chondrite-like S-types |
| Surface gravity | 2×10⁻⁵ to 3×10⁻⁴ m/s² | Itokawa about 1×10⁻⁴; Bennu about 6×10⁻⁵ |
| Escape velocity | 0.15–0.6 m/s | Itokawa about 0.17 m/s; Bennu about 0.2 m/s; a 1 km S-type about 0.5 m/s |
| Robot weight on surface (2.65 t) | 0.05–0.8 N | Weight is negligible. Every load path is anchor- or inertia-limited |
| Surface-layer cohesion | 0–10 Pa design; up to 1 kPa at depth (unknown) | Gravity-regime cratering on Ryugu and very low resistance at Bennu TAG imply a near-cohesionless top layer. I side with Gemini's 0.1–10 Pa for the top 0.3 m, and design for Claude's ≤1 kPa only as an upper bound at depth |
| Fines (<25 mm) fraction in selected ponds | ≥60% by mass required | **Target-selection requirement, not an assumption.** Pushed to bom-0-1 and the target gate |
| Free metal in fines | 8–18 wt% acceptable; 10 wt% reference | H-chondrite-like. LL-like (about 2 wt%) targets do not close (§3) |
| Surface temperature | 200–400 K diurnal | About 1 AU; equator and mid-latitudes |
| Rotation period | 4–12 h | Night lasts 2–6 h. The tether lets robots work through night on site storage |
| Mid-latitude effective gravity | Must be >0 at site | Rules out near-critical equators on fast rotators. Site-selection requirement |

**The governing number.** A 50 N crowd force applied for 30 s to a free 2.65 t robot gives Δv ≈ 0.57 m/s, which exceeds escape velocity on every candidate. No design that relies on robot mass or ground bearing can work. Hence principle 1.

---

## 3. Fleet sizing for the Fe-Ni product

### 3.1 Excavation demand

M_exc = P / (g_m × η_r)

- P = delivered Fe-Ni product
- g_m = free-metal grade in the robot-delivered fines
- η_r = plant recovery to product specification (bom-0-3 owns this; I use it only for sizing)

| Case | P (kt/yr) | g_m | η_r | Yield | M_exc (kt/yr) |
|---|---|---|---|---|---|
| Low demand, rich target | 0.6 | 18% | 80% | 14.4% | 4.2 |
| **Reference** | **1.3** | **10%** | **60%** | **6.0%** | **22** |
| High demand, reference target | 2.5 | 10% | 60% | 6.0% | 42 |
| Reference demand, lean target | 1.3 | 5% | 50% | 2.5% | 52 |
| LL-like target (reject) | 1.3 | 2% | 60% | 1.2% | 108 |

The reference tailings stream is about 21 kt/yr. This is consistent with GPT's 19.2 kt/yr (14–24 kt/yr).

### 3.2 Per-robot output

| Factor | 0A pathfinder (yr 1) | 0B reference | 0B range | Basis |
|---|---|---|---|---|
| Nameplate dig rate in fines | 1–2 t/h | 2.0 t/h | 1–3 t/h | §5.3: 2 drums × 0.6 m × 5 cm × 7 mm/s × 1.3 t/m³ ≈ 2 t/h |
| Fraction of an active hour spent digging | 0.4 | 0.6 | 0.5–0.7 | Hopper fill about 45 min, then about 25 min to dock and return |
| Availability (servicing, re-rigging, holds, faults) | 0.15–0.25 | 0.40 | 0.25–0.55 | Tethered, so not illumination-limited. Rigging is about 5% |
| Cutting hours per year | 400–1,000 | **2,000** | 1,000–3,000 | 8,760 × availability × dig fraction |
| Output per robot | 0.4–2 kt/yr | **4.0 kt/yr** | 1.0–7.5 kt/yr | — |

My 0B figure is above Claude's 1,500 h and Gemini's 1,300 h, for one reason. Under the binding tether-plus-site-storage architecture, robots are not illumination-limited. The 2–6 h nights on 4–12 h rotators are covered by site storage at about 20 kW fleet load: 40–120 kWh per night, against 0.5–15 MWh of site storage.

My 0A figure is deliberately low. First-flight robots spend most of their time on characterisation, not production.

### 3.3 Fleet

N_active = ⌈M_exc / O_robot⌉
N_delivered = N_active + ⌈0.33 × N_active⌉ (servicing rotation and peer-repair spares)

| Case | M_exc | N_active (at 4 kt/yr) | N_delivered | Replacements (5 yr) | Total 0B units |
|---|---|---|---|---|---|
| Low | 4.2 | 2 | 3 | 1 | 4 |
| **Reference** | **22** | **6** | **8** | **3** | **11** |
| High | 42 | 11 | 14 | 4 | 18 (exceeds the 16 I would authorise; re-plan) |
| Lean target | 52 | 13 | 17 | 5 | Fails the economics gate; re-target |

**Replacements are derived from reliability, not forecast.** I side with GPT here.

- Reference loads: 6 active robots × 5 yr × about 4,000 operating h = 120,000 robot-hours.
- Target mission-ending failure rate after peer repair: 1 per 40,000 h. That gives about 3 losses.
- The range of 2–5 corresponds to an unrecoverable MTBF of 25,000–60,000 h.
- The bom-0-14 depot covers recoverable failures through LRU swaps.

**Recommendation.** Authorise 0B at the reference size of 8 + 3 only if the pathfinders demonstrate the KDP-0B productivity floor in §8.4. The final N is fixed at the gate under D-01.

---

## 4. Work-cell architecture

```
                      SITE PLAN (one active work cell, ~30 m across)

           A1 (boulder sling, >=2 m clast)              A2 (screw-umbrella pile)
             o------------------------------------------o
             |\                                        /|
             | \  anchor line L1         anchor line L2/ |
             |  \                                    /  |
             |   \        BENCH (unexcavated)       /   |
             |    \     +--------------------+     /    |
             |     \    |   ACE robot (sled) |    /     |       CPN = cell power node (bom-0-5)
             |      +===|  4 winches  [hopper]|===+      |       SD  = sealed dock (bom-0-3 inlet)
             |          +---------+----------+          |       ~~~ = HV/fibre tether (on robot reel)
             |                    | boom (4.5 m)        |
             |       .............v.............        |
             |       :  PAN (excavated, 0-1.5 m) :      |
             |       :   drum head works face   :       |
             |       :..........................:       |
             |      /                          \        |
             |     / L4                      L3 \       |
             o----/------------------------------\-----o
           A4  [SD]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[CPN]  A3
                 ^ sealed dock inside the anchor web, so the robot reaches it on its own lines

      Site guide-line network (fixed lines) links cells, the dock and the hub for inter-cell moves.
```

**How the cell works.**

- **Cell rigging.** Four perimeter anchors, A1–A4, sit 12–18 m from the cell centre.
  - Boulder slings (straps round embedded clasts ≥2 m) are the bootstrap type. They need manipulation only, no driving force.
  - Once two slings hold, the robot can react the torque of driving screw-umbrella piles against them.
- **Mobility.** The robot moves as a cable-driven parallel robot: four winches pay out and haul in four anchor lines. There are no wheels and no legs.
  - Speed limit is ≤0.25 v_esc of the body, i.e. 0.04–0.15 m/s.
  - Line pretension is 30–80 N.
- **Benching.** The robot sits on an unexcavated bench at anchor elevation and reaches down into the pan with its boom.
  - It never digs under itself. Otherwise the lines would angle upward and lift it.
  - One bench pass covers about 20 m × 6 m × 1.5 m ≈ 230 t, taking about 2–3 weeks.
  - One cell level holds about 1,400 t, i.e. about 3–4 months per robot.
  - The robot then re-rigs to the next level or cell.
- **Hopper cycle.** The robot travels on its own lines to the sealed dock inside the web and transfers through a double-door port, then returns. A dock sits ≤20 m from any working point.
- **Inter-cell moves** use fixed guide lines installed during site build. During site build the robots themselves rig the lines (T21 site installation).

**Why not walking or wheels.** Traction is proportional to weight, and weight is effectively zero.

- Walking hexapods with microspines need a grip capacity on rubble that nobody has demonstrated. They also add 12–18 actuated joints, each exposed to dust (T24).
- Cable-driven mobility puts all motion actuators inside the sealed body and makes every force on the robot a measured line tension.

---

## 5. The robot (ACE-1)

### 5.1 General arrangement

```
          SIDE VIEW (deployed, working the pan from the bench)

        radiator (edge-on to Sun, 2 x 3 m², EDS-coated)
                 ||
   lidar/stereo  ||                         manipulator (7-DOF, 3 m) + grab / tool changer
        [o]======||==========================\\
   +---------------------------------------------+      tether reel (350 m) + level-wind
   | avionics | battery 30 kWh | PMAD +/-1 kV   |~~~~~~~~~~~~~~~~~~~~~~~~ to CPN
   |----------+----------------+-------------- |
   | W1  W2 (winches)     HOPPER 1.2 m³  W3  W4 |----- anchor lines L1..L4
   |          [alpha-beta transfer port]       |
   +==================SKID (3.0 x 2.4 m)========+
   ////////////////// BENCH /////////////////// \
                                                \  boom (3-DOF, 4.5 m reach)
                                                 \
                                            +-----\------+
                                            | HOOD + brush|
                                            |  skirt      |
                                            | (D1)  (D2)  |  <- counter-rotating up-cut drums
                                            +-------------+     0.5 m dia x 0.6 m wide each
   ................... PAN FACE (fines) ..............
```

### 5.2 Principal specifications

| Parameter | Value (reference) | Range / tolerance | Confidence | Basis |
|---|---|---|---|---|
| Dry mass, CBE | 2,130 kg | — | Low-medium | §5.8 bottom-up |
| Dry mass, MEV (25% margin) | 2,650 kg | Allocation 1,800–3,500 kg | Low-medium | Margin per early-concept practice |
| Stowed envelope | 3.0 × 2.4 × 1.3 m | — | Medium | Two units stack in a 5 m fairing; fits a bom-0-4 payload bay |
| Footprint (skid) | 3.0 × 2.4 m | — | Medium | — |
| Boom reach | 4.5 m | 3.5–5.5 m | Medium | Sets the 6 m swath and 1.5 m pan depth |
| Design life | 5 yr surface | 15,000 operating h; 10,000 cutting h with LRU swaps | Low | Drives, structure and PMAD |
| Head wear-LRU interval | 2,000 cutting h | 1,000–3,000 h | Low | Abrasive test is a pre-replication gate |
| Seal LRU interval | 1,500 h | 500–3,000 h | Low | T24 |
| Max body speed | 0.25 v_esc | Absolute 0.04–0.15 m/s | High (it is a rule) | Bound-on-detachment safety rule |
| Max tool-imparted particle speed | 0.3 v_esc | Absolute 0.05–0.18 m/s | High (rule); verification low | §7 |
| Nameplate dig rate (fines) | 2.0 t/h | 1–3 t/h | Low | §5.3 |
| Output per active robot | 4.0 kt/yr | 1.0–7.5 kt/yr | Low | §3.2 |
| On-board beneficiation | None (1:1) | 1.0–1.3 incidental from the grizzly | Medium | A4 |

### 5.3 Excavation head

| Item | Specification |
|---|---|
| Type | Enclosed counter-rotating drum pair (RASSOR lineage), **up-cut geometry** |
| Drums | 0.50 m diameter × 0.60 m wide each; 12 scoops each; 25 mm grizzly bars across scoop mouths |
| Speed | ≤2.0 rpm (ω ≈ 0.2 rad/s), giving tip speed ≤0.05 m/s on a 0.17 m/s body. The speed is scheduled to the measured v_esc of the target |
| Cut depth per pass | 3–8 cm (5 cm reference) |
| Advance speed | 4–10 mm/s (7 mm/s reference), set by boom and line pay-out |
| Steady drum torque (fines) | 3–30 N·m per drum (CBE). At 1–10 Pa cohesion, 10–100 N tangential at 0.25 m radius |
| Slip clutch | Adjustable 50–200 N·m per drum. **Set ≤50% of the demonstrated anchor transient capacity, referred to the head** |
| Motor and gear stall | 500 N·m per drum (over-rated for jam recovery, not for cutting) |
| Internal conveyance | Positive-displacement scoop-to-screw transfer into the hopper. **Gravity cannot be used**: the material is weightless |
| Mechanical power, fines | 20–200 W cutting and lifting; 200–600 W conveyance and seal friction |
| Electrical, head, typical | 0.5 kW (0.3–1.5) |
| Electrical, head, peak | 2 kW (jam reverse and clear) |
| Hood | Rigid enclosure. Brush and labyrinth skirt, 50 mm compliant stroke. Electrodynamic dust shield (EDS) on the window and sensor ports |
| Instrumentation | Six-axis F/T at the boom wrist; drum torque and speed; hood-internal particle imager; skirt-gap lidar |

**Why up-cut.** In the contact zone the scoops move upward and inward through the material. Material drag on the scoops therefore points down, so the head is *pulled into* the face.

- The boom holds the head back in tension.
- The reaction enters the robot as compression onto the skid and bench, not as uplift on the anchors.
- The two drums' horizontal components oppose each other.

**I do not credit any cancellation fraction (contra Gemini's 90–95%).** The residual six-axis load is a measured quantity. It is the T04 exit metric.

**What the head does not do.**

- It does not cut competent clasts. Ordinary-chondrite cobbles are tens to hundreds of MPa in strength, and cutting them would need multi-kW power and kN·m torques that no demonstrated anchor can react.
- The grizzly rejects anything over 25 mm. Cobbles of 25–400 mm (≤150 kg) are cleared by the grab into a windrow at the cell edge.
- Collection of cobbles for a plant crusher is a bom-0-3 decision. The grab and hopper can support it at about 0.5 t/h.

**Carried alternates (decided at the 0A downselect, §8):**

- **H-alt-1: sealed clamshell grab as primary collector.** Batch operation. Better containment and jam tolerance; lower rate, about 1–1.5 t/h.
- **H-alt-2: percussive comminution head** for boulder-dominated sites, at 5–10 kW. Only if the target gate forces it. The PMAD and tether already carry 15 kW for this reason.
- **Research only, not baselined (per A4): magnetic pick-up head.** Native Fe-Ni is ferromagnetic, so this is a potential beneficiation multiplier. It is tested on the pathfinder as an experiment.

### 5.4 Manipulator and grab

| Item | Specification |
|---|---|
| Arm | 7-DOF, 3.0 m reach, 300 N tip force continuous, 0.5–1.0 kN at the anchor tool |
| End effectors | Tool changer carrying a cobble grab (25–400 mm), sling installer, screw-pile driver (500 N·m, rotary with low-amplitude percussion), and servicing tools (LRU drivers, connector mates, cable handling) |
| Servicing interfaces | Standard robotic ORU interfaces on head, battery, reel, winch modules and avionics. Any ACE can swap any other ACE's LRUs (T21) |
| Power | 0.3 kW typical, 1.5 kW peak |

### 5.5 Anchoring and mobility (T16)

| Item | Specification | Note |
|---|---|---|
| On-board winches | 4 × capstan winch, 60 m line each, 0–0.15 m/s, tension-controlled to ±2 N | All drive elements inside the sealed body |
| Anchor lines | Vectran or aramid core with a braided stainless abrasion jacket. 5 kN break, 1 kN transient working, 200 N sustained working | Tension is logged at 1 kHz; slip is detected in <50 ms |
| Line pretension | 30–80 N | Kept low because anchors must resist pretension continuously |
| Carried anchors | 6 per robot: 3 boulder slings (strap plus ratchet), 3 screw-umbrella piles (1.5–3 m drive, 0.3 m umbrella) | About 25 kg each; reusable; 10% loss per re-rig assumed |
| **Required anchor capacity (per anchor, demonstrated)** | **≥200 N sustained, ≥1 kN transient (≤2 s)** | **Viability threshold for the concept as configured** |
| Fallback threshold | 100 N sustained / 500 N transient | Clutches de-rated, so the dig rate falls by about 30%. Still viable |
| Concept-break threshold | <100 N sustained | Switch to H-alt-1 (grab) with a minimal-reaction protocol, or reject the target |

The anchor capacity actually demonstrated is the single most important number in this item. It turns directly into the clutch setting, the cut depth and the dig rate. My ACH ranks the hypotheses as follows:

| Rank | Hypothesis | Status |
|---|---|---|
| 1 | Anchoring-limited | Most likely binding |
| 2 | Handling and conveyance-limited | Survives |
| 3 | Feedstock (fines availability) limited | Survives |
| 4 | Power-limited | Disconfirmed for the fines-collection baseline |

### 5.6 Power: tether, PMAD, battery (T09)

```
   bom-0-5 site bus                         bom-0-2 robot
   ---------------                         -------------
   [Arrays]--[Site storage 0.5-15 MWh]
        |
   [Site HV DC distribution]--(fixed cable, bom-0-5)--[CPN: cell power node]
                                                      | +/-1 kV bipolar, IMD*, breaker, fibre switch
                                                      |
                              ~~~~~~~ ROBOT TETHER (bom-0-2), 350 m on robot reel ~~~~~~~
                                                      |
                                       [slip ring]-[input breaker + pre-charge]
                                                      |
                                    [Isolated DC-DC 2 kV -> 270 V, 15 kW, 2 x 7.5 kW modules]
                                        |                   |                 |
                                [270 V motor bus]   [28 V avionics]   [battery charger]
                                 drums, winches,      dual-string        30 kWh Li-ion
                                 boom, arm, reel                         (24 kWh usable)
   *IMD = insulation-monitoring device (ground-fault detection on a floating bipolar system)
```

| Item | Value | Basis |
|---|---|---|
| Tether voltage | ±1 kV DC (2 kV pole-to-pole) | Inside the binding 1–3 kV range. Bipolar with a floating chassis holds conductor-to-structure stress to 1 kV, which eases partial-discharge and plasma-arcing risk at insulation defects |
| Tether rating | 15 kW, 7.5 A | Sized for H-alt-2 growth (10 kW head), not for the baseline |
| Conductors | 2 × 10 mm² Al alloy | 1.7 Ω round loop at 300 m; 95 W loss at 15 kW (0.6%); about 25 W at 8 kW |
| Data | 4 × single-mode fibre (2 active, 2 spare); 1 Gbps | Primary robot ↔ CPN link |
| Strength member | Aramid, 2 kN break. Working tension in service 2–10 N; ≤20 N on reel-in | **The tether is never an anchor line** |
| Jacket | Double insulation (PFA inner, ETFE outer) under a braided abrasion sleeve. Partial-discharge-free at 2× rating | T09 abrasion test item |
| Mass | 0.20 kg/m (0.15–0.25); 70 kg for 350 m | — |
| Lay rule | **Lay-and-leave, never drag.** The reel pays out matched to robot motion. Tension spike >20 N causes stop, back-off and re-path | In milli-g the cable stays where laid unless disturbed |
| Snag requirement | ≤1 snag-stop per 100 m retrieved; zero unrecoverable snags per 10 km | Ground rig and pathfinder metric |
| Battery | 30 kWh nameplate, 24 kWh usable; about 200 kg at about 150 Wh/kg pack level | Binding range 10–50 kWh |
| Battery sizing | (a) Tether-loss safe hold: 0.3 kW × 24 h = 7.2 kWh. (b) Untethered recovery move to a CPN: 2 kW × 3 h = 6 kWh. (c) Controlled retraction and park from full dig: 5 kW × 1 h = 5 kWh. (d) 20% reserve. Total ≈ 22 kWh usable | **No production digging on battery** (agrees with GPT and Claude) |
| Battery cycling | Floated at 70–80% SOC; deep cycles only in contingencies | Life is set by calendar, not cycles |
| Electrical load, robot average | 2.5 kW (1.5–5) | Housekeeping and avionics 0.6; thermal 0.4; head 0.5; conveyance 0.4; boom and winches 0.3; float charge 0.3 |
| Electrical load, robot peak | 8 kW | Recharge 4 + winch haul 2 + head jam 2 |

### 5.7 Thermal, avionics, comms, contingency propulsion

| Subsystem | Specification |
|---|---|
| Thermal | 2 × 3 m² deployable radiators, two-sided, kept edge-on to the Sun by a mast yaw drive, with EDS-coated OSR surfaces. Reject 1.0–1.5 kW at 300 K net of surface IR loading. Motors run hot (windings to 150 °C) and reject partly by conduction into the skid. Battery 0–30 °C; electronics −20 to +50 °C; heaters 150–400 W at night |
| Avionics | Dual-string rad-tolerant flight computer for fault protection and reflexes, plus a perception co-processor (radiation-screened, supervised). 6 stereo camera pairs, 3 lidars, 6-axis F/T at the wrist and arm, 4 line-tension cells, IMU, sun sensors. Hosted particle and witness sensors are provided by bom-0-15 |
| Comms | Primary: fibre in the tether, to the CPN and the hub. Backup: site RF mesh, 1–2 Mbps at ≤1 km. **No direct-to-Earth link on the robot.** All Earth traffic goes through bom-0-9 |
| Contingency propulsion | Cold-gas N₂, 15 kg at 30 MPa, 4 × 1 N thruster pairs. Δv about 0.4 m/s at Isp ≈ 70 s, enough for several returns from a bound drift at ≤0.25 v_esc. **Never used for station-keeping during digging** (plume lofting). Nominal use is zero; the fleet allowance is ≤30 kg/yr. Loaded at launch, no resupply. This is not an EP propellant and adds no bom-0-16 demand |

### 5.8 Mass budget (bottom-up, CBE)

| Subsystem | kg | Basis |
|---|---|---|
| Skid and primary structure (Al-Li / CFRP) | 260 | 3.0 × 2.4 m frame; launch and tug loads; structural reserve plus servicing interfaces (not "human-rating") |
| Excavation head (drums, hood, drives, clutches, seals, liners) | 240 | Up from round-1 60–80 kg; inside the A8 range (150–800) |
| Boom, 3-DOF, 4.5 m | 150 | Carries head reactions ≤1 kN transient |
| Manipulator, 7-DOF, plus tool changer and 4 tools | 120 | — |
| Hopper 1.2 m³, sealed, with α-β transfer port | 140 | — |
| Anchoring (4 winches, lines, 6 anchors, installer) | 290 | Anchors 150, winches 80, installer and driver 60 |
| Tether management (reel, level-wind, slip ring, 350 m cable) | 150 | Cable 70 |
| Power (DC-DC 15 kW 60, battery 200, PMAD and harness 60) | 320 | — |
| Thermal (radiators, mast, heaters, MLI) | 120 | — |
| Avionics and sensors | 120 | — |
| Comms (RF mesh backup; fibre transceivers) | 15 | — |
| Contingency cold gas (dry 35 + N₂ 15) | 50 | — |
| Dust protection (covers, EDS, bellows) | 50 | — |
| Harness, fasteners, misc. | 100 | — |
| **CBE total** | **2,125** | — |
| Margin 25% | 530 | — |
| **MEV** | **2,650** | Allocation range 1,800–3,500 |

**Comparison with round 2.**

- Claude 2,500 (1,600–4,000): consistent.
- Gemini 2,800 (2,400–3,200): consistent.
- GPT 3,000–5,000: high. GPT's figure is driven by its 25–70 kW battery logic, which the tether architecture removes. I agree with GPT that site infrastructure is excluded.

---

## 6. Interfaces

| To | What crosses | Value | In bom-0-2? |
|---|---|---|---|
| **bom-0-3** Processing plant | Run-of-mine fines through the sealed dock | 22 kt/yr reference (4–42); top size ≤25 mm; fines unmodified (1:1); delivery in 1.2–1.6 t hopper loads through a 0.6 m α-β double-door port | **Robot-side port only.** The dock, surge bin and inlet are bom-0-3. I support GPT on **not freezing** a 1–2 t canister: the robot specifies its hopper and port, and bom-0-3 chooses the surge capacity |
| bom-0-3 | Optional cobble stream | ≤0.5 t/h per robot when tasked | Grab only |
| **bom-0-5** Site power | ±1 kV DC at each CPN | 0A: 6 kW avg, 16 kW peak. 0B reference: 25 kW avg, 70 kW peak. Distribution designed to 120 kW | **No.** CPNs, site cabling and storage are bom-0-5. Robot tethers and reels are in bom-0-2 |
| bom-0-4 Tugs | Delivery and deployment | 0A: 2 × 2.65 t + 0.8 t kit. 0B: 11 × 2.65 t + 3–5 t kit, across 2–3 tug cycles. Surface release at ≤5 cm/s from a hold-off boom | No (transport) |
| bom-0-8 Launch | Launch loads and envelope | Two per 5 m fairing; quasi-static 6 g axial assumed | No |
| bom-0-9 Comms | Data to Earth via the hub | 0A: about 5 Gbit/day per pathfinder. 0B: about 0.3 Gbit/day per robot (2.4 Gbit/day fleet ≈ 30 kbps average). On-site logging 2–10 GB/day per robot | No. I reject the round-1 230 Mbps figure |
| bom-0-10 Mission ops | Daily goal sets, anomaly response | §9 | No |
| bom-0-11 NRE | EDU, QM, test rigs, life tests | §10.2 | **No** (robot NRE lives in bom-0-11) |
| bom-0-12 0A pathfinder | Carrier, CPN, dock and power for the 2 pathfinders | — | **Robots only.** Carrier and site kit are bom-0-12 |
| bom-0-14 Spares | Wear LRUs, anchors, tethers | 0B: $15–40M/yr indicative (§10.4) | No. Replacement **robots** are in bom-0-2; LRUs are in bom-0-14 |
| bom-0-15 Debris and contamination | Containment allocation, hosted sensors, tailings | §7 | Robot-side containment hardware only |
| bom-0-6 Water pilot | Feed if C-type | Same port; ≤1 kt/yr | Excavation stays in bom-0-2 (A14) |
| **bom-0-1** Scouts | Site maps; **anchor and penetrometer package** | I recommend that ≥2 scouts carry a 20–40 kg anchor-pull and penetrometer package | No. **Recommendation to bom-0-1** |

---

## 7. Containment (T08): robot-side allocation

bom-0-15 owns the site requirement and the ALARP ceiling (D-03). bom-0-2 proposes the following robot allocation, which uses velocity and enclosure as the verifiable controls.

| ID | Requirement | Value | Verification |
|---|---|---|---|
| MR-C1 | Tool-imparted particle velocity | ≤0.3 v_esc of the target, for all robot motions | Drop-tower and parabolic DEM validation; high-speed imaging in the pathfinder hood |
| MR-C2 | Body speed | ≤0.25 v_esc | Flight software limit, independently monitored |
| MR-C3 | Release outside the hood or hopper envelope, <1 mm grains, any velocity | ≤10 kg per robot per yr design goal (≈2.5 ppm of 4 kt/yr) | Witness plates, hood-skirt imager, mass balance (hopper vs dock) |
| MR-C4 | Release outside the envelope at >0.5 v_esc | ≤1 kg per robot per yr design goal | Inferred from MR-C1 and C3 distributions; witness-plate trajectory reconstruction |
| MR-C5 | Transfer-port release per dock cycle | ≤5 g | Vacuum-chamber cycle tests (≥2,000 cycles) |
| MR-C6 | Automatic stop rules | Stop the head when a hood-skirt gap exceeds 20 mm, a particle-imager count exceeds threshold, or a bom-0-15 site monitor alarms | Pathfinder |

**Reasoning.**

- I adopt Claude's position that mass fraction is the wrong governing variable.
- I tighten Claude's 0.5 v_esc to **0.3 v_esc for robot-imparted velocity**, because the plant and dock will add their own release mechanisms and need headroom.
- I reject Gemini's fixed 0.2 m/s. It roughly equals v_esc on Bennu-class bodies, so as a fixed number it protects nothing.
- MR-C3 and MR-C4 are allocations for bom-0-15, not standards. The ceiling itself goes to modelling and to the licensing state.

**Tailings.** Robots do not own tailings. The ACE hopper and port are, however, reversible: a robot can take a tailings load at the dock and place it in a mined-out pan as backfill. At the reference 21 kt/yr this needs about 5,000 robot-h/yr, equal to +2 robots ($56–120M). **I offer this to bom-0-15 as a priced option, not baselined scope.**

---

## 8. Development roadmap and technology readiness

### 8.1 TRL plan for the critical technologies this item carries

| Tech | Now | 0A internal milestone (TRL 4–5) | KDP-0B (TRL 6, no waivers) | Relevant-environment evidence |
|---|---|---|---|---|
| T04 Excavation | 2–3 | TRL 4 (2029): up-cut drum six-axis loads in vacuum, in reduced-cohesion simulant, plus parabolic-flight segments. TRL 5 (2031): QM head 1,000 h in a thermal-vacuum (TVAC) simulant bed | Pathfinder: ≥500 cutting h and ≥300 t collected at the target; measured six-axis envelope inside clutch limits | **Flight only.** Ground cannot reproduce milli-g with Pa cohesion |
| T16 Anchoring and mobility | 2–4 | TRL 4: anchor pull-out in simulant beds; sling-on-boulder tests. TRL 5: cable-driven mobility on an air-bearing floor with a full-scale mock-up | ≥30 anchors set, ≥100 load cycles each, capacity distribution meeting §5.5 thresholds at the target | Scout package (bom-0-1) gives early data; the pathfinder confirms |
| T09 Tether | 2–4 | TRL 4: PD-free at 2× in TVAC with dust. TRL 5: 10 km lay and retrieve on a boulder-simulant field, giving snag rate | ≥3 km laid and retrieved with ≤1 snag-stop per 100 m; jacket wear ≤30% of allowable after 1 yr | Pathfinder |
| T10 Autonomy | 2–4 | TRL 4: closed-loop dig-and-dock in simulation with digital twin and light-time. TRL 5: QM autonomous 72 h campaigns in the TVAC bed | ≥95% of cutting hours without ground intervention; ≤1 intervention per 50 h; zero safety-rule violations | Pathfinder |
| T21 Robotic maintenance | 2–4 | TRL 4: LRU swap on a mock-up. TRL 5: QM-to-EDU peer swap in TVAC | ≥3 peer LRU swaps (head, battery, reel) completed between P1 and P2 at the target | Pathfinder pair. **This is why two flight units are needed** |
| T24 Dust-tolerant mechanisms | 2–5 | TRL 5: 2,000 h abrasive life on seals and the α-β port, ≥2,000 port cycles | Measured wear rates confirm LRU intervals within 2× | Pathfinder plus ground life test continuing in parallel |
| T08 Containment (shared with bom-0-15) | 2–3 | TRL 4: DEM-validated release distributions. TRL 5: hood and skirt in TVAC with imaging | MR-C1 to C5 met at the target | Pathfinder with bom-0-15 instruments |

### 8.2 Programme timeline (notional; tied to target selection)

```
 2027      2028      2029      2030      2031      2032      2033      2034      2035      2036+
  |---------|---------|---------|---------|---------|---------|---------|---------|---------|
  [Concept trades, DEM, ACH test series]        (bom-0-11)
            [Scout anchor/penetrometer pkg flies] (bom-0-1 recommendation)
                 [EDU build + test]  TRL 4 ---->|
                        [QM build, TVAC life tests] TRL 5 ------>|
                              [PF-1/PF-2 flight build, AI&T] ---->|
                                                  [Launch + cruise (bom-0-12)]
                                                            [Pathfinder surface ops 12-24 mo]
                                                                      |=== KDP-0B ===|
                                                                               [0B production,
                                                                                delivery 2037-39]
   Downselect head concept (drum vs grab): 2029 PDR       Freeze 0B config: at KDP-0B + 6 mo
```

### 8.3 0A pathfinder fleet

**Two flight pathfinders (PF-1, PF-2), plus one QM on the ground (bom-0-11).** Not three flight units.

1. Two flight units give a peer-servicing pair, which is the only way to retire T21 at TRL 6, and one-failure tolerance for learning.
2. A third flight unit ($55–110M) buys less than a QM that can be tested to failure on the ground and run on a life test concurrent with flight.
3. The 0A objective is evidence, not production. GPT's argument that losing one of three robots raises required duty applies to 0B production, not to 0A characterisation.

Pathfinders are full-scale and differ from 0B units in two ways. They carry an extra instrumentation package: wrist and drum six-axis cells at 1 kHz, hood high-speed imaging, extra line-tension channels, and a magnetic pick-up research head. They also carry hosted bom-0-15 witness plates.

### 8.4 KDP-0B exit criteria owned by bom-0-2 (all must pass; no waivers)

| # | Criterion | Threshold |
|---|---|---|
| G1 | Demonstrated sustained dig rate in target fines | ≥1.25 t/h averaged over ≥200 cutting h |
| G2 | Extrapolated per-robot output with 0B availability model | ≥2.5 kt/yr; otherwise the fleet is re-sized and the economics gate re-run |
| G3 | Anchor capacity distribution (≥30 anchors) | P10 ≥200 N sustained, ≥1 kN transient |
| G4 | Measured six-axis head envelope | ≤50% of P10 anchor capacity at the clutch setting used |
| G5 | Tether snag and abrasion | ≤1 snag-stop per 100 m; jacket wear consistent with ≥2 yr life |
| G6 | Autonomy | ≥95% intervention-free cutting hours over the last 90 days |
| G7 | Peer servicing | ≥3 successful LRU swaps |
| G8 | Containment | MR-C1 to C5 met; no stop-rule breach unexplained |
| G9 | Wear | Head and seal wear rates support ≥1,000 h LRU intervals |
| G10 | Feed acceptance | bom-0-3 confirms pathfinder fines meet its feed spec, including metal grade within the 8–18 wt% acceptance band |

---

## 9. Autonomy, control and operations

### 9.1 Control hierarchy

```
 EARTH (bom-0-10)          weekly campaign plan, daily goal sets, anomaly adjudication
   |  RTLT 1-25 min; contacts per bom-0-9 schedule
 SITE EXECUTIVE (hub computer, bom-0-3/0-10 host)   cell allocation, dock scheduling, power
   |  fibre / RF mesh, ms latency                   budget negotiation with bom-0-5, fleet health
 ROBOT DELIBERATIVE LAYER   pass planning, line-length kinematics, re-rig planning, LRU swaps
   |
 ROBOT REFLEX LAYER (rad-tolerant, independent)  <=50 ms: anchor-slip -> head stop + clutch
                                                 release; speed > 0.25 v_esc -> brake lines;
                                                 tether loss -> battery + park; hood gap -> stop
```

### 9.2 Requirements

| ID | Requirement | Value |
|---|---|---|
| MR-A1 | Autonomous execution horizon without ground contact | ≥14 days (covers conjunction degradation and DSN-independent ops) |
| MR-A2 | Intervention rate (0B) | ≤1 per robot per 50 cutting h |
| MR-A3 | Reflex latency, anchor slip to head stop | ≤50 ms |
| MR-A4 | Safe-park from any state on battery | ≤15 min, then ≥24 h hold |
| MR-A5 | Perception | 1 cm terrain map within 5 m of the head, refreshed ≤1 s. Line and tether path map at 5 cm across the cell |
| MR-A6 | Fault protection independence | The reflex layer runs on separate hardware from the perception and deliberative layers |
| MR-A7 | Digital twin | Ground and site twin updated daily from logs. Every new behaviour is gated in the twin before flight upload |

### 9.3 Operations staffing

Staffing is charged to bom-0-10. My estimate of robotics operations staff is 8–14 FTE in 0A and 10–18 FTE in 0B. Most of this is engineering analysis of load and wear data, not teleoperation.

---

## 10. Cost analysis

### 10.1 Basis

- **Recurring unit cost.** Cost-per-kg analogy to low-volume planetary robotic hardware with complex mechanisms: $15–35k/kg of dry mass for a first unit, giving $32–75M for 2.13 t CBE.
  - Pathfinders carry extra instrumentation and single-unit integration: about 1.5×.
  - 0B production units use a 90% learning curve across 11 units, giving about 0.7× of first-unit cost.
- **Cross-check.** Recent lunar robotic rover programmes have spent of order $10⁸ per vehicle at sub-tonne scale including NRE. My recurring figures sit below that once NRE is removed. Consistent at **low confidence**.
- **Excluded from bom-0-2:**
  - NRE (bom-0-11)
  - Launch and delivery (bom-0-8/0-4)
  - Site power and CPNs (bom-0-5)
  - Dock and inlet (bom-0-3)
  - Spares LRUs (bom-0-14)
  - Operations (bom-0-10)
  - Containment sensors and tailings (bom-0-15)

### 10.2 bom-0-2 cost by phase

| Line | Qty | Unit (USD) | Total range | Reference | Phase |
|---|---|---|---|---|---|
| Pathfinder flight robots PF-1, PF-2 | 2 | $55–110M | $110–220M | $150M | **0A** |
| Pathfinder instrumentation and research head | 2 sets | $5–12.5M | $10–25M | $20M | **0A** |
| **0A subtotal (bom-0-2)** | | | **$120–245M** | **$170M** | |
| 0B production robots (initial) | 8 | $28–60M | $225–480M | $320M | **0B (gated)** |
| 0B replacement robots | 3 (2–5) | $28–60M | $85–180M (at 3) | $120M | **0B** |
| Production line restart and tooling | 1 | — | $20–40M | $30M | **0B** |
| Flight acceptance (11 units) | — | — | $15–30M | $25M | **0B** |
| **0B subtotal (bom-0-2), reference 8+3** | | | **$345–730M** | **$500M** | |
| **bom-0-2 total** | | | **$465–975M** | **$670M** | |

**0B scaling at the gate.** Reference 8+3 is $500M. The low-demand case (3+1) is about $160–260M. The high case (14+4, which I would cap at 16) is about $600–1,100M.

### 10.3 Robot NRE (carried in bom-0-11, shown for completeness)

| Element | Range | Reference |
|---|---|---|
| Concept, DEM and simulant programme, ACH test series | $40–80M | $55M |
| EDU (full-scale) and air-bearing and gravity-offload facilities | $60–120M | $85M |
| QM build and TVAC simulant life-test facility (5,000 h campaigns) | $90–180M | $130M |
| Anchoring test beds, parabolic and drop-tower campaigns | $30–70M | $45M |
| Tether and PMAD qualification | $20–50M | $35M |
| Autonomy software, digital twin, V&V | $50–120M | $80M |
| Systems engineering, project management and reviews | $10–30M | $20M |
| **Total** | **$300–650M** | **$450M** |

This is lower than Claude ($400–800M) and GPT ($400–900M) because I exclude dust and transport research (bom-0-15) and the anchoring precursor (bom-0-1 package). Including those, the numbers converge at about $400–800M.

### 10.4 Robot-driven demand on other lines (indicative, for their owners)

| Line | Demand |
|---|---|
| bom-0-14 | Wear LRUs at 0B reference:<br>• about 9 head liner sets per year (12k cutting h ÷ 2k h) at $0.5–1.5M<br>• about 12 seal kits per year<br>• about 4 tether replacements per year<br>• about 30 anchors per year<br>Total about **$15–40M/yr** |
| bom-0-8/0-4 | **6.1 t** (0A) and **32–34 t** (0B) delivered to the target |
| bom-0-5 | 0A: 6 kW avg / 16 kW peak. 0B: 25 kW avg / 70 kW peak. Negligible next to the plant's 0.5–2 MW |
| bom-0-15 | Optional tailings backfill (+2 robots, $56–120M) |

The robot-campaign total, including NRE and excluding launch, operations and shared site infrastructure, is about **$0.8–1.6B**.

---

## 11. Where I disagree with the round-2 figures, and why

| Topic | Round-2 position(s) | My position | Why |
|---|---|---|---|
| Fleet basis | Water-first chains (all three) | **Fe-Ni grade × recovery**: 22 kt/yr reference, 4–42 kt/yr | The binding architecture changed the product |
| Quantity | Claude 8+4; Gemini 12+8; GPT 6+6 | **0A: 2 flight (+1 QM in bom-0-11). 0B: 8+3 reference, 4–16 range, fixed at KDP-0B** | Gemini's 20 is not supported by any Fe-Ni closure. GPT's 6 replacements on 6 is a loss forecast I share GPT's own objection to |
| Pathfinders | Claude 3, GPT 3, Gemini 2 | **2 flight + 1 ground QM** | §8.3 |
| Excavation power | Claude 7 kW peak; Gemini 8 kW (high confidence); GPT 25–70 kW | **2.5 kW average, 8 kW peak electrical. Tether and PMAD rated 15 kW for growth** | Fines collection is load-path-limited. I reject GPT's figure as a baseline and Gemini's "high confidence" as unearned |
| Test rig | Claude 10 kW, 10 kN·m stall per wheel | **15 kW, 2 kN·m stall per drum, full six-axis** | 10 kN·m implies about 40 kN at the rim, roughly 40× any credible anchor capacity. The robot could never react it, so it only informs clutch design, and 2 kN·m bounds that |
| Mechanism | Bucket wheel (Gemini); candidates (Claude, GPT) | **Enclosed up-cut drum pair baseline; grab and percussive head as alternates; downselect at PDR 2029** | Up-cut geometry turns the steady reaction into bearing, not uplift. No cancellation credited until measured |
| Mobility | Walking (Claude); gantry (Gemini); bounded tethered (GPT) | **Cable-driven parallel robot inside pre-anchored cells** | Traction is near zero. This moves all mobility actuators inside the sealed body |
| Duty | Claude 1,500 h; Gemini 1,300 h; GPT 25% | **0A: 400–1,000 h. 0B: 2,000 h (1,000–3,000)** | The tether removes the illumination limit. First-flight characterisation removes optimism in 0A |
| Battery | 15–40, 30–50, 10–30 kWh | **30 kWh (24 usable), safe-mode and recovery only** | Within the binding range; derived from §5.6 cases |
| Velocity rule | Claude 0.5 v_esc; Gemini fixed 0.2 m/s; GPT none | **0.3 v_esc tool, 0.25 v_esc body** | Body-relative and verifiable; leaves allocation headroom for plant release |
| Containment metric | Mass fraction or kg/yr | **Velocity + enclosure envelope + kg/yr allocations to bom-0-15** | Combines Claude's control variable with GPT's full-cycle accounting |
| Canisters | Claude and Gemini 1–2 t; GPT do not freeze | **Do not freeze. Robot hopper 1.2 m³; bom-0-3 owns surge sizing** | Agree with GPT |
| Cutting life | Claude 7,500 h; GPT 11,000 h | **10,000 cutting h for structure and drives; 1,000–3,000 h head LRU intervals** | Life is achieved by LRU replacement, not by intrinsic wear life |
| Torque | Gemini about 1,000 N·m at 2 kW; GPT 2–25 kN·m | **3–30 N·m steady; 50–200 N·m clutch; 500 N·m stall** | At ≤0.05 m/s tip speed and Pa cohesion, steady torque is small. The design question is transient capping |

---

## 12. Risk assessment

| # | Risk | L | C | Mitigation | Residual |
|---|---|---|---|---|---|
| R1 | Anchors cannot reach 200 N sustained in target rubble (T16) | **High (40–60%)** | Project-ending for this concept | Scout anchor package (bom-0-1) before PF build; boulder-sling bootstrap; fallback thresholds §5.5; grab alternate; target-rejection criterion | Medium |
| R2 | Productivity falls ≥2× short of 2 t/h | **High (50–70%)** | Fleet doubles or the gate fails | G1/G2 gate; fleet sized at KDP-0B, not before | Medium |
| R3 | Metal grade or recovery below 8% / 50% at the target | Medium | Excavation demand doubles to triples | Target gate (bom-0-1); feed acceptance G10 | Medium |
| R4 | Fines fraction <60% in accessible ponds | Medium | Comminution head (H-alt-2) needed at +5–8 kW and +150 kg | 15 kW tether margin; ponds as a site-selection requirement | Medium |
| R5 | Tether snag or abrasion | Medium | Robot immobilised; tether replacement | Lay-and-leave rule; reel tension control; ground snag rig; battery recovery | Low-medium |
| R6 | HV insulation breakdown, arcing in plasma and dust | Low-medium | Robot and CPN loss | ±1 kV bipolar floating; IMD; PD testing at 2×; double jacket | Low |
| R7 | Seal and port wear faster than 500 h | Medium | Spares demand ×3; downtime | Life tests before replication; LRU design; Phase 1 hook for local Fe-Ni wear parts | Medium |
| R8 | Robot detachment from the surface | Low | Robot loss | 0.25 v_esc rule; cold-gas return; line-brake reflex | Low |
| R9 | Unexpected dust lofting or electrostatic release | Medium | Licence or contamination exceedance; array degradation | MR-C rules; stop rules; hood imaging; bom-0-15 monitoring | Medium |
| R10 | Autonomy immaturity: high intervention rate | Medium | Throughput loss; ops cost | Digital twin; 14-day autonomy requirement; gate G6 | Medium |
| R11 | Unit cost growth beyond $60M | Medium | 0B over budget | CER refresh at PDR; design to cost; commonality | Medium |
| R12 | Licence conditions impose limits the design cannot meet | Low-medium | 0B blocked | bom-0-7 jurisdictional review before PDR; velocity-based controls are verifiable by a regulator | Low-medium |
| R13 | Peer servicing fails, so every fault is a loss | Medium | Replacements ×2–3 | T21 gate G7; standard ORUs | Medium |

---

## 13. Manufacturing considerations

- **Volume.** 2 pathfinders, 1 QM, 1 EDU, and 4–16 production units. This is small-batch aerospace integration, not series manufacturing.
  - Production units are built in two lots: initial and replacements.
  - Line restart costs ($20–40M) are explicit.
- **Commonality.**
  - One LRU set is used fleet-wide: head, battery, reel, winch modules, avionics boxes.
  - Pathfinder and 0B units share primary structure. Configuration changes after KDP-0B are limited to LRUs where possible, so pathfinders can be upgraded in situ by peer swap.
- **Materials.**
  - Drum scoop liners: WC-Co hard-facing on a tough steel substrate.
  - Seals: PTFE-filled labyrinths with sacrificial brush stages.
  - Gear-heads: sealed and bellows-protected, with dry-film lubrication (sputtered MoS₂) where dust ingress is possible.
  - No wet lubricants are exposed to dust.
- **Dust-tolerant assembly.** No exposed sliding interfaces outside sealed modules. All connectors are robotic blind-mate types with dust doors.
- **Supply chain.**
  - Long-lead items: rad-tolerant processors, space-qualified Li-ion cells, HV DC-DC modules, aramid and Vectran lines.
  - Second sources are identified at PDR.
- **Phase 1 hook.** Wear parts (liners, scoops, anchor flukes) are specified to be makeable from on-site Fe-Ni once bom-0-3 product exists. This is a design-for-local-manufacture requirement on geometry and tolerances, not a Phase 0 commitment.

---

## 14. Open engineering questions and what would settle them

| Question | Why it matters | What settles it | Falsifier (what would change my design) |
|---|---|---|---|
| Real anchor capacity in target rubble under cyclic load | Sets clutch, cut depth, rate, and viability | Scout anchor package, then pathfinder (≥30 anchors) | P10 <100 N sustained: drop the drum baseline, move to the grab, or reject the target |
| Is the up-cut drum net reaction toward the material in Pa-cohesion fines? | Core of the load-path concept | Vacuum simulant tests with a six-axis rig; parabolic segments; DEM | Net uplift >30% of the cutting force: add hold-down lines to anchors below bench level, or switch to the grab |
| Free-metal grade and its size partitioning in fines | Sets M_exc by 2–5× | Scout spectroscopy plus a sample assay; pathfinder feed to bom-0-3 | Metal concentrated in >25 mm clasts: robots must collect cobbles and the plant needs a crusher |
| Depth and extent of fines ponds | Fines availability (H3) | Scout radar and penetrometer | Ponds <0.2 m thick: comminution head (H-alt-2) |
| Tether snag rate on real boulder fields | T09 viability | Ground rig, then pathfinder | >5 snag-stops per 100 m: move CPNs to every cell and shorten tethers to ≤50 m |
| Electrostatic lofting from disturbed surfaces | Containment | Pathfinder hood imaging and witness plates (bom-0-15) | >10% of fugitive mass escaping: enclosed-cell canopy needed (bom-0-15 scope) |
| Seal and port wear in vacuum fines | Spares, availability | 2,000 h QM life test | <500 h intervals: re-design before KDP-0B |
| Optimum cut depth vs lofting vs rate | Throughput | Pathfinder parameter sweep | — |
| Should robots own tailings backfill? | Fleet +2; containment | bom-0-15 trade | — |
| Magnetic pick-up head value | Could lift effective grade 2–4×, cutting fleet size | Pathfinder research head | Clean metal pick-up ≥2:1 concentration at ≥70% metal recovery would justify revisiting A4 at KDP-0B |

---

## 15. Requested owner decisions for this item

1. **Adopt** the ACE concept (anchored cell, cable-driven mobility, enclosed up-cut drums, ±1 kV tether, 30 kWh battery) as the bom-0-2 reference for 0A design. Downselect the head at PDR 2029.
2. **Fund 0A bom-0-2** at $120–245M (ref $170M) for 2 flight pathfinders. Carry robot NRE of $300–650M in bom-0-11.
3. **Hold 0B** at a reference of 8 + 3 units ($345–730M, ref $500M) as a gated real option. Fix N at KDP-0B using §3 and the G1–G10 criteria.
4. **Direct bom-0-1** to fly an anchor and penetrometer package on ≥2 scouts. This retires the largest project-ending risk (R1) years before pathfinder build.
5. **Direct bom-0-15** to adopt the velocity-plus-envelope containment controls (MR-C1 to C6) as the robot allocation under the D-03 interim ceiling.