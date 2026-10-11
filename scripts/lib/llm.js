// @ts-nocheck — plain Node script; imported by a vitest test only to keep registries in step
/**
 * Shared LLM access for the Project Dyson scripts (Databricks).
 *
 * One registry for every model generation the project has used, two transports
 * (legacy per-endpoint serving and the AI Gateway), token or CLI-profile auth,
 * endpoint discovery, and an immutable raw archive of every exchange.
 *
 * Panels:
 *   feb     Claude Opus 4.6 · Gemini 3 Pro · GPT-5.2   (original BOM + deliberations)
 *   may     Claude Opus 4.7 · Gemini 3.1 Pro · GPT-5.5 Pro (holistic and paper reviews)
 *   latest  newest Claude / Gemini / GPT endpoint found in the workspace (needs discovery)
 * or a comma list of registry keys or raw endpoint names, e.g.
 *   --models=claude-opus-4-7,databricks-gemini-3-5-pro
 *
 * Environment:
 *   DATABRICKS_TOKEN                 bearer token (else --profile / DATABRICKS_PROFILE via the databricks CLI)
 *   DATABRICKS_HOST | DATABRICKS_WORKSPACE   workspace for legacy serving endpoints
 *   DATABRICKS_GATEWAY_HOST          workspace for AI Gateway models (defaults to the serving host)
 */

import { execFileSync } from 'child_process';
import { createHash } from 'crypto';
import fs from 'fs/promises';
import path from 'path';

const LEGACY_HOST = 'https://adb-6239133969168510.10.azuredatabricks.net';
const GATEWAY_HOST = 'https://adb-7405606309889705.5.azuredatabricks.net';

/**
 * transport:
 *   serving            POST {host}/serving-endpoints/{id}/invocations  (chat body)
 *   gateway-chat       POST {gateway}/ai-gateway/mlflow/v1/chat/completions  { model: id, messages }
 *   gateway-responses  POST {gateway}/ai-gateway/openai/v1/responses        { model: id, input }
 */
export const MODELS = {
	// January–February 2026
	'claude-opus-4-5': { id: 'databricks-claude-opus-4-5', name: 'Claude Opus 4.5', family: 'claude', generation: '2026-01', transport: 'serving' },
	'claude-opus-4-6': { id: 'databricks-claude-opus-4-6', name: 'Claude Opus 4.6', family: 'claude', generation: '2026-02', transport: 'serving' },
	'gemini-3-pro': { id: 'databricks-gemini-3-pro', name: 'Gemini 3 Pro', family: 'gemini', generation: '2026-02', transport: 'serving' },
	'gpt-5-2': { id: 'databricks-gpt-5-2', name: 'GPT-5.2', family: 'gpt', generation: '2026-02', transport: 'serving' },
	// May 2026
	'claude-opus-4-7': { id: 'databricks-claude-opus-4-7', name: 'Claude Opus 4.7', family: 'claude', generation: '2026-05', transport: 'gateway-chat' },
	'gemini-3-1-pro': { id: 'databricks-gemini-3-1-pro', name: 'Gemini 3.1 Pro', family: 'gemini', generation: '2026-05', transport: 'gateway-chat' },
	'gpt-5-5-pro': { id: 'databricks-gpt-5-5-pro', name: 'GPT-5.5 Pro', family: 'gpt', generation: '2026-05', transport: 'gateway-responses' }
};

export const PANELS = {
	feb: ['claude-opus-4-6', 'gemini-3-pro', 'gpt-5-2'],
	may: ['claude-opus-4-7', 'gemini-3-1-pro', 'gpt-5-5-pro']
};

for (const [key, m] of Object.entries(MODELS)) m.filename = `${key}.md`;

/** Registry key for an endpoint name: databricks-claude-opus-5-5 → claude-opus-5-5 */
export const keyFor = (endpointId) => endpointId.replace(/^databricks-/, '');

export function familyOf(key) {
	if (/claude|opus|sonnet|haiku|fable/i.test(key)) return 'claude';
	if (/gemini/i.test(key)) return 'gemini';
	if (/gpt|^o\d/i.test(key)) return 'gpt';
	return 'other';
}

/** Display name for an unregistered key: claude-opus-5-5 → Claude Opus 5.5, gpt-5-6-pro → GPT-5.6 Pro */
export function nameFor(key) {
	const parts = key.split('-');
	const words = [];
	let version = [];
	const flush = () => {
		if (version.length) words.push(version.join('.'));
		version = [];
	};
	for (const p of parts) {
		if (/^\d+$/.test(p)) version.push(p);
		else {
			flush();
			words.push(p === 'gpt' ? 'GPT' : p[0].toUpperCase() + p.slice(1));
		}
	}
	flush();
	return words.join(' ').replace(/^GPT (\d)/, 'GPT-$1');
}

/** Register an endpoint that is not in the table (e.g. found by discovery or named on the CLI). */
export function registerEndpoint(endpointId, transport) {
	const key = keyFor(endpointId);
	if (MODELS[key]) return key;
	const family = familyOf(key);
	MODELS[key] = {
		id: endpointId,
		name: nameFor(key),
		family,
		generation: 'discovered',
		// GPT-5.5-era reasoning models answer on the Responses API; others on chat completions
		transport: transport ?? (family === 'gpt' ? 'gateway-responses' : 'gateway-chat'),
		filename: `${key}.md`
	};
	return key;
}

// ── Auth ───────────────────────────────────────────────────────────────────
let cachedToken = null;
export function getToken({ profile = process.env.DATABRICKS_PROFILE } = {}) {
	if (cachedToken) return cachedToken;
	if (process.env.DATABRICKS_TOKEN && !profile) return (cachedToken = process.env.DATABRICKS_TOKEN);
	if (!profile && !process.env.DATABRICKS_TOKEN)
		throw new Error('Set DATABRICKS_TOKEN, or pass --profile=<name> (databricks CLI) / DATABRICKS_PROFILE');
	try {
		const raw = execFileSync('databricks', ['auth', 'token', '--profile', profile, '-o', 'json'], {
			encoding: 'utf8',
			stdio: ['ignore', 'pipe', 'pipe']
		});
		const t = JSON.parse(raw).access_token;
		if (!t) throw new Error('no access_token in CLI output');
		return (cachedToken = t);
	} catch (e) {
		throw new Error(`databricks CLI token for profile "${profile}" failed: ${e.stderr?.toString() || e.message}\nTry: databricks auth login --profile ${profile}`);
	}
}

const servingHost = () => process.env.DATABRICKS_HOST || process.env.DATABRICKS_WORKSPACE || LEGACY_HOST;
const gatewayHost = () => process.env.DATABRICKS_GATEWAY_HOST || process.env.DATABRICKS_HOST || process.env.DATABRICKS_WORKSPACE || GATEWAY_HOST;

// ── Discovery ──────────────────────────────────────────────────────────────
/** List serving endpoints in a workspace whose names look like chat models. */
export async function listEndpoints(host = gatewayHost()) {
	const res = await fetch(`${host}/api/2.0/serving-endpoints`, { headers: { Authorization: `Bearer ${getToken()}` } });
	if (!res.ok) throw new Error(`serving-endpoints ${res.status}: ${(await res.text()).slice(0, 300)}`);
	const { endpoints = [] } = await res.json();
	return endpoints
		.map((e) => ({ id: e.name, ready: e.state?.ready, task: e.task, family: familyOf(e.name) }))
		.filter((e) => e.family !== 'other');
}

/** Version tuple from a key: claude-opus-4-7 → [4,7]; gpt-5-5-pro → [5,5] */
function versionOf(key) {
	const nums = key.match(/\d+/g)?.map(Number) ?? [];
	return nums.slice(0, 3);
}
function newer(a, b) {
	const va = versionOf(a),
		vb = versionOf(b);
	for (let i = 0; i < Math.max(va.length, vb.length); i++) {
		if ((va[i] ?? 0) !== (vb[i] ?? 0)) return (va[i] ?? 0) > (vb[i] ?? 0);
	}
	// Same version: prefer the flagship tier
	const tier = (k) => (/opus|pro\b|-pro/.test(k) ? 2 : /sonnet|flash/.test(k) ? 1 : 0);
	return tier(a) > tier(b);
}

/**
 * Newest ready endpoint per family. Restrict Claude to Opus and Gemini to Pro by
 * default (the debate's flagship tier); pass {anyTier:true} to allow others.
 */
export async function discoverLatest({ anyTier = false } = {}) {
	const eps = (await listEndpoints()).filter((e) => e.ready === 'READY' || e.ready === undefined);
	const best = {};
	for (const e of eps) {
		const key = keyFor(e.id);
		if (!anyTier) {
			if (e.family === 'claude' && !/opus/.test(key)) continue;
			if (e.family === 'gemini' && !/pro/.test(key)) continue;
			if (e.family === 'gpt' && /mini|nano|oss/.test(key)) continue;
		}
		if (!best[e.family] || newer(key, keyFor(best[e.family]))) best[e.family] = e.id;
	}
	return ['claude', 'gemini', 'gpt'].filter((f) => best[f]).map((f) => registerEndpoint(best[f]));
}

/** Resolve --panel / --models into registry keys. */
export async function resolvePanel({ panel, models } = {}) {
	if (models) {
		return models.split(',').map((m) => m.trim()).filter(Boolean).map((m) => (MODELS[m] ? m : MODELS[keyFor(m)] ? keyFor(m) : registerEndpoint(m.startsWith('databricks-') ? m : `databricks-${m}`)));
	}
	if (!panel || panel === 'feb') return [...PANELS.feb];
	if (PANELS[panel]) return [...PANELS[panel]];
	if (panel === 'latest') return discoverLatest();
	throw new Error(`Unknown panel "${panel}". Use feb, may, latest or --models=a,b,c`);
}

// ── Query ──────────────────────────────────────────────────────────────────
function chatText(data) {
	let c = data.choices?.[0]?.message?.content;
	// Gemini returns [{type:'text', text}] parts
	if (Array.isArray(c)) c = c.map((p) => (typeof p === 'string' ? p : p?.text ?? '')).join('');
	return c ?? data.content ?? null;
}
function responsesText(data) {
	if (typeof data.output_text === 'string' && data.output_text) return data.output_text;
	const parts = [];
	for (const item of data.output ?? []) {
		const inner = item?.content;
		if (Array.isArray(inner)) {
			for (const c of inner) if (typeof c?.text === 'string') parts.push(c.text);
		} else if (typeof inner === 'string') parts.push(inner);
	}
	return parts.length ? parts.join('') : null;
}

/**
 * Send one prompt. Returns { text, data, request, meta } or throws.
 * maxTokens/temperature apply to chat transports; reasoning models ignore temperature.
 */
export async function queryModel(key, { system, prompt, maxTokens = 16000, temperature = 0.7, timeoutMs = 900_000 } = {}) {
	const m = MODELS[key];
	if (!m) throw new Error(`Unknown model "${key}". Known: ${Object.keys(MODELS).join(', ')}`);
	let url, body;
	if (m.transport === 'serving') {
		url = `${servingHost()}/serving-endpoints/${m.id}/invocations`;
		body = { messages: [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: prompt }], max_tokens: maxTokens, temperature };
	} else if (m.transport === 'gateway-chat') {
		url = `${gatewayHost()}/ai-gateway/mlflow/v1/chat/completions`;
		body = { model: m.id, messages: [...(system ? [{ role: 'system', content: system }] : []), { role: 'user', content: prompt }], max_tokens: maxTokens };
	} else if (m.transport === 'gateway-responses') {
		url = `${gatewayHost()}/ai-gateway/openai/v1/responses`;
		body = { model: m.id, input: [{ role: 'user', content: [{ type: 'input_text', text: system ? `${system}\n\n${prompt}` : prompt }] }] };
	} else throw new Error(`Unknown transport ${m.transport}`);

	const started = new Date();
	const ctl = new AbortController();
	const timer = setTimeout(() => ctl.abort(), timeoutMs);
	let res;
	try {
		res = await fetch(url, {
			method: 'POST',
			signal: ctl.signal,
			headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});
	} finally {
		clearTimeout(timer);
	}
	if (!res.ok) throw new Error(`${m.name} ${res.status}: ${(await res.text()).slice(0, 1000)}`);
	const data = await res.json();
	const text = m.transport === 'gateway-responses' ? responsesText(data) : chatText(data);
	return {
		text,
		data,
		request: { url: url.replace(/^https:\/\/[^/]+/, '{host}'), body },
		meta: {
			model: key,
			endpoint: m.id,
			name: m.name,
			transport: m.transport,
			started: started.toISOString(),
			seconds: (Date.now() - started.getTime()) / 1000,
			finish: data.choices?.[0]?.finish_reason ?? data.status ?? null,
			usage: data.usage ?? null
		}
	};
}

/**
 * Write the full exchange (prompt, request, response, metadata) as content-addressed
 * JSON next to the markdown output, as the 2026-05 holistic review recommended.
 * Returns the archive path.
 */
export async function archiveRaw(dir, name, exchange) {
	const record = {
		schema: 'project-dyson/llm-exchange@1',
		...exchange.meta,
		request: exchange.request,
		response: exchange.data
	};
	const json = JSON.stringify(record, null, 2);
	const sha = createHash('sha256').update(JSON.stringify(exchange.request)).digest('hex').slice(0, 12);
	await fs.mkdir(dir, { recursive: true });
	const file = path.join(dir, `${name}.${sha}.raw.json`);
	await fs.writeFile(file, json);
	return file;
}

/** Shared CLI flags: --panel, --models, --profile, --list-models, --discover */
export function panelArgs(argv = process.argv.slice(2)) {
	const get = (n) => argv.find((a) => a.startsWith(`--${n}=`))?.split('=').slice(1).join('=');
	const profile = get('profile');
	if (profile) process.env.DATABRICKS_PROFILE = profile;
	return { panel: get('panel'), models: get('models'), listModels: argv.includes('--list-models'), discover: argv.includes('--discover') };
}

/** Handle --list-models / --discover; returns true if it printed and the caller should exit. */
export async function handleInfoFlags({ listModels, discover }) {
	if (listModels) {
		console.log('Registered models:');
		for (const [k, m] of Object.entries(MODELS)) console.log(`  ${k.padEnd(18)} ${m.name.padEnd(16)} ${m.generation.padEnd(10)} ${m.transport}`);
		console.log('\nPanels:', Object.entries(PANELS).map(([p, ks]) => `${p}=${ks.join(',')}`).join('  '), ' latest=(discovered)');
		return true;
	}
	if (discover) {
		const eps = await listEndpoints();
		console.log('Chat-model endpoints in the workspace:');
		for (const e of eps.sort((a, b) => a.id.localeCompare(b.id))) console.log(`  ${e.id.padEnd(36)} ${e.family.padEnd(7)} ${e.ready ?? ''}`);
		console.log('\nlatest panel would be:', (await discoverLatest()).map((k) => MODELS[k].id).join(', '));
		return true;
	}
	return false;
}
