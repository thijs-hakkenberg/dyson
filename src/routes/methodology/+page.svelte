<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Methodology - Project Dyson</title>
	<meta name="description" content="The methods Project Dyson holds its multi-model reviews to." />
</svelte:head>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<header class="mb-12">
		<h1 class="text-4xl font-bold text-star-white mb-4">Methodology</h1>
		<p class="text-xl text-star-dim">
			The methods the multi-model reviews are held to. Each re-assessment round that applies one records
			which version it used, so the method is published alongside the results.
		</p>
	</header>

	<div class="grid gap-6">
		{#each data.docs as doc (doc.slug)}
			<a href="/methodology/{doc.slug}" class="card-glow p-6 block hover:border-cosmic-cyan/50 transition-colors">
				<h2 class="text-2xl font-semibold text-star-white mb-2">{doc.title}</h2>
				<p class="text-star-dim mb-4">{doc.summary}</p>
				<span class="text-sm text-cosmic-cyan">
					{doc.rounds === 0 ? 'Not yet applied' : `Applied in ${doc.rounds} review round${doc.rounds === 1 ? '' : 's'}`} →
				</span>
			</a>
		{/each}
	</div>
</div>
