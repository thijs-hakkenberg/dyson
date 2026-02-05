/**
 * Organizations Service
 *
 * Provides filtering, searching, and aggregation functions for
 * external organizations and their associated questions.
 */

import type {
	ExternalOrganization,
	OrganizationQuestion,
	OrganizationCategory,
	QuestionStatus
} from '$lib/types/organizations';
import type { Priority } from '$lib/types/entities';

/**
 * Filter criteria for organizations
 */
export interface OrganizationFilters {
	category?: OrganizationCategory;
	domain?: string;
	hasRecentContact?: boolean;
	search?: string;
}

/**
 * Filter criteria for questions
 */
export interface OrgQuestionFilters {
	organizationId?: string;
	status?: QuestionStatus;
	priority?: Priority;
	relatedRQ?: string;
	search?: string;
}

/**
 * Organization statistics
 */
export interface OrganizationStats {
	total: number;
	byCategory: Record<OrganizationCategory, number>;
	withContacts: number;
	withRecentContact: number;
}

/**
 * Question statistics
 */
export interface OrgQuestionStats {
	total: number;
	byStatus: Record<QuestionStatus, number>;
	byPriority: Record<Priority, number>;
}

/**
 * Filter organizations with multiple criteria
 */
export function filterOrganizations(
	organizations: ExternalOrganization[],
	filters: OrganizationFilters
): ExternalOrganization[] {
	let results = organizations;

	if (filters.category) {
		results = results.filter((o) => o.category === filters.category);
	}

	if (filters.domain) {
		results = results.filter((o) =>
			o.relevantDomains.some((d) => d.toLowerCase().includes(filters.domain!.toLowerCase()))
		);
	}

	if (filters.hasRecentContact !== undefined) {
		results = results.filter((o) =>
			filters.hasRecentContact ? o.lastContact !== null : o.lastContact === null
		);
	}

	if (filters.search) {
		results = searchOrganizations(results, filters.search);
	}

	return results;
}

/**
 * Filter questions with multiple criteria
 */
export function filterOrgQuestions(
	questions: OrganizationQuestion[],
	filters: OrgQuestionFilters
): OrganizationQuestion[] {
	let results = questions;

	if (filters.organizationId) {
		results = results.filter((q) => q.organizationId === filters.organizationId);
	}

	if (filters.status) {
		results = results.filter((q) => q.status === filters.status);
	}

	if (filters.priority) {
		results = results.filter((q) => q.priority === filters.priority);
	}

	if (filters.relatedRQ) {
		results = results.filter((q) => q.relatedRQs.includes(filters.relatedRQ as never));
	}

	if (filters.search) {
		const searchLower = filters.search.toLowerCase();
		results = results.filter(
			(q) =>
				q.question.toLowerCase().includes(searchLower) ||
				q.context?.toLowerCase().includes(searchLower) ||
				q.tags?.some((t) => t.toLowerCase().includes(searchLower))
		);
	}

	return results;
}

/**
 * Compute organization statistics
 */
export function computeOrganizationStats(organizations: ExternalOrganization[]): OrganizationStats {
	const stats: OrganizationStats = {
		total: organizations.length,
		byCategory: {
			'space-agency': 0,
			'propulsion-lab': 0,
			'pv-research': 0,
			manufacturing: 0,
			university: 0,
			'standards-body': 0
		},
		withContacts: 0,
		withRecentContact: 0
	};

	for (const org of organizations) {
		stats.byCategory[org.category]++;
		if (org.contacts.length > 0) stats.withContacts++;
		if (org.lastContact) stats.withRecentContact++;
	}

	return stats;
}

/**
 * Compute question statistics
 */
export function computeOrgQuestionStats(questions: OrganizationQuestion[]): OrgQuestionStats {
	const stats: OrgQuestionStats = {
		total: questions.length,
		byStatus: {
			draft: 0,
			sent: 0,
			'awaiting-response': 0,
			responded: 0,
			closed: 0
		},
		byPriority: {
			critical: 0,
			high: 0,
			medium: 0,
			low: 0
		}
	};

	for (const question of questions) {
		stats.byStatus[question.status]++;
		stats.byPriority[question.priority]++;
	}

	return stats;
}

/**
 * Find organization by slug
 */
export function findOrganizationBySlug(
	organizations: ExternalOrganization[],
	slug: string
): ExternalOrganization | undefined {
	return organizations.find((o) => o.slug === slug);
}

/**
 * Find organization by ID
 */
export function findOrganizationById(
	organizations: ExternalOrganization[],
	id: string
): ExternalOrganization | undefined {
	return organizations.find((o) => o.id === id);
}

/**
 * Get questions for a specific organization
 */
export function getQuestionsForOrganization(
	questions: OrganizationQuestion[],
	organizationId: string
): OrganizationQuestion[] {
	return questions.filter((q) => q.organizationId === organizationId);
}

/**
 * Search organizations by text
 */
export function searchOrganizations(
	organizations: ExternalOrganization[],
	query: string
): ExternalOrganization[] {
	const searchLower = query.toLowerCase();
	return organizations.filter(
		(o) =>
			o.name.toLowerCase().includes(searchLower) ||
			o.shortName?.toLowerCase().includes(searchLower) ||
			o.description.toLowerCase().includes(searchLower) ||
			o.relevantDomains.some((d) => d.toLowerCase().includes(searchLower))
	);
}

/**
 * Get all unique domains across organizations
 */
export function extractAllDomains(organizations: ExternalOrganization[]): string[] {
	const domainSet = new Set<string>();
	for (const org of organizations) {
		for (const domain of org.relevantDomains) {
			domainSet.add(domain);
		}
	}
	return Array.from(domainSet).sort();
}

/**
 * Get organizations by category
 */
export function filterOrganizationsByCategory(
	organizations: ExternalOrganization[],
	category: OrganizationCategory
): ExternalOrganization[] {
	return organizations.filter((o) => o.category === category);
}
