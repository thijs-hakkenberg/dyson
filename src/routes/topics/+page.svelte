<script lang="ts">
	import { DomainCard, OntologyStats } from '$lib/components/ontology';

	let { data } = $props();

	let artifactCounts = $derived(new Map(Object.entries(data.artifactCounts)));
</script>

<svelte:head>
	<title>Topics - Project Dyson</title>
	<meta
		name="description"
		content="Browse Project Dyson research topics organized by engineering domain. Discover research questions, specifications, and blog posts by topic."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl md:text-4xl font-bold text-star-white mb-4">Topics</h1>
		<p class="text-star-dim text-lg max-w-3xl">
			Explore Dyson swarm engineering topics organized by domain. Each topic links research
			questions, BOM specifications, blog posts, and validations together.
		</p>
	</div>

	<!-- Stats -->
	<OntologyStats stats={data.stats} />

	<!-- Domain Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each data.domains as domain (domain.id)}
			<DomainCard {domain} {artifactCounts} />
		{/each}
	</div>
</div>
