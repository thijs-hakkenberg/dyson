<script lang="ts">
	import type {
		DeploymentOptOutput,
		DeploymentStrategy
	} from '$lib/services/simulation/deployment-optimization';

	interface Props {
		output: DeploymentOptOutput | null;
	}

	let { output }: Props = $props();

	const strategyColors: Record<DeploymentStrategy, string> = {
		sequential: '#60a5fa',
		batch: '#4ade80',
		greedy: '#fb923c',
		'nn-guided': '#22d3ee'
	};

	const strategyLabels: Record<DeploymentStrategy, string> = {
		sequential: 'Sequential',
		batch: 'Batch',
		greedy: 'Greedy',
		'nn-guided': 'NN-Guided'
	};

	// Timeline chart dimensions
	const tw = 600;
	const th = 280;
	const tp = { top: 25, right: 30, bottom: 45, left: 60 };
	const tiw = tw - tp.left - tp.right;
	const tih = th - tp.top - tp.bottom;

	// Bar chart dimensions
	const bw = 600;
	const bh = 200;
	const bp = { top: 25, right: 30, bottom: 45, left: 60 };
	const biw = bw - bp.left - bp.right;
	const bih = bh - bp.top - bp.bottom;

	// Derive timeline data
	let timelineData = $derived.by(() => {
		if (!output) return [];
		return output.result.strategyStats.map((stats) => ({
			strategy: stats.strategy,
			color: strategyColors[stats.strategy],
			label: strategyLabels[stats.strategy],
			timeline: stats.avgTimeline
		}));
	});

	let maxDay = $derived(
		timelineData.length > 0
			? Math.max(...timelineData.flatMap((d) => d.timeline.map((t) => t.day)), 1)
			: 1
	);

	let maxUnits = $derived(
		output ? output.config.unitCount : 1
	);

	// Derive bar chart data
	let barData = $derived.by(() => {
		if (!output) return [];
		return output.result.strategyStats.map((stats) => ({
			strategy: stats.strategy,
			color: strategyColors[stats.strategy],
			label: strategyLabels[stats.strategy],
			propellant: stats.propellantUsed.mean,
			isBest: stats.strategy === output.result.bestStrategy
		}));
	});

	let maxPropellant = $derived(
		barData.length > 0 ? Math.max(...barData.map((d) => d.propellant)) * 1.15 : 1
	);

	function timelineX(day: number): number {
		return tp.left + (day / maxDay) * tiw;
	}

	function timelineY(units: number): number {
		return tp.top + tih - (units / maxUnits) * tih;
	}

	function timelinePath(points: { day: number; unitsDeployed: number }[]): string {
		if (points.length === 0) return '';
		return points
			.map((p, i) => `${i === 0 ? 'M' : 'L'}${timelineX(p.day)},${timelineY(p.unitsDeployed)}`)
			.join(' ');
	}

	function barX(i: number): number {
		const barW = biw / barData.length;
		return bp.left + i * barW + barW / 2;
	}

	function formatPropellant(kg: number): string {
		if (kg >= 1_000_000) return (kg / 1_000_000).toFixed(1) + 'M';
		if (kg >= 1_000) return (kg / 1_000).toFixed(0) + 'k';
		return Math.round(kg).toString();
	}
</script>

<div class="space-y-6">
	<!-- Timeline Chart -->
	<div class="card-glow p-6">
		<h3 class="text-lg font-bold text-star-white mb-4">Deployment Timeline</h3>

		{#if output && timelineData.length > 0}
			<svg viewBox="0 0 {tw} {th}" class="w-full h-auto">
				<!-- Grid lines -->
				{#each [0, 0.25, 0.5, 0.75, 1] as tick}
					<line
						x1={tp.left}
						y1={tp.top + tih * (1 - tick)}
						x2={tw - tp.right}
						y2={tp.top + tih * (1 - tick)}
						stroke="currentColor"
						stroke-opacity="0.1"
						class="text-star-dim"
					/>
					<text
						x={tp.left - 8}
						y={tp.top + tih * (1 - tick)}
						text-anchor="end"
						dominant-baseline="middle"
						class="text-xs fill-star-faint"
					>
						{Math.round(maxUnits * tick).toLocaleString()}
					</text>
				{/each}

				<!-- X axis ticks -->
				{#each [0, 0.25, 0.5, 0.75, 1] as tick}
					<text
						x={tp.left + tiw * tick}
						y={th - bp.bottom + 25}
						text-anchor="middle"
						class="text-xs fill-star-faint"
					>
						{Math.round(maxDay * tick).toLocaleString()}d
					</text>
				{/each}

				<!-- Axis labels -->
				<text
					x={15}
					y={th / 2}
					text-anchor="middle"
					transform="rotate(-90, 15, {th / 2})"
					class="text-xs fill-star-dim"
				>
					Units Deployed
				</text>
				<text
					x={tw / 2}
					y={th - 5}
					text-anchor="middle"
					class="text-xs fill-star-dim"
				>
					Days
				</text>

				<!-- Timeline lines -->
				{#each timelineData as data}
					<path
						d={timelinePath(data.timeline)}
						fill="none"
						stroke={data.color}
						stroke-width="2"
						stroke-linejoin="round"
					/>
				{/each}

				<!-- Legend -->
				{#each timelineData as data, i}
					<rect
						x={tw - tp.right - 100}
						y={tp.top + i * 18}
						width="12"
						height="3"
						fill={data.color}
						rx="1"
					/>
					<text
						x={tw - tp.right - 84}
						y={tp.top + i * 18 + 4}
						class="text-xs fill-star-dim"
					>
						{data.label}
					</text>
				{/each}
			</svg>
		{:else}
			<div class="h-48 flex items-center justify-center text-star-dim">
				<p>Run simulation to see deployment timeline</p>
			</div>
		{/if}
	</div>

	<!-- Propellant Bar Chart -->
	<div class="card-glow p-6">
		<h3 class="text-lg font-bold text-star-white mb-4">Propellant Usage by Strategy</h3>

		{#if output && barData.length > 0}
			<svg viewBox="0 0 {bw} {bh}" class="w-full h-auto">
				<!-- Grid lines -->
				{#each [0, 0.25, 0.5, 0.75, 1] as tick}
					<line
						x1={bp.left}
						y1={bp.top + bih * (1 - tick)}
						x2={bw - bp.right}
						y2={bp.top + bih * (1 - tick)}
						stroke="currentColor"
						stroke-opacity="0.1"
						class="text-star-dim"
					/>
					<text
						x={bp.left - 8}
						y={bp.top + bih * (1 - tick)}
						text-anchor="end"
						dominant-baseline="middle"
						class="text-xs fill-star-faint"
					>
						{formatPropellant(maxPropellant * tick)}
					</text>
				{/each}

				<!-- Y axis label -->
				<text
					x={10}
					y={bh / 2}
					text-anchor="middle"
					transform="rotate(-90, 10, {bh / 2})"
					class="text-xs fill-star-dim"
				>
					Propellant (kg)
				</text>

				<!-- Bars -->
				{#each barData as data, i}
					{@const barW = biw / barData.length * 0.6}
					{@const barH = (data.propellant / maxPropellant) * bih}
					<rect
						x={barX(i) - barW / 2}
						y={bp.top + bih - barH}
						width={barW}
						height={barH}
						fill={data.color}
						opacity={data.isBest ? 1 : 0.6}
						rx="3"
					/>

					<!-- Value label -->
					<text
						x={barX(i)}
						y={bp.top + bih - barH - 5}
						text-anchor="middle"
						class="text-xs"
						fill={data.color}
					>
						{formatPropellant(data.propellant)} kg
					</text>

					<!-- X axis label -->
					<text
						x={barX(i)}
						y={bh - bp.bottom + 20}
						text-anchor="middle"
						class="text-xs fill-star-white"
					>
						{data.label}
					</text>

					{#if data.isBest}
						<text
							x={barX(i)}
							y={bh - 5}
							text-anchor="middle"
							class="text-xs fill-solar-gold font-semibold"
						>
							BEST
						</text>
					{/if}
				{/each}
			</svg>
		{:else}
			<div class="h-36 flex items-center justify-center text-star-dim">
				<p>Run simulation to see propellant comparison</p>
			</div>
		{/if}
	</div>
</div>
