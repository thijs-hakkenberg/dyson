/**
 * Entity Store for Project Dyson
 *
 * Central store providing Maps for each entity type and query functions
 * for cross-referencing between BOM Items, Research Questions, and Activities.
 */

import type {
	PhaseId,
	BOMItemId,
	ResearchQuestionId,
	ActivityId,
	BOMItemEntity,
	ResearchQuestionEntity,
	ActivityEntity,
	PhaseEntity
} from '$lib/types/entities';

// Entity stores
const phases = new Map<PhaseId, PhaseEntity>();
const bomItems = new Map<BOMItemId, BOMItemEntity>();
const researchQuestions = new Map<ResearchQuestionId, ResearchQuestionEntity>();
const activities = new Map<ActivityId, ActivityEntity>();

// Slug to ID index for BOM items
const bomSlugIndex = new Map<string, BOMItemId>();

// --- Registration Functions ---

export function registerPhase(phase: PhaseEntity): void {
	phases.set(phase.id, phase);
}

export function registerBOMItem(item: BOMItemEntity): void {
	bomItems.set(item.id, item);
	bomSlugIndex.set(item.slug, item.id);
}

export function registerResearchQuestion(question: ResearchQuestionEntity): void {
	researchQuestions.set(question.id, question);
}

export function registerActivity(activity: ActivityEntity): void {
	activities.set(activity.id, activity);
}

// --- Basic Getters ---

export function getPhase(id: PhaseId): PhaseEntity | undefined {
	return phases.get(id);
}

export function getBOMItem(id: BOMItemId): BOMItemEntity | undefined {
	return bomItems.get(id);
}

export function getBOMItemBySlug(slug: string): BOMItemEntity | undefined {
	const id = bomSlugIndex.get(slug);
	return id ? bomItems.get(id) : undefined;
}

export function getResearchQuestion(id: ResearchQuestionId): ResearchQuestionEntity | undefined {
	return researchQuestions.get(id);
}

export function getActivity(id: ActivityId): ActivityEntity | undefined {
	return activities.get(id);
}

// --- Query Functions ---

/**
 * Get all BOM items for a specific phase
 */
export function getBOMItemsForPhase(phaseId: PhaseId): BOMItemEntity[] {
	return Array.from(bomItems.values()).filter((item) => item.phaseId === phaseId);
}

/**
 * Get all research questions for a specific phase
 */
export function getResearchQuestionsForPhase(phaseId: PhaseId): ResearchQuestionEntity[] {
	return Array.from(researchQuestions.values()).filter((q) => q.phaseId === phaseId);
}

/**
 * Get all activities for a specific phase
 */
export function getActivitiesForPhase(phaseId: PhaseId): ActivityEntity[] {
	return Array.from(activities.values()).filter((a) => a.phaseId === phaseId);
}

/**
 * Get research questions related to a specific BOM item
 */
export function getResearchQuestionsForBOMItem(bomItemId: BOMItemId): ResearchQuestionEntity[] {
	return Array.from(researchQuestions.values()).filter((q) =>
		q.relatedBOMItems.includes(bomItemId)
	);
}

/**
 * Get activities related to a specific BOM item (produces or consumes)
 */
export function getActivitiesForBOMItem(bomItemId: BOMItemId): ActivityEntity[] {
	return Array.from(activities.values()).filter(
		(a) => a.producesBOMItems.includes(bomItemId) || a.consumesBOMItems.includes(bomItemId)
	);
}

/**
 * Get BOM items related to a research question
 */
export function getBOMItemsForResearchQuestion(questionId: ResearchQuestionId): BOMItemEntity[] {
	const question = researchQuestions.get(questionId);
	if (!question) return [];
	return question.relatedBOMItems.map((id) => bomItems.get(id)).filter(Boolean) as BOMItemEntity[];
}

/**
 * Get activities blocked by a research question
 */
export function getActivitiesBlockedByQuestion(
	questionId: ResearchQuestionId
): ActivityEntity[] {
	return Array.from(activities.values()).filter((a) =>
		a.blockedByQuestions.includes(questionId)
	);
}

/**
 * Get the full hierarchy for a BOM item (parents and children)
 */
export function getBOMItemHierarchy(itemId: BOMItemId): {
	item: BOMItemEntity;
	parent?: BOMItemEntity;
	children: BOMItemEntity[];
	ancestors: BOMItemEntity[];
	descendants: BOMItemEntity[];
} | null {
	const item = bomItems.get(itemId);
	if (!item) return null;

	const parent = item.parentId ? bomItems.get(item.parentId) : undefined;
	const children = item.childIds
		.map((id) => bomItems.get(id))
		.filter(Boolean) as BOMItemEntity[];

	// Get all ancestors
	const ancestors: BOMItemEntity[] = [];
	let currentParentId = item.parentId;
	while (currentParentId) {
		const ancestor = bomItems.get(currentParentId);
		if (ancestor) {
			ancestors.push(ancestor);
			currentParentId = ancestor.parentId;
		} else {
			break;
		}
	}

	// Get all descendants (recursive)
	const descendants: BOMItemEntity[] = [];
	function collectDescendants(ids: BOMItemId[]): void {
		for (const id of ids) {
			const child = bomItems.get(id);
			if (child) {
				descendants.push(child);
				collectDescendants(child.childIds);
			}
		}
	}
	collectDescendants(item.childIds);

	return { item, parent, children, ancestors, descendants };
}

/**
 * Get activities that are currently blocked
 */
export function getBlockedActivities(phaseId?: PhaseId): ActivityEntity[] {
	let activityList = Array.from(activities.values());
	if (phaseId) {
		activityList = activityList.filter((a) => a.phaseId === phaseId);
	}
	return activityList.filter((a) => a.status === 'blocked');
}

/**
 * Get open research questions that are blocking activities
 */
export function getBlockingResearchQuestions(phaseId?: PhaseId): ResearchQuestionEntity[] {
	let questionList = Array.from(researchQuestions.values());
	if (phaseId) {
		questionList = questionList.filter((q) => q.phaseId === phaseId);
	}
	return questionList.filter(
		(q) => q.status !== 'answered' && q.blocksActivities.length > 0
	);
}

/**
 * Get all phases
 */
export function getAllPhases(): PhaseEntity[] {
	return Array.from(phases.values()).sort((a, b) => a.number - b.number);
}

/**
 * Get all BOM items
 */
export function getAllBOMItems(): BOMItemEntity[] {
	return Array.from(bomItems.values());
}

/**
 * Get all research questions
 */
export function getAllResearchQuestions(): ResearchQuestionEntity[] {
	return Array.from(researchQuestions.values());
}

/**
 * Get all activities
 */
export function getAllActivities(): ActivityEntity[] {
	return Array.from(activities.values());
}

// --- Bulk Operations ---

export function clearAll(): void {
	phases.clear();
	bomItems.clear();
	researchQuestions.clear();
	activities.clear();
	bomSlugIndex.clear();
}

export function bulkRegisterBOMItems(items: BOMItemEntity[]): void {
	for (const item of items) {
		registerBOMItem(item);
	}
}

export function bulkRegisterResearchQuestions(questions: ResearchQuestionEntity[]): void {
	for (const question of questions) {
		registerResearchQuestion(question);
	}
}

export function bulkRegisterActivities(activityList: ActivityEntity[]): void {
	for (const activity of activityList) {
		registerActivity(activity);
	}
}

// --- Statistics ---

export function getPhaseStatistics(phaseId: PhaseId): {
	bomItemCount: number;
	researchQuestionCount: number;
	activityCount: number;
	openQuestions: number;
	blockedActivities: number;
	totalCost: number;
} {
	const phaseBomItems = getBOMItemsForPhase(phaseId);
	const phaseQuestions = getResearchQuestionsForPhase(phaseId);
	const phaseActivities = getActivitiesForPhase(phaseId);

	return {
		bomItemCount: phaseBomItems.length,
		researchQuestionCount: phaseQuestions.length,
		activityCount: phaseActivities.length,
		openQuestions: phaseQuestions.filter((q) => q.status === 'open').length,
		blockedActivities: phaseActivities.filter((a) => a.status === 'blocked').length,
		totalCost: phaseBomItems.reduce((sum, item) => sum + item.totalCost, 0)
	};
}
