<script lang="ts">
	import type { SpectralComparisonResult } from '$lib/services/simulation/spectral-analysis';

	interface Props {
		comparison: SpectralComparisonResult | null;
	}

	let { comparison }: Props = $props();

	// Chart dimensions
	const chartWidth = 400;
	const chartHeight = 300;
	const padding = { top: 20, right: 30, bottom: 50, left: 60 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Metrics to compare
	const metrics = [
		{ key: 'targetsSurveyed', label: 'Targets', unit: '' },
		{ key: 'avgDecisionLatencyHours', label: 'Latency', unit: 'hrs' },
		{ key: 'surveyEfficiency', label: 'Efficiency', unit: '%', scale: 100 }
	];

	// Helper to get metric value
	function getMetricValue(
		result: SpectralComparisonResult['onboardResult'],
		key: string,
		scale: number = 1
	): number {
		const value = result[key as keyof typeof result];
		return (typeof value === 'number' ? value : 0) * scale;
	}

	// Derive chart data
	let chartData = $derived.by(() => {
		if (!comparison) return [];

		return metrics.map((m) => {
			const onboardVal = getMetricValue(comparison.onboardResult, m.key, m.scale ?? 1);
			const groundVal = getMetricValue(comparison.groundResult, m.key, m.scale ?? 1);

			return {
				metric: m.label,
				unit: m.unit,
				onboard: onboardVal,
				ground: groundVal,
				max: Math.max(onboardVal, groundVal) * 1.2
			};
		});
	});

	function barX(metricIdx: number, isGround: boolean): number {
		const groupWidth = innerWidth / chartData.length;
		const barWidth = groupWidth * 0.35;
		const offset = isGround ? barWidth + 4 : 0;
		return padding.left + metricIdx * groupWidth + groupWidth * 0.1 + offset;
	}

	function barWidth(): number {
		return (innerWidth / chartData.length) * 0.35;
	}

	function barHeight(value: number, max: number): number {
		return (value / max) * innerHeight;
	}

	function barY(value: number, max: number): number {
		return padding.top + innerHeight - barHeight(value, max);
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Metrics Comparison</h3>

	{#if comparison && chartData.length > 0}
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Y-axis gridlines -->
			{#each [0, 0.5, 1] as tick}
				<line
					x1={padding.left}
					y1={padding.top + innerHeight * (1 - tick)}
					x2={chartWidth - padding.right}
					y2={padding.top + innerHeight * (1 - tick)}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
			{/each}

			<!-- Bars for each metric -->
			{#each chartData as data, i}
				<!-- On-board bar -->
				<rect
					x={barX(i, false)}
					y={barY(data.onboard, data.max)}
					width={barWidth()}
					height={barHeight(data.onboard, data.max)}
					fill="#00ffff"
					rx="4"
				/>

				<!-- Ground bar -->
				<rect
					x={barX(i, true)}
					y={barY(data.ground, data.max)}
					width={barWidth()}
					height={barHeight(data.ground, data.max)}
					fill="#ffc107"
					rx="4"
				/>

				<!-- Values -->
				<text
					x={barX(i, false) + barWidth() / 2}
					y={barY(data.onboard, data.max) - 5}
					text-anchor="middle"
					class="text-xs fill-cosmic-cyan"
				>
					{data.onboard.toFixed(data.unit === '%' ? 0 : 1)}{data.unit}
				</text>

				<text
					x={barX(i, true) + barWidth() / 2}
					y={barY(data.ground, data.max) - 5}
					text-anchor="middle"
					class="text-xs fill-solar-gold"
				>
					{data.ground.toFixed(data.unit === '%' ? 0 : 1)}{data.unit}
				</text>

				<!-- X-axis labels -->
				<text
					x={barX(i, false) + barWidth() + 2}
					y={chartHeight - padding.bottom + 20}
					text-anchor="middle"
					class="text-xs fill-star-white"
				>
					{data.metric}
				</text>
			{/each}
		</svg>

		<!-- Legend -->
		<div class="flex justify-center gap-6 mt-4">
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 rounded bg-cosmic-cyan"></div>
				<span class="text-sm text-star-dim">On-board</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-4 h-4 rounded bg-solar-gold"></div>
				<span class="text-sm text-star-dim">Ground</span>
			</div>
		</div>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run simulation to see comparison chart</p>
		</div>
	{/if}
</div>
