<script lang="ts">
	import type { ValidationStatus, ValidationSource } from '$lib/types/validation';
	import { filterValidations } from '$lib/services/validation';
	import { validationStatusLabels, validationSourceLabels } from '$lib/types/validation';
	import { ValidationCard, ValidationStats } from '$lib/components/validation';

	let { data } = $props();

	// Filter state
	let selectedStatus = $state<ValidationStatus | ''>('');
	let selectedSource = $state<ValidationSource | ''>('');
	let selectedPhase = $state<string>('');
	let searchQuery = $state('');

	// Filtered validations
	let filteredValidations = $derived.by(() => {
		if (!selectedStatus && !selectedSource && !selectedPhase && !searchQuery) {
			return data.validations;
		}
		return filterValidations(data.validations, {
			status: selectedStatus || undefined,
			source: selectedSource || undefined,
			phaseId: selectedPhase || undefined,
			search: searchQuery || undefined
		});
	});

	const phaseOptions = [
		{ value: '', label: 'All Phases' },
		{ value: 'phase-0', label: 'Phase 0' },
		{ value: 'phase-1', label: 'Phase 1' },
		{ value: 'phase-2', label: 'Phase 2' }
	];

	function clearFilters() {
		selectedStatus = '';
		selectedSource = '';
		selectedPhase = '';
		searchQuery = '';
	}
</script>

<svelte:head>
	<title>Validation Tracking - Project Dyson</title>
	<meta
		name="description"
		content="Track validation status of LLM predictions and specifications against real data, experiments, and expert review."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl md:text-4xl font-bold text-star-white mb-4">Validation Tracking</h1>
		<p class="text-star-dim text-lg max-w-3xl">
			Tracking validation status of LLM predictions and specifications against real data,
			experiments, and expert review. Claims are validated, refuted, or marked as needing
			further investigation based on evidence.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
		<!-- Sidebar: Stats & Filters -->
		<div class="lg:col-span-1 space-y-6">
			<!-- Stats -->
			<ValidationStats stats={data.stats} />

			<!-- Filters -->
			<div class="card-glow p-6">
				<div class="flex items-center justify-between mb-4">
					<h3 class="text-lg font-bold text-star-white">Filters</h3>
					{#if selectedStatus || selectedSource || selectedPhase || searchQuery}
						<button
							onclick={clearFilters}
							class="text-xs text-cosmic-cyan hover:underline"
						>
							Clear all
						</button>
					{/if}
				</div>

				<div class="space-y-4">
					<!-- Search -->
					<div>
						<label for="search" class="block text-xs text-star-faint mb-1.5 uppercase tracking-wider">
							Search
						</label>
						<input
							type="text"
							id="search"
							bind:value={searchQuery}
							placeholder="Search claims..."
							class="w-full px-3 py-2 rounded bg-space-700 border border-space-500 text-star-white placeholder-star-faint text-sm focus:outline-none focus:border-cosmic-cyan"
						/>
					</div>

					<!-- Status Filter -->
					<div>
						<label for="status" class="block text-xs text-star-faint mb-1.5 uppercase tracking-wider">
							Status
						</label>
						<select
							id="status"
							bind:value={selectedStatus}
							class="w-full px-3 py-2 rounded bg-space-700 border border-space-500 text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
						>
							<option value="">All Statuses</option>
							{#each Object.entries(validationStatusLabels) as [value, label]}
								<option {value}>{label}</option>
							{/each}
						</select>
					</div>

					<!-- Source Filter -->
					<div>
						<label for="source" class="block text-xs text-star-faint mb-1.5 uppercase tracking-wider">
							Source Type
						</label>
						<select
							id="source"
							bind:value={selectedSource}
							class="w-full px-3 py-2 rounded bg-space-700 border border-space-500 text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
						>
							<option value="">All Sources</option>
							{#each Object.entries(validationSourceLabels) as [value, label]}
								<option {value}>{label}</option>
							{/each}
						</select>
					</div>

					<!-- Phase Filter -->
					<div>
						<label for="phase" class="block text-xs text-star-faint mb-1.5 uppercase tracking-wider">
							Phase
						</label>
						<select
							id="phase"
							bind:value={selectedPhase}
							class="w-full px-3 py-2 rounded bg-space-700 border border-space-500 text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
						>
							{#each phaseOptions as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>

			<!-- Legend -->
			<div class="card-glow p-6">
				<h3 class="text-lg font-bold text-star-white mb-4">Status Legend</h3>
				<div class="space-y-2 text-sm">
					<div class="flex items-center gap-2">
						<span class="w-3 h-3 rounded-full bg-green-400"></span>
						<span class="text-star-dim">Validated - Confirmed by evidence</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="w-3 h-3 rounded-full bg-yellow-400"></span>
						<span class="text-star-dim">Partially Validated - Some aspects confirmed</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="w-3 h-3 rounded-full bg-red-400"></span>
						<span class="text-star-dim">Refuted - Contradicted by evidence</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="w-3 h-3 rounded-full bg-orange-400"></span>
						<span class="text-star-dim">Outdated - Needs re-validation</span>
					</div>
					<div class="flex items-center gap-2">
						<span class="w-3 h-3 rounded-full bg-gray-400"></span>
						<span class="text-star-dim">Unvalidated - Not yet tested</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Main Content: Validation Grid -->
		<div class="lg:col-span-3">
			<!-- Results Header -->
			<div class="flex items-center justify-between mb-6">
				<div class="text-star-dim">
					Showing <span class="text-star-white font-semibold">{filteredValidations.length}</span>
					{filteredValidations.length === 1 ? 'claim' : 'claims'}
				</div>
			</div>

			<!-- Validation Grid -->
			{#if filteredValidations.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each filteredValidations as claim (claim.id)}
						<ValidationCard {claim} />
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
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
						/>
					</svg>
					<h3 class="text-xl font-semibold text-star-white mb-2">No validations found</h3>
					<p class="text-star-dim">Try adjusting your filters or search query.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
