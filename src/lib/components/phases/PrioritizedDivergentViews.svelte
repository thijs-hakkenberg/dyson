<script lang="ts">
	import type { DivergentViewPriority } from '$lib/types';
	import type { PrioritizedDivergentView } from '$lib/services/bom';
	import DivergentViewCard from './DivergentViewCard.svelte';
	import { priorityColors, priorityLabels } from '$lib/utils/status';

	interface Props {
		views: PrioritizedDivergentView[];
		title?: string;
		showFilters?: boolean;
	}

	let { views, title = 'Prioritized Divergent Views', showFilters = true }: Props = $props();

	// Filter state
	let selectedPriority: DivergentViewPriority | 'all' = $state('all');
	let selectedPhase: string | 'all' = $state('all');

	// Get unique phases from views
	const phases = $derived(() => {
		const phaseSet = new Set(views.map(v => v.phaseId));
		return Array.from(phaseSet).sort();
	});

	// Count views by priority
	const priorityCounts = $derived(() => {
		const counts: Record<DivergentViewPriority | 'all', number> = {
			all: views.length,
			critical: 0,
			high: 0,
			medium: 0,
			low: 0
		};
		for (const view of views) {
			const p = view.priority || 'medium';
			counts[p]++;
		}
		return counts;
	});

	// Filtered views based on selection
	const filteredViews = $derived(() => {
		return views.filter(v => {
			const matchesPriority = selectedPriority === 'all' || (v.priority || 'medium') === selectedPriority;
			const matchesPhase = selectedPhase === 'all' || v.phaseId === selectedPhase;
			return matchesPriority && matchesPhase;
		});
	});

	// Group filtered views by priority for display
	const groupedByPriority = $derived(() => {
		const groups: Record<DivergentViewPriority, PrioritizedDivergentView[]> = {
			critical: [],
			high: [],
			medium: [],
			low: []
		};
		for (const view of filteredViews()) {
			const p = view.priority || 'medium';
			groups[p].push(view);
		}
		return groups;
	});

	const priorityOrder: DivergentViewPriority[] = ['critical', 'high', 'medium', 'low'];

	function getPriorityIcon(priority: DivergentViewPriority): string {
		switch (priority) {
			case 'critical':
				return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z';
			case 'high':
				return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
			case 'medium':
				return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
			case 'low':
				return 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
		}
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between flex-wrap gap-4">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
				<svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
			</div>
			<div>
				<h2 class="text-xl font-bold text-star-white">{title}</h2>
				<p class="text-sm text-star-dim">{filteredViews().length} of {views.length} divergent views</p>
			</div>
		</div>

		<!-- Summary badges -->
		<div class="flex items-center gap-2 flex-wrap">
			{#each priorityOrder as priority}
				{@const count = priorityCounts()[priority]}
				{#if count > 0}
					<div class="flex items-center gap-1.5 px-2 py-1 rounded-full {priorityColors[priority]}">
						<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getPriorityIcon(priority)} />
						</svg>
						<span class="text-xs font-medium">{count} {priorityLabels[priority]}</span>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<!-- Filters -->
	{#if showFilters}
		<div class="flex items-center gap-4 flex-wrap p-4 rounded-lg bg-space-700/50 border border-space-600">
			<!-- Priority Filter -->
			<div class="flex items-center gap-2">
				<label class="text-sm text-star-dim" for="priority-filter">Priority:</label>
				<select
					id="priority-filter"
					bind:value={selectedPriority}
					class="bg-space-600 text-star-white text-sm rounded-lg px-3 py-1.5 border border-space-500 focus:border-cosmic-cyan focus:outline-none"
				>
					<option value="all">All ({priorityCounts().all})</option>
					{#each priorityOrder as priority}
						<option value={priority}>{priorityLabels[priority]} ({priorityCounts()[priority]})</option>
					{/each}
				</select>
			</div>

			<!-- Phase Filter -->
			<div class="flex items-center gap-2">
				<label class="text-sm text-star-dim" for="phase-filter">Phase:</label>
				<select
					id="phase-filter"
					bind:value={selectedPhase}
					class="bg-space-600 text-star-white text-sm rounded-lg px-3 py-1.5 border border-space-500 focus:border-cosmic-cyan focus:outline-none"
				>
					<option value="all">All Phases</option>
					{#each phases() as phase}
						<option value={phase}>{phase}</option>
					{/each}
				</select>
			</div>
		</div>
	{/if}

	<!-- Grouped Views -->
	{#if filteredViews().length === 0}
		<div class="text-center py-12 text-star-dim">
			<svg class="w-12 h-12 mx-auto mb-4 text-star-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<p>No divergent views match the selected filters.</p>
		</div>
	{:else}
		{#each priorityOrder as priority}
			{@const priorityViews = groupedByPriority()[priority]}
			{#if priorityViews.length > 0}
				<section class="space-y-4">
					<!-- Priority Section Header -->
					<div class="flex items-center gap-2">
						<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg {priorityColors[priority]}">
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={getPriorityIcon(priority)} />
							</svg>
							<span class="text-sm font-semibold">{priorityLabels[priority]} Priority</span>
							<span class="text-xs opacity-75">({priorityViews.length})</span>
						</div>
					</div>

					<!-- Cards for this priority -->
					<div class="space-y-4 pl-4 border-l-2 border-space-600">
						{#each priorityViews as view}
							<DivergentViewCard
								topic={view}
								itemName={view.itemName}
								phaseId={view.phaseId}
								showItemContext={true}
							/>
						{/each}
					</div>
				</section>
			{/if}
		{/each}
	{/if}
</div>
