/**
 * Databricks LLM Integration
 *
 * This module provides types and constants for Databricks model integration.
 * The actual API calls should be made from server-side code.
 */

export interface DatabricksModel {
	id: string;
	name: string;
	description: string;
}

/**
 * Available models on Databricks
 */
export const MODELS: DatabricksModel[] = [
	{
		id: 'databricks-gemini-3-pro',
		name: 'Gemini 3 Pro',
		description: 'Google\'s advanced reasoning model'
	},
	{
		id: 'databricks-gpt-5-2',
		name: 'GPT-5.2',
		description: 'OpenAI\'s latest generation model'
	},
	{
		id: 'databricks-claude-opus-4-6',
		name: 'Claude Opus 4.6',
		description: 'Anthropic\'s most capable model'
	}
];

/**
 * Query options for LLM requests
 */
export interface QueryOptions {
	maxTokens?: number;
	temperature?: number;
	systemPrompt?: string;
}

/**
 * Default system prompt for Project Dyson queries
 */
export const DEFAULT_SYSTEM_PROMPT = `You are an expert consultant for Project Dyson, a non-profit organization planning the construction of a Dyson swarm.
Your role is to provide detailed, technical analysis on topics including:
- Space engineering and megastructure construction
- Solar energy harvesting and transmission
- Asteroid mining and in-situ resource utilization
- Materials science for space applications
- Orbital mechanics and station-keeping
- Economic analysis of space projects

Be thorough, cite relevant research when possible, and highlight both opportunities and challenges.`;
