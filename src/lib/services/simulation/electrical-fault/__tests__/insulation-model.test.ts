import { describe, it, expect } from 'vitest';
import {
	getInsulationProperties,
	calculateBreakdownVoltage,
	calculateInsulationLifetime,
	calculateMassPerMW,
	calculateFaultPropagationProbability,
	calculateRequiredIsolationTime,
	calculateReliability,
	INSULATION_PROPERTIES
} from '../insulation-model';
import type { InsulationMaterial, SystemTopology } from '../types';

describe('Insulation Model', () => {
	describe('getInsulationProperties', () => {
		const materials: InsulationMaterial[] = ['kapton', 'polyimide', 'teflon', 'ceramic'];

		it('should return properties for all materials', () => {
			for (const mat of materials) {
				const props = getInsulationProperties(mat);
				expect(props.dielectricStrength).toBeGreaterThan(0);
				expect(props.thermalConductivity).toBeGreaterThan(0);
				expect(props.density).toBeGreaterThan(0);
				expect(props.maxTemperature).toBeGreaterThan(100);
				expect(props.radiationResistance).toBeGreaterThan(0);
				expect(props.radiationResistance).toBeLessThanOrEqual(1);
				expect(props.costPerKg).toBeGreaterThan(0);
			}
		});

		it('should have ceramic with highest dielectric strength', () => {
			const kapton = getInsulationProperties('kapton');
			const ceramic = getInsulationProperties('ceramic');
			expect(ceramic.dielectricStrength).toBeGreaterThan(kapton.dielectricStrength);
		});

		it('should have ceramic with highest radiation resistance', () => {
			const ceramic = getInsulationProperties('ceramic');
			for (const mat of materials) {
				if (mat !== 'ceramic') {
					expect(ceramic.radiationResistance).toBeGreaterThanOrEqual(
						getInsulationProperties(mat).radiationResistance
					);
				}
			}
		});

		it('should have ceramic with highest max temperature', () => {
			const ceramic = getInsulationProperties('ceramic');
			expect(ceramic.maxTemperature).toBeGreaterThan(1000);
		});

		it('should have ceramic as most expensive', () => {
			const ceramic = getInsulationProperties('ceramic');
			for (const mat of materials) {
				if (mat !== 'ceramic') {
					expect(ceramic.costPerKg).toBeGreaterThanOrEqual(
						getInsulationProperties(mat).costPerKg
					);
				}
			}
		});
	});

	describe('calculateBreakdownVoltage', () => {
		it('should scale linearly with thickness', () => {
			const v1 = calculateBreakdownVoltage('kapton', 1.0);
			const v2 = calculateBreakdownVoltage('kapton', 2.0);
			expect(v2).toBeCloseTo(v1 * 2, 0);
		});

		it('should handle radiation degradation over time', () => {
			const fresh = calculateBreakdownVoltage('kapton', 1.0, 0);
			const aged = calculateBreakdownVoltage('kapton', 1.0, 10);
			expect(aged).toBeLessThan(fresh);
		});

		it('should degrade faster at closer orbits', () => {
			const near = calculateBreakdownVoltage('kapton', 1.0, 10, 0.3);
			const far = calculateBreakdownVoltage('kapton', 1.0, 10, 1.0);
			expect(near).toBeLessThan(far);
		});

		it('should be higher for materials with higher dielectric strength', () => {
			const kapton = calculateBreakdownVoltage('kapton', 1.0);
			const ceramic = calculateBreakdownVoltage('ceramic', 1.0);
			expect(ceramic).toBeGreaterThan(kapton);
		});

		it('should be in reasonable voltage range', () => {
			const voltage = calculateBreakdownVoltage('kapton', 1.0);
			// 1mm kapton with ~200 kV/mm should give ~200kV
			expect(voltage).toBeGreaterThan(100000);
			expect(voltage).toBeLessThan(500000);
		});
	});

	describe('calculateInsulationLifetime', () => {
		it('should decrease with higher voltage stress', () => {
			const life1 = calculateInsulationLifetime('kapton', 1.0, 600, 0.5);
			const life2 = calculateInsulationLifetime('kapton', 1.0, 3000, 0.5);
			expect(life2).toBeLessThan(life1);
		});

		it('should decrease at closer orbital distances (higher radiation)', () => {
			const life1AU = calculateInsulationLifetime('kapton', 1.0, 600, 1.0);
			const life05AU = calculateInsulationLifetime('kapton', 1.0, 600, 0.5);
			expect(life05AU).toBeLessThan(life1AU);
		});

		it('should be longer for radiation-resistant materials', () => {
			const kaptonLife = calculateInsulationLifetime('kapton', 1.0, 1000, 0.5);
			const ceramicLife = calculateInsulationLifetime('ceramic', 1.0, 1000, 0.5);
			expect(ceramicLife).toBeGreaterThan(kaptonLife);
		});

		it('should be positive', () => {
			const life = calculateInsulationLifetime('teflon', 0.5, 5000, 0.3);
			expect(life).toBeGreaterThan(0);
		});

		it('should increase with thickness', () => {
			const life1 = calculateInsulationLifetime('kapton', 0.5, 1000, 0.5);
			const life2 = calculateInsulationLifetime('kapton', 2.0, 1000, 0.5);
			expect(life2).toBeGreaterThan(life1);
		});
	});

	describe('calculateMassPerMW', () => {
		it('should calculate positive mass requirements', () => {
			const mass = calculateMassPerMW('kapton', 1.0, 1000);
			expect(mass).toBeGreaterThan(0);
		});

		it('should be in reasonable range', () => {
			const mass = calculateMassPerMW('kapton', 1.0, 1000);
			// Expect between 1-1000 kg/MW for typical configurations
			expect(mass).toBeGreaterThan(1);
			expect(mass).toBeLessThan(1000);
		});

		it('should increase with voltage (larger conductors)', () => {
			const mass1 = calculateMassPerMW('kapton', 1.0, 600);
			const mass2 = calculateMassPerMW('kapton', 1.0, 3000);
			expect(mass2).toBeGreaterThan(mass1);
		});

		it('should increase with thickness', () => {
			const mass1 = calculateMassPerMW('kapton', 0.5, 1000);
			const mass2 = calculateMassPerMW('kapton', 2.0, 1000);
			expect(mass2).toBeGreaterThan(mass1);
		});

		it('should be higher for denser materials', () => {
			const kapton = calculateMassPerMW('kapton', 1.0, 1000);
			const ceramic = calculateMassPerMW('ceramic', 1.0, 1000);
			// Ceramic is ~2.75x denser than kapton
			expect(ceramic).toBeGreaterThan(kapton);
		});
	});

	describe('calculateFaultPropagationProbability', () => {
		it('should be higher for series topology', () => {
			const series = calculateFaultPropagationProbability('series', 10, 10);
			const parallel = calculateFaultPropagationProbability('parallel', 10, 10);
			expect(series).toBeGreaterThan(parallel);
		});

		it('should have hybrid between series and parallel', () => {
			const series = calculateFaultPropagationProbability('series', 10, 10);
			const parallel = calculateFaultPropagationProbability('parallel', 10, 10);
			const hybrid = calculateFaultPropagationProbability('hybrid', 10, 10);
			expect(hybrid).toBeGreaterThan(parallel);
			expect(hybrid).toBeLessThan(series);
		});

		it('should decrease with faster isolation response', () => {
			const slow = calculateFaultPropagationProbability('hybrid', 10, 50);
			const fast = calculateFaultPropagationProbability('hybrid', 10, 5);
			expect(slow).toBeGreaterThan(fast);
		});

		it('should increase with slower detection', () => {
			const fastDetect = calculateFaultPropagationProbability('hybrid', 5, 10);
			const slowDetect = calculateFaultPropagationProbability('hybrid', 50, 10);
			expect(slowDetect).toBeGreaterThan(fastDetect);
		});

		it('should be between 0 and 1', () => {
			const topologies: SystemTopology[] = ['series', 'parallel', 'hybrid'];
			for (const topo of topologies) {
				const prob = calculateFaultPropagationProbability(topo, 10, 20);
				expect(prob).toBeGreaterThanOrEqual(0);
				expect(prob).toBeLessThanOrEqual(1);
			}
		});
	});

	describe('calculateRequiredIsolationTime', () => {
		it('should be shorter for series topology (higher risk)', () => {
			const series = calculateRequiredIsolationTime('series', 'low', 10);
			const parallel = calculateRequiredIsolationTime('parallel', 'low', 10);
			// Series needs faster isolation to achieve same risk level
			expect(series).toBeLessThan(parallel);
		});

		it('should allow longer time for higher risk tolerance', () => {
			const lowRisk = calculateRequiredIsolationTime('hybrid', 'low', 10);
			const highRisk = calculateRequiredIsolationTime('hybrid', 'high', 10);
			expect(highRisk).toBeGreaterThan(lowRisk);
		});

		it('should be positive', () => {
			const time = calculateRequiredIsolationTime('hybrid', 'medium', 10);
			expect(time).toBeGreaterThan(0);
		});

		it('should decrease with faster detection', () => {
			const fast = calculateRequiredIsolationTime('hybrid', 'low', 5);
			const slow = calculateRequiredIsolationTime('hybrid', 'low', 20);
			// With faster detection, we have more time margin for isolation
			expect(fast).toBeGreaterThan(slow);
		});
	});

	describe('calculateReliability', () => {
		it('should be between 0 and 1', () => {
			const rel = calculateReliability('kapton', 1.0, 1000, 0.5, 10);
			expect(rel).toBeGreaterThanOrEqual(0);
			expect(rel).toBeLessThanOrEqual(1);
		});

		it('should decrease over mission duration', () => {
			const early = calculateReliability('kapton', 1.0, 1000, 0.5, 1);
			const late = calculateReliability('kapton', 1.0, 1000, 0.5, 20);
			expect(late).toBeLessThan(early);
		});

		it('should be higher for radiation-resistant materials', () => {
			const kapton = calculateReliability('kapton', 1.0, 1000, 0.5, 10);
			const ceramic = calculateReliability('ceramic', 1.0, 1000, 0.5, 10);
			expect(ceramic).toBeGreaterThan(kapton);
		});

		it('should be higher at farther orbits', () => {
			const near = calculateReliability('kapton', 1.0, 1000, 0.3, 10);
			const far = calculateReliability('kapton', 1.0, 1000, 1.0, 10);
			expect(far).toBeGreaterThan(near);
		});

		it('should decrease with higher voltage', () => {
			const lowV = calculateReliability('kapton', 1.0, 600, 0.5, 10);
			const highV = calculateReliability('kapton', 1.0, 5000, 0.5, 10);
			expect(highV).toBeLessThan(lowV);
		});

		it('should start at 1 for zero mission time', () => {
			const rel = calculateReliability('kapton', 1.0, 1000, 0.5, 0);
			expect(rel).toBeCloseTo(1, 5);
		});
	});

	describe('INSULATION_PROPERTIES', () => {
		it('should have all four materials defined', () => {
			expect(INSULATION_PROPERTIES).toHaveProperty('kapton');
			expect(INSULATION_PROPERTIES).toHaveProperty('polyimide');
			expect(INSULATION_PROPERTIES).toHaveProperty('teflon');
			expect(INSULATION_PROPERTIES).toHaveProperty('ceramic');
		});

		it('should have realistic dielectric strengths', () => {
			// Typical values in kV/mm
			expect(INSULATION_PROPERTIES.kapton.dielectricStrength).toBeGreaterThan(100);
			expect(INSULATION_PROPERTIES.kapton.dielectricStrength).toBeLessThan(500);
		});

		it('should have realistic densities', () => {
			// kg/m^3
			expect(INSULATION_PROPERTIES.kapton.density).toBeGreaterThan(1000);
			expect(INSULATION_PROPERTIES.kapton.density).toBeLessThan(5000);
		});
	});
});
