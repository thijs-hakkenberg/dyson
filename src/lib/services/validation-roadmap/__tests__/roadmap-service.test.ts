import { describe, expect, it } from 'vitest';
import { getExperiments } from '../roadmap-service';
import { TRL_ASSESSMENTS } from '$lib/services/trl-assessment';

describe('validation roadmap', () => {
	it('maps Phase 0 experiments to current TRL technologies', async () => {
		const ids = new Set(TRL_ASSESSMENTS.map((t) => t.id));
		const exps = await getExperiments();
		const mapped = exps.filter((e) => e.relatedTechnologies?.length);
		expect(mapped.length).toBeGreaterThan(0);
		for (const e of mapped) {
			for (const t of e.relatedTechnologies!) expect(ids, e.id).toContain(t);
			expect(e.trlTarget, e.id).toBeTruthy();
		}
		expect(exps.find((e) => e.id === 'exp-001')?.trlTarget).toContain('KDP-0B');
	});
});
