#!/usr/bin/env node

/**
 * Query LLMs for BOM Item Specifications
 *
 * This script queries Claude (4.5 & 4.6), Gemini 3 Pro, and GPT-5.2 via Databricks API
 * for detailed technical specifications of BOM items across all phases.
 *
 * Usage:
 *   # Generate specs for existing BOM items
 *   node scripts/query-bom-specs.js --phase=phase-0
 *   node scripts/query-bom-specs.js --phase=phase-1 --item=collector-units
 *   node scripts/query-bom-specs.js --model=gemini-3-pro --phase=phase-0
 *
 *   # Generate consensus from existing specs (loads all available model files)
 *   node scripts/query-bom-specs.js --phase=phase-0 --consensus-only
 *   node scripts/query-bom-specs.js --phase=phase-1 --item=collector-units --consensus-only
 *
 *   # Add Claude 4.6 specs alongside existing 4.5 specs
 *   node scripts/query-bom-specs.js --phase=phase-0 --add-claude-46
 *   node scripts/query-bom-specs.js --phase=phase-1 --item=collector-units --add-claude-46
 *
 *   # Propose BOM items for a new phase (models propose with prior context)
 *   node scripts/query-bom-specs.js --phase=phase-3 --propose-bom
 *
 * Environment variables:
 *   DATABRICKS_TOKEN - API token for Databricks
 *   DATABRICKS_HOST - Databricks host URL (optional, has default)
 *
 * Models:
 *   - claude-opus-4-5: Claude Opus 4.5 (legacy specs)
 *   - claude-opus-4-6: Claude Opus 4.6 (current)
 *   - gemini-3-pro: Gemini 3 Pro
 *   - gpt-5-2: GPT-5.2
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// Configuration
const DATABRICKS_HOST = process.env.DATABRICKS_HOST || process.env.DATABRICKS_WORKSPACE || 'https://adb-6239133969168510.10.azuredatabricks.net';
const DATABRICKS_TOKEN = process.env.DATABRICKS_TOKEN;

const MODELS = {
  'claude-opus-4-5': {
    id: 'databricks-claude-opus-4-5',
    name: 'Claude Opus 4.5',
    filename: 'claude-opus-4-5.md',
    endpoint: '/serving-endpoints/databricks-claude-opus-4-5/invocations'
  },
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

// Default models for new specs (current latest versions)
const DEFAULT_SPEC_MODELS = ['claude-opus-4-6', 'gemini-3-pro', 'gpt-5-2'];

// All Claude models (for generating 4.6 alongside existing 4.5)
const CLAUDE_MODELS = ['claude-opus-4-5', 'claude-opus-4-6'];

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
  },
  {
    bomId: 'bom-0-6',
    slug: 'ispp-systems',
    name: 'In-Situ Propellant Production Systems',
    quantity: '4 units',
    cost: '$2B',
    category: 'Infrastructure'
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

// Phase 3 BOM items - Matroska Brain (determined by model consensus 2026-02-07)
const PHASE_3_BOM_ITEMS = [
  {
    bomId: 'bom-3-1',
    slug: 'computational-substrate-tiles',
    name: 'Computational Substrate Tiles',
    category: 'Computing'
  },
  {
    bomId: 'bom-3-2',
    slug: 'inter-layer-optical-backbone',
    name: 'Inter-Layer Optical Communication Backbone',
    category: 'Communications'
  },
  {
    bomId: 'bom-3-3',
    slug: 'thermal-management-radiator-systems',
    name: 'Thermal Management and Radiator Systems',
    category: 'Power Systems'
  },
  {
    bomId: 'bom-3-4',
    slug: 'self-replicating-manufacturing-foundries',
    name: 'Self-Replicating Manufacturing Foundries',
    category: 'Infrastructure'
  },
  {
    bomId: 'bom-3-5',
    slug: 'distributed-computational-os',
    name: 'Distributed Computational Operating System',
    category: 'Computing'
  },
  {
    bomId: 'bom-3-6',
    slug: 'feedstock-supply-chain-pipeline',
    name: 'Feedstock Supply Chain and Logistics Pipeline',
    category: 'Infrastructure'
  },
  {
    bomId: 'bom-3-7',
    slug: 'inter-layer-power-distribution-network',
    name: 'Inter-Layer Power Distribution Network',
    category: 'Power Systems'
  },
  {
    bomId: 'bom-3-8',
    slug: 'shell-construction-maintenance-swarm',
    name: 'Shell Construction and Maintenance Swarm',
    category: 'Robotics'
  }
];

const ALL_BOM_ITEMS = {
  'phase-0': PHASE_0_BOM_ITEMS,
  'phase-1': PHASE_1_BOM_ITEMS,
  'phase-2': PHASE_2_BOM_ITEMS,
  'phase-3': PHASE_3_BOM_ITEMS
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
    'phase-2': 'Phase 2 - Swarm Expansion',
    'phase-3': 'Phase 3 - Matroska Brain'
  };
  return contexts[phaseId] || phaseId;
}

/**
 * Load all prior consensus documents as context
 */
async function loadPriorConsensus() {
  const consensusDocs = [];
  const phases = ['phase-0', 'phase-1', 'phase-2'];

  for (const phaseId of phases) {
    const phaseItems = ALL_BOM_ITEMS[phaseId];
    for (const item of phaseItems) {
      const consensusPath = path.join(
        PROJECT_ROOT,
        'static/content/bom-specs',
        phaseId,
        item.slug,
        'consensus.md'
      );
      try {
        const content = await fs.readFile(consensusPath, 'utf-8');
        // Remove frontmatter
        const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n*/, '');
        consensusDocs.push({
          phase: phaseId,
          item: item.name,
          slug: item.slug,
          content: contentWithoutFrontmatter
        });
      } catch (error) {
        // Skip if consensus doesn't exist
      }
    }
  }

  return consensusDocs;
}

/**
 * Generate BOM proposal prompt with full prior context
 */
function generateBOMProposalPrompt(priorConsensus) {
  const contextSummary = priorConsensus.map(doc =>
    `### ${doc.phase} - ${doc.item}\n${doc.content}`
  ).join('\n\n---\n\n');

  return `You are an expert space systems engineer for Project Dyson, a non-profit planning the construction of a Dyson swarm through phased development.

## Prior Phases - Consensus Specifications

The following phases have been planned with multi-model consensus:

${contextSummary}

---

## Your Task: Propose Phase 3 - Matroska Brain

A Matroska Brain is a megastructure concept consisting of nested Dyson spheres/swarms, each layer harvesting energy and waste heat from inner layers, creating a computational substrate of astronomical scale. This represents the ultimate evolution of the Dyson swarm into a stellar-scale computing infrastructure.

Given the infrastructure established in Phases 0-2 (space resource processing, initial swarm deployment, and swarm expansion), propose the **Bill of Materials (BOM)** for Phase 3.

For each BOM item, provide:
1. **Item Name**: Clear, descriptive name
2. **Slug**: URL-safe identifier (lowercase, hyphens)
3. **Category**: One of: Spacecraft, Robotics, Infrastructure, Power Systems, Computing, Communications
4. **Description**: 2-3 sentences describing the item and its role
5. **Quantity Estimate**: Order of magnitude with units
6. **Cost Estimate**: Order of magnitude with confidence level
7. **Key Technical Challenges**: Major engineering questions

Propose 5-8 BOM items that represent the key components needed to transform the Dyson swarm into a Matroska Brain computational substrate. Consider:
- Nested thermal layers for waste heat harvesting
- Computational nodes and networking infrastructure
- Cooling and heat management systems
- Power distribution between layers
- Data routing and communication systems
- Manufacturing for new layer construction

Be specific and opinionated. This is YOUR proposal for the optimal approach.`;
}

/**
 * Parse BOM items from model proposal response
 */
function parseBOMProposal(content, modelName) {
  // This will be refined after seeing actual model output format
  return {
    modelName,
    rawContent: content,
    // Parsed items will be extracted in consensus phase
  };
}

/**
 * Save BOM proposal to file
 */
async function saveBOMProposal(modelKey, content, phaseId = 'phase-3') {
  const model = MODELS[modelKey];
  const outputDir = path.join(PROJECT_ROOT, 'static/content/bom-specs', phaseId, '_bom-proposals');
  const outputPath = path.join(outputDir, model.filename);

  await fs.mkdir(outputDir, { recursive: true });

  const date = new Date().toISOString().split('T')[0];
  const frontmatter = `---
modelId: "${modelKey}"
modelName: "${model.name}"
generated: "${date}"
phase: "${phaseId}"
type: "bom-proposal"
---

`;

  await fs.writeFile(outputPath, frontmatter + content, 'utf-8');
  console.log(`  Saved BOM proposal: ${outputPath}`);
}

/**
 * Generate BOM consensus from all proposals
 */
async function generateBOMConsensus(proposals) {
  const proposalsText = proposals
    .map(p => `## ${p.modelName}\n\n${p.rawContent}`)
    .join('\n\n---\n\n');

  const prompt = `You are synthesizing BOM proposals from 3 AI models for Phase 3 (Matroska Brain) of Project Dyson.

## Model Proposals:

${proposalsText}

---

Generate a consensus BOM document with EXACTLY these sections:

## Agreed BOM Items

For each item where models substantially agree, provide:
- **Item Name** (slug: url-safe-slug)
- **Category**: category-name
- **Description**: Synthesized description
- **Quantity**: Consensus estimate with range
- **Cost**: Consensus estimate with confidence
- **bomId**: bom-3-N (numbered sequentially)

## Divergent Proposals

List items where only 1-2 models proposed something, or where there's significant disagreement on scope/approach. Include which model(s) proposed each and their rationale.

## Recommended Phase 3 BOM

Final recommended list of 5-8 items with:
1. bomId (bom-3-1, bom-3-2, etc.)
2. name
3. slug (lowercase-with-hyphens)
4. category
5. quantity estimate
6. cost estimate
7. brief description

## Open Questions

Key engineering questions that must be resolved for Phase 3.

Be specific about which model holds which view when there are disagreements.`;

  console.log('  Generating BOM consensus...');
  const content = await queryDatabricks('claude-opus-4-6', prompt);

  if (!content) {
    console.log('    Failed to generate BOM consensus - no API response');
    return null;
  }

  return content;
}

/**
 * Save BOM consensus to file
 */
async function saveBOMConsensus(content, phaseId = 'phase-3') {
  const outputDir = path.join(PROJECT_ROOT, 'static/content/bom-specs', phaseId, '_bom-proposals');
  const outputPath = path.join(outputDir, 'consensus.md');

  await fs.mkdir(outputDir, { recursive: true });

  const date = new Date().toISOString().split('T')[0];
  const frontmatter = `---
type: "bom-consensus"
generated: "${date}"
phase: "${phaseId}"
---

`;

  await fs.writeFile(outputPath, frontmatter + content, 'utf-8');
  console.log(`  Saved BOM consensus: ${outputPath}`);
}

/**
 * Run BOM proposal workflow for a phase
 */
async function proposeBOM(phaseId, modelsToQuery) {
  console.log(`\nLoading prior phase consensus documents...`);
  const priorConsensus = await loadPriorConsensus();
  console.log(`  Loaded ${priorConsensus.length} consensus documents\n`);

  const prompt = generateBOMProposalPrompt(priorConsensus);
  const proposals = [];

  // Query each model for their BOM proposal
  for (const modelKey of modelsToQuery) {
    const model = MODELS[modelKey];
    console.log(`Querying ${model.name} for BOM proposal...`);

    const content = await queryDatabricks(modelKey, prompt);
    if (content) {
      await saveBOMProposal(modelKey, content, phaseId);
      proposals.push(parseBOMProposal(content, model.name));
    } else {
      console.log(`  ${model.name} API unavailable - skipping`);
    }
  }

  // Generate consensus if we have enough proposals
  if (proposals.length >= 2) {
    const consensusContent = await generateBOMConsensus(proposals);
    if (consensusContent) {
      await saveBOMConsensus(consensusContent, phaseId);
    }
  } else {
    console.log(`\nInsufficient proposals for consensus (need 2+, got ${proposals.length})`);
  }
}

/**
 * Load BOM consensus for a phase if it exists
 */
async function loadBOMConsensus(phaseId) {
  const consensusPath = path.join(
    PROJECT_ROOT,
    'static/content/bom-specs',
    phaseId,
    '_bom-proposals',
    'consensus.md'
  );
  try {
    const content = await fs.readFile(consensusPath, 'utf-8');
    return content.replace(/^---[\s\S]*?---\n*/, '');
  } catch (error) {
    return null;
  }
}

/**
 * Generate the prompt for a BOM item
 */
/**
 * Extract item-specific section from BOM consensus
 */
function extractItemContext(bomConsensus, itemName, bomId) {
  if (!bomConsensus) return null;

  // Try to find the section for this specific item
  const patterns = [
    new RegExp(`### \\d+\\.\\s*${itemName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?(?=###|## Divergent|$)`, 'i'),
    new RegExp(`\\| ${bomId} \\|[^|]+\\|[^|]+\\|[^|]+\\|[^|]+\\|[^|]+\\|[^|]+\\|`, 'i')
  ];

  for (const pattern of patterns) {
    const match = bomConsensus.match(pattern);
    if (match) return match[0].trim();
  }

  return null;
}

async function generatePrompt(item, phaseId = 'phase-0', compactContext = false) {
  let contextAddendum = '';

  // For Phase 3, include context (compact or full)
  if (phaseId === 'phase-3') {
    const bomConsensus = await loadBOMConsensus(phaseId);

    if (compactContext) {
      // Compact mode: only include item-specific context
      const itemContext = extractItemContext(bomConsensus, item.name, item.bomId);
      if (itemContext) {
        contextAddendum = `
## Phase 3 BOM Context for ${item.name}

This item was defined in the multi-model consensus for Phase 3 (Matroska Brain):

${itemContext}

The Matroska Brain is a nested megastructure of computational shells where each layer harvests waste heat from inner layers. Phase 3 builds upon Phases 0-2: space resource processing, initial swarm deployment, and swarm expansion infrastructure.

---

`;
      } else {
        // Fallback to brief context
        contextAddendum = `
## Phase 3 - Matroska Brain Context

The Matroska Brain transforms the Dyson swarm into nested computational shells. Each layer harvests waste heat from inner layers via thermophotovoltaics. Key systems include:
- Computational Substrate Tiles (10¹² tiles across thermal layers)
- Inter-Layer Optical Communication Backbone
- Thermal Management and Radiator Systems
- Self-Replicating Manufacturing Foundries
- Distributed Computational Operating System
- Feedstock Supply Chain Pipeline
- Inter-Layer Power Distribution Network
- Shell Construction and Maintenance Swarm

This specification is for: **${item.name}** (${item.bomId})

---

`;
      }
    } else if (bomConsensus) {
      // Full context mode (original behavior)
      contextAddendum = `

## Multi-Model BOM Consensus Context

The following consensus was reached by Claude, Gemini, and GPT on the Phase 3 BOM structure and key decisions. Your detailed specification should align with and expand upon this consensus:

${bomConsensus}

---

`;
      // Also load prior phase consensus
      const priorConsensus = await loadPriorConsensus();
      if (priorConsensus.length > 0) {
        const summary = priorConsensus.map(doc =>
          `- **${doc.phase}/${doc.item}**: ${doc.slug}`
        ).join('\n');
        contextAddendum += `
## Prior Phase Infrastructure (Phases 0-2)

The following infrastructure has been planned and will be available:
${summary}

Build upon this established infrastructure in your Phase 3 proposal.

---

`;
      }
    }
  }

  return `You are an expert space systems engineer for Project Dyson, a non-profit
planning the construction of a Dyson swarm.

Provide a DETAILED technical proposal for: **${item.name}**
Context: ${getPhaseContext(phaseId)}
${contextAddendum}
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
async function queryDatabricks(modelKey, prompt, options = {}) {
  if (!DATABRICKS_TOKEN) {
    return null;
  }

  const { maxTokens = 64000 } = options;
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
async function processItemModel(item, modelKey, phaseId = 'phase-0', options = {}) {
  const { compactContext = false, maxTokens } = options;
  const model = MODELS[modelKey];
  console.log(`  Querying ${model.name}...`);

  const prompt = await generatePrompt(item, phaseId, compactContext);
  // Use reduced max_tokens for compact context to speed up response
  const tokenLimit = maxTokens || (compactContext ? 16000 : 64000);
  const content = await queryDatabricks(modelKey, prompt, { maxTokens: tokenLimit });

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
 * Load all available specs for an item (including both Claude versions if present)
 */
async function loadAllSpecs(item, phaseId = 'phase-0') {
  const specs = {};
  const itemDir = path.join(PROJECT_ROOT, 'static/content/bom-specs', phaseId, item.slug);

  for (const [modelKey, model] of Object.entries(MODELS)) {
    const specPath = path.join(itemDir, model.filename);
    try {
      const content = await fs.readFile(specPath, 'utf-8');
      const contentWithoutFrontmatter = content.replace(/^---[\s\S]*?---\n*/, '');
      specs[modelKey] = contentWithoutFrontmatter;
      console.log(`    Loaded ${model.name}`);
    } catch (error) {
      // File doesn't exist, skip
    }
  }

  return specs;
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
  let specs = {};

  if (!consensusOnly) {
    // Generate specs for each model
    for (const modelKey of modelsToProcess) {
      const content = await processItemModel(item, modelKey, phaseId);
      if (content) {
        specs[modelKey] = content;
      }
    }
  } else {
    // Load ALL existing specs for consensus generation (includes both Claude 4.5 and 4.6)
    console.log(`  Loading existing specs for ${item.name}...`);
    specs = await loadAllSpecs(item, phaseId);
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
  const proposeBOMFlag = args.includes('--propose-bom');
  const addClaude46 = args.includes('--add-claude-46');
  const compactContext = args.includes('--compact-context');

  console.log('='.repeat(60));
  console.log('BOM Specifications Generator');
  console.log('='.repeat(60));
  console.log();

  // Handle BOM proposal mode for new phases
  if (proposeBOMFlag) {
    console.log(`Mode: BOM Proposal for ${phaseFilter}`);
    console.log(`Models: ${DEFAULT_SPEC_MODELS.join(', ')}`);
    console.log();
    await proposeBOM(phaseFilter, DEFAULT_SPEC_MODELS);
    console.log();
    console.log('='.repeat(60));
    console.log('BOM proposal complete!');
    console.log('Review _bom-proposals/consensus.md to finalize the BOM.');
    console.log('='.repeat(60));
    return;
  }

  // Handle adding Claude 4.6 specs to existing items with 4.5
  if (addClaude46) {
    const useCompact = compactContext || phaseFilter === 'phase-3';
    console.log(`Mode: Add Claude Opus 4.6 specs to ${phaseFilter}`);
    if (useCompact) console.log('Using compact context for prompts');
    console.log();

    const phaseItems = ALL_BOM_ITEMS[phaseFilter];
    if (!phaseItems || phaseItems.length === 0) {
      console.error(`No items found for ${phaseFilter}`);
      process.exit(1);
    }

    const itemsToProcess = itemFilter
      ? phaseItems.filter(i => i.slug === itemFilter)
      : phaseItems;

    for (const item of itemsToProcess) {
      console.log(`Processing: ${item.name}`);
      await processItemModel(item, 'claude-opus-4-6', phaseFilter, { compactContext: useCompact });
    }

    console.log();
    console.log('='.repeat(60));
    console.log('Claude 4.6 specs added!');
    console.log('Run with --consensus-only to regenerate consensus with 4.6 input.');
    console.log('='.repeat(60));
    return;
  }

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

  // Determine models to process
  let modelsToProcess;
  if (modelFilter) {
    modelsToProcess = [modelFilter].filter(m => m in MODELS);
  } else if (consensusOnly) {
    // For consensus, use all available models (check what files exist)
    modelsToProcess = Object.keys(MODELS);
  } else {
    // For new specs, use default models (latest versions)
    modelsToProcess = DEFAULT_SPEC_MODELS;
  }

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
