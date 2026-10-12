#!/usr/bin/env node
// @ts-nocheck — Node script; imported by a vitest test for buildBaseline
/**
 * TRL re-baseline for a phase (work package WP-A, rq-0-62).
 *
 * A model panel rates each critical technology of the revised architecture on the
 * NASA TRL scale with an AD² difficulty rating, from the brief in
 * reconciliation/<phase>/trl/brief.yaml, then proposes decision gates under D-02.
 * Divergence between models is preserved; the baseline records every model's rating.
 * Nothing is written into src/: the apply step (WORKPACKAGE.md) does that.
 *
 * Steps (run in order; each step: query the panel, then --synthesize):
 *   --step=inventory   is this the right list of critical technologies?
 *   --step=assess      rate each technology (from trl/inventory.yaml, else the brief)
 *   --step=gates       propose KDPs and gate criteria from the baseline
 *
 * Usage:
 *   node scripts/run-trl-assessment.js --phase=phase-0 --step=inventory --panel=latest
 *   node scripts/run-trl-assessment.js --phase=phase-0 --step=inventory --synthesize
 *   node scripts/run-trl-assessment.js --phase=phase-0 --step=assess --panel=latest
 *   node scripts/run-trl-assessment.js --phase=phase-0 --step=assess --synthesize      # also writes trl-baseline.yaml
 *   node scripts/run-trl-assessment.js --phase=phase-0 --step=gates --panel=latest
 *   node scripts/run-trl-assessment.js --phase=phase-0 --step=gates --synthesize       # writes gates-proposal.yaml
 *
 * Options: --only=T01,T04  --round=N  --force  --dry-run  --synthesizer=<key>
 *          --panel / --models / --profile / --list-models / --discover (scripts/lib/llm.js)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { MODELS, archiveRaw, handleInfoFlags, panelArgs, queryModel, resolvePanel } from './lib/llm.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SYSTEM = [
	'You are a technology readiness assessor for Project Dyson, an open, multi-model plan for a',
	'Dyson swarm. You rate technologies on the NASA TRL scale strictly by its exit criteria and',
	'by the evidence, at the scale and environment the architecture requires. Design studies and',
	'model consensus are not evidence. Cite programmes, tests and papers you are confident exist;',
	'say when you are unsure; never invent a citation. Give ranges, state assumptions, and keep',
	'disagreement visible rather than averaging it away.'
].join(' ');

// ── IO helpers ─────────────────────────────────────────────────────────────
const read = (p) => fs.readFile(path.join(ROOT, p), 'utf8').catch(() => null);
const strip = (s) => s?.replace(/^---[\s\S]*?---\n/, '') ?? '';

/** Last fenced yaml block of a response, parsed; null if absent or invalid. */
function lastYaml(text) {
	const blocks = [...(text ?? '').matchAll(/```ya?ml\s*\n([\s\S]*?)```/g)];
	if (!blocks.length) return null;
	try {
		return yaml.load(blocks[blocks.length - 1][1]);
	} catch {
		return null;
	}
}

/** Context for one research question: the question, its conclusion and literature review. */
async function rqContext(phaseId, rqId) {
	const dir = path.join(ROOT, 'src/content/research-questions', phaseId);
	const files = await fs.readdir(dir).catch(() => []);
	const md = files.find((f) => f.startsWith(`${rqId}-`) && f.endsWith('.md'));
	if (!md) return '';
	const slugDir = md.slice(0, -3);
	const parts = [`#### ${rqId}\n\n${strip(await read(`src/content/research-questions/${phaseId}/${md}`))}`];
	const concl = await read(`src/content/research-questions/${phaseId}/${slugDir}/conclusion.md`);
	if (concl) parts.push(`##### Deliberation conclusion (not TRL evidence)\n\n${strip(concl)}`);
	const lit = await read(`src/content/research-questions/${phaseId}/${slugDir}/research/analysis.md`);
	if (lit) parts.push(`##### Literature review\n\n${strip(lit)}`);
	return parts.join('\n\n');
}

/** The March 2026 entry for a legacy id, as TypeScript text. */
async function legacyEntry(id) {
	if (!id) return '';
	const ts = await read('src/lib/services/trl-assessment.ts');
	const base = id.replace(/\s*\(.*\)$/, '');
	const i = ts.indexOf(`id: '${base}'`);
	if (i < 0) return '';
	const start = ts.lastIndexOf('\n\t{', i);
	const end = ts.indexOf('\n\t}', i);
	return `### Current (March 2026) entry: ${base}\n\nThis rating describes the original architecture. Re-rate it for the requirement above.\n\n\`\`\`ts${ts.slice(start, end + 3)}\n\`\`\``;
}

function briefHeader(B) {
	return [
		`## Revised architecture\n\n${B.architecture}`,
		`## Decisions in force\n\n${Object.entries(B.decisions_in_force).map(([k, v]) => `- **${k}:** ${v}`).join('\n')}`,
		`## Scales\n\n\`\`\`yaml\n${yaml.dump({ trl_scale: B.trl_scale, ad2_scale: B.ad2_scale }, { lineWidth: 120 })}\`\`\``,
		`## Rating rules\n\n${B.rating_rules.map((r) => `- ${r}`).join('\n')}`
	].join('\n\n---\n\n');
}

// ── Prompts ────────────────────────────────────────────────────────────────
const INVENTORY_OUT = `
## Required output

1. For each candidate: keep, merge, split or remove, with the reason. Check that the
   "required" scale and environment are right for the revised architecture.
2. Technologies the revised architecture depends on that are missing, with their required
   scale and environment.
3. Whether the deferred legacy entries are correctly deferred.

Finish with one fenced \`yaml\` block:

\`\`\`yaml
technologies:
  - id: <T01… keep ids; new ones T14, T15…>
    action: keep | merge | split | add | remove
    technology: <name>
    required: <scale, environment, duration>
    phase_need: 0A | 0B | phase-1 | deferred
    legacy: <legacy id or null>
    rqs: [<rq ids>]
    reason: <one sentence>
deferred_ok: true | false
deferred_notes: <one sentence>
\`\`\`
`;

const ASSESS_OUT = `
## Required output

1. **Evidence** — the heritage that supports the current rating: programme, test or paper,
   year, demonstrated scale and environment, and the ratio to the required scale.
2. **Current TRL** — a range, with the exit criterion that is met at the lower bound and the
   one that is unmet for the next level.
3. **Target and difficulty** — the target TRL under D-02 and when the phase needs it; AD²
   for the step, with the reason.
4. **Path** — the experiments, simulations, analyses or literature work that advance it,
   each with scale, cost range, duration and the TRL it reaches.
5. **Risk and fallback** — the risk class if it does not reach target, and the fallback.
6. **Where others might disagree** — the most contestable part of your rating.

Finish with one fenced \`yaml\` block in exactly this shape:

\`\`\`yaml
id: <technology id>
technology: <name>
required: { scale: <…>, environment: <…>, duration: <…> }
phase_need: 0A | 0B | phase-1 | deferred
current_trl: { min: <1-9>, max: <1-9> }
evidence:
  - claim: <what was demonstrated>
    source: <programme / test / paper, year>
    scale_demonstrated: <…>
    scale_ratio: <required ÷ demonstrated, or "n/a">
    confident: true | false
unmet_exit_criterion: <the exit criterion not yet met for the next TRL>
target_trl: { kdp_0b: <1-9>, needed_by: <phase milestone or year> }
ad2: <1-9>
years_to_target: { min: <n>, max: <n> }
risk_if_fail: project-ending | architecture-change | schedule-delay | cost-increase
path:
  - step: <name>
    method: experiment | simulation | analysis | literature
    scale: <…>
    cost_usd: [<low>, <high>]
    duration_yr: [<low>, <high>]
    reaches_trl: <1-9>
fallback: <one sentence>
related_rqs: [<rq ids>]
confidence: low | medium | high
\`\`\`
`;

const GATES_OUT = `
## Required output

Propose the Phase 0 gate set under D-02, using the TRL baseline above:

1. **KDP structure** — KDP-0A, the 0A mid-term review and KDP-0B: purpose, timing (months
   from 0A start, as a range tied to the technology paths) and pre-committed outcomes.
2. **Technology criteria** — for each gate, which technologies must reach which TRL, and how
   AD² affects the timing.
3. **Discriminating gates** — target, demand, economics and licence: criterion, metric,
   threshold (or how the threshold is to be set where it cannot yet be), evidence source.
4. **Failure outcomes** — what happens on fail, including fallback to "0A only, Earth supply".
5. **What changes from the current gates** (decision-gates.ts): keep, revise, retire.

Finish with one fenced \`yaml\` block:

\`\`\`yaml
gates:
  - id: <kdp-0a | 0a-mtr | kdp-0b | g-target | g-demand | g-economics | g-licence | …>
    name: <name>
    type: kdp | review | discriminating
    month: { min: <n>, max: <n> }
    purpose: <one sentence>
    criteria:
      - id: <id>
        description: <…>
        metric: <measurable>
        threshold: <value, or "set by <rq id>">
        technologies: [<technology ids>]
        trl_required: <1-9 or null>
        evidence_from: [<rq ids or tests>]
    pass: <outcome>
    fail: <outcome>
retired: [<current gate ids no longer used>]
\`\`\`
`;

async function inventoryPrompt(B, phaseId) {
	return [
		`# Critical technology inventory: ${phaseId}`,
		briefHeader(B),
		`## Candidate technologies\n\n\`\`\`yaml\n${yaml.dump({ candidates: B.candidates, deferred: B.deferred }, { lineWidth: 120 })}\`\`\``,
		`## Current TRL table (March 2026, original architecture)\n\n\`\`\`ts\n${await read('src/lib/services/trl-assessment.ts')}\n\`\`\``,
		INVENTORY_OUT
	].join('\n\n---\n\n');
}

async function assessPrompt(B, phaseId, tech) {
	const rqs = (await Promise.all((tech.rqs ?? []).map((r) => rqContext(phaseId, r)))).filter(Boolean);
	return [
		`# TRL assessment: ${tech.id} ${tech.technology}`,
		`**Required:** ${typeof tech.required === 'string' ? tech.required : JSON.stringify(tech.required)}`,
		briefHeader(B),
		await legacyEntry(tech.legacy),
		rqs.length ? `## Related research questions\n\n${rqs.join('\n\n')}` : '',
		ASSESS_OUT
	]
		.filter(Boolean)
		.join('\n\n---\n\n');
}

async function gatesPrompt(B, phaseId, base) {
	const baseline = await fs.readFile(path.join(base, 'trl-baseline.yaml'), 'utf8').catch(() => null);
	if (!baseline) throw new Error('Run --step=assess --synthesize first (no trl-baseline.yaml)');
	return [
		`# Decision gates: ${phaseId}`,
		briefHeader(B),
		`## TRL baseline (panel synthesis)\n\n\`\`\`yaml\n${baseline}\`\`\``,
		`## Open-question register\n\n${await read(`reconciliation/${phaseId}/open-questions.md`)}`,
		`## Current gates (March 2026)\n\n\`\`\`ts\n${await read('src/lib/services/decision-gates.ts')}\n\`\`\``,
		GATES_OUT
	].join('\n\n---\n\n');
}

// ── Baseline (deterministic) ───────────────────────────────────────────────
/** Combine the panel's YAML ratings into one baseline that keeps every model's view. */
export function buildBaseline(ratings) {
	const byTech = {};
	for (const { model, y } of ratings) {
		if (!y?.id) continue;
		(byTech[y.id] ??= { id: y.id, technology: y.technology, ratings: {} }).ratings[model] = {
			current_trl: y.current_trl,
			target_trl: y.target_trl?.kdp_0b ?? null,
			ad2: y.ad2 ?? null,
			years_to_target: y.years_to_target ?? null,
			risk_if_fail: y.risk_if_fail ?? null,
			phase_need: y.phase_need ?? null,
			confidence: y.confidence ?? null
		};
	}
	const RISK = ['project-ending', 'architecture-change', 'schedule-delay', 'cost-increase'];
	for (const t of Object.values(byTech)) {
		const r = Object.values(t.ratings);
		const nums = (f) => r.map(f).filter((v) => typeof v === 'number');
		const mins = nums((x) => x.current_trl?.min);
		const maxs = nums((x) => x.current_trl?.max);
		const mids = r.map((x) => (x.current_trl?.min + x.current_trl?.max) / 2).filter((v) => !Number.isNaN(v)).sort((a, b) => a - b);
		const ad2 = nums((x) => x.ad2);
		t.panel = {
			current_trl: { min: Math.min(...mins), max: Math.max(...maxs), median: mids.length ? mids[Math.floor(mids.length / 2)] : null },
			target_trl: Math.max(...nums((x) => x.target_trl)),
			ad2: { min: Math.min(...ad2), max: Math.max(...ad2) },
			// Most severe risk class any model assigned
			risk_if_fail: RISK.find((k) => r.some((x) => x.risk_if_fail === k)) ?? null,
			// Agreement: model mid-points within one TRL level of each other
			agreement: mids.length > 1 && mids[mids.length - 1] - mids[0] <= 1 ? 'agree' : 'diverge'
		};
	}
	return { generated: new Date().toISOString(), technologies: Object.values(byTech) };
}

// ── Run ────────────────────────────────────────────────────────────────────
async function runPanel({ panel, items, base, step, force, dry }) {
	for (const it of items) {
		if (dry) {
			await fs.mkdir(path.join(base, step, 'prompts'), { recursive: true });
			await fs.writeFile(path.join(base, step, 'prompts', `${it.key}.md`), `<!-- system -->\n${SYSTEM}\n\n<!-- user -->\n${it.prompt}`);
			console.log(`  ${it.key}: ~${Math.round(it.prompt.length / 4)} tokens → ${step}/prompts/${it.key}.md`);
			continue;
		}
		await Promise.all(
			panel.map(async (m) => {
				const out = path.join(base, step, m, `${it.key}.md`);
				if (!force && (await fs.stat(out).catch(() => null))) return console.log(`  ${it.key} · ${m}: exists, skipping`);
				try {
					const ex = await queryModel(m, { system: SYSTEM, prompt: it.prompt, maxTokens: 32000, temperature: 0.3 });
					if (!ex.text) throw new Error('empty response');
					await archiveRaw(path.join(base, step, 'raw', m), it.key, ex);
					await fs.mkdir(path.dirname(out), { recursive: true });
					// The model's self-reported name is unreliable; the frontmatter is authoritative
					await fs.writeFile(out, `---\nstep: ${step}\nitem: ${it.key}\nmodelId: ${m}\nmodelName: "${MODELS[m].name}"\nendpoint: ${MODELS[m].id}\ngenerated: ${ex.meta.started}\nseconds: ${ex.meta.seconds}\n---\n\n${ex.text}\n`);
					console.log(`  ${it.key} · ${MODELS[m].name}: ${ex.text.length} chars in ${ex.meta.seconds.toFixed(0)}s${lastYaml(ex.text) ? '' : ' (no parseable yaml!)'}`);
				} catch (e) {
					console.error(`  ${it.key} · ${MODELS[m].name}: FAILED — ${e.message}`);
				}
			})
		);
	}
}

async function responses(base, step, key) {
	const dirs = (await fs.readdir(path.join(base, step), { withFileTypes: true }).catch(() => [])).filter((d) => d.isDirectory() && MODELS[d.name]).map((d) => d.name);
	const out = [];
	for (const m of dirs) {
		const t = await fs.readFile(path.join(base, step, m, `${key}.md`), 'utf8').catch(() => null);
		if (t) out.push({ model: m, text: strip(t), y: lastYaml(t) });
	}
	return out;
}

const SYNTH = {
	inventory: `Consolidate the panel's inventory. Attribute each position. Where models disagree on keep/merge/split/remove, list both positions. Finish with one fenced yaml block, \`technologies:\`, in the same shape as the panel used: include every technology at least one model kept or added, and add \`disputed: true\` with a one-line note where models disagree.`,
	assess: `Write the consolidated rating for this technology: a table of each model's TRL range, AD², target, risk class and years; where they agree; where they diverge and why (evidence each relies on); the strongest evidence cited (flag any citation only one model gives, or that a model marked unsure); and the consolidated path. Do not pick a winner where models diverge on evidence; say what test or source would settle it.`,
	gates: `Consolidate the panel's gate proposals into one gate set, attributing each criterion and threshold. Where models propose different thresholds or timings, keep the range and list the positions. Finish with one fenced yaml block in the same \`gates:\` shape, adding \`proposed_by: [models]\` and \`disputed: true\` where relevant.`
};

async function synthesize({ base, step, keys, synthesizer, force }) {
	const outDir = path.join(base, step, 'synthesis');
	await fs.mkdir(outDir, { recursive: true });
	for (const key of keys) {
		const out = path.join(outDir, `${key}.md`);
		if (!force && (await fs.stat(out).catch(() => null))) {
			console.log(`  ${key}: synthesis exists, skipping`);
			continue;
		}
		const rs = await responses(base, step, key);
		if (rs.length < 2) {
			console.log(`  ${key}: ${rs.length} response(s), skipping`);
			continue;
		}
		const prompt = `# Synthesis: ${step} · ${key}\n\n${rs.map((r) => `## ${MODELS[r.model].name}\n\n${r.text}`).join('\n\n---\n\n')}\n\n---\n\n${SYNTH[step]}`;
		console.log(`  ${key}: synthesising ${rs.length} responses with ${MODELS[synthesizer].name}...`);
		const ex = await queryModel(synthesizer, { system: 'You are the neutral rapporteur of a technology readiness review panel. Consolidate, attribute and preserve disagreement; do not decide and do not add technical claims of your own.', prompt, maxTokens: 24000, temperature: 0.2 });
		await archiveRaw(path.join(base, step, 'raw', 'synthesis'), key, ex);
		await fs.writeFile(out, `---\nstep: ${step}\nitem: ${key}\ntype: synthesis\nsynthesizer: ${synthesizer}\npanel: [${rs.map((r) => r.model).join(', ')}]\ngenerated: ${ex.meta.started}\n---\n\n${ex.text}\n`);
	}
}

async function main() {
	const argv = process.argv.slice(2);
	const get = (n, d = null) => argv.find((a) => a.startsWith(`--${n}=`))?.split('=').slice(1).join('=') ?? d;
	const flags = panelArgs(argv);
	if (await handleInfoFlags(flags)) return;

	const phaseId = get('phase', 'phase-0');
	const step = get('step');
	if (!['inventory', 'assess', 'gates'].includes(step)) throw new Error('--step=inventory|assess|gates is required');
	const round = Number(get('round', '1'));
	const trlDir = path.join(ROOT, `reconciliation/${phaseId}/trl`);
	const base = path.join(trlDir, `round-${round}`);
	const B = yaml.load(await read(`reconciliation/${phaseId}/trl/brief.yaml`));
	const force = argv.includes('--force');
	const dry = argv.includes('--dry-run');
	const only = get('only')?.split(',');

	// Technology list: the synthesised inventory if present, else the brief's candidates
	const inv = yaml.load((await fs.readFile(path.join(trlDir, 'inventory.yaml'), 'utf8').catch(() => '')) || 'null');
	const techs = (inv?.technologies ?? B.candidates).filter((t) => t.action !== 'remove' && (!only || only.includes(t.id)));

	if (argv.includes('--synthesize')) {
		const synth = get('synthesizer') ?? (await resolvePanel(flags)).find((m) => MODELS[m].family === 'claude') ?? 'claude-opus-5-5';
		if (!MODELS[synth]) await resolvePanel({ models: synth });
		const key = synth.replace(/^databricks-/, '');
		const keys = step === 'assess' ? techs.map((t) => t.id) : [step];
		await synthesize({ base, step, keys, synthesizer: key, force });
		if (step === 'inventory') {
			const y = lastYaml(await fs.readFile(path.join(base, step, 'synthesis', 'inventory.md'), 'utf8'));
			if (y?.technologies) {
				await fs.writeFile(path.join(trlDir, 'inventory.yaml'), `# Synthesised ${new Date().toISOString()} from round ${round}. Review and edit before --step=assess.\n${yaml.dump(y, { lineWidth: 120 })}`);
				console.log(`  → trl/inventory.yaml (${y.technologies.length} technologies)`);
			} else console.warn('  ! synthesis had no parseable yaml; edit trl/inventory.yaml by hand');
		}
		if (step === 'assess') {
			const ratings = [];
			for (const t of techs) for (const r of await responses(base, step, t.id)) ratings.push({ model: r.model, y: r.y });
			const bl = buildBaseline(ratings);
			await fs.writeFile(path.join(base, 'trl-baseline.yaml'), `# Panel ratings per technology; panel.* summarises without averaging away divergence.\n${yaml.dump(bl, { lineWidth: 120 })}`);
			console.log(`  → round-${round}/trl-baseline.yaml (${bl.technologies.length} technologies)`);
		}
		if (step === 'gates') {
			const y = lastYaml(await fs.readFile(path.join(base, step, 'synthesis', 'gates.md'), 'utf8'));
			if (y?.gates) {
				await fs.writeFile(path.join(base, 'gates-proposal.yaml'), yaml.dump(y, { lineWidth: 120 }));
				console.log(`  → round-${round}/gates-proposal.yaml (${y.gates.length} gates)`);
			} else console.warn('  ! gates synthesis had no parseable yaml');
		}
		return;
	}

	const panel = dry && !flags.panel && !flags.models ? [] : await resolvePanel(flags);
	console.log(`TRL ${step} · ${phaseId} · round ${round} · panel: ${panel.map((k) => MODELS[k].name).join(', ') || '(dry run)'}`);
	const items =
		step === 'inventory'
			? [{ key: 'inventory', prompt: await inventoryPrompt(B, phaseId) }]
			: step === 'assess'
				? await Promise.all(techs.map(async (t) => ({ key: t.id, prompt: await assessPrompt(B, phaseId, t) })))
				: [{ key: 'gates', prompt: await gatesPrompt(B, phaseId, base) }];
	await runPanel({ panel, items, base, step, force, dry });
	if (!dry) console.log(`\nNext: node scripts/run-trl-assessment.js --phase=${phaseId} --step=${step} --round=${round} --synthesize`);
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
	main().catch((e) => {
		console.error(e.message);
		process.exit(1);
	});
}
