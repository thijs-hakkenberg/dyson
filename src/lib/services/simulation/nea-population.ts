/**
 * NEA Population Generator
 *
 * Generates synthetic Near-Earth Asteroid populations with realistic
 * orbital distributions based on known NEA population statistics.
 */

import type { NEA, NEAType, OrbitalElements } from './simulation-types';

// Random number generator with seed support for reproducibility
class SeededRandom {
	private seed: number;

	constructor(seed: number = Date.now()) {
		this.seed = seed;
	}

	// Linear congruential generator
	next(): number {
		this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
		return this.seed / 4294967296;
	}

	// Box-Muller transform for normal distribution
	nextGaussian(mean: number, stdDev: number): number {
		const u1 = this.next();
		const u2 = this.next();
		const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
		return z0 * stdDev + mean;
	}

	// Uniform distribution in range
	nextRange(min: number, max: number): number {
		return min + this.next() * (max - min);
	}
}

/**
 * NEA type distribution based on observed populations
 * M-type: ~5% (metallic, highest mining value)
 * C-type: ~75% (carbonaceous, good for volatiles)
 * S-type: ~17% (silicaceous, moderate value)
 * X-type: ~3% (various, often metallic)
 */
const NEA_TYPE_DISTRIBUTION: { type: NEAType; probability: number; valueMultiplier: number }[] = [
	{ type: 'C', probability: 0.75, valueMultiplier: 0.6 },
	{ type: 'S', probability: 0.17, valueMultiplier: 0.4 },
	{ type: 'M', probability: 0.05, valueMultiplier: 1.0 },
	{ type: 'X', probability: 0.03, valueMultiplier: 0.8 }
];

/**
 * Orbital parameter distributions based on NEA population studies
 */
const ORBITAL_DISTRIBUTIONS = {
	// Semi-major axis: 0.5-3.5 AU, peaked around 1.5 AU
	semiMajorAxis: { min: 0.5, max: 3.5, mean: 1.5, stdDev: 0.6 },
	// Eccentricity: 0-0.9, peaked around 0.4
	eccentricity: { min: 0, max: 0.9, mean: 0.4, stdDev: 0.2 },
	// Inclination: 0-60 degrees, peaked around 10 degrees
	inclination: { min: 0, max: 60, mean: 10, stdDev: 12 },
	// Argument of perihelion: 0-360 (uniform)
	omega: { min: 0, max: 360 },
	// Longitude of ascending node: 0-360 (uniform)
	Omega: { min: 0, max: 360 },
	// Mean anomaly: 0-360 (uniform)
	M: { min: 0, max: 360 }
};

/**
 * Diameter distribution following power law (more small objects)
 * Based on NEA size-frequency distribution
 */
const DIAMETER_DISTRIBUTION = {
	min: 50,      // 50 meters - smallest surveyed
	max: 10000,   // 10 km - largest NEAs
	powerLaw: -2.5  // Power law exponent
};

/**
 * Generate a random NEA type based on population distribution
 */
function generateNEAType(rng: SeededRandom): { type: NEAType; valueMultiplier: number } {
	const roll = rng.next();
	let cumulative = 0;
	for (const dist of NEA_TYPE_DISTRIBUTION) {
		cumulative += dist.probability;
		if (roll <= cumulative) {
			return { type: dist.type, valueMultiplier: dist.valueMultiplier };
		}
	}
	return { type: 'C', valueMultiplier: 0.6 }; // Default fallback
}

/**
 * Generate orbital elements with realistic distributions
 */
function generateOrbitalElements(rng: SeededRandom): OrbitalElements {
	// Semi-major axis with Gaussian distribution, clamped to valid range
	let a = rng.nextGaussian(
		ORBITAL_DISTRIBUTIONS.semiMajorAxis.mean,
		ORBITAL_DISTRIBUTIONS.semiMajorAxis.stdDev
	);
	a = Math.max(ORBITAL_DISTRIBUTIONS.semiMajorAxis.min,
				Math.min(ORBITAL_DISTRIBUTIONS.semiMajorAxis.max, a));

	// Eccentricity with Gaussian distribution, clamped
	let e = rng.nextGaussian(
		ORBITAL_DISTRIBUTIONS.eccentricity.mean,
		ORBITAL_DISTRIBUTIONS.eccentricity.stdDev
	);
	e = Math.max(ORBITAL_DISTRIBUTIONS.eccentricity.min,
				Math.min(ORBITAL_DISTRIBUTIONS.eccentricity.max, e));

	// Ensure perihelion is less than 1.3 AU (NEA definition)
	// q = a(1-e) < 1.3
	const perihelion = a * (1 - e);
	if (perihelion > 1.3) {
		// Adjust eccentricity to meet NEA criteria
		e = Math.max(0, 1 - 1.3 / a);
	}

	// Inclination with Gaussian distribution (Rayleigh-like for small values)
	let i = Math.abs(rng.nextGaussian(
		ORBITAL_DISTRIBUTIONS.inclination.mean,
		ORBITAL_DISTRIBUTIONS.inclination.stdDev
	));
	i = Math.min(ORBITAL_DISTRIBUTIONS.inclination.max, i);

	return {
		a,
		e,
		i,
		omega: rng.nextRange(ORBITAL_DISTRIBUTIONS.omega.min, ORBITAL_DISTRIBUTIONS.omega.max),
		Omega: rng.nextRange(ORBITAL_DISTRIBUTIONS.Omega.min, ORBITAL_DISTRIBUTIONS.Omega.max),
		M: rng.nextRange(ORBITAL_DISTRIBUTIONS.M.min, ORBITAL_DISTRIBUTIONS.M.max)
	};
}

/**
 * Generate diameter following power law distribution
 * More small objects than large ones
 */
function generateDiameter(rng: SeededRandom): number {
	const { min, max, powerLaw } = DIAMETER_DISTRIBUTION;
	// Inverse transform sampling for power law
	const u = rng.next();
	const minPow = Math.pow(min, powerLaw + 1);
	const maxPow = Math.pow(max, powerLaw + 1);
	return Math.pow(minPow + u * (maxPow - minPow), 1 / (powerLaw + 1));
}

/**
 * Estimate mass from diameter assuming average NEA density
 */
function estimateMass(diameter: number, type: NEAType): number {
	// Density estimates by type (kg/m^3)
	const densities: Record<NEAType, number> = {
		'M': 5000,  // Metallic
		'S': 2700,  // Silicaceous
		'C': 1300,  // Carbonaceous (porous)
		'X': 3500   // Mixed/unknown
	};
	const radius = diameter / 2;
	const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
	return volume * densities[type];
}

/**
 * Calculate mining value based on type, size, and accessibility
 */
function calculateMiningValue(
	type: NEAType,
	diameter: number,
	orbital: OrbitalElements,
	typeValueMultiplier: number
): number {
	// Size factor: larger asteroids have more resources
	// But logarithmic scale - diminishing returns
	const sizeFactor = Math.log10(diameter / 100) / 2; // 0-1 for 100m-10km

	// Accessibility factor: based on orbital characteristics
	// Lower eccentricity and inclination = easier access
	const accessibilityFactor = 1 - (orbital.e * 0.4 + (orbital.i / 60) * 0.3);

	// Combine factors
	const baseValue = typeValueMultiplier * sizeFactor * accessibilityFactor;

	// Normalize to 0-1 range
	return Math.max(0, Math.min(1, baseValue));
}

/**
 * Generate a synthetic NEA population
 */
export function generateNEAPopulation(count: number, seed?: number): NEA[] {
	const rng = new SeededRandom(seed);
	const neas: NEA[] = [];

	for (let i = 0; i < count; i++) {
		const { type, valueMultiplier } = generateNEAType(rng);
		const orbital = generateOrbitalElements(rng);
		const diameter = generateDiameter(rng);
		const mass = estimateMass(diameter, type);
		const miningValue = calculateMiningValue(type, diameter, orbital, valueMultiplier);

		const perihelion = orbital.a * (1 - orbital.e);
		const aphelion = orbital.a * (1 + orbital.e);

		neas.push({
			id: `NEA-${String(i + 1).padStart(5, '0')}`,
			name: generateNEAName(rng, i),
			type,
			diameter,
			estimatedMass: mass,
			miningValue,
			orbital,
			perihelion,
			aphelion
		});
	}

	return neas;
}

/**
 * Generate a realistic-looking NEA designation
 */
function generateNEAName(rng: SeededRandom, index: number): string {
	// Mix of numbered and provisional designations
	if (rng.next() < 0.3) {
		// Numbered asteroid style
		return `(${10000 + index})`;
	} else {
		// Provisional designation style (year + letter code)
		const year = 2020 + Math.floor(rng.next() * 10);
		const letters = 'ABCDEFGHJKLMNOPQRSTUVWXYZ'; // No 'I' in designations
		const letter1 = letters[Math.floor(rng.next() * letters.length)];
		const letter2 = letters[Math.floor(rng.next() * letters.length)];
		const number = Math.floor(rng.next() * 300);
		return `${year} ${letter1}${letter2}${number > 0 ? number : ''}`;
	}
}

/**
 * Filter NEAs by mining value threshold
 */
export function getHighValueNEAs(neas: NEA[], threshold: number = 0.5): NEA[] {
	return neas.filter(nea => nea.miningValue >= threshold);
}

/**
 * Get NEAs sorted by mining value (descending)
 */
export function sortByMiningValue(neas: NEA[]): NEA[] {
	return [...neas].sort((a, b) => b.miningValue - a.miningValue);
}

/**
 * Get NEA population statistics
 */
export function getPopulationStats(neas: NEA[]) {
	const typeCount: Record<NEAType, number> = { M: 0, C: 0, S: 0, X: 0 };
	let totalValue = 0;
	let minDiameter = Infinity;
	let maxDiameter = 0;

	for (const nea of neas) {
		typeCount[nea.type]++;
		totalValue += nea.miningValue;
		minDiameter = Math.min(minDiameter, nea.diameter);
		maxDiameter = Math.max(maxDiameter, nea.diameter);
	}

	return {
		total: neas.length,
		byType: typeCount,
		avgMiningValue: totalValue / neas.length,
		highValueCount: neas.filter(n => n.miningValue >= 0.5).length,
		diameterRange: { min: minDiameter, max: maxDiameter }
	};
}
