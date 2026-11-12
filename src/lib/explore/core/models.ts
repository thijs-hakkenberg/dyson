/**
 * Detailed element models: physical dimensions for each BOM item, taken from
 * the consensus documents (static/content/bom-specs/<phase>/<slug>/consensus.md)
 * and, where the consensus quotes them, the individual model specs.
 *
 * Each item maps to a procedural archetype (scene/models/build.ts) with
 * parameters in metres. Where the models disagree on size, every position is
 * kept as a variant and drawn as a ghost at true relative scale beside the
 * main model. When there is no consensus baseline, the main model's size is
 * the geometric mean of the proposals and is flagged as such (`sizeBasis`).
 */

import type { ModelName } from './placements';

export type Archetype =
	| 'smallsat' // bus + wings (+ dish / telescope)
	| 'rover' // legged / wheeled surface robot with tooling
	| 'arms' // free-flying manipulator robot
	| 'membrane' // thin-film sheet on booms (collectors, blankets, mirrors, radiators, rectennas)
	| 'tile' // thick hexagonal compute tile
	| 'station' // pressurised modules, arrays, radiators, concentrators
	| 'tug' // propulsion stack: tanks, engine, wings, payload
	| 'linear' // rail / coilgun / accelerator / nozzle: long axis with coil rings
	| 'coil'; // superconducting loop(s) with magnetic field lines

export interface ModelParams {
	/** Characteristic size (m): longest dimension of the main structure */
	size: number;
	/** Archetype options */
	shape?: 'hex' | 'square' | 'circle' | 'rect';
	/** Width / length for rect shapes or bodies */
	aspect?: number;
	/** Number of repeated elements (legs, coils, modules, petals) */
	count?: number;
	/** Feature flags */
	dish?: boolean;
	telescope?: boolean;
	reflective?: boolean;
	plume?: boolean;
	surface?: boolean;
	concentrator?: boolean;
	wheel?: boolean;
	rings?: boolean;
	radiator?: boolean;
	anchor?: boolean;
	nozzle?: boolean;
}

export interface ModelVariant {
	label: string;
	model?: ModelName;
	/** Characteristic size (m) */
	size: number;
	note: string;
	/** A different kind of craft: draw the ghost with its own archetype */
	archetype?: Archetype;
	params?: Partial<ModelParams>;
}

export interface ElementModel {
	bomId: string;
	archetype: Archetype;
	params: ModelParams;
	/** How the main size was chosen */
	sizeBasis: 'consensus' | 'geomean' | 'model';
	/** Which model's design the main shape follows, when not consensus */
	after?: ModelName;
	mass: string;
	/** Short dimension summary for the HUD */
	dims: string;
	variants: ModelVariant[];
	/** Callouts: label + position as a fraction of size, in model space */
	callouts: { label: string; at: [number, number, number] }[];
	source: string;
}

const geomean = (...xs: number[]) => Math.exp(xs.reduce((a, x) => a + Math.log(x), 0) / xs.length);
const side = (areaM2: number) => Math.sqrt(areaM2);
const hexAcross = (areaM2: number) => Math.sqrt((2 * areaM2) / (3 * Math.sqrt(3))) * 2;
const circleDia = (areaM2: number) => 2 * Math.sqrt(areaM2 / Math.PI);
/** Size from mass when only mass is given: ρ_eff ~ 300 kg/m³ for spacecraft-like hardware. */
const fromMass = (kg: number, rho = 300) => Math.cbrt(kg / rho);

const SRC = (slug: string) => `bom-specs/${slug}/consensus.md`;

export const ELEMENT_MODELS: ElementModel[] = [
	// ── Phase 0 ─────────────────────────────────────────────────────────────
	// Regenerated consensus, 2026-10-20 (dimensions from the consensus key specifications; per-model
	// specs where the consensus gives none, attributed in `after`).
	{
		bomId: 'bom-0-1',
		archetype: 'smallsat',
		params: { size: 12, aspect: 0.8, dish: true },
		sizeBasis: 'consensus',
		mass: '500–550 kg wet (400–600 kg envelope)',
		dims: 'SEP rendezvous scout; 3.6–4 kW BOL array (~12 m span); 0.5–0.8 m high-gain antenna',
		variants: [{ label: '250 kg impactor scout', model: 'Gemini', size: 7, note: 'Rejected by the consensus: no subsurface sampling, uncontained impactor' }],
		callouts: [
			{ label: 'Solar arrays · 3.6–4 kW BOL', at: [0.38, 0, 0] },
			{ label: 'VNIR/SWIR + thermal-IR remote sensing', at: [0, 0, 0.14] },
			{ label: 'Sampler (anchored lander or arm, T18)', at: [0, -0.18, 0.06] },
			{ label: 'X/Ka high-gain antenna', at: [0, 0.18, -0.06] }
		],
		source: SRC('phase-0/prospecting-satellites')
	},
	{
		bomId: 'bom-0-2',
		archetype: 'rover',
		params: { size: 3.3, count: 6, wheel: false },
		sizeBasis: 'consensus',
		mass: '2.65–3.4 t dry (Claude 2,650 · Gemini 2,800 · GPT 3,400 kg)',
		dims: 'Stowed ~3–3.5 × 2.2–2.4 m; enclosed counter-rotating drums, ~2 t/h nameplate (1–3); 2 kV DC tether, 30 kWh battery',
		variants: [],
		callouts: [
			{ label: 'Enclosed drum head · ~2 t/h', at: [0.5, -0.05, 0] },
			{ label: 'Anchors (≥200 N sustained, T16)', at: [-0.1, -0.2, 0.25] },
			{ label: '2 kV DC power tether', at: [-0.45, 0.05, 0] },
			{ label: 'Sealed transfer hopper', at: [0.2, 0.15, 0] }
		],
		source: SRC('phase-0/mining-robots')
	},
	{
		bomId: 'bom-0-3',
		archetype: 'station',
		// two radiator wings of ~1,500 m² total around a ~10 m process core
		params: { size: 2 * Math.sqrt(1500 / 2) + 10, aspect: 0.5, count: 3, concentrator: false },
		sizeBasis: 'consensus',
		mass: '250–400 t delivered',
		dims: '3 process trains (~0.6 kt/yr nameplate each, N = 2–6); 1,000–2,000 m² of radiator panels; 0.6–2.5 MWe',
		variants: [],
		callouts: [
			{ label: 'Process trains ×3 (carbonyl or melt route)', at: [0, 0, 0] },
			{ label: 'Radiators · 1,000–2,000 m²', at: [-0.42, 0, 0] },
			{ label: 'Enclosed tailings handling (10–20 kt/yr)', at: [0.3, -0.15, 0] },
			{ label: 'Product pallet staging for tugs', at: [0.42, 0.1, 0] }
		],
		source: SRC('phase-0/material-processing-station')
	},
	{
		bomId: 'bom-0-4',
		archetype: 'tug',
		params: { size: geomean(circleDia(3_500), circleDia(4_600), 210), aspect: 0.7 },
		sizeBasis: 'geomean',
		mass: 'Dry: Claude 45 t (38–60) · Gemini 38 t · GPT 70 t (55–85); 100–150 t iodine installed',
		dims: 'Array: Claude ~4,600 m² · Gemini ~3,500 m² · GPT ~16,000 m² spanning 180–240 m; 15–24 × ~100 kW strings',
		variants: [
			{ label: '1.5 MWe BOL, four wings', model: 'Claude', size: circleDia(4_600), note: '~1.1 MWe end of life' },
			{ label: '2.0 MWe to propulsion at 1.3 AU EOL', model: 'GPT', size: 210, note: '~4.8 MW BOL at 1 AU' }
		],
		callouts: [
			{ label: 'Product pallet · 150–300 t', at: [0, 0, 0.42] },
			{ label: 'Sealed iodine cassettes · 100–150 t', at: [0, 0, 0.05] },
			{ label: 'Solar arrays · 1.2–2.0 MWe at 1.3 AU EOL', at: [0.34, 0, -0.1] },
			{ label: 'Hall cluster · 15–24 × ~100 kW', at: [0, 0, -0.48] }
		],
		source: SRC('phase-0/transport-vehicles')
	},
	{
		bomId: 'bom-0-5',
		archetype: 'membrane',
		params: { size: 28, shape: 'rect', aspect: 10 / 28 },
		sizeBasis: 'model',
		after: 'Claude',
		mass: 'Site total depends on illumination class and anchoring',
		dims: 'One roll-out wing 10 × 28 m (2 per ~200 kW unit); site 2–8 MW BOL in 200–500 kW modules',
		variants: [],
		callouts: [
			{ label: 'ROSA-type blanket · ~350 W/m²', at: [0.2, 0, 0.05] },
			{ label: 'Mast and azimuth drive', at: [-0.45, 0, 0] }
		],
		source: `${SRC('phase-0/solar-power-arrays')}; wing dimensions from claude-opus-5-5.md`
	},
	{
		bomId: 'bom-0-6',
		archetype: 'station',
		params: { size: 15, aspect: 0.5, count: 2 },
		sizeBasis: 'consensus',
		mass: '6–10 t dry plus growth',
		dims: 'One flight skid with two isolatable batch retorts; 45–180 m² radiators; ≤100 kWe peak',
		variants: [],
		callouts: [
			{ label: 'Batch retorts ×2', at: [0, 0, 0] },
			{ label: 'Frost-deposition capture train', at: [0.3, 0, 0.1] },
			{ label: 'Radiators · 45–180 m²', at: [-0.4, 0, 0] }
		],
		source: SRC('phase-0/ispp-systems')
	},
	{
		bomId: 'bom-0-12',
		archetype: 'smallsat',
		params: { size: 20, aspect: 0.9, dish: true },
		sizeBasis: 'consensus',
		mass: '~6–10 t dry (Claude ~16 t, Gemini 2.45 t wet)',
		dims: '60–80 kWe BOL; single launch; full-scale crucible, cutter head, canister and docking port',
		variants: [{ label: 'End-to-end subscale', model: 'Gemini', size: 9, note: 'Rejected: 3 kW furnace cannot support a no-waiver TRL 6 claim' }],
		callouts: [
			{ label: 'Centrifugal induction melt cell', at: [0, 0, 0] },
			{ label: 'Containment demonstration experiment', at: [0.2, -0.15, 0] },
			{ label: 'Arrays · 60–80 kWe', at: [0.4, 0, 0] }
		],
		source: SRC('phase-0/pathfinder-demonstrator')
	},
	{
		bomId: 'bom-0-13',
		archetype: 'station',
		params: { size: 25, aspect: 0.5, count: 2 },
		sizeBasis: 'consensus',
		mass: '25–40 t dry (Gemini 45–65 t)',
		dims: 'Passive warehouse; 60–100 kW BOL; 0.6–1.0 kt initial inventory, berths to grow toward 3 kt',
		variants: [],
		callouts: [
			{ label: 'Product berths (preloaded latches)', at: [0, 0, 0] },
			{ label: 'Independent disposal unit', at: [-0.35, 0, 0.1] },
			{ label: 'Arrays · 60–100 kW', at: [0.4, 0, 0] }
		],
		source: SRC('phase-0/receiving-node')
	},

	// ── Phase 1 ─────────────────────────────────────────────────────────────
	{
		bomId: 'bom-1-1',
		archetype: 'membrane',
		params: { size: geomean(side(10000), hexAcross(6500), side(40)), shape: 'square' },
		sizeBasis: 'geomean',
		mass: 'Claude 1,850 kg · Gemini 85 kg · GPT 69 kg',
		dims: 'Claude 10,000 m² · Gemini 6,500 m² hex · GPT 40 m² tile',
		variants: [
			{ label: '10,000 m² · 52 MW', model: 'Claude', size: side(10000), note: '85 g/m²' },
			{ label: '6,500 m² hex sail · 44 MW', model: 'Gemini', size: hexAcross(6500), note: '~13 g/m²' },
			{ label: '40 m² tile · 10 kW', model: 'GPT', size: side(40), note: '~0.5 kg/m² blanket' }
		],
		callouts: [
			{ label: 'Thin-film PV membrane', at: [0.2, 0, 0.15] },
			{ label: 'Boom & tensioning', at: [0.5, 0, 0.5] },
			{ label: 'Avionics hub · ion/electrospray', at: [0, 0.03, 0] }
		],
		source: SRC('phase-1/collector-units')
	},
	{
		bomId: 'bom-1-2',
		archetype: 'membrane',
		params: { size: geomean(hexAcross(1e6), 1000, side(1200)), shape: 'hex' },
		sizeBasis: 'geomean',
		mass: 'Claude 45,000 kg · Gemini 850 kg · GPT 690 kg',
		dims: 'Claude 1 km² hex · Gemini 1 km dia · GPT 1,200 m²',
		variants: [
			{ label: '1 km² hex · 200 MW', model: 'Claude', size: hexAcross(1e6), note: '45 g/m²' },
			{ label: '1 km circle (spin-stabilised)', model: 'Gemini', size: 1000, note: '850 kg' },
			{ label: '1,200 m² rect · 400 kW', model: 'GPT', size: Math.hypot(40, 30), note: '690 kg' }
		],
		callouts: [
			{ label: 'Independent segments 10–50 m² with MPPT', at: [0.15, 0, 0.1] },
			{ label: 'Perimeter boom', at: [0.48, 0, 0] }
		],
		source: SRC('phase-1/pv-blanket-arrays')
	},
	{
		bomId: 'bom-1-3',
		archetype: 'arms',
		params: { size: geomean(6.5, 1.2, 4) * 1.4, count: 6 },
		sizeBasis: 'geomean',
		mass: 'Heavy: Claude 2,400 kg · GPT 1,200 kg · Gemini 45 kg drones',
		dims: 'Arm reach: Claude 6.5 m · GPT 4 m · Gemini 6 × 3-DOF arms',
		variants: [
			{ label: '"Welder" heavy manipulator', model: 'Claude', size: 6.5 * 1.4, note: '6.5 m reach, 500 kg payload' },
			{ label: '"Weaver" hex drone (swarms into super-bots)', model: 'Gemini', size: 1.2, note: '45 kg' },
			{ label: 'AT-1 Assembly Tug', model: 'GPT', size: 4 * 1.4, note: '4 m reach' }
		],
		callouts: [
			{ label: 'Manipulator arms', at: [0.35, 0.1, 0] },
			{ label: 'End effectors · <1 mm precision', at: [0.5, 0.05, 0.1] },
			{ label: 'Body · cold-gas / EP', at: [0, 0, 0] }
		],
		source: SRC('phase-1/assembly-robots')
	},
	{
		bomId: 'bom-1-4',
		archetype: 'station',
		params: { size: geomean(340, 120, 18), aspect: 1, count: 6 },
		sizeBasis: 'geomean',
		mass: '120,000–450,000 kg dry',
		dims: 'Claude 340 m hex petals · Gemini 120 m spine · GPT 18 m truss spine',
		variants: [
			{ label: 'Hexagonal 6-petal node', model: 'Claude', size: 340, note: '40 m core, 150 m petals' },
			{ label: 'Linear spine + thermal shield', model: 'Gemini', size: 120, note: 'Radial arms' },
			{ label: 'Truss-based modular', model: 'GPT', size: 18, note: 'Bilateral radiators' }
		],
		callouts: [
			{ label: 'Assembly lines (parallel)', at: [0.35, 0, 0] },
			{ label: 'Radiators · 2,800–4,800 m²', at: [-0.4, 0.05, 0] },
			{ label: 'Manipulators · 4–8 arms', at: [0.1, 0.12, 0.2] }
		],
		source: SRC('phase-1/assembly-node')
	},
	{
		bomId: 'bom-1-5',
		archetype: 'linear',
		params: { size: geomean(650, 3400), count: 40, surface: true },
		sizeBasis: 'geomean',
		mass: 'Payload per shot: Claude 500 kg · Gemini 10 kg packets',
		dims: 'Track 650–3,400 m from 2–10 m segments; 100–1,000 g; 2.4–3.5 km/s',
		variants: [
			{ label: 'Short track · 1,000 g', size: 650, note: 'Range low' },
			{ label: 'Long track · 100 g', size: 3400, note: 'Range high' }
		],
		callouts: [
			{ label: 'Coil segments (2–10 m)', at: [0.2, 0.02, 0] },
			{ label: 'Capacitor / power banks', at: [-0.2, 0, 0.04] },
			{ label: 'Muzzle → L1 (2.4 km/s)', at: [0.5, 0.04, 0] }
		],
		source: SRC('phase-1/mass-drivers')
	},
	{
		bomId: 'bom-1-6',
		archetype: 'tug',
		params: { size: 2 * Math.sqrt(195 / 2 / 0.4) + 2, aspect: 1.6 },
		sizeBasis: 'consensus',
		mass: '6,000–12,000 kg mated; 2,000–8,000 kg payload',
		dims: 'SEP with 180–210 m² arrays',
		variants: [],
		callouts: [
			{ label: 'Solar arrays · 180–210 m²', at: [0.4, 0, 0] },
			{ label: 'Hall / ion thrusters', at: [0, 0, -0.25] },
			{ label: 'Docking adapter · payload 2–8 t', at: [0, 0, 0.25] }
		],
		source: SRC('phase-1/orbital-tugs')
	},
	{
		bomId: 'bom-1-7',
		archetype: 'smallsat',
		params: { size: 0.35, aspect: 1, telescope: true },
		sizeBasis: 'consensus',
		mass: '0.45–2.1 kg per satellite (target <2.5 kg)',
		dims: 'Node control unit: compute, comms, ranging',
		variants: [
			{ label: 'Full SCU', model: 'Claude', size: fromMass(2.1, 400), note: '2.1 kg' },
			{ label: 'Minimal SCU', model: 'Gemini', size: fromMass(0.45, 400), note: '0.45 kg' },
			{ label: 'Minimal SCU', model: 'GPT', size: fromMass(0.45, 400), note: '0.45 kg' }
		],
		callouts: [
			{ label: 'Optical ranging terminal (±1 m)', at: [0, 0.1, 0.2] },
			{ label: 'Rad-hard compute', at: [0, 0, 0] }
		],
		source: SRC('phase-1/swarm-control-system')
	},

	// ── Phase 2 ─────────────────────────────────────────────────────────────
	{
		bomId: 'bom-2-1',
		archetype: 'membrane',
		params: { size: geomean(1000, 1000, side(5000)), shape: 'hex' },
		sizeBasis: 'geomean',
		mass: 'Claude 850 t · Gemini 225 kg · GPT 2,500 kg',
		dims: 'Claude 1 km² · Gemini 0.785 km² (1 km dia) · GPT 5,000 m²',
		variants: [
			{ label: '1 km² · 850 t', model: 'Claude', size: 1000, note: 'Phase 3 architecture' },
			{ label: '0.785 km² disc · 225 kg', model: 'Gemini', size: 1000, note: 'Ultra-thin statite' },
			{ label: '5,000 m² · 2,500 kg', model: 'GPT', size: side(5000), note: 'Consensus start point for Phase 2' }
		],
		callouts: [
			{ label: 'Thin-film membrane', at: [0.2, 0, 0.1] },
			{ label: 'Power beaming / avionics hub', at: [0, 0.03, 0] },
			{ label: 'Spars', at: [0.45, 0, 0] }
		],
		source: SRC('phase-2/collector-satellites')
	},
	{
		bomId: 'bom-2-2',
		archetype: 'arms',
		params: { size: 8.5, count: 2, dish: true },
		sizeBasis: 'model',
		mass: 'Servicers 180–320 kg · inspectors 14–52 kg',
		dims: 'Servicer body 1.2 × 0.8 × 1.0 m, 8.5 m array span',
		variants: [
			{ label: 'Inspector · 45–52 kg', model: 'Claude', size: 4.2, note: '0.6 × 0.6 × 0.8 m, 4.2 m span' },
			{ label: 'MD-A micro-drone · 14–15 kg', model: 'GPT', size: 1.6, note: 'Estimated envelope' }
		],
		callouts: [
			{ label: 'Articulated arrays · 8.5 m', at: [0.4, 0, 0] },
			{ label: 'ORU manipulators', at: [0.1, -0.05, 0.12] },
			{ label: 'Ka-band HGA 0.3 m', at: [0, 0.08, -0.06] }
		],
		source: `${SRC('phase-2/maintenance-drones')}; envelopes from claude-opus-4-6.md`
	},
	{
		bomId: 'bom-2-3',
		archetype: 'station',
		params: { size: 2.2 * side(12000), aspect: 0.6, count: 8, concentrator: true },
		sizeBasis: 'consensus',
		mass: '2,400–2,500 t per node (GPT seed 80–120 t)',
		dims: 'Radiators 12,000+ m²; 10–25 t/day refined metal',
		variants: [{ label: 'Seed node · 80–120 t', model: 'GPT', size: fromMass(100000, 100), note: 'Builds out to 300–600 t' }],
		callouts: [
			{ label: 'Solar furnace', at: [0, 0.3, 0.3] },
			{ label: 'Refinery & fabrication bays', at: [0, 0, 0] },
			{ label: 'Radiators · 12,000 m²', at: [-0.42, 0, 0] }
		],
		source: SRC('phase-2/manufacturing-expansion')
	},

	// ── Phase 3a ────────────────────────────────────────────────────────────
	{
		bomId: 'bom-3a-1',
		archetype: 'tile',
		params: { size: geomean(hexAcross(16.2), side(10), hexAcross(50)) },
		sizeBasis: 'geomean',
		mass: 'Gemini 45 kg / 16 m² · GPT 35 kg / 10 m²',
		dims: 'Gemini 16.2 m² hex (2.5 m side) · GPT 10 m² (CST-10) · Claude 50 m²',
		variants: [
			{ label: '16.2 m² hex · 25 PFLOPS', model: 'Gemini', size: hexAcross(16.2), note: '45 kg' },
			{ label: 'CST-10 · 10 m²', model: 'GPT', size: side(10), note: '35 kg' },
			{ label: '50 m² hex membrane', model: 'Claude', size: hexAcross(50), note: 'Opus BOM proposal' }
		],
		callouts: [
			{ label: 'Compute substrate (sun side PV)', at: [0, 0.06, 0] },
			{ label: 'Radiator face (cold side)', at: [0, -0.06, 0] },
			{ label: 'Optical edge links', at: [0.48, 0, 0] }
		],
		source: SRC('phase-3a/computational-substrate-tiles')
	},
	{
		bomId: 'bom-3a-2',
		archetype: 'smallsat',
		params: { size: 6, aspect: 1, telescope: true },
		sizeBasis: 'consensus',
		mass: '~300–850 kg (target ~500 kg)',
		dims: 'Primary aperture 0.5–1.5 m (target ~1 m), 1550 nm',
		variants: [
			{ label: '1.5 m SiC monolith', model: 'Gemini', size: 6 * 1.5, note: '~10 Pbps per trunk (OAM+WDM)' },
			{ label: '1 m · 1,024 WDM channels', model: 'Claude', size: 6, note: '500 kg' }
		],
		callouts: [
			{ label: '1 m diffraction-limited telescope', at: [0, 0, 0.35] },
			{ label: 'Fine-pointing gimbal', at: [0, 0, 0.1] },
			{ label: 'Power wings', at: [0.4, 0, 0] }
		],
		source: SRC('phase-3a/inter-layer-optical-backbone')
	},
	{
		bomId: 'bom-3a-3',
		archetype: 'membrane',
		params: { size: hexAcross(200), shape: 'hex', radiator: true },
		sizeBasis: 'consensus',
		mass: 'Gemini 50 kg · GPT 160–300 kg per 200 m² module',
		dims: '~200 m² hexagonal module, 800–1,200 K (hot) layer',
		variants: [],
		callouts: [
			{ label: 'Rip-stop thermal-fuse cells (1–10 m)', at: [0.2, 0, 0.1] },
			{ label: 'Heat-pipe manifold', at: [0, 0.02, 0] }
		],
		source: SRC('phase-3a/thermal-management-radiator-systems')
	},
	{
		bomId: 'bom-3a-4',
		archetype: 'station',
		params: { size: 2 * side(400000), aspect: 0.5, count: 10, concentrator: true },
		sizeBasis: 'consensus',
		mass: '~50,000 t dry (Gemini 52,000 t; GPT SRMF-50)',
		dims: 'Radiators 250,000–600,000 m² at 450–600 K',
		variants: [],
		callouts: [
			{ label: 'Replication bays', at: [0, 0, 0] },
			{ label: 'Membrane radiators', at: [-0.42, 0, 0] },
			{ label: 'Solar concentrators', at: [0, 0.3, 0.3] }
		],
		source: SRC('phase-3a/self-replicating-manufacturing-foundries')
	},
	{
		bomId: 'bom-3a-6',
		archetype: 'linear',
		params: { size: geomean(5000, 20000), count: 60, anchor: true },
		sizeBasis: 'geomean',
		mass: '10 t cargo slugs; ships 50–500 t/day each',
		dims: 'Coilgun 5–20 km anchored to consolidated asteroids; 2–30 km/s',
		variants: [
			{ label: 'Short coilgun', size: 5000, note: 'Range low' },
			{ label: 'Long coilgun', size: 20000, note: 'Range high' }
		],
		callouts: [
			{ label: 'Asteroid anchor', at: [-0.5, 0, 0] },
			{ label: 'Coil stages', at: [0.1, 0.02, 0] },
			{ label: '10 t slug + transponder', at: [0.5, 0.03, 0] }
		],
		source: SRC('phase-3a/feedstock-supply-chain-pipeline')
	},
	{
		bomId: 'bom-3a-7',
		archetype: 'membrane',
		params: { size: geomean(10, 300), shape: 'circle', dish: true },
		sizeBasis: 'geomean',
		mass: '200–800 t per major hub (Gemini 500 t units)',
		dims: 'Aperture 10 m (phased array) to 300+ m (segmented membrane); 1–20 GW optical',
		variants: [
			{ label: 'Short-range phased array', size: 10, note: '10 m aperture' },
			{ label: 'Long-range segmented membrane', size: 300, note: '300+ m aperture, up to 25 AU hop' }
		],
		callouts: [
			{ label: 'Transmit aperture', at: [0.2, 0, 0.1] },
			{ label: 'Hub: power conditioning', at: [0, -0.1, 0] }
		],
		source: SRC('phase-3a/inter-layer-power-distribution-network')
	},
	{
		bomId: 'bom-3a-8',
		archetype: 'rover',
		params: { size: 2.2, count: 6 },
		sizeBasis: 'model',
		after: 'Gemini',
		mass: 'Gemini Weaver 350 kg · GPT M-class 200–800 kg',
		dims: '6-legged electro-adhesive crawler',
		variants: [
			{ label: 'Atlas tug · 8,500 kg', model: 'Gemini', size: fromMass(8500) * 2.5, note: 'Heavy logistics; envelope estimated from mass', archetype: 'tug', params: { aspect: 0.8 } },
			{ label: 'HAT · 20,000–80,000 kg', model: 'GPT', size: fromMass(40000) * 2.5, note: 'Booms to 150 m; envelope estimated from mass', archetype: 'tug', params: { aspect: 0.8 } },
			{ label: 'P-class patch microbot · 0.2–2 kg', model: 'GPT', size: 0.15, note: '10⁷–10⁸ units' }
		],
		callouts: [
			{ label: 'Van der Waals grippers', at: [0.3, -0.2, 0.3] },
			{ label: 'Tile handling', at: [0, 0.2, 0] }
		],
		source: SRC('phase-3a/shell-construction-maintenance-swarm')
	},

	// ── Phase 3b ────────────────────────────────────────────────────────────
	{
		bomId: 'bom-3b-1',
		archetype: 'membrane',
		params: { size: geomean(1e6, 1e5, 1e4), shape: 'hex', reflective: true },
		sizeBasis: 'geomean',
		mass: '0.5–5 g/m² areal density',
		dims: 'Claude 1,000 km segments · Gemini 100 km hex statites · GPT 10 km tiles',
		variants: [
			{ label: '1,000 km segment', model: 'Claude', size: 1e6, note: '~760 M units for a 60° cap' },
			{ label: '100 km hex statite', model: 'Gemini', size: 1e5, note: '~150 M units' },
			{ label: '10 km tile', model: 'GPT', size: 1e4, note: 'Explored 10 km and 1,000 km' }
		],
		callouts: [
			{ label: 'Reflective film (statite: light pressure = gravity)', at: [0.2, 0, 0.1] },
			{ label: 'Attitude vanes', at: [0.5, 0, 0] }
		],
		source: SRC('phase-3b/shkadov-mirror-array')
	},
	{
		bomId: 'bom-3b-2',
		archetype: 'linear',
		params: { size: geomean(70000, 5000, 150000), count: 18, plume: true, nozzle: true },
		sizeBasis: 'geomean',
		mass: 'Claude module ~10¹¹ kg at 10¹⁴ N',
		dims: 'Claude 50–90 km, 2 km throat · Gemini "Torch" 5 km, 1 km dia · GPT 50–300 km nozzle',
		variants: [
			{ label: 'Module · 10¹⁴ N', model: 'Claude', size: 70000, note: '~200 T throat field' },
			{ label: '"Torch" · 250 T HTS', model: 'Gemini', size: 5000, note: '~10⁷ modules' },
			{ label: 'Long nozzle', model: 'GPT', size: 150000, note: '50–200 m throat radius' }
		],
		callouts: [
			{ label: 'Magnetic throat', at: [-0.3, 0, 0] },
			{ label: 'Superconducting nozzle coils', at: [0, 0.06, 0] },
			{ label: 'Plasma exhaust', at: [0.5, 0, 0] }
		],
		source: SRC('phase-3b/thermonuclear-jet-engine')
	},
	{
		bomId: 'bom-3b-3',
		archetype: 'coil',
		params: { size: geomean(100000, 2000, 3000), count: 1 },
		sizeBasis: 'geomean',
		mass: 'Claude & Gemini ~45,000 t · GPT 200–800 t per unit',
		dims: 'Claude 100 km funnel · Gemini 2 km (150 T throat) · GPT 1–5 km loops',
		variants: [
			{ label: 'Magnetic funnel · 100 km', model: 'Claude', size: 100000, note: '~19,200 units' },
			{ label: 'MFS · 2 km', model: 'Gemini', size: 2000, note: '150 T peak throat field' },
			{ label: 'Collector cell · 1–5 km loop', model: 'GPT', size: 3000, note: '50–500 km bubble radius' }
		],
		callouts: [
			{ label: 'Superconducting loop', at: [0.5, 0, 0] },
			{ label: 'Field lines funnel solar wind', at: [0, 0.4, 0] }
		],
		source: SRC('phase-3b/solar-wind-collectors')
	},
	{
		bomId: 'bom-3b-4',
		archetype: 'coil',
		params: { size: geomean(125000, 500000, 50000), count: 3, plume: true },
		sizeBasis: 'geomean',
		mass: 'Claude ~5×10¹² kg · Gemini ~5×10¹⁰ kg · GPT ~2×10¹⁰ kg',
		dims: 'Claude 50–200 km coils · Gemini 500 km aperture · GPT 50 km',
		variants: [
			{ label: 'Lifting station', model: 'Claude', size: 125000, note: '10⁸–10⁹ kg/s each' },
			{ label: '500 km magnetic aperture', model: 'Gemini', size: 500000, note: '' },
			{ label: 'MILN · 50 km', model: 'GPT', size: 50000, note: '20,000–100,000 units' }
		],
		callouts: [
			{ label: 'Coil stack (10–60 T, 20–60 K)', at: [0.5, 0, 0] },
			{ label: 'Lifted plasma column', at: [0, -0.5, 0] }
		],
		source: SRC('phase-3b/mass-lifting-systems')
	},
	{
		bomId: 'bom-3b-5',
		archetype: 'linear',
		params: { size: geomean(250000, 5000), count: 24, rings: true },
		sizeBasis: 'geomean',
		mass: 'Claude ~5×10¹² kg/node · GPT ~2×10⁹ kg/string',
		dims: 'Claude 250 km node · GPT ~5 km strings',
		variants: [
			{ label: 'Separation node · 250 km', model: 'Claude', size: 250000, note: 'E×B centrifugal' },
			{ label: 'String · ~5 km', model: 'GPT', size: 5000, note: '~1,000 strings at 10⁹ kg/s' }
		],
		callouts: [
			{ label: 'Rotating plasma column (E×B)', at: [0, 0, 0] },
			{ label: 'Confinement coils 3–50 T', at: [0.3, 0.05, 0] }
		],
		source: SRC('phase-3b/helium-separation-plant')
	},
	{
		bomId: 'bom-3b-6',
		archetype: 'linear',
		params: { size: geomean(500000, 50000, 200000), count: 40, rings: true, plume: true },
		sizeBasis: 'geomean',
		mass: 'Claude ~4×10¹⁴ kg · Gemini ~5×10⁹ kg per unit',
		dims: 'Claude 500 km · Gemini 50 km · GPT ~200 km rings; 50–100 T',
		variants: [
			{ label: '500 km unit', model: 'Claude', size: 500000, note: '~100,000 units' },
			{ label: '50 km unit', model: 'Gemini', size: 50000, note: '10⁹ units' },
			{ label: '~200 km ring bundle', model: 'GPT', size: 200000, note: '100–1,000 channels' }
		],
		callouts: [
			{ label: 'Accelerating coils · 50–100 T', at: [0, 0.06, 0] },
			{ label: 'Exhaust ~0.01 c', at: [0.5, 0, 0] }
		],
		source: SRC('phase-3b/em-accelerators')
	},
	{
		bomId: 'bom-3b-7',
		archetype: 'membrane',
		params: { size: 50000, shape: 'circle', dish: true },
		sizeBasis: 'model',
		after: 'Claude',
		mass: 'Asteroid-scale total (Tier 3 relays dominate)',
		dims: 'Tier 3 relay stations with 50 km rectennas',
		variants: [],
		callouts: [
			{ label: 'Rectenna array · 50 km', at: [0.25, 0, 0.1] },
			{ label: 'Relay hub', at: [0, -0.06, 0] }
		],
		source: SRC('phase-3b/dyson-integration-layer')
	},
	{
		bomId: 'bom-3b-8',
		archetype: 'smallsat',
		params: { size: fromMass(336000, 150) * 2.2, aspect: 1, dish: true },
		sizeBasis: 'model',
		after: 'GPT',
		mass: '~336,000 kg for RMC + TACC nodes (GPT)',
		dims: 'Stabilisation node: momentum control + thrust-alignment sensing',
		variants: [],
		callouts: [
			{ label: 'Control-moment gyros', at: [0, 0, 0] },
			{ label: 'Alignment sensor booms', at: [0.4, 0, 0] }
		],
		source: SRC('phase-3b/thrust-stabilization')
	}
];

/** Items with no physical hardware to model. */
export const NON_PHYSICAL: Record<string, string> = {
	'bom-0-7': 'Organisational infrastructure — people, governance and facilities, not flight hardware.',
	'bom-0-8': 'Launch and delivery service — the hardware it carries is modelled under its own item.',
	'bom-0-9': 'Leased ground stations and command security; flight terminals are part of their host items.',
	'bom-0-10': 'Mission operations — staff, facilities and software.',
	'bom-0-11': 'Ground R&D, test facilities and qualification on Earth.',
	'bom-0-14': 'Spares programme — the parts are those of the items they replace.',
	'bom-0-15': 'Containment and monitoring programme; shrouds belong to the robots and plant.',
	'bom-0-16': 'Imported iodine in sealed cartridges — a commodity, not a vehicle.',
	'bom-0-17': 'Contingency and reserve — money, not hardware.',
	'bom-3a-5': 'Distributed computational OS — software running across the substrate tiles.'
};

const BY_ID = new Map(ELEMENT_MODELS.map((m) => [m.bomId, m]));

export function elementModel(bomId: string | null | undefined): ElementModel | null {
	return (bomId && BY_ID.get(bomId)) || null;
}

/** A round scale-bar length (1, 2, 5 × 10ⁿ m) close to `target` metres. */
export function niceLength(target: number): number {
	const p = Math.pow(10, Math.floor(Math.log10(target)));
	const m = target / p;
	return (m >= 5 ? 5 : m >= 2 ? 2 : 1) * p;
}

export function formatLength(m: number): string {
	if (m >= 1000) return `${+(m / 1000).toPrecision(3)} km`;
	if (m >= 1) return `${+m.toPrecision(3)} m`;
	return `${+(m * 100).toPrecision(3)} cm`;
}

/**
 * Ghost line-up: variants at true scale relative to the main model, clamped
 * so they stay visible. `scale` is the main model's metres → scene units.
 */
export interface GhostSlot {
	variant: ModelVariant;
	/** Scene size after clamping */
	sceneSize: number;
	/** True ratio to the main model */
	ratio: number;
	clamped: 'up' | 'down' | null;
}

export const GHOST_MAX_RATIO = 2.5;
export const GHOST_MIN_RATIO = 0.06;

export function ghostLineup(m: ElementModel, sceneSizeMain: number): GhostSlot[] {
	return m.variants.map((variant) => {
		const ratio = variant.size / m.params.size;
		const r = Math.min(GHOST_MAX_RATIO, Math.max(GHOST_MIN_RATIO, ratio));
		return {
			variant,
			sceneSize: sceneSizeMain * r,
			ratio,
			clamped: ratio > GHOST_MAX_RATIO ? 'up' : ratio < GHOST_MIN_RATIO ? 'down' : null
		};
	});
}
