<script lang="ts">
	/**
	 * Mass flows: arcs from each stage to the nearest point of the next stage,
	 * with particles whose density and size scale with log10(flow). The
	 * bottleneck stage of each chain is ringed. Particle motion is schematic
	 * (wall-clock), not transfer-orbit time.
	 */
	import { T, useTask } from '@threlte/core';
	import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, Points, PointsMaterial } from 'three';
	import Marker from '../Marker.svelte';
	import { explorer } from '../../core/state.svelte';
	import { chainsAt, formatTonnesPerYear } from '../../core/logistics';
	import type { Vec3 } from '../../core/registry';

	const MAX = 6000;
	const pos = new Float32Array(MAX * 3);
	const col = new Float32Array(MAX * 3);
	const geo = new BufferGeometry();
	geo.setAttribute('position', new BufferAttribute(pos, 3));
	geo.setAttribute('color', new BufferAttribute(col, 3));
	const mat = new PointsMaterial({
		size: 3,
		sizeAttenuation: false,
		vertexColors: true,
		transparent: true,
		opacity: 0.9,
		blending: AdditiveBlending,
		depthWrite: false
	});
	const points = new Points(geo, mat);
	points.frustumCulled = false;

	const coarse = $derived(Math.round(explorer.year * 20) / 20);
	const states = $derived(chainsAt(coarse).filter((c) => c.active));

	/** Quadratic Bézier lifted out of the plane so arcs read as transfers. */
	function arc(a: Vec3, b: Vec3, t: number): Vec3 {
		const m: Vec3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
		const d = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
		m[1] += d * 0.18;
		const u = 1 - t;
		return [
			u * u * a[0] + 2 * u * t * m[0] + t * t * b[0],
			u * u * a[1] + 2 * u * t * m[1] + t * t * b[1],
			u * u * a[2] + 2 * u * t * m[2] + t * t * b[2]
		];
	}
	const nearest = (p: Vec3, qs: Vec3[]) =>
		qs.reduce((best, q) =>
			Math.hypot(q[0] - p[0], q[1] - p[1], q[2] - p[2]) < Math.hypot(best[0] - p[0], best[1] - p[1], best[2] - p[2]) ? q : best
		);

	let clock = 0;
	useTask((dt) => {
		clock += dt;
		const y = explorer.year;
		let n = 0;
		for (const s of states) {
			const c = new Color(s.chain.color);
			// Particles per link scale with order of magnitude of the flow
			const perLink = Math.max(4, Math.min(60, Math.round(4 * Math.log10(Math.max(10, s.flow)))));
			for (let i = 0; i < s.chain.stages.length - 1; i++) {
				const from = s.chain.stages[i].pos(y);
				const to = s.chain.stages[i + 1].pos(y);
				for (let l = 0; l < from.length; l++) {
					const a = from[l];
					const b = nearest(a, to);
					for (let k = 0; k < perLink && n < MAX; k++) {
						const t = (clock * 0.12 + k / perLink + l * 0.137) % 1;
						const p = arc(a, b, t);
						pos.set(p, n * 3);
						col.set([c.r, c.g, c.b], n * 3);
						n++;
					}
				}
			}
		}
		geo.setDrawRange(0, n);
		geo.attributes.position.needsUpdate = true;
		geo.attributes.color.needsUpdate = true;
	});
</script>

<T is={points} />
{#each states as s (s.chain.id)}
	{#if s.bottleneck}
		{@const p = s.bottleneck.pos(coarse)[0]}
		<T.Group position={p}>
			<Marker label="Bottleneck · {s.bottleneck.label}" sub="{s.chain.label} · {formatTonnesPerYear(s.flow)}" color="#f87171" minor always />
		</T.Group>
	{/if}
{/each}
