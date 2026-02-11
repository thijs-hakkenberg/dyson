<script lang="ts">
	import type { ArtifactReference, ArtifactType } from '$lib/types/ontology';

	interface Props {
		artifacts: ArtifactReference[];
		groupByType?: boolean;
	}

	let { artifacts, groupByType = true }: Props = $props();

	const typeLabels: Record<ArtifactType, string> = {
		'research-question': 'Research Questions',
		'blog-post': 'Blog Posts',
		'bom-item': 'BOM Items',
		validation: 'Validations',
		experiment: 'Experiments',
		simulation: 'Simulations',
		organization: 'Organizations'
	};

	const typeIcons: Record<ArtifactType, string> = {
		'research-question': 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		'blog-post': 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
		'bom-item': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
		validation: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		experiment: 'M9 3h6 M12 3v7l5 8H7l5-8V3z',
		simulation: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		organization: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
	};

	let grouped = $derived.by(() => {
		if (!groupByType) return null;
		const groups = new Map<ArtifactType, ArtifactReference[]>();
		for (const artifact of artifacts) {
			const list = groups.get(artifact.type) || [];
			list.push(artifact);
			groups.set(artifact.type, list);
		}
		return groups;
	});

	// Display order for artifact types
	const typeOrder: ArtifactType[] = [
		'research-question',
		'bom-item',
		'blog-post',
		'validation',
		'simulation',
		'experiment',
		'organization'
	];
</script>

{#if groupByType && grouped}
	{#each typeOrder as type}
		{@const items = grouped.get(type)}
		{#if items && items.length > 0}
			<div class="mb-6">
				<h4 class="flex items-center gap-2 text-sm font-semibold text-star-dim mb-3">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={typeIcons[type]} />
					</svg>
					{typeLabels[type]}
					<span class="text-star-faint font-normal">({items.length})</span>
				</h4>
				<div class="space-y-1">
					{#each items as artifact}
						<a
							href={artifact.url}
							class="flex items-center justify-between px-3 py-2 rounded-lg
								hover:bg-space-600 transition-colors group"
						>
							<span class="text-sm text-star-white group-hover:text-cosmic-cyan transition-colors truncate">
								{artifact.title}
							</span>
							{#if artifact.phaseId}
								<span class="text-xs text-star-faint ml-2 flex-shrink-0">
									{artifact.phaseId.replace('phase-', 'P')}
								</span>
							{/if}
						</a>
					{/each}
				</div>
			</div>
		{/if}
	{/each}
{:else}
	<div class="space-y-1">
		{#each artifacts as artifact}
			<a
				href={artifact.url}
				class="flex items-center justify-between px-3 py-2 rounded-lg
					hover:bg-space-600 transition-colors group"
			>
				<div class="flex items-center gap-2 min-w-0">
					<svg class="w-4 h-4 text-star-faint flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d={typeIcons[artifact.type]} />
					</svg>
					<span class="text-sm text-star-white group-hover:text-cosmic-cyan transition-colors truncate">
						{artifact.title}
					</span>
				</div>
				{#if artifact.phaseId}
					<span class="text-xs text-star-faint ml-2 flex-shrink-0">
						{artifact.phaseId.replace('phase-', 'P')}
					</span>
				{/if}
			</a>
		{/each}
	</div>
{/if}

{#if artifacts.length === 0}
	<div class="text-center py-8">
		<p class="text-star-faint text-sm">No artifacts linked to this topic yet.</p>
	</div>
{/if}
