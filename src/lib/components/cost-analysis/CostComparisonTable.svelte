<script lang="ts">
	import type { ModelCostComparison } from '$lib/types/cost-analysis';
	import { formatCostAmount } from '$lib/services/cost-analysis';

	interface Props {
		comparison: ModelCostComparison;
		showDetails?: boolean;
	}

	let { comparison, showDetails = false }: Props = $props();

	// Calculate variance indicator
	const varianceLevel = $derived(() => {
		if (comparison.rangePercent >= 100) return 'high';
		if (comparison.rangePercent >= 50) return 'medium';
		return 'low';
	});

	const varianceColor = $derived(() => {
		const level = varianceLevel();
		if (level === 'high') return 'text-red-400';
		if (level === 'medium') return 'text-amber-400';
		return 'text-green-400';
	});
</script>

<div class="card-glow overflow-hidden">
	<!-- Header -->
	<div class="px-6 py-4 bg-space-600 border-b border-space-500">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="font-semibold text-star-white">{comparison.bomItem.name}</h3>
				<p class="text-sm text-star-dim mt-1">
					{comparison.phaseId.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
					- {comparison.bomItem.bomId}
				</p>
			</div>
			<div class="text-right">
				<div class="text-sm text-star-faint">Variance</div>
				<div class="text-lg font-bold {varianceColor()}">
					{comparison.rangePercent.toFixed(0)}%
				</div>
			</div>
		</div>
	</div>

	<!-- Comparison Table -->
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr class="text-left text-sm text-star-faint border-b border-space-500">
					<th class="px-6 py-3 font-medium">Model</th>
					<th class="px-6 py-3 font-medium text-right">Total Cost</th>
					{#if showDetails}
						<th class="px-6 py-3 font-medium text-right">Development</th>
						<th class="px-6 py-3 font-medium text-right">Production</th>
						<th class="px-6 py-3 font-medium text-right">Per Unit</th>
					{/if}
					<th class="px-6 py-3 font-medium text-right">vs Average</th>
				</tr>
			</thead>
			<tbody>
				{#each comparison.models as model}
					{@const vsAverage =
						comparison.averageCost > 0
							? ((model.total - comparison.averageCost) / comparison.averageCost) * 100
							: 0}
					<tr class="border-b border-space-600 hover:bg-space-600/50 transition-colors">
						<td class="px-6 py-4">
							<div class="font-medium text-star-white">{model.modelName}</div>
							<div class="text-xs text-star-faint">{model.modelId}</div>
						</td>
						<td class="px-6 py-4 text-right">
							{#if model.total > 0}
								<span class="font-semibold text-sun-gold">
									{formatCostAmount(model.total)}
								</span>
							{:else}
								<span class="text-star-faint">N/A</span>
							{/if}
						</td>
						{#if showDetails}
							<td class="px-6 py-4 text-right text-star-dim">
								{#if model.developmentCost}
									{formatCostAmount(model.developmentCost)}
								{:else}
									<span class="text-star-faint">-</span>
								{/if}
							</td>
							<td class="px-6 py-4 text-right text-star-dim">
								{#if model.productionCost}
									{formatCostAmount(model.productionCost)}
								{:else}
									<span class="text-star-faint">-</span>
								{/if}
							</td>
							<td class="px-6 py-4 text-right text-star-dim">
								{#if model.perUnitCost}
									{formatCostAmount(model.perUnitCost)}
								{:else}
									<span class="text-star-faint">-</span>
								{/if}
							</td>
						{/if}
						<td class="px-6 py-4 text-right">
							{#if model.total > 0 && comparison.averageCost > 0}
								<span
									class={vsAverage > 0 ? 'text-red-400' : vsAverage < 0 ? 'text-green-400' : 'text-star-dim'}
								>
									{vsAverage > 0 ? '+' : ''}{vsAverage.toFixed(0)}%
								</span>
							{:else}
								<span class="text-star-faint">-</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr class="bg-space-600/50">
					<td class="px-6 py-3 font-medium text-star-white">Summary</td>
					<td class="px-6 py-3 text-right">
						<div class="text-xs text-star-faint">Average</div>
						<div class="font-semibold text-cosmic-cyan">
							{formatCostAmount(comparison.averageCost)}
						</div>
					</td>
					{#if showDetails}
						<td colspan="3" class="px-6 py-3 text-right text-sm text-star-dim">
							Range: {formatCostAmount(comparison.minCost)} - {formatCostAmount(comparison.maxCost)}
						</td>
					{/if}
					<td class="px-6 py-3 text-right">
						{#if comparison.baselineCost}
							<div class="text-xs text-star-faint">Baseline</div>
							<div class="text-sm text-star-dim">{formatCostAmount(comparison.baselineCost)}</div>
						{/if}
					</td>
				</tr>
			</tfoot>
		</table>
	</div>
</div>
