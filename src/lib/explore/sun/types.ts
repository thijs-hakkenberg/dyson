/**
 * Injection seam for the Sun's surface renderer.
 *
 * The explorer only depends on this interface. The in-repo default
 * (`createProceduralSun`) can be swapped for an external package by passing a
 * factory to `<ExploreApp sunSurface={…} />`. Implementations own their
 * geometry, materials and spin; the host owns position, lights and labels.
 */

import type { Camera, Object3D } from 'three';

export interface SunFrame {
	/** Simulated decimal year (drives rotation, solar cycle, sunspots) */
	year: number;
	/** Wall-clock seconds since start (drives short-timescale animation) */
	elapsed: number;
	camera: Camera;
}

export interface SunSurface {
	/** Root object, centred on the Sun, in scene units (AU) */
	readonly object: Object3D;
	update(frame: SunFrame): void;
	dispose(): void;
}

export interface SunSurfaceOptions {
	/** Photospheric radius in scene units (AU) */
	radius: number;
}

export type SunSurfaceFactory = (options: SunSurfaceOptions) => SunSurface;
