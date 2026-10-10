<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { BufferAttribute, BufferGeometry, Color, Points, PointsMaterial } from 'three';
	import { NEA_POPULATION, writeNeaPositions } from '../core/nea';
	import { NEA_TYPE_COLORS } from '../core/theme';
	import { explorer } from '../core/state.svelte';

	const n = NEA_POPULATION.length;
	const pos = new Float32Array(n * 3);
	const col = new Float32Array(n * 3);
	const c = new Color();
	NEA_POPULATION.forEach((nea, k) => {
		c.set(NEA_TYPE_COLORS[nea.type]);
		col.set([c.r, c.g, c.b], k * 3);
	});
	const geom = new BufferGeometry();
	geom.setAttribute('position', new BufferAttribute(pos, 3));
	geom.setAttribute('color', new BufferAttribute(col, 3));
	const points = new Points(
		geom,
		new PointsMaterial({ size: 1.6, sizeAttenuation: false, vertexColors: true, transparent: true, opacity: 0.55, depthWrite: false })
	);
	points.frustumCulled = false;

	let last = NaN;
	useTask(() => {
		if (explorer.year === last) return;
		last = explorer.year;
		writeNeaPositions(pos, NEA_POPULATION, last);
		(geom.getAttribute('position') as BufferAttribute).needsUpdate = true;
	});
</script>

<T is={points} />
