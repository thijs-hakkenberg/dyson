/**
 * Tour engine: scripted, narrated camera paths over the live scene.
 *
 * A tour is a list of steps. Entering a step sets explorer state (lens,
 * workbench, focus, selection, layers), queues a camera move and optionally
 * animates the construction year. Steps advance on a timer; any interaction
 * with the scene pauses, and the viewer can resume, step, or exit. Nothing is
 * faked: every frame is the same data-driven scene the explorer shows.
 */

import { explorer, type LayerId, type Lens } from './state.svelte';

export interface YearMove {
	to: number;
	/** Seconds the year animation takes (eased) */
	over: number;
}

export interface TourStep {
	title: string;
	/** Short caption; **bold** is allowed */
	body: string;
	/** Seconds before auto-advancing */
	duration: number;
	lens?: Lens;
	/** Open a BOM item in the Workbench (null closes it) */
	workbench?: string | null;
	wbSelection?: string | null;
	focus?: string;
	select?: string | null;
	year?: number | YearMove;
	camera?: { distance?: number; azimuth?: number; polar?: number };
	layers?: Partial<Record<LayerId, boolean>>;
}

export interface Tour {
	id: string;
	title: string;
	subtitle: string;
	steps: TourStep[];
}

const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

class TourPlayer {
	tour = $state.raw<Tour | null>(null);
	index = $state(0);
	elapsed = $state(0);
	paused = $state(false);

	private yearFrom = 0;
	private savedLayers: Record<LayerId, boolean> | null = null;

	get step(): TourStep | null {
		return this.tour?.steps[this.index] ?? null;
	}

	get active() {
		return !!this.tour;
	}

	start(tour: Tour) {
		this.savedLayers ??= { ...explorer.layers };
		this.tour = tour;
		this.paused = false;
		explorer.playing = false;
		explorer.paletteOpen = false;
		this.enter(0);
	}

	private enter(i: number) {
		const s = this.tour?.steps[i];
		if (!s) return;
		this.index = i;
		this.elapsed = 0;

		if (s.lens && s.lens !== explorer.lens) explorer.setLens(s.lens);
		if (s.workbench === null && explorer.workbenchId) explorer.closeWorkbench();
		if (s.workbench) {
			if (explorer.workbenchId !== s.workbench) explorer.openWorkbench(s.workbench);
		}
		if (s.wbSelection !== undefined) explorer.wbSelection = s.wbSelection;
		if (s.layers) for (const [k, v] of Object.entries(s.layers)) explorer.layers[k as LayerId] = v!;
		if (s.select !== undefined) explorer.selectedId = s.select;
		if (s.focus) explorer.focusId = s.focus;

		this.yearFrom = explorer.year;
		if (typeof s.year === 'number') explorer.setYear(s.year);
		if (s.camera) explorer.commandCamera(s.camera);
	}

	tick(dt: number) {
		const s = this.step;
		if (!s || this.paused) return;
		this.elapsed += dt;
		if (s.year && typeof s.year === 'object') {
			const k = ease(Math.min(1, this.elapsed / s.year.over));
			explorer.setYear(this.yearFrom + (s.year.to - this.yearFrom) * k);
		}
		if (this.elapsed >= s.duration) this.next();
	}

	next() {
		if (!this.tour) return;
		if (this.index < this.tour.steps.length - 1) this.enter(this.index + 1);
		else this.finish();
	}

	prev() {
		if (this.tour && this.index > 0) this.enter(this.index - 1);
	}

	pause() {
		if (this.tour) this.paused = true;
	}

	resume() {
		this.paused = false;
	}

	/** End of tour: leave the viewer where the story ended, with layers restored. */
	finish() {
		this.restore();
		this.tour = null;
	}

	exit() {
		this.finish();
	}

	private restore() {
		if (this.savedLayers) Object.assign(explorer.layers, this.savedLayers);
		this.savedLayers = null;
	}
}

export const tour = new TourPlayer();
