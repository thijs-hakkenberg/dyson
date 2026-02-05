/**
 * Deployment Physics Model
 *
 * Models membrane/sail deployment mechanics, failure modes, and timing
 * for large-scale solar collector structures in the Dyson swarm.
 *
 * Key physics:
 * - Larger membranes have more failure points and complexity
 * - Temperature extremes affect material properties and mechanism behavior
 * - Different deployment mechanisms have varying reliability characteristics
 * - Speed affects deployment stress and failure probability
 */

import { SeededRandom } from '$lib/services/simulation-core';
import type {
	DeploymentConfig,
	DeploymentMechanism,
	DeploymentSpeed,
	FailureMode,
	FailureModeInfo,
	DeploymentAttemptResult
} from './types';

/**
 * Mechanism-specific characteristics
 *
 * Based on space deployment heritage and engineering analysis.
 */
export const MECHANISM_COEFFICIENTS: Record<
	DeploymentMechanism,
	{
		/** Base reliability factor (higher = more reliable) */
		baseReliability: number;
		/** How much area scaling affects reliability (lower = better scalability) */
		areaScalingSensitivity: number;
		/** Temperature sensitivity (lower = more tolerant) */
		temperatureSensitivity: number;
		/** Typical deployment time multiplier */
		timeMultiplier: number;
		/** Primary failure modes and their base probabilities */
		failureProbabilities: Partial<Record<FailureMode, number>>;
	}
> = {
	inflatable: {
		baseReliability: 0.85,
		areaScalingSensitivity: 0.15,
		temperatureSensitivity: 0.8,
		timeMultiplier: 0.8,
		failureProbabilities: {
			stuck: 0.15,
			tear: 0.10,
			misalignment: 0.20,
			'thermal-warp': 0.25,
			partial: 0.20,
			oscillation: 0.10
		}
	},
	'motor-driven': {
		baseReliability: 0.90,
		areaScalingSensitivity: 0.25,
		temperatureSensitivity: 0.5,
		timeMultiplier: 1.2,
		failureProbabilities: {
			stuck: 0.35,
			tear: 0.15,
			misalignment: 0.15,
			'thermal-warp': 0.10,
			partial: 0.20,
			oscillation: 0.05
		}
	},
	centrifugal: {
		baseReliability: 0.88,
		areaScalingSensitivity: 0.10,
		temperatureSensitivity: 0.3,
		timeMultiplier: 0.6,
		failureProbabilities: {
			stuck: 0.10,
			tear: 0.25,
			misalignment: 0.25,
			'thermal-warp': 0.10,
			partial: 0.15,
			oscillation: 0.15
		}
	},
	'shape-memory': {
		baseReliability: 0.82,
		areaScalingSensitivity: 0.20,
		temperatureSensitivity: 0.9,
		timeMultiplier: 1.5,
		failureProbabilities: {
			stuck: 0.20,
			tear: 0.10,
			misalignment: 0.15,
			'thermal-warp': 0.35,
			partial: 0.15,
			oscillation: 0.05
		}
	},
	hybrid: {
		baseReliability: 0.92,
		areaScalingSensitivity: 0.12,
		temperatureSensitivity: 0.4,
		timeMultiplier: 1.0,
		failureProbabilities: {
			stuck: 0.20,
			tear: 0.15,
			misalignment: 0.15,
			'thermal-warp': 0.15,
			partial: 0.20,
			oscillation: 0.15
		}
	}
};

/**
 * Deployment speed characteristics
 */
export const SPEED_COEFFICIENTS: Record<
	DeploymentSpeed,
	{
		/** Time multiplier (lower = faster) */
		timeMultiplier: number;
		/** Reliability modifier (higher = more reliable) */
		reliabilityModifier: number;
		/** Tear probability modifier */
		tearModifier: number;
		/** Oscillation probability modifier */
		oscillationModifier: number;
	}
> = {
	slow: {
		timeMultiplier: 2.0,
		reliabilityModifier: 1.15,
		tearModifier: 0.5,
		oscillationModifier: 0.3
	},
	medium: {
		timeMultiplier: 1.0,
		reliabilityModifier: 1.0,
		tearModifier: 1.0,
		oscillationModifier: 1.0
	},
	fast: {
		timeMultiplier: 0.5,
		reliabilityModifier: 0.85,
		tearModifier: 1.8,
		oscillationModifier: 2.0
	}
};

/**
 * Reference membrane area in square meters for scaling calculations
 */
const REFERENCE_AREA = 1000;

/**
 * Base deployment time in minutes for reference area
 */
const BASE_DEPLOYMENT_TIME = 30;

/**
 * Temperature thresholds for material behavior (Celsius)
 */
const TEMP_COLD_THRESHOLD = -50;
const TEMP_HOT_THRESHOLD = 100;
const TEMP_EXTREME_COLD = -100;
const TEMP_EXTREME_HOT = 130;

/**
 * Calculate the area scaling factor
 *
 * Larger membranes have more failure points and complexity.
 * Uses logarithmic scaling to avoid extreme penalties.
 *
 * @param area - Membrane area in square meters
 * @returns Scaling factor (1.0 at reference area)
 */
export function areaScalingFactor(area: number): number {
	if (area <= 0) return 1;
	// Logarithmic scaling relative to reference area
	return Math.log10(area / REFERENCE_AREA + 1) + 1;
}

/**
 * Calculate temperature stress factor
 *
 * Extreme temperatures affect material properties and mechanism behavior.
 *
 * @param minTemp - Minimum temperature in Celsius
 * @param maxTemp - Maximum temperature in Celsius
 * @returns Temperature stress factor (1.0 is nominal)
 */
export function temperatureStressFactor(minTemp: number, maxTemp: number): number {
	const tempRange = maxTemp - minTemp;
	let stress = 1.0;

	// Cold stress
	if (minTemp < TEMP_EXTREME_COLD) {
		stress *= 1.5 + (TEMP_EXTREME_COLD - minTemp) * 0.01;
	} else if (minTemp < TEMP_COLD_THRESHOLD) {
		stress *= 1.0 + (TEMP_COLD_THRESHOLD - minTemp) * 0.005;
	}

	// Hot stress
	if (maxTemp > TEMP_EXTREME_HOT) {
		stress *= 1.4 + (maxTemp - TEMP_EXTREME_HOT) * 0.015;
	} else if (maxTemp > TEMP_HOT_THRESHOLD) {
		stress *= 1.0 + (maxTemp - TEMP_HOT_THRESHOLD) * 0.008;
	}

	// Thermal cycling stress (large temperature swings)
	if (tempRange > 150) {
		stress *= 1.0 + (tempRange - 150) * 0.003;
	}

	return stress;
}

/**
 * Calculate membrane thickness factor
 *
 * Thicker membranes are more resistant to tears but harder to deploy.
 *
 * @param thickness - Membrane thickness in micrometers
 * @returns Thickness factor affecting tear and deployment
 */
export function thicknessFactors(thickness: number): { tearResistance: number; deploymentDifficulty: number } {
	// Reference thickness is 5 micrometers
	const refThickness = 5;
	const ratio = thickness / refThickness;

	return {
		tearResistance: Math.sqrt(ratio), // Square root scaling for tear resistance
		deploymentDifficulty: Math.pow(ratio, 0.3) // Mild scaling for deployment difficulty
	};
}

/**
 * Calculate base success probability for a deployment attempt
 *
 * @param config - Deployment configuration
 * @returns Base success probability (0-1)
 */
export function calculateBaseSuccessProbability(config: DeploymentConfig): number {
	const mech = MECHANISM_COEFFICIENTS[config.deploymentMechanism];
	const speed = SPEED_COEFFICIENTS[config.deploymentSpeed];

	// Start with mechanism base reliability
	let probability = mech.baseReliability;

	// Apply area scaling penalty
	const areaFactor = areaScalingFactor(config.membraneArea);
	probability *= Math.pow(1 - mech.areaScalingSensitivity, areaFactor - 1);

	// Apply temperature stress
	const tempStress = temperatureStressFactor(config.minTemperature, config.maxTemperature);
	probability /= Math.pow(tempStress, mech.temperatureSensitivity);

	// Apply speed modifier
	probability *= speed.reliabilityModifier;

	// Thermal preconditioning bonus
	if (config.thermalPreconditioning) {
		probability *= 1.08; // 8% improvement
	}

	// Thickness effects (thicker = harder to deploy but less likely to tear)
	const thickness = thicknessFactors(config.membraneThickness);
	probability /= Math.pow(thickness.deploymentDifficulty, 0.1);

	// Clamp to valid range
	return Math.max(0.1, Math.min(0.99, probability));
}

/**
 * Model failure modes and their probabilities
 *
 * @param config - Deployment configuration
 * @returns Array of failure mode information
 */
export function modelFailureModes(config: DeploymentConfig): FailureModeInfo[] {
	const mech = MECHANISM_COEFFICIENTS[config.deploymentMechanism];
	const speed = SPEED_COEFFICIENTS[config.deploymentSpeed];
	const thickness = thicknessFactors(config.membraneThickness);
	const tempStress = temperatureStressFactor(config.minTemperature, config.maxTemperature);

	const failureModes: FailureModeInfo[] = [];

	// Stuck failure
	const stuckProb = (mech.failureProbabilities.stuck || 0.1) * (1 + (areaScalingFactor(config.membraneArea) - 1) * 0.5);
	failureModes.push({
		mode: 'stuck',
		probability: stuckProb,
		description: 'Deployment mechanism failed to initiate or complete motion',
		riskFactors: ['Larger membrane area', 'Motor-driven mechanisms', 'Cold temperatures']
	});

	// Tear failure
	const tearProb = (mech.failureProbabilities.tear || 0.1) * speed.tearModifier / thickness.tearResistance;
	failureModes.push({
		mode: 'tear',
		probability: tearProb,
		description: 'Membrane tore during deployment due to stress concentration',
		riskFactors: ['Thin membranes', 'Fast deployment speed', 'Centrifugal mechanism']
	});

	// Misalignment failure
	const misalignProb = (mech.failureProbabilities.misalignment || 0.15) * Math.sqrt(areaScalingFactor(config.membraneArea));
	failureModes.push({
		mode: 'misalignment',
		probability: misalignProb,
		description: 'Final position not within acceptable tolerance',
		riskFactors: ['Larger membrane area', 'Centrifugal mechanism', 'Temperature gradients']
	});

	// Thermal warp failure
	const thermalWarpProb = (mech.failureProbabilities['thermal-warp'] || 0.1) * tempStress * mech.temperatureSensitivity;
	failureModes.push({
		mode: 'thermal-warp',
		probability: thermalWarpProb,
		description: 'Thermal distortion during deployment caused structural deformation',
		riskFactors: ['Extreme temperatures', 'Shape-memory mechanisms', 'Large temperature range']
	});

	// Partial deployment
	const partialProb = (mech.failureProbabilities.partial || 0.15) * areaScalingFactor(config.membraneArea) * 0.8;
	failureModes.push({
		mode: 'partial',
		probability: partialProb,
		description: 'Deployment stopped before completion (mechanism stuck partway)',
		riskFactors: ['Larger membrane area', 'Complex mechanisms', 'Debris interference']
	});

	// Oscillation failure
	const oscillationProb = (mech.failureProbabilities.oscillation || 0.1) * speed.oscillationModifier;
	failureModes.push({
		mode: 'oscillation',
		probability: oscillationProb,
		description: 'Unstable deployment caused damaging oscillations',
		riskFactors: ['Fast deployment speed', 'Inflatable mechanism', 'Large membrane area']
	});

	// Normalize probabilities
	const total = failureModes.reduce((sum, fm) => sum + fm.probability, 0);
	if (total > 0) {
		for (const fm of failureModes) {
			fm.probability /= total;
		}
	}

	return failureModes;
}

/**
 * Calculate deployment time in minutes
 *
 * @param config - Deployment configuration
 * @returns Expected deployment time in minutes
 */
export function calculateDeploymentTime(config: DeploymentConfig): number {
	const mech = MECHANISM_COEFFICIENTS[config.deploymentMechanism];
	const speed = SPEED_COEFFICIENTS[config.deploymentSpeed];

	// Base time scales with square root of area
	const areaRatio = config.membraneArea / REFERENCE_AREA;
	let time = BASE_DEPLOYMENT_TIME * Math.sqrt(areaRatio);

	// Apply mechanism time multiplier
	time *= mech.timeMultiplier;

	// Apply speed multiplier
	time *= speed.timeMultiplier;

	// Thermal preconditioning adds time
	if (config.thermalPreconditioning) {
		time += 10; // 10 minutes for preconditioning
	}

	return Math.max(5, time); // Minimum 5 minutes
}

/**
 * Select a failure mode based on probabilities
 *
 * @param failureModes - Array of failure mode info
 * @param rng - Random number generator
 * @returns Selected failure mode
 */
export function selectFailureMode(failureModes: FailureModeInfo[], rng: SeededRandom): FailureMode {
	const rand = rng.next();
	let cumulative = 0;

	for (const fm of failureModes) {
		cumulative += fm.probability;
		if (rand <= cumulative) {
			return fm.mode;
		}
	}

	// Fallback
	return failureModes[failureModes.length - 1].mode;
}

/**
 * Simulate a single deployment attempt
 *
 * @param config - Deployment configuration
 * @param rng - Random number generator
 * @returns Deployment attempt result
 */
export function simulateDeploymentAttempt(
	config: DeploymentConfig,
	rng: SeededRandom
): DeploymentAttemptResult {
	const baseSuccess = calculateBaseSuccessProbability(config);
	const failureModes = modelFailureModes(config);
	const baseTime = calculateDeploymentTime(config);

	// Add variation to success probability
	const successVariation = rng.nextGaussian(1.0, 0.1);
	const adjustedSuccess = Math.max(0.05, Math.min(0.99, baseSuccess * successVariation));

	// Determine success
	const success = rng.next() < adjustedSuccess;

	// Calculate actual temperature during deployment
	const tempRange = config.maxTemperature - config.minTemperature;
	const actualTemperature = config.minTemperature + rng.next() * tempRange;

	if (success) {
		// Successful deployment
		const timeVariation = rng.nextGaussian(1.0, 0.15);
		const actualTime = Math.max(5, baseTime * timeVariation);

		// Minor area fraction variation for successful deployments
		const areaFraction = Math.min(1.0, 0.97 + rng.next() * 0.03);

		return {
			success: true,
			attemptTimeMinutes: actualTime,
			deployedAreaFraction: areaFraction,
			actualTemperature
		};
	} else {
		// Failed deployment
		const failureMode = selectFailureMode(failureModes, rng);

		// Time until failure varies by failure mode
		let timeFraction: number;
		let areaFraction: number;

		switch (failureMode) {
			case 'stuck':
				timeFraction = 0.1 + rng.next() * 0.2;
				areaFraction = rng.next() * 0.1;
				break;
			case 'tear':
				timeFraction = 0.3 + rng.next() * 0.4;
				areaFraction = 0.2 + rng.next() * 0.3;
				break;
			case 'misalignment':
				timeFraction = 0.8 + rng.next() * 0.2;
				areaFraction = 0.7 + rng.next() * 0.2;
				break;
			case 'thermal-warp':
				timeFraction = 0.4 + rng.next() * 0.4;
				areaFraction = 0.3 + rng.next() * 0.4;
				break;
			case 'partial':
				timeFraction = 0.5 + rng.next() * 0.3;
				areaFraction = 0.4 + rng.next() * 0.3;
				break;
			case 'oscillation':
				timeFraction = 0.6 + rng.next() * 0.3;
				areaFraction = 0.5 + rng.next() * 0.3;
				break;
			default:
				timeFraction = 0.5;
				areaFraction = 0.3;
		}

		const actualTime = baseTime * timeFraction * rng.nextGaussian(1.0, 0.2);

		return {
			success: false,
			failureMode,
			attemptTimeMinutes: Math.max(1, actualTime),
			deployedAreaFraction: Math.max(0, Math.min(0.9, areaFraction)),
			actualTemperature
		};
	}
}

/**
 * Calculate deployment success probability accounting for multiple attempts
 *
 * @param singleAttemptProbability - Success probability for one attempt
 * @param maxAttempts - Maximum number of attempts allowed
 * @returns Overall success probability with retries
 */
export function calculateSuccessWithRetries(
	singleAttemptProbability: number,
	maxAttempts: number
): number {
	// Probability of all attempts failing
	const allFailProbability = Math.pow(1 - singleAttemptProbability, maxAttempts);
	return 1 - allFailProbability;
}
