/**
 * Model registry for display. Mirrors scripts/lib/llm.js: every model generation the
 * project has used, plus a derivation for models added later (discovered endpoints),
 * so new debate participants render with a sensible name and family colour.
 */

export type ModelFamily = 'claude' | 'gemini' | 'gpt' | 'other';

export const KNOWN_MODELS: Record<string, { name: string; family: ModelFamily; generation: string }> = {
	'claude-opus-4-5': { name: 'Claude Opus 4.5', family: 'claude', generation: '2026-01' },
	'claude-opus-4-6': { name: 'Claude Opus 4.6', family: 'claude', generation: '2026-02' },
	'gemini-3-pro': { name: 'Gemini 3 Pro', family: 'gemini', generation: '2026-02' },
	'gpt-5-2': { name: 'GPT-5.2', family: 'gpt', generation: '2026-02' },
	'claude-opus-4-7': { name: 'Claude Opus 4.7', family: 'claude', generation: '2026-05' },
	'gemini-3-1-pro': { name: 'Gemini 3.1 Pro', family: 'gemini', generation: '2026-05' },
	'gpt-5-5-pro': { name: 'GPT-5.5 Pro', family: 'gpt', generation: '2026-05' }
};

export function modelFamily(id: string): ModelFamily {
	if (KNOWN_MODELS[id]) return KNOWN_MODELS[id].family;
	if (/claude|opus|sonnet|haiku|fable/i.test(id)) return 'claude';
	if (/gemini/i.test(id)) return 'gemini';
	if (/gpt|^o\d/i.test(id)) return 'gpt';
	return 'other';
}

/** claude-opus-5-5 → "Claude Opus 5.5", gpt-5-6-pro → "GPT-5.6 Pro" */
export function modelName(id: string): string {
	if (KNOWN_MODELS[id]) return KNOWN_MODELS[id].name;
	const words: string[] = [];
	let version: string[] = [];
	const flush = () => {
		if (version.length) words.push(version.join('.'));
		version = [];
	};
	for (const p of id.replace(/^databricks-/, '').split('-')) {
		if (/^\d+$/.test(p)) version.push(p);
		else {
			flush();
			words.push(p === 'gpt' ? 'GPT' : p.charAt(0).toUpperCase() + p.slice(1));
		}
	}
	flush();
	return words.join(' ').replace(/^GPT (\d)/, 'GPT-$1');
}
