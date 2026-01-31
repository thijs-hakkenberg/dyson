<script lang="ts">
	import type { ArxivPaper } from '$lib/types';
	import { searchArxiv, ARXIV_CATEGORIES, SUGGESTED_TERMS } from '$lib/services/arxiv';
	import PaperCard from './PaperCard.svelte';

	let searchQuery = $state('');
	let selectedCategories = $state<string[]>([]);
	let papers = $state<ArxivPaper[]>([]);
	let totalResults = $state(0);
	let loading = $state(false);
	let searched = $state(false);

	async function search() {
		if (!searchQuery.trim()) return;

		loading = true;
		searched = true;

		try {
			const result = await searchArxiv({
				query: searchQuery,
				categories: selectedCategories.length > 0 ? selectedCategories : undefined,
				maxResults: 25,
				sortBy: 'relevance'
			});

			papers = result.papers;
			totalResults = result.totalResults;
		} catch (error) {
			console.error('Search failed:', error);
			papers = [];
			totalResults = 0;
		} finally {
			loading = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			search();
		}
	}

	function toggleCategory(catId: string) {
		if (selectedCategories.includes(catId)) {
			selectedCategories = selectedCategories.filter((c) => c !== catId);
		} else {
			selectedCategories = [...selectedCategories, catId];
		}
	}

	function useSuggested(term: string) {
		searchQuery = term;
		search();
	}
</script>

<div class="space-y-8">
	<!-- Search Section -->
	<div class="card-glow p-6">
		<div class="flex gap-4 mb-6">
			<div class="flex-1">
				<label for="search" class="block text-sm font-medium text-star-dim mb-2">
					Search arXiv Papers
				</label>
				<div class="flex gap-3">
					<input
						id="search"
						type="text"
						bind:value={searchQuery}
						onkeydown={handleKeydown}
						class="flex-1 px-4 py-3 bg-space-800 border border-space-500 rounded-lg
							text-star-white placeholder-star-faint
							focus:outline-none focus:border-cosmic-blue focus:ring-1 focus:ring-cosmic-blue"
						placeholder="Search for papers on Dyson spheres, solar sails, asteroid mining..."
					/>
					<button
						class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-6"
						onclick={search}
						disabled={loading || !searchQuery.trim()}
					>
						{#if loading}
							<span class="flex items-center gap-2">
								<div class="spinner w-4 h-4 border-2"></div>
								Searching
							</span>
						{:else}
							Search
						{/if}
					</button>
				</div>
			</div>
		</div>

		<!-- Category Filters -->
		<div class="mb-6">
			<p class="text-sm text-star-dim mb-3">Filter by category:</p>
			<div class="flex flex-wrap gap-2">
				{#each ARXIV_CATEGORIES as category}
					<button
						class="px-3 py-1.5 text-sm rounded-full transition-colors
							{selectedCategories.includes(category.id)
								? 'bg-cosmic-blue text-white'
								: 'bg-space-600 text-star-dim hover:bg-space-500 hover:text-star-white'}"
						onclick={() => toggleCategory(category.id)}
					>
						{category.name}
					</button>
				{/each}
			</div>
		</div>

		<!-- Suggested Terms -->
		<div>
			<p class="text-sm text-star-dim mb-3">Quick searches:</p>
			<div class="flex flex-wrap gap-2">
				{#each SUGGESTED_TERMS as term}
					<button
						class="px-3 py-1.5 text-sm rounded-full bg-space-700 text-star-dim
							hover:bg-space-600 hover:text-cosmic-cyan transition-colors"
						onclick={() => useSuggested(term)}
					>
						{term}
					</button>
				{/each}
			</div>
		</div>
	</div>

	<!-- Results Section -->
	{#if loading}
		<div class="flex items-center justify-center py-16">
			<div class="text-center">
				<div class="spinner mx-auto mb-4"></div>
				<p class="text-star-dim">Searching arXiv...</p>
			</div>
		</div>
	{:else if searched && papers.length === 0}
		<div class="card-glow p-12 text-center">
			<svg class="w-16 h-16 mx-auto mb-4 text-star-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<h3 class="text-lg font-semibold text-star-white mb-2">No papers found</h3>
			<p class="text-star-dim">Try adjusting your search terms or removing category filters.</p>
		</div>
	{:else if papers.length > 0}
		<div>
			<div class="flex items-center justify-between mb-6">
				<h2 class="text-xl font-semibold text-star-white">
					Search Results
				</h2>
				<span class="text-sm text-star-dim">
					Showing {papers.length} of {totalResults.toLocaleString()} papers
				</span>
			</div>

			<div class="grid gap-6">
				{#each papers as paper}
					<PaperCard {paper} />
				{/each}
			</div>
		</div>
	{:else if !searched}
		<div class="card-glow p-12 text-center">
			<svg class="w-16 h-16 mx-auto mb-4 text-cosmic-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
			</svg>
			<h3 class="text-lg font-semibold text-star-white mb-2">Start Your Research</h3>
			<p class="text-star-dim">Search arXiv for papers related to Dyson swarm technology, space engineering, and more.</p>
		</div>
	{/if}
</div>
