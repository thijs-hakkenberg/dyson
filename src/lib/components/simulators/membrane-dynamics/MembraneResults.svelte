<script lang="ts">
	import type {
		MembraneOutput,
		MembraneProgress
	} from '$lib/services/simulation/membrane-dynamics';

	interface Props {
		output: MembraneOutput | null;
		progress: MembraneProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatFrequency(hz: number): string {
		if (hz < 0.001) return (hz * 1e6).toFixed(1) + ' uHz';
		if (hz < 1) return (hz * 1000).toFixed(2) + ' mHz';
		return hz.toFixed(3) + ' Hz';
	}

	// Stability color mapping
	let stabilityDisplay = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim', bg: 'bg-space-700/50' };
		const s = output.result.modalResult.stability;
		if (s === 'stable') return { label: 'Stable', color: 'text-green-400', bg: 'bg-green-500/10' };
		if (s === 'marginal') return { label: 'Marginal', color: 'text-solar-gold', bg: 'bg-solar-gold/10' };
		return { label: 'Flutter', color: 'text-sun-red', bg: 'bg-sun-red/10' };
	});

	// First 5 mode frequencies
	let modeSpectrum = $derived.by(() => {
		if (!output) return [];
		return output.result.modalResult.naturalFrequencies.slice(0, 5);
	});
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Analysis Results</h3>

	{#if isRunning && progress}
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<span class="spinner w-5 h-5"></span>
				<span class="text-star-dim">
					{progress.phase ?? 'Running'}: {progress.currentRun} of {progress.totalRuns}
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
			<!-- Stability Classification (prominent) -->
			<div class="p-4 rounded-lg border {stabilityDisplay.bg} {output.result.modalResult.stability === 'stable' ? 'border-green-500/30' : output.result.modalResult.stability === 'marginal' ? 'border-solar-gold/30' : 'border-sun-red/30'}">
				<div class="flex items-center justify-between">
					<div>
						<p class="text-xs text-star-faint uppercase tracking-wider">Stability Classification</p>
						<p class="text-3xl font-bold {stabilityDisplay.color}">
							{stabilityDisplay.label}
						</p>
					</div>
					<div class="text-right">
						<p class="text-xs text-star-faint">Flutter Margin</p>
						<p class="text-2xl font-bold {stabilityDisplay.color}">
							{output.result.modalResult.flutterMargin.toFixed(2)}x
						</p>
					</div>
				</div>
			</div>

			<!-- Key Metrics Grid -->
			<div class="grid grid-cols-2 gap-4">
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Lowest Frequency</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatFrequency(output.result.meanLowestFrequency)}
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Effective Tension</p>
					<p class="text-2xl font-bold text-solar-gold">
						{output.result.modalResult.effectiveTension.toFixed(3)} N/m
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">SRP Force</p>
					<p class="text-2xl font-bold text-star-white">
						{(output.result.modalResult.srpForcePerArea * 1e6).toFixed(2)} uN/m&sup2;
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Data Source</p>
					<p class="text-lg font-bold {output.usedPrecomputed ? 'text-cosmic-cyan' : 'text-solar-gold'}">
						{output.usedPrecomputed ? 'Pre-computed' : 'Analytical'}
					</p>
					<p class="text-xs text-star-faint mt-1">
						{output.usedPrecomputed ? 'FE grid interpolation' : 'Plate theory fallback'}
					</p>
				</div>
			</div>

			<!-- Monte Carlo Statistics -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-3">Stability Statistics ({output.runs} runs)</p>
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						<div class="flex-1">
							<div class="flex justify-between text-xs mb-1">
								<span class="text-green-400">Stable</span>
								<span class="text-star-white">{(output.result.stableFraction * 100).toFixed(0)}%</span>
							</div>
							<div class="w-full bg-space-600 rounded-full h-2">
								<div class="bg-green-400 h-2 rounded-full" style="width: {output.result.stableFraction * 100}%"></div>
							</div>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<div class="flex-1">
							<div class="flex justify-between text-xs mb-1">
								<span class="text-solar-gold">Marginal</span>
								<span class="text-star-white">{(output.result.marginalFraction * 100).toFixed(0)}%</span>
							</div>
							<div class="w-full bg-space-600 rounded-full h-2">
								<div class="bg-solar-gold h-2 rounded-full" style="width: {output.result.marginalFraction * 100}%"></div>
							</div>
						</div>
					</div>
					<div class="flex items-center gap-2">
						<div class="flex-1">
							<div class="flex justify-between text-xs mb-1">
								<span class="text-sun-red">Flutter</span>
								<span class="text-star-white">{(output.result.flutterFraction * 100).toFixed(0)}%</span>
							</div>
							<div class="w-full bg-space-600 rounded-full h-2">
								<div class="bg-sun-red h-2 rounded-full" style="width: {output.result.flutterFraction * 100}%"></div>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-3 pt-3 border-t border-space-600 text-xs text-star-faint">
					Mean flutter margin: {output.result.meanFlutterMargin.toFixed(2)}x
					(+/- {output.result.stdDevFlutterMargin.toFixed(2)})
				</div>
			</div>

			<!-- Mode Spectrum -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-3">Mode Spectrum (first 5 modes)</p>
				<div class="space-y-2">
					{#each modeSpectrum as freq, i}
						{@const maxFreq = modeSpectrum[modeSpectrum.length - 1] || 1}
						<div class="flex items-center justify-between text-xs">
							<span class="text-star-faint">Mode {i + 1}</span>
							<div class="flex-1 mx-3">
								<div class="w-full bg-space-600 rounded-full h-1.5">
									<div
										class="bg-cosmic-cyan h-1.5 rounded-full"
										style="width: {(freq / maxFreq) * 100}%"
									></div>
								</div>
							</div>
							<span class="text-star-white font-mono w-24 text-right">{formatFrequency(freq)}</span>
						</div>
					{/each}
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
			Configure the membrane parameters and run the simulation to see stability analysis results.
		</p>
	{/if}
</div>
