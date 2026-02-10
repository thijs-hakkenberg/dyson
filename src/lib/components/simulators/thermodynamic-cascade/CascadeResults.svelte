<script lang="ts">
	import type {
		CascadeOutput,
		CascadeProgress
	} from '$lib/services/simulation/thermodynamic-cascade';

	interface Props {
		output: CascadeOutput | null;
		progress: CascadeProgress | null;
		isRunning: boolean;
	}

	let { output, progress, isRunning }: Props = $props();

	function formatPower(w: number): string {
		if (w >= 1e26) return `${(w / 1e26).toFixed(2)} x 10^26 W`;
		if (w >= 1e24) return `${(w / 1e24).toFixed(1)} YW`;
		if (w >= 1e21) return `${(w / 1e21).toFixed(1)} ZW`;
		if (w >= 1e18) return `${(w / 1e18).toFixed(1)} EW`;
		if (w >= 1e15) return `${(w / 1e15).toFixed(1)} PW`;
		if (w >= 1e12) return `${(w / 1e12).toFixed(1)} TW`;
		if (w >= 1e9) return `${(w / 1e9).toFixed(1)} GW`;
		return `${w.toExponential(2)} W`;
	}

	function formatArea(m2: number): string {
		const AU = 1.496e11; // meters per AU
		const AU2 = AU * AU;
		if (m2 >= AU2 * 0.01) return `${(m2 / AU2).toFixed(3)} AU^2`;
		if (m2 >= 1e18) return `${(m2 / 1e18).toFixed(1)} x 10^18 m^2`;
		if (m2 >= 1e12) return `${(m2 / 1e12).toFixed(1)} Tm^2`;
		return `${m2.toExponential(2)} m^2`;
	}
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
		<div class="space-y-6">
			<!-- Key Metrics Grid -->
			<div class="grid grid-cols-2 gap-4">
				<!-- Total Efficiency -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Total Efficiency</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{(output.result.meanEfficiency * 100).toFixed(1)}%
					</p>
					<p class="text-xs text-star-dim mt-1">
						+/- {(output.result.efficiencyStdDev * 100).toFixed(2)}%
					</p>
				</div>

				<!-- Viable Shells -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Viable Shells</p>
					<p class="text-2xl font-bold text-solar-gold">
						{output.result.meanViableShellCount.toFixed(1)}
					</p>
					<p class="text-xs text-star-dim mt-1">
						of {output.config.shellCount - 1} stages
					</p>
				</div>

				<!-- Total Extracted -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Power Extracted</p>
					<p class="text-2xl font-bold text-star-white">
						{formatPower(output.result.meanTotalExtracted)}
					</p>
					<p class="text-xs text-star-dim mt-1">total useful power</p>
				</div>

				<!-- Total Radiator Area -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Radiator Area</p>
					<p class="text-2xl font-bold text-star-white">
						{formatArea(output.result.meanTotalRadiatorArea)}
					</p>
					<p class="text-xs text-star-dim mt-1">total across all shells</p>
				</div>
			</div>

			<!-- Confidence Interval -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">95% Confidence Interval (Efficiency)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint">
						{(output.result.efficiencyCI.lower * 100).toFixed(2)}%
					</span>
					<span class="text-cosmic-cyan font-semibold">
						{(output.result.meanEfficiency * 100).toFixed(2)}%
					</span>
					<span class="text-star-faint">
						{(output.result.efficiencyCI.upper * 100).toFixed(2)}%
					</span>
				</div>
				<div class="relative mt-2 h-2 bg-space-600 rounded-full">
					{#if true}
						{@const lowerPct = output.result.efficiencyCI.lower * 100}
						{@const upperPct = output.result.efficiencyCI.upper * 100}
						{@const meanPct = output.result.meanEfficiency * 100}
						{@const maxEff = Math.min(100, upperPct * 1.5)}
						<div
							class="absolute h-2 bg-cosmic-cyan/30 rounded-full"
							style="left: {(lowerPct / maxEff) * 100}%; width: {((upperPct - lowerPct) / maxEff) * 100}%"
						></div>
						<div
							class="absolute h-2 w-1 bg-cosmic-cyan rounded-full"
							style="left: {(meanPct / maxEff) * 100}%"
						></div>
					{/if}
				</div>
			</div>

			<!-- Shell-by-Shell Table -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-3">Shell-by-Shell Breakdown</p>
				<div class="overflow-x-auto">
					<table class="w-full text-xs">
						<thead>
							<tr class="text-star-faint border-b border-space-600">
								<th class="text-left py-2 pr-2">Stage</th>
								<th class="text-right py-2 px-2">T_hot</th>
								<th class="text-right py-2 px-2">T_cold</th>
								<th class="text-right py-2 px-2">Carnot</th>
								<th class="text-right py-2 px-2">Actual</th>
								<th class="text-right py-2 px-2">P_extract</th>
								<th class="text-right py-2 px-2">Radiator</th>
								<th class="text-center py-2 pl-2">Viable</th>
							</tr>
						</thead>
						<tbody>
							{#each output.result.shellBreakdown as shell}
								<tr
									class="border-b border-space-700 {shell.isViable
										? ''
										: 'opacity-50'}"
								>
									<td class="py-2 pr-2 text-star-white">{shell.index + 1}</td>
									<td class="py-2 px-2 text-right font-mono text-star-dim"
										>{shell.tempHot.toFixed(0)} K</td
									>
									<td class="py-2 px-2 text-right font-mono text-star-dim"
										>{shell.tempCold.toFixed(0)} K</td
									>
									<td class="py-2 px-2 text-right font-mono text-solar-gold"
										>{(shell.carnotEfficiency * 100).toFixed(1)}%</td
									>
									<td class="py-2 px-2 text-right font-mono text-cosmic-cyan"
										>{(shell.actualEfficiency * 100).toFixed(1)}%</td
									>
									<td class="py-2 px-2 text-right font-mono text-star-white"
										>{formatPower(shell.powerExtracted)}</td
									>
									<td class="py-2 px-2 text-right font-mono text-star-dim"
										>{formatArea(shell.radiatorArea)}</td
									>
									<td class="py-2 pl-2 text-center">
										{#if shell.isViable}
											<span class="text-green-400">Yes</span>
										{:else}
											<span class="text-sun-red">No</span>
										{/if}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>

			<!-- Execution Stats -->
			<div
				class="text-xs text-star-faint flex justify-between border-t border-space-600 pt-3"
			>
				<span>Monte Carlo runs: {output.runs}</span>
				<span>Execution time: {(output.executionTimeMs / 1000).toFixed(2)}s</span>
			</div>
		</div>
	{:else}
		<p class="text-star-dim text-sm">
			Configure the cascade parameters and run the simulation to see results.
		</p>
	{/if}
</div>
