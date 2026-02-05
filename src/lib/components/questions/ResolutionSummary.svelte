<script lang="ts">
	import type { ResearchQuestion } from '$lib/types/entities';
	import ResolutionStatus from './ResolutionStatus.svelte';

	interface Props {
		question: ResearchQuestion;
		showImplications?: boolean;
	}

	let { question, showImplications = true }: Props = $props();

	const sourceLabels: Record<string, string> = {
		paper: 'Research Paper',
		experiment: 'Experimental Data',
		expert: 'Expert Consultation',
		simulation: 'Simulation Results',
		'industry-data': 'Industry Data',
		consensus: 'Consensus Decision'
	};

	const sourceIcons: Record<string, string> = {
		paper: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
		experiment: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
		expert: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
		simulation: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
		'industry-data': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
		consensus: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
	};
</script>

{#if question.resolutionStatus && question.resolutionStatus !== 'open'}
	<div class="card-glow p-6">
		<!-- Header -->
		<div class="flex items-center justify-between mb-4">
			<h3 class="text-lg font-bold text-star-white">Resolution Details</h3>
			<ResolutionStatus status={question.resolutionStatus} size="md" />
		</div>

		<!-- Summary -->
		{#if question.resolutionSummary}
			<div class="mb-4 p-4 rounded-lg bg-space-700 border border-space-500">
				<p class="text-star-dim leading-relaxed">{question.resolutionSummary}</p>
			</div>
		{/if}

		<!-- Metadata -->
		<div class="grid grid-cols-2 gap-4 mb-4">
			{#if question.resolutionDate}
				<div>
					<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Resolution Date</dt>
					<dd class="text-star-white">{question.resolutionDate}</dd>
				</div>
			{/if}

			{#if question.resolutionSource}
				<div>
					<dt class="text-xs text-star-faint uppercase tracking-wider mb-1">Source</dt>
					<dd class="flex items-center gap-2 text-star-white">
						<svg class="w-4 h-4 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d={sourceIcons[question.resolutionSource]}
							/>
						</svg>
						{sourceLabels[question.resolutionSource]}
					</dd>
				</div>
			{/if}
		</div>

		<!-- Implications -->
		{#if showImplications && question.implications && question.implications.length > 0}
			<div class="mt-4 pt-4 border-t border-space-500">
				<h4 class="text-sm font-semibold text-star-white mb-3 flex items-center gap-2">
					<svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 10V3L4 14h7v7l9-11h-7z"
						/>
					</svg>
					Implications
				</h4>
				<ul class="space-y-2">
					{#each question.implications as implication}
						<li class="flex items-start gap-2 text-sm text-star-dim">
							<svg
								class="w-4 h-4 mt-0.5 text-cosmic-cyan flex-shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
							{implication}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
{/if}
