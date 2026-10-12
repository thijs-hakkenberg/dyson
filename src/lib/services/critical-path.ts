/**
 * Critical Path Analysis for Phase 0 Research Questions
 *
 * Maps the 63 Phase 0 research questions into technology threads,
 * defines dependency relationships, and identifies critical-path blockers
 * that must be resolved before Phase 0 → Phase 1 transition.
 */

export type CriticalityLevel = 'critical' | 'high' | 'medium' | 'low';

export interface TechnologyThread {
	id: string;
	name: string;
	description: string;
	color: string;
	icon: string;
	questionIds: string[];
	/** Why this thread is critical to Phase 0 feasibility */
	rationale: string;
}

export interface QuestionDependency {
	questionId: string;
	slug: string;
	title: string;
	status: 'open' | 'investigating' | 'answered';
	priority: 'critical' | 'high' | 'medium' | 'low';
	threadId: string;
	/** Questions that must be resolved before this one can be fully addressed */
	dependsOn: string[];
	/** Questions that cannot proceed until this one is resolved */
	blocks: string[];
	/** True if this question is on the critical path to Phase 1 */
	criticalPath: boolean;
	/** True if a literature review (research/analysis.md) exists */
	hasLiteratureReview: boolean;
	/** True if a discussion conclusion exists */
	hasConclusion: boolean;
	/** Brief note on what resolving this question enables */
	gateDescription?: string;
}

/**
 * Technology threads grouping the 63 Phase 0 research questions
 * into coherent engineering areas.
 */
export const TECHNOLOGY_THREADS: TechnologyThread[] = [
	{
		id: 'isru-materials',
		name: 'ISRU & Materials Processing',
		description:
			'Can we extract and process raw asteroid materials into usable engineering feedstock in microgravity? This thread covers everything from regolith handling through metallurgy to semiconductor fabrication.',
		color: '#f59e0b', // amber
		icon: '⚒',
		questionIds: [
			'rq-0-6',
			'rq-0-11',
			'rq-0-12',
			'rq-0-13',
			'rq-0-15',
			'rq-0-24',
			'rq-0-27',
			'rq-0-28',
			'rq-0-43',
			'rq-0-44',
			'rq-0-45',
			'rq-0-46',
			'rq-0-51',
			'rq-0-56'
		],
		rationale:
			'The entire Dyson swarm concept depends on in-situ manufacturing. If microgravity metallurgy cannot scale to industrial production, or if semiconductor fabrication from asteroid feedstock is infeasible, the project architecture must fundamentally change.'
	},
	{
		id: 'cryogenic-storage',
		name: 'Cryogenic Propellant Storage',
		description:
			'Can we store cryogenic propellants (LH2/LOX) at L4/L5 with acceptable boiloff rates? Covers thermal management, insulation, active cooling, and sunshield architecture.',
		color: '#3b82f6', // blue
		icon: '❄',
		questionIds: ['rq-0-30', 'rq-0-47', 'rq-0-48', 'rq-0-49'],
		rationale:
			'Cryogenic propellant storage efficiency directly determines propellant production requirements, station power budget, and transport vehicle architecture. A factor-of-2 change in boiloff rate cascades through the entire mass budget.'
	},
	{
		id: 'propulsion-transport',
		name: 'Propulsion & Transport',
		description:
			'How do we move materials and people between asteroids, the processing station, and the construction site? Covers propellant production, fleet sizing, human-rating, and radiation protection.',
		color: '#8b5cf6', // violet
		icon: '🚀',
		questionIds: [
			'rq-0-14',
			'rq-0-16',
			'rq-0-17',
			'rq-0-18',
			'rq-0-19',
			'rq-0-20',
			'rq-0-31',
			'rq-0-32',
			'rq-0-33',
			'rq-0-34',
			'rq-0-35',
			'rq-0-36',
			'rq-0-37',
			'rq-0-38',
			'rq-0-52',
			'rq-0-53',
			'rq-0-54',
			'rq-0-55',
			'rq-0-59'
		],
		rationale:
			'Transport defines the mass throughput of the entire system. Fleet size, vehicle capacity, propellant strategy, and human-rating requirements set the operating tempo and cost of Phase 0 operations.'
	},
	{
		id: 'mining-operations',
		name: 'Mining & Excavation',
		description:
			'How do we extract raw materials from near-Earth asteroids? Covers excavation mechanisms, anchoring, regolith behavior, target selection, and autonomous adaptation.',
		color: '#ef4444', // red
		icon: '⛏',
		questionIds: [
			'rq-0-7',
			'rq-0-8',
			'rq-0-9',
			'rq-0-10',
			'rq-0-26',
			'rq-0-39',
			'rq-0-40',
			'rq-0-41',
			'rq-0-42',
			'rq-0-60'
		],
		rationale:
			'Mining is the first link in the production chain. Excavation rate determines material throughput, which sizes the processing station, which sizes the power system. Anchoring reliability and regolith behavior are existential unknowns.'
	},
	{
		id: 'power-thermal',
		name: 'Power & Energy Systems',
		description:
			'Does the energy budget close? Covers solar array design, energy storage, radiation degradation, concentrator vs flat-plate tradeoffs, and in-space manufacturing of power infrastructure.',
		color: '#f97316', // orange
		icon: '⚡',
		questionIds: ['rq-0-21', 'rq-0-22', 'rq-0-23', 'rq-0-25'],
		rationale:
			'Every other system draws power. Solar array degradation rate at L4/L5 determines replacement schedule. Energy storage technology limits eclipse operations. Array size drives station mass budget.'
	},
	{
		id: 'prospecting',
		name: 'Asteroid Prospecting & Targeting',
		description:
			'Can we find and characterize suitable asteroid targets? Covers spectrometer design, constellation sizing, spectral analysis, and composition validation.',
		color: '#10b981', // emerald
		icon: '🔭',
		questionIds: ['rq-0-1', 'rq-0-2', 'rq-0-3', 'rq-0-4', 'rq-0-5', 'rq-0-50'],
		rationale:
			'Target selection gates the entire mining campaign. Without validated composition data, mining robot design cannot be finalized, processing station throughput cannot be sized, and mission profiles cannot be planned.'
	},
	{
		id: 'governance-integration',
		name: 'Governance & Station Architecture',
		description:
			'How does it all fit together? Covers multi-century governance, cost methodology validation, and the integration challenge of combining all subsystems into a coherent station design.',
		color: '#6366f1', // indigo
		icon: '🏛',
		questionIds: ['rq-0-29', 'rq-0-46', 'rq-0-57', 'rq-0-58', 'rq-0-61', 'rq-0-62', 'rq-0-63'],
		rationale:
			'A multi-century, volunteer-driven, global project requires governance structures that do not yet exist. Cost methodology must account for ISRU economics that break traditional space program models.'
	}
];

/**
 * Complete dependency map for all 63 Phase 0 research questions.
 *
 * Dependencies encode "must be resolved before" relationships:
 * - parentQuestionId relationships from frontmatter
 * - Technical dependencies (e.g., mining informs processing station sizing)
 * - Logical ordering (e.g., target selection before mining design)
 */
export const QUESTION_DEPENDENCIES: QuestionDependency[] = [
	// === PROSPECTING THREAD ===
	{
		questionId: 'rq-0-1',
		slug: 'optimal-spectrometer-resolution-tradeoff',
		title: 'Optimal spectrometer resolution vs. mass/power tradeoff',
		status: 'investigating',
		priority: 'high',
		threadId: 'prospecting',
		dependsOn: [],
		blocks: ['rq-0-3', 'rq-0-5'],
		criticalPath: true,
		hasLiteratureReview: true,
		hasConclusion: false,
		gateDescription: 'Spectrometer design constrains satellite mass budget and survey capability'
	},
	{
		questionId: 'rq-0-2',
		slug: 'onboard-vs-ground-spectral-unmixing',
		title: 'On-board vs ground spectral unmixing effectiveness',
		status: 'answered',
		priority: 'medium',
		threadId: 'prospecting',
		dependsOn: ['rq-0-1'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-3',
		slug: 'minimum-constellation-size',
		title: 'Minimum constellation size for survey coverage',
		status: 'answered',
		priority: 'high',
		threadId: 'prospecting',
		dependsOn: ['rq-0-1'],
		blocks: ['rq-0-4'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Constellation size determines launch campaign scope and cost'
	},
	{
		questionId: 'rq-0-4',
		slug: 'dedicated-vs-rideshare-launches',
		title: 'Dedicated launches vs rideshare opportunities',
		status: 'open',
		priority: 'medium',
		threadId: 'prospecting',
		dependsOn: ['rq-0-3'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-5',
		slug: 'composition-algorithm-validation',
		title: 'Asteroid composition algorithm validation',
		status: 'investigating',
		priority: 'high',
		threadId: 'prospecting',
		dependsOn: ['rq-0-1'],
		blocks: ['rq-0-39'],
		criticalPath: true,
		hasLiteratureReview: true,
		hasConclusion: false,
		gateDescription: 'Composition accuracy determines whether selected targets are actually viable'
	},

	// === MINING OPERATIONS THREAD ===
	{
		questionId: 'rq-0-6',
		slug: 'regolith-excavation-microgravity',
		title: 'Regolith behavior during microgravity excavation',
		status: 'investigating',
		priority: 'critical',
		threadId: 'isru-materials',
		dependsOn: [],
		blocks: ['rq-0-26', 'rq-0-27'],
		criticalPath: true,
		hasLiteratureReview: true,
		hasConclusion: false,
		gateDescription: 'Fundamental physics of excavation - determines if bucket-wheel approach is viable'
	},
	{
		questionId: 'rq-0-7',
		slug: 'anchoring-technology-reliability',
		title: 'Anchoring technology reliability across asteroid types',
		status: 'investigating',
		priority: 'critical',
		threadId: 'mining-operations',
		dependsOn: [],
		blocks: ['rq-0-26'],
		criticalPath: true,
		hasLiteratureReview: true,
		hasConclusion: false,
		gateDescription: 'Without reliable anchoring, no surface operations are possible'
	},
	{
		questionId: 'rq-0-8',
		slug: 'fleet-composition-homogeneous-vs-specialized',
		title: 'Optimal fleet composition: homogeneous vs specialized',
		status: 'open',
		priority: 'high',
		threadId: 'mining-operations',
		dependsOn: ['rq-0-26'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-9',
		slug: 'electrostatic-charging-mechanisms',
		title: 'Electrostatic charging effects on mechanisms',
		status: 'investigating',
		priority: 'high',
		threadId: 'mining-operations',
		dependsOn: [],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-10',
		slug: 'onboard-processing-cost-effectiveness',
		title: 'On-board processing cost-effectiveness vs bulk transport',
		status: 'open',
		priority: 'medium',
		threadId: 'mining-operations',
		dependsOn: ['rq-0-11', 'rq-0-19'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-26',
		slug: 'dual-bucket-wheel-excavation',
		title: 'Dual counter-rotating bucket-wheel excavation',
		status: 'investigating',
		priority: 'high',
		threadId: 'mining-operations',
		dependsOn: ['rq-0-6', 'rq-0-7'],
		blocks: ['rq-0-8', 'rq-0-39', 'rq-0-40', 'rq-0-41', 'rq-0-42'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: true,
		gateDescription: 'Baseline excavation method validated — enables detailed mining robot design'
	},
	{
		questionId: 'rq-0-39',
		slug: 'subsurface-mechanical-characterization',
		title: 'Target asteroid subsurface mechanical property characterization',
		status: 'investigating',
		priority: 'high',
		threadId: 'mining-operations',
		dependsOn: ['rq-0-26', 'rq-0-5'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-40',
		slug: 'excavation-thermal-volatile-preservation',
		title: 'Thermal management for volatile preservation during excavation',
		status: 'investigating',
		priority: 'high',
		threadId: 'mining-operations',
		dependsOn: ['rq-0-26'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-41',
		slug: 'fleet-contamination-threshold',
		title: 'Fleet-level contamination acceptability threshold',
		status: 'open',
		priority: 'medium',
		threadId: 'mining-operations',
		dependsOn: ['rq-0-26'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-42',
		slug: 'autonomous-excavation-adaptation',
		title: 'Autonomous excavation adaptation to voids and heterogeneous material',
		status: 'open',
		priority: 'high',
		threadId: 'mining-operations',
		dependsOn: ['rq-0-26'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},

	// === ISRU & MATERIALS PROCESSING THREAD ===
	{
		questionId: 'rq-0-11',
		slug: 'microgravity-metallurgy-scaling',
		title: 'Scaling microgravity metallurgy to industrial production',
		status: 'answered',
		priority: 'critical',
		threadId: 'isru-materials',
		dependsOn: [],
		blocks: ['rq-0-12', 'rq-0-15', 'rq-0-24', 'rq-0-10'],
		criticalPath: true,
		hasLiteratureReview: true,
		hasConclusion: true,
		gateDescription: 'Core feasibility question — can we do metallurgy at industrial scale in microgravity?'
	},
	{
		questionId: 'rq-0-12',
		slug: 'zero-g-zone-refining-process',
		title: 'Optimal zone refining process in zero-g',
		status: 'investigating',
		priority: 'high',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-11'],
		blocks: ['rq-0-15'],
		criticalPath: true,
		hasLiteratureReview: true,
		hasConclusion: false,
		gateDescription: 'Zone refining purity determines solar cell and semiconductor quality achievable'
	},
	{
		questionId: 'rq-0-13',
		slug: 'slag-management-microgravity',
		title: 'Slag management and recycling in microgravity',
		status: 'investigating',
		priority: 'medium',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-11'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-15',
		slug: 'silicon-purity-achievability',
		title: 'Achievable silicon purity for solar cells',
		status: 'investigating',
		priority: 'critical',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-11', 'rq-0-12'],
		blocks: ['rq-0-44'],
		criticalPath: true,
		hasLiteratureReview: true,
		hasConclusion: false,
		gateDescription: 'Silicon purity determines whether in-space solar cell fabrication is feasible'
	},
	{
		questionId: 'rq-0-24',
		slug: 'in-space-array-structure-manufacturing',
		title: 'In-space manufacturing of array structures',
		status: 'investigating',
		priority: 'medium',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-11'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-27',
		slug: 'water-first-resource-strategy',
		title: 'Water-first resource extraction strategy',
		status: 'answered',
		priority: 'critical',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-14', 'rq-0-6'],
		blocks: ['rq-0-28'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: true,
		gateDescription: 'Water-first strategy validated — establishes ISRU bootstrapping sequence'
	},
	{
		questionId: 'rq-0-28',
		slug: 'isru-cost-methodology-validation',
		title: 'ISRU cost methodology validation',
		status: 'investigating',
		priority: 'critical',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-14', 'rq-0-27'],
		blocks: ['rq-0-43', 'rq-0-44', 'rq-0-45', 'rq-0-46'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: true,
		gateDescription: 'Cost methodology framework established — enables credible economic analysis'
	},
	{
		questionId: 'rq-0-43',
		slug: 'mass-closure-ratio-validation',
		title: 'Mass closure ratio validation for ISRU economics',
		status: 'investigating',
		priority: 'high',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-28'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-44',
		slug: 'in-situ-semiconductor-fabrication',
		title: 'In-situ semiconductor fabrication feasibility',
		status: 'investigating',
		priority: 'high',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-15', 'rq-0-28'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-45',
		slug: 'autonomous-replication-failure-modes',
		title: 'Autonomous replication failure modes across generations',
		status: 'open',
		priority: 'high',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-28'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},

	// === PROPULSION & TRANSPORT THREAD ===
	{
		questionId: 'rq-0-14',
		slug: 'propellant-production-phase-0-scope',
		title: 'Propellant production in Phase 0 scope',
		status: 'answered',
		priority: 'medium',
		threadId: 'propulsion-transport',
		dependsOn: [],
		blocks: ['rq-0-27', 'rq-0-28', 'rq-0-30', 'rq-0-31', 'rq-0-32', 'rq-0-33', 'rq-0-34'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: true,
		gateDescription: 'Propellant production scope resolved — ISPP included in Phase 0 with phased deployment'
	},
	{
		questionId: 'rq-0-16',
		slug: 'thruster-lifetime-isp-tradeoff',
		title: 'Thruster lifetime vs Isp tradeoff',
		status: 'investigating',
		priority: 'high',
		threadId: 'propulsion-transport',
		dependsOn: [],
		blocks: ['rq-0-19'],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-17',
		slug: 'microgravity-cargo-transfer',
		title: 'Efficient large cargo transfer in microgravity',
		status: 'open',
		priority: 'high',
		threadId: 'propulsion-transport',
		dependsOn: [],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-18',
		slug: 'human-rating-transport-vehicles',
		title: 'Human-rating requirement for transport vehicles',
		status: 'answered',
		priority: 'low',
		threadId: 'propulsion-transport',
		dependsOn: [],
		blocks: ['rq-0-35', 'rq-0-36', 'rq-0-37', 'rq-0-38'],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: true,
		gateDescription: 'Human-rating deferred to Phase 1 — Phase 0 operates robotically'
	},
	{
		questionId: 'rq-0-19',
		slug: 'fleet-size-vs-vehicle-capacity',
		title: 'Fleet size vs vehicle capacity tradeoff',
		status: 'answered',
		priority: 'medium',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-16'],
		blocks: ['rq-0-10'],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-20',
		slug: 'xenon-propellant-sourcing-scale',
		title: 'Xenon propellant sourcing at scale',
		status: 'investigating',
		priority: 'high',
		threadId: 'propulsion-transport',
		dependsOn: [],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-31',
		slug: 'propellant-demand-modeling-precision',
		title: 'Propellant demand modeling precision',
		status: 'investigating',
		priority: 'high',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-14'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-32',
		slug: 'crew-presence-propellant-tending',
		title: 'Crew presence frequency for propellant system tending',
		status: 'open',
		priority: 'medium',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-14'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-33',
		slug: 'microgravity-electrolysis-separation',
		title: 'Industrial-scale microgravity electrolysis gas-liquid separation',
		status: 'investigating',
		priority: 'high',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-14'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-34',
		slug: 'storable-propellant-alternatives',
		title: 'Storable propellant alternatives from asteroid organics',
		status: 'answered',
		priority: 'low',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-14'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Deprioritized: rq-0-30 deliberation concluded storable propellants carry 30-40% Isp penalty, making them a last-resort fallback only'
	},
	{
		questionId: 'rq-0-35',
		slug: 'radiation-shielding-mass-validation',
		title: 'Radiation shielding mass requirement validation',
		status: 'investigating',
		priority: 'high',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-18'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-36',
		slug: 'in-situ-crew-module-manufacturing',
		title: 'In-situ crew module kit manufacturing feasibility',
		status: 'open',
		priority: 'medium',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-18', 'rq-0-11'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-37',
		slug: 'human-rating-regulatory-framework',
		title: 'Regulatory and liability framework for human-rating',
		status: 'open',
		priority: 'medium',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-18'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-38',
		slug: 'crew-compartment-com-propulsion',
		title: 'Modular crew compartment effect on vehicle CoM and propulsion',
		status: 'open',
		priority: 'medium',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-18'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},

	// === CRYOGENIC STORAGE THREAD ===
	{
		questionId: 'rq-0-30',
		slug: 'cryogenic-boiloff-management',
		title: 'Cryogenic boiloff management at L4/L5 thermal environment',
		status: 'answered',
		priority: 'high',
		threadId: 'cryogenic-storage',
		dependsOn: ['rq-0-14'],
		blocks: ['rq-0-47', 'rq-0-48', 'rq-0-49'],
		criticalPath: true,
		hasLiteratureReview: true,
		hasConclusion: true,
		gateDescription:
			'Boiloff rate determines propellant overproduction factor and station power budget allocation'
	},
	{
		questionId: 'rq-0-47',
		slug: 'sunshield-deployment-architecture',
		title: 'Sunshield deployment architecture for L4/L5 cryogenic storage',
		status: 'answered',
		priority: 'high',
		threadId: 'cryogenic-storage',
		dependsOn: ['rq-0-30'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: true
	},
	{
		questionId: 'rq-0-48',
		slug: 'mli-long-duration-degradation',
		title: 'MLI long-duration performance and degradation at L4/L5',
		status: 'answered',
		priority: 'high',
		threadId: 'cryogenic-storage',
		dependsOn: ['rq-0-30'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: true
	},
	{
		questionId: 'rq-0-49',
		slug: 'cryocooler-scaling-space-zbo',
		title: 'Cryocooler scaling from milliwatt to hundred-watt class for space ZBO',
		status: 'investigating',
		priority: 'high',
		threadId: 'cryogenic-storage',
		dependsOn: ['rq-0-30'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},

	// === POWER & ENERGY SYSTEMS THREAD ===
	{
		questionId: 'rq-0-21',
		slug: 'optimal-module-size-manufacturing',
		title: 'Optimal module size for manufacturing and deployment',
		status: 'open',
		priority: 'medium',
		threadId: 'power-thermal',
		dependsOn: [],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-22',
		slug: 'concentrators-vs-flat-plate',
		title: 'Concentrators vs flat-plate for cell area reduction',
		status: 'investigating',
		priority: 'medium',
		threadId: 'power-thermal',
		dependsOn: [],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-23',
		slug: 'energy-storage-30-year-life',
		title: 'Energy storage technology for 30-year station life',
		status: 'answered',
		priority: 'high',
		threadId: 'power-thermal',
		dependsOn: [],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},
	{
		questionId: 'rq-0-25',
		slug: 'l4-l5-radiation-degradation',
		title: 'Radiation degradation rate at L4/L5 location',
		status: 'answered',
		priority: 'medium',
		threadId: 'power-thermal',
		dependsOn: [],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: false
	},

	// === GOVERNANCE & INTEGRATION THREAD ===
	{
		questionId: 'rq-0-29',
		slug: 'multi-century-governance-structure',
		title: 'Multi-century governance structure',
		status: 'answered',
		priority: 'critical',
		threadId: 'governance-integration',
		dependsOn: [],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: true,
		hasConclusion: true
	},
	{
		questionId: 'rq-0-46',
		slug: 'post-scarcity-economic-valuation',
		title: 'Post-scarcity economic valuation frameworks',
		status: 'open',
		priority: 'medium',
		threadId: 'governance-integration',
		dependsOn: ['rq-0-28'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false
	},
	// Raised by the Phase 0 re-assessment, round 2 (2026-10-12); see reconciliation/phase-0/open-questions.md
	{
		questionId: 'rq-0-50',
		slug: 'target-class-recoverable-grade',
		title: 'Target asteroid class and recoverable product grade',
		status: 'open',
		priority: 'critical',
		threadId: 'prospecting',
		dependsOn: ['rq-0-5'],
		blocks: ['rq-0-51', 'rq-0-55', 'rq-0-61'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Sets the target gate (D-02) and the recoverable-grade sensitivity of 0B'
	},
	{
		questionId: 'rq-0-51',
		slug: 'microgravity-beneficiation-ratio',
		title: 'Beneficiation ratio for native Fe-Ni in microgravity',
		status: 'open',
		priority: 'critical',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-50'],
		blocks: ['rq-0-56', 'rq-0-61'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Concentration ratio decides whether co-located processing closes'
	},
	{
		questionId: 'rq-0-52',
		slug: 'low-thrust-trajectories-cadence',
		title: 'Low-thrust trajectories and cycle cadence to candidate NEAs',
		status: 'open',
		priority: 'high',
		threadId: 'propulsion-transport',
		dependsOn: [],
		blocks: ['rq-0-53', 'rq-0-55', 'rq-0-59', 'rq-0-61'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Cadence sets fleet size and propellant demand'
	},
	{
		questionId: 'rq-0-53',
		slug: 'ep-propellant-supply-audit',
		title: 'Electric propulsion propellant supply audit (iodine, argon, krypton, xenon)',
		status: 'open',
		priority: 'high',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-52'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Propellant baseline for the tugs (D-05)'
	},
	{
		questionId: 'rq-0-54',
		slug: 'mw-class-ep-qualification',
		title: 'MW-class electric propulsion: life, thermal load and plume compatibility',
		status: 'open',
		priority: 'critical',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-16'],
		blocks: [],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'MW-class EP life is project-ending for the transport chain'
	},
	{
		questionId: 'rq-0-55',
		slug: 'water-ep-transport-closure',
		title: 'Water electric propulsion: does it close Phase 0 transport?',
		status: 'open',
		priority: 'medium',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-50', 'rq-0-52'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Whether ISPP has a Phase 0 customer'
	},
	{
		questionId: 'rq-0-56',
		slug: 'no-melt-fe-ni-refining',
		title: 'No-melt Fe-Ni refining routes (carbonyl, H₂ reduction): yield and reagent recycling',
		status: 'open',
		priority: 'high',
		threadId: 'isru-materials',
		dependsOn: ['rq-0-51'],
		blocks: ['rq-0-61'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'May remove the need for an artificial-gravity module'
	},
	{
		questionId: 'rq-0-57',
		slug: 'delivered-cost-per-kg-quotes',
		title: 'Delivered cost per kg to NEA sites and SEL1',
		status: 'open',
		priority: 'high',
		threadId: 'governance-integration',
		dependsOn: [],
		blocks: ['rq-0-61'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Delivered price is the sensitivity point that can flip D-01'
	},
	{
		questionId: 'rq-0-58',
		slug: 'phase-1-material-demand',
		title: 'Phase 1 material demand for Phase 0 output',
		status: 'open',
		priority: 'critical',
		threadId: 'governance-integration',
		dependsOn: [],
		blocks: ['rq-0-59', 'rq-0-61'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Demand gate for 0B (D-01, D-02)'
	},
	{
		questionId: 'rq-0-59',
		slug: 'phase-0-delivery-node',
		title: 'Phase 0 → Phase 1 delivery node',
		status: 'open',
		priority: 'high',
		threadId: 'propulsion-transport',
		dependsOn: ['rq-0-52', 'rq-0-58'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Delivery node, re-decided at KDP-0B (D-04)'
	},
	{
		questionId: 'rq-0-60',
		slug: 'hv-tether-regolith-insulation',
		title: 'High-voltage power tethers on abrasive regolith: insulation life',
		status: 'open',
		priority: 'medium',
		threadId: 'mining-operations',
		dependsOn: [],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Tethered-robot power architecture'
	},
	{
		questionId: 'rq-0-61',
		slug: 'phase-0b-cost-vs-earth-supply',
		title: 'Phase 0B delivered cost per kg versus Earth supply',
		status: 'open',
		priority: 'critical',
		threadId: 'governance-integration',
		dependsOn: ['rq-0-50', 'rq-0-51', 'rq-0-56', 'rq-0-57', 'rq-0-58'],
		blocks: [],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Economics gate for 0B (D-02)'
	},
	{
		questionId: 'rq-0-62',
		slug: 'trl-rebaseline-revised-architecture',
		title: 'Technology readiness re-baseline for the revised Phase 0 architecture',
		status: 'open',
		priority: 'critical',
		threadId: 'governance-integration',
		dependsOn: [],
		blocks: ['rq-0-63'],
		criticalPath: true,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'TRL and AD² targets for every critical technology at KDP-0B (D-02)'
	},
	{
		questionId: 'rq-0-63',
		slug: 'integrated-0a-0b-schedule',
		title: 'Integrated schedule for Phase 0A, the gates and the 0B ramp',
		status: 'open',
		priority: 'high',
		threadId: 'governance-integration',
		dependsOn: ['rq-0-62'],
		blocks: [],
		criticalPath: false,
		hasLiteratureReview: false,
		hasConclusion: false,
		gateDescription: 'Gate timing and cost of delay'
	}
];

// === Derived data and helper functions ===

/** Get all questions in a specific thread */
export function getThreadQuestions(threadId: string): QuestionDependency[] {
	return QUESTION_DEPENDENCIES.filter((q) => q.threadId === threadId);
}

/** Get a specific question by ID */
export function getQuestion(questionId: string): QuestionDependency | undefined {
	return QUESTION_DEPENDENCIES.find((q) => q.questionId === questionId);
}

/** Get all critical path questions */
export function getCriticalPathQuestions(): QuestionDependency[] {
	return QUESTION_DEPENDENCIES.filter((q) => q.criticalPath);
}

/** Get questions that have no unresolved dependencies */
export function getReadyQuestions(): QuestionDependency[] {
	return QUESTION_DEPENDENCIES.filter((q) => {
		if (q.status === 'answered') return false;
		return q.dependsOn.every((depId) => {
			const dep = getQuestion(depId);
			return dep?.status === 'answered';
		});
	});
}

/** Get questions that are blocked (have unresolved dependencies) */
export function getBlockedQuestions(): QuestionDependency[] {
	return QUESTION_DEPENDENCIES.filter((q) => {
		if (q.status === 'answered') return false;
		return q.dependsOn.some((depId) => {
			const dep = getQuestion(depId);
			return dep?.status !== 'answered';
		});
	});
}

/** Thread completion statistics */
export interface ThreadStats {
	thread: TechnologyThread;
	total: number;
	answered: number;
	investigating: number;
	open: number;
	withLiterature: number;
	criticalPathCount: number;
	completionPercent: number;
}

export function getThreadStats(): ThreadStats[] {
	return TECHNOLOGY_THREADS.map((thread) => {
		const questions = getThreadQuestions(thread.id);
		const answered = questions.filter((q) => q.status === 'answered').length;
		return {
			thread,
			total: questions.length,
			answered,
			investigating: questions.filter((q) => q.status === 'investigating').length,
			open: questions.filter((q) => q.status === 'open').length,
			withLiterature: questions.filter((q) => q.hasLiteratureReview).length,
			criticalPathCount: questions.filter((q) => q.criticalPath).length,
			completionPercent: Math.round((answered / questions.length) * 100)
		};
	});
}

/** Overall Phase 0 research statistics */
export function getOverallStats() {
	const total = QUESTION_DEPENDENCIES.length;
	const answered = QUESTION_DEPENDENCIES.filter((q) => q.status === 'answered').length;
	const investigating = QUESTION_DEPENDENCIES.filter((q) => q.status === 'investigating').length;
	const open = QUESTION_DEPENDENCIES.filter((q) => q.status === 'open').length;
	const withLiterature = QUESTION_DEPENDENCIES.filter((q) => q.hasLiteratureReview).length;
	const withConclusion = QUESTION_DEPENDENCIES.filter((q) => q.hasConclusion).length;
	const criticalPath = QUESTION_DEPENDENCIES.filter((q) => q.criticalPath).length;

	return {
		total,
		answered,
		investigating,
		open,
		withLiterature,
		withConclusion,
		criticalPath,
		completionPercent: Math.round((answered / total) * 100),
		literatureCoverage: Math.round((withLiterature / total) * 100)
	};
}
