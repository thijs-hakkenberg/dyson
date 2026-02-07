/**
 * BOM Data Constants
 *
 * Contains all static data for BOM items including slug mappings,
 * phase items, and LLM model information.
 */

import type { CostConfidenceLevel } from '$lib/types';

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
		costBasis: 'First-of-kind large-scale thin-film membrane spacecraft; high uncertainty in manufacturing scale-up'
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
		costBasis: 'Based on thin-film PV roadmap projections; scale-up costs uncertain'
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
		costBasis: 'Distributed computing infrastructure; scaling to 1M+ nodes introduces uncertainty'
	}
];

/**
 * Phase 2 BOM Items - Swarm Expansion
 * Quantity and cost estimates to be derived from multi-model LLM consensus
 * Uncertainty ranges: typically +/-50-70% for far-future megascale systems
 */
export const PHASE_2_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-2-1',
		slug: 'collector-satellites',
		name: 'Solar Collector Satellites',
		quantity: '100,000 units',
		cost: '$5T',
		category: 'Spacecraft',
		costMin: '$2.5T',
		costMax: '$8.5T',
		costConfidence: 'low',
		costBasis: 'Assumes successful ISRU transition and learning curve; highly dependent on Phase 1 outcomes'
	},
	{
		bomId: 'bom-2-2',
		slug: 'maintenance-drones',
		name: 'Maintenance Drones',
		quantity: '5,000 units',
		cost: '$50B',
		category: 'Robotics',
		costMin: '$25B',
		costMax: '$85B',
		costConfidence: 'low',
		costBasis: 'Autonomous repair systems at scale; depot architecture costs highly uncertain'
	},
	{
		bomId: 'bom-2-3',
		slug: 'manufacturing-expansion',
		name: 'Additional Manufacturing Capacity',
		quantity: '5 facilities',
		cost: '$75B',
		category: 'Infrastructure',
		costMin: '$37.5B',
		costMax: '$127.5B',
		costConfidence: 'low',
		costBasis: 'Orbital factory replication; depends on ISRU maturity and automation advances'
	}
];

/**
 * Phase 3a BOM Items - Matrioshka Brain
 * Quantity and cost estimates derived from multi-model LLM consensus (2026-02-07)
 * Uncertainty ranges: Very high for far-future stellar-scale megastructures
 */
export const PHASE_3A_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-3a-1',
		slug: 'computational-substrate-tiles',
		name: 'Computational Substrate Tiles',
		quantity: '10¹² tiles',
		cost: '$10¹²-$10¹⁴',
		category: 'Computing',
		costMin: '$1T',
		costMax: '$100T',
		costConfidence: 'low',
		costBasis: 'Modular tiles integrating TPV energy harvesting, compute substrate, local memory, and mesh networking. Scale-up and in-space semiconductor fabrication are primary cost drivers.'
	},
	{
		bomId: 'bom-3a-2',
		slug: 'inter-layer-optical-backbone',
		name: 'Inter-Layer Optical Communication Backbone',
		quantity: '10⁸-10⁹ relay nodes',
		cost: '$10¹¹-$10¹³',
		category: 'Communications',
		costMin: '$100B',
		costMax: '$10T',
		costConfidence: 'medium',
		costBasis: 'Hierarchical free-space optical network with WDM/OAM multiplexed laser links. Most mature technology in Phase 3 BOM.'
	},
	{
		bomId: 'bom-3a-3',
		slug: 'thermal-management-radiator-systems',
		name: 'Thermal Management and Radiator Systems',
		quantity: '~10¹⁴ m² radiator area',
		cost: '$10¹²-$10¹⁵',
		category: 'Power Systems',
		costMin: '$1T',
		costMax: '$1000T',
		costConfidence: 'low',
		costBasis: 'Passive spectral-selective radiators plus active cryogenic systems for outer layers. Thermodynamic cascade efficiency is critical.'
	},
	{
		bomId: 'bom-3a-4',
		slug: 'self-replicating-manufacturing-foundries',
		name: 'Self-Replicating Manufacturing Foundries',
		quantity: '100-1,000 seed → 10⁴-10⁶ peak',
		cost: '$10¹³-$10¹⁵',
		category: 'Infrastructure',
		costMin: '$10T',
		costMax: '$1000T',
		costConfidence: 'low',
		costBasis: 'Autonomous factory complexes with ≥96% mass closure from in-situ resources. Critical-path industrial capability.'
	},
	{
		bomId: 'bom-3a-5',
		slug: 'distributed-computational-os',
		name: 'Distributed Computational Operating System',
		quantity: '1 system (~10⁶ engineer-years)',
		cost: '$10¹¹-$10¹²',
		category: 'Computing',
		costMin: '$100B',
		costMax: '$1T',
		costConfidence: 'low',
		costBasis: 'Hierarchical, self-organizing software fabric managing resources across light-hours of delay. No precedent exists.'
	},
	{
		bomId: 'bom-3a-6',
		slug: 'feedstock-supply-chain-pipeline',
		name: 'Feedstock Supply Chain and Logistics Pipeline',
		quantity: '~10,000 ships, ~500 mass drivers',
		cost: '$10¹³-$10¹⁴',
		category: 'Infrastructure',
		costMin: '$10T',
		costMax: '$100T',
		costConfidence: 'medium',
		costBasis: 'Scaled-up version of Phase 1-2 infrastructure with well-understood physics.'
	},
	{
		bomId: 'bom-3a-7',
		slug: 'inter-layer-power-distribution-network',
		name: 'Inter-Layer Power Distribution Network',
		quantity: '10⁸-10¹¹ power interface units',
		cost: '$10¹²-$10¹⁴',
		category: 'Power Systems',
		costMin: '$1T',
		costMax: '$100T',
		costConfidence: 'medium',
		costBasis: 'HVDC within layers plus optical power beaming between layers. Essential for outer-layer viability.'
	},
	{
		bomId: 'bom-3a-8',
		slug: 'shell-construction-maintenance-swarm',
		name: 'Shell Construction and Maintenance Swarm',
		quantity: '10⁶-10⁸ robots',
		cost: '$10¹¹-$10¹³',
		category: 'Robotics',
		costMin: '$100B',
		costMax: '$10T',
		costConfidence: 'medium',
		costBasis: 'Evolved Phase 2 robotics for deployment, repair, and recycling. Distinct from manufacturing foundries.'
	}
];

/**
 * Phase 3b BOM Items - Stellar Engine
 * Based on Caplan 2019 paper "Stellar Engines: Design Considerations for Maximizing Acceleration"
 * Uncertainty ranges: Very high for stellar-scale propulsion systems
 */
export const PHASE_3B_BOM_ITEMS: BOMItemMeta[] = [
	{
		bomId: 'bom-3b-1',
		slug: 'shkadov-mirror-array',
		name: 'Shkadov Mirror Array',
		quantity: '~10¹² m² reflective area',
		cost: '$10T-$100T',
		category: 'Infrastructure',
		costMin: '$1T',
		costMax: '$100T',
		costConfidence: 'low',
		costBasis: 'Scaled from Phase 2 thin-film production. Primary uncertainty is AU-scale structural stability.'
	},
	{
		bomId: 'bom-3b-2',
		slug: 'thermonuclear-jet-engine',
		name: 'Thermonuclear Jet Engine',
		quantity: '~100 engine units',
		cost: '$10T-$100T',
		category: 'Infrastructure',
		costMin: '$1T',
		costMax: '$100T',
		costConfidence: 'low',
		costBasis: 'Novel fusion propulsion at stellar scale. No heritage systems for comparison.'
	},
	{
		bomId: 'bom-3b-3',
		slug: 'solar-wind-collectors',
		name: 'Solar Wind Collectors',
		quantity: '~10⁷ collector stations',
		cost: '$10T-$50T',
		category: 'Infrastructure',
		costMin: '$1T',
		costMax: '$50T',
		costConfidence: 'low',
		costBasis: 'Extension of Dyson swarm infrastructure with magnetic plasma handling.'
	},
	{
		bomId: 'bom-3b-4',
		slug: 'mass-lifting-systems',
		name: 'Mass Lifting Systems',
		quantity: '~1,000 lifting stations',
		cost: '$50T-$200T',
		category: 'Infrastructure',
		costMin: '$10T',
		costMax: '$200T',
		costConfidence: 'low',
		costBasis: 'Most speculative system. Requires managing solar surface disruption.'
	},
	{
		bomId: 'bom-3b-5',
		slug: 'helium-separation-plant',
		name: 'Helium Separation Plant',
		quantity: '~500 processing plants',
		cost: '$10T-$50T',
		category: 'Infrastructure',
		costMin: '$2T',
		costMax: '$50T',
		costConfidence: 'low',
		costBasis: 'Scaled from terrestrial isotope separation with space operation multiplier.'
	},
	{
		bomId: 'bom-3b-6',
		slug: 'em-accelerators',
		name: 'Electromagnetic Accelerators',
		quantity: '~10,000 accelerator units',
		cost: '$10T-$50T',
		category: 'Infrastructure',
		costMin: '$2T',
		costMax: '$50T',
		costConfidence: 'medium',
		costBasis: 'Extension of Phase 1 mass driver technology to higher power levels.'
	},
	{
		bomId: 'bom-3b-7',
		slug: 'dyson-integration-layer',
		name: 'Dyson Integration Layer',
		quantity: '1 system',
		cost: '$5T-$20T',
		category: 'Computing',
		costMin: '$1T',
		costMax: '$20T',
		costConfidence: 'medium',
		costBasis: 'Software and infrastructure integration. Builds on Phase 2 swarm control.'
	},
	{
		bomId: 'bom-3b-8',
		slug: 'thrust-stabilization',
		name: 'Thrust Stabilization Systems',
		quantity: '~10,000 stabilization nodes',
		cost: '$5T-$20T',
		category: 'Computing',
		costMin: '$1T',
		costMax: '$20T',
		costConfidence: 'medium',
		costBasis: 'Control systems with century-scale feedback loops. Novel but well-defined problem.'
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
