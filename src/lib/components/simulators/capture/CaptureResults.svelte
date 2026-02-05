<script lang="ts">
	import type {
		CaptureOutput,
		CaptureProgress
	} from '$lib/services/simulation/capture';

	interface Props {
		output: CaptureOutput | null;
		progress: CaptureProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatNumber(n: number, decimals: number = 1): string {
		return n.toFixed(decimals);
	}

	function formatEnergy(j: number): string {
		if (j > 1e6) return `${(j / 1e6).toFixed(2)} MJ`;
		if (j > 1e3) return `${(j / 1e3).toFixed(1)} kJ`;
		return `${j.toFixed(0)} J`;
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

	let methodLabel = $derived.by(() => {
		if (!output) return '';
		const labels: Record<string, string> = {
			magnetic: 'Magnetic',
			mechanical: 'Mechanical',
			net: 'Net',
			foam: 'Foam',
			tether: 'Tether'
		};
		return labels[output.config.captureMethod] || output.config.captureMethod;
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
			miss: 'Missed capture',
			overspeed: 'Overspeed',
			structural: 'Structural damage',
			timing: 'Timing failure',
			mechanism: 'Mechanism failure',
			angle: 'Angle error',
			overload: 'Energy overload'
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
				{#if progress.method}
					<span class="ml-2 text-star-dim">({progress.method})</span>
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

				<!-- Energy Absorbed -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Mean Energy</p>
					<p class="text-2xl font-bold text-solar-gold">
						{formatEnergy(output.result.stats.meanEnergyAbsorbedJ)}
					</p>
					<p class="text-xs text-star-dim mt-1">
						absorbed per capture
					</p>
				</div>

				<!-- Peak Stress -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Peak Stress</p>
					<p class="text-2xl font-bold text-star-white">
						{formatNumber(output.result.stats.meanPeakStress * 100, 0)}%
					</p>
					<p class="text-xs text-star-dim mt-1">
						max: {formatNumber(output.result.stats.maxPeakStress * 100, 0)}% capacity
					</p>
				</div>

				<!-- Backup Usage -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Backup Used</p>
					<p class="text-2xl font-bold text-star-white">
						{formatNumber(output.result.stats.backupSystemUsageRate, 0)}%
					</p>
					<p class="text-xs text-star-dim mt-1">
						of captures
					</p>
				</div>
			</div>

			<!-- Configuration Summary -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">Configuration</p>
				<div class="grid grid-cols-2 gap-2 text-xs">
					<div class="flex justify-between">
						<span class="text-star-faint">Capture Method</span>
						<span class="text-star-white">{methodLabel}</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Payload Mass</span>
						<span class="text-star-white">{output.config.payloadMassKg} kg</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Velocity</span>
						<span class="text-star-white">{output.config.arrivalVelocityMs} m/s</span>
					</div>
					<div class="flex justify-between">
						<span class="text-star-faint">Position Accuracy</span>
						<span class="text-star-white">{output.config.targetAccuracyM} m</span>
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
					<div class="mt-3 pt-3 border-t border-space-600 grid grid-cols-4 gap-2 text-xs">
						<div>
							<span class="text-star-faint">Targeting</span>
							<span class="ml-1 text-star-white">{output.result.stats.failuresByCategory.targeting}</span>
						</div>
						<div>
							<span class="text-star-faint">Velocity</span>
							<span class="ml-1 text-star-white">{output.result.stats.failuresByCategory.velocity}</span>
						</div>
						<div>
							<span class="text-star-faint">Structural</span>
							<span class="ml-1 text-star-white">{output.result.stats.failuresByCategory.structural}</span>
						</div>
						<div>
							<span class="text-star-faint">Mechanical</span>
							<span class="ml-1 text-star-white">{output.result.stats.failuresByCategory.mechanical}</span>
						</div>
					</div>
				</div>
			{:else}
				<div class="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
					<p class="text-sm text-green-400 font-semibold">No Failures Recorded</p>
					<p class="text-xs text-star-dim">
						All captures completed successfully in this simulation run.
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
			Configure the capture parameters and run the simulation to see results.
		</p>
	{/if}
</div>
