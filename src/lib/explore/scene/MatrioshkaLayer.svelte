<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { BufferAttribute, BufferGeometry, Group, Points, PointsMaterial } from 'three';
	import Ring from './Ring.svelte';
	import Marker from './Marker.svelte';
	import BomMarker from './BomMarker.svelte';
	import SwarmCloud from './SwarmCloud.svelte';
	import { getEntity } from '../core/registry';
	import { CLOUDS } from '../core/clouds';
	import { shellProgress } from '../core/progress';
	import { explorer } from '../core/state.svelte';
	import { PHASE_COLORS, cascadeColor } from '../core/theme';
	import { blackbodyRGB } from '../core/units';

	const anchor = getEntity('bom-3a-1')!.placement!.anchor!;
	const layers = anchor.kind === 'shells' ? anchor.layers : [];
	const N = 3000;

	// Shuffled Fibonacci sphere: uniform coverage that fills in randomly as the layer grows
	function shellPoints(r: number, seed: number) {
		const pts = new Float32Array(N * 3);
		const golden = Math.PI * (3 - Math.sqrt(5));
		for (let k = 0; k < N; k++) {
			const y = 1 - (2 * (k + 0.5)) / N;
			const rr = Math.sqrt(1 - y * y);
			const th = golden * k;
			pts.set([r * rr * Math.cos(th), r * y, r * rr * Math.sin(th)], k * 3);
		}
		let s = seed;
		for (let k = N - 1; k > 0; k--) {
			s = (s * 1664525 + 1013904223) >>> 0;
			const j = s % (k + 1);
			for (let c = 0; c < 3; c++) {
				const t = pts[k * 3 + c];
				pts[k * 3 + c] = pts[j * 3 + c];
				pts[j * 3 + c] = t;
			}
		}
		return pts;
	}

	const shells = layers.map((l, k) => {
		const color = cascadeColor(l.tempK, blackbodyRGB);
		const g = new BufferGeometry();
		g.setAttribute('position', new BufferAttribute(shellPoints(l.rAU, 7 + k), 3));
		g.setDrawRange(0, 0);
		const p = new Points(
			g,
			new PointsMaterial({ color, size: 1.4, sizeAttenuation: false, transparent: true, opacity: 0.7, depthWrite: false })
		);
		p.frustumCulled = false;
		const group = new Group();
		group.add(p);
		return { ...l, k, color, g, group, omega: (2 * Math.PI) / Math.pow(l.rAU, 1.5) };
	});

	const progress = $derived(shells.map((s) => shellProgress(s.k, shells.length, explorer.year)));

	useTask(() => {
		const t = explorer.year - 2000;
		for (const s of shells) {
			s.g.setDrawRange(0, Math.round(N * progress[s.k]));
			// Shell elements orbit at their Keplerian rate
			s.group.rotation.y = s.omega * t;
		}
	});
</script>

{#each shells as s (s.k)}
	{#if progress[s.k] > 0}
		<T is={s.group} />
		<Ring r={s.rAU} color={s.color} opacity={0.35 * progress[s.k] + 0.1} />
		<T.Group position={[s.rAU * Math.cos(0.6 + s.k * 0.5), 0, s.rAU * Math.sin(0.6 + s.k * 0.5)]}>
			<Marker
				id="bom-3a-1"
				label={`Shell ${s.k + 1} · ${s.rAU} AU`}
				sub={`~${Math.round(s.tempK)} K · ${Math.round(progress[s.k] * 100)}%`}
				color={s.color}
				minor
			/>
		</T.Group>
	{/if}
{/each}

<SwarmCloud spec={CLOUDS.find((c) => c.bomId === 'bom-3a-4')!} color={PHASE_COLORS['phase-3a']} />
<BomMarker bomId="bom-3a-4" />
