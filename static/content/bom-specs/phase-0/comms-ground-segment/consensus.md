---
bomId: "bom-0-9"
itemName: "Communications and Ground Segment"
itemSlug: "comms-ground-segment"
type: "consensus"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-9 Communications and Ground Segment: Consensus Synthesis (Phase 0A + gated 0B)

## Key Specifications

All three models agree on the following points.

- **No owned 35 m network.** None of the models supports the round-2 "3 × 35 m" build. Gemini explicitly rejects its own round-2 $0.6B figure.
  - Ground service is commercial-first and leased or contracted.
  - It covers three longitude regions about 120° apart (Americas, Europe/Africa, Asia-Pacific).
  - It uses at least two providers. Claude requires ≥2 providers per band by 0B; GPT requires a Provider A/B structure with an audit for shared infrastructure.

- **DSN and ESTRACK are paid, limited-use cross-support.** They are never assumed free or assured. Their role is radiometric navigation (ΔDOR) and emergency commanding.
  - Gemini: under 5% of time.
  - Claude: 20–60 ΔDOR sessions per year, plus 500–1,500 h/yr of 34 m-class time in 0B.
  - GPT: purchased "when available and eligible", with no industrial priority presumed.

- **Bands.** Deep-space Category B allocations apply.
  - X-band TT&C: 7,145–7,190 MHz up and 8,400–8,450 MHz down, on every independently flying vehicle.
  - Ka-band downlink: 31.8–32.3 GHz for higher-rate data. GPT treats Ka as an optional site-only upgrade.

- **Direct-to-Earth survival link on every tug.** No tug may depend on the site or a relay for safe-mode communications. All three keep X-band direct to Earth, with low-gain antennas (LGAs) for safe-mode acquisition.

- **Fleet served.**
  - 0A: 4–10 scouts plus the pathfinder.
  - 0B: 10–18 MW-class tugs, one NEA industrial site, and the SEL1 receiving-node interface.
  - All operations are uncrewed. No link carries crew-safety traffic or continuous Earth teleoperation. One-way light time is about 16.6 min at the 2 AU design point.

- **Authenticated command is a safety function.** The required elements are:
  - authenticated encryption (AES-256-GCM, via CCSDS SDLS where the equipment supports it);
  - anti-replay counters;
  - ground signing keys held in HSMs;
  - per-asset identities;
  - signed flight-software loads.

  No single operator or terminal may release a propulsive or trajectory-changing command. Claude specifies two-of-three signers. Gemini specifies multi-signature with "no single terminal". GPT specifies dual authorisation enforced onboard where appropriate.

- **Protocols.** All three use CCSDS framing, coding and file delivery (CFDP) and Space Link Extension (SLE) station interfaces, giving provider-neutral cross-support. Store-and-forward operation is mandatory. DTN is mandatory for Claude and Gemini but only conditional for GPT.

- **Autonomy carries operations, not the link.** On loss of signal, local systems safe the hazardous processes: robot motion, tether protection, power switching and molten-metal containment. Ground supervises at goal level and does not close control loops.

- **Cost posture.** All three reject the ~$0.6B round-2 figure as a baseline.
  - The three total envelopes overlap at about $0.25–0.32B.
  - Claude and GPT independently size 0B ground service at 8,000–14,000 antenna-hours per year, at effective rates of about $1,000–2,500/h.

## Divergent Views

- **Relay satellites and optical communications.**
  - Claude recommends no relays in the baseline. Its alternative is to make conjunction tolerance a target-gate criterion and reopen the relay trade (~$200–400M) at KDP-0B only if the chosen target fails. Optical is limited to a reserved growth slot of about 50 kg and 300 W on the site terminal.
  - Gemini proposes two 500 kg, 2 kW relays at SEL1 with 2.5 m Ka reflectors and a 1,550 nm, 1 Gbps optical demonstrator, costed at $60–120M in 0B.
  - GPT recommends no relays unless a specific coverage deficit is shown, and no optical dependency in Phase 0.

- **Site trunk sizing and data volume.**
  - Claude puts the margin in space: two 3 m terminals with 250 W Ka and 1.5 kW DC draw, giving about 1.7 Mbps at 2 AU into an 18 m-class station. That supports 15–40 GB/day in 0B and 2–10 GB/day in 0A.
  - Gemini assumes 10–50 Mbps from the NEA to SEL1 and 50–250 Mbps from SEL1 to Earth.
  - GPT baselines X-band only: a 1.5–2 m dish at 40–100 W, giving about 32–64 kbps at 2 AU into 34 m-class G/T. That supports 50–200 MB/day, with Ka added only if it is cheaper per bit than more contact time.
  - Claude's and GPT's estimates differ by roughly a factor of 100.

- **Ground aperture class.**
  - Claude specifies three bands × 2 antennas of 18 m class, with G/T ≥53 dB/K at Ka and ≥45 dB/K at X, plus 34 m cross-support for emergency LGA commanding.
  - Gemini prefers commercial 18–32 m antennas at three nodes.
  - GPT suggests procuring by G/T, uplink EIRP (2–20 kW) and availability rather than by diameter. GPT's rate tables assume 34–35 m-class performance and warn that smaller dishes are not a like-for-like substitute.

- **Cost envelope and pricing basis.**

  | Model | 0A | 0B | Total | Basis |
  |---|---|---|---|---|
  | Claude | $80–250M | $170–570M | $0.25–0.81B (central ~$0.47B) | 0B: 2 yr pre-ops + 7 yr ops |
  | Gemini | $45–75M | $135–245M | $0.18–0.32B | Includes relays |
  | GPT | $55–125M | $110–285M | $0.165–0.41B (~$0.29B planning case) | 0B: 5 operating years |

- **Scope boundaries, which risk double counting.**
  - Claude puts scout and tug transponders in the host BOMs, but keeps the site trunk terminals, crypto/OTAR/OTSE and EP-plume RF NRE in bom-0-9. bom-0-11 must then exclude that NRE.
  - Gemini carries fleet-wide transceivers in bom-0-9 ($10–15M in 0A, $25–40M in 0B) along with crypto NRE.
  - GPT costs all flight communications terminals in bom-0-9, carried as allocated mass and power on the hosts. It places comms development and qualification in bom-0-11.

- **Outage and conjunction tolerance.**
  - Claude requires the site to operate for ≥30 days and tugs for ≥45 days without contact, with no trajectory-critical events within ±10 days of a Sun–Earth–probe (SEP) angle below 5°. It adds a target criterion that continuous time at SEP < 3° must not exceed 45 days.
  - Gemini enters safe standby after more than 48 h of loss of signal.
  - GPT requires 72 h of normal unattended operation and 30 days of survival, which need not mean production. It uses a 14–30 day conjunction placeholder.

## Open Questions

1. **Target spin state and sky access.** Can two surface terminals about 180° apart give at least 85–95% Earth visibility on the selected NEA? On a fast rotator (period around 2 h), a 0.22° Ka beam needs slew rates of at least 5°/min. Would that, or an adverse spin axis, force a hovering or orbiting trunk node? This cannot be resolved until bom-0-1 has characterised the target.

2. **Conjunction and unsupervised plant duration.** Should the limit be 45 days (Claude) or a 14–30 day placeholder (GPT)? The answer depends on how long bom-0-3 can safely run, or stand down and restart, without ground contact. It decides whether a relay trade ever reopens.

3. **Real data demand.**
   - What traffic does Fe-Ni product-quality certification for Phase 1 acceptance actually require (GPT)?
   - How much survey science belongs to bom-0-1?
   - Is the true figure about 0.1, 1 or 10 GB/day? Only pathfinder measurement can settle the X-versus-Ka and aperture questions.

4. **Commercial deep-space market.**
   - Will firm 7–9 year take-or-pay quotes for 18 m-class Ka deep-space hours land near $1–2.5k/h?
   - Can commercial ΔDOR reach the accuracy needed for SEL1 approaches with 150–300 t loads, or is DSN/ESTRACK a permanent dependency?

5. **Industrial RF environment.** Several effects are at TRL 3–4 today and need integrated testing:
   - RF noise and propagation through MW-class iodine or argon EP plumes;
   - iodine condensation on feeds;
   - partial-discharge EMI from 1–3 kV tethers;
   - conductive Fe-Ni dust on reflectors (Ka needs ≤0.25 mm RMS surface accuracy).

6. **Spectrum and regulation.**
   - Which national administration sponsors the ITU filings for a non-profit? Lead time is 2–7 years.
   - How do the onboard keep-out regions and waiver audit trail satisfy the licence gate?

## Recommended Approach

1. **Baseline direct-to-Earth service over leased commercial ground access, with no relays and no owned stations.**
   - Contract three longitude bands with at least two providers, specified by performance: G/T ≥53 dB/K at Ka and ≥45 dB/K at X at 20° elevation, X uplink ≥2 kW, ≥98% pass success, and SLE interfaces.
   - Hold a standing paid 34 m-class cross-support agreement (DSN and/or ESTRACK) for ΔDOR and 20 kW LGA emergency commanding.
   - Delete Gemini's SEL1 relays from the baseline. SEL1 sits about 0.01 AU from Earth, so a relay there gives essentially no conjunction relief and no path-loss benefit from 2 AU. A 2.5 m relay dish (G/T about 30 dB/K at Ka) would also close the NEA link at only about tens of kbps, not 10–50 Mbps.
   - Reopen the relay trade at KDP-0B only if the selected target fails the conjunction criterion.

2. **Exploit site power for link margin, but fix the size only after the pathfinder.**
   - Fit X-band TT&C, two LGAs, an ultra-stable oscillator and regenerative ranging on every vehicle.
   - Fit the NEA site with two independently powered trunk terminals carrying an X/Ka downlink. Use Claude's 3 m / 250 W Ka unit (about 1.7 Mbps at 2 AU into 18 m) as the upper design envelope and GPT's 1.5–2 m X chain as the floor.
   - Fly the prototype on the pathfinder (bom-0-12) to reach TRL 6 before KDP-0B.
   - Recommend Ka downlink on scouts whenever encounter data needs exceed the roughly 2–4 kbps that X-band delivers at 1.5 AU.

3. **Plan to 0.5–10 GB/day in 0B, not 2.5 TB/day.**
   - Both GPT's 50–200 MB/day and Claude's 15–40 GB/day are bracketing hypotheses.
   - Contract a base of about 8,000 h/yr, with options up to 14,000 h/yr, and a ≥30% capacity margin at KDP-0B (GPT).
   - Size the final quota from measured pathfinder traffic and enforce priority classes, so that bulk data can never block commands.

4. **Treat command security as a licence-critical safety system.**
   - Adopt SDLS AES-256-GCM, BPSec, and signed command sequences.
   - Require two-of-three role-separated authorisation for trajectory-critical commands.
   - Implement Claude's Onboard Trajectory Safety Envelope in tug software (bom-0-4). It rejects any plan whose propagated trajectory enters a keep-out region unless a separately keyed, time-limited waiver is present.
   - Use dual geographically separated KMF/HSM sites, 90-day OTAR, and a tested sealed recovery key, so key loss cannot brick an asset and never opens an unauthenticated path.
   - The crypto scheme and the safety envelope are project-ending items under D-02 and must reach TRL 6 with no waivers at KDP-0B.

5. **Make communications a target-gate input and levy autonomy requirements.**
   - Site: ≥30 days of survival without contact, with production optional. Tugs: ≥45 days without contact. Normal unattended operation: ≥72 h.
   - Store-and-forward: ≥7 days of routine data and ≥30 days of housekeeping.
   - Use a deterministic link-loss ladder of 24 h, 72 h, 7 days and 14 days.
   - Send the conjunction criterion to bom-0-1 and the target gate: continuous time at SEP < 3° ≤45 days, and Earth range ≤2.0 AU for ≥80% of the operating window.

6. **Fix the scope boundaries to avoid double counting.**
   - bom-0-9 carries:
     - ground services;
     - KMF/SOC/WAN;
     - site trunk terminals (flight spare in bom-0-14);
     - the common crypto module;
     - the Fleet Comms ICD;
     - spectrum;
     - comms-specific NRE (crypto, OTAR, safety-envelope specification, EP-plume RF probes).
   - bom-0-11 explicitly excludes that NRE.
   - Scout and tug transponders are costed in the host BOMs, with bom-0-9 setting the ICD and running one fleet qualification buy.

7. **Carry the cost at 0A $60–170M (central about $105M) and gated 0B $130–440M (central about $260M, over 7 operating years). The total is $0.19–0.61B, central about $0.37B, excluding bom-0-17 reserve.**
   - The basis is 1,500–4,000 h/yr in 0A and 8,000–14,000 h/yr in 0B at $1–2.5k/h, plus $5–13M per station for optional Ka upgrades in 0A.
   - Where this differs from round 2:
     - Gemini's ~$0.6B for owned 35 m dishes plus relays is not justified.
     - The round-2 low ends of $0.15B (Claude) and $0.2B (GPT) are reachable only if 0B is never exercised.
     - The round-2 upper ends of about $0.5B are consistent with this central estimate.
   - GPT's stress case shows the main risk: 70,000 h at $2.5k/h makes 0B service alone $175M. Obtain indicative multi-year bids during 0A and re-baseline at KDP-0B.