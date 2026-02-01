<script lang="ts">
	import type { BOMItemSpec, DivergentViewsData, DivergentViewTopic } from '$lib/types';
	import { Marked } from 'marked';
	import { sanitizeMarkdownHTML } from '$lib/utils/sanitize';
	import { parseDivergentView, groupByPosition, type ParsedDivergence, type GroupedPosition, type ModelName } from '$lib/utils/consensus-parser';
	import { getModelColor, getPositionBoxColor, sharedConsensusColor } from '$lib/utils/status';

	interface Props {
		consensus: BOMItemSpec['consensus'];
		divergentViewsData?: DivergentViewsData | null;
		itemName: string;
	}

	let { consensus, divergentViewsData = null, itemName }: Props = $props();

	const marked = new Marked({
		gfm: true,
		breaks: false
	});

	/**
	 * Convert structured DivergentViewTopic to GroupedPosition format for rendering.
	 * No parsing needed - data is already structured!
	 */
	function convertToGroupedPositions(topic: DivergentViewTopic): GroupedPosition[] {
		return topic.positions.map(pos => ({
			models: pos.models as ModelName[],
			position: pos.statement,
			isShared: pos.models.length > 1
		}));
	}

	// Use structured data if available, otherwise fall back to legacy parsing
	const divergentTopics = $derived(() => {
		if (divergentViewsData && divergentViewsData.topics.length > 0) {
			// Structured data path - no parsing needed!
			return divergentViewsData.topics.map(topic => ({
				topic: topic.topic,
				groupedPositions: convertToGroupedPositions(topic)
			}));
		}

		// Legacy fallback: parse from consensus.divergentViews
		return consensus.divergentViews
			.map(parseDivergentView)
			.filter(d => {
				const grouped = groupByPosition(d.positions);
				return grouped.length > 1;
			})
			.map(d => ({
				topic: d.topic,
				groupedPositions: groupByPosition(d.positions)
			}));
	});

	function renderMarkdown(content: string): string {
		const html = marked.parse(content) as string;
		return sanitizeMarkdownHTML(html);
	}
</script>

<div class="space-y-8">
	<!-- Header with gradient background -->
	<div class="rounded-xl bg-gradient-to-r from-cosmic-blue/30 via-cosmic-purple/20 to-cosmic-cyan/30 p-6 border border-cosmic-cyan/20">
		<div class="flex items-start gap-4">
			<div class="w-12 h-12 rounded-lg bg-gradient-to-br from-cosmic-cyan to-cosmic-blue flex items-center justify-center flex-shrink-0">
				<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
				</svg>
			</div>
			<div>
				<h2 class="text-xl font-bold text-star-white mb-2">Multi-Model Consensus Analysis</h2>
				<p class="text-star-dim text-sm">
					This synthesis combines insights from <span class="text-orange-400 font-medium">Claude Opus 4.5</span>,
					<span class="text-purple-400 font-medium">Gemini 3 Pro</span>, and
					<span class="text-blue-400 font-medium">GPT-5.2</span> to identify areas of agreement,
					highlight divergent perspectives, and surface open research questions for <span class="text-star-white font-medium">{itemName}</span>.
				</p>
			</div>
		</div>
	</div>

	<!-- Agreed Specifications -->
	{#if consensus.keySpecs.length > 0}
		<section>
			<div class="flex items-center gap-2 mb-4">
				<div class="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
					<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-star-white">Agreed Specifications</h3>
				<span class="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">All models align</span>
			</div>
			<div class="grid md:grid-cols-2 gap-3">
				{#each consensus.keySpecs as spec}
					<div class="flex items-start gap-3 p-4 rounded-lg bg-space-700/50 border border-green-500/10 hover:border-green-500/30 transition-colors">
						<svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span class="text-star-dim text-sm">{spec}</span>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Divergent Views -->
	{#if divergentTopics().length > 0}
		<section>
			<div class="flex items-center gap-2 mb-4">
				<div class="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
					<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-star-white">Divergent Views</h3>
				<span class="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">Models disagree</span>
			</div>

			<div class="space-y-4">
				{#each divergentTopics() as { topic, groupedPositions }}
					<div class="rounded-lg border border-amber-500/20 bg-amber-500/5 overflow-hidden">
						<!-- Warning callout header -->
						<div class="px-4 py-3 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-2">
							<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
							</svg>
							<span class="font-semibold text-amber-300">{topic}</span>
						</div>

						<!-- Model comparison cards - grouped by position -->
						<div class="p-4 flex flex-wrap gap-3">
							{#each groupedPositions as { models, position, isShared }}
								{@const boxColor = getPositionBoxColor(models, isShared)}
								<div class="rounded-lg p-3 {boxColor.bg} border {boxColor.border} flex-1 min-w-[200px] max-w-full md:max-w-[calc(50%-0.375rem)]">
									<div class="flex items-center gap-2 mb-2 flex-wrap">
										{#if isShared}
											<span class="text-xs font-medium {sharedConsensusColor.text} mr-1">Shared:</span>
										{/if}
										{#each models as model, i}
											{@const colors = getModelColor(model)}
											<div class="flex items-center gap-1.5">
												<div class="w-6 h-6 rounded-full {colors.bg} flex items-center justify-center text-xs font-bold {colors.text}">
													{model[0]}
												</div>
												<span class="text-sm font-medium {colors.text}">{model}</span>
											</div>
											{#if models.length > 1 && i < models.length - 1}
												<span class="text-star-faint text-xs">+</span>
											{/if}
										{/each}
									</div>
									<p class="text-sm text-star-dim">{position}</p>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- Open Questions -->
	{#if consensus.openQuestions.length > 0}
		<section>
			<div class="flex items-center gap-2 mb-4">
				<div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
					<svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-star-white">Open Questions</h3>
				<span class="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Research needed</span>
			</div>

			<div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
				<p class="text-sm text-purple-300 mb-4">
					These critical decisions and research needs were identified across all models:
				</p>
				<div class="grid md:grid-cols-2 gap-3">
					{#each consensus.openQuestions as question}
						<div class="flex items-start gap-3 p-3 rounded-lg bg-space-700/50 border border-purple-500/10">
							<svg class="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<span class="text-sm text-star-dim">{question}</span>
						</div>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<!-- Recommended Approach -->
	{#if consensus.recommendedApproach}
		<section>
			<div class="flex items-center gap-2 mb-4">
				<div class="w-8 h-8 rounded-lg bg-cosmic-cyan/20 flex items-center justify-center">
					<svg class="w-5 h-5 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
					</svg>
				</div>
				<h3 class="text-lg font-bold text-star-white">Recommended Approach</h3>
				<span class="text-xs text-cosmic-cyan bg-cosmic-cyan/10 px-2 py-0.5 rounded-full">Synthesis</span>
			</div>

			<div class="rounded-lg border border-cosmic-cyan/20 bg-gradient-to-br from-cosmic-blue/10 to-cosmic-purple/10 p-6">
				<article class="prose-consensus">
					{@html renderMarkdown(consensus.recommendedApproach)}
				</article>
			</div>
		</section>
	{/if}
</div>

<style>
	.prose-consensus :global(p) {
		color: rgb(var(--color-star-dim));
		margin-bottom: 1rem;
		line-height: 1.7;
	}
	.prose-consensus :global(strong) {
		color: rgb(var(--color-star-white));
		font-weight: 600;
	}
	.prose-consensus :global(ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		color: rgb(var(--color-star-dim));
	}
	.prose-consensus :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		color: rgb(var(--color-star-dim));
	}
	.prose-consensus :global(li) {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}
	.prose-consensus :global(li strong) {
		color: rgb(var(--color-cosmic-cyan));
	}
</style>
