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
		technology: 'Hybrid Gravity Metallurgy at Industrial Scale',
		description:
			'Smelting and slag separation in a rotating module (0.05-0.15g), with zone refining and thin-film deposition in microgravity. Hybrid multi-gravity-zone architecture per rq-0-11 deliberation.',
		currentTRL: 3,
		currentTRLMax: 4,
		targetTRL: 7,
		evidence:
			'ISS EML demonstrated gram-scale containerless melting (TRL 2-3). Multi-model deliberation (rq-0-11, 2026) concluded pure microgravity smelting is not viable but hybrid gravity architecture resolves scaling. Gravity-independent AM demonstrated (D\'Angelo 2021). UMG-Si at 4N-5N achieves viable solar cells. Magnetic electrolysis breakthrough (Nature Chemistry 2025). Architectural concept defined but partial-gravity metallurgy experiments in 0.01-0.2g regime not yet conducted.',
		experimentsNeeded: [
			'Terrestrial analog facility with EM levitation and asteroid simulant ($50-80M, Years 1-2)',
			'Dedicated partial-gravity platform: smelting/slag separation at 0.01-0.2g, 1-10kg batches ($300-400M, Years 2-4)',
			'ISS microgravity zone refining: 100g to 1kg silicon batches ($150-250M, Years 2-4)',
			'Rotating smelting module engineering development unit ($150-250M, Years 4-6)',
			'Gate 1 decision at month 36: slag separation >95%, zone refining <1ppmw Fe+Cr+Cu'
		],
		yearsToTarget: 8,
		yearsToTargetMax: 12,
		relatedQuestionIds: ['rq-0-11', 'rq-0-12', 'rq-0-13', 'rq-0-15', 'rq-0-33'],
		relatedBOMIds: ['bom-0-3'],
		threadId: 'isru-materials',
		riskIfFail: 'project-ending',
		fallbackApproach:
			'Increase rotation rate for higher gravity (0.3-0.5g), approaching terrestrial metallurgical conditions. Increases Coriolis effects and structural loads but further reduces process uncertainty.'
	},
	{
		id: 'cryocooler-scaling',
		technology: 'Flight Cryocoolers at 100-500W Cooling (20K)',
		description:
			'Active cryogenic cooling at the hundred-watt scale for zero-boiloff LH2 storage. Two-stage architecture (80K intercept + 20K cold stage) per rq-0-30 deliberation.',
		currentTRL: 4,
		currentTRLMax: 5,
		targetTRL: 7,
		evidence:
			'NASA GRC ZBO series: Plachta 2003/2004/2017 demonstrated ground-based ZBO. Notardonato 2017: 13+ months ZBO on 125,000L LH2 tank at KSC. Plachta 2018: 20K cryocooler development. rq-0-30 deliberation (2026): 10-20kW total for full tank farm is <1% of station power. Ross JPL Cryocooler Compendium provides flight heritage database.',
		experimentsNeeded: [
			'Ground demo: 50-100W reverse-Brayton at 20K with flight-like interfaces',
			'Two-stage system integration (80K + 20K) at depot scale',
			'LEO flight demonstration on dedicated cryogenic testbed',
			'Long-duration (2+ year) performance characterization in space'
		],
		yearsToTarget: 5,
		yearsToTargetMax: 8,
		relatedQuestionIds: ['rq-0-49', 'rq-0-30', 'rq-0-48'],
		relatedBOMIds: ['bom-0-3', 'bom-0-6'],
		threadId: 'cryogenic-storage',
		riskIfFail: 'architecture-change',
		fallbackApproach:
			'Oversize sunshield to further reduce heat leak, reducing cryocooler requirements. rq-0-30 deliberation concluded storable propellants carry unacceptable 30-40% Isp penalty.'
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
			'Magnetically shielded Hall thrusters at 100+ kW array power for cargo transport between NEAs and L4/L5. HERMeS/AEPS program provides flight development path.',
		currentTRL: 6,
		currentTRLMax: 7,
		targetTRL: 8,
		evidence:
			'HERMeS 12.5 kW magnetically shielded Hall thruster: 3,570-hour wear test with zero channel erosion (Frieman AIAA-2019-3895). Mikellides 2014: magnetic shielding physics validated. AEPS flight program for Gateway PPE at TRL 8-9. NEXT ion thruster: >50,000 hours ground test. Goebel & Katz textbook: lifetime physics. Starlink fleet provides operational Hall thruster statistics.',
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
			'Thermal extraction of water from C-type NEA regolith (CI/CM chondrite, ~10% water). Two approaches: mechanical excavation + thermal processing, or optical mining (concentrated solar). Paper 05 Monte Carlo: NEA preferred over lunar in 90% of scenarios.',
		currentTRL: 3,
		currentTRLMax: 4,
		targetTRL: 7,
		evidence:
			'OSIRIS-REx Bennu sample (2024): CI-chondrite composition with abundant hydrated phyllosilicates, 10%+ water. Glavin 2025: more volatile-rich than Ryugu. McCoy 2025: evaporite minerals from ancient brine. Sercel NIAC: 8kW optical mining demo on CI simulant. Metzger et al.: physics-based thermal extraction model. Paper 05 simulation: NEA median $3,333/kg vs Lunar $4,845/kg to L4/L5.',
		experimentsNeeded: [
			'Lab extraction from actual Bennu sample material (coordinate with OSIRIS-REx team)',
			'Optical vs mechanical extraction efficiency comparison at 10+ kg scale',
			'Microgravity volatile capture and water purification demo',
			'Prototype ISRU plant processing 1+ kg/day of CI chondrite simulant',
			'Asteroid proximity mission with in-situ extraction experiment'
		],
		yearsToTarget: 8,
		yearsToTargetMax: 12,
		relatedQuestionIds: ['rq-0-27', 'rq-0-33', 'rq-0-40', 'rq-0-6'],
		relatedBOMIds: ['bom-0-6', 'bom-0-3'],
		threadId: 'isru-materials',
		riskIfFail: 'project-ending',
		fallbackApproach:
			'Source water from lunar poles. Paper 05 shows lunar is 34% more expensive but viable. Maintains hedge capability per recommended strategy.'
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
		technology: 'Modular Deployable Sunshield for Cryogenic Depot',
		description:
			'3-layer membrane sunshield, ~60m class, assembled incrementally from 12 gore-shaped segments over 3-4 deliveries. Per rq-0-47 deliberation: reduces solar input by 3 orders of magnitude.',
		currentTRL: 6,
		currentTRLMax: 7,
		targetTRL: 8,
		evidence:
			'JWST 21m x 14m 5-layer sunshield at L2 (flight heritage). ULA ACES depot concept with deployable sunshield (Kutter AIAA-2008-7644). ULA patent US20100187365A1 provides engineering specs. rq-0-47 deliberation (2026): modular 3-layer, 10-13 tonnes, >99.99% flux blockage even with micrometeoroid damage. 10-year membrane replacement cycle.',
		experimentsNeeded: [
			'Cone vs planar disk geometry trade study with FEA at 60m scale',
			'Gore-segment robotic assembly demonstration',
			'Thermal performance with 3-layer configuration in simulated L4/L5',
			'UV degradation characterization of polyimide membranes over 10+ years'
		],
		yearsToTarget: 4,
		yearsToTargetMax: 6,
		relatedQuestionIds: ['rq-0-47', 'rq-0-30'],
		relatedBOMIds: ['bom-0-3', 'bom-0-6'],
		threadId: 'cryogenic-storage',
		riskIfFail: 'cost-increase',
		fallbackApproach:
			'Rely more heavily on active cooling. rq-0-30 showed 10-20kW is sufficient even with modest sunshield.'
	},
	{
		id: 'mli-long-duration',
		technology: 'LBMLI with Active Cooling for 20+ Year Depot Life',
		description:
			'Load-Bearing MLI with 2-3 actively cooled intermediate shields, designed for 7-10 year replacement cycles. Per rq-0-48 deliberation: accepts 2-3.5x degradation over 20 years and designs around it.',
		currentTRL: 5,
		currentTRLMax: 6,
		targetTRL: 7,
		evidence:
			'LDEF: 5.7-year space exposure dataset (NASA SP-3134/3141/3154). MISSE: current-era ISS materials data. Fesmire (NASA KSC): MLI testing methodology. de Groh (NASA GRC): polymer degradation models. Gilmore textbook Ch.4: effective emissivity data. rq-0-48 deliberation (2026): LBMLI preferred for structural consistency and active cooling integration; 3-regime degradation model defined; design for maintainability with embedded monitoring.',
		experimentsNeeded: [
			'LBMLI polymer spacer column testing under L4/L5-representative UV + radiation',
			'Active intermediate shield integration with LBMLI stack',
			'Micrometeoroid penetration thermal impact characterization through LBMLI',
			'Robotic outer-layer replacement demonstration',
			'Embedded thermal monitoring sensor array validation'
		],
		yearsToTarget: 4,
		yearsToTargetMax: 6,
		relatedQuestionIds: ['rq-0-48', 'rq-0-30'],
		relatedBOMIds: ['bom-0-3'],
		threadId: 'cryogenic-storage',
		riskIfFail: 'cost-increase',
		fallbackApproach:
			'Size cryocoolers to 4x lab performance and accept higher power draw. Power is more readily augmented on-orbit than MLI mechanical hardware.'
	},
	{
		id: 'electrolysis-microgravity',
		technology: 'Industrial Microgravity Water Electrolysis',
		description:
			'Splitting water into hydrogen and oxygen at industrial rates (tonnes/year) in microgravity, using permanent magnet passive phase separation (Nature Chemistry 2025 breakthrough).',
		currentTRL: 4,
		currentTRLMax: 5,
		targetTRL: 7,
		evidence:
			'Akay/Romero-Calvo 2025 (Nature Chemistry): permanent magnets achieve 240% current density improvement via diamagnetic buoyancy + MHD forces, with passive gas-liquid separation. Romero-Calvo 2022 (npj Microgravity): drop tower validation. Stuttgart IRS ROMEO satellite PEM electrolyzer for orbital demo (2025-2026). ISS ECLSS provides baseline small-scale electrolysis heritage.',
		experimentsNeeded: [
			'ROMEO satellite orbital demo: PEM electrolyzer with magnetic separation',
			'Scale-up from lab prototype to 1kW system with magnetic phase separation',
			'Prototype system processing 10+ kg/day water with magnet-assisted separation',
			'Long-duration (1+ year) electrode degradation under magnetic field',
			'Integration with water extraction and cryogenic propellant storage'
		],
		yearsToTarget: 6,
		yearsToTargetMax: 9,
		relatedQuestionIds: ['rq-0-33', 'rq-0-14', 'rq-0-27'],
		relatedBOMIds: ['bom-0-6'],
		threadId: 'propulsion-transport',
		riskIfFail: 'architecture-change',
		fallbackApproach:
			'Add centrifuge or rotation to electrolysis module. Now less likely to be needed given magnetic separation breakthrough eliminates primary barrier.'
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
