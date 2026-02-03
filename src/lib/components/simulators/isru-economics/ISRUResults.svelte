<script lang="ts">
	import type { ISRUEconomicsOutput, ISRUEconomicsProgress } from '$lib/services/simulation/isru-economics';

	interface Props {
		output: ISRUEconomicsOutput | null;
		progress: ISRUEconomicsProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatNumber(n: number): string {
		if (isNaN(n)) return 'N/A';
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
		return n.toFixed(0);
	}

	function formatCurrency(n: number): string {
		if (isNaN(n)) return 'N/A';
		if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
		if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
		if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
		if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}k`;
		return `$${n.toFixed(2)}`;
	}

	function formatPercent(n: number): string {
		if (isNaN(n)) return 'N/A';
		return `${n.toFixed(1)}%`;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Simulation Results</h3>

	{#if isRunning && progress}
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<span class="spinner w-5 h-5"></span>
				<span class="text-star-dim">
					Running simulation {progress.currentRun} of {progress.totalRuns}...
					{#if progress.scenarioName}
						<span class="text-star-faint">({progress.scenarioName})</span>
					{/if}
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
	{:else if output}
		<div class="space-y-6">
			<!-- Crossover Point -->
			<div class="p-4 bg-space-700/50 rounded-lg border border-cosmic-cyan/30">
				<p class="text-xs text-star-faint uppercase tracking-wider mb-2">Crossover Point</p>
				{#if output.stats.crossoverOccurrencePercent > 0}
					<p class="text-3xl font-bold text-cosmic-cyan">
						{formatNumber(output.stats.crossoverUnitCountMean)} units
					</p>
					<p class="text-sm text-star-dim mt-1">
						Year {output.stats.crossoverYearMean.toFixed(0)} (avg)
					</p>
					<p class="text-xs text-star-faint mt-2">
						Crossover occurred in {formatPercent(output.stats.crossoverOccurrencePercent)} of runs
					</p>
				{:else}
					<p class="text-xl font-semibold text-sun-red">
						No crossover in simulation range
					</p>
					<p class="text-sm text-star-dim mt-1">
						ISRU never becomes cheaper than Earth manufacturing
					</p>
				{/if}
			</div>

			<!-- Key Metrics -->
			<div class="grid grid-cols-2 gap-4">
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Earth Total Cost</p>
					<p class="text-2xl font-bold text-solar-gold">
						{formatCurrency(output.stats.totalEarthCostMean)}
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">ISRU Total Cost</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatCurrency(output.stats.totalISRUCostMean)}
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Cost Savings</p>
					<p class="text-2xl font-bold {output.stats.costSavingsMean > 0 ? 'text-green-400' : 'text-sun-red'}">
						{formatCurrency(Math.abs(output.stats.costSavingsMean))}
					</p>
					<p class="text-xs text-star-dim mt-1">
						{output.stats.costSavingsMean > 0 ? 'ISRU cheaper' : 'Earth cheaper'}
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Savings Percentage</p>
					<p class="text-2xl font-bold {output.stats.costSavingsPercentMean > 0 ? 'text-green-400' : 'text-sun-red'}">
						{formatPercent(Math.abs(output.stats.costSavingsPercentMean))}
					</p>
					<p class="text-xs text-star-dim mt-1">
						{output.stats.costSavingsPercentMean > 0 ? '+' : '-'}{formatPercent(Math.abs(output.stats.costSavingsPercentMean))}
					</p>
				</div>
			</div>

			<!-- Confidence Intervals -->
			{#if output.stats.crossoverOccurrencePercent > 0}
				<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
					<p class="text-sm text-star-dim mb-2">95% Confidence Interval (Crossover)</p>
					<div class="flex items-center justify-between text-sm">
						<span class="text-star-faint">
							{formatNumber(output.stats.crossoverCI95.lower)} units
						</span>
						<span class="text-cosmic-cyan font-semibold">
							{formatNumber(output.stats.crossoverUnitCountMean)} units
						</span>
						<span class="text-star-faint">
							{formatNumber(output.stats.crossoverCI95.upper)} units
						</span>
					</div>
					<div class="relative mt-2 h-2 bg-space-600 rounded-full">
						<div
							class="absolute h-2 bg-cosmic-cyan/30 rounded-full"
							style="left: 5%; right: 5%"
						></div>
						<div
							class="absolute h-2 w-1 bg-cosmic-cyan rounded-full"
							style="left: 50%; transform: translateX(-50%)"
						></div>
					</div>
				</div>
			{/if}

			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">95% Confidence Interval (Savings)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint">
						{formatCurrency(output.stats.savingsCI95.lower)}
					</span>
					<span class="{output.stats.costSavingsMean > 0 ? 'text-green-400' : 'text-sun-red'} font-semibold">
						{formatCurrency(output.stats.costSavingsMean)}
					</span>
					<span class="text-star-faint">
						{formatCurrency(output.stats.savingsCI95.upper)}
					</span>
				</div>
				<div class="relative mt-2 h-2 bg-space-600 rounded-full">
					<div
						class="absolute h-2 bg-green-400/30 rounded-full"
						style="left: 5%; right: 5%"
					></div>
					<div
						class="absolute h-2 w-1 {output.stats.costSavingsMean > 0 ? 'bg-green-400' : 'bg-sun-red'} rounded-full"
						style="left: 50%; transform: translateX(-50%)"
					></div>
				</div>
			</div>

			<!-- Execution Stats -->
			<div class="text-xs text-star-faint flex justify-between border-t border-space-600 pt-3">
				<span>Monte Carlo runs: {output.runs}</span>
				<span>Execution time: {(output.executionTimeMs / 1000).toFixed(2)}s</span>
			</div>
		</div>
	{:else}
		<p class="text-star-dim text-sm">
			Configure the simulation parameters and run to see ISRU vs Earth manufacturing cost comparison.
		</p>
	{/if}
</div>
