<script lang="ts">
	import type { ExtractionResult } from '$lib/services/simulation/solar-mass-extraction';

	interface Props {
		output: ExtractionResult | null;
	}

	let { output }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 400;
	const padding = { top: 30, right: 70, bottom: 50, left: 70 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Derive chart data from mean sweep points
	let points = $derived(output?.meanSweepPoints ?? []);

	// Log-scale X axis (extraction rate)
	let xMin = $derived(points.length > 0 ? Math.log10(Math.max(points[0].extractionRate, 1)) : 9);
	let xMax = $derived(
		points.length > 0
			? Math.log10(Math.max(points[points.length - 1].extractionRate, 1))
			: 13
	);

	// Left Y: stability margin (0-1)
	// Right Y: efficiency (%)
	let effValues = $derived(points.map((p) => p.efficiency * 100));
	let effMax = $derived(effValues.length > 0 ? Math.max(...effValues, 1) * 1.1 : 10);

	// Current config extraction rate for marker
	let configLogRate = $derived(output ? Math.log10(output.config.extractionRate) : 11);

	// Scale functions
	function xScale(logRate: number): number {
		if (xMax === xMin) return padding.left + innerWidth / 2;
		return padding.left + ((logRate - xMin) / (xMax - xMin)) * innerWidth;
	}

	function yLeftScale(margin: number): number {
		return padding.top + innerHeight - margin * innerHeight;
	}

	function yRightScale(effPercent: number): number {
		if (effMax === 0) return padding.top + innerHeight / 2;
		return padding.top + innerHeight - (effPercent / effMax) * innerHeight;
	}

	// Stability margin line path
	let stabilityPath = $derived.by(() => {
		if (points.length < 2) return '';
		return points
			.map((p, i) => {
				const x = xScale(Math.log10(Math.max(p.extractionRate, 1)));
				const y = yLeftScale(p.stabilityMargin);
				return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
			})
			.join(' ');
	});

	// Efficiency line path
	let efficiencyPath = $derived.by(() => {
		if (points.length < 2) return '';
		return points
			.map((p, i) => {
				const x = xScale(Math.log10(Math.max(p.extractionRate, 1)));
				const y = yRightScale(p.efficiency * 100);
				return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
			})
			.join(' ');
	});

	// Stability margin color per point
	function stabilityColor(margin: number): string {
		if (margin > 0.99) return '#22c55e'; // green
		if (margin > 0.90) return '#eab308'; // yellow
		if (margin > 0.80) return '#f97316'; // orange
		return '#ef4444'; // red
	}

	// Danger zone (below 0.80 stability)
	let dangerZoneY = $derived(yLeftScale(0.80));
	let cautionZoneY = $derived(yLeftScale(0.90));

	// X-axis ticks (log scale)
	let xTicks = $derived.by(() => {
		const ticks: number[] = [];
		const minTick = Math.ceil(xMin);
		const maxTick = Math.floor(xMax);
		for (let i = minTick; i <= maxTick; i++) {
			ticks.push(i);
		}
		return ticks;
	});

	// Left Y-axis ticks (stability margin)
	let leftTicks = $derived([0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0]);

	// Right Y-axis ticks (efficiency %)
	let rightTicks = $derived.by(() => {
		const ticks: number[] = [];
		const step = effMax / 4;
		for (let i = 0; i <= 4; i++) {
			ticks.push(step * i);
		}
		return ticks;
	});

	// Config marker X position
	let configMarkerX = $derived(xScale(configLogRate));
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-2">Extraction Rate vs. Stability</h3>
	<p class="text-xs text-star-faint mb-4">
		Stability margin and efficiency across extraction rates (log scale)
	</p>

	{#if output && points.length > 0}
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Danger zone shading -->
			<rect
				x={padding.left}
				y={dangerZoneY}
				width={innerWidth}
				height={chartHeight - padding.bottom - dangerZoneY}
				fill="#ef4444"
				fill-opacity="0.08"
			/>
			<!-- Caution zone shading -->
			<rect
				x={padding.left}
				y={cautionZoneY}
				width={innerWidth}
				height={dangerZoneY - cautionZoneY}
				fill="#eab308"
				fill-opacity="0.05"
			/>

			<!-- Danger threshold line -->
			<line
				x1={padding.left}
				y1={dangerZoneY}
				x2={chartWidth - padding.right}
				y2={dangerZoneY}
				stroke="#ef4444"
				stroke-width="1"
				stroke-dasharray="4 2"
				opacity="0.5"
			/>
			<text
				x={chartWidth - padding.right - 4}
				y={dangerZoneY - 4}
				text-anchor="end"
				class="text-xs fill-sun-red"
				opacity="0.7"
			>
				Danger (80%)
			</text>

			<!-- Caution threshold line -->
			<line
				x1={padding.left}
				y1={cautionZoneY}
				x2={chartWidth - padding.right}
				y2={cautionZoneY}
				stroke="#eab308"
				stroke-width="1"
				stroke-dasharray="4 2"
				opacity="0.4"
			/>
			<text
				x={chartWidth - padding.right - 4}
				y={cautionZoneY - 4}
				text-anchor="end"
				class="text-xs fill-solar-gold"
				opacity="0.6"
			>
				Caution (90%)
			</text>

			<!-- Grid lines -->
			{#each leftTicks as tick}
				<line
					x1={padding.left}
					y1={yLeftScale(tick)}
					x2={chartWidth - padding.right}
					y2={yLeftScale(tick)}
					stroke="currentColor"
					stroke-opacity="0.08"
					class="text-star-dim"
				/>
			{/each}
			{#each xTicks as tick}
				<line
					x1={xScale(tick)}
					y1={padding.top}
					x2={xScale(tick)}
					y2={chartHeight - padding.bottom}
					stroke="currentColor"
					stroke-opacity="0.08"
					class="text-star-dim"
				/>
			{/each}

			<!-- Config marker vertical line -->
			<line
				x1={configMarkerX}
				y1={padding.top}
				x2={configMarkerX}
				y2={chartHeight - padding.bottom}
				stroke="#00ffff"
				stroke-width="2"
				stroke-dasharray="6 3"
				opacity="0.6"
			/>
			<text
				x={configMarkerX}
				y={padding.top - 8}
				text-anchor="middle"
				class="text-xs fill-cosmic-cyan"
			>
				Current Config
			</text>

			<!-- Stability margin line (color-segmented) -->
			{#each points as point, i}
				{#if i < points.length - 1}
					<line
						x1={xScale(Math.log10(Math.max(point.extractionRate, 1)))}
						y1={yLeftScale(point.stabilityMargin)}
						x2={xScale(Math.log10(Math.max(points[i + 1].extractionRate, 1)))}
						y2={yLeftScale(points[i + 1].stabilityMargin)}
						stroke={stabilityColor(point.stabilityMargin)}
						stroke-width="2.5"
					/>
				{/if}
			{/each}

			<!-- Stability data points -->
			{#each points as point}
				<circle
					cx={xScale(Math.log10(Math.max(point.extractionRate, 1)))}
					cy={yLeftScale(point.stabilityMargin)}
					r="3"
					fill={stabilityColor(point.stabilityMargin)}
					stroke={stabilityColor(point.stabilityMargin)}
					stroke-width="1"
				/>
			{/each}

			<!-- Efficiency line -->
			<path
				d={efficiencyPath}
				fill="none"
				stroke="#a78bfa"
				stroke-width="2"
				stroke-dasharray="4 2"
			/>

			<!-- Efficiency data points -->
			{#each points as point}
				<circle
					cx={xScale(Math.log10(Math.max(point.extractionRate, 1)))}
					cy={yRightScale(point.efficiency * 100)}
					r="2.5"
					fill="#a78bfa"
					fill-opacity="0.6"
					stroke="#a78bfa"
					stroke-width="1"
				/>
			{/each}

			<!-- Left Y-axis (Stability Margin) -->
			<line
				x1={padding.left}
				y1={padding.top}
				x2={padding.left}
				y2={chartHeight - padding.bottom}
				stroke="currentColor"
				stroke-opacity="0.3"
				class="text-star-dim"
			/>
			<text
				x={12}
				y={chartHeight / 2}
				text-anchor="middle"
				transform="rotate(-90, 12, {chartHeight / 2})"
				class="text-xs fill-green-400"
			>
				Stability Margin
			</text>
			{#each leftTicks as tick}
				<text
					x={padding.left - 8}
					y={yLeftScale(tick)}
					text-anchor="end"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{(tick * 100).toFixed(0)}%
				</text>
			{/each}

			<!-- Right Y-axis (Efficiency) -->
			<line
				x1={chartWidth - padding.right}
				y1={padding.top}
				x2={chartWidth - padding.right}
				y2={chartHeight - padding.bottom}
				stroke="currentColor"
				stroke-opacity="0.3"
				class="text-star-dim"
			/>
			<text
				x={chartWidth - 8}
				y={chartHeight / 2}
				text-anchor="middle"
				transform="rotate(90, {chartWidth - 8}, {chartHeight / 2})"
				class="text-xs"
				fill="#a78bfa"
			>
				Efficiency (%)
			</text>
			{#each rightTicks as tick}
				<text
					x={chartWidth - padding.right + 8}
					y={yRightScale(tick)}
					text-anchor="start"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{tick.toFixed(1)}%
				</text>
			{/each}

			<!-- X-axis -->
			<line
				x1={padding.left}
				y1={chartHeight - padding.bottom}
				x2={chartWidth - padding.right}
				y2={chartHeight - padding.bottom}
				stroke="currentColor"
				stroke-opacity="0.3"
				class="text-star-dim"
			/>
			<text
				x={chartWidth / 2}
				y={chartHeight - 8}
				text-anchor="middle"
				class="text-xs fill-star-dim"
			>
				Extraction Rate (kg/s)
			</text>
			{#each xTicks as tick}
				<text
					x={xScale(tick)}
					y={chartHeight - padding.bottom + 16}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					10^{tick}
				</text>
			{/each}
		</svg>

		<!-- Legend -->
		<div class="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
			<div class="flex items-center gap-1.5">
				<div class="w-6 h-0.5 bg-green-400"></div>
				<span class="text-star-dim">Stability Margin</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-6 h-0.5" style="background: #a78bfa; border-top: 2px dashed #a78bfa;"></div>
				<span class="text-star-dim">Efficiency (%)</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-4 h-3 bg-sun-red/10 border border-sun-red/30 rounded-sm"></div>
				<span class="text-star-dim">Danger Zone</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-4 h-0 border-t-2 border-dashed border-cosmic-cyan"></div>
				<span class="text-star-dim">Current Config</span>
			</div>
		</div>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run extraction analysis to see rate vs. stability plot</p>
		</div>
	{/if}
</div>
