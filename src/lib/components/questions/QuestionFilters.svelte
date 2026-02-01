<script lang="ts">
	import type { QuestionType, ResearchQuestionStatus, Priority, PhaseId } from '$lib/types/entities';

	interface Props {
		selectedPhase: PhaseId | '';
		selectedType: QuestionType | '';
		selectedStatus: ResearchQuestionStatus | '';
		selectedPriority: Priority | '';
		searchQuery: string;
		onFilterChange: () => void;
	}

	let {
		selectedPhase = $bindable(),
		selectedType = $bindable(),
		selectedStatus = $bindable(),
		selectedPriority = $bindable(),
		searchQuery = $bindable(),
		onFilterChange
	}: Props = $props();

	const phases = [
		{ value: '', label: 'All Phases' },
		{ value: 'phase-0', label: 'Phase 0' },
		{ value: 'phase-1', label: 'Phase 1' },
		{ value: 'phase-2', label: 'Phase 2' }
	];

	const types = [
		{ value: '', label: 'All Types' },
		{ value: 'meta-research', label: 'Research' },
		{ value: 'experimentation', label: 'Experiment' },
		{ value: 'simulation', label: 'Simulation' },
		{ value: 'engineering-decision', label: 'Decision' },
		{ value: 'discussion', label: 'Discussion' }
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

	function handleChange() {
		onFilterChange();
	}

	function clearFilters() {
		selectedPhase = '';
		selectedType = '';
		selectedStatus = '';
		selectedPriority = '';
		searchQuery = '';
		onFilterChange();
	}

	const hasActiveFilters = $derived(
		selectedPhase !== '' ||
			selectedType !== '' ||
			selectedStatus !== '' ||
			selectedPriority !== '' ||
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

	<!-- Filter Grid -->
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
		<!-- Phase -->
		<div>
			<label for="phase" class="block text-xs font-medium text-star-faint mb-1">Phase</label>
			<select
				id="phase"
				bind:value={selectedPhase}
				onchange={handleChange}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
			>
				{#each phases as phase}
					<option value={phase.value}>{phase.label}</option>
				{/each}
			</select>
		</div>

		<!-- Type -->
		<div>
			<label for="type" class="block text-xs font-medium text-star-faint mb-1">Type</label>
			<select
				id="type"
				bind:value={selectedType}
				onchange={handleChange}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
			>
				{#each types as type}
					<option value={type.value}>{type.label}</option>
				{/each}
			</select>
		</div>

		<!-- Status -->
		<div>
			<label for="status" class="block text-xs font-medium text-star-faint mb-1">Status</label>
			<select
				id="status"
				bind:value={selectedStatus}
				onchange={handleChange}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
			>
				{#each statuses as status}
					<option value={status.value}>{status.label}</option>
				{/each}
			</select>
		</div>

		<!-- Priority -->
		<div>
			<label for="priority" class="block text-xs font-medium text-star-faint mb-1">Priority</label>
			<select
				id="priority"
				bind:value={selectedPriority}
				onchange={handleChange}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
			>
				{#each priorities as priority}
					<option value={priority.value}>{priority.label}</option>
				{/each}
			</select>
		</div>
	</div>

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
