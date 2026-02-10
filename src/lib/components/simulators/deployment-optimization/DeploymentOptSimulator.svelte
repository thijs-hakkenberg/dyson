<script lang="ts">
	import { onMount } from 'svelte';
	import type {
		DeploymentOptConfig,
		DeploymentOptOutput,
		DeploymentOptProgress
	} from '$lib/services/simulation/deployment-optimization';
	import {
		DEFAULT_DEPLOYMENT_OPT_CONFIG,
		runDeploymentOptMonteCarlo,
		runDeploymentScalingAnalysis,
		loadNNWeights,
		isNNAvailable
	} from '$lib/services/simulation/deployment-optimization';

	import DeploymentOptControls from './DeploymentOptControls.svelte';
	import DeploymentOptResults from './DeploymentOptResults.svelte';
	import DeploymentOptChart from './DeploymentOptChart.svelte';

	// State
	let config: DeploymentOptConfig = $state({ ...DEFAULT_DEPLOYMENT_OPT_CONFIG });
	let output: DeploymentOptOutput | null = $state(null);
	let scalingOutputs: DeploymentOptOutput[] | null = $state(null);
	let progress: DeploymentOptProgress | null = $state(null);
	let isRunning = $state(false);
	let error: string | null = $state(null);
	let mode: 'comparison' | 'scaling' = $state('comparison');
	let nnAvailable: boolean | null = $state(null);

	onMount(async () => {
		const weights = await loadNNWeights();
		nnAvailable = weights !== null;
	});

	function handleConfigChange(newConfig: DeploymentOptConfig) {
		config = newConfig;
	}

	async function runStrategyComparison() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		scalingOutputs = null;

		try {
			output = await runDeploymentOptMonteCarlo(config, (p) => {
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

	async function runScalingAnalysis() {
		if (isRunning) return;

		isRunning = true;
		error = null;
		progress = null;
		output = null;

		try {
			const unitCounts = [100, 250, 500, 1000, 2000, 5000];
			scalingOutputs = await runDeploymentScalingAnalysis(config, unitCounts, (p) => {
				progress = p;
			});
			// Also set the first one as the "output" for display
			if (scalingOutputs.length > 0) {
				output = scalingOutputs[scalingOutputs.length - 1];
			}
		} catch (e) {
			error = e instanceof Error ? e.message : 'Scaling analysis failed';
			console.error('Scaling analysis error:', e);
		} finally {
			isRunning = false;
			progress = null;
		}
	}

	function runSimulation() {
		if (mode === 'comparison') {
			runStrategyComparison();
		} else {
			runScalingAnalysis();
		}
	}
</script>

<div class="space-y-8">
	<!-- Header -->
	<div class="text-center max-w-3xl mx-auto">
		<h1 class="text-3xl font-bold text-star-white mb-4">
			ML Trajectory Deployment Optimizer
		</h1>
		<p class="text-star-dim">
			Compare deployment strategies using neural network trajectory estimation for optimal
			swarm deployment sequencing. Evaluates sequential, batch, greedy, and NN-guided
			approaches across Monte Carlo runs.
		</p>
	</div>

	<!-- Mode Toggle -->
	<div class="flex justify-center gap-4">
		<button
			onclick={() => (mode = 'comparison')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'comparison'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Strategy Comparison
		</button>
		<button
			onclick={() => (mode = 'scaling')}
			class="px-4 py-2 rounded-lg transition-colors {mode === 'scaling'
				? 'bg-cosmic-cyan text-space-900 font-semibold'
				: 'bg-space-600 text-star-dim hover:bg-space-500'}"
		>
			Scaling Analysis
		</button>
	</div>

	<!-- NN Fallback Banner -->
	{#if nnAvailable === false}
		<div class="max-w-3xl mx-auto p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm text-center">
			NN weights not found. Using Hohmann transfer approximation as fallback.
			Run the offline training script to generate NN weights for improved accuracy.
		</div>
	{/if}

	<!-- Error display -->
	{#if error}
		<div class="max-w-3xl mx-auto p-4 rounded-lg bg-sun-red/20 border border-sun-red/50 text-sun-red">
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
			<DeploymentOptControls
				{config}
				disabled={isRunning}
				{nnAvailable}
				onConfigChange={handleConfigChange}
				onRun={runSimulation}
			/>

			<!-- Mode Info -->
			<div class="card-glow p-4">
				<h4 class="text-sm font-semibold text-star-white mb-2">
					{mode === 'comparison' ? 'Strategy Comparison' : 'Scaling Analysis'}
				</h4>
				<p class="text-xs text-star-dim">
					{#if mode === 'comparison'}
						Compares {config.strategies.length} strategies deploying {config.unitCount.toLocaleString()}
						units with {config.tugCount} tugs over {config.iterations} Monte Carlo iterations.
					{:else}
						Sweeps unit counts from 100 to 5,000 to analyze how each strategy
						scales with deployment size.
					{/if}
				</p>
			</div>
		</div>

		<!-- Right Column: Results -->
		<div class="lg:col-span-2 space-y-6">
			<DeploymentOptChart {output} />
			<DeploymentOptResults {output} {progress} {isRunning} />

			<!-- Scaling Results Table -->
			{#if mode === 'scaling' && scalingOutputs && scalingOutputs.length > 0}
				<div class="card-glow p-6">
					<h3 class="text-lg font-bold text-star-white mb-4">Scaling Summary</h3>
					<div class="overflow-x-auto">
						<table class="w-full text-sm">
							<thead>
								<tr class="border-b border-space-600">
									<th class="text-left py-2 text-star-dim font-medium">Units</th>
									<th class="text-right py-2 text-star-dim font-medium">Best Strategy</th>
									<th class="text-right py-2 text-star-dim font-medium">Delta-V (km/s)</th>
									<th class="text-right py-2 text-star-dim font-medium">Days</th>
									<th class="text-right py-2 text-star-dim font-medium">Completion</th>
								</tr>
							</thead>
							<tbody>
								{#each scalingOutputs as so}
									{@const best = so.result.strategyStats.find((s) => s.strategy === so.result.bestStrategy)}
									<tr class="border-b border-space-700">
										<td class="py-2 text-star-white">{so.config.unitCount.toLocaleString()}</td>
										<td class="text-right py-2 text-cosmic-cyan">{so.result.bestStrategy}</td>
										<td class="text-right py-2 text-star-white">
											{best ? best.totalDeltaV.mean.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
										</td>
										<td class="text-right py-2 text-star-white">
											{best ? Math.round(best.totalDays.mean).toLocaleString() : '-'}
										</td>
										<td class="text-right py-2 text-star-white">
											{best ? best.completionRate.mean.toFixed(1) + '%' : '-'}
										</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<!-- Methodology Note -->
	<div class="card-glow p-6 max-w-4xl mx-auto">
		<h3 class="text-lg font-bold text-star-white mb-3">Simulation Methodology</h3>
		<div class="prose prose-invert prose-sm max-w-none space-y-2">
			<p>
				This simulator models the deployment of collector units from an assembly node (L1 or L4)
				to evenly-distributed orbital slots around a heliocentric orbit. A trained neural network
				approximates delta-V costs for each transfer, replacing expensive Lambert solver iterations.
			</p>
			<ul class="list-disc list-inside space-y-1 text-star-dim">
				<li><strong class="text-blue-400">Sequential</strong>: Deploy units one-by-one in slot order, round-robin across tugs</li>
				<li><strong class="text-green-400">Batch</strong>: Tugs carry 3 units per trip, deploying in angular clusters</li>
				<li><strong class="text-orange-400">Greedy</strong>: At each step, pick the nearest undeployed slot to assembly node</li>
				<li><strong class="text-cyan-400">NN-Guided</strong>: Use NN delta-V estimates to globally optimize deployment sequence</li>
			</ul>
			<p class="text-star-faint">
				Propellant consumption follows the Tsiolkovsky rocket equation with ion propulsion
				(Isp 3000s). Monte Carlo uncertainty comes from stochastic fuel efficiency (+/-5%).
			</p>
		</div>
	</div>
</div>
