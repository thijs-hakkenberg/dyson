/**
 * Orbital Mechanics Utilities
 *
 * Physical constants and calculations for heliocentric orbital dynamics,
 * solar radiation pressure, and transfer costs.
 */

// Physical constants
export const CONSTANTS = {
	/** Solar constant at 1 AU in W/m² */
	SOLAR_FLUX_1AU: 1361,
	/** Speed of light in m/s */
	SPEED_OF_LIGHT: 299792458,
	/** Solar radiation pressure at 1 AU in N/m² (for perfect absorber) */
	SRP_1AU: 4.56e-6,
	/** Gravitational parameter of Sun in m³/s² */
	MU_SUN: 1.32712440018e20,
	/** 1 AU in meters */
	AU_METERS: 149597870700,
	/** Seconds per year */
	SECONDS_PER_YEAR: 31557600,
	/** Gravitational parameter of Earth in m³/s² */
	MU_EARTH: 3.986004418e14
} as const;

/**
 * Calculate solar flux at a given distance from the Sun
 * @param distanceAU Distance from Sun in AU
 * @returns Solar flux in W/m²
 */
export function solarFluxAtDistance(distanceAU: number): number {
	return CONSTANTS.SOLAR_FLUX_1AU / (distanceAU * distanceAU);
}

/**
 * Calculate solar radiation pressure at a given distance
 * @param distanceAU Distance from Sun in AU
 * @param reflectivity Surface reflectivity (0 = absorber, 1 = perfect mirror)
 * @returns Pressure in N/m²
 */
export function solarRadiationPressure(distanceAU: number, reflectivity: number = 0): number {
	const basePressure = CONSTANTS.SRP_1AU / (distanceAU * distanceAU);
	// For reflective surface, pressure is (1 + reflectivity) times base
	return basePressure * (1 + reflectivity);
}

/**
 * Calculate SRP force on a surface
 * @param areaM2 Surface area in m²
 * @param distanceAU Distance from Sun in AU
 * @param reflectivity Surface reflectivity (0-1)
 * @returns Force in Newtons
 */
export function srpForce(areaM2: number, distanceAU: number, reflectivity: number = 0): number {
	return solarRadiationPressure(distanceAU, reflectivity) * areaM2;
}

/**
 * Calculate SRP acceleration for a spacecraft
 * @param areaM2 Surface area in m²
 * @param massKg Spacecraft mass in kg
 * @param distanceAU Distance from Sun in AU
 * @param reflectivity Surface reflectivity (0-1)
 * @returns Acceleration in m/s²
 */
export function srpAcceleration(
	areaM2: number,
	massKg: number,
	distanceAU: number,
	reflectivity: number = 0
): number {
	return srpForce(areaM2, distanceAU, reflectivity) / massKg;
}

/**
 * Calculate annual delta-V from continuous SRP acceleration
 * @param accelerationMs2 Acceleration in m/s²
 * @returns Delta-V in m/s/year
 */
export function annualDeltaVFromAcceleration(accelerationMs2: number): number {
	return accelerationMs2 * CONSTANTS.SECONDS_PER_YEAR;
}

/**
 * Calculate Hohmann transfer delta-V between two circular heliocentric orbits
 * @param r1AU Inner orbit radius in AU
 * @param r2AU Outer orbit radius in AU
 * @returns Total delta-V in m/s (sum of both burns)
 */
export function hohmannTransferDeltaV(r1AU: number, r2AU: number): number {
	const r1 = r1AU * CONSTANTS.AU_METERS;
	const r2 = r2AU * CONSTANTS.AU_METERS;
	const mu = CONSTANTS.MU_SUN;

	// Velocities in circular orbits
	const v1 = Math.sqrt(mu / r1);
	const v2 = Math.sqrt(mu / r2);

	// Transfer orbit semi-major axis
	const a = (r1 + r2) / 2;

	// Velocities at perihelion and aphelion of transfer orbit
	const vTransfer1 = Math.sqrt(mu * (2 / r1 - 1 / a));
	const vTransfer2 = Math.sqrt(mu * (2 / r2 - 1 / a));

	// Delta-V for each burn
	const dv1 = Math.abs(vTransfer1 - v1);
	const dv2 = Math.abs(v2 - vTransfer2);

	return dv1 + dv2;
}

/**
 * Calculate Hohmann transfer time
 * @param r1AU Inner orbit radius in AU
 * @param r2AU Outer orbit radius in AU
 * @returns Transfer time in days
 */
export function hohmannTransferTime(r1AU: number, r2AU: number): number {
	const r1 = r1AU * CONSTANTS.AU_METERS;
	const r2 = r2AU * CONSTANTS.AU_METERS;
	const a = (r1 + r2) / 2;

	// Transfer orbit period
	const T = 2 * Math.PI * Math.sqrt((a * a * a) / CONSTANTS.MU_SUN);

	// Half the period for transfer
	return T / 2 / 86400; // Convert seconds to days
}

/**
 * Calculate orbital period
 * @param semiMajorAxisAU Semi-major axis in AU
 * @returns Period in days
 */
export function orbitalPeriod(semiMajorAxisAU: number): number {
	const a = semiMajorAxisAU * CONSTANTS.AU_METERS;
	const T = 2 * Math.PI * Math.sqrt((a * a * a) / CONSTANTS.MU_SUN);
	return T / 86400;
}

/**
 * Calculate orbital velocity for circular orbit
 * @param distanceAU Distance from Sun in AU
 * @returns Velocity in m/s
 */
export function circularOrbitalVelocity(distanceAU: number): number {
	const r = distanceAU * CONSTANTS.AU_METERS;
	return Math.sqrt(CONSTANTS.MU_SUN / r);
}

/**
 * Calculate escape velocity from a body
 * @param mu Gravitational parameter in m³/s²
 * @param radiusM Distance from center in meters
 * @returns Escape velocity in m/s
 */
export function escapeVelocity(mu: number, radiusM: number): number {
	return Math.sqrt((2 * mu) / radiusM);
}

/**
 * Calculate light-time delay for communication
 * @param distanceAU Distance in AU
 * @returns One-way delay in seconds
 */
export function lightTimeDelay(distanceAU: number): number {
	return (distanceAU * CONSTANTS.AU_METERS) / CONSTANTS.SPEED_OF_LIGHT;
}

/**
 * Orbital perturbation types and magnitudes
 */
export interface PerturbationBudget {
	/** Solar gravitational gradient (tidal) in m/s²  */
	solarGradient: number;
	/** Third-body perturbations (planets) in m/s² */
	thirdBody: number;
	/** Solar wind variability in m/s² */
	solarWind: number;
	/** Total perturbation magnitude in m/s² */
	total: number;
}

/**
 * Estimate perturbation magnitudes at a given distance
 * @param distanceAU Distance from Sun in AU
 * @param separationKm Characteristic separation distance in km (for gradient)
 * @returns Perturbation budget in m/s²
 */
export function estimatePerturbations(distanceAU: number, separationKm: number = 1): PerturbationBudget {
	const r = distanceAU * CONSTANTS.AU_METERS;
	const sep = separationKm * 1000;

	// Solar gravitational gradient (tidal)
	const solarGradient = (2 * CONSTANTS.MU_SUN * sep) / (r * r * r);

	// Third-body (approximate Earth/Venus perturbation at closest approach)
	// Very simplified - actual value depends on geometry
	const thirdBody = 1e-10 / (distanceAU * distanceAU);

	// Solar wind variability (typically << SRP)
	const solarWind = 1e-11 / (distanceAU * distanceAU);

	return {
		solarGradient,
		thirdBody,
		solarWind,
		total: solarGradient + thirdBody + solarWind
	};
}

/**
 * Delta-V budget categories for swarm operations
 */
export interface DeltaVBudget {
	/** Station-keeping against perturbations (m/s/year) */
	stationKeeping: number;
	/** Collision avoidance reserve (m/s/year) */
	collisionAvoidance: number;
	/** Formation maintenance (m/s/year) */
	formationMaintenance: number;
	/** Total annual budget (m/s/year) */
	totalAnnual: number;
}

/**
 * Calculate delta-V budget for a collector unit
 */
export function calculateDeltaVBudget(
	distanceAU: number,
	areaM2: number,
	massKg: number,
	formationToleranceM: number = 100
): DeltaVBudget {
	const perturbations = estimatePerturbations(distanceAU, formationToleranceM / 1000);

	// Station-keeping: counteract perturbations (continuous application)
	const stationKeeping = perturbations.total * CONSTANTS.SECONDS_PER_YEAR * 0.1; // 10% duty cycle

	// Collision avoidance: reserve for emergency maneuvers
	const collisionAvoidance = 2.0; // Fixed reserve of 2 m/s/year

	// Formation maintenance: depends on tolerance
	const formationMaintenance = (1000 / formationToleranceM) * 0.5; // Tighter = more ΔV

	return {
		stationKeeping,
		collisionAvoidance,
		formationMaintenance,
		totalAnnual: stationKeeping + collisionAvoidance + formationMaintenance
	};
}
