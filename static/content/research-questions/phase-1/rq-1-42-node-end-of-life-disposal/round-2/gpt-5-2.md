---
questionId: "rq-1-42"
questionSlug: "node-end-of-life-disposal"
modelId: "gpt-5-2"
modelName: "GPT-5.2"
roundNumber: 2
generated: "2026-02-07"
type: "discussion-response"
---

### Recommendation (Round 2): **Design “failure” to be a disposal mode** — SRP-biased drift + minimal propulsive assist + mandatory passivation + persistent trackability

For Phase 1 (1k–10k nodes, 0.5–1.0 AU, 1–3%/yr failures), “accept debris persistence” is not compatible with the <10⁻⁶ per node-year collision-avoidance requirement. In heliocentric space, dead objects are forever; the only scalable answer is to **make dead nodes predictably leave the operational phase space** without needing high-confidence propulsion at end-of-life.

The most robust architecture is a **tiered disposal hierarchy** centered on **SRP (solar radiation pressure) drift-bias** as the default, with a **small reserved ΔV** as an enhancer (not a prerequisite), plus **passivation** and **trackability** requirements that support the beacon/relay ephemeris catalog.

---

## 1) Core concept: “Operational annulus” vs “disposal manifolds” (not a single graveyard orbit)

A fixed “graveyard band at ±0.02 AU” sounds clean, but it’s brittle: long-term perturbations, SRP on large sails, and imperfect injection will smear objects back through the operational zone over decades.

Instead, define:

- **Operational set**: the controlled swarm region (your annulus + allowable eccentricity/inclination envelopes + phasing rules).
- **Disposal manifolds**: **attitude/SRP configurations that cause a monotonic divergence** in semi-major axis *and/or* mean motion relative to operational nodes, so conjunction probability decays with time.

This matches the propulsion divergence in the consensus spec: it works for sail-trim-only nodes and still benefits ion-capable nodes.

---

## 2) Tiered disposal protocol (what every node must implement)

### Tier A (best): **Commanded/Autonomous SRP drift + small ΔV “kick”**
**Trigger:** predicted loss of control/comm within ~48–72 hours *or* hard faults in propulsion/ADCS redundancy.

**Action:**
1. **Reconfigure sail to a predefined “disposal attitude”** that produces a known sign of da/dt (e.g., inward spiral or outward spiral depending on where the operational annulus sits).
2. If any propulsion remains, apply a **single deterministic ΔV kick** to push the node across a separation boundary quickly (details below). This is a reliability play: one burn is easier than long station-keeping.

**Why:** You don’t need 0.05 AU transfers. You need to **exit the high-density phase space** and ensure you don’t re-cross it.

### Tier B (likely for partial failures): **Fail-safe drift on loss of attitude control**
**Design requirement:** the “dead” physical configuration must *not* be dynamically similar to the operational one.

Examples:
- A sail that **defaults to a high-area-to-mass “sun-pointing” or “feathered” state** via springs/shape-memory actuators when power is lost.
- A passive aerodynamic/photonic “weathervane” bias so uncontrolled tumbling still yields a net SRP effect with predictable sign (even if noisy).

This is the key scalability insight: **don’t require a functioning computer to dispose.**

### Tier C (worst): **Passivation + trackability**
If the node can’t guarantee drift (e.g., sail jammed), it must at least:
- **Passivate**: battery to safe SoC, isolate cells, vent/lock propellant, safe pyros, disable high-voltage.
- **Enter “beacon-only” mode** if possible (see catalog section), or deploy a passive radar/optical enhancer.

---

## 3) What “separation” should mean: use mean-motion divergence, not radial distance alone

Radial band offsets like ±0.02 AU are a useful shorthand, but conjunction risk is driven by **relative geometry and repeated crossings**.

A better governance rule for the ephemeris/slot allocator:

- Define a **minimum mean-motion (Δn) separation** between operational nodes and disposed nodes such that the **synodic period** is short enough that disposed nodes quickly phase away and stop repeatedly encountering the same cluster.
- Combine with a **minimum MOID-like envelope** (minimum orbit intersection distance) to ensure disposed trajectories don’t geometrically cut the annulus.

Practically, this means disposal should aim for:
- **Different semi-major axis** (changes period), and ideally
- **Different eccentricity vector** (so any crossing is brief and non-repeating), and optionally
- A small inclination change if cheap (often not for sail-only).

---

## 4) ΔV reality check: don’t size disposal around “moving 0.05 AU”

Moving 0.05 AU in semi-major axis at ~1 AU is energetically large if done impulsively; it will exceed what many architectures can spare, and certainly what degraded nodes can guarantee.

Instead, size the propulsive component for:
- **A modest, reliable “divergence kick”** (order: meters per second, not tens to hundreds) that ensures the SRP-biased drift starts outside the operational control deadband and reduces near-term conjunction screening load.

This aligns with the consensus propulsion spread:
- Sail-trim-only nodes (0.5–5 m/s/yr) can’t afford big transfers but can afford **one small burn** if they have any micro-prop.
- Hybrid nodes (up to ~62 m/s/yr) can do more, but we should not *require* it.

---

## 5) Failure prediction & autonomy requirements (what to standardize)

To make this work within the 7–30 day independent window, standardize a minimal **EOL predictor** that is intentionally simple and testable:

- **Tripwires (hard triggers):**
  - Repeated watchdog resets / memory ECC escalation
  - Power margin collapse (battery internal resistance rise, bus undervoltage events)
  - Attitude control saturation (reaction wheel current spikes, persistent pointing error)
  - Propulsion valve/PPU anomalies (for ion systems)
- **Trend triggers (soft):**
  - 48–72 hr forecast of inability to maintain comm/attitude/power

Then mandate an **EOL state machine** in flight software that:
1. Attempts Tier A if propulsion/ADCS healthy.
2. If ADCS marginal, prioritizes sail reconfiguration (Tier B).
3. If neither, passivates and enables tracking aids (Tier C).

Keep it deterministic; avoid ML-heavy predictors for Phase 1.

---

## 6) Passivation protocol (minimum viable, enforceable)

Given modest onboard power (1.2–45 W), the main fragmentation driver is **battery thermal runaway** and any stored pressurant/propellant.

Minimum spec:
- **Battery**: discharge to a defined safe SoC (e.g., 20–30%), open pack contactors, disable charging, thermal safing.
- **Propulsion**:
  - Cold-gas: vent to vacuum or latch valves closed in a non-rupture state (program-dependent).
  - Ion: de-energize HV, isolate capacitors, safe PPU.
- **Sail mechanisms**: move to mechanically stable “disposed” configuration; no continuous actuation.
- **RF**: switch to low-duty-cycle beacon (below), or passive reflector deployed.

---

## 7) Catalog maintenance: require *post-failure observability* by design

The beacon/relay ephemeris catalog is only as good as its ability to observe disposed objects.

I recommend a **two-layer trackability requirement**:

1. **Passive optical signature**: a mandated minimum visual magnitude behavior (e.g., reflective patch / corner-like optical retroreflector) so ground/space telescopes can reacquire.
2. **Ultra-low-power beacon** (if any power remains): a watchdog-independent transmitter that pings an ID + coarse ephemeris/health at very low duty cycle.

Crucially: the beacon should be powered from a **separate “last gasp” energy reserve** (small primary cell or dedicated capacitor) so it survives main-bus faults long enough to hand off an updated state vector.

---

## 8) What to simulate (research directions, tightened)

1. **SRP disposal manifold study** (highest priority): for the baseline sail area (~50 m² cited), simulate uncontrolled vs “disposed attitude” SRP over 100 years across 0.5–1.0 AU, including realistic attitude noise/tumbling. Output: probability of re-entry into operational envelopes.
2. **Minimum ΔV kick sizing**: find the smallest single-burn ΔV that reduces 1-year conjunction screening load by >X% (pick X=90% as a starting target) when combined with SRP drift.
3. **Density-driven collision risk model**: treat the operational annulus as a managed “traffic volume.” Quantify how quickly risk grows if dead nodes remain in that volume vs exit on SRP drift.
4. **Trackability decay model**: how long can passive-only objects be kept in the catalog with acceptable covariance growth, and what beacon duty cycle/RCS is needed to maintain conjunction screening at <10⁻⁶/node-year?

---

## Bottom line specification proposal (opinionated)

- **Mandate SRP-biased fail-safe drift as the primary disposal mechanism** (works even when “dead”).
- **Require a small, reserved, single-burn ΔV capability when propulsion exists**, but do not make disposal depend on sustained thrust.
- **Make passivation and post-failure observability hard requirements**, not “nice-to-haves.”
- **Define disposal success in phase-space terms (Δn/MOID/envelope exit)** rather than “park it at ±0.02 AU.”

This approach is technically feasible across the propulsion architectures in the consensus document, minimizes per-node cost/complexity, and directly attacks the real scaling problem: keeping failed nodes from remaining co-orbital with the active swarm for decades.