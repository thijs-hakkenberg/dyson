<script lang="ts">
	import type { BOMItem } from '$lib/types';
	import { formatCurrency, groupBOMByCategory } from '$lib/services/content';

	interface Props {
		items: BOMItem[];
		showCategories?: boolean;
		phaseId?: string;
	}

	let { items, showCategories = true, phaseId }: Props = $props();

	const groupedItems = $derived(showCategories ? groupBOMByCategory(items) : { 'All Items': items });
	const totalCost = $derived(items.reduce((sum, item) => sum + item.totalCost, 0));

	function getItemLink(item: BOMItem): string | null {
		if (phaseId && item.slug) {
			return `/plan/${phaseId}/bom/${item.slug}`;
		}
		return null;
	}
</script>

<div class="space-y-6">
	{#each Object.entries(groupedItems) as [category, categoryItems]}
		<div class="card-glow overflow-hidden">
			{#if showCategories}
				<div class="px-6 py-3 bg-space-600 border-b border-space-500">
					<h3 class="font-semibold text-star-white">{category}</h3>
				</div>
			{/if}

			<div class="overflow-x-auto">
				<table class="w-full">
					<thead>
						<tr class="text-left text-sm text-star-faint border-b border-space-500">
							<th class="px-6 py-3 font-medium">Item</th>
							<th class="px-6 py-3 font-medium">Quantity</th>
							<th class="px-6 py-3 font-medium text-right">Unit Cost</th>
							<th class="px-6 py-3 font-medium text-right">Total Cost</th>
							{#if phaseId}
								<th class="px-6 py-3 font-medium text-center">Specs</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						{#each categoryItems as item}
							{@const itemLink = getItemLink(item)}
							<tr class="border-b border-space-600 hover:bg-space-600/50 transition-colors">
								<td class="px-6 py-4">
									{#if itemLink}
										<a href={itemLink} class="group">
											<div class="font-medium text-star-white group-hover:text-cosmic-cyan transition-colors">
												{item.name}
												<svg class="w-4 h-4 inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
												</svg>
											</div>
											<div class="text-sm text-star-dim mt-1">{item.description}</div>
										</a>
									{:else}
										<div class="font-medium text-star-white">{item.name}</div>
										<div class="text-sm text-star-dim mt-1">{item.description}</div>
									{/if}
									{#if item.notes}
										<div class="text-xs text-star-faint mt-1">{item.notes}</div>
									{/if}
								</td>
								<td class="px-6 py-4 text-star-dim">
									{item.quantity.toLocaleString()} {item.unit}
								</td>
								<td class="px-6 py-4 text-right text-star-dim">
									{formatCurrency(item.unitCost)}
								</td>
								<td class="px-6 py-4 text-right font-medium text-sun-gold">
									{formatCurrency(item.totalCost)}
								</td>
								{#if phaseId}
									<td class="px-6 py-4 text-center">
										{#if itemLink}
											<a
												href={itemLink}
												class="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-cosmic-blue/20 text-cosmic-cyan hover:bg-cosmic-blue/30 transition-colors"
											>
												<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
												</svg>
												View Details
											</a>
										{:else}
											<span class="text-star-faint text-xs">—</span>
										{/if}
									</td>
								{/if}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{/each}

	<!-- Total -->
	<div class="flex justify-end">
		<div class="card-glow px-8 py-4 inline-flex items-center gap-6">
			<span class="text-star-dim font-medium">Total Estimated Cost:</span>
			<span class="text-2xl font-bold text-sun-gold">{formatCurrency(totalCost)}</span>
		</div>
	</div>
</div>
