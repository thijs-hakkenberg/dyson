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
	import { advancePlayback, deepTime } from '../core/deeptime.svelte';
	import { getEntity, type Vec3 } from '../core/registry';
	import { phaseEmphasis, phaseStarted } from '../core/progress';
	import FadeGroup from './FadeGroup.svelte';
	import NetworkLayer from './network/NetworkLayer.svelte';
	import RiskLayer from './risk/RiskLayer.svelte';
	import LogisticsLayer from './logistics/LogisticsLayer.svelte';
	import NearField from './models/NearField.svelte';
	import { hardwareMinDistance, nearFieldModel } from '../core/nearfield';

	const { size } = useThrelte();
	let camera = $state.raw<PerspectiveCamera>();
	let controls = $state.raw<CameraControlsRef>();
	let world = $state.raw<Group>();
	let near = $state.raw<Group>();
	const nearModel = $derived(nearFieldModel(explorer.focusId));

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
	let appliedCmd = -1;

	const ease = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

	useTask((dt) => {
		// Past the build-out, playback carries on in deep time (the Sun's galactic orbit)
		if (explorer.playing) advancePlayback(dt);
		// Deep time only exists past the build-out: any jump back in years leaves it
		if (deepTime.myr > 0 && explorer.year < MAX_YEAR - 1e-6) deepTime.myr = 0;

		const focus = getEntity(explorer.focusId) ?? getEntity('sun')!;
		const target = focus.position(explorer.year);

		if (focus.id !== lastFocus && controls) {
			const first = lastFocus === '';
			lastFocus = focus.id;
			from = [...current];
			transition = first ? -1 : 0;
			// Never let the camera dolly inside the focused body
			const nm = nearFieldModel(focus.id);
			controls.minDistance = nm ? hardwareMinDistance(nm) : Math.max(1e-6, (focus.radiusAU ?? 0) * 1.1);
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
		// Near-field hardware rides on the focus point in the same frame as the world shift
		near?.position.set(target[0] - current[0], target[1] - current[1], target[2] - current[2]);

		// Scripted camera moves (tours), applied after any focus dolly this frame
		const cmd = explorer.cameraCmd;
		if (cmd && cmd.seq !== appliedCmd && controls) {
			appliedCmd = cmd.seq;
			explorer.cameraCmd = null;
			const d2r = Math.PI / 180;
			if (cmd.azimuth !== undefined || cmd.polar !== undefined)
				controls.rotateTo(
					cmd.azimuth !== undefined ? cmd.azimuth * d2r : controls.azimuthAngle,
					cmd.polar !== undefined ? cmd.polar * d2r : controls.polarAngle,
					true
				);
			if (cmd.distance !== undefined) controls.dollyTo(cmd.distance, true);
		}

		// Scale-bar telemetry, throttled
		notify += dt;
		if (notify > 0.1 && controls) {
			notify = 0;
			const d = controls.distance;
			explorer.cameraDistance = d;
			// Pull the near plane in for metre-scale hardware (log depth keeps the far end)
			const n = Math.min(1e-9, d * 0.02);
			if (camera && Math.abs(camera.near - n) > n * 0.25) {
				camera.near = n;
				camera.updateProjectionMatrix();
			}
			explorer.auPerPixel = (2 * d * Math.tan((FOV * Math.PI) / 360)) / Math.max(1, size.current.height);
		}
	});

	// Superseded phases recede so the construction frontier stays readable
	const selectedPhase = $derived(explorer.selected?.phaseId ?? (explorer.selected?.kind === 'phase' ? explorer.selected.id : undefined));
	const emphasis = (id: string) =>
		explorer.layers.fade ? phaseEmphasis(id, explorer.year, selectedPhase) : 1;

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
	{#if show('phase-0')}<FadeGroup factor={emphasis('phase-0')}><Phase0Layer /></FadeGroup>{/if}
	{#if show('phase-1')}<FadeGroup factor={emphasis('phase-1')}><Phase1Layer /></FadeGroup>{/if}
	{#if show('phase-2')}<FadeGroup factor={emphasis('phase-2')}><Phase2Layer /></FadeGroup>{/if}
	{#if show('phase-3a')}<FadeGroup factor={emphasis('phase-3a')}><MatrioshkaLayer /></FadeGroup>{/if}
	{#if show('phase-3b')}<FadeGroup factor={emphasis('phase-3b')}><StellarEngineLayer /></FadeGroup>{/if}
	<Divergences />
	{#if explorer.lens === 'network'}<NetworkLayer />{/if}
	{#if explorer.lens === 'risk'}<RiskLayer />{/if}
	{#if explorer.lens === 'logistics'}<LogisticsLayer />{/if}
</T.Group>

<T.Group bind:ref={near}>
	{#if nearModel}
		{#key nearModel.bomId}<NearField model={nearModel} />{/key}
	{/if}
</T.Group>
