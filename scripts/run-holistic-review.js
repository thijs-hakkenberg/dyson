#!/usr/bin/env node

/**
 * Run a holistic, project-level review of Project Dyson across multiple LLM models
 * via the Databricks AI gateway on workspace adb-7405606309889705.
 *
 * Authenticates by shelling out to the local `databricks` CLI (no DATABRICKS_TOKEN env var).
 * If the cached token has expired, run:
 *   databricks auth login --profile claude-code
 *
 * Usage:
 *   node scripts/run-holistic-review.js
 *   node scripts/run-holistic-review.js --model=claude-opus-4-7
 *   node scripts/run-holistic-review.js --profile=claude-code --out-dir=publications/holistic-review/custom
 *   node scripts/run-holistic-review.js --dry-run
 */

import fs from 'fs/promises';
import path from 'path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

const DATABRICKS_HOST = 'https://adb-7405606309889705.5.azuredatabricks.net';

const MODELS = {
  'claude-opus-4-7': {
    id: 'databricks-claude-opus-4-7',
    name: 'Claude Opus 4.7',
    filename: 'claude-opus-4-7.md',
    endpoint: '/ai-gateway/mlflow/v1/chat/completions',
    api: 'chat'
  },
  'gemini-3-1-pro': {
    id: 'databricks-gemini-3-1-pro',
    name: 'Gemini 3.1 Pro',
    filename: 'gemini-3-1-pro.md',
    endpoint: '/ai-gateway/mlflow/v1/chat/completions',
    api: 'chat'
  },
  'gpt-5-5-pro': {
    id: 'databricks-gpt-5-5-pro',
    name: 'GPT-5.5 Pro',
    filename: 'gpt-5-5-pro.md',
    endpoint: '/ai-gateway/openai/v1/responses',
    api: 'responses'
  }
};

const PROJECT_DOCS = [
  { path: 'README.md', label: 'Project README' },
  { path: 'publications/RESEARCH-ROADMAP.md', label: 'Research Roadmap' },
  { path: 'publications/publication-assessment.md', label: 'Publication Assessment' },
  { path: 'publications/handover/CONSOLIDATED-HANDOVER.md', label: 'Consolidated Literature Handover' }
];

const SYSTEM_PROMPT =
  'You are a senior interdisciplinary reviewer evaluating Project Dyson, a non-profit, ' +
  'multi-model AI-assisted initiative planning a phased Dyson swarm. You hold standards ' +
  'equivalent to a top journal editor across aerospace engineering, space economics, ' +
  'distributed systems, materials science, and research methodology. Be candid, specific, ' +
  'and constructive.';

const REVIEW_INSTRUCTIONS = `You are reviewing the project as a whole, NOT a single paper. The corpus below contains the
project's high-level documents (README, research roadmap, cross-paper publication assessment, and
consolidated literature-integration handover). Use these to form a holistic judgment.

Structure your review with these sections:

## 1. Overall Coherence of the Research Program
Does the program hang together as a coherent intellectual project, or does it read as a portfolio
of loosely related papers? Cite specific evidence.

## 2. Strongest Contributions
What are the two or three most important things this project is producing? Why?

## 3. Most Significant Gaps, Contradictions, or Weaknesses
Cross-paper inconsistencies, missing pieces, unsupported claims, or areas where the program
underdelivers on its stated ambition. Be specific — name papers, sections, or topics.

## 4. Methodological Critique
Evaluate:
- The multi-model AI consensus methodology (claude/gemini/gpt synthesis)
- AI-assisted-research disclosure and reproducibility
- The validation roadmap as a way to ground speculative engineering
- Whether the "divergent views preserved, not eliminated" principle is actually held

## 5. Risk Assessment
What is most likely to invalidate the program over the next 1–3 years? Rank the top three risks
by likelihood × impact.

## 6. Prioritized Recommendations (Next 6–12 Months)
A numbered, ordered-by-impact list. For each: what to do, why, and a concrete first step.

## 7. Go / No-Go Judgement
**Verdict:** [Continue as planned / Continue with material changes / Pause and refocus / Abandon]
Explain in 2–3 paragraphs.

Be rigorous but constructive. Quote specific phrases or section names from the corpus where it
sharpens the critique. If something is genuinely strong, say so plainly — do not manufacture
weaknesses for balance.

The corpus follows.

`;

function parseArgs(argv) {
  const args = argv.slice(2);
  const get = (name, def = null) => {
    const found = args.find(a => a.startsWith(`--${name}=`));
    return found ? found.split('=').slice(1).join('=') : def;
  };
  const has = (name) => args.includes(`--${name}`);
  return {
    profile: get('profile', 'claude-code'),
    model: get('model'),
    outDir: get('out-dir'),
    dryRun: has('dry-run')
  };
}

function getAccessToken(profile) {
  try {
    const raw = execFileSync(
      'databricks',
      ['auth', 'token', '--profile', profile, '-o', 'json'],
      { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
    );
    const parsed = JSON.parse(raw);
    if (!parsed.access_token) {
      throw new Error(`databricks CLI returned no access_token. Raw output: ${raw}`);
    }
    return parsed.access_token;
  } catch (e) {
    const stderr = e.stderr ? e.stderr.toString() : '';
    throw new Error(
      `Failed to get Databricks token via CLI for profile "${profile}".\n` +
      `Try: databricks auth login --profile ${profile}\n` +
      `CLI stderr: ${stderr || e.message}`
    );
  }
}

async function loadCorpus() {
  const parts = [];
  let totalChars = 0;
  for (const doc of PROJECT_DOCS) {
    const fullPath = path.join(PROJECT_ROOT, doc.path);
    const content = await fs.readFile(fullPath, 'utf-8');
    parts.push(`=== FILE: ${doc.label} (${doc.path}) ===\n\n${content.trim()}\n`);
    totalChars += content.length;
    console.log(`  Loaded ${doc.path} (${content.length} chars)`);
  }
  console.log(`  Corpus total: ${totalChars} chars across ${PROJECT_DOCS.length} files\n`);
  return parts.join('\n');
}

function buildPrompt(corpus) {
  return `${REVIEW_INSTRUCTIONS}${corpus}`;
}

function extractChatContent(data) {
  let content = data.choices?.[0]?.message?.content;
  if (Array.isArray(content)) {
    content = content.map(c => (typeof c === 'string' ? c : c?.text || '')).join('');
  }
  return content;
}

function extractResponsesContent(data) {
  if (typeof data.output_text === 'string' && data.output_text.length > 0) {
    return data.output_text;
  }
  if (Array.isArray(data.output)) {
    const parts = [];
    for (const item of data.output) {
      const inner = item?.content;
      if (Array.isArray(inner)) {
        for (const c of inner) {
          if (typeof c?.text === 'string') parts.push(c.text);
        }
      } else if (typeof inner === 'string') {
        parts.push(inner);
      }
    }
    if (parts.length > 0) return parts.join('');
  }
  return null;
}

async function queryModel(modelKey, userPrompt, token) {
  const model = MODELS[modelKey];
  const url = `${DATABRICKS_HOST}${model.endpoint}`;

  let body;
  if (model.api === 'chat') {
    body = {
      model: model.id,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ]
    };
  } else if (model.api === 'responses') {
    const combined = `${SYSTEM_PROMPT}\n\n${userPrompt}`;
    body = {
      model: model.id,
      input: [
        { role: 'user', content: [{ type: 'input_text', text: combined }] }
      ]
    };
  } else {
    throw new Error(`Unknown api type: ${model.api}`);
  }

  console.log(`  Querying ${model.name} (${model.api})...`);
  const startTime = Date.now();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 900000);

  let response;
  try {
    response = await fetch(url, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${model.name} API error (${response.status}): ${errorText.slice(0, 1000)}`);
  }

  const data = await response.json();
  const content = model.api === 'chat' ? extractChatContent(data) : extractResponsesContent(data);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const finishReason = data.choices?.[0]?.finish_reason || data.status || 'n/a';
  console.log(`  ${model.name} responded in ${elapsed}s (${content?.length || 0} chars, finish: ${finishReason})`);

  if (!content || content.length < 100) {
    console.log(`  WARNING: Response too short. Raw response head:`, JSON.stringify(data).slice(0, 600));
  }

  return content;
}

async function saveReview(modelKey, content, outDir, profile) {
  const model = MODELS[modelKey];
  await fs.mkdir(outDir, { recursive: true });
  const today = new Date().toISOString().split('T')[0];

  const inputsYaml = PROJECT_DOCS.map(d => `  - ${d.path}`).join('\n');
  const frontmatter = `---
review: holistic
modelId: ${model.id}
modelName: ${model.name}
generated: ${today}
profile: ${profile}
inputs:
${inputsYaml}
---

`;

  const outputPath = path.join(outDir, model.filename);
  await fs.writeFile(outputPath, frontmatter + content, 'utf-8');
  console.log(`  Saved: ${path.relative(PROJECT_ROOT, outputPath)}`);
  return outputPath;
}

async function main() {
  const opts = parseArgs(process.argv);

  console.log('Project Dyson — Holistic Review');
  console.log(`  Workspace: ${DATABRICKS_HOST}`);
  console.log(`  Profile:   ${opts.profile}`);
  console.log(`  Models:    ${opts.model || Object.keys(MODELS).join(', ')}`);
  console.log(`  Dry run:   ${opts.dryRun ? 'yes' : 'no'}\n`);

  console.log('Loading corpus...');
  const corpus = await loadCorpus();
  const userPrompt = buildPrompt(corpus);
  console.log(`Final prompt: ${userPrompt.length} chars\n`);

  const today = new Date().toISOString().split('T')[0];
  const defaultOutDir = path.join(PROJECT_ROOT, 'publications', 'holistic-review', today);
  const outDir = opts.outDir
    ? path.resolve(PROJECT_ROOT, opts.outDir)
    : defaultOutDir;

  const modelKeys = opts.model ? [opts.model] : Object.keys(MODELS);
  for (const k of modelKeys) {
    if (!MODELS[k]) {
      console.error(`Unknown model: ${k}. Available: ${Object.keys(MODELS).join(', ')}`);
      process.exit(1);
    }
  }

  if (opts.dryRun) {
    console.log('Dry run — would write the following files:');
    for (const k of modelKeys) {
      const planned = path.join(outDir, MODELS[k].filename);
      console.log(`  ${path.relative(PROJECT_ROOT, planned)}`);
    }
    console.log('\nFirst 600 chars of merged user prompt:\n');
    console.log(userPrompt.slice(0, 600));
    return;
  }

  console.log('Acquiring Databricks access token via CLI...');
  const token = getAccessToken(opts.profile);
  console.log('  OK (token acquired)\n');

  const written = [];
  for (const modelKey of modelKeys) {
    try {
      const content = await queryModel(modelKey, userPrompt, token);
      if (content) {
        const p = await saveReview(modelKey, content, outDir, opts.profile);
        written.push({ modelKey, path: p });
      } else {
        console.error(`  ${modelKey}: empty content, nothing written.`);
      }
    } catch (err) {
      console.error(`  Error with ${modelKey}: ${err.message}`);
    }
    console.log();
  }

  console.log('=== Holistic Review Summary ===');
  for (const w of written) {
    console.log(`  ${MODELS[w.modelKey].name}: ${path.relative(PROJECT_ROOT, w.path)}`);
  }
  if (written.length === 0) {
    console.log('  (no files written)');
    process.exit(1);
  }
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
