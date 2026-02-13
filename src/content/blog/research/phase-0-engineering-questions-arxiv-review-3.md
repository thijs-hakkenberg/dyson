---
slug: "phase-0-engineering-questions-arxiv-review-3"
title: "Slag, Sunlight, and Steel: Literature Review for Three More Phase 0 Unknowns"
description: "A third wave of literature review tackles slag separation in microgravity, the concentrator-vs-flat-plate architecture decision for 100 MW solar arrays, and in-space manufacturing of array structures from asteroid-derived metals. The key finding: electromagnetic separation and ultrasound-assisted additive manufacturing may solve two problems simultaneously."
author: "Project Dyson Team"
date: "2026-02-13"
category: "Research"
tags:
  - "research"
  - "arxiv"
  - "metallurgy"
  - "solar-cells"
  - "in-space-manufacturing"
  - "phase-0"
relatedPhases:
  - "phase-0"
---

# Slag, Sunlight, and Steel: Literature Review for Three More Phase 0 Unknowns

Our [first](/blog/phase-0-critical-questions-arxiv-review) and [second](/blog/phase-0-engineering-questions-arxiv-review-2) literature reviews covered seven Phase 0 research questions—from regolith excavation to spectral algorithms. This third review addresses three medium-priority engineering questions that share a common thread: they all concern what happens *after* you've captured an asteroid and started processing it. How do you handle the waste? How do you generate power efficiently? And can you build your own expansion hardware in space?

The arxiv coverage for these topics is thinner than for the Tier 1 questions—metallurgical engineering, space solar power systems, and manufacturing process engineering live primarily in specialist journals and conference proceedings. But the papers we found produced some genuinely useful cross-connections.

## 1. Slag Management: Where Gravity Was Doing All the Work

**Question:** How do you manage and recycle slag in microgravity? ([rq-0-13](/questions/slag-management-microgravity))

On Earth, slag management is trivially simple: molten slag floats on molten metal because it's less dense, you skim it off, done. In microgravity, density differences still exist but buoyancy doesn't. Surface tension dominates, and you get an emulsion of metal and slag droplets that won't spontaneously separate.

The ASIME white papers (arxiv:1612.00709, arxiv:1904.11831) frame the scale of the problem. Depending on asteroid type, 10-60% of processed mass becomes slag. At 50,000 tonnes/year throughput over a 30-year station life, even the optimistic M-type case produces 150,000 tonnes of waste—far exceeding the station's own mass. **Slag disposal is not optional; it is a continuous mass-balance requirement.**

The physics literature tells us exactly why this is hard. Nikolayev et al. (arxiv:1601.07673), working from experiments aboard the Mir space station, showed that vapor bubbles in microgravity don't detach and rise—they spread laterally and form films. During smelting, CO and CO2 from carbothermic reduction will create trapped gas bubbles in the melt, potentially producing foam-like structures instead of clean separation.

But Birjukovs et al. (arxiv:2002.10970) point toward a solution. Using neutron imaging to track argon bubbles in liquid gallium, they demonstrated that external magnetic fields measurably modify bubble trajectories and velocities. The key insight: **molten metal is electrically conductive while molten slag is insulating.** Applied electromagnetic fields create Lorentz forces on the metal while leaving slag unaffected—differential forcing that can substitute for gravitational buoyancy.

Our recommended approach is a three-stage system:
1. **Electromagnetic in-process separation** during smelting (leveraging differential conductivity)
2. **Controlled batch cooling** for secondary metal recovery via Marangoni-driven segregation
3. **Controlled ejection** of waste slag on trajectories that prevent L4/L5 debris accumulation

**The critical gap:** No one has tested electromagnetic slag-metal separation in microgravity at any scale. This is one of the least characterized aspects of the Processing Station design.

**Confidence level: Low-Medium.** The physics principles are sound. The engineering implementation is entirely untested.

## 2. Concentrators vs. Flat-Plate: A Surprising Thermal Benefit

**Question:** Should the 100 MW solar arrays use concentrator or flat-plate architecture? ([rq-0-22](/questions/concentrators-vs-flat-plate))

This question produced the richest literature of the three, with seven papers spanning cell physics, radiation damage, and concentrator-specific technologies.

The baseline is well-established. Connolly & Mencaraglia (arxiv:1301.1278) confirm that current commercial III-V cells are non-radiatively limited, meaning the efficiency gain from concentration is real but moderate—roughly 2-4 absolute percentage points at 500x. Concentrators reduce cell area by 99.8% but add optical elements, precision tracking, and active thermal management.

Campesato et al. (arxiv:1809.07157) provide the directly applicable radiation degradation data for InGaP/GaAs/Ge triple-junction cells. Each electrical parameter follows a single degradation curve when plotted against Displacement Damage Dose—enabling predictable end-of-life performance estimation for both architectures.

The surprise came from Lang et al. (arxiv:2004.00308), who demonstrated **post-irradiation regeneration** in GaInAsP cells at 60C under AM0 illumination. Recovery increases with InP content. Concentrator cells run 20-40C hotter than flat-plate cells. If this elevated temperature enables continuous partial annealing of radiation damage, concentrator cells would **degrade more slowly** than flat-plate cells—potentially offsetting the optical degradation penalty that is concentrators' main weakness.

On the technology side, Barrutia et al. (arxiv:2007.06268) show that graphene integration reduces concentrator cell series resistance by 35%, pushing the practical concentration ceiling from ~500x toward 1,000-2,000x. And Diedenhofen et al. (arxiv:1210.6601) demonstrate that graded-index nanowire AR coatings can boost flat-plate photocurrent by 5.9%—partially closing the efficiency gap from the other direction.

**Our recommendation from the literature:** Flat-plate for initial deployment, with concentrator option for expansion. The flat-plate case benefits from 15-year space heritage, no optical degradation pathway, simpler pointing, and compatibility with in-space structural manufacturing. The concentrator case gains from potential thermal annealing and cell area reduction, but depends on validating two unknowns: optical element degradation rates and thermal annealing in triple-junction cells.

**The single most important unknown** is optical element degradation—Fresnel lenses and mirrors in the L4/L5 charged particle environment. If degradation exceeds 1-2%/year, concentrators lose their advantage within 5-7 years.

**Confidence level: Medium.** Good foundational data exists. The architecture-specific unknowns (optical degradation, thermal annealing) need targeted experiments.

## 3. In-Space Manufacturing: Two Papers That Change the Calculus

**Question:** Can array structural components be manufactured in space from asteroid-derived materials? ([rq-0-24](/questions/in-space-array-structure-manufacturing))

This question sits at the intersection of two technology threads, and the literature provides encouraging results on both.

D'Angelo et al. (arxiv:2102.09815) demonstrate the most directly relevant technology: a powder-based 3D printing process validated in parabolic flight that works independently of gravitational environment. Using controlled pressure sequences to transport powder to the print zone, they achieved uniform powder density regardless of gravity level. This removes the primary obstacle to space-based metal additive manufacturing.

Todaro et al. (arxiv:2008.04485) provide the metallurgical complement: high-intensity ultrasound applied during metal AM solidification produces refined, equiaxed grain structure in stainless steel—without gravity-driven convection. The ultrasound cavitation and streaming substitute for the convective mixing that normally produces structural-grade grain structure on Earth. **This process is inherently microgravity-compatible because ultrasound propagates regardless of gravity.**

Combining these two results: gravity-independent powder handling plus gravity-independent grain structure control equals a viable path to structural-grade metal parts in space.

The ASIME data (arxiv:1612.00709) confirms that asteroid feedstock includes iron (5-95% depending on type), nickel (1-15%), and aluminum (2-8% from S-types). The most practical structural material is likely nickel-iron alloy—available directly from M-type asteroids with minimal processing.

Our mass breakdown analysis suggests **50-70% of a 2 MW array module mass is potentially manufacturable in-space** from asteroid-derived metals. The remaining 30-50% (III-V cells, electronics, precision wiring) requires Earth supply for the foreseeable future. The economic break-even for in-space manufacturing infrastructure (~$500M-$1B one-time investment) occurs at 15-60 modules of expansion—strongly favoring local manufacturing for any significant growth beyond the initial 100 MW.

**The gap:** No structural components have been manufactured from asteroid-derived materials. All space AM demonstrations used Earth-supplied feedstock. The mechanical property qualification of in-space manufactured parts to space standards has not been performed.

**Confidence level: Low-Medium.** The fundamental enabling technologies are demonstrated. The integration and qualification gap is wide.

## Cross-Connections: Where These Three Questions Meet

The most interesting finding from reviewing these three questions together is how they interconnect:

- **Electromagnetic processing** appears in both slag management (Lorentz force separation) and manufacturing (electromagnetic workpiece positioning per Bruhaug & Beveridge, arxiv:2004.09683). The same electromagnetic infrastructure serves both purposes.

- **The concentrator-vs-flat-plate decision affects manufacturing**: flat-plate array structures are simpler to manufacture in space (beams, frames, brackets), while concentrator optics require precision that is extremely difficult to replicate with in-space AM. The literature quietly reinforces the flat-plate-first recommendation.

- **Slag recycling feeds manufacturing**: slag from metal processing contains silicon (for potential PV production) and can potentially serve as radiation shielding feedstock—turning a waste management problem into a manufacturing resource.

## Summary

| Question | Papers Found | Key Finding | Confidence |
|----------|-------------|-------------|-----------|
| Slag management | 6 | Electromagnetic separation most promising; no microgravity tests exist | Low-Medium |
| Concentrators vs flat-plate | 7 | Thermal annealing may self-heal radiation damage; optical degradation is key unknown | Medium |
| In-space array manufacturing | 5 | Gravity-independent AM demonstrated; 50-70% of module mass manufacturable locally | Low-Medium |

Total: 18 papers across three questions. The arxiv coverage was thinner than for Tier 1 topics—these are engineering problems where the primary literature lives in AIAA, Acta Astronautica, and metallurgical journals. But the papers we found, particularly the D'Angelo/Todaro combination for in-space manufacturing and the Lang thermal annealing result for concentrators, provide genuine insights that inform architecture decisions.

All three questions have been updated to "investigating" status with full research folders. The research gaps identified point to specific experiments: electromagnetic separation in microgravity, optical element degradation testing, and AM mechanical property qualification from asteroid-derived feedstock.

## What Comes Next

The highest-impact experiments from this review:

1. **ISS electromagnetic separation test**: Process a molten metal-slag analog in microgravity with applied magnetic fields. Measure separation efficiency and power requirements. This is the single most important gap for Processing Station design.

2. **Optical element degradation characterization**: Expose Fresnel lens and mirror samples to L4/L5-representative charged particle and UV fluence. This determines whether concentrators are viable for 15-year operation.

3. **InGaP/GaAs/Ge thermal annealing validation**: Test whether the Lang et al. regeneration effect extends to the baseline triple-junction cell at concentrator operating temperatures (80-120C).

4. **Asteroid-derived AM feedstock qualification**: Process asteroidal iron-nickel into powder or wire feedstock. Print test specimens. Characterize mechanical properties against space structure standards.

Each of these experiments is achievable with existing facilities—the enabling research has been done, and what remains is targeted engineering validation.
