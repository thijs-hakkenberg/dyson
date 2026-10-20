/**
 * Logistics: mass moving through the build, as chains of stages.
 *
 * Each stage has a capacity in tonnes per year at a given construction year,
 * from deployed units × per-unit throughput (metrics.ts, consensus figures).
 * A chain's flow is limited by its weakest stage — the bottleneck. Flows are
 * drawn between the stages' scene positions.
 *
 * Chains (all figures from consensus documents):
 *  - Asteroid product (P0→P1): mining robots 2–5 t/h of regolith each →
 *    processing plant co-located at the target NEA, 0.6–2.5 kt/yr of Fe-Ni
 *    product across models (Phase 0 re-assessment, round 2) → tugs → delivery
 *    node at Sun–Earth L1 (D-04 interim), where the Phase 1 assembly node is.
 *    The mining stage is ore, the plant stage product: the plant always limits
 *    the chain, and the gap between the two is the beneficiation ratio (CI-20).
 *  - Lunar launch (P1): mass drivers ~21,900 t/yr each (Claude; GPT
 *    8,760–26,280; Gemini 31,536) → assembly node.
 *  - Swarm manufacturing (P2): nodes refine 10–25 t/day → collector band.
 *  - Shell feedstock (P3a): pipeline ships 50–500 t/day each → foundries.
 *  - Stellar fuel (P3b): mass lifting, consensus target 10¹² kg/s at full
 *    build-out → helium separation → accelerators/jet.
 */

import { lagrangePosition, moonPosition } from './ephemeris';
import { anchorPosition, getEntity, type Vec3 } from './registry';
import { itemProgress } from './progress';
import { metricsFor } from './metrics';
import { eclipticToScene } from './units';

const HOURS_PER_YEAR = 8766;
const SECONDS_PER_YEAR = 3.15576e7;

export interface Stage {
	id: string;
	label: string;
	bomId: string;
	/** Capacity at this year (t/yr) */
	capacity: number;
	/** Position(s) for drawing; multiple = distributed stage */
	pos: (year: number) => Vec3[];
}

export interface Chain {
	id: string;
	label: string;
	phaseId: string;
	color: string;
	stages: Stage[];
	/** Note shown under the chain */
	note: string;
}

export interface ChainState {
	chain: Chain;
	/** Delivered flow = min stage capacity (t/yr) */
	flow: number;
	bottleneck: Stage | null;
	active: boolean;
}

const deployed = (bomId: string, phaseId: string, year: number) =>
	(getEntity(bomId)?.bom?.quantity ?? 0) * itemProgress(bomId, phaseId, year);

/** Per-unit throughput (t/yr) from metrics.ts (base value). */
const perUnitTPerYear = (bomId: string) => (metricsFor(bomId)?.throughput?.perHour.base ?? 0) * HOURS_PER_YEAR;

function bandPoints(bomId: string, n: number, year: number, phase = 0): Vec3[] {
	const a = getEntity(bomId)?.placement?.anchor;
	let r = 1;
	if (a?.kind === 'band') r = (a.rMin + a.rMax) / 2;
	if (a?.kind === 'shells') r = a.layers[0]?.rAU ?? 1;
	const out: Vec3[] = [];
	for (let k = 0; k < n; k++) {
		const th = phase + (k / n) * Math.PI * 2 + ((2 * Math.PI) / Math.pow(r, 1.5)) * (year - 2000);
		out.push(eclipticToScene(r * Math.cos(th), r * Math.sin(th), 0));
	}
	return out;
}

export function buildChains(): Chain[] {
	// Mining site k is the k-th most valuable NEA (same convention as the orrery markers)
	const miningSites = (year: number) => {
		const a = getEntity('bom-0-2')?.placement?.anchor;
		const n = a?.kind === 'nea' ? a.count : 1;
		return Array.from({ length: n }, (_, k) => anchorPosition({ kind: 'nea', count: k + 1 }, year));
	};
	return [
		{
			id: 'ore',
			label: 'Asteroid Fe-Ni product',
			phaseId: 'phase-0',
			color: '#f0a830',
			note: 'Mining 2–5 t/h of regolith per robot; the plant at the asteroid ships 0.6–2.5 kt/yr of product across models (round 2). Product, not ore, is shipped.',
			stages: [
				{
					id: 'mine',
					label: 'Mining robots',
					bomId: 'bom-0-2',
					capacity: 0,
					pos: miningSites
				},
				{
					id: 'plant',
					label: 'Processing plant at the NEA',
					bomId: 'bom-0-3',
					capacity: 0,
					pos: (y) => [anchorPosition({ kind: 'nea', count: 1 }, y)]
				},
				{
					id: 'node',
					label: 'Delivery and assembly node (SEL1)',
					bomId: 'bom-1-4',
					capacity: Infinity,
					pos: (y) => [lagrangePosition('earth', 'L1', y)]
				}
			]
		},
		{
			id: 'lunar',
			label: 'Lunar launch',
			phaseId: 'phase-1',
			color: '#22d3ee',
			note: 'Per driver: Claude 21,900 t/yr, GPT 8,760–26,280, Gemini 31,536.',
			stages: [
				{ id: 'drivers', label: 'Mass drivers (Moon)', bomId: 'bom-1-5', capacity: 0, pos: (y) => [moonPosition(y)] },
				{
					id: 'node',
					label: 'Assembly node (L1)',
					bomId: 'bom-1-4',
					capacity: Infinity,
					pos: (y) => [lagrangePosition('earth', 'L1', y)]
				}
			]
		},
		{
			id: 'swarm',
			label: 'Swarm manufacturing',
			phaseId: 'phase-2',
			color: '#2dd4bf',
			note: 'Self-replicating nodes refine 10–25 t of metal a day each.',
			stages: [
				{
					id: 'nodes',
					label: 'Manufacturing nodes',
					bomId: 'bom-2-3',
					capacity: 0,
					pos: (y) => bandPoints('bom-2-1', 5, y, 0.4).map((p) => [p[0] * 0.9, p[1], p[2] * 0.9] as Vec3)
				},
				{
					id: 'band',
					label: 'Collector band 0.5–0.8 AU',
					bomId: 'bom-2-1',
					capacity: Infinity,
					pos: (y) => bandPoints('bom-2-1', 5, y, 0.9)
				}
			]
		},
		{
			id: 'feedstock',
			label: 'Shell feedstock',
			phaseId: 'phase-3a',
			color: '#a78bfa',
			note: 'Pipeline ships 50–500 t/day each; consensus target ~10⁹ t/yr at steady state.',
			stages: [
				{
					id: 'ships',
					label: 'Feedstock pipeline',
					bomId: 'bom-3a-6',
					capacity: 0,
					pos: (y) => bandPoints('bom-3a-6', 6, y, 0.2)
				},
				{
					id: 'foundries',
					label: 'Foundries 2–3 AU',
					bomId: 'bom-3a-4',
					capacity: Infinity,
					pos: (y) => bandPoints('bom-3a-4', 6, y, 0.7)
				}
			]
		},
		{
			id: 'stellar',
			label: 'Stellar fuel',
			phaseId: 'phase-3b',
			color: '#fb7185',
			note: 'Consensus extraction target 10¹² kg/s of solar plasma at full build-out.',
			stages: [
				{
					id: 'lift',
					label: 'Mass lifting (corona)',
					bomId: 'bom-3b-4',
					capacity: 0,
					pos: (y) => bandPoints('bom-3b-4', 6, y, 0.1)
				},
				{
					id: 'helium',
					label: 'Helium separation',
					bomId: 'bom-3b-5',
					capacity: Infinity,
					pos: (y) => bandPoints('bom-3b-5', 6, y, 0.5)
				}
			]
		}
	];
}

/** Capacity (t/yr) of each stage at a year. */
function capacity(stage: Stage, phaseId: string, year: number): number {
	const e = getEntity(stage.bomId);
	const ph = e?.phaseId ?? phaseId;
	const n = deployed(stage.bomId, ph, year);
	switch (stage.bomId) {
		case 'bom-1-5':
			return n * 21_900;
		case 'bom-3b-4': {
			// Consensus total 1e12 kg/s across the full fleet → per station
			const q = e?.bom?.quantity ?? 1;
			return n * ((1e12 * SECONDS_PER_YEAR) / 1000 / q);
		}
		case 'bom-1-4':
		case 'bom-2-1':
		case 'bom-3a-4':
		case 'bom-3b-5':
			return n > 0 ? Infinity : 0; // sinks: present or not
		default:
			return n * perUnitTPerYear(stage.bomId);
	}
}

export function chainsAt(year: number, chains: Chain[] = CHAINS): ChainState[] {
	return chains.map((chain) => {
		const stages = chain.stages.map((s) => ({ ...s, capacity: capacity(s, chain.phaseId, year) }));
		let bottleneck: Stage | null = null;
		let flow = Infinity;
		for (const s of stages) {
			if (s.capacity < flow) {
				flow = s.capacity;
				bottleneck = s;
			}
		}
		const active = Number.isFinite(flow) && flow > 0;
		return { chain: { ...chain, stages }, flow: active ? flow : 0, bottleneck: active ? bottleneck : null, active };
	});
}

export const CHAINS = buildChains();

/** Compact tonnes-per-year. */
export function formatTonnesPerYear(t: number): string {
	if (!Number.isFinite(t)) return '∞';
	if (t <= 0) return '0 t/yr';
	const units: [number, string][] = [
		[1e15, 'Pt'],
		[1e12, 'Tt'],
		[1e9, 'Gt'],
		[1e6, 'Mt'],
		[1e3, 'kt']
	];
	for (const [v, u] of units) if (t >= v) return `${(t / v).toPrecision(3)} ${u}/yr`;
	return `${t.toPrecision(3)} t/yr`;
}
