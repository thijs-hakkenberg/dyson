<script lang="ts">
	import type {
		FleetConfig,
		FleetSimulationOutput,
		FleetComparisonResult,
		FleetProgress
	} from '$lib/services/simulation/fleet-logistics';
	import {
		DEFAULT_FLEET_CONFIG,
		runFleetMonteCarlo,
		runFleetComparison,
		generateComparisonConfigs
	} from '$lib/services/simulation/fleet-logistics';

	import FleetControls from './FleetControls.svelte';
	import FleetResults from './FleetResults.svelte';
	import ThroughputChart from './ThroughputChart.svelte';

	// State
	let config: FleetConfig = $state({ ...DEFAULT_FLEET_CONFIG });
	let output: FleetSimulationOutput | null = $state(null);
	let comparison: FleetComparisonResult | null = $state(null);
	let progress: FleetProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('comparison');

	// Handle config changes
	function handleConfigChange(newConfig: FleetConfig) {
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
			output = await runFleetMonteCarlo(config, 100, (p) => {
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
			const baseConfig = {
				missionDurationYears: config.missionDurationYears,
				annualFailureRate: config.annualFailureRate,
				budgetDollars: config.budgetDollars
			};
			const configs = generateComparisonConfigs(baseConfig);

			comparison = await runFleetComparison(configs, 50, (p) => {
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

	// Run appropriate simulation based on mode
	function runSimulation() {
		if (mode === 'single') {
			runSingleSimulation();
		} else {
			runComparisonSimulation();
		}
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">
			Fleet Size vs Vehicle Capacity Simulator
		</h1>
		<p class="text-star-dim">
			Monte Carlo discrete event simulation to compare fleet configurations. Analyze the trade-off
			between fewer large vehicles (8×250t) vs more smaller vehicles (20×100t) for asteroid mining
			logistics.
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
			Single Configuration
		</button>
		<button
			onclick={() => (mode = 'comparison')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'comparison'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Compare Configurations
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
			<FleetControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Mode Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">
					{mode === 'single' ? 'Single Config Mode' : 'Comparison Mode'}
				</h4>
				<p class="text-xs text-star-dim">
					{#if mode === 'single'}
						Tests your selected configuration with {config.vehicleCount} vehicles ×
						{(config.payloadCapacityKg / 1000).toFixed(0)}t capacity.
					{:else}
						Compares 6 configurations ranging from 5×300t to 25×80t while keeping mission
						duration, failure rate, and budget constant.
					{/if}
				</p>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			{#if mode === 'comparison'}
				<ThroughputChart {comparison} />
			{/if}

			<FleetResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-2">
			<p>
				This discrete event simulation models the complete logistics cycle of asteroid mining
				transport vehicles: loading at the asteroid, transit to Earth orbit, unloading at the
				processing facility, and return transit.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Transit times scale with payload mass (heavier = slower trajectories)</li>
				<li>Empty return trips are faster than loaded outbound trips</li>
				<li>Vehicle failures follow exponential distribution based on annual failure rate</li>
				<li>Loading/unloading rates model realistic autonomous operations</li>
			</ul>
			<p class="text-star-faint">
				Key trade-off: Larger vehicles have higher throughput per vehicle but fewer total trips;
				smaller vehicles provide redundancy but increase operational complexity.
			</p>
		</div>
	</div>
</div>
