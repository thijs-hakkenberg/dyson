<script lang="ts">
	interface Props {
		value: number;
		showLabel?: boolean;
	}

	let { value, showLabel = false }: Props = $props();

	const clampedValue = $derived(Math.max(0, Math.min(100, value)));
</script>

<div class="w-full">
	{#if showLabel}
		<div class="flex justify-between text-sm mb-1">
			<span class="text-star-dim">Progress</span>
			<span class="text-star-white font-medium">{clampedValue.toFixed(0)}%</span>
		</div>
	{/if}

	<div class="w-full h-3 bg-space-600 rounded-full overflow-hidden">
		<div
			class="h-full rounded-full bg-gradient-to-r from-cosmic-blue to-cosmic-cyan transition-all duration-500"
			style="width: {clampedValue}%"
		></div>
	</div>
</div>
