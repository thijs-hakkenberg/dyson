<script lang="ts">
	import type {
		DeploymentOutput,
		DeploymentProgress
	} from '$lib/services/simulation/deployment-reliability';

	interface Props {
		output: DeploymentOutput | null;
		progress: DeploymentProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatNumber(n: number, decimals: number = 1): string {
		return n.toFixed(decimals);
	}

	// Derive status indicators
	let reliabilityStatus = $derived.by(() => {
		if (!output) return { label: 'Unknown', color: 'text-star-dim' };
		const grade = output.result.reliabilityGrade;
		switch (grade) {
			case 'A':
				return { label: 'Excellent', color: 'text-green-400' };
			case 'B':
				return { label: 'Good', color: 'text-solar-gold' };
			case 'C':
				return { label: 'Acceptable', color: 'text-orange-400' };
			case 'D':
				return { label: 'Marginal', color: 'text-sun-red' };
			default:
				return { label: 'Poor', color: 'text-red-600' };
		}
	});

	let mechanismLabel = $derived.by(() => {
		if (!output) return '';
		const labels: Record<string, string> = {
			inflatable: 'Inflatable',
			'motor-driven': 'Motor-driven',
			centrifugal: 'Centrifugal',
			'shape-memory': 'Shape-memory',
			hybrid: 'Hybrid'
		};
		return labels[output.config.deploymentMechanism] || output.config.deploymentMechanism;
	});

	// Calculate dominant failure mode
	let dominantFailureMode = $derived.by(() => {
		if (!output) return null;
		const breakdown = output.result.stats.failureModeBreakdown;
		const entries = Object.entries(breakdown).filter(([, count]) => count > 0);
		if (entries.length === 0) return null;
		entries.sort(([, a], [, b]) => b - a);
		return { mode: entries[0][0], count: entries[0][1] };
	});

	// Format failure mode name
	function formatFailureMode(mode: string): string {
		const names: Record<string, string> = {
			stuck: 'Stuck mechanism',
			tear: 'Membrane tear',
			misalignment: 'Misalignment',
			'thermal-warp': 'Thermal warp',
			partial: 'Partial deployment',
			oscillation: 'Oscillation damage'
		};
		return names[mode] || mode;
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
			<p class="text-sm text-star-faint">
				{progress.percentComplete.toFixed(0)}% complete
				{#if progress.mechanism}
					<span class="ml-2 text-star-dim">({progress.mechanism})</span>
				{/if}
			</p>
		</div>
	{:else if output}
		<div class="space-y-6">
			<!-- Key Metrics Grid -->
			<div class="grid grid-cols-2 gap-4">
				<!-- Success Rate -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Success Rate</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatNumber(output.result.stats.successRate)}%
					</p>
					<p class="text-xs mt-1 {reliabilityStatus.color}">
						Grade: {output.result.reliabilityGrade} ({reliabilityStatus.label})
					</p>
				</div>

				<!-- Deployment Time -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Mean Deploy Time</p>
					<p class="text-2xl font-bold text-solar-gold">
						{formatNumber(output.result.stats.meanDeploymentTime)} min
					</p>
					<p class="text-xs text-star-dim mt-1">
						95th pctl: {formatNumber(output.result.stats.deploymentTime95Percentile)} min
					</p>
				</div>

				<!-- Attempts Needed -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Avg Attempts</p>
					<p class="text-2xl font-bold text-star-white">
						{formatNumber(output.result.stats.meanAttemptsNeeded, 2)}
					</p>
					<p class="text-xs text-star-dim mt-1">
						of {output.config.maxAttempts} allowed
					</p>
				</div>

				<!-- Area Fraction -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Deployed Area</p>
					<p class="text-2xl font-bold text-star-white">
						{formatNumber(output.result.stats.meanDeployedAreaFraction * 100, 0)}%
					</p>
					<p class="text-xs text-star-dim mt-1">of target area</p>
				</div>
			</div>

			<!-- Configuration Summary -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">Configuration</p>
				<div class="grid grid-cols-2 gap-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-faint">Mechanism</span>
						<span class="text-star-white">{mechanismLabel}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Membrane Area</span>
						<span class="text-star-white">{output.config.membraneArea.toLocaleString()} m&sup2;</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Speed</span>
						<span class="text-star-white capitalize">{output.config.deploymentSpeed}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Temp Range</span>
						<span class="text-star-white">
							{output.config.minTemperature}&deg; to {output.config.maxTemperature}&deg;C
						</span>
					</div>
				</div>
			</div>

			<!-- Confidence Interval -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">95% Confidence Interval (Success Rate)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint">
						{formatNumber(output.result.confidenceInterval95.lower)}%
					</span>
					<span class="text-cosmic-cyan font-semibold">
						{formatNumber(output.result.stats.successRate)}%
					</span>
					<span class="text-star-faint">
						{formatNumber(output.result.confidenceInterval95.upper)}%
					</span>
				</div>
				<div class="relative mt-2 h-2 bg-space-600 rounded-full">
					{#if true}
						{@const lowerPct = output.result.confidenceInterval95.lower}
						{@const upperPct = output.result.confidenceInterval95.upper}
						{@const meanPct = output.result.stats.successRate}
						<div
							class="absolute h-2 bg-cosmic-cyan/30 rounded-full"
							style="left: {Math.max(0, lowerPct)}%; width: {Math.min(100, upperPct) - Math.max(0, lowerPct)}%"
						></div>
						<div
							class="absolute h-2 w-1 bg-cosmic-cyan rounded-full"
							style="left: {Math.min(99, Math.max(1, meanPct))}%"
						></div>
					{/if}
				</div>
			</div>

			<!-- Failure Mode Breakdown -->
			{#if dominantFailureMode}
				<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
					<p class="text-sm text-star-dim mb-3">Failure Mode Breakdown</p>
					<div class="space-y-2">
						{#each Object.entries(output.result.stats.failureModeBreakdown).filter(([, count]) => count > 0).sort(([, a], [, b]) => b - a) as [mode, count]}
							{@const percentage = (count / output.runs) * 100}
							<div class="flex items-center gap-2">
								<span class="text-xs text-star-faint w-32">{formatFailureMode(mode)}</span>
								<div class="flex-1 h-2 bg-space-600 rounded-full">
									<div
										class="h-2 bg-sun-red/70 rounded-full"
										style="width: {percentage}%"
									></div>
								</div>
								<span class="text-xs text-star-dim w-12 text-right">{count}</span>
							</div>
						{/each}
					</div>
					<div class="mt-3 pt-3 border-t border-space-600 grid grid-cols-3 gap-2 text-xs">
						<div>
							<span class="text-star-faint">Mechanical</span>
							<span class="ml-2 text-star-white">{output.result.stats.failuresByCategory.mechanical}</span>
						</div>
						<div>
							<span class="text-star-faint">Thermal</span>
							<span class="ml-2 text-star-white">{output.result.stats.failuresByCategory.thermal}</span>
						</div>
						<div>
							<span class="text-star-faint">Structural</span>
							<span class="ml-2 text-star-white">{output.result.stats.failuresByCategory.structural}</span>
						</div>
					</div>
				</div>
			{:else}
				<div class="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
					<p class="text-sm text-green-400 font-semibold">No Failures Recorded</p>
					<p class="text-xs text-star-dim">
						All deployments completed successfully in this simulation run.
					</p>
				</div>
			{/if}

			<!-- Recommendation -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">Recommendation</p>
				<p class="text-sm text-star-white">{output.result.recommendation}</p>
			</div>

			<!-- Execution Stats -->
			<div class="text-xs text-star-faint flex justify-between border-t border-space-600 pt-3">
				<span>Monte Carlo runs: {output.runs}</span>
				<span>Execution time: {(output.executionTimeMs / 1000).toFixed(2)}s</span>
			</div>
		</div>
	{:else}
		<p class="text-star-dim text-sm">
			Configure the deployment parameters and run the simulation to see results.
		</p>
	{/if}
</div>
