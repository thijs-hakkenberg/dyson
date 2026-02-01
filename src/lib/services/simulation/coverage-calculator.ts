/**
 * Coverage Calculator
 *
 * Implements the greedy target assignment algorithm to determine
 * which NEAs can be surveyed by a given constellation.
 */

import type { NEA, Satellite, PropulsionType, OrbitalElements } from './simulation-types';
import {
	calculateCharacteristicDeltaV,
	getDefaultSatelliteOrbit,
	getPropulsionSpecs
} from './orbital-mechanics';
import { sortByMiningValue } from './nea-population';

/**
 * Result of coverage calculation
 */
export interface CoverageResult {
	surveyedNEAs: NEA[];
	unsurveyed: NEA[];
	highValueSurveyed: NEA[];
	highValueUnsurveyed: NEA[];
	totalCoverage: number;
	highValueCoverage: number;
	satelliteUtilization: SatelliteUtilization[];
}

/**
 * Satellite utilization statistics
 */
export interface SatelliteUtilization {
	satelliteId: string;
	surveysCompleted: number;
	deltaVUsed: number;
	deltaVRemaining: number;
	utilizationPercent: number;
}

/**
 * Assignment of a target to a satellite
 */
interface TargetAssignment {
	nea: NEA;
	satellite: Satellite;
	deltaVCost: number;
}

/**
 * Calculate delta-V cost for a satellite to survey an NEA
 */
function calculateAssignmentCost(
	satellite: Satellite,
	nea: NEA,
	propulsionType: PropulsionType
): number {
	if (satellite.status !== 'operational') return Infinity;

	const baseDeltaV = calculateCharacteristicDeltaV(nea.orbital);
	const specs = getPropulsionSpecs(propulsionType);

	// Factor in propulsion efficiency
	const adjustedDeltaV = baseDeltaV / specs.efficiency;

	// Add small penalty for satellites with low remaining budget
	// (prefer to distribute work evenly)
	const budgetFactor = 1 + (1 - satellite.deltaVBudget / satellite.maxDeltaV) * 0.1;

	return adjustedDeltaV * budgetFactor;
}

/**
 * Find the best satellite for a given NEA
 */
function findBestSatellite(
	nea: NEA,
	satellites: Satellite[],
	propulsionType: PropulsionType
): { satellite: Satellite; cost: number } | null {
	let bestSatellite: Satellite | null = null;
	let lowestCost = Infinity;

	for (const satellite of satellites) {
		if (satellite.status !== 'operational') continue;

		const cost = calculateAssignmentCost(satellite, nea, propulsionType);

		// Check if satellite has enough delta-V
		if (cost <= satellite.deltaVBudget && cost < lowestCost) {
			lowestCost = cost;
			bestSatellite = satellite;
		}
	}

	if (bestSatellite) {
		return { satellite: bestSatellite, cost: lowestCost };
	}
	return null;
}

/**
 * Greedy target assignment algorithm
 *
 * 1. Sort NEAs by mining value (high-value first)
 * 2. For each NEA, find satellite with lowest delta-V cost
 * 3. Assign target, decrement satellite resources
 * 4. Track coverage statistics
 */
export function calculateCoverage(
	neas: NEA[],
	satellites: Satellite[],
	propulsionType: PropulsionType,
	highValueThreshold: number = 0.5
): CoverageResult {
	// Sort NEAs by mining value (descending)
	const sortedNEAs = sortByMiningValue(neas);

	const surveyedNEAs: NEA[] = [];
	const unsurveyed: NEA[] = [];
	const assignments: TargetAssignment[] = [];

	// Clone satellites to track state
	const satState = satellites.map(s => ({ ...s }));

	// Greedy assignment
	for (const nea of sortedNEAs) {
		const assignment = findBestSatellite(nea, satState, propulsionType);

		if (assignment) {
			// Assign target
			surveyedNEAs.push(nea);
			assignments.push({
				nea,
				satellite: assignment.satellite,
				deltaVCost: assignment.cost
			});

			// Update satellite state
			const satIndex = satState.findIndex(s => s.id === assignment.satellite.id);
			if (satIndex >= 0) {
				satState[satIndex].deltaVBudget -= assignment.cost;
				satState[satIndex].surveysCompleted++;
				satState[satIndex].assignedTargets.push(nea.id);
			}
		} else {
			unsurveyed.push(nea);
		}
	}

	// Calculate high-value coverage
	const highValueNEAs = neas.filter(n => n.miningValue >= highValueThreshold);
	const highValueSurveyed = surveyedNEAs.filter(n => n.miningValue >= highValueThreshold);
	const highValueUnsurveyed = unsurveyed.filter(n => n.miningValue >= highValueThreshold);

	// Calculate satellite utilization
	const satelliteUtilization: SatelliteUtilization[] = satState.map(s => ({
		satelliteId: s.id,
		surveysCompleted: s.surveysCompleted,
		deltaVUsed: s.maxDeltaV - s.deltaVBudget,
		deltaVRemaining: s.deltaVBudget,
		utilizationPercent: ((s.maxDeltaV - s.deltaVBudget) / s.maxDeltaV) * 100
	}));

	return {
		surveyedNEAs,
		unsurveyed,
		highValueSurveyed,
		highValueUnsurveyed,
		totalCoverage: (surveyedNEAs.length / neas.length) * 100,
		highValueCoverage: highValueNEAs.length > 0
			? (highValueSurveyed.length / highValueNEAs.length) * 100
			: 0,
		satelliteUtilization
	};
}

/**
 * Calculate coverage for a single year of operation
 */
export function calculateYearlyCoverage(
	neas: NEA[],
	satellites: Satellite[],
	propulsionType: PropulsionType,
	surveysPerYear: number = 3,  // Average surveys per satellite per year
	highValueThreshold: number = 0.5
): CoverageResult {
	const specs = getPropulsionSpecs(propulsionType);
	const sortedNEAs = sortByMiningValue(neas);

	const surveyedNEAs: NEA[] = [];
	const unsurveyed: NEA[] = [];

	// Clone satellites
	const satState = satellites.map(s => ({ ...s }));

	// Calculate how many surveys each satellite can do this year
	const surveysLimit = Math.min(surveysPerYear, specs.surveysPerRefuel);

	// Track surveys per satellite this year
	const surveysThisYear: Record<string, number> = {};
	satState.forEach(s => { surveysThisYear[s.id] = 0; });

	for (const nea of sortedNEAs) {
		// Find operational satellite with capacity
		let assigned = false;

		for (const sat of satState) {
			if (sat.status !== 'operational') continue;
			if (surveysThisYear[sat.id] >= surveysLimit) continue;

			const cost = calculateAssignmentCost(sat, nea, propulsionType);

			if (cost <= sat.deltaVBudget) {
				surveyedNEAs.push(nea);
				sat.deltaVBudget -= cost;
				sat.surveysCompleted++;
				surveysThisYear[sat.id]++;
				assigned = true;
				break;
			}
		}

		if (!assigned) {
			unsurveyed.push(nea);
		}
	}

	const highValueNEAs = neas.filter(n => n.miningValue >= highValueThreshold);
	const highValueSurveyed = surveyedNEAs.filter(n => n.miningValue >= highValueThreshold);
	const highValueUnsurveyed = unsurveyed.filter(n => n.miningValue >= highValueThreshold);

	const satelliteUtilization: SatelliteUtilization[] = satState.map(s => ({
		satelliteId: s.id,
		surveysCompleted: s.surveysCompleted,
		deltaVUsed: s.maxDeltaV - s.deltaVBudget,
		deltaVRemaining: s.deltaVBudget,
		utilizationPercent: ((s.maxDeltaV - s.deltaVBudget) / s.maxDeltaV) * 100
	}));

	return {
		surveyedNEAs,
		unsurveyed,
		highValueSurveyed,
		highValueUnsurveyed,
		totalCoverage: (surveyedNEAs.length / neas.length) * 100,
		highValueCoverage: highValueNEAs.length > 0
			? (highValueSurveyed.length / highValueNEAs.length) * 100
			: 0,
		satelliteUtilization
	};
}

/**
 * Calculate average delta-V used across constellation
 */
export function calculateAvgDeltaVUsed(utilization: SatelliteUtilization[]): number {
	if (utilization.length === 0) return 0;
	const totalUsed = utilization.reduce((sum, u) => sum + u.deltaVUsed, 0);
	return totalUsed / utilization.length;
}

/**
 * Get NEAs that are reachable by any satellite in the constellation
 */
export function getReachableNEAs(
	neas: NEA[],
	satellites: Satellite[],
	propulsionType: PropulsionType
): NEA[] {
	const maxDeltaV = Math.max(...satellites.map(s => s.deltaVBudget));

	return neas.filter(nea => {
		const cost = calculateCharacteristicDeltaV(nea.orbital);
		const specs = getPropulsionSpecs(propulsionType);
		return cost / specs.efficiency <= maxDeltaV;
	});
}
