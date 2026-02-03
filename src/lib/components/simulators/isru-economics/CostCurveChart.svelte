<script lang="ts">
	import type { ISRUEconomicsOutput, ISRUEconomicsComparisonResult } from '$lib/services/simulation/isru-economics';

	interface Props {
		output: ISRUEconomicsOutput | null;
		comparison: ISRUEconomicsComparisonResult | null;
	}

	let { output, comparison }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 350;
	const padding = { top: 30, right: 40, bottom: 60, left: 80 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Generate sample points for cost curves (we'll use the first run result if available)
	let chartData = $derived.by(() => {
		if (!output || !output.runResults || output.runResults.length === 0) {
			return null;
		}

		const firstRun = output.runResults[0];
		const earthTrajectory = firstRun.earthTrajectory;
		const isruTrajectory = firstRun.isruTrajectory;

		// Get data points
		const earthPoints = earthTrajectory.map((y) => ({
			units: y.cumulativeUnits,
			cost: y.cumulativeCost
		}));

		const isruPoints = isruTrajectory.map((y) => ({
			units: y.cumulativeUnits,
			cost: y.cumulativeCost
		}));

		const allUnits = [...earthPoints.map((p) => p.units), ...isruPoints.map((p) => p.units)];
		const allCosts = [...earthPoints.map((p) => p.cost), ...isruPoints.map((p) => p.cost)];

		const maxUnits = Math.max(...allUnits);
		const maxCost = Math.max(...allCosts);

		return {
			earth: earthPoints,
			isru: isruPoints,
			maxUnits,
			maxCost,
			crossoverUnitCount: firstRun.crossoverUnitCount
		};
	});

	// Comparison chart data
	let comparisonData = $derived.by(() => {
		if (!comparison) return null;

		return comparison.scenarios.map((s) => ({
			name: s.name,
			crossover: s.output.stats.crossoverUnitCountMean,
			savings: s.output.stats.costSavingsMean,
			savingsPercent: s.output.stats.costSavingsPercentMean,
			occurrencePercent: s.output.stats.crossoverOccurrencePercent
		}));
	});

	// Computed values for comparison chart
	let comparisonBarWidth = $derived(
		comparisonData ? innerWidth / comparisonData.length * 0.6 : 0
	);

	let comparisonMaxCrossover = $derived.by(() => {
		if (!comparisonData) return 1;
		const validCrossovers = comparisonData.filter(d => !isNaN(d.crossover)).map(d => d.crossover);
		return validCrossovers.length > 0 ? Math.max(...validCrossovers) * 1.1 : 1;
	});

	// Helper function to calculate bar X position
	function getBarX(index: number, dataLength: number): number {
		const barWidth = innerWidth / dataLength * 0.6;
		return padding.left + (index + 0.5) * (innerWidth / dataLength) - barWidth / 2;
	}

	// Helper function to calculate bar height
	function getBarHeight(crossover: number, maxCrossover: number): number {
		return isNaN(crossover) ? 0 : (crossover / maxCrossover) * innerHeight;
	}

	// Scale functions
	function xScale(units: number, maxUnits: number): number {
		return padding.left + (units / maxUnits) * innerWidth;
	}

	function yScale(cost: number, maxCost: number): number {
		return padding.top + innerHeight - (cost / maxCost) * innerHeight;
	}

	// Generate path data from points
	function generatePath(
		points: Array<{ units: number; cost: number }>,
		maxUnits: number,
		maxCost: number
	): string {
		if (points.length === 0) return '';
		let path = `M ${xScale(points[0].units, maxUnits)} ${yScale(points[0].cost, maxCost)}`;
		for (let i = 1; i < points.length; i++) {
			path += ` L ${xScale(points[i].units, maxUnits)} ${yScale(points[i].cost, maxCost)}`;
		}
		return path;
	}

	function formatNumber(n: number): string {
		if (isNaN(n)) return 'N/A';
		if (n >= 1_000_000_000_000) return `${(n / 1_000_000_000_000).toFixed(1)}T`;
		if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
		if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(0)}M`;
		if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
		return n.toFixed(0);
	}

	function formatCurrency(n: number): string {
		if (isNaN(n)) return 'N/A';
		if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(1)}T`;
		if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
		if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
		return `$${(n / 1_000).toFixed(0)}k`;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Cost Comparison Curves</h3>

	{#if chartData}
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Grid lines -->
			{#each [0, 0.25, 0.5, 0.75, 1] as tick}
				<!-- Horizontal grid lines -->
				<line
					x1={padding.left}
					y1={padding.top + innerHeight * (1 - tick)}
					x2={chartWidth - padding.right}
					y2={padding.top + innerHeight * (1 - tick)}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				<!-- Y-axis labels -->
				<text
					x={padding.left - 10}
					y={padding.top + innerHeight * (1 - tick)}
					text-anchor="end"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{formatCurrency(chartData.maxCost * tick)}
				</text>

				<!-- Vertical grid lines -->
				<line
					x1={padding.left + innerWidth * tick}
					y1={padding.top}
					x2={padding.left + innerWidth * tick}
					y2={padding.top + innerHeight}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				<!-- X-axis labels -->
				<text
					x={padding.left + innerWidth * tick}
					y={chartHeight - padding.bottom + 20}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					{formatNumber(chartData.maxUnits * tick)}
				</text>
			{/each}

			<!-- Axis labels -->
			<text
				x={15}
				y={chartHeight / 2}
				text-anchor="middle"
				transform="rotate(-90, 15, {chartHeight / 2})"
				class="text-xs fill-star-dim"
			>
				Cumulative Cost ($)
			</text>
			<text
				x={chartWidth / 2}
				y={chartHeight - 10}
				text-anchor="middle"
				class="text-xs fill-star-dim"
			>
				Units Deployed
			</text>

			<!-- Earth cost curve -->
			<path
				d={generatePath(chartData.earth, chartData.maxUnits, chartData.maxCost)}
				fill="none"
				stroke="#fbbf24"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>

			<!-- ISRU cost curve -->
			<path
				d={generatePath(chartData.isru, chartData.maxUnits, chartData.maxCost)}
				fill="none"
				stroke="#00ffff"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>

			<!-- Crossover point indicator -->
			{#if chartData.crossoverUnitCount}
				{@const crossoverX = xScale(chartData.crossoverUnitCount, chartData.maxUnits)}
				<!-- Vertical line at crossover -->
				<line
					x1={crossoverX}
					y1={padding.top}
					x2={crossoverX}
					y2={padding.top + innerHeight}
					stroke="#22c55e"
					stroke-width="1"
					stroke-dasharray="4,4"
				/>
				<!-- Crossover label -->
				<text
					x={crossoverX}
					y={padding.top - 10}
					text-anchor="middle"
					class="text-xs fill-green-400 font-semibold"
				>
					Crossover: {formatNumber(chartData.crossoverUnitCount)} units
				</text>
			{/if}

			<!-- Legend -->
			<g transform="translate({chartWidth - padding.right - 120}, {padding.top + 10})">
				<rect
					x="0"
					y="0"
					width="115"
					height="50"
					fill="rgba(15, 23, 42, 0.8)"
					rx="4"
				/>
				<line x1="10" y1="15" x2="30" y2="15" stroke="#fbbf24" stroke-width="2" />
				<text x="35" y="18" class="text-xs fill-star-white">Earth + Launch</text>
				<line x1="10" y1="35" x2="30" y2="35" stroke="#00ffff" stroke-width="2" />
				<text x="35" y="38" class="text-xs fill-star-white">ISRU</text>
			</g>
		</svg>

		<!-- Cost curve explanation -->
		<div class="mt-4 p-4 bg-space-700/30 rounded-lg border border-space-600">
			<p class="text-sm text-star-dim">
				The chart shows cumulative cost curves for both approaches. Earth manufacturing includes
				production cost plus launch cost to deep space. ISRU includes high initial capital cost
				but lower per-unit operational cost. The crossover point indicates where ISRU becomes
				more economical.
			</p>
		</div>
	{:else if comparisonData}
		<!-- Scenario Comparison Bar Chart -->
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
					{formatNumber(comparisonMaxCrossover * tick)}
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
				Crossover Unit Count
			</text>

			<!-- Bars -->
			{#each comparisonData as data, i}
				{@const barX = getBarX(i, comparisonData.length)}
				{@const barH = getBarHeight(data.crossover, comparisonMaxCrossover)}

				<rect
					x={barX}
					y={padding.top + innerHeight - barH}
					width={comparisonBarWidth}
					height={barH}
					fill={data.occurrencePercent > 80 ? '#00ffff' : data.occurrencePercent > 50 ? '#fbbf24' : '#ef4444'}
					rx="4"
				/>

				<!-- Value label -->
				{#if !isNaN(data.crossover)}
					<text
						x={barX + comparisonBarWidth / 2}
						y={padding.top + innerHeight - barH - 5}
						text-anchor="middle"
						class="text-xs fill-star-white"
					>
						{formatNumber(data.crossover)}
					</text>
				{:else}
					<text
						x={barX + comparisonBarWidth / 2}
						y={padding.top + innerHeight - 10}
						text-anchor="middle"
						class="text-xs fill-sun-red"
					>
						No crossover
					</text>
				{/if}

				<!-- Scenario name -->
				<text
					x={barX + comparisonBarWidth / 2}
					y={chartHeight - padding.bottom + 20}
					text-anchor="middle"
					class="text-xs fill-star-white"
				>
					{data.name}
				</text>

				<!-- Savings percentage -->
				<text
					x={barX + comparisonBarWidth / 2}
					y={chartHeight - padding.bottom + 35}
					text-anchor="middle"
					class="text-xs {data.savingsPercent > 0 ? 'fill-green-400' : 'fill-sun-red'}"
				>
					{data.savingsPercent > 0 ? '+' : ''}{data.savingsPercent.toFixed(0)}%
				</text>
			{/each}
		</svg>

		<!-- Comparison Analysis -->
		{#if comparison?.analysis}
			<div class="mt-4 space-y-2">
				{#each comparison.analysis.recommendations as recommendation}
					<div class="p-3 bg-space-700/30 rounded-lg border border-space-600">
						<p class="text-sm text-star-dim">{recommendation}</p>
					</div>
				{/each}
			</div>
		{/if}
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run the simulation to see cost comparison curves</p>
		</div>
	{/if}
</div>
