---
questionId: "rq-1-21"
questionSlug: "feedstock-acquisition-isru-timeline"
type: "discussion-conclusion"
generatedBy: "claude-opus-4-6"
generated: "2026-02-07"
roundCount: 1
terminationReason: "unanimous-conclude"
---

# Discussion Conclusion: Feedstock Acquisition and ISRU Transition Timeline

## Summary

The feedstock strategy is the single most consequential unresolved design driver for the Assembly Node Hub and the broader Dyson swarm program. Quantitative analysis establishes that Earth-supplied feedstock at approximately $5,000/kg delivered to the 1 AU operational orbit will cost $144M–$360M annually for the baseline 1–1.7 MW monthly production target, representing the dominant recurring program expense. While this is economically survivable during Phase 1 at baseline throughput, it becomes untenable at scale, as doubling production doubles feedstock costs linearly while ISRU costs scale sub-linearly after initial infrastructure investment.

The discussion converges on a **moderate transition timeline** as the optimal strategy: full Earth-supplied feedstock for Years 1–3, a Minimum Viable ISRU (MV-ISRU) pathfinder module focused on bulk structural metals deployed at Years 3–5, expanded ISRU operations achieving 50–60% mass self-sufficiency by Phase 2 (Years 5–6), and near-full ISRU capability by Phase 3 (Year 8+). This timeline achieves cumulative cost parity with the Earth-only baseline at approximately Year 6–7. The critical insight driving this phasing is that structural metals constitute the highest-mass, lowest-purity-requirement feedstock category—making them the ideal first target for ISRU displacement—while high-purity PV materials, electronics, and specialty chemicals continue to be Earth-supplied well into Phase 2.

Crucially, the analysis demonstrates that while ISRU *operations* should be deferred, ISRU *planning and design accommodation* must not be. The Phase 1 ANH architecture must incorporate explicit ISRU-ready interfaces from day one—reserved modular pallet positions with pre-routed power, thermal, and data connections; contamination isolation architecture separating clean PV manufacturing from future regolith processing; and power and thermal systems designed for modular expansion beyond the baseline 1.5–2.0 MW class. Failure to embed these accommodations now risks design lock-in that could delay or prevent the ISRU transition upon which long-term program economics depend.

## Key Points

- **Monthly feedstock demand is approximately 3,000–5,000 kg/month** when accounting for manufacturing yield losses (~75–85%), structural framing and deployment mechanisms beyond tile mass, process consumables, and station maintenance—significantly exceeding the ~1,350–2,250 kg implied by finished tile output alone.

- **GPT's standardized cargo canister approach is the correct Phase 1 baseline**, providing predictable feedstock quality, minimal ANH design complexity, and leverage of existing launch infrastructure. Gemini's Mercury mass-driver concept, while potentially transformative at scale, is incompatible with the 1 AU baseline orbit and Phase 1 timeline (TRL 2–3) and should be preserved as a Phase 3+ architectural option only.

- **The bulk-structural-materials-first ISRU strategy** minimizes technical risk by targeting the feedstock category with the lowest purity requirements and highest mass fraction, while deferring the far more challenging semiconductor-grade silicon refining to Phase 2 expanded operations.

- **Contamination isolation is a non-negotiable design requirement**: thin-film PV deposition cannot coexist with regolith processing in a shared volume. The modular pallet architecture must support hard isolation with independent atmospheric management, physical separation, and particulate monitoring at bay boundaries.

- **The asteroid supply chain gap represents the most significant programmatic risk**: 3–5 year cycle times for asteroid prospecting, capture, and delivery mean that targeting and initial capture missions must begin by Year 1–2 to have material available for the MV-ISRU module at Year 4.

- **Power system architecture must anticipate ISRU loads**: the 1.5–2.0 MW baseline is insufficient for simultaneous manufacturing and ISRU operations, requiring pre-planned expansion capability to 2.5–3.0 MW by Year 4 through modular solar array additions and thermal bus pre-routing.

## Unresolved Questions

1. **What is the realistic manufacturing yield for thin-film PV production in microgravity?** The 75–85% estimate used here is acknowledged as optimistic given limited heritage. Actual yield rates directly determine feedstock consumption and thus both Earth-supply costs and ISRU throughput requirements. Early Phase 1 operational data is essential to refine the transition timeline.

2. **Can near-Earth asteroid capture and return trajectories be identified that deliver sufficient feedstock volume to the 1 AU ANH location within acceptable timeframes and delta-v budgets?** The ISRU timeline depends on asteroid accessibility, and the interaction between ANH orbital location and asteroid return trajectory efficiency remains unquantified. This couples directly to the unresolved orbital location trade.

3. **What contamination levels from ISRU processing are tolerable at what distances within the modular pallet architecture, and can passive isolation (separation distance, baffles) suffice or is active containment (enclosed pressurized modules) required?** This determines whether ISRU integration is a pallet-swap operation or a fundamental structural redesign.

4. **How do commercial launch cost trajectories over the next 10–15 years affect the ISRU crossover point?** If launch costs decline faster than projected (e.g., through full Starship-class reusability), the economic case for ISRU weakens and the optimal transition point shifts later; conversely, if costs plateau due to demand competition, the case strengthens and the timeline should accelerate.

## Recommended Actions

1. **Immediately incorporate ISRU-ready design requirements into the Phase 1 ANH baseline architecture.** Specifically: reserve two modular pallet positions with pre-routed power (400 kW capacity), thermal (500 kW rejection), and data interfaces; allocate 15% of the thermal rejection oversizing margin as ISRU-reserved; design the power bus for modular expansion to 3.0 MW; and implement contamination isolation provisions at reserved pallet boundaries. Estimated cost impact: 3–5% additional dry mass, negligible schedule impact if incorporated now versus substantial redesign cost if deferred.

2. **Commission a detailed Feedstock Mass Flow Model** quantifying monthly material consumption by category (structural aluminum/iron, semiconductor silicon, copper wiring, adhesives/polymers, rare-earth dopants, process consumables) for the 1–1.7 MW production target. Map each category to potential ISRU sources with associated refining chains, energy requirements, and purity achievability. This model is prerequisite to validating the MV-ISRU module specifications and the bulk-structural-first strategy.

3. **Include at least two asteroid prospecting and characterization missions in the Phase 1 program plan, launching within the first 18 months.** Target near-Earth C-type and M-type asteroids with favorable return trajectories to the 1 AU ANH location. These missions serve triple duty: establishing the asteroid feedstock pipeline needed by Year 4, demonstrating autonomous rendezvous and proximity operations applicable to swarm element deployment, and providing ground-truth compositional data to refine the ISRU processing system design.

4. **Develop a formal ISRU Integration Decision Gate at Phase 1 Year 2.5**, informed by: (a) actual manufacturing yield and feedstock consumption data from 18+ months of ANH operations, (b) asteroid prospecting mission results, (c) updated launch cost projections, and (d) MV-ISRU module detailed design maturity. This gate commits or defers the MV-ISRU deployment, with pre-positioned design accommodations ensuring either path remains viable.

5. **Extend the three-tier autonomy system architecture to include ISRU operational domains** in its initial knowledge representation and planning frameworks, even though the corresponding execution modules will not be populated until Year 3–4. Specifically, define interfaces for feedstock quality assessment, adaptive processing parameter control, and supply chain optimization at the tactical autonomy level. This prevents a costly autonomy system redesign at the point of ISRU integration.