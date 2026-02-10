<script lang="ts">
	import type {
		CascadeConfig,
		CascadeOutput,
		CascadeComparisonResult,
		CascadeProgress
	} from '$lib/services/simulation/thermodynamic-cascade';
	import {
		DEFAULT_CASCADE_CONFIG,
		runCascadeMonteCarlo,
		runCascadeComparison,
		generateShellCountConfigs
	} from '$lib/services/simulation/thermodynamic-cascade';

	import CascadeControls from './CascadeControls.svelte';
	import CascadeResults from './CascadeResults.svelte';
	import CascadeChart from './CascadeChart.svelte';

	// State
	let config: CascadeConfig = $state({ ...DEFAULT_CASCADE_CONFIG });
	let output: CascadeOutput | null = $state(null);
	let comparison: CascadeComparisonResult | null = $state(null);
	let progress: CascadeProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('single');

	function handleConfigChange(newConfig: CascadeConfig) {
		config = newConfig;
	}

	async function runSingleSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		comparison = null;

		try {
			output = await runCascadeMonteCarlo(config, (p) => {
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

	async function runComparisonSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		output = null;

		try {
			const { configs, labels } = generateShellCountConfigs(config);
			comparison = await runCascadeComparison(configs, labels, (p) => {
				progress = p;
			});

			// Also set output to the best config result for the chart
			const bestIdx = comparison.bestEfficiencyIndex;
			output = {
				config: comparison.configs[bestIdx],
				result: comparison.results[bestIdx],
				runs: comparison.configs[bestIdx].iterations,
				executionTimeMs: 0
			};
		} catch (e) {
			error = e instanceof Error ? e.message : 'Comparison failed';
			console.error('Comparison error:', e);
		} finally {
			isRunning = false;
			progress = null;
		}
	}

	function runSimulation() {
		if (mode === 'single') {
			runSingleSimulation();
		} else {
			runComparisonSimulation();
		}
	}

	// Derived display values
	let carnotMax = $derived.by(() => {
		if (config.innerTemp <= config.outerTemp) return 0;
		return 1 - config.outerTemp / config.innerTemp;
	});
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">
			Thermodynamic Cascade Efficiency Simulator
		</h1>
		<p class="text-star-dim">
			Simulate energy flow through nested Matrioshka brain shells to determine viable layer
			count and total system efficiency. Each shell operates as a Carnot-limited heat engine,
			extracting useful work from the temperature gradient before passing waste heat outward.
		</p>
	</div>

	<!-- Mode Toggle -->
	<div class="flex justify-center gap-4">
		<button
			onclick={() => (mode = 'single')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'single'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Single Cascade
		</button>
		<button
			onclick={() => (mode = 'comparison')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'comparison'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Compare Shell Counts
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
			<CascadeControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Mode Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">
					{mode === 'single' ? 'Single Cascade Mode' : 'Shell Count Comparison'}
				</h4>
				<p class="text-xs text-star-dim">
					{#if mode === 'single'}
						Simulates a {config.shellCount}-shell ({config.shellCount - 1}-stage) cascade
						from {config.innerTemp} K to {config.outerTemp} K with {(config.tpvEfficiency * 100).toFixed(0)}% TPV efficiency.
					{:else}
						Compares cascades with 2-7 shells using current temperature and efficiency
						settings.
					{/if}
				</p>
			</div>

			<!-- Physics Summary -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-3">System Physics</h4>
				<div class="space-y-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-dim">Max Carnot Efficiency</span>
						<span class="text-star-white font-mono"
							>{(carnotMax * 100).toFixed(1)}%</span
						>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Temperature Ratio</span>
						<span class="text-star-white font-mono"
							>{(config.innerTemp / config.outerTemp).toFixed(1)}x</span
						>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Solar Input</span>
						<span class="text-star-white font-mono">3.828 x 10^26 W</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Min Viable Power</span>
						<span class="text-star-white font-mono">10^18 W (1 EW)</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column: Chart + Results -->
		<div class="lg:col-span-2 space-y-6">
			<CascadeChart {output} />

			{#if mode === 'comparison' && comparison}
				<!-- Comparison Table -->
				<div class="card-glow p-6">
					<h3 class="text-lg font-bold text-star-white mb-4">Shell Count Comparison</h3>
					<div class="overflow-x-auto">
						<table class="w-full text-xs">
							<thead>
								<tr class="text-star-faint border-b border-space-600">
									<th class="text-left py-2 pr-2">Config</th>
									<th class="text-right py-2 px-2">Efficiency</th>
									<th class="text-right py-2 px-2">Viable</th>
									<th class="text-right py-2 px-2">CI (95%)</th>
									<th class="text-center py-2 pl-2">Best</th>
								</tr>
							</thead>
							<tbody>
								{#each comparison.results as result, i}
									<tr
										class="border-b border-space-700 {i === comparison.bestEfficiencyIndex ? 'bg-cosmic-cyan/10' : ''}"
									>
										<td class="py-2 pr-2 text-star-white"
											>{comparison.labels[i]}</td
										>
										<td
											class="py-2 px-2 text-right font-mono text-cosmic-cyan"
											>{(result.meanEfficiency * 100).toFixed(2)}%</td
										>
										<td
											class="py-2 px-2 text-right font-mono text-solar-gold"
											>{result.meanViableShellCount.toFixed(1)}</td
										>
										<td class="py-2 px-2 text-right font-mono text-star-dim">
											{(result.efficiencyCI.lower * 100).toFixed(1)}-{(result.efficiencyCI.upper * 100).toFixed(1)}%
										</td>
										<td class="py-2 pl-2 text-center">
											{#if i === comparison.bestEfficiencyIndex}
												<span class="text-solar-gold">Best</span>
											{/if}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					{#if comparison.analysis}
						<div class="mt-4 p-3 bg-space-700/30 rounded-lg border border-space-600">
							<p class="text-sm text-star-white">
								{comparison.analysis.recommendation}
							</p>
						</div>
					{/if}
				</div>
			{/if}

			<CascadeResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Research Questions Context -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Research Question Addressed</h3>
		<div class="p-3 bg-space-700/30 rounded-lg">
			<p class="text-cosmic-cyan font-semibold mb-1">RQ-3a-1</p>
			<p class="text-star-dim text-sm">
				Thermodynamic cascade efficiency limits: What is the maximum achievable energy
				extraction efficiency for a nested Matrioshka brain shell architecture, considering
				Carnot limits, TPV conversion losses, spectral selectivity, and radiator area
				constraints?
			</p>
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Physics Model</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-3">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Temperature Spacing</p>
					<p class="text-star-dim text-xs">
						Shell temperatures are log-spaced between T_inner and T_outer, producing
						geometric progression that maximizes Carnot efficiency per stage.
					</p>
				</div>
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Energy Extraction</p>
					<p class="text-star-dim text-xs">
						Each shell extracts power limited by Carnot efficiency, reduced by TPV
						conversion and spectral selectivity losses.
					</p>
				</div>
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Radiator Scaling</p>
					<p class="text-star-dim text-xs">
						Radiator area scales as P / (sigma * T^4). Cold outer shells require
						enormously larger radiators due to T^4 dependence.
					</p>
				</div>
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Monte Carlo Variation</p>
					<p class="text-star-dim text-xs">
						Stochastic parameters: TPV efficiency (+/-15%), spectral selectivity (+/-5%),
						inter-shell thermal leakage (+/-10%).
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
