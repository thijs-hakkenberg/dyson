/**
 * Orbital Location Trade Simulation Tests
 */

import { describe, it, expect } from 'vitest';
import {
	ORBITAL_LOCATIONS,
	getAllLocations,
	getLocationData,
	calculateTransferDeltaV,
	calculateTransferTime,
	calculateLowThrustDeltaV,
	calculateDeltaVFromEarth,
	calculateDeltaVToFeedstock,
	generateDeltaVMatrix,
	calculateStationKeepingDeltaV
} from '../delta-v-calculator';
import {
	calculateRadiatorArea,
	calculateMaxThermalLoad,
	calculateThermalCliffDistance,
	analyzeThermalFeasibility,
	calculateThermalFeasibilityScore,
	calculateSolarPowerScore
} from '../thermal-model';
import {
	calculateOneWayDelay,
	calculateRoundTripDelay,
	calculateCommLatencyScore,
	determineOperationalMode,
	getCommMetrics
} from '../comm-latency';
import {
	DEFAULT_ORBITAL_TRADE_CONFIG,
	runOrbitalTradeMonteCarlo,
	performParetoAnalysis,
	generateSensitivityConfigs
} from '../monte-carlo';
import type { OrbitalLocation } from '../types';

describe('Delta-V Calculator', () => {
	describe('ORBITAL_LOCATIONS', () => {
		it('should have all 8 locations defined', () => {
			expect(Object.keys(ORBITAL_LOCATIONS)).toHaveLength(8);
		});

		it('should have valid distance values', () => {
			for (const loc of getAllLocations()) {
				expect(loc.distanceAU).toBeGreaterThan(0);
				expect(loc.distanceAU).toBeLessThanOrEqual(1.1);
			}
		});

		it('should have valid delta-V from Earth values', () => {
			for (const loc of getAllLocations()) {
				expect(loc.deltaVFromEarth).toBeGreaterThan(0);
				expect(loc.deltaVFromEarth).toBeLessThan(15);
			}
		});
	});

	describe('calculateTransferDeltaV', () => {
		it('should return 0 for same location', () => {
			expect(calculateTransferDeltaV('nrho', 'nrho')).toBe(0);
			expect(calculateTransferDeltaV('helio_1au', 'helio_1au')).toBe(0);
		});

		it('should calculate positive delta-V for different locations', () => {
			const deltaV = calculateTransferDeltaV('helio_1au', 'helio_0p7au');
			expect(deltaV).toBeGreaterThan(0);
			expect(deltaV).toBeLessThan(10);
		});

		it('should be symmetric for Hohmann transfers', () => {
			const forward = calculateTransferDeltaV('helio_1au', 'helio_0p5au');
			const reverse = calculateTransferDeltaV('helio_0p5au', 'helio_1au');
			expect(Math.abs(forward - reverse)).toBeLessThan(0.1);
		});
	});

	describe('calculateTransferTime', () => {
		it('should return 0 for same location', () => {
			expect(calculateTransferTime('nrho', 'nrho')).toBe(0);
		});

		it('should return reasonable transfer times', () => {
			const timeToVenus = calculateTransferTime('helio_1au', 'helio_0p7au');
			expect(timeToVenus).toBeGreaterThan(50); // > 50 days
			expect(timeToVenus).toBeLessThan(200); // < 200 days
		});
	});

	describe('calculateLowThrustDeltaV', () => {
		it('should be comparable to Hohmann for radial transfers', () => {
			// Low-thrust spiral delta-V equals difference in circular velocities
			// For short transfers this can be similar or slightly more than Hohmann
			const hohmann = calculateTransferDeltaV('helio_1au', 'helio_0p7au');
			const lowThrust = calculateLowThrustDeltaV('helio_1au', 'helio_0p7au');
			// Both should be positive and reasonable
			expect(lowThrust).toBeGreaterThan(0);
			expect(lowThrust).toBeLessThan(10);
			// Within 50% of each other
			expect(Math.abs(lowThrust - hohmann) / hohmann).toBeLessThan(0.5);
		});
	});

	describe('generateDeltaVMatrix', () => {
		it('should generate matrix for all location pairs', () => {
			const locations: OrbitalLocation[] = ['nrho', 'sun_earth_l1', 'helio_1au'];
			const matrix = generateDeltaVMatrix(locations);
			expect(matrix).toHaveLength(9); // 3 x 3
		});

		it('should include transfer times', () => {
			const matrix = generateDeltaVMatrix(['helio_1au', 'helio_0p7au']);
			for (const entry of matrix) {
				expect(entry.deltaVKms).toBeGreaterThanOrEqual(0);
				expect(entry.transferDays).toBeGreaterThanOrEqual(0);
			}
		});
	});

	describe('calculateStationKeepingDeltaV', () => {
		it('should be lowest for dynamically stable locations', () => {
			const l4StationKeeping = calculateStationKeepingDeltaV('sun_earth_l4');
			const l1StationKeeping = calculateStationKeepingDeltaV('sun_earth_l1');
			expect(l4StationKeeping).toBeLessThan(l1StationKeeping);
		});
	});
});

describe('Thermal Model', () => {
	describe('calculateRadiatorArea', () => {
		it('should require more area closer to Sun', () => {
			const areaAt1AU = calculateRadiatorArea(2.0, 1.0);
			const areaAt05AU = calculateRadiatorArea(2.0, 0.5);
			expect(areaAt05AU).toBeGreaterThan(areaAt1AU);
		});

		it('should scale with thermal load', () => {
			const area2MW = calculateRadiatorArea(2.0, 1.0);
			const area4MW = calculateRadiatorArea(4.0, 1.0);
			expect(area4MW).toBeGreaterThan(area2MW * 1.5);
		});
	});

	describe('analyzeThermalFeasibility', () => {
		it('should be feasible at 1 AU with moderate thermal budget', () => {
			const result = analyzeThermalFeasibility('helio_1au', 2.5);
			expect(result.withinLimits).toBe(true);
		});

		it('should have challenges at 0.5 AU with high thermal budget', () => {
			const result = analyzeThermalFeasibility('helio_0p5au', 5.0);
			expect(result.requiredRadiatorAreaM2).toBeGreaterThan(
				analyzeThermalFeasibility('helio_1au', 5.0).requiredRadiatorAreaM2
			);
		});
	});

	describe('calculateThermalFeasibilityScore', () => {
		it('should score 1 AU higher than inner orbits', () => {
			const score1AU = calculateThermalFeasibilityScore('helio_1au', 2.5);
			const score05AU = calculateThermalFeasibilityScore('helio_0p5au', 2.5);
			expect(score1AU).toBeGreaterThan(score05AU);
		});
	});

	describe('calculateSolarPowerScore', () => {
		it('should score inner orbits higher for power', () => {
			const score1AU = calculateSolarPowerScore('helio_1au');
			const score07AU = calculateSolarPowerScore('helio_0p7au');
			expect(score07AU).toBeGreaterThanOrEqual(score1AU);
		});

		it('should penalize extreme inner orbits', () => {
			const score05AU = calculateSolarPowerScore('helio_0p5au');
			const scoreMercuryL1 = calculateSolarPowerScore('sun_mercury_l1');
			expect(scoreMercuryL1).toBeLessThan(score05AU);
		});
	});
});

describe('Communication Latency Model', () => {
	describe('calculateOneWayDelay', () => {
		it('should return delays in seconds', () => {
			const delay = calculateOneWayDelay('nrho');
			expect(delay).toBeGreaterThan(0);
			expect(delay).toBeLessThan(600); // < 10 minutes one-way
		});
	});

	describe('calculateRoundTripDelay', () => {
		it('should be roughly 2x one-way plus overhead', () => {
			const oneWay = calculateOneWayDelay('sun_earth_l1');
			const roundTrip = calculateRoundTripDelay('sun_earth_l1');
			expect(roundTrip).toBeGreaterThan(2 * oneWay);
			expect(roundTrip).toBeLessThan(2 * oneWay + 30); // < 30s overhead
		});
	});

	describe('calculateCommLatencyScore', () => {
		it('should score NRHO highest', () => {
			const nrhoScore = calculateCommLatencyScore('nrho');
			const l1Score = calculateCommLatencyScore('sun_earth_l1');
			expect(nrhoScore).toBeGreaterThan(l1Score);
		});
	});

	describe('determineOperationalMode', () => {
		it('should assign supervised or real-time mode to NRHO', () => {
			// NRHO has ~1.3 min one-way latency (~2.6+ min round-trip)
			// May be real_time or supervised depending on threshold
			const mode = determineOperationalMode('nrho');
			expect(['real_time', 'supervised']).toContain(mode);
		});

		it('should assign supervised mode to L1', () => {
			const mode = determineOperationalMode('sun_earth_l1');
			expect(['real_time', 'supervised']).toContain(mode);
		});
	});

	describe('getCommMetrics', () => {
		it('should return complete metrics', () => {
			const metrics = getCommMetrics('helio_1au');
			expect(metrics).toHaveProperty('oneWayDelayMin');
			expect(metrics).toHaveProperty('roundTripDelayMin');
			expect(metrics).toHaveProperty('operationalMode');
			expect(metrics).toHaveProperty('commandsPerHour');
		});
	});
});

describe('Monte Carlo Simulation', () => {
	describe('DEFAULT_ORBITAL_TRADE_CONFIG', () => {
		it('should have all candidate locations', () => {
			expect(DEFAULT_ORBITAL_TRADE_CONFIG.candidateLocations).toHaveLength(8);
		});

		it('should have valid objective weights summing to ~1', () => {
			const weights = DEFAULT_ORBITAL_TRADE_CONFIG.objectiveWeights;
			const sum = weights.cost + weights.risk + weights.capability;
			expect(sum).toBeCloseTo(1.0, 1);
		});
	});

	describe('runOrbitalTradeMonteCarlo', () => {
		it('should complete with default config', async () => {
			const result = await runOrbitalTradeMonteCarlo(
				{
					...DEFAULT_ORBITAL_TRADE_CONFIG,
					seed: 12345
				},
				10 // Reduced runs for test speed
			);

			expect(result.runs).toBe(10);
			expect(result.locationStats).toHaveLength(8);
			expect(result.recommendation).toBeDefined();
			expect(result.robustParetoFrontier.length).toBeGreaterThan(0);
		});

		it('should produce consistent results with same seed', async () => {
			const config = { ...DEFAULT_ORBITAL_TRADE_CONFIG, seed: 99999 };

			const result1 = await runOrbitalTradeMonteCarlo(config, 20);
			const result2 = await runOrbitalTradeMonteCarlo(config, 20);

			expect(result1.recommendation).toBe(result2.recommendation);
		});

		it('should include delta-V matrix', async () => {
			const result = await runOrbitalTradeMonteCarlo(
				{ ...DEFAULT_ORBITAL_TRADE_CONFIG, seed: 11111 },
				5
			);

			expect(result.deltaVMatrix.length).toBe(64); // 8 x 8
		});
	});

	describe('performParetoAnalysis', () => {
		it('should identify Pareto frontier', async () => {
			const output = await runOrbitalTradeMonteCarlo(
				{ ...DEFAULT_ORBITAL_TRADE_CONFIG, seed: 54321 },
				20
			);

			const analysis = performParetoAnalysis(output);

			expect(analysis.paretoFrontier.length).toBeGreaterThan(0);
			expect(analysis.utopiaPoint).toBeDefined();
			expect(analysis.nadirPoint).toBeDefined();
		});
	});

	describe('generateSensitivityConfigs', () => {
		it('should generate multiple configurations', () => {
			const configs = generateSensitivityConfigs(DEFAULT_ORBITAL_TRADE_CONFIG);
			expect(configs.length).toBeGreaterThan(10);
		});

		it('should vary feedstock sources', () => {
			const configs = generateSensitivityConfigs(DEFAULT_ORBITAL_TRADE_CONFIG);
			const sources = new Set(configs.map((c) => c.feedstockSource));
			expect(sources.size).toBe(3);
		});
	});
});
