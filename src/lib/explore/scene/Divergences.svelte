<script lang="ts">
	/**
	 * Divergent views as ghost geometry: each model's alternative placement is
	 * drawn dashed in the model's colour next to the baseline, never merged.
	 */
	import { T } from '@threlte/core';
	import Ring from './Ring.svelte';
	import Tracked from './Tracked.svelte';
	import Marker from './Marker.svelte';
	import { PLACEMENTS, type Alternative, type ModelName } from '../core/placements';
	import { anchorPosition } from '../core/registry';
	import { phaseInFocus } from '../core/progress';
	import { explorer, type LayerId } from '../core/state.svelte';
	import { MODEL_COLORS, HUD } from '../core/theme';

	const items = PLACEMENTS.filter((p) => p.alternatives.length > 0);

	const visible = $derived(
		items.filter(
			(p) =>
				explorer.layers[p.phaseId as LayerId] &&
				(explorer.selectedId === p.bomId || (explorer.layers.divergence && phaseInFocus(p.phaseId, explorer.year, explorer.selected?.phaseId ?? explorer.selected?.phase?.id)))
		)
	);

	const colorOf = (models: ModelName[]) => (models.length === 1 ? MODEL_COLORS[models[0]] : HUD.ghost);
	const who = (alt: Alternative) => (alt.models.length ? alt.models.join(' + ') : 'Alt');
	const ang = (bomId: string, k: number) => {
		let h = 0;
		for (const ch of bomId) h = (h * 17 + ch.charCodeAt(0)) >>> 0;
		return ((h % 360) * Math.PI) / 180 + 0.9 * (k + 1);
	};
</script>

{#each visible as p (p.bomId)}
	{#each p.alternatives as alt, k (k)}
		{@const c = colorOf(alt.models)}
		{@const a = alt.anchor}
		{#if a.kind === 'band'}
			{@const r = (a.rMin + a.rMax) / 2}
			{@const t = ang(p.bomId, k)}
			<Ring {r} color={c} dashed opacity={0.55} />
			{#if a.rMax - a.rMin > 0.05}
				<Ring r={a.rMin} color={c} dashed opacity={0.25} />
				<Ring r={a.rMax} color={c} dashed opacity={0.25} />
			{/if}
			<T.Group position={[r * Math.cos(t), 0, r * Math.sin(t)]}>
				<Marker id={p.bomId} label={`${who(alt)} · ${a.rMin === a.rMax || a.rMax - a.rMin < 0.05 ? r.toFixed(2) : `${a.rMin}–${a.rMax}`} AU`} sub={p.slug} color={c} ghost minor />
			</T.Group>
		{:else if a.kind === 'shells'}
			{#each a.layers as l, j (j)}
				<Ring r={l.rAU} color={c} dashed opacity={0.5} />
				<T.Group position={[l.rAU * Math.cos(ang(p.bomId, j)), 0, l.rAU * Math.sin(ang(p.bomId, j))]}>
					<Marker id={p.bomId} label={`${who(alt)} · shell ${l.rAU} AU`} color={c} ghost minor />
				</T.Group>
			{/each}
		{:else if a.kind === 'cap'}
			{@const rr = a.rAU * Math.sin((a.halfAngleDeg * Math.PI) / 180)}
			{@const yy = a.rAU * Math.cos((a.halfAngleDeg * Math.PI) / 180)}
			<Ring r={rr} y={yy} color={c} dashed opacity={0.6} />
			<T.Group position={[rr, yy, 0]}>
				<Marker id={p.bomId} label={`${who(alt)} · cap r=${a.rAU} AU, α=${a.halfAngleDeg}°`} color={c} ghost minor />
			</T.Group>
		{:else}
			<Tracked position={(y) => anchorPosition(a, y)}>
				<Marker id={p.bomId} label={`${who(alt)} · ${p.slug}`} sub={alt.note} color={c} ghost minor />
			</Tracked>
		{/if}
	{/each}
{/each}
