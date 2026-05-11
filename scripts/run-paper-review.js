#!/usr/bin/env node

/**
 * Paper-level peer review using the new Databricks-hosted models (Claude Opus 4.7,
 * Gemini 3.1 Pro, GPT-5.5 Pro) on workspace adb-7405606309889705.
 *
 * Sister script to scripts/run-holistic-review.js (project-level review with the same
 * trio) and scripts/run-peer-review.js (paper-level review with the older trio on
 * the older workspace).
 *
 * Authenticates by shelling out to the local `databricks` CLI (no DATABRICKS_TOKEN env var).
 * If the cached token has expired, run:
 *   databricks auth login --profile claude-code
 *
 * Usage:
 *   node scripts/run-paper-review.js                       # paper 01, latest version, all 3 models
 *   node scripts/run-paper-review.js --paper=01 --version=am
 *   node scripts/run-paper-review.js --model=gemini-3-1-pro
 *   node scripts/run-paper-review.js --dry-run
 */

import fs from 'fs/promises';
import path from 'path';
import https from 'node:https';
import { URL } from 'node:url';
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

// Paper-specific prompt content copied verbatim from scripts/run-peer-review.js
// (PAPER_CONFIGS), so old-model and new-model reviews remain comparable.
const PAPER_CONFIGS = {
  '01': {
    slug: '01-isru-economic-crossover',
    texPrefix: '01-isru-economic-crossover',
    dir: 'publications/drafts/01-isru-economic-crossover',
    reviewDir: 'publications/drafts/01-isru-economic-crossover/reviews',
    systemPrompt: 'You are an expert peer reviewer for aerospace engineering and space economics journals.',
    expertise: 'aerospace manufacturing costs, learning curves, ISRU technology, Monte Carlo simulation, and NPV analysis',
    attentionItems: `- Whether the re-crossing (N**) analysis adequately characterizes transient crossovers
- Whether the Earth learning offset (n_0) sensitivity is well-motivated
- Whether the decision tree figure adds practical value
- Whether the technology obsolescence discussion is sufficient
- Whether the "validated" language has been appropriately softened
- Whether the vitamin BOM table is now clear`
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
  },
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
  }
};

function parseArgs(argv) {
  const args = argv.slice(2);
  const get = (name, def = null) => {
    const found = args.find(a => a.startsWith(`--${name}=`));
    return found ? found.split('=').slice(1).join('=') : def;
  };
  const has = (name) => args.includes(`--${name}`);
  return {
    paper: get('paper', '01'),
    version: get('version'),
    profile: get('profile', 'claude-code'),
    model: get('model'),
    dryRun: has('dry-run')
  };
}

function httpsPostJson(urlStr, headers, bodyBuf, socketTimeoutMs) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + (u.search || ''),
      method: 'POST',
      headers: { ...headers, 'Content-Length': bodyBuf.length }
    }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve({
        status: res.statusCode,
        body: Buffer.concat(chunks).toString('utf8')
      }));
      res.on('error', reject);
    });
    req.setTimeout(socketTimeoutMs, () => {
      req.destroy(new Error(`Socket inactivity timeout after ${Math.round(socketTimeoutMs / 1000)}s`));
    });
    req.on('error', reject);
    req.write(bodyBuf);
    req.end();
  });
}

// Streaming POST for SSE responses (used to bypass the 300s synchronous gateway
// deadline on the OpenAI Responses API for long reasoning-model generations).
function httpsPostJsonStream(urlStr, headers, bodyBuf, socketTimeoutMs, onEvent) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const req = https.request({
      hostname: u.hostname,
      port: u.port || 443,
      path: u.pathname + (u.search || ''),
      method: 'POST',
      headers: {
        ...headers,
        'Content-Length': bodyBuf.length,
        'Accept': 'text/event-stream'
      }
    }, (res) => {
      // Non-2xx: capture the body as a normal response for error handling.
      if (res.statusCode >= 400) {
        const chunks = [];
        res.on('data', (c) => chunks.push(c));
        res.on('end', () => resolve({
          status: res.statusCode,
          body: Buffer.concat(chunks).toString('utf8'),
          events: []
        }));
        res.on('error', reject);
        return;
      }
      let buffer = '';
      const events = [];
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        buffer += chunk;
        let idx;
        while ((idx = buffer.indexOf('\n\n')) !== -1) {
          const raw = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          const dataLines = raw
            .split('\n')
            .filter((l) => l.startsWith('data: '))
            .map((l) => l.slice(6));
          if (dataLines.length === 0) continue;
          const dataStr = dataLines.join('');
          if (dataStr === '[DONE]') continue;
          try {
            const parsed = JSON.parse(dataStr);
            events.push(parsed);
            if (onEvent) onEvent(parsed);
          } catch {
            /* ignore unparseable */
          }
        }
      });
      res.on('end', () => resolve({ status: res.statusCode, events, body: '' }));
      res.on('error', reject);
    });
    req.setTimeout(socketTimeoutMs, () => {
      req.destroy(new Error(`Socket inactivity timeout after ${Math.round(socketTimeoutMs / 1000)}s`));
    });
    req.on('error', reject);
    req.write(bodyBuf);
    req.end();
  });
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

async function detectLatestVersion(config) {
  const dir = path.join(PROJECT_ROOT, config.dir);
  const files = await fs.readdir(dir);
  const re = new RegExp(`^${config.texPrefix}-([a-z]+)\\.tex$`);
  const versions = files.map(f => f.match(re)?.[1]).filter(Boolean);
  if (versions.length === 0) {
    throw new Error(`No versioned .tex files found in ${dir} matching prefix ${config.texPrefix}.`);
  }
  // Longer suffix first (so `am` > `z`); within same length, lexicographic.
  versions.sort((a, b) => (a.length - b.length) || a.localeCompare(b));
  return versions[versions.length - 1];
}

function buildReviewPrompt(paperContent, version, paperNum) {
  const config = PAPER_CONFIGS[paperNum];
  const versionUpper = version.toUpperCase();
  return `You are an expert peer reviewer for a top-tier aerospace engineering journal (such as IEEE Transactions on Aerospace and Electronic Systems or Advances in Space Research). You have deep expertise in ${config.expertise}.

Please provide a thorough peer review of the following manuscript (Version ${versionUpper}). Structure your review with ten scored sections (1-5 scale) followed by actionable feedback:

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

function extractChatContent(data) {
  let content = data.choices?.[0]?.message?.content;
  if (Array.isArray(content)) {
    content = content.map(c => (typeof c === 'string' ? c : c?.text || '')).join('');
  }
  return content;
}

function extractResponsesContent(data) {
  // Streaming form: { __streamEvents: [...] }
  if (Array.isArray(data?.__streamEvents)) {
    const events = data.__streamEvents;
    // Prefer the final `response.completed` event if present — it carries the
    // full assembled response object.
    const completed = events.find((e) => e?.type === 'response.completed');
    if (completed?.response) {
      const fromCompleted = extractResponsesContent(completed.response);
      if (fromCompleted) return fromCompleted;
    }
    // Fallback: concatenate output_text deltas.
    const parts = events
      .filter((e) => e?.type === 'response.output_text.delta' && typeof e.delta === 'string')
      .map((e) => e.delta);
    if (parts.length > 0) return parts.join('');
    // Last resort: look for any event carrying a full text payload.
    for (const e of events) {
      if (typeof e?.text === 'string' && e.text.length > 0) return e.text;
    }
    return null;
  }
  if (typeof data?.output_text === 'string' && data.output_text.length > 0) {
    return data.output_text;
  }
  if (Array.isArray(data?.output)) {
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

async function queryModel(modelKey, userPrompt, systemPrompt, token) {
  const model = MODELS[modelKey];
  const url = `${DATABRICKS_HOST}${model.endpoint}`;

  let body;
  if (model.api === 'chat') {
    body = {
      model: model.id,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    };
  } else if (model.api === 'responses') {
    // Stream to keep the connection alive while the model reasons, AND drop
    // reasoning.effort to "low" — Databricks enforces a hard 300s synchronous
    // deadline (background mode is rejected, retrieval endpoint doesn't exist),
    // so high-effort reasoning on a 150KB prompt cannot complete in time.
    const combined = `${systemPrompt}\n\n${userPrompt}`;
    body = {
      model: model.id,
      input: [
        { role: 'user', content: [{ type: 'input_text', text: combined }] }
      ],
      stream: true,
      reasoning: { effort: 'medium' }
    };
  } else {
    throw new Error(`Unknown api type: ${model.api}`);
  }

  console.log(`  Querying ${model.name} (${model.api}${model.api === 'responses' ? ', streaming' : ''})...`);
  const startTime = Date.now();
  const bodyJson = Buffer.from(JSON.stringify(body), 'utf8');

  // node:https instead of fetch: undici (Node's fetch impl) has a hardcoded
  // ~300s headers timeout we can't override without adding the undici package.
  const SOCKET_TIMEOUT_MS = 1500_000; // 25 min of socket inactivity
  const MAX_ATTEMPTS = 2;
  let data;
  let lastErr;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      if (model.api === 'responses') {
        let lastProgressLog = 0;
        let deltaCount = 0;
        const result = await httpsPostJsonStream(url, headers, bodyJson, SOCKET_TIMEOUT_MS, (ev) => {
          if (ev?.type === 'response.output_text.delta') {
            deltaCount++;
            const now = Date.now();
            if (now - lastProgressLog > 30000) {
              const sec = ((now - startTime) / 1000).toFixed(0);
              console.log(`    ...${sec}s elapsed, ${deltaCount} deltas streamed`);
              lastProgressLog = now;
            }
          }
        });
        if (result.status >= 400) {
          throw new Error(`${model.name} API error (${result.status}): ${result.body.slice(0, 1000)}`);
        }
        data = { __streamEvents: result.events };
      } else {
        const { status, body: respBody } = await httpsPostJson(url, headers, bodyJson, SOCKET_TIMEOUT_MS);
        if (status >= 400) {
          throw new Error(`${model.name} API error (${status}): ${respBody.slice(0, 1000)}`);
        }
        data = JSON.parse(respBody);
      }
      lastErr = null;
      break;
    } catch (e) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      const cause = e?.cause ? ` cause=${e.cause.code || ''} ${e.cause.message || e.cause}` : '';
      console.log(`  ${model.name} attempt ${attempt}/${MAX_ATTEMPTS} failed after ${elapsed}s: ${e.message}${cause}`);
      lastErr = e;
      // Don't retry on 4xx (client errors); only on transient network/5xx.
      if (/API error \(4\d\d\)/.test(e.message)) break;
      if (attempt < MAX_ATTEMPTS) {
        await new Promise(r => setTimeout(r, 5000));
      }
    }
  }
  if (lastErr) throw lastErr;
  const content = model.api === 'chat' ? extractChatContent(data) : extractResponsesContent(data);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  let finishReason = 'n/a';
  if (model.api === 'chat') {
    finishReason = data.choices?.[0]?.finish_reason || 'n/a';
  } else if (model.api === 'responses') {
    const completed = data.__streamEvents?.find?.((e) => e?.type === 'response.completed');
    finishReason = completed?.response?.status || completed?.type || 'streamed';
  }
  console.log(`  ${model.name} responded in ${elapsed}s (${content?.length || 0} chars, finish: ${finishReason})`);

  if (!content || content.length < 100) {
    console.log(`  WARNING: Response too short. Raw response head:`, JSON.stringify(data).slice(0, 600));
  }

  return content;
}

function extractRecommendation(content) {
  // Format A: **Recommendation:** Value   (colon + closing bold first, value after)
  let m = content.match(/\*\*Recommendation[:\s]*\*\*\s*([^\n*]+)/i);
  if (m) return m[1].replace(/\*+/g, '').trim();
  // Format B: **Recommendation: Value**   (everything inside bold)
  m = content.match(/\*\*Recommendation[:\s]+([^\n*]+?)\*\*/i);
  if (m) return m[1].replace(/\*+/g, '').trim();
  // Format C: ## Overall Recommendation\n\nValue
  m = content.match(/##\s+Overall Recommendation[^\n]*\n+\s*\**([^\n*]+?)\**\s*(?:\n|$)/i);
  if (m) {
    const v = m[1].replace(/\*+/g, '').trim();
    // Skip if it's just the word "Recommendation:" prefix
    if (!/^Recommendation/i.test(v) && v.length > 0) return v;
  }
  return 'Unknown';
}

async function saveReview(modelKey, content, version, paperNum, profile) {
  const model = MODELS[modelKey];
  const config = PAPER_CONFIGS[paperNum];
  const outputDir = path.join(PROJECT_ROOT, config.reviewDir, `version-${version}`);
  await fs.mkdir(outputDir, { recursive: true });

  const today = new Date().toISOString().split('T')[0];
  const recommendation = extractRecommendation(content);

  const frontmatter = `---
paper: "${config.slug}"
version: "${version}"
modelId: "${model.id}"
modelName: "${model.name}"
reviewed: "${today}"
profile: "${profile}"
recommendation: "${recommendation}"
---

`;

  const outputPath = path.join(outputDir, model.filename);
  await fs.writeFile(outputPath, frontmatter + content, 'utf-8');
  console.log(`  Saved: ${path.relative(PROJECT_ROOT, outputPath)} (recommendation: ${recommendation})`);
  return { modelKey, recommendation, path: outputPath };
}

async function main() {
  const opts = parseArgs(process.argv);

  if (!PAPER_CONFIGS[opts.paper]) {
    console.error(`Unknown paper: ${opts.paper}. Available: ${Object.keys(PAPER_CONFIGS).join(', ')}`);
    process.exit(1);
  }
  const config = PAPER_CONFIGS[opts.paper];

  const version = opts.version || await detectLatestVersion(config);

  console.log('Project Dyson — Paper Review (new models)');
  console.log(`  Workspace: ${DATABRICKS_HOST}`);
  console.log(`  Profile:   ${opts.profile}`);
  console.log(`  Paper:     ${opts.paper} (${config.slug})`);
  console.log(`  Version:   ${version}${opts.version ? '' : ' (auto-detected latest)'}`);
  console.log(`  Models:    ${opts.model || Object.keys(MODELS).join(', ')}`);
  console.log(`  Dry run:   ${opts.dryRun ? 'yes' : 'no'}\n`);

  const paperPath = path.join(PROJECT_ROOT, config.dir, `${config.texPrefix}-${version}.tex`);
  console.log(`Loading paper: ${path.relative(PROJECT_ROOT, paperPath)}`);
  const paperContent = await fs.readFile(paperPath, 'utf-8');
  console.log(`  Paper: ${paperContent.length} chars, ${paperContent.split('\n').length} lines\n`);

  const userPrompt = buildReviewPrompt(paperContent, version, opts.paper);
  console.log(`Final prompt: ${userPrompt.length} chars\n`);

  const outDir = path.join(PROJECT_ROOT, config.reviewDir, `version-${version}`);
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
      const content = await queryModel(modelKey, userPrompt, config.systemPrompt, token);
      if (content) {
        const r = await saveReview(modelKey, content, version, opts.paper, opts.profile);
        written.push(r);
      } else {
        console.error(`  ${modelKey}: empty content, nothing written.`);
      }
    } catch (err) {
      console.error(`  Error with ${modelKey}: ${err.message}`);
    }
    console.log();
  }

  console.log('=== Paper Review Summary ===');
  console.log(`  Paper:   ${config.slug}`);
  console.log(`  Version: ${version}`);
  for (const w of written) {
    console.log(`  ${MODELS[w.modelKey].name}: ${w.recommendation}`);
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
