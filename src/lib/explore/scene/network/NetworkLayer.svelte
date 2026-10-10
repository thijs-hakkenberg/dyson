<script lang="ts">
	/**
	 * Network overlay on the orrery: links coloured by class, with pulses that
	 * travel each link at SIGNAL_SPEEDUP × the speed of light (labelled in the
	 * HUD). Geometry is rebuilt as positions move; link counts are small.
	 */
	import { T, useTask } from '@threlte/core';
	import {
		AdditiveBlending,
		BufferAttribute,
		BufferGeometry,
		Color,
		LineBasicMaterial,
		LineSegments,
		Points,
		PointsMaterial
	} from 'three';
	import Marker from '../Marker.svelte';
	import { explorer } from '../../core/state.svelte';
	import { LINK_COLORS, SIGNAL_SPEEDUP, networkAt } from '../../core/network';
	import { LIGHT_SECONDS_PER_AU, formatLightTime } from '../../core/units';

	const MAX_LINKS = 600;
	const linePos = new Float32Array(MAX_LINKS * 6);
	const lineCol = new Float32Array(MAX_LINKS * 6);
	const lineGeo = new BufferGeometry();
	lineGeo.setAttribute('position', new BufferAttribute(linePos, 3));
	lineGeo.setAttribute('color', new BufferAttribute(lineCol, 3));
	const lines = new LineSegments(
		lineGeo,
		new LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.55, depthWrite: false })
	);
	lines.frustumCulled = false;

	const pulsePos = new Float32Array(MAX_LINKS * 3);
	const pulseCol = new Float32Array(MAX_LINKS * 3);
	const pulseGeo = new BufferGeometry();
	pulseGeo.setAttribute('position', new BufferAttribute(pulsePos, 3));
	pulseGeo.setAttribute('color', new BufferAttribute(pulseCol, 3));
	const pulses = new Points(
		pulseGeo,
		new PointsMaterial({
			size: 5,
			sizeAttenuation: false,
			vertexColors: true,
			transparent: true,
			blending: AdditiveBlending,
			depthWrite: false
		})
	);
	pulses.frustumCulled = false;

	const colors = Object.fromEntries(Object.entries(LINK_COLORS).map(([k, v]) => [k, new Color(v)]));
	const coarse = $derived(Math.round(explorer.year * 200) / 200);
	const net = $derived(networkAt(coarse));
	const hubs = $derived(net.nodes.filter((n) => n.kind === 'hub' || n.kind === 'ground'));

	let clock = 0;
	useTask((dt) => {
		clock += dt;
		const { nodes, links } = net;
		const byId = new Map(nodes.map((n) => [n.id, n]));
		const n = Math.min(links.length, MAX_LINKS);
		for (let i = 0; i < n; i++) {
			const l = links[i];
			const a = byId.get(l.a)!.pos;
			const b = byId.get(l.b)!.pos;
			linePos.set(a, i * 6);
			linePos.set(b, i * 6 + 3);
			const c = colors[l.kind];
			lineCol.set([c.r, c.g, c.b, c.r, c.g, c.b], i * 6);
			// Pulse travel time across this link at SIGNAL_SPEEDUP × c, staggered per link
			const period = Math.max(0.25, l.latency / SIGNAL_SPEEDUP);
			const f = ((clock + i * 0.37) / period) % 1;
			pulsePos[i * 3] = a[0] + (b[0] - a[0]) * f;
			pulsePos[i * 3 + 1] = a[1] + (b[1] - a[1]) * f;
			pulsePos[i * 3 + 2] = a[2] + (b[2] - a[2]) * f;
			pulseCol.set([c.r, c.g, c.b], i * 3);
		}
		lineGeo.setDrawRange(0, n * 2);
		pulseGeo.setDrawRange(0, n);
		lineGeo.attributes.position.needsUpdate = true;
		lineGeo.attributes.color.needsUpdate = true;
		pulseGeo.attributes.position.needsUpdate = true;
		pulseGeo.attributes.color.needsUpdate = true;
	});

	const earthLatency = (id: string) => {
		const l = net.links.find((x) => (x.a === 'net:earth' && x.b === id) || (x.b === 'net:earth' && x.a === id));
		return l ? `${formatLightTime(l.latency / LIGHT_SECONDS_PER_AU)} from Earth` : '';
	};
</script>

<T is={lines} />
<T is={pulses} />
{#each hubs as h (h.id)}
	{#if h.kind === 'hub'}
		<T.Group position={h.pos}>
			<Marker label={h.label} sub={earthLatency(h.id)} color="#7dd3fc" minor always />
		</T.Group>
	{/if}
{/each}
