#!/usr/bin/env node

/**
 * Run peer reviews of ISRU paper across multiple LLM models via Databricks API.
 *
 * Usage:
 *   source .env
 *   node scripts/run-peer-review.js --version=ab
 *   node scripts/run-peer-review.js --version=ab --model=gemini-3-pro
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const DATABRICKS_HOST = process.env.DATABRICKS_HOST || process.env.DATABRICKS_WORKSPACE || 'https://adb-6239133969168510.10.azuredatabricks.net';
const DATABRICKS_TOKEN = process.env.DATABRICKS_TOKEN;

const MODELS = {
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
  },
  'claude-opus-4-6': {
    id: 'databricks-claude-opus-4-6',
    name: 'Claude Opus 4.6',
    filename: 'claude-opus-4-6.md',
    endpoint: '/serving-endpoints/databricks-claude-opus-4-6/invocations'
  }
};

function buildReviewPrompt(paperContent, version) {
  return `You are an expert peer reviewer for a top-tier space systems engineering or economics journal (such as Advances in Space Research or Acta Astronautica). You have deep expertise in aerospace manufacturing costs, learning curves, ISRU technology, Monte Carlo simulation, and NPV analysis.

Please provide a thorough peer review of the following manuscript (Version ${version.toUpperCase()}). Structure your review as follows:

## 1. Significance & Novelty
**Rating: X/5**
Assessment of the paper's contribution to the field.

## 2. Methodological Soundness
**Rating: X/5**
Assessment of the model, Monte Carlo framework, and statistical methods.

## 3. Presentation Quality
**Rating: X/5**
Assessment of writing, figures, tables, and overall clarity.

## 4. Major Issues
Numbered list of substantive concerns that must be addressed. For each:
- State the issue clearly
- Explain why it matters
- Suggest a specific remedy

## 5. Minor Issues
Numbered list of smaller concerns (typos, clarifications, presentation tweaks).

## 6. Questions for Authors
Specific questions that would help clarify the analysis.

## 7. Overall Assessment
**Recommendation:** [Accept / Accept with Minor Revisions / Major Revision / Reject]

Provide a 2-3 paragraph summary of your overall assessment, highlighting strengths and the most critical improvements needed.

---

Be rigorous but constructive. Focus on scientific substance over formatting. If previous versions addressed an issue, acknowledge the improvement rather than re-raising it. Pay particular attention to:
- Whether the re-crossing (N**) analysis adequately characterizes transient crossovers
- Whether the Earth learning offset (n_0) sensitivity is well-motivated
- Whether the decision tree figure adds practical value
- Whether the technology obsolescence discussion is sufficient
- Whether the "validated" language has been appropriately softened
- Whether the vitamin BOM table is now clear

Here is the full manuscript:

${paperContent}`;
}

async function queryModel(modelKey, prompt) {
  const model = MODELS[modelKey];
  const endpoint = `${DATABRICKS_HOST}${model.endpoint}`;

  console.log(`  Querying ${model.name}...`);
  const startTime = Date.now();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 900000); // 15 min timeout
  const response = await fetch(endpoint, {
    method: 'POST',
    signal: controller.signal,
    headers: {
      'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content: 'You are an expert peer reviewer for aerospace engineering and space economics journals.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: modelKey === 'gemini-3-pro' ? 65000 : 100000,
      temperature: 0.7
    })
  });
  clearTimeout(timeoutId);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${model.name} API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  let content = data.choices?.[0]?.message?.content;
  // Gemini returns content as array of {type, text} objects
  if (Array.isArray(content)) {
    content = content.map(c => c.text || '').join('');
  }
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const finishReason = data.choices?.[0]?.finish_reason;
  console.log(`  ${model.name} responded in ${elapsed}s (${content?.length || 0} chars, finish: ${finishReason})`);

  if (!content || content.length < 100) {
    console.log(`  WARNING: Response too short. Raw response:`, JSON.stringify(data).substring(0, 500));
  }

  return content;
}

async function saveReview(modelKey, content, version) {
  const model = MODELS[modelKey];
  const outputDir = path.join(PROJECT_ROOT, 'publications/drafts/reviews', `version-${version}`);
  await fs.mkdir(outputDir, { recursive: true });

  const today = new Date().toISOString().split('T')[0];

  // Determine recommendation from content
  let recommendation = 'Unknown';
  const recMatch = content.match(/\*\*Recommendation:\*\*\s*(.+?)(?:\n|$)/i);
  if (recMatch) {
    recommendation = recMatch[1].trim();
  }

  const frontmatter = `---
paper: "01-isru-economic-crossover"
version: "${version}"
modelId: "${modelKey}"
modelName: "${model.name}"
reviewed: "${today}"
recommendation: "${recommendation}"
---

`;

  const outputPath = path.join(outputDir, model.filename);
  await fs.writeFile(outputPath, frontmatter + content, 'utf-8');
  console.log(`  Saved: ${outputPath}`);
  return { modelKey, recommendation };
}

async function main() {
  if (!DATABRICKS_TOKEN) {
    console.error('Error: DATABRICKS_TOKEN not set. Run: source .env');
    process.exit(1);
  }

  // Parse args
  const args = process.argv.slice(2);
  const versionArg = args.find(a => a.startsWith('--version='));
  const modelArg = args.find(a => a.startsWith('--model='));

  if (!versionArg) {
    console.error('Usage: node scripts/run-peer-review.js --version=ab [--model=gemini-3-pro]');
    process.exit(1);
  }

  const version = versionArg.split('=')[1];
  const specificModel = modelArg ? modelArg.split('=')[1] : null;

  // Load paper
  const paperPath = path.join(PROJECT_ROOT, 'publications/drafts', `01-isru-economic-crossover-${version}.tex`);
  console.log(`Loading paper: ${paperPath}`);
  const paperContent = await fs.readFile(paperPath, 'utf-8');
  console.log(`  Paper loaded (${paperContent.length} chars, ${paperContent.split('\n').length} lines)\n`);

  const prompt = buildReviewPrompt(paperContent, version);

  // Query models
  const modelsToQuery = specificModel ? [specificModel] : Object.keys(MODELS);
  const results = [];

  for (const modelKey of modelsToQuery) {
    if (!MODELS[modelKey]) {
      console.error(`Unknown model: ${modelKey}`);
      continue;
    }
    try {
      const content = await queryModel(modelKey, prompt);
      if (content) {
        const result = await saveReview(modelKey, content, version);
        results.push(result);
      }
    } catch (err) {
      console.error(`  Error with ${modelKey}: ${err.message}`);
    }
    console.log();
  }

  // Summary
  console.log('\n=== Review Summary ===');
  for (const r of results) {
    console.log(`  ${MODELS[r.modelKey].name}: ${r.recommendation}`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
