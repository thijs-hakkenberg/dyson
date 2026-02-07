<script lang="ts">
	import type { OrganizationCategory } from '$lib/types/organizations';
	import { filterOrganizations } from '$lib/services/organizations';
	import {
		OrganizationCard,
		OrganizationFilters,
		OrganizationStats
	} from '$lib/components/organizations';

	let { data } = $props();

	// Filter state
	let selectedCategory = $state<OrganizationCategory | ''>('');
	let searchQuery = $state('');

	// Filtered organizations
	let filteredOrganizations = $derived.by(() => {
		if (!selectedCategory && !searchQuery) {
			return data.organizations;
		}
		return filterOrganizations(data.organizations, {
			category: selectedCategory || undefined,
			search: searchQuery || undefined
		});
	});

	function applyFilters() {
		// Filters applied reactively via $derived
	}
</script>

<svelte:head>
	<title>External Organizations - Project Dyson</title>
	<meta
		name="description"
		content="External organizations and partners for validating Project Dyson specifications."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl md:text-4xl font-bold text-star-white mb-4">External Organizations</h1>
		<p class="text-star-dim text-lg max-w-3xl">
			Space agencies, research labs, and industry partners for validating LLM-generated
			specifications. Track outreach questions and responses.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
		<!-- Sidebar -->
		<div class="lg:col-span-1 space-y-6">
			<OrganizationStats orgStats={data.orgStats} questionStats={data.questionStats} />
			<OrganizationFilters
				bind:selectedCategory
				bind:searchQuery
				onFilterChange={applyFilters}
			/>
		</div>

		<!-- Main Content -->
		<div class="lg:col-span-3">
			<!-- Results Header -->
			<div class="flex items-center justify-between mb-6">
				<div class="text-star-dim">
					Showing <span class="text-star-white font-semibold"
						>{filteredOrganizations.length}</span
					>
					organization{filteredOrganizations.length === 1 ? '' : 's'}
				</div>
			</div>

			<!-- Organization Grid -->
			{#if filteredOrganizations.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each filteredOrganizations as org (org.id)}
						<OrganizationCard organization={org} />
					{/each}
				</div>
			{:else}
				<div class="card-glow p-12 text-center">
					<svg
						class="w-16 h-16 mx-auto mb-4 text-star-faint"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1.5"
							d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
						/>
					</svg>
					<h3 class="text-xl font-semibold text-star-white mb-2">No organizations found</h3>
					<p class="text-star-dim">Try adjusting your filters.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
