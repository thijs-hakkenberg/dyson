<script lang="ts">
	import type { OrganizationCategory } from '$lib/types/organizations';

	interface Props {
		selectedCategory: OrganizationCategory | '';
		searchQuery: string;
		onFilterChange: () => void;
	}

	let {
		selectedCategory = $bindable(''),
		searchQuery = $bindable(''),
		onFilterChange
	}: Props = $props();

	const categories: { value: OrganizationCategory | ''; label: string }[] = [
		{ value: '', label: 'All Categories' },
		{ value: 'space-agency', label: 'Space Agencies' },
		{ value: 'propulsion-lab', label: 'Propulsion Labs' },
		{ value: 'pv-research', label: 'PV Research' },
		{ value: 'manufacturing', label: 'Manufacturing' },
		{ value: 'university', label: 'Universities' },
		{ value: 'standards-body', label: 'Standards Bodies' }
	];
</script>

<div class="card-glow p-4 space-y-4">
	<h3 class="text-sm font-semibold text-star-white">Filters</h3>

	<!-- Search -->
	<div>
		<label class="block text-xs text-star-faint mb-1" for="org-search">Search</label>
		<input
			id="org-search"
			type="text"
			bind:value={searchQuery}
			oninput={onFilterChange}
			placeholder="Search organizations..."
			class="w-full px-3 py-2 rounded bg-space-700 border border-space-500 text-star-white text-sm placeholder-star-faint focus:border-cosmic-cyan focus:outline-none"
		/>
	</div>

	<!-- Category -->
	<div>
		<label class="block text-xs text-star-faint mb-1" for="org-category">Category</label>
		<select
			id="org-category"
			bind:value={selectedCategory}
			onchange={onFilterChange}
			class="w-full px-3 py-2 rounded bg-space-700 border border-space-500 text-star-white text-sm focus:border-cosmic-cyan focus:outline-none"
		>
			{#each categories as cat}
				<option value={cat.value}>{cat.label}</option>
			{/each}
		</select>
	</div>

	<!-- Reset -->
	{#if selectedCategory || searchQuery}
		<button
			onclick={() => {
				selectedCategory = '';
				searchQuery = '';
				onFilterChange();
			}}
			class="w-full px-3 py-2 rounded bg-space-600 text-star-dim text-sm hover:bg-space-500 hover:text-star-white transition-colors"
		>
			Reset Filters
		</button>
	{/if}
</div>
