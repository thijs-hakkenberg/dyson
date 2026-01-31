import type { LLMMessage, LLMResponse } from '$lib/types';

export interface DatabricksModel {
	id: string;
	name: string;
	description: string;
}

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
		id: 'databricks-claude-opus-4-5',
		name: 'Claude Opus 4.5',
		description: 'Anthropic\'s most capable model'
	}
];

export interface QueryOptions {
	maxTokens?: number;
	temperature?: number;
	systemPrompt?: string;
}

const DEFAULT_SYSTEM_PROMPT = `You are an expert consultant for Project Dyson, a non-profit organization planning the construction of a Dyson swarm.
Your role is to provide detailed, technical analysis on topics including:
- Space engineering and megastructure construction
- Solar energy harvesting and transmission
- Asteroid mining and in-situ resource utilization
- Materials science for space applications
- Orbital mechanics and station-keeping
- Economic analysis of space projects

Be thorough, cite relevant research when possible, and highlight both opportunities and challenges.`;

/**
 * Client-side function to query LLM via API route
 * This keeps the API token secure on the server
 */
export async function queryLLM(
	model: string,
	messages: LLMMessage[],
	options: QueryOptions = {}
): Promise<LLMResponse> {
	const startTime = Date.now();

	try {
		const response = await fetch('/api/llm', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model,
				messages: [
					{
						role: 'system',
						content: options.systemPrompt || DEFAULT_SYSTEM_PROMPT
					},
					...messages
				],
				max_tokens: options.maxTokens || 2048,
				temperature: options.temperature || 0.7
			})
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`API error: ${response.status} - ${errorText}`);
		}

		const data = await response.json();

		return {
			model,
			content: data.content,
			timestamp: new Date()
		};
	} catch (error) {
		return {
			model,
			content: '',
			timestamp: new Date(),
			error: error instanceof Error ? error.message : 'Unknown error occurred'
		};
	}
}

/**
 * Query multiple models in parallel
 */
export async function queryAllModels(
	query: string,
	options: QueryOptions = {}
): Promise<Record<string, LLMResponse>> {
	const messages: LLMMessage[] = [{ role: 'user', content: query }];

	const results = await Promise.all(
		MODELS.map(async (model) => {
			const response = await queryLLM(model.id, messages, options);
			return [model.id, response] as const;
		})
	);

	return Object.fromEntries(results);
}

/**
 * Get model info by ID
 */
export function getModelInfo(modelId: string): DatabricksModel | undefined {
	return MODELS.find((m) => m.id === modelId);
}
