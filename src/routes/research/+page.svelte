<script lang="ts">
	import ArxivSearch from '$lib/components/research/ArxivSearch.svelte';
</script>

<svelte:head>
	<title>Research Hub - Project Dyson</title>
	<meta name="description" content="Browse and search arXiv papers relevant to Dyson swarm construction, space engineering, and solar energy harvesting." />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl font-bold text-star-white mb-4">
			Research Hub
		</h1>
		<p class="text-lg text-star-dim max-w-3xl">
			Explore scientific papers from arXiv related to Dyson swarm technology, space-based solar power,
			asteroid mining, and other critical research areas. Stay up-to-date with the latest
			developments in space engineering and astrophysics.
		</p>
	</div>

	<!-- Research Focus Areas -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
		<div class="card-glow p-5">
			<div class="w-10 h-10 rounded-lg bg-sun-gold/20 flex items-center justify-center mb-3">
				<svg class="w-5 h-5 text-sun-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
			</div>
			<h3 class="font-semibold text-star-white mb-1">Solar Energy</h3>
			<p class="text-sm text-star-dim">Harvesting, transmission, and storage technologies</p>
		</div>

		<div class="card-glow p-5">
			<div class="w-10 h-10 rounded-lg bg-cosmic-purple/20 flex items-center justify-center mb-3">
				<svg class="w-5 h-5 text-cosmic-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
				</svg>
			</div>
			<h3 class="font-semibold text-star-white mb-1">Materials Science</h3>
			<p class="text-sm text-star-dim">Advanced materials for space construction</p>
		</div>

		<div class="card-glow p-5">
			<div class="w-10 h-10 rounded-lg bg-cosmic-cyan/20 flex items-center justify-center mb-3">
				<svg class="w-5 h-5 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
				</svg>
			</div>
			<h3 class="font-semibold text-star-white mb-1">Space Manufacturing</h3>
			<p class="text-sm text-star-dim">In-situ resource utilization and production</p>
		</div>

		<div class="card-glow p-5">
			<div class="w-10 h-10 rounded-lg bg-cosmic-blue/20 flex items-center justify-center mb-3">
				<svg class="w-5 h-5 text-cosmic-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			</div>
			<h3 class="font-semibold text-star-white mb-1">Orbital Mechanics</h3>
			<p class="text-sm text-star-dim">Swarm coordination and station-keeping</p>
		</div>
	</div>

	<!-- arXiv Search -->
	<ArxivSearch />
</div>
