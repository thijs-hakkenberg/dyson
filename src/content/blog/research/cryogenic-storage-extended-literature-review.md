---
slug: "cryogenic-storage-extended-literature-review"
title: "Beyond Arxiv: The NASA and AIAA Literature on Cryogenic Propellant Storage"
description: "Fifteen non-arxiv sources from NASA technical memoranda, AIAA conference proceedings, the journal Cryogenics, and a US patent fill the gaps in our cryogenic boiloff management research. The key finding: the physics works at scale on the ground, but flight cryocoolers are 2-3 orders of magnitude below station requirements."
author: "Project Dyson Team"
date: "2026-02-13"
category: "Research"
tags:
  - "research"
  - "cryogenics"
  - "nasa"
  - "propellant-depot"
  - "phase-0"
relatedPhases:
  - "phase-0"
---

# Beyond Arxiv: The NASA and AIAA Literature on Cryogenic Propellant Storage

Our [previous literature review](/blog/phase-0-engineering-questions-arxiv-review-2) of cryogenic boiloff management (rq-0-30) explicitly noted a problem: "the majority of cryogenic fluid management literature resides in AIAA journals, NASA Technical Memoranda, and the journal Cryogenics rather than arxiv." The arxiv corpus gave us the theoretical foundations, but the engineering reality lives elsewhere. So we went and found those sources. Here is what 15 non-arxiv papers tell us about the actual state of cryogenic propellant storage technology.

## The Source Landscape

This literature lives in four places: NASA's Technical Report Server (NTRS), the AIAA Digital Library, Elsevier's journal *Cryogenics*, and one US patent filing. The field is dominated by a handful of research groups. David Plachta and colleagues at NASA Glenn Research Center have spent two decades developing Zero Boil-Off (ZBO) cryocooler technology. Bernard Kutter and Frank Zegler at United Launch Alliance architected the most detailed cryogenic depot concepts ever published. Miria Finckenor at NASA Marshall wrote the canonical reference on multilayer insulation (MLI) materials. Wesley Johnson, also at NASA, has produced the most honest assessments of MLI performance at scale versus lab conditions. And Gandolfi et al. published a comprehensive open-access review in *npj Microgravity* that serves as the best single entry point to the entire field.

## 1. Zero Boil-Off: Proven on the Ground

The NASA Zero Boil-Off program represents two decades of systematic development. Kittel's 2002 overview documents the tri-center collaboration (Glenn, Marshall, and Kennedy) that established the fundamental feasibility of active cryogenic cooling to eliminate boiloff losses entirely. The core idea is straightforward: if you can remove heat faster than it leaks in, liquid hydrogen stays liquid indefinitely.

Plachta's 2018 review captures the current state: flight-qualified cryocoolers exist, but they top out at less than 1 watt of cooling at 20 K. His 2015 broad-area cooling concept addresses the thermal architecture challenge — how do you distribute cooling across a large tank surface? The answer involves a 90 K intermediate shield with distributed cooling tubes. But Carnot efficiency at liquid hydrogen temperatures (20 K) is brutal: just 7%, meaning you need roughly 14 watts of electrical input for every watt of cooling.

The headline result is Notardonato's 2017 GODU-LH2 demonstration at Kennedy Space Center. A 125,000-liter liquid hydrogen tank — roughly the size of a large aboveground swimming pool — achieved zero boiloff using a Linde LR1620 refrigerator providing 390 watts of cooling at 20 K. Three different control methods were validated: continuous cooling, pulse cooling, and destratification mixing. **This is the largest-scale ZBO demonstration ever performed, and it worked.**

The catch is significant: the Linde LR1620 is an industrial floor-standing refrigerator, not a flight system. It masses over a tonne. GODU-LH2 proved the physics, not the engineering. The gap between a ground-based industrial refrigerator and a flight-qualified space cryocooler is exactly the problem that remains unsolved.

## 2. Sunshields: L4/L5 Is Actually the Easy Case

The ULA depot papers provide the most complete thermal architecture analysis in the literature. Kutter's 2008 paper is the foundational depot concept: a JWST-like conical sunshield with slow axial spin to equalize thermal loads. The sunshield faces the sun; the cryogenic tanks sit in its shadow. Passive thermal management — MLI plus sunshield plus thermal capacitance from the propellant mass itself — buys months of storage time before active cooling becomes necessary.

Kutter and Zegler's US patent (US20100187365A1) introduces a key geometric insight for Lagrange-point operations. At L4/L5, the sun is the only significant radiation source — there is no planetary infrared, no albedo, no eclipse cycling. This means the sunshield cone can be **truncated**: the docking port faces the sun through a smaller opening, and the cone geometry blocks direct solar radiation from every other angle.

Kutter's 2009 follow-up develops the layered approach in detail. The critical insight is that passive thermal management extends storage duration from days to months, dramatically reducing the cryocooler power requirement. Instead of fighting the full solar heat load, you only need to pump out what leaks through the insulation.

The CPD thermal analysis (2012) quantifies something that matters enormously for our application: at low Earth orbit, Earth infrared and reflected sunlight entering through the sunshield opening constitute a major parasitic heat load. The authors spend considerable effort minimizing this contribution. But at L4/L5, **this problem largely vanishes**. There is no nearby planetary body. The only radiation source is the sun, and the sunshield is specifically designed to block it.

The surprising conclusion for Project Dyson: our L4/L5 location is actually the best possible thermal environment for a cryogenic depot. A single, well-characterized radiation source. No eclipse transients. No planetary IR. The sunshield design problem becomes purely geometric — point the cone at the sun and spin slowly.

## 3. MLI: Lab Performance Is a Fantasy

The most sobering literature in this collection concerns multilayer insulation. MLI in the laboratory achieves spectacular thermal performance. MLI on real hardware does not.

Finckenor's 1999 NASA technical publication is the canonical reference. It documents real-world MLI performance from Hubble Space Telescope servicing missions and other flight programs. The data consistently shows that actual thermal performance falls short of laboratory measurements — sometimes dramatically so.

Wesley Johnson's work on large propellant tanks quantifies the problem. Degradation factors of 1.6 to 4 times laboratory values are typical for flight-scale MLI installations. On a large tank, **MLI contributes 70-90% of the total heat input** — the insulation system itself is the dominant thermal path, not structural supports or plumbing penetrations.

Why? Johnson's investigation of penetrations provides the answer. Seams, joints, structural attachments, instrumentation feedthroughs, and vent lines all create thermal short circuits through the insulation blanket. Each penetration acts as a local heat bridge. On a small laboratory calorimeter, you can minimize penetrations. On a 100-tonne propellant tank with structural supports, fluid lines, instrumentation, and a docking interface, you cannot.

Johnson's 2014 paper on Load-Bearing MLI (LBMLI) offers a partial solution. LBMLI integrates structural support into the insulation layers themselves, eliminating separate standoffs and their associated thermal bridges. Test results show 51% reduction in heat leak per layer and 38% mass savings compared to conventional MLI. This is the most promising insulation technology for large cryogenic tanks.

The design implication is clear: never use laboratory MLI performance values for system design. Apply degradation factors of 2-3x, and adopt LBMLI wherever the technology is available. Any cryocooler sizing based on ideal MLI performance will be undersized by a factor of two or more.

## 4. The Cryocooler Scaling Gap: The Hardest Problem

Every thread in this literature converges on the same bottleneck: we need flight-qualified cryocoolers that provide 100-500 watts of cooling at 20 K, and the best flight units deliver less than 1 watt.

The benchmark is JWST's MIRI cryocooler: 0.25 watts at 14 K. It is a marvel of engineering — the most capable flight cryocooler ever built. But a Processing Station propellant depot requires roughly three orders of magnitude more cooling capacity. The GODU-LH2 demonstration used 390 watts. Even with excellent insulation and a sunshield, a 100-tonne LH2 depot will need tens to hundreds of watts at 20 K.

Zagarola's 2006 work identifies turbo-Brayton cryocoolers as the leading pathway to close this gap. Turbo-Brayton systems use high-speed turbomachinery with gas bearings — no contacting parts, enabling long life and high reliability. The architecture supports distributed cooling, with a single compressor driving multiple cooling loops across a large tank surface. But demonstrated capacities are far below the requirement. The scale-up from milliwatt-class flight units to hundred-watt-class depot systems is not a matter of building a bigger version of the same thing — it requires fundamental advances in compressor technology, heat rejection, and system integration.

Hartwig and Plachta's 2016 trade study confirms that ZBO is the lower-mass option whenever storage duration exceeds a few weeks. For Project Dyson, where propellant may be stored for months or years between mission phases, passive boiloff acceptance is not viable — the mass penalty of replacement propellant far exceeds the mass of a cryocooler system.

**This is arguably the single most critical technology gap in the propellant storage system.** The physics is understood. The ground demonstrations work. But nobody has built — or even designed in detail — a flight-qualified cryocooler system at the required scale.

## 5. The Comprehensive Picture (Gandolfi 2024)

Gandolfi et al.'s 2024 review in *npj Microgravity* is the best single entry point to this entire field. Published open-access, it synthesizes decades of NASA, ESA, and JAXA cryogenic fluid management research into a coherent assessment of what works, what does not, and what remains open. Its reference list alone is a goldmine — the paper cites over 150 sources spanning the full range of cryogenic technologies from gauging and liquid acquisition to thermodynamic venting and active cooling.

The review confirms the assessment that emerges from our own reading: passive thermal management is well-characterized, ground-based ZBO is demonstrated, and the cryocooler scaling gap is the critical remaining challenge. It also highlights fluid management in reduced gravity — liquid acquisition, slosh dynamics, and propellant gauging — as an area where flight data remains scarce.

## Three New Research Questions

This review identifies three focused questions that the existing literature defines clearly but does not answer:

1. **[rq-0-47](/questions/sunshield-deployment-architecture)**: Sunshield deployment architecture for L4/L5 — because the sunshield is the single most critical passive thermal component, and the L4/L5 radiation environment simplifies the design problem in ways that LEO-focused studies do not capture.

2. **[rq-0-48](/questions/mli-long-duration-degradation)**: MLI long-duration performance and degradation at L4/L5 — because lab-vs-flight degradation factors of 2-4x could double cryocooler power requirements, and nobody has characterized MLI degradation over 10-15 year timescales in the L4/L5 radiation and micrometeoroid environment.

3. **[rq-0-49](/questions/cryocooler-scaling-space-zbo)**: Cryocooler scaling from milliwatt to hundred-watt class for space ZBO — because this is the hardest technology gap in the entire propellant storage system, and the pathway from JWST-class to depot-class is undefined.

## Updated Assessment

Our confidence on [rq-0-30](/questions/cryogenic-boiloff-management) moves from "Low-Medium" to "Medium." The physics of zero boiloff is well-characterized. The GODU-LH2 ground demonstration proves the concept at meaningful scale. L4/L5 turns out to be a thermally favorable location for cryogenic storage — arguably the best location in the inner solar system for this purpose. The ULA depot architecture provides a credible passive thermal design. And LBMLI offers a clear improvement over conventional insulation.

But the cryocooler scaling gap is real and large. Nobody has published a flight-qualified cryocooler design above single-watt capacity at 20 K. Nobody has published an L4/L5-specific thermal model at 100-tonne scale. And the MLI degradation data suggests that any system designed to laboratory insulation values will be undersized.

The full [updated analysis](/questions/cryogenic-boiloff-management) now covers 21 papers across both arxiv and non-arxiv sources. The non-arxiv literature did exactly what we hoped: it filled the engineering gaps that the arxiv corpus could not.
