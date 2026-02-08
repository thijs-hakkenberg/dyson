<script lang="ts">
	interface Props {
		value?: string;
		placeholder?: string;
		type?: 'text' | 'email' | 'password' | 'number' | 'search';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		class?: string;
		onchange?: (e: Event) => void;
		oninput?: (e: Event) => void;
	}

	let {
		value = $bindable(''),
		placeholder = '',
		type = 'text',
		size = 'md',
		disabled = false,
		class: className = '',
		onchange,
		oninput
	}: Props = $props();

	const sizeClasses = {
		sm: 'px-2 py-1 text-xs',
		md: 'px-3 py-2 text-sm',
		lg: 'px-4 py-3 text-base'
	};
</script>

<input
	{type}
	bind:value
	{placeholder}
	{disabled}
	{onchange}
	{oninput}
	class="w-full bg-space-700 border border-space-500 rounded-lg text-star-white focus:outline-none focus:border-cosmic-cyan disabled:opacity-50 disabled:cursor-not-allowed {sizeClasses[size]} {className}"
/>
