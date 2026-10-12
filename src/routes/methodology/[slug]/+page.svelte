<script lang="ts">
	import { sanitizeMarkdownHTML } from '$lib/utils/sanitize';

	let { data } = $props();

	const doc = $derived(data.doc);
	const html = $derived(sanitizeMarkdownHTML(doc.html));
	const repo = 'https://github.com/thijs-hakkenberg/dyson/tree/main';
</script>

<svelte:head>
	<title>{doc.title} - Project Dyson Methodology</title>
	<meta name="description" content={doc.summary} />
</svelte:head>

<article class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<nav class="mb-8">
		<ol class="flex items-center gap-2 text-sm">
			<li><a href="/methodology" class="text-star-dim hover:text-cosmic-cyan">Methodology</a></li>
			<li class="text-star-faint">/</li>
			<li class="text-star-white truncate">{doc.title}</li>
		</ol>
	</nav>

	<header class="mb-10 max-w-4xl">
		<h1 class="text-4xl font-bold text-star-white mb-4">{doc.title}</h1>
		<p class="text-xl text-star-dim">{doc.summary}</p>
	</header>

	{#if doc.scaffold.length}
		<section class="mb-12" aria-labelledby="how-used">
			<h2 id="how-used" class="text-2xl font-semibold text-star-white mb-2">How the reviews use it</h2>
			<p class="text-star-dim mb-6 max-w-4xl">
				In every critique round of a re-assessment, each model receives this document with the previous
				round's reconciliation and walks its key decisions through the Composite Scaffold, naming the weakest
				link in each decision's Decision Quality chain. The synthesis then adds a decision-quality audit.
			</p>
			<ol class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{#each doc.scaffold as s, i (s.step)}
					<li class="card-glow p-4 flex gap-3">
						<span class="flex-none w-8 h-8 rounded-full bg-cosmic-blue/20 text-cosmic-cyan text-sm font-semibold flex items-center justify-center">{i + 1}</span>
						<div class="min-w-0">
							<p class="font-medium text-star-white">{s.step}</p>
							{#if s.detail}<p class="text-sm text-star-dim">{s.detail.replace(/\*/g, '')}</p>{/if}
							{#if s.sources}<p class="text-xs text-star-faint mt-1">{s.sources}</p>{/if}
						</div>
					</li>
				{/each}
			</ol>
		</section>
	{/if}

	<section class="mb-12 max-w-4xl" aria-labelledby="applied-in">
		<h2 id="applied-in" class="text-2xl font-semibold text-star-white mb-4">Applied in</h2>
		{#if data.rounds.length}
			<ul class="divide-y divide-space-500 border-y border-space-500">
				{#each data.rounds as r (r.path)}
					<li class="py-3 flex flex-wrap items-center gap-x-4 gap-y-1">
						<a href="{repo}/{r.path}" class="text-cosmic-cyan hover:underline font-medium">
							{r.phase.replace('phase-', 'Phase ')} re-assessment · round {r.round}
						</a>
						<span class="text-sm text-star-dim">{r.items} reconciliation{r.items === 1 ? '' : 's'}{r.synthesizer ? ` · synthesised by ${r.synthesizer}` : ''}</span>
						{#if !r.current}
							<span class="text-xs px-2 py-0.5 rounded bg-sun-orange/20 text-sun-orange">earlier version of this framework</span>
						{/if}
					</li>
				{/each}
			</ul>
		{:else}
			<p class="text-star-dim">No review round has applied this framework yet.</p>
		{/if}
		<p class="text-xs text-star-faint mt-3">Version {doc.sha}</p>
	</section>

	<div class="lg:grid lg:grid-cols-[14rem_1fr] lg:gap-10">
		{#if doc.toc.length}
			<nav class="hidden lg:block" aria-label="Contents">
				<div class="sticky top-24">
					<p class="text-xs uppercase tracking-wide text-star-faint mb-3">Contents</p>
					<ul class="space-y-2 text-sm">
						{#each doc.toc as t (t.id)}
							<li><a href="#{t.id}" class="text-star-dim hover:text-cosmic-cyan">{t.text}</a></li>
						{/each}
					</ul>
				</div>
			</nav>
		{/if}
		<div class="prose prose-invert max-w-none min-w-0 [&_table]:block [&_table]:overflow-x-auto">
			{@html html}
		</div>
	</div>
</article>
