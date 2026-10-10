<script lang="ts">
	/**
	 * Background stars on a large sphere that follows the camera (no parallax).
	 * Procedural for now — colours drawn from main-sequence temperatures.
	 * TODO: replace with a bright-star catalogue (e.g. HYG) for real constellations.
	 */
	import { T, useTask, useThrelte } from '@threlte/core';
	import { BufferAttribute, BufferGeometry, Points, PointsMaterial } from 'three';
	import { blackbodyRGB } from '../core/units';

	const N = 6000;
	const R = 5000;
	const pos = new Float32Array(N * 3);
	const col = new Float32Array(N * 3);
	let s = 1234567;
	const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
	for (let k = 0; k < N; k++) {
		const u = rnd() * 2 - 1;
		const th = rnd() * Math.PI * 2;
		const rr = Math.sqrt(1 - u * u);
		pos.set([R * rr * Math.cos(th), R * u, R * rr * Math.sin(th)], k * 3);
		const temp = 3000 + Math.pow(rnd(), 2.2) * 12000;
		const [r, g, b] = blackbodyRGB(temp);
		const mag = 0.25 + Math.pow(rnd(), 6) * 0.9;
		col.set([r * mag, g * mag, b * mag], k * 3);
	}
	const geom = new BufferGeometry();
	geom.setAttribute('position', new BufferAttribute(pos, 3));
	geom.setAttribute('color', new BufferAttribute(col, 3));
	const points = new Points(
		geom,
		new PointsMaterial({ size: 1.5, sizeAttenuation: false, vertexColors: true, depthWrite: false, transparent: true })
	);
	points.frustumCulled = false;
	points.renderOrder = -1;

	const { camera } = useThrelte();
	useTask(() => {
		points.position.copy(camera.current.position);
	});
</script>

<T is={points} />
