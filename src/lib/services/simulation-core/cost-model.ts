/**
 * Cost Modeling Utilities
 *
 * Parametric cost modeling for space systems, including learning curves,
 * launch costs, and ISRU economics.
 */

/**
 * Calculate learning curve effect on unit cost
 * Learning curves follow: Cost_n = Cost_1 * n^b where b = log(learningRate)/log(2)
 *
 * @param firstUnitCost Cost of the first unit
 * @param unitNumber Which unit number (1-indexed)
 * @param learningRate Learning rate (e.g., 0.85 = 85% = 15% reduction per doubling)
 * @returns Cost of the nth unit
 */
export function learningCurveCost(
	firstUnitCost: number,
	unitNumber: number,
	learningRate: number = 0.85
): number {
	if (unitNumber < 1) return firstUnitCost;
	const b = Math.log(learningRate) / Math.log(2);
	return firstUnitCost * Math.pow(unitNumber, b);
}

/**
 * Calculate cumulative cost of producing N units with learning curve
 * @param firstUnitCost Cost of the first unit
 * @param totalUnits Total number of units to produce
 * @param learningRate Learning rate (e.g., 0.85)
 * @returns Total cumulative cost
 */
export function cumulativeLearningCost(
	firstUnitCost: number,
	totalUnits: number,
	learningRate: number = 0.85
): number {
	let total = 0;
	for (let i = 1; i <= totalUnits; i++) {
		total += learningCurveCost(firstUnitCost, i, learningRate);
	}
	return total;
}

/**
 * Calculate average unit cost over a production run
 * @param firstUnitCost Cost of the first unit
 * @param totalUnits Total number of units to produce
 * @param learningRate Learning rate (e.g., 0.85)
 * @returns Average cost per unit
 */
export function averageUnitCost(
	firstUnitCost: number,
	totalUnits: number,
	learningRate: number = 0.85
): number {
	return cumulativeLearningCost(firstUnitCost, totalUnits, learningRate) / totalUnits;
}

/**
 * Launch cost parameters
 */
export interface LaunchCostParams {
	/** Cost per kg to LEO in $/kg */
	costPerKgLEO: number;
	/** Additional cost multiplier for deep space (beyond LEO) */
	deepSpaceMultiplier: number;
	/** Fixed cost per launch in $ */
	fixedCostPerLaunch: number;
	/** Maximum payload per launch in kg */
	maxPayloadKg: number;
}

/**
 * Default launch cost parameters (circa 2026-2030 projections)
 */
export const DEFAULT_LAUNCH_COSTS: LaunchCostParams = {
	costPerKgLEO: 1000,
	deepSpaceMultiplier: 2.5,
	fixedCostPerLaunch: 10_000_000,
	maxPayloadKg: 100_000
};

/**
 * Calculate total launch cost for a payload to deep space
 * @param payloadKg Total payload mass in kg
 * @param params Launch cost parameters
 * @returns Total cost in dollars
 */
export function launchCostToDeepSpace(
	payloadKg: number,
	params: LaunchCostParams = DEFAULT_LAUNCH_COSTS
): number {
	const numLaunches = Math.ceil(payloadKg / params.maxPayloadKg);
	const variableCost = payloadKg * params.costPerKgLEO * params.deepSpaceMultiplier;
	const fixedCost = numLaunches * params.fixedCostPerLaunch;
	return variableCost + fixedCost;
}

/**
 * ISRU cost model parameters
 */
export interface ISRUCostParams {
	/** Capital cost of seed factory in $ */
	capitalCost: number;
	/** Years to reach full production rate */
	rampUpYears: number;
	/** Operational cost per unit produced in $ */
	operationalCostPerUnit: number;
	/** Maximum production rate (units per year) at full capacity */
	maxProductionRate: number;
	/** Learning rate for ISRU operations */
	learningRate: number;
}

/**
 * Default ISRU parameters
 */
export const DEFAULT_ISRU_PARAMS: ISRUCostParams = {
	capitalCost: 50_000_000_000, // $50B seed factory
	rampUpYears: 5,
	operationalCostPerUnit: 1_000_000, // $1M per unit operational
	maxProductionRate: 1000,
	learningRate: 0.90
};

/**
 * ISRU production trajectory over time
 */
export interface ISRUProductionYear {
	year: number;
	productionRate: number;
	cumulativeUnits: number;
	costThisYear: number;
	cumulativeCost: number;
	avgCostPerUnit: number;
}

/**
 * Calculate ISRU production trajectory
 * @param totalUnits Target total units to produce
 * @param params ISRU parameters
 * @returns Array of yearly production data
 */
export function calculateISRUTrajectory(
	totalUnits: number,
	params: ISRUCostParams = DEFAULT_ISRU_PARAMS
): ISRUProductionYear[] {
	const trajectory: ISRUProductionYear[] = [];
	let cumulativeUnits = 0;
	let cumulativeCost = params.capitalCost;
	let year = 0;

	while (cumulativeUnits < totalUnits) {
		year++;

		// Production rate ramps up over rampUpYears
		const rampFactor = Math.min(1, year / params.rampUpYears);
		const productionRate = Math.min(
			Math.floor(params.maxProductionRate * rampFactor),
			totalUnits - cumulativeUnits
		);

		// Calculate cost for this year's production with learning curve
		let yearCost = 0;
		for (let i = 0; i < productionRate; i++) {
			yearCost += learningCurveCost(
				params.operationalCostPerUnit,
				cumulativeUnits + i + 1,
				params.learningRate
			);
		}

		cumulativeUnits += productionRate;
		cumulativeCost += yearCost;

		trajectory.push({
			year,
			productionRate,
			cumulativeUnits,
			costThisYear: yearCost,
			cumulativeCost,
			avgCostPerUnit: cumulativeCost / cumulativeUnits
		});
	}

	return trajectory;
}

/**
 * Earth manufacturing trajectory
 */
export interface EarthManufacturingYear {
	year: number;
	productionRate: number;
	cumulativeUnits: number;
	manufacturingCost: number;
	launchCost: number;
	totalCostThisYear: number;
	cumulativeCost: number;
	avgCostPerUnit: number;
}

/**
 * Calculate Earth manufacturing + launch trajectory
 * @param totalUnits Target total units
 * @param unitMassKg Mass per unit in kg
 * @param productionRatePerYear Units per year
 * @param firstUnitManufacturingCost First unit manufacturing cost
 * @param manufacturingLearningRate Learning rate for manufacturing
 * @param launchParams Launch cost parameters
 * @returns Yearly trajectory
 */
export function calculateEarthTrajectory(
	totalUnits: number,
	unitMassKg: number,
	productionRatePerYear: number,
	firstUnitManufacturingCost: number,
	manufacturingLearningRate: number = 0.85,
	launchParams: LaunchCostParams = DEFAULT_LAUNCH_COSTS
): EarthManufacturingYear[] {
	const trajectory: EarthManufacturingYear[] = [];
	let cumulativeUnits = 0;
	let cumulativeCost = 0;
	let year = 0;

	while (cumulativeUnits < totalUnits) {
		year++;

		const productionRate = Math.min(productionRatePerYear, totalUnits - cumulativeUnits);

		// Manufacturing cost with learning curve
		let manufacturingCost = 0;
		for (let i = 0; i < productionRate; i++) {
			manufacturingCost += learningCurveCost(
				firstUnitManufacturingCost,
				cumulativeUnits + i + 1,
				manufacturingLearningRate
			);
		}

		// Launch cost
		const launchCost = launchCostToDeepSpace(productionRate * unitMassKg, launchParams);

		const totalCostThisYear = manufacturingCost + launchCost;
		cumulativeUnits += productionRate;
		cumulativeCost += totalCostThisYear;

		trajectory.push({
			year,
			productionRate,
			cumulativeUnits,
			manufacturingCost,
			launchCost,
			totalCostThisYear,
			cumulativeCost,
			avgCostPerUnit: cumulativeCost / cumulativeUnits
		});
	}

	return trajectory;
}

/**
 * Find crossover point between two cost trajectories
 * @param earthTrajectory Earth manufacturing trajectory
 * @param isruTrajectory ISRU trajectory
 * @returns Unit count where ISRU becomes cheaper, or null if never
 */
export function findCrossoverPoint(
	earthTrajectory: EarthManufacturingYear[],
	isruTrajectory: ISRUProductionYear[]
): number | null {
	// Compare cumulative costs at each unit count
	for (let i = 0; i < Math.min(earthTrajectory.length, isruTrajectory.length); i++) {
		const earthCost = earthTrajectory[i].cumulativeCost;
		const isruCost = isruTrajectory[i].cumulativeCost;

		if (isruCost < earthCost) {
			return earthTrajectory[i].cumulativeUnits;
		}
	}

	return null;
}

/**
 * Net Present Value calculation
 * @param cashFlows Array of yearly cash flows (negative = cost)
 * @param discountRate Annual discount rate (e.g., 0.05 = 5%)
 * @returns NPV in same units as cash flows
 */
export function netPresentValue(cashFlows: number[], discountRate: number): number {
	return cashFlows.reduce((npv, cf, year) => {
		return npv + cf / Math.pow(1 + discountRate, year);
	}, 0);
}

/**
 * Internal Rate of Return calculation (simple Newton-Raphson)
 * @param cashFlows Array of yearly cash flows
 * @param maxIterations Maximum iterations for convergence
 * @returns IRR as decimal (e.g., 0.15 = 15%)
 */
export function internalRateOfReturn(cashFlows: number[], maxIterations: number = 100): number {
	let irr = 0.1; // Initial guess

	for (let i = 0; i < maxIterations; i++) {
		const npv = netPresentValue(cashFlows, irr);
		const npvDerivative = cashFlows.reduce((deriv, cf, year) => {
			return deriv - (year * cf) / Math.pow(1 + irr, year + 1);
		}, 0);

		const newIrr = irr - npv / npvDerivative;

		if (Math.abs(newIrr - irr) < 1e-6) {
			return newIrr;
		}
		irr = newIrr;
	}

	return irr;
}
