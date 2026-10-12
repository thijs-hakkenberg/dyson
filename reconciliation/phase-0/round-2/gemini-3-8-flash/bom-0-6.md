---
phase: phase-0
item: bom-0-6
round: 2
type: reassessment
modelId: gemini-3-8-flash
modelName: "Gemini 3.8 Flash"
endpoint: databricks-gemini-3-8-flash
findings: b907d2fc76f4
priorRound: 1
framework: 18f503fe4ec6
generated: 2026-10-12T09:39:38.615Z
seconds: 43.275
---

# In-Situ Propellant Production Systems (bom-0-6) — Senior Systems Engineer Re-Assessment

## 1. Findings

### P0-F11: Propellant supply for the tugs is not in the BOM, and ISPP output has no Phase 0 consumer
- **Verdict:** Agree.
- **Reasoning & Calculation:** 
  The cargo transport vehicles (`bom-0-4`) specify krypton/iodine electric propulsion (EP). World production of xenon is ~50–70 t/yr (exhausted immediately); krypton is ~300–600 t/yr (byproduct of industrial air separation units; liquefying ~350 Mt air yields ~1,000 t Kr); iodine is ~35,000–40,000 t/yr (USGS 2024, Chile/Japan brine extraction).
  
  Assume 15 transport tugs moving material from Near-Earth Asteroids (NEAs) to L4/L5. 
  For a pilot asteroid retrieval or material delivery mission carrying $M_{\text{dry}} + M_{\text{payload}} \approx 200\text{ t}$ round trip with $\Delta V_{\text{round-trip}} \approx 4{,}000\text{ m/s}$ (low-thrust spiral + transfer):
  $$M_f / M_0 = \exp(-\Delta V / (I_{\text{sp}} g_0))$$
  At $I_{\text{sp}} \approx 1{,}800\text{ s}$ (iodine Hall/gridded-ion):
  $$M_0 / M_f = \exp(4{,}000 / (1{,}800 \times 9.80665)) = \exp(0.2266) \approx 1.254$$
  Propellant per trip = $M_0 - M_f \approx 200 \times 0.254 = 50.8\text{ t}$.
  For 15 tugs operating 1 trip every 1.5–2 years: annual propellant demand is $\sim 380\text{--}510\text{ t/yr}$.
  If krypton is selected, 500 t/yr consumes 80–160% of the entire global annual production, causing catastrophic supply failure. Iodine easily supports 500 t/yr (~1.3% of global market), but iodine propellant must be launched from Earth at $10{,}000–$20,000/kg delivered to L4/L5 ($5B–$10B/yr logistics bill).
  
  Crucially, `bom-0-6` produces high-purity water, LOX, and LH₂/GH₂. Neither krypton nor iodine is produced by `bom-0-6`. Conversely, no Phase 0 vehicle burns LOX/LH₂. Thus, `bom-0-6` has literally zero consumers in Phase 0 unless:
  1. `bom-0-4` tugs switch to water-fueled propulsion (e.g., water-plasma RF/Hall thrusters at $I_{\text{sp}} \approx 1{,}000–1{,}500\text{ s}$ or steam-thermal RCS/apogee kick), OR
  2. A dedicated high-thrust chemical LOX/LH₂ transport/shuttle stage is added to the BOM, OR
  3. `bom-0-6` deployment is deferred until Phase 0B/Phase 1 when demand exists, storing only raw captured water in Phase 0A.
- **Proposed Change:** Formally decouple Phase 0A water capture from chemical fuel production. Settle `bom-0-4` baseline to either iodine (Earth-supplied) or water-EP (ISRU-supplied). Move full electrolysis/liquefaction (`bom-0-6`) to Phase 0B gated on vehicle demand.

---

### P0-F15: Eight of nine concluded deliberations were never written back into the specs
- **Verdict:** Agree.
- **Reasoning & Calculation:** 
  The consensus file (`PD-P0-ISPP-SYNTHESIS-001`) still details a standalone lunar south pole base or independent NEA mining skid with counter-rotating bucket wheels heating regolith to 1,000 °C, ignoring:
  - **rq-0-14:** ISPP must be integrated into `bom-0-3` at L4/L5; Phase 0A only deploys volatile capture (5–10 t condenser/storage, $50–150M reservation); full electrolysis deferred to Phase 0B pending $\ge 25\text{ kt/yr}$ station ore throughput.
  - **rq-0-30:** Sunshield eliminates 95% of solar load; two-stage active cooling (80 K broad-area cooling + 20 K cold head); 20 K cooling requirement is 15–40 W heat leak requiring ~1.5–3.5 kWe cryocooler input (not 700 W, which violates Carnot limits at realistic 15–20% efficiencies); LH₂ subcooling to 15 K provides 190 days thermal margin.
  - **rq-0-47:** Non-spinning station with capillary Propellant Management Devices (PMDs); modular 3-layer sunshield (12 gores) reducing heat leak to 40–135 W.
  - **rq-0-48:** Load-Bearing MLI (LBMLI) degrades 2.0–3.5× over 20 years; cryocooler sizing must hold 3× margin, power 4× margin.
- **Proposed Change:** Overhaul `bom-0-6` specification to define a modular, station-hosted ISPP plant at L4/L5. Update thermal, power, and structural provisions per rq-0-14, rq-0-30, rq-0-47, and rq-0-48.

---

### P0-F16: Consensus documents disagree with the BOM they describe
- **Verdict:** Agree.
- **Reasoning & Calculation:** 
  The phase BOM table lists: *"4 units, $500M each ($2.00B total), dual counter-rotating bucket-wheel excavation, heats regolith to 1000C"*. The consensus narrative discusses a Lunar South Pole MRE plant at 1,600 °C and an EML1 depot. Both contradict rq-0-14's station-integrated architecture at L4/L5. 
  
  Physics of extraction: Carbonaceous chondrite volatiles (CI/CM) consist of adsorbed water desorbing at 100–200 °C, and phyllosilicates (serpentine, saponite) dehydroxylating at 400–750 °C (King et al. 2015, Garenne et al. 2014). Heating to 1,000 °C unnecessarily expends sensible heat ($C_p \approx 0.8–1.1\text{ kJ/kg}\cdot\text{K}$, adding $\sim 250\text{ kWh}_{\text{th}}\text{/t}$ regolith) and liberates toxic sulfides ($H_2S$, $SO_2$) and heavy hydrocarbons that poison PEM electrolyzer membranes.
- **Proposed Change:** Rewrite `bom-0-6` line item to reflect 1 operational station-integrated plant (plus 1 flight spare/ground qualification unit) at Sun-Earth L4/L5, operating at 450–700 °C stepped thermal desorption, priced at $400M–$600M total for Phase 0B.

---

## 2. Revised Specification

| Parameter | Old Value | New Value (Consensus/Closed) | Range | Unit | Basis | Confidence |
|---|---|---|---|---|---|---|---|
| **Deployment Location** | Lunar South Pole / NEA surface | Station-integrated (`bom-0-3`) at Sun-Earth L4/L5 | Fixed | — | Architecture decision (rq-0-14) | High |
| **Phasing Architecture** | Phase 0 monolithic deployment | Phase 0A: Interface reservation & volatile trap; Phase 0B: Electrolysis/Liquefaction | Phase 0A $\rightarrow$ Phase 0B | — | Deliberation rq-0-14 | High |
| **Volatile Desorption Temp** | 1,000 °C | 450–650 °C (stepped 150 °C / 500 °C) | 400–750 | °C | Mineralogy (phyllosilicate dehydroxylation) | High |
| **Desorption Thermal Energy** | Unspecified | 0.22 | 0.15–0.35 | $\text{kWh}_{\text{th}}\text{/kg ore}$ | Heat capacity & enthalpy of vaporization | High |
| **Water Electrolysis Energy** | 4–8 $\text{kWh/kg H}_2\text{O}$ | 5.8 | 5.2–6.5 | $\text{kWh}_e\text{/kg H}_2\text{O}$ | Flight-adapted PEM/SOEC stack data | High |
| **Electrolyzer Plant Capacity** | Unspecified (100–120 t LOX/LH₂) | 500 (Water basis: yields 444 t LOX + 56 t LH₂) | 250–1,000 | t/yr H₂O input | Sized to $\ge 25\text{ kt/yr}$ ore at 2–5% recovery | Medium |
| **Continuous Electric Power** | 250 kWe | 450 | 300–750 | kWe | Electrolysis (330 kW) + cryo/aux (120 kW) | High |
| **LH₂ ZBO Active Cooling Power** | 0.70 kWe (rq-0-30 claim) | 2.8 | 1.8–4.5 | kWe | Carnot COP at 20 K (15% efficiency) for 35 W leak | High |
| **Sunshield Diameter** | Unspecified (or 60 m monolithic) | 35 (modular 12-gore disk) | 25–45 | m | Sized for tank shadow at L4/L5 | Medium |
| **Hardware Mass (Dry Module)** | 18,000 kg (GPT) / 4,500 kg (Gemini) | 12,000 | 8,000–16,000 | kg | Sizing with PEM stacks, compressors, MLI | Medium |
| **Unit Cost (Phase 0B)** | $500M | $450M | $350M–$650M | USD | NRE ($250M) + flight skid ($200M) | Medium |
| **Total Line Item Cost** | $2.00B (4 units) | $600M | $450M–$800M | USD | 1 Phase 0A reservation ($100M) + 1 Phase 0B plant ($500M) | Medium |

### Engineering Physics Sanity Checks:
1. **Electrolysis Power:**
   Processing 500 t water per year at 90% duty cycle ($7{,}884\text{ hours/yr}$):
   $$\dot{m}_{\text{H}_2\text{O}} = \frac{500{,}000\text{ kg}}{7{,}884\text{ hr}} = 63.42\text{ kg/hr} = 0.0176\text{ kg/s}$$
   At $5.8\text{ kWh}_e\text{/kg}$:
   $$P_{\text{electrolysis}} = 63.42\text{ kg/hr} \times 5.8\text{ kWh/kg} = 367.8\text{ kWe}$$
2. **Cryocooler Power at 20 K:**
   Ideal Carnot coefficient of performance for cooling at $T_c = 20\text{ K}$ rejecting to $T_h = 250\text{ K}$ (radiator):
   $$\text{COP}_{\text{Carnot}} = \frac{T_c}{T_h - T_c} = \frac{20}{250 - 20} = 0.0870 \implies \frac{1}{\text{COP}} = 11.5\text{ W}_e\text{/W}_{\text{th}}$$
   State-of-the-art flight pulse-tube or reverse-Brayton coolers achieve 10–18% of Carnot efficiency at 20 K:
   $$\text{COP}_{\text{real}} = 0.15 \times 0.0870 = 0.01305 \implies \frac{1}{\text{COP}_{\text{real}}} \approx 76.6\text{ W}_e\text{/W}_{\text{th}}$$
   For a post-sunshield, LBMLI-insulated residual heat leak of $35\text{ W}_{\text{th}}$:
   $$P_{\text{cryocooler}} = 35\text{ W}_{\text{th}} \times 76.6\text{ W}_e\text{/W}_{\text{th}} \approx 2{,}680\text{ W}_e = 2.68\text{ kWe}$$
   *Verdict:* The previous claim of 700 W is physically unachievable (requires >55% Carnot efficiency at 20 K, which does not exist anywhere in cryogenics). The true power is ~2.7 kWe per 100 t tank, well within station margins.

---

## 3. Interfaces

| Interface With | Flow Type | Value | In Current BOM? | Engineering Description |
|---|---|---|---|---|
| **bom-0-3** (Station) | Structural / Mass | 12,000 kg skid | **False** | Skid mounted to station truss in Phase 0B |
| **bom-0-3** (Station) | Ore / Volatile Feed | 500–1,500 t/yr raw volatiles | **False** | Raw water condenser stream from smelter off-gas |
| **bom-0-5** (Solar Power) | Electric Power | 450–750 kWe continuous | **Partially** | Shared 100 MW array / 2.5–5 MW station bus |
| **bom-0-3** (Station) | Waste Heat Rejection | 350–500 kWth | **False** | Electrolyzer and condenser radiator heat loop |
| **bom-0-4** (Tugs) | Propellant (Water) | 0–1,000 t/yr H₂O | **False** | Required if tugs use water-EP; 0 if tugs use I₂ |
| **bom-0-4** (Tugs) | Propellant (LOX/LH₂) | 0 t/yr (Phase 0) | **False** | No chemical consumer in Phase 0 BOM |
| **bom-0-3** (Station) | Data / Avionics | 2 Mbps telemetry | **True** | Station C&DH, supervisory autonomous control |

---

## 4. Missing Items or Scope

1. **Station Volatile Condensation and Pre-Purification Subsystem (in `bom-0-3`):** Raw gases desorbed from carbonaceous chondrites contain $H_2O$, $CO_2$, $CO$, $H_2S$, $SO_2$, and organic tar aerosols. Feeding this into a PEM electrolyzer poisons catalyst surfaces (Pt/Ir) within hours. A multi-stage fractional condenser, catalytic tar cracker, and deionizing filtration bed ($5,000\text{ kg}$, ~$120M NRE) must precede the ISPP water inlet.
2. **Microgravity Fluid Phase Separator for Electrolysis:** Electrolyzers generate $H_2$ and $O_2$ bubbles that do not detach passively in microgravity without buoyancy. Requires passive membrane-phase separators or a local low-gravity centrifuge/carousel ($0.05–0.1\text{ g}$).
3. **Propellant Transfer & Quick-Disconnect Interface:** Zero-boil-off depot-to-tug cryogenic fluid transfer arms and mass-gauging systems in microgravity are completely absent from the BOM.
4. **Hydrogen Disposition System:** If producing LOX for high-thrust stages or life support, 1 kg of $H_2$ is generated per 8 kg of $O_2$. Without LH₂ liquefaction or water-EP, handling 50–100 t/yr of flammable gaseous hydrogen ($GH_2$) requires either an active catalytic burner (reacting with excess mineral oxides) or high-pressure jettison compressors.

---

## 5. Remaining Disagreements and Open Questions

1. **Water-EP vs. Iodine-EP for Cargo Fleet (`bom-0-4`):**
   - *Camp A (Iodine):* High $I_{\text{sp}}$ (1,800 s), compact storable propellant, commercial thruster heritage (Busek, ThrustMe). Downside: Requires launching 400–600 t/yr from Earth ($4B–$8B/yr lifecycle cost).
   - *Camp B (Water):* Eliminates Earth propellant logistics; closes `bom-0-6` business case. Downside: Lower $I_{\text{sp}}$ (800–1,200 s), higher erosion on RF/microwave discharge chambers, lower TRL at multi-hundred-kW power levels.
2. **LH₂ Cryogenic Liquefaction vs. Water/GH₂ Storage:**
   - Cryogenic LH₂ requires a dedicated 20 K refrigeration plant, vacuum-jacketed transfer, and a large sunshield, creating substantial development and boil-off risk for a product with no Phase 0 customer. 
   - Deferring LH₂ liquefaction entirely—storing water in simple bladder tanks and only cracking to LOX/GH₂ on demand—saves ~$250M in initial flight hardware and 60% of plant power.

---

## 6. Decision-Quality Critique

### Decision 1: Phasing of ISPP Deployment (Phase 0A vs Phase 0B Deferral)
- **1. Frame & Decision Type:** Reversible executive/programmatic phasing decision. Cynefin: *Complicated*.
- **2. Criteria & Weights:** 
  - Capital preservation before ore flow confirmed ($w = 0.35$).
  - Avoidance of architectural lock-out ($w = 0.30$).
  - System mass/volume on FOAK station launch ($w = 0.20$).
  - Early tech demonstration value ($w = 0.15$).
- **3. Options:**
  - *Option 1 (Baseline BOM):* Deploy full 4-unit ISPP on Day 1 ($2.0B).
  - *Option 2 (Full Deletion):* Remove ISPP from Phase 0 entirely; import Earth fuel.
  - *Option 3 (rq-0-14 Scaffold):* Design-for in Phase 0A (structural hardpoints, 5 MW bus routing, volatile condenser); deploy ISPP skid in Phase 0B after $\ge 25\text{ kt/yr}$ ore gate is achieved.
- **4. Assessment Matrix (QOC Framework):**
  - Option 1 scores terrible on capital efficiency (spends $2B before any ore arrives).
  - Option 2 creates a multi-billion dollar retrofit penalty later.
  - Option 3 achieves 90% of Option 1's utility at 10% of upfront Phase 0A cost ($100M reservation vs $2,000M plant).
- **5. Sensitivity vs Trade-Off Points:**
  - *Sensitivity:* Highly sensitive to the delivery schedule of raw asteroid ore. If asteroid delivery slips by 3 years, Option 1 sits idle at $2B capital cost.
  - *Trade-off:* Delays operational propellant flight demonstration by 3–4 years in exchange for saving $1.5B in near-term capital expenditure.
- **6. Evidence Certainty:**
  - *Likelihood:* High (>90%) that deploying unneeded electrolysis plants on an unproven station creates technical debt.
  - *Confidence:* High (established NASA/DoD systems engineering phase-gating).
- **7. Key Assumptions & Falsification:**
  - *Assumption:* Structural interfaces and power buses can be plumbed cleanly for later modular attachment.
  - *Falsification:* Station thermal/structural architecture undergoes redesign that invalidates Phase 0A docking interfaces.
- **8. Decision, Warrant, Accepted Downside:**
  - *Decision:* Adopt Option 3 (rq-0-14 Phased Strategy).
  - *Warrant:* Sunk capital must not be deployed before feedstock delivery is validated.
  - *Accepted Downside:* Chemical propulsion vehicles cannot be refueled at L4/L5 during Phase 0A.
- **9. Consequences:** Unlocks station mass margin for primary smelting metallurgy; reduces Phase 0A BOM commitment by $1.4B.
- **Weakest DQ Link:** *Commitment.* Program leadership must enforce the $\ge 25\text{ kt/yr}$ ore gate against political pressure to fly an early "prestige" fuel demo.

---

### Decision 2: Cryogenic LH₂ Liquefaction in Phase 0B vs. Water-Only / LOX-Only Storage
- **1. Frame & Decision Type:** Architecture Property Decision. Cynefin: *Complicated*.
- **2. Criteria & Weights:** 
  - Complexity & mass penalty ($w = 0.30$).
  - Propulsion performance ($I_{\text{sp}}$) ($w = 0.25$).
  - Power & thermal overhead ($w = 0.25$).
  - TRL / microgravity fluid handling maturity ($w = 0.20$).
- **3. Options (ACH Matrix):**
  - *Hypothesis/Option A:* Full LOX/LH₂ liquefaction with 20 K active ZBO (rq-0-30 baseline).
  - *Hypothesis/Option B:* Water-only storage; water directly used for EP or cracked on-demand for LOX with $H_2$ venting.
  - *Hypothesis/Option C:* LOX liquefaction (90 K) + high-pressure $GH_2$ storage (350 bar).
- **4. Assessment Matrix:**
  - Option A requires a 60 m sunshield, 20 K cryocoolers, and complex transfer arms for 100 t of LH₂, for which there is zero Phase 0 demand.
  - Option B eliminates cryogenics entirely, storing liquid water in lightweight bladder tanks at 280 K with trivial thermal control.
  - Option C recovers 88.9% of propellant mass as LOX with high-efficiency 90 K Stirling coolers (COP ~0.15) without the extreme thermal penalties of 20 K.
- **5. Sensitivity vs Trade-Off Points:**
  - *Trade-off Point:* Option A maximizes theoretical chemical $I_{\text{sp}}$ (450 s) at the cost of immense subsystem fragility. Option B minimizes mass and failure modes at the cost of requiring electric propulsion for all transport maneuvers.
- **6. Evidence Certainty:**
  - *Certainty of Evidence (GRADE):* Moderate. Liquid hydrogen zero-boiloff at 100-tonne scale has zero operational flight history in deep space.
- **7. Key Assumptions & Falsification:**
  - *Assumption:* Electric propulsion (water or iodine) can satisfy all required $\Delta V$ and transit-time constraints for Phase 0 cargo without requiring chemical LOX/LH₂ stages.
  - *Falsification:* Trajectory models reveal asteroid retrieval requires fast impulsive chemical burn to capture into L4/L5 without escaping Earth-Moon orbit.
- **8. Decision, Warrant, Accepted Downside:**
  - *Decision:* Baseline Option B (Water storage) with Option C provisions (LOX on-demand). Defer Option A (LH₂ liquefaction) to Phase 1.
  - *Warrant:* Hydrogen comprises only 11.1% of water mass. Liquid hydrogen storage at 20 K represents >80% of the thermal management risk and power draw.
  - *Accepted Downside:* Hydrogen is either vented or stored as low-density $GH_2$, forfeiting high-thrust cryogenic chemical stages in Phase 0.
- **9. Consequences:** Sunshield size reduced from 60 m to 25–35 m; active cryocooler electrical draw drops from tens of kWe to <3 kWe; eliminates boiling catastrophic failure modes during initial station ops.
- **Weakest DQ Link:** *Information.* Trajectory analysis for `bom-0-4` tugs is not finalized, leaving open the slight risk that an impulsive chemical burn is strictly required for certain capture windows.

---

```yaml
item: bom-0-6
model: senior-systems-engineer
findings:
  - id: P0-F11
    verdict: agree
    summary: Cargo tugs consume krypton or iodine while ISPP produces chemical water/LOX/LH2, leaving ISPP with zero Phase 0 consumers and creating an unsupplied Earth-logistics propellant bottleneck.
    proposed_change: Decouple Phase 0A water capture from chemical fuel processing, baseline tug propulsion to water-EP or establish Earth-supplied iodine logistics, and defer full electrolysis to Phase 0B.
  - id: P0-F15
    verdict: agree
    summary: Concluded deliberations rq-0-14, rq-0-30, rq-0-47, and rq-0-48 are missing from the specification, leaving erroneous thermal, structural, and site baselines.
    proposed_change: Update specification to reflect station-hosted deployment at L4/L5, two-stage LBMLI thermal cooling, non-spinning capillary fluid architecture, and phased capital expenditure.
  - id: P0-F16
    verdict: agree
    summary: The phase BOM describes standalone 1,000 °C NEA bucket-wheel units while the consensus describes a lunar south pole plant, both conflicting with station integration.
    proposed_change: Rebaseline item to a single station-integrated volatile processing and electrolysis plant at L4/L5 operating at 450–650 °C stepped desorption.
revised_spec:
  - parameter: deployment_location
    old: Lunar South Pole / NEA surface
    new: Station-integrated (bom-0-3) at Sun-Earth L4/L5
    range: [fixed]
    unit: none
    basis: architecture decision (rq-0-14)
    confidence: high
  - parameter: module_phasing
    old: Monolithic Phase 0
    new: Phase 0A interface reservation, Phase 0B production plant
    range: [Phase 0A, Phase 0B]
    unit: none
    basis: architecture deliberation
    confidence: high
  - parameter: extraction_temperature
    old: 1000 °C
    new: 550
    range: [400, 750]
    unit: °C
    basis: literature (King et al. 2015, Garenne et al. 2014)
    confidence: high
  - parameter: specific_energy_electrolysis
    old: 4–8 kWh/kg H2O
    new: 5.8
    range: [5.2, 6.5]
    unit: kWhe/kg H2O
    basis: flight PEM data
    confidence: high
  - parameter: continuous_electric_power
    old: 250 kWe
    new: 450
    range: [300, 750]
    unit: kWe
    basis: calculation (500 t/yr H2O + aux/cryo)
    confidence: high
  - parameter: cryocooler_power_20K
    old: 0.70 kWe
    new: 2.8
    range: [1.8, 4.5]
    unit: kWe
    basis: calculation (Carnot at 15% efficiency for 35 W heat leak)
    confidence: high
  - parameter: sunshield_diameter
    old: unspecified
    new: 35
    range: [25, 45]
    unit: m
    basis: geometry and thermal ray tracing
    confidence: medium
  - parameter: module_dry_mass
    old: 18000 kg (GPT) / 4500 kg (Gemini)
    new: 12000
    range: [8000, 16000]
    unit: kg
    basis: mass estimation from subsystem breakdown
    confidence: medium
interfaces:
  - with: bom-0-3
    flow: mass
    value: 12000 kg dry skid
    in_bom: false
  - with: bom-0-3
    flow: other
    value: 500-1500 t/yr raw volatiles
    in_bom: false
  - with: bom-0-5
    flow: power
    value: 450 kWe continuous
    in_bom: true
  - with: bom-0-3
    flow: other
    value: 400 kWth waste heat
    in_bom: false
  - with: bom-0-4
    flow: propellant
    value: 0-1000 t/yr water
    in_bom: false
  - with: bom-0-4
    flow: propellant
    value: 0 t/yr LOX/LH2
    in_bom: false
bom_delta:
  - action: resize
    item: bom-0-6
    quantity: 1
    unit_cost_usd: [350000000, 650000000]
    rationale: Resize from 4 independent surface plants ($2B) to 1 station-integrated Phase 0B processing plant with reserved Phase 0A interfaces.
  - action: add
    item: volatile-prepurification-skid
    quantity: 1
    unit_cost_usd: [80000000, 150000000]
    rationale: Pre-purification, tar scrubbing, and gas cleanup required to prevent rapid fouling and poisoning of PEM electrolyzer membranes.
open_questions:
  - Will transport tugs (bom-0-4) baseline to Earth-launched iodine EP or asteroid-derived water EP, and can water EP reach flight qualification at multi-hundred-kW scale by Year 3?
  - Does trajectory and orbital insertion mechanics require high-thrust chemical stages, or can all Phase 0/Phase 1 logistics operate purely via electric propulsion?
  - What is the measured concentration of catalyst-poisoning sulfur and nitrogen volatiles released during initial asteroid core thermal extraction?
```
