/**
 * Parse the "## Divergent Views" section of a consensus document into topics with
 * model-attributed positions (src/lib/types/divergent-views.ts).
 *
 * Synthesizer output varies between runs, so this accepts each topic heading form seen so far:
 *   - **Topic**: text…      - **Topic:** text…      - **Topic.**      - **Topic**
 * followed by optional nested bullets. A line is attributed to the models named near its start
 * ("Claude recommends…", "Claude and GPT require…", "On that basis Claude…"); deeper
 * unattributed lines continue the position above them; unattributed lines at the same depth
 * ("All three…", "These totals are not like-for-like") are shared notes and are not positions.
 * Statements are kept whole — never split at full stops, which broke on "$9.3B" and "C3 −0.7".
 */

const MODELS = ['Claude', 'Gemini', 'GPT'];
const LEAD_CHARS = 40;

function stripMarkdown(text) {
	return text
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\*([^*]+)\*/g, '$1')
		.replace(/`([^`]+)`/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();
}

function modelsNamedAtStart(text) {
	const lead = stripMarkdown(text).slice(0, LEAD_CHARS);
	return MODELS.filter((m) => new RegExp(`\\b${m}\\b`).test(lead));
}

function slugify(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/** Split the section into topic blocks: { topic, lines: [{ depth, text }] }. */
function topicBlocks(section) {
	const blocks = [];
	for (const raw of section.split('\n')) {
		if (!raw.trim()) continue;
		const head = raw.match(/^- \*\*(.+?)\*\*\s*:?\s*(.*)$/);
		if (head) {
			const topic = head[1].replace(/[.:]\s*$/, '').trim();
			blocks.push({ topic, lines: head[2] ? [{ depth: 0, text: head[2] }] : [] });
			continue;
		}
		if (!blocks.length) continue;
		const bullet = raw.match(/^(\s*)(?:[-*]|\d+\.)\s+(.*)$/);
		if (bullet) {
			blocks[blocks.length - 1].lines.push({ depth: bullet[1].length + 1, text: bullet[2] });
		} else if (raw.startsWith(' ')) {
			// continuation paragraph inside a bullet
			const last = blocks[blocks.length - 1].lines.at(-1);
			if (last) last.text += ' ' + raw.trim();
		}
	}
	return blocks;
}

// Sentence starts: after . ! ? and a space, before a capital or a bold run. "$9.3B" and "C3 −0.7"
// have no space after the point, so they never split.
const SENTENCE_BREAK = /(?<=[.!?])\s+(?=\*{0,2}[A-Z])/;

function positionsFor(lines) {
	const positions = [];
	let current = null;
	for (const { depth, text } of lines) {
		const [first, ...rest] = text.split(SENTENCE_BREAK);
		const models = modelsNamedAtStart(first);
		if (models.length) {
			current = { depth, statement: stripMarkdown(first), models };
			positions.push(current);
		} else if (current && depth > current.depth) {
			current.statement += ' ' + stripMarkdown(first);
		} else {
			current = null;
		}
		// One line can carry several models' positions ("Claude recommends… Gemini prefers…").
		for (const sentence of rest) {
			const named = modelsNamedAtStart(sentence);
			if (named.length && named.join() !== current?.models.join()) {
				current = { depth, statement: stripMarkdown(sentence), models: named };
				positions.push(current);
			} else if (current) {
				current.statement += ' ' + stripMarkdown(sentence);
			}
		}
	}
	// Merge repeated attributions to the same model set ("On that basis Claude recommends…").
	const merged = [];
	for (const p of positions) {
		const prev = merged.find((m) => m.models.join() === p.models.join());
		if (prev) prev.statement += ' ' + p.statement;
		else merged.push({ statement: p.statement, models: p.models });
	}
	return merged;
}

/**
 * @param {string} consensusContent full consensus markdown (frontmatter optional)
 * @returns {{ id: string, topic: string, positions: { statement: string, models: string[] }[] }[]}
 */
export function parseDivergentViews(consensusContent) {
	const match = consensusContent.match(/^## Divergent Views[^\n]*\n([\s\S]*?)(?=^## |(?![\s\S]))/m);
	if (!match) return [];
	return topicBlocks(match[1])
		.map(({ topic, lines }) => ({ id: slugify(topic), topic, positions: positionsFor(lines) }))
		.filter((t) => t.positions.length > 0);
}

function quote(text) {
	return `"${text.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

/** Serialise to the divergent-views.yaml layout the site reads. */
export function divergentViewsYaml({ bomId, itemSlug, generated, topics }) {
	let yaml = `# Divergent Views for ${itemSlug}\n# Auto-generated from consensus document\n\n`;
	yaml += `bomId: ${quote(bomId)}\nitemSlug: ${quote(itemSlug)}\ngenerated: ${quote(generated)}\n\ntopics:\n`;
	for (const t of topics) {
		yaml += `  - id: ${quote(t.id)}\n    topic: ${quote(t.topic)}\n    positions:\n`;
		for (const p of t.positions) {
			yaml += `      - statement: ${quote(p.statement)}\n        models:\n`;
			for (const m of p.models) yaml += `          - ${quote(m)}\n`;
		}
	}
	return yaml;
}
