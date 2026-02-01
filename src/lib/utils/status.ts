/**
 * Status Colors and Labels
 *
 * Consolidated status color schemes used across multiple components:
 * - PhaseCard.svelte
 * - CampaignCard.svelte
 * - PhaseDAG.svelte
 * - PhaseTimeline.svelte
 */

// Phase status types
export type PhaseStatus = 'planned' | 'in-progress' | 'completed';

// Campaign status types
export type CampaignStatus = 'active' | 'completed' | 'upcoming';

// Activity/Node status types
export type ActivityStatus = 'pending' | 'in-progress' | 'completed';

// Research question status types
export type ResearchQuestionStatus = 'open' | 'investigating' | 'answered' | 'deferred';

// Priority types
export type Priority = 'critical' | 'high' | 'medium' | 'low';

// --- Phase Status Colors ---

export const phaseStatusColors: Record<PhaseStatus, string> = {
	planned: 'bg-space-600 text-star-dim',
	'in-progress': 'bg-cosmic-blue/20 text-cosmic-cyan',
	completed: 'bg-green-500/20 text-green-400'
};

export const phaseStatusLabels: Record<PhaseStatus, string> = {
	planned: 'Planned',
	'in-progress': 'In Progress',
	completed: 'Completed'
};

// --- Campaign Status Colors ---

export const campaignStatusColors: Record<CampaignStatus, string> = {
	active: 'bg-green-500/20 text-green-400',
	completed: 'bg-cosmic-blue/20 text-cosmic-cyan',
	upcoming: 'bg-sun-gold/20 text-sun-gold'
};

export const campaignStatusLabels: Record<CampaignStatus, string> = {
	active: 'Active',
	completed: 'Completed',
	upcoming: 'Upcoming'
};

// --- Activity/Node Status Colors ---

export const activityStatusColors: Record<ActivityStatus, string> = {
	pending: 'bg-space-600 border-space-500',
	'in-progress': 'bg-cosmic-blue/20 border-cosmic-cyan',
	completed: 'bg-green-500/20 border-green-400'
};

export const activityStatusTextColors: Record<ActivityStatus, string> = {
	pending: 'text-star-faint',
	'in-progress': 'text-cosmic-cyan',
	completed: 'text-green-400'
};

// --- Timeline Status Colors (for PhaseTimeline) ---

export const timelineStatusColors: Record<PhaseStatus, string> = {
	planned: 'border-space-500 bg-space-700',
	'in-progress': 'border-cosmic-cyan bg-cosmic-blue/20',
	completed: 'border-green-400 bg-green-500/20'
};

// --- Research Question Status Colors ---

export const researchQuestionStatusColors: Record<ResearchQuestionStatus, string> = {
	open: 'bg-purple-500/20 text-purple-400',
	investigating: 'bg-cosmic-blue/20 text-cosmic-cyan',
	answered: 'bg-green-500/20 text-green-400',
	deferred: 'bg-space-600 text-star-dim'
};

export const researchQuestionStatusLabels: Record<ResearchQuestionStatus, string> = {
	open: 'Open',
	investigating: 'Investigating',
	answered: 'Answered',
	deferred: 'Deferred'
};

// --- Priority Colors ---

export const priorityColors: Record<Priority, string> = {
	critical: 'bg-red-500/20 text-red-400',
	high: 'bg-orange-500/20 text-orange-400',
	medium: 'bg-sun-gold/20 text-sun-gold',
	low: 'bg-space-600 text-star-dim'
};

export const priorityLabels: Record<Priority, string> = {
	critical: 'Critical',
	high: 'High',
	medium: 'Medium',
	low: 'Low'
};

// --- LLM Model Colors ---

export type LLMModel = 'Claude' | 'Gemini' | 'GPT';

export interface ModelColorScheme {
	bg: string;
	text: string;
	border: string;
}

export const modelColors: Record<LLMModel, ModelColorScheme> = {
	Claude: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
	Gemini: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
	GPT: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' }
};

/**
 * Shared/consensus color scheme for when multiple models agree
 * Uses a neutral slate color that doesn't belong to any specific model
 */
export const sharedConsensusColor: ModelColorScheme = {
	bg: 'bg-slate-500/20',
	text: 'text-slate-300',
	border: 'border-slate-500/30'
};

/**
 * Get model color scheme by model name
 * Handles partial matches (e.g., "Claude Opus 4.5" matches "Claude")
 */
export function getModelColor(modelName: string): ModelColorScheme {
	for (const [key, value] of Object.entries(modelColors)) {
		if (modelName.includes(key)) return value;
	}
	return { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' };
}

/**
 * Get color scheme for a position box
 * - Single model: use that model's color
 * - Multiple models (shared): use neutral consensus color
 */
export function getPositionBoxColor(models: string[], isShared: boolean): ModelColorScheme {
	if (isShared) {
		return sharedConsensusColor;
	}
	// Single model - use their color
	return models.length > 0 ? getModelColor(models[0]) : sharedConsensusColor;
}

// --- Category Colors (for BOM items) ---

export const categoryColors: Record<string, string> = {
	Spacecraft: 'bg-cosmic-blue/20 text-cosmic-cyan',
	Robotics: 'bg-cosmic-purple/20 text-cosmic-purple',
	Infrastructure: 'bg-sun-gold/20 text-sun-gold',
	'Power Systems': 'bg-green-500/20 text-green-400',
	Communications: 'bg-blue-500/20 text-blue-400'
};

/**
 * Get category color classes
 */
export function getCategoryColor(category: string): string {
	return categoryColors[category] || 'bg-space-600 text-star-dim';
}
