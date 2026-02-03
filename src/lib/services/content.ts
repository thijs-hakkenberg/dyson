import type { Phase, BlogPost, BOMItem, TimelineNode, PhaseDependencyGraph } from '$lib/types';

/**
 * Phase data for the Dyson swarm project
 */
export const PHASES: Phase[] = [
	{
		id: 'phase-0',
		number: 0,
		title: 'Space Resource Processing',
		description:
			'Establish the foundational infrastructure for asteroid mining and material processing in space. This phase focuses on developing the supply chain for raw materials needed for subsequent construction phases.',
		status: 'in-progress',
		objectives: [
			'Deploy asteroid prospecting satellites',
			'Establish first mining operation on near-Earth asteroid',
			'Build orbital material processing facility',
			'Create initial stockpile of construction materials',
			'Test and validate in-situ resource utilization techniques'
		],
		bom: [
			{
				id: 'bom-0-1',
				name: 'Prospecting Satellites',
				description: 'Small satellites equipped with spectrometers for asteroid composition analysis',
				quantity: 32,
				unit: 'units',
				unitCost: 5000000,
				totalCost: 160000000,
				category: 'Spacecraft',
				slug: 'prospecting-satellites'
			},
			{
				id: 'bom-0-2',
				name: 'Mining Robots',
				description: 'Autonomous mining and extraction robots for asteroid surface operations',
				quantity: 20,
				unit: 'units',
				unitCost: 50000000,
				totalCost: 1000000000,
				category: 'Robotics',
				slug: 'mining-robots'
			},
			{
				id: 'bom-0-3',
				name: 'Material Processing Station',
				description: 'Orbital facility for refining raw asteroid materials',
				quantity: 1,
				unit: 'station',
				unitCost: 10000000000,
				totalCost: 10000000000,
				category: 'Infrastructure',
				slug: 'material-processing-station'
			},
			{
				id: 'bom-0-4',
				name: 'Transport Vehicles',
				description: 'Cargo spacecraft for moving materials between asteroids and processing station. Krypton/iodine propulsion (xenon not viable due to supply constraints - demand exceeds global production 15-20×)',
				quantity: 15,
				unit: 'units',
				unitCost: 133333333,
				totalCost: 2000000000,
				category: 'Spacecraft',
				slug: 'transport-vehicles'
			},
			{
				id: 'bom-0-5',
				name: 'Solar Power Arrays',
				description: 'Power generation for mining and processing operations',
				quantity: 100,
				unit: 'MW capacity',
				unitCost: 5000000,
				totalCost: 500000000,
				category: 'Power Systems',
				slug: 'solar-power-arrays'
			}
		],
		totalCost: 13660000000,
		estimatedDuration: '10-15 years',
		dependencies: [],
		relatedResearch: ['asteroid mining', 'in-situ resource utilization', 'space manufacturing']
	},
	{
		id: 'phase-1',
		number: 1,
		title: 'Initial Swarm Deployment',
		description:
			'Begin construction of the first Dyson swarm elements. This phase focuses on building and deploying initial solar collector satellites, establishing assembly infrastructure, and creating the communication/control systems.',
		status: 'planned',
		objectives: [
			'Design and prototype swarm satellite units',
			'Deploy assembly node hub and robotic workforce',
			'Manufacture first batch of solar collectors',
			'Deploy initial swarm constellation (1,000 units)',
			'Establish swarm control and communication network',
			'Deploy mass drivers for lunar material transport',
			'Begin power transmission tests'
		],
		bom: [
			{
				id: 'bom-1-1',
				name: 'Solar Collector Units',
				description: 'Individual swarm elements with thin-film PV on tensioned membrane structure. 2 km minimum spacing for <10⁻⁶ collision probability. Hybrid SRP + ion propulsion (SRP primary at ≤0.7 AU)',
				quantity: 1000,
				unit: 'units',
				unitCost: 100000000,
				totalCost: 100000000000,
				category: 'Spacecraft',
				slug: 'collector-units'
			},
			{
				id: 'bom-1-2',
				name: 'PV Blanket Arrays',
				description: 'Rollable thin-film photovoltaic blankets for collector unit power generation',
				quantity: 5000,
				unit: 'units',
				unitCost: 5000000,
				totalCost: 25000000000,
				category: 'Power Systems',
				slug: 'pv-blanket-arrays'
			},
			{
				id: 'bom-1-3',
				name: 'Assembly Robots',
				description: 'Heterogeneous robot fleet including tugs, dexterous workers, and logistics drones',
				quantity: 50,
				unit: 'units',
				unitCost: 60000000,
				totalCost: 3000000000,
				category: 'Robotics',
				slug: 'assembly-robots'
			},
			{
				id: 'bom-1-4',
				name: 'Assembly Node Hub',
				description: 'Modular orbital manufacturing and assembly facility with robotic assembly cells. Located at Sun-Earth L1/L4. Earth manufacturing first 1,000-2,000 units, ISRU transition at ~3,500 units. Hierarchical coordination to 1M+ nodes',
				quantity: 1,
				unit: 'hub',
				unitCost: 15000000000,
				totalCost: 15000000000,
				category: 'Infrastructure',
				slug: 'assembly-node'
			},
			{
				id: 'bom-1-5',
				name: 'Mass Drivers',
				description: 'Electromagnetic coilgun systems for launching lunar materials to orbit',
				quantity: 2,
				unit: 'systems',
				unitCost: 4000000000,
				totalCost: 8000000000,
				category: 'Infrastructure',
				slug: 'mass-drivers'
			},
			{
				id: 'bom-1-6',
				name: 'Orbital Tugs',
				description: 'Solar-electric propulsion spacecraft for cargo transport between orbits. Two-tier depot architecture: NRHO (cislunar) + L4/L5 (heliocentric)',
				quantity: 20,
				unit: 'units',
				unitCost: 100000000,
				totalCost: 2000000000,
				category: 'Spacecraft',
				slug: 'orbital-tugs'
			},
			{
				id: 'bom-1-7',
				name: 'Swarm Control System',
				description: 'Distributed control infrastructure with beacon relays and ground stations. Hierarchical architecture (50-100 node clusters), 24-48 hour coordinator duty cycles, scales to 1M+ nodes',
				quantity: 1,
				unit: 'system',
				unitCost: 5000000000,
				totalCost: 5000000000,
				category: 'Computing',
				slug: 'swarm-control-system'
			}
		],
		totalCost: 158000000000,
		estimatedDuration: '20-30 years',
		dependencies: ['phase-0'],
		relatedResearch: ['solar sail', 'space-based solar power', 'wireless power transmission', 'electromagnetic launch']
	},
	{
		id: 'phase-2',
		number: 2,
		title: 'Swarm Expansion',
		description:
			'Scale up satellite production and deployment to achieve significant solar energy capture. This phase focuses on exponential growth of the swarm while maintaining system stability.',
		status: 'planned',
		objectives: [
			'Achieve self-sustaining production capacity',
			'Deploy 100,000+ collector satellites',
			'Establish redundant power transmission grid',
			'Begin supplying significant Earth energy needs',
			'Develop autonomous maintenance systems'
		],
		bom: [
			{
				id: 'bom-2-1',
				name: 'Solar Collector Satellites',
				description: 'Mass-produced swarm elements for exponential energy capture scaling',
				quantity: 100000,
				unit: 'units',
				unitCost: 50000000,
				totalCost: 5000000000000,
				category: 'Spacecraft',
				slug: 'collector-satellites'
			},
			{
				id: 'bom-2-2',
				name: 'Maintenance Drones',
				description: 'Autonomous repair and servicing robots for swarm upkeep. ~400 depots at 150,000-200,000 km spacing. Fleet: ~20,000 inspectors + ~2,000 servicers. <7 day MTTR',
				quantity: 5000,
				unit: 'units',
				unitCost: 10000000,
				totalCost: 50000000000,
				category: 'Robotics',
				slug: 'maintenance-drones'
			},
			{
				id: 'bom-2-3',
				name: 'Additional Manufacturing Capacity',
				description: 'New orbital factories for exponential production scaling. Hierarchical coordination scales to 100,000+ manufacturing nodes',
				quantity: 5,
				unit: 'facilities',
				unitCost: 15000000000,
				totalCost: 75000000000,
				category: 'Infrastructure',
				slug: 'manufacturing-expansion'
			}
		],
		totalCost: 5125000000000,
		estimatedDuration: '50-100 years',
		dependencies: ['phase-1'],
		relatedResearch: ['megastructure', 'orbital mechanics', 'autonomous systems']
	}
];

/**
 * Get all phases
 */
export function getPhases(): Phase[] {
	return PHASES;
}

/**
 * Get phase by ID
 */
export function getPhaseById(id: string): Phase | undefined {
	return PHASES.find((p) => p.id === id);
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
	if (amount >= 1e12) {
		return `$${(amount / 1e12).toFixed(2)}T`;
	} else if (amount >= 1e9) {
		return `$${(amount / 1e9).toFixed(2)}B`;
	} else if (amount >= 1e6) {
		return `$${(amount / 1e6).toFixed(2)}M`;
	} else if (amount >= 1e3) {
		return `$${(amount / 1e3).toFixed(2)}K`;
	}
	return `$${amount.toFixed(2)}`;
}

/**
 * Calculate total project cost
 */
export function getTotalProjectCost(): number {
	return PHASES.reduce((total, phase) => total + phase.totalCost, 0);
}

/**
 * Group BOM items by category
 */
export function groupBOMByCategory(items: BOMItem[]): Record<string, BOMItem[]> {
	return items.reduce(
		(groups, item) => {
			const category = item.category;
			if (!groups[category]) {
				groups[category] = [];
			}
			groups[category].push(item);
			return groups;
		},
		{} as Record<string, BOMItem[]>
	);
}

/**
 * Phase 0 Timeline/DAG data
 */
export const PHASE_0_TIMELINE: PhaseDependencyGraph = {
	phaseId: 'phase-0',
	criticalPathDuration: 84,
	nodes: [
		{
			id: 'site-survey',
			name: 'NEA Site Survey',
			type: 'activity',
			startMonth: 0,
			endMonth: 24,
			dependencies: [],
			status: 'in-progress',
			criticalPath: true,
			linkTo: '/plan/phase-0/bom/prospecting-satellites'
		},
		{
			id: 'sat-design',
			name: 'Satellite Design & Build',
			type: 'activity',
			startMonth: 0,
			endMonth: 36,
			dependencies: [],
			status: 'in-progress',
			criticalPath: true,
			linkTo: '/plan/phase-0/bom/prospecting-satellites'
		},
		{
			id: 'sat-deploy',
			name: 'Satellite Deployment',
			type: 'milestone',
			startMonth: 36,
			endMonth: 48,
			dependencies: ['sat-design'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-0/bom/prospecting-satellites'
		},
		{
			id: 'robot-dev',
			name: 'Mining Robot Development',
			type: 'activity',
			startMonth: 12,
			endMonth: 48,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-0/bom/mining-robots'
		},
		{
			id: 'target-select',
			name: 'Target Asteroid Selection',
			type: 'decision',
			startMonth: 24,
			endMonth: 30,
			dependencies: ['site-survey'],
			status: 'pending',
			criticalPath: true
		},
		{
			id: 'robot-deploy',
			name: 'Mining Robot Deployment',
			type: 'milestone',
			startMonth: 48,
			endMonth: 54,
			dependencies: ['robot-dev', 'target-select', 'sat-deploy'],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-0/bom/mining-robots'
		},
		{
			id: 'station-design',
			name: 'Processing Station Design',
			type: 'activity',
			startMonth: 6,
			endMonth: 36,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-0/bom/material-processing-station'
		},
		{
			id: 'station-build',
			name: 'Station Module Construction',
			type: 'activity',
			startMonth: 36,
			endMonth: 60,
			dependencies: ['station-design'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-0/bom/material-processing-station'
		},
		{
			id: 'station-assembly',
			name: 'On-Orbit Assembly',
			type: 'activity',
			startMonth: 60,
			endMonth: 72,
			dependencies: ['station-build'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-0/bom/material-processing-station'
		},
		{
			id: 'transport-dev',
			name: 'Transport Vehicle Development',
			type: 'activity',
			startMonth: 24,
			endMonth: 48,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-0/bom/transport-vehicles'
		},
		{
			id: 'transport-fleet',
			name: 'Transport Fleet Deployment',
			type: 'milestone',
			startMonth: 48,
			endMonth: 60,
			dependencies: ['transport-dev'],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-0/bom/transport-vehicles'
		},
		{
			id: 'power-design',
			name: 'Solar Array Design',
			type: 'activity',
			startMonth: 0,
			endMonth: 24,
			dependencies: [],
			status: 'in-progress',
			criticalPath: false,
			linkTo: '/plan/phase-0/bom/solar-power-arrays'
		},
		{
			id: 'power-deploy',
			name: 'Power System Deployment',
			type: 'activity',
			startMonth: 48,
			endMonth: 66,
			dependencies: ['power-design', 'station-build'],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-0/bom/solar-power-arrays'
		},
		{
			id: 'mining-ops',
			name: 'Initial Mining Operations',
			type: 'milestone',
			startMonth: 54,
			endMonth: 60,
			dependencies: ['robot-deploy'],
			status: 'pending',
			criticalPath: false
		},
		{
			id: 'station-ops',
			name: 'Station Operational',
			type: 'milestone',
			startMonth: 72,
			endMonth: 78,
			dependencies: ['station-assembly', 'power-deploy'],
			status: 'pending',
			criticalPath: true
		},
		{
			id: 'full-ops',
			name: 'Full Phase 0 Operations',
			type: 'milestone',
			startMonth: 78,
			endMonth: 84,
			dependencies: ['station-ops', 'mining-ops', 'transport-fleet'],
			status: 'pending',
			criticalPath: true
		}
	]
};

/**
 * Get timeline data for a phase
 */
export function getPhaseTimeline(phaseId: string): PhaseDependencyGraph | undefined {
	if (phaseId === 'phase-0') {
		return PHASE_0_TIMELINE;
	}
	return undefined;
}
