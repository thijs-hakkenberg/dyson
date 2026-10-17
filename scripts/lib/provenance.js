// @ts-nocheck — plain Node script; imported by a vitest test
/**
 * Provenance manifest for a multi-model run, built from what was actually sent.
 *
 * Paper 03's reviewers asked for stronger provenance controls (exact request/response
 * logs, system prompts, prompt templates, pinned dependencies). The manifest is derived
 * from the raw exchange archive (scripts/lib/llm.js archiveRaw), not from configuration,
 * so a parameter the transport never sent (e.g. temperature on the AI Gateway) shows as
 * not sent rather than as the value a config file claims.
 */

import { execFileSync } from 'child_process';
import { createHash } from 'crypto';
import fs from 'fs/promises';
import path from 'path';

const sha256 = (s) => createHash('sha256').update(s).digest('hex');

/** Files whose content defines the orchestrator's behaviour. */
export const ORCHESTRATOR_FILES = ['scripts/run-discussion.js', 'scripts/lib/llm.js', 'scripts/lib/critique.js', 'scripts/lib/provenance.js', 'scripts/lib/yaml-block.js', 'package-lock.json'];

function git(root, args) {
	try {
		return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
	} catch {
		return null;
	}
}

async function walk(dir) {
	const out = [];
	for (const e of await fs.readdir(dir, { withFileTypes: true }).catch(() => [])) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) out.push(...(await walk(p)));
		else if (e.name.endsWith('.raw.json')) out.push(p);
	}
	return out.sort();
}

const SAMPLING = ['max_tokens', 'temperature', 'top_p', 'max_output_tokens', 'reasoning'];

/**
 * @param {{ root: string, rawDir: string, outputs?: string[], method?: any, models?: object[] }} opts
 * @returns {Promise<any>}
 */
export async function buildProvenance({ root, rawDir, outputs = [], method = {}, models = [] }) {
	const files = {};
	for (const f of ORCHESTRATOR_FILES) {
		const t = await fs.readFile(path.join(root, f), 'utf8').catch(() => null);
		if (t !== null) files[f] = sha256(t);
	}
	const status = git(root, ['status', '--porcelain', '--', ...ORCHESTRATOR_FILES]);

	const exchanges = [];
	const systemPrompts = {};
	const sent = {};
	for (const f of await walk(rawDir)) {
		const text = await fs.readFile(f, 'utf8');
		const r = JSON.parse(text);
		const body = r.request?.body ?? {};
		const system =
			body.messages?.find((m) => m.role === 'system')?.content ??
			null;
		if (system) systemPrompts[sha256(system)] = system;
		const s = (sent[r.model] ??= {});
		for (const k of SAMPLING) if (k in body) (s[k] ??= []).includes(body[k]) || s[k].push(body[k]);
		exchanges.push({
			file: path.relative(root, f),
			sha256: sha256(text),
			request_sha256: sha256(JSON.stringify(r.request)),
			model: r.model,
			endpoint: r.endpoint,
			transport: r.transport,
			started: r.started,
			finish: r.finish ?? null,
			usage: r.usage ?? null
		});
	}
	for (const s of Object.values(sent)) if (!('temperature' in s)) s.temperature = 'not sent (endpoint default)';

	return {
		schema: 'project-dyson/deliberation-provenance@1',
		generated: new Date().toISOString(),
		orchestrator: {
			git_commit: git(root, ['rev-parse', 'HEAD']),
			git_dirty: status === null ? null : status.length > 0,
			node: process.version,
			files
		},
		method,
		models,
		parameters_sent: sent,
		system_prompts: systemPrompts,
		exchanges,
		outputs: await Promise.all(
			outputs.map(async (f) => ({ file: path.relative(root, f), sha256: sha256(await fs.readFile(f, 'utf8')) }))
		)
	};
}
