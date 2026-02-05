<script lang="ts">
	import type {
		ElectricalFaultSimulationOutput,
		ElectricalFaultProgress
	} from '$lib/services/simulation/electrical-fault';

	interface Props {
		output: ElectricalFaultSimulationOutput | null;
		progress: ElectricalFaultProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatNumber(n: number, decimals: number = 1): string {
		if (n >= 1e6) return (n / 1e6).toFixed(decimals) + 'M';
		if (n >= 1e3) return (n / 1e3).toFixed(decimals) + 'k';
		return n.toFixed(decimals);
	}

	function formatProbability(p: number): string {
		if (p < 0.0001) return '<0.01%';
		if (p >= 1) return '>99.99%';
		return (p * 100).toFixed(2) + '%';
	}

	// Derive status indicators
	let riskStatus = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim' };
		const risk = output.result.faultPropagationRisk;
		if (risk === 'low') return { label: 'Low Risk', color: 'text-green-400' };
		if (risk === 'medium') return { label: 'Medium Risk', color: 'text-solar-gold' };
		return { label: 'High Risk', color: 'text-sun-red' };
	});

	let arcProbStatus = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim' };
		const prob = output.result.arcProbabilityPerYear;
		if (prob < 0.001) return { label: 'Excellent', color: 'text-green-400' };
		if (prob < 0.01) return { label: 'Good', color: 'text-solar-gold' };
		if (prob < 0.1) return { label: 'Marginal', color: 'text-orange-400' };
		return { label: 'Poor', color: 'text-sun-red' };
	});

	let mtbfYears = $derived.by(() => {
		if (!output) return 0;
		return output.result.meanTimeBetweenFaults / 8760; // Convert hours to years
	});

	let materialLabel = $derived.by(() => {
		if (!output) return '';
		const labels: Record<string, string> = {
			kapton: 'Kapton',
			polyimide: 'Polyimide',
			teflon: 'Teflon (PTFE)',
			ceramic: 'Ceramic'
		};
		return labels[output.config.insulationMaterial] || output.config.insulationMaterial;
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
				{#if progress.currentMaterial}
					<span class="ml-2 text-star-dim">({progress.currentMaterial})</span>
				{/if}
			</p>
		</div>
	{:else if output}
		<div class="space-y-6">
			<!-- Key Metrics Grid -->
			<div class="grid grid-cols-2 gap-4">
				<!-- Arc Probability -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Arc Probability/Year</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatProbability(output.result.arcProbabilityPerYear)}
					</p>
					<p class="text-xs mt-1 {arcProbStatus.color}">
						{arcProbStatus.label}
					</p>
				</div>

				<!-- MTBF -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Mean Time Between Faults</p>
					<p class="text-2xl font-bold text-solar-gold">
						{mtbfYears.toFixed(1)} yr
					</p>
					<p class="text-xs text-star-dim mt-1">
						({formatNumber(output.result.meanTimeBetweenFaults)} hours)
					</p>
				</div>

				<!-- Fault Propagation Risk -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Propagation Risk</p>
					<p class="text-2xl font-bold {riskStatus.color}">
						{riskStatus.label}
					</p>
					<p class="text-xs text-star-dim mt-1">
						Required isolation: {output.result.requiredIsolationTime.toFixed(0)} ms
					</p>
				</div>

				<!-- Std Dev -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Arc Prob Uncertainty</p>
					<p class="text-2xl font-bold text-star-white">
						+/-{(output.result.arcProbabilityStdDev * 100).toFixed(2)}%
					</p>
					<p class="text-xs text-star-dim mt-1">1-sigma variation</p>
				</div>
			</div>

			<!-- Configuration Summary -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">Configuration</p>
				<div class="grid grid-cols-2 gap-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-faint">Voltage</span>
						<span class="text-star-white">{output.config.voltageLevel.toLocaleString()}V</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Orbital Distance</span>
						<span class="text-star-white">{output.config.orbitalDistance} AU</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Insulation</span>
						<span class="text-star-white">{materialLabel}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Thickness</span>
						<span class="text-star-white">{output.config.insulationThickness} mm</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Topology</span>
						<span class="text-star-white capitalize">{output.config.systemTopology}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Power Capacity</span>
						<span class="text-star-white">{output.config.totalPowerCapacity} MW</span>
					</div>
				</div>
			</div>

			<!-- Confidence Interval -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">95% Confidence Interval (Arc Probability)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint">
						{formatProbability(output.result.confidenceInterval95.arcProbLower)}
					</span>
					<span class="text-cosmic-cyan font-semibold">
						{formatProbability(output.result.arcProbabilityPerYear)}
					</span>
					<span class="text-star-faint">
						{formatProbability(output.result.confidenceInterval95.arcProbUpper)}
					</span>
				</div>
				<div class="relative mt-2 h-2 bg-space-600 rounded-full">
					{@const range = output.result.confidenceInterval95.arcProbUpper - output.result.confidenceInterval95.arcProbLower}
					{@const lowerPct = output.result.confidenceInterval95.arcProbLower * 100}
					{@const upperPct = output.result.confidenceInterval95.arcProbUpper * 100}
					{@const meanPct = output.result.arcProbabilityPerYear * 100}
					{@const scale = 100 / Math.max(upperPct, 1)}
					<div
						class="absolute h-2 bg-cosmic-cyan/30 rounded-full"
						style="left: {Math.max(0, lowerPct * scale)}%; width: {(upperPct - lowerPct) * scale}%"
					></div>
					<div
						class="absolute h-2 w-1 bg-cosmic-cyan rounded-full"
						style="left: {Math.min(99, Math.max(1, meanPct * scale))}%"
					></div>
				</div>
			</div>

			<!-- Insulation Mass Tradeoff -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-3">Insulation Material Trade-off</p>
				<div class="space-y-2">
					{#each output.result.insulationMassTradeoff as entry}
						{@const isSelected = entry.material === output.config.insulationMaterial}
						<div class="flex items-center justify-between text-xs {isSelected ? 'text-cosmic-cyan' : 'text-star-faint'}">
							<span class="capitalize w-20">{entry.material}</span>
							<div class="flex-1 mx-2 h-2 bg-space-600 rounded-full overflow-hidden">
								<div
									class="h-2 {isSelected ? 'bg-cosmic-cyan' : 'bg-space-400'} rounded-full"
									style="width: {entry.reliability * 100}%"
								></div>
							</div>
							<span class="w-16 text-right">{(entry.reliability * 100).toFixed(0)}% rel.</span>
							<span class="w-20 text-right">{entry.massPerMW.toFixed(1)} kg/MW</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Recommended Voltage by Orbit -->
			{#if output.result.recommendedVoltageByOrbit.length > 0}
				<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
					<p class="text-sm text-star-dim mb-2">Recommended Max Voltage by Orbit</p>
					<div class="grid grid-cols-4 gap-2 text-xs">
						{#each output.result.recommendedVoltageByOrbit as rec}
							<div class="text-center p-2 bg-space-700/50 rounded">
								<p class="text-star-faint">{rec.au} AU</p>
								<p class="text-star-white font-mono">{(rec.maxVoltage / 1000).toFixed(1)}kV</p>
							</div>
						{/each}
					</div>
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
			Configure the electrical fault parameters and run the simulation to see results.
		</p>
	{/if}
</div>
