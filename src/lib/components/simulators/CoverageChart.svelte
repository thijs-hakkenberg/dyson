<script lang="ts">
	import type { ConstellationResult, SimulationAnalysis } from '$lib/services/simulation';

	interface Props {
		results: ConstellationResult[];
		analysis: SimulationAnalysis | null;
		showHighValue?: boolean;
	}

	let { results, analysis, showHighValue = false }: Props = $props();

	// Chart dimensions
	const width = 600;
	const height = 350;
	const padding = { top: 30, right: 30, bottom: 50, left: 60 };
	const chartWidth = width - padding.left - padding.right;
	const chartHeight = height - padding.top - padding.bottom;

	// Scale functions
	function scaleX(size: number): number {
		const minSize = 20;
		const maxSize = 70;
		return padding.left + ((size - minSize) / (maxSize - minSize)) * chartWidth;
	}

	function scaleY(coverage: number): number {
		return padding.top + chartHeight - (coverage / 100) * chartHeight;
	}

	// Generate path for mean line
	const meanPath = $derived(() => {
		if (results.length === 0) return '';
		const data = showHighValue
			? results.map(r => ({ size: r.constellationSize, value: r.highValueCoverage.mean }))
			: results.map(r => ({ size: r.constellationSize, value: r.coverage.mean }));

		return data.map((d, i) =>
			`${i === 0 ? 'M' : 'L'} ${scaleX(d.size)} ${scaleY(d.value)}`
		).join(' ');
	});

	// Generate confidence band path
	const confidenceBandPath = $derived(() => {
		if (results.length === 0) return '';

		const getData = (r: ConstellationResult) => showHighValue ? r.highValueCoverage : r.coverage;

		// Upper bound (95th percentile)
		const upper = results.map(r =>
			`${scaleX(r.constellationSize)} ${scaleY(getData(r).percentile95)}`
		);

		// Lower bound (5th percentile) - reversed
		const lower = results.slice().reverse().map(r =>
			`${scaleX(r.constellationSize)} ${scaleY(getData(r).percentile5)}`
		);

		return `M ${upper.join(' L ')} L ${lower.join(' L ')} Z`;
	});

	// Grid lines
	const yGridLines = [0, 25, 50, 75, 100];
	const xGridLines = [20, 30, 40, 50, 60, 70];
</script>

<div class="card-glow p-6">
	<div class="flex items-center justify-between mb-4">
		<h3 class="text-lg font-bold text-star-white">Coverage vs Constellation Size</h3>
		<div class="flex items-center gap-4 text-sm">
			<label class="flex items-center gap-2 cursor-pointer">
				<input
					type="checkbox"
					checked={showHighValue}
					onchange={() => showHighValue = !showHighValue}
					class="w-4 h-4 accent-cosmic-cyan"
				/>
				<span class="text-star-dim">High-Value Only</span>
			</label>
		</div>
	</div>

	{#if results.length === 0}
		<div class="flex items-center justify-center h-[350px] text-star-dim">
			Run simulation to see coverage curve
		</div>
	{:else}
		<svg viewBox="0 0 {width} {height}" class="w-full h-auto">
			<!-- Grid lines -->
			<g class="grid">
				{#each yGridLines as y}
					<line
						x1={padding.left}
						y1={scaleY(y)}
						x2={width - padding.right}
						y2={scaleY(y)}
						stroke="var(--color-space-600)"
						stroke-dasharray="4,4"
					/>
					<text
						x={padding.left - 10}
						y={scaleY(y)}
						text-anchor="end"
						dominant-baseline="middle"
						class="text-xs fill-star-faint"
					>
						{y}%
					</text>
				{/each}

				{#each xGridLines as x}
					<line
						x1={scaleX(x)}
						y1={padding.top}
						x2={scaleX(x)}
						y2={height - padding.bottom}
						stroke="var(--color-space-600)"
						stroke-dasharray="4,4"
					/>
					<text
						x={scaleX(x)}
						y={height - padding.bottom + 20}
						text-anchor="middle"
						class="text-xs fill-star-faint"
					>
						{x}
					</text>
				{/each}
			</g>

			<!-- Confidence band -->
			<path
				d={confidenceBandPath()}
				fill="var(--color-cosmic-cyan)"
				fill-opacity="0.15"
			/>

			<!-- Mean line -->
			<path
				d={meanPath()}
				fill="none"
				stroke="var(--color-cosmic-cyan)"
				stroke-width="2.5"
			/>

			<!-- Data points -->
			{#each results as result}
				{@const coverage = showHighValue ? result.highValueCoverage : result.coverage}
				<circle
					cx={scaleX(result.constellationSize)}
					cy={scaleY(coverage.mean)}
					r="5"
					fill="var(--color-space-700)"
					stroke="var(--color-cosmic-cyan)"
					stroke-width="2"
				/>
			{/each}

			<!-- Knee point marker -->
			{#if analysis}
				<g>
					<line
						x1={scaleX(analysis.kneePoint)}
						y1={padding.top}
						x2={scaleX(analysis.kneePoint)}
						y2={height - padding.bottom}
						stroke="var(--color-sun-gold)"
						stroke-width="2"
						stroke-dasharray="6,4"
					/>
					<text
						x={scaleX(analysis.kneePoint)}
						y={padding.top - 10}
						text-anchor="middle"
						class="text-xs fill-sun-gold font-medium"
					>
						Knee Point ({analysis.kneePoint})
					</text>
				</g>
			{/if}

			<!-- Baseline marker (50 satellites) -->
			{#if analysis}
				<g>
					<line
						x1={scaleX(50)}
						y1={padding.top}
						x2={scaleX(50)}
						y2={height - padding.bottom}
						stroke="var(--color-cosmic-purple)"
						stroke-width="1.5"
						stroke-dasharray="4,4"
						opacity="0.7"
					/>
				</g>
			{/if}

			<!-- Axis labels -->
			<text
				x={width / 2}
				y={height - 8}
				text-anchor="middle"
				class="text-sm fill-star-dim"
			>
				Constellation Size (satellites)
			</text>
			<text
				x={-height / 2}
				y={20}
				text-anchor="middle"
				transform="rotate(-90)"
				class="text-sm fill-star-dim"
			>
				Coverage (%)
			</text>
		</svg>

		<!-- Legend -->
		<div class="flex items-center justify-center gap-6 mt-4 text-xs text-star-dim">
			<div class="flex items-center gap-2">
				<div class="w-8 h-0.5 bg-cosmic-cyan"></div>
				<span>Mean Coverage</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-8 h-3 bg-cosmic-cyan/20"></div>
				<span>95% Confidence</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-8 h-0.5 bg-sun-gold" style="border-top: 2px dashed var(--color-sun-gold);"></div>
				<span>Knee Point</span>
			</div>
		</div>
	{/if}
</div>
