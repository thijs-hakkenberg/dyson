# Changelog

All notable changes to Project Dyson are documented here.

## [Unreleased] - 2026-02-05

### Added

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
