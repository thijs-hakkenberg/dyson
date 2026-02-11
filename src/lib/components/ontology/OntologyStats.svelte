<script lang="ts">
	import type { OntologyStats } from '$lib/types/ontology';

	interface Props {
		stats: OntologyStats;
	}

	let { stats }: Props = $props();
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
	<div class="card-glow p-4 text-center">
		<div class="text-2xl font-bold text-gradient">{stats.domainCount}</div>
		<div class="text-xs text-star-dim mt-1">Domains</div>
	</div>
	<div class="card-glow p-4 text-center">
		<div class="text-2xl font-bold text-cosmic-cyan">{stats.topicCount}</div>
		<div class="text-xs text-star-dim mt-1">Topics</div>
	</div>
	<div class="card-glow p-4 text-center">
		<div class="text-2xl font-bold text-green-400">{stats.mappedArtifactCount}</div>
		<div class="text-xs text-star-dim mt-1">Linked Artifacts</div>
	</div>
	<div class="card-glow p-4 text-center">
		<div class="text-2xl font-bold {stats.unmappedTagCount > 0 ? 'text-sun-gold' : 'text-green-400'}">{stats.unmappedTagCount}</div>
		<div class="text-xs text-star-dim mt-1">Unmapped Tags</div>
	</div>
</div>
