/**
 * BOM Workbench: data + layout.
 *
 * Flying into a BOM item replaces the orrery with an abstract space built
 * from that item's consensus material:
 * - consensus core       — what all models agree on (key specifications)
 * - model satellites     — one per model spec file, in model colour
 * - divergence forks     — one per divergent-view topic; each position is a
 *                          branch that leans toward the models holding it
 * - open questions       — unresolved items from consensus.md
 * - research questions   — RQs linked through TRL assessments (status-coded)
 * - TRL gauges           — current vs target per technology
 *
 * Layout is a pure function of the data so it is deterministic and testable.
 * Scene units are arbitrary (the core has radius 1).
 */

import type { BOMItemSpec } from '$lib/types';
import type { DivergentViewPriority, DivergentViewTopic, ModelName } from '$lib/types/divergent-views';
import { fetchAllBOMSpecs } from '$lib/services/bom';
import { getAssessmentsForBOM, type TRLAssessment } from '$lib/services/trl-assessment';
import { getQuestion, type QuestionDependency } from '$lib/services/critical-path';
import type { Vec3 } from './registry';
import { getEntity } from './registry';

export interface WorkbenchData {
	bomId: string;
	phaseId: string;
	slug: string;
	name: string;
	spec: BOMItemSpec | null;
	trl: TRLAssessment[];
	questions: QuestionDependency[];
	blueprintUrl: string | null;
}

export function modelFamily(modelId: string): ModelName {
	if (modelId.startsWith('claude')) return 'Claude';
	if (modelId.startsWith('gemini')) return 'Gemini';
	return 'GPT';
}

async function exists(url: string): Promise<boolean> {
	try {
		const r = await fetch(url, { method: 'HEAD' });
		return r.ok;
	} catch {
		return false;
	}
}

export async function loadWorkbench(bomId: string): Promise<WorkbenchData | null> {
	const e = getEntity(bomId);
	if (!e || e.kind !== 'bom' || !e.phaseId) return null;
	const slug = e.bom?.slug ?? e.placement?.slug ?? '';
	const blueprint = `/content/bom-specs/${e.phaseId}/${slug}/blueprint.svg`;
	const [spec, hasBlueprint] = await Promise.all([fetchAllBOMSpecs(e.phaseId, slug), exists(blueprint)]);
	const trl = getAssessmentsForBOM(bomId);
	const questions = [...new Set(trl.flatMap((t) => t.relatedQuestionIds))]
		.map((id) => getQuestion(id))
		.filter((q): q is QuestionDependency => !!q);
	return {
		bomId,
		phaseId: e.phaseId,
		slug,
		name: e.name,
		spec,
		trl,
		questions,
		blueprintUrl: hasBlueprint ? blueprint : null
	};
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export type WbNodeKind = 'core' | 'model' | 'fork' | 'position' | 'spec' | 'open' | 'rq';

export interface WbSatellite {
	id: string;
	modelId: string;
	modelName: string;
	family: ModelName;
	generated: string;
	pos: Vec3;
}

export interface WbPosition {
	id: string;
	statement: string;
	models: ModelName[];
	pos: Vec3;
}

export interface WbFork {
	id: string;
	topic: DivergentViewTopic;
	priority: DivergentViewPriority;
	stem: Vec3;
	positions: WbPosition[];
}

export interface WbPoint {
	id: string;
	text: string;
	pos: Vec3;
}

export interface WbRq {
	id: string;
	q: QuestionDependency;
	pos: Vec3;
}

export interface WorkbenchLayout {
	satellites: WbSatellite[];
	forks: WbFork[];
	specs: WbPoint[];
	open: WbPoint[];
	rqs: WbRq[];
}

export const PRIORITY_ORDER: DivergentViewPriority[] = ['critical', 'high', 'medium', 'low'];
const STEM_LENGTH: Record<DivergentViewPriority, number> = { critical: 5.8, high: 5.1, medium: 4.5, low: 3.9 };
const SAT_RADIUS = 10;
const SAT_TILT = (18 * Math.PI) / 180;

const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scale = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s];
const len = (a: Vec3) => Math.hypot(a[0], a[1], a[2]);
const norm = (a: Vec3): Vec3 => {
	const l = len(a) || 1;
	return scale(a, 1 / l);
};
const cross = (a: Vec3, b: Vec3): Vec3 => [
	a[1] * b[2] - a[2] * b[1],
	a[2] * b[0] - a[0] * b[2],
	a[0] * b[1] - a[1] * b[0]
];

/** Even points on a sphere (golden-angle spiral), avoiding the exact poles. */
export function fibonacciSphere(n: number): Vec3[] {
	const out: Vec3[] = [];
	const ga = Math.PI * (3 - Math.sqrt(5));
	for (let i = 0; i < n; i++) {
		const y = 1 - ((i + 0.5) / n) * 2;
		const r = Math.sqrt(1 - y * y);
		out.push([Math.cos(ga * i) * r, y, Math.sin(ga * i) * r]);
	}
	return out;
}

/** Topics with priority; prose-only divergences (no YAML) become single-position forks. */
function topicsOf(spec: BOMItemSpec | null): DivergentViewTopic[] {
	if (!spec) return [];
	if (spec.divergentViewsData?.topics?.length) return spec.divergentViewsData.topics;
	return spec.consensus.divergentViews.map((text, i) => {
		const m = text.match(/^\*\*(.+?)\*\*:?\s*(.*)$/);
		return {
			id: `prose-${i}`,
			topic: m ? m[1].replace(/:$/, '') : text.slice(0, 60),
			positions: [{ statement: m ? m[2] : text, models: [] }],
			priority: 'medium'
		};
	});
}

export function layoutWorkbench(data: WorkbenchData): WorkbenchLayout {
	const specs = data.spec?.specs ?? [];

	// Model satellites on a tilted ring
	const satellites: WbSatellite[] = specs.map((s, i) => {
		const a = (i / Math.max(1, specs.length)) * Math.PI * 2 + Math.PI / 2;
		const x = Math.cos(a) * SAT_RADIUS;
		const z = Math.sin(a) * SAT_RADIUS;
		return {
			id: `model:${s.modelId}`,
			modelId: s.modelId,
			modelName: s.modelName,
			family: modelFamily(s.modelId),
			generated: s.generatedDate,
			pos: [x, z * Math.sin(SAT_TILT), z * Math.cos(SAT_TILT)]
		};
	});
	const familyCentroid = (families: ModelName[]): Vec3 | null => {
		const pts = satellites.filter((s) => families.includes(s.family)).map((s) => s.pos);
		if (!pts.length) return null;
		return scale(pts.reduce(add, [0, 0, 0] as Vec3), 1 / pts.length);
	};

	// Divergence forks: critical first so they get the first (top) directions
	const topics = topicsOf(data.spec)
		.map((t) => ({ t, p: (t.priority ?? 'medium') as DivergentViewPriority }))
		.sort((a, b) => PRIORITY_ORDER.indexOf(a.p) - PRIORITY_ORDER.indexOf(b.p));
	const dirs = fibonacciSphere(topics.length);
	const forks: WbFork[] = topics.map(({ t, p }, k) => {
		const d = dirs[k];
		const stem = scale(d, STEM_LENGTH[p]);
		// Fan basis perpendicular to the stem
		const u = norm(cross(d, Math.abs(d[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0]));
		const v = cross(d, u);
		const n = t.positions.length;
		const positions: WbPosition[] = t.positions.map((pos, j) => {
			const ang = (j / Math.max(1, n)) * Math.PI * 2;
			const fan: Vec3 = n > 1 ? add(scale(u, Math.cos(ang)), scale(v, Math.sin(ang))) : d;
			const target = familyCentroid(pos.models);
			// Lean toward the models that hold this position
			const lean = target ? norm(sub(target, stem)) : fan;
			const dir = norm(add(scale(fan, 0.3), add(scale(lean, 0.75), scale(d, 0.3))));
			return { id: `${t.id}:${j}`, statement: pos.statement, models: pos.models, pos: add(stem, scale(dir, 2.2)) };
		});
		return { id: t.id, topic: t, priority: p, stem, positions };
	});

	// Agreed key specs: an equatorial ring of chips around the core
	const keySpecs = data.spec?.consensus.keySpecs ?? [];
	const specPts: WbPoint[] = keySpecs.map((text, i) => {
		const a = (i / Math.max(1, keySpecs.length)) * Math.PI * 2;
		return { id: `spec:${i}`, text, pos: [Math.cos(a) * 2, 0, Math.sin(a) * 2] };
	});

	// Open questions: a steep ring, dim
	const openQs = data.spec?.consensus.openQuestions ?? [];
	const open: WbPoint[] = openQs.map((text, i) => {
		const a = (i / Math.max(1, openQs.length)) * Math.PI * 2;
		return { id: `open:${i}`, text, pos: [Math.cos(a) * 2.9, Math.sin(a) * 2.9, Math.sin(a) * 0.8] };
	});

	// Linked research questions: a row beneath the core
	const rqs: WbRq[] = data.questions.map((q, i) => {
		const n = data.questions.length;
		return { id: `rq:${q.questionId}`, q, pos: [(i - (n - 1) / 2) * 1.8, -7, 2] };
	});

	return { satellites, forks, specs: specPts, open, rqs };
}
