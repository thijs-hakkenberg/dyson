<script lang="ts">
	/**
	 * A BOM element's detailed model, fitted to `target` scene units.
	 * mini — the Workbench consensus core: model only, slowly turning.
	 * full — model view: callouts, a metric scale bar, and divergent variants
	 *        as ghosts in a line-up at true relative scale (clamped and flagged
	 *        when they would leave the frame).
	 */
	import { T, useTask, useThrelte } from '@threlte/core';
	import { BufferGeometry, Group, Line, LineBasicMaterial, PMREMGenerator, Vector3, type Texture } from 'three';
	import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
	import { onDestroy } from 'svelte';
	import WbLabel from '../workbench/WbLabel.svelte';
	import { buildElement, disposeTree, extent, ghostify } from './build';
	import { formatLength, ghostLineup, niceLength, type ElementModel } from '../../core/models';
	import { MODEL_COLORS } from '../../core/theme';

	let {
		model,
		target,
		mode = 'mini',
		spin = 0.12
	}: { model: ElementModel; target: number; mode?: 'mini' | 'full'; spin?: number } = $props();

	// ── Image-based lighting so metals read as metal ───────────────────────
	const { scene, renderer } = useThrelte();
	let envTex: Texture | null = null;
	if (!scene.environment) {
		const pmrem = new PMREMGenerator(renderer);
		envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
		pmrem.dispose();
		scene.environment = envTex;
		scene.environmentIntensity = 0.55;
	}
	onDestroy(() => {
		if (envTex && scene.environment === envTex) scene.environment = null;
		envTex?.dispose();
	});

	// ── Main model ─────────────────────────────────────────────────────────
	const built = $derived.by(() => {
		const obj = buildElement(model);
		const ext = extent(obj) || model.params.size;
		const s = target / ext; // scene units per metre
		const g = new Group();
		obj.scale.setScalar(s);
		g.add(obj);
		return { group: g, obj, s, ext };
	});

	// ── Ghost line-up (full mode) ─────────────────────────────────────────
	const ghosts = $derived.by(() => {
		if (mode !== 'full') return [];
		const slots = ghostLineup(model, target);
		let x = target * 0.75;
		return slots.map((slot) => {
			const v = slot.variant;
			const obj = v.archetype
				? buildElement(model, { size: v.size, ...v.params }, v.archetype)
				: buildElement(model, { ...model.params, ...v.params, size: v.size });
			const ext = extent(obj) || slot.variant.size;
			const k = slot.sceneSize / ext;
			obj.scale.setScalar(k);
			ghostify(obj, slot.variant.model ? MODEL_COLORS[slot.variant.model] : '#94a3b8');
			const w = Math.max(slot.sceneSize, target * 0.08);
			x += w / 2 + target * 0.15;
			const pos: [number, number, number] = [x, 0, -target * 0.25];
			x += w / 2;
			return { slot, obj, pos, w };
		});
	});

	onDestroy(() => {
		disposeTree(built.group);
		for (const g of ghosts) disposeTree(g.obj);
	});
	let prevBuilt: Group | null = null;
	let prevGhosts: { obj: import('three').Object3D }[] = [];
	$effect(() => {
		const g = built.group;
		if (prevBuilt && prevBuilt !== g) disposeTree(prevBuilt);
		prevBuilt = g;
	});
	$effect(() => {
		const gs = ghosts;
		for (const old of prevGhosts) if (!gs.some((x) => x.obj === old.obj)) disposeTree(old.obj);
		prevGhosts = gs;
	});

	// ── Scale bar ──────────────────────────────────────────────────────────
	const bar = $derived.by(() => {
		if (mode !== 'full') return null;
		const metres = niceLength(built.ext * 0.45);
		const len = metres * built.s;
		const y = -target * 0.58;
		const x0 = -len / 2;
		const pts = [
			new Vector3(x0, y + target * 0.02, 0),
			new Vector3(x0, y, 0),
			new Vector3(x0 + len, y, 0),
			new Vector3(x0 + len, y + target * 0.02, 0)
		];
		const line = new Line(new BufferGeometry().setFromPoints(pts), new LineBasicMaterial({ color: '#e2e8f0' }));
		return { line, label: formatLength(metres), at: [0, y - target * 0.04, 0] as [number, number, number] };
	});

	// ── Turntable ──────────────────────────────────────────────────────────
	let turn = $state.raw<Group>();
	useTask((dt) => {
		if (turn) turn.rotation.y += dt * spin;
	});

	const ratioText = (r: number) => (r >= 1 ? `×${r >= 10 ? Math.round(r) : r.toFixed(1)}` : `×${r >= 0.1 ? r.toFixed(2) : r.toPrecision(1)}`);
</script>

<T.DirectionalLight position={[target * 2, target * 1.4, target * 1.6]} intensity={2.4} color="#fff4e6" />
<T.DirectionalLight position={[-target * 2, -target * 0.5, -target]} intensity={0.35} color="#7dd3fc" />

<T.Group bind:ref={turn}>
	<T is={built.group} />
	{#if mode === 'full'}
		{#each model.callouts as c (c.label)}
			<T.Group position={[c.at[0] * built.ext * built.s, c.at[1] * built.ext * built.s, c.at[2] * built.ext * built.s]}>
				<WbLabel id="callout:{c.label}" label={c.label} color="#e2e8f0" selected={false} onpick={() => {}} />
			</T.Group>
		{/each}
	{/if}
</T.Group>

{#if bar}
	<T is={bar.line} />
	<T.Group position={bar.at}>
		<WbLabel id="scalebar" label={bar.label} sub="scale" color="#e2e8f0" selected={false} onpick={() => {}} />
	</T.Group>
{/if}

{#each ghosts as g (g.slot.variant.label + g.slot.variant.model)}
	{@const color = g.slot.variant.model ? MODEL_COLORS[g.slot.variant.model] : '#94a3b8'}
	<T.Group position={g.pos}>
		<T is={g.obj} />
		<T.Group position={[0, -Math.max(g.slot.sceneSize, target * 0.08) * 0.6 - target * 0.05, 0]}>
			<WbLabel
				id="ghost:{g.slot.variant.label}"
				label="{g.slot.variant.model ? `${g.slot.variant.model} · ` : ''}{g.slot.variant.label}"
				sub="{formatLength(g.slot.variant.size)} · {ratioText(g.slot.ratio)}{g.slot.clamped
					? g.slot.clamped === 'up'
						? ' · shown smaller'
						: ' · shown larger'
					: ''}"
				{color}
				dashed
				selected={false}
				onpick={() => {}}
			/>
		</T.Group>
	</T.Group>
{/each}
