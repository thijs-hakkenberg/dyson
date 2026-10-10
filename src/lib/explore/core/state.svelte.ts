/**
 * Explorer UI state (Svelte 5 runes). Shared between the 3D scene and the HUD.
 */

import { replaceState } from '$app/navigation';
import { dateToYear } from './units';
import { getEntity } from './registry';
import { TIMELINE } from './timeline';

export const TODAY_YEAR = dateToYear(new Date());
export const MAX_YEAR = Math.ceil(Math.max(...TIMELINE.map((w) => w.end)));

export const SPEEDS = [
	{ label: '1 d/s', yps: 1 / 365.25 },
	{ label: '1 wk/s', yps: 7 / 365.25 },
	{ label: '1 mo/s', yps: 1 / 12 },
	{ label: '1 yr/s', yps: 1 },
	{ label: '10 yr/s', yps: 10 },
	{ label: '50 yr/s', yps: 50 }
] as const;

export type Lens = 'physical' | 'knowledge' | 'gates';

export interface CameraCommand {
	seq: number;
	distance?: number;
	azimuth?: number;
	polar?: number;
}

export type LayerId =
	'sky' | 'fade' | 'orbits' | 'labels' | 'nea' | 'divergence' | 'phase-0' | 'phase-1' | 'phase-2' | 'phase-3a' | 'phase-3b';

export const LAYER_LABELS: Record<LayerId, string> = {
	sky: 'Milky Way',
	fade: 'Fade completed phases',
	orbits: 'Orbits',
	labels: 'Labels',
	nea: 'NEA population',
	divergence: 'Divergent views',
	'phase-0': 'P0 Resource processing',
	'phase-1': 'P1 Initial swarm',
	'phase-2': 'P2 Swarm expansion',
	'phase-3a': 'P3a Matrioshka brain',
	'phase-3b': 'P3b Stellar engine'
};

class ExplorerState {
	year = $state(TODAY_YEAR);
	playing = $state(false);
	speedIndex = $state(2);
	focusId = $state('sun');
	selectedId = $state<string | null>(null);
	paletteOpen = $state(false);
	hudVisible = $state(true);
	layers = $state<Record<LayerId, boolean>>({
		sky: true,
		fade: true,
		orbits: true,
		labels: true,
		nea: true,
		divergence: true,
		'phase-0': true,
		'phase-1': true,
		'phase-2': true,
		'phase-3a': true,
		'phase-3b': true
	});
	/** Lens: 'physical' = orrery, 'knowledge' = Research Nebula */
	lens = $state<Lens>('physical');
	/** Gate Tunnel selection: a gate id or 'trl:<id>' */
	gateSel = $state<string | null>(null);
	/** Research question selected in the Nebula */
	rqId = $state<string | null>(null);
	/** BOM item open in the Workbench (null = orrery) */
	workbenchId = $state<string | null>(null);
	/** Selected node inside the Workbench (e.g. 'model:gpt-5-2', a fork id) */
	wbSelection = $state<string | null>(null);
	/** One-shot camera command for scripted moves (tours); scenes apply each seq once */
	cameraCmd: CameraCommand | null = null;
	private cmdSeq = 0;
	/** Updated by the scene each frame for the scale bar */
	cameraDistance = $state(3);
	/** World-space size (AU) of one screen pixel at the focus point */
	auPerPixel = $state(0.001);

	get speed() {
		return SPEEDS[this.speedIndex];
	}

	get selected() {
		return getEntity(this.selectedId);
	}

	get focus() {
		return getEntity(this.focusId);
	}

	setYear(y: number) {
		this.year = Math.min(MAX_YEAR, Math.max(TODAY_YEAR, y));
	}

	select(id: string | null, { focus = true } = {}) {
		this.selectedId = id;
		const e = getEntity(id);
		if (!e) return;
		if (e.kind === 'phase') {
			const w = TIMELINE.find((t) => t.id === id);
			// Jump to the point where the phase is ~70% deployed so there is something to see
			if (w) this.setYear(w.start + (w.end - w.start) * 0.6);
			this.focusId = 'sun';
		} else if (focus) {
			this.focusId = e.placement?.anchor && ['band', 'shells'].includes(e.placement.anchor.kind) ? 'sun' : e.id;
		}
	}

	openWorkbench(id: string | null | undefined) {
		const e = getEntity(id);
		if (!e || e.kind !== 'bom') return;
		this.selectedId = e.id;
		this.wbSelection = null;
		this.workbenchId = e.id;
		this.playing = false;
	}

	/** Queue a camera move: distance in scene units, azimuth/polar in degrees. */
	commandCamera(cmd: Omit<CameraCommand, 'seq'>) {
		this.cameraCmd = { ...cmd, seq: ++this.cmdSeq };
	}

	setLens(lens: Lens) {
		this.closeWorkbench();
		this.lens = lens;
		this.playing = false;
	}

	/** Jump to a research question in the Nebula. */
	showQuestion(id: string) {
		this.closeWorkbench();
		this.lens = 'knowledge';
		this.rqId = id;
	}

	closeWorkbench() {
		this.workbenchId = null;
		this.wbSelection = null;
	}

	toggleLayer(id: LayerId) {
		this.layers[id] = !this.layers[id];
	}

	// ── Deep links: ?y=2075.2&f=earth&s=bom-1-1 ──────────────────────────
	readUrl(url: URL) {
		const y = Number(url.searchParams.get('y'));
		if (Number.isFinite(y) && y > 0) this.setYear(y);
		const f = url.searchParams.get('f');
		if (f && getEntity(f)) this.focusId = f;
		const s = url.searchParams.get('s');
		if (s && getEntity(s)) this.selectedId = s;
		const lens = url.searchParams.get('lens');
		if (lens === 'knowledge' || lens === 'gates') this.lens = lens;
		const gate = url.searchParams.get('gate');
		if (gate) this.gateSel = gate;
		const rq = url.searchParams.get('rq');
		if (rq) this.rqId = rq;
		const wb = url.searchParams.get('wb');
		if (wb) this.openWorkbench(wb);
	}

	writeUrl() {
		if (typeof window === 'undefined') return;
		const url = new URL(window.location.href);
		url.searchParams.set('y', this.year.toFixed(2));
		url.searchParams.set('f', this.focusId);
		if (this.selectedId) url.searchParams.set('s', this.selectedId);
		else url.searchParams.delete('s');
		if (this.lens !== 'physical') url.searchParams.set('lens', this.lens);
		else url.searchParams.delete('lens');
		if (this.gateSel && this.lens === 'gates') url.searchParams.set('gate', this.gateSel);
		else url.searchParams.delete('gate');
		if (this.rqId && this.lens === 'knowledge') url.searchParams.set('rq', this.rqId);
		else url.searchParams.delete('rq');
		if (this.workbenchId) url.searchParams.set('wb', this.workbenchId);
		else url.searchParams.delete('wb');
		replaceState(url, {});
	}
}

export const explorer = new ExplorerState();
