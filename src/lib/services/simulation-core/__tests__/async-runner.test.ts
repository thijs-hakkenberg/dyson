import { describe, it, expect, vi } from 'vitest';
import { AsyncRunner, type ProgressCallback } from '../async-runner';

describe('AsyncRunner', () => {
	describe('constructor', () => {
		it('should create instance with default yield interval', () => {
			const runner = new AsyncRunner();
			expect(runner).toBeInstanceOf(AsyncRunner);
		});

		it('should create instance with custom yield interval', () => {
			const runner = new AsyncRunner(32);
			expect(runner).toBeInstanceOf(AsyncRunner);
		});
	});

	describe('run', () => {
		it('should execute all iterations', async () => {
			const runner = new AsyncRunner();
			const results: number[] = [];

			await runner.run(10, async (i) => {
				results.push(i);
			});

			expect(results).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		});

		it('should report progress', async () => {
			const runner = new AsyncRunner();
			const progressCalls: number[] = [];

			await runner.run(
				100,
				async () => {},
				(progress) => {
					progressCalls.push(progress.percentComplete);
				}
			);

			// Should have progress updates
			expect(progressCalls.length).toBeGreaterThan(0);
			// Last progress should be 100%
			expect(progressCalls[progressCalls.length - 1]).toBe(100);
		});

		it('should allow early termination via shouldStop', async () => {
			const runner = new AsyncRunner();
			const results: number[] = [];
			let stopAt = 5;

			await runner.run(
				100,
				async (i) => {
					results.push(i);
				},
				undefined,
				() => results.length >= stopAt
			);

			expect(results.length).toBe(stopAt);
		});
	});

	describe('runBatched', () => {
		it('should execute all batches', async () => {
			const runner = new AsyncRunner();
			const batchResults: number[][] = [];

			await runner.runBatched(
				[1, 2, 3],
				[10, 20, 30],
				async (outer, inner) => {
					if (!batchResults[outer - 1]) batchResults[outer - 1] = [];
					batchResults[outer - 1].push(inner);
				}
			);

			expect(batchResults).toEqual([
				[10, 20, 30],
				[10, 20, 30],
				[10, 20, 30]
			]);
		});

		it('should report progress with outer and inner indices', async () => {
			const runner = new AsyncRunner();
			const progressCalls: { outerIndex: number; innerIndex: number }[] = [];

			await runner.runBatched(
				['a', 'b'],
				[1, 2],
				async () => {},
				(progress) => {
					progressCalls.push({
						outerIndex: progress.outerIndex,
						innerIndex: progress.innerIndex
					});
				}
			);

			expect(progressCalls.length).toBeGreaterThan(0);
		});
	});

	describe('yieldToUI', () => {
		it('should yield to the event loop', async () => {
			const runner = new AsyncRunner(0); // Yield every iteration
			let yieldCount = 0;

			vi.spyOn(globalThis, 'setTimeout').mockImplementation(((fn: () => void) => {
				yieldCount++;
				fn();
				return 0;
			}) as typeof setTimeout);

			await runner.run(5, async () => {});

			expect(yieldCount).toBeGreaterThan(0);
			vi.restoreAllMocks();
		});
	});
});
