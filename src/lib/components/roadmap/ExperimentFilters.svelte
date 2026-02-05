<script lang="ts">
	import type { ExperimentStatus } from '$lib/types/roadmap';
	import { experimentStatusLabels } from '$lib/types/roadmap';

	interface Props {
		selectedStatus: ExperimentStatus | '';
		selectedYear: string;
		searchQuery: string;
		years: string[];
		onFilterChange: () => void;
	}

	let {
		selectedStatus = $bindable(),
		selectedYear = $bindable(),
		searchQuery = $bindable(),
		years,
		onFilterChange
	}: Props = $props();

	const statuses = [
		{ value: '', label: 'All Status' },
		...Object.entries(experimentStatusLabels).map(([value, label]) => ({ value, label }))
	];

	const yearOptions = $derived([{ value: '', label: 'All Years' }, ...years.map((y) => ({ value: y, label: y }))]);

	function handleChange() {
		onFilterChange();
	}

	function clearFilters() {
		selectedStatus = '';
		selectedYear = '';
		searchQuery = '';
		onFilterChange();
	}

	const hasActiveFilters = $derived(
		selectedStatus !== '' || selectedYear !== '' || searchQuery !== ''
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
				placeholder="Search experiments..."
				class="w-full pl-10 pr-4 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white placeholder-star-faint focus:outline-none focus:border-cosmic-cyan"
			/>
		</div>
	</div>

	<!-- Filter Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-3">
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

		<!-- Year -->
		<div>
			<label for="year" class="block text-xs font-medium text-star-faint mb-1">Year</label>
			<select
				id="year"
				bind:value={selectedYear}
				onchange={handleChange}
				class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
			>
				{#each yearOptions as year}
					<option value={year.value}>{year.label}</option>
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
