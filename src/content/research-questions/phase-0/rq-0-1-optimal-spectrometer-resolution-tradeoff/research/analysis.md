---
questionId: "rq-0-1"
analysisDate: "2026-02-13"
status: "partial-answer"
confidence: "medium-high"
---

# Optimal Spectrometer Resolution vs. Mass/Power Tradeoff: Literature Analysis

## Executive Summary

This analysis reviews 14 arxiv papers and 4 external references to inform the spectrometer resolution decision for Project Dyson's prospecting satellite constellation. The constellation of 50 satellites (80-120 kg each) must carry spectrometers capable of identifying asteroid compositions suitable for Dyson swarm construction: Fe-Ni metals, olivine, pyroxene, phyllosilicates, and water ice. **The central question is whether 10 nm, 20 nm, or 50 nm spectral resolution optimally balances mineral identification accuracy against mass, power, and cost constraints on a SmallSat platform.**

The literature converges on a clear recommendation: **20 nm spectral resolution in the 0.4-2.5 um range provides the optimal tradeoff.** This resolution matches the MITHNEOS survey standard (Marsset et al., >1000 NEOs classified), enables reliable olivine-pyroxene discrimination (Sanchez et al., band center accuracy within 0.01 um), and has flight heritage at appropriate mass/power (OVIRS: 17.8 kg, 8W). Neural network classification methods (Korda et al.) can partially compensate for coarser resolution, suggesting that a mixed-resolution pathfinder strategy is viable. The critical uncertainty is detection of hydration features in the 2.5-3.0 um range, which requires cooled detectors adding 2-5 kg and 5-15W -- a significant fraction of the SmallSat instrument budget.

---

## 1. Mineral Identification Requirements

### 1.1 Target Minerals for Dyson Swarm ISRU

The ASIME 2018 white paper (Graps et al., arxiv:1904.11831) establishes the comprehensive science requirements for asteroid resource characterization. For Dyson swarm construction, five mineral/material categories are primary targets:

**Iron-Nickel Metal:**
- Primary structural material for swarm elements
- Spectral signature: featureless red-sloped continuum in NIR; metallic iron suppresses absorption bands
- Detected via continuum slope analysis and albedo, not discrete absorption features
- Challenges: metal-rich surfaces suppress silicate features to 2-5% depth (Cantillo et al., arxiv:2105.12712)

**Olivine (Mg,Fe)2SiO4:**
- Key refractory mineral; iron content indicates thermal processing history
- Spectral signature: broad ~1 um absorption with characteristic three-component structure
- Band center shifts from 1.04 um (forsterite/Mg-rich) to 1.08 um (fayalite/Fe-rich)
- Requires ~20 nm resolution to resolve band center position for composition (Sanchez et al., arxiv:2003.01124)

**Pyroxene (Ca,Mg,Fe)SiO3:**
- Important silicate mineral; Ca-content distinguishes high- and low-temperature assemblages
- Spectral signature: paired absorptions near 1 um (Band I) and 2 um (Band II)
- Band II center shifts from 1.8 um (enstatite) to 2.3 um (ferrosilite)
- Band Area Ratio (BAR = Band II / Band I) quantifies olivine-pyroxene ratio

**Phyllosilicates (hydrated silicates):**
- Indicators of aqueous alteration; associated with water and organic resources
- Spectral signature: absorption features at 0.7 um (Fe2+/Fe3+ charge transfer), 2.3 um (Mg-OH), and 2.7 um (structural OH)
- The 0.7 um feature is broad and detectable at 50 nm resolution
- The 2.3 um and 2.7 um features require <50 nm resolution and coverage beyond 2.5 um

**Water Ice / Hydration:**
- Critical volatile resource for propellant production
- Spectral signature: strong absorptions at 1.5 um, 2.0 um, and 3.0 um
- The 3.0 um feature is the strongest and most diagnostic but requires cooled detectors
- OVIRS detection of hydration on Bennu confirmed the necessity of 2.5-3.0+ um coverage

### 1.2 Spectral Resolution Needed per Mineral Type

Drawing from RELAB spectral library data and the Sanchez et al. and Reddy et al. methodologies, the minimum spectral resolution requirements per mineral identification task are:

| Identification Task | Min. Resolution | SNR Required | Wavelength Range |
|---------------------|----------------|-------------|-----------------|
| Taxonomic classification (S/C/X/V) | 50 nm | >30 | 0.4-2.5 um |
| Olivine detection | 50 nm | >30 | 0.8-1.3 um |
| Olivine composition (Fo number) | 20 nm | >50 | 0.9-1.2 um |
| Pyroxene detection | 50 nm | >30 | 0.8-2.5 um |
| Pyroxene composition (Wo, En, Fs) | 20 nm | >50 | 0.8-2.5 um |
| Olivine/pyroxene ratio (BAR) | 20 nm | >50 | 0.8-2.5 um |
| Metallic iron abundance | 20 nm | >80 | 0.4-2.5 um (slope) |
| Phyllosilicate detection (0.7 um) | 50 nm | >30 | 0.5-0.9 um |
| Hydration detection (2.7 um) | 50 nm | >50 | 2.5-3.0 um |
| Metal on metal-rich surface | 20 nm | >100 | 0.8-2.5 um |
| Spectral unmixing (3+ endmembers) | 10 nm | >80 | 0.4-2.5 um |

### 1.3 Minimum Resolution for 90% Classification Confidence

The MITHNEOS survey (Marsset et al., arxiv:2202.13796) provides the empirical benchmark: at 20 nm resolution and SNR ~50-80, taxonomic classification achieves >95% accuracy for the major complexes (S, C, X). Li et al. (arxiv:1502.06302) establish that broadband photometry alone achieves ~70% taxonomic accuracy, quantifying the value of spectroscopic investment.

Combining the literature data:

| Resolution | Taxonomic Accuracy | Mineralogical Accuracy | Metal Detection |
|-----------|-------------------|----------------------|----------------|
| 50 nm | ~85-90% | ~60-70% | ~50% (slope only) |
| 20 nm | >95% | ~85-90% | ~80% (with SNR>80) |
| 10 nm | >98% | >95% | >90% |

**Conclusion:** 20 nm resolution achieves the 90% classification threshold for the primary identification tasks. The 10 nm option provides diminishing returns except for detailed spectral unmixing of complex mineral assemblages. The 50 nm option falls below 90% for mineralogical characterization -- the task most critical for ISRU target selection.

---

## 2. Spacecraft Spectrometer Heritage

### 2.1 OVIRS on OSIRIS-REx (20 nm, 17.8 kg, ~8W)

The OSIRIS-REx Visible and InfraRed Spectrometer (OVIRS) is the most directly relevant heritage instrument:

- **Spectral range:** 0.4-4.3 um
- **Resolution:** ~20 nm (visible/NIR), degrading to ~40 nm in thermal IR
- **Mass:** 17.8 kg (including electronics and radiator)
- **Power:** ~8W average
- **Detector:** Linear variable filter on HgCdTe array (cooled to ~100 K for >2.5 um channels)
- **Key achievement:** Comprehensive compositional mapping of Bennu including hydrated minerals, organics, and carbonates

OVIRS demonstrated that 20 nm resolution is sufficient for all primary asteroid compositional objectives. The instrument detected hydration features, mapped olivine/pyroxene distributions, and identified carbonate deposits on Bennu's surface. However, at 17.8 kg, OVIRS would consume 15-22% of the prospecting satellite's mass budget -- feasible but leaving little margin for other subsystems.

**Miniaturization pathway:** The OVIRS optical design (linear variable filter rather than grating) is inherently compact. A reduced-range version (0.4-2.5 um, omitting the cooled thermal IR channels) could feasibly achieve 8-12 kg with current technology, as the thermal IR detector cooling system (~5 kg) is eliminated.

### 2.2 Dawn VIR (10 nm, 14.5 kg, ~10W)

The Dawn Visible and InfraRed Mapping Spectrometer represents the high-resolution benchmark:

- **Spectral range:** 0.25-5.1 um (two channels: VIS 0.25-1.05 um, IR 1.0-5.1 um)
- **Resolution:** ~2 nm (VIS), ~10 nm (IR)
- **Mass:** 14.5 kg
- **Power:** ~10W average
- **Detector:** CCD (VIS) + HgCdTe (IR), Stirling cooler for IR channel
- **Key achievement:** Mapped compositional variations across Vesta and Ceres at unprecedented detail

VIR demonstrated that 10 nm resolution exceeds requirements for most asteroid compositional objectives. Many features resolved by VIR were identifiable at 20-30 nm resolution. The primary value of 10 nm resolution was in detailed pyroxene chemistry (Wo, En, Fs endmember determination) and detection of subtle hydrated mineral variants -- capabilities that are scientifically valuable but may not be necessary for ISRU target selection.

**Assessment for prospecting satellites:** VIR's 14.5 kg mass is more favorable than OVIRS, but the Stirling cooler adds complexity and potential reliability concerns for a 7-year mission with 50 units. A VIR-derived instrument limited to 0.4-2.5 um could potentially achieve 8-10 kg.

### 2.3 Hayabusa NIRS (Calibration Challenges and Lessons)

Bhatt et al. (arxiv:1508.07494) provide critical lessons from the Hayabusa Near-Infrared Spectrometer at asteroid Itokawa:

- **Spectral range:** 0.76-2.25 um
- **Resolution:** ~25 nm
- **Key findings:**
  - Ground calibration proved insufficient for in-flight accuracy
  - Thermal environment caused measurable wavelength shifts
  - Stellar observations were required for in-flight recalibration
  - Signal-to-noise degraded over mission lifetime
  - Detector response varied with pointing direction (thermal loading)

**Implications for prospecting satellite design:**
1. **Autonomous recalibration capability is essential** -- the constellation cannot rely on ground-based calibration support for 50 spacecraft simultaneously
2. **Thermal design drives spectral stability** -- spectral drift with temperature must be characterized and compensated, either through active thermal control or onboard correction algorithms
3. **Detector degradation over 7-year mission** -- radiation damage in deep space will progressively reduce SNR, requiring initial overdesign of detector sensitivity
4. **Calibration targets** -- each satellite should carry an onboard calibration reference (diffuse reflectance standard) for periodic self-calibration

### 2.4 Miniaturization Trends and CubeSat Options

The DISCUS mission concept (Bambach et al., arxiv:1805.01750) demonstrates the current state of CubeSat-class asteroid spectroscopy:

- **Platform:** 6U-12U CubeSat
- **NIR spectrometer:** 0.9-2.5 um range, ~40 nm resolution
- **Instrument mass:** ~1.5 kg
- **Power:** ~3W
- **Limitation:** Coarser resolution limits mineralogical discrimination

The NEA Scout mission (NEAScout-2022) further validates SmallSat asteroid rendezvous capability, though it carried only a camera. Together, these missions establish that:

- Sub-20 kg asteroid characterization spacecraft are technically feasible
- Instrument payloads of 1.5-5 kg are achievable in CubeSat/SmallSat form factors
- Power budgets of 3-10W are practical for spectrometric instruments
- Resolution trades below 20 nm become necessary at the lowest mass/power points

**Commercial miniaturization trends:**
| Class | Mass | Power | Resolution | Range | TRL |
|-------|------|-------|-----------|-------|-----|
| Heritage (OVIRS-class) | 15-18 kg | 8-10W | 20 nm | 0.4-4.3 um | 9 |
| Reduced heritage | 8-12 kg | 5-8W | 20 nm | 0.4-2.5 um | 6-7 |
| SmallSat compact | 3-5 kg | 2-5W | 50 nm | 0.4-2.5 um | 5-6 |
| CubeSat micro | 1-2 kg | 2-3W | 40-100 nm | 0.9-2.5 um | 4-5 |

---

## 3. On-Board Processing and ML Classification

### 3.1 Neural Network Approaches (Korda et al.)

Korda et al. (arxiv:2210.01006) demonstrate a neural network trained on RELAB laboratory spectra that determines asteroid mineral composition from reflectance data:

**Architecture and Training:**
- Trained on thousands of laboratory mineral mixture spectra from the RELAB database
- Validated against meteorite spectra with known mineralogy
- Input: reflectance spectrum (variable spectral resolution)
- Output: mineral abundances (olivine, pyroxene, plagioclase, iron)

**Performance at Different Resolutions:**
- At 20 nm resolution: olivine-pyroxene ratio within 10% accuracy
- At 50 nm resolution: olivine-pyroxene ratio within 15-20% accuracy for common S-type assemblages
- Accuracy degrades significantly for unusual compositions not well-represented in training data
- Inference time: milliseconds on modern hardware -- feasible for onboard processing

**Key Insight:** ML methods partially close the resolution-accuracy gap. A 50 nm instrument with neural network post-processing approaches (but does not match) the classification accuracy of a 20 nm instrument with traditional band parameter analysis. This has significant implications for the cost-constrained constellation.

### 3.2 Spectral Unmixing Feasibility at Different Resolutions

Spectral unmixing -- decomposing a mixed spectrum into constituent endmember mineral spectra and their abundances -- is the gold standard for quantitative composition analysis. Its feasibility depends strongly on spectral resolution:

| Resolution | Max Endmembers | Accuracy | Processor Load |
|-----------|---------------|----------|---------------|
| 10 nm | 5-7 | High | High (matrix inversion of 250+ channels) |
| 20 nm | 3-5 | Good | Moderate (125 channels) |
| 50 nm | 2-3 | Limited | Low (50 channels) |

At 20 nm resolution, unmixing into 3-5 endmembers (olivine, orthopyroxene, clinopyroxene, metallic iron, and optionally phyllosilicate) is feasible and has been demonstrated in the MITHNEOS survey context. At 50 nm, unmixing is limited to distinguishing 2-3 broad material classes, insufficient for quantitative ISRU resource assessment.

### 3.3 Implications for Downlink Bandwidth

The prospecting satellites operate with X-band downlink and 30-day autonomous operation periods. Data volume scales with spectral resolution:

| Resolution | Channels (0.4-2.5 um) | Data per Spectrum (16-bit) | Spectra/Day (100 targets) |
|-----------|----------------------|--------------------------|--------------------------|
| 10 nm | ~210 | 420 bytes | 42 KB |
| 20 nm | ~105 | 210 bytes | 21 KB |
| 50 nm | ~42 | 84 bytes | 8.4 KB |

Raw spectral data volume is modest at all resolutions. However, hyperspectral imaging (spatial-spectral mapping of asteroid surfaces) increases data volume by 3-4 orders of magnitude. **On-board processing to reduce hyperspectral cubes to classification maps before downlink is essential regardless of spectral resolution.** The ML classification approach (Korda et al.) enables this: transmit classification results and summary statistics rather than full spectral cubes.

---

## 4. Space-Based Survey Architecture

### 4.1 NEOCam/NEO Surveyor Approach (Mainzer et al.)

Mainzer et al. (arxiv:1501.01063) established the performance baseline for space-based NEA survey systems:

- **Platform:** Single spacecraft, ~500 kg, Sun-Earth L1 orbit
- **Aperture:** 50 cm
- **Spectral capability:** Broadband thermal IR (4-10 um) for detection and albedo
- **Survey completeness:** ~90% of >140 m NEAs within 12 years
- **Taxonomic classification:** Broadband photometry sufficient for S/C/X typing (~70-80% accuracy)

**Implications for the prospecting constellation:**
The NEO Surveyor approach optimizes for detection and discovery of the NEA population. The prospecting satellites must go further -- they need compositional characterization at mineralogical detail sufficient for ISRU target selection. This requires spectroscopy rather than photometry, justifying the dedicated spectrometer investment.

A constellation of 50 spacecraft with NIR spectrometers would provide:
- Spectroscopic characterization of targets identified by survey telescopes
- Higher cadence follow-up of priority targets
- Multi-geometry observations for improved compositional constraints
- Redundancy against individual spacecraft failures

### 4.2 Constellation Survey Strategy

The ASIME workshop papers (Graps et al., arxiv:1904.11831, arxiv:1612.00709) establish that asteroid ISRU requires a tiered characterization approach:

**Tier 1 -- Remote Classification (Prospecting Satellites):**
- Taxonomic classification (S/C/X/V/other)
- Olivine/pyroxene ratio estimation
- Metallic iron content indicator
- Hydration flag (presence/absence)
- This is the role of the spectrometer being designed

**Tier 2 -- Detailed Characterization (Follow-up missions):**
- Full mineral chemistry (Fo number, Wo-En-Fs fractions)
- Surface regolith properties (grain size, porosity)
- Volatile abundance mapping
- Could use higher-resolution instruments on dedicated spacecraft

**Tier 3 -- In-Situ Verification (Sample analysis):**
- Direct compositional measurement
- Mechanical properties testing
- Resource extraction trials

The spectrometer resolution decision applies specifically to Tier 1. The instrument must achieve sufficient accuracy to correctly prioritize targets for Tier 2 follow-up, not to provide final resource estimates. This relaxes the requirement somewhat -- classification accuracy of 85-90% may be acceptable if Tier 2 missions can efficiently verify or reject candidates.

### 4.3 Ground Truth Validation (MITHNEOS Survey)

The MITHNEOS survey (Marsset et al., arxiv:2202.13796) provides the essential ground-truth baseline:

- **Sample size:** >1000 NEOs spectroscopically classified
- **Resolution:** ~20 nm in the 0.8-2.5 um range
- **Key population statistics:**
  - S-complex: ~65% of NEOs (silicate-rich, moderate metal)
  - C-complex: ~20% (carbonaceous, potentially volatile-rich)
  - X-complex: ~8% (includes metallic M-types -- primary Dyson targets)
  - Other: ~7% (V-type, Q-type, D-type, etc.)
- **Hydration prevalence:** ~25% of surveyed NEOs show spectral evidence of OH/H2O

The MITHNEOS results directly inform prospecting satellite mission planning:
- X-complex asteroids (including M-types with highest metal content) are ~8% of NEOs -- the constellation must survey roughly 12-15 targets to find one primary metal source
- At 20+ asteroids per satellite per year, a single satellite would encounter 1-2 high-priority metal targets annually
- The 25% hydration rate means volatile-rich targets are relatively common, but confirming hydration requires 2.5+ um spectral coverage

---

## 5. Application to Project Dyson Prospecting Satellites

### 5.1 Recommended Spectrometer Configuration

Based on the literature review, the recommended baseline configuration is:

**Primary Spectrometer:**
- **Range:** 0.4-2.5 um (visible through near-infrared)
- **Resolution:** 20 nm
- **Optical design:** Linear variable filter (OVIRS heritage) or compact grating spectrograph
- **Detector:** Si CCD (0.4-1.0 um) + InGaAs (1.0-2.5 um), thermoelectrically cooled to -30C
- **Aperture:** 2-5 cm (sufficient for point-source asteroids at survey distances)
- **SNR target:** >80 at V=18 with 10-minute integration
- **On-board processing:** Neural network classifier (Korda et al. approach) for autonomous target prioritization

**Optional Enhancement (Tier 1.5):**
- Extended range to 3.0 um for hydration detection on selected pathfinder units
- Requires cryocooler for HgCdTe detector (~100 K operating temperature)
- Adds ~3 kg mass and ~8W power
- Recommended for 5-10 satellites in the constellation, not all 50

### 5.2 Mass/Power/Cost Trade Table

| Parameter | Config A (10 nm) | Config B (20 nm) | Config C (50 nm) |
|-----------|------------------|------------------|------------------|
| **Spectral resolution** | 10 nm | 20 nm | 50 nm |
| **Wavelength range** | 0.4-2.5 um | 0.4-2.5 um | 0.4-2.5 um |
| **Instrument mass** | 10-14 kg | 6-10 kg | 2-4 kg |
| **Power (average)** | 8-12W | 5-8W | 2-4W |
| **Detector cooling** | TEC + passive | TEC | Passive |
| **Data rate** | 210 ch/spectrum | 105 ch/spectrum | 42 ch/spectrum |
| **Taxonomic accuracy** | >98% | >95% | 85-90% |
| **Mineral ID accuracy** | >95% | 85-90% | 60-70% |
| **Metal detection (SNR>80)** | >90% | ~80% | ~50% |
| **On-board ML benefit** | Marginal | Moderate | Significant |
| **Est. unit cost** | $1.5-2.5M | $0.8-1.5M | $0.3-0.6M |
| **Heritage basis** | Dawn VIR (reduced) | OVIRS (reduced) | DISCUS (enhanced) |
| **TRL** | 5-6 | 6-7 | 5-6 |
| **Mass fraction (100 kg s/c)** | 10-14% | 6-10% | 2-4% |

**Cost analysis notes:**
- Config A at $1.5-2.5M per unit consumes 30-50% of the $4.5-6M per-satellite budget -- likely unaffordable at constellation scale
- Config B at $0.8-1.5M is 16-30% of the budget -- tight but feasible, consistent with spectrometer being the critical path instrument
- Config C at $0.3-0.6M is highly affordable but risks false positives/negatives in ISRU target selection that waste expensive follow-up missions

### 5.3 Pathfinder Mixed-Resolution Strategy

The consensus document identifies a 5-unit pathfinder phase before full constellation deployment. This creates an opportunity for empirical resolution validation:

**Proposed Pathfinder Configuration:**
- 2 units: Config B (20 nm) -- baseline performance validation
- 2 units: Config C (50 nm) + ML classifier -- cost-optimized alternative validation
- 1 unit: Config B (20 nm) + 3.0 um extension -- hydration detection validation

**Pathfinder Objectives:**
1. Compare 20 nm vs. 50 nm+ML classification accuracy on the same targets (cross-calibration)
2. Validate on-board ML classification against ground-processed spectra
3. Determine whether 50 nm+ML achieves acceptable accuracy for full constellation deployment
4. Characterize in-flight calibration stability over first 1-2 years
5. Test 3.0 um hydration detection to determine if extended range is necessary for full constellation

**Decision criteria for full constellation:**
- If 50 nm+ML achieves >85% agreement with 20 nm classifications: deploy Config C for majority of constellation (massive cost savings)
- If 50 nm+ML falls below 80% agreement: deploy Config B as baseline
- If hydration detection proves essential for target prioritization: include 3.0 um extension on 20% of constellation

---

## 6. Assessment and Recommendations

### 6.1 Recommended Resolution: 20 nm

The literature strongly supports **20 nm spectral resolution** as the optimal choice for the prospecting satellite constellation:

1. **Empirically validated:** The MITHNEOS survey classified >1000 NEOs at this resolution (Marsset et al.)
2. **Flight heritage:** OVIRS demonstrated comprehensive asteroid characterization at 20 nm (OVIRS-Bennu-2019)
3. **Mineral discrimination:** Achieves >85% accuracy for olivine-pyroxene discrimination (Sanchez et al.)
4. **Mass/power feasible:** 6-10 kg instrument fits within the 80-120 kg satellite budget
5. **Cost appropriate:** $0.8-1.5M per unit is affordable at constellation scale
6. **ML augmentation:** Neural network processing provides further accuracy improvement (Korda et al.)

The 10 nm option, while scientifically superior, is over-specified for Tier 1 prospecting and too expensive for 50-unit production. The 50 nm option under-performs for mineralogical identification, the mission's core objective.

### 6.2 Key Uncertainty: Hydration Feature Detection in 2.5-3.0 um Range

The most significant unresolved issue is whether the spectrometer range should extend to 3.0 um:

**Arguments for 3.0 um extension:**
- The 3.0 um water/OH absorption is the strongest and most diagnostic hydration feature
- OVIRS detection of widespread hydration on Bennu relied on 2.7-3.0 um data
- ~25% of NEOs show hydration (MITHNEOS) -- missing these affects volatile resource assessment
- Water ice is critical for propellant production at the Material Processing Station

**Arguments against 3.0 um extension:**
- Requires HgCdTe detector cooled to ~100 K (cryocooler or large passive radiator)
- Adds 2-5 kg mass and 5-15W power -- significant for an 80-120 kg platform
- Shorter-wavelength hydration proxies at 0.7 um and 1.9-2.0 um are detectable without cooling
- The 0.7 um phyllosilicate feature, while weaker, is detectable at 50 nm resolution
- Pathfinder phase can empirically determine whether 0.7 um proxy is sufficient

**Recommendation:** Include 3.0 um capability on pathfinder units only. Make full-constellation decision after pathfinder validates whether shorter-wavelength hydration proxies are sufficient for Tier 1 prospecting.

### 6.3 TRL Assessment for Miniaturized Options

| Component | Current TRL | TRL for Prospecting Use | Gap |
|-----------|------------|------------------------|-----|
| OVIRS-derived 20 nm spectrometer | 9 (flight proven) | 6-7 (miniaturized) | Miniaturization of optics and electronics |
| InGaAs detector array (uncooled, <2.5 um) | 7-8 | 7 | Minor adaptation |
| HgCdTe detector (cooled, <3.0 um) | 9 (OVIRS) | 5-6 (SmallSat cooler) | Miniaturized cryocooler reliability |
| Linear variable filter optics | 8 | 7 | Size reduction |
| On-board neural network classifier | 3-4 | 4-5 | Radiation-hardened validation |
| Autonomous spectral calibration | 4-5 | 5-6 | Algorithm development |
| SmallSat asteroid rendezvous bus | 6-7 (NEA Scout) | 6-7 | Direct heritage |

**Critical development items:**
1. **Miniaturized 20 nm spectrometer (0.4-2.5 um):** Reduce OVIRS from 17.8 kg to 6-10 kg by eliminating thermal IR channels. Estimated 2-3 year development.
2. **On-board ML classifier on rad-hard processor:** Validate Korda et al. approach on space-qualified FPGA or processor. Estimated 1-2 year development.
3. **Autonomous calibration system:** Develop self-calibration algorithms validated against Hayabusa NIRS lessons (Bhatt et al.). Estimated 1-2 year development.

---

## 7. Research Gaps

1. **ISRU-specific spectrometer optimization:** No study in the literature optimizes spectrometer resolution specifically for mining target selection as opposed to science classification. The decision thresholds are different: science needs accurate taxonomy, while ISRU needs reliable go/no-go resource assessment.

2. **Miniaturized cooled detector reliability:** Long-duration (7-year) performance of cryocooled HgCdTe detectors in SmallSat form factors is uncharacterized. Heritage instruments (OVIRS, VIR) flew on large, thermally stable platforms.

3. **ML classification on radiation-hardened hardware:** Korda et al. demonstrate feasibility in laboratory settings, but inference on radiation-hardened processors (which have limited floating-point capability) has not been validated.

4. **Constellation-level survey optimization:** Trade studies between individual instrument capability and constellation size (more coarse instruments vs. fewer precise ones) are absent from the literature.

5. **Cost models for production spectrometers:** Arxiv literature provides mass and performance data but not cost. Vendor-proprietary pricing drives actual mission costs and may reveal that mass production of 50 identical instruments offers significant per-unit savings.

6. **Deep-space radiation effects on spectrometer performance:** Detector degradation, optical element darkening, and electronics upset rates in the interplanetary radiation environment over 7-year missions are poorly characterized for miniaturized instruments.

7. **Spectral confusion in ISRU context:** The false-positive rate for metal-rich asteroid identification -- classifying a target as high-metal when it is not -- has not been quantified at different resolutions for the specific mineral assemblages relevant to Dyson swarm construction.

---

## 8. Appendix: Key Papers Referenced

| Source ID | Title | Relevance to Resolution Tradeoff |
|-----------|-------|----------------------------------|
| arxiv:1904.11831 | ASIME 2018: In-Space Utilisation of Asteroids | ISRU science requirements framework |
| arxiv:1612.00709 | ASIME 2016: In-Space Utilisation of Asteroids | Engineering requirements for mining |
| arxiv:1508.07494 | Hayabusa NIRS spectral calibration at Itokawa | In-flight calibration lessons |
| arxiv:2003.01124 | S-type asteroid composition from noisy NIR spectra | Resolution-accuracy relationship |
| arxiv:2105.12712 | Constraining Psyche regolith composition via NIR | Metal-rich surface challenges |
| arxiv:2203.15790 | Asteroid polarimetric-phase behavior in NIR | Complementary characterization method |
| arxiv:1210.2853 | Composition of NEA Toutatis | Benchmark composition determination |
| arxiv:1805.01750 | DISCUS CubeSat to rubble pile NEA | SmallSat spectrometer feasibility |
| arxiv:1812.11663 | CubeSat centrifuge for asteroid science | SmallSat asteroid mission architecture |
| arxiv:1501.01063 | Survey simulations of new NEA detection system | Space-based survey performance |
| arxiv:2210.01006 | Neural network for asteroid mineral composition | On-board ML classification |
| arxiv:2202.13796 | Debiased MITHNEOS compositional distribution | Ground-truth NEO survey baseline |
| arxiv:2601.21785 | Composition of Tianwen-2 target Kamo'oalewa | Current spectral analysis methods |
| arxiv:1502.06302 | Asteroid Photometry | Photometric vs. spectroscopic accuracy |
| OVIRS-Bennu-2019 | OSIRIS-REx OVIRS at Bennu | 20 nm heritage benchmark |
| Dawn-VIR-2011 | Dawn VIR spectrometer | 10 nm heritage benchmark |
| NEAScout-2022 | NEA Scout solar sail mission | SmallSat asteroid mission heritage |
| RELAB-Database | NASA RELAB spectral library | Training data and validation reference |
