/**
 * Every navigable thing in the explorer: bodies, BOM items and phases.
 * The command palette, inspector, URL deep links and camera focus all
 * resolve through this registry.
 */

import { PHASES } from '$lib/services/content';
import type { BOMItem, Phase } from '$lib/types';
import {
	PLANET_IDS,
	type PlanetId,
	planetPosition,
	planetElements,
	lagrangePosition,
	moonPosition,
	orbitalPeriodYears
} from './ephemeris';
import { BODY_RADIUS_KM, kmToAU, yearToJD } from './units';
import { PLACEMENTS, type Anchor, type Placement } from './placements';
import { NEAS_BY_VALUE, neaPosition } from './nea';
import { phaseWindow, phaseLabel } from './timeline';

export type Vec3 = [number, number, number];
export type EntityKind = 'star' | 'planet' | 'moon' | 'bom' | 'phase';

export interface Entity {
	id: string;
	kind: EntityKind;
	name: string;
	subtitle: string;
	phaseId?: string;
	/** Scene position (AU) at a decimal year */
	position: (year: number) => Vec3;
	/** Comfortable camera distance when focusing (AU) */
	focusDistance: number;
	/** Physical radius (AU), for bodies */
	radiusAU?: number;
	bom?: BOMItem;
	phase?: Phase;
	placement?: Placement;
	/** Extra searchable text */
	keywords?: string;
}

const ORIGIN: Vec3 = [0, 0, 0];
/** Assumed stellar-engine thrust axis: ecliptic north (+Y). Labelled illustrative. */
export const THRUST_AXIS: Vec3 = [0, 1, 0];

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

/** Anchor → representative point (for focus and labels). */
export function anchorPosition(anchor: Anchor, year: number): Vec3 {
	switch (anchor.kind) {
		case 'lagrange':
			return lagrangePosition(anchor.body, anchor.point, year);
		case 'body':
			return anchor.body === 'moon' ? moonPosition(year) : planetPosition(anchor.body, year);
		case 'nea':
			// Label sits on the last site of the group so groups don't overlap
			return neaPosition(NEAS_BY_VALUE[anchor.count - 1], year);
		case 'cap':
			return [THRUST_AXIS[0] * anchor.rAU, THRUST_AXIS[1] * anchor.rAU, THRUST_AXIS[2] * anchor.rAU];
		case 'axis': {
			const r = anchor.rAU * (anchor.side ?? 1);
			return [THRUST_AXIS[0] * r, THRUST_AXIS[1] * r, THRUST_AXIS[2] * r];
		}
		default:
			return ORIGIN;
	}
}

/** Characteristic extent of an anchor (AU), used for focus distance. */
export function anchorExtent(anchor: Anchor): number {
	switch (anchor.kind) {
		case 'band':
			return anchor.rMax;
		case 'shells':
			return Math.max(...anchor.layers.map((l) => l.rAU));
		case 'cap':
			return anchor.rAU;
		case 'nea':
			return 0.5;
		case 'axis':
			return anchor.rAU * 0.5;
		default:
			return 0.02;
	}
}

/**
 * Surface-sited hardware stands at the body's north pole rather than its
 * centre, so its near-field model sits on the ground with local up ≈ ecliptic
 * north. The lunar consensus site is polar; obliquity is ignored here.
 */
function surfacePoint(body: PlanetId | 'moon'): (year: number) => Vec3 {
	const r = kmToAU(body === 'moon' ? 1737.4 : BODY_RADIUS_KM[body]);
	return (y) => {
		const c = body === 'moon' ? moonPosition(y) : planetPosition(body, y);
		return [c[0], c[1] + r, c[2]];
	};
}

function buildEntities(): Entity[] {
	const out: Entity[] = [
		{
			id: 'sun',
			kind: 'star',
			name: 'Sun',
			subtitle: 'G2V · 3.828×10²⁶ W',
			position: () => ORIGIN,
			focusDistance: 2.5,
			radiusAU: kmToAU(BODY_RADIUS_KM.sun),
			keywords: 'sol star'
		}
	];

	for (const id of PLANET_IDS) {
		const a = planetElements(id, yearToJD(2000)).a;
		out.push({
			id,
			kind: 'planet',
			name: cap(id),
			subtitle: `a = ${a.toFixed(3)} AU · P = ${orbitalPeriodYears(a).toFixed(2)} yr`,
			position: (y) => planetPosition(id as PlanetId, y),
			focusDistance: Math.max(kmToAU(BODY_RADIUS_KM[id]) * 8, 0.002),
			radiusAU: kmToAU(BODY_RADIUS_KM[id])
		});
	}

	out.push({
		id: 'moon',
		kind: 'moon',
		name: 'Moon',
		subtitle: 'Simplified circular orbit · 384,400 km',
		position: moonPosition,
		focusDistance: 0.004,
		radiusAU: kmToAU(1737.4),
		keywords: 'luna lunar'
	});

	for (const phase of PHASES) {
		const w = phaseWindow(phase.id)!;
		out.push({
			id: phase.id,
			kind: 'phase',
			name: `${phaseLabel(phase)} · ${phase.title}`,
			subtitle: `${Math.round(w.start)}–${Math.round(w.end)} (nominal)`,
			phase,
			position: () => ORIGIN,
			focusDistance: phase.id === 'phase-3a' ? 60 : phase.id === 'phase-3b' ? 3 : 3,
			keywords: phase.relatedResearch.join(' ')
		});
		for (const bom of phase.bom) {
			const placement = PLACEMENTS.find((p) => p.bomId === bom.id);
			const anchor = placement?.anchor;
			out.push({
				id: bom.id,
				kind: 'bom',
				name: bom.name,
				subtitle: `${bom.id} · ${phaseLabel(phase)} · ${bom.category}`,
				phaseId: phase.id,
				bom,
				phase,
				placement,
				position: anchor ? (anchor.kind === 'body' ? surfacePoint(anchor.body) : (y) => anchorPosition(anchor, y)) : () => ORIGIN,
				focusDistance: anchor ? anchorExtent(anchor) * 2.5 : 3,
				keywords: `${bom.slug} ${bom.description}`
			});
		}
	}
	return out;
}

export const ENTITIES: Entity[] = buildEntities();
const BY_ID = new Map(ENTITIES.map((e) => [e.id, e]));

export function getEntity(id: string | null | undefined): Entity | undefined {
	return id ? BY_ID.get(id) : undefined;
}

/** Simple ranked substring search for the command palette. */
export function searchEntities(query: string, limit = 12): Entity[] {
	const q = query.trim().toLowerCase();
	if (!q) return ENTITIES.filter((e) => e.kind !== 'bom').slice(0, limit);
	const scored: { e: Entity; s: number }[] = [];
	for (const e of ENTITIES) {
		const name = e.name.toLowerCase();
		let s = 0;
		if (e.id === q) s = 100;
		else if (name.startsWith(q)) s = 50;
		else if (name.includes(q)) s = 30;
		else if (e.subtitle.toLowerCase().includes(q)) s = 15;
		else if (e.keywords?.toLowerCase().includes(q)) s = 5;
		if (s) scored.push({ e, s });
	}
	return scored
		.sort((a, b) => b.s - a.s)
		.slice(0, limit)
		.map((x) => x.e);
}
