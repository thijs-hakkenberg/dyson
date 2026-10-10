import { describe, expect, it } from 'vitest';
import { COLLECTORS_PER_SHEPHERD, networkAt } from '../network';
import { phaseWindow } from '../timeline';
import { LIGHT_SECONDS_PER_AU } from '../units';

const at = (id: string, f: number) => {
	const w = phaseWindow(id)!;
	return w.start + (w.end - w.start) * f;
};

describe('network topology', () => {
	it('is empty before Phase 0', () => {
		expect(networkAt(2026).links).toHaveLength(0);
	});

	it('Earth–L1 is ~5 light-seconds; Earth–L4 ~1 AU of light time', () => {
		const n = networkAt(at('phase-1', 0.5));
		const l1 = n.links.find((l) => l.a === 'net:earth' && l.b === 'net:l1')!;
		expect(l1.latency).toBeGreaterThan(4);
		expect(l1.latency).toBeLessThan(6);
		const l4 = n.links.find((l) => l.b === 'net:l4')!;
		expect(l4.latency / LIGHT_SECONDS_PER_AU).toBeCloseTo(1, 1);
	});

	it('Shepherd count follows the consensus ratio', () => {
		const n = networkAt(at('phase-2', 0.99));
		const p2 = n.shepherds.find((s) => s.bomId === 'bom-2-1')!;
		expect(p2.represented).toBe(Math.ceil((100000 * 0.99999) / COLLECTORS_PER_SHEPHERD));
		expect(p2.drawn).toBeLessThanOrEqual(p2.represented);
		const mesh = n.links.filter((l) => l.kind === 'mesh' && l.phaseId === 'phase-2');
		expect(mesh.length).toBe(p2.drawn);
	});

	it('every link references existing nodes; trunks appear in Phase 3a', () => {
		const n = networkAt(at('phase-3a', 0.9));
		const ids = new Set(n.nodes.map((x) => x.id));
		for (const l of n.links) expect(ids.has(l.a) && ids.has(l.b)).toBe(true);
		expect(n.links.some((l) => l.kind === 'trunk')).toBe(true);
	});
});
