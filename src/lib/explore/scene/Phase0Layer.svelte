<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from 'three';
	import BomMarker from './BomMarker.svelte';
	import Traffic from './Traffic.svelte';
	import { NEAS_BY_VALUE, neaPosition } from '../core/nea';
	import { lagrangePosition } from '../core/ephemeris';
	import { itemProgress } from '../core/progress';
	import { explorer } from '../core/state.svelte';
	import { PHASE_COLORS } from '../core/theme';

	const color = PHASE_COLORS['phase-0'];
	const SURVEY = 32;
	const SITES = 4;

	const survey = $derived(itemProgress('bom-0-1', 'phase-0', explorer.year));
	const mining = $derived(itemProgress('bom-0-2', 'phase-0', explorer.year));
	const transport = $derived(itemProgress('bom-0-4', 'phase-0', explorer.year));

	function cloud(n: number, size: number) {
		const arr = new Float32Array(n * 3);
		const g = new BufferGeometry();
		g.setAttribute('position', new BufferAttribute(arr, 3));
		const p = new Points(g, new PointsMaterial({ color, size, sizeAttenuation: false, transparent: true, depthWrite: false }));
		p.frustumCulled = false;
		return { arr, g, p };
	}
	const sats = cloud(SURVEY, 3);
	const sites = cloud(SITES, 6);

	useTask(() => {
		const y = explorer.year;
		const ns = Math.round(SURVEY * survey);
		sats.g.setDrawRange(0, ns);
		for (let k = 0; k < ns; k++) sats.arr.set(neaPosition(NEAS_BY_VALUE[k], y), k * 3);
		sats.g.getAttribute('position').needsUpdate = true;
		const nm = Math.ceil(SITES * mining);
		sites.g.setDrawRange(0, nm);
		for (let k = 0; k < nm; k++) sites.arr.set(neaPosition(NEAS_BY_VALUE[k], y), k * 3);
		sites.g.getAttribute('position').needsUpdate = true;
	});

	const routes = Array.from({ length: SITES }, (_, k) => ({
		from: (y: number) => neaPosition(NEAS_BY_VALUE[k], y),
		to: (y: number) => lagrangePosition('earth', 'L4', y)
	}));
</script>

<T is={sats.p} />
<T is={sites.p} />
<Traffic {routes} color={color} active={transport} />

<BomMarker bomId="bom-0-1" />
<BomMarker bomId="bom-0-2" />
<BomMarker bomId="bom-0-3" />
