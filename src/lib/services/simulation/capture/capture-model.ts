/**
 * Capture Physics Model
 *
 * Models payload capture mechanics, failure modes, and energy requirements
 * for mass driver projectiles in the Dyson swarm construction.
 *
 * Key physics:
 * - Kinetic energy scales with mass and velocity squared
 * - Different capture methods have varying energy absorption characteristics
 * - Higher velocities require more deceleration, increasing structural stress
 * - Position and angle accuracy affect capture success probability
 *
 * Addresses research questions:
 * - RQ-1-25: Payload capture mechanisms for mass driver projectiles
 * - RQ-1-29: Impact forces and structural requirements for capture systems
 */

import { SeededRandom } from '$lib/services/simulation-core';
import type {
	CaptureConfig,
	CaptureMethod,
	CaptureFailureMode,
	CaptureFailureInfo,
	CaptureAttemptResult,
	MethodCharacteristics,
	CaptureEnvelope
} from './types';

/**
 * Standard gravity for g-force calculations
 */
const STANDARD_GRAVITY = 9.81; // m/s^2

/**
 * Reference velocity for scaling calculations (m/s)
 */
const REFERENCE_VELOCITY = 100;

/**
 * Reference mass for scaling calculations (kg)
 */
const REFERENCE_MASS = 100;

/**
 * Method-specific characteristics
 *
 * Based on theoretical and engineering analysis of capture mechanisms.
 */
export const METHOD_CHARACTERISTICS: Record<CaptureMethod, MethodCharacteristics> = {
	magnetic: {
		baseReliability: 0.92,
		maxVelocityMs: 500,
		energyEfficiency: 0.85,
		stressMultiplier: 0.6,
		timingSensitivity: 0.8,
		angleToleranceDeg: 5,
		captureWindowS: 0.5,
		failureProbabilities: {
			miss: 0.15,
			overspeed: 0.10,
			structural: 0.05,
			timing: 0.25,
			mechanism: 0.20,
			angle: 0.15,
			overload: 0.10
		}
	},
	mechanical: {
		baseReliability: 0.88,
		maxVelocityMs: 200,
		energyEfficiency: 0.70,
		stressMultiplier: 1.2,
		timingSensitivity: 1.2,
		angleToleranceDeg: 8,
		captureWindowS: 0.3,
		failureProbabilities: {
			miss: 0.20,
			overspeed: 0.20,
			structural: 0.15,
			timing: 0.15,
			mechanism: 0.15,
			angle: 0.10,
			overload: 0.05
		}
	},
	net: {
		baseReliability: 0.85,
		maxVelocityMs: 150,
		energyEfficiency: 0.60,
		stressMultiplier: 0.8,
		timingSensitivity: 0.6,
		angleToleranceDeg: 15,
		captureWindowS: 1.0,
		failureProbabilities: {
			miss: 0.25,
			overspeed: 0.25,
			structural: 0.10,
			timing: 0.10,
			mechanism: 0.10,
			angle: 0.10,
			overload: 0.10
		}
	},
	foam: {
		baseReliability: 0.82,
		maxVelocityMs: 100,
		energyEfficiency: 0.90,
		stressMultiplier: 0.4,
		timingSensitivity: 0.4,
		angleToleranceDeg: 20,
		captureWindowS: 2.0,
		failureProbabilities: {
			miss: 0.15,
			overspeed: 0.30,
			structural: 0.05,
			timing: 0.05,
			mechanism: 0.05,
			angle: 0.05,
			overload: 0.35
		}
	},
	tether: {
		baseReliability: 0.86,
		maxVelocityMs: 300,
		energyEfficiency: 0.95,
		stressMultiplier: 0.7,
		timingSensitivity: 1.5,
		angleToleranceDeg: 3,
		captureWindowS: 0.2,
		failureProbabilities: {
			miss: 0.30,
			overspeed: 0.10,
			structural: 0.10,
			timing: 0.30,
			mechanism: 0.10,
			angle: 0.05,
			overload: 0.05
		}
	}
};

/**
 * Calculate impact forces and structural requirements
 *
 * @param mass - Payload mass in kg
 * @param velocity - Arrival velocity in m/s
 * @returns Impact force characteristics
 */
export function modelImpactForces(
	mass: number,
	velocity: number
): {
	kineticEnergyJ: number;
	momentumKgMs: number;
	requiredDecelerationG: number;
	peakStressMultiplier: number;
	impactDurationS: number;
} {
	// Kinetic energy: KE = 0.5 * m * v^2
	const kineticEnergyJ = 0.5 * mass * velocity * velocity;

	// Momentum: p = m * v
	const momentumKgMs = mass * velocity;

	// Estimate impact duration based on velocity (faster = shorter)
	// Typical deceleration distance of 1-5 meters
	const decelerationDistance = Math.max(1, 5 * (100 / velocity));
	const impactDurationS = (2 * decelerationDistance) / velocity;

	// Required deceleration: a = v^2 / (2 * d)
	const decelerationMs2 = (velocity * velocity) / (2 * decelerationDistance);
	const requiredDecelerationG = decelerationMs2 / STANDARD_GRAVITY;

	// Stress multiplier scales with kinetic energy relative to reference
	const referenceKE = 0.5 * REFERENCE_MASS * REFERENCE_VELOCITY * REFERENCE_VELOCITY;
	const peakStressMultiplier = Math.sqrt(kineticEnergyJ / referenceKE);

	return {
		kineticEnergyJ,
		momentumKgMs,
		requiredDecelerationG,
		peakStressMultiplier,
		impactDurationS
	};
}

/**
 * Calculate energy requirement for capture
 *
 * @param method - Capture method
 * @param mass - Payload mass in kg
 * @param velocity - Arrival velocity in m/s
 * @returns Energy required in Joules
 */
export function calculateEnergyRequirement(
	method: CaptureMethod,
	mass: number,
	velocity: number
): number {
	const chars = METHOD_CHARACTERISTICS[method];
	const kineticEnergy = 0.5 * mass * velocity * velocity;

	// Energy required depends on method efficiency
	// Less efficient methods need more energy to safely absorb impact
	return kineticEnergy / chars.energyEfficiency;
}

/**
 * Calculate capture envelope for a given method and configuration
 *
 * @param method - Capture method
 * @param config - Capture configuration
 * @returns Capture envelope parameters
 */
export function calculateCaptureEnvelope(
	method: CaptureMethod,
	config: CaptureConfig
): CaptureEnvelope {
	const chars = METHOD_CHARACTERISTICS[method];

	// Position tolerance scales with method characteristics
	const maxPositionErrorM = chars.angleToleranceDeg * 0.5;

	// Angle tolerance from method characteristics
	const maxAngleDeviationDeg = chars.angleToleranceDeg;

	// Capture window from method characteristics
	const minCaptureWindowS = chars.captureWindowS * 0.5;

	// Maximum kinetic energy based on structural rating
	const baseMaxKE = 0.5 * 200 * 200 * 200; // 200kg at 200m/s
	const maxKineticEnergyJ = baseMaxKE * config.structuralRating;

	return {
		maxPositionErrorM,
		maxAngleDeviationDeg,
		minCaptureWindowS,
		maxKineticEnergyJ
	};
}

/**
 * Calculate capture success probability
 *
 * @param config - Capture configuration
 * @param rng - Random number generator
 * @returns Success probability (0-1)
 */
export function calculateCaptureSuccess(
	config: CaptureConfig,
	rng: SeededRandom
): number {
	const chars = METHOD_CHARACTERISTICS[config.captureMethod];

	// Start with base reliability
	let probability = chars.baseReliability;

	// Velocity penalty (higher velocity = harder to capture)
	const velocityRatio = config.arrivalVelocityMs / chars.maxVelocityMs;
	if (velocityRatio > 1) {
		// Exceeds method capacity - severe penalty
		probability *= Math.exp(-(velocityRatio - 1) * 3);
	} else if (velocityRatio > 0.7) {
		// Approaching limit - moderate penalty
		probability *= 1 - (velocityRatio - 0.7) * 0.5;
	}

	// Mass scaling (heavier payloads are harder)
	const massRatio = config.payloadMassKg / REFERENCE_MASS;
	probability *= Math.pow(1 / massRatio, 0.1);

	// Position accuracy penalty
	const positionRatio = config.targetAccuracyM / chars.angleToleranceDeg;
	if (positionRatio > 1) {
		probability *= Math.exp(-(positionRatio - 1) * 0.5);
	}

	// Angle variance penalty
	const angleRatio = config.approachAngleVarianceDeg / chars.angleToleranceDeg;
	if (angleRatio > 1) {
		probability *= Math.exp(-(angleRatio - 1) * 0.3);
	}

	// Timing accuracy penalty
	const timingFactor = (config.timingAccuracyMs / 10) * chars.timingSensitivity;
	probability *= Math.exp(-timingFactor * 0.1);

	// Structural rating bonus
	probability *= 1 + (config.structuralRating - 3) * 0.05;

	// Temperature effects (extreme temps reduce reliability)
	const tempDeviation = Math.abs(config.operatingTemperature - 20);
	if (tempDeviation > 100) {
		probability *= 0.95 - (tempDeviation - 100) * 0.001;
	}

	// Redundant systems bonus
	if (config.redundantSystems) {
		// Backup system provides second chance
		const backupBonus = (1 - probability) * 0.5;
		probability += backupBonus;
	}

	// Add small random variation
	const variation = rng.nextGaussian(1.0, 0.05);
	probability *= Math.max(0.5, Math.min(1.5, variation));

	// Clamp to valid range
	return Math.max(0.05, Math.min(0.99, probability));
}

/**
 * Model failure modes and their probabilities
 *
 * @param config - Capture configuration
 * @returns Array of failure mode information
 */
export function modelFailureModes(config: CaptureConfig): CaptureFailureInfo[] {
	const chars = METHOD_CHARACTERISTICS[config.captureMethod];
	const velocityRatio = config.arrivalVelocityMs / chars.maxVelocityMs;
	const massRatio = config.payloadMassKg / REFERENCE_MASS;

	const failureModes: CaptureFailureInfo[] = [];

	// Miss failure
	const missProb = (chars.failureProbabilities.miss || 0.2) *
		(config.targetAccuracyM / 2) *
		Math.sqrt(massRatio);
	failureModes.push({
		mode: 'miss',
		probability: missProb,
		description: 'Payload missed the capture envelope due to position error',
		mitigations: ['Improve tracking accuracy', 'Enlarge capture zone', 'Use net backup']
	});

	// Overspeed failure
	const overspeedProb = (chars.failureProbabilities.overspeed || 0.15) *
		Math.pow(velocityRatio, 2);
	failureModes.push({
		mode: 'overspeed',
		probability: overspeedProb,
		description: 'Arrival velocity exceeded capture system capacity',
		mitigations: ['Pre-deceleration burns', 'Use magnetic braking', 'Staged capture']
	});

	// Structural failure
	const structuralProb = (chars.failureProbabilities.structural || 0.1) *
		chars.stressMultiplier *
		Math.sqrt(velocityRatio) *
		massRatio /
		config.structuralRating;
	failureModes.push({
		mode: 'structural',
		probability: structuralProb,
		description: 'Structural damage occurred during capture due to impact forces',
		mitigations: ['Reinforce structure', 'Reduce payload mass', 'Add impact dampeners']
	});

	// Timing failure
	const timingProb = (chars.failureProbabilities.timing || 0.15) *
		chars.timingSensitivity *
		(config.timingAccuracyMs / 20);
	failureModes.push({
		mode: 'timing',
		probability: timingProb,
		description: 'Capture timing synchronization failed',
		mitigations: ['Improve clock sync', 'Extend capture window', 'Use predictive algorithms']
	});

	// Mechanism failure
	const mechanismProb = (chars.failureProbabilities.mechanism || 0.15) *
		(config.redundantSystems ? 0.5 : 1.0);
	failureModes.push({
		mode: 'mechanism',
		probability: mechanismProb,
		description: 'Capture mechanism malfunction or failure to activate',
		mitigations: ['Redundant systems', 'Regular maintenance', 'Simplified design']
	});

	// Angle failure
	const angleProb = (chars.failureProbabilities.angle || 0.1) *
		(config.approachAngleVarianceDeg / chars.angleToleranceDeg);
	failureModes.push({
		mode: 'angle',
		probability: angleProb,
		description: 'Approach angle outside acceptable tolerance',
		mitigations: ['Wider acceptance angle', 'Attitude correction burns', 'Gimbaled capture']
	});

	// Overload failure
	const kineticEnergy = 0.5 * config.payloadMassKg * Math.pow(config.arrivalVelocityMs, 2);
	const maxEnergy = 0.5 * 500 * Math.pow(chars.maxVelocityMs, 2) * config.structuralRating;
	const overloadProb = (chars.failureProbabilities.overload || 0.1) *
		Math.max(0, (kineticEnergy / maxEnergy - 0.5) * 2);
	failureModes.push({
		mode: 'overload',
		probability: overloadProb,
		description: 'Energy absorption system overloaded',
		mitigations: ['Larger energy absorbers', 'Multiple capture stages', 'Payload mass limits']
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
 * Select a failure mode based on probabilities
 *
 * @param failureModes - Array of failure mode info
 * @param rng - Random number generator
 * @returns Selected failure mode
 */
export function selectFailureMode(
	failureModes: CaptureFailureInfo[],
	rng: SeededRandom
): CaptureFailureMode {
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
 * Simulate a single capture attempt
 *
 * @param config - Capture configuration
 * @param rng - Random number generator
 * @returns Capture attempt result
 */
export function simulateCaptureAttempt(
	config: CaptureConfig,
	rng: SeededRandom
): CaptureAttemptResult {
	const chars = METHOD_CHARACTERISTICS[config.captureMethod];
	const baseSuccessProb = calculateCaptureSuccess(config, rng);
	const failureModes = modelFailureModes(config);
	const impactForces = modelImpactForces(config.payloadMassKg, config.arrivalVelocityMs);

	// Generate actual deviations
	const actualPositionErrorM = Math.abs(rng.nextGaussian(0, config.targetAccuracyM));
	const actualAngleDeviationDeg = Math.abs(rng.nextGaussian(0, config.approachAngleVarianceDeg));

	// Check if within capture envelope
	const envelope = calculateCaptureEnvelope(config.captureMethod, config);
	const withinEnvelope =
		actualPositionErrorM <= envelope.maxPositionErrorM &&
		actualAngleDeviationDeg <= envelope.maxAngleDeviationDeg;

	// Adjust success probability based on actual deviations
	let adjustedSuccessProb = baseSuccessProb;
	if (actualPositionErrorM > envelope.maxPositionErrorM * 0.5) {
		adjustedSuccessProb *= 0.8;
	}
	if (actualAngleDeviationDeg > envelope.maxAngleDeviationDeg * 0.5) {
		adjustedSuccessProb *= 0.9;
	}

	// Determine if primary capture succeeds
	const primarySuccess = withinEnvelope && rng.next() < adjustedSuccessProb;

	// Check backup system if available and primary failed
	let usedBackupSystem = false;
	let success = primarySuccess;

	if (!primarySuccess && config.redundantSystems) {
		const backupSuccessProb = adjustedSuccessProb * 0.7; // Backup is less reliable
		usedBackupSystem = true;
		success = rng.next() < backupSuccessProb;
	}

	// Calculate energy absorbed and stress
	const energyEfficiency = chars.energyEfficiency * rng.nextGaussian(1.0, 0.1);
	const energyAbsorbedJ = impactForces.kineticEnergyJ * Math.max(0.5, Math.min(1.0, energyEfficiency));

	// Peak stress calculation
	const stressVariation = rng.nextGaussian(1.0, 0.15);
	const peakStressFraction = Math.min(
		1.5,
		(impactForces.peakStressMultiplier * chars.stressMultiplier * stressVariation) / config.structuralRating
	);

	// Capture time
	const captureTimeS = chars.captureWindowS * rng.nextGaussian(1.0, 0.2);

	if (success) {
		return {
			success: true,
			actualPositionErrorM,
			actualAngleDeviationDeg,
			energyAbsorbedJ,
			peakStressFraction: Math.min(0.95, peakStressFraction),
			captureTimeS: Math.max(0.1, captureTimeS),
			usedBackupSystem
		};
	} else {
		const failureMode = selectFailureMode(failureModes, rng);
		return {
			success: false,
			failureMode,
			actualPositionErrorM,
			actualAngleDeviationDeg,
			energyAbsorbedJ: energyAbsorbedJ * rng.nextRange(0.3, 0.8), // Partial absorption
			peakStressFraction,
			captureTimeS: Math.max(0.1, captureTimeS * rng.nextRange(0.5, 1.5)),
			usedBackupSystem
		};
	}
}

/**
 * Evaluate a capture method for a given payload profile
 *
 * @param method - Capture method to evaluate
 * @param payload - Payload characteristics
 * @returns Method evaluation
 */
export function evaluateCaptureMethod(
	method: CaptureMethod,
	payload: { mass: number; velocity: number }
): {
	suitable: boolean;
	rating: number;
	limitations: string[];
	advantages: string[];
} {
	const chars = METHOD_CHARACTERISTICS[method];
	const limitations: string[] = [];
	const advantages: string[] = [];

	let rating = chars.baseReliability;

	// Check velocity compatibility
	const velocityRatio = payload.velocity / chars.maxVelocityMs;
	if (velocityRatio > 1) {
		rating *= Math.exp(-(velocityRatio - 1) * 2);
		limitations.push(`Velocity (${payload.velocity} m/s) exceeds max (${chars.maxVelocityMs} m/s)`);
	} else if (velocityRatio < 0.5) {
		advantages.push('Well within velocity envelope');
	}

	// Check mass handling
	const massRatio = payload.mass / REFERENCE_MASS;
	if (massRatio > 5) {
		rating *= 0.9;
		limitations.push('Payload mass is challenging');
	}

	// Method-specific evaluation
	switch (method) {
		case 'magnetic':
			if (payload.velocity > 300) {
				advantages.push('Excellent for high-velocity capture');
			}
			limitations.push('Requires conductive payload');
			break;
		case 'mechanical':
			if (payload.velocity < 100) {
				advantages.push('Reliable for moderate velocities');
			}
			if (payload.velocity > 150) {
				limitations.push('High mechanical stress at this velocity');
			}
			break;
		case 'net':
			advantages.push('Large capture envelope');
			advantages.push('Forgiving of angle errors');
			if (payload.velocity > 100) {
				limitations.push('Net may not arrest momentum fully');
			}
			break;
		case 'foam':
			advantages.push('Gentle deceleration');
			advantages.push('Low structural stress');
			limitations.push('Limited velocity range');
			limitations.push('Consumable foam material');
			break;
		case 'tether':
			advantages.push('Energy-efficient (momentum exchange)');
			advantages.push('Can handle high velocities');
			limitations.push('Requires precise timing');
			limitations.push('Narrow capture window');
			break;
	}

	return {
		suitable: rating > 0.5 && velocityRatio <= 1.2,
		rating: Math.max(0, Math.min(1, rating)),
		limitations,
		advantages
	};
}

/**
 * Calculate capture window duration
 *
 * @param method - Capture method
 * @param velocity - Arrival velocity in m/s
 * @returns Capture window in seconds
 */
export function calculateCaptureWindow(method: CaptureMethod, velocity: number): number {
	const chars = METHOD_CHARACTERISTICS[method];
	// Window shrinks with higher velocity
	const velocityFactor = Math.min(1, REFERENCE_VELOCITY / velocity);
	return chars.captureWindowS * velocityFactor;
}
