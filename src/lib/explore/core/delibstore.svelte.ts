/** Deliberation threads for the Chamber, loaded lazily. */

import { fetchAllDiscussions, fetchDiscussion } from '$lib/services/discussions';
import type { DiscussionThread } from '$lib/types/discussion';
import { summarise, type ChamberSummary } from './deliberation';

class DelibStore {
	list = $state.raw<ChamberSummary[]>([]);
	thread = $state.raw<DiscussionThread | null>(null);
	private listStarted = false;
	private loadedFor = '';

	ensureList() {
		if (this.listStarted) return;
		this.listStarted = true;
		fetchAllDiscussions()
			.then(
				(all) =>
					(this.list = all
						.map(summarise)
						.sort((a, b) => a.questionId.localeCompare(b.questionId, undefined, { numeric: true })))
			)
			.catch(() => (this.listStarted = false));
	}

	async open(slug: string) {
		if (this.loadedFor === slug) return;
		this.loadedFor = slug;
		this.thread = null;
		const t = await fetchDiscussion(slug as never).catch(() => null);
		if (this.loadedFor === slug) this.thread = t;
	}
}

export const delib = new DelibStore();
