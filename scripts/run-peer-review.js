#!/usr/bin/env node

/**
 * Run peer reviews of papers across multiple LLM models via Databricks API.
 *
 * Usage:
 *   source .env
 *   node scripts/run-peer-review.js --paper=01 --version=ab
 *   node scripts/run-peer-review.js --paper=02 --version=ca --model=gemini-3-pro
 *   node scripts/run-peer-review.js --version=ab   # defaults to --paper=01
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

const PAPER_CONFIGS = {
  '03': {
    slug: '03-multi-model-ai-consensus',
    texPrefix: '03-multi-model-ai-consensus',
    dir: 'publications/drafts/03-multi-model-ai-consensus',
    reviewDir: 'publications/drafts/03-multi-model-ai-consensus/reviews',
    systemPrompt: 'You are an expert peer reviewer for IEEE Intelligent Systems. You have deep expertise in multi-agent AI systems, LLM evaluation, engineering design methodology, and empirical research methods.',
    expertise: 'multi-agent LLM systems, Delphi method, engineering trade studies, structured deliberation, sycophancy/anchoring analysis, Monte Carlo reliability, and empirical research design',
    attentionItems: `- Whether the new controlled baselines (Section 5.5) adequately address the absence-of-baselines criticism
- Whether the similarity analysis reframing as "descriptive characterization" is appropriate
- Whether the definitions paragraph (sycophancy vs anchoring vs convergence vs herding) is precise
- Whether the manuscript tightening has removed important content
- Whether the divergent views schema remains the paper's strongest contribution
- Whether the paper now overclaims or underclaims relative to the evidence`
  },
  '01': {
    slug: '01-isru-economic-crossover',
    texPrefix: '01-isru-economic-crossover',
    dir: 'publications/drafts/01-isru-economic-crossover',
    reviewDir: 'publications/drafts/reviews',
    systemPrompt: 'You are an expert peer reviewer for aerospace engineering and space economics journals.',
    expertise: 'aerospace manufacturing costs, learning curves, ISRU technology, Monte Carlo simulation, and NPV analysis',
    attentionItems: `- Whether the re-crossing (N**) analysis adequately characterizes transient crossovers
- Whether the Earth learning offset (n_0) sensitivity is well-motivated
- Whether the decision tree figure adds practical value
- Whether the technology obsolescence discussion is sufficient
- Whether the "validated" language has been appropriately softened
- Whether the vitamin BOM table is now clear`
  },
  '04': {
    slug: '04-microgravity-metallurgy',
    texPrefix: '04-microgravity-metallurgy',
    dir: 'publications/drafts/04-microgravity-metallurgy',
    reviewDir: 'publications/drafts/04-microgravity-metallurgy/reviews',
    systemPrompt: 'You are an expert peer reviewer for Acta Astronautica. You have deep expertise in space manufacturing, metallurgy, materials science, microgravity processing, and in-situ resource utilization.',
    expertise: 'metallurgy and materials processing, microgravity science, artificial gravity station design, zone refining, electrolysis, ISRU technology scaling, and TRL assessment',
    attentionItems: `- Whether the gravity sensitivity analysis (Section 3) is quantitatively supported or relies too heavily on dimensional analysis extrapolation
- Whether the hybrid multi-gravity-zone architecture (Section 4) mass estimates are credible
- Whether the Gate 1 criteria (Section 5) are objectively measurable and appropriately scoped
- Whether the research roadmap costs ($550-810M) are realistic
- Whether the paper adequately addresses Coriolis effects on large melt pools in the rotating module
- Whether the electrolysis section is sufficiently integrated or feels bolted on`
  },
  '05': {
    slug: '05-isru-water-extraction',
    texPrefix: '05-isru-water-extraction',
    dir: 'publications/drafts/05-isru-water-extraction',
    reviewDir: 'publications/drafts/05-isru-water-extraction/reviews',
    systemPrompt: 'You are an expert peer reviewer for Advances in Space Research. You have deep expertise in ISRU economics, asteroid science, lunar science, propellant production, and Monte Carlo simulation.',
    expertise: 'ISRU technology and economics, asteroid composition and mining, lunar polar ice extraction, space propellant logistics, Monte Carlo cost modeling, and NPV analysis',
    attentionItems: `- Whether the asteroid vs. lunar cost comparison is fair (same fidelity for both sources)
- Whether the transport cost model adequately captures EP vs. chemical propulsion differences
- Whether the Monte Carlo parameter ranges are well-justified (especially for asteroid water fraction)
- Whether the Bennu sample data is appropriately extrapolated to the broader C-type NEA population
- Whether the 91% probability claim is robust to correlated parameters
- Whether Phobos/Deimos inclusion adds value or is a distraction`
  },
  '02': {
    slug: '02-swarm-coordination-scaling',
    texPrefix: '02-swarm-coordination-scaling',
    dir: 'publications/drafts/02-swarm-coordination-scaling',
    reviewDir: 'publications/drafts/02-swarm-coordination-scaling/reviews',
    systemPrompt: 'You are an expert peer reviewer for IEEE Transactions on Aerospace and Electronic Systems. You have deep expertise in distributed systems, spacecraft autonomy, communication protocols, TDMA scheduling, and swarm coordination.',
    expertise: 'distributed systems, spacecraft communication protocols, TDMA/MAC scheduling, swarm coordination, queueing theory, and Monte Carlo simulation',
    attentionItems: `- Whether the campaign duty factor (d) adequately addresses workload realism concerns
- Whether the gamma unification (0.76 validated via CCSDS, replacing the earlier 0.85) is consistently applied
- Whether the stress-case (eta_S ~ 46%) is now properly contextualized as a continuous-duty upper bound
- Whether the three-layer feasibility framework (byte budget, MAC efficiency, TDMA airtime) is sound
- Whether the DES verification provides genuine value beyond confirming its own equations
- Whether the packet-level validation (Section IV-J) provides adequate independent validation
- Whether the generalized gamma expression is useful for practitioners`
  }
};

function buildReviewPrompt(paperContent, version, paperNum) {
  const config = PAPER_CONFIGS[paperNum];
  return `You are an expert peer reviewer for a top-tier aerospace engineering journal (such as IEEE Transactions on Aerospace and Electronic Systems or Advances in Space Research). You have deep expertise in ${config.expertise}.

Please provide a thorough peer review of the following manuscript (Version ${version.toUpperCase()}). Structure your review with ten scored sections (1-5 scale) followed by actionable feedback:

## 1. Significance & Novelty
**Rating: X (descriptor)**
Assessment of the paper's contribution to the field.

## 2. Methodological Soundness
**Rating: X (descriptor)**
Assessment of the model, simulation framework, and analytical methods.

## 3. Validity & Logic
**Rating: X (descriptor)**
Assessment of internal consistency, assumptions, and logical coherence.

## 4. Clarity & Structure
**Rating: X (descriptor)**
Assessment of writing, figures, tables, and overall organization.

## 5. Ethical Compliance
**Rating: X (descriptor)**
Assessment of data availability, reproducibility, and AI disclosure.

## 6. Scope & Referencing
**Rating: X (descriptor)**
Assessment of literature coverage and appropriateness for the target journal.

## Major Issues
Numbered list of substantive concerns that must be addressed. For each:
- State the issue clearly
- Explain why it matters
- Suggest a specific remedy

## Minor Issues
Numbered list of smaller concerns (typos, clarifications, presentation tweaks).

## Overall Recommendation
**Recommendation:** [Accept / Accept with Minor Revisions / Major Revision / Reject]

Provide a 2-3 paragraph summary of your overall assessment, highlighting strengths and the most critical improvements needed.

## Constructive Suggestions
Specific suggestions for improvement, ordered by impact.

---

Rating scale: 1 (Poor), 2 (Below Average), 3 (Adequate), 4 (Good), 5 (Excellent).

Be rigorous but constructive. Focus on scientific substance over formatting. If previous versions addressed an issue, acknowledge the improvement rather than re-raising it. Pay particular attention to:
${config.attentionItems}

Here is the full manuscript:

${paperContent}`;
}

async function queryModel(modelKey, prompt, systemPrompt) {
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
          content: systemPrompt
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

async function saveReview(modelKey, content, version, paperNum) {
  const model = MODELS[modelKey];
  const config = PAPER_CONFIGS[paperNum];
  const outputDir = path.join(PROJECT_ROOT, config.reviewDir, `version-${version}`);
  await fs.mkdir(outputDir, { recursive: true });

  const today = new Date().toISOString().split('T')[0];

  // Determine recommendation from content
  let recommendation = 'Unknown';
  const recMatch = content.match(/\*\*Recommendation[:\s]*\*\*\s*\**(.+?)\**\s*(?:\n|$)/i);
  if (recMatch) {
    recommendation = recMatch[1].replace(/\*+/g, '').trim();
  }

  const frontmatter = `---
paper: "${config.slug}"
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
  const paperArg = args.find(a => a.startsWith('--paper='));

  if (!versionArg) {
    console.error('Usage: node scripts/run-peer-review.js --paper=02 --version=ca [--model=gemini-3-pro]');
    process.exit(1);
  }

  const version = versionArg.split('=')[1];
  const specificModel = modelArg ? modelArg.split('=')[1] : null;
  const paperNum = paperArg ? paperArg.split('=')[1] : '01';

  if (!PAPER_CONFIGS[paperNum]) {
    console.error(`Unknown paper: ${paperNum}. Available: ${Object.keys(PAPER_CONFIGS).join(', ')}`);
    process.exit(1);
  }

  const config = PAPER_CONFIGS[paperNum];
  console.log(`Paper: ${config.slug} (Version ${version.toUpperCase()})\n`);

  // Load paper
  const paperPath = path.join(PROJECT_ROOT, config.dir, `${config.texPrefix}-${version}.tex`);
  console.log(`Loading paper: ${paperPath}`);
  const paperContent = await fs.readFile(paperPath, 'utf-8');
  console.log(`  Paper loaded (${paperContent.length} chars, ${paperContent.split('\n').length} lines)\n`);

  const prompt = buildReviewPrompt(paperContent, version, paperNum);

  // Query models
  const modelsToQuery = specificModel ? [specificModel] : Object.keys(MODELS);
  const results = [];

  for (const modelKey of modelsToQuery) {
    if (!MODELS[modelKey]) {
      console.error(`Unknown model: ${modelKey}`);
      continue;
    }
    try {
      const content = await queryModel(modelKey, prompt, config.systemPrompt);
      if (content) {
        const result = await saveReview(modelKey, content, version, paperNum);
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
