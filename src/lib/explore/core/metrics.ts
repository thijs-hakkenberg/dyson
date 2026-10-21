/**
 * Programme telemetry: committed cost, electrical output/consumption,
 * production throughput and fleet counts at a given construction year.
 *
 * Per-unit figures are read from each item's consensus.md. Each figure is a
 * range: `base` is the consensus recommendation where one exists; otherwise
 * the geometric mean of the model values (flagged `derived`). `min`/`max`
 * span the model proposals, so the HUD can show how much the models disagree.
 * Quantities and cost come from content.ts; deployment from progress.ts.
 */

import { PHASES } from '$lib/services/content';
import type { BOMItem } from '$lib/types';
import { itemProgress } from './progress';
import { phaseWindow } from './timeline';

export interface Range {
	base: number;
	min: number;
	max: number;
	/** true when base is a geometric mean of divergent model values, not a consensus figure */
	derived?: boolean;
}

export type UnitGroup =
	'Power generation' | 'Spacecraft' | 'Robots' | 'Facilities' | 'Compute & control' | 'Stellar engine';

export interface Throughput {
	/** Per deployed unit, per hour */
	perHour: Range;
	/** What is produced, e.g. "t regolith" */
	unit: string;
}

export interface ItemMetrics {
	bomId: string;
	group: UnitGroup;
	/** false for quantities that are not discrete units (m², MW capacity) */
	countable: boolean;
	/** Electrical output per unit (W) delivered by dedicated generation */
	genW?: Range;
	/** Electrical consumption per unit (W), including self-powered loads */
	useW?: Range;
	throughput?: Throughput;
	/** Compute per unit (FLOP/s, FP16-equivalent) */
	computeFlops?: Range;
	/** Thrust on the Sun per unit (N) */
	thrustN?: Range;
	/** Where the numbers come from; shown in the HUD tooltip */
	source: string;
	/** Figure exists in the specs but models disagree on its sign or order of magnitude; not summed */
	unresolved?: string;
}

const HOURS_PER_YEAR = 8766;
const k = 1e3,
	M = 1e6,
	G = 1e9,
	T = 1e12,
	P = 1e15;

const fixed = (v: number): Range => ({ base: v, min: v, max: v });
const span = (min: number, max: number, base = (min + max) / 2): Range => ({ base, min, max });
/** Divergent model values with no consensus baseline: geometric mean, flagged. */
const geo = (...vals: number[]): Range => ({
	base: Math.exp(vals.reduce((s, v) => s + Math.log(v), 0) / vals.length),
	min: Math.min(...vals),
	max: Math.max(...vals),
	derived: true
});
const perYear = (r: Range): Range => ({
	base: r.base / HOURS_PER_YEAR,
	min: r.min / HOURS_PER_YEAR,
	max: r.max / HOURS_PER_YEAR,
	derived: r.derived
});
const perDay = (r: Range): Range => ({ base: r.base / 24, min: r.min / 24, max: r.max / 24, derived: r.derived });

export const ITEM_METRICS: ItemMetrics[] = [
	// ── Phase 0 ─────────────────────────────────────────────────────────
	// Regenerated consensus, 2026-10-20 (static/content/bom-specs/phase-0/*/consensus.md).
	// Quantities and costs come from reconciliation/phase-0/bom-numbers.yaml via content.ts.
	{
		bomId: 'bom-0-1',
		group: 'Spacecraft',
		countable: true,
		genW: span(3.6 * k, 4 * k),
		useW: span(3.6 * k, 4 * k),
		throughput: { perHour: perYear(span(0.2, 0.25)), unit: 'asteroids sampled' },
		source:
			'Consensus: 500–550 kg SEP rendezvous scouts, 3.6–4 kW BOL array (~2–2.5 kW to EP); one credited primary target per scout over a 4–5 yr primary life'
	},
	{
		bomId: 'bom-0-2',
		group: 'Robots',
		countable: true,
		useW: geo(2.5 * k, 16 * k, 25 * k),
		// 6 of the planning 12 are active (2 reserve, 2–4 replacements): output per unit halved
		throughput: { perHour: perYear(geo(0.5 * 4_000, 0.5 * 3_000, 0.5 * 2_200)), unit: 't regolith excavated' },
		source:
			'Power: Claude 2.5 kW average, GPT 12–20 kW excavating, Gemini 25 kW peak (no consensus value; PMAD rated 15–30 kW). Output per active robot: Claude 4 kt/yr, Gemini 3, GPT ~2.2 (1,100 h at 2 t/h); KDP-0B criterion ≥2.5 kt/yr. 6 of 12 units active'
	},
	{
		bomId: 'bom-0-3',
		group: 'Facilities',
		countable: true,
		useW: span(0.6 * M, 2.5 * M),
		throughput: { perHour: perYear(span(1_000, 1_300)), unit: 't Fe-Ni product' },
		source:
			'Consensus: 3 process trains of ~0.6 kt/yr nameplate ≈ 1.0–1.3 kt/yr delivered (N = 2–6 set at KDP-0B); power allocation 0.6–2.5 MWe (carbonyl low, melt high)'
	},
	{
		bomId: 'bom-0-4',
		group: 'Spacecraft',
		countable: true,
		genW: span(1.2 * M, 2.0 * M),
		useW: span(1.2 * M, 2.0 * M),
		throughput: { perHour: perYear(span(46, 93, 71)), unit: 't Fe-Ni delivered to SEL1' },
		source:
			'Consensus TUG-BL-0: ~1.2–2.0 MWe to the PPUs at 1.3 AU end of life (self-powered). Fleet delivers ~1 kt/yr (Claude 0.65–1.3), shared over 14 tugs'
	},
	{
		bomId: 'bom-0-5',
		group: 'Power generation',
		countable: false,
		genW: fixed(1 * M),
		source: 'Quantity is MW BOL at 1 AU: consensus 2–8 MW, ~4 MW interim interface value for 1.3 kt/yr; tug arrays are in bom-0-4'
	},
	{
		bomId: 'bom-0-6',
		group: 'Facilities',
		countable: true,
		useW: span(75 * k, 100 * k, 75 * k),
		throughput: { perHour: perYear(span(10, 30, 22.5)), unit: 't water' },
		source: 'Consensus water pilot (C-type target only): ~75 kWe continuous, ≤100 kWe peak; 10–30 t/yr, design point 20–25'
	},
	{
		bomId: 'bom-0-7',
		group: 'Compute & control',
		countable: false,
		source: 'Organisation, not hardware'
	},
	{
		bomId: 'bom-0-8',
		group: 'Spacecraft',
		countable: false,
		source: 'Launch and delivery service; quantity is kt delivered (1.3–6 kt, central 2.5–4)'
	},
	{
		bomId: 'bom-0-9',
		group: 'Compute & control',
		countable: false,
		source: 'Leased ground service (8,000–14,000 antenna-h/yr in 0B); site trunk terminals draw on bom-0-5'
	},
	{
		bomId: 'bom-0-10',
		group: 'Compute & control',
		countable: false,
		source: 'Operations staff and facilities, not flight hardware'
	},
	{
		bomId: 'bom-0-11',
		group: 'Facilities',
		countable: false,
		source: 'Ground R&D, test facilities and qualification on Earth'
	},
	{
		bomId: 'bom-0-12',
		group: 'Spacecraft',
		countable: true,
		genW: span(60 * k, 80 * k),
		useW: span(60 * k, 80 * k),
		source: 'Consensus: single-launch demonstrator, ~6–10 t dry, 60–80 kWe BOL; 300 kg–5 t feed, 10–500 kg product'
	},
	{
		bomId: 'bom-0-13',
		group: 'Facilities',
		countable: true,
		genW: span(60 * k, 100 * k),
		useW: span(60 * k, 100 * k),
		source: 'Consensus: passive uncrewed warehouse at SEL1, 25–40 t dry, 60–100 kW BOL, 0.6–1.0 kt initial inventory'
	},
	{
		bomId: 'bom-0-14',
		group: 'Spacecraft',
		countable: false,
		source: 'Spares programme (Earth, SEL1 cache, NEA depot); not counted as units'
	},
	{
		bomId: 'bom-0-15',
		group: 'Compute & control',
		countable: false,
		source: 'Containment verification and monitoring programme'
	},
	{
		bomId: 'bom-0-16',
		group: 'Spacecraft',
		countable: false,
		source: 'Imported iodine, 230–400 t/yr (contract 150–700); delivery mass is in bom-0-8'
	},
	{
		bomId: 'bom-0-17',
		group: 'Compute & control',
		countable: false,
		source: 'Contingency and reserve, not hardware'
	},

	// ── Phase 1 ─────────────────────────────────────────────────────────
	{
		bomId: 'bom-1-1',
		group: 'Power generation',
		countable: true,
		genW: { base: Math.sqrt(500 * k * 5 * M), min: 10 * k, max: 52 * M },
		source:
			'Recommended tile units ~0.5–5 MW (base: geometric mid); GPT 10 kW at 1 AU, Gemini 44 MW at 0.3 AU, Claude 52 MW at 0.5 AU'
	},
	{
		bomId: 'bom-1-2',
		group: 'Power generation',
		countable: true,
		genW: geo(400 * k, 200 * M, 2.1 * G),
		source: 'GPT 1,200 m² / 400 kW; Claude 1 km² / 200 MW; Gemini 1 km Ø / 2.1 GW at 0.3 AU'
	},
	{
		bomId: 'bom-1-3',
		group: 'Robots',
		countable: true,
		useW: span(5 * k, 25 * k, 15 * k),
		source: 'Electron-beam welding up to 25 kW (Claude); duty-cycle average assumed'
	},
	{
		bomId: 'bom-1-4',
		group: 'Facilities',
		countable: true,
		useW: span(1.5 * M, 2.0 * M),
		throughput: { perHour: { base: 1.35 / 730, min: 1 / 730, max: 1.7 / 730 }, unit: 'MW of collectors assembled' },
		source: 'Power class 1.5–2.0 MWe; 1–1.7 MW-equivalent of collectors per month'
	},
	{
		bomId: 'bom-1-5',
		group: 'Facilities',
		countable: true,
		throughput: { perHour: { base: 5, min: 5, max: 360 }, unit: 'launches' },
		source: 'Claude 5/h (21,900 t/yr), GPT 10–30/h, Gemini 6/min. Pulse draw 120 MW–2.8 GW (average not specified)'
	},
	{
		bomId: 'bom-1-6',
		group: 'Spacecraft',
		countable: true,
		useW: span(50 * k, 70 * k, 50 * k),
		source: '50 kW-class SEP; 50–70 kW array at 1 AU'
	},
	{
		bomId: 'bom-1-7',
		group: 'Compute & control',
		countable: true,
		source: 'No consensus power figure'
	},

	// ── Phase 2 ─────────────────────────────────────────────────────────
	{
		bomId: 'bom-2-1',
		group: 'Power generation',
		countable: true,
		genW: { base: 1.3 * M, min: 1 * M, max: 2.5 * G },
		source: 'Recommended start: 5,000 m² class, ~1.3 MW BOL (GPT). Claude 1 km² with 2.5 GW beaming'
	},
	{
		bomId: 'bom-2-2',
		group: 'Robots',
		countable: true,
		source: 'No consensus power figure'
	},
	{
		bomId: 'bom-2-3',
		group: 'Facilities',
		countable: true,
		useW: { base: 35 * M, min: 20 * M, max: 1.2 * G },
		throughput: { perHour: perDay(span(10, 25)), unit: 't refined metal' },
		source: '20–50 MWe per node (Gemini 1.2 GW for a larger facility); 10–25 t/day refined metals'
	},

	// ── Phase 3a: Matrioshka brain ─────────────────────────────────────
	{
		bomId: 'bom-3a-1',
		group: 'Compute & control',
		countable: true,
		// Tiles harvest their own input power (TPV) and consume it on-tile
		genW: geo(4.5 * k, 14.4 * k),
		useW: geo(4.5 * k, 14.4 * k),
		computeFlops: geo(25 * P, 60 * P),
		source:
			'Gemini 25 PFLOPS FP16 at ~4.5 kW per 16 m² tile; GPT 60 PFLOPS at ~14.4 kW per 10 m² tile. Power harvested and consumed on-tile'
	},
	{
		bomId: 'bom-3a-2',
		group: 'Compute & control',
		countable: true,
		source: 'No consensus power figure'
	},
	{
		bomId: 'bom-3a-3',
		group: 'Facilities',
		countable: false,
		source: 'Radiator area (m²), not discrete units'
	},
	{
		bomId: 'bom-3a-4',
		group: 'Facilities',
		countable: true,
		useW: span(0.5 * G, 2 * G, 1 * G),
		throughput: { perHour: perYear(fixed(1e6)), unit: 'compute tiles' },
		source: '0.5–2.0 GW continuous per foundry; ~10⁶ tiles/yr each (BOM proposal)'
	},
	{
		bomId: 'bom-3a-5',
		group: 'Compute & control',
		countable: false,
		source: 'Software system'
	},
	{
		bomId: 'bom-3a-6',
		group: 'Spacecraft',
		countable: true,
		useW: { base: 3 * M, min: 1 * M, max: 10 * M, derived: true },
		throughput: { perHour: perDay({ base: 160, min: 50, max: 500, derived: true }), unit: 't feedstock' },
		source: 'Ships 1–5 MW solar (inner) / 3–10 MW fission (outer); 50–500 t/day each; ~10⁹ t/yr aggregate'
	},
	{
		bomId: 'bom-3a-7',
		group: 'Compute & control',
		countable: true,
		source: 'Power interface units route power; not counted as generation or load'
	},
	{
		bomId: 'bom-3a-8',
		group: 'Robots',
		countable: true,
		source: 'No consensus power figure'
	},

	// ── Phase 3b: Stellar engine ────────────────────────────────────────
	{
		bomId: 'bom-3b-1',
		group: 'Stellar engine',
		countable: false,
		// ~10¹⁷–10¹⁸ N for the full operational cap, spread over its 10¹² m²
		thrustN: geo(1e17 / 1e12, 1e18 / 1e12),
		source: 'Reflective area (m²); no electrical output. Net thrust ~10¹⁷–10¹⁸ N for the full cap'
	},
	{
		bomId: 'bom-3b-2',
		group: 'Stellar engine',
		countable: true,
		// System thrust (consensus ~3×10¹⁸ N, range 10¹⁸–10²¹ N) spread over the BOM's 100 engine units
		thrustN: { base: 3e18 / 100, min: 1e18 / 100, max: 1e21 / 100 },
		source:
			'Jet thrust ~3×10¹⁸ N recommended (10¹⁸–10²¹ N across models); consensus sizes this as ~10⁴ modules at ~3×10¹⁴ N, BOM lists 100 units'
	},
	{
		bomId: 'bom-3b-3',
		group: 'Stellar engine',
		countable: true,
		unresolved: 'Claude: ~2.75 PW recovered per unit via MHD; Gemini: 45 PW net consumption; GPT: not quantified',
		source: 'Divergent sign: net producer vs consumer'
	},
	{
		bomId: 'bom-3b-4',
		group: 'Stellar engine',
		countable: true,
		source: 'No consensus power figure'
	},
	{
		bomId: 'bom-3b-5',
		group: 'Stellar engine',
		countable: true,
		useW: { base: (2.25 * P) / 500, min: (1.5 * P) / 500, max: 15 * P },
		source: '1.5–3 PW across the 500-plant constellation; Gemini 15 PW per node'
	},
	{
		bomId: 'bom-3b-6',
		group: 'Stellar engine',
		countable: true,
		source: 'No consensus power figure'
	},
	{
		bomId: 'bom-3b-7',
		group: 'Compute & control',
		countable: true,
		source: 'Integration system'
	},
	{
		bomId: 'bom-3b-8',
		group: 'Stellar engine',
		countable: true,
		useW: fixed((13 * G) / 10_000),
		source: '~13 GW total thrust stabilisation power (Claude) over 10,000 nodes'
	}
];

const METRICS_BY_ID = new Map(ITEM_METRICS.map((m) => [m.bomId, m]));
export function metricsFor(bomId: string): ItemMetrics | undefined {
	return METRICS_BY_ID.get(bomId);
}

export const UNIT_GROUPS: UnitGroup[] = [
	'Power generation',
	'Spacecraft',
	'Robots',
	'Facilities',
	'Compute & control',
	'Stellar engine'
];

/** Solar luminosity (W), IAU 2015 nominal. */
export const L_SUN_W = 3.828e26;
/** Solar mass (kg). */
export const M_SUN_KG = 1.98892e30;
const SECONDS_PER_YEAR = 365.25 * 86400;
const M_PER_AU = 1.495978707e11;

// ---------------------------------------------------------------------------
// Aggregation
// ---------------------------------------------------------------------------

interface BomRow {
	bom: BOMItem;
	phaseId: string;
	m: ItemMetrics;
}

const ROWS: BomRow[] = PHASES.flatMap((p) =>
	p.bom.map((bom) => ({ bom, phaseId: p.id, m: METRICS_BY_ID.get(bom.id)! }))
);

export interface Sum {
	base: number;
	min: number;
	max: number;
}
const zero = (): Sum => ({ base: 0, min: 0, max: 0 });
function add(s: Sum, r: Range | undefined, n: number) {
	if (!r || n <= 0) return;
	s.base += r.base * n;
	s.min += r.min * n;
	s.max += r.max * n;
}

export interface ItemSnapshot {
	bomId: string;
	name: string;
	phaseId: string;
	unit: string;
	deployed: number;
	quantity: number;
	/** Units added per hour at this moment (from the deployment curve) */
	buildPerHour: number;
	throughput?: { perHour: number; unit: string };
}

export interface GroupSnapshot {
	group: UnitGroup;
	units: number;
	buildPerHour: number;
	items: ItemSnapshot[];
}

export interface Telemetry {
	year: number;
	cost: Sum;
	costTotal: number;
	genW: Sum;
	useW: Sum;
	groups: GroupSnapshot[];
	throughput: { unit: string; perHour: Sum; items: string[] }[];
	/** Matrioshka compute (FLOP/s) */
	flops: Sum;
	/** Thrust on the Sun (N), total and per source */
	thrust: Sum;
	thrustBy: { bomId: string; name: string; n: number }[];
	/** Resulting solar acceleration (m/s²), nominal */
	solarAccel: number;
	/** Sun's accumulated Δv (m/s) and displacement (m) since thrust began, nominal */
	sunDeltaV: number;
	sunDisplacement: number;
	/** Items with power figures that are deliberately not summed */
	unresolved: { bomId: string; note: string }[];
	/** Items drawing more than they generate (W, nominal), largest first */
	loads: { bomId: string; name: string; w: number }[];
}

/** Deployed units of an item at a year. */
export function deployedAt(bomId: string, phaseId: string, quantity: number, year: number): number {
	return quantity * itemProgress(bomId, phaseId, year);
}

export function telemetryAt(year: number): Telemetry {
	const cost = zero();
	const genW = zero();
	const useW = zero();
	const groups = new Map<UnitGroup, GroupSnapshot>(
		UNIT_GROUPS.map((g) => [g, { group: g, units: 0, buildPerHour: 0, items: [] }])
	);
	const tp = new Map<string, { unit: string; perHour: Sum; items: string[] }>();
	const unresolved: Telemetry['unresolved'] = [];
	const flops = zero();
	const thrust = zero();
	const thrustBy: Telemetry['thrustBy'] = [];
	const loads: Telemetry['loads'] = [];
	let costTotal = 0;

	// Symmetric difference over ±0.05 yr for the instantaneous build rate
	const dt = 0.05;
	for (const { bom, phaseId, m } of ROWS) {
		const f = itemProgress(bom.id, phaseId, year);
		const n = bom.quantity * f;
		const rateYr =
			(bom.quantity * (itemProgress(bom.id, phaseId, year + dt) - itemProgress(bom.id, phaseId, year - dt))) / (2 * dt);

		// Spend assumed to track deployment (labelled in the HUD)
		cost.base += bom.totalCost * f;
		cost.min += (bom.costMin ?? bom.totalCost) * f;
		cost.max += (bom.costMax ?? bom.totalCost) * f;
		costTotal += bom.totalCost;

		add(genW, m.genW, n);
		add(useW, m.useW, n);
		const netLoad = ((m.useW?.base ?? 0) - (m.genW?.base ?? 0)) * n;
		if (netLoad > 0) loads.push({ bomId: bom.id, name: bom.name, w: netLoad });
		add(flops, m.computeFlops, n);
		add(thrust, m.thrustN, n);
		if (m.thrustN && n > 0) thrustBy.push({ bomId: bom.id, name: bom.name, n: m.thrustN.base * n });
		if (m.unresolved && n > 0) unresolved.push({ bomId: bom.id, note: m.unresolved });

		if (m.throughput && n > 0) {
			const t = tp.get(m.throughput.unit) ?? { unit: m.throughput.unit, perHour: zero(), items: [] };
			add(t.perHour, m.throughput.perHour, n);
			t.items.push(bom.id);
			tp.set(m.throughput.unit, t);
		}

		if (m.countable && n > 0) {
			const g = groups.get(m.group)!;
			g.units += n;
			g.buildPerHour += Math.max(0, rateYr) / HOURS_PER_YEAR;
			g.items.push({
				bomId: bom.id,
				name: bom.name,
				phaseId,
				unit: bom.unit,
				deployed: n,
				quantity: bom.quantity,
				buildPerHour: Math.max(0, rateYr) / HOURS_PER_YEAR,
				throughput: m.throughput ? { perHour: m.throughput.perHour.base * n, unit: m.throughput.unit } : undefined
			});
		}
	}

	const motion = sunMotion(year);
	return {
		year,
		flops,
		thrust,
		thrustBy,
		solarAccel: thrust.base / M_SUN_KG,
		sunDeltaV: motion.dv,
		sunDisplacement: motion.dx,
		cost,
		costTotal,
		genW,
		useW,
		groups: [...groups.values()].filter((g) => g.items.length),
		throughput: [...tp.values()],
		unresolved,
		loads: loads.sort((a, b) => b.w - a.w)
	};
}

const THRUST_ROWS = ROWS.filter((r) => r.m.thrustN);
/** Nominal thrust on the Sun (N) at a year. */
export function thrustAt(year: number): number {
	let f = 0;
	for (const { bom, phaseId, m } of THRUST_ROWS)
		f += m.thrustN!.base * bom.quantity * itemProgress(bom.id, phaseId, year);
	return f;
}

/**
 * Sun's Δv (m/s) and displacement (m) accumulated by a year, integrating the
 * nominal thrust curve (midpoint rule, ≤ 1 yr steps). Gravity of the swarm
 * itself and planetary drag-along are ignored.
 */
export function sunMotion(year: number): { dv: number; dx: number } {
	const start = Math.min(...THRUST_ROWS.map((r) => phaseWindow(r.phaseId)?.start ?? Infinity));
	if (!(year > start)) return { dv: 0, dx: 0 };
	const steps = Math.min(2000, Math.max(8, Math.ceil(year - start)));
	const h = (year - start) / steps;
	let v = 0;
	let x = 0;
	for (let i = 0; i < steps; i++) {
		const a = thrustAt(start + (i + 0.5) * h) / M_SUN_KG;
		const dv = a * h * SECONDS_PER_YEAR;
		x += (v + dv / 2) * h * SECONDS_PER_YEAR;
		v += dv;
	}
	return { dv: v, dx: x };
}

/** Number in scientific notation with superscript exponent, e.g. 3.2×10¹⁸. */
export function formatSci(v: number, digits = 2): string {
	if (v === 0) return '0';
	const e = Math.floor(Math.log10(Math.abs(v)));
	if (e >= -2 && e < 4) return v.toPrecision(digits + 1);
	const SUP: Record<string, string> = {
		'-': '⁻',
		0: '⁰',
		1: '¹',
		2: '²',
		3: '³',
		4: '⁴',
		5: '⁵',
		6: '⁶',
		7: '⁷',
		8: '⁸',
		9: '⁹'
	};
	return `${(v / 10 ** e).toFixed(digits - 1)}×10${[...String(e)].map((c) => SUP[c]).join('')}`;
}

/** FLOP/s with SI prefixes up to quetta. */
export function formatFlops(v: number): string {
	if (v <= 0) return '0 FLOPS';
	const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y', 'R', 'Q'];
	const e = Math.min(prefixes.length - 1, Math.max(0, Math.floor(Math.log10(v) / 3)));
	const x = v / 10 ** (e * 3);
	return `${x >= 100 ? x.toFixed(0) : x >= 10 ? x.toFixed(1) : x.toFixed(2)} ${prefixes[e]}FLOPS`;
}

/** Displacement in m / km / AU. */
export function formatDisplacement(m: number): string {
	if (m < 1000) return `${m.toPrecision(2)} m`;
	if (m < 1e9) return `${Number((m / 1000).toPrecision(3)).toLocaleString('en-US')} km`;
	return `${(m / M_PER_AU).toPrecision(3)} AU`;
}

/** SI-prefixed power, e.g. 1.2 TW. */
export function formatPower(w: number): string {
	if (w <= 0) return '0 W';
	const prefixes = ['', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
	const e = Math.min(prefixes.length - 1, Math.max(0, Math.floor(Math.log10(w) / 3)));
	const v = w / 10 ** (e * 3);
	return `${v >= 100 ? v.toFixed(0) : v >= 10 ? v.toFixed(1) : v.toFixed(2)} ${prefixes[e]}W`;
}

/**
 * A per-hour rate expressed in the smallest period that gives a value ≥ 1,
 * e.g. 0.004/h → "36 /yr", 0.2/h → "4.8 /d", 70/h → "70 /h".
 */
export function formatPerHour(perHour: number): string {
	if (perHour <= 0) return '—';
	if (perHour >= 1) return `${formatRate(perHour)} /h`;
	if (perHour * 24 >= 1) return `${formatRate(perHour * 24)} /d`;
	return `${formatRate(perHour * HOURS_PER_YEAR)} /yr`;
}

/** Rate per hour with sensible precision, e.g. "0.0023", "4.6", "1.2k". */
export function formatRate(v: number): string {
	if (v === 0) return '0';
	if (v < 0.01) return v.toExponential(1);
	if (v < 10) return v.toPrecision(2);
	if (v < 1000) return v.toFixed(0);
	const prefixes = ['', 'k', 'M', 'B', 'T'];
	const e = Math.min(prefixes.length - 1, Math.floor(Math.log10(v) / 3));
	return `${(v / 10 ** (e * 3)).toPrecision(3)}${prefixes[e]}`;
}
