/**
 * Loaded Workbench data for the open BOM item. Fetches lazily when the
 * Workbench opens; stale responses are dropped if the item changed meanwhile.
 */

import { marked } from 'marked';
import { sanitizeMarkdownHTML } from '$lib/utils/sanitize';
import { layoutWorkbench, loadWorkbench, type WorkbenchData, type WorkbenchLayout } from './workbench';

class WorkbenchStore {
	data = $state.raw<WorkbenchData | null>(null);
	layout = $state.raw<WorkbenchLayout | null>(null);
	loading = $state(false);
	failed = $state(false);
	private loadedFor = '';

	async ensure(bomId: string) {
		if (this.loadedFor === bomId) return;
		this.loadedFor = bomId;
		this.loading = true;
		this.failed = false;
		this.data = null;
		this.layout = null;
		const d = await loadWorkbench(bomId).catch(() => null);
		if (this.loadedFor !== bomId) return;
		this.data = d;
		this.layout = d ? layoutWorkbench(d) : null;
		this.failed = !d;
		this.loading = false;
	}
}

export const wb = new WorkbenchStore();

/** Markdown → sanitised HTML for inspector panels. */
export function renderMarkdown(md: string, inline = false): string {
	const html = inline ? (marked.parseInline(md) as string) : (marked.parse(md) as string);
	return sanitizeMarkdownHTML(html);
}
