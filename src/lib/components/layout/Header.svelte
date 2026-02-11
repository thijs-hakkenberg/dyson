<script lang="ts">
	import { page } from '$app/stores';

	let mobileMenuOpen = $state(false);

	const navItems = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Plan', href: '/plan' },
		{ label: 'Research', href: '/research' },
		{ label: 'Questions', href: '/questions' },
		{ label: 'Topics', href: '/topics' },
		{ label: 'Organizations', href: '/organizations' },
		{ label: 'Blog', href: '/blog' },
		{ label: 'Changelog', href: '/changelog' },
		{ label: 'Funding', href: '/funding' }
	];

	function isActive(href: string, currentPath: string): boolean {
		if (href === '/') return currentPath === '/';
		return currentPath.startsWith(href);
	}
</script>

<header class="fixed top-0 left-0 right-0 z-50 bg-space-900/80 backdrop-blur-md border-b border-space-600">
	<nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-3 group">
				<div class="w-10 h-10 rounded-full bg-gradient-to-br from-sun-gold to-sun-orange flex items-center justify-center solar-glow">
					<span class="text-space-900 font-bold text-lg">D</span>
				</div>
				<span class="text-xl font-bold text-star-white group-hover:text-gradient transition-all">
					Project Dyson
				</span>
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center gap-1">
				{#each navItems as item}
					<a
						href={item.href}
						class="px-4 py-2 rounded-lg text-sm font-medium transition-all
							{isActive(item.href, $page.url.pathname)
								? 'text-star-white bg-space-600'
								: 'text-star-dim hover:text-star-white hover:bg-space-700'}"
					>
						{item.label}
					</a>
				{/each}
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden p-2 rounded-lg text-star-dim hover:text-star-white hover:bg-space-700"
				onclick={() => mobileMenuOpen = !mobileMenuOpen}
				aria-label="Toggle menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					{#if mobileMenuOpen}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					{:else}
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
					{/if}
				</svg>
			</button>
		</div>

		<!-- Mobile Navigation -->
		{#if mobileMenuOpen}
			<div class="md:hidden py-4 border-t border-space-600">
				{#each navItems as item}
					<a
						href={item.href}
						class="block px-4 py-3 rounded-lg text-sm font-medium transition-all
							{isActive(item.href, $page.url.pathname)
								? 'text-star-white bg-space-600'
								: 'text-star-dim hover:text-star-white hover:bg-space-700'}"
						onclick={() => mobileMenuOpen = false}
					>
						{item.label}
					</a>
				{/each}
			</div>
		{/if}
	</nav>
</header>
