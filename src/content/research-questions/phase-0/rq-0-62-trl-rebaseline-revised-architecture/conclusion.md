---
questionId: "rq-0-62"
questionSlug: "trl-rebaseline-revised-architecture"
type: "analysis-conclusion"
generatedBy: "scripts/build-readiness-data.js output, summarised"
generated: "2026-10-20"
---

# Conclusion: Technology readiness re-baseline for the revised Phase 0 architecture

## Summary

The three-model panel (Claude Opus 5.5, Gemini 3.1 Pro, GPT-6.1 Sol) rated 26 critical technologies of the revised architecture on the NASA TRL scale and on AD², at the scale, environment and duration Phase 0 requires, with cited evidence, a development path and a fallback for each (WP-A Part 1, assessed 2026-10-17).

- **Readiness is early.** Current TRL runs from 2 to 5 across all technologies. No model supports the March 2026 rating of high-power SEP at TRL 6–7 <!-- stale-ok: names the superseded rating --> for the revised 1–2.5 MWe tugs.
- **17 technologies are project-ending** under the panel's headline (most severe class any model gave); 9 are architecture-change. Eight risk classes split between models and wait on an owner ruling (rq-0-65).
- **The panel agrees on 24**, diverges on 1 (T24), and 1 (T26) is set by owner ruling (rq-0-64). Every model's rating is kept; the headline is the envelope, never an average.
- **Every March 2026 row is accounted for:**

- `solar-electric-propulsion`: replaced by T01, T14
- `asteroid-mining-bucket-wheel`: replaced by T04, T16
- `microgravity-metallurgy`: replaced by T06, T07, T17, T22, T23
- `autonomous-asteroid-prospecting`: replaced by T11, T18
- `isru-water-extraction`: replaced by T13
- `cryocooler-scaling`: deferred to phase-1 (No production LOX/LH₂ in Phase 0 (round-2 §2))
- `sunshield-deployment`: deferred to phase-1 (Cryogenic depot removed from Phase 0)
- `mli-long-duration`: deferred to phase-1 (Cryogenic depot removed from Phase 0)
- `electrolysis-microgravity`: deferred to 0B (Water pilot only; electrolysis at industrial scale deferred)
- `in-space-silicon-purification`: deferred to phase-1 (Solar-grade Si deferred (round-2 §2))

The baseline feeds the D-02 gate proposal (KDP-0A, the 0A mid-term review, KDP-0B, and the target, demand, economics and licence gates). The gate thresholds the panel could not settle are routed to evidence questions rq-0-76 … rq-0-83.

## Ratings

| ID | Technology | TRL now | Target | AD² | Risk if it fails | Needed in | Panel |
|---|---|---|---|---|---|---|---|
| T01 | MW-class SEP thruster and PPU cluster | 2–4 | 6 | 6 | project-ending | 0B | agree |
| T02 | MW-scale deployable solar arrays (tug; site per Gemini and GPT) | 2–4 | 6 | 5 | project-ending | 0B | agree |
| T03 | MW-class waste-heat rejection (plant and tug) | 2–5 | 6 | 5–6 | project-ending | 0B | agree |
| T04 | Asteroid excavation (with anchoring per Gemini and GPT) | 2–3 | 6 | 6–7 | project-ending | 0B | agree |
| T05 | Microgravity beneficiation of native Fe-Ni | 2–4 | 6 | 5–6 | project-ending | 0B | agree |
| T06 | No-melt carbonyl refining with CO recycle (Gemini: carbonyl or H2 reduction combined) | 2–3 | 6 | 6 | architecture-change | 0B | agree |
| T07 | Partial-gravity melting and slag/metal separation in a rotating module | 2–3 | 6 | 6–7 | architecture-change | 0B | agree |
| T08 | Particle containment, escape verification and tailings management | 2–3 | 6 | 6–7 | project-ending | 0B | agree |
| T09 | High-voltage power tethers and site distribution on regolith | 2–4 | 6 | 5–6 | architecture-change | 0B | agree |
| T10 | Long-duration autonomy for mining, processing and proximity operations | 2–4 | 6 | 6 | project-ending | 0B | agree |
| T11 | Rendezvous scout spacecraft (with sampling per Gemini and GPT) | 2–4 | 8 | 5–6 | project-ending | 0A | agree |
| T12 | Autonomous handling, docking and transfer of 150-300 t payloads | 2–4 | 6 | 5–6 | architecture-change | 0B | agree |
| T13 | Asteroid water extraction pilot | 2–4 | 6 | 5–6 | architecture-change | 0B | agree |
| T14 | Propellant storage and feed at hundreds of tonnes per tug | 2–4 | 6 | 5–6 | project-ending | 0B | agree |
| T15 | Site power generation and transfer | 2–3 | 6 | 5–6 | project-ending | 0B | agree |
| T16 | Anchoring, hold-down and surface mobility on low-cohesion bodies | 2–4 | 6 | 7 | project-ending | 0B | agree |
| T17 | H2 reduction of the reducible feed fraction with H2 recycle | 2–4 | 6 | 6–7 | architecture-change | 0B | agree |
| T18 | Subsurface sampling and in-situ bulk grade assay | 2–4 | 8 | 6 | project-ending | 0A | agree |
| T19 | Microgravity bulk-solids handling (Claude: and comminution) | 2–3 | 6 | 6–7 | project-ending | 0B | agree |
| T20 | Distributed energy storage (GPT: and microgrid power management) | 3–5 | 6 | 4–5 | architecture-change | 0B | agree |
| T21 | Robotic maintenance, repair and spares logistics (GPT: and site installation and recovery) | 2–4 | 6 | 6 | project-ending | 0B | agree |
| T22 | Product consolidation, packaging and qualification | 2–4 | 6 | 5–6 | project-ending | 0B | agree |
| T23 | Native-metal production/consolidation in rotating modules (GPT route) | 2–3 | 6 | 6 | architecture-change | 0B | agree |
| T24 | Dust-tolerant long-life mechanisms and seals | 2–5 | 6 | 5–6 | project-ending | 0B | diverge |
| T25 | Target-local and SEL1 cargo-node navigation and control | 2–4 | 6 | 4–6 | project-ending | 0B | agree |
| T26 | Deep-space communications and resilient command service | 3 (4 cond.) | 6 | 4 | architecture-change | 0A | ruled |

## Sources

- Baseline: `reconciliation/phase-0/trl/round-1/trl-baseline.yaml`
- Per-technology syntheses: `reconciliation/phase-0/trl/round-1/assess/synthesis/T01.md` … `T26.md`
- Owner ruling on T26: `reconciliation/phase-0/trl/rulings.yaml` (rq-0-64)
- Site: /analysis/technology-readiness
