<script lang="ts">
	import type { FundingCampaign } from '$lib/types';
	import { formatCurrency } from '$lib/services/content';
	import ProgressBar from './ProgressBar.svelte';

	interface Props {
		campaign: FundingCampaign;
	}

	let { campaign }: Props = $props();

	const progress = $derived(Math.min((campaign.raised / campaign.goal) * 100, 100));

	const statusColors = {
		active: 'bg-green-500/20 text-green-400',
		completed: 'bg-cosmic-blue/20 text-cosmic-cyan',
		upcoming: 'bg-sun-gold/20 text-sun-gold'
	};

	const statusLabels = {
		active: 'Active',
		completed: 'Completed',
		upcoming: 'Upcoming'
	};
</script>

<article class="card-glow p-6 h-full flex flex-col">
	<div class="flex items-start justify-between gap-4 mb-4">
		<h3 class="text-xl font-semibold text-star-white">{campaign.title}</h3>
		<span class="px-2 py-1 text-xs rounded flex-shrink-0 {statusColors[campaign.status]}">
			{statusLabels[campaign.status]}
		</span>
	</div>

	<p class="text-star-dim text-sm mb-6 flex-1">{campaign.description}</p>

	<div class="mb-4">
		<ProgressBar value={progress} />
	</div>

	<div class="flex items-end justify-between mb-4">
		<div>
			<p class="text-2xl font-bold text-sun-gold">{formatCurrency(campaign.raised)}</p>
			<p class="text-sm text-star-faint">raised of {formatCurrency(campaign.goal)}</p>
		</div>
		<p class="text-lg font-semibold text-star-white">{progress.toFixed(0)}%</p>
	</div>

	{#if campaign.relatedPhases.length > 0}
		<div class="pt-4 border-t border-space-500">
			<p class="text-xs text-star-faint mb-2">Related to:</p>
			<div class="flex flex-wrap gap-2">
				{#each campaign.relatedPhases as phaseId}
					<a
						href="/plan/{phaseId}"
						class="px-2 py-1 text-xs rounded bg-space-600 text-star-dim hover:text-cosmic-cyan transition-colors"
					>
						{phaseId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
					</a>
				{/each}
			</div>
		</div>
	{/if}

	{#if campaign.status === 'active'}
		<button class="btn-primary mt-4 w-full">
			Contribute
		</button>
	{:else if campaign.status === 'upcoming'}
		<button class="btn-secondary mt-4 w-full" disabled>
			Coming Soon
		</button>
	{/if}
</article>
