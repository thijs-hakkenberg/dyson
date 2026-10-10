<script lang="ts">
	/**
	 * Logistics flow indicators: straight segments between endpoints with
	 * packets moving in wall-clock time. Schematic — real transfers follow
	 * low-thrust spirals or Hohmann arcs, which a later Logistics lens will show.
	 */
	import { T, useTask } from '@threlte/core';
	import {
		BufferAttribute,
		BufferGeometry,
		LineBasicMaterial,
		LineSegments,
		Points,
		PointsMaterial
	} from 'three';
	import { explorer } from '../core/state.svelte';
	import type { Vec3 } from '../core/registry';

	let {
		routes,
		color,
		packets = 3,
		active = 1
	}: {
		routes: { from: (y: number) => Vec3; to: (y: number) => Vec3 }[];
		color: string;
		packets?: number;
		/** 0..1 — fraction of routes in service */
		active?: number;
	} = $props();

	// svelte-ignore state_referenced_locally — props are fixed for the component's lifetime
	const n = routes.length;
	const seg = new Float32Array(n * 6);
	// svelte-ignore state_referenced_locally — props are fixed for the component's lifetime
	const pk = new Float32Array(n * packets * 3);
	const lineGeom = new BufferGeometry();
	lineGeom.setAttribute('position', new BufferAttribute(seg, 3));
	const lineMat = new LineBasicMaterial({ transparent: true, opacity: 0.22, depthWrite: false });
	const lines = new LineSegments(lineGeom, lineMat);
	lines.frustumCulled = false;
	const pkGeom = new BufferGeometry();
	pkGeom.setAttribute('position', new BufferAttribute(pk, 3));
	const pkMat = new PointsMaterial({ size: 3, sizeAttenuation: false, transparent: true, depthWrite: false });
	const pts = new Points(pkGeom, pkMat);
	pts.frustumCulled = false;

	$effect(() => {
		lineMat.color.set(color);
		pkMat.color.set(color);
	});

	let clock = 0;
	useTask((dt) => {
		clock += dt;
		const live = Math.ceil(n * active);
		lineGeom.setDrawRange(0, live * 2);
		pkGeom.setDrawRange(0, live * packets);
		for (let r = 0; r < live; r++) {
			const a = routes[r].from(explorer.year);
			const b = routes[r].to(explorer.year);
			seg.set(a, r * 6);
			seg.set(b, r * 6 + 3);
			for (let p = 0; p < packets; p++) {
				const t = (clock * 0.15 + p / packets + r * 0.137) % 1;
				const o = (r * packets + p) * 3;
				pk[o] = a[0] + (b[0] - a[0]) * t;
				pk[o + 1] = a[1] + (b[1] - a[1]) * t;
				pk[o + 2] = a[2] + (b[2] - a[2]) * t;
			}
		}
		(lineGeom.getAttribute('position') as BufferAttribute).needsUpdate = true;
		(pkGeom.getAttribute('position') as BufferAttribute).needsUpdate = true;
	});
</script>

{#if active > 0}
	<T is={lines} />
	<T is={pts} />
{/if}
