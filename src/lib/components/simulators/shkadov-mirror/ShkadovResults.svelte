<script lang="ts">
	import type { ShkadovResult, ShkadovProgress } from '$lib/services/simulation/shkadov-mirror';

	interface Props {
		output: ShkadovResult | null;
		progress: ShkadovProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatThrust(n: number): string {
		if (n >= 1e9) return (n / 1e9).toFixed(2) + ' GN';
		if (n >= 1e6) return (n / 1e6).toFixed(2) + ' MN';
		if (n >= 1e3) return (n / 1e3).toFixed(2) + ' kN';
		return n.toFixed(2) + ' N';
	}

	function formatMass(kg: number): string {
		if (kg >= 1e12) return (kg / 1e12).toFixed(2) + ' Tt';
		if (kg >= 1e9) return (kg / 1e9).toFixed(2) + ' Gt';
		if (kg >= 1e6) return (kg / 1e6).toFixed(2) + ' Mt';
		if (kg >= 1e3) return (kg / 1e3).toFixed(2) + ' kt';
		return kg.toFixed(2) + ' kg';
	}

	function formatArea(m2: number): string {
		const km2 = m2 / 1e6;
		if (km2 >= 1e6) return (km2 / 1e6).toFixed(2) + ' M km²';
		if (km2 >= 1e3) return (km2 / 1e3).toFixed(2) + ' k km²';
		return km2.toFixed(2) + ' km²';
	}

	function formatCost(usd: number): string {
		if (usd >= 1e15) return '$' + (usd / 1e15).toFixed(1) + ' quadrillion';
		if (usd >= 1e12) return '$' + (usd / 1e12).toFixed(1) + 'T';
		if (usd >= 1e9) return '$' + (usd / 1e9).toFixed(1) + 'B';
		if (usd >= 1e6) return '$' + (usd / 1e6).toFixed(1) + 'M';
		return '$' + usd.toFixed(0);
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Trade Study Results</h3>

	{#if isRunning && progress}
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<span class="spinner w-5 h-5"></span>
				<span class="text-star-dim">
					Evaluating distance {progress.currentStep} of {progress.totalSteps}...
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
			<!-- Optimal Distance -->
			<div class="p-4 bg-cosmic-cyan/10 border border-cosmic-cyan/30 rounded-lg">
				<p class="text-xs text-star-faint uppercase tracking-wider mb-1">Optimal Standoff Distance</p>
				<p class="text-2xl font-bold text-cosmic-cyan">
					{output.optimalDistance.toFixed(2)} AU
				</p>
				<p class="text-sm text-star-dim mt-1">
					Maximum feasible thrust at this distance
				</p>
			</div>

			<!-- Key Metrics Grid -->
			<div class="grid grid-cols-2 gap-3">
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Max Feasible Thrust</p>
					<p class="text-star-white font-semibold">{formatThrust(output.maxFeasibleThrust)}</p>
				</div>
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Mirror Mass</p>
					<p class="text-star-white font-semibold">{formatMass(output.analysis.optimalMirrorMass)}</p>
				</div>
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Equilibrium Temp</p>
					<p class="text-star-white font-semibold">{output.analysis.optimalTemp.toFixed(0)} K</p>
				</div>
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Mirror Area</p>
					<p class="text-star-white font-semibold">{formatArea(output.analysis.optimalMirrorArea)}</p>
				</div>
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Insolation Reduction</p>
					<p class="text-star-white font-semibold">
						{(output.analysis.optimalInsolationReduction * 100).toFixed(2)}%
					</p>
				</div>
				<div class="p-3 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint">Material</p>
					<p class="text-star-white font-semibold text-xs">{output.analysis.materialRecommendation}</p>
				</div>
			</div>

			<!-- Statite Status -->
			<div class="p-3 rounded-lg border {output.analysis.isAboveStatiteLimit
				? 'bg-sun-red/10 border-sun-red/30'
				: 'bg-cosmic-cyan/10 border-cosmic-cyan/30'}">
				<div class="flex items-center gap-2">
					<span class="text-xs {output.analysis.isAboveStatiteLimit ? 'text-sun-red' : 'text-cosmic-cyan'}">
						{#if output.analysis.isAboveStatiteLimit}
							Above statite limit -- requires active station-keeping
						{:else}
							Below statite limit -- can float as a statite
						{/if}
					</span>
				</div>
				<p class="text-xs text-star-faint mt-1">
					Critical density: {output.analysis.criticalArealDensity.toFixed(2)} g/m²
				</p>
			</div>

			<!-- Feasibility Summary -->
			<div class="border-t border-space-600 pt-4">
				<p class="text-sm text-star-dim mb-2">Feasibility Across Distances</p>
				<div class="flex gap-1">
					{#each output.tradePoints as point}
						<div
							class="flex-1 h-4 rounded-sm {point.isThermallyFeasible ? 'bg-cosmic-cyan/40' : 'bg-sun-red/40'}"
							title="{point.distance.toFixed(2)} AU: {point.isThermallyFeasible ? 'Feasible' : 'Infeasible'} ({point.equilibriumTemp.toFixed(0)} K)"
						></div>
					{/each}
				</div>
				<div class="flex justify-between text-xs text-star-faint mt-1">
					<span>0.1 AU</span>
					<span>1.0 AU</span>
					<span>2.0 AU</span>
				</div>
				<div class="flex gap-4 mt-2 text-xs">
					<div class="flex items-center gap-1">
						<div class="w-3 h-3 rounded-sm bg-cosmic-cyan/40"></div>
						<span class="text-star-faint">Feasible</span>
					</div>
					<div class="flex items-center gap-1">
						<div class="w-3 h-3 rounded-sm bg-sun-red/40"></div>
						<span class="text-star-faint">Infeasible</span>
					</div>
				</div>
			</div>

			<!-- Execution Stats -->
			<div class="text-xs text-star-faint flex justify-between border-t border-space-600 pt-3">
				<span>Trade points: {output.tradePoints.length}</span>
				<span>Execution: {(output.executionTimeMs / 1000).toFixed(2)}s</span>
			</div>
		</div>
	{:else}
		<p class="text-star-dim text-sm">
			Configure mirror parameters and run the trade study to see results.
		</p>
	{/if}
</div>
