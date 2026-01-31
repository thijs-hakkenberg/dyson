#!/usr/bin/env node

/**
 * Query LLMs for BOM Item Specifications
 *
 * This script queries Gemini 3 Pro and GPT-5.2 via Databricks API
 * for detailed technical specifications of Phase 0 BOM items.
 *
 * Claude specifications are generated directly rather than via API.
 *
 * Usage:
 *   node scripts/query-bom-specs.js
 *   node scripts/query-bom-specs.js --item=mining-robots
 *   node scripts/query-bom-specs.js --model=gemini-3-pro
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
const DATABRICKS_HOST = process.env.DATABRICKS_HOST || 'https://your-workspace.cloud.databricks.com';
const DATABRICKS_TOKEN = process.env.DATABRICKS_TOKEN;

const MODELS = {
  'gemini-3-pro': {
    id: 'databricks-gemini-3-pro',
    name: 'Gemini 3 Pro',
    filename: 'gemini-3-pro.md'
  },
  'gpt-5-2': {
    id: 'databricks-gpt-5-2',
    name: 'GPT-5.2',
    filename: 'gpt-5-2.md'
  }
};

const BOM_ITEMS = [
  {
    bomId: 'bom-0-1',
    slug: 'prospecting-satellites',
    name: 'Prospecting Satellites',
    quantity: '50 units',
    cost: '$250M',
    category: 'Spacecraft'
  },
  {
    bomId: 'bom-0-2',
    slug: 'mining-robots',
    name: 'Mining Robots',
    quantity: '20 units',
    cost: '$1B',
    category: 'Robotics'
  },
  {
    bomId: 'bom-0-3',
    slug: 'material-processing-station',
    name: 'Material Processing Station',
    quantity: '1 station',
    cost: '$10B',
    category: 'Infrastructure'
  },
  {
    bomId: 'bom-0-4',
    slug: 'transport-vehicles',
    name: 'Transport Vehicles',
    quantity: '10 units',
    cost: '$2B',
    category: 'Spacecraft'
  },
  {
    bomId: 'bom-0-5',
    slug: 'solar-power-arrays',
    name: 'Solar Power Arrays',
    quantity: '100 MW',
    cost: '$500M',
    category: 'Power Systems'
  }
];

/**
 * Generate the prompt for a BOM item
 */
function generatePrompt(item) {
  return `You are an expert space systems engineer for Project Dyson, a non-profit
planning the construction of a Dyson swarm.

Provide DETAILED technical specifications for: **${item.name}**
Context: Phase 0 - Space Resource Processing
Quantity needed: ${item.quantity}
Budget allocation: ${item.cost}

Include the following sections:

1. **Executive Summary**
   - Purpose and role in Phase 0
   - Key design philosophy
   - Critical success factors

2. **Technical Specifications**
   - Physical specifications (mass, dimensions, power requirements)
   - Performance requirements
   - Environmental tolerances (radiation, thermal, vacuum)
   - Operational lifetime

3. **System Design**
   - Architecture overview
   - Major subsystems breakdown
   - Interfaces with other Phase 0 components

4. **Control Systems**
   - Autonomy level required
   - Communication architecture
   - Fault tolerance and redundancy
   - Software/firmware requirements

5. **Manufacturing & Assembly**
   - Production approach (Earth-built vs in-space)
   - Key manufacturing challenges
   - Assembly and integration procedures
   - Quality assurance requirements

6. **Development Roadmap**
   - Technology readiness level (current)
   - Required R&D milestones
   - Prototype and testing phases
   - Timeline to operational status

7. **Cost Breakdown**
   - Development costs
   - Production costs per unit
   - Operations and maintenance
   - Cost reduction opportunities

8. **Risk Analysis**
   - Top 5 technical risks
   - Mitigation strategies
   - Fallback options

9. **Open Questions**
   - Unresolved engineering challenges
   - Required research/experiments
   - Key decisions pending

Be specific with numbers, cite assumptions, and explain your reasoning.`;
}

/**
 * Query Databricks LLM API
 */
async function queryDatabricks(modelId, prompt) {
  if (!DATABRICKS_TOKEN) {
    console.warn('DATABRICKS_TOKEN not set. Generating placeholder content.');
    return null;
  }

  const endpoint = `${DATABRICKS_HOST}/serving-endpoints/${modelId}/invocations`;

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
            content: 'You are an expert space systems engineer providing detailed technical specifications.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4096,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API error: ${response.status} - ${error}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || data.content;
  } catch (error) {
    console.error(`Error querying ${modelId}:`, error.message);
    return null;
  }
}

/**
 * Generate frontmatter for markdown file
 */
function generateFrontmatter(item, modelKey, modelName) {
  const date = new Date().toISOString().split('T')[0];
  return `---
bomId: "${item.bomId}"
itemName: "${item.name}"
itemSlug: "${item.slug}"
modelId: "${modelKey}"
modelName: "${modelName}"
generated: "${date}"
phase: "phase-0"
---

`;
}

/**
 * Save specification to file
 */
async function saveSpec(item, modelKey, content) {
  const model = MODELS[modelKey];
  const outputDir = path.join(PROJECT_ROOT, 'static/content/bom-specs/phase-0', item.slug);
  const outputPath = path.join(outputDir, model.filename);

  // Ensure directory exists
  await fs.mkdir(outputDir, { recursive: true });

  const fullContent = generateFrontmatter(item, modelKey, model.name) + content;
  await fs.writeFile(outputPath, fullContent, 'utf-8');

  console.log(`  Saved: ${outputPath}`);
}

/**
 * Generate placeholder content when API is unavailable
 */
function generatePlaceholder(item, modelName) {
  return `# ${item.name} - Technical Specifications

*Generated by ${modelName}*

> **Note:** This is placeholder content. Run the query script with DATABRICKS_TOKEN to generate actual LLM specifications.

## Executive Summary

${item.name} are essential components of Phase 0 - Space Resource Processing. This specification requires generation via the Databricks LLM API.

## Technical Specifications

- **Quantity Required:** ${item.quantity}
- **Budget Allocation:** ${item.cost}
- **Category:** ${item.category}

## System Design

*Awaiting LLM generation...*

## Control Systems

*Awaiting LLM generation...*

## Manufacturing & Assembly

*Awaiting LLM generation...*

## Development Roadmap

*Awaiting LLM generation...*

## Cost Breakdown

*Awaiting LLM generation...*

## Risk Analysis

*Awaiting LLM generation...*

## Open Questions

*Awaiting LLM generation...*
`;
}

/**
 * Process a single BOM item for a single model
 */
async function processItemModel(item, modelKey) {
  const model = MODELS[modelKey];
  console.log(`  Querying ${model.name}...`);

  const prompt = generatePrompt(item);
  let content = await queryDatabricks(model.id, prompt);

  if (!content) {
    console.log(`    Using placeholder content for ${model.name}`);
    content = generatePlaceholder(item, model.name);
  }

  await saveSpec(item, modelKey, content);
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const itemFilter = args.find(a => a.startsWith('--item='))?.split('=')[1];
  const modelFilter = args.find(a => a.startsWith('--model='))?.split('=')[1];

  console.log('='.repeat(60));
  console.log('BOM Specifications Generator');
  console.log('='.repeat(60));
  console.log();

  const itemsToProcess = itemFilter
    ? BOM_ITEMS.filter(i => i.slug === itemFilter)
    : BOM_ITEMS;

  const modelsToProcess = modelFilter
    ? [modelFilter].filter(m => m in MODELS)
    : Object.keys(MODELS);

  if (itemsToProcess.length === 0) {
    console.error(`No items found matching: ${itemFilter}`);
    process.exit(1);
  }

  if (modelsToProcess.length === 0) {
    console.error(`No models found matching: ${modelFilter}`);
    process.exit(1);
  }

  console.log(`Items: ${itemsToProcess.map(i => i.slug).join(', ')}`);
  console.log(`Models: ${modelsToProcess.join(', ')}`);
  console.log();

  for (const item of itemsToProcess) {
    console.log(`Processing: ${item.name}`);

    for (const modelKey of modelsToProcess) {
      await processItemModel(item, modelKey);
    }

    console.log();
  }

  console.log('='.repeat(60));
  console.log('Generation complete!');
  console.log();
  console.log('Next steps:');
  console.log('1. Generate Claude specifications manually');
  console.log('2. Create consensus.md files for each item');
  console.log('='.repeat(60));
}

main().catch(console.error);
