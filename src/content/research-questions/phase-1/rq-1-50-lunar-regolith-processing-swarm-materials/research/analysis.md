---
questionId: "rq-1-50"
analysisDate: "2026-02-13"
status: "preliminary"
confidence: "medium"
---

# Lunar Regolith Processing for Dyson Swarm Materials: Literature Analysis

## Executive Summary

This analysis reviews published research on lunar regolith processing, oxygen extraction, and construction material production to assess the Moon as a feedstock source for Dyson swarm construction. The primary finding is that **molten regolith electrolysis (MRE) is the most promising processing route**, capable of extracting metals and oxygen from unbeneficiated whole regolith—eliminating the mineral separation bottleneck that plagues other ISRU approaches. Lunar regolith contains all major elements needed for solar collector manufacturing (Si, Al, Fe, Ti, O₂), and sintering/additive manufacturing enables construction of surface infrastructure from raw material. However, **achieving solar-grade silicon purity from MRE output remains an open challenge**, and the integrated cost of the full processing chain (excavation → electrolysis → refining → export) has not been established.

---

## 1. Lunar Regolith Composition and Resources

### 1.1 Element Availability

The Moon's surface has been extensively characterized by Apollo samples, Lunar Reconnaissance Orbiter, and Chandrayaan missions:

**Highland Regolith (60% of surface):**
- Al₂O₃: 24-28 wt% (anorthosite-rich)
- SiO₂: 44-46 wt%
- FeO: 3-6 wt%
- TiO₂: <1 wt%
- Best for: Aluminum extraction, silicate glass production

**Mare Regolith (17% of surface):**
- FeO: 12-18 wt%
- TiO₂: 1-8 wt% (ilmenite-bearing)
- SiO₂: 40-45 wt%
- Al₂O₃: 10-14 wt%
- Best for: Iron/titanium extraction, ilmenite processing

**Both regions:**
- Oxygen: 43-45 wt% (as oxides)—the dominant constituent by mass
- Minimal water (<100 ppm equatorial; up to 5 wt% in polar cold traps)
- Carbon and nitrogen: trace quantities only

### 1.2 Resource Scale

The Moon's total mass is 7.3×10²² kg, with ~1-10 m of regolith covering the surface:
- Accessible regolith mass (top 5 m): ~10¹⁶-10¹⁷ kg
- Even this surface layer exceeds Project Dyson's Phase 2 material requirements by orders of magnitude
- Deep mining (bedrock) would access effectively unlimited resources

---

## 2. Processing Routes

### 2.1 Molten Regolith Electrolysis (MRE)

Shaw et al. (2021, arxiv:2109.02201) evaluate MRE as the leading processing route:

**Process Description:**
- Raw regolith is heated to melting (~1,600°C for basalt, ~1,200°C for anorthosite)
- Electric current decomposes metal oxides
- Metallic alloy collects at the cathode
- Oxygen evolves at the anode

**Advantages:**
- Processes whole, unbeneficiated regolith—no mineral separation required
- Produces metallic alloy (Fe-Si-Ti-Al) and oxygen simultaneously
- Scalable from laboratory to industrial scale
- Solar furnace can provide process heat

**Output Characterization:**
- Metallic product is a mixed alloy requiring subsequent separation
- Typical composition: Fe (40-60%), Si (15-25%), Ti (5-15%), Al (5-10%)
- Oxygen purity: >99% after minimal processing
- Energy requirement: ~10-15 MWh per tonne of metal produced

**Relevance to Project Dyson:**
MRE's whole-regolith capability is its strongest advantage. Unlike asteroid ISRU, which may encounter compositional surprises between targets, lunar regolith composition is well-characterized and consistent within geological regions. The mixed alloy output requires further separation for PV manufacturing, but bulk structural applications could use the alloy directly.

### 2.2 Oxygen Extraction

De Guzman et al. (2026, arxiv:2601.14719) demonstrate oxygen production from lunar simulants:

**Key Results:**
- Electrolytic extraction efficiency: 70-90% of theoretical oxygen yield
- Energy requirement: ~4-6 MWh per tonne of O₂
- Product purity: >99.5% with simple cold trapping
- Co-produces metallic residue suitable for structural applications

**Application to Project Dyson:**
- O₂ is the most mass-abundant product from any lunar regolith processing
- Valuable as propellant for orbital transfer vehicles (bom-1-6)
- Required for chemical processing of extracted metals
- Potential export product: O₂ delivered to LEO or L1 offsets Earth-launch propellant costs

### 2.3 Construction Material Production

Gupta et al. (2023, arxiv:2308.14331) demonstrate regolith sintering:

**Sintering Results:**
- Regolith heated to 1,000-1,100°C forms solid bricks without binders
- Compressive strength: 20-40 MPa (comparable to concrete)
- Solar concentrators can provide sintering temperatures
- No volatile emissions in vacuum environment

McCallum et al. (2025, arxiv:2506.06392) advance additive manufacturing:

**AM Results:**
- Selective sintering/melting of regolith enables 3D-printed structures
- Complex geometries possible (not just bricks)
- Layer adhesion in vacuum is enhanced by absence of oxidation
- Dimensional accuracy: ±1-2 mm for cm-scale features

**Application to Project Dyson:**
These construction techniques enable building lunar surface infrastructure (processing plants, mass driver support structures, habitats) from local material, dramatically reducing Earth-imported mass for lunar base construction.

---

## 3. Silicon Purity Challenge

The critical question for solar collector manufacturing is whether lunar-derived silicon can achieve sufficient purity:

**MRE Output:** ~2N-3N purity (99-99.9%)
**UMG-Si requirement (per rq-0-15):** 4N-5N (99.99-99.999%)
**Solar-grade Si:** 6N-9N (99.9999-99.9999999%)

**Gap Assessment:**
- MRE silicon requires 1-3 orders of magnitude additional purification
- Directional solidification (zone refining) in vacuum could achieve 4N-5N
- Vacuum conditions on the Moon actually favor purification by evaporation of volatile impurities
- The question is whether the energy cost of additional purification is justified vs. importing higher-purity silicon

**Potential Pathway:**
1. MRE extracts mixed alloy from regolith (2N-3N)
2. Vacuum directional solidification separates Si from Fe/Ti/Al (3N-4N)
3. Additional zone refining pass achieves UMG-Si grade (4N-5N)
4. If rq-0-15's finding holds (UMG-Si viable for space PV), this pipeline is sufficient

---

## 4. Export Economics

### 4.1 Electromagnetic Launch

The Moon's properties favor electromagnetic launch for bulk export:
- Escape velocity: 2.38 km/s (vs. 11.2 km/s Earth, 4.3 km/s Mercury)
- No atmosphere: no aerodynamic losses or heating
- Stable surface: permanent track installation possible
- Abundant solar power for energy storage and launch

Estimated launch cost: $1-10/kg (energy cost only, excluding infrastructure amortization)

### 4.2 Delivery to Construction Zone

From lunar orbit to 1 AU heliocentric:
- Delta-v: ~1-3 km/s (depending on trajectory)
- Solar sail transport feasible for bulk, non-time-critical shipments
- L2 staging depot enables batch processing and trajectory optimization

### 4.3 Comparison with Asteroid ISRU

| Parameter | Lunar ISRU | Asteroid ISRU |
|-----------|-----------|--------------|
| Composition certainty | High (Apollo data) | Low (remote sensing only for most targets) |
| Processing route maturity | Medium (MRE demonstrated at lab scale) | Low (conceptual for most routes) |
| Export delta-v | 2.4 km/s + transfer | 0.5-4 km/s (varies by target) |
| Infrastructure stability | High (stable surface) | Low (microgravity, rotating bodies) |
| Communication delay | 1.3 seconds | Minutes to hours |
| Near-term accessibility | High (Artemis era) | Medium (dedicated missions needed) |

---

## 5. Application to Project Dyson

### 5.1 Bootstrap Scenario

The Moon's strongest value proposition is as a **bootstrap feedstock source** for early Phase 1:
- Leverages Artemis infrastructure investment
- Provides materials within ~5 years of facility deployment
- Bridges the gap until asteroid ISRU is operational
- Near-real-time teleoperation reduces autonomy requirements

### 5.2 Sustained Supply Chain

For sustained production, the Moon competes with asteroids on cost:
- Higher export delta-v (disadvantage)
- Consistent composition and stable operations (advantage)
- Co-produced oxygen offsets propellant costs (advantage)
- Established logistics infrastructure (advantage over dispersed asteroid targets)

### 5.3 Recommendations

1. **Include lunar ISRU in Phase 1 feedstock trade study** alongside asteroid ISRU
2. **Prioritize MRE-to-UMG-Si processing chain validation** as the critical technology question
3. **Design mass drivers (bom-1-5) for dual use**: asteroid launch and lunar launch applications
4. **Model bootstrap scenario**: lunar materials for first 100-1,000 collector units while asteroid infrastructure matures
5. **Engage with Artemis program** to identify infrastructure leverage opportunities

---

## Appendix: Key Papers Referenced

| Arxiv ID | Title | Relevance |
|----------|-------|-----------|
| 2109.02201 | Lunar Regolith Processing for ISRU | MRE processing route evaluation |
| 2601.14719 | Oxygen Production from Lunar Simulants | O₂ extraction demonstration |
| 2308.14331 | Sintered Bricks from Lunar Regolith | Construction material validation |
| 2506.06392 | AM Structural Blocks from Lunar Simulant | Additive manufacturing capability |
