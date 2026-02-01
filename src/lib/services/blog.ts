import type { BlogPost } from '$lib/types';

// Sample blog posts (in a production app, these would be loaded from markdown files)
export const BLOG_POSTS: BlogPost[] = [
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

