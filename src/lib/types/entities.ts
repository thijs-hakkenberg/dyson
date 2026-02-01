/**
 * Entity Domain Model for Project Dyson
 *
 * This module defines the core entity types with branded IDs for type safety
 * and cross-referencing support between BOM Items, Research Questions, and Activities.
 */

// Branded ID types for type safety
export type PhaseId = `phase-${number}`;
export type BOMItemId = `bom-${number}-${number}`;
export type ResearchQuestionId = `rq-${number}-${number}`;
export type ActivityId = `act-${number}-${number}`;

// BOM Item type hierarchy
export type BOMItemType = 'composite' | 'sub-assembly' | 'component' | 'raw-material';

// Status types
export type BOMItemStatus = 'planned' | 'in-development' | 'ready' | 'deployed';
export type ResearchQuestionStatus = 'open' | 'investigating' | 'answered' | 'deferred';
export type ActivityStatus = 'pending' | 'in-progress' | 'completed' | 'blocked';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

// Question classification types
export type QuestionType =
	| 'meta-research' // Literature review, meta-analysis
	| 'experimentation' // Requires physical testing
	| 'simulation' // Computational modeling
	| 'engineering-decision' // Design tradeoff analysis
	| 'discussion'; // Stakeholder consensus building

// Question slug type
export type QuestionSlug = string;

/**
 * BOM Item Entity with hierarchy support
 * Supports composite → sub-assembly → component → raw-material relationships
 */
export interface BOMItemEntity {
	id: BOMItemId;
	slug: string;
	name: string;
	description: string;
	type: BOMItemType;
	category: string;
	phaseId: PhaseId;

	// Hierarchy relationships
	parentId?: BOMItemId;
	childIds: BOMItemId[];

	// Cross-references
	relatedResearchQuestions: ResearchQuestionId[];
	relatedActivities: ActivityId[];

	// Quantity and cost
	quantity: number;
	unit: string;
	unitCost: number;
	totalCost: number;

	// Status and metadata
	status: BOMItemStatus;
	notes?: string;
}

/**
 * Research Question Entity
 * Links to BOM items and can block activities
 */
export interface ResearchQuestionEntity {
	id: ResearchQuestionId;
	title: string;
	description: string;
	phaseId: PhaseId;

	// Cross-references
	relatedBOMItems: BOMItemId[];
	blocksActivities: ActivityId[];

	// Status and priority
	status: ResearchQuestionStatus;
	priority: Priority;

	// Metadata
	assignedTo?: string;
	dueDate?: Date;
	answer?: string;
	references?: string[];
}

/**
 * Extended Research Question
 * Full question data with classification, source tracking, and cross-references
 */
export interface ResearchQuestion {
	id: ResearchQuestionId;
	slug: QuestionSlug;
	title: string;
	description: string;

	// Context - background information to understand the question standalone
	context: string;
	sourceBOMItemName: string;

	// Classification
	questionType: QuestionType;
	priority: Priority;
	status: ResearchQuestionStatus;

	// Source tracking
	sourcePhaseId: PhaseId;
	sourceBOMItemId: BOMItemId;
	sourceBOMItemSlug: string;

	// Cross-references
	relatedBOMItems: BOMItemId[];
	relatedQuestionIds: ResearchQuestionId[];

	// Metadata
	createdDate: string;
	tags: string[];
	answer?: string;
	references?: string[];
}

/**
 * Activity Entity with dependencies
 * Represents work items that can be blocked by other activities or research questions
 */
export interface ActivityEntity {
	id: ActivityId;
	name: string;
	description: string;
	phaseId: PhaseId;

	// Dependencies
	blockedByActivities: ActivityId[];
	blockedByQuestions: ResearchQuestionId[];

	// BOM relationships
	producesBOMItems: BOMItemId[];
	consumesBOMItems: BOMItemId[];

	// Timeline
	startMonth?: number;
	endMonth?: number;
	criticalPath: boolean;

	// Status
	status: ActivityStatus;
}

/**
 * Phase Entity with all related entities
 */
export interface PhaseEntity {
	id: PhaseId;
	number: number;
	title: string;
	description: string;
	status: 'planned' | 'in-progress' | 'completed';

	// Related entities
	bomItems: BOMItemId[];
	researchQuestions: ResearchQuestionId[];
	activities: ActivityId[];

	// Aggregated data
	totalCost: number;
	estimatedDuration: string;
	dependencies: PhaseId[];
}

// Type guards for branded IDs
export function isPhaseId(id: string): id is PhaseId {
	return /^phase-\d+$/.test(id);
}

export function isBOMItemId(id: string): id is BOMItemId {
	return /^bom-\d+-\d+$/.test(id);
}

export function isResearchQuestionId(id: string): id is ResearchQuestionId {
	return /^rq-\d+-\d+$/.test(id);
}

export function isActivityId(id: string): id is ActivityId {
	return /^act-\d+-\d+$/.test(id);
}

// ID creation helpers
export function createPhaseId(number: number): PhaseId {
	return `phase-${number}`;
}

export function createBOMItemId(phaseNumber: number, itemNumber: number): BOMItemId {
	return `bom-${phaseNumber}-${itemNumber}`;
}

export function createResearchQuestionId(phaseNumber: number, questionNumber: number): ResearchQuestionId {
	return `rq-${phaseNumber}-${questionNumber}`;
}

export function createActivityId(phaseNumber: number, activityNumber: number): ActivityId {
	return `act-${phaseNumber}-${activityNumber}`;
}

// ID parsing helpers
export function parsePhaseNumber(id: PhaseId): number {
	const match = id.match(/^phase-(\d+)$/);
	return match ? parseInt(match[1], 10) : -1;
}

export function parseBOMItemNumbers(id: BOMItemId): { phaseNumber: number; itemNumber: number } {
	const match = id.match(/^bom-(\d+)-(\d+)$/);
	return match
		? { phaseNumber: parseInt(match[1], 10), itemNumber: parseInt(match[2], 10) }
		: { phaseNumber: -1, itemNumber: -1 };
}
