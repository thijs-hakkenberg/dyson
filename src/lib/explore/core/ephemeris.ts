/**
 * Planetary ephemeris from JPL approximate Keplerian elements.
 *
 * Source: E.M. Standish, "Keplerian Elements for Approximate Positions of the
 * Major Planets", JPL Solar System Dynamics — Table 2a/2b (valid 3000 BC to
 * 3000 AD). Accuracy is on the order of arcminutes for the inner planets and
 * better than ~0.5° for the outer planets over that span, which is ample for
 * visualisation and covers the whole projected construction timeline.
 */

import { JD_J2000, eclipticToScene, yearToJD } from './units';

export type PlanetId = 'mercury' | 'venus' | 'earth' | 'mars' | 'jupiter' | 'saturn' | 'uranus' | 'neptune';

/** [a (AU), e, I (deg), L (deg), varpi (deg), Omega (deg)] at J2000 and per Julian century. */
type ElementRow = [number, number, number, number, number, number];

interface PlanetElements {
	base: ElementRow;
	rate: ElementRow;
	/** Extra mean-anomaly terms (b, c, s, f) for Jupiter–Neptune. */
	extra?: [number, number, number, number];
}

const ELEMENTS: Record<PlanetId, PlanetElements> = {
	mercury: {
		base: [0.38709843, 0.20563661, 7.00559432, 252.25166724, 77.45771895, 48.33961819],
		rate: [0.0, 0.00002123, -0.00590158, 149472.67486623, 0.1594001, -0.12214182]
	},
	venus: {
		base: [0.72332102, 0.00676399, 3.39777545, 181.9797085, 131.76755713, 76.67261496],
		rate: [-0.00000026, -0.00005107, 0.00043494, 58517.8156026, 0.05679648, -0.27274174]
	},
	// Earth–Moon barycentre
	earth: {
		base: [1.00000018, 0.01673163, -0.00054346, 100.46691572, 102.93005885, -5.11260389],
		rate: [-0.00000003, -0.00003661, -0.01337178, 35999.37306329, 0.3179526, -0.24123856]
	},
	mars: {
		base: [1.52371243, 0.09336511, 1.85181869, -4.56813164, -23.91744784, 49.71320984],
		rate: [0.00000097, 0.00009149, -0.00724757, 19140.29934243, 0.45223625, -0.26852431]
	},
	jupiter: {
		base: [5.20248019, 0.0485359, 1.29861416, 34.33479152, 14.27495244, 100.29282654],
		rate: [-0.00002864, 0.00018026, -0.00322699, 3034.90371757, 0.18199196, 0.13024619],
		extra: [-0.00012452, 0.0606406, -0.35635438, 38.35125]
	},
	saturn: {
		base: [9.54149883, 0.05550825, 2.49424102, 50.07571329, 92.86136063, 113.63998702],
		rate: [-0.00003065, -0.00032044, 0.00451969, 1222.11494724, 0.54179478, -0.25015002],
		extra: [0.00025899, -0.13434469, 0.87320147, 38.35125]
	},
	uranus: {
		base: [19.18797948, 0.0468574, 0.77298127, 314.20276625, 172.43404441, 73.96250215],
		rate: [-0.00020455, -0.0000155, -0.00180155, 428.49512595, 0.09266985, 0.05739699],
		extra: [0.00058331, -0.97731848, 0.17689245, 7.67025]
	},
	neptune: {
		base: [30.06952752, 0.00895439, 1.7700552, 304.22289287, 46.68158724, 131.78635853],
		rate: [0.00006447, 0.00000818, 0.000224, 218.46515314, 0.01009938, -0.00606302],
		extra: [-0.00041348, 0.68346318, -0.10162547, 7.67025]
	}
};

export const PLANET_IDS = Object.keys(ELEMENTS) as PlanetId[];

const DEG = Math.PI / 180;

/** Solve Kepler's equation M = E - e sin E (radians) by Newton iteration. */
export function solveKepler(M: number, e: number): number {
	let E = e < 0.8 ? M : Math.PI;
	for (let k = 0; k < 30; k++) {
		const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
		E -= dE;
		if (Math.abs(dE) < 1e-12) break;
	}
	return E;
}

export interface Keplerian {
	/** Semi-major axis (AU) */
	a: number;
	e: number;
	/** Inclination (deg) */
	i: number;
	/** Longitude of ascending node (deg) */
	Omega: number;
	/** Argument of perihelion (deg) */
	omega: number;
	/** Mean anomaly (deg) at epoch */
	M: number;
}

/** Heliocentric ecliptic position (AU) from classical elements. */
export function keplerToEcliptic(el: Keplerian): [number, number, number] {
	const M = ((((el.M % 360) + 540) % 360) - 180) * DEG;
	const E = solveKepler(M, el.e);
	const xp = el.a * (Math.cos(E) - el.e);
	const yp = el.a * Math.sqrt(1 - el.e * el.e) * Math.sin(E);
	const w = el.omega * DEG;
	const O = el.Omega * DEG;
	const I = el.i * DEG;
	const cw = Math.cos(w),
		sw = Math.sin(w);
	const cO = Math.cos(O),
		sO = Math.sin(O);
	const cI = Math.cos(I),
		sI = Math.sin(I);
	return [
		(cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
		(cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
		sw * sI * xp + cw * sI * yp
	];
}

/** Osculating-style elements for a planet at a Julian Date. */
export function planetElements(id: PlanetId, jd: number): Keplerian {
	const { base, rate, extra } = ELEMENTS[id];
	const T = (jd - JD_J2000) / 36525;
	const [a, e, I, L, varpi, Omega] = base.map((v, k) => v + rate[k] * T);
	let M = L - varpi;
	if (extra) {
		const [b, c, s, f] = extra;
		M += b * T * T + c * Math.cos(f * T * DEG) + s * Math.sin(f * T * DEG);
	}
	return { a, e, i: I, Omega, omega: varpi - Omega, M };
}

export function planetPositionEcliptic(id: PlanetId, jd: number): [number, number, number] {
	return keplerToEcliptic(planetElements(id, jd));
}

/** Planet position in scene coordinates (AU) at a decimal year. */
export function planetPosition(id: PlanetId, year: number): [number, number, number] {
	const [x, y, z] = planetPositionEcliptic(id, yearToJD(year));
	return eclipticToScene(x, y, z);
}

/** Sidereal orbital period in years (Kepler's third law, solar masses ≈ 1). */
export function orbitalPeriodYears(aAU: number): number {
	return Math.pow(aAU, 1.5);
}

/**
 * Sample a full orbit as a closed polyline in scene coordinates, using the
 * elements at the given year (orbits precess slowly; good for a century).
 */
export function sampleOrbit(id: PlanetId, year: number, segments = 256): Float32Array {
	const el = planetElements(id, yearToJD(year));
	const out = new Float32Array((segments + 1) * 3);
	for (let k = 0; k <= segments; k++) {
		const [x, y, z] = keplerToEcliptic({ ...el, M: (360 * k) / segments });
		const p = eclipticToScene(x, y, z);
		out.set(p, k * 3);
	}
	return out;
}

/**
 * Sun–planet Lagrange points (circular restricted three-body approximation).
 * L1/L2 use the Hill-sphere approximation r ≈ a (μ/3)^(1/3); L4/L5 lead/trail
 * by 60° along the orbit.
 */
export const PLANET_MASS_RATIO: Record<PlanetId, number> = {
	mercury: 1.66e-7,
	venus: 2.448e-6,
	earth: 3.04e-6, // Earth+Moon
	mars: 3.227e-7,
	jupiter: 9.548e-4,
	saturn: 2.859e-4,
	uranus: 4.366e-5,
	neptune: 5.151e-5
};

export type LagrangePoint = 'L1' | 'L2' | 'L4' | 'L5';

export function lagrangePosition(id: PlanetId, point: LagrangePoint, year: number): [number, number, number] {
	const [x, y, z] = planetPositionEcliptic(id, yearToJD(year));
	if (point === 'L1' || point === 'L2') {
		const hill = Math.cbrt(PLANET_MASS_RATIO[id] / 3);
		const k = point === 'L1' ? 1 - hill : 1 + hill;
		return eclipticToScene(x * k, y * k, z * k);
	}
	const ang = (point === 'L4' ? 60 : -60) * DEG;
	const c = Math.cos(ang),
		s = Math.sin(ang);
	return eclipticToScene(x * c - y * s, x * s + y * c, z);
}

/**
 * Simplified lunar position: circular orbit (384,400 km) with mean motion,
 * 5.145° inclination and a regressing node (18.6 yr). Good to a few degrees,
 * which is sub-pixel at any zoom where Earth and Moon are distinguishable
 * from the orrery view. Returned in scene coordinates (AU).
 */
export function moonPosition(year: number): [number, number, number] {
	const d = yearToJD(year) - JD_J2000;
	const L = (218.316 + 13.176396 * d) * DEG; // mean longitude
	const node = (125.045 - 0.0529538 * d) * DEG;
	const inc = 5.145 * DEG;
	const r = 384_400 / 1.495978707e8; // AU
	const u = L - node; // argument of latitude
	const x = r * (Math.cos(node) * Math.cos(u) - Math.sin(node) * Math.sin(u) * Math.cos(inc));
	const y = r * (Math.sin(node) * Math.cos(u) + Math.cos(node) * Math.sin(u) * Math.cos(inc));
	const z = r * Math.sin(u) * Math.sin(inc);
	const [ex, ey, ez] = planetPositionEcliptic('earth', yearToJD(year));
	return eclipticToScene(ex + x, ey + y, ez + z);
}
