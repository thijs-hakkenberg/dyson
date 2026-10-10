/**
 * Network topology over the orrery: who talks to whom, and how far light has
 * to travel. Links are derived from the consensus architectures:
 * - Phase 0: Earth mission control ↔ L4 processing station ↔ mining sites.
 * - Phase 1/2 swarm control: Earth ↔ swarm authority (Sun–Earth L1) ↔
 *   "Shepherd" coordinators (consensus: 1 per 1,000–5,000 collectors) ↔ their
 *   neighbours (coordinator ring mesh).
 * - Phase 3a: inter-layer optical trunks between adjacent Matrioshka shells.
 * One-way latency is true light time for the current geometry.
 */

import { lagrangePosition, planetPosition } from './ephemeris';
import { anchorPosition, getEntity, type Vec3 } from './registry';
import { itemProgress, phaseStarted, shellProgress } from './progress';
import { eclipticToScene, LIGHT_SECONDS_PER_AU } from './units';
import type { Anchor } from './placements';

/** Collectors per Shepherd coordinator (consensus 1,000–5,000; geometric mid). */
export const COLLECTORS_PER_SHEPHERD = Math.round(Math.sqrt(1000 * 5000));
/** Maximum coordinators drawn per swarm; the HUD states the sampling. */
export const MAX_DRAWN_SHEPHERDS = 36;
/** Pulses are animated at this multiple of the speed of light. */
export const SIGNAL_SPEEDUP = 60;

export type LinkKind = 'ground' | 'ops' | 'control' | 'mesh' | 'trunk';

export interface NetNode {
	id: string;
	label: string;
	kind: 'ground' | 'hub' | 'shepherd' | 'site' | 'relay';
	pos: Vec3;
}

export interface NetLink {
	a: string;
	b: string;
	kind: LinkKind;
	phaseId: string;
	/** One-way light time (s) */
	latency: number;
}

export interface NetworkState {
	nodes: NetNode[];
	links: NetLink[];
	/** Shepherd coordinators represented vs drawn, per swarm */
	shepherds: { bomId: string; represented: number; drawn: number }[];
}

const dist = (a: Vec3, b: Vec3) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const latency = (a: Vec3, b: Vec3) => dist(a, b) * LIGHT_SECONDS_PER_AU;

/** Point on a circular heliocentric orbit at radius r (AU), advancing at the Kepler rate. */
function circular(r: number, phase0: number, year: number): Vec3 {
	const th = phase0 + ((2 * Math.PI) / Math.pow(r, 1.5)) * (year - 2000);
	return eclipticToScene(r * Math.cos(th), r * Math.sin(th), 0);
}

function band(bomId: string): Extract<Anchor, { kind: 'band' }> | null {
	const a = getEntity(bomId)?.placement?.anchor;
	return a && a.kind === 'band' ? a : null;
}

export function networkAt(year: number): NetworkState {
	const nodes: NetNode[] = [];
	const links: NetLink[] = [];
	const shepherds: NetworkState['shepherds'] = [];
	const add = (n: NetNode) => (nodes.push(n), n);
	const link = (a: NetNode, b: NetNode, kind: LinkKind, phaseId: string) =>
		links.push({ a: a.id, b: b.id, kind, phaseId, latency: latency(a.pos, b.pos) });

	if (!phaseStarted('phase-0', year)) return { nodes, links, shepherds };

	const earth = add({ id: 'net:earth', label: 'Mission control', kind: 'ground', pos: planetPosition('earth', year) });

	// ── Phase 0: processing station and mining sites ───────────────────
	if (itemProgress('bom-0-3', 'phase-0', year) > 0) {
		const l4 = add({
			id: 'net:l4',
			label: 'Processing station',
			kind: 'hub',
			pos: lagrangePosition('earth', 'L4', year)
		});
		link(earth, l4, 'ground', 'phase-0');
		const mining = getEntity('bom-0-2')?.placement?.anchor;
		if (mining?.kind === 'nea' && itemProgress('bom-0-2', 'phase-0', year) > 0) {
			for (let k = 1; k <= mining.count; k++) {
				const site = add({
					id: `net:site${k}`,
					label: `Mining site ${k}`,
					kind: 'site',
					pos: anchorPosition({ kind: 'nea', count: k }, year)
				});
				link(l4, site, 'ops', 'phase-0');
			}
		}
	}

	// ── Phase 1/2: swarm control hierarchy ─────────────────────────────
	if (phaseStarted('phase-1', year)) {
		const hub = add({
			id: 'net:l1',
			label: 'Swarm authority (L1)',
			kind: 'hub',
			pos: lagrangePosition('earth', 'L1', year)
		});
		link(earth, hub, 'ground', 'phase-1');
		for (const [bomId, phaseId] of [
			['bom-1-1', 'phase-1'],
			['bom-2-1', 'phase-2']
		] as const) {
			const b = band(bomId);
			const qty = getEntity(bomId)?.bom?.quantity ?? 0;
			const deployed = qty * itemProgress(bomId, phaseId, year);
			if (!b || deployed < 1) continue;
			const represented = Math.max(1, Math.ceil(deployed / COLLECTORS_PER_SHEPHERD));
			const drawn = Math.min(represented, MAX_DRAWN_SHEPHERDS);
			shepherds.push({ bomId, represented, drawn });
			const ring: NetNode[] = [];
			const r = (b.rMin + b.rMax) / 2;
			for (let k = 0; k < drawn; k++) {
				const s = add({
					id: `net:${bomId}:s${k}`,
					label: `Shepherd ${k + 1}`,
					kind: 'shepherd',
					pos: circular(r, (k / drawn) * Math.PI * 2 + (bomId === 'bom-2-1' ? 0.3 : 0), year)
				});
				ring.push(s);
				link(hub, s, 'control', phaseId);
			}
			if (ring.length > 2)
				for (let k = 0; k < ring.length; k++) link(ring[k], ring[(k + 1) % ring.length], 'mesh', phaseId);
		}
	}

	// ── Phase 3a: inter-layer optical trunks ───────────────────────────
	const shells = getEntity('bom-3a-1')?.placement?.anchor;
	if (shells?.kind === 'shells' && phaseStarted('phase-3a', year)) {
		const radii = shells.layers.map((l) => l.rAU);
		const TRUNKS = 8;
		let prev: NetNode[] | null = null;
		radii.forEach((r, i) => {
			if (shellProgress(i, radii.length, year) <= 0) {
				prev = null;
				return;
			}
			const layer: NetNode[] = [];
			for (let k = 0; k < TRUNKS; k++) {
				layer.push(
					add({
						id: `net:shell${i}:r${k}`,
						label: `Trunk relay · shell ${i + 1}`,
						kind: 'relay',
						pos: circular(r, (k / TRUNKS) * Math.PI * 2, year)
					})
				);
			}
			if (prev) for (let k = 0; k < TRUNKS; k++) link(prev[k], layer[k], 'trunk', 'phase-3a');
			prev = layer;
		});
	}

	return { nodes, links, shepherds };
}

export const LINK_LABELS: Record<LinkKind, string> = {
	ground: 'Earth ↔ hubs',
	ops: 'Station ↔ mines',
	control: 'Authority ↔ Shepherds',
	mesh: 'Shepherd mesh',
	trunk: 'Inter-shell trunks'
};

export const LINK_COLORS: Record<LinkKind, string> = {
	ground: '#7dd3fc',
	ops: '#f0a830',
	control: '#22d3ee',
	mesh: '#2dd4bf',
	trunk: '#a78bfa'
};
