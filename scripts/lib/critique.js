// @ts-nocheck — plain Node script; imported by a vitest test
/**
 * Decision-framework critique for later rounds of a re-assessment.
 *
 * A critique round (--prior-round=N) shows the panel the previous reconciliation and asks
 * them to audit its decisions with the composite scaffold in
 * src/content/methodology/decision-frameworks.md (site content, so the method the
 * models were held to is published alongside their output).
 */

import { createHash } from 'crypto';
import fs from 'fs/promises';
import path from 'path';

export const FRAMEWORK_PATH = 'src/content/methodology/decision-frameworks.md';

/** The nine steps of the framework's Composite Scaffold, as named there. */
export const SCAFFOLD = [
	'Frame & decision type',
	'Criteria and weights',
	'Options',
	'Assessment matrix',
	'Sensitivity vs trade-off points',
	'Evidence certainty',
	'Key assumptions',
	'Decision, warrant, accepted downside',
	'Consequences'
];

/** { raw, body (frontmatter stripped), sha (12 hex of the body, for provenance) } */
export async function loadFramework(root) {
	const raw = await fs.readFile(path.join(root, FRAMEWORK_PATH), 'utf8');
	const body = raw.replace(/^---\n[\s\S]*?\n---\n+/, '');
	return { raw, body, sha: createHash('sha256').update(body).digest('hex').slice(0, 12) };
}

/** Prompt section for reviewing round `round`'s reconciliation; '' when there is none. */
export function critiquePrompt({ round, reconciliation, framework }) {
	if (!reconciliation) return '';
	const steps = SCAFFOLD.map((s, i) => `${i + 1}. ${s}`).join('\n');
	return [
		`## Previous round's reconciliation (round ${round})`,
		'You are joining an ongoing review. Earlier models produced the reconciliation below. Check it as critically as the original specs: confirm what holds, correct what does not, and add what it missed. Where you disagree, say so and why; disagreements are kept, not averaged away.',
		reconciliation.replace(/^---[\s\S]*?---\n/, ''),
		'## How to critique it: decision frameworks',
		`Hold every decision in that reconciliation (each agreed change, each preserved divergence, each BOM-delta line and each gate criterion) to the reference below. In a section titled **Decision-quality critique**, take the decisions that matter most for the phase (at least the blocking ones) and walk each through the Composite Scaffold:\n\n${steps}\n\nFor each decision, name the weakest link in its Decision Quality chain (frame · alternatives · information · values · reasoning · commitment), state certainty with calibrated language (likelihood separately from confidence), and give the evidence or test that would falsify its key assumption. Where a divergence is really a trade-off point (one choice moves two attributes in opposite directions), say so: it is then a values question, not a fact to settle. Use QOC, GRADE Evidence-to-Decision or ACH from the reference where they expose something the scaffold alone does not, and say which you used.`,
		framework.body
	].join('\n\n');
}

/** Extra synthesis section for a critique round. */
export function critiqueSynthSpec() {
	return `6. **Decision-quality audit** — from the panel's decision-quality critiques: per decision, the
   weakest link each model named, the scaffold steps it found missing or unsupported, and any
   divergence reclassified as a trade-off point. Attribute each judgement; where models differ,
   keep both.`;
}

/** Add the critique to a re-assessment's required output sections, before the YAML block. */
export function withCritiqueOutput(outputSpec) {
	return outputSpec.replace(
		'\nFinish with one fenced',
		`6. **Decision-quality critique** — the previous reconciliation's key decisions walked through the
   Composite Scaffold, as asked above: weakest Decision Quality link, calibrated certainty,
   falsifiable key assumptions, trade-off points, and which reference methods you used.

Finish with one fenced`
	);
}
