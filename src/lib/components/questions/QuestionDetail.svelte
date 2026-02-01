<script lang="ts">
	import type { ResearchQuestion } from '$lib/types/entities';
	import { renderMarkdown } from '$lib/utils/markdown';
	import QuestionTypeBadge from './QuestionTypeBadge.svelte';
	import PriorityIndicator from './PriorityIndicator.svelte';

	interface Props {
		question: ResearchQuestion;
	}

	let { question }: Props = $props();

	const phaseLabels: Record<string, string> = {
		'phase-0': 'Phase 0 - Resource Acquisition',
		'phase-1': 'Phase 1 - Initial Swarm Deployment',
		'phase-2': 'Phase 2 - Swarm Expansion'
	};

	const statusColors: Record<string, string> = {
		open: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		investigating: 'bg-cosmic-blue/20 text-cosmic-cyan border-cosmic-cyan/30',
		answered: 'bg-green-500/20 text-green-400 border-green-500/30',
		deferred: 'bg-space-600 text-star-dim border-space-500'
	};

	const statusLabels: Record<string, string> = {
		open: 'Open',
		investigating: 'Investigating',
		answered: 'Answered',
		deferred: 'Deferred'
	};

	// Render context markdown if available
	const renderedContext = $derived(
		question.context ? renderMarkdown(question.context) : ''
	);
</script>

<div class="space-y-6">
	<!-- Main Content -->
	<div class="card-glow p-6 md:p-8">
		<!-- Status Badge -->
		<div class="flex justify-end mb-4">
			<span class="px-3 py-1.5 rounded border {statusColors[question.status]}">
				{statusLabels[question.status]}
			</span>
		</div>

		<!-- Title -->
		<h1 class="text-2xl md:text-3xl font-bold text-star-white mb-4">
			{question.title}
		</h1>

		<!-- Badges -->
		<div class="flex flex-wrap items-center gap-3 mb-6">
			<QuestionTypeBadge type={question.questionType} size="lg" />
			<PriorityIndicator priority={question.priority} size="lg" />
		</div>

		<!-- Description (fallback if no context) -->
		{#if !question.context}
			<div class="prose-spec mb-6">
				<p class="text-star-dim text-lg leading-relaxed">
					{question.description}
				</p>
			</div>
		{/if}

		<!-- Tags -->
		<div class="flex flex-wrap gap-2 mb-6">
			{#each question.tags as tag}
				<span class="px-2 py-1 text-sm rounded bg-space-600 text-star-faint">
					{tag}
				</span>
			{/each}
		</div>

		<!-- Context Section (rich markdown content from file) -->
		{#if renderedContext}
			<div class="prose-spec mt-8">
				{@html renderedContext}
			</div>
		{/if}

		<!-- Answer (if available) -->
		{#if question.answer}
			<div class="mt-8 p-4 rounded-lg bg-green-500/10 border border-green-500/30">
				<h3 class="text-lg font-semibold text-green-400 mb-2">Answer</h3>
				<p class="text-star-dim">{question.answer}</p>
			</div>
		{/if}

		<!-- References (if available) -->
		{#if question.references && question.references.length > 0}
			<div class="mt-6">
				<h3 class="text-lg font-semibold text-star-white mb-3">References</h3>
				<ul class="list-disc list-inside text-star-dim space-y-1">
					{#each question.references as ref}
						<li>{ref}</li>
					{/each}
				</ul>
			</div>
		{/if}

		<!-- Interactive Tool Link (for simulation questions with available tools) -->
		{#if question.questionType === 'simulation' && question.slug === 'minimum-constellation-size'}
			<div class="mt-8 p-6 rounded-lg bg-cosmic-cyan/10 border border-cosmic-cyan/30">
				<div class="flex items-start gap-4">
					<div class="p-3 rounded-lg bg-cosmic-cyan/20">
						<svg class="w-6 h-6 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
					</div>
					<div class="flex-1">
						<h3 class="text-lg font-semibold text-cosmic-cyan mb-2">Interactive Simulator Available</h3>
						<p class="text-star-dim text-sm mb-4">
							Explore this research question with our Monte Carlo constellation coverage simulator.
							Adjust parameters and see real-time coverage curves.
						</p>
						<a
							href="/questions/{question.slug}/simulator"
							class="btn-primary inline-flex items-center gap-2"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							Launch Simulator
						</a>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- Metadata Panel -->
	<div class="card-glow p-6">
		<h3 class="text-lg font-bold text-star-white mb-4">Question Details</h3>

		<dl class="space-y-4">
			<!-- Source Phase -->
			<div>
				<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Source Phase</dt>
				<dd>
					<a
						href="/plan/{question.sourcePhaseId}"
						class="text-cosmic-cyan hover:underline"
					>
						{phaseLabels[question.sourcePhaseId]}
					</a>
				</dd>
			</div>

			<!-- Source BOM Item -->
			<div>
				<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Source BOM Item</dt>
				<dd>
					<a
						href="/plan/{question.sourcePhaseId}/bom/{question.sourceBOMItemSlug}"
						class="text-cosmic-cyan hover:underline"
					>
						{question.sourceBOMItemName || question.sourceBOMItemSlug}
					</a>
				</dd>
			</div>

			<!-- Question ID -->
			<div>
				<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Question ID</dt>
				<dd class="font-mono text-star-dim">{question.id}</dd>
			</div>

			<!-- Created Date -->
			<div>
				<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Created</dt>
				<dd class="text-star-dim">{question.createdDate}</dd>
			</div>

			<!-- Related BOM Items -->
			{#if question.relatedBOMItems.length > 0}
				<div>
					<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Related BOM Items</dt>
					<dd class="flex flex-wrap gap-1">
						{#each question.relatedBOMItems as bomId}
							<span class="px-2 py-0.5 text-xs rounded bg-space-600 text-star-dim font-mono">
								{bomId}
							</span>
						{/each}
					</dd>
				</div>
			{/if}
		</dl>
	</div>
</div>
