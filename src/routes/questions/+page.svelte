<script lang="ts">
	import type { ResearchQuestion, QuestionType, ResearchQuestionStatus, Priority, PhaseId, ResolutionStatus } from '$lib/types/entities';
	import { filterQuestions } from '$lib/services/questions';
	import { filterByResolutionStatus } from '$lib/services/resolution';
	import { QuestionCard, QuestionFilters, QuestionStats } from '$lib/components/questions';
	import type { SortOption } from '$lib/components/questions/QuestionFilters.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { data } = $props();

	// Initialize filter state from URL params
	const params = $page.url.searchParams;
	let selectedPhase = $state<PhaseId | ''>(params.get('phase') as PhaseId || '');
	let selectedType = $state<QuestionType | ''>(params.get('type') as QuestionType || '');
	let selectedStatus = $state<ResearchQuestionStatus | ''>(params.get('status') as ResearchQuestionStatus || '');
	let selectedPriority = $state<Priority | ''>(params.get('priority') as Priority || '');
	let selectedResolution = $state<ResolutionStatus | ''>(params.get('resolution') as ResolutionStatus || '');
	let selectedSort = $state<SortOption>((params.get('sort') as SortOption) || 'newest');
	let searchQuery = $state(params.get('q') || '');

	// Priority order for sorting
	const priorityOrder: Record<Priority, number> = {
		critical: 0,
		high: 1,
		medium: 2,
		low: 3
	};

	// Sort function for questions
	function sortQuestions(questions: ResearchQuestion[], sortBy: SortOption): ResearchQuestion[] {
		return [...questions].sort((a, b) => {
			switch (sortBy) {
				case 'newest':
					return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				case 'oldest':
					return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
				case 'priority':
					return priorityOrder[a.priority] - priorityOrder[b.priority];
				case 'title':
					return a.title.localeCompare(b.title);
				default:
					return 0;
			}
		});
	}

	// Filtered questions - use derived for reactive filtering
	let filteredQuestions = $derived.by(() => {
		let questions = data.questions;

		// Apply standard filters
		if (selectedPhase || selectedType || selectedStatus || selectedPriority || searchQuery) {
			questions = filterQuestions(questions, {
				phaseId: selectedPhase || undefined,
				questionType: selectedType || undefined,
				status: selectedStatus || undefined,
				priority: selectedPriority || undefined,
				search: searchQuery || undefined
			});
		}

		// Apply resolution status filter
		if (selectedResolution) {
			questions = filterByResolutionStatus(questions, selectedResolution);
		}

		// Apply sorting (default: newest first)
		questions = sortQuestions(questions, selectedSort);

		return questions;
	});

	function applyFilters() {
		const p = new URLSearchParams();
		if (selectedPhase) p.set('phase', selectedPhase);
		if (selectedType) p.set('type', selectedType);
		if (selectedStatus) p.set('status', selectedStatus);
		if (selectedPriority) p.set('priority', selectedPriority);
		if (selectedResolution) p.set('resolution', selectedResolution);
		if (selectedSort && selectedSort !== 'newest') p.set('sort', selectedSort);
		if (searchQuery) p.set('q', searchQuery);

		const qs = p.toString();
		goto(`/questions${qs ? '?' + qs : ''}`, { replaceState: true, keepFocus: true, noScroll: true });
	}
</script>

<svelte:head>
	<title>Research Questions - Project Dyson</title>
	<meta
		name="description"
		content="Open research questions for Dyson swarm construction, extracted from multi-model AI consensus documents."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl md:text-4xl font-bold text-star-white mb-4">Research Questions</h1>
		<p class="text-star-dim text-lg max-w-3xl">
			Open engineering questions extracted from multi-model AI consensus documents. These questions
			represent critical decisions and research needs identified across all project phases.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
		<!-- Sidebar: Stats & Filters -->
		<div class="lg:col-span-1 space-y-6">
			<!-- Stats -->
			<QuestionStats stats={data.stats} />

			<!-- Filters -->
			<QuestionFilters
				bind:selectedPhase
				bind:selectedType
				bind:selectedStatus
				bind:selectedPriority
				bind:selectedResolution
				bind:selectedSort
				bind:searchQuery
				onFilterChange={applyFilters}
			/>

			<!-- Quick Links -->
			<div class="card-glow p-4">
				<h3 class="text-sm font-semibold text-star-white mb-3">Quick Links</h3>
				<a
					href="/questions/resolved"
					class="flex items-center gap-2 text-cosmic-cyan hover:underline text-sm"
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					View Resolved Questions
				</a>
			</div>
		</div>

		<!-- Main Content: Question Grid -->
		<div class="lg:col-span-3">
			<!-- Results Header -->
			<div class="flex items-center justify-between mb-6">
				<div class="text-star-dim">
					Showing <span class="text-star-white font-semibold">{filteredQuestions.length}</span>
					{filteredQuestions.length === 1 ? 'question' : 'questions'}
				</div>
			</div>

			<!-- Question Grid -->
			{#if filteredQuestions.length > 0}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					{#each filteredQuestions as question (question.id)}
						<QuestionCard {question} />
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
							d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h3 class="text-xl font-semibold text-star-white mb-2">No questions found</h3>
					<p class="text-star-dim">Try adjusting your filters or search query.</p>
				</div>
			{/if}
		</div>
	</div>
</div>
