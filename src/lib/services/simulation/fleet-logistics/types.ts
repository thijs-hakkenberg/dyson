/**
 * Fleet Logistics Simulation Types
 *
 * Types for discrete event simulation of fleet logistics.
 */

/**
 * Configuration for fleet simulation
 */
export interface FleetConfig {
	/** Number of vehicles in fleet (5-25) */
	vehicleCount: number;
	/** Payload capacity per vehicle in kg (100,000-300,000) */
	payloadCapacityKg: number;
	/** Mission duration in years (typically 15) */
	missionDurationYears: number;
	/** Annual failure rate (0-0.10, e.g., 0.03 = 3%) */
	annualFailureRate: number;
	/** Total fleet budget in dollars */
	budgetDollars: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Vehicle status
 */
export type VehicleStatus = 'idle' | 'loading' | 'in_transit' | 'unloading' | 'returning' | 'failed';

/**
 * Event types in discrete event simulation
 */
export type EventType =
	| 'vehicle_arrival'
	| 'loading_complete'
	| 'transit_complete'
	| 'unloading_complete'
	| 'return_complete'
	| 'vehicle_failure'
	| 'cargo_arrival';

/**
 * Simulation event
 */
export interface SimEvent {
	/** Event type */
	type: EventType;
	/** Time of event (in hours from simulation start) */
	time: number;
	/** Vehicle ID involved (if applicable) */
	vehicleId?: string;
	/** Payload amount in kg (if applicable) */
	payloadKg?: number;
	/** Additional event data */
	data?: Record<string, unknown>;
}

/**
 * Vehicle state
 */
export interface Vehicle {
	id: string;
	status: VehicleStatus;
	payloadCapacityKg: number;
	currentPayloadKg: number;
	totalDeliveredKg: number;
	trips: number;
	hoursOperational: number;
	failureTime?: number;
}

/**
 * Station (loading or unloading)
 */
export interface Station {
	id: string;
	type: 'source' | 'destination';
	/** Queue of cargo waiting (in kg) */
	queueKg: number;
	/** Processing rate in kg/hour */
	processingRateKgPerHour: number;
	/** Total processed in kg */
	totalProcessedKg: number;
}

/**
 * Yearly statistics
 */
export interface FleetYearlyStats {
	year: number;
	operationalVehicles: number;
	throughputKg: number;
	avgQueueDepthKg: number;
	failures: number;
	trips: number;
}

/**
 * Single simulation run result
 */
export interface FleetRunResult {
	runId: number;
	config: FleetConfig;
	totalThroughputKg: number;
	throughputKgPerYear: number;
	avgQueueDepthKg: number;
	vehicleFailures: number;
	totalTrips: number;
	costPerKgDelivered: number;
	fleetUtilization: number;
	yearlyStats: FleetYearlyStats[];
}

/**
 * Aggregated results across Monte Carlo runs
 */
export interface FleetResult {
	throughputKgPerYear: number;
	throughputStdDev: number;
	avgQueueDepthKg: number;
	vehicleFailures: number;
	costPerKgDelivered: number;
	costPerKgStdDev: number;
	fleetUtilization: number;
	confidenceInterval95: {
		throughputLower: number;
		throughputUpper: number;
	};
}

/**
 * Monte Carlo simulation output
 */
export interface FleetSimulationOutput {
	config: FleetConfig;
	result: FleetResult;
	runs: number;
	executionTimeMs: number;
}

/**
 * Comparison between different fleet configurations
 */
export interface FleetComparisonResult {
	configs: FleetConfig[];
	results: FleetResult[];
	optimalConfigIndex: number;
	analysis: {
		bestThroughput: number;
		bestCostEfficiency: number;
		recommendation: string;
	};
}

/**
 * Progress callback for Monte Carlo
 */
export interface FleetProgress {
	currentRun: number;
	totalRuns: number;
	percentComplete: number;
}
