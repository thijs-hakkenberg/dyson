<script lang="ts">
	/**
	 * The stellar engine's plasma loop as particle streams (see core/plasma.ts):
	 * lifted plasma rises off the Sun to the collection ring, spirals out to the
	 * separation zone, and is fed to the engine on the trailing side of the
	 * thrust axis; there helium leaves as the exhaust jet and hydrogen returns
	 * to the Sun as a beam. Paths and speeds are schematic; rates are consensus.
	 */
	import { T, useTask } from '@threlte/core';
	import {
		AdditiveBlending,
		BufferAttribute,
		BufferGeometry,
		CatmullRomCurve3,
		Color,
		PointsMaterial,
		Vector3
	} from 'three';
	import { onDestroy } from 'svelte';
	import Marker from './Marker.svelte';
	import { PLASMA, plasmaFlowAt } from '../core/plasma';
	import { explorer } from '../core/state.svelte';
	import { BODY_RADIUS_KM, kmToAU } from '../core/units';
	import { formatSci } from '../core/metrics';

	let { engineAt }: { engineAt: [number, number, number] } = $props();

	const RS = kmToAU(BODY_RADIUS_KM.sun);
	const ring = ((PLASMA.ringRsun[0] + PLASMA.ringRsun[1]) / 2) * RS;
	const zone = (PLASMA.zoneAU[0] + PLASMA.zoneAU[1]) / 2;
	// svelte-ignore state_referenced_locally — the engine position is fixed for the layer's lifetime
	const E = new Vector3(...engineAt);

	const COL = {
		lifted: new Color('#e879f9'), // mixed solar plasma
		he: new Color('#fbbf24'),
		h: new Color('#7dd3fc'),
		exhaust: new Color('#fde68a')
	};

	// ── Paths ──────────────────────────────────────────────────────────────
	// Lifting sites spread around the Sun (Fibonacci sphere), each feeding one route
	const ROUTES = 20;
	interface Route {
		lift: CatmullRomCurve3;
		feed: CatmullRomCurve3;
	}
	const routes: Route[] = [];
	for (let i = 0; i < ROUTES; i++) {
		const y = 1 - (2 * (i + 0.5)) / ROUTES;
		const r = Math.sqrt(1 - y * y);
		const a = i * 2.399963;
		const dir = new Vector3(Math.cos(a) * r, y, Math.sin(a) * r).normalize();
		const side = new Vector3(-dir.z, 0, dir.x).normalize().multiplyScalar(0.25);
		// Up through the corona to the collection ring, then out and round to the processing zone
		const lift = new CatmullRomCurve3([
			dir.clone().multiplyScalar(RS),
			dir.clone().multiplyScalar(ring * 0.55),
			dir.clone().multiplyScalar(ring),
			dir.clone().add(side).normalize().multiplyScalar(zone * 0.7),
			dir.clone().add(side).setY(dir.y * 0.4 - 0.5).normalize().multiplyScalar(zone)
		]);
		// From the separation plant to the engine's intake
		const from = lift.getPoint(1);
		const feed = new CatmullRomCurve3([from, from.clone().lerp(E, 0.5).setY((from.y + E.y) / 2 - 0.01), E.clone()]);
		routes.push({ lift, feed });
	}
	const exhaustLen = 1.6;
	const sunSurfaceToward = new Vector3(0, -RS, 0);

	// ── Particles ──────────────────────────────────────────────────────────
	const PER_LIFT = 26,
		PER_FEED = 16,
		N_EXHAUST = 260,
		N_BEAM = 120;
	const N = ROUTES * (PER_LIFT + PER_FEED) + N_EXHAUST + N_BEAM;
	const pos = new Float32Array(N * 3);
	const col = new Float32Array(N * 3);
	const phase = new Float32Array(N);
	const kind = new Uint8Array(N); // 0 lift, 1 feed He, 2 feed H, 3 exhaust, 4 beam
	const route = new Uint16Array(N);
	const jitter = new Float32Array(N * 2);
	{
		let k = 0;
		const put = (kd: number, r: number, c: Color) => {
			kind[k] = kd;
			route[k] = r;
			phase[k] = Math.random();
			jitter[k * 2] = Math.random() * 2 - 1;
			jitter[k * 2 + 1] = Math.random() * 2 - 1;
			col.set([c.r, c.g, c.b], k * 3);
			k++;
		};
		for (let r = 0; r < ROUTES; r++) {
			for (let i = 0; i < PER_LIFT; i++) put(0, r, COL.lifted);
			// Mass split after separation: ~25% helium, ~75% hydrogen
			for (let i = 0; i < PER_FEED; i++) put(i % 4 === 0 ? 1 : 2, r, i % 4 === 0 ? COL.he : COL.h);
		}
		for (let i = 0; i < N_EXHAUST; i++) put(3, 0, COL.exhaust);
		for (let i = 0; i < N_BEAM; i++) put(4, 0, COL.h);
	}
	const geometry = new BufferGeometry();
	geometry.setAttribute('position', new BufferAttribute(pos, 3));
	geometry.setAttribute('color', new BufferAttribute(col, 3));
	const material = new PointsMaterial({
		size: 3.2,
		sizeAttenuation: false,
		vertexColors: true,
		transparent: true,
		opacity: 0,
		blending: AdditiveBlending,
		depthWrite: false
	});
	onDestroy(() => {
		geometry.dispose();
		material.dispose();
	});

	const flow = $derived(plasmaFlowAt(Math.round(explorer.year * 4) / 4));

	// Schematic speeds (fraction of a path per second); the exhaust is fastest
	const SPEED = [0.09, 0.16, 0.16, 0.5, 0.35];
	const tmp = new Vector3();
	useTask((dt) => {
		material.opacity = flow.fraction > 0 ? 0.35 + 0.6 * flow.fraction : 0;
		if (flow.fraction <= 0) return;
		for (let i = 0; i < N; i++) {
			let t = (phase[i] += dt * SPEED[kind[i]]);
			if (t >= 1) t = phase[i] = t - Math.floor(t);
			const kd = kind[i];
			if (kd === 0) routes[route[i]].lift.getPoint(t, tmp);
			else if (kd === 1 || kd === 2) routes[route[i]].feed.getPoint(t, tmp);
			else if (kd === 3) {
				// Collimated helium jet leaving backwards (< 3° half-angle), widening slowly
				const s = t * exhaustLen;
				const w = 0.003 + s * 0.035;
				tmp.set(E.x + jitter[i * 2] * w, E.y - s, E.z + jitter[i * 2 + 1] * w);
			} else {
				// Hydrogen return beam from the engine into the Sun
				tmp.lerpVectors(E, sunSurfaceToward, t);
				tmp.x += jitter[i * 2] * 0.0015;
				tmp.z += jitter[i * 2 + 1] * 0.0015;
			}
			pos[i * 3] = tmp.x;
			pos[i * 3 + 1] = tmp.y;
			pos[i * 3 + 2] = tmp.z;
		}
		geometry.attributes.position.needsUpdate = true;
	});

	const kgs = (v: number) => `${formatSci(v, 1)} kg/s`;
</script>

<T.Points {geometry} {material} frustumCulled={false} />

{#if flow.fraction > 0}
	<T.Group position={[ring * 0.75, ring * 0.75, 0]}>
		<Marker label="Lifted plasma" sub="{kgs(flow.liftKgS)} · ring at 5–8 R☉" color="#e879f9" minor />
	</T.Group>
	<T.Group position={[E.x, E.y - exhaustLen * 0.6, E.z]}>
		<Marker label="Helium exhaust · 0.01c" sub="{kgs(flow.heKgS)} · net push on the Sun {formatSci(flow.thrustN, 1)} N" color="#fde68a" minor />
	</T.Group>
	<T.Group position={[E.x, E.y * 0.45, E.z]}>
		<Marker label="Hydrogen return · ≤0.005c" sub="{kgs(flow.hKgS)} into the Sun" color="#7dd3fc" minor />
	</T.Group>
{/if}
