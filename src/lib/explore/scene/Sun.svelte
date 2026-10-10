<script lang="ts">
	import { T } from '@threlte/core';
	import {
		AdditiveBlending,
		CanvasTexture,
		Color,
		MeshBasicMaterial,
		SRGBColorSpace,
		TextureLoader,
		type Mesh,
		type Texture
	} from 'three';
	import { useTask } from '@threlte/core';
	import { explorer } from '../core/state.svelte';
	import { BODY_LOOK, spinAngle } from '../core/bodies';
	import Marker from './Marker.svelte';
	import { BODY_RADIUS_KM, kmToAU, blackbodyRGB } from '../core/units';

	const R = kmToAU(BODY_RADIUS_KM.sun);
	// Photosphere colour from its effective temperature (5772 K)
	const [r, g, b] = blackbodyRGB(5772);

	function glowTexture() {
		const c = document.createElement('canvas');
		c.width = c.height = 256;
		const ctx = c.getContext('2d')!;
		const grd = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
		grd.addColorStop(0, 'rgba(255,244,224,1)');
		grd.addColorStop(0.08, 'rgba(255,220,160,0.55)');
		grd.addColorStop(0.3, 'rgba(255,170,80,0.12)');
		grd.addColorStop(1, 'rgba(255,140,40,0)');
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, 256, 256);
		const tex = new CanvasTexture(c);
		tex.colorSpace = SRGBColorSpace;
		return tex;
	}
	const glow = glowTexture();

	// Photosphere texture only matters once the disc is resolved; load it on approach
	let map = $state.raw<Texture>();
	let requested = false;
	$effect(() => {
		if (requested || explorer.focusId !== 'sun' || explorer.cameraDistance > 0.2) return;
		requested = true;
		new TextureLoader().load(BODY_LOOK.sun.map, (t) => {
			t.colorSpace = SRGBColorSpace;
			map = t;
		});
	});
	const flatMat = new MeshBasicMaterial({ color: new Color(r, g, b), toneMapped: false });
	const texMat = $derived(map ? new MeshBasicMaterial({ map, color: new Color(1.15, 1.1, 1.05), toneMapped: false }) : undefined);
	let disc = $state.raw<Mesh>();
	useTask(() => {
		if (disc) disc.rotation.y = spinAngle(BODY_LOOK.sun.rotationHours, explorer.year);
	});
</script>

<T.PointLight intensity={2.2} decay={0} color="#fff4e6" />
<T.AmbientLight intensity={0.06} />

<T.Mesh bind:ref={disc} material={texMat ?? flatMat}>
	<T.SphereGeometry args={[R, 64, 32]} />
</T.Mesh>

<!-- Screen-space glow so the Sun reads at any distance; not a physical size -->
<T.Sprite scale={[0.09, 0.09, 1]}>
	<T.SpriteMaterial
		map={glow}
		sizeAttenuation={false}
		blending={AdditiveBlending}
		depthWrite={false}
		transparent
		toneMapped={false}
	/>
</T.Sprite>

<Marker id="sun" label="Sun" sub="5772 K" color="#fde68a" always />
