<script lang="ts">
	import type {
		MembraneConfig,
		MembraneOutput,
		MembraneProgress
	} from '$lib/services/simulation/membrane-dynamics';
	import {
		DEFAULT_MEMBRANE_CONFIG,
		runMembraneMonteCarlo,
		loadModalGrid
	} from '$lib/services/simulation/membrane-dynamics';

	import MembraneControls from './MembraneControls.svelte';
	import MembraneResults from './MembraneResults.svelte';
	import MembraneChart from './MembraneChart.svelte';

	// State
	let config: MembraneConfig = $state({ ...DEFAULT_MEMBRANE_CONFIG });
	let output: MembraneOutput | null = $state(null);
	let progress: MembraneProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'stability' | 'sweep' = $state('sweep');
	let gridAvailable: boolean | null = $state(null);

	// Check if pre-computed grid is available on mount
	$effect(() => {
		loadModalGrid().then((grid) => {
			gridAvailable = grid !== null;
		});
	});

	function handleConfigChange(newConfig: MembraneConfig) {
		config = newConfig;
	}

	async function runSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;

		try {
			output = await runMembraneMonteCarlo(config, (p) => {
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
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">Membrane Deployment Dynamics Simulator</h1>
		<p class="text-star-dim">
			Structural stability and flutter boundary analysis for large-scale thin-film membrane
			deployment. Models natural frequencies, spin stabilization, and solar radiation pressure
			forcing to determine safe operating envelopes.
		</p>
	</div>

	<!-- Data Source Indicator -->
	{#if gridAvailable !== null}
		<div class="flex justify-center">
			<div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs {gridAvailable ? 'bg-cosmic-cyan/10 text-cosmic-cyan border border-cosmic-cyan/30' : 'bg-solar-gold/10 text-solar-gold border border-solar-gold/30'}">
				<span class="w-2 h-2 rounded-full {gridAvailable ? 'bg-cosmic-cyan' : 'bg-solar-gold'}"></span>
				{gridAvailable ? 'Pre-computed FE grid available' : 'Using analytical plate theory (FE grid not found)'}
			</div>
		</div>
	{/if}

	<!-- Mode Toggle -->
	<div class="flex justify-center gap-4">
		<button
			onclick={() => (mode = 'stability')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'stability'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Stability Analysis
		</button>
		<button
			onclick={() => (mode = 'sweep')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'sweep'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Diameter Sweep
		</button>
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
			<MembraneControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Mode Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">
					{mode === 'stability' ? 'Stability Analysis' : 'Diameter Sweep Mode'}
				</h4>
				<p class="text-xs text-star-dim">
					{#if mode === 'stability'}
						Analyzes the structural stability of a {config.diameter}m membrane with
						{config.tension} N/m tension at {config.orbitalDistance} AU.
						Monte Carlo runs apply manufacturing variations to tension and density.
					{:else}
						Sweeps diameter from 100-1000m to map the stability boundary.
						Shows minimum tension required for flutter-free operation at each size.
					{/if}
				</p>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			{#if mode === 'sweep'}
				<MembraneChart {output} />
			{/if}

			<MembraneResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Research Question Context -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Research Question Addressed</h3>
		<div class="p-3 bg-space-700/30 rounded-lg">
			<p class="text-cosmic-cyan font-semibold mb-1">RQ-1-7</p>
			<p class="text-star-dim">Large-scale membrane deployment dynamics</p>
			<p class="text-xs text-star-faint mt-2">
				What are the structural stability limits for thin-film membranes at scale?
				How does spin stabilization interact with solar radiation pressure forcing?
				What minimum tension prevents flutter for membranes of 100-1000m diameter?
			</p>
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-2">
			<p>
				This hybrid simulator combines pre-computed finite element modal analysis with
				real-time analytical plate theory for interactive parameter exploration.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>Natural frequencies from Bessel function zeros (circular membrane plate theory)</li>
				<li>Spin stabilization adds centrifugal tension: T_c = sigma * omega^2 * R^2 / 4</li>
				<li>Flutter boundary: SRP forcing vs structural damping capacity</li>
				<li>Monte Carlo applies manufacturing variations (+/-5% tension, +/-3% density)</li>
				<li>Pre-computed FE grid (if available) provides more accurate eigenvalues</li>
			</ul>
			<p class="text-star-faint">
				Key trade-off: larger membranes have lower natural frequencies and are more susceptible
				to flutter, requiring either higher tension or spin stabilization. Spin rate is limited
				by deployment mechanisms and structural fatigue.
			</p>
		</div>
	</div>
</div>
