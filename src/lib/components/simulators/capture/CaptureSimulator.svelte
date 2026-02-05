<script lang="ts">
	import type {
		CaptureConfig,
		CaptureOutput,
		MethodComparisonResult,
		CaptureProgress,
		CaptureMethod
	} from '$lib/services/simulation/capture';
	import {
		DEFAULT_CAPTURE_CONFIG,
		runCaptureMonteCarlo,
		runCaptureMethodComparison
	} from '$lib/services/simulation/capture';

	import CaptureControls from './CaptureControls.svelte';
	import CaptureResults from './CaptureResults.svelte';
	import MethodComparisonChart from './MethodComparisonChart.svelte';

	// State
	let config: CaptureConfig = $state({ ...DEFAULT_CAPTURE_CONFIG });
	let output: CaptureOutput | null = $state(null);
	let comparison: MethodComparisonResult | null = $state(null);
	let progress: CaptureProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'single' | 'comparison' = $state('comparison');

	// Handle config changes
	function handleConfigChange(newConfig: CaptureConfig) {
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
			output = await runCaptureMonteCarlo(config, 100, (p) => {
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
			const methods: CaptureMethod[] = ['magnetic', 'mechanical', 'net', 'foam', 'tether'];
			const baseConfig = {
				payloadMassKg: config.payloadMassKg,
				arrivalVelocityMs: config.arrivalVelocityMs,
				targetAccuracyM: config.targetAccuracyM,
				approachAngleVarianceDeg: config.approachAngleVarianceDeg,
				timingAccuracyMs: config.timingAccuracyMs,
				structuralRating: config.structuralRating,
				operatingTemperature: config.operatingTemperature,
				redundantSystems: config.redundantSystems,
				iterations: config.iterations,
				seed: config.seed
			};

			comparison = await runCaptureMethodComparison(methods, baseConfig, 50, (p) => {
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
	let kineticEnergy = $derived(0.5 * config.payloadMassKg * config.arrivalVelocityMs * config.arrivalVelocityMs);
	let kineticEnergyFormatted = $derived.by(() => {
		if (kineticEnergy > 1e6) return `${(kineticEnergy / 1e6).toFixed(2)} MJ`;
		if (kineticEnergy > 1e3) return `${(kineticEnergy / 1e3).toFixed(1)} kJ`;
		return `${kineticEnergy.toFixed(0)} J`;
	});
	let velocitySeverity = $derived.by(() => {
		if (config.arrivalVelocityMs > 300) return 'Very High';
		if (config.arrivalVelocityMs > 200) return 'High';
		if (config.arrivalVelocityMs > 100) return 'Moderate';
		return 'Low';
	});
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">Capture System Simulator</h1>
		<p class="text-star-dim">
			Monte Carlo simulation for payload capture system options modeling mass driver
			projectiles from asteroids/Moon. Evaluates magnetic, mechanical, net, foam, and
			tether capture mechanisms.
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
			Single Method
		</button>
		<button
			onclick={() => (mode = 'comparison')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'comparison'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Compare Methods
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
			<CaptureControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Mode Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">
					{mode === 'single' ? 'Single Method Mode' : 'Method Comparison Mode'}
				</h4>
				<p class="text-xs text-star-dim">
					{#if mode === 'single'}
						Tests {config.captureMethod} capture for {config.payloadMassKg} kg payload
						at {config.arrivalVelocityMs} m/s.
					{:else}
						Compares all 5 capture methods (Magnetic, Mechanical, Net, Foam, Tether)
						for {config.payloadMassKg} kg payloads at {config.arrivalVelocityMs} m/s.
					{/if}
				</p>
			</div>

			<!-- Payload Summary -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-3">Payload Profile</h4>
				<div class="space-y-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-dim">Kinetic Energy</span>
						<span class="text-star-white font-mono">{kineticEnergyFormatted}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Velocity Class</span>
						<span class="text-star-white font-mono">{velocitySeverity}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Position Accuracy</span>
						<span class="text-star-white font-mono">{config.targetAccuracyM} m</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-dim">Structural Rating</span>
						<span class="text-star-white font-mono">{config.structuralRating}/5</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			{#if mode === 'comparison'}
				<MethodComparisonChart {comparison} />
			{/if}

			<CaptureResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Research Questions Context -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Research Questions Addressed</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-cosmic-cyan font-semibold mb-1">RQ-1-25</p>
				<p class="text-star-dim">Payload capture mechanisms for mass driver projectiles</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-solar-gold font-semibold mb-1">RQ-1-29</p>
				<p class="text-star-dim">Impact forces and structural requirements for capture systems</p>
			</div>
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Capture Methods Overview</h3>
		<div class="prose-space text-sm space-y-3">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Magnetic</p>
					<p class="text-star-dim text-xs">
						Electromagnetic deceleration. Best for high velocities, requires conductive payloads.
					</p>
				</div>
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Mechanical</p>
					<p class="text-star-dim text-xs">
						Arms/clamps mechanism. Reliable at moderate velocities, higher structural stress.
					</p>
				</div>
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Net</p>
					<p class="text-star-dim text-xs">
						Deployment nets. Large capture envelope, forgiving of angle errors.
					</p>
				</div>
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Foam</p>
					<p class="text-star-dim text-xs">
						Impact-absorbing foam. Gentle deceleration, limited velocity range.
					</p>
				</div>
				<div class="p-3 bg-space-700/30 rounded-lg">
					<p class="text-star-white font-semibold mb-1">Tether</p>
					<p class="text-star-dim text-xs">
						Rotating tether capture. Energy-efficient momentum exchange, precise timing required.
					</p>
				</div>
			</div>
			<p class="text-star-faint mt-3">
				Key trade-off: Higher velocity capability vs. structural stress and timing precision.
				Redundant systems significantly improve overall capture reliability.
			</p>
		</div>
	</div>
</div>
