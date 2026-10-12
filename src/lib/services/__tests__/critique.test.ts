// @vitest-environment node
import { describe, expect, it } from 'vitest';
import yaml from 'js-yaml';
import path from 'path';
import { FRAMEWORK_PATH, SCAFFOLD, loadFramework, critiquePrompt, critiqueSynthSpec, withCritiqueOutput } from '../../../../scripts/lib/critique.js';

const ROOT = path.resolve(__dirname, '../../../..');

describe('decision-framework critique', () => {
	it('the framework is site content with valid frontmatter', async () => {
		expect(FRAMEWORK_PATH).toBe('src/content/methodology/decision-frameworks.md');
		const { raw, body, sha } = await loadFramework(ROOT);
		const fm = yaml.load(raw.match(/^---\n([\s\S]*?)\n---\n/)![1]) as Record<string, unknown>;
		expect(fm).toMatchObject({ slug: 'decision-frameworks', type: 'methodology' });
		expect(typeof fm.title).toBe('string');
		expect(body.startsWith('# Trade-off Decision Frameworks')).toBe(true);
		expect(body).not.toMatch(/^---/);
		expect(sha).toMatch(/^[0-9a-f]{12}$/);
	});

	it('every step of the composite scaffold is in the framework text', async () => {
		const { body } = await loadFramework(ROOT);
		expect(SCAFFOLD).toHaveLength(9);
		for (const step of SCAFFOLD) expect(body, step).toContain(`**${step}**`);
	});

	it('the critique prompt carries the framework and asks for the scaffold per decision', async () => {
		const framework = await loadFramework(ROOT);
		const p = critiquePrompt({ round: 1, reconciliation: '## 3. Preserved divergences\n\n### D1. Where processing is sited', framework });
		expect(p).toContain("Previous round's reconciliation (round 1)");
		expect(p).toContain('### D1. Where processing is sited');
		expect(p).toContain(framework.body);
		for (const step of SCAFFOLD) expect(p, step).toContain(step);
		expect(p).toMatch(/Decision Quality chain/);
		expect(p).toMatch(/disagreements are kept/i);
	});

	it('no prior reconciliation, no critique', async () => {
		expect(critiquePrompt({ round: 1, reconciliation: null, framework: await loadFramework(ROOT) })).toBe('');
	});

	it('critique rounds make the decision-quality critique a required output section', () => {
		const spec = '1. **Findings** — x\n5. **Remaining disagreements** — y\n\nFinish with one fenced `yaml` block';
		const out = withCritiqueOutput(spec);
		expect(out).toMatch(/5\. \*\*Remaining disagreements\*\* — y\n6\. \*\*Decision-quality critique\*\*/);
		expect(out.indexOf('Decision-quality critique')).toBeLessThan(out.indexOf('Finish with one fenced'));
	});

	it('critique-round synthesis adds a decision-quality audit section', () => {
		const s = critiqueSynthSpec();
		expect(s).toMatch(/Decision-quality audit/);
		expect(s).toMatch(/weakest link/i);
	});
});
