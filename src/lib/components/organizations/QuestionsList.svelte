<script lang="ts">
	import type { OrganizationQuestion } from '$lib/types/organizations';
	import OutreachStatus from './OutreachStatus.svelte';

	interface Props {
		questions: OrganizationQuestion[];
		showOrganization?: boolean;
	}

	let { questions, showOrganization = false }: Props = $props();

	const priorityColors: Record<string, string> = {
		critical: 'text-red-400',
		high: 'text-orange-400',
		medium: 'text-yellow-400',
		low: 'text-star-dim'
	};
</script>

<div class="space-y-4">
	{#each questions as question (question.id)}
		<div class="card-glow p-4 hover:border-cosmic-cyan/30 transition-colors">
			<div class="flex items-start justify-between gap-4 mb-2">
				<div class="flex items-center gap-2">
					<span class="text-xs font-mono text-star-faint">{question.id}</span>
					<span
						class="w-2 h-2 rounded-full {priorityColors[question.priority]}"
						title="{question.priority} priority"
					></span>
				</div>
				<OutreachStatus status={question.status} size="sm" />
			</div>

			<p class="text-star-white text-sm mb-3">{question.question}</p>

			{#if question.context}
				<p class="text-star-dim text-xs mb-3 line-clamp-2">{question.context}</p>
			{/if}

			<div class="flex items-center justify-between text-xs">
				<div class="flex items-center gap-2 text-star-faint">
					{#if question.relatedRQs.length > 0}
						<span>Related: {question.relatedRQs.join(', ')}</span>
					{/if}
				</div>
				<div class="flex items-center gap-2 text-star-faint">
					{#if question.dateSent}
						<span>Sent: {question.dateSent}</span>
					{:else}
						<span>Created: {question.dateCreated}</span>
					{/if}
				</div>
			</div>

			{#if question.response}
				<div class="mt-3 pt-3 border-t border-space-500">
					<p class="text-xs text-green-400 mb-1">Response ({question.responseDate}):</p>
					<p class="text-sm text-star-dim">{question.response}</p>
				</div>
			{/if}
		</div>
	{/each}

	{#if questions.length === 0}
		<div class="card-glow p-8 text-center">
			<p class="text-star-dim">No questions yet.</p>
		</div>
	{/if}
</div>
