<script lang="ts">
	import type { FleetSimulationOutput, FleetProgress } from '$lib/services/simulation/fleet-logistics';

	interface Props {
		output: FleetSimulationOutput | null;
		progress: FleetProgress | null;
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
		if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}k`;
		return `$${n.toFixed(2)}`;
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
					<p class="text-xs text-star-faint uppercase tracking-wider">Annual Throughput</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatNumber(output.result.throughputKgPerYear)} kg/yr
					</p>
					<p class="text-xs text-star-dim mt-1">
						±{formatNumber(output.result.throughputStdDev)} (1σ)
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Cost per kg</p>
					<p class="text-2xl font-bold text-solar-gold">
						{formatCurrency(output.result.costPerKgDelivered)}/kg
					</p>
					<p class="text-xs text-star-dim mt-1">
						±{formatCurrency(output.result.costPerKgStdDev)} (1σ)
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Fleet Utilization</p>
					<p class="text-2xl font-bold text-star-white">
						{(output.result.fleetUtilization * 100).toFixed(1)}%
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Avg Failures</p>
					<p class="text-2xl font-bold text-sun-red">
						{output.result.vehicleFailures.toFixed(1)}
					</p>
					<p class="text-xs text-star-dim mt-1">vehicles/mission</p>
				</div>
			</div>

			<!-- Confidence Interval -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">95% Confidence Interval (Throughput)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint">
						{formatNumber(output.result.confidenceInterval95.throughputLower)} kg/yr
					</span>
					<span class="text-cosmic-cyan font-semibold">
						{formatNumber(output.result.throughputKgPerYear)} kg/yr
					</span>
					<span class="text-star-faint">
						{formatNumber(output.result.confidenceInterval95.throughputUpper)} kg/yr
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
			Configure the fleet parameters and run the simulation to see results.
		</p>
	{/if}
</div>
