/**
 * Visual data for bodies: textures, obliquity and rotation.
 * Textures: Solar System Scope (CC BY 4.0), see static/explore/textures/CREDITS.md.
 * Obliquity is applied relative to the ecliptic about a fixed axis; pole
 * azimuth is not modelled (orientation is illustrative, size and position
 * are true).
 */

import { JD_J2000, yearToJD } from './units';

export const TEXTURE_BASE = '/explore/textures';

export interface BodyLook {
	map: string;
	/** Axial tilt (deg) */
	obliquity: number;
	/** Sidereal rotation period (hours); negative = retrograde */
	rotationHours: number;
	night?: string;
	clouds?: string;
	ring?: { map: string; innerKm: number; outerKm: number };
}

const tex = (n: string) => `${TEXTURE_BASE}/2k_${n}.webp`;

export const BODY_LOOK: Record<string, BodyLook> = {
	sun: { map: tex('sun'), obliquity: 7.25, rotationHours: 609.12 },
	mercury: { map: tex('mercury'), obliquity: 0.03, rotationHours: 1407.6 },
	venus: { map: tex('venus_atmosphere'), obliquity: 177.4, rotationHours: -5832.5 },
	earth: {
		map: tex('earth_daymap'),
		night: tex('earth_nightmap'),
		clouds: tex('earth_clouds'),
		obliquity: 23.44,
		rotationHours: 23.9345
	},
	moon: { map: tex('moon'), obliquity: 6.68, rotationHours: 655.72 },
	mars: { map: tex('mars'), obliquity: 25.19, rotationHours: 24.6229 },
	jupiter: { map: tex('jupiter'), obliquity: 3.13, rotationHours: 9.925 },
	saturn: {
		map: tex('saturn'),
		obliquity: 26.73,
		rotationHours: 10.656,
		// C ring inner edge to A ring outer edge
		ring: { map: tex('saturn_ring_alpha'), innerKm: 74_658, outerKm: 136_775 }
	},
	uranus: { map: tex('uranus'), obliquity: 97.77, rotationHours: -17.24 },
	neptune: { map: tex('neptune'), obliquity: 28.32, rotationHours: 16.11 }
};

/** Spin angle (rad) at a decimal year, from J2000. */
export function spinAngle(rotationHours: number, year: number): number {
	const hours = (yearToJD(year) - JD_J2000) * 24;
	const turns = hours / rotationHours;
	return (turns - Math.floor(turns)) * Math.PI * 2;
}
