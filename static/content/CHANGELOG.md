# Changelog

All notable changes to Project Dyson are documented here.

## [Unreleased] - 2026-02-09

### Added

#### Research Papers
- Add 60 new arxiv paper evaluations across 10 categories (megastructures, asteroid-mining, ISRU, space-solar-power, power-transmission, swarm-coordination, radiation-materials, spacecraft-missions, crystal-growth, deployable-structures, lunar-regolith, vacuum-breakdown)
- Add research consolidation analysis mapping papers to research questions
- Create paper-to-question cross-reference matrix

#### Research Questions (12 new)
- Add rq-1-44: Minimum viable photovoltaic production rate (critical)
- Add rq-1-45: UMG silicon viability for collector cells
- Add rq-1-46: In-space thin-film deposition economics crossover
- Add rq-2-21: Swarm programming language scalability
- Add rq-2-22: Minimum inter-unit communication bandwidth
- Add rq-2-23: GW-scale space-to-Earth power transmission efficiency (critical)
- Add rq-2-24: Graphene/MoS2 space qualification
- Add rq-2-25: Metamaterial light-trapping radiation survival
- Add rq-2-26: InGaN bandgap tunability for heliocentric optimization
- Add rq-2-27: Collective estimation with communication latency
- Add rq-2-28: Retrodirective phase coherence at scale
- Add rq-2-29: Meteoroid stream hazards from asteroid mining

#### Resolved Discussions (3)
- Resolve rq-0-26: Dual counter-rotating bucket wheels validated for excavation
  - 90-95% torque cancellation, 60-80 kg subsystem, 2-5 t/hr excavation rate
- Resolve rq-1-24: Shepherd/Flock heterogeneous hierarchy for swarm coordination
  - 1:1,000-5,000 ratio, scales to 1M+ units at 2-8% overhead
- Resolve rq-2-17: Federated autonomous clusters for fleet coordination
  - 50-200 node clusters, 30-day autonomy, market-based allocation

#### Blog Articles
- Add "Swarm Coordination at Scale: Mathematical Foundations Validated"
- Add "Alternative Materials for Collector Manufacturing"
- Add "ISRU Chemical Processing: Beyond Thermal Metallurgy"

#### BOM Enhancements
- Add materialAlternatives field to BOMItem type
- Add material alternatives to 6 BOM items (collector units, PV blankets, swarm control, collector satellites, power distribution)
- Update 4 BOM consensus documents with resolved architectural decisions

### Changed
- Add "analysis" question type for quantitative calculation questions
- Update QuestionTypeBadge with analysis type styling

---

## [0.4.0] - 2026-02-07

### Added

#### Research Questions & Discussions
- Add rq-2-20: Swarm operational threshold for meeting humanity's energy needs (ROI analysis)
- Add multi-model discussion for rq-2-20 with 2-round consensus
- Add blog article: "Resolved: When Does the Dyson Swarm Start Paying Off?"

#### Simulators
- Add Capture Monte Carlo simulator for asteroid capture modeling
- Add DeploymentReliability Monte Carlo simulator for deployment analysis
- Add ElectricalFault Monte Carlo simulator for fault tolerance analysis
- Add SupplyChain and RadiationDegradation Monte Carlo simulators
- Add 5 Monte Carlo simulators addressing 10 research questions
- Add fleet logistics and spectral analysis Monte Carlo simulators
- Add NEA constellation coverage Monte Carlo simulator
- Add simulator buttons to fleet and spectral research questions

#### Validation & Tracking
- Add resolution tracking system for research questions
- Add validation tracking system for experimental verification
- Add validation roadmap with experiment timeline

#### Cost Analysis
- Add cost reconciliation analysis tool
- Add cost confidence intervals to BOM items
- Add divergent view prioritization

#### External Organizations
- Add External Organizations registry and tracking UI

### Changed
- Update Claude model from Opus 4.5 to 4.6
- Update phase BOM data from research question findings
- Update Phase 1 objectives: add ground receiver site selection for Phase 2
- Update Phase 2 with ROI threshold framework: four-tier milestones (100 GW → 1 TW), success metric as delivered power not unit count, ground receiver infrastructure ($2-5T)

### Fixed
- Fix Svelte 5 warnings
- Fix Svelte 5 build errors

---

## [0.3.0] - 2026-02-03

### Added

#### Research
- Add xenon propellant research analysis answering rq-0-20
- Add research questions system with file-based markdown storage

---

## [0.2.0] - 2026-02-01

### Added

#### BOM Generation
- Add Phase 2 BOM generation and fix sidebar markdown rendering
- Add Phase 1 BOM generation
- Generate complete LLM specifications for all Phase 0 BOM items
- Add structured divergent views with YAML data files

#### UI/UX
- Add hi-fidelity consensus tab and Cloudflare Pages deployment

### Changed
- Regenerate Phase 1 BOM specs with fixed script

### Fixed
- Fix truncated divergent views in Phase 2 YAML files
- Fix BOM content workflow to preserve free-form LLM proposals
- Fix Cloudflare Pages URL output in terraform
- Update GitHub link in footer to point to correct repository
- Fix markdown rendering in BOM detail pages

---

## [0.1.0] - 2026-01-31

### Added
- Initial commit: Project Dyson website with Phase 0 BOM implementation
- Multi-model consensus approach for BOM specifications
- Support for Claude, Gemini, and GPT specification synthesis
- Phase-based project planning system
- Bill of Materials (BOM) tracking and visualization
