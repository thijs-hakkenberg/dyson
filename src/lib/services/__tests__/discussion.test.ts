// @vitest-environment node
import { describe, expect, it } from 'vitest';
import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import { createHash } from 'crypto';
import { generateResponsePrompt, generateVotingPrompt, parseVotingResponse, setPanel, conclusionPrompt, conclusionFiles } from '../../../../scripts/run-discussion.js';
import { SCAFFOLD, loadFramework } from '../../../../scripts/lib/critique.js';
import { buildProvenance } from '../../../../scripts/lib/provenance.js';

const ROOT = path.resolve(__dirname, '../../../..');
const PANEL = ['claude-opus-5-5', 'gemini-3-1-pro', 'gpt-6-1-sol'];
const question = { title: 'What should the T26 rating cover?', context: 'Background text.' };
const long = 'x'.repeat(5000);
const thread = {
	rounds: [
		{
			roundNumber: 1,
			winnerId: 'gpt-6-1-sol',
			winnerScore: 5,
			responses: PANEL.map((modelId) => ({ modelId, content: `${modelId} says ${long} END-${modelId}` }))
		}
	]
};
const responses = PANEL.map((modelId) => ({ modelId, content: `answer by ${modelId}` }));

describe('run-discussion with a non-February panel', () => {
	it('the voting template lists the panel that is actually voting', () => {
		setPanel(PANEL);
		const p = generateVotingPrompt(question, responses, 'gpt-6-1-sol');
		for (const id of PANEL) expect(p).toContain(`"targetId": "${id}"`);
		expect(p).not.toContain('claude-opus-4-6');
	});

	it('maps a vote for a model of the same family onto the panel member', () => {
		setPanel(PANEL);
		const r = parseVotingResponse('{"votes":[{"targetId":"claude-opus-4-6","vote":"APPROVE","reasoning":"r"}],"terminationVote":"CONCLUDE"}', 'gpt-6-1-sol');
		expect(r.votes[0].targetId).toBe('claude-opus-5-5');
	});

	it('default prompts keep the published 1,000-character prior-round context (existing discussions)', () => {
		setPanel(PANEL);
		const p = generateResponsePrompt(question, thread, 2, {});
		expect(p).not.toContain('END-claude-opus-5-5');
		expect(p).toContain('(Winning Response)');
	});
});

describe('framework mode (decision frameworks + paper 03 threats to validity)', () => {
	it('responses carry the framework, the scaffold, full prior rounds and no winner', async () => {
		setPanel(PANEL);
		const framework = await loadFramework(ROOT);
		const p = generateResponsePrompt(question, thread, 2, { framework, hiddenWinner: true, priorContext: 'full' });
		expect(p).toContain(framework.body);
		for (const step of SCAFFOLD) expect(p, step).toContain(step);
		expect(p).toMatch(/null option/i);
		expect(p).toMatch(/criteria.*before.*options/i);
		for (const id of PANEL) expect(p).toContain(`END-${id}`);
		expect(p).not.toContain('(Winning Response)');
		expect(p).not.toMatch(/Winner:/);
	});

	it('blind voting hides model names and maps labels back, with the weakest link', async () => {
		setPanel(PANEL);
		const framework = await loadFramework(ROOT);
		const anon = PANEL.map((modelId, i) => ({ modelId, content: `answer number ${i}` }));
		const p = generateVotingPrompt(question, anon, 'gemini-3-1-pro', { framework, blind: true });
		expect(p).toContain('### Response A');
		for (const id of PANEL) expect(p).not.toContain(id);
		expect(p).not.toMatch(/Claude|Gemini|GPT/);
		expect(p).toMatch(/weakestLink/);
		const r = parseVotingResponse(
			'```json\n{"votes":[{"targetId":"A","vote":"APPROVE","weakestLink":"information","reasoning":"r"},{"targetId":"C","vote":"REJECT","weakestLink":"frame","reasoning":"r"}],"terminationVote":"CONTINUE"}\n```',
			'gemini-3-1-pro',
			{ blind: true }
		);
		expect(r.votes.map((v: { targetId: string }) => v.targetId)).toEqual(['claude-opus-5-5', 'gpt-6-1-sol']);
		expect(r.votes[0].weakestLink).toBe('information');
	});
});

describe('framework-mode conclusion', () => {
	const voted = {
		rounds: [
			{
				...thread.rounds[0],
				votes: [{ targetId: 'claude-opus-5-5', votes: [{ voterId: 'gpt-6-1-sol', targetId: 'claude-opus-5-5', vote: 'NEUTRAL', weakestLink: 'information', reasoning: 'no SDLS flight report' }] }]
			}
		]
	};
	it('the synthesizer sees every response and the weakest links, and must return divergent views', async () => {
		setPanel(PANEL);
		const framework = await loadFramework(ROOT);
		const p = conclusionPrompt({ ...question, id: 'rq-0-64' }, voted, { framework });
		for (const id of PANEL) expect(p).toContain(`END-${id}`);
		expect(p).toContain('weakest link: information');
		expect(p).toContain('no SDLS flight report');
		expect(p).toMatch(/Decision record/);
		expect(p).toMatch(/Decision-quality audit/);
		expect(p).toMatch(/questionId: "rq-0-64"/);
		expect(p).toMatch(/resolution_status/);
	});

	it('the default conclusion prompt is unchanged: winning responses only', () => {
		setPanel(PANEL);
		const p = conclusionPrompt(question, voted, {});
		expect(p).toContain('END-gpt-6-1-sol');
		expect(p).not.toContain('END-claude-opus-5-5');
	});
});

describe('alternate synthesis', () => {
	it('writes next to the primary synthesis instead of replacing it', () => {
		expect(conclusionFiles('gpt-6-1-sol')).toEqual({ conclusion: 'conclusion.md', divergentViews: 'divergent-views.yaml' });
		expect(conclusionFiles('claude-opus-5-5', { alternate: true })).toEqual({
			conclusion: 'conclusion.claude-opus-5-5.md',
			divergentViews: 'divergent-views.claude-opus-5-5.yaml'
		});
	});
});

describe('provenance manifest', () => {
	it('is computed from the archived exchanges: checksums, prompt hashes, parameters actually sent', async () => {
		const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'prov-'));
		const raw = path.join(dir, 'raw', 'claude-opus-5-5');
		await fs.mkdir(raw, { recursive: true });
		const rec = {
			schema: 'project-dyson/llm-exchange@1',
			model: 'claude-opus-5-5',
			endpoint: 'databricks-claude-opus-5-5',
			transport: 'gateway-chat',
			started: '2026-10-17T10:00:00.000Z',
			finish: 'stop',
			usage: { completion_tokens: 10 },
			request: {
				url: '{host}/ai-gateway/mlflow/v1/chat/completions',
				body: { model: 'databricks-claude-opus-5-5', messages: [{ role: 'system', content: 'SYS' }, { role: 'user', content: 'hi' }], max_tokens: 100 }
			},
			response: {}
		};
		const json = JSON.stringify(rec);
		await fs.writeFile(path.join(raw, 'round-1-response-1.abc.raw.json'), json);
		const transcript = path.join(dir, 'round-1.md');
		await fs.writeFile(transcript, 'text');

		const p = await buildProvenance({ root: ROOT, rawDir: path.join(dir, 'raw'), outputs: [transcript], method: { framework: 'deadbeef' } });
		const sha = (s: string) => createHash('sha256').update(s).digest('hex');
		expect(p.schema).toBe('project-dyson/deliberation-provenance@1');
		expect(p.orchestrator.files['scripts/run-discussion.js']).toMatch(/^[0-9a-f]{64}$/);
		expect(p.orchestrator.files['package-lock.json']).toMatch(/^[0-9a-f]{64}$/);
		expect(p.orchestrator.git_commit).toMatch(/^[0-9a-f]{40}$/);
		expect(p.exchanges).toHaveLength(1);
		expect(p.exchanges[0]).toMatchObject({ model: 'claude-opus-5-5', endpoint: 'databricks-claude-opus-5-5', finish: 'stop', sha256: sha(json) });
		expect(p.exchanges[0].request_sha256).toBe(sha(JSON.stringify(rec.request)));
		expect(p.system_prompts).toEqual({ [sha('SYS')]: 'SYS' });
		expect(p.parameters_sent['claude-opus-5-5']).toEqual({ max_tokens: [100], temperature: 'not sent (endpoint default)' });
		expect(p.outputs[0].sha256).toBe(sha('text'));
		expect(p.method.framework).toBe('deadbeef');
	});
});
