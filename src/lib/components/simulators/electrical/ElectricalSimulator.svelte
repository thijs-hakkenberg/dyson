<script lang="ts">
	import type {
		ElectricalFaultConfig,
		ElectricalFaultSimulationOutput,
		ElectricalFaultComparisonResult,
		ElectricalFaultProgress
	} from '$lib/services/simulation/electrical-fault';
	import {
		DEFAULT_ELECTRICAL_FAULT_CONFIG,
		runElectricalFaultMonteCarlo,
		runElectricalFaultComparison,
		generateVoltageComparisonConfigs,
		generateOrbitalComparisonConfigs,
		generateMaterialComparisonConfigs,
		calculatePlasmaDensity
	} from '$lib/services/simulation/electrical-fault';

	import ElectricalControls from './ElectricalControls.svelte';
	import ElectricalResults from './ElectricalResults.svelte';
	import ArcProbabilityChart from './ArcProbabilityChart.svelte';

	// State
	let config: ElectricalFaultConfig = $state({ ...DEFAULT_ELECTRICAL_FAULT_CONFIG });
	let output: ElectricalFaultSimulationOutput | null = $state(null);
	let comparison: ElectricalFaultComparisonResult | null = $state(null);
	let progress: ElectricalFaultProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'voltage' | 'orbital' | 'material' = $state('material');

	// Handle config changes
	function handleConfigChange(newConfig: ElectricalFaultConfig) {
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
			output = await runElectricalFaultMonteCarlo(config, 100, (p) => {
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
			let configs: ElectricalFaultConfig[];

			if (mode === 'voltage') {
				configs = generateVoltageComparisonConfigs(config);
			} else if (mode === 'orbital') {
				configs = generateOrbitalComparisonConfigs(config);
			} else {
				configs = generateMaterialComparisonConfigs(config);
			}

			comparison = await runElectricalFaultComparison(configs, 50, (p) => {
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
	let plasmaDensity = $derived(
		(calculatePlasmaDensity(config.orbitalDistance) / 1e6).toFixed(1)
	);
	let radiationMultiplier = $derived(
		(1 / Math.pow(config.orbitalDistance, 2)).toFixed(1)
	);

	// Chart type mapping
	let chartType: 'voltage' | 'orbital' | 'material' = $derived.by(() => {
		if (mode === 'voltage') return 'voltage';
		if (mode === 'orbital') return 'orbital';
		return 'material';
	});
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">Electrical Fault Monte Carlo Simulator</h1>
		<p class="text-star-dim">
			Monte Carlo simulation for high-voltage electrical fault analysis in the solar wind plasma environment.
			Models arc probability, fault propagation, and insulation breakdown for 600V-10kV DC power systems.
		</p>
	</div>

	<!-- Mode Toggle -->
	<div class="flex justify-center gap-2 flex-wrap">
		<button
			onclick={() => (mode = 'single')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'single'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Single Config
		</button>
		<button
			onclick={() => (mode = 'voltage')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'voltage'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Voltage Sweep
		</button>
		<button
			onclick={() => (mode = 'orbital')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'orbital'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Orbital Sweep
		</button>
		<button
			onclick={() => (mode = 'material')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'material'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Material Comparison
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
			<ElectricalControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Mode Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">
					{#if mode === 'single'}
						Single Configuration Mode
					{:else if mode === 'voltage'}
						Voltage Comparison Mode
					{:else if mode === 'orbital'}
						Orbital Distance Mode
					{:else}
						Material Comparison Mode
					{/if}
				</h4>
				<p class="text-xs text-star-dim">
					{#if mode === 'single'}
						Tests arc probability for {config.voltageLevel}V at {config.orbitalDistance} AU
						with {config.insulationMaterial} insulation.
					{:else if mode === 'voltage'}
						Compares arc probability across voltage range (600V-10kV)
						at {config.orbitalDistance} AU.
					{:else if mode === 'orbital'}
						Compares arc probability across orbital distances (0.3-1.0 AU)
						at {config.voltageLevel}V.
					{:else}
						Compares all 4 insulation materials (Kapton, Polyimide, Teflon, Ceramic)
						at {config.voltageLevel}V and {config.orbitalDistance} AU.
					{/if}
				</p>
			</div>

			<!-- Environment Summary -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-3">Plasma Environment</h4>
				<div class="space-y-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-dim">Plasma Density</span>
						<span class="text-star-white font-mono">{plasmaDensity} x10^6 /m^3</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Radiation Intensity</span>
						<span class="text-star-white font-mono">{radiationMultiplier}x (vs 1 AU)</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Response Time</span>
						<span class="text-star-white font-mono">
							{config.detectionResponseTime + config.isolationResponseTime} ms total
						</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			{#if mode !== 'single' && comparison}
				<ArcProbabilityChart {comparison} {chartType} />
			{/if}

			<ElectricalResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Research Questions Context -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Research Questions Addressed</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-cosmic-cyan font-semibold mb-1">RQ-1-4</p>
				<p class="text-star-dim">High-voltage system design in plasma environment</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-solar-gold font-semibold mb-1">RQ-1-8</p>
				<p class="text-star-dim">Insulation and fault protection requirements</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-sun-red font-semibold mb-1">RQ-2-1</p>
				<p class="text-star-dim">Power distribution architecture at scale</p>
			</div>
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose-space text-sm space-y-2">
			<p>
				This Monte Carlo simulation models electrical fault probability in the harsh solar wind
				plasma environment, accounting for multiple failure mechanisms.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Plasma density scales as 1/r^2 from the Sun (higher density = more charging)</li>
				<li>Arc rate follows V^1.5 scaling based on empirical space system data</li>
				<li>Paschen breakdown modeled for vacuum/low-pressure plasma regime</li>
				<li>Insulation lifetime uses inverse power law (n=4) for voltage stress</li>
				<li>Fault propagation depends on system topology and isolation response time</li>
			</ul>
			<p class="text-star-faint">
				Key trade-offs: Higher voltage reduces conductor mass but increases arc risk.
				Ceramic insulation offers best radiation resistance but higher mass/cost.
				Parallel topology provides fault isolation but requires more complex switching.
			</p>
		</div>
	</div>
</div>
