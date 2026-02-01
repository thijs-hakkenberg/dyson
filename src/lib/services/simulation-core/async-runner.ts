/**
 * Async Runner
 *
 * Utility for running long-running simulations without blocking the UI.
 * Yields to the browser event loop periodically to prevent "page not responding" warnings.
 */

export interface ProgressInfo {
	currentIteration: number;
	totalIterations: number;
	percentComplete: number;
}

export interface BatchedProgressInfo extends ProgressInfo {
	outerIndex: number;
	innerIndex: number;
	outerTotal: number;
	innerTotal: number;
}

export type ProgressCallback = (progress: ProgressInfo) => void;
export type BatchedProgressCallback = (progress: BatchedProgressInfo) => void;

/**
 * Async simulation runner that yields to UI periodically
 */
export class AsyncRunner {
	private readonly yieldIntervalMs: number;
	private lastYieldTime: number = 0;

	constructor(yieldIntervalMs: number = 16) {
		this.yieldIntervalMs = yieldIntervalMs;
	}

	/**
	 * Yield to the browser event loop
	 */
	async yieldToUI(): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, 0));
	}

	/**
	 * Check if we should yield based on elapsed time
	 */
	private async maybeYield(): Promise<void> {
		const now = Date.now();
		if (now - this.lastYieldTime >= this.yieldIntervalMs) {
			await this.yieldToUI();
			this.lastYieldTime = Date.now();
		}
	}

	/**
	 * Run iterations with periodic UI yielding
	 */
	async run<T>(
		totalIterations: number,
		iterationFn: (index: number) => Promise<T>,
		onProgress?: ProgressCallback,
		shouldStop?: () => boolean
	): Promise<T[]> {
		const results: T[] = [];
		this.lastYieldTime = Date.now();

		for (let i = 0; i < totalIterations; i++) {
			if (shouldStop?.()) break;

			const result = await iterationFn(i);
			results.push(result);

			await this.maybeYield();

			if (onProgress && (i % 5 === 0 || i === totalIterations - 1)) {
				onProgress({
					currentIteration: i + 1,
					totalIterations,
					percentComplete: ((i + 1) / totalIterations) * 100
				});
			}
		}

		return results;
	}

	/**
	 * Run nested iterations (e.g., sizes × runs)
	 */
	async runBatched<TOuter, TInner, TResult>(
		outerItems: TOuter[],
		innerItems: TInner[],
		iterationFn: (outer: TOuter, inner: TInner, outerIdx: number, innerIdx: number) => Promise<TResult>,
		onProgress?: BatchedProgressCallback,
		shouldStop?: () => boolean
	): Promise<TResult[][]> {
		const results: TResult[][] = [];
		this.lastYieldTime = Date.now();

		const totalIterations = outerItems.length * innerItems.length;
		let completedIterations = 0;

		for (let outerIdx = 0; outerIdx < outerItems.length; outerIdx++) {
			if (shouldStop?.()) break;

			const outerResults: TResult[] = [];

			for (let innerIdx = 0; innerIdx < innerItems.length; innerIdx++) {
				if (shouldStop?.()) break;

				const result = await iterationFn(
					outerItems[outerIdx],
					innerItems[innerIdx],
					outerIdx,
					innerIdx
				);
				outerResults.push(result);

				completedIterations++;
				await this.maybeYield();

				if (onProgress && (completedIterations % 5 === 0 || completedIterations === totalIterations)) {
					onProgress({
						currentIteration: completedIterations,
						totalIterations,
						percentComplete: (completedIterations / totalIterations) * 100,
						outerIndex: outerIdx,
						innerIndex: innerIdx,
						outerTotal: outerItems.length,
						innerTotal: innerItems.length
					});
				}
			}

			results.push(outerResults);

			// Always yield between outer iterations
			await this.yieldToUI();
			this.lastYieldTime = Date.now();
		}

		return results;
	}
}

/**
 * Create a simple yield function for use in existing code
 */
export function yieldToUI(): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, 0));
}
