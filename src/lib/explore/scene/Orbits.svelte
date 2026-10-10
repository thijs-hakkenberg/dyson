<script lang="ts">
	import { T } from '@threlte/core';
	import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial } from 'three';
	import { PLANET_IDS, sampleOrbit } from '../core/ephemeris';
	import { PLANET_COLORS } from '../core/theme';
	import { explorer } from '../core/state.svelte';

	// Orbital elements drift slowly; resample once per decade of scrubbed time.
	const epoch = $derived(Math.round(explorer.year / 10) * 10);

	const lines = PLANET_IDS.map((id) => {
		const geom = new BufferGeometry();
		geom.setAttribute('position', new BufferAttribute(sampleOrbit(id, 2030), 3));
		const mat = new LineBasicMaterial({ color: PLANET_COLORS[id], transparent: true, opacity: 0.28 });
		return { id, line: new Line(geom, mat) };
	});

	$effect(() => {
		for (const { id, line } of lines) {
			const attr = line.geometry.getAttribute('position') as BufferAttribute;
			attr.copyArray(sampleOrbit(id, epoch));
			attr.needsUpdate = true;
		}
	});
</script>

{#each lines as l (l.id)}
	<T is={l.line} />
{/each}
