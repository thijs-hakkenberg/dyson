<script lang="ts">
	import type { ValidatedClaim } from '$lib/types/validation';
	import { getLatestValidationEntry } from '$lib/services/validation';
	import { validationSourceLabels } from '$lib/types/validation';
	import ValidationStatus from './ValidationStatus.svelte';

	interface Props {
		claim: ValidatedClaim;
	}

	let { claim }: Props = $props();

	const latestEntry = $derived(getLatestValidationEntry(claim));

	const phaseLabels: Record<string, string> = {
		'phase-0': 'Phase 0',
		'phase-1': 'Phase 1',
		'phase-2': 'Phase 2'
	};

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function getConfidenceColor(confidence: number): string {
		if (confidence >= 90) return 'text-green-400';
		if (confidence >= 70) return 'text-yellow-400';
		if (confidence >= 50) return 'text-orange-400';
		return 'text-red-400';
	}
</script>

<article class="card-glow p-6 h-full flex flex-col hover:border-cosmic-cyan/50 transition-colors">
	<!-- Header -->
	<div class="flex items-start justify-between gap-3 mb-3">
		<ValidationStatus status={claim.status} size="sm" />
		{#if claim.phaseId}
			<span class="px-2 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				{phaseLabels[claim.phaseId] || claim.phaseId}
			</span>
		{/if}
	</div>

	<!-- Claim -->
	<h3 class="text-lg font-semibold text-star-white mb-2 line-clamp-3">
		<a href="/validation/{claim.slug}" class="hover:text-cosmic-cyan transition-colors">
			{claim.claim}
		</a>
	</h3>

	<!-- Latest Validation Summary -->
	{#if latestEntry}
		<div class="mb-4 p-3 rounded bg-space-700 text-sm">
			<div class="flex items-center justify-between mb-1">
				<span class="text-star-faint">
					{validationSourceLabels[latestEntry.source]}
				</span>
				<span class="{getConfidenceColor(latestEntry.confidence)} text-xs">
					{latestEntry.confidence}%
				</span>
			</div>
			<p class="text-star-dim line-clamp-2">
				{latestEntry.conclusion}
			</p>
		</div>
	{:else}
		<div class="mb-4 p-3 rounded bg-space-700 text-sm text-center text-star-faint">
			No validations yet
		</div>
	{/if}

	<!-- Tags -->
	<div class="flex flex-wrap gap-1.5 mb-4">
		{#each claim.tags.slice(0, 4) as tag}
			<span class="px-1.5 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				{tag}
			</span>
		{/each}
		{#if claim.tags.length > 4}
			<span class="px-1.5 py-0.5 text-xs rounded bg-space-600 text-star-faint">
				+{claim.tags.length - 4}
			</span>
		{/if}
	</div>

	<!-- Footer -->
	<div class="flex items-center justify-between pt-4 border-t border-space-500 mt-auto">
		<div class="flex items-center gap-2 text-xs text-star-faint">
			{#if claim.validations.length > 0}
				<span class="text-star-dim">{claim.validations.length} validation{claim.validations.length !== 1 ? 's' : ''}</span>
				<span>-</span>
			{/if}
			<span>Updated {formatDate(claim.lastUpdated)}</span>
		</div>
		<a
			href="/validation/{claim.slug}"
			class="text-sm text-cosmic-cyan hover:underline inline-flex items-center gap-1"
		>
			Details
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</a>
	</div>

	<!-- Related Links -->
	{#if claim.bomItemId || claim.questionId}
		<div class="mt-3 pt-3 border-t border-space-500 flex flex-wrap gap-2 text-xs">
			{#if claim.bomItemId}
				<span class="px-2 py-0.5 rounded bg-cosmic-blue/20 text-cosmic-cyan">
					{claim.bomItemId}
				</span>
			{/if}
			{#if claim.questionId}
				<span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400">
					{claim.questionId}
				</span>
			{/if}
		</div>
	{/if}
</article>
