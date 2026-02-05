<script lang="ts">
	import type { ExternalOrganization } from '$lib/types/organizations';

	interface Props {
		organization: ExternalOrganization;
		questionCount?: number;
	}

	let { organization, questionCount = 0 }: Props = $props();

	const categoryLabels: Record<string, string> = {
		'space-agency': 'Space Agency',
		'propulsion-lab': 'Propulsion Lab',
		'pv-research': 'PV Research',
		manufacturing: 'Manufacturing',
		university: 'University',
		'standards-body': 'Standards Body'
	};

	const categoryColors: Record<string, string> = {
		'space-agency': 'bg-blue-500/20 text-blue-400',
		'propulsion-lab': 'bg-orange-500/20 text-orange-400',
		'pv-research': 'bg-yellow-500/20 text-yellow-400',
		manufacturing: 'bg-green-500/20 text-green-400',
		university: 'bg-purple-500/20 text-purple-400',
		'standards-body': 'bg-cyan-500/20 text-cyan-400'
	};
</script>

<article
	class="card-glow p-6 h-full flex flex-col hover:border-cosmic-cyan/50 transition-colors"
>
	<!-- Header -->
	<div class="flex items-start justify-between gap-3 mb-3">
		<span class="px-2 py-0.5 rounded text-xs {categoryColors[organization.category]}">
			{categoryLabels[organization.category]}
		</span>
		{#if organization.lastContact}
			<span class="text-xs text-green-400">Contacted</span>
		{/if}
	</div>

	<!-- Title -->
	<h3 class="text-lg font-semibold text-star-white mb-1">
		<a
			href="/organizations/{organization.slug}"
			class="hover:text-cosmic-cyan transition-colors"
		>
			{organization.shortName || organization.name}
		</a>
	</h3>

	{#if organization.shortName}
		<p class="text-xs text-star-faint mb-2">{organization.name}</p>
	{/if}

	<!-- Description -->
	<p class="text-star-dim text-sm mb-4 flex-1 line-clamp-3">
		{organization.description}
	</p>

	<!-- Domains -->
	<div class="flex flex-wrap gap-1.5 mb-4">
		{#each organization.relevantDomains.slice(0, 3) as domain}
			<span class="px-1.5 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				{domain}
			</span>
		{/each}
		{#if organization.relevantDomains.length > 3}
			<span class="px-1.5 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				+{organization.relevantDomains.length - 3}
			</span>
		{/if}
	</div>

	<!-- Footer -->
	<div
		class="flex items-center justify-between pt-4 border-t border-space-500 mt-auto"
	>
		<div class="flex items-center gap-2 text-xs text-star-faint">
			{#if questionCount > 0}
				<span class="px-2 py-0.5 rounded bg-cosmic-blue/20 text-cosmic-cyan">
					{questionCount} question{questionCount === 1 ? '' : 's'}
				</span>
			{/if}
		</div>
		<a
			href="/organizations/{organization.slug}"
			class="text-sm text-cosmic-cyan hover:underline inline-flex items-center gap-1"
		>
			View
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5l7 7-7 7"
				/>
			</svg>
		</a>
	</div>
</article>
