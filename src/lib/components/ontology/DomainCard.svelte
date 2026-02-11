<script lang="ts">
	import type { OntologyDomain } from '$lib/types/ontology';

	interface Props {
		domain: OntologyDomain;
		artifactCounts?: Map<string, number>;
	}

	let { domain, artifactCounts }: Props = $props();

	const iconMap: Record<string, string> = {
		rocket: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
		cube: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z',
		bolt: 'M13 2L3 14h9l-1 10 10-12h-9l1-10z',
		shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
		cog: 'M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
		cpu: 'M18 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2z M9 1v3 M15 1v3 M9 20v3 M15 20v3 M20 9h3 M20 14h3 M1 9h3 M1 14h3',
		pickaxe: 'M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z',
		grid: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z',
		layers: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
		truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
		star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
		users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100-8 4 4 0 000 8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
		beaker: 'M9 3h6 M12 3v7l5 8H7l5-8V3z'
	};

	let totalArtifacts = $derived.by(() => {
		if (!artifactCounts) return 0;
		let total = 0;
		for (const topic of domain.topics) {
			total += artifactCounts.get(topic.id) || 0;
		}
		return total;
	});
</script>

<div class="card-glow p-6 hover:border-cosmic-cyan/50 transition-colors">
	<div class="flex items-start gap-4 mb-4">
		<div class="w-10 h-10 rounded-lg bg-cosmic-blue/20 flex items-center justify-center flex-shrink-0">
			<svg class="w-5 h-5 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={iconMap[domain.icon] || iconMap.grid} />
			</svg>
		</div>
		<div class="min-w-0">
			<h3 class="text-lg font-semibold text-star-white">{domain.name}</h3>
			<p class="text-sm text-star-dim mt-1 line-clamp-2">{domain.description}</p>
		</div>
	</div>

	<!-- Topic pills -->
	<div class="flex flex-wrap gap-1.5 mb-4">
		{#each domain.topics as topic}
			<a
				href="/topics/{topic.id}"
				class="px-2 py-0.5 text-xs rounded-full bg-space-600 text-star-dim
					hover:bg-cosmic-blue/20 hover:text-cosmic-cyan transition-colors"
			>
				{topic.name}
				{#if artifactCounts}
					<span class="text-star-faint ml-1">({artifactCounts.get(topic.id) || 0})</span>
				{/if}
			</a>
		{/each}
	</div>

	<!-- Footer -->
	<div class="flex items-center justify-between pt-3 border-t border-space-500">
		<span class="text-xs text-star-faint">
			{domain.topics.length} topics
			{#if artifactCounts}
				&middot; {totalArtifacts} artifacts
			{/if}
		</span>
	</div>
</div>
