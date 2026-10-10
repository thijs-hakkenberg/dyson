/**
 * Synthetic NEA population for the orrery, reusing the simulation generator.
 * Elements are treated as osculating at J2000 and propagated with two-body
 * mean motion — accurate enough for a statistical cloud, and the HUD labels
 * the population as synthetic.
 */

import { generateNEAPopulation, sortByMiningValue } from '$lib/services/simulation/nea-population';
import type { NEA } from '$lib/types/simulation';
import { keplerToEcliptic } from './ephemeris';
import { JD_J2000, eclipticToScene, yearToJD } from './units';

export const NEA_SEED = 42;
export const NEA_COUNT = 2000;

export const NEA_POPULATION: NEA[] = generateNEAPopulation(NEA_COUNT, NEA_SEED);
export const NEAS_BY_VALUE: NEA[] = sortByMiningValue(NEA_POPULATION);

/** Gaussian gravitational constant expressed as mean motion at 1 AU (deg/day). */
const K_DEG_PER_DAY = 0.9856076686;

export function neaPosition(nea: NEA, year: number): [number, number, number] {
	const days = yearToJD(year) - JD_J2000;
	const n = K_DEG_PER_DAY / Math.pow(nea.orbital.a, 1.5);
	const [x, y, z] = keplerToEcliptic({
		...nea.orbital,
		M: nea.orbital.M + n * days
	});
	return eclipticToScene(x, y, z);
}

/** Fill a Float32Array with all NEA positions (scene coordinates). */
export function writeNeaPositions(out: Float32Array, neas: NEA[], year: number): void {
	for (let k = 0; k < neas.length; k++) {
		const p = neaPosition(neas[k], year);
		out[k * 3] = p[0];
		out[k * 3 + 1] = p[1];
		out[k * 3 + 2] = p[2];
	}
}
