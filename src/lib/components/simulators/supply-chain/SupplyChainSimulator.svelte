<script lang="ts">
	import type {
		SupplyChainConfig,
		SupplyChainOutput,
		SupplyChainComparisonResult,
		SupplyChainProgress
	} from '$lib/services/simulation/supply-chain';
	import {
		DEFAULT_SUPPLY_CHAIN_CONFIG,
		runSupplyChainMonteCarlo,
		runSupplyChainComparison,
		generateStockpilingScenarios
	} from '$lib/services/simulation/supply-chain';

	import SupplyControls from './SupplyControls.svelte';
	import SupplyResults from './SupplyResults.svelte';
	import SupplyDemandChart from './SupplyDemandChart.svelte';

	// State
	let config: SupplyChainConfig = $state({ ...DEFAULT_SUPPLY_CHAIN_CONFIG });
	let output: SupplyChainOutput | null = $state(null);
	let comparison: SupplyChainComparisonResult | null = $state(null);
	let progress: SupplyChainProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('single');

	// Handle config changes
	function handleConfigChange(newConfig: SupplyChainConfig) {
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
			output = await runSupplyChainMonteCarlo(
				config,
				100,
				(p) => {
					progress = p;
				},
				true // Include run results for chart
			);
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
			const scenarios = generateStockpilingScenarios(config);
			comparison = await runSupplyChainComparison(scenarios, 50, (p) => {
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
			Xenon Supply Chain Constraint Simulator
		</h1>
		<p class="text-star-dim">
			Monte Carlo simulation modeling xenon propellant supply/demand dynamics for Phase 1
			deployment. Analyzes stockpiling strategies and alternative propellant viability when
			global production (~70 tonnes/year) is insufficient for Phase 1 requirements (~150 tonnes).
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
			Compare Strategies
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
			<SupplyControls
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
						Tests your selected configuration with Monte Carlo sampling of supply/demand
						uncertainty. Shows year-by-year balance and constraint risk.
					{:else}
						Compares different stockpiling strategies (3, 5, 7, 10 years) along with
						growth and efficiency scenarios to find optimal approach.
					{/if}
				</p>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			<SupplyDemandChart {output} {comparison} />
			<SupplyResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose-space text-sm space-y-2">
			<p>
				This simulation models the xenon propellant supply chain constraint identified in
				research question RQ-0-20. Global xenon production (~70 tonnes/year) is insufficient
				to meet Phase 1 requirements (~150 tonnes) within a single year, necessitating
				stockpiling and/or alternative propellants.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Monte Carlo sampling captures uncertainty in production rates and demand estimates</li>
				<li>Stockpiling strategy accumulates xenon before Phase 1 deployment begins</li>
				<li>Alternative propellants (krypton, argon) evaluated based on Isp and availability</li>
				<li>Price elasticity models market response to supply/demand imbalances</li>
			</ul>
			<p class="text-star-faint">
				Key trade-off: Longer stockpiling reduces constraint risk but delays Phase 1 start;
				alternative propellants reduce xenon dependency but require thruster requalification.
			</p>
		</div>
	</div>

	<!-- Key Assumptions -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Key Assumptions</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-white font-semibold">Xenon Supply</p>
				<ul class="list-disc list-inside text-star-dim mt-2 space-y-1">
					<li>Global production: ~70 tonnes/year</li>
					<li>Annual growth: 2-5% (air separation expansion)</li>
					<li>Project allocation: 10-50% of global supply</li>
				</ul>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-white font-semibold">Phase 1 Demand</p>
				<ul class="list-disc list-inside text-star-dim mt-2 space-y-1">
					<li>Total requirement: ~150 tonnes</li>
					<li>Deployment period: 10 years</li>
					<li>Learning curve: 10-25% efficiency gain</li>
				</ul>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-white font-semibold">Krypton Alternative</p>
				<ul class="list-disc list-inside text-star-dim mt-2 space-y-1">
					<li>Isp: ~85% of xenon (~2550s)</li>
					<li>Availability: ~200 tonnes/year</li>
					<li>Cost: ~30% of xenon price</li>
				</ul>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-white font-semibold">Argon Alternative</p>
				<ul class="list-disc list-inside text-star-dim mt-2 space-y-1">
					<li>Isp: ~60% of xenon (~1800s)</li>
					<li>Availability: ~500 tonnes/year</li>
					<li>Cost: ~10% of xenon price</li>
				</ul>
			</div>
		</div>
	</div>
</div>
