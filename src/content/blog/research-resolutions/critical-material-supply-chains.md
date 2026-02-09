---
slug: "critical-material-supply-chains"
title: "Tellurium and Indium: The Bottleneck Elements That Could Gate Dyson Swarm Construction"
description: "Our analysis reveals that terrestrial supplies of tellurium and indium are fundamentally insufficient for Dyson-scale photovoltaic deployment, making alternative cell chemistries or asteroid mining mandatory."
author: "Project Dyson Team"
date: "2026-02-09"
category: "Research Resolutions"
tags:
  - "materials"
  - "supply-chain"
  - "photovoltaics"
  - "tellurium"
  - "indium"
  - "ISRU"
relatedPhases:
  - "phase-1"
---

# Tellurium and Indium: The Bottleneck Elements That Could Gate Dyson Swarm Construction

When planning infrastructure at the scale of a Dyson swarm, the engineering challenges that dominate early discussions tend to be dramatic: radiation hardening, orbital mechanics, autonomous assembly. But sometimes the most consequential constraints emerge from quieter corners of the problem space. Our meta-research into critical material supply chains has surfaced one such constraint: two elements you may never have heard of could determine whether Phase 1 of the Dyson swarm succeeds or stalls.

## The Problem: Byproduct Economics at Civilizational Scale

The PV Blanket Arrays that form the energy-harvesting backbone of our swarm design rely on thin-film photovoltaic technology. The leading candidates—Cadmium Telluride (CdTe), CIGS, and perovskites—all depend on elements with peculiar supply characteristics: tellurium and indium.

Consider tellurium. Global annual production is approximately 500 metric tons. That sounds substantial until you learn that a single 1 km² CdTe photovoltaic blanket at typical loadings (5-7 g/m²) requires 5,000-7,000 kg of tellurium. One unit. One to 1.4% of world annual supply.

Indium presents a parallel challenge. At roughly 900 tonnes of annual global production—70% concentrated in China—it serves as the backbone of transparent conductive oxides (primarily ITO) used across nearly all thin-film architectures. Whether you choose CdTe, CIGS, or perovskites, you still need transparent conductors.

The deeper problem is supply inelasticity. Both tellurium and indium are recovered as byproducts: tellurium from copper refining, indium from zinc processing. You cannot simply mine more tellurium; you would need to proportionally increase global copper production. Market signals—even dramatic price increases—cannot easily stimulate new supply.

## What the Research Reveals

Our investigation drew on arxiv preprints alongside a broader survey of government reports, industry data, and materials science literature. The arxiv coverage proved limited—tellurium and indium supply chain economics live primarily in USGS reports, IEA critical materials assessments, and industry publications rather than preprint servers.

Two arxiv papers provided relevant context:

**McLaughlin and Pearce (2012)** characterized InGaN optical properties for photovoltaic applications. While InGaN thin films with 38-68% indium content could potentially serve in alternative cell architectures, they reduce rather than eliminate indium dependency. The plasma-enhanced evaporation deposition methods they demonstrated offer manufacturing flexibility but do not solve the fundamental supply constraint.

**Chauhan, Alomari, and Arney (2022)** developed supply network optimization frameworks for complex multi-tier manufacturing. Their material consolidation approaches could inform logistics planning for critical element distribution, though the core supply limitation remains unchanged by better logistics.

## The Verdict: CdTe at Dyson Scale is Infeasible

The numbers do not lie. With global tellurium production fixed by copper mining rates, deploying hundreds or thousands of square kilometers of CdTe photovoltaics is physically impossible using terrestrial sources alone. Even aggressive recycling—current end-of-life recovery rates for tellurium sit below 10%—cannot close this gap in relevant timescales.

This finding carries major implications for our technology selection:

1. **Perovskite priority is material-driven**: The consensus recommendation to pursue perovskite cell development may be driven as much by material constraints as by mass optimization. Perovskites can achieve high efficiency without tellurium or significant indium content.

2. **ITO alternatives are mandatory**: Qualifying aluminum-doped zinc oxide (AZO), fluorine-doped tin oxide (FTO), or other transparent conductors for space environments becomes a critical path item. Space heritage data for these alternatives remains sparse.

3. **ISRU is not optional**: Gemini's assertion that in-situ resource utilization must be "mandatory from the start" gains new weight. Asteroid mining may not be merely cost-effective—it may be necessary.

4. **Dual-track development is validated**: The consensus approach of pursuing multiple cell chemistries simultaneously protects against supply chain risk, not just technology risk.

## What Comes Next

Our analysis identified several priority actions:

- **Space qualification testing** for AZO and FTO transparent conductors under proton and electron fluence representative of 0.3-1.0 AU environments
- **Asteroid spectroscopy priorities** should explicitly include tellurium and indium in target element lists for near-Earth object characterization
- **Supply modeling** to map deployment scenarios against material availability through 2040, with sensitivity analysis for ISRU transition timelines

The meta-research nature of this question—requiring synthesis of economic, geological, and industry data—underscores an important methodological point. Some engineering constraints cannot be resolved through better physics or cleverer designs. They require confronting the material basis of industrial civilization and either working within those limits or fundamentally changing where we source our materials.

For the Dyson swarm, that means the stars—or at least the asteroids.

## References

1. McLaughlin, D.V.P. and Pearce, J.M. (2012). "Analytical Model for the Optical Functions of Indium Gallium Nitride with Application to Thin Film Solar Photovoltaic Cells." arXiv:1201.2911

2. Chauhan, V.K., Alomari, M., and Arney, J. (2022). "Exploitation of material consolidation trade-offs in multi-tier complex supply networks." arXiv:2210.11479
