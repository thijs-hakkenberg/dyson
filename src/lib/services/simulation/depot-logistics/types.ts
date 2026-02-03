/**
 * Depot Logistics Simulation Types
 *
 * Types for discrete event simulation of depot logistics and maintenance
 * drone operations for Dyson swarm servicing (rq-2-7).
 */

/**
 * Configuration for depot logistics simulation
 */
export interface DepotLogisticsConfig {
	/** Spacing between depots in km (50,000 - 500,000 km) */
	depotSpacingKm: number;
	/** Number of inspector drones (1,000 - 50,000) */
	inspectorCount: number;
	/** Number of servicer drones (100 - 5,000) */
	servicerCount: number;
	/** Total collector units in swarm (1-10 million) */
	swarmSizeMillions: number;
	/** Annual failure rate per collector (0.01-0.05) */
	failureRatePerYear: number;
	/** Inspector patrol range in km */
	inspectorRangeKm: number;
	/** Servicer mission range in km */
	servicerRangeKm: number;
	/** Propellant budget per drone in kg */
	propellantBudgetKg: number;
	/** Specific impulse in seconds (Hall thruster typical: 1500-3000) */
	ispSeconds: number;
	/** Simulation duration in days (365-3650) */
	simulationDays: number;
	/** Random seed for reproducibility */
	seed?: number;
}

/**
 * Event types in depot logistics discrete event simulation
 */
export type EventType =
	| 'failure_detected'
	| 'inspector_dispatch'
	| 'inspector_arrival'
	| 'servicer_dispatch'
	| 'servicer_arrival'
	| 'repair_complete'
	| 'drone_refuel';

/**
 * Simulation event
 */
export interface SimEvent {
	/** Event type */
	type: EventType;
	/** Time of event in hours from simulation start */
	time: number;
	/** Target collector ID */
	targetId: string;
	/** Drone ID (inspector or servicer) */
	droneId: string;
	/** Depot ID responsible */
	depotId: string;
	/** Additional event data */
	data?: Record<string, unknown>;
}

/**
 * Drone status
 */
export type DroneStatus = 'idle' | 'in_transit' | 'inspecting' | 'repairing' | 'returning' | 'refueling';

/**
 * Drone type
 */
export type DroneType = 'inspector' | 'servicer';

/**
 * Drone state
 */
export interface Drone {
	id: string;
	type: DroneType;
	status: DroneStatus;
	depotId: string;
	/** Current propellant in kg */
	propellantKg: number;
	/** Maximum propellant capacity in kg */
	maxPropellantKg: number;
	/** Dry mass in kg (inspector: 15-50kg, servicer: 180-250kg) */
	dryMassKg: number;
	/** Total missions completed */
	missionsCompleted: number;
	/** Total distance traveled in km */
	distanceTraveledKm: number;
	/** Current mission target (if any) */
	currentTargetId?: string;
}

/**
 * Collector failure record
 */
export interface CollectorFailure {
	id: string;
	/** Position in km from swarm center (radial distance) */
	positionKm: number;
	/** Angular position in degrees (0-360) */
	angleDegs: number;
	/** Time of failure detection in hours */
	detectedAtHours: number;
	/** Assigned depot ID */
	assignedDepotId?: string;
	/** Assigned inspector ID */
	assignedInspectorId?: string;
	/** Assigned servicer ID */
	assignedServicerId?: string;
	/** Inspector arrival time */
	inspectorArrivalHours?: number;
	/** Servicer arrival time */
	servicerArrivalHours?: number;
	/** Repair completion time */
	repairedAtHours?: number;
	/** Priority level (1=critical, 2=standard, 3=low) */
	priority: number;
}

/**
 * Depot state
 */
export interface Depot {
	id: string;
	/** Position in km from swarm center */
	positionKm: number;
	/** Angular position in degrees */
	angleDegs: number;
	/** Inspector drone IDs assigned to this depot */
	inspectorIds: string[];
	/** Servicer drone IDs assigned to this depot */
	servicerIds: string[];
	/** Propellant inventory in kg */
	propellantInventoryKg: number;
	/** Services completed count */
	servicesCompleted: number;
	/** Total propellant dispensed in kg */
	propellantDispensedKg: number;
	/** Queue of pending failures */
	failureQueueIds: string[];
}

/**
 * Statistics for a single depot
 */
export interface DepotStats {
	depotId: string;
	servicesCompleted: number;
	avgResponseTimeHours: number;
	dronesAssigned: number;
	propellantConsumedKg: number;
}

/**
 * Single simulation run result
 */
export interface DepotLogisticsRunResult {
	runId: number;
	config: DepotLogisticsConfig;
	/** Mean time to repair in days */
	meanTimeToRepairDays: number;
	/** Number of depots required for coverage */
	depotCountRequired: number;
	/** Total propellant consumption in kg per year */
	totalPropellantKgPerYear: number;
	/** Fleet utilization percentage (0-1) */
	fleetUtilizationPercent: number;
	/** Average cost per servicing mission in dollars */
	costPerServiceMission: number;
	/** Per-depot statistics */
	depotStats: DepotStats[];
	/** Number of failures not serviced by end of simulation */
	failuresUnserviced: number;
	/** Total failures generated */
	totalFailures: number;
	/** Total repairs completed */
	totalRepairs: number;
}

/**
 * Aggregated results across Monte Carlo runs
 */
export interface DepotLogisticsResult {
	meanTimeToRepairDays: number;
	mttrStdDev: number;
	depotCountRequired: number;
	totalPropellantKgPerYear: number;
	propellantStdDev: number;
	fleetUtilizationPercent: number;
	utilizationStdDev: number;
	costPerServiceMission: number;
	costStdDev: number;
	avgFailuresUnserviced: number;
	confidenceInterval95: {
		mttrLower: number;
		mttrUpper: number;
	};
}

/**
 * Monte Carlo simulation output
 */
export interface DepotLogisticsSimulationOutput {
	config: DepotLogisticsConfig;
	result: DepotLogisticsResult;
	runs: number;
	executionTimeMs: number;
}

/**
 * Comparison between different depot configurations
 */
export interface DepotLogisticsComparisonResult {
	configs: DepotLogisticsConfig[];
	results: DepotLogisticsResult[];
	optimalConfigIndex: number;
	analysis: {
		bestMTTR: number;
		bestCostEfficiency: number;
		recommendation: string;
	};
}

/**
 * Progress callback for Monte Carlo
 */
export interface DepotLogisticsProgress {
	currentRun: number;
	totalRuns: number;
	percentComplete: number;
}
