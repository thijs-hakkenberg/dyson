---
questionId: "rq-0-39"
analysisDate: "2026-02-13"
status: "partial-answer"
confidence: "medium"
---

# Subsurface Mechanical Characterization of Target Asteroids: Literature Analysis

## Executive Summary

This analysis reviews 12 arxiv papers and 3 external references to assess the state of knowledge on rubble pile asteroid subsurface mechanical properties and their implications for bucket-wheel excavation system design. **The central finding is that van der Waals cohesion of ~25-80 Pa governs small rubble pile strength (Sanchez & Scheeres 2013), but the OSIRIS-REx TAG event at Bennu revealed surface bearing capacity as low as 0.2-20 Pa -- orders of magnitude below model predictions, demonstrating that current models cannot reliably predict the mechanical environment an excavator will encounter.**

The literature establishes several quantitative constraints: bulk porosity of 40-60% near the surface decreasing to 20-35% at depth; surface boulder compressive strength of 0.2-1 MPa (far below terrestrial rock analogs); thermal conductivity of 0.001-0.1 W/m-K creating steep thermal gradients that drive near-surface sintering; and optimal bucket wheel diameters of 0.5-1.5 m for cohesive strengths up to 1 kPa (Nallapu et al. 2017). However, no direct subsurface mechanical measurement below ~1 cm depth has ever been made on any asteroid, and no microgravity excavation experiments with representative simulants have been conducted. The excavation system must therefore be designed for a property range spanning at least two orders of magnitude in cohesive strength, with real-time adaptive capability as the primary mitigation strategy.

---

## 1. Rubble Pile Mechanical Properties

### 1.1 Van der Waals Cohesion Model

Sanchez & Scheeres (arxiv:1306.1622) established the foundational model for rubble pile mechanical behavior using soft-sphere discrete element method (SSDEM) simulations with explicit van der Waals cohesive contacts between particles:

**Key Results:**
- Interparticle cohesive forces of ~25-80 Pa are sufficient to explain the observed spin barrier in small asteroids
- Cohesion arises from van der Waals forces between fine regolith particles filling interstices between larger clasts
- The effective cohesive strength is scale-dependent: it dominates mechanical behavior for bodies smaller than ~10 km diameter and becomes negligible for larger bodies where self-gravity dominates
- At the particle level, van der Waals force scales as particle radius, while gravitational force scales as radius cubed -- below a critical particle size (~1 cm on a sub-km asteroid), cohesion exceeds gravity by orders of magnitude

Scheeres et al. (Icarus 2010) formalized these scaling relationships:

| Particle Size | Dominant Force | Implication for Excavation |
|---------------|---------------|---------------------------|
| < 100 um | Cohesion >> Gravity | Material sticks to surfaces, difficult to dislodge |
| 100 um - 1 cm | Cohesion ~ Gravity | Transitional behavior, complex flow |
| 1 cm - 10 cm | Gravity >> Cohesion | Granular flow, relatively easy to excavate |
| > 10 cm (boulders) | Structural strength | Must fracture or avoid |

**Implication for Bucket-Wheel Design:**
The excavation force regime depends critically on the particle size distribution. Fine-grained regolith (< 1 mm) will be cohesion-dominated and may resist excavation more than intuitively expected, while coarse gravel (> 1 cm) will flow granularly. The bucket-wheel system must handle both extremes and the transition between them.

### 1.2 Scale-Dependent Strength

Multiple independent studies confirm the cohesion range of 25-80 Pa through different analytical approaches:

**Spin-rate analysis** (Scheeres 2017, arxiv:1706.03385): Small asteroids spin faster than the gravitational disruption limit, requiring cohesive strength of ~25 Pa minimum. Below this threshold, YORP-induced spin-up causes equatorial mass shedding. Above ~80 Pa, bodies can sustain significantly higher spin rates before catastrophic disruption.

**DEM modeling** (Hu et al. 2020, arxiv:2009.12605): Maps the critical spin period as a function of body size and cohesion. For 200-m bodies, cohesion of 25 Pa allows spin periods as short as 2 hours. Strong sensitivity to particle size distribution and packing geometry means that local mechanical properties can vary significantly from bulk averages.

**SPH simulations** (Sugiura et al. 2021, arxiv:2104.13516): Validates the 10-100 Pa cohesion range through large-scale deformation modeling. Rubble piles with this cohesion level deform into oblate spheroids before failure, consistent with the observed shape distribution of small asteroids.

**Critical Caveat:**
These cohesion values are *bulk averages* inferred from whole-body behavior. Local mechanical properties at excavation-relevant scales (0.1-10 m) may vary by an order of magnitude or more depending on local packing, boulder distribution, and thermal history.

### 1.3 Evidence from OSIRIS-REx and Hayabusa2

Spacecraft interactions with rubble pile surfaces have provided the most surprising and directly relevant data:

**OSIRIS-REx TAG at Bennu** (Ballouz et al. 2020):
- The spacecraft's sampling arm sank ~50 cm into Bennu's surface during the 6-second TAG event
- Surface bearing capacity was only 0.2-20 Pa -- at the extreme low end of model predictions
- The surface material behaved more like a fluid than a granular solid under the spacecraft's ~1 N contact force
- Post-TAG imagery showed a crater ~8 m in diameter where the spacecraft disturbed the surface
- **This result was not predicted by any pre-mission model** and remains incompletely explained

**Hayabusa2 at Ryugu** (Michikami et al. 2019):
- Touchdown operations confirmed low cohesion and high porosity at the surface
- The SCI (Small Carry-on Impactor) experiment created a ~14 m crater, revealing subsurface material with different spectral properties than the surface
- Ejecta consisted of a mix of fine regolith and centimeter-scale fragments
- Surface material is mechanically weak and heterogeneous at excavation-relevant scales

**Combined Assessment:**
Both missions confirm that C-type rubble pile surfaces are far weaker than terrestrial analogs and often weaker than model predictions. For excavation system design, this has a dual implication:
1. Cutting forces may be very low -- the material may not resist the bucket at all
2. Material containment becomes the primary challenge -- in microgravity, disturbed material may disperse rather than flow into the bucket

---

## 2. Subsurface Structure Characterization

### 2.1 Porosity Gradients

Tricarico et al. (arxiv:2108.10416) derived Bennu's interior structure from OSIRIS-REx gravity, shape, and surface observations:

**Bennu Interior Model:**
- Bulk density: 1.19 g/cm^3 (grain density of CI chondrite ~2.4 g/cm^3)
- Bulk macroporosity: ~50%
- Evidence for a denser core with porosity of 25-35%
- Surface boulder compressive strength: 0.2-1 MPa (vs. 10-200 MPa for terrestrial basalt)

**Porosity Gradient Model:**

| Depth Zone | Estimated Porosity | Estimated Density | Mechanical Character |
|------------|-------------------|-------------------|---------------------|
| 0-10 cm (surface) | 50-60% | 0.9-1.2 g/cm^3 | Very weak, fluid-like under disturbance |
| 10 cm - 1 m | 40-50% | 1.2-1.5 g/cm^3 | Loose rubble, low cohesion |
| 1-10 m | 30-40% | 1.4-1.7 g/cm^3 | Compacted rubble, moderate cohesion |
| 10-100 m (interior) | 20-35% | 1.6-1.9 g/cm^3 | Dense packing, significant overburden |

Walsh (arxiv:1810.01815) reviews the broader evidence for this porosity gradient structure across multiple rubble pile asteroids. The gradient arises from gravitational self-compaction: overburden pressure increases with depth, reducing void space. For a 500-m diameter asteroid with ~0.1 mm/s^2 surface gravity, overburden pressure reaches ~1-10 Pa at 1 m depth and ~100-1000 Pa at 100 m depth.

**Implication for Excavation:**
Excavation resistance increases with depth. A bucket-wheel system operating at 10-50 cm depth will encounter material roughly 2-3x denser and potentially 5-10x more cohesive than the surface layer. The system must accommodate this gradient without requiring operator intervention.

### 2.2 Radar Tomography Approaches

Bambach et al. (arxiv:1805.01750) propose the DISCUS CubeSat mission concept for subsurface characterization using bistatic low-frequency radar:

**DISCUS Concept:**
- Two CubeSats in coordinated orbits around a target NEA
- Radar frequencies: 5-15 MHz (wavelength 20-60 m)
- Penetration depth: 10-100 m in low-loss asteroid material
- Resolution: ~10 m for structural features, ~1 m for density gradients
- Can detect: void spaces, density discontinuities, boulder concentrations, ice deposits

**Applicability to Mining Precursor:**
A radar tomography mission is the most promising approach for pre-mining subsurface characterization. A modified DISCUS-type mission orbiting a candidate mining target could provide:
1. 3D density map of the upper 100 m
2. Boulder size distribution and spatial clustering
3. Identification of ice-bearing zones (different dielectric properties)
4. Structural discontinuities that would affect excavation operations

**Limitations:**
- Cannot resolve features smaller than ~1 m
- Cannot directly measure mechanical properties (strength, cohesion)
- Dielectric property interpretation requires assumptions about composition
- No mission has yet demonstrated asteroid radar tomography

### 2.3 Returned Sample Constraints

Returned samples from Bennu (OSIRIS-REx, 2023) and Ryugu (Hayabusa2, 2020) provide ground truth for surface material properties but have critical limitations:

**What Returned Samples Provide:**
- Particle size distribution of surface regolith
- Mineralogy and density of individual grains
- Porosity of intact aggregates (where preserved)
- Compositional constraints on cohesive forces

**What Returned Samples Cannot Provide:**
- Subsurface mechanical properties (samples are from the top ~1 cm)
- In-situ packing geometry (disturbed during collection and transport)
- Overburden-dependent behavior
- Thermal processing state at depth
- Boulder-scale mechanical properties

Metzger et al. (arxiv:1912.10622) emphasize that returned sample data is essential for calibrating regolith simulants but cannot substitute for in-situ subsurface measurement.

---

## 3. Regolith Simulant Development

### 3.1 Fidelity Assessment Methods

Metzger et al. (arxiv:1912.10622) developed the first systematic framework for grading asteroid regolith simulant fidelity:

**Fidelity Dimensions:**

| Property | Current Best Simulant Fidelity | Gap Assessment |
|----------|-------------------------------|----------------|
| Particle size distribution | Moderate | Returned samples now available for calibration |
| Particle shape (angularity) | Low-Moderate | Crushing processes don't replicate space weathering |
| Mineralogy | Moderate | CI/CM chondrite compositions well-characterized |
| Bulk density | Moderate | Achievable with proper mineral selection |
| Cohesive strength | Low | Van der Waals forces depend on surface chemistry |
| Mechanical behavior under load | Very Low | No microgravity validation |

**Key Findings:**
- No existing simulant adequately replicates all relevant mechanical properties simultaneously
- JSC-1 (lunar simulant) is frequently used as a stand-in but differs substantially in particle shape, cohesion, and mineralogy
- CI chondrite analog simulants better match composition but are produced by crushing, which creates unrealistic particle shapes
- Volatile-bearing simulants (ice-regolith mixtures) are essentially undeveloped

### 3.2 Implications for Excavation Testing

Terrestrial bucket-wheel excavation testing requires simulants that accurately replicate:
1. **Cohesive behavior**: The 25-80 Pa cohesion range must be achieved under terrestrial gravity, which requires adding artificial cohesion (electrostatic, humidity, or binder) to compensate for the 10,000x higher gravitational forces on Earth
2. **Particle size distribution**: Must match the bimodal distribution observed in returned samples (fine regolith + larger clasts)
3. **Compressibility**: High-porosity material that compacts rather than shears under load
4. **Heterogeneity**: Embedded boulders and void spaces at excavation-relevant scales

Without properly calibrated simulants, terrestrial excavation tests may produce misleading results. A material that flows easily at 1g may be cohesion-dominated and resist disturbance at 0.1 mm/s^2 surface gravity.

---

## 4. Bucket Wheel Excavation Design Parameters

### 4.1 Nallapu et al. Optimization Study

Nallapu et al. (arxiv:1701.07547) provide the most directly applicable engineering analysis for bucket-wheel excavation on asteroids:

**Optimization Variables:**
- Wheel diameter: 0.3-2.0 m
- Number of buckets: 6-16
- Bucket depth (penetration): 1-15 cm
- Rotation speed: 0.5-5 rpm
- Approach angle: 30-90 degrees to surface

**Optimized Design Parameters (for 25-100 Pa cohesion):**

| Parameter | Optimal Range | Sensitivity |
|-----------|-------------|-------------|
| Wheel diameter | 0.5-1.5 m | Moderate -- larger wheels reduce specific energy but increase mass |
| Bucket depth | 3-8 cm | High -- deeper cuts increase force nonlinearly with cohesion |
| Rotation speed | 1-3 rpm | Low -- limited by microgravity dynamics, not cutting speed |
| Number of buckets | 8-12 | Low -- more buckets smooth torque but add mass |
| Specific energy | 0.1-10 J/kg | Very high -- spans 2 orders of magnitude with cohesion |

**Power Consumption Model:**
For a throughput target of 100 kg/hr (relevant to early ISRU operations):
- At 25 Pa cohesion: ~5-15 W excavation power
- At 100 Pa cohesion: ~20-60 W excavation power
- At 1 kPa cohesion (sintered crust): ~200-600 W excavation power
- Dominant power sink shifts from cutting to material transport at low cohesion values

### 4.2 Force and Power Requirements

Combining the Nallapu et al. framework with the cohesion models from Sanchez & Scheeres:

**Excavation Force Estimates:**

| Material State | Cohesion (Pa) | Cutting Force (N) | Notes |
|---------------|---------------|-------------------|-------|
| Loose surface regolith | 0.2-20 | 0.01-0.5 | May flow into bucket without cutting |
| Typical rubble pile | 25-80 | 0.5-5 | Baseline design point |
| Compacted subsurface | 100-500 | 5-30 | Depth > 0.5 m |
| Sintered crust | 1,000-10,000 | 30-500 | Thermally processed layer |
| Boulder fragment | >1 MPa | >10,000 | Must avoid or fracture separately |

**Reaction Force Management:**
In microgravity, excavation forces must be reacted against the asteroid surface to prevent the excavator from pushing itself away. For a 100-kg excavator on a surface with 0.1 mm/s^2 gravity:
- Available gravitational reaction force: ~0.01 N
- Required excavation force: 0.5-30 N (typical conditions)
- **Deficit: 50-3000x** -- anchoring or counter-rotation is essential

This force deficit is precisely why the dual counter-rotating bucket-wheel concept (validated in rq-0-26) is critical: 90-95% torque cancellation reduces the net reaction force the anchoring system must resist.

### 4.3 Adaptation to Heterogeneous Material

Raducan et al. (arxiv:2209.02677) demonstrate that rubble pile material response varies dramatically with local conditions:
- High-porosity zones absorb energy through compaction rather than material removal
- Cohesive zones produce larger intact fragments that may jam bucket mechanisms
- Void spaces cause sudden loss of cutting resistance followed by impact with the far wall

**Adaptive Excavation Requirements:**
1. Real-time torque monitoring to detect material property transitions
2. Variable penetration depth control (reduce depth when encountering hard material)
3. Reverse capability to clear jams from large fragments
4. Force limiting to prevent anchoring system overload
5. Material classification sensor (e.g., vibration spectral analysis) to predict upcoming conditions

---

## 5. Thermal Effects on Near-Surface Properties

### 5.1 Thermal Conductivity and Gradients

Luan & Goldreich (arxiv:1510.05295) model thermal conductivity through rubble pile material:

**Key Results:**
- Effective thermal conductivity: 0.001-0.1 W/m-K
- This is 100-1000x lower than solid rock (~1-3 W/m-K)
- Conductivity depends strongly on porosity: higher porosity means fewer grain contacts and lower conductivity
- Radiative transfer between grains becomes significant above ~300 K

**Thermal Gradient Implications:**
For a rubble pile at 1 AU with surface temperature cycling between ~100-400 K:
- Diurnal thermal skin depth: ~1-5 cm
- Seasonal thermal skin depth: ~10-50 cm
- Long-term (10^6 year) thermal processing depth: ~1-10 m

### 5.2 Sintered Crust Formation

Low thermal conductivity creates steep near-surface temperature gradients that can drive sintering -- partial fusion of grain contacts at elevated temperature. While not directly measured on an asteroid, laboratory and modeling studies suggest:

- **Sintering threshold**: ~600-800 K for silicate minerals (reached only at very close solar approaches, < 0.1 AU)
- **Volatile migration sintering**: At lower temperatures, volatile sublimation and recondensation can cement grains at moderate depths (~10-100 cm)
- **Strength enhancement**: Sintered material can be 10-100x stronger than unsintered rubble
- **Layer thickness**: Highly uncertain, ranging from millimeters to meters depending on thermal history

**Impact on Excavation:**
A sintered crust overlying loose rubble creates a worst-case scenario for bucket-wheel excavation: the system must first break through a hard layer, then transition to handling very weak material underneath. This is analogous to breaking through an ice crust on a pond -- the force required for the crust bears no relation to the material beneath it.

---

## 6. Application to Project Dyson Mining Architecture

### 6.1 Key Design Parameters from Literature

Synthesizing across all reviewed sources, the following parameter ranges should drive excavation system design:

**Material Property Envelope:**

| Parameter | Lower Bound | Design Point | Upper Bound | Source |
|-----------|------------|--------------|-------------|--------|
| Surface cohesion | 0.2 Pa | 25 Pa | 80 Pa | TAG + Sanchez & Scheeres |
| Subsurface cohesion (0.5 m) | 25 Pa | 100 Pa | 500 Pa | Inferred from porosity gradient |
| Bulk porosity (surface) | 40% | 50% | 60% | Tricarico et al. |
| Bulk porosity (1 m depth) | 25% | 35% | 45% | Tricarico et al. |
| Bulk density | 0.9 g/cm^3 | 1.2 g/cm^3 | 1.9 g/cm^3 | OSIRIS-REx |
| Particle size (regolith) | 10 um | 100 um - 1 cm | 10 cm | Returned samples |
| Boulder compressive strength | 0.2 MPa | 1 MPa | 10 MPa | Tricarico et al. |
| Sintered crust strength | 500 Pa | 5 kPa | 50 kPa | Estimated |
| Thermal conductivity | 0.001 W/m-K | 0.01 W/m-K | 0.1 W/m-K | Luan & Goldreich |

### 6.2 Uncertainty Ranges for Mechanical Properties

The uncertainty in subsurface mechanical properties spans approximately two orders of magnitude for most parameters. This uncertainty is not reducible by additional modeling -- it requires direct measurement through one or more of:

1. **In-situ penetrometer**: Measures strength vs. depth profile to ~1-2 m. Provides ground truth for the critical excavation zone.
2. **Radar tomography**: Maps density structure to ~100 m depth. Cannot measure strength directly but constrains porosity gradient.
3. **Returned subsurface samples**: Would provide grain-level mechanical data but no mission is planned with subsurface sampling capability.
4. **Excavation telemetry**: The mining robot itself becomes the characterization instrument during initial operations, feeding force/torque data back to refine models in real time.

**Risk Assessment:**

| Scenario | Probability | Impact on Excavation | Mitigation |
|----------|------------|---------------------|------------|
| Material weaker than expected | 30% | Containment challenge, low throughput forces | Enclosed bucket design, reduced speed |
| Material within design range | 40% | Nominal operations | Baseline design |
| Material stronger than expected | 20% | Higher power, potential tooth wear | Harder tooth material, depth limiting |
| Sintered crust encountered | 10% | Requires breaking through hard layer | Pre-scoring mechanism, percussion option |

### 6.3 Recommended Testing Sequence

Based on the literature gaps and uncertainties identified, the following testing sequence is recommended for Project Dyson:

**Phase A -- Simulant Development (0-2 years):**
1. Calibrate CI/CM chondrite simulants against Bennu and Ryugu returned sample mechanical data
2. Develop volatile-bearing simulant variants (ice-cemented regolith)
3. Grade simulant fidelity using the Metzger et al. framework
4. Produce standardized simulant batches for excavation testing

**Phase B -- Terrestrial Excavation Testing (1-3 years):**
1. Bucket-wheel excavation tests in calibrated simulants at 1g
2. Scaling analysis to predict microgravity performance
3. Reduced-gravity testing (parabolic flight or drop tower) for short-duration validation
4. Parametric variation across the full property envelope (Table in 6.1)
5. Adaptive algorithm development and testing

**Phase C -- Precursor Mission (3-8 years):**
1. Radar tomography mission to candidate target asteroid (DISCUS-type)
2. Surface penetrometer deployment (if mission architecture permits)
3. Update excavation system design based on target-specific subsurface data

**Phase D -- Initial Mining Operations (8+ years):**
1. Deploy mining robot with full adaptive capability
2. Use initial excavation telemetry as subsurface characterization data
3. Progressively increase depth and throughput as material properties are confirmed
4. Feed operational data back to refine models for subsequent mining sites

---

## 7. Research Gaps and Open Questions

### 7.1 Critical Gaps (Must Resolve Before Mining Operations)

1. **No direct subsurface mechanical measurement exists for any asteroid.** All current knowledge is inferred from surface observations, spin-rate statistics, and modeling. The OSIRIS-REx TAG anomaly demonstrates that these inferences can be wrong by orders of magnitude.

2. **No microgravity excavation experiments have been conducted with representative simulants.** The force balance between cohesion, gravity, and inertia is fundamentally different at 0.1 mm/s^2 than at 9.8 m/s^2. Terrestrial testing alone cannot validate excavation system design.

3. **Heterogeneity at excavation-relevant scales is unconstrained.** Models treat rubble piles as statistically homogeneous, but the actual distribution of boulders, voids, and varying cohesion at 0.1-10 m scales is unknown.

### 7.2 Important Gaps (Should Resolve for Robust Design)

4. **Sintered crust properties are estimated, not measured.** The thickness, strength, and spatial distribution of thermally processed near-surface layers depend on the target's orbital history and are currently unconstrained.

5. **Simulant mechanical fidelity is inadequate.** Returned sample data enables significant improvement, but no simulant yet replicates the full mechanical property suite needed for excavation testing.

6. **Adaptive excavation algorithms are conceptual.** Real-time material property estimation from excavation telemetry requires development and validation in representative conditions.

### 7.3 Lower-Priority Gaps

7. **Scale-dependent strength transition** between cohesion-dominated small particles and gravity-dominated large structures is poorly constrained between 1 m and 1 km.

8. **Long-term excavation wear** in asteroid regolith is uncharacterized. Silicate mineral hardness is known, but the abrasive effect of fine regolith on bucket tooth materials over months of continuous operation needs experimental data.

9. **Volatile content variability** and its effect on mechanical properties (ice cementation, outgassing during excavation) is poorly constrained for specific target asteroids.

---

## 8. Appendix: Key Papers Referenced

| Source ID | Title | Relevance |
|-----------|-------|-----------|
| arxiv:1306.1622 | The Strength of Regolith and Rubble Pile Asteroids | Foundational van der Waals cohesion model (25-80 Pa) |
| arxiv:1706.03385 | Disaggregation of Small Cohesive Rubble Pile Asteroids due to YORP | Cohesion-dependent failure modes |
| arxiv:1810.01815 | Rubble Pile Asteroids | Comprehensive review of structure and evidence |
| arxiv:1909.11270 | Cohesive Regolith on Fast Rotating Asteroids | Surface regolith behavior under rotation |
| arxiv:1701.07547 | Optimized Bucket Wheel Design for Asteroid Excavation | Excavation system design optimization |
| arxiv:1805.01750 | DISCUS CubeSat mission to rubble pile NEA | Bistatic radar subsurface characterization |
| arxiv:1912.10622 | Measuring Fidelity of Asteroid Regolith Simulants | Simulant grading methodology |
| arxiv:2108.10416 | Internal rubble properties of Bennu | Measured interior properties from OSIRIS-REx |
| arxiv:2104.13516 | SPH Simulations for Shape Deformation of Rubble-Pile Asteroids | Numerical modeling of rubble pile mechanics |
| arxiv:2009.12605 | Critical spin periods of sub-km cohesive rubble piles | DEM modeling with cohesion |
| arxiv:1510.05295 | Thermal Conductivity of Rubble Piles | Thermal properties affecting excavation zone |
| arxiv:2209.02677 | Reshaping and ejection on rubble-pile asteroids by impacts | Impact mechanics relevant to excavation forces |
| OSIRIS-REx-TAG-2020 | Spacecraft-surface interaction during TAG at Bennu | Surface bearing capacity 0.2-20 Pa |
| Hayabusa2-Ryugu-2019 | Surface properties of Ryugu from touchdown | Ryugu surface mechanical properties |
| Scheeres-2010 | Scaling forces to asteroid surfaces: role of cohesion | Force scaling relationships for asteroid surfaces |
