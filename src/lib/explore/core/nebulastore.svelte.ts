/** Lazily loaded Research Nebula layout (questions are fetched on first use). */

import { loadNebula, type NebulaLayout } from './nebula';

class NebulaStore {
	layout = $state.raw<NebulaLayout | null>(null);
	loading = $state(false);
	private started = false;

	ensure() {
		if (this.started) return;
		this.started = true;
		this.loading = true;
		loadNebula()
			.then((l) => (this.layout = l))
			.catch(() => (this.started = false))
			.finally(() => (this.loading = false));
	}
}

export const nebula = new NebulaStore();
