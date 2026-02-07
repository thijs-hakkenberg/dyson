---
questionId: "rq-1-16"
questionSlug: "autonomous-assembly-certification"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
roundNumber: 1
generated: "2026-02-07"
type: "discussion-response"
---

A workable autonomy certification framework for Phase 1 has to accept a core reality: you cannot “certify the entire autonomous intelligence” in the classic spacecraft sense, because (a) the state space is enormous (multi-robot interactions + contact dynamics + welding/plasma + long-life degradation), and (b) ground intervention is not a safety control. What you *can* certify is: **(1) a bounded set of permitted behaviors, (2) an independently assured safety kernel that enforces those bounds at runtime, and (3) evidence—formal + statistical + operational—that the system remains inside the envelope with extremely high confidence even under faults and degradation.**

Below is a concrete, opinionated framework that can be stood up during Years 1–2 and scales to thousands of robots without pushing unit cost toward “aviation-style everything is DAL-A” absurdity.

---

## 1) Certification target: “Assured Autonomy Envelope” (AAE), not “full autonomy”
### Core claim you certify
For each robot class (and key tool packages), certify that:

1) **All actions are constrained to a formally specified envelope** (geometric, force/torque, energy, keep-out zones, approach cones, speed limits, EM/radiation/weld constraints, comms constraints, etc.).
2) **An independent runtime assurance layer** (safety kernel) will prevent envelope violations with high integrity even if the mission autonomy stack misbehaves.
3) **Failures degrade into safe states** (stop, back-away, tool safe, hold position, drift-safe, or “park”) without requiring Earth in the loop.

This aligns with the consensus “supervised autonomy with bounded behaviors,” but makes it certifiable by separating *productivity autonomy* from *safety enforcement*.

### Practical implication for Project Dyson tasks
- You do **not** certify the planner’s optimality or even correctness in all cases.
- You **do** certify that it cannot:
  - collide outside allowed contact regions,
  - exceed force/torque limits during ±0.5 mm precision placement,
  - fire electron beam welding unless all preconditions are satisfied,
  - enter keep-out zones around high-value collectors,
  - create unstable multi-robot coupled dynamics beyond certified limits.

---

## 2) Architecture requirement: “Two-channel autonomy” with a high-integrity safety kernel
### Channel A: Mission autonomy (complex, adaptive)
- Perception, planning, task allocation, sequencing, multi-robot coordination.
- Can be ML-assisted if desired, but treat as **untrusted** for safety.

### Channel B: Safety kernel (simple, verifiable, enforceable)
A small, deterministic, high-assurance layer that:
- Monitors state estimates and command intents.
- Enforces constraints (control barrier functions, verified monitors, limiters).
- Can override/abort/transition to safe mode locally.

**Certification focus** should be heavily weighted to Channel B, because it’s what makes Level 4+ autonomy acceptable without human gates.

**TMR note:** TMR flight computers (LEON4/RAD750) help availability, but do not solve common-mode software faults. The safety kernel must be:
- independently developed (separate toolchain/team),
- minimal (auditable),
- and ideally formally verified.

---

## 3) Define “human approval gates” narrowly—and make them time-robust
Given 8–20+ minute one-way light time, “approval gates” can only exist at the **strategic** layer, not at contact-dynamics timescales.

### Recommend: three classes of operations
1) **Always autonomous (no gates):** routine motion, approach, grasp, placement, fastening, inspection, metrology, peer-to-peer coordination—*as long as inside certified envelope*.
2) **Locally gated (robot/cluster authority):** high-energy or irreversible actions, gated by local preconditions + peer witness:
   - electron beam weld initiation,
   - cutting,
   - high-force press fits,
   - tool changes that expose hazards.
   These gates are *not human-in-the-loop*; they are **machine-in-the-loop** with independent sensing and cross-checks.
3) **Earth-authorized (rare):** envelope changes, not actions:
   - modifying keep-out zones,
   - raising force limits,
   - enabling new tool behaviors,
   - approving new assembly “recipes” for novel geometry.
   This matches “Earth-based strategic oversight” and is latency-tolerant.

This resolves the consensus ambiguity: critical operations are not paused mid-task for Earth approval; instead, **Earth approves envelopes and procedures**, and robots execute within them.

---

## 4) Behavioral envelope specification: make it explicit, composable, and testable
You need a **Dyson Autonomy Safety Spec (DASS)** that is as central as an ICD.

### What to specify (examples tied to Phase 1)
- **Kinematics & geometry:** keep-out volumes around collectors, approach corridors, max joint rates near structures.
- **Contact constraints:** max end-effector force/torque, max impulse, compliance settings, allowable contact surfaces only.
- **Metrology constraints:** if ±0.5 mm placement is required, specify minimum sensor health and observability metrics; if not met, the action is disallowed.
- **Tooling constraints:** electron beam weld only if:
  - alignment error < X,
  - clamp verified,
  - peer robot confirms geometry,
  - plume/charging model within bounds,
  - no neighbor within exclusion cone,
  - power system margin > Y.
- **Multi-robot constraints:** separation minima, right-of-way rules, shared load handling stability margins, max coupled load inertia per robot class.
- **Degradation constraints:** as actuators/sensors degrade, tighten envelope automatically (slower, larger standoff, disallow welding, etc.).

### How to enforce
- Runtime monitors + control limiters (e.g., barrier functions).
- Verified state machine for mode transitions (Autonomous / Cautious / Tool-Safe / Safe-Hold / Drift-Safe).
- “Permission tokens” for hazardous actions, issued only when monitors pass.

---

## 5) Evidence package: hybrid of formal methods + simulation at scale + on-orbit operational data
No single standard (DO-178C, ISO 26262, etc.) fits. Take their strongest pieces and adapt.

### A) Formal verification where it matters
Use formal methods for:
- safety kernel logic,
- mode transition automata,
- constraint enforcement correctness,
- “no hazardous action without preconditions” proofs.

This is tractable because the safety kernel is small.

### B) Scenario-based simulation for the autonomy stack (statistical assurance)
For the mission autonomy (planner, perception, multi-agent coordination), rely on:
- massive Monte Carlo + adversarial scenario generation,
- fault injection (sensors drift, actuator backlash, comm dropouts, time sync errors),
- contact dynamics uncertainty,
- multi-robot emergent behavior stress tests.

**Key: define acceptance in terms of envelope violations and mission loss events**, not “planner correctness.”

Set explicit confidence targets. Example (illustrative):
- Probability of envelope violation per robot-hour < 1e-7 (or whatever your top-level loss budget demands), supported by:
  - simulation + analytic bounds,
  - plus on-orbit incremental expansion (see Section 7).

### C) Hardware-in-the-loop (HIL) and “contact test rigs”
Because you’re doing ±0.5 mm with 500 kg payloads and welding:
- require HIL for force-torque loops,
- representative joints/gearboxes,
- thermal/vacuum where relevant,
- metrology chain calibration verification.

---

## 6) Multi-robot certification: certify the *protocol + local rules*, not the entire swarm
Emergent behaviors are real. The way out is to constrain interaction.

### Certify:
- the coordination protocol (message types, timing, failover),
- collision avoidance rules,
- shared-load handling contract (who controls what, impedance settings),
- and “swarm safety invariants” (e.g., separation, no uncommanded approach, no conflicting claims on a worksite volume).

Then require that each robot’s safety kernel enforces these invariants regardless of what peers do.

This scales to thousands because you’re not recertifying every swarm size; you’re certifying **local interaction rules** that compose.

---

## 7) Graduated autonomy with explicit transition criteria (and how to use LEO demo)
You need a staged certification path that matches the roadmap.

### Proposed autonomy modes (certifiable)
1) **Safe-Hold:** freeze, tool safe, maintain attitude/clearance.
2) **Cautious Ops:** reduced speed/force, larger standoff, no high-energy tools.
3) **Nominal Ops:** full envelope for routine assembly.
4) **Hazardous Tool Ops:** welding/cutting enabled under strict local gating.
5) **Envelope Update Mode:** only when Earth-authorized package is installed.

### Transition criteria (measurable)
- sensor health metrics (SNR, drift estimates),
- state estimator covariance bounds,
- actuator health (temperature, backlash, current draw),
- comm/network health (for peer witness requirements),
- environmental conditions (charging, thermal).

### LEO demo strategy
Use LEO to validate:
- runtime assurance effectiveness,
- multi-robot protocols,
- repair-by-peer workflows,
- and confidence growth models.

Then in heliocentric pilot operations, start with conservative envelopes and expand only after accumulating flight evidence.

---

## 8) Serviceability and recertification: treat repairs as “configuration changes” with onboard conformity checks
Peer repair is unavoidable. Certification must define:
- what repairs are “like-for-like” (no recert needed),
- what repairs change safety-critical behavior (requires re-qualification).

### Recommendation
- Every safety-critical module has:
  - cryptographic identity,
  - calibration data,
  - self-test suite,
  - and a “conformity certificate” signed by the robot’s safety kernel after post-repair tests.

If a repaired robot cannot pass the required post-repair tests, it is automatically restricted to Cautious Ops or Safe-Hold.

This keeps operations moving without pretending you can do Earth-style recertification.

---

## 9) Regulatory engagement: aim for a “Mission Assurance Case” accepted by agencies, not a single prescriptive standard
The right artifact to bring NASA/ESA/commercial regulators is a structured **Assurance Case** (Goal Structuring Notation style), showing:
- hazards,
- mitigations,
- evidence,
- residual risk,
- and operational constraints.

Reference:
- NASA software assurance practices (but adapted),
- DO-178C concepts (independence, traceability) for the safety kernel,
- ISO 26262-like hazard analysis (HARA) for operational scenarios,
- and DNV-style assurance cases for unmanned systems.

The pitch: “We are certifying an enforceable safety envelope plus a validated operational process,” which is closer to how autonomy is being accepted in other domains than trying to certify a monolithic AI.

---

## Bottom line recommendations (what I’d lock into the spec now)
1) **Mandate a high-integrity runtime assurance safety kernel** that can override mission autonomy; certify *that* to the highest rigor.
2) **Define DASS behavioral envelopes** per robot class + tool, with explicit keep-out/contact/tool constraints.
3) **Replace human approval gates with local machine gating + Earth-approved envelope updates.**
4) **Certify multi-robot safety via composable local invariants and protocol assurance**, not swarm-level behavior prediction.
5) **Adopt an assurance-case certification package** combining formal proofs (kernel) + statistical simulation (autonomy) + incremental on-orbit envelope expansion.
6) **Treat repairs as configuration changes** with onboard conformity tests and automatic mode restriction on failure.

If Project Dyson adopts this in Years 1–2, you can credibly authorize Level 4+ autonomous assembly in Years 4–6 without either (a) paralyzing operations with impossible human gates or (b) accepting unbounded autonomy risk.