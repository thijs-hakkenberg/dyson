/**
 * Default procedural photosphere.
 *
 * Physics it approximates (all per-fragment, so detail resolves on zoom):
 * - Granulation: evolving 3-D Worley cells at true scale (~1,400 km spacing,
 *   ~500 cells per solar radius) with dark intergranular lanes; contrast fades
 *   out once a granule is smaller than a pixel instead of aliasing.
 * - Meso/supergranulation: low-amplitude simplex modulation so the unresolved
 *   disc keeps some texture.
 * - Sunspots from `cycle.ts`: umbra (~3,900 K) and filamentary penumbra
 *   (~5,500 K), with faculae brightening near the limb.
 * - Wavelength-dependent limb darkening (linear law, approximate coefficients),
 *   which also reddens the limb.
 * - Rotation in the Carrington frame; spots drift differentially (cycle.ts).
 *
 * Granule evolution runs on wall-clock time (illustrative; real lifetimes are
 * ~10 min). Everything else follows simulated time.
 */

import { Color, Group, Mesh, ShaderMaterial, SphereGeometry, Vector4, type IUniform } from 'three';
import { blackbodyRGB } from '../core/units';
import { spinAngle } from '../core/bodies';
import { CARRINGTON_PERIOD_HOURS, spotsAt } from './cycle';
import type { SunFrame, SunSurface, SunSurfaceFactory } from './types';

const MAX_SPOTS = 48;
const OBLIQUITY_DEG = 7.25;

/** Display-space (sRGB) colour of a blackbody, brightest channel = 1. */
function bbLinear(tempK: number): Color {
	const [r, g, b] = blackbodyRGB(tempK);
	return new Color(r, g, b);
}

// Ashima Arts 3-D simplex noise (MIT, https://github.com/ashima/webgl-noise)
// and Dave Hoskins' "hash without sine" (MIT).
const NOISE = /* glsl */ `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
	const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
	const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
	vec3 i = floor(v + dot(v, C.yyy));
	vec3 x0 = v - i + dot(i, C.xxx);
	vec3 g = step(x0.yzx, x0.xyz);
	vec3 l = 1.0 - g;
	vec3 i1 = min(g.xyz, l.zxy);
	vec3 i2 = max(g.xyz, l.zxy);
	vec3 x1 = x0 - i1 + C.xxx;
	vec3 x2 = x0 - i2 + C.yyy;
	vec3 x3 = x0 - D.yyy;
	i = mod289(i);
	vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
	float n_ = 0.142857142857;
	vec3 ns = n_ * D.wyz - D.xzx;
	vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
	vec4 x_ = floor(j * ns.z);
	vec4 y_ = floor(j - 7.0 * x_);
	vec4 x = x_ * ns.x + ns.yyyy;
	vec4 y = y_ * ns.x + ns.yyyy;
	vec4 h = 1.0 - abs(x) - abs(y);
	vec4 b0 = vec4(x.xy, y.xy);
	vec4 b1 = vec4(x.zw, y.zw);
	vec4 s0 = floor(b0) * 2.0 + 1.0;
	vec4 s1 = floor(b1) * 2.0 + 1.0;
	vec4 sh = -step(h, vec4(0.0));
	vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
	vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
	vec3 p0 = vec3(a0.xy, h.x);
	vec3 p1 = vec3(a0.zw, h.y);
	vec3 p2 = vec3(a1.xy, h.z);
	vec3 p3 = vec3(a1.zw, h.w);
	vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
	p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
	vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
	m = m * m;
	return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
vec3 hash33(vec3 p) {
	p = fract(p * vec3(0.1031, 0.1030, 0.0973));
	p += dot(p, p.yxz + 33.33);
	return fract((p.xxy + p.yxx) * p.zyx);
}
`;

const VERT = /* glsl */ `
#include <common>
#include <logdepthbuf_pars_vertex>
varying vec3 vBody;
varying vec3 vNormalView;
varying vec3 vViewPos;
void main() {
	vBody = normalize(position);
	vNormalView = normalize(normalMatrix * normal);
	vec4 mv = modelViewMatrix * vec4(position, 1.0);
	vViewPos = mv.xyz;
	gl_Position = projectionMatrix * mv;
	#include <logdepthbuf_vertex>
}
`;

const FRAG = /* glsl */ `
#include <common>
#include <logdepthbuf_pars_fragment>
#define MAX_SPOTS ${MAX_SPOTS}
uniform float uTime;
uniform float uGranFreq;
uniform vec4 uSpots[MAX_SPOTS];
uniform float uUmbra[MAX_SPOTS];
uniform int uSpotCount;
uniform vec3 uPhotosphere;
uniform vec3 uPenumbraTint;
uniform vec3 uUmbraTint;
uniform vec3 uLaneTint;
uniform vec3 uLimb;
uniform float uExposure;
varying vec3 vBody;
varying vec3 vNormalView;
varying vec3 vViewPos;
${NOISE}

// F1, F2 distances to evolving cell centres, plus a per-cell random value
vec3 worley(vec3 p, float t) {
	vec3 c = floor(p);
	vec3 f = fract(p);
	float d1 = 8.0;
	float d2 = 8.0;
	float id = 0.0;
	for (int z = -1; z <= 1; z++)
	for (int y = -1; y <= 1; y++)
	for (int x = -1; x <= 1; x++) {
		vec3 g = vec3(float(x), float(y), float(z));
		vec3 h = hash33(c + g);
		vec3 o = 0.5 + 0.42 * sin(t * (0.5 + 0.5 * h.zxy) + 6.2831853 * h);
		vec3 r = g + o - f;
		float d = dot(r, r);
		if (d < d1) { d2 = d1; d1 = d; id = h.x; } else if (d < d2) { d2 = d; }
	}
	return vec3(sqrt(d1), sqrt(d2), id);
}

void main() {
	#include <logdepthbuf_fragment>
	vec3 n = normalize(vBody);

	// ── Granulation ─────────────────────────────────────────────
	vec3 gp = n * uGranFreq;
	float footprint = length(fwidth(gp));
	float resolved = 1.0 - smoothstep(0.25, 0.9, footprint);
	float gran = 0.95;
	float lane = 0.0;
	if (resolved > 0.0) {
		// Domain warp makes granules irregular rather than Voronoi-polygonal
		vec3 warp = vec3(snoise(gp * 0.35), snoise(gp * 0.35 + 17.0), snoise(gp * 0.35 + 31.0)) * 0.35;
		vec3 w = worley(gp + warp, uTime);
		// Narrow dark intergranular lanes; bright, domed granule centres with
		// cell-to-cell brightness spread (~±8%)
		float lanes = smoothstep(0.0, 0.14, w.y - w.x);
		float dome = 1.0 - 0.45 * w.x * w.x;
		float cell = mix(0.7, (0.96 + 0.16 * (w.z - 0.5)) * dome + 0.08, lanes);
		gran = mix(0.95, cell, resolved);
		lane = (1.0 - lanes) * resolved;
	}
	// Meso- and supergranulation: always resolved, low contrast
	float meso = snoise(n * 60.0 + vec3(0.0, uTime * 0.01, 0.0)) * 0.025;
	float sup = snoise(n * 11.0) * 0.02;
	float I = gran + meso + sup;

	// ── Sunspots and faculae ────────────────────────────────────
	// Intergranular lanes are cooler (~300 K) downflows: redder as well as darker
	vec3 tint = mix(vec3(1.0), uLaneTint, lane);
	float facula = 0.0;
	for (int i = 0; i < MAX_SPOTS; i++) {
		if (i >= uSpotCount) break;
		vec4 s = uSpots[i];
		float d = acos(clamp(dot(n, s.xyz), -1.0, 1.0));
		float r = s.w;
		if (d > r * 3.5) continue;
		facula = max(facula, smoothstep(r * 3.5, r * 1.2, d));
		if (d > r * 1.1) continue;
		// Radial penumbral filaments: angle around the spot centre
		vec3 t1 = normalize(cross(s.xyz, abs(s.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
		vec3 t2 = cross(s.xyz, t1);
		float ang = atan(dot(n, t2), dot(n, t1));
		float fil = 0.5 + 0.5 * sin(ang * 70.0 + snoise(vec3(ang * 3.0, d / r * 4.0, float(i))) * 3.0);
		float ru = r * uUmbra[i];
		float pen = 1.0 - smoothstep(r * 0.82, r * 1.05, d);
		float umb = 1.0 - smoothstep(ru * 0.75, ru * 1.1, d);
		float penI = 0.66 + 0.16 * fil;
		I = mix(I, penI, pen);
		I = mix(I, 0.2, umb);
		tint = mix(tint, uPenumbraTint, pen);
		tint = mix(tint, uUmbraTint, umb);
	}

	// ── Limb darkening (per channel) + faculae near the limb ────
	float mu = clamp(dot(normalize(vNormalView), normalize(-vViewPos)), 0.0, 1.0);
	vec3 limb = 1.0 - uLimb * (1.0 - mu);
	I *= 1.0 + facula * 0.35 * pow(1.0 - mu, 2.0);

	// Shade in display space (as a white-light photograph is presented), then
	// linearise so the renderer's output encoding reproduces those values
	vec3 display = clamp(uPhotosphere * tint * I * limb * uExposure, 0.0, 1.0);
	gl_FragColor = vec4(pow(display, vec3(2.2)), 1.0);
	#include <colorspace_fragment>
}
`;

export const createProceduralSun: SunSurfaceFactory = ({ radius }) => {
	const base = bbLinear(5772);
	const photo = base.clone().multiplyScalar(1 / Math.max(base.r, base.g, base.b));
	/** Colour of a cooler region relative to the photosphere, brightest channel = 1 */
	const rel = (tempK: number) => {
		const c = bbLinear(tempK);
		const v = new Color(c.r / base.r, c.g / base.g, c.b / base.b);
		return v.multiplyScalar(1 / Math.max(v.r, v.g, v.b));
	};

	const spots: IUniform<Vector4[]> = { value: Array.from({ length: MAX_SPOTS }, () => new Vector4()) };
	const umbra: IUniform<number[]> = { value: new Array(MAX_SPOTS).fill(0.4) };
	const uniforms = {
		uTime: { value: 0 },
		// ~1,400 km granule spacing over a 695,700 km radius
		uGranFreq: { value: 500 },
		uSpots: spots,
		uUmbra: umbra,
		uSpotCount: { value: 0 },
		uPhotosphere: { value: photo },
		uPenumbraTint: { value: rel(5500) },
		uUmbraTint: { value: rel(3900) },
		uLaneTint: { value: rel(4600) },
		// Linear limb-darkening coefficients ~650 / 550 / 450 nm (approximate)
		uLimb: { value: new Color(0.5, 0.6, 0.74) },
		uExposure: { value: 0.97 }
	};

	const material = new ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG, toneMapped: false });
	const geometry = new SphereGeometry(radius, 128, 64);
	const mesh = new Mesh(geometry, material);
	const root = new Group();
	root.rotation.z = -(OBLIQUITY_DEG * Math.PI) / 180;
	root.add(mesh);

	let lastSpotYear = Number.NaN;
	const update = ({ year, elapsed }: SunFrame) => {
		mesh.rotation.y = spinAngle(CARRINGTON_PERIOD_HOURS, year);
		uniforms.uTime.value = elapsed * 0.25;
		// Recompute spots every ~0.2 simulated days
		if (!(Math.abs(year - lastSpotYear) < 0.2 / 365.25)) {
			lastSpotYear = year;
			const list = spotsAt(year, MAX_SPOTS);
			list.forEach((s, i) => {
				spots.value[i].set(s.dir[0], s.dir[1], s.dir[2], s.radius);
				umbra.value[i] = s.umbra;
			});
			uniforms.uSpotCount.value = list.length;
		}
	};

	return {
		object: root,
		update,
		dispose() {
			geometry.dispose();
			material.dispose();
		}
	} satisfies SunSurface;
};
