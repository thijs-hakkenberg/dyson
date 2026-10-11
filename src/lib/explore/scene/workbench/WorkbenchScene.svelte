<script lang="ts">
	/**
	 * BOM Workbench scene: the consensus core of one BOM item, the model specs
	 * orbiting it, and its divergent views as forks. Layout comes from
	 * core/workbench.ts; long text lives in the DOM inspector, not in 3D.
	 */
	import { T, useTask } from '@threlte/core';
	import { CameraControls, type CameraControlsRef } from '@threlte/extras';
	import {
		AdditiveBlending,
		BufferGeometry,
		Color,
		Line,
		LineBasicMaterial,
		LineDashedMaterial,
		MeshBasicMaterial,
		QuadraticBezierCurve3,
		SRGBColorSpace,
		TextureLoader,
		TubeGeometry,
		Vector3,
		LineCurve3,
		type Group,
		type Texture
	} from 'three';
	import WbLabel from './WbLabel.svelte';
	import MilkyWay from '../MilkyWay.svelte';
	import { explorer } from '../../core/state.svelte';
	import { wb } from '../../core/wbstore.svelte';
	import { MODEL_COLORS, PHASE_COLORS, PRIORITY_COLORS, RQ_STATUS_COLORS } from '../../core/theme';
	import type { Vec3 } from '../../core/registry';
	import type { WbFork } from '../../core/workbench';
	import ElementModelView from '../models/ElementModelView.svelte';
	import { elementModel, GHOST_MAX_RATIO } from '../../core/models';

	const layout = $derived(wb.layout);
	const data = $derived(wb.data);
	const coreColor = $derived(data ? (PHASE_COLORS[data.phaseId] ?? '#7dd3fc') : '#7dd3fc');
	const sel = $derived(explorer.wbSelection);
	const em = $derived(elementModel(explorer.workbenchId));
	const modelView = $derived(explorer.wbView === 'model' && !!em);
	/** Scene size of the main model in model view */
	const FULL = 6;
	/** Look target in model view: shifted right when a ghost line-up exists */
	const modelFrame = $derived.by(() => {
		if (!em) return { x: 0, dist: 15 };
		let w = FULL * 0.75;
		for (const v of em.variants) {
			const r = Math.min(GHOST_MAX_RATIO, Math.max(0.06, v.size / em.params.size));
			w += Math.max(FULL * r, FULL * 0.08) + FULL * 0.15;
		}
		const span = em.variants.length ? FULL * 0.5 + w : FULL;
		const x = em.variants.length ? (w - FULL * 0.5) / 2 : 0;
		return { x, dist: Math.max(13, span * 1.25) };
	});

	const v = (p: Vec3) => new Vector3(p[0], p[1], p[2]);

	// ── Camera: fly in whenever a new item opens ─────────────────────────
	let controls = $state.raw<CameraControlsRef>();
	let flownFor = '';
	$effect(() => {
		const id = explorer.workbenchId;
		const key = `${id}:${modelView}`;
		if (!controls || !id || flownFor === key) return;
		const first = !flownFor.startsWith(`${id}:`);
		flownFor = key;
		controls.minDistance = modelView ? 1.5 : 4;
		controls.maxDistance = 80;
		controls.smoothTime = 0.6;
		if (modelView) {
			const { x, dist } = modelFrame;
			if (first) controls.setLookAt(x + dist * 1.2, dist * 0.7, dist * 1.6, x, 0, 0, false);
			controls.setLookAt(x + dist * 0.55, dist * 0.38, dist * 0.85, x, 0, 0, true);
		} else {
			if (first) controls.setLookAt(2, 9, 48, 0, 0, 0, false);
			controls.setLookAt(4, 11, 27, 1.6, -1, 0, true);
		}
	});

	// Scripted camera moves (tours) around the current look target
	let appliedCmd = 0;
	useTask(() => {
		const cmd = explorer.cameraCmd;
		if (!cmd || cmd.seq === appliedCmd || !controls) return;
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
	});

	// ── Geometry built from the layout ────────────────────────────────────
	const forkSelected = (f: WbFork) => !!sel && (sel === f.id || sel.startsWith(`${f.id}:`));
	// When a fork (or one of its positions) is selected, the others recede
	const anyForkSelected = $derived(!!layout?.forks.some((f) => forkSelected(f)));
	const dimmed = (f: WbFork) => anyForkSelected && !forkSelected(f);

	const STEM_RADIUS: Record<string, number> = { critical: 0.05, high: 0.04, medium: 0.028, low: 0.02 };

	const forkGeo = $derived.by(() => {
		if (!layout) return [];
		return layout.forks.map((f) => {
			const stemEnd = v(f.stem);
			const start = stemEnd.clone().normalize().multiplyScalar(1.05);
			const stem = new TubeGeometry(new LineCurve3(start, stemEnd), 1, STEM_RADIUS[f.priority], 6);
			const outward = stemEnd.clone().normalize();
			const branches = f.positions.map((p) => {
				const end = v(p.pos);
				const ctrl = stemEnd.clone().add(outward.clone().multiplyScalar(0.7));
				const pts = new QuadraticBezierCurve3(stemEnd, ctrl, end).getPoints(24);
				const color = p.models.length === 1 ? MODEL_COLORS[p.models[0]] : '#cbd5e1';
				const line = new Line(
					new BufferGeometry().setFromPoints(pts),
					new LineDashedMaterial({ color, dashSize: 0.14, gapSize: 0.09, transparent: true, opacity: 0.9 })
				);
				line.computeLineDistances();
				return { line, color, end };
			});
			return { f, stem, branches };
		});
	});

	const tethers = $derived.by(() => {
		if (!layout) return [];
		return layout.satellites.map((s) => {
			const g = new BufferGeometry().setFromPoints([v(s.pos).multiplyScalar(0.18), v(s.pos).multiplyScalar(0.93)]);
			return new Line(
				g,
				new LineBasicMaterial({ color: MODEL_COLORS[s.family], transparent: true, opacity: 0.22 })
			);
		});
	});

	// Fade fork materials for unselected forks
	$effect(() => {
		for (const fg of forkGeo) {
			const o = dimmed(fg.f) ? 0.15 : 0.9;
			for (const b of fg.branches) (b.line.material as LineDashedMaterial).opacity = o;
		}
	});

	// ── Blueprint hologram ───────────────────────────────────────────────
	let blueprint = $state.raw<{ tex: Texture; aspect: number } | null>(null);
	$effect(() => {
		const url = data?.blueprintUrl;
		blueprint = null;
		if (!url) return;
		new TextureLoader().load(url, (t) => {
			t.colorSpace = SRGBColorSpace;
			const img = t.image as HTMLImageElement;
			blueprint = { tex: t, aspect: img.width / Math.max(1, img.height) };
		});
	});

	// ── Animation ─────────────────────────────────────────────────────────
	let coreWire = $state.raw<Group>();
	let pulse = 0;
	const pulseMats: MeshBasicMaterial[] = [];
	useTask((dt) => {
		pulse += dt;
		if (coreWire) {
			coreWire.rotation.y += dt * 0.12;
			coreWire.rotation.x = Math.sin(pulse * 0.2) * 0.15;
		}
		const k = 0.45 + 0.35 * Math.sin(pulse * 3);
		for (const m of pulseMats) m.opacity = k;
	});
	// One material per RQ, rebuilt with the layout; investigating ones pulse
	const rqMats = $derived.by(() => {
		pulseMats.length = 0;
		return (layout?.rqs ?? []).map((r) => {
			const m = new MeshBasicMaterial({
				color: RQ_STATUS_COLORS[r.q.status] ?? '#64748b',
				transparent: true,
				opacity: r.q.status === 'answered' ? 1 : 0.6,
				wireframe: r.q.status === 'open'
			});
			if (r.q.status === 'investigating') pulseMats.push(m);
			return m;
		});
	});

	const TRL_X = -14;
</script>

<T.PerspectiveCamera makeDefault fov={45} near={0.01} far={2000} position={[2, 9, 48]}>
	<CameraControls bind:ref={controls} />
</T.PerspectiveCamera>

{#if explorer.layers.sky}<MilkyWay intensity={0.22} />{/if}
<T.AmbientLight intensity={0.5} />
<T.PointLight position={[6, 8, 10]} intensity={60} decay={1.5} />

<!-- Holographic deck grid -->
<T.GridHelper args={[80, 80, '#1e3a5f', '#0f2238']} position.y={modelView ? -4.6 : -9.5} />

{#if modelView && em}
	<!-- Detailed element model with divergent ghosts and scale bar -->
	{#key em.bomId}<ElementModelView model={em} target={FULL} mode="full" spin={0.06} />{/key}
{:else if layout && data}
	<!-- Consensus core: the element model (or a lattice for non-physical items) in a translucent halo -->
	{#if em}
		{#key em.bomId}<ElementModelView model={em} target={1.8} mode="mini" />{/key}
		<T.Mesh>
			<T.SphereGeometry args={[1.15, 48, 24]} />
			<T.MeshBasicMaterial color={coreColor} transparent opacity={0.07} blending={AdditiveBlending} depthWrite={false} />
		</T.Mesh>
	{:else}
		<T.Mesh>
			<T.SphereGeometry args={[0.72, 48, 24]} />
			<T.MeshBasicMaterial color={coreColor} transparent opacity={0.35} blending={AdditiveBlending} depthWrite={false} />
		</T.Mesh>
		<T.Group bind:ref={coreWire}>
			<T.Mesh>
				<T.IcosahedronGeometry args={[1, 1]} />
				<T.MeshBasicMaterial color={coreColor} wireframe transparent opacity={0.55} />
			</T.Mesh>
		</T.Group>
	{/if}
	<T.Mesh>
		<T.SphereGeometry args={[1.45, 48, 24]} />
		<T.MeshBasicMaterial color={coreColor} transparent opacity={0.05} blending={AdditiveBlending} depthWrite={false} />
	</T.Mesh>
	<T.Group position={[0, 1.7, 0]}>
		<WbLabel id="core" label={data.name} sub="Consensus core · {layout.specs.length} agreed specs" color={coreColor} />
	</T.Group>

	<!-- Agreed key specs -->
	{#each layout.specs as s (s.id)}
		<T.Mesh position={s.pos}>
			<T.OctahedronGeometry args={[0.09]} />
			<T.MeshBasicMaterial color={coreColor} />
		</T.Mesh>
		<T.Group position={s.pos}>
			<WbLabel id={s.id} label={s.text.replace(/\*\*/g, '').slice(0, 90)} color={coreColor} quiet />
		</T.Group>
	{/each}

	<!-- Model satellites with provenance tethers -->
	{#each tethers as t, i (i)}<T is={t} />{/each}
	{#each layout.satellites as s (s.id)}
		<T.Group position={s.pos}>
			<T.Mesh>
				<T.SphereGeometry args={[0.38, 32, 16]} />
				<T.MeshStandardMaterial color={MODEL_COLORS[s.family]} emissive={MODEL_COLORS[s.family]} emissiveIntensity={0.35} roughness={0.4} />
			</T.Mesh>
			<T.Mesh rotation.x={Math.PI / 2}>
				<T.TorusGeometry args={[0.62, 0.012, 8, 64]} />
				<T.MeshBasicMaterial color={MODEL_COLORS[s.family]} transparent opacity={0.6} />
			</T.Mesh>
			<WbLabel id={s.id} label={s.modelName} sub={s.generated} color={MODEL_COLORS[s.family]} />
		</T.Group>
	{/each}

	<!-- Divergence forks -->
	{#each forkGeo as fg (fg.f.id)}
		{@const c = PRIORITY_COLORS[fg.f.priority]}
		<T.Mesh geometry={fg.stem}>
			<T.MeshBasicMaterial color={c} transparent opacity={dimmed(fg.f) ? 0.2 : 0.9} />
		</T.Mesh>
		<T.Mesh position={fg.f.stem}>
			<T.OctahedronGeometry args={[0.14]} />
			<T.MeshBasicMaterial color={c} />
		</T.Mesh>
		<T.Group position={fg.f.stem}>
			<WbLabel id={fg.f.id} label={fg.f.topic.topic} sub="{fg.f.priority} · {fg.f.positions.length} positions" color={c} dashed />
		</T.Group>
		{#each fg.branches as b, j (j)}
			<T is={b.line} />
			<T.Mesh position={[b.end.x, b.end.y, b.end.z]}>
				<T.SphereGeometry args={[0.08, 12, 8]} />
				<T.MeshBasicMaterial color={b.color} transparent opacity={dimmed(fg.f) ? 0.2 : 1} />
			</T.Mesh>
			{#if forkSelected(fg.f)}
				<T.Group position={[b.end.x, b.end.y, b.end.z]}>
					<WbLabel
						id={fg.f.positions[j].id}
						label={fg.f.positions[j].models.join(' · ') || 'Position'}
						color={b.color}
						dashed
					/>
				</T.Group>
			{/if}
		{/each}
	{/each}

	<!-- Open questions: dim haze around the core -->
	{#each layout.open as q (q.id)}
		<T.Mesh position={q.pos}>
			<T.IcosahedronGeometry args={[0.07, 0]} />
			<T.MeshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.6} />
		</T.Mesh>
		<T.Group position={q.pos}>
			<WbLabel id={q.id} label={q.text.replace(/\*\*/g, '').slice(0, 90)} color="#fbbf24" quiet />
		</T.Group>
	{/each}

	<!-- Linked research questions: status as material -->
	{#each layout.rqs as r, i (r.id)}
		<T.Mesh position={r.pos} material={rqMats[i]}>
			<T.OctahedronGeometry args={[0.22]} />
		</T.Mesh>
		<T.Group position={r.pos}>
			<WbLabel id={r.id} label={r.q.questionId.toUpperCase()} sub={r.q.status} color={RQ_STATUS_COLORS[r.q.status]} />
		</T.Group>
	{/each}

	<!-- TRL gauges: solid = current, outline = target -->
	{#each data.trl as t, i (t.id)}
		{@const x = TRL_X + i * 1.1}
		{#each Array(9) as _, lvl (lvl)}
			{@const filled = lvl < t.currentTRL}
			{@const target = lvl < t.targetTRL}
			<T.Mesh position={[x, -8 + lvl * 0.62, -2]}>
				<T.BoxGeometry args={[0.7, 0.5, 0.15]} />
				<T.MeshBasicMaterial
					color={filled ? '#34d399' : target ? '#fbbf24' : '#1e293b'}
					transparent
					opacity={filled ? 0.9 : target ? 0.25 : 0.2}
					wireframe={!filled}
				/>
			</T.Mesh>
		{/each}
		<T.Group position={[x, -8 + 9 * 0.62, -2]}>
			<WbLabel id="trl:{t.id}" label="TRL {t.currentTRL}→{t.targetTRL}" sub={t.technology} color="#34d399" />
		</T.Group>
	{/each}

	{#if blueprint}
		<T.Mesh position={[0, 0.5, -16]}>
			<T.PlaneGeometry args={[24, 24 / blueprint.aspect]} />
			<T.MeshBasicMaterial
				map={blueprint.tex}
				transparent
				opacity={0.55}
				blending={AdditiveBlending}
				depthWrite={false}
				color={new Color('#9fd8ff')}
			/>
		</T.Mesh>
	{/if}
{/if}
