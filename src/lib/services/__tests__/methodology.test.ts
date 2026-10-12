// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { createHash } from 'crypto';
import { getMethodologyDocs, getMethodologyDoc, critiqueRoundsFor } from '../methodology';
import { SCAFFOLD } from '../../../../scripts/lib/critique.js';

describe('methodology content', () => {
	it('lists the decision frameworks document', () => {
		const docs = getMethodologyDocs();
		expect(docs.map((d) => d.slug)).toContain('decision-frameworks');
		const d = docs.find((x) => x.slug === 'decision-frameworks')!;
		expect(d.title).toBe('Trade-off Decision Frameworks');
		expect(d.summary.length).toBeGreaterThan(20);
	});

	it('renders the document with anchored headings and a table of contents', () => {
		const d = getMethodologyDoc('decision-frameworks')!;
		expect(d.html).toContain('<h2 id="composite-scaffold">Composite Scaffold</h2>');
		expect(d.html).not.toContain('<h1');
		expect(d.toc.map((t) => t.id)).toContain('suggested-parallel-test');
		expect(d.toc[0]).toEqual({ id: '1-systems-software-architecture', text: '1. Systems & Software Architecture' });
	});

	it('extracts the scaffold the critique prompt uses', () => {
		const d = getMethodologyDoc('decision-frameworks')!;
		expect(d.scaffold.map((s) => s.step)).toEqual(SCAFFOLD);
		expect(d.scaffold[1].sources).toBe('Value-Focused Thinking, swing weights');
	});

	it('hashes the body the same way the scripts do', () => {
		const d = getMethodologyDoc('decision-frameworks')!;
		expect(d.sha).toBe(createHash('sha256').update(d.body).digest('hex').slice(0, 12));
	});

	it('finds critique rounds by framework hash and flags stale ones', () => {
		const files = {
			'/reconciliation/phase-0/round-2/reconciliation/phase.md': '---\nphase: phase-0\nitem: phase\nround: 2\ntype: reconciliation\nsynthesizer: claude-opus-5-5\nframework: aaaaaaaaaaaa\n---\nx',
			'/reconciliation/phase-0/round-2/reconciliation/bom-0-1.md': '---\nphase: phase-0\nitem: bom-0-1\nround: 2\nframework: aaaaaaaaaaaa\n---\nx',
			'/reconciliation/phase-0/round-1/reconciliation/phase.md': '---\nphase: phase-0\nitem: phase\nround: 1\n---\nx',
			'/reconciliation/phase-1/round-3/reconciliation/phase.md': '---\nphase: phase-1\nitem: phase\nround: 3\nframework: bbbbbbbbbbbb\n---\nx'
		};
		const rounds = critiqueRoundsFor('aaaaaaaaaaaa', files);
		expect(rounds).toEqual([
			{ phase: 'phase-0', round: 2, items: 2, synthesizer: 'claude-opus-5-5', current: true, path: 'reconciliation/phase-0/round-2' },
			{ phase: 'phase-1', round: 3, items: 1, synthesizer: null, current: false, path: 'reconciliation/phase-1/round-3' }
		]);
	});
});
