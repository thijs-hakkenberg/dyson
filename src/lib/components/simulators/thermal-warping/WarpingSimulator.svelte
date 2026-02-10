<script lang="ts">
	import type {
		WarpingConfig,
		WarpingOutput,
		WarpingComparisonResult,
		WarpingProgress
	} from '$lib/services/simulation/thermal-warping';
	import {
		DEFAULT_WARPING_CONFIG,
		runWarpingMonteCarlo,
		runWarpingComparison,
		generateDistanceConfigs,
		generateTensionConfigs
	} from '$lib/services/simulation/thermal-warping';

	import WarpingControls from './WarpingControls.svelte';
	import WarpingResults from './WarpingResults.svelte';
	import WarpingChart from './WarpingChart.svelte';

	// State
	let config: WarpingConfig = $state({ ...DEFAULT_WARPING_CONFIG });
	let output: WarpingOutput | null = $state(null);
	let comparison: WarpingComparisonResult | null = $state(null);
	let progress: WarpingProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'sweep' | 'compare-distance' | 'compare-tension' = $state('sweep');

	function handleConfigChange(newConfig: WarpingConfig) {
		config = newConfig;
	}

	// Run area sweep simulation
	async function runAreaSweep() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		comparison = null;

		try {
			output = await runWarpingMonteCarlo(config, (p) => {
				progress = p;
			});
		} catch (e) {
			error = e instanceof Error ? e.message : 'Simulation failed';
			console.error('Simulation error:', e);
		} finally {
			isRunning = false;
			progress = null;
		}
	}

	// Run distance comparison
	async function runDistanceComparison() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		output = null;

		try {
			const { configs, labels } = generateDistanceConfigs(config);
			comparison = await runWarpingComparison(configs, labels, (p) => {
				progress = p;
			});
		} catch (e) {
			error = e instanceof Error ? e.message : 'Comparison failed';
			console.error('Comparison error:', e);
		} finally {
			isRunning = false;
			progress = null;
		}
	}

	// Run tension comparison
	async function runTensionComparison() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		output = null;

		try {
			const { configs, labels } = generateTensionConfigs(config);
			comparison = await runWarpingComparison(configs, labels, (p) => {
				progress = p;
			});
		} catch (e) {
			error = e instanceof Error ? e.message : 'Comparison failed';
			console.error('Comparison error:', e);
		} finally {
			isRunning = false;
			progress = null;
		}
	}

	function runSimulation() {
		if (mode === 'sweep') {
			runAreaSweep();
		} else if (mode === 'compare-distance') {
			runDistanceComparison();
		} else {
			runTensionComparison();
		}
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">Thermal Warping Membrane Simulator</h1>
		<p class="text-star-dim">
			Monte Carlo simulation of thermoelastic warping in large thin-film membranes
			under solar illumination. Models thermal gradients, curvature, and tension
			counteraction for Dyson swarm collector satellites.
		</p>
	</div>

	<!-- Mode Toggle -->
	<div class="flex justify-center gap-4 flex-wrap">
		<button
			onclick={() => (mode = 'sweep')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'sweep'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Area Sweep
		</button>
		<button
			onclick={() => (mode = 'compare-distance')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'compare-distance'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Compare Distances
		</button>
		<button
			onclick={() => (mode = 'compare-tension')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'compare-tension'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Compare Tensions
		</button>
	</div>

	<!-- Error display -->
	{#if error}
		<div
			class="max-w-3xl mx-auto p-4 rounded-lg bg-sun-red/20 border border-sun-red/50 text-sun-red"
		>
			<div class="flex items-center gap-2">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>{error}</span>
			</div>
		</div>
	{/if}

	<!-- Main Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Left Column: Controls -->
		<div class="lg:col-span-1 space-y-6">
			<WarpingControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Mode Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">
					{#if mode === 'sweep'}
						Area Sweep Mode
					{:else if mode === 'compare-distance'}
						Distance Comparison Mode
					{:else}
						Tension Comparison Mode
					{/if}
				</h4>
				<p class="text-xs text-star-dim">
					{#if mode === 'sweep'}
						Sweeps membrane area from 5,000 to 1,000,000 m&sup2; at {config.orbitalDistance} AU
						with {config.tension} N/m tension. Shows deflection curve with confidence bands
						and tolerance thresholds.
					{:else if mode === 'compare-distance'}
						Compares warping at 0.3, 0.5, 0.7, and 1.0 AU to show how proximity to the Sun
						affects thermal deflection across membrane sizes.
					{:else}
						Compares tensions of 0.1, 0.5, 1.0, 5.0, and 10.0 N/m to show how applied
						tension counteracts thermal warping.
					{/if}
				</p>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			<WarpingChart {output} {comparison} />

			{#if mode === 'sweep'}
				<WarpingResults {output} {progress} {isRunning} />
			{:else if isRunning && progress}
				<div class="card-glow p-6">
					<div class="space-y-4">
						<div class="flex items-center gap-3">
							<span class="spinner w-5 h-5"></span>
							<span class="text-star-dim">
								Running iteration {progress.currentRun} of {progress.totalRuns}...
							</span>
						</div>
						<div class="w-full bg-space-600 rounded-full h-2">
							<div
								class="bg-cosmic-cyan h-2 rounded-full transition-all duration-200"
								style="width: {progress.percentComplete}%"
							></div>
						</div>
						<p class="text-sm text-star-faint">{progress.percentComplete.toFixed(0)}% complete</p>
					</div>
				</div>
			{:else if comparison}
				<div class="card-glow p-6">
					<h3 class="text-lg font-bold text-star-white mb-4">Comparison Summary</h3>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{#each comparison.labels as label, i}
							{@const stats = comparison.results[i].configuredAreaStats}
							<div class="p-4 bg-space-700/50 rounded-lg">
								<p class="text-sm font-semibold text-cosmic-cyan mb-2">{label}</p>
								<div class="space-y-1 text-xs">
									<div class="flex justify-between">
										<span class="text-star-faint">Mean Deflection</span>
										<span class="text-star-white font-mono">
											{stats.meanDeflection < 0.001
												? `${(stats.meanDeflection * 1e6).toFixed(0)} um`
												: stats.meanDeflection < 0.01
													? `${(stats.meanDeflection * 1000).toFixed(2)} mm`
													: stats.meanDeflection < 1
														? `${(stats.meanDeflection * 100).toFixed(1)} cm`
														: `${stats.meanDeflection.toFixed(2)} m`}
										</span>
									</div>
									<div class="flex justify-between">
										<span class="text-star-faint">Structural Pass</span>
										<span class="{stats.structuralPassRate >= 0.95 ? 'text-green-400' : stats.structuralPassRate >= 0.5 ? 'text-yellow-400' : 'text-sun-red'} font-mono">
											{(stats.structuralPassRate * 100).toFixed(0)}%
										</span>
									</div>
									<div class="flex justify-between">
										<span class="text-star-faint">Phased Array Pass</span>
										<span class="{stats.phasedArrayPassRate >= 0.95 ? 'text-green-400' : stats.phasedArrayPassRate >= 0.5 ? 'text-yellow-400' : 'text-sun-red'} font-mono">
											{(stats.phasedArrayPassRate * 100).toFixed(0)}%
										</span>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Research Question Context -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Research Question Addressed</h3>
		<div class="p-3 bg-space-700/30 rounded-lg">
			<p class="text-cosmic-cyan font-semibold mb-1">RQ-2-4</p>
			<p class="text-star-dim">Thermal warping effects on large thin-film membranes in the solar environment</p>
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-2">
			<p>
				This Monte Carlo simulation models thermoelastic warping of large thin-film
				membranes under solar illumination, a key engineering challenge for Dyson swarm
				collector satellites.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Equilibrium temperature from radiative energy balance with PV conversion</li>
				<li>Front-to-back thermal gradient from emissivity asymmetry (~8%)</li>
				<li>Thermoelastic curvature: kappa = CTE x dT / thickness</li>
				<li>Flat membrane deflection: w = kappa x L&sup2; / 8</li>
				<li>Tension counteraction reduces effective deflection toward zero</li>
				<li>Stochastic variation: CTE +/-10%, emissivity +/-5%, tension +/-15%</li>
			</ul>
			<p class="text-star-faint">
				Key trade-off: Larger membranes capture more energy but require higher tension
				to maintain flatness within phased array tolerances (5 mm) or structural limits (10 cm).
			</p>
		</div>
	</div>
</div>
