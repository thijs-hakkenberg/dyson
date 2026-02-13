---
questionId: "rq-1-9"
analysisDate: "2026-02-13"
status: "partial-answer"
confidence: "medium-high"
---

# Perovskite Space Qualification: Extended Literature Analysis

## Executive Summary

This analysis extends the existing rq-1-9 investigation with new findings from 2023-2026 on perovskite solar cell radiation protection, encapsulation, and space qualification testing. **The key finding: a SiO2 barrier + polyimide encapsulation architecture is emerging as the likely baseline for space-qualified perovskite PV, validated by NREL radiation testing and polymer encapsulation studies.** Georgia Tech's MISSE-21 mission (18 PV cells on ISS exterior, data expected mid-2026) will provide the first direct in-situ comparison data. Self-healing properties are confirmed but require careful interpretation — early tests using low-efficiency cells may have underreported true radiation sensitivity.

---

## 1. NREL SiO2 Radiation Barrier

### 1.1 Key Results

NREL researchers demonstrated a **micron-thick silicon oxide (SiO2) layer** as a radiation barrier for perovskite cells:

- Reduces weight of conventional radiation barriers by **>99%**
- Protected cells showed **no damage** from low-energy proton bombardment that would degrade unprotected cells
- Under moisture and temperature stress: protected cells retained **19% efficiency** while unprotected cells degraded to 10.8%
- Extended projected orbital lifetime from months to years

### 1.2 Mechanism

SiO2 acts as a physical barrier that:
- Stops low-energy protons before they reach the perovskite absorber layer
- Provides moisture barrier for terrestrial environments (secondary benefit)
- Adds negligible mass (micron-scale thickness)
- Compatible with existing thin-film deposition processes

### 1.3 Limitations

- Protection validated against low-energy protons; high-energy GCR and heavy ion response needs characterization
- Long-term SiO2 stability under UV and thermal cycling in space not fully tested
- Manufacturing integration with roll-to-roll perovskite deposition needs development

---

## 2. Polyimide Encapsulation Validation

### 2.1 Systematic Comparison (October 2025)

Moore et al. compared four polymer encapsulants for flexible perovskite cells under LEO proton radiation:

**Results:** Polyimide (PI) emerged as the best encapsulation material at all proton energy levels tested.

**Why this matters for Project Dyson:**
- Kapton (a polyimide) is already the baseline substrate material for thin-film PV blankets
- The substrate itself can serve as the primary encapsulation layer — no additional mass required
- This validates the existing architecture rather than requiring design changes
- Polyimide's space heritage (decades of use as thermal blanket material) provides confidence

---

## 3. Self-Healing: Important Caveats

### 3.1 2025 Perspective

A 2025 perspective piece by Kirmani & Sellers provides critical nuance to the self-healing narrative:

**What is confirmed:**
- Perovskites do exhibit genuine self-healing of radiation damage
- Lattice fluidity allows defect migration and recombination over time
- Damaged cells can partially recover performance after radiation exposure

**What is cautioned:**
- The same lattice fluidity that enables healing can cause **ionic flow and material decomposition** under intense, prolonged radiation
- **Low-efficiency cells used in early tests may have masked radiation damage** — pre-existing defects provide a high "noise floor" that hides radiation-induced defects
- Proper testing requires **stable, high-efficiency devices** to detect degradation
- Testing should use **50-150 keV protons** (not high-energy protons used in conventional III-V testing)

### 3.2 Implications

The self-healing property remains a genuine advantage but should not be relied upon as the primary radiation mitigation strategy. Physical barriers (SiO2) and encapsulation (polyimide) should be the first line of defense, with self-healing providing additional margin.

---

## 4. MISSE-21 ISS Flight Test

### 4.1 Mission Details

Georgia Tech Research Institute is sending **18 photovoltaic cells** (including perovskite-based cells) to the ISS exterior via the MISSE-21 mission:

- **Launch**: Planned late 2025
- **Duration**: 6 months external exposure
- **Environment**: LEO — thermal cycling, radiation, atomic oxygen, UV
- **Measurements**: Performance degradation, visual inspection, post-flight analysis
- **Chemistries**: Multiple perovskite formulations compared side-by-side with conventional cells

### 4.2 Expected Data (mid-2026)

This will provide:
- First in-situ comparison of multiple perovskite chemistries under identical real space conditions
- Thermal cycling response (LEO experiences ~16 cycles/day)
- Actual radiation degradation rates vs. accelerated ground testing
- Atomic oxygen exposure effects (more aggressive in LEO than L4/L5)
- Direct comparison with conventional thin-film cells

### 4.3 Applicability to Project Dyson

LEO is a more aggressive environment than L4/L5 for atomic oxygen and thermal cycling, but less severe for radiation. The MISSE-21 data will provide useful reference points but will need correction for the L4/L5 radiation environment.

---

## 5. Updated Baseline Architecture

Based on the combined evidence, the emerging baseline for Project Dyson perovskite PV:

| Layer | Material | Thickness | Function |
|-------|----------|-----------|----------|
| Top barrier | SiO2 | ~1 μm | Radiation + moisture protection |
| Absorber | CsFAPbI3 perovskite | ~500 nm | Primary PV active layer |
| Substrate | Polyimide (Kapton) | 12-25 μm | Structural + encapsulation + radiation |
| Bottom contact | Metal film | ~100 nm | Electrical contact |
| **Total** | | **~15-27 μm** | **~43-48 g/m²** |

This architecture aligns with the previously revised areal mass density target of 43-48 g/m² (from 35 g/m² to accommodate encapsulation).

---

## 6. Updated Assessment

### 6.1 Confidence Level: Medium-High

Multiple independent studies converge on the SiO2 + polyimide architecture. Flight data from MISSE-21 will either confirm or revise this baseline.

### 6.2 Status: Remains Investigating

The question status remains "investigating" but with substantially increased confidence. MISSE-21 data (mid-2026) is the key decision point.

### 6.3 What Is Well-Established

- SiO2 micron-thick barrier provides effective radiation protection at negligible mass
- Polyimide is the best-performing encapsulation material under proton radiation
- Self-healing is genuine but requires careful characterization with high-efficiency devices
- 43-48 g/m² areal mass density is achievable with the baseline architecture

### 6.4 What Remains Unknown

- Multi-year degradation rates under L4/L5 radiation environment
- MISSE-21 in-situ data (expected mid-2026)
- Roll-to-roll production of SiO2-coated perovskite on polyimide at scale
- Combined long-term stressor response (UV + thermal + radiation simultaneously)

---

## 7. Research Gaps

1. **MISSE-21 data analysis**: When available (mid-2026), analyze and apply to L4/L5 conditions with radiation environment correction factors

2. **SiO2 barrier optimization**: Characterize SiO2 thickness vs. protection level trade-off for L4/L5 radiation spectrum (heavier ions than LEO)

3. **Combined stressor testing**: Perform simultaneous UV + thermal cycling + proton irradiation on SiO2/perovskite/polyimide stacks to capture synergistic degradation

4. **Roll-to-roll integration**: Demonstrate SiO2 deposition on perovskite-on-polyimide in a roll-to-roll process to validate manufacturing scalability

5. **L4/L5 radiation environment modeling**: Generate perovskite-specific degradation predictions for the 1 AU, non-magnetospheric L4/L5 environment

---

## Appendix: Key References

| Source ID | Title | Relevance |
|-----------|-------|-----------|
| NREL-2023 | SiO2 Radiation Barrier for Perovskites | Micron-thick barrier, >99% weight reduction |
| MDPIEnergies-2025 | Perovskite Solar Cells with Space Environmental Resistance | Self-healing caveats |
| GaTech-2025 | MISSE-21 PV Materials Testing | ISS in-situ flight test |
| MooreMore-2025 | Polyimide Encapsulation for Perovskite under Radiation | PI best at all proton energies |
| PMC-2022 | Advances in Perovskites for Space PV | Comprehensive review |
| iScience-2018 | Perovskite Tolerance to Space Radiation | Early tolerance data |
