#!/usr/bin/env node

/**
 * Script to query LLMs for detailed Phase 0 and Phase 1 BOMs
 * and generate cross-reviews between models.
 */

import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, '../static/content/llm-opinions');

// Configuration
const DATABRICKS_TOKEN = process.env.DATABRICKS_TOKEN;
const DATABRICKS_WORKSPACE = process.env.DATABRICKS_WORKSPACE || 'https://adb-6239133969168510.10.azuredatabricks.net';

const MODELS = {
	'gemini-3-pro': {
		endpoint: '/serving-endpoints/databricks-gemini-3-pro/invocations',
		name: 'Gemini 3 Pro',
		version: 'databricks-gemini-3-pro'
	},
	'gpt-5-2': {
		endpoint: '/serving-endpoints/databricks-gpt-5-2/invocations',
		name: 'GPT-5.2',
		version: 'databricks-gpt-5-2'
	}
};

const PHASES = {
	0: {
		title: 'Space Resource Processing',
		description: 'Initial asteroid capture, processing infrastructure, and material extraction'
	},
	1: {
		title: 'Structural Closure',
		description: 'Assembly of first Dyson swarm segments and structural framework'
	}
};

function getPromptTemplate(phase) {
	return `You are an expert space engineering consultant for Project Dyson, a non-profit planning the construction of a Dyson swarm.

Provide a DETAILED Phase ${phase} plan (${PHASES[phase].title}: ${PHASES[phase].description}) including:

1. **Executive Summary** (2-3 paragraphs on approach and key decisions)

2. **Bill of Materials** - Detailed table with:
   - Item name and description
   - Quantity and units
   - Unit cost (USD, with justification)
   - Total cost
   - Category (Spacecraft, Robotics, Infrastructure, Power Systems, etc.)
   - Risk level (Low/Medium/High)
   - Technology readiness level (1-9)

3. **Cost Breakdown**
   - Total estimated cost with confidence interval
   - Cost by category
   - Major cost drivers
   - Cost reduction opportunities

4. **Timeline & Dependencies**
   - Estimated duration with milestones
   - Critical path items
   - Dependencies on other phases
   - Parallel workstreams

5. **Technical Challenges**
   - Top 5 engineering challenges
   - Proposed solutions or research needed
   - Risk mitigation strategies

6. **Research Requirements**
   - Key scientific questions to resolve
   - Recommended studies/experiments
   - Technology demonstrations needed

Be specific with numbers, cite assumptions, and explain your reasoning.`;
}

function getReviewPrompt(phase, otherModelName, otherModelContent) {
	return `Review the following Phase ${phase} plan (${PHASES[phase].title}) from ${otherModelName}.

Provide:
1. **Strengths** of this approach
2. **Weaknesses or gaps**
3. **Alternative suggestions**
4. **Cost estimate validation** (agree/disagree with reasoning)
5. **Timeline assessment**
6. **Overall rating** (1-10) with justification

---

**Plan to Review:**

${otherModelContent}`;
}

async function queryModel(modelId, prompt, maxTokens = 16000) {
	const model = MODELS[modelId];
	const url = `${DATABRICKS_WORKSPACE}${model.endpoint}`;

	console.log(`Querying ${model.name}...`);

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				messages: [
					{ role: 'user', content: prompt }
				],
				max_tokens: maxTokens,
				temperature: 0.7
			})
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`API error: ${response.status} - ${errorText}`);
		}

		const data = await response.json();

		// Debug: log raw response structure
		console.log(`  Raw response keys: ${Object.keys(data).join(', ')}`);

		// Extract content from response - handle various formats
		let content = '';
		if (data.choices && data.choices[0]) {
			const choice = data.choices[0];
			const messageContent = choice.message?.content;

			if (messageContent) {
				// Handle Gemini's array format: [{type: "text", text: "..."}]
				if (Array.isArray(messageContent)) {
					content = messageContent
						.filter(c => c.type === 'text' || c.text)
						.map(c => c.text || '')
						.join('');
				} else if (typeof messageContent === 'string') {
					content = messageContent;
				} else if (typeof messageContent === 'object') {
					content = messageContent.text || JSON.stringify(messageContent);
				}
			} else if (choice.text) {
				content = choice.text;
			} else if (choice.delta?.content) {
				content = choice.delta.content;
			}
		} else if (data.content) {
			if (Array.isArray(data.content)) {
				content = data.content.map(c => {
					if (typeof c === 'string') return c;
					if (c.text) return c.text;
					if (c.content) return c.content;
					return JSON.stringify(c);
				}).join('');
			} else if (typeof data.content === 'string') {
				content = data.content;
			} else if (typeof data.content === 'object') {
				content = data.content.text || data.content.content || JSON.stringify(data.content);
			}
		} else if (data.output) {
			content = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
		} else if (data.result) {
			content = typeof data.result === 'string' ? data.result : JSON.stringify(data.result);
		} else if (data.response) {
			content = typeof data.response === 'string' ? data.response : JSON.stringify(data.response);
		} else if (typeof data === 'string') {
			content = data;
		}

		// If we still have an object, stringify it for debugging
		if (typeof content === 'object') {
			console.log(`  Warning: content is still an object:`, JSON.stringify(content).slice(0, 200));
			content = JSON.stringify(content, null, 2);
		}

		console.log(`  ✓ Received ${content.length} characters from ${model.name}`);
		return content;
	} catch (error) {
		console.error(`  ✗ Error querying ${model.name}:`, error.message);
		throw error;
	}
}

function generateFrontmatter(modelId, phase, type, reviewedModel = null, totalCost = null) {
	const model = MODELS[modelId] || { name: modelId, version: modelId };
	const date = new Date().toISOString().split('T')[0];

	let frontmatter = `---
model: "${modelId}"
model_version: "${model.version}"
phase: ${phase}
phase_title: "${PHASES[phase].title}"
generated_date: "${date}"
type: "${type}"`;

	if (reviewedModel) {
		frontmatter += `
reviewed_model: "${reviewedModel}"`;
	} else {
		frontmatter += `
reviewed_model: null`;
	}

	if (totalCost) {
		frontmatter += `
total_cost_estimate: ${totalCost}
confidence_interval: "±30%"`;
	}

	frontmatter += `
---

`;
	return frontmatter;
}

function saveMarkdown(filepath, frontmatter, content) {
	const fullContent = frontmatter + content;
	writeFileSync(filepath, fullContent);
	console.log(`  → Saved to ${filepath}`);
}

async function main() {
	console.log('='.repeat(60));
	console.log('Project Dyson - LLM Consensus Workflow');
	console.log('='.repeat(60));
	console.log();

	const results = {};

	// Phase 1: Query each model for each phase
	console.log('PHASE 1: Generating detailed BOMs');
	console.log('-'.repeat(40));

	for (const phase of [0, 1]) {
		results[phase] = {};
		console.log(`\nPhase ${phase}: ${PHASES[phase].title}`);

		for (const modelId of Object.keys(MODELS)) {
			const prompt = getPromptTemplate(phase);

			try {
				const content = await queryModel(modelId, prompt);
				results[phase][modelId] = content;

				const frontmatter = generateFrontmatter(modelId, phase, 'plan');
				const filepath = join(OUTPUT_DIR, `phase-${phase}`, `${modelId}.md`);
				saveMarkdown(filepath, frontmatter, content);
			} catch (error) {
				console.error(`Failed to get response from ${modelId} for phase ${phase}`);
				results[phase][modelId] = null;
			}
		}
	}

	// Phase 2: Cross-reviews
	console.log('\n');
	console.log('PHASE 2: Generating cross-reviews');
	console.log('-'.repeat(40));

	// Load Claude's existing content if available
	const claudeContent = {};
	for (const phase of [0, 1]) {
		const claudePath = join(OUTPUT_DIR, `phase-${phase}`, 'claude-opus-4-5.md');
		if (existsSync(claudePath)) {
			claudeContent[phase] = readFileSync(claudePath, 'utf-8');
			console.log(`Loaded Claude content for phase ${phase}`);
		}
	}

	for (const phase of [0, 1]) {
		console.log(`\nPhase ${phase} reviews:`);

		const modelsToReview = Object.keys(MODELS);

		// Add Claude if content exists
		if (claudeContent[phase]) {
			modelsToReview.push('claude-opus-4-5');
		}

		for (const reviewerModelId of Object.keys(MODELS)) {
			for (const reviewedModelId of modelsToReview) {
				// Don't have a model review itself
				if (reviewerModelId === reviewedModelId) continue;

				let contentToReview;
				let reviewedModelName;

				if (reviewedModelId === 'claude-opus-4-5') {
					contentToReview = claudeContent[phase];
					reviewedModelName = 'Claude Opus 4.5';
				} else {
					contentToReview = results[phase][reviewedModelId];
					reviewedModelName = MODELS[reviewedModelId].name;
				}

				if (!contentToReview) {
					console.log(`  Skipping ${reviewerModelId} → ${reviewedModelId} (no content)`);
					continue;
				}

				console.log(`  ${MODELS[reviewerModelId].name} reviewing ${reviewedModelName}...`);

				try {
					const reviewPrompt = getReviewPrompt(phase, reviewedModelName, contentToReview);
					const reviewContent = await queryModel(reviewerModelId, reviewPrompt, 4096);

					const frontmatter = generateFrontmatter(reviewerModelId, phase, 'review', reviewedModelId);
					const filename = `${reviewerModelId}-reviews-${reviewedModelId.replace(/-/g, '-')}.md`;
					const filepath = join(OUTPUT_DIR, `phase-${phase}`, 'reviews', filename);
					saveMarkdown(filepath, frontmatter, reviewContent);
				} catch (error) {
					console.error(`  Failed: ${MODELS[reviewerModelId].name} → ${reviewedModelName}`);
				}
			}
		}
	}

	console.log('\n');
	console.log('='.repeat(60));
	console.log('LLM query workflow complete!');
	console.log('='.repeat(60));
}

main().catch(console.error);
