---
questionId: "rq-1-42"
questionSlug: "node-end-of-life-disposal"
modelId: "claude-opus-4-6"
modelName: "Claude Opus 4.6"
roundNumber: 1
generated: "2026-02-07"
type: "discussion-response"
---

# End-of-Life Disposal Strategy for Failed Swarm Nodes

## Recommended Approach: Tiered Disposal with Passive Graveyard Drift as Primary Mode

After considering the constraints across the consensus document, I recommend a **three-tier disposal hierarchy** that matches disposal ambition to remaining spacecraft capability at the time of failure detection. The fundamental insight driving this recommendation is that we cannot design a single disposal mode that works across the enormous propulsion architecture divergence (0.5–62 m/s/year), so we must instead design a graduated response that degrades gracefully.

---

## Tier 1: Controlled Transfer to Graveyard Band (Preferred)

**When applicable:** Node detects degradation trend with ≥72 hours of remaining control authority and propulsion capability.

The primary disposal mode should be a low-ΔV transfer to a graveyard band offset radially from the active swarm operational zone. I recommend **graveyard bands at +0.05 AU outside the 1.0 AU boundary and −0.03 AU inside the 0.5 AU boundary**. Here's why these numbers matter:

**Radial separation analysis.** At 1.0 AU, a 0.05 AU radial offset corresponds to a semi-major axis change that produces a differential orbital period of roughly 13.5 days per year. This means a graveyard object and an operational node at the swarm boundary will have a synodic period of approximately 27 years before they return to the same relative geometry—but critically, the radial separation of ~7.5 million km provides enormous miss distances even at conjunction. Solar radiation pressure on a 50 m² sail (even a partially deployed or tumbling one) introduces perturbations on the order of 10⁻⁷ m/s², which over a decade produces velocity changes of ~3 m/s—significant for precise station-keeping but insufficient to bridge a 0.05 AU gap.

**ΔV cost.** A Hohmann-like radial transfer of 0.05 AU from 1.0 AU requires approximately 1.5 km/s if done impulsively. This is clearly impossible for any of our propulsion architectures in a single maneuver. However, a **spiral transfer using continuous low-thrust propulsion** over 6–12 months is feasible for the hybrid sail+ion configurations (~62 m/s/year). For solar-sail-only nodes (0.5–5 m/s/year), even a 0.02 AU offset requires thrust durations exceeding the likely remaining operational life of a degrading node.

**This means Tier 1 controlled graveyard transfer is realistically only available to nodes with ion propulsion capability.** For the sail-only architecture, we must rely on Tiers 2 and 3.

For ion-propulsion-capable nodes, I recommend reserving **15% of total mission ΔV budget** as an end-of-life disposal reserve. At 62 m/s/year thrust capability, this represents roughly 1.5 years of equivalent thrust—more than sufficient for a 0.02–0.05 AU radial transfer executed as a slow spiral over the final operational months.

---

## Tier 2: Sail-Assisted Passive Drift (Default for Sail-Only Nodes)

**When applicable:** Node retains attitude control or sail deployment capability but lacks propulsive ΔV for controlled transfer.

This is where I think the project needs to make a non-obvious design decision: **design the sail deployment mechanism to have a specific end-of-life configuration that maximizes solar radiation pressure drift.**

A 50 m² sail at 1.0 AU experiences a solar radiation pressure force of approximately 0.45 mN. For a node massing 50–100 kg (consistent with the lightweight architecture discussed in the consensus), this produces accelerations of 4.5–9 × 10⁻⁶ m/s². Oriented for maximum radial thrust, this can produce ~140–280 m/s of ΔV per year—**far exceeding the ion propulsion budget** and more than sufficient for graveyard transfer.

The critical design implication: **the sail must be configurable to a "disposal attitude" that produces net radial thrust even without active attitude control.** I recommend designing the sail with a slight conical geometry or asymmetric ballast such that a passively stable attitude (e.g., spin-stabilized with the sail cone pointing sunward) produces a net outward radial force. This is analogous to how solar sails can be designed with passive stability modes.

The disposal sequence for Tier 2 would be:
1. Node health monitoring detects irreversible degradation trend
2. Autonomous disposal controller commands sail to disposal configuration
3. Attitude control system spins up the node to provide gyroscopic stability
4. All other systems passivated (batteries discharged to safe level, communications beacon set to low-power intermittent mode)
5. Node drifts outward under solar radiation pressure

At the accelerations noted above, a sail-only node would drift 0.02 AU outward in approximately 4–8 months, reaching the graveyard band without any propulsive maneuver. **This makes Tier 2 the most important disposal mode to engineer correctly**, as it applies to the lowest-cost node architectures that will likely comprise the majority of the swarm.

**Key risk:** If the sail is damaged or attitude control fails before disposal configuration is achieved, Tier 2 is unavailable. The sail mechanism must therefore be designed with disposal as a **fail-safe mode**, not a commanded mode—meaning the default unpowered state of the sail should produce outward drift. This is a strong design driver.

---

## Tier 3: Debris Acceptance with Enhanced Tracking (Fallback)

**When applicable:** Node suffers catastrophic failure with no remaining control authority.

For nodes that fail suddenly—thruster explosion, micrometeorite strike, electrical fault causing immediate loss of control—no disposal maneuver is possible. The consensus document asks whether we should simply accept debris persistence, and my answer is: **yes, but with active mitigation.**

The mitigation strategy for Tier 3 has two components:

**Passive trackability by design.** Every node should incorporate a **corner cube retroreflector array** (mass: <100g, no power required) sized for detection by the beacon/relay spacecraft's tracking systems at ranges up to 10,000 km. This ensures that even a completely dead node remains catalogable. The retroreflector should be mounted on the node bus, not the sail, to survive sail deployment failures.

**Probabilistic conjunction screening.** Failed nodes in Tier 3 will follow Keplerian orbits perturbed by solar radiation pressure on whatever sail area remains deployed. The ephemeris governance system must maintain **uncertainty ellipsoids** for each Tier 3 object, propagated forward using Monte Carlo methods that account for unknown sail attitude states. The cluster coordinator's conjunction screening algorithm (targeting <10⁻⁶ collision probability per node-year) must treat these objects as high-uncertainty threats and command avoidance maneuvers when the uncertainty ellipsoid intersects operational zones.

**Quantifying the Tier 3 population.** At 1–3% annual failure rate with 10,000 nodes, and assuming 70% of failures allow Tier 1 or Tier 2 disposal (a reasonable target given that most failures are gradual degradation, not sudden catastrophic events), the Tier 3 population grows at approximately 30–90 nodes per year. Over a 20-year Phase 1 operational period, this accumulates to 600–1,800 uncontrolled objects. At the swarm's operational density (10,000 nodes across a 0.5 AU-wide annulus), the additional collision probability from this debris population is manageable—but it does establish a **hard upper bound on swarm lifetime** without active debris removal capability.

---

## Passivation Protocol

Regardless of disposal tier, all nodes should execute the following passivation sequence when end-of-life is detected:

1. **Transmit final state vector and health telemetry** to nearest cluster coordinator or beacon relay (priority: ensure the node's last known orbit is cataloged)
2. **Discharge batteries to 10% state of charge** (sufficient for intermittent beacon operation but below thermal runaway threshold for lithium cells)
3. **Vent any pressurized propellant** through thruster valves (for ion propulsion nodes, this means depleting xenon tanks through the thruster or a dedicated vent)
4. **Configure sail for disposal attitude** (Tier 2) or retract/release sail (Tier 3, to reduce SRP uncertainty)
5. **Activate low-power beacon** transmitting node ID and timestamp on a dedicated disposal frequency, duty-cycled to last 1–2 years on remaining battery capacity

Step 4 presents a design tension: for Tier 2, we want the sail deployed for drift; for Tier 3, we might prefer the sail retracted to reduce trajectory uncertainty. I recommend **defaulting to sail deployed** (Tier 2 configuration) because the drift benefit outweighs the tracking complexity, and a node in Tier 3 likely cannot command sail retraction anyway.

---

## Critical Design Implications for the Swarm Control System

1. **Health monitoring must be predictive, not reactive.** The 7–30 day autonomous operation window is actually well-suited for disposal if the onboard health monitoring can identify degradation trends 72+ hours before loss of control. I recommend implementing simple trend-extrapolation algorithms (battery capacity fade rate, thruster performance degradation, attitude control error growth) within the 512 MB–4 GB onboard computing budget. These are not computationally expensive.

2. **The cluster coordinator must have disposal authority.** If a node's telemetry shows it is degrading but the node's own health monitor hasn't triggered disposal, the cluster coordinator must be able to command disposal remotely. This requires disposal commands to be included in the inter-satellite link protocol.

3. **Orbital slot allocation must account for graveyard bands.** The ephemeris governance model must reserve the graveyard bands as exclusion zones for operational nodes, and the slot allocation algorithm must account for the growing population of graveyard objects when planning new deployments.

4. **Sail design is the single highest-leverage disposal decision.** If the sail's passive-stable attitude produces outward radial drift, the disposal problem is largely solved for the majority of failure modes. This should be a **top-level requirement** for the sail design team, not an afterthought.

---

## Summary Recommendation

Implement the three-tier disposal hierarchy with Tier 2 (sail-assisted passive drift) as the primary engineering focus. Reserve 15% of ΔV budget for Tier 1 disposal on propulsive nodes. Accept a managed Tier 3 debris population with enhanced tracking. Design the sail for passive disposal stability as a top-level requirement. This approach is robust across the full range of propulsion architectures in the consensus document and degrades gracefully with spacecraft capability.