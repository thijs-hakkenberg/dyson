---
step: inventory
item: inventory
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
generated: 2026-10-12T23:50:35.333Z
seconds: 382.269
---

# Phase 0 critical technology inventory review (revised architecture)

**Scope.** This is an inventory review, not the rating round. It decides what gets rated and at what requirement. It flags legacy evidence that cannot carry forward, but it assigns no new TRL or AD² values.

**Standing assumptions**
- Anything tagged 0B must reach its D-02 target by KDP-0B. Its maturation therefore happens in 0A.
- Heritage is cited only where I am confident. Uncertain items are marked "(unsure)".

---

## 0. Cross-cutting findings

These findings change several requirements, so they come first.

1. **The mass flow does not close at the low corner.**
   - Tailings of 13–47 kt/yr plus 2–8 kt/yr concentrate imply an ore feed of about 15–55 kt/yr. That is an average of about **1.7–6.3 t/h**, continuous.
   - The excavation fleet's capacity ranges from 6 × 0.5 t/h × 9% = **0.27 t/h** to 20 × 5 t/h × 25% = **25 t/h**. The low corner is short by about 6–23×.
   - Applying 4–15:1 across the full 2–8 kt range would give 8–120 kt/yr feed and 6–112 kt/yr tailings, not 13–47.
   - Product of 0.6–2.5 kt/yr from 15–55 kt/yr ore is about 1–17% overall metal recovery. That is plausible for LL to H ordinary chondrites (bulk metal roughly 2–19 wt%), but only if recovery is high for low-metal feed.
   - **Action:** fix one consistent mass balance before KDP-0A. Each "required" field below is restated as feed throughput.

2. **The plant heat exceeds the plant power.** 9 MWth of waste heat exceeds 8 MW of site power. This is only possible if solar-thermal input (concentrators) is counted, and that is not in the power line. State the heat source, or cap waste heat at no more than site power.

3. **The rotating-module geometry does not give the stated gravity.** Using g = ω²r:
   - 1.5 rpm at 5 m gives **0.013 g**.
   - 4 rpm at 20 m gives **0.36 g**.
   - Getting 0.05–0.15 g needs about 20–60 m radius at 1.5 rpm, or about 2.8–8.4 m at 4 rpm.
   - **Action:** state the requirement as a g-level plus maximum Coriolis and gradient limits. Gradient across a bath of depth h is h/r, which is 20% for 1 m at 5 m radius.

4. **The water pilot target conflicts with the metal product.** The water pilot is "only at a C-type target". CI/CM bodies carry essentially no native Fe-Ni, so the pilot cannot share the Fe-Ni site. It implies a second site or a scout-hosted experiment. T13 is conditional on that decision.

5. **Site power cannot be carried through the night with the stated storage.**
   - NEA rotation is typically 2–20 h. An 8 MW surface site needs about 8–80 MWh of night-side storage at 100% depth of discharge.
   - At the shallow depth of discharge needed for 9,000–33,000 cycles over 10–15 yr, that requires much more installed capacity.
   - The 0.5–15 MWh storage fits only free-flying arrays in continuous sun or night curtailment.
   - **Action:** decide the site power topology. The choice adds or removes a technology (free-flyer-to-surface power transfer).

6. **The tug propellant load rules out xenon.**
   - Assumptions: 2.5 MWe, efficiency η 0.6, Isp 2,500 s. That gives thrust F ≈ 2ηP/vₑ ≈ 120 N and mass flow ≈ 5 g/s ≈ 18 kg/h.
   - Over 20,000–40,000 h this is **≈360–720 t per tug**, or about 145–290 t at 1 MWe.
   - The fleet lifetime total is about 1.5–13 kt.
   - World xenon output is tens of tonnes per year (order of magnitude; unsure of the exact figure), so xenon is excluded. Krypton is likely marginal (unsure of supply figures). Iodine (world output order of 30 kt/yr per USGS-type figures) and argon are not supply-limited.
   - Propellant storage and feed at hundreds of tonnes per tug is a technology in its own right.

7. **Legacy evidence must be stripped before rating.**
   - These items are design studies or deliberations, not evidence, and are inadmissible for TRL ≥3:
     - rq-0-xx deliberations
     - "multi-model consensus"
     - Paper 05 Monte Carlo
     - the ULA patent
   - Specific claims to correct:
     - **"AEPS at TRL 8–9":** Gateway PPE has not flown to my knowledge, so this is unsupported.
     - **"NEA Scout launched":** it launched on Artemis I (2022) but never established contact. It is not heritage.
     - **"Starlink operational statistics":** these are unpublished and not citable test data.
     - **"Zero channel erosion (Frieman AIAA-2019-3895)":** magnetic shielding does sharply reduce channel erosion, but pole-cover erosion becomes the life limiter. I cannot confirm the citation number.

8. **Bugs in the legacy code.**
   - `getMaxTRLGap` is identical to `getTRLGap`. The minimum gap should use `currentTRLMax`.
   - `getTRLStats` ignores ranges.
   - Legacy targets of TRL 7–8 conflict with D-02, which sets TRL 6 at KDP-0B for project-ending items.

---

## 1. Candidate dispositions

### T01 — MW-class SEP cluster: **split**

T01 keeps the thrusters and power processing units. Propellant storage and feed moves to T14.

**Required (corrected):**
- 1.0–2.5 MWe per tug, made as a cluster of thrusters at about 100–250 kW each.
- Isp 2,000–3,000 s.
- Iodine (reference) or argon (alternate).
- Per-thruster qualified life and propellant throughput (kg) must be stated, not just tug hours.
- Over a 10–15 yr life with 1.5–5 yr round trips, the 20,000–40,000 h figure must be confirmed as per-tug lifetime thrust time. Over 5 yr, 40,000 h is about a 91% thrusting duty.

**Environment:**
- Deep space at 0.9–1.3 AU (or the target's aphelion).
- Iodine corrosion of PPUs, cathodes and arrays.
- Plume interaction with arrays and radiators.

**Heritage and scale:**

| Item | Scale | Status |
|---|---|---|
| X3 nested Hall thruster (Univ. Michigan/NASA, ~2017–18) | ~100 kW class | Ground |
| AEPS/HERMeS | 12.5 kW | Not yet flown |
| NEXT long-duration test | ~51,000 h reported | Ground |
| NEXT-C on DART (2021–22) | — | Flown |
| Iodine gridded-ion NPT30-I2, Beihangkongshi-1 (Rafalskyi et al., *Nature* 2021) | ~tens of W | Flown |
| SpaceX argon Hall thrusters | Few kW (company figures, unsure) | Flown |

- Ratio to requirement: about 10–25× the largest single-thruster ground test.
- About 20–50× the largest flown or flight-built SEP system, which is ~tens of kW.
- Iodine heritage is 10⁴× below the requirement.

**Argon at 2,000–3,000 s.** Argon Hall efficiency is lower. This raises the tug waste heat (feeds T03) and lowers the thrust per kW.

### T02 — MW-scale deployable arrays: **split**

T02 becomes tug arrays only. Site generation moves to T15 because its environment and topology differ.

**Tug requirement:**
- 1–2.5 MWe at end of life.
- Sized at the **maximum heliocentric distance of the selected trajectories**, not a fixed 1.2 AU. Sizing at 1.2 AU leaves about 15% shortfall at 1.3 AU.
- 10–15 yr of interplanetary proton fluence.
- Iodine and dust contamination.
- Structural dynamics under continuous EP thrust.

**Heritage:**
- ROSA/iROSA on ISS from 2021, about 20 kW per wing (reported).
- Psyche arrays about 21 kW at 1 AU.
- Ratio: about 50–125× per tug.

### T03 — MW-class waste-heat rejection: **keep, requirement restated**

**Plant requirement:**
- At most site power plus any solar-thermal input (see finding 2).
- Rejection temperature is route-dependent:
  - carbonyl: about 320–500 K
  - H₂ reduction: higher-temperature process heat, with part of it recoverable
  - furnace: reject at loop temperature
- Dust deposition and the view factor to the asteroid surface both matter.

**Tug requirement:**
- 50–800 kWth must be split into the PPU and electronics loop versus heat the thrusters radiate themselves. At 2.5 MW and about 95% PPU efficiency, the PPU loop alone is about 125 kWth.

**Heritage and gaps:**
- ISS external active thermal control is about 70 kW (reported). The ratio is about 14–130× for the plant.
- No rqs are assigned. Open one.

### T04 — Excavation: **split**

T04 keeps excavation. Anchoring, hold-down and mobility move to T16, which is also needed by plant, tethers and tailings.

**Required (corrected):**
- Fleet average of at least 1.7–6.3 t/h (finding 1). Per-machine rate × count × duty must meet it.
- At least 5 yr on low-cohesion, abrasive, charged regolith.

**Heritage:**
- OSIRIS-REx TAG (2020) collected about 120 g in seconds.
- Hayabusa2 SCI and subsurface sampling (2019).
- Bennu's near-surface showed very low cohesion (Walsh et al., *Sci. Adv.* 2022; I am fairly but not fully sure of the venue).
- RASSOR counter-rotating drums (NASA KSC) are terrestrial and lunar-analogue heritage for reaction cancellation.

**Scale and environment gap:**
- About 10⁵× sustained mass rate versus seconds-long sampling.
- No microgravity excavation at more than kg-per-hour for more than minutes.

### T05 — Microgravity beneficiation: **keep, requirement restated**

**Required:**
- Feed of 15–55 kt/yr (or as rebaselined).
- Liberation at the native-metal grain size, which is typically sub-mm in ordinary chondrites. This makes comminution a prerequisite (T19).
- Concentration 4–15:1 with stated recovery.
- Particle transport without gravity, plus electrostatic and cohesive agglomeration.

**Feed definition:**
- "Representative feed" cannot be fixed until T18 returns grade and texture data.
- Until then, specify an envelope across LL/L/H chondrite feed.
- For a monolithic M-type metal target, beneficiation largely disappears and cutting replaces it. Note this as a branch.

**Heritage:**
- Terrestrial magnetic separation is mature.
- No microgravity magnetic beneficiation at more than lab scale that I can cite with confidence.

### T06 — No-melt refining: **split**

T06 keeps carbonyl. H₂ reduction moves to T17. The two have different chemistry, feeds, pressures and reagent loops, so a single TRL is meaningless.

**Carbonyl (T06) requirement:**
- Fe-Ni carbonyl formation and decomposition at 0.6–2.5 kt/yr product.
- Iron carbonyl uses high CO pressure. Industrial practice is high pressure, order 10–20 MPa (unsure of the exact range). Nickel's Mond process runs near atmospheric pressure.
- Gas–solid contact without buoyancy.
- CO loss rate sets the make-up.
- Sulfur from troilite affects kinetics.

**Heritage:**
- Mond process, Clydach (industrial since the early 1900s).
- BASF carbonyl iron powder.
- No reduced-gravity carbonyl reactor that I know of.

### T07 — Rotating-module melting: **keep, requirement corrected**

**Required:**
- 0.05–0.15 g at the bath, with an explicit radius/rpm pair (finding 3).
- 1–10 t batches, which is about 60–2,500 batches/yr.
- Melting energy about 1.2 MJ/kg, or about 12 GJ per 10 t batch.
- Includes spun/despun material transfer, rotary joints, and furnace refractory life.

**Heritage:**
- Gram-scale containerless melting on ISS EML.
- Seconds of reduced g on parabolic flights.
- **No sustained partial-g melting at any mass.**
- Ratio: about 10⁶–10⁷× in batch mass.

**Legacy cleanup:** Si zone refining and thin-film content leave this entry (deferred). The legacy TRL 3–4 cannot carry over because its evidence is deliberation, an Si study, and unrelated electrolysis work.

### T08 — Containment and tailings: **keep, requirement extended**

**Containment fraction implied:**

| Limit | Escape fraction of handled mass |
|---|---|
| Interim ceiling, ≤1 t/yr on 15–55 kt/yr handled | ≤2–7 × 10⁻⁵ |
| ALARP goal, 10 kg/yr | ≤2–7 × 10⁻⁷ |

**Additions:**
- **Escape measurement and verification** at about 3 kg/day, which the licence gate needs.
- Tailings of about 7–35 × 10³ m³/yr at loose bulk density.
- Local contamination of arrays and radiators.

**Heritage:** none at this scale.

### T09 — HV tethers: **keep, requirement reconciled**

**Power reconciliation:**
- 20 robots at hundreds of kW each would be 2–4+ MW, which is most of a 2.5–8 MW site. Reconcile the robot power budget with the site budget.
- 100–300 kW at 1–3 kV means about 100 A per circuit.

**Required additions:**
- Arcing and multipaction in a plasma with outgassing and charged dust. Space arrays above ~100 V have known arcing issues; ISS uses a 160 V primary with plasma contactors.
- Tether reeling and management on rubble.
- Connectors that tolerate dust.

**Heritage:**
- Terrestrial kV-class mining trailing cables are mature.
- Space flight heritage tops out at about 160 V.
- Ratio: about 6–19× in voltage.

### T10 — Long-duration autonomy: **keep**

**Required:**
- At least 90 days unattended, covering solar-conjunction outages of weeks.
- One-way light time from seconds up to about 20+ min, depending on geometry.
- Fault detection and recovery across mining, plant process control and tug proximity operations.

**Gate provenance:** the 90-day figure is GPT's gate. Keep its provenance visible; other positions may differ.

**Heritage:** Hayabusa2 and OSIRIS-REx autonomous touch-and-go events (minutes long, closely ground-supervised). Nothing approaches 90 days of unattended industrial operation.

### T11 — Scouts: **split**

T11 keeps the scout bus and multi-target SEP rendezvous. Subsurface sampling and in-situ assay move to T18.

**T11 requirement:** 200–600 kg spacecraft, 1–3 targets each.

**Heritage:**
- Dawn (ion propulsion, two targets, 2007–18).
- Hayabusa2, OSIRIS-REx.

The bus is the high-TRL half. The legacy 5–6 "constellation" rating is not the relevant item now.

### T12 — Cargo handling: **keep, scope extended**

**Required:**
- Autonomous capture and transfer of 150–300 t payloads at the site and at SEL1.
- Extended to cover internal site transfers: surface ↔ free-flyer, plant ↔ tug.

**Heritage:**
- MEV-1 docking with Intelsat-901 (2020).
- Canadarm2, reported 116 t payload capability (Shuttle-era rating).
- Autonomous ISS docking (ATV, Progress, Dragon).
- Ratio: about 1.3–2.6× above the largest arm-handled mass, but at a NEA, with non-standard cargo, at multi-light-minute delay.

### T13 — Water pilot: **keep, conditional, re-tag**

**Required:** 10–100 t/yr at a C-type body, which by finding 4 is a separate site or a scout-scale experiment.

**Purpose:** state why it exists, given no LOX/LH₂ production and non-water propellants.

**Risk:** legacy rated it "project-ending". That is wrong now. Failure is at most cost-increase or schedule-delay (the pilot is dropped).

**Legacy evidence:** Bennu sample results are composition evidence, not extraction-technology evidence. I am unsure of the "8 kW optical mining demo" detail.

---

## 2. Missing technologies

| New | Technology | Required scale and environment | Origin |
|---|---|---|---|
| T14 | Propellant storage and feed, hundreds of t per tug | 145–720 t per tug lifetime (finding 6). Iodine: solid storage with heated sublimation feed at about 7–18 kg/h, corrosion. Argon: high-pressure supercritical or cryogenic at 87 K (pulls 80–90 K cryo into Phase 0 if chosen). Refuelling transfer at SEL1 or the site. | Split from T01 |
| T15 | Site power generation and transfer | 2.5–8 MW for 10–15 yr. Decide surface (night cycling, dust, anchoring) versus free-flying arrays with power transfer to the surface (tether or beamed). | Split from T02 |
| T16 | Anchoring, hold-down and surface mobility on low-cohesion bodies | Reacts excavation torque and force (rq-0-26) for at least 5 yr. Also holds plant, tether routing and tailings works. Philae's harpoon failure (2014) and Bennu's low cohesion are the governing evidence. | Split from T04 |
| T17 | H₂ reduction with H₂ recycle | Reduces the oxide and sulfide-associated fraction. Recycle requires **electrolysis of product water**: order tens to hundreds of t/yr H₂O (about 80 t/yr if ~10% of 2.5 kt Fe comes via FeO reduction). Gas–solid contact without gravity, since fluidised beds need g or spin. | Split from T06 |
| T18 | Subsurface sampling and in-situ grade assay | At least several sampled depths and sites per target, with a defined depth (proposal: at least 1 m, to be justified). Bulk metal grade at stated accuracy for the D-02 target gate. Combines sampling with spectroscopy such as Dawn GRaND and Psyche GRNS-class gamma-ray/neutron. | Split from T11 |
| T19 | Bulk-solids handling and comminution in microgravity | 15–55 kt/yr. No gravity flow, so needs feeders, conveyors, hoppers and crushers/mills working by spin, gas or mechanical drive. Liberation to sub-mm. Wear over 5 yr. | Add |
| T20 | Distributed energy storage | 0.5–15 MWh site plus 10–50 kWh per robot. 9,000–33,000 cycles over 10–15 yr if the site is on the surface. Thermal cycling. | Add |
| T21 | Robotic maintenance, repair and spares logistics | At least 5–15 yr operation with no crew. Replaces wear parts in T04, T19, T09 and T07 refractories. Heritage: Dextre, MEV. OSAM-1 was cancelled in 2024, so it is not heritage. | Add |
| T22 | Product consolidation and packaging | Powder, concentrate or ingot to a dust-tight, tug-compatible form at 0.6–2.5 kt/yr. Route-dependent: sintering, pelletising, casting. | Add |
| T23 | Dust-tolerant long-life mechanisms and seals | Bearings, seals, rotary joints and connectors in abrasive charged regolith and vacuum for at least 5 yr. Applies to T04, T07, T09 and T19. Apollo dust experience is the cautionary heritage. | Add |

**Not added as technologies:**
- Deep-space communications and navigation capacity for 15–30 assets. This is a DSN and optical-comms capacity issue, not a technology gap.
- The pathfinder demonstrator. It is a vehicle for reaching TRL 6, not a technology.

**Metallurgy routes, rated separately in the rating round:**

| Route | Chain |
|---|---|
| Claude, no-melt | T19 → T05 → T06 or T17 → T22 |
| Gemini, furnace | T19 → T05 → T07 → T22 |
| GPT, as I read it | T19 → T05 → T22 (consolidated native metal), with T07 as an experimentally gated upgrade |

- If a single route fails to reach TRL 6, the outcome is **architecture-change**.
- If all routes fail, the outcome is **project-ending** for 0B.
- I keep the disagreement between routes visible and do not merge them.

---

## 3. Deferred legacy entries

| Legacy entry | Verdict | Note |
|---|---|---|
| cryocooler-scaling → phase-1 | **OK (20 K)** | If D-05 selects argon stored cryogenically, 80–90 K cooling enters Phase 0 via T14. |
| sunshield-deployment → phase-1 | **OK, same condition** | — |
| mli-long-duration → phase-1 | **OK, same condition** | — |
| electrolysis-microgravity, tagged 0B | **Inconsistent** | The reason says "deferred", but the tag is 0B. The H₂-reduction route (T17) needs product-water electrolysis at tens to hundreds of t/yr for reagent recycle. Fold into T17 as conditional 0B; otherwise phase-1. |
| in-space-silicon-purification → phase-1 | **OK** | — |

```yaml
technologies:
  - id: T01
    action: split
    technology: MW-class SEP thruster and PPU cluster
    required: 1.0-2.5 MWe per tug as a multi-thruster cluster (~100-250 kW units); Isp 2,000-3,000 s; iodine reference or argon alternate (xenon excluded on supply); per-thruster qualified life and throughput stated; 20,000-40,000 h tug thrust time over 10-15 yr; deep space 0.9-1.3 AU, iodine corrosion and plume interactions
    phase_need: 0B
    legacy: solar-electric-propulsion
    rqs: [rq-0-16, rq-0-54, rq-0-53, rq-0-19, rq-0-20]
    reason: Thruster/PPU and propellant storage differ in heritage and in how D-05 affects them, so storage moves to T14; the largest ground test (~100 kW) is 10-25x below a 1-2.5 MWe tug and no flight-built system above ~tens of kW has flown.
  - id: T02
    action: split
    technology: MW-scale deployable tug solar arrays
    required: 1-2.5 MWe EOL per tug sized at the maximum heliocentric distance of selected trajectories; 10-15 yr interplanetary proton fluence; iodine/dust contamination; dynamics under continuous EP thrust
    phase_need: 0B
    legacy: null
    rqs: [rq-0-21, rq-0-22, rq-0-25]
    reason: Tug arrays (~50-125x iROSA/Psyche-class) and site generation have different environments and topology decisions, so site power moves to T15.
  - id: T03
    action: keep
    technology: MW-class waste-heat rejection (plant and tug)
    required: plant waste heat capped at site electric plus any stated solar-thermal input (stated 1-9 MWth exceeds 8 MW power), rejection temperature set by metallurgy route; tug 50-800 kWth split into PPU loop (~125 kWth at 2.5 MW) versus thruster self-radiation; dust deposition and surface view factor
    phase_need: 0B
    legacy: null
    rqs: []
    reason: Required at 14-130x ISS ATCS (~70 kW) for the plant, but the requirement needs internal consistency and an rq.
  - id: T04
    action: split
    technology: Asteroid excavation
    required: fleet average >=1.7-6.3 t/h (15-55 kt/yr feed) from per-machine rate x count x duty; >=5 yr on low-cohesion abrasive charged regolith
    phase_need: 0B
    legacy: asteroid-mining-bucket-wheel
    rqs: [rq-0-6, rq-0-7, rq-0-26, rq-0-39, rq-0-42]
    reason: The low corner of the stated fleet capacity (0.27 t/h) misses the mass balance by 6-23x, and anchoring is a shared, separately rateable function, so it moves to T16.
  - id: T05
    action: keep
    technology: Microgravity magnetic and size beneficiation of native Fe-Ni
    required: 15-55 kt/yr feed (pending mass-balance fix), liberation at sub-mm grain size, concentration 4-15:1 with stated recovery, particle transport without gravity, electrostatic/cohesive agglomeration; feed envelope LL/L/H chondrite until T18 data
    phase_need: 0B
    legacy: null
    rqs: [rq-0-51, rq-0-10]
    reason: Common to all three metallurgy routes; the requirement must be stated as feed throughput and recovery, not concentrate alone.
  - id: T06
    action: split
    technology: Carbonyl refining of Fe-Ni in microgravity with CO recycle
    required: 0.6-2.5 kt/yr product; high-pressure Fe(CO)5 and near-ambient Ni(CO)4 formation/decomposition; gas-solid contact without buoyancy; CO make-up imported; sulfur effects from troilite
    phase_need: 0B
    legacy: microgravity-metallurgy (split)
    rqs: [rq-0-56, rq-0-13]
    reason: Carbonyl and H2 reduction differ in chemistry, feed, pressure and reagent loop, so H2 reduction moves to T17.
  - id: T07
    action: keep
    technology: Partial-gravity melting and slag/metal separation in a rotating module
    required: 0.05-0.15 g at the bath with a consistent radius/rpm pair (stated 5-20 m at 1.5-4 rpm spans 0.013-0.36 g); Coriolis and gradient limits; 1-10 t batches (~12 GJ per 10 t); spun/despun material transfer and refractory life
    phase_need: 0B
    legacy: microgravity-metallurgy (split)
    rqs: [rq-0-11, rq-0-12, rq-0-13]
    reason: Gemini's route depends on it and GPT's route gates on it; no sustained partial-g melting exists at any mass, and the Si content of the legacy entry is deferred.
  - id: T08
    action: keep
    technology: Particle containment, escape verification and tailings management
    required: escape <=1 t/yr interim (escape fraction <=2-7e-5 of handled mass) ALARP toward 10 kg/yr (<=2-7e-7); in-situ measurement of escape at ~3 kg/day; 13-47 kt/yr tailings; local contamination control of arrays and radiators
    phase_need: 0B
    legacy: null
    rqs: [rq-0-41, rq-0-9]
    reason: The licence gate needs demonstrated containment and a way to verify escape, which the original entry omitted.
  - id: T09
    action: keep
    technology: High-voltage power tethers and site distribution on regolith
    required: 1-3 kV (6-19x flight heritage), ~100 A per circuit, robot power budget reconciled with 2.5-8 MW site; arcing and multipaction in plasma with outgassing and charged dust; tether reeling on rubble; dust-tolerant connectors; thermal cycling
    phase_need: 0B
    legacy: null
    rqs: [rq-0-60]
    reason: Terrestrial trailing cables are mature but space HV in dusty plasma is not, and the robot power line as written could consume most of the site budget.
  - id: T10
    action: keep
    technology: Long-duration autonomy for mining, processing and proximity operations
    required: >=90 days unattended (GPT gate, provenance retained) including solar-conjunction outages; one-way light time seconds to ~20+ min; fault detection and recovery across robots, plant process control and tug proximity operations
    phase_need: 0B
    legacy: null
    rqs: [rq-0-42, rq-0-8]
    reason: Cross-cutting enabler with only minutes-scale autonomous touch-and-go heritage.
  - id: T11
    action: split
    technology: Rendezvous scout spacecraft with multi-target SEP
    required: 4-10 scouts of 200-600 kg, 1-3 NEA rendezvous each at 0.9-1.3 AU
    phase_need: 0A
    legacy: autonomous-asteroid-prospecting
    rqs: [rq-0-50, rq-0-1, rq-0-2, rq-0-3, rq-0-5, rq-0-39]
    reason: The bus has Dawn, Hayabusa2 and OSIRIS-REx heritage while subsurface sampling and assay does not, so sampling moves to T18; NEA Scout is not heritage.
  - id: T12
    action: keep
    technology: Autonomous handling, docking and transfer of 150-300 t payloads
    required: capture and transfer at the site and SEL1; internal surface-to-free-flyer and plant-to-tug transfers; multi-minute light-time
    phase_need: 0B
    legacy: null
    rqs: [rq-0-17]
    reason: About 1.3-2.6x above the largest arm-handled mass, with no NEA or non-standard-cargo heritage.
  - id: T13
    action: keep
    technology: Asteroid water extraction pilot
    required: 10-100 t/yr at a C-type body, which is a separate site from the Fe-Ni target; purpose to be stated
    phase_need: 0B
    legacy: isru-water-extraction
    rqs: [rq-0-27, rq-0-33, rq-0-40, rq-0-55]
    reason: Optional and conditional on a second target, so failure is cost-increase or schedule-delay, not project-ending as legacy stated.
  - id: T14
    action: split
    technology: Propellant storage and feed at hundreds of tonnes per tug
    required: ~145-720 t per tug lifetime; iodine solid storage with heated sublimation feed at ~7-18 kg/h, or argon high-pressure/87 K cryogenic storage; refuelling transfer
    phase_need: 0B
    legacy: solar-electric-propulsion
    rqs: []
    reason: Split from T01; the D-05 choice changes this technology most, and argon could bring cryogenics back into Phase 0.
  - id: T15
    action: split
    technology: Site power generation and transfer
    required: 2.5-8 MW for 10-15 yr; decide surface arrays (night cycling, dust, anchoring) versus free-flying arrays with tethered or beamed transfer to the surface
    phase_need: 0B
    legacy: null
    rqs: [rq-0-21, rq-0-22, rq-0-25]
    reason: Split from T02; 0.5-15 MWh storage cannot carry an 8 MW surface site through a 2-20 h rotation night, so the topology decision defines the technology.
  - id: T16
    action: split
    technology: Anchoring, hold-down and surface mobility on low-cohesion bodies
    required: react excavation torque and force (rq-0-26) for >=5 yr; plant, tether and tailings works hold-down; rubble-pile and monolith variants
    phase_need: 0B
    legacy: asteroid-mining-bucket-wheel
    rqs: [rq-0-26]
    reason: Split from T04; the Philae harpoon failure and Bennu's near-zero cohesion make this a distinct and possibly governing risk.
  - id: T17
    action: split
    technology: H2 reduction with H2 recycle via product-water electrolysis
    required: reduction of the oxide fraction to support 0.6-2.5 kt/yr product; electrolysis of tens to hundreds of t/yr product water; gas-solid contact without gravity
    phase_need: 0B
    legacy: microgravity-metallurgy (split)
    rqs: [rq-0-56, rq-0-13]
    reason: Split from T06; it carries a reagent loop that needs microgravity electrolysis.
  - id: T18
    action: split
    technology: Subsurface sampling and in-situ bulk grade assay
    required: multiple sampled depths and sites per target (depth to be justified, proposal >=1 m) on 200-600 kg scouts; bulk metal grade at stated accuracy for the D-02 target gate
    phase_need: 0A
    legacy: autonomous-asteroid-prospecting
    rqs: [rq-0-50, rq-0-39]
    reason: Split from T11; the target gate depends on it and heritage is limited to grams to ~100 g of near-surface sample.
  - id: T19
    action: add
    technology: Microgravity bulk-solids handling and comminution
    required: 15-55 kt/yr feeding, conveying and crushing/milling to sub-mm liberation without gravity flow; >=5 yr wear life
    phase_need: 0B
    legacy: null
    rqs: []
    reason: Every metallurgy route needs liberated feed and gravity-free transport, and neither appears in the candidate list.
  - id: T20
    action: add
    technology: Distributed energy storage
    required: 0.5-15 MWh site plus 10-50 kWh per robot; 9,000-33,000 cycles over 10-15 yr if surface-sited; thermal cycling
    phase_need: 0B
    legacy: null
    rqs: []
    reason: The architecture replaced the bank with distributed storage but no technology entry covers it.
  - id: T21
    action: add
    technology: Robotic maintenance, repair and spares logistics
    required: uncrewed replacement of wear parts across mining, comminution, tethers and furnace refractories over 5-15 yr
    phase_need: 0B
    legacy: null
    rqs: []
    reason: An uncrewed multi-year abrasive operation cannot meet its duty cycle without in-situ repair.
  - id: T22
    action: add
    technology: Product consolidation and packaging
    required: powder, concentrate or ingot to a dust-tight tug-compatible form at 0.6-2.5 kt/yr; route-dependent sintering, pelletising or casting
    phase_need: 0B
    legacy: null
    rqs: []
    reason: Product rather than ore is shipped, and the route outputs are not in shippable form.
  - id: T23
    action: add
    technology: Dust-tolerant long-life mechanisms and seals
    required: bearings, seals, rotary joints and connectors in abrasive charged regolith and vacuum for >=5 yr
    phase_need: 0B
    legacy: null
    rqs: []
    reason: A common failure mode across T04, T07, T09 and T19 that is best rated once.
deferred_ok: false
deferred_notes: Cryocooler, sunshield, MLI and Si deferrals are correct (cryo conditionally, since argon at 87 K would reopen 80-90 K storage in T14), but electrolysis-microgravity is tagged 0B while its reason says deferred, and the H2-reduction route (T17) needs product-water electrolysis at tens to hundreds of t/yr, so it must be carried as conditional 0B within T17.
```
