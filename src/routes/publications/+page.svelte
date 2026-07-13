<script lang="ts">
	import type { PublicationStatus } from '$lib/types/publication';

	let { data } = $props();

	const statusLabels: Record<PublicationStatus, string> = {
		scaffold: 'Scaffold',
		draft: 'Draft',
		submitted: 'Submitted',
		published: 'Published'
	};

	const statusClasses: Record<PublicationStatus, string> = {
		scaffold: 'bg-space-600 text-star-faint',
		draft: 'bg-cosmic-blue/20 text-cosmic-cyan',
		submitted: 'bg-accent-amber/20 text-accent-amber',
		published: 'bg-accent-gold/20 text-accent-gold'
	};
</script>

<svelte:head>
	<title>Publications - Project Dyson</title>
	<meta
		name="description"
		content="Manuscript status, target venue, and DOI for the Project Dyson paper portfolio."
	/>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="mb-12">
		<h1 class="text-4xl font-bold text-star-white mb-4">Publications</h1>
		<p class="text-lg text-star-dim max-w-3xl">
			Manuscripts from the Project Dyson research program, with target venue, review status, and
			citable DOI once minted. Manuscript sources are maintained in the
			<a
				href="https://github.com/thijs-hakkenberg/dyson-research"
				class="text-cosmic-cyan hover:underline"
				target="_blank"
				rel="noopener noreferrer">dyson-research</a
			>
			repository.
		</p>
	</div>

	<div class="card-glow overflow-x-auto">
		<table class="w-full text-left border-collapse">
			<thead>
				<tr class="border-b border-space-500 text-xs uppercase tracking-wide text-star-faint">
					<th class="px-4 py-3">#</th>
					<th class="px-4 py-3">Title</th>
					<th class="px-4 py-3">Venue</th>
					<th class="px-4 py-3">Status</th>
					<th class="px-4 py-3">DOI</th>
				</tr>
			</thead>
			<tbody>
				{#each data.publications as pub (pub.slug)}
					<tr class="border-b border-space-600 last:border-b-0">
						<td class="px-4 py-4 text-star-dim">{pub.number}</td>
						<td class="px-4 py-4 text-star-white">
							{#if pub.blogSlug}
								<a href="/blog/{pub.blogSlug}" class="hover:text-cosmic-cyan transition-colors">
									{pub.title}
								</a>
							{:else}
								{pub.title}
							{/if}
						</td>
						<td class="px-4 py-4 text-star-dim text-sm">{pub.venue}</td>
						<td class="px-4 py-4">
							<span class="px-2 py-1 text-xs rounded {statusClasses[pub.status]}">
								{statusLabels[pub.status]}
							</span>
						</td>
						<td class="px-4 py-4 text-sm">
							{#if pub.doi}
								<a
									href="https://doi.org/{pub.doi}"
									class="text-cosmic-cyan hover:underline"
									target="_blank"
									rel="noopener noreferrer">{pub.doi}</a
								>
							{:else}
								<span class="text-star-faint">pending</span>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
