<script lang="ts">
	import type { DepotLogisticsSimulationOutput, DepotLogisticsProgress } from '$lib/services/simulation/depot-logistics';

	interface Props {
		output: DepotLogisticsSimulationOutput | null;
		progress: DepotLogisticsProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatNumber(n: number): string {
		if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
		return n.toFixed(2);
	}

	function formatCurrency(n: number): string {
		if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
		if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}k`;
		return `$${n.toFixed(0)}`;
	}

	function formatDays(days: number): string {
		if (days < 1) {
			return `${(days * 24).toFixed(1)} hrs`;
		}
		return `${days.toFixed(2)} days`;
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
			<!-- Key Metrics -->
			<div class="grid grid-cols-2 gap-4">
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Mean Time to Repair</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatDays(output.result.meanTimeToRepairDays)}
					</p>
					<p class="text-xs text-star-dim mt-1">
						+/- {formatDays(output.result.mttrStdDev)} (1 sigma)
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Depot Count</p>
					<p class="text-2xl font-bold text-solar-gold">
						{output.result.depotCountRequired}
					</p>
					<p class="text-xs text-star-dim mt-1">required for coverage</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Propellant/Year</p>
					<p class="text-2xl font-bold text-star-white">
						{formatNumber(output.result.totalPropellantKgPerYear)} kg
					</p>
					<p class="text-xs text-star-dim mt-1">
						+/- {formatNumber(output.result.propellantStdDev)} kg
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Fleet Utilization</p>
					<p class="text-2xl font-bold text-star-white">
						{(output.result.fleetUtilizationPercent * 100).toFixed(1)}%
					</p>
					<p class="text-xs text-star-dim mt-1">
						+/- {(output.result.utilizationStdDev * 100).toFixed(1)}%
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg col-span-2">
					<p class="text-xs text-star-faint uppercase tracking-wider">Cost per Mission</p>
					<p class="text-2xl font-bold text-sun-red">
						{formatCurrency(output.result.costPerServiceMission)}
					</p>
					<p class="text-xs text-star-dim mt-1">
						+/- {formatCurrency(output.result.costStdDev)} (1 sigma)
					</p>
				</div>
			</div>

			<!-- Unserviced Failures -->
			{#if output.result.avgFailuresUnserviced > 0}
				<div class="p-4 bg-sun-red/10 border border-sun-red/30 rounded-lg">
					<p class="text-sm text-sun-red">
						Average {output.result.avgFailuresUnserviced.toFixed(1)} failures unserviced by end of simulation
					</p>
				</div>
			{/if}

			<!-- Confidence Interval -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">95% Confidence Interval (MTTR)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint">
						{formatDays(output.result.confidenceInterval95.mttrLower)}
					</span>
					<span class="text-cosmic-cyan font-semibold">
						{formatDays(output.result.meanTimeToRepairDays)}
					</span>
					<span class="text-star-faint">
						{formatDays(output.result.confidenceInterval95.mttrUpper)}
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

			<!-- Execution Stats -->
			<div class="text-xs text-star-faint flex justify-between border-t border-space-600 pt-3">
				<span>Monte Carlo runs: {output.runs}</span>
				<span>Execution time: {(output.executionTimeMs / 1000).toFixed(2)}s</span>
			</div>
		</div>
	{:else}
		<p class="text-star-dim text-sm">
			Configure the depot parameters and run the simulation to see results.
		</p>
	{/if}
</div>
