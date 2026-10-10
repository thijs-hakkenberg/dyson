<script lang="ts">
	/**
	 * Research Nebula: every research question as a node along the phase axis,
	 * clustered around the BOM item that raised it. Status is the material
	 * (open = haze, investigating = live, answered = crystal); Phase 0
	 * dependencies are conduits and the critical path is a flowing artery.
	 */
	import { T, useTask } from '@threlte/core';
	import { CameraControls, interactivity, type CameraControlsRef } from '@threlte/extras';
	import {
		AdditiveBlending,
		BufferGeometry,
		CanvasTexture,
		Float32BufferAttribute,
		LineBasicMaterial,
		LineCurve3,
		LineSegments,
		MeshBasicMaterial,
		MeshStandardMaterial,
		ShaderMaterial,
		SpriteMaterial,
		SRGBColorSpace,
		TubeGeometry,
		Vector3,
		type Mesh
	} from 'three';
	import WbLabel from '../workbench/WbLabel.svelte';
	import MilkyWay from '../MilkyWay.svelte';
	import { explorer } from '../../core/state.svelte';
	import { nebula } from '../../core/nebulastore.svelte';
	import { downstreamOf, upstreamOf, type NebulaRq } from '../../core/nebula';
	import { getEntity } from '../../core/registry';
	import { PHASE_COLORS, PRIORITY_COLORS, RQ_STATUS_COLORS } from '../../core/theme';
	import { phaseLabel } from '../../core/timeline';
	import { PHASES } from '$lib/services/content';

	interactivity();

	const layout = $derived(nebula.layout);

	// ── Focus sets ───────────────────────────────────────────────────────
	const focusBom = $derived.by(() => {
		const e = getEntity(explorer.selectedId);
		return e?.kind === 'bom' ? e.id : null;
	});
	const focus = $derived.by((): Set<string> | null => {
		if (!layout) return null;
		if (explorer.rqId) {
			const up = new Set<string>([explorer.rqId]);
			const stack = [explorer.rqId];
			const byId = new Map(layout.rqs.map((q) => [q.id, q]));
			while (stack.length) for (const d of byId.get(stack.pop()!)?.dependsOn ?? []) if (!up.has(d)) (up.add(d), stack.push(d));
			for (const d of downstreamOf(explorer.rqId, layout.rqs)) up.add(d);
			return up;
		}
		if (focusBom) return upstreamOf(focusBom, layout.rqs);
		return null;
	});
	const inFocus = (id: string) => !focus || focus.has(id);
	let hovered = $state<string | null>(null);

	// ── Shared textures/materials ───────────────────────────────────────
	function radial(stops: [number, string][]) {
		const c = document.createElement('canvas');
		c.width = c.height = 128;
		const ctx = c.getContext('2d')!;
		const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
		for (const [o, col] of stops) g.addColorStop(o, col);
		ctx.fillStyle = g;
		ctx.fillRect(0, 0, 128, 128);
		const t = new CanvasTexture(c);
		t.colorSpace = SRGBColorSpace;
		return t;
	}
	const glowTex = radial([
		[0, 'rgba(255,255,255,1)'],
		[0.25, 'rgba(255,255,255,0.35)'],
		[1, 'rgba(255,255,255,0)']
	]);
	const hazeTex = radial([
		[0, 'rgba(255,255,255,0.5)'],
		[0.5, 'rgba(255,255,255,0.12)'],
		[1, 'rgba(255,255,255,0)']
	]);

	const SIZE: Record<string, number> = { critical: 0.42, high: 0.34, medium: 0.27, low: 0.22 };

	interface NodeVis {
		q: NebulaRq;
		r: number;
		solid: MeshStandardMaterial | MeshBasicMaterial;
		glow: SpriteMaterial;
	}
	const nodes = $derived.by((): NodeVis[] =>
		(layout?.rqs ?? []).map((q) => {
			const color = RQ_STATUS_COLORS[q.status];
			const r = SIZE[q.priority] ?? 0.25;
			const solid =
				q.status === 'answered'
					? new MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.55, flatShading: true, roughness: 0.25, transparent: true })
					: new MeshBasicMaterial({ color, transparent: true, opacity: q.status === 'open' ? 0.45 : 0.95 });
			const glow = new SpriteMaterial({
				map: q.status === 'open' ? hazeTex : glowTex,
				color,
				transparent: true,
				blending: AdditiveBlending,
				depthWrite: false,
				opacity: q.status === 'open' ? 0.35 : 0.55
			});
			return { q, r, solid, glow };
		})
	);

	// Dim nodes outside the focus set
	$effect(() => {
		for (const n of nodes) {
			const on = inFocus(n.q.id);
			n.solid.opacity = on ? (n.q.status === 'open' ? 0.45 : n.q.status === 'answered' ? 1 : 0.95) : 0.08;
			n.glow.opacity = on ? (n.q.status === 'open' ? 0.35 : 0.55) : 0.04;
		}
	});

	// ── Edges ─────────────────────────────────────────────────────────────
	function segments(kind: string, color: string, opacity: number) {
		const pts: number[] = [];
		for (const e of layout?.edges ?? []) if (e.kind === kind) pts.push(...e.a, ...e.b);
		const g = new BufferGeometry();
		g.setAttribute('position', new Float32BufferAttribute(pts, 3));
		return new LineSegments(g, new LineBasicMaterial({ color, transparent: true, opacity, depthWrite: false }));
	}
	const depLines = $derived(layout ? segments('depends', '#7dd3fc', 0.35) : null);
	const relLines = $derived(layout ? segments('related', '#94a3b8', 0.12) : null);
	const gateLines = $derived(layout ? segments('gate', '#fbbf24', 0.18) : null);
	$effect(() => {
		const dim = !!focus;
		if (depLines) (depLines.material as LineBasicMaterial).opacity = dim ? 0.12 : 0.35;
		if (relLines) (relLines.material as LineBasicMaterial).opacity = dim ? 0.04 : 0.12;
	});

	// Critical path: tubes with light flowing from dependency to dependent
	const arteryMat = new ShaderMaterial({
		uniforms: { uTime: { value: 0 }, uColor: { value: new Vector3(0.97, 0.44, 0.44) } },
		vertexShader: /* glsl */ `
			#include <common>
			#include <logdepthbuf_pars_vertex>
			varying vec2 vUv;
			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				#include <logdepthbuf_vertex>
			}`,
		fragmentShader: /* glsl */ `
			#include <common>
			#include <logdepthbuf_pars_fragment>
			uniform float uTime;
			uniform vec3 uColor;
			varying vec2 vUv;
			void main() {
				#include <logdepthbuf_fragment>
				float pulse = pow(fract(vUv.x * 2.0 - uTime * 0.6), 6.0);
				gl_FragColor = vec4(uColor * (0.45 + 1.6 * pulse), 0.75);
			}`,
		transparent: true,
		depthWrite: false,
		blending: AdditiveBlending
	});
	const arteries = $derived(
		(layout?.edges ?? [])
			.filter((e) => e.kind === 'critical')
			.map((e) => new TubeGeometry(new LineCurve3(new Vector3(...e.a), new Vector3(...e.b)), 1, 0.07, 6))
	);

	// ── Camera ────────────────────────────────────────────────────────────
	let controls = $state.raw<CameraControlsRef>();
	let framed = false;
	$effect(() => {
		if (!controls || framed) return;
		framed = true;
		controls.minDistance = 2;
		controls.maxDistance = 200;
		controls.smoothTime = 0.6;
		controls.setLookAt(-30, 30, 75, 2, -2, 0, false);
		controls.setLookAt(-2, 28, 95, -2, -2, 0, true);
	});
	// Fly to the selected question
	let flownTo = '';
	$effect(() => {
		const id = explorer.rqId;
		const q = layout?.rqs.find((x) => x.id === id);
		if (!controls || !q || flownTo === id) return;
		flownTo = id!;
		const [x, y, z] = q.pos;
		controls.setLookAt(x + 5, y + 4, z + 13, x + 2.5, y, z, true);
	});

	// Fly to the traced BOM cluster
	let flownBom = '';
	$effect(() => {
		const id = focusBom;
		const a = layout?.anchors.find((x) => x.bomId === id);
		if (!controls || !a || explorer.rqId || flownBom === id) return;
		flownBom = id!;
		const [x, y, z] = a.pos;
		controls.setLookAt(x + 4, y + 9, z + 26, x + 3, y, z, true);
	});

	let t = 0;
	const pulsing: Mesh[] = [];
	useTask((dt) => {
		t += dt;
		arteryMat.uniforms.uTime.value = t;
		const s = 1 + 0.18 * Math.sin(t * 3);
		for (const m of pulsing) m.scale.setScalar(s);
	});
	function track(m: Mesh | undefined, on: boolean) {
		if (m && on && !pulsing.includes(m)) pulsing.push(m);
	}

	const phaseName = (id: string) => {
		const p = PHASES.find((x) => x.id === id);
		return p ? `${phaseLabel(p)} · ${p.title}` : id;
	};
</script>

<T.PerspectiveCamera makeDefault fov={45} near={0.05} far={4000} position={[-30, 30, 75]}>
	<CameraControls bind:ref={controls} />
</T.PerspectiveCamera>

{#if explorer.layers.sky}<MilkyWay intensity={0.25} />{/if}
<T.AmbientLight intensity={0.6} />
<T.PointLight position={[0, 30, 30]} intensity={400} decay={1.4} />

{#if layout}
	<!-- Phase axis and segment gates -->
	<T.Mesh rotation.z={Math.PI / 2} position={[3, 0, 0]}>
		<T.CylinderGeometry args={[0.02, 0.02, 90, 6]} />
		<T.MeshBasicMaterial color="#334155" />
	</T.Mesh>
	{#each layout.segments as seg (seg.phaseId)}
		<T.Mesh position={[seg.x0 - 1.5, seg.yOffset, 0]} rotation.y={Math.PI / 2}>
			<T.TorusGeometry args={[seg.yOffset ? 5 : 9, 0.03, 6, 96]} />
			<T.MeshBasicMaterial color={PHASE_COLORS[seg.phaseId]} transparent opacity={0.45} />
		</T.Mesh>
		<T.Group position={[seg.x0 - 1.5, seg.yOffset + (seg.yOffset ? 5.6 : 9.6), 0]}>
			<WbLabel id="seg:{seg.phaseId}" label={phaseName(seg.phaseId)} color={PHASE_COLORS[seg.phaseId]} onpick={() => {}} selected={false} />
		</T.Group>
	{/each}

	<!-- Nebula gas around each BOM cluster -->
	{#each layout.anchors as a (a.bomId)}
		{#if a.rqCount}
			<T.Sprite position={a.pos} scale={[6 + a.rqCount * 1.2, 6 + a.rqCount * 1.2, 1]}>
				<T.SpriteMaterial map={hazeTex} color={PHASE_COLORS[a.phaseId]} transparent opacity={focus ? 0.06 : 0.22} blending={AdditiveBlending} depthWrite={false} />
			</T.Sprite>
		{/if}
		<T.Mesh position={a.pos}>
			<T.OctahedronGeometry args={[0.18]} />
			<T.MeshBasicMaterial color={PHASE_COLORS[a.phaseId]} transparent opacity={focusBom && focusBom !== a.bomId ? 0.3 : 0.9} />
		</T.Mesh>
		{#if a.rqCount && (!focusBom || focusBom === a.bomId)}
			<T.Group position={a.pos}>
				<WbLabel
					id="bom:{a.bomId}"
					label={a.name}
					sub="{a.rqCount} questions"
					color={PHASE_COLORS[a.phaseId]}
					quiet={!focusBom}
					selected={focusBom === a.bomId}
					onpick={() => explorer.select(focusBom === a.bomId ? null : a.bomId, { focus: false })}
				/>
			</T.Group>
		{/if}
	{/each}

	<!-- Edges -->
	{#if depLines}<T is={depLines} />{/if}
	{#if relLines}<T is={relLines} />{/if}
	{#if gateLines}<T is={gateLines} />{/if}
	{#each arteries as g, i (i)}<T.Mesh geometry={g} material={arteryMat} />{/each}

	<!-- Decision gates: ring fill = share of criteria met -->
	{#each layout.gates as g (g.gate.id)}
		<T.Group position={g.pos} rotation.y={Math.PI / 2}>
			<T.Mesh>
				<T.TorusGeometry args={[0.9, 0.05, 8, 64]} />
				<T.MeshBasicMaterial color="#475569" transparent opacity={0.6} />
			</T.Mesh>
			{#if g.readiness > 0}
				<T.Mesh>
					<T.TorusGeometry args={[0.9, 0.09, 8, 64, Math.PI * 2 * g.readiness]} />
					<T.MeshBasicMaterial color="#34d399" />
				</T.Mesh>
			{/if}
		</T.Group>
		<T.Group position={g.pos}>
			<WbLabel
				id="gate:{g.gate.id}"
				label={g.gate.name}
				sub="{Math.round(g.readiness * 100)}% criteria met"
				color="#fbbf24"
				dashed
				quiet
				selected={false}
				onpick={() => {}}
			/>
		</T.Group>
	{/each}

	<!-- Questions -->
	{#each nodes as n (n.q.id)}
		{@const showLabel = explorer.rqId === n.q.id || hovered === n.q.id || (!!focus && focus.size <= 40 && focus.has(n.q.id))}
		<T.Sprite position={n.q.pos} scale={[n.r * (n.q.status === 'open' ? 7 : 5), n.r * (n.q.status === 'open' ? 7 : 5), 1]} material={n.glow} />
		{#if n.q.criticalPath}
			<T.Sprite position={n.q.pos} scale={[n.r * 8, n.r * 8, 1]}>
				<T.SpriteMaterial map={glowTex} color="#f87171" transparent opacity={inFocus(n.q.id) ? 0.35 : 0.03} blending={AdditiveBlending} depthWrite={false} />
			</T.Sprite>
		{/if}
		<T.Mesh
			position={n.q.pos}
			material={n.solid}
			oncreate={(m) => track(m, n.q.status === 'investigating')}
			onclick={(e: { stopPropagation: () => void }) => {
				e.stopPropagation();
				explorer.rqId = explorer.rqId === n.q.id ? null : n.q.id;
			}}
			onpointerenter={() => (hovered = n.q.id)}
			onpointerleave={() => hovered === n.q.id && (hovered = null)}
		>
			{#if n.q.status === 'answered'}
				<T.IcosahedronGeometry args={[n.r, 0]} />
			{:else if n.q.status === 'investigating'}
				<T.OctahedronGeometry args={[n.r * 0.85]} />
			{:else}
				<T.SphereGeometry args={[n.r * 0.6, 12, 8]} />
			{/if}
		</T.Mesh>
		{#if showLabel}
			<T.Group position={n.q.pos}>
				<WbLabel
					id="rq:{n.q.id}"
					label="{n.q.id.toUpperCase()} {n.q.title}"
					sub="{n.q.status} · {n.q.priority}{n.q.criticalPath ? ' · critical path' : ''}"
					color={n.q.criticalPath ? PRIORITY_COLORS.critical : RQ_STATUS_COLORS[n.q.status]}
					selected={explorer.rqId === n.q.id}
					onpick={() => (explorer.rqId = explorer.rqId === n.q.id ? null : n.q.id)}
				/>
			</T.Group>
		{/if}
	{/each}
{/if}
