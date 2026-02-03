<script lang="ts">
	import type { DepotLogisticsComparisonResult } from '$lib/services/simulation/depot-logistics';

	interface Props {
		comparison: DepotLogisticsComparisonResult | null;
	}

	let { comparison }: Props = $props();

	function formatNumber(n: number): string {
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
		return n.toFixed(0);
	}

	function formatDays(days: number): string {
		if (days < 1) {
			return `${(days * 24).toFixed(1)}h`;
		}
		return `${days.toFixed(1)}d`;
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
			label: `${formatNumber(config.depotSpacingKm)} km`,
			mttr: comparison.results[i].meanTimeToRepairDays,
			cost: comparison.results[i].costPerServiceMission,
			depots: comparison.results[i].depotCountRequired,
			isOptimal: i === comparison.optimalConfigIndex
		}));
	});

	let maxMTTR = $derived(
		chartData.length > 0 ? Math.max(...chartData.map((d) => d.mttr)) * 1.1 : 1
	);

	// Scale functions
	function xScale(i: number): number {
		const barWidth = innerWidth / chartData.length;
		return padding.left + i * barWidth + barWidth / 2;
	}

	function yScale(value: number): number {
		return padding.top + innerHeight - (value / maxMTTR) * innerHeight;
	}

	function barHeight(value: number): number {
		return (value / maxMTTR) * innerHeight;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Response Time Comparison</h3>

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
					{formatDays(maxMTTR * tick)}
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
				Mean Time to Repair
			</text>

			<!-- Bars -->
			{#each chartData as data, i}
				{@const barW = innerWidth / chartData.length * 0.7}
				<rect
					x={xScale(i) - barW / 2}
					y={yScale(data.mttr)}
					width={barW}
					height={barHeight(data.mttr)}
					fill={data.isOptimal ? '#00ffff' : '#4a5568'}
					rx="4"
				/>

				<!-- Value label -->
				<text
					x={xScale(i)}
					y={yScale(data.mttr) - 5}
					text-anchor="middle"
					class="text-xs {data.isOptimal ? 'fill-cosmic-cyan' : 'fill-star-dim'}"
				>
					{formatDays(data.mttr)}
				</text>

				<!-- X-axis label (spacing) -->
				<text
					x={xScale(i)}
					y={chartHeight - padding.bottom + 15}
					text-anchor="middle"
					class="text-xs fill-star-white"
				>
					{data.label}
				</text>

				<!-- Depot count label -->
				<text
					x={xScale(i)}
					y={chartHeight - padding.bottom + 30}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					{data.depots} depots
				</text>

				<!-- Cost label -->
				<text
					x={xScale(i)}
					y={chartHeight - padding.bottom + 43}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					${(data.cost / 1000).toFixed(0)}k/mission
				</text>

				<!-- Optimal indicator -->
				{#if data.isOptimal}
					<text
						x={xScale(i)}
						y={chartHeight - 2}
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
			<p>Run a comparison simulation to see response time chart</p>
		</div>
	{/if}
</div>
