<script lang="ts">
	import { getPhaseSummary, formatCostEstimate, getModelDisplayName } from '$lib/services/llm-content';

	interface Props {
		phaseId: string;
	}

	let { phaseId }: Props = $props();

	const summary = $derived(getPhaseSummary(phaseId));
</script>

{#if summary}
	<section class="mb-12">
		<h2 class="text-2xl font-bold text-star-white mb-6">Multi-LLM Consensus Analysis</h2>

		<div class="card-glow p-6 mb-6">
			<p class="text-star-dim mb-4">
				This phase has been analyzed by multiple frontier AI models. Below is a synthesis of their findings,
				highlighting areas of agreement and divergent perspectives.
			</p>

			<!-- Cost Estimates Grid -->
			<div class="grid md:grid-cols-3 gap-4 mb-6">
				{#each summary.costEstimates as estimate}
					<div class="bg-space-700/50 rounded-lg p-4">
						<div class="flex items-center gap-2 mb-2">
							<div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
								{estimate.model.includes('Gemini') ? 'bg-blue-500/20 text-blue-400' : ''}
								{estimate.model.includes('GPT') ? 'bg-green-500/20 text-green-400' : ''}
								{estimate.model.includes('Claude') ? 'bg-orange-500/20 text-orange-400' : ''}">
								{estimate.model[0]}
							</div>
							<span class="text-sm text-star-white font-medium">{estimate.model}</span>
						</div>
						<p class="text-xl font-bold text-sun-gold">{formatCostEstimate(estimate.estimate)}</p>
						<p class="text-xs text-star-faint">{estimate.confidence}</p>
					</div>
				{/each}

				<!-- Consensus -->
				<div class="bg-gradient-to-br from-cosmic-blue/20 to-cosmic-purple/20 rounded-lg p-4 border border-cosmic-cyan/30">
					<div class="flex items-center gap-2 mb-2">
						<svg class="w-6 h-6 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span class="text-sm text-star-white font-medium">Consensus</span>
					</div>
					<p class="text-xl font-bold text-cosmic-cyan">{formatCostEstimate(summary.consensusCost.estimate)}</p>
					<p class="text-xs text-star-faint">
						Range: {formatCostEstimate(summary.consensusCost.range.low)} - {formatCostEstimate(summary.consensusCost.range.high)}
					</p>
				</div>
			</div>

			<div class="flex items-center gap-2 text-sm text-star-faint">
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<span>Consensus Duration: <strong class="text-star-white">{summary.consensusDuration}</strong></span>
			</div>
		</div>

		<!-- Agreements & Disagreements -->
		<div class="grid md:grid-cols-2 gap-6 mb-6">
			<!-- Agreements -->
			<div class="card-glow p-6">
				<h3 class="font-semibold text-star-white mb-4 flex items-center gap-2">
					<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					Key Agreements
				</h3>
				<ul class="space-y-2">
					{#each summary.keyAgreements as agreement}
						<li class="flex items-start gap-2 text-sm text-star-dim">
							<span class="text-green-400 mt-0.5">+</span>
							<span>{agreement}</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Disagreements -->
			<div class="card-glow p-6">
				<h3 class="font-semibold text-star-white mb-4 flex items-center gap-2">
					<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
					Divergent Perspectives
				</h3>
				<ul class="space-y-2">
					{#each summary.keyDisagreements as disagreement}
						<li class="flex items-start gap-2 text-sm text-star-dim">
							<span class="text-amber-400 mt-0.5">~</span>
							<span>{disagreement}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Open Questions -->
		<div class="card-glow p-6 bg-gradient-to-br from-space-700/50 to-space-800/50">
			<h3 class="font-semibold text-star-white mb-4 flex items-center gap-2">
				<svg class="w-5 h-5 text-cosmic-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
				</svg>
				Open Questions (Research Priorities)
			</h3>
			<p class="text-sm text-star-faint mb-4">
				These questions must be resolved through funded research before full execution:
			</p>
			<div class="grid md:grid-cols-2 gap-2">
				{#each summary.openQuestions as question}
					<div class="flex items-start gap-2 text-sm text-star-dim bg-space-600/30 rounded px-3 py-2">
						<span class="text-cosmic-purple mt-0.5">?</span>
						<span>{question}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}
