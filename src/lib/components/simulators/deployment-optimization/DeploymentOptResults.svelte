<script lang="ts">
	import type {
		DeploymentOptOutput,
		DeploymentOptProgress,
		DeploymentStrategy
	} from '$lib/services/simulation/deployment-optimization';

	interface Props {
		output: DeploymentOptOutput | null;
		progress: DeploymentOptProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	const strategyLabels: Record<DeploymentStrategy, string> = {
		sequential: 'Sequential',
		batch: 'Batch',
		greedy: 'Greedy',
		'nn-guided': 'NN-Guided'
	};

	const strategyColors: Record<DeploymentStrategy, string> = {
		sequential: 'text-blue-400',
		batch: 'text-green-400',
		greedy: 'text-orange-400',
		'nn-guided': 'text-cyan-400'
	};

	function formatDeltaV(kms: number): string {
		return kms.toLocaleString(undefined, { maximumFractionDigits: 0 }) + ' km/s';
	}

	function formatDays(d: number): string {
		return Math.round(d).toLocaleString() + ' days';
	}

	function formatPercent(p: number): string {
		return p.toFixed(1) + '%';
	}

	function formatPropellant(kg: number): string {
		if (kg >= 1_000_000) return (kg / 1_000_000).toFixed(1) + 'M kg';
		if (kg >= 1_000) return (kg / 1_000).toFixed(0) + 'k kg';
		return Math.round(kg) + ' kg';
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Strategy Comparison</h3>

	{#if isRunning && progress}
		<div class="space-y-3">
			<div class="flex justify-between text-sm">
				<span class="text-star-dim">
					Run {progress.currentRun} of {progress.totalRuns}
				</span>
				<span class="text-cosmic-cyan">{progress.percentComplete.toFixed(0)}%</span>
			</div>
			<div class="w-full h-2 bg-space-600 rounded-full overflow-hidden">
				<div
					class="h-full bg-cosmic-cyan rounded-full transition-all duration-300"
					style="width: {progress.percentComplete}%"
				></div>
			</div>
		</div>
	{:else if output}
		<!-- Comparison Table -->
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-space-600">
						<th class="text-left py-2 text-star-dim font-medium">Strategy</th>
						<th class="text-right py-2 text-star-dim font-medium">Total Delta-V</th>
						<th class="text-right py-2 text-star-dim font-medium">Duration</th>
						<th class="text-right py-2 text-star-dim font-medium">Propellant</th>
						<th class="text-right py-2 text-star-dim font-medium">Completion</th>
						<th class="text-right py-2 text-star-dim font-medium">Wins</th>
					</tr>
				</thead>
				<tbody>
					{#each output.result.strategyStats as stats}
						{@const isBest = stats.strategy === output.result.bestStrategy}
						<tr class="border-b border-space-700 {isBest ? 'bg-space-700/30' : ''}">
							<td class="py-3">
								<div class="flex items-center gap-2">
									{#if isBest}
										<span class="text-solar-gold text-xs">*</span>
									{/if}
									<span class="{strategyColors[stats.strategy]} font-medium">
										{strategyLabels[stats.strategy]}
									</span>
								</div>
							</td>
							<td class="text-right py-3 text-star-white">
								<div>{formatDeltaV(stats.totalDeltaV.mean)}</div>
								<div class="text-xs text-star-faint">
									+/-{stats.totalDeltaV.stdDev.toFixed(0)}
								</div>
							</td>
							<td class="text-right py-3 text-star-white">
								<div>{formatDays(stats.totalDays.mean)}</div>
								<div class="text-xs text-star-faint">
									+/-{Math.round(stats.totalDays.stdDev)}
								</div>
							</td>
							<td class="text-right py-3 text-star-white">
								<div>{formatPropellant(stats.propellantUsed.mean)}</div>
								<div class="text-xs text-star-faint">
									+/-{formatPropellant(stats.propellantUsed.stdDev)}
								</div>
							</td>
							<td class="text-right py-3 text-star-white">
								<div>{formatPercent(stats.completionRate.mean)}</div>
								<div class="text-xs text-star-faint">
									[{formatPercent(stats.completionRate.ci95Lower)}-{formatPercent(stats.completionRate.ci95Upper)}]
								</div>
							</td>
							<td class="text-right py-3 text-star-white">
								{output.result.winCounts[stats.strategy]}/{output.config.iterations}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Winner Banner -->
		<div class="mt-4 p-4 bg-space-700/30 rounded-lg border border-space-600">
			<p class="text-sm text-star-white">
				<span class="text-solar-gold font-semibold">Best strategy:</span>
				<span class="{strategyColors[output.result.bestStrategy]}">
					{strategyLabels[output.result.bestStrategy]}
				</span>
				- won {output.result.winCounts[output.result.bestStrategy]} of {output.config.iterations} runs.
				{#if !output.nnAvailable}
					<span class="text-yellow-400">(Using Hohmann fallback - results approximate)</span>
				{/if}
			</p>
		</div>

		<!-- Execution Info -->
		<div class="mt-3 text-xs text-star-faint text-right">
			{output.config.iterations} MC runs in {(output.executionTimeMs / 1000).toFixed(1)}s
			| {output.config.unitCount.toLocaleString()} units | {output.config.tugCount} tugs
		</div>
	{:else}
		<div class="h-48 flex items-center justify-center text-star-dim">
			<p>Run a simulation to compare deployment strategies</p>
		</div>
	{/if}
</div>
