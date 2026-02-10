<script lang="ts">
	import type {
		ExtractionConfig,
		ExtractionResult,
		ExtractionProgress,
		ExtractionComparisonResult
	} from '$lib/services/simulation/solar-mass-extraction';
	import {
		DEFAULT_EXTRACTION_CONFIG,
		runExtractionMonteCarlo,
		runExtractionComparison,
		generateActivityConfigs,
		generateEfficiencyConfigs
	} from '$lib/services/simulation/solar-mass-extraction';

	import ExtractionControls from './ExtractionControls.svelte';
	import ExtractionResults from './ExtractionResults.svelte';
	import ExtractionChart from './ExtractionChart.svelte';

	// State
	let config: ExtractionConfig = $state({ ...DEFAULT_EXTRACTION_CONFIG });
	let output: ExtractionResult | null = $state(null);
	let comparisonOutput: ExtractionComparisonResult | null = $state(null);
	let progress: ExtractionProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'sweep' | 'compare' = $state('sweep');
	let compareBy: 'activity' | 'efficiency' = $state('activity');

	function handleConfigChange(newConfig: ExtractionConfig) {
		config = newConfig;
	}

	async function runSimulation() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;

		try {
			if (mode === 'sweep') {
				output = await runExtractionMonteCarlo(config, (p) => {
					progress = p;
				});
				comparisonOutput = null;
			} else {
				const configs =
					compareBy === 'activity'
						? generateActivityConfigs(config)
						: generateEfficiencyConfigs(config);

				comparisonOutput = await runExtractionComparison(configs, (p) => {
					progress = p;
				});
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

	function riskColor(risk: string): string {
		switch (risk) {
			case 'safe': return 'text-green-400';
			case 'caution': return 'text-solar-gold';
			case 'danger': return 'text-orange-400';
			case 'critical': return 'text-sun-red';
			default: return 'text-star-dim';
		}
	}

	function formatRate(kgs: number): string {
		if (kgs === 0) return '0';
		const exp = Math.floor(Math.log10(Math.abs(kgs)));
		const mantissa = kgs / Math.pow(10, exp);
		return mantissa.toFixed(1) + ' x 10^' + exp;
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">
			Solar Mass Extraction Rate Simulator
		</h1>
		<p class="text-star-dim">
			Model solar mass extraction rate limits, stellar response, and stability boundaries
			for Caplan engine operations. Explore the trade-off between extraction rate, energy
			efficiency, and solar stability.
		</p>
	</div>

	<!-- Mode Toggle -->
	<div class="flex justify-center gap-2">
		<button
			onclick={() => { mode = 'sweep'; }}
			class="px-4 py-2 text-sm rounded transition-colors {mode === 'sweep'
				? 'bg-cosmic-cyan/20 border border-cosmic-cyan text-cosmic-cyan'
				: 'bg-space-600 border border-space-500 text-star-dim hover:bg-space-500'}"
		>
			Rate Sweep
		</button>
		<button
			onclick={() => { mode = 'compare'; }}
			class="px-4 py-2 text-sm rounded transition-colors {mode === 'compare'
				? 'bg-cosmic-cyan/20 border border-cosmic-cyan text-cosmic-cyan'
				: 'bg-space-600 border border-space-500 text-star-dim hover:bg-space-500'}"
		>
			Activity Comparison
		</button>
	</div>

	<!-- Compare By selector (only in compare mode) -->
	{#if mode === 'compare'}
		<div class="flex justify-center gap-2">
			<button
				onclick={() => { compareBy = 'activity'; }}
				class="px-3 py-1.5 text-xs rounded transition-colors {compareBy === 'activity'
					? 'bg-solar-gold/20 border border-solar-gold text-solar-gold'
					: 'bg-space-600 border border-space-500 text-star-dim hover:bg-space-500'}"
			>
				Vary Solar Activity
			</button>
			<button
				onclick={() => { compareBy = 'efficiency'; }}
				class="px-3 py-1.5 text-xs rounded transition-colors {compareBy === 'efficiency'
					? 'bg-solar-gold/20 border border-solar-gold text-solar-gold'
					: 'bg-space-600 border border-space-500 text-star-dim hover:bg-space-500'}"
			>
				Vary Lifting Efficiency
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
			<ExtractionControls
				{config}
				disabled={isRunning}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Physical Context -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">Solar Mass Lifting</h4>
				<div class="space-y-2 text-xs text-star-dim">
					<p>
						Concentrated energy beams heat chromospheric gas, creating buoyant plumes
						that lift material above the Sun's escape velocity (617.7 km/s).
					</p>
					<p>
						The natural solar wind already ejects ~2 x 10^9 kg/s. Artificial extraction
						must not destabilize the solar convective zone.
					</p>
					<p class="text-star-faint">
						Extraction exceeding 1% of solar luminosity causes significant perturbation.
						Above 10% risks catastrophic instability.
					</p>
				</div>
			</div>
		</div>

		<!-- Right Column: Chart + Results -->
		<div class="lg:col-span-2 space-y-6">
			<ExtractionChart {output} />
			<ExtractionResults {output} {progress} {isRunning} />
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
							<th class="pb-2 pr-4">
								{compareBy === 'activity' ? 'Solar Activity' : 'Efficiency'}
							</th>
							<th class="pb-2 px-4">Risk Level</th>
							<th class="pb-2 px-4">Stability</th>
							<th class="pb-2 px-4">Max Feasible Rate</th>
							<th class="pb-2 px-4">Luminosity Change</th>
						</tr>
					</thead>
					<tbody>
						{#each comparisonOutput.results as result, i}
							{@const isBest = i === comparisonOutput.bestFeasibleIndex}
							<tr class="border-b border-space-700 {isBest ? 'bg-cosmic-cyan/5' : ''}">
								<td class="py-2 pr-4">
									<span class="{isBest ? 'text-cosmic-cyan font-semibold' : 'text-star-white'}">
										{compareBy === 'activity'
											? result.config.solarActivity
											: (result.config.liftingEfficiency * 100).toFixed(0) + '%'}
									</span>
									{#if isBest}
										<span class="ml-2 px-1.5 py-0.5 text-xs bg-cosmic-cyan text-space-900 rounded">
											BEST
										</span>
									{/if}
								</td>
								<td class="py-2 px-4">
									<span class="{riskColor(result.riskLevel)} uppercase font-semibold text-xs">
										{result.riskLevel}
									</span>
								</td>
								<td class="py-2 px-4 text-star-dim">
									{(result.stabilityMargin.mean * 100).toFixed(2)}%
								</td>
								<td class="py-2 px-4 text-star-dim">
									{formatRate(result.maxFeasibleRate.mean)} kg/s
								</td>
								<td class="py-2 px-4 text-star-dim">
									{(result.luminosityPerturbation.mean * 100).toFixed(6)}%
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
				This simulator models solar mass extraction via concentrated energy beams heating
				chromospheric gas to produce buoyant plumes exceeding escape velocity.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li>
					<strong>Plume Velocity:</strong> v = sqrt(2 * P_beam / (rho * A_beam)), where rho is
					chromospheric density (~10^-10 to 10^-9 kg/m^3 depending on solar activity).
				</li>
				<li>
					<strong>Lifting Efficiency:</strong> eta = (mdot * v_escape^2 / 2) / P_beam.
					Typical range: 1-10% (most energy goes to heating, not lifting).
				</li>
				<li>
					<strong>Stability Margin:</strong> margin = 1 - P_total / L_sun. Critical threshold
					at 1% (significant perturbation) and 10% (potential instability).
				</li>
				<li>
					<strong>Luminosity Perturbation:</strong> delta_L/L ~ 3.5 * delta_M/M, using the
					main-sequence mass-luminosity relation L ~ M^3.5.
				</li>
				<li>
					<strong>Monte Carlo:</strong> Stochastic variation in efficiency (+/-30%) and solar
					activity conditions across {DEFAULT_EXTRACTION_CONFIG.iterations} iterations.
				</li>
			</ul>
			<p class="text-star-faint">
				The simulator can use pre-computed response surfaces from offline 1D radial
				MHD-lite calculations when available, falling back to the analytical energy
				balance model.
			</p>
		</div>
	</div>
</div>
