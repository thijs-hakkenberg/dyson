<script lang="ts">
	import OrbitalTradeSimulator from '$lib/components/simulators/orbital-trade/OrbitalTradeSimulator.svelte';

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
					Orbital Location Trade Analysis
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
	<OrbitalTradeSimulator />

	<!-- Context Links -->
	<div class="mt-12 text-center space-y-4">
		<p class="text-star-dim">
			This simulator addresses research questions
			<a href="/questions/{data.questionSlug}" class="text-cosmic-cyan hover:underline">
				RQ-1-19: Optimal orbital location for swarm construction
			</a>
			and
			<a href="/questions/standard-orbit-depot-selection" class="text-cosmic-cyan hover:underline">
				RQ-1-36: Depot orbit selection criteria
			</a>
		</p>
		<div class="flex justify-center gap-6">
			<a
				href="/plan/phase-1"
				class="text-sm text-star-faint hover:text-cosmic-cyan transition-colors"
			>
				View Phase 1 Plan
			</a>
			<a
				href="/questions"
				class="text-sm text-star-faint hover:text-cosmic-cyan transition-colors"
			>
				Browse All Questions
			</a>
		</div>
	</div>
</div>
