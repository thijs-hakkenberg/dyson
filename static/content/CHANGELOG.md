# Changelog

All notable changes to Project Dyson are documented here.

## [Unreleased] - 2026-02-13

### Added

#### Phase 0 Feasibility Analysis Framework (Strategic Pivot)
- **Strategic pivot from breadth-first to depth-first** — focusing on technical rigor for the critical unknowns that would make or break Phase 0
- Add critical path data service (`src/lib/services/critical-path.ts`): maps all 49 Phase 0 research questions into 7 technology threads with dependency graph, criticality ratings, and thread statistics
- Add TRL assessment data service (`src/lib/services/trl-assessment.ts`): rates 10 key technologies on NASA TRL 1-9 scale with gap analysis, experiments needed, risk levels, and fallback approaches
- Add decision gates data service (`src/lib/services/decision-gates.ts`): defines 5 measurable go/no-go criteria for Phase 0 → Phase 1 transition at months 24, 30, 36, 48, and 60
- Add Phase 0 Technical Feasibility Report page (`/analysis/feasibility`): standalone 8-section engineering document with executive summary, per-thread technology assessment, TRL summary, risk register, experimental validation roadmap, and conclusions
- Add Critical Path Analysis page (`/analysis/critical-path`): interactive dependency graph visualization with thread cards, topological sorting, critical path view, ready/blocked question views
- Add Technology Readiness Dashboard (`/analysis/technology-readiness`): TRL gap visualization bars, risk matrix, experiment lists, fallback approaches, cross-links to research questions
- Add Decision Gates page (`/analysis/decision-gates`): timeline visualization, criteria checklists with pass/fail outcomes, readiness progress bars, gated architectural decisions
- Add analysis sub-navigation bar across all 5 analysis pages (feasibility, critical-path, TRL, decision-gates, cost-reconciliation)
- Add "Analysis" link to main site navigation header

**Key findings from TRL assessment:**
- 2 project-ending risks identified: microgravity metallurgy (TRL 2-3) and ISRU water extraction (TRL 3-4)
- 4 architecture-change risks: cryocooler scaling, asteroid mining, silicon purification, microgravity electrolysis
- Average TRL gap: 3.0 levels; estimated 7.5 years average to reach targets

#### Literature Reviews for 3 Critical Questions (32 papers + 16 external refs)
- Add arxiv research for rq-0-1: Spectrometer resolution tradeoff (14 papers, 4 external refs — recommends 20nm resolution for 90% mineral classification confidence)
- Add arxiv research for rq-0-39: Subsurface mechanical characterization (12 papers, 3 external refs — van der Waals cohesion 25-80 Pa, OSIRIS-REx surface 0.2-20 Pa)
- Add arxiv research for rq-0-49: Cryocooler scaling for space ZBO (6 papers, 9 external refs — 2-3 order of magnitude gap, reverse turbo-Brayton leading pathway)
- Create `research/arxiv-papers.yaml` and `research/analysis.md` for each question
- Update all 3 questions: status open → investigating

#### New Organizations and Outreach Questions
- Add 3 new organizations: Creare LLC (cryocooler development), JAXA (Hayabusa2 asteroid samples), Northrop Grumman (JWST sunshield heritage)
- Add 7 new outreach questions linking organizations to Phase 0 critical research:
  - NASA: GODU-LH2 ZBO data (rq-0-30, rq-0-49), ISS microgravity metallurgy (rq-0-11, rq-0-12)
  - JPL: OVIRS spectral classification accuracy (rq-0-1, rq-0-5)
  - Aerojet Rocketdyne: AEPS thruster lifetime and 100+ kW scaling (rq-0-16, rq-0-19)
  - Creare: Turbo-Brayton cryocooler development timeline (rq-0-49, rq-0-30)
  - JAXA: Ryugu returned sample mechanical properties (rq-0-39, rq-0-6, rq-0-7)
  - Northrop Grumman: JWST sunshield lessons for depot-scale thermal protection (rq-0-47, rq-0-30)

#### Ontology Updates
- Add legacy tags for cryogenic topics: `cryocooler`, `zero-boiloff`, `sunshield`, `mli` → thermal-management
- Add `deployable-structures` → deployment topic
- Add `power-systems` → power systems topic
- Add `anchoring`, `magnetic-separation`, `propellant-production` → ISRU topic

#### Blog
- Add blog article: "Strategic Pivot: From Breadth to Depth on Phase 0 Feasibility"

#### Open Question Research Update (7 questions, ~30 external sources, 4 status changes)
- Review external literature (Nature Chemistry, MDPI, NASA, ScienceDirect, industry data) across 7 research questions
- Add research/analysis.md and research/arxiv-papers.yaml for all 7 questions
- Add 27 external paper metadata files across 7 new categories under `static/content/research/external-papers/`
  - `microgravity-electrolysis/` (3 papers), `perovskite-space-pv/` (4), `space-semiconductor-fabrication/` (3), `radiation-shielding/` (6), `alternative-propellants/` (4), `power-transmission/` (4), `space-governance/` (3)
- Update research consolidation document with new question counts, tables, and category sections
- Add blog article: "Open Question Research Update: Magnets, Argon, and Orbital Fabs"

**Status changes (4 questions):**
- rq-0-33 (microgravity electrolysis): open → investigating — Nature Chemistry magnetic phase separation eliminates mechanical separators (240% efficiency improvement)
- rq-0-35 (radiation shielding): open → investigating — hybrid active-passive shielding + dual-use water reduces estimate from 4-8K kg to 3-5K kg
- rq-0-44 (semiconductor fabrication): open → investigating — Space Forge ForgeStar-1 first orbital semiconductor demo, NASA ODME EHD printing
- rq-1-31 (alternative propellants): open → investigating + partially-resolved — SpaceX Starlink V2 operational argon Hall thrusters at constellation scale

**Reference additions (all 7 questions):**
- rq-0-29 (governance): NIST circular economy, von Neumann probe governance gap, Borgue & Hein self-replication estimates
- rq-1-9 (perovskite): NREL SiO₂ barrier, polyimide encapsulation validation, Georgia Tech MISSE-21 ISS flight test
- rq-2-23 (power transmission): >85% magnetron efficiency (sim), JAXA 0.001° pointing, updated efficiency chain ~68-73% theoretical

#### Phase 0 Engineering Questions Literature Review — Tier 2 (3 questions, 18 papers)
- Add arxiv research for rq-0-13: Slag management in microgravity (6 papers, electromagnetic separation most promising)
- Add arxiv research for rq-0-22: Concentrators vs flat-plate (7 papers, thermal annealing may self-heal radiation damage)
- Add arxiv research for rq-0-24: In-space array structure manufacturing (5 papers, gravity-independent AM demonstrated)
- Create `research/arxiv-papers.yaml` and `research/analysis.md` for each question
- Update all 3 questions: status open → investigating
- Add 18 new arxiv references across the 3 question frontmatters
- Add blog article: "Slag, Sunlight, and Steel: Literature Review for Three More Phase 0 Unknowns"

#### Phase 0 Engineering Questions Literature Review (4 questions, 29 papers)
- Add arxiv research for rq-0-9: Electrostatic charging on mechanisms (8 papers, dust charging physics + mitigation techniques)
- Add arxiv research for rq-0-12: Zero-g zone refining (6 papers, UMG-Si metallurgical route may make zone refining optional)
- Add arxiv research for rq-0-30: Cryogenic boiloff management (6 papers, sunshield-critical design + solid-state alternatives)
- Add arxiv research for rq-0-5: Composition algorithm validation (9 papers, ML tools ready, validation methodology needed)
- Create `research/arxiv-papers.yaml` and `research/analysis.md` for each question
- Update all 4 questions: status open → investigating
- Add 29 new arxiv references across the 4 question frontmatters
- Add blog article: "Four More Unknowns: Electrostatic Charging, Zero-G Refining, Cryogenic Storage, and Spectral Algorithms"

#### Alternative Material Sources Literature Review (15 papers, 5 new questions)
- Add rq-1-49: Mercury self-replicating factory pathway (medium priority, 3 papers archived)
- Add rq-1-50: Lunar regolith processing for swarm materials (high priority, 4 papers archived)
- Add rq-1-51: Lunar electromagnetic launch for material export (medium priority, 2 papers)
- Add rq-2-32: Comparative feedstock economics across sources (high priority, 5 papers archived)
- Add rq-3a-5: Gas giant atmospheric mining feasibility (low priority, gap identification)
- Add arxiv research folders for rq-1-49, rq-1-50, rq-2-32 (arxiv-papers.yaml + analysis.md each)
- Add Shubov (2110.15198), Calla (1808.05099), Hein (1810.03836) references to rq-1-21
- Add Shubov (2110.15198) reference to rq-3a-2
- Add Zhang (2208.12617), Leitgab (1311.4239) references to rq-2-20
- Add blog article: "Beyond Asteroid ISRU: Alternative Material Sources for the Dyson Swarm"

#### Three-Paper Assessment (Wright thermodynamics, Smith swarm viability, Jiang civilization trajectory)
- Assess arxiv:2309.06564 (Wright): Landsberg efficiency limits confirm rq-3a-1 finding that nested Matrioshka shells hit diminishing returns fast
- Assess arxiv:2109.11443 (Smith): Mars-based Dyson swarm validates swarm architecture, 50-year power timeline
- Assess arxiv:2510.03249 (Jiang & Das): Type II civilization by 3200-3500 CE baseline, CDI metric
- Add Wright (2309.06564) reference to rq-3a-1 and rq-3a-4 (thermodynamic cascade, reversible computing)
- Add Smith (2109.11443) and Jiang (2510.03249) references to rq-2-20 (swarm ROI threshold)
- Add blog article: "Three Papers, Three Scales: From Swarm Feasibility to Civilization Trajectories"

#### Lacki Megaswarm Lifetime Analysis (2 new questions from arxiv:2504.21151)
- Add rq-2-30: Megaswarm collisional cascade timescales and long-term survivability (high priority)
- Add rq-2-31: Planetary gravitational perturbations on century-scale swarm stability (high priority)
- Add Lacki (2504.21151) reference to rq-1-6 and rq-2-3 (existing collision avoidance questions)
- Gap analysis: Kessler cascade, station-keeping, radiation pressure, collision avoidance already covered; long-term cascade timescales and planetary perturbation drift were gaps
- Add blog article: "How Long Does a Dyson Swarm Last? A New Paper Says Not as Long as You'd Think"

#### Arxiv Literature Reviews (4 critical Phase 0 research questions)
- Add arxiv research for rq-0-6: Regolith excavation in microgravity (10 papers, Bennu sample data grounds analysis)
- Add arxiv research for rq-0-7: Anchoring technology reliability (9 papers, Philae failure case study)
- Add arxiv research for rq-0-11: Microgravity metallurgy scaling (8 papers, identifies 8-order-of-magnitude gap)
- Add arxiv research for rq-0-15: Silicon purity achievability (8 papers, UMG-Si at 4N-5N is viable)
- Create `research/arxiv-papers.yaml` and `research/analysis.md` for each question
- Update all 4 questions: status open → investigating, resolutionStatus partially-resolved
- Add 17 new arxiv references across the 4 question frontmatters
- Add blog article: "Four Critical Unknowns: What ArXiv Research Tells Us About Asteroid Mining and Processing"

#### Ontology System (unified topic taxonomy)
- Add ontology taxonomy with 13 domains and 52 topics (`src/content/ontology/taxonomy.yaml`)
- Add artifact-mappings for all 33 BOM items to ontology topics (`src/content/ontology/artifact-mappings.yaml`)
- Add ontology service with tag resolution engine — maps 90% of existing tags to topics at runtime
- Add Topics browser page (`/topics`) with domain cards, topic pills, and artifact counts
- Add Topic detail page (`/topics/[topic]`) with linked artifacts, sibling/related topics
- Add TopicPill component — replaces plain tag spans with linked topic pills across the site
- Add DomainCard, ArtifactList, and OntologyStats components
- Add bootstrap-ontology.js script for tag coverage analysis
- Add "Topics" nav item to site header
- Integrate TopicPill into QuestionCard (tags now link to topic pages)
- Add blog article: "Introducing Topics: Unified Ontology for 250+ Artifacts"

### Added

#### Simulators (7 new interactive research simulators)
- Add Shkadov Mirror Standoff Distance simulator (RQ-3b-1) — browser-only trade sweep
- Add Thermal Warping on Large Membranes simulator (RQ-2-4) — browser-only area/tension sweep
- Add Thermodynamic Cascade Efficiency simulator (RQ-3a-1) — browser-only shell count sweep
- Add Self-Replication Closure Threshold simulator (RQ-3a-2) — browser-only closure ratio sweep
- Add Membrane Deployment Dynamics simulator (RQ-1-7) — hybrid: offline FEA eigenvalue grid + browser interpolation
- Add ML Trajectory Deployment Optimization simulator (RQ-1-43) — hybrid: offline NN training + browser inference
- Add Solar Mass Extraction Rate simulator (RQ-3b-2) — hybrid: offline radial atmosphere model + browser interpolation

#### Pre-computed Simulation Artifacts (3 offline scripts)
- Add `scripts/simulation-prep/membrane-dynamics/` — scipy eigenvalue analysis, 1000 grid points (5 diameters × 10 tensions × 5 spins × 4 areal densities)
- Add `scripts/simulation-prep/trajectory-estimator/` — numpy MLP training on 500K deployment-regime pairs (0.9-1.1 AU, val MSE 0.0005)
- Add `scripts/simulation-prep/solar-atmosphere/` — 1D radial atmosphere model, 500 grid points (50 extraction rates × 10 beam powers)
- Generate `static/content/simulation-data/membrane-dynamics/modal-grid.json` (259 KB)
- Generate `static/content/simulation-data/trajectory-estimator/nn-weights.json` (361 KB)
- Generate `static/content/simulation-data/trajectory-estimator/reference-solutions.json`
- Generate `static/content/simulation-data/solar-atmosphere/response-surfaces.json`

#### Research Questions (3 new follow-up, 7 resolved/partially-resolved)
- Add rq-1-47: High-fidelity 3D FEA validation of membrane flutter boundaries (low priority)
- Add rq-1-48: Reinforcement learning deployment optimizer and 100K+ unit scalability (low priority)
- Add rq-3b-5: 3D MHD modeling of solar chromosphere mass lifting (low priority)
- Resolve rq-3b-1: Shkadov mirror standoff distance — optimal at 0.1 AU, 2.43×10¹⁷ N thrust
- Resolve rq-2-4: Thermal warping — tension ≥0.5 N/m eliminates warping at all areas up to 1M m²
- Resolve rq-3a-1: Thermodynamic cascade — 50.6% efficiency at 4 shells, up to 58.9% at 7
- Resolve rq-3a-2: Self-replication closure — 96% closure reaches 10K foundries in 27 years
- Partially resolve rq-1-7: Membrane dynamics — FEA shows 500m marginal at 1 N/m (1.58× margin), need ≥3 N/m
- Partially resolve rq-1-43: Deployment optimization — NN retrained on 0.9-1.1 AU (val MSE 0.0005), accurate but structurally limited; batch wins 48%
- Partially resolve rq-3b-2: Solar extraction — radial model validates 10⁹-10¹³ kg/s feasible, raw efficiency 0.13%

#### Blog Articles (7 new research resolution articles)
- Add "Shkadov Mirror Standoff Distance Optimization Findings"
- Add "Thermal Warping on Large Membranes Findings"
- Add "Thermodynamic Cascade Efficiency Limit Findings"
- Add "Self-Replication Closure Threshold Findings"
- Add "FEA Validation Overturns Optimistic Flutter Results: 500m+ Membranes Need Active Stabilization"
- Add "Batch Wins: Comparing 4 Swarm Deployment Strategies via Monte Carlo"
- Add "Mining the Sun: How Fast Can We Extract Mass Without Breaking Anything?"

### Fixed

#### Simulator Physics Bugs
- Fix solar atmosphere Python script: cap plume velocity at 2× escape velocity (was producing 196B m/s superluminal velocities)
- Fix solar extraction response surface integration: use surface only for physics quantities (plume velocity, station count), keep configured efficiency for engineering parameters
- Fix deployment NN inference: clamp output to [0,1] before denormalization, add 3× Hohmann sanity check for small transfers
- Fix Phase 3a/3b slug regex in question detail page loader
- Add fetch() polyfill in simulation runner script for Node.js/vite-node artifact loading

### Changed
- Retrain deployment NN on 0.9-1.1 AU regime: val MSE 0.0005 (10× improvement over 0.3-3.0 AU version), accurate ~155 m/s estimates for deployment transfers
- Update rq-1-43 with retraining findings: NN accurate but structurally limited — uniform-radius slots make trajectory NN irrelevant for slot selection
- Update rq-1-7 blog article with FEA-validated flutter margins (2-4× more conservative than analytical model)
- Update rq-1-43 blog article with two-generation NN analysis (broad-domain failure → deployment-regime accuracy → structural limitation)
- Update rq-3b-2 blog article with radial atmosphere validation and 0.13% raw efficiency finding

---

## [0.5.0] - 2026-02-09

### Added

#### Research Questions
- Add rq-0-29: Multi-century governance structure for volunteer-driven global coordination (critical, discussion)
  - Three-layer hybrid architecture: constitutional, strategic, operational
  - Swiss Verein + Apache-style meritocratic governance for Phase 0
  - Sortition-based Charter Trustees for capture resistance
  - Unanimous LLM council consensus in 1 round

#### BOM Items
- Add bom-0-7: Organizational Infrastructure ($50M) to Phase 0
  - Legal entity establishment, succession mechanisms, coordination systems
  - Update Phase 0 total cost: $15.66B → $15.71B

#### Blog Articles
- Add "Governing a 500-Year Project: Swiss Verein, Sortition, and Deliberate Incompleteness"

#### UI Features
- Add question sorting with "Newest First" as default
  - Sort options: Newest, Oldest, Priority, Title (A-Z)
  - Add sorting to resolved questions page with Resolution Date option

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
