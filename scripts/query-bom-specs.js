#!/usr/bin/env node

/**
 * Query LLMs for BOM Item Specifications
 *
 * This script queries Claude, Gemini 3 Pro, and GPT-5.2 via Databricks API
 * for detailed technical specifications of Phase 0 and Phase 1 BOM items.
 *
 * Usage:
 *   node scripts/query-bom-specs.js
 *   node scripts/query-bom-specs.js --item=mining-robots
 *   node scripts/query-bom-specs.js --model=gemini-3-pro
 *   node scripts/query-bom-specs.js --phase=phase-1
 *   node scripts/query-bom-specs.js --item=mining-robots --generate-consensus
 *   node scripts/query-bom-specs.js --item=mining-robots --consensus-only
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

const PHASE_0_BOM_ITEMS = [
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

const PHASE_1_BOM_ITEMS = [
  { bomId: 'bom-1-1', slug: 'collector-units', name: 'Solar Collector Units', category: 'Spacecraft' },
  { bomId: 'bom-1-2', slug: 'pv-blanket-arrays', name: 'PV Blanket Arrays', category: 'Power Systems' },
  { bomId: 'bom-1-3', slug: 'assembly-robots', name: 'Assembly Robots', category: 'Robotics' },
  { bomId: 'bom-1-4', slug: 'assembly-node', name: 'Assembly Node Hub', category: 'Infrastructure' },
  { bomId: 'bom-1-5', slug: 'mass-drivers', name: 'Mass Drivers', category: 'Infrastructure' },
  { bomId: 'bom-1-6', slug: 'orbital-tugs', name: 'Orbital Tugs', category: 'Spacecraft' },
  { bomId: 'bom-1-7', slug: 'swarm-control-system', name: 'Swarm Control System', category: 'Computing' }
];

const PHASE_2_BOM_ITEMS = [
  { bomId: 'bom-2-1', slug: 'collector-satellites', name: 'Solar Collector Satellites', category: 'Spacecraft' },
  { bomId: 'bom-2-2', slug: 'maintenance-drones', name: 'Maintenance Drones', category: 'Robotics' },
  { bomId: 'bom-2-3', slug: 'manufacturing-expansion', name: 'Additional Manufacturing Capacity', category: 'Infrastructure' }
];

const ALL_BOM_ITEMS = {
  'phase-0': PHASE_0_BOM_ITEMS,
  'phase-1': PHASE_1_BOM_ITEMS,
  'phase-2': PHASE_2_BOM_ITEMS
};

// Legacy alias for backwards compatibility
const BOM_ITEMS = PHASE_0_BOM_ITEMS;

/**
 * Get phase context description for prompts
 */
function getPhaseContext(phaseId) {
  const contexts = {
    'phase-0': 'Phase 0 - Space Resource Processing',
    'phase-1': 'Phase 1 - Initial Swarm Deployment',
    'phase-2': 'Phase 2 - Swarm Expansion'
  };
  return contexts[phaseId] || phaseId;
}

/**
 * Generate the prompt for a BOM item
 */
function generatePrompt(item, phaseId = 'phase-0') {
  return `You are an expert space systems engineer for Project Dyson, a non-profit
planning the construction of a Dyson swarm.

Provide a DETAILED technical proposal for: **${item.name}**
Context: ${getPhaseContext(phaseId)}

Your proposal should be comprehensive and free-form. Include:
- Your recommended approach and design philosophy
- Technical specifications (dimensions, mass, power, performance)
- System architecture (include ASCII diagrams where helpful)
- Subsystems breakdown and interfaces
- Autonomy, control, and communication requirements
- Manufacturing considerations
- Development roadmap and technology readiness
- Cost analysis and budget estimates
- Risk assessment
- Open engineering questions

Be specific with numbers and cite your assumptions. Include diagrams
where they aid understanding. This is YOUR proposal - be opinionated
about the best approach.`;
}

/**
 * Query Databricks LLM API
 */
async function queryDatabricks(modelKey, prompt) {
  if (!DATABRICKS_TOKEN) {
    return null;
  }

  const model = MODELS[modelKey];
  const endpoint = `${DATABRICKS_HOST}${model.endpoint}`;

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
        max_tokens: 64000,
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
 * Generate frontmatter for markdown file
 */
function generateFrontmatter(item, modelKey, modelName, phaseId = 'phase-0') {
  const date = new Date().toISOString().split('T')[0];
  return `---
bomId: "${item.bomId}"
itemName: "${item.name}"
itemSlug: "${item.slug}"
modelId: "${modelKey}"
modelName: "${modelName}"
generated: "${date}"
phase: "${phaseId}"
---

`;
}

/**
 * Save specification to file
 */
async function saveSpec(item, modelKey, content, phaseId = 'phase-0') {
  const model = MODELS[modelKey];
  const outputDir = path.join(PROJECT_ROOT, 'static/content/bom-specs', phaseId, item.slug);
  const outputPath = path.join(outputDir, model.filename);

  // Ensure directory exists
  await fs.mkdir(outputDir, { recursive: true });

  const fullContent = generateFrontmatter(item, modelKey, model.name, phaseId) + content;
  await fs.writeFile(outputPath, fullContent, 'utf-8');

  console.log(`  Saved: ${outputPath}`);
}

/**
 * Process a single BOM item for a single model
 */
async function processItemModel(item, modelKey, phaseId = 'phase-0') {
  const model = MODELS[modelKey];
  console.log(`  Querying ${model.name}...`);

  const prompt = generatePrompt(item, phaseId);
  const content = await queryDatabricks(modelKey, prompt);

  if (!content) {
    console.log(`    API unavailable for ${model.name} - skipping`);
    return null;
  }

  await saveSpec(item, modelKey, content, phaseId);
  return content;
}

/**
 * Load existing spec from file
 */
async function loadSpec(item, modelKey, phaseId = 'phase-0') {
  const model = MODELS[modelKey];
  const specPath = path.join(PROJECT_ROOT, 'static/content/bom-specs', phaseId, item.slug, model.filename);

  try {
    const content = await fs.readFile(specPath, 'utf-8');
    // Remove frontmatter
    const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n*/, '');
    return contentWithoutFrontmatter;
  } catch (error) {
    return null;
  }
}

/**
 * Generate consensus document from all model specs
 */
async function generateConsensus(item, specs, phaseId = 'phase-0') {
  const specsText = Object.entries(specs)
    .map(([modelId, content]) => {
      const model = MODELS[modelId];
      return `## ${model.name}\n\n${content}`;
    })
    .join('\n\n---\n\n');

  const prompt = `You are synthesizing technical specifications from 3 AI models for "${item.name}" in the context of ${getPhaseContext(phaseId)}.

## Model Specifications:

${specsText}

---

Generate a consensus document with EXACTLY these sections:

## Key Specifications
List 6-10 bullet points where ALL models agree. Be specific with numbers.

## Divergent Views
List 3-6 bullet points where models DISAGREE. Format EXACTLY as:
- **Topic Name**: Claude recommends X; Gemini prefers Y; GPT suggests Z.

## Open Questions
List 4-6 unresolved engineering challenges identified across models.

## Recommended Approach
A numbered list of 5-7 synthesized recommendations.

Be specific about which model holds which view in the Divergent Views section.`;

  console.log(`  Generating consensus for ${item.name}...`);
  const content = await queryDatabricks('claude-opus-4-6', prompt);

  if (!content) {
    console.log('    Failed to generate consensus - no API response');
    return null;
  }

  return content;
}

/**
 * Parse positions from divergent views text
 */
function parsePositions(text) {
  const positions = [];
  const modelPositions = {};

  // Split by semicolons and parse each
  const parts = text.split(/[;.]/);
  for (const part of parts) {
    const trimmedPart = part.trim();
    if (!trimmedPart) continue;

    // Match patterns like "Claude recommends X" or "Gemini prefers Y"
    const match = trimmedPart.match(/^(Claude|Gemini|GPT)(?:\s+\w+)?\s+(.+)/i);
    if (match) {
      const model = match[1];
      const statement = match[2].trim();

      // Normalize model name
      const normalizedModel = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase();

      // Group by statement similarity (simple approach)
      if (!modelPositions[statement]) {
        modelPositions[statement] = [];
      }
      modelPositions[statement].push(normalizedModel);
    }
  }

  for (const [statement, models] of Object.entries(modelPositions)) {
    positions.push({ statement, models });
  }

  return positions;
}

/**
 * Generate divergent views YAML from consensus content
 */
function generateDivergentViewsYAML(consensusContent, item, phaseId = 'phase-0') {
  // Parse the Divergent Views section from consensus
  const dvMatch = consensusContent.match(/## Divergent Views\n([\s\S]*?)(?=\n## |$)/);
  if (!dvMatch) {
    console.log('    No Divergent Views section found in consensus');
    return null;
  }

  const topics = [];
  const lines = dvMatch[1].split('\n').filter(l => l.trim().startsWith('- **'));

  for (const line of lines) {
    const topicMatch = line.match(/\*\*([^*]+)\*\*:\s*(.+)/);
    if (!topicMatch) continue;

    const topic = topicMatch[1].trim();
    const positionsText = topicMatch[2];
    const positions = parsePositions(positionsText);

    if (positions.length > 0) {
      topics.push({
        id: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        topic,
        positions
      });
    }
  }

  if (topics.length === 0) {
    console.log('    No topics parsed from Divergent Views section');
    return null;
  }

  // Generate YAML content
  const yamlContent = generateYAMLContent({
    bomId: item.bomId,
    itemSlug: item.slug,
    generated: new Date().toISOString().split('T')[0],
    topics
  });

  return yamlContent;
}

/**
 * Generate YAML string from object
 */
function generateYAMLContent(data) {
  let yaml = `# Divergent Views for ${data.itemSlug}\n`;
  yaml += `# Auto-generated from consensus document\n\n`;
  yaml += `bomId: "${data.bomId}"\n`;
  yaml += `itemSlug: "${data.itemSlug}"\n`;
  yaml += `generated: "${data.generated}"\n\n`;
  yaml += `topics:\n`;

  for (const topic of data.topics) {
    yaml += `  - id: "${topic.id}"\n`;
    yaml += `    topic: "${topic.topic}"\n`;
    yaml += `    positions:\n`;

    for (const pos of topic.positions) {
      // Escape quotes in statement
      const escapedStatement = pos.statement.replace(/"/g, '\\"');
      yaml += `      - statement: "${escapedStatement}"\n`;
      yaml += `        models:\n`;
      for (const model of pos.models) {
        yaml += `          - "${model}"\n`;
      }
    }
  }

  return yaml;
}

/**
 * Save consensus document to file
 */
async function saveConsensus(item, content, phaseId = 'phase-0') {
  const outputDir = path.join(PROJECT_ROOT, 'static/content/bom-specs', phaseId, item.slug);
  const outputPath = path.join(outputDir, 'consensus.md');

  await fs.mkdir(outputDir, { recursive: true });

  const date = new Date().toISOString().split('T')[0];
  const frontmatter = `---
bomId: "${item.bomId}"
itemName: "${item.name}"
itemSlug: "${item.slug}"
type: "consensus"
generated: "${date}"
phase: "${phaseId}"
---

`;

  await fs.writeFile(outputPath, frontmatter + content, 'utf-8');
  console.log(`  Saved consensus: ${outputPath}`);
}

/**
 * Save divergent views YAML to file
 */
async function saveDivergentViews(item, yamlContent, phaseId = 'phase-0') {
  const outputDir = path.join(PROJECT_ROOT, 'static/content/bom-specs', phaseId, item.slug);
  const outputPath = path.join(outputDir, 'divergent-views.yaml');

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(outputPath, yamlContent, 'utf-8');
  console.log(`  Saved divergent views: ${outputPath}`);
}

/**
 * Process all models for an item and optionally generate consensus
 */
async function processItem(item, modelsToProcess, phaseId, options = {}) {
  const { generateCons, consensusOnly } = options;
  const specs = {};

  if (!consensusOnly) {
    // Generate specs for each model
    for (const modelKey of modelsToProcess) {
      const content = await processItemModel(item, modelKey, phaseId);
      if (content) {
        specs[modelKey] = content;
      }
    }
  } else {
    // Load existing specs for consensus generation
    console.log(`  Loading existing specs for ${item.name}...`);
    for (const modelKey of Object.keys(MODELS)) {
      const content = await loadSpec(item, modelKey, phaseId);
      if (content) {
        specs[modelKey] = content;
        console.log(`    Loaded ${MODELS[modelKey].name}`);
      }
    }
  }

  // Generate consensus if requested
  if (generateCons || consensusOnly) {
    const specCount = Object.keys(specs).length;
    if (specCount < 2) {
      console.log(`    Skipping consensus - need at least 2 specs, found ${specCount}`);
      return;
    }

    const consensusContent = await generateConsensus(item, specs, phaseId);
    if (consensusContent) {
      await saveConsensus(item, consensusContent, phaseId);

      // Generate divergent views YAML
      const yamlContent = generateDivergentViewsYAML(consensusContent, item, phaseId);
      if (yamlContent) {
        await saveDivergentViews(item, yamlContent, phaseId);
      }
    }
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const itemFilter = args.find(a => a.startsWith('--item='))?.split('=')[1];
  const modelFilter = args.find(a => a.startsWith('--model='))?.split('=')[1];
  const phaseFilter = args.find(a => a.startsWith('--phase='))?.split('=')[1] || 'phase-0';
  const generateCons = args.includes('--generate-consensus');
  const consensusOnly = args.includes('--consensus-only');

  console.log('='.repeat(60));
  console.log('BOM Specifications Generator');
  console.log('='.repeat(60));
  console.log();

  // Validate phase
  if (!ALL_BOM_ITEMS[phaseFilter]) {
    console.error(`Unknown phase: ${phaseFilter}`);
    console.error(`Available phases: ${Object.keys(ALL_BOM_ITEMS).join(', ')}`);
    process.exit(1);
  }

  const phaseItems = ALL_BOM_ITEMS[phaseFilter];
  const itemsToProcess = itemFilter
    ? phaseItems.filter(i => i.slug === itemFilter)
    : phaseItems;

  const modelsToProcess = modelFilter
    ? [modelFilter].filter(m => m in MODELS)
    : Object.keys(MODELS);

  if (itemsToProcess.length === 0) {
    console.error(`No items found matching: ${itemFilter} in ${phaseFilter}`);
    process.exit(1);
  }

  if (modelsToProcess.length === 0) {
    console.error(`No models found matching: ${modelFilter}`);
    console.error(`Available models: ${Object.keys(MODELS).join(', ')}`);
    process.exit(1);
  }

  console.log(`Phase: ${phaseFilter}`);
  console.log(`Items: ${itemsToProcess.map(i => i.slug).join(', ')}`);
  console.log(`Models: ${modelsToProcess.join(', ')}`);
  if (generateCons) console.log('Mode: Generate specs + consensus');
  if (consensusOnly) console.log('Mode: Consensus only (from existing specs)');
  console.log();

  for (const item of itemsToProcess) {
    console.log(`Processing: ${item.name}`);
    await processItem(item, modelsToProcess, phaseFilter, { generateCons, consensusOnly });
    console.log();
  }

  console.log('='.repeat(60));
  console.log('Generation complete!');
  console.log('='.repeat(60));
}

main().catch(console.error);
