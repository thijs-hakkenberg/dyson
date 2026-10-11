/**
 * Deep-time projection state: how far past the construction timeline (Myr)
 * the Sun's galactic orbit is projected, and whether the engine runs. The sky
 * orientation used by every Milky Way background comes from here.
 */

import { explorer, MAX_YEAR } from './state.svelte';
import { M_SUN_KG, thrustAt } from './metrics';
import { integrateSunOrbit, skyMatrix, skyRotation, skyRotationForYear, type OrbitSample } from './galactic';

export const DEEP_MAX_MYR = 250;

/** Playback rates once the construction timeline has run out (Myr per second), one per speed button. */
export const DEEP_SPEEDS = [
	{ label: '0.1 Myr/s', myrps: 0.1 },
	{ label: '0.25 Myr/s', myrps: 0.25 },
	{ label: '0.5 Myr/s', myrps: 0.5 },
	{ label: '1 Myr/s', myrps: 1 },
	{ label: '2.5 Myr/s', myrps: 2.5 },
	{ label: '5 Myr/s', myrps: 5 }
] as const;

/** Advance playback by dt seconds: construction years first, then deep time past the build-out. */
export function advancePlayback(dt: number) {
	if (explorer.year < MAX_YEAR) {
		const next = explorer.year + dt * explorer.speed.yps;
		explorer.setYear(next);
		return;
	}
	const rate = DEEP_SPEEDS[Math.min(DEEP_SPEEDS.length - 1, explorer.speedIndex)].myrps;
	deepTime.myr = Math.min(DEEP_MAX_MYR, deepTime.myr + dt * rate);
	if (deepTime.myr >= DEEP_MAX_MYR) explorer.playing = false;
}

class DeepTime {
	myr = $state(0);
	engine = $state(true);
	private cache: { on: OrbitSample[]; off: OrbitSample[] } | null = null;

	/** Full engine acceleration (m/s²) once the engine is complete. */
	get fullAccel(): number {
		return thrustAt(MAX_YEAR) / M_SUN_KG;
	}

	orbits() {
		this.cache ??= {
			on: integrateSunOrbit(DEEP_MAX_MYR, this.fullAccel),
			off: integrateSunOrbit(DEEP_MAX_MYR, 0)
		};
		return this.cache;
	}

	sampleAt(myr: number, engine: boolean): OrbitSample {
		const o = engine ? this.orbits().on : this.orbits().off;
		const i = Math.min(o.length - 2, Math.max(0, Math.floor(myr)));
		const a = o[i];
		const b = o[i + 1];
		const f = Math.min(1, Math.max(0, (myr - a.tMyr) / Math.max(1e-9, b.tMyr - a.tMyr)));
		const lerp = (x: number[], y: number[]) => x.map((v, k) => v + (y[k] - v) * f) as [number, number, number];
		return { tMyr: myr, pos: lerp(a.pos, b.pos), vel: lerp(a.vel, b.vel) };
	}

	/** Sky rotation (rad) for the current view. */
	get rotation(): { dl: number; db: number } {
		if (this.myr > 0) return skyRotation(this.sampleAt(this.myr, this.engine).pos);
		return skyRotationForYear(explorer.year);
	}

	get matrix(): number[][] {
		const r = this.rotation;
		return skyMatrix(r.dl, r.db);
	}
}

export const deepTime = new DeepTime();
