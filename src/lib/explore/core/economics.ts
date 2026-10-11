/**
 * Return on investment and power balance over the construction timeline.
 *
 * Spend is cumulative and tracks deployment (as in the telemetry). Energy is
 * the time integral of nominal generation; "net" subtracts the project's own
 * nominal consumption, i.e. the surplus that could leave the project. Value
 * applies one assumed electricity price to every kWh. No market, buyer or
 * transmission loss is modelled, and none of this is in the consensus specs.
 */

import { L_SUN_W, telemetryAt } from './metrics';
import { TIMELINE } from './timeline';

const SECONDS_PER_YEAR = 365.25 * 86400;
const J_PER_KWH = 3.6e6;

/** Assumed prices (USD per kWh) the viewer can choose between. */
export const PRICES = [
	{ id: 'low', usdPerKWh: 0.01, label: '1¢' },
	{ id: 'mid', usdPerKWh: 0.05, label: '5¢' },
	{ id: 'high', usdPerKWh: 0.1, label: '10¢' }
] as const;
export type PriceId = (typeof PRICES)[number]['id'];

export const START_YEAR = Math.floor(Math.min(...TIMELINE.map((w) => w.start)));
export const END_YEAR = Math.ceil(Math.max(...TIMELINE.map((w) => w.end)));
const STEP = 0.5;

export interface EnergyRow {
	year: number;
	/** Cumulative spend (USD, nominal) */
	spend: number;
	/** Cumulative gross generation (J) */
	grossJ: number;
	/** Cumulative net surplus, generation minus consumption (J); can fall */
	netJ: number;
	genW: number;
	useW: number;
}

let table: EnergyRow[] | null = null;

/** Year-by-year integration (trapezoid, half-year steps), computed once. */
export function energyTable(): EnergyRow[] {
	if (table) return table;
	const out: EnergyRow[] = [];
	let grossJ = 0,
		netJ = 0;
	let prev: { gen: number; use: number } | null = null;
	for (let y = START_YEAR; y <= END_YEAR + 1e-9; y += STEP) {
		const t = telemetryAt(y);
		const gen = t.genW.base,
			use = t.useW.base;
		if (prev) {
			grossJ += ((prev.gen + gen) / 2) * STEP * SECONDS_PER_YEAR;
			netJ += ((prev.gen - prev.use + gen - use) / 2) * STEP * SECONDS_PER_YEAR;
		}
		prev = { gen, use };
		out.push({ year: y, spend: t.cost.base, grossJ, netJ, genW: gen, useW: use });
	}
	table = out;
	return out;
}

function rowAt(year: number): EnergyRow {
	const T = energyTable();
	if (year <= T[0].year) return { ...T[0], grossJ: 0, netJ: 0 };
	const last = T[T.length - 1];
	if (year >= last.year) return last;
	const i = Math.floor((year - T[0].year) / STEP);
	const a = T[i],
		b = T[i + 1];
	const f = (year - a.year) / STEP;
	const lerp = (x: number, z: number) => x + (z - x) * f;
	return {
		year,
		spend: lerp(a.spend, b.spend),
		grossJ: lerp(a.grossJ, b.grossJ),
		netJ: lerp(a.netJ, b.netJ),
		genW: lerp(a.genW, b.genW),
		useW: lerp(a.useW, b.useW)
	};
}

export interface Roi {
	spend: number;
	grossKWh: number;
	netKWh: number;
	grossValue: number;
	netValue: number;
	/** Net value ÷ spend */
	roi: number;
	/** First year net value covers spend to date, if within the timeline */
	paybackYear: number | null;
	/** Year with the highest cumulative net value ÷ spend */
	bestYear: number;
	bestRoi: number;
}

export function roiAt(year: number, usdPerKWh: number): Roi {
	const r = rowAt(year);
	const grossKWh = r.grossJ / J_PER_KWH;
	const netKWh = r.netJ / J_PER_KWH;
	let paybackYear: number | null = null;
	let bestYear = START_YEAR,
		bestRoi = -Infinity;
	for (const row of energyTable()) {
		if (row.spend <= 0) continue;
		const v = (row.netJ / J_PER_KWH) * usdPerKWh;
		if (paybackYear === null && v >= row.spend) paybackYear = row.year;
		if (v / row.spend > bestRoi) {
			bestRoi = v / row.spend;
			bestYear = row.year;
		}
	}
	return {
		spend: r.spend,
		grossKWh,
		netKWh,
		grossValue: grossKWh * usdPerKWh,
		netValue: netKWh * usdPerKWh,
		roi: r.spend > 0 ? (netKWh * usdPerKWh) / r.spend : 0,
		paybackYear,
		bestYear,
		bestRoi
	};
}

export interface PowerBalance {
	genW: number;
	useW: number;
	netW: number;
	/** Generation as a fraction of the Sun's luminosity (1 = fully saturated swarm) */
	saturation: number;
	/** First year nominal consumption exceeds generation, if any */
	deficitFrom: number | null;
	/** The largest loads at this year (W, nominal) */
	topLoads: { bomId: string; name: string; w: number }[];
}

let deficitYear: number | null | undefined;

export function powerBalance(year: number): PowerBalance {
	const t = telemetryAt(year);
	if (deficitYear === undefined) {
		const d = energyTable().find((r) => r.useW > r.genW && r.genW > 0);
		deficitYear = d ? d.year : null;
	}
	return {
		genW: t.genW.base,
		useW: t.useW.base,
		netW: t.genW.base - t.useW.base,
		saturation: t.genW.base / L_SUN_W,
		deficitFrom: deficitYear,
		topLoads: t.loads.slice(0, 3)
	};
}
