#!/usr/bin/env node
/**
 * Stale-narrative check: finds claims on live pages that the 2026-10 Phase 0
 * re-assessment superseded. The work packages in reconciliation/phase-0/trl/WORKPACKAGE.md
 * are done when this exits 0.
 *
 *   node scripts/check-stale-narratives.js            # all packages
 *   node scripts/check-stale-narratives.js --wp=A     # TRL and gates only
 *
 * Dated records are exempt: blog posts (they get a dated update note instead),
 * per-model specs, deliberation transcripts, rounds and syntheses (primary and
 * alternate, with their divergent views), the March 2026 legacy data files, and
 * the issue log. A line that
 * quotes a superseded claim on purpose carries the marker `stale-ok` (in an HTML comment
 * in Markdown).
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// [work package, pattern, why it is stale]
const RULES = [
	['A', /TRL 6\s*(?:–|-|&ndash;)\s*7\)?[^\n]{0,40}(?:SEP|propulsion)|(?:SEP|propulsion)[^\n]{0,60}TRL 6\s*(?:–|-|&ndash;)\s*7/i, 'SEP rated TRL 6–7: the revised tugs are 1–2.5 MWe, rated TRL 2–4'],
	['A', /100\+ kW[^\n]{0,80}(?:SEP|propulsion|thruster|Hall|transport)|(?:SEP|propulsion|thruster|Hall|transport)[^\n]{0,80}100\+ kW/i, '"100+ kW" SEP is not the revised requirement (1–2.5 MWe per tug)'],
	['A', /Gate 5 \(month 60\)|Gate 5 \(Preliminary Design Review, month 60\)/, 'Gate numbering and timing replaced by D-02 KDPs'],
	['A', /nearest critical gate/i, 'Gate timing statements must come from data'],
	['A', /100\s?g(?:\+|\s)[^\n]{0,60}(?:melting|casting|experiment)|(?:melting|casting)[^\n]{0,60}100\s?g\b/i, 'A 100 g ISS experiment cannot retire the metallurgy risk (scale gap 4–6 orders)'],
	['A', /TRL ≥\s?5|TRL 5 or higher/, 'D-02: TRL 6 at KDP-0B for project-ending technologies'],
	['A', /JWST sunshield heritage|Cryogenic Propellant Architecture Selection/, 'Cryogenic depot removed from Phase 0'],
	['B', /pure research/i, 'D-01: Phase 0A is research and pathfinders; 0B is gated'],
	['B', /\$15\.7\s?(?:billion|B)\b/, 'Phase 0 cost re-estimated (panel $22–195B); must come from the BOM'],
	['B', /50,000 (?:t|tonnes)(?: a year|\/yr| per year)|50 kt\/yr/, 'Central 50 kt/yr processing abandoned (round-2 §2)'],
	['B', /Sun–Earth L4\*\*[^\n]{0,80}(?:station|refin)|processing station at Sun–Earth L4/, 'Processing co-located at the NEA'],
	['B', /quarterly (?:crew )?visits|human-tended/i, 'Phase 0 is uncrewed']
];

const SCAN = ['src/routes', 'src/lib', 'src/content', 'static/content'];
const EXEMPT = [
	/^src\/content\/blog\//,
	/^src\/content\/research-questions\/.*\/(round-\d+|research)\//,
	/\/discussion\.yaml$/,
	/conclusion(\.[\w-]+)?\.md$/,
	/^src\/content\/research-questions\/.*\/divergent-views(\.[\w-]+)?\.yaml$/,
	/-legacy\.ts$/,
	/^static\/content\/bom-specs\/.*\/(claude|gemini|gpt)-[\w-]+\.md$/,
	/CONSENSUS-ISSUES\.md$/,
	/__tests__\//,
	/CHANGELOG\.md$/
];

async function* walk(dir) {
	for (const e of await fs.readdir(path.join(ROOT, dir), { withFileTypes: true }).catch(() => [])) {
		const rel = path.join(dir, e.name);
		if (e.isDirectory()) yield* walk(rel);
		else if (/\.(svelte|ts|md|yaml|js)$/.test(e.name)) yield rel;
	}
}

const wp = process.argv.find((a) => a.startsWith('--wp='))?.split('=')[1];
const rules = RULES.filter(([p]) => !wp || p === wp);
let hits = 0;
for (const dir of SCAN) {
	for await (const file of walk(dir)) {
		if (EXEMPT.some((r) => r.test(file))) continue;
		const lines = (await fs.readFile(path.join(ROOT, file), 'utf8')).split('\n');
		lines.forEach((line, i) => {
			if (line.includes('stale-ok')) return;
			for (const [p, re, why] of rules) {
				if (re.test(line)) {
					hits++;
					console.log(`[WP-${p}] ${file}:${i + 1}  ${why}\n         ${line.trim().slice(0, 140)}`);
				}
			}
		});
	}
}
console.log(hits ? `\n${hits} stale statement(s).` : 'No stale statements.');
process.exit(hits ? 1 : 0);
