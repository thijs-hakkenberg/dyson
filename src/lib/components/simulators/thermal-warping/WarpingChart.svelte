<script lang="ts">
	import type {
		WarpingOutput,
		WarpingComparisonResult
	} from '$lib/services/simulation/thermal-warping';
	import {
		PHASED_ARRAY_TOLERANCE,
		STRUCTURAL_TOLERANCE
	} from '$lib/services/simulation/thermal-warping';

	interface Props {
		output: WarpingOutput | null;
		comparison: WarpingComparisonResult | null;
	}

	let { output, comparison }: Props = $props();

	// Chart dimensions
	const chartWidth = 600;
	const chartHeight = 400;
	const padding = { top: 30, right: 130, bottom: 60, left: 80 };
	const innerWidth = chartWidth - padding.left - padding.right;
	const innerHeight = chartHeight - padding.top - padding.bottom;

	// Colors for comparison lines
	const lineColors = ['#4ecdc4', '#ff6b6b', '#ffeaa7', '#45b7d1', '#96ceb4'];

	// Log scale helpers
	function log10(v: number): number {
		return Math.log10(Math.max(v, 1e-12));
	}

	// Derive chart bounds from data
	let xRange = $derived.by(() => {
		return { min: Math.log10(5000), max: Math.log10(1000000) };
	});

	let yRange = $derived.by(() => {
		// Deflection range: from ~1e-6 m to ~100 m
		let yMin = -6;
		let yMax = 2;

		if (output) {
			const deflections = output.result.areaStats.map((s) => s.meanDeflection).filter((d) => d > 0);
			if (deflections.length > 0) {
				yMin = Math.floor(log10(Math.min(...deflections))) - 1;
				yMax = Math.ceil(log10(Math.max(...deflections))) + 1;
			}
		}

		if (comparison) {
			for (const result of comparison.results) {
				const deflections = result.areaStats.map((s) => s.meanDeflection).filter((d) => d > 0);
				if (deflections.length > 0) {
					yMin = Math.min(yMin, Math.floor(log10(Math.min(...deflections))) - 1);
					yMax = Math.max(yMax, Math.ceil(log10(Math.max(...deflections))) + 1);
				}
			}
		}

		// Ensure tolerance lines are visible
		yMin = Math.min(yMin, Math.floor(log10(PHASED_ARRAY_TOLERANCE)) - 1);
		yMax = Math.max(yMax, Math.ceil(log10(STRUCTURAL_TOLERANCE)) + 1);

		return { min: yMin, max: yMax };
	});

	function xScale(logArea: number): number {
		return padding.left + ((logArea - xRange.min) / (xRange.max - xRange.min)) * innerWidth;
	}

	function yScale(logDeflection: number): number {
		return padding.top + innerHeight - ((logDeflection - yRange.min) / (yRange.max - yRange.min)) * innerHeight;
	}

	// Generate path from area stats
	function generatePath(areaStats: { area: number; meanDeflection: number }[]): string {
		const points = areaStats.filter((s) => s.meanDeflection > 0);
		return points
			.map((point, i) => {
				const x = xScale(log10(point.area));
				const y = yScale(log10(point.meanDeflection));
				return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
			})
			.join(' ');
	}

	// Generate confidence band polygon
	function generateBand(areaStats: { area: number; p5Deflection: number; p95Deflection: number }[]): string {
		const points = areaStats.filter((s) => s.p5Deflection > 0 && s.p95Deflection > 0);
		if (points.length === 0) return '';
		const upper = points.map((p) => `${xScale(log10(p.area))},${yScale(log10(p.p95Deflection))}`);
		const lower = [...points].reverse().map((p) => `${xScale(log10(p.area))},${yScale(log10(p.p5Deflection))}`);
		return `M ${upper.join(' L ')} L ${lower.join(' L ')} Z`;
	}

	// Segment color based on threshold
	function getSegmentColor(deflection: number): string {
		if (deflection <= PHASED_ARRAY_TOLERANCE) return '#4ade80'; // green
		if (deflection <= STRUCTURAL_TOLERANCE) return '#fbbf24'; // yellow
		return '#ef4444'; // red
	}

	// X-axis ticks (area in m²)
	let xTicks = $derived.by(() => {
		const ticks: { value: number; label: string }[] = [];
		for (let exp = 4; exp <= 6; exp++) {
			ticks.push({ value: exp, label: `10${toSuperscript(exp)}` });
			if (exp < 6) {
				ticks.push({ value: Math.log10(3 * Math.pow(10, exp)), label: '' });
			}
		}
		return ticks;
	});

	// Y-axis ticks (deflection in m)
	let yTicks = $derived.by(() => {
		const ticks: { value: number; label: string }[] = [];
		for (let exp = yRange.min; exp <= yRange.max; exp++) {
			let label = '';
			if (exp === -6) label = '1 um';
			else if (exp === -5) label = '10 um';
			else if (exp === -4) label = '0.1 mm';
			else if (exp === -3) label = '1 mm';
			else if (exp === -2) label = '1 cm';
			else if (exp === -1) label = '10 cm';
			else if (exp === 0) label = '1 m';
			else if (exp === 1) label = '10 m';
			else if (exp === 2) label = '100 m';
			else label = `10${toSuperscript(exp)} m`;
			ticks.push({ value: exp, label });
		}
		return ticks;
	});

	function toSuperscript(n: number): string {
		const chars: Record<string, string> = { '0': '\u2070', '1': '\u00B9', '2': '\u00B2', '3': '\u00B3', '4': '\u2074', '5': '\u2075', '6': '\u2076', '7': '\u2077', '8': '\u2078', '9': '\u2079', '-': '\u207B' };
		return String(n).split('').map((c) => chars[c] || c).join('');
	}

	// Color-segmented path for single output
	let coloredSegments = $derived.by(() => {
		if (!output) return [];
		const stats = output.result.areaStats.filter((s) => s.meanDeflection > 0);
		if (stats.length < 2) return [];

		const segments: { path: string; color: string }[] = [];
		for (let i = 0; i < stats.length - 1; i++) {
			const x1 = xScale(log10(stats[i].area));
			const y1 = yScale(log10(stats[i].meanDeflection));
			const x2 = xScale(log10(stats[i + 1].area));
			const y2 = yScale(log10(stats[i + 1].meanDeflection));
			const avgDeflection = (stats[i].meanDeflection + stats[i + 1].meanDeflection) / 2;
			segments.push({
				path: `M ${x1} ${y1} L ${x2} ${y2}`,
				color: getSegmentColor(avgDeflection)
			});
		}
		return segments;
	});

	let hasData = $derived(
		(output !== null && output.result.areaStats.length > 0) ||
		(comparison !== null && comparison.results.length > 0)
	);
</script>

<div class="card-glow p-6">
	<h3 class="text-lg font-bold text-star-white mb-4">
		Area vs. Deflection
	</h3>

	{#if hasData}
		<svg viewBox="0 0 {chartWidth} {chartHeight}" class="w-full h-auto">
			<!-- Grid lines -->
			{#each yTicks as tick}
				<line
					x1={padding.left}
					y1={yScale(tick.value)}
					x2={chartWidth - padding.right}
					y2={yScale(tick.value)}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				<text
					x={padding.left - 10}
					y={yScale(tick.value)}
					text-anchor="end"
					dominant-baseline="middle"
					class="text-xs fill-star-faint"
					font-size="10"
				>
					{tick.label}
				</text>
			{/each}

			{#each xTicks as tick}
				<line
					x1={xScale(tick.value)}
					y1={padding.top}
					x2={xScale(tick.value)}
					y2={padding.top + innerHeight}
					stroke="currentColor"
					stroke-opacity="0.1"
					class="text-star-dim"
				/>
				{#if tick.label}
					<text
						x={xScale(tick.value)}
						y={padding.top + innerHeight + 20}
						text-anchor="middle"
						class="text-xs fill-star-faint"
						font-size="10"
					>
						{tick.label}
					</text>
				{/if}
			{/each}

			<!-- Axis labels -->
			<text
				x={15}
				y={chartHeight / 2}
				text-anchor="middle"
				transform="rotate(-90, 15, {chartHeight / 2})"
				class="text-xs fill-star-dim"
				font-size="11"
			>
				Effective Deflection
			</text>

			<text
				x={padding.left + innerWidth / 2}
				y={chartHeight - 8}
				text-anchor="middle"
				class="text-xs fill-star-dim"
				font-size="11"
			>
				Membrane Area (m&sup2;)
			</text>

			<!-- Tolerance threshold lines -->
			<line
				x1={padding.left}
				y1={yScale(log10(PHASED_ARRAY_TOLERANCE))}
				x2={chartWidth - padding.right}
				y2={yScale(log10(PHASED_ARRAY_TOLERANCE))}
				stroke="#ef4444"
				stroke-width="1.5"
				stroke-dasharray="6,3"
				opacity="0.7"
			/>
			<text
				x={chartWidth - padding.right + 5}
				y={yScale(log10(PHASED_ARRAY_TOLERANCE))}
				text-anchor="start"
				dominant-baseline="middle"
				class="fill-sun-red"
				font-size="9"
			>
				Phased Array (5mm)
			</text>

			<line
				x1={padding.left}
				y1={yScale(log10(STRUCTURAL_TOLERANCE))}
				x2={chartWidth - padding.right}
				y2={yScale(log10(STRUCTURAL_TOLERANCE))}
				stroke="#fbbf24"
				stroke-width="1.5"
				stroke-dasharray="6,3"
				opacity="0.7"
			/>
			<text
				x={chartWidth - padding.right + 5}
				y={yScale(log10(STRUCTURAL_TOLERANCE))}
				text-anchor="start"
				dominant-baseline="middle"
				class="fill-solar-gold"
				font-size="9"
			>
				Structural (10cm)
			</text>

			<!-- Single output mode -->
			{#if output && !comparison}
				<!-- Confidence band -->
				{@const band = generateBand(output.result.areaStats)}
				{#if band}
					<path d={band} fill="#4ecdc4" opacity="0.15" />
				{/if}

				<!-- Color-segmented main curve -->
				{#each coloredSegments as seg}
					<path
						d={seg.path}
						fill="none"
						stroke={seg.color}
						stroke-width="2.5"
						stroke-linecap="round"
					/>
				{/each}

				<!-- Legend for single mode -->
				<g transform="translate({chartWidth - padding.right + 5}, {padding.top + 5})">
					<rect x="0" y="-5" width="12" height="4" fill="#4ecdc4" opacity="0.3" />
					<text x="16" y="0" class="text-xs fill-star-faint" font-size="8">95% CI</text>
				</g>
			{/if}

			<!-- Comparison mode -->
			{#if comparison}
				{#each comparison.results as result, i}
					<path
						d={generatePath(result.areaStats)}
						fill="none"
						stroke={lineColors[i % lineColors.length]}
						stroke-width="2"
						stroke-linejoin="round"
						opacity="0.85"
					/>
				{/each}

				<!-- Legend -->
				{#each comparison.labels as label, i}
					<g transform="translate({chartWidth - padding.right + 5}, {padding.top + 5 + i * 20})">
						<line x1="0" y1="0" x2="16" y2="0" stroke={lineColors[i % lineColors.length]} stroke-width="2" />
						<text x="20" y="0" dominant-baseline="middle" class="text-xs fill-star-dim" font-size="9">
							{label}
						</text>
					</g>
				{/each}
			{/if}
		</svg>
	{:else}
		<div class="h-64 flex items-center justify-center text-star-dim">
			<p>Run a simulation to see deflection curves</p>
		</div>
	{/if}
</div>
