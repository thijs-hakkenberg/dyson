/**
 * Discrete Event Simulator for Depot Logistics
 *
 * Core simulation engine for depot logistics using discrete event simulation.
 * Models inspector/servicer drone dispatch, maintenance operations, and refueling.
 */

import { SeededRandom } from '$lib/services/simulation-core';
import type {
	DepotLogisticsConfig,
	DepotLogisticsRunResult,
	SimEvent,
	EventType,
	Depot,
	Drone,
	DroneType,
	CollectorFailure,
	DepotStats
} from './types';
import {
	generateFailures,
	DEFAULT_SWARM_PARAMS
} from './failure-generator';
import {
	findNearestDepot,
	findDepotWithCapacity,
	calculateDistance,
	calculateTransitTime,
	consumePropellant,
	refuelDrone,
	canCompleteMission,
	PROPULSION_CONSTANTS
} from './service-dispatch';

/**
 * Event queue using binary heap (min-heap by time)
 */
class EventQueue {
	private heap: SimEvent[] = [];

	push(event: SimEvent): void {
		this.heap.push(event);
		this.bubbleUp(this.heap.length - 1);
	}

	pop(): SimEvent | undefined {
		if (this.heap.length === 0) return undefined;
		if (this.heap.length === 1) return this.heap.pop();

		const min = this.heap[0];
		this.heap[0] = this.heap.pop()!;
		this.bubbleDown(0);
		return min;
	}

	isEmpty(): boolean {
		return this.heap.length === 0;
	}

	size(): number {
		return this.heap.length;
	}

	private bubbleUp(index: number): void {
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);
			if (this.heap[parentIndex].time <= this.heap[index].time) break;
			[this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
			index = parentIndex;
		}
	}

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
			[this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
			index = smallest;
		}
	}
}

/**
 * Simulation state
 */
interface SimulationState {
	currentTime: number;
	depots: Map<string, Depot>;
	drones: Map<string, Drone>;
	failures: Map<string, CollectorFailure>;
	pendingFailures: CollectorFailure[];
	completedRepairs: number;
	totalResponseTimeHours: number;
}

/**
 * Discrete Event Simulator for Depot Logistics
 */
export class DepotLogisticsSimulator {
	private config: DepotLogisticsConfig;
	private rng: SeededRandom;
	private eventQueue: EventQueue;
	private state: SimulationState;
	private readonly hoursPerDay = 24;
	private simulationDurationHours: number;

	constructor(config: DepotLogisticsConfig) {
		this.config = config;
		this.rng = new SeededRandom(config.seed ?? Date.now());
		this.eventQueue = new EventQueue();
		this.simulationDurationHours = config.simulationDays * this.hoursPerDay;

		this.state = {
			currentTime: 0,
			depots: new Map(),
			drones: new Map(),
			failures: new Map(),
			pendingFailures: [],
			completedRepairs: 0,
			totalResponseTimeHours: 0
		};

		this.initializeSimulation();
	}

	/**
	 * Initialize depots, drones, and failure events
	 */
	private initializeSimulation(): void {
		// Create depots distributed around the swarm
		this.createDepots();

		// Create and assign drones to depots
		this.createDrones();

		// Generate failure events
		const failures = generateFailures(
			{
				swarmSizeMillions: this.config.swarmSizeMillions,
				failureRatePerYear: this.config.failureRatePerYear,
				simulationDurationHours: this.simulationDurationHours,
				swarmInnerRadiusKm: DEFAULT_SWARM_PARAMS.swarmInnerRadiusKm,
				swarmOuterRadiusKm: DEFAULT_SWARM_PARAMS.swarmOuterRadiusKm
			},
			this.rng
		);

		// Schedule failure detection events
		for (const failure of failures) {
			this.state.failures.set(failure.id, failure);
			this.eventQueue.push({
				type: 'failure_detected',
				time: failure.detectedAtHours,
				targetId: failure.id,
				droneId: '',
				depotId: ''
			});
		}
	}

	/**
	 * Create depots distributed in the swarm
	 */
	private createDepots(): void {
		// Calculate depot count based on spacing
		// Swarm annular width ~ 10 million km
		const swarmWidthKm = DEFAULT_SWARM_PARAMS.swarmOuterRadiusKm - DEFAULT_SWARM_PARAMS.swarmInnerRadiusKm;
		const swarmCircumferenceKm = 2 * Math.PI * (DEFAULT_SWARM_PARAMS.swarmInnerRadiusKm + swarmWidthKm / 2);

		// Depots per ring = circumference / spacing
		const depotsPerRing = Math.max(1, Math.floor(swarmCircumferenceKm / this.config.depotSpacingKm));
		// Number of radial rings = width / spacing
		const radialRings = Math.max(1, Math.floor(swarmWidthKm / this.config.depotSpacingKm));

		const totalDepots = depotsPerRing * radialRings;

		// Create depots
		for (let ring = 0; ring < radialRings; ring++) {
			const radiusFraction = (ring + 0.5) / radialRings;
			const radiusKm =
				DEFAULT_SWARM_PARAMS.swarmInnerRadiusKm +
				radiusFraction * swarmWidthKm;

			for (let sector = 0; sector < depotsPerRing; sector++) {
				const angleDegs = (sector / depotsPerRing) * 360;
				const depotId = `depot-${ring}-${sector}`;

				this.state.depots.set(depotId, {
					id: depotId,
					positionKm: radiusKm,
					angleDegs,
					inspectorIds: [],
					servicerIds: [],
					propellantInventoryKg: 100_000, // 100 tonnes initial inventory
					servicesCompleted: 0,
					propellantDispensedKg: 0,
					failureQueueIds: []
				});
			}
		}
	}

	/**
	 * Create drones and distribute them among depots
	 */
	private createDrones(): void {
		const depotArray = Array.from(this.state.depots.values());
		const depotCount = depotArray.length;

		if (depotCount === 0) return;

		// Distribute inspectors
		const inspectorsPerDepot = Math.floor(this.config.inspectorCount / depotCount);
		const extraInspectors = this.config.inspectorCount % depotCount;

		let inspectorId = 0;
		for (let d = 0; d < depotCount; d++) {
			const depot = depotArray[d];
			const count = inspectorsPerDepot + (d < extraInspectors ? 1 : 0);

			for (let i = 0; i < count; i++) {
				const drone: Drone = {
					id: `inspector-${inspectorId++}`,
					type: 'inspector',
					status: 'idle',
					depotId: depot.id,
					propellantKg: PROPULSION_CONSTANTS.inspectorPropellantKg,
					maxPropellantKg: PROPULSION_CONSTANTS.inspectorPropellantKg,
					dryMassKg: PROPULSION_CONSTANTS.inspectorDryMassKg,
					missionsCompleted: 0,
					distanceTraveledKm: 0
				};
				this.state.drones.set(drone.id, drone);
				depot.inspectorIds.push(drone.id);
			}
		}

		// Distribute servicers
		const servicersPerDepot = Math.floor(this.config.servicerCount / depotCount);
		const extraServicers = this.config.servicerCount % depotCount;

		let servicerId = 0;
		for (let d = 0; d < depotCount; d++) {
			const depot = depotArray[d];
			const count = servicersPerDepot + (d < extraServicers ? 1 : 0);

			for (let i = 0; i < count; i++) {
				const drone: Drone = {
					id: `servicer-${servicerId++}`,
					type: 'servicer',
					status: 'idle',
					depotId: depot.id,
					propellantKg: PROPULSION_CONSTANTS.servicerPropellantKg,
					maxPropellantKg: PROPULSION_CONSTANTS.servicerPropellantKg,
					dryMassKg: PROPULSION_CONSTANTS.servicerDryMassKg,
					missionsCompleted: 0,
					distanceTraveledKm: 0
				};
				this.state.drones.set(drone.id, drone);
				depot.servicerIds.push(drone.id);
			}
		}
	}

	/**
	 * Run the simulation
	 */
	run(): DepotLogisticsRunResult {
		while (!this.eventQueue.isEmpty()) {
			const event = this.eventQueue.pop()!;

			if (event.time > this.simulationDurationHours) break;

			this.state.currentTime = event.time;
			this.processEvent(event);
		}

		return this.generateResult();
	}

	/**
	 * Process a single event
	 */
	private processEvent(event: SimEvent): void {
		switch (event.type) {
			case 'failure_detected':
				this.handleFailureDetected(event);
				break;
			case 'inspector_dispatch':
				this.handleInspectorDispatch(event);
				break;
			case 'inspector_arrival':
				this.handleInspectorArrival(event);
				break;
			case 'servicer_dispatch':
				this.handleServicerDispatch(event);
				break;
			case 'servicer_arrival':
				this.handleServicerArrival(event);
				break;
			case 'repair_complete':
				this.handleRepairComplete(event);
				break;
			case 'drone_refuel':
				this.handleDroneRefuel(event);
				break;
		}
	}

	/**
	 * Handle failure detection - dispatch inspector
	 */
	private handleFailureDetected(event: SimEvent): void {
		const failure = this.state.failures.get(event.targetId);
		if (!failure) return;

		const depots = Array.from(this.state.depots.values());
		const result = findNearestDepot(failure, depots, this.state.drones);

		if (result && result.availableInspector) {
			// Dispatch inspector immediately
			const inspector = result.availableInspector;
			const distance = calculateDistance(
				{ positionKm: failure.positionKm, angleDegs: failure.angleDegs },
				{ positionKm: result.depot.positionKm, angleDegs: result.depot.angleDegs }
			);

			if (distance <= this.config.inspectorRangeKm &&
				canCompleteMission(inspector, distance, this.config.ispSeconds)) {

				failure.assignedDepotId = result.depot.id;
				failure.assignedInspectorId = inspector.id;

				const drone = this.state.drones.get(inspector.id)!;
				drone.status = 'in_transit';
				drone.currentTargetId = failure.id;

				const transitTime = calculateTransitTime(distance, 'inspector');
				this.eventQueue.push({
					type: 'inspector_arrival',
					time: this.state.currentTime + transitTime,
					targetId: failure.id,
					droneId: inspector.id,
					depotId: result.depot.id,
					data: { distanceKm: distance }
				});
			} else {
				// Queue for later when drone available
				this.state.pendingFailures.push(failure);
			}
		} else {
			// Try to find any depot with capacity
			const alternateResult = findDepotWithCapacity(
				failure,
				depots,
				this.state.drones,
				'inspector',
				this.config.inspectorRangeKm
			);

			if (alternateResult && alternateResult.availableInspector) {
				failure.assignedDepotId = alternateResult.depot.id;
				failure.assignedInspectorId = alternateResult.availableInspector.id;

				const drone = this.state.drones.get(alternateResult.availableInspector.id)!;
				drone.status = 'in_transit';
				drone.currentTargetId = failure.id;

				const transitTime = calculateTransitTime(alternateResult.distanceKm, 'inspector');
				this.eventQueue.push({
					type: 'inspector_arrival',
					time: this.state.currentTime + transitTime,
					targetId: failure.id,
					droneId: alternateResult.availableInspector.id,
					depotId: alternateResult.depot.id,
					data: { distanceKm: alternateResult.distanceKm }
				});
			} else {
				// Queue failure for later
				this.state.pendingFailures.push(failure);
			}
		}
	}

	/**
	 * Handle inspector dispatch (placeholder for queued dispatch)
	 */
	private handleInspectorDispatch(event: SimEvent): void {
		// Processed inline with failure detection
	}

	/**
	 * Handle inspector arrival at failure site
	 */
	private handleInspectorArrival(event: SimEvent): void {
		const failure = this.state.failures.get(event.targetId);
		const drone = this.state.drones.get(event.droneId);
		if (!failure || !drone) return;

		failure.inspectorArrivalHours = this.state.currentTime;
		drone.status = 'inspecting';

		// Consume propellant for outbound trip
		const distance = (event.data?.distanceKm as number) ?? 0;
		const updatedDrone = consumePropellant(drone, distance, this.config.ispSeconds);
		this.state.drones.set(drone.id, updatedDrone);

		// Inspection takes 1-4 hours
		const inspectionTime = 1 + this.rng.next() * 3;

		// Schedule servicer dispatch after inspection
		this.eventQueue.push({
			type: 'servicer_dispatch',
			time: this.state.currentTime + inspectionTime,
			targetId: failure.id,
			droneId: event.droneId,
			depotId: event.depotId,
			data: { distanceKm: distance }
		});
	}

	/**
	 * Handle servicer dispatch to failure site
	 */
	private handleServicerDispatch(event: SimEvent): void {
		const failure = this.state.failures.get(event.targetId);
		const inspectorDrone = this.state.drones.get(event.droneId);
		if (!failure || !inspectorDrone) return;

		// Inspector returns to depot
		inspectorDrone.status = 'returning';
		const inspectorDistance = (event.data?.distanceKm as number) ?? 0;
		const returnTime = calculateTransitTime(inspectorDistance, 'inspector');

		// Schedule inspector return/refuel
		this.scheduleInspectorReturn(inspectorDrone, event.depotId, returnTime, inspectorDistance);

		// Find available servicer
		const depots = Array.from(this.state.depots.values());
		const result = findDepotWithCapacity(
			failure,
			depots,
			this.state.drones,
			'servicer',
			this.config.servicerRangeKm
		);

		if (result && result.availableServicer) {
			const servicer = result.availableServicer;
			const distance = result.distanceKm;

			if (canCompleteMission(servicer, distance, this.config.ispSeconds)) {
				failure.assignedServicerId = servicer.id;

				const servicerDrone = this.state.drones.get(servicer.id)!;
				servicerDrone.status = 'in_transit';
				servicerDrone.currentTargetId = failure.id;

				const transitTime = calculateTransitTime(distance, 'servicer');
				this.eventQueue.push({
					type: 'servicer_arrival',
					time: this.state.currentTime + transitTime,
					targetId: failure.id,
					droneId: servicer.id,
					depotId: result.depot.id,
					data: { distanceKm: distance }
				});
			} else {
				// Failure remains pending
				this.state.pendingFailures.push(failure);
			}
		} else {
			// No servicer available, queue failure
			this.state.pendingFailures.push(failure);
		}
	}

	/**
	 * Schedule inspector return to depot
	 */
	private scheduleInspectorReturn(
		drone: Drone,
		depotId: string,
		returnTime: number,
		distance: number
	): void {
		// Update drone with return trip propellant consumption
		const updatedDrone = consumePropellant(drone, distance, this.config.ispSeconds);
		this.state.drones.set(drone.id, updatedDrone);

		// Schedule refuel event
		this.eventQueue.push({
			type: 'drone_refuel',
			time: this.state.currentTime + returnTime,
			targetId: '',
			droneId: drone.id,
			depotId
		});
	}

	/**
	 * Handle servicer arrival at failure site
	 */
	private handleServicerArrival(event: SimEvent): void {
		const failure = this.state.failures.get(event.targetId);
		const drone = this.state.drones.get(event.droneId);
		if (!failure || !drone) return;

		failure.servicerArrivalHours = this.state.currentTime;
		drone.status = 'repairing';

		// Consume propellant for outbound trip
		const distance = (event.data?.distanceKm as number) ?? 0;
		const updatedDrone = consumePropellant(drone, distance, this.config.ispSeconds);
		this.state.drones.set(drone.id, updatedDrone);

		// Repair takes 2-8 hours depending on priority
		const baseRepairTime = 2 + failure.priority * 2;
		const repairTime = baseRepairTime + this.rng.next() * 2;

		this.eventQueue.push({
			type: 'repair_complete',
			time: this.state.currentTime + repairTime,
			targetId: failure.id,
			droneId: event.droneId,
			depotId: event.depotId,
			data: { distanceKm: distance }
		});
	}

	/**
	 * Handle repair completion
	 */
	private handleRepairComplete(event: SimEvent): void {
		const failure = this.state.failures.get(event.targetId);
		const drone = this.state.drones.get(event.droneId);
		const depot = this.state.depots.get(event.depotId);
		if (!failure || !drone || !depot) return;

		failure.repairedAtHours = this.state.currentTime;
		drone.status = 'returning';
		drone.missionsCompleted++;
		drone.currentTargetId = undefined;

		// Update depot stats
		depot.servicesCompleted++;

		// Calculate response time (from detection to repair)
		const responseTime = failure.repairedAtHours - failure.detectedAtHours;
		this.state.totalResponseTimeHours += responseTime;
		this.state.completedRepairs++;

		// Schedule servicer return/refuel
		const distance = (event.data?.distanceKm as number) ?? 0;
		const returnTime = calculateTransitTime(distance, 'servicer');

		const updatedDrone = consumePropellant(drone, distance, this.config.ispSeconds);
		this.state.drones.set(drone.id, updatedDrone);

		this.eventQueue.push({
			type: 'drone_refuel',
			time: this.state.currentTime + returnTime,
			targetId: '',
			droneId: drone.id,
			depotId: event.depotId
		});

		// Try to process pending failures
		this.processPendingFailures();
	}

	/**
	 * Handle drone refueling at depot
	 */
	private handleDroneRefuel(event: SimEvent): void {
		const drone = this.state.drones.get(event.droneId);
		const depot = this.state.depots.get(event.depotId);
		if (!drone || !depot) return;

		drone.status = 'refueling';

		// Check if refuel is needed (below 20% threshold)
		const propellantRatio = drone.propellantKg / drone.maxPropellantKg;
		if (propellantRatio < 0.2) {
			const { drone: refueledDrone, depot: updatedDepot } = refuelDrone(drone, depot);
			this.state.drones.set(drone.id, refueledDrone);
			this.state.depots.set(depot.id, updatedDepot);
		} else {
			drone.status = 'idle';
		}

		// Try to process pending failures
		this.processPendingFailures();
	}

	/**
	 * Process queued failures when drones become available
	 */
	private processPendingFailures(): void {
		const remaining: CollectorFailure[] = [];

		for (const failure of this.state.pendingFailures) {
			// Check if already being serviced
			if (failure.repairedAtHours !== undefined) continue;

			const depots = Array.from(this.state.depots.values());
			let dispatched = false;

			// Try to find available drone
			if (!failure.assignedInspectorId) {
				// Need inspector
				const result = findDepotWithCapacity(
					failure,
					depots,
					this.state.drones,
					'inspector',
					this.config.inspectorRangeKm
				);

				if (result && result.availableInspector) {
					dispatched = true;
					this.dispatchInspectorToFailure(failure, result);
				}
			} else if (!failure.assignedServicerId) {
				// Need servicer
				const result = findDepotWithCapacity(
					failure,
					depots,
					this.state.drones,
					'servicer',
					this.config.servicerRangeKm
				);

				if (result && result.availableServicer) {
					dispatched = true;
					this.dispatchServicerToFailure(failure, result);
				}
			}

			if (!dispatched) {
				remaining.push(failure);
			}
		}

		this.state.pendingFailures = remaining;
	}

	/**
	 * Dispatch inspector to a queued failure
	 */
	private dispatchInspectorToFailure(
		failure: CollectorFailure,
		result: { depot: Depot; distanceKm: number; availableInspector?: Drone }
	): void {
		if (!result.availableInspector) return;

		failure.assignedDepotId = result.depot.id;
		failure.assignedInspectorId = result.availableInspector.id;

		const drone = this.state.drones.get(result.availableInspector.id)!;
		drone.status = 'in_transit';
		drone.currentTargetId = failure.id;

		const transitTime = calculateTransitTime(result.distanceKm, 'inspector');
		this.eventQueue.push({
			type: 'inspector_arrival',
			time: this.state.currentTime + transitTime,
			targetId: failure.id,
			droneId: result.availableInspector.id,
			depotId: result.depot.id,
			data: { distanceKm: result.distanceKm }
		});
	}

	/**
	 * Dispatch servicer to a queued failure
	 */
	private dispatchServicerToFailure(
		failure: CollectorFailure,
		result: { depot: Depot; distanceKm: number; availableServicer?: Drone }
	): void {
		if (!result.availableServicer) return;

		failure.assignedServicerId = result.availableServicer.id;

		const drone = this.state.drones.get(result.availableServicer.id)!;
		drone.status = 'in_transit';
		drone.currentTargetId = failure.id;

		const transitTime = calculateTransitTime(result.distanceKm, 'servicer');
		this.eventQueue.push({
			type: 'servicer_arrival',
			time: this.state.currentTime + transitTime,
			targetId: failure.id,
			droneId: result.availableServicer.id,
			depotId: result.depot.id,
			data: { distanceKm: result.distanceKm }
		});
	}

	/**
	 * Generate final simulation result
	 */
	private generateResult(): DepotLogisticsRunResult {
		const depotStats: DepotStats[] = [];
		let totalPropellantConsumed = 0;

		for (const depot of this.state.depots.values()) {
			const dronesAssigned = depot.inspectorIds.length + depot.servicerIds.length;
			let depotResponseTime = 0;
			let depotServiceCount = 0;

			// Calculate average response time for this depot
			for (const failure of this.state.failures.values()) {
				if (failure.assignedDepotId === depot.id && failure.repairedAtHours !== undefined) {
					depotResponseTime += failure.repairedAtHours - failure.detectedAtHours;
					depotServiceCount++;
				}
			}

			depotStats.push({
				depotId: depot.id,
				servicesCompleted: depot.servicesCompleted,
				avgResponseTimeHours: depotServiceCount > 0 ? depotResponseTime / depotServiceCount : 0,
				dronesAssigned,
				propellantConsumedKg: depot.propellantDispensedKg
			});

			totalPropellantConsumed += depot.propellantDispensedKg;
		}

		// Count unserviced failures
		let failuresUnserviced = 0;
		for (const failure of this.state.failures.values()) {
			if (failure.repairedAtHours === undefined) {
				failuresUnserviced++;
			}
		}

		// Calculate fleet utilization
		let totalActiveTime = 0;
		const totalPossibleTime = this.state.drones.size * this.simulationDurationHours;
		for (const drone of this.state.drones.values()) {
			// Estimate active time from missions completed
			const avgMissionTime = 20; // hours (rough estimate)
			totalActiveTime += drone.missionsCompleted * avgMissionTime;
		}
		const fleetUtilization = totalPossibleTime > 0 ? totalActiveTime / totalPossibleTime : 0;

		// Calculate MTTR
		const meanTimeToRepairHours =
			this.state.completedRepairs > 0
				? this.state.totalResponseTimeHours / this.state.completedRepairs
				: 0;

		// Cost per mission (rough estimate)
		// Propellant cost: ~$50/kg for xenon
		// Operations overhead: ~$10,000 per mission
		const propellantCostPerKg = 50;
		const operationsOverhead = 10000;
		const totalMissions = this.state.completedRepairs;
		const costPerMission =
			totalMissions > 0
				? (totalPropellantConsumed * propellantCostPerKg + totalMissions * operationsOverhead) /
					totalMissions
				: 0;

		// Annualize propellant consumption
		const simulationYears = this.config.simulationDays / 365;
		const propellantPerYear = simulationYears > 0 ? totalPropellantConsumed / simulationYears : 0;

		return {
			runId: 0,
			config: this.config,
			meanTimeToRepairDays: meanTimeToRepairHours / 24,
			depotCountRequired: this.state.depots.size,
			totalPropellantKgPerYear: propellantPerYear,
			fleetUtilizationPercent: fleetUtilization * 100,
			costPerServiceMission: costPerMission,
			depotStats,
			failuresUnserviced,
			totalFailures: this.state.failures.size,
			totalRepairs: this.state.completedRepairs
		};
	}
}
