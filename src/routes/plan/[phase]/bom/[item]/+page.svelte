<script lang="ts">
	import { page } from '$app/stores';
	import { LLM_MODELS } from '$lib/services/bom-specs';
	import type { BOMItemSpec } from '$lib/types';
	import { Marked } from 'marked';
	import ConsensusView from '$lib/components/phases/ConsensusView.svelte';
	import { sanitizeMarkdownHTML } from '$lib/utils/sanitize';

	// Get data from load function
	let { data } = $props();

	const phase = $derived(data.phase);
	const itemMeta = $derived(data.itemMeta);
	const specs = $derived<BOMItemSpec | null>(data.specs);

	// Loading state is now handled by SvelteKit
	const loading = $derived(!data.phase || !data.itemMeta);
	const error = $derived(
		data.phase && data.itemMeta && (!specs || specs.specs.length === 0)
			? 'No specifications found for this item.'
			: null
	);

	let activeTab = $state('consensus');

	const modelOrder = ['consensus', 'claude-opus-4-5', 'claude-opus-4-6', 'gemini-3-pro', 'gpt-5-2'];

	// Configure marked for proper rendering
	const marked = new Marked({
		gfm: true,
		breaks: false
	});

	function getModelSpec(modelId: string) {
		return specs?.specs.find((s) => s.modelId === modelId);
	}

	const categoryColors: Record<string, string> = {
		Spacecraft: 'bg-cosmic-blue/20 text-cosmic-cyan',
		Robotics: 'bg-cosmic-purple/20 text-cosmic-purple',
		Infrastructure: 'bg-sun-gold/20 text-sun-gold',
		'Power Systems': 'bg-green-500/20 text-green-400'
	};

	function renderMarkdown(content: string): string {
		const html = marked.parse(content) as string;
		return sanitizeMarkdownHTML(html);
	}
</script>

<svelte:head>
	<title
		>{itemMeta ? `${itemMeta.name} - Phase ${phase?.number}` : 'BOM Item'} - Project Dyson</title
	>
</svelte:head>

{#if loading}
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="card-glow p-12 text-center">
			<div
				class="w-12 h-12 mx-auto mb-4 border-4 border-cosmic-cyan border-t-transparent rounded-full animate-spin"
			></div>
			<p class="text-star-dim">Loading specifications...</p>
		</div>
	</div>
{:else if !phase || !itemMeta}
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
					d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<h1 class="text-2xl font-bold text-star-white mb-2">Item Not Found</h1>
			<p class="text-star-dim mb-6">The requested BOM item doesn't exist.</p>
			<a href="/plan/{$page.params.phase}" class="btn-primary">Back to Phase</a>
		</div>
	</div>
{:else}
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Breadcrumb -->
		<nav class="mb-8">
			<ol class="flex items-center gap-2 text-sm flex-wrap">
				<li><a href="/plan" class="text-star-dim hover:text-cosmic-cyan">Plan</a></li>
				<li class="text-star-faint">/</li>
				<li>
					<a href="/plan/{phase.id}" class="text-star-dim hover:text-cosmic-cyan"
						>Phase {phase.number}</a
					>
				</li>
				<li class="text-star-faint">/</li>
				<li class="text-star-white">{itemMeta.name}</li>
			</ol>
		</nav>

		<!-- Header -->
		<div class="mb-8">
			<div class="flex flex-col md:flex-row md:items-start gap-6 mb-6">
				<div
					class="w-16 h-16 rounded-lg bg-gradient-to-br from-cosmic-blue to-cosmic-purple flex items-center justify-center flex-shrink-0"
				>
					<svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
						/>
					</svg>
				</div>
				<div class="flex-1">
					<div class="flex flex-wrap items-center gap-3 mb-2">
						<h1 class="text-3xl md:text-4xl font-bold text-star-white">{itemMeta.name}</h1>
						<span class="px-3 py-1 rounded text-sm {categoryColors[itemMeta.category] || 'bg-space-600 text-star-dim'}">
							{itemMeta.category}
						</span>
					</div>
					<p class="text-star-dim">
						Detailed technical specifications from multiple AI perspectives for Phase {phase.number}
						- {phase.title}
					</p>
				</div>
			</div>

			<!-- Stats Row -->
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div class="card-glow p-4">
					<p class="text-xs text-star-faint mb-1">Quantity</p>
					<p class="text-xl font-bold text-star-white">{itemMeta.quantity}</p>
				</div>
				<div class="card-glow p-4">
					<p class="text-xs text-star-faint mb-1">Budget Allocation</p>
					<p class="text-xl font-bold text-sun-gold">{itemMeta.cost}</p>
				</div>
				<div class="card-glow p-4">
					<p class="text-xs text-star-faint mb-1">BOM ID</p>
					<p class="text-xl font-bold text-star-white font-mono">{itemMeta.bomId}</p>
				</div>
				<div class="card-glow p-4">
					<p class="text-xs text-star-faint mb-1">Specifications</p>
					<p class="text-xl font-bold text-cosmic-cyan">{specs?.specs.length || 0} models</p>
				</div>
			</div>
		</div>

		{#if error}
			<div class="card-glow p-8 text-center mb-8 border border-red-500/30">
				<svg
					class="w-12 h-12 mx-auto mb-4 text-red-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
					/>
				</svg>
				<p class="text-red-400">{error}</p>
				<p class="text-star-faint text-sm mt-2">
					Run <code class="bg-space-600 px-2 py-1 rounded">node scripts/query-bom-specs.js</code> to
					generate specifications.
				</p>
			</div>
		{/if}

		<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
			<!-- Main Content: Tabbed Specs -->
			<div class="lg:col-span-3">
				<!-- Tab Navigation -->
				<div class="flex flex-wrap gap-2 mb-6">
					{#each modelOrder as modelId}
						{#if modelId === 'consensus'}
							{@const hasConsensus = specs?.consensus && specs.consensus.keySpecs.length > 0}
							<button
								class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 {activeTab === 'consensus'
									? 'bg-gradient-to-r from-cosmic-blue to-cosmic-purple text-white'
									: hasConsensus
										? 'bg-space-600 text-star-dim hover:bg-space-500 hover:text-star-white'
										: 'bg-space-700 text-star-faint cursor-not-allowed'}"
								onclick={() => hasConsensus && (activeTab = 'consensus')}
								disabled={!hasConsensus}
							>
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Consensus
								{#if !hasConsensus}
									<span class="text-xs">(pending)</span>
								{/if}
							</button>
						{:else}
							{@const model = LLM_MODELS[modelId as keyof typeof LLM_MODELS]}
							{@const hasSpec = specs?.specs.some((s) => s.modelId === modelId)}
							<button
								class="px-4 py-2 rounded-lg text-sm font-medium transition-all {activeTab === modelId
									? 'bg-cosmic-blue text-white'
									: hasSpec
										? 'bg-space-600 text-star-dim hover:bg-space-500 hover:text-star-white'
										: 'bg-space-700 text-star-faint cursor-not-allowed'}"
								onclick={() => hasSpec && (activeTab = modelId)}
								disabled={!hasSpec}
							>
								{model?.name || modelId}
								{#if !hasSpec}
									<span class="ml-1 text-xs">(pending)</span>
								{/if}
							</button>
						{/if}
					{/each}
				</div>

				<!-- Spec Content -->
				<div class="card-glow p-6 md:p-8">
					{#if activeTab === 'consensus'}
						{#if specs?.consensus && specs.consensus.keySpecs.length > 0}
							<ConsensusView consensus={specs.consensus} divergentViewsData={specs.divergentViewsData} itemName={itemMeta?.name || 'Item'} />
						{:else}
							<div class="text-center py-12">
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
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
								<p class="text-star-dim">Consensus analysis not yet available</p>
							</div>
						{/if}
					{:else}
						{#each modelOrder.filter(id => id !== 'consensus') as modelId}
							{@const spec = getModelSpec(modelId)}
							{#if activeTab === modelId}
								{#if spec}
									<div class="mb-4 flex flex-wrap items-center justify-between gap-4">
										<div>
											<h2 class="text-xl font-bold text-star-white">{spec.modelName}</h2>
											<p class="text-sm text-star-faint">Generated: {spec.generatedDate}</p>
										</div>
									</div>
									<article class="prose-spec">
										{@html renderMarkdown(spec.content)}
									</article>
								{:else}
									<div class="text-center py-12">
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
												d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
											/>
										</svg>
										<p class="text-star-dim">Specification not yet generated</p>
									</div>
								{/if}
							{/if}
						{/each}
					{/if}
				</div>
			</div>

			<!-- Sidebar: Consensus Summary -->
			<div class="lg:col-span-1">
				<div class="card-glow p-6 sticky top-24">
					<h3 class="text-lg font-bold text-star-white mb-4">Consensus Summary</h3>

					{#if specs?.consensus && specs.consensus.keySpecs.length > 0}
						<!-- Key Specifications -->
						<div class="mb-6">
							<h4 class="text-sm font-semibold text-cosmic-cyan mb-2">Key Specifications</h4>
							<ul class="space-y-2">
								{#each specs.consensus.keySpecs.slice(0, 5) as spec}
									<li class="text-sm text-star-dim flex items-start gap-2">
										<svg
											class="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M5 13l4 4L19 7"
											/>
										</svg>
										<span class="sidebar-prose">{@html renderMarkdown(spec)}</span>
									</li>
								{/each}
							</ul>
						</div>

						<!-- Divergent Views -->
						{#if specs.consensus.divergentViews.length > 0}
							<div class="mb-6">
								<h4 class="text-sm font-semibold text-sun-gold mb-2">Divergent Views</h4>
								<ul class="space-y-2">
									{#each specs.consensus.divergentViews.slice(0, 3) as view}
										<li class="text-sm text-star-dim flex items-start gap-2">
											<svg
												class="w-4 h-4 text-sun-gold flex-shrink-0 mt-0.5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span class="sidebar-prose">{@html renderMarkdown(view)}</span>
										</li>
									{/each}
								</ul>
							</div>
						{/if}

						<!-- Open Questions -->
						{#if specs.consensus.openQuestions.length > 0}
							<div class="mb-6">
								<h4 class="text-sm font-semibold text-cosmic-purple mb-2">Open Questions</h4>
								<ul class="space-y-2">
									{#each specs.consensus.openQuestions.slice(0, 3) as question}
										<li class="text-sm text-star-dim flex items-start gap-2">
											<svg
												class="w-4 h-4 text-cosmic-purple flex-shrink-0 mt-0.5"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
											<span class="sidebar-prose">{@html renderMarkdown(question)}</span>
										</li>
									{/each}
								</ul>
							</div>
						{/if}
					{:else}
						<p class="text-sm text-star-faint">
							Consensus analysis will be available once all model specifications are generated.
						</p>
					{/if}

					<!-- Related Research Questions -->
					{#if data.relatedQuestions && data.relatedQuestions.length > 0}
						<div class="mb-6 pt-4 border-t border-space-600">
							<h4 class="text-sm font-semibold text-cosmic-cyan mb-2 flex items-center gap-2">
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								Research Questions ({data.relatedQuestions.length})
							</h4>
							<ul class="space-y-2">
								{#each data.relatedQuestions.slice(0, 5) as question}
									<li>
										<a
											href="/questions/{question.slug}"
											class="text-sm text-star-dim hover:text-cosmic-cyan transition-colors block"
										>
											{question.title}
										</a>
									</li>
								{/each}
							</ul>
							{#if data.relatedQuestions.length > 5}
								<a
									href="/questions?bomItem={data.itemSlug}"
									class="text-xs text-cosmic-cyan hover:underline mt-2 inline-block"
								>
									View all {data.relatedQuestions.length} questions
								</a>
							{/if}
						</div>
					{/if}

					<!-- Back Link -->
					<div class="pt-4 border-t border-space-600">
						<a
							href="/plan/{phase.id}"
							class="text-sm text-cosmic-cyan hover:text-cosmic-blue transition-colors flex items-center gap-2"
						>
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							Back to Phase {phase.number}
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Markdown content styling */
	.prose-spec :global(h1) {
		font-size: 1.75rem;
		font-weight: 700;
		color: rgb(var(--color-star-white));
		margin-top: 2rem;
		margin-bottom: 1rem;
	}
	.prose-spec :global(h2) {
		font-size: 1.5rem;
		font-weight: 700;
		color: rgb(var(--color-star-white));
		margin-top: 2rem;
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 1px solid rgb(var(--color-space-500));
	}
	.prose-spec :global(h3) {
		font-size: 1.25rem;
		font-weight: 600;
		color: rgb(var(--color-star-white));
		margin-top: 1.5rem;
		margin-bottom: 0.75rem;
	}
	.prose-spec :global(h4) {
		font-size: 1.1rem;
		font-weight: 600;
		color: rgb(var(--color-star-white));
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
	}
	.prose-spec :global(p) {
		color: rgb(var(--color-star-dim));
		margin-bottom: 1rem;
		line-height: 1.7;
	}
	.prose-spec :global(strong) {
		color: rgb(var(--color-star-white));
		font-weight: 600;
	}
	.prose-spec :global(em) {
		font-style: italic;
	}
	.prose-spec :global(a) {
		color: rgb(var(--color-cosmic-cyan));
		text-decoration: underline;
	}
	.prose-spec :global(a:hover) {
		color: rgb(var(--color-cosmic-blue));
	}

	/* Lists */
	.prose-spec :global(ul) {
		list-style-type: disc;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		color: rgb(var(--color-star-dim));
	}
	.prose-spec :global(ol) {
		list-style-type: decimal;
		padding-left: 1.5rem;
		margin-bottom: 1rem;
		color: rgb(var(--color-star-dim));
	}
	.prose-spec :global(li) {
		margin-bottom: 0.5rem;
		line-height: 1.6;
	}
	.prose-spec :global(li strong) {
		color: rgb(var(--color-star-white));
	}

	/* Tables */
	.prose-spec :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.5rem 0;
		font-size: 0.9rem;
	}
	.prose-spec :global(thead) {
		background-color: rgb(var(--color-space-600));
	}
	.prose-spec :global(th) {
		padding: 0.75rem 1rem;
		text-align: left;
		font-weight: 600;
		color: rgb(var(--color-star-white));
		border: 1px solid rgb(var(--color-space-500));
	}
	.prose-spec :global(td) {
		padding: 0.75rem 1rem;
		border: 1px solid rgb(var(--color-space-500));
		color: rgb(var(--color-star-dim));
	}
	.prose-spec :global(tr:nth-child(even)) {
		background-color: rgba(var(--color-space-600), 0.3);
	}

	/* Code blocks */
	.prose-spec :global(pre) {
		background-color: rgb(var(--color-space-700));
		border: 1px solid rgb(var(--color-space-500));
		border-radius: 0.5rem;
		padding: 1rem;
		overflow-x: auto;
		margin: 1.5rem 0;
		font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
		font-size: 0.85rem;
		line-height: 1.5;
	}
	.prose-spec :global(pre code) {
		background: none;
		padding: 0;
		color: rgb(var(--color-star-dim));
		white-space: pre;
	}
	.prose-spec :global(code) {
		background-color: rgb(var(--color-space-600));
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.9em;
		color: rgb(var(--color-cosmic-cyan));
		font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
	}

	/* Blockquotes */
	.prose-spec :global(blockquote) {
		border-left: 4px solid rgb(var(--color-cosmic-cyan));
		padding-left: 1rem;
		margin: 1.5rem 0;
		color: rgb(var(--color-star-dim));
		font-style: italic;
	}
	.prose-spec :global(blockquote p) {
		margin-bottom: 0;
	}

	/* Horizontal rules */
	.prose-spec :global(hr) {
		border: none;
		border-top: 1px solid rgb(var(--color-space-500));
		margin: 2rem 0;
	}

	/* Sidebar prose for inline markdown */
	.sidebar-prose :global(p) {
		display: inline;
		margin: 0;
	}
	.sidebar-prose :global(strong) {
		color: rgb(var(--color-star-white));
		font-weight: 600;
	}
	.sidebar-prose :global(em) {
		font-style: italic;
	}
	.sidebar-prose :global(code) {
		background-color: rgb(var(--color-space-600));
		padding: 0.1rem 0.3rem;
		border-radius: 0.25rem;
		font-size: 0.85em;
		color: rgb(var(--color-cosmic-cyan));
	}
</style>
