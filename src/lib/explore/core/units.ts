/**
 * Physical constants and unit helpers for the explorer.
 *
 * Scene convention: 1 scene unit = 1 AU. Positions are heliocentric,
 * J2000 ecliptic frame, mapped to three.js as (x, z, -y) so that +Y in the
 * scene is ecliptic north.
 */

export const AU_M = 1.495978707e11;
export const AU_KM = AU_M / 1000;
export const C_M_S = 299_792_458;
export const LIGHT_SECONDS_PER_AU = AU_M / C_M_S; // ~499.0 s
export const DAYS_PER_YEAR = 365.25;
export const JD_J2000 = 2451545.0;

/** Mean radii (km). Sources: IAU/NASA planetary fact sheets. */
export const BODY_RADIUS_KM = {
	sun: 695_700,
	mercury: 2_439.7,
	venus: 6_051.8,
	earth: 6_371.0,
	mars: 3_389.5,
	jupiter: 69_911,
	saturn: 58_232,
	uranus: 25_362,
	neptune: 24_622
} as const;

export const kmToAU = (km: number) => km / AU_KM;

/** Decimal year (e.g. 2026.77) to Julian Date. */
export function yearToJD(year: number): number {
	return JD_J2000 + (year - 2000.0) * DAYS_PER_YEAR;
}

/** Calendar date to decimal year. */
export function dateToYear(d: Date): number {
	const start = Date.UTC(d.getUTCFullYear(), 0, 1);
	const end = Date.UTC(d.getUTCFullYear() + 1, 0, 1);
	return d.getUTCFullYear() + (d.getTime() - start) / (end - start);
}

/** Decimal year to an ISO-like date string (YYYY-MM-DD). */
export function formatYear(year: number): string {
	const y = Math.floor(year);
	const start = Date.UTC(y, 0, 1);
	const end = Date.UTC(y + 1, 0, 1);
	const d = new Date(start + (year - y) * (end - start));
	return d.toISOString().slice(0, 10);
}

/** Ecliptic (x, y, z) in AU to scene coordinates. */
export function eclipticToScene(x: number, y: number, z: number): [number, number, number] {
	return [x, z, -y];
}

/** Human-readable distance for an AU value, picking the most natural unit. */
export function formatDistance(au: number): string {
	const km = au * AU_KM;
	if (au >= 0.1) return `${au.toPrecision(3)} AU`;
	if (km >= 1e6) return `${(km / 1e6).toPrecision(3)} M km`;
	if (km >= 1) return `${Number(km.toPrecision(3)).toLocaleString('en-US')} km`;
	return `${Number((km * 1000).toPrecision(3)).toLocaleString('en-US')} m`;
}

/** Light travel time for a distance in AU, formatted. */
export function formatLightTime(au: number): string {
	const s = au * LIGHT_SECONDS_PER_AU;
	if (s < 60) return `${s.toFixed(1)} s`;
	if (s < 3600) return `${(s / 60).toFixed(1)} min`;
	return `${(s / 3600).toFixed(2)} h`;
}

/** Compact SI-style number formatting: 1.2e12 → "1.2 T". */
export function formatCount(n: number): string {
	if (n >= 1e12) return `${(n / 1e12).toPrecision(3)} T`;
	if (n >= 1e9) return `${(n / 1e9).toPrecision(3)} B`;
	if (n >= 1e6) return `${(n / 1e6).toPrecision(3)} M`;
	if (n >= 1e4) return `${(n / 1e3).toPrecision(3)} k`;
	return Math.round(n).toLocaleString('en-US');
}

export function formatUSD(n: number): string {
	if (n >= 1e12) return `$${(n / 1e12).toPrecision(3)}T`;
	if (n >= 1e9) return `$${(n / 1e9).toPrecision(3)}B`;
	if (n >= 1e6) return `$${(n / 1e6).toPrecision(3)}M`;
	return `$${n.toLocaleString('en-US')}`;
}

/**
 * Approximate sRGB colour of a blackbody at temperature T (K).
 * Tanner Helland's fit to the CIE colour-matching data; good for 1000–40000 K.
 * Below ~1000 K the emission is infrared; we fade to a deep red so cold
 * layers remain visible, which the HUD labels as "false colour".
 */
export function blackbodyRGB(tempK: number): [number, number, number] {
	const t = Math.max(1000, Math.min(40000, tempK)) / 100;
	let r: number, g: number, b: number;
	if (t <= 66) {
		r = 255;
		g = 99.4708025861 * Math.log(t) - 161.1195681661;
		b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
	} else {
		r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
		g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
		b = 255;
	}
	const clamp = (v: number) => Math.max(0, Math.min(255, v)) / 255;
	return [clamp(r), clamp(g), clamp(b)];
}
