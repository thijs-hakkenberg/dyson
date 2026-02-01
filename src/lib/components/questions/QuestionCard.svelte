<script lang="ts">
	import type { ResearchQuestion } from '$lib/types/entities';
	import QuestionTypeBadge from './QuestionTypeBadge.svelte';
	import PriorityIndicator from './PriorityIndicator.svelte';

	interface Props {
		question: ResearchQuestion;
	}

	let { question }: Props = $props();

	const phaseLabels: Record<string, string> = {
		'phase-0': 'Phase 0',
		'phase-1': 'Phase 1',
		'phase-2': 'Phase 2'
	};

	const statusColors: Record<string, string> = {
		open: 'bg-purple-500/20 text-purple-400',
		investigating: 'bg-cosmic-blue/20 text-cosmic-cyan',
		answered: 'bg-green-500/20 text-green-400',
		deferred: 'bg-space-600 text-star-dim'
	};

	const statusLabels: Record<string, string> = {
		open: 'Open',
		investigating: 'Investigating',
		answered: 'Answered',
		deferred: 'Deferred'
	};
</script>

<article class="card-glow p-6 h-full flex flex-col hover:border-cosmic-cyan/50 transition-colors">
	<!-- Header -->
	<div class="flex items-start justify-between gap-3 mb-3">
		<div class="flex flex-wrap items-center gap-2">
			<QuestionTypeBadge type={question.questionType} size="sm" />
			<PriorityIndicator priority={question.priority} size="sm" />
		</div>
		<span class="px-2 py-0.5 rounded text-xs {statusColors[question.status]}">
			{statusLabels[question.status]}
		</span>
	</div>

	<!-- Title -->
	<h3 class="text-lg font-semibold text-star-white mb-2 line-clamp-2">
		<a href="/questions/{question.slug}" class="hover:text-cosmic-cyan transition-colors">
			{question.title}
		</a>
	</h3>

	<!-- Description -->
	<p class="text-star-dim text-sm mb-4 flex-1 line-clamp-3">
		{question.description}
	</p>

	<!-- Tags -->
	<div class="flex flex-wrap gap-1.5 mb-4">
		{#each question.tags.slice(0, 4) as tag}
			<span class="px-1.5 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				{tag}
			</span>
		{/each}
		{#if question.tags.length > 4}
			<span class="px-1.5 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				+{question.tags.length - 4}
			</span>
		{/if}
	</div>

	<!-- Footer -->
	<div class="flex items-center justify-between pt-4 border-t border-space-500 mt-auto">
		<div class="flex items-center gap-2 text-xs text-star-faint">
			<span class="px-2 py-0.5 rounded bg-space-600">
				{phaseLabels[question.sourcePhaseId]}
			</span>
			<a
				href="/plan/{question.sourcePhaseId}/bom/{question.sourceBOMItemSlug}"
				class="text-cosmic-cyan hover:underline truncate max-w-[120px]"
			>
				{question.sourceBOMItemSlug}
			</a>
		</div>
		<a
			href="/questions/{question.slug}"
			class="text-sm text-cosmic-cyan hover:underline inline-flex items-center gap-1"
		>
			Details
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	</div>
</article>
