<script lang="ts">
	import type { SwarmDynamicsComparisonResult } from '$lib/services/simulation/swarm-dynamics';

	interface Props {
		comparison: SwarmDynamicsComparisonResult | null;
	}

	let { comparison }: Props = $props();

	function formatScientific(n: number): string {
		if (n === 0) return '0';
		return n.toExponential(1);
	}

	// Chart dimensions
	const chartWidth = 500;
	const chartHeight = 300;
	const padding = { top: 20, right: 30, bottom: 70, left: 80 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Derive chart data
	let chartData = $derived.by(() => {
		if (!comparison) return [];
		return comparison.configs.map((config, i) => ({
			label: `${config.interUnitSpacingM.toLocaleString()}m`,
			collisionProb: comparison.results[i].collisionProbPerUnitYear,
			srpAuthority: comparison.results[i].srpControlAuthority,
			lifetime: comparison.results[i].missionLifetimeYears,
			isOptimal: i === comparison.optimalConfigIndex
		}));
	});

	// Use log scale for collision probability
	let logMin = $derived.by(() => {
		if (chartData.length === 0) return -12;
		const minVal = Math.min(...chartData.map((d) => d.collisionProb).filter((p) => p > 0));
		return Math.floor(Math.log10(minVal)) - 1;
	});

	let logMax = $derived.by(() => {
		if (chartData.length === 0) return -3;
		const maxVal = Math.max(...chartData.map((d) => d.collisionProb));
		return Math.ceil(Math.log10(maxVal)) + 1;
	});

	// Scale functions
	function xScale(i: number): number {
		const barWidth = innerWidth / chartData.length;
		return padding.left + i * barWidth + barWidth / 2;
	}

	function yScale(value: number): number {
		if (value <= 0) return padding.top + innerHeight;
		const logVal = Math.log10(value);
		const normalized = (logVal - logMin) / (logMax - logMin);
		return padding.top + innerHeight * (1 - normalized);
	}

	function barHeight(value: number): number {
		if (value <= 0) return 0;
		const logVal = Math.log10(value);
		const normalized = (logVal - logMin) / (logMax - logMin);
		return innerHeight * normalized;
	}

	// Generate Y-axis ticks (powers of 10)
	let yTicks = $derived.by(() => {
		const ticks: number[] = [];
		for (let exp = logMin; exp <= logMax; exp++) {
			ticks.push(Math.pow(10, exp));
		}
		return ticks;
	});
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Collision Probability vs Spacing</h3>

	{#if comparison && chartData.length > 0}
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Y-axis gridlines -->
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
					{formatScientific(tick)}
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
				Collision Prob/Unit/Year
			</text>

			<!-- Target line at 1e-6 -->
			<line
				x1={padding.left}
				y1={yScale(1e-6)}
				x2={chartWidth - padding.right}
				y2={yScale(1e-6)}
				stroke="#00ffff"
				stroke-width="1"
				stroke-dasharray="4,4"
				opacity="0.5"
			/>
			<text
				x={chartWidth - padding.right - 5}
				y={yScale(1e-6) - 5}
				text-anchor="end"
				class="text-xs fill-cosmic-cyan"
			>
				Target (1e-6)
			</text>

			<!-- Bars -->
			{#each chartData as data, i}
				{@const barW = (innerWidth / chartData.length) * 0.7}
				<rect
					x={xScale(i) - barW / 2}
					y={yScale(data.collisionProb)}
					width={barW}
					height={barHeight(data.collisionProb)}
					fill={data.isOptimal ? '#00ffff' : data.collisionProb < 1e-6 ? '#22c55e' : '#4a5568'}
					rx="4"
				/>

				<!-- Value label -->
				<text
					x={xScale(i)}
					y={yScale(data.collisionProb) - 5}
					text-anchor="middle"
					class="text-xs {data.isOptimal ? 'fill-cosmic-cyan' : 'fill-star-dim'}"
				>
					{formatScientific(data.collisionProb)}
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

				<!-- SRP Authority -->
				<text
					x={xScale(i)}
					y={chartHeight - padding.bottom + 30}
					text-anchor="middle"
					class="text-xs {data.srpAuthority >= 1 ? 'fill-green-400' : 'fill-sun-red'}"
				>
					SRP: {(data.srpAuthority * 100).toFixed(0)}%
				</text>

				<!-- Lifetime -->
				<text
					x={xScale(i)}
					y={chartHeight - padding.bottom + 45}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					{data.lifetime.toFixed(1)} yr
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

		<!-- Legend -->
		<div class="mt-4 flex flex-wrap gap-4 justify-center text-xs">
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded bg-green-500"></div>
				<span class="text-star-dim">Below target (&lt;1e-6)</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded bg-space-400"></div>
				<span class="text-star-dim">Above target</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-3 h-3 rounded bg-cosmic-cyan"></div>
				<span class="text-star-dim">Optimal config</span>
			</div>
		</div>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a comparison simulation to see collision probability chart</p>
		</div>
	{/if}
</div>
