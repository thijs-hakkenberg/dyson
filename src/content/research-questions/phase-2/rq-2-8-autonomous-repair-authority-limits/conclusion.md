---
questionId: "rq-2-8"
questionSlug: "autonomous-repair-authority-limits"
type: "discussion-conclusion"
generatedBy: "claude-opus-4-6"
generated: "2026-02-07"
roundCount: 1
terminationReason: "unanimous-conclude"
---

# Discussion Conclusion: Autonomous Repair Authority Limits

## Summary

The discussion converged on a **five-tier authority framework** as the foundational governance architecture for maintenance drone operations in the Phase 2 Swarm Expansion. The central design principle—that the autonomous envelope must cover approximately 95% of anticipated maintenance events by volume—emerges not from a preference for autonomy but from hard mathematical constraints. With 100-500 daily maintenance events projected across 10 million swarm elements and 8-16+ minute communication latencies to Earth, requiring human approval for even a modest fraction of routine operations would catastrophically degrade fleet utilization, effectively doubling required fleet size at a cost of billions of dollars with no corresponding safety benefit.

The framework stratifies operations across five tiers (Tier 0: fully autonomous/no reporting, through Tier 4: Earth approval required), mapping each maintenance action to an authority level based on reversibility, asset value at risk, and time-criticality. A critical architectural insight is that **maintenance depots must serve as intermediate governance nodes**, not merely logistics hubs. Spacing depots so every swarm element falls within 0.5 light-seconds of at least one depot enables near-real-time oversight for medium-risk operations, creating a three-layer authority hierarchy (drone → depot → Earth) that resolves the latency problem without sacrificing meaningful human oversight for consequential decisions.

The discussion also strongly linked the repair philosophy debate to the governance question. The "swap-first" approach (aligned with GPT's recommendation and Gemini's Swap-and-Drop doctrine) is favored not only for its robotic simplicity but because it **minimizes the high-authority-tier operational envelope**. Every standardized ORU swap is a bounded-risk, reversible Tier 1 operation; every in-situ weld or braze is Tier 3 at minimum. This framing recharacterizes the repair philosophy choice as fundamentally a governance throughput decision, not merely an engineering one.

## Key Points

- **~95% of maintenance events must be autonomously executable** (Tier 0-1) to avoid fleet utilization collapse; Earth approval should be reserved for low-frequency, high-consequence, non-time-critical decisions such as satellite decommissioning, swarm topology changes, and drone autonomy software updates.

- **Swap-first repair philosophy directly enables governance scalability** by keeping the vast majority of operations within the deterministic, reversible, low-risk Tier 1 envelope. Adopting component-level in-situ repair (welding/brazing) would shift a significant fraction of operations into depot-approval tiers, creating throughput bottlenecks.

- **Depots must function as regional authority delegates**, with Tier 3 approval authority and Tier 4 recommendation authority, spaced to ensure sub-0.5-light-second latency to all swarm elements. This intermediate governance layer is the key architectural innovation resolving the paralysis-or-catastrophe dilemma.

- **Authority limits must be class-specific**: inspectors (14-52 kg) capped at Tier 1, servicers (180-320 kg) authorized through Tier 2 with depot-approved Tier 3 access, and depot systems holding Tier 3 approval and Tier 4 pre-packaging authority.

- **A graduated authority expansion protocol is essential**, starting with a compressed envelope (Tier 1 operations temporarily elevated to Tier 2-3) and expanding based on demonstrated statistical reliability—1,000 successful operations at <0.5% anomaly rate before downgrading a procedure type. Regression triggers must be automatic and fleet-wide upon any satellite-damaging incident.

- **Authority decision logic must be implemented as deterministic, auditable rule sets**—not ML-based judgment—to ensure traceability, safety certification, and post-incident forensic capability. Cryptographic authorization tokens with expiration times should govern Tier 3-4 approvals.

## Unresolved Questions

1. **What is the actual swarm element failure mode distribution?** The optimal calibration of authority tier boundaries depends critically on knowing what fraction of failures are recoverable by ORU swap versus requiring structural intervention. Without this data, the 95% autonomous target is an estimate that may need significant revision.

2. **What depot spacing and count is feasible within mass/cost budgets?** The framework's reliance on depot-level intermediate authority assumes sub-0.5-light-second coverage, but depot architecture (number, placement, capability) remains undefined. If depot density is constrained, the Tier 2-3 boundary may need restructuring.

3. **How should correlated failure scenarios (solar storms, debris fields) modify authority thresholds in real time?** The proposal for fleet-wide pause commands is directionally correct, but the specific detection triggers, escalation timing, and recovery protocols for correlated anomalies require detailed design.

4. **What governance applies during communication blackout periods?** Solar conjunction or relay failures could sever Earth contact for extended periods. Whether drones should maintain current authority levels, automatically compress to a conservative envelope, or expand depot authority during blackouts remains unspecified.

## Recommended Actions

1. **Develop the complete operation taxonomy and tier mapping** by cataloging every anticipated maintenance action, classifying each by reversibility, asset exposure, and time-criticality, and assigning preliminary tier levels. This becomes the foundational specification for fleet management software decision trees and should be completed before software architecture proceeds.

2. **Model fleet throughput under the proposed tier structure** using projected failure rates (0.1%-1% annual per satellite), fleet sizes from each model's architecture, and realistic approval processing times at each tier. Validate that the 95% autonomous target is achievable and identify the sensitivity of fleet sizing to the Tier 1/Tier 2 boundary.

3. **Conduct a detailed analysis of ISS, Orbital Express, and MEV-1/2 authority precedents**, extracting specific escalation trigger designs, autonomous grapple authority limits, and post-incident authority revision protocols. Map lessons learned to the Dyson swarm context, accounting for scale differences.

4. **Define depot authority delegation architecture as a priority within depot design**, specifying the computational, communication, and decision-making capabilities required for depots to serve as Tier 3 approval authorities. This must be co-designed with depot spacing analysis to ensure governance coverage.

5. **Design and schedule the Phase A graduated authority expansion campaign** for the initial inspection fleet deployment, including specific data collection requirements, statistical confidence thresholds for tier downgrade decisions, and automatic regression trigger protocols. This campaign plan should be finalized before the first maintenance drones are deployed.