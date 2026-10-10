<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { onDestroy } from 'svelte';
	import { AdditiveBlending, CanvasTexture, SRGBColorSpace } from 'three';
	import { explorer } from '../core/state.svelte';
	import Marker from './Marker.svelte';
	import { BODY_RADIUS_KM, kmToAU } from '../core/units';
	import { useSunSurface } from '../sun/context';

	const R = kmToAU(BODY_RADIUS_KM.sun);

	// Surface renderer is injected (see sun/types.ts); default is the procedural photosphere
	const surface = useSunSurface()({ radius: R });
	onDestroy(() => surface.dispose());

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

	// The screen-space glow would wash out the resolved disc; fade it on approach
	const glowOpacity = $derived(
		explorer.focusId === 'sun' ? Math.min(1, Math.max(0, (explorer.cameraDistance - 0.03) / 0.15)) : 1
	);

	const { camera } = useThrelte();
	const start = performance.now();
	useTask(() => {
		surface.update({ year: explorer.year, elapsed: (performance.now() - start) / 1000, camera: camera.current });
	});
</script>

<T.PointLight intensity={2.2} decay={0} color="#fff4e6" />
<T.AmbientLight intensity={0.06} />

<T is={surface.object} />

<!-- Screen-space glow so the Sun reads at any distance; not a physical size -->
<T.Sprite scale={[0.09, 0.09, 1]}>
	<T.SpriteMaterial
		map={glow}
		sizeAttenuation={false}
		blending={AdditiveBlending}
		depthWrite={false}
		transparent
		opacity={glowOpacity}
		toneMapped={false}
	/>
</T.Sprite>

<Marker id="sun" label="Sun" sub="5772 K" color="#fde68a" always />
