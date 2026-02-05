/**
 * External Organizations Domain Types
 *
 * Defines types for tracking external organizations and
 * questions/requests for specification validation.
 */

import type { ResearchQuestionId } from './entities';

// Organization categories
export type OrganizationCategory =
	| 'space-agency'
	| 'propulsion-lab'
	| 'pv-research'
	| 'manufacturing'
	| 'university'
	| 'standards-body';

// Question status workflow
export type QuestionStatus = 'draft' | 'sent' | 'awaiting-response' | 'responded' | 'closed';

// Priority levels (reuse from entities)
export type { Priority } from './entities';

/**
 * Contact information for an organization
 */
export interface Contact {
	name: string;
	role: string;
	email?: string;
	department?: string;
	notes?: string;
}

/**
 * External organization profile
 */
export interface ExternalOrganization {
	id: string;
	slug: string;
	name: string;
	shortName?: string;
	category: OrganizationCategory;
	website: string;
	description: string;
	relevantDomains: string[];
	contacts: Contact[];
	lastContact: string | null;
	notes?: string;
}

/**
 * Question or request to send to an organization
 */
export interface OrganizationQuestion {
	id: string;
	organizationId: string;
	question: string;
	context?: string;
	relatedRQs: ResearchQuestionId[];
	priority: 'critical' | 'high' | 'medium' | 'low';
	status: QuestionStatus;
	dateCreated: string;
	dateSent: string | null;
	response: string | null;
	responseDate: string | null;
	assignedTo?: string;
	tags?: string[];
}

/**
 * Aggregated data for an organization including questions
 */
export interface OrganizationWithQuestions extends ExternalOrganization {
	questions: OrganizationQuestion[];
	questionStats: {
		total: number;
		byStatus: Record<QuestionStatus, number>;
		byPriority: Record<'critical' | 'high' | 'medium' | 'low', number>;
	};
}

// Type guards
export function isOrganizationCategory(value: string): value is OrganizationCategory {
	return [
		'space-agency',
		'propulsion-lab',
		'pv-research',
		'manufacturing',
		'university',
		'standards-body'
	].includes(value);
}

export function isQuestionStatus(value: string): value is QuestionStatus {
	return ['draft', 'sent', 'awaiting-response', 'responded', 'closed'].includes(value);
}

// ID helpers
export function createOrganizationId(index: number): string {
	return `org-${index.toString().padStart(3, '0')}`;
}

export function createQuestionId(orgIndex: number, questionIndex: number): string {
	return `oq-${orgIndex}-${questionIndex}`;
}
