<script lang="ts">
	import type {
		SpectralComparisonResult,
		SpectralProgress
	} from '$lib/services/simulation/spectral-analysis';

	interface Props {
		comparison: SpectralComparisonResult | null;
		progress: SpectralProgress | null;
		isRunning: boolean;
	}

	let { comparison, progress, isRunning }: Props = $props();

	function formatNumber(n: number): string {
		if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
		return n.toFixed(1);
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Comparison Results</h3>

	{#if isRunning && progress}
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<span class="spinner w-5 h-5"></span>
				<span class="text-star-dim">
					Running {progress.processingLocation ?? 'simulation'} {progress.currentRun} of {progress.totalRuns}...
				</span>
			</div>
			<div class="w-full bg-space-600 rounded-full h-2">
				<div
					class="bg-cosmic-cyan h-2 rounded-full transition-all duration-200"
					style="width: {progress.percentComplete}%"
				></div>
			</div>
			<p class="text-sm text-star-faint">{progress.percentComplete.toFixed(0)}% complete</p>
		</div>
	{:else if comparison}
		<div class="space-y-6">
			<!-- Side-by-side comparison -->
			<div class="grid grid-cols-2 gap-4">
				<!-- On-board Results -->
				<div class="p-4 bg-space-700/50 rounded-lg border border-cosmic-cyan/30">
					<h4 class="text-sm font-semibold text-cosmic-cyan mb-3">On-board Processing</h4>

					<div class="space-y-3">
						<div>
							<p class="text-xs text-star-faint">Targets Surveyed</p>
							<p class="text-xl font-bold text-star-white">
								{formatNumber(comparison.onboardResult.targetsSurveyed)}
							</p>
						</div>

						<div>
							<p class="text-xs text-star-faint">Avg Decision Latency</p>
							<p class="text-lg font-semibold text-star-white">
								{comparison.onboardResult.avgDecisionLatencyHours.toFixed(1)} hrs
							</p>
						</div>

						<div>
							<p class="text-xs text-star-faint">Bandwidth Utilization</p>
							<p class="text-lg font-semibold text-star-white">
								{(comparison.onboardResult.bandwidthUtilization * 100).toFixed(0)}%
							</p>
						</div>

						<div>
							<p class="text-xs text-star-faint">Survey Efficiency</p>
							<p class="text-lg font-semibold text-star-white">
								{(comparison.onboardResult.surveyEfficiency * 100).toFixed(1)}%
							</p>
						</div>
					</div>
				</div>

				<!-- Ground Results -->
				<div class="p-4 bg-space-700/50 rounded-lg border border-solar-gold/30">
					<h4 class="text-sm font-semibold text-solar-gold mb-3">Ground Processing</h4>

					<div class="space-y-3">
						<div>
							<p class="text-xs text-star-faint">Targets Surveyed</p>
							<p class="text-xl font-bold text-star-white">
								{formatNumber(comparison.groundResult.targetsSurveyed)}
							</p>
						</div>

						<div>
							<p class="text-xs text-star-faint">Avg Decision Latency</p>
							<p class="text-lg font-semibold text-star-white">
								{comparison.groundResult.avgDecisionLatencyHours.toFixed(1)} hrs
							</p>
						</div>

						<div>
							<p class="text-xs text-star-faint">Bandwidth Utilization</p>
							<p class="text-lg font-semibold text-star-white">
								{(comparison.groundResult.bandwidthUtilization * 100).toFixed(0)}%
							</p>
						</div>

						<div>
							<p class="text-xs text-star-faint">Survey Efficiency</p>
							<p class="text-lg font-semibold text-star-white">
								{(comparison.groundResult.surveyEfficiency * 100).toFixed(1)}%
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Analysis Summary -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<h4 class="text-sm font-semibold text-star-white mb-3">Analysis</h4>

				<div class="grid grid-cols-3 gap-4 mb-4">
					<div class="text-center">
						<p class="text-xs text-star-faint">Survey Difference</p>
						<p
							class="text-lg font-bold {comparison.analysis.surveyedDifference > 0
								? 'text-cosmic-cyan'
								: comparison.analysis.surveyedDifference < 0
									? 'text-sun-red'
									: 'text-star-white'}"
						>
							{comparison.analysis.surveyedDifference > 0 ? '+' : ''}{comparison.analysis.surveyedDifference.toFixed(
								0
							)}
						</p>
						<p class="text-xs text-star-faint">
							({comparison.analysis.surveyedDifferencePercent > 0
								? '+'
								: ''}{comparison.analysis.surveyedDifferencePercent.toFixed(1)}%)
						</p>
					</div>

					<div class="text-center">
						<p class="text-xs text-star-faint">Latency Savings</p>
						<p class="text-lg font-bold text-cosmic-cyan">
							{comparison.analysis.latencyDifferenceHours.toFixed(1)} hrs
						</p>
					</div>

					<div class="text-center">
						<p class="text-xs text-star-faint">Bandwidth Savings</p>
						<p class="text-lg font-bold text-cosmic-cyan">
							{comparison.analysis.bandwidthSavingsPercent.toFixed(0)}%
						</p>
					</div>
				</div>

				<p class="text-sm text-star-dim">{comparison.analysis.recommendation}</p>
			</div>

			<!-- Missed Opportunities Breakdown -->
			<div class="grid grid-cols-2 gap-4">
				<div class="p-3 bg-space-700/30 rounded-lg">
					<h5 class="text-xs text-star-faint mb-2">On-board Missed Opportunities</h5>
					<div class="space-y-1 text-sm">
						<div class="flex justify-between">
							<span class="text-star-dim">By Bandwidth:</span>
							<span class="text-star-white"
								>{comparison.onboardResult.missedByBandwidth.toFixed(0)}</span
							>
						</div>
						<div class="flex justify-between">
							<span class="text-star-dim">By Latency:</span>
							<span class="text-star-white"
								>{comparison.onboardResult.missedByLatency.toFixed(0)}</span
							>
						</div>
					</div>
				</div>

				<div class="p-3 bg-space-700/30 rounded-lg">
					<h5 class="text-xs text-star-faint mb-2">Ground Missed Opportunities</h5>
					<div class="space-y-1 text-sm">
						<div class="flex justify-between">
							<span class="text-star-dim">By Bandwidth:</span>
							<span class="text-star-white"
								>{comparison.groundResult.missedByBandwidth.toFixed(0)}</span
							>
						</div>
						<div class="flex justify-between">
							<span class="text-star-dim">By Latency:</span>
							<span class="text-star-white"
								>{comparison.groundResult.missedByLatency.toFixed(0)}</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<p class="text-star-dim text-sm">
			Configure the parameters and run the simulation to compare on-board vs ground processing.
		</p>
	{/if}
</div>
