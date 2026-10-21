---
bomId: "bom-0-15"
itemName: "Debris and Contamination Control"
itemSlug: "debris-contamination"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-15 Debris and Contamination Control: Technical Proposal (Phase 0A + 0B)

**Status:** Proposal for configuration control. All numbers are estimates with stated basis. The interim ceiling below is offered under D-03 (proposed). It is a design ceiling for modelling, test and licensing, not a final regulatory value.

---

## 0. Executive Position

1. **The binding constraint is self-contamination, not third-party risk.** An order-of-magnitude analysis (§2.3) shows escaped fines from a 1 kt/yr Phase 0 site add a negligible fraction (below about 10⁻⁶) to the natural meteoroid fluence anywhere off-site, even at 99% containment. The same escaped mass, partly redeposited on our own arrays, radiators and optics, would cost tens of percent of site power per year. Third-party arguments do not set the particulate ceiling. **Our own power and thermal budget does.**

2. **Specify tailings by mass and size, not by containment percentage.** At 7–20:1 ore-to-product ratios, Phase 0 handles roughly 2–25 kt/yr of rejected material, against 0.6–2.5 kt/yr of product. A "99%" requirement on that stream leaks 20–250 t/yr. The requirement must be expressed as:
   - an escaped-mass fraction of *handled* mass,
   - an absolute per-site cap, and
   - separate count limits for macroscopic (≥1 cm) objects.

3. **Third-party risk concentrates at two points:**
   - macroscopic objects and fragmentation events anywhere, and
   - **any release at the SEL1 receiving node.** SEL1 is unstable, and roughly half of what leaves it departs on Earthward manifolds into cislunar space. It also hosts high-value space-weather spacecraft (SOHO, ACE, DSCOVR, Aditya-L1, IMAP and successors).

   The node must therefore be a zero-intentional-release zone. Product shipped there must be monolithic.

4. **Proposed interim ceiling (D-03):**
   - Escaped particulate (1 µm–1 cm) ≤ **1×10⁻⁴ of handled mass**, and ≤ **2 t/yr per site** absolute. ALARP target is 1×10⁻⁵.
   - Escaping objects ≥1 cm ≤ 10 per site-year, each logged.
   - Zero intentional release at SEL1.
   - The 10⁻⁴ figure is *derived* from the array-obscuration budget (§3.2). It is not picked as "tighter than 99%".

5. **Item cost: $125–250M total (point ≈ $180M).** 0A is $55–110M; 0B is $70–140M and is sized at the gate by target class. This excludes the shroud and enclosure hardware carried in bom-0-2 and bom-0-3, which I estimate at a further $15–40M. That figure is shown for visibility only and is not double-counted.

6. **Containment is a project-ending technology under D-02.** If fines cannot be contained, the site cannot be licensed and its own arrays will be fouled. Fines consolidation and shroud containment must therefore reach **TRL 6 in a relevant environment before KDP-0B**. That effectively requires a containment experiment on the 0A pathfinder (bom-0-12) at a real NEA.

---

## 1. Scope, Boundaries and Design Philosophy

### 1.1 What bom-0-15 owns

| Owned here (costed here) | Imposed here, built elsewhere (not costed here) |
|---|---|
| Debris and contamination requirements, ALARP framework, safety case and licensing dossier content | Excavation-head shrouds and skirts (bom-0-2) |
| Modelling: ejecta (DEM), near-body dust dynamics, heliocentric trail, SEL1 manifolds, plume contamination | Beneficiation and melting enclosures, off-gas cold traps (bom-0-3) |
| Ground and reduced-gravity test campaigns for containment and consolidation | EP plume keep-out compliance and disposal Δv on tugs (bom-0-4) |
| **Tailings Consolidation System (TCS):** fines consolidation units, placement and capping tools, sealed totes, contingency bags | Array and radiator siting, and any EDS on arrays (bom-0-5) |
| **Site Debris Monitoring System (SDMS):** cameras, dust flux monitors, TQCMs, witness imagers, sentinel instrument package | Monitoring free-flyer bus: a repurposed scout from bom-0-1, or the comms relay from bom-0-9 |
| SEL1 node contamination monitoring package (instruments only) | Node structure and product handling (bom-0-13) |
| Pathfinder Containment Demonstration Experiment (CDE) payload | Pathfinder bus, integration and launch (bom-0-12, bom-0-8) |
| EOL passivation and disposal *standards* and verification analysis | Delivery mass of TCS and SDMS to the NEA (bom-0-8, bom-0-4) |
| Independent compliance monitoring, reporting, open-data release | Operations staff (bom-0-10); organisational licensing function (bom-0-7) |

### 1.2 Design philosophy (opinionated)

- **P1. Nothing granular sees open vacuum above 10% of local escape speed.** On a 500 m rubble pile, v_esc ≈ 0.26 m/s, so 10% is about 2.5 cm/s. Cutting, crushing and conveying all happen inside a mechanical boundary. Bulk transfer between process steps uses sealed totes, not open conveyors.
- **P2. Separate first-party from third-party risk.**
  - Self-contamination is an *economic* optimisation and is traded against power and maintenance cost.
  - Third-party risk is governed by *ALARP*, with a gross-disproportion factor of 10.

  Mixing the two inflates budgets and confuses licensing.
- **P3. Consolidate fines, cap sand, never vent.** The <~40 µm fraction is the mobile, electrostatically active, optics-fouling fraction, and it is consolidated into sintered bricks. Coarser tailings go back into mined-out cells at low velocity under a sintered cap.
- **P4. Measure the natural baseline first.** Small NEAs shed material naturally; OSIRIS-REx documented mm–cm particle ejections from Bennu at roughly 0.1–3 m/s. Before operations, the SDMS characterises the target's natural loss rate. Operational escape is reported both absolutely and relative to that baseline.
- **P5. Monitoring is organisationally independent of production.** The plant operator does not certify its own leak rate. This is the main reason I disagree with folding this item "within plant/development" (GPT round 2).
- **P6. Product form is a contamination control.** Fe-Ni leaves the NEA as ingots, plates or coiled wire with no free particulate. Powder or shot product is prohibited in Phase 0 unless shipped in sealed canisters.
- **P7. Stated in Phase 0 units, scalable to Phase 1.** Absolute caps plus fractional limits mean a 100–1000× Phase 1 scale-up cannot silently inherit Phase 0 permissions.

---

## 2. Hazard Model: Where Escaped Material Goes and Why It Matters

### 2.1 Reference target and site (design point; envelope in brackets)

| Parameter | Design point | Envelope | Basis |
|---|---|---|---|
| Target diameter | 500 m | 150 m–2 km | Low-Δv NEA population |
| Bulk density | 2,000 kg/m³ | 1,200–4,500 | Rubble pile to M-type |
| Surface gravity | 1.4×10⁻⁴ m/s² | 3×10⁻⁵–1×10⁻³ | GM/r² |
| Escape speed | 0.26 m/s | 0.06–1.0 m/s | √(2GM/r) |
| Hill radius at 1 AU | ~30 km | 9–120 km | a(m/3M☉)^⅓ |
| Rotation period | ≥4 h required | — | Fast rotators (<2.5 h) have near-zero or negative equatorial effective gravity. Fed to bom-0-1 target criteria |
| Delivered product | 1.3 kt/yr Fe-Ni | 0.6–2.5 | Agreed range |
| Native metal grade | 15 wt% (H-chondrite-like) | 5% (L/LL) – 50%+ (M) | Meteorite analogues |
| Magnetic recovery | 80% | 70–90% | Terrestrial magnetic separation, derated |
| Ore:product | ~8:1 | 2.5:1 – 20:1 | Grade × recovery |
| **Tailings mass** | **~10 kt/yr** | **2–25 kt/yr** | Ore − product |
| Handled mass (excavated + moved) | ~12 kt/yr | 3–30 kt/yr | Basis for escape fraction |
| Grind size for liberation | P80 ≈ 200 µm | 100–500 µm | Chondrite metal grains 50–500 µm |
| Fines (<40 µm) fraction of tailings | 20% (~2 kt/yr) | 10–30% | Comminution of friable chondrite |
| Site array area | ~8,000 m² | 3,000–12,000 | ~2 MWe at ~250 W/m² (bom-0-5 to confirm) |

**Implication:** the entire tailings stream is sand and silt. "Coarse" means 40–500 µm sand. Van der Waals cohesion dominates over gravity for grains up to about cm scale at 10⁻⁴ g. Placed sand therefore coheres if it is not disturbed at speed. Whether fines loft electrostatically against that cohesion is **the** central open question (§13, Q1).

### 2.2 Size-bin behaviour of escaped grains

Radiation-pressure parameter β ≈ 0.57·Q_pr/(ρ[g/cm³]·s[µm]), with ρ = 3 g/cm³ and s the grain radius.

| Size bin (diameter) | β | Fate after escape | Hazard |
|---|---|---|---|
| < 1 µm | > 0.3 | Unbound (β>0.5) or highly eccentric; leaves the inner system within years | Self-contamination while near site only |
| 1–40 µm | 0.01–0.4 | Eccentric heliocentric orbits; Poynting–Robertson decay into the zodiacal cloud over 10⁴–10⁵ yr | Self-contamination (optics, radiators, HV connectors) |
| 40 µm–1 mm | 4×10⁻⁴–0.01 | Forms a trail around the NEA orbit; SRP-driven along-track spreading of ~0.5% of circumference per orbit | Precedent for Phase 1 streams; local deposition |
| 1 mm–1 cm | <4×10⁻⁴ | Compact trail near the NEA for decades | Spacecraft-damaging at km/s; untrackable |
| ≥ 1 cm | — | Ballistic, co-orbital | Potentially lethal; must be counted individually |

**Near-body behaviour.** For a 100 µm grain at 1 AU, SRP acceleration is about 2×10⁻⁵ m/s², roughly 15% of surface gravity at the design-point target. Within 2–3 body radii, SRP and gravity are comparable. Lofted-but-bound grains are therefore stripped **anti-sunward** within about one orbit. Dust does not accumulate in a persistent cloud; it streams into an anti-solar tail. This dictates site geometry: sensitive free-flyers stay sunward (§5.2).

### 2.3 Third-party flux at Earth: order-of-magnitude check

Assume the worst case for stream formation: all escaped mass is 100 µm grains.

- **Escaped mass:** 1.2 t/yr (at the 10⁻⁴ ceiling) × 5 yr of 0B = 6 t, or about 3.8×10¹² grains.
- **Trail geometry after 5 yr:**
  - along-track length ~3×10¹⁰ m, driven by β-induced period change;
  - radial width ~β·a ≈ 6×10⁸ m;
  - vertical thickness ~(Δv/v)·a ≈ 1.5×10⁶ m.
- **Number density:** ~10⁻¹³ m⁻³.
- **Fluence per Earth trail crossing:** ~2×10⁻⁷ m⁻², if geometry permits a crossing at all. Low-Δv NEAs have long synodic periods, so crossings are rare.
- **Natural sporadic background** for grains ≳100 µm at 1 AU: of order 10–100 m⁻² yr⁻¹ (Grün-type models).
- **Ratio:** about 10⁻⁸ per crossing at the ceiling, and about 10⁻⁶ at a 99% containment level. **Negligible either way.**

For scale, the DART impact released an estimated ~10⁶–10⁷ kg of ejecta in one event, 6–7 orders of magnitude more than the Phase 0 ceiling allows per year.

**Conclusion.** Third-party particulate risk from the NEA site does not drive the particulate ceiling in Phase 0. It does matter for:
- (a) macroscopic objects,
- (b) the SEL1 node,
- (c) the Phase 1 precedent, where 10–100 kt/yr escaping over decades is no longer negligible in absolute terms, and
- (d) public licensing confidence.

### 2.4 Self-contamination: the actual driver

Array obscuration by deposited grains of diameter d: areal mass m_A ≈ f·(2/3)·d·ρ for coverage fraction f.

For f = 1% and d = 10 µm: m_A ≈ **0.2 g/m²**. On 8,000 m² of arrays, **1.6 kg of deposited dust costs about 1% of site power.**

Let η be the fraction of escaped and lofted mass intercepted by site arrays. A geometric estimate for arrays elevated and ≥300 m from open work gives η of about 10⁻³ (TBR, Q3).

| Containment | Escaped (12 kt/yr handled) | Deposited on arrays (η=10⁻³) | Power loss per year |
|---|---|---|---|
| 99% | 120 t/yr | 120 kg | ~75% (unacceptable) |
| 99.9% | 12 t/yr | 12 kg | ~7.5% |
| **99.99% (proposed ceiling)** | **1.2 t/yr** | **1.2 kg** | **~0.75%** |
| 99.999% (ALARP target) | 0.12 t/yr | 0.12 kg | ~0.08% |

The same logic applies to radiator absorptance (α), navigation optics and HV connector creepage.

### 2.5 SEL1: why the node is special

- Sun–Earth L1 halo and Lissajous orbits are unstable, with e-folding times of order a month. Untracked material released with cm/s–m/s Δv departs the vicinity in roughly 2–6 months.
- About half departs on the **Earthward** unstable manifold branch, passing through cislunar space at around 1 km/s relative to Earth. Most passes by; a small fraction impacts Earth or the Moon or is temporarily captured.
- A 1 cm Fe-Ni fragment striking a GEO or cislunar spacecraft at 2–4 km/s is lethal.
- Mm–cm objects at 1.5×10⁶ km cannot be tracked from Earth, so prevention is the only control.
- The node shares the region with operational spacecraft. Close-approach screening with their operators is mandatory and is scoped here as analysis and agreements (operations sit in bom-0-10).

Under D-04 the node location is interim. The requirement set is written orbit-agnostically, with an SEL1-specific annex to be redone if the 0B gate moves the node.

---

## 3. Requirements and Interim Ceiling (D-03)

### 3.1 ALARP structure

```
   Escaped particulate fraction of handled mass (1 µm – 1 cm)
   ────────────────────────────────────────────────────────────────
   ≥ 1e-3   │ INTOLERABLE  → automatic site-level stop; return to
            │                ground review; licence notification
   ─────────┼──────────────────────────────────────────────────────
   1e-4     │ INTERIM DESIGN CEILING (DCC-C1)
            │ TOLERABLE    → operate only with an ALARP case;
            │                gross-disproportion factor 10 for
            │                third-party measures, cost/benefit
            │                (factor 1–3) for first-party
   1e-5     │ ALARP TARGET
   ─────────┼──────────────────────────────────────────────────────
   ≤ natural│ BROADLY ACCEPTABLE → ops-induced loss indistinguish-
   baseline │                able from measured natural shedding
   ────────────────────────────────────────────────────────────────
```

### 3.2 Requirement set (DCC = Debris & Contamination Control)

| ID | Requirement | Value (interim) | Basis | Verification |
|---|---|---|---|---|
| DCC-C1 | Escaped particulate, 1 µm–1 cm, fraction of handled mass, per site-year | ≤1×10⁻⁴ ceiling; 1×10⁻⁵ target | §2.4 array budget at η=10⁻³ | SDMS flux counting + calibrated model (§6.3) |
| DCC-C2 | Absolute escaped particulate cap per site (Phase 0) | ≤2 t/yr | Prevents throughput scaling eroding margin; ~10³× below precedent concern | As C1 |
| DCC-C3 | Escaping objects ≥1 cm | ≤10 per site-year logged; none intentional | Lethality; untrackable | Ejecta cameras; event log |
| DCC-C4 | Escaping objects ≥10 cm | P ≤ 1×10⁻² per site-year (design); zero intentional; each published with ephemeris | Third-party lethality; precedent | Design analysis; force-limited tooling |
| DCC-C5 | Escape definition | Mass crossing a 1 km radius control sphere outbound with v > local escape speed, plus SRP-stripped mass (model-assigned) | Measurable surface inside Hill sphere | — |
| DCC-C6 | Ops-attributable array power loss | ≤1%/yr | Economics; TBR with bom-0-5 | TQCM + witness imagers + I-V trending |
| DCC-C7 | Ops-attributable radiator Δα | ≤0.01/yr | Thermal margin | Witness coupons (in-situ reflectometer) |
| DCC-C8 | Navigation/monitoring optics obscuration | ≤0.5%/yr; dust covers or EDS on all optics | Autonomy depends on optics | Dark/flat-field trending |
| DCC-C9 | Placement velocity of any granular material in open vacuum | ≤10% of local v_esc (≤2.5 cm/s at design point) | P1 | Tool qualification |
| DCC-C10 | EP plume impingement | No direct plume (≤30° half-angle cone, ≤50 km) on asteroid surface, site assets, node, or product. Main EP off inside 10 km of site or node except along an approved corridor | Sputtering and dust lofting by 20–40 km/s ions; iodine chemistry | Trajectory rules (bom-0-4); TQCM |
| DCC-C11 | Molecular deposition on arrays, radiators, optics (incl. iodine, sulfur, carbonyl products) | ≤1 µg/cm² over life, iodine ≤0.1 µg/cm² (TBR pending test) | Ag interconnect and coating chemistry | TQCM; coupon tests |
| DCC-C12 | Process effluent | No vent of condensable process gas (S₂, H₂O, CO/CO₂, carbonyls, organics) to open vacuum except via approved stack aimed anti-sunward and away from assets, at ≤10 g/day (TBR) | Self-contamination; P1 | bom-0-3 cold-trap qual; TQCM |
| DCC-C13 | SEL1 node release | Zero intentional particulate release. P(release ≥1 mm) ≤1×10⁻³ per product transfer. No open machining or cutting at node in Phase 0. Product monolithic or canned | §2.5 | Node package; handling qual |
| DCC-C14 | Product form | Ingot, plate or wire. Surface free of adhered fines (≤1 g/m² residual, TBR). No free powder or shot | P6 | Pre-departure camera inspection + witness |
| DCC-C15 | Fragmentation | Zero fragmentation events. All batteries (10–50 kWh robot packs, site storage) and pressure vessels passivatable on command and autonomously on loss of comms >30 days | IADC/ISO 24113 analogue | Design review; passivation test |
| DCC-C16 | EOL disposal, site hardware | Failed robots and units anchored at site (salvage store) or consolidated into tailings cells. No free-floating hardware | Avoid macroscopic debris | Ops procedure |
| DCC-C17 | EOL disposal, tugs | Passivated. Heliocentric disposal orbit with no Earth approach <0.05 AU and no SEL1/SEL2 region passage for 100 yr, or attached to the NEA | Third-party | Disposal analysis (here); Δv reserve (bom-0-4) |
| DCC-C18 | Natural baseline | ≥90 days SDMS operation before first excavation. Natural loss rate published | P4 | Data product |
| DCC-C19 | Monitoring independence | SDMS data chain and compliance analysis independent of plant operations. Raw data openly published within 90 days | P5 | Org audit |
| DCC-C20 | HV interfaces | 1–3 kV tether connectors and terminations dust-sealed. Creepage designed for conductive Fe-Ni-bearing dust films | Arc risk in dusty environment | Dusty TVAC test |
| DCC-C21 | Post-mission stability | Capped tailings cells shall release no more than an equivalent area of undisturbed regolith (thermal cycling, micrometeoroid gardening) | Long-term liability | Pathfinder cap test + analysis |

**TBR closure:** η, C6 and C11 close at the end of 0A. C1 and C2 are re-derived at KDP-0B from measured η and from the licensing state's position (D-03).

---

## 4. System Architecture

### 4.1 Material and control flow at the NEA site

```
                ┌──────────────────────── CONTAINMENT BOUNDARY ───────────────────────┐
                │                                                                      │
  Regolith ──►  │ [bom-0-2] Shrouded excavation head ──sealed tote──► [bom-0-3] Plant │
  in place      │   skirt + inner catch,  load cells                  enclosed crush, │
                │   ejecta cams (SDMS)                                magnetic sep,   │
                │                                                     melt, S cold-trap│
                │                                                        │   │   │     │
                │                    ┌───────────────────────────────────┘   │   └──► Fe-Ni ingot/plate
                │                    │ fines <40 µm                           │ sand 40–500 µm     │
                │                    ▼ (sealed tote)                          ▼ (sealed tote)     │
                │        ┌─────────────────────────┐              ┌───────────────────────┐     │
                │        │ TCS: Fines Consolidation│  bricks ───► │ TCS: Placement &      │     │
                │        │ Unit (press + solar-    │  (cap units, │ Capping tools (on     │     │
                │        │ thermal sinter kiln) ×2 │   berms)     │ bom-0-2 chassis)      │     │
                │        └─────────────────────────┘              │ backfill ≤2.5 cm/s    │     │
                │                                                  └───────────┬───────────┘     │
                │                                                              ▼                 │
                │                                     Mined-out cell: compacted sand + brick cap │
                └────────────────────────────────────────────────────────────────────────────────┘
                                │ event/flux/deposition data (independent chain)
                                ▼
   SDMS: ejecta cameras · dust flux monitors · TQCMs · witness imagers · sentinel free-flyer
                                │
                                ▼
   Site autonomy (dust reflex / sector stop) ──► bom-0-9 DTN link ──► Independent compliance cell
                                                                       (open-data, licence reports)
```

### 4.2 Site geometry (plan view, sunward up)

```
                              ☉  Sun direction
                              │
               Sentinel free-flyer (sunward, 2–10 km, terminator/hover)
                              │
       ┌───────────── Tug approach corridor (EP off <10 km; plume never at surface) ──┐
       │                                                                              │
       │            ▲▲▲  Array field (elevated masts 10–20 m, ≥300 m from open work,   │
       │            ▲▲▲  edge-on to work zones where possible)  [bom-0-5]             │
       │                                                                              │
       │     ◎ cam       ◎ cam        ◎ cam         ◎ cam      (ring at ~50–150 m     │
       │         ┌──────────┐   ┌────────┐   ┌───────┐           around work zones)   │
       │         │Excavation│   │ PLANT  │   │ FCU×2 │ ◎ cam                          │
       │         │ zone(s)  │──►│(0-3)   │──►│ kilns │                                 │
       │         └──────────┘   └────────┘   └───────┘                                 │
       │     ◎ cam    │ backfill cells (capped) ■■■ ■■□ □□□                            │
       │              └────────────────────────────────                                │
       └──────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼  anti-sunward: SRP-stripped dust tail.
                                 No assets parked here; process vent stack aims here.
```

On a rotating body, "sunward" for surface assets is a time-average. The rule therefore applies strictly to free-flyers, to vent-stack pointing and to the tug corridor. For surface arrays it is replaced by distance, elevation and EDS (§6.4).

---

## 5. Subsystems

### 5.1 Containment standards imposed on bom-0-2 and bom-0-3 (interface requirements, not costed here)

| Element | Requirement from bom-0-15 | Indicative design |
|---|---|---|
| Excavation shroud | Single-pass capture ≥99.9% of ejecta mass. Combined with inner catch and tote transfer, ≥99.99% to the plant | Compliant skirt sealed to surface (brush/bellows), inner baffle labyrinth, low tool-tip speed (<0.3 m/s), counter-rotating cutters for zero net ejecta momentum |
| Tool force limits | No body ≥10 cm accelerated above 2.5 cm/s outside the shroud | Force/velocity-limited arms; boulder clamp before cut; robot anchored by tether and grapple |
| Tote transfer | Sealed lid ≥99.999% retention, verified by mass | Gasketed lid, closed-before-move interlock |
| Plant enclosure | No open granular interface. Effluent through cold traps (S₂ ~ troilite 5 wt% in H-chondrite feed) | Sealed housings; cold trap at <150 K; condensate to consolidation |
| Load cells | Mass in and out at each transfer, ±0.5% | Gross mass-balance closure (not the compliance metric) |

### 5.2 Tailings Consolidation System (TCS), 0B flight design point

**Fines Consolidation Unit (FCU), ×2.** Two units at about 60% capacity each give 120% combined, so one can be in maintenance.

| Parameter | Value | Basis |
|---|---|---|
| Fines throughput | 0.15 t/h each (~1.1 kt/yr at 85% availability) | 2 kt/yr fines at design point; envelope 0.2–7.5 kt/yr total |
| Process | Uniaxial cold press (~2 MPa), then solar-thermal sinter at 1,050–1,150 °C, 20–40 min dwell | Lunar/chondrite simulant sintering literature; vacuum lowers oxidation issues |
| Brick | 0.20 × 0.20 × 0.10 m, ~9 kg, ≥1 MPa compressive (target 5 MPa) | Handling by bom-0-2 grippers; cap units |
| Press force | ~80–100 kN | 2 MPa × 0.04 m² |
| Sinter energy | ~1.5 MJ/kg incl. losses | c_p ≈ 1 kJ/kg·K × ~1,100 K + 35% losses |
| Thermal input, average | 50–70 kWt each | 1.1 kt/yr × 1.5 MJ/kg |
| Thermal input, peak | 120–150 kWt | Sunlit fraction ~50% on rotating body; kiln thermal mass bridges night |
| Concentrator | 200–300 m² membrane reflector on 2-axis mount; 0.5–1.0 kg/m² | 1,361 W/m² × ~0.42 (optical × cavity) at 1 AU; scale ∝ r² for NEA heliocentric distance |
| Electrical | 10–20 kW (press, augers, control, kiln trim heaters) | From site bus at 1–3 kV via converter |
| Dry mass | 2.0–3.5 t each | Press 0.3–0.5 t, kiln 0.6–1.0 t, concentrator and mount 0.3–0.5 t, structure/thermal/avionics 0.8–1.5 t |
| Life | 5 yr with refractory replacement annually | Kiln liner is the wear item (bom-0-14 spare) |

**Why solar-thermal, not electrical.** Delivering 100–150 kW electrically through site arrays at $30–150/W hardware costs $3–20M in array alone, plus storage for night. A 250 m² reflector costs well under $1M in hardware and ~0.2 t of mass. Electrical heating is kept only as trim.

**Fallback if 0A shows sand also lofts (R1): whole-stream sinter.** This needs 0.5–1.5 MWt, i.e. 2,000–6,000 m² of concentrator, and 6–8 FCU-equivalents. It adds about $40–80M and 10–20 t. This is the single largest cost risk in the item.

**Placement and Capping Tools (PCT), ×4.** These are tool heads on bom-0-2 robot chassis, swappable with excavation heads.

| Parameter | Value |
|---|---|
| Function | (a) Backfill sand from sealed totes into mined-out cells via closed chute and auger, with compaction plate. (b) Lay brick cap, single course, joints offset |
| Placement velocity | ≤2.5 cm/s (DCC-C9); chute exit shrouded |
| Throughput | 1.5–2 t/h sand per tool; ~2 tools active at design point (10 kt/yr ≈ 1.2 t/h average) |
| Cap coverage | Cell depth 2–3 m; ~1,800–2,800 m²/yr to cap at 10 kt/yr and 1.8 t/m³ bulk; ~2,500 bricks per 100 m² |
| Brick demand vs supply | ~45–70 k bricks/yr for capping vs ~220 k/yr produced. The surplus becomes berms shading arrays from low-angle ejecta, and ballast |
| Mass | 150–300 kg per tool head |
| Power | 3–8 kW from robot tether |
| Optional | Solar glazing head (~3 kWt, 2 cm fused crust) as an alternative cap if bricks prove friable. Energy ~10¹¹ J/yr, trivial |

**Sealed totes and contingency bags**
- **Totes:** 20 × 1 m³ gasketed, ~60 kg each, about 1.2 t total.
- **Contingency containment bags:** about 1–2 t of high-strength woven polyimide/aramid at ~0.1 kg/m² in 10 m³ bags, ~0.2 kg per tonne contained. That covers 6–12 months of tailings if an FCU or cell is unavailable.

Bags are a **contingency only**. Bagging as the baseline costs about 2–5 t/yr of Earth-supplied mass at the design point, which is a recurring $20–60M/yr delivered. That is not credible.

**TCS totals (design point):** 6–10 t delivered; 25–50 kWe; 100–140 kWt average (solar-direct).

### 5.3 Site Debris Monitoring System (SDMS), 0B

| Instrument | Qty | Mass each | Power each | Performance | TRL now → needed |
|---|---|---|---|---|---|
| Ejecta Imaging Camera (stereo pairs on 5–10 m masts, event-triggered) | 12 | 4 kg | 8 W | Detect ≥50 µm at 50 m; ≥300 µm at 500 m (sunlit 100 µm grain ≈ mag 6 at 100 m, mag 10.5 at 1 km, albedo 0.15); 10–30 Hz; velocity ±1 cm/s | 5 → 6 (OSIRIS-REx NavCam heritage) |
| Dust Flux Monitor (charge-induction grids + PVDF/piezo, for slow dust) | 8 | 3 kg | 4 W | Charged grains ≥5 µm at 0.01–10 m/s (induction); ≥20 µm impacts | 3–4 → 6 |
| Thermal QCM (TQCM), on arrays, radiators, optics, HV terminations | 12 | 0.5 kg | 2 W | 1 ng/cm² molecular and fine-dust deposition | 9 |
| Witness Plate Imager (coupon + in-situ microscope + reflectometer) | 16 | 1.5 kg | 3 W | Particle size distribution ≥2 µm; Δα ±0.005 | 4 → 6 |
| Scanning lidar (night-side and terminator ejecta fence) | 2 | 15 kg | 60 W | ≥200 µm grains to 300 m (TBC); optional | 4 → 6 |
| Sentinel instrument package (on free-flyer) | 1 | 25–40 kg | 80 W | Wide-field forward-scatter imaging of dust tail at high phase; narrow-field ≥1 cm object tracking to 10 km; flux monitor | 5 → 6 |
| SDMS data processing units (independent of plant avionics) | 2 | 5 kg | 25 W | Onboard detection, classification, flux estimation | 5 → 6 |
| **Total** | | **~180–260 kg** | **~0.5–0.9 kW** | | |

The sentinel bus is provided by repurposing one EP scout from bom-0-1 (200–600 kg class) after its survey role, or by the site comms relay (bom-0-9). The instrument package is costed here. If neither bus is available, a dedicated ~250 kg free-flyer adds $25–45M (flagged in §10).

### 5.4 Molecular and plume contamination control

- **Iodine (D-05 reference propellant).**
  - Iodine vapour condenses on cold surfaces and reacts with silver (solar-cell interconnects, forming AgI), copper and some coatings.
  - Charge-exchange backflow from MW-class thrusters reaches tens of metres upstream; the direct plume extends to many km.
  - Controls:
    - DCC-C10 plume keep-out;
    - EP off within 10 km of site and node;
    - terminal approach on low-thrust cold gas or EP pointed away (bom-0-4 design trade);
    - TQCMs on the nearest assets.
  - **0A deliverable to D-05:** a coupon exposure test giving iodine and argon deposition and reaction rates on Ag/Cu interconnects, coverglass anti-reflection coatings, OSR and white-paint radiators, HV insulators and Fe-Ni product. The fluence is equivalent to 10 yr of tug operations. *If iodine fails DCC-C11, that is a direct argument for argon.*
- **Sulfur from troilite melting:** trapped in bom-0-3 cold traps, with condensate sent to the FCU. The FCU off-gas from sintering must also be trapped or vented anti-sunward under DCC-C12.
- **Chondrite volatiles (H₂O, CO₂, organics) on heating:** small for S-type feed, large for C-type. If the bom-0-6 water pilot proceeds, its effluent comes under DCC-C12.
- **Plume–surface interaction:** EP ions at 20–40 km/s sputter regolith and charge the surface; a 1 MW plume on the surface would be the largest single lofting source on site. It is prohibited outright.

### 5.5 SEL1 node contamination package (instruments; node in bom-0-13)

| Item | Qty | Mass | Notes |
|---|---|---|---|
| TQCM | 6 | 3 kg | Docking interfaces, node arrays, radiators |
| Witness Plate Imager | 4 | 6 kg | Particulate and coating trend |
| Inspection cameras (product arrival inspection, DCC-C14) | 4 | 12 kg | Detect adhered fines and loose objects ≥1 mm before transfer |
| Dust flux monitor | 2 | 6 kg | Release detection |
| **Total** | | **~30 kg, ~80 W** | |

Also included:
- Debris-related conjunction analyses with SEL1 operators (NASA, NOAA, ESA, ISRO and successors).
- A release-response playbook: if a ≥1 cm object escapes, image it, fit its trajectory, and notify operators and the licensing authority within 72 h with predicted manifold branch.

### 5.6 End-of-life, passivation and disposal

- Standards: DCC-C15–C17.
- Verification: analysis and passivation tests on robot battery packs (10–50 kWh) and the site storage system (0.5–15 MWh).
- Tug disposal Δv (EP, small) is a requirement on bom-0-4. The 100-yr non-encounter analysis is done here.

### 5.7 Modelling and safety-case toolchain

| Model | Purpose | Tool basis | Calibration |
|---|---|---|---|
| Granular DEM with cohesion and electrostatics | Shroud capture, tool–regolith ejecta, backfill stability | Open DEM codes + cohesion (Scheeres/Hartzell-type) | Drop tower, centrifuge free-flyer, pathfinder |
| Near-body dust dynamics | Gravity + SRP + rotation + plasma; η deposition fraction | Custom; validated against Bennu particle-event analyses | Pathfinder SDMS |
| Heliocentric trail | Long-term escaped-mass distribution; Earth and spacecraft fluence | Meteor-stream codes; MEM/IMEM for background | Literature |
| SEL1 manifold release | Earthward fraction, cislunar transit, conjunction | CR3BP/ephemeris propagation | — |
| Plume contamination | Iodine/argon backflow and deposition | DSMC / PIC-DSMC | 0A coupon tests |
| Statistical compliance estimator | Converts counted flux (cameras, monitors) into escaped-mass fraction with confidence bounds | Bayesian hierarchical model | Pathfinder |

---

## 6. Interfaces, Autonomy, Control and Communications

### 6.1 Interface table

| Interface | Direction | Content |
|---|---|---|
| bom-0-1 Scouts | ← | Target rotation, grade, regolith size distribution, natural ejection observations; sentinel bus handover |
| bom-0-2 Robots | ↔ | Shroud requirements (§5.1); PCT tool mount (mechanical, 1–3 kV power, data); tool force limits |
| bom-0-3 Plant | ↔ | Tailings tote handover (fines and sand split at 40 µm); effluent limits; load-cell data |
| bom-0-4 Tugs | → | Plume keep-out, approach corridor, disposal requirements; TQCM data back |
| bom-0-5 Power | ↔ | Array siting (≥300 m, elevated), EDS decision, 25–50 kWe TCS + ~1 kW SDMS load; array I-V data for contamination trending |
| bom-0-6 Water pilot | → | Effluent limits DCC-C12 |
| bom-0-7 Organisation | ↔ | Licensing dossier; independence of the compliance cell |
| bom-0-8/0-4 Delivery | → | 6–10 t TCS + ~0.25 t SDMS to NEA; 0.03 t to node; 0A CDE ~0.3 t |
| bom-0-9 Comms | → | 5–20 kbps average, 100–300 MB/day, DTN, event bursts |
| bom-0-10 Ops | ↔ | Dust-response procedures; SEL1 coordination |
| bom-0-11 NRE | ↔ | Facility sharing (dirty TVAC, iodine plume facility) |
| bom-0-12 Pathfinder | → | CDE payload ~250–350 kg, 3–12 kW peak |
| bom-0-13 Node | ↔ | Node package; handling and inspection rules; product form spec |
| bom-0-14 Spares | → | Kiln liners, press seals, camera spares (~10%/yr of TCS mass) |
| bom-0-16 Propellant | → | Contamination results feed D-05 |
| bom-0-17 Contingency | → | R1 whole-stream sinter is the named contingency draw |

### 6.2 Autonomy

One-way light time to an NEA is 1–25 min, so dust control must be onboard.

```
  Tier 0  REFLEX (≤0.5 s, local to tool/FCU)
     trigger: shroud-skirt contact loss, tote-lid open, local cam detects
              ≥1 mm object leaving shroud at v > 2.5 cm/s
     action:  stop cutter/press, close hopper, hold position
  Tier 1  SECTOR (≤10 s, site autonomy executive)
     trigger: rolling 1-h escaped-flux estimate > 3× allocation, or any
              ≥1 cm escape, or TQCM step > 10 ng/cm²
     action:  suspend sector ops, cycle EDS on optics, re-point concentrators
              off-plume, tag event; resume automatically after 30 min clean
  Tier 2  SITE STOP (≤60 s)
     trigger: 24-h estimate exceeds intolerable band (1e-3), or ≥10 cm escape
     action:  all granular ops stop, passivate tools, notify ground; restart
              requires ground authorisation (independent compliance cell)
  Tier 3  GROUND (hours–days)
     root cause, ALARP update, licence notification if required
```

### 6.3 Compliance measurement logic (closing the "you can't measure 10⁻⁴" objection)

- **Mass balance is not adequate.** It closes to about ±0.5% (5×10⁻³). It detects gross leaks only.
- **Compliance uses direct escape counting:**
  - Cameras count and size ≥50 µm grains crossing virtual shells around each work zone.
  - Dust flux monitors sample the 5–50 µm fraction.
  - The Bayesian estimator combines counts with the measured size distribution and the DEM-calibrated transfer function to give escaped mass with a 90% upper bound.
- **Detection of the 1.2 t/yr ceiling:** at 1.2 t/yr with 30% of mass in ≥50 µm grains, cameras see around 10⁸ grains/yr. Statistical error is negligible, so the error budget is dominated by size-distribution and transfer-function systematics. These are targeted at ≤×2 by the end of 0A.
- **Rule:** report the 90% upper bound against C1, never the central estimate.

### 6.4 Communications budget

| Product | Volume |
|---|---|
| Housekeeping and flux summaries | 1–3 kbps continuous |
| Event clips (Tier 1/2), compressed | 20–100 MB/day typical |
| Daily witness and TQCM products | 5–20 MB/day |
| Sentinel imaging | 50–150 MB/day |
| **Total** | **~100–300 MB/day (≈10–30 kbps average)** |

This is consistent with rejecting the 230 Mbps round-1 figure.

---

## 7. Manufacturing Considerations

- **Low quantity, high reuse.** The flight run is 2 FCUs, 4 PCT heads, about 40 monitoring instruments and the CDE subscale units. Design for reuse of space-qualified cameras and TQCMs, which are catalogue items. Only the FCU and PCT are new.
- **FCU press and kiln.** These are derived from terrestrial refractory and powder-metallurgy practice.
  - Liner materials: alumina–zirconia or SiC refractory. Dust-tolerant bearings (dry-lubricated, labyrinth-sealed), no exposed sliding seals.
  - Qualification is driven by vacuum abrasive wear: about 10⁶ press cycles over a 5-year life, at ~17 bricks/h.
- **Concentrator.** Aluminised polyimide membrane on an inflatable-rigidised or deployable truss. Derate reflectivity 2–5%/yr for dust and UV, and include replaceable membrane gores.
- **Dust-tolerant connectors.** HV (1–3 kV) and data connectors shared with bom-0-2. One common qualification campaign; the cost sits in bom-0-11, the requirement here.
- **Simulant supply.** Qualification needs tonne-scale chondrite simulant with metal content: H-chondrite analogue with ~15 wt% Fe-Ni particles, troilite and a realistic fines fraction. A standard simulant is budgeted in 0A ($1–2M), shared with bom-0-2 and bom-0-3.
- **Cleanliness of our own hardware.** Contamination control starts at manufacture. Flight units arrive at ISO 14644 class 8 or better, and low-outgassing materials are mandatory (TML <1%, CVCM <0.1%).

---

## 8. Development Roadmap and Technology Readiness

### 8.1 TRL table (critical technologies for this item)

| Technology | TRL now | 0A internal milestone (TRL 4–5) | KDP-0B (TRL 6, relevant environment, no waiver) | Project-ending? |
|---|---|---|---|---|
| Shroud containment at 10⁻⁴ g (bom-0-2 hardware, verified here) | 2–3 | Vacuum DEM-validated drop tower + centrifuge free-flyer | Pathfinder CDE at NEA: measured ≥99.9% single-pass, ≤3×10⁻⁴ system escape at subscale with credible scaling to ≤10⁻⁴ | **Yes** |
| Fines consolidation (press + sinter) in vacuum/µg | 3–4 (1 g sintering of simulants) | Dirty TVAC brick production at 1 g; µg tote/hopper flow on free-flyer | Pathfinder mini-FCU: ≥100 bricks from in-situ fines, ≥1 MPa, ≤10⁻⁴ mass loss/yr under thermal cycling | **Yes** |
| Low-velocity backfill and capping | 2 | Centrifuge free-flyer placement trials | Pathfinder: 1–5 m² capped cell, monitored ≥6 months | Yes (cheap fallback exists: more consolidation) |
| Slow-dust flux monitoring | 3–4 | Lab calibration with charged slow dust | Pathfinder operation | No (cameras suffice at reduced fidelity) |
| Ejecta imaging | 5 | — | Pathfinder | No |
| EDS for optics/radiators | 6 (lunar, Blue Ghost 2025) | Asteroid-dust-specific tests | Pathfinder | No |
| Iodine compatibility | 3–4 | Coupon fluence test complete | Result feeds D-05 | Not for this item; could be for iodine |
| Debris models | n/a | Validated against Bennu and Ryugu data | Calibrated against pathfinder | No |

### 8.2 Schedule (Y0 = 0A start)

```
Year:        Y0     Y1     Y2     Y3     Y4     Y5     Y6     Y7     Y8     Y9 ...
Reqs/ALARP   ████████ v0.1 interim ceiling ──► v1.0 at PDR ──► v2.0 at KDP-0B
Modelling    ████████████████████████ calibrate ██████████
Ground test  ██████████████ (dirty TVAC, drop tower, parabolic, iodine coupons)
Free-flyer        ░░░░████████████ fly ████  (centrifuge, LEO, optional-recommended)
CDE payload        ████████ build ████ deliver to bom-0-12
Pathfinder                          ═══ cruise ═══ ▓▓ baseline ▓▓ CDE ops ▓▓▓
KDP-0B                                                         ◆ (licence + TRL6)
0B TCS dev                                                      ████ qual ████ fly ►
0B SDMS                                                         ████████ fly ►
Ops monitoring                                                               ███ ...
```

### 8.3 KDP-0B exit criteria owned by this item

1. CDE results meet the TRL 6 criteria above, with no waivers.
2. Natural baseline of the 0B target measured, or credibly bounded from pathfinder and scout data.
3. η measured, and DCC-C1/C2 re-derived and accepted (D-03 closed).
4. Licensing state has accepted, or given written pre-consultation on, the safety case. This is the input to the **licence gate**.
5. TCS sized to the gated target class: tailings mass and fines fraction. This is the input to the **target and economics gates**.
6. Iodine/argon contamination result delivered to D-05.

---

## 9. Cost Analysis

### 9.1 Basis

- Labour: $0.25–0.30M per FTE-year, fully burdened.
- New space hardware: industrial-grade, small production. $8–15k/kg for mechanisms and furnaces once developed; first units at 1.5–2× that.
- Catalogue instruments at vendor pricing.
- Launch and transport to the NEA or node are excluded (bom-0-8, bom-0-4).
- Contingency is excluded (bom-0-17). The ranges below are estimating uncertainty, not reserve.

### 9.2 Phase 0A ($55–110M; point ≈ $80M)

| Line | Low | High | Basis |
|---|---|---|---|
| A1 Requirements, ALARP framework, safety case, licensing dossier | $8M | $15M | 6–10 FTE × 5 yr |
| A2 Modelling and analysis (DEM, near-body, trail, SEL1 manifold, DSMC plume, estimator) | $6M | $12M | 5–8 FTE × 5 yr + compute |
| A3 Ground test campaign (dirty TVAC upgrade/rent, drop tower ~20 drops, 2 parabolic campaigns, iodine/argon coupons, EDS evaluation, sinter process dev, simulant share) | $10M | $20M | Facility rates; $2–5M chamber upgrade; $2–4M plume test |
| A4 Reduced-gravity centrifuge free-flyer (150–250 kg, LEO rideshare, 6–12 months ops) | $15M | $30M | ESPA-class smallsat analogues incl. rideshare. **Optional but recommended**: the only pre-pathfinder way to test at 10⁻⁴–10⁻² g for hours |
| A5 CDE payload for pathfinder (4 cameras, 2 flux monitors, 4 TQCM, 4 witness imagers, mini-FCU 5–10 kg/h at ~150 kg, PCT trial head ~40 kg; total 250–350 kg) | $15M | $30M | Instruments ~$5–8M; mini-FCU + PCT first units $10–22M |
| A6 Pathfinder CDE ops and data analysis | $2M | $4M | 3–4 FTE × 1–1.5 yr |
| **0A total** | **$56M** | **$111M** | Without A4: $41–81M |

### 9.3 Phase 0B ($70–140M; point ≈ $100M at H-chondrite design point)

| Line | Low | High | Basis |
|---|---|---|---|
| B1 TCS engineering model and qualification (beyond 0A) | $15M | $30M | EM FCU + PCT; 10⁶-cycle wear test; dusty TVAC qual |
| B2 TCS flight hardware: FCU ×2 ($12–25M each), PCT ×4 ($1.5–3M each), totes and contingency bags ($2–4M) | $32M | $66M | 2–3.5 t FCU at ~$6–8k/kg recurring + first-unit premium |
| B3 SDMS flight hardware incl. sentinel instrument package | $10M | $20M | ~40 instruments; catalogue cameras/TQCMs |
| B4 SEL1 node contamination package | $3M | $6M | ~30 kg instruments |
| B5 Operations-phase compliance cell, analysis, open data, independent audit (5 yr) | $8M | $15M | 5–8 FTE/yr + external auditor |
| B6 EOL/passivation verification, disposal analysis | $2M | $4M | Analysis + battery passivation tests |
| **0B total** | **$70M** | **$141M** | |

**Target-class scaling of 0B, decided at the gate:**
- M-type (tailings ~2–3 kt/yr): B2 roughly halves, giving 0B ≈ $55–100M.
- L/LL-chondrite (tailings ~20–25 kt/yr): 3–4 FCUs, giving 0B ≈ $95–190M.
- Whole-stream sinter contingency (R1): +$40–80M, drawn from bom-0-17.

### 9.4 Totals and full cost of containment

| | Low | Point | High |
|---|---|---|---|
| bom-0-15, 0A | $55M | $80M | $110M |
| bom-0-15, 0B | $70M | $100M | $140M |
| **bom-0-15 total** | **$125M** | **$180M** | **$250M** |
| Containment hardware embedded in bom-0-2/0-3 (shrouds, enclosures, cold traps); visibility only | $15M | $25M | $40M |
| Delivered mass attributable (TCS + SDMS ~6–10 t to NEA); costed in bom-0-8/0-4 | — | ~3–7% of one tug payload | — |

### 9.5 Where I disagree with the round-2 figures

| Round-2 | My view | Why |
|---|---|---|
| Claude $50–200M | Low end not credible; high end acceptable | $50M covers 0A research but cannot buy a tailings consolidation system for ~10 kt/yr. The low end implicitly assumes tailings can be left loose or bagged, and §2.4 shows loose tailings foul the site. Bagging is a recurring $20–60M/yr Earth-supply cost |
| Gemini $150M (point) | Point is reasonable (mine is $180M) but unusable as stated | No 0A/0B split. Under D-01, 0A (~45% of the item) is spent regardless of the gate and is mostly a public-good research product, while 0B must scale with target class. A single number hides both facts |
| GPT $100–300M "within plant/development" | Range overlaps; disagree with the placement and the top end | (1) Embedding in plant breaks monitoring independence (P5), which licensing regimes will expect. (2) $300M plausibly double-counts the shroud and enclosure hardware already in bom-0-2/0-3. The only route above $250M is the whole-stream-sinter contingency, which belongs in bom-0-17 as a named risk draw |
| All three: "tighter than 99%" | Right direction, wrong metric | The number should be *derived* from self-contamination (giving 10⁻⁴ of handled mass plus an absolute cap), not from a percentage of product. A 99.9% requirement on product would still allow ~1–2 t/yr of product-equivalent loss, but on handled mass it is 12 t/yr, which is 10× too loose for our arrays |
| (Implicit) third-party risk drives cost | Disagree | At the NEA it does not, by many orders of magnitude (§2.3). It does at SEL1, and that requirement is cheap to meet with product-form rules and inspection. Most of the budget is self-protection and verification |

---

## 10. Risk Assessment

L = likelihood, C = consequence, each on a 1–5 scale.

| ID | Risk | L | C | Mitigation | Residual / owner |
|---|---|---|---|---|---|
| R1 | Sand-sized tailings (not just fines) loft or creep under electrostatics and thermal cycling, forcing whole-stream consolidation | 3 | 4 | Centrifuge free-flyer and pathfinder cap test; glazing-cap fallback (cheap); whole-stream sinter as named contingency (+$40–80M, +0.5–1.5 MWt solar) | Medium; bom-0-17 |
| R2 | Interception fraction η ≫ 10⁻³; array fouling faster than budget | 3 | 3 | Elevation, distance ≥300 m, brick berms, edge-on orientation; EDS on arrays as a bom-0-5 option (~1–3% transmission cost); tighten C1 | Medium |
| R3 | Iodine plume chemistry attacks Ag interconnects/coatings | 3 | 3 | 0A coupon test; strict keep-out; argon alternate (D-05) | Low after D-05 |
| R4 | No authorising regime will accept a novel in-space resource activity, or a licence state demands an unverifiable number | 3 | 5 | Early pre-consultation (Y1) with ≥2 candidate states; requirement framework aligned to IADC/ISO 24113 and Artemis Accords §10/§12; open data | Medium; bom-0-7 |
| R5 | Compliance unverifiable at stated confidence (size-distribution systematics) | 2 | 4 | Multi-sensor estimator; report 90% upper bound; pathfinder calibration | Low–medium |
| R6 | Boulder dislodged above v_esc during rubble-pile excavation (macroscopic debris) | 2 | 4 | Force/velocity-limited tooling; clamp-before-cut; target rotation ≥4 h; per-event publication | Low |
| R7 | Release at SEL1 node enters Earthward manifold | 2 | 5 | Monolithic product; arrival inspection; no machining at node; operator coordination | Low |
| R8 | Fast-rotator or high-obliquity target worsens containment and kiln sun access | 2 | 3 | Target criteria to bom-0-1; polar siting of FCU | Low |
| R9 | Dust-induced arcing on 1–3 kV tethers and connectors creates fragments and outages | 3 | 3 | DCC-C20; shared dusty-TVAC HV qual | Medium; bom-0-2/0-5 |
| R10 | Scope double-counting with bom-0-2/0-3 or orphaned items | 3 | 2 | Interface table §6.1 under configuration control | Low |
| R11 | Phase 1 inherits Phase 0 permissions at 100–1000× throughput, creating real streams | 3 | 4 | Absolute caps; Phase 1 must re-derive; trail model is a Phase 1 deliverable | Medium (strategic) |
| R12 | Post-mission instability of capped cells (YORP, gardening) | 2 | 2 | DCC-C21; pathfinder long-duration cell | Low |
| R13 | Public "artificial meteor shower" narrative | 3 | 3 | Publish §2.3-type analyses with peer review; open data; natural-baseline comparison | Medium |
| R14 | Sentinel bus unavailable (no scout or relay to repurpose) | 2 | 2 | Dedicated free-flyer +$25–45M (bom-0-17) or degraded mast-camera-only monitoring | Low |

---

## 11. Open Engineering Questions

1. **Electrostatic mobility vs cohesion.** At 10⁻⁴ g, under UV and solar-wind charging at the terminator, which size window of freshly comminuted chondrite fines actually lofts? This is the largest single cost driver (R1). *Test:* centrifuge free-flyer with UV lamp and plasma source, then pathfinder.
2. **Natural baseline.** What is the target's natural mass-loss rate, including Bennu-like events? It may be comparable to the 10⁻⁵ ALARP target, which would redefine "broadly acceptable".
3. **Interception fraction η.** How much lofted mass reaches elevated arrays at 300 m on a rotating body? It sets C1 directly.
4. **Optimal fines cut-point.** Is 40 µm right? A coarser cut (e.g. 75 µm) roughly doubles FCU throughput but makes capped sand safer.
5. **Sinter quality of real chondritic fines.** Are troilite and metal residues sufficient to sinter at ~1,050 °C, or are binders or partial melting needed? Do sintered bricks shed fines under ±150 K thermal cycling?
6. **Glazing vs brick capping** for durability and cost.
7. **Iodine at MW scale.** What are the backflow fluxes from 1–2.5 MWe iodine EP? There are essentially no data above kW scale. Can a credible approach corridor keep docking interfaces under 0.1 µg/cm² over life?
8. **Escape control surface.** Is the 1 km control sphere and SRP-assignment convention acceptable to a licensing state, or will it insist on a Hill-sphere definition (~30 km), which is harder to instrument?
9. **Value of tailings.** Could sintered tailings bricks be a Phase 1 product (radiation shielding or ballast)? That would turn TCS cost into a product line. *Do not promise this; test the demand at the Phase 1 demand gate.*
10. **Product-surface fines.** Can melt-cast Fe-Ni ingots meet the ≤1 g/m² adhered-fines limit without a cleaning step? If not, who owns cleaning, bom-0-3 or bom-0-15?
11. **SEL1 coordination.** Is there an existing operator forum for L1, or do we have to create one? What screening threshold do other operators expect?
12. **Is TRL 6 achievable without the pathfinder?** If bom-0-12 slips or loses mass margin, could a long-duration centrifuge free-flyer plus analysis be accepted as "relevant environment"? I currently say **no**: the regolith, rotation and plasma are part of the environment.

---

## 12. Decisions Requested

1. **Accept the requirement framework** (DCC-C1…C21) and the interim ceiling: 1×10⁻⁴ of handled mass, ≤2 t/yr absolute, ≥1 cm counted, zero release at SEL1. This is the D-03 interim value, to be re-derived at KDP-0B.
2. **Classify shroud containment and fines consolidation as project-ending technologies** under D-02 (TRL 6 at KDP-0B, no waivers). Allocate ~250–350 kg and 3–12 kW peak of bom-0-12 pathfinder capacity to the CDE.
3. **Keep bom-0-15 a standalone line with an independent compliance cell.** It is not to be absorbed into plant or development.
4. **Approve the 0A budget of $55–110M**, including the centrifuge free-flyer (A4). Hold 0B at $70–140M, to be re-sized at the gate by target class.
5. **Register R1 (whole-stream sinter, +$40–80M) as a named contingency draw** on bom-0-17.
6. **Route the iodine/argon coupon results into D-05** as a formal input before propellant selection.