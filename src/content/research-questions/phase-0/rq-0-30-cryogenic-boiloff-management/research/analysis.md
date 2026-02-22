---
questionId: "rq-0-30"
analysisDate: "2026-02-13"
status: "partial-answer"
confidence: "medium"
---

# Cryogenic Boiloff Management at L4/L5: Literature Analysis

## Executive Summary

This analysis reviews published research on cryogenic hydrogen storage thermal performance and autonomous fluid management to inform the Material Processing Station's propellant storage design for Project Dyson. **The initial arxiv review identified six papers but noted that the majority of CFM literature resides in AIAA journals, NASA Technical Memoranda, and the journal *Cryogenics*.** An extended review of 15 non-arxiv sources now substantially fills those gaps. The NASA zero-boiloff program (Plachta, Kittel, Notardonato) has demonstrated ZBO at 125,000L scale on the ground. ULA depot designs (Kutter, Zegler) provide sunshield architectures specifically noting Lagrange point thermal simplification. MLI degradation data (Finckenor, Johnson) quantifies the 1.6-4x real-world performance penalty. And the comprehensive Gandolfi 2024 review confirms that many physical knowledge gaps remain. **The fundamental finding: the physics is well-characterized, the ground demonstrations are encouraging, but flight cryocoolers are 2-3 orders of magnitude below station requirements, making this the critical scaling challenge.**

---

## 1. Thermal Performance of Cryogenic Storage

### 1.1 LH2 Tank Heat Ingress Modeling

Aasen et al. (arxiv:2501.18451) provide the most directly applicable thermal analysis:

**Key Results:**
- Heat ingress at LH2 temperatures (20 K) increases less than 26% compared to standard LN2 (77 K) baseline
- Sensitivity varies significantly between hot-side and cold-side boundary temperatures
- Warmer outer surfaces have greater impact on total heat leak
- Thermal network models achieve ~1% accuracy in heat ingress estimation
- Cold-spot temperature predictions accurate within 1 K

**Modeling Approaches Compared:**
| Method | Accuracy | Speed | Complexity |
|--------|----------|-------|-----------|
| Thermal network model | ~1% | Fast | Low |
| Finite element (heat equation) | Reference | Slow | High |

**Application to L4/L5 Storage:**
The thermal network approach provides a fast, reliable method for sizing insulation systems. For the Material Processing Station at L4/L5:

- **Hot-side temperature**: ~370 K (Sun-facing surface at 1 AU with degraded MLI)
- **Cold-side temperature**: 20.3 K (LH2 boiling point at 1 atm)
- **Temperature differential**: ~350 K—among the most severe possible for cryogenic storage
- The <26% increase finding means existing LN2-validated insulation designs can be adapted with manageable corrections

**Critical Gap:**
The paper addresses terrestrial/maritime storage, not orbital conditions. In space:
- No atmospheric convection (beneficial—eliminates one heat transfer path)
- Continuous solar radiation from all angles not blocked by structure (detrimental)
- Micrometeoroid impact degradation of MLI over decades (not modeled)
- Radiative environment at L4/L5 includes both solar and reflected Earth/Moon flux

### 1.2 Thermal Analysis Implications for Tank Sizing

Using the Aasen et al. framework, rough estimates for L4/L5 storage:

**Assumptions:**
- MLI effective emissivity: 0.001-0.01 (20-80 layers)
- Tank surface area: ~500 m² (100-tonne spherical tank, ~5 m radius)
- Solar flux: 1,361 W/m² (with sunshield reducing effective flux by 99%)

**Estimated Heat Leak:**
- With 99% effective sunshield + 60-layer MLI: ~50-200 W total heat ingress
- Without sunshield (worst case): ~5,000-10,000 W—boiloff of ~150-400 kg/day

**Conclusion:**
Passive thermal control (sunshield + MLI) is mandatory. Even with excellent passive control, active cryocoolers are likely needed for zero-boiloff at this scale. Cryocooler power requirement: 100-500 kW depending on residual heat leak and efficiency.

---

## 2. Autonomous Cryogenic Fluid Management

### 2.1 ARCTIC Framework

Cheng et al. (arxiv:2508.21802) present the state of the art for autonomous CFM:

**ARCTIC System:**
- Lightweight data-driven framework merging sensor data with precomputed simulations
- Correction layer enables continuous adaptation to changing conditions
- Validated against NASA experimental data from cryogenic test facilities
- Low computational overhead suitable for onboard spacecraft systems

**Key Capabilities:**
- Real-time prediction of tank pressure and temperature evolution
- Early warning of approaching boiloff conditions
- Adaptive response to insulation degradation or thermal environment changes
- Autonomous cryocooler power scheduling optimization

**Application to Material Processing Station:**
The station's propellant storage system requires autonomous management during extended periods between vehicle visits. ARCTIC-type systems could:
1. Monitor all storage tanks continuously
2. Predict boiloff windows based on thermal environment forecasts
3. Optimize cryocooler duty cycles to minimize power consumption
4. Detect insulation degradation or micrometeoroid damage early
5. Schedule propellant transfers and vehicle loading operations

---

## 3. Solid-State Storage Alternatives

### 3.1 Metal Hydride Storage

Three papers address solid-state hydrogen storage that could eliminate boiloff entirely:

**Ioannidou et al. (arxiv:1303.5112) — V-Ti-Cr/Mn alloys:**
- Evaluate hydrogen absorption kinetics of vanadium-based alloys
- Melt-spun ribbons show improved performance over bulk alloys
- Moderate gravimetric capacity (~2-3 wt%)
- Room-temperature operation—no cryogenic requirement

**Pasini et al. (arxiv:1307.0890) — System requirements analysis:**
- Systematic methodology for evaluating hydride storage systems
- Identifies gravimetric capacity, volumetric capacity, and thermodynamics as key parameters
- Establishes DOE targets that translate to space application requirements
- Framework directly applicable to station storage architecture evaluation

**Makridis et al. (arxiv:1304.1959) — MgH2 nanocomposites:**
- Mg-based hydrides offer 7.6 wt% theoretical capacity (best among practical hydrides)
- Laser ablation improves sorption kinetics
- Operating temperature: 300-350°C
- Nanostructuring reduces activation energy barriers

### 3.2 Trade: Cryogenic vs. Solid-State

| Parameter | Cryogenic LH2 | Metal Hydride (MgH2) | Metal Hydride (V-alloy) |
|-----------|---------------|----------------------|------------------------|
| Gravimetric capacity | 100% (pure H2) | ~7.6 wt% max | ~2-3 wt% |
| Storage mass per tonne H2 | Tank: ~5-10 t | Hydride: ~13-50 t | Hydride: ~33-100 t |
| Operating temperature | 20 K | 300-350°C | Ambient |
| Boiloff risk | High | Zero | Zero |
| Power for thermal control | 100-500 kW (cooling) | 10-50 kW (heating) | Minimal |
| Technology readiness (space) | TRL 3-4 | TRL 2-3 | TRL 2-3 |

**Assessment:**
For hydrogen storage specifically, the mass penalty of solid-state storage is severe (13-100x the hydrogen mass in storage material). At 70-130 tonnes of propellant per year production rate, the storage material mass could exceed the station's entire mass budget. **Cryogenic storage with active cooling remains the practical choice for bulk LH2**, but solid-state storage may serve as a buffer or emergency reserve system.

For LOX storage (90 K boiling point), the thermal challenge is significantly less severe. Standard MLI with minimal active cooling may achieve near-zero boiloff for LOX.

---

## 4. Application to Project Dyson Station Design

### 4.1 Recommended Storage Architecture

**Primary LH2 Storage:**
- Spherical tanks with 60-80 layer MLI
- Deployable sunshield system (inflatable or rigid) blocking >99% of direct solar flux
- Shadow-casting station structure provides additional passive cooling
- Active cryocoolers (reverse-Brayton or pulse-tube) for residual heat removal
- ARCTIC-type autonomous management system

**LOX Storage:**
- Standard MLI (30-40 layers) may suffice given 90 K boiling point
- Passive thermal control with minimal active backup
- Simpler management system due to larger thermal margin

**Emergency Reserve:**
- Small metal hydride buffer (1-5 tonnes H2 capacity)
- Provides propellant availability during cryocooler maintenance
- No boiloff risk for critical reserve fuel

### 4.2 Power Budget Implications

| Component | Power (kW) | Fraction of Station Budget |
|-----------|-----------|---------------------------|
| Cryocoolers (LH2, ZBO) | 100-500 | 3-15% of 3.25 MW |
| Cryocoolers (LOX) | 10-30 | 0.3-1% |
| Thermal monitoring/control | 1-5 | <0.2% |
| Hydride buffer heating | 10-50 (intermittent) | 0.3-1.5% |
| **Total** | **120-585** | **4-18%** |

The 4-18% power allocation range is significant. The lower end (with excellent passive thermal control) is manageable; the upper end (poor passive control or large storage volume) would compete with processing operations for power.

### 4.3 Key Design Decisions Requiring Resolution

1. **Sunshield architecture**: Rigid vs. inflatable, single vs. multi-layer, integral vs. separate structure
2. **Tank size vs. number**: One large tank vs. multiple smaller tanks (redundancy vs. surface area efficiency)
3. **Cryocooler selection**: Reverse-Brayton vs. pulse-tube vs. Stirling (efficiency, mass, reliability tradeoffs)
4. **Subcooling margin**: How far below 20.3 K to maintain LH2 (larger margin = more cryocooler power but greater safety margin)
5. **Propellant vs. storable fallback**: Decision point at which cryogenic storage complexity justifies switching to storable propellants

---

## 5. Zero Boil-Off Technology State of the Art

### 5.1 NASA ZBO Program History

The NASA zero-boiloff program has evolved over two decades through a tri-center collaboration between Ames Research Center (ARC), Glenn Research Center (GRC), and Marshall Space Flight Center (MSFC). Kittel (2002) provides the foundational overview establishing the program roadmap: reduce cryogenic propellant losses from the then-standard ~1%/day boiloff rate to effectively zero for long-duration missions.

Plachta (2018) documents the full history of ZBO concept development and reverse turbo-Brayton cryocooler progress. A critical finding: the largest flight cryocoolers deliver less than 1W at 20K and approximately 20W at 90K -- over an order of magnitude short of what LH2 ZBO at station scale would require.

### 5.2 GODU-LH2 Ground Demonstration

The Ground Operations Demonstration Unit for Liquid Hydrogen (GODU-LH2), documented by Notardonato (NASA/TP-2017-219389), represents the largest-scale ZBO demonstration to date:

- **Tank size**: 125,000 liters of LH2
- **Refrigeration**: Linde LR1620 industrial refrigerator providing 390W of cooling at 20K
- **Result**: Achieved zero boil-off using three distinct control methods
- **Key limitation**: The Linde refrigerator is a ground-based industrial unit, not a flight system

This demonstration confirms the thermodynamic feasibility of ZBO at moderate scale. The engineering challenge is replicating this cooling capacity in a flight-qualified, long-life system.

### 5.3 Thermodynamic Constraints

Plachta & Johnson (NASA/TM-2015-0000134) demonstrated that Carnot efficiency at LH2 temperatures is just 7%. This means for every watt of heat removed at 20K, the cryocooler must reject approximately 14W at its radiator temperature. This poor efficiency drives the concept of **staged cooling**: a 90K broad area cooling (BAC) shield embedded within the MLI layers reduces the hot-side temperature that the 20K cryocooler must work against, dramatically improving the effective coefficient of performance.

### 5.4 Cryocooler Development Path

The reverse turbo-Brayton cryocooler (developed primarily by Creare, Inc.) is the leading candidate for scaling to station requirements. Zagarola (2006) documents its advantages: high reliability, negligible vibration, long operational lifetimes, and crucially, the ability to provide distributed cooling through long transfer lines. However, current flight-qualified units remain at the milliwatt-to-single-watt scale at 20K.

The current state of flight cryocoolers:
- **JWST MIRI cooler**: 0.25W at 14K (operational)
- **Largest space units**: ~20W at 90K
- **Station requirement**: 100-500W at 20K
- **Gap**: 2-3 orders of magnitude

---

## 6. Propellant Depot and Sunshield Architecture

### 6.1 ULA Depot Concept

Kutter and Zegler (AIAA-2008-7644) established the foundational depot architecture: a JWST-like conical sunshield combined with slow axial spin. The spin serves dual purposes -- centrifugal settling of liquid propellant (critical in microgravity for gauging and transfer) and uniform thermal distribution across the tank surface. This paper is significant because it explicitly notes the advantage of Lagrangian point placement: depots at L-points avoid Earth IR and albedo heating entirely.

### 6.2 Lagrange Point Thermal Simplification

Kutter's patent (US20100187365A1) provides the key insight for Project Dyson: at Lagrange points, the sunshield cone can be **significantly truncated** compared to LEO or lunar vicinity designs because there is only a single dominant radiation source (the Sun). The docking port faces sunward, and the truncated cone blocks direct solar flux from reaching the storage tanks. This dramatically simplifies the thermal architecture compared to LEO depots that must contend with Earth IR, albedo, and orbital eclipses causing thermal cycling.

### 6.3 Layered Passive Approach

Kutter (AIAA-2009-6756) describes the practical layered thermal management strategy: MLI + sunshield + slow spin. A critical finding is that the **thermal capacitance of the propellant itself** provides months of near-ZBO storage passively when combined with a proper sunshield. For a station that is continuously producing propellant, this thermal inertia provides significant margin.

### 6.4 Thermal Analysis Results

NASA's Cryogenic Propellant Depot thermal optimization study (NASA/TM-2012-010675) used Thermal Desktop analysis to quantify LH2 module sensitivity to Earth IR and albedo entering through the sunshield opening. This is a major concern for LEO and lunar vicinity depots but **largely vanishes at L4/L5**, where the Earth subtends a negligible solid angle. This analysis strongly supports the L4/L5 location choice for cryogenic storage.

### 6.5 Lunar Resource Depot Architecture

Perrin and Casler (AIAA-2023-4620) recommend Earth-Moon L1 for a fuel depot supplied from lunar resources. While targeting a different location than Project Dyson's L4/L5, their cryocooler performance requirements analysis provides useful reference points for sizing active cooling systems.

### 6.6 Critical Conclusion

**L4/L5 is actually the easiest location for a cryogenic depot** among the commonly proposed options (LEO, lunar vicinity, L-points). With only a single radiation source, no orbital eclipses, and negligible planetary IR/albedo, the thermal environment is the simplest possible for sunshield design. The ULA architecture -- truncated conical sunshield, slow axial spin, layered MLI -- translates directly to the station design with minimal modification.

---

## 7. MLI Real-World Performance

### 7.1 Canonical MLI Reference

Finckenor (NASA/TP-1999-209263) provides the canonical MLI material guidelines, documenting UV, atomic oxygen, and micrometeorite degradation observed during Hubble Space Telescope servicing missions. This data confirms that MLI degrades significantly in the space environment over time -- a critical consideration for the station's 30+ year operational life. However, Hubble operated in LEO where atomic oxygen erosion is severe; at L4/L5, this particular degradation mechanism is largely absent.

### 7.2 Large Tank MLI Performance

Johnson's study of MLI considerations for large propellant tanks provides the most concerning data for station design:

- **Degradation factors**: 1.6-4x between laboratory and real-world MLI performance on large tanks
- **Heat contribution**: MLI contributes 70-90% of total heat input to cryogenic propellant tanks
- **Implication**: Laboratory MLI performance data significantly overpredicts real-world thermal protection

The degradation comes from practical installation realities: seams, joints, penetrations for plumbing and instrumentation, compression at support points, and imperfect layer spacing. For a station-scale tank (~500 m^2 surface area), these practical factors dominate the thermal budget.

### 7.3 Load Bearing MLI (LBMLI)

Johnson (Cryogenics 64, 2014) presents a significant advancement: Load Bearing MLI achieves:

- **51% less heat leakage** per layer compared to conventional MLI
- **38% less mass** per layer
- **Structural support capability** for broad area cooling shields

LBMLI is particularly relevant because it can structurally support an embedded 90K broad area cooling shield without additional mounting hardware, enabling the staged cooling approach described in Section 5.3.

### 7.4 Penetration Effects

Johnson and Kelly's study of MLI thermal degradation due to penetrations quantifies seam and penetration effects on thermal performance. Every pipe, wire, or structural member passing through the MLI creates a thermal short circuit that bypasses multiple insulation layers. Minimizing penetrations and using thermal breaks at each penetration point is essential for achieving design heat leak values.

### 7.5 Design Implications

For the Material Processing Station:
- **Use conservative MLI performance estimates**: 2-3x laboratory values for heat leak calculations
- **Adopt LBMLI technology** where possible for mass savings and cooling shield integration
- **Minimize penetrations** through the insulation system
- **Plan for MLI replacement/repair** as part of station maintenance over 30-year life

---

## 8. Cryocooler Scaling Gap

### 8.1 Current State of Flight Cryocoolers

The gap between current flight-qualified cryocooler capability and station requirements is the single largest technical risk for the cryogenic storage system:

| System | Cooling Power | Temperature | Status |
|--------|-------------|-------------|--------|
| JWST MIRI cooler | 0.25 W | 14 K | Operational in space |
| Largest space units | ~20 W | 90 K | Flight qualified |
| GODU-LH2 (Linde) | 390 W | 20 K | Ground demo only |
| **Station requirement** | **100-500 W** | **20 K** | **Not yet developed** |

### 8.2 Turbo-Brayton Scaling Pathway

Zagarola (2006) identifies the reverse turbo-Brayton cycle as the most promising pathway for high-capacity space cryocoolers:

- **High reliability**: Gas bearings eliminate wear mechanisms
- **Negligible vibration**: Critical for precision station operations
- **Long lifetime**: No reciprocating parts to fatigue
- **Distributed cooling**: Can deliver cooling through long transfer lines to multiple tanks
- **Scalability**: Thermodynamic cycle scales favorably with increasing capacity

However, no flight-qualified turbo-Brayton system exists at the hundred-watt scale at 20K.

### 8.3 Broad Area Cooling Strategy

Hartwig and Plachta (2016) established that ZBO becomes the lower-mass option compared to accepting boiloff when storage duration exceeds a few weeks, provided broad area cooling temperature gradients remain below 4K. The 90K BAC shield within MLI layers is the critical enabler: it intercepts the majority of incoming heat at a temperature where cryocooler efficiency is much higher (Carnot efficiency ~24% at 90K vs ~7% at 20K).

### 8.4 Scaling Assessment

The 2-3 order of magnitude gap between flight cryocoolers and station requirements cannot be bridged incrementally. This requires a dedicated development program, likely taking 10-15 years from current TRL to flight qualification at station scale. Three focused research questions have been created to track this challenge:
- **rq-0-47**: Sunshield architecture at L4/L5
- **rq-0-48**: MLI long-duration degradation
- **rq-0-49**: Cryocooler scaling pathway

---

## 9. Updated Assessment

### 9.1 Confidence Upgrade

With 21 papers reviewed (6 arxiv + 15 external references), confidence is upgraded from **low-medium** to **medium**. The physics of cryogenic storage is well-characterized, engineering approaches are defined, and ground demonstrations have proven ZBO feasibility at moderate scale.

### 9.2 What Is Well-Established

- Thermal network models reliably predict heat ingress (Aasen et al.)
- ZBO is thermodynamically feasible at 125,000L scale (GODU-LH2)
- Sunshield + MLI + slow spin provides effective passive thermal control (ULA depot concepts)
- L4/L5 is thermally favorable compared to LEO or lunar vicinity (single radiation source, no eclipses)
- LBMLI technology offers significant improvements over conventional MLI
- Autonomous CFM frameworks can manage cryogenic systems in real time (ARCTIC)
- Broad area cooling at 90K dramatically reduces 20K cryocooler requirements

### 9.3 Three Critical Unknowns

1. **Cryocooler flight scaling** (rq-0-49): Flight-qualified systems are 2-3 orders of magnitude below station requirements. No validated scaling pathway exists for 100-500W at 20K in a flight package. This is the pacing technical risk.

2. **MLI long-duration degradation at L4/L5** (rq-0-48): Hubble data confirms MLI degrades in space, but that was LEO with severe atomic oxygen. L4/L5-specific degradation over 10-30 years is unmodeled. Conservative estimates (2-3x lab values) may be sufficient but are unvalidated.

3. **Sunshield deployment at station scale** (rq-0-47): ULA concepts and patents address Lagrange point sunshield design but at depot scale (single Centaur-class tank), not station scale (multiple 50-100 tonne tanks). Scaling the sunshield architecture is an open structural and deployment challenge.

### 9.4 L4/L5 Advantage

A surprising finding from this review: L4/L5 is arguably the **best possible location** for a cryogenic propellant depot. Compared to alternatives:

- **vs. LEO**: No Earth IR/albedo (which drives 40-60% of heat load for LEO depots), no orbital eclipses causing thermal cycling, no atomic oxygen degradation of MLI
- **vs. Lunar vicinity**: No lunar IR/albedo, simpler sunshield geometry (single radiation source)
- **vs. Earth-Sun L1/L2**: Similar thermal environment but L4/L5 offers gravitational stability

The station's L4/L5 location, chosen for asteroid access, is coincidentally optimal for cryogenic storage -- a beneficial alignment of mission requirements.

---

## 10. Research Gaps Requiring Further Investigation

1. **L4/L5-specific thermal modeling**: Model the complete thermal environment at Sun-Earth L4/L5 including solar direct, reflected, and infrared fluxes. Determine sunshield requirements for >99% solar flux reduction on storage tanks. (Addressed in part by ULA depot analyses; needs station-scale extension.)

2. **Large-scale ZBO demonstration**: Extend ground-based NASA ZBO demonstrations to 10-100 tonne tank sizes. GODU-LH2 achieved ZBO at 125,000L (~8.8 tonnes) -- roughly 10x below station requirements.

3. **MLI long-duration performance**: Characterize MLI degradation over 10-30 year timescales at L4/L5. Finckenor's Hubble data provides LEO reference; L4/L5-specific degradation (no atomic oxygen, different micrometeoroid flux) needs modeling. (New question: rq-0-48.)

4. **Cryocooler flight scaling**: Bridge the 2-3 order of magnitude gap between current flight cryocoolers and station requirements. Reverse turbo-Brayton is the leading candidate but requires dedicated development program. (New question: rq-0-49.)

5. **Sunshield architecture at station scale**: Extend ULA depot sunshield concepts from single-tank to multi-tank station configuration at L4/L5. (New question: rq-0-47.)

6. **Integrated thermal-power optimization**: Model the coupled optimization of sunshield size, MLI thickness (using LBMLI), broad area cooling shield temperature, cryocooler capacity, and power allocation.

7. **Cryocooler reliability at scale**: Assess 30-year cryocooler operational life with redundancy architecture. Current space cryocoolers are designed for 5-10 year missions.

---

## Appendix: Key Papers Referenced

| Source ID | Title | Relevance |
|-----------|-------|-----------|
| arxiv:2501.18451 | Thermal performance estimation for cryogenic tanks: LH2 | Tank heat ingress modeling |
| arxiv:2508.21802 | ARCTIC: Adaptive framework for cryogenic fluid management | Autonomous boiloff control |
| arxiv:1303.5112 | V-Ti-Cr/Mn hydrogen storage alloys | Solid-state alternative |
| arxiv:1307.0890 | Metal hydride requirements for hydrogen storage | Storage system evaluation framework |
| arxiv:1304.1959 | MgH2 nanocomposites for hydrogen storage | High-capacity hydride option |
| arxiv:1108.1332 | Hydrogen storage model with energy balance | Thermal modeling framework |
| Plachta-2018 | NASA cryocooler technology developments and goals to achieve ZBO | ZBO program history, cryocooler state of art |
| NASA/TM-2015-0000134 | Cryogenic Boil-Off Reduction System Testing | Broad area cooling, Carnot efficiency at LH2 |
| Kittel-2002 | Overview of NASA efforts on zero boiloff storage | Foundational ZBO program roadmap |
| NASA/TP-2017-219389 | Zero Boil-Off Methods for Large Scale LH2 | GODU-LH2 ground demo (125,000L ZBO) |
| AIAA-2008-7644 | Practical, Affordable Cryogenic Propellant Depot (ULA) | Key sunshield + Lagrange point depot design |
| US20100187365A1 | Cryogenic propellant depot and deployable sunshield | Lagrange point truncated cone sunshield patent |
| AIAA-2009-6756 | Realistic Near-Term Propellant Depots | Layered passive approach, thermal capacitance |
| AIAA-2023-4620 | Architecture Study for Fuel Depot from Lunar Resources | L1 depot cryocooler requirements |
| NASA/TM-2012-010675 | Thermal Optimization of a Cryogenic Propellant Depot | Earth IR/albedo sensitivity analysis |
| NASA/TP-1999-209263 | Multilayer Insulation Material Guidelines | Canonical MLI reference, Hubble degradation |
| Johnson-MLI-Large-Tanks | MLI considerations for large propellant tanks | Degradation factors 1.6-4x, 70-90% heat contribution |
| Johnson-2014-LBMLI | Design, fabrication and test of Load Bearing MLI | 51% less heat leak, structural cooling support |
| Johnson-MLI-Penetrations | Thermal Degradation of MLI Due to Penetrations | Seam and penetration thermal effects |
| Zagarola-2006 | High-capacity turbo-Brayton cryocoolers for space | Scaling pathway for flight cryocoolers |
| Gandolfi-2024 | Cryogenic propellant management in space: challenges | Comprehensive 2024 review, open challenges |
