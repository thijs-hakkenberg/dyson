<script lang="ts">
	import type { SupplyChainOutput, SupplyChainComparisonResult } from '$lib/services/simulation/supply-chain';

	interface Props {
		output: SupplyChainOutput | null;
		comparison: SupplyChainComparisonResult | null;
	}

	let { output, comparison }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 350;
	const padding = { top: 30, right: 40, bottom: 60, left: 80 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Chart data from first run result
	let chartData = $derived.by(() => {
		if (!output || !output.runResults || output.runResults.length === 0) {
			return null;
		}

		const firstRun = output.runResults[0];
		const balance = firstRun.yearByYearBalance;

		// Extract data points
		const supplyPoints = balance.map((b) => ({
			year: b.year,
			value: b.cumulativeSupply
		}));

		const demandPoints = balance.map((b) => ({
			year: b.year,
			value: b.cumulativeDemand
		}));

		const stockpilePoints = balance.map((b) => ({
			year: b.year,
			value: Math.max(0, b.stockpile)
		}));

		const maxYear = Math.max(...balance.map((b) => b.year));
		const maxValue = Math.max(
			...balance.map((b) => Math.max(b.cumulativeSupply, b.cumulativeDemand))
		);

		return {
			supply: supplyPoints,
			demand: demandPoints,
			stockpile: stockpilePoints,
			maxYear,
			maxValue,
			constraintYear: firstRun.constraintYear,
			stockpilingYears: output.config.stockpilingYears
		};
	});

	// Comparison chart data
	let comparisonData = $derived.by(() => {
		if (!comparison) return null;

		return comparison.scenarios.map((s) => ({
			name: s.name,
			constraintRisk: s.output.stats.constraintOccurrencePercent,
			stockpileRequired: s.output.stats.stockpileRequiredMean,
			demandMetPercent: s.output.stats.demandMetPercent
		}));
	});

	// Scale functions
	function xScale(year: number, maxYear: number): number {
		return padding.left + (year / maxYear) * innerWidth;
	}

	function yScale(value: number, maxValue: number): number {
		return padding.top + innerHeight - (value / maxValue) * innerHeight;
	}

	// Generate path from points
	function generatePath(
		points: Array<{ year: number; value: number }>,
		maxYear: number,
		maxValue: number
	): string {
		if (points.length === 0) return '';
		let path = `M ${xScale(points[0].year, maxYear)} ${yScale(points[0].value, maxValue)}`;
		for (let i = 1; i < points.length; i++) {
			path += ` L ${xScale(points[i].year, maxYear)} ${yScale(points[i].value, maxValue)}`;
		}
		return path;
	}

	// Generate area path (for stockpile fill)
	function generateAreaPath(
		points: Array<{ year: number; value: number }>,
		maxYear: number,
		maxValue: number
	): string {
		if (points.length === 0) return '';
		const baseline = padding.top + innerHeight;
		let path = `M ${xScale(points[0].year, maxYear)} ${baseline}`;
		for (const point of points) {
			path += ` L ${xScale(point.year, maxYear)} ${yScale(point.value, maxValue)}`;
		}
		path += ` L ${xScale(points[points.length - 1].year, maxYear)} ${baseline} Z`;
		return path;
	}

	function formatNumber(n: number): string {
		if (isNaN(n)) return 'N/A';
		if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
		return n.toFixed(0);
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Supply/Demand Balance</h3>

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
					{formatNumber(chartData.maxValue * tick)} t
				</text>
			{/each}

			<!-- X-axis labels -->
			{#each [0, 0.25, 0.5, 0.75, 1] as tick}
				<line
					x1={padding.left + innerWidth * tick}
					y1={padding.top}
					x2={padding.left + innerWidth * tick}
					y2={padding.top + innerHeight}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				<text
					x={padding.left + innerWidth * tick}
					y={chartHeight - padding.bottom + 20}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					Year {Math.round(chartData.maxYear * tick)}
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
				Cumulative Amount (tonnes)
			</text>
			<text
				x={chartWidth / 2}
				y={chartHeight - 10}
				text-anchor="middle"
				class="text-xs fill-star-dim"
			>
				Year
			</text>

			<!-- Stockpiling period shading -->
			<rect
				x={padding.left}
				y={padding.top}
				width={xScale(chartData.stockpilingYears, chartData.maxYear) - padding.left}
				height={innerHeight}
				fill="rgba(0, 255, 255, 0.05)"
			/>
			<text
				x={(padding.left + xScale(chartData.stockpilingYears, chartData.maxYear)) / 2}
				y={padding.top + 15}
				text-anchor="middle"
				class="text-xs fill-cosmic-cyan/50"
			>
				Stockpiling
			</text>

			<!-- Stockpile area (filled) -->
			<path
				d={generateAreaPath(chartData.stockpile, chartData.maxYear, chartData.maxValue)}
				fill="rgba(34, 197, 94, 0.2)"
			/>

			<!-- Supply curve -->
			<path
				d={generatePath(chartData.supply, chartData.maxYear, chartData.maxValue)}
				fill="none"
				stroke="#00ffff"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>

			<!-- Demand curve -->
			<path
				d={generatePath(chartData.demand, chartData.maxYear, chartData.maxValue)}
				fill="none"
				stroke="#fbbf24"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>

			<!-- Constraint year indicator -->
			{#if chartData.constraintYear}
				{@const constraintX = xScale(chartData.constraintYear, chartData.maxYear)}
				<line
					x1={constraintX}
					y1={padding.top}
					x2={constraintX}
					y2={padding.top + innerHeight}
					stroke="#ef4444"
					stroke-width="2"
					stroke-dasharray="4,4"
				/>
				<text
					x={constraintX}
					y={padding.top - 10}
					text-anchor="middle"
					class="text-xs fill-sun-red font-semibold"
				>
					Constraint: Year {chartData.constraintYear}
				</text>
			{/if}

			<!-- Legend -->
			<g transform="translate({chartWidth - padding.right - 140}, {padding.top + 10})">
				<rect
					x="0"
					y="0"
					width="135"
					height="70"
					fill="rgba(15, 23, 42, 0.8)"
					rx="4"
				/>
				<line x1="10" y1="15" x2="30" y2="15" stroke="#00ffff" stroke-width="2" />
				<text x="35" y="18" class="text-xs fill-star-white">Cumulative Supply</text>
				<line x1="10" y1="35" x2="30" y2="35" stroke="#fbbf24" stroke-width="2" />
				<text x="35" y="38" class="text-xs fill-star-white">Cumulative Demand</text>
				<rect x="10" y="50" width="20" height="10" fill="rgba(34, 197, 94, 0.3)" />
				<text x="35" y="58" class="text-xs fill-star-white">Stockpile</text>
			</g>
		</svg>

		<div class="mt-4 p-4 bg-space-700/30 rounded-lg border border-space-600">
			<p class="text-sm text-star-dim">
				The chart shows cumulative supply and demand over the simulation period. The shaded
				region represents the stockpile buffer. Supply constraints occur when cumulative
				demand exceeds cumulative supply.
			</p>
		</div>
	{:else if comparisonData}
		<!-- Scenario Comparison Chart -->
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
					{(100 * tick).toFixed(0)}%
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
				Constraint Risk (%)
			</text>

			<!-- Bars -->
			{#each comparisonData as data, i}
				{@const barWidth = innerWidth / comparisonData.length * 0.6}
				{@const barX = padding.left + (i + 0.5) * (innerWidth / comparisonData.length) - barWidth / 2}
				{@const barH = (data.constraintRisk / 100) * innerHeight}

				<rect
					x={barX}
					y={padding.top + innerHeight - barH}
					width={barWidth}
					height={barH}
					fill={data.constraintRisk > 70 ? '#ef4444' : data.constraintRisk > 40 ? '#fbbf24' : '#22c55e'}
					rx="4"
				/>

				<!-- Value label -->
				<text
					x={barX + barWidth / 2}
					y={padding.top + innerHeight - barH - 5}
					text-anchor="middle"
					class="text-xs fill-star-white"
				>
					{data.constraintRisk.toFixed(0)}%
				</text>

				<!-- Scenario name -->
				<text
					x={barX + barWidth / 2}
					y={chartHeight - padding.bottom + 20}
					text-anchor="middle"
					class="text-xs fill-star-white"
				>
					{data.name.split(' ')[0]}
				</text>

				<!-- Demand met percentage -->
				<text
					x={barX + barWidth / 2}
					y={chartHeight - padding.bottom + 35}
					text-anchor="middle"
					class="text-xs {data.demandMetPercent > 80 ? 'fill-green-400' : data.demandMetPercent > 50 ? 'fill-solar-gold' : 'fill-sun-red'}"
				>
					{data.demandMetPercent.toFixed(0)}% met
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
			<p>Run the simulation to see supply/demand balance</p>
		</div>
	{/if}
</div>
