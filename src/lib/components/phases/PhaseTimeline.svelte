<script lang="ts">
	import type { Phase } from '$lib/types';
	import { formatCurrency } from '$lib/services/content';

	interface Props {
		phases: Phase[];
	}

	let { phases }: Props = $props();

	const statusColors = {
		planned: 'border-space-500 bg-space-700',
		'in-progress': 'border-cosmic-cyan bg-cosmic-blue/20',
		completed: 'border-green-400 bg-green-500/20'
	};
</script>

<div class="relative">
	<!-- Timeline Line -->
	<div class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cosmic-blue via-cosmic-purple to-sun-gold"></div>

	<!-- Timeline Items -->
	<div class="space-y-8">
		{#each phases as phase, i}
			<div class="relative flex gap-6">
				<!-- Timeline Node -->
				<div class="w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10
					{statusColors[phase.status]}">
					<span class="font-bold text-star-white">{phase.number}</span>
				</div>

				<!-- Content -->
				<div class="flex-1 card-glow p-5 -mt-1">
					<div class="flex items-start justify-between gap-4 mb-3">
						<div>
							<h3 class="text-lg font-semibold text-star-white">{phase.title}</h3>
							<p class="text-sm text-star-dim mt-1">{phase.description.slice(0, 120)}...</p>
						</div>
						<div class="text-right flex-shrink-0">
							<p class="text-sun-gold font-semibold">{formatCurrency(phase.totalCost)}</p>
							<p class="text-xs text-star-faint">{phase.estimatedDuration}</p>
						</div>
					</div>

					{#if phase.dependencies.length > 0}
						<div class="text-xs text-star-faint">
							Depends on: Phase {phases.find((p) => p.id === phase.dependencies[0])?.number ?? '?'}
						</div>
					{/if}

					<a
						href="/plan/{phase.id}"
						class="inline-flex items-center gap-1 mt-3 text-sm text-cosmic-cyan hover:underline"
					>
						View Details
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				</div>
			</div>
		{/each}
	</div>
</div>
