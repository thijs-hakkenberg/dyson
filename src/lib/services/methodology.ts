/**
 * Methodology documents (src/content/methodology/) — the methods the multi-model
 * reviews are held to. Server-side only: hashes bodies the way scripts/lib/critique.js
 * does, so a page can show which re-assessment rounds applied the current version.
 */

import { createHash } from 'crypto';
import { Marked } from 'marked';
import { parseMarkdown } from '$lib/utils/markdown';

const files = import.meta.glob('/src/content/methodology/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

// Reconciliations written by critique rounds carry `framework: <sha>` in frontmatter
const reconciliations = import.meta.glob('/reconciliation/*/round-*/reconciliation/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

export interface MethodologyDoc {
	slug: string;
	title: string;
	summary: string;
	usedBy: string[];
	body: string;
	sha: string;
	html: string;
	toc: { id: string; text: string }[];
	scaffold: { step: string; detail: string; sources: string | null }[];
}

export interface CritiqueRound {
	phase: string;
	round: number;
	items: number;
	synthesizer: string | null;
	/** applied the framework as it reads now */
	current: boolean;
	path: string;
}

export const slugify = (text: string) =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/[\s-]+/g, '-');

function render(markdown: string) {
	const toc: MethodologyDoc['toc'] = [];
	const marked = new Marked({ gfm: true });
	marked.use({
		renderer: {
			heading({ tokens, depth, text }) {
				const id = slugify(text);
				if (depth === 2) toc.push({ id, text });
				return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
			}
		}
	});
	// The page renders the title itself
	const html = marked.parse(markdown.replace(/^#\s.*\n+/, '')) as string;
	return { html, toc };
}

function scaffoldOf(body: string): MethodologyDoc['scaffold'] {
	const section = body.split(/^## Composite Scaffold\s*$/m)[1]?.split(/^## /m)[0] ?? '';
	return [...section.matchAll(/^\d+\.\s+\*\*(.+?)\*\*(?:\s+—\s+(.*?))?(?:\s+\*\((.+?)\)\*)?\s*$/gm)].map((m) => ({
		step: m[1],
		detail: m[2] ?? '',
		sources: m[3] ?? null
	}));
}

function toDoc(raw: string): MethodologyDoc {
	const { frontmatter } = parseMarkdown<Record<string, unknown>>(raw);
	// Same body the scripts hash: everything after the frontmatter block
	const body = raw.replace(/^---\n[\s\S]*?\n---\n+/, '');
	return {
		slug: String(frontmatter.slug),
		title: String(frontmatter.title),
		summary: String(frontmatter.summary ?? ''),
		usedBy: (frontmatter.usedBy as string[] | undefined) ?? [],
		body,
		sha: createHash('sha256').update(body).digest('hex').slice(0, 12),
		...render(body),
		scaffold: scaffoldOf(body)
	};
}

const docs = Object.values(files)
	.map(toDoc)
	.sort((a, b) => a.title.localeCompare(b.title));

export const getMethodologyDocs = () => docs;
export const getMethodologyDoc = (slug: string) => docs.find((d) => d.slug === slug) ?? null;

/** Re-assessment rounds whose reconciliations record a framework hash. */
export function critiqueRoundsFor(sha: string, sources: Record<string, string> = reconciliations): CritiqueRound[] {
	const rounds = new Map<string, CritiqueRound>();
	for (const [file, text] of Object.entries(sources)) {
		const fm = text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
		const field = (k: string) => fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'))?.[1].trim() ?? null;
		const framework = field('framework');
		const at = file.match(/\/reconciliation\/([^/]+)\/round-(\d+)\//);
		if (!framework || !at) continue;
		const key = `${at[1]}/${at[2]}`;
		const r = rounds.get(key) ?? {
			phase: at[1],
			round: Number(at[2]),
			items: 0,
			synthesizer: field('synthesizer'),
			current: true,
			path: `reconciliation/${at[1]}/round-${at[2]}`
		};
		r.items++;
		r.synthesizer ??= field('synthesizer');
		if (framework !== sha) r.current = false;
		rounds.set(key, r);
	}
	return [...rounds.values()].sort((a, b) => a.phase.localeCompare(b.phase) || a.round - b.round);
}
