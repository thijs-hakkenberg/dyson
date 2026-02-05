<script lang="ts">
	import type { SupplyChainOutput, SupplyChainProgress } from '$lib/services/simulation/supply-chain';

	interface Props {
		output: SupplyChainOutput | null;
		progress: SupplyChainProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatNumber(n: number): string {
		if (isNaN(n)) return 'N/A';
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
		return n.toFixed(1);
	}

	function formatCurrency(n: number): string {
		if (isNaN(n)) return 'N/A';
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
			<!-- Supply Constraint Risk -->
			<div class="p-4 bg-space-700/50 rounded-lg border border-cosmic-cyan/30">
				<p class="text-xs text-star-faint uppercase tracking-wider mb-2">Supply Constraint Risk</p>
				{#if output.stats.constraintOccurrencePercent > 0}
					<p class="text-3xl font-bold {output.stats.constraintOccurrencePercent > 70 ? 'text-sun-red' : output.stats.constraintOccurrencePercent > 40 ? 'text-solar-gold' : 'text-green-400'}">
						{formatPercent(output.stats.constraintOccurrencePercent)}
					</p>
					<p class="text-sm text-star-dim mt-1">
						of scenarios experience supply constraints
					</p>
					{#if !isNaN(output.stats.constraintYearMean)}
						<p class="text-xs text-star-faint mt-2">
							Average constraint year: {output.stats.constraintYearMean.toFixed(1)}
						</p>
					{/if}
				{:else}
					<p class="text-xl font-semibold text-green-400">
						No constraints detected
					</p>
					<p class="text-sm text-star-dim mt-1">
						Supply meets demand in all scenarios
					</p>
				{/if}
			</div>

			<!-- Key Metrics -->
			<div class="grid grid-cols-2 gap-4">
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Stockpile Required</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatNumber(output.stats.stockpileRequiredMean)} t
					</p>
					<p class="text-xs text-star-dim mt-1">
						+/- {formatNumber(output.stats.stockpileRequiredStdDev)} t
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Years to Accumulate</p>
					<p class="text-2xl font-bold text-solar-gold">
						{output.stats.yearsToAccumulateMean.toFixed(1)} yr
					</p>
					<p class="text-xs text-star-dim mt-1">
						average stockpiling time
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Demand Met</p>
					<p class="text-2xl font-bold {output.stats.demandMetPercent > 80 ? 'text-green-400' : output.stats.demandMetPercent > 50 ? 'text-solar-gold' : 'text-sun-red'}">
						{formatPercent(output.stats.demandMetPercent)}
					</p>
					<p class="text-xs text-star-dim mt-1">
						of scenarios meet demand
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Cost Sensitivity</p>
					<p class="text-2xl font-bold {output.stats.costSensitivity > 0.2 ? 'text-sun-red' : 'text-star-white'}">
						{formatPercent(output.stats.costSensitivity * 100)}
					</p>
					<p class="text-xs text-star-dim mt-1">
						cost increase from constraints
					</p>
				</div>
			</div>

			<!-- Alternative Propellants -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-3">Alternative Propellant Viability</p>
				<div class="grid grid-cols-2 gap-4">
					<div class="flex items-center justify-between">
						<span class="text-star-white">Krypton</span>
						<span class="{output.stats.kryptonViabilityPercent > 70 ? 'text-green-400' : output.stats.kryptonViabilityPercent > 40 ? 'text-solar-gold' : 'text-sun-red'} font-semibold">
							{formatPercent(output.stats.kryptonViabilityPercent)}
						</span>
					</div>
					<div class="flex items-center justify-between">
						<span class="text-star-white">Argon</span>
						<span class="{output.stats.argonViabilityPercent > 70 ? 'text-green-400' : output.stats.argonViabilityPercent > 40 ? 'text-solar-gold' : 'text-sun-red'} font-semibold">
							{formatPercent(output.stats.argonViabilityPercent)}
						</span>
					</div>
				</div>
			</div>

			<!-- Confidence Interval -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">95% Confidence Interval (Stockpile)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint">
						{formatNumber(output.stats.stockpileCI95.lower)} t
					</span>
					<span class="text-cosmic-cyan font-semibold">
						{formatNumber(output.stats.stockpileRequiredMean)} t
					</span>
					<span class="text-star-faint">
						{formatNumber(output.stats.stockpileCI95.upper)} t
					</span>
				</div>
				<div class="relative mt-2 h-2 bg-space-600 rounded-full">
					<div
						class="absolute h-2 bg-cosmic-cyan/30 rounded-full"
						style="left: 10%; right: 10%"
					></div>
					<div
						class="absolute h-2 w-1 bg-cosmic-cyan rounded-full"
						style="left: 50%; transform: translateX(-50%)"
					></div>
				</div>
			</div>

			<!-- Strategy Recommendation -->
			{#if output.stats.recommendedStrategy}
				<div class="p-4 bg-cosmic-cyan/10 border border-cosmic-cyan/30 rounded-lg">
					<p class="text-xs text-cosmic-cyan uppercase tracking-wider mb-2">Recommended Strategy</p>
					<p class="text-sm text-star-white">{output.stats.recommendedStrategy}</p>
				</div>
			{/if}

			<!-- Execution Stats -->
			<div class="text-xs text-star-faint flex justify-between border-t border-space-600 pt-3">
				<span>Monte Carlo runs: {output.runs}</span>
				<span>Execution time: {(output.executionTimeMs / 1000).toFixed(2)}s</span>
			</div>
		</div>
	{:else}
		<p class="text-star-dim text-sm">
			Configure the simulation parameters and run to analyze xenon supply chain constraints
			and alternative propellant viability.
		</p>
	{/if}
</div>
