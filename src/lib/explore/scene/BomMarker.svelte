<script lang="ts">
	/** Labelled marker for a BOM item, showing deployment state. */
	import Tracked from './Tracked.svelte';
	import Marker from './Marker.svelte';
	import { getEntity, type Vec3 } from '../core/registry';
	import { explorer } from '../core/state.svelte';
	import { itemProgress, phaseInFocus } from '../core/progress';
	import { PHASE_COLORS } from '../core/theme';
	import { formatCount } from '../core/units';

	let { bomId, at }: { bomId: string; at?: (y: number) => Vec3 } = $props();

	// svelte-ignore state_referenced_locally — props are fixed for the component's lifetime
	const e = getEntity(bomId)!;
	const anchor = e.placement?.anchor;

	/** Bands and shells are centred on the Sun; label them at a point on the band. */
	function labelPoint(): (y: number) => Vec3 {
		if (at) return at;
		if (anchor?.kind === 'band') {
			let h = 0;
			for (const ch of bomId) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
			const a = (h % 360) * (Math.PI / 180);
			const r = (anchor.rMin + anchor.rMax) / 2;
			return () => [r * Math.cos(a), 0, r * Math.sin(a)];
		}
		return e.position;
	}

	const progress = $derived(itemProgress(bomId, e.phaseId!, explorer.year));
	// Completed phases keep their geometry but drop labels to reduce clutter
	const labelled = $derived(
		explorer.selectedId === bomId || phaseInFocus(e.phaseId!, explorer.year, explorer.selected?.phaseId ?? explorer.selected?.phase?.id)
	);
	const sub = $derived.by(() => {
		const q = e.bom!.quantity;
		if (progress >= 1) return `${formatCount(q)} ${e.bom!.unit} · complete`;
		if (q <= 1) return `${Math.round(progress * 100)}% built`;
		return `${formatCount(q * progress)} / ${formatCount(q)} ${e.bom!.unit}`;
	});
</script>

{#if progress > 0 && labelled}
	<Tracked position={labelPoint()}>
		<Marker id={bomId} label={e.name} {sub} color={PHASE_COLORS[e.phaseId!]} />
	</Tracked>
{/if}
