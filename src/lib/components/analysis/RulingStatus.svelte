<script lang="ts">
	/**
	 * Ruling status of a technology, gate or criterion (criterion-status.yaml):
	 * decided (D-xx accepted, G-x.x confirmed), interim (proposed D-xx), pending owner
	 * rulings with the evidence questions that inform them, and panel disagreements.
	 */
	import type { RulingStatus } from '$lib/services/trl-assessment';
	import { QUESTION_DEPENDENCIES } from '$lib/services/critical-path';

	let { status, compact = false }: { status: RulingStatus | null | undefined; compact?: boolean } = $props();

	const slugs = new Map(QUESTION_DEPENDENCIES.map((q) => [q.questionId, q.slug]));
	const titles = new Map(QUESTION_DEPENDENCIES.map((q) => [q.questionId, q.title]));
	const href = (id: string) => (slugs.has(id) ? `/questions/${slugs.get(id)}` : undefined);
	const label = (id: string) => id.toUpperCase();
</script>

{#if status}
	<div class="flex flex-wrap items-center gap-1.5 text-xs">
		{#each status.decided ?? [] as id}
			<a
				href={href(id) ?? (id.startsWith('D-') ? '/analysis/decision-gates#decisions' : '/analysis/decision-gates#rulings')}
				class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400"
				title="Decided: {titles.get(id) ?? id}">✓ {id}</a
			>
		{/each}
		{#each status.interim ?? [] as id}
			<a
				href="/analysis/decision-gates#decisions"
				class="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:border-amber-400"
				title="Interim: {id} is proposed, awaiting owner sign-off">◐ {id} interim</a
			>
		{/each}
		{#each status.pending ?? [] as p}
			<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-200 border border-violet-500/30">
				<span title="Owner ruling pending">⧗</span>
				<a href={href(p.question)} class="hover:text-white" title={titles.get(p.question)}>{label(p.question)}</a>
				{#if !compact}
					<span class="text-violet-300/70">← evidence</span>
					{#each p.evidence as e, i}
						<a href={href(e)} class="hover:text-white underline decoration-dotted" title={titles.get(e)}>{label(e)}</a>{i < p.evidence.length - 1 ? ',' : ''}
					{/each}
				{/if}
			</span>
		{/each}
		{#if status.panel && !compact}
			<span class="px-2 py-0.5 rounded-full bg-space-600 text-star-dim border border-space-500" title="Panel disagreement, not yet raised as a question">
				≠ {status.panel}
			</span>
		{/if}
	</div>
{/if}
