<script lang="ts">
	/**
	 * Risk heat (screen-space halos sized and coloured by the heuristic score)
	 * and validation beacons (vertical beams: colour = status, height = latest
	 * confidence) at each BOM item's anchor.
	 */
	import { T } from '@threlte/core';
	import { AdditiveBlending, CanvasTexture, SRGBColorSpace } from 'three';
	import Tracked from '../Tracked.svelte';
	import Marker from '../Marker.svelte';
	import { ENTITIES } from '../../core/registry';
	import { explorer } from '../../core/state.svelte';
	import { riskStore } from '../../core/riskstore.svelte';
	import { VALIDATION_COLORS, claimConfidence, riskColor, riskFor } from '../../core/risk';

	const items = ENTITIES.filter((e) => e.kind === 'bom' && e.bom && e.placement?.anchor).map((e) => ({
		e,
		r: riskFor(e.bom!)
	}));

	const halo = (() => {
		const c = document.createElement('canvas');
		c.width = c.height = 128;
		const ctx = c.getContext('2d')!;
		const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
		g.addColorStop(0, 'rgba(255,255,255,0.9)');
		g.addColorStop(0.3, 'rgba(255,255,255,0.35)');
		g.addColorStop(1, 'rgba(255,255,255,0)');
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 128, 128);
		const t = new CanvasTexture(c);
		t.colorSpace = SRGBColorSpace;
		return t;
	})();

	const claimsFor = (bomId: string) => riskStore.claims.filter((c) => c.bomItemId === bomId);
	// Beam height in AU scaled with the view so it stays readable at any zoom
	const beamUnit = $derived(explorer.cameraDistance * 0.06);
</script>

{#each items as { e, r } (e.id)}
	<Tracked position={e.position}>
		<T.Sprite scale={[0.02 + 0.06 * r.score, 0.02 + 0.06 * r.score, 1]}>
			<T.SpriteMaterial
				map={halo}
				color={r.assessed ? riskColor(r.score) : '#94a3b8'}
				transparent
				opacity={r.assessed ? 0.85 : 0.35}
				blending={AdditiveBlending}
				depthWrite={false}
				sizeAttenuation={false}
			/>
		</T.Sprite>
		{#each claimsFor(e.id) as c, i (c.id)}
			{@const h = beamUnit * (0.2 + claimConfidence(c) / 100)}
			<T.Mesh position={[i * beamUnit * 0.08, h / 2, 0]}>
				<T.CylinderGeometry args={[beamUnit * 0.012, beamUnit * 0.012, h, 6]} />
				<T.MeshBasicMaterial color={VALIDATION_COLORS[c.status] ?? '#94a3b8'} transparent opacity={0.9} />
			</T.Mesh>
		{/each}
		{#if r.score > 0.45 || explorer.selectedId === e.id}
			<Marker id={e.id} label={e.name} sub="risk {Math.round(r.score * 100)}{r.assessed ? '' : ' · unassessed'}" color={riskColor(r.score)} minor />
		{/if}
	</Tracked>
{/each}
