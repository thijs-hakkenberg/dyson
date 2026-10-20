<script lang="ts">
	import { T, useTask, useThrelte } from '@threlte/core';
	import { onDestroy } from 'svelte';
	import { AdditiveBlending, CanvasTexture, Group, SRGBColorSpace, Vector3 } from 'three';
	import { explorer } from '../core/state.svelte';
	import Marker from './Marker.svelte';
	import { BODY_RADIUS_KM, kmToAU } from '../core/units';
	import { useSunSurface } from 'photosphere/svelte';

	const R = kmToAU(BODY_RADIUS_KM.sun);

	// Surface renderer is injected (photosphere package); default is its procedural Sun
	const surface = useSunSurface()({ radius: R });
	onDestroy(() => surface.dispose());

	function glowTexture() {
		const c = document.createElement('canvas');
		c.width = c.height = 256;
		const ctx = c.getContext('2d')!;
		const grd = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
		grd.addColorStop(0, 'rgba(255,240,200,1)');
		grd.addColorStop(0.07, 'rgba(255,190,90,0.7)');
		grd.addColorStop(0.25, 'rgba(255,120,30,0.18)');
		grd.addColorStop(1, 'rgba(255,90,10,0)');
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, 256, 256);
		const tex = new CanvasTexture(c);
		tex.colorSpace = SRGBColorSpace;
		return tex;
	}
	const glow = glowTexture();

	/** Far view: the Sun as a star — white-hot point, cool halo, faint diffraction spikes. */
	function starTexture() {
		const n = 512;
		const c = document.createElement('canvas');
		c.width = c.height = n;
		const ctx = c.getContext('2d')!;
		const m = n / 2;
		const halo = ctx.createRadialGradient(m, m, 0, m, m, m);
		halo.addColorStop(0, 'rgba(255,255,255,1)');
		halo.addColorStop(0.035, 'rgba(255,255,255,1)');
		halo.addColorStop(0.08, 'rgba(240,246,255,0.55)');
		halo.addColorStop(0.22, 'rgba(200,220,255,0.12)');
		halo.addColorStop(1, 'rgba(180,205,255,0)');
		ctx.fillStyle = halo;
		ctx.fillRect(0, 0, n, n);
		ctx.globalCompositeOperation = 'lighter';
		for (const [len, w, a] of [
			[0, 2.2, 0.55],
			[Math.PI / 2, 2.2, 0.55],
			[Math.PI / 4, 1.2, 0.18],
			[(3 * Math.PI) / 4, 1.2, 0.18]
		]) {
			ctx.save();
			ctx.translate(m, m);
			ctx.rotate(len);
			const g = ctx.createLinearGradient(-m, 0, m, 0);
			g.addColorStop(0, 'rgba(210,225,255,0)');
			g.addColorStop(0.5, `rgba(255,255,255,${a})`);
			g.addColorStop(1, 'rgba(210,225,255,0)');
			ctx.fillStyle = g;
			ctx.fillRect(-m, -w / 2, n, w);
			ctx.restore();
		}
		const tex = new CanvasTexture(c);
		tex.colorSpace = SRGBColorSpace;
		return tex;
	}
	const star = starTexture();

	/** Whitens the resolved disc as the view pulls back (seen from 1 AU the Sun is white). */
	function discTexture() {
		const c = document.createElement('canvas');
		c.width = c.height = 128;
		const ctx = c.getContext('2d')!;
		const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
		grd.addColorStop(0, 'rgba(255,255,255,1)');
		grd.addColorStop(0.42, 'rgba(255,255,255,1)');
		grd.addColorStop(0.6, 'rgba(255,252,245,0.35)');
		grd.addColorStop(1, 'rgba(255,250,240,0)');
		ctx.fillStyle = grd;
		ctx.fillRect(0, 0, 128, 128);
		const tex = new CanvasTexture(c);
		tex.colorSpace = SRGBColorSpace;
		return tex;
	}
	const disc = discTexture();
	onDestroy(() => [glow, star, disc].forEach((t) => t.dispose()));

	// 0 = close (resolved photosphere, warm corona), 1 = far (a white star like the rest of the sky)
	let farness = $state(0);
	const LOG_NEAR = Math.log10(0.04);
	const LOG_FAR = Math.log10(0.8);
	let sunRef = $state.raw<Group>();
	const wp = new Vector3();

	// The screen-space glow would wash out the resolved disc; fade it on approach
	const glowOpacity = $derived(
		explorer.focusId === 'sun' ? Math.min(1, Math.max(0, (explorer.cameraDistance - 0.03) / 0.15)) : 1
	);

	const { camera } = useThrelte();
	const start = performance.now();
	useTask(() => {
		surface.update({ year: explorer.year, elapsed: (performance.now() - start) / 1000, camera: camera.current, far: farness });
		if (!sunRef) return;
		sunRef.getWorldPosition(wp);
		const t = (Math.log10(Math.max(1e-9, wp.distanceTo(camera.current.position))) - LOG_NEAR) / (LOG_FAR - LOG_NEAR);
		const k = Math.min(1, Math.max(0, t));
		const f = k * k * (3 - 2 * k);
		if (Math.abs(f - farness) > 0.005) farness = f;
	});
</script>

<T.PointLight intensity={2.2} decay={0} color="#fff4e6" />
<T.AmbientLight intensity={0.06} />

<T.Group bind:ref={sunRef}>
	<T is={surface.object} />

	<!-- Disc whitening, true size: washes the false-colour photosphere out as the view recedes -->
	{#if farness > 0}
		<T.Sprite scale={[R * 2.9, R * 2.9, 1]}>
			<T.SpriteMaterial map={disc} blending={AdditiveBlending} depthWrite={false} transparent opacity={farness} toneMapped={false} />
		</T.Sprite>
	{/if}

	<!-- Screen-space glow so the Sun reads at any distance; not a physical size -->
	<T.Sprite scale={[0.12, 0.12, 1]}>
		<T.SpriteMaterial
			map={glow}
			sizeAttenuation={false}
			blending={AdditiveBlending}
			depthWrite={false}
			transparent
			opacity={glowOpacity * (1 - farness)}
			toneMapped={false}
		/>
	</T.Sprite>
	<T.Sprite scale={[0.16, 0.16, 1]}>
		<T.SpriteMaterial
			map={star}
			sizeAttenuation={false}
			blending={AdditiveBlending}
			depthWrite={false}
			transparent
			opacity={farness}
			toneMapped={false}
		/>
	</T.Sprite>
</T.Group>

<Marker id="sun" label="Sun" sub="5772 K" color="#fde68a" always />
