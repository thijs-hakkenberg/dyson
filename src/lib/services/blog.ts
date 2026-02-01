import type { BlogPost } from '$lib/types';

// Sample blog posts (in a production app, these would be loaded from markdown files)
export const BLOG_POSTS: BlogPost[] = [
	{
		slug: 'fleet-size-vs-vehicle-capacity-findings',
		title: 'Optimal Fleet Configuration: Why 15×150t Beats Both Extremes',
		description:
			'Discrete event simulation reveals the sweet spot for transport vehicle fleet sizing—not too few large vehicles, not too many small ones.',
		author: 'Research Team',
		date: new Date('2026-02-02'),
		tags: ['simulation', 'research-question', 'phase-0', 'logistics', 'discrete-event-simulation', 'monte-carlo'],
		category: 'Research',
		relatedPhases: ['phase-0'],
		content: `
# Optimal Fleet Configuration: Why 15×150t Beats Both Extremes

We built a discrete event simulator to answer a fundamental fleet sizing question for Phase 0: **Should we deploy fewer large vehicles or more small ones?** The answer lies in the middle, and it could save Project Dyson significant operational costs.

## The Question

The consensus specification for Transport Vehicles calls for a $2B fleet budget with flexibility on configuration. The divergent views range from Gemini's preference for 150,000 kg payloads (faster transit) to Claude's 200,000 kg baseline to GPT's variable configuration. We built a [Monte Carlo simulator](/questions/fleet-size-vs-vehicle-capacity/simulator) to find the optimal trade-off.

## The Key Finding

**15 vehicles with 150,000 kg payload capacity achieves the lowest cost per kg delivered at ~$0.2k/kg.**

This mid-range configuration outperforms both extremes:

| Configuration | Throughput | Cost/kg | Failure Impact |
|---------------|-----------|---------|----------------|
| 5×300t | Lower | Higher | 20% per vehicle |
| 8×250t | Moderate | Moderate | 12.5% per vehicle |
| 10×200t | Moderate | Moderate | 10% per vehicle |
| **15×150t** | **High** | **$0.2k/kg** | **6.7% per vehicle** |
| 20×100t | Moderate | Higher | 5% per vehicle |
| 25×80t | Lower | Higher | 4% per vehicle |

## Why the Middle Wins

### Transit Time Efficiency

The simulation models transit time as scaling with payload mass. A 150t vehicle achieves better thrust-to-mass ratios than a 250t vehicle, completing more round trips per year. This compounding effect over the 15-year mission duration creates substantial throughput differences.

### Redundancy Without Overhead

With 15 vehicles, losing one unit costs only 6.7% of fleet capacity. The 8×250t configuration loses 12.5%—nearly double the impact. Yet going to 25×80t adds operational complexity without proportionate throughput gains.

### Queue Smoothing

More frequent, smaller deliveries reduce queue depth variability at the Manufacturing Hub. The 15×150t configuration hits the sweet spot where delivery frequency is high enough to smooth material flow without creating scheduling chaos.

## The Physics Behind It

The fundamental constraint is propulsion system scaling. Hall-effect thrusters scale non-linearly—doubling payload doesn't require doubling propulsion mass. This creates economies of scale that favor larger vehicles. However, three factors push back:

1. **Solar array constraints** (300-500 m² limit) restrict power available for propulsion
2. **Larger payloads require longer loading/unloading cycles**, reducing effective throughput
3. **Failure risk compounds**—each large vehicle lost hurts more

The 150t payload class threads this needle optimally.

## Sensitivity Analysis

We tested the configuration across various failure rates and mission durations:

**Failure Rate Impact (15-year mission):**
- 0% failure: 15×150t optimal
- 3% failure: 15×150t optimal
- 10% failure: 15×150t still optimal (higher redundancy value)

**Mission Duration Impact (3% failure):**
- 5 years: 15×150t optimal
- 15 years: 15×150t optimal
- 25 years: 15×150t optimal, with larger margin over alternatives

The configuration is robust across parameter ranges.

## Implications for Project Dyson

### 1. Adopt 15×150t as Baseline Configuration

This provides optimal throughput-to-cost ratio while maintaining acceptable redundancy.

### 2. Standardize Cargo Containers for 150t Vehicle Bays

Early container standardization enables logistics optimization across the entire supply chain.

### 3. Maintain Design Margin for Human Rating

The 150t vehicle size can accommodate structural upgrades for future crew transport capability without redesigning the entire fleet.

### 4. Optimize Hall-Effect Thruster Clusters for 150t Payload Class

Propulsion system development should target this payload range, not the original 200-250t estimates.

## Cost Implications

At $200/kg delivered, the optimized fleet can transport substantial material mass over its 15-year lifetime:

- **Per vehicle:** ~10+ mission cycles
- **Fleet throughput:** Sufficient for multi-gigawatt solar collector production
- **Total investment:** $2B fleet + operations

The $200/kg figure compares favorably to Earth launch costs while providing the mass throughput needed for Phase 1 manufacturing.

## Try It Yourself

We've published the [interactive simulator](/questions/fleet-size-vs-vehicle-capacity/simulator) so you can explore these trade-offs. Adjust vehicle count, payload capacity, failure rates, and mission duration to see how cost per kg and throughput change.

## Methodology

The simulation uses:
- **Discrete event simulation** with priority queue (binary heap)
- **Full logistics cycle**: loading (2-5 hours) → transit → unloading (2-5 hours) → return
- **Transit time scaling** with payload mass via thrust-to-mass ratio
- **Exponential failure distribution** based on annual failure rate
- **50+ Monte Carlo runs** per configuration for statistical validity

Results should be interpreted as relative comparisons between configurations.

## What's Next

This research answers RQ-0-19 and provides the second validated fleet optimization for Phase 0. Combined with the constellation sizing results (RQ-0-3) and spectral processing findings (RQ-0-2), we're building a rigorous, simulation-validated foundation for the construction plan.

Remaining research priorities include:
- Detailed propulsion system sizing for 150t payload class
- Cargo container standardization study
- Human-rating upgrade path analysis

---

**Research Question:** [RQ-0-19: Fleet size vs vehicle capacity tradeoff](/questions/fleet-size-vs-vehicle-capacity)

**Interactive Tool:** [Fleet Logistics Simulator](/questions/fleet-size-vs-vehicle-capacity/simulator)
		`
	},
	{
		slug: 'onboard-vs-ground-spectral-unmixing-findings',
		title: 'On-Board Processing is Non-Negotiable: Latency Dominates Ground Processing',
		description:
			'Monte Carlo simulation demonstrates that ground-based spectral analysis achieves only 47% survey efficiency due to decision latency—not bandwidth.',
		author: 'Research Team',
		date: new Date('2026-02-02'),
		tags: ['simulation', 'research-question', 'phase-0', 'autonomy', 'spectral-analysis', 'monte-carlo'],
		category: 'Research',
		relatedPhases: ['phase-0'],
		content: `
# On-Board Processing is Non-Negotiable: Latency Dominates Ground Processing

We built a Monte Carlo simulator to resolve a fundamental autonomy question for Phase 0 Prospecting Satellites: **Should spectral unmixing happen on-board or on the ground?** The answer is definitive—and it's not about bandwidth.

## The Question

The Prospecting Satellite consensus specification identifies on-board vs ground spectral unmixing as an open question. On-board processing requires radiation-hardened compute hardware (mass/power/cost). Ground processing preserves raw data and allows algorithm updates. Which approach maximizes survey effectiveness?

We built a [Monte Carlo simulator](/questions/onboard-vs-ground-spectral-unmixing/simulator) comparing both approaches across thousands of simulated asteroid encounters.

## The Definitive Finding

**Ground-based processing achieves only 47-50% survey efficiency compared to 100% for on-board processing.**

| Metric | On-board | Ground |
|--------|----------|--------|
| Targets Surveyed | ~7,000 | ~3,300 |
| Survey Efficiency | **100%** | **47.5%** |
| Avg Decision Latency | 1.1 hrs | 7.3 hrs |
| Bandwidth Utilization | <1% | ~97% |

The 2× survey improvement is too significant to trade for ground processing advantages.

## The Critical Insight: It's Latency, Not Bandwidth

We expected bandwidth to be the limiting factor—raw hyperspectral data is 10-100× larger than processed results. But the simulation reveals something surprising:

**All missed opportunities are due to latency, not bandwidth:**
- On-board missed by bandwidth: 0
- On-board missed by latency: 0
- Ground missed by bandwidth: 0
- Ground missed by latency: **~3,700** (in baseline configuration)

Even with 50 Mbps bandwidth (5× baseline), ground processing only improves marginally. The fundamental latency chain dominates:

1. **Raw data downlink:** ~2-4 hours (large hyperspectral datacubes)
2. **Light travel time:** ~0.3 hours (round trip at typical NEA distance)
3. **Ground queue + processing:** ~6 hours (DSN scheduling, compute time)
4. **Command uplink:** ~1 hour (targeting instructions)

**Total: ~7+ hours** vs typical NEA encounter windows of 2-12 hours.

## Why Encounters Are Time-Limited

NEA survey opportunities are fleeting. As satellites and asteroids follow different orbits, observation windows depend on:

- **Geometry:** Distance, phase angle, illumination
- **Velocity:** Relative motion limits observation duration
- **Priority:** High-value targets (M-type, C-type) need follow-up observations

When spectral analysis identifies a high-value target, the satellite must decide immediately whether to extend observation or move to the next target. A 7-hour ground loop exceeds most encounter windows, causing the satellite to miss the follow-up opportunity entirely.

## Scaling Analysis

We tested configurations across various constellation sizes, bandwidths, and mission durations:

| Configuration | On-board | Ground | Missed |
|---------------|----------|--------|--------|
| 50 sats, 10 Mbps, 7 yr | 7,000 | 3,300 | +3,700 |
| 100 sats, 10 Mbps, 7 yr | 14,000 | 6,600 | +7,400 |
| 55 sats, 50 Mbps, 7 yr | 7,700 | 3,800 | +3,900 |
| 55 sats, 25 Mbps, 15 yr | 16,500 | 8,000 | +8,500 |

**The ~50% efficiency gap persists across all configurations.** More satellites, more bandwidth, longer missions—none fix the latency problem.

## The Bandwidth Bonus

While not the primary driver, on-board processing delivers substantial secondary benefits:

- **97% bandwidth savings:** Processed results (~10 MB) vs raw data (~100s MB)
- **Reduced ground station costs:** Fewer DSN hours required
- **More communication margin:** Contingency bandwidth for anomalies
- **Scalability:** Support larger constellations without DSN bottlenecks

## Implications for Project Dyson

### 1. Mandate On-Board Spectral Unmixing

The 2× survey improvement justifies radiation-hardened processing hardware. Budget for space-qualified GPUs or FPGAs.

### 2. Implement Selective Raw Data Retention

Store high-priority observations for later downlink during low-activity periods. This enables ground reprocessing and algorithm validation without sacrificing autonomy.

### 3. Design for Algorithm Updates

Over-the-air updates allow improving unmixing models based on pathfinder validation. The on-board library isn't frozen forever—just during active encounters.

### 4. Level 3 Autonomy is Validated

The consensus specification calls for Level 3 autonomy (30-day independent operation). This simulation confirms that autonomy is not merely convenient—it's essential for effective surveying.

## The Physics Behind Latency

The latency chain is fundamentally constrained by:

**Speed of Light:**
At typical NEA survey distances (0.1-0.3 AU), light travel time adds 0.3-0.9 hours per round trip. This is irreducible.

**DSN Scheduling:**
Ground stations serve multiple missions. Queue delays average 2-6 hours depending on demand.

**Data Volume:**
Raw hyperspectral datacubes (256×256 pixels × 128 bands × 12-bit depth) require ~100 MB per target. At 10 Mbps, downlink alone takes 80+ seconds under ideal conditions—but real conditions include link margin, error correction, and scheduling gaps.

## Try It Yourself

We've published the [interactive simulator](/questions/onboard-vs-ground-spectral-unmixing/simulator) so you can explore the on-board vs ground trade-off. Adjust satellite count, bandwidth, mission duration, and encounter rates to see how survey efficiency changes.

## Methodology

The simulation uses:
- **Poisson encounter generation** based on expected NEA survey rates
- **Hyperspectral data volume modeling** (configurable resolution and bands)
- **Bandwidth-constrained downlink windows** with overhead factor
- **Latency chain modeling** for ground processing pipeline
- **50 Monte Carlo runs** per configuration for statistical validity

Results should be interpreted as relative comparisons between processing approaches.

## What's Next

This research answers RQ-0-2 and provides definitive guidance on Prospecting Satellite autonomy architecture. Combined with constellation sizing (RQ-0-3) and fleet logistics (RQ-0-19), we're building simulation-validated specifications for Phase 0.

Remaining research priorities include:
- Specific radiation-hardened processor selection and power budget
- On-board spectral library optimization for asteroid endmembers
- Pathfinder experiment design for empirical validation

---

**Research Question:** [RQ-0-2: On-board vs ground spectral unmixing](/questions/onboard-vs-ground-spectral-unmixing)

**Interactive Tool:** [Spectral Analysis Simulator](/questions/onboard-vs-ground-spectral-unmixing/simulator)
		`
	},
	{
		slug: 'constellation-size-simulation-results',
		title: 'Simulation Reveals: Propulsion, Not Fleet Size, Limits NEA Survey Coverage',
		description:
			'Monte Carlo analysis of 5,500+ simulated missions shows that electric propulsion choice matters more than constellation size for identifying high-value mining targets.',
		author: 'Research Team',
		date: new Date('2026-02-01'),
		tags: ['simulation', 'research-question', 'phase-0', 'propulsion', 'monte-carlo'],
		category: 'Research',
		relatedPhases: ['phase-0'],
		content: `
# Simulation Reveals: Propulsion, Not Fleet Size, Limits NEA Survey Coverage

We built an interactive Monte Carlo simulator to answer a fundamental question for Phase 0: **How many prospecting satellites do we actually need?** The answer surprised us—and could save Project Dyson $100 million.

## The Question

The consensus specification for Prospecting Satellites calls for a 50-satellite constellation at $5M per unit—a $250M investment. But was this number rigorously validated, or just a reasonable planning estimate?

We built a [Monte Carlo simulator](/questions/minimum-constellation-size/simulator) to find out, running 500+ simulations for each parameter configuration across 11 constellation sizes (20-70 satellites).

## The Surprising Finding

**High-value NEA coverage plateaus at ~38% regardless of constellation size.**

Whether you deploy 20 satellites or 70, with electric propulsion you'll identify roughly the same proportion of high-value mining targets (metallic M-type and carbonaceous C-type asteroids). Adding more satellites only increases coverage of *low-value* targets.

| Constellation Size | Total Coverage | High-Value Coverage |
|-------------------|----------------|---------------------|
| 20 satellites | 12.8% | **38.8%** |
| 50 satellites | 30.7% | **38.2%** |
| 70 satellites | 41.9% | **35.8%** |

The high-value coverage is essentially flat—even slightly *decreasing* at larger fleet sizes as resources get spread thinner.

## What Does Matter: Propulsion Type

The real determinant of survey effectiveness isn't fleet size—it's propulsion choice:

| Propulsion | High-Value Coverage | Delta |
|------------|---------------------|-------|
| Electric (Ion) | 38.2% | baseline |
| Hybrid | 36.6% | -4% |
| Chemical | **14.2%** | **-63%** |

**Chemical propulsion is catastrophic for high-value target identification.** The limited delta-V budget means satellites simply cannot reach the orbital families where valuable asteroids reside.

## The Physics Explanation

Why does this happen? It comes down to delta-V accessibility:

1. **High-value NEAs aren't uniformly distributed**—they cluster in orbital families that require specific delta-V to reach
2. **Electric propulsion's ~15 km/s budget** can access about 38% of these families
3. **Additional satellites** can survey more targets within those families, but can't reach the 62% of high-value NEAs that remain inaccessible

Think of it like fishing: more boats help you catch more fish in the reachable waters, but no number of boats will catch fish in waters you can't reach. You need a faster boat.

## Mission Duration and Reliability

We also tested mission duration (5-10 years) and failure rates (0-10%). Neither significantly affected high-value coverage:

**Mission Duration (Electric, 50 sat, 3% failure):**
- 5 years: 23% total, 38% high-value
- 7 years: 31% total, 38% high-value
- 10 years: 41% total, 38% high-value

**Failure Rate (Electric, 50 sat, 7 years):**
- 0% failure: 39% total, 38% high-value
- 3% failure: 31% total, 38% high-value
- 10% failure: 25% total, 38% high-value

The high-value ceiling is consistent across all configurations. Time and reliability affect how many low-value targets you survey, but not the fundamental accessibility constraint.

## Implications for Project Dyson

### 1. Reduce Constellation Size from 50 to 30-35 Satellites

This saves **$75-100 million** with:
- Zero impact on high-value target identification
- Only 12% reduction in total coverage (low-value targets)
- Sufficient redundancy for the 7-year mission

### 2. Electric Propulsion is Non-Negotiable

The 63% reduction with chemical propulsion makes it essentially unusable for our primary mission objective. This validates the consensus specification's emphasis on high-Isp systems.

### 3. Consider Higher Delta-V Systems for Phase 2

To break the 38% ceiling, future prospecting missions would need:
- Higher Isp propulsion (>15 km/s delta-V budget)
- In-space refueling capability
- Or acceptance that 38% coverage is sufficient for Phase 1 mining operations

### 4. 38% May Be Enough

Even 38% of high-value NEAs represents hundreds of potential mining targets. For Phase 1's production goals, this is likely more than sufficient. The question becomes: is it worth spending $100M+ to survey targets we'll never mine?

## Try It Yourself

We've published the [interactive simulator](/questions/minimum-constellation-size/simulator) so you can explore these trade-offs yourself. Adjust constellation size, mission duration, failure rates, and propulsion type to see how coverage changes.

## Methodology

The simulation uses:
- **2,000 synthetic NEAs** with realistic orbital element distributions based on known population statistics
- **Greedy target assignment** prioritizing high-value asteroids (M-type, C-type)
- **Simplified Hohmann transfer** delta-V calculations
- **Bernoulli failure model** for satellite reliability
- **500 Monte Carlo runs** per configuration for statistical significance

Results should be interpreted as relative comparisons between configurations, not absolute predictions of real-world coverage.

## What's Next

This research answers RQ-0-3 and marks the first time we've used simulation to validate a consensus specification. We're now evaluating which other research questions could benefit from similar computational analysis.

The $100M savings identified here could be redirected to:
- Higher-capability propulsion development
- Additional redundancy in processing platforms
- Accelerating Phase 1 collector production

---

**Research Question:** [RQ-0-3: Minimum constellation size for survey coverage](/questions/minimum-constellation-size)

**Interactive Tool:** [NEA Constellation Coverage Simulator](/questions/minimum-constellation-size/simulator)
		`
	},
	{
		slug: 'introducing-project-dyson',
		title: 'Introducing Project Dyson: Our Vision for the Future',
		description:
			'An overview of Project Dyson, our mission to make a Dyson swarm a reality, and how we plan to get there through collaborative planning and research.',
		author: 'Project Dyson Team',
		date: new Date('2025-01-15'),
		tags: ['announcement', 'vision', 'mission'],
		category: 'Announcements',
		content: `
# Introducing Project Dyson

Project Dyson is a non-profit organization dedicated to the ambitious goal of making a Dyson swarm a reality. While this may seem like science fiction today, we believe that with proper planning, research aggregation, and collaborative effort, humanity can achieve this monumental feat.

## What is a Dyson Swarm?

A Dyson swarm is a hypothetical megastructure consisting of a large number of independent constructs (usually solar power satellites and space habitats) orbiting a star. Unlike a solid Dyson sphere, a swarm is composed of many smaller elements that can be built incrementally.

## Our Approach

We're taking a phased approach to this challenge:

1. **Research Aggregation**: Collecting and organizing relevant scientific papers
2. **Multi-LLM Collaboration**: Using multiple AI models to analyze challenges
3. **Open Planning**: Transparent, community-driven development of construction phases
4. **Bill of Materials**: Detailed cost and resource estimates for each phase

## Get Involved

We welcome researchers, engineers, and enthusiasts to join our mission. Visit our plan section to see our current roadmap and contribute to the discussion.
		`
	},
	{
		slug: 'phase-0-space-resource-processing',
		title: 'Phase 0: Space Resource Processing Explained',
		description:
			'A deep dive into the first phase of Dyson swarm construction: establishing space-based resource extraction and processing capabilities.',
		author: 'Engineering Team',
		date: new Date('2025-01-20'),
		tags: ['phase-0', 'mining', 'resources', 'technical'],
		category: 'Technical',
		content: `
# Phase 0: Space Resource Processing

Before we can build millions of solar collector satellites, we need raw materials. Earth-based resources are expensive to launch into orbit, making space-based resource extraction essential for any megastructure project.

## Why Start with Mining?

The economics are simple: launching materials from Earth costs approximately $2,500-10,000 per kilogram. At these prices, a single solar collector satellite would be economically unfeasible. Asteroid mining changes this equation entirely.

## Target Asteroids

We've identified several categories of near-Earth asteroids suitable for initial mining operations:

- **C-type asteroids**: Rich in water and organic compounds
- **M-type asteroids**: Metallic composition, ideal for structural materials
- **S-type asteroids**: Silicate-rich, useful for various applications

## Key Technologies

Phase 0 requires development in several areas:

- Autonomous mining robots
- In-situ resource utilization (ISRU) systems
- Orbital processing facilities
- Material transport systems

See our detailed Bill of Materials for cost estimates.
		`
	},
	{
		slug: 'multi-llm-consensus-methodology',
		title: 'How We Use AI for Engineering Decisions',
		description:
			'Explaining our methodology for using multiple large language models to analyze complex engineering challenges in Dyson swarm construction.',
		author: 'Research Team',
		date: new Date('2025-01-25'),
		tags: ['AI', 'methodology', 'LLM', 'analysis'],
		category: 'Research',
		content: `
# How We Use AI for Engineering Decisions

Project Dyson employs a unique approach to engineering analysis: querying multiple large language models and having them cross-review each other's analyses to build consensus on complex challenges.

## Multi-LLM Consensus

Our analysis process involves three frontier AI models:

- **Gemini 3 Pro**: Google's advanced reasoning model
- **GPT-5.2**: OpenAI's latest generation
- **Claude Opus 4.5**: Anthropic's most capable model

## Why Multiple Models?

Each AI model has different:

- Training data and knowledge bases
- Reasoning approaches
- Potential blind spots

By consulting multiple models and having them review each other's work, we can:

1. Identify consensus on well-established facts
2. Highlight areas of uncertainty
3. Discover novel approaches we might have missed
4. Cross-validate cost estimates and timelines

## Our Process

1. **Initial Analysis**: Each model independently produces a detailed phase plan
2. **Cross-Review**: Each model reviews the other models' plans
3. **Consensus Building**: We synthesize areas of agreement
4. **Gap Analysis**: We highlight significant disagreements for human review

## Limitations

It's important to note that AI analysis supplements, but doesn't replace, expert human judgment. All LLM opinions are reviewed by domain experts before being incorporated into our plans.
		`
	},
	{
		slug: 'scientific-research-update-2025',
		title: 'New Scientific Research Shapes Our Dyson Swarm Strategy',
		description:
			'Recent peer-reviewed studies from 2022-2025 provide critical insights on habitability constraints, construction approaches, and material requirements.',
		author: 'Research Team',
		date: new Date('2026-01-31'),
		tags: ['research', 'science', 'materials', 'habitability'],
		category: 'Research',
		relatedPhases: ['phase-0', 'phase-1'],
		content: `
# New Scientific Research Shapes Our Dyson Swarm Strategy

Recent peer-reviewed studies have significantly advanced our understanding of Dyson swarm feasibility. This research directly impacts our Phase 0 planning.

## The Habitability Constraint (Peters, 2025)

A groundbreaking study by Ian Marius Peters at Helmholtz Institute Erlangen-Nurnberg reveals a critical constraint: **a complete Dyson swarm inside Earth's orbit would raise our planet's temperature by 140K, rendering it uninhabitable.**

### Key Finding: The 2.13 AU Solution

Peters calculated that a partial Dyson swarm positioned at 2.13 AU (beyond Mars) could:
- Capture approximately 4% of solar energy
- Increase Earth's temperature by less than 3K (acceptable)
- Require 1.3×10²³ kg of silicon

**Impact on Our Plan:** This validates our phased approach. We're not building a complete sphere—we're building a swarm at safe distances that provides meaningful energy while preserving habitability.

## Mars-Based Construction Approach (Smith, 2022)

Jack Smith's peer-reviewed study in *Physica Scripta* proposes a Mars-based construction approach:

- Generate Earth's 2019 power consumption (18.35 TW) within 50 years
- Begin construction by 2040 using biennial launch windows
- Deploy 5.5+ billion satellites via electromagnetic accelerators
- Achieve 0.74-2.77% capture of the Sun's output

### Electromagnetic Mass Drivers

The study emphasizes **electromagnetic accelerators (mass drivers)** for launch—coils of wire creating sequential electromagnets to accelerate payloads without propellant. This is critical for Phase 0's long-term scalability.

## Self-Replicating Robotics (Sandberg & Armstrong)

The exponential construction timeline proposed by Anders Sandberg and Stuart Armstrong shows how self-replicating robots could accelerate construction:

- **Year 0-10:** First unit constructed
- **Year 10-40:** Four 10-year cycles to collect Mercury's usable material
- **Year 41:** Venus could be disassembled in one year
- **Total:** 32-40 years to complete initial swarm

**Impact on Our Plan:** While we're not proposing planetary disassembly, the self-replication principle validates our "seed factory" approach in Phase 0.

## Materials Science Breakthroughs

### Carbon Nanotubes
- Ultimate tensile strength achieved: 63 GPa
- Theoretical maximum: 300 GPa
- Critical for lightweight structural integrity

### Graphene
- Exceptional electrical conductivity
- High mechanical strength
- Ideal for solar panel construction

### Self-Healing Polymers
- Autonomous repair of micrometeoroid damage
- Protection against radiation
- Extended operational lifespan

## Wireless Power Transmission Validation

### Caltech MAPLE Demonstration (2023)
The Space Solar Power Demonstrator successfully beamed microwave energy back to Earth, proving the fundamental technology works.

### Laser Transmission Advances (2025)
Recent achievements:
- DC-to-DC efficiency >14%
- Maximum PV array output >130 W
- Viable for space-to-Earth and space-to-space transmission

## Implications for Phase 0

This research reshapes our Phase 0 priorities:

1. **Focus on Cislunar Operations First:** Not Mercury or Mars—we start with near-Earth asteroids as both LLMs recommend

2. **Water Before Metals:** Propellant production enables all subsequent operations

3. **Modular, Scalable Design:** The self-replication principle means designing for growth, not one-off missions

4. **Thermal Constraint Awareness:** All designs must consider heat rejection as a primary constraint

## Open Questions Identified

The research highlights gaps our Phase 0 must address:
- Microgravity material separation efficiency
- Long-duration autonomous operations
- Dust mitigation in processing environments
- Anchoring on rubble-pile bodies

These become our research priorities and funding targets.

## References

1. Peters, I.M. (2025). Helmholtz Institute Erlangen-Nurnberg - Dyson swarm habitability study
2. Smith, J. (2022). *Physica Scripta*, Vol. 97 - "Review and viability of a Dyson Swarm"
3. Sandberg, A. & Armstrong, S. - Self-replicating spacecraft research (arXiv:2109.11443)
4. Caltech Space Solar Power Project (2023) - MAPLE demonstration
		`
	},
	{
		slug: 'comparing-ai-approaches',
		title: 'Comparing AI Approaches to Dyson Swarm Planning',
		description:
			'How Gemini 3 Pro, GPT-5.2, and Claude Opus 4.5 differ in their analysis of Dyson swarm construction phases.',
		author: 'Project Dyson Team',
		date: new Date('2025-01-31'),
		tags: ['AI', 'methodology', 'LLM', 'comparison'],
		category: 'Research',
		relatedPhases: ['phase-0', 'phase-1'],
		content: `
# Comparing AI Approaches to Dyson Swarm Planning

We've gathered detailed Phase 0 and Phase 1 plans from three frontier AI models. Here's what we learned from their different approaches.

## Methodology

Each model was given the same prompt requesting:
- Executive summary
- Detailed Bill of Materials
- Cost breakdown with confidence intervals
- Timeline and dependencies
- Technical challenges
- Research requirements

## Key Differences

### Cost Estimation Approaches

**Gemini 3 Pro** tends to provide conservative estimates with explicit uncertainty ranges, often citing historical space mission costs as baselines.

**GPT-5.2** offers detailed cost justifications tied to current commercial space pricing, with assumptions clearly stated.

**Claude Opus 4.5** balances optimistic and pessimistic scenarios, providing sensitivity analysis on key cost drivers.

### Technical Focus Areas

Different models emphasized different aspects:
- Gemini focused heavily on autonomous systems and fault tolerance
- GPT-5.2 emphasized material processing and thermal management
- Claude prioritized anchoring systems and dust mitigation

### Timeline Variations

All models agreed on the 6-7 year timeframe for Phase 0, but differed on:
- Critical path identification
- Parallelization opportunities
- Risk buffer allocations

## Consensus Areas

Despite their differences, the models agreed on several key points:
1. Starting with a small, well-characterized NEA target
2. Prioritizing oxygen extraction as the primary product
3. The importance of dust mitigation systems
4. Need for extensive ground testing before deployment

## Next Steps

We're now synthesizing these perspectives into unified consensus documents for each phase.
		`
	},
	{
		slug: 'phase-0-bom-three-perspectives',
		title: 'Phase 0 BOM: Three AI Perspectives',
		description:
			'Side-by-side comparison of Phase 0 Bill of Materials from Gemini 3 Pro, GPT-5.2, and Claude Opus 4.5.',
		author: 'Engineering Team',
		date: new Date('2025-01-31'),
		tags: ['phase-0', 'BOM', 'comparison', 'AI'],
		category: 'Technical',
		relatedPhases: ['phase-0'],
		content: `
# Phase 0 BOM: Three AI Perspectives

Our multi-LLM consensus approach has yielded fascinating insights into how different AI models approach the Bill of Materials for space resource processing.

## Total Cost Estimates

| Model | Point Estimate | Confidence Range |
|-------|---------------|------------------|
| Gemini 3 Pro | $7.2B | ±35% |
| GPT-5.2 | $6.1B | ±30% |
| Claude Opus 4.5 | $13.75B | ±25% |

## Why Such Variation?

The cost differences stem from different assumptions about:

### Scope Definition
- What constitutes "Phase 0 complete"?
- How much redundancy is needed?
- What level of autonomy is required?

### Technology Readiness
- Models made different assumptions about TRL advancement by project start
- Varying estimates for FOAK (First-of-a-Kind) development costs

### Risk Allocation
- Different approaches to contingency budgeting
- Varying insurance and reserve requirements

## Areas of Agreement

All three models agreed that major cost drivers include:
1. **High-power solar arrays** (250-400 kW class)
2. **SEP tug development** with autonomous operations
3. **Processing platform development** (FOAK industrial spacecraft)
4. **Dust mitigation systems** (critical path item)

## Synthesis

Our consensus estimate targets the middle range (~$9B) with explicit carve-outs for:
- Technology demonstration missions
- Risk reduction activities
- Schedule margin

See the full consensus document on each phase page.
		`
	},
	{
		slug: 'what-ai-gets-right-wrong-space-mining',
		title: 'What AI Gets Right (and Wrong) About Space Mining',
		description:
			'Analyzing the strengths and blind spots of AI analysis for asteroid mining and resource processing.',
		author: 'Research Team',
		date: new Date('2025-01-31'),
		tags: ['AI', 'analysis', 'space-mining', 'critique'],
		category: 'Research',
		content: `
# What AI Gets Right (and Wrong) About Space Mining

After extensive cross-review sessions between our three AI models, we've identified patterns in what they excel at and where human expertise remains essential.

## What AI Does Well

### Literature Synthesis
All models demonstrated excellent ability to synthesize information from scientific literature, citing relevant missions and studies.

### Cost Modeling
Models produced detailed, justified cost estimates with clear assumptions—though they often disagreed on values.

### Risk Identification
Each model identified legitimate technical risks, often catching different subsets of potential issues.

### System-Level Thinking
The models excelled at understanding dependencies between subsystems and phases.

## Common Blind Spots

### Regulatory and Political Factors
All models underweighted:
- International space law complexities
- Export control restrictions
- Planetary protection requirements

### Human Factors
Limited attention to:
- Crew safety (for partially crewed missions)
- Ground team fatigue during extended operations
- Public communication and engagement

### Integration Complexity
Tended to underestimate:
- Interface challenges between systems
- Testing logistics
- Supply chain dependencies

## How We Address This

1. **Human review** of all AI-generated content
2. **Expert consultation** for regulatory and policy aspects
3. **Cross-model review** to catch individual blind spots
4. **Explicit uncertainty tracking** for contested estimates

## Conclusion

AI analysis is a powerful tool for megastructure planning, but it works best as an input to human decision-making rather than a replacement for it.
		`
	},
	{
		slug: 'solar-sail-technology-review',
		title: 'Solar Sail Technology: Current State and Future Potential',
		description:
			'A review of solar sail technology and its applications for Dyson swarm satellite positioning and station-keeping.',
		author: 'Physics Team',
		date: new Date('2025-01-28'),
		tags: ['solar-sail', 'propulsion', 'physics', 'technical'],
		category: 'Technical',
		content: `
# Solar Sail Technology Review

Solar sails represent a key technology for maintaining Dyson swarm satellite positions without propellant consumption. This article reviews the current state of the art and future developments needed for megastructure applications.

## How Solar Sails Work

Solar sails generate thrust from radiation pressure—photons from the Sun bouncing off a reflective surface transfer momentum to the sail. While the force is small, it's continuous and requires no fuel.

## Current Demonstrations

Recent missions have validated solar sail technology:

- JAXA's IKAROS (2010): First successful interplanetary solar sail
- Planetary Society's LightSail 2 (2019): Demonstrated controlled solar sailing
- NASA's NEA Scout (2022): CubeSat solar sail mission

## Requirements for Dyson Swarm

Swarm satellites will need solar sails for:

- Initial positioning after deployment
- Continuous station-keeping against perturbations
- Collision avoidance maneuvers
- End-of-life deorbiting

## Research Gaps

Key areas requiring further development:

- Ultra-lightweight sail materials
- Autonomous navigation systems
- Long-duration material degradation studies
- Scalable manufacturing processes
		`
	}
];

/**
 * Get all blog posts sorted by date
 */
export function getBlogPosts(): BlogPost[] {
	return [...BLOG_POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
	return BLOG_POSTS.find((post) => post.slug === slug);
}

/**
 * Get all categories
 */
export function getAllCategories(): string[] {
	const categories = new Set(BLOG_POSTS.map((post) => post.category));
	return Array.from(categories).sort();
}

