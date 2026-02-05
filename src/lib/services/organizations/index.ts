/**
 * Organizations Services Module
 *
 * Re-exports all organization-related functionality.
 */

// Fetcher exports
export {
	fetchAllOrganizations,
	fetchAllOrgQuestions,
	fetchOrganization,
	fetchOrganizationById,
	clearOrganizationsCache
} from './organizations-fetchers';

// Parser exports
export { parseOrganizationsYaml } from './organizations-parsers';

// Service exports
export {
	filterOrganizations,
	filterOrgQuestions,
	computeOrganizationStats,
	computeOrgQuestionStats,
	findOrganizationBySlug,
	findOrganizationById,
	getQuestionsForOrganization,
	searchOrganizations,
	extractAllDomains,
	filterOrganizationsByCategory,
	type OrganizationFilters,
	type OrgQuestionFilters,
	type OrganizationStats,
	type OrgQuestionStats
} from './organizations-service';
