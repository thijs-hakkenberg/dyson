<script lang="ts">
	/** Circle of radius r (AU) parallel to the ecliptic at height y. Dashed for ghosts. */
	import { T } from '@threlte/core';
	import { BufferAttribute, BufferGeometry, Line, LineBasicMaterial, LineDashedMaterial } from 'three';

	let {
		r,
		y = 0,
		color,
		dashed = false,
		opacity = 0.6,
		tilt = 0
	}: { r: number; y?: number; color: string; dashed?: boolean; opacity?: number; tilt?: number } = $props();

	const SEG = 256;
	const geom = new BufferGeometry();
	const arr = new Float32Array((SEG + 1) * 3);
	geom.setAttribute('position', new BufferAttribute(arr, 3));
	// svelte-ignore state_referenced_locally — props are fixed for the component's lifetime
	const mat = dashed
		? new LineDashedMaterial({ transparent: true, depthWrite: false })
		: new LineBasicMaterial({ transparent: true, depthWrite: false });
	const line = new Line(geom, mat);
	line.frustumCulled = false;

	$effect(() => {
		for (let k = 0; k <= SEG; k++) {
			const a = (2 * Math.PI * k) / SEG;
			arr.set([r * Math.cos(a), y, r * Math.sin(a)], k * 3);
		}
		(geom.getAttribute('position') as BufferAttribute).needsUpdate = true;
		geom.computeBoundingSphere();
		if (dashed) {
			line.computeLineDistances();
			const m = mat as LineDashedMaterial;
			m.dashSize = (2 * Math.PI * r) / 120;
			m.gapSize = m.dashSize * 0.8;
		}
	});

	$effect(() => {
		mat.color.set(color);
		mat.opacity = opacity;
	});
</script>

<T is={line} rotation.x={tilt} />
