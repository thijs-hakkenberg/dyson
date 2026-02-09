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
			},
			{
				id: 'bom-0-7',
				name: 'Organizational Infrastructure',
				description: 'Legal, governance, and coordination infrastructure for multi-century project execution. Includes legal entity establishment, succession mechanisms, global coordination systems, conflict resolution frameworks, and governance tooling.',
				quantity: 1,
				unit: 'organization',
				unitCost: 50000000,
				totalCost: 50000000,
				category: 'Governance',
				slug: 'organizational-infrastructure',
				costMin: 20000000,
				costMax: 100000000,
				costConfidence: 'low',
				costBasis: 'Legal setup, coordination systems, governance tooling, and succession mechanisms for multi-century operations'
			}
		],
		totalCost: 15710000000,
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
			'Scale up satellite production and deployment to achieve grid-significant power delivery (~1 TW to Earth). CAPACITY COST MODEL: Self-replicating ISRU foundries produce 100,000 units; cost represents seed investment, bootstrap operations, and "vitamin" imports rather than unit-count multiplication.',
		status: 'planned',
		objectives: [
			'Achieve self-sustaining production capacity via self-replicating foundries',
			'Deploy 100,000+ collector satellites (ISRU-manufactured)',
			'Reach Tier 1 threshold: 100 GW delivered to Earth (political sustainability milestone)',
			'Reach Tier 2 threshold: 1 TW delivered to Earth (grid significance, irreversibility)',
			'Deploy ~1,000 ground receiver stations',
			'Establish redundant power transmission grid with 15-30% end-to-end efficiency',
			'Develop autonomous maintenance systems'
		],
		bom: [
			{
				id: 'bom-2-1',
				name: 'Solar Collector Satellites',
				description: 'ISRU-manufactured swarm elements using Reference architecture (50,000 m², 0.7 AU, 35% efficiency). Cost represents seed foundries + bootstrap + vitamin imports, not unit-count multiplication. At 100k units: ~9.5 TW gross generation, ~1 TW delivered to Earth.',
				quantity: 100000,
				unit: 'units',
				unitCost: 2000000,
				totalCost: 200000000000,
				category: 'Spacecraft',
				slug: 'collector-satellites',
				costMin: 120000000000,
				costMax: 350000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Seed foundry investment + bootstrap operations + import stream for non-ISRU components + swarm governance software. Marginal cost per unit approaches control system overhead only.',
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
				id: 'bom-2-2',
				name: 'Maintenance Drones',
				description: 'ISRU-manufactured autonomous repair robots. Cost represents seed drone fleet + depot infrastructure + coordination software. ~400 depots at 150,000-200,000 km spacing. Fleet: ~20,000 inspectors + ~2,000 servicers. <7 day MTTR',
				quantity: 5000,
				unit: 'units',
				unitCost: 5000000,
				totalCost: 25000000000,
				category: 'Robotics',
				slug: 'maintenance-drones',
				costMin: 15000000000,
				costMax: 40000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Seed drone fleet + depot infrastructure + autonomous coordination software. Production drones are ISRU-manufactured after initial seed deployment.'
			},
			{
				id: 'bom-2-3',
				name: 'Additional Manufacturing Capacity',
				description: 'Self-replicating orbital factories—PRIMARY COST DRIVER for Phase 2. Cost represents seed foundry development, first-generation validation, and quality assurance. 12-month replication cycle produces all subsequent capacity.',
				quantity: 5,
				unit: 'self-replicating facilities',
				unitCost: 30000000000,
				totalCost: 150000000000,
				category: 'Infrastructure',
				slug: 'manufacturing-expansion',
				costMin: 100000000000,
				costMax: 250000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: PRIMARY COST DRIVER. Seed foundry development + first-generation replication validation + quality assurance systems. Self-replicating foundries with 12-month cycle produce all subsequent capacity.'
			}
		],
		totalCost: 375000000000,
		estimatedDuration: '50-100 years',
		dependencies: ['phase-1'],
		relatedResearch: ['megastructure', 'orbital mechanics', 'autonomous systems', 'self-replicating systems']
	},
	{
		id: 'phase-3a',
		number: 3,
		suffix: 'a',
		parallelWith: ['phase-3b'],
		title: 'Matrioshka Brain',
		description:
			'Transform the Dyson swarm into a nested megastructure of computational shells. CAPACITY COST MODEL: ~1,350x reduction from linear methodology reflects self-replicating ISRU economics. Cost represents seed investment, R&D, "vitamin" imports, and governance software.',
		status: 'planned',
		objectives: [
			'Deploy computational substrate tiles across multiple thermal layers (ISRU-manufactured)',
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
				description: 'ISRU-manufactured modular hexagonal tiles. Cost represents R&D + semiconductor "vitamin" imports (rad-hard processors, precision optics, specific dopants) + quality assurance. Three variants: Hot (800-1200K), Mid (200-400K), Cold (40-80K).',
				quantity: 1000000000000,
				unit: 'tiles',
				unitCost: 1.5,
				totalCost: 1500000000000,
				category: 'Computing',
				slug: 'computational-substrate-tiles',
				costMin: 800000000000,
				costMax: 3000000000000,
				costConfidence: 'low',
				costBasis: 'CAPACITY MODEL: Tile architecture R&D + semiconductor vitamin imports + quality assurance. Tile production is ISRU-based; cost represents Earth-sourced components that cannot be manufactured from asteroid feedstock.'
			},
			{
				id: 'bom-3a-2',
				name: 'Inter-Layer Optical Communication Backbone',
				description: 'ISRU-manufactured relay network. Cost represents seed network + laser source imports + orchestration software. Most mature technology in Phase 3a.',
				quantity: 1000000000,
				unit: 'relay nodes',
				unitCost: 0.4,
				totalCost: 400000000000,
				category: 'Communications',
				slug: 'inter-layer-optical-backbone',
				costMin: 200000000000,
				costMax: 800000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Seed relay network + laser source imports + network orchestration software. Relay node production scales via ISRU after seed deployment.'
			},
			{
				id: 'bom-3a-3',
				name: 'Thermal Management and Radiator Systems',
				description: 'ISRU-manufactured radiator panels with metamaterial coatings. Cost represents coating R&D + cryogenic seed units + thermal control software. Radiators are structurally simple and fully ISRU-producible.',
				quantity: 100000000000000,
				unit: 'm² radiator area',
				unitCost: 0.000008,
				totalCost: 800000000000,
				category: 'Power Systems',
				slug: 'thermal-management-radiator-systems',
				costMin: 400000000000,
				costMax: 1500000000000,
				costConfidence: 'low',
				costBasis: 'CAPACITY MODEL: Spectral-selective coating R&D + cryogenic system seed units + thermal control software. Radiator panels are structurally simple and fully ISRU-producible.'
			},
			{
				id: 'bom-3a-4',
				name: 'Self-Replicating Manufacturing Foundries',
				description: 'PRIMARY COST DRIVER. Seed foundry development + first-generation validation + closure ratio optimization + multi-generational QA. 12-month replication cycle with ≥96% mass closure enables all other Phase 3a production.',
				quantity: 1000,
				unit: 'seed foundries',
				unitCost: 2000000000,
				totalCost: 2000000000000,
				category: 'Infrastructure',
				slug: 'self-replicating-manufacturing-foundries',
				costMin: 1000000000000,
				costMax: 4000000000000,
				costConfidence: 'low',
				costBasis: 'CAPACITY MODEL: PRIMARY COST DRIVER. Seed foundry development + first-generation validation + closure ratio optimization + multi-generational quality assurance. This investment enables all other Phase 3a production.'
			},
			{
				id: 'bom-3a-5',
				name: 'Distributed Computational Operating System',
				description: 'Most complex software ever built. Light-hour scale consensus protocols, replication fidelity management, anomaly detection, and resource allocation. No precedent exists.',
				quantity: 1,
				unit: 'system',
				unitCost: 500000000000,
				totalCost: 500000000000,
				category: 'Computing',
				slug: 'distributed-computational-os',
				costMin: 300000000000,
				costMax: 800000000000,
				costConfidence: 'low',
				costBasis: 'CAPACITY MODEL: Most complex software ever built. Light-hour scale consensus protocols + replication fidelity management + anomaly detection + resource allocation. Estimate based on scaling from largest current distributed systems.'
			},
			{
				id: 'bom-3a-6',
				name: 'Feedstock Supply Chain and Logistics Pipeline',
				description: 'Scaled Phase 2 infrastructure. Cost represents seed mining fleet + mass driver network expansion + logistics software. Well-understood physics; ISRU production takes over after seed deployment.',
				quantity: 10000,
				unit: 'mining ships',
				unitCost: 100000000,
				totalCost: 1000000000000,
				category: 'Infrastructure',
				slug: 'feedstock-supply-chain-pipeline',
				costMin: 600000000000,
				costMax: 1800000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Scaled Phase 2 infrastructure. Seed mining fleet + mass driver network expansion + logistics coordination software. Well-understood physics; cost is primarily initial seed deployment.'
			},
			{
				id: 'bom-3a-7',
				name: 'Inter-Layer Power Distribution Network',
				description: 'ISRU-manufactured power interface units. Cost represents HVDC seed infrastructure + optical power beaming development + power routing software.',
				quantity: 100000000000,
				unit: 'power interface units',
				unitCost: 0.008,
				totalCost: 800000000000,
				category: 'Power Systems',
				slug: 'inter-layer-power-distribution-network',
				costMin: 400000000000,
				costMax: 1500000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: HVDC seed infrastructure + optical power beaming development + power routing software. Power interface units are ISRU-producible after seed network established.',
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
				id: 'bom-3a-8',
				name: 'Shell Construction and Maintenance Swarm',
				description: 'ISRU-manufactured evolved Phase 2 robotics. Cost represents seed swarm development + specialized tooling + swarm coordination software.',
				quantity: 100000000,
				unit: 'robots',
				unitCost: 5,
				totalCost: 500000000000,
				category: 'Robotics',
				slug: 'shell-construction-maintenance-swarm',
				costMin: 250000000000,
				costMax: 1000000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Evolved Phase 2 robotics. Seed swarm development + specialized tooling + swarm coordination software. Robot production is fully ISRU-based after seed deployment.'
			}
		],
		totalCost: 7500000000000,
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
			'Construct stellar propulsion systems to enable controlled movement of the Sun and Solar System. CAPACITY COST MODEL: ~73x reduction from linear methodology reflects ISRU economics and shared Phase 2/3a infrastructure. Cost represents R&D, seed deployment, and "vitamin" imports.',
		status: 'planned',
		objectives: [
			'Deploy Shkadov mirror arrays for passive radiation pressure thrust (ISRU-manufactured)',
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
				description: 'ISRU-manufactured parabolic reflector arrays. Cost represents seed mirror segments + AU-scale structural engineering + station-keeping propulsion. Mirror material is fully ISRU-producible.',
				quantity: 1000000000000,
				unit: 'm² reflective area',
				unitCost: 0.00015,
				totalCost: 150000000000,
				category: 'Infrastructure',
				slug: 'shkadov-mirror-array',
				costMin: 80000000000,
				costMax: 300000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Extension of Phase 2 thin-film production. Seed mirror segments + AU-scale structural engineering + station-keeping propulsion. Mirror material is fully ISRU-producible.'
			},
			{
				id: 'bom-3b-2',
				name: 'Thermonuclear Jet Engine',
				description: 'PRIMARY R&D COST. Fusion ignition R&D + stellar-scale engine development + fuel cycle integration. Novel fusion propulsion with no heritage; highest uncertainty item in Phase 3b.',
				quantity: 100,
				unit: 'engine units',
				unitCost: 4000000000,
				totalCost: 400000000000,
				category: 'Infrastructure',
				slug: 'thermonuclear-jet-engine',
				costMin: 200000000000,
				costMax: 800000000000,
				costConfidence: 'low',
				costBasis: 'CAPACITY MODEL: PRIMARY R&D COST. Fusion ignition R&D + stellar-scale engine development + fuel cycle integration. Novel fusion propulsion with no heritage.'
			},
			{
				id: 'bom-3b-3',
				name: 'Solar Wind Collectors',
				description: 'ISRU-manufactured collector stations. Cost represents magnetic plasma handling R&D + seed collector network + collection coordination software. Extension of Dyson swarm.',
				quantity: 10000000,
				unit: 'collector stations',
				unitCost: 10,
				totalCost: 100000000000,
				category: 'Infrastructure',
				slug: 'solar-wind-collectors',
				costMin: 50000000000,
				costMax: 200000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Magnetic plasma handling R&D + seed collector network + collection coordination software. Extension of Dyson swarm; collector production is ISRU-based.'
			},
			{
				id: 'bom-3b-4',
				name: 'Mass Lifting Systems',
				description: 'Most speculative system. Cost represents solar surface interaction R&D + magnetic channeling development + lifting station seed deployment. High R&D uncertainty.',
				quantity: 1000,
				unit: 'lifting stations',
				unitCost: 300000000,
				totalCost: 300000000000,
				category: 'Infrastructure',
				slug: 'mass-lifting-systems',
				costMin: 150000000000,
				costMax: 600000000000,
				costConfidence: 'low',
				costBasis: 'CAPACITY MODEL: Most speculative system. Solar surface interaction R&D + magnetic channeling development + lifting station seed deployment. Requires managing solar chromosphere dynamics.'
			},
			{
				id: 'bom-3b-5',
				name: 'Helium Separation Plant',
				description: 'ISRU-manufactured processing plants. Cost represents isotope separation R&D adaptation + seed processing plants + fuel storage and handling. Well-understood terrestrial physics.',
				quantity: 500,
				unit: 'processing plants',
				unitCost: 300000000,
				totalCost: 150000000000,
				category: 'Infrastructure',
				slug: 'helium-separation-plant',
				costMin: 80000000000,
				costMax: 300000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Isotope separation R&D adaptation + seed processing plants + fuel storage and handling. Well-understood terrestrial physics adapted for space; plant production is ISRU-based.'
			},
			{
				id: 'bom-3b-6',
				name: 'Electromagnetic Accelerators',
				description: 'ISRU-manufactured accelerator units. Cost represents high-power scaling R&D + seed accelerator network + propellant handling systems. Most mature technology in Phase 3b.',
				quantity: 10000,
				unit: 'accelerator units',
				unitCost: 15000000,
				totalCost: 150000000000,
				category: 'Infrastructure',
				slug: 'em-accelerators',
				costMin: 80000000000,
				costMax: 300000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Extension of Phase 1-2 mass driver technology. High-power scaling R&D + seed accelerator network + propellant handling systems. Most mature technology in Phase 3b.'
			},
			{
				id: 'bom-3b-7',
				name: 'Dyson Integration Layer',
				description: 'Software and infrastructure integration. Cost represents power allocation algorithms + engine-swarm coordination + thrust vector management. Builds on Phase 2/3a distributed systems.',
				quantity: 1,
				unit: 'system',
				unitCost: 100000000000,
				totalCost: 100000000000,
				category: 'Computing',
				slug: 'dyson-integration-layer',
				costMin: 50000000000,
				costMax: 200000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Software and infrastructure integration. Power allocation algorithms + engine-swarm coordination + thrust vector management. Builds on Phase 2/3a distributed systems.'
			},
			{
				id: 'bom-3b-8',
				name: 'Thrust Stabilization Systems',
				description: 'Century-scale control systems. Cost represents planetary orbit stability modeling + feedback control algorithms + stabilization node seed deployment. Novel timescale but well-defined problem.',
				quantity: 10000,
				unit: 'stabilization nodes',
				unitCost: 15000000,
				totalCost: 150000000000,
				category: 'Computing',
				slug: 'thrust-stabilization',
				costMin: 80000000000,
				costMax: 300000000000,
				costConfidence: 'medium',
				costBasis: 'CAPACITY MODEL: Century-scale control systems. Planetary orbit stability modeling + feedback control algorithms + stabilization node seed deployment. Novel timescale but well-defined control theory.'
			}
		],
		totalCost: 1500000000000,
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
 * Phase 1 Timeline/DAG data
 */
export const PHASE_1_TIMELINE: PhaseDependencyGraph = {
	phaseId: 'phase-1',
	criticalPathDuration: 300,
	nodes: [
		{
			id: 'collector-design',
			name: 'Collector Unit Design',
			type: 'activity',
			startMonth: 0,
			endMonth: 36,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-1/bom/collector-units'
		},
		{
			id: 'pv-blanket-dev',
			name: 'PV Blanket Development',
			type: 'activity',
			startMonth: 0,
			endMonth: 48,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-1/bom/pv-blanket-arrays'
		},
		{
			id: 'prototype-collector',
			name: 'Prototype Collector Test',
			type: 'milestone',
			startMonth: 36,
			endMonth: 48,
			dependencies: ['collector-design', 'pv-blanket-dev'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-1/bom/collector-units'
		},
		{
			id: 'assembly-node-design',
			name: 'Assembly Node Design',
			type: 'activity',
			startMonth: 12,
			endMonth: 48,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-1/bom/assembly-node'
		},
		{
			id: 'robot-dev',
			name: 'Assembly Robot Development',
			type: 'activity',
			startMonth: 12,
			endMonth: 60,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-1/bom/assembly-robots'
		},
		{
			id: 'assembly-node-deploy',
			name: 'Assembly Node Launch',
			type: 'milestone',
			startMonth: 48,
			endMonth: 72,
			dependencies: ['assembly-node-design'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-1/bom/assembly-node'
		},
		{
			id: 'mass-driver-design',
			name: 'Mass Driver Design',
			type: 'activity',
			startMonth: 0,
			endMonth: 60,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-1/bom/mass-drivers'
		},
		{
			id: 'mass-driver-deploy',
			name: 'Lunar Mass Driver Install',
			type: 'milestone',
			startMonth: 60,
			endMonth: 96,
			dependencies: ['mass-driver-design'],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-1/bom/mass-drivers'
		},
		{
			id: 'tug-dev',
			name: 'Orbital Tug Development',
			type: 'activity',
			startMonth: 24,
			endMonth: 60,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-1/bom/orbital-tugs'
		},
		{
			id: 'tug-fleet-deploy',
			name: 'Tug Fleet Operational',
			type: 'milestone',
			startMonth: 60,
			endMonth: 84,
			dependencies: ['tug-dev'],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-1/bom/orbital-tugs'
		},
		{
			id: 'control-system-dev',
			name: 'Swarm Control System Dev',
			type: 'activity',
			startMonth: 36,
			endMonth: 84,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-1/bom/swarm-control-system'
		},
		{
			id: 'isru-decision',
			name: 'ISRU Transition Decision',
			type: 'decision',
			startMonth: 120,
			endMonth: 132,
			dependencies: ['assembly-node-deploy', 'mass-driver-deploy'],
			status: 'pending',
			criticalPath: true
		},
		{
			id: 'batch-production',
			name: 'Batch Production Start',
			type: 'milestone',
			startMonth: 96,
			endMonth: 108,
			dependencies: ['assembly-node-deploy', 'robot-dev', 'control-system-dev'],
			status: 'pending',
			criticalPath: true
		},
		{
			id: 'initial-swarm',
			name: 'Initial Swarm (100 units)',
			type: 'milestone',
			startMonth: 144,
			endMonth: 156,
			dependencies: ['batch-production'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-1/bom/collector-units'
		},
		{
			id: 'power-transmission-test',
			name: 'Power Transmission Test',
			type: 'milestone',
			startMonth: 156,
			endMonth: 180,
			dependencies: ['initial-swarm'],
			status: 'pending',
			criticalPath: true
		},
		{
			id: 'full-swarm-deploy',
			name: 'Full Swarm (1,000 units)',
			type: 'milestone',
			startMonth: 240,
			endMonth: 300,
			dependencies: ['initial-swarm', 'isru-decision'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-1/bom/collector-units'
		}
	]
};

/**
 * Phase 2 Timeline/DAG data
 */
export const PHASE_2_TIMELINE: PhaseDependencyGraph = {
	phaseId: 'phase-2',
	criticalPathDuration: 600,
	nodes: [
		{
			id: 'manufacturing-expansion-design',
			name: 'Manufacturing Expansion Design',
			type: 'activity',
			startMonth: 0,
			endMonth: 48,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-2/bom/manufacturing-expansion'
		},
		{
			id: 'factory-2-deploy',
			name: 'Factory 2 Deployment',
			type: 'milestone',
			startMonth: 48,
			endMonth: 84,
			dependencies: ['manufacturing-expansion-design'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-2/bom/manufacturing-expansion'
		},
		{
			id: 'maintenance-drone-dev',
			name: 'Maintenance Drone Development',
			type: 'activity',
			startMonth: 0,
			endMonth: 60,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-2/bom/maintenance-drones'
		},
		{
			id: 'depot-network-design',
			name: 'Depot Network Design',
			type: 'activity',
			startMonth: 24,
			endMonth: 72,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-2/bom/maintenance-drones'
		},
		{
			id: 'drone-fleet-initial',
			name: 'Initial Drone Fleet Deploy',
			type: 'milestone',
			startMonth: 72,
			endMonth: 96,
			dependencies: ['maintenance-drone-dev', 'depot-network-design'],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-2/bom/maintenance-drones'
		},
		{
			id: 'collector-scaleup',
			name: 'Collector Production Scaleup',
			type: 'activity',
			startMonth: 84,
			endMonth: 180,
			dependencies: ['factory-2-deploy'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-2/bom/collector-satellites'
		},
		{
			id: 'tier-1-milestone',
			name: 'Tier 1: 10k Units (100 GW)',
			type: 'milestone',
			startMonth: 180,
			endMonth: 192,
			dependencies: ['collector-scaleup'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-2/bom/collector-satellites'
		},
		{
			id: 'ground-receiver-network',
			name: 'Ground Receiver Network',
			type: 'activity',
			startMonth: 120,
			endMonth: 300,
			dependencies: [],
			status: 'pending',
			criticalPath: false
		},
		{
			id: 'factory-3-4-deploy',
			name: 'Factories 3-4 Deployment',
			type: 'milestone',
			startMonth: 180,
			endMonth: 240,
			dependencies: ['tier-1-milestone'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-2/bom/manufacturing-expansion'
		},
		{
			id: 'exponential-growth',
			name: 'Exponential Production Phase',
			type: 'activity',
			startMonth: 240,
			endMonth: 480,
			dependencies: ['factory-3-4-deploy'],
			status: 'pending',
			criticalPath: true
		},
		{
			id: 'tier-2-milestone',
			name: 'Tier 2: 100k Units (1 TW)',
			type: 'milestone',
			startMonth: 480,
			endMonth: 540,
			dependencies: ['exponential-growth', 'ground-receiver-network'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-2/bom/collector-satellites'
		},
		{
			id: 'full-depot-network',
			name: 'Full Depot Network (400 depots)',
			type: 'milestone',
			startMonth: 360,
			endMonth: 420,
			dependencies: ['drone-fleet-initial'],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-2/bom/maintenance-drones'
		},
		{
			id: 'phase-2-complete',
			name: 'Phase 2 Complete',
			type: 'milestone',
			startMonth: 540,
			endMonth: 600,
			dependencies: ['tier-2-milestone', 'full-depot-network'],
			status: 'pending',
			criticalPath: true
		}
	]
};

/**
 * Phase 3a Timeline/DAG data (Matrioshka Brain)
 */
export const PHASE_3A_TIMELINE: PhaseDependencyGraph = {
	phaseId: 'phase-3a',
	criticalPathDuration: 2400,
	nodes: [
		{
			id: 'tpv-dev',
			name: 'TPV Converter Development',
			type: 'activity',
			startMonth: 0,
			endMonth: 120,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3a/bom/computational-substrate-tiles'
		},
		{
			id: 'tile-architecture',
			name: 'Compute Tile Architecture',
			type: 'activity',
			startMonth: 0,
			endMonth: 96,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3a/bom/computational-substrate-tiles'
		},
		{
			id: 'foundry-design',
			name: 'Self-Replicating Foundry Design',
			type: 'activity',
			startMonth: 0,
			endMonth: 180,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3a/bom/self-replicating-manufacturing-foundries'
		},
		{
			id: 'optical-backbone-design',
			name: 'Optical Backbone Design',
			type: 'activity',
			startMonth: 60,
			endMonth: 144,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3a/bom/inter-layer-optical-backbone'
		},
		{
			id: 'distributed-os-dev',
			name: 'Distributed OS Development',
			type: 'activity',
			startMonth: 0,
			endMonth: 240,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3a/bom/distributed-computational-os'
		},
		{
			id: 'seed-foundry-deploy',
			name: 'Seed Foundry Deployment',
			type: 'milestone',
			startMonth: 180,
			endMonth: 240,
			dependencies: ['foundry-design'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3a/bom/self-replicating-manufacturing-foundries'
		},
		{
			id: 'first-replication',
			name: 'First Foundry Replication',
			type: 'milestone',
			startMonth: 240,
			endMonth: 252,
			dependencies: ['seed-foundry-deploy'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3a/bom/self-replicating-manufacturing-foundries'
		},
		{
			id: 'hot-layer-prototype',
			name: 'Hot Layer Prototype',
			type: 'milestone',
			startMonth: 180,
			endMonth: 240,
			dependencies: ['tpv-dev', 'tile-architecture'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3a/bom/computational-substrate-tiles'
		},
		{
			id: 'thermal-cascade-test',
			name: 'Thermal Cascade Validation',
			type: 'decision',
			startMonth: 240,
			endMonth: 300,
			dependencies: ['hot-layer-prototype'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3a/bom/thermal-management-radiator-systems'
		},
		{
			id: 'foundry-expansion',
			name: 'Foundry Exponential Expansion',
			type: 'activity',
			startMonth: 252,
			endMonth: 600,
			dependencies: ['first-replication'],
			status: 'pending',
			criticalPath: true
		},
		{
			id: 'hot-layer-deploy',
			name: 'Hot Layer Deployment',
			type: 'activity',
			startMonth: 360,
			endMonth: 1200,
			dependencies: ['thermal-cascade-test', 'foundry-expansion'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3a/bom/computational-substrate-tiles'
		},
		{
			id: 'mid-layer-deploy',
			name: 'Mid Layer Deployment',
			type: 'activity',
			startMonth: 800,
			endMonth: 1800,
			dependencies: ['hot-layer-deploy'],
			status: 'pending',
			criticalPath: true
		},
		{
			id: 'cold-layer-deploy',
			name: 'Cold Layer Deployment',
			type: 'activity',
			startMonth: 1400,
			endMonth: 2400,
			dependencies: ['mid-layer-deploy'],
			status: 'pending',
			criticalPath: true
		},
		{
			id: 'initial-compute',
			name: 'Initial Compute Operational',
			type: 'milestone',
			startMonth: 600,
			endMonth: 660,
			dependencies: ['hot-layer-deploy', 'distributed-os-dev'],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3a/bom/distributed-computational-os'
		},
		{
			id: 'phase-3a-complete',
			name: 'Full Matrioshka Operational',
			type: 'milestone',
			startMonth: 2340,
			endMonth: 2400,
			dependencies: ['cold-layer-deploy'],
			status: 'pending',
			criticalPath: true
		}
	]
};

/**
 * Phase 3b Timeline/DAG data (Stellar Engine)
 */
export const PHASE_3B_TIMELINE: PhaseDependencyGraph = {
	phaseId: 'phase-3b',
	criticalPathDuration: 1800,
	nodes: [
		{
			id: 'shkadov-design',
			name: 'Shkadov Mirror Design',
			type: 'activity',
			startMonth: 0,
			endMonth: 120,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3b/bom/shkadov-mirror-array'
		},
		{
			id: 'standoff-trade-study',
			name: 'Standoff Distance Trade Study',
			type: 'decision',
			startMonth: 60,
			endMonth: 96,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3b/bom/shkadov-mirror-array'
		},
		{
			id: 'shkadov-prototype',
			name: 'Shkadov Prototype Deploy',
			type: 'milestone',
			startMonth: 120,
			endMonth: 180,
			dependencies: ['shkadov-design', 'standoff-trade-study'],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3b/bom/shkadov-mirror-array'
		},
		{
			id: 'mass-lifting-research',
			name: 'Mass Lifting R&D',
			type: 'activity',
			startMonth: 0,
			endMonth: 180,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3b/bom/mass-lifting-systems'
		},
		{
			id: 'solar-wind-collectors-design',
			name: 'Solar Wind Collector Design',
			type: 'activity',
			startMonth: 0,
			endMonth: 96,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3b/bom/solar-wind-collectors'
		},
		{
			id: 'fusion-engine-dev',
			name: 'Thermonuclear Engine Development',
			type: 'activity',
			startMonth: 0,
			endMonth: 240,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3b/bom/thermonuclear-jet-engine'
		},
		{
			id: 'helium-sep-design',
			name: 'Helium Separation Plant Design',
			type: 'activity',
			startMonth: 60,
			endMonth: 180,
			dependencies: [],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3b/bom/helium-separation-plant'
		},
		{
			id: 'em-accelerator-design',
			name: 'EM Accelerator Design',
			type: 'activity',
			startMonth: 60,
			endMonth: 144,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3b/bom/em-accelerators'
		},
		{
			id: 'mass-lifting-test',
			name: 'Mass Lifting Prototype Test',
			type: 'milestone',
			startMonth: 180,
			endMonth: 240,
			dependencies: ['mass-lifting-research'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3b/bom/mass-lifting-systems'
		},
		{
			id: 'fusion-ignition',
			name: 'Sustained Fusion Ignition',
			type: 'milestone',
			startMonth: 240,
			endMonth: 300,
			dependencies: ['fusion-engine-dev'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3b/bom/thermonuclear-jet-engine'
		},
		{
			id: 'fuel-cycle-integration',
			name: 'Fuel Cycle Integration',
			type: 'activity',
			startMonth: 300,
			endMonth: 480,
			dependencies: ['fusion-ignition', 'helium-sep-design', 'mass-lifting-test'],
			status: 'pending',
			criticalPath: true
		},
		{
			id: 'shkadov-array-deploy',
			name: 'Shkadov Array Deployment',
			type: 'activity',
			startMonth: 180,
			endMonth: 600,
			dependencies: ['shkadov-prototype'],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3b/bom/shkadov-mirror-array'
		},
		{
			id: 'first-measurable-thrust',
			name: 'First Measurable Thrust',
			type: 'milestone',
			startMonth: 600,
			endMonth: 660,
			dependencies: ['shkadov-array-deploy'],
			status: 'pending',
			criticalPath: false
		},
		{
			id: 'caplan-engine-assembly',
			name: 'Caplan Engine Assembly',
			type: 'activity',
			startMonth: 480,
			endMonth: 1200,
			dependencies: ['fuel-cycle-integration'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3b/bom/thermonuclear-jet-engine'
		},
		{
			id: 'thrust-stabilization-dev',
			name: 'Thrust Stabilization Development',
			type: 'activity',
			startMonth: 240,
			endMonth: 600,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3b/bom/thrust-stabilization'
		},
		{
			id: 'integration-layer-deploy',
			name: 'Dyson Integration Layer Deploy',
			type: 'activity',
			startMonth: 360,
			endMonth: 720,
			dependencies: [],
			status: 'pending',
			criticalPath: false,
			linkTo: '/plan/phase-3b/bom/dyson-integration-layer'
		},
		{
			id: 'caplan-engine-operational',
			name: 'Caplan Engine Operational',
			type: 'milestone',
			startMonth: 1200,
			endMonth: 1260,
			dependencies: ['caplan-engine-assembly', 'thrust-stabilization-dev', 'integration-layer-deploy'],
			status: 'pending',
			criticalPath: true,
			linkTo: '/plan/phase-3b/bom/thermonuclear-jet-engine'
		},
		{
			id: 'phase-3b-complete',
			name: 'Full Stellar Engine Operational',
			type: 'milestone',
			startMonth: 1740,
			endMonth: 1800,
			dependencies: ['caplan-engine-operational', 'shkadov-array-deploy'],
			status: 'pending',
			criticalPath: true
		}
	]
};

/**
 * Project-wide milestones for cross-phase view
 */
export interface ProjectMilestone {
	id: string;
	name: string;
	phase: string;
	targetYear: number;
	dependencies: string[];
	criticalPath: boolean;
}

export const PROJECT_MILESTONES: ProjectMilestone[] = [
	{
		id: 'p0-mining-ops',
		name: 'First Asteroid Mining',
		phase: 'phase-0',
		targetYear: 5,
		dependencies: [],
		criticalPath: true
	},
	{
		id: 'p0-station-ops',
		name: 'Processing Station Operational',
		phase: 'phase-0',
		targetYear: 7,
		dependencies: ['p0-mining-ops'],
		criticalPath: true
	},
	{
		id: 'p1-first-collector',
		name: 'First Collector Prototype',
		phase: 'phase-1',
		targetYear: 10,
		dependencies: ['p0-station-ops'],
		criticalPath: true
	},
	{
		id: 'p1-assembly-node',
		name: 'Assembly Node Operational',
		phase: 'phase-1',
		targetYear: 13,
		dependencies: ['p1-first-collector'],
		criticalPath: true
	},
	{
		id: 'p1-initial-swarm',
		name: 'Initial Swarm (100 units)',
		phase: 'phase-1',
		targetYear: 18,
		dependencies: ['p1-assembly-node'],
		criticalPath: true
	},
	{
		id: 'p1-full-swarm',
		name: 'Phase 1 Swarm Complete (1,000 units)',
		phase: 'phase-1',
		targetYear: 32,
		dependencies: ['p1-initial-swarm'],
		criticalPath: true
	},
	{
		id: 'p2-tier1',
		name: 'Tier 1: 100 GW Delivered',
		phase: 'phase-2',
		targetYear: 50,
		dependencies: ['p1-full-swarm'],
		criticalPath: true
	},
	{
		id: 'p2-tier2',
		name: 'Tier 2: 1 TW Delivered',
		phase: 'phase-2',
		targetYear: 80,
		dependencies: ['p2-tier1'],
		criticalPath: true
	},
	{
		id: 'p3a-foundry-replication',
		name: 'First Foundry Self-Replication',
		phase: 'phase-3a',
		targetYear: 100,
		dependencies: ['p2-tier2'],
		criticalPath: false
	},
	{
		id: 'p3a-hot-layer',
		name: 'Hot Layer Operational',
		phase: 'phase-3a',
		targetYear: 130,
		dependencies: ['p3a-foundry-replication'],
		criticalPath: false
	},
	{
		id: 'p3a-complete',
		name: 'Full Matrioshka Brain',
		phase: 'phase-3a',
		targetYear: 280,
		dependencies: ['p3a-hot-layer'],
		criticalPath: false
	},
	{
		id: 'p3b-shkadov-thrust',
		name: 'First Measurable Shkadov Thrust',
		phase: 'phase-3b',
		targetYear: 130,
		dependencies: ['p2-tier2'],
		criticalPath: false
	},
	{
		id: 'p3b-caplan-operational',
		name: 'Caplan Engine Operational',
		phase: 'phase-3b',
		targetYear: 180,
		dependencies: ['p3b-shkadov-thrust'],
		criticalPath: false
	},
	{
		id: 'p3b-complete',
		name: 'Full Stellar Engine Operational',
		phase: 'phase-3b',
		targetYear: 230,
		dependencies: ['p3b-caplan-operational'],
		criticalPath: false
	}
];

/**
 * Get timeline data for a phase
 */
export function getPhaseTimeline(phaseId: string): PhaseDependencyGraph | undefined {
	switch (phaseId) {
		case 'phase-0':
			return PHASE_0_TIMELINE;
		case 'phase-1':
			return PHASE_1_TIMELINE;
		case 'phase-2':
			return PHASE_2_TIMELINE;
		case 'phase-3a':
			return PHASE_3A_TIMELINE;
		case 'phase-3b':
			return PHASE_3B_TIMELINE;
		default:
			return undefined;
	}
}

/**
 * Get all project milestones
 */
export function getProjectMilestones(): ProjectMilestone[] {
	return PROJECT_MILESTONES;
}
