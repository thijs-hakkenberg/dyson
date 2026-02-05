<script lang="ts">
	import type { DivergentViewTopic, DivergentViewPriority } from '$lib/types';
	import { Marked } from 'marked';
	import { sanitizeMarkdownHTML } from '$lib/utils/sanitize';
	import { getModelColor, getPositionBoxColor, sharedConsensusColor, priorityColors, priorityLabels } from '$lib/utils/status';
	import type { ModelName } from '$lib/utils/consensus-parser';

	interface Props {
		topic: DivergentViewTopic;
		itemName?: string;
		phaseId?: string;
		showItemContext?: boolean;
	}

	let { topic, itemName = '', phaseId = '', showItemContext = false }: Props = $props();

	const marked = new Marked({
		gfm: true,
		breaks: false
	});

	function renderMarkdown(content: string): string {
		const html = marked.parse(content) as string;
		return sanitizeMarkdownHTML(html);
	}

	/**
	 * Get priority badge colors and icon
	 */
	function getPriorityInfo(priority: DivergentViewPriority | undefined) {
		const p = priority || 'medium';
		return {
			colors: priorityColors[p],
			label: priorityLabels[p],
			icon: getPriorityIcon(p)
		};
	}

	function getPriorityIcon(priority: DivergentViewPriority): string {
		switch (priority) {
			case 'critical':
				return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'; // exclamation triangle
			case 'high':
				return 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'; // exclamation circle
			case 'medium':
				return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'; // info circle
			case 'low':
				return 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'; // question circle
		}
	}

	const priorityInfo = $derived(getPriorityInfo(topic.priority));
</script>

<div class="rounded-lg border border-amber-500/20 bg-amber-500/5 overflow-hidden">
	<!-- Header with topic and priority badge -->
	<div class="px-4 py-3 bg-amber-500/10 border-b border-amber-500/20">
		<div class="flex items-center justify-between gap-4 flex-wrap">
			<div class="flex items-center gap-2">
				<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
				</svg>
				<span class="font-semibold text-amber-300">{topic.topic}</span>
			</div>

			<!-- Priority Badge -->
			{#if topic.priority}
				<div class="flex items-center gap-1.5 px-2 py-1 rounded-full {priorityInfo.colors}">
					<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={priorityInfo.icon} />
					</svg>
					<span class="text-xs font-medium">{priorityInfo.label} Priority</span>
				</div>
			{/if}
		</div>

		<!-- Item context if showing across items -->
		{#if showItemContext && itemName}
			<div class="mt-2 text-xs text-star-faint">
				<span class="text-star-dim">{phaseId}</span>
				<span class="mx-1">/</span>
				<span class="text-star-white">{itemName}</span>
			</div>
		{/if}
	</div>

	<!-- Model positions -->
	<div class="p-4">
		<div class="flex flex-wrap gap-3">
			{#each topic.positions as pos}
				{@const isShared = pos.models.length > 1}
				{@const boxColor = getPositionBoxColor(pos.models, isShared)}
				<div class="rounded-lg p-3 {boxColor.bg} border {boxColor.border} flex-1 min-w-[200px] max-w-full md:max-w-[calc(50%-0.375rem)]">
					<div class="flex items-center gap-2 mb-2 flex-wrap">
						{#if isShared}
							<span class="text-xs font-medium {sharedConsensusColor.text} mr-1">Shared:</span>
						{/if}
						{#each pos.models as model, i}
							{@const colors = getModelColor(model)}
							<div class="flex items-center gap-1.5">
								<div class="w-6 h-6 rounded-full {colors.bg} flex items-center justify-center text-xs font-bold {colors.text}">
									{model[0]}
								</div>
								<span class="text-sm font-medium {colors.text}">{model}</span>
							</div>
							{#if pos.models.length > 1 && i < pos.models.length - 1}
								<span class="text-star-faint text-xs">+</span>
							{/if}
						{/each}
					</div>
					<p class="text-sm text-star-dim prose-inline">{@html renderMarkdown(pos.statement)}</p>
				</div>
			{/each}
		</div>
	</div>

	<!-- Impact and Resolution Path (if available) -->
	{#if topic.impact || topic.resolutionPath}
		<div class="px-4 pb-4 space-y-3">
			{#if topic.impact}
				<div class="rounded-lg bg-space-700/50 p-3 border border-space-600">
					<div class="flex items-start gap-2">
						<svg class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
						<div>
							<span class="text-xs font-medium text-amber-400 uppercase tracking-wide">Impact</span>
							<p class="text-sm text-star-dim mt-1">{topic.impact}</p>
						</div>
					</div>
				</div>
			{/if}

			{#if topic.resolutionPath}
				<div class="rounded-lg bg-space-700/50 p-3 border border-space-600">
					<div class="flex items-start gap-2">
						<svg class="w-4 h-4 text-cosmic-cyan flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
						</svg>
						<div>
							<span class="text-xs font-medium text-cosmic-cyan uppercase tracking-wide">Resolution Path</span>
							<p class="text-sm text-star-dim mt-1">{topic.resolutionPath}</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.prose-inline :global(p) {
		display: inline;
		margin: 0;
	}
	.prose-inline :global(strong) {
		color: rgb(var(--color-star-white));
		font-weight: 600;
	}
	.prose-inline :global(em) {
		font-style: italic;
	}
	.prose-inline :global(code) {
		background-color: rgb(var(--color-space-600));
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
		color: rgb(var(--color-cosmic-cyan));
	}
</style>
