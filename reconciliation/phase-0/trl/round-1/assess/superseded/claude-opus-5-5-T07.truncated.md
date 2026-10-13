---
step: assess
item: T07
modelId: claude-opus-5-5
modelName: "Claude Opus 5.5"
endpoint: databricks-claude-opus-5-5
generated: 2026-10-13T11:54:35.840Z
seconds: 329.073
---

# TRL assessment: T07, partial-gravity melting and slag/metal separation in a rotating module

**Bottom line.** **Current TRL 2–3** (down from 3–4). **Target TRL 6 at KDP-0B** if this route is selected, with TRL 4 needed by the 0A mid-term review. **AD² 6.** **Risk: architecture-change.**

The gap is not scale. Terrestrial furnaces already run 10–300 t heats. The gap is the environment: sustained 0.05–0.15 g in a rotating frame, uncrewed, at an NEA, on chondritic feed. Nobody has ever melted metal and slag in that regime, at any size.

---

## 0. Re-scoping and the requirement made explicit

### What changes from the March 2026 entry

- **Scope removed.** Zone refining and thin-film deposition leave T07. Solar-grade Si is deferred, so rq-0-12 and rq-0-15 no longer bear on this rating. T07 is now only the bulk melt and slag/metal separation in a rotating module, for native/reduced Fe-Ni.
- **Evidence removed.** These items in the old entry do not support this technology:
  - ISS EML: microgravity and containerless, with no slag phase.
  - D'Angelo 2021: powder additive manufacturing in parabolic flight.
  - UMG-Si results.
  - "Magnetic electrolysis (Nature Chemistry 2025)". I cannot verify it, and it is irrelevant to Fe-Ni slag separation either way.
  - The rq-0-11 deliberation. It is a conclusion, not evidence.
  - The arXiv IDs in the literature reviews were not checked for this assessment. None of them is a partial-gravity melt test.
- **Target corrected.** The old target of TRL 7 is replaced by TRL 6 at KDP-0B, per D-02.
- **Recommended rename.** The id `microgravity-metallurgy` is a misnomer. Suggest `partial-gravity-melt-separation`.

### Paired radius and rpm

The governing relations are g_eff = ω²r and rpm = 9.549·ω.

| Radius | rpm at 0.05 g | rpm at 0.10 g | rpm at 0.15 g | Rim speed ωr (m/s) | Δg/g over 1 m depth | Interface sag across a 2.5 m hearth ⊥ axis | Coriolis/g for a 1 m/s tap stream, 2U/(ωr) |
|---|---|---|---|---|---|---|---|
| 5 m | 3.0 | 4.2 | **5.2** | 1.6–2.7 | 20 % | 0.16 m | **1.3–0.74** |
| 10 m | 2.1 | 3.0 | 3.7 | 2.2–3.8 | 10 % | 0.08 m | 0.90–0.52 |
| 20 m | 1.5 | 2.1 | 2.6 | 3.1–5.4 | 5 % | 0.04 m | 0.64–0.37 |
| 50 m (rq-0-11) | 0.95 | 1.34 | 1.64 | 5.0–8.6 | 2 % | 0.016 m | 0.40–0.23 |

What the table shows:

- **Gemini's box is inconsistent with the requirement.** Its stated 5–20 m × 1.5–4 rpm spans 0.013–0.36 g. Only some diagonals of that box fall inside 0.05–0.15 g. In particular, 0.15 g at 5 m needs 5.2 rpm, which is outside the stated rpm range.
- **The reference configuration should be stated as a pair.** For example, 10 m at 2.1–3.7 rpm, or 20 m at 1.5–2.6 rpm.
- **Coriolis on tapping and pouring is first-order at every practical radius.** A 1 m/s tap stream sees a Coriolis acceleration equal to 25–130 % of g_eff.
- **Coriolis on droplet settling is negligible.** Stokes settling velocities are ~10⁻⁵ m/s, so 2ωv/g ≪ 1.
- **Bulk convection is rotation-dominated.** For U ≈ 2 cm/s and L ≈ 1 m, the Rossby number is Ro = U/(2ωL) ≈ 0.02–0.1. Taylor–Proudman-type organisation of melt convection is therefore expected.
  - This directly contradicts the deliberation's assumption that convection "restores thermal homogeneity." It has to be tested.
- **Equipotentials are cylinders coaxial with the spin axis.** The hearth should be elongated along the axis, so the slag/metal interface curves only across the width.

### Physics that partial gravity does and does not fix

**Stratification at pool scale: fixed.** The capillary length of liquid Fe, √(σ/ρg), is ~23 mm at 0.05 g and ~13 mm at 0.15 g. A 1 m pool therefore has a Bond number of ~10³–10⁴, so gravity dominates surface tension. On this point the deliberation's claim is correct.

**Separation kinetics: not fixed.** Settling time scales as 1/g. Estimates below are order-of-magnitude Stokes settling of Fe-Ni droplets through 0.3 m of slag.

- Assumptions: Δρ ≈ 4,000 kg/m³; slag viscosity 0.3 Pa·s.
- Uncertainty: viscosity is uncertain by about an order of magnitude, especially for olivine-rich or crystal-bearing melts.

| Droplet diameter | 1 g | 0.15 g | 0.05 g |
|---|---|---|---|
| 1 mm | ~1 min | ~5 min | ~14 min |
| 100 µm | ~1 h | ~8 h | ~1 day |
| 20 µm | ~1 day | ~8 days | ~3–4 weeks |

Consequences:

- Metal recovery at 0.05–0.15 g depends on droplet coalescence, not settling alone. Coalescence is not characterised in this regime.
- Foam drainage and gas disengagement also slow roughly with g. This raises slopover risk wherever gas evolves, for example carbothermic or FeO + C reactions.

### Feed chemistry (assumptions stated)

Two process variants exist, and they differ in difficulty:

- **(a) Melting a magnetically beneficiated metal concentrate.** This is GPT's narrow native-metal route. Slag fraction is small.
- **(b) Whole-rock smelting.** Slag fraction is 40–60 %.

Variant (b) needs the silicate fully liquid, otherwise metal droplets stay trapped in a crystal mush.

- For olivine/pyroxene-rich ordinary-chondrite silicate, that probably means roughly 1,500–1,700 °C. This range is composition-dependent and has not been verified here; it needs phase-equilibria modelling.
- Fluxing is limited because chondritic CaO and Al₂O₃ are low (~2 % and ~2–3 %).

In both variants, troilite (FeS, ~5 wt % in ordinary chondrites) forms an Fe-FeS eutectic liquid near 988 °C. Sulfur partitioning into the product, and desulfurization without CaO-rich slag, are open process-chemistry questions. They are independent of gravity but sit inside T07's success metric.

### Environment, scale and duration this rating uses

**Environment**
- Sustained 0.05–0.15 g centripetal, with the Coriolis and gradient values in the table.
- Vacuum outside. The furnace interior may be sealed or inert-gas-filled; this is not yet specified.
- Heliocentric orbit at 0.9–1.3 AU, co-located with the NEA.
- Charged, abrasive feed handling.
- Uncrewed: tapping, casting and refractory maintenance are all autonomous.

**Scale and duration**
- 1–10 t heats.
- 60–2,500 heats per year, from 0.6–2.5 kt/yr of Fe-Ni.
- Multi-year continuous operation.

**Assumed TRL 6 demonstration standard.** At least 50 consecutive heats, and at least one full refractory or freeze-lining campaign.

---

## 1. Evidence

| # | Claim | Source | Scale and environment demonstrated | Ratio to requirement | Confidence |
|---|---|---|---|---|---|
| 1 | Gravity-driven slag/metal separation, tapping and refractory practice are mature | Industrial EAF/ladle steelmaking; e.g. *The Making, Shaping and Treating of Steel* (AISE Steel Foundation, 10th ed. 1985 / 11th ed. 1998) | 10–300 t heats at **1 g**, non-rotating, crewed | Mass 0.003–1×. **Environment not matched** in g, rotation, vacuum or autonomy | Confident |
| 2 | Containerless melting in microgravity | ESA ISS-EML in Columbus (operational from 2014) | ~5–8 mm samples (~1–2 g), µg, no slag phase | ~10⁶–10⁷ by mass, ~10² by length. Wrong environment and wrong function, so "n/a" | Confident |
| 3 | Electrostatic levitation melting in microgravity | JAXA ELF on Kibo (~2015–16) | ~2 mm samples, µg | n/a | Confident on facility; sample size approximate |
| 4 | Convection-free directional solidification | NASA/ESA MSRR/MSL on ISS (from 2009); CETSOL/MICAST Al-Si campaigns | cm-diameter samples, tens of g, µg | n/a (solidification, not separation) | Confident on programmes |
| 5 | Centrifugally driven segregation of non-metallic inclusions to the inner bore | Industrial centrifugal casting of pipe and rolls | Tonne-scale, tens of g, short times | Opposite g direction; rotation present | Confident on the physics; no single citation |
| 6 | Metal/oxide melt separation under controlled g | Centrifugal SHS metallurgy (Yukhvid and co-workers, ISMAN, Russia, 1990s–2000s) | Lab scale, ~1–1,000 g; reported to degrade at lower g | Hypergravity only | **Unsure** of specifics; verify before relying on it |
| 7 | Hypergravity materials and fluids testing with rotating-frame effects | ESA Large Diameter Centrifuge, ESTEC (~8 m diameter, ≤20 g) | Small payloads ≥1 g | Cannot go below 1 g | Confident on facility; payload limits unsure |
| 8 | Natural analogue: metal–silicate segregation at very low g needs high melt fractions | Planetesimal differentiation literature, e.g. Yoshino, Walter & Katsura, *Nature* 2003 (percolative core formation) | Planetary, ≪0.01 g, geological time | n/a (TRL 1 basis only) | Believed correct; **verify** |
| 9 | Partial-g parabolas exist for fluids tests | Novespace A310 Zero-G lunar/Martian parabolas | ~20 s, small payloads | Too short for melt settling | Confident on capability; **no relevant melt data known** |
| 10 | Power and data across a large vacuum rotary joint, and a failure lesson | ISS SARJ roll rings; starboard SARJ race damage found on STS-120 (2007), cleaned and lubricated on STS-126 (2008) | Order of tens of kW per joint, continuous rotation | Furnace needs ~0.3–1 MW, so ~10–30× | Confident on event; power figure approximate |
| 11 | Spun/despun spacecraft heritage | Galileo dual-spin (launched 1989) | Power and data across the interface, no mass flow | **No heritage for tonne-scale mass transfer** | Confident |

Not evidence: the rq-0-11 deliberation conclusion and the rq-0-11/12/13 literature reviews.

**On the scale-gap dispute.**
- GPT is right that comparing batch mass with annual throughput (the "6–8 orders" figure) is dimensionally invalid.
- Claude's "4–6 orders" holds by mass if the reference is 10–100 g MSRR samples. Against ~1 g EML samples it is 6–7 orders.
- For fluid physics, the meaningful ratio is length scale, ~10². In any case, the gap that matters is environmental. There is no partial-g data point to scale from.

---

## 2. Current TRL: 2–3 (point estimate 2)

**Lower bound, TRL 2: met.** The concept is documented with feasibility and benefit arguments, in the architecture documents and the rq-0-11/13 analyses. The underlying principles are published (TRL 1): Stokes and Bond scaling, terrestrial practice, and the planetesimal analogue.

**Upper bound, TRL 3: arguable, not secure.** A reviewer could argue that 1 g plant data (item 1), hypergravity data (items 5–7) and the linear-in-g Stokes and buoyancy physics together validate the *critical function*: gravity-driven stratification.

**Unmet for TRL 3.** The exit criterion is "documented analytical or experimental results validating predictions of key parameters." No such results exist in, or traceable to, the required regime for:
- metal recovery and slag-in-metal as a function of g at 0.05–0.15 g;
- coalescence of fine metal droplets;
- rotating-frame melt convection at Ro ≪ 1;
- foaming and gas disengagement at low g;
- chondritic slag liquidus and viscosity behaviour.

**Unmet for TRL 4.** Two gaps:
- No laboratory breadboard has produced test performance agreeing with predictions.
- There is no documented relevant-environment definition. Section 0 is a draft of one.

**Rating by route**, as the architecture requires:

| Route | T07's role | TRL | AD² | Risk if T07 fails |
|---|---|---|---|---|
| **Gemini**: whole-ore rotating smelting as baseline, variant (b) | Critical path | **2** | 6–7 | Project-ending for 0B if it is the sole route |
| **GPT**: native-metal concentrate melt, experimentally gated, variant (a) | Gated option | **2–3** | 5–6 | Architecture-change |
| **Claude**: no-melt baseline, centrifugal melting at pilot scale only | Off the 0B critical path | 2–3 | 5–6 | Cost or schedule; T07 deferred to phase-1 |

The no-melt routes (rq-0-56) are rated under their own entries.

---

## 3. Target and difficulty

**Target TRL.**
- KDP-0B: TRL 6 in the relevant environment, no waivers, if rotating smelting is the selected 0B route. Under D-02 it would then be project-ending for 0B.
- 0A mid-term review: TRL 4, as a route discriminator.

**When the phase needs it.**
- KDP-0B has no fixed date. My planning assumption is ~2033–2035.
- The TRL 4 result is needed by the mid-term review, roughly 2029–2030 (also an assumption).

**Ground testing cannot reach TRL 6 for this technology.** A 1 g ground centrifuge can only add acceleration (resultant ≥1 g). Drop towers and parabolic flights last seconds; tonne-scale settling takes hours. TRL 5 and 6 therefore need spaceflight.

**AD² = 6** (several competing approaches; path not clear; ≈60 %), with a band of 5–7. The reasons:
- **Not 7–8.** No new science is required. Stratification physics, furnaces and rotating structures all exist.
- **Not 4–5.** "Similar development has been done" is false. In addition, several architecture choices are unresolved:
  - refractory lining versus freeze lining;
  - whole-plant spin versus a despun hub with a rotating arm;
  - truss versus tether;
  - concentrate versus whole-rock feed;
  - 0.05–0.15 g versus a ground-testable ≥1 g design (see section 6).
- **Every validation step above TRL 4 is a flight programme.** The 1 t-batch partial-g test that rq-0-11 asks for is itself comparable in size to the 0A pathfinder.

Integration problems with no space heritage, each of which could force redesign:
- **Spun/despun transfer** of solid batches. Molten transfer across the interface should be ruled out.
- **Power transfer.** About 0.3–1 MW across a rotary joint (10–30× SARJ-class), or else a whole-plant spin with a sun-pointing axis.
- **Heat rejection from the arm.**
- **Mass-property shifts** of 1–10 t per tap. These need active ballast and counter-rotation.
- **Uncrewed refractory maintenance.**
  - Terrestrial EAF refractory consumption is of order a few kg/t with routine gunning (not verified here). That implies roughly 2–25 t/yr to import or make in situ.
  - Freeze lining, as used in 1 g ilmenite smelting, replaces the refractory problem with a radiative heat-rejection load.

**Years to target:** 7–12 years from 2026. The upper half of that range misses an assumed 2033–35 KDP-0B.

---

## 4. Path

| # | Step | Method | Scale | Cost (USD) | Duration | TRL reached |
|---|---|---|---|---|---|---|
| 1 | Write the relevant-environment definition. Map dimensionless groups (Bo, Ar, Ro, Ek, Ra, h/r) over the r–rpm–batch space. Run phase-equilibria for chondritic Fe-Ni-S-silicate (FactSage/Thermo-Calc class). Replace ">95 % separation" with defined metrics: metal recovery, S/P/O in metal, Fe in slag | Analysis | Paper and tools | 0.5–2 M | 0.5–1 yr | Secures 2; enables 3 and the TRL 4 exit doc |
| 2 | 1 g vacuum/inert melts of real ordinary-chondrite material and Fe-Ni-FeS simulant, both feed variants. Measure droplet size distributions, coalescence, foaming, refractory attack, desulfurization | Experiment | 1–50 kg | 3–10 M | 1–2 yr | 3 |
| 3 | Rotating-tank analogue experiments matching Ar, Bo and Ro, using low-Δρ and high-viscosity fluid pairs. Couple to multiphase CFD (VOF/Euler-Lagrange) for settling, convection and tap-stream deflection | Experiment + simulation | 0.1–1 m tanks | 3–8 M | 1–2 yr | 3–4 (fluid function) |
| 4 | Partial-g parabolic flights (0.05–0.16 g) with Ga-In-Sn/oil analogues to anchor CFD in true low g. Short duration, so limited value | Experiment | <10 kg | 1–3 M | 1 yr | Supports 4 |
| 5 | Integrated ground breadboard: 0.1–1 t furnace in a vacuum chamber, autonomous tapping and casting, refractory versus freeze lining, 50–200 heats. Add a ground-centrifuge variant (≥1.4 g resultant) to measure Coriolis effects on tapping | Experiment | 0.1–1 t | 20–60 M | 2–3 yr | 4 |
| 6 | Free-flying rotating furnace, or a rotating arm on the 0A pathfinder, at 0.05–0.15 g, r ≥ 5 m, 10–30 heats over hours to days. Optionally use the lunar surface (0.165 g, no Coriolis) for the upper g bound only | Experiment (flight) | 10–100 kg (10–1,000× below requirement) | 150–400 M | 3–5 yr | 5 |
| 7 | 1 t-batch rotating furnace prototype with spun/despun solid transfer, autonomous tapping, ≥50 heats, one lining campaign. This is rq-0-11's experiment | Experiment (flight) | 1 t (1–10× below requirement) | 500 M–2 B (low confidence) | 4–7 yr | 6 |

Notes on the path:
- Steps 2 and 3 should run in parallel with the rq-0-56 no-melt tests.
- At the 0A mid-term review, if steps 2–5 show fine-droplet metal losses, sulfur or foam problems that partial g cannot resolve, stop before step 6.

---

## 5. Risk and fallback

**Risk class: architecture-change.** Alternatives exist and failure outcomes are pre-committed under D-02. The class becomes **project-ending for 0B** only if rotating smelting is the sole selected route at KDP-0B.

**Fallbacks, in order:**

1. **No-melt route** (magnetic beneficiation, then H₂ or carbonyl). Claude's baseline; rated separately.
2. **A small fast-spinning centrifugal crucible at ≥1 g** instead of a large 0.05–0.15 g module.
   - It could be validated on a ground centrifuge in g magnitude and Coriolis.
   - Cost: higher rpm, larger gradients and harder transfer.
3. **D-02 terminal fallback:** 0A only, with Earth supply.

**Change to the old fallback.** The old fallback of "spin up to 0.3–0.5 g" still leaves the operating point in an untested regime below 1 g. It should be replaced by fallback 2.

---

## 6. Where others might disagree

1. **TRL lower bound.** Gemini will probably argue TRL 4: terrestrial metallurgy is TRL 9, so just add rotation. My answer is that environment substitution is not allowed under the rating rules. The case for TRL 3 is fair if reviewers accept 1 g, hypergravity and Stokes scaling as validated predictions. Hence the 2–3 range rather than a single 2.
2. **The choice of 0.05–0.15 g itself.** This is the most contestable point, and it argues against the requirement rather than within it.
   - A design at about 1.4 g resultant (e.g. 10 m, ~11 rpm) can be reproduced almost exactly on a ground centrifuge, including Coriolis.
   - It is also structurally modest: about 100–140 kN for a 10 t heat.
   - A 0.05–0.15 g design can never be ground-validated in g magnitude.
   - Counter-argument: higher rpm, larger spun mass, and harder spun/despun docking and transfer.
3. **AD² 6 versus 5.** If the panel fixes the architecture early (concentrate feed, whole-plant spin, freeze lining), "path is clear" may apply, giving AD² 5.
4. **Rotating convection.** I treat Ro ≪ 1 as an open risk to thermal homogeneity. Others may judge that induction or arc stirring overwhelms it.
5. **Whether a lunar-surface test counts as relevant environment.** It does for g = 0.165 settling kinetics. It does not for rotating-frame effects.
6. **Cost of step 7.** The figure has an order-of-magnitude uncertainty. It could exceed the plausible 0A envelope, which would itself push the selection toward fallback 1.

---

```yaml
id: microgravity-metallurgy
technology: Partial-gravity melting and slag/metal separation in a rotating module (Fe-Ni)
required: { scale: "1–10 t melt batches; ~60–2,500 heats/yr for 0.6–2.5 kt/yr Fe-Ni; paired e.g. 10 m @ 2.1–3.7 rpm or 20 m @ 1.5–2.6 rpm", environment: "sustained 0.05–0.15 g centripetal with Coriolis/g up to ~0.25–1.3 on tap streams and Ro ~0.02–0.1 for melt convection; vacuum exterior; heliocentric 0.9–1.3 AU at NEA; chondritic feed with FeS; uncrewed autonomous tapping, transfer and lining maintenance", duration: "multi-year continuous operation; TRL 6 demo assumed >=50 consecutive heats and >=1 lining campaign" }
phase_need: 0B
current_trl: { min: 2, max: 3 }
evidence:
  - claim: Gravity-driven slag/metal separation, tapping and refractory practice at industrial scale
    source: Terrestrial EAF/ladle steelmaking; The Making, Shaping and Treating of Steel (AISE, 1985/1998)
    scale_demonstrated: 10–300 t heats at 1 g, non-rotating, crewed
    scale_ratio: "0.003–1 by mass; environment not matched"
    confident: true
  - claim: Containerless metal melting in microgravity, no slag phase
    source: ESA ISS-EML, Columbus, 2014 onward
    scale_demonstrated: ~5–8 mm, ~1–2 g samples, microgravity
    scale_ratio: "n/a (wrong environment and function; ~1e6–1e7 by mass)"
    confident: true
  - claim: Electrostatic levitation melting in microgravity
    source: JAXA ISS-ELF, Kibo, ~2015–2016
    scale_demonstrated: ~2 mm samples, microgravity
    scale_ratio: n/a
    confident: true
  - claim: Convection-free directional solidification of alloys
    source: NASA/ESA MSRR/MSL on ISS, CETSOL/MICAST, 2009 onward
    scale_demonstrated: cm-diameter, tens of g, microgravity
    scale_ratio: n/a
    confident: true
  - claim: Centrifugal segregation of non-metallic inclusions in rotating molten metal
    source: Industrial centrifugal casting practice
    scale_demonstrated: tonne-scale, tens of g, minutes
    scale_ratio: "~1 by mass; hypergravity, opposite regime"
    confident: true
  - claim: Metal/oxide melt separation efficiency depends on centrifugal g
    source: Centrifugal SHS metallurgy, Yukhvid and co-workers (ISMAN), 1990s–2000s
    scale_demonstrated: lab scale, ~1–1000 g
    scale_ratio: n/a
    confident: false
  - claim: Low-gravity metal-silicate segregation requires high melt fraction (natural analogue, TRL 1 basis)
    source: Planet
