<script lang="ts">
	import type { DeploymentComparisonResult } from '$lib/services/simulation/deployment-reliability';

	interface Props {
		comparison: DeploymentComparisonResult | null;
	}

	let { comparison }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 350;
	const padding = { top: 30, right: 30, bottom: 80, left: 70 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Colors for different mechanisms
	const mechColors: Record<string, string> = {
		inflatable: '#ff6b6b',
		'motor-driven': '#4ecdc4',
		centrifugal: '#45b7d1',
		'shape-memory': '#ffeaa7',
		hybrid: '#a29bfe'
	};

	const mechLabels: Record<string, string> = {
		inflatable: 'Inflatable',
		'motor-driven': 'Motor-driven',
		centrifugal: 'Centrifugal',
		'shape-memory': 'Shape-memory',
		hybrid: 'Hybrid'
	};

	// Derive chart data
	let chartData = $derived.by(() => {
		if (!comparison) return [];
		return comparison.configs.map((config, i) => ({
			mechanism: config.deploymentMechanism,
			color: mechColors[config.deploymentMechanism] || '#888',
			label: mechLabels[config.deploymentMechanism] || config.deploymentMechanism,
			successRate: comparison.results[i].stats.successRate,
			deploymentTime: comparison.results[i].stats.meanDeploymentTime,
			grade: comparison.results[i].reliabilityGrade,
			isOptimal: i === comparison.optimalConfigIndex
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
	<h3 class="text-lg font-bold text-star-white mb-4">Mechanism Success Rate Comparison</h3>

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

				<!-- Mechanism label -->
				<text
					x={xPosition(i)}
					y={padding.top + innerHeight + 35}
					text-anchor="middle"
					class="text-xs fill-star-dim"
				>
					{data.label}
				</text>

				<!-- Deployment time -->
				<text
					x={xPosition(i)}
					y={padding.top + innerHeight + 50}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					{data.deploymentTime.toFixed(0)} min
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
		<div class="mt-4 grid grid-cols-2 gap-4 text-xs">
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-faint">Best Success Rate</p>
				<p class="text-star-white font-semibold">
					{comparison.analysis.bestSuccessRate.toFixed(1)}%
				</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-faint">Fastest Deployment</p>
				<p class="text-star-white font-semibold">
					{comparison.analysis.bestDeploymentTime.toFixed(0)} min
				</p>
			</div>
		</div>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a comparison simulation to see mechanism success rates</p>
		</div>
	{/if}
</div>
