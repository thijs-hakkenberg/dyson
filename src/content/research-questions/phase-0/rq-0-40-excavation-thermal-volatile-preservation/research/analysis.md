---
questionId: "rq-0-40"
analysisDate: "2026-03-17"
status: "partial-answer"
confidence: "medium"
---

# Thermal Management for Volatile Preservation During Excavation: Literature Analysis

## Executive Summary

This RQ has the **strongest arxiv coverage** of the six new literature reviews, with directly relevant papers on thermal volatile extraction modeling (Metzger et al.), ice sublimation evolution (Miura & Yasuda), excavation system design (Nallapu et al.), and subsurface ice characterization (Jiang et al.). The key finding is that **physics-based thermal models for volatile extraction exist and can be adapted to model volatile loss during excavation**. The inverse problem — minimizing rather than maximizing volatile release — is well-posed but not yet solved in the literature.

---

## 1. Thermal Extraction Modeling: The Foundation

### 1.1 Metzger et al. Volatile Extraction Model

The most important paper for this RQ is Metzger, Zacny & Morrison (arxiv:2306.03776), which develops an axisymmetric Crank-Nicholson thermal model for volatile extraction from lunar and asteroid regolith. Key features:

- Uses empirical thermal conductivity data for regolith and mixed-composition ice
- Models heat capacity and sublimation kinetics based on laboratory measurements
- Tracks thermal front propagation through regolith layers
- Predicts volatile release profiles as a function of heating parameters

**For our purposes, this model can be run "in reverse"** — rather than optimizing for maximum volatile extraction, we can use it to predict how much volatile is lost as a function of:
- Excavation depth rate (how fast we dig)
- Solar exposure of freshly excavated surfaces
- Ambient thermal environment
- Regolith thermal properties

### 1.2 Ice Sublimation Timescales

Miura & Yasuda (arxiv:2505.00423) model the thermal evolution from cometary nuclei to asteroids, including structural contraction from ice sublimation. Their work provides:

- Sublimation rate as a function of temperature and vapor pressure
- Depth-dependent ice fraction profiles for evolved small bodies
- Timescales for volatile depletion at various heliocentric distances

For NEAs at ~1 AU, surface ice is unstable and sublimates rapidly. Ice persists only at depth, protected by insulating regolith. The critical implication: **excavation must proceed faster than the thermal wave that propagates inward from the newly exposed surface**.

## 2. Excavation System Interactions

### 2.1 Bucket Wheel Energy Input

Nallapu, Thoesen & Garvie (arxiv:1701.07547) design excavation systems for asteroid regolith. While focused on mechanical optimization, the energy analysis is relevant:

- Mechanical energy input during excavation generates heat at the cutting interface
- This localized heating propagates into surrounding regolith
- For ice-bearing regolith, this can trigger sublimation at the excavation face

The heat generated is small compared to solar heating, but at the excavation face where ice is freshly exposed, even small thermal perturbations can cause volatile loss.

### 2.2 Subsurface Ice Distribution

Jiang et al. (arxiv:2212.09534) use thermophysical modeling to constrain ice fractions on asteroid (704) Interamnia. Their finding that significant ice persists at shallow depths on outer main-belt asteroids is encouraging for ISRU, but the key insight for volatile preservation is:

- Ice distribution is strongly depth-dependent
- A thin desiccated layer overlies the ice-bearing zone
- Once this insulating layer is removed, sublimation begins immediately

## 3. The Volatile Preservation Problem

Combining the above, the volatile preservation challenge during excavation is:

1. **Remove overburden** (desiccated regolith) — no volatile concern
2. **Reach ice-bearing zone** — sublimation begins when ice is exposed
3. **Excavate ice-bearing material** — must minimize time between exposure and capture
4. **Transfer to processing** — material must remain cold during transport

The thermal timescale analysis suggests:
- At 1 AU, exposed ice sublimates at rates of ~0.1-1 mm/hour (rough estimate from Miura & Yasuda models)
- Excavation must either shade the work area or process material within minutes of exposure
- Thermal wave penetration depth ~√(κt) gives planning constraints for excavation scheduling

## 4. Assessment for Project Dyson

For NEA water extraction, thermal volatile preservation requires:
1. **Shaded excavation**: Sunshield over excavation site is likely necessary at 1 AU
2. **Rapid processing**: Minimize time between excavation and thermal processing
3. **Cold chain**: Excavated material transport must maintain low temperatures
4. **Thermal modeling**: Metzger et al. framework can be adapted for loss prediction

Confidence is "medium" because the physics is well-understood from the arxiv literature even though the specific engineering solutions are not yet designed.

## 5. Recommended Next Steps

1. **Adapt Metzger model** for volatile loss prediction during excavation
2. **Obtain NASA ISRU studies** on thermal mining (Sercel et al.)
3. **LPSC abstracts** for latest asteroid volatile characterization
4. **OSIRIS-REx Bennu sample results** for ground-truth volatile data
