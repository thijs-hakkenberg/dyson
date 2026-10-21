---
bomId: "bom-0-17"
itemName: "Contingency and Reserve"
itemSlug: "contingency-reserve"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-21"
phase: "phase-0"
---

# bom-0-17 Contingency and Reserve (0A + 0B): Technical Proposal

**Status:** Round-3 proposal, interim until the cost baseline is frozen.
**Currency:** constant FY2026 USD. Escalation is carried separately and is never included in contingency.

---

## 0. Executive summary

A single contingency percentage per phase is the wrong instrument for this programme. 0A is reversible research. 0B is an irreversible industrial commitment whose cost estimate is presently AACE Class 5 (about −30%/+100%). I propose a **three-layer reserve stack** for each phase:

1. **Project contingency (PC).** Risk-based and bottom-up, held by the project.
2. **Owner reserve (OR).** Held by the owner board, for unknown-unknowns and licensing/policy threats.
3. **Scope reserve.** A pre-agreed descope ladder that is not money, mainly for 0B.

Under D-02 ("stringency follows reversibility"), the **confidence level rises with irreversibility**. 0A is budgeted at P70/P80. 0B is committed at P80/P90 at KDP-0B.

### Headline recommendation

| | 0A (fund now) | 0B: current planning value (Class 5) | 0B: at KDP-0B (Class 3, required) |
|---|---|---|---|
| Base estimate (working assumption, §3) | $6.0B (3.5–9.0) | $19B (10–40) | re-estimated at gate |
| **Project contingency, % of base** | **40%** (35–50) → P70 | **50%** (40–65) → P70 | **35%** (30–40) → P80 |
| **Owner reserve, % of base** | **10%** (8–12) → P80 | **18%** (15–20) → P80 | **14%** (10–15) → P90 |
| Total reserve, % of base | 50% | 68% | ~49% |
| PC, $ | $2.4B (1.2–4.5) | $9.5B (4–26) | ~$6.7B on a $19B base |
| OR, $ | $0.6B (0.3–1.1) | $3.4B (1.5–8) | ~$2.7B on a $19B base |
| **Total contingency + reserve, $** | **$3.0B (1.5–5.6)** | **$12.9B (5.5–34)** | ~$9.4B |
| Scope reserve (descope ladder) | ~10% of base | ~25–35% of base | refreshed at gate |
| Funded schedule reserve | 1 mo/yr pre-I&T, 2 mo/yr I&T, backup target | 6 mo per campaign + one 12-month slip in PC | same |

Combined now: about **$16B (7–40B)** of contingency plus reserve. Only the 0A share, about $3B, is a funding requirement under D-01. The 0B figure is a **planning number that must be carried into the economics gate test**. It is not an appropriation.

### Position on the round-2 figures

- **Gemini (30% / 25%).** I disagree. 25% on 0B is below even the Class 4 upper bound and inverts the risk ordering. 0A retires technology risk, but it does not retire the scale-up, fleet production, remote-industrial integration or operations risks that dominate 0B dollars. 25% is acceptable only on recurring tug units #4 and later, and on array hardware whose price range is already in the base.
- **GPT (30–40% for both).** The 0A band is reasonable. A uniform rate is wrong because it ignores estimate maturity and reversibility. It also gives no basis for converting a percentage into a confidence level.
- **Claude (30–40% / 35–50%).** This is the closest to my position. I raise the 0A floor to 35% because 0A is about 70% NRE and one-off pathfinder hardware, historically the highest-growth category. I split 0B into a current Class 5 figure (40–65%) and an at-gate figure (30–40%). Claude's "$5–27B" mixes PC and OR and both phases. My split totals are 0A $1.5–5.6B and 0B $5.5–34B.

---

## 1. Design philosophy (opinionated)

1. **Contingency is computed, not chosen.** Each percentage is the gap between the base estimate and a stated confidence level on a probabilistic S-curve. The percentages above are outputs of §4–§5, and they will be recomputed at each gate.
2. **Confidence follows reversibility (D-02).** For 0A, a cost overrun leads to a pause or replan, so P70 committed and P80 total authority are sufficient. For 0B, an overrun after KDP-0B strands MW-class assets in deep space, so commitment is at P80 and total authority at P90.
3. **Contingency does not fund project-ending outcomes.** If microgravity Fe-Ni metallurgy fails, the response is a gate decision to activate the Earth-supplied fallback. It is not a reserve draw. Sizing reserve to cover a kill-or-pivot event would produce a meaninglessly large number and would hide the real decision.
4. **No hidden contingency, no double counting.** Base estimates must be most-likely values. Separate lines already exist for:
   - spares (bom-0-14),
   - capacity headroom (bom-0-3/0-4, the ~1.33 capacity/contract ratio),
   - the $30–150/W array price range (bom-0-5).

   Contingency must not re-pad these. Any item found carrying "management margin" in its base has it stripped out and moved here.
5. **Separate threats from variance.** Changes outside project control go to OR, not PC. Examples are the ALARP number under D-03, the licensing state, D-04/D-05 re-decisions and launch-market collapse.
6. **For a non-profit, unfunded contingency is fiction.** PC must be cash or legally callable pledges before the work it covers starts (§11).
7. **No rollover from 0A to 0B.** Unused 0A PC returns to the owner. Carrying it forward would bias the KDP-0B decision.
8. **Contingency is measured against one frozen, configuration-controlled baseline.** It is meaningless against a moving or superseded document set.

---

## 2. Reserve architecture

```
             BUDGET AUTHORITY (per phase)
 ┌───────────────────────────────────────────────┐
 │  OWNER RESERVE (OR)        held: Owner Board  │  ← unknown-unknowns,
 │  0A +10% → P80 | 0B +14–18% → P80/P90         │    licensing/ALARP, policy
 ├───────────────────────────────────────────────┤
 │  PROJECT CONTINGENCY (PC)  held: Programme Mgr│  ← risk register variance,
 │  0A +40% → P70 | 0B +50% now → +35% at gate   │    estimating uncertainty,
 │  (includes funded schedule slip)              │    integration, one slip
 ├───────────────────────────────────────────────┤
 │  BASE ESTIMATE (BE) – most-likely, no padding │  ← sum of bom-0-1…0-16
 │  incl. spares, capacity headroom per items    │
 └───────────────────────────────────────────────┘
   + SCOPE RESERVE (descope ladder, not money)    ← pre-agreed deletions
   + TECHNICAL MARGINS (mass/power/Δv/life)       ← physical, owned by items
   + SCHEDULE RESERVE (months, windows)           ← costed inside PC
   (ESCALATION: separate line, not reserve)
```

**Release authority**

| Layer | Who draws | Single-draw limit | Conditions |
|---|---|---|---|
| PC | Programme Manager | ≤$10M (0A), ≤$25M (0B) | Must cite a risk-register ID; ≤25% of annual PC allocation without board review |
| PC | Programme Change Board | ≤$100M (0A), ≤$250M (0B) | Above PM limit, or any draw that changes an interface |
| PC (above board limit) / any OR | Owner Board | none | Any requirement change; any OR use; any draw that drops RCR below 1.0 (§10) |

---

## 3. Base estimate used for reserve sizing (working assumption)

These are **my working values for sizing reserve only**. The owning items set the authoritative numbers. Reserve is recomputed automatically when they change.

### 0A base (point ≈ $6.0B, range $3.5–9.0B)

| Item | Base point ($B) | Range ($B) | Note |
|---|---|---|---|
| bom-0-1 Remote survey + 4–6 EP scouts | 0.80 | 0.4–1.2 | 200–600 kg scouts |
| bom-0-11 NRE, ground R&D, qualification (0A share) | 2.00 | 1.2–3.0 | TRL 4–5 internal, TRL 6 for KDP-0B items |
| bom-0-12 Pathfinder demonstrator | 2.00 | 1.0–3.0 | |
| bom-0-8 Launch (0A) | 0.40 | 0.2–0.8 | |
| bom-0-9 Comms/ground (0A) | 0.20 | 0.1–0.4 | DSN not free |
| bom-0-10 Mission ops (0A) | 0.20 | 0.1–0.3 | |
| bom-0-7 Organisation (0A share) | 0.10 | 0.06–0.15 | |
| bom-0-14 Spares (0A) | 0.15 | 0.1–0.3 | |
| bom-0-15 Debris/contamination (0A) | 0.05 | 0.03–0.1 | |
| bom-0-16 EP propellant (0A) | 0.03 | 0.01–0.05 | iodine reference case |
| bom-0-13 Receiving node (0A study) | 0.05 | 0.03–0.1 | |
| **Total** | **~6.0** | **3.5–9.0** | Range ends are not arithmetic sums |

### 0B base (point ≈ $19B, range $10–40B)

| Item | Base point ($B) | Range ($B) |
|---|---|---|
| bom-0-4 Tugs (14 × ~$330M avg; 10–18 × $200–500M) | 4.6 | 2.5–9 |
| bom-0-3 Processing plant at NEA | 3.0 | 1.5–5 |
| bom-0-8 Launch (0B) | 3.5 | 1.2–7.5 |
| bom-0-11 NRE (0B remainder) | 1.5 | 1–3 |
| bom-0-2 Mining robots | 1.0 | 0.5–2 |
| bom-0-13 Receiving node (SEL1) | 1.0 | 0.5–2 |
| bom-0-14 Spares (0B) | 1.0 | 0.5–2 |
| bom-0-16 EP propellant (0B) | 1.0 | 0.5–3 |
| bom-0-10 Ops (0B, ~10 yr) | 0.8 | 0.4–1.2 |
| bom-0-5 Site power + 0.5–15 MWh storage + radiators | 0.6 | 0.2–0.9 |
| bom-0-9 Comms/ground (0B) | 0.5 | 0.3–0.8 |
| bom-0-6 Water pilot (conditional, C-type only) | 0.4 | 0.2–0.8 |
| bom-0-7 Organisation (0B share) | 0.15 | 0.1–0.2 |
| bom-0-15 Debris/contamination (0B) | 0.12 | 0.05–0.2 |
| **Total** | **~19.2** | **10–40** |

These numbers imply a fully loaded 0B cost of the order of $2–3M per delivered kilogram over ~10 years at ~1.3 kt/yr. Two consequences follow:

- This is why D-01 frames Phase 0 as a capability programme.
- It is also why **the economics gate must compare 0B with contingency against the Earth-supplied fallback with its own contingency**. I recommend 20–25% for the fallback, since it uses launch and commodity metal with mature estimates. Comparing a padded fallback against an unpadded 0B, or the reverse, would corrupt the gate.

---

## 4. Element-level contingency rates and basis

### Rating basis

- **TRL/AD²**, using the D-02 scores per critical technology.
- **Heritage:** new, modified or recurring.
- **Estimate class:** AACE 18R-97 analogue.
- **Primary cost driver.**

### 0A

| Element | TRL now | Rate | Contingency ($B) | Basis / driver |
|---|---|---|---|---|
| Scouts + remote survey | 5–6 (EP bus heritage) | 35% | 0.28 | Small EP spacecraft have heritage; driver is target-specific instruments |
| NRE / qualification | 3–5 | 40% | 0.80 | Microgravity metallurgy tests; MW EP life tests; tether HV |
| Pathfinder | 3–4 | 45% | 0.90 | First-of-kind integration; highest historical growth class |
| Launch | 9 | 25% | 0.10 | Market price and manifest risk |
| Comms/ground | 7–9 | 30% | 0.06 | DSN pricing/aperture-hour availability |
| Ops | n/a | 35% | 0.07 | Duration-driven; follows schedule |
| Organisation | n/a | 20% | 0.02 | Staffing rates |
| Spares | n/a | 40% | 0.06 | Failure-rate uncertainty |
| Debris/contamination | 2–4 | 60% | 0.03 | ALARP threshold undefined (D-03) |
| EP propellant | n/a | 50% | 0.015 | Iodine supply audit pending (D-05) |
| Receiving-node study | n/a | 40% | 0.02 | |
| **Sum** | | **39%** | **2.36** | + ~1–3% integration adder → **40%** |

### 0B (current, Class 5)

| Element | Rate | Contingency ($B) | Basis / driver |
|---|---|---|---|
| Tugs | 35% blended (unit 1: 50%, 2–3: 35%, 4+: 25%) | 1.61 | MW EP, 1–2.5 MWe arrays; learning 85–90% |
| Processing plant | 65% | 1.95 | Scale-up from pathfinder; TRL 6 only at gate; remote maintenance |
| Launch | 30% | 1.05 | Heavy-lift reusability and price ($/kg) |
| NRE (0B) | 45% | 0.68 | Production qualification of tugs/plant |
| Mining robots | 50% | 0.50 | Regolith/boulder mechanics on low-g target; tether reliability |
| Receiving node | 40% | 0.40 | Phase 1 interface still moving (D-04 re-decided at gate) |
| Spares | 45% | 0.45 | Remote-site MTBF unknown |
| EP propellant | 45% | 0.45 | Iodine vs argon, plus launch of propellant |
| Water pilot (conditional) | 75% | 0.30 | TRL 2–3; only activated if C-type confirmed |
| Ops | 35% | 0.28 | 10-year standing army |
| Site power | 30% | 0.18 | Base already uses most-likely $/W |
| Comms/ground | 30% | 0.15 | |
| Debris | 60% | 0.07 | Licensing state unknown |
| Organisation | 20% | 0.03 | |
| **Sum** | **42%** | **8.10** | |
| **Systemic adder** | **+8% (5–15)** | +1.5 | See below |
| **Total 0B PC** | **50%** | **~9.5** | |

The systemic adder covers four things:
- integration of seven remotely operated element types,
- light-time up to ~15 min one-way with no crew intervention,
- correlated common-cause risks (launch price, metallurgy yield, schedule), and
- one funded 12-month slip of the initial deployment, at a standing-army cost of ~$0.7B.

**Correlation.** Element-level P70 deltas are summed rather than combined statistically. Summation overstates the total if risks are independent and understates it under strong positive correlation. Common-cause drivers dominate this programme, so I use summation plus the adder as the planning method. From SRR onward this is replaced by a Monte Carlo cost-risk model with an assumed inter-element correlation of ρ ≈ 0.3–0.5, the commonly used default range when data are absent.

---

## 5. Probabilistic basis: percentages to confidence levels

I model the cost ratio (actual/base) as lognormal, with parameters chosen from estimate class and first-of-kind cost-growth history. Analogues are major NASA science and exploration projects; JWST and MSR are outliers several times above the original estimate.

| Case | Median ratio | σ(ln) | P50 | P70 | P80 | P90 |
|---|---|---|---|---|---|---|
| 0A (Class 4–5) | 1.22 | 0.25 | +22% | **+39%** | **+51%** | +68% |
| 0B now (Class 5) | 1.25 | 0.35 | +25% | **+50%** | **+68%** | +96% |
| 0B at KDP-0B (Class 3) | 1.15 | 0.20 | +15% | +30% | **+36%** | **+49%** |

```
 Cumulative probability (0B now vs at gate)
 1.0 |                                  ......----------- at gate
     |                           ..---''      .....------ now
 0.9 |- - - - - - - - - - - -.-'- - - - - -.-'            P90
 0.8 |- - - - - - - - - - .'- - - - - - -.'               P80
 0.7 |- - - - - - - - - .'- - - - - - .-'                 P70
     |              .-'         ..-'
 0.5 |          .-'        ..-''
     |      ..-'      ..-''
 0.0 +----+----+----+----+----+----+----+----+----→ cost/base
     1.0  1.1  1.2  1.3  1.4  1.5  1.6  1.7  1.8  2.0
```

The bottom-up results from §4 (0A: 40%, 0B: 50%) agree with the top-down P70 values. That agreement is the "basis" the accepted scope asks for.

**KDP-0B entry criterion (proposed).** At KDP-0B:
- the 0B base plus PC must achieve a joint cost-and-schedule confidence (JCL) of ≥80% on an independently estimated Class 3 basis, and
- base plus PC plus OR must achieve ≥90%.

If that requires PC above 45%, it indicates insufficient risk retirement in 0A. The gate should then fail or re-scope rather than pile on reserve.

---

## 6. Where I disagree with round-2, and why

| Model | Round-2 | My view | Reason |
|---|---|---|---|
| Gemini | 0A 30%, 0B 25% | 0A 40%, 0B 50% now / 35% at gate | 25% sits at the Class 3 upper bound for a Class 5 estimate. 0B's largest elements (plant, tug fleet, launch) carry scale-up and production risk that 0A does not retire. A lower 0B rate is defensible only after 0A delivers TRL 6 and a Class 3 estimate, and even then P80 lands near 35%. |
| GPT | 30–40% both | Split by phase and by time | A uniform rate ignores reversibility (D-02) and maturity. 30% for 0A would be below my bottom-up 39%. |
| Claude | 30–40% / 35–50%, $5–27B | 0A 35–50% (point 40); 0B 40–65% now, 30–40% at gate | Raise the 0A floor because 0A is NRE- and pathfinder-heavy. Make the 0B number time-dependent. Separate PC from OR in dollars. |
| All | Single % | Three-layer stack plus scope reserve | A single percentage blurs who can spend it and on what. Licensing and ALARP threats (D-03) should not be spendable by the project. |

---

## 7. Schedule reserve

Schedule reserve is costed within PC because slip cost is mostly standing army.

**Window physics drives this.** Low-Δv NEAs sit close to Earth's orbit and so have long synodic periods. At a = 1.1 AU (T = 1.154 yr), S = 1/(1 − 1/T) ≈ **7.5 yr**. At a = 1.3 AU, S ≈ 3.1 yr. Low-thrust EP stretches the launch period by months, not years. A missed window therefore costs far more than "months".

**0A requirements**
- Funded margin: 1 month per year to the start of I&T, 2 months per year during I&T, and at least 3 months at the launch site.
- **Backup target required.** The pathfinder must hold a qualified alternate NEA with a departure opportunity within 24 months of the primary.
- If no alternate exists, PC must include an 18–24-month standing-army slip, about $0.6–0.9B at ~$0.35–0.5B/yr. That is roughly the entire integration adder or more. This makes it cheaper to fund target diversity in bom-0-1.

**0B requirements**
- 6 months of funded margin per deployment campaign.
- One 12-month slip of plant deployment funded in PC (~$0.7B at ~$0.6–1.0B/yr burn).
- In steady state the tug fleet buffers missed departures. A single tug miss costs one batch (~150–300 t) of delayed delivery, not fleet idling. That cost is covered by bom-0-3/0-4 capacity headroom, not by PC.

---

## 8. Technical margin policy (interface requirement)

These margins are owned by the items. bom-0-17 sets them as programme-level policy so that cost contingency is not consumed covering missing physical margin.

| Parameter | SRR | PDR | CDR | At launch / gate | Notes |
|---|---|---|---|---|---|
| Dry-mass growth allowance (new design) | 30% | 20% | 10% | 5% system margin vs launch capability | AIAA S-120A-style categories; modified heritage −10 pts |
| EOL power margin (arrays, site and tug) | 25% | 20% | 15% | 10% | Degradation is modelled separately, not in margin |
| Δv | +10% over computed, plus navigation allowance | same | +5% | +5% | Low-thrust trajectories re-optimised per window |
| Propellant | +5% of load, plus residuals | | | | Iodine/argon per D-05 |
| EP thruster life | ≥2× mission throughput by analysis | | ≥1.5× by test | ≥1.5× demonstrated | Life test is a KDP-0B TRL-6 item |
| Heat rejection (radiators) | +20% capacity | +15% | +10% | +10% | Standard temperature margins on top |
| Comms link | ≥3 dB | | | ≥3 dB | |
| Robot battery (10–50 kWh) | safe-mode ≥ 2× worst-case tether-loss recovery time | | | | |
| Product capacity / contract | ≥1.33 | | | ≥1.33 | Consistent with GPT 0.67–1.33 / 0.6–1.0 |

**Rule:** if a margin falls below its floor, the owning item must restore it by design. It may not draw PC unless the CCB approves a margin-recovery draw tied to a risk ID.

---

## 9. Scope reserve (descope ladder)

The descope ladder is agreed in advance, so decisions under pressure are fast and protect the critical tests.

**0A ladder (~$0.6B, ~10% of base)**
1. Reduce scouts from 6 to 4, keeping at least one per candidate spectral class. Saves ~$0.15–0.25B.
2. Drop secondary pathfinder product-handling demos. Saves ~$0.1–0.3B.
3. Defer the receiving-node study detail. Saves ~$0.03B.

**Untouchable in 0A:** every test needed to bring project-ending technologies to TRL 6 for KDP-0B. These are what 0A exists to buy.

**0B ladder (~$5–6.5B, ~25–35% of base)**
1. Defer the water pilot. Saves $0.4B base plus $0.3B PC; it is already conditional.
2. Reduce the tug fleet from 14 to 10, cutting throughput from ~1.3 to ~0.8 kt/yr. Saves ~$1.3–2B including launch and propellant.
3. Defer the second processing train or capacity expansion. Saves ~$1–1.5B.
4. Reduce the receiving node to minimum product acceptance. Saves ~$0.3–0.5B.
5. Stretch delivery to the 0.6 kt/yr contracted floor. This only works if signed Phase 1 demand allows it; otherwise the demand gate fails.

---

## 10. Control, monitoring and information requirements

For this item, the "control system" is the cost and schedule control loop.

```
  bom-0-1 … bom-0-16 item leads
        │  monthly: EVM (BCWS/BCWP/ACWP), EAC, risk updates
        ▼
  ┌─────────────────────────┐    quarterly     ┌──────────────────┐
  │ Integrated cost-risk    │ ───────────────► │ Programme Change │
  │ model (Monte Carlo/JCL) │                  │ Board            │
  │ tied to FROZEN baseline │ ◄─── risk IDs ── └────────┬─────────┘
  └──────────┬──────────────┘                           │ breaches
             │ annual + every gate                      ▼
             ▼                                   ┌──────────────┐
  Independent Cost Estimate (non-advocate) ────► │ Owner Board  │
                                                 │ (OR, KDPs)   │
                                                 └──────────────┘
```

**Metrics and tripwires**

**PC floor as a fraction of cost-to-go**

| Phase | Floor | Applies until |
|---|---|---|
| 0A | ≥30% | PDR |
| 0A | ≥20% | CDR |
| 0A | ≥10% | launch |
| 0A | ≥5% | through ops |
| 0B | ≥25% | plant CDR |
| 0B | ≥15% | first tug departure |
| 0B | ≥10% | first product delivery |

**Other metrics**

| Metric | Definition | Threshold and response |
|---|---|---|
| Reserve Coverage Ratio (RCR) | PC remaining ÷ (Σ P×I of open risks + residual estimating uncertainty) | <1.0: recovery plan within 30 days. <0.8: Owner Board review and descope-ladder activation |
| Burn index | Fraction of PC consumed ÷ fraction of work complete | >1.3 for 2 consecutive quarters: flag to board |
| CPI / SPI | Earned-value cost and schedule performance indices | <0.90 for 3 months: independent review |

**Data requirements**
- Every item reports against the single frozen baseline.
- Every draw is logged against a risk-register ID.
- The cost model is under configuration control alongside the technical baseline.

The analysts, tools and independent cost estimates (ICEs) cost about $5–15M/yr. That cost sits in **bom-0-7**, not here. This item holds reserve only and has no hardware or staff.

**Operational reserves on spacecraft.** Battery safe-mode, propellant reserve and autonomy fallbacks are specified by the owning items under the §8 policy. bom-0-17 only requires that each item state them.

---

## 11. Funding realism for a non-profit

- **PC must be committed before it is needed.** Before authority to proceed (ATP) on any 0A sub-project, its base plus PC for the next 24 months must be in cash or in legally callable pledges with a call period of 12 months or less.
- **OR liquidity.**
  - 0A: at least 50% of OR liquid at pathfinder CDR.
  - 0B: at least 50% of OR liquid at KDP-0B, with the remainder in committed facilities.
- **In-kind contributions** (donated launches, hardware) carry a default-risk contingency of 30–50% of declared value, or a contractual backstop. A donor walking away is a common non-profit failure mode.
- **Funding-profile risk.** A stretched funding profile raises total cost through standing army. The cost-risk model must include a funding-shortfall scenario, and the Owner Board must treat donor shortfall as an OR threat.
- **Escalation is a separate line.** Over a ~20-year span at 2.5–3.5%/yr, escalation alone adds roughly 40–60% in then-year dollars. Merging it with contingency would make the reserve look consumed when it is not.

---

## 12. Manufacturing and production considerations

**Tug fleet learning**
- Assume an 85–90% learning curve.
- Contingency is applied by unit: unit 1 at 50%, units 2–3 at 35%, unit 4 and later at 25%.
- If unit 1's actual cost exceeds its base by more than 50%, the recurring-unit contingency is re-estimated, not simply drawn.

**Array pricing**
- The base uses the most-likely value, about $75/W hardware.
- PC covers up to about $100/W (P70).
- Prices above about $110/W trigger an OR threat review, because they indicate a market regime change rather than variance.

**Supply chain**
- Iodine is the reference case under D-05. Its contingency covers price and qualified-supplier risk.
- Switching to argon is a configuration change. It is reviewed by the board, not absorbed silently.
- Contingency also covers launch-manifest concentration risk. If only one heavy-lift provider is available, the launch PC rate rises from 30% to 40%.

**Production-rate risk.** If tugs must be built at more than 2 per year to meet 0B dates, an extra 5% is applied to the tug line for the parallel tooling and test stands.

---

## 13. Roadmap for estimate maturity (dates are assumptions)

| When | Milestone | Estimate class | Reserve action |
|---|---|---|---|
| 2026 Q4 | Adopt this policy (interim) | 5 | 0A 40% + 10%; 0B planning 50% + 18% |
| 2027 | 0A SRR | 4 | First Monte Carlo cost-risk model; recompute 0A PC; target range 35–45% |
| 2028–29 | Pathfinder PDR | 3–4 | JCL ≥70% at committed budget; ICE |
| Annual | Update | | Recalibrate 0B planning figure; feed economics gate |
| ~2032–34 | KDP-0B preparation | 3 for 0B | 0B Class 3 estimate; JCL ≥80% (PC) and ≥90% (PC + OR); ICE plus SRB |
| KDP-0B | Gate | | Set 0B PC (expected 30–40%) and OR (10–15%); return unused 0A PC |
| 0B CDRs | | 2 | Floors per §10 |

---

## 14. Interfaces

| Item | What bom-0-17 needs from it | What it gets from bom-0-17 |
|---|---|---|
| bom-0-1 … bom-0-6, 0-12, 0-13 | Most-likely base, TRL/AD², risk register, EVM | Element contingency rate, margin floors |
| bom-0-7 | Cost-risk analysts, tools, ICE staff | Reserve governance charter |
| bom-0-8 | $/kg range, manifest | 25–40% launch rate, linked to provider diversity |
| bom-0-9/0-10 | Burn rates (standing army) | Funded slip allowance |
| bom-0-11 | KDP-0B TRL-6 list | Protection from descope |
| bom-0-14 | Spares quantities (no contingency in base) | 40–45% rate |
| bom-0-15 | Scope assumptions under interim ALARP ceiling | Licensing threats routed to OR |
| bom-0-16 | Iodine reference case, argon alternate | 45–50% rate; propellant change goes to the board |

---

## 15. Risk assessment (drivers of the reserve itself)

| Risk | Likelihood | Impact | Treatment |
|---|---|---|---|
| Microgravity Fe-Ni processing underperforms, but not fatally (yield or rate 50–80% of plan) | Med-High | High | PC (plant 65%) plus descope ladder; capacity headroom |
| Metallurgy fails outright | Med | Project-ending for 0B | **Gate decision → Earth-supplied fallback; not reserve** |
| MW EP lifetime short | Med | High | TRL-6 life test before KDP-0B; tug PC |
| Launch price stays high, or reusable heavy-lift is delayed | Med | High | 30% launch PC; above about 2× base → OR / re-scope |
| ALARP number or licensing regime tighter than interim (D-03) | Med | Med-High | OR; debris line 60% |
| Window miss with no alternate target | Low-Med | High ($0.6–0.9B) | Backup-target requirement |
| Donor or pledge shortfall stretches profile | Med | Med-High | Committed-funds rule, OR, funding scenario in model |
| Base estimates contain hidden padding, or are optimistic | High | Med | ICE; padding audit; reserve recomputed on frozen baseline |
| Contingency treated as a slush fund | Med | Med | Risk-ID-linked draws, RCR, release limits |
| D-04 (SEL1) re-decided at gate | Med | Med | Receiving-node 40% PC; major change → OR |

---

## 16. Open engineering and programmatic questions

1. What correlation should the cost-risk model assume for common-cause drivers: 0.3 or 0.5? The choice shifts 0B P80 by an estimated 5–8 points. It needs sensitivity runs before SRR.
2. Should 0B be committed at P80 or P85? I recommend P80 with OR to P90. The Owner Board should confirm, given that D-02 ties stringency to reversibility.
3. What is the fallback comparator's contingency? I propose 20–25%. This must be agreed before the economics gate, or the comparison is unsound.
4. How should in-kind contributions be valued and carried: with a backstop, or with a 30–50% default reserve?
5. Should OR be held as cash, as callable pledges, or as a mix?
6. Iodine supply audit: if one supplier controls more than 50% of qualified supply, should propellant PC rise from 45% to 60%?
7. What is the real DSN or commercial ground-station pricing? It could move comms/ground PC by ±10 points.
8. Is a backup NEA with a ≤24-month window achievable for the pathfinder? If not, the integration adder rises by about 10–15% of 0A base.

---

## 17. Specification block

```yaml
bom-0-17:
  name: Contingency and Reserve (0A + 0B)
  currency: FY2026 USD constant; escalation separate
  basis: bottom-up element rates (TRL/AD2, heritage, AACE class) + lognormal top-down check
  0A:
    base_working_assumption_B: 6.0   # range 3.5–9.0
    project_contingency_pct: 40      # range 35–50; = P70
    owner_reserve_pct: 10            # range 8–12; total to P80
    total_reserve_B: 3.0             # range 1.5–5.6
    schedule_reserve: "1 mo/yr pre-I&T, 2 mo/yr I&T, >=3 mo at launch site; backup NEA <=24 mo"
    scope_reserve_pct_of_base: ~10
  0B:
    status: planning value only (not funded, D-01)
    base_working_assumption_B: 19    # range 10–40
    now_class5:
      project_contingency_pct: 50    # range 40–65; = P70 (42 bottom-up + 8 systemic)
      owner_reserve_pct: 18          # range 15–20; to P80
      total_reserve_B: 12.9          # range 5.5–34
    at_KDP_0B_class3:
      project_contingency_pct: 35    # range 30–40; = P80 (JCL >= 80% required)
      owner_reserve_pct: 14          # range 10–15; to P90
    funded_slip: "12 months initial deployment (~$0.7B) inside PC"
    scope_reserve_pct_of_base: 25-35
  rules:
    - no contingency in item base estimates
    - project-ending outcomes handled by gates, not reserve
    - licensing/policy/ALARP threats -> owner reserve
    - no rollover of unused 0A PC to 0B
    - PC committed (cash/callable pledge) before ATP
    - fallback comparator carries 20–25% contingency at economics gate
  confidence: medium (method); low (absolute $ until baseline frozen)
```