<script lang="ts">
	/**
	 * The focused item's detailed model in the orrery, at true scale (metres →
	 * AU), lit by the Sun. The host positions this group on the focus point
	 * each frame, outside the floating-origin world, so it never jitters.
	 */
	import { T, useThrelte } from '@threlte/core';
	import { Box3, Group, MeshStandardMaterial, PMREMGenerator, type Mesh } from 'three';
	import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
	import { onDestroy } from 'svelte';
	import Marker from '../Marker.svelte';
	import { buildElement, disposeTree } from './build';
	import { formatLength, type ElementModel } from '../../core/models';
	import { nearFieldResolved, sizeAU } from '../../core/nearfield';
	import { explorer } from '../../core/state.svelte';
	import { getEntity } from '../../core/registry';
	import { PHASE_COLORS } from '../../core/theme';
	import { AU_M } from '../../core/units';

	let { model }: { model: ElementModel } = $props();

	// Reflections for metal surfaces, per material so the rest of the scene is untouched
	const { renderer } = useThrelte();
	const pmrem = new PMREMGenerator(renderer);
	const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
	pmrem.dispose();
	onDestroy(() => env.dispose());

	// svelte-ignore state_referenced_locally — the host keys this component on the model
	const e = getEntity(model.bomId)!;
	// svelte-ignore state_referenced_locally
	const onSurface = e.placement?.anchor?.kind === 'body';

	// svelte-ignore state_referenced_locally
	const obj = buildElement(model);
	obj.traverse((o) => {
		const mat = (o as Mesh).material;
		if (mat instanceof MeshStandardMaterial) {
			mat.envMap = env;
			mat.envMapIntensity = 0.3;
		}
	});
	// Surface hardware rests on the ground rather than straddling it
	if (onSurface) obj.position.y = -new Box3().setFromObject(obj).min.y;
	const root = new Group();
	root.add(obj);
	root.scale.setScalar(1 / AU_M);
	onDestroy(() => disposeTree(root));
	// svelte-ignore state_referenced_locally
	const s = sizeAU(model);
	const resolved = $derived(nearFieldResolved(model, explorer.cameraDistance));
</script>

<T.Group>
	<T is={root} />
	{#if resolved}
		<T.Group position={[0, s * (onSurface ? 0.2 : 0.65), 0]}>
			<Marker
				id={model.bomId}
				label={e.name}
				sub="true scale · {formatLength(model.params.size)}"
				color={PHASE_COLORS[e.phaseId!]}
				always
			/>
		</T.Group>
	{/if}
</T.Group>
