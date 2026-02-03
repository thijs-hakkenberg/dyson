<script lang="ts">
	import SwarmDynamicsSimulator from '$lib/components/simulators/swarm-dynamics/SwarmDynamicsSimulator.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title} - Project Dyson</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<!-- Breadcrumb -->
	<nav class="mb-8">
		<ol class="flex items-center gap-2 text-sm flex-wrap">
			<li><a href="/questions" class="text-star-dim hover:text-cosmic-cyan">Questions</a></li>
			<li class="text-star-faint">/</li>
			<li>
				<a href="/questions/{data.questionSlug}" class="text-star-dim hover:text-cosmic-cyan">
					Station-keeping Propellant Budget
				</a>
			</li>
			<li class="text-star-faint">/</li>
			<li class="text-star-white">Simulator</li>
		</ol>
	</nav>

	<!-- Back Link -->
	<div class="mb-8">
		<a
			href="/questions/{data.questionSlug}"
			class="inline-flex items-center gap-2 text-cosmic-cyan hover:underline"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Back to Research Question
		</a>
	</div>

	<!-- Simulator -->
	<SwarmDynamicsSimulator />

	<!-- Context Links -->
	<div class="mt-12 text-center space-y-4">
		<p class="text-star-dim">
			This simulator was built to investigate research questions:
		</p>
		<div class="flex flex-wrap justify-center gap-4">
			<a href="/questions/{data.questionSlug}" class="text-cosmic-cyan hover:underline">
				RQ-1-2: Station-keeping propellant budget
			</a>
			<span class="text-star-faint">|</span>
			<a href="/questions/swarm-collision-probability" class="text-cosmic-cyan hover:underline">
				RQ-1-6: Collision probability
			</a>
			<span class="text-star-faint">|</span>
			<a href="/questions/propulsion-actuation-authority" class="text-cosmic-cyan hover:underline">
				RQ-1-37: Propulsion authority
			</a>
		</div>
		<a
			href="/plan/phase-1/bom/collector-units"
			class="block text-sm text-star-faint hover:text-cosmic-cyan transition-colors"
		>
			View Collector Units BOM Item
		</a>
	</div>
</div>
