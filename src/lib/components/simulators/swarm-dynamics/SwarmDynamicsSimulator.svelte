<script lang="ts">
	import type {
		SwarmDynamicsConfig,
		SwarmDynamicsSimulationOutput,
		SwarmDynamicsComparisonResult,
		SwarmDynamicsProgress
	} from '$lib/services/simulation/swarm-dynamics';
	import {
		DEFAULT_SWARM_DYNAMICS_CONFIG,
		runSwarmDynamicsMonteCarlo,
		runSwarmDynamicsComparison,
		generateSpacingComparisonConfigs
	} from '$lib/services/simulation/swarm-dynamics';

	import SwarmControls from './SwarmControls.svelte';
	import SwarmResults from './SwarmResults.svelte';
	import CollisionChart from './CollisionChart.svelte';

	// State
	let config: SwarmDynamicsConfig = $state({ ...DEFAULT_SWARM_DYNAMICS_CONFIG });
	let output: SwarmDynamicsSimulationOutput | null = $state(null);
	let comparison: SwarmDynamicsComparisonResult | null = $state(null);
	let progress: SwarmDynamicsProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('comparison');

	// Handle config changes
	function handleConfigChange(newConfig: SwarmDynamicsConfig) {
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
			output = await runSwarmDynamicsMonteCarlo(config, 100, (p) => {
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
				orbitalDistanceAU: config.orbitalDistanceAU,
				collectorAreaM2: config.collectorAreaM2,
				collectorMassKg: config.collectorMassKg,
				swarmSize: config.swarmSize,
				propulsionType: config.propulsionType,
				simulationYears: config.simulationYears,
				reflectivity: config.reflectivity
			};
			const configs = generateSpacingComparisonConfigs(baseConfig);

			comparison = await runSwarmDynamicsComparison(configs, 50, (p) => {
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

	// Derived area-to-mass ratio
	let areaToMassRatio = $derived((config.collectorAreaM2 / config.collectorMassKg).toFixed(1));
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">
			Swarm Dynamics Simulator
		</h1>
		<p class="text-star-dim">
			Monte Carlo simulation for Dyson swarm station-keeping, collision probability, and propulsion
			authority analysis. Investigates the trade-offs between solar radiation pressure (SRP) control
			and active propulsion systems.
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
			Compare Spacings
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
			<SwarmControls
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
						Tests your selected configuration with {config.swarmSize.toLocaleString()} units at
						{config.interUnitSpacingM.toLocaleString()}m spacing using {config.propulsionType} propulsion.
					{:else}
						Compares 7 spacing configurations (100m to 10,000m) while keeping other parameters
						constant. Identifies optimal spacing for collision probability vs control authority.
					{/if}
				</p>
			</div>

			<!-- Key Parameters Summary -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-3">Configuration Summary</h4>
				<div class="space-y-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-dim">Area-to-Mass Ratio</span>
						<span class="text-star-white font-mono">{areaToMassRatio} m&sup2;/kg</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Orbital Velocity</span>
						<span class="text-star-white font-mono">
							{(29.78 / Math.sqrt(config.orbitalDistanceAU)).toFixed(1)} km/s
						</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Solar Flux</span>
						<span class="text-star-white font-mono">
							{(1361 / (config.orbitalDistanceAU * config.orbitalDistanceAU)).toFixed(0)} W/m&sup2;
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			{#if mode === 'comparison'}
				<CollisionChart {comparison} />
			{/if}

			<SwarmResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Research Questions Context -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Research Questions Addressed</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-cosmic-cyan font-semibold mb-1">RQ-1-2</p>
				<p class="text-star-dim">Station-keeping propellant budget for maintaining orbital position</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-solar-gold font-semibold mb-1">RQ-1-6</p>
				<p class="text-star-dim">Collision probability between swarm elements at various spacings</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-sun-red font-semibold mb-1">RQ-1-37</p>
				<p class="text-star-dim">Propulsion authority requirements for swarm control</p>
			</div>
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-2">
			<p>
				This Monte Carlo simulation models the station-keeping dynamics of a Dyson swarm segment,
				accounting for solar radiation pressure, orbital perturbations, and collision risk.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Solar radiation pressure provides propellant-free thrust for attitude and position control</li>
				<li>Orbital perturbations include solar gravity gradient, third-body effects, and differential SRP</li>
				<li>Collision probability uses gas kinetics model with close approach event simulation</li>
				<li>Control authority compares available SRP delta-V to required station-keeping budget</li>
			</ul>
			<p class="text-star-faint">
				Key trade-off: Closer spacing increases collision risk but reduces swarm volume; wider spacing
				improves safety but may exceed SRP control authority for maintaining formation.
			</p>
		</div>
	</div>
</div>
