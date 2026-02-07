---
questionId: "rq-0-18"
questionSlug: "human-rating-transport-vehicles"
type: "discussion-conclusion"
generatedBy: "claude-opus-4-6"
generated: "2026-02-07"
roundCount: 1
terminationReason: "unanimous-conclude"
---

# Discussion Conclusion: Human-Rating Requirement for Transport Vehicles

## Summary

The discussion converged strongly on a **modular human-rating architecture** as the optimal path forward: all 10 Transport Vehicles should incorporate human-ratable primary structure, redundant avionics, and standardized crew module interfaces from initial design, while the actual crew compartments, life support systems, and radiation shielding are implemented as installable kits deployed only on vehicles assigned to crewed missions. This hybrid approach resolves the central tension in the consensus document by capturing the vast majority of cargo-only cost efficiency (only a 12-20% program cost increase versus 40-60% for full permanent human-rating) while eliminating the catastrophic 2-3x retrofit penalty that would arise if crew transport is deferred and later found necessary.

The analysis makes a compelling case that crew transport will become essential during the 15-year vehicle design life, most likely around Years 4-5 as Processing Station operational complexity exceeds the limits of autonomous systems and teleoperation under light-time delay. The permanent structural provisions for human-rating add only an estimated 2,000-4,000 kg per vehicle—roughly 1-2% of the 200,000 kg baseline payload—a negligible insurance premium against future need. When crew modules are installed, vehicles retain 180,000-188,000 kg of payload capacity, well within the consensus-specified 150,000-250,000 kg range. A fleet of 10 vehicles with 3 interchangeable crew module kits provides simultaneous crewed and cargo operations while maintaining inherent rescue capability through fleet mutual aid.

A critical design philosophy emerged around abort capability: traditional Earth-return abort is neither feasible nor necessary for deep-space operations. Instead, a tiered approach—shelter-in-place for 30+ days, divert-to-nearest-facility, and fleet-based crew rescue—dramatically reduces abort propellant reserves and aligns with the operational realities of asteroid belt distances. Similarly, the recommendation to develop a project-specific human-rating standard rather than pursuing NASA NPR 8705.2 certification reflects the recognition that Earth-centric frameworks would impose inappropriate constraints and multi-year schedule penalties on deep-space vehicle design.

## Key Points

- **Design in structural human-rating now; defer crew system installation.** The permanent mass penalty of ~1-2% of payload capacity is trivially justified against the 2-3x cost multiplier of future retrofit. This is the single most important near-term design decision.

- **Procure 3 crew module kits for the 10-vehicle fleet.** Interchangeable kits (12,000-20,000 kg each, including life support, shielding, and abort reserves) can be swapped between vehicles at the Processing Station, enabling up to 3 simultaneous crewed missions while 7 vehicles operate in pure cargo configuration.

- **Adopt a tiered abort philosophy, not Earth-return abort.** Shelter-in-place (30-day self-sufficiency), divert-to-nearest-haven, and fleet mutual rescue replace the infeasible requirement for Earth-return capability, keeping abort propellant reserves within the existing 6-10 km/s delta-V budget.

- **Pursue a project-specific human-rating standard.** Deriving safety requirements from NPR 8705.2 principles but tailoring them to deep-space operations avoids 2-4 years of certification delay while maintaining rigorous safety through an independent review board and incremental crewed flight testing.

- **Total program cost estimated at $2.24-2.40B** (fleet of 10 structurally human-rated vehicles plus 3 crew module kits), representing a 12-20% increase over the $2.0B cargo-only baseline—well within manageable bounds and far below the $2.8-3.2B cost of fully human-rating every vehicle.

- **Crew transport demand will likely emerge by Year 4-5**, driven by Processing Station maintenance complexity, novel failure modes, and the limitations of autonomous systems for increasingly sophisticated manufacturing and assembly operations.

## Unresolved Questions

1. **What is the actual radiation shielding mass requirement?** The 4,000-8,000 kg estimate for 60-90 day transits is the largest uncertainty in the crew module kit mass budget. If shielding exceeds 10,000 kg, the payload penalty becomes more significant and alternative approaches (active magnetic shielding, pharmacological countermeasures, faster transit trajectories) must be evaluated. This requires detailed radiation transport modeling for representative mission profiles.

2. **Can crew module kits be manufactured at the Processing Station?** If asteroid-derived materials (particularly water for radiation shielding and metals for structural components) can be used to fabricate crew modules in situ, the Earth-launch mass penalty is dramatically reduced. This depends on Processing Station manufacturing capabilities that are not yet fully defined.

3. **What is the regulatory and liability framework for a project-specific human-rating standard?** While avoiding NASA NPR 8705.2 is operationally sensible, the legal, insurance, and international partnership implications of a novel certification pathway need examination—particularly regarding crew risk acceptance for extended deep-space missions with no Earth-return abort.

4. **How does the modular crew compartment affect vehicle center-of-mass and propulsion geometry?** The addition of 12,000-20,000 kg in a localized crew module bay may require propulsion system gimbal authority or ballast provisions that have not been analyzed. This is a vehicle-level systems engineering question that must be resolved during preliminary design.

## Recommended Actions

1. **Immediately incorporate structural human-rating provisions into the vehicle preliminary design.** This is time-critical: the structural load factors (3g emergency acceleration rating), dual-fault-tolerant avionics architecture, crew module interface specifications, and Hall-effect thruster electromagnetic compatibility margins must be established before structural design freezes. Assign this as a binding requirement for the vehicle design team with a decision milestone no later than the System Requirements Review.

2. **Commission a dedicated radiation environment and shielding trade study.** Model cumulative dose for 60-, 90-, and 120-day transit profiles under both solar minimum and maximum conditions, including probabilistic solar particle event exposure. Evaluate passive shielding (water, polyethylene, regolith-derived materials), active shielding (superconducting magnetic systems), and operational mitigations (storm shelters, trajectory optimization). Deliver results within 6 months to inform crew module kit preliminary design.

3. **Develop the crew transport demand model.** Working with the Processing Station and swarm deployment teams, model the anticipated need for human presence across all project sites over the 15-year vehicle lifespan. Identify the mission year when autonomous operations become insufficient, the crew rotation cadence required, and the number of simultaneous crew transport missions needed. This directly informs the number of crew module kits to procure and the timeline for their availability.

4. **Establish a Human-Rating Standards Working Group.** Charter a team to develop the project-specific human-rating standard, drawing on NPR 8705.2, commercial crew requirements, submarine safety standards, and Antarctic operations protocols. Define the tiered abort philosophy formally, establish crew risk acceptance criteria for deep-space operations, and outline the incremental flight test campaign leading to full crewed transit missions. Engage an independent safety advisory panel from the outset.

5. **Design and prototype the crew module interface.** Before committing to full crew module kit development, design and test the standardized mechanical, electrical, power, thermal, and data interfaces between the vehicle and the crew module. This interface specification becomes a binding contract between the vehicle and crew module development teams and must be validated through physical prototype testing to ensure rapid, reliable installation and removal during Processing Station layovers.