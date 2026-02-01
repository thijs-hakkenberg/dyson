/**
 * Web Worker Wrapper for Simulation
 *
 * Provides async interface for running simulations in a background thread.
 * Uses the async simulation engine that yields to the UI periodically.
 */

import type {
	SimulationConfig,
	SimulationOutput,
	SimulationProgress
} from './simulation-types';

import { runMonteCarloSimulationAsync, runQuickSimulation, DEFAULT_CONFIG } from './monte-carlo-engine';

/**
 * Simulation runner class
 */
export class SimulationRunner {
	private isRunning = false;
	private abortController: AbortController | null = null;

	/**
	 * Run simulation with progress updates
	 * Uses async simulation that yields to UI to prevent "page not responding"
	 */
	async run(
		config: SimulationConfig = DEFAULT_CONFIG,
		onProgress?: (progress: SimulationProgress) => void
	): Promise<SimulationOutput> {
		if (this.isRunning) {
			throw new Error('Simulation already running');
		}

		this.isRunning = true;
		this.abortController = new AbortController();

		try {
			// Use the async version that yields to UI
			const result = await runMonteCarloSimulationAsync(config, onProgress);
			return result;
		} finally {
			this.isRunning = false;
			this.abortController = null;
		}
	}

	/**
	 * Run quick preview simulation
	 */
	async runQuick(config: SimulationConfig = DEFAULT_CONFIG): Promise<SimulationOutput> {
		if (this.isRunning) {
			throw new Error('Simulation already running');
		}

		this.isRunning = true;

		try {
			// Quick simulation runs fast enough for main thread
			await new Promise(resolve => setTimeout(resolve, 0)); // Yield once
			return runQuickSimulation(config);
		} finally {
			this.isRunning = false;
		}
	}

	/**
	 * Abort running simulation
	 */
	abort(): void {
		if (this.abortController) {
			this.abortController.abort();
		}
	}

	/**
	 * Check if simulation is currently running
	 */
	get running(): boolean {
		return this.isRunning;
	}

	/**
	 * Clean up resources
	 */
	dispose(): void {
		this.abort();
	}
}

/**
 * Create a new simulation runner instance
 */
export function createSimulationRunner(): SimulationRunner {
	return new SimulationRunner();
}

/**
 * Convenience function to run a single simulation
 */
export async function runSimulation(
	config: SimulationConfig = DEFAULT_CONFIG,
	onProgress?: (progress: SimulationProgress) => void
): Promise<SimulationOutput> {
	const runner = createSimulationRunner();
	try {
		return await runner.run(config, onProgress);
	} finally {
		runner.dispose();
	}
}

/**
 * Run quick preview simulation
 */
export async function runQuickPreview(
	config: SimulationConfig = DEFAULT_CONFIG
): Promise<SimulationOutput> {
	const runner = createSimulationRunner();
	try {
		return await runner.runQuick(config);
	} finally {
		runner.dispose();
	}
}
