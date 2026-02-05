<script lang="ts">
	import type { Discrepancy } from '$lib/types/cost-analysis';
	import { formatCostAmount } from '$lib/services/cost-analysis';

	interface Props {
		discrepancy: Discrepancy;
		compact?: boolean;
	}

	let { discrepancy, compact = false }: Props = $props();

	const severityConfig = $derived(() => {
		switch (discrepancy.severity) {
			case 'critical':
				return {
					bgColor: 'bg-red-500/10',
					borderColor: 'border-red-500/30',
					textColor: 'text-red-400',
					icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
					label: 'Critical'
				};
			case 'major':
				return {
					bgColor: 'bg-orange-500/10',
					borderColor: 'border-orange-500/30',
					textColor: 'text-orange-400',
					icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
					label: 'Major'
				};
			case 'moderate':
				return {
					bgColor: 'bg-amber-500/10',
					borderColor: 'border-amber-500/30',
					textColor: 'text-amber-400',
					icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
					label: 'Moderate'
				};
			default:
				return {
					bgColor: 'bg-blue-500/10',
					borderColor: 'border-blue-500/30',
					textColor: 'text-blue-400',
					icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
					label: 'Minor'
				};
		}
	});
</script>

<div
	class="rounded-lg border {severityConfig().borderColor} {severityConfig().bgColor} overflow-hidden"
>
	<!-- Header -->
	<div class="px-4 py-3 flex items-center gap-3 border-b {severityConfig().borderColor}">
		<div class="flex-shrink-0">
			<svg class="w-5 h-5 {severityConfig().textColor}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={severityConfig().icon} />
			</svg>
		</div>
		<div class="flex-1 min-w-0">
			<div class="flex items-center gap-2">
				<span class="font-semibold {severityConfig().textColor}">{severityConfig().label}</span>
				<span class="text-star-dim">-</span>
				<span class="text-star-white font-medium truncate">{discrepancy.bomItem.name}</span>
			</div>
			<div class="text-sm text-star-dim">{discrepancy.topic}</div>
		</div>
		<div class="text-right flex-shrink-0">
			<div class="text-xs text-star-faint">Difference</div>
			<div class="font-bold {severityConfig().textColor}">
				{discrepancy.ratio.toFixed(1)}x
			</div>
		</div>
	</div>

	<!-- Content -->
	{#if !compact}
		<div class="p-4">
			<div class="grid grid-cols-2 gap-4">
				<!-- Model A -->
				<div class="rounded-lg bg-space-700/50 p-3">
					<div class="text-xs text-star-faint mb-1">{discrepancy.modelA.modelName}</div>
					<div class="text-lg font-semibold text-star-white">
						{formatCostAmount(discrepancy.modelA.cost)}
					</div>
				</div>

				<!-- Model B -->
				<div class="rounded-lg bg-space-700/50 p-3">
					<div class="text-xs text-star-faint mb-1">{discrepancy.modelB.modelName}</div>
					<div class="text-lg font-semibold text-star-white">
						{formatCostAmount(discrepancy.modelB.cost)}
					</div>
				</div>
			</div>

			<!-- Details -->
			<div class="mt-3 pt-3 border-t border-space-600 flex items-center justify-between text-sm">
				<div class="text-star-dim">
					<span class="font-medium">Difference:</span>
					{formatCostAmount(discrepancy.difference)}
				</div>
				<div class="text-star-dim">
					<span class="font-medium">Percentage:</span>
					{discrepancy.percentDiff.toFixed(0)}%
				</div>
				<div class="text-star-faint">
					{discrepancy.phaseId.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
				</div>
			</div>
		</div>
	{/if}
</div>
