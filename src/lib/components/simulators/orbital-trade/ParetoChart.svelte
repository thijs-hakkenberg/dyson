<script lang="ts">
	import type { OrbitalTradeSimulationOutput, ParetoAnalysis } from '$lib/services/simulation/orbital-trade';
	import { performParetoAnalysis, ORBITAL_LOCATIONS } from '$lib/services/simulation/orbital-trade';

	interface Props {
		output: OrbitalTradeSimulationOutput | null;
	}

	let { output }: Props = $props();

	// Get short name for display
	function getShortName(locationId: string): string {
		const names: Record<string, string> = {
			'nrho': 'NRHO',
			'sun_earth_l1': 'SE-L1',
			'sun_earth_l4': 'SE-L4',
			'sun_earth_l5': 'SE-L5',
			'helio_1au': '1.0 AU',
			'helio_0p7au': '0.7 AU',
			'helio_0p5au': '0.5 AU',
			'sun_mercury_l1': 'Hg-L1'
		};
		return names[locationId] ?? locationId;
	}

	// Chart dimensions
	const chartWidth = 550;
	const chartHeight = 350;
	const padding = { top: 30, right: 30, bottom: 50, left: 60 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Derive Pareto analysis
	let paretoAnalysis = $derived.by(() => {
		if (!output) return null;
		return performParetoAnalysis(output);
	});

	// Prepare chart data - plot cost vs capability with risk as point size
	let chartData = $derived.by(() => {
		if (!paretoAnalysis) return [];

		const allScores = [...paretoAnalysis.paretoFrontier, ...paretoAnalysis.dominated];
		return allScores.map(score => ({
			location: score.location,
			name: getShortName(score.location),
			x: score.deltaVCost, // Cost score (higher = better/cheaper)
			y: score.solarPowerScore * 0.5 + score.commLatencyScore * 0.5, // Capability score
			risk: score.stabilityScore,
			thermal: score.thermalFeasibility,
			isParetoOptimal: score.isParetoOptimal,
			isRecommended: output?.recommendation === score.location
		}));
	});

	// Calculate scales
	let xMin = $derived(chartData.length > 0 ? Math.min(...chartData.map(d => d.x)) * 0.9 : 0);
	let xMax = $derived(chartData.length > 0 ? Math.max(...chartData.map(d => d.x)) * 1.1 : 1);
	let yMin = $derived(chartData.length > 0 ? Math.min(...chartData.map(d => d.y)) * 0.9 : 0);
	let yMax = $derived(chartData.length > 0 ? Math.max(...chartData.map(d => d.y)) * 1.1 : 1);

	function xScale(value: number): number {
		return padding.left + ((value - xMin) / (xMax - xMin)) * innerWidth;
	}

	function yScale(value: number): number {
		return padding.top + innerHeight - ((value - yMin) / (yMax - yMin)) * innerHeight;
	}

	// Point size based on risk score (larger = lower risk = better stability)
	function getPointRadius(risk: number): number {
		return 8 + risk * 8; // 8-16px radius
	}

	// Generate Pareto frontier line
	let paretoLine = $derived.by(() => {
		if (!paretoAnalysis || paretoAnalysis.paretoFrontier.length < 2) return '';

		// Sort Pareto-optimal points by x (cost score)
		const paretoPoints = chartData
			.filter(d => d.isParetoOptimal)
			.sort((a, b) => a.x - b.x);

		if (paretoPoints.length < 2) return '';

		// Create line path
		const points = paretoPoints.map(d => `${xScale(d.x)},${yScale(d.y)}`);
		return `M ${points.join(' L ')}`;
	});

	// Axis ticks
	let xTicks = $derived.by(() => {
		if (chartData.length === 0) return [];
		const range = xMax - xMin;
		return [xMin, xMin + range * 0.25, xMin + range * 0.5, xMin + range * 0.75, xMax];
	});

	let yTicks = $derived.by(() => {
		if (chartData.length === 0) return [];
		const range = yMax - yMin;
		return [yMin, yMin + range * 0.25, yMin + range * 0.5, yMin + range * 0.75, yMax];
	});
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-2">Pareto Frontier</h3>
	<p class="text-xs text-star-faint mb-4">
		Cost Score vs Capability Score (point size = stability/risk)
	</p>

	{#if output && chartData.length > 0}
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

			<!-- Pareto frontier line -->
			{#if paretoLine}
				<path
					d={paretoLine}
					fill="none"
					stroke="#ffc107"
					stroke-width="2"
					stroke-dasharray="4 4"
					opacity="0.7"
				/>
			{/if}

			<!-- Utopia point (ideal) -->
			{#if paretoAnalysis}
				<circle
					cx={xScale(paretoAnalysis.utopiaPoint.cost)}
					cy={yScale(paretoAnalysis.utopiaPoint.capability)}
					r="6"
					fill="none"
					stroke="#00ffff"
					stroke-width="2"
					stroke-dasharray="2 2"
				/>
				<text
					x={xScale(paretoAnalysis.utopiaPoint.cost) + 10}
					y={yScale(paretoAnalysis.utopiaPoint.capability) - 5}
					class="text-xs fill-cosmic-cyan"
				>
					Utopia
				</text>
			{/if}

			<!-- Data points -->
			{#each chartData as point}
				<g>
					<!-- Point -->
					<circle
						cx={xScale(point.x)}
						cy={yScale(point.y)}
						r={getPointRadius(point.risk)}
						fill={point.isRecommended
							? '#00ffff'
							: point.isParetoOptimal
								? '#ffc107'
								: '#4a5568'}
						fill-opacity={point.isParetoOptimal ? 0.8 : 0.5}
						stroke={point.isRecommended ? '#00ffff' : point.isParetoOptimal ? '#ffc107' : '#6b7280'}
						stroke-width={point.isRecommended ? 3 : 1.5}
					/>

					<!-- Label -->
					<text
						x={xScale(point.x)}
						y={yScale(point.y) - getPointRadius(point.risk) - 5}
						text-anchor="middle"
						class="text-xs {point.isRecommended
							? 'fill-cosmic-cyan font-semibold'
							: point.isParetoOptimal
								? 'fill-solar-gold'
								: 'fill-star-dim'}"
					>
						{point.name}
					</text>

					<!-- Thermal warning for low thermal feasibility -->
					{#if point.thermal < 0.5}
						<text
							x={xScale(point.x)}
							y={yScale(point.y) + getPointRadius(point.risk) + 12}
							text-anchor="middle"
							class="text-xs fill-sun-red"
						>
							!thermal
						</text>
					{/if}
				</g>
			{/each}

			<!-- Y-axis -->
			<line
				x1={padding.left}
				y1={padding.top}
				x2={padding.left}
				y2={chartHeight - padding.bottom}
				stroke="currentColor"
				stroke-opacity="0.3"
				class="text-star-dim"
			/>

			<!-- Y-axis label -->
			<text
				x={15}
				y={chartHeight / 2}
				text-anchor="middle"
				transform="rotate(-90, 15, {chartHeight / 2})"
				class="text-xs fill-star-dim"
			>
				Capability Score (power + comm)
			</text>

			<!-- Y-axis ticks -->
			{#each yTicks as tick}
				<text
					x={padding.left - 10}
					y={yScale(tick)}
					text-anchor="end"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
				>
					{tick.toFixed(2)}
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

			<!-- X-axis label -->
			<text
				x={chartWidth / 2}
				y={chartHeight - 10}
				text-anchor="middle"
				class="text-xs fill-star-dim"
			>
				Cost Score (delta-V efficiency)
			</text>

			<!-- X-axis ticks -->
			{#each xTicks as tick}
				<text
					x={xScale(tick)}
					y={chartHeight - padding.bottom + 15}
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
				<div class="w-4 h-4 rounded-full bg-cosmic-cyan border-2 border-cosmic-cyan"></div>
				<span class="text-star-dim">Recommended</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-4 h-4 rounded-full bg-solar-gold/80 border border-solar-gold"></div>
				<span class="text-star-dim">Pareto-optimal</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-4 h-4 rounded-full bg-space-500/50 border border-space-400"></div>
				<span class="text-star-dim">Dominated</span>
			</div>
			<div class="flex items-center gap-1.5">
				<div class="w-3 h-0.5 border-t-2 border-dashed border-solar-gold"></div>
				<span class="text-star-dim">Pareto frontier</span>
			</div>
		</div>

		<!-- Pareto explanation -->
		<div class="mt-4 p-3 bg-space-700/30 rounded text-xs text-star-faint">
			<p>
				<strong class="text-star-dim">Pareto frontier:</strong> Locations where improving one objective
				requires sacrificing another. Point size indicates stability (larger = more stable).
				Locations below/left of the frontier are dominated by better alternatives.
			</p>
		</div>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run analysis to see Pareto frontier</p>
		</div>
	{/if}
</div>
