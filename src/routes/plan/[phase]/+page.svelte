<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { getPhaseById, formatCurrency, getPhaseTimeline } from '$lib/services/content';
	import BOMTable from '$lib/components/phases/BOMTable.svelte';
	import LLMConsensus from '$lib/components/phases/LLMConsensus.svelte';
	import PhaseDAG from '$lib/components/phases/PhaseDAG.svelte';
	import type { TimelineNode } from '$lib/types';

	const phase = $derived(getPhaseById($page.params.phase));
	const timeline = $derived(getPhaseTimeline($page.params.phase));

	function handleTimelineNodeClick(node: TimelineNode) {
		if (node.linkTo) {
			goto(node.linkTo);
		}
	}

	const statusColors = {
		planned: 'bg-space-600 text-star-dim',
		'in-progress': 'bg-cosmic-blue/20 text-cosmic-cyan',
		completed: 'bg-green-500/20 text-green-400'
	};

	const statusLabels = {
		planned: 'Planned',
		'in-progress': 'In Progress',
		completed: 'Completed'
	};
</script>

<svelte:head>
	<title>{phase ? `Phase ${phase.number}: ${phase.title}` : 'Phase Not Found'} - Project Dyson</title>
</svelte:head>

{#if phase}
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Breadcrumb -->
		<nav class="mb-8">
			<ol class="flex items-center gap-2 text-sm">
				<li><a href="/plan" class="text-star-dim hover:text-cosmic-cyan">Plan</a></li>
				<li class="text-star-faint">/</li>
				<li class="text-star-white">Phase {phase.number}</li>
			</ol>
		</nav>

		<!-- Header -->
		<div class="mb-12">
			<div class="flex items-start gap-6 mb-6">
				<div class="w-20 h-20 rounded-full bg-gradient-to-br from-cosmic-blue to-cosmic-purple flex items-center justify-center flex-shrink-0">
					<span class="text-white font-bold text-3xl">{phase.number}</span>
				</div>
				<div>
					<div class="flex items-center gap-3 mb-2">
						<h1 class="text-4xl font-bold text-star-white">{phase.title}</h1>
						<span class="px-3 py-1 rounded text-sm {statusColors[phase.status]}">
							{statusLabels[phase.status]}
						</span>
					</div>
					<p class="text-lg text-star-dim">{phase.description}</p>
				</div>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div class="card-glow p-5">
					<p class="text-sm text-star-faint mb-1">Total Cost</p>
					<p class="text-2xl font-bold text-sun-gold">{formatCurrency(phase.totalCost)}</p>
				</div>
				<div class="card-glow p-5">
					<p class="text-sm text-star-faint mb-1">Duration</p>
					<p class="text-2xl font-bold text-star-white">{phase.estimatedDuration}</p>
				</div>
				<div class="card-glow p-5">
					<p class="text-sm text-star-faint mb-1">BOM Items</p>
					<p class="text-2xl font-bold text-star-white">{phase.bom.length}</p>
				</div>
				<div class="card-glow p-5">
					<p class="text-sm text-star-faint mb-1">Dependencies</p>
					<p class="text-2xl font-bold text-star-white">{phase.dependencies.length || 'None'}</p>
				</div>
			</div>
		</div>

		<!-- Objectives -->
		<section class="mb-12">
			<h2 class="text-2xl font-bold text-star-white mb-6">Objectives</h2>
			<div class="card-glow p-6">
				<ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
					{#each phase.objectives as objective}
						<li class="flex items-start gap-3">
							<svg class="w-6 h-6 text-cosmic-cyan flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span class="text-star-dim">{objective}</span>
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<!-- Timeline/DAG View -->
		{#if timeline}
			<section class="mb-12">
				<h2 class="text-2xl font-bold text-star-white mb-6">Project Timeline</h2>
				<PhaseDAG graph={timeline} onNodeClick={handleTimelineNodeClick} />
				<p class="text-sm text-star-faint mt-4">
					Click on activities to view detailed specifications. Gold indicators mark the critical path.
				</p>
			</section>
		{/if}

		<!-- Bill of Materials -->
		<section class="mb-12">
			<h2 class="text-2xl font-bold text-star-white mb-6">Bill of Materials</h2>
			<BOMTable items={phase.bom} phaseId={phase.id} />
		</section>

		<!-- LLM Consensus Analysis -->
		<LLMConsensus phaseId={$page.params.phase} />

		<!-- Related Research -->
		{#if phase.relatedResearch.length > 0}
			<section class="mb-12">
				<h2 class="text-2xl font-bold text-star-white mb-6">Related Research Topics</h2>
				<div class="card-glow p-6">
					<div class="flex flex-wrap gap-3">
						{#each phase.relatedResearch as term}
							<a
								href="/research?q={encodeURIComponent(term)}"
								class="px-4 py-2 rounded-full bg-space-600 text-star-dim hover:bg-space-500 hover:text-cosmic-cyan transition-colors"
							>
								{term}
							</a>
						{/each}
					</div>
					<p class="text-sm text-star-faint mt-4">
						Click a topic to search for related papers in the Research Hub.
					</p>
				</div>
			</section>
		{/if}

		<!-- Actions -->
		<section class="flex flex-wrap gap-4">
			<a href="/research" class="btn-primary">
				Explore Related Research
			</a>
			<a href="/plan" class="btn-secondary">
				Back to All Phases
			</a>
		</section>
	</div>
{:else}
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="card-glow p-12 text-center">
			<svg class="w-16 h-16 mx-auto mb-4 text-star-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<h1 class="text-2xl font-bold text-star-white mb-2">Phase Not Found</h1>
			<p class="text-star-dim mb-6">The requested phase doesn't exist.</p>
			<a href="/plan" class="btn-primary">View All Phases</a>
		</div>
	</div>
{/if}
