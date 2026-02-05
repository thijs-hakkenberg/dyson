<script lang="ts">
	import type { ExperimentStatus } from '$lib/types/roadmap';
	import { filterExperiments } from '$lib/services/validation-roadmap';
	import {
		ExperimentCard,
		RoadmapTimeline,
		ExperimentFilters,
		RoadmapStats
	} from '$lib/components/roadmap';

	let { data } = $props();

	// Filter state
	let selectedStatus = $state<ExperimentStatus | ''>('');
	let selectedYear = $state('');
	let searchQuery = $state('');

	// Filtered experiments - use derived for reactive filtering
	let filteredExperiments = $derived.by(() => {
		if (!selectedStatus && !selectedYear && !searchQuery) {
			return data.experiments;
		}
		return filterExperiments(data.experiments, {
			status: selectedStatus || undefined,
			year: selectedYear || undefined,
			search: searchQuery || undefined
		});
	});

	function applyFilters() {
		// Filters are applied reactively via $derived, this is just for UI callback
	}
</script>

<svelte:head>
	<title>Validation Roadmap - Project Dyson</title>
	<meta
		name="description"
		content="Experiments and missions that validate Project Dyson specifications and resolve open research questions."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl md:text-4xl font-bold text-star-white mb-4">Validation Roadmap</h1>
		<p class="text-star-dim text-lg max-w-3xl">
			Experiments and missions mapped to open research questions and BOM specifications.
			Track validation activities that will de-risk Project Dyson engineering decisions.
		</p>
	</div>

	<!-- Timeline Visualization -->
	<div class="mb-8">
		<RoadmapTimeline
			experiments={data.timelineData.experiments}
			milestones={data.timelineData.milestones}
			yearRange={data.timelineData.yearRange}
		/>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
		<!-- Sidebar: Stats & Filters -->
		<div class="lg:col-span-1 space-y-6">
			<!-- Stats -->
			<RoadmapStats stats={data.stats} />

			<!-- Filters -->
			<ExperimentFilters
				bind:selectedStatus
				bind:selectedYear
				bind:searchQuery
				years={data.years}
				onFilterChange={applyFilters}
			/>
		</div>

		<!-- Main Content: Experiment Grid -->
		<div class="lg:col-span-3">
			<!-- Results Header -->
			<div class="flex items-center justify-between mb-6">
				<div class="text-star-dim">
					Showing <span class="text-star-white font-semibold">{filteredExperiments.length}</span>
					experiment{filteredExperiments.length === 1 ? '' : 's'}
				</div>
			</div>

			<!-- Experiment Grid -->
			{#if filteredExperiments.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each filteredExperiments as experiment (experiment.id)}
						<ExperimentCard {experiment} />
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
							d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
						/>
					</svg>
					<h3 class="text-xl font-semibold text-star-white mb-2">No experiments found</h3>
					<p class="text-star-dim">Try adjusting your filters or search query.</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- Info Section -->
	<div class="mt-12 card-glow p-6">
		<h3 class="text-lg font-semibold text-star-white mb-4">About the Validation Roadmap</h3>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-star-dim">
			<div>
				<h4 class="text-cosmic-cyan font-medium mb-2">Purpose</h4>
				<p>
					The validation roadmap maps open research questions to specific experiments and
					missions that can resolve them. This helps prioritize validation activities and
					track progress toward engineering confidence.
				</p>
			</div>
			<div>
				<h4 class="text-cosmic-cyan font-medium mb-2">Experiment Types</h4>
				<p>
					Experiments include ground-based testing, orbital demonstrations, and analysis
					of existing mission data. Each experiment is linked to the research questions
					and BOM items it validates.
				</p>
			</div>
			<div>
				<h4 class="text-cosmic-cyan font-medium mb-2">Timeline</h4>
				<p>
					The timeline shows when validation data is expected. Critical milestones
					indicate decision points where validated specifications enable phase transitions.
				</p>
			</div>
		</div>
	</div>
</div>
