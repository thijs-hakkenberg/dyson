<script lang="ts">
	import { getPhases, formatCurrency, getTotalProjectCost } from '$lib/services/content';
	import PhaseCard from '$lib/components/phases/PhaseCard.svelte';
	import BlogCard from '$lib/components/blog/BlogCard.svelte';

	let { data } = $props();

	const phases = getPhases();
	const recentPosts = data.recentPosts;
	const totalCost = getTotalProjectCost();
</script>

<svelte:head>
	<title>Project Dyson - Building Humanity's Future Among the Stars</title>
	<meta name="description" content="Project Dyson is a non-profit organization dedicated to realizing a Dyson swarm through detailed planning, research aggregation, and multi-LLM collaboration." />
</svelte:head>

<!-- Hero Section -->
<section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
	<!-- Animated Sun Background -->
	<div class="absolute inset-0 flex items-center justify-center">
		<div class="w-[600px] h-[600px] rounded-full bg-gradient-radial from-sun-gold/20 via-sun-orange/10 to-transparent blur-3xl animate-pulse"></div>
	</div>

	<div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<!-- Logo Animation -->
		<div class="mb-8 inline-flex">
			<div class="w-24 h-24 rounded-full bg-gradient-to-br from-sun-gold to-sun-orange flex items-center justify-center solar-glow">
				<span class="text-space-900 font-bold text-4xl">D</span>
			</div>
		</div>

		<h1 class="text-5xl md:text-7xl font-bold text-star-white mb-6">
			Project
			<span class="text-gradient">Dyson</span>
		</h1>

		<p class="text-xl md:text-2xl text-star-dim mb-8 max-w-3xl mx-auto">
			Building humanity's future among the stars through collaborative planning,
			research aggregation, and AI-assisted engineering analysis.
		</p>

		<div class="flex flex-wrap justify-center gap-4 mb-12">
			<a href="/plan" class="btn-primary text-lg px-8 py-4">
				Explore the Plan
			</a>
			<a href="/about" class="btn-secondary text-lg px-8 py-4">
				Learn More
			</a>
		</div>

		<!-- Stats -->
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
			<div class="card-glow p-4">
				<p class="text-3xl font-bold text-sun-gold">{phases.length}</p>
				<p class="text-sm text-star-dim">Phases Planned</p>
			</div>
			<div class="card-glow p-4">
				<p class="text-3xl font-bold text-cosmic-cyan">{formatCurrency(totalCost)}</p>
				<p class="text-sm text-star-dim">Total Estimated</p>
			</div>
			<div class="card-glow p-4">
				<p class="text-3xl font-bold text-cosmic-purple">3</p>
				<p class="text-sm text-star-dim">LLM Models</p>
			</div>
			<div class="card-glow p-4">
				<p class="text-3xl font-bold text-star-white">150+</p>
				<p class="text-sm text-star-dim">Research Papers</p>
			</div>
		</div>
	</div>

	<!-- Scroll Indicator -->
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<svg class="w-6 h-6 text-star-faint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
		</svg>
	</div>
</section>

<!-- What is a Dyson Swarm -->
<section class="py-24 bg-space-800/50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div>
				<h2 class="text-3xl md:text-4xl font-bold text-star-white mb-6">
					What is a Dyson Swarm?
				</h2>
				<div class="space-y-4 text-star-dim">
					<p>
						A Dyson swarm is a collection of millions of solar-powered satellites orbiting a star,
						capturing a significant portion of its energy output. Unlike a solid Dyson sphere,
						a swarm can be built incrementally over time.
					</p>
					<p>
						The concept was proposed by physicist Freeman Dyson in 1960 as a way for advanced
						civilizations to meet their energy needs. Today, we're working to make it a reality.
					</p>
					<p>
						With current and near-future technology, we believe a Dyson swarm is achievable—given
						proper planning, resource allocation, and international collaboration.
					</p>
				</div>
				<a href="/about" class="inline-flex items-center gap-2 mt-6 text-cosmic-cyan hover:underline">
					Learn more about our approach
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
			<div class="relative">
				<div class="aspect-square rounded-full bg-gradient-to-br from-sun-gold/30 to-transparent p-8">
					<div class="w-full h-full rounded-full border-2 border-dashed border-cosmic-blue/30 relative">
						<!-- Orbiting elements -->
						<div class="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2">
							<div class="w-16 h-16 rounded-full bg-sun-gold/80 solar-glow"></div>
						</div>
						<div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cosmic-cyan rounded-sm"></div>
						<div class="absolute top-1/4 right-0 translate-x-1/2 w-3 h-3 bg-cosmic-blue rounded-sm"></div>
						<div class="absolute bottom-1/4 right-1/4 w-2 h-2 bg-cosmic-purple rounded-sm"></div>
						<div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-cosmic-cyan rounded-sm"></div>
						<div class="absolute top-1/4 left-0 -translate-x-1/2 w-2 h-2 bg-cosmic-blue rounded-sm"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Phase Roadmap -->
<section class="py-24">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold text-star-white mb-4">
				Phased Approach
			</h2>
			<p class="text-lg text-star-dim max-w-2xl mx-auto">
				Building a Dyson swarm requires careful, incremental progress. Our plan breaks down
				this enormous challenge into achievable phases.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			{#each phases as phase}
				<PhaseCard {phase} compact />
			{/each}
		</div>

		<div class="text-center">
			<a href="/plan" class="btn-primary">
				View Full Plan
			</a>
		</div>
	</div>
</section>

<!-- Multi-LLM Consensus Section -->
<section class="py-24 bg-space-800/50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid md:grid-cols-2 gap-12 items-center">
			<div class="order-2 md:order-1">
				<div class="grid grid-cols-3 gap-4">
					<div class="card-glow p-6 text-center">
						<div class="w-12 h-12 rounded-full bg-blue-500/20 mx-auto mb-3 flex items-center justify-center">
							<span class="text-blue-400 font-bold">G</span>
						</div>
						<p class="text-sm text-star-white font-medium">Gemini 3 Pro</p>
					</div>
					<div class="card-glow p-6 text-center">
						<div class="w-12 h-12 rounded-full bg-green-500/20 mx-auto mb-3 flex items-center justify-center">
							<span class="text-green-400 font-bold">O</span>
						</div>
						<p class="text-sm text-star-white font-medium">GPT-5.2</p>
					</div>
					<div class="card-glow p-6 text-center">
						<div class="w-12 h-12 rounded-full bg-orange-500/20 mx-auto mb-3 flex items-center justify-center">
							<span class="text-orange-400 font-bold">C</span>
						</div>
						<p class="text-sm text-star-white font-medium">Claude Opus</p>
					</div>
				</div>
			</div>
			<div class="order-1 md:order-2">
				<h2 class="text-3xl md:text-4xl font-bold text-star-white mb-6">
					Multi-LLM Consensus
				</h2>
				<div class="space-y-4 text-star-dim">
					<p>
						We leverage multiple frontier AI models to analyze complex engineering challenges,
						validate our estimates, and explore diverse perspectives on difficult problems.
					</p>
					<p>
						Each phase includes curated analysis from Gemini 3 Pro, GPT-5.2, and Claude Opus 4.5,
						with cross-reviews highlighting areas of consensus and divergent perspectives.
					</p>
				</div>
				<a href="/plan/phase-0" class="inline-flex items-center gap-2 mt-6 text-cosmic-cyan hover:underline">
					View Phase 0 LLM Analysis
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
					</svg>
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Research Hub -->
<section class="py-24">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-12">
			<h2 class="text-3xl md:text-4xl font-bold text-star-white mb-4">
				Research-Driven Development
			</h2>
			<p class="text-lg text-star-dim max-w-2xl mx-auto">
				Our plans are grounded in peer-reviewed research. Browse papers from arXiv and see
				how they inform our engineering decisions.
			</p>
		</div>

		<div class="grid md:grid-cols-4 gap-4 mb-8">
			<div class="card-glow p-6 text-center">
				<svg class="w-8 h-8 mx-auto mb-3 text-sun-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
				</svg>
				<h3 class="font-semibold text-star-white mb-1">Solar Physics</h3>
				<p class="text-xs text-star-dim">Energy harvesting & transmission</p>
			</div>
			<div class="card-glow p-6 text-center">
				<svg class="w-8 h-8 mx-auto mb-3 text-cosmic-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
				</svg>
				<h3 class="font-semibold text-star-white mb-1">Materials Science</h3>
				<p class="text-xs text-star-dim">Lightweight structures</p>
			</div>
			<div class="card-glow p-6 text-center">
				<svg class="w-8 h-8 mx-auto mb-3 text-cosmic-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
				<h3 class="font-semibold text-star-white mb-1">Orbital Mechanics</h3>
				<p class="text-xs text-star-dim">Swarm coordination</p>
			</div>
			<div class="card-glow p-6 text-center">
				<svg class="w-8 h-8 mx-auto mb-3 text-cosmic-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
				</svg>
				<h3 class="font-semibold text-star-white mb-1">Space Mining</h3>
				<p class="text-xs text-star-dim">Resource extraction</p>
			</div>
		</div>

		<div class="text-center">
			<a href="/research" class="btn-secondary">
				Browse Research Hub
			</a>
		</div>
	</div>
</section>

<!-- Latest Blog Posts -->
<section class="py-24 bg-space-800/50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-end justify-between mb-8">
			<div>
				<h2 class="text-3xl md:text-4xl font-bold text-star-white mb-2">
					Latest Updates
				</h2>
				<p class="text-star-dim">Technical articles and project news</p>
			</div>
			<a href="/blog" class="text-cosmic-cyan hover:underline hidden md:block">
				View all posts
			</a>
		</div>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			{#each recentPosts as post}
				<BlogCard {post} />
			{/each}
		</div>

		<div class="text-center md:hidden">
			<a href="/blog" class="btn-secondary">
				View All Posts
			</a>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-24">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="card-glow p-12 bg-gradient-to-br from-space-700 to-space-800">
			<h2 class="text-3xl md:text-4xl font-bold text-star-white mb-4">
				Join the Mission
			</h2>
			<p class="text-lg text-star-dim mb-8 max-w-2xl mx-auto">
				Project Dyson is entirely volunteer-driven. We welcome researchers, engineers,
				writers, and enthusiasts to contribute to humanity's most ambitious project.
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<a href="/about" class="btn-primary">
					Get Involved
				</a>
				<a href="/funding" class="btn-secondary">
					Support Us
				</a>
			</div>
		</div>
	</div>
</section>
