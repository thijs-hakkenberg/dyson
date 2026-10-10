import { describe, expect, it } from 'vitest';
import { downstreamOf, layoutNebula, mergeQuestions, upstreamOf } from '../nebula';
import { QUESTION_DEPENDENCIES } from '$lib/services/critical-path';

const q = (id: string, bom: string, phase = 'phase-0', extra: Record<string, unknown> = {}) => ({
	id,
	slug: id,
	title: id,
	status: 'open' as const,
	priority: 'medium' as const,
	sourcePhaseId: phase,
	sourceBOMItemId: bom,
	relatedBOMItems: [],
	relatedQuestionIds: [],
	questionType: 'analysis',
	...extra
});

describe('research nebula', () => {
	it('merges frontmatter with the Phase 0 graph and keeps every graph question', () => {
		const merged = mergeQuestions({ questions: [q('rq-1-1', 'bom-1-1', 'phase-1')] as never });
		for (const c of QUESTION_DEPENDENCIES) expect(merged.find((m) => m.id === c.questionId)).toBeTruthy();
		expect(merged.find((m) => m.id === 'rq-1-1')?.phaseId).toBe('phase-1');
	});

	it('Phase 0 status/priority come from critical-path.ts', () => {
		const c = QUESTION_DEPENDENCIES[0];
		const merged = mergeQuestions({
			questions: [q(c.questionId, 'bom-0-1', 'phase-0', { status: 'open', priority: 'low' })] as never
		});
		const m = merged.find((x) => x.id === c.questionId)!;
		expect(m.status).toBe(c.status);
		expect(m.priority).toBe(c.priority);
	});

	it('places phases in order along x and builds critical edges', () => {
		const L = layoutNebula(mergeQuestions({ questions: [q('rq-2-1', 'bom-2-1', 'phase-2')] as never }));
		const p0 = L.rqs.filter((r) => r.phaseId === 'phase-0').map((r) => r.pos[0]);
		const p2 = L.rqs.find((r) => r.id === 'rq-2-1')!.pos[0];
		expect(Math.max(...p0)).toBeLessThan(p2);
		const crit = L.edges.filter((e) => e.kind === 'critical');
		expect(crit.length).toBeGreaterThan(0);
		for (const e of crit) {
			const dep = L.rqs.find((r) => r.id === e.from)!;
			const to = L.rqs.find((r) => r.id === e.to)!;
			expect(dep.criticalPath && to.criticalPath).toBe(true);
			expect(to.dependsOn).toContain(dep.id);
		}
		expect(L.gates.length).toBeGreaterThan(0);
	});

	it('upstream closure follows dependsOn transitively', () => {
		const rqs = [
			{ id: 'a', sourceBomId: 'x', relatedBom: [], dependsOn: ['b'] },
			{ id: 'b', sourceBomId: 'y', relatedBom: [], dependsOn: ['c'] },
			{ id: 'c', sourceBomId: 'y', relatedBom: [], dependsOn: [] },
			{ id: 'd', sourceBomId: 'z', relatedBom: [], dependsOn: [] }
		];
		expect([...upstreamOf('x', rqs)].sort()).toEqual(['a', 'b', 'c']);
		expect(
			[
				...downstreamOf(
					'c',
					rqs.map((r) => ({ ...r, blocks: [] }))
				)
			].sort()
		).toEqual(['a', 'b']);
	});
});
