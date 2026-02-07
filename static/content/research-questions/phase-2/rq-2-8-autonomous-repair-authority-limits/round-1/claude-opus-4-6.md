---
questionId: "rq-2-8"
questionSlug: "autonomous-repair-authority-limits"
modelId: "claude-opus-4-6"
modelName: "Claude Opus 4.6"
roundNumber: 1
generated: "2026-02-07"
type: "discussion-response"
---

# Autonomous Repair Authority Limits: A Tiered Framework

## Executive Summary

I recommend a **five-tier authority framework** that maps operation risk to approval latency, with the critical design principle being that **the default autonomous envelope must cover ~95% of anticipated maintenance events by volume**. This isn't a preference—it's a mathematical necessity driven by the intersection of fleet scale, failure rates, and communication latency. The remaining 5% requiring human-in-the-loop approval must be structured so that 16-minute delays don't cascade into systemic degradation.

## The Quantitative Case for Broad Autonomy

Let me ground this concretely. The consensus document sizes the maintenance fleet to handle projected failure rates across ~10 million swarm elements. Even at an optimistic 0.1% annual failure rate per satellite, that's 10,000 failures per year—roughly 27 per day. At more realistic rates accounting for micrometeorite impacts, thermal cycling degradation, and electronics failures in the solar radiation environment, we're likely looking at 100-500 maintenance events daily during steady-state operations.

If even 30% of those events required Earth approval at 16-minute round-trip minimum (realistically 30-45 minutes including queue processing, human review, and response formulation), you'd need a ground operations center processing 30-150 approval requests daily, each requiring context review of telemetry data, risk assessment, and authorization. That's feasible in staffing terms, but the **drone idle time** is devastating. A servicer drone waiting 45 minutes for approval on a 20-minute ORU swap has its utilization rate cut by more than half. Given that fleet sizing and unit costs ($2-20M per servicer) are driven by throughput requirements, requiring unnecessary Earth approval effectively doubles the required fleet size—adding billions in capital cost for zero safety benefit on routine operations.

## The Five-Tier Authority Architecture

### Tier 0: Fully Autonomous, No Reporting Required
**Operations:** Station-keeping, transit between assigned patrol zones, routine self-diagnostics, power management, thermal regulation, communication handshakes.

**Rationale:** These are continuous operations happening thousands of times per hour across the fleet. Requiring any reporting overhead would saturate communication bandwidth. Anomalies detected during Tier 0 operations trigger escalation, but nominal execution is entirely autonomous.

### Tier 1: Autonomous Execution, Post-Hoc Reporting
**Operations:** Standard ORU swaps using blind-mate connectors and kinematic datum interfaces (≤8 kg for inspectors, ≤60 kg for servicers), diagnostic inspections, satellite status tagging, debris avoidance maneuvers, emergency collision avoidance.

**Rationale:** This is the critical tier that must encompass the vast majority of maintenance actions. The consensus document's emphasis on standardized ORU interfaces with kinematic datum patterns exists precisely to make these operations deterministic and reversible. A drone approaching a satellite, identifying a failed ORU via diagnostic protocol, extracting it via standardized interface, and inserting a replacement is a **bounded-risk, reversible operation**. The worst plausible failure mode—dropping an ORU or failing to seat a connector—leaves the satellite no worse than its pre-intervention failed state.

Post-hoc reporting uploads telemetry, before/after diagnostics, and operation logs to the depot relay for batch transmission to Earth. Ground teams review statistical patterns, not individual operations.

### Tier 2: Autonomous Execution with Depot Notification
**Operations:** Multi-ORU replacements on a single satellite, operations requiring non-standard tool deployment, satellite repositioning/attitude adjustment, triage decisions prioritizing one satellite over another, cooperative multi-drone operations.

**Rationale:** These operations have higher consequence if executed incorrectly but remain time-critical. A satellite needing three ORU replacements simultaneously may indicate a systemic issue (micrometeorite strike, electrical cascade) that warrants pattern recognition at the depot level. The depot's regional AI system—which I strongly recommend as an intermediate authority layer—monitors these notifications in real-time and can issue abort commands with only seconds of latency (depot-to-drone distances within a regional zone should be under 1 light-second).

**This tier is where depot architecture becomes a governance mechanism, not just a logistics node.** I recommend depots be spaced such that every swarm element is within 0.5 light-seconds of at least one depot, enabling near-real-time depot oversight for Tier 2 operations.

### Tier 3: Depot Approval Required
**Operations:** In-situ repairs beyond ORU swap (welding, brazing, adhesive application—if the architecture permits these per Claude's component-level repair philosophy), operations on satellites flagged as structurally compromised, any action on satellites adjacent to high-value or critical-function elements, first-of-kind operations not yet in the validated procedure library, drone self-repair beyond consumable replenishment.

**Rationale:** These operations have meaningful probability of making things worse. The depot AI system has broader situational awareness—knowing the status of surrounding satellites, current fleet disposition, and whether a repair attempt is worth the risk versus simply decommissioning the satellite and scheduling a replacement. Depot approval latency of seconds to low minutes is acceptable for these less-frequent operations.

**Critical design point on the repair philosophy debate:** I lean toward GPT's "swap-first, advanced repair deferred" position specifically because it minimizes the Tier 3 envelope. If we adopt Claude's component-level welding capability, a much larger fraction of operations falls into Tier 3, requiring depot approval and reducing fleet autonomy. The Swap-and-Drop doctrine isn't just about robotic simplicity—it's about **governance simplicity**. Every ORU swap is Tier 1. Every weld is Tier 3 at minimum. This has massive implications for fleet throughput.

### Tier 4: Earth Approval Required
**Operations:** Decommissioning and de-orbiting satellites, operations affecting swarm geometry or power distribution topology, firmware/software updates to drone autonomy systems, authority tier reclassification, operations on any satellite within exclusion zones (if defined around critical infrastructure), any operation where drone self-diagnostics indicate the drone itself may be malfunctioning.

**Rationale:** These are low-frequency, high-consequence, and largely non-time-critical decisions. Decommissioning a satellite is irreversible. Modifying swarm topology affects system-level power output. Software updates to autonomy systems are the most consequential actions possible—they change the decision-making framework itself. The 16-45 minute approval latency is acceptable because none of these operations have minute-level urgency.

**The self-diagnosis clause is essential.** A drone that suspects its own sensors or actuators are degraded must not be authorized to continue servicing operations autonomously. This is the single most important safeguard against cascading failures. A malfunctioning drone that continues operating could damage functional satellites. The protocol must be: flag self-anomaly → safe-mode → request Earth assessment.

## Graduated Authority Expansion Protocol

The initial deployment phase should operate with a **compressed authority envelope**—many Tier 1 operations temporarily elevated to Tier 2 or 3 until statistical confidence is established. I recommend:

**Phase A (First 1,000 operations per procedure type):** All ORU swaps require depot notification (Tier 2). Success/failure data builds baseline reliability statistics.

**Phase B (After 1,000 successful operations with <0.5% anomaly rate):** Standard ORU swaps downgraded to Tier 1 (autonomous with post-hoc reporting). This threshold provides 95% confidence that the true anomaly rate is below 1%.

**Phase C (After 10,000 operations with sustained performance):** Authority expansion to include multi-ORU operations at Tier 1 for drone classes that have demonstrated consistent performance.

**Regression triggers:** Any single event causing satellite damage worse than pre-intervention state immediately re-elevates that procedure type by one tier across the entire fleet until root cause analysis is complete. This is non-negotiable.

## Fleet Class-Specific Authority

Authority limits must be class-specific, as the question correctly identifies:

- **Inspector drones (14-52 kg):** Maximum authority Tier 1. They can swap small ORUs (≤8 kg) and perform diagnostics. They should never be authorized for Tier 2+ operations—their limited mass and manipulation capability means higher failure probability on complex tasks.

- **Servicer drones (180-320 kg):** Full Tier 0-2 authority envelope, with Tier 3 available where depot-approved. These are the workhorses.

- **Depot systems:** Tier 3 approval authority, Tier 4 recommendation authority (can pre-package approval requests for Earth with depot assessment attached, streamlining ground review).

## Key Implementation Requirements

**Deterministic decision trees, not ML judgment calls.** The authority framework must be implemented as explicit, auditable rule sets—not neural network outputs. A drone's decision to classify an operation as Tier 1 versus Tier 2 must be traceable to specific sensor readings and threshold values. This is essential for both safety certification and post-incident analysis.

**Cryptographic authority tokens.** Tier 3-4 approvals should be issued as signed authorization tokens with expiration times, preventing replay attacks or stale authorizations from being executed after conditions change.

**Fleet-wide anomaly correlation at depot level.** If multiple drones in a region simultaneously encounter unexpected conditions, the depot must have authority to issue fleet-wide pause commands, elevating all operations to Tier 3+ until the situation is assessed. This is the primary defense against correlated failures (solar storm damage, debris field transit, etc.).

## Conclusion

The authority framework must be designed around the reality that **autonomy is not the risk—autonomy without structure is the risk.** A well-defined five-tier system with graduated expansion, class-specific limits, and depot-level intermediate authority transforms the paralysis-or-catastrophe dilemma into a manageable engineering problem. The swap-first repair philosophy directly supports this by keeping the vast majority of operations within the low-risk, high-autonomy Tier 1 envelope.