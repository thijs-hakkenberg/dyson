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

### CI-16 · Prospecting fleet size — `bom-0-1` · resolved (2026-10-21)
`phase-0/prospecting-satellites/consensus.md` (March): "Fleet size of 50 satellites is
appropriate for comprehensive NEA survey". content.ts / BOM: quantity 32.
*Resolution:* the regenerated consensus (2026-10-20) replaces the survey fleet with
SEP rendezvous scouts: a 6-scout reference in a 4–8 authorisation (Gemini's 12 × 250 kg
impactors kept as a divergent view). The BOM now reads 6 from
`reconciliation/phase-0/bom-numbers.yaml`; the explorer places 6.

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
No consensus power or rate figure for: swarm control (`bom-1-7`), maintenance drones (`bom-2-2`), optical backbone
(`bom-3a-2`), shell construction swarm (`bom-3a-8`), jet engine power,
mass lifting (`bom-3b-4`), EM accelerators (`bom-3b-6`). Mass drivers give
pulse power (120 MW–2.8 GW) but no average.

### CI-14 · Stellar engine geometry unspecified · open
No consensus thrust-axis direction or jet-engine location relative to the
Shkadov cap. *Explorer:* thrust axis = ecliptic north, labelled illustrative.

### CI-15 · Phase 0 start date · open
`content.ts` gives durations but no absolute start. *Explorer:* assumes 2030
(`ASSUMED_PHASE0_START`).
*2026-10-21:* the regenerated consensus dates its milestones as if 0A starts about
2026–27: LEO furnace free-flyer ~2028–29 (bom-0-12), Route Selection Review ~2029/30
(bom-0-3), tug wear test started by 2030 (bom-0-4), KDP-0B slipping to ~2037–38 if
first-pair sampling fails (bom-0-1). Still no stated start; the explorer keeps 2030.

### CI-17 · Transport vehicle fleet size — `bom-0-4` · resolved (2026-10-21)
`phase-0/transport-vehicles/consensus.md` (March): "Fleet of 10 vehicles for initial
operations". content.ts / BOM: quantity 15 ($133M each).
*Resolution:* the regenerated consensus gives 10–18 MW-class tugs (Claude 12, Gemini 15,
GPT 14), 2–4 bought at KDP-0B, at $0.3–0.8B each including arrays. The BOM carries 14
(the range midpoint and GPT's planning case) with the 10–18 range shown.

## Planning data inconsistencies

### CI-18 · Decision gates scheduled before their technologies are ready · resolved (2026-10-20)
`decision-gates.ts` (decision month from Phase 0 start, assumed 2030) combined with
`trl-assessment.ts` (`yearsToTarget` from today) put 6 gate→technology dependencies
after the gate decided (gate-1, gate-3, gate-4, gate-5 against the March 2026 rows).

**Outcome.** D-02 and the WP-A re-baseline replaced the five March gates with decision
*windows* (KDP-0A M0–3 … KDP-0B M72–180), and each criterion now states the TRL it
requires (KDP-0A requires none; internal 0A milestones TRL 4–5; KDP-0B TRL 6). The
Gate Tunnel times each link against that required TRL, not the target. On the panel's
optimistic estimates no dependency is late. On the pessimistic estimates 17 technologies
can slip into the KDP-0B window, T11/T18 into both scout gates, and 12 into the 0A
mid-term review: shown amber ("at risk"). The old six are history (`decision-gates-legacy.ts`).
*Explorer:* red = misses the window even optimistically; amber = pessimistic estimate
lands inside it; grey = the gate names the technology without a TRL requirement.

### CI-19 · TRL assessments cover only 6 of 33 BOM items · partly resolved (2026-10-20)
`trl-assessment.ts` linked technologies to bom-0-2, 0-3, 0-4, 0-5, 0-6 and a few
others; 27 items had no technology readiness or risk-if-fail rating.

**Outcome.** The Phase 0 TRL re-baseline rates 26 critical technologies, and every
Phase 0 BOM item (bom-0-1 … bom-0-7) now has at least one. Phases 1–3b are still
unassessed; their re-baselines follow the phase-by-phase reconciliation.
*Explorer:* Risk lens marks them "unassessed" (grey halo, technology term unknown,
not zero).

### CI-20 · Phase 0 mining capacity is ~12× the station's processing capacity · resolved (2026-10-21)
`phase-0/mining-robots`: 20 robots × 2–5 t/h continuous excavation ≈ 350–880 kt/yr.
`phase-0/material-processing-station`: 50,000 t/yr at full capacity. Either the
mining fleet is oversized, the robots run at a low duty cycle (not stated), or
concentration on board removes ~90% of mass before transport (consensus mentions
"on-board material processing for initial concentration" but gives no ratio).
*Explorer:* Logistics lens shows the station as the ore chain's bottleneck.
*Resolution:* the regenerated consensus sizes the fleet by formula, N_active =
⌈M_exc / measured per-robot output⌉: about 6 active robots at 2.2–4 kt/yr of regolith
(13–24 kt/yr) feed a 3-train plant making 1.0–1.3 kt/yr of Fe-Ni, a ratio set by the
8–18 wt% feed grade. The logistics lens now runs robots → plant → tugs → SEL1 node;
plant or tugs (~1 kt/yr as a fleet) limit it.

### CI-21 · Phase 2 collector areal density spans ~3,800× for similar areas · open
`phase-2/collector-satellites`: Claude 1 km² at **850 t** (850 g/m²), Gemini
0.785 km² at **225 kg** (~0.29 g/m²), GPT 5,000 m² at 2,500 kg (500 g/m²).
Gemini's figure is below a bare 1 µm polyimide film (~1.4 g/m²) before any PV,
wiring or structure; Claude's is heavier than most rigid panels. The consensus
picks GPT's class as the start point but does not comment on the mass figures.
*Explorer:* 3D model view shows the three sizes as ghosts; the panel lists the masses.

### CI-22 · Assembly node size differs 19× between models · open
`phase-1/assembly-node`: Claude 340 m hexagonal 6-petal hub (40 m core, 150 m
petals), Gemini 120 m linear spine, GPT 18 m truss spine — yet the consensus
gives a single dry-mass range (120–450 t) and a single radiator area range.
No consensus envelope exists. *Explorer:* the solid model uses the geometric
mean (~90 m) and is flagged; the three proposals stand beside it as ghosts.

### CI-23 · Many element sizes have no consensus value · open
For 16 of 30 physical BOM items the consensus quotes per-model dimensions but
no agreed size (e.g. tiles, PV blankets, mass-lifting coils, EM accelerators,
jet modules, Shkadov elements). Element sizes of Phase 3b proposals span 10–200×.
*Explorer:* `core/models.ts` marks these `sizeBasis: 'geomean'` and the panel
flags them; it does not pick a winner.

### CI-24 · Phase 3 loads have no power source; the energy balance goes negative from ~2143 · open
Summing nominal per-unit power over deployed units (`core/metrics.ts`), Phases 1–2
end with a surplus of ~0.4 TW (PV blankets ~276 GW, Phase 2 collectors ~130 GW).
From the start of Phase 3 consumption exceeds generation for good:
`phase-3b/helium-separation-plant` draws **1.5–3 PW** across 500 plants (Gemini:
15 PW *per node*), `phase-3a/self-replicating-foundries` 0.5–2 GW each (~1 TW),
while the 10¹² Matrioshka tiles are self-powered (their generation equals their
compute load, ~8 PW). At full build-out generation is ~8.0 PW and consumption
~10.3 PW: a **2.25 PW deficit** no BOM item supplies. Either the stellar engine
draws power from the Sun directly (not stated — e.g. part of the swarm dedicated
to it), the tiles export a surplus (not in their figures), or Phase 3b needs its
own collector fleet that is not in the BOM. `phase-3b/em-accelerators` has a
divergent *sign* (Claude: net producer via MHD recovery; Gemini: 45 PW consumer)
and is not summed. *Explorer:* telemetry flags the deficit and its largest loads;
the ROI section shows cumulative net energy turning negative.

### CI-25 · The BOM never approaches a saturated swarm · open
At full build-out (nominal, 2743) the summed generation is ~8 PW, **2×10⁻¹¹ of
the Sun's 3.8×10²⁶ W**. Phase 2's 10⁵ collectors, even at the largest proposal
(~1 km² each), cover ~4×10⁻¹³ of a 1 AU sphere; the 10¹² Matrioshka tiles at ~5 m
cover ~10⁻¹⁰ of one. The project's framing ("capture the full energy output of a
star", homepage) implies quantities some ten orders of magnitude beyond the BOM. Self-replication
(Phases 2–3a) is the stated route to scale, but no phase lists the target count,
the doubling time to reach it, or where the power for growth comes from (see CI-24).
*Explorer:* telemetry shows generation as a fraction of L☉ (saturation).

## Phase 0 BOM after regeneration (2026-10-21)

Found while turning the 17 regenerated consensus documents into
`reconciliation/phase-0/bom-numbers.yaml`. Each item's figures are carried as its own
consensus states them; nothing below is netted out.

### CI-26 · Robot replacements counted in two items — `bom-0-2`, `bom-0-14` · open
`phase-0/mining-robots`: the 0B planning reference is "6 active + 2 reserve, plus 2–4
reliability-derived replacements (10–12 total), costing about $280–825M recurring".
`phase-0/spares-replacements`: "Include robot attrition and whole-robot replacements in
bom-0-14. bom-0-2 then means the initial fleet only." Read together, 2–4 robots
($56–260M at $28–65M each) are in both lines. *BOM:* both carried as stated.

### CI-27 · 0A length assumed by operations is shorter than the KDP-0B window — `bom-0-10` · open
`phase-0/mission-operations` prices 0A at $35–55M/yr over about 4–5.5 years
($190–300M). D-02 puts KDP-0B between month 72 and month 180, so 0A lasts 6–15 years;
at the same rate that is $210–825M. The other 0A lines that run per year (bom-0-7,
bom-0-9) do not state the duration they assume. *BOM:* carries the consensus 0A figure.

### CI-28 · Launch mass floor is below the propellant it must carry — `bom-0-8`, `bom-0-16` · open
`phase-0/launch-delivery` plans 1.3–6 kt delivered and rejects a 2.5 kt floor, the low
end being a 0.6 kt/yr × 4 yr low-demand case. `phase-0/ep-propellant-supply` asks bom-0-8
to carry 250–440 t/yr of propellant launch load, which over a 5–6.5 year 0B run is
1.25–2.9 kt of propellant alone, before hardware (plant 250–400 t, 10–18 tugs of 38–70 t
dry). The 1.3 kt floor holds only if propellant scales down with demand, which neither
document states. *BOM:* both envelopes as stated.
*2026-10-25 (rq-0-61 chain model):* launched mass is 5.3 kt at P50 with the consensus
budgets as written and 6.4 kt with catalogue trajectories; no draw falls below 1.3 kt.

### CI-29 · 0A cost is above the D-01 assumption — `phase-0` · open
`reconciliation/phase-0/decisions.md` assumption A4: "0A ($3.5–16B) is fundable".
The regenerated 0A sums to $6.3–12.3B before contingency and $8.8–18.4B with the
bom-0-17 rates (40–50%). The low end is about 2.5× the assumed one, and with contingency
the top passes $16B. NRE and qualification (bom-0-11, $3.9–6.6B) is over half the 0A base.
A4's falsifier is "no funding path". This log does not change the decision record; the
owner re-checks A4.
*2026-10-25 (rq-0-84):* with historical cost growth on development lines, P(0A ≤ $16B) is
0.63–0.81, and the 45% 0A rate buys about 57% confidence.

### CI-30 · Δv budgets do not close against the asteroid catalogue — `bom-0-1`, `bom-0-4` · open
`phase-0/prospecting-satellites`: ≤3.5 km/s EP to the primary target from launch at C3 ≈ 0.
`phase-0/transport-vehicles`: storage sized for "a 5 km/s-per-leg envelope" and a KDP-0B
criterion of a ≤3.0-year named-target cycle. The rq-0-52 screen of the JPL SBDB catalogue
(direct transfers, 2030–2040) finds **no** asteroid of ~100 m or more that meets all three.
From C3 ≈ 0, scouts reach 2 large targets within 4.5 km/s; at 5 km/s per leg the shortest
tug cycle is 4.7 years. It closes for 15 targets with scouts launched to C3 = 10 and tug legs
of 6.5 km/s within 4 years, still below Claude's falsifier of 20. Gravity assists are not yet
modelled and would add candidates.

### CI-31 · Propellant demand assumes lighter legs than the catalogue supports — `bom-0-16` · open
`phase-0/ep-propellant-supply` plans 230–400 t/yr of iodine and an import-ratio gate of ≤0.50
(≤0.35 target), noting demand moves "from about 0.13 to 0.61 across 3–6 km/s". The legs the
catalogue supports are 5.6–6.5 km/s. The rq-0-61 chain model then gives 520–860 t/yr (P10–P90)
and an import ratio of 0.66 at P50, failing the ≤0.50 limit in 97% of draws. Isp of
3,000–3,500 s, the bom-0-16 trade range, brings it to about 0.48.

