---
questionId: "rq-0-15"
analysisDate: "2026-02-12"
status: "partial-answer"
confidence: "medium"
---

# Achievable Silicon Purity for Solar Cells: Literature Analysis

## Executive Summary

This analysis reviews published research on silicon purification methods, solar cell performance as a function of purity, and crystal growth in microgravity to assess the achievable silicon purity for Project Dyson's in-space photovoltaic manufacturing. The key finding is that **upgraded metallurgical grade (UMG) silicon at 4N-5N purity is achievable through metallurgical processing routes and can produce viable solar cells at 15-18% efficiency**, significantly relaxing the traditional 6N requirement. However, **no silicon purification has been demonstrated in microgravity**, and the float zone process—the most promising purification method—is fundamentally gravity-dependent. Asteroid-derived silicon feedstock will contain different impurity profiles (higher Fe, Ni, Co) than terrestrial sources, requiring adapted purification pathways. Alternative cell architectures (multi-junction, nanowire) may further relax purity requirements. A pragmatic approach is to target 4N-5N purity using metallurgical methods adapted for microgravity, accepting 15-18% cell efficiency rather than pursuing 6N purity with unproven processes.

---

## 1. Silicon Purification: Terrestrial State of the Art

### 1.1 Upgraded Metallurgical Grade Silicon

Fornies et al. (arxiv:2101.08019) present the most relevant work for Project Dyson's needs—demonstrating that the metallurgical route alone can produce PV-viable silicon:

**Process Description (Ferrosolar Process):**
- Starts with metallurgical-grade silicon (98-99% pure, 2N)
- Sequential purification steps: acid leaching, directional solidification, plasma treatment
- Achieves 4N-5N purity (99.99-99.999%)
- Significantly lower energy input than the Siemens chemical process

**Solar Cell Performance with UMG-Si:**
- Mass production test on commercial cell production lines
- Cell efficiency: 15-18% (vs. 20-22% for Siemens-grade 6N silicon)
- Primary efficiency loss from Fe, Ti, and other transition metal impurities
- Module-level degradation rates comparable to high-purity silicon modules

**Critical Insight for Project Dyson:**
This demonstrates that **6N purity is not required for functional solar cells**. A 4N-5N metallurgical route, which is much simpler than chemical purification, can produce cells with ~75-85% of the efficiency of high-purity cells. For a Dyson swarm where collector area is less constrained than processing complexity, this trade-off may be favorable.

### 1.2 Zone Refining Process Parameters

Wünscher et al. (arxiv:1102.3800) provide detailed measurements of the float zone crystal growth process:

**Key Process Parameters:**
- Growth angle: 11° ± 2° (directly measured during 2" crystal growth)
- Melt meniscus shape is governed by surface tension, gravity, and electromagnetic forces
- RF heating provides contactless, contamination-free energy input
- Zone travel speed: typically 1-5 mm/min for high-purity output

**Gravity Dependence:**
- Melt meniscus shape is **explicitly gravity-dependent**
- Gravity provides hydrostatic pressure that helps contain the molten zone
- In microgravity, surface tension dominates exclusively
- Zone stability, maximum zone length, and melt convection all change

**Microgravity Implications:**
- Float zone can potentially produce larger-diameter crystals in microgravity (no gravity-induced instability)
- But process parameters must be completely re-optimized
- Convection patterns change from buoyancy-driven to Marangoni (surface-tension-driven) only
- Impurity segregation coefficients may differ due to altered convection

### 1.3 Impurity Effects on Cell Performance

Research referenced in the question frontmatter (arxiv:2106.15926) establishes the quantitative relationship between impurity concentration and cell efficiency:

**Most Detrimental Impurities:**
| Impurity | Tolerable Concentration | Effect at 10x Limit |
|----------|------------------------|---------------------|
| Iron (Fe) | <0.1 ppma | 30-50% efficiency loss |
| Titanium (Ti) | <0.01 ppma | 40-60% efficiency loss |
| Chromium (Cr) | <0.1 ppma | 20-40% efficiency loss |
| Copper (Cu) | <1 ppma | 10-20% efficiency loss |
| Boron (B) | <0.3 ppma (p-type) | Conductivity type change |
| Phosphorus (P) | <0.1 ppma (p-type) | Conductivity type compensation |

**Asteroid Feedstock Challenge:**
Asteroid-derived silicon will be **enriched in Fe, Ni, and Co** relative to terrestrial feedstock (from the metallic fraction of asteroid material). These happen to be among the most damaging impurities. This means asteroid silicon purification must be particularly effective at removing siderophile elements.

---

## 2. Purification Methods Applicable to Microgravity

### 2.1 Directional Solidification

**Process:** Slowly solidify a melt from one end, exploiting the tendency of impurities to remain in the liquid phase (segregation coefficients < 1).

**Microgravity Considerations:**
- Does not require gravity for the basic solidification process
- However, convective mixing in 1-g helps homogenize the melt; in microgravity, diffusion-limited transport may create composition gradients
- Could achieve 3N-4N purity from metallurgical-grade feedstock
- Multiple passes improve purity at the cost of yield and time

**Assessment for Space Processing:** **Most feasible first purification step.** Can be implemented with electromagnetic containment and controlled cooling. Serves as the first-stage upgrade from raw asteroid silicon to intermediate purity.

### 2.2 Zone Refining (Float Zone)

**Process:** Pass a narrow molten zone along a silicon rod. Impurities preferentially remain in the liquid, accumulating at one end.

**Microgravity Considerations:**
- Gravity helps contain the molten zone in terrestrial processing
- In microgravity, electromagnetic forces and surface tension must provide all containment
- Marangoni convection replaces buoyancy-driven convection, altering impurity transport
- Potentially advantageous: larger zone possible, no crucible contact contamination

**Assessment for Space Processing:** **Promising but unproven.** Theoretical advantages exist for microgravity zone refining (no crucible contamination, potentially longer zones), but no experiments have been conducted. This is the critical unknown.

### 2.3 Plasma Purification

**Process:** Expose molten silicon surface to reactive plasma (O₂, Ar, Cl) to selectively remove impurities as volatile species.

**Microgravity Considerations:**
- Does not rely on gravity for the core purification mechanism
- Plasma generation and containment well-understood from space propulsion technology
- Surface area exposure may be enhanced in microgravity (spherical melt geometry)
- Gas handling in vacuum environment is straightforward

**Assessment for Space Processing:** **Viable complementary process.** Can remove B and P (the impurities most difficult to remove by solidification methods). Adaptable to microgravity with existing plasma technology.

### 2.4 Electron Beam Refining

**Process:** Focused electron beam melts silicon surface, evaporating volatile impurities under vacuum.

**Microgravity Considerations:**
- Vacuum operation is natural in space
- Electron beam technology has space heritage (welding, inspection)
- No gravity dependence in the purification mechanism
- Energy efficiency may be acceptable for targeted impurity removal

**Assessment for Space Processing:** **Viable for final polishing step.** Best suited for removing residual volatile impurities after bulk purification by other methods.

---

## 3. Solar Cell Architectures and Purity Requirements

### 3.1 Standard Crystalline Silicon

- Requires 6N purity for 20%+ efficiency
- Well-established manufacturing process
- Mass-production cell efficiency: 20-22% (terrestrial, 2026)
- Degradation well-characterized over 25+ year lifetimes

### 3.2 UMG Silicon Cells (4N-5N)

Based on Fornies et al. (arxiv:2101.08019):
- Achievable efficiency: 15-18%
- Lower processing energy requirements
- Degradation behavior comparable to high-purity cells
- **Recommended baseline for Project Dyson**

### 3.3 Multi-Junction Cells

Hossain et al. (arxiv:1905.08024) demonstrate multi-junction cell design:
- Theoretical efficiency up to 47% (4-junction)
- Uses III-V semiconductors (InGaP, GaAs, InGaAs)
- Does not require silicon at all for some designs
- But: requires gallium, indium, germanium—rare in asteroid material

**Relevance:** If silicon purity proves unachievable, III-V multi-junction cells are an alternative, but they face their own material availability challenges from asteroid feedstock.

### 3.4 Nanowire Solar Cells

Raj et al. (arxiv:2103.13190) review nanowire cell architectures:
- Radial junction nanowires have short carrier collection lengths
- Can tolerate higher impurity concentrations than planar cells
- Potentially viable with 3N-4N silicon
- But: manufacturing complexity is higher

**Relevance:** Nanowire architectures could be a **fallback option** if achievable purity is 3N-4N, allowing functional cells from lower-purity silicon.

### 3.5 Space Radiation Environment

Girish & Aranya (arxiv:1012.0717) analyze solar cell performance in the lunar radiation environment:

**Key Findings:**
- Radiation-induced degradation reduces cell efficiency by 10-30% over 10-year lifetimes
- Degradation rate depends on cell architecture and shielding
- Initial efficiency matters less when radiation degradation dominates long-term performance

**Implication for Purity Trade-off:**
If radiation degrades cells by 20% regardless, the difference between a 20% cell (6N silicon) degraded to 16% and an 18% cell (5N silicon) degraded to 14.4% is only 1.6 percentage points. **The effort to achieve 6N purity may yield diminishing returns when radiation degradation is the dominant long-term factor.**

---

## 4. Achievable Purity Assessment

### 4.1 Purity Projection by Processing Method

| Method | Starting Purity | Achievable Purity | Microgravity TRL | Energy Cost |
|--------|----------------|-------------------|-----------------|-------------|
| Directional solidification | 2N (MG-Si) | 3N-4N | 3-4 | Low |
| Zone refining | 3N-4N | 5N-6N | 1-2 | Medium |
| Plasma purification | 3N-4N | 4N-5N (B, P removal) | 3-4 | Medium |
| Electron beam | 4N-5N | 5N (volatile removal) | 4-5 | Medium-High |
| Combined chain | 2N | **4N-5N realistic, 6N aspirational** | 1-2 (limiting step) | High |

### 4.2 Recommended Purification Chain for Space

1. **Stage 1: Directional Solidification** (asteroid MG-Si → 3N-4N)
   - Electromagnetic containment, controlled cooling
   - Remove bulk metallic impurities (Fe, Ni, Co)
   - Multiple passes for incremental improvement

2. **Stage 2: Plasma Treatment** (3N-4N → 4N-5N)
   - Remove B and P that resist solidification-based removal
   - Reactive gas plasma in vacuum environment
   - Can be applied to molten silicon in electromagnetic containment

3. **Stage 3 (Optional): Zone Refining** (4N-5N → 5N-6N)
   - Only if microgravity zone refining is validated
   - Final polish for highest-purity requirements
   - May not be necessary if UMG cells are the baseline

### 4.3 Bottom Line

**Realistic achievable purity: 4N-5N (99.99-99.999%)**

This is sufficient for UMG-grade solar cells at 15-18% efficiency. Achieving 6N purity requires zone refining in microgravity, which is currently at TRL 1-2 and may take a decade to develop. The recommended approach is to **design for 4N-5N silicon** and treat 6N as a future upgrade path.

---

## 5. Research Gaps and Recommended Experiments

### 5.1 Critical Gaps

1. **Microgravity zone refining demonstration**: The single most impactful experiment would be a float zone silicon purification trial on the ISS to measure achievable purity and process stability.

2. **Asteroid-composition silicon purification**: No purification studies use feedstock with asteroid-typical impurity profiles (high Fe, Ni, Co; low B, P). Standard purification effectiveness data may not apply.

3. **Impurity segregation coefficients in microgravity**: Fundamental materials science data needed for process modeling. Without buoyancy-driven convection, effective segregation coefficients will differ from terrestrial values.

4. **UMG cell performance in space radiation**: Long-term degradation data for lower-purity cells in the L4/L5 radiation environment does not exist.

5. **Alternative purification scaling**: Plasma purification and e-beam refining have not been evaluated at the tonnes/year scale needed for industrial production.

### 5.2 Recommended Experiment Program

1. **ISS Float Zone Experiment** (near-term, critical priority): Conduct zone refining of MG-Si sample in microgravity. Measure impurity profiles before and after. Determine if microgravity is advantageous or detrimental.

2. **Asteroid Simulant Purification** (near-term): Process silicon extracted from asteroid regolith simulants through directional solidification and plasma treatment. Characterize achievable purity from asteroid-typical feedstock.

3. **Degraded-Purity Cell Radiation Testing** (medium-term): Fabricate cells from 3N, 4N, 5N, and 6N silicon. Subject to accelerated radiation testing simulating 30-year L4/L5 exposure. Determine if initial purity matters for long-term performance.

---

## Appendix: Key Papers Referenced

| Arxiv ID | Title | Relevance |
|----------|-------|-----------|
| 2101.08019 | UMG silicon for solar PV | UMG-Si production and cell performance |
| 1102.3800 | Float Zone Silicon Crystal Growth Parameters | Zone refining process baseline |
| 2102.11571 | Silicon crystal growth and purification techniques | Purification pathway review |
| 2106.15926 | Impurity effects on silicon solar cell performance | Purity-efficiency relationship |
| 2111.13522 | Advanced zone refining techniques | Process optimization |
| 1905.08024 | Quadruple junction solar cell design | Alternative cell architecture |
| 1012.0717 | Solar cell performance in lunar radiation | Space radiation degradation |
| 2103.13190 | Nanowire solar cell architectures | Lower-purity-tolerant cell design |
