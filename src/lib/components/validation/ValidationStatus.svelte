<script lang="ts">
	import {
		validationStatusLabels,
		validationStatusColors,
		type ValidationStatus
	} from '$lib/types/validation';

	interface Props {
		status: ValidationStatus;
		size?: 'sm' | 'md' | 'lg';
		showIcon?: boolean;
		class?: string;
	}

	let { status, size = 'md', showIcon = true, class: className = '' }: Props = $props();

	const sizeClasses = {
		sm: 'px-1.5 py-0.5 text-xs',
		md: 'px-2 py-1 text-xs',
		lg: 'px-3 py-1.5 text-sm'
	};

	const iconSizes = {
		sm: 'w-3 h-3',
		md: 'w-3.5 h-3.5',
		lg: 'w-4 h-4'
	};

	// Status-specific icons
	const statusIcons: Record<ValidationStatus, string> = {
		unvalidated: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		validated: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		'partially-validated': 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		refuted: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
		outdated: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
	};
</script>

<span
	class="inline-flex items-center gap-1.5 rounded font-medium {sizeClasses[size]} {validationStatusColors[status]} {className}"
>
	{#if showIcon}
		<svg class={iconSizes[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={statusIcons[status]} />
		</svg>
	{/if}
	{validationStatusLabels[status]}
</span>
