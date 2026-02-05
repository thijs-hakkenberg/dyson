<script lang="ts">
	import type { ElectricalFaultComparisonResult } from '$lib/services/simulation/electrical-fault';

	interface Props {
		comparison: ElectricalFaultComparisonResult | null;
		chartType: 'voltage' | 'orbital' | 'material';
	}

	let { comparison, chartType }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 350;
	const padding = { top: 30, right: 120, bottom: 60, left: 80 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Colors for different configurations
	const colors = ['#4ecdc4', '#ff6b6b', '#45b7d1', '#96ceb4', '#ffeaa7', '#dfe6e9', '#a29bfe', '#fd79a8'];

	// Material labels
	const materialLabels: Record<string, string> = {
		kapton: 'Kapton',
		polyimide: 'Polyimide',
		teflon: 'Teflon',
		ceramic: 'Ceramic'
	};

	// Derive chart data based on type
	let chartData = $derived.by(() => {
		if (!comparison) return [];

		return comparison.configs.map((config, i) => {
			let label: string;
			let xValue: number;

			if (chartType === 'voltage') {
				label = `${(config.voltageLevel / 1000).toFixed(1)}kV`;
				xValue = config.voltageLevel;
			} else if (chartType === 'orbital') {
				label = `${config.orbitalDistance.toFixed(1)} AU`;
				xValue = config.orbitalDistance;
			} else {
				label = materialLabels[config.insulationMaterial] || config.insulationMaterial;
				xValue = i;
			}

			return {
				label,
				xValue,
				arcProbability: comparison.results[i].arcProbabilityPerYear,
				mtbf: comparison.results[i].meanTimeBetweenFaults,
				color: colors[i % colors.length],
				isOptimal: i === comparison.optimalConfigIndex
			};
		});
	});

	// Calculate scales
	let xDomain = $derived.by(() => {
		if (!chartData.length) return [0, 1];
		const values = chartData.map(d => d.xValue);
		return [Math.min(...values), Math.max(...values)];
	});

	let yMax = $derived.by(() => {
		if (!chartData.length) return 1;
		return Math.max(...chartData.map(d => d.arcProbability)) * 1.2;
	});

	// Scale functions
	function xScale(value: number): number {
		if (chartType === 'material') {
			// For materials, use index-based positioning
			return padding.left + (value + 0.5) * (innerWidth / chartData.length);
		}
		const [min, max] = xDomain;
		if (max === min) return padding.left + innerWidth / 2;
		return padding.left + ((value - min) / (max - min)) * innerWidth;
	}

	function yScale(value: number): number {
		if (yMax === 0) return padding.top + innerHeight;
		return padding.top + innerHeight - (value / yMax) * innerHeight;
	}

	// Bar width for bar chart (material comparison)
	let barWidth = $derived(chartType === 'material' ? innerWidth / chartData.length * 0.7 : 0);

	// X-axis label
	let xAxisLabel = $derived.by(() => {
		if (chartType === 'voltage') return 'Operating Voltage (V)';
		if (chartType === 'orbital') return 'Orbital Distance (AU)';
		return 'Insulation Material';
	});

	// Generate Y-axis ticks
	let yTicks = $derived.by(() => {
		const ticks: number[] = [];
		const step = yMax / 5;
		for (let i = 0; i <= 5; i++) {
			ticks.push(step * i);
		}
		return ticks;
	});

	// Format probability for display
	function formatProb(p: number): string {
		if (p < 0.001) return '<0.1%';
		if (p < 0.01) return (p * 100).toFixed(2) + '%';
		return (p * 100).toFixed(1) + '%';
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">
		{#if chartType === 'voltage'}
			Arc Probability vs Voltage
		{:else if chartType === 'orbital'}
			Arc Probability vs Orbital Distance
		{:else}
			Arc Probability by Material
		{/if}
	</h3>

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
					{formatProb(tick)}
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
				Arc Probability per Year
			</text>

			<!-- X-axis label -->
			<text
				x={padding.left + innerWidth / 2}
				y={chartHeight - 10}
				text-anchor="middle"
				class="text-xs fill-star-dim"
			>
				{xAxisLabel}
			</text>

			{#if chartType === 'material'}
				<!-- Bar chart for materials -->
				{#each chartData as data, i}
					<rect
						x={xScale(i) - barWidth / 2}
						y={yScale(data.arcProbability)}
						width={barWidth}
						height={yScale(0) - yScale(data.arcProbability)}
						fill={data.color}
						opacity={data.isOptimal ? 1 : 0.7}
						rx="4"
					/>
					<!-- Label below bar -->
					<text
						x={xScale(i)}
						y={padding.top + innerHeight + 25}
						text-anchor="middle"
						class="text-xs fill-star-faint"
					>
						{data.label}
					</text>
					<!-- Value above bar -->
					<text
						x={xScale(i)}
						y={yScale(data.arcProbability) - 8}
						text-anchor="middle"
						class="text-xs fill-star-white"
					>
						{formatProb(data.arcProbability)}
					</text>
					{#if data.isOptimal}
						<text
							x={xScale(i)}
							y={yScale(data.arcProbability) - 22}
							text-anchor="middle"
							class="text-xs fill-solar-gold font-semibold"
						>
							Best
						</text>
					{/if}
				{/each}
			{:else}
				<!-- Line chart for voltage/orbital -->
				{@const sortedData = [...chartData].sort((a, b) => a.xValue - b.xValue)}
				{@const linePath = sortedData.map((d, i) => {
					const x = xScale(d.xValue);
					const y = yScale(d.arcProbability);
					return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
				}).join(' ')}

				<path
					d={linePath}
					fill="none"
					stroke="#4ecdc4"
					stroke-width="2"
					stroke-linejoin="round"
				/>

				<!-- Data points -->
				{#each chartData as data}
					<circle
						cx={xScale(data.xValue)}
						cy={yScale(data.arcProbability)}
						r={data.isOptimal ? 6 : 4}
						fill={data.isOptimal ? '#ffeaa7' : '#4ecdc4'}
					/>
					{#if data.isOptimal}
						<text
							x={xScale(data.xValue)}
							y={yScale(data.arcProbability) - 15}
							text-anchor="middle"
							class="text-xs fill-solar-gold font-semibold"
						>
							Optimal
						</text>
					{/if}
				{/each}

				<!-- X-axis labels -->
				{#each chartData as data}
					<text
						x={xScale(data.xValue)}
						y={padding.top + innerHeight + 20}
						text-anchor="middle"
						class="text-xs fill-star-faint"
					>
						{data.label}
					</text>
				{/each}
			{/if}
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
				<p class="text-star-faint">Lowest Arc Prob</p>
				<p class="text-star-white font-semibold">
					{formatProb(comparison.analysis.lowestArcProb)}
				</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-faint">Best MTBF</p>
				<p class="text-star-white font-semibold">
					{(comparison.analysis.bestMTBF / 8760).toFixed(1)} years
				</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-faint">Best Isolation</p>
				<p class="text-star-white font-semibold">
					{comparison.analysis.bestIsolationTime.toFixed(0)} ms
				</p>
			</div>
		</div>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a comparison simulation to see the chart</p>
		</div>
	{/if}
</div>
