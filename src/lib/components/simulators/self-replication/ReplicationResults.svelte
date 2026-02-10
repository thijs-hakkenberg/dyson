<script lang="ts">
	import type {
		ReplicationOutput,
		ReplicationProgress
	} from '$lib/services/simulation/self-replication';

	interface Props {
		output: ReplicationOutput | null;
		progress: ReplicationProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatMonths(months: number | null): string {
		if (months === null) return 'Not reached';
		if (months >= 12) return `${(months / 12).toFixed(1)} years`;
		return `${months.toFixed(1)} months`;
	}

	function formatCount(n: number): string {
		if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
		if (n >= 1e3) return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
		return n.toFixed(0);
	}

	function formatMass(kg: number): string {
		if (kg >= 1e9) return `${(kg / 1e9).toFixed(1)}M tonnes`;
		if (kg >= 1e6) return `${(kg / 1e6).toFixed(1)}k tonnes`;
		if (kg >= 1e3) return `${(kg / 1e3).toFixed(1)} tonnes`;
		return `${kg.toFixed(0)} kg`;
	}

	let targetStatus = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim' };
		const prob = output.result.probabilityOfTarget;
		if (prob >= 0.95) return { label: 'Very Likely', color: 'text-green-400' };
		if (prob >= 0.75) return { label: 'Likely', color: 'text-solar-gold' };
		if (prob >= 0.5) return { label: 'Possible', color: 'text-orange-400' };
		if (prob > 0) return { label: 'Unlikely', color: 'text-sun-red' };
		return { label: 'Not Reached', color: 'text-red-600' };
	});
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
			<p class="text-sm text-star-faint">
				{progress.percentComplete.toFixed(0)}% complete
			</p>
		</div>
	{:else if output}
		<div class="space-y-6">
			<!-- Key Metrics Grid -->
			<div class="grid grid-cols-2 gap-4">
				<!-- Time to Target -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Time to Target</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatMonths(output.result.timeToTargetStats.mean)}
					</p>
					{#if output.result.timeToTargetStats.min !== null}
						<p class="text-xs text-star-dim mt-1">
							range: {formatMonths(output.result.timeToTargetStats.min)} - {formatMonths(output.result.timeToTargetStats.max)}
						</p>
					{/if}
				</div>

				<!-- Probability of Target -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Target Probability</p>
					<p class="text-2xl font-bold {targetStatus.color}">
						{(output.result.probabilityOfTarget * 100).toFixed(1)}%
					</p>
					<p class="text-xs mt-1 {targetStatus.color}">
						{targetStatus.label}
					</p>
				</div>

				<!-- Final Foundry Count -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Final Count (mean)</p>
					<p class="text-2xl font-bold text-star-white">
						{formatCount(output.result.finalCountStats.mean)}
					</p>
					<p class="text-xs text-star-dim mt-1">
						target: {formatCount(output.config.targetFoundries)}
					</p>
				</div>

				<!-- Total Vitamin Mass -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Vitamin Import</p>
					<p class="text-2xl font-bold text-solar-gold">
						{formatMass(output.result.totalVitaminStats.mean)}
					</p>
					<p class="text-xs text-star-dim mt-1">
						total imported
					</p>
				</div>
			</div>

			<!-- Growth Details -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-3">Growth Details</p>
				<div class="grid grid-cols-2 gap-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-faint">Peak Growth Rate</span>
						<span class="text-star-white font-mono">
							{formatCount(output.result.peakGrowthStats.mean)} foundries/cycle
						</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Max Peak Growth</span>
						<span class="text-star-white font-mono">
							{formatCount(output.result.peakGrowthStats.max)} foundries/cycle
						</span>
					</div>
					{#if output.result.plateauStats.mean !== null}
						<div class="flex justify-between">
							<span class="text-star-faint">Plateau Generation</span>
							<span class="text-star-white font-mono">
								gen {output.result.plateauStats.mean.toFixed(0)}
							</span>
						</div>
						<div class="flex justify-between">
							<span class="text-star-faint">Plateau Range</span>
							<span class="text-star-white font-mono">
								gen {output.result.plateauStats.min?.toFixed(0)} - {output.result.plateauStats.max?.toFixed(0)}
							</span>
						</div>
					{:else}
						<div class="flex justify-between col-span-2">
							<span class="text-star-faint">Plateau</span>
							<span class="text-green-400 font-mono">No plateau (sustained growth)</span>
						</div>
					{/if}
				</div>
			</div>

			<!-- Configuration Summary -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">Configuration</p>
				<div class="grid grid-cols-2 gap-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-faint">Closure Ratio</span>
						<span class="text-star-white">{(output.config.closureRatio * 100).toFixed(0)}%</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Cycle Time</span>
						<span class="text-star-white">{output.config.cycleTimeMonths} months</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Degradation</span>
						<span class="text-star-white">{(output.config.degradationRate * 100).toFixed(1)}%/gen</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Foundry Mass</span>
						<span class="text-star-white">{(output.config.foundryMassKg / 1000).toFixed(0)} tonnes</span>
					</div>
				</div>
			</div>

			<!-- Execution Stats -->
			<div class="text-xs text-star-faint flex justify-between border-t border-space-600 pt-3">
				<span>Monte Carlo runs: {output.config.iterations}</span>
				<span>Execution time: {(output.executionTimeMs / 1000).toFixed(2)}s</span>
			</div>
		</div>
	{:else}
		<p class="text-star-dim text-sm">
			Configure the replication parameters and run the simulation to see results.
		</p>
	{/if}
</div>
