/**
 * Seeded Random Number Generator
 *
 * Provides deterministic random number generation for reproducible simulations.
 * Uses a linear congruential generator (LCG) algorithm.
 */

export class SeededRandom {
	private state: number;
	private readonly initialSeed: number;

	constructor(seed: number = Date.now()) {
		this.initialSeed = seed;
		this.state = seed;
	}

	/**
	 * Generate next random number in [0, 1)
	 * Uses linear congruential generator
	 */
	next(): number {
		this.state = (this.state * 1664525 + 1013904223) % 4294967296;
		return this.state / 4294967296;
	}

	/**
	 * Generate normally distributed random number using Box-Muller transform
	 */
	nextGaussian(mean: number, stdDev: number): number {
		const u1 = this.next();
		const u2 = this.next();
		const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
		return z0 * stdDev + mean;
	}

	/**
	 * Generate random number in range [min, max)
	 */
	nextRange(min: number, max: number): number {
		return min + this.next() * (max - min);
	}

	/**
	 * Generate random integer in range [min, max)
	 */
	nextInt(min: number, max: number): number {
		return Math.floor(this.nextRange(min, max));
	}

	/**
	 * Generate boolean with given probability of true
	 */
	nextBoolean(probability: number = 0.5): boolean {
		return this.next() < probability;
	}

	/**
	 * Generate exponentially distributed random number
	 * Used for modeling time between events
	 */
	nextExponential(rate: number): number {
		return -Math.log(1 - this.next()) / rate;
	}

	/**
	 * Get the initial seed used to create this generator
	 */
	getSeed(): number {
		return this.initialSeed;
	}
}
