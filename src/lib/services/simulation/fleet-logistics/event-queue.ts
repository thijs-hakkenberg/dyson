/**
 * Event Queue (Priority Queue)
 *
 * Binary heap-based priority queue for discrete event simulation.
 * Events are ordered by time (earliest first).
 */

import type { SimEvent, EventType } from './types';

export class EventQueue {
	private heap: SimEvent[] = [];

	/**
	 * Add event to queue
	 */
	push(event: SimEvent): void {
		this.heap.push(event);
		this.bubbleUp(this.heap.length - 1);
	}

	/**
	 * Remove and return earliest event
	 */
	pop(): SimEvent | undefined {
		if (this.heap.length === 0) return undefined;
		if (this.heap.length === 1) return this.heap.pop();

		const min = this.heap[0];
		this.heap[0] = this.heap.pop()!;
		this.bubbleDown(0);
		return min;
	}

	/**
	 * Return earliest event without removing
	 */
	peek(): SimEvent | undefined {
		return this.heap[0];
	}

	/**
	 * Check if queue is empty
	 */
	isEmpty(): boolean {
		return this.heap.length === 0;
	}

	/**
	 * Get number of events in queue
	 */
	size(): number {
		return this.heap.length;
	}

	/**
	 * Remove all events
	 */
	clear(): void {
		this.heap = [];
	}

	/**
	 * Schedule event at absolute time
	 */
	scheduleAt(type: EventType, time: number, vehicleId?: string, payloadKg?: number): void {
		this.push({
			type,
			time,
			vehicleId,
			payloadKg
		});
	}

	/**
	 * Schedule event relative to current time
	 */
	scheduleAfter(
		type: EventType,
		currentTime: number,
		delay: number,
		vehicleId?: string,
		payloadKg?: number
	): void {
		this.push({
			type,
			time: currentTime + delay,
			vehicleId,
			payloadKg
		});
	}

	/**
	 * Bubble up to maintain heap property
	 */
	private bubbleUp(index: number): void {
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);
			if (this.heap[parentIndex].time <= this.heap[index].time) break;
			this.swap(parentIndex, index);
			index = parentIndex;
		}
	}

	/**
	 * Bubble down to maintain heap property
	 */
	private bubbleDown(index: number): void {
		const length = this.heap.length;
		while (true) {
			const leftChild = 2 * index + 1;
			const rightChild = 2 * index + 2;
			let smallest = index;

			if (leftChild < length && this.heap[leftChild].time < this.heap[smallest].time) {
				smallest = leftChild;
			}
			if (rightChild < length && this.heap[rightChild].time < this.heap[smallest].time) {
				smallest = rightChild;
			}

			if (smallest === index) break;

			this.swap(index, smallest);
			index = smallest;
		}
	}

	/**
	 * Swap two elements
	 */
	private swap(i: number, j: number): void {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}
}
