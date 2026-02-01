<script lang="ts">
	import type { Priority } from '$lib/types/entities';

	interface Props {
		priority: Priority;
		size?: 'sm' | 'md' | 'lg';
		showLabel?: boolean;
	}

	let { priority, size = 'md', showLabel = true }: Props = $props();

	const priorityConfig: Record<Priority, { label: string; colors: string; dotColor: string }> = {
		critical: {
			label: 'Critical',
			colors: 'bg-red-500/20 text-red-400',
			dotColor: 'bg-red-400'
		},
		high: {
			label: 'High',
			colors: 'bg-orange-500/20 text-orange-400',
			dotColor: 'bg-orange-400'
		},
		medium: {
			label: 'Medium',
			colors: 'bg-sun-gold/20 text-sun-gold',
			dotColor: 'bg-sun-gold'
		},
		low: {
			label: 'Low',
			colors: 'bg-space-600 text-star-dim',
			dotColor: 'bg-star-dim'
		}
	};

	const sizeClasses = {
		sm: 'px-1.5 py-0.5 text-xs gap-1',
		md: 'px-2 py-1 text-xs gap-1.5',
		lg: 'px-3 py-1.5 text-sm gap-2'
	};

	const dotSizes = {
		sm: 'w-1.5 h-1.5',
		md: 'w-2 h-2',
		lg: 'w-2.5 h-2.5'
	};

	const config = $derived(priorityConfig[priority]);
</script>

<span class="inline-flex items-center rounded {sizeClasses[size]} {config.colors}">
	<span class="{dotSizes[size]} rounded-full {config.dotColor}"></span>
	{#if showLabel}
		<span>{config.label}</span>
	{/if}
</span>
