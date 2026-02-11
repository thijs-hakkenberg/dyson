<script lang="ts">
	import { ArtifactList } from '$lib/components/ontology';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.topic.name} - Topics - Project Dyson</title>
	<meta
		name="description"
		content={data.topic.description || `Research artifacts related to ${data.topic.name} in Project Dyson.`}
	/>
</svelte:head>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Breadcrumb -->
	<nav class="flex items-center gap-2 text-sm text-star-faint mb-8">
		<a href="/topics" class="hover:text-cosmic-cyan transition-colors">Topics</a>
		<span>/</span>
		{#if data.domain}
			<span class="text-star-dim">{data.domain.name}</span>
			<span>/</span>
		{/if}
		<span class="text-star-white">{data.topic.name}</span>
	</nav>

	<!-- Header -->
	<div class="mb-8">
		<h1 class="text-3xl md:text-4xl font-bold text-star-white mb-3">{data.topic.name}</h1>
		{#if data.topic.description}
			<p class="text-star-dim text-lg">{data.topic.description}</p>
		{/if}
		<div class="flex items-center gap-4 mt-4 text-sm text-star-faint">
			<span>{data.artifacts.length} linked artifacts</span>
			{#if data.topic.legacyTags.length > 0}
				<span>&middot; Maps {data.topic.legacyTags.length} tags</span>
			{/if}
		</div>
	</div>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
		<!-- Main: Artifacts -->
		<div class="lg:col-span-2">
			<div class="card-glow p-6">
				<h2 class="text-lg font-semibold text-star-white mb-4">Linked Artifacts</h2>
				<ArtifactList artifacts={data.artifacts} />
			</div>
		</div>

		<!-- Sidebar -->
		<div class="space-y-6">
			<!-- Legacy Tags -->
			{#if data.topic.legacyTags.length > 0}
				<div class="card-glow p-4">
					<h3 class="text-sm font-semibold text-star-white mb-3">Mapped Tags</h3>
					<div class="flex flex-wrap gap-1.5">
						{#each data.topic.legacyTags as tag}
							<span class="px-2 py-0.5 text-xs rounded-full bg-space-600 text-star-dim">
								{tag}
							</span>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Sibling Topics -->
			{#if data.siblingTopics.length > 0}
				<div class="card-glow p-4">
					<h3 class="text-sm font-semibold text-star-white mb-3">
						More in {data.domain?.name || 'this domain'}
					</h3>
					<div class="space-y-1">
						{#each data.siblingTopics as sibling}
							<a
								href="/topics/{sibling.id}"
								class="block px-3 py-2 text-sm text-star-dim rounded-lg
									hover:bg-space-600 hover:text-cosmic-cyan transition-colors"
							>
								{sibling.name}
							</a>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Related Topics -->
			{#if data.relatedTopics.length > 0}
				<div class="card-glow p-4">
					<h3 class="text-sm font-semibold text-star-white mb-3">Related Topics</h3>
					<div class="space-y-1">
						{#each data.relatedTopics as related}
							<a
								href="/topics/{related.id}"
								class="block px-3 py-2 text-sm text-star-dim rounded-lg
									hover:bg-space-600 hover:text-cosmic-cyan transition-colors"
							>
								{related.name}
							</a>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
