<script lang="ts">
	const currentYear = new Date().getFullYear();

	const links = {
		project: [
			{ label: 'About', href: '/about' },
			{ label: 'Plan', href: '/plan' },
			{ label: 'Research', href: '/research' },
			{ label: 'Blog', href: '/blog' }
		],
		resources: [
			{ label: 'Funding', href: '/funding' },
			{ label: 'Documentation', href: '/docs' }
		],
		community: [
			{ label: 'GitHub', href: 'https://github.com/project-dyson', external: true },
			{ label: 'Discord', href: '#', external: true },
			{ label: 'Twitter', href: '#', external: true }
		]
	};
</script>

<footer class="bg-space-800 border-t border-space-600">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<!-- Brand -->
			<div class="md:col-span-1">
				<a href="/" class="flex items-center gap-3 mb-4">
					<div class="w-10 h-10 rounded-full bg-gradient-to-br from-sun-gold to-sun-orange flex items-center justify-center">
						<span class="text-space-900 font-bold text-lg">D</span>
					</div>
					<span class="text-xl font-bold text-star-white">Project Dyson</span>
				</a>
				<p class="text-star-dim text-sm">
					A non-profit organization dedicated to realizing a Dyson swarm through detailed planning, research aggregation, and multi-LLM collaboration.
				</p>
			</div>

			<!-- Project Links -->
			<div>
				<h3 class="text-star-white font-semibold mb-4">Project</h3>
				<ul class="space-y-2">
					{#each links.project as link}
						<li>
							<a href={link.href} class="text-star-dim hover:text-cosmic-cyan text-sm transition-colors">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Resources Links -->
			<div>
				<h3 class="text-star-white font-semibold mb-4">Resources</h3>
				<ul class="space-y-2">
					{#each links.resources as link}
						<li>
							<a href={link.href} class="text-star-dim hover:text-cosmic-cyan text-sm transition-colors">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Community Links -->
			<div>
				<h3 class="text-star-white font-semibold mb-4">Community</h3>
				<ul class="space-y-2">
					{#each links.community as link}
						<li>
							<a
								href={link.href}
								class="text-star-dim hover:text-cosmic-cyan text-sm transition-colors inline-flex items-center gap-1"
								target={link.external ? '_blank' : undefined}
								rel={link.external ? 'noopener noreferrer' : undefined}
							>
								{link.label}
								{#if link.external}
									<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
									</svg>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Bottom Bar -->
		<div class="mt-12 pt-8 border-t border-space-600 flex flex-col md:flex-row items-center justify-between gap-4">
			<p class="text-star-dim text-sm">
				&copy; {currentYear} Project Dyson. Open source under MIT license.
			</p>
			<p class="text-star-faint text-xs">
				Built with Svelte, powered by AI collaboration
			</p>
		</div>
	</div>
</footer>
