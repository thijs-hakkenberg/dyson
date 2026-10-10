<script lang="ts">
	/**
	 * Milky Way panorama (ESO/S. Brunier, CC BY 4.0) on a camera-locked sky
	 * sphere. The image is galactic equirectangular; the fragment shader rotates
	 * each view direction scene → ecliptic → equatorial → galactic, so the
	 * galactic centre sits where it really is (Sagittarius, ~5° south of the ecliptic).
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

	let { intensity = 0.45 }: { intensity?: number } = $props();

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
		uniforms: { map: { value: null }, sceneToGal: { value: sceneToGal }, intensity: { value: intensity } },
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
			uniform mat3 sceneToGal;
			uniform float intensity;
			varying vec3 vDir;
			void main() {
				vec3 g = sceneToGal * normalize(vDir);
				float l = atan(g.y, g.x);
				float b = asin(clamp(g.z, -1.0, 1.0));
				vec2 uv = vec2(fract(0.5 - l / 6.28318530718), 0.5 + b / 3.14159265359);
				gl_FragColor = vec4(texture2D(map, uv).rgb * intensity, 1.0);
				#include <colorspace_fragment>
			}`,
		side: BackSide,
		depthTest: false,
		depthWrite: false,
		toneMapped: false
	});
	$effect(() => {
		material.uniforms.intensity.value = intensity;
	});

	new TextureLoader().load(`${TEXTURE_BASE}/milkyway_eso0932a.webp`, (t) => {
		t.colorSpace = SRGBColorSpace;
		// Magnified at any FOV we use; no mipmaps means no seam at l = 180°
		t.generateMipmaps = false;
		t.minFilter = LinearFilter;
		t.wrapS = RepeatWrapping;
		material.uniforms.map.value = t;
		material.needsUpdate = true;
	});

	const geometry = new SphereGeometry(1, 64, 32);
</script>

<T.Mesh {geometry} {material} renderOrder={-1000} frustumCulled={false} />
