<script lang="ts">
	import type { MembraneOutput } from '$lib/services/simulation/membrane-dynamics';

	interface Props {
		output: MembraneOutput | null;
	}

	let { output }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 400;
	const padding = { top: 30, right: 30, bottom: 60, left: 70 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Stability colors
	const stabilityColors: Record<string, string> = {
		stable: '#4ade80',
		marginal: '#fbbf24',
		flutter: '#ef4444'
	};

	// Y-axis: tension (log scale, 0.1 to 50 N/m)
	const tensionMin = 0.1;
	const tensionMax = 50;
	const logTensionMin = Math.log10(tensionMin);
	const logTensionMax = Math.log10(tensionMax);

	// X-axis: diameter (100 to 1000 m, linear)
	const diameterMin = 100;
	const diameterMax = 1000;

	function xScale(diameter: number): number {
		return padding.left + ((diameter - diameterMin) / (diameterMax - diameterMin)) * innerWidth;
	}

	function yScale(tension: number): number {
		const logT = Math.log10(Math.max(tension, tensionMin));
		const frac = (logT - logTensionMin) / (logTensionMax - logTensionMin);
		return padding.top + innerHeight - frac * innerHeight;
	}

	// X-axis ticks
	const xTicks = [100, 200, 300, 400, 500, 600, 750, 1000];

	// Y-axis ticks (log scale)
	const yTicks = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];

	// Generate flutter boundary line from sweep data
	let boundaryPath = $derived.by(() => {
		if (!output || output.result.sweepPoints.length === 0) return '';
		const points = output.result.sweepPoints
			.filter((p) => p.flutterBoundaryTension > 0 && p.flutterBoundaryTension < tensionMax)
			.sort((a, b) => a.diameter - b.diameter);

		if (points.length < 2) return '';

		return points
			.map((p, i) => {
				const x = xScale(p.diameter);
				const y = yScale(p.flutterBoundaryTension);
				return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
			})
			.join(' ');
	});

	// Stability regions as colored rectangles for each sweep point
	let stabilityRegions = $derived.by(() => {
		if (!output) return [];
		return output.result.sweepPoints.map((p) => ({
			diameter: p.diameter,
			boundaryTension: p.flutterBoundaryTension,
			stability: p.stability,
			color: stabilityColors[p.stability]
		}));
	});

	// Current config point marker
	let configPoint = $derived.by(() => {
		if (!output) return null;
		return {
			x: xScale(output.config.diameter),
			y: yScale(output.config.tension),
			stability: output.result.modalResult.stability
		};
	});
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">Stability Boundary Map</h3>

	{#if output && output.result.sweepPoints.length > 0}
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Background stability regions -->
			{#each stabilityRegions as region, i}
				{@const nextDiameter = stabilityRegions[i + 1]?.diameter ?? diameterMax + 100}
				{@const regionWidth = xScale(nextDiameter) - xScale(region.diameter)}

				<!-- Stable region (above boundary) -->
				<rect
					x={xScale(region.diameter)}
					y={padding.top}
					width={Math.max(0, regionWidth - 2)}
					height={yScale(region.boundaryTension) - padding.top}
					fill="#4ade80"
					opacity="0.08"
				/>

				<!-- Marginal band (around boundary, +/- factor of 2) -->
				{@const marginalTop = yScale(region.boundaryTension * 2)}
				{@const marginalBottom = yScale(Math.max(region.boundaryTension / 2, tensionMin))}
				<rect
					x={xScale(region.diameter)}
					y={marginalTop}
					width={Math.max(0, regionWidth - 2)}
					height={marginalBottom - marginalTop}
					fill="#fbbf24"
					opacity="0.08"
				/>

				<!-- Flutter region (below boundary) -->
				<rect
					x={xScale(region.diameter)}
					y={yScale(Math.max(region.boundaryTension / 2, tensionMin))}
					width={Math.max(0, regionWidth - 2)}
					height={padding.top + innerHeight - yScale(Math.max(region.boundaryTension / 2, tensionMin))}
					fill="#ef4444"
					opacity="0.08"
				/>
			{/each}

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
					{tick}
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

			<!-- Axis labels -->
			<text
				x={15}
				y={chartHeight / 2}
				text-anchor="middle"
				transform="rotate(-90, 15, {chartHeight / 2})"
				class="text-xs fill-star-dim"
			>
				Tension (N/m, log scale)
			</text>
			<text
				x={padding.left + innerWidth / 2}
				y={chartHeight - 10}
				text-anchor="middle"
				class="text-xs fill-star-dim"
			>
				Diameter (m)
			</text>

			<!-- Flutter boundary line -->
			{#if boundaryPath}
				<path
					d={boundaryPath}
					fill="none"
					stroke="#fbbf24"
					stroke-width="2.5"
					stroke-linejoin="round"
					stroke-dasharray="6,3"
				/>
			{/if}

			<!-- Sweep point markers -->
			{#each output.result.sweepPoints as point}
				<circle
					cx={xScale(point.diameter)}
					cy={yScale(point.flutterBoundaryTension)}
					r="4"
					fill={stabilityColors[point.stability]}
					stroke="rgba(0,0,0,0.3)"
					stroke-width="1"
				/>
			{/each}

			<!-- Current config point -->
			{#if configPoint}
				<circle
					cx={configPoint.x}
					cy={configPoint.y}
					r="8"
					fill="none"
					stroke="white"
					stroke-width="2"
				/>
				<circle
					cx={configPoint.x}
					cy={configPoint.y}
					r="5"
					fill={stabilityColors[configPoint.stability]}
				/>
				<!-- Label -->
				<text
					x={configPoint.x + 12}
					y={configPoint.y - 8}
					class="text-xs fill-star-white font-semibold"
				>
					Current
				</text>
			{/if}

			<!-- Legend -->
			<g transform="translate({chartWidth - padding.right - 120}, {padding.top + 10})">
				<rect x="-5" y="-5" width="125" height="80" rx="4" fill="rgba(0,0,0,0.5)" />
				<circle cx="8" cy="10" r="5" fill="#4ade80" />
				<text x="20" y="10" dominant-baseline="middle" class="text-xs fill-star-dim">Stable (margin &gt; 2x)</text>
				<circle cx="8" cy="30" r="5" fill="#fbbf24" />
				<text x="20" y="30" dominant-baseline="middle" class="text-xs fill-star-dim">Marginal (1-2x)</text>
				<circle cx="8" cy="50" r="5" fill="#ef4444" />
				<text x="20" y="50" dominant-baseline="middle" class="text-xs fill-star-dim">Flutter (&lt; 1x)</text>
				<line x1="3" y1="67" x2="13" y2="67" stroke="#fbbf24" stroke-width="2" stroke-dasharray="3,2" />
				<text x="20" y="67" dominant-baseline="middle" class="text-xs fill-star-dim">Flutter boundary</text>
			</g>
		</svg>

		<!-- Sweep Data Table -->
		<div class="mt-4 overflow-x-auto">
			<table class="w-full text-xs">
				<thead>
					<tr class="border-b border-space-600">
						<th class="text-left text-star-faint py-2 px-2">Diameter</th>
						<th class="text-left text-star-faint py-2 px-2">Status</th>
						<th class="text-right text-star-faint py-2 px-2">Flutter Margin</th>
						<th class="text-right text-star-faint py-2 px-2">f_1</th>
						<th class="text-right text-star-faint py-2 px-2">Min Tension</th>
					</tr>
				</thead>
				<tbody>
					{#each output.result.sweepPoints as point}
						<tr class="border-b border-space-700/50">
							<td class="text-star-white py-1.5 px-2">{point.diameter} m</td>
							<td class="py-1.5 px-2">
								<span class="{point.stability === 'stable' ? 'text-green-400' : point.stability === 'marginal' ? 'text-solar-gold' : 'text-sun-red'}">
									{point.stability}
								</span>
							</td>
							<td class="text-star-white text-right py-1.5 px-2">{point.flutterMargin.toFixed(2)}x</td>
							<td class="text-star-white text-right py-1.5 px-2 font-mono">
								{point.lowestFrequency < 1
									? (point.lowestFrequency * 1000).toFixed(1) + ' mHz'
									: point.lowestFrequency.toFixed(3) + ' Hz'}
							</td>
							<td class="text-star-white text-right py-1.5 px-2 font-mono">{point.flutterBoundaryTension.toFixed(2)} N/m</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a simulation to see the stability boundary map</p>
		</div>
	{/if}
</div>
