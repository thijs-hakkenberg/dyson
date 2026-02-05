<script lang="ts">
	import type { CostConfidenceLevel } from '$lib/types';
	import { formatCurrency } from '$lib/services/content';
	import CostConfidenceBadge from './CostConfidenceBadge.svelte';

	interface Props {
		min: number;
		expected: number;
		max: number;
		confidence?: CostConfidenceLevel;
		basis?: string;
		showLabels?: boolean;
		compact?: boolean;
	}

	let { min, expected, max, confidence, basis, showLabels = true, compact = false }: Props = $props();

	// Calculate positions as percentages of the total range
	// Add some padding so min and max markers are visible
	const totalRange = max - min;
	const expectedPosition = $derived(totalRange > 0 ? ((expected - min) / totalRange) * 100 : 50);

	// Color based on confidence level
	const barColors = {
		low: 'bg-gradient-to-r from-red-600/40 via-red-500/60 to-red-600/40',
		medium: 'bg-gradient-to-r from-yellow-600/40 via-yellow-500/60 to-yellow-600/40',
		high: 'bg-gradient-to-r from-green-600/40 via-green-500/60 to-green-600/40'
	};

	const markerColors = {
		low: 'bg-red-400',
		medium: 'bg-yellow-400',
		high: 'bg-green-400'
	};

	const barColor = $derived(confidence ? barColors[confidence] : barColors.medium);
	const markerColor = $derived(confidence ? markerColors[confidence] : markerColors.medium);

	let showTooltip = $state(false);
</script>

<div class="relative {compact ? 'py-1' : 'py-2'}">
	<!-- Labels row -->
	{#if showLabels && !compact}
		<div class="flex justify-between text-xs text-star-faint mb-1">
			<span>{formatCurrency(min)}</span>
			<span class="font-medium text-star-dim">{formatCurrency(expected)}</span>
			<span>{formatCurrency(max)}</span>
		</div>
	{/if}

	<!-- Bar container -->
	<div
		class="relative h-2 rounded-full bg-space-600 overflow-visible cursor-help"
		onmouseenter={() => showTooltip = true}
		onmouseleave={() => showTooltip = false}
		role="img"
		aria-label="Cost range from {formatCurrency(min)} to {formatCurrency(max)}, expected {formatCurrency(expected)}"
	>
		<!-- Range bar (full width represents min to max) -->
		<div class="absolute inset-0 rounded-full {barColor}"></div>

		<!-- Expected value marker -->
		<div
			class="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full {markerColor} border-2 border-space-700 shadow-lg z-10"
			style="left: calc({expectedPosition}% - 6px)"
		></div>

		<!-- Min marker (left edge) -->
		<div class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-star-faint/50 rounded-full"></div>

		<!-- Max marker (right edge) -->
		<div class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-3 bg-star-faint/50 rounded-full"></div>
	</div>

	<!-- Tooltip -->
	{#if showTooltip && (basis || confidence)}
		<div class="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none">
			<div class="bg-space-700 border border-space-500 rounded-lg shadow-xl p-3 min-w-[250px] max-w-[350px]">
				<div class="flex items-center justify-between mb-2">
					<span class="text-xs text-star-faint">Cost Estimate Range</span>
					{#if confidence}
						<CostConfidenceBadge {confidence} />
					{/if}
				</div>
				<div class="grid grid-cols-3 gap-2 text-center mb-2">
					<div>
						<div class="text-xs text-star-faint">Min</div>
						<div class="text-sm font-medium text-star-dim">{formatCurrency(min)}</div>
					</div>
					<div>
						<div class="text-xs text-star-faint">Expected</div>
						<div class="text-sm font-bold text-sun-gold">{formatCurrency(expected)}</div>
					</div>
					<div>
						<div class="text-xs text-star-faint">Max</div>
						<div class="text-sm font-medium text-star-dim">{formatCurrency(max)}</div>
					</div>
				</div>
				{#if basis}
					<div class="border-t border-space-500 pt-2 mt-2">
						<div class="text-xs text-star-faint mb-1">Basis:</div>
						<p class="text-xs text-star-dim leading-relaxed">{basis}</p>
					</div>
				{/if}
				<!-- Tooltip arrow -->
				<div class="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-space-500"></div>
			</div>
		</div>
	{/if}

	<!-- Compact inline labels -->
	{#if showLabels && compact}
		<div class="flex justify-between text-xs text-star-faint mt-1">
			<span>{formatCurrency(min)}</span>
			<span>{formatCurrency(max)}</span>
		</div>
	{/if}
</div>
