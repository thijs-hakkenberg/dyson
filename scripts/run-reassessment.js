#!/usr/bin/env node
/**
 * BOM re-assessment and reconciliation.
 *
 * Asks a model panel to re-assess a phase's BOM against the completeness and
 * closure findings in reconciliation/<phase>/findings.yaml, one prompt per item
 * plus one for the phase as a whole, then synthesises a reconciliation per item.
 * Later rounds can bring in newer models, who see the previous reconciliation
 * and critique or extend it. Nothing is written back into the BOM or the specs:
 * the reconciliation proposes changes for a human to accept.
 *
 * Usage:
 *   # Round 1: the panel re-assesses every item and the phase
 *   node scripts/run-reassessment.js --phase=phase-0 --panel=may
 *
 *   # Synthesise round 1 (one reconciliation per item + a summary)
 *   node scripts/run-reassessment.js --phase=phase-0 --synthesize --synthesizer=claude-opus-4-7
 *
 *   # Round 2: newest models join and review round 1's reconciliation
 *   node scripts/run-reassessment.js --phase=phase-0 --round=2 --prior-round=1 --panel=latest
 *
 * Options:
 *   --items=bom-0-1,phase     subset (default: every item in findings.yaml, plus "phase")
 *   --round=N                 output round (default 1)
 *   --prior-round=N           critique round N's reconciliation, using the decision frameworks in
 *                             src/content/methodology/decision-frameworks.md (see scripts/lib/critique.js)
 *   --include-specs           also include every per-model spec (long prompts)
 *   --force                   re-query even if the output exists
 *   --max-tokens=N            output budget per response (default 24000, synthesis 16000; reasoning models spend part of it thinking)
 *   --dry-run                 write prompts to round-N/prompts/ and stop (no API calls)
 *   --panel / --models / --profile / --list-models / --discover   see scripts/lib/llm.js
 *
 * Output: reconciliation/<phase>/round-N/{<model>/<item>.md, raw/, reconciliation/, summary.md}
 */

import fs from 'fs/promises';
import path from 'path';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { MODELS, archiveRaw, handleInfoFlags, panelArgs, queryModel, resolvePanel } from './lib/llm.js';
import { critiquePrompt, critiqueSynthSpec, loadFramework, withCritiqueOutput } from './lib/critique.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SYSTEM = [
	'You are a senior space-systems engineer re-assessing one part of Project Dyson, an open,',
	'multi-model AI-consensus plan for a Dyson swarm. An earlier generation of models wrote the',
	'specifications you are given. A review found the numbers below do not close. Your job is to',
	'check each finding against the evidence and physics, correct the specification where it is',
	'wrong, and say plainly where you disagree with the finding. Show calculations with units and',
	'state assumptions. Give ranges rather than false precision. Prefer published data and',
	'flight heritage over intuition, and say when you are estimating.'
].join(' ');

// Concluded deliberations that bear on each Phase 0 item (see findings P0-F15)
const RQ_FOR_ITEM = {
	'phase-0': {
		'bom-0-2': ['rq-0-26-dual-bucket-wheel-excavation'],
		'bom-0-3': ['rq-0-11-microgravity-metallurgy-scaling', 'rq-0-14-propellant-production-phase-0-scope', 'rq-0-30-cryogenic-boiloff-management'],
		'bom-0-4': ['rq-0-18-human-rating-transport-vehicles'],
		'bom-0-6': ['rq-0-14-propellant-production-phase-0-scope', 'rq-0-30-cryogenic-boiloff-management', 'rq-0-47-sunshield-deployment-architecture', 'rq-0-48-mli-long-duration-degradation'],
		'bom-0-7': ['rq-0-29-multi-century-governance-structure'],
		phase: ['rq-0-28-isru-cost-methodology-validation']
	}
};

const OUTPUT_SPEC = `
## Required output

Write these sections in Markdown:

1. **Findings** — for every finding listed above: your verdict (agree / partly / disagree),
   the reasoning or calculation, and the change you propose.
2. **Revised specification** — the parameters that change, old → new value with a range,
   the basis (calculation, literature with citation, or judgement) and confidence.
3. **Interfaces** — what this item exchanges with the other items (mass t/yr, power MW,
   propellant t/yr, data), with values. Flag any the current BOM omits.
4. **Missing items or scope** — anything the phase needs that this item assumes but no BOM
   line provides.
5. **Remaining disagreements and open questions** — where reasonable engineers could still
   differ; do not force a single answer.

Finish with one fenced \`yaml\` block in exactly this shape (it is parsed by a script):

\`\`\`yaml
item: <bom id or "phase">
model: <your model name>
findings:
  - id: P0-F01
    verdict: agree | partly | disagree
    summary: <one sentence>
    proposed_change: <one sentence or "none">
revised_spec:
  - parameter: <name>
    old: <value or "unspecified">
    new: <value>
    range: [<low>, <high>]
    unit: <unit>
    basis: calculation | literature | judgement
    confidence: low | medium | high
interfaces:
  - with: <bom id>
    flow: <mass | power | propellant | data | other>
    value: <number and unit>
    in_bom: true | false
bom_delta:
  - action: add | remove | split | resize | keep
    item: <bom id or new name>
    quantity: <value>
    unit_cost_usd: [<low>, <high>]
    rationale: <one sentence>
open_questions:
  - <question>
\`\`\`
`;

// ── Inputs ─────────────────────────────────────────────────────────────────
async function read(p) {
	try {
		return await fs.readFile(path.join(ROOT, p), 'utf8');
	} catch {
		return null;
	}
}

/** BOM rows for a phase, parsed from content.ts (the authoritative BOM). */
async function bomRows(phaseId) {
	const s = await read('src/lib/services/content.ts');
	const i = s.indexOf(`id: '${phaseId}'`);
	const next = s.indexOf("\n\t{\n\t\tid: 'phase-", i + 10);
	const blk = s.slice(i, next > 0 ? next : undefined);
	const rows = [];
	for (const m of blk.matchAll(/\{\s*id: '(bom-[\w-]+)'([\s\S]*?)\n\t\t\t\}/g)) {
		const b = m[2];
		const g = (k) => b.match(new RegExp(`${k}:\\s*'?([^,'\\n]+)'?`))?.[1]?.trim() ?? '';
		rows.push({ id: m[1], name: g('name'), slug: g('slug'), quantity: g('quantity'), unit: g('unit'), unitCost: g('unitCost'), totalCost: g('totalCost'), confidence: g('costConfidence'), description: b.match(/description:\s*'([^']*)'/)?.[1] ?? '' });
	}
	return rows;
}

function bomTable(rows) {
	const usd = (n) => (Number(n) >= 1e9 ? `$${(n / 1e9).toFixed(2)}B` : `$${(Number(n) / 1e6).toFixed(0)}M`);
	return [
		'| ID | Item | Qty | Unit cost | Total | Confidence | Description |',
		'|---|---|---|---|---|---|---|',
		...rows.map((r) => `| ${r.id} | ${r.name} | ${r.quantity} ${r.unit} | ${usd(r.unitCost)} | ${usd(r.totalCost)} | ${r.confidence} | ${r.description.slice(0, 220)} |`)
	].join('\n');
}

async function itemContext(phaseId, slug, includeSpecs) {
	const dir = `static/content/bom-specs/${phaseId}/${slug}`;
	const parts = [];
	const consensus = await read(`${dir}/consensus.md`);
	parts.push(consensus ? `### Current consensus (${dir}/consensus.md)\n\n${consensus}` : `### Current consensus\n\n(No specification exists for this item.)`);
	const dv = await read(`${dir}/divergent-views.yaml`);
	if (dv) parts.push(`### Divergent views (${dir}/divergent-views.yaml)\n\n\`\`\`yaml\n${dv}\n\`\`\``);
	if (includeSpecs) {
		let files = [];
		try {
			files = (await fs.readdir(path.join(ROOT, dir))).filter((f) => f.endsWith('.md') && f !== 'consensus.md');
		} catch {
			/* no specs */
		}
		for (const f of files) parts.push(`### Model specification ${f}\n\n${await read(`${dir}/${f}`)}`);
	}
	return parts.join('\n\n');
}

async function rqContext(phaseId, key) {
	// The phase-level prompt carries every mapped conclusion, not only its own
	const map = RQ_FOR_ITEM[phaseId] ?? {};
	const ids = key === 'phase' ? [...new Set(Object.values(map).flat())] : (map[key] ?? []);
	const parts = [];
	for (const rq of ids) {
		const c = await read(`src/content/research-questions/${phaseId}/${rq}/conclusion.md`);
		if (c) parts.push(`### Deliberation conclusion: ${rq}\n\n${c.replace(/^---[\s\S]*?---\n/, '')}`);
	}
	return parts.join('\n\n');
}

/**
 * Technology readiness and decision gates as they stand, so gate proposals can use
 * TRL (and say where the table is out of date) rather than invent thresholds.
 */
async function readinessContext() {
	const trl = await read('src/lib/services/trl-assessment.ts');
	const gates = await read('src/lib/services/decision-gates.ts');
	const parts = [];
	if (trl) parts.push(`### Technology readiness assessments (src/lib/services/trl-assessment.ts)\n\nUse TRL (NASA NPR 7123.1 scale) for gate criteria where it applies. Say where these ratings no longer match the scale or environment of the revised architecture.\n\n\`\`\`ts\n${trl}\n\`\`\``);
	if (gates) parts.push(`### Current decision gates (src/lib/services/decision-gates.ts)\n\n\`\`\`ts\n${gates}\n\`\`\``);
	return parts.length ? `## Readiness and gates\n\n${parts.join('\n\n')}` : '';
}

/** The model field in the answer's YAML is unreliable (models misname themselves); set it from metadata. */
function stampModel(text, name) {
	return text.replace(/^(\s*model:\s*).*$/m, `$1${name}`);
}

function findingsFor(F, key) {
	const list = key === 'phase' ? F.findings : F.findings.filter((f) => f.items.includes(key));
	return yaml.dump(list, { lineWidth: 110 });
}

async function priorReconciliation(phaseId, round, key, framework) {
	if (!round) return '';
	const reconciliation = await read(`reconciliation/${phaseId}/round-${round}/reconciliation/${key}.md`);
	return critiquePrompt({ round, reconciliation, framework });
}

async function buildPrompt({ phaseId, key, F, rows, includeSpecs, priorRound, framework }) {
	const row = rows.find((r) => r.id === key);
	const header =
		key === 'phase'
			? `# Phase-level re-assessment: ${phaseId} (${F.title})\n\nAssess the phase as a system. Answer every finding below, and the phase-level asks at the end.`
			: `# Item re-assessment: ${key} ${row?.name ?? ''} (${phaseId})\n\nAssess this item in the context of the whole phase.`;
	const sections = [
		header,
		`## The phase BOM as it stands\n\n${bomTable(rows)}\n\nSpecification generation: ${F.spec_generation}.`,
		key === 'phase'
			? (await Promise.all(rows.map(async (r) => `## ${r.id} ${r.name}\n\n${(await read(`static/content/bom-specs/${phaseId}/${r.slug}/consensus.md`))?.replace(/^---[\s\S]*?---\n/, '') ?? '(no specification)'}`))).join('\n\n')
			: `## This item\n\n${await itemContext(phaseId, F.items[key] ?? row?.slug, includeSpecs)}`,
		await rqContext(phaseId, key),
		key === 'phase' ? await readinessContext() : '',
		`## Findings to assess\n\n\`\`\`yaml\n${findingsFor(F, key)}\`\`\``,
		key === 'phase' ? `## Phase-level asks\n\n${F.phase_asks.map((a) => `- ${a}`).join('\n')}` : '',
		await priorReconciliation(phaseId, priorRound, key, framework),
		priorRound ? withCritiqueOutput(OUTPUT_SPEC) : OUTPUT_SPEC
	];
	return sections.filter(Boolean).join('\n\n---\n\n');
}

// ── Synthesis ──────────────────────────────────────────────────────────────
const SYNTH_SPEC = `
Write the reconciliation in Markdown with these sections:

1. **Verdict matrix** — a table: finding × model → agree / partly / disagree, then one line per
   finding on where the panel stands.
2. **Agreed changes** — specification changes all models support, with the consolidated value
   and range.
3. **Preserved divergences** — where models still differ, each position with the models that
   hold it and their reasoning. Do not pick a winner.
4. **Proposed BOM delta** — adds, removals, splits and resizes, each with the models
   supporting it, quantity, unit-cost range and confidence. Mark these as proposals for human
   review.
5. **Open questions** — what would settle the remaining disagreements (data, test, analysis).

Attribute every claim to the model(s) that made it. Do not introduce new technical claims of
your own; if all models missed something obvious, list it under a final "Reviewer note".
`;

async function synthesize({ phaseId, round, keys, synthesizer, maxTokens, framework }) {
	const base = path.join(ROOT, `reconciliation/${phaseId}/round-${round}`);
	const modelDirs = (await fs.readdir(base, { withFileTypes: true })).filter((d) => d.isDirectory() && MODELS[d.name]).map((d) => d.name);
	const outDir = path.join(base, 'reconciliation');
	const summary = [];
	for (const key of keys) {
		const responses = [];
		let critique = false;
		for (const m of modelDirs) {
			const t = await fs.readFile(path.join(base, m, `${key}.md`), 'utf8').catch(() => null);
			if (t && /^priorRound: \d+$/m.test(t.match(/^---[\s\S]*?---/)?.[0] ?? '')) critique = true;
			if (t) responses.push(`## Response from ${MODELS[m].name}\n\n${t.replace(/^---[\s\S]*?---\n/, '')}`);
		}
		if (responses.length < 2) {
			console.log(`  ${key}: ${responses.length} response(s), skipping synthesis`);
			continue;
		}
		const prompt = `# Reconcile the panel's re-assessment of ${key} (${phaseId}, round ${round})\n\n${responses.join('\n\n---\n\n')}\n\n---\n\n${critique ? SYNTH_SPEC.replace('\nAttribute every claim', `${critiqueSynthSpec()}\n\nAttribute every claim`) : SYNTH_SPEC}`;
		console.log(`  Synthesising ${key} from ${responses.length} responses with ${MODELS[synthesizer].name}...`);
		const ex = await queryModel(synthesizer, { system: 'You are the neutral rapporteur of an engineering review panel. You consolidate, attribute and preserve disagreement; you do not decide.', prompt, maxTokens, temperature: 0.3 });
		await archiveRaw(path.join(base, 'raw', 'synthesis'), key, ex);
		await fs.mkdir(outDir, { recursive: true });
		await fs.writeFile(
			path.join(outDir, `${key}.md`),
			`---\nphase: ${phaseId}\nitem: ${key}\nround: ${round}\ntype: reconciliation\nsynthesizer: ${synthesizer}\npanel: [${modelDirs.join(', ')}]\n${critique ? `framework: ${framework.sha}\n` : ''}generated: ${new Date().toISOString()}\n---\n\n${ex.text}\n`
		);
		summary.push(`- [${key}](reconciliation/${key}.md) — ${responses.length} responses`);
	}
	await fs.writeFile(path.join(base, 'summary.md'), `# ${phaseId} re-assessment · round ${round}\n\nPanel: ${modelDirs.map((m) => MODELS[m].name).join(', ')}\nSynthesizer: ${MODELS[synthesizer].name}\n\n${summary.join('\n')}\n`);
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
	const argv = process.argv.slice(2);
	const get = (n, d = null) => argv.find((a) => a.startsWith(`--${n}=`))?.split('=').slice(1).join('=') ?? d;
	const flags = panelArgs(argv);
	if (await handleInfoFlags(flags)) return;

	const phaseId = get('phase', 'phase-0');
	const round = Number(get('round', '1'));
	const priorRound = get('prior-round') ? Number(get('prior-round')) : null;
	const F = yaml.load(await read(`reconciliation/${phaseId}/findings.yaml`));
	if (!F) throw new Error(`No reconciliation/${phaseId}/findings.yaml`);
	const rows = await bomRows(phaseId);
	const framework = await loadFramework(ROOT);
	const keys = (get('items') ?? [...Object.keys(F.items), 'phase'].join(',')).split(',');

	const maxTokens = get('max-tokens') ? Number(get('max-tokens')) : undefined;

	if (argv.includes('--synthesize')) {
		const synthesizer = get('synthesizer', 'claude-opus-4-7');
		if (!MODELS[synthesizer]) await resolvePanel({ models: synthesizer });
		await synthesize({ phaseId, round, keys, synthesizer: MODELS[synthesizer] ? synthesizer : synthesizer.replace(/^databricks-/, ''), maxTokens: maxTokens ?? 16000, framework });
		return;
	}

	const dry = argv.includes('--dry-run');
	const force = argv.includes('--force');
	const panel = dry && !flags.panel && !flags.models ? [] : await resolvePanel(flags);
	const base = path.join(ROOT, `reconciliation/${phaseId}/round-${round}`);
	const findingsSha = createHash('sha256').update(JSON.stringify(F)).digest('hex').slice(0, 12);
	console.log(`Re-assessment ${phaseId} · round ${round} · panel: ${panel.map((k) => MODELS[k].name).join(', ') || '(dry run)'}${priorRound ? ` · reviewing round ${priorRound}` : ''}`);

	for (const key of keys) {
		const prompt = await buildPrompt({ phaseId, key, F, rows, includeSpecs: argv.includes('--include-specs'), priorRound, framework });
		if (dry) {
			await fs.mkdir(path.join(base, 'prompts'), { recursive: true });
			await fs.writeFile(path.join(base, 'prompts', `${key}.md`), `<!-- system -->\n${SYSTEM}\n\n<!-- user -->\n${prompt}`);
			console.log(`  ${key}: prompt ${Math.round(prompt.length / 4)} tokens (approx) → round-${round}/prompts/${key}.md`);
			continue;
		}
		// Models in parallel per item; items in sequence to stay polite to the endpoints
		await Promise.all(
			panel.map(async (m) => {
				const out = path.join(base, m, `${key}.md`);
				if (!force && (await fs.stat(out).catch(() => null))) return console.log(`  ${key} · ${m}: exists, skipping`);
				try {
					const ex = await queryModel(m, { system: SYSTEM, prompt, maxTokens: maxTokens ?? 24000, temperature: 0.4 });
					if (!ex.text) throw new Error('empty response');
					await archiveRaw(path.join(base, 'raw', m), key, ex);
					await fs.mkdir(path.dirname(out), { recursive: true });
					await fs.writeFile(
						out,
						`---\nphase: ${phaseId}\nitem: ${key}\nround: ${round}\ntype: reassessment\nmodelId: ${m}\nmodelName: "${MODELS[m].name}"\nendpoint: ${MODELS[m].id}\nfindings: ${findingsSha}\npriorRound: ${priorRound ?? 'null'}\n${priorRound ? `framework: ${framework.sha}\n` : ''}generated: ${ex.meta.started}\nseconds: ${ex.meta.seconds}\n---\n\n${stampModel(ex.text, MODELS[m].name)}\n`
					);
					console.log(`  ${key} · ${MODELS[m].name}: ${ex.text.length} chars in ${ex.meta.seconds.toFixed(0)}s`);
				} catch (e) {
					console.error(`  ${key} · ${MODELS[m].name}: FAILED — ${e.message}`);
				}
			})
		);
	}
	if (!dry) console.log(`\nNext: node scripts/run-reassessment.js --phase=${phaseId} --round=${round} --synthesize`);
}

main().catch((e) => {
	console.error(e.message);
	process.exit(1);
});
