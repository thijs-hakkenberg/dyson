<script lang="ts">
	import { T } from '@threlte/core';
	import Tracked from './Tracked.svelte';
	import Marker from './Marker.svelte';
	import { ENTITIES } from '../core/registry';
	import { PLANET_COLORS } from '../core/theme';
	import { explorer } from '../core/state.svelte';
	import { formatDistance } from '../core/units';

	const bodies = ENTITIES.filter((e) => e.kind === 'planet' || e.kind === 'moon');

	// Heliocentric distance shown under each label, refreshed at a low rate
	const coarseYear = $derived(Math.round(explorer.year * 50) / 50);
	const dist = $derived.by(() => {
		const y = coarseYear;
		return Object.fromEntries(
			bodies.map((b) => {
				const p = b.position(y);
				return [b.id, formatDistance(Math.hypot(p[0], p[1], p[2]))];
			})
		);
	});
</script>

{#each bodies as b (b.id)}
	<Tracked position={b.position}>
		<T.Mesh>
			<T.SphereGeometry args={[b.radiusAU, 48, 24]} />
			<T.MeshStandardMaterial color={PLANET_COLORS[b.id]} roughness={0.9} metalness={0} />
		</T.Mesh>
		{#if b.kind !== 'moon' || explorer.cameraDistance < 0.05 || explorer.selectedId === 'moon'}
		<Marker
			id={b.id}
			label={b.name}
			sub={b.kind === 'moon' ? '' : dist[b.id]}
			color={PLANET_COLORS[b.id]}
			minor={b.kind === 'moon'}
		/>
		{/if}
	</Tracked>
{/each}
