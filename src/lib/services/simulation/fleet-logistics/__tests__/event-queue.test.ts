import { describe, it, expect } from 'vitest';
import { EventQueue } from '../event-queue';
import type { SimEvent } from '../types';

describe('EventQueue', () => {
	describe('constructor', () => {
		it('should create empty queue', () => {
			const queue = new EventQueue();
			expect(queue.isEmpty()).toBe(true);
			expect(queue.size()).toBe(0);
		});
	});

	describe('push', () => {
		it('should add event to queue', () => {
			const queue = new EventQueue();
			const event: SimEvent = { type: 'vehicle_arrival', time: 10 };

			queue.push(event);

			expect(queue.isEmpty()).toBe(false);
			expect(queue.size()).toBe(1);
		});

		it('should maintain priority order by time', () => {
			const queue = new EventQueue();

			queue.push({ type: 'vehicle_arrival', time: 30 });
			queue.push({ type: 'loading_complete', time: 10 });
			queue.push({ type: 'transit_complete', time: 20 });

			expect(queue.pop()?.time).toBe(10);
			expect(queue.pop()?.time).toBe(20);
			expect(queue.pop()?.time).toBe(30);
		});
	});

	describe('pop', () => {
		it('should return and remove earliest event', () => {
			const queue = new EventQueue();
			queue.push({ type: 'vehicle_arrival', time: 100 });
			queue.push({ type: 'loading_complete', time: 50 });

			const event = queue.pop();

			expect(event?.time).toBe(50);
			expect(queue.size()).toBe(1);
		});

		it('should return undefined for empty queue', () => {
			const queue = new EventQueue();
			expect(queue.pop()).toBeUndefined();
		});
	});

	describe('peek', () => {
		it('should return earliest event without removing', () => {
			const queue = new EventQueue();
			queue.push({ type: 'vehicle_arrival', time: 100 });
			queue.push({ type: 'loading_complete', time: 50 });

			expect(queue.peek()?.time).toBe(50);
			expect(queue.size()).toBe(2);
		});

		it('should return undefined for empty queue', () => {
			const queue = new EventQueue();
			expect(queue.peek()).toBeUndefined();
		});
	});

	describe('clear', () => {
		it('should remove all events', () => {
			const queue = new EventQueue();
			queue.push({ type: 'vehicle_arrival', time: 10 });
			queue.push({ type: 'loading_complete', time: 20 });

			queue.clear();

			expect(queue.isEmpty()).toBe(true);
			expect(queue.size()).toBe(0);
		});
	});

	describe('performance', () => {
		it('should handle many events efficiently', () => {
			const queue = new EventQueue();
			const n = 1000;

			// Add events in random order
			for (let i = 0; i < n; i++) {
				queue.push({ type: 'vehicle_arrival', time: Math.random() * 10000 });
			}

			expect(queue.size()).toBe(n);

			// Verify events come out in sorted order
			let lastTime = -Infinity;
			while (!queue.isEmpty()) {
				const event = queue.pop()!;
				expect(event.time).toBeGreaterThanOrEqual(lastTime);
				lastTime = event.time;
			}
		});
	});

	describe('scheduleAt', () => {
		it('should create event with specified time', () => {
			const queue = new EventQueue();

			queue.scheduleAt('loading_complete', 150, 'vehicle-1');

			const event = queue.pop();
			expect(event?.type).toBe('loading_complete');
			expect(event?.time).toBe(150);
			expect(event?.vehicleId).toBe('vehicle-1');
		});
	});

	describe('scheduleAfter', () => {
		it('should create event relative to current time', () => {
			const queue = new EventQueue();

			queue.scheduleAfter('transit_complete', 100, 24, 'vehicle-1');

			const event = queue.pop();
			expect(event?.time).toBe(124);
		});
	});
});
