import { getContext, setContext } from 'svelte';
import { createProceduralSun } from './procedural';
import type { SunSurfaceFactory } from './types';

const KEY = Symbol('explore:sun-surface');

/** Provide a Sun surface implementation to the scene (defaults to the in-repo procedural Sun). */
export function provideSunSurface(factory: SunSurfaceFactory | undefined) {
	setContext(KEY, factory ?? createProceduralSun);
}

export function useSunSurface(): SunSurfaceFactory {
	return getContext<SunSurfaceFactory | undefined>(KEY) ?? createProceduralSun;
}
