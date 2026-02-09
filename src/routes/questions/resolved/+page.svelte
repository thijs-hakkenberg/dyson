<script lang="ts">
	import type { ResolutionStatus as ResolutionStatusType, PhaseId, Priority, ResearchQuestion } from '$lib/types/entities';
	import {
		QuestionCard,
		ResolutionStatus,
		ResolutionTimeline
	} from '$lib/components/questions';

	let { data } = $props();

	// Filter state
	let selectedPhase = $state<PhaseId | ''>('');
	let selectedStatus = $state<ResolutionStatusType | ''>('');
	let selectedSort = $state<'newest' | 'oldest' | 'resolution-date'>('resolution-date');

	// Sort function for questions
	function sortQuestions(questions: ResearchQuestion[], sortBy: 'newest' | 'oldest' | 'resolution-date'): ResearchQuestion[] {
		return [...questions].sort((a, b) => {
			switch (sortBy) {
				case 'newest':
					return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
				case 'oldest':
					return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
				case 'resolution-date':
					// Sort by resolution date (most recent first), fallback to created date
					const aDate = a.resolutionDate ? new Date(a.resolutionDate).getTime() : new Date(a.createdDate).getTime();
					const bDate = b.resolutionDate ? new Date(b.resolutionDate).getTime() : new Date(b.createdDate).getTime();
					return bDate - aDate;
				default:
					return 0;
			}
		});
	}

	// Filtered questions
	let filteredQuestions = $derived.by(() => {
		let questions = data.resolvedQuestions;

		if (selectedPhase) {
			questions = questions.filter((q) => q.sourcePhaseId === selectedPhase);
		}

		if (selectedStatus) {
			questions = questions.filter((q) => q.resolutionStatus === selectedStatus);
		}

		// Apply sorting
		questions = sortQuestions(questions, selectedSort);

		return questions;
	});

	const phases = [
		{ value: '', label: 'All Phases' },
		{ value: 'phase-0', label: 'Phase 0' },
		{ value: 'phase-1', label: 'Phase 1' },
		{ value: 'phase-2', label: 'Phase 2' }
	];

	const statuses = [
		{ value: '', label: 'All Resolved' },
		{ value: 'resolved', label: 'Fully Resolved' },
		{ value: 'partially-resolved', label: 'Partially Resolved' },
		{ value: 'superseded', label: 'Superseded' }
	];

	const sortOptions = [
		{ value: 'resolution-date', label: 'Resolution Date' },
		{ value: 'newest', label: 'Created (Newest)' },
		{ value: 'oldest', label: 'Created (Oldest)' }
	];

	function clearFilters() {
		selectedPhase = '';
		selectedStatus = '';
		selectedSort = 'resolution-date';
	}

	const hasActiveFilters = $derived(selectedPhase !== '' || selectedStatus !== '' || selectedSort !== 'resolution-date');
</script>

<svelte:head>
	<title>Resolved Questions - Project Dyson</title>
	<meta
		name="description"
		content="Track resolved research questions and their implications for Dyson swarm construction."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-8">
		<nav class="mb-4">
			<a href="/questions" class="text-cosmic-cyan hover:underline text-sm inline-flex items-center gap-1">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				All Questions
			</a>
		</nav>
		<h1 class="text-3xl md:text-4xl font-bold text-star-white mb-4">Resolved Questions</h1>
		<p class="text-star-dim text-lg max-w-3xl">
			Research questions that have been resolved or partially resolved, with summaries of findings
			and their implications for the project.
		</p>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
		<!-- Sidebar -->
		<div class="lg:col-span-1 space-y-6">
			<!-- Resolution Stats -->
			<div class="card-glow p-6">
				<h3 class="text-lg font-bold text-star-white mb-4">Resolution Progress</h3>

				<!-- Progress bar -->
				<div class="mb-4">
					<div class="flex justify-between text-sm mb-2">
						<span class="text-star-dim">Overall Progress</span>
						<span class="text-star-white font-semibold">
							{Math.round(((data.resolutionStats.resolved + data.resolutionStats.partiallyResolved) / data.totalQuestions) * 100)}%
						</span>
					</div>
					<div class="w-full h-3 bg-space-700 rounded-full overflow-hidden">
						<div
							class="h-full bg-gradient-to-r from-green-500 to-cosmic-cyan"
							style="width: {((data.resolutionStats.resolved + data.resolutionStats.partiallyResolved) / data.totalQuestions) * 100}%"
						></div>
					</div>
				</div>

				<!-- Stats grid -->
				<div class="grid grid-cols-2 gap-3">
					<div class="text-center p-3 rounded bg-space-700">
						<div class="text-2xl font-bold text-green-400">{data.resolutionStats.resolved}</div>
						<div class="text-xs text-star-faint">Resolved</div>
					</div>
					<div class="text-center p-3 rounded bg-space-700">
						<div class="text-2xl font-bold text-amber-400">{data.resolutionStats.partiallyResolved}</div>
						<div class="text-xs text-star-faint">Partial</div>
					</div>
					<div class="text-center p-3 rounded bg-space-700">
						<div class="text-2xl font-bold text-purple-400">{data.resolutionStats.open}</div>
						<div class="text-xs text-star-faint">Open</div>
					</div>
					<div class="text-center p-3 rounded bg-space-700">
						<div class="text-2xl font-bold text-star-dim">{data.resolutionStats.superseded}</div>
						<div class="text-xs text-star-faint">Superseded</div>
					</div>
				</div>
			</div>

			<!-- Filters -->
			<div class="card-glow p-4 space-y-4">
				<h3 class="text-sm font-semibold text-star-white">Filters</h3>

				<!-- Sort -->
				<div>
					<label for="sort" class="block text-xs font-medium text-star-faint mb-1">Sort By</label>
					<select
						id="sort"
						bind:value={selectedSort}
						class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
					>
						{#each sortOptions as sortOpt}
							<option value={sortOpt.value}>{sortOpt.label}</option>
						{/each}
					</select>
				</div>

				<!-- Phase filter -->
				<div>
					<label for="phase" class="block text-xs font-medium text-star-faint mb-1">Phase</label>
					<select
						id="phase"
						bind:value={selectedPhase}
						class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
					>
						{#each phases as phase}
							<option value={phase.value}>{phase.label}</option>
						{/each}
					</select>
				</div>

				<!-- Status filter -->
				<div>
					<label for="status" class="block text-xs font-medium text-star-faint mb-1">Status</label>
					<select
						id="status"
						bind:value={selectedStatus}
						class="w-full px-3 py-2 bg-space-700 border border-space-500 rounded-lg text-star-white text-sm focus:outline-none focus:border-cosmic-cyan"
					>
						{#each statuses as status}
							<option value={status.value}>{status.label}</option>
						{/each}
					</select>
				</div>

				<!-- Clear filters -->
				{#if hasActiveFilters}
					<button
						onclick={clearFilters}
						class="text-sm text-star-dim hover:text-cosmic-cyan transition-colors inline-flex items-center gap-1"
					>
						<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
						</svg>
						Clear filters
					</button>
				{/if}
			</div>

			<!-- Resolution by Source -->
			<div class="card-glow p-6">
				<h3 class="text-sm font-bold text-star-white mb-4">By Source</h3>
				<div class="space-y-2">
					{#each Object.entries(data.resolutionStats.bySource) as [source, count]}
						{#if count > 0}
							<div class="flex items-center justify-between text-sm">
								<span class="text-star-dim capitalize">{source.replace('-', ' ')}</span>
								<span class="text-star-white font-semibold">{count}</span>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="lg:col-span-3 space-y-8">
			<!-- Timeline -->
			<ResolutionTimeline events={data.resolutionHistory} maxItems={5} />

			<!-- Resolved Questions Grid -->
			<div>
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-xl font-bold text-star-white">
						Resolved Questions
						<span class="text-star-dim font-normal">({filteredQuestions.length})</span>
					</h2>
				</div>

				{#if filteredQuestions.length > 0}
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						{#each filteredQuestions as question (question.id)}
							<div class="relative">
								<QuestionCard {question} />
								<!-- Resolution badge overlay -->
								<div class="absolute top-2 right-2">
									<ResolutionStatus status={question.resolutionStatus} size="sm" showIcon={true} />
								</div>
							</div>
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
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<h3 class="text-xl font-semibold text-star-white mb-2">No resolved questions found</h3>
						<p class="text-star-dim">Try adjusting your filters.</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
