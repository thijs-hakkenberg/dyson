/**
 * Paschen Model for Arc Initiation
 *
 * Models electrical breakdown in the solar wind plasma environment
 * using the Paschen law and plasma physics principles.
 *
 * The Paschen curve describes breakdown voltage as a function of
 * pressure-distance product (pd). In space plasma environments,
 * we operate on the left branch where breakdown voltage is high.
 */

// Physical constants
const BOLTZMANN = 1.380649e-23; // J/K
const ELECTRON_CHARGE = 1.602176634e-19; // C
const VACUUM_PERMITTIVITY = 8.854187817e-12; // F/m

// Solar wind reference parameters at 1 AU
export const SOLAR_WIND_DENSITY_1AU = 5e6; // particles/m^3 (~5 particles/cm^3)
export const SOLAR_WIND_TEMP_1AU = 1.5e5; // K (~150,000 K for electrons)

/**
 * Calculate plasma density at orbital distance using 1/r^2 scaling
 *
 * Solar wind density follows the inverse square law as the wind
 * expands radially from the Sun.
 *
 * @param orbitalDistanceAU - Distance from Sun in AU
 * @returns Plasma density in particles/m^3
 */
export function calculatePlasmaDensity(orbitalDistanceAU: number): number {
	return SOLAR_WIND_DENSITY_1AU / (orbitalDistanceAU * orbitalDistanceAU);
}

/**
 * Calculate electron temperature at orbital distance
 *
 * Temperature scales roughly as r^(-0.5) in the solar wind,
 * decreasing more slowly than density as the wind cools.
 *
 * @param orbitalDistanceAU - Distance from Sun in AU
 * @returns Electron temperature in K
 */
export function calculateElectronTemperature(orbitalDistanceAU: number): number {
	return SOLAR_WIND_TEMP_1AU * Math.pow(orbitalDistanceAU, -0.5);
}

/**
 * Calculate Debye length - characteristic plasma screening distance
 *
 * The Debye length is the scale over which mobile charge carriers
 * screen out electric fields. Important for understanding plasma sheath
 * formation around conductors.
 *
 * lambda_D = sqrt(epsilon_0 * k * T_e / (n_e * e^2))
 *
 * @param electronDensity - Electron density in m^-3
 * @param electronTemp - Electron temperature in K
 * @returns Debye length in meters
 */
export function calculateDebyeLength(electronDensity: number, electronTemp: number): number {
	return Math.sqrt(
		(VACUUM_PERMITTIVITY * BOLTZMANN * electronTemp) /
			(electronDensity * ELECTRON_CHARGE * ELECTRON_CHARGE)
	);
}

/**
 * Calculate Paschen breakdown voltage
 *
 * Uses modified Paschen curve for low-pressure plasma environment.
 * The classic Paschen formula is:
 *
 * V_b = B * p * d / (ln(A * p * d) - ln(ln(1 + 1/gamma)))
 *
 * For space plasma, we convert plasma density to equivalent pressure.
 * At very low pd (left branch), breakdown voltage increases.
 *
 * @param plasmaDensity - Plasma density in m^-3
 * @param gapDistance - Gap distance in meters
 * @returns Breakdown voltage in V
 */
export function calculatePaschenBreakdownVoltage(
	plasmaDensity: number,
	gapDistance: number
): number {
	// Paschen constants (modified for H+ dominated solar wind)
	const A = 15; // ionization coefficient (1/(Pa*m))
	const B = 365; // V/(Torr*cm) -> we convert to SI
	const gamma = 0.01; // secondary emission coefficient (low for space)

	// Convert plasma density to equivalent pressure
	// Using ideal gas approximation: p = n * k * T
	// We use a reference temperature for this conversion
	const refTemp = 1e5; // K
	const equivalentPressure = (plasmaDensity * BOLTZMANN * refTemp) / 133.322; // Torr
	const pd = equivalentPressure * gapDistance * 100; // Torr*cm

	// Handle very low pd (left branch of Paschen curve)
	// This is the regime for space plasma where vacuum breakdown dominates
	if (pd < 0.001) {
		// Vacuum breakdown field is typically ~10^7 V/m to 10^8 V/m
		// Use lower estimate for conservative analysis
		return 1e7 * gapDistance;
	}

	// For somewhat higher pd, still in left branch
	if (pd < 0.1) {
		// Transition regime - use interpolation
		const vacuumBreakdown = 1e7 * gapDistance;
		const transitionFactor = Math.log10(pd / 0.001) / Math.log10(0.1 / 0.001);
		const paschenMin = 300; // Typical Paschen minimum ~300V
		return vacuumBreakdown * Math.pow(paschenMin / vacuumBreakdown, transitionFactor);
	}

	// Standard Paschen formula for moderate pd
	const lnTerm = Math.log(A * pd) - Math.log(Math.log(1 + 1 / gamma));
	if (lnTerm <= 0.1) {
		// Near or at minimum
		return 300 + Math.abs(lnTerm) * 100;
	}

	return (B * pd) / lnTerm;
}

/**
 * Calculate arc initiation probability
 *
 * Based on voltage stress relative to breakdown voltage using
 * a sigmoid probability curve. Arc initiation is stochastic -
 * even below breakdown voltage there's some probability of arc,
 * and above breakdown it's not guaranteed.
 *
 * P = 1 / (1 + exp(-k * (V/V_b - 1)))
 *
 * @param appliedVoltage - Applied voltage in V
 * @param breakdownVoltage - Breakdown voltage in V
 * @param stochasticFactor - Controls curve steepness (default 0.1)
 * @returns Probability of arc initiation (0-1)
 */
export function calculateArcInitiationProbability(
	appliedVoltage: number,
	breakdownVoltage: number,
	stochasticFactor: number = 0.1
): number {
	const ratio = appliedVoltage / breakdownVoltage;

	// Below 50% of breakdown, probability is essentially zero
	if (ratio < 0.5) return 0;

	// Above 200% of breakdown, probability is essentially 1
	if (ratio > 2.0) return 0.99;

	// Sigmoid probability curve
	// k controls steepness: larger k = sharper transition
	// stochasticFactor allows tuning the randomness
	const k = 10 / Math.max(0.01, stochasticFactor);
	return 1 / (1 + Math.exp(-k * (ratio - 1)));
}

/**
 * Calculate effective gap distance considering plasma sheath
 *
 * Plasma sheaths form around conductors at potential differences,
 * typically extending ~5 Debye lengths. This effectively reduces
 * the gap distance for breakdown purposes.
 *
 * @param physicalGap - Physical gap distance in meters
 * @param debyeLength - Debye length in meters
 * @returns Effective gap distance in meters
 */
export function calculateEffectiveGapDistance(physicalGap: number, debyeLength: number): number {
	// Plasma sheath forms at ~5 Debye lengths from each conductor
	const sheathThickness = 5 * debyeLength;

	// Effective gap is reduced by sheath penetration from both sides
	const effectiveGap = physicalGap - 2 * sheathThickness;

	// Maintain minimum gap of 10% of physical (numerical stability)
	return Math.max(effectiveGap, physicalGap * 0.1);
}

/**
 * Calculate annual arc probability from instantaneous probability
 *
 * Converts hourly arc probability to annual using compound probability.
 * Assumes independent hourly arc events (Poisson process approximation).
 *
 * P_annual = 1 - (1 - P_hourly)^8760
 *
 * @param instantProbability - Probability per hour (0-1)
 * @param hoursPerYear - Hours per year (default 8760)
 * @returns Annual arc probability (0-1)
 */
export function calculateAnnualArcProbability(
	instantProbability: number,
	hoursPerYear: number = 8760
): number {
	if (instantProbability <= 0) return 0;
	if (instantProbability >= 1) return 1;

	// Compound probability: at least one arc in N hours
	return 1 - Math.pow(1 - instantProbability, hoursPerYear);
}
