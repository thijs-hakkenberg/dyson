#!/usr/bin/env node

/**
 * Run LLM Discussion for Research Questions
 *
 * This script orchestrates multi-model discussions where Claude 4.6, Gemini 3 Pro,
 * and GPT-5.2 collaboratively respond to research questions, vote on responses,
 * and iterate until consensus or termination.
 *
 * Usage:
 *   # Start/continue a discussion
 *   node scripts/run-discussion.js --question=swarm-power-architecture-end-use
 *
 *   # Run single round only
 *   node scripts/run-discussion.js --question=swarm-power-architecture-end-use --round=1
 *
 *   # Run until termination (auto mode)
 *   node scripts/run-discussion.js --question=swarm-power-architecture-end-use --auto
 *
 *   # Force conclude and generate summary
 *   node scripts/run-discussion.js --question=swarm-power-architecture-end-use --conclude
 *
 * Environment variables:
 *   DATABRICKS_TOKEN - API token for Databricks
 *   DATABRICKS_HOST - Databricks host URL (optional, has default)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Configuration
const DATABRICKS_HOST = process.env.DATABRICKS_HOST || process.env.DATABRICKS_WORKSPACE || 'https://adb-6239133969168510.10.azuredatabricks.net';
const DATABRICKS_TOKEN = process.env.DATABRICKS_TOKEN;

// Model configurations (reused from query-bom-specs.js)
const MODELS = {
	'claude-opus-4-6': {
		id: 'databricks-claude-opus-4-6',
		name: 'Claude Opus 4.6',
		filename: 'claude-opus-4-6.md',
		endpoint: '/serving-endpoints/databricks-claude-opus-4-6/invocations'
	},
	'gemini-3-pro': {
		id: 'databricks-gemini-3-pro',
		name: 'Gemini 3 Pro',
		filename: 'gemini-3-pro.md',
		endpoint: '/serving-endpoints/databricks-gemini-3-pro/invocations'
	},
	'gpt-5-2': {
		id: 'databricks-gpt-5-2',
		name: 'GPT-5.2',
		filename: 'gpt-5-2.md',
		endpoint: '/serving-endpoints/databricks-gpt-5-2/invocations'
	}
};

const DISCUSSION_MODELS = ['claude-opus-4-6', 'gemini-3-pro', 'gpt-5-2'];

// Default discussion configuration
const DEFAULT_CONFIG = {
	maxRounds: 5,
	maxResponseWords: 2000,
	allowSelfVoting: true,
	selfVoteWeight: 0.5,
	unanimousTermination: true,
	consecutiveConcludeRounds: 2
};

// Vote scoring
const VOTE_SCORES = {
	APPROVE: 2,
	NEUTRAL: 1,
	REJECT: 0
};

/**
 * Query Databricks LLM API
 */
async function queryDatabricks(modelKey, prompt, options = {}) {
	if (!DATABRICKS_TOKEN) {
		throw new Error('DATABRICKS_TOKEN environment variable is required');
	}

	const { maxTokens = 16000, systemPrompt } = options;
	const model = MODELS[modelKey];
	const endpoint = `${DATABRICKS_HOST}${model.endpoint}`;

	const messages = [];
	if (systemPrompt) {
		messages.push({ role: 'system', content: systemPrompt });
	}
	messages.push({ role: 'user', content: prompt });

	try {
		const response = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				messages,
				max_tokens: maxTokens,
				temperature: 0.7
			})
		});

		if (!response.ok) {
			const error = await response.text();
			throw new Error(`API error: ${response.status} - ${error}`);
		}

		const data = await response.json();
		const content = data.choices?.[0]?.message?.content;

		// Handle Gemini's array format where content is [{type: 'text', text: '...'}]
		if (Array.isArray(content)) {
			const textContent = content.find(c => c.type === 'text');
			return textContent?.text || null;
		}

		return content || data.content;
	} catch (error) {
		console.error(`Error querying ${model.name}:`, error.message);
		return null;
	}
}

/**
 * Load research question from markdown file
 */
async function loadQuestion(slug) {
	const phases = ['phase-0', 'phase-1', 'phase-2'];

	for (const phase of phases) {
		const dir = path.join(PROJECT_ROOT, 'static/content/research-questions', phase);
		try {
			const files = await fs.readdir(dir);
			const matchingFile = files.find(f => f.endsWith(`-${slug}.md`) || f.includes(slug));

			if (matchingFile) {
				const filePath = path.join(dir, matchingFile);
				const content = await fs.readFile(filePath, 'utf-8');

				// Parse frontmatter
				const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
				if (!frontmatterMatch) {
					throw new Error('Invalid question file format');
				}

				const frontmatter = yaml.load(frontmatterMatch[1]);
				const body = frontmatterMatch[2];

				return {
					id: frontmatter.questionId,
					slug: frontmatter.slug,
					title: frontmatter.title,
					questionType: frontmatter.questionType,
					priority: frontmatter.priority,
					status: frontmatter.status,
					sourcePhaseId: frontmatter.sourcePhase,
					sourceBOMItemId: frontmatter.sourceBOMItemId,
					sourceBOMItemSlug: frontmatter.sourceBOMItemSlug,
					sourceBOMItemName: frontmatter.sourceBOMItemName,
					tags: frontmatter.tags || [],
					context: body.trim()
				};
			}
		} catch (error) {
			if (error.code !== 'ENOENT') {
				// Continue searching other phases
			}
		}
	}

	return null;
}

/**
 * Get discussion directory path
 */
function getDiscussionDir(question) {
	return path.join(
		PROJECT_ROOT,
		'static/content/research-questions',
		question.sourcePhaseId,
		`${question.id}-${question.slug}`
	);
}

/**
 * Load existing discussion thread
 */
async function loadDiscussionThread(question) {
	const discussionDir = getDiscussionDir(question);
	const metaPath = path.join(discussionDir, 'discussion.yaml');

	try {
		const content = await fs.readFile(metaPath, 'utf-8');
		return yaml.load(content);
	} catch {
		return null;
	}
}

/**
 * Save discussion thread metadata
 */
async function saveDiscussionThread(question, thread) {
	const discussionDir = getDiscussionDir(question);
	await fs.mkdir(discussionDir, { recursive: true });

	const metaPath = path.join(discussionDir, 'discussion.yaml');
	const yamlContent = yaml.dump(thread, { lineWidth: -1, noRefs: true });
	await fs.writeFile(metaPath, yamlContent, 'utf-8');
	console.log(`  Saved discussion metadata: ${metaPath}`);
}

/**
 * Save round response
 */
async function saveRoundResponse(question, roundNumber, modelKey, content) {
	const discussionDir = getDiscussionDir(question);
	const roundDir = path.join(discussionDir, `round-${roundNumber}`);
	await fs.mkdir(roundDir, { recursive: true });

	const model = MODELS[modelKey];
	const filePath = path.join(roundDir, model.filename);

	const date = new Date().toISOString().split('T')[0];
	const frontmatter = `---
questionId: "${question.id}"
questionSlug: "${question.slug}"
modelId: "${modelKey}"
modelName: "${model.name}"
roundNumber: ${roundNumber}
generated: "${date}"
type: "discussion-response"
---

`;

	await fs.writeFile(filePath, frontmatter + content, 'utf-8');
	console.log(`    Saved response: ${filePath}`);
}

/**
 * Save round votes
 */
async function saveRoundVotes(question, roundNumber, votes) {
	const discussionDir = getDiscussionDir(question);
	const roundDir = path.join(discussionDir, `round-${roundNumber}`);
	await fs.mkdir(roundDir, { recursive: true });

	const votesPath = path.join(roundDir, 'votes.yaml');
	const yamlContent = yaml.dump(votes, { lineWidth: -1, noRefs: true });
	await fs.writeFile(votesPath, yamlContent, 'utf-8');
	console.log(`    Saved votes: ${votesPath}`);
}

/**
 * Count words in text
 */
function countWords(text) {
	return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

/**
 * Generate response prompt for a model
 */
function generateResponsePrompt(question, thread, roundNumber) {
	let context = `# Discussion: ${question.title}

## Question Background
${question.context}

## Discussion Guidelines
- Provide a substantive response addressing the research question
- Be specific and opinionated about recommended approaches
- Consider technical feasibility, cost implications, and risk factors
- Reference existing Project Dyson specifications where relevant
- Keep your response under ${DEFAULT_CONFIG.maxResponseWords} words
`;

	// Add prior round context if not first round
	if (thread && thread.rounds && thread.rounds.length > 0) {
		context += '\n## Previous Discussion Rounds\n\n';

		for (const round of thread.rounds) {
			context += `### Round ${round.roundNumber}\n\n`;

			for (const response of round.responses) {
				const model = MODELS[response.modelId];
				const isWinner = response.modelId === round.winnerId;
				context += `**${model.name}**${isWinner ? ' (Winning Response)' : ''}:\n`;
				context += response.content.substring(0, 1000) + (response.content.length > 1000 ? '...' : '');
				context += '\n\n';
			}

			context += `Winner: ${MODELS[round.winnerId].name} (Score: ${round.winnerScore.toFixed(1)})\n\n`;
		}
	}

	context += `\n## Your Task (Round ${roundNumber})
Provide your response to the research question. Build on insights from prior rounds if applicable.`;

	return context;
}

/**
 * Generate voting prompt
 */
function generateVotingPrompt(question, responses, votingModelId) {
	let prompt = `# Vote on Discussion Responses

## Question: ${question.title}

You are voting on responses from three AI models. For each response:
- APPROVE: Strong, well-reasoned response that advances the discussion
- NEUTRAL: Adequate response with some merit
- REJECT: Weak, off-topic, or unhelpful response

## Responses to Evaluate

`;

	for (const response of responses) {
		const model = MODELS[response.modelId];
		prompt += `### ${model.name}\n${response.content}\n\n---\n\n`;
	}

	prompt += `## Your Votes

Respond in JSON format ONLY (no other text):
{
  "votes": [
    {"targetId": "claude-opus-4-6", "vote": "APPROVE|NEUTRAL|REJECT", "reasoning": "brief explanation"},
    {"targetId": "gemini-3-pro", "vote": "APPROVE|NEUTRAL|REJECT", "reasoning": "brief explanation"},
    {"targetId": "gpt-5-2", "vote": "APPROVE|NEUTRAL|REJECT", "reasoning": "brief explanation"}
  ],
  "terminationVote": "CONCLUDE|CONTINUE",
  "terminationReasoning": "brief explanation for conclude/continue vote"
}

Vote CONCLUDE if you believe the discussion has reached a satisfactory resolution.
Vote CONTINUE if you believe further rounds would be beneficial.`;

	return prompt;
}

/**
 * Parse voting response from model
 */
function parseVotingResponse(content, voterId) {
	try {
		// Extract JSON from response (handle markdown code blocks)
		let jsonStr = content;
		const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
		if (jsonMatch) {
			jsonStr = jsonMatch[1];
		}

		// Try to find JSON object in the content
		const objectMatch = jsonStr.match(/\{[\s\S]*\}/);
		if (objectMatch) {
			jsonStr = objectMatch[0];
		}

		const parsed = JSON.parse(jsonStr);

		return {
			votes: parsed.votes.map(v => ({
				voterId,
				targetId: v.targetId,
				vote: v.vote,
				reasoning: v.reasoning
			})),
			terminationVote: {
				modelId: voterId,
				vote: parsed.terminationVote || 'CONTINUE',
				reasoning: parsed.terminationReasoning
			}
		};
	} catch (error) {
		console.error(`    Failed to parse voting response from ${voterId}:`, error.message);
		// Return default votes on parse failure
		return {
			votes: DISCUSSION_MODELS.map(targetId => ({
				voterId,
				targetId,
				vote: 'NEUTRAL',
				reasoning: 'Parse error - defaulting to neutral'
			})),
			terminationVote: {
				modelId: voterId,
				vote: 'CONTINUE',
				reasoning: 'Parse error - defaulting to continue'
			}
		};
	}
}

/**
 * Calculate vote score with self-vote weighting
 */
function calculateVoteScore(vote, config = DEFAULT_CONFIG) {
	const baseScore = VOTE_SCORES[vote.vote];
	const isSelfVote = vote.voterId === vote.targetId;

	if (isSelfVote && config.allowSelfVoting) {
		return baseScore * config.selfVoteWeight;
	} else if (isSelfVote && !config.allowSelfVoting) {
		return 0;
	}

	return baseScore;
}

/**
 * Calculate response vote results
 */
function calculateResponseVoteResults(votes, targetId, config = DEFAULT_CONFIG) {
	const targetVotes = votes.filter(v => v.targetId === targetId);

	let rawScore = 0;
	let weightedScore = 0;
	let approveCount = 0;
	let rejectCount = 0;

	for (const vote of targetVotes) {
		rawScore += VOTE_SCORES[vote.vote];
		weightedScore += calculateVoteScore(vote, config);

		if (vote.vote === 'APPROVE') approveCount++;
		if (vote.vote === 'REJECT') rejectCount++;
	}

	return {
		targetId,
		votes: targetVotes,
		rawScore,
		weightedScore,
		approveCount,
		rejectCount
	};
}

/**
 * Determine winner from vote results
 */
function determineWinner(voteResults) {
	const sorted = [...voteResults].sort((a, b) => {
		if (b.weightedScore !== a.weightedScore) {
			return b.weightedScore - a.weightedScore;
		}
		return b.approveCount - a.approveCount;
	});

	return sorted[0].targetId;
}

/**
 * Check termination conditions
 */
function checkTermination(currentRound, previousRounds, config = DEFAULT_CONFIG) {
	const concludeVotes = currentRound.terminationVotes.filter(v => v.vote === 'CONCLUDE');
	const concludeCount = concludeVotes.length;

	// Unanimous termination
	if (config.unanimousTermination && concludeCount === 3) {
		return { shouldTerminate: true, reason: 'unanimous-conclude' };
	}

	// Consecutive conclude (2+ for N rounds)
	if (concludeCount >= 2) {
		const recentRounds = [...previousRounds.slice(-config.consecutiveConcludeRounds + 1), currentRound];

		if (recentRounds.length >= config.consecutiveConcludeRounds) {
			const allHaveMajority = recentRounds.every(
				r => r.terminationVotes.filter(v => v.vote === 'CONCLUDE').length >= 2
			);

			if (allHaveMajority) {
				return { shouldTerminate: true, reason: 'consecutive-conclude' };
			}
		}
	}

	// Max rounds
	if (currentRound.roundNumber >= config.maxRounds) {
		return { shouldTerminate: true, reason: 'max-rounds' };
	}

	// Convergence (same winner 3+ times with high score)
	if (previousRounds.length >= 2) {
		const lastThreeWinners = [...previousRounds.slice(-2), currentRound].map(r => r.winnerId);
		const allSameWinner = lastThreeWinners.every(w => w === currentRound.winnerId);
		const highScore = currentRound.winnerScore >= 5;

		if (allSameWinner && highScore) {
			return { shouldTerminate: true, reason: 'convergence' };
		}
	}

	return { shouldTerminate: false };
}

/**
 * Run a single discussion round
 */
async function runRound(question, thread, roundNumber) {
	console.log(`\n  Round ${roundNumber}:`);

	// Phase 1: Collect responses from all models
	console.log('    Collecting responses...');
	const responses = [];

	for (const modelKey of DISCUSSION_MODELS) {
		const model = MODELS[modelKey];
		console.log(`      Querying ${model.name}...`);

		const prompt = generateResponsePrompt(question, thread, roundNumber);
		const content = await queryDatabricks(modelKey, prompt, {
			systemPrompt: 'You are a space systems engineering expert participating in a multi-stakeholder discussion about Project Dyson specifications.'
		});

		if (!content) {
			console.log(`        ${model.name} API unavailable - using placeholder`);
			responses.push({
				modelId: modelKey,
				content: `[Response unavailable from ${model.name}]`,
				wordCount: 0,
				generatedAt: new Date().toISOString()
			});
		} else {
			responses.push({
				modelId: modelKey,
				content,
				wordCount: countWords(content),
				generatedAt: new Date().toISOString()
			});

			// Save individual response
			await saveRoundResponse(question, roundNumber, modelKey, content);
		}
	}

	// Phase 2: Collect votes from all models
	console.log('    Collecting votes...');
	const allVotes = [];
	const terminationVotes = [];

	for (const modelKey of DISCUSSION_MODELS) {
		const model = MODELS[modelKey];
		console.log(`      ${model.name} voting...`);

		const votingPrompt = generateVotingPrompt(question, responses, modelKey);
		const voteContent = await queryDatabricks(modelKey, votingPrompt, {
			systemPrompt: 'You are evaluating responses in a structured discussion. Respond only with valid JSON.',
			maxTokens: 2000
		});

		if (voteContent) {
			const parsed = parseVotingResponse(voteContent, modelKey);
			allVotes.push(...parsed.votes);
			terminationVotes.push(parsed.terminationVote);
		} else {
			// Default votes on API failure
			for (const targetId of DISCUSSION_MODELS) {
				allVotes.push({
					voterId: modelKey,
					targetId,
					vote: 'NEUTRAL',
					reasoning: 'API unavailable'
				});
			}
			terminationVotes.push({
				modelId: modelKey,
				vote: 'CONTINUE',
				reasoning: 'API unavailable'
			});
		}
	}

	// Phase 3: Calculate scores and determine winner
	const voteResults = DISCUSSION_MODELS.map(targetId =>
		calculateResponseVoteResults(allVotes, targetId)
	);

	const winnerId = determineWinner(voteResults);
	const winnerResult = voteResults.find(r => r.targetId === winnerId);

	console.log(`    Winner: ${MODELS[winnerId].name} (Score: ${winnerResult.weightedScore.toFixed(1)})`);

	// Build round object
	const round = {
		roundNumber,
		responses,
		votes: voteResults,
		winnerId,
		winnerScore: winnerResult.weightedScore,
		terminationVotes,
		shouldTerminate: false,
		completedAt: new Date().toISOString()
	};

	// Save votes
	await saveRoundVotes(question, roundNumber, {
		votes: allVotes,
		terminationVotes,
		voteResults,
		winnerId,
		winnerScore: winnerResult.weightedScore
	});

	return round;
}

/**
 * Generate discussion conclusion
 */
async function generateConclusion(question, thread) {
	console.log('\n  Generating conclusion...');

	let context = `# Generate Discussion Conclusion

## Question: ${question.title}

## Question Background
${question.context}

## Discussion Summary

This discussion ran for ${thread.rounds.length} round(s).

### Round-by-Round Results:
`;

	for (const round of thread.rounds) {
		context += `\n**Round ${round.roundNumber}**\n`;
		context += `Winner: ${MODELS[round.winnerId].name} (Score: ${round.winnerScore.toFixed(1)})\n`;

		const winningResponse = round.responses.find(r => r.modelId === round.winnerId);
		if (winningResponse) {
			context += `Winning response:\n${winningResponse.content}\n`;
		}
	}

	context += `\n## Your Task

Synthesize the discussion into a conclusion document with:

1. **Summary**: A 2-3 paragraph synthesis of the key conclusions
2. **Key Points**: 4-6 bullet points of main agreements
3. **Unresolved Questions**: 2-4 questions that remain open
4. **Recommended Actions**: 3-5 specific next steps

Format your response in markdown.`;

	const content = await queryDatabricks('claude-opus-4-6', context, {
		systemPrompt: 'You are synthesizing a multi-model discussion into actionable conclusions.',
		maxTokens: 8000
	});

	if (!content) {
		return {
			summary: 'Conclusion generation failed - API unavailable',
			keyPoints: [],
			unresolvedQuestions: [],
			recommendedActions: [],
			generatedBy: 'claude-opus-4-6',
			generatedAt: new Date().toISOString()
		};
	}

	// Parse the conclusion content
	const conclusion = {
		summary: content,
		keyPoints: [],
		unresolvedQuestions: [],
		recommendedActions: [],
		generatedBy: 'claude-opus-4-6',
		generatedAt: new Date().toISOString()
	};

	// Extract sections from markdown
	const keyPointsMatch = content.match(/## Key Points([\s\S]*?)(?=##|$)/i);
	if (keyPointsMatch) {
		conclusion.keyPoints = keyPointsMatch[1]
			.split('\n')
			.filter(l => l.trim().startsWith('-') || l.trim().startsWith('*'))
			.map(l => l.replace(/^[\s\-\*]+/, '').trim());
	}

	const unresolvedMatch = content.match(/## Unresolved Questions([\s\S]*?)(?=##|$)/i);
	if (unresolvedMatch) {
		conclusion.unresolvedQuestions = unresolvedMatch[1]
			.split('\n')
			.filter(l => l.trim().startsWith('-') || l.trim().startsWith('*') || l.trim().match(/^\d+\./))
			.map(l => l.replace(/^[\s\-\*\d\.]+/, '').trim());
	}

	const actionsMatch = content.match(/## Recommended Actions([\s\S]*?)(?=##|$)/i);
	if (actionsMatch) {
		conclusion.recommendedActions = actionsMatch[1]
			.split('\n')
			.filter(l => l.trim().startsWith('-') || l.trim().startsWith('*') || l.trim().match(/^\d+\./))
			.map(l => l.replace(/^[\s\-\*\d\.]+/, '').trim());
	}

	// Save conclusion
	const discussionDir = getDiscussionDir(question);
	const conclusionPath = path.join(discussionDir, 'conclusion.md');

	const date = new Date().toISOString().split('T')[0];
	const frontmatter = `---
questionId: "${question.id}"
questionSlug: "${question.slug}"
type: "discussion-conclusion"
generatedBy: "claude-opus-4-6"
generated: "${date}"
roundCount: ${thread.rounds.length}
terminationReason: "${thread.terminationReason || 'unknown'}"
---

`;

	await fs.writeFile(conclusionPath, frontmatter + content, 'utf-8');
	console.log(`  Saved conclusion: ${conclusionPath}`);

	return conclusion;
}

/**
 * Compute discussion statistics
 */
function computeStats(rounds) {
	const roundWinners = {
		'claude-opus-4-6': 0,
		'gemini-3-pro': 0,
		'gpt-5-2': 0
	};

	let totalVotes = 0;
	let approveVotes = 0;
	let totalWords = 0;
	let responseCount = 0;

	for (const round of rounds) {
		roundWinners[round.winnerId]++;

		for (const voteResult of round.votes) {
			for (const vote of voteResult.votes) {
				totalVotes++;
				if (vote.vote === 'APPROVE') approveVotes++;
			}
		}

		for (const response of round.responses) {
			totalWords += response.wordCount;
			responseCount++;
		}
	}

	return {
		totalRounds: rounds.length,
		roundWinners,
		totalVotes,
		approvalRate: totalVotes > 0 ? (approveVotes / totalVotes) * 100 : 0,
		averageResponseWords: responseCount > 0 ? Math.round(totalWords / responseCount) : 0
	};
}

/**
 * Main execution
 */
async function main() {
	const args = process.argv.slice(2);
	const questionSlug = args.find(a => a.startsWith('--question='))?.split('=')[1];
	const targetRound = args.find(a => a.startsWith('--round='))?.split('=')[1];
	const autoMode = args.includes('--auto');
	const forceConclusion = args.includes('--conclude');

	if (!questionSlug) {
		console.error('Usage: node scripts/run-discussion.js --question=<slug> [--round=N] [--auto] [--conclude]');
		process.exit(1);
	}

	if (!DATABRICKS_TOKEN) {
		console.error('Error: DATABRICKS_TOKEN environment variable is required');
		process.exit(1);
	}

	console.log('='.repeat(60));
	console.log('LLM Discussion System');
	console.log('='.repeat(60));

	// Load question
	console.log(`\nLoading question: ${questionSlug}`);
	const question = await loadQuestion(questionSlug);

	if (!question) {
		console.error(`Question not found: ${questionSlug}`);
		process.exit(1);
	}

	console.log(`  Title: ${question.title}`);
	console.log(`  Type: ${question.questionType}`);
	console.log(`  Priority: ${question.priority}`);

	if (question.questionType !== 'discussion') {
		console.warn(`  Warning: Question type is '${question.questionType}', not 'discussion'`);
	}

	// Load or initialize thread
	let thread = await loadDiscussionThread(question);

	if (!thread) {
		console.log('\n  Starting new discussion thread...');
		thread = {
			questionId: question.id,
			questionSlug: question.slug,
			questionTitle: question.title,
			phaseId: question.sourcePhaseId,
			config: DEFAULT_CONFIG,
			status: 'active',
			startedAt: new Date().toISOString(),
			rounds: [],
			currentRound: 0,
			stats: {
				totalRounds: 0,
				roundWinners: { 'claude-opus-4-6': 0, 'gemini-3-pro': 0, 'gpt-5-2': 0 },
				totalVotes: 0,
				approvalRate: 0,
				averageResponseWords: 0
			}
		};
	} else {
		console.log(`\n  Resuming discussion (${thread.rounds.length} rounds completed)`);

		if (thread.status === 'concluded') {
			console.log('  Discussion already concluded.');
			if (!forceConclusion) {
				process.exit(0);
			}
		}
	}

	// Force conclusion mode
	if (forceConclusion) {
		console.log('\n  Force concluding discussion...');
		thread.terminationReason = 'forced';
		thread.status = 'concluded';
		thread.concludedAt = new Date().toISOString();
		thread.conclusion = await generateConclusion(question, thread);
		thread.stats = computeStats(thread.rounds);
		await saveDiscussionThread(question, thread);

		console.log('\n' + '='.repeat(60));
		console.log('Discussion concluded (forced)');
		console.log('='.repeat(60));
		return;
	}

	// Run rounds
	const startRound = thread.currentRound + 1;
	const endRound = targetRound ? parseInt(targetRound) : (autoMode ? DEFAULT_CONFIG.maxRounds : startRound);

	for (let roundNum = startRound; roundNum <= endRound; roundNum++) {
		const round = await runRound(question, thread, roundNum);

		// Check termination
		const termCheck = checkTermination(round, thread.rounds);
		round.shouldTerminate = termCheck.shouldTerminate;
		if (termCheck.reason) {
			round.terminationReason = termCheck.reason;
		}

		thread.rounds.push(round);
		thread.currentRound = roundNum;

		// Save progress after each round
		thread.stats = computeStats(thread.rounds);
		await saveDiscussionThread(question, thread);

		// Log termination votes
		const concludeVotes = round.terminationVotes.filter(v => v.vote === 'CONCLUDE').length;
		console.log(`    Termination votes: ${concludeVotes}/3 for CONCLUDE`);

		if (round.shouldTerminate) {
			console.log(`\n  Discussion terminating: ${round.terminationReason}`);
			thread.terminationReason = round.terminationReason;
			thread.status = 'concluded';
			thread.concludedAt = new Date().toISOString();
			break;
		}

		if (!autoMode && !targetRound) {
			break; // Single round mode
		}
	}

	// Generate conclusion if terminated
	if (thread.status === 'concluded') {
		thread.conclusion = await generateConclusion(question, thread);
		await saveDiscussionThread(question, thread);
	}

	// Final summary
	console.log('\n' + '='.repeat(60));
	console.log('Discussion Summary');
	console.log('='.repeat(60));
	console.log(`  Question: ${question.title}`);
	console.log(`  Status: ${thread.status}`);
	console.log(`  Rounds completed: ${thread.rounds.length}`);
	if (thread.terminationReason) {
		console.log(`  Termination reason: ${thread.terminationReason}`);
	}
	console.log('\n  Round winners:');
	for (const [modelId, count] of Object.entries(thread.stats.roundWinners)) {
		if (count > 0) {
			console.log(`    ${MODELS[modelId].name}: ${count} round(s)`);
		}
	}
	console.log(`\n  Approval rate: ${thread.stats.approvalRate.toFixed(1)}%`);
	console.log(`  Average response words: ${thread.stats.averageResponseWords}`);

	if (thread.status !== 'concluded') {
		console.log(`\n  To continue: node scripts/run-discussion.js --question=${questionSlug}`);
		console.log(`  To auto-run: node scripts/run-discussion.js --question=${questionSlug} --auto`);
	}

	console.log('\n' + '='.repeat(60));
}

main().catch(console.error);
