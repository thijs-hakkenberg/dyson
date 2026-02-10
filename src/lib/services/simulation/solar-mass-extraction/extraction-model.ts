/**
 * Solar Mass Extraction Physics Model
 *
 * Calculates plume dynamics, lifting efficiency, stability margins,
 * and luminosity perturbations for solar mass extraction via concentrated
 * energy beams heating chromospheric gas.
 * Addresses research question rq-3b-2.
 */

import type {
	ExtractionConfig,
	ExtractionPoint,
	RiskLevel,
	ResponseSurfaceData,
	SolarActivityLevel
} from './types';

// Physical constants
export const R_SUN = 6.957e8; // Solar radius in meters
export const M_SUN = 1.989e30; // Solar mass in kg
export const L_SUN = 3.828e26; // Solar luminosity in Watts
export const T_SURFACE = 5778; // Surface temperature in Kelvin
export const V_ESCAPE_SURFACE = 617700; // Solar escape velocity at surface in m/s (617.7 km/s)
export const SOLAR_WIND_RATE = 2e9; // Natural solar wind mass loss rate in kg/s
export const T_KELVIN_HELMHOLTZ = 1.57e7 * 3.156e7; // Kelvin-Helmholtz timescale in seconds

// Chromospheric density profiles (kg/m^3) by solar activity
const CHROMOSPHERE_DENSITY: Record<SolarActivityLevel, number> = {
	minimum: 1e-10,
	moderate: 5e-10,
	maximum: 2e-9
};

// Default beam cross-section area in m^2 (~1 km radius beam)
const DEFAULT_BEAM_AREA = Math.PI * 1e6; // ~3.14e6 m^2

/**
 * Calculate plume velocity from beam heating.
 * v = sqrt(2 * P / (rho * A)), capped at solar escape velocity.
 * Energy above escape velocity is wasted (particles escape anyway).
 */
export function calculatePlumeVelocity(
	beamPower: number,
	beamArea: number,
	density: number
): number {
	if (density <= 0 || beamArea <= 0) return 0;
	const raw = Math.sqrt((2 * beamPower) / (density * beamArea));
	// Cap at ~2x escape velocity (diminishing returns beyond escape)
	return Math.min(raw, 2 * V_ESCAPE_SURFACE);
}

/**
 * Calculate mass flow rate per extraction station.
 * mdot = rho * v * A
 */
export function calculateMassFlowPerStation(
	density: number,
	velocity: number,
	beamArea: number
): number {
	return density * velocity * beamArea;
}

/**
 * Calculate lifting efficiency.
 * eta = (mdot * v_escape^2 / 2) / P_beam
 */
export function calculateLiftingEfficiency(
	massFlow: number,
	escapeVel: number,
	beamPower: number
): number {
	if (beamPower <= 0) return 0;
	return (massFlow * escapeVel * escapeVel) / (2 * beamPower);
}

/**
 * Calculate stability margin.
 * margin = 1 - P_extraction / L_sun
 * P_extraction = total beam power across all stations
 */
export function calculateStabilityMargin(
	totalExtractionPower: number,
	solarLuminosity: number = L_SUN
): number {
	return 1 - totalExtractionPower / solarLuminosity;
}

/**
 * Calculate cumulative luminosity perturbation over mission duration.
 * delta_L/L = -mdot * t_mission / (M_sun / t_KH * t_mission) simplifies to
 * delta_L/L ~ -mdot * t_KH / M_sun (fractional change per unit time, integrated)
 * More precisely: total mass removed = mdot * duration
 * Fractional mass change = (mdot * duration) / M_sun
 * Luminosity scales roughly as M^3.5 for main sequence, so
 * delta_L/L ~ 3.5 * delta_M/M for small perturbations
 */
export function calculateLuminosityPerturbation(
	extractionRate: number,
	missionDurationYears: number
): number {
	const durationSeconds = missionDurationYears * 3.156e7;
	const totalMassRemoved = extractionRate * durationSeconds;
	const fractionalMassChange = totalMassRemoved / M_SUN;
	// Main sequence mass-luminosity: L ~ M^3.5
	return 3.5 * fractionalMassChange;
}

/**
 * Classify risk based on stability margin.
 */
export function classifyRisk(stabilityMargin: number): RiskLevel {
	if (stabilityMargin > 0.99) return 'safe';
	if (stabilityMargin > 0.90) return 'caution';
	if (stabilityMargin > 0.80) return 'danger';
	return 'critical';
}

/**
 * Calculate total energy budget (beam power) needed for a given extraction rate.
 * P_total = mdot * v_escape^2 / (2 * efficiency)
 */
export function calculateEnergyBudget(
	extractionRate: number,
	efficiency: number
): number {
	if (efficiency <= 0) return Infinity;
	return (extractionRate * V_ESCAPE_SURFACE * V_ESCAPE_SURFACE) / (2 * efficiency);
}

/**
 * Calculate number of stations required for a target extraction rate.
 */
export function calculateStationsRequired(
	targetRate: number,
	massFlowPerStation: number
): number {
	if (massFlowPerStation <= 0) return Infinity;
	return Math.ceil(targetRate / massFlowPerStation);
}

/**
 * Load pre-computed response surfaces from static file.
 * Returns null if not available.
 */
export async function loadResponseSurfaces(): Promise<ResponseSurfaceData | null> {
	try {
		const response = await fetch('/content/simulation-data/solar-atmosphere/response-surfaces.json');
		if (!response.ok) return null;
		return await response.json();
	} catch {
		return null;
	}
}

/**
 * Bilinear interpolation on pre-computed response surface.
 */
export function interpolateResponseSurface(
	surfaces: ResponseSurfaceData,
	extractionRate: number,
	beamPower: number
): ExtractionPoint | null {
	const { grid, points } = surfaces;
	const ers = grid.extractionRates;
	const bps = grid.beamPowers;

	// Find bounding indices for extraction rate
	let erLow = 0;
	for (let i = 0; i < ers.length - 1; i++) {
		if (ers[i] <= extractionRate && ers[i + 1] >= extractionRate) {
			erLow = i;
			break;
		}
	}
	const erHigh = Math.min(erLow + 1, ers.length - 1);

	// Find bounding indices for beam power
	let bpLow = 0;
	for (let i = 0; i < bps.length - 1; i++) {
		if (bps[i] <= beamPower && bps[i + 1] >= beamPower) {
			bpLow = i;
			break;
		}
	}
	const bpHigh = Math.min(bpLow + 1, bps.length - 1);

	// Find the four surrounding points
	const getPoint = (er: number, bp: number) =>
		points.find((p) => p.er === er && p.bp === bp);

	const p00 = getPoint(erLow, bpLow);
	const p10 = getPoint(erHigh, bpLow);
	const p01 = getPoint(erLow, bpHigh);
	const p11 = getPoint(erHigh, bpHigh);

	if (!p00 || !p10 || !p01 || !p11) return null;

	// Interpolation weights (in log space for better behavior)
	const logER = Math.log10(extractionRate);
	const logERLow = Math.log10(ers[erLow]);
	const logERHigh = Math.log10(ers[erHigh]);
	const logBP = Math.log10(beamPower);
	const logBPLow = Math.log10(bps[bpLow]);
	const logBPHigh = Math.log10(bps[bpHigh]);

	const tx = logERHigh !== logERLow ? (logER - logERLow) / (logERHigh - logERLow) : 0;
	const ty = logBPHigh !== logBPLow ? (logBP - logBPLow) / (logBPHigh - logBPLow) : 0;

	const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
	const bilerp = (v00: number, v10: number, v01: number, v11: number) =>
		lerp(lerp(v00, v10, tx), lerp(v01, v11, tx), ty);

	return {
		extractionRate,
		efficiency: bilerp(p00.efficiency, p10.efficiency, p01.efficiency, p11.efficiency),
		plumeVelocity: bilerp(
			p00.plumeVelocity,
			p10.plumeVelocity,
			p01.plumeVelocity,
			p11.plumeVelocity
		),
		stabilityMargin: bilerp(
			p00.stabilityMargin,
			p10.stabilityMargin,
			p01.stabilityMargin,
			p11.stabilityMargin
		),
		luminosityPerturbation: bilerp(
			p00.luminosityPerturbation,
			p10.luminosityPerturbation,
			p01.luminosityPerturbation,
			p11.luminosityPerturbation
		),
		energyBudget: calculateEnergyBudget(
			extractionRate,
			bilerp(p00.efficiency, p10.efficiency, p01.efficiency, p11.efficiency)
		),
		stationsRequired: Math.ceil(
			bilerp(
				p00.stationsRequired,
				p10.stationsRequired,
				p01.stationsRequired,
				p11.stationsRequired
			)
		),
		feasible:
			bilerp(
				p00.feasible ? 1 : 0,
				p10.feasible ? 1 : 0,
				p01.feasible ? 1 : 0,
				p11.feasible ? 1 : 0
			) > 0.5
	};
}

/**
 * Analyze a single extraction parameter point using analytical model.
 */
export function analyzeExtractionPoint(
	config: ExtractionConfig,
	surfaces?: ResponseSurfaceData | null
): ExtractionPoint {
	// Try response surface interpolation first
	if (surfaces) {
		const interpolated = interpolateResponseSurface(
			surfaces,
			config.extractionRate,
			config.beamPower
		);
		if (interpolated) return interpolated;
	}

	// Fall back to analytical energy balance model
	const density = CHROMOSPHERE_DENSITY[config.solarActivity];
	const beamArea = DEFAULT_BEAM_AREA;

	// Use configured lifting efficiency as technology parameter
	// This represents the overall system efficiency of converting beam power
	// to kinetic energy of extracted mass at escape velocity
	const efficiency = config.liftingEfficiency;

	// Total energy budget required for this extraction rate
	const energyBudget = calculateEnergyBudget(config.extractionRate, efficiency);

	// Per-station beam power derived from total budget and station count
	const perStationPower = energyBudget / Math.max(config.stationCount, 1);

	// Plume velocity from per-station power (capped at 2x escape velocity)
	const plumeVelocity = calculatePlumeVelocity(perStationPower, beamArea, density);

	// Mass flow per station
	const massFlowPerStation = calculateMassFlowPerStation(density, plumeVelocity, beamArea);

	// Stations required
	const stationsRequired = calculateStationsRequired(config.extractionRate, massFlowPerStation);

	// Stability margin: total power needed scales with extraction rate
	const stabilityMargin = calculateStabilityMargin(energyBudget);

	// Luminosity perturbation
	const luminosityPerturbation = calculateLuminosityPerturbation(
		config.extractionRate,
		config.missionDuration
	);

	// Feasibility: stability margin > 0.80 and energy budget < L_SUN
	const feasible = stabilityMargin > 0.8 && energyBudget < L_SUN;

	return {
		extractionRate: config.extractionRate,
		efficiency,
		plumeVelocity,
		stabilityMargin,
		luminosityPerturbation,
		energyBudget,
		stationsRequired,
		feasible
	};
}
