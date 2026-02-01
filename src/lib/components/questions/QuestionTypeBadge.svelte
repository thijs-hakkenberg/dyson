<script lang="ts">
	import type { QuestionType } from '$lib/types/entities';

	interface Props {
		type: QuestionType;
		size?: 'sm' | 'md' | 'lg';
	}

	let { type, size = 'md' }: Props = $props();

	const typeConfig: Record<QuestionType, { label: string; colors: string; icon: string }> = {
		'meta-research': {
			label: 'Research',
			colors: 'bg-blue-500/20 text-blue-400',
			icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
		},
		experimentation: {
			label: 'Experiment',
			colors: 'bg-green-500/20 text-green-400',
			icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
		},
		simulation: {
			label: 'Simulation',
			colors: 'bg-purple-500/20 text-purple-400',
			icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
		},
		'engineering-decision': {
			label: 'Decision',
			colors: 'bg-sun-gold/20 text-sun-gold',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
		},
		discussion: {
			label: 'Discussion',
			colors: 'bg-cosmic-cyan/20 text-cosmic-cyan',
			icon: 'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z'
		}
	};

	const sizeClasses = {
		sm: 'px-1.5 py-0.5 text-xs gap-1',
		md: 'px-2 py-1 text-xs gap-1.5',
		lg: 'px-3 py-1.5 text-sm gap-2'
	};

	const iconSizes = {
		sm: 'w-3 h-3',
		md: 'w-3.5 h-3.5',
		lg: 'w-4 h-4'
	};

	const config = $derived(typeConfig[type]);
</script>

<span class="inline-flex items-center rounded {sizeClasses[size]} {config.colors}">
	<svg
		class="{iconSizes[size]} flex-shrink-0"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={config.icon} />
	</svg>
	<span>{config.label}</span>
</span>
