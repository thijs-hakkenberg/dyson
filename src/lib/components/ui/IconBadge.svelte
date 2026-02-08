<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		size?: 'sm' | 'md' | 'lg';
		color?: 'cosmic-blue' | 'cosmic-purple' | 'cosmic-cyan' | 'sun-gold' | 'status-success' | 'status-warning' | 'status-error' | 'status-info' | 'gradient';
		class?: string;
		children: Snippet;
	}

	let { size = 'md', color = 'cosmic-blue', class: className = '', children }: Props = $props();

	const sizeClasses = {
		sm: 'w-8 h-8',
		md: 'w-12 h-12',
		lg: 'w-16 h-16'
	};

	const colorClasses = {
		'cosmic-blue': 'bg-cosmic-blue/20',
		'cosmic-purple': 'bg-cosmic-purple/20',
		'cosmic-cyan': 'bg-cosmic-cyan/20',
		'sun-gold': 'bg-sun-gold/20',
		'status-success': 'bg-status-success/20',
		'status-warning': 'bg-status-warning/20',
		'status-error': 'bg-status-error/20',
		'status-info': 'bg-status-info/20',
		gradient: 'bg-gradient-to-br from-cosmic-blue to-cosmic-purple'
	};
</script>

<div
	class="rounded-full flex items-center justify-center {sizeClasses[size]} {colorClasses[color]} {className}"
>
	{@render children()}
</div>
