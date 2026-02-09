<script lang="ts">
	import type { QuestionType, ResearchQuestionStatus, Priority, PhaseId, ResolutionStatus } from '$lib/types/entities';
	import { SelectField } from '$lib/components/ui';

	export type SortOption = 'newest' | 'oldest' | 'priority' | 'title';

	interface Props {
		selectedPhase: PhaseId | '';
		selectedType: QuestionType | '';
		selectedStatus: ResearchQuestionStatus | '';
		selectedPriority: Priority | '';
		selectedResolution?: ResolutionStatus | '';
		selectedSort?: SortOption;
		searchQuery: string;
		onFilterChange: () => void;
		showResolutionFilter?: boolean;
		showSortOption?: boolean;
	}

	let {
		selectedPhase = $bindable(),
		selectedType = $bindable(),
		selectedStatus = $bindable(),
		selectedPriority = $bindable(),
		selectedResolution = $bindable(''),
		selectedSort = $bindable('newest'),
		searchQuery = $bindable(),
		onFilterChange,
		showResolutionFilter = true,
		showSortOption = true
	}: Props = $props();

	const phases = [
		{ value: '', label: 'All Phases' },
		{ value: 'phase-0', label: 'Phase 0' },
		{ value: 'phase-1', label: 'Phase 1' },
		{ value: 'phase-2', label: 'Phase 2' },
		{ value: 'phase-3a', label: 'Phase 3a' },
		{ value: 'phase-3b', label: 'Phase 3b' }
	];

	const types = [
		{ value: '', label: 'All Types' },
		{ value: 'meta-research', label: 'Research' },
		{ value: 'experimentation', label: 'Experiment' },
		{ value: 'simulation', label: 'Simulation' },
		{ value: 'engineering-decision', label: 'Decision' },
		{ value: 'discussion', label: 'Discussion' },
		{ value: 'analysis', label: 'Analysis' }
	];

	const statuses = [
		{ value: '', label: 'All Status' },
		{ value: 'open', label: 'Open' },
		{ value: 'investigating', label: 'Investigating' },
		{ value: 'answered', label: 'Answered' },
		{ value: 'deferred', label: 'Deferred' }
	];

	const priorities = [
		{ value: '', label: 'All Priority' },
		{ value: 'critical', label: 'Critical' },
		{ value: 'high', label: 'High' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'low', label: 'Low' }
	];

	const resolutionStatuses = [
		{ value: '', label: 'All Resolution' },
		{ value: 'open', label: 'Unresolved' },
		{ value: 'resolved', label: 'Resolved' },
		{ value: 'partially-resolved', label: 'Partially Resolved' },
		{ value: 'superseded', label: 'Superseded' }
	];

	const sortOptions = [
		{ value: 'newest', label: 'Newest First' },
		{ value: 'oldest', label: 'Oldest First' },
		{ value: 'priority', label: 'Priority' },
		{ value: 'title', label: 'Title (A-Z)' }
	];

	function handleChange() {
		onFilterChange();
	}

	function clearFilters() {
		selectedPhase = '';
		selectedType = '';
		selectedStatus = '';
		selectedPriority = '';
		selectedResolution = '';
		selectedSort = 'newest';
		searchQuery = '';
		onFilterChange();
	}

	const hasActiveFilters = $derived(
		selectedPhase !== '' ||
			selectedType !== '' ||
			selectedStatus !== '' ||
			selectedPriority !== '' ||
			selectedResolution !== '' ||
			selectedSort !== 'newest' ||
			searchQuery !== ''
	);
</script>

<div class="card-glow p-4 space-y-4">
	<!-- Search -->
	<div>
		<label for="search" class="block text-sm font-medium text-star-dim mb-2">Search</label>
		<div class="relative">
			<svg
				class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-star-faint"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
			<input
				type="text"
				id="search"
				bind:value={searchQuery}
				oninput={handleChange}
				placeholder="Search questions..."
				class="w-full pl-10 pr-4 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white placeholder-star-faint focus:outline-none focus:border-cosmic-cyan"
			/>
		</div>
	</div>

	<!-- Sort Option -->
	{#if showSortOption}
		<div>
			<label for="sort" class="block text-sm font-medium text-star-dim mb-2">Sort By</label>
			<SelectField bind:value={selectedSort} onchange={handleChange}>
				{#each sortOptions as sortOpt}
					<option value={sortOpt.value}>{sortOpt.label}</option>
				{/each}
			</SelectField>
		</div>
	{/if}

	<!-- Filter Grid -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
		<!-- Phase -->
		<div>
			<label for="phase" class="block text-xs font-medium text-star-faint mb-1">Phase</label>
			<SelectField bind:value={selectedPhase} onchange={handleChange}>
				{#each phases as phase}
					<option value={phase.value}>{phase.label}</option>
				{/each}
			</SelectField>
		</div>

		<!-- Type -->
		<div>
			<label for="type" class="block text-xs font-medium text-star-faint mb-1">Type</label>
			<SelectField bind:value={selectedType} onchange={handleChange}>
				{#each types as type}
					<option value={type.value}>{type.label}</option>
				{/each}
			</SelectField>
		</div>

		<!-- Status -->
		<div>
			<label for="status" class="block text-xs font-medium text-star-faint mb-1">Status</label>
			<SelectField bind:value={selectedStatus} onchange={handleChange}>
				{#each statuses as status}
					<option value={status.value}>{status.label}</option>
				{/each}
			</SelectField>
		</div>

		<!-- Priority -->
		<div>
			<label for="priority" class="block text-xs font-medium text-star-faint mb-1">Priority</label>
			<SelectField bind:value={selectedPriority} onchange={handleChange}>
				{#each priorities as priority}
					<option value={priority.value}>{priority.label}</option>
				{/each}
			</SelectField>
		</div>
	</div>

	<!-- Resolution Filter -->
	{#if showResolutionFilter}
		<div>
			<label for="resolution" class="block text-xs font-medium text-star-faint mb-1">Resolution Status</label>
			<SelectField bind:value={selectedResolution} onchange={handleChange}>
				{#each resolutionStatuses as resStatus}
					<option value={resStatus.value}>{resStatus.label}</option>
				{/each}
			</SelectField>
		</div>
	{/if}

	<!-- Clear Filters -->
	{#if hasActiveFilters}
		<div class="flex justify-end">
			<button
				onclick={clearFilters}
				class="text-sm text-star-dim hover:text-cosmic-cyan transition-colors inline-flex items-center gap-1"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
				Clear filters
			</button>
		</div>
	{/if}
</div>
