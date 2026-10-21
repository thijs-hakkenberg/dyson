#!/usr/bin/env node
/**
 * Build the Phase 0 BOM the site and explorer read, from the reconciliation files only:
 *
 *   reconciliation/phase-0/bom-structure.yaml   items, slugs, 0A/0B split (owner decision 2026-10-20)
 *   reconciliation/phase-0/bom-numbers.yaml     quantities and cost envelopes from the regenerated consensus
 *
 * Writes src/lib/data/phase-0-bom.json. Contingency (bom-0-17) is computed from its rates on the
 * 0A and 0B base; phase totals are sums of envelopes (min with min, max with max), never averages.
 *
 *   node scripts/build-bom-data.js          # write
 *   node scripts/build-bom-data.js --check  # exit 1 if the committed file is stale
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = 'src/lib/data/phase-0-bom.json';
const read = (f) => fs.readFile(path.join(ROOT, f), 'utf-8');

function num(x, where) {
	const n = typeof x === 'string' ? Number(x) : x;
	if (typeof n !== 'number' || !Number.isFinite(n)) throw new Error(`${where}: not a number: ${x}`);
	return n;
}

/** { min, max, point, pointIsMidpoint, conditional?, ifExercised? } from a bom-numbers.yaml block */
function envelope(block, where) {
	if (!block) throw new Error(`${where}: missing`);
	let min, max;
	if (block.derived) {
		const d = block.derived;
		min = num(d.per_year[0], where) * num(d.years[0], where) + num(d.one_time?.[0] ?? 0, where);
		max = num(d.per_year[1], where) * num(d.years[1], where) + num(d.one_time?.[1] ?? 0, where);
	} else {
		[min, max] = block.range.map((x) => num(x, where));
	}
	if (min > max) throw new Error(`${where}: min > max`);
	const stated = block.point != null ? num(block.point, where) : null;
	const out = {
		min,
		max,
		point: stated ?? (min + max) / 2,
		pointIsMidpoint: stated == null
	};
	if (block.derived) out.derivation = block.derived.note;
	if (block.conditional) {
		// Not flown at the low end; the stated range is the cost if it is.
		out.conditional = block.conditional;
		out.ifExercised = { min, max };
		out.min = 0;
	}
	return out;
}

const add = (...es) => ({
	min: es.reduce((s, e) => s + e.min, 0),
	max: es.reduce((s, e) => s + e.max, 0),
	point: es.reduce((s, e) => s + e.point, 0)
});

/** high ≤1.5×, medium ≤3×, low otherwise (max over min of the 0A+0B envelope) */
function confidence({ min, max }) {
	if (min <= 0) return 'low';
	const spread = max / min;
	return spread <= 1.5 ? 'high' : spread <= 3 ? 'medium' : 'low';
}

async function build() {
	const structure = yaml.load(await read('reconciliation/phase-0/bom-structure.yaml'));
	const numbers = yaml.load(await read('reconciliation/phase-0/bom-numbers.yaml'));
	const c = numbers.contingency;

	const base = structure.items
		.filter((s) => s.bomId !== c.bomId)
		.map((s) => {
			const n = numbers.items[s.bomId];
			if (!n) throw new Error(`${s.bomId}: no entry in bom-numbers.yaml`);
			const a = envelope(n.a, `${s.bomId}.a`);
			const b = envelope(n.b, `${s.bomId}.b`);
			const total = add(a, b);
			return {
				bomId: s.bomId,
				slug: s.slug,
				name: s.name,
				category: s.category,
				subPhase: s.sub_phase,
				scope: s.scope.trim(),
				quantity: n.quantity,
				...(n.unit_cost ? { unitCost: { min: num(n.unit_cost[0]), max: num(n.unit_cost[1]) } } : {}),
				a,
				b,
				total,
				costConfidence: confidence(total),
				source: n.source
			};
		});
	const extra = Object.keys(numbers.items).filter((id) => !base.some((i) => i.bomId === id));
	if (extra.length) throw new Error(`bom-numbers.yaml has items not in bom-structure.yaml: ${extra.join(', ')}`);

	const baseA = add(...base.map((i) => i.a));
	const baseB = add(...base.map((i) => i.b));
	const rate = (r, x) => ({ min: x.min * r.rate[0], max: x.max * r.rate[1], point: x.point * r.point });
	const ca = { ...rate(c.a, baseA), pointIsMidpoint: false, rate: c.a.rate, ratePoint: c.a.point, note: c.a.note };
	const cb = { ...rate(c.b, baseB), pointIsMidpoint: false, rate: c.b.rate, ratePoint: c.b.point, note: c.b.note };
	const cs = structure.items.find((s) => s.bomId === c.bomId);
	const contingencyItem = {
		bomId: cs.bomId,
		slug: cs.slug,
		name: cs.name,
		category: cs.category,
		subPhase: cs.sub_phase,
		scope: cs.scope.trim(),
		quantity: { value: 1, unit: 'reserve', note: `0A ${pct(c.a.rate)}, 0B ${pct(c.b.rate)} of base` },
		a: ca,
		b: cb,
		total: add(ca, cb),
		costConfidence: 'low',
		source: c.source
	};

	const items = structure.items.map((s) => (s.bomId === c.bomId ? contingencyItem : base.find((i) => i.bomId === s.bomId)));
	const withA = add(baseA, ca);
	const withB = add(baseB, cb);
	return {
		schema: 'project-dyson/phase-0-bom@1',
		structureDecided: structure.decided,
		consensusGenerated: numbers.consensus_generated,
		panel: ['Claude Opus 5.5', 'Gemini 3.1 Pro', 'GPT-6.1 Sol'],
		sources: { structure: 'reconciliation/phase-0/bom-structure.yaml', numbers: 'reconciliation/phase-0/bom-numbers.yaml' },
		items,
		totals: {
			base: { a: baseA, b: baseB, all: add(baseA, baseB) },
			contingency: { a: ca, b: cb },
			withContingency: { a: withA, b: withB, all: add(withA, withB) }
		},
		removed: structure.removed,
		notAdopted: structure.not_adopted
	};
}

function pct([lo, hi]) {
	return `${Math.round(lo * 100)}–${Math.round(hi * 100)}%`;
}

const text = JSON.stringify(await build(), null, '\t') + '\n';
if (process.argv.includes('--check')) {
	const cur = await read(OUT).catch(() => '');
	if (cur !== text) {
		console.error(`stale: ${OUT} (run node scripts/build-bom-data.js)`);
		process.exit(1);
	}
	process.exit(0);
}
await fs.mkdir(path.join(ROOT, 'src/lib/data'), { recursive: true });
await fs.writeFile(path.join(ROOT, OUT), text);
const t = JSON.parse(text).totals.withContingency;
const B = (x) => `$${(x / 1e9).toFixed(1)}B`;
console.log(`17 items · 0A ${B(t.a.min)}–${B(t.a.max)} · 0B ${B(t.b.min)}–${B(t.b.max)} · all ${B(t.all.min)}–${B(t.all.max)} (with contingency)`);
