<script lang="ts">
	import type { CascadeOutput } from '$lib/services/simulation/thermodynamic-cascade';

	interface Props {
		output: CascadeOutput | null;
	}

	let { output }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 400;
	const padding = { top: 30, right: 30, bottom: 70, left: 80 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Colors
	const extractedColor = '#4ade80'; // green
	const wasteColor = '#f97316'; // orange

	function formatPowerShort(w: number): string {
		if (w >= 1e26) return `${(w / 1e26).toFixed(1)}e26`;
		if (w >= 1e24) return `${(w / 1e24).toFixed(0)} YW`;
		if (w >= 1e21) return `${(w / 1e21).toFixed(0)} ZW`;
		if (w >= 1e18) return `${(w / 1e18).toFixed(0)} EW`;
		if (w >= 1e15) return `${(w / 1e15).toFixed(0)} PW`;
		return `${(w / 1e12).toFixed(0)} TW`;
	}

	// Derive chart data from output
	let chartData = $derived.by(() => {
		if (!output) return null;

		const shells = output.result.shellBreakdown;
		if (shells.length === 0) return null;

		// Find max power for scaling (the first shell's input is the largest)
		const maxPower = shells[0].powerIn;

		// Build waterfall bars: each bar's base starts at the cumulative waste level
		const bars = shells.map((shell) => {
			const extractedFrac = shell.powerExtracted / maxPower;
			const wasteFrac = shell.powerWaste / maxPower;
			const inputFrac = shell.powerIn / maxPower;

			return {
				index: shell.index,
				label: `Stage ${shell.index + 1}`,
				tempLabel: `${shell.tempHot.toFixed(0)}-${shell.tempCold.toFixed(0)} K`,
				extracted: extractedFrac,
				waste: wasteFrac,
				inputFrac,
				powerExtracted: shell.powerExtracted,
				powerWaste: shell.powerWaste,
				powerIn: shell.powerIn,
				efficiency: shell.actualEfficiency,
				isViable: shell.isViable
			};
		});

		return { bars, maxPower };
	});

	// Y-axis scale: maps fraction [0,1] to pixel position
	function yScale(fraction: number): number {
		return padding.top + innerHeight * (1 - fraction);
	}

	// X position for bar center
	function xPosition(index: number, total: number): number {
		const barSpacing = innerWidth / total;
		return padding.left + barSpacing * index + barSpacing / 2;
	}

	// Bar width
	function barW(total: number): number {
		return Math.min(80, (innerWidth / total) * 0.7);
	}

	// Y-axis ticks
	const yTickFractions = [0, 0.25, 0.5, 0.75, 1.0];
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Energy Cascade Waterfall</h3>

	{#if chartData && chartData.bars.length > 0}
		{@const bars = chartData.bars}
		{@const total = bars.length}
		{@const bw = barW(total)}

		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Grid lines -->
			{#each yTickFractions as frac}
				<line
					x1={padding.left}
					y1={yScale(frac)}
					x2={chartWidth - padding.right}
					y2={yScale(frac)}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				<text
					x={padding.left - 10}
					y={yScale(frac)}
					text-anchor="end"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{formatPowerShort(frac * chartData.maxPower)}
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
				Power (W)
			</text>

			<!-- Stacked bars for each stage -->
			{#each bars as bar, i}
				{@const cx = xPosition(i, total)}
				{@const halfBar = bw / 2}

				<!-- Waste heat bar (bottom portion, orange) -->
				{@const wasteTop = yScale(bar.inputFrac)}
				{@const extractedHeight = bar.extracted * innerHeight}
				{@const wasteHeight = bar.waste * innerHeight}

				<!-- Extracted power (green, top of the stack) -->
				<rect
					x={cx - halfBar}
					y={wasteTop}
					width={bw}
					height={extractedHeight}
					fill={extractedColor}
					opacity={bar.isViable ? 0.85 : 0.4}
					rx="2"
				/>

				<!-- Waste heat (orange, below extracted) -->
				<rect
					x={cx - halfBar}
					y={wasteTop + extractedHeight}
					width={bw}
					height={wasteHeight}
					fill={wasteColor}
					opacity="0.7"
					rx="2"
				/>

				<!-- Cascade arrow connecting waste to next stage input -->
				{#if i < total - 1}
					{@const nextCx = xPosition(i + 1, total)}
					{@const arrowY = wasteTop + extractedHeight + wasteHeight / 2}
					<line
						x1={cx + halfBar + 2}
						y1={arrowY}
						x2={nextCx - halfBar - 6}
						y2={arrowY}
						stroke="#f97316"
						stroke-width="1.5"
						stroke-dasharray="4,3"
						opacity="0.5"
					/>
					<polygon
						points="{nextCx - halfBar - 2},{arrowY - 4} {nextCx - halfBar - 2},{arrowY + 4} {nextCx - halfBar + 2},{arrowY}"
						fill="#f97316"
						opacity="0.5"
					/>
				{/if}

				<!-- Power extracted label -->
				<text
					x={cx}
					y={wasteTop - 5}
					text-anchor="middle"
					class="text-xs fill-star-white font-semibold"
					font-size="10"
				>
					{formatPowerShort(bar.powerExtracted)}
				</text>

				<!-- Efficiency label inside bar -->
				{#if extractedHeight > 14}
					<text
						x={cx}
						y={wasteTop + extractedHeight / 2}
						text-anchor="middle"
						dominant-baseline="middle"
						class="fill-space-900 font-semibold"
						font-size="9"
					>
						{(bar.efficiency * 100).toFixed(1)}%
					</text>
				{/if}

				<!-- Stage label -->
				<text
					x={cx}
					y={padding.top + innerHeight + 18}
					text-anchor="middle"
					class="text-xs fill-star-dim"
				>
					{bar.label}
				</text>

				<!-- Temperature range label -->
				<text
					x={cx}
					y={padding.top + innerHeight + 33}
					text-anchor="middle"
					class="fill-star-faint"
					font-size="9"
				>
					{bar.tempLabel}
				</text>

				<!-- Viability indicator -->
				{#if !bar.isViable}
					<text
						x={cx}
						y={padding.top + innerHeight + 48}
						text-anchor="middle"
						class="fill-sun-red"
						font-size="9"
					>
						sub-viable
					</text>
				{/if}
			{/each}

			<!-- Legend -->
			<rect x={chartWidth - padding.right - 140} y={padding.top} width={12} height={12} fill={extractedColor} rx="2" />
			<text
				x={chartWidth - padding.right - 124}
				y={padding.top + 10}
				class="text-xs fill-star-dim"
			>
				Power Extracted
			</text>
			<rect x={chartWidth - padding.right - 140} y={padding.top + 18} width={12} height={12} fill={wasteColor} rx="2" />
			<text
				x={chartWidth - padding.right - 124}
				y={padding.top + 28}
				class="text-xs fill-star-dim"
			>
				Waste Heat
			</text>
		</svg>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a simulation to see the energy cascade waterfall chart</p>
		</div>
	{/if}
</div>
