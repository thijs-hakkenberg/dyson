<script lang="ts">
	import type { Discrepancy } from '$lib/types/cost-analysis';
	import { CostComparisonTable, DiscrepancyAlert, ReconciliationSummary } from '$lib/components/cost-analysis';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let { data } = $props();

	// Filter state - initialize from data but allow local changes
	let selectedPhase = $state('all');
	$effect(() => {
		selectedPhase = data.selectedPhase;
	});
	let selectedSeverity = $state<Discrepancy['severity'] | 'all'>('all');
	let showDetails = $state(false);
	let searchQuery = $state('');

	// Available phases
	const phases = [
		{ id: 'all', label: 'All Phases' },
		{ id: 'phase-0', label: 'Phase 0: Resource Gathering' },
		{ id: 'phase-1', label: 'Phase 1: Initial Swarm' },
		{ id: 'phase-2', label: 'Phase 2: Swarm Expansion' }
	];

	// Filtered comparisons
	const filteredComparisons = $derived.by(() => {
		let comparisons = data.report.comparisons;

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			comparisons = comparisons.filter(
				(c) =>
					c.bomItem.name.toLowerCase().includes(query) ||
					c.bomItem.slug.toLowerCase().includes(query)
			);
		}

		return comparisons;
	});

	// Filtered discrepancies
	const filteredDiscrepancies = $derived.by(() => {
		let discrepancies = data.report.discrepancies;

		if (selectedSeverity !== 'all') {
			discrepancies = discrepancies.filter((d) => d.severity === selectedSeverity);
		}

		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			discrepancies = discrepancies.filter(
				(d) =>
					d.bomItem.name.toLowerCase().includes(query) ||
					d.topic.toLowerCase().includes(query)
			);
		}

		return discrepancies;
	});

	// Sort discrepancies by severity
	const sortedDiscrepancies = $derived.by(() => {
		const severityOrder = { critical: 0, major: 1, moderate: 2, minor: 3 };
		return [...filteredDiscrepancies].sort(
			(a, b) => severityOrder[a.severity] - severityOrder[b.severity]
		);
	});

	// Handle phase change
	function handlePhaseChange() {
		const url = new URL($page.url);
		if (selectedPhase === 'all') {
			url.searchParams.delete('phase');
		} else {
			url.searchParams.set('phase', selectedPhase);
		}
		goto(url.toString(), { replaceState: true, invalidateAll: true });
	}
</script>

<svelte:head>
	<title>Cost Reconciliation Analysis - Project Dyson</title>
	<meta
		name="description"
		content="Systematic comparison of cost estimates between different LLM models for Project Dyson BOM items."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Analysis Navigation -->
	<nav class="mb-8 flex flex-wrap gap-2 text-sm">
		<a href="/analysis/feasibility" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Feasibility Report</a>
		<a href="/analysis/critical-path" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Critical Path</a>
		<a href="/analysis/technology-readiness" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">TRL Dashboard</a>
		<a href="/analysis/decision-gates" class="px-3 py-1.5 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700 transition-all">Decision Gates</a>
		<a href="/analysis/cost-reconciliation" class="px-3 py-1.5 rounded-lg bg-cosmic-cyan/20 text-cosmic-cyan border border-cosmic-cyan/30 font-medium">Cost Reconciliation</a>
	</nav>

	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center gap-3 mb-4">
			<div class="w-10 h-10 rounded-lg bg-sun-gold/20 flex items-center justify-center">
				<svg class="w-6 h-6 text-sun-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
					/>
				</svg>
			</div>
			<h1 class="text-3xl md:text-4xl font-bold text-star-white">Cost Reconciliation Analysis</h1>
		</div>
		<p class="text-star-dim text-lg max-w-3xl">
			Compare cost estimates across LLM models, identify discrepancies, and reconcile differences
			in BOM item specifications.
		</p>
	</div>

	<!-- Summary -->
	<div class="mb-8">
		<ReconciliationSummary summary={data.report.summary} phaseId={data.selectedPhase} />
	</div>

	<!-- Filters -->
	<div class="card-glow p-6 mb-8">
		<div class="flex flex-wrap items-center gap-4">
			<!-- Phase Filter -->
			<div class="flex-shrink-0">
				<label for="phase-select" class="block text-sm font-medium text-star-dim mb-1">Phase</label>
				<select
					id="phase-select"
					bind:value={selectedPhase}
					onchange={handlePhaseChange}
					class="bg-space-700 border border-space-500 text-star-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cosmic-blue"
				>
					{#each phases as phase}
						<option value={phase.id}>{phase.label}</option>
					{/each}
				</select>
			</div>

			<!-- Severity Filter -->
			<div class="flex-shrink-0">
				<label for="severity-select" class="block text-sm font-medium text-star-dim mb-1">
					Severity
				</label>
				<select
					id="severity-select"
					bind:value={selectedSeverity}
					class="bg-space-700 border border-space-500 text-star-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cosmic-blue"
				>
					<option value="all">All Severities</option>
					<option value="critical">Critical Only</option>
					<option value="major">Major Only</option>
					<option value="moderate">Moderate Only</option>
					<option value="minor">Minor Only</option>
				</select>
			</div>

			<!-- Search -->
			<div class="flex-1 min-w-[200px]">
				<label for="search-input" class="block text-sm font-medium text-star-dim mb-1">Search</label>
				<input
					id="search-input"
					type="text"
					bind:value={searchQuery}
					placeholder="Search items or topics..."
					class="w-full bg-space-700 border border-space-500 text-star-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cosmic-blue"
				/>
			</div>

			<!-- Show Details Toggle -->
			<div class="flex-shrink-0">
				<span class="block text-sm font-medium text-star-dim mb-1">Options</span>
				<label class="flex items-center gap-2 cursor-pointer">
					<input
						type="checkbox"
						bind:checked={showDetails}
						class="w-4 h-4 rounded bg-space-700 border-space-500 text-cosmic-cyan focus:ring-cosmic-blue"
					/>
					<span class="text-star-dim">Show details</span>
				</label>
			</div>
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Discrepancies Panel -->
		<div class="lg:col-span-1 space-y-4">
			<div class="flex items-center justify-between">
				<h2 class="text-xl font-bold text-star-white">Discrepancies</h2>
				<span class="text-sm text-star-dim">
					{sortedDiscrepancies.length} found
				</span>
			</div>

			{#if sortedDiscrepancies.length > 0}
				<div class="space-y-3 max-h-[800px] overflow-y-auto pr-2">
					{#each sortedDiscrepancies as discrepancy (discrepancy.bomItem.bomId + discrepancy.topic + discrepancy.modelA.modelId + discrepancy.modelB.modelId)}
						<DiscrepancyAlert {discrepancy} compact={!showDetails} />
					{/each}
				</div>
			{:else}
				<div class="card-glow p-8 text-center">
					<svg
						class="w-12 h-12 mx-auto mb-3 text-green-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<h3 class="text-lg font-semibold text-star-white mb-2">No Discrepancies</h3>
					<p class="text-star-dim text-sm">
						{selectedSeverity === 'all'
							? 'All models are in agreement for the selected criteria.'
							: `No ${selectedSeverity} discrepancies found.`}
					</p>
				</div>
			{/if}
		</div>

		<!-- Comparisons Panel -->
		<div class="lg:col-span-2 space-y-4">
			<div class="flex items-center justify-between">
				<h2 class="text-xl font-bold text-star-white">Cost Comparisons</h2>
				<span class="text-sm text-star-dim">
					{filteredComparisons.length} items
				</span>
			</div>

			{#if filteredComparisons.length > 0}
				<div class="space-y-6">
					{#each filteredComparisons as comparison (comparison.bomItem.bomId)}
						<CostComparisonTable {comparison} {showDetails} />
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
							d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
						/>
					</svg>
					<h3 class="text-xl font-semibold text-star-white mb-2">No Cost Data Found</h3>
					<p class="text-star-dim">No cost comparison data available for the selected criteria.</p>
				</div>
			{/if}
		</div>
	</div>

	<!-- Legend -->
	<div class="mt-8 card-glow p-6">
		<h3 class="text-sm font-medium text-star-dim mb-4">Understanding the Analysis</h3>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
			<div>
				<h4 class="font-medium text-red-400 mb-1">Critical (>10x)</h4>
				<p class="text-star-dim">
					Order of magnitude difference between models. Requires immediate investigation.
				</p>
			</div>
			<div>
				<h4 class="font-medium text-orange-400 mb-1">Major (>100%)</h4>
				<p class="text-star-dim">
					More than double the cost difference. Significant assumptions differ.
				</p>
			</div>
			<div>
				<h4 class="font-medium text-amber-400 mb-1">Moderate (50-100%)</h4>
				<p class="text-star-dim">
					Notable cost variance. Review underlying assumptions.
				</p>
			</div>
			<div>
				<h4 class="font-medium text-blue-400 mb-1">Minor (&lt;50%)</h4>
				<p class="text-star-dim">
					Normal estimation variance. Within acceptable uncertainty range.
				</p>
			</div>
		</div>
	</div>
</div>
