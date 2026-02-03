/**
 * Service Dispatch System
 *
 * Nearest-depot routing and drone assignment for collector maintenance.
 * Handles inspector and servicer dispatch with delta-V calculations.
 */

import type { Depot, Drone, CollectorFailure, DroneType } from './types';

/**
 * Physical constants for propulsion calculations
 */
export const PROPULSION_CONSTANTS = {
	/** Standard gravity (m/s^2) */
	g0: 9.80665,
	/** Typical inspector dry mass (kg) */
	inspectorDryMassKg: 35,
	/** Typical servicer dry mass (kg) */
	servicerDryMassKg: 200,
	/** Inspector propellant capacity (kg) */
	inspectorPropellantKg: 15,
	/** Servicer propellant capacity (kg) */
	servicerPropellantKg: 50,
	/** Inspector Hall thruster Isp (seconds) */
	inspectorIspSeconds: 2000,
	/** Servicer Hall thruster Isp (seconds) */
	servicerIspSeconds: 1800
};

/**
 * Result of finding nearest depot
 */
export interface NearestDepotResult {
	depot: Depot;
	distanceKm: number;
	available: boolean;
	availableInspector?: Drone;
	availableServicer?: Drone;
}

/**
 * Calculate angular distance between two angles (in degrees)
 */
function angularDistanceDeg(angle1: number, angle2: number): number {
	const diff = Math.abs(angle1 - angle2);
	return Math.min(diff, 360 - diff);
}

/**
 * Calculate distance between two positions in the swarm
 * Uses simplified 2D geometry (radius and angle)
 */
export function calculateDistance(
	pos1: { positionKm: number; angleDegs: number },
	pos2: { positionKm: number; angleDegs: number }
): number {
	const r1 = pos1.positionKm;
	const r2 = pos2.positionKm;
	const theta1 = (pos1.angleDegs * Math.PI) / 180;
	const theta2 = (pos2.angleDegs * Math.PI) / 180;

	// Law of cosines: d^2 = r1^2 + r2^2 - 2*r1*r2*cos(theta2-theta1)
	const dSquared =
		r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(theta2 - theta1);

	return Math.sqrt(Math.max(0, dSquared));
}

/**
 * Find nearest depot to a failure location
 */
export function findNearestDepot(
	failure: CollectorFailure,
	depots: Depot[],
	drones: Map<string, Drone>
): NearestDepotResult | null {
	if (depots.length === 0) return null;

	let nearestDepot: Depot | null = null;
	let minDistance = Infinity;

	for (const depot of depots) {
		const distance = calculateDistance(
			{ positionKm: failure.positionKm, angleDegs: failure.angleDegs },
			{ positionKm: depot.positionKm, angleDegs: depot.angleDegs }
		);

		if (distance < minDistance) {
			minDistance = distance;
			nearestDepot = depot;
		}
	}

	if (!nearestDepot) return null;

	// Check for available drones at this depot
	const availableInspector = findAvailableDrone(nearestDepot.inspectorIds, drones, 'inspector');
	const availableServicer = findAvailableDrone(nearestDepot.servicerIds, drones, 'servicer');

	return {
		depot: nearestDepot,
		distanceKm: minDistance,
		available: availableInspector !== undefined || availableServicer !== undefined,
		availableInspector,
		availableServicer
	};
}

/**
 * Find an available drone of a specific type
 */
export function findAvailableDrone(
	droneIds: string[],
	drones: Map<string, Drone>,
	type: DroneType
): Drone | undefined {
	for (const id of droneIds) {
		const drone = drones.get(id);
		if (drone && drone.type === type && drone.status === 'idle') {
			// Check if drone has sufficient propellant (>20% threshold)
			const propellantRatio = drone.propellantKg / drone.maxPropellantKg;
			if (propellantRatio > 0.2) {
				return drone;
			}
		}
	}
	return undefined;
}

/**
 * Find any depot with available drone capacity
 * Used when nearest depot has no available drones
 */
export function findDepotWithCapacity(
	failure: CollectorFailure,
	depots: Depot[],
	drones: Map<string, Drone>,
	droneType: DroneType,
	maxRangeKm: number
): NearestDepotResult | null {
	const depotsWithDistance: Array<{ depot: Depot; distance: number }> = [];

	for (const depot of depots) {
		const distance = calculateDistance(
			{ positionKm: failure.positionKm, angleDegs: failure.angleDegs },
			{ positionKm: depot.positionKm, angleDegs: depot.angleDegs }
		);

		if (distance <= maxRangeKm) {
			depotsWithDistance.push({ depot, distance });
		}
	}

	// Sort by distance
	depotsWithDistance.sort((a, b) => a.distance - b.distance);

	// Find first depot with available drone
	for (const { depot, distance } of depotsWithDistance) {
		const droneIds = droneType === 'inspector' ? depot.inspectorIds : depot.servicerIds;
		const availableDrone = findAvailableDrone(droneIds, drones, droneType);

		if (availableDrone) {
			return {
				depot,
				distanceKm: distance,
				available: true,
				availableInspector: droneType === 'inspector' ? availableDrone : undefined,
				availableServicer: droneType === 'servicer' ? availableDrone : undefined
			};
		}
	}

	return null;
}

/**
 * Calculate delta-V required for a drone transfer
 * Uses simplified low-thrust spiral transfer assumption
 *
 * @param distanceKm - Distance to travel
 * @returns Delta-V in m/s
 */
export function calculateDroneDeltaV(distanceKm: number): number {
	// Simplified model: assume low-thrust spiral transfer
	// Delta-V scales roughly with sqrt(distance) for orbital transfers
	// Typical value: ~1 km/s per 100,000 km for Hall thruster spiral
	const deltaVPerHundredThousandKm = 1000; // m/s
	return (distanceKm / 100_000) * deltaVPerHundredThousandKm;
}

/**
 * Calculate propellant required for a transfer
 * Uses Tsiolkovsky rocket equation
 *
 * @param deltaV - Required delta-V in m/s
 * @param dryMassKg - Dry mass of drone in kg
 * @param ispSeconds - Specific impulse in seconds
 * @returns Propellant mass required in kg
 */
export function calculatePropellantRequired(
	deltaV: number,
	dryMassKg: number,
	ispSeconds: number
): number {
	const g0 = PROPULSION_CONSTANTS.g0;
	const exhaustVelocity = ispSeconds * g0;

	// Tsiolkovsky equation: deltaV = v_e * ln(m0/m1)
	// m0 = m_dry + m_prop, m1 = m_dry
	// m_prop = m_dry * (exp(deltaV/v_e) - 1)
	const massRatio = Math.exp(deltaV / exhaustVelocity);
	return dryMassKg * (massRatio - 1);
}

/**
 * Calculate transit time for a transfer
 * Uses simplified low-thrust spiral model
 *
 * @param distanceKm - Distance to travel
 * @param droneType - Type of drone (affects acceleration)
 * @returns Transit time in hours
 */
export function calculateTransitTime(distanceKm: number, droneType: DroneType): number {
	// Low-thrust spiral transfer time estimation
	// Typical Hall thruster: 0.01-0.1 N thrust, 50-200 kg mass
	// Acceleration: ~0.0001-0.001 m/s^2
	// For 100,000 km at constant accel: t = sqrt(2*d/a) ~ 10-30 days

	// Simplified model: hours per 10,000 km
	const hoursPerTenThousandKm = droneType === 'inspector' ? 12 : 18;
	return (distanceKm / 10_000) * hoursPerTenThousandKm;
}

/**
 * Check if drone has sufficient propellant for mission
 */
export function canCompleteMission(
	drone: Drone,
	distanceKm: number,
	ispSeconds: number
): boolean {
	// Round trip distance
	const totalDistanceKm = distanceKm * 2;
	const deltaV = calculateDroneDeltaV(totalDistanceKm);
	const propellantRequired = calculatePropellantRequired(
		deltaV,
		drone.dryMassKg,
		ispSeconds
	);

	// Need at least 10% margin
	return drone.propellantKg >= propellantRequired * 1.1;
}

/**
 * Consume propellant for a mission leg
 * Returns updated drone state
 */
export function consumePropellant(
	drone: Drone,
	distanceKm: number,
	ispSeconds: number
): Drone {
	const deltaV = calculateDroneDeltaV(distanceKm);
	const propellantUsed = calculatePropellantRequired(
		deltaV,
		drone.dryMassKg,
		ispSeconds
	);

	return {
		...drone,
		propellantKg: Math.max(0, drone.propellantKg - propellantUsed),
		distanceTraveledKm: drone.distanceTraveledKm + distanceKm
	};
}

/**
 * Refuel drone at depot
 */
export function refuelDrone(drone: Drone, depot: Depot): { drone: Drone; depot: Depot } {
	const propellantNeeded = drone.maxPropellantKg - drone.propellantKg;
	const propellantAvailable = Math.min(propellantNeeded, depot.propellantInventoryKg);

	return {
		drone: {
			...drone,
			propellantKg: drone.propellantKg + propellantAvailable,
			status: 'idle'
		},
		depot: {
			...depot,
			propellantInventoryKg: depot.propellantInventoryKg - propellantAvailable,
			propellantDispensedKg: depot.propellantDispensedKg + propellantAvailable
		}
	};
}
