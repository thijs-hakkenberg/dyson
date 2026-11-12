---
bomId: "bom-0-1"
itemName: "Prospecting Survey and Rendezvous Scouts"
itemSlug: "prospecting-satellites"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-1 Prospecting Survey and Rendezvous Scouts: Consensus Synthesis (Phase 0A, gated 0B option)

**Basis.** 2026 USD. The three inputs are Claude Opus 5.5, Gemini 3.1 Pro and GPT-6.1 Sol. Where Gemini's current proposal departs from its own round-2 figures, the current proposal is used.

---

## Key Specifications

These points are common to all three models.

- **Two-tier architecture with no dedicated telescopes in the initial buy.**
  - Pre-screening comes from purchased or external observations: ground spectroscopy, radar and existing space surveys such as NEO Surveyor.
  - Dedicated scouts then follow up a shortlist.
  - Gemini's current proposal drops the two round-2 telescopes in favour of a $20M grant-based screening line.
  - Survey-programme allowances span $20M (Gemini) to $20–60M (GPT) to $30–67M (Claude).

- **Every scout is a rendezvous mission; no flybys.**
  - Each scout has one primary target.
  - A secondary target is opportunistic and is not a baseline requirement.
  - GPT does not credit it. Gemini allows it "only via extended mission geometry". Claude makes it the first descope lever, although his fleet-sizing model still credits 0.6 secondaries per scout.

- **Solar-electric Hall propulsion, with iodine as the reference case (consistent with D-05).**
  - Launch is to C3 ≈ 0.
  - Ideal EP Δv capability is 3.5–4.8 km/s: Gemini 3.5, Claude 4.5 design (3.5–5.5), GPT 4.81 ideal with ≤3.5 allocated to the primary transfer.
  - Isp is 1,700–2,200 s.
  - The iodine feed system (heated, corrosion-controlled) and thruster life testing are the long-pole propulsion risks.

- **Remote data alone cannot support the Target gate.**
  - All three require physical ground truth at the asteroid before mining robots or industrial assets are committed.
  - The quantities that must be measured in place are regolith cohesion and mechanics, grain size, and metal form and abundance.

- **Common remote-sensing core on the scout:**
  - VNIR/SWIR spectrometer reaching about 3.4–3.8 µm, for hydration context;
  - 8–14 µm thermal-IR imager or radiometer, for thermal inertia and grain size;
  - narrow- and wide-angle optical navigation cameras;
  - low-contamination cold-gas control for fine proximity work. The main EP is not fired near the surface.

- **Gated, tranched procurement.**
  - A first pathfinder tranche flies and returns data before the remaining scouts are committed.
  - The size of later tranches is set by tranche-1 results.
  - Building the full fleet is not automatic.

- **Onboard autonomy is mandatory.**
  - Round-trip light time is about 17–50 minutes.
  - Autonomous optical navigation, hazard avoidance, safe-hold and descent-abort logic are therefore required.
  - DSN time is not free. The fleet needs thousands of procured antenna-hours per year at peak: Gemini ~4,000; GPT 2,000–4,500; Claude 5,000–9,000.

- **Data return and life.**
  - X- or Ka-band downlink at roughly 10–60 kbps at operational ranges, with a 0.5–0.8 m high-gain antenna.
  - Several GB of prioritised data per target (2–10 GB). Round-1 figures of tens to hundreds of GB are rejected.
  - Primary life 4–5 yr; extended goal 7 yr.
  - Battery 1–2 kWh.

---

## Divergent Views

- **Fleet size and spacecraft class**:
  - Claude recommends 6 scouts (range 4–8), each about 550 kg wet (460–600 kg), carrying two Surface Assay Packages.
  - Gemini prefers 12 scouts of 250 kg wet (205 kg dry), on a 1.5 kW, 600 W single-thruster bus.
  - GPT suggests 6 scouts as a planning reference (envelope 4–10), each about 500 kg wet (400–600 kg) on a 4 kW array.
  - Fleet sizing also differs. Claude sizes for P(≥2 commit-grade targets) ≥ 0.85. Gemini assumes a 25 % hit rate yielding 3 sites. GPT's illustrative model shows six scouts give only about 58 % probability of ≥2 qualifying targets, so six cannot be claimed sufficient if a backup is mandatory.

- **Subsurface sampling method (scope compliance)**:
  - Claude recommends expendable anchored landers. Two SAPs per scout, each about 42 kg, use screw anchors and a rotary-percussive drill to 1.0 m, followed by an in-situ "beneficiation in a box": sieve, crush, magnetic separation, microgravity mass balance, micro-XRF, EGA and contact GRNS. The mothership never descends below 50 m.
  - Gemini prefers a 2 kg spring-loaded kinetic impactor observed from hover, with no sample acquisition or bulk assay.
  - GPT suggests an articulated 1.5–2 m sampling arm on the scout itself, with restraint downselected after testing. It specifies ≥0.3 m minimum and 1 m goal penetration, 8 or more increments across 4 stations, and an XRF + XRD + magnetic-separation chain. It explicitly rejects uncontained impactors.

- **Cost level and accounting boundary**:
  - Claude recommends $680M nominal ($495–900M) for bom-0-1 0A. This includes $240M of item-specific development and implies about $100M all-in per scout ($55–70M recurring), plus a 35–50 % reserve.
  - Gemini prefers $569M, which includes launch ($90M) and ops/ground ($85M) that belong to bom-0-8/9/10. Its recurring cost is $22M per unit.
  - GPT suggests $290–490M direct, covering survey plus recurring units at $40–85M each, with $150–300M of NRE placed in bom-0-11. Its lifecycle envelope is $0.85–1.8B including reserve.

- **Pathfinder tranche size and gating**:
  - Claude recommends 2 pathfinders, then 2–6 more at a "Gate A". Gate A requires a core to ≥0.8 m and assay within ±15 %. Tranche-2 long-lead items are ordered at T1 CDR + 12 months.
  - Gemini prefers 4 pathfinders followed by 8 production units, on a compressed schedule: launch at year 2.5, gate at year 4.
  - GPT suggests three gated pairs. Each later pair is justified only if it beats redesign, alternative sourcing or stopping.

- **Propulsion rationale and alternate**:
  - Claude recommends iodine with argon as the D-05 alternate. He quantifies that argon adds 45–70 kg and breaches the 600 kg envelope unless one SAP or the secondary target is dropped.
  - Gemini prefers iodine chosen deliberately as a tug-commonality pathfinder, with krypton as the fallback. Krypton is not the D-05 alternate.
  - GPT suggests selecting neither propellant yet and not forcing scout–tug commonality. It sets a qualification target of 12,000–16,000 equivalent hours, against Claude's 6,500 h.

- **Bulk-composition and contamination details**:
  - Claude recommends contact gamma/neutron spectroscopy on the SAP, with no orbital GRNS. He keeps a 20 km main-EP exclusion zone and sets an interim limit of ≤100 g per site lofted above escape speed.
  - Gemini prefers no GRNS. It uses an autonomy-"levels" framework and does not address an ejecta limit.
  - GPT suggests no GRNS baseline. It adds XRD and a magnetometer, uses a 1 km EP exclusion as a planning value, and requires captured cuttings, deferring any release ceiling to licensing under ALARP.

---

## Open Questions

1. **Joint accessibility.** How many metal-plausible NEAs are reachable by a 3.5 km/s low-thrust scout *and* support tug round trips to SEL1 (D-04) in 2030–2040 windows? Claude's falsifier: fewer than 20 such candidates would reopen the target strategy with bom-0-4.

2. **Anchoring and sample representativeness in micro-g.**
   - Can a drill with ≤5 N weight-on-bit, or an arm with positive restraint, reach 0.3–1 m in cohesionless regolith with cm-scale clasts without exceeding anchor capacity? Philae is the cautionary case.
   - Can about 1–2 kg from 3–4 stations bound grade heterogeneity and the coarse-metal "nugget effect"?
   - Should the first pair deliberately fly different acquisition heads?

3. **Assay validity against the process model.**
   - What recoverable-metal threshold closes the bom-0-3 mass balance at 0.6–2.5 kt/yr? Claude's placeholder is ≥8 wt % (5–15). GPT's illustration of 20 % metal × 70 % recovery × 90 % yield implies about 7.9 kt/yr of feed per kt of product.
   - Can a compact magnetic-separation + XRF/XRD chain distinguish native Fe-Ni from magnetite and replicate full-scale beneficiation to within about ±10 %?

4. **Propellant closure.**
   - Does 1–2 kW iodine Hall operation reach ≥3,000 h by PDR with acceptable erosion and plume deposition?
   - If not, does argon close the mass, efficiency and tankage budget inside 600 kg?

5. **Decision thresholds and ground capacity.**
   - What false-commit probability will the programme authority accept? This in turn decides whether a fully characterised backup site is mandatory, which drives fleet size between 4 and 10.
   - Can bom-0-9 procure 4,000–9,000 deep-space antenna-hours per year for 2033–2038, and at what cost?

6. **Instrument margins.**
   - Can an uncooled microbolometer reach the SNR needed for thermal-inertia mapping without a cryocooler (Gemini)?
   - Does contact GRNS add enough bulk-grade value over direct sampling to earn its about 3 kg (Claude versus GPT)?

---

## Recommended Approach

1. **Adopt a 6-scout reference fleet within a 4–8 unit authorisation, procured as an initial pair plus evidence-gated follow-on tranches.**
   - Each scout is about 500–550 kg wet within the 400–600 kg envelope, with a 3.6–4 kW BOL array and about 2–2.5 kW to EP.
   - Each carries one credited primary target. Secondary targets are uncredited upside.
   - Reject Gemini's 12 × 250 kg impactor configuration. It does not deliver the accepted scope of subsurface sampling and bulk assay, and its uncontained impactor conflicts with bom-0-15.
   - Size later tranches from the posterior hit rate after the first pair cores.
   - If programme policy requires a characterised backup site, plan toward the upper end (8 units).

2. **Carry two competing T18 sampling architectures to PDR, then downselect on reduced-gravity and vacuum test evidence.**
   - Option A: Claude's anchored, hopping SAP landers drilling to 1 m. This keeps contact risk off the propulsion bus.
   - Option B: GPT's articulated arm with force-controlled restraint.
   - Requirements for both: ≥0.3 m demonstrated penetration (1 m goal) and ≥6–8 cored increments across ≥3 geologic units.
   - Keep a pneumatic shallow head as backup.
   - Fund this as the item's top technical priority, since T18 is AD² 6 and project-ending.

3. **Specify the assay as a measured recoverability test, not a spectral inference.**
   - Combine Claude's process chain (sieve, crush, magnetic separation, microgravity mass balance, micro-XRF, EGA) with GPT's XRD phase discrimination.
   - Calibrate against a blinded meteorite and simulant library that includes magnetite-bearing decoys and coarse-metal samples.
   - Primary deliverable: recoverable Fe-Ni wt % with concentrate Ni, S and P and explicit uncertainty. "Insufficient evidence" is a permitted outcome.
   - Set the commit-grade threshold from the bom-0-3 mass balance and the Phase 1 material specification, not inside this item.

4. **Fund the purchased remote survey and accessibility study immediately, with no dedicated telescopes; budget $30–60M for 0A.**
   - Ingest external catalogues; buy IRTF/3 µm spectroscopy and radar time.
   - Run a joint scout/tug low-thrust accessibility study with bom-0-4 by PDR.
   - Retrospectively validate the pre-screen hit rate against visited asteroids.
   - Deliver a shortlist of ≥15 candidates by PDR and ≥25 by the second-tranche decision.

5. **Follow D-05 literally on propulsion.**
   - Cost iodine as the reference and argon as the alternate. Do not substitute krypton (Gemini) or treat tug commonality as a selection driver.
   - Start the iodine wear test now: ≥3,000 h by PDR, then a qualification life of ≥1.5× mission throughput. That is about 6,500 h on Claude's profile; GPT's 12,000–16,000 h is the conservative bound.
   - Pre-declare the argon mass response: one SAP per scout, or no secondary target.
   - Fleet propellant is under 1 t, so it should not drive the programme-wide propellant decision.

6. **Fix the cost boundary, then budget against it.**
   - Item-specific scout, sampler and assay development sits in bom-0-1. Cross-cutting test facilities sit in bom-0-11. Launch, ground, ops, spares and propellant stay in bom-0-8/9/10/14/16.
   - On that basis, budget bom-0-1 0A at about $500–900M (nominal ~$650M): survey $30–60M, development $180–320M, recurring units at $45–85M each (first pair at the upper end).
   - Budget the 0B option at $0–150M, sized at the 0B gate per D-01. This covers 0–2 site-confirmation scouts plus survey continuation.
   - Disagree with the round-2 per-unit figures ($25–80M) as all-in costs; they are credible only as recurring costs.
   - Hold a 30–50 % reserve in bom-0-17.
   - Attributable lifecycle cost across lines is about $0.9–1.8B.

7. **Write contamination, communications and gate criteria as verifiable requirements now.**
   - **Contamination:** no uncontained impactors; cold gas only within about 500 m of the surface; main EP exclusion zone of 1–20 km to be set by plume analysis; witness plates and an exhaust log; captured cuttings; an interim per-site ejecta ceiling handed to bom-0-15 under ALARP (D-03).
   - **Communications:** plan for 3–8 GB returned per target. Contract 4,000–9,000 antenna-hours per year at peak through bom-0-9 before launch. Stagger arrivals so no more than 3 scouts are in proximity at once.
   - **Gates:**
     - Gate A, before further tranches: the first pair cores ≥0.8 m and assay within ±15 % of in-flight standards.
     - KDP-0B: T11/T18 at TRL 6 or higher in a relevant environment with no waivers, which first-pair flight at a real asteroid provides.
     - Target gate: ≥1 commit-grade site at ≥90 % confidence, plus a backup at ≥70 % if programme policy requires one.
     - If first-pair sampling fails, accept that KDP-0B slips to about 2037–38 rather than waiving.