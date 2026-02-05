<script lang="ts">
	import type { QuestionStatus } from '$lib/types/organizations';

	interface Props {
		status: QuestionStatus;
		size?: 'sm' | 'md';
	}

	let { status, size = 'md' }: Props = $props();

	const statusConfig: Record<QuestionStatus, { label: string; color: string; icon: string }> = {
		draft: {
			label: 'Draft',
			color: 'bg-space-600 text-star-faint',
			icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
		},
		sent: {
			label: 'Sent',
			color: 'bg-blue-500/20 text-blue-400',
			icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
		},
		'awaiting-response': {
			label: 'Awaiting',
			color: 'bg-yellow-500/20 text-yellow-400',
			icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		responded: {
			label: 'Responded',
			color: 'bg-green-500/20 text-green-400',
			icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		closed: {
			label: 'Closed',
			color: 'bg-space-500 text-star-dim',
			icon: 'M5 13l4 4L19 7'
		}
	};

	const config = statusConfig[status];
	const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';
	const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
</script>

<span class="inline-flex items-center gap-1.5 rounded {config.color} {sizeClasses}">
	<svg class={iconSize} fill="none" stroke="currentColor" viewBox="0 0 24 24">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={config.icon} />
	</svg>
	{config.label}
</span>
