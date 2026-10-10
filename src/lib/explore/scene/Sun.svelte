<script lang="ts">
	import { T } from '@threlte/core';
	import { AdditiveBlending, CanvasTexture, SRGBColorSpace } from 'three';
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
</script>

<T.PointLight intensity={2.2} decay={0} color="#fff4e6" />
<T.AmbientLight intensity={0.06} />

<T.Mesh>
	<T.SphereGeometry args={[R, 64, 32]} />
	<T.MeshBasicMaterial color={[r, g, b]} toneMapped={false} />
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
