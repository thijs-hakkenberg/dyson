/**
 * March 2026 decision gates (history).
 *
 * Retired by D-02 and the WP-A gate proposal (reconciliation/phase-0/trl/, October 2026). Kept
 * verbatim as the record of what the site said; `RETIRED_GATES` in decision-gates.ts adds the
 * reason and what replaced each gate. Do not edit the content below.
 */

import type { DecisionGate } from './decision-gates';

export const MARCH_2026_GATES: DecisionGate[] = [
	{
		id: 'gate-1',
		name: 'Microgravity Materials Processing Viability',
		description:
			'Can we process asteroid-derived materials in microgravity at quality levels sufficient for structural and electronic applications? This is the single most important decision gate — if microgravity metallurgy cannot scale, the entire ISRU architecture must change.',
		decisionMonth: 36,
		status: 'in-progress',
		passOutcome:
			'Commit to microgravity processing station design. Proceed with detailed engineering of smelting, refining, and fabrication modules.',
		failOutcome:
			'Redesign processing station with artificial gravity (rotation). Adds 2-3 years and $2-5B to station cost. Alternatively, explore Earth-launched prefabricated components for initial phases.',
		criteria: [
			{
				id: 'gate-1-c1',
				description: 'Microgravity metal melting and solidification at 100g+ scale',
				metric: 'Successful ISS experiment producing structural-quality metal samples ≥100g',
				currentEvidence: 'Small-scale melting demonstrated; no structural-quality samples produced',
				met: false
			},
			{
				id: 'gate-1-c2',
				description: 'Zone refining achieves 4N+ purity in microgravity',
				metric: 'Silicon samples refined to ≥99.99% purity in microgravity conditions',
				currentEvidence: 'Terrestrial zone refining well-characterized; microgravity advantages predicted but not demonstrated',
				met: false
			},
			{
				id: 'gate-1-c3',
				description: 'Slag management approach validated',
				metric: 'Demonstrated method for containing and recycling slag in microgravity without contamination',
				currentEvidence: 'Conceptual approaches identified; no microgravity slag handling tested',
				met: false
			}
		],
		relatedQuestionIds: ['rq-0-11', 'rq-0-12', 'rq-0-13', 'rq-0-15'],
		relatedTRLIds: ['microgravity-metallurgy', 'in-space-silicon-purification'],
		threadId: 'isru-materials',
		gatedDecisions: [
			'Processing station gravity architecture (microgravity vs rotational)',
			'Solar cell sourcing strategy (in-situ fabrication vs Earth-launched)',
			'Structural member manufacturing approach'
		]
	},
	{
		id: 'gate-2',
		name: 'Cryogenic Propellant Architecture Selection',
		description:
			'Does the zero-boiloff (ZBO) cryogenic propellant architecture close within the station power budget? Determines whether to proceed with LH2/LOX or switch to storable propellants.',
		decisionMonth: 30,
		status: 'evidence-gathering',
		passOutcome:
			'Validate LH2/LOX architecture with ZBO. Size cryocooler, sunshield, and MLI for propellant depot. Allocate power budget.',
		failOutcome:
			'Switch to storable propellants (MMH/NTO or in-situ synthesized alternatives). Eliminates cryogenic infrastructure but reduces Isp by ~30% and requires different ISRU chemistry.',
		criteria: [
			{
				id: 'gate-2-c1',
				description: 'Flight cryocooler demonstrates 50W+ cooling at 20K',
				metric: 'Ground or flight demonstration of 50W+ reverse-Brayton or pulse-tube cooler at 20K',
				currentEvidence: 'NASA GODU-LH2 demonstrated ground-based ZBO with 20W-class cooler. No 50W+ flight demo.',
				met: false
			},
			{
				id: 'gate-2-c2',
				description: 'ZBO power budget fits within station allocation',
				metric: 'Total cryogenic system power (cryocooler + monitoring + pumps) ≤15% of station power budget',
				currentEvidence: 'Preliminary analysis suggests 8-20% depending on tank size and insulation quality',
				met: false
			},
			{
				id: 'gate-2-c3',
				description: 'MLI degradation rate acceptable for 10-year depot life',
				metric: 'MLI effective emissivity increase <50% over 10-year simulated L4/L5 exposure',
				currentEvidence: 'Limited long-duration MLI data; L4/L5 avoids LEO atomic oxygen but micrometeorite effects unknown',
				met: false
			}
		],
		relatedQuestionIds: ['rq-0-30', 'rq-0-47', 'rq-0-48', 'rq-0-49'],
		relatedTRLIds: ['cryocooler-scaling', 'sunshield-deployment', 'mli-long-duration'],
		threadId: 'cryogenic-storage',
		gatedDecisions: [
			'Propellant type (cryogenic vs storable)',
			'Station power budget allocation',
			'Propellant depot architecture and sizing',
			'Transport vehicle engine selection'
		]
	},
	{
		id: 'gate-3',
		name: 'ISRU Water Extraction Rate Validation',
		description:
			'Can we extract water from asteroid regolith at rates sufficient to support propellant production targets? This determines whether in-situ propellant production is viable or if propellant must be supplied from Earth or lunar sources.',
		decisionMonth: 48,
		status: 'not-started',
		passOutcome:
			'Validate ISRU propellant production timeline. Size extraction, purification, and electrolysis plant for target throughput.',
		failOutcome:
			'Source water from lunar poles (higher extraction TRL). Adds Earth-Moon transport leg, increasing propellant cost 3-5x but providing more certain supply.',
		criteria: [
			{
				id: 'gate-3-c1',
				description: 'Water extraction rate from analog material ≥1 kg/day per extraction unit',
				metric: 'Demonstrated extraction from CI/CM chondrite analog at ≥1 kg H2O per day',
				currentEvidence: 'Lab-scale extraction demonstrated at gram/hour rates',
				met: false
			},
			{
				id: 'gate-3-c2',
				description: 'Water purity sufficient for PEM electrolysis',
				metric: 'Extracted water meets PEM electrolyzer feedstock requirements after single-stage purification',
				currentEvidence: 'Unknown — asteroid water purity post-extraction not characterized',
				met: false
			},
			{
				id: 'gate-3-c3',
				description: 'Energy cost per kg water extraction within budget',
				metric: 'Thermal/microwave extraction energy ≤5 kWh per kg H2O extracted',
				currentEvidence: 'Theoretical models suggest 2-8 kWh/kg depending on hydration state',
				met: false
			}
		],
		relatedQuestionIds: ['rq-0-27', 'rq-0-33', 'rq-0-40', 'rq-0-14'],
		relatedTRLIds: ['isru-water-extraction', 'electrolysis-microgravity'],
		threadId: 'isru-materials',
		gatedDecisions: [
			'Propellant sourcing (asteroid vs lunar vs Earth)',
			'Water extraction plant sizing',
			'ISRU bootstrap sequence timing',
			'Phase 0 timeline validation'
		]
	},
	{
		id: 'gate-4',
		name: 'Asteroid Target Selection',
		description:
			'Have we identified and characterized suitable near-Earth asteroid targets with confirmed compositions supporting the mining and ISRU architecture?',
		decisionMonth: 24,
		status: 'not-started',
		passOutcome:
			'Select primary and backup asteroid targets. Finalize mining robot design for target surface conditions. Plan approach and landing campaigns.',
		failOutcome:
			'Extend prospecting campaign. If no suitable targets found within accessible delta-v budget, consider alternative material sources (lunar, Mars-crossing asteroids with higher delta-v).',
		criteria: [
			{
				id: 'gate-4-c1',
				description: 'At least 3 candidate asteroids with favorable composition confirmed',
				metric: 'Spectroscopic + flyby data confirming C-type or similar water-bearing composition for ≥3 NEAs within delta-v budget',
				currentEvidence: 'Telescopic data identifies thousands of candidates; few have confirmed compositions',
				met: false
			},
			{
				id: 'gate-4-c2',
				description: 'Primary target physical characterization sufficient for mining design',
				metric: 'Rotation rate, shape model, surface properties, and size known to engineering accuracy',
				currentEvidence: 'Bennu and Ryugu well-characterized; target asteroids likely not yet surveyed',
				met: false
			},
			{
				id: 'gate-4-c3',
				description: 'Round-trip delta-v within transport vehicle capability',
				metric: 'Total mission delta-v (Earth → asteroid → L4/L5) ≤8 km/s for cargo vehicle',
				currentEvidence: 'Monte Carlo constellation sizing model estimates sufficient candidates exist',
				met: false
			}
		],
		relatedQuestionIds: ['rq-0-1', 'rq-0-3', 'rq-0-5', 'rq-0-39'],
		relatedTRLIds: ['autonomous-asteroid-prospecting'],
		threadId: 'prospecting',
		gatedDecisions: [
			'Mining robot mechanical design (surface conditions)',
			'Transport vehicle mission profiles',
			'Anchoring system design',
			'ISRU plant feedstock assumptions'
		]
	},
	{
		id: 'gate-5',
		name: 'Phase 0 Preliminary Design Review',
		description:
			'Comprehensive review of all Phase 0 subsystems to confirm the integrated architecture is feasible, affordable, and achievable within the timeline. This is the final gate before committing to detailed design and hardware procurement.',
		decisionMonth: 60,
		status: 'not-started',
		passOutcome:
			'Proceed to Phase 0 detailed design and procurement. Begin long-lead hardware orders. Finalize partnerships and launch contracts.',
		failOutcome:
			'Identify specific subsystems requiring redesign. Extend Phase 0 timeline. Potentially descope initial capability (fewer robots, smaller station, limited ISRU).',
		criteria: [
			{
				id: 'gate-5-c1',
				description: 'All key technologies at TRL ≥5',
				metric: 'Every technology in the TRL assessment has reached TRL 5 or higher, or has an approved waiver with risk mitigation',
				currentEvidence: 'Multiple technologies at TRL 2-4; significant advancement needed',
				met: false
			},
			{
				id: 'gate-5-c2',
				description: 'Mass budget closes with ≥20% margin',
				metric: 'Total system mass (station + robots + vehicles + consumables) within launch capability with 20% margin',
				currentEvidence: 'Preliminary mass budgets exist with 2-4x uncertainty ranges',
				met: false
			},
			{
				id: 'gate-5-c3',
				description: 'Power budget closes with ≥15% margin',
				metric: 'Station power generation exceeds all subsystem demands with 15% margin',
				currentEvidence: 'Preliminary power budgets exist; cryogenic and ISRU loads not yet firm',
				met: false
			},
			{
				id: 'gate-5-c4',
				description: 'Cost estimate confidence at ±30% or better',
				metric: 'Total Phase 0 cost estimate uncertainty reduced from ±50% to ±30% through parametric modeling and vendor quotes',
				currentEvidence: 'Current estimates: $8B-$15B range (~±30% around midpoint but low confidence)',
				met: false
			},
			{
				id: 'gate-5-c5',
				description: 'Gates 1-4 all passed or waived',
				metric: 'All preceding decision gates have been evaluated and either passed or received approved waivers',
				currentEvidence: 'Gates 1-4 all in early stages',
				met: false
			}
		],
		relatedQuestionIds: [
			'rq-0-11', 'rq-0-15', 'rq-0-30', 'rq-0-6', 'rq-0-7',
			'rq-0-14', 'rq-0-27', 'rq-0-28', 'rq-0-26'
		],
		relatedTRLIds: [
			'microgravity-metallurgy', 'cryocooler-scaling', 'asteroid-mining-bucket-wheel',
			'isru-water-extraction', 'solar-electric-propulsion', 'in-space-silicon-purification'
		],
		threadId: 'governance-integration',
		gatedDecisions: [
			'Phase 0 go/no-go for detailed design',
			'Budget commitment authorization',
			'Launch vehicle selection and contracts',
			'International partnership agreements',
			'Phase 0 → Phase 1 transition criteria'
		]
	}
];
