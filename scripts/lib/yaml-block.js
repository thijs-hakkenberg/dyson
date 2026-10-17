// @ts-nocheck — plain Node module
/** Parse the last fenced YAML block of a model response, repairing common model slips. */

import yaml from 'js-yaml';

/**
 * Quote plain scalars that break YAML: a value containing ": " or " #", or starting with
 * an indicator character (">=90 days" reads as a folded block). Block indicators (">-", "|")
 * at end of line, and values already quoted or in brackets, are left alone.
 */
function quotePlainScalars(src) {
	return src.replace(/^(\s*(?:- )?[\w-]+:) (.+)$/gm, (line, key, value) => {
		const v = value.trim();
		if (/^[|>][-+]?$/.test(v)) return line;
		// A quoted value is fine only if the quote closes at the end ('"a" b' is a plain scalar)
		const q = v[0];
		if ((q === '"' || q === "'") && v.length > 1 && v.indexOf(q, 1) === v.length - 1) return line;
		if (/^[[{&*!]/.test(v)) return line;
		if (q === '"' || q === "'") return `${key} '${v.replace(/'/g, "''")}'`;
		if (!(/: | #/.test(v) || /^[>|%@`]/.test(v))) return line;
		return `${key} '${v.replace(/'/g, "''")}'`;
	});
}

/** Last fenced yaml block of a response, parsed (with one repair attempt); null if absent or invalid. */
export function lastYaml(text) {
	const blocks = [...(text ?? '').matchAll(/```ya?ml\s*\n([\s\S]*?)```/g)];
	if (!blocks.length) return null;
	const src = blocks[blocks.length - 1][1];
	for (const attempt of [src, quotePlainScalars(src)]) {
		try {
			return yaml.load(attempt);
		} catch {
			/* try the repaired text */
		}
	}
	return null;
}

