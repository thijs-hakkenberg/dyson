/**
 * Where each BOM item lives in the solar system.
 *
 * This is a spatial reading of the consensus documents in
 * static/content/bom-specs/{phase}/{slug}/consensus.md. Each placement records
 * the baseline position and the model-attributed alternatives so that the
 * orrery can render divergent views as ghost geometry rather than resolving
 * them. When a consensus doc gives no location, `anchor` is omitted and the
 * item appears only in the inspector/palette.
 */

import type { LagrangePoint, PlanetId } from './ephemeris';

export type ModelName = 'Claude' | 'Gemini' | 'GPT';

export type Anchor =
	/** Heliocentric band between two radii (AU), near the ecliptic */
	| { kind: 'band'; rMin: number; rMax: number; thicknessDeg?: number }
	| { kind: 'lagrange'; body: PlanetId; point: LagrangePoint }
	| { kind: 'body'; body: PlanetId | 'moon' }
	/** Attached to N highest-value objects of the synthetic NEA population */
	| { kind: 'nea'; count: number }
	| { kind: 'shells'; layers: { rAU: number; tempK: number }[] }
	/** Spherical cap (statite mirror) on the thrust axis */
	| { kind: 'cap'; rAU: number; halfAngleDeg: number }
	/** Point on the thrust axis at a distance */
	| { kind: 'axis'; rAU: number };

export interface Alternative {
	anchor: Anchor;
	models: ModelName[];
	note: string;
}

export interface Placement {
	bomId: string;
	slug: string;
	phaseId: string;
	anchor?: Anchor;
	/** Models whose proposal the baseline matches (empty = synthesis) */
	baselineModels: ModelName[];
	/** True when the consensus doc explicitly leaves the location open */
	unresolved?: boolean;
	note: string;
	alternatives: Alternative[];
	/** Rendering hint */
	visual: 'marker' | 'swarm' | 'shells' | 'mirror' | 'jet' | 'band' | 'none';
}

/** Log-log interpolation between consensus cascade endpoints (1200 K @ 0.5 AU, 20 K @ 25 AU). */
export function cascadeTemperature(rAU: number): number {
	const k = Math.log(20 / 1200) / Math.log(25 / 0.5);
	return 1200 * Math.pow(rAU / 0.5, k);
}

const shell = (rAU: number) => ({ rAU, tempK: cascadeTemperature(rAU) });

export const PLACEMENTS: Placement[] = [
	// ── Phase 0 ────────────────────────────────────────────────────────────
	{
		bomId: 'bom-0-1',
		slug: 'prospecting-satellites',
		phaseId: 'phase-0',
		anchor: { kind: 'nea', count: 32 },
		baselineModels: [],
		note: 'Survey fleet assigned to candidate NEAs. Assignment is illustrative; the NEA population is a statistical synthetic sample, not catalogued objects.',
		alternatives: [],
		visual: 'marker'
	},
	{
		bomId: 'bom-0-2',
		slug: 'mining-robots',
		phaseId: 'phase-0',
		anchor: { kind: 'nea', count: 4 },
		baselineModels: [],
		note: 'Mining operations at the highest-value synthetic NEAs (illustrative site selection).',
		alternatives: [],
		visual: 'marker'
	},
	{
		bomId: 'bom-0-3',
		slug: 'material-processing-station',
		phaseId: 'phase-0',
		anchor: { kind: 'nea', count: 1 },
		baselineModels: ['Claude', 'Gemini', 'GPT'],
		note: 'Phase 0 re-assessment (round 2, 2026-10): all three models co-locate beneficiation and primary processing at the target NEA and ship product, not ore. The central 50,000 t/yr station at Sun–Earth L4/L5 is abandoned. GPT: "favoured but not universally optimal".', // stale-ok: names the superseded design
		alternatives: [
			{
				anchor: { kind: 'lagrange', body: 'earth', point: 'L1' },
				models: ['Claude'],
				note: 'Claude keeps a central station near SEL1 fed with ≥20:1 concentrate as an alternative; Gemini\'s own weighted scoring rates SEL1 marginally higher.'
			}
		],
		visual: 'marker'
	},
	{
		bomId: 'bom-0-4',
		slug: 'transport-vehicles',
		phaseId: 'phase-0',
		baselineModels: [],
		note: 'MW-class SEP cargo tugs (1–2.5 MWe each) carry product from the processing plant at the NEA to the delivery node (SEL1, D-04 interim). Propellant: none selected; iodine reference, argon alternate (D-05 interim).',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-0-5',
		slug: 'solar-power-arrays',
		phaseId: 'phase-0',
		baselineModels: [],
		note: 'Site power at the NEA (HV tethers to the robots, distributed storage); tug arrays belong to the tugs. Site scale differs by model (round 2).',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-0-6',
		slug: 'ispp-systems',
		phaseId: 'phase-0',
		baselineModels: [],
		note: 'Water pilot at the NEA, only if the target is C-type (D-05 interim). No production LOX/LH₂ in Phase 0.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-0-7',
		slug: 'organizational-infrastructure',
		phaseId: 'phase-0',
		anchor: { kind: 'body', body: 'earth' },
		baselineModels: [],
		note: 'Governance, legal and coordination infrastructure — Earth-based.',
		alternatives: [],
		visual: 'none'
	},
	// ── Phase 1 ────────────────────────────────────────────────────────────
	{
		bomId: 'bom-1-1',
		slug: 'collector-units',
		phaseId: 'phase-1',
		anchor: { kind: 'band', rMin: 0.98, rMax: 1.02, thicknessDeg: 2 },
		baselineModels: ['GPT'],
		note: 'Consensus: begin Phase 1 at 1.0 AU to reduce thermal risk, migrate to higher-flux orbits (~0.5 AU) in Phase 2.',
		alternatives: [
			{
				anchor: { kind: 'band', rMin: 0.49, rMax: 0.51 },
				models: ['Claude'],
				note: '0.5 AU — 5,480 W/m², ~52 MW per unit'
			},
			{
				anchor: { kind: 'band', rMin: 0.29, rMax: 0.31 },
				models: ['Gemini'],
				note: '0.3 AU — ~15,000 W/m², ~44 MW per unit'
			}
		],
		visual: 'swarm'
	},
	{
		bomId: 'bom-1-2',
		slug: 'pv-blanket-arrays',
		phaseId: 'phase-1',
		baselineModels: [],
		note: 'Integrated into collector units in the Phase 1 swarm.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-1-3',
		slug: 'assembly-robots',
		phaseId: 'phase-1',
		baselineModels: [],
		note: 'Operate at the Assembly Node Hub.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-1-4',
		slug: 'assembly-node',
		phaseId: 'phase-1',
		anchor: { kind: 'lagrange', body: 'earth', point: 'L1' },
		baselineModels: ['Claude'],
		note: 'Consensus: heliocentric ~1 AU for Phase 1, shown at Sun–Earth L1 (Claude). Inner-system migration planned for later phases.',
		alternatives: [
			{
				anchor: { kind: 'lagrange', body: 'mercury', point: 'L1' },
				models: ['Gemini'],
				note: 'Sun–Mercury L1 (~0.39 AU), co-located with Mercury mass driver'
			},
			{
				anchor: { kind: 'band', rMin: 0.7, rMax: 1.0 },
				models: ['GPT'],
				note: 'Heliocentric logistics corridor 0.7–1.0 AU'
			}
		],
		visual: 'marker'
	},
	{
		bomId: 'bom-1-5',
		slug: 'mass-drivers',
		phaseId: 'phase-1',
		anchor: { kind: 'body', body: 'moon' },
		baselineModels: [],
		note: 'Consensus: pilot coilgun on the lunar polar surface (300–500 m subscale), then 1.8–3.4 km full-scale track.',
		alternatives: [
			{
				anchor: { kind: 'body', body: 'mercury' },
				models: ['Gemini'],
				note: 'Mercury surface mass driver feeding an inner-system node'
			}
		],
		visual: 'marker'
	},
	{
		bomId: 'bom-1-6',
		slug: 'orbital-tugs',
		phaseId: 'phase-1',
		baselineModels: [],
		note: 'Cargo transfer between mass-driver catch points and the assembly node.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-1-7',
		slug: 'swarm-control-system',
		phaseId: 'phase-1',
		baselineModels: [],
		note: 'Phase 1 swarm size: Claude 10,000 @ 0.5 AU; Gemini 10,000 @ 0.9 AU; GPT 1,000 near 1 AU. Control station at L1 or co-orbital.',
		alternatives: [],
		visual: 'none'
	},
	// ── Phase 2 ────────────────────────────────────────────────────────────
	{
		bomId: 'bom-2-1',
		slug: 'collector-satellites',
		phaseId: 'phase-2',
		anchor: { kind: 'band', rMin: 0.5, rMax: 0.8, thicknessDeg: 8 },
		baselineModels: [],
		note: 'Consensus compromise: 0.5–0.8 AU operating orbit.',
		alternatives: [
			{
				anchor: { kind: 'band', rMin: 0.49, rMax: 0.51 },
				models: ['Claude'],
				note: '0.5 AU heliocentric (4× flux)'
			},
			{
				anchor: { kind: 'band', rMin: 0.29, rMax: 0.31 },
				models: ['Gemini'],
				note: '0.3 AU near Mercury (11× flux)'
			},
			{
				anchor: { kind: 'band', rMin: 0.99, rMax: 1.01 },
				models: ['GPT'],
				note: '1.0 AU Earth-like orbit'
			}
		],
		visual: 'swarm'
	},
	{
		bomId: 'bom-2-2',
		slug: 'maintenance-drones',
		phaseId: 'phase-2',
		baselineModels: [],
		note: 'Distributed through the Phase 2 swarm.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-2-3',
		slug: 'manufacturing-expansion',
		phaseId: 'phase-2',
		baselineModels: [],
		note: 'Self-replicating facilities; location not fixed in consensus.',
		alternatives: [],
		visual: 'none'
	},
	// ── Phase 3a — Matrioshka Brain ────────────────────────────────────────
	{
		bomId: 'bom-3a-1',
		slug: 'computational-substrate-tiles',
		phaseId: 'phase-3a',
		anchor: { kind: 'shells', layers: [0.5, 1.0, 2.5, 8, 25].map(shell) },
		baselineModels: ['Claude'],
		unresolved: true,
		note: 'Shell radii are an open question. Shown: Opus 5-layer proposal (0.5, 1, 2.5, 8, 25 AU). Temperatures interpolated log-log between consensus cascade endpoints (1200 K @ 0.5 AU → 20 K @ 25 AU); colours are false-colour for sub-1000 K layers.',
		alternatives: [
			{
				anchor: { kind: 'shells', layers: [1.5, 3.0].map(shell) },
				models: ['Gemini'],
				note: 'Layers at 1.5 and 3.0 AU'
			},
			{
				anchor: { kind: 'band', rMin: 0.3, rMax: 0.7 },
				models: ['GPT'],
				note: 'First layers at 0.3–0.7 AU, outer radii unspecified'
			}
		],
		visual: 'shells'
	},
	{
		bomId: 'bom-3a-2',
		slug: 'inter-layer-optical-backbone',
		phaseId: 'phase-3a',
		baselineModels: [],
		note: 'Relay-staged optical corridors between shells; minutes-to-hours latency across 0.3–25 AU.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-3a-3',
		slug: 'thermal-management-radiator-systems',
		phaseId: 'phase-3a',
		baselineModels: [],
		note: 'Integrated into each shell layer; pathfinder demos at Sun–Earth L2.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-3a-4',
		slug: 'self-replicating-manufacturing-foundries',
		phaseId: 'phase-3a',
		anchor: { kind: 'band', rMin: 2.0, rMax: 3.0, thicknessDeg: 10 },
		baselineModels: [],
		note: 'Consensus: seed fleet in the main asteroid belt (2–3 AU) with fission baseload power.',
		alternatives: [],
		visual: 'band'
	},
	{
		bomId: 'bom-3a-5',
		slug: 'distributed-computational-os',
		phaseId: 'phase-3a',
		baselineModels: [],
		note: 'Runs across all shells (~0.5–25 AU).',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-3a-6',
		slug: 'feedstock-supply-chain-pipeline',
		phaseId: 'phase-3a',
		anchor: { kind: 'band', rMin: 1.8, rMax: 2.5, thicknessDeg: 6 },
		baselineModels: [],
		note: 'Three-zone supply: inner belt 1.8–2.5 AU → inner shells; main belt 2.5–3.5 AU → mid shells; 5–50 AU local sourcing for outer shells.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-3a-7',
		slug: 'inter-layer-power-distribution-network',
		phaseId: 'phase-3a',
		baselineModels: [],
		note: 'Relay-staged power corridors with 0.2–1 AU hops, co-located with optical backbone.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-3a-8',
		slug: 'shell-construction-maintenance-swarm',
		phaseId: 'phase-3a',
		baselineModels: [],
		note: 'Operates across the shell cascade.',
		alternatives: [],
		visual: 'none'
	},
	// ── Phase 3b — Stellar Engine ──────────────────────────────────────────
	{
		bomId: 'bom-3b-1',
		slug: 'shkadov-mirror-array',
		phaseId: 'phase-3b',
		anchor: { kind: 'cap', rAU: 0.1, halfAngleDeg: 60 },
		baselineModels: ['Claude', 'Gemini'],
		unresolved: true,
		note: 'Standoff 0.1 AU (Claude, Gemini) vs 1.0 AU (GPT) is an open trade. Cap half-angle: Claude α = 60°, Gemini α ≈ 50°, GPT starts at f = 0.5–1% of sphere. Thrust ~10¹⁷–10¹⁸ N, acceleration ~10⁻¹³–10⁻¹² m/s².',
		alternatives: [
			{
				anchor: { kind: 'cap', rAU: 1.0, halfAngleDeg: 30 },
				models: ['GPT'],
				note: '1.0 AU standoff, manageable thermal/plasma environment'
			},
			{
				anchor: { kind: 'cap', rAU: 0.1, halfAngleDeg: 50 },
				models: ['Gemini'],
				note: '~1.5 sr cap (α ≈ 50°)'
			}
		],
		visual: 'mirror'
	},
	{
		bomId: 'bom-3b-2',
		slug: 'thermonuclear-jet-engine',
		phaseId: 'phase-3b',
		anchor: { kind: 'axis', rAU: 1.0 },
		baselineModels: [],
		note: 'Caplan-type thermonuclear jet on the thrust axis. Position and jet geometry shown schematically.',
		alternatives: [],
		visual: 'jet'
	},
	{
		bomId: 'bom-3b-3',
		slug: 'solar-wind-collectors',
		phaseId: 'phase-3b',
		anchor: { kind: 'band', rMin: 0.1, rMax: 0.15, thicknessDeg: 20 },
		baselineModels: [],
		note: 'Consensus: primary collection orbit 0.1–0.15 AU (solar-wind mass flux 100–450× that at 1 AU).',
		alternatives: [],
		visual: 'band'
	},
	{
		bomId: 'bom-3b-4',
		slug: 'mass-lifting-systems',
		phaseId: 'phase-3b',
		anchor: { kind: 'band', rMin: 0.045, rMax: 0.055, thicknessDeg: 30 },
		baselineModels: ['Gemini'],
		note: 'Gemini places lifting nodes at 0.05 AU (~10.7 R☉). Most speculative system in Phase 3b.',
		alternatives: [],
		visual: 'band'
	},
	{
		bomId: 'bom-3b-5',
		slug: 'helium-separation-plant',
		phaseId: 'phase-3b',
		anchor: { kind: 'band', rMin: 0.05, rMax: 0.15, thicknessDeg: 6 },
		baselineModels: [],
		note: 'Consensus: 0.05–0.15 AU, co-located with collection infrastructure.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-3b-6',
		slug: 'em-accelerators',
		phaseId: 'phase-3b',
		baselineModels: [],
		note: 'Part of the engine fuel/propellant chain.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-3b-7',
		slug: 'dyson-integration-layer',
		phaseId: 'phase-3b',
		baselineModels: [],
		note: 'Software/infrastructure coupling engine and swarm; links below ~0.3 AU.',
		alternatives: [],
		visual: 'none'
	},
	{
		bomId: 'bom-3b-8',
		slug: 'thrust-stabilization',
		phaseId: 'phase-3b',
		baselineModels: [],
		note: 'Metrology across a ~1–2 AU operational volume; GPT: 48-node constellation within 1–8 AU; another proposal extends observatories to 10,000 AU.',
		alternatives: [],
		visual: 'none'
	}
];

export function placementFor(bomId: string): Placement | undefined {
	return PLACEMENTS.find((p) => p.bomId === bomId);
}
