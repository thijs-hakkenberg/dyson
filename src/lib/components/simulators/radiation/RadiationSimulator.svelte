<script lang="ts">
	import type {
		RadiationDegradationConfig,
		RadiationDegradationOutput,
		RadiationDegradationComparisonResult,
		RadiationDegradationProgress
	} from '$lib/services/simulation/radiation-degradation';
	import {
		DEFAULT_RADIATION_CONFIG,
		runRadiationDegradationMonteCarlo,
		runRadiationDegradationComparison,
		generateTechnologyComparisonConfigs,
		solarFluxAtDistance
	} from '$lib/services/simulation/radiation-degradation';

	import RadiationControls from './RadiationControls.svelte';
	import RadiationResults from './RadiationResults.svelte';
	import DegradationChart from './DegradationChart.svelte';

	// State
	let config: RadiationDegradationConfig = $state({ ...DEFAULT_RADIATION_CONFIG });
	let output: RadiationDegradationOutput | null = $state(null);
	let comparison: RadiationDegradationComparisonResult | null = $state(null);
	let progress: RadiationDegradationProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('comparison');

	// Handle config changes
	function handleConfigChange(newConfig: RadiationDegradationConfig) {
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
			output = await runRadiationDegradationMonteCarlo(config, 100, (p) => {
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
				orbitalDistance: config.orbitalDistance,
				shieldingMass: config.shieldingMass,
				missionDuration: config.missionDuration,
				solarProtonEventRate: config.solarProtonEventRate,
				temperatureCycling: config.temperatureCycling,
				iterations: config.iterations,
				seed: config.seed
			};
			const configs = generateTechnologyComparisonConfigs(baseConfig);

			comparison = await runRadiationDegradationComparison(configs, 50, (p) => {
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

	// Derived values for display
	let solarFlux = $derived(solarFluxAtDistance(config.orbitalDistance).toFixed(0));
	let radiationMultiplier = $derived(
		(1 / Math.pow(config.orbitalDistance, 2.3)).toFixed(1)
	);
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">Radiation Degradation Simulator</h1>
		<p class="text-star-dim">
			Monte Carlo simulation for PV cell degradation in the near-Sun environment.
			Models radiation damage, solar proton events, thermal cycling, and shielding effectiveness
			for different photovoltaic technologies.
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
			Single Technology
		</button>
		<button
			onclick={() => (mode = 'comparison')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'comparison'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Compare Technologies
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
			<RadiationControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Mode Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">
					{mode === 'single' ? 'Single Technology Mode' : 'Technology Comparison Mode'}
				</h4>
				<p class="text-xs text-star-dim">
					{#if mode === 'single'}
						Tests {config.pvTechnology} PV technology at {config.orbitalDistance} AU
						with {config.shieldingMass} g/m&sup2; shielding over {config.missionDuration} years.
					{:else}
						Compares all 5 PV technologies (Perovskite, CdTe, III-V, Silicon, Hybrid)
						at {config.orbitalDistance} AU to identify optimal choice for radiation resistance.
					{/if}
				</p>
			</div>

			<!-- Environment Summary -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-3">Environment Summary</h4>
				<div class="space-y-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-dim">Solar Flux</span>
						<span class="text-star-white font-mono">{solarFlux} W/m&sup2;</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Radiation Intensity</span>
						<span class="text-star-white font-mono">{radiationMultiplier}x Earth</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Shielding Effectiveness</span>
						<span class="text-star-white font-mono">
							{(Math.exp(-0.693 * config.shieldingMass / 10) * 100).toFixed(0)}% transmitted
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			{#if mode === 'comparison'}
				<DegradationChart {comparison} />
			{/if}

			<RadiationResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Research Questions Context -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Research Questions Addressed</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-cosmic-cyan font-semibold mb-1">RQ-1-1</p>
				<p class="text-star-dim">PV technology selection for radiation environment</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-solar-gold font-semibold mb-1">RQ-0-25</p>
				<p class="text-star-dim">Thin-film PV viability in Phase 0 demonstrator</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-sun-red font-semibold mb-1">RQ-2-2</p>
				<p class="text-star-dim">PV degradation in Phase 2 swarm expansion</p>
			</div>
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-2">
			<p>
				This Monte Carlo simulation models PV cell degradation in the harsh near-Sun environment,
				accounting for multiple damage mechanisms and technology-specific characteristics.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Solar proton flux scales as ~1/r^2.3 (more aggressive than inverse square)</li>
				<li>Shielding provides exponential attenuation (~50% per 10 g/m^2)</li>
				<li>Solar proton events cause cumulative damage with Poisson-distributed occurrence</li>
				<li>Thermal cycling at closer orbits causes additional fatigue damage</li>
				<li>Some technologies (perovskite) exhibit self-annealing behavior</li>
			</ul>
			<p class="text-star-faint">
				Key trade-off: Higher shielding mass increases launch cost but extends operational lifetime.
				Different PV technologies offer varying radiation tolerance vs. efficiency trade-offs.
			</p>
		</div>
	</div>
</div>
