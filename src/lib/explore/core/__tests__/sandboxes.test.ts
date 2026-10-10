import { describe, expect, it } from 'vitest';
import { SANDBOXES, sandboxesFor } from '../sandboxes';
import { getEntity } from '../registry';

describe('simulation sandboxes', () => {
	it('every sandbox targets real BOM items and has defaults for every param', () => {
		for (const s of SANDBOXES) {
			for (const b of s.bomIds) expect(getEntity(b)?.kind).toBe('bom');
			for (const p of s.params) expect(p.options.map((o) => o.value)).toContain(s.defaults[p.id]);
		}
		expect(sandboxesFor('bom-1-1').map((s) => s.id)).toContain('radiation');
	});

	for (const s of SANDBOXES) {
		it(`${s.id} runs with defaults and returns finite series`, async () => {
			const r = await s.run(s.defaults);
			expect(r.series.length).toBeGreaterThan(0);
			for (const ser of r.series) {
				expect(ser.points.length).toBeGreaterThan(1);
				for (const [x, y] of ser.points) {
					expect(Number.isFinite(x)).toBe(true);
					expect(Number.isFinite(y)).toBe(true);
				}
			}
			expect(r.facts.length).toBeGreaterThan(0);
		}, 30000);
	}

	it('radiation: closer orbits degrade faster in relative terms', async () => {
		const s = SANDBOXES.find((x) => x.id === 'radiation')!;
		const r = await s.run(s.defaults);
		const rel = (label: string) => {
			const pts = r.series.find((x) => x.label === label)!.points;
			return pts.at(-1)![1] / pts[0][1];
		};
		expect(rel('0.3 AU')).toBeLessThan(rel('1 AU'));
	}, 30000);
});
