/**
 * Organizations Fetchers
 *
 * Provides async functions for fetching organization data from YAML files.
 * Uses Vite's import.meta.glob for build-time loading to support prerendering.
 */

import type {
	ExternalOrganization,
	OrganizationQuestion,
	OrganizationWithQuestions
} from '$lib/types/organizations';
import { parseOrganizationsYaml } from './organizations-parsers';
import { getQuestionsForOrganization, computeOrgQuestionStats } from './organizations-service';

// Use import.meta.glob to load YAML at build time
const yamlFiles = import.meta.glob('/src/content/external-organizations/**/*.yaml', {
	query: '?raw',
	import: 'default',
	eager: false
}) as Record<string, () => Promise<string>>;

/**
 * Cache for loaded data
 */
let organizationsCache: ExternalOrganization[] | null = null;
let questionsCache: OrganizationQuestion[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60000; // 1 minute

/**
 * Load and parse all organization data
 */
async function loadData(): Promise<{
	organizations: ExternalOrganization[];
	questions: OrganizationQuestion[];
}> {
	const now = Date.now();

	// Return cached data if valid
	if (organizationsCache && questionsCache && now - cacheTimestamp < CACHE_TTL_MS) {
		return {
			organizations: organizationsCache,
			questions: questionsCache
		};
	}

	// Load index.yaml
	const indexPath = '/src/content/external-organizations/index.yaml';
	const loader = yamlFiles[indexPath];

	if (!loader) {
		console.warn('Organizations index.yaml not found');
		return { organizations: [], questions: [] };
	}

	try {
		const content = await loader();
		const data = parseOrganizationsYaml(content);

		// Update cache
		organizationsCache = data.organizations;
		questionsCache = data.questions;
		cacheTimestamp = now;

		return data;
	} catch (error) {
		console.error('Error loading organizations data:', error);
		return { organizations: [], questions: [] };
	}
}

/**
 * Fetch all organizations
 */
export async function fetchAllOrganizations(): Promise<ExternalOrganization[]> {
	const { organizations } = await loadData();
	return organizations;
}

/**
 * Fetch all questions
 */
export async function fetchAllOrgQuestions(): Promise<OrganizationQuestion[]> {
	const { questions } = await loadData();
	return questions;
}

/**
 * Fetch organization by slug with questions
 */
export async function fetchOrganization(slug: string): Promise<OrganizationWithQuestions | null> {
	const { organizations, questions } = await loadData();
	const org = organizations.find((o) => o.slug === slug);

	if (!org) return null;

	const orgQuestions = getQuestionsForOrganization(questions, org.id);
	const questionStats = computeOrgQuestionStats(orgQuestions);

	return {
		...org,
		questions: orgQuestions,
		questionStats
	};
}

/**
 * Fetch organization by ID
 */
export async function fetchOrganizationById(id: string): Promise<ExternalOrganization | null> {
	const { organizations } = await loadData();
	return organizations.find((o) => o.id === id) || null;
}

/**
 * Clear cache (for development/testing)
 */
export function clearOrganizationsCache(): void {
	organizationsCache = null;
	questionsCache = null;
	cacheTimestamp = 0;
}
