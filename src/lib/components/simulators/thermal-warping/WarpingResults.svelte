<script lang="ts">
	import type {
		WarpingOutput,
		WarpingProgress
	} from '$lib/services/simulation/thermal-warping';
	import {
		PHASED_ARRAY_TOLERANCE,
		STRUCTURAL_TOLERANCE
	} from '$lib/services/simulation/thermal-warping';

	interface Props {
		output: WarpingOutput | null;
		progress: WarpingProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatDeflection(meters: number): string {
		if (meters < 0.001) return `${(meters * 1e6).toFixed(0)} um`;
		if (meters < 0.01) return `${(meters * 1000).toFixed(2)} mm`;
		if (meters < 1) return `${(meters * 100).toFixed(1)} cm`;
		return `${meters.toFixed(2)} m`;
	}

	function formatScientific(n: number): string {
		if (n === 0) return '0';
		const exp = Math.floor(Math.log10(Math.abs(n)));
		const mantissa = n / Math.pow(10, exp);
		return `${mantissa.toFixed(2)}e${exp}`;
	}

	let deflectionStatus = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim' };
		const d = output.result.configuredAreaStats.meanDeflection;
		if (d <= PHASED_ARRAY_TOLERANCE) return { label: 'Excellent', color: 'text-green-400' };
		if (d <= STRUCTURAL_TOLERANCE) return { label: 'Acceptable', color: 'text-solar-gold' };
		return { label: 'Exceeds Tolerance', color: 'text-sun-red' };
	});

	let tensionStatus = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim' };
		const ratio = output.result.configuredAreaStats.meanTensionRatio;
		if (ratio >= 1.0) return { label: 'Fully Flattened', color: 'text-green-400' };
		if (ratio >= 0.5) return { label: 'Partially Effective', color: 'text-solar-gold' };
		return { label: 'Insufficient', color: 'text-sun-red' };
	});
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Simulation Results</h3>

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
		{@const stats = output.result.configuredAreaStats}
		<div class="space-y-6">
			<!-- Key Metrics Grid -->
			<div class="grid grid-cols-2 gap-4">
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Effective Deflection</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatDeflection(stats.meanDeflection)}
					</p>
					<p class="text-xs mt-1 {deflectionStatus.color}">
						{deflectionStatus.label}
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Equilibrium Temp</p>
					<p class="text-2xl font-bold text-solar-gold">
						{stats.meanTemp.toFixed(0)} K
					</p>
					<p class="text-xs text-star-dim mt-1">
						({(stats.meanTemp - 273.15).toFixed(0)} &deg;C)
					</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Thermal Gradient</p>
					<p class="text-2xl font-bold text-star-white">
						{stats.meanGradient.toFixed(2)} K
					</p>
					<p class="text-xs text-star-dim mt-1">front-to-back &Delta;T</p>
				</div>

				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Tension Ratio</p>
					<p class="text-2xl font-bold text-star-white">
						{stats.meanTensionRatio.toFixed(2)}
					</p>
					<p class="text-xs mt-1 {tensionStatus.color}">
						{tensionStatus.label}
					</p>
				</div>
			</div>

			<!-- Curvature -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">Thermoelastic Curvature</p>
				<p class="text-lg font-mono text-star-white">{formatScientific(stats.meanCurvature)} /m</p>
			</div>

			<!-- Tolerance Compliance -->
			<div class="grid grid-cols-2 gap-4">
				<div class="p-4 rounded-lg border {stats.phasedArrayPassRate >= 0.95
					? 'bg-green-500/10 border-green-500/30'
					: stats.phasedArrayPassRate >= 0.5
						? 'bg-yellow-500/10 border-yellow-500/30'
						: 'bg-sun-red/10 border-sun-red/30'}">
					<p class="text-xs font-semibold mb-1 {stats.phasedArrayPassRate >= 0.95
						? 'text-green-400'
						: stats.phasedArrayPassRate >= 0.5
							? 'text-yellow-400'
							: 'text-sun-red'}">
						Phased Array ({(PHASED_ARRAY_TOLERANCE * 1000).toFixed(0)} mm)
					</p>
					<p class="text-lg font-bold {stats.phasedArrayPassRate >= 0.95
						? 'text-green-400'
						: stats.phasedArrayPassRate >= 0.5
							? 'text-yellow-400'
							: 'text-sun-red'}">
						{(stats.phasedArrayPassRate * 100).toFixed(0)}% pass
					</p>
				</div>

				<div class="p-4 rounded-lg border {stats.structuralPassRate >= 0.95
					? 'bg-green-500/10 border-green-500/30'
					: stats.structuralPassRate >= 0.5
						? 'bg-yellow-500/10 border-yellow-500/30'
						: 'bg-sun-red/10 border-sun-red/30'}">
					<p class="text-xs font-semibold mb-1 {stats.structuralPassRate >= 0.95
						? 'text-green-400'
						: stats.structuralPassRate >= 0.5
							? 'text-yellow-400'
							: 'text-sun-red'}">
						Structural ({(STRUCTURAL_TOLERANCE * 100).toFixed(0)} cm)
					</p>
					<p class="text-lg font-bold {stats.structuralPassRate >= 0.95
						? 'text-green-400'
						: stats.structuralPassRate >= 0.5
							? 'text-yellow-400'
							: 'text-sun-red'}">
						{(stats.structuralPassRate * 100).toFixed(0)}% pass
					</p>
				</div>
			</div>

			<!-- Confidence Interval -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">90% Confidence Band (Deflection)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint font-mono">
						{formatDeflection(stats.p5Deflection)}
					</span>
					<span class="text-cosmic-cyan font-semibold">
						{formatDeflection(stats.meanDeflection)}
					</span>
					<span class="text-star-faint font-mono">
						{formatDeflection(stats.p95Deflection)}
					</span>
				</div>
				<div class="flex items-center justify-between text-xs text-star-faint mt-1">
					<span>5th pctile</span>
					<span>mean</span>
					<span>95th pctile</span>
				</div>
			</div>

			<!-- Config Summary -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">Configuration</p>
				<div class="grid grid-cols-2 gap-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-faint">Membrane Area</span>
						<span class="text-star-white">{(output.config.membraneArea / 1000).toFixed(0)}k m&sup2;</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Orbital Distance</span>
						<span class="text-star-white">{output.config.orbitalDistance} AU</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">CTE</span>
						<span class="text-star-white">{(output.config.cte * 1e6).toFixed(0)} ppm/K</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Tension</span>
						<span class="text-star-white">{output.config.tension} N/m</span>
					</div>
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
			Configure membrane parameters and run the simulation to see thermal warping results.
		</p>
	{/if}
</div>
