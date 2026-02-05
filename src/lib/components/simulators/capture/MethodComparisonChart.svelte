<script lang="ts">
	import type { MethodComparisonResult } from '$lib/services/simulation/capture';

	interface Props {
		comparison: MethodComparisonResult | null;
	}

	let { comparison }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 350;
	const padding = { top: 30, right: 30, bottom: 80, left: 70 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Colors for different methods
	const methodColors: Record<string, string> = {
		magnetic: '#4ecdc4',
		mechanical: '#45b7d1',
		net: '#a29bfe',
		foam: '#ffeaa7',
		tether: '#ff6b6b'
	};

	const methodLabels: Record<string, string> = {
		magnetic: 'Magnetic',
		mechanical: 'Mechanical',
		net: 'Net',
		foam: 'Foam',
		tether: 'Tether'
	};

	// Derive chart data
	let chartData = $derived.by(() => {
		if (!comparison) return [];
		return comparison.methods.map((method, i) => ({
			method,
			color: methodColors[method] || '#888',
			label: methodLabels[method] || method,
			successRate: comparison.results[i].stats.successRate,
			peakStress: comparison.results[i].stats.meanPeakStress * 100,
			grade: comparison.results[i].reliabilityGrade,
			isOptimal: i === comparison.optimalMethodIndex
		}));
	});

	// Bar width and spacing
	let barWidth = $derived.by(() => {
		if (chartData.length === 0) return 60;
		const totalGap = (chartData.length - 1) * 20;
		return Math.min(80, (innerWidth - totalGap) / chartData.length);
	});

	// Scale functions
	function yScale(value: number): number {
		return padding.top + innerHeight - (value / 100) * innerHeight;
	}

	function xPosition(index: number): number {
		const totalWidth = chartData.length * barWidth + (chartData.length - 1) * 20;
		const startX = padding.left + (innerWidth - totalWidth) / 2;
		return startX + index * (barWidth + 20) + barWidth / 2;
	}

	// Y-axis ticks
	const yTicks = [0, 25, 50, 75, 100];

	// Grade colors
	function gradeColor(grade: string): string {
		switch (grade) {
			case 'A':
				return '#4ade80';
			case 'B':
				return '#fbbf24';
			case 'C':
				return '#fb923c';
			case 'D':
				return '#ef4444';
			default:
				return '#dc2626';
		}
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Capture Method Comparison</h3>

	{#if comparison && chartData.length > 0}
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Grid lines -->
			{#each yTicks as tick}
				<line
					x1={padding.left}
					y1={yScale(tick)}
					x2={chartWidth - padding.right}
					y2={yScale(tick)}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				<text
					x={padding.left - 10}
					y={yScale(tick)}
					text-anchor="end"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{tick}%
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
				Success Rate (%)
			</text>

			<!-- 85% threshold line (Grade B) -->
			<line
				x1={padding.left}
				y1={yScale(85)}
				x2={chartWidth - padding.right}
				y2={yScale(85)}
				stroke="#fbbf24"
				stroke-width="1"
				stroke-dasharray="4,4"
				opacity="0.5"
			/>
			<text
				x={chartWidth - padding.right + 5}
				y={yScale(85)}
				text-anchor="start"
				dominant-baseline="middle"
				class="text-xs fill-solar-gold"
			>
				85%
			</text>

			<!-- Bars -->
			{#each chartData as data, i}
				{@const barHeight = (data.successRate / 100) * innerHeight}
				{@const x = xPosition(i) - barWidth / 2}
				{@const y = padding.top + innerHeight - barHeight}

				<!-- Bar -->
				<rect
					{x}
					{y}
					width={barWidth}
					height={barHeight}
					fill={data.color}
					opacity={data.isOptimal ? 1 : 0.7}
					rx="4"
				/>

				<!-- Optimal indicator -->
				{#if data.isOptimal}
					<text
						x={xPosition(i)}
						y={y - 25}
						text-anchor="middle"
						class="text-xs fill-solar-gold font-semibold"
					>
						Best
					</text>
					<polygon
						points="{xPosition(i) - 6},{y - 20} {xPosition(i) + 6},{y - 20} {xPosition(i)},{y - 10}"
						fill="#fbbf24"
					/>
				{/if}

				<!-- Success rate value -->
				<text
					x={xPosition(i)}
					y={y - 5}
					text-anchor="middle"
					class="text-xs fill-star-white font-semibold"
				>
					{data.successRate.toFixed(1)}%
				</text>

				<!-- Grade badge -->
				<circle
					cx={xPosition(i)}
					cy={padding.top + innerHeight + 15}
					r="10"
					fill={gradeColor(data.grade)}
				/>
				<text
					x={xPosition(i)}
					y={padding.top + innerHeight + 15}
					text-anchor="middle"
					dominant-baseline="middle"
					class="text-xs fill-space-900 font-bold"
				>
					{data.grade}
				</text>

				<!-- Method label -->
				<text
					x={xPosition(i)}
					y={padding.top + innerHeight + 35}
					text-anchor="middle"
					class="text-xs fill-star-dim"
				>
					{data.label}
				</text>

				<!-- Peak stress -->
				<text
					x={xPosition(i)}
					y={padding.top + innerHeight + 50}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					{data.peakStress.toFixed(0)}% stress
				</text>
			{/each}
		</svg>

		<!-- Analysis -->
		{#if comparison.analysis}
			<div class="mt-4 p-4 bg-space-700/30 rounded-lg border border-space-600">
				<p class="text-sm text-star-white">{comparison.analysis.recommendation}</p>
			</div>
		{/if}

		<!-- Summary Stats -->
		<div class="mt-4 grid grid-cols-3 gap-4 text-xs">
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-faint">Best Success Rate</p>
				<p class="text-star-white font-semibold">
					{comparison.analysis.bestSuccessRate.toFixed(1)}%
				</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-faint">Most Energy Efficient</p>
				<p class="text-star-white font-semibold capitalize">
					{comparison.analysis.mostEnergyEfficient}
				</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-faint">Lowest Stress</p>
				<p class="text-star-white font-semibold capitalize">
					{comparison.analysis.lowestStressMethod}
				</p>
			</div>
		</div>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a comparison simulation to see method performance</p>
		</div>
	{/if}
</div>
