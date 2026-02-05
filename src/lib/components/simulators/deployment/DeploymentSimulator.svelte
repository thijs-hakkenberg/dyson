<script lang="ts">
	import type {
		DeploymentConfig,
		DeploymentOutput,
		DeploymentComparisonResult,
		DeploymentProgress
	} from '$lib/services/simulation/deployment-reliability';
	import {
		DEFAULT_DEPLOYMENT_CONFIG,
		runDeploymentMonteCarlo,
		runDeploymentComparison,
		generateMechanismComparisonConfigs
	} from '$lib/services/simulation/deployment-reliability';

	import DeploymentControls from './DeploymentControls.svelte';
	import DeploymentResults from './DeploymentResults.svelte';
	import SuccessRateChart from './SuccessRateChart.svelte';

	// State
	let config: DeploymentConfig = $state({ ...DEFAULT_DEPLOYMENT_CONFIG });
	let output: DeploymentOutput | null = $state(null);
	let comparison: DeploymentComparisonResult | null = $state(null);
	let progress: DeploymentProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('comparison');

	// Handle config changes
	function handleConfigChange(newConfig: DeploymentConfig) {
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
			output = await runDeploymentMonteCarlo(config, 100, (p) => {
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
				membraneArea: config.membraneArea,
				minTemperature: config.minTemperature,
				maxTemperature: config.maxTemperature,
				deploymentSpeed: config.deploymentSpeed,
				maxAttempts: config.maxAttempts,
				membraneThickness: config.membraneThickness,
				orbitalDistance: config.orbitalDistance,
				thermalPreconditioning: config.thermalPreconditioning,
				iterations: config.iterations,
				seed: config.seed
			};
			const configs = generateMechanismComparisonConfigs(baseConfig);

			comparison = await runDeploymentComparison(configs, 50, (p) => {
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
	let tempRange = $derived(config.maxTemperature - config.minTemperature);
	let thermalSeverity = $derived.by(() => {
		if (tempRange > 200) return 'Extreme';
		if (tempRange > 100) return 'Severe';
		if (tempRange > 50) return 'Moderate';
		return 'Mild';
	});
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">Deployment Reliability Simulator</h1>
		<p class="text-star-dim">
			Monte Carlo simulation for membrane/sail deployment success rates at scale.
			Models deployment mechanisms, failure modes, thermal effects, and scaling
			for the Dyson swarm construction.
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
			Single Mechanism
		</button>
		<button
			onclick={() => (mode = 'comparison')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'comparison'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Compare Mechanisms
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
			<DeploymentControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Mode Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">
					{mode === 'single' ? 'Single Mechanism Mode' : 'Mechanism Comparison Mode'}
				</h4>
				<p class="text-xs text-star-dim">
					{#if mode === 'single'}
						Tests {config.deploymentMechanism} deployment for {config.membraneArea} m&sup2;
						membrane with {config.maxAttempts} attempt(s) allowed.
					{:else}
						Compares all 5 deployment mechanisms (Inflatable, Motor-driven, Centrifugal,
						Shape-memory, Hybrid) for {config.membraneArea} m&sup2; membranes.
					{/if}
				</p>
			</div>

			<!-- Environment Summary -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-3">Environment Summary</h4>
				<div class="space-y-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-dim">Temperature Range</span>
						<span class="text-star-white font-mono">{tempRange}&deg;C</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Thermal Severity</span>
						<span class="text-star-white font-mono">{thermalSeverity}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Orbital Distance</span>
						<span class="text-star-white font-mono">{config.orbitalDistance} AU</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Membrane Thickness</span>
						<span class="text-star-white font-mono">{config.membraneThickness} um</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			{#if mode === 'comparison'}
				<SuccessRateChart {comparison} />
			{/if}

			<DeploymentResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Research Questions Context -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Research Questions Addressed</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-cosmic-cyan font-semibold mb-1">RQ-1-5</p>
				<p class="text-star-dim">Deployment mechanisms for collector sails</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-solar-gold font-semibold mb-1">RQ-1-7</p>
				<p class="text-star-dim">Thermal effects on deployment</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-sun-red font-semibold mb-1">RQ-2-5</p>
				<p class="text-star-dim">Scaling deployment to thousands of units</p>
			</div>
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose-space text-sm space-y-2">
			<p>
				This Monte Carlo simulation models membrane deployment reliability for large-scale
				solar collector structures, accounting for multiple failure mechanisms and
				deployment conditions.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Larger membrane areas increase deployment complexity and failure probability</li>
				<li>Temperature extremes affect material properties and mechanism behavior</li>
				<li>Different deployment mechanisms have varying reliability vs. speed trade-offs</li>
				<li>Multiple deployment attempts can improve overall success rate</li>
				<li>Thermal preconditioning reduces deployment stress failures</li>
			</ul>
			<p class="text-star-faint">
				Key trade-off: Faster deployment reduces mission time but increases failure probability.
				Different mechanisms excel in different environmental conditions.
			</p>
		</div>
	</div>
</div>
