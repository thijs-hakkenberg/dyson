<script lang="ts">
	import type { CostConfidenceLevel } from '$lib/types';

	interface Props {
		confidence: CostConfidenceLevel;
		size?: 'sm' | 'md';
	}

	let { confidence, size = 'sm' }: Props = $props();

	const colors = {
		low: 'bg-red-500/20 text-red-400 border-red-500/30',
		medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
		high: 'bg-green-500/20 text-green-400 border-green-500/30'
	};

	const labels = {
		low: 'Low Confidence',
		medium: 'Medium Confidence',
		high: 'High Confidence'
	};

	const sizes = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-3 py-1 text-sm'
	};
</script>

<span
	class="inline-flex items-center rounded-full border font-medium {colors[confidence]} {sizes[size]}"
	title={labels[confidence]}
>
	{#if confidence === 'low'}
		<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
			<path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
		</svg>
	{:else if confidence === 'medium'}
		<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
			<path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
		</svg>
	{:else}
		<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
			<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
		</svg>
	{/if}
	{confidence.charAt(0).toUpperCase() + confidence.slice(1)}
</span>
