<script lang="ts">
	import type { SimulationConfig, SimulationOutput, SimulationProgress } from '$lib/services/simulation';
	import { DEFAULT_CONFIG, createSimulationRunner } from '$lib/services/simulation';

	import SimulationControls from './SimulationControls.svelte';
	import CoverageChart from './CoverageChart.svelte';
	import SimulationResults from './SimulationResults.svelte';
	import OrbitalVisualization from './OrbitalVisualization.svelte';

	// State
	let config: SimulationConfig = $state({ ...DEFAULT_CONFIG });
	let output: SimulationOutput | null = $state(null);
	let progress: SimulationProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);

	// Simulation runner
	let runner = createSimulationRunner();

	// Handle config changes
	function handleConfigChange(newConfig: SimulationConfig) {
		config = newConfig;
	}

	// Run simulation
	async function runSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;

		try {
			output = await runner.run(config, (p) => {
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

	// Cleanup on unmount
	$effect(() => {
		return () => {
			runner.dispose();
		};
	});
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">
			NEA Constellation Coverage Simulator
		</h1>
		<p class="text-star-dim">
			Monte Carlo simulation to determine optimal constellation size for NEA survey coverage.
			Adjust parameters below and run the simulation to see coverage curves and key findings.
		</p>
	</div>

	<!-- Error display -->
	{#if error}
		<div class="max-w-3xl mx-auto p-4 rounded-lg bg-sun-red/20 border border-sun-red/50 text-sun-red">
			<div class="flex items-center gap-2">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span>{error}</span>
			</div>
		</div>
	{/if}

	<!-- Main Grid -->
	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Left Column: Controls -->
		<div class="lg:col-span-1 space-y-6">
			<SimulationControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<OrbitalVisualization
				neaCount={300}
				highlightReachable={true}
				maxDeltaV={config.propulsionType === 'electric' ? 12 : config.propulsionType === 'hybrid' ? 10 : 6}
			/>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			<CoverageChart
				results={output?.results ?? []}
				analysis={output?.analysis ?? null}
			/>

			<SimulationResults
				{output}
				{progress}
				{isRunning}
			/>
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose-space text-sm space-y-2">
			<p>
				This Monte Carlo simulation generates synthetic NEA populations based on known orbital
				distributions and applies a greedy target assignment algorithm to estimate survey coverage.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>NEAs are prioritized by mining value (high-value M/X-type asteroids first)</li>
				<li>Satellites are assigned targets based on lowest delta-V cost</li>
				<li>Annual failure rates follow Bernoulli distribution</li>
				<li>Delta-V requirements use simplified Hohmann transfer approximations</li>
			</ul>
			<p class="text-star-faint">
				Results should be interpreted as relative comparisons between constellation sizes,
				not absolute predictions of real-world performance.
			</p>
		</div>
	</div>
</div>
