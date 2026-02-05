<script lang="ts">
	import type { RadiationDegradationComparisonResult } from '$lib/services/simulation/radiation-degradation';

	interface Props {
		comparison: RadiationDegradationComparisonResult | null;
	}

	let { comparison }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 350;
	const padding = { top: 30, right: 120, bottom: 60, left: 70 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Colors for different technologies
	const techColors: Record<string, string> = {
		perovskite: '#ff6b6b',
		cdte: '#4ecdc4',
		'iii-v': '#45b7d1',
		silicon: '#96ceb4',
		hybrid: '#ffeaa7'
	};

	const techLabels: Record<string, string> = {
		perovskite: 'Perovskite',
		cdte: 'CdTe',
		'iii-v': 'III-V',
		silicon: 'Silicon',
		hybrid: 'Hybrid'
	};

	// Derive chart data
	let chartData = $derived.by(() => {
		if (!comparison) return [];
		return comparison.configs.map((config, i) => ({
			technology: config.pvTechnology,
			color: techColors[config.pvTechnology] || '#888',
			label: techLabels[config.pvTechnology] || config.pvTechnology,
			powerCurve: comparison.results[i].powerCurve,
			stdDev: comparison.results[i].powerCurveStdDev,
			isOptimal: i === comparison.optimalTechnologyIndex
		}));
	});

	// Find max year and max efficiency for scaling
	let maxYear = $derived.by(() => {
		if (!comparison || chartData.length === 0) return 15;
		return Math.max(...chartData.flatMap((d) => d.powerCurve.map((p) => p.year)));
	});

	let maxEfficiency = $derived.by(() => {
		if (!comparison || chartData.length === 0) return 35;
		return Math.max(...chartData.flatMap((d) => d.powerCurve.map((p) => p.efficiency)));
	});

	// Scale functions
	function xScale(year: number): number {
		return padding.left + (year / maxYear) * innerWidth;
	}

	function yScale(efficiency: number): number {
		return padding.top + innerHeight - (efficiency / maxEfficiency) * innerHeight;
	}

	// Generate path for a power curve
	function generatePath(powerCurve: { year: number; efficiency: number }[]): string {
		return powerCurve
			.map((point, i) => {
				const x = xScale(point.year);
				const y = yScale(point.efficiency);
				return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
			})
			.join(' ');
	}

	// Generate Y-axis ticks
	let yTicks = $derived.by(() => {
		const ticks: number[] = [];
		const step = maxEfficiency <= 30 ? 5 : 10;
		for (let i = 0; i <= maxEfficiency; i += step) {
			ticks.push(i);
		}
		return ticks;
	});

	// Generate X-axis ticks
	let xTicks = $derived.by(() => {
		const ticks: number[] = [];
		const step = maxYear <= 15 ? 5 : Math.ceil(maxYear / 5);
		for (let i = 0; i <= maxYear; i += step) {
			ticks.push(i);
		}
		return ticks;
	});
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Efficiency Degradation Over Time</h3>

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

			{#each xTicks as tick}
				<line
					x1={xScale(tick)}
					y1={padding.top}
					x2={xScale(tick)}
					y2={padding.top + innerHeight}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				<text
					x={xScale(tick)}
					y={padding.top + innerHeight + 20}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					{tick}
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
				Efficiency (%)
			</text>

			<!-- X-axis label -->
			<text
				x={padding.left + innerWidth / 2}
				y={chartHeight - 10}
				text-anchor="middle"
				class="text-xs fill-star-dim"
			>
				Mission Year
			</text>

			<!-- 50% threshold line -->
			{@const halfEfficiency = maxEfficiency / 2}
			<line
				x1={padding.left}
				y1={yScale(halfEfficiency)}
				x2={chartWidth - padding.right}
				y2={yScale(halfEfficiency)}
				stroke="#ff6b6b"
				stroke-width="1"
				stroke-dasharray="4,4"
				opacity="0.5"
			/>
			<text
				x={chartWidth - padding.right + 5}
				y={yScale(halfEfficiency)}
				text-anchor="start"
				dominant-baseline="middle"
				class="text-xs fill-sun-red"
			>
				50%
			</text>

			<!-- Power curves -->
			{#each chartData as data}
				<path
					d={generatePath(data.powerCurve)}
					fill="none"
					stroke={data.color}
					stroke-width={data.isOptimal ? 3 : 2}
					stroke-linejoin="round"
					opacity={data.isOptimal ? 1 : 0.7}
				/>

				<!-- End point marker -->
				{@const lastPoint = data.powerCurve[data.powerCurve.length - 1]}
				<circle
					cx={xScale(lastPoint.year)}
					cy={yScale(lastPoint.efficiency)}
					r={data.isOptimal ? 5 : 3}
					fill={data.color}
				/>
			{/each}

			<!-- Legend -->
			{#each chartData as data, i}
				<g transform="translate({chartWidth - padding.right + 15}, {padding.top + i * 25})">
					<line x1="0" y1="0" x2="20" y2="0" stroke={data.color} stroke-width="2" />
					<circle cx="10" cy="0" r="3" fill={data.color} />
					<text x="25" y="0" dominant-baseline="middle" class="text-xs fill-star-dim">
						{data.label}
						{#if data.isOptimal}
							<tspan class="fill-solar-gold">(Best)</tspan>
						{/if}
					</text>
				</g>
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
				<p class="text-star-faint">Best Half-Life</p>
				<p class="text-star-white font-semibold">
					{comparison.analysis.bestLifetime.toFixed(1)} years
				</p>
			</div>
			<div class="p-3 bg-space-700/30 rounded-lg">
				<p class="text-star-faint">Best End Efficiency</p>
				<p class="text-star-white font-semibold">
					{comparison.analysis.bestEfficiency.toFixed(1)}%
				</p>
			</div>
		</div>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a comparison simulation to see degradation curves</p>
		</div>
	{/if}
</div>
