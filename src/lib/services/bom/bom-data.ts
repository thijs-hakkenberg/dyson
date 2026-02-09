/**
 * BOM Data Constants
 *
 * Contains all static data for BOM items including slug mappings,
 * phase items, and LLM model information.
 */

import type { CostConfidenceLevel } from '$lib/types';

/**
 * Material alternative research reference
 */
export interface MaterialAlternativeMeta {
	name: string;
	arxivId?: string;
	benefit: string;
	tradeoff?: string;
}

/**
 * BOM Item metadata interface
 */
export interface BOMItemMeta {
	bomId: string;
	slug: string;
	name: string;
	quantity: string;
	cost: string;
	category: string;
	costMin?: string;
	costMax?: string;
	costConfidence?: CostConfidenceLevel;
	costBasis?: string;
	materialAlternatives?: MaterialAlternativeMeta[];
}

/**
 * BOM Item slug mappings (ID -> slug)
 */
export const BOM_ITEM_SLUGS: Record<string, string> = {
	// Phase 0
	'bom-0-1': 'prospecting-satellites',
	'bom-0-2': 'mining-robots',
	'bom-0-3': 'material-processing-station',
	'bom-0-4': 'transport-vehicles',
	'bom-0-5': 'solar-power-arrays',
	'bom-0-6': 'ispp-systems',
	// Phase 1
	'bom-1-1': 'collector-units',
	'bom-1-2': 'pv-blanket-arrays',
	'bom-1-3': 'assembly-robots',
	'bom-1-4': 'assembly-node',
	'bom-1-5': 'mass-drivers',
	'bom-1-6': 'orbital-tugs',
	'bom-1-7': 'swarm-control-system',
	// Phase 2
	'bom-2-1': 'collector-satellites',
	'bom-2-2': 'maintenance-drones',
	'bom-2-3': 'manufacturing-expansion',
	// Phase 3a - Matrioshka Brain
	'bom-3a-1': 'computational-substrate-tiles',
	'bom-3a-2': 'inter-layer-optical-backbone',
	'bom-3a-3': 'thermal-management-radiator-systems',
	'bom-3a-4': 'self-replicating-manufacturing-foundries',
	'bom-3a-5': 'distributed-computational-os',
	'bom-3a-6': 'feedstock-supply-chain-pipeline',
	'bom-3a-7': 'inter-layer-power-distribution-network',
	'bom-3a-8': 'shell-construction-maintenance-swarm',
	// Phase 3b - Stellar Engine
	'bom-3b-1': 'shkadov-mirror-array',
	'bom-3b-2': 'thermonuclear-jet-engine',
	'bom-3b-3': 'solar-wind-collectors',
	'bom-3b-4': 'mass-lifting-systems',
	'bom-3b-5': 'helium-separation-plant',
	'bom-3b-6': 'em-accelerators',
	'bom-3b-7': 'dyson-integration-layer',
	'bom-3b-8': 'thrust-stabilization'
};

/**
 * Reverse mapping (slug -> ID)
 */
export const SLUG_TO_BOM_ID: Record<string, string> = Object.entries(BOM_ITEM_SLUGS).reduce(
	(acc, [bomId, slug]) => {
		acc[slug] = bomId;
		return acc;
	},
	{} as Record<string, string>
);

/**
 * Phase 0 BOM Items
 * Uncertainty ranges: typically +/-30-50% for near-term space hardware
 */
export const PHASE_0_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-0-1',
		slug: 'prospecting-satellites',
		name: 'Prospecting Satellites',
		quantity: '32 units',
		cost: '$160M',
		category: 'Spacecraft',
		costMin: '$112M',
		costMax: '$240M',
		costConfidence: 'high',
		costBasis: 'Based on existing CubeSat and small satellite mission costs with heritage spectrometer payloads'
	},
	{
		bomId: 'bom-0-2',
		slug: 'mining-robots',
		name: 'Mining Robots',
		quantity: '20 units',
		cost: '$1B',
		category: 'Robotics',
		costMin: '$600M',
		costMax: '$1.5B',
		costConfidence: 'medium',
		costBasis: 'Extrapolated from planetary rover costs; asteroid surface operations add uncertainty'
	},
	{
		bomId: 'bom-0-3',
		slug: 'material-processing-station',
		name: 'Material Processing Station',
		quantity: '1 station',
		cost: '$10B',
		category: 'Infrastructure',
		costMin: '$7B',
		costMax: '$15B',
		costConfidence: 'medium',
		costBasis: 'Scaled from ISS module costs; novel processing equipment adds uncertainty'
	},
	{
		bomId: 'bom-0-4',
		slug: 'transport-vehicles',
		name: 'Transport Vehicles',
		quantity: '15 units',
		cost: '$2B',
		category: 'Spacecraft',
		costMin: '$1.4B',
		costMax: '$3B',
		costConfidence: 'medium',
		costBasis: 'Based on SEP spacecraft costs; krypton/iodine propulsion well-characterized'
	},
	{
		bomId: 'bom-0-5',
		slug: 'solar-power-arrays',
		name: 'Solar Power Arrays',
		quantity: '100 MW',
		cost: '$500M',
		category: 'Power Systems',
		costMin: '$350M',
		costMax: '$750M',
		costConfidence: 'high',
		costBasis: 'Based on current thin-film PV costs with established space deployment track record'
	},
	{
		bomId: 'bom-0-6',
		slug: 'ispp-systems',
		name: 'In-Situ Propellant Production Systems',
		quantity: '4 units',
		cost: '$2B',
		category: 'Infrastructure',
		costMin: '$1.4B',
		costMax: '$3B',
		costConfidence: 'medium',
		costBasis: 'Based on arxiv 1702.00335 bucket-wheel excavation with integrated electrolysis'
	}
];

/**
 * Phase 1 BOM Items - Initial Swarm Deployment
 * Quantity and cost estimates derived from multi-model LLM consensus (2026-02-01)
 * Uncertainty ranges: typically +/-40-60% for novel space systems
 */
export const PHASE_1_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-1-1',
		slug: 'collector-units',
		name: 'Solar Collector Units',
		quantity: '1,000 units',
		cost: '$100B',
		category: 'Spacecraft',
		costMin: '$60B',
		costMax: '$160B',
		costConfidence: 'low',
		costBasis: 'First-of-kind large-scale thin-film membrane spacecraft; high uncertainty in manufacturing scale-up',
		materialAlternatives: [
			{
				name: 'UMG-Si (Upgraded Metallurgical-Grade Silicon)',
				arxivId: '2101.08019',
				benefit: '20.76% efficiency at significantly lower cost than electronic-grade silicon',
				tradeoff: 'Slightly lower efficiency than EG-Si but much better cost/watt for space applications'
			},
			{
				name: 'Graphene/MoS2 heterostructures',
				arxivId: '1503.05380',
				benefit: 'Potential for radical mass reduction via 2D material photovoltaics',
				tradeoff: 'Early TRL; manufacturing at scale unproven'
			},
			{
				name: 'Multi-junction III-V cells',
				arxivId: '1905.08024',
				benefit: '47.2% theoretical efficiency under concentration',
				tradeoff: 'Higher cost per area; optimal for concentrated solar applications'
			},
			{
				name: 'Metamaterial light-trapping enhancement',
				arxivId: '1406.6710',
				benefit: 'Omnidirectional absorption improves off-axis performance',
				tradeoff: 'Adds fabrication complexity; benefit diminishes for tracking systems'
			}
		]
	},
	{
		bomId: 'bom-1-2',
		slug: 'pv-blanket-arrays',
		name: 'PV Blanket Arrays',
		quantity: '5,000 units',
		cost: '$25B',
		category: 'Power Systems',
		costMin: '$15B',
		costMax: '$40B',
		costConfidence: 'medium',
		costBasis: 'Based on thin-film PV roadmap projections; scale-up costs uncertain',
		materialAlternatives: [
			{
				name: 'UMG-Si thin-film',
				arxivId: '2101.08019',
				benefit: '20.76% efficiency with reduced purification costs',
				tradeoff: 'Requires optimized deposition process for space-grade blankets'
			},
			{
				name: 'Multi-junction concentrator cells',
				arxivId: '1905.08024',
				benefit: '47.2% efficiency potential reduces required collection area',
				tradeoff: 'Requires optical concentration system; adds pointing requirements'
			},
			{
				name: 'Metamaterial-enhanced absorbers',
				arxivId: '1406.6710',
				benefit: 'Omnidirectional light-trapping improves energy yield',
				tradeoff: 'Manufacturing complexity for large-area blankets'
			}
		]
	},
	{
		bomId: 'bom-1-3',
		slug: 'assembly-robots',
		name: 'Assembly Robots',
		quantity: '50 units',
		cost: '$3B',
		category: 'Robotics',
		costMin: '$1.8B',
		costMax: '$4.8B',
		costConfidence: 'medium',
		costBasis: 'Extrapolated from ISS robotic systems; heterogeneous fleet adds design complexity'
	},
	{
		bomId: 'bom-1-4',
		slug: 'assembly-node',
		name: 'Assembly Node Hub',
		quantity: '1 hub',
		cost: '$15B',
		category: 'Infrastructure',
		costMin: '$9B',
		costMax: '$24B',
		costConfidence: 'low',
		costBasis: 'Novel orbital manufacturing facility; no direct heritage systems for comparison'
	},
	{
		bomId: 'bom-1-5',
		slug: 'mass-drivers',
		name: 'Mass Drivers',
		quantity: '2 systems',
		cost: '$8B',
		category: 'Infrastructure',
		costMin: '$4.8B',
		costMax: '$12.8B',
		costConfidence: 'low',
		costBasis: 'Electromagnetic launch technology TRL 4-5; significant development costs expected'
	},
	{
		bomId: 'bom-1-6',
		slug: 'orbital-tugs',
		name: 'Orbital Tugs',
		quantity: '20 units',
		cost: '$2B',
		category: 'Spacecraft',
		costMin: '$1.2B',
		costMax: '$3.2B',
		costConfidence: 'medium',
		costBasis: 'Based on existing SEP spacecraft with depot operations; well-understood propulsion'
	},
	{
		bomId: 'bom-1-7',
		slug: 'swarm-control-system',
		name: 'Swarm Control System',
		quantity: '1 system',
		cost: '$5B',
		category: 'Computing',
		costMin: '$3B',
		costMax: '$8B',
		costConfidence: 'medium',
		costBasis: 'Distributed computing infrastructure; scaling to 1M+ nodes introduces uncertainty',
		materialAlternatives: [
			{
				name: 'Retrodirective phased array beaming',
				arxivId: '2309.14274',
				benefit: 'Automatic beam tracking without explicit position feedback; simplifies control',
				tradeoff: 'Requires pilot signal from ground; adds receiver complexity'
			},
			{
				name: 'High-efficiency rectenna receivers',
				arxivId: '2601.12386',
				benefit: '68.1% demonstrated RF-to-DC conversion efficiency for power transmission',
				tradeoff: 'Efficiency varies with power density; requires optimization for distance'
			}
		]
	}
];

/**
 * Phase 2 BOM Items - Swarm Expansion
 * REVISED 2026-02-09: Capacity cost model adopted per rq-0-28 consensus
 * Previous linear unit-cost methodology ($5.1T) replaced with capacity model ($375B)
 * Costs now represent: seed investment + bootstrap + import streams + oversight + risk
 */
export const PHASE_2_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-2-1',
		slug: 'collector-satellites',
		name: 'Solar Collector Satellites',
		quantity: '100,000 units',
		cost: '$200B',
		category: 'Spacecraft',
		costMin: '$120B',
		costMax: '$350B',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Seed foundry investment ($50B) + bootstrap operations ($30B) + import stream for non-ISRU components ($80B) + swarm governance software ($40B). Unit production is ISRU-based with ~96% mass closure; marginal cost per unit approaches control system overhead only.',
		materialAlternatives: [
			{
				name: 'UMG-Si (Upgraded Metallurgical-Grade Silicon)',
				arxivId: '2101.08019',
				benefit: '20.76% efficiency; ISRU-compatible purification from asteroid silicates',
				tradeoff: 'Requires in-space refining capability development'
			},
			{
				name: 'Graphene/MoS2 heterostructures',
				arxivId: '1503.05380',
				benefit: 'Ultra-lightweight 2D material PV could dramatically reduce mass per unit',
				tradeoff: 'Requires breakthrough in large-area 2D material synthesis'
			},
			{
				name: 'Multi-junction III-V cells',
				arxivId: '1905.08024',
				benefit: '47.2% efficiency enables smaller collectors for same power output',
				tradeoff: 'III-V materials (Ga, As, In) less abundant in asteroid feedstock'
			},
			{
				name: 'Metamaterial light-trapping',
				arxivId: '1406.6710',
				benefit: 'Omnidirectional absorption reduces tracking precision requirements',
				tradeoff: 'Additional fabrication steps in ISRU manufacturing chain'
			}
		]
	},
	{
		bomId: 'bom-2-2',
		slug: 'maintenance-drones',
		name: 'Maintenance Drones',
		quantity: '5,000 units',
		cost: '$25B',
		category: 'Robotics',
		costMin: '$15B',
		costMax: '$40B',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Seed drone fleet ($10B) + depot infrastructure ($10B) + autonomous coordination software ($5B). Production drones are ISRU-manufactured after initial seed deployment.'
	},
	{
		bomId: 'bom-2-3',
		slug: 'manufacturing-expansion',
		name: 'Additional Manufacturing Capacity',
		quantity: '5 self-replicating facilities',
		cost: '$150B',
		category: 'Infrastructure',
		costMin: '$100B',
		costMax: '$250B',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: This is the PRIMARY cost driver for Phase 2. Seed foundry development ($80B) + first-generation replication validation ($40B) + quality assurance systems ($30B). Self-replicating foundries with 12-month cycle produce all subsequent capacity.'
	}
];

/**
 * Phase 3a BOM Items - Matrioshka Brain
 * REVISED 2026-02-09: Capacity cost model adopted per rq-0-28 consensus
 * Previous linear methodology (~$10Q) replaced with capacity model (~$7.5T)
 * ~1,350x reduction reflects self-replicating ISRU economics
 */
export const PHASE_3A_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-3a-1',
		slug: 'computational-substrate-tiles',
		name: 'Computational Substrate Tiles',
		quantity: '10¹² tiles',
		cost: '$1.5T',
		category: 'Computing',
		costMin: '$800B',
		costMax: '$3T',
		costConfidence: 'low',
		costBasis: 'CAPACITY MODEL: Tile architecture R&D ($200B) + semiconductor "vitamin" imports ($800B) + quality assurance systems ($500B). Tile production is ISRU-based; cost represents Earth-sourced components that cannot be manufactured from asteroid feedstock (rad-hard processors, precision optics, specific dopants).'
	},
	{
		bomId: 'bom-3a-2',
		slug: 'inter-layer-optical-backbone',
		name: 'Inter-Layer Optical Communication Backbone',
		quantity: '10⁸-10⁹ relay nodes',
		cost: '$400B',
		category: 'Communications',
		costMin: '$200B',
		costMax: '$800B',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Most mature technology in Phase 3. Seed relay network ($150B) + laser source imports ($150B) + network orchestration software ($100B). Relay node production scales via ISRU after seed deployment.'
	},
	{
		bomId: 'bom-3a-3',
		slug: 'thermal-management-radiator-systems',
		name: 'Thermal Management and Radiator Systems',
		quantity: '~10¹⁴ m² radiator area',
		cost: '$800B',
		category: 'Power Systems',
		costMin: '$400B',
		costMax: '$1.5T',
		costConfidence: 'low',
		costBasis: 'CAPACITY MODEL: Spectral-selective coating R&D ($200B) + cryogenic system seed units ($300B) + thermal control software ($300B). Radiator panels are structurally simple and fully ISRU-producible; cost is primarily in metamaterial coatings and active cooling for outer layers.'
	},
	{
		bomId: 'bom-3a-4',
		slug: 'self-replicating-manufacturing-foundries',
		name: 'Self-Replicating Manufacturing Foundries',
		quantity: '100-1,000 seed → 10⁴-10⁶ peak',
		cost: '$2T',
		category: 'Infrastructure',
		costMin: '$1T',
		costMax: '$4T',
		costConfidence: 'low',
		costBasis: 'CAPACITY MODEL: PRIMARY COST DRIVER. Seed foundry development ($800B) + first-generation validation ($400B) + closure ratio optimization ($400B) + multi-generational quality assurance ($400B). This investment enables all other Phase 3a production. 12-month replication cycle with ≥96% mass closure.'
	},
	{
		bomId: 'bom-3a-5',
		slug: 'distributed-computational-os',
		name: 'Distributed Computational Operating System',
		quantity: '1 system (~10⁶ engineer-years)',
		cost: '$500B',
		category: 'Computing',
		costMin: '$300B',
		costMax: '$800B',
		costConfidence: 'low',
		costBasis: 'CAPACITY MODEL: Most complex software ever built. Light-hour scale consensus protocols ($150B) + replication fidelity management ($150B) + anomaly detection and self-healing ($100B) + resource allocation across thermal layers ($100B). No precedent exists; estimate based on scaling from largest current distributed systems.'
	},
	{
		bomId: 'bom-3a-6',
		slug: 'feedstock-supply-chain-pipeline',
		name: 'Feedstock Supply Chain and Logistics Pipeline',
		quantity: '~10,000 ships, ~500 mass drivers',
		cost: '$1T',
		category: 'Infrastructure',
		costMin: '$600B',
		costMax: '$1.8T',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Scaled Phase 2 infrastructure. Seed mining fleet ($300B) + mass driver network expansion ($400B) + logistics coordination software ($300B). Well-understood physics; cost is primarily initial seed deployment before ISRU production takes over.'
	},
	{
		bomId: 'bom-3a-7',
		slug: 'inter-layer-power-distribution-network',
		name: 'Inter-Layer Power Distribution Network',
		quantity: '10⁸-10¹¹ power interface units',
		cost: '$800B',
		category: 'Power Systems',
		costMin: '$400B',
		costMax: '$1.5T',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: HVDC seed infrastructure ($300B) + optical power beaming development ($300B) + power routing software ($200B). Power interface units are ISRU-producible after seed network established.',
		materialAlternatives: [
			{
				name: 'High-efficiency rectenna arrays',
				arxivId: '2601.12386',
				benefit: '68.1% RF-to-DC efficiency demonstrated; scalable for inter-layer power beaming',
				tradeoff: 'Efficiency drops at very high power densities; thermal management needed'
			},
			{
				name: 'Retrodirective beam steering',
				arxivId: '2309.14274',
				benefit: 'Self-tracking beams simplify inter-layer alignment across AU distances',
				tradeoff: 'Pilot signal latency at AU scales may require predictive algorithms'
			}
		]
	},
	{
		bomId: 'bom-3a-8',
		slug: 'shell-construction-maintenance-swarm',
		name: 'Shell Construction and Maintenance Swarm',
		quantity: '10⁶-10⁸ robots',
		cost: '$500B',
		category: 'Robotics',
		costMin: '$250B',
		costMax: '$1T',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Evolved Phase 2 robotics. Seed swarm development ($200B) + specialized tooling for shell deployment ($150B) + swarm coordination software ($150B). Robot production is fully ISRU-based after seed deployment.'
	}
];

/**
 * Phase 3b BOM Items - Stellar Engine
 * REVISED 2026-02-09: Capacity cost model adopted per rq-0-28 consensus
 * Previous linear methodology (~$110T) replaced with capacity model (~$1.5T)
 * ~73x reduction reflects ISRU economics; most infrastructure reuses Phase 2/3a foundries
 */
export const PHASE_3B_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-3b-1',
		slug: 'shkadov-mirror-array',
		name: 'Shkadov Mirror Array',
		quantity: '~10¹² m² reflective area',
		cost: '$150B',
		category: 'Infrastructure',
		costMin: '$80B',
		costMax: '$300B',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Extension of Phase 2 thin-film production. Seed mirror segments ($50B) + AU-scale structural engineering ($50B) + station-keeping propulsion ($50B). Mirror material is fully ISRU-producible; cost is primarily R&D and initial seed deployment.'
	},
	{
		bomId: 'bom-3b-2',
		slug: 'thermonuclear-jet-engine',
		name: 'Thermonuclear Jet Engine',
		quantity: '~100 engine units',
		cost: '$400B',
		category: 'Infrastructure',
		costMin: '$200B',
		costMax: '$800B',
		costConfidence: 'low',
		costBasis: 'CAPACITY MODEL: PRIMARY R&D COST. Fusion ignition R&D ($200B) + stellar-scale engine development ($100B) + fuel cycle integration ($100B). Novel fusion propulsion with no heritage; highest uncertainty item in Phase 3b.'
	},
	{
		bomId: 'bom-3b-3',
		slug: 'solar-wind-collectors',
		name: 'Solar Wind Collectors',
		quantity: '~10⁷ collector stations',
		cost: '$100B',
		category: 'Infrastructure',
		costMin: '$50B',
		costMax: '$200B',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Magnetic plasma handling R&D ($40B) + seed collector network ($40B) + collection coordination software ($20B). Extension of Dyson swarm with well-understood plasma physics; collector production is ISRU-based.'
	},
	{
		bomId: 'bom-3b-4',
		slug: 'mass-lifting-systems',
		name: 'Mass Lifting Systems',
		quantity: '~1,000 lifting stations',
		cost: '$300B',
		category: 'Infrastructure',
		costMin: '$150B',
		costMax: '$600B',
		costConfidence: 'low',
		costBasis: 'CAPACITY MODEL: Most speculative system. Solar surface interaction R&D ($150B) + magnetic channeling development ($100B) + lifting station seed deployment ($50B). Requires managing solar chromosphere dynamics; high R&D uncertainty.'
	},
	{
		bomId: 'bom-3b-5',
		slug: 'helium-separation-plant',
		name: 'Helium Separation Plant',
		quantity: '~500 processing plants',
		cost: '$150B',
		category: 'Infrastructure',
		costMin: '$80B',
		costMax: '$300B',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Isotope separation R&D adaptation ($60B) + seed processing plants ($50B) + fuel storage and handling ($40B). Well-understood terrestrial physics adapted for space; plant production is ISRU-based after seed deployment.'
	},
	{
		bomId: 'bom-3b-6',
		slug: 'em-accelerators',
		name: 'Electromagnetic Accelerators',
		quantity: '~10,000 accelerator units',
		cost: '$150B',
		category: 'Infrastructure',
		costMin: '$80B',
		costMax: '$300B',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Extension of Phase 1-2 mass driver technology. High-power scaling R&D ($60B) + seed accelerator network ($50B) + propellant handling systems ($40B). Most mature technology in Phase 3b; ISRU-producible after seed deployment.'
	},
	{
		bomId: 'bom-3b-7',
		slug: 'dyson-integration-layer',
		name: 'Dyson Integration Layer',
		quantity: '1 system',
		cost: '$100B',
		category: 'Computing',
		costMin: '$50B',
		costMax: '$200B',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Software and infrastructure integration. Power allocation algorithms ($40B) + engine-swarm coordination ($30B) + thrust vector management ($30B). Builds on Phase 2/3a distributed systems; primarily software development cost.'
	},
	{
		bomId: 'bom-3b-8',
		slug: 'thrust-stabilization',
		name: 'Thrust Stabilization Systems',
		quantity: '~10,000 stabilization nodes',
		cost: '$150B',
		category: 'Computing',
		costMin: '$80B',
		costMax: '$300B',
		costConfidence: 'medium',
		costBasis: 'CAPACITY MODEL: Century-scale control systems. Planetary orbit stability modeling ($50B) + feedback control algorithms ($50B) + stabilization node seed deployment ($50B). Novel timescale but well-defined control theory problem.'
	}
];

/**
 * LLM Model information for display
 */
export const LLM_MODELS = {
	'claude-opus-4-5': {
		id: 'claude-opus-4-5',
		name: 'Claude Opus 4.5',
		filename: 'claude-opus-4-5.md'
	},
	'claude-opus-4-6': {
		id: 'claude-opus-4-6',
		name: 'Claude Opus 4.6',
		filename: 'claude-opus-4-6.md'
	},
	'gemini-3-pro': {
		id: 'gemini-3-pro',
		name: 'Gemini 3 Pro',
		filename: 'gemini-3-pro.md'
	},
	'gpt-5-2': {
		id: 'gpt-5-2',
		name: 'GPT-5.2',
		filename: 'gpt-5-2.md'
	}
} as const;

export type LLMModelId = keyof typeof LLM_MODELS;

/**
 * Get BOM item by slug
 */
export function getBOMItemBySlug(slug: string, phaseId?: string): BOMItemMeta | undefined {
	if (phaseId) {
		const items = getAllBOMItemsForPhase(phaseId);
		return items.find((item) => item.slug === slug);
	}
	// Search all phases
	return (
		PHASE_0_BOM_ITEMS.find((item) => item.slug === slug) ||
		PHASE_1_BOM_ITEMS.find((item) => item.slug === slug) ||
		PHASE_2_BOM_ITEMS.find((item) => item.slug === slug) ||
		PHASE_3A_BOM_ITEMS.find((item) => item.slug === slug) ||
		PHASE_3B_BOM_ITEMS.find((item) => item.slug === slug)
	);
}

/**
 * Get all BOM items for a phase
 */
export function getAllBOMItemsForPhase(phaseId: string): BOMItemMeta[] {
	switch (phaseId) {
		case 'phase-0':
			return PHASE_0_BOM_ITEMS;
		case 'phase-1':
			return PHASE_1_BOM_ITEMS;
		case 'phase-2':
			return PHASE_2_BOM_ITEMS;
		case 'phase-3a':
			return PHASE_3A_BOM_ITEMS;
		case 'phase-3b':
			return PHASE_3B_BOM_ITEMS;
		default:
			return [];
	}
}
