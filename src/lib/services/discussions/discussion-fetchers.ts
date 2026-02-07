/**
 * Discussion Fetchers
 *
 * Provides async functions for fetching discussion threads from YAML files.
 * Discussion data is stored in subdirectories under research questions.
 */

import type {
	DiscussionThread,
	DiscussionThreadSummary,
	DiscussionResponse,
	DiscussionConclusion,
	DiscussionModelId
} from '$lib/types/discussion';
import type { PhaseId, QuestionSlug } from '$lib/types/entities';
import yaml from 'js-yaml';

// Only use glob for discussion.yaml files in specific discussion directories
// These are directories named with the pattern rq-X-Y-slug (containing a hyphen after the question number)
const discussionFiles = import.meta.glob(
	'/static/content/research-questions/phase-*/rq-*-*-*/discussion.yaml',
	{
		query: '?raw',
		import: 'default',
		eager: false
	}
) as Record<string, () => Promise<string>>;

// Conclusion files in discussion directories
const conclusionFiles = import.meta.glob(
	'/static/content/research-questions/phase-*/rq-*-*-*/conclusion.md',
	{
		query: '?raw',
		import: 'default',
		eager: false
	}
) as Record<string, () => Promise<string>>;

/**
 * Cache for loaded discussions
 */
let discussionsCache: DiscussionThread[] | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60000; // 1 minute cache

/**
 * Parse discussion YAML file
 */
function parseDiscussionYAML(content: string): Partial<DiscussionThread> {
	try {
		return yaml.load(content) as Partial<DiscussionThread>;
	} catch (e) {
		console.error('Failed to parse discussion YAML:', e);
		return {};
	}
}

/**
 * Parse conclusion markdown file
 */
function parseConclusionFile(content: string): DiscussionConclusion | null {
	try {
		const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
		if (!frontmatterMatch) return null;

		const frontmatter = yaml.load(frontmatterMatch[1]) as {
			generatedBy: DiscussionModelId;
			generated: string;
		};
		const body = frontmatterMatch[2].trim();

		// Extract sections from the conclusion body
		const keyPoints: string[] = [];
		const unresolvedQuestions: string[] = [];
		const recommendedActions: string[] = [];

		const keyPointsMatch = body.match(/## Key Points([\s\S]*?)(?=##|$)/i);
		if (keyPointsMatch) {
			keyPointsMatch[1]
				.split('\n')
				.filter((l) => l.trim().startsWith('-') || l.trim().startsWith('*'))
				.forEach((l) => keyPoints.push(l.replace(/^[\s\-\*]+/, '').trim()));
		}

		const unresolvedMatch = body.match(/## Unresolved Questions([\s\S]*?)(?=##|$)/i);
		if (unresolvedMatch) {
			unresolvedMatch[1]
				.split('\n')
				.filter((l) => l.trim().startsWith('-') || l.trim().startsWith('*') || l.trim().match(/^\d+\./))
				.forEach((l) => unresolvedQuestions.push(l.replace(/^[\s\-\*\d.]+/, '').trim()));
		}

		const actionsMatch = body.match(/## Recommended Actions([\s\S]*?)(?=##|$)/i);
		if (actionsMatch) {
			actionsMatch[1]
				.split('\n')
				.filter((l) => l.trim().startsWith('-') || l.trim().startsWith('*') || l.trim().match(/^\d+\./))
				.forEach((l) => recommendedActions.push(l.replace(/^[\s\-\*\d.]+/, '').trim()));
		}

		return {
			summary: body,
			keyPoints,
			unresolvedQuestions,
			recommendedActions,
			generatedBy: frontmatter.generatedBy,
			generatedAt: frontmatter.generated
		};
	} catch {
		return null;
	}
}

/**
 * Extract question slug from file path
 */
function extractSlugFromPath(filePath: string): QuestionSlug | null {
	// Path format: /static/content/research-questions/phase-X/rq-X-Y-slug/discussion.yaml
	const match = filePath.match(/\/rq-\d+-\d+-([^/]+)\/discussion\.yaml$/);
	return match ? match[1] : null;
}

/**
 * Load a single discussion thread by question slug
 */
export async function fetchDiscussion(slug: QuestionSlug): Promise<DiscussionThread | null> {
	// Find the discussion file for this slug
	const matchingPath = Object.keys(discussionFiles).find((path) => {
		const extractedSlug = extractSlugFromPath(path);
		return extractedSlug === slug;
	});

	if (!matchingPath) {
		return null;
	}

	try {
		const content = await discussionFiles[matchingPath]();
		const thread = parseDiscussionYAML(content) as DiscussionThread;

		// Load conclusion if exists
		const conclusionPath = matchingPath.replace('discussion.yaml', 'conclusion.md');
		if (conclusionFiles[conclusionPath]) {
			try {
				const conclusionContent = await conclusionFiles[conclusionPath]();
				thread.conclusion = parseConclusionFile(conclusionContent) || undefined;
			} catch {
				// Conclusion file may not exist
			}
		}

		return thread;
	} catch (e) {
		console.error('Failed to fetch discussion:', e);
		return null;
	}
}

/**
 * Fetch all discussions with caching
 */
export async function fetchAllDiscussions(): Promise<DiscussionThread[]> {
	const now = Date.now();

	// Return cached data if still valid
	if (discussionsCache && now - cacheTimestamp < CACHE_TTL_MS) {
		return discussionsCache;
	}

	const discussions: DiscussionThread[] = [];

	// Load all discussion files
	const loadPromises = Object.entries(discussionFiles).map(async ([path, loader]) => {
		try {
			const content = await loader();
			const thread = parseDiscussionYAML(content) as DiscussionThread;

			// Load conclusion if exists
			const conclusionPath = path.replace('discussion.yaml', 'conclusion.md');
			if (conclusionFiles[conclusionPath]) {
				try {
					const conclusionContent = await conclusionFiles[conclusionPath]();
					thread.conclusion = parseConclusionFile(conclusionContent) || undefined;
				} catch {
					// Conclusion file may not exist
				}
			}

			return thread;
		} catch {
			return null;
		}
	});

	const results = await Promise.all(loadPromises);
	for (const thread of results) {
		if (thread && thread.questionId) {
			discussions.push(thread);
		}
	}

	// Sort by most recent activity
	discussions.sort((a, b) => {
		const aDate = a.concludedAt || a.startedAt;
		const bDate = b.concludedAt || b.startedAt;
		return new Date(bDate).getTime() - new Date(aDate).getTime();
	});

	// Update cache
	discussionsCache = discussions;
	cacheTimestamp = now;

	return discussions;
}

/**
 * Fetch discussion summaries (lightweight for list views)
 */
export async function fetchDiscussionSummaries(): Promise<DiscussionThreadSummary[]> {
	const discussions = await fetchAllDiscussions();

	return discussions.map((d) => ({
		questionId: d.questionId,
		questionSlug: d.questionSlug,
		questionTitle: d.questionTitle,
		phaseId: d.phaseId,
		status: d.status,
		roundCount: d.rounds?.length || 0,
		lastUpdated: d.concludedAt || d.startedAt,
		terminationReason: d.terminationReason
	}));
}

/**
 * Fetch discussions for a specific phase
 */
export async function fetchDiscussionsForPhase(phaseId: PhaseId): Promise<DiscussionThread[]> {
	const allDiscussions = await fetchAllDiscussions();
	return allDiscussions.filter((d) => d.phaseId === phaseId);
}

/**
 * Check if a question has a discussion thread
 */
export async function hasDiscussion(slug: QuestionSlug): Promise<boolean> {
	const matchingPath = Object.keys(discussionFiles).find((path) => {
		const extractedSlug = extractSlugFromPath(path);
		return extractedSlug === slug;
	});

	return !!matchingPath;
}

/**
 * Fetch round responses with full content
 * Note: This fetches responses from the thread's cached data, not from individual files
 */
export async function fetchRoundResponses(
	slug: QuestionSlug,
	roundNumber: number
): Promise<DiscussionResponse[]> {
	const thread = await fetchDiscussion(slug);
	if (!thread || !thread.rounds) return [];

	const round = thread.rounds.find((r) => r.roundNumber === roundNumber);
	return round?.responses || [];
}

/**
 * Clear the discussions cache
 */
export function clearDiscussionsCache(): void {
	discussionsCache = null;
	cacheTimestamp = 0;
}
