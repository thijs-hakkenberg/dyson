<script lang="ts">
	import type { ResolutionStatus } from '$lib/types/entities';

	interface Props {
		status: ResolutionStatus | undefined;
		size?: 'sm' | 'md' | 'lg';
		showIcon?: boolean;
	}

	let { status, size = 'md', showIcon = true }: Props = $props();

	const effectiveStatus = $derived(status || 'open');

	const statusConfig: Record<
		ResolutionStatus,
		{ label: string; bgColor: string; textColor: string; borderColor: string; icon: string }
	> = {
		open: {
			label: 'Open',
			bgColor: 'bg-purple-500/20',
			textColor: 'text-purple-400',
			borderColor: 'border-purple-500/30',
			icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		resolved: {
			label: 'Resolved',
			bgColor: 'bg-green-500/20',
			textColor: 'text-green-400',
			borderColor: 'border-green-500/30',
			icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		'partially-resolved': {
			label: 'Partially Resolved',
			bgColor: 'bg-amber-500/20',
			textColor: 'text-amber-400',
			borderColor: 'border-amber-500/30',
			icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		superseded: {
			label: 'Superseded',
			bgColor: 'bg-space-600',
			textColor: 'text-star-dim',
			borderColor: 'border-space-500',
			icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
		}
	};

	const config = $derived(statusConfig[effectiveStatus]);

	const sizeClasses = {
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-2.5 py-1 text-sm',
		lg: 'px-3 py-1.5 text-base'
	};

	const iconSizes = {
		sm: 'w-3 h-3',
		md: 'w-4 h-4',
		lg: 'w-5 h-5'
	};
</script>

<span
	class="inline-flex items-center gap-1.5 rounded border {config.bgColor} {config.textColor} {config.borderColor} {sizeClasses[size]}"
>
	{#if showIcon}
		<svg class={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={config.icon} />
		</svg>
	{/if}
	{config.label}
</span>
