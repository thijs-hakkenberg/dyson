---
phase: phase-0
item: bom-0-1
round: 1
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
generated: 2026-10-11T23:10:08.796Z
---

# Reconciliation: bom-0-1 Prospecting Satellites (phase-0, round 1)

**Attribution convention.** Models are named by their response headers: **Claude Opus 5.5**, **Gemini 3.8 Flash** and **GPT-6.1 Sol**. Each response's YAML `model:` field reports a different identity (claude-opus-4-7, claude-opus-4-6 and GPT-5.2 respectively). See the Reviewer note.

---

## 1. Verdict matrix

| Finding | Claude Opus 5.5 | Gemini 3.8 Flash | GPT-6.1 Sol |
|---|---|---|---|
| **P0-F06**: 20 asteroids/sat/yr unreachable by a 100 kg craft | agree | agree | **partly** |
| **P0-F16**: Consensus documents disagree with BOM | agree | agree | agree (with evidence limitation) |

**Where the panel stands**

- **P0-F06.** All three models agree that 20 rendezvous per spacecraft per year is impossible. They also agree the rate should be removed and the mission redefined as close characterisation of pre-selected targets.
  - GPT-6.1 Sol dissents only on the framing. It argues that spacecraft mass alone does not cap observations. In its view, 20 remote observations or selected low-Δv flybys could be feasible, and the binding limits are mission mode, launch, propulsion, trajectory and observing requirements.
  - Claude Opus 5.5 holds that flyby tours are geometry-limited to about 0.5–1.5 encounters per year. It considers remote survey by a 10–20 cm aperture inferior to ground facilities and duplicative of NEO Surveyor.
  - Gemini 3.8 Flash says remote observation of "tens to hundreds" per year is possible. It adds that remote observation cannot deliver the resolved mapping or gravity data that bom-0-2 needs.
- **P0-F16.** All three confirm the 32-unit/$160M BOM versus 50-unit/$250M consensus discrepancy. They disagree on what becomes authoritative afterwards (see §3.9).
  - GPT-6.1 Sol notes it could not see the current transport, ISPP or newer specifications. It therefore confirms the reported inconsistency but cannot regenerate those consensus documents.

---

## 2. Agreed changes

These are changes all three models support, at least directionally. Where values differ, the consolidated figure is the envelope of the three positions, not a choice between them.

| Change | Consolidated value / range | Support |
|---|---|---|
| Remove "20+ asteroids/sat/yr" as a requirement | Rate replaced by per-mission target count. Rendezvous rate across the three: 0.15–0.6 targets/sat/yr | All three. Claude 0.3–0.6/yr; Gemini 0.15–0.4/yr; GPT 1 rendezvous per 3–5 yr primary mission, 1–2 over life |
| Redefine mission | In-situ characterisation of a shortlist pre-screened by external surveys (NEO Surveyor, ground facilities), not population discovery | All three. GPT keeps remote spectra as a separately specified supplementary product |
| Main propulsion | Electric propulsion. Claude and GPT add a separate small system for attitude and proximity operations | All three |
| Increase wet mass above 80–120 kg | 180–200 kg nominal; envelope 150–250 kg | Claude 180 kg (150–250, rendezvous variant); Gemini 180 kg (150–220); GPT 200 kg (150–250) |
| Extend spectrometer beyond 2.5 µm to cover the ~3 µm hydration band | Upper limit of at least ~3.2 µm; proposed upper bound 3.2–4.3 µm | Claude 3.5 µm (3.2–4.3); Gemini 3.6 µm; GPT ~3.2 µm. All cite NIRS3/OVIRS heritage |
| Raise unit cost above $5M | Recurring flight hardware $10–35M per unit across all positions | Claude $27M rendezvous / $15M flyby; Gemini $15M ($12–20M); GPT $10–20M. All judge $5M unsupported by deep-space smallsat heritage |
| Supersede the existing prospecting consensus | Consensus document to be replaced and aligned with a versioned baseline | All three. The content of the replacement differs (§3) |
| Launch / injection services are missing scope | Must be explicitly covered | All three |
| Deep-space ground segment / operations are missing scope | Must be explicitly covered and capacity reserved | All three |
| Target-selection input is missing | Catalogue / screening of accessible candidates required before tasking the fleet | All three. Claude: data-access and ground-telescope programme. Gemini: no funded survey telescope. GPT: target selection and trajectory optimisation |
| Xenon supply does not bind at this fleet scale | Fleet propellant roughly 0.3–1.3 t total; bom-0-4 constraint not inherited | All three. Each notes iodine/krypton as a commonality option with bom-0-4 |
| Zero power draw from bom-0-5 | Self-powered spacecraft arrays | Claude and GPT explicitly. Gemini does not contradict |

**Two-model agreements (not unanimous)**

- **Thermal instrument.** 8–14 µm radiometry or microbolometer in the baseline (Claude, GPT). Gemini does not specify TIR; it proposes micro-LIDAR.
- **Pathfinders.** Reduce the count from 5 (Claude → 2; GPT → 4). Gemini is silent.
- **Contingency.** 25–40 % (Claude) or 25–35 % (GPT). Gemini gives no figure.

---

## 3. Preserved divergences

### 3.1 Fleet size

| Position | Models | Reasoning |
|---|---|---|
| **12 spacecraft** (8 rendezvous + 4 flyby); range 8–20 | Claude Opus 5.5 | Bottom-up from need. Assumes ~15–30 rendezvous characterisations at a 15–30 % hit rate, with 2–4 rendezvous per craft. Confidence low to low–medium |
| **32 spacecraft**; range 24–40 | Gemini 3.8 Flash | Retains the BOM quantity as authoritative. Claims coverage of 30–50 targets at 1–2 per craft. Confidence **high** |
| **16 spacecraft** (4 pathfinders + 12 gated); envelope 8–32 | GPT-6.1 Sol | Gated planning baseline, explicitly "not an optimized result". States neither 32 nor 50 is justified by any supplied target catalogue or trajectory analysis. Confidence low |

### 3.2 Architecture: flyby scouts

- **Claude Opus 5.5.** Mixed fleet with 4 flyby scouts (100 kg, ~1 km/s) for cheaper triage. Claude itself lists an all-rendezvous fleet of 10 as defensible.
- **Gemini 3.8 Flash.** Favours rendezvous. It argues rendezvous with 20–30 prime targets is "technically superior to superficial flybys of 200 targets", while noting that flyby allows 3–5 targets per craft.
- **GPT-6.1 Sol.** Rendezvous primary, with remote and opportunistic flyby as extensions. It reports that some engineers would prefer many low-cost flyby craft, and proposes comparing on cost per validated candidate.

### 3.3 Targets per spacecraft and onboard Δv

| Model | Rendezvous per craft | Onboard Δv |
|---|---|---|
| Claude Opus 5.5 | 2–4 over 7 yr | **6.5 km/s (5–8)**: 180 kg wet, 60 kg propellant, Isp 1,700 s, ~1 kW array |
| Gemini 3.8 Flash | 1–2 over 7 yr | **2.8 km/s (2.2–3.5)**, with ~40 kg Xe/Kr |
| GPT-6.1 Sol | 1 primary; 2nd only with validated trajectory | **2.5 km/s (2–4)**, excluding launch injection, with 20–60 kg propellant |

Claude also proposes trading a larger ~300 kg, ~10 km/s craft visiting 4–5 targets.

### 3.4 Power

- **Claude Opus 5.5:** 1.0 kW BOL (0.8–1.5).
- **GPT-6.1 Sol:** 1.5 kW BOL at 1 AU (1–2). GPT notes this degrades to ~0.44–0.89 kW at 1.5 AU, so a constant 1 kW thruster operating point cannot be assumed.
- **Gemini 3.8 Flash:** 200–400 W EP input. No array figure.

### 3.5 Payload

- **Spectral upper limit.** 3.2 µm (GPT), 3.5 µm (Claude) or 3.6 µm (Gemini). GPT suggests a dedicated hydration channel may be cheaper than continuous coverage.
- **GRNS, 3–6 kg, rendezvous variant only.** Claude only, for hydrogen and water.
- **Micro-LIDAR.** Gemini only.
- **Limits of remote spectra.** GPT states that surface hydration is not equivalent to extractable bulk water. It also states that no proposed payload establishes ore grade or excavation performance.

### 3.6 Cost: scope and totals

| Model | Line content | Total |
|---|---|---|
| Claude Opus 5.5 | Hardware + NRE only ($115M NRE). Launch ($60–180M) and ops ($85–170M) as separate phase-wide lines | Line $395M ($280–510M); lifecycle ≈ $0.65B ($0.45–0.9B) |
| Gemini 3.8 Flash | Flyaway unit cost × 32 | $480M. Gemini itself notes heritage of $30–60M/unit with NRE amortised, and that $15M assumes aggressive batch manufacturing |
| GPT-6.1 Sol | Full programme: development, hardware, launch, ops, 25–35 % reserve | $0.45–1.0B. Warns against double counting if launch and ops become separate lines. Notes the phase BOM rises from $15.71B to ~$16.0–16.6B |

### 3.7 Mission timing and gating

- **Claude Opus 5.5.** Prospecting should gate commitment to bom-0-2, 0-3 and 0-6, implying a 3–5 year schedule gate that is absent from the phase plan.
- **GPT-6.1 Sol.**
  - Gates production units on pathfinder results.
  - Requires resource ground truth (sampling or extraction tests) before committing the mining, processing and transport assets.
  - Proposes a 3–5 year primary mission and retains the 7-year design goal.
- **Gemini 3.8 Flash.** No gating position.

### 3.8 Data and communications

| Model | Data per target | Downlink | Crosslink / relay |
|---|---|---|---|
| Claude Opus 5.5 | 5–20 GB | 5–20 kbps; 4–10 antenna-h/craft/week | Optional relay/beacon role for bom-0-4 |
| Gemini 3.8 Flash | 50–200 GB in text; 100 GB in YAML | 50–250 kbps X/Ka | Crosslinks/autonomy "heavily prioritized"; beacon/relay for bom-0-2 |
| GPT-6.1 Sol | 0.1–2 GB | 1–20 kbps; ~450 antenna-h/month for 16 craft | Mesh **not** a default; crosslink geometry may outweigh benefit |

### 3.9 Authority after P0-F16

- **Claude Opus 5.5.** This re-assessment should be authoritative for the BOM line. Regenerate the consensus, including the claude-opus-4-6 spec.
- **Gemini 3.8 Flash.** The current BOM table (32 units) should be the authoritative quantity baseline.
- **GPT-6.1 Sol.** A newer model version is not automatically more authoritative; configuration-controlled requirements and evidence should govern. Transport and ISPP should be reconciled independently.

### 3.10 Confidence

- **Gemini 3.8 Flash:** high confidence on fleet size, wet mass, dry mass, propulsion and encounter rate.
- **Claude Opus 5.5 and GPT-6.1 Sol:** low or low–medium confidence on fleet size and cost, and medium on most physical parameters.

---

## 4. Proposed BOM delta

**All entries below are proposals for human review. None is adopted.**

| # | Action | Item | Supporting model(s) | Quantity | Unit-cost range | Confidence (as stated) |
|---|---|---|---|---|---|---|
| 1a | resize | bom-0-1 | Claude Opus 5.5 | 12 (8 rendezvous + 4 flyby) | $23–42M (includes amortised NRE; hardware + NRE only) | low |
| 1b | resize | bom-0-1 | Gemini 3.8 Flash | 32 | $12–20M (flyaway) | medium (cost) / high (quantity) |
| 1c | resize | bom-0-1 | GPT-6.1 Sol | 16 (4 pathfinders; remainder gated) | $28.1–62.5M (full programme incl. launch, ops, reserve) | low |
| 2 | split (implicit) | bom-0-1 into rendezvous and flyby variants on a common bus | Claude Opus 5.5 | 8 + 4 | $18–35M / $10–20M recurring | low |
| 3 | add | Launch services (phase-wide or bom-0-1 share) | Claude Opus 5.5 (separate line). GPT-6.1 Sol (combined work package, already inside its 1c). Gemini 3.8 Flash (identified as missing; no delta) | 1 | Claude $60–180M. GPT $100–250M combined with ground segment | low |
| 4 | add | Mission operations and ground segment (phase-wide) | Claude Opus 5.5 (separate). GPT-6.1 Sol (combined with 3). Gemini 3.8 Flash (missing; no delta) | 1 | Claude $85–170M (7 yr). GPT within the $100–250M above | low |
| 5 | add | Target-screening data and ground observation programme | Claude Opus 5.5. Gemini and GPT identify the need without costing it | 1 | $5–20M | low (judgement) |
| 6 | add | Joint resource ground-truth demonstrator (bom-0-2 / bom-0-6) | GPT-6.1 Sol only | 1 | $50–200M | low (judgement allowance) |
| 7 | track separately | Instrument development (extended VNIR, small GRNS) | Claude Opus 5.5 | n/a | Within Claude's NRE | low |

**Double-counting warning (from GPT-6.1 Sol).** GPT's resize (1c) already contains launch and ground services. If rows 3 and 4 are adopted as separate lines, 1c must be reduced accordingly. Claude's 1a excludes them.

---

## 5. Open questions: what would settle them

| Disagreement | What would settle it | Raised by |
|---|---|---|
| Fleet size (12 / 16 / 32) | Accessibility study over a candidate catalogue (launch windows, Δv, transfer time). Estimate of the screening hit rate (Claude assumes 15–30 %). Defined number of characterised targets required to commit bom-0-2, 0-3 and 0-6 | All three |
| Targets per craft and Δv (2.5 vs 6.5 km/s) | Target-specific multi-rendezvous trajectory analysis with low-thrust duty cycle and solar-distance power derating. Trade of small craft versus ~300 kg / 10 km/s craft on cost per characterised target | Claude, GPT, Gemini (Δv) |
| Flyby scouts vs all-rendezvous | Value-of-information analysis: does flyby data (no GRNS, short dwell) change target ranking? Compare cost per *validated* candidate | Claude, GPT, Gemini |
| Spectral range / hydration channel | Instrument SNR and detection-threshold requirements. Trade of continuous 0.4–3.x µm coverage against a dedicated hydration channel. Laboratory and meteorite calibration | GPT, Claude |
| Whether remote spectra can support the water decision | Defined acceptance threshold linking surface hydration and GRNS hydrogen to recoverable water. Possibly a ground-truth demonstration (GPT) | GPT, Claude |
| Unit cost ($10–35M) | Vendor quotations for deep-space smallsat buses. Pathfinder results demonstrating commercial (<$10M) pricing | Claude, GPT, Gemini |
| Propellant (Xe / Kr / I₂) | Thruster qualification, lifetime, contamination and power trade. Decision on commonality with bom-0-4 | All three |
| Ground-segment capacity | Link budget with actual instrument data volumes (current estimates span 0.1–200 GB/target). Antenna-hour availability and cost | GPT, Claude, Gemini |
| Authority of revised baseline | Programme decision on configuration control. Supply of current transport/ISPP specifications (GPT could not see them) | GPT, Claude, Gemini |
| Schedule gating | Phase-plan analysis of a 3–5 year prospecting gate before procurement of bom-0-2, 0-3 and 0-6 | Claude, GPT |
| Relay / beacon role | Requirement from bom-0-2 / bom-0-4 for navigation and comms support. Crosslink geometry assessment | Gemini, Claude (GPT sceptical) |

---

## Reviewer note

These are consistency observations on the submissions. They are not new technical claims.

1. **Model identity mismatch.** Response headers and YAML `model:` fields disagree for all three responses. Gemini's YAML identifies as `claude-opus-4-6`. The provenance should be confirmed before this round is archived.

2. **Gemini 3.8 Flash internal inconsistencies.**
   - Its Δv row computes 10.6 km/s "theoretical", then adopts 2.8 km/s.
   - The stated 180 kg wet / 110 kg dry implies 70 kg of propellant, not the "40 kg" quoted.
   - Its P0-F06 reasoning gives "≤3.5 km/s" for 2,500 s Isp at a 0.3 propellant fraction. The rocket equation applied to those stated inputs gives a substantially higher figure.
   - 32 craft × 1–2 targets gives 32–64, not the stated 30–50.
   - The bom-0-2 interface is marked `in_bom: true` in YAML but described as omitted in the text.
   - The 32-unit quantity is held at "high" confidence while labelled "judgement".

3. **Claude Opus 5.5 minor inconsistencies.**
   - Fleet-size confidence appears as "low–medium" in the table and "low" in YAML.
   - bom-0-5 appears as "n/a" in the table and `in_bom: true` in YAML.

4. **GPT-6.1 Sol arithmetic** spot-checks consistently with its stated inputs.

5. **Coverage gaps.**
   - No model incorporated spacecraft attrition or launch failure explicitly into fleet sizing. Claude cites the early loss of AstroForge's Odin but does not carry it into the count.
   - No model provided a trajectory analysis against an actual target list. All three acknowledge that fleet size and Δv remain unsupported until one exists.
