---
phase: phase-0
item: bom-0-7
round: 2
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
framework: 18f503fe4ec6
generated: 2026-10-12T10:26:21.628Z
---

# Reconciliation: bom-0-7 Organizational Infrastructure (Phase 0, Round 2)

**Panel:** Claude Opus 5.5 ("Claude"), Gemini 3.8 Flash ("Gemini"), GPT-6.1 Sol ("GPT").

**Rapporteur's role:** This document consolidates and attributes the panel's positions. It does not decide between them. Arithmetic was re-checked where models showed working. Discrepancies found are reported in the text and in the Reviewer note; they are not corrected silently.

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F13**: Organizational infrastructure has no specification | agree | agree | agree |
| **P0-F15**: Eight of nine concluded deliberations not written back | partly | agree | partly |

**P0-F13.** The panel agrees unanimously that the gap is real. The models differ on how to label its severity:

- **Claude** proposes a split label: "major (schedule) / minor (cost)."
- **Gemini** calls it a "major blocker."
- **GPT** rates it "major for the hardware-development phase; minor only for a discussion community."

**P0-F15.** All three agree that rq-0-29 has not been written back into bom-0-7.

- **Claude and GPT** say they cannot verify the repository-wide "eight of nine" count. Both say write-back must be adapted or dispositioned, not copied verbatim.
- **Gemini** accepts the count and proposes adding compliance lines directly.

---

## 2. Agreed changes

These are specification changes that all three models support, explicitly or by direct equivalent.

| Change | Consolidated value / range | Support and notes |
|---|---|---|
| **Legal architecture** | **2 entities (range 2–3)**: a governance association (Swiss Verein) plus a separately accountable operating / licence-holding entity | All three. Claude names Luxembourg or the US as lead candidates. Gemini names a Luxembourg S.A. or a US C-Corp/PBC. GPT treats Swiss as provisional and would choose the operator jurisdiction only after a comparison. |
| **Orbital allocation for bom-0-7** | **0 t/yr mass, 0 MW orbital power, 0 t/yr propellant** | All three, high confidence. |
| **Terrestrial power** | **0.01–0.05 MW**, not drawn from bom-0-5 | Claude (interface), Gemini (0.02 MW, range 0.01–0.05), GPT (0.01–0.05 MW). |
| **PM/SE/MA excluded from bom-0-7** | Exclusion | All three. Claude: placing it here "would mix governance with execution." Gemini: it "breaks standard aerospace WBS." GPT: it is separate scope with its own owner. |
| **Endowment / liquidity treated as financing, not expenditure** | Shown as a separate line | All three. Sizing differs; see §3. |
| **Functions added to bom-0-7 from other deliberations** | Resource-rights legal work (rq-0-14), independent safety authority (rq-0-18), independent cost-estimate review (rq-0-28) | All three. Claude sizes these at $3–10M one-time plus 1–2 FTE for resource rights, and 1–2 FTE each for the two review functions. GPT includes them within its staffing allowance. Gemini adds "explicit compliance, legal advisory, and assurance tracking lines." Claude flags that *where* independent review sits is still an open values question (§3). |
| **Use existing open licences, not a bespoke copyleft** | CERN OHL v2 for hardware; Creative Commons for documents | All three. Claude specifies OHL v2-S plus CC BY-SA 4.0 and a restricted export annex. Gemini specifies CERN OHL v2 / CC-BY-SA. GPT says to choose the OHL variant deliberately and use a separately controlled restricted annex. |
| **Archive replication** | **3 independent copies with regular restore testing** | Claude (3 replicas, annual restore test), Gemini ("triple-redundant… continuous restore testing"), GPT (3 independently administered copies, annual restore). Archive *volume* is not agreed; see §3. |
| **Staffing order of magnitude** | Approximately 15 FTE; the ranges all models share are **14–20 FTE** | Claude 18 (14–25), Gemini 15 (10–20), GPT 16 (12–20). The 14–20 overlap is the rapporteur's intersection of the three ranges, not a value any model proposed. |
| **Export classification before publication** | Required | Claude: classify "before publication, not after." GPT: a restricted annex is needed after export review. Gemini raises ITAR/EAR as an open question and as a disconfirmation test for its entity decision. |

The following points have **two-model agreement, with Gemini silent or not explicit**. They are not unanimous:

- Charter Trust becomes a Phase 0 design study only.
- Sortition is used for advisory or oversight panels only.
- Funding caps become disclosed targets with time-limited exceptions.
- Leadership overlap is 3–12 months.
- The initial liquidity target is 1–2 years of opex.
- Phase 0 has an uncrewed baseline.
- A disposition register is kept for every deliberation.
- Programme-scale governance or acceptance gates replace or supplement the 100-contributor / $50K triggers.

Supporting physics checks (Claude and GPT both re-derived these; Gemini did not address them):

- **Rotation for gravity zones:** 1.5–2.6 rpm for 0.05–0.15 g at r = 20 m.
- **Boil-off at 1 kW heat leak:** about 194 kg/day LH₂ or 406 kg/day LOX.
- **Meaning of "25 kt/yr":** if it means hydrogen output, electrolysis alone exceeds the 100 MW phase supply.
  - Claude: 140–190 MW.
  - GPT: 143–171 MW calendar-average.

Both refer this ambiguity to a phase power closure, not to bom-0-7.

---

## 3. Preserved divergences

### 3.1 bom-0-7 cost (10-year equivalent)

| Position | Held by | Reasoning |
|---|---|---|
| **$110M, range $55–200M** (including 20% contingency). Primary form is a run-rate of $9M/yr ($4.4–16.3M) plus $5M one-time ($2–8M). 5-year equivalent: $55M ($29–108M). | Claude | A run-rate removes the 5-year vs 10-year confusion that blocked round 1. Inputs: 14–25 FTE at $200–350k; outside counsel $1–4M/yr; filings $0.1–0.5M/yr; insurance $0.3–2M/yr; IT/archive $0.2–1M/yr. Confidence low. |
| **$120M, range $80–190M**, on a 10-year baseline | Gemini | Bottom-up build: setup $5M; 12–18 FTE at $275k ($40M); external counsel and filings $15M; in-orbit TPL premiums $30M; archive $10M; 20% contingency $20M. Confidence medium. |
| **$65M, range $40–105M** (25% uncertainty allowance; constant 2026 USD) | GPT | Formula C = 1.25[formation + T(N·c + services)], with 12–20 FTE at $180–260k and services of $0.8–2.8M/yr. The ranges are scenario bounds, not a confidence interval. 5-year equivalent: $20–55M. GPT concludes that "$50M could be workable for a narrower five-year scope." Confidence low. |

**Main drivers of the spread:**

- **Inclusion of TPL premiums.** Gemini includes $30M; Claude about $3–20M; GPT excludes premiums.
- **Burdened FTE rate.** The models' rates span $180k to $350k.
- **Contingency.** 20% (Claude, Gemini) versus 25% (GPT).

**Arithmetic checks:**

- Claude's and GPT's working reproduces.
- Gemini's component sum ($120M) reproduces.
- Gemini's staffing figure is internally inconsistent: the text says 12–18 FTE, the parameter table says 10–20.

### 3.2 Costing duration

- **Gemini:** 10 years (range 7–12), high confidence.
- **GPT:** 10 years (sensitivity 5–10), low confidence, "subject to phase approval."
- **Claude:** declines to fix a duration. It states a run-rate and shows both 5-year and 10-year totals.

Claude and GPT both list the 0A/0B phase boundary as an open question.

### 3.3 Severity label for P0-F13

| Position | Held by | Reasoning |
|---|---|---|
| Split label: major (schedule) / minor (cost) | Claude | Cost is 0.3–1.3% of the phase. On schedule, authorization, ITU and planetary-protection work gate every flight item. Under a cost-of-delay (CD3) argument, delay costs about $80–160M per year against a function costing $4–16M per year. The label would be falsified if first launch is scheduled more than 7 years out. |
| Major blocker | Gemini | Hardware procurement "cannot legally execute" without an authorized operating entity. |
| Stage-dependent: major for the hardware phase, minor for a discussion community | GPT | The 0.32% ratio "neither proves inadequacy nor validates adequacy." The real defects are missing scope, duration and allocation. |

### 3.4 Third-party liability (TPL) and insurance placement

| Position | Held by | Reasoning |
|---|---|---|
| In-orbit TPL premiums inside bom-0-7 at **$3–20M over 10 years** (point estimate $8M); retained risk as a separate financing line | Claude | Launch TPL sits under the launch provider's licence. Liability Convention Art. III applies a fault standard in space. Deep-space operations at about 1 AU have "essentially no third parties." Claude judges round-1 figures ($15–120M; $75M reserve) too high. The estimate is reopened if bom-0-4 brings material toward Earth. No broker quote. |
| In-orbit TPL premiums inside bom-0-7 at **$30M (range $15–60M)**; launch MPL wrapped into launch contracts | Gemini | Market capacity is $50–250M of coverage; premiums are estimated for fleet deployment over 10 years. |
| **Only insurance administration** sits in bom-0-7; flight premiums and loss reserves are excluded | GPT | Statutory liability amounts, maximum probable loss, policy limit, premium and funded reserve are distinct quantities. Launch-provider coverage "does not automatically remove all customer exposures." No credible number follows without quotes. |

### 3.5 Archive volume and cost

- **Claude:** governance ingest of 1 TB/yr (0.5–5). Mirrors 10–100 TB/yr of engineering data, which is owned by PM/SE. Storage costs about $72k/yr; labour and testing dominate.
- **Gemini:** 50 TB cumulative over 10 years (20–200), costed at $10M ($5–15M). Also lists a 5–10 TB/yr ground-segment data interface.
- **GPT:** 2–20 TB/yr logical ingest, giving 60–600 TB over 10 years with 3 copies. Excludes raw telemetry. Averages 0.5–5 Mbit/s.

Claude and GPT both reject the round-1 10 Gbit/s backbone. Gemini does not repeat that proposal this round.

### 3.6 Board and Charter Trust parameters

- **Board size:**
  - Claude: 7 (5–9), staggered 3–4-year terms, 8-year service limit.
  - GPT: 5–7, staggered 3-year terms, normally two consecutive terms.
  - Gemini: gives a staggered term of 4 years (3–5), labelled "literature / high confidence." It does not state a board size.
- **Charter Trust:**
  - Claude and GPT: a design study only in Phase 0, established later at a milestone.
  - Gemini: has Entity A maintain "sortition-based Charter Trust studies." However, its preferred Option 2 has the Verein that "sorts trustees." Gemini's open questions call the role, screening and term length (4 vs 15 years) "disputed." Its position on establishing the Trust in Phase 0 is therefore not explicit.
- **Sortition evidence:**
  - Claude and GPT rate it low. The evidence comes from deliberative mini-publics and citizens' assemblies, not asset-holding trusts.
  - Gemini sees risks of "paralysis or capture by permanent staff" and leaves the question open.

### 3.7 Operating-entity jurisdiction

- **Claude:** leans toward Luxembourg (or Japan) because it has a mission-authorization regime for resource activities. The US has resource rights but "an unsettled path" for novel activities. Legal opinion decides.
- **Gemini:** scores the "Luxembourg S.A. / US Corp" bifurcated option highest. It does not choose between the two.
- **GPT:** select only after comparing authorization, liability, tax, funding and export control. High confidence that a selection is needed; low confidence on which state wins.

### 3.8 Swiss space-law status (factual divergence)

- **Claude:** Switzerland has no comprehensive space act in force; a draft is in progress (*verify*).
- **Gemini:** Switzerland "lacks domestic implementing legislation for private off-world resource exploitation." Gemini states this with high confidence.
- **GPT:** "Swiss legal status should not be asserted from stale text"; verify at entity selection.

### 3.9 Crew and 14 CFR Part 460

- **Claude:** the baseline states no crew carriage is authorized in Phase 0. A Part 460 path applies only if crew are ever carried.
- **GPT:** uncrewed baseline. Part 460 "is not a general deep-space human-rating standard." Structural reinforcement should not be called "human-rating."
- **Gemini:** bom-0-7 should "handle crew-flight liability (e.g. 14 CFR 460 / FAA AST)." It does not state an uncrewed baseline.

### 3.10 Planetary protection

- **Claude:** expects COSPAR Category I/II, assessed by a national agency and "not 'filed with COSPAR'."
- **Gemini:** lists "COSPAR Cat II clearance" and "COSPAR notifications" as filings.
- **GPT:** COSPAR policy is "not itself a universal permit." Spectral class alone is insufficient; a mission-specific determination is required.

### 3.11 Placement of independent safety and cost review

- **Claude:** these are values trade-offs.
  - Placing review in bom-0-7 gives independence.
  - Placing it in PM/SE gives integration and speed.
- **GPT:** include it in bom-0-7 staffing, but "distinguish organizational review from detailed engineering assurance."
- **Gemini:** place it in bom-0-7.

### 3.12 Phase split

Claude leans toward separating the volunteer research and governance stage into its own phase, noting that "reasonable people differ." GPT and Gemini raise the 0A/0B and duration boundary but do not take that position.

---

## 4. Proposed BOM delta

**These are proposals for human review. None are adopted.**

| # | Action | Item | Supporting models | Qty | Unit-cost range (USD) | Confidence |
|---|---|---|---|---|---|---|
| D1 | **Resize** | bom-0-7 Organizational infrastructure (10-year equivalent) | All three; ranges differ | 1 | Claude $55–200M; Gemini $80–190M; GPT $40–105M | Claude low; Gemini medium; GPT low |
| D2 | **Split** | Organizational liquidity reserve, as financing not expenditure | Claude, GPT (in YAML). Gemini endorses financing treatment but does not size it. | 1 | Claude $9–30M (1–2 yr opex); GPT $3–16M | Claude medium; GPT low |
| D3 | **Add** | Programme management, systems engineering and mission assurance (PM/SE/MA) | Claude, Gemini (sized). GPT supports the account *or* confirming it is already in prime contracts, and withdraws dollar ranges. | 1 | Claude $1.5–3.5B (10–22% of hardware); Gemini $1.5–2.5B (point estimate $1.8B) | Claude low; Gemini not stated |
| D4 | **Add** | Launch and delivery to operating site | Claude, Gemini (sized). GPT says the scope is required but needs a mass budget first. | 1 | Claude $2–20B (0.9–3.7 kt to LEO); Gemini $1.5–4.0B (point estimate $2.5B; "~100+ tonnes") | Claude low; Gemini not stated |
| D5 | **Add** | Mission operations and ground segment | Claude, Gemini (sized). GPT says the scope is required, unsized. | 1 | Claude $0.5–1.5B; Gemini $0.4–1.0B (point estimate $0.6B) | Claude low; Gemini not stated |
| D6 | **Add** | Risk-retention / self-insurance reserve, as financing | Claude (unsized placeholder). GPT says separate with no number. Gemini raises the backstop as an open question. | 1 | Claude [0, 1.5B], "size only after broker indications" | Low / unsized |

**Notes on the deltas:**

- **Launch mass basis for D4.** Claude's estimate (0.9–3.7 kt, of which the arrays alone are 0.7–1 kt) and Gemini's ("~100+ tonnes") differ by roughly an order of magnitude. Neither is backed by a phase mass budget.
- **TPL premiums.** These are not a separate delta line. They sit inside D1 for Claude ($3–20M) and Gemini ($15–60M), and outside bom-0-7 for GPT; see §3.4.
- **Claude's projected phase total.** If D3–D5 are adopted, Claude projects the phase total at roughly $20–40B rather than $15.7B.
- **GPT's position on prior deltas.** GPT recommends that round-1 deltas B3–B6 be retained as scope decisions, but with their dollar ranges withdrawn.

---

## 5. Open questions and what would settle them

| Question | Raised by | What would settle it |
|---|---|---|
| Do bom-0-1 to bom-0-6 prices already include PM/SE, launch and operations? | All three | A WBS scope dictionary for each item. Claude names this as the falsifier for its cost hypotheses H1–H3 and for D3. GPT uses it as the falsifier for its scope assumption. |
| What is the phase mass budget? | Claude, GPT | A phase mass budget, which is a prerequisite for D4. Claude notes the arrays alone may be 0.7–1 kt. |
| Phase 0 duration and the 0A/0B boundary | All three | An approved phase schedule. For Claude, first launch more than 7 years out would falsify the "major (schedule)" label. |
| Which state authorizes the operator, and can a Verein control it without being treated as the de facto operator or carrying its torts? | All three | Counsel opinions in the candidate states (Claude, Gemini) and regulator engagement (Claude). |
| Does any trajectory bring material toward Earth or cislunar space? | Claude, GPT | The mission profile. Claude says this moves TPL by about 10× or more and changes the planetary-protection outcome. |
| Actual insurance premiums, limits, exclusions and retention needs | All three | Broker indications or quotes; launch contract terms; identity of the FAA licence holder of record (Claude). |
| What does "25 kt/yr" (rq-0-14) measure: water, hydrogen, combined propellant or delivered product? | Claude, GPT | A defined production rate, location and availability, followed by a phase power-allocation closure. |
| Which specifications are ITAR/EAR-controlled, and what restricted annex is needed? | All three | An export classification study before publication. |
| Does evidence support sortition and long terms for asset-holding trusts? | All three | Claude points to the rq-0-29 action-5 persistence study. GPT points to funding-control simulations or a red-team takeover exercise. |
| Are the round-2 legal citations correct (CSLCA, Luxembourg 2017, 51 USC §50915, Swiss draft act, ITAR/EAR categories)? | Claude and GPT flag "verify" | Counsel verification. No model verified them. |
| What do the full deliberation records and repository history show (the "eight of nine" count)? | Claude, GPT | Repository audit. |
| Does Phase 0 include any crewed mission? | GPT, Claude | A baseline decision. Claude and GPT both recommend uncrewed. |
| Will regulators license an entity whose charter mandates copyleft publication, or accept sortition-based oversight? | Gemini | A licence-application or pre-application consultation outcome. |

---

## 6. Decision-quality audit

### 6.1 Mapping of decisions across models

| Topic | Claude | Gemini | GPT |
|---|---|---|---|
| Entity structure and jurisdiction | Decision C (QOC) | Decision 1 (weighted scoring / QOC / Kepner-Tregoe) | Decision A (QOC) |
| bom-0-7 cost and scope | Decision A (ACH) | Decision 2 (partial scaffold) | Decision B (GRADE EtD) |
| Severity of P0-F13 | Decision B (CD3) | — | — |
| Charter Trust, sortition, terms | Decision D (GRADE EtD) | — | Decision C (GRADE EtD, ACH) |
| Insurance and compliance | Decision E | — | Decision D (QOC, assurance case) |
| PM/SE and launch additions | Decision F | (within Decision 2) | (within Decision E and §4) |
| Write-back and disposition | — | — | Decision E (ACH) |
| Archive, succession, reserves | — | — | Decision F (QOC) |

### 6.2 Weakest link named, per decision

| Topic | Claude | Gemini | GPT |
|---|---|---|---|
| Entity / jurisdiction | **Information**: no legal citation verified | **Information**: no precedent for a copyleft entity doing deep-space resource extraction | **Information**: mission jurisdiction and funding sources unknown |
| Cost / scope | **Frame**: round 1 debated numbers before fixing scope and duration | Not stated | **Frame** in the earlier reconciliation; **information** in GPT's own estimate |
| Severity | **Values**: nobody stated what "severity" measures | — | — |
| Trust / sortition | **Information**: evidence quality mislabelled (Gemini's "high, literature") | — | **Information** for the sortition claim; **values** for independence versus fundability |
| Insurance / compliance | **Reasoning**: round 1 treated launch, in-orbit and deep-space liability as one exposure | — | **Information**: targets, flight profiles and contractual allocations absent |
| PM/SE / launch | **Alternatives**: round 1 never considered that launch could exceed hardware cost | — | — |
| Write-back | — | — | **Commitment**: previous reconciliation assigns no approval authority or closure dates |
| Archive / succession | — | — | **Information** on actual records; **commitment** to recurring exercises |

Where models agree:

- On entity structure, all three name **information** as the weakest link.
- On cost and scope, Claude and GPT both name **frame** for round 1.

### 6.3 Scaffold steps found missing or unsupported

**Claude, on round 1:**

- Scope and duration were not fixed before estimating (frame).
- Severity was used without a definition (values).
- Gemini's "high, literature" certainty for sortition and long terms is unsupported and should be **low**.
- The liability exposures were conflated.
- Launch costs were never placed among the alternatives.
- B4 (Claude's round-1 $2–8B launch) is "untraceable."

**GPT, on round 1:**

- Different scopes were compared "as if they were alternative prices for the same product."
- The reserve proposals "lack the warrant connecting risk exposure to dollar value"; the $75M reserve cannot be derived from a $100M liability amount.
- There is an arithmetic error: 20 FTE × $400k × 10 years = **$80M, not $90M**.
- The previous reconciliation identifies omissions without assigning approval authority.

**GPT, on method generally:**

- Legal and safety conditions are "musts," not weighted criteria.
- "A simple weighted score cannot legalize an otherwise infeasible option."
- Its own weights are "illustrative," not measured utilities.
- Its likelihood words are engineering judgement, not measured probabilities; the cost range is "plausible, not 'likely at 90%'."

**Claude, on its own outputs:**

- It gives numeric likelihoods with separate confidence statements. For example, the 10-year cost exceeding $50M is "likely (≈70–85%), confidence medium."
- GPT's caveat about judgement-based likelihoods applies to these figures, but GPT did not target Claude specifically.

**Gemini, on its own outputs:**

- **Decision 1** has a full nine-step scaffold.
- **Decision 2** covers only frame and type plus a trade-off narrative. It has no:
  - criteria weights;
  - matrix;
  - certainty statement;
  - assumption or falsifier;
  - weakest link.

**Rapporteur's arithmetic check of Gemini's Decision 1 matrix:**

| Option | Gemini's total | Recomputed from Gemini's scores and weights |
|---|---|---|
| Option 1 (unitary Verein) | 3.05 | 3.05 (reproduces) |
| Option 2 (bifurcated) | 4.45 | **4.35** |
| Option 3 (distributed consortium) | 3.10 | **3.35** |

The ranking is unchanged.

### 6.4 Divergences reclassified as trade-off or sensitivity points

**Claude:**

- **Cost:** no trade-off point. Duration, FTE rate and insurance inclusion are *sensitivity points*, so the question should be "settled by definition, not debate."
- **Severity:** not a trade-off. One label was being used for two attributes that point in opposite directions.
- **US vs Luxembourg:** a values trade-off between launch and industrial access on one side, and neutrality and authorization clarity on the other.
- **Trust term length:** a values trade-off between capture resistance and accountability or competence drift.
- **Placement of independent review:** a values trade-off between independence and integration.
- **Insurance:** whether any trajectory approaches Earth is the dominant sensitivity point.
- **PM/SE and launch:** the PM/SE percentage (±$1B) and launch $/kg × mass (±$10B) are sensitivity points. Launch is "the dominant sensitivity of the whole phase."

**Gemini:**

- **Entity structure:** "mission openness vs regulatory compliance" is a trade-off point; the two-entity structure is the compromise.
- **Sensitivity point:** whether the charter covenants between Entity A and Entity B are enforceable.

**GPT:**

- **Entity structure:** separation trades direct contributor control for enforceable accountability. The operating jurisdiction is a sensitivity point.
- **Cost:** duration and staffing are sensitivities. Including insurance is "a scope change, not evidence of expensive governance." Assurance versus cost becomes a genuine values trade-off once duties are fixed.
- **Trust:** sortition eligibility rules are a sensitivity point. Two values trade-offs: term length (continuity vs removability) and funding caps (independence vs capital access).
- **Compliance:** two trade-offs: openness vs export restriction, and premium vs funded retention.
- **Write-back:** the meaning of "25 kt/yr" is a major sensitivity. Two trade-offs: early crew accommodation (future flexibility vs current mass), and thermal margins (mass/power vs propellant retention).
- **Archive:** two trade-offs: transparency vs privacy and security, and larger reserves vs technical spending.

**Where the panel converges:**

- Claude and GPT both reclassify the cost disagreement as a scope and duration sensitivity, not a genuine trade-off.
- All three treat the core of the entity decision as a trade-off, though they frame it differently:
  - Claude: neutrality vs access.
  - Gemini: openness vs compliance.
  - GPT: contributor control vs accountability.

---

## Reviewer note

These are observations by the rapporteur, not claims made by the panel.

1. **Model labelling.** Gemini's YAML block gives `model: claude-opus-4-6`, and GPT's gives `OpenAI ChatGPT`. Claude this round also critiques "Claude's $2–8B" and "Claude's $15–120M" from round 1. Attribution of round-1 positions to "Claude" may therefore be ambiguous and should be checked against round-1 records.
2. **Internal inconsistencies to resolve before adoption:**
   - **Gemini's FTE count:** 12–18 in the text versus 10–20 in the table.
   - **Gemini's PM/SE basis:** "10–15%, $1.6–2.4B" in §2, "10–18%, $1.5–2.5B" in §4, and "$1.5–3.0B" in Decision 2.
   - **Gemini's Decision 1 scores:** see §6.3.
   - **Claude's "10–30×" ratio:** the ratio of cost of delay to function cost is about 5–36× across the extremes of Claude's own ranges. It is about 9–18× at the $9M central run-rate.
   - **Claude's YAML "old" values:** council size "5-7" and term "3" are listed as old values, while the specification table lists them as "unspecified."
   - **bom-0-5 power interface flag:** marked `in_bom: true` by Claude and `in_bom: false` by GPT.
3. **Unverified citations.** No model verified any legal citation. Claude and GPT flagged several citations "verify"; Gemini stated comparable claims at high confidence without flags.
4. **Unverified repository count.** No model verified the "eight of nine" write-back count. Gemini agreed with P0-F15 without stating a verification basis.
