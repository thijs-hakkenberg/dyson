---
questionId: "rq-2-32"
analysisDate: "2026-02-13"
status: "preliminary"
confidence: "low-medium"
---

# Comparative Feedstock Economics: Literature Analysis

## Executive Summary

This analysis reviews published research on asteroid mining economics, techno-economic assessment frameworks, and civilizational-scale material strategies to establish the current state of knowledge for cross-source feedstock comparison. The primary finding is that **asteroid ISRU cost baselines exist (~$1,136/kg for water) but are derived from small-scale, single-mission models** that do not capture the cost dynamics of industrial-scale operations. Throughput rate and equipment reuse are identified as the dominant cost drivers (Hein 2018), suggesting that costs could fall by 1-2 orders of magnitude at Project Dyson scales. Critically, **no published study provides a normalized cross-source comparison** between asteroids, Moon, Mercury, and gas giant atmospheric mining under consistent assumptions. This gap is the primary motivation for rq-2-32.

---

## 1. Asteroid Mining Cost Baselines

### 1.1 Water Extraction Economics

Calla et al. (2018, arxiv:1808.05099) develop the most cited asteroid mining economic model:

**Model Structure:**
- Mission architecture: Earth launch → asteroid rendezvous → extraction → return
- Target: C-type NEA with 10-20 wt% water content
- Extraction method: thermal processing (solar heating)
- Return method: low-thrust propulsion using extracted water as propellant

**Key Results:**
- Baseline water cost: ~$1,136/kg returned to cislunar space
- Dominant cost components: launch (~40%), spacecraft (~30%), operations (~20%)
- Break-even requires >100 tonnes returned per mission
- Only in-space use cases (propellant depot, radiation shielding) close economically
- Earth-return for terrestrial use is not economical at any scale modeled

**Limitations for Project Dyson:**
- Model assumes single-mission economics; amortization over fleet operations not considered
- Water is the target product; structural metals (Fe, Si, Al) have different extraction costs
- Launch cost from Earth dominates; ISRU-bootstrapped missions would have fundamentally different cost structure
- Scale: model considers tonnes per mission; Project Dyson needs millions of tonnes

### 1.2 Techno-Economic Assessment Framework

Hein et al. (2018, arxiv:1810.03836) provide a more general framework:

**Critical Findings:**
- **Throughput rate is the #1 cost driver**: Doubling throughput reduces $/kg by ~40% due to fixed cost amortization
- **Equipment reuse is #2**: Multi-mission spacecraft reduce $/kg by ~30% compared to expendable architectures
- **Target selection is #3**: The difference between the best and worst NEA targets is ~2× in cost, less impactful than operational parameters
- **Extraction efficiency matters less than expected**: Improving extraction yield from 50% to 90% reduces cost by only ~15%

**Implications for Project Dyson:**
These findings suggest that the most important design decision for feedstock economics is **how big and how reusable** the extraction/processing system is, not which specific asteroid or processing technology is selected. This same principle likely applies to lunar and Mercury ISRU.

### 1.3 Resource Landscape

Graps et al. (2016, arxiv:1612.00709) catalog available asteroid resources:

**Resource Categories:**
- **C-type asteroids** (~75% of all asteroids): Water (5-20%), carbon (1-5%), metals in silicate matrix
- **S-type asteroids** (~17%): Silicate-rich, iron-nickel metal (10-30%), lower volatiles
- **M-type asteroids** (~5%): Iron-nickel dominated, potential PGM concentrations
- **Total asteroid belt mass**: ~3×10²¹ kg (dominated by Ceres, Vesta, Pallas)
- **NEA accessible mass**: ~10¹⁸-10²⁰ kg with delta-v <4 km/s

**Key Observation:**
The total asteroid belt mass (~3×10²¹ kg) is only 1% of Mercury's mass and <5% of the Moon's mass. For a civilization-scale construction program, asteroids alone may be insufficient, motivating multi-source strategies.

---

## 2. Near-Term Commercial Pathways

### 2.1 Bootstrap Economics

Lewicki et al. (2021, arxiv:2103.02435) address the bootstrap problem:

**Observations:**
- First asteroid mining missions must target highest-value products: water (as propellant) and PGMs
- Revenue from early missions funds capability development for larger-scale operations
- The "chicken and egg" problem: ISRU infrastructure needs ISRU products to be economical
- Proposed solution: dual-use missions that provide science return alongside commercial resource assessment

**Application to Project Dyson:**
- Project Dyson's feedstock needs (bulk structural metals, silicon) differ from near-term commercial targets (water, PGMs)
- The bootstrap pathway for Project Dyson may leverage commercial water mining for propellant while independently developing metal extraction
- Alternatively, lunar ISRU (rq-1-50) may provide the bootstrap materials while asteroid-scale infrastructure matures

### 2.2 Civilizational Scale Economics

Zhang (2022, arxiv:2208.12617) takes the broadest perspective:

**Key Arguments:**
- Advancing on the Kardashev scale requires exponential growth in material throughput
- No single source can sustain exponential growth indefinitely—material depletion, logistics constraints, or diminishing returns eventually limit each source
- Multi-source strategies provide resilience and enable continued growth across source-specific limits
- Energy economics (not just material economics) determines the optimal material source at each scale

**Application to Project Dyson:**
- At Phase 1 scale (1,000 units): any single source may suffice
- At Phase 2 scale (100,000 units): logistics constraints likely favor multi-source operations
- At Phase 3 scale (millions of units): multiple sources are almost certainly required
- The comparative economics question is not "which source is cheapest" but "what portfolio of sources minimizes risk-adjusted cost at each scale"

---

## 3. Cross-Source Comparison Framework

No published study provides the normalized comparison needed. Based on the literature, we can construct a preliminary framework:

### 3.1 Candidate Sources

| Source | Total Mass | Accessible Mass | Key Products | Delta-V to 1 AU | Solar Flux | TRL |
|--------|-----------|----------------|-------------|-----------------|------------|-----|
| NEA C-type | ~10²⁰ kg | ~10¹⁸ kg | H₂O, C, Fe-Si | 0.5-4 km/s | Variable | 3-4 |
| NEA S/M-type | ~10¹⁹ kg | ~10¹⁷ kg | Fe-Ni, Si, PGMs | 0.5-4 km/s | Variable | 3-4 |
| Moon (surface) | 7.3×10²² kg | ~10¹⁷ kg (regolith) | Si, Al, Fe, Ti, O₂ | 2.4 km/s + transfer | 1× (day) | 3-5 |
| Mercury | 3.3×10²³ kg | ~10²⁰ kg (surface) | Si, Fe, Mg, S | ~9 km/s | 6.7× | 1-2 |
| Gas giants | ~10²⁷ kg (atm) | Unknown | H, He, CH₄, NH₃ | 30-60 km/s | 0.004-0.04× | 1 |

### 3.2 Cost Driver Comparison

Based on Hein et al.'s finding that throughput and reuse dominate costs:

**Asteroids:** High reusability potential (multi-target tours); throughput limited by target size and processing capacity per mission
**Moon:** Highest throughput potential (stable surface, unlimited feedstock area); moderate reusability (permanent facility); higher export delta-v
**Mercury:** Highest ultimate throughput (self-replication enables exponential scaling); lowest reusability (single-site, consumable planet); highest technology risk
**Gas giants:** Unknown throughput potential; unknown reusability; highest delta-v cost

### 3.3 Estimated $/kg Ranges (Preliminary, Not Normalized)

| Source | Current Estimate | At Scale (10K+ t/yr) | Confidence |
|--------|-----------------|---------------------|------------|
| Asteroid (water) | ~$1,136/kg | ~$50-200/kg | Medium |
| Asteroid (metals) | Unknown | ~$100-500/kg | Low |
| Moon (metals) | Unknown | ~$20-100/kg | Low |
| Moon (O₂) | Unknown | ~$10-50/kg | Low-Medium |
| Mercury | Unknown | ~$5-50/kg (if GSFR works) | Very Low |
| Gas giants | Unknown | Unknown | None |

**Caveat:** These ranges are order-of-magnitude estimates derived from extrapolating the literature, not validated economic models. The primary deliverable of rq-2-32 should be replacing these estimates with rigorous, normalized calculations.

---

## 4. Key Gaps and Recommendations

### 4.1 Critical Missing Analysis

1. **Normalized $/kg model**: The single most needed contribution is a parametric model calculating $/kg-delivered-to-1AU for each source under consistent assumptions (same discount rate, technology readiness adjustment, infrastructure amortization period)

2. **Element-specific costs**: Different elements have wildly different extraction costs. Silicon from lunar MRE is cheap; silicon at solar-grade purity is expensive. The comparison must be element-specific and purity-specific.

3. **Scale-dependent crossovers**: At what production scale does each source become cost-competitive? The crossover points determine Phase transition triggers.

4. **Time-value adjustment**: A $/kg metric that ignores delivery timeline is misleading. Materials available in 2035 from the Moon may be worth 10× more than cheaper materials available in 2055 from asteroids.

### 4.2 Recommendations for Project Dyson

1. **Commission the normalized cross-source economic model** as a dedicated research effort
2. **Use asteroid ISRU as Phase 1 baseline** while developing lunar capability in parallel
3. **Include "source activation trigger" criteria** in Phase 2 planning: what conditions justify activating lunar, then Mercury feedstock operations
4. **Design infrastructure for multi-source compatibility**: mass drivers, orbital depots, and processing equipment that can handle material from any source
5. **Track commercial space mining developments** as cost indicators—if private asteroid mining achieves <$100/kg, the baseline shifts

---

## Appendix: Key Papers Referenced

| Arxiv ID | Title | Relevance |
|----------|-------|-----------|
| 1808.05099 | Asteroid Mining Economics | Cost baseline (~$1,136/kg water) |
| 1810.03836 | Techno-Economic Assessment of Asteroid Mining | Cost driver analysis (throughput, reuse) |
| 1612.00709 | ASIME Asteroid Mining Survey | Resource landscape catalog |
| 2103.02435 | Near-Term Asteroid Utilization | Bootstrap economics and pathways |
| 2208.12617 | Energy Economics and Kardashev Scale | Multi-source civilizational perspective |
