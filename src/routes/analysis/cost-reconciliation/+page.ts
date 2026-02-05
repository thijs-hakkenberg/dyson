/**
 * Cost Reconciliation Page Load Function
 *
 * Loads cost reconciliation data from all model specs for analysis.
 */

import type { PageLoad } from './$types';
import { generateReconciliationReport } from '$lib/services/cost-analysis';

// Disable prerender since this page uses query parameters
export const prerender = false;

export const load: PageLoad = async ({ url }) => {
	// Get phase from query params (default to 'all')
	const phaseId = url.searchParams.get('phase') || 'all';

	// Generate the reconciliation report
	const report = await generateReconciliationReport(phaseId);

	return {
		report,
		selectedPhase: phaseId
	};
};
