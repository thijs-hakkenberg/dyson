<script lang="ts">
	import { getPhases, formatCurrency, getTotalProjectCost } from '$lib/services/content';
	import PhaseTimeline from '$lib/components/phases/PhaseTimeline.svelte';
	import PhaseCard from '$lib/components/phases/PhaseCard.svelte';
	import MilestoneDAG from '$lib/components/phases/MilestoneDAG.svelte';
	import { goto } from '$app/navigation';
	import type { ProjectMilestone } from '$lib/services/content';

	const phases = getPhases();
	const totalCost = getTotalProjectCost();

	function handleMilestoneClick(milestone: ProjectMilestone) {
		goto(`/plan/${milestone.phase}`);
	}
</script>

<svelte:head>
	<title>Project Plan - Project Dyson</title>
	<meta name="description" content="Detailed phased planning for Dyson swarm construction, from initial resource processing to full-scale deployment." />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl font-bold text-star-white mb-4">
			Project Plan
		</h1>
		<p class="text-lg text-star-dim max-w-3xl mb-6">
			Building a Dyson swarm is humanity's most ambitious engineering project. Our phased approach
			breaks down this monumental task into achievable milestones, from establishing space-based
			resource processing to deploying millions of solar collectors.
		</p>
		<div class="inline-flex items-center gap-4 px-6 py-3 card-glow">
			<div>
				<p class="text-sm text-star-faint">Total Estimated Cost</p>
				<p class="text-2xl font-bold text-sun-gold">{formatCurrency(totalCost)}</p>
			</div>
			<div class="w-px h-12 bg-space-500"></div>
			<div>
				<p class="text-sm text-star-faint">Total Phases</p>
				<p class="text-2xl font-bold text-star-white">{phases.length}</p>
			</div>
		</div>
	</div>

	<!-- Project Overview Stats -->
	<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
		<div class="card-glow p-5">
			<p class="text-sm text-star-faint mb-1">Current Phase</p>
			<p class="text-xl font-semibold text-cosmic-cyan">Phase 0</p>
			<p class="text-sm text-star-dim">Space Resource Processing</p>
		</div>
		<div class="card-glow p-5">
			<p class="text-sm text-star-faint mb-1">Next Milestone</p>
			<p class="text-xl font-semibold text-star-white">Mining Ops</p>
			<p class="text-sm text-star-dim">First asteroid extraction</p>
		</div>
		<div class="card-glow p-5">
			<p class="text-sm text-star-faint mb-1">Research Papers</p>
			<p class="text-xl font-semibold text-star-white">150+</p>
			<p class="text-sm text-star-dim">Linked to phases</p>
		</div>
		<div class="card-glow p-5">
			<p class="text-sm text-star-faint mb-1">LLM Analyses</p>
			<p class="text-xl font-semibold text-star-white">45+</p>
			<p class="text-sm text-star-dim">Council opinions</p>
		</div>
	</div>

	<!-- Project Milestones (Cross-Phase View) -->
	<section class="mb-16">
		<h2 class="text-2xl font-bold text-star-white mb-6">Project Milestones</h2>
		<p class="text-star-dim mb-6 max-w-3xl">
			High-level milestones across all phases showing the critical path to a complete Dyson swarm
			and beyond. Click any milestone to explore that phase in detail.
		</p>
		<MilestoneDAG onMilestoneClick={handleMilestoneClick} />
	</section>

	<!-- Timeline View -->
	<section class="mb-16">
		<h2 class="text-2xl font-bold text-star-white mb-6">Phase Timeline</h2>
		<PhaseTimeline {phases} />
	</section>

	<!-- Phase Cards -->
	<section>
		<h2 class="text-2xl font-bold text-star-white mb-6">Phase Overview</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			{#each phases as phase}
				<PhaseCard {phase} />
			{/each}
		</div>
	</section>
</div>
