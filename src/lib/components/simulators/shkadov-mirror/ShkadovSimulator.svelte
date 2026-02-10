<script lang="ts">
	import type {
		ShkadovConfig,
		ShkadovResult,
		ShkadovProgress,
		ShkadovComparisonResult
	} from '$lib/services/simulation/shkadov-mirror';
	import {
		DEFAULT_SHKADOV_CONFIG,
		runShkadovTradeSweep,
		runShkadovComparison,
		generateArealDensityConfigs,
		generateReflectivityConfigs
	} from '$lib/services/simulation/shkadov-mirror';

	import ShkadovControls from './ShkadovControls.svelte';
	import ShkadovResults from './ShkadovResults.svelte';
	import ShkadovChart from './ShkadovChart.svelte';

	// State
	let config: ShkadovConfig = $state({ ...DEFAULT_SHKADOV_CONFIG });
	let output: ShkadovResult | null = $state(null);
	let comparisonOutput: ShkadovComparisonResult | null = $state(null);
	let progress: ShkadovProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'trade' | 'compare' = $state('trade');
	let compareBy: 'density' | 'reflectivity' = $state('density');

	function handleConfigChange(newConfig: ShkadovConfig) {
		config = newConfig;
	}

	async function runSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;

		try {
			if (mode === 'trade') {
				output = await runShkadovTradeSweep(config, (p) => {
					progress = p;
				});
				comparisonOutput = null;
			} else {
				const configs =
					compareBy === 'density'
						? generateArealDensityConfigs(config)
						: generateReflectivityConfigs(config);

				comparisonOutput = await runShkadovComparison(configs, (p) => {
					progress = p;
				});
				// Use the first result as the primary output for chart display
				output = comparisonOutput.results[0] ?? null;
			}
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
		<h1 class="text-3xl font-bold text-star-white mb-4">
			Shkadov Mirror Standoff Distance Simulator
		</h1>
		<p class="text-star-dim">
			Trade study for Shkadov mirror (stellar engine) placement. Analyze the relationship
			between standoff distance, thrust output, equilibrium temperature, and material feasibility.
		</p>
	</div>

	<!-- Mode Toggle -->
	<div class="flex justify-center gap-2">
		<button
			onclick={() => { mode = 'trade'; }}
			class="px-4 py-2 text-sm rounded transition-colors {mode === 'trade'
				? 'bg-cosmic-cyan/20 border border-cosmic-cyan text-cosmic-cyan'
				: 'bg-space-600 border border-space-500 text-star-dim hover:bg-space-500'}"
		>
			Trade Study
		</button>
		<button
			onclick={() => { mode = 'compare'; }}
			class="px-4 py-2 text-sm rounded transition-colors {mode === 'compare'
				? 'bg-cosmic-cyan/20 border border-cosmic-cyan text-cosmic-cyan'
				: 'bg-space-600 border border-space-500 text-star-dim hover:bg-space-500'}"
		>
			Compare Configs
		</button>
	</div>

	<!-- Compare By selector (only in compare mode) -->
	{#if mode === 'compare'}
		<div class="flex justify-center gap-2">
			<button
				onclick={() => { compareBy = 'density'; }}
				class="px-3 py-1.5 text-xs rounded transition-colors {compareBy === 'density'
					? 'bg-solar-gold/20 border border-solar-gold text-solar-gold'
					: 'bg-space-600 border border-space-500 text-star-dim hover:bg-space-500'}"
			>
				Vary Areal Density
			</button>
			<button
				onclick={() => { compareBy = 'reflectivity'; }}
				class="px-3 py-1.5 text-xs rounded transition-colors {compareBy === 'reflectivity'
					? 'bg-solar-gold/20 border border-solar-gold text-solar-gold'
					: 'bg-space-600 border border-space-500 text-star-dim hover:bg-space-500'}"
			>
				Vary Reflectivity
			</button>
		</div>
	{/if}

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
			<ShkadovControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Physical Context -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">Shkadov Mirror Concept</h4>
				<div class="space-y-2 text-xs text-star-dim">
					<p>
						A Shkadov thruster is a giant parabolic mirror that reflects sunlight
						asymmetrically, producing net thrust on the entire solar system.
					</p>
					<p>
						At the <span class="text-cosmic-cyan">statite limit</span>, radiation pressure
						exactly balances solar gravity, allowing the mirror to hover without propulsion.
					</p>
					<p class="text-star-faint">
						Closer distances yield more thrust but higher temperatures.
						The optimal standoff distance maximizes thrust while staying within
						material thermal limits.
					</p>
				</div>
			</div>
		</div>

		<!-- Right Column: Chart + Results -->
		<div class="lg:col-span-2 space-y-6">
			<ShkadovChart {output} />
			<ShkadovResults {output} {progress} {isRunning} />
		</div>
	</div>

	<!-- Comparison Results Table -->
	{#if comparisonOutput && mode === 'compare'}
		<div class="card-glow p-6">
			<h3 class="text-lg font-bold text-star-white mb-4">Configuration Comparison</h3>
			<div class="overflow-x-auto">
				<table class="w-full text-sm">
					<thead>
						<tr class="text-star-faint text-left border-b border-space-600">
							<th class="pb-2 pr-4">{compareBy === 'density' ? 'Density (kg/m²)' : 'Reflectivity'}</th>
							<th class="pb-2 px-4">Optimal Dist (AU)</th>
							<th class="pb-2 px-4">Max Thrust</th>
							<th class="pb-2 px-4">Temp (K)</th>
							<th class="pb-2 px-4">Mirror Mass</th>
							<th class="pb-2 px-4">Feasible Range</th>
						</tr>
					</thead>
					<tbody>
						{#each comparisonOutput.results as result, i}
							{@const isBestThrust = i === comparisonOutput.analysis.bestThrustIndex}
							{@const feasibleCount = result.tradePoints.filter((p) => p.isThermallyFeasible).length}
							<tr class="border-b border-space-700 {isBestThrust ? 'bg-cosmic-cyan/5' : ''}">
								<td class="py-2 pr-4">
									<span class="{isBestThrust ? 'text-cosmic-cyan font-semibold' : 'text-star-white'}">
										{compareBy === 'density'
											? result.config.arealDensity.toFixed(1)
											: result.config.reflectivity.toFixed(2)}
									</span>
									{#if isBestThrust}
										<span class="ml-2 px-1.5 py-0.5 text-xs bg-cosmic-cyan text-space-900 rounded">
											BEST
										</span>
									{/if}
								</td>
								<td class="py-2 px-4 text-star-dim">{result.optimalDistance.toFixed(2)}</td>
								<td class="py-2 px-4 text-star-dim">
									{#if result.maxFeasibleThrust >= 1e9}
										{(result.maxFeasibleThrust / 1e9).toFixed(1)} GN
									{:else}
										{(result.maxFeasibleThrust / 1e6).toFixed(1)} MN
									{/if}
								</td>
								<td class="py-2 px-4">
									<span class="{result.analysis.optimalTemp > 2000 ? 'text-sun-red' : result.analysis.optimalTemp > 1000 ? 'text-solar-gold' : 'text-star-dim'}">
										{result.analysis.optimalTemp.toFixed(0)}
									</span>
								</td>
								<td class="py-2 px-4 text-star-dim">
									{#if result.analysis.optimalMirrorMass >= 1e12}
										{(result.analysis.optimalMirrorMass / 1e12).toFixed(1)} Tt
									{:else if result.analysis.optimalMirrorMass >= 1e9}
										{(result.analysis.optimalMirrorMass / 1e9).toFixed(1)} Gt
									{:else}
										{(result.analysis.optimalMirrorMass / 1e6).toFixed(1)} Mt
									{/if}
								</td>
								<td class="py-2 px-4">
									<span class="{feasibleCount > 15 ? 'text-cosmic-cyan' : feasibleCount > 8 ? 'text-solar-gold' : 'text-sun-red'}">
										{feasibleCount}/{result.tradePoints.length}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/if}

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Physics Methodology</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-2">
			<p>
				This simulator sweeps the mirror standoff distance from 0.1 to 2.0 AU and evaluates
				the resulting thrust, equilibrium temperature, and material feasibility at each point.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>
					<strong>Thrust:</strong> F = 2 * (L_sun / 4pi*d^2) * A_mirror * reflectivity / c.
					Closer distances give higher solar flux but the mirror area for a given coverage fraction
					is smaller (A = coverage * 4pi*d^2).
				</li>
				<li>
					<strong>Temperature:</strong> Equilibrium via Stefan-Boltzmann law, assuming both-side
					radiation. T = (F_solar / 2*sigma_SB)^(1/4), independent of reflectivity since
					absorptivity = emissivity.
				</li>
				<li>
					<strong>Statite Limit:</strong> Critical areal density sigma_crit = L_sun / (4*pi*G*M_sun*c)
					~ 1.53 g/m^2, independent of distance. Mirrors lighter than this hover freely.
				</li>
				<li>
					<strong>Feasibility:</strong> Material thermal limits determine which distances are
					feasible. Aluminum fails above 933 K, graphene survives up to ~3000 K.
				</li>
			</ul>
			<p class="text-star-faint">
				Note: The thrust scales with coverage fraction but is independent of distance for a fixed
				coverage fraction, since both solar flux and area scale as 1/d^2. Temperature decreases
				with distance, making farther placements thermally easier but requiring more total mirror area.
			</p>
		</div>
	</div>
</div>
