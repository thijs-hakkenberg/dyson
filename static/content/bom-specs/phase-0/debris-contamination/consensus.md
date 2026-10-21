---
bomId: "bom-0-15"
itemName: "Debris and Contamination Control"
itemSlug: "debris-contamination"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

## Key Specifications

- **Containment is a design prerequisite, and intentional release is prohibited.** All three models require every solids-generating step (excavation, transfer, beneficiation, waste handling) to sit inside a mechanical containment boundary.
  - No tailings, fines or slag are vented to space.
  - Residue stays at the NEA, consolidated or restrained.
  - Bulk transfer uses closed paths (sealed totes or enclosed screws), with no open conveyors.
- **The ceiling must be far tighter than 99% and normalised to input mass, not product.**
  - At 2–25 kt/yr of handled or feed mass against 0.6–2.5 kt/yr of Fe-Ni product, a 99% requirement leaks roughly 20–250 t/yr. All three call this unacceptable.
  - Every model writes its ceiling as a fraction of excavated, handled or processed mass: ≤1×10⁻⁴ (Claude, Gemini) or tighter (GPT).
- **Low-metal targets drive waste volume.** All three size the residue stream at roughly 4–25 kt/yr. This depends on grade and recovery (Claude ore:product 2.5–20:1; Gemini 20:1; GPT recovery 5–20%).
- **Excavation heads are shrouded.** All three use compliant skirts or shrouds with internal baffles or capture volumes, low-energy force-limited cutting, and 1–3 kV power from the robot tether where active elements are used.
- **The 0A pathfinder must carry a containment payload.** Containment and waste immobilisation must be shown in a relevant NEA environment before 0B commitment. Ground vacuum, drop-tower and parabolic tests are necessary but not sufficient for TRL 6 at KDP-0B.
- **Site monitoring is dedicated and multi-instrument.** All three specify ejecta cameras, lidar, and deposition/particle monitors or witness coupons. Claude and GPT explicitly reject plant mass balance (±0.5%) as compliance evidence and require statistical upper bounds: 90% (Claude) or 95% (GPT).
- **Item cost: all three converge on about $100–250M and reject the round-2 $50M floor.**

  | Model | 0A | 0B | Total |
  |---|---|---|---|
  | Claude | $55–110M | $70–140M | $125–250M |
  | Gemini | $45–65M | $85–145M | $130–210M |
  | GPT | $25–50M | $75–155M | $100–205M |

  - The overlap is about $130–205M.
  - Claude and GPT explicitly exclude launch, buses and programme contingency. Gemini does not state these exclusions.
- **Arrays, radiators and optics need contamination protection.** All three name them as protected surfaces. Claude and GPT both allocate ≤1%/yr array output loss attributable to site deposition.

## Divergent Views

- **Interim ceiling value (D-03):**
  - Claude recommends ≤1×10⁻⁴ of handled mass plus an absolute cap of ≤2 t/yr per site, with an ALARP target of 1×10⁻⁵. This is derived from an array-fouling budget at an interception fraction η≈10⁻³. Objects ≥1 cm are limited to ≤10 per site-year and logged.
  - Gemini prefers <100 ppm (1×10⁻⁴) of excavated mass, i.e. <2,000 kg/yr at 20 kt/yr. It manages particles from 1 µm to 10 cm, with no separate object-count limit.
  - GPT suggests a much tighter ceiling of 1×10⁻⁶ of processed feed (5–20 kg/yr), with a 1×10⁻⁷ objective. Every detected fragment ≥1 mm is treated as an anomaly.
- **Tailings immobilisation:**
  - Claude recommends splitting the stream at 40 µm.
    - Fines are cold-pressed and solar-thermally sintered into about 9 kg bricks, using 2 Fines Consolidation Units of 50–70 kWt each and a 200–300 m² concentrator.
    - Sand is backfilled at ≤2.5 cm/s into mined-out cells under a brick cap.
    - Bags are contingency only, because baseline bagging costs 2–5 t/yr of Earth mass (about $20–60M/yr).
  - Gemini prefers microwave sintering of waste into bricks tethered to the surface, with polymer-binder bagging as the fallback.
  - GPT suggests anchored double-envelope cells of 250–600 t each (10–48 filled per year; 3–25 t initial inventory; $2–10M/yr recurring). Sintering is treated as an unproven option.
- **Perimeter monitoring architecture:**
  - Claude recommends about 180–260 kg of surface instruments (12 stereo ejecta cameras on masts, flux monitors, TQCMs, witness imagers). It adds one sentinel free-flyer held sunward at 2–10 km on a repurposed bom-0-1 scout bus. A dedicated free-flyer would add $25–45M.
  - Gemini prefers 4–6 nanosatellites (12U, ~20 kg) in halo orbits at a 5 km perimeter, costed at $25–40M.
  - GPT suggests surface-only stations: 4–8 imagers, 2–4 lidars, 12–24 monitors and 20–40 coupons, covering a 50–200 m surveillance volume.
- **Role of electrostatics:**
  - Claude recommends dust shields (EDS) on optics and radiators only, with passive containment and consolidation carrying the load.
  - Gemini prefers EDS-lined shrouds at 1–3 kV as an active containment element, plus ITO EDS on radiators.
  - GPT suggests electrostatic and magnetic capture be supplemental only, never credited as a barrier.
- **Scope ownership and independence:**
  - Claude recommends a standalone line with an organisationally independent compliance cell and open data within 90 days. Shrouds and enclosures stay in bom-0-2 and bom-0-3, estimated at a further $15–40M for visibility only.
  - Gemini prefers to cost robot shrouds and EDS coatings ($20–35M) inside this item.
  - GPT suggests this item own dedicated shrouds, transfer sleeves, capture packages and cells, with an independent safety controller for autonomous stops.
- **Power and the primary hazard driver:**
  - Claude recommends 25–50 kWe plus 100–140 kWt solar-direct. It argues that self-contamination of its own arrays sets the particulate ceiling. On its analysis, third-party flux is negligible (<10⁻⁶ of the natural background) except at SEL1, which it makes a zero-release zone.
  - Gemini prefers 50 kW continuous and emphasises arrays, sensors and tug collision risk.
  - GPT suggests 8–25 kW average and 30–60 kW peak. It names disturbance of accumulated tailings, for example by a tug plume, as the highest-consequence hazard.

## Open Questions

1. **Electrostatic lofting versus cohesion at about 10⁻⁴ g.** All three ask which size fraction of freshly comminuted chondrite fines lofts under UV and solar-wind charging. The answer decides whether only fines or the whole stream must be immobilised. Claude's whole-stream sinter contingency would add $40–80M and 0.5–1.5 MWt.
2. **Verifiable escape bound.** Can a camera, flux-monitor, tracer and model chain bound releases at 10⁻⁴ of handled mass, let alone GPT's 10⁻⁶, against size-distribution and transfer-function systematics? Claude also asks what control surface a licensing state will accept: a 1 km sphere or the ~30 km Hill sphere.
3. **Sintering of real chondritic fines.** Open points are:
   - temperature (~1,050–1,150 °C);
   - variability in troilite and metal content and in dielectric properties (which matters for microwave heating);
   - whether bricks shed fines under ±150 K thermal cycling;
   - whether mechanical restraint alone is enough.
4. **Long-term stability and custody of retained waste.** This covers anchorage on rubble piles, cell restraint degradation, YORP and gardening effects, and who owns post-operation monitoring.
5. **MW-class EP plume contamination.** Claude and GPT both flag that there is essentially no backflow or deposition data above kW scale for iodine on Ag/Cu interconnects, coatings and docking interfaces. They also ask what plume keep-out distance this implies, compared with argon.
6. **Natural baseline and interception fraction η.** The target's natural shedding rate (Bennu-like ejections) and the fraction of lofted mass that reaches arrays set the defensible ceiling directly.

## Recommended Approach

1. **Adopt a three-part interim requirement under D-03.** These are interim values, re-derived at KDP-0B from measured η, the natural baseline and the licensing state's position.
   - Particulate escape ≤1×10⁻⁴ of *handled* mass, with an absolute cap of ≤2 t/yr per site. Claude and Gemini coincide on this value.
   - An ALARP target of 1×10⁻⁵, with GPT's 10⁻⁶ carried as a study case.
   - Separate count limits for ≥1 cm objects and zero intentional fragments ≥10 cm.

   Report compliance as a 90–95% upper bound, never a central estimate.
2. **Make SEL1 a zero-intentional-release zone and control product form.**
   - Ship Fe-Ni only as monolithic or canned product (ingot, plate or wire), with adhered fines ≤1 g/m² (TBR) and arrival inspection.
   - Allow no machining at the node.
   - Write a release-response playbook covering trajectory fit and operator notification within 72 h.
3. **Rely on passive containment first and electrostatics only as a supplement.**
   - Use shrouded, force-limited excavation (placement ≤10% of local escape speed), sealed totes or enclosed screws, and cold-trapped process effluent.
   - Do not credit EDS as a barrier.
   - Prohibit direct EP plume impingement on the surface, site assets or product. The keep-out distance is derived from 0A plume modelling.
4. **Carry the tailings trade through 0A rather than freezing it now.**
   - Baseline: Claude's fines-sinter plus capped backfill, using solar-thermal heating rather than electrical or microwave.
   - Test in parallel: GPT's restrained double-envelope cells.
   - Fallbacks: Gemini's bagging approach, and glazing caps.
   - Reject Earth-supplied bagging as the baseline because of its recurring delivered-mass cost.
5. **Classify shroud containment and fines/waste immobilisation as project-ending technologies under D-02.**
   - Allocate about 250–350 kg and 3–12 kW peak of the bom-0-12 pathfinder to a Containment Demonstration Experiment.
   - The experiment should include ≥90 days of natural-baseline monitoring, subscale escape measurement, ≥100 in-situ bricks or a cell fill, and a capped cell monitored for ≥6 months.
   - Add a reduced-gravity centrifuge free-flyer in LEO if budget allows.
6. **Keep bom-0-15 a standalone line with independent monitoring.**
   - Use surface camera, flux, TQCM and witness networks plus one sentinel free-flyer on a repurposed scout or relay bus.
   - Do not baseline Gemini's nanosatellite constellation, given its unresolved station-keeping around a tumbling NEA.
   - Fix the interfaces with bom-0-2 and bom-0-3 so shroud hardware is counted once.
   - Run iodine and argon coupon tests in 0A and feed the results to D-05.
7. **Budget: 0A $45–80M (committed) and 0B $75–145M (gated, sized by target class); total $120–225M, point ≈ $170M.**
   - Disagree with Claude's round-2 $50M floor: it buys 0A research but no 10 kt/yr-class waste immobilisation.
   - Disagree with GPT's $300M ceiling: it risks double-counting shrouds held in bom-0-2 and bom-0-3, and siting the line "within plant" compromises monitoring independence.
   - Disagree with Gemini's undivided $150M: it hides the D-01 split between unconditional 0A spend and gated 0B spend.
   - Book difficult-target growth separately rather than absorbing it into this line. That covers whole-stream sinter (+$40–80M), L/LL-chondrite waste loads, and a dedicated sentinel (+$25–45M), all as named draws on bom-0-17.