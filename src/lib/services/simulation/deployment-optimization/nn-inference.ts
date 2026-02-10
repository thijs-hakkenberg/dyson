/**
 * Neural Network Inference for Trajectory Estimation
 *
 * Pure TypeScript forward pass for a trained MLP that estimates
 * delta-V for orbital transfers, replacing expensive Lambert solver calls.
 */

import type { NNLayer, NNWeights } from './types';

let cachedWeights: NNWeights | null = null;
let loadPromise: Promise<NNWeights | null> | null = null;

function relu(x: number): number {
	return Math.max(0, x);
}

function matMul(input: number[], weights: number[][], biases: number[]): number[] {
	const outputSize = biases.length;
	const result = new Array(outputSize);
	for (let j = 0; j < outputSize; j++) {
		let sum = biases[j];
		for (let i = 0; i < input.length; i++) {
			sum += input[i] * weights[i][j];
		}
		result[j] = sum;
	}
	return result;
}

function forward(input: number[], layers: NNLayer[]): number {
	let x = input;
	for (let i = 0; i < layers.length; i++) {
		x = matMul(x, layers[i].weights, layers[i].biases);
		if (i < layers.length - 1) {
			x = x.map(relu);
		}
	}
	return x[0];
}

/**
 * Load NN weights from static JSON file
 */
export async function loadNNWeights(): Promise<NNWeights | null> {
	if (cachedWeights) return cachedWeights;

	if (loadPromise) return loadPromise;

	loadPromise = (async () => {
		try {
			const response = await fetch('/content/simulation-data/trajectory-estimator/nn-weights.json');
			if (!response.ok) return null;
			const data = await response.json();
			cachedWeights = data as NNWeights;
			return cachedWeights;
		} catch {
			return null;
		}
	})();

	return loadPromise;
}

/**
 * Check if NN weights are available (loaded or loadable)
 */
export function isNNAvailable(): boolean {
	return cachedWeights !== null;
}

/**
 * Get cached weights without loading
 */
export function getCachedWeights(): NNWeights | null {
	return cachedWeights;
}

/**
 * Normalize an input value to [0, 1] using min/max range
 */
function normalize(value: number, min: number, max: number): number {
	if (max === min) return 0.5;
	return (value - min) / (max - min);
}

/**
 * Denormalize output from [0, 1] to original scale
 */
function denormalize(value: number, min: number, max: number): number {
	return value * (max - min) + min;
}

/**
 * Estimate delta-V for an orbital transfer using the trained NN
 *
 * @param r1 - Start orbital radius in AU
 * @param r2 - End orbital radius in AU
 * @param tof - Time of flight in days
 * @param weights - NN weights (if null, returns NaN)
 * @returns Estimated delta-V in m/s
 */
export function estimateDeltaV(
	r1: number,
	r2: number,
	tof: number,
	weights: NNWeights | null
): number {
	if (!weights) return NaN;

	const input = [
		normalize(r1, weights.inputNorm.min[0], weights.inputNorm.max[0]),
		normalize(r2, weights.inputNorm.min[1], weights.inputNorm.max[1]),
		normalize(tof, weights.inputNorm.min[2], weights.inputNorm.max[2])
	];

	const rawOutput = forward(input, weights.layers);
	// Clamp to [0, 1] before denormalization — unclamped output layer can
	// produce values outside the training range, yielding extreme delta-V
	const clamped = Math.max(0, Math.min(1, rawOutput));
	return denormalize(clamped, weights.outputNorm.min, weights.outputNorm.max);
}
