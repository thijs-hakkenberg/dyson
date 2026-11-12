---
bomId: "bom-0-1"
itemName: "Prospecting Survey and Rendezvous Scouts"
itemSlug: "prospecting-satellites"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-1 Prospecting Survey and Rendezvous Scouts: Technical Proposal (Phase 0A, gated 0B option)

**Basis.** 2026 USD. Costs come from analogy and engineering judgement unless a calculation is shown.

**Scope.** This proposal addresses the accepted scope: a remote survey (observing programme and survey data) plus electric-propulsion (EP) rendezvous scouts with subsurface sampling and bulk assay. It replaces the monopropellant prospector fleet.

**Provenance.** The round-2 reconciliation describes a 12–16 × ~200 kg remote-sensing fleet. That predates the binding re-scope to 4–10 scouts of 200–600 kg with subsurface sampling. I treat the reconciliation's sizing as superseded and use its analyses only where they still apply.

---

## 0. Bottom line

| Parameter | Recommendation | Range | Basis / confidence |
|---|---|---|---|
| Remote survey | Observing programme plus data analysis. **No dedicated telescopes.** | 1 programme, 2027–2038 | Existing assets cover the pre-screen. Medium confidence. |
| Scouts | **6** (2 pathfinder tranche + 4 gated) | 4–8 in 0A; 0–2 optional in 0B | Binomial sizing on pre-screen hit rate p = 0.3–0.5 (§7). Low–medium confidence. |
| Scout wet mass (iodine reference) | **550 kg** | 460–600 kg | Bottom-up budget, 15 % system margin (§4.3). Medium confidence. |
| Scout wet mass (argon alternate) | 610 kg | 560–660 kg | Breaches the 600 kg envelope unless one Surface Assay Package (SAP) is deleted or Δv is cut. Medium confidence. |
| Design Δv (EP) | **4.5 km/s** from C3 ≈ 0 | 3.5–5.5 km/s | 1 full plus 1 secondary rendezvous. Low confidence until the accessibility study is done. |
| Array power, BOL at 1 AU | **3.6 kW** | 3.0–4.5 kW | 2.5 kW to EP plus 0.4–0.7 kW bus |
| Surface Assay Packages per scout | **2** (each hops to 2–3 sites) | 1–2 | Up to 6 cored sites per scout |
| Sampling depth | **1.0 m** | 0.5–1.5 m | Mining robots work the top ~1 m. Rationale in §5.2. |
| bom-0-1 cost, 0A | **$680M** | $495–900M | Survey + development + 6 flight units + data products (§13). Low–medium confidence. |
| bom-0-1 cost, 0B option | $0–150M | – | 0–2 site-confirmation scouts plus survey continuation |
| All-in mission cost incl. other lines | ~$0.95B before reserve | $0.66–1.28B | Adds launch, DSN, ops and spares from bom-0-8/9/10/14 |

My position on the round-2 figures:
- I agree with Claude's quantity of 6 (range 4–8).
- I disagree with every round-2 unit cost as too low for a craft that carries a subsurface sampler. My figure is about $100M per scout fully amortised and $50–75M recurring.
- I reject Gemini's two telescopes outright.

---

## 1. Design philosophy

### 1.1 What decision this item exists to support

bom-0-1 serves one decision: the **Target gate** (one of the four D-02 discriminating gates) before KDP-0B. It does not exist to discover asteroids, catalogue taxonomy, or do science.

The question at that gate is whether at least one named NEA has:
- a **recoverable** Fe-Ni grade,
- regolith mechanics,
- spin state, and
- tug accessibility

that together let bom-0-2, bom-0-3 and bom-0-4 close at 0.6–2.5 kt/yr, with stated confidence, plus one backup.

Every instrument, kilogram and dollar below is justified against that question.

### 1.2 Why remote data alone cannot answer it (the null option)

I evaluated the null option: external data only, no scouts. **I reject it.** Remote data can tell us "S-type, radar-bright, about 15 % metal by meteorite analogy." It cannot tell us the four things the plant and robots depend on:

1. **Recoverable metal fraction and liberation.** How much metal reports to a magnetic concentrate after comminution, and at what grain size. This governs the processing plant's mass balance and is invisible remotely.
2. **Sulphur and phosphorus deportment.** Troilite (FeS) intergrown with metal sets the refining burden.
3. **Regolith depth, cohesion and grain-size distribution, top 1 m.** OSIRIS-REx is the cautionary datum: OVIRS identified phyllosilicates correctly, but nobody predicted the near-zero cohesion. The TAG head sank ~0.5 m.
4. **Spatial variability.** Grade at the 10–100 m scale over the area actually mined.

The value-of-information case is straightforward. bom-0-1 costs about $0.7–1.0B. 0B commits multiple billions in irreversible hardware to one rock. Cutting false-commit probability by even 10–20 percentage points pays for this item.

### 1.3 Opinionated principles

1. **Ground truth, not breadth.** Breadth is already bought by the world: SPHEREx, NEO Surveyor, Rubin, Gaia and IRTF. We pay for depth.
2. **Measure what the plant measures.** The core assay is a miniature beneficiation test: sieve, magnetic separation, weigh, then XRF the concentrate. A spectrum that must be converted to grade through a meteorite model is not enough.
3. **Put sampling risk on a cheap expendable, not the propulsion bus.** The mothership never touches down. SAPs land, anchor, core, assay and hop.
4. **Gate by evidence, not by calendar.** I adopt GPT's evidence-based gates. Tranche 2 is sized after tranche 1 has actually cored.
5. **Do not let scouts drive the propellant decision (D-05).** Fleet propellant is under 1 t against hundreds of tonnes for the tugs. Scouts can, however, be the first in-space data point for kW-class iodine Hall operation. That is useful to bom-0-4, so I exploit it with a fallback.
6. **Data-buy compatible.** Every scout requirement is written as a data-delivery requirement as well as a hardware requirement. That lets a commercial provider bid fixed-price "delivered assay per target."

---

## 2. System architecture

```
                    bom-0-1 PROSPECTING SURVEY & RENDEZVOUS SCOUTS
 ┌──────────────────────────────────────────────────────────────────────────┐
 │ ELEMENT A: REMOTE SURVEY PROGRAMME (RSP)        ELEMENT B: SCOUT FLEET   │
 │  - purchased telescope/radar time                - 6 EP motherships      │
 │  - external catalogue ingestion                  - 12 Surface Assay      │
 │    (SPHEREx, NEO Surveyor, Rubin, Gaia DR3)        Packages (SAP)        │
 │  - low-thrust accessibility study                - assay calibration lab │
 │  - pre-screen hit-rate validation                - data products team    │
 │  - meteorite-analog lab                                                  │
 └───────────────┬──────────────────────────────────────────┬───────────────┘
                 │ ranked shortlist (15–40)                 │ commit-grade
                 └──────────► Target selection board ───────┘ target dossier
                                      │
                       ┌──────────────┼────────────────┬──────────────┐
                       ▼              ▼                ▼              ▼
                   bom-0-2         bom-0-3          bom-0-4        bom-0-6
                   (geotech)    (grade/mineralogy) (ephemeris,    (hydration,
                                                    gravity)      C-type only)
```

### 2.1 Target funnel

| Funnel stage | Count | Source |
|---|---|---|
| Known NEAs | ~38,000 (growing ~3,000/yr with Rubin) | MPC |
| Size D ≈ 0.3–3 km and spin period P > 2.2 h | ~5,000–8,000 | NEO Surveyor diameters/albedos; Rubin and ground lightcurves |
| Scout-accessible (≤ 3.5 km/s low-thrust from C3 ≈ 0) **and** tug round trip to SEL1 within the bom-0-4 budget | ~150–600 | RSP accessibility study |
| Metal-bearing class plausible (S/Q with H-chondrite-like band parameters, E, M/X) | ~40–150 | Gaia DR3, SPHEREx, IRTF |
| Shortlist (spectrum + 3 µm/thermal + spin, radar where possible) | **15–40** | RSP campaigns |
| Scout-characterised | **7–9** | Element B |
| Commit-grade | **≥ 2 required** (1 primary + 1 backup) | Target gate |

The size floor is set by regolith retention, not by tonnage. A 200 m body holds about 8 Mt, centuries of supply at 1 kt/yr of metal. Bodies under ~300 m, or spinning faster than ~2.2 h, tend to be bare or monolithic, which defeats tethered regolith mining. Numbers marked ~ are my estimates pending the RSP accessibility study.

### 2.2 Mission concept

```
 Launch (bom-0-8)   EP cruise           Arrival &          Proximity /      Surface campaign    Depart or
 C3≈0, 2–4 scouts   0.6–1.5 yr thrust   approach           mapping          SAP-1 (+SAP-2)      sentinel
 per vehicle        1.0–2.5 yr flight   (20,000→20 km)     (20 km→1 km)     (50 m release)
 ─────●──────────────────────────────────●──────────────────●───────────────●──────────────────●──────►
      T0                                T0+1–2.5 yr        +2 mo            +5–7 mo            +9–12 mo
                                                                                               │
                                                  ┌────────────────────────────────────────────┤
                                                  ▼                                            ▼
                                        Secondary target (~60 %)                  Stay as SITE SENTINEL
                                        ≤1.2 km/s, SAP-2, 6–9 mo                  if primary is commit-grade
                                                                                  (ephemeris, gravity, imaging
                                                                                  for 0B arrival)
```

---

## 3. Element A: Remote Survey Programme (RSP)

### 3.1 Content

| Work package | Content | 0A cost (range) |
|---|---|---|
| A1 Catalogue ingestion and fusion | Pipelines for SPHEREx (0.75–5.0 µm, 102 bands, all-sky), NEO Surveyor (4–5.2 and 6–10 µm, from ~2028), Rubin colours/lightcurves, Gaia DR3 reflectance spectra (~60k asteroids). Bayesian taxonomy and metal-likelihood model. | $4–8M |
| A2 Purchased ground spectroscopy | IRTF/SpeX 0.7–2.5 µm and LXD 3 µm on shortlist passes. Time on other 3–10 m facilities via partnerships or purchase. ~30–60 objects. | $6–15M |
| A3 Planetary radar campaigns | Goldstone DSS-14, GBT bistatic and any new facility: radar albedo (metal discriminator), shape, spin. Limited to close passes (≲ 0.05–0.1 AU), so opportunistic: ~10–20 objects. | $5–12M |
| A4 Low-thrust accessibility study | Optimised low-thrust scout transfers (1- and 2-target chains), plus round-trip tug accessibility to SEL1 jointly with bom-0-4. Launch-window maps 2030–2040. | $2–5M |
| A5 Pre-screen hit-rate validation | Retrospective test of the pre-screen model against Itokawa, Ryugu, Bennu, Eros, Didymos/Dimorphos and Psyche (2029). Meteorite-fall orbit linkages. Produces the prior on p. | $1–3M |
| A6 Meteorite-analog laboratory | 100–200 kg of H, L, LL and E chondrite bulk material (NWA material, roughly $1–10/g in bulk) for assay calibration and processing feedstock tests. Shared with bom-0-3 and bom-0-11. | $2–4M |
| A7 Analysis team | 5–8 FTE × 11 yr | $10–20M |
| **Total RSP, 0A** | | **$30–67M; nominal $45M** |
| RSP 0B continuation | Monitoring, backup-site watch, Phase 1 feed | $5–15M |

### 3.2 Disagreement: no dedicated telescopes

Gemini's two telescopes would cost $45–120M each, as applied in round 2. I reject them for three reasons:
1. The binding constraint is ground truth, not discovery or taxonomy.
2. SPHEREx has already flown the 3 µm survey capability a smallsat telescope would provide, at a better aperture-time product than we could afford.
3. Any telescope aperture we could fund is beaten per dollar by purchased IRTF and radar time.

If SPHEREx asteroid extraction under-performs (open question Q3), the fallback is purchased IRTF/LXD time, not a spacecraft.

I set RSP at $30–67M. That is inside Claude's $20–60M at the upper end, and GPT's $100M ceiling is unnecessary without hardware.

### 3.3 RSP deliverables (exit criteria)
- **By scout PDR (2028):** ranked shortlist ≥ 15 objects, each with VNIR class, diameter/albedo, spin period and low-thrust Δv for 2030–2034 windows.
- **By tranche-2 CDR (2032):** shortlist ≥ 25, including ≥ 8 with radar or SPHEREx 3 µm data. The pre-screen p prior is updated with tranche-1 results.
- **Continuously:** target dossiers for bom-0-4 trajectory work.

---

## 4. Element B: Scout mothership

### 4.1 Top-level requirements (draft, verifiable)

| ID | Requirement |
|---|---|
| SC-01 | Deliver ≥ 4.5 km/s EP Δv from C3 = 0–2 km²/s² at 0.85–1.35 AU heliocentric range. |
| SC-02 | Rendezvous and station-keep at a ≤ 3 km, ~10⁻⁵ m/s²-gravity body for ≥ 9 months, with no body contact by the mothership. |
| SC-03 | Map ≥ 90 % of the surface at ≤ 0.5 m/px. Map spectra at ≤ 5 m/spot (0.4–3.8 µm) and thermal inertia at ≤ 10 m/px. |
| SC-04 | Determine body GM to ≤ 2 % and bulk density to ≤ 10 % (1σ). |
| SC-05 | Deploy two SAPs from ≤ 100 m altitude with touchdown velocity ≤ 10 cm/s (3σ). Relay SAP data. |
| SC-06 | Return ≥ 3 GB per target campaign, with priority products ≤ 7 days after acquisition. |
| SC-07 | Survive 40-minute round-trip light time with 72 h of autonomous safe operation in proximity. |
| SC-08 | Primary mission 5 yr; goal 7 yr (sentinel extension). |
| SC-09 | No main-EP firing within 20 km of the target during surface campaigns. Proximity propellant exhaust inventory logged for assay contamination correction. |

### 4.2 Δv budget (iodine reference, Isp ≈ 1,700 s)

| Leg | Δv (km/s) | Basis |
|---|---|---|
| C3 ≈ 0 → primary rendezvous | 3.0 (2.2–3.5) | Low-thrust equivalent of NHATS-class 1.8–2.8 km/s impulsive, plus ~15–25 % gravity/steering loss |
| Primary → secondary (60 % of scouts) | 1.2 (0.6–1.5) | Requires an A4 chain search. Many pairs exceed this, which is why only ~60 % of scouts get a secondary. |
| Proximity, orbit trim, phasing (EP portion) | 0.1 | |
| Margin | 0.2 | ~5 % on flown legs |
| **Design total** | **4.5 (3.5–5.5)** | |

Comparison with round 2:
- Gemini's 3.2 km/s with 65 kg is internally inconsistent: 65 kg at 2,100 s on ~210 kg implies about 7.6 km/s.
- Claude's 5.0 km/s assumed two full rendezvous on a 200 kg craft.

My 4.5 km/s reflects a more expensive primary than Claude assumed, because the target must also be tug-accessible, plus a cheaper, opportunistic secondary.

### 4.3 Mass budget (nominal, iodine reference)

| Subsystem | CBE (kg) | Notes |
|---|---|---|
| Structure and mechanisms | 45 | Al-honeycomb box, ESPA-Grande-compatible stacking ring |
| Thermal | 18 | Body-mounted radiators ~0.9 m² for PPU/avionics; heaters for the iodine feed |
| Power: arrays | 36 | 3.6 kW BOL, ~100 W/kg incl. drives (ROSA-type or rigid) |
| Power: battery and PCDU | 22 | 2.0 kWh Li-ion (eclipse-free; proximity peaks and safe mode); 100 V bus |
| EP: thrusters | 12 | 3 × 1.25 kW Hall (2 operating, 1 cold spare) |
| EP: PPUs | 14 | 2 PPUs, cross-strapped |
| EP: tank and feed | 14 | Iodine: heated solid-storage tank (~2.5 % of load) plus heated lines and flow control |
| EP: gimbals | 6 | |
| Proximity propulsion | 14 | 8 × 1 N green monoprop (AF-M315E/ASCENT) for > 500 m; 4 × cold-gas N₂ for < 500 m |
| GNC/ADCS | 17 | 4 RWs, 2 star trackers, IMU, sun sensors |
| C&DH | 8 | Rad-tolerant processor plus FPGA vision co-processor; 256 GB mass memory |
| Communications | 19 | 0.8 m HGA, 2 × X/X transponders (Ka-down option), 35 W SSPA, LGAs, UHF SAP relay |
| Mothership payload | 22 | §4.6 |
| Harness | 22 | |
| SAP accommodation/release | 8 | 2 × spring/separation systems with spin-control |
| **Mothership dry CBE** | **277** | |
| 2 × SAP | 84 | 42 kg CBE each (§5) |
| **Dry CBE incl. SAPs** | **361** | |
| System margin 15 % | 54 | Low for AD² 6 hardware. Subsystem growth allowances are additional and sit inside the CBE (10–30 %). |
| **Dry MEV** | **415** | |
| Proximity propellant | 12 | ~25 m/s monoprop + ~8 m/s cold gas |
| EP propellant (iodine) | 125 | Rocket equation, all SAPs carried (conservative): 427 × (e^(4.5/16.67) − 1) ≈ 132 kg; minus SAP-1 drop credit ≈ 125 kg |
| **Wet mass** | **~550** | Range 460–600 kg |

**Argon alternate (D-05).** Argon stored supercritical at 300 bar is about 0.48 g/cm³, giving ~260 L for ~125 kg. A COPV for that volume weighs about 28–35 kg, against ~8 kg for the iodine tank. Argon Hall efficiency at kW class is about 30–40 % versus about 45–50 % for iodine, which needs ~10 % more array or longer thrust time. Net result: **+45 to +70 kg, wet ~610 kg, breaching the 600 kg envelope.** Recovering the envelope with argon means one of:
- one SAP per scout,
- Δv cut to ~3.8 km/s (no secondary targets), or
- accepting ~650 kg and revisiting the launch packing (bom-0-8).

**Low-confidence item.** Dry mass for this class historically grows 20–35 % from PDR to launch. That growth would consume the secondary-target capability first, so I declare the secondary target a descope lever, not a requirement.

### 4.4 Power and thrust performance

- **EP operating point:** 2 × 1.25 kW at ~300 V. Iodine Hall: η ≈ 0.45, Isp ≈ 1,700 s. Per thruster, T ≈ 2ηP/vₑ ≈ 67 mN, so the system gives ~135 mN.
- **Acceleration:** at 550 kg, 2.5 × 10⁻⁴ m/s². For 4.5 km/s at a 0.85 duty cycle, with a power derate to ~0.75 at 1.25 AU, total thrusting is about 0.8–1.1 yr.
- **Throughput per thruster:** ~62 kg, about 4,300 h at ~4.0 mg/s. **Qualification life test: 1.5× → ~6,500 h, or ~95 kg iodine.** This is the single longest-pole test in the item (§12).
- **Bus loads:** cruise ~400 W. Proximity peak ~700 W (payload, transponder, heaters, iodine-feed heaters off). SAP relay ~30 W.

### 4.5 GNC and proximity operations
- **Optical navigation.** Approach uses star-referenced centroiding. Proximity uses landmark/natural-feature tracking (OSIRIS-REx NFT and Hayabusa2 heritage), fused with lidar ranging.
- **Proximity profile.** Hover/terminator orbits at 1–5 km, with a gravity-assisted shape model built in-flight. Dips to 100 m for SAP release.
- **Abort logic.** The descent abort decision is made on board (§8). The mothership never descends below 50 m.

### 4.6 Mothership payload

| Instrument | Mass/power | Requirement driver | My call vs round 2 |
|---|---|---|---|
| Narrow-angle camera (NAC, ~0.05 mrad/px) + wide-angle camera (WAC) | 7 kg / 15 W | Nav, shape, boulder statistics, SAP site selection | Baseline |
| VNIR–SWIR imaging point spectrometer, 0.4–3.8 µm, passively cooled detector | 9 kg / 20 W | 1 and 2 µm pyroxene/olivine band parameters (ordinary-chondrite subtype), 3 µm hydration | Upper limit 3.8 µm: inside the 3.2–4.3 envelope, matching Gemini |
| Thermal-IR microbolometer, 8–14 µm | 1.5 kg / 5 W | Thermal inertia → regolith grain size and depth; directly decision-relevant to bom-0-2 | Baseline. I side with Claude/Gemini against GPT's "trade it". At 1.5 kg there is nothing to trade. |
| Laser altimeter/lidar, 1–20 km | 4 kg / 15 W | Shape, gravity, proximity safety | Baseline (required for SC-05 regardless) |
| Radio science (X-band two-way Doppler) | 0 (uses transponder) | GM → density → porosity/metal consistency check | Baseline |
| Orbital GRNS | – | – | **Not baselined on the mothership.** At 0.3–3 km bodies the count rates from orbit are too low for useful Fe/Ni maps in a 9-month stay. Put the gamma spectrometer **in contact** on the SAP instead. |
| Low-frequency radar sounder (Hera/JuRa-class) | 3 kg / 20 W | Regolith depth, internal structure | Option for tranche 2, decided at Gate A |

---

## 5. Surface Assay Package (SAP)

### 5.1 Concept

```
            UHF patch ─┐   ┌─ sun-facing panel (30 W)
                       ▼   ▼
             ┌─────────────────────────┐
             │ avionics │ battery 0.4kWh│   ~0.45 m × 0.45 m × 0.35 m
             │ ASSAY CELL: centrifuge,  │   42 kg CBE (35–55)
             │ sieve, magnet separator, │
             │ resonant mass balance,   │
             │ micro-XRF, NIR microscope│
             │ EGA oven + mass spec     │
             ├───────────┬─────────────┤
  cold-gas   │  contact  │  sample     │
  hop/hold ─►│  gamma/   │  transfer   │
  thrusters  │  neutron  │  carousel   │
             └────┬──────┴──────┬──────┘
          screw   │             │   rotary-percussive drill + auger
          anchor ▼▼             ▼   to 1.0 m (cuttings conveyed up-flight)
     ════════════════════════════════════════ regolith surface
```

### 5.2 Sampling approach and why

I traded five approaches:

1. **Touch-and-go on the mothership** (OSIRIS-REx style): top ~5 cm only, one shot, and it puts the propulsion bus at risk. **Rejected.**
2. **Kinetic impactor** (Hayabusa2 SCI): exposes ~1 m strata, but the material is then remote-sensed, not assayed. It also produces large ejecta, which conflicts with bom-0-15. **Rejected as baseline.**
3. **Penetrator:** gives mechanics but recovers no sample to assay. **Rejected.**
4. **Pneumatic sampler** (PlanetVac-type, flown on the Moon in 2025): excellent in loose regolith. It needs gas, and its depth is limited to ~10–30 cm. **Retained as a secondary/backup head** for shallow grab samples if the drill stalls.
5. **Anchored lander with rotary-percussive drill to 1 m: BASELINE.**
   - It matches the mining robots' working depth.
   - It gives a stratigraphic profile.
   - Its contact forces and power draw are themselves geotechnical data for bom-0-2.

**Anchoring is the critical risk.** Philae's harpoons failed, and the lander bounced. Mitigations:
- Low-reaction screw anchors (3 legs).
- Cold-gas hold-down thrust during drilling (~0.5 N, short bursts).
- A drill reaction-torque limit that keeps stall torque below anchor capacity.
- Weight on bit of ≤ 5 N.

The drill needs to reach only 1 m. It must handle cohesionless granular material up to centimetre clasts. If it meets a boulder or monolith, it relocates by hopping.

### 5.3 Assay cell: "beneficiation in a box"

Process per core interval (four intervals per core: 0–10, 10–30, 30–60, 60–100 cm; 20–60 g each):

1. **Centrifuge-assisted sieving** at 0.5–1 g artificial gravity. Size fractions: < 0.1, 0.1–0.5, 0.5–2, > 2 mm. This gives the grain-size distribution.
2. **Crush** the > 2 mm fraction to < 1 mm (mini jaw/roll). This gives a liberation proxy.
3. **Magnetic separation** with a permanent-magnet drum (~0.3 T) in the centrifuge. Products: magnetic and non-magnetic fractions.
4. **Mass measurement** of each fraction with a resonant/inertial balance (works in microgravity), target ±2 % of fraction mass.
5. **Micro-XRF** on each fraction: Fe, Ni, Co, S, P, Si, Mg, Ca, Cr. This yields Ni/Co in metal, and S in concentrate (troilite carry-over).
6. **NIR microscope** (MicrOmega-class) for silicate mineralogy and hydrated phases.
7. **Evolved-gas analysis.** Stepped heating to 1,000 °C with a quadrupole mass spectrometer: H₂O, CO₂, SO₂/H₂S, organics. This is essential for C-types (bom-0-6) and for S.
8. **Contact gamma/neutron spectrometer** (CeBr₃ + He-3-free neutron detector, ~3 kg). It integrates 3–7 days per site for bulk Fe/Ni/H over ~0.3–0.5 m depth. This is the bulk check against the core-scale assay. **Option to delete** at PDR if the mass budget fails.

**Primary output:** *recoverable metal fraction (wt %) of run-of-mine regolith after < 1 mm comminution and single-pass magnetic separation, with concentrate composition*. This is the number bom-0-3 needs.

### 5.4 Measurement requirements (proposed; to be reconciled with the bom-0-3 mass balance and the Phase 1 material spec)

| Quantity | Requirement (1σ) | Rationale |
|---|---|---|
| Recoverable metal, per interval | ±10 % relative | Repeatability verified on meteorite standards (A6) |
| Deposit-scale recoverable metal | ±20 % relative | ≥ 3 sites, ≥ 2 geologic units, ≥ 2 cores each |
| Ni in concentrate | ±0.5 wt % absolute | Product spec |
| S in concentrate | ±0.1 wt % absolute | Refining burden |
| Water (EGA, C-type) | ±0.5 wt % absolute | bom-0-6 gate |
| Cohesion / penetration resistance | Factor-of-2 bound, 0.1 Pa–10 kPa | bom-0-2 anchoring design |
| Grain-size distribution | d10/d50/d90 to ±25 % | bom-0-2 and bom-0-3 feed handling |

**Draft commit-grade threshold (owned by the Target gate, not by this item):**
- recoverable metal ≥ 8 wt % (placeholder; 5–15 to be set by the bom-0-3 mass balance),
- concentrate ≥ 85 % Fe-Ni with S ≤ 0.5 %,
- regolith ≥ 0.5 m over ≥ 30 % of surface,
- spin period > 2.2 h,
- tug-accessible.

### 5.5 SAP budgets
- **Mass, 42 kg CBE:** structure 8, landing/anchor 4.5, drill 6, assay cell 7, XRF 1.5, EGA 3, NIR microscope 1.5, gamma/neutron 3, cameras 1, avionics 2, UHF 1, power 5, thermal 2, cold gas 3 (+ ~4 kg contingency inside the CBE allowances).
- **Power:** 30 W panel plus 0.4 kWh battery. The EGA oven peaks at ~60 W (battery-supported), so assays are duty-cycled over days.
- **Life:** ≥ 60 days on surface, 2–3 hops, ≥ 6 cores per SAP.
- **Data:** 50–300 MB per site, relayed over UHF at 100–250 kbps when the mothership is in view.

---

## 6. Per-target campaign timeline

| Phase | Duration | Output |
|---|---|---|
| Approach (20,000 → 20 km) | 4–6 wk | Spin state, coarse shape, satellites/hazards search |
| Preliminary survey (20 → 5 km) | 4–6 wk | GM, global imaging at 1–2 m/px, global spectra |
| Detailed survey (5 → 1 km) | 8–12 wk | 0.3–0.5 m/px maps, thermal inertia, spectral units, ≥ 6 candidate SAP sites |
| SAP-1 campaign | 4–8 wk | 3 sites, 6–9 cores, assays |
| Interim assessment ("Gate T-lite") | 2 wk | Ground decision: SAP-2 here (commit candidate) or at the secondary target |
| SAP-2 / extended mapping | 4–8 wk | Further sites or retained |
| **Total** | **7–11 months** | Target dossier v1.0 |

---

## 7. Fleet sizing and tranching

### 7.1 Requirement

**P(≥ 2 commit-grade Fe-Ni targets) ≥ 0.85**: one primary plus one backup.

A C-type for bom-0-6 is **opportunistic, not sized for**. bom-0-6 is conditional on a C-type target, and forcing one into the fleet would add ~2 scouts for a pilot that may never proceed.

### 7.2 Model

Characterised targets n = N × s × k, where:
- s = 0.8 is scout survival through the primary campaign (first-of-kind deep-space EP smallsat class; my judgement),
- k = 1.6 is targets per surviving scout (1 + 0.6 secondary),
- p is the probability that a pre-screened shortlist target proves commit-grade.

| p (pre-screen hit rate) | n for P(≥ 2) ≥ 0.85 | Scouts N |
|---|---|---|
| 0.5 | 6 (P = 0.89) | **4–5** |
| 0.4 | 8 (P = 0.89); 7 gives 0.84 | **6** |
| 0.3 | 10 (P = 0.85) | **8** |

**Caveats.** Hits are not independent. We visit best candidates first (which helps), and the pre-screen model may share systematic errors (which hurts). The A5 validation and tranche-1 results are the only defences. That is why the fleet is tranched.

### 7.3 Tranches

| Tranche | Units | Launch | Gate to proceed |
|---|---|---|---|
| T1 pathfinders | 2 | 2031 | KDP-C for scouts (CDR passed, iodine/argon decision made) |
| T2 | 2–6 (nominal 4) | 2034 | **Gate A**: T1 has cored ≥ 1 m and assay repeatability is shown. N for T2 is recomputed from posterior p. |
| 0B option | 0–2 | ≥ 2037 | 0B gate: Phase 1 demand requires a second site, or the primary needs re-confirmation |

**On pathfinder count.** Claude proposed 2 pathfinders and Gemini/GPT proposed 4. I choose **2**. With subsurface sampling, each scout is a ~$70M asset. Two scouts give independent targets and a second chance at the sampling demonstration. Four would commit ~$140M more before the sampler is proven.

**Long-lead parallelism.** I adopt Claude's position: long-lead T2 items (thrusters, arrays, detectors) are ordered at T1 CDR+12 months, so T2 can launch ~2.5 yr after T1 rather than ~4.

---

## 8. Autonomy, control and communications

### 8.1 Autonomy as testable scenarios

I adopt GPT's approach of replacing autonomy "levels" with testable scenarios.

| ID | Scenario | Pass criterion | Verification |
|---|---|---|---|
| AS-1 | Thruster flameout/PPU fault in cruise | Isolate, switch, resume thrust ≤ 24 h, no ground | HIL test, fault injection |
| AS-2 | Unexpected loss of lock at 1 km, 40-min RTLT | Climb to a safe terminator orbit ≤ 30 min, hold 72 h | Monte Carlo + HIL with shape-model sim |
| AS-3 | SAP release at 100 m with stale ground solution | Onboard NFT nav; release only if 3σ touchdown dispersion ≤ 10 m and v ≤ 10 cm/s; else abort | Monte Carlo ≥ 10⁴ runs; air-bearing/drop-tower |
| AS-4 | SAP drill stall / anchor slip | Detect slip (IMU), stop, retract, rehop ≤ 1 h | Reduced-gravity test (parabolic/suborbital) |
| AS-5 | Assay pipeline end-to-end | Raw → < 10 kB summary product with uncertainty, autonomously | Meteorite standards, blind test |
| AS-6 | Ejecta/particle event (Bennu-type) | Detect, characterise, maintain safe orbit | Sim |
| AS-7 | Solar conjunction (≤ 3° SEP) | 30 days unattended safe hold | Sim |

### 8.2 Link budget (X-band, reference)

| Parameter | Value |
|---|---|
| RF power | 35 W (15.4 dBW) |
| HGA | 0.8 m, η 0.55 → 34.4 dBi |
| EIRP | ~49.8 dBW |
| Range | 1.5 AU (FSPL 277.9 dB at 8.4 GHz) |
| Ground | DSN 34 m BWG, G/T ≈ 54 dB/K |
| C/N₀ | ≈ 54.5 dB-Hz |
| Required Eb/N₀ | 6.5 dB (turbo, incl. 3 dB margin) |
| **Data rate** | **~60 kbps at 1.5 AU**; ~20 kbps at 2.5 AU; ~500 kbps at 0.5 AU |
| Ka-band downlink option | ~3–4× rate. Decide at PDR against ground-station availability (bom-0-9). |

### 8.3 Data volume and antenna time
- **Per target:** **3–8 GB returned** (raw stored is ~50–100 GB; onboard selection and compression). My figure sits between Claude (0.5–3 GB, which I think under-counts SAP imaging and assay context) and Gemini (5–20 GB). Round-1 figures of 50–200 GB do not close.
- **Example:** 5 GB at 60 kbps ≈ 185 h of downlink.
- **Antenna hours:**
  - Proximity: ~6–10 h/day per scout during the 7–11 month campaign, ≈ 1,500–2,500 h per target.
  - Cruise: ~4 h/week per scout.
  - **Fleet peak (2035–2037, 4–5 scouts in proximity):** ~5,000–9,000 antenna-h/yr. This is a real procurement demand on bom-0-9: DSN not assumed free, plus ESTRACK and commercial 30 m-class.
- **Mitigation if contested:** stagger T2 arrivals by ≥ 4 months so no more than 3 scouts are in proximity concurrently.

### 8.4 SAP ↔ mothership link
UHF at 100–250 kbps over ≤ 10 km. Store-and-forward. The SAP holds 4 GB.

---

## 9. Interfaces and data products

These interface specs are currently `in_bom: false`. I propose they be created as ICDs owned by bom-0-1.

| To | Product | Format/content | Required by |
|---|---|---|---|
| bom-0-2 Mining Robots | Geotech dossier | Cohesion, grain-size distribution, regolith depth map, boulder SFD, anchor/drill force logs, slope, surface temperature, electrostatic/dust behaviour | bom-0-2 CDR |
| bom-0-3 Processing Plant | Ore dossier | Recoverable metal %, liberation vs grind, Ni/Co/S/P, silicate mineralogy, spatial variance | bom-0-3 PDR (mass balance) |
| bom-0-4 Cargo Tugs | Dynamics dossier | Ephemeris (improved via scout ranging), GM, spherical-harmonic gravity to degree 4, spin state, approach hazards | bom-0-4 mission design |
| bom-0-6 Water Pilot | Hydration dossier (C-type only) | EGA water %, 3 µm maps, OH/H₂O discrimination | bom-0-6 go/no-go |
| bom-0-15 Debris/Contamination | Ejecta behaviour, SAP-disturbed mass, propellant exhaust log | Model inputs for the ALARP case | Continuous |
| bom-0-9 / bom-0-10 | Antenna demand, ops concept | – | Scout PDR |
| bom-0-16 EP Propellant | ~0.9 t total (6 × 125 kg + test/spares) | Iodine or argon | Propellant decision at scout PDR |
| bom-0-12 Pathfinder | Target dossier, site-sentinel support | Optional nav-beacon/relay **not baselined** (agrees with Claude) | – |

**Ground-truth step.** Claude proposed a separate ground-truth line of $50–200M. **It is folded into this item:** the SAPs *are* the ground-truth step. bom-0-2 unit 1 as a demonstrator is rejected as the primary path. It arrives too late (post-0B commitment) to inform the decision it is meant to inform.

---

## 10. Contamination, debris and planetary protection (inputs to bom-0-15, D-03)

- **Planetary protection:** NEA targets are COSPAR Cat I–II. There is no sample return.
- **Assay integrity:**
  - Green-monoprop exhaust contains H₂O, CO₂ and N₂, which would corrupt hydration and C measurements. Rules: cold gas only below 500 m; witness plates on each SAP; full exhaust log.
  - Main EP plume (iodine deposition on optics and arrays, and on the surface) is excluded within 20 km during campaigns.
- **Ejecta:** escape speed at a 500 m body is ~0.2–0.3 m/s. Drilling, hopping and landing can loft material above it.
  - **Proposed interim ceiling for this item:** ≤ 100 g per site liberated above escape speed; no particles > 1 cm intentionally lofted.
  - The final number belongs to bom-0-15 under ALARP.
- **End of life:** scouts either remain as sentinels and are then disposed to a heliocentric orbit with no close approach to the target or SEL1 within 100 yr, or make a controlled landing outside the designated mining area. The choice is made with bom-0-15.

---

## 11. Manufacturing and AIT

| Article | Count | Notes |
|---|---|---|
| Mothership EM (engineering model) | 1 | Becomes the ops/HIL testbed |
| Mothership qual/protoflight | Protoflight on T1 unit 1 | Cost/schedule driven; a full qual unit is not affordable |
| Mothership flight | 6 (4–8) | Build in two lots |
| SAP EM + drop/parabolic test units | 3 | Reduced-gravity campaigns |
| SAP qual | 1 | Full environment plus drilling in vacuum with H-chondrite simulant |
| SAP flight | 12 (+1 spare in bom-0-14) | One production lot of 6 + one of 6 |
| EP thrusters | 18 flight + 3 life-test + 2 spare | Life test is the long pole |

Manufacturing considerations:
- **Bus approach.** Competitively procured from an ESPA-Grande/medium-smallsat EP bus supplier. Payload, SAP and assay instruments are integrated by a payload integrator, with the option of a single prime under fixed-price data-delivery terms.
- **Cleanliness.** EGA demands organics/water cleanliness comparable to OSIRIS-REx sample-hardware levels for the SAP sample path only. Elsewhere, standard ISO 8.
- **Magnetic cleanliness.** The assay-cell magnet (~0.3 T) is shielded. No mothership magnetometer is baselined, so there is no conflict.
- **Iodine compatibility.** Materials selection excludes iodine-susceptible metals (Cu, Ag, some Al alloys unprotected) in plume and feed regions. Optics carry a plume-deposition contamination budget.
- **Calibration.** Every SAP flight unit is calibrated against the A6 meteorite standards (H, L, LL, EH, CM).
- **Learning.** I assume an 85–90 % unit learning curve between lots. This is modest: lots are small.

---

## 12. Development roadmap and technology readiness

### 12.1 Critical-technology breakdown

| Sub-technology | TRL now | AD² | Path to TRL 6 (relevant environment) | By |
|---|---|---|---|---|
| T11a 1–1.5 kW iodine Hall + heated feed | 4–5 (lab-tested at 0.2–1.5 kW; no flight; limited public life data) | 5 | 3,000 h wear test by PDR; 6,500 h qual life test | PDR 2028 (3,000 h); qual 2030 |
| T11a′ argon Hall (alternate) | 5–6 (argon Hall flies on Starlink V2-mini but is proprietary; merchant units lower TRL) | 4 | Vendor qualification; efficiency at 1.25 kW | PDR 2028 |
| T11b Proximity autonomy (NFT, lidar, abort) | 6–7 (OSIRIS-REx, Hayabusa2) | 3 | Re-host on smallsat avionics; HIL | CDR 2029 |
| T11c Smallsat deep-space bus (5–7 yr, 40-min RTLT) | 5–6 | 4 | EM HIL; T1 flight | T1 2031–33 |
| T18a Anchoring in micro-g regolith | 3 (Philae failure; MINERVA/MASCOT landed unanchored) | **6** | Parabolic + suborbital (≥ 2 min micro-g) + vacuum chamber with simulant at 1/6-g offload; analysis | PDR: TRL 4; CDR: TRL 5; T1 flight: TRL 7 |
| T18b 1 m drill in micro-g, cohesionless regolith | 3–4 (lunar/Mars drills; Philae SD2 partial) | **6** | As above, plus torque/thrust-limited drilling at weight on bit ≤ 5 N | Same |
| T18c Centrifuge sieve/magnetic separation/mass balance | 2–3 | 5–6 | Breadboard 2027, EM 2028, parabolic 2029 | CDR: TRL 5 |
| T18d Micro-XRF, NIR microscope, EGA, contact GRNS | 6–8 (PIXL, MicrOmega, Ptolemy/SAM, DAN) | 2–3 | Repackaging | CDR |

**Reading against D-02:**
- Internal 0A milestones need TRL 4–5. That is met by CDR, except T18a/b, which reach TRL 5 at CDR by a narrow margin. This is the item's schedule risk.
- KDP-0B needs TRL 6 in a relevant environment. For T11 and T18, T1 flight at a real asteroid is the relevant environment: **flight on T1 achieves TRL 7 and T2 TRL 8**, satisfying KDP-0B with no waivers *if* T1 succeeds.
- If T1 sampling fails, KDP-0B cannot be passed on bom-0-1 evidence before ~2037–38.

### 12.2 Schedule

```
            2027    2028    2029    2030    2031    2032    2033    2034    2035    2036    2037    2038
RSP         [A1–A7 ===========================================================================]
Accessib.   [A4==]
Iodine life   [3,000h=====][qual life 6,500h=====]
SAP dev     [BB][EM===][parabolic/suborbital==][qual==]
Scout       SRR  PDR●     CDR●   [T1 AIT=====]
                 (prop.        ▲ T2 long-lead order
                  decision)
T1 (2)                                   L▲─cruise─────[prox+SAP]──● Gate A (2033)
T2 (2–6)                                                [AIT====]  L▲──cruise────[prox+SAP]──●
Target gate                                                                         ● T-gate v1 (2036, from T1)
                                                                                            ● T-gate final (2037–38)
KDP-0B                                                                                       ◆ (earliest ~2037)
```

**Schedule-compression option** (not recommended): launch T2 in 2032 without Gate A. This saves ~2 yr but commits ~$250M before the sampler is proven. It is a values decision for the programme authority.

### 12.3 Gates

| Gate | Pass criteria | Fail action |
|---|---|---|
| Scout PDR (propellant decision) | Iodine ≥ 3,000 h with < 10 % performance drift and erosion projecting ≥ 6,500 h → iodine. Otherwise argon with 1 SAP per scout or a mass waiver. | Argon path |
| Gate A (T1 results) | ≥ 1 SAP core to ≥ 0.8 m in ≥ 2 of 3 attempts; assay within ±15 % of in-flight standard; EP within 10 % of predicted; posterior p computed | Redesign SAP (+18 months), or fly T2 as remote-only plus pneumatic shallow sampler (descope) |
| Target gate (D-02) | ≥ 1 target commit-grade at ≥ 90 % confidence; 1 backup at ≥ 70 % | Hold 0B; extend RSP; 0B scouts |

---

## 13. Cost analysis (2026 USD)

### 13.1 bom-0-1 line, 0A

| Element | Low | Nominal | High | Basis |
|---|---|---|---|---|
| A. Remote Survey Programme | 30 | 45 | 67 | §3.1 bottom-up |
| B1. Scout development, item-specific (design, EM, protoflight qualification, SAP and assay instrument development, iodine thruster qual life test, software) | 180 | 240 | 320 | Analogy: Lunar Trailblazer (~$72M, simpler), Janus (~$50M for two flyby craft), MASCOT/MINERVA landers, Hayabusa2 (~¥29B incl. launch). Plus AD² 6 sampler penalty. |
| B2. Flight units: T1 2 × $70M (55–85); T2 4 × $55M (45–70) | 200 | 360 | 480 | Bus ~$30–45M, SAP pair ~$15–25M, integration ~$5M. Learning ~85–90 %. Range covers N = 4 (low) to N = 8 (high) at ~$55M recurring. |
| B3. Assay calibration lab, data products, instrument teams | 20 | 35 | 45 | 8–15 FTE over ~8 yr, standards |
| **bom-0-1 total, 0A** | **~495** | **~680** | **~900** | |

**Not in this line (to avoid double counting), with my allocation estimates:**

| Line | Estimate | What |
|---|---|---|
| bom-0-8 Launch | $60–140M | 2 dedicated medium-lift launches to C3 ≈ 0, stacked; or 1 dedicated + 1 shared with bom-0-12 |
| bom-0-9 Comms/ground | $30–80M | ~25,000–40,000 antenna-hours total plus ground software |
| bom-0-10 Mission ops | $60–120M | Flight team 2031–2038 |
| bom-0-11 NRE (cross-cutting) | $10–25M | Reduced-gravity regolith test facility, simulant production (shared with bom-0-2) |
| bom-0-14 Spares | $15–30M | Spare SAP, spare thrusters, EM refurbishment |
| bom-0-15 Debris | $3–8M | Plume/ejecta modelling and witness hardware |
| bom-0-16 Propellant | < $0.3M | ~0.9 t iodine at ~$50–150/kg; argon cheaper |
| bom-0-17 Reserve | Recommend **35–50 % of bom-0-1** (~$240–340M) | AD² 6 sampler plus first-of-kind EP |

**All-in scout mission** (for comparison with GPT's all-inclusive figure): ~$0.68 + 0.27 ≈ **$0.95B** before reserve ($0.66–1.28B). With reserve it is about **$1.2–1.4B**.

### 13.2 0B option

| Element | Range |
|---|---|
| 0–2 site-confirmation scouts at ~$55–65M recurring (existing design) | $0–130M |
| RSP continuation | $5–15M |
| **Total bom-0-1, 0B** | **$5–145M**, sized at the 0B gate per D-01 |

### 13.3 Lean alternative (descope option, not recommended)

4 scouts, 1 SAP each, no contact GRNS, no secondary targets, Δv 3.5 km/s, wet ~430 kg.

- bom-0-1 ≈ $430M (360–560).
- P(≥ 2 commit-grade) ≈ 0.6–0.75 at p = 0.4–0.5.

It is cheaper, but the 0B decision then rests on fewer sites. **It is the right fallback if Gate A forces a descope or if argon is chosen.**

### 13.4 Where I disagree with round-2 cost figures

| Round-2 figure | My view | Why |
|---|---|---|
| Claude $30–80M per scout | Too low as all-in; about right as recurring | My all-in is ~$100M per scout ((240 + 360)/6). The sampler and assay cell are AD² 6. |
| GPT $25–75M per scout | Same as above | Same |
| Gemini $45–120M per unit, applied to 10 units including 2 telescopes | Scout range is plausible; telescopes rejected | §3.2 |
| Survey data: Claude $20–60M, GPT $20–100M | $30–67M | No hardware; radar and purchased time are the drivers |
| Reconciliation's $12–35M recurring (200 kg remote-sensing craft) | Superseded | No subsurface sampling in that design |
| Claude's $50–200M ground-truth line | Folded in | SAPs are the ground truth |

**Confidence.** Low–medium on the $680M nominal. I would put about 50 % probability on landing within ±25 % of nominal. Overrun is more likely than underrun, which is why I recommend a 35–50 % reserve held in bom-0-17.

---

## 14. Risk assessment

| # | Risk | L | C | Mitigation |
|---|---|---|---|---|
| R1 | Anchoring/drilling fails in micro-g (Philae-type) | M–H | H (no ground truth) | Screw anchors plus hold-down thrust; pneumatic shallow backup head; 2 SAPs per scout; hop-and-retry; reduced-gravity test campaign; Gate A |
| R2 | Iodine Hall life short or corrosion/contamination problems | M | M–H | 3,000 h test before PDR; argon alternate with stated mass penalty; cold-spare thruster |
| R3 | Mass growth > 15 % margin | H | M | Secondary target and contact GRNS are pre-declared descopes; argon path drops one SAP |
| R4 | Pre-screen hit rate p < 0.3 | M | H | A5 validation; tranching; posterior-based T2 sizing; 0B option |
| R5 | Few targets that are both scout- and tug-accessible | M | H | A4 study by 2028. **Falsifier: < 20 joint-accessible metal-plausible candidates** → re-open the target strategy with bom-0-4 and D-04. |
| R6 | DSN/deep-space aperture unavailable at fleet peak | M | M | Stagger arrivals; Ka option; ESTRACK/commercial; onboard summarisation |
| R7 | Assay not representative of bulk (sampling bias, nugget effect for metal) | M | H | ≥ 3 sites × ≥ 2 cores; contact GRNS bulk cross-check; density from radio science |
| R8 | Hazardous body environment (Bennu-like particle ejection, fast rotator, binary) | M | M | Approach characterisation before descent; AS-6 |
| R9 | Exhaust contamination of hydration/C assays | M | M (C-type only) | Cold gas below 500 m; witness plates; exhaust log |
| R10 | Planetary radar capacity lost or unpurchasable | M | L–M | SPHEREx/NEO Surveyor albedo and thermal substitute; lower prior confidence |
| R11 | Schedule slip pushes the Target gate past Phase 1 need | M | H | Long-lead parallelism; compression option is a programme-authority decision |
| R12 | Single-launch common-mode loss of a tranche | L | H | T1 two scouts on one vehicle is accepted. T2 may be split across two launches if cost allows (bom-0-8). |

---

## 15. Summary of disagreements with round 2 and reconciliation

1. **Fleet: 6 (4–8) × ~550 kg, not 12–16 × 200 kg.** Subsurface sampling and assay do not fit in 200 kg. The binding scope already moved to 200–600 kg.
2. **No dedicated telescopes** (contra Gemini). Buy time; ingest SPHEREx and NEO Surveyor data.
3. **Fleet requirement is ≥ 2 Fe-Ni commit-grade targets.** It is not 10–12 viable targets (contra Gemini, whose figure was sized for a 20-robot, 4-plant architecture that no longer exists). A C-type is opportunistic.
4. **Δv 4.5 km/s.** Gemini's 3.2 km/s is internally inconsistent. Claude's 5.0 assumed two full rendezvous at 200 kg.
5. **Propellant.** I follow D-05 (iodine reference, argon alternate), not Claude's Kr/Xe. I quantify that argon breaks the 600 kg envelope. I add a PDR decision rule backed by a life test.
6. **Thermal IR baselined** (contra GPT's open trade). **Orbital GRNS rejected in favour of contact GRNS on the SAP.**
7. **2 pathfinders, not 4.** Each unit is now expensive.
8. **Ground truth folded in.** Claude's separate $50–200M line would double count.
9. **Gates are evidence-based** (GPT), with long-lead parallelism (Claude). This rejects Gemini's hard "no bom-0-2 build until data" in favour of blocking *fabrication commitment* only.
10. **Downlink of 3–8 GB per target**, with fleet antenna demand of 5,000–9,000 h/yr at peak. That is larger than any round-2 estimate and has to be procured.
11. **Costs are higher than Claude's and GPT's per-unit figures.** All-in is about $100M per scout; the line is $680M nominal.

---

## 16. Open engineering questions

| # | Question | Settling evidence | Needed by |
|---|---|---|---|
| Q1 | How many NEAs are jointly scout-accessible (≤ 3.5 km/s) and tug round-trip accessible to SEL1 (D-04) for 2030–2040 windows? | A4 study with bom-0-4 | PDR 2028 |
| Q2 | What recoverable-metal threshold closes the bom-0-3 mass balance at 0.6–2.5 kt/yr? | bom-0-3 mass balance plus A6 analog processing tests | Scout SRR 2027 (sets assay accuracy) |
| Q3 | Does SPHEREx deliver usable NEA spectra, including 3 µm, at the needed SNR for shortlist objects? | A1 pipeline on early SPHEREx data | 2027 |
| Q4 | What is p, validated retrospectively? | A5 | PDR 2028 (prior); Gate A (posterior) |
| Q5 | Can a ≤ 5 N weight-on-bit drill reach 1 m in cohesionless regolith with cm clasts, with reaction loads below screw-anchor capacity? | Reduced-gravity and offloaded vacuum tests | CDR 2029 |
| Q6 | Does centrifuge magnetic separation of < 1 mm H-chondrite material replicate full-scale beneficiation recovery to within ±10 %? | A6 bench tests vs bom-0-3 pilot | CDR 2029 |
| Q7 | Iodine Hall wear rate and plume deposition at 1.25 kW over ≥ 3,000 h? | Life test | PDR 2028 |
| Q8 | Is the 15 % system margin survivable, or do we pre-select the 1-SAP configuration? | Bottom-up mass at PDR | PDR 2028 |
| Q9 | Can contact GRNS give useful bulk Ni/Fe in 3–7 days of integration? | Sensitivity analysis plus analog test | PDR 2028 |
| Q10 | How much deep-space aperture can bom-0-9 procure for 2033–2038, and at what cost? | Negotiations | PDR 2028 |
| Q11 | Is a fixed-price "delivered target dossier" data-buy viable from commercial providers? | RFI to industry | SRR 2027 |
| Q12 | What false-commit probability will the programme authority accept? This sets the 90 %/70 % confidence thresholds and the 0.85 coverage probability. | Programme-authority statement (bom-0-7) | SRR 2027 |
| Q13 | Should T1 scouts become site sentinels (extended ops cost, ~$5–10M/yr in bom-0-10) or proceed to secondary targets? | Value-of-information at Gate A | 2033 |
| Q14 | What is the ALARP ejecta ceiling for sampling and hopping? | bom-0-15 modelling | CDR 2029 |

---

**Recommendation to the owner.**
1. Approve bom-0-1 0A at **$680M nominal ($495–900M)**, with 6 scouts in two tranches and a post-T1 Gate A that resizes T2 between 2 and 6 units.
2. Fund the RSP and the iodine life test immediately. Those two items, Q1 and Q7, carry the most information per dollar in the entire item.
3. Hold the 0B option at $0–145M, sized at the 0B gate.