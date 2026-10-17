#!/usr/bin/env node
// @ts-nocheck — Node script; imported by a vitest test for its prompt builders

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
 *   # Choose the panel (default: feb = Claude Opus 4.6, Gemini 3 Pro, GPT-5.2)
 *   node scripts/run-discussion.js --question=<slug> --auto --panel=may
 *   node scripts/run-discussion.js --question=<slug> --auto --panel=latest --synthesizer=claude-opus-4-7
 *   node scripts/run-discussion.js --question=<slug> --models=claude-opus-4-7,gemini-3-1-pro,gpt-5-5-pro
 *   node scripts/run-discussion.js --list-models | --discover
 *
 * Environment variables (see scripts/lib/llm.js):
 *   DATABRICKS_TOKEN or --profile=<databricks CLI profile>
 *   DATABRICKS_HOST / DATABRICKS_GATEWAY_HOST - workspaces (optional, have defaults)
 *
 * Every exchange is archived as JSON under data/raw-exchanges/discussions/<slug>/.
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { MODELS, PANELS, archiveRaw, familyOf, handleInfoFlags, panelArgs, queryModel, resolvePanel } from './lib/llm.js';
import { SCAFFOLD, loadFramework } from './lib/critique.js';
import { buildProvenance } from './lib/provenance.js';
import { lastYaml } from './lib/yaml-block.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Models and panel (scripts/lib/llm.js). The panel is chosen in main(); feb by default
// so existing discussions continue with the models that started them.
let DISCUSSION_MODELS = [...PANELS.feb];
let SYNTHESIZER = 'claude-opus-4-6';
let RAW_DIR = path.join(PROJECT_ROOT, 'data/raw-exchanges/discussions');

/** Set the panel (used by main() and by tests). */
export function setPanel(models) {
	DISCUSSION_MODELS = [...models];
}

// Framework mode (--framework): the decision-frameworks scaffold, blind voting, full prior
// rounds and no winner shown, addressing paper 03's threats to validity (anchoring on the
// winner, head truncation) and recording a provenance manifest per discussion.
const FRAMEWORK_RESPONSE_WORDS = 3000;
const DQ_LINKS = ['frame', 'alternatives', 'information', 'values', 'reasoning', 'commitment'];
const label = (i) => String.fromCharCode(65 + i);

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
	const { maxTokens = 16000, systemPrompt, label = 'exchange' } = options;
	try {
		const ex = await queryModel(modelKey, { system: systemPrompt, prompt, maxTokens });
		await archiveRaw(path.join(RAW_DIR, modelKey), `${label}-${Date.now()}`, ex).catch((e) =>
			console.warn(`  (raw archive failed: ${e.message})`)
		);
		return ex.text;
	} catch (error) {
		console.error(`Error querying ${MODELS[modelKey]?.name ?? modelKey}:`, error.message);
		return null;
	}
}

/**
 * Load research question from markdown file
 */
async function loadQuestion(slug) {
	const phases = ['phase-0', 'phase-1', 'phase-2'];

	for (const phase of phases) {
		const dir = path.join(PROJECT_ROOT, 'src/content/research-questions', phase);
		try {
			const files = await fs.readdir(dir);
			const mdFiles = files.filter(f => f.endsWith('.md'));
			const matchingFile = mdFiles.find(f => f.endsWith(`-${slug}.md`) || f.includes(slug));

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
		'src/content/research-questions',
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
 * Generate response prompt for a model.
 * method: { hiddenWinner, framework (from loadFramework) | null, priorContext: 'full' | chars }
 */
/** @param {any} question @param {any} thread @param {number} roundNumber @param {{ hiddenWinner?: boolean, framework?: any, priorContext?: 'full' | number }} [method] */
export function generateResponsePrompt(question, thread, roundNumber, { hiddenWinner = false, framework = null, priorContext = 1000 } = {}) {
	const words = framework ? FRAMEWORK_RESPONSE_WORDS : DEFAULT_CONFIG.maxResponseWords;
	let context = `# Discussion: ${question.title}

## Question Background
${question.context}

## Discussion Guidelines
- Provide a substantive response addressing the research question
- Be specific and opinionated about recommended approaches
- Consider technical feasibility, cost implications, and risk factors
- Reference existing Project Dyson specifications where relevant
- Keep your response under ${words} words
`;

	if (framework) {
		context += `
## Decision method (required)
Treat the question as a decision and structure your response along the Composite Scaffold of the decision-frameworks reference at the end of this prompt, using these headings:

${SCAFFOLD.map((s, i) => `${i + 1}. ${s}`).join('\n')}

- State the criteria and their (swing) weights **before** you list options, and say why each weight fits the range of that criterion.
- Include the null option (do nothing / keep the status quo) and the options you reject, each with its argument.
- Give the options × criteria matrix (QOC) as a table.
- Name sensitivity points and trade-off points explicitly; a trade-off point is a values question, not a fact to settle.
- Per key claim, state the certainty of the evidence (GRADE) and keep likelihood separate from confidence (IPCC/ICD 203). Cite only sources you are confident exist.
- For each key assumption, say what evidence would falsify it; where hypotheses compete, rank them by least disconfirmed (ACH).
- End with the decision as a Y-statement (in the context of …, facing …, we chose …, to achieve …, accepting …), its warrant and qualifier (Toulmin), and the decisions it enables or constrains.
- In later rounds, name the weakest link in each other response's Decision Quality chain (${DQ_LINKS.join(' · ')}). Disagreements are kept, not averaged away.
`;
	}

	// Add prior round context if not first round
	if (thread && thread.rounds && thread.rounds.length > 0) {
		context += '\n## Previous Discussion Rounds\n\n';

		for (const round of thread.rounds) {
			context += `### Round ${round.roundNumber}\n\n`;

			for (const response of round.responses) {
				const model = MODELS[response.modelId];
				if (!hiddenWinner) {
				const isWinner = response.modelId === round.winnerId;
				context += `**${model.name}**${isWinner ? ' (Winning Response)' : ''}:\n`;
			} else {
				context += `**${model.name}**:\n`;
			}
				context +=
					priorContext === 'full'
						? response.content
						: response.content.substring(0, priorContext) + (response.content.length > priorContext ? '...' : '');
				context += '\n\n';
			}

			if (!hiddenWinner) {
				context += `Winner: ${MODELS[round.winnerId].name} (Score: ${round.winnerScore.toFixed(1)})\n\n`;
			}
		}
	}

	context += `\n## Your Task (Round ${roundNumber})
Provide your response to the research question. Build on insights from prior rounds if applicable.`;

	if (framework) context += `\n\n---\n\n${framework.body}`;

	return context;
}

/**
 * Generate voting prompt. The JSON template lists the panel that is voting (it used to
 * hard-code the February models, so other panels' votes matched no response).
 * blind: responses are labelled A, B, C and model names are withheld.
 */
/** @param {any} question @param {any[]} responses @param {string} votingModelId @param {{ framework?: any, blind?: boolean }} [opts] */
export function generateVotingPrompt(question, responses, votingModelId, { framework = null, blind = false } = {}) {
	const ids = responses.map((r, i) => (blind ? label(i) : r.modelId));
	let prompt = `# Vote on Discussion Responses

## Question: ${question.title}

You are voting on ${blind ? 'anonymised responses (one of them may be your own)' : 'responses from three AI models'}. For each response:
`;
	prompt += framework
		? `- APPROVE: the decision chain (frame, alternatives, information, values, reasoning, commitment) has no weak link that would change the decision
- NEUTRAL: sound in part, but at least one link is weak enough that the decision could change
- REJECT: a link is missing (e.g. options before criteria, no null option, uncalibrated certainty, no falsifiable assumptions) or the response is off-topic
`
		: `- APPROVE: Strong, well-reasoned response that advances the discussion
- NEUTRAL: Adequate response with some merit
- REJECT: Weak, off-topic, or unhelpful response
`;
	prompt += '\n## Responses to Evaluate\n\n';

	responses.forEach((response, i) => {
		prompt += `### ${blind ? `Response ${label(i)}` : MODELS[response.modelId].name}\n${response.content}\n\n---\n\n`;
	});

	const extra = framework ? `, "weakestLink": "${DQ_LINKS.join('|')}"` : '';
	prompt += `## Your Votes

Respond in JSON format ONLY (no other text):
{
  "votes": [
${ids.map((id) => `    {"targetId": "${id}", "vote": "APPROVE|NEUTRAL|REJECT"${extra}, "reasoning": "brief explanation"}`).join(',\n')}
  ],
  "terminationVote": "CONCLUDE|CONTINUE",
  "terminationReasoning": "brief explanation for conclude/continue vote"
}

Vote CONCLUDE if you believe the discussion has reached a satisfactory resolution.
Vote CONTINUE if you believe further rounds would be beneficial.`;

	return prompt;
}

/** Map a vote's targetId onto the panel: blind label, exact id, or a same-family model. */
function resolveTarget(targetId, { blind = false } = {}) {
	if (blind && /^[A-Z]$/.test(targetId ?? '')) return DISCUSSION_MODELS[targetId.charCodeAt(0) - 65] ?? targetId;
	if (DISCUSSION_MODELS.includes(targetId)) return targetId;
	const same = DISCUSSION_MODELS.filter((m) => familyOf(m) === familyOf(targetId ?? ''));
	return same.length === 1 ? same[0] : targetId;
}

/**
 * Parse voting response from model
 */
export function parseVotingResponse(content, voterId, { blind = false } = {}) {
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
				targetId: resolveTarget(v.targetId, { blind }),
				vote: v.vote,
				...(v.weakestLink ? { weakestLink: v.weakestLink } : {}),
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
async function runRound(question, thread, roundNumber, method = {}) {
	const { framework = null, blind = false } = method;
	console.log(`\n  Round ${roundNumber}:`);

	// Phase 1: Collect responses from all models
	console.log('    Collecting responses...');
	const responses = [];

	for (const modelKey of DISCUSSION_MODELS) {
		const model = MODELS[modelKey];
		console.log(`      Querying ${model.name}...`);

		const prompt = generateResponsePrompt(question, thread, roundNumber, method);
		const content = await queryDatabricks(modelKey, prompt, {
			label: `round-${roundNumber}-response`,
			...(framework ? { maxTokens: 32000 } : {}),
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

		const votingPrompt = generateVotingPrompt(question, responses, modelKey, { framework, blind });
		const voteContent = await queryDatabricks(modelKey, votingPrompt, {
			label: `round-${roundNumber}-vote`,
			systemPrompt: 'You are evaluating responses in a structured discussion. Respond only with valid JSON.',
			// reasoning models think inside the budget; 2,000 can leave no room for the JSON
			maxTokens: framework ? 16000 : 2000
		});

		if (voteContent) {
			const parsed = parseVotingResponse(voteContent, modelKey, { blind });
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
 * Conclusion prompt. Default: the winning responses (as published in paper 03).
 * Framework mode: every response of every round with the votes' weakest links, a
 * decision record, a decision-quality audit and a divergent-views YAML block.
 */
/** @param {any} question @param {any} thread @param {{ framework?: any }} [method] */
export function conclusionPrompt(question, thread, { framework = null } = {}) {
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
		if (framework) {
			for (const r of round.responses) context += `\n#### ${MODELS[r.modelId]?.name ?? r.modelId}\n${r.content}\n`;
			context += '\nVotes:\n';
			for (const vr of round.votes ?? [])
				for (const v of vr.votes ?? [])
					context += `- ${MODELS[v.voterId]?.name ?? v.voterId} → ${MODELS[v.targetId]?.name ?? v.targetId}: ${v.vote}${v.weakestLink ? ` (weakest link: ${v.weakestLink})` : ''} — ${v.reasoning ?? ''}\n`;
			continue;
		}
		context += `Winner: ${MODELS[round.winnerId].name} (Score: ${round.winnerScore.toFixed(1)})\n`;

		const winningResponse = round.responses.find(r => r.modelId === round.winnerId);
		if (winningResponse) {
			context += `Winning response:\n${winningResponse.content}\n`;
		}
	}

	if (framework) {
		context += `\n## Your Task

You are the neutral rapporteur. Attribute every claim to the model(s) that made it; add no technical claims of your own; do not pick a winner where the panel did not converge. Write markdown with these sections:

## Summary
2-3 paragraphs.
## Decision record
If the panel converged: the decision as a Y-statement (in the context of …, facing …, we chose …, to achieve …, accepting …) with its warrant, qualifier and accepted downside. If not: one Y-statement per position, with the models holding it.
## Decision-quality audit
Per response and round: the weakest Decision Quality link the votes named, the Composite Scaffold steps that were missing or unsupported, and any divergence that is a trade-off point (a values question) rather than a fact to settle.
## Key Points
## Unresolved Questions
## Recommended Actions

Finish with one fenced \`yaml\` block of the divergent views, in exactly this schema:

\`\`\`yaml
questionId: "${question.id}"
topics:
  - id: <kebab-case>
    topic: <title>
    positions:
      - statement: <position>
        models: [<model names>]
        evidence: <their evidence>
    resolution_status: open | partially-resolved | resolved
    priority: critical | high | medium | low
\`\`\``;
		return context;
	}

	context += `\n## Your Task

Synthesize the discussion into a conclusion document with:

1. **Summary**: A 2-3 paragraph synthesis of the key conclusions
2. **Key Points**: 4-6 bullet points of main agreements
3. **Unresolved Questions**: 2-4 questions that remain open
4. **Recommended Actions**: 3-5 specific next steps

Format your response in markdown.`;
	return context;
}

/** Output file names; an alternate synthesis is written beside the primary one. */
export function conclusionFiles(synthesizer, { alternate = false } = {}) {
	const tag = alternate ? `.${synthesizer}` : '';
	return { conclusion: `conclusion${tag}.md`, divergentViews: `divergent-views${tag}.yaml` };
}

/**
 * Generate discussion conclusion
 */
async function generateConclusion(question, thread, method = {}) {
	console.log('\n  Generating conclusion...');
	const context = conclusionPrompt(question, thread, method);

	const content = await queryDatabricks(SYNTHESIZER, context, {
		label: 'conclusion',
		systemPrompt: 'You are synthesizing a multi-model discussion into actionable conclusions.',
		maxTokens: method.framework ? 32000 : 8000
	});

	if (!content) {
		return {
			summary: 'Conclusion generation failed - API unavailable',
			keyPoints: [],
			unresolvedQuestions: [],
			recommendedActions: [],
			generatedBy: SYNTHESIZER,
			generatedAt: new Date().toISOString()
		};
	}

	// Parse the conclusion content
	const conclusion = {
		summary: content,
		keyPoints: [],
		unresolvedQuestions: [],
		recommendedActions: [],
		generatedBy: SYNTHESIZER,
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
	const files = conclusionFiles(SYNTHESIZER, { alternate: !!method.alternate });
	const conclusionPath = path.join(discussionDir, files.conclusion);

	const date = new Date().toISOString().split('T')[0];
	const frontmatter = `---
questionId: "${question.id}"
questionSlug: "${question.slug}"
type: "discussion-conclusion"
generatedBy: "${SYNTHESIZER}"
generated: "${date}"${method.framework ? `\nframework: "${method.framework.sha}"` : ''}
roundCount: ${thread.rounds.length}
terminationReason: "${thread.terminationReason || 'unknown'}"${method.alternate ? '\nrole: "alternate synthesis"' : ''}
---

`;

	await fs.writeFile(conclusionPath, frontmatter + content, 'utf-8');
	console.log(`  Saved conclusion: ${conclusionPath}`);

	if (method.framework) {
		const dv = lastYaml(content);
		const dvPath = path.join(discussionDir, files.divergentViews);
		if (dv?.topics) {
			await fs.writeFile(
				dvPath,
				`# Extracted by ${SYNTHESIZER} from the conclusion (step 1-2 of paper 03's procedure). Human review against the transcripts (step 3) is pending.\n${yaml.dump(dv, { lineWidth: 120 })}`
			);
			console.log(`  Saved divergent views: ${dvPath} (${dv.topics.length} topics)`);
		} else console.warn('  ! conclusion had no parseable divergent-views yaml');
	}

	return conclusion;
}

/** Write provenance.yaml next to the discussion, derived from the raw exchange archive. */
async function writeProvenance(question, method) {
	const dir = getDiscussionDir(question);
	const outputs = [];
	for (const e of await fs.readdir(dir, { recursive: true }).catch(() => [])) {
		if (/\.(md|ya?ml)$/.test(e) && !e.endsWith('provenance.yaml')) outputs.push(path.join(dir, e));
	}
	const p = await buildProvenance({
		root: PROJECT_ROOT,
		rawDir: RAW_DIR,
		outputs: outputs.sort(),
		method: {
			framework: method.framework ? { path: 'src/content/methodology/decision-frameworks.md', sha: method.framework.sha } : null,
			hiddenWinner: !!method.hiddenWinner,
			blindVoting: !!method.blind,
			priorContext: method.priorContext === 'full' ? 'full' : `${method.priorContext ?? 1000} characters (head)`,
			config: DEFAULT_CONFIG,
			responseWords: method.framework ? FRAMEWORK_RESPONSE_WORDS : DEFAULT_CONFIG.maxResponseWords,
			synthesizer: method.primarySynthesizer ?? SYNTHESIZER,
			...(method.alternateSynthesizers ? { alternateSynthesizers: method.alternateSynthesizers } : {})
		},
		models: DISCUSSION_MODELS.map((k) => ({ key: k, name: MODELS[k].name, endpoint: MODELS[k].id, transport: MODELS[k].transport }))
	});
	await fs.writeFile(path.join(dir, 'provenance.yaml'), yaml.dump(p, { lineWidth: 120, noRefs: true }));
}

/**
 * Compute discussion statistics
 */
function computeStats(rounds) {
	const roundWinners = Object.fromEntries(DISCUSSION_MODELS.map((m) => [m, 0]));
	for (const r of rounds) if (r.winnerId && !(r.winnerId in roundWinners)) roundWinners[r.winnerId] = 0;

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
	const resynthesize = args.includes('--resynthesize');
	const frameworkMode = args.includes('--framework');
	// --framework: decision-frameworks scaffold + blind voting + full prior rounds + winner hidden
	const method = frameworkMode
		? { framework: await loadFramework(PROJECT_ROOT), blind: true, priorContext: 'full', hiddenWinner: true }
		: { hiddenWinner: args.includes('--hidden-winner') };

	if (!questionSlug && !args.includes('--list-models') && !args.includes('--discover')) {
		console.error('Usage: node scripts/run-discussion.js --question=<slug> [--round=N] [--auto] [--conclude] [--framework] [--hidden-winner] [--resynthesize] [--panel=feb|may|oct|latest | --models=a,b,c] [--synthesizer=key]');
		process.exit(1);
	}

	const flags = panelArgs(args);
	if (await handleInfoFlags(flags)) return;
	DISCUSSION_MODELS = await resolvePanel(flags);
	const synth = args.find((a) => a.startsWith('--synthesizer='))?.split('=')[1];
	SYNTHESIZER = synth ? (await resolvePanel({ models: synth }))[0] : DISCUSSION_MODELS.find((m) => MODELS[m].family === 'claude') ?? DISCUSSION_MODELS[0];
	RAW_DIR = path.join(PROJECT_ROOT, 'data/raw-exchanges/discussions', questionSlug);
	console.log(`Panel: ${DISCUSSION_MODELS.map((m) => MODELS[m].name).join(', ')} · synthesizer: ${MODELS[SYNTHESIZER].name}`);

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
			...(frameworkMode ? { method: { framework: method.framework.sha, blindVoting: true, priorContext: 'full', hiddenWinner: true } } : {}),
			status: 'active',
			startedAt: new Date().toISOString(),
			rounds: [],
			currentRound: 0,
			stats: {
				totalRounds: 0,
				roundWinners: Object.fromEntries(DISCUSSION_MODELS.map((m) => [m, 0])),
				totalVotes: 0,
				approvalRate: 0,
				averageResponseWords: 0
			}
		};
	} else {
		console.log(`\n  Resuming discussion (${thread.rounds.length} rounds completed)`);

		if (thread.status === 'concluded' && resynthesize) {
			// Alternate synthesis: same transcript and method, another synthesizer, separate files
			const m = { ...method, alternate: true };
			if (thread.method?.framework) {
				m.framework = await loadFramework(PROJECT_ROOT);
				m.blind = true;
				m.priorContext = 'full';
				m.hiddenWinner = true;
				if (m.framework.sha !== thread.method.framework)
					console.warn(`  ! framework changed since the run (${thread.method.framework} → ${m.framework.sha})`);
			}
			console.log(`\n  Alternate synthesis with ${MODELS[SYNTHESIZER].name}...`);
			const c = await generateConclusion(question, thread, m);
			if (c.summary.startsWith('Conclusion generation failed')) {
				console.error(`  ! alternate synthesis failed; nothing recorded`);
				process.exitCode = 1;
				return;
			}
			(thread.alternateSyntheses ??= []).push({ synthesizer: SYNTHESIZER, generatedAt: new Date().toISOString(), file: conclusionFiles(SYNTHESIZER, { alternate: true }).conclusion });
			await saveDiscussionThread(question, thread);
			m.primarySynthesizer = thread.conclusion?.generatedBy;
			m.alternateSynthesizers = thread.alternateSyntheses.map((x) => x.synthesizer);
			if (thread.method?.framework) await writeProvenance(question, m);
			return;
		}
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
		thread.conclusion = await generateConclusion(question, thread, method);
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
		const round = await runRound(question, thread, roundNum, method);

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
		if (frameworkMode) await writeProvenance(question, method);

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
		thread.conclusion = await generateConclusion(question, thread, method);
		await saveDiscussionThread(question, thread);
		if (frameworkMode) await writeProvenance(question, method);
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

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}`) {
	main().catch(console.error);
}
