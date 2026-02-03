<script lang="ts">
	import type {
		ISRUEconomicsConfig,
		ISRUEconomicsOutput,
		ISRUEconomicsComparisonResult,
		ISRUEconomicsProgress
	} from '$lib/services/simulation/isru-economics';
	import {
		DEFAULT_ISRU_ECONOMICS_CONFIG,
		runISRUEconomicsMonteCarlo,
		runISRUEconomicsComparison,
		generateStandardScenarios
	} from '$lib/services/simulation/isru-economics';

	import ISRUControls from './ISRUControls.svelte';
	import ISRUResults from './ISRUResults.svelte';
	import CostCurveChart from './CostCurveChart.svelte';

	// State
	let config: ISRUEconomicsConfig = $state({ ...DEFAULT_ISRU_ECONOMICS_CONFIG });
	let output: ISRUEconomicsOutput | null = $state(null);
	let comparison: ISRUEconomicsComparisonResult | null = $state(null);
	let progress: ISRUEconomicsProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('single');

	// Handle config changes
	function handleConfigChange(newConfig: ISRUEconomicsConfig) {
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
			output = await runISRUEconomicsMonteCarlo(
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
			const scenarios = generateStandardScenarios(config);
			comparison = await runISRUEconomicsComparison(scenarios, 50, (p) => {
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
			ISRU Manufacturing Transition Point Simulator
		</h1>
		<p class="text-star-dim">
			Monte Carlo simulation comparing in-space resource utilization (ISRU) manufacturing vs
			Earth-based manufacturing with launch costs. Determines the deployment scale at which
			ISRU becomes more economical.
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
			Compare Scenarios
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
			<ISRUControls
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
						Tests your selected configuration with Monte Carlo sampling of uncertain
						parameters (launch cost, ISRU capital cost, learning rates).
					{:else}
						Compares Conservative, Baseline, Optimistic, and High Volume scenarios
						to understand sensitivity to key assumptions.
					{/if}
				</p>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			<CostCurveChart {output} {comparison} />
			<ISRUResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose-space text-sm space-y-2">
			<p>
				This simulation models the economic crossover point between Earth-based manufacturing
				with launch to space versus in-situ resource utilization (ISRU) manufacturing. It
				addresses research question RQ-1-12: At what scale does in-space manufacturing become
				more economical?
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Earth costs include manufacturing with learning curve effects plus launch to deep space</li>
				<li>ISRU costs include high initial capital investment plus operational costs per unit</li>
				<li>Learning curves reduce per-unit costs as cumulative production increases</li>
				<li>Monte Carlo sampling captures uncertainty in launch costs and ISRU capital requirements</li>
			</ul>
			<p class="text-star-faint">
				Key trade-off: ISRU requires significant upfront investment but avoids ongoing launch costs;
				Earth manufacturing is proven but launch costs dominate at scale.
			</p>
		</div>
	</div>

	<!-- Key Assumptions -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Key Assumptions</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-white font-semibold">Earth Manufacturing</p>
				<ul class="list-disc list-inside text-star-dim mt-2 space-y-1">
					<li>Fixed annual production capacity</li>
					<li>Learning curve: 80-90% (cost per doubling)</li>
					<li>Launch cost: $500-5000/kg to deep space</li>
				</ul>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-white font-semibold">ISRU Manufacturing</p>
				<ul class="list-disc list-inside text-star-dim mt-2 space-y-1">
					<li>Seed factory capital: $10B-200B</li>
					<li>Ramp-up period: 1-15 years</li>
					<li>Learning curve: typically slower than Earth</li>
				</ul>
			</div>
		</div>
	</div>
</div>
