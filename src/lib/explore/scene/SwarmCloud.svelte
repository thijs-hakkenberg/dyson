<script lang="ts">
	/**
	 * Swarm of circular heliocentric orbits within a band. Each marker
	 * advances at its true Keplerian rate (ω = 2π / r^1.5 rad/yr).
	 */
	import { T, useTask } from '@threlte/core';
	import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from 'three';
	import { explorer } from '../core/state.svelte';
	import { cloudBand, cloudCounts, type CloudSpec } from '../core/clouds';

	let { spec, color }: { spec: CloudSpec; color: string } = $props();

	// Deterministic PRNG so the swarm is identical across reloads
	function rng(seed: number) {
		let s = seed >>> 0;
		return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
	}

	// svelte-ignore state_referenced_locally — props are fixed for the component's lifetime
	const { cap, seed } = spec;
	// svelte-ignore state_referenced_locally — props are fixed for the component's lifetime
	const band = cloudBand(spec);
	const rand = rng(seed);
	const gauss = () => Math.sqrt(-2 * Math.log(rand() + 1e-12)) * Math.cos(2 * Math.PI * rand());
	const thick = ((band.thicknessDeg ?? 2) * Math.PI) / 180;

	// Per-marker orbit: radius, phase, rate, and in-plane basis vectors P, Q
	const R = new Float32Array(cap);
	const TH = new Float32Array(cap);
	const W = new Float32Array(cap);
	const PQ = new Float32Array(cap * 6);
	for (let k = 0; k < cap; k++) {
		const r = band.rMin + (band.rMax - band.rMin) * rand();
		const inc = gauss() * thick * 0.5;
		const node = rand() * 2 * Math.PI;
		R[k] = r;
		TH[k] = rand() * 2 * Math.PI;
		W[k] = (2 * Math.PI) / Math.pow(r, 1.5);
		const cn = Math.cos(node), sn = Math.sin(node), ci = Math.cos(inc), si = Math.sin(inc);
		// Ecliptic basis → scene (x, z, -y)
		const P = [cn, 0, -sn];
		const Q = [-sn * ci, si, -cn * ci];
		PQ.set([...P, ...Q], k * 6);
	}

	const pos = new Float32Array(cap * 3);
	const geom = new BufferGeometry();
	geom.setAttribute('position', new BufferAttribute(pos, 3));
	geom.setDrawRange(0, 0);
	// svelte-ignore state_referenced_locally — props are fixed for the component's lifetime
	const material = new PointsMaterial({
		size: spec.size,
		sizeAttenuation: false,
		transparent: true,
		opacity: spec.opacity,
		depthWrite: false
	});
	const points = new Points(geom, material);
	points.frustumCulled = false;

	$effect(() => {
		material.color.set(color);
	});

	let last = NaN;
	useTask(() => {
		const y = explorer.year;
		if (y === last) return;
		last = y;
		const n = cloudCounts(spec, y).rendered;
		geom.setDrawRange(0, n);
		const t = y - 2000;
		for (let k = 0; k < n; k++) {
			const th = TH[k] + W[k] * t;
			const c = Math.cos(th) * R[k], s = Math.sin(th) * R[k];
			const o = k * 6;
			pos[k * 3] = PQ[o] * c + PQ[o + 3] * s;
			pos[k * 3 + 1] = PQ[o + 1] * c + PQ[o + 4] * s;
			pos[k * 3 + 2] = PQ[o + 2] * c + PQ[o + 5] * s;
		}
		(geom.getAttribute('position') as BufferAttribute).needsUpdate = true;
	});
</script>

<T is={points} />
