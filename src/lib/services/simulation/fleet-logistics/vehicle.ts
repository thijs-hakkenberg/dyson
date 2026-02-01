/**
 * Vehicle State Machine
 *
 * Manages vehicle state transitions through the logistics cycle:
 * idle -> loading -> in_transit -> unloading -> returning -> idle
 */

import type { Vehicle, VehicleStatus } from './types';

/**
 * Create a new vehicle
 */
export function createVehicle(id: string, payloadCapacityKg: number): Vehicle {
	return {
		id,
		status: 'idle',
		payloadCapacityKg,
		currentPayloadKg: 0,
		totalDeliveredKg: 0,
		trips: 0,
		hoursOperational: 0
	};
}

/**
 * Create fleet of vehicles
 */
export function createFleet(count: number, payloadCapacityKg: number): Vehicle[] {
	return Array.from({ length: count }, (_, i) => createVehicle(`vehicle-${i + 1}`, payloadCapacityKg));
}

/**
 * Start loading (idle -> loading)
 */
export function startLoading(vehicle: Vehicle): Vehicle {
	if (vehicle.status !== 'idle') return vehicle;
	return { ...vehicle, status: 'loading' };
}

/**
 * Complete loading (set payload)
 */
export function completeLoading(vehicle: Vehicle, payloadKg?: number): Vehicle {
	const payload = payloadKg ?? vehicle.payloadCapacityKg;
	return { ...vehicle, currentPayloadKg: Math.min(payload, vehicle.payloadCapacityKg) };
}

/**
 * Start transit (loading -> in_transit)
 */
export function startTransit(vehicle: Vehicle): Vehicle {
	if (vehicle.status !== 'loading') return vehicle;
	return { ...vehicle, status: 'in_transit' };
}

/**
 * Complete transit (add operational hours)
 */
export function completeTransit(vehicle: Vehicle, hoursElapsed: number): Vehicle {
	return { ...vehicle, hoursOperational: vehicle.hoursOperational + hoursElapsed };
}

/**
 * Start unloading (in_transit -> unloading)
 */
export function startUnloading(vehicle: Vehicle): Vehicle {
	if (vehicle.status !== 'in_transit') return vehicle;
	return { ...vehicle, status: 'unloading' };
}

/**
 * Complete unloading (add delivered cargo, reset payload, increment trips)
 */
export function completeUnloading(vehicle: Vehicle): Vehicle {
	return {
		...vehicle,
		totalDeliveredKg: vehicle.totalDeliveredKg + vehicle.currentPayloadKg,
		currentPayloadKg: 0,
		trips: vehicle.trips + 1
	};
}

/**
 * Start return (unloading -> returning)
 */
export function startReturn(vehicle: Vehicle): Vehicle {
	if (vehicle.status !== 'unloading') return vehicle;
	return { ...vehicle, status: 'returning' };
}

/**
 * Complete return (returning -> idle, add operational hours)
 */
export function completeReturn(vehicle: Vehicle, hoursElapsed: number): Vehicle {
	return {
		...vehicle,
		status: 'idle',
		hoursOperational: vehicle.hoursOperational + hoursElapsed
	};
}

/**
 * Mark vehicle as failed
 */
export function failVehicle(vehicle: Vehicle, failureTime: number): Vehicle {
	return { ...vehicle, status: 'failed', failureTime };
}

/**
 * Check if vehicle is operational
 */
export function isOperational(vehicle: Vehicle): boolean {
	return vehicle.status !== 'failed';
}

/**
 * Get an idle vehicle from fleet
 */
export function getIdleVehicle(fleet: Vehicle[]): Vehicle | undefined {
	return fleet.find((v) => v.status === 'idle');
}

/**
 * Fleet statistics
 */
export interface FleetStats {
	totalVehicles: number;
	operationalVehicles: number;
	failedVehicles: number;
	totalDeliveredKg: number;
	totalTrips: number;
	avgTripsPerVehicle: number;
}

/**
 * Calculate fleet statistics
 */
export function getFleetStats(fleet: Vehicle[]): FleetStats {
	const operational = fleet.filter(isOperational);

	return {
		totalVehicles: fleet.length,
		operationalVehicles: operational.length,
		failedVehicles: fleet.length - operational.length,
		totalDeliveredKg: fleet.reduce((sum, v) => sum + v.totalDeliveredKg, 0),
		totalTrips: fleet.reduce((sum, v) => sum + v.trips, 0),
		avgTripsPerVehicle: fleet.length > 0 ? fleet.reduce((sum, v) => sum + v.trips, 0) / fleet.length : 0
	};
}
