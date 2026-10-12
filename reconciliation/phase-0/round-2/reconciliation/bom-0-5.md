---
phase: phase-0
item: bom-0-5
round: 2
type: reconciliation
synthesizer: claude-opus-5-5
panel: [claude-opus-5-5, gemini-3-8-flash, gpt-6-1-sol]
framework: 18f503fe4ec6
generated: 2026-10-12T10:18:37.762Z
---

# Reconciliation: bom-0-5 Solar Power Arrays (Phase 0), Round 2

**Panel and attribution.** In this document, **Claude** means Claude Opus 5.5, **Gemini** means Gemini 3.8 Flash and **GPT** means GPT-6.1 Sol. These are the names in the response headers. The `model:` fields in the YAML blocks do not match those headers:

- Gemini's YAML reads `claude-opus-5.5-engineer`.
- GPT's YAML reads `GPT-5.2`.

This reconciliation attributes by response header. The mismatch should be corrected before records are filed (see Reviewer note).

---

## 1. Verdict matrix

| Finding | Claude | Gemini | GPT |
|---|---|---|---|
| **P0-F03** Station power cannot refine 50 kt/yr | agree | agree | partly |
| **P0-F04** 100 MW with ~5 MW identified load, no site split, storage without night | partly¹ | agree | partly |
| **P0-F05** $5/W far below current prices, excludes launch | agree | agree | agree |

¹ Claude's prose says "agree on site split and storage; partly on '~95 MW has no load'". Its YAML records `partly`.

**Where the panel stands**

- **P0-F03.** All three say a mixed slate that includes reduced Al or Si cannot close at 1–2.5 MW. They split on the finding's absolute wording:
  - Gemini says even pure native-metal melting (~4.4 MW) exceeds 1–2.5 MW.
  - Claude says 1–2.5 MW can melt ~15–40 kt/yr of native metal.
  - GPT says native metal alone needs 1.7–2.9 MW before auxiliaries. On that basis GPT "can approach" the range, so it records `partly`.
- **P0-F04.** All three agree the site split is missing and the 200–500 MWh storage is unjustified at L4/L5. Claude and GPT add that, once F03 is applied, the station absorbs most of the 100 MW. In their view the "~95 MW unassigned" is a documentation and allocation defect, not proof of oversizing. Gemini agrees with the finding without addressing the oversizing question, and also allocates most of the 100 MW to the station.
- **P0-F05.** The panel is unanimous that $5/W is unsupported and that delivery is missing. It is not unanimous on the replacement value.

---

## 2. Agreed changes

These are the changes all three models support. Where they support the direction but differ on numbers, the "consolidated" column gives the **panel span** (lowest to highest value stated) together with each model's central value.

Claude and GPT both warn that a union of model ranges is not an evidence-based uncertainty interval:

- Claude: such a union "hides the fact that a single upstream number dominates every downstream decision".
- GPT: "agreement among models using similar assumptions does not increase the underlying evidence quality".

The spans below should be read in that light.

| # | Change | Claude | Gemini | GPT | Consolidated (panel span) |
|---|---|---|---|---|---|
| A1 | Delete the station's 1–2.5 MW spec. bom-0-5 explicitly supplies the bom-0-3 station. | 45 MW EOL delivered (15–110); ~60 MW BOL (20–170) | 55–68 MW EOL continuous; 75 MW BOL (65–90) | 43 MW average / 49 MW running (35–73 running); 80 MW BOL (60–110), ~54 MW EOL | Central EOL/running 45–~60 MW; span 15–110 MW. Central BOL 60–80 MW; span 20–170 MW |
| A2 | Specify power per site (station plus 4 NEA sites), each self-powered with no inter-site transfer | Explicit ("Every site is self-powered") | Explicit ("localized … power") | Explicit ("assigned locally, not supplied across interplanetary distances") | Agreed in principle. Per-site values diverge (§3, D2) |
| A3 | Delete the 200–500 MWh bulk storage. Replace it with a small station buffer plus per-site storage. Sites currently have 0 MWh. | 5 MWh station (2–10) + 4 × 0.3 MWh (0.1–0.5) ≈ 6.2 MWh | 15 MWh station + 4 × 3 MWh = 27 MWh (18–40) | 4.3 MWh total (2.4–6.4); station 0.8–2, sites 0.4–1.1 each | Total 4.3–27 MWh; span 2.4–40 MWh |
| A4 | Replace $5/W / $500M. Delivery to destination must be costed somewhere. | $70/W all-in (25–450); $40/W hardware (15–300) | $75/W all-in (45–150 in YAML; 45–160 in prose) | $90–410/W all-in package | All-in central $70–~$200/W; span $25–450/W. All three rate confidence below "high" (Claude low, Gemini medium, GPT low) |
| A5 | Set system specific power | 100 W/kg (60–150) | 110 W/kg (90–135), wing level | 100 W/kg (80–150) | Central 100–110 W/kg; span 60–150 |
| A6 | State array mass | 800 t for 80 MW (350–1,900) | 910 t arrays excl. PMAD (750–1,200); ~1,250 t with PMAD and gimbals | ~1,000 t (670–1,250) | Central 800–1,000 t (Gemini 1,250 t including PMAD); span 350–1,900 t |
| A7 | Raise primary distribution above 600 V DC to kV class | 1–3 kV trunk (0.6–5 kV); evaluate direct feed of MRE pot-lines | 2.5 kV (1.5–3.5 kV) | 3 kV candidate (2–5 kV), "a candidate, not qualified heritage" | ~1–3.5 kV central; span 0.6–5 kV. GPT and Claude rate confidence low; Gemini medium |
| A8 | Station heat rejection is missing from the BOM and must be carried | 15–35 MW_th (central ~28) | 45–60 MW_th (~55) | 30–60 MW screening | All agree it is missing. Value span 15–60 MW_th (see D10) |
| A9 | NEA site anchoring and dust mitigation is missing scope | Listed | Listed | Listed | Agreed as missing; not costed by any model |

---

## 3. Preserved divergences

### D1. Station power: values and inputs
The three central values differ (A1) because the models use different inputs:

| Input | Claude | Gemini | GPT |
|---|---|---|---|
| Fe-Ni melt (kWh/kg) | 0.5–1.5 (c_p ~0.65 kJ/kg·K) | ~0.70 (c_p ~0.45 kJ/kg·K) | 0.5–1.0 |
| MRE Al / Si (kWh/kg) | 15–30 each; floors 8.6 / 9.0 from ΔH | 13–20; floor 6–8 from ΔG | Al 15–25; MG-Si 15–30 |
| Solar-grade upgrade | +40–100 | +25–60 | 45–120 including reduction (30–90 for purification) |
| Operating basis | 85% availability, ×1.56 BOL conversion | 8,000 h/yr | 8,760 h with 85% availability; +4–8 MW auxiliaries |
| Reference slate | Three slates (low / central / high) | 70% Fe-Ni, 20% Al/Fe oxide, 10% Si | 40 kt Fe-Ni, 8 kt Al, 2 kt solar-grade Si |

Each model's stated confidence:
- Claude: station allocation low, "slate-driven".
- GPT: low.
- Gemini: "high" in its YAML, "medium" in its table.

### D2. Total nameplate and NEA allocation

| Position | Models | Reasoning |
|---|---|---|
| 80 MW BOL total (50–115 central slate; 30–200 across slates). The total is an output of the per-site requirements, not an input. Includes a 10 MW reserve. | Claude | Station 60 + NEA 10 + reserve 10. None of the fixed totals should be adopted before bom-0-3 publishes a slate. |
| 100 MW (85–120), high confidence | Gemini | 75 MW station + 25 MW NEA |
| 100 MW kept only as a "conditional sizing envelope" (80–130), low confidence; "not a procurement authorization" | GPT | 80 MW station + 20 MW NEA. "70 vs 100 MW: not resolvable without the product slate." |

| NEA allocation | Claude | Gemini | GPT |
|---|---|---|---|
| Per site, BOL | 2.5 MW (1.8–5), day-only | 6.25 MW | 5 MW |
| Aggregate | 10 MW (8–20) | 25 MW (15–30) | 20 MW (12–24) |
| Design distance | 1.5 AU (notes Amor aphelia >2 AU) | Derated to 3.5 MW EOL at 1.35 AU (range 1.1–1.5 AU) | 1.8 MW EOL at 1.3 AU; 1.3 MW at 1.5 AU |

### D3. ISPP load per site

| Position | Models |
|---|---|
| 0.25 MW as specified (yields ~110–220 t/yr water per unit); ~1 MW if scaled. Water energy 10–13 kWh/kg. | Claude |
| 2.5–3.5 MW per site (10–14 MW aggregate); "BOM undersized ISPP" | Gemini |
| 1 MW running per site (4 MW aggregate), roughly half-time in daylight; 10–25 kWh/kg water; 0.25 MW "not retained as a proven requirement" | GPT |

### D4. Who consumes ISPP H₂/O₂
- Claude says there is no Phase-0 customer, because the tugs burn Kr or iodine. In its view this makes ISPP array power "pure demonstration" and removes most of the value of NEA night operations.
- GPT agrees that H₂/O₂ "need an identified user" and that ISPP output "does not establish compatibility with krypton/iodine tugs".
- Gemini does not address the question.

### D5. Station storage driver and size

| Position | Models | Reasoning |
|---|---|---|
| 5 MWh (2–10) | Claude | MRE keep-alive at 5–10% of MRE load for 1–2 h. "A frozen electrolyte cell is a likely loss of the cell." Claude says GPT's round-1 station value omitted keep-alive. |
| 15 MWh | Gemini | ~15 min at full load (55 MW). Covers 15–20 min of reorientation or bus-fault clearing "without … solidifying molten electrolyte pots". |
| 0.8–2 MWh | GPT | ~1 h of critical services plus a defined shutdown. GPT caveats that "survival-only backup may be insufficient if molten processes require prolonged controlled cooldown". |

### D6. Battery pack specific energy, and the mass of the original 200–500 MWh

| Position | Models |
|---|---|
| 100–160 Wh/kg pack level, so 500 MWh ≈ 3,100–5,000 t. The finding's 1,000–2,500 t "is a cell-level figure". | Claude |
| 200 Wh/kg pack level, so 1,000–2,500 t | Gemini |
| 80–160 Wh/kg pack level | GPT |

### D7. NEA night operations
- Claude treats night operations as a priced option. It roughly doubles throughput but needs about 2× the array and 2–6 MWh per site.
- Gemini's baseline includes 3 MWh per site for "night-side survival/continuous operations".
- GPT makes daylight-only production its provisional case and calls continuous versus daylight-only "a genuine cost/throughput trade-off".

### D8. Cell technology

| Position | Models | Reasoning |
|---|---|---|
| Technology-neutral, with a must-pass screen of ≥25 MW/yr qualified supply. Choose on delivered EOL $/W. Efficiency 22–32%. | Claude | Claude estimates (low confidence) global space III-V output at "a few MW/yr". It judges 100 MW of III-V "likely infeasible" on a Phase-0 schedule (medium-low confidence; falsifiable by RFI). |
| Qualified III-V baseline (29–32%), silicon alternative permitted, no unqualified tandem baseline | GPT | "Producing 100 MW of qualified space hardware is itself a programme". Notes that a universal 40–60 W/kg limit for silicon is not established. |
| Conditional on launch cost: "III-V wins" if launch-constrained; silicon is competitive below ~$500/kg to LEO. Silicon gives 70–85 W/kg and ~60% lower bare-cell cost. | Gemini | Does not address supply capacity |

### D9. Cost: value and structure

| Element | Claude | Gemini | GPT |
|---|---|---|---|
| Hardware $/W | 40 (15–300) | ~30 (volume floor $25–45; heritage $150–400) | 45–170 recurring |
| LEO launch $/kg | Falcon list $1,500–4,000; Starship-class assumed $200–1,000 | "Modern commercial" $1,000–1,500 | Falcon 9 arithmetic ~$3,000 |
| Destination delivery | 1.5–3× LEO $/kg, or SEP self-delivery | $2,500–4,500/kg delivered | $3,000–10,000/kg; "lower end is optimistic" |
| Line total | ~$5.6B all-in for 80 MW; 80% interval $3–20B | $7.5B ($4.5–15B) for 100 MW | $9–41B for 100 MW (YAML central $20B), "scenario envelope, not a statistical confidence interval" |
| Reserve / development | NRE $0.3–1B as a separate line | Not stated | 30% reserve plus $0.5–2B first-of-kind development, inside the envelope |

Explicit cross-critiques:
- Claude judges that GPT's round-1 $100–750/W "treats heritage pricing as baseline". It is unlikely that 100 MW would be bought at heritage prices.
- Claude also says Gemini's round-1 "high confidence" on ~$35/W is "not warranted by any public evidence".
- GPT cites the Boeing iROSA contract ($103M / 120 kW ≈ $860/W) as a reality check. GPT caveats that the contract "is not an array-only quotation".

### D10. Station heat-rejection magnitude and basis

| Position | Models |
|---|---|
| 15–35 MW_th. Credits ~25–30% of input leaving as chemical energy in metal and O₂. Most rejection is at furnace temperature; ~3–4 MW_th at ~330 K (3,000–5,000 m²). | Claude |
| All delivered electrical energy (50–65 MW) "must eventually be rejected"; 55 MW_th at 200–400 K; ">$1.0B scope" | Gemini |
| 30–60 MW screening, "not simply equal to PV output"; a heat and chemical-energy balance is required. 40 MW at 400–500 K needs ~13,000–31,000 m². | GPT |

### D11. Degradation specification
- Claude: 15-year EOL/BOL ≥0.80 (0.72–0.88), with silicon at the low end. Low–medium confidence.
- Gemini: 0.8%/yr (0.6–1.2), "quiet solar wind". Medium confidence.
- GPT: retained-output requirement of 75–85% after 15 years. Must include solar-particle events. Low confidence.

### D12. Phase-0 throughput: fixed or reducible
- Claude says the panel never tested reducing throughput. It proposes options (b) native-metal-only and (c) a 5–10 MW pilot with ~1 kt/yr MRE, as a values question for human reviewers.
- GPT proposes phased throughput and a staged demonstration, and says "accept that the 50 kt/yr target may fall".
- Gemini's options all assume the full 50 kt/yr.

### D13. Meaning of "50 kt/yr"
- Claude raises hypothesis H4: 50 kt may be *feed* tonnage. It flags that feed of 100–500 kt/yr could imply 0.3–6 MW of mining-site beneficiation load.
- GPT: "feed, recovered metal, all solids and oxygen-inclusive output give fundamentally different requirements".
- Gemini assumes 50 kt of mixed product. Its falsification test is a feed with <10% native metal, which would push power above 110 MW.

### D14. NEA site power architecture
- Gemini puts orbital microwave or laser beaming forward as Option B, with 45–55% end-to-end efficiency. It considered fission for the NEAs and rejected it on development and regulatory risk (>$5B).
- GPT: beaming is "not a baseline solution", and its architecture and link efficiency are unproven.
- Claude assumes surface arrays and does not discuss beaming.

### D15. Interface `in_bom` status

| Interface | Claude | Gemini | GPT |
|---|---|---|---|
| bom-0-2 robot power | No | Yes | Yes |
| bom-0-3 station power | No | No | Yes |
| bom-0-6 ISPP power | No | No | Yes |
| bom-0-1 site data | No | — | Yes |

### D16. Location and inter-site distance
- Claude corrects the finding's "tens of millions of km". It puts L4/L5 at ~1 AU (~150 million km) from Earth and at tens to >200 million km from NEA targets. Claude says the consequence (no power transfer) is unchanged.
- Neither Gemini nor GPT comments on this.

### D17. Array self-delivery by SEP
- Claude evaluates arrays powering their own Kr/iodine SEP stage:
  - ~350 t of propellant from LEO, or ~20–60 t from C3 ≈ 0.
  - Krypton supply at that scale is unverified.
- Gemini assumes an electric orbital tug at 3.5–4.5 km/s.
- GPT keeps tug propulsion power onboard the tugs and says transfer propellant is "missing, not zero".

---

## 4. Proposed BOM delta

**Status:** these are proposals for human review. None is approved.

| # | Action | Item | Supporting models | Quantity | Unit-cost range (as stated) | Confidence |
|---|---|---|---|---|---|---|
| B1 | resize | bom-0-5 arrays | All three | Claude 80 MW BOL; Gemini 100 MW; GPT 100 MW (conditional reference) | Claude $15–300M/MW, hardware only incl. PMAD. Gemini $45–150M/MW all-in. GPT $90–410M/MW all-in (hardware, delivery, assembly, small storage, development, reserves). **These bases differ and must not be compared or summed directly.** | Claude low; Gemini medium; GPT low |
| B2 | split | bom-0-5 by site | All three | Claude: station 60 / 4 × 2.5 / reserve 10. Gemini: 0-5a station 75 / 0-5b NEA 25. GPT: 80 / 4 × 5. | GPT: "an accounting split … not an additional cost". Claude and Gemini repeat per-MW costs. | low (Claude, GPT); medium (Gemini) |
| B3 | remove / resize | Bulk 200–500 MWh storage | All three (removal) | Claude 5 MWh + 4 × 0.3 MWh; Gemini 15 + 12 MWh; GPT 2.4–6.4 MWh inside the package | Claude $6–20M (unit basis ambiguous); GPT $0 as a separate line; Gemini not costed | Claude medium (station) / low (sites); Gemini high; GPT low |
| B4 | add | Array delivery and robotic deployment | Claude (separate line). GPT and Gemini include delivery inside B1; GPT warns "do not add it again". | ~800 t to 5 sites | Claude $1–8B | low |
| B5 | add | Space PV production-line NRE | Claude (separate). GPT folds $0.5–2B development into B1. Gemini: none. | 1 line, ≥25 MW/yr | Claude $0.3–1B | low |
| B6 | add | Station heat rejection | Claude, Gemini (lines). GPT: assign to bom-0-3 or a separate line, uncosted. | Claude 15–35 MW_th; Gemini 55 MW_th; GPT 30–60 MW | Claude $0.3–2B. Gemini YAML $20–40M, but its prose says ">$1.0B scope" (internal inconsistency). | low |
| B7 | add | Array spares and 15-year replacement | Claude (costed); GPT ("mandatory lifecycle scope", no defensible price yet) | Claude 5–15 t/yr | Claude $0.2–1.5B life-cycle | low |
| B8 | note (not a delta line) | Phase-0 budget re-baseline | Claude, GPT | GPT: phase ~$15.71B → ~$24–56B from this array estimate alone. Claude: bom-0-5 "plausibly 20–100% of the original phase budget". | — | low |

**Scope named as missing but not entered as a delta line:**

| Scope | Models and positions |
|---|---|
| HV PMAD and switchgear | Gemini lists as missing; Claude carries it in hardware $/W ("do not add it again"); GPT includes local PMAD but wants station-wide ownership made explicit |
| Anchoring and dust mitigation | All three |
| Cryogenic storage and liquefaction (conditional) | GPT |
| Battery safety and thermal control | GPT |
| Commissioning power | GPT |
| Array-carrier propulsion and consumables | GPT; Claude (Kr supply) |
| HV qualification in the plasma environment | Claude, GPT, Gemini (open question) |

**Double-counting caution.** Claude flags the double-counting risk and resolves it by putting delivery on a separate line. GPT includes delivery, development and reserves inside its package. If the reviewers adopt Claude's B4 or B5 together with GPT's B1 basis, those costs are counted twice.

---

## 5. Open questions

| Question | What would settle it | Raised by |
|---|---|---|
| Product slate in t/yr per product. Does "50 kt/yr" count feed, metal, solids or O₂? | The bom-0-3 author publishes the slate with kWh/kg and an O₂ mass balance | Claude, GPT; Gemini (mineralogical split) |
| Phase-0 objective: production station (~60–80 MW BOL) or 5–10 MW pilot / phased throughput? | A programme values decision | Claude, GPT |
| Practical MRE and solar-grade kWh/kg with representative feed | Sustained pilot including auxiliaries, recovery and purification | Claude (low certainty), GPT (process-energy gate) |
| MRE cell thermal hold time at 5–10% keep-alive | Thermal model or pilot cooldown test | Claude; GPT (shutdown energy) |
| Supplier capacity and price at ≥25 MW/yr | Supplier RFI with $/W, production rate, yield, qualification and warranty | Claude, GPT |
| NEA targets: heliocentric range, aphelion, rotation, pole, terrain horizon, dust, water and native-metal content | bom-0-1 data; terrain-resolved illumination over the operating orbit | All three |
| Operations through aphelion, or seasonal standby? | Operations policy decision | Claude |
| Consumer of ISPP H₂/O₂ | Transport and propulsion architecture names a user | Claude, GPT |
| ISPP throughput requirement (P0-F01 was not supplied) | Obtain P0-F01 | GPT; Claude references GPT's ~1 MW scaling |
| Mining-site feed tonnage and beneficiation power | bom-0-2 feed mass balance | Claude |
| Krypton availability at hundreds of tonnes | Supply survey | Claude |
| Station heat balance including chemical energy and exported hot products | Process heat and chemical-energy model | GPT, Claude |
| HV (2–5 kV) operation in solar-wind plasma, solar particle events and asteroid dust | Representative deployment and HV fault test | Gemini, GPT, Claude |
| Surface arrays or orbital beaming at NEAs | Architecture trade with full link efficiency | Gemini, GPT |
| Delivery closure | Trajectory, packing, propellant and deployed-mass closure, "not launch $/kg alone" | GPT, Claude |
| Ownership and funding of heat rejection, cryogenics, servicing and replacement | Signed responsibility and cost-boundary matrix | GPT |

---

## 6. Decision-quality audit

**Methods each model applied:**
- **Claude:** Composite Scaffold throughout; ACH (D1); QOC (D2, D3); GRADE EtD and Kepner-Tregoe (D4).
- **Gemini:** ATAM and QOC (its Decision 1); GRADE EtD (its Decision 2).
- **GPT:** must-screen followed by weights of 30/30/25/15; ACH (A); QOC (B); GRADE EtD (C, D); real-options reasoning (D).

**Critique of the round-1 reconciliation.** Claude and GPT independently state that it reported unions of ranges as agreement. Gemini does not comment.

### Station throughput and power (Claude D1; GPT A; Gemini Decision 1 in part)
- **Weakest link:**
  - Claude: *alternatives*. The throughput-reduction and pilot options were never generated.
  - GPT: *information*.
  - Gemini (for its combined split/resize decision): *information*, i.e. target ephemerides and mineralogy.
- **Missing or unsupported steps:**
  - Claude says the warrant ("Phase 0 must produce at 50 kt/yr") is "unstated in any document". Under its ACH, hypothesis H4 (feed tonnage) was considered by no model in round 1.
  - GPT's ACH finds the evidence disconfirms the original budget but does not choose between "oversized power system" and "undersized refining architecture".
  - Gemini's option set does not include throughput reduction.
- **Reclassified as trade-off points:**
  - Throughput versus mass/cost: a *values* question (Claude). GPT agrees: "throughput versus capital exposure is a values trade-off".
  - Both treat the slate and kWh/kg as *sensitivity points*, i.e. facts to obtain.
- **Certainty statements:**
  - Claude: >90% that any Al/Si slate needs >10 MW delivered; about as likely as not that 60 MW BOL is within ±30%.
  - GPT: "very likely" to exceed 2.5 MW (high confidence); the central 100 MW sufficing is "plausible" (low confidence).
  - Gemini: "Very High Agreement, High Evidence" that the station needs >50 MW.

### Total capacity and site split (Claude D2; Gemini Decision 1; GPT A)
- **Weakest link:**
  - Claude: *frame*. The panel debated one nameplate number when the decision is really four site requirements plus a station requirement.
  - Gemini: *information*.
  - GPT: *information*.
- **Missing or unsupported steps:**
  - Claude says phased deployment "dominates on regret" and was not evaluated.
  - Gemini weights its criteria (0.35 / 0.35 / 0.30) and rejects a fission option.
- **Sensitivity points:**
  - Claude: NEA design distance (1.3 vs 2 AU gives a 2.4× change).
  - Gemini: asteroid distance 1.1–1.5 AU (2.25× in area).
- **Divergent framing on 70 vs 100 MW:**
  - Claude: all fixed totals fall within the slate-driven range, so the number should be an output, not an input.
  - GPT: "not resolvable without the product slate".
  - Gemini: rates its 100 MW total high-confidence.

### Storage (Claude D3; Gemini Decision 2; GPT B)
- **Weakest link:**
  - Claude: *information* (no MRE thermal-hold data).
  - Gemini: *reasoning* in the legacy consensus, which carried LEO eclipse assumptions into an orbit without eclipse.
  - GPT: *information*, then *values* for continuous production.
- **Missing or unsupported steps:**
  - GPT's QOC shows that "500 vs 200 MWh" omitted the option of not maintaining full output at night.
  - GPT also says its own 4-hour dark interval is an assumption, "not derived from actual eclipse profiles".
  - Claude says GPT's round-1 station storage omitted MRE keep-alive.
  - Gemini's Decision 2 scaffold stops at step 8 and lists no consequences step.
- **Reclassified as trade-off points:**
  - NEA night operations versus array area, mass and cost: a values question tied to the ISPP customer (Claude).
  - Battery mass versus throughput (GPT).
  - Storage mass versus ride-through time during reorientation (Gemini).
- **Certainty statements:**
  - Claude: >99% that 200–500 MWh at L4/L5 is unjustified.
  - Gemini: >99% that there is no natural eclipse at L4/L5.
  - GPT: routine L4/L5 eclipse "very unlikely" (high confidence).

### Cell technology and distribution (Claude D4, technology part; GPT C; Gemini §5 only)
- **Weakest link:**
  - Claude: *information*, with *frame* secondary. Supply capacity was never posed as a must criterion.
  - GPT: *reasoning*, "when cell-level figures are promoted to system performance".
  - Gemini: no formal critique of this decision.
- **Missing or unsupported steps:**
  - Claude adds a Kepner-Tregoe must of ≥25 MW/yr. Under it, heritage III-V "fails the must screen".
  - GPT's GRADE EtD finds the evidence for blankets, modules and HV much weaker than for the cell.
  - Claude rejects the null option (wait for station-made Si) as circular.
- **Reclassified as trade-off points:**
  - Efficiency and radiation hardness versus cost and supply (Claude): schedule risk versus mass.
  - Cell efficiency versus procurement cost, and voltage versus arcing/protection complexity (GPT).
  - Gemini frames III-V versus silicon as conditional on launch price.

### Cost basis and commitment (Claude D4, cost part; GPT D)
- **Weakest link:**
  - Claude: *information*.
  - GPT: *information and commitment*. "No reconciled figure currently has supplier-backed scope or a named approving authority."
  - Gemini: no cost decision critique.
- **Missing or unsupported steps:**
  - Claude: Gemini's confidence and the round-1 "≥$20/W across the panel" floor are "not traceable to any citation".
  - GPT: neither the previous round's very cheap delivery assumptions nor its highest delivery allowances are established by quotations. GPT proposes staged commitment through real options.
- **Trade-off:** early deployment versus learning (GPT).
- **Certainty statements:**
  - Claude: >90% that all-in cost exceeds $20/W (medium confidence); 10–33% that III-V can supply 100 MW without a new line.
  - GPT: exceeding $500M is "very likely"; falling within $9–41B is "plausible" (low confidence).

### Delivery accounting (Claude D5; GPT audit table)
- **Weakest link:**
  - Claude: *reasoning*, because of double-counting risk.
  - GPT: *commitment*. Split the lines for accounting, "not extra summed cost".
- **Divergent resolutions:**
  - Claude puts delivery on one new line.
  - GPT keeps it inside the package.

### GPT's audit of round-1 gates

GPT proposes strengthening four gates: supplier price, site selection, process energy and delivery. It names a weakest link per proposal:

| Proposal | Weakest link (GPT) |
|---|---|
| Radiators | information |
| Solar-thermal | reasoning |
| Dust / anchoring | information |
| Cryogenics | frame |
| Replacement | commitment |

GPT states that these "are proposed acceptance gates, not established pass thresholds". Neither Claude nor Gemini comments on them.

---

## Reviewer note

These are consistency and attribution issues found during reconciliation. They introduce no new technical claims.

1. **Model-ID mismatch.** Gemini's YAML `model:` reads `claude-opus-5.5-engineer`, and GPT's reads `GPT-5.2`. Neither matches its response header. Confirm provenance before filing.
2. **Gemini internal inconsistencies.**
   - Station allocation confidence is "medium" in its table but "high" in its YAML.
   - Heat-rejection cost is ">$1.0B scope" in prose but $20–40M in `bom_delta`.
   - The 15 MWh buffer is given as 45–60 t, while 15 MWh at its stated 200 Wh/kg would be 75 t.
   - The cost range is $45–160/W in prose and $45–150/W in YAML.
   - The F03 YAML summary says "45–65 MWe", against ~55 MW in the prose.
   - Its ISPP interface (10–14 MW) is not reconciled with its 25 MW NEA allocation plus 1.0 MW robots at 3.5 MW EOL per site.
3. **Claude.**
   - The F04 verdict differs between prose (mixed) and YAML (`partly`).
   - The storage `bom_delta` unit cost ($6–20M) does not state whether it is per MWh or a total.
4. **Unit basis of B1.** The three per-MW costs are on different bases: hardware only (Claude) versus all-in (Gemini, GPT). Normalise them before any comparison.
5. **No supplier evidence.** No model supplied a supplier quotation or a launch/delivery quotation. Every cost figure rests on estimates and judgement, as each model acknowledges.
