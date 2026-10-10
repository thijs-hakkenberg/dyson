/**
 * The Sun's galactic orbit, with and without the stellar engine.
 *
 * Galactocentric frame aligned with galactic coordinates (inertial, tied to
 * the extragalactic reference frame): x toward the Galactic Centre as seen
 * from the Sun today, y toward l = 90° (direction of rotation), z toward the
 * north galactic pole. Units: parsec, Myr.
 *
 * Potential: flat rotation curve in the plane (Φ = V0² ln R) plus a harmonic
 * vertical term (period ~75 Myr). Simple, standard, and good to a few percent
 * over one galactic orbit; it is a projection, not an ephemeris.
 *
 * Sky orientation: features in the Milky Way panorama are far away, so to
 * first order the sky as seen from the Sun re-orients with the direction to
 * the Galactic Centre. We rotate the panorama by the change in the GC's
 * galactic longitude and latitude. Parallax of nearby stars is not modelled.
 */

import { THRUST_AXIS } from './registry';
import { SCENE_TO_GAL, apply } from './sky';

/** Sun's distance from the Galactic Centre (pc), GRAVITY 2019 ≈ 8.18 kpc. */
export const R0_PC = 8180;
/** Circular speed at the Sun (km/s). */
export const V0_KMS = 233;
/** Solar peculiar motion (U, V, W) in km/s, Schönrich et al. 2010. */
export const SOLAR_PECULIAR_KMS: [number, number, number] = [11.1, 12.24, 7.25];
/** Sun's height above the plane (pc). */
export const Z0_PC = 20.8;
/** Vertical oscillation period (Myr). */
export const VERTICAL_PERIOD_MYR = 75;

export const KMS_TO_PC_PER_MYR = 1.02271;
/** 1 m/s² in pc/Myr². */
export const MS2_TO_PC_PER_MYR2 = 3.15576e13 ** 2 / 3.0857e16;

export type V3 = [number, number, number];

export interface OrbitSample {
	tMyr: number;
	pos: V3;
	vel: V3;
}

/** Engine acceleration direction (unit vector, galactic frame). */
export function thrustDirectionGal(): V3 {
	return apply(SCENE_TO_GAL, THRUST_AXIS);
}

/**
 * Integrate the Sun's orbit (leapfrog) for `myr` with constant engine
 * acceleration `accelMs2` (m/s²) along the thrust axis. Returns samples
 * every `sampleMyr`.
 */
export function integrateSunOrbit(myr: number, accelMs2: number, stepMyr = 0.05, sampleMyr = 1): OrbitSample[] {
	const v0 = V0_KMS * KMS_TO_PC_PER_MYR;
	const nu = (2 * Math.PI) / VERTICAL_PERIOD_MYR;
	const dir = thrustDirectionGal();
	const aE = accelMs2 * MS2_TO_PC_PER_MYR2;
	const [U, V, W] = SOLAR_PECULIAR_KMS.map((x) => x * KMS_TO_PC_PER_MYR);
	// U is toward the GC (+x), V along rotation (+y), W toward NGP (+z)
	let p: V3 = [-R0_PC, 0, Z0_PC];
	let v: V3 = [U, v0 + V, W];
	const acc = (q: V3): V3 => {
		const R2 = q[0] * q[0] + q[1] * q[1];
		const k = (v0 * v0) / R2;
		return [-k * q[0] + aE * dir[0], -k * q[1] + aE * dir[1], -nu * nu * q[2] + aE * dir[2]];
	};
	const out: OrbitSample[] = [{ tMyr: 0, pos: [...p], vel: [...v] }];
	const steps = Math.ceil(myr / stepMyr);
	const h = myr / Math.max(1, steps);
	let a = acc(p);
	let nextSample = sampleMyr;
	for (let i = 1; i <= steps; i++) {
		v = [v[0] + 0.5 * h * a[0], v[1] + 0.5 * h * a[1], v[2] + 0.5 * h * a[2]];
		p = [p[0] + h * v[0], p[1] + h * v[1], p[2] + h * v[2]];
		a = acc(p);
		v = [v[0] + 0.5 * h * a[0], v[1] + 0.5 * h * a[1], v[2] + 0.5 * h * a[2]];
		const t = i * h;
		if (t >= nextSample - 1e-9 || i === steps) {
			out.push({ tMyr: t, pos: [...p], vel: [...v] });
			nextSample += sampleMyr;
		}
	}
	return out;
}

/** Galactic longitude/latitude (rad) of the Galactic Centre as seen from a position. */
export function gcDirection(pos: V3): { l: number; b: number } {
	const d: V3 = [-pos[0], -pos[1], -pos[2]];
	const r = Math.hypot(...d);
	return { l: Math.atan2(d[1], d[0]), b: Math.asin(d[2] / r) };
}

/** Sky re-orientation (rad) relative to today for a Sun position. */
export function skyRotation(pos: V3): { dl: number; db: number } {
	const now = gcDirection([-R0_PC, 0, Z0_PC]);
	const then = gcDirection(pos);
	return { dl: then.l - now.l, db: then.b - now.b };
}

/** Sky rotation during the construction timeline: linear galactic orbit, years since 2000. */
export function skyRotationForYear(year: number): { dl: number; db: number } {
	const tMyr = (year - 2000) / 1e6;
	const omega = (V0_KMS * KMS_TO_PC_PER_MYR) / R0_PC; // rad/Myr
	return { dl: omega * tMyr, db: 0 };
}

/**
 * 3×3 rotation (row-major) applied to galactic directions before the panorama
 * lookup: rotate by −dl about z, then −db about the y axis.
 */
export function skyMatrix(dl: number, db: number): number[][] {
	const cl = Math.cos(-dl),
		sl = Math.sin(-dl),
		cb = Math.cos(db),
		sb = Math.sin(db);
	const Rz = [
		[cl, -sl, 0],
		[sl, cl, 0],
		[0, 0, 1]
	];
	const Ry = [
		[cb, 0, -sb],
		[0, 1, 0],
		[sb, 0, cb]
	];
	return Ry.map((r) => [0, 1, 2].map((j) => r[0] * Rz[0][j] + r[1] * Rz[1][j] + r[2] * Rz[2][j]));
}
