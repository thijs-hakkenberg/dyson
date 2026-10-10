/**
 * Simulation sandboxes: run the project's own Monte Carlo modules against a
 * BOM item's divergent positions, one series per model, inside the explorer.
 * Model values come from the item's consensus/divergent views; the full
 * interactive simulators remain at /questions/<slug>/simulator.
 */

import {
	DEFAULT_RADIATION_CONFIG,
	runRadiationDegradationMonteCarlo,
	type PVTechnology
} from '$lib/services/simulation/radiation-degradation';
import { DEFAULT_REPLICATION_CONFIG, runReplicationMonteCarlo } from '$lib/services/simulation/self-replication';
import { DEFAULT_SHKADOV_CONFIG, runShkadovTradeSweep } from '$lib/services/simulation/shkadov-mirror';
import type { ModelName } from '$lib/types/divergent-views';

export interface Series {
	label: string;
	model?: ModelName;
	points: [number, number][];
	/** Optional lower/upper band */
	band?: [number, number, number][];
}

export interface SandboxResult {
	series: Series[];
	xLabel: string;
	yLabel: string;
	logY?: boolean;
	/** Vertical markers (x, label, model) */
	markers?: { x: number; label: string; model?: ModelName }[];
	/** Short key results per series */
	facts: { label: string; model?: ModelName; text: string }[];
}

export interface SandboxParam {
	id: string;
	label: string;
	options: { value: string; label: string }[];
}

export interface Sandbox {
	id: string;
	title: string;
	question: string;
	bomIds: string[];
	simulatorHref: string;
	params: SandboxParam[];
	defaults: Record<string, string>;
	run: (p: Record<string, string>) => Promise<SandboxResult>;
	source: string;
}

const PV_OPTIONS: { value: PVTechnology; label: string }[] = [
	{ value: 'cdte', label: 'CdTe thin film' },
	{ value: 'perovskite', label: 'Perovskite' },
	{ value: 'iii-v', label: 'III-V multi-junction' },
	{ value: 'hybrid', label: 'Hybrid tandem' }
];

/** Orbital distance proposed by each model for swarm collectors. */
const COLLECTOR_ORBITS: { model: ModelName; au: number }[] = [
	{ model: 'Gemini', au: 0.3 },
	{ model: 'Claude', au: 0.5 },
	{ model: 'GPT', au: 1.0 }
];

export const SANDBOXES: Sandbox[] = [
	{
		id: 'radiation',
		title: 'Radiation degradation by orbit',
		question: 'How fast do thin-film collectors lose power at each model’s proposed orbit?',
		bomIds: ['bom-1-1', 'bom-1-2', 'bom-2-1'],
		simulatorHref: '/questions/thin-film-pv-radiation-degradation',
		params: [
			{ id: 'pv', label: 'PV technology', options: PV_OPTIONS },
			{
				id: 'shield',
				label: 'Shielding',
				options: [
					{ value: '2', label: '2 g/m²' },
					{ value: '5', label: '5 g/m²' },
					{ value: '20', label: '20 g/m²' }
				]
			}
		],
		defaults: { pv: 'cdte', shield: '5' },
		source: 'radiation-degradation Monte Carlo, 60 runs per orbit, 15-year mission',
		async run(p) {
			const out = await Promise.all(
				COLLECTOR_ORBITS.map(async (o) => {
					const r = await runRadiationDegradationMonteCarlo(
						{
							...DEFAULT_RADIATION_CONFIG,
							orbitalDistance: o.au,
							pvTechnology: p.pv as PVTechnology,
							shieldingMass: Number(p.shield),
							seed: 7
						},
						60
					);
					return { o, r: r.result };
				})
			);
			return {
				xLabel: 'Mission year',
				yLabel: 'Power (W/m²)',
				series: out.map(({ o, r }) => ({
					label: `${o.au} AU`,
					model: o.model,
					points: r.powerCurve.map((pt) => [pt.year, pt.power] as [number, number]),
					band: r.powerCurve.map(
						(pt, i) =>
							[pt.year, pt.power - (r.powerCurveStdDev[i] ?? 0), pt.power + (r.powerCurveStdDev[i] ?? 0)] as [
								number,
								number,
								number
							]
					)
				})),
				facts: out.map(({ o, r }) => ({
					label: `${o.model} · ${o.au} AU`,
					model: o.model,
					text: `EOL efficiency ${r.endOfLifeEfficiency.toFixed(1)}% · half-life ${r.halfLifeYear >= 15 ? '>15' : r.halfLifeYear.toFixed(1)} yr · ${Math.round(r.survivalProbability)}% survive`
				}))
			};
		}
	},
	{
		id: 'replication',
		title: 'Self-replication growth',
		question: 'How quickly do self-replicating factories multiply under each model’s cycle time and closure?',
		bomIds: ['bom-2-3', 'bom-3a-4'],
		simulatorHref: '/questions/self-replication-closure-threshold/simulator',
		params: [
			{
				id: 'seed',
				label: 'Seed factories',
				options: [
					{ value: '2', label: '2' },
					{ value: '5', label: '5' },
					{ value: '20', label: '20' }
				]
			},
			{
				id: 'degr',
				label: 'Annual degradation',
				options: [
					{ value: '0.01', label: '1%' },
					{ value: '0.03', label: '3%' },
					{ value: '0.06', label: '6%' }
				]
			}
		],
		defaults: { seed: '5', degr: '0.01' },
		source:
			'self-replication Monte Carlo, 80 runs. Cycle/closure: Claude 18 mo / 94% (P2 nodes), Gemini 14 mo / 96%, GPT 12 mo / 96% (P3a foundries)',
		async run(p) {
			const variants: { model: ModelName; cycle: number; closure: number }[] = [
				{ model: 'Claude', cycle: 18, closure: 0.94 },
				{ model: 'Gemini', cycle: 14, closure: 0.96 },
				{ model: 'GPT', cycle: 12, closure: 0.96 }
			];
			const out = await Promise.all(
				variants.map(async (v) => {
					const r = await runReplicationMonteCarlo({
						...DEFAULT_REPLICATION_CONFIG,
						cycleTimeMonths: v.cycle,
						closureRatio: v.closure,
						initialFoundries: Number(p.seed),
						degradationRate: Number(p.degr),
						targetFoundries: 1000,
						iterations: 80,
						seed: 11
					});
					return { v, r: r.result };
				})
			);
			return {
				xLabel: 'Years',
				yLabel: 'Factories',
				logY: true,
				series: out.map(({ v, r }) => ({
					label: `${v.cycle} mo · ${Math.round(v.closure * 100)}%`,
					model: v.model,
					points: r.meanGrowthCurve.map((pt) => [pt.timeMonths / 12, pt.foundryCount] as [number, number]),
					band: r.meanGrowthCurve.map(
						(pt, i) =>
							[
								pt.timeMonths / 12,
								r.lowerGrowthCurve[i]?.foundryCount ?? pt.foundryCount,
								r.upperGrowthCurve[i]?.foundryCount ?? pt.foundryCount
							] as [number, number, number]
					)
				})),
				markers: [],
				facts: out.map(({ v, r }) => ({
					label: `${v.model} · ${v.cycle} mo cycle`,
					model: v.model,
					text:
						r.timeToTargetStats.median !== null
							? `1,000 factories in ~${(r.timeToTargetStats.median / 12).toFixed(1)} yr (${Math.round(r.probabilityOfTarget * 100)}% of runs)`
							: `never reaches 1,000 (final ~${Math.round(r.finalCountStats.mean)})`
				}))
			};
		}
	},
	{
		id: 'shkadov',
		title: 'Shkadov mirror standoff',
		question: 'What does each proposed standoff distance mean for thrust, temperature and mass?',
		bomIds: ['bom-3b-1'],
		simulatorHref: '/questions/shkadov-standoff-distance-optimization/simulator',
		params: [
			{
				id: 'density',
				label: 'Areal density',
				options: [
					{ value: '0.5', label: '0.5 g/m²' },
					{ value: '1', label: '1 g/m²' },
					{ value: '5', label: '5 g/m²' }
				]
			},
			{
				id: 'cover',
				label: 'Sky coverage',
				options: [
					{ value: '0.067', label: '6.7% (Claude α 60°)' },
					{ value: '0.12', label: '12% (Gemini)' },
					{ value: '0.25', label: '25%' }
				]
			}
		],
		defaults: { density: '1', cover: '0.067' },
		source: 'shkadov-mirror trade sweep 0.1–2 AU; standoffs: Claude/Gemini 0.1 AU, GPT 1.0 AU',
		async run(p) {
			const r = await runShkadovTradeSweep({
				...DEFAULT_SHKADOV_CONFIG,
				arealDensity: Number(p.density),
				coverageFraction: Number(p.cover)
			});
			const pts = r.tradePoints;
			const at = (au: number) => pts.reduce((a, b) => (Math.abs(b.distance - au) < Math.abs(a.distance - au) ? b : a));
			const near = at(0.1);
			const far = at(1.0);
			return {
				xLabel: 'Standoff (AU)',
				yLabel: 'Mirror mass (kg) — thrust is the same at every standoff for a fixed sky coverage',
				logY: true,
				series: [
					{ label: 'Mirror mass', points: pts.map((t) => [t.distance, t.mirrorMass] as [number, number]) },
					{
						label: 'Thermally feasible',
						points: pts.filter((t) => t.isThermallyFeasible).map((t) => [t.distance, t.mirrorMass] as [number, number])
					}
				],
				markers: [
					{ x: 0.1, label: 'Claude · Gemini', model: 'Claude' },
					{ x: 1.0, label: 'GPT', model: 'GPT' }
				],
				facts: [
					{
						label: '0.1 AU (Claude, Gemini)',
						model: 'Claude',
						text: `${near.thrust.toExponential(1)} N · ${Math.round(near.equilibriumTemp)} K · mass ${near.mirrorMass.toExponential(1)} kg · ${near.isThermallyFeasible ? 'feasible' : 'too hot'}`
					},
					{
						label: '1.0 AU (GPT)',
						model: 'GPT',
						text: `${far.thrust.toExponential(1)} N · ${Math.round(far.equilibriumTemp)} K · mass ${far.mirrorMass.toExponential(1)} kg`
					},
					{ label: 'Sweep optimum', text: `${r.optimalDistance.toFixed(2)} AU · ${r.analysis.materialRecommendation}` }
				]
			};
		}
	}
];

export function sandboxesFor(bomId: string): Sandbox[] {
	return SANDBOXES.filter((s) => s.bomIds.includes(bomId));
}
