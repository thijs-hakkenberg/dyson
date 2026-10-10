<script lang="ts">
	/**
	 * A true-scale body with a lazily loaded surface texture. Textures load the
	 * first time the body (or its parent/child) is focused or selected; until
	 * then the body is a flat-coloured sphere, which is all a sub-pixel disc needs.
	 */
	import { T, useTask } from '@threlte/core';
	import {
		Color,
		DoubleSide,
		MeshBasicMaterial,
		MeshStandardMaterial,
		RingGeometry,
		ShaderMaterial,
		SRGBColorSpace,
		TextureLoader,
		Vector3,
		type Mesh,
		type Texture
	} from 'three';
	import { explorer } from '../core/state.svelte';
	import type { Entity } from '../core/registry';
	import { BODY_LOOK, spinAngle } from '../core/bodies';
	import { kmToAU } from '../core/units';
	import { PLANET_COLORS } from '../core/theme';

	let { body }: { body: Entity } = $props();

	// svelte-ignore state_referenced_locally
	const look = BODY_LOOK[body.id];
	// svelte-ignore state_referenced_locally
	const R = body.radiusAU!;
	const DEG = Math.PI / 180;

	const RELATED: Record<string, string[]> = { earth: ['moon'], moon: ['earth'] };
	const wanted = $derived(
		explorer.focusId === body.id ||
			explorer.selectedId === body.id ||
			(RELATED[body.id] ?? []).includes(explorer.focusId)
	);

	let maps = $state.raw<{ map?: Texture; night?: Texture; clouds?: Texture; ring?: Texture }>({});
	let requested = false;
	const loader = new TextureLoader();
	const load = (url: string) =>
		new Promise<Texture>((res, rej) =>
			loader.load(
				url,
				(t) => {
					t.colorSpace = SRGBColorSpace;
					t.anisotropy = 4;
					res(t);
				},
				undefined,
				rej
			)
		);

	$effect(() => {
		if (!wanted || requested || !look) return;
		requested = true;
		Promise.all([
			load(look.map),
			look.night ? load(look.night) : undefined,
			look.clouds ? load(look.clouds) : undefined,
			look.ring ? load(look.ring.map) : undefined
		])
			.then(([map, night, clouds, ring]) => (maps = { map, night, clouds, ring }))
			.catch(() => (requested = false));
	});

	// ── Earth: day/night terminator with city lights and a thin limb glow ──
	const sunDir = new Vector3(1, 0, 0);
	let earthMat = $state.raw<ShaderMaterial>();
	$effect(() => {
		if (!maps.night || !maps.map) return;
		earthMat = new ShaderMaterial({
			uniforms: { dayMap: { value: maps.map }, nightMap: { value: maps.night }, sunDir: { value: sunDir } },
			vertexShader: /* glsl */ `
				#include <common>
				#include <logdepthbuf_pars_vertex>
				varying vec2 vUv;
				varying vec3 vN;
				varying vec3 vView;
				void main() {
					vUv = uv;
					vN = normalize(mat3(modelMatrix) * normal);
					vec4 wp = modelMatrix * vec4(position, 1.0);
					vView = normalize(cameraPosition - wp.xyz);
					gl_Position = projectionMatrix * viewMatrix * wp;
					#include <logdepthbuf_vertex>
				}`,
			fragmentShader: /* glsl */ `
				#include <common>
				#include <logdepthbuf_pars_fragment>
				uniform sampler2D dayMap;
				uniform sampler2D nightMap;
				uniform vec3 sunDir;
				varying vec2 vUv;
				varying vec3 vN;
				varying vec3 vView;
				void main() {
					#include <logdepthbuf_fragment>
					vec3 n = normalize(vN);
					float d = dot(n, sunDir);
					float day = smoothstep(-0.12, 0.18, d);
					vec3 dayC = texture2D(dayMap, vUv).rgb * (0.03 + 1.1 * max(d, 0.0));
					vec3 nightC = texture2D(nightMap, vUv).rgb * 1.2;
					vec3 c = mix(nightC, dayC, day);
					float rim = pow(1.0 - max(dot(n, normalize(vView)), 0.0), 4.0);
					c += vec3(0.3, 0.55, 1.0) * rim * smoothstep(-0.25, 0.4, d) * 0.8;
					gl_FragColor = vec4(c, 1.0);
					#include <colorspace_fragment>
				}`
		});
	});

	// Textured materials are built once the maps exist so the shader compiles with them
	const surfaceMat = $derived(
		maps.map && !maps.night ? new MeshStandardMaterial({ map: maps.map, roughness: 0.95, metalness: 0 }) : undefined
	);
	const cloudMat = $derived(
		maps.clouds
			? new MeshStandardMaterial({
					color: 0xffffff,
					alphaMap: maps.clouds,
					transparent: true,
					opacity: 0.85,
					depthWrite: false,
					roughness: 1
				})
			: undefined
	);
	// Rings are drawn unlit: ring shadows and forward scattering aren't modelled, and
	// Lambert shading at grazing sunlight leaves them unrealistically dark
	const ringMat = $derived(
		maps.ring
			? new MeshBasicMaterial({
					map: maps.ring,
					color: new Color(0.85, 0.82, 0.78),
					transparent: true,
					side: DoubleSide,
					depthWrite: false
				})
			: undefined
	);

	// Materials are passed as props, not swapped as children: Threlte restores the
	// mesh's default material when a child material unmounts, which races the swap.
	// svelte-ignore state_referenced_locally
	const flatMat = new MeshStandardMaterial({ color: PLANET_COLORS[body.id], roughness: 0.9, metalness: 0 });
	const ringFallback = new MeshBasicMaterial({
		color: '#c8b48a',
		transparent: true,
		opacity: 0.35,
		side: DoubleSide,
		depthWrite: false
	});
	const bodyMat = $derived(earthMat ?? surfaceMat ?? flatMat);

	// ── Saturn: radial ring texture needs UVs mapped by radius ──
	const ringGeo = (() => {
		if (!look?.ring) return undefined;
		const inner = kmToAU(look.ring.innerKm);
		const outer = kmToAU(look.ring.outerKm);
		const g = new RingGeometry(inner, outer, 192, 1);
		const pos = g.attributes.position;
		const uv = g.attributes.uv;
		for (let i = 0; i < pos.count; i++) {
			const r = Math.hypot(pos.getX(i), pos.getY(i));
			uv.setXY(i, (r - inner) / (outer - inner), 0.5);
		}
		return g;
	})();

	let spin = $state.raw<Mesh>();
	let cloudMesh = $state.raw<Mesh>();
	useTask(() => {
		const y = explorer.year;
		if (spin && look) spin.rotation.y = spinAngle(look.rotationHours, y);
		// Clouds drift slowly relative to the surface (illustrative)
		if (cloudMesh && look) cloudMesh.rotation.y = spinAngle(look.rotationHours * 1.04, y);
		if (look?.night) {
			const p = body.position(y);
			sunDir.set(-p[0], -p[1], -p[2]).normalize();
		}
	});
</script>

<T.Group rotation.z={-(look?.obliquity ?? 0) * DEG}>
	<T.Mesh bind:ref={spin} material={bodyMat}>
		<T.SphereGeometry args={[R, 64, 32]} />
	</T.Mesh>

	{#if cloudMat}
		<T.Mesh bind:ref={cloudMesh}>
			<T.SphereGeometry args={[R * 1.008, 64, 32]} />
			<T is={cloudMat} />
		</T.Mesh>
	{/if}

	{#if ringGeo}
		<T.Mesh geometry={ringGeo} material={ringMat ?? ringFallback} rotation.x={-Math.PI / 2} />
	{/if}
</T.Group>
