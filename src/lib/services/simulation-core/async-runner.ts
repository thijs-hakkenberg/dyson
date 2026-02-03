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

			// Report progress BEFORE the iteration so UI shows what's about to run
			if (onProgress && (i % 5 === 0 || i === totalIterations - 1 || i === 0)) {
				onProgress({
					currentIteration: i + 1,
					totalIterations,
					percentComplete: (i / totalIterations) * 100
				});
				// Always yield after progress update to allow browser to paint
				await this.yieldToUI();
				this.lastYieldTime = Date.now();
			}

			const result = await iterationFn(i);
			results.push(result);

			// Yield periodically during computation to keep UI responsive
			await this.maybeYield();
		}

		// Final progress update
		if (onProgress) {
			onProgress({
				currentIteration: totalIterations,
				totalIterations,
				percentComplete: 100
			});
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

				// Report progress BEFORE the iteration
				if (onProgress && (completedIterations % 5 === 0 || completedIterations === 0)) {
					onProgress({
						currentIteration: completedIterations + 1,
						totalIterations,
						percentComplete: (completedIterations / totalIterations) * 100,
						outerIndex: outerIdx,
						innerIndex: innerIdx,
						outerTotal: outerItems.length,
						innerTotal: innerItems.length
					});
					// Always yield after progress update to allow browser to paint
					await this.yieldToUI();
					this.lastYieldTime = Date.now();
				}

				const result = await iterationFn(
					outerItems[outerIdx],
					innerItems[innerIdx],
					outerIdx,
					innerIdx
				);
				outerResults.push(result);

				completedIterations++;
				await this.maybeYield();
			}

			results.push(outerResults);

			// Always yield between outer iterations
			await this.yieldToUI();
			this.lastYieldTime = Date.now();
		}

		// Final progress update
		if (onProgress) {
			onProgress({
				currentIteration: totalIterations,
				totalIterations,
				percentComplete: 100,
				outerIndex: outerItems.length - 1,
				innerIndex: innerItems.length - 1,
				outerTotal: outerItems.length,
				innerTotal: innerItems.length
			});
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
