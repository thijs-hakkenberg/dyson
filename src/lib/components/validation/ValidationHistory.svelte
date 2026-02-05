<script lang="ts">
	import type { ValidationEntry } from '$lib/types/validation';
	import { validationSourceLabels, validationSourceIcons } from '$lib/types/validation';

	interface Props {
		validations: ValidationEntry[];
		showAll?: boolean;
	}

	let { validations, showAll = false }: Props = $props();

	// Sort by date, most recent first
	const sortedValidations = $derived(
		[...validations].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	);

	const displayValidations = $derived(showAll ? sortedValidations : sortedValidations.slice(0, 3));

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

<div class="space-y-4">
	{#if validations.length === 0}
		<div class="text-center py-6 text-star-faint">
			<svg class="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
					d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
			</svg>
			<p class="text-sm">No validation entries yet</p>
		</div>
	{:else}
		<div class="relative">
			<!-- Timeline line -->
			<div class="absolute left-4 top-2 bottom-2 w-0.5 bg-space-500"></div>

			{#each displayValidations as entry, index (entry.id)}
				<div class="relative pl-10 pb-6 last:pb-0">
					<!-- Timeline dot -->
					<div class="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-space-600 border-2 border-cosmic-cyan"></div>

					<div class="bg-space-700 rounded-lg p-4">
						<!-- Header -->
						<div class="flex items-start justify-between gap-3 mb-3">
							<div class="flex items-center gap-2">
								<div class="p-1.5 rounded bg-space-600">
									<svg class="w-4 h-4 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
											d={validationSourceIcons[entry.source]} />
									</svg>
								</div>
								<span class="text-sm font-medium text-star-white">
									{validationSourceLabels[entry.source]}
								</span>
							</div>
							<div class="flex items-center gap-2">
								<span class="text-xs {getConfidenceColor(entry.confidence)}">
									{entry.confidence}% confidence
								</span>
								<span class="text-xs text-star-faint">
									{formatDate(entry.date)}
								</span>
							</div>
						</div>

						<!-- Source Details -->
						<p class="text-sm text-star-dim mb-2">
							{entry.sourceDetails}
						</p>

						<!-- Conclusion -->
						<div class="p-3 rounded bg-space-600/50 border-l-2 border-cosmic-cyan/50">
							<p class="text-sm text-star-white leading-relaxed">
								{entry.conclusion}
							</p>
						</div>

						<!-- Footer -->
						{#if entry.sourceUrl || entry.validator || entry.notes}
							<div class="mt-3 pt-3 border-t border-space-500 flex flex-wrap items-center gap-3 text-xs">
								{#if entry.validator}
									<span class="text-star-faint">
										By: <span class="text-star-dim">{entry.validator}</span>
									</span>
								{/if}
								{#if entry.sourceUrl}
									<a
										href={entry.sourceUrl}
										target="_blank"
										rel="noopener noreferrer"
										class="text-cosmic-cyan hover:underline inline-flex items-center gap-1"
									>
										<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
										Source
									</a>
								{/if}
								{#if entry.notes}
									<span class="text-star-faint italic">
										{entry.notes}
									</span>
								{/if}
							</div>
						{/if}

						<!-- Related RQs -->
						{#if entry.relatedRQs.length > 0}
							<div class="mt-2 flex flex-wrap gap-1">
								{#each entry.relatedRQs as rqId}
									<a
										href="/questions?search={rqId}"
										class="px-1.5 py-0.5 text-xs rounded bg-space-600 text-cosmic-cyan hover:bg-space-500 transition-colors"
									>
										{rqId}
									</a>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>

		{#if !showAll && validations.length > 3}
			<div class="text-center pt-2">
				<span class="text-sm text-star-faint">
					+{validations.length - 3} more validation entries
				</span>
			</div>
		{/if}
	{/if}
</div>
