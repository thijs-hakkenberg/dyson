<script lang="ts">
	import type { TopologyComparisonResult, CoordinationTopology } from '$lib/services/simulation/swarm-coordination';

	interface Props {
		comparison: TopologyComparisonResult | null;
	}

	let { comparison }: Props = $props();

	function formatNumber(n: number): string {
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
		return n.toFixed(0);
	}

	function getTopologyColor(topology: CoordinationTopology): string {
		switch (topology) {
			case 'centralized':
				return '#ff6b6b'; // Red
			case 'hierarchical':
				return '#00ffff'; // Cyan
			case 'mesh':
				return '#ffd93d'; // Yellow
		}
	}

	// Calculate chart dimensions
	const chartWidth = 500;
	const chartHeight = 300;
	const padding = { top: 20, right: 30, bottom: 60, left: 70 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Derive chart data
	let chartData = $derived.by(() => {
		if (!comparison) return [];
		return comparison.configs.map((config, i) => ({
			label: config.coordinationTopology.charAt(0).toUpperCase() + config.coordinationTopology.slice(1),
			topology: config.coordinationTopology,
			overhead: comparison.results[i].communicationOverheadPercent,
			latency: comparison.results[i].avgUpdatePropagationMs,
			availability: comparison.results[i].coordinatorAvailabilityPercent,
			isOptimal: i === comparison.optimalConfigIndex
		}));
	});

	let maxOverhead = $derived(
		chartData.length > 0 ? Math.max(...chartData.map((d) => d.overhead)) * 1.2 : 100
	);

	// Scale functions
	function xScale(i: number): number {
		const barWidth = innerWidth / chartData.length;
		return padding.left + i * barWidth + barWidth / 2;
	}

	function yScale(value: number): number {
		return padding.top + innerHeight - (value / maxOverhead) * innerHeight;
	}

	function barHeight(value: number): number {
		return (value / maxOverhead) * innerHeight;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Topology Comparison</h3>

	{#if comparison && chartData.length > 0}
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Y-axis gridlines -->
			{#each [0, 0.25, 0.5, 0.75, 1] as tick}
				<line
					x1={padding.left}
					y1={padding.top + innerHeight * (1 - tick)}
					x2={chartWidth - padding.right}
					y2={padding.top + innerHeight * (1 - tick)}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				<text
					x={padding.left - 10}
					y={padding.top + innerHeight * (1 - tick)}
					text-anchor="end"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{(maxOverhead * tick).toFixed(0)}%
				</text>
			{/each}

			<!-- Y-axis label -->
			<text
				x={15}
				y={chartHeight / 2}
				text-anchor="middle"
				transform="rotate(-90, 15, {chartHeight / 2})"
				class="text-xs fill-star-dim"
			>
				Communication Overhead (%)
			</text>

			<!-- Bars -->
			{#each chartData as data, i}
				{@const barW = innerWidth / chartData.length * 0.6}
				<rect
					x={xScale(i) - barW / 2}
					y={yScale(data.overhead)}
					width={barW}
					height={barHeight(data.overhead)}
					fill={data.isOptimal ? getTopologyColor(data.topology) : getTopologyColor(data.topology) + '80'}
					rx="4"
					stroke={data.isOptimal ? '#fff' : 'none'}
					stroke-width="2"
				/>

				<!-- Value label -->
				<text
					x={xScale(i)}
					y={yScale(data.overhead) - 8}
					text-anchor="middle"
					class="text-xs"
					fill={getTopologyColor(data.topology)}
				>
					{data.overhead.toFixed(1)}%
				</text>

				<!-- X-axis label -->
				<text
					x={xScale(i)}
					y={chartHeight - padding.bottom + 15}
					text-anchor="middle"
					class="text-xs fill-star-white font-medium"
				>
					{data.label}
				</text>

				<!-- Latency label -->
				<text
					x={xScale(i)}
					y={chartHeight - padding.bottom + 30}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					{data.latency.toFixed(0)}ms latency
				</text>

				<!-- Optimal indicator -->
				{#if data.isOptimal}
					<text
						x={xScale(i)}
						y={chartHeight - 5}
						text-anchor="middle"
						class="text-xs fill-solar-gold font-semibold"
					>
						OPTIMAL
					</text>
				{/if}
			{/each}
		</svg>

		<!-- Metrics Table -->
		<div class="mt-4 overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="text-star-faint text-xs uppercase tracking-wider">
						<th class="text-left py-2">Topology</th>
						<th class="text-right py-2">Overhead</th>
						<th class="text-right py-2">Latency</th>
						<th class="text-right py-2">Availability</th>
					</tr>
				</thead>
				<tbody>
					{#each chartData as data}
						<tr class="border-t border-space-600 {data.isOptimal ? 'bg-space-700/30' : ''}">
							<td class="py-2">
								<span class="inline-block w-3 h-3 rounded-full mr-2" style="background: {getTopologyColor(data.topology)}"></span>
								<span class="{data.isOptimal ? 'text-star-white font-semibold' : 'text-star-dim'}">{data.label}</span>
							</td>
							<td class="text-right py-2 text-star-dim">{data.overhead.toFixed(1)}%</td>
							<td class="text-right py-2 text-star-dim">{data.latency.toFixed(0)}ms</td>
							<td class="text-right py-2 text-star-dim">{data.availability.toFixed(2)}%</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Analysis -->
		{#if comparison.analysis}
			<div class="mt-4 p-4 bg-space-700/30 rounded-lg border border-space-600">
				<div class="grid grid-cols-3 gap-4 text-xs mb-3">
					<div>
						<span class="text-star-faint">Best Latency:</span>
						<span class="text-star-white ml-1 capitalize">{comparison.analysis.bestLatency}</span>
					</div>
					<div>
						<span class="text-star-faint">Best Bandwidth:</span>
						<span class="text-star-white ml-1 capitalize">{comparison.analysis.bestBandwidth}</span>
					</div>
					<div>
						<span class="text-star-faint">Best Power:</span>
						<span class="text-star-white ml-1 capitalize">{comparison.analysis.bestPower}</span>
					</div>
				</div>
				<p class="text-sm text-star-white">{comparison.analysis.recommendation}</p>
			</div>
		{/if}
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a comparison simulation to see topology chart</p>
		</div>
	{/if}
</div>
