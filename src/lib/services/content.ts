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
				slug: 'prospecting-satellites',
				costMin: 112000000,
				costMax: 240000000,
				costConfidence: 'high',
				costBasis: 'Based on existing CubeSat and small satellite mission costs with heritage spectrometer payloads'
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
				slug: 'mining-robots',
				costMin: 600000000,
				costMax: 1500000000,
				costConfidence: 'medium',
				costBasis: 'Extrapolated from planetary rover costs; asteroid surface operations add uncertainty'
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
				slug: 'material-processing-station',
				costMin: 7000000000,
				costMax: 15000000000,
				costConfidence: 'medium',
				costBasis: 'Scaled from ISS module costs; novel processing equipment adds uncertainty'
			},
			{
				id: 'bom-0-4',
				name: 'Transport Vehicles',
				description: 'Cargo spacecraft for moving materials between asteroids and processing station. Krypton/iodine propulsion (xenon not viable due to supply constraints - demand exceeds global production 15-20x)',
				quantity: 15,
				unit: 'units',
				unitCost: 133333333,
				totalCost: 2000000000,
				category: 'Spacecraft',
				slug: 'transport-vehicles',
				costMin: 1400000000,
				costMax: 3000000000,
				costConfidence: 'medium',
				costBasis: 'Based on SEP spacecraft costs; krypton/iodine propulsion well-characterized'
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
				slug: 'solar-power-arrays',
				costMin: 350000000,
				costMax: 750000000,
				costConfidence: 'high',
				costBasis: 'Based on current thin-film PV costs with established space deployment track record'
			},
			{
				id: 'bom-0-6',
				name: 'In-Situ Propellant Production Systems',
				description: 'Integrated water extraction and electrolysis systems (H2O -> H2 + O2) using bucket-wheel excavation. Dual counter-rotating design for torque balancing in microgravity. Heats regolith to 1000C to liberate water.',
				quantity: 4,
				unit: 'units',
				unitCost: 500000000,
				totalCost: 2000000000,
				category: 'Infrastructure',
				slug: 'ispp-systems',
				costMin: 1400000000,
				costMax: 3000000000,
				costConfidence: 'medium',
				costBasis: 'Based on arxiv 1702.00335 bucket-wheel excavation with integrated electrolysis'
			}
		],
		totalCost: 15660000000,
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
			'Begin power transmission tests',
			'Initiate ground receiver site selection (10-20 stations) for Phase 2 power delivery'
		],
		bom: [
			{
				id: 'bom-1-1',
				name: 'Solar Collector Units',
				description: 'Individual swarm elements with thin-film PV on tensioned membrane structure. 2 km minimum spacing for <10^-6 collision probability. Hybrid SRP + ion propulsion (SRP primary at <=0.7 AU)',
				quantity: 1000,
				unit: 'units',
				unitCost: 100000000,
				totalCost: 100000000000,
				category: 'Spacecraft',
				slug: 'collector-units',
				costMin: 60000000000,
				costMax: 160000000000,
				costConfidence: 'low',
				costBasis: 'First-of-kind large-scale thin-film membrane spacecraft; high uncertainty in manufacturing scale-up'
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
				slug: 'pv-blanket-arrays',
				costMin: 15000000000,
				costMax: 40000000000,
				costConfidence: 'medium',
				costBasis: 'Based on thin-film PV roadmap projections; scale-up costs uncertain'
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
				slug: 'assembly-robots',
				costMin: 1800000000,
				costMax: 4800000000,
				costConfidence: 'medium',
				costBasis: 'Extrapolated from ISS robotic systems; heterogeneous fleet adds design complexity'
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
				slug: 'assembly-node',
				costMin: 9000000000,
				costMax: 24000000000,
				costConfidence: 'low',
				costBasis: 'Novel orbital manufacturing facility; no direct heritage systems for comparison'
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
				slug: 'mass-drivers',
				costMin: 4800000000,
				costMax: 12800000000,
				costConfidence: 'low',
				costBasis: 'Electromagnetic launch technology TRL 4-5; significant development costs expected'
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
				slug: 'orbital-tugs',
				costMin: 1200000000,
				costMax: 3200000000,
				costConfidence: 'medium',
				costBasis: 'Based on existing SEP spacecraft with depot operations; well-understood propulsion'
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
				slug: 'swarm-control-system',
				costMin: 3000000000,
				costMax: 8000000000,
				costConfidence: 'medium',
				costBasis: 'Distributed computing infrastructure; scaling to 1M+ nodes introduces uncertainty'
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
			'Scale up satellite production and deployment to achieve grid-significant power delivery (~1 TW to Earth). Success metric: delivered power, not unit count. Four-tier threshold framework: Tier 1 (100 GW, ~10k units) for market entry, Tier 2 (1 TW, ~100k units) for grid significance and institutional lock-in.',
		status: 'planned',
		objectives: [
			'Achieve self-sustaining production capacity',
			'Deploy 100,000+ collector satellites',
			'Reach Tier 1 threshold: 100 GW delivered to Earth (political sustainability milestone)',
			'Reach Tier 2 threshold: 1 TW delivered to Earth (grid significance, irreversibility)',
			'Deploy ~1,000 ground receiver stations ($2-5T infrastructure)',
			'Establish redundant power transmission grid with 15-30% end-to-end efficiency',
			'Develop autonomous maintenance systems'
		],
		bom: [
			{
				id: 'bom-2-1',
				name: 'Solar Collector Satellites',
				description: 'Mass-produced swarm elements using Reference architecture (50,000 m², 0.7 AU, 35% efficiency). At 100k units: ~9.5 TW gross generation, ~1 TW delivered to Earth. Architecture spans 3 orders of magnitude in outcomes—conservative designs rejected as inadequate for ROI.',
				quantity: 100000,
				unit: 'units',
				unitCost: 50000000,
				totalCost: 5000000000000,
				category: 'Spacecraft',
				slug: 'collector-satellites',
				costMin: 2500000000000,
				costMax: 8500000000000,
				costConfidence: 'low',
				costBasis: 'Assumes successful ISRU transition and learning curve; highly dependent on Phase 1 outcomes'
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
				slug: 'maintenance-drones',
				costMin: 25000000000,
				costMax: 85000000000,
				costConfidence: 'low',
				costBasis: 'Autonomous repair systems at scale; depot architecture costs highly uncertain'
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
				slug: 'manufacturing-expansion',
				costMin: 37500000000,
				costMax: 127500000000,
				costConfidence: 'low',
				costBasis: 'Orbital factory replication; depends on ISRU maturity and automation advances'
			}
		],
		totalCost: 5125000000000,
		estimatedDuration: '50-100 years',
		dependencies: ['phase-1'],
		relatedResearch: ['megastructure', 'orbital mechanics', 'autonomous systems']
	},
	{
		id: 'phase-3a',
		number: 3,
		suffix: 'a',
		parallelWith: ['phase-3b'],
		title: 'Matrioshka Brain',
		description:
			'Transform the Dyson swarm into a nested megastructure of computational shells, where each layer harvests waste heat from inner layers to power additional computation. This phase creates a stellar-scale computational substrate approaching fundamental thermodynamic limits.',
		status: 'planned',
		objectives: [
			'Deploy computational substrate tiles across multiple thermal layers',
			'Establish inter-layer optical communication backbone',
			'Implement spectral-selective thermal management cascade',
			'Build self-replicating manufacturing foundries with ≥96% mass closure',
			'Deploy distributed computational operating system across light-hour scales',
			'Achieve initial operational capability at 10¹² compute tiles'
		],
		bom: [
			{
				id: 'bom-3a-1',
				name: 'Computational Substrate Tiles',
				description: 'Modular hexagonal tiles integrating TPV energy harvesting, compute substrate (reversible logic/neuromorphic/ASIC), local memory, and mesh networking. Three variants: Hot (800-1200K), Mid (200-400K), Cold (40-80K).',
				quantity: 1000000000000,
				unit: 'tiles',
				unitCost: 10000,
				totalCost: 10000000000000000,
				category: 'Computing',
				slug: 'computational-substrate-tiles',
				costMin: 1000000000000000,
				costMax: 100000000000000000,
				costConfidence: 'low',
				costBasis: 'Scale-up and in-space semiconductor fabrication are primary cost drivers. Consensus range $10¹²-$10¹⁴.'
			},
			{
				id: 'bom-3a-2',
				name: 'Inter-Layer Optical Communication Backbone',
				description: 'Hierarchical free-space optical network with WDM/OAM multiplexed laser links, adaptive optics, onboard routing, and integrated time/frequency authority constellation.',
				quantity: 1000000000,
				unit: 'relay nodes',
				unitCost: 10000,
				totalCost: 10000000000000,
				category: 'Communications',
				slug: 'inter-layer-optical-backbone',
				costMin: 100000000000,
				costMax: 10000000000000,
				costConfidence: 'medium',
				costBasis: 'Most mature technology in Phase 3 BOM. Consensus range $10¹¹-$10¹³.'
			},
			{
				id: 'bom-3a-3',
				name: 'Thermal Management and Radiator Systems',
				description: 'Dual-regime thermal management: passive spectral-selective radiator panels with metamaterial coatings for narrow-band emission, plus active cryogenic cooling systems for outer layers (<10K).',
				quantity: 100000000000000,
				unit: 'm² radiator area',
				unitCost: 100,
				totalCost: 10000000000000000,
				category: 'Power Systems',
				slug: 'thermal-management-radiator-systems',
				costMin: 1000000000000,
				costMax: 1000000000000000,
				costConfidence: 'low',
				costBasis: 'Thermodynamic cascade efficiency is critical. Consensus range $10¹²-$10¹⁵.'
			},
			{
				id: 'bom-3a-4',
				name: 'Self-Replicating Manufacturing Foundries',
				description: 'Autonomous factory complexes processing asteroid/KBO feedstock into finished components with 12-month replication cycle and ≥96% mass closure from in-situ resources.',
				quantity: 1000,
				unit: 'seed foundries',
				unitCost: 100000000000,
				totalCost: 100000000000000,
				category: 'Infrastructure',
				slug: 'self-replicating-manufacturing-foundries',
				costMin: 10000000000000,
				costMax: 1000000000000000,
				costConfidence: 'low',
				costBasis: 'Critical-path industrial capability. Highest uncertainty due to space semiconductor fabrication. Consensus range $10¹³-$10¹⁵.'
			},
			{
				id: 'bom-3a-5',
				name: 'Distributed Computational Operating System',
				description: 'Hierarchical, self-organizing software fabric managing resource allocation, task scheduling, data routing, and fault tolerance across all layers with causal consistency over light-hours of delay.',
				quantity: 1,
				unit: 'system',
				unitCost: 500000000000,
				totalCost: 500000000000,
				category: 'Computing',
				slug: 'distributed-computational-os',
				costMin: 100000000000,
				costMax: 1000000000000,
				costConfidence: 'low',
				costBasis: 'No precedent exists for software systems at this scale. ~10⁶ engineer-years development. Consensus range $10¹¹-$10¹².'
			},
			{
				id: 'bom-3a-6',
				name: 'Feedstock Supply Chain and Logistics Pipeline',
				description: 'Continuous-flow material supply from asteroid belt and Kuiper Belt to foundries. Mining ships, mass drivers, and catcher tugs sustaining ~10⁹ tonnes/year throughput.',
				quantity: 10000,
				unit: 'mining ships',
				unitCost: 5000000000,
				totalCost: 50000000000000,
				category: 'Infrastructure',
				slug: 'feedstock-supply-chain-pipeline',
				costMin: 10000000000000,
				costMax: 100000000000000,
				costConfidence: 'medium',
				costBasis: 'Scaled-up version of Phase 1-2 infrastructure with well-understood physics. Consensus range $10¹³-$10¹⁴.'
			},
			{
				id: 'bom-3a-7',
				name: 'Inter-Layer Power Distribution Network',
				description: 'Two-mode power architecture: short-range HVDC within layers, long-range optical power beaming between layers and to manufacturing nodes/cold-layer platforms.',
				quantity: 100000000000,
				unit: 'power interface units',
				unitCost: 100,
				totalCost: 10000000000000,
				category: 'Power Systems',
				slug: 'inter-layer-power-distribution-network',
				costMin: 1000000000000,
				costMax: 100000000000000,
				costConfidence: 'medium',
				costBasis: 'Essential for outer-layer viability where solar flux is insufficient. Consensus range $10¹²-$10¹⁴.'
			},
			{
				id: 'bom-3a-8',
				name: 'Shell Construction and Maintenance Swarm',
				description: 'Evolved Phase 2 robotics: heavy assemblers for membrane/tile deployment, membrane-handling specialists, and ORU swap drones for continuous repair and module replacement.',
				quantity: 100000000,
				unit: 'robots',
				unitCost: 10000,
				totalCost: 1000000000000,
				category: 'Robotics',
				slug: 'shell-construction-maintenance-swarm',
				costMin: 100000000000,
				costMax: 10000000000000,
				costConfidence: 'medium',
				costBasis: 'Distinct from manufacturing foundries. Deploys and maintains what foundries produce. Consensus range $10¹¹-$10¹³.'
			}
		],
		totalCost: 10171500000000000,
		estimatedDuration: '200-1000 years',
		dependencies: ['phase-2'],
		relatedResearch: ['matrioshka brain', 'thermophotovoltaics', 'reversible computing', 'distributed systems', 'self-replicating machines']
	},
	{
		id: 'phase-3b',
		number: 3,
		suffix: 'b',
		parallelWith: ['phase-3a'],
		title: 'Stellar Engine',
		description:
			'Construct stellar propulsion systems to enable controlled movement of the Sun and Solar System. Combines passive Shkadov mirror arrays for baseline thrust with active Caplan engine systems using thermonuclear jets powered by extracted solar material, achieving accelerations up to 10⁻⁹ m/s².',
		status: 'planned',
		objectives: [
			'Deploy Shkadov mirror arrays for passive radiation pressure thrust',
			'Establish solar wind collection infrastructure across the Dyson swarm',
			'Implement mass lifting systems to extract material from the solar chromosphere',
			'Construct helium separation and fuel processing plants',
			'Build electromagnetic accelerators for hydrogen return and helium jet propulsion',
			'Integrate stellar engine control systems with Dyson swarm infrastructure',
			'Achieve initial operational capability with measurable stellar acceleration'
		],
		bom: [
			{
				id: 'bom-3b-1',
				name: 'Shkadov Mirror Array',
				description: 'Parabolic reflector arrays positioned to create asymmetric radiation pressure on the Sun. Thin-film construction (~1 g/m²) maintained at L1-like equilibrium by balancing gravity and radiation pressure.',
				quantity: 1000000000000,
				unit: 'm² reflective area',
				unitCost: 10,
				totalCost: 10000000000000,
				category: 'Infrastructure',
				slug: 'shkadov-mirror-array',
				costMin: 1000000000000,
				costMax: 100000000000000,
				costConfidence: 'low',
				costBasis: 'Scaled from Phase 2 thin-film production. Primary uncertainty is AU-scale structural stability.'
			},
			{
				id: 'bom-3b-2',
				name: 'Thermonuclear Jet Engine',
				description: 'Active thruster system burning helium-4 in fusion reactions to produce directed exhaust at ~0.01c. Provides 1000x greater acceleration than passive Shkadov approach.',
				quantity: 100,
				unit: 'engine units',
				unitCost: 100000000000,
				totalCost: 10000000000000,
				category: 'Infrastructure',
				slug: 'thermonuclear-jet-engine',
				costMin: 1000000000000,
				costMax: 100000000000000,
				costConfidence: 'low',
				costBasis: 'Novel fusion propulsion at stellar scale. No heritage systems for comparison.'
			},
			{
				id: 'bom-3b-3',
				name: 'Solar Wind Collectors',
				description: 'Distributed collection infrastructure intercepting naturally escaping solar wind material. Magnetic funneling systems concentrate plasma for processing.',
				quantity: 10000000,
				unit: 'collector stations',
				unitCost: 1000000,
				totalCost: 10000000000000,
				category: 'Infrastructure',
				slug: 'solar-wind-collectors',
				costMin: 1000000000000,
				costMax: 50000000000000,
				costConfidence: 'low',
				costBasis: 'Extension of Dyson swarm infrastructure with magnetic plasma handling.'
			},
			{
				id: 'bom-3b-4',
				name: 'Mass Lifting Systems',
				description: 'Active extraction of material from the solar chromosphere using concentrated energy beaming and magnetic channeling. Target extraction rate ~10¹² kg/s.',
				quantity: 1000,
				unit: 'lifting stations',
				unitCost: 50000000000,
				totalCost: 50000000000000,
				category: 'Infrastructure',
				slug: 'mass-lifting-systems',
				costMin: 10000000000000,
				costMax: 200000000000000,
				costConfidence: 'low',
				costBasis: 'Most speculative system. Requires managing solar surface disruption.'
			},
			{
				id: 'bom-3b-5',
				name: 'Helium Separation Plant',
				description: 'Industrial-scale isotope separation facilities processing collected solar material to extract He-4 fuel for thermonuclear jets. Hydrogen byproduct returned to Sun.',
				quantity: 500,
				unit: 'processing plants',
				unitCost: 20000000000,
				totalCost: 10000000000000,
				category: 'Infrastructure',
				slug: 'helium-separation-plant',
				costMin: 2000000000000,
				costMax: 50000000000000,
				costConfidence: 'low',
				costBasis: 'Scaled from terrestrial isotope separation with space operation multiplier.'
			},
			{
				id: 'bom-3b-6',
				name: 'Electromagnetic Accelerators',
				description: 'High-power EM accelerator arrays for two functions: returning hydrogen to the Sun for orbital stability, and accelerating helium exhaust for jet propulsion.',
				quantity: 10000,
				unit: 'accelerator units',
				unitCost: 1000000000,
				totalCost: 10000000000000,
				category: 'Infrastructure',
				slug: 'em-accelerators',
				costMin: 2000000000000,
				costMax: 50000000000000,
				costConfidence: 'medium',
				costBasis: 'Extension of Phase 1 mass driver technology to higher power levels.'
			},
			{
				id: 'bom-3b-7',
				name: 'Dyson Integration Layer',
				description: 'Control systems and power routing infrastructure connecting stellar engine components with the Dyson swarm. Coordinates power allocation between energy collection and engine operation.',
				quantity: 1,
				unit: 'system',
				unitCost: 5000000000000,
				totalCost: 5000000000000,
				category: 'Computing',
				slug: 'dyson-integration-layer',
				costMin: 1000000000000,
				costMax: 20000000000000,
				costConfidence: 'medium',
				costBasis: 'Software and infrastructure integration. Builds on Phase 2 swarm control.'
			},
			{
				id: 'bom-3b-8',
				name: 'Thrust Stabilization Systems',
				description: 'Precision thrust vectoring and orbital stability systems ensuring controlled stellar acceleration without destabilizing planetary orbits or solar activity.',
				quantity: 10000,
				unit: 'stabilization nodes',
				unitCost: 500000000,
				totalCost: 5000000000000,
				category: 'Computing',
				slug: 'thrust-stabilization',
				costMin: 1000000000000,
				costMax: 20000000000000,
				costConfidence: 'medium',
				costBasis: 'Control systems with century-scale feedback loops. Novel but well-defined problem.'
			}
		],
		totalCost: 110000000000000,
		estimatedDuration: '200-500 years',
		dependencies: ['phase-2'],
		relatedResearch: ['stellar engines', 'shkadov thruster', 'caplan engine', 'mass lifting', 'fusion propulsion']
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
