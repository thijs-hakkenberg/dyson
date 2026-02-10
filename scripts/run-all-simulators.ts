/**
 * Run All 7 Simulators and Output Results
 *
 * Usage: npx vite-node scripts/run-all-simulators.ts
 *
 * Runs Monte Carlo simulations and comparison sweeps for all 7 research questions,
 * then outputs structured results for analysis.
 */

// ========== Shkadov Mirror (RQ-3b-1) ==========
import {
	DEFAULT_SHKADOV_CONFIG,
	runShkadovTradeSweep,
	runShkadovComparison,
	generateArealDensityConfigs,
	generateReflectivityConfigs,
	type ShkadovConfig,
	type ShkadovResult
} from '$lib/services/simulation/shkadov-mirror';

// ========== Thermal Warping (RQ-2-4) ==========
import {
	DEFAULT_WARPING_CONFIG,
	runWarpingMonteCarlo,
	runWarpingComparison,
	type WarpingConfig
} from '$lib/services/simulation/thermal-warping';

// ========== Thermodynamic Cascade (RQ-3a-1) ==========
import {
	DEFAULT_CASCADE_CONFIG,
	runCascadeMonteCarlo,
	runCascadeComparison,
	type CascadeConfig
} from '$lib/services/simulation/thermodynamic-cascade';

// ========== Self-Replication (RQ-3a-2) ==========
import {
	DEFAULT_REPLICATION_CONFIG,
	runReplicationMonteCarlo,
	runReplicationComparison,
	type ReplicationConfig
} from '$lib/services/simulation/self-replication';

// ========== Membrane Dynamics (RQ-1-7) ==========
import {
	DEFAULT_MEMBRANE_CONFIG,
	runMembraneMonteCarlo,
	runMembraneComparison,
	type MembraneConfig
} from '$lib/services/simulation/membrane-dynamics';

// ========== Deployment Optimization (RQ-1-43) ==========
import {
	DEFAULT_DEPLOYMENT_OPT_CONFIG,
	runDeploymentOptMonteCarlo,
	type DeploymentOptConfig
} from '$lib/services/simulation/deployment-optimization';

// ========== Solar Mass Extraction (RQ-3b-2) ==========
import {
	DEFAULT_EXTRACTION_CONFIG,
	runExtractionMonteCarlo,
	runExtractionComparison,
	type ExtractionConfig
} from '$lib/services/simulation/solar-mass-extraction';

// Helper to format numbers
function fmt(n: number, decimals = 2): string {
	if (Math.abs(n) >= 1e15) return n.toExponential(decimals);
	if (Math.abs(n) >= 1e12) return (n / 1e12).toFixed(decimals) + 'T';
	if (Math.abs(n) >= 1e9) return (n / 1e9).toFixed(decimals) + 'B';
	if (Math.abs(n) >= 1e6) return (n / 1e6).toFixed(decimals) + 'M';
	if (Math.abs(n) >= 1e3) return (n / 1e3).toFixed(decimals) + 'K';
	return n.toFixed(decimals);
}

function section(title: string) {
	console.log('\n' + '='.repeat(80));
	console.log(`  ${title}`);
	console.log('='.repeat(80));
}

function subsection(title: string) {
	console.log(`\n--- ${title} ---`);
}

async function runShkadov() {
	section('1. SHKADOV MIRROR STANDOFF DISTANCE (RQ-3b-1)');

	// Default trade sweep
	subsection('Trade Sweep: Distance 0.1-2.0 AU (default config)');
	const result = await runShkadovTradeSweep();

	console.log(`Optimal distance: ${result.optimalDistance.toFixed(2)} AU`);
	console.log(`Max feasible thrust: ${result.maxFeasibleThrust.toExponential(2)} N`);
	console.log(`Execution time: ${result.executionTimeMs}ms`);
	console.log(`Analysis: σ_crit=${result.analysis.criticalArealDensity.toFixed(2)} g/m², material=${result.analysis.materialRecommendation}`);
	console.log(`Optimal: area=${result.analysis.optimalMirrorArea.toExponential(2)} m², mass=${result.analysis.optimalMirrorMass.toExponential(2)} kg, temp=${result.analysis.optimalTemp.toFixed(0)}K`);
	console.log(`Insolation reduction: ${(result.analysis.optimalInsolationReduction * 100).toFixed(4)}%`);
	console.log(`\nTrade points (distance → thrust, temp, feasible, mass):`);
	for (const pt of result.tradePoints) {
		console.log(`  ${pt.distance.toFixed(2)} AU: thrust=${pt.thrust.toExponential(2)} N, temp=${pt.equilibriumTemp.toFixed(0)}K, feasible=${pt.isThermallyFeasible}, mass=${pt.mirrorMass.toExponential(2)} kg, cost=$${pt.costEstimate.toExponential(2)}`);
	}

	// Areal density comparison
	subsection('Comparison: Areal Density Sweep');
	const densityConfigs = generateArealDensityConfigs(DEFAULT_SHKADOV_CONFIG);
	const densityResult = await runShkadovComparison(densityConfigs);
	console.log(`Best thrust at index: ${densityResult.analysis.bestThrustIndex}`);
	console.log(`Best mass at index: ${densityResult.analysis.bestMassIndex}`);
	console.log(`Best feasibility at index: ${densityResult.analysis.bestFeasibilityIndex}`);
	for (let i = 0; i < densityConfigs.length; i++) {
		const r = densityResult.results[i];
		console.log(`  σ=${densityConfigs[i].arealDensity} kg/m²: optimal=${r.optimalDistance.toFixed(2)} AU, maxThrust=${r.maxFeasibleThrust.toExponential(2)} N`);
	}

	// Reflectivity comparison
	subsection('Comparison: Reflectivity Sweep');
	const reflConfigs = generateReflectivityConfigs(DEFAULT_SHKADOV_CONFIG);
	const reflResult = await runShkadovComparison(reflConfigs);
	for (let i = 0; i < reflConfigs.length; i++) {
		const r = reflResult.results[i];
		console.log(`  R=${reflConfigs[i].reflectivity}: optimal=${r.optimalDistance.toFixed(2)} AU, maxThrust=${r.maxFeasibleThrust.toExponential(2)} N`);
	}

	return result;
}

async function runWarping() {
	section('2. THERMAL WARPING ON LARGE MEMBRANES (RQ-2-4)');

	// Default run - area sweep
	subsection('Monte Carlo: Area Sweep 5K-1M m² (200 iterations)');
	const result = await runWarpingMonteCarlo(DEFAULT_WARPING_CONFIG);

	console.log(`Execution time: ${result.executionTimeMs}ms`);
	console.log(`\nArea sweep results (area → deflection, pass rates):`);
	for (const pt of result.result.areaStats) {
		console.log(`  ${fmt(pt.area, 0)} m²: deflection=${(pt.meanDeflection * 1000).toFixed(1)}±${(pt.stdDevDeflection * 1000).toFixed(1)} mm, phased_array=${(pt.phasedArrayPassRate * 100).toFixed(0)}%, structural=${(pt.structuralPassRate * 100).toFixed(0)}%, temp=${pt.meanTemp.toFixed(0)}K`);
	}

	// Distance comparison
	subsection('Comparison: Orbital Distance [0.3, 0.5, 0.7, 1.0 AU]');
	const distConfigs: WarpingConfig[] = [0.3, 0.5, 0.7, 1.0].map(d => ({
		...DEFAULT_WARPING_CONFIG, orbitalDistance: d, iterations: 100
	}));
	const distLabels = ['0.3 AU', '0.5 AU', '0.7 AU', '1.0 AU'];
	const distResult = await runWarpingComparison(distConfigs, distLabels);
	for (let i = 0; i < distResult.labels.length; i++) {
		const r = distResult.results[i];
		const cfgPt = r.configuredAreaStats;
		if (cfgPt) {
			console.log(`  ${distResult.labels[i]}: deflection=${(cfgPt.meanDeflection * 1000).toFixed(1)}mm, PA_pass=${(cfgPt.phasedArrayPassRate * 100).toFixed(0)}%, structural_pass=${(cfgPt.structuralPassRate * 100).toFixed(0)}% at ${fmt(DEFAULT_WARPING_CONFIG.membraneArea)}m²`);
		}
	}

	// Tension comparison
	subsection('Comparison: Tension [0.1, 0.5, 1.0, 5.0, 10.0 N/m]');
	const tensConfigs: WarpingConfig[] = [0.1, 0.5, 1.0, 5.0, 10.0].map(t => ({
		...DEFAULT_WARPING_CONFIG, tension: t, iterations: 100
	}));
	const tensLabels = tensConfigs.map(c => `${c.tension} N/m`);
	const tensResult = await runWarpingComparison(tensConfigs, tensLabels);
	for (let i = 0; i < tensResult.labels.length; i++) {
		const r = tensResult.results[i];
		const cfgPt = r.configuredAreaStats;
		if (cfgPt) {
			console.log(`  ${tensResult.labels[i]}: deflection=${(cfgPt.meanDeflection * 1000).toFixed(1)}mm, PA_pass=${(cfgPt.phasedArrayPassRate * 100).toFixed(0)}%, structural_pass=${(cfgPt.structuralPassRate * 100).toFixed(0)}% at ${fmt(DEFAULT_WARPING_CONFIG.membraneArea)}m²`);
		}
	}

	return result;
}

async function runCascade() {
	section('3. THERMODYNAMIC CASCADE EFFICIENCY (RQ-3a-1)');

	// Default run
	subsection('Monte Carlo: Default Config (4 shells, 1200K→40K)');
	const result = await runCascadeMonteCarlo(DEFAULT_CASCADE_CONFIG);

	console.log(`Mean efficiency: ${(result.result.meanEfficiency * 100).toFixed(2)}%`);
	console.log(`Efficiency CI: [${(result.result.efficiencyCI.lower * 100).toFixed(2)}%, ${(result.result.efficiencyCI.upper * 100).toFixed(2)}%]`);
	console.log(`Mean total extracted: ${result.result.meanTotalExtracted.toExponential(2)} W`);
	console.log(`Mean viable shells: ${result.result.meanViableShellCount.toFixed(1)}`);
	console.log(`Mean total radiator area: ${result.result.meanTotalRadiatorArea.toExponential(2)} m²`);
	console.log(`\nShell breakdown:`);
	for (const shell of result.result.shellBreakdown) {
		console.log(`  Shell ${shell.index + 1}: Thot=${shell.tempHot.toFixed(0)}K → Tcold=${shell.tempCold.toFixed(0)}K, carnot=${(shell.carnotEfficiency * 100).toFixed(1)}%, actual=${(shell.actualEfficiency * 100).toFixed(1)}%, extracted=${shell.powerExtracted.toExponential(2)}W, radiator=${shell.radiatorArea.toExponential(2)}m², viable=${shell.isViable}`);
	}

	// Shell count comparison
	subsection('Comparison: Shell Count [2-7]');
	const shellConfigs: CascadeConfig[] = [2, 3, 4, 5, 6, 7].map(n => ({
		...DEFAULT_CASCADE_CONFIG, shellCount: n, iterations: 100
	}));
	const shellLabels = shellConfigs.map(c => `${c.shellCount} shells`);
	const shellResult = await runCascadeComparison(shellConfigs, shellLabels);
	console.log(`Best efficiency at: ${shellResult.analysis.bestEfficiency}`);
	console.log(`Recommended: ${shellResult.analysis.recommendation}`);
	for (let i = 0; i < shellResult.labels.length; i++) {
		const r = shellResult.results[i];
		console.log(`  ${shellResult.labels[i]}: eff=${(r.meanEfficiency * 100).toFixed(2)}%, viable=${r.meanViableShellCount.toFixed(1)}, extracted=${r.meanTotalExtracted.toExponential(2)}W`);
	}

	// TPV efficiency comparison
	subsection('Comparison: TPV Efficiency [20-50% of Carnot]');
	const tpvConfigs: CascadeConfig[] = [0.2, 0.3, 0.35, 0.4, 0.5].map(e => ({
		...DEFAULT_CASCADE_CONFIG, tpvEfficiency: e, iterations: 100
	}));
	const tpvLabels = tpvConfigs.map(c => `TPV ${(c.tpvEfficiency * 100).toFixed(0)}%`);
	const tpvResult = await runCascadeComparison(tpvConfigs, tpvLabels);
	for (let i = 0; i < tpvResult.labels.length; i++) {
		const r = tpvResult.results[i];
		console.log(`  ${tpvResult.labels[i]}: eff=${(r.meanEfficiency * 100).toFixed(2)}%, viable=${r.meanViableShellCount.toFixed(1)}, extracted=${r.meanTotalExtracted.toExponential(2)}W`);
	}

	return result;
}

async function runReplication() {
	section('4. SELF-REPLICATION CLOSURE THRESHOLD (RQ-3a-2)');

	// Default run
	subsection('Monte Carlo: Default Config (96% closure, 12mo cycle)');
	const result = await runReplicationMonteCarlo(DEFAULT_REPLICATION_CONFIG);

	const r = result.result;
	console.log(`Probability of reaching target (${DEFAULT_REPLICATION_CONFIG.targetFoundries}): ${(r.probabilityOfTarget * 100).toFixed(1)}%`);
	console.log(`Time to target: ${r.timeToTargetStats.mean.toFixed(1)} months (${(r.timeToTargetStats.mean / 12).toFixed(1)} years), median=${r.timeToTargetStats.median.toFixed(1)}mo, range=[${r.timeToTargetStats.min.toFixed(0)}, ${r.timeToTargetStats.max.toFixed(0)}]`);
	console.log(`Final count: ${r.finalCountStats.mean.toFixed(0)} ± ${r.finalCountStats.stdDev.toFixed(0)} [${r.finalCountStats.min}, ${r.finalCountStats.max}]`);
	console.log(`Total vitamin imports: ${fmt(r.totalVitaminStats.mean)} ± ${fmt(r.totalVitaminStats.stdDev)} kg`);
	console.log(`Peak growth rate: ${r.peakGrowthStats.mean.toFixed(2)} foundries/cycle (max: ${r.peakGrowthStats.max.toFixed(0)})`);

	// Closure ratio comparison
	subsection('Comparison: Closure Ratio [85-99%]');
	const closureConfigs: ReplicationConfig[] = [0.85, 0.90, 0.93, 0.96, 0.98, 0.99].map(c => ({
		...DEFAULT_REPLICATION_CONFIG, closureRatio: c, iterations: 100
	}));
	const closureLabels = closureConfigs.map(c => `${(c.closureRatio * 100).toFixed(0)}% closure`);
	const closureResult = await runReplicationComparison(closureConfigs, closureLabels);
	console.log(`Fastest to target: ${closureResult.analysis.fastestToTarget}`);
	console.log(`Lowest vitamin cost: ${closureResult.analysis.lowestVitaminCost}`);
	console.log(`Recommendation: ${closureResult.analysis.recommendation}`);
	for (let i = 0; i < closureResult.labels.length; i++) {
		const cr = closureResult.results[i];
		console.log(`  ${closureResult.labels[i]}: P(target)=${(cr.probabilityOfTarget * 100).toFixed(0)}%, time=${cr.timeToTargetStats.mean.toFixed(0)}mo (${(cr.timeToTargetStats.mean / 12).toFixed(1)}yr), range=[${cr.timeToTargetStats.min.toFixed(0)}-${cr.timeToTargetStats.max.toFixed(0)}mo], vitamins=${fmt(cr.totalVitaminStats.mean)}kg`);
	}

	// Degradation comparison
	subsection('Comparison: Degradation Rate [0-5%]');
	const degConfigs: ReplicationConfig[] = [0, 0.005, 0.01, 0.02, 0.05].map(d => ({
		...DEFAULT_REPLICATION_CONFIG, degradationRate: d, iterations: 100
	}));
	const degLabels = degConfigs.map(c => `${(c.degradationRate * 100).toFixed(1)}% degradation`);
	const degResult = await runReplicationComparison(degConfigs, degLabels);
	for (let i = 0; i < degResult.labels.length; i++) {
		const dr = degResult.results[i];
		console.log(`  ${degResult.labels[i]}: P(target)=${(dr.probabilityOfTarget * 100).toFixed(0)}%, time=${dr.timeToTargetStats.mean.toFixed(0)}mo, final=${dr.finalCountStats.mean.toFixed(0)}, vitamins=${fmt(dr.totalVitaminStats.mean)}kg`);
	}

	return result;
}

async function runMembrane() {
	section('5. MEMBRANE DEPLOYMENT DYNAMICS (RQ-1-7)');

	// Default run
	subsection('Monte Carlo: Default Config (500m, 0.1 RPM, 1.0 N/m)');
	const result = await runMembraneMonteCarlo(DEFAULT_MEMBRANE_CONFIG);

	const mr = result.result;
	console.log(`Used precomputed: ${result.usedPrecomputed}`);
	console.log(`Stable fraction: ${(mr.stableFraction * 100).toFixed(1)}%`);
	console.log(`Marginal fraction: ${(mr.marginalFraction * 100).toFixed(1)}%`);
	console.log(`Flutter fraction: ${(mr.flutterFraction * 100).toFixed(1)}%`);
	console.log(`Flutter margin: ${mr.meanFlutterMargin.toFixed(3)} ± ${mr.stdDevFlutterMargin.toFixed(3)}`);
	console.log(`Lowest frequency: ${mr.meanLowestFrequency.toFixed(4)} Hz`);

	console.log(`\nDiameter sweep:`);
	for (const pt of mr.sweepPoints) {
		console.log(`  ${pt.diameter}m: stability=${pt.stability}, flutter_margin=${pt.flutterMargin.toFixed(3)}, freq=${pt.lowestFrequency.toFixed(4)}Hz, flutter_boundary_tension=${pt.flutterBoundaryTension.toFixed(2)}N/m`);
	}

	// Tension comparison
	subsection('Comparison: Tension [0.1, 0.5, 1.0, 3.0, 10.0 N/m]');
	const tensionConfigs: MembraneConfig[] = [0.1, 0.5, 1.0, 3.0, 10.0].map(t => ({
		...DEFAULT_MEMBRANE_CONFIG, tension: t, iterations: 50
	}));
	const tensionResult = await runMembraneComparison(tensionConfigs);
	console.log(`Best flutter margin at: ${tensionResult.analysis.bestFlutterMargin}`);
	console.log(`Best diameter for stability: ${tensionResult.analysis.bestDiameterForStability}`);
	console.log(`Recommendation: ${tensionResult.analysis.recommendation}`);
	for (let i = 0; i < tensionConfigs.length; i++) {
		const tr = tensionResult.results[i];
		console.log(`  T=${tensionConfigs[i].tension} N/m: stable=${(tr.stableFraction * 100).toFixed(0)}%, flutter_margin=${tr.meanFlutterMargin.toFixed(3)}`);
	}

	// Spin rate comparison
	subsection('Comparison: Spin Rate [0, 0.05, 0.1, 0.2, 0.5 RPM]');
	const spinConfigs: MembraneConfig[] = [0, 0.05, 0.1, 0.2, 0.5].map(s => ({
		...DEFAULT_MEMBRANE_CONFIG, spinRate: s, iterations: 50
	}));
	const spinResult = await runMembraneComparison(spinConfigs);
	for (let i = 0; i < spinConfigs.length; i++) {
		const sr = spinResult.results[i];
		console.log(`  ω=${spinConfigs[i].spinRate} RPM: stable=${(sr.stableFraction * 100).toFixed(0)}%, flutter_margin=${sr.meanFlutterMargin.toFixed(3)}, lowest_freq=${sr.meanLowestFrequency.toFixed(4)}Hz`);
	}

	return result;
}

async function runDeployment() {
	section('6. ML TRAJECTORY DEPLOYMENT OPTIMIZATION (RQ-1-43)');

	// Default run (all 4 strategies)
	subsection('Monte Carlo: 500 units, 20 tugs, all 4 strategies');
	const result = await runDeploymentOptMonteCarlo(DEFAULT_DEPLOYMENT_OPT_CONFIG);

	console.log(`NN available: ${result.nnAvailable}`);
	console.log(`Best strategy: ${result.result.bestStrategy}`);
	console.log(`Execution time: ${result.executionTimeMs}ms`);
	console.log(`\nStrategy comparison:`);
	for (const s of result.result.strategyStats) {
		console.log(`  ${s.strategy}:`);
		console.log(`    Total ΔV: ${s.totalDeltaV.mean.toFixed(1)} ± ${s.totalDeltaV.stdDev.toFixed(1)} km/s [${s.totalDeltaV.ci95Lower.toFixed(1)}, ${s.totalDeltaV.ci95Upper.toFixed(1)}]`);
		console.log(`    Total days: ${s.totalDays.mean.toFixed(0)} ± ${s.totalDays.stdDev.toFixed(0)}`);
		console.log(`    Propellant: ${(s.propellantUsed.mean / 1000).toFixed(1)} ± ${(s.propellantUsed.stdDev / 1000).toFixed(1)} tonnes (${s.propellantUsed.mean.toFixed(0)} kg)`);
		console.log(`    Completion: ${s.completionRate.mean.toFixed(1)}%`);
	}
	console.log(`Win counts: ${JSON.stringify(result.result.winCounts)}`);

	// Scaling analysis
	subsection('Scaling: [100, 500, 1000, 2000] units');
	for (const count of [100, 500, 1000, 2000]) {
		const cfg: DeploymentOptConfig = { ...DEFAULT_DEPLOYMENT_OPT_CONFIG, unitCount: count, iterations: 20 };
		const sr = await runDeploymentOptMonteCarlo(cfg);
		const best = sr.result.strategyStats.find(s => s.strategy === sr.result.bestStrategy);
		console.log(`  ${count} units: best=${sr.result.bestStrategy}, ΔV=${best?.totalDeltaV.mean.toFixed(1)}, days=${best?.totalDays.mean.toFixed(0)}, prop=${best?.propellantUsed.mean.toFixed(1)}t`);
	}

	return result;
}

async function runExtraction() {
	section('7. SOLAR MASS EXTRACTION RATE LIMITS (RQ-3b-2)');

	// Default run
	subsection('Monte Carlo: Rate sweep 10^9 to 10^13 kg/s');
	const result = await runExtractionMonteCarlo();

	console.log(`Optimal rate: ${result.optimalRate.mean.toExponential(2)} kg/s [${result.optimalRate.low.toExponential(2)}, ${result.optimalRate.high.toExponential(2)}]`);
	console.log(`Max feasible rate: ${result.maxFeasibleRate.mean.toExponential(2)} kg/s [${result.maxFeasibleRate.low.toExponential(2)}, ${result.maxFeasibleRate.high.toExponential(2)}]`);
	console.log(`Total mass extracted: ${result.totalMassExtracted.mean.toExponential(2)} kg [${result.totalMassExtracted.low.toExponential(2)}, ${result.totalMassExtracted.high.toExponential(2)}]`);
	console.log(`Stability margin: ${result.stabilityMargin.mean.toFixed(3)} [${result.stabilityMargin.low.toFixed(3)}, ${result.stabilityMargin.high.toFixed(3)}]`);
	console.log(`Luminosity perturbation: ${(result.luminosityPerturbation.mean * 100).toFixed(4)}%`);
	console.log(`Energy budget: ${result.energyBudget.mean.toExponential(2)} W`);
	console.log(`Risk level: ${result.riskLevel}`);
	console.log(`Used response surfaces: ${result.usedResponseSurfaces}`);

	console.log(`\nRate sweep (rate → stability, efficiency, risk):`);
	for (const pt of result.meanSweepPoints) {
		console.log(`  ${pt.extractionRate.toExponential(1)}: stability=${pt.stabilityMargin.toFixed(3)}, eff=${(pt.efficiency * 100).toFixed(1)}%, plume_v=${pt.plumeVelocity.toFixed(0)}m/s, feasible=${pt.feasible}`);
	}

	// Activity level comparison
	subsection('Comparison: Solar Activity Levels');
	const actConfigs: ExtractionConfig[] = (['minimum', 'moderate', 'maximum'] as const).map(a => ({
		...DEFAULT_EXTRACTION_CONFIG, solarActivity: a, iterations: 100
	}));
	const actResult = await runExtractionComparison(actConfigs);
	for (let i = 0; i < actConfigs.length; i++) {
		const ar = actResult.results[i];
		console.log(`  ${actConfigs[i].solarActivity}: optimal=${ar.optimalRate.mean.toExponential(2)}, maxFeasible=${ar.maxFeasibleRate.mean.toExponential(2)}, risk=${ar.riskLevel}`);
	}

	// Efficiency comparison
	subsection('Comparison: Lifting Efficiency [1-10%]');
	const effConfigs: ExtractionConfig[] = [0.01, 0.03, 0.05, 0.08, 0.10].map(e => ({
		...DEFAULT_EXTRACTION_CONFIG, liftingEfficiency: e, iterations: 100
	}));
	const effResult = await runExtractionComparison(effConfigs);
	for (let i = 0; i < effConfigs.length; i++) {
		const er = effResult.results[i];
		console.log(`  η=${(effConfigs[i].liftingEfficiency * 100).toFixed(0)}%: optimal=${er.optimalRate.mean.toExponential(2)}, maxFeasible=${er.maxFeasibleRate.mean.toExponential(2)}, energy=${er.energyBudget.mean.toExponential(2)}W`);
	}

	return result;
}

// ========== MAIN ==========
async function main() {
	console.log('PROJECT DYSON - SIMULATION RESULTS REPORT');
	console.log('Running all 7 simulators with Monte Carlo analysis...\n');
	const startTime = Date.now();

	const results: Record<string, unknown> = {};

	try {
		results.shkadov = await runShkadov();
		results.warping = await runWarping();
		results.cascade = await runCascade();
		results.replication = await runReplication();
		results.membrane = await runMembrane();
		results.deployment = await runDeployment();
		results.extraction = await runExtraction();
	} catch (err) {
		console.error('ERROR:', err);
	}

	const totalTime = Date.now() - startTime;
	section('COMPLETE');
	console.log(`Total execution time: ${(totalTime / 1000).toFixed(1)}s`);
}

main();
