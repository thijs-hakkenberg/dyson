<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { CameraControls, type CameraControlsRef } from '@threlte/extras';
	import type { Group, PerspectiveCamera } from 'three';
	import MilkyWay from './MilkyWay.svelte';
	import Sun from './Sun.svelte';
	import Bodies from './Bodies.svelte';
	import Orbits from './Orbits.svelte';
	import NeaBelt from './NeaBelt.svelte';
	import Phase0Layer from './Phase0Layer.svelte';
	import Phase1Layer from './Phase1Layer.svelte';
	import Phase2Layer from './Phase2Layer.svelte';
	import MatrioshkaLayer from './MatrioshkaLayer.svelte';
	import StellarEngineLayer from './StellarEngineLayer.svelte';
	import Divergences from './Divergences.svelte';
	import { explorer, MAX_YEAR } from '../core/state.svelte';
	import { getEntity, type Vec3 } from '../core/registry';
	import { phaseStarted } from '../core/progress';

	const { size } = useThrelte();
	let camera = $state.raw<PerspectiveCamera>();
	let controls = $state.raw<CameraControlsRef>();
	let world = $state.raw<Group>();

	const FOV = 45;

	$effect(() => {
		if (!controls) return;
		controls.minDistance = 1e-6;
		controls.maxDistance = 400;
		controls.smoothTime = 0.35;
		controls.dollySpeed = 0.6;
		controls.setLookAt(1.2, 1.1, 2.2, 0, 0, 0, false);
	});

	// ── Floating origin ────────────────────────────────────────────────────
	// The world group is translated so the focused object sits at the origin.
	// Keeps float32 precision where the camera is looking, from AU down to km.
	let current: Vec3 = [0, 0, 0];
	let from: Vec3 = [0, 0, 0];
	let lastFocus = '';
	let transition = -1;
	let notify = 0;

	const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

	useTask((dt) => {
		if (explorer.playing) {
			const next = explorer.year + dt * explorer.speed.yps;
			if (next >= MAX_YEAR) explorer.playing = false;
			explorer.setYear(next);
		}

		const focus = getEntity(explorer.focusId) ?? getEntity('sun')!;
		const target = focus.position(explorer.year);

		if (focus.id !== lastFocus && controls) {
			const first = lastFocus === '';
			lastFocus = focus.id;
			from = [...current];
			transition = first ? -1 : 0;
			// Never let the camera dolly inside the focused body
			controls.minDistance = Math.max(1e-6, (focus.radiusAU ?? 0) * 1.1);
			// Deep links (?f=earth) arrive at the body; the default view stays wide
			if (!first || focus.id !== 'sun') controls.dollyTo(focus.focusDistance, true);
		}

		if (transition >= 0) {
			transition += dt / 1.6;
			const k = ease(Math.min(1, transition));
			current = [0, 1, 2].map((i) => from[i] + (target[i] - from[i]) * k) as Vec3;
			if (transition >= 1) transition = -1;
		} else {
			current = target;
		}
		world?.position.set(-current[0], -current[1], -current[2]);

		// Scale-bar telemetry, throttled
		notify += dt;
		if (notify > 0.1 && controls) {
			notify = 0;
			const d = controls.distance;
			explorer.cameraDistance = d;
			explorer.auPerPixel = (2 * d * Math.tan((FOV * Math.PI) / 360)) / Math.max(1, size.current.height);
		}
	});

	const show = (id: 'phase-0' | 'phase-1' | 'phase-2' | 'phase-3a' | 'phase-3b') =>
		explorer.layers[id] && phaseStarted(id, explorer.year);
</script>

<T.PerspectiveCamera bind:ref={camera} makeDefault fov={FOV} near={1e-9} far={1e5} position={[1.2, 1.1, 2.2]}>
	<CameraControls bind:ref={controls} />
</T.PerspectiveCamera>

{#if explorer.layers.sky}<MilkyWay />{/if}

<T.Group bind:ref={world}>
	<Sun />
	<Bodies />
	{#if explorer.layers.orbits}<Orbits />{/if}
	{#if explorer.layers.nea}<NeaBelt />{/if}
	{#if show('phase-0')}<Phase0Layer />{/if}
	{#if show('phase-1')}<Phase1Layer />{/if}
	{#if show('phase-2')}<Phase2Layer />{/if}
	{#if show('phase-3a')}<MatrioshkaLayer />{/if}
	{#if show('phase-3b')}<StellarEngineLayer />{/if}
	<Divergences />
</T.Group>
