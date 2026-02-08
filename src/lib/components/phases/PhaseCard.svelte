<script lang="ts">
	import type { Phase } from '$lib/types';
	import { formatCurrency } from '$lib/services/content';
	import { IconBadge } from '$lib/components/ui';

	interface Props {
		phase: Phase;
		compact?: boolean;
	}

	let { phase, compact = false }: Props = $props();

	const statusColors = {
		planned: 'bg-space-600 text-star-dim',
		'in-progress': 'bg-cosmic-blue/20 text-cosmic-cyan',
		completed: 'bg-status-success/20 text-status-success'
	};

	const statusLabels = {
		planned: 'Planned',
		'in-progress': 'In Progress',
		completed: 'Completed'
	};
</script>

<article class="card-glow p-6 h-full flex flex-col">
	<div class="flex items-start justify-between gap-4 mb-4">
		<div class="flex items-center gap-3">
			<IconBadge color="gradient" class="flex-shrink-0">
				<span class="text-white font-bold text-lg">{phase.number}</span>
			</IconBadge>
			<div>
				<h3 class="text-lg font-semibold text-star-white">{phase.title}</h3>
				<span class="text-xs px-2 py-0.5 rounded {statusColors[phase.status]}">
					{statusLabels[phase.status]}
				</span>
			</div>
		</div>
	</div>

	<p class="text-star-dim text-sm mb-4 flex-1">
		{compact ? phase.description.slice(0, 150) + (phase.description.length > 150 ? '...' : '') : phase.description}
	</p>

	{#if !compact}
		<div class="mb-4">
			<h4 class="text-sm font-medium text-star-white mb-2">Key Objectives</h4>
			<ul class="space-y-1">
				{#each phase.objectives.slice(0, 3) as objective}
					<li class="text-sm text-star-dim flex items-start gap-2">
						<svg class="w-4 h-4 text-cosmic-cyan flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						{objective}
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<div class="grid grid-cols-2 gap-4 pt-4 border-t border-space-500 mt-auto">
		<div>
			<p class="text-xs text-star-faint mb-1">Estimated Cost</p>
			<p class="text-lg font-semibold text-sun-gold">{formatCurrency(phase.totalCost)}</p>
		</div>
		<div>
			<p class="text-xs text-star-faint mb-1">Duration</p>
			<p class="text-lg font-semibold text-star-white">{phase.estimatedDuration}</p>
		</div>
	</div>

	<a
		href="/plan/{phase.id}"
		class="mt-4 btn-secondary text-center block"
	>
		View Details
	</a>
</article>
