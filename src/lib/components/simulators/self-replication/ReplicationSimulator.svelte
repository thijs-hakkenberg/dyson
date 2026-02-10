<script lang="ts">
	import type {
		ReplicationConfig,
		ReplicationOutput,
		ReplicationComparisonResult,
		ReplicationProgress
	} from '$lib/services/simulation/self-replication';
	import {
		DEFAULT_REPLICATION_CONFIG,
		runReplicationMonteCarlo,
		runReplicationComparison,
		generateClosureConfigs
	} from '$lib/services/simulation/self-replication';

	import ReplicationControls from './ReplicationControls.svelte';
	import ReplicationResults from './ReplicationResults.svelte';
	import ReplicationChart from './ReplicationChart.svelte';

	// State
	let config: ReplicationConfig = $state({ ...DEFAULT_REPLICATION_CONFIG });
	let output: ReplicationOutput | null = $state(null);
	let comparison: ReplicationComparisonResult | null = $state(null);
	let progress: ReplicationProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('single');

	function handleConfigChange(newConfig: ReplicationConfig) {
		config = newConfig;
	}

	// Run single simulation
	async function runSingleSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		comparison = null;

		try {
			output = await runReplicationMonteCarlo(config, (p) => {
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

	// Run comparison simulation
	async function runComparisonSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		output = null;

		try {
			const { configs, labels } = generateClosureConfigs(config);
			comparison = await runReplicationComparison(configs, labels, (p) => {
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
		if (mode === 'single') {
			runSingleSimulation();
		} else {
			runComparisonSimulation();
		}
	}

	// Derived display values
	let vitaminFraction = $derived((1 - config.closureRatio) * 100);
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">Self-Replication Growth Simulator</h1>
		<p class="text-star-dim">
			Monte Carlo simulation of self-replicating manufacturing foundries with exponential
			growth, closure ratio degradation, and vitamin supply constraints.
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
			Growth Simulation
		</button>
		<button
			onclick={() => (mode = 'comparison')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'comparison'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Compare Closure Ratios
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
			<ReplicationControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Self-Replication Concept -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">Self-Replication Concept</h4>
				<p class="text-xs text-star-dim mb-2">
					A foundry with {(config.closureRatio * 100).toFixed(0)}% closure can self-produce
					{(config.closureRatio * 100).toFixed(0)}% of its own mass. The remaining
					{vitaminFraction.toFixed(0)}% ("vitamins") must be imported from Earth or other sources.
				</p>
				<p class="text-xs text-star-faint">
					{#if mode === 'single'}
						Simulates {config.initialFoundries} foundries growing toward {config.targetFoundries.toLocaleString()}
						with {(config.degradationRate * 100).toFixed(1)}% closure degradation per generation.
					{:else}
						Compares closure ratios from 85% to 99% to find the minimum viable
						threshold for reaching {config.targetFoundries.toLocaleString()} foundries.
					{/if}
				</p>
			</div>
		</div>

		<!-- Right Column: Chart + Results -->
		<div class="lg:col-span-2 space-y-6">
			<ReplicationChart {output} {comparison} />
			<ReplicationResults {output} {progress} {isRunning} />

			<!-- Comparison Analysis -->
			{#if comparison}
				<div class="card-glow p-6">
					<h3 class="text-lg font-bold text-star-white mb-4">Comparison Analysis</h3>
					<p class="text-sm text-star-white mb-4">{comparison.analysis.recommendation}</p>
					<div class="grid grid-cols-2 md:grid-cols-3 gap-3">
						{#each comparison.labels as label, i}
							{@const result = comparison.results[i]}
							<div class="p-3 bg-space-700/30 rounded-lg">
								<p class="text-xs text-star-faint">{label} closure</p>
								<p class="text-sm font-semibold {result.probabilityOfTarget >= 0.5 ? 'text-green-400' : 'text-sun-red'}">
									{(result.probabilityOfTarget * 100).toFixed(0)}% reach target
								</p>
								{#if result.timeToTargetStats.mean !== null}
									<p class="text-xs text-star-dim">
										{(result.timeToTargetStats.mean / 12).toFixed(1)} years avg
									</p>
								{:else}
									<p class="text-xs text-star-dim">Target not reached</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Self-Replication Physics</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-3">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Closure Ratio</p>
					<p class="text-star-dim text-xs">
						The fraction of a foundry's mass that can be manufactured using only
						locally-available materials and the foundry itself. Higher closure means
						less dependence on imported "vitamin" components.
					</p>
				</div>
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Vitamin Components</p>
					<p class="text-star-dim text-xs">
						Specialized components (microchips, rare elements, precision optics) that
						cannot be self-produced and must be supplied externally. The vitamin
						fraction is (1 - closure ratio).
					</p>
				</div>
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Generational Degradation</p>
					<p class="text-star-dim text-xs">
						Each generation of replication accumulates manufacturing errors, reducing
						the effective closure ratio. This eventually causes growth to plateau
						unless foundries are periodically recalibrated.
					</p>
				</div>
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Supply Rate Constraint</p>
					<p class="text-star-dim text-xs">
						Even with high closure, growth can be bottlenecked by the rate at which
						vitamin components are delivered. This models real supply chain limits
						from Earth or ISRU operations.
					</p>
				</div>
			</div>
			<p class="text-star-faint mt-3">
				Monte Carlo variation applies stochastic perturbations to closure ratio (+/-2%),
				cycle time (+/-20%), degradation rate (+/-50%), and vitamin supply (+/-10%) to
				model real-world manufacturing uncertainty.
			</p>
		</div>
	</div>
</div>
