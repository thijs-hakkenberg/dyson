<script lang="ts">
	import type { OrganizationStats, OrgQuestionStats } from '$lib/services/organizations';

	interface Props {
		orgStats: OrganizationStats;
		questionStats: OrgQuestionStats;
	}

	let { orgStats, questionStats }: Props = $props();
</script>

<div class="card-glow p-4 space-y-4">
	<h3 class="text-sm font-semibold text-star-white">Overview</h3>

	<div class="grid grid-cols-2 gap-3">
		<div class="text-center p-3 rounded bg-space-700">
			<div class="text-2xl font-bold text-star-white">{orgStats.total}</div>
			<div class="text-xs text-star-faint">Organizations</div>
		</div>
		<div class="text-center p-3 rounded bg-space-700">
			<div class="text-2xl font-bold text-star-white">{questionStats.total}</div>
			<div class="text-xs text-star-faint">Questions</div>
		</div>
	</div>

	<div class="space-y-2">
		<h4 class="text-xs font-semibold text-star-dim">By Status</h4>
		<div class="space-y-1">
			{#each Object.entries(questionStats.byStatus) as [status, count]}
				{#if count > 0}
					<div class="flex justify-between text-xs">
						<span class="text-star-faint capitalize">{status.replace('-', ' ')}</span>
						<span class="text-star-white">{count}</span>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<div class="space-y-2">
		<h4 class="text-xs font-semibold text-star-dim">By Priority</h4>
		<div class="space-y-1">
			{#each Object.entries(questionStats.byPriority) as [priority, count]}
				{#if count > 0}
					<div class="flex justify-between text-xs">
						<span class="text-star-faint capitalize">{priority}</span>
						<span class="text-star-white">{count}</span>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>
