<script lang="ts">
	import type {
		RadiationDegradationOutput,
		RadiationDegradationProgress
	} from '$lib/services/simulation/radiation-degradation';

	interface Props {
		output: RadiationDegradationOutput | null;
		progress: RadiationDegradationProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatNumber(n: number, decimals: number = 1): string {
		return n.toFixed(decimals);
	}

	// Derive status indicators
	let survivalStatus = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim' };
		const prob = output.result.survivalProbability;
		if (prob >= 90) return { label: 'Excellent', color: 'text-green-400' };
		if (prob >= 70) return { label: 'Good', color: 'text-solar-gold' };
		if (prob >= 50) return { label: 'Marginal', color: 'text-orange-400' };
		return { label: 'Poor', color: 'text-sun-red' };
	});

	let efficiencyStatus = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim' };
		const retention = output.result.endOfLifeEfficiency / output.config.initialEfficiency;
		if (retention >= 0.7) return { label: 'Excellent', color: 'text-green-400' };
		if (retention >= 0.5) return { label: 'Good', color: 'text-solar-gold' };
		if (retention >= 0.3) return { label: 'Degraded', color: 'text-orange-400' };
		return { label: 'Critical', color: 'text-sun-red' };
	});

	let pvTechLabel = $derived.by(() => {
		if (!output) return '';
		const labels: Record<string, string> = {
			perovskite: 'Perovskite',
			cdte: 'CdTe',
			'iii-v': 'III-V',
			silicon: 'Silicon',
			hybrid: 'Hybrid'
		};
		return labels[output.config.pvTechnology] || output.config.pvTechnology;
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
				{#if progress.pvTechnology}
					<span class="ml-2 text-star-dim">({progress.pvTechnology})</span>
				{/if}
			</p>
		</div>
	{:else if output}
		<div class="space-y-6">
			<!-- Key Metrics Grid -->
			<div class="grid grid-cols-2 gap-4">
				<!-- End-of-Life Efficiency -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">End-of-Life Efficiency</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatNumber(output.result.endOfLifeEfficiency)}%
					</p>
					<p class="text-xs mt-1 {efficiencyStatus.color}">
						{efficiencyStatus.label}
					</p>
				</div>

				<!-- Half-Life -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Half-Life</p>
					<p class="text-2xl font-bold text-solar-gold">
						{formatNumber(output.result.halfLifeYear)} yr
					</p>
					<p class="text-xs text-star-dim mt-1">
						&plusmn;{formatNumber(output.result.halfLifeYearStdDev)} yr (1&sigma;)
					</p>
				</div>

				<!-- Survival Probability -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Survival Probability</p>
					<p class="text-2xl font-bold text-star-white">
						{formatNumber(output.result.survivalProbability, 0)}%
					</p>
					<p class="text-xs mt-1 {survivalStatus.color}">
						{survivalStatus.label}
					</p>
				</div>

				<!-- Efficiency Retention -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Efficiency Retention</p>
					<p class="text-2xl font-bold text-star-white">
						{formatNumber(
							(output.result.endOfLifeEfficiency / output.config.initialEfficiency) * 100,
							0
						)}%
					</p>
					<p class="text-xs text-star-dim mt-1">of initial efficiency</p>
				</div>
			</div>

			<!-- Configuration Summary -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">Configuration</p>
				<div class="grid grid-cols-2 gap-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-faint">Technology</span>
						<span class="text-star-white">{pvTechLabel}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Orbital Distance</span>
						<span class="text-star-white">{output.config.orbitalDistance} AU</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Shielding</span>
						<span class="text-star-white">{output.config.shieldingMass} g/m&sup2;</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Mission Duration</span>
						<span class="text-star-white">{output.config.missionDuration} yr</span>
					</div>
				</div>
			</div>

			<!-- Confidence Interval -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">95% Confidence Interval (End-of-Life Efficiency)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint">
						{formatNumber(output.result.confidenceInterval95.efficiencyLower)}%
					</span>
					<span class="text-cosmic-cyan font-semibold">
						{formatNumber(output.result.endOfLifeEfficiency)}%
					</span>
					<span class="text-star-faint">
						{formatNumber(output.result.confidenceInterval95.efficiencyUpper)}%
					</span>
				</div>
				<div class="relative mt-2 h-2 bg-space-600 rounded-full">
					{@const range =
						output.result.confidenceInterval95.efficiencyUpper -
						output.result.confidenceInterval95.efficiencyLower}
					{@const lowerPct =
						(output.result.confidenceInterval95.efficiencyLower / output.config.initialEfficiency) *
						100}
					{@const upperPct =
						(output.result.confidenceInterval95.efficiencyUpper / output.config.initialEfficiency) *
						100}
					{@const meanPct =
						(output.result.endOfLifeEfficiency / output.config.initialEfficiency) * 100}
					<div
						class="absolute h-2 bg-cosmic-cyan/30 rounded-full"
						style="left: {Math.max(0, lowerPct)}%; width: {Math.min(100, upperPct) - Math.max(0, lowerPct)}%"
					></div>
					<div
						class="absolute h-2 w-1 bg-cosmic-cyan rounded-full"
						style="left: {Math.min(99, Math.max(1, meanPct))}%"
					></div>
				</div>
			</div>

			<!-- Shielding Trade-off -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">Shielding Trade-off Analysis</p>
				<p class="text-xs text-star-faint">
					Doubling shielding mass (+{output.result.shieldingTradeoff.massPercentIncrease}%) would
					extend degradation protection by approximately
					<span class="text-solar-gold font-semibold"
						>{formatNumber(output.result.shieldingTradeoff.lifetimePercentIncrease)}%</span
					>.
				</p>
			</div>

			<!-- Replacement Schedule -->
			{#if output.result.replacementSchedule.length > 0}
				<div class="p-4 bg-sun-red/10 border border-sun-red/30 rounded-lg">
					<p class="text-sm text-sun-red font-semibold mb-2">Replacement Needed</p>
					{#each output.result.replacementSchedule as event}
						<p class="text-xs text-star-dim">
							Year {event.year}: {event.reason}
						</p>
					{/each}
				</div>
			{:else}
				<div class="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
					<p class="text-sm text-green-400 font-semibold">No Replacement Required</p>
					<p class="text-xs text-star-dim">
						PV cells expected to remain above 70% efficiency threshold throughout mission.
					</p>
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
			Configure the PV degradation parameters and run the simulation to see results.
		</p>
	{/if}
</div>
