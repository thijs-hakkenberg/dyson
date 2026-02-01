/**
 * Discrete Event Simulator
 *
 * Core simulation engine for fleet logistics using discrete event simulation.
 * Processes events in chronological order to simulate fleet operations.
 */

import { SeededRandom } from '$lib/services/simulation-core';
import { EventQueue } from './event-queue';
import {
	createFleet,
	startLoading,
	completeLoading,
	startTransit,
	completeTransit,
	startUnloading,
	completeUnloading,
	startReturn,
	completeReturn,
	failVehicle,
	isOperational,
	getIdleVehicle,
	getFleetStats
} from './vehicle';
import {
	calculateTransitTime,
	calculateLoadingTime,
	calculateUnloadingTime,
	calculateReturnTime
} from './transit-calculator';
import type { FleetConfig, FleetRunResult, FleetYearlyStats, SimEvent, Vehicle } from './types';

/**
 * Simulation state
 */
interface SimulationState {
	currentTime: number;
	fleet: Vehicle[];
	totalThroughputKg: number;
	queueDepthSamples: number[];
	cargoQueueKg: number;
}

/**
 * Discrete Event Simulator for fleet logistics
 */
export class DiscreteEventSimulator {
	private config: FleetConfig;
	private rng: SeededRandom;
	private eventQueue: EventQueue;
	private state: SimulationState;
	private readonly hoursPerYear = 365 * 24;
	private missionDurationHours: number;
	private yearlyStats: FleetYearlyStats[] = [];

	constructor(config: FleetConfig) {
		this.config = config;
		this.rng = new SeededRandom(config.seed ?? Date.now());
		this.eventQueue = new EventQueue();
		this.missionDurationHours = config.missionDurationYears * this.hoursPerYear;

		this.state = {
			currentTime: 0,
			fleet: createFleet(config.vehicleCount, config.payloadCapacityKg),
			totalThroughputKg: 0,
			queueDepthSamples: [],
			cargoQueueKg: Infinity // Unlimited supply at asteroid
		};

		this.initializeSimulation();
	}

	/**
	 * Get current simulation state (for testing)
	 */
	getState(): SimulationState {
		return { ...this.state };
	}

	/**
	 * Initialize simulation with starting events
	 */
	private initializeSimulation(): void {
		// Schedule initial loading for all vehicles
		for (const vehicle of this.state.fleet) {
			this.eventQueue.scheduleAt('loading_complete', 0, vehicle.id);
		}

		// Schedule failure events if failure rate > 0
		if (this.config.annualFailureRate > 0) {
			this.scheduleFailures();
		}
	}

	/**
	 * Schedule failure events for vehicles
	 */
	private scheduleFailures(): void {
		const annualRate = this.config.annualFailureRate;

		for (const vehicle of this.state.fleet) {
			// Calculate time to failure using exponential distribution
			// Rate per hour = annual rate / hours per year
			const ratePerHour = annualRate / this.hoursPerYear;

			// Generate time to failure
			let failureTime = this.rng.nextExponential(ratePerHour);

			// Only schedule if within mission duration
			if (failureTime < this.missionDurationHours) {
				this.eventQueue.scheduleAt('vehicle_failure', failureTime, vehicle.id);
			}
		}
	}

	/**
	 * Run the simulation
	 */
	run(): FleetRunResult {
		let lastYearRecorded = 0;
		const yearlyThroughput: Map<number, number> = new Map();

		while (!this.eventQueue.isEmpty()) {
			const event = this.eventQueue.pop()!;

			// Stop if past mission duration
			if (event.time > this.missionDurationHours) break;

			this.state.currentTime = event.time;

			// Record yearly stats
			const currentYear = Math.floor(event.time / this.hoursPerYear) + 1;
			if (currentYear > lastYearRecorded && lastYearRecorded > 0) {
				this.recordYearlyStats(lastYearRecorded, yearlyThroughput.get(lastYearRecorded) ?? 0);
			}
			lastYearRecorded = currentYear;

			// Track throughput per year
			const prevYearThroughput = yearlyThroughput.get(currentYear) ?? 0;

			// Process event
			this.processEvent(event, currentYear, yearlyThroughput);

			// Sample queue depth periodically
			if (this.rng.next() < 0.01) {
				this.state.queueDepthSamples.push(this.state.cargoQueueKg);
			}
		}

		// Record final year if not yet recorded
		if (lastYearRecorded > 0 && this.yearlyStats.length < this.config.missionDurationYears) {
			this.recordYearlyStats(lastYearRecorded, yearlyThroughput.get(lastYearRecorded) ?? 0);
		}

		// Fill in any missing years
		while (this.yearlyStats.length < this.config.missionDurationYears) {
			const year = this.yearlyStats.length + 1;
			this.recordYearlyStats(year, yearlyThroughput.get(year) ?? 0);
		}

		return this.generateResult();
	}

	/**
	 * Process a single event
	 */
	private processEvent(
		event: SimEvent,
		currentYear: number,
		yearlyThroughput: Map<number, number>
	): void {
		const vehicleIndex = this.state.fleet.findIndex((v) => v.id === event.vehicleId);
		if (vehicleIndex === -1 && event.vehicleId) return;

		switch (event.type) {
			case 'loading_complete':
				this.handleLoadingComplete(vehicleIndex);
				break;

			case 'transit_complete':
				this.handleTransitComplete(vehicleIndex);
				break;

			case 'unloading_complete':
				this.handleUnloadingComplete(vehicleIndex, currentYear, yearlyThroughput);
				break;

			case 'return_complete':
				this.handleReturnComplete(vehicleIndex);
				break;

			case 'vehicle_failure':
				this.handleVehicleFailure(vehicleIndex);
				break;
		}
	}

	/**
	 * Handle loading complete event
	 */
	private handleLoadingComplete(vehicleIndex: number): void {
		let vehicle = this.state.fleet[vehicleIndex];
		if (!isOperational(vehicle)) return;

		// Start and complete loading
		vehicle = startLoading(vehicle);
		vehicle = completeLoading(vehicle);
		vehicle = startTransit(vehicle);
		this.state.fleet[vehicleIndex] = vehicle;

		// Schedule transit complete
		const transitTime = calculateTransitTime(vehicle.currentPayloadKg);
		this.eventQueue.scheduleAfter(
			'transit_complete',
			this.state.currentTime,
			transitTime,
			vehicle.id
		);
	}

	/**
	 * Handle transit complete event
	 */
	private handleTransitComplete(vehicleIndex: number): void {
		let vehicle = this.state.fleet[vehicleIndex];
		if (!isOperational(vehicle)) return;

		const transitTime = calculateTransitTime(vehicle.currentPayloadKg);
		vehicle = completeTransit(vehicle, transitTime);
		vehicle = startUnloading(vehicle);
		this.state.fleet[vehicleIndex] = vehicle;

		// Schedule unloading complete
		const unloadTime = calculateUnloadingTime(vehicle.currentPayloadKg);
		this.eventQueue.scheduleAfter(
			'unloading_complete',
			this.state.currentTime,
			unloadTime,
			vehicle.id
		);
	}

	/**
	 * Handle unloading complete event
	 */
	private handleUnloadingComplete(
		vehicleIndex: number,
		currentYear: number,
		yearlyThroughput: Map<number, number>
	): void {
		let vehicle = this.state.fleet[vehicleIndex];
		if (!isOperational(vehicle)) return;

		const delivered = vehicle.currentPayloadKg;
		vehicle = completeUnloading(vehicle);
		vehicle = startReturn(vehicle);
		this.state.fleet[vehicleIndex] = vehicle;

		// Track throughput
		this.state.totalThroughputKg += delivered;
		yearlyThroughput.set(currentYear, (yearlyThroughput.get(currentYear) ?? 0) + delivered);

		// Schedule return complete
		const returnTime = calculateReturnTime();
		this.eventQueue.scheduleAfter('return_complete', this.state.currentTime, returnTime, vehicle.id);
	}

	/**
	 * Handle return complete event
	 */
	private handleReturnComplete(vehicleIndex: number): void {
		let vehicle = this.state.fleet[vehicleIndex];
		if (!isOperational(vehicle)) return;

		const returnTime = calculateReturnTime();
		vehicle = completeReturn(vehicle, returnTime);
		this.state.fleet[vehicleIndex] = vehicle;

		// Schedule next loading if still within mission
		const loadingTime = calculateLoadingTime(this.config.payloadCapacityKg);
		if (this.state.currentTime + loadingTime < this.missionDurationHours) {
			this.eventQueue.scheduleAfter(
				'loading_complete',
				this.state.currentTime,
				loadingTime,
				vehicle.id
			);
		}
	}

	/**
	 * Handle vehicle failure event
	 */
	private handleVehicleFailure(vehicleIndex: number): void {
		const vehicle = this.state.fleet[vehicleIndex];
		if (!isOperational(vehicle)) return;

		this.state.fleet[vehicleIndex] = failVehicle(vehicle, this.state.currentTime);
	}

	/**
	 * Record statistics for a year
	 */
	private recordYearlyStats(year: number, throughputKg: number): void {
		const fleetStats = getFleetStats(this.state.fleet);

		this.yearlyStats.push({
			year,
			operationalVehicles: fleetStats.operationalVehicles,
			throughputKg,
			avgQueueDepthKg:
				this.state.queueDepthSamples.length > 0
					? this.state.queueDepthSamples.reduce((a, b) => a + b, 0) /
						this.state.queueDepthSamples.length
					: 0,
			failures:
				year === 1
					? fleetStats.failedVehicles
					: fleetStats.failedVehicles -
						(this.yearlyStats[year - 2]?.failures ?? 0) -
						(year > 2
							? this.yearlyStats
									.slice(0, year - 1)
									.reduce((sum, s) => sum + (s.failures ?? 0), 0) / (year - 1)
							: 0),
			trips: fleetStats.totalTrips
		});
	}

	/**
	 * Generate final result
	 */
	private generateResult(): FleetRunResult {
		const fleetStats = getFleetStats(this.state.fleet);
		const totalOperationalHours = this.state.fleet.reduce(
			(sum, v) => sum + v.hoursOperational,
			0
		);
		const maxPossibleHours =
			this.config.vehicleCount * this.config.missionDurationYears * this.hoursPerYear;

		return {
			runId: 0,
			config: this.config,
			totalThroughputKg: this.state.totalThroughputKg,
			throughputKgPerYear: this.state.totalThroughputKg / this.config.missionDurationYears,
			avgQueueDepthKg:
				this.state.queueDepthSamples.length > 0
					? this.state.queueDepthSamples.reduce((a, b) => a + b, 0) /
						this.state.queueDepthSamples.length
					: 0,
			vehicleFailures: fleetStats.failedVehicles,
			totalTrips: fleetStats.totalTrips,
			costPerKgDelivered:
				this.state.totalThroughputKg > 0
					? this.config.budgetDollars / this.state.totalThroughputKg
					: Infinity,
			fleetUtilization: maxPossibleHours > 0 ? totalOperationalHours / maxPossibleHours : 0,
			yearlyStats: this.yearlyStats
		};
	}
}
