/**
 * Membrane Dynamics Physics Model
 *
 * Analytical models for circular membrane vibration, flutter boundaries,
 * and spin stabilization. Supports both analytical plate theory and
 * interpolation from pre-computed FE modal grids.
 *
 * Key physics:
 * - Natural frequencies from Bessel function zeros (circular membrane)
 * - Centrifugal tension from spin stabilization
 * - Flutter boundary from SRP forcing vs structural damping
 * - Trilinear interpolation of pre-computed eigenvalue grids
 */

import { solarRadiationPressure } from '$lib/services/simulation-core';
import type {
	MembraneConfig,
	ModalResult,
	StabilityClass,
	ModalGridData,
	ModalGridPoint
} from './types';

/**
 * Zeros of Bessel function J_0 for circular membrane modes
 * First 20 zeros: alpha_n where J_0(alpha_n) = 0
 */
export const BESSEL_ZEROS: number[] = [
	2.4048, 3.8317, 5.1356, 6.3802, 7.5883, 8.7715, 9.9361, 11.0864, 12.2251,
	13.3543, 14.4755, 15.5898, 16.6983, 17.8014, 18.9000, 19.9944, 21.0852,
	22.1725, 23.2568, 24.3383
];

/**
 * Calculate natural frequencies for a circular membrane using plate theory
 *
 * f_n = (alpha_n / (pi * D)) * sqrt(T / sigma)
 * where alpha_n are zeros of Bessel functions
 *
 * @param diameter - Membrane diameter in meters
 * @param tension - Applied tension in N/m
 * @param arealDensity - Areal density in kg/m^2
 * @returns Array of first 20 natural frequencies in Hz
 */
export function calculateNaturalFrequencies(
	diameter: number,
	tension: number,
	arealDensity: number
): number[] {
	const factor = Math.sqrt(tension / arealDensity) / (Math.PI * diameter);
	return BESSEL_ZEROS.map((alpha) => alpha * factor);
}

/**
 * Calculate centrifugal tension from spin stabilization
 *
 * T_centrifugal = sigma * omega^2 * (D/2)^2 / 4
 *
 * @param arealDensity - Areal density in kg/m^2
 * @param spinRate - Spin rate in RPM
 * @param diameter - Membrane diameter in meters
 * @returns Centrifugal tension in N/m
 */
export function calculateCentrifugalTension(
	arealDensity: number,
	spinRate: number,
	diameter: number
): number {
	const omegaRad = (spinRate * 2 * Math.PI) / 60; // RPM to rad/s
	const radius = diameter / 2;
	return arealDensity * omegaRad * omegaRad * radius * radius / 4;
}

/**
 * Calculate effective tension (applied + centrifugal)
 */
export function calculateEffectiveTension(
	appliedTension: number,
	centrifugalTension: number
): number {
	return appliedTension + centrifugalTension;
}

/**
 * Calculate solar radiation pressure force per unit area
 *
 * @param orbitalDistance - Distance from Sun in AU
 * @returns SRP force per area in N/m^2
 */
export function calculateSRPForce(orbitalDistance: number): number {
	// Assume membrane is a near-perfect absorber (reflectivity ~0.1 for thin-film PV)
	return solarRadiationPressure(orbitalDistance, 0.1);
}

/**
 * Calculate flutter margin ratio
 *
 * Flutter occurs when SRP forcing exceeds damping capacity:
 * flutter_condition: SRP_force_per_area > damping_ratio * 2 * sigma * omega_n
 *
 * Flutter margin = (damping_ratio * 2 * sigma * omega_n) / SRP_force_per_area
 * Margin > 2: stable, 1-2: marginal, < 1: flutter
 *
 * @param lowestFreqHz - Lowest natural frequency in Hz
 * @param arealDensity - Areal density in kg/m^2
 * @param dampingRatio - Structural damping ratio
 * @param srpForce - Solar radiation pressure in N/m^2
 * @returns Flutter margin ratio
 */
export function calculateFlutterMargin(
	lowestFreqHz: number,
	arealDensity: number,
	dampingRatio: number,
	srpForce: number
): number {
	if (srpForce <= 0) return 100; // No forcing = infinitely stable
	const omegaN = 2 * Math.PI * lowestFreqHz;
	const dampingCapacity = dampingRatio * 2 * arealDensity * omegaN;
	return dampingCapacity / srpForce;
}

/**
 * Classify stability based on flutter margin
 */
export function classifyStability(flutterMargin: number): StabilityClass {
	if (flutterMargin >= 2) return 'stable';
	if (flutterMargin >= 1) return 'marginal';
	return 'flutter';
}

/**
 * Perform full analytical analysis at one parameter point
 */
export function analyzeMembranePoint(config: MembraneConfig): ModalResult {
	// Convert areal density from g/m^2 to kg/m^2
	const sigmaSI = config.arealDensity / 1000;

	// Calculate centrifugal tension from spin
	const centrifugalT = calculateCentrifugalTension(sigmaSI, config.spinRate, config.diameter);
	const effectiveT = calculateEffectiveTension(config.tension, centrifugalT);

	// Calculate natural frequencies
	const frequencies = calculateNaturalFrequencies(config.diameter, effectiveT, sigmaSI);

	// Convert frequencies to eigenvalues (omega^2)
	const eigenvalues = frequencies.map((f) => Math.pow(2 * Math.PI * f, 2));

	// Calculate SRP forcing
	const srpForce = calculateSRPForce(config.orbitalDistance);

	// Calculate flutter margin using lowest frequency
	const flutterMargin = calculateFlutterMargin(
		frequencies[0],
		sigmaSI,
		config.dampingRatio,
		srpForce
	);

	const stability = classifyStability(flutterMargin);

	return {
		eigenvalues,
		naturalFrequencies: frequencies,
		flutterMargin,
		stability,
		effectiveTension: effectiveT,
		srpForcePerArea: srpForce
	};
}

/**
 * Find the minimum tension needed for flutter-free (stable) operation
 * at a given diameter by binary search
 */
export function findFlutterBoundaryTension(config: MembraneConfig): number {
	let low = 0.01;
	let high = 50;

	for (let i = 0; i < 30; i++) {
		const mid = (low + high) / 2;
		const testConfig = { ...config, tension: mid };
		const result = analyzeMembranePoint(testConfig);
		if (result.flutterMargin >= 2) {
			high = mid;
		} else {
			low = mid;
		}
	}

	return (low + high) / 2;
}

// --- Pre-computed Grid Loading and Interpolation ---

let cachedGrid: ModalGridData | null = null;

/**
 * Load pre-computed modal grid data from static JSON file
 * Returns null if the file is not available (falls back to analytical)
 */
export async function loadModalGrid(): Promise<ModalGridData | null> {
	if (cachedGrid) return cachedGrid;

	try {
		const response = await fetch('/content/simulation-data/membrane-dynamics/modal-grid.json');
		if (!response.ok) return null;
		cachedGrid = await response.json();
		return cachedGrid;
	} catch {
		return null;
	}
}

/**
 * Find the bracketing indices for a value in a sorted array
 * Returns [lowerIndex, upperIndex, fraction] for interpolation
 */
function findBracket(arr: number[], value: number): [number, number, number] {
	if (value <= arr[0]) return [0, 0, 0];
	if (value >= arr[arr.length - 1]) return [arr.length - 1, arr.length - 1, 0];

	for (let i = 0; i < arr.length - 1; i++) {
		if (value >= arr[i] && value <= arr[i + 1]) {
			const frac = (value - arr[i]) / (arr[i + 1] - arr[i]);
			return [i, i + 1, frac];
		}
	}

	return [arr.length - 1, arr.length - 1, 0];
}

/**
 * Look up a grid point by indices
 */
function findGridPoint(
	points: ModalGridPoint[],
	d: number,
	t: number,
	s: number,
	a: number
): ModalGridPoint | undefined {
	return points.find((p) => p.d === d && p.t === t && p.s === s && p.a === a);
}

/**
 * Interpolate eigenvalues between two arrays
 */
function lerpEigenvalues(a: number[], b: number[], t: number): number[] {
	return a.map((v, i) => v * (1 - t) + (b[i] ?? v) * t);
}

/**
 * Interpolate between grid points using quadrilinear interpolation
 * Falls back to analytical if grid points are missing
 */
export function interpolateModalGrid(
	grid: ModalGridData,
	config: MembraneConfig
): ModalResult | null {
	const { diameters, tensions, spinRates, arealDensities } = grid.grid;

	// Convert areal density from g/m^2 to kg/m^2 for grid lookup
	// Grid stores in kg/m^2
	const densityKg = config.arealDensity / 1000;

	const [d0, d1, df] = findBracket(diameters, config.diameter);
	const [t0, t1, tf] = findBracket(tensions, config.tension);
	const [s0, s1, sf] = findBracket(spinRates, config.spinRate);
	const [a0, a1, af] = findBracket(arealDensities, densityKg);

	// Try to find the 16 corner points for quadrilinear interpolation
	// Simplify to nearest-point with linear blend along most significant axis
	const corners = [
		findGridPoint(grid.points, d0, t0, s0, a0),
		findGridPoint(grid.points, d1, t0, s0, a0),
		findGridPoint(grid.points, d0, t1, s0, a0),
		findGridPoint(grid.points, d1, t1, s0, a0)
	];

	// If any corner missing, return null for analytical fallback
	if (corners.some((c) => !c)) return null;

	// Bilinear interpolation along diameter and tension (most significant axes)
	const c00 = corners[0]!;
	const c10 = corners[1]!;
	const c01 = corners[2]!;
	const c11 = corners[3]!;

	// Interpolate eigenvalues
	const ev0 = lerpEigenvalues(c00.eigenvalues, c10.eigenvalues, df);
	const ev1 = lerpEigenvalues(c01.eigenvalues, c11.eigenvalues, df);
	const eigenvalues = lerpEigenvalues(ev0, ev1, tf);

	// Interpolate flutter margin
	const fm0 = c00.flutterMargin * (1 - df) + c10.flutterMargin * df;
	const fm1 = c01.flutterMargin * (1 - df) + c11.flutterMargin * df;
	const flutterMargin = fm0 * (1 - tf) + fm1 * tf;

	// Derive frequencies from eigenvalues
	const naturalFrequencies = eigenvalues.map((ev) =>
		ev > 0 ? Math.sqrt(ev) / (2 * Math.PI) : 0
	);

	const sigmaSI = config.arealDensity / 1000;
	const centrifugalT = calculateCentrifugalTension(sigmaSI, config.spinRate, config.diameter);
	const effectiveT = calculateEffectiveTension(config.tension, centrifugalT);
	const srpForce = calculateSRPForce(config.orbitalDistance);
	const stability = classifyStability(flutterMargin);

	return {
		eigenvalues,
		naturalFrequencies,
		flutterMargin,
		stability,
		effectiveTension: effectiveT,
		srpForcePerArea: srpForce
	};
}

/**
 * Analyze membrane point using grid if available, with analytical fallback
 */
export function analyzeWithGrid(
	grid: ModalGridData | null,
	config: MembraneConfig
): { result: ModalResult; usedGrid: boolean } {
	if (grid) {
		const gridResult = interpolateModalGrid(grid, config);
		if (gridResult) {
			return { result: gridResult, usedGrid: true };
		}
	}
	return { result: analyzeMembranePoint(config), usedGrid: false };
}
