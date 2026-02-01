<script lang="ts">
	import { getModelColor, getPositionBoxColor, sharedConsensusColor } from '$lib/utils/status';

	interface Props {
		models: string[];
		position: string;
		isShared?: boolean;
	}

	let { models, position, isShared = false }: Props = $props();

	// Get the box color based on whether this is a shared position
	const boxColor = $derived(getPositionBoxColor(models, isShared));
</script>

<div class="rounded-lg p-3 {boxColor.bg} border {boxColor.border} flex-1 min-w-[200px] max-w-full md:max-w-[calc(50%-0.375rem)]">
	<div class="flex items-center gap-2 mb-2 flex-wrap">
		{#if isShared}
			<!-- Shared position: show "Shared" label, then model badges -->
			<span class="text-xs font-medium {sharedConsensusColor.text} mr-1">Shared:</span>
		{/if}
		{#each models as model, i}
			{@const colors = getModelColor(model)}
			<div class="flex items-center gap-1.5">
				<div class="w-6 h-6 rounded-full {colors.bg} flex items-center justify-center text-xs font-bold {colors.text}">
					{model[0]}
				</div>
				<span class="text-sm font-medium {colors.text}">{model}</span>
			</div>
			{#if models.length > 1 && i < models.length - 1}
				<span class="text-star-faint text-xs">+</span>
			{/if}
		{/each}
	</div>
	<p class="text-sm text-star-dim">{position}</p>
</div>
