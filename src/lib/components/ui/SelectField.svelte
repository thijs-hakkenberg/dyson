<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		value?: string;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		class?: string;
		onchange?: (e: Event) => void;
		children: Snippet;
	}

	let {
		value = $bindable(''),
		size = 'md',
		disabled = false,
		class: className = '',
		onchange,
		children
	}: Props = $props();

	const sizeClasses = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-2 text-sm',
		lg: 'px-4 py-3 text-base'
	};
</script>

<select
	bind:value
	{disabled}
	{onchange}
	class="w-full bg-space-700 border border-space-500 rounded-lg text-star-white focus:outline-none focus:border-cosmic-cyan disabled:opacity-50 disabled:cursor-not-allowed {sizeClasses[size]} {className}"
>
	{@render children()}
</select>
