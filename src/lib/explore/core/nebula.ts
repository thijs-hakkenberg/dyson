/**
 * Research Nebula: the knowledge graph as a place.
 *
 * All research questions (every phase) are laid out along a phase axis
 * (P0 → P1 → P2 → P3a/P3b), clustered around the BOM item that raised them.
 * Phase 0 carries the dependency graph from critical-path.ts; the critical
 * path is drawn as an artery. Decision gates sit in the P0 segment at their
 * decision month. Status is the material: open = haze, investigating = live,
 * answered = crystal.
 *
 * Status for Phase 0 comes from critical-path.ts (authoritative); other
 * phases use the question frontmatter.
 */

import { PHASES } from '$lib/services/content';
import { QUESTION_DEPENDENCIES, TECHNOLOGY_THREADS } from '$lib/services/critical-path';
import { DECISION_GATES, getGateReadiness, type DecisionGate } from '$lib/services/decision-gates';
import { fetchAllQuestions } from '$lib/services/questions/questions-fetchers';
import type { ResearchQuestion } from '$lib/types/entities';
import type { Vec3 } from './registry';
import { fibonacciSphere } from './workbench';

export type RqStatus = 'open' | 'investigating' | 'answered';
export type RqPriority = 'critical' | 'high' | 'medium' | 'low';

export interface NebulaRq {
	id: string;
	slug: string;
	title: string;
	phaseId: string;
	status: RqStatus;
	priority: RqPriority;
	sourceBomId: string;
	relatedBom: string[];
	related: string[];
	dependsOn: string[];
	blocks: string[];
	criticalPath: boolean;
	threadId?: string;
	questionType?: string;
	hasLiterature: boolean;
	hasConclusion: boolean;
	gateDescription?: string;
	pos: Vec3;
}

export interface NebulaAnchor {
	bomId: string;
	name: string;
	phaseId: string;
	pos: Vec3;
	rqCount: number;
}

export interface NebulaGate {
	gate: DecisionGate;
	readiness: number;
	pos: Vec3;
}

export type EdgeKind = 'depends' | 'critical' | 'related' | 'gate';
export interface NebulaEdge {
	from: string;
	to: string;
	kind: EdgeKind;
	a: Vec3;
	b: Vec3;
}

export interface PhaseSegment {
	phaseId: string;
	x0: number;
	x1: number;
	yOffset: number;
}

export interface NebulaLayout {
	rqs: NebulaRq[];
	anchors: NebulaAnchor[];
	gates: NebulaGate[];
	edges: NebulaEdge[];
	segments: PhaseSegment[];
}

export const SEGMENTS: PhaseSegment[] = [
	{ phaseId: 'phase-0', x0: -38, x1: -12, yOffset: 0 },
	{ phaseId: 'phase-1', x0: -6, x1: 12, yOffset: 0 },
	{ phaseId: 'phase-2', x0: 18, x1: 30, yOffset: 0 },
	{ phaseId: 'phase-3a', x0: 36, x1: 44, yOffset: 6 },
	{ phaseId: 'phase-3b', x0: 36, x1: 44, yOffset: -6 }
];

const ANCHOR_RADIUS = 6.5;
const GATE_RADIUS = 11;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

export interface RqSource {
	questions: Pick<
		ResearchQuestion,
		| 'id'
		| 'slug'
		| 'title'
		| 'status'
		| 'priority'
		| 'sourcePhaseId'
		| 'sourceBOMItemId'
		| 'relatedBOMItems'
		| 'relatedQuestionIds'
		| 'questionType'
	>[];
}

/** Merge frontmatter questions with the Phase 0 critical-path graph. */
export function mergeQuestions(src: RqSource): Omit<NebulaRq, 'pos'>[] {
	const cp = new Map(QUESTION_DEPENDENCIES.map((q) => [q.questionId, q]));
	const seen = new Set<string>();
	const out: Omit<NebulaRq, 'pos'>[] = [];
	for (const q of src.questions) {
		const c = cp.get(q.id);
		seen.add(q.id);
		out.push({
			id: q.id,
			slug: q.slug,
			title: q.title,
			phaseId: q.sourcePhaseId,
			status: (c?.status ?? q.status) as RqStatus,
			priority: (c?.priority ?? q.priority) as RqPriority,
			sourceBomId: q.sourceBOMItemId,
			relatedBom: (q.relatedBOMItems ?? []) as string[],
			related: (q.relatedQuestionIds ?? []) as string[],
			dependsOn: c?.dependsOn ?? [],
			blocks: c?.blocks ?? [],
			criticalPath: c?.criticalPath ?? false,
			threadId: c?.threadId,
			questionType: q.questionType,
			hasLiterature: c?.hasLiteratureReview ?? false,
			hasConclusion: c?.hasConclusion ?? false,
			gateDescription: c?.gateDescription
		});
	}
	// Phase 0 questions known to the dependency graph but missing a file still belong in the graph
	for (const c of QUESTION_DEPENDENCIES) {
		if (seen.has(c.questionId)) continue;
		out.push({
			id: c.questionId,
			slug: c.slug,
			title: c.title,
			phaseId: 'phase-0',
			status: c.status,
			priority: c.priority,
			sourceBomId: '',
			relatedBom: [],
			related: [],
			dependsOn: c.dependsOn,
			blocks: c.blocks,
			criticalPath: c.criticalPath,
			threadId: c.threadId,
			hasLiterature: c.hasLiteratureReview,
			hasConclusion: c.hasConclusion,
			gateDescription: c.gateDescription
		});
	}
	return out;
}

export function layoutNebula(questions: Omit<NebulaRq, 'pos'>[]): NebulaLayout {
	const segOf = (phaseId: string) => SEGMENTS.find((s) => s.phaseId === phaseId) ?? SEGMENTS[0];
	const anchors: NebulaAnchor[] = [];
	const anchorPos = new Map<string, Vec3>();

	for (const phase of PHASES) {
		const seg = segOf(phase.id);
		const n = phase.bom.length;
		phase.bom.forEach((b, k) => {
			const x = seg.x0 + ((k + 0.5) / n) * (seg.x1 - seg.x0);
			const a = k * GOLDEN * 1.7;
			const pos: Vec3 = [x, Math.cos(a) * ANCHOR_RADIUS + seg.yOffset, Math.sin(a) * ANCHOR_RADIUS];
			anchorPos.set(b.id, pos);
			anchors.push({
				bomId: b.id,
				name: b.name,
				phaseId: phase.id,
				pos,
				rqCount: questions.filter((q) => q.sourceBomId === b.id).length
			});
		});
	}

	// Cluster each BOM item's questions on a small sphere around its anchor
	const groups = new Map<string, Omit<NebulaRq, 'pos'>[]>();
	for (const q of questions) {
		const key = anchorPos.has(q.sourceBomId) ? q.sourceBomId : `phase:${q.phaseId}`;
		const g = groups.get(key) ?? [];
		g.push(q);
		groups.set(key, g);
	}
	const rqs: NebulaRq[] = [];
	for (const [key, g] of groups) {
		let centre: Vec3;
		if (key.startsWith('phase:')) {
			const seg = segOf(key.slice(6));
			centre = [(seg.x0 + seg.x1) / 2, seg.yOffset, 0];
		} else centre = anchorPos.get(key)!;
		const r = 1.2 + 0.14 * g.length;
		const pts = fibonacciSphere(g.length);
		g.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
		g.forEach((q, i) => {
			const p = pts[i];
			rqs.push({ ...q, pos: [centre[0] + p[0] * r, centre[1] + p[1] * r, centre[2] + p[2] * r] });
		});
	}

	const byId = new Map(rqs.map((q) => [q.id, q]));
	const edges: NebulaEdge[] = [];
	for (const q of rqs) {
		for (const d of q.dependsOn) {
			const dep = byId.get(d);
			if (!dep) continue;
			edges.push({
				from: d,
				to: q.id,
				kind: q.criticalPath && dep.criticalPath ? 'critical' : 'depends',
				a: dep.pos,
				b: q.pos
			});
		}
		for (const r of q.related) {
			const o = byId.get(r);
			if (!o || o.id <= q.id) continue;
			edges.push({ from: q.id, to: r, kind: 'related', a: q.pos, b: o.pos });
		}
	}

	// Decision gates in the Phase 0 segment at their decision month
	const seg0 = segOf('phase-0');
	const maxMonth = Math.max(...DECISION_GATES.map((g) => g.decisionMonth), 1);
	const threadIdx = (id: string) =>
		Math.max(
			0,
			TECHNOLOGY_THREADS.findIndex((t) => t.id === id)
		);
	const gates: NebulaGate[] = DECISION_GATES.map((gate) => {
		const x = seg0.x0 + (gate.decisionMonth / maxMonth) * (seg0.x1 - seg0.x0);
		const a = (threadIdx(gate.threadId) / Math.max(1, TECHNOLOGY_THREADS.length)) * Math.PI * 2;
		return {
			gate,
			readiness: getGateReadiness(gate),
			pos: [x, Math.cos(a) * GATE_RADIUS, Math.sin(a) * GATE_RADIUS] as Vec3
		};
	});
	for (const g of gates) {
		for (const qid of g.gate.relatedQuestionIds) {
			const q = byId.get(qid);
			if (q) edges.push({ from: qid, to: g.gate.id, kind: 'gate', a: q.pos, b: g.pos });
		}
	}

	return { rqs, anchors, gates, edges, segments: SEGMENTS };
}

/**
 * Questions upstream of a BOM item: those it raised or relates to, plus
 * everything they transitively depend on.
 */
export function upstreamOf(bomId: string, rqs: Pick<NebulaRq, 'id' | 'sourceBomId' | 'relatedBom' | 'dependsOn'>[]) {
	const byId = new Map(rqs.map((q) => [q.id, q]));
	const out = new Set<string>();
	const stack = rqs.filter((q) => q.sourceBomId === bomId || q.relatedBom.includes(bomId)).map((q) => q.id);
	while (stack.length) {
		const id = stack.pop()!;
		if (out.has(id)) continue;
		out.add(id);
		for (const d of byId.get(id)?.dependsOn ?? []) stack.push(d);
	}
	return out;
}

/** Everything a question unlocks downstream (transitively, via `blocks` and reverse dependsOn). */
export function downstreamOf(id: string, rqs: Pick<NebulaRq, 'id' | 'dependsOn' | 'blocks'>[]) {
	const out = new Set<string>();
	const stack = [id];
	while (stack.length) {
		const cur = stack.pop()!;
		for (const q of rqs) {
			if ((q.dependsOn.includes(cur) || rqs.find((x) => x.id === cur)?.blocks.includes(q.id)) && !out.has(q.id)) {
				out.add(q.id);
				stack.push(q.id);
			}
		}
	}
	return out;
}

export async function loadNebula(): Promise<NebulaLayout> {
	const questions = await fetchAllQuestions();
	return layoutNebula(mergeQuestions({ questions }));
}
