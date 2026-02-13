---
questionId: "rq-1-31"
analysisDate: "2026-02-13"
status: "partial-answer"
confidence: "high"
---

# Alternative Propellant Viability for Hall Thrusters: Literature Analysis

## Executive Summary

This analysis reviews the state of alternative propellant technology for Hall-effect thrusters, focusing on argon and krypton as replacements for xenon. **The key finding: SpaceX has operationally deployed argon-fueled Hall thrusters at massive constellation scale on Starlink V2 Mini satellites, achieving 2.4x thrust and 1.5x specific impulse over their previous krypton thrusters at a propellant cost of $7-15/kg versus $5,000-12,000/kg for xenon.** This single data point transforms the question from "Can alternative propellants work?" to "How do we optimize purpose-built thrusters for Project Dyson's specific requirements?" Additionally, iodine has emerged as a third candidate with near-xenon performance characteristics.

---

## 1. SpaceX Argon Thrusters at Scale

### 1.1 Starlink V2 Mini Deployment

SpaceX's Starlink V2 Mini satellites represent the largest-scale validation of alternative propellant Hall thrusters ever achieved:

**Performance vs. Previous Generation:**
| Parameter | V1.5 (Krypton) | V2 Mini (Argon) | Improvement |
|-----------|-----------------|------------------|-------------|
| Thrust | Baseline | **2.4x higher** | Substantial |
| Specific impulse | Baseline | **1.5x higher** | Significant |
| Propellant cost | $2,100-4,800/kg | **$7-15/kg** | ~200-600x cheaper |
| Supply constraint | Limited production | Unlimited (0.93% atmosphere) | Eliminated |

### 1.2 Significance

This is not a laboratory demonstration or a technology paper — it is **operational deployment at constellation scale** (thousands of satellites). SpaceX has solved the engineering challenges of argon Hall thrusters including:
- Feed system design for lower-density propellant
- Thruster optimization for argon ionization characteristics
- Thermal management across the operational envelope
- Integration with satellite bus and power systems

---

## 2. Comprehensive Propellant Performance Data

### 2.1 Measured Performance Comparison

Data from IEPC 2025 and related papers (note: from a 100W-class thruster not optimized for alternatives — purpose-built designs perform significantly better):

| Propellant | Peak Thrust | Anode Efficiency | Isp | Cost/kg |
|------------|-------------|------------------|-----|---------|
| Xenon | 12.6 mN | 26.3% | 2,160 s | $5,000-12,000 |
| Krypton | 6.9 mN | 15.2% | 1,730 s | $2,100-4,800 |
| Argon | 6.6 mN | 9.6% | 1,390 s | $7-15 |
| Nitrogen | 5.7 mN | 5.4% | 1,000 s | $0.50-2 |

### 2.2 Purpose-Built Design Performance

These baseline numbers dramatically understate what purpose-built designs achieve:

- **Argon Isp of 1,500s** achievable with extended discharge channels (vs. 1,390s stock)
- SpaceX's purpose-built argon thrusters achieve **2.4x thrust** of their previous krypton design
- IPPLM (Poland) designed a krypton-specific thruster with custom magnetic field and reinforced channels for higher heat loads
- Argon-xenon mixtures show promise: xenon's low ionization energy facilitates argon ionization in mixed-propellant operation

### 2.3 Iodine as Third Option

Multiple studies identify iodine as a compelling alternative:
- Near-xenon performance at all power levels
- Condensable and storable as a solid — no high-pressure tanks required
- Lower cost than xenon
- Feed system complexity is the primary concern (corrosive vapor)

---

## 3. Supply Chain Analysis

### 3.1 Propellant Availability

| Propellant | Annual Production | Dyson Fleet Need (Initial) | Years of Production |
|------------|-------------------|---------------------------|---------------------|
| Xenon | 40-50 tonnes | 160-320 tonnes | **4-8 years** |
| Krypton | ~400 tonnes | 160-320 tonnes | ~0.5-1 year |
| Argon | Essentially unlimited | 160-320 tonnes | **<1 day** |

Argon is 0.93% of Earth's atmosphere. Global production capacity is measured in millions of tonnes per year. Supply chain risk is eliminated.

### 3.2 Cost Impact at Fleet Scale

For 800 orbital tugs with 200-400 kg propellant capacity:
- **Xenon**: $800M-$3.8B for initial fueling alone
- **Krypton**: $336M-$1.5B
- **Argon**: **$1.1M-$4.8M** — essentially free at this scale

---

## 4. Application to Project Dyson

### 4.1 Recommended Propellant Strategy

Based on the evidence, a **krypton-primary / argon-fallback** strategy appears optimal for Phase 1 orbital tugs:

**Krypton primary**: Better specific impulse and efficiency than argon, manageable supply at 800-unit fleet scale, thruster designs well-characterized
**Argon fallback**: Proven at constellation scale by SpaceX, unlimited supply, dramatically lower cost, purpose-built designs closing the performance gap
**Iodine investigation**: Near-xenon performance warrants dedicated evaluation as potential primary propellant if feed system challenges are resolved

### 4.2 Thruster Specification Updates

The consensus specification for 10-12.5 kW Hall thrusters should be updated to require:
- Multi-propellant qualification (krypton baseline, argon backup)
- Purpose-built magnetic field topology for primary propellant (not adapted from xenon)
- Feed system compatibility with both krypton and argon
- Extended discharge channel option for argon operation

### 4.3 What This Resolves

The existential xenon supply chain risk identified in the original question is **eliminated**. Both krypton and argon provide viable alternatives with sufficient supply for fleet-scale operations. The remaining questions are performance optimization, not feasibility.

---

## 5. Updated Assessment

### 5.1 Confidence Level: High

SpaceX's operational deployment of argon thrusters at constellation scale provides definitive evidence of viability. Multiple independent research programs confirm performance characteristics.

### 5.2 Status Change: Open → Investigating + Partially Resolved

The core question — "Can alternative propellants work at scale?" — is answered: yes. SpaceX has proven it operationally. The remaining investigation focuses on optimization for Project Dyson's specific requirements (10-12.5 kW power class, 25,000+ hour lifetime, multi-propellant operation).

### 5.3 What Is Well-Established

- Argon Hall thrusters work at constellation scale (SpaceX operational data)
- Argon cost is essentially negligible at any fleet scale
- Krypton achieves intermediate performance between xenon and argon
- Purpose-built designs dramatically outperform adapted xenon thrusters
- Iodine offers near-xenon performance as a condensable storable

### 5.4 What Remains for Investigation

- Detailed performance at 10-12.5 kW power class for Project Dyson orbital tugs
- Long-term erosion rates (25,000+ hours) for argon and krypton operation
- Iodine feed system engineering at fleet scale
- Multi-propellant thruster design optimization

---

## 6. Research Gaps

1. **10-12.5 kW thruster qualification**: Test argon and krypton at the specific power class required for Project Dyson orbital tugs, measuring thrust, Isp, efficiency, and beam divergence

2. **Accelerated lifetime testing**: Characterize channel erosion for 25,000+ hour argon/krypton operation to validate lifetime targets

3. **Iodine feed system development**: Design and test iodine propellant feed systems for the 10-12.5 kW power class, addressing corrosion and solid-to-vapor phase management

4. **Mixed-propellant profiles**: Develop operational profiles using krypton for high-thrust maneuvers and argon for cruise, quantifying mission timeline impacts

5. **SpaceX data request**: Seek detailed performance data from SpaceX Starlink V2 argon thrusters for comparison with academic test results

---

## Appendix: Key References

| Source ID | Title | Relevance |
|-----------|-------|-----------|
| SETS-2025 | Xenon, Krypton, or Argon Propellants for Hall Thruster | Comprehensive comparison with SpaceX data |
| TechMech-2025 | ST-40M Hall Thruster on Xenon and Krypton | IEPC 2025 parametric data |
| ActaAstro-2023a | Low power Hall thruster with several propellants | Iodine near-xenon performance |
| ActaAstro-2023b | Review of alternative propellants in Hall thrusters | Comprehensive landscape |
| VacuumTech-2018 | Argon-based propellant performance enhancement | Early argon optimization |
