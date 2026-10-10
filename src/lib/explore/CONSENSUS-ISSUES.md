# Consensus issues found while building the explorer

Inconsistencies, gaps and ambiguities in the BOM specs / consensus documents
that surfaced while turning them into numbers for the 3D explorer. Logged for
later assessment — **not resolved here**. Divergent model views are expected
and are not issues by themselves; these entries are places where a figure is
internally inconsistent, missing, or can't be mapped onto the BOM.

Each entry notes how the explorer currently handles it (see
`core/metrics.ts`, `core/placements.ts`).

Status: `open` until assessed.

---

## Internal inconsistencies

### CI-01 · Jet engine thrust vs. stated solar acceleration — `bom-3b-2` · open
`phase-3b/thermonuclear-jet-engine/consensus.md` gives ~3×10¹⁸ N with
"~10⁻⁹ m/s² net solar acceleration". With F = M☉·a, 3×10¹⁸ N / 1.989×10³⁰ kg
≈ 1.5×10⁻¹² m/s² — about three orders of magnitude below the stated
acceleration. Either the thrust or the acceleration figure is off (or the
acceleration refers to something else, e.g. a reduced-mass engine-star system).
*Explorer:* uses the thrust figure and derives a = F/M☉ (~1.7×10⁻¹² m/s² at
full build-out).

### CI-02 · Shkadov mirror thrust vs. acceleration — `bom-3b-1` · open (minor)
Consensus: net thrust ~10¹⁷–10¹⁸ N, acceleration ~10⁻¹³–10⁻¹² m/s². F/M☉
gives 5×10⁻¹⁴–5×10⁻¹³ m/s² — same order, ~2× low. Worth a check of which
mass/geometry was assumed.

### CI-03 · Matrioshka shell temperatures misaligned with radii — `phase-3a` · open
`phase-3a/_bom-proposals/consensus.md` (open question 3): Opus "5 layers at
0.5, 1.0, 2.5, 8, and 25 AU (5800 K, 800–1200 K, 200–400 K, 40–80 K,
10–20 K)". 5800 K is the photosphere, not a shell at 0.5 AU, so the
temperature list appears shifted by one relative to the radii.
*Explorer:* interpolates log-log between 1200 K @ 0.5 AU and 20 K @ 25 AU.

### CI-04 · Feedstock pipeline power: per-ship vs. total — `bom-3a-6` · open
Ships are 1–10 MW each (10,000 ships in the BOM → 10–100 GW), but the
consensus states total consumption ~2–3 TW. The difference may be non-ship
infrastructure (mass drivers, catcher tugs), but it isn't itemised.
*Explorer:* sums per-ship power only.

### CI-05 · Helium separation total power — `bom-3b-5` · open
Consensus "1.5–3 PW across the full constellation"; Claude's spec is quoted as
"~10¹⁸ W total" (1 EW) for separation, and Gemini 15 PW *per node* (7.5 EW for
500 plants). The stated consensus range doesn't contain the Claude figure.
*Explorer:* base 1.5–3 PW / 500 plants, max = Gemini.

## BOM ↔ consensus mismatches (quantity / sizing)

### CI-06 · Jet engine module count — `bom-3b-2` · open
Consensus recommends ~10,000 modules at ~3×10¹⁴ N each; content.ts lists
quantity 100 "engine units" at $4B each.
*Explorer:* spreads the consensus system thrust over the BOM quantity.

### CI-07 · Solar wind collector fleet size — `bom-3b-3` · open
Claude: ~2.75 PW recovered per unit, ~55 EW fleet-wide (→ ~20,000 units).
BOM quantity is 10⁷ collector stations.

### CI-08 · Assembly robot count — `bom-1-3` · open
BOM: 50 units. Consensus: Claude 350 robots total for Phase 1; Gemini
10,000 units/month by end of Phase 1.

### CI-09 · Phase 3a unit costs implausibly low — `bom-3a-1`, `bom-3a-3`, `bom-3a-7` · open
content.ts: substrate tiles $1.50 each (35–45 kg, 25–60 PFLOPS per the
consensus); radiator $0.000008 / m²; power interface units $0.008 each.
These read as marginal-energy costs at self-replicating scale, but the basis
isn't stated, and they dominate nothing in the total so it's easy to miss.

### CI-10 · Phase 1 collector unit power spans 5000× — `bom-1-1` · open
GPT 10 kW (40 m² at 1 AU), Gemini 44 MW, Claude 52 MW per unit. The
recommendation (~0.5–5 MW tiles) sits between; unit cost is $100M in the BOM.
Divergence is legitimate, but the BOM unit cost implicitly picks a size.
*Explorer:* base = geometric mid of the recommended 0.5–5 MW.

### CI-16 · Prospecting fleet size — `bom-0-1` · open
`phase-0/prospecting-satellites/consensus.md`: "Fleet size of 50 satellites is
appropriate for comprehensive NEA survey". content.ts / BOM: quantity 32.
*Explorer:* uses the BOM quantity (32), including in the "From asteroid to swarm" tour.

## Sign / meaning disagreements

### CI-11 · Solar wind collectors: producer or consumer? — `bom-3b-3` · open
Claude: net producer via MHD deceleration (~2.75 PW/unit). Gemini: 45 PW net
*consumption*. GPT: not quantified. This is a divergent view, but the sign
flip means no aggregate can be computed.
*Explorer:* listed as "not summed".

## Missing data

### CI-12 · Missing `divergent-views.yaml` · open
No structured divergent views for: `phase-3a/computational-substrate-tiles`,
`phase-3a/inter-layer-power-distribution-network`,
`phase-3a/shell-construction-maintenance-swarm`,
`phase-3b/solar-wind-collectors`. (The inspector fetch 404s for these.)

### CI-13 · Items without power/throughput figures · open
No consensus power or rate figure for: transport vehicles (`bom-0-4`),
swarm control (`bom-1-7`), maintenance drones (`bom-2-2`), optical backbone
(`bom-3a-2`), shell construction swarm (`bom-3a-8`), jet engine power,
mass lifting (`bom-3b-4`), EM accelerators (`bom-3b-6`). Mass drivers give
pulse power (120 MW–2.8 GW) but no average.

### CI-14 · Stellar engine geometry unspecified · open
No consensus thrust-axis direction or jet-engine location relative to the
Shkadov cap. *Explorer:* thrust axis = ecliptic north, labelled illustrative.

### CI-15 · Phase 0 start date · open
`content.ts` gives durations but no absolute start. *Explorer:* assumes 2030
(`ASSUMED_PHASE0_START`).

### CI-17 · Transport vehicle fleet size — `bom-0-4` · open
`phase-0/transport-vehicles/consensus.md`: "Fleet of 10 vehicles for initial
operations". content.ts / BOM: quantity 15 ($133M each).
*Explorer:* uses the BOM quantity.

## Planning data inconsistencies

### CI-18 · Decision gates scheduled before their technologies are ready · open
Combining `decision-gates.ts` (decision month from Phase 0 start, assumed 2030)
with `trl-assessment.ts` (`yearsToTarget` from today, Oct 2026), 6 gate→technology
dependencies reach target TRL after the gate decides:

| Gate (decision) | Technology | TRL | Target reached ~ |
|---|---|---|---|
| gate-4 Asteroid Target Selection (M24 ≈ 2032.0) | autonomous-asteroid-prospecting | 5→8, 6 y | 2032.8 |
| gate-1 Microgravity Materials Processing (M36 ≈ 2033.0) | microgravity-metallurgy | 3→7, 8 y | 2034.8 |
| gate-1 (M36) | in-space-silicon-purification | 2→6, 10 y | 2036.8 |
| gate-3 ISRU Water Extraction Rate (M48 ≈ 2034.0) | isru-water-extraction | 3→7, 8 y | 2034.8 |
| gate-5 Phase 0 PDR (M60 ≈ 2035.0) | asteroid-mining-bucket-wheel | 3→6, 10 y | 2036.8 |
| gate-5 (M60) | in-space-silicon-purification | 2→6, 10 y | 2036.8 |

Possible readings: gates decide on partial evidence (target TRL not required
at the gate), the Phase 0 start is later than 2030, or the gate months/TRL
timelines need reconciling. Sensitive to `ASSUMED_PHASE0_START` (CI-15).
*Explorer:* Gate Tunnel draws these links in red and counts them per gate.

### CI-19 · TRL assessments cover only 6 of 33 BOM items · open
`trl-assessment.ts` links technologies to bom-0-2, 0-3, 0-4, 0-5, 0-6 and a few
others; 27 items (all of Phases 1–3b except where linked) have no technology
readiness or risk-if-fail rating. *Explorer:* Risk lens marks them
"unassessed" (grey halo, technology term unknown, not zero).

### CI-20 · Phase 0 mining capacity is ~12× the station's processing capacity · open
`phase-0/mining-robots`: 20 robots × 2–5 t/h continuous excavation ≈ 350–880 kt/yr.
`phase-0/material-processing-station`: 50,000 t/yr at full capacity. Either the
mining fleet is oversized, the robots run at a low duty cycle (not stated), or
concentration on board removes ~90% of mass before transport (consensus mentions
"on-board material processing for initial concentration" but gives no ratio).
*Explorer:* Logistics lens shows the station as the ore chain's bottleneck.
