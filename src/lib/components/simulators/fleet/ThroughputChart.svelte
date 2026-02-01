<script lang="ts">
	import type { FleetComparisonResult } from '$lib/services/simulation/fleet-logistics';

	interface Props {
		comparison: FleetComparisonResult | null;
	}

	let { comparison }: Props = $props();

	function formatNumber(n: number): string {
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
		return n.toFixed(0);
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
			label: `${config.vehicleCount}×${(config.payloadCapacityKg / 1000).toFixed(0)}t`,
			throughput: comparison.results[i].throughputKgPerYear,
			cost: comparison.results[i].costPerKgDelivered,
			isOptimal: i === comparison.optimalConfigIndex
		}));
	});

	let maxThroughput = $derived(
		chartData.length > 0 ? Math.max(...chartData.map((d) => d.throughput)) * 1.1 : 1
	);

	// Scale functions
	function xScale(i: number): number {
		const barWidth = innerWidth / chartData.length;
		return padding.left + i * barWidth + barWidth / 2;
	}

	function yScale(value: number): number {
		return padding.top + innerHeight - (value / maxThroughput) * innerHeight;
	}

	function barHeight(value: number): number {
		return (value / maxThroughput) * innerHeight;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Throughput Comparison</h3>

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
					{formatNumber(maxThroughput * tick)}
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
				Throughput (kg/year)
			</text>

			<!-- Bars -->
			{#each chartData as data, i}
				{@const barW = innerWidth / chartData.length * 0.7}
				<rect
					x={xScale(i) - barW / 2}
					y={yScale(data.throughput)}
					width={barW}
					height={barHeight(data.throughput)}
					fill={data.isOptimal ? '#00ffff' : '#4a5568'}
					rx="4"
				/>

				<!-- Value label -->
				<text
					x={xScale(i)}
					y={yScale(data.throughput) - 5}
					text-anchor="middle"
					class="text-xs {data.isOptimal ? 'fill-cosmic-cyan' : 'fill-star-dim'}"
				>
					{formatNumber(data.throughput)}
				</text>

				<!-- X-axis label -->
				<text
					x={xScale(i)}
					y={chartHeight - padding.bottom + 20}
					text-anchor="middle"
					class="text-xs fill-star-white"
				>
					{data.label}
				</text>

				<!-- Cost label -->
				<text
					x={xScale(i)}
					y={chartHeight - padding.bottom + 35}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					${(data.cost / 1000).toFixed(1)}k/kg
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

		<!-- Analysis -->
		{#if comparison.analysis}
			<div class="mt-4 p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-white">{comparison.analysis.recommendation}</p>
			</div>
		{/if}
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a comparison simulation to see throughput chart</p>
		</div>
	{/if}
</div>
