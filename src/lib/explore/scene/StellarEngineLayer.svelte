<script lang="ts">
	import { T } from '@threlte/core';
	import {
		AdditiveBlending,
		BufferGeometry,
		DoubleSide,
		Line,
		LineDashedMaterial,
		SphereGeometry,
		Vector3
	} from 'three';
	import Marker from './Marker.svelte';
	import BomMarker from './BomMarker.svelte';
	import SwarmCloud from './SwarmCloud.svelte';
	import { getEntity, THRUST_AXIS } from '../core/registry';
	import { CLOUDS } from '../core/clouds';
	import { itemProgress } from '../core/progress';
	import { explorer } from '../core/state.svelte';
	import { PHASE_COLORS } from '../core/theme';

	const color = PHASE_COLORS['phase-3b'];
	const mirror = getEntity('bom-3b-1')!.placement!.anchor!;
	const engine = getEntity('bom-3b-2')!.placement!.anchor!;
	const rMirror = mirror.kind === 'cap' ? mirror.rAU : 0.1;
	const alphaMax = mirror.kind === 'cap' ? mirror.halfAngleDeg : 60;
	const rEngine = engine.kind === 'axis' ? engine.rAU : 1;

	const mirrorProgress = $derived(itemProgress('bom-3b-1', 'phase-3b', explorer.year));
	const engineProgress = $derived(itemProgress('bom-3b-2', 'phase-3b', explorer.year));

	// Cap grows outward from the axis as coverage increases (rebuilt per 0.5° step)
	const alpha = $derived(Math.max(0.5, Math.round(alphaMax * mirrorProgress * 2) / 2));
	const capGeom = $derived(new SphereGeometry(rMirror, 96, 48, 0, Math.PI * 2, 0, (alpha * Math.PI) / 180));
	const capWire = $derived(new SphereGeometry(rMirror, 24, 8, 0, Math.PI * 2, 0, (alpha * Math.PI) / 180));
	$effect(() => {
		const g = capGeom;
		const w = capWire;
		return () => {
			g.dispose();
			w.dispose();
		};
	});

	const axisEnd: [number, number, number] = [THRUST_AXIS[0] * 2, THRUST_AXIS[1] * 2, THRUST_AXIS[2] * 2];
	const jetFrom: [number, number, number] = [0, rEngine, 0];

	const axisLine = new Line(
		new BufferGeometry().setFromPoints([new Vector3(0, 0, 0), new Vector3(...axisEnd)]),
		new LineDashedMaterial({ color, dashSize: 0.03, gapSize: 0.03, transparent: true, opacity: 0.6 })
	);
	axisLine.computeLineDistances();
</script>

{#if mirrorProgress > 0}
	<T.Mesh geometry={capGeom}>
		<T.MeshBasicMaterial color="#e2e8f0" transparent opacity={0.12} side={DoubleSide} depthWrite={false} />
	</T.Mesh>
	<T.Mesh geometry={capWire}>
		<T.MeshBasicMaterial {color} wireframe transparent opacity={0.14} depthWrite={false} />
	</T.Mesh>
	<T.Group position={[0, rMirror, 0]}>
		<Marker id="bom-3b-1" label="Shkadov mirror" sub={`α = ${alpha.toFixed(1)}° · r = ${rMirror} AU`} {color} />
	</T.Group>
	<!-- Thrust axis: direction is an assumption (ecliptic north), labelled -->
	<T is={axisLine} />
	<T.Group position={axisEnd}>
		<Marker label="Thrust axis" sub="assumed ecliptic north" {color} minor />
	</T.Group>
{/if}

{#if engineProgress > 0}
	<BomMarker bomId="bom-3b-2" at={() => jetFrom} />
	<T.Group position={jetFrom}>
		<!-- Schematic jet -->
		<T.Mesh position={[0, 1.5, 0]}>
			<T.CylinderGeometry args={[0.004, 0.03, 3, 24, 1, true]} />
			<T.MeshBasicMaterial
				color="#93c5fd"
				transparent
				opacity={0.35 * engineProgress}
				blending={AdditiveBlending}
				depthWrite={false}
				side={DoubleSide}
			/>
		</T.Mesh>
	</T.Group>
{/if}

<SwarmCloud spec={CLOUDS.find((c) => c.bomId === 'bom-3b-3')!} {color} />
<SwarmCloud spec={CLOUDS.find((c) => c.bomId === 'bom-3b-4')!} color="#fda4af" />
<BomMarker bomId="bom-3b-3" />
<BomMarker bomId="bom-3b-4" />
