<script lang="ts">
	import MembraneSimulator from '$lib/components/simulators/membrane-dynamics/MembraneSimulator.svelte';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.title} - Project Dyson</title>
	<meta name="description" content={data.description} />
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<nav class="mb-8">
		<ol class="flex items-center gap-2 text-sm flex-wrap">
			<li><a href="/questions" class="text-star-dim hover:text-cosmic-cyan">Questions</a></li>
			<li class="text-star-faint">/</li>
			<li><a href="/questions/{data.questionSlug}" class="text-star-dim hover:text-cosmic-cyan">Large-Scale Membrane Deployment Dynamics</a></li>
			<li class="text-star-faint">/</li>
			<li class="text-star-white">Simulator</li>
		</ol>
	</nav>

	<div class="mb-8">
		<a href="/questions/{data.questionSlug}" class="inline-flex items-center gap-2 text-cosmic-cyan hover:underline">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
			</svg>
			Back to Research Question
		</a>
	</div>

	<MembraneSimulator />

	<div class="mt-12 text-center">
		<p class="text-star-dim mb-4">
			This simulator investigates <a href="/questions/{data.questionSlug}" class="text-cosmic-cyan hover:underline">RQ-1-7: Large-scale membrane deployment dynamics</a>
		</p>
		<a href="/plan/phase-1/bom/pv-blanket-arrays" class="text-sm text-star-faint hover:text-cosmic-cyan transition-colors">View PV Blanket Arrays BOM Item</a>
	</div>
</div>
