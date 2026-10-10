/**
 * Sky frame conversions for the background panorama. The ESO Milky Way
 * panorama is an equirectangular image in galactic coordinates; the scene is
 * ecliptic J2000 mapped to (x, z, −y). The 3×3 matrix built here takes a scene
 * direction to galactic (x toward l=0, z toward the north galactic pole).
 */

/** Mean obliquity of the ecliptic at J2000 (deg). */
export const OBLIQUITY_J2000 = 23.4392911;

/** Equatorial J2000 → galactic rotation (Hipparcos / IAU, rows = galactic axes). */
export const EQ_TO_GAL: number[][] = [
	[-0.0548755604, -0.8734370902, -0.4838350155],
	[0.4941094279, -0.44482963, 0.7469822445],
	[-0.867666149, -0.1980763734, 0.4559837762]
];

type M3 = number[][];
const mul = (a: M3, b: M3): M3 => a.map((r) => [0, 1, 2].map((j) => r[0] * b[0][j] + r[1] * b[1][j] + r[2] * b[2][j]));

/** Scene (x, y, z) → ecliptic (x, y, z): inverse of eclipticToScene. */
const SCENE_TO_ECL: M3 = [
	[1, 0, 0],
	[0, 0, -1],
	[0, 1, 0]
];

function eclToEq(): M3 {
	const e = (OBLIQUITY_J2000 * Math.PI) / 180;
	const c = Math.cos(e);
	const s = Math.sin(e);
	return [
		[1, 0, 0],
		[0, c, -s],
		[0, s, c]
	];
}

/** Scene direction → galactic direction. */
export const SCENE_TO_GAL: M3 = mul(EQ_TO_GAL, mul(eclToEq(), SCENE_TO_ECL));

export function apply(m: M3, v: [number, number, number]): [number, number, number] {
	return [0, 1, 2].map((i) => m[i][0] * v[0] + m[i][1] * v[1] + m[i][2] * v[2]) as [number, number, number];
}

/** Galactic direction → (l, b) in degrees, l in [0, 360). */
export function galacticLB(g: [number, number, number]): [number, number] {
	const l = (Math.atan2(g[1], g[0]) * 180) / Math.PI;
	return [(l + 360) % 360, (Math.asin(Math.max(-1, Math.min(1, g[2]))) * 180) / Math.PI];
}

/** Equirectangular panorama UV for galactic (l, b): centre = l 0°, l increases to the left. */
export function panoramaUV(lDeg: number, bDeg: number): [number, number] {
	const u = 0.5 - lDeg / 360;
	return [u - Math.floor(u), 0.5 + bDeg / 180];
}

/** Column-major Float32 layout for a GLSL mat3 uniform. */
export function toMat3Elements(m: M3): number[] {
	return [m[0][0], m[1][0], m[2][0], m[0][1], m[1][1], m[2][1], m[0][2], m[1][2], m[2][2]];
}
