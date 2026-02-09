// LLM Types
export interface LLMModel {
	id: string;
	name: string;
	description: string;
	endpoint: string;
}

export interface LLMMessage {
	role: 'user' | 'assistant' | 'system';
	content: string;
}

export interface LLMRequest {
	messages: LLMMessage[];
	model: string;
	max_tokens?: number;
	temperature?: number;
}

export interface LLMResponse {
	model: string;
	content: string;
	timestamp: Date;
	error?: string;
	loading?: boolean;
}

export interface LLMCouncilQuery {
	query: string;
	responses: Record<string, LLMResponse>;
	timestamp: Date;
}

// Cost Confidence Types
export type CostConfidenceLevel = 'low' | 'medium' | 'high';

// Phase Types
/**
 * Material alternative research reference
 */
export interface MaterialAlternative {
	name: string;
	arxivId?: string;
	benefit: string;
	tradeoff?: string;
}

export interface BOMItem {
	id: string;
	name: string;
	description: string;
	quantity: number;
	unit: string;
	unitCost: number;
	totalCost: number;
	category: string;
	notes?: string;
	slug?: string;
	costMin?: number;
	costMax?: number;
	costConfidence?: CostConfidenceLevel;
	costBasis?: string;
	materialAlternatives?: MaterialAlternative[];
}

export interface Phase {
	id: string;
	number: number;
	title: string;
	description: string;
	status: 'planned' | 'in-progress' | 'completed';
	objectives: string[];
	bom: BOMItem[];
	totalCost: number;
	estimatedDuration: string;
	dependencies: string[];
	relatedResearch: string[];
	suffix?: string; // 'a', 'b' for parallel phases (e.g., Phase 3a, Phase 3b)
	parallelWith?: string[]; // IDs of phases that run concurrently
}

// arXiv Types
export interface ArxivPaper {
	id: string;
	title: string;
	authors: string[];
	summary: string;
	published: Date;
	updated: Date;
	categories: string[];
	pdfUrl: string;
	arxivUrl: string;
}

export interface ArxivSearchParams {
	query: string;
	categories?: string[];
	maxResults?: number;
	sortBy?: 'relevance' | 'lastUpdatedDate' | 'submittedDate';
	sortOrder?: 'ascending' | 'descending';
}

export interface ArxivSearchResult {
	papers: ArxivPaper[];
	totalResults: number;
	startIndex: number;
}

// Blog Types
export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	author: string;
	date: Date;
	tags: string[];
	category: string;
	content: string;
	relatedPhases?: string[];
}

// Funding Types
export interface FundingCampaign {
	id: string;
	title: string;
	description: string;
	goal: number;
	raised: number;
	startDate: Date;
	endDate?: Date;
	status: 'active' | 'completed' | 'upcoming';
	relatedPhases: string[];
	rewards?: FundingReward[];
}

export interface FundingReward {
	id: string;
	title: string;
	description: string;
	minAmount: number;
}

// Navigation Types
export interface NavItem {
	label: string;
	href: string;
	children?: NavItem[];
}

// Team Types
export interface TeamMember {
	id: string;
	name: string;
	role: string;
	bio: string;
	avatar?: string;
	links?: {
		github?: string;
		twitter?: string;
		linkedin?: string;
	};
}

// Divergent Views Types (re-export)
export type { ModelName, DivergentPosition, DivergentViewTopic, DivergentViewsData, DivergentViewPriority } from './divergent-views';
import type { DivergentViewsData } from './divergent-views';

// BOM Item Specification Types
export interface BOMItemSpec {
	bomId: string;
	phaseId: string;
	itemSlug: string;
	itemName: string;
	specs: {
		modelId: string;
		modelName: string;
		content: string;
		generatedDate: string;
	}[];
	consensus: {
		keySpecs: string[];
		divergentViews: string[];
		openQuestions: string[];
		recommendedApproach: string;
	};
	divergentViewsData: DivergentViewsData | null;
}

// Timeline/DAG Types
export interface TimelineNode {
	id: string;
	name: string;
	type: 'milestone' | 'activity' | 'decision';
	startMonth: number;
	endMonth: number;
	dependencies: string[];
	status: 'pending' | 'in-progress' | 'completed';
	criticalPath: boolean;
	linkTo?: string;
}

export interface PhaseDependencyGraph {
	phaseId: string;
	nodes: TimelineNode[];
	criticalPathDuration: number;
}

// Cost Analysis Types (re-export)
export type {
	CostLineItem,
	ModelCostBreakdown,
	ModelCostComparison,
	Discrepancy,
	ReconciliationSummary,
	ReconciliationReport,
	ExtractedCosts
} from './cost-analysis';
