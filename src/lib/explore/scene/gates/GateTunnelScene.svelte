<script lang="ts">
	/**
	 * Gate Tunnel: fly down Phase 0's decision timeline. Gates are rings whose
	 * arc segments are criteria (lit = met). Technology columns stand on the
	 * floor in thread lanes at their projected target-TRL month; links to the
	 * gates they feed turn red when the technology arrives too late.
	 */
	import { T, useTask } from '@threlte/core';
	import { CameraControls, interactivity, type CameraControlsRef } from '@threlte/extras';
	import {
		AdditiveBlending,
		BufferGeometry,
		CatmullRomCurve3,
		Float32BufferAttribute,
		LineBasicMaterial,
		LineSegments,
		ShaderMaterial,
		TubeGeometry,
		Vector3
	} from 'three';
	import WbLabel from '../workbench/WbLabel.svelte';
	import MilkyWay from '../MilkyWay.svelte';
	import { explorer, TODAY_YEAR } from '../../core/state.svelte';
	import { FLOOR_Y, TRL_UNIT, TUNNEL_RADIUS, layoutTunnel, monthToZ, phase0MonthToYear } from '../../core/gates';
	import { RISK_LABELS } from '$lib/services/trl-assessment';

	interactivity();

	const L = layoutTunnel(TODAY_YEAR);
	const sel = $derived(explorer.gateSel);
	const selGate = $derived(L.gates.find((g) => g.gate.id === sel));
	const selTech = $derived(sel?.startsWith('trl:') ? L.techs.find((t) => `trl:${t.trl.id}` === sel) : undefined);
	const related = (gateId: string, techId: string) =>
		(selGate && selGate.gate.id === gateId) || (selTech && selTech.trl.id === techId);

	// ── Tunnel shell: longitudinal ribs + month rings every 6 months ─────
	const z0 = monthToZ(L.startMonth - 4);
	const z1 = monthToZ(L.endMonth);
	const shell = (() => {
		const pts: number[] = [];
		const ribs = 24;
		for (let i = 0; i < ribs; i++) {
			const a = (i / ribs) * Math.PI * 2;
			const x = Math.cos(a) * TUNNEL_RADIUS * 1.25;
			const y = Math.sin(a) * TUNNEL_RADIUS * 1.25;
			pts.push(x, y, z0, x, y, z1);
		}
		for (let m = Math.ceil(L.startMonth / 6) * 6; m <= L.endMonth; m += 6) {
			const z = monthToZ(m);
			const seg = 64;
			for (let i = 0; i < seg; i++) {
				const a0 = (i / seg) * Math.PI * 2;
				const a1 = ((i + 1) / seg) * Math.PI * 2;
				const r = TUNNEL_RADIUS * 1.25;
				pts.push(Math.cos(a0) * r, Math.sin(a0) * r, z, Math.cos(a1) * r, Math.sin(a1) * r, z);
			}
		}
		const g = new BufferGeometry();
		g.setAttribute('position', new Float32BufferAttribute(pts, 3));
		return new LineSegments(g, new LineBasicMaterial({ color: '#1e3a5f', transparent: true, opacity: 0.45 }));
	})();

	// Floor lane guides
	const laneLines = (() => {
		const pts: number[] = [];
		for (const l of L.lanes) pts.push(l.x, FLOOR_Y, z0, l.x, FLOOR_Y, z1);
		const g = new BufferGeometry();
		g.setAttribute('position', new Float32BufferAttribute(pts, 3));
		return new LineSegments(g, new LineBasicMaterial({ color: '#334155', transparent: true, opacity: 0.6 }));
	})();

	const yearMarks = (() => {
		const out: { m: number; label: string }[] = [];
		const y0 = Math.ceil(phase0MonthToYear(L.startMonth));
		for (let y = y0; phase0MonthToYear(L.endMonth) >= y; y++) out.push({ m: (y - phase0MonthToYear(0)) * 12, label: String(y) });
		return out;
	})();

	// ── Gate→technology links: arcs from the column top up to the gate ring ─
	const linkMat = (late: boolean) =>
		new ShaderMaterial({
			uniforms: { uTime: { value: 0 }, uColor: { value: late ? new Vector3(0.97, 0.3, 0.3) : new Vector3(0.2, 0.83, 0.6) } },
			vertexShader: /* glsl */ `
				#include <common>
				#include <logdepthbuf_pars_vertex>
				varying vec2 vUv;
				void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); #include <logdepthbuf_vertex> }`,
			fragmentShader: /* glsl */ `
				#include <common>
				#include <logdepthbuf_pars_fragment>
				uniform float uTime; uniform vec3 uColor; varying vec2 vUv;
				void main() {
					#include <logdepthbuf_fragment>
					float p = pow(fract(vUv.x * 3.0 - uTime * 0.5), 8.0);
					gl_FragColor = vec4(uColor * (0.5 + 1.5 * p), 0.8);
				}`,
			transparent: true,
			depthWrite: false,
			blending: AdditiveBlending
		});
	const links = L.links.map((l) => {
		const g = L.gates.find((x) => x.gate.id === l.gateId)!;
		const t = L.techs.find((x) => x.trl.id === l.techId)!;
		const top = new Vector3(t.x, FLOOR_Y + t.trl.currentTRL * TRL_UNIT, t.z);
		const ring = new Vector3(t.x, FLOOR_Y, 0).setLength(TUNNEL_RADIUS);
		ring.z = g.z;
		const mid = top.clone().lerp(ring, 0.5).add(new Vector3(0, 1.5, 0));
		return {
			...l,
			geo: new TubeGeometry(new CatmullRomCurve3([top, mid, ring]), 24, 0.035, 5),
			mat: linkMat(l.late)
		};
	});

	// ── Camera ────────────────────────────────────────────────────────────
	let controls = $state.raw<CameraControlsRef>();
	let framed = false;
	$effect(() => {
		if (!controls || framed) return;
		framed = true;
		controls.minDistance = 1;
		controls.maxDistance = 140;
		controls.smoothTime = 0.7;
		const zs = monthToZ(L.startMonth - 8);
		controls.setLookAt(0, 1.5, zs + 10, 0, 0, zs - 30, false);
		// Side-on overview so the tunnel reads left → right as a timeline
		const zm = monthToZ((L.startMonth + L.endMonth) / 2);
		controls.setLookAt(34, 10, zm + 6, 0, -1, zm, true);
	});
	// Fly to the selected gate or technology
	let flownTo = '';
	$effect(() => {
		const id = sel;
		if (!controls || !id || flownTo === id) return;
		flownTo = id;
		if (selGate) controls.setLookAt(5, 3, selGate.z + 14, 0, -0.5, selGate.z, true);
		else if (selTech) controls.setLookAt(selTech.x + 5, FLOOR_Y + 6, selTech.z + 9, selTech.x, FLOOR_Y + 2, selTech.z, true);
	});

	let time = 0;
	useTask((dt) => {
		time += dt;
		for (const l of links) l.mat.uniforms.uTime.value = time;
	});

	const pickGate = (id: string) => (explorer.gateSel = explorer.gateSel === id ? null : id);
	const arcLen = (n: number) => (Math.PI * 2) / Math.max(1, n);
</script>

<T.PerspectiveCamera makeDefault fov={50} near={0.05} far={2000}>
	<CameraControls bind:ref={controls} />
</T.PerspectiveCamera>

{#if explorer.layers.sky}<MilkyWay intensity={0.18} />{/if}
<T.AmbientLight intensity={0.7} />
<T.PointLight position={[0, 4, monthToZ(10)]} intensity={200} decay={1.3} />

<T is={shell} />
<T is={laneLines} />

<!-- Year markers on the tunnel ceiling -->
{#each yearMarks as y (y.m)}
	<T.Group position={[-TUNNEL_RADIUS * 1.1, TUNNEL_RADIUS * 0.75, monthToZ(y.m)]}>
		<WbLabel id="year:{y.label}" label={y.label} color="#475569" quiet={false} selected={false} onpick={() => {}} />
	</T.Group>
{/each}

<!-- Today plane -->
<T.Mesh position={[0, 0, monthToZ(L.todayMonth)]}>
	<T.TorusGeometry args={[TUNNEL_RADIUS * 1.25, 0.05, 6, 96]} />
	<T.MeshBasicMaterial color="#fbbf24" transparent opacity={0.7} />
</T.Mesh>
<T.Group position={[TUNNEL_RADIUS * 0.9, TUNNEL_RADIUS * 0.95, monthToZ(L.todayMonth)]}>
	<WbLabel id="today" label="Today" sub="knowledge clock" color="#fbbf24" selected={false} onpick={() => {}} />
</T.Group>
<T.Group position={[TUNNEL_RADIUS * 0.9, TUNNEL_RADIUS * 0.95, monthToZ(0)]}>
	<WbLabel id="p0" label="Phase 0 start" sub="assumed 2030" color="#f0a830" selected={false} onpick={() => {}} />
</T.Group>

<!-- Lanes -->
{#each L.lanes as l (l.threadId)}
	<T.Group position={[l.x, FLOOR_Y - 0.4, monthToZ(L.startMonth - 3)]}>
		<WbLabel id="lane:{l.threadId}" label={l.name} color={l.color} quiet selected={false} onpick={() => {}} />
	</T.Group>
{/each}

<!-- Gates -->
{#each L.gates as g, gi (g.gate.id)}
	{@const n = g.gate.criteria.length}
	{@const active = !sel || sel === g.gate.id || (selTech && g.gate.relatedTRLIds.includes(selTech.trl.id))}
	<T.Group position={[0, 0, g.z]}>
		{#each g.gate.criteria as c, i (c.id)}
			<T.Mesh
				rotation.z={i * arcLen(n) + Math.PI / 2}
				onclick={(e: { stopPropagation: () => void }) => {
					e.stopPropagation();
					pickGate(g.gate.id);
				}}
			>
				<T.TorusGeometry args={[TUNNEL_RADIUS, c.met ? 0.16 : 0.1, 8, 48, arcLen(n) * 0.92]} />
				<T.MeshBasicMaterial
					color={c.met ? '#34d399' : g.late.length ? '#f87171' : '#64748b'}
					transparent
					opacity={active ? (c.met ? 1 : 0.75) : 0.15}
				/>
			</T.Mesh>
		{/each}
		<!-- Translucent membrane: you have to pass through the gate -->
		<T.Mesh>
			<T.CircleGeometry args={[TUNNEL_RADIUS * 0.98, 64]} />
			<T.MeshBasicMaterial color={g.late.length ? '#f87171' : '#7dd3fc'} transparent opacity={sel === g.gate.id ? 0.08 : 0.03} depthWrite={false} side={2} />
		</T.Mesh>
	</T.Group>
	<T.Group position={[0, TUNNEL_RADIUS + 0.6 + (gi % 3) * 2.2, g.z]}>
		<WbLabel
			id={g.gate.id}
			label={g.gate.name}
			sub="month {g.gate.decisionMonth} · {Math.round(g.readiness * 100)}% criteria met{g.late.length ? ` · ${g.late.length} tech late` : ''}"
			color={g.late.length ? '#f87171' : '#fbbf24'}
			selected={sel === g.gate.id}
			onpick={() => pickGate(g.gate.id)}
		/>
	</T.Group>
{/each}

<!-- Technology columns: solid = current TRL, outline = target -->
{#each L.techs as t (t.trl.id)}
	{@const on = !sel || sel === `trl:${t.trl.id}` || (selGate && selGate.gate.relatedTRLIds.includes(t.trl.id))}
	{@const risk = RISK_LABELS[t.trl.riskIfFail]?.color ?? '#94a3b8'}
	<T.Group position={[t.x, FLOOR_Y, t.z]}>
		{#each Array(9) as _, lvl (lvl)}
			{@const filled = lvl < t.trl.currentTRL}
			{@const target = lvl < t.trl.targetTRL}
			{#if filled || target}
				<T.Mesh
					position={[0, (lvl + 0.5) * TRL_UNIT, 0]}
					onclick={(e: { stopPropagation: () => void }) => {
						e.stopPropagation();
						explorer.gateSel = explorer.gateSel === `trl:${t.trl.id}` ? null : `trl:${t.trl.id}`;
					}}
				>
					<T.BoxGeometry args={[0.4, TRL_UNIT * 0.86, 0.4]} />
					<T.MeshBasicMaterial color={filled ? t.threadColor : risk} wireframe={!filled} transparent opacity={on ? (filled ? 0.95 : 0.55) : 0.1} />
				</T.Mesh>
			{/if}
		{/each}
		<!-- Pessimistic arrival: a dashed run along the floor -->
		{#if t.arrivalMax > t.arrival}
			<T.Mesh position={[0, 0.02, (monthToZ(t.arrivalMax) - t.z) / 2]} rotation.x={-Math.PI / 2}>
				<T.PlaneGeometry args={[0.12, Math.abs(monthToZ(t.arrivalMax) - t.z)]} />
				<T.MeshBasicMaterial color={t.threadColor} transparent opacity={on ? 0.35 : 0.06} />
			</T.Mesh>
		{/if}
	</T.Group>
	{#if on && (sel || t.trl.riskIfFail === 'project-ending')}
		<T.Group position={[t.x, FLOOR_Y + t.trl.targetTRL * TRL_UNIT + 0.4, t.z]}>
			<WbLabel
				id="trl:{t.trl.id}"
				label={t.trl.technology}
				sub="TRL {t.trl.currentTRL}→{t.trl.targetTRL} · {Math.round(phase0MonthToYear(t.arrival))}"
				color={t.threadColor}
				selected={sel === `trl:${t.trl.id}`}
				onpick={() => (explorer.gateSel = explorer.gateSel === `trl:${t.trl.id}` ? null : `trl:${t.trl.id}`)}
			/>
		</T.Group>
	{/if}
{/each}

<!-- Dependencies -->
{#each links as l (l.gateId + l.techId)}
	{#if !sel || related(l.gateId, l.techId)}
		<T.Mesh geometry={l.geo} material={l.mat} />
	{/if}
{/each}
