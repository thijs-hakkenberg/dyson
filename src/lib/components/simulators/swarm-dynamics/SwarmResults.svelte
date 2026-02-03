<script lang="ts">
	import type {
		SwarmDynamicsSimulationOutput,
		SwarmDynamicsProgress
	} from '$lib/services/simulation/swarm-dynamics';

	interface Props {
		output: SwarmDynamicsSimulationOutput | null;
		progress: SwarmDynamicsProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatScientific(n: number, digits: number = 2): string {
		if (n === 0) return '0';
		if (n < 0.001 || n >= 10000) {
			return n.toExponential(digits);
		}
		return n.toFixed(digits);
	}

	function formatNumber(n: number): string {
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
		return n.toFixed(2);
	}

	// Derive status indicators
	let srpStatus = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim' };
		const authority = output.result.srpControlAuthority;
		if (authority >= 1.5) return { label: 'Excellent', color: 'text-green-400' };
		if (authority >= 1.0) return { label: 'Sufficient', color: 'text-solar-gold' };
		if (authority >= 0.5) return { label: 'Marginal', color: 'text-orange-400' };
		return { label: 'Insufficient', color: 'text-sun-red' };
	});

	let collisionRisk = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim' };
		const prob = output.result.collisionProbPerUnitYear;
		if (prob < 1e-9) return { label: 'Negligible', color: 'text-green-400' };
		if (prob < 1e-6) return { label: 'Low', color: 'text-solar-gold' };
		if (prob < 1e-3) return { label: 'Moderate', color: 'text-orange-400' };
		return { label: 'High', color: 'text-sun-red' };
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
				{#if progress.propulsionType}
					<span class="ml-2 text-star-dim">({progress.propulsionType})</span>
				{/if}
			</p>
		</div>
	{:else if output}
		<div class="space-y-6">
			<!-- Key Metrics Grid -->
			<div class="grid grid-cols-2 gap-4">
				<!-- SRP Control Authority -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">SRP Control Authority</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{(output.result.srpControlAuthority * 100).toFixed(0)}%
					</p>
					<p class="text-xs mt-1 {srpStatus.color}">
						{srpStatus.label}
					</p>
				</div>

				<!-- Collision Probability -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Collision Prob/Unit/Year</p>
					<p class="text-2xl font-bold text-solar-gold">
						{formatScientific(output.result.collisionProbPerUnitYear)}
					</p>
					<p class="text-xs mt-1 {collisionRisk.color}">
						Risk: {collisionRisk.label}
					</p>
				</div>

				<!-- Delta-V Budget -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Delta-V Budget</p>
					<p class="text-lg font-bold text-star-white">
						<span class="text-cosmic-cyan">{output.result.srpDeltaVPerYear.toFixed(1)}</span>
						<span class="text-star-dim">/</span>
						<span class="text-sun-red">{output.result.requiredDeltaVPerYear.toFixed(1)}</span>
						<span class="text-xs text-star-faint ml-1">m/s/yr</span>
					</p>
					<p class="text-xs text-star-dim mt-1">available / required</p>
				</div>

				<!-- Safe Spacing -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Safe Spacing (1e-6)</p>
					<p class="text-2xl font-bold text-star-white">
						{formatNumber(output.result.safeSpacingM)} m
					</p>
					<p class="text-xs text-star-dim mt-1">for 1 in 1M collision prob</p>
				</div>

				<!-- Mission Lifetime -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Mission Lifetime</p>
					<p class="text-2xl font-bold text-star-white">
						{output.result.missionLifetimeYears.toFixed(1)} yr
					</p>
					<p class="text-xs text-star-dim mt-1">
						&plusmn;{output.result.missionLifetimeStdDev.toFixed(1)} yr (1&sigma;)
					</p>
				</div>

				<!-- Velocity Uncertainty -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Velocity Uncertainty</p>
					<p class="text-2xl font-bold text-star-white">
						{formatScientific(output.result.velocityUncertaintyMs, 3)} m/s
					</p>
					<p class="text-xs text-star-dim mt-1">RMS between corrections</p>
				</div>
			</div>

			<!-- SRP Sufficiency -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<div class="flex items-center justify-between mb-2">
					<p class="text-sm text-star-dim">SRP Authority Sufficient</p>
					<p class="text-sm font-semibold {output.result.srpSufficientPct >= 90 ? 'text-green-400' : output.result.srpSufficientPct >= 50 ? 'text-solar-gold' : 'text-sun-red'}">
						{output.result.srpSufficientPct.toFixed(0)}% of runs
					</p>
				</div>
				<div class="relative h-2 bg-space-600 rounded-full overflow-hidden">
					<div
						class="absolute h-2 rounded-full transition-all {output.result.srpSufficientPct >= 90 ? 'bg-green-400' : output.result.srpSufficientPct >= 50 ? 'bg-solar-gold' : 'bg-sun-red'}"
						style="width: {output.result.srpSufficientPct}%"
					></div>
				</div>
			</div>

			<!-- Collision Probability CI -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">95% Confidence Interval (Collision Probability)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint">
						{formatScientific(output.result.confidenceInterval95.collisionProbLower)}
					</span>
					<span class="text-solar-gold font-semibold">
						{formatScientific(output.result.collisionProbPerUnitYear)}
					</span>
					<span class="text-star-faint">
						{formatScientific(output.result.confidenceInterval95.collisionProbUpper)}
					</span>
				</div>
				<div class="relative mt-2 h-2 bg-space-600 rounded-full">
					<div
						class="absolute h-2 bg-solar-gold/30 rounded-full"
						style="left: 10%; right: 10%"
					></div>
					<div
						class="absolute h-2 w-1 bg-solar-gold rounded-full"
						style="left: 50%; transform: translateX(-50%)"
					></div>
				</div>
			</div>

			<!-- Expected Collisions -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<div class="flex items-center justify-between">
					<span class="text-sm text-star-dim">Expected Collisions (simulation period)</span>
					<span class="text-sm font-semibold text-star-white">
						{output.result.totalCollisions.toFixed(2)}
					</span>
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
			Configure the swarm parameters and run the simulation to see results.
		</p>
	{/if}
</div>
