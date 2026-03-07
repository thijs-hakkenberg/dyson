<script lang="ts">
	import type { SwarmCoordinationOutput, SwarmCoordinationProgress, SwarmCoordinationConfig } from '$lib/services/simulation/swarm-coordination';
	import { computeTDMAFeasibility } from '$lib/services/simulation/swarm-coordination';

	interface Props {
		output: SwarmCoordinationOutput | null;
		progress: SwarmCoordinationProgress | null;
		isRunning: boolean;
		config?: SwarmCoordinationConfig;
	}

	let { output, progress, isRunning, config }: Props = $props();

	let feasibility = $derived.by(() => {
		if (!config) return null;
		return computeTDMAFeasibility(
			config.clusterSize,
			config.phyRateKbps,
			config.campaignDutyFactor,
			config.commandProbability,
			config.coordinationCyclePeriodS
		);
	});

	function formatNumber(n: number): string {
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
		return n.toFixed(2);
	}

	function formatMs(ms: number): string {
		if (ms >= 1000) return `${(ms / 1000).toFixed(2)}s`;
		return `${ms.toFixed(1)}ms`;
	}

	// Determine status colors based on thresholds
	function getOverheadColor(overhead: number): string {
		if (overhead < 20) return 'text-green-400';
		if (overhead < 50) return 'text-solar-gold';
		return 'text-sun-red';
	}

	function getAvailabilityColor(availability: number): string {
		if (availability >= 99) return 'text-green-400';
		if (availability >= 95) return 'text-solar-gold';
		return 'text-sun-red';
	}

	function getPropagationColor(ms: number): string {
		if (ms < 500) return 'text-green-400';
		if (ms < 1000) return 'text-solar-gold';
		return 'text-sun-red';
	}
</script>

{#if feasibility}
<div class="card-glow p-6 mb-4">
	<h3 class="text-lg font-bold text-star-white mb-4">TDMA Feasibility (Paper Model)</h3>

	<!-- Overall verdict -->
	<div class="p-4 rounded-lg mb-4 {feasibility.feasible ? 'bg-green-900/30 border border-green-500/30' : 'bg-red-900/30 border border-sun-red/30'}">
		<p class="text-lg font-bold {feasibility.feasible ? 'text-green-400' : 'text-sun-red'}">
			{feasibility.feasible ? 'FEASIBLE' : 'INFEASIBLE'} at {config?.phyRateKbps} kbps
		</p>
		<p class="text-xs text-star-dim mt-1">
			gamma = {feasibility.gamma.toFixed(3)} | eta_total = {(feasibility.etaTotal * 100).toFixed(1)}% | margin = {feasibility.marginMs.toFixed(0)} ms
		</p>
	</div>

	<div class="grid grid-cols-2 gap-4 mb-4">
		<!-- Test A -->
		<div class="p-3 bg-space-700/50 rounded-lg">
			<p class="text-xs text-star-faint uppercase tracking-wider mb-2">Test A: Byte Budget</p>
			<p class="text-sm font-semibold {feasibility.testAPasses ? 'text-green-400' : 'text-sun-red'}">
				{feasibility.testAPasses ? 'PASS' : 'FAIL'}
			</p>
			<div class="mt-2 space-y-1 text-xs text-star-dim">
				<div class="flex justify-between"><span>Baseline telemetry</span><span>{(feasibility.etaBaseline * 100).toFixed(1)}%</span></div>
				<div class="flex justify-between"><span>Architecture</span><span>{(feasibility.etaArchitecture * 100).toFixed(1)}%</span></div>
				<div class="flex justify-between"><span>Command (d={config?.campaignDutyFactor})</span><span>{(feasibility.etaCommand * 100).toFixed(1)}%</span></div>
				<div class="flex justify-between border-t border-space-600 pt-1 text-star-white font-semibold"><span>Total</span><span>{(feasibility.etaTotal * 100).toFixed(1)}%</span></div>
			</div>
		</div>

		<!-- Test B -->
		<div class="p-3 bg-space-700/50 rounded-lg">
			<p class="text-xs text-star-faint uppercase tracking-wider mb-2">Test B: TDMA Timing</p>
			<p class="text-sm font-semibold {feasibility.testBPasses ? 'text-green-400' : 'text-sun-red'}">
				{feasibility.testBPasses ? 'PASS' : 'FAIL'}
			</p>
			<div class="mt-2 space-y-1 text-xs text-star-dim">
				<div class="flex justify-between"><span>Ingress</span><span>{feasibility.ingressTimeMs.toFixed(0)} ms</span></div>
				<div class="flex justify-between"><span>ARQ (P95)</span><span>{feasibility.arqTimeMs.toFixed(0)} ms</span></div>
				<div class="flex justify-between"><span>Egress</span><span>{feasibility.egressTimeMs.toFixed(0)} ms</span></div>
				<div class="flex justify-between border-t border-space-600 pt-1 {feasibility.marginMs >= 0 ? 'text-green-400' : 'text-sun-red'} font-semibold"><span>Margin</span><span>{feasibility.marginMs.toFixed(0)} ms</span></div>
			</div>
		</div>
	</div>

	<!-- Key derived values -->
	<div class="p-3 bg-space-700/30 rounded-lg border border-space-600">
		<div class="grid grid-cols-3 gap-4 text-xs">
			<div>
				<span class="text-star-faint">Info rate:</span>
				<span class="text-star-white ml-1">{feasibility.coordInfoRateKbps.toFixed(1)} kbps</span>
			</div>
			<div>
				<span class="text-star-faint">Min PHY:</span>
				<span class="text-star-white ml-1">{feasibility.minPhyRateKbps.toFixed(1)} kbps</span>
			</div>
			<div>
				<span class="text-star-faint">alpha_RX:</span>
				<span class="text-star-white ml-1">{feasibility.alphaRX.toFixed(3)}</span>
			</div>
		</div>
	</div>
</div>
{/if}

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Simulation Results</h3>

	{#if isRunning && progress}
		<div class="space-y-4">
			<div class="flex items-center gap-3">
				<span class="spinner w-5 h-5"></span>
				<span class="text-star-dim">
					Running simulation {progress.currentRun} of {progress.totalRuns}...
					{#if progress.currentTopology}
						<span class="text-cosmic-cyan">({progress.currentTopology})</span>
					{/if}
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
				<!-- Communication Overhead -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Comm Overhead</p>
					<p class="text-2xl font-bold {getOverheadColor(output.result.communicationOverheadPercent)}">
						{output.result.communicationOverheadPercent.toFixed(1)}%
					</p>
					<p class="text-xs text-star-dim mt-1">
						+/-{output.result.communicationOverheadStdDev.toFixed(1)}% (1-sigma)
					</p>
				</div>

				<!-- Bottleneck Threshold -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Bottleneck Threshold</p>
					<p class="text-2xl font-bold text-cosmic-cyan">
						{formatNumber(output.result.bottleneckThresholdNodes)}
					</p>
					<p class="text-xs text-star-dim mt-1">nodes before 1s latency</p>
				</div>

				<!-- Coordinator Availability -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Coordinator Availability</p>
					<p class="text-2xl font-bold {getAvailabilityColor(output.result.coordinatorAvailabilityPercent)}">
						{output.result.coordinatorAvailabilityPercent.toFixed(2)}%
					</p>
					<p class="text-xs text-star-dim mt-1">
						+/-{output.result.coordinatorAvailabilityStdDev.toFixed(2)}% (1-sigma)
					</p>
				</div>

				<!-- Power Variance -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Power Variance</p>
					<p class="text-2xl font-bold text-solar-gold">
						{output.result.powerVariancePercent.toFixed(1)}%
					</p>
					<p class="text-xs text-star-dim mt-1">across swarm nodes</p>
				</div>

				<!-- Update Propagation -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Avg Propagation Time</p>
					<p class="text-2xl font-bold {getPropagationColor(output.result.avgUpdatePropagationMs)}">
						{formatMs(output.result.avgUpdatePropagationMs)}
					</p>
					<p class="text-xs text-star-dim mt-1">
						max: {formatMs(output.result.maxUpdatePropagationMs)}
					</p>
				</div>

				<!-- Message Drop Rate -->
				<div class="p-4 bg-space-700/50 rounded-lg">
					<p class="text-xs text-star-faint uppercase tracking-wider">Message Drop Rate</p>
					<p class="text-2xl font-bold {output.result.messageDropRate < 0.01 ? 'text-green-400' : 'text-sun-red'}">
						{(output.result.messageDropRate * 100).toFixed(3)}%
					</p>
					<p class="text-xs text-star-dim mt-1">
						failed handoffs: {output.result.failedHandoffs.toFixed(1)}
					</p>
				</div>
			</div>

			<!-- Confidence Interval -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">95% Confidence Interval (Comm Overhead)</p>
				<div class="flex items-center justify-between text-sm">
					<span class="text-star-faint">
						{output.result.confidenceInterval95.overheadLower.toFixed(1)}%
					</span>
					<span class="text-cosmic-cyan font-semibold">
						{output.result.communicationOverheadPercent.toFixed(1)}%
					</span>
					<span class="text-star-faint">
						{output.result.confidenceInterval95.overheadUpper.toFixed(1)}%
					</span>
				</div>
				<div class="relative mt-2 h-2 bg-space-600 rounded-full">
					<div
						class="absolute h-2 bg-cosmic-cyan/30 rounded-full"
						style="left: 5%; right: 5%"
					></div>
					<div
						class="absolute h-2 w-1 bg-cosmic-cyan rounded-full"
						style="left: 50%; transform: translateX(-50%)"
					></div>
				</div>
			</div>

			<!-- Configuration Summary -->
			<div class="p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-dim mb-2">Configuration</p>
				<div class="grid grid-cols-3 gap-2 text-xs">
					<div>
						<span class="text-star-faint">Topology:</span>
						<span class="text-star-white ml-1">{output.config.coordinationTopology}</span>
					</div>
					<div>
						<span class="text-star-faint">Nodes:</span>
						<span class="text-star-white ml-1">{formatNumber(output.config.nodeCount)}</span>
					</div>
					<div>
						<span class="text-star-faint">Bandwidth:</span>
						<span class="text-star-white ml-1">{output.config.bandwidthPerNodeKbps} kbps</span>
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
			Configure the swarm parameters and run the simulation to see results.
		</p>
	{/if}
</div>
