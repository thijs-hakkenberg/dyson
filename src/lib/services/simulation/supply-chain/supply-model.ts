/**
 * Supply Chain Supply/Demand Model
 *
 * Core functions for modeling xenon propellant supply and demand dynamics
 * for Project Dyson Phase 1 deployment.
 */

import { SeededRandom } from '$lib/services/simulation-core';

import type {
	SupplyChainConfig,
	SampledSupplyParams,
	YearlyBalance,
	AlternativePropellant,
	SupplyChainRunResult
} from './types';

/**
 * Base xenon market price ($/kg)
 */
const BASE_XENON_PRICE = 3000;

/**
 * Minimum Isp ratio for viable Hall thruster operation
 * (need ~2000s Isp, xenon provides ~3000s)
 */
const MIN_VIABLE_ISP_RATIO = 0.65;

/**
 * Sample uncertain supply chain parameters
 *
 * @param config Configuration with base values
 * @param rng Seeded random number generator
 * @returns Sampled parameters
 */
export function sampleSupplyParameters(
	config: SupplyChainConfig,
	rng: SeededRandom
): SampledSupplyParams {
	// Xenon production rate: normal distribution around base rate
	// Uncertainty of +/- 15% on global production estimates
	const productionUncertainty = 0.15;
	const xenonProductionRate = clamp(
		rng.nextGaussian(config.xenonProductionRate, config.xenonProductionRate * productionUncertainty),
		config.xenonProductionRate * 0.7,
		config.xenonProductionRate * 1.3
	);

	// Phase 1 demand: lognormal-like distribution (asymmetric uncertainty)
	// More likely to underestimate than overestimate
	const demandMultiplier = 1 + rng.nextGaussian(0, config.demandUncertaintyRange);
	const xenonDemand = clamp(
		config.xenonDemandPhase1 * demandMultiplier,
		config.xenonDemandPhase1 * (1 - config.demandUncertaintyRange),
		config.xenonDemandPhase1 * (1 + config.demandUncertaintyRange)
	);

	// Production growth rate: normal distribution with small variance
	const growthRateStdDev = 0.01;
	const productionGrowthRate = clamp(
		rng.nextGaussian(config.productionGrowthRate, growthRateStdDev),
		0.01,
		0.10
	);

	// Project allocation fraction: may vary based on market conditions
	const allocationStdDev = 0.05;
	const allocationFraction = clamp(
		rng.nextGaussian(config.projectAllocationFraction, allocationStdDev),
		0.1,
		0.5
	);

	// Krypton Isp ratio: normal around 0.85 with some uncertainty
	const kryptonIspRatio = clamp(rng.nextGaussian(0.85, 0.03), 0.75, 0.95);

	// Argon Isp ratio: normal around 0.60 with some uncertainty
	const argonIspRatio = clamp(rng.nextGaussian(0.60, 0.04), 0.50, 0.75);

	return {
		xenonProductionRate,
		xenonDemand,
		productionGrowthRate,
		allocationFraction,
		kryptonIspRatio,
		argonIspRatio
	};
}

/**
 * Calculate xenon supply available for a given year
 *
 * Models production growth and project allocation with optional price response
 *
 * @param config Simulation configuration
 * @param params Sampled parameters
 * @param year Year number (1-indexed)
 * @param priceFactor Optional price multiplier (>1 = high prices increase supply)
 * @returns Supply available (tonnes)
 */
export function calculateYearlySupply(
	config: SupplyChainConfig,
	params: SampledSupplyParams,
	year: number,
	priceFactor: number = 1.0
): number {
	// Base global production with growth
	const globalProduction =
		params.xenonProductionRate * Math.pow(1 + params.productionGrowthRate, year - 1);

	// Project's share of global production
	let projectSupply = globalProduction * params.allocationFraction;

	// Price response: higher prices can increase supply (new production capacity)
	if (priceFactor > 1.0 && config.priceElasticity > 0) {
		const supplyIncrease = (priceFactor - 1.0) * config.priceElasticity;
		projectSupply *= 1 + supplyIncrease;
	}

	return projectSupply;
}

/**
 * Calculate xenon demand for a given year
 *
 * Models Phase 1 deployment demand profile with learning curve effects
 *
 * @param config Simulation configuration
 * @param params Sampled parameters
 * @param year Year number (1-indexed)
 * @param totalDemand Total Phase 1 demand
 * @returns Demand this year (tonnes)
 */
export function calculateYearlyDemand(
	config: SupplyChainConfig,
	params: SampledSupplyParams,
	year: number,
	totalDemand: number
): number {
	// During stockpiling phase: no deployment demand, just accumulation
	if (year <= config.stockpilingYears) {
		return 0;
	}

	// Deployment phase: distribute demand over 10 years with ramp profile
	const deploymentYear = year - config.stockpilingYears;
	const totalDeploymentYears = 10;

	if (deploymentYear > totalDeploymentYears) {
		return 0;
	}

	// S-curve ramp: slow start, peak in middle, slow end
	// Peak demand around years 3-7 of deployment
	const rampFactor = calculateRampFactor(deploymentYear, totalDeploymentYears);

	// Apply learning curve reduction: efficiency improves over time
	const learningFactor = Math.pow(1 - config.learningCurveEffect, deploymentYear / 5);

	// Calculate this year's demand
	const baseYearlyDemand = totalDemand / totalDeploymentYears;
	const yearDemand = baseYearlyDemand * rampFactor * learningFactor;

	return yearDemand;
}

/**
 * Calculate S-curve ramp factor for deployment scheduling
 *
 * @param year Year within deployment phase
 * @param totalYears Total deployment years
 * @returns Ramp factor (0-2, with peak around 1.5)
 */
function calculateRampFactor(year: number, totalYears: number): number {
	// Logistic S-curve centered at midpoint
	const midpoint = totalYears / 2;
	const steepness = 0.5;

	// S-curve: slow start, rapid middle, slow end
	const sCurve = 1 / (1 + Math.exp(-steepness * (year - midpoint)));

	// Derivative of S-curve gives bell-shaped ramp profile
	const rampFactor = 4 * sCurve * (1 - sCurve) + 0.5;

	return rampFactor;
}

/**
 * Simulate stockpiling and deployment phases
 *
 * @param config Simulation configuration
 * @param params Sampled parameters
 * @returns Stockpiling simulation result
 */
export function simulateStockpiling(
	config: SupplyChainConfig,
	params: SampledSupplyParams
): {
	yearByYearBalance: YearlyBalance[];
	stockpileRequired: number;
	yearsToAccumulate: number;
	demandMet: boolean;
} {
	const yearByYearBalance: YearlyBalance[] = [];
	let cumulativeSupply = 0;
	let cumulativeDemand = 0;
	let currentPrice = BASE_XENON_PRICE;
	let stockpile = 0;

	// Simulate stockpiling + deployment (15 years total)
	const totalYears = config.stockpilingYears + 10;

	for (let year = 1; year <= totalYears; year++) {
		// Calculate supply with price response
		const priceFactor = currentPrice / BASE_XENON_PRICE;
		const supply = calculateYearlySupply(config, params, year, priceFactor);

		// Calculate demand
		const demand = calculateYearlyDemand(config, params, year, params.xenonDemand);

		// Update balances
		const deficit = supply - demand;
		cumulativeSupply += supply;
		cumulativeDemand += demand;
		stockpile = cumulativeSupply - cumulativeDemand;

		// Update price based on stockpile level
		currentPrice = calculatePriceResponse(BASE_XENON_PRICE, stockpile, config.priceElasticity);

		yearByYearBalance.push({
			year,
			supply,
			demand,
			deficit,
			cumulativeSupply,
			cumulativeDemand,
			stockpile,
			price: currentPrice
		});
	}

	// Calculate stockpile required (peak deficit over simulation)
	const minStockpile = Math.min(...yearByYearBalance.map((b) => b.stockpile));
	const stockpileRequired = minStockpile < 0 ? Math.abs(minStockpile) : 0;

	// Calculate years needed to accumulate sufficient stockpile
	let yearsToAccumulate = 0;
	if (stockpileRequired > 0) {
		let accumulated = 0;
		for (let year = 1; year <= config.stockpilingYears; year++) {
			accumulated += calculateYearlySupply(config, params, year);
			yearsToAccumulate = year;
			if (accumulated >= stockpileRequired) break;
		}
	}

	// Check if total demand can be met
	const demandMet = cumulativeSupply >= cumulativeDemand;

	return {
		yearByYearBalance,
		stockpileRequired,
		yearsToAccumulate,
		demandMet
	};
}

/**
 * Evaluate alternative propellant viability
 *
 * @param name Propellant name
 * @param ispRatio Isp ratio relative to xenon
 * @param availability Annual availability (tonnes)
 * @param costRatio Cost ratio relative to xenon
 * @param demand Total demand (tonnes)
 * @returns Alternative propellant evaluation
 */
export function evaluateAlternativePropellant(
	name: string,
	ispRatio: number,
	availability: number,
	costRatio: number,
	demand: number
): AlternativePropellant {
	// Scale factor: lower Isp means more propellant needed for same delta-V
	// delta-V = Isp * g0 * ln(m0/mf), so for same delta-V:
	// mass_required = 1 / Isp_ratio (approximately)
	const scaleFactor = 1 / ispRatio;

	// Propellant is viable if:
	// 1. Isp is above minimum threshold (for Hall thrusters to work efficiently)
	// 2. Availability * years >= scaled demand
	const scaledDemand = demand * scaleFactor;
	const availableOver5Years = availability * 5;

	const viable = ispRatio >= MIN_VIABLE_ISP_RATIO && availableOver5Years >= scaledDemand * 0.5;

	return {
		name,
		ispRatio,
		availability,
		costRatio,
		viable,
		scaleFactor
	};
}

/**
 * Calculate price response to supply/demand balance
 *
 * @param basePrice Base market price ($/kg)
 * @param stockpile Current stockpile (tonnes, negative = deficit)
 * @param elasticity Price elasticity (0-1)
 * @returns Adjusted price ($/kg)
 */
export function calculatePriceResponse(
	basePrice: number,
	stockpile: number,
	elasticity: number
): number {
	// Price responds inversely to stockpile
	// Deficit (negative stockpile) increases price
	// Surplus (positive stockpile) decreases price

	// Reference stockpile level (1 year of typical demand)
	const referenceStockpile = 30; // tonnes

	// Price multiplier based on stockpile deviation
	const stockpileRatio = stockpile / referenceStockpile;

	// Exponential price response, dampened by elasticity
	// Lower elasticity = larger price swings
	const priceMultiplier = Math.exp(-stockpileRatio * (1 - elasticity) * 0.3);

	// Clamp price to reasonable range (0.5x to 5x base)
	const adjustedPrice = clamp(basePrice * priceMultiplier, basePrice * 0.5, basePrice * 5);

	return adjustedPrice;
}

/**
 * Find the year when supply constraints become critical
 *
 * @param balance Year-by-year balance data
 * @param threshold Deficit threshold (tonnes) to consider constraint
 * @returns Constraint year or null if supply always sufficient
 */
export function findConstraintYear(
	balance: YearlyBalance[],
	threshold: number = 10
): number | null {
	for (const yearData of balance) {
		// Constraint occurs when stockpile goes significantly negative
		if (yearData.stockpile < -threshold) {
			return yearData.year;
		}
	}

	return null;
}

/**
 * Run a single supply chain simulation
 *
 * @param config Simulation configuration
 * @param runId Run identifier
 * @param seed Random seed
 * @returns Single run result
 */
export function runSingleSimulation(
	config: SupplyChainConfig,
	runId: number,
	seed: number
): SupplyChainRunResult {
	const rng = new SeededRandom(seed);

	// Sample parameters
	const sampledParams = sampleSupplyParameters(config, rng);

	// Run stockpiling simulation
	const stockpilingResult = simulateStockpiling(config, sampledParams);

	// Find constraint year
	const constraintYear = findConstraintYear(stockpilingResult.yearByYearBalance);

	// Evaluate alternative propellants
	const krypton = evaluateAlternativePropellant(
		'krypton',
		sampledParams.kryptonIspRatio,
		config.kryptonAvailability,
		0.3, // Krypton is about 30% of xenon cost
		sampledParams.xenonDemand
	);

	const argon = evaluateAlternativePropellant(
		'argon',
		sampledParams.argonIspRatio,
		config.argonAvailability,
		0.1, // Argon is about 10% of xenon cost
		sampledParams.xenonDemand
	);

	// Calculate total cost impact from constraints
	let totalCostImpact = 0;
	for (const yearData of stockpilingResult.yearByYearBalance) {
		if (yearData.stockpile < 0) {
			// Cost impact from price increase on remaining demand
			const priceIncrease = yearData.price - BASE_XENON_PRICE;
			totalCostImpact += priceIncrease * yearData.demand * 1000; // Convert tonnes to kg
		}
	}

	return {
		runId,
		sampledParams,
		yearByYearBalance: stockpilingResult.yearByYearBalance,
		constraintYear,
		alternativePropellantViability: {
			krypton,
			argon
		},
		totalCostImpact,
		stockpileRequired: stockpilingResult.stockpileRequired,
		yearsToAccumulate: stockpilingResult.yearsToAccumulate,
		demandMet: stockpilingResult.demandMet
	};
}

/**
 * Clamp a value between min and max
 */
function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value));
}
