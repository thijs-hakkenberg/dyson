<script lang="ts">
	/**
	 * Milky Way panorama (ESO/S. Brunier, CC BY 4.0) on a camera-locked sky
	 * sphere. The image is galactic equirectangular; the fragment shader rotates
	 * each view direction scene → ecliptic → equatorial → galactic, so the
	 * galactic centre sits where it really is (Sagittarius, ~5° south of the ecliptic).
	 *
	 * The panorama is magnified far beyond its resolution, so its stars render as soft pixel
	 * blocks that compete with the scene. The shader splits the image into a smooth band
	 * (a local minimum) and a point-star residual, keeps only `starGain` of the residual, and
	 * lifts a black point so the grainy faint floor goes dark while the band and dust lanes stay.
	 */
	import { T } from '@threlte/core';
	import {
		BackSide,
		LinearFilter,
		Matrix3,
		RepeatWrapping,
		ShaderMaterial,
		SphereGeometry,
		SRGBColorSpace,
		TextureLoader
	} from 'three';
	import { SCENE_TO_GAL, toMat3Elements } from '../core/sky';
	import { useTask } from '@threlte/core';
	import { deepTime } from '../core/deeptime.svelte';
	import { TEXTURE_BASE } from '../core/bodies';

	let {
		intensity = 0.45,
		starGain = 0.3,
		blackPoint = 0.006,
		contrast = 1.2,
		saturation = 0.75
	}: {
		intensity?: number;
		/** share of the point-star residual kept (1 = original image) */
		starGain?: number;
		/** linear level mapped to black */
		blackPoint?: number;
		/** gamma applied after the black point (>1 deepens the faint background) */
		contrast?: number;
		saturation?: number;
	} = $props();

	const sceneToGal = new Matrix3().fromArray(toMat3Elements(SCENE_TO_GAL));
	const base = new Matrix3().fromArray(toMat3Elements(SCENE_TO_GAL));
	const rot = new Matrix3();
	// Re-orient the sky for the Sun's galactic motion (tiny within the timeline, large in deep time)
	useTask(() => {
		rot.fromArray(toMat3Elements(deepTime.matrix));
		sceneToGal.multiplyMatrices(rot, base);
	});

	// svelte-ignore state_referenced_locally
	const material = new ShaderMaterial({
		uniforms: {
			map: { value: null },
			texel: { value: [1 / 4096, 1 / 2048] },
			sceneToGal: { value: sceneToGal },
			intensity: { value: intensity },
			starGain: { value: starGain },
			blackPoint: { value: blackPoint },
			contrast: { value: contrast },
			saturation: { value: saturation }
		},
		vertexShader: /* glsl */ `
			varying vec3 vDir;
			void main() {
				vDir = position;
				// Rotation only: the sky is infinitely far away
				vec4 p = projectionMatrix * vec4(mat3(viewMatrix) * position, 1.0);
				gl_Position = p.xyww;
			}`,
		fragmentShader: /* glsl */ `
			uniform sampler2D map;
			uniform vec2 texel;
			uniform mat3 sceneToGal;
			uniform float intensity;
			uniform float starGain;
			uniform float blackPoint;
			uniform float contrast;
			uniform float saturation;
			varying vec3 vDir;
			// Darkest of 9 taps 2 texels apart: point stars (bright, 1–2 texels) drop out, the
			// band and dust lanes (wide) survive. A blur would smear the stars into blobs instead.
			const vec3 LUM = vec3(0.2126, 0.7152, 0.0722);
			vec3 band(vec2 uv) {
				vec2 d = texel * 2.0;
				vec3 m = texture2D(map, uv).rgb;
				float lm = dot(m, LUM);
				for (int i = -1; i <= 1; i++) {
					for (int j = -1; j <= 1; j++) {
						vec3 c = texture2D(map, uv + vec2(float(i), float(j)) * d).rgb;
						float l = dot(c, LUM);
						if (l < lm) { m = c; lm = l; }
					}
				}
				return m;
			}
			void main() {
				vec3 g = sceneToGal * normalize(vDir);
				float l = atan(g.y, g.x);
				float b = asin(clamp(g.z, -1.0, 1.0));
				vec2 uv = vec2(fract(0.5 - l / 6.28318530718), 0.5 + b / 3.14159265359);
				vec3 sharp = texture2D(map, uv).rgb;
				vec3 smooth = band(uv);
				vec3 col = smooth + max(sharp - smooth, 0.0) * starGain;
				col = pow(max(col - blackPoint, 0.0) / (1.0 - blackPoint), vec3(contrast));
				float lum = dot(col, LUM);
				col = mix(vec3(lum), col, saturation);
				gl_FragColor = vec4(col * intensity, 1.0);
				#include <colorspace_fragment>
			}`,
		side: BackSide,
		depthTest: false,
		depthWrite: false,
		toneMapped: false
	});
	$effect(() => {
		const u = material.uniforms;
		u.intensity.value = intensity;
		u.starGain.value = starGain;
		u.blackPoint.value = blackPoint;
		u.contrast.value = contrast;
		u.saturation.value = saturation;
	});

	new TextureLoader().load(`${TEXTURE_BASE}/milkyway_eso0932a.webp`, (t) => {
		t.colorSpace = SRGBColorSpace;
		// Magnified at any FOV we use; no mipmaps means no seam at l = 180°
		t.generateMipmaps = false;
		t.minFilter = LinearFilter;
		t.wrapS = RepeatWrapping;
		const img = t.image as { width: number; height: number };
		material.uniforms.texel.value = [1 / img.width, 1 / img.height];
		material.uniforms.map.value = t;
		material.needsUpdate = true;
	});

	const geometry = new SphereGeometry(1, 64, 32);
</script>

<T.Mesh {geometry} {material} renderOrder={-1000} frustumCulled={false} />
