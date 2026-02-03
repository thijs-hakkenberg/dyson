<script lang="ts">
	import type {
		DepotLogisticsConfig,
		DepotLogisticsSimulationOutput,
		DepotLogisticsComparisonResult,
		DepotLogisticsProgress
	} from '$lib/services/simulation/depot-logistics';
	import {
		DEFAULT_DEPOT_LOGISTICS_CONFIG,
		runDepotLogisticsMonteCarlo,
		runDepotLogisticsComparison,
		generateSpacingComparisonConfigs
	} from '$lib/services/simulation/depot-logistics';

	import DepotControls from './DepotControls.svelte';
	import DepotResults from './DepotResults.svelte';
	import ResponseTimeChart from './ResponseTimeChart.svelte';

	// State
	let config: DepotLogisticsConfig = $state({ ...DEFAULT_DEPOT_LOGISTICS_CONFIG });
	let output: DepotLogisticsSimulationOutput | null = $state(null);
	let comparison: DepotLogisticsComparisonResult | null = $state(null);
	let progress: DepotLogisticsProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('comparison');

	// Handle config changes
	function handleConfigChange(newConfig: DepotLogisticsConfig) {
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
			output = await runDepotLogisticsMonteCarlo(config, 100, (p) => {
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
			// Create base config without depot spacing (will be varied in comparison)
			const baseConfig = {
				inspectorCount: config.inspectorCount,
				servicerCount: config.servicerCount,
				swarmSizeMillions: config.swarmSizeMillions,
				failureRatePerYear: config.failureRatePerYear,
				inspectorRangeKm: config.inspectorRangeKm,
				servicerRangeKm: config.servicerRangeKm,
				propellantBudgetKg: config.propellantBudgetKg,
				ispSeconds: config.ispSeconds,
				simulationDays: config.simulationDays
			};
			const configs = generateSpacingComparisonConfigs(baseConfig);

			comparison = await runDepotLogisticsComparison(configs, 30, (p) => {
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
			Depot Spacing Logistics Simulator
		</h1>
		<p class="text-star-dim">
			Monte Carlo discrete event simulation for Dyson swarm depot logistics. Analyze
			optimal depot spacing, fleet utilization, and mean time to repair for maintenance
			drone operations servicing millions of collector units.
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
			Compare Spacing
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
			<DepotControls
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
						Tests your selected configuration with {(config.depotSpacingKm / 1000).toFixed(0)}k km depot spacing,
						{(config.inspectorCount / 1000).toFixed(0)}k inspectors, and
						{(config.servicerCount / 1000).toFixed(1)}k servicers.
					{:else}
						Compares 7 depot spacing configurations from 50k to 500k km while keeping
						swarm size, failure rate, and fleet size constant.
					{/if}
				</p>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			{#if mode === 'comparison'}
				<ResponseTimeChart {comparison} />
			{/if}

			<DepotResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose-space text-sm space-y-2">
			<p>
				This discrete event simulation models the complete maintenance cycle for Dyson swarm
				collector units: failure detection, inspector dispatch, fault diagnosis, servicer dispatch,
				and repair completion.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Failures follow exponential distribution based on annual failure rate</li>
				<li>Inspector drones patrol assigned regions and detect collector faults</li>
				<li>Servicer drones perform repairs with propellant-constrained mission profiles</li>
				<li>Transit times calculated using Hohmann transfer approximations</li>
				<li>Depots distributed in spherical shell around swarm for coverage</li>
			</ul>
			<p class="text-star-faint">
				Key trade-off: Denser depot spacing reduces response time but increases infrastructure
				cost and complexity. Optimal spacing balances MTTR against deployment cost.
			</p>
		</div>
	</div>
</div>
