<script lang="ts">
	import type {
		ReplicationOutput,
		ReplicationComparisonResult
	} from '$lib/services/simulation/self-replication';

	interface Props {
		output: ReplicationOutput | null;
		comparison: ReplicationComparisonResult | null;
	}

	let { output, comparison }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 400;
	const padding = { top: 30, right: 80, bottom: 60, left: 70 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Colors for comparison lines
	const lineColors = ['#4ecdc4', '#ff6b6b', '#ffeaa7', '#a29bfe', '#45b7d1', '#fd79a8'];
	const vitaminColor = '#fbbf24';

	// Derive chart data for single mode
	let singleData = $derived.by(() => {
		if (!output) return null;
		const curve = output.result.meanGrowthCurve;
		if (curve.length === 0) return null;

		const maxCount = Math.max(...curve.map((p) => p.foundryCount), output.config.targetFoundries);
		const maxTime = curve[curve.length - 1].timeMonths;
		const maxVitamin = Math.max(...curve.map((p) => p.vitaminMass), 1);

		return { curve, maxCount, maxTime, maxVitamin };
	});

	// Derive chart data for comparison mode
	let comparisonData = $derived.by(() => {
		if (!comparison) return null;
		const curves = comparison.results.map((r) => r.meanGrowthCurve);
		if (curves.length === 0) return null;

		let maxCount = 0;
		let maxTime = 0;
		for (const curve of curves) {
			for (const p of curve) {
				if (p.foundryCount > maxCount) maxCount = p.foundryCount;
				if (p.timeMonths > maxTime) maxTime = p.timeMonths;
			}
		}
		// Include target in max count
		if (comparison.configs.length > 0) {
			maxCount = Math.max(maxCount, comparison.configs[0].targetFoundries);
		}

		return { curves, maxCount, maxTime, labels: comparison.labels };
	});

	// Log scale helpers
	function logScale(value: number, maxValue: number): number {
		if (value <= 0) return innerHeight;
		const logMax = Math.log10(Math.max(maxValue, 10));
		const logMin = 0; // log10(1) = 0
		const logVal = Math.log10(Math.max(value, 1));
		return innerHeight - ((logVal - logMin) / (logMax - logMin)) * innerHeight;
	}

	function linearScale(value: number, maxValue: number): number {
		if (maxValue <= 0) return innerHeight;
		return innerHeight - (value / maxValue) * innerHeight;
	}

	function timeScale(months: number, maxMonths: number): number {
		if (maxMonths <= 0) return 0;
		return (months / maxMonths) * innerWidth;
	}

	// Generate log-scale Y-axis ticks
	function logTicks(maxValue: number): number[] {
		const logMax = Math.ceil(Math.log10(Math.max(maxValue, 10)));
		const ticks: number[] = [];
		for (let i = 0; i <= logMax; i++) {
			ticks.push(Math.pow(10, i));
		}
		return ticks;
	}

	// Generate time axis ticks
	function timeTicks(maxMonths: number): { value: number; label: string }[] {
		const maxYears = maxMonths / 12;
		const ticks: { value: number; label: string }[] = [];

		let step: number;
		if (maxYears <= 10) step = 1;
		else if (maxYears <= 50) step = 5;
		else if (maxYears <= 200) step = 20;
		else step = 50;

		for (let y = 0; y <= maxYears; y += step) {
			ticks.push({ value: y * 12, label: `${y}y` });
		}
		return ticks;
	}

	// Build SVG path from points
	function buildPath(
		points: { x: number; y: number }[]
	): string {
		if (points.length === 0) return '';
		return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
	}

	// Right-axis ticks for vitamin mass
	function vitaminTicks(maxKg: number): { value: number; label: string }[] {
		const maxTonnes = maxKg / 1000;
		const ticks: { value: number; label: string }[] = [];

		let step: number;
		if (maxTonnes <= 10) step = 2;
		else if (maxTonnes <= 100) step = 20;
		else if (maxTonnes <= 1000) step = 200;
		else if (maxTonnes <= 10000) step = 2000;
		else step = 20000;

		for (let t = 0; t <= maxTonnes + step; t += step) {
			if (t <= maxTonnes * 1.1) {
				ticks.push({ value: t * 1000, label: `${t >= 1000 ? (t / 1000).toFixed(0) + 'k' : t.toFixed(0)}t` });
			}
		}
		return ticks;
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">
		{comparison ? 'Closure Ratio Comparison' : 'Growth Curve'}
	</h3>

	{#if comparison && comparisonData}
		<!-- Comparison Mode -->
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Grid lines -->
			{#each logTicks(comparisonData.maxCount) as tick}
				{@const y = padding.top + logScale(tick, comparisonData.maxCount)}
				<line
					x1={padding.left}
					y1={y}
					x2={chartWidth - padding.right}
					y2={y}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				<text
					x={padding.left - 10}
					y={y}
					text-anchor="end"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{tick >= 1000 ? `${(tick / 1000).toFixed(0)}k` : tick}
				</text>
			{/each}

			<!-- Time axis -->
			{#each timeTicks(comparisonData.maxTime) as tick}
				{@const x = padding.left + timeScale(tick.value, comparisonData.maxTime)}
				<line
					x1={x}
					y1={padding.top}
					x2={x}
					y2={padding.top + innerHeight}
					stroke="currentColor"
					stroke-opacity="0.05"
					class="text-star-dim"
				/>
				<text
					x={x}
					y={padding.top + innerHeight + 20}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					{tick.label}
				</text>
			{/each}

			<!-- Target line -->
			{#if comparison.configs.length > 0}
				{@const targetY = padding.top + logScale(comparison.configs[0].targetFoundries, comparisonData.maxCount)}
				<line
					x1={padding.left}
					y1={targetY}
					x2={chartWidth - padding.right}
					y2={targetY}
					stroke="#ef4444"
					stroke-width="1"
					stroke-dasharray="6,4"
					opacity="0.6"
				/>
				<text
					x={padding.left + 5}
					y={targetY - 6}
					class="text-xs fill-sun-red"
				>
					Target: {comparison.configs[0].targetFoundries.toLocaleString()}
				</text>
			{/if}

			<!-- Growth curves -->
			{#each comparisonData.curves as curve, i}
				{@const points = curve.map((p) => ({
					x: padding.left + timeScale(p.timeMonths, comparisonData.maxTime),
					y: padding.top + logScale(p.foundryCount, comparisonData.maxCount)
				}))}
				<path
					d={buildPath(points)}
					fill="none"
					stroke={lineColors[i % lineColors.length]}
					stroke-width="2"
					opacity="0.9"
				/>
			{/each}

			<!-- Y-axis label -->
			<text
				x={15}
				y={chartHeight / 2}
				text-anchor="middle"
				transform="rotate(-90, 15, {chartHeight / 2})"
				class="text-xs fill-star-dim"
			>
				Foundry Count (log)
			</text>

			<!-- X-axis label -->
			<text
				x={padding.left + innerWidth / 2}
				y={chartHeight - 5}
				text-anchor="middle"
				class="text-xs fill-star-dim"
			>
				Time (years)
			</text>

			<!-- Legend -->
			{#each comparisonData.labels as label, i}
				{@const legendY = padding.top + 15 + i * 18}
				<rect
					x={chartWidth - padding.right + 10}
					y={legendY - 5}
					width={12}
					height={3}
					fill={lineColors[i % lineColors.length]}
				/>
				<text
					x={chartWidth - padding.right + 26}
					y={legendY}
					dominant-baseline="middle"
					class="text-xs fill-star-dim"
				>
					{label}
				</text>
			{/each}
		</svg>
	{:else if output && singleData}
		<!-- Single Mode: Dual-axis chart -->
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Grid lines (log scale for foundry count) -->
			{#each logTicks(singleData.maxCount) as tick}
				{@const y = padding.top + logScale(tick, singleData.maxCount)}
				<line
					x1={padding.left}
					y1={y}
					x2={chartWidth - padding.right}
					y2={y}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				<text
					x={padding.left - 10}
					y={y}
					text-anchor="end"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{tick >= 1000 ? `${(tick / 1000).toFixed(0)}k` : tick}
				</text>
			{/each}

			<!-- Time axis -->
			{#each timeTicks(singleData.maxTime) as tick}
				{@const x = padding.left + timeScale(tick.value, singleData.maxTime)}
				<line
					x1={x}
					y1={padding.top}
					x2={x}
					y2={padding.top + innerHeight}
					stroke="currentColor"
					stroke-opacity="0.05"
					class="text-star-dim"
				/>
				<text
					x={x}
					y={padding.top + innerHeight + 20}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					{tick.label}
				</text>
			{/each}

			<!-- Right axis ticks (vitamin mass) -->
			{#each vitaminTicks(singleData.maxVitamin) as tick}
				{@const y = padding.top + linearScale(tick.value, singleData.maxVitamin)}
				<text
					x={chartWidth - padding.right + 10}
					y={y}
					text-anchor="start"
					dominant-baseline="middle"
					class="text-xs fill-solar-gold"
					opacity="0.7"
				>
					{tick.label}
				</text>
			{/each}

			<!-- Target line, confidence band, and data lines -->
			{#if true}
				{@const targetY = padding.top + logScale(output.config.targetFoundries, singleData.maxCount)}
				{@const vitaminPoints = singleData.curve.map((p) => ({
					x: padding.left + timeScale(p.timeMonths, singleData.maxTime),
					y: padding.top + linearScale(p.vitaminMass, singleData.maxVitamin)
				}))}
				{@const countPoints = singleData.curve.map((p) => ({
					x: padding.left + timeScale(p.timeMonths, singleData.maxTime),
					y: padding.top + logScale(p.foundryCount, singleData.maxCount)
				}))}

				<line
					x1={padding.left}
					y1={targetY}
					x2={chartWidth - padding.right}
					y2={targetY}
					stroke="#ef4444"
					stroke-width="1"
					stroke-dasharray="6,4"
					opacity="0.6"
				/>
				<text
					x={padding.left + 5}
					y={targetY - 6}
					class="text-xs fill-sun-red"
				>
					Target: {output.config.targetFoundries.toLocaleString()}
				</text>

				<!-- Confidence band -->
				{#if output.result.lowerGrowthCurve.length > 0}
					{@const bandPoints = [
						...output.result.upperGrowthCurve.map((p) => ({
							x: padding.left + timeScale(p.timeMonths, singleData.maxTime),
							y: padding.top + logScale(p.foundryCount, singleData.maxCount)
						})),
						...output.result.lowerGrowthCurve.slice().reverse().map((p) => ({
							x: padding.left + timeScale(p.timeMonths, singleData.maxTime),
							y: padding.top + logScale(p.foundryCount, singleData.maxCount)
						}))
					]}
					<path
						d={buildPath(bandPoints) + ' Z'}
						fill="#4ecdc4"
						opacity="0.1"
					/>
				{/if}

				<!-- Vitamin mass line (right axis, linear) -->
				<path
					d={buildPath(vitaminPoints)}
					fill="none"
					stroke={vitaminColor}
					stroke-width="1.5"
					stroke-dasharray="4,3"
					opacity="0.7"
				/>

				<!-- Foundry count line (left axis, log) -->
				<path
					d={buildPath(countPoints)}
					fill="none"
					stroke="#4ecdc4"
					stroke-width="2.5"
				/>
			{/if}

			<!-- Y-axis labels -->
			<text
				x={15}
				y={chartHeight / 2}
				text-anchor="middle"
				transform="rotate(-90, 15, {chartHeight / 2})"
				class="text-xs fill-cosmic-cyan"
			>
				Foundry Count (log)
			</text>

			<text
				x={chartWidth - 10}
				y={chartHeight / 2}
				text-anchor="middle"
				transform="rotate(90, {chartWidth - 10}, {chartHeight / 2})"
				class="text-xs fill-solar-gold"
			>
				Vitamin Mass (tonnes)
			</text>

			<!-- X-axis label -->
			<text
				x={padding.left + innerWidth / 2}
				y={chartHeight - 5}
				text-anchor="middle"
				class="text-xs fill-star-dim"
			>
				Time (years)
			</text>

			<!-- Legend -->
			<rect
				x={padding.left + 10}
				y={padding.top + 8}
				width={12}
				height={3}
				fill="#4ecdc4"
			/>
			<text
				x={padding.left + 26}
				y={padding.top + 12}
				dominant-baseline="middle"
				class="text-xs fill-star-dim"
			>
				Foundries
			</text>

			<line
				x1={padding.left + 10}
				y1={padding.top + 26}
				x2={padding.left + 22}
				y2={padding.top + 26}
				stroke={vitaminColor}
				stroke-width="1.5"
				stroke-dasharray="4,3"
			/>
			<text
				x={padding.left + 26}
				y={padding.top + 28}
				dominant-baseline="middle"
				class="text-xs fill-star-dim"
			>
				Vitamin Mass
			</text>

			<rect
				x={padding.left + 10}
				y={padding.top + 38}
				width={12}
				height={8}
				fill="#4ecdc4"
				opacity="0.15"
			/>
			<text
				x={padding.left + 26}
				y={padding.top + 44}
				dominant-baseline="middle"
				class="text-xs fill-star-dim"
			>
				5th-95th pct
			</text>
		</svg>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a simulation to see the growth curve</p>
		</div>
	{/if}
</div>
