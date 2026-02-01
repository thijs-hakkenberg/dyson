<script lang="ts">
	import type { SimulationOutput, SimulationProgress } from '$lib/services/simulation';

	interface Props {
		output: SimulationOutput | null;
		progress: SimulationProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	const formatPercent = (value: number): string => `${value.toFixed(1)}%`;
	const formatTime = (ms: number): string => {
		if (ms < 1000) return `${ms}ms`;
		return `${(ms / 1000).toFixed(1)}s`;
	};
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Analysis Results</h3>

	{#if isRunning && progress}
		<!-- Progress display -->
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<div class="spinner w-5 h-5"></div>
				<span class="text-star-dim">
					Running simulation...
				</span>
			</div>

			<div class="space-y-2">
				<div class="flex justify-between text-sm">
					<span class="text-star-dim">Progress</span>
					<span class="text-star-white">{progress.percentComplete.toFixed(0)}%</span>
				</div>
				<div class="w-full h-2 bg-space-600 rounded-full overflow-hidden">
					<div
						class="h-full bg-cosmic-cyan transition-all duration-300"
						style="width: {progress.percentComplete}%"
					></div>
				</div>
				<p class="text-xs text-star-faint">
					Size {progress.currentSize} - Run {progress.currentRun}/{progress.totalRuns}
				</p>
			</div>
		</div>
	{:else if output}
		<!-- Results display -->
		<div class="space-y-6">
			<!-- Key Findings -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				<!-- Optimal Size -->
				<div class="p-4 rounded-lg bg-space-600 border border-cosmic-cyan/30">
					<div class="text-xs text-star-faint uppercase tracking-wider mb-1">Optimal Size</div>
					<div class="text-2xl font-bold text-cosmic-cyan">{output.analysis.optimalSize}</div>
					<div class="text-xs text-star-dim mt-1">Best efficiency</div>
				</div>

				<!-- Minimum Viable -->
				<div class="p-4 rounded-lg bg-space-600 border border-sun-gold/30">
					<div class="text-xs text-star-faint uppercase tracking-wider mb-1">Minimum Viable</div>
					<div class="text-2xl font-bold text-sun-gold">{output.analysis.minimumViableSize}</div>
					<div class="text-xs text-star-dim mt-1">80% high-value coverage</div>
				</div>

				<!-- Knee Point -->
				<div class="p-4 rounded-lg bg-space-600 border border-cosmic-purple/30">
					<div class="text-xs text-star-faint uppercase tracking-wider mb-1">Knee Point</div>
					<div class="text-2xl font-bold text-cosmic-purple">{output.analysis.kneePoint}</div>
					<div class="text-xs text-star-dim mt-1">Diminishing returns</div>
				</div>
			</div>

			<!-- Baseline Comparison -->
			<div class="p-4 rounded-lg bg-space-600">
				<div class="text-sm font-semibold text-star-white mb-3">Baseline Plan (50 Satellites)</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<div class="text-xs text-star-faint mb-1">Mean Coverage</div>
						<div class="text-lg font-semibold text-star-white">
							{formatPercent(output.analysis.baselineComparison.coverageMean)}
						</div>
					</div>
					<div>
						<div class="text-xs text-star-faint mb-1">Std Deviation</div>
						<div class="text-lg font-semibold text-star-white">
							{String.fromCharCode(177)}{formatPercent(output.analysis.baselineComparison.coverageStdDev)}
						</div>
					</div>
				</div>
			</div>

			<!-- Coverage Table -->
			<div>
				<div class="text-sm font-semibold text-star-white mb-3">Coverage by Constellation Size</div>
				<div class="overflow-x-auto">
					<table class="w-full text-sm">
						<thead>
							<tr class="border-b border-space-500">
								<th class="text-left py-2 text-star-faint font-medium">Size</th>
								<th class="text-right py-2 text-star-faint font-medium">Coverage</th>
								<th class="text-right py-2 text-star-faint font-medium">High-Value</th>
								<th class="text-right py-2 text-star-faint font-medium">95% CI</th>
							</tr>
						</thead>
						<tbody>
							{#each output.results as result}
								{@const isBaseline = result.constellationSize === 50}
								{@const isKnee = result.constellationSize === output.analysis.kneePoint}
								<tr class="border-b border-space-600 {isBaseline ? 'bg-cosmic-purple/10' : ''} {isKnee ? 'bg-sun-gold/10' : ''}">
									<td class="py-2 text-star-white">
										{result.constellationSize}
										{#if isBaseline}
											<span class="text-xs text-cosmic-purple ml-1">(baseline)</span>
										{/if}
										{#if isKnee}
											<span class="text-xs text-sun-gold ml-1">(knee)</span>
										{/if}
									</td>
									<td class="text-right py-2 text-star-dim">{formatPercent(result.coverage.mean)}</td>
									<td class="text-right py-2 text-star-dim">{formatPercent(result.highValueCoverage.mean)}</td>
									<td class="text-right py-2 text-star-faint text-xs">
										{formatPercent(result.coverage.percentile5)} - {formatPercent(result.coverage.percentile95)}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<!-- Execution Stats -->
			<div class="flex items-center justify-between text-xs text-star-faint pt-4 border-t border-space-500">
				<span>{output.config.monteCarloRuns} Monte Carlo runs</span>
				<span>Completed in {formatTime(output.executionTimeMs)}</span>
			</div>
		</div>
	{:else}
		<div class="flex flex-col items-center justify-center py-8 text-center">
			<svg class="w-12 h-12 text-star-faint mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
					d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
			</svg>
			<p class="text-star-dim">
				Configure parameters and run simulation to see results
			</p>
		</div>
	{/if}
</div>
