#!/usr/bin/env node

// Migration Script: Questions Data to Markdown Files
//
// Converts the existing questions-data.ts file into individual markdown files
// with YAML frontmatter for each research question.
//
// Usage:
//   node scripts/migrate-questions-to-files.js
//
// Output:
//   static/content/research-questions/phase-0/*.md
//   static/content/research-questions/phase-1/*.md
//   static/content/research-questions/phase-2/*.md
//   static/content/research-questions/phase-X/index.json

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'static/content/research-questions');

// BOM item name mappings for richer context
const BOM_ITEM_NAMES = {
	'prospecting-satellites': 'Prospecting Satellites',
	'mining-robots': 'Mining Robots',
	'material-processing-station': 'Material Processing Station',
	'transport-vehicles': 'Transport Vehicles',
	'solar-power-arrays': 'Solar Power Arrays',
	'collector-units': 'Collector Units',
	'pv-blanket-arrays': 'PV Blanket Arrays',
	'assembly-robots': 'Assembly Robots',
	'assembly-node': 'Assembly Node Hub',
	'mass-drivers': 'Mass Drivers',
	'orbital-tugs': 'Orbital Tugs',
	'swarm-control-system': 'Swarm Control System',
	'collector-satellites': 'Collector Satellites',
	'maintenance-drones': 'Maintenance Drones',
	'manufacturing-expansion': 'Manufacturing Expansion'
};

// All questions data - embedded directly to avoid TS compilation
const ALL_QUESTIONS = [
	// Phase 0 Questions
	{
		id: 'rq-0-1',
		slug: 'optimal-spectrometer-resolution-tradeoff',
		title: 'Optimal spectrometer resolution vs. mass/power tradeoff',
		description: 'What is the optimal spectrometer resolution vs. mass/power tradeoff for asteroid composition analysis?',
		questionType: 'engineering-decision',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-1',
		sourceBOMItemSlug: 'prospecting-satellites',
		relatedBOMItems: ['bom-0-1'],
		createdDate: '2026-01-31',
		tags: ['spectrometry', 'instrumentation', 'asteroid-survey']
	},
	{
		id: 'rq-0-2',
		slug: 'onboard-vs-ground-spectral-unmixing',
		title: 'On-board vs ground spectral unmixing effectiveness',
		description: 'How effective is on-board spectral unmixing compared to ground processing for asteroid composition determination?',
		questionType: 'simulation',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-1',
		sourceBOMItemSlug: 'prospecting-satellites',
		relatedBOMItems: ['bom-0-1'],
		createdDate: '2026-01-31',
		tags: ['data-processing', 'autonomy', 'spectral-analysis']
	},
	{
		id: 'rq-0-3',
		slug: 'minimum-constellation-size',
		title: 'Minimum constellation size for survey coverage',
		description: 'What is the minimum constellation size for acceptable survey coverage of near-Earth asteroids?',
		questionType: 'simulation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-1',
		sourceBOMItemSlug: 'prospecting-satellites',
		relatedBOMItems: ['bom-0-1'],
		createdDate: '2026-01-31',
		tags: ['constellation-design', 'survey-coverage', 'mission-planning']
	},
	{
		id: 'rq-0-4',
		slug: 'dedicated-vs-rideshare-launches',
		title: 'Dedicated launches vs rideshare opportunities',
		description: 'Should the fleet use dedicated launches or rideshare opportunities for cost-effective deployment?',
		questionType: 'engineering-decision',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-1',
		sourceBOMItemSlug: 'prospecting-satellites',
		relatedBOMItems: ['bom-0-1'],
		createdDate: '2026-01-31',
		tags: ['launch-strategy', 'cost-optimization', 'deployment']
	},
	{
		id: 'rq-0-5',
		slug: 'composition-algorithm-validation',
		title: 'Asteroid composition algorithm validation',
		description: 'How to validate asteroid composition algorithms before deployment?',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-1',
		sourceBOMItemSlug: 'prospecting-satellites',
		relatedBOMItems: ['bom-0-1'],
		createdDate: '2026-01-31',
		tags: ['algorithm-validation', 'spectral-analysis', 'ground-truth']
	},
	{
		id: 'rq-0-6',
		slug: 'regolith-excavation-microgravity',
		title: 'Regolith behavior during microgravity excavation',
		description: 'How does regolith behave during excavation in microgravity?',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-2',
		sourceBOMItemSlug: 'mining-robots',
		relatedBOMItems: ['bom-0-2', 'bom-0-3'],
		createdDate: '2026-01-31',
		tags: ['microgravity', 'regolith', 'excavation', 'mining']
	},
	{
		id: 'rq-0-7',
		slug: 'anchoring-technology-reliability',
		title: 'Anchoring technology reliability across asteroid types',
		description: 'What anchoring technology is most reliable across asteroid types (C, S, M-type asteroids)?',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-2',
		sourceBOMItemSlug: 'mining-robots',
		relatedBOMItems: ['bom-0-2'],
		createdDate: '2026-01-31',
		tags: ['anchoring', 'surface-operations', 'asteroid-types']
	},
	{
		id: 'rq-0-8',
		slug: 'fleet-composition-homogeneous-vs-specialized',
		title: 'Optimal fleet composition: homogeneous vs specialized',
		description: 'What is the optimal fleet composition: homogeneous vs. specialized robots for mining operations?',
		questionType: 'engineering-decision',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-2',
		sourceBOMItemSlug: 'mining-robots',
		relatedBOMItems: ['bom-0-2'],
		createdDate: '2026-01-31',
		tags: ['fleet-design', 'specialization', 'robotics']
	},
	{
		id: 'rq-0-9',
		slug: 'electrostatic-charging-mechanisms',
		title: 'Electrostatic charging effects on mechanisms',
		description: 'How to handle electrostatic charging effects on mechanisms in space?',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-2',
		sourceBOMItemSlug: 'mining-robots',
		relatedBOMItems: ['bom-0-2', 'bom-1-5'],
		createdDate: '2026-01-31',
		tags: ['electrostatics', 'mechanisms', 'space-environment']
	},
	{
		id: 'rq-0-10',
		slug: 'onboard-processing-cost-effectiveness',
		title: 'On-board processing cost-effectiveness vs bulk transport',
		description: 'What level of on-board processing is cost-effective vs. bulk transport to processing station?',
		questionType: 'engineering-decision',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-2',
		sourceBOMItemSlug: 'mining-robots',
		relatedBOMItems: ['bom-0-2', 'bom-0-3', 'bom-0-4'],
		createdDate: '2026-01-31',
		tags: ['processing', 'logistics', 'cost-analysis']
	},
	{
		id: 'rq-0-11',
		slug: 'microgravity-metallurgy-scaling',
		title: 'Scaling microgravity metallurgy to industrial production',
		description: 'Can microgravity metallurgy scale from lab experiments to industrial production?',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-3',
		sourceBOMItemSlug: 'material-processing-station',
		relatedBOMItems: ['bom-0-3', 'bom-2-3'],
		createdDate: '2026-01-31',
		tags: ['metallurgy', 'microgravity', 'manufacturing', 'scaling']
	},
	{
		id: 'rq-0-12',
		slug: 'zero-g-zone-refining-process',
		title: 'Optimal zone refining process in zero-g',
		description: 'What is the optimal process for zone refining in zero-g?',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-3',
		sourceBOMItemSlug: 'material-processing-station',
		relatedBOMItems: ['bom-0-3', 'bom-2-3'],
		createdDate: '2026-01-31',
		tags: ['refining', 'zero-gravity', 'silicon', 'purification']
	},
	{
		id: 'rq-0-13',
		slug: 'slag-management-microgravity',
		title: 'Slag management and recycling in microgravity',
		description: 'How to manage and recycle slag in microgravity?',
		questionType: 'engineering-decision',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-3',
		sourceBOMItemSlug: 'material-processing-station',
		relatedBOMItems: ['bom-0-3'],
		createdDate: '2026-01-31',
		tags: ['waste-management', 'recycling', 'microgravity']
	},
	{
		id: 'rq-0-14',
		slug: 'propellant-production-phase-0-scope',
		title: 'Propellant production in Phase 0 scope',
		description: 'Should propellant production be included in Phase 0 scope?',
		questionType: 'discussion',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-3',
		sourceBOMItemSlug: 'material-processing-station',
		relatedBOMItems: ['bom-0-3', 'bom-0-4'],
		createdDate: '2026-01-31',
		tags: ['propellant', 'scope', 'ISRU']
	},
	{
		id: 'rq-0-15',
		slug: 'silicon-purity-achievability',
		title: 'Achievable silicon purity for solar cells',
		description: 'What level of silicon purity is achievable in space, and is it sufficient for solar cells?',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-3',
		sourceBOMItemSlug: 'material-processing-station',
		relatedBOMItems: ['bom-0-3', 'bom-1-2', 'bom-2-3'],
		createdDate: '2026-01-31',
		tags: ['silicon', 'purity', 'solar-cells', 'manufacturing']
	},
	{
		id: 'rq-0-16',
		slug: 'thruster-lifetime-isp-tradeoff',
		title: 'Thruster lifetime vs Isp tradeoff',
		description: 'What is the optimal thruster lifetime vs. Isp tradeoff for mission requirements?',
		questionType: 'engineering-decision',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-4',
		sourceBOMItemSlug: 'transport-vehicles',
		relatedBOMItems: ['bom-0-4', 'bom-1-6'],
		createdDate: '2026-01-31',
		tags: ['propulsion', 'thrusters', 'mission-design']
	},
	{
		id: 'rq-0-17',
		slug: 'microgravity-cargo-transfer',
		title: 'Efficient large cargo transfer in microgravity',
		description: 'How to efficiently transfer large cargo containers in microgravity?',
		questionType: 'engineering-decision',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-4',
		sourceBOMItemSlug: 'transport-vehicles',
		relatedBOMItems: ['bom-0-4', 'bom-1-6'],
		createdDate: '2026-01-31',
		tags: ['cargo-handling', 'microgravity', 'logistics']
	},
	{
		id: 'rq-0-18',
		slug: 'human-rating-transport-vehicles',
		title: 'Human-rating requirement for transport vehicles',
		description: 'Should vehicles be human-ratable for future crew transport?',
		questionType: 'discussion',
		priority: 'low',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-4',
		sourceBOMItemSlug: 'transport-vehicles',
		relatedBOMItems: ['bom-0-4'],
		createdDate: '2026-01-31',
		tags: ['human-spaceflight', 'safety', 'future-planning']
	},
	{
		id: 'rq-0-19',
		slug: 'fleet-size-vs-vehicle-capacity',
		title: 'Fleet size vs vehicle capacity tradeoff',
		description: 'What is the optimal fleet size vs. vehicle capacity tradeoff?',
		questionType: 'simulation',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-4',
		sourceBOMItemSlug: 'transport-vehicles',
		relatedBOMItems: ['bom-0-4'],
		createdDate: '2026-01-31',
		tags: ['fleet-sizing', 'logistics', 'optimization']
	},
	{
		id: 'rq-0-20',
		slug: 'xenon-propellant-sourcing-scale',
		title: 'Xenon propellant sourcing at scale',
		description: 'How to source xenon propellant economically at scale?',
		questionType: 'meta-research',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-4',
		sourceBOMItemSlug: 'transport-vehicles',
		relatedBOMItems: ['bom-0-4', 'bom-1-1', 'bom-1-6'],
		createdDate: '2026-01-31',
		tags: ['xenon', 'propellant', 'supply-chain']
	},
	{
		id: 'rq-0-21',
		slug: 'optimal-module-size-manufacturing',
		title: 'Optimal module size for manufacturing and deployment',
		description: 'What is the optimal module size for manufacturing and deployment?',
		questionType: 'engineering-decision',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-5',
		sourceBOMItemSlug: 'solar-power-arrays',
		relatedBOMItems: ['bom-0-5', 'bom-1-2'],
		createdDate: '2026-01-31',
		tags: ['module-design', 'manufacturing', 'deployment']
	},
	{
		id: 'rq-0-22',
		slug: 'concentrators-vs-flat-plate',
		title: 'Concentrators vs flat-plate for cell area reduction',
		description: 'Should concentrators be used to reduce cell area requirements for solar arrays?',
		questionType: 'engineering-decision',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-5',
		sourceBOMItemSlug: 'solar-power-arrays',
		relatedBOMItems: ['bom-0-5', 'bom-1-2', 'bom-2-1'],
		createdDate: '2026-01-31',
		tags: ['concentrators', 'solar-cells', 'design-tradeoff']
	},
	{
		id: 'rq-0-23',
		slug: 'energy-storage-30-year-life',
		title: 'Energy storage technology for 30-year station life',
		description: 'What energy storage technology best suits 30-year station life?',
		questionType: 'meta-research',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-5',
		sourceBOMItemSlug: 'solar-power-arrays',
		relatedBOMItems: ['bom-0-5', 'bom-0-3'],
		createdDate: '2026-01-31',
		tags: ['energy-storage', 'batteries', 'longevity']
	},
	{
		id: 'rq-0-24',
		slug: 'in-space-array-structure-manufacturing',
		title: 'In-space manufacturing of array structures',
		description: 'Can array structures be manufactured in space using station output?',
		questionType: 'experimentation',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-5',
		sourceBOMItemSlug: 'solar-power-arrays',
		relatedBOMItems: ['bom-0-5', 'bom-0-3', 'bom-2-3'],
		createdDate: '2026-01-31',
		tags: ['in-space-manufacturing', 'structures', 'ISRU']
	},
	{
		id: 'rq-0-25',
		slug: 'l4-l5-radiation-degradation',
		title: 'Radiation degradation rate at L4/L5 location',
		description: 'What is the radiation degradation rate at L4/L5 location?',
		questionType: 'meta-research',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-0',
		sourceBOMItemId: 'bom-0-5',
		sourceBOMItemSlug: 'solar-power-arrays',
		relatedBOMItems: ['bom-0-5', 'bom-1-1', 'bom-1-2'],
		createdDate: '2026-01-31',
		tags: ['radiation', 'degradation', 'orbital-environment']
	},

	// Phase 1 Questions
	{
		id: 'rq-1-1',
		slug: 'thin-film-pv-radiation-degradation',
		title: 'Thin-film PV radiation degradation rates at 0.3-0.5 AU',
		description: 'What is the actual 5-year survival curve for unshielded thin-film PV (especially perovskites) under intense proton flux at 0.3-0.5 AU? Laboratory data is insufficient for mission planning.',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-1',
		sourceBOMItemSlug: 'collector-units',
		relatedBOMItems: ['bom-1-1', 'bom-1-2', 'bom-2-1'],
		createdDate: '2026-02-01',
		tags: ['radiation', 'thin-film', 'perovskite', 'degradation']
	},
	{
		id: 'rq-1-2',
		slug: 'station-keeping-propellant-budget',
		title: 'Station-keeping propellant budget vs solar radiation pressure',
		description: 'Can solar radiation pressure alone maintain precise formation geometry required for phased array power transmission, or will propellant consumption exceed mass budgets?',
		questionType: 'simulation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-1',
		sourceBOMItemSlug: 'collector-units',
		relatedBOMItems: ['bom-1-1', 'bom-1-7'],
		createdDate: '2026-02-01',
		tags: ['station-keeping', 'solar-pressure', 'formation-flying']
	},
	{
		id: 'rq-1-3',
		slug: 'xenon-supply-chain-constraint',
		title: 'Xenon supply chain constraint for Phase 1',
		description: 'Phase 1 at scale requires 150 tonnes of xenon (global annual production ~70 tonnes). Is alternative propellant (krypton, ionic liquid) viable without significant Isp penalty?',
		questionType: 'meta-research',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-1',
		sourceBOMItemSlug: 'collector-units',
		relatedBOMItems: ['bom-1-1', 'bom-1-6', 'bom-0-4'],
		createdDate: '2026-02-01',
		tags: ['xenon', 'propellant', 'supply-chain', 'krypton']
	},
	{
		id: 'rq-1-4',
		slug: 'high-voltage-arc-fault-behavior',
		title: 'High-voltage arc fault behavior in plasma environment',
		description: 'How do 600-1200 VDC systems behave in the plasma environment at various solar distances? What detection/isolation response times are required?',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-1',
		sourceBOMItemSlug: 'collector-units',
		relatedBOMItems: ['bom-1-1', 'bom-1-2', 'bom-2-1'],
		createdDate: '2026-02-01',
		tags: ['high-voltage', 'arcing', 'plasma', 'fault-protection']
	},
	{
		id: 'rq-1-5',
		slug: 'membrane-deployment-reliability',
		title: 'Deployment reliability for origami-folded membrane structures',
		description: 'What is acceptable deployment failure rate for origami-folded or roll-out membrane structures at 100-1000x scale? How many ground deployment cycles validate flight reliability?',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-1',
		sourceBOMItemSlug: 'collector-units',
		relatedBOMItems: ['bom-1-1', 'bom-1-2'],
		createdDate: '2026-02-01',
		tags: ['deployment', 'membrane', 'reliability', 'testing']
	},
	{
		id: 'rq-1-6',
		slug: 'swarm-collision-probability',
		title: 'Swarm collision probability and avoidance',
		description: 'With 1,000+ units in formation, what inter-unit spacing and autonomous avoidance capability prevents cascading collisions while maintaining power transmission coherence?',
		questionType: 'simulation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-1',
		sourceBOMItemSlug: 'collector-units',
		relatedBOMItems: ['bom-1-1', 'bom-1-7', 'bom-2-1'],
		createdDate: '2026-02-01',
		tags: ['collision-avoidance', 'swarm-coordination', 'formation']
	},
	{
		id: 'rq-1-7',
		slug: 'large-scale-membrane-deployment-dynamics',
		title: 'Large-scale membrane deployment dynamics at 1 km scale',
		description: 'Can membrane flatness and structural stability be maintained at 1 km scale using only centrifugal force and/or boom tensioning? What are the flutter modes and control-structure interaction limits for slew maneuvers?',
		questionType: 'simulation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-2',
		sourceBOMItemSlug: 'pv-blanket-arrays',
		relatedBOMItems: ['bom-1-2', 'bom-2-1'],
		createdDate: '2026-02-01',
		tags: ['membrane-dynamics', 'structural-stability', 'flutter']
	},
	{
		id: 'rq-1-8',
		slug: 'high-voltage-arcing-thin-substrates',
		title: 'High-voltage arcing prevention on ultra-thin substrates',
		description: 'How do we prevent arcing and insulation breakdown at 800V-10kV on ultra-thin substrates in the solar wind plasma environment? What spacing rules, coatings, and detection systems are required?',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-2',
		sourceBOMItemSlug: 'pv-blanket-arrays',
		relatedBOMItems: ['bom-1-2', 'bom-1-1', 'bom-2-1'],
		createdDate: '2026-02-01',
		tags: ['high-voltage', 'arcing', 'insulation', 'thin-film']
	},
	{
		id: 'rq-1-9',
		slug: 'perovskite-space-qualification',
		title: 'Perovskite cell space qualification for multi-year operation',
		description: 'Can perovskite-based cells achieve adequate radiation hardness and thermal stability for multi-year space operation, or must Phase 1 rely on proven but heavier/costlier alternatives?',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-2',
		sourceBOMItemSlug: 'pv-blanket-arrays',
		relatedBOMItems: ['bom-1-2', 'bom-1-1', 'bom-2-1'],
		createdDate: '2026-02-01',
		tags: ['perovskite', 'space-qualification', 'radiation-hardness']
	},
	{
		id: 'rq-1-10',
		slug: 'critical-material-supply-chains',
		title: 'Critical material supply chains (Tellurium, Indium)',
		description: 'Tellurium (for CdTe) and Indium (for transparent conductors) face supply constraints at Dyson-scale production. What alternative materials or recycling strategies close the supply gap?',
		questionType: 'meta-research',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-2',
		sourceBOMItemSlug: 'pv-blanket-arrays',
		relatedBOMItems: ['bom-1-2', 'bom-2-1', 'bom-2-3'],
		createdDate: '2026-02-01',
		tags: ['materials', 'supply-chain', 'tellurium', 'indium']
	},
	{
		id: 'rq-1-11',
		slug: 'swarm-power-architecture-end-use',
		title: 'Swarm-level power architecture and end-use',
		description: 'What is the end-use of generated power - local electric propulsion, power beaming to Earth/Mercury, or inter-unit distribution? This fundamentally affects voltage regulation, duty cycles, and receiver infrastructure requirements.',
		questionType: 'discussion',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-2',
		sourceBOMItemSlug: 'pv-blanket-arrays',
		relatedBOMItems: ['bom-1-2', 'bom-1-1', 'bom-2-1'],
		createdDate: '2026-02-01',
		tags: ['power-architecture', 'power-beaming', 'system-design']
	},
	{
		id: 'rq-1-12',
		slug: 'isru-manufacturing-transition-point',
		title: 'In-space vs Earth manufacturing transition point',
		description: 'At what production scale does in-situ resource utilization become cost-effective, and what is the minimum viable "seed factory" capability required?',
		questionType: 'simulation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-2',
		sourceBOMItemSlug: 'pv-blanket-arrays',
		relatedBOMItems: ['bom-1-2', 'bom-2-3'],
		createdDate: '2026-02-01',
		tags: ['ISRU', 'manufacturing', 'economics', 'scaling']
	},
	{
		id: 'rq-1-13',
		slug: 'thermal-management-inner-solar-system',
		title: 'Thermal management at 0.5 AU or closer',
		description: 'How to maintain component temperatures within operational limits at 0.5 AU or closer? Passive radiators vs. active cooling loops - what is the mass/reliability trade?',
		questionType: 'engineering-decision',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-3',
		sourceBOMItemSlug: 'assembly-robots',
		relatedBOMItems: ['bom-1-3', 'bom-1-4', 'bom-2-2'],
		createdDate: '2026-02-01',
		tags: ['thermal-management', 'cooling', 'inner-solar-system']
	},
	{
		id: 'rq-1-14',
		slug: 'joining-technology-selection',
		title: 'Optimal joining technology mix for solar collector structures',
		description: 'What is the optimal mix of welding (E-beam, FSW), mechanical fastening, and adhesive bonding for solar collector structures? How do these perform over decades of thermal cycling?',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-3',
		sourceBOMItemSlug: 'assembly-robots',
		relatedBOMItems: ['bom-1-3', 'bom-1-4'],
		createdDate: '2026-02-01',
		tags: ['joining', 'welding', 'fastening', 'thermal-cycling']
	},
	{
		id: 'rq-1-15',
		slug: 'thruster-plume-contamination',
		title: 'Thruster plume and outgassing contamination control',
		description: 'How to prevent thruster plumes, outgassing, and debris from degrading thin-film photovoltaics and optical sensors? What are acceptable exposure thresholds?',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-3',
		sourceBOMItemSlug: 'assembly-robots',
		relatedBOMItems: ['bom-1-3', 'bom-1-1', 'bom-1-2'],
		createdDate: '2026-02-01',
		tags: ['contamination', 'thruster-plumes', 'outgassing']
	},
	{
		id: 'rq-1-16',
		slug: 'autonomous-assembly-certification',
		title: 'Autonomy certification for fully autonomous assembly',
		description: 'What safety case and verification approach is acceptable for fully autonomous assembly operations with no human-in-the-loop for extended periods?',
		questionType: 'discussion',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-3',
		sourceBOMItemSlug: 'assembly-robots',
		relatedBOMItems: ['bom-1-3', 'bom-1-4', 'bom-1-7'],
		createdDate: '2026-02-01',
		tags: ['autonomy', 'certification', 'safety', 'verification']
	},
	{
		id: 'rq-1-17',
		slug: 'dust-debris-sensor-cleaning',
		title: 'Dust and debris management for optical sensors',
		description: 'How to keep optical sensors and laser communications clean without consumables, especially if operating near asteroid-sourced materials?',
		questionType: 'engineering-decision',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-3',
		sourceBOMItemSlug: 'assembly-robots',
		relatedBOMItems: ['bom-1-3', 'bom-2-2'],
		createdDate: '2026-02-01',
		tags: ['dust', 'debris', 'sensor-cleaning', 'optics']
	},
	{
		id: 'rq-1-18',
		slug: 'collector-interface-finalization',
		title: 'Tile/Collector interface finalization',
		description: 'What are the final mass, stiffness, and deployment mechanisms for swarm elements? These strongly drive robot force, precision, and throughput requirements.',
		questionType: 'engineering-decision',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-3',
		sourceBOMItemSlug: 'assembly-robots',
		relatedBOMItems: ['bom-1-3', 'bom-1-1', 'bom-1-2', 'bom-1-4'],
		createdDate: '2026-02-01',
		tags: ['interfaces', 'standards', 'deployment-mechanisms']
	},
	{
		id: 'rq-1-19',
		slug: 'orbital-location-trade-analysis',
		title: 'Optimal orbital location trade analysis',
		description: 'What is the correct balance between solar intensity (favoring inner orbits), communication latency (favoring Earth proximity), thermal management complexity, and swarm deployment geometry? Requires detailed mission design analysis.',
		questionType: 'simulation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-4',
		sourceBOMItemSlug: 'assembly-node',
		relatedBOMItems: ['bom-1-4', 'bom-1-1', 'bom-1-2'],
		createdDate: '2026-02-01',
		tags: ['orbit-selection', 'mission-design', 'trade-study']
	},
	{
		id: 'rq-1-20',
		slug: 'nuclear-vs-solar-power-decision',
		title: 'Nuclear vs solar power decision for Assembly Node',
		description: 'Should Phase 1 commit to nuclear for compactness and eclipse independence, pursue solar-only for lower TRL risk, or develop a hybrid architecture? What is the minimum viable nuclear power scaling pathway?',
		questionType: 'engineering-decision',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-4',
		sourceBOMItemSlug: 'assembly-node',
		relatedBOMItems: ['bom-1-4', 'bom-0-5'],
		createdDate: '2026-02-01',
		tags: ['power-source', 'nuclear', 'solar', 'architecture']
	},
	{
		id: 'rq-1-21',
		slug: 'feedstock-acquisition-isru-timeline',
		title: 'Feedstock acquisition and ISRU transition timeline',
		description: 'When and how should the Assembly Node transition from Earth-supplied pre-processed materials to asteroid or planetary-derived feedstock? What is the minimum viable ISRU capability for Phase 1?',
		questionType: 'discussion',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-4',
		sourceBOMItemSlug: 'assembly-node',
		relatedBOMItems: ['bom-1-4', 'bom-0-2', 'bom-0-3', 'bom-2-3'],
		createdDate: '2026-02-01',
		tags: ['ISRU', 'feedstock', 'supply-chain', 'timeline']
	},
	{
		id: 'rq-1-22',
		slug: 'autonomous-assembly-reliability-target',
		title: 'Autonomous assembly reliability target (95%+)',
		description: 'Can autonomous robotic assembly achieve the required 95%+ first-pass success rate? What ground testing, on-orbit learning, and human-in-the-loop backup strategies are needed?',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-4',
		sourceBOMItemSlug: 'assembly-node',
		relatedBOMItems: ['bom-1-4', 'bom-1-3'],
		createdDate: '2026-02-01',
		tags: ['reliability', 'autonomy', 'testing', 'assembly']
	},
	{
		id: 'rq-1-23',
		slug: 'waste-contamination-management',
		title: 'Manufacturing waste and contamination management',
		description: 'How should manufacturing byproducts (slag, outgassing, particulates) be handled to avoid sensor obscuration, debris generation, and clean-zone contamination?',
		questionType: 'engineering-decision',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-4',
		sourceBOMItemSlug: 'assembly-node',
		relatedBOMItems: ['bom-1-4', 'bom-2-3'],
		createdDate: '2026-02-01',
		tags: ['waste-management', 'contamination', 'manufacturing']
	},
	{
		id: 'rq-1-24',
		slug: 'swarm-coordination-architecture-scale',
		title: 'Swarm coordination architecture at scale (millions of units)',
		description: 'As the swarm grows to millions of units, should coordination be centralized (Assembly Node as master), distributed (peer-to-peer), or hierarchical? What communication bandwidth and compute are required?',
		questionType: 'simulation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-4',
		sourceBOMItemSlug: 'assembly-node',
		relatedBOMItems: ['bom-1-4', 'bom-1-7', 'bom-2-1'],
		createdDate: '2026-02-01',
		tags: ['swarm-coordination', 'scalability', 'architecture']
	},
	{
		id: 'rq-1-25',
		slug: 'capture-architecture-definition',
		title: 'Orbital capture architecture definition',
		description: 'All models identify the orbital capture system as critical but undefined - net capture, magnetic braking, foam deceleration, or autonomous tug rendezvous? Velocity dispersion tolerance and capture envelope sizing depend on this decision.',
		questionType: 'engineering-decision',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-5',
		sourceBOMItemSlug: 'mass-drivers',
		relatedBOMItems: ['bom-1-5', 'bom-1-6'],
		createdDate: '2026-02-01',
		tags: ['capture-system', 'mass-driver', 'rendezvous']
	},
	{
		id: 'rq-1-26',
		slug: 'in-situ-conductor-production',
		title: 'In-situ conductor production feasibility',
		description: 'Can aluminum or copper conductors with adequate purity and insulation be manufactured from lunar/asteroid regolith within Phase 1 timeframe? This determines whether 500-2,000 tonnes of conductor must be imported from Earth.',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-5',
		sourceBOMItemSlug: 'mass-drivers',
		relatedBOMItems: ['bom-1-5', 'bom-0-3', 'bom-2-3'],
		createdDate: '2026-02-01',
		tags: ['ISRU', 'conductor', 'aluminum', 'manufacturing']
	},
	{
		id: 'rq-1-27',
		slug: 'coil-operating-temperature-trade',
		title: 'Optimal superconducting coil operating temperature',
		description: 'Trade between lower temperature (20-40 K) for higher current capacity versus higher temperature (77 K) for reduced cooling complexity remains unresolved; thermal cycling effects on superconductor performance need validation.',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-5',
		sourceBOMItemSlug: 'mass-drivers',
		relatedBOMItems: ['bom-1-5'],
		createdDate: '2026-02-01',
		tags: ['superconductor', 'thermal', 'cryogenics']
	},
	{
		id: 'rq-1-28',
		slug: 'foundation-recoil-management',
		title: 'Foundation and recoil management for mass drivers',
		description: 'How do regolith foundations handle repetitive shear stress from 100-1,000 g acceleration pulses? Geotechnical characterization of candidate sites required.',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-5',
		sourceBOMItemSlug: 'mass-drivers',
		relatedBOMItems: ['bom-1-5'],
		createdDate: '2026-02-01',
		tags: ['foundation', 'geotechnical', 'recoil', 'lunar-surface']
	},
	{
		id: 'rq-1-29',
		slug: 'carrier-reuse-logistics',
		title: 'Carrier/sabot reuse logistics',
		description: 'If carriers are reusable, what is the return mechanism - orbital tug retrieval, separate deceleration track, or accept consumable loss? Mass and cost implications differ by orders of magnitude.',
		questionType: 'engineering-decision',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-5',
		sourceBOMItemSlug: 'mass-drivers',
		relatedBOMItems: ['bom-1-5', 'bom-1-6'],
		createdDate: '2026-02-01',
		tags: ['carrier', 'reusability', 'logistics']
	},
	{
		id: 'rq-1-30',
		slug: 'emi-lunar-dust-charging',
		title: 'EMI and lunar dust charging effects',
		description: 'High pulsed magnetic fields may charge lunar dust and interfere with nearby electronics; site layout constraints and shielding requirements undefined.',
		questionType: 'experimentation',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-5',
		sourceBOMItemSlug: 'mass-drivers',
		relatedBOMItems: ['bom-1-5'],
		createdDate: '2026-02-01',
		tags: ['EMI', 'lunar-dust', 'charging', 'shielding']
	},
	{
		id: 'rq-1-31',
		slug: 'alternative-propellant-viability',
		title: 'Argon/krypton propellant viability for Hall thrusters',
		description: 'Can argon or krypton Hall thrusters achieve required Isp (>2000s) with current technology to mitigate xenon scarcity and price volatility, or must Phase 1 commit to xenon with supply contracts?',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-6',
		sourceBOMItemSlug: 'orbital-tugs',
		relatedBOMItems: ['bom-1-6', 'bom-0-4', 'bom-1-1'],
		createdDate: '2026-02-01',
		tags: ['propellant', 'argon', 'krypton', 'Hall-thruster']
	},
	{
		id: 'rq-1-32',
		slug: 'radiation-hardening-vs-cost',
		title: 'Radiation hardening balance vs mission risk and cost',
		description: 'What is the acceptable balance between radiation hardening cost and mission risk at the planned operating distances? Can COTS electronics survive 3-7 years at 0.3-1.0 AU with spot shielding?',
		questionType: 'meta-research',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-6',
		sourceBOMItemSlug: 'orbital-tugs',
		relatedBOMItems: ['bom-1-6', 'bom-1-1', 'bom-1-3'],
		createdDate: '2026-02-01',
		tags: ['radiation-hardening', 'COTS', 'electronics', 'shielding']
	},
	{
		id: 'rq-1-33',
		slug: 'tug-end-of-life-disposal',
		title: 'End-of-life disposal protocol for orbital tugs',
		description: 'What is the disposal protocol for failed tugs - solar impact (high delta-v cost), graveyard orbit parking, or in-situ recycling/salvage for later phases?',
		questionType: 'discussion',
		priority: 'low',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-6',
		sourceBOMItemSlug: 'orbital-tugs',
		relatedBOMItems: ['bom-1-6'],
		createdDate: '2026-02-01',
		tags: ['end-of-life', 'disposal', 'debris', 'recycling']
	},
	{
		id: 'rq-1-34',
		slug: 'refueling-concept-operations',
		title: 'Refueling concept of operations',
		description: 'Should Phase 1 implement fluid transfer, tank swap modules, or disposable drop tanks at depots? What contamination control and leak detection protocols are required?',
		questionType: 'engineering-decision',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-6',
		sourceBOMItemSlug: 'orbital-tugs',
		relatedBOMItems: ['bom-1-6', 'bom-1-4'],
		createdDate: '2026-02-01',
		tags: ['refueling', 'depot', 'propellant-transfer']
	},
	{
		id: 'rq-1-35',
		slug: 'non-cooperative-target-capture',
		title: 'Non-cooperative target capture capability',
		description: 'Must tugs capture tumbling or uncontrolled payloads, requiring vision-based pose estimation and grapple mechanisms, or can all Phase 1 assets be assumed cooperative with standard interfaces?',
		questionType: 'engineering-decision',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-6',
		sourceBOMItemSlug: 'orbital-tugs',
		relatedBOMItems: ['bom-1-6', 'bom-1-5'],
		createdDate: '2026-02-01',
		tags: ['capture', 'rendezvous', 'grappling', 'autonomy']
	},
	{
		id: 'rq-1-36',
		slug: 'standard-orbit-depot-selection',
		title: 'Standard depot orbit selection',
		description: 'Should the primary depot/assembly yard be located at NRHO, Sun-Earth L4/L5, or a different cislunar/heliocentric orbit? This fundamentally changes delta-v budgets and mission timelines.',
		questionType: 'simulation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-6',
		sourceBOMItemSlug: 'orbital-tugs',
		relatedBOMItems: ['bom-1-6', 'bom-1-4', 'bom-1-5'],
		createdDate: '2026-02-01',
		tags: ['orbit-selection', 'depot', 'logistics', 'delta-v']
	},
	{
		id: 'rq-1-37',
		slug: 'propulsion-actuation-authority',
		title: 'Propulsion/actuation authority for station-keeping',
		description: 'Can solar radiation pressure trimming alone provide sufficient control bandwidth for collision avoidance and slot-keeping, or is dedicated propulsion (cold gas, ion) required? What is the minimum delta-v budget per year?',
		questionType: 'simulation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-7',
		sourceBOMItemSlug: 'swarm-control-system',
		relatedBOMItems: ['bom-1-7', 'bom-1-1'],
		createdDate: '2026-02-01',
		tags: ['station-keeping', 'propulsion', 'solar-pressure']
	},
	{
		id: 'rq-1-38',
		slug: 'optical-surface-degradation-rate',
		title: 'Optical surface degradation from micrometeoroids',
		description: 'At what rate do micrometeoroid impacts degrade laser communication lens performance, and when does bit error rate become unsustainable - requiring fallback to RF?',
		questionType: 'meta-research',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-7',
		sourceBOMItemSlug: 'swarm-control-system',
		relatedBOMItems: ['bom-1-7', 'bom-1-1'],
		createdDate: '2026-02-01',
		tags: ['optical-degradation', 'micrometeoroid', 'laser-comm']
	},
	{
		id: 'rq-1-39',
		slug: 'cluster-coordinator-duty-cycle',
		title: 'Cluster coordinator rotation duty cycle',
		description: 'How frequently should the coordinator role rotate within a cluster to balance power consumption, data transfer overhead, and single-point-of-failure risk?',
		questionType: 'simulation',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-7',
		sourceBOMItemSlug: 'swarm-control-system',
		relatedBOMItems: ['bom-1-7'],
		createdDate: '2026-02-01',
		tags: ['coordination', 'duty-cycle', 'redundancy']
	},
	{
		id: 'rq-1-40',
		slug: 'slot-reallocation-governance',
		title: 'Slot reallocation governance protocol',
		description: 'When a node fails or drifts out of its assigned orbital slot, what is the protocol for reassigning slots to prevent cascading conflicts or density violations?',
		questionType: 'discussion',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-7',
		sourceBOMItemSlug: 'swarm-control-system',
		relatedBOMItems: ['bom-1-7'],
		createdDate: '2026-02-01',
		tags: ['slot-management', 'governance', 'failure-handling']
	},
	{
		id: 'rq-1-41',
		slug: 'software-update-strategy-scale',
		title: 'Software update strategy at scale',
		description: 'How do we safely deploy delta updates to thousands of nodes with rollback capability, preventing mass bricking from a faulty patch?',
		questionType: 'engineering-decision',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-7',
		sourceBOMItemSlug: 'swarm-control-system',
		relatedBOMItems: ['bom-1-7'],
		createdDate: '2026-02-01',
		tags: ['software-update', 'rollback', 'scalability']
	},
	{
		id: 'rq-1-42',
		slug: 'node-end-of-life-disposal',
		title: 'End-of-life disposal for failed swarm nodes',
		description: 'What is the passivation and disposal protocol for failed nodes in heliocentric orbit - drift to "graveyard" bands, controlled deorbit, or acceptance of debris persistence?',
		questionType: 'discussion',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-1',
		sourceBOMItemId: 'bom-1-7',
		sourceBOMItemSlug: 'swarm-control-system',
		relatedBOMItems: ['bom-1-7', 'bom-1-1'],
		createdDate: '2026-02-01',
		tags: ['end-of-life', 'disposal', 'debris', 'passivation']
	},

	// Phase 2 Questions
	{
		id: 'rq-2-1',
		slug: 'multi-kilovolt-arc-management',
		title: 'Multi-kilovolt arc management in kilometer-scale membranes',
		description: 'How do we reliably prevent and detect arcing in multi-kilovolt DC systems across kilometer-scale membranes in the space plasma environment? All models identify this as a critical risk requiring extensive vacuum testing infrastructure.',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-1',
		sourceBOMItemSlug: 'collector-satellites',
		relatedBOMItems: ['bom-2-1', 'bom-1-1', 'bom-1-2'],
		createdDate: '2026-02-01',
		tags: ['high-voltage', 'arcing', 'membrane', 'testing']
	},
	{
		id: 'rq-2-2',
		slug: 'membrane-long-term-degradation',
		title: 'Thin-film substrate long-term UV degradation',
		description: 'What is the actual degradation rate of thin-film substrates (Kapton, polyimide variants) under intense UV flux at 0.3-0.5 AU over 10-50 year timescales? Self-healing polymers or protective coatings may be required.',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-1',
		sourceBOMItemSlug: 'collector-satellites',
		relatedBOMItems: ['bom-2-1', 'bom-1-2'],
		createdDate: '2026-02-01',
		tags: ['UV-degradation', 'thin-film', 'longevity', 'materials']
	},
	{
		id: 'rq-2-3',
		slug: 'billion-unit-collision-avoidance',
		title: 'Collision avoidance certification for billion-unit swarms',
		description: 'How do we certify and govern autonomous collision avoidance behaviors for billion-unit swarms? What are the verification approaches and who sets the operational rules?',
		questionType: 'discussion',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-1',
		sourceBOMItemSlug: 'collector-satellites',
		relatedBOMItems: ['bom-2-1', 'bom-1-7'],
		createdDate: '2026-02-01',
		tags: ['collision-avoidance', 'certification', 'governance', 'swarm']
	},
	{
		id: 'rq-2-4',
		slug: 'thermal-warping-large-membranes',
		title: 'Thermal warping effects on large membranes',
		description: 'Will thermal gradients between sun-facing and dark sides cause membrane curling that disrupts phased array focus or structural integrity? Active electrostatic stiffening may be needed.',
		questionType: 'simulation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-1',
		sourceBOMItemSlug: 'collector-satellites',
		relatedBOMItems: ['bom-2-1', 'bom-1-2'],
		createdDate: '2026-02-01',
		tags: ['thermal-warping', 'membrane', 'structural-integrity']
	},
	{
		id: 'rq-2-5',
		slug: 'kilometer-scale-isru-manufacturing',
		title: 'In-space manufacturing readiness for kilometer-scale structures',
		description: 'Can we manufacture kilometer-scale conductive tethers, thin-film PV, and structural elements reliably in zero-G using asteroid or lunar materials? The timeline for ISRU maturity drives the entire program architecture.',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-1',
		sourceBOMItemSlug: 'collector-satellites',
		relatedBOMItems: ['bom-2-1', 'bom-2-3', 'bom-0-3'],
		createdDate: '2026-02-01',
		tags: ['ISRU', 'manufacturing', 'kilometer-scale', 'zero-gravity']
	},
	{
		id: 'rq-2-6',
		slug: 'power-export-interface-standard',
		title: 'Power export interface standard',
		description: 'Should collectors dock physically with HV connectors, deploy robotic power tethers, or perform local RF/optical conversion? This decision cascades through insulation design, connector standards, and operational concepts.',
		questionType: 'engineering-decision',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-1',
		sourceBOMItemSlug: 'collector-satellites',
		relatedBOMItems: ['bom-2-1', 'bom-1-2'],
		createdDate: '2026-02-01',
		tags: ['power-interface', 'standards', 'connectors', 'power-beaming']
	},
	{
		id: 'rq-2-7',
		slug: 'depot-spacing-logistics-architecture',
		title: 'Optimal depot spacing and logistics architecture',
		description: 'What is the ideal distance between maintenance depots, and should propellant be delivered by dedicated tanker drones or centralized hub returns? All models identify this as critical to fleet sizing and propulsion requirements.',
		questionType: 'simulation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-2',
		sourceBOMItemSlug: 'maintenance-drones',
		relatedBOMItems: ['bom-2-2', 'bom-1-6'],
		createdDate: '2026-02-01',
		tags: ['depot', 'logistics', 'fleet-sizing', 'propellant']
	},
	{
		id: 'rq-2-8',
		slug: 'autonomous-repair-authority-limits',
		title: 'Autonomous repair authority limits',
		description: 'How much repair authority should drones have without human approval? Communication latency makes Earth-based approval impractical for routine operations, but risk thresholds for autonomous action remain undefined.',
		questionType: 'discussion',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-2',
		sourceBOMItemSlug: 'maintenance-drones',
		relatedBOMItems: ['bom-2-2', 'bom-1-3'],
		createdDate: '2026-02-01',
		tags: ['autonomy', 'authority', 'repair', 'risk-management']
	},
	{
		id: 'rq-2-9',
		slug: 'drone-thermal-management-inside-1au',
		title: 'Drone thermal management inside 1 AU',
		description: 'If Phase 2 extends to 0.3-0.6 AU orbits, current thermal designs may be inadequate. What operational constraints, radiator sizing, or array feathering strategies are required for high-flux environments?',
		questionType: 'engineering-decision',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-2',
		sourceBOMItemSlug: 'maintenance-drones',
		relatedBOMItems: ['bom-2-2', 'bom-1-3'],
		createdDate: '2026-02-01',
		tags: ['thermal-management', 'inner-solar-system', 'radiators']
	},
	{
		id: 'rq-2-10',
		slug: 'drone-contamination-dust-accumulation',
		title: 'Drone self-cleaning and contamination control',
		description: 'How do drones clean themselves and avoid contaminating sensitive collector optics during proximity operations? Electrostatic repulsion and plume impingement constraints remain unresolved.',
		questionType: 'engineering-decision',
		priority: 'medium',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-2',
		sourceBOMItemSlug: 'maintenance-drones',
		relatedBOMItems: ['bom-2-2', 'bom-2-1'],
		createdDate: '2026-02-01',
		tags: ['contamination', 'cleaning', 'proximity-operations']
	},
	{
		id: 'rq-2-11',
		slug: 'cold-welding-mechanism-degradation',
		title: 'Cold-welding and mechanism degradation',
		description: 'Will mechanical latches, grapple mechanisms, and tool interfaces experience cold-welding or lubricant degradation after years of vacuum exposure and thermal cycling?',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-2',
		sourceBOMItemSlug: 'maintenance-drones',
		relatedBOMItems: ['bom-2-2', 'bom-1-3'],
		createdDate: '2026-02-01',
		tags: ['cold-welding', 'mechanisms', 'lubrication', 'longevity']
	},
	{
		id: 'rq-2-12',
		slug: 'failure-mode-distribution',
		title: 'Swarm element failure mode distribution',
		description: 'What fraction of failures are recoverable by ORU swap versus requiring in-situ repair, structural patching, or full element replacement? This drives the balance between inspector and servicer fleet sizes.',
		questionType: 'meta-research',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-2',
		sourceBOMItemSlug: 'maintenance-drones',
		relatedBOMItems: ['bom-2-2', 'bom-2-1'],
		createdDate: '2026-02-01',
		tags: ['failure-modes', 'repair-strategy', 'fleet-sizing']
	},
	{
		id: 'rq-2-13',
		slug: 'asteroid-composition-variability',
		title: 'Asteroid composition variability impact on processing',
		description: 'What is the actual compositional range of target asteroids, and how must processing systems adapt? All models flag this as critical for process design and yield predictions, requiring precursor missions.',
		questionType: 'meta-research',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-3',
		sourceBOMItemSlug: 'manufacturing-expansion',
		relatedBOMItems: ['bom-2-3', 'bom-0-1', 'bom-0-2'],
		createdDate: '2026-02-01',
		tags: ['asteroid-composition', 'processing', 'variability']
	},
	{
		id: 'rq-2-14',
		slug: 'space-silicon-purity-achievement',
		title: 'Space-based silicon purity achievement',
		description: 'Can 99.99% silicon purity be achieved with space-based zone refining for solar cell production, or will this require Earth supply?',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-3',
		sourceBOMItemSlug: 'manufacturing-expansion',
		relatedBOMItems: ['bom-2-3', 'bom-0-3'],
		createdDate: '2026-02-01',
		tags: ['silicon', 'purity', 'zone-refining', 'solar-cells']
	},
	{
		id: 'rq-2-15',
		slug: 'thin-film-material-selection',
		title: 'Thin-film material selection (polymer vs inorganic)',
		description: 'Should collectors use polymer-based films (lighter, easier to handle) or inorganic films (better UV/radiation stability)? This affects swarm maintenance burden and lifetime.',
		questionType: 'engineering-decision',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-3',
		sourceBOMItemSlug: 'manufacturing-expansion',
		relatedBOMItems: ['bom-2-3', 'bom-2-1', 'bom-1-2'],
		createdDate: '2026-02-01',
		tags: ['thin-film', 'materials', 'polymer', 'inorganic']
	},
	{
		id: 'rq-2-16',
		slug: 'radiator-durability-contamination',
		title: 'Radiator durability and contamination over decades',
		description: 'How do radiators perform under long-term micrometeoroid bombardment and process contamination? All models identify thermal rejection as a critical bottleneck but lack validated lifetime data.',
		questionType: 'experimentation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-3',
		sourceBOMItemSlug: 'manufacturing-expansion',
		relatedBOMItems: ['bom-2-3', 'bom-1-4'],
		createdDate: '2026-02-01',
		tags: ['radiators', 'micrometeoroid', 'thermal-rejection', 'longevity']
	},
	{
		id: 'rq-2-17',
		slug: 'fleet-coordination-scale-constraints',
		title: 'Fleet coordination constraints at scale',
		description: 'At what fleet size (hundreds to thousands of nodes) do coordination, communication bandwidth, and software update challenges become dominant constraints?',
		questionType: 'simulation',
		priority: 'high',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-3',
		sourceBOMItemSlug: 'manufacturing-expansion',
		relatedBOMItems: ['bom-2-3', 'bom-1-7'],
		createdDate: '2026-02-01',
		tags: ['coordination', 'scalability', 'communication', 'software']
	},
	{
		id: 'rq-2-18',
		slug: 'vacuum-dust-particulate-control',
		title: 'Vacuum dust/particulate control for manufacturing',
		description: 'Can electrostatic and mechanical dust control achieve the cleanliness levels required for thin-film production and precision mechanisms without atmospheric filtration?',
		questionType: 'experimentation',
		priority: 'critical',
		status: 'open',
		sourcePhaseId: 'phase-2',
		sourceBOMItemId: 'bom-2-3',
		sourceBOMItemSlug: 'manufacturing-expansion',
		relatedBOMItems: ['bom-2-3', 'bom-1-4'],
		createdDate: '2026-02-01',
		tags: ['dust-control', 'vacuum', 'cleanliness', 'manufacturing']
	}
];

// Format phase ID for display
function formatPhase(phaseId) {
	const phaseNames = {
		'phase-0': 'Phase 0 - Resource Acquisition',
		'phase-1': 'Phase 1 - Initial Swarm Deployment',
		'phase-2': 'Phase 2 - Swarm Expansion'
	};
	return phaseNames[phaseId] || phaseId;
}

// Format question type for display
function formatQuestionType(type) {
	const typeNames = {
		'meta-research': 'literature review and meta-analysis',
		experimentation: 'physical testing and experimentation',
		simulation: 'computational modeling and simulation',
		'engineering-decision': 'engineering design tradeoff analysis',
		discussion: 'stakeholder discussion and consensus building'
	};
	return typeNames[type] || type;
}

// Generate placeholder context for a question
function generatePlaceholderContext(question, bomItemName) {
	return `## Background

This research question emerges from the design and development of **${bomItemName}** in **${formatPhase(question.sourcePhaseId)}**.

${question.description}

## Why This Matters

This question is classified as **${question.priority}** priority and requires **${formatQuestionType(question.questionType)}** to resolve.

Understanding and resolving this question is essential for:
- Finalizing technical specifications
- Informing cost estimates and resource planning
- Identifying dependencies with other BOM items

## Key Considerations

*This section will be populated with specific technical context from consensus documents.*

## Research Directions

*This section will outline concrete steps to investigate and answer this question.*

## Related Work

This question relates to: ${question.relatedBOMItems.join(', ')}
`;
}

// Generate a markdown file for a question
function generateQuestionMarkdown(question) {
	const bomItemName = BOM_ITEM_NAMES[question.sourceBOMItemSlug] || question.sourceBOMItemSlug;

	const frontmatter = `---
questionId: "${question.id}"
slug: "${question.slug}"
title: "${question.title}"
questionType: "${question.questionType}"
priority: "${question.priority}"
status: "${question.status}"
sourcePhase: "${question.sourcePhaseId}"
sourceBOMItemId: "${question.sourceBOMItemId}"
sourceBOMItemSlug: "${question.sourceBOMItemSlug}"
sourceBOMItemName: "${bomItemName}"
relatedBOMItems:
${question.relatedBOMItems.map((id) => `  - "${id}"`).join('\n')}
tags:
${question.tags.map((tag) => `  - "${tag}"`).join('\n')}
createdDate: "${question.createdDate}"
---`;

	const context = generatePlaceholderContext(question, bomItemName);

	return `${frontmatter}

${context}
`;
}

// Main migration function
async function migrate() {
	console.log('Starting migration of questions to markdown files...\n');

	// Ensure output directory exists
	await fs.mkdir(OUTPUT_DIR, { recursive: true });

	// Group questions by phase
	const questionsByPhase = {
		'phase-0': [],
		'phase-1': [],
		'phase-2': []
	};

	for (const question of ALL_QUESTIONS) {
		questionsByPhase[question.sourcePhaseId].push(question);
	}

	// Process each phase
	for (const [phaseId, questions] of Object.entries(questionsByPhase)) {
		const phaseDir = path.join(OUTPUT_DIR, phaseId);

		// Create phase directory
		await fs.mkdir(phaseDir, { recursive: true });

		console.log(`Processing ${phaseId}: ${questions.length} questions`);

		// Generate markdown files
		const filenames = [];
		for (const question of questions) {
			const filename = `${question.id}-${question.slug}.md`;
			const filePath = path.join(phaseDir, filename);
			const content = generateQuestionMarkdown(question);

			await fs.writeFile(filePath, content, 'utf-8');
			filenames.push(filename);
			console.log(`  Created: ${filename}`);
		}

		// Create index.json for this phase
		const indexPath = path.join(phaseDir, 'index.json');
		await fs.writeFile(indexPath, JSON.stringify(filenames, null, 2), 'utf-8');
		console.log(`  Created: index.json\n`);
	}

	console.log('Migration complete!');
	console.log(`Total questions migrated: ${ALL_QUESTIONS.length}`);
}

// Run migration
migrate().catch(console.error);
