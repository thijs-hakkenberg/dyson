/**
 * Procedural element models. Each archetype builds a three.js group in
 * metres, centred on the origin, from the parameters in core/models.ts.
 * Detail is representative, not a CAD model: proportions follow the specs,
 * fine structure (cells, coils, segments) is suggestive.
 */

import {
	AdditiveBlending,
	Box3,
	BoxGeometry,
	BufferGeometry,
	CanvasTexture,
	CircleGeometry,
	Color,
	ConeGeometry,
	CylinderGeometry,
	DoubleSide,
	Float32BufferAttribute,
	Group,
	IcosahedronGeometry,
	LatheGeometry,
	LineBasicMaterial,
	LineSegments,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	PlaneGeometry,
	RepeatWrapping,
	SphereGeometry,
	SRGBColorSpace,
	TorusGeometry,
	Vector2,
	Vector3,
	type Material,
	type Object3D
} from 'three';
import type { ElementModel, ModelParams } from '../../core/models';

// ── Materials ──────────────────────────────────────────────────────────────

let pvTexture: CanvasTexture | null = null;
/** Solar-cell grid texture (browser only). */
function pvMap(): CanvasTexture | null {
	if (pvTexture) return pvTexture;
	if (typeof document === 'undefined') return null;
	const c = document.createElement('canvas');
	c.width = c.height = 128;
	const g = c.getContext('2d');
	if (!g) return null;
	g.fillStyle = '#1a2a5c';
	g.fillRect(0, 0, 128, 128);
	g.fillStyle = '#22356f';
	for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) g.fillRect(x * 32 + 2, y * 32 + 2, 28, 28);
	g.strokeStyle = 'rgba(190,210,255,0.35)';
	g.lineWidth = 1;
	for (let k = 0; k <= 4; k++) {
		g.beginPath();
		g.moveTo(k * 32, 0);
		g.lineTo(k * 32, 128);
		g.moveTo(0, k * 32);
		g.lineTo(128, k * 32);
		g.stroke();
	}
	pvTexture = new CanvasTexture(c);
	pvTexture.wrapS = pvTexture.wrapT = RepeatWrapping;
	pvTexture.colorSpace = SRGBColorSpace;
	pvTexture.anisotropy = 4;
	return pvTexture;
}

function mats() {
	const pv = new MeshStandardMaterial({
		color: '#ffffff',
		map: pvMap(),
		metalness: 0.35,
		roughness: 0.3,
		emissive: '#0b1638',
		side: DoubleSide
	});
	return {
		hull: new MeshStandardMaterial({ color: '#b9c2ce', metalness: 0.65, roughness: 0.38 }),
		dark: new MeshStandardMaterial({ color: '#39424f', metalness: 0.6, roughness: 0.5 }),
		foil: new MeshStandardMaterial({ color: '#d4a64a', metalness: 0.85, roughness: 0.32, emissive: '#2a1a00' }),
		pv,
		radiator: new MeshStandardMaterial({ color: '#e8edf2', metalness: 0.1, roughness: 0.7, side: DoubleSide }),
		mirror: new MeshStandardMaterial({
			color: '#e9f1fa',
			metalness: 1,
			roughness: 0.08,
			emissive: '#3a4a5c',
			side: DoubleSide
		}),
		rectenna: new MeshStandardMaterial({ color: '#4a5566', metalness: 0.7, roughness: 0.4, side: DoubleSide, emissive: '#101820' }),
		coil: new MeshStandardMaterial({ color: '#c58a3c', metalness: 0.9, roughness: 0.3, emissive: '#3a2008' }),
		glow: new MeshBasicMaterial({ color: '#7de3ff', transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false }),
		plasma: new MeshBasicMaterial({
			color: '#ff8a5c',
			transparent: true,
			opacity: 0.35,
			blending: AdditiveBlending,
			depthWrite: false,
			side: DoubleSide
		}),
		field: new LineBasicMaterial({ color: '#7dd3fc', transparent: true, opacity: 0.35 }),
		seam: new LineBasicMaterial({ color: '#9fb4d8', transparent: true, opacity: 0.25 }),
		rock: new MeshStandardMaterial({ color: '#6f6a63', roughness: 0.95, metalness: 0.05, flatShading: true }),
		ground: new MeshStandardMaterial({ color: '#77736c', roughness: 1, metalness: 0 })
	};
}
type Mats = ReturnType<typeof mats>;

// ── Helpers ────────────────────────────────────────────────────────────────

function mesh(geo: BufferGeometry, mat: Material, pos?: [number, number, number], rot?: [number, number, number]) {
	const m = new Mesh(geo, mat);
	if (pos) m.position.set(...pos);
	if (rot) m.rotation.set(...rot);
	return m;
}

/** Cylinder between two points. */
function rod(a: Vector3, b: Vector3, r: number, mat: Material, seg = 6) {
	const d = b.clone().sub(a);
	const m = new Mesh(new CylinderGeometry(r, r, d.length(), seg), mat);
	m.position.copy(a.clone().add(b).multiplyScalar(0.5));
	m.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), d.normalize());
	return m;
}

function panel(w: number, h: number, mat: Material, repeat = 1) {
	const geo = new PlaneGeometry(w, h);
	const m = new Mesh(geo, mat);
	if (repeat !== 1) {
		const uv = geo.attributes.uv;
		for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * repeat * (w / Math.max(w, h)), uv.getY(i) * repeat * (h / Math.max(w, h)));
	}
	return m;
}

function lines(points: number[], mat: LineBasicMaterial) {
	const g = new BufferGeometry();
	g.setAttribute('position', new Float32BufferAttribute(points, 3));
	return new LineSegments(g, mat);
}

/** UV repeat so cell texture density reads as "many cells". */
function cellRepeat(L: number) {
	return Math.min(64, Math.max(2, Math.round(Math.sqrt(L) * 2)));
}

// ── Archetypes ─────────────────────────────────────────────────────────────

function smallsat(p: ModelParams, M: Mats) {
	const L = p.size;
	const g = new Group();
	const b = L * (p.telescope ? 0.32 : 0.18);
	g.add(mesh(new BoxGeometry(b, b * 1.2, b), M.foil));
	g.add(mesh(new BoxGeometry(b * 1.02, b * 0.1, b * 1.02), M.dark, [0, b * 0.62, 0]));
	// Wings
	const wingLen = Math.max(b, ((L - b) / 2) * 0.92);
	for (const s of [-1, 1]) {
		g.add(rod(new Vector3((s * b) / 2, 0, 0), new Vector3(s * (b / 2 + wingLen * 0.08), 0, 0), b * 0.04, M.hull));
		const w = panel(wingLen, b * 0.85, M.pv, 2);
		w.rotation.x = -Math.PI / 2;
		w.position.set(s * (b / 2 + wingLen * 0.08 + wingLen / 2), 0, 0);
		g.add(w);
	}
	if (p.dish) {
		const pts = Array.from({ length: 9 }, (_, i) => new Vector2((i / 8) * b * 0.45, Math.pow(i / 8, 2) * b * 0.12));
		const d = mesh(new LatheGeometry(pts, 24), M.radiator, [0, b * 0.8, -b * 0.2]);
		g.add(d);
		g.add(rod(new Vector3(0, b * 0.62, -b * 0.2), new Vector3(0, b * 0.8, -b * 0.2), b * 0.03, M.hull));
	}
	if (p.telescope) {
		const tube = mesh(new CylinderGeometry(b * 0.38, b * 0.38, b * 1.3, 32, 1, true), M.hull, [0, 0, b * 1.1], [Math.PI / 2, 0, 0]);
		(tube.material as MeshStandardMaterial).side = DoubleSide;
		g.add(tube);
		g.add(mesh(new CircleGeometry(b * 0.36, 32), M.dark, [0, 0, b * 0.5]));
		g.add(mesh(new TorusGeometry(b * 0.38, b * 0.03, 8, 32), M.glow, [0, 0, b * 1.75]));
	} else {
		// Instrument deck
		g.add(mesh(new CylinderGeometry(b * 0.16, b * 0.2, b * 0.3, 16), M.dark, [0, 0, b * 0.65], [Math.PI / 2, 0, 0]));
	}
	if (L > 10) {
		// Large node: control-moment gyros and sensor booms
		for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const)
			g.add(mesh(new SphereGeometry(b * 0.16, 16, 12), M.coil, [x * b * 0.32, -b * 0.66, z * b * 0.32]));
		for (const s of [-1, 1]) g.add(rod(new Vector3(0, 0, 0), new Vector3(0, s * L * 0.45, b * 0.5), b * 0.02, M.hull));
	}
	return g;
}

function rover(p: ModelParams, M: Mats) {
	const L = p.size;
	const g = new Group();
	const n = p.count ?? 6;
	if (p.wheel) {
		// Mining robot: long chassis, anchoring legs, front bucket wheels
		const bx = L * 0.55,
			by = L * 0.2,
			bz = L * 0.32;
		g.add(mesh(new BoxGeometry(bx, by, bz), M.hull));
		g.add(mesh(new BoxGeometry(bx * 0.6, by * 0.08, bz * 0.95), M.pv, [-bx * 0.1, by * 0.55, 0]));
		g.add(mesh(new BoxGeometry(bx * 0.3, by * 0.6, bz * 0.7), M.foil, [-bx * 0.25, by * 0.5, 0]));
		// Boom + dual wheels
		const hub = new Vector3(bx * 0.5 + L * 0.18, -by * 0.1, 0);
		g.add(rod(new Vector3(bx * 0.4, 0, 0), hub, L * 0.025, M.hull));
		for (const s of [-1, 1]) {
			const wheel = new Group();
			wheel.position.set(hub.x, hub.y, s * L * 0.07);
			wheel.add(mesh(new TorusGeometry(L * 0.11, L * 0.012, 8, 32), M.dark));
			for (let k = 0; k < 10; k++) {
				const a = (k / 10) * Math.PI * 2;
				wheel.add(mesh(new BoxGeometry(L * 0.04, L * 0.035, L * 0.05), M.hull, [Math.cos(a) * L * 0.11, Math.sin(a) * L * 0.11, 0], [0, 0, a]));
			}
			g.add(wheel);
		}
		// Shroud
		const shroud = mesh(
			new CylinderGeometry(L * 0.14, L * 0.14, L * 0.24, 24, 1, true, 0, Math.PI),
			M.radiator,
			[hub.x, hub.y, 0],
			[Math.PI / 2, 0, Math.PI / 2]
		);
		g.add(shroud);
		for (let i = 0; i < n; i++) {
			const x = -bx * 0.4 + (i % (n / 2)) * ((bx * 0.8) / Math.max(1, n / 2 - 1));
			const s = i < n / 2 ? 1 : -1;
			const hip = new Vector3(x, -by * 0.3, (s * bz) / 2);
			const knee = new Vector3(x, -by * 0.2, s * (bz / 2 + L * 0.12));
			const foot = new Vector3(x, -by * 1.4, s * (bz / 2 + L * 0.16));
			g.add(rod(hip, knee, L * 0.014, M.dark), rod(knee, foot, L * 0.012, M.dark));
			g.add(mesh(new ConeGeometry(L * 0.025, L * 0.06, 8), M.coil, [foot.x, foot.y - L * 0.02, foot.z], [Math.PI, 0, 0]));
		}
	} else {
		// Crawler: hexagonal body, six legs with adhesive pads, carried tile
		const r = L * 0.22;
		g.add(mesh(new CylinderGeometry(r, r, L * 0.1, 6), M.hull));
		g.add(mesh(new CylinderGeometry(r * 0.6, r * 0.7, L * 0.06, 6), M.foil, [0, L * 0.08, 0]));
		g.add(mesh(new CylinderGeometry(L * 0.28, L * 0.28, L * 0.015, 6), M.pv, [0, L * 0.17, 0]));
		for (let i = 0; i < n; i++) {
			const a = (i / n) * Math.PI * 2 + Math.PI / n;
			const c = Math.cos(a),
				s = Math.sin(a);
			const hip = new Vector3(c * r, 0, s * r);
			const knee = new Vector3(c * L * 0.4, L * 0.12, s * L * 0.4);
			const foot = new Vector3(c * L * 0.5, -L * 0.14, s * L * 0.5);
			g.add(rod(hip, knee, L * 0.018, M.dark), rod(knee, foot, L * 0.015, M.dark));
			g.add(mesh(new CylinderGeometry(L * 0.045, L * 0.045, L * 0.01, 12), M.glow, [foot.x, foot.y, foot.z]));
		}
	}
	return g;
}

function arms(p: ModelParams, M: Mats) {
	const L = p.size;
	const g = new Group();
	const n = p.count ?? 4;
	const b = L * (p.dish ? 0.13 : 0.22);
	g.add(mesh(new BoxGeometry(b * 1.2, b * 0.8, b), M.foil));
	g.add(mesh(new BoxGeometry(b * 0.5, b * 0.82, b * 0.5), M.dark, [0, 0, b * 0.3]));
	if (p.dish) {
		for (const s of [-1, 1]) {
			const w = panel(L * 0.42, b * 1.2, M.pv, 2);
			w.position.set(s * (b * 0.6 + L * 0.21 + L * 0.02), 0, 0);
			w.rotation.set(-Math.PI / 2 + 0.35, 0, 0);
			g.add(w);
			g.add(rod(new Vector3(s * b * 0.6, 0, 0), new Vector3(s * (b * 0.6 + L * 0.02), 0, 0), b * 0.05, M.hull));
		}
		const pts = Array.from({ length: 9 }, (_, i) => new Vector2((i / 8) * b * 0.4, Math.pow(i / 8, 2) * b * 0.1));
		g.add(mesh(new LatheGeometry(pts, 20), M.radiator, [0, b * 0.6, -b * 0.3]));
	} else {
		// Thruster pods
		for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]] as const)
			g.add(mesh(new ConeGeometry(b * 0.08, b * 0.18, 8), M.dark, [x * b * 0.6, -b * 0.4, z * b * 0.5], [Math.PI, 0, 0]));
	}
	const reach = p.dish ? L * 0.14 : L * 0.36;
	for (let i = 0; i < n; i++) {
		const a = p.dish ? (i ? -0.5 : 0.5) : (i / n) * Math.PI * 2;
		const dir = p.dish ? new Vector3(Math.sin(a), -0.25, 1).normalize() : new Vector3(Math.cos(a), 0.15 * Math.sin(i * 1.7), Math.sin(a));
		const base = dir.clone().multiplyScalar(b * 0.55);
		const elbow = base.clone().add(dir.clone().multiplyScalar(reach * 0.5)).add(new Vector3(0, reach * 0.25, 0));
		const wrist = elbow.clone().add(dir.clone().multiplyScalar(reach * 0.5)).add(new Vector3(0, -reach * 0.15, 0));
		g.add(rod(base, elbow, L * 0.012, M.hull), rod(elbow, wrist, L * 0.01, M.hull));
		g.add(mesh(new SphereGeometry(L * 0.02, 10, 8), M.dark, elbow.toArray() as [number, number, number]));
		const tip = mesh(new ConeGeometry(L * 0.016, L * 0.04, 8), M.glow, wrist.toArray() as [number, number, number]);
		tip.quaternion.setFromUnitVectors(new Vector3(0, 1, 0), dir);
		g.add(tip);
	}
	return g;
}

function membrane(p: ModelParams, M: Mats) {
	const L = p.size;
	const g = new Group();
	const shape = p.shape ?? 'square';
	const mat = p.reflective ? M.mirror : p.radiator ? M.radiator : p.dish ? M.rectenna : M.pv;
	let sheet: Mesh;
	let corners: Vector3[];
	if (shape === 'hex' || shape === 'circle') {
		const segs = shape === 'hex' ? 6 : 72;
		sheet = new Mesh(new CircleGeometry(L / 2, segs), mat);
		const k = shape === 'hex' ? 6 : 8;
		corners = Array.from({ length: k }, (_, i) => {
			const a = (i / k) * Math.PI * 2;
			return new Vector3(Math.cos(a) * (L / 2), 0, -Math.sin(a) * (L / 2));
		});
	} else {
		const w = L,
			h = shape === 'rect' ? L * (p.aspect ?? 0.5) : L;
		sheet = new Mesh(new PlaneGeometry(w, h), mat);
		corners = [
			new Vector3(w / 2, 0, h / 2),
			new Vector3(-w / 2, 0, h / 2),
			new Vector3(-w / 2, 0, -h / 2),
			new Vector3(w / 2, 0, -h / 2)
		];
	}
	sheet.rotation.x = -Math.PI / 2;
	if (mat === M.pv) {
		const uv = sheet.geometry.attributes.uv;
		const rep = cellRepeat(L);
		for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * rep, uv.getY(i) * rep);
	}
	g.add(sheet);
	// Booms from the hub to each corner
	const br = Math.max(L * 0.003, 0.004);
	for (const c of corners) g.add(rod(new Vector3(0, br, 0), c.clone().setY(br), br, M.hull, 5));
	// Segment seams
	const seams: number[] = [];
	const n = shape === 'circle' ? 6 : 8;
	for (let k = 1; k < n; k++) {
		const t = -L / 2 + (k / n) * L;
		seams.push(t, L * 0.0015, -L / 2, t, L * 0.0015, L / 2, -L / 2, L * 0.0015, t, L / 2, L * 0.0015, t);
	}
	const seam = lines(seams, M.seam);
	if (shape !== 'square' && shape !== 'rect') seam.scale.setScalar(0.86);
	if (shape === 'rect') seam.scale.set(1, 1, p.aspect ?? 0.5);
	g.add(seam);
	// Hub
	const h = Math.max(L * 0.03, 0.02);
	g.add(mesh(new BoxGeometry(h, h * 0.5, h), M.foil, [0, h * 0.3, 0]));
	if (p.dish) {
		// Transmit/receive hub under the aperture
		g.add(mesh(new CylinderGeometry(L * 0.04, L * 0.06, L * 0.06, 16), M.hull, [0, -L * 0.05, 0]));
		g.add(mesh(new SphereGeometry(L * 0.02, 16, 12), M.glow, [0, L * 0.02, 0]));
		g.add(mesh(new TorusGeometry(L * 0.5, L * 0.004, 6, 96), M.hull, [0, 0, 0], [Math.PI / 2, 0, 0]));
	}
	if (p.reflective) {
		// Attitude vanes at alternate corners
		corners.forEach((c, i) => {
			if (i % 2) return;
			const v = panel(L * 0.06, L * 0.03, M.radiator);
			v.position.copy(c.clone().multiplyScalar(1.04));
			v.rotation.set(0.6, Math.atan2(c.x, c.z), 0);
			g.add(v);
		});
	}
	return g;
}

function tile(p: ModelParams, M: Mats) {
	const L = p.size;
	const g = new Group();
	const t = L * 0.035;
	const top = mesh(new CylinderGeometry(L / 2, L / 2, t * 0.3, 6), M.pv, [0, t * 0.35, 0]);
	const uv = top.geometry.attributes.uv;
	for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * 6, uv.getY(i) * 6);
	g.add(top);
	g.add(mesh(new CylinderGeometry(L * 0.49, L * 0.49, t * 0.4, 6), M.dark));
	g.add(mesh(new CylinderGeometry(L / 2, L / 2, t * 0.3, 6), M.radiator, [0, -t * 0.35, 0]));
	// Compute die grid glow on the edge
	for (let i = 0; i < 6; i++) {
		const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
		const r = (L / 2) * Math.cos(Math.PI / 6);
		g.add(mesh(new CylinderGeometry(t * 0.25, t * 0.25, t * 0.5, 10), M.glow, [Math.cos(a) * r, 0, Math.sin(a) * r], [0, -a, Math.PI / 2]));
	}
	return g;
}

function station(p: ModelParams, M: Mats) {
	const L = p.size;
	const g = new Group();
	const n = p.count ?? 6;
	const spine = L * 0.62;
	const tr = L * 0.012;
	// Truss spine (four longerons + cross braces)
	const rr = L * 0.03;
	for (const [y, z] of [[1, 1], [1, -1], [-1, 1], [-1, -1]] as const)
		g.add(rod(new Vector3(-spine / 2, y * rr, z * rr), new Vector3(spine / 2, y * rr, z * rr), tr, M.hull, 4));
	const braces: number[] = [];
	for (let k = 0; k <= 12; k++) {
		const x = -spine / 2 + (k / 12) * spine;
		const x2 = x + spine / 12;
		braces.push(x, rr, rr, k < 12 ? x2 : x, -rr, -rr, x, -rr, rr, k < 12 ? x2 : x, rr, -rr);
	}
	g.add(lines(braces, new LineBasicMaterial({ color: '#9aa6b5' })));
	// Pressurised / process modules around the spine
	const mr = L * 0.045,
		ml = L * 0.14;
	for (let i = 0; i < n; i++) {
		const a = (i / n) * Math.PI * 2;
		const x = -L * 0.12 + (i % 2) * L * 0.12;
		const m = mesh(new CylinderGeometry(mr, mr, ml, 20), i % 3 === 0 ? M.foil : M.hull, [x, Math.cos(a) * L * 0.09, Math.sin(a) * L * 0.09], [0, 0, Math.PI / 2]);
		g.add(m);
		g.add(mesh(new SphereGeometry(mr, 16, 10), M.hull, [x + ml / 2, m.position.y, m.position.z]));
	}
	// Radiators (aft) — two wings edge-on to the Sun
	for (const s of [-1, 1]) {
		const r = panel(L * 0.26, L * 0.16, M.radiator);
		r.position.set(-spine / 2 + L * 0.05, s * L * 0.11, 0);
		g.add(r);
		const r2 = panel(L * 0.26, L * 0.16, M.radiator);
		r2.position.set(-spine / 2 + L * 0.05, s * L * 0.28, 0);
		g.add(r2);
	}
	// PV wings (forward)
	const aspect = p.aspect ?? 0.6;
	for (const s of [-1, 1]) {
		const w = panel(L * 0.24, L * 0.3 * aspect, M.pv, 6);
		w.rotation.x = -Math.PI / 2;
		w.position.set(spine / 2 - L * 0.08, 0, s * (L * 0.06 + L * 0.15 * aspect));
		g.add(w);
	}
	if (p.concentrator) {
		const R = L * 0.16;
		const pts = Array.from({ length: 13 }, (_, i) => new Vector2((i / 12) * R, (Math.pow(i / 12, 2) * R) / 2.2));
		const dish = mesh(new LatheGeometry(pts, 48), M.mirror, [L * 0.08, L * 0.2, 0]);
		g.add(dish);
		g.add(rod(new Vector3(L * 0.08, rr, 0), new Vector3(L * 0.08, L * 0.2, 0), tr * 1.5, M.hull, 6));
		g.add(mesh(new SphereGeometry(R * 0.08, 16, 12), M.glow, [L * 0.08, L * 0.2 + R * 0.6, 0]));
		for (const a of [0, 2.1, 4.2])
			g.add(rod(new Vector3(L * 0.08 + Math.cos(a) * R, L * 0.2 + R / 2.2, Math.sin(a) * R), new Vector3(L * 0.08, L * 0.2 + R * 0.6, 0), tr * 0.5, M.hull, 4));
	}
	return g;
}

function tug(p: ModelParams, M: Mats) {
	const aspect = p.aspect ?? 0.7;
	const len = p.size / Math.max(1, aspect);
	const span = len * aspect;
	const g = new Group();
	const w = len * 0.13;
	// Payload container (front, +z)
	g.add(mesh(new BoxGeometry(w * 1.3, w * 1.3, len * 0.26), M.dark, [0, 0, len * 0.36]));
	g.add(mesh(new BoxGeometry(w * 1.32, w * 0.15, len * 0.26), M.foil, [0, w * 0.6, len * 0.36]));
	// Truss
	g.add(rod(new Vector3(0, 0, -len * 0.4), new Vector3(0, 0, len * 0.23), w * 0.12, M.hull));
	// Tanks
	for (const [x, y] of [[1, 1], [-1, 1], [1, -1], [-1, -1]] as const)
		g.add(mesh(new CylinderGeometry(w * 0.4, w * 0.4, len * 0.24, 20), M.radiator, [x * w * 0.45, y * w * 0.45, len * 0.02], [Math.PI / 2, 0, 0]));
	for (const [x, y] of [[1, 1], [-1, 1], [1, -1], [-1, -1]] as const)
		for (const s of [-1, 1])
			g.add(mesh(new SphereGeometry(w * 0.4, 16, 10), M.radiator, [x * w * 0.45, y * w * 0.45, len * 0.02 + s * len * 0.12]));
	// Engine cluster (aft, −z)
	g.add(mesh(new CylinderGeometry(w * 0.7, w * 0.7, len * 0.06, 6), M.dark, [0, 0, -len * 0.42], [Math.PI / 2, 0, 0]));
	for (let i = 0; i < 4; i++) {
		const a = (i / 4) * Math.PI * 2;
		g.add(mesh(new CylinderGeometry(w * 0.16, w * 0.16, len * 0.02, 20), M.glow, [Math.cos(a) * w * 0.35, Math.sin(a) * w * 0.35, -len * 0.46], [Math.PI / 2, 0, 0]));
	}
	// Ion plume
	const plume = mesh(new ConeGeometry(w * 0.9, len * 0.35, 24, 1, true), M.plasma.clone(), [0, 0, -len * 0.64], [-Math.PI / 2, 0, 0]);
	(plume.material as MeshBasicMaterial).color = new Color('#6fb6ff');
	(plume.material as MeshBasicMaterial).opacity = 0.18;
	g.add(plume);
	// Solar wings
	const wing = (span - w) / 2;
	for (const s of [-1, 1]) {
		const pnl = panel(wing, len * 0.16, M.pv, 4);
		pnl.rotation.x = -Math.PI / 2;
		pnl.position.set(s * (w / 2 + wing / 2), 0, -len * 0.12);
		g.add(pnl);
		g.add(rod(new Vector3((s * w) / 2, 0, -len * 0.12), new Vector3(s * (w / 2 + wing), 0, -len * 0.12), w * 0.03, M.hull, 4));
	}
	// Radiator fin
	const rad = panel(len * 0.18, w * 1.8, M.radiator);
	rad.rotation.y = Math.PI / 2;
	rad.position.set(0, w * 1.4, -len * 0.25);
	g.add(rad);
	return g;
}

function linear(p: ModelParams, M: Mats) {
	const L = p.size;
	const g = new Group();
	const n = p.count ?? 30;
	const half = L / 2;
	if (p.nozzle) {
		// Magnetic nozzle: coils widen from a narrow throat; plasma flares out
		const throat = L * 0.015,
			mouth = L * 0.12;
		for (let i = 0; i < n; i++) {
			const t = i / (n - 1);
			const x = -half * 0.7 + t * L * 0.85;
			const r = throat + (mouth - throat) * Math.pow(t, 1.6);
			g.add(mesh(new TorusGeometry(r, L * 0.0035 * (1 + t), 8, 48), M.coil, [x, 0, 0], [0, Math.PI / 2, 0]));
		}
		// Reaction chamber + feed
		g.add(mesh(new SphereGeometry(L * 0.05, 32, 16), M.hull, [-half * 0.78, 0, 0]));
		g.add(rod(new Vector3(-half, 0, 0), new Vector3(-half * 0.78, 0, 0), L * 0.012, M.dark));
		// Spine longerons
		for (let k = 0; k < 4; k++) {
			const a = (k / 4) * Math.PI * 2;
			g.add(rod(new Vector3(-half * 0.7, Math.cos(a) * throat * 1.6, Math.sin(a) * throat * 1.6), new Vector3(half * 0.7, Math.cos(a) * mouth * 1.05, Math.sin(a) * mouth * 1.05), L * 0.0015, M.hull, 4));
		}
		const pts = Array.from({ length: 24 }, (_, i) => {
			const t = i / 23;
			return new Vector2(throat * 0.6 + (mouth * 1.4 - throat) * Math.pow(t, 1.5), t * L * 0.95);
		});
		const plume = mesh(new LatheGeometry(pts, 48), M.plasma, [-half * 0.7, 0, 0], [0, 0, -Math.PI / 2]);
		g.add(plume);
		return g;
	}
	// Rail / coil track
	const rr = L * 0.006;
	const y0 = p.surface ? rr * 2.2 : 0;
	g.add(mesh(new BoxGeometry(L, rr * 0.6, rr * 2.4), M.dark, [0, y0 - rr * 1.2, 0]));
	for (const s of [-1, 1]) g.add(mesh(new BoxGeometry(L, rr * 0.5, rr * 0.3), M.hull, [0, y0, s * rr * 0.9]));
	const coilR = p.rings ? L * 0.02 : rr * 1.6;
	for (let i = 0; i < n; i++) {
		const x = -half + ((i + 0.5) / n) * L;
		g.add(mesh(new TorusGeometry(coilR, coilR * 0.18, 8, 32), M.coil, [x, y0 + (p.rings ? 0 : rr * 0.6), 0], [0, Math.PI / 2, 0]));
	}
	if (p.rings) {
		// Plasma column through the coils
		g.add(mesh(new CylinderGeometry(coilR * 0.35, coilR * 0.35, L, 24, 1, true), M.plasma, [0, y0, 0], [0, 0, Math.PI / 2]));
		for (let k = 0; k < 4; k++) {
			const a = (k / 4) * Math.PI * 2;
			g.add(rod(new Vector3(-half, Math.cos(a) * coilR * 1.15, Math.sin(a) * coilR * 1.15), new Vector3(half, Math.cos(a) * coilR * 1.15, Math.sin(a) * coilR * 1.15), coilR * 0.04, M.hull, 4));
		}
	}
	if (p.plume) {
		const pts = Array.from({ length: 16 }, (_, i) => {
			const t = i / 15;
			return new Vector2(coilR * 0.35 + coilR * 2 * t, t * L * 0.35);
		});
		g.add(mesh(new LatheGeometry(pts, 32), M.plasma, [half, y0, 0], [0, 0, -Math.PI / 2]));
	}
	if (p.surface) {
		// Lunar surface strip, capacitor banks, solar field
		const ground = mesh(new PlaneGeometry(L * 1.15, L * 0.22), M.ground, [0, 0, 0], [-Math.PI / 2, 0, 0]);
		g.add(ground);
		for (let i = 0; i < 10; i++) {
			const x = -half + ((i + 0.5) / 10) * L * 0.7;
			g.add(mesh(new BoxGeometry(L * 0.03, L * 0.008, L * 0.015), M.foil, [x, L * 0.004, L * 0.035]));
		}
		for (let i = 0; i < 6; i++) {
			const pnl = panel(L * 0.06, L * 0.04, M.pv, 3);
			pnl.rotation.x = -Math.PI / 2 + 0.25;
			pnl.position.set(-half + L * 0.05 + i * L * 0.07, L * 0.006, -L * 0.06);
			g.add(pnl);
		}
		// Muzzle ramp: last few percent lifted slightly
		g.add(mesh(new BoxGeometry(L * 0.04, rr * 3, rr * 3), M.hull, [half - L * 0.02, y0, 0]));
	}
	if (p.anchor) {
		const rock = new IcosahedronGeometry(L * 0.12, 2);
		const pos = rock.attributes.position;
		for (let i = 0; i < pos.count; i++) {
			const v = new Vector3().fromBufferAttribute(pos, i);
			const k = 1 + 0.18 * Math.sin(v.x * 7 / L * 10) * Math.cos(v.y * 5 / L * 10) + 0.08 * Math.sin(v.z * 13 / L * 10);
			pos.setXYZ(i, v.x * k, v.y * k * 0.8, v.z * k);
		}
		rock.computeVertexNormals();
		g.add(mesh(rock, M.rock, [-half - L * 0.08, 0, 0]));
		// Slug in flight past the muzzle
		g.add(mesh(new CylinderGeometry(rr * 1.2, rr * 1.2, rr * 4, 12), M.foil, [half + L * 0.06, y0, 0], [0, 0, Math.PI / 2]));
		g.add(mesh(new SphereGeometry(rr * 1.5, 10, 8), M.glow, [half + L * 0.06 + rr * 2.5, y0, 0]));
	}
	return g;
}

/** Dipole-like field line through a loop of radius R, in the xz plane rotated by φ. */
function fieldLine(R: number, scale: number, phi: number, out: number[], funnel: boolean) {
	const N = 48;
	let prev: Vector3 | null = null;
	for (let i = 0; i <= N; i++) {
		const t = -1 + (2 * i) / N;
		let r: number, y: number;
		if (funnel) {
			// Open funnel: wide far from the loop, pinched through it
			r = R * scale * (0.25 + 1.6 * t * t);
			y = t * R * 2.2;
		} else {
			const th = (0.08 + 0.84 * (i / N)) * Math.PI;
			const s = Math.sin(th);
			r = R * scale * s * s;
			y = R * scale * s * s * Math.cos(th) * 1.4;
		}
		const v = new Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r);
		if (prev) out.push(prev.x, prev.y, prev.z, v.x, v.y, v.z);
		prev = v;
	}
}

function coil(p: ModelParams, M: Mats) {
	const L = p.size;
	const R = L / 2;
	const g = new Group();
	const n = p.count ?? 1;
	for (let i = 0; i < n; i++) {
		const y = (i - (n - 1) / 2) * R * 0.18;
		const r = R * (1 - Math.abs(i - (n - 1) / 2) * 0.12);
		g.add(mesh(new TorusGeometry(r, R * 0.025, 12, 128), M.coil, [0, y, 0], [Math.PI / 2, 0, 0]));
		g.add(mesh(new TorusGeometry(r * 1.0, R * 0.012, 8, 128), M.glow, [0, y, 0], [Math.PI / 2, 0, 0]));
	}
	// Support spokes + central hub
	for (let k = 0; k < 6; k++) {
		const a = (k / 6) * Math.PI * 2;
		g.add(rod(new Vector3(0, 0, 0), new Vector3(Math.cos(a) * R, 0, Math.sin(a) * R), R * 0.006, M.hull, 4));
	}
	g.add(mesh(new CylinderGeometry(R * 0.06, R * 0.06, R * 0.08, 16), M.foil));
	// Field lines
	const fl: number[] = [];
	for (let k = 0; k < 16; k++) fieldLine(R, k % 2 ? 1.6 : 2.4, (k / 16) * Math.PI * 2, fl, !p.plume);
	g.add(lines(fl, M.field));
	if (p.plume) {
		// Lifted plasma column (toward the Sun, −y)
		const pts = Array.from({ length: 16 }, (_, i) => {
			const t = i / 15;
			return new Vector2(R * (0.08 + 0.5 * t * t), -t * R * 2.2);
		});
		g.add(mesh(new LatheGeometry(pts, 48), M.plasma));
	}
	return g;
}

const BUILDERS = { smallsat, rover, arms, membrane, tile, station, tug, linear, coil } as const;

/** Build an element model in metres. */
export function buildElement(m: ElementModel, params: ModelParams = m.params, archetype = m.archetype): Group {
	const M = mats();
	const g = BUILDERS[archetype](params, M);
	g.name = m.bomId;
	return g;
}

/** Replace every material with a ghost material in one colour (translucent fill + wireframe). */
export function ghostify(obj: Object3D, color: string): Object3D {
	const fill = new MeshBasicMaterial({ color, transparent: true, opacity: 0.07, depthWrite: false, side: DoubleSide });
	const wire = new MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.3, depthWrite: false });
	const line = new LineBasicMaterial({ color, transparent: true, opacity: 0.3 });
	const meshes: Mesh[] = [];
	obj.traverse((o) => {
		if (o instanceof LineSegments) o.material = line;
		else if (o instanceof Mesh) meshes.push(o);
	});
	for (const m of meshes) {
		m.material = fill;
		m.add(new Mesh(m.geometry, wire));
	}
	return obj;
}

/** Dispose geometries and materials under an object. */
export function disposeTree(obj: Object3D) {
	const seen = new Set<unknown>();
	obj.traverse((o) => {
		const m = o as Mesh;
		if (m.geometry && !seen.has(m.geometry)) {
			seen.add(m.geometry);
			m.geometry.dispose();
		}
		const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
		for (const mt of mats)
			if (!seen.has(mt)) {
				seen.add(mt);
				// The cell texture is shared; never dispose it
				(mt as Material).dispose();
			}
	});
}

/** Longest bounding-box dimension of everything drawn (m). */
export function extent(obj: Object3D): number {
	const size = new Box3().setFromObject(obj).getSize(new Vector3());
	return Math.max(size.x, size.y, size.z);
}
