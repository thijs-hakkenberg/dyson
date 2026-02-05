import matter from 'gray-matter';

export interface LLMOpinionFrontmatter {
	model: string;
	model_version: string;
	phase: number;
	phase_title: string;
	generated_date: string;
	type: 'plan' | 'review' | 'consensus';
	reviewed_model: string | null;
	total_cost_estimate?: number;
	confidence_interval?: string;
	models_consulted?: string[];
	consensus_cost_estimate?: number;
	consensus_cost_range_low?: number;
	consensus_cost_range_high?: number;
	consensus_duration_years?: number;
}

export interface LLMOpinion {
	frontmatter: LLMOpinionFrontmatter;
	content: string;
	modelName: string;
}

export interface LLMReview {
	reviewer: string;
	reviewedModel: string;
	frontmatter: LLMOpinionFrontmatter;
	content: string;
}

export interface PhaseConsensus {
	phaseId: string;
	phaseTitle: string;
	opinions: LLMOpinion[];
	reviews: LLMReview[];
	consensus: LLMOpinion | null;
	costEstimates: {
		model: string;
		estimate: number;
		range?: { low: number; high: number };
	}[];
	keyAgreements: string[];
	keyDisagreements: string[];
}

// Model display names
const MODEL_NAMES: Record<string, string> = {
	'gemini-3-pro': 'Gemini 3 Pro',
	'gpt-5-2': 'GPT-5.2',
	'claude-opus-4-6': 'Claude Opus 4.6'
};

/**
 * Get the display name for a model ID
 */
export function getModelDisplayName(modelId: string): string {
	return MODEL_NAMES[modelId] || modelId;
}

/**
 * Parse markdown content with frontmatter
 */
export function parseMarkdownWithFrontmatter(content: string): {
	frontmatter: LLMOpinionFrontmatter;
	content: string;
} {
	const { data, content: markdownContent } = matter(content);
	return {
		frontmatter: data as LLMOpinionFrontmatter,
		content: markdownContent
	};
}

/**
 * Format currency for display
 */
export function formatCostEstimate(amount: number): string {
	if (amount >= 1e12) {
		return `$${(amount / 1e12).toFixed(2)}T`;
	} else if (amount >= 1e9) {
		return `$${(amount / 1e9).toFixed(1)}B`;
	} else if (amount >= 1e6) {
		return `$${(amount / 1e6).toFixed(0)}M`;
	}
	return `$${amount.toLocaleString()}`;
}

/**
 * Static data for Phase 0 opinions (loaded at build time or fetched client-side)
 * In a full implementation, these would be fetched from the static files
 */
export const PHASE_0_SUMMARY = {
	phaseId: 'phase-0',
	phaseTitle: 'Space Resource Processing',
	models: ['gemini-3-pro', 'gpt-5-2'],
	costEstimates: [
		{ model: 'Gemini 3 Pro', estimate: 5_400_000_000, confidence: '±40%' },
		{ model: 'GPT-5.2', estimate: 9_500_000_000, confidence: '±35%' }
	],
	consensusCost: {
		estimate: 7_500_000_000,
		range: { low: 5_400_000_000, high: 14_500_000_000 }
	},
	consensusDuration: '10 years',
	keyAgreements: [
		'ISRU (In-Situ Resource Utilization) as foundational strategy',
		'Prioritize water/propellant extraction over metals initially',
		'Target boulder-scale (1,000-10,000 ton) objects first',
		'Use Solar Electric Propulsion for capture tugs',
		'Process in cislunar space, not LEO',
		'Critical need for dust mitigation systems'
	],
	keyDisagreements: [
		'Optimal cislunar location (L5 vs NRHO/DRO)',
		'Whether to include metals processing in Phase 0',
		'Nuclear backup power necessity',
		'Specific target mass range',
		'Timeline feasibility (7 years vs 10-12 years)'
	],
	openQuestions: [
		'Anchoring mechanics on rubble-pile bodies',
		'Microgravity material separation efficiency',
		'Long-term autonomous operations reliability',
		'Regulatory framework for asteroid manipulation',
		'Dust behavior in cislunar plasma environment'
	]
};

export const PHASE_1_SUMMARY = {
	phaseId: 'phase-1',
	phaseTitle: 'Structural Closure',
	models: ['gemini-3-pro', 'gpt-5-2'],
	costEstimates: [
		{ model: 'Gemini 3 Pro', estimate: 45_000_000_000, confidence: '±50%' },
		{ model: 'GPT-5.2', estimate: 85_000_000_000, confidence: '±40%' }
	],
	consensusCost: {
		estimate: 65_000_000_000,
		range: { low: 45_000_000_000, high: 125_000_000_000 }
	},
	consensusDuration: '15-20 years',
	keyAgreements: [
		'Depends critically on Phase 0 success',
		'Self-replicating manufacturing is essential',
		'Modular, serviceable design required',
		'Multiple parallel production lines needed'
	],
	keyDisagreements: [
		'Scale of initial collector production',
		'Centralized vs distributed manufacturing',
		'Human involvement level'
	],
	openQuestions: [
		'In-space manufacturing quality control',
		'Swarm coordination algorithms',
		'Power transmission technology selection'
	]
};

/**
 * Get phase summary by ID
 */
export function getPhaseSummary(phaseId: string) {
	if (phaseId === 'phase-0') return PHASE_0_SUMMARY;
	if (phaseId === 'phase-1') return PHASE_1_SUMMARY;
	return null;
}
