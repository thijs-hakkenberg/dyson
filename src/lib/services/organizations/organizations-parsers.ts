/**
 * Organizations Parsers
 *
 * YAML parsing utilities for organization data files.
 */

import type {
	ExternalOrganization,
	OrganizationQuestion,
	OrganizationCategory,
	QuestionStatus
} from '$lib/types/organizations';
import type { Priority, ResearchQuestionId } from '$lib/types/entities';

/**
 * Parse YAML content into organizations and questions
 * Simple YAML parser for our specific format
 */
export function parseOrganizationsYaml(content: string): {
	organizations: ExternalOrganization[];
	questions: OrganizationQuestion[];
} {
	const organizations: ExternalOrganization[] = [];
	const questions: OrganizationQuestion[] = [];

	// Simple state-based YAML parser
	const lines = content.split('\n');
	let currentSection: 'organizations' | 'questions' | null = null;
	let currentItem: Record<string, unknown> | null = null;
	let currentArray: string | null = null;
	let currentContact: Record<string, unknown> | null = null;
	let indent = 0;

	for (const line of lines) {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith('#')) continue;

		const lineIndent = line.search(/\S/);

		// Top-level sections
		if (trimmed === 'organizations:') {
			currentSection = 'organizations';
			currentItem = null;
			continue;
		}
		if (trimmed === 'questions:') {
			currentSection = 'questions';
			currentItem = null;
			continue;
		}

		// Array item start
		if (trimmed.startsWith('- ')) {
			if (currentArray === 'contacts' && currentItem) {
				// New contact in contacts array
				if (currentContact) {
					if (!currentItem.contacts) currentItem.contacts = [];
					(currentItem.contacts as Record<string, unknown>[]).push(currentContact);
				}
				currentContact = {};
				const afterDash = trimmed.slice(2);
				if (afterDash.includes(':')) {
					const [key, ...valueParts] = afterDash.split(':');
					const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
					currentContact[key.trim()] = value;
				}
				continue;
			}

			if (currentArray && currentItem) {
				// Array value
				const value = trimmed.slice(2).trim().replace(/^["']|["']$/g, '');
				if (!currentItem[currentArray]) currentItem[currentArray] = [];
				(currentItem[currentArray] as string[]).push(value);
				continue;
			}

			// New item in organizations or questions
			if (currentItem && currentSection === 'organizations') {
				if (currentContact) {
					if (!currentItem.contacts) currentItem.contacts = [];
					(currentItem.contacts as Record<string, unknown>[]).push(currentContact);
					currentContact = null;
				}
				organizations.push(parseOrganization(currentItem));
			} else if (currentItem && currentSection === 'questions') {
				questions.push(parseQuestion(currentItem));
			}
			currentItem = {};
			currentArray = null;
			currentContact = null;

			// Parse inline key-value if present
			const afterDash = trimmed.slice(2);
			if (afterDash.includes(':')) {
				const [key, ...valueParts] = afterDash.split(':');
				const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
				if (value) {
					currentItem[key.trim()] = value;
				} else {
					currentArray = key.trim();
				}
			}
			indent = lineIndent;
			continue;
		}

		// Key-value pair
		if (trimmed.includes(':') && currentItem) {
			const [key, ...valueParts] = trimmed.split(':');
			const keyTrimmed = key.trim();
			const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');

			// Handle contacts array properties
			if (currentContact && lineIndent > indent + 4) {
				currentContact[keyTrimmed] = value || null;
				continue;
			}

			// Close contacts if we're back at item level
			if (currentArray === 'contacts' && lineIndent <= indent + 2) {
				if (currentContact) {
					if (!currentItem.contacts) currentItem.contacts = [];
					(currentItem.contacts as Record<string, unknown>[]).push(currentContact);
					currentContact = null;
				}
				currentArray = null;
			}

			if (value === '' || value === 'null') {
				// Could be array start or null value
				if (['relevantDomains', 'contacts', 'relatedRQs', 'tags'].includes(keyTrimmed)) {
					currentArray = keyTrimmed;
					currentItem[keyTrimmed] = [];
				} else {
					currentItem[keyTrimmed] = null;
				}
			} else {
				currentArray = null;
				currentItem[keyTrimmed] = value;
			}
		}
	}

	// Handle last item
	if (currentItem) {
		if (currentContact) {
			if (!currentItem.contacts) currentItem.contacts = [];
			(currentItem.contacts as Record<string, unknown>[]).push(currentContact);
		}
		if (currentSection === 'organizations') {
			organizations.push(parseOrganization(currentItem));
		} else if (currentSection === 'questions') {
			questions.push(parseQuestion(currentItem));
		}
	}

	return { organizations, questions };
}

function parseOrganization(raw: Record<string, unknown>): ExternalOrganization {
	return {
		id: (raw.id as string) || '',
		slug: (raw.slug as string) || '',
		name: (raw.name as string) || '',
		shortName: (raw.shortName as string) || undefined,
		category: ((raw.category as OrganizationCategory) || 'university') as OrganizationCategory,
		website: (raw.website as string) || '',
		description: (raw.description as string) || '',
		relevantDomains: (raw.relevantDomains as string[]) || [],
		contacts: ((raw.contacts as Record<string, unknown>[]) || []).map((c) => ({
			name: (c.name as string) || '',
			role: (c.role as string) || '',
			email: (c.email as string) || undefined,
			department: (c.department as string) || undefined,
			notes: (c.notes as string) || undefined
		})),
		lastContact: (raw.lastContact as string) || null,
		notes: (raw.notes as string) || undefined
	};
}

function parseQuestion(raw: Record<string, unknown>): OrganizationQuestion {
	return {
		id: (raw.id as string) || '',
		organizationId: (raw.organizationId as string) || '',
		question: (raw.question as string) || '',
		context: (raw.context as string) || undefined,
		relatedRQs: ((raw.relatedRQs as string[]) || []) as ResearchQuestionId[],
		priority: ((raw.priority as Priority) || 'medium') as Priority,
		status: ((raw.status as QuestionStatus) || 'draft') as QuestionStatus,
		dateCreated: (raw.dateCreated as string) || new Date().toISOString().split('T')[0],
		dateSent: (raw.dateSent as string) || null,
		response: (raw.response as string) || null,
		responseDate: (raw.responseDate as string) || null,
		assignedTo: (raw.assignedTo as string) || undefined,
		tags: (raw.tags as string[]) || undefined
	};
}
