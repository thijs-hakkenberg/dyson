<script lang="ts">
	interface Props {
		specs: string[];
	}

	let { specs }: Props = $props();
</script>

{#if specs.length > 0}
	<section>
		<div class="flex items-center gap-2 mb-4">
			<div class="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
				<svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h3 class="text-lg font-bold text-star-white">Agreed Specifications</h3>
			<span class="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">All models align</span>
		</div>
		<div class="grid md:grid-cols-2 gap-3">
			{#each specs as spec}
				<div class="flex items-start gap-3 p-4 rounded-lg bg-space-700/50 border border-green-500/10 hover:border-green-500/30 transition-colors">
					<svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					<span class="text-star-dim text-sm">{spec}</span>
				</div>
			{/each}
		</div>
	</section>
{/if}
