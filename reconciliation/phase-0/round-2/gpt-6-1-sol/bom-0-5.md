---
phase: phase-0
item: bom-0-5
round: 2
type: reassessment
modelId: gpt-6-1-sol
modelName: "GPT-6.1 Sol"
endpoint: databricks-gpt-6-1-sol
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:33:47.401Z
seconds: 216.612
---

# 1. Findings

## Assessment basis

**The present specification does not close, but neither 70 MW nor 100 MW is established as the correct capacity.** The controlling uncertainties are the station’s product slate, the meaning of “50 kt/yr,” propellant-production throughput, and asteroid illumination.

I use the following provisional design case to demonstrate closure—not to turn missing requirements into facts:

- Processing station at Sun–Earth L4 or L5, approximately 1 AU.
- **50 kt/yr of saleable solids**, excluding oxygen coproduct.
- Illustrative slate: **40 kt/yr native Fe-Ni, 8 kt/yr Al, 2 kt/yr solar-grade Si**.
- Four mining/propellant sites, each hosting five robots.
- Mining production primarily during daylight; batteries support survival and shutdown, not uninterrupted production.
- All initial power hardware comes from Earth.
- Costs are approximate constant-dollar planning estimates. **No current supplier quotation or launch quotation was supplied or obtained.**

P0-F01 was not supplied. Its implications cannot honestly be declared closed.

### Evidence anchors

Useful published references include:

1. **NASA, “NASA’s Space Station Solar Arrays Getting an Upgrade,” January 2021:** six iROSA wings, each producing more than 20 kW. This establishes deployable-array heritage at tens of kilowatts, not megawatts.
2. **Boeing, January 2021 announcement of the $103 million ISS solar-array contract:** useful as a programme-cost anchor, but not a clean array-only price.
3. **Spectrolab XTJ Prime and AZUR SPACE 3G30-class cell datasheets:** approximately 30%-class qualified III-V cells; cell efficiency must not be confused with deployed-array efficiency.
4. **International Aluminium Institute, primary aluminium smelting energy statistics:** approximately 13–15 kWh/kg Al for terrestrial smelting electricity, excluding upstream alumina production. This does not validate an asteroid MRE plant.
5. **IEA PVPS Task 12, photovoltaic life-cycle inventories:** silicon production and purification are substantial, route-dependent energy consumers.
6. **SpaceX published Falcon 9 capability/pricing material:** approximately $70 million and up to 22.8 t to LEO imply roughly $3,000/kg at full advertised payload. That is a lower-bound arithmetic comparison, **not a destination-delivery quotation**.
7. **NASA Bennu and JAXA Ryugu mission data:** rotation periods near 4.3 h and 7.6 h illustrate short asteroid day/night cycles, but do not establish illumination at an unspecified mining site.

## P0-F03 — Station power cannot refine 50 kt/yr

**Verdict: partly agree.** The mixed-product requirement does not close at 1–2.5 MW. The categorical title is too strong: native-metal melting alone can approach that power range under favourable assumptions.

For annual production \(m_i\) and specific electricity \(e_i\):

\[
P_{\rm annual}=
\frac{\sum m_i e_i}{8{,}760\ {\rm h/yr}}.
\]

The distinction between **product mass and feed mass** is essential. Heating gangue, beneficiation losses and low recovery can dominate the result.

### Product-dependent energy budget

These are screening ranges, not validated asteroid-process guarantees.

| Product/process | Electricity, kWh/kg product | Basis and limitation |
|---|---:|---|
| Clean native Fe-Ni: heat, melt and cast | 0.5–1.0 | Thermodynamic heating/melting floor is roughly 0.3–0.5; electrical losses and handling raise delivered demand |
| Al from oxide-bearing feed | 15–25 | Terrestrial smelting benchmark plus allowance; direct regolith processing remains unvalidated |
| Metallurgical Si from oxide-bearing feed | 15–30 | Route-dependent screening estimate |
| Solar-grade Si, including reduction | 45–120 | Approximately 15–30 for reduction plus 30–90 for purification; low confidence |
| Oxygen coproduct | No independent additive figure | Allocate the common electrolysis energy between metal and oxygen; do not count it twice |

For the illustrative slate:

| Product | Output | Annual process electricity |
|---|---:|---:|
| Native Fe-Ni | 40 million kg/yr | 20–40 GWh/yr |
| Al | 8 million kg/yr | 120–200 GWh/yr |
| Solar-grade Si | 2 million kg/yr | 90–240 GWh/yr |
| **Total** | **50 kt/yr** | **230–480 GWh/yr** |

Thus:

\[
P_{\rm process,annual}=26–55\ {\rm MW}.
\]

Adding an explicitly provisional **4–8 MW** for beneficiation, feed handling, controls, thermal management, pumps and station services gives **30–63 MW annual average**.

At 85% process operating availability:

\[
P_{\rm running}\approx
\frac{26–55}{0.85}+4–8
=35–73\ {\rm MW}.
\]

A central screening case—0.75, 20 and 70 kWh/kg respectively—uses 330 GWh/yr:

\[
P_{\rm average}=330/8.76+5\approx43\ {\rm MW},
\]

\[
P_{\rm running}=330/(8.76\times0.85)+5\approx49\ {\rm MW}.
\]

By contrast, 50 kt/yr of native metal at the finding’s 0.3–0.5 kWh/kg requires **1.7–2.9 MW before station auxiliaries**. I therefore preserve the previous round’s dissent on the absolute wording.

**Proposed change:** delete the station’s universal 1–2.5 MW specification. Supply it explicitly from bom-0-5, with **approximately 43 MW average and 49 MW running in the reference case**, and a **35–73 MW running sensitivity range**. Make 50 kt/yr conditional on demonstrated feed composition, recovery and process energy.

## P0-F04 — Unallocated capacity, missing site split and misplaced storage

**Verdict: partly agree.** The original documents contain only about 3–4.5 MW of identified loads, so the allocation defect is real. But after correcting station processing power, most of 100 MW can have a legitimate purpose.

### Provisional allocation—not an approved requirement

Retain **100 MW BOL reference output at 1 AU** as a trade-study envelope:

| Location | Reference BOL allocation | Delivered power basis |
|---|---:|---|
| Processing station | 80 MW | About 54 MW EOL at 1 AU |
| Four asteroid sites | 4 × 5 MW | About 1.8 MW/site EOL at 1.3 AU |
| **Total** | **100 MW** | Not 100 MW continuously delivered to loads |

Station delivery uses:

\[
P_{\rm EOL}=P_{\rm BOL}
f_{\rm age}f_{\rm temperature/pointing}f_{\rm PMAD}.
\]

With illustrative factors \(0.78,\ 0.90,\ 0.97\):

\[
80\ {\rm MW}\times0.78\times0.90\times0.97
\approx54\ {\rm MW}.
\]

That supports the central 49 MW running case with only modest reserve. It **does not** support the high-energy end of the slate. The station allocation would span approximately **60–110 MW BOL**, depending on process energy and reserve policy.

At a mining site:

\[
P(r)=P_{\rm reference}\frac{f_{\rm local}}{r^2}.
\]

Using \(f_{\rm local}=0.60\), including ageing, conversion, pointing and surface contamination:

\[
P(1.3\ {\rm AU})=5\times0.60/1.3^2
\approx1.8\ {\rm MW}.
\]

At 1.5 AU this falls to **1.3 MW**. Distance cannot be represented by one unspecified “margin.”

### Mining-site loads

A useful screening case per site is:

- Five robots: **0.10–0.25 MW** aggregate.
- Propellant plant: **1 MW running**, subject to throughput confirmation.
- Other services: **0.10–0.15 MW**.
- Battery charging and contingency: remaining daylight capacity.

The original 0.25 MW propellant-plant allocation is not retained as a proven requirement. Heating regolith to 1,000°C is expensive when water concentration is low:

\[
e_{\rm heat}\approx
\frac{0.8\ {\rm kJ/(kg\,K)}\times1{,}000\ {\rm K}}
{3{,}600\ {\rm kJ/kWh}}
\approx0.22\ {\rm kWh/kg\ regolith}.
\]

At 2–10% recovered water, that alone is approximately **2–11 kWh/kg water**, before electrolysis and losses. Electrolysis contributes roughly **6–8 kWh/kg water**. A screening total is therefore **10–25 kWh/kg water**, with worse feed potentially exceeding it.

A 1 MW plant operating half the time at 90% availability produces:

\[
m_{\rm water}=
\frac{1{,}000\ {\rm kW}\times8{,}760\ {\rm h}\times0.5\times0.9}
{10–25\ {\rm kWh/kg}}
\approx160–390\ {\rm t/yr}.
\]

This is an illustrative energy-limited result, not a replacement for P0-F01.

### Storage

L4/L5 has **no recurring planetary eclipse in the nominal architecture**. However, faults, deliberate shutdowns and station self-shadowing still warrant local ride-through.

Battery nameplate capacity should be:

\[
E_{\rm nameplate}\ge
\frac{P_{\rm critical}t_{\rm outage}+E_{\rm shutdown}}
{DOD\,\eta\,f_{\rm EOL}}.
\]

For a provisional asteroid case—0.05–0.15 MW critical load, four-hour darkness, 80% usable depth, 90% efficiency and 80% EOL retention:

\[
E_{\rm site}=0.35–1.04\ {\rm MWh}.
\]

Use **0.4–1.1 MWh/site** provisionally. A station allowance of **0.8–2 MWh** supports approximately one hour of critical services and a defined shutdown sequence.

Total provisional capacity: **2.4–6.4 MWh**, with **about 4.3 MWh** as a screening point.

These are **not sizes derived from actual eclipse profiles**, because no targets or site profiles were provided. A four-hour dark interval is an assumption. A slow rotator, poor horizon or different operations policy can invalidate it.

**Proposed change:** replace 200–500 MWh bulk storage with site-specific critical-load storage. Do not install full-night process storage unless its production benefit is demonstrated. Keep 100 MW only as a conditional sizing envelope.

## P0-F05 — $5/W installed cost

**Verdict: agree.** The original price is unsupported by flight hardware or demonstrated destination delivery.

The Boeing iROSA contract provides a useful reality check:

\[
\$103{\rm M}/120{,}000{\rm W}\approx\$860/{\rm W}.
\]

This is **not** an array-only quotation: it includes programme scope and uses nominal published wing power. It cannot simply be scaled to 100 MW, but it strongly cautions against asserting $5/W as current flight-proven pricing.

### Bottom-up planning estimate

| Element | Screening cost, $/W BOL | Evidence status |
|---|---:|---|
| Qualified cells/interconnects | 20–80 | Engineering allowance; quotations required |
| Blanket, structure and deployment | 15–50 | Engineering allowance informed by flight-system scope |
| PMAD, protection and interfaces | 5–20 | Engineering allowance |
| Integration, qualification and assembly operations | 5–20 | Engineering allowance |
| **Recurring hardware subtotal** | **45–170** | Low confidence at 100 MW scale |

For system specific power of **80–150 W/kg**:

\[
M=100\times10^6/(80–150)
\approx670–1{,}250\ {\rm t}.
\]

A destination-delivery allowance of **$3,000–10,000/kg** gives:

\[
C_{\rm delivery}/W=
\frac{\$3{,}000–10{,}000/{\rm kg}}
{80–150\ {\rm W/kg}}
\approx\$20–125/{\rm W}.
\]

The lower end is optimistic: it requires efficient launch packing and low-cost transfer, whereas the published Falcon 9 arithmetic already approaches $3,000/kg **to LEO alone**.

Applying a 30% reserve, then allowing $0.5–2 billion for first-of-kind development:

\[
C\approx1.3(45–170+20–125)\ {\rm \$/W}
+\$0.5–2{\rm B}.
\]

For 100 MW, round to **$9–41 billion**, including initial delivery and a small critical-load battery system. This is a **scenario envelope, not a statistical confidence interval**.

**Proposed change:** replace $500 million/high confidence with **$9–41 billion/low confidence** for the provisional 100 MW package. Tender cells, integrated arrays, delivery and assembly separately before approving production. Neither the previous round’s very cheap delivery assumptions nor its highest delivery allowances are established by current quotations.

# 2. Revised specification

| Parameter | Old → proposed | Range/basis | Confidence |
|---|---|---|---|
| Capacity definition | “100 MW capacity” → 100 MW BOL reference at 1 AU | Approximately 80–130 MW for the reference-slate trade; not adequate for every oxide-heavy slate | Low |
| Site split | Unspecified → 80 MW station + four 5 MW sites | Station roughly 60–110 MW; mining roughly 12–24 MW total, subject to orbits | Low |
| Station power | 1–2.5 MW → 43 MW average, 49 MW running reference | 30–63 MW average; 35–73 MW running | Low |
| Delivered station EOL output | Unspecified → approximately 54 MW | Approximately 48–60 MW from 80 MW BOL | Medium for arithmetic; low for degradation inputs |
| Qualified cell efficiency | 32–36% → approximately 29–32% baseline | Supplier qualification and test conditions control selection | Medium |
| Technology | Mandatory triple-junction → qualified III-V baseline, silicon alternative permitted | Compare delivered EOL $/W; no unqualified tandem baseline | Medium |
| Specific power | Unspecified → 80–150 W/kg system | Includes array deployment and local PMAD; excludes station structure and batteries | Low |
| Array package mass | Unspecified → approximately 670–1,250 t | 100 MW divided by specific power | Medium conditional on specific power |
| Storage | 200–500 MWh → approximately 4.3 MWh provisional | 2.4–6.4 MWh; final sizing requires outage profiles | Low |
| Battery package specific energy | Implicit 200 Wh/kg → 80–160 Wh/kg planning range | Includes packaging, controls and thermal provisions | Low |
| Battery mass | Approximately 1,000–2,500 t → approximately 15–80 t | Storage divided by pack-level specific energy | Low |
| Module architecture | 2 MW deployable module → 50–200 kW subarrays aggregated into 1–2 MW blocks | Scaling beyond iROSA heritage requires qualification | Medium |
| Distribution | Universal 600 V → segmented local buses; evaluate 2–5 kV trunks | Higher voltage is a candidate, not qualified heritage | Low–medium |
| Life | 15 years → 15-year initial array design, replaceable for 30-year station service | Replacement campaign must be funded | Medium |
| Degradation | <1.5%/yr → EOL retained-output requirement | Screening retention 75–85% after 15 years; mission-specific radiation and dust analysis required | Low |
| Installed price | $3.5–5/W → approximately $90–410/W | Initial delivered package, reserves and development; excludes process plant and its radiators | Low |
| Line cost | $500 million → $9–41 billion | Conditional 100 MW package | Low |

A higher-voltage trade is justified by conductor mass, not by declaring 3 kV mature. For 1 MW, a 400 m aluminium conductor loop and 2% voltage drop:

- At 600 V: approximately **1.7 t conductor**.
- At 3 kV: approximately **0.068 t**, before insulation, protection and supports.

Mass scales approximately as \(1/V^2\) for this fixed power/loss case. Arcing, contamination and fault energy are the countervailing risks.

# 3. Interfaces

| Counterparty | Exchange | Provisional value and obligation |
|---|---|---|
| **bom-0-1 Prospecting Satellites** | Data | Four selected sites must provide orbit, rotation, pole, terrain horizon, dust, water abundance and native-metal recovery estimates; required before site sizing |
| **bom-0-2 Mining Robots** | Power | 20 × 20–50 kW = **0.4–1 MW operating**; assigned locally, not supplied across interplanetary distances |
| **bom-0-3 Processing Station** | Power | **43 MW average / 49 MW running reference**, with explicit load shedding above available EOL output |
| **bom-0-3** | Material/process interface | **50 kt/yr solids reference**; oxygen is additional coproduct and must have a separately stated mass balance |
| **bom-0-3** | Thermal | Approximately **30–60 MW** heat-rejection screening allowance, not simply equal to PV output; plant heat/chemical-energy balance required |
| **bom-0-4 Transport Vehicles** | Cargo | Initial **670–1,250 t arrays**, approximately **15–80 t batteries**, plus any excluded fixtures and transfer stages |
| **bom-0-4** | Power/propellant boundary | Tug propulsion power remains onboard the tugs; no external 100 MW tug allocation assumed |
| **bom-0-6 ISPP** | Power | **4 MW aggregate running reference**, but roughly half-time operation in the provisional daylight case |
| **bom-0-6** | Propellant output | Four sites: approximately **630–1,580 t/yr water processed**, producing roughly **70–175 t/yr H₂** and **560–1,400 t/yr O₂**, before losses |
| **bom-0-7 Organization** | Procurement/configuration data | Site-specific power budgets, qualification records, delivery contracts, outage rules and ownership of reserves |

The ISPP output does **not** establish compatibility with krypton/iodine tugs. Hydrogen and oxygen need an identified user.

Transfer propulsion consumption cannot be assigned a credible t/yr without trajectories, vehicle dry mass, \(I_{sp}\), reuse and delivery schedule. It is **missing**, not zero.

# 4. Missing items or scope

1. **Destination delivery and assembly.** Included in the proposed array envelope; do not add it again as a separate summed line without removing it here.
2. **Station heat rejection.** Assign to bom-0-3 or create a separate line. For emissivity 0.9:
   \[
   q=\epsilon\sigma T^4\approx1.3–3.2\ {\rm kW/m^2}
   \]
   at 400–500 K. Rejecting 40 MW requires approximately **13,000–31,000 m² of emitting area**, before environmental view factors and margin.
3. **High-voltage qualification, protection and grounding.** Local PMAD is included; station-wide distribution ownership must be explicit.
4. **Asteroid anchoring, terrain-compatible deployment and dust control.**
5. **Battery safety and thermal control**, including abnormal charging and containment.
6. **Replacement and servicing.** Initial 15-year hardware does not fund 30 years of service. No defensible replacement price is established yet.
7. **Cryogenic storage, liquefaction and transfer**, if ISPP produces liquid propellants.
8. **Array-carrier propulsion and consumables.**
9. **Commissioning power.** Initial processing cannot depend on silicon or structure that the unpowered station has yet to manufacture.
10. **Factory capacity and qualification expansion.** Producing 100 MW of qualified space hardware is itself a programme, not an assumed volume discount.

The original phase total is approximately **$15.71 billion**. Substituting this array estimate alone gives approximately **$24–56 billion**, before missing scope elsewhere. The phase’s cost and deployment schedule therefore require re-baselining.

# 5. Remaining disagreements and open questions

- **70 versus 100 MW:** not resolvable without the product slate and service requirements. “Headroom” is useful only when its purpose and funding are approved.
- **Native-metal-rich feed:** making this a design requirement may reduce station power but increase prospecting, transport and resource-access risk.
- **Daylight-only production versus continuous production:** a genuine cost/throughput trade-off, not an uncertainty that better physics will eliminate.
- **Station backup duration:** survival-only backup may be insufficient if molten processes require prolonged controlled cooldown.
- **III-V versus silicon:** silicon can reduce cell cost while increasing area and potentially structural mass. A universal 40–60 W/kg silicon limit is not established by cell choice alone.
- **PV concentrators:** reject neither categorically nor on a universal sub-0.1° pointing claim; required pointing depends on concentration ratio and optical acceptance. Flat plate remains the lower-risk baseline.
- **Solar-thermal heat:** potentially useful, but electricity displacement requires a temperature/time-resolved process model. Thermal MW cannot simply replace electrical MW.
- **Orbital power beaming:** not a baseline solution. It does not automatically eliminate eclipses, batteries or surface receivers; its architecture and full link efficiency remain unproven.
- **L4/L5 radiation:** degradation must include solar-particle events and mission shielding, not just annual averages borrowed from other orbits.
- **P0-F01:** obtain the actual finding and throughput requirement before accepting any ISPP power allocation.
- **50 kt/yr definition:** feed, recovered metal, all solids and oxygen-inclusive output give fundamentally different requirements.

# 6. Decision-quality critique

The previous reconciliation correctly identified missing closure, but its **unions of model ranges are not evidence-based uncertainty intervals**. Agreement among models using similar assumptions does not increase the underlying evidence quality.

For the decisions below, I use hard **musts**—energy closure, safe shutdown, credible delivery and explicit funding—before preferences. Provisional preference weights are **30% lifecycle cost, 30% delivered service, 25% feasibility/schedule and 15% adaptability**. These are review weights, not approved stakeholder values.

## A. Station throughput and total capacity

1. **Frame/type:** coupled requirements/property decision; capacity is reversible through expansion, but factory and transport commitments are expensive.
2. **Criteria/weights:** must satisfy product and energy balances; apply the stated preferences only after closure.
3. **Options:** retain 1–2.5 MW; adopt 70 MW aggregate; retain conditional 100 MW; enlarge capacity; reduce or phase throughput.
4. **Assessment matrix:**

   | Option | Closure | Cost | Feasibility | Adaptability |
   |---|---|---|---|---|
   | Original station power | Fails mixed slate | Apparently low | Misleading | Poor |
   | 70 MW aggregate | Possible for low-energy slate | Better | Conditional | Moderate |
   | Conditional 100 MW | Central case closes narrowly | Higher | Unproven scale | Good |
   | Larger capacity | Better energy coverage | Worse | More deployment burden | Good |
   | Phased throughput | Lower early output | Lower initial exposure | Best learning opportunity | Good |

5. **Sensitivity/trade-off:** slate and kWh/kg are sensitivity points. Throughput versus capital exposure is a **values trade-off**.
6. **Evidence certainty:** mixed oxide/solar-grade production is **very likely** to exceed 2.5 MW; **high confidence**. The central 100 MW design being sufficient is only **plausible**, with **low confidence**.
7. **Assumption/falsifier:** native metal dominates production. Representative feed assays or pilot recovery results showing substantial oxide reduction would falsify it.
8. **Decision/warrant/downside:** retain a conditional 100 MW study envelope, not a procurement authorization. Accept that the 50 kt/yr target may fall.
9. **Consequences:** prospecting and process pilots precede full array ordering; station, mining and transport requirements must be co-baselined.

**Weakest chain link:** information.  
**Additional method:** **ACH** distinguishes “documentation-only defect,” “oversized power system,” and “undersized refining architecture.” Present evidence disconfirms the original station budget but does not select uniquely between the latter alternatives.

## B. Storage and asteroid operating policy

1. **Frame/type:** operations/property decision, partly reversible but with strong throughput consequences.
2. **Criteria/weights:** survival and safe shutdown are musts; cost versus continuous production requires stakeholder valuation.
3. **Options:** no storage; critical-load storage; full-night process storage; illuminated placement; orbital generation/beaming.
4. **Assessment matrix:**

   | Option | Survival | Continuous production | Mass/cost | Heritage |
   |---|---|---|---|---|
   | No storage | Weak | Weak | Best | Depends on shutdown design |
   | Critical-load batteries | Good if outage bounded | No | Moderate | Best available |
   | Full-night batteries | Good | Better | Poor | Cycle-life challenge |
   | Illuminated placement | Site-dependent | Potentially good | Site-dependent | Target-dependent |
   | Beaming | Link-dependent | Unresolved | Unresolved | Weak |

5. **Sensitivity/trade-off:** dark interval and critical load are sensitivities. Battery mass versus throughput is a **trade-off point**.
6. **Evidence certainty:** routine L4/L5 eclipse is **very unlikely**, with **high confidence**. Four-hour asteroid darkness bounding selected operations is **unestablished**, with **low confidence**.
7. **Assumption/falsifier:** sites permit short, predictable outages. Terrain-resolved illumination showing longer darkness falsifies the provisional battery sizing.
8. **Decision/warrant/downside:** use critical-load storage provisionally; accept reduced production duty cycle and redesign if shutdown energy is larger.
9. **Consequences:** define thermal/process shutdown sequences, then size batteries; do not specify chemistry from capacity alone.

**Weakest chain link:** information, followed by values for continuous production.  
**Additional method:** **QOC** exposes that “500 MWh versus 200 MWh” omitted the important option of not maintaining full process output at night.

## C. Technology, modularity and distribution

1. **Frame/type:** interacting property decisions; electrical voltage and deployment geometry constrain later hardware choices.
2. **Criteria/weights:** qualification and fault containment are musts; delivered EOL cost is preferred over cell efficiency alone.
3. **Options:** qualified flat-plate III-V; space silicon; concentrator PV; speculative tandems. Separately: 600 V distributed buses or higher-voltage trunks.
4. **Assessment matrix:**

   | Architecture | Heritage | Area/mass | Procurement cost | Qualification risk |
   |---|---|---|---|---|
   | Flat-plate III-V | Strongest | Generally favourable | High | Lowest relative |
   | Space silicon | Substantial, design-dependent | More area | Potentially lower | Moderate |
   | Concentrator PV | Limited applicable heritage | System-dependent | Potential cell savings | Higher |
   | Unqualified tandems | Weak | Promising | Unknown | Highest |
   | Higher-voltage trunks | Limited at proposed scale | Lower conductor mass | Added protection | Higher |

5. **Sensitivity/trade-off:** voltage affects conductor mass strongly. Voltage versus arcing/protection complexity and cell efficiency versus procurement cost are **trade-off points**.
6. **Evidence certainty:** tens-of-kW deployables have flown, **high confidence**. Reliable autonomous 1–2 MW deployment and 2–5 kV networks are **plausible**, but **low confidence** at this scale.
7. **Assumption/falsifier:** modular scaling preserves specific power and deployment reliability. A representative deployment/HV test failing the mass or fault-containment target falsifies that assumption.
8. **Decision/warrant/downside:** select qualified flat plates initially; aggregate smaller subarrays; retain high voltage as a tested candidate. Accept more interfaces and potentially higher initial cost.
9. **Consequences:** qualify representative panels, harnesses and faults before freezing megawatt blocks.

**Weakest chain link:** reasoning when cell-level figures are promoted to system performance.  
**Additional method:** **GRADE EtD** separates performance claims from feasibility and resource-use evidence; the blanket/module/HV decisions have much weaker evidence than the cell choice.

## D. Cost, delivery and programme commitment

1. **Frame/type:** executive decision; mass procurement and launch bookings are difficult to reverse.
2. **Criteria/weights:** funded destination delivery is a must; lifecycle cost and schedule dominate preferences.
3. **Options:** accept $500 million; assume future cheap heavy lift; budget against present-like delivery; stage a smaller demonstration.
4. **Assessment matrix:**

   | Option | Evidence | Capital exposure | Schedule confidence |
   |---|---|---|---|
   | $500 million commitment | Unsupported | Hidden overruns | Poor |
   | Future low-cost delivery | Speculative | Potentially lower | Poor until demonstrated |
   | Present-like allowance | Better anchored | High | Architecture-dependent |
   | Staged demonstration | Best learning | Lower initially | Delays full output |

5. **Sensitivity/trade-off:** destination $/kg and W/kg drive cost. Early deployment versus learning is a **schedule/capital trade-off**.
6. **Evidence certainty:** exceeding $500 million is **very likely**, with **high confidence**. Falling within $9–41 billion is **plausible**, with **low confidence**.
7. **Assumption/falsifier:** large-scale production provides major savings from bespoke heritage. Firm compliant bids above the range, or inability to secure capacity, falsify that assumption.
8. **Decision/warrant/downside:** fund quotations, qualification and a smaller deployment stage before full commitment. Accept later full production in exchange for reduced stranded-capital risk.
9. **Consequences:** re-baseline phase cost and schedule; assign launch, PMAD and assembly once only; fund replacement explicitly.

**Weakest chain link:** information and commitment. No reconciled figure currently has supplier-backed scope or a named approving authority.  
**Additional method:** **GRADE EtD** exposes affordability and feasibility separately; **real-options reasoning** supports staged commitment rather than prematurely selecting the cheapest scenario.

### Audit of remaining reconciliation proposals and gates

| Proposal or gate | Disposition and weakest link | Evidence/test required |
|---|---|---|
| Station radiator addition | Keep; **information** is weakest | Process heat balance including chemical energy and exported hot products |
| Solar-thermal option | Preserve as optional; **reasoning** weakest | Demonstrate electrical displacement at required process temperature |
| Dust/anchoring additions | Keep; **information** weakest | Target-specific deployment and contamination tests |
| Cryogenic systems | Conditional on propellant architecture; **frame** weakest | Identify actual H₂/O₂ users and storage duration |
| Separate launch/PMAD/assembly lines | Split for accounting, not extra summed cost; **commitment** weakest | Signed responsibility and cost-boundary matrix |
| Fifteen-year replacement | Mandatory lifecycle scope; **commitment** weakest | Funded servicing plan and replaceable interfaces |
| Supplier-price gate | Strengthen | Compliant quotes with production rate, yield, qualification and warranty scope |
| Site-selection gate | Strengthen | Terrain-resolved illumination over the operating orbit and measured feed properties |
| Process-energy gate | Strengthen | Sustained representative-feed pilot including auxiliaries, recovery and purification |
| Delivery gate | Strengthen | Trajectory, packing, propellant and deployed-mass closure—not launch $/kg alone |

These are proposed acceptance gates, not established pass thresholds. Numerical margins and decision owners still require programme approval.

```yaml
item: bom-0-5
model: GPT-5.2
findings:
  - id: P0-F03
    verdict: partly
    summary: Mixed oxide and solar-grade production cannot close at 1–2.5 MW, although native-metal melting alone can approach that range.
    proposed_change: Replace the station budget with a product-dependent 35–73 MW running load supplied explicitly by bom-0-5 and make 50 kt/yr conditional.
  - id: P0-F04
    verdict: partly
    summary: Allocation and illumination closure are missing, but corrected processing loads can justify much of a conditional 100 MW envelope.
    proposed_change: Provisionally allocate 80 MW BOL to the station and four 5 MW BOL local systems, with 2.4–6.4 MWh critical-load storage pending site profiles.
  - id: P0-F05
    verdict: agree
    summary: The $5/W installed estimate lacks flight-hardware and destination-delivery support.
    proposed_change: Replace the $500 million allowance with a low-confidence $9–41 billion initial delivered-package envelope and obtain compliant quotations.
revised_spec:
  - parameter: aggregate_reference_BOL_capacity
    old: 100
    new: 100
    range: [80, 130]
    unit: MW at 1 AU
    basis: judgement
    confidence: low
  - parameter: station_reference_BOL_allocation
    old: unspecified
    new: 80
    range: [60, 110]
    unit: MW at 1 AU
    basis: calculation
    confidence: low
  - parameter: aggregate_mining_reference_BOL_allocation
    old: unspecified
    new: 20
    range: [12, 24]
    unit: MW at 1 AU
    basis: calculation
    confidence: low
  - parameter: station_running_load
    old: 1–2.5
    new: 49
    range: [35, 73]
    unit: MW
    basis: calculation
    confidence: low
  - parameter: critical_load_storage
    old: 200–500
    new: 4.3
    range: [2.4, 6.4]
    unit: MWh nameplate
    basis: calculation
    confidence: low
  - parameter: array_system_specific_power
    old: unspecified
    new: 100
    range: [80, 150]
    unit: W/kg
    basis: judgement
    confidence: low
  - parameter: array_package_mass
    old: unspecified
    new: 1000
    range: [670, 1250]
    unit: t
    basis: calculation
    confidence: medium
  - parameter: qualified_cell_efficiency
    old: 32–36
    new: 30
    range: [29, 32]
    unit: percent BOL
    basis: literature
    confidence: medium
  - parameter: candidate_trunk_voltage
    old: 600
    new: 3000
    range: [2000, 5000]
    unit: V DC pending qualification
    basis: calculation
    confidence: low
  - parameter: initial_delivered_package_cost
    old: 500000000
    new: 20000000000
    range: [9000000000, 41000000000]
    unit: USD planning allowance
    basis: judgement
    confidence: low
interfaces:
  - with: bom-0-1
    flow: data
    value: 4 site-characterisation datasets
    in_bom: true
  - with: bom-0-2
    flow: power
    value: 0.4–1 MW operating locally
    in_bom: true
  - with: bom-0-3
    flow: power
    value: 43 MW average and 49 MW running reference
    in_bom: true
  - with: bom-0-3
    flow: other
    value: 30–60 MW heat-rejection screening requirement
    in_bom: false
  - with: bom-0-4
    flow: mass
    value: 670–1250 t initial arrays plus 15–80 t batteries
    in_bom: false
  - with: bom-0-6
    flow: power
    value: 4 MW aggregate running reference
    in_bom: true
  - with: bom-0-6
    flow: propellant
    value: 630–1580 t/yr water processed in the illustrative daylight case
    in_bom: true
bom_delta:
  - action: resize
    item: bom-0-5
    quantity: 100 MW conditional reference BOL package
    unit_cost_usd: [90000000, 410000000]
    rationale: Cost per reference MW includes initial hardware, delivery, assembly, small storage, development and reserves without separately summing those elements.
  - action: split
    item: bom-0-5
    quantity: 80 MW station plus four 5 MW local systems
    unit_cost_usd: [90000000, 410000000]
    rationale: This is an accounting split of the resized package and not an additional cost.
  - action: remove
    item: 200–500 MWh bulk-storage requirement
    quantity: 1 unsupported requirement
    unit_cost_usd: [0, 0]
    rationale: Replace it with outage-derived critical-load storage inside the package rather than assuming full-power night operation.
open_questions:
  - What does 50 kt/yr measure and what product slate and recovery are required?
  - What is the missing P0-F01 requirement?
  - Which asteroid sites and terrain-resolved illumination profiles bound the operating design?
  - What sustained representative-feed energy consumption can the refining and ISPP pilots demonstrate?
  - Which users consume the hydrogen and oxygen produced by ISPP?
  - What compliant supplier quotations and destination-delivery contracts support the cost envelope?
  - Who owns and funds station heat rejection, cryogenics, array servicing and fifteen-year replacement?
  - What shutdown energy and battery cycle life follow from the selected operating policy?
```
