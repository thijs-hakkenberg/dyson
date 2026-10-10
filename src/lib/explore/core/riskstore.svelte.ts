/** Validation claims, loaded lazily for the Risk lens. */

import { fetchAllValidations } from '$lib/services/validation/validation-service';
import type { ValidatedClaim } from '$lib/types/validation';

class RiskStore {
	claims = $state.raw<ValidatedClaim[]>([]);
	private started = false;

	ensure() {
		if (this.started) return;
		this.started = true;
		fetchAllValidations()
			.then((c) => (this.claims = c))
			.catch(() => (this.started = false));
	}
}

export const riskStore = new RiskStore();
