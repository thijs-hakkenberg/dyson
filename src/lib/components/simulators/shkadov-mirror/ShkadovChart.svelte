<script lang="ts">
	import type { ShkadovResult } from '$lib/services/simulation/shkadov-mirror';

	interface Props {
		output: ShkadovResult | null;
	}

	let { output }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 400;
	const padding = { top: 30, right: 70, bottom: 50, left: 70 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Derive chart data
	let points = $derived(output?.tradePoints ?? []);

	// Axis ranges
	let xMin = $derived(points.length > 0 ? Math.min(...points.map((p) => p.distance)) : 0.1);
	let xMax = $derived(points.length > 0 ? Math.max(...points.map((p) => p.distance)) : 2.0);

	let thrustValues = $derived(points.map((p) => p.thrust / 1e6)); // Convert to MN
	let thrustMin = $derived(thrustValues.length > 0 ? 0 : 0);
	let thrustMax = $derived(thrustValues.length > 0 ? Math.max(...thrustValues) * 1.1 : 1);

	let tempValues = $derived(points.map((p) => p.equilibriumTemp));
	let tempMin = $derived(tempValues.length > 0 ? Math.min(...tempValues) * 0.9 : 0);
	let tempMax = $derived(tempValues.length > 0 ? Math.max(...tempValues) * 1.1 : 3000);

	// Scale functions
	function xScale(value: number): number {
		return padding.left + ((value - xMin) / (xMax - xMin)) * innerWidth;
	}

	function yLeftScale(value: number): number {
		if (thrustMax === thrustMin) return padding.top + innerHeight / 2;
		return padding.top + innerHeight - ((value - thrustMin) / (thrustMax - thrustMin)) * innerHeight;
	}

	function yRightScale(value: number): number {
		if (tempMax === tempMin) return padding.top + innerHeight / 2;
		return padding.top + innerHeight - ((value - tempMin) / (tempMax - tempMin)) * innerHeight;
	}

	// Generate thrust line path
	let thrustPath = $derived.by(() => {
		if (points.length < 2) return '';
		return points
			.map((p, i) => {
				const x = xScale(p.distance);
				const y = yLeftScale(p.thrust / 1e6);
				return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
			})
			.join(' ');
	});

	// Generate temperature line path
	let tempPath = $derived.by(() => {
		if (points.length < 2) return '';
		return points
			.map((p, i) => {
				const x = xScale(p.distance);
				const y = yRightScale(p.equilibriumTemp);
				return `${i === 0 ? 'M' : 'L'} ${x},${y}`;
			})
			.join(' ');
	});

	// Feasibility background rectangles
	let feasibilityRects = $derived.by(() => {
		if (points.length < 2) return [];
		const rects: Array<{ x: number; width: number; feasible: boolean }> = [];

		for (let i = 0; i < points.length - 1; i++) {
			const x1 = xScale(points[i].distance);
			const x2 = xScale(points[i + 1].distance);
			rects.push({
				x: x1,
				width: x2 - x1,
				feasible: points[i].isThermallyFeasible
			});
		}
		return rects;
	});

	// Optimal distance marker
	let optimalX = $derived(output ? xScale(output.optimalDistance) : 0);

	// Axis ticks
	let xTicks = $derived.by(() => {
		const ticks: number[] = [];
		const step = (xMax - xMin) / 4;
		for (let i = 0; i <= 4; i++) {
			ticks.push(xMin + step * i);
		}
		return ticks;
	});

	let leftTicks = $derived.by(() => {
		const ticks: number[] = [];
		const step = (thrustMax - thrustMin) / 4;
		for (let i = 0; i <= 4; i++) {
			ticks.push(thrustMin + step * i);
		}
		return ticks;
	});

	let rightTicks = $derived.by(() => {
		const ticks: number[] = [];
		const step = (tempMax - tempMin) / 4;
		for (let i = 0; i <= 4; i++) {
			ticks.push(tempMin + step * i);
		}
		return ticks;
	});

	function formatThrust(mn: number): string {
		if (mn >= 1000) return (mn / 1000).toFixed(0) + ' GN';
		if (mn >= 1) return mn.toFixed(0) + ' MN';
		return (mn * 1000).toFixed(0) + ' kN';
	}
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-2">Distance Trade Plot</h3>
	<p class="text-xs text-star-faint mb-4">
		Thrust and equilibrium temperature vs. standoff distance
	</p>

	{#if output && points.length > 0}
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Feasibility background shading -->
			{#each feasibilityRects as rect}
				<rect
					x={rect.x}
					y={padding.top}
					width={rect.width}
					height={innerHeight}
					fill={rect.feasible ? '#00ffff' : '#ef4444'}
					fill-opacity="0.05"
				/>
			{/each}

			<!-- Grid lines -->
			{#each leftTicks as tick}
				<line
					x1={padding.left}
					y1={yLeftScale(tick)}
					x2={chartWidth - padding.right}
					y2={yLeftScale(tick)}
					stroke="currentColor"
					stroke-opacity="0.1"
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
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
			{/each}

			<!-- Optimal distance vertical line -->
			<line
				x1={optimalX}
				y1={padding.top}
				x2={optimalX}
				y2={chartHeight - padding.bottom}
				stroke="#00ffff"
				stroke-width="2"
				stroke-dasharray="6 3"
				opacity="0.7"
			/>
			<text
				x={optimalX}
				y={padding.top - 8}
				text-anchor="middle"
				class="text-xs fill-cosmic-cyan"
			>
				Optimal: {output.optimalDistance.toFixed(2)} AU
			</text>

			<!-- Thrust line (left axis) -->
			<path
				d={thrustPath}
				fill="none"
				stroke="#00ffff"
				stroke-width="2.5"
			/>

			<!-- Thrust data points -->
			{#each points as point}
				<circle
					cx={xScale(point.distance)}
					cy={yLeftScale(point.thrust / 1e6)}
					r="3"
					fill={point.isThermallyFeasible ? '#00ffff' : '#4a5568'}
					stroke={point.isThermallyFeasible ? '#00ffff' : '#6b7280'}
					stroke-width="1"
				/>
			{/each}

			<!-- Temperature line (right axis) -->
			<path
				d={tempPath}
				fill="none"
				stroke="#ef4444"
				stroke-width="2"
				stroke-dasharray="4 2"
			/>

			<!-- Temperature data points -->
			{#each points as point}
				<circle
					cx={xScale(point.distance)}
					cy={yRightScale(point.equilibriumTemp)}
					r="3"
					fill="#ef4444"
					fill-opacity="0.6"
					stroke="#ef4444"
					stroke-width="1"
				/>
			{/each}

			<!-- Left Y-axis (Thrust) -->
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
				class="text-xs fill-cosmic-cyan"
			>
				Thrust (MN)
			</text>
			{#each leftTicks as tick}
				<text
					x={padding.left - 8}
					y={yLeftScale(tick)}
					text-anchor="end"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{formatThrust(tick)}
				</text>
			{/each}

			<!-- Right Y-axis (Temperature) -->
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
				class="text-xs fill-sun-red"
			>
				Temperature (K)
			</text>
			{#each rightTicks as tick}
				<text
					x={chartWidth - padding.right + 8}
					y={yRightScale(tick)}
					text-anchor="start"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{tick.toFixed(0)} K
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
				Standoff Distance (AU)
			</text>
			{#each xTicks as tick}
				<text
					x={xScale(tick)}
					y={chartHeight - padding.bottom + 16}
					text-anchor="middle"
					class="text-xs fill-star-faint"
				>
					{tick.toFixed(2)}
				</text>
			{/each}
		</svg>

		<!-- Legend -->
		<div class="flex flex-wrap items-center justify-center gap-4 mt-4 text-xs">
			<div class="flex items-center gap-1.5">
				<div class="w-6 h-0.5 bg-cosmic-cyan"></div>
				<span class="text-star-dim">Thrust (MN)</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-6 h-0.5 bg-sun-red border-t-2 border-dashed border-sun-red"></div>
				<span class="text-star-dim">Temperature (K)</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-4 h-3 bg-cosmic-cyan/10 border border-cosmic-cyan/30 rounded-sm"></div>
				<span class="text-star-dim">Feasible</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-4 h-3 bg-sun-red/10 border border-sun-red/30 rounded-sm"></div>
				<span class="text-star-dim">Infeasible</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-4 h-0 border-t-2 border-dashed border-cosmic-cyan"></div>
				<span class="text-star-dim">Optimal</span>
			</div>
		</div>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run trade study to see distance trade plot</p>
		</div>
	{/if}
</div>
