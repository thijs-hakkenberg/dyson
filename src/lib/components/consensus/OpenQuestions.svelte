<script lang="ts">
	interface Props {
		questions: string[];
	}

	let { questions }: Props = $props();
</script>

{#if questions.length > 0}
	<section>
		<div class="flex items-center gap-2 mb-4">
			<div class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
				<svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<h3 class="text-lg font-bold text-star-white">Open Questions</h3>
			<span class="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">Research needed</span>
		</div>

		<div class="rounded-lg border border-purple-500/20 bg-purple-500/5 p-4">
			<p class="text-sm text-purple-300 mb-4">
				These critical decisions and research needs were identified across all models:
			</p>
			<div class="grid md:grid-cols-2 gap-3">
				{#each questions as question}
					<div class="flex items-start gap-3 p-3 rounded-lg bg-space-700/50 border border-purple-500/10">
						<svg class="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<span class="text-sm text-star-dim">{question}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}
