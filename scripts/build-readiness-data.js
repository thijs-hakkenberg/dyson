#!/usr/bin/env node
/**
 * Build the Phase 0 readiness data the site and explorer read, from the reconciliation files only:
 *
 *   reconciliation/phase-0/trl/round-1/trl-baseline.yaml     panel ratings (owner rulings applied)
 *   reconciliation/phase-0/trl/inventory.yaml                technology list, required scale, legacy ids, RQs
 *   reconciliation/phase-0/trl/brief.yaml                    deferred March rows
 *   reconciliation/phase-0/trl/round-1/assess/<model>/Tnn.md per-model YAML: evidence, path, fallback
 *   reconciliation/phase-0/trl/round-1/assess/synthesis/     consolidated path tables
 *   reconciliation/phase-0/trl/round-1/gates-proposal.yaml   gates under D-02
 *   reconciliation/phase-0/trl/criterion-status.yaml         decided / interim / pending per criterion
 *   reconciliation/phase-0/trl/gate-rulings.yaml             confirmed gate rulings
 *   reconciliation/phase-0/decisions.md                      D-01 … D-05 sign-off
 *   reconciliation/phase-0/round-2/reconciliation/phase.md   agreed architecture, phase cost, BOM delta
 *
 * Writes src/lib/data/phase-0-readiness.json (core) and phase-0-readiness-evidence.json
 * (per-model evidence and paths, loaded only by pages that show them).
 *
 *   node scripts/build-readiness-data.js          # write
 *   node scripts/build-readiness-data.js --check  # exit 1 if the committed files are stale
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { lastYaml } from './lib/yaml-block.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TRL = 'reconciliation/phase-0/trl';
const MODELS = { 'claude-opus-5-5': 'Claude Opus 5.5', 'gemini-3-1-pro': 'Gemini 3.1 Pro', 'gpt-6-1-sol': 'GPT-6.1 Sol' };

// Thread and BOM placement of each technology. Not in the panel output; set here so the
// explorer can place technologies. Threads are those in critical-path.ts.
const PLACEMENT = {
	T01: ['propulsion-transport', ['bom-0-4']],
	T02: ['power-thermal', ['bom-0-4', 'bom-0-5']],
	T03: ['power-thermal', ['bom-0-3', 'bom-0-4']],
	T04: ['mining-operations', ['bom-0-2']],
	T05: ['isru-materials', ['bom-0-3']],
	T06: ['isru-materials', ['bom-0-3']],
	T07: ['isru-materials', ['bom-0-3']],
	T08: ['mining-operations', ['bom-0-2', 'bom-0-3']],
	T09: ['power-thermal', ['bom-0-5', 'bom-0-2']],
	T10: ['mining-operations', ['bom-0-2', 'bom-0-3']],
	T11: ['prospecting', ['bom-0-1']],
	T12: ['propulsion-transport', ['bom-0-4']],
	T13: ['isru-materials', ['bom-0-6']],
	T14: ['propulsion-transport', ['bom-0-4']],
	T15: ['power-thermal', ['bom-0-5']],
	T16: ['mining-operations', ['bom-0-2']],
	T17: ['isru-materials', ['bom-0-3']],
	T18: ['prospecting', ['bom-0-1']],
	T19: ['isru-materials', ['bom-0-3']],
	T20: ['power-thermal', ['bom-0-5']],
	T21: ['mining-operations', ['bom-0-2', 'bom-0-3']],
	T22: ['isru-materials', ['bom-0-3']],
	T23: ['isru-materials', ['bom-0-3']],
	T24: ['mining-operations', ['bom-0-2']],
	T25: ['propulsion-transport', ['bom-0-4']],
	T26: ['governance-integration', ['bom-0-7']]
};

const read = (p) => fs.readFile(path.join(ROOT, p), 'utf8');
const readYaml = async (p) => yaml.load(await read(p));
const uniq = (xs) => [...new Set(xs.filter(Boolean))];
const range = (xs) => (xs.length ? { min: Math.min(...xs), max: Math.max(...xs) } : null);
const str = (v) => (v == null ? null : typeof v === 'string' ? v.trim() : JSON.stringify(v));

/** Markdown section whose heading matches `re`, up to the next `## `. */
function section(md, re) {
	const parts = md.split(/\n## /);
	return parts.slice(1).find((p) => re.test(p.split('\n')[0])) ?? '';
}

/** First markdown table in `text` as { header, rows } (cells stripped of bold markers). */
function table(text) {
	const all = text.split('\n');
	const start = all.findIndex((l) => l.trim().startsWith('|'));
	if (start < 0) return null;
	const end = all.findIndex((l, i) => i > start && !l.trim().startsWith('|'));
	const lines = all.slice(start, end < 0 ? undefined : end);
	if (lines.length < 2) return null;
	const cells = (l) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim().replace(/\*\*/g, ''));
	const [head, , ...body] = lines;
	return { header: cells(head), rows: body.map(cells) };
}

/** Path steps from a consolidated-path table, mapping columns by header (layouts differ per synthesis). */
function pathRows(t) {
	if (!t) return [];
	if (!t.header) return t.rows.map(([step, content, costByModel, trlReached]) => ({ step, content, costByModel, trlReached }));
	const h = t.header.map((x) => x.toLowerCase());
	const col = (re, not) => h.findIndex((x) => re.test(x) && !(not && not.test(x)));
	const iStep = col(/step|stage|activity/) >= 0 ? col(/step|stage|activity/) : h[0] === '#' ? 1 : 0;
	const iTrl = col(/trl/);
	const iCost = col(/cost/);
	const iContent = col(/content|what|scope|source|contributor|description/, /cost|trl/);
	const parts = (r) =>
		h
			.map((name, i) => (i === iStep || i === iTrl || i === iCost || i === iContent || name === '#' || !r[i] || r[i] === 'n/a' ? null : `${t.header[i]}: ${r[i]}`))
			.filter(Boolean);
	return t.rows.map((r) => ({
		step: r[iStep] ?? '',
		content: [iContent >= 0 ? r[iContent] : null, ...parts(r)].filter(Boolean).join(' · '),
		costByModel: iCost >= 0 ? r[iCost] ?? '' : '',
		trlReached: iTrl >= 0 ? r[iTrl] ?? '' : ''
	}));
}

/** D-01 … D-05 from the decisions sign-off table and summary table. */
function decisions(md) {
	const summary = table(md.slice(md.indexOf('| # | Decision')));
	const signoff = table(section(md, /^Sign-off/));
	return summary.rows.map(([id, title, recommendation]) => {
		const s = signoff.rows.find((r) => r[0] === id);
		const accepted = s && /☑\s*accepted\s*(\d{4}-\d{2}-\d{2})/.exec(s[2]);
		return { id, title, recommendation, status: accepted ? 'accepted' : 'proposed', decided: accepted?.[1] ?? null };
	});
}

async function modelRecords(id) {
	const out = {};
	for (const m of Object.keys(MODELS)) {
		const text = await read(`${TRL}/round-1/assess/${m}/${id}.md`).catch(() => null);
		const y = text && lastYaml(text);
		if (y) out[m] = y;
	}
	return out;
}

async function build() {
	const baseline = await readYaml(`${TRL}/round-1/trl-baseline.yaml`);
	const inventory = await readYaml(`${TRL}/inventory.yaml`);
	const brief = await readYaml(`${TRL}/brief.yaml`);
	const proposal = await readYaml(`${TRL}/round-1/gates-proposal.yaml`);
	const status = await readYaml(`${TRL}/criterion-status.yaml`);
	const gateRulings = (await readYaml(`${TRL}/gate-rulings.yaml`)).rulings;
	const decisionsMd = await read('reconciliation/phase-0/decisions.md');
	const decisionList = decisions(decisionsMd);
	// D-01's assumptions and what would falsify each (the first "Assumption" table)
	const assumptions = table(decisionsMd.slice(decisionsMd.indexOf('| Assumption |')));

	const technologies = [];
	const evidence = {};
	for (const t of baseline.technologies) {
		const inv = inventory.technologies.find((i) => i.id === t.id) ?? {};
		const recs = await modelRecords(t.id);
		const synth = await read(`${TRL}/round-1/assess/synthesis/${t.id}.md`);
		const pathSection = section(synth, /path/i);
		// Most syntheses give the path as a table; some as `### Step N. …` subsections (whichever comes first)
		const firstTable = pathSection.search(/\n\|/);
		const firstSub = pathSection.search(/\n### /);
		const pathTable = firstSub >= 0 && (firstTable < 0 || firstSub < firstTable)
			? {
					rows: pathSection
						.split(/\n### /)
						.slice(1)
						.map((s) => {
							const [head, ...body] = s.split('\n');
							const content = body.join(' ').replace(/\s+/g, ' ').replace(/\*\*/g, '').trim();
							const trl = /TRL[^.;]*?(?:reached|outcome)[^.;]*/i.exec(content)?.[0] ?? '';
							return [head.trim(), content, '', trl];
						})
				}
			: table(pathSection);
		const ratings = Object.entries(t.ratings).map(([m, r]) => ({
			model: m,
			name: MODELS[m] ?? m,
			currentTRL: r.current_trl,
			targetTRL: r.target_trl,
			ad2: r.ad2,
			yearsToTarget: r.years_to_target ?? null,
			riskIfFail: r.risk_if_fail,
			phaseNeed: r.phase_need ?? null,
			confidence: r.confidence ?? null,
			unmetExitCriterion: str(recs[m]?.unmet_exit_criterion),
			fallback: str(recs[m]?.fallback)
		}));
		const years = ratings.flatMap((r) => (r.yearsToTarget ? [r.yearsToTarget.min, r.yearsToTarget.max] : []));
		const [threadId, bomIds] = PLACEMENT[t.id];
		const phaseNeeds = uniq(ratings.map((r) => r.phaseNeed));
		technologies.push({
			id: t.id,
			technology: t.technology,
			required: str(inv.required),
			phaseNeed: phaseNeeds.length === 1 ? phaseNeeds[0] : phaseNeeds,
			currentTRL: t.panel.current_trl,
			conditionalTRL: t.panel.conditional_trl ?? null,
			targetTRL: t.panel.target_trl,
			ad2: t.panel.ad2,
			yearsToTarget: range(years),
			riskIfFail: t.panel.risk_if_fail,
			agreement: t.panel.agreement,
			ratings,
			ownerRuling: t.owner_ruling ? { source: t.owner_ruling.source, decided: t.owner_ruling.decided, assessedObject: str(t.owner_ruling.assessed_object) } : null,
			status: status.technologies?.[t.id] ?? null,
			inventoryDisputed: Boolean(inv.disputed),
			inventoryNote: str(inv.note),
			relatedQuestionIds: uniq([...(inv.rqs ?? []), ...Object.values(recs).flatMap((y) => y.related_rqs ?? [])]).sort(
				(a, b) => Number(a.split('-')[2]) - Number(b.split('-')[2])
			),
			relatedBOMIds: bomIds,
			threadId,
			supersedes: inv.legacy ?? null,
			path: pathRows(pathTable),
			synthesis: `${TRL}/round-1/assess/synthesis/${t.id}.md`
		});
		evidence[t.id] = Object.entries(recs).map(([m, y]) => ({
			model: m,
			name: MODELS[m],
			required: y.required ?? null,
			items: (y.evidence ?? []).map((e) => ({
				claim: str(e.claim),
				source: str(e.source),
				scaleDemonstrated: str(e.scale_demonstrated),
				scaleRatio: str(e.scale_ratio),
				confident: e.confident === true
			})),
			path: (y.path ?? []).map((p) => ({
				step: str(p.step),
				method: p.method ?? null,
				scale: str(p.scale),
				costUSD: p.cost_usd ?? null,
				durationYears: p.duration_yr ?? null,
				reachesTRL: p.reaches_trl ?? null
			}))
		}));
	}

	// Legacy (March 2026) rows: what replaced each one, or why it was deferred
	const legacy = [];
	for (const t of technologies) if (t.supersedes) legacy.push({ id: t.supersedes, supersededBy: t.id });
	const legacyRows = Object.values(
		legacy.reduce((acc, l) => {
			(acc[l.id] ??= { id: l.id, supersededBy: [], deferredTo: null, reason: null }).supersededBy.push(l.supersededBy);
			return acc;
		}, {})
	);
	for (const d of brief.deferred) legacyRows.push({ id: d.legacy, supersededBy: [], deferredTo: d.tag, reason: d.reason });

	const gates = proposal.gates.map((g) => ({
		id: g.id,
		name: g.name,
		type: g.type,
		month: g.month,
		proposedBy: g.proposed_by,
		disputed: Boolean(g.disputed),
		purpose: str(g.purpose),
		pass: str(g.pass),
		fail: str(g.fail),
		status: status.gates?.[g.id] ?? null,
		criteria: g.criteria.map((c) => ({
			id: c.id,
			description: str(c.description),
			metric: str(c.metric),
			threshold: str(c.threshold),
			technologies: c.technologies ?? [],
			trlRequired: c.trl_required ?? null,
			evidenceFrom: c.evidence_from ?? [],
			proposedBy: c.proposed_by ?? [],
			disputed: Boolean(c.disputed),
			status: status.criteria?.[c.id] ?? null
		}))
	}));

	const retiredGates = proposal.retired.map((id) => ({ id, ...(status.retired_gates?.[id] ?? {}) }));

	// Architecture from the round-2 reconciliation: agreed changes, phase cost per model, proposed BOM delta
	const PHASE = 'reconciliation/phase-0/round-2/reconciliation/phase.md';
	const phaseMd = await read(PHASE);
	const sub = (md, re) => md.split(/\n### /).slice(1).find((p) => re.test(p.split('\n')[0])) ?? '';
	const agreed = table(section(phaseMd, /^2\. Agreed changes/));
	const cost = table(sub(phaseMd, /^3\.17 Phase cost/));
	const delta = table(section(phaseMd, /^4\. Proposed BOM delta/));
	const architecture = {
		source: PHASE,
		agreedChanges: agreed.rows.map(([change, value, attribution]) => ({ change, value, attribution })),
		phaseCost: cost.rows.map(([model, a, b, total]) => ({ model, phase0A: a, phase0B: b, total })),
		// Envelope of each model's headline total ($aB or $a–bB, the first figure in the cell), in USD
		phaseCostEnvelope: (() => {
			const xs = cost.rows.flatMap(([, , , total]) => {
				const m = /\$(\d+(?:\.\d+)?)(?:–(\d+(?:\.\d+)?))?B/.exec(total);
				return m ? [Number(m[1]), Number(m[2] ?? m[1])] : [];
			});
			return { min: Math.min(...xs) * 1e9, max: Math.max(...xs) * 1e9 };
		})(),
		bomDelta: delta.rows.map(([action, item, supportedBy, quantity, unitCost, confidence]) => ({ action, item, supportedBy, quantity, unitCost, confidence }))
	};

	const core = {
		schema: 'project-dyson/phase-0-readiness@1',
		assessedAt: baseline.generated,
		panel: Object.values(MODELS),
		sources: {
			baseline: `${TRL}/round-1/trl-baseline.yaml`,
			gates: `${TRL}/round-1/gates-proposal.yaml`,
			criterionStatus: `${TRL}/criterion-status.yaml`,
			gateRulings: `${TRL}/gate-rulings.yaml`,
			decisions: 'reconciliation/phase-0/decisions.md'
		},
		decisions: decisionList,
		assumptions: assumptions.rows.map(([assumption, falsifier]) => ({ assumption, falsifier })),
		gateRulings: gateRulings.map((r) => ({ id: r.id, question: r.question, decided: r.decided, ruling: str(r.ruling), stillOpen: r.still_open ?? [] })),
		technologies,
		legacyRows,
		gates,
		retiredGates,
		architecture
	};
	return { core, evidence };
}

const { core, evidence } = await build();
const files = {
	'src/lib/data/phase-0-readiness.json': JSON.stringify(core, null, '\t') + '\n',
	'src/lib/data/phase-0-readiness-evidence.json': JSON.stringify(evidence, null, '\t') + '\n'
};
if (process.argv.includes('--check')) {
	let stale = false;
	for (const [f, text] of Object.entries(files)) {
		const cur = await read(f).catch(() => '');
		if (cur !== text) {
			console.error(`stale: ${f} (run node scripts/build-readiness-data.js)`);
			stale = true;
		}
	}
	process.exit(stale ? 1 : 0);
}
await fs.mkdir(path.join(ROOT, 'src/lib/data'), { recursive: true });
for (const [f, text] of Object.entries(files)) await fs.writeFile(path.join(ROOT, f), text);
console.log(
	`${core.technologies.length} technologies, ${core.legacyRows.length} legacy rows, ${core.gates.length} gates (${core.retiredGates.length} retired), ` +
		`${Object.values(evidence).flat().reduce((n, m) => n + m.items.length, 0)} evidence items`
);
