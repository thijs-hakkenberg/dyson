---
slug: "open-question-research-update-2026-02"
title: "Open Question Research Update: Magnets, Argon, and Orbital Fabs"
description: "A review of ~30 external sources across 7 open research questions finds significant new evidence from 2024-2026. Four questions move from 'open' to 'investigating', including SpaceX's operational argon thrusters, a Nature Chemistry magnetic separation breakthrough, and the first orbital semiconductor manufacturing demonstration."
author: "Project Dyson Team"
date: "2026-02-13"
category: "Research"
tags:
  - "research"
  - "literature-review"
  - "phase-0"
  - "phase-1"
  - "phase-2"
  - "status-update"
relatedPhases:
  - "phase-0"
  - "phase-1"
  - "phase-2"
---

# Open Question Research Update: Magnets, Argon, and Orbital Fabs

Our research consolidation tracks 93 open questions across three phases. Periodically, we survey the broader literature — Nature, MDPI, NASA technical reports, industry announcements, ScienceDirect — to see whether anything published since our last review changes the picture. This update covers seven questions that showed the most movement in early 2026, drawing on approximately 30 external sources published between 2023 and 2026.

The headline: **four questions move from "open" to "investigating"**, one achieves partial resolution, and the remaining three gain significant new context. Here is what changed.

## Summary Table

| Question | Phase | Priority | Key New Evidence | Status Change |
|----------|-------|----------|-----------------|---------------|
| [Microgravity electrolysis separation](/questions/microgravity-electrolysis-separation) | 0 | High | Nature Chemistry magnetic separation (Aug 2025) | Open → **Investigating** |
| [Perovskite space qualification](/questions/perovskite-space-qualification) | 1 | High | MISSE-21 flight, SiO₂ barrier, PI encapsulation | Investigating (enhanced) |
| [In-situ semiconductor fabrication](/questions/in-situ-semiconductor-fabrication) | 0 | High | Space Forge orbital plasma (Dec 2025), NASA ODME | Open → **Investigating** |
| [Radiation shielding mass validation](/questions/radiation-shielding-mass-validation) | 0 | High | AstroRad flight data, hybrid shielding | Open → **Investigating** |
| [Alternative propellant viability](/questions/alternative-propellant-viability) | 1 | High | SpaceX Starlink V2 argon at scale | Open → **Partially Resolved** |
| [GW-scale power transmission](/questions/gw-scale-power-transmission-efficiency) | 2 | Critical | >85% magnetron, DARPA 8.6 km demo | Open (informed) |
| [Multi-century governance](/questions/multi-century-governance-structure) | 0 | Critical | NIST framework, Artemis Accords gaps | Open (informed) |

---

## 1. Microgravity Electrolysis: Magnets Replace Centrifuges

**Question**: [rq-0-33](/questions/microgravity-electrolysis-separation) | Phase 0 | Status: Open → **Investigating**

The ISS currently uses heavy, failure-prone rotary separators to separate hydrogen and oxygen from the water electrolyte during electrolysis. A paper published in *Nature Chemistry* in August 2025 by Romero-Calvo et al. (Georgia Tech / ZARM Bremen / University of Warwick) demonstrates that a simple **commercial neodymium magnet** can do the job with **no moving parts**.

Two complementary mechanisms — diamagnetic buoyancy (guiding bubbles via differential magnetic permeability) and magnetohydrodynamic force (creating convective flow from the interaction of the magnetic field with electrolysis currents) — achieved current density improvements of **up to 240%** and **near-terrestrial efficiency** in microgravity. The researchers stated explicitly: *"We do not need centrifuges or any mechanical moving parts."*

For Project Dyson's 500-750 kW ISPP electrolysis system, this eliminates the primary mechanical reliability concern and dramatically simplifies the system architecture. The scale-up from laboratory prototypes to industrial systems remains the open challenge.

## 2. Perovskite PV: A Baseline Architecture Emerges

**Question**: [rq-1-9](/questions/perovskite-space-qualification) | Phase 1 | Status: Investigating (enhanced)

Three developments converge on a specific architecture for space-qualified perovskite solar cells:

**SiO₂ radiation barrier** (NREL): A micron-thick silicon oxide layer provides radiation protection with >99% weight reduction compared to conventional barriers. Protected cells showed no damage from low-energy proton bombardment.

**Polyimide encapsulation** (Moore et al., October 2025): Systematic comparison of four polymer encapsulants found polyimide best at all proton energy levels — validating Kapton (a polyimide) as both substrate and protection layer.

**MISSE-21 ISS flight test** (Georgia Tech): 18 PV cells including perovskite are going to the ISS exterior for 6 months of in-situ testing. Data expected mid-2026.

The emerging baseline — SiO₂ barrier on CsFAPbI₃ perovskite on polyimide substrate — fits within the previously revised 43-48 g/m² areal mass density target. A 2025 perspective piece provides an important caveat: early self-healing claims may have been overstated because low-efficiency test cells masked radiation damage.

## 3. Orbital Semiconductor Fabrication: From Theory to Demonstration

**Question**: [rq-0-44](/questions/in-situ-semiconductor-fabrication) | Phase 0 | Status: Open → **Investigating**

Space Forge's ForgeStar-1 satellite achieved a world first in December 2025: generating plasma aboard a commercial satellite, confirming that conditions for gas-phase semiconductor crystal growth can be created and controlled autonomously in orbit. The miniature furnace reached 1,000°C, targeting GaN, SiC, AlN, and diamond.

Separately, NASA's On Demand Manufacturing of Electronics (ODME) program is developing **electrohydrodynamic inkjet printing** — a maskless, additive approach that eliminates lithography and etching entirely. Partners include Intel, Fujifilm, TEL, and Axiom Space, with ISS flight testing in 2024-2025.

The EHD printing pathway is particularly promising for Project Dyson because it is additive (compatible with ISRU feedstock), maskless (no complex photolithography equipment), and leverages space vacuum as an advantage. The gap from current milligram-scale demonstrations to production-rate ISRU-based fabrication remains enormous, but the question has shifted from "Is this possible?" to "How do we scale it?"

## 4. Radiation Shielding: Hybrid Approach Drops the Mass Estimate

**Question**: [rq-0-35](/questions/radiation-shielding-mass-validation) | Phase 0 | Status: Open → **Investigating**

Three lines of evidence refine the 4,000-8,000 kg shielding mass estimate downward:

**AstroRad flight data**: StemRad's HDPE vest has flown on ISS and Artemis I, demonstrating selective organ-specific shielding that reduces mass versus uniform coverage.

**Hybrid active-passive shielding** (*Life Sciences in Space Research*, 2023): Combining electrostatic active shielding with passive materials reduces mass by 20-40%. The optimal configuration depends on radiation type — active outside passive for solar events, passive before active for galactic cosmic rays (to fragment heavy ions).

**Water as dual-use shielding**: Multiple NASA analyses confirm that strategic placement of ISRU-produced water provides the best mass-efficiency trade.

Combined, these approaches suggest a revised estimate of **3,000-5,000 kg per crew module** — at the lower end of the original range and potentially below it with hybrid active components.

## 5. Alternative Propellants: SpaceX Proves Argon at Scale

**Question**: [rq-1-31](/questions/alternative-propellant-viability) | Phase 1 | Status: Open → **Investigating + Partially Resolved**

This is the most definitive status change in the update. SpaceX's Starlink V2 Mini satellites now **operationally deploy argon-fueled Hall thrusters** at constellation scale, achieving **2.4× thrust** and **1.5× specific impulse** over their previous krypton thrusters.

The economics are decisive: argon costs **$7-15/kg** versus xenon at $5,000-12,000/kg. Argon constitutes 0.93% of Earth's atmosphere — supply is functionally unlimited. The existential xenon supply chain risk identified in the original question is eliminated.

Additional findings from IEPC 2025 and related papers show that purpose-built argon-optimized thrusters dramatically outperform xenon-adapted designs, and iodine has emerged as a third candidate with near-xenon performance. For Phase 1 orbital tugs, a **krypton-primary / argon-fallback** strategy appears optimal.

## 6. GW-Scale Power Transmission: Better Components, No System Demo

**Question**: [rq-2-23](/questions/gw-scale-power-transmission-efficiency) | Phase 2 | Status: Open (informed)

A novel rising-sun magnetron design (MDPI Energies, October 2025) achieves **>85% DC-to-microwave efficiency** at >100 kW in simulation — versus ~54% for conventional magnetrons. This substantially improves the theoretical end-to-end efficiency chain to approximately **68-73%** for a well-designed 1 GW system. JAXA's retrodirective beam steering has reached 0.001-degree pointing accuracy from GEO, and rectenna efficiency exceeds 95% in laboratory conditions.

However, the question stays "open" because no integrated system demonstration exists above kilowatt scale. The gap between DARPA's 800-watt record and the 1 GW requirement is six orders of magnitude. Better components do not constitute a system.

## 7. Multi-Century Governance: Building Blocks, No Breakthrough

**Question**: [rq-0-29](/questions/multi-century-governance-structure) | Phase 0 | Status: Open (informed)

NIST's second seminar on building an in-space circular economy (August 2025) addresses governance for multi-generational space industrial activities. Multiple 2025 authors have identified a critical gap in international space law: the Artemis Accords legitimize resource extraction but are **completely silent on self-replicating systems**. Borgue & Hein estimate ~70% self-replication rate is achievable near-term, directly informing the governance requirements for Project Dyson's foundry model.

This remains the most organizationally complex open question. The NIST framework and proposed von Neumann probe treaty elements provide starting points, but purpose-built governance for Project Dyson's multi-century timescale and self-replicating manufacturing model does not yet exist.

---

## What Comes Next

The MISSE-21 ISS data (expected mid-2026) will be the next major decision point for perovskite PV. Magnetic separation needs an orbital-duration demonstration to move beyond drop tower validation. The alternative propellant question is essentially resolved at the feasibility level — the remaining work is thruster optimization for Project Dyson's specific power class. And the governance question needs dedicated design work rather than more literature review.

Full analysis documents, external paper metadata, and updated arxiv-papers.yaml files are available for all seven questions in their respective research directories.
