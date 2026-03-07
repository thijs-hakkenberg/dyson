<script lang="ts">
	import { page } from '$app/stores';

	let menuOpen = $state(false);
	let scrolled = $state(false);

	function toggleMenu() {
		menuOpen = !menuOpen;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = menuOpen ? 'hidden' : '';
		}
	}

	function closeMenu() {
		menuOpen = false;
		if (typeof document !== 'undefined') {
			document.body.style.overflow = '';
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && menuOpen) closeMenu();
	}

	function handleScroll() {
		scrolled = window.scrollY > 60;
	}

	const menuGroups = [
		{
			label: 'Explore',
			links: [
				{ label: 'The Plan', href: '/plan' },
				{ label: 'Research Hub', href: '/research' },
				{ label: 'Analysis', href: '/analysis/feasibility' },
				{ label: 'Open Questions', href: '/questions' },
				{ label: 'Topics', href: '/topics' }
			]
		},
		{
			label: 'Community',
			links: [
				{ label: 'About', href: '/about' },
				{ label: 'Organizations', href: '/organizations' },
				{ label: 'Blog', href: '/blog' },
				{ label: 'Changelog', href: '/changelog' }
			]
		},
		{
			label: 'Contribute',
			links: [
				{ label: 'GitHub', href: 'https://github.com/thijs-hakkenberg/dyson' }
			]
		}
	];
</script>

<svelte:window onscroll={handleScroll} onkeydown={handleKeydown} />

<nav
	class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center transition-all duration-300"
	class:scrolled
	style="padding: 1.5rem 2.5rem;"
>
	<a href="/" class="logo" onclick={closeMenu}>
		<div class="logo-mark">D</div>
		<span>PROJECT DYSON</span>
	</a>
	<div class="nav-right">
		<span class="nav-phase" class:visible={scrolled}>Phase 0 Active</span>
		<button class="menu-btn" onclick={toggleMenu}>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
				<line x1="2" y1="4" x2="14" y2="4"/>
				<line x1="2" y1="8" x2="14" y2="8"/>
				<line x1="2" y1="12" x2="14" y2="12"/>
			</svg>
			Menu
		</button>
	</div>
</nav>

<!-- Menu Overlay -->
<div class="menu-overlay" class:open={menuOpen}>
	<button class="menu-close" onclick={closeMenu}>&times;</button>
	<div class="menu-grid">
		{#each menuGroups as group}
			<div class="menu-group">
				<h3>{group.label}</h3>
				{#each group.links as link}
					<a
						href={link.href}
						onclick={closeMenu}
						target={link.href.startsWith('http') ? '_blank' : undefined}
						rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
					>
						{link.label}
					</a>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	nav {
		background: transparent;
	}

	nav.scrolled {
		background: rgba(5, 7, 15, 0.85);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
	}

	.logo {
		font-family: 'Space Grotesk', sans-serif;
		font-weight: 700;
		font-size: 1.25rem;
		letter-spacing: 0.05em;
		color: var(--color-star-white);
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-decoration: none;
	}

	.logo-mark {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-amber));
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 1rem;
		color: var(--color-space-900);
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.nav-phase {
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--color-accent-gold);
		opacity: 0;
		transition: opacity 0.3s;
	}

	.nav-phase.visible {
		opacity: 1;
	}

	.menu-btn {
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.06);
		color: var(--color-star-white);
		padding: 0.5rem 1rem;
		border-radius: 6px;
		font-family: 'Inter', sans-serif;
		font-size: 0.85rem;
		cursor: pointer;
		transition: all 0.2s;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.menu-btn:hover {
		border-color: var(--color-accent-gold);
		color: var(--color-accent-gold);
	}

	/* Full-screen Menu Overlay */
	.menu-overlay {
		position: fixed;
		inset: 0;
		background: rgba(5, 7, 15, 0.97);
		backdrop-filter: blur(30px);
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.4s;
	}

	.menu-overlay.open {
		opacity: 1;
		pointer-events: all;
	}

	.menu-close {
		position: absolute;
		top: 1.5rem;
		right: 2.5rem;
		background: none;
		border: none;
		color: var(--color-star-dim);
		font-size: 2rem;
		cursor: pointer;
		transition: color 0.2s;
		font-family: 'Inter', sans-serif;
	}

	.menu-close:hover {
		color: var(--color-star-white);
	}

	.menu-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 3rem 5rem;
		max-width: 800px;
	}

	.menu-group h3 {
		font-family: 'Space Grotesk', sans-serif;
		font-size: 0.7rem;
		font-weight: 600;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--color-star-faint);
		margin-bottom: 1.25rem;
	}

	.menu-group a {
		display: block;
		color: var(--color-star-dim);
		text-decoration: none;
		font-size: 1.1rem;
		padding: 0.4rem 0;
		transition: color 0.2s;
	}

	.menu-group a:hover {
		color: var(--color-accent-gold);
	}

	@media (max-width: 768px) {
		nav {
			padding: 1rem 1.5rem !important;
		}

		.menu-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}
</style>
