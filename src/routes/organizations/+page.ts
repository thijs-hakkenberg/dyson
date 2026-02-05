/**
 * Organizations List Page Load Function
 */

import type { PageLoad } from './$types';
import {
	fetchAllOrganizations,
	fetchAllOrgQuestions,
	computeOrganizationStats,
	computeOrgQuestionStats,
	getQuestionsForOrganization
} from '$lib/services/organizations';

export const load: PageLoad = async () => {
	const organizations = await fetchAllOrganizations();
	const questions = await fetchAllOrgQuestions();

	const orgStats = computeOrganizationStats(organizations);
	const questionStats = computeOrgQuestionStats(questions);

	// Add question counts to organizations
	const orgsWithCounts = organizations.map((org) => ({
		...org,
		questionCount: getQuestionsForOrganization(questions, org.id).length
	}));

	return {
		organizations: orgsWithCounts,
		orgStats,
		questionStats
	};
};
