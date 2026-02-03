<script lang="ts">
	import type {
		OrbitalTradeSimulationOutput,
		OrbitalTradeProgress,
		LocationStats
	} from '$lib/services/simulation/orbital-trade';
	import { ORBITAL_LOCATIONS } from '$lib/services/simulation/orbital-trade';

	interface Props {
		output: OrbitalTradeSimulationOutput | null;
		progress: OrbitalTradeProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	// Get human-readable name for a location
	function getLocationName(locationId: string): string {
		const data = ORBITAL_LOCATIONS[locationId as keyof typeof ORBITAL_LOCATIONS];
		return data?.name ?? locationId;
	}

	// Get short name for display
	function getShortName(locationId: string): string {
		const names: Record<string, string> = {
			'nrho': 'NRHO',
			'sun_earth_l1': 'SE-L1',
			'sun_earth_l4': 'SE-L4',
			'sun_earth_l5': 'SE-L5',
			'helio_1au': '1.0 AU',
			'helio_0p7au': '0.7 AU',
			'helio_0p5au': '0.5 AU',
			'sun_mercury_l1': 'Hg-L1'
		};
		return names[locationId] ?? locationId;
	}

	function formatPercent(n: number): string {
		return `${(n * 100).toFixed(0)}%`;
	}

	function formatNumber(n: number): string {
		return n.toFixed(2);
	}

	// Get color class based on score
	function getScoreColor(score: number): string {
		if (score >= 0.7) return 'text-cosmic-cyan';
		if (score >= 0.5) return 'text-solar-gold';
		if (score >= 0.3) return 'text-star-dim';
		return 'text-sun-red';
	}

	// Sort locations by recommendation frequency
	let sortedStats = $derived.by(() => {
		if (!output) return [];
		return [...output.locationStats].sort((a, b) => {
			if (Math.abs(a.recommendationFrequency - b.recommendationFrequency) > 0.05) {
				return b.recommendationFrequency - a.recommendationFrequency;
			}
			return b.meanScore - a.meanScore;
		});
	});
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Analysis Results</h3>

	{#if isRunning && progress}
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<span class="spinner w-5 h-5"></span>
				<span class="text-star-dim">
					Running iteration {progress.currentRun} of {progress.totalRuns}...
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
			<!-- Recommendation -->
			<div class="p-4 bg-cosmic-cyan/10 border border-cosmic-cyan/30 rounded-lg">
				<p class="text-xs text-star-faint uppercase tracking-wider mb-1">Recommended Location</p>
				<p class="text-2xl font-bold text-cosmic-cyan">
					{getLocationName(output.recommendation)}
				</p>
				<p class="text-sm text-star-dim mt-1">
					{ORBITAL_LOCATIONS[output.recommendation].distanceAU} AU from Sun
				</p>
			</div>

			<!-- Robust Pareto Frontier -->
			<div>
				<p class="text-sm text-star-dim mb-2">Pareto-Optimal Locations (robust)</p>
				<div class="flex flex-wrap gap-2">
					{#each output.robustParetoFrontier as location}
						<span class="px-2 py-1 text-xs rounded bg-solar-gold/20 text-solar-gold border border-solar-gold/30">
							{getShortName(location)}
						</span>
					{/each}
				</div>
			</div>

			<!-- Location Rankings -->
			<div>
				<p class="text-sm text-star-dim mb-3">Location Rankings</p>
				<div class="space-y-2">
					{#each sortedStats as stat, i}
						{@const isRecommended = stat.location === output.recommendation}
						{@const isPareto = output.robustParetoFrontier.includes(stat.location)}
						<div
							class="p-3 rounded-lg border transition-colors {isRecommended
								? 'bg-cosmic-cyan/10 border-cosmic-cyan/30'
								: isPareto
									? 'bg-solar-gold/5 border-solar-gold/20'
									: 'bg-space-700/50 border-space-600'}"
						>
							<div class="flex items-center justify-between mb-2">
								<div class="flex items-center gap-2">
									<span class="text-star-faint text-xs w-5">#{i + 1}</span>
									<span class="text-star-white font-medium text-sm">
										{getShortName(stat.location)}
									</span>
									{#if isRecommended}
										<span class="px-1.5 py-0.5 text-xs bg-cosmic-cyan text-space-900 rounded font-semibold">
											TOP
										</span>
									{/if}
									{#if isPareto && !isRecommended}
										<span class="px-1.5 py-0.5 text-xs bg-solar-gold/20 text-solar-gold rounded">
											Pareto
										</span>
									{/if}
								</div>
								<span class={`text-sm font-semibold ${getScoreColor(stat.meanScore)}`}>
									{formatNumber(stat.meanScore)}
								</span>
							</div>

							<div class="grid grid-cols-3 gap-2 text-xs">
								<div>
									<span class="text-star-faint">Recommend</span>
									<p class="text-star-white">{formatPercent(stat.recommendationFrequency)}</p>
								</div>
								<div>
									<span class="text-star-faint">Pareto</span>
									<p class="text-star-white">{formatPercent(stat.paretoFrequency)}</p>
								</div>
								<div>
									<span class="text-star-faint">95% CI</span>
									<p class="text-star-white">
										{formatNumber(stat.confidenceInterval95.lower)}-{formatNumber(stat.confidenceInterval95.upper)}
									</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Delta-V Matrix Summary -->
			{#if output.deltaVMatrix.length > 0}
				{@const recData = ORBITAL_LOCATIONS[output.recommendation]}
				<div class="border-t border-space-600 pt-4">
					<p class="text-sm text-star-dim mb-2">Key Transfer Costs</p>
					<div class="grid grid-cols-2 gap-2 text-xs">
						<div class="p-2 bg-space-700/50 rounded">
							<span class="text-star-faint">Earth to {getShortName(output.recommendation)}</span>
							<p class="text-star-white font-medium">
								{recData.deltaVFromEarth.toFixed(1)} km/s
							</p>
						</div>
						<div class="p-2 bg-space-700/50 rounded">
							<span class="text-star-faint">Comm Latency</span>
							<p class="text-star-white font-medium">
								{recData.commLatencyMinutes.toFixed(1)} min (1-way)
							</p>
						</div>
						<div class="p-2 bg-space-700/50 rounded">
							<span class="text-star-faint">Solar Flux</span>
							<p class="text-star-white font-medium">
								{recData.solarFluxMultiplier.toFixed(2)}x (1 AU)
							</p>
						</div>
						<div class="p-2 bg-space-700/50 rounded">
							<span class="text-star-faint">Stability</span>
							<p class="text-star-white font-medium capitalize">
								{recData.stabilityClass.replace('_', ' ')}
							</p>
						</div>
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
			Configure the trade parameters and run the analysis to see results.
		</p>
	{/if}
</div>
