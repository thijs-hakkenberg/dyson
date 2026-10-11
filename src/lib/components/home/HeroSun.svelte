<script lang="ts">
	/**
	 * The explorer's procedural Sun for the homepage hero: granulation, spots
	 * from the real solar cycle, limb darkening and the Hα corona. three.js and
	 * the shaders load after first paint; without WebGL a plain disc stays.
	 */
	import { onMount } from 'svelte';

	let host: HTMLDivElement;
	let live = $state(false);

	onMount(() => {
		let disposed = false;
		let cleanup = () => {};

		(async () => {
			const [{ WebGLRenderer, PerspectiveCamera, Scene, NoToneMapping }, { createProceduralSun }, { dateToYear }] =
				await Promise.all([
					import('three'),
					import('$lib/explore/sun/procedural'),
					import('$lib/explore/core/units')
				]);
			if (disposed) return;

			let renderer: InstanceType<typeof WebGLRenderer>;
			try {
				renderer = new WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'low-power' });
			} catch {
				return; // no WebGL: the CSS disc stays
			}
			renderer.toneMapping = NoToneMapping;
			renderer.setClearColor(0x000000, 1);
			renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
			host.appendChild(renderer.domElement);

			// Canvas spans 2.5 solar radii each way so the corona has room
			const R = 1;
			const scene = new Scene();
			const camera = new PerspectiveCamera(30, 1, 0.1, 100);
			camera.position.set(0, 0, (2.5 * R) / Math.tan((15 * Math.PI) / 180));
			camera.lookAt(0, 0, 0);
			const sun = createProceduralSun({ radius: R });
			scene.add(sun.object);

			const resize = () => {
				const w = host.clientWidth || 1;
				renderer.setSize(w, w, false);
			};
			resize();
			const ro = new ResizeObserver(resize);
			ro.observe(host);

			// One simulated day every ~3 s: the Sun visibly turns and spots drift
			const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			const year0 = dateToYear(new Date());
			const start = performance.now();
			let visible = true;
			const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
			io.observe(host);

			let raf = 0;
			const frame = () => {
				raf = requestAnimationFrame(frame);
				if (!visible) return;
				const t = reduce ? 0 : (performance.now() - start) / 1000;
				sun.update({ year: year0 + t / 3 / 365.25, elapsed: t, camera });
				renderer.render(scene, camera);
			};
			frame();
			live = true;

			cleanup = () => {
				cancelAnimationFrame(raf);
				ro.disconnect();
				io.disconnect();
				sun.dispose();
				renderer.dispose();
				renderer.domElement.remove();
			};
		})();

		return () => {
			disposed = true;
			cleanup();
		};
	});
</script>

<div class="hero-sun" class:live bind:this={host} aria-hidden="true">
	<div class="fallback"></div>
</div>

<style>
	/* Fills a square parent with the disc; the canvas is 2.5× that so the corona
	   has room, and black is screened away so the stars show through */
	.hero-sun {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 250%;
		aspect-ratio: 1;
		transform: translate(-50%, -50%);
		pointer-events: none;
		mix-blend-mode: screen;
		/* Where the page isolates the blend, fade the square's edges instead */
		mask-image: radial-gradient(circle closest-side, #000 62%, transparent 100%);
	}
	.hero-sun :global(canvas) {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	.fallback {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 40%;
		height: 40%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: radial-gradient(circle at 50% 50%, #ffe7a0, #ffb340 55%, #ff7a10 85%, #c24a00);
		box-shadow:
			0 0 60px 10px rgba(255, 140, 30, 0.45),
			0 0 180px 40px rgba(255, 110, 20, 0.18);
		transition: opacity 0.8s ease;
	}
	.live .fallback {
		opacity: 0;
	}
</style>
