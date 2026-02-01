#!/usr/bin/env node

/**
 * Generate Rich Context for Research Questions
 *
 * This script queries Claude via Databricks API to generate detailed context
 * for each research question based on the source BOM item's consensus document.
 *
 * Usage:
 *   node scripts/generate-question-context.js
 *   node scripts/generate-question-context.js --phase=phase-0
 *   node scripts/generate-question-context.js --question=rq-0-1
 *   node scripts/generate-question-context.js --dry-run
 *
 * Environment variables:
 *   DATABRICKS_TOKEN - API token for Databricks
 *   DATABRICKS_HOST - Databricks host URL (optional, has default)
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Configuration
const DATABRICKS_HOST = process.env.DATABRICKS_HOST || 'https://adb-6239133969168510.10.azuredatabricks.net';
const DATABRICKS_TOKEN = process.env.DATABRICKS_TOKEN;

const CLAUDE_ENDPOINT = '/serving-endpoints/databricks-claude-opus-4-5/invocations';

const QUESTIONS_DIR = path.join(PROJECT_ROOT, 'static/content/research-questions');
const BOM_SPECS_DIR = path.join(PROJECT_ROOT, 'static/content/bom-specs');

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const yamlStr = match[1];
  const body = match[2];
  const frontmatter = {};

  // Simple YAML parser for our use case
  const lines = yamlStr.split('\n');
  let currentKey = null;
  let currentArray = null;

  for (const line of lines) {
    // Array item
    if (line.match(/^\s+-\s+/)) {
      const value = line.replace(/^\s+-\s+/, '').replace(/^["']|["']$/g, '').trim();
      if (currentArray) {
        currentArray.push(value);
      }
      continue;
    }

    // Key-value pair
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      let value = kvMatch[2].trim();

      // Check if starting an array
      if (value === '') {
        currentArray = [];
        frontmatter[currentKey] = currentArray;
      } else {
        currentArray = null;
        // Remove quotes
        value = value.replace(/^["']|["']$/g, '');
        frontmatter[currentKey] = value;
      }
    }
  }

  return { frontmatter, body };
}

/**
 * Serialize frontmatter back to YAML string
 */
function serializeFrontmatter(frontmatter) {
  let yaml = '';

  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      yaml += `${key}:\n`;
      for (const item of value) {
        yaml += `  - "${item}"\n`;
      }
    } else {
      yaml += `${key}: "${value}"\n`;
    }
  }

  return yaml;
}

/**
 * Load consensus document for a BOM item
 */
async function loadConsensus(phaseId, bomItemSlug) {
  const consensusPath = path.join(BOM_SPECS_DIR, phaseId, bomItemSlug, 'consensus.md');

  try {
    const content = await fs.readFile(consensusPath, 'utf-8');
    const { body } = parseFrontmatter(content);
    return body;
  } catch (error) {
    console.log(`    Warning: No consensus found at ${consensusPath}`);
    return null;
  }
}

/**
 * Query Databricks Claude API
 */
async function queryClaude(prompt) {
  if (!DATABRICKS_TOKEN) {
    console.error('DATABRICKS_TOKEN not set');
    return null;
  }

  const endpoint = `${DATABRICKS_HOST}${CLAUDE_ENDPOINT}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DATABRICKS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are a technical writer for Project Dyson, a Dyson swarm construction initiative. Write detailed, technical context for research questions.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Handle array format
    if (Array.isArray(content)) {
      const textContent = content.find(c => c.type === 'text');
      return textContent?.text || null;
    }

    return content || data.content;
  } catch (error) {
    console.error(`Error querying Claude: ${error.message}`);
    return null;
  }
}

/**
 * Generate the prompt for context generation
 */
function generatePrompt(question, consensusContent) {
  const consensusSection = consensusContent
    ? `## Source BOM Item Consensus Document:\n\n${consensusContent}`
    : '(No consensus document available - use general knowledge about Dyson swarm construction)';

  return `You are writing detailed research context for a Dyson swarm engineering question.

${consensusSection}

---

## Question to Contextualize:

- **Title**: ${question.title}
- **Type**: ${question.questionType}
- **Priority**: ${question.priority}
- **Source BOM Item**: ${question.sourceBOMItemName}
- **Tags**: ${question.tags.join(', ')}

---

Write comprehensive context for this research question. Your response should be in markdown format and include these sections:

## Background

Explain what the BOM item is and why this specific question arises from it. Reference actual specifications from the consensus document where relevant.

## Why This Matters

Describe the impact on project success. What are the dependencies? What risks does this question address? Be specific about consequences of different answers.

## Key Considerations

List the technical factors, tradeoffs, and constraints that must be considered when answering this question. Include specific numbers from the consensus where available.

## Research Directions

Provide 3-5 concrete steps or approaches to investigate this question. These should be actionable research tasks.

---

Important guidelines:
- Be specific and technical, not vague
- Reference actual values from the consensus document
- Keep the total response under 800 words
- Write in a professional engineering style
- Do not include the question title as a heading (it will be shown separately)
- Start directly with "## Background"`;
}

/**
 * Process a single question file
 */
async function processQuestion(questionPath, dryRun = false) {
  const content = await fs.readFile(questionPath, 'utf-8');
  const { frontmatter, body } = parseFrontmatter(content);

  // Check if already has rich content (not just placeholder)
  if (body.length > 500 && !body.includes('placeholder') && !body.includes('This research question emerges from')) {
    console.log(`    Skipping - already has rich content`);
    return false;
  }

  const question = {
    id: frontmatter.questionId,
    title: frontmatter.title,
    questionType: frontmatter.questionType,
    priority: frontmatter.priority,
    sourcePhaseId: frontmatter.sourcePhase,
    sourceBOMItemSlug: frontmatter.sourceBOMItemSlug,
    sourceBOMItemName: frontmatter.sourceBOMItemName,
    tags: frontmatter.tags || []
  };

  // Load consensus document
  const consensusContent = await loadConsensus(question.sourcePhaseId, question.sourceBOMItemSlug);

  if (dryRun) {
    console.log(`    Would generate context using consensus from ${question.sourceBOMItemSlug}`);
    return false;
  }

  // Generate context via Claude
  const prompt = generatePrompt(question, consensusContent);
  const generatedContext = await queryClaude(prompt);

  if (!generatedContext) {
    console.log(`    Failed to generate context`);
    return false;
  }

  // Reconstruct the file with new content
  const newContent = `---\n${serializeFrontmatter(frontmatter)}---\n\n${generatedContext}\n`;

  await fs.writeFile(questionPath, newContent, 'utf-8');
  console.log(`    Generated context (${generatedContext.length} chars)`);

  return true;
}

/**
 * Get all question files for a phase
 */
async function getQuestionFiles(phaseId) {
  const phaseDir = path.join(QUESTIONS_DIR, phaseId);

  try {
    const files = await fs.readdir(phaseDir);
    return files
      .filter(f => f.endsWith('.md'))
      .map(f => path.join(phaseDir, f));
  } catch (error) {
    return [];
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const phaseFilter = args.find(a => a.startsWith('--phase='))?.split('=')[1];
  const questionFilter = args.find(a => a.startsWith('--question='))?.split('=')[1];
  const dryRun = args.includes('--dry-run');

  console.log('='.repeat(60));
  console.log('Research Question Context Generator');
  console.log('='.repeat(60));
  console.log();

  if (!DATABRICKS_TOKEN && !dryRun) {
    console.error('Error: DATABRICKS_TOKEN environment variable not set');
    console.error('Set it with: export DATABRICKS_TOKEN=your_token');
    process.exit(1);
  }

  const phases = phaseFilter ? [phaseFilter] : ['phase-0', 'phase-1', 'phase-2'];

  let totalProcessed = 0;
  let totalGenerated = 0;

  for (const phaseId of phases) {
    console.log(`\nPhase: ${phaseId}`);
    console.log('-'.repeat(40));

    const questionFiles = await getQuestionFiles(phaseId);

    if (questionFiles.length === 0) {
      console.log('  No question files found');
      continue;
    }

    for (const questionPath of questionFiles) {
      const filename = path.basename(questionPath);

      // Filter by question ID if specified
      if (questionFilter && !filename.startsWith(questionFilter)) {
        continue;
      }

      console.log(`  Processing: ${filename}`);
      totalProcessed++;

      const generated = await processQuestion(questionPath, dryRun);
      if (generated) {
        totalGenerated++;
      }

      // Rate limiting - wait between API calls
      if (!dryRun && generated) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  console.log();
  console.log('='.repeat(60));
  console.log(`Complete! Processed: ${totalProcessed}, Generated: ${totalGenerated}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
