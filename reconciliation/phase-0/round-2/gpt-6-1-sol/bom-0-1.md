---
phase: phase-0
item: bom-0-1
round: 2
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:10:45.506Z
seconds: 216.614
---

# Re-assessment: bom-0-1 Prospecting Satellites

**Recommendation:** replace the ambiguous “survey constellation” with a **gated asteroid-characterisation programme**. Budget and design initially for four pathfinders, with an illustrative expansion to 16 spacecraft—not an approved fleet requirement. Each spacecraft should have one primary rendezvous target; additional encounters must be justified by actual trajectories.

The original specification does not close. However, neither spacecraft mass nor the rocket equation alone establishes an encounter-rate limit. Several numbers in the previous reconciliation also remain unsupported.

**Evidence convention:** published mission specifications support the physical estimates below; cost, fleet size and schedule ranges are engineering planning estimates, not vendor quotations. No target catalogue, trajectory solutions, instrument design or current replacement consensus documents were supplied.

---

## 1. Findings

### P0-F06 — “20 asteroids per satellite per year is not reachable by a 100 kg spacecraft”

**Verdict: partly agree.**

The requirement is unacceptable as written, but the finding conflates three different missions:

| Meaning of “survey” | Assessment |
|---|---|
| Unresolved remote observations | Twenty objects/year is not intrinsically impossible. Aperture, brightness, integration time and observing geometry govern yield. |
| Flyby characterisation | Yield depends strongly on encounter geometry and launch injection. Neither 20/year nor a universal limit of 0.5–1.5/year is established here. |
| Rendezvous and sustained mapping | Twenty/year is not a credible baseline for the proposed architecture. It implies one completed transfer and characterisation campaign every 18 days. |

A remote spectrum is useful for screening but does not provide the local terrain, gravity, mechanical properties or recoverable resource measurements needed to authorize mining.

#### Propulsion calculation

For an illustrative 100 kg wet spacecraft with 20 kg of propellant:

\[
\Delta v=g_0 I_{sp}\ln(m_0/m_f)
\]

With a representative chemical \(I_{sp}=230\ \mathrm{s}\):

\[
\Delta v=(9.81\ \mathrm{m\,s^{-2}})(230\ \mathrm{s})
\ln(100/80)=0.50\ \mathrm{km\,s^{-1}}.
\]

With electric propulsion at \(I_{sp}=1{,}800\ \mathrm{s}\), the same mass fraction gives:

\[
\Delta v=3.94\ \mathrm{km\,s^{-1}}.
\]

Thus **100 kg does not imply an inherently small electric-propulsion Δv**. It does imply difficult allocations for arrays, propulsion hardware, communications and instruments. Moreover, Δv is not encounter count: transfer duration, thrust, orbital geometry, navigation and time at the target remain limiting.

Flight heritage supports electric propulsion for asteroid encounters, but not the claimed cadence. Deep Space 1 demonstrated solar-electric propulsion and asteroid/comet flybys using an approximately 486 kg launch-mass spacecraft. Hayabusa demonstrated asteroid rendezvous and sampling using a roughly 510 kg launch-mass spacecraft.[1,2] Neither establishes a minimum feasible mass.

**Proposed change**

- Define the primary product as **rendezvous-based characterisation of externally selected candidates**.
- Require **one primary target per spacecraft**, with a second target conditional on a verified trajectory and remaining resources.
- Remove the annual encounter-rate requirement.
- Treat remote observations and opportunistic flybys as separately budgeted supplementary products.
- Do not claim that any fleet size closes until a target-specific trajectory and yield study exists.

### P0-F16 — “Consensus documents disagree with the BOM”

**Verdict: agree, with an evidence limitation.**

The supplied documents explicitly disagree:

\[
32\times \$5\mathrm{M}=\$160\mathrm{M},
\qquad
50\times \$5\mathrm{M}=\$250\mathrm{M}.
\]

Neither figure includes a demonstrated basis for fleet size or full programme cost.

The supplied finding also reports transport and ISPP inconsistencies. Their replacement specifications were not supplied, so I can flag those conflicts but cannot independently regenerate their consensus documents.

**Proposed change**

1. Preserve the current BOM as the **record of the existing baseline**, not as proof that its quantities are correct.
2. Mark the prospecting consensus **superseded for planning** by this proposed revision, pending approval.
3. Establish one configuration-controlled baseline covering requirements, quantities, cost scope, interfaces and source versions.
4. Reconcile transport and ISPP separately from their actual current specifications.
5. Do not grant authority merely because a model version is newer. The previous round’s inconsistent model attribution also needs correction.

---

## 2. Revised specification

### Proposed planning baseline

This is a **candidate baseline for a feasibility study**, not a flight-ready design.

| Parameter | Old → proposed value | Basis and confidence |
|---|---|---|
| Mission definition | “Comprehensive NEA survey” → shortlist characterisation by rendezvous | Phase requirement analysis; **high** confidence in need for definition |
| Fleet quantity | BOM 32 / consensus 50 → four initial pathfinders; illustrative total 16, expansion envelope 8–32 | Judgement; **low** confidence in final quantity |
| Target yield | 20+/spacecraft/year → one primary rendezvous; second conditional | Trajectory-dependent planning assumption; **medium** confidence in conservative baseline, low in aggregate yield |
| Wet mass | 80–120 kg → nominal 200 kg; study range 150–300 kg | Preliminary subsystem allocation, not a closed mass budget; **low–medium** |
| Main propulsion | Chemical/EP/hybrid undecided → solar-electric propulsion baseline; separate proximity-control capability | Flight heritage and rocket equation; **medium** |
| Onboard Δv | Unspecified → nominal approximately 3 km/s; study range 2–4 km/s | Calculation, excluding launch injection; **medium** |
| Main EP propellant | Unspecified → approximately 30 kg; 21–41 kg at 200 kg wet mass and 1,800 s | Calculation; **high** conditional on assumptions |
| Arrays | Unspecified → nominal 1.5 kW beginning-of-life at 1 AU; range 1–2 kW | Power/thrust allocation estimate; **medium** |
| Spectroscopy | 0.4–2.5 µm → visible/NIR plus hydration-band coverage to at least approximately 3.2 µm | NIRS3/OVIRS heritage; **high** scientific rationale, medium implementation confidence |
| Thermal payload | Optional 3–14 µm mapping → trade a calibrated thermal radiometer against payload cost and power; no continuous 3–14 µm requirement | Resource/thermal assessment need; **medium** |
| Primary mission/design life | Seven-year life → 3–5 year primary mission; seven-year design goal | Planning judgement; **low–medium** |
| Autonomy | Undefined “Level 3,” 30 days independent → explicitly defined navigation, fault protection and safe-mode requirements | Systems-engineering requirement; **high** |
| Communications | X-band primary/S-band backup → X-band deep-space baseline; backup only if coverage and mass benefit are demonstrated | Heritage and link-budget need; **medium** |
| Mesh networking | Emphasized by one model → not baseline; retain only for a demonstrated geometry/use case | Architectural judgement; **medium** |
| Science downlink volume | Unspecified → initial allocation 1–5 GB/target, after selection/compression | Instrument-design assumption; **low** |
| Cost | $5M/unit → $12–25M recurring flight hardware; development and services separate | Analogy plus batch-production judgement; **low** |
| Confidence label | “High” overall → low for quantity/cost; parameter-specific confidence elsewhere | Evidence assessment; **high** |

### Δv, mass and thrust closure

For the nominal candidate:

- Wet mass: \(200\ \mathrm{kg}\)
- Main EP propellant: \(30\ \mathrm{kg}\)
- Final mass for this burn calculation: \(170\ \mathrm{kg}\)
- \(I_{sp}=1{,}800\ \mathrm{s}\)

\[
\Delta v=9.81(1{,}800)\ln(200/170)
=2.87\ \mathrm{km\,s^{-1}}.
\]

The 170 kg remainder must include structure, arrays, payload, propulsion hardware, communications, batteries and any separate proximity propellant. **That allocation has not yet been closed.**

For 2–4 km/s at the same wet mass and \(I_{sp}\):

\[
m_p=m_0\left[1-\exp\left(-\frac{\Delta v}{g_0I_{sp}}\right)\right]
\approx21–41\ \mathrm{kg}.
\]

For an illustrative 600 W EP operating point and 50% electrical-to-jet efficiency:

\[
T=\frac{2\eta P}{g_0 I_{sp}}
=\frac{2(0.5)(600\ \mathrm{W})}{17{,}658\ \mathrm{m\,s^{-1}}}
\approx0.034\ \mathrm{N}.
\]

\[
\dot m=\frac{T}{g_0I_{sp}}
\approx1.9\times10^{-6}\ \mathrm{kg\,s^{-1}}
\approx0.17\ \mathrm{kg/day}.
\]

Expending 30 kg takes approximately **180 equivalent full-power thrust days**. At 20–60% average availability, that corresponds to roughly **300–900 calendar days**. These are propulsion-duration estimates, not transfer solutions.

At 1.5 AU, with an illustrative 20% end-of-life derating:

\[
P_{\rm array}=1.5\ \mathrm{kW}\times0.8/(1.5)^2
=0.53\ \mathrm{kW}.
\]

After a 0.12 kW non-propulsive load, only approximately **0.41 kW** remains for propulsion. A constant 1 kW thruster operating point is therefore not justified.

### Corrections to the previous round

- Claude’s stated \(180/120\ \mathrm{kg}\), \(I_{sp}=1{,}700\ \mathrm{s}\) case gives **6.76 km/s**, so its rocket-equation result is broadly correct. Its **2–4 rendezvous** claim does not follow from that calculation.
- Gemini’s \(I_{sp}=2{,}500\ \mathrm{s}\), propellant fraction 0.30 case gives:

\[
\Delta v=9.81(2{,}500)\ln(1/0.7)=8.75\ \mathrm{km\,s^{-1}},
\]

not “≤3.5 km/s.”
- A 180 kg wet/110 kg final spacecraft gives **12.1 km/s** at 2,500 s, before any trajectory-specific reserves. A smaller usable allocation needs an explicit explanation, not an unexplained replacement number.
- Increasing mass to approximately 200 kg is a **design option**, not an established physical necessity.
- Extending spectroscopy is justified, but surface hydration is **not proof of extractable water**. OSIRIS-REx OVIRS identified approximately 2.7 µm hydration features; Hayabusa2’s NIRS3 covered 1.8–3.2 µm.[3,4]
- A 3–6 kg gamma-ray/neutron instrument should not be adopted from an asserted mass alone. Sensitivity, integration time, altitude, background and total accommodation must close.

### Programme cost

For an illustrative 16-spacecraft programme, in approximate **2026 USD**:

| Scope | Planning estimate |
|---|---:|
| Recurring flight hardware: \(16\times\$12–25\mathrm{M}\) | $192–400M |
| Common development, instrument/software qualification and integration support | $80–160M |
| Launch and appropriate escape/injection services | $60–180M |
| Operations, ground services and target-screening programme | $70–140M |
| Subtotal | approximately $400–880M |
| Planning reserve, approximately 25–35% | approximately $100–310M |
| **Programme total** | **approximately $0.5–1.2B** |

These ranges are estimates, not independent statistical confidence intervals.

NASA’s SIMPLEx programme used a roughly $55M mission cost cap excluding launch. Janus’s approximately $49.7M award covered a two-spacecraft development programme, but Janus did not provide asteroid-operation flight heritage.[5,6] These support skepticism about **$5M all-in per spacecraft**, not a precise price for this architecture.

Replacing the existing $160M line with the illustrative all-inclusive programme gives:

\[
\$15.71\mathrm{B}-\$0.16\mathrm{B}+\$(0.5–1.2)\mathrm{B}
=\boxed{\$16.05–16.75\mathrm{B}}.
\]

This is arithmetic only. It does not validate the rest of the phase BOM and excludes a separately scoped extraction demonstrator.

---

## 3. Interfaces

### Physical and information flows

Values below apply to the illustrative 16-spacecraft programme.

| Other item | Exchange | Proposed value and limitation | Represented adequately in current BOM? |
|---|---|---|---|
| **bom-0-2 Mining Robots** | Target maps, shape/spin, terrain, estimated gravity and resource indicators | Approximately **1–5 GB/characterised target** of selected science data; validated products derived from that dataset | **No:** robot line exists, but interface requirements do not |
| **bom-0-3 Processing Station** | Feedstock hypotheses and uncertainty bounds | Data only; **0 t/year** delivered material by prospectors | **No:** required feedstock specification and acceptance thresholds missing |
| **bom-0-4 Transport Vehicles** | Target ephemerides, departure/arrival geometry, accessibility assessment | Data only; **0 t/year** cargo and **0 t/year** propellant transfer | **No:** navigation/service interface unspecified |
| **bom-0-5 Solar Power Arrays** | External power | **0 MW**; prospectors carry approximately 0.001–0.002 MW each at 1 AU BOL | Power line must explicitly exclude these onboard arrays |
| **bom-0-6 ISPP** | Hydration observations, thermal environment, recommended sampling locations | Same target products; **0 t/year** water or propellant supplied; no extraction guarantee | **No:** resource-to-process acceptance interface missing |
| **bom-0-7 Organization** | Requirements, target decisions, evidence provenance and configuration records | Programme data; volume is not the limiting requirement | **No:** technical authority and approval responsibilities undefined |

Prospectors **do not create a material-supply flow** merely by identifying a candidate.

### Fleet consumables and ground communications

- Main EP propellant loaded: \(16\times21–41\ \mathrm{kg}\), approximately **0.34–0.66 t**.
- If consumed across five years: approximately **0.07–0.13 t/year** fleet-average usage—not a replenishment service.
- Proximity-control propellant is additional and must be allocated.

The transport line’s xenon concern should **not automatically be inherited**. A sub-tonne prospecting allocation does not establish a global supply bottleneck. Procurement availability still requires checking; the supplied material does not demonstrate current production or competing demand.

For communications, at an **effective science rate** of 10 kb/s:

\[
t_{\rm 1GB}=\frac{8\times10^9\ \mathrm{bit}}
{10^4\ \mathrm{bit\,s^{-1}}}
=8\times10^5\ \mathrm{s}\approx222\ \mathrm{h}.
\]

Thus 1–5 GB requires approximately **220–1,110 antenna-hours per target**, before additional time for navigation, housekeeping or outages.

Ten antenna-hours/week at that effective rate delivers only:

\[
10\ \mathrm{h/week}\times52\times3{,}600
\times10^4/8
\approx2.3\ \mathrm{GB/year}.
\]

The previous round’s 0.1–200 GB estimates cannot share one ground-service allocation. A distance-dependent link budget and negotiated network capacity are required. Nominal link rate falls approximately with inverse square of range unless antenna, power or coding changes.

---

## 4. Missing items or scope

1. **Target catalogue and trajectory campaign.** Include launch windows, low-thrust transfers, arrival conditions, target uncertainties, observing geometry and rejected candidates.
2. **Deep-space injection.** LEO rideshare is not equivalent to asteroid access. Escape stage, deployment conditions and launch \(C_3\) must be assigned.
3. **Deep-space ground services.** Reserve antenna time, navigation support, scheduling, radiometric tracking and mission-control staffing.
4. **Common non-recurring engineering.** Instruments, flight software, autonomy verification, radiation qualification, propulsion lifetime and integration.
5. **Resource ground truth.** A joint mining/ISPP sampling or extraction demonstration is needed before committing industrial assets. Its architecture and cost are not established; the previous $50–200M allowance is not a validated mission estimate.
6. **Resource acceptance criteria.** Define recoverable mass, extraction energy, throughput, impurities, retention and uncertainty—not merely spectral class.
7. **Reliability and common-mode risk.** Include launch loss, failed commissioning, instrument degradation and correlated fleet defects.
8. **Configuration control and technical authority.** Document who approves the baseline and how contradictory source documents are retired.

### Gates

- **Gate A — before final fleet sizing:** accessible candidate catalogue, target-specific trajectories, success model, costed ground access and preliminary mass/power/link closure.
- **Gate B — before production expansion:** pathfinder commissioning and operational evidence, instrument calibration, demonstrated navigation/autonomy and updated cost/yield estimates.
- **Gate C — before industrial commitment:** representative sampling/extraction evidence and a credible integrated material, energy and logistics balance.

Gate C should block **irreversible industrial-scale procurement**, not all parallel technology development. A fixed “3–5 year gate” is a forecast, not a pass criterion.

---

## 5. Remaining disagreements and open questions

### Fleet size is not settled

Twelve, sixteen and thirty-two spacecraft are options, not evidence-derived answers.

For illustration only, suppose each spacecraft has:

- 80% probability of completing characterisation;
- 20% probability that its characterised target passes the eventual resource criterion;
- independent outcomes.

The qualifying-target probability is \(q=0.8\times0.2=0.16\). If the phase needs at least three qualifying candidates:

\[
P(K\ge3)=1-\sum_{k=0}^{2}{N\choose k}q^k(1-q)^{N-k}.
\]

This gives approximately:

- **48%** for 16 spacecraft;
- **91%** for 32 spacecraft.

Those assumptions are unmeasured, and correlated target selection or hardware failures would invalidate the independence model. The example shows why attrition and screening yield must enter sizing; it does **not** justify 32.

Other genuine disagreements:

- **Rendezvous versus flyby:** deeper characterisation versus cheaper/wider screening is a values trade-off, provided both have costed trajectories.
- **Small versus larger spacecraft:** lower unit cost and launch flexibility versus greater payload, propulsion and communication margin.
- **Extended spectroscopy versus thermal/elemental instruments:** useful measurements compete for accommodation; “more instruments” is not automatically better.
- **Xenon versus krypton/iodine:** qualification, efficiency, storage and contamination matter more here than unverified fleet commonality.
- **Early expansion versus waiting:** schedule acceleration versus avoiding expenditure before target and spacecraft yield are known.
- **How much resource evidence is sufficient:** reasonable engineers can differ on tolerated commercial risk, but spectra alone cannot establish extraction performance.
- **Seven-year design life:** potentially valuable for extensions, but it can increase qualification and parts costs without improving the primary mission.

---

## 6. Decision-quality critique

The previous reconciliation correctly identifies ambiguity, missing services and resource-ground-truth needs. It nevertheless often substitutes an envelope of opinions for a decision basis.

The following uses the **Composite Scaffold**, with **QOC** for option structure, **GRADE Evidence-to-Decision** to separate evidence certainty from resource/feasibility judgments, and **ACH** where apparent measurements risk being mistaken for resource proof.

Weights below are **proposed discussion weights**, not an agreed programme utility function. Hard requirements are screened before weighting. Qualitative matrices avoid presenting unsupported numerical scores as optimization.

### Decision 1 — Mission mode and the mining commitment gate

**1. Frame/type.** Existence and architecture decision, partly irreversible once industrial assets are procured; complicated mission design with uncertain resource discovery.

**2. Criteria/weights.** Must provide evidence relevant to extraction. Proposed wants: decision-relevant resource evidence 50%, lifecycle cost 25%, time to evidence 25%.

**3–4. Options and assessment matrix — QOC**

| Option | Resource evidence | Cost | Time |
|---|---|---|---|
| External/remote screening only | Insufficient alone | Lowest | Earliest |
| Screening plus flybys | Better triage; limited local evidence | Intermediate | Trajectory-dependent |
| Screening plus rendezvous and ground truth | Strongest route to commitment | Highest | Usually longest |

**5. Sensitivities/trade-offs.** Dwell time is a sensitivity point for mapping. Characterisation depth versus speed/cost is a genuine trade-off, not a fact to average.

**6. Certainty.** High confidence that remote spectra alone do not demonstrate extraction performance. It is likely rendezvous improves operational characterization; confidence is medium because payload and target requirements are undefined. No defensible probability of resource success is available.

**7. Assumption/falsifier.** Assumes sustained local observations materially change the mining decision. Falsify through a value-of-information study showing that less costly measurements yield equivalent decisions against agreed acceptance thresholds.

**8. Decision/warrant/downside.** Select rendezvous as the primary prospecting mode and require ground truth before industrial commitment, accepting slower and more expensive early evidence acquisition.

**9. Consequences.** Constrains payload, navigation and timing; enables robot/ISPP target design. Preserve parallel development rather than imposing a blanket procurement freeze.

**Weakest Decision Quality link:** **values**—the required resource confidence and tolerated investment loss are missing.

**Additional method:** ACH. Compare “extractable ice,” “bound hydration with poor recovery,” and “unrepresentative surface signature.” Hydration-band evidence is compatible with multiple hypotheses and is not strongly discriminating by itself.

### Decision 2 — Fleet quantity and pathfinder expansion

**1. Frame/type.** Executive investment decision; initial tranches are reversible, full production less so.

**2. Criteria/weights.** Must have launchable, accessible targets. Proposed wants: probability of enough qualifying candidates 50%, cost 30%, schedule 20%.

**3–4. Options and matrix**

| Option | Candidate yield | Financial exposure | Learning before scale |
|---|---|---|---|
| Retain 32 immediately | Potentially larger | High | Poor |
| Four pathfinders, expand toward 16 | Uncertain | Moderate/gated | Strong |
| Two pathfinders, defer fleet | Lowest initial yield | Lowest initial | Slower operational learning |

**5. Sensitivities/trade-offs.** Qualification probability, mission reliability and target correlation are sensitivity points. More simultaneous targets trade money for schedule and success probability.

**6. Certainty.** Low confidence in any final quantity. Expansion will likely improve opportunity count, but its marginal value is unknown. Four pathfinders are a planning judgment, not an optimum.

**7. Assumption/falsifier.** Assumes pathfinders can materially reduce uncertainty before production commitment. Falsified if launch schedules require all units to be ordered first, or if pathfinders cannot sample the relevant mission diversity.

**8. Decision/warrant/downside.** Fund an initial four-spacecraft tranche and study an 8–32 expansion envelope, accepting delayed full coverage. Keep sixteen only as a costing scenario.

**9. Consequences.** Requires an approved gate owner, protected expansion option, independent review and reliability model. Mixed flyby/rendezvous variants remain alternatives—not automatic BOM splits.

**Weakest link:** **information**—no target trajectories, measured screening yield or reliability distribution.

**Additional method:** GRADE EtD distinguishes strong evidence that the old count is unsupported from weak evidence favoring any replacement count.

### Decision 3 — Mass, propulsion and multi-target ambition

**1. Frame/type.** Property decision with expensive qualification consequences.

**2. Criteria/weights.** Must close trajectory, mass, power and lifetime. Proposed wants: target accessibility 40%, cost 35%, technical margin 25%.

**3–4. Options and matrix**

| Option | Accessibility | Accommodation margin | Development/cost |
|---|---|---|---|
| Approximately 100 kg chemical spacecraft | Narrow without favorable injection | Tight | Potentially simpler |
| Approximately 200 kg EP spacecraft | Broader, subject to thrust/time | Moderate | Higher |
| Approximately 300 kg high-Δv EP spacecraft | Potentially broadest | Better | Highest exposure |

**5. Sensitivities/trade-offs.** Solar distance and EP lifetime are sensitivity points. Higher propellant fraction increases ideal Δv while reducing dry-mass allowance: a trade-off. Larger arrays improve thrust but add mass and deployment complexity.

**6. Certainty.** High confidence in the conditional rocket-equation arithmetic; medium confidence in EP suitability; low confidence that 200 kg or 3 km/s is optimal. One primary rendezvous is more likely to close than multiple rendezvous, but its probability is not yet quantified.

**7. Assumption/falsifier.** Assumes an accessible shortlist can be served with approximately 2–4 km/s onboard capability. Falsify with optimized transfers showing excessive Δv, power-limited duration or unacceptable launch costs.

**8. Decision/warrant/downside.** Carry a 200 kg/3 km/s EP reference case while retaining alternatives, accepting a feasibility-study mass reserve rather than asserting a completed design.

**9. Consequences.** Determine actual thruster, life test, array design and injection requirements before propulsion procurement. Do not infer target count from Δv.

**Weakest link:** **reasoning** in the previous round—the step from ideal Δv to encounters was unjustified.

**Additional method:** QOC exposes that green monopropellant, EP and a hybrid are not interchangeable answers without specified launch and proximity requirements.

### Decision 4 — Payload and the resource claim

**1. Frame/type.** Property decision, coupled to the industrial investment gate.

**2. Criteria/weights.** Must meet calibrated measurement requirements. Proposed wants: discrimination among resource hypotheses 60%, accommodation/cost 25%, maturity 15%.

**3–4. Options and matrix**

| Option | Hydration discrimination | Bulk-resource/mechanical knowledge | Burden |
|---|---|---|---|
| 0.4–2.5 µm plus camera | Incomplete | Poor | Lowest |
| Hydration coverage plus camera and thermal capability | Better surface characterization | Still incomplete | Moderate |
| Add elemental instruments and/or sampling | Potentially stronger | Method-dependent | Highest |

**5. Sensitivities/trade-offs.** Spectral SNR and calibration are sensitivities. Continuous coverage, thermal instruments, lidar and elemental sensing compete for mass/power/cost. These are value choices once performance is measured.

**6. Certainty.** High confidence in the hydration-band rationale; low confidence in the proposed miniature elemental instrument’s complete performance. It is likely that additional measurements reduce ambiguity, but no payload here is demonstrated to certify mineability.

**7. Assumption/falsifier.** Assumes remote mineralogical measurements can prioritize candidates. Falsify against representative laboratory samples or ground-truth targets if ranking does not correlate with recoverable material under the proposed process.

**8. Decision/warrant/downside.** Baseline hydration-sensitive spectroscopy and imaging; trade thermal sensing explicitly. Keep GRNS/lidar optional until sensitivity and accommodation close, accepting incomplete bulk-resource knowledge.

**9. Consequences.** Funds instrument calibration and NRE; preserves a separate extraction test. Avoids labeling hydrogen detections as water reserves.

**Weakest link:** **information**—missing detection thresholds and resource/process correlation.

**Additional methods:** ACH for competing resource hypotheses; GRADE EtD for benefits, instrument burden and evidence maturity.

### Decision 5 — Cost, communications and baseline authority

**1. Frame/type.** Executive scope and commitment decision; configuration control is reversible, unfunded service dependencies are not harmless.

**2. Criteria/weights.** Must include every required service and avoid double counting. Proposed wants: scope completeness 50%, affordability 30%, operational resilience 20%.

**3–4. Options and matrix**

| Option | Completeness | Price transparency | Operational risk |
|---|---|---|---|
| $5M hardware-like unit price | Poor | Misleading programme comparison | High |
| Hardware line plus explicit shared services | Good if interfaces are controlled | Best | Manageable |
| All-inclusive prospecting work package | Good if boundaries are clear | Simpler top-level accounting | Manageable |

**5. Sensitivities/trade-offs.** Data volume, Earth range and shared launch windows strongly affect cost. Compression trades science detail against antenna use. Shared infrastructure reduces duplication but increases coordination dependence.

**6. Certainty.** High confidence that launch, operations and development must be funded. Medium confidence that the existing $160M is inadequate for the proposed rendezvous programme. Low confidence in the $0.5–1.2B estimate; exceeding it remains plausible.

**7. Assumption/falsifier.** Assumes launch, network and recurring hardware can be procured within the allowances. Falsify through quotations, negotiated antenna capacity or a closed link budget outside them.

**8. Decision/warrant/downside.** Use an all-inclusive prospecting work package for the present estimate, accepting broad uncertainty. If services become phase-wide lines, transfer their costs out of this package. Approve baselines through named technical authority, not model seniority.

**9. Consequences.** Replaces unsupported unit pricing, establishes cost ownership and prevents duplicated launch/operations allocations. The reserve percentage requires a risk model before commitment.

**Weakest link:** **commitment**—the previous round proposed scope additions without an approved owner or funding boundary.

**Additional method:** GRADE EtD separates mission analogies from speculative manufacturing savings; QOC exposes separate-line versus bundled accounting as a governance trade-off.

### Disposition of other previous-round proposals

- **Self-powered spacecraft:** retain; no external 100 MW array allocation.
- **Thirty-day autonomy:** replace the label with testable outage, fault-response and navigation scenarios.
- **S-band backup:** conditional on a real receiving service; a second radio alone is not redundancy.
- **Mesh/relay role:** defer unless geometry and service availability beat direct-to-Earth alternatives.
- **Flyby/rendezvous split:** keep as an alternative, not an agreed change.
- **Screening programme:** retain and cost within the present work package.
- **Extraction demonstrator:** retain the need, but do not adopt the earlier cost allowance without a mission concept.
- **Seven-year life and 25–35% reserve:** retain only as provisional planning assumptions.
- **Fixed 3–5 year procurement gate:** reject as an acceptance criterion; use evidence-based gates.

### Selected sources

1. NASA/JPL, **Deep Space 1** mission documentation and NSTAR ion-propulsion descriptions.
2. JAXA, **Hayabusa** mission overview and spacecraft specifications.
3. Reuter et al., **“The OSIRIS-REx Visible and InfraRed Spectrometer (OVIRS): Spectral Maps of the Asteroid Bennu,”** *Space Science Reviews* 214, 54 (2018).
4. Iwata et al., **“NIRS3: the near infrared spectrometer on Hayabusa2,”** *Space Science Reviews* 208 (2017); Kitazato et al., **“The surface composition of asteroid 162173 Ryugu from Hayabusa2 near-infrared spectroscopy,”** *Science* 364 (2019).
5. NASA, **2019 SIMPLEx mission selections**, including the programme cost-cap and launch exclusions.
6. NASA/University of Colorado Boulder, **Janus selection and mission-status documentation**; development award, not completed asteroid-operation heritage.

```yaml
item: bom-0-1
model: GPT-5.2
findings:
  - id: P0-F06
    verdict: partly
    summary: Twenty annual rendezvous is not a credible baseline, but spacecraft mass alone does not rule out twenty remote observations or establish a universal flyby limit.
    proposed_change: Define prospecting as sustained characterisation of shortlisted targets with one primary rendezvous per spacecraft and additional encounters conditional on verified trajectories.
  - id: P0-F16
    verdict: agree
    summary: The supplied prospecting consensus explicitly conflicts with the BOM, while the other reported document conflicts require their current source specifications for independent reconciliation.
    proposed_change: Establish a configuration-controlled approved baseline and regenerate each consensus from traceable source specifications rather than model-version authority.
revised_spec:
  - parameter: Conditional total fleet planning scenario
    old: 32 in BOM and 50 in consensus
    new: 16 including four initial pathfinders, with expansion not yet approved
    range: [8, 32]
    unit: spacecraft
    basis: judgement
    confidence: low
  - parameter: Initial pathfinder tranche
    old: 5
    new: 4
    range: [2, 4]
    unit: spacecraft
    basis: judgement
    confidence: low
  - parameter: Primary rendezvous targets per spacecraft
    old: 20 or more asteroids per year with mission mode undefined
    new: One primary rendezvous with a second conditional on trajectory validation
    range: [1, 2]
    unit: targets per mission
    basis: judgement
    confidence: medium
  - parameter: Wet mass reference case
    old: 80–120
    new: 200 pending subsystem mass closure
    range: [150, 300]
    unit: kg
    basis: judgement
    confidence: low
  - parameter: Onboard propulsion delta-v excluding launch injection
    old: unspecified
    new: Approximately 3 with solar-electric propulsion
    range: [2, 4]
    unit: km/s
    basis: calculation
    confidence: medium
  - parameter: Main EP propellant at 200 kg wet mass and 1800 s specific impulse
    old: unspecified
    new: Approximately 30
    range: [21, 41]
    unit: kg per spacecraft
    basis: calculation
    confidence: high
  - parameter: Beginning-of-life array power at 1 AU
    old: unspecified
    new: 1.5
    range: [1, 2]
    unit: kW per spacecraft
    basis: judgement
    confidence: medium
  - parameter: Spectral upper wavelength
    old: 2.5
    new: At least approximately 3.2 through continuous coverage or a dedicated hydration channel
    range: [3.2, 4.3]
    unit: micrometre
    basis: literature
    confidence: medium
  - parameter: Primary mission duration
    old: unspecified
    new: 3–5 with a seven-year design goal
    range: [3, 5]
    unit: year
    basis: judgement
    confidence: low
  - parameter: Selected science downlink allocation
    old: unspecified
    new: 1–5 pending instrument and link design
    range: [1, 5]
    unit: GB per target
    basis: judgement
    confidence: low
  - parameter: Recurring flight hardware cost
    old: 5000000 with unclear scope
    new: 12000000–25000000 excluding common development and services
    range: [12000000, 25000000]
    unit: USD per spacecraft
    basis: judgement
    confidence: low
  - parameter: All-inclusive 16-spacecraft prospecting programme
    old: 160000000 for 32 spacecraft in BOM
    new: Approximately 500000000–1200000000 including development, launch, operations and reserve
    range: [500000000, 1200000000]
    unit: USD approximately 2026
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-2
    flow: data
    value: 1–5 GB per characterised target before generation of validated operational products
    in_bom: false
  - with: bom-0-3
    flow: mass
    value: 0 t/yr delivered material
    in_bom: true
  - with: bom-0-3
    flow: data
    value: 1–5 GB per target shared source dataset for feedstock assessment
    in_bom: false
  - with: bom-0-4
    flow: mass
    value: 0 t/yr cargo transfer
    in_bom: true
  - with: bom-0-4
    flow: propellant
    value: 0 t/yr propellant transfer
    in_bom: true
  - with: bom-0-4
    flow: data
    value: 1–5 GB per target shared source dataset including geometry and ephemeris products
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 0 MW external draw; onboard arrays supply 0.001–0.002 MW per spacecraft at 1 AU beginning of life
    in_bom: true
  - with: bom-0-6
    flow: propellant
    value: 0 t/yr supplied by prospectors
    in_bom: true
  - with: bom-0-6
    flow: data
    value: 1–5 GB per target shared source dataset without an extractable-water guarantee
    in_bom: false
  - with: bom-0-7
    flow: other
    value: 1 configuration-controlled prospecting baseline with named approval authority
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-1
    quantity: 16 conditional planning spacecraft including four initial pathfinders
    unit_cost_usd: [31250000, 75000000]
    rationale: The average allocation includes development, recurring hardware, launch, operations and reserve; sixteen is a costing scenario rather than an optimized fleet requirement.
  - action: keep
    item: bom-0-5
    quantity: 100 MW external phase capacity unchanged by prospecting
    unit_cost_usd: [5000000, 5000000]
    rationale: Prospecting spacecraft are self-powered and their onboard arrays are included in their hardware allocation.
open_questions:
  - What number of independently qualified resource targets must the phase obtain and at what required probability?
  - Which actual candidates close launch injection, low-thrust trajectory, observing geometry and rendezvous duration requirements?
  - What are the mission-success, resource-screening and correlated-failure probabilities?
  - Can a 200 kg reference spacecraft close its dry mass, power, thermal and communications budgets?
  - Does a flyby variant improve cost per decision-relevant candidate enough to justify separate qualification?
  - What measurements and extraction tests establish recoverable material, throughput and energy demand?
  - Which instruments meet the required hydration, thermal and elemental sensitivity within accommodation limits?
  - What deep-space antenna capacity and launch services can be procured within the planning allowances?
  - Should launch and ground services remain within prospecting or move to phase-wide lines without double counting?
  - Who approves the authoritative baseline and supplies the current transport and ISPP specifications?
```
