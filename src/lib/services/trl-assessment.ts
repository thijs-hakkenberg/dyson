/**
 * Technology Readiness Level (TRL) Assessment for Phase 0
 *
 * Rates key technologies on the NASA TRL scale (1-9) and identifies
 * the gap between current state and what Phase 0 requires.
 *
 * TRL Scale:
 * 1 - Basic principles observed
 * 2 - Technology concept formulated
 * 3 - Experimental proof of concept
 * 4 - Technology validated in lab
 * 5 - Technology validated in relevant environment
 * 6 - Technology demonstrated in relevant environment
 * 7 - System prototype demonstration in operational environment
 * 8 - System complete and qualified
 * 9 - System proven in operational environment
 */

export interface TRLAssessment {
	id: string;
	technology: string;
	description: string;
	/** Current best-estimate TRL (may be a range) */
	currentTRL: number;
	currentTRLMax?: number;
	/** TRL needed for Phase 0 deployment */
	targetTRL: number;
	/** What evidence supports the current TRL rating */
	evidence: string;
	/** Key experiments or demonstrations needed to advance */
	experimentsNeeded: string[];
	/** Estimated years to reach target TRL */
	yearsToTarget: number;
	yearsToTargetMax?: number;
	/** Research questions most relevant to advancing this technology */
	relatedQuestionIds: string[];
	/** BOM items that depend on this technology */
	relatedBOMIds: string[];
	/** Technology thread this belongs to */
	threadId: string;
	/** Risk level if technology fails to reach target TRL */
	riskIfFail: 'project-ending' | 'architecture-change' | 'schedule-delay' | 'cost-increase';
	/** Fallback approach if technology doesn't pan out */
	fallbackApproach?: string;
}

export const TRL_LABELS: Record<number, string> = {
	1: 'Basic principles observed',
	2: 'Technology concept formulated',
	3: 'Experimental proof of concept',
	4: 'Technology validated in lab',
	5: 'Technology validated in relevant environment',
	6: 'Technology demonstrated in relevant environment',
	7: 'System prototype in operational environment',
	8: 'System complete and qualified',
	9: 'System proven in operational environment'
};

export const RISK_LABELS: Record<string, { label: string; color: string }> = {
	'project-ending': { label: 'Project Ending', color: '#ef4444' },
	'architecture-change': { label: 'Architecture Change', color: '#f97316' },
	'schedule-delay': { label: 'Schedule Delay', color: '#f59e0b' },
	'cost-increase': { label: 'Cost Increase', color: '#eab308' }
};

export const TRL_ASSESSMENTS: TRLAssessment[] = [
	{
		id: 'microgravity-metallurgy',
		technology: 'Microgravity Metallurgy at Industrial Scale',
		description:
			'Smelting, casting, and forming metals from asteroid feedstock in microgravity. Includes iron/nickel separation, alloy production, and structural member fabrication.',
		currentTRL: 2,
		currentTRLMax: 3,
		targetTRL: 7,
		evidence:
			'ISS experiments have demonstrated small-scale metal melting and solidification (TRL 2-3). No industrial-scale microgravity metallurgy has been attempted. Containerless processing of small samples demonstrated.',
		experimentsNeeded: [
			'ISS pathfinder: 100g metal melting and casting in microgravity',
			'ISS follow-up: 1-10kg structural member fabrication',
			'Free-flyer demo: 100kg batch processing with quality validation',
			'Prototype facility: Continuous processing at 1 tonne/month rate'
		],
		yearsToTarget: 12,
		yearsToTargetMax: 18,
		relatedQuestionIds: ['rq-0-11', 'rq-0-12', 'rq-0-13', 'rq-0-15'],
		relatedBOMIds: ['bom-0-3'],
		threadId: 'isru-materials',
		riskIfFail: 'project-ending',
		fallbackApproach:
			'Add artificial gravity via rotation to processing station. Increases station mass and complexity significantly but enables terrestrial metallurgical processes.'
	},
	{
		id: 'cryocooler-scaling',
		technology: 'Flight Cryocoolers at 100-500W Cooling (20K)',
		description:
			'Active cryogenic cooling at the hundred-watt scale for zero-boiloff LH2 storage. Current flight cryocoolers operate at milliwatt to single-watt scale.',
		currentTRL: 4,
		currentTRLMax: 5,
		targetTRL: 7,
		evidence:
			'NASA GODU-LH2 demonstrated ground-based ZBO with 20W-class Turbo-Brayton cooler. JWST uses 6K cryocoolers at ~milliwatt scale. No flight demonstration at 100W+ scale exists.',
		experimentsNeeded: [
			'Ground demo: 50-100W reverse-Brayton at 20K with flight-like interfaces',
			'Thermal-vacuum qualification of 100W-class system',
			'LEO flight demonstration on dedicated cryogenic testbed',
			'Long-duration (2+ year) performance characterization in space'
		],
		yearsToTarget: 6,
		yearsToTargetMax: 10,
		relatedQuestionIds: ['rq-0-49', 'rq-0-30'],
		relatedBOMIds: ['bom-0-3', 'bom-0-6'],
		threadId: 'cryogenic-storage',
		riskIfFail: 'architecture-change',
		fallbackApproach:
			'Switch to storable propellants (MMH/NTO or alternatives from asteroid organics). Eliminates cryogenic complexity but reduces Isp and requires different ISRU chemistry.'
	},
	{
		id: 'asteroid-mining-bucket-wheel',
		technology: 'Asteroid Surface Mining (Bucket-Wheel Excavation)',
		description:
			'Dual counter-rotating bucket-wheel system for excavating asteroid regolith in microgravity, including anchoring, material containment, and autonomous operation.',
		currentTRL: 3,
		targetTRL: 6,
		evidence:
			'Bucket-wheel concept validated through multi-model consensus analysis. Terrestrial analogs exist. No microgravity excavation testing has been performed. Anchoring in asteroid regolith is untested.',
		experimentsNeeded: [
			'Parabolic flight testing of regolith excavation mechanics',
			'ISS analog: excavation in simulated regolith under constrained microgravity',
			'Anchoring prototype testing on analog asteroid surfaces',
			'LEO free-flyer demonstration with regolith simulant',
			'Near-Earth asteroid proximity and surface interaction mission'
		],
		yearsToTarget: 10,
		yearsToTargetMax: 15,
		relatedQuestionIds: ['rq-0-6', 'rq-0-7', 'rq-0-26', 'rq-0-39', 'rq-0-42'],
		relatedBOMIds: ['bom-0-2'],
		threadId: 'mining-operations',
		riskIfFail: 'architecture-change',
		fallbackApproach:
			'Switch to thermal extraction (heat regolith to release volatiles) which avoids mechanical contact. Lower throughput but simpler mechanics.'
	},
	{
		id: 'solar-electric-propulsion',
		technology: 'High-Power Solar Electric Propulsion (100+ kW)',
		description:
			'Hall-effect or ion thrusters at 100+ kW array power for cargo transport between asteroid belt and L4/L5 construction site.',
		currentTRL: 6,
		currentTRLMax: 7,
		targetTRL: 8,
		evidence:
			'NASA AEPS (Advanced Electric Propulsion System) 12.5 kW Hall thruster qualified. Starlink uses low-power Hall thrusters operationally. Gateway PPE targets 60 kW. 100+ kW cargo vehicles not yet demonstrated.',
		experimentsNeeded: [
			'100+ kW array power demonstration in cislunar space',
			'Long-duration Hall thruster operation (10,000+ hours) at 50+ kW',
			'Multi-thruster array coordination and power management',
			'Autonomous deep-space navigation with SEP for asteroid rendezvous'
		],
		yearsToTarget: 5,
		yearsToTargetMax: 8,
		relatedQuestionIds: ['rq-0-16', 'rq-0-19', 'rq-0-20'],
		relatedBOMIds: ['bom-0-4'],
		threadId: 'propulsion-transport',
		riskIfFail: 'schedule-delay',
		fallbackApproach:
			'Use smaller vehicles with more trips. Increases fleet size and transit time but uses proven technology.'
	},
	{
		id: 'isru-water-extraction',
		technology: 'ISRU Water Extraction from Asteroid Regolith',
		description:
			'Heating asteroid regolith to extract water (ice and hydrated minerals), then purifying for electrolysis into LH2/LOX propellant.',
		currentTRL: 3,
		currentTRLMax: 4,
		targetTRL: 7,
		evidence:
			'OSIRIS-REx confirmed hydrated minerals on Bennu. Lab demonstrations of water extraction from meteorite analogs. NASA ISRU programs targeting lunar water extraction (PRIME-1, VIPER cancelled). No asteroid-specific extraction demo.',
		experimentsNeeded: [
			'Lab extraction from CI/CM carbonaceous chondrite samples',
			'Microwave/thermal extraction efficiency characterization',
			'Microgravity water collection and separation demo',
			'Prototype ISRU plant processing 1+ kg/day of simulant',
			'Asteroid proximity mission with in-situ extraction experiment'
		],
		yearsToTarget: 8,
		yearsToTargetMax: 12,
		relatedQuestionIds: ['rq-0-27', 'rq-0-33', 'rq-0-40'],
		relatedBOMIds: ['bom-0-6', 'bom-0-3'],
		threadId: 'isru-materials',
		riskIfFail: 'project-ending',
		fallbackApproach:
			'Source water from lunar poles (higher TRL extraction from known deposits). Significantly increases transport cost but avoids asteroid extraction uncertainty.'
	},
	{
		id: 'in-space-silicon-purification',
		technology: 'In-Space Silicon Purification to Solar Cell Grade',
		description:
			'Zone refining or equivalent process to achieve 99.9999% (6N) purity silicon from asteroid feedstock for solar cell fabrication.',
		currentTRL: 2,
		currentTRLMax: 3,
		targetTRL: 6,
		evidence:
			'Terrestrial zone refining well-understood. Microgravity offers potential advantages (no convection, containerless processing). Small-scale microgravity crystal growth demonstrated on ISS. No solar-grade silicon production attempted in space.',
		experimentsNeeded: [
			'ISS zone refining experiment with raw silicon feedstock',
			'Purity characterization of microgravity-refined samples',
			'Scaling study: transition from gram-scale to kg-scale',
			'Solar cell fabrication from space-refined silicon (ground test)',
			'Integrated refining → cell fabrication demo in relevant environment'
		],
		yearsToTarget: 10,
		yearsToTargetMax: 15,
		relatedQuestionIds: ['rq-0-12', 'rq-0-15', 'rq-0-44'],
		relatedBOMIds: ['bom-0-3', 'bom-0-5'],
		threadId: 'isru-materials',
		riskIfFail: 'architecture-change',
		fallbackApproach:
			'Launch thin-film solar cell production equipment from Earth. Higher upfront cost but avoids silicon purification challenge entirely. Thin-film cells (CdTe, CIGS) require lower purity feedstock.'
	},
	{
		id: 'autonomous-asteroid-prospecting',
		technology: 'Autonomous Asteroid Prospecting Constellation',
		description:
			'Network of small spacecraft performing spectroscopic survey of NEA population, with on-board composition classification and target prioritization.',
		currentTRL: 5,
		currentTRLMax: 6,
		targetTRL: 8,
		evidence:
			'Deep Space 1, Dawn, Hayabusa2, OSIRIS-REx demonstrated asteroid rendezvous and characterization. SmallSat asteroid missions proposed (NEA Scout launched). Multi-spacecraft asteroid survey not yet demonstrated.',
		experimentsNeeded: [
			'Single prospecting satellite pathfinder mission to NEA',
			'On-board spectral classification algorithm validation against ground truth',
			'Multi-spacecraft coordination and data relay demonstration',
			'Full constellation deployment and survey campaign'
		],
		yearsToTarget: 6,
		yearsToTargetMax: 10,
		relatedQuestionIds: ['rq-0-1', 'rq-0-2', 'rq-0-3', 'rq-0-5'],
		relatedBOMIds: ['bom-0-1'],
		threadId: 'prospecting',
		riskIfFail: 'schedule-delay',
		fallbackApproach:
			'Use ground-based telescopic survey (lower resolution) combined with fewer, larger prospecting missions. Slower target identification but avoids constellation complexity.'
	},
	{
		id: 'sunshield-deployment',
		technology: 'Large Deployable Sunshields for Cryogenic Storage',
		description:
			'Multi-layer deployable sunshield (JWST-heritage) scaled to protect propellant depot tanks, providing passive thermal control to reduce cryocooler load.',
		currentTRL: 6,
		currentTRLMax: 7,
		targetTRL: 8,
		evidence:
			'JWST successfully deployed a 21m x 14m 5-layer sunshield at L2. Scaled designs for propellant depots proposed by ULA and Lockheed Martin. No depot-specific sunshield has been built.',
		experimentsNeeded: [
			'Design trade study for depot-scale sunshield (simplified vs JWST-heritage)',
			'Prototype deployment testing at relevant scale',
			'Thermal performance characterization in simulated L4/L5 environment',
			'Long-duration material degradation assessment'
		],
		yearsToTarget: 4,
		yearsToTargetMax: 6,
		relatedQuestionIds: ['rq-0-47', 'rq-0-30'],
		relatedBOMIds: ['bom-0-3', 'bom-0-6'],
		threadId: 'cryogenic-storage',
		riskIfFail: 'cost-increase',
		fallbackApproach:
			'Rely entirely on active cooling (larger cryocoolers). Increases power budget but eliminates mechanical deployment risk.'
	},
	{
		id: 'mli-long-duration',
		technology: 'MLI Performance over 10+ Year Missions',
		description:
			'Multi-layer insulation maintaining thermal performance over decade-plus missions in the L4/L5 radiation and micrometeorite environment.',
		currentTRL: 5,
		currentTRLMax: 6,
		targetTRL: 7,
		evidence:
			'MLI extensively used on spacecraft. Hubble MLI showed significant degradation after 15+ years. Limited data on MLI performance at L4/L5 specifically. Atomic oxygen not a concern at L4/L5 (unlike LEO).',
		experimentsNeeded: [
			'Accelerated aging tests of MLI in simulated L4/L5 environment',
			'Micrometeorite impact effects on MLI thermal performance',
			'Long-duration space exposure experiment at L4/L5 or equivalent',
			'Self-healing or replaceable MLI concept development'
		],
		yearsToTarget: 4,
		yearsToTargetMax: 7,
		relatedQuestionIds: ['rq-0-48', 'rq-0-30'],
		relatedBOMIds: ['bom-0-3'],
		threadId: 'cryogenic-storage',
		riskIfFail: 'cost-increase',
		fallbackApproach:
			'Plan for periodic MLI replacement using in-situ manufactured replacements. Adds operational complexity and ISRU requirements.'
	},
	{
		id: 'electrolysis-microgravity',
		technology: 'Industrial Microgravity Water Electrolysis',
		description:
			'Splitting water into hydrogen and oxygen at industrial rates (tonnes/year) in microgravity, with reliable gas-liquid separation.',
		currentTRL: 3,
		currentTRLMax: 4,
		targetTRL: 7,
		evidence:
			'ISS ECLSS uses small-scale electrolysis for crew oxygen. No industrial-scale microgravity electrolysis demonstrated. Gas-liquid separation in microgravity is a known challenge (capillary effects, bubble management).',
		experimentsNeeded: [
			'Scaled electrolysis cell testing in parabolic flight',
			'ISS experiment: magnetic/centrifugal gas-liquid separator',
			'Prototype system processing 10+ kg/day water',
			'Long-duration (1+ year) continuous operation demo',
			'Integration with water extraction and propellant storage systems'
		],
		yearsToTarget: 8,
		yearsToTargetMax: 12,
		relatedQuestionIds: ['rq-0-33', 'rq-0-14', 'rq-0-27'],
		relatedBOMIds: ['bom-0-6'],
		threadId: 'propulsion-transport',
		riskIfFail: 'architecture-change',
		fallbackApproach:
			'Add centrifuge or rotation to electrolysis module for gravity-assisted separation. Proven approach but adds mass, power, and mechanical complexity.'
	}
];

// === Helper functions ===

/** Get all assessments for a given thread */
export function getAssessmentsByThread(threadId: string): TRLAssessment[] {
	return TRL_ASSESSMENTS.filter((a) => a.threadId === threadId);
}

/** Get assessment by ID */
export function getAssessment(id: string): TRLAssessment | undefined {
	return TRL_ASSESSMENTS.find((a) => a.id === id);
}

/** Get assessments related to a specific research question */
export function getAssessmentsForQuestion(questionId: string): TRLAssessment[] {
	return TRL_ASSESSMENTS.filter((a) => a.relatedQuestionIds.includes(questionId));
}

/** Get assessments related to a specific BOM item */
export function getAssessmentsForBOM(bomId: string): TRLAssessment[] {
	return TRL_ASSESSMENTS.filter((a) => a.relatedBOMIds.includes(bomId));
}

/** Compute the TRL gap (how many levels need to be advanced) */
export function getTRLGap(assessment: TRLAssessment): number {
	return assessment.targetTRL - assessment.currentTRL;
}

/** Get the maximum TRL gap (using lower bound of current TRL) */
export function getMaxTRLGap(assessment: TRLAssessment): number {
	return assessment.targetTRL - assessment.currentTRL;
}

/** Get overall TRL statistics */
export function getTRLStats() {
	const assessments = TRL_ASSESSMENTS;
	const avgGap =
		assessments.reduce((sum, a) => sum + getTRLGap(a), 0) / assessments.length;
	const maxGap = Math.max(...assessments.map(getTRLGap));
	const projectEnding = assessments.filter((a) => a.riskIfFail === 'project-ending').length;
	const architectureChange = assessments.filter(
		(a) => a.riskIfFail === 'architecture-change'
	).length;

	return {
		totalTechnologies: assessments.length,
		averageGap: Math.round(avgGap * 10) / 10,
		maxGap,
		projectEndingRisks: projectEnding,
		architectureChangeRisks: architectureChange,
		lowestTRL: Math.min(...assessments.map((a) => a.currentTRL)),
		highestTRL: Math.max(...assessments.map((a) => a.currentTRL)),
		avgYearsToTarget:
			Math.round(
				(assessments.reduce((sum, a) => sum + a.yearsToTarget, 0) / assessments.length) * 10
			) / 10
	};
}
