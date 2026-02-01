import { describe, it, expect } from 'vitest';
import {
	createVehicle,
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
	getFleetStats
} from '../vehicle';
import type { Vehicle } from '../types';

describe('vehicle', () => {
	describe('createVehicle', () => {
		it('should create vehicle with given capacity', () => {
			const vehicle = createVehicle('v1', 200000);

			expect(vehicle.id).toBe('v1');
			expect(vehicle.payloadCapacityKg).toBe(200000);
			expect(vehicle.status).toBe('idle');
		});

		it('should initialize counters to zero', () => {
			const vehicle = createVehicle('v1', 200000);

			expect(vehicle.currentPayloadKg).toBe(0);
			expect(vehicle.totalDeliveredKg).toBe(0);
			expect(vehicle.trips).toBe(0);
			expect(vehicle.hoursOperational).toBe(0);
		});
	});

	describe('startLoading', () => {
		it('should transition from idle to loading', () => {
			const vehicle = createVehicle('v1', 200000);
			const updated = startLoading(vehicle);

			expect(updated.status).toBe('loading');
		});

		it('should not change from non-idle status', () => {
			const vehicle = createVehicle('v1', 200000);
			const inTransit = { ...vehicle, status: 'in_transit' as const };
			const updated = startLoading(inTransit);

			expect(updated.status).toBe('in_transit');
		});
	});

	describe('completeLoading', () => {
		it('should set payload to capacity', () => {
			let vehicle = createVehicle('v1', 200000);
			vehicle = startLoading(vehicle);
			const updated = completeLoading(vehicle);

			expect(updated.currentPayloadKg).toBe(200000);
			expect(updated.status).toBe('loading');
		});

		it('should allow partial loading', () => {
			let vehicle = createVehicle('v1', 200000);
			vehicle = startLoading(vehicle);
			const updated = completeLoading(vehicle, 150000);

			expect(updated.currentPayloadKg).toBe(150000);
		});
	});

	describe('transit cycle', () => {
		it('should complete full transit cycle', () => {
			let vehicle = createVehicle('v1', 200000);

			// Loading
			vehicle = startLoading(vehicle);
			vehicle = completeLoading(vehicle);

			// Transit
			vehicle = startTransit(vehicle);
			expect(vehicle.status).toBe('in_transit');

			vehicle = completeTransit(vehicle, 1000);
			expect(vehicle.hoursOperational).toBe(1000);

			// Unloading
			vehicle = startUnloading(vehicle);
			expect(vehicle.status).toBe('unloading');

			vehicle = completeUnloading(vehicle);
			expect(vehicle.totalDeliveredKg).toBe(200000);
			expect(vehicle.currentPayloadKg).toBe(0);
			expect(vehicle.trips).toBe(1);

			// Return
			vehicle = startReturn(vehicle);
			expect(vehicle.status).toBe('returning');

			vehicle = completeReturn(vehicle, 500);
			expect(vehicle.status).toBe('idle');
			expect(vehicle.hoursOperational).toBe(1500);
		});
	});

	describe('failVehicle', () => {
		it('should mark vehicle as failed', () => {
			const vehicle = createVehicle('v1', 200000);
			const failed = failVehicle(vehicle, 5000);

			expect(failed.status).toBe('failed');
			expect(failed.failureTime).toBe(5000);
		});

		it('should preserve statistics', () => {
			let vehicle = createVehicle('v1', 200000);
			vehicle = { ...vehicle, totalDeliveredKg: 500000, trips: 3 };
			const failed = failVehicle(vehicle, 5000);

			expect(failed.totalDeliveredKg).toBe(500000);
			expect(failed.trips).toBe(3);
		});
	});

	describe('isOperational', () => {
		it('should return true for non-failed vehicles', () => {
			const vehicle = createVehicle('v1', 200000);
			expect(isOperational(vehicle)).toBe(true);
		});

		it('should return false for failed vehicles', () => {
			const vehicle = failVehicle(createVehicle('v1', 200000), 1000);
			expect(isOperational(vehicle)).toBe(false);
		});
	});

	describe('getFleetStats', () => {
		it('should calculate fleet statistics', () => {
			const fleet: Vehicle[] = [
				{ ...createVehicle('v1', 200000), totalDeliveredKg: 400000, trips: 2 },
				{ ...createVehicle('v2', 200000), totalDeliveredKg: 600000, trips: 3 },
				failVehicle(createVehicle('v3', 200000), 1000)
			];

			const stats = getFleetStats(fleet);

			expect(stats.totalVehicles).toBe(3);
			expect(stats.operationalVehicles).toBe(2);
			expect(stats.failedVehicles).toBe(1);
			expect(stats.totalDeliveredKg).toBe(1000000);
			expect(stats.totalTrips).toBe(5);
		});

		it('should handle empty fleet', () => {
			const stats = getFleetStats([]);

			expect(stats.totalVehicles).toBe(0);
			expect(stats.operationalVehicles).toBe(0);
		});
	});
});
