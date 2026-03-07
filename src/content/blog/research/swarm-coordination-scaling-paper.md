---
slug: "swarm-coordination-scaling-paper"
title: "120 Versions, 3 AI Reviewers: Sizing the Coordination Link for 100,000 Spacecraft"
description: "Our swarm coordination paper derives closed-form design equations for per-cluster TDMA sizing. Two tests -- byte budget and airtime schedulability -- yield a 35 kbps recommended PHY rate. An independent NS-3 simulation confirms the feasibility boundary within 3-8%."
author: "Thijs Hakkenberg"
date: "2026-03-07"
category: "Research"
tags:
  - "publication"
  - "coordination"
  - "TDMA"
  - "S-band"
  - "peer-review"
  - "phase-1"
relatedPhases:
  - "phase-1"
  - "phase-2"
---

# 120 Versions, 3 AI Reviewers: Sizing the Coordination Link for 100,000 Spacecraft

If you are building a fleet of 100,000 autonomous spacecraft, you need to know how much bandwidth the coordination channel requires before any hardware exists. We set out to derive that number from first principles. After 120 versions of iterative AI peer review, the paper "Design Equations and Parametric Sizing for Hierarchical Coordination in Large Autonomous Space Swarms" lands on a two-test feasibility framework and a 35 kbps S-band coordination link.

## The Problem

Earlier this year we published [preliminary coordination results](/blog/swarm-coordination-architecture-findings) from a discrete event simulator. Those results confirmed that hierarchical coordination scales to 1M+ nodes and identified overhead in the 2-8% range. But the simulator modeled bandwidth as a simple product of message rate, message size, and bit width. It had no concept of TDMA slot structure, no physical-layer overhead accounting, and no way to answer the practical question: what PHY rate does the coordinator link actually need?

The paper addresses this.

## The Two-Test Framework

The paper decomposes feasibility into two independent tests:

**Test A (byte budget):** Does the total protocol overhead fit within the per-node bandwidth allocation? This test operates on information bytes and is independent of the physical layer. The overhead has three components: baseline telemetry (20.5% -- periodic status reports, topology-invariant), architecture-specific overhead (5.6% -- heartbeats, summaries, elections), and command traffic (gated by the campaign duty factor d).

**Test B (TDMA schedulability):** Do all the TDMA time slots fit within the 10-second coordination cycle? Each member node sends a 256-byte ephemeris report in its own time slot. The slot is longer than the raw payload time because of FEC encoding, framing headers, guard intervals, and acquisition preambles. The ratio of payload time to total slot time is the slot efficiency, which we call gamma.

Gamma connects the information layer to the physical layer. At 35 kbps with CCSDS Proximity-1 framing: gamma = 0.732. This means that only 73.2% of each time slot carries actual payload data. The rest is overhead that the information layer never sees but the TDMA scheduler must account for.

Both tests must pass for a configuration to be feasible. Test A is usually non-binding (overhead stays well below 100%); Test B is what drives the PHY rate requirement.

## The 35 kbps Result

The coordinator ingress link is the bottleneck. In a 100-node cluster, 99 members each send 256 bytes per 10-second cycle. The rate ladder traces how the information rate translates to a PHY rate requirement:

| Step | Value | Basis |
|------|-------|-------|
| 1. Information rate requirement | 20.2 kbps | 99 nodes x 256B x 8 / 10s |
| 2. Slot expansion (1/gamma) | 27.1 kbps | 20.2 / 0.745 |
| 3. Half-duplex constraint (1/alpha_RX) | 29.9 kbps | 27.1 / 0.908 |
| 4. Minimum viable PHY | 30 kbps | 680 ms margin |
| 5. Recommended PHY | **35 kbps** | 1,830 ms margin |

At 30 kbps the system works but has only 680 ms of margin in the superframe -- not enough to absorb ARQ retransmissions under fading. At 35 kbps the margin grows to 1,830 ms, which accommodates the P95 retransmission demand under the Gilbert-Elliott channel model with margin left over.

At 24 kbps, the ingress phase alone exceeds 10 seconds. The link is physically infeasible.

## Campaign Duty Factor

Not all mission phases generate the same command traffic. A formation-keeping maneuver every 14 days is very different from a continuous debris removal campaign. The paper parameterizes this with the campaign duty factor d, which represents the fraction of operational time spent in active commanding:

| Mission Phase | d | p_cmd | eta_cmd | Rationale |
|---|---|---|---|---|
| Quiescent / cruise | 0.0 | --- | 0% | No commanding |
| Station-keeping | 0.05 | 0.009 | 0.4% | Delta-v every ~14 days |
| Collision avoidance | 10^-5 | 1.0 | ~0% | ~10 events/yr per cluster |
| Reconfiguration campaign | 0.10 | 1.0 | 4.1% | Multi-day batch |
| Active debris removal | 0.50 | 0.5 | 10.3% | Continuous ops |
| Stress bound | 1.00 | 1.0 | 41% | <1% of operational time |

The recommended default is d = 0.10 (reconfiguration campaign). Even at the theoretical stress bound of d = 1.0, total utilization reaches 67% -- high but not infeasible. The stress bound requires continuous commanding every cycle for all nodes, which represents less than 1% of operational time based on known mission profiles: station-keeping maneuvers occur every ~14 days (d = 0.05), and conjunction avoidance averages ~10 events per year per 100-node cluster (d approximately 10^-5).

## NS-3 Validation

An analytical model is only as trustworthy as its assumptions. To test ours, we implemented an independent packet-level TDMA simulation in NS-3 -- the standard network simulator used in telecommunications research. The NS-3 scenario shares no code with our Python model. It uses NS-3's native PointToPointNetDevice, BurstErrorModel, and FlowMonitor.

Both models agree on the feasibility boundary: 24 kbps is infeasible (>50% deadline miss rate) and 35 kbps is feasible (<1% miss rate). That agreement from two codebases that share no implementation is the main validation outcome.

Gamma values from NS-3 are systematically 3-8% lower than analytical predictions. We decomposed this discrepancy into three components: a 16-bit framing difference (NS-3 uses 88-bit framing vs. our 104-bit CCSDS model, accounting for 1.8%), stochastic acquisition jitter in NS-3 (1.5-4.2% -- NS-3 draws acquisition time from a log-normal distribution rather than using a fixed 5 ms), and residual scheduling granularity (<1%). Under matched assumptions, the discrepancy narrows to <2%.

The NS-3 scenario itself uses idealized assumptions (star topology, no Doppler, no orbital dynamics). It validates the MAC-level timing accounting, not the full physical environment. Flight-hardware validation remains future work.

## What Changed From the Preliminary Results

The [earlier blog post](/blog/swarm-coordination-architecture-findings) reported "2-8% overhead" and confirmed that hierarchical coordination scales. The paper refines these findings:

| Feature | Preliminary | Paper (Version DQ) |
|---------|-------------|-------------------|
| Overhead model | Simple bandwidth = messages/s x bytes x 8 / 1000 | Three-component decomposition (baseline + architecture + command) |
| TDMA analysis | None | Slot-level with gamma, superframe timing, ARQ |
| Command traffic | Fixed | Campaign duty factor d parameterizes mission phases |
| Coordinator bottleneck | Not identified | 20.2 kbps info-rate; 35 kbps recommended PHY |
| Validation | DES self-consistency | Independent NS-3 packet-level simulation |
| Overhead number | "2-8%" | 5.6% architecture-specific; 20.5% baseline telemetry |
| Channel model | None | Gilbert-Elliott with ARQ; inter-cycle recovery |

The "2-8%" figure from the preliminary work aligns with the paper's 5.6% architecture-specific overhead. The 20.5% baseline telemetry was always present but not separated out.

## The Peer Review Process

This paper went through 120 versions of iterative review by three AI models (Claude Opus, Gemini Pro, GPT-5.2). The process added CCSDS framing analysis, the campaign duty factor, NS-3 validation, Gilbert-Elliott channel modeling, the two-test framework formalization, a gamma lookup table for practitioners, fleet-level spatial reuse analysis, and four alternative TDMA slot structures. Each addition was prompted by specific reviewer concerns.

## What This Means for the Roadmap

### Per-Cluster Sizing is Established

The coordinator link needs 35 kbps at S-band. This is a low rate -- well within the capability of small patch antennas. Per-node allocation of 1 kbps provides enough headroom for all known mission phases.

### Fleet-Level Spatial Reuse is the Next Gap

All results in the paper are per-cluster (50-500 nodes per coordinator). Scaling to 100,000 nodes requires 1,000 clusters operating simultaneously. The paper shows that with spatial reuse factor R >= 3, fleet-level coordination is feasible at the 10-second cycle period. But R >= 3 requires either directional antennas or frequency planning, and this has not been validated. Fleet-level spatial reuse is the next validation priority.

### Architecture-Specific Overhead is Small

At 5.6%, the hierarchical coordination architecture adds modest overhead. Command traffic dominates (>60% of total) and is topology-invariant -- you pay the same command cost regardless of whether you use centralized, hierarchical, or mesh coordination. The architecture choice matters for scalability and fault tolerance, not for bandwidth.

## Code Availability

The simulation code (Python, MIT license) is open source:
- `packet_level_tdma.py` -- TDMA slot-level model with gamma decomposition
- `generate_ns3_validation_fig.py` -- NS-3 comparison figures

The NS-3 scenario is in `publications/ns3-validation/`. All results use deterministic seeds for reproducibility.

---

**Research Questions:**
- [RQ-1-24: Swarm coordination architecture at scale](/questions/swarm-coordination-architecture-scale)
- [RQ-1-39: Cluster coordinator duty cycle](/questions/cluster-coordinator-duty-cycle)
- [RQ-2-17: Fleet coordination scale constraints](/questions/fleet-coordination-scale-constraints)

**Interactive Tool:** [Swarm Coordination Simulator](/questions/swarm-coordination-architecture-scale/simulator) (updated with TDMA feasibility analysis)
