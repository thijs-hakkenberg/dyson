---
bomId: "bom-0-9"
itemName: "Communications and Ground Segment"
itemSlug: "comms-ground-segment"
modelId: "claude-opus-5-5"
modelName: "Claude Opus 5.5"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-9 Communications and Ground Segment: Technical Proposal

**Phase 0 (0A + gated 0B), revised architecture after the 2026 re-assessment.**

---

## 0. Position Summary

I take four positions in this proposal.

1. **Put the aperture in space, not on the ground.** The NEA site and the cargo tugs have MW-class power. A 250 W RF Ka-band amplifier is a rounding error on a 1–2.5 MWe tug. Giving these assets large antennas and high RF power closes the 2 AU links into 18 m-class ground antennas. That removes the case for building new 35 m dishes and reduces dependence on the oversubscribed DSN.
2. **Buy in 0A. Decide make or buy at KDP-0B.** In 0A the fleet is small: 4–10 scouts plus the pathfinder. Buy services and spend about $15–40M to put Ka-band deep-space receive capability on 2–3 commercial antennas. That de-risks 0B supply. In 0B, the baseline is an anchor-tenant lease: a long-term take-or-pay contract under which a commercial operator builds and operates antennas to our requirements. Owned antennas remain the alternative.
3. **No relay satellites in the baseline.** Conjunction tolerance becomes a target-selection criterion handled through bom-0-1 and the target gate. The relay trade reopens at KDP-0B only if the selected target fails that criterion.
4. **Command security is a safety system, not an IT feature.** A tug pushing 150–300 t toward the Earth–Moon neighbourhood is a hazard if hijacked. Trajectory-changing commands need multi-party authorisation and an onboard safety envelope that no single key can override.

**Bottom line.**

| | Range | Central |
|---|---|---|
| 0A (≈2027–2033) | $80–240M | ≈$140M |
| 0B (gated; 2 yr pre-ops + 7 yr ops) | $170–570M | ≈$330M |
| **Total** | **$0.25–0.81B** | **≈$0.47B** |

Confidence is low-to-medium. This is above the Claude and GPT round-2 low ends and below Gemini's $0.6B, for reasons given in §13. Programme reserve is excluded; it sits in bom-0-17.

**Data demand.** I estimate 2–10 GB/day in 0A and 15–40 GB/day in 0B (1.4–3.7 Mbps averaged over a day). This is roughly 60–150× below the rejected round-1 figure of 2.5 TB/day.

---

## 1. Scope and Boundaries

### 1.1 In scope (bom-0-9)

| Element | 0A | 0B |
|---|---|---|
| Ground apertures: contracted services, cross-support, anchor-tenant leases or owned | ✔ | ✔ |
| Commercial-station Ka deep-space upgrade co-investment | ✔ | — |
| Ground WAN from stations to the MOC gateway, including the DTN gateway | ✔ | ✔ |
| Key Management Facility (KMF), HSMs, fleet PKI, command-authentication architecture | ✔ | ✔ |
| Security Operations (ground-segment SOC) | ✔ (light) | ✔ |
| Radiometric tracking data products (Doppler, ranging, ΔDOR) delivered to flight dynamics | ✔ | ✔ |
| Spectrum management, ITU/national filings, frequency coordination | ✔ | ✔ |
| **Fleet Communications ICD and standards** (one document, all assets) | ✔ | ✔ |
| Comms-specific NRE: SDLS/OTAR flight crypto, DTN stack, transponder qualification for the EP/HV environment, site trunk terminal design | ✔ | sustaining |
| **NEA Site Trunk Terminals** (2 flight units + 1 qualification unit). These are shared site infrastructure, so they are carried here. | prototype on pathfinder (budget in bom-0-12) | ✔ |
| Comms engineering staff (design and sustaining) | ✔ | ✔ |

### 1.2 Out of scope (carried elsewhere; this item supplies the requirement and ICD)

| Item | Owner | bom-0-9 provides |
|---|---|---|
| Scout transponders and HGAs | bom-0-1 | ICD, recommendation of Ka on scouts (§5.4), crypto module design |
| Robot and plant local network (site LAN, proximity links) | bom-0-2 / 0-3 | Security layer (fleet PKI) and gateway interface to the trunk |
| Tug comms payload | bom-0-4 | Terminal class spec (Class T), crypto, safety-envelope command rules |
| Site power and cabling, including the fibre/power run to the trunk terminals | bom-0-5 | Load (≤1.5 kW each) and data interface |
| Launch and delivery of trunk terminals (≈0.6–0.8 t total) | bom-0-8 | Mass and volume |
| MOC, flight dynamics, operations staff, data archive | bom-0-10 | Delivers frames and bundles at the MOC gateway |
| General NRE and test facilities | bom-0-11 | **bom-0-11 must exclude comms NRE listed in §1.1 to avoid double count** |
| Pathfinder bus | bom-0-12 | Trunk-terminal prototype as payload (hardware cost in bom-0-12, design in bom-0-9) |
| SEL1 receiving-node radios | bom-0-13 | Near-Earth band ICD |
| Flight spares (spare trunk terminal) | bom-0-14 | Spares list |
| Debris and disposal compliance | bom-0-15 | Assured-command path, tracking data |

---

## 2. Design Philosophy

1. **Autonomy first; comms supervises, it does not drive.** One-way light time reaches 16.6 min at 2 AU, so the round trip is about 33 min. Earth never teleoperates robots. Ground sends goal-level instructions, reviews exception reports, uploads software, and holds safety authority.
2. **Downlink summaries and exceptions, not raw streams.** Onboard data reduction means routine downlink is housekeeping plus event-triggered imagery. Bulk raw data is retained on site and pulled on demand.
3. **Power-rich nodes carry the link margin.** Site and tugs get large high-power antennas. Power-poor nodes (scouts) get Ka-band and 34 m-class support when needed.
4. **One network, many providers.** A single service interface (CCSDS Space Link Extension, SLE, and CSTS) means any compliant antenna can be swapped in. No provider lock-in, and at least two independent providers at each longitude band by 0B.
5. **Standards only.** Use CCSDS protocols: USLP/AOS/TC, LDPC, SDLS, BPv7/LTP, CFDP, PN ranging, Proximity-1. No bespoke protocols, so cross-support with ESA, NASA and others is contractual rather than an engineering project.
6. **Stringency follows reversibility (D-02).** In 0A, buy and learn. Irreversible spend on antennas and long-term leases waits for KDP-0B.

---

## 3. Demand Model

### 3.1 Data volumes

| Source | Phase | Count | Routine/day | Peak campaign/day | Basis |
|---|---|---|---|---|---|
| Rendezvous scouts | 0A (residual 0B) | 4–10 | 20–100 MB each | 1–5 GB each during encounter (imaging, spectra, radar) | Asteroid encounter missions of the Hayabusa2 / OSIRIS-REx class, scaled down |
| 0A pathfinder | 0A | 1 | 0.5–2 GB | 3–5 GB | Process-demo video plus telemetry |
| NEA site (plant + robots + power) | 0B | 1 site | 10–25 GB | 40 GB (anomaly) | ~10⁴–10⁵ telemetry points at 1–10 s cadence ≈ 1–3 GB; event imagery 5–15 GB; process logs 2–5 GB |
| Tugs | 0B | 10–18 | 50–300 MB each | 2 GB (docking/arrival) | Housekeeping plus EP health and navigation imaging |
| SEL1 node | 0B | 1 | 1–2 GB | 5 GB | Near-Earth; easy |
| **Total** | **0A** | | **2–10 GB/day** | | |
| **Total** | **0B** | | **15–40 GB/day** | ~60 GB/day | 1.4–3.7 Mbps averaged over 24 h |

The rejected round-1 rate of 2.5 TB/day (≈230 Mbps continuous) would require optical terminals or multiple arrayed 34 m Ka antennas, plus raw-video operations. Nothing in an autonomous supervisory concept needs it.

### 3.2 Contact hours (0B steady state)

| User | Contact concept | h/yr |
|---|---|---|
| Site trunk | 12–16 h/day across three longitudes | 4,400–5,800 |
| Tugs in cruise (6–12 at once) | 2 × 1 h/week tracking passes, beacon-tone monitoring otherwise | 600–1,250 |
| Tug critical events (departure, arrival, SEL1 approach; ~30/yr) | Continuous coverage for 24–72 h | 700–2,200 |
| SEL1 node | 2–4 h/day near-Earth | 700–1,500 |
| Scouts, ΔDOR, navigation campaigns | 34 m-class | 500–1,500 |
| Anomaly reserve | | 800–2,000 |
| **Total** | | **≈8,000–14,000** |

**Multiple Spacecraft Per Aperture (MSPA).** An 18 m Ka beam is ≈0.036° wide, which is about 95,000 km at 1 AU. Tugs loading at the site share the site's beam, so multi-channel receivers reduce billable hours by 10–25%.

---

## 4. System Architecture

### 4.1 Top-level

```
                         DEEP SPACE (0.3–2.0 AU design; 2.6 AU degraded)
   ┌────────────────────────── NEA SITE ──────────────────────────────┐
   │  Robots (bom-0-2) ──┐   site LAN (fleet PKI)    Plant (bom-0-3)   │
   │      HV tether +    ├──── Site Gateway / DTN node ──┤             │
   │      local RF       │        (autonomy executive)   │             │
   │                     │                               │             │
   │        ┌────────────┴───────┐        ┌──────────────┴──────┐      │
   │        │ TRUNK TERMINAL A   │ fibre  │ TRUNK TERMINAL B    │      │
   │        │ 3 m X/Ka, 250 W Ka │◄──────►│ (opposite hemisphere)│     │
   │        └─────────┬──────────┘        └──────────┬──────────┘      │
   └──────────────────┼──────────────────────────────┼─────────────────┘
                      │ Ka 31.8–32.3 GHz down / X 7.145–7.19 GHz up
       TUGS (Class T, 1.5 m Ka, 150 W)  ◄─ MSPA when co-located at site
       SCOUTS (Class S, 0.8 m X/Ka)          │
                      │                      │       SEL1 NODE (bom-0-13)
                      ▼                      ▼       near-Earth S/X/Ka bands
 ════════════════════════ GROUND SEGMENT (bom-0-9) ═══════════════════════════
   LONG. BAND 1          LONG. BAND 2           LONG. BAND 3
   (Americas/Pacific)    (Europe/Africa)        (Asia/Australia)
   2 × 18m-class Ka/X    2 × 18m-class Ka/X     2 × 18m-class Ka/X
   (anchor-tenant)       (anchor-tenant)        (anchor-tenant)
        │   + cross-support: DSN 34 m / ESTRACK 35 m (ΔDOR, LGA emergency cmd)
        ▼
   ┌───────────────── TERRESTRIAL WAN (dual-carrier, encrypted) ─────────────┐
   │  SLE/CSTS ── DTN Gateway ── Command Enclave (air-gapped) ── KMF/HSM     │
   │                      │                  │                     │         │
   │                 Security Ops Centre     │              Key ceremonies   │
   └──────────────────────┼──────────────────┼─────────────────────┼─────────┘
                          ▼                  ▼
                    MOC / Flight Dynamics / Archive  (bom-0-10)
```

### 4.2 Site trunk geometry problem and solution

The plant is surface-anchored on a rotating NEA. Rotation periods are typically 2–20 h; small bodies under 200 m may be faster. A single surface antenna loses Earth for a large fraction of each rotation.

```
         Earth direction ───────────────►
                ╭──────────╮
     Terminal B │  NEA     │ Terminal A
       (night)  │ (spin ↻) │  (sees Earth)
                ╰──────────╯
     Visibility: A∪B ≥ 85–95% for spin axis within ±60° of ecliptic normal.
     If spin axis is near the Earth line: 1 terminal near the sub-Earth
     pole suffices; the second becomes a hot spare.
```

- **Baseline:** two gimballed terminals about 180° apart in longitude, linked by fibre through site cabling (bom-0-5). The Site Gateway switches the active terminal autonomously, with about 5 min overlap for handover.
- **Fallback:** a tug loitering in a station-keeping position near the site carries a Proximity-1 crosslink and can act as a temporary relay.

---

## 5. Technical Specifications

### 5.1 Terminal classes (Fleet Comms ICD)

| Class | Host | Bands | HGA | RF power | Mass | DC power | Notes |
|---|---|---|---|---|---|---|---|
| **N** (Site Trunk) | NEA site (bom-0-9) | X up/down, Ka down (Ka up optional) | 3.0 m rigid composite, dual-band feed | Ka 250 W TWTA (2 for redundancy, cold spare); X 25 W SSPA | 250–400 kg each, including 2-axis gimbal, mast, anchor, dust shroud | 0.9–1.5 kW tx, 0.3 kW standby | Also MGA X horn (15 dBi) and 2 × LGA |
| **T** (Tug) | bom-0-4 | X up/down, Ka down | 1.5 m, 2-axis gimbal | Ka 150 W; X 25 W | 60–90 kg | 0.5–0.7 kW | Antenna placed outside the EP plume cone (§11) |
| **S** (Scout) | bom-0-1 | X up/down, **Ka down recommended** | 0.8 m | Ka 30 W or X 15 W | 12–25 kg | 60–150 W | Iris-class or SDST-class transponder |
| **P** (Pathfinder) | bom-0-12 | As Class N, flight prototype | 2–3 m | 100–250 W | 150–300 kg | ≤1 kW | Raises Class N to TRL 6/7 before KDP-0B |
| **E** (SEL1 node) | bom-0-13 | S/X near-Earth, Ka 25.5–27 GHz down | 1–2 m | 20–50 W | 30–60 kg | 0.2–0.4 kW | Category A (<2×10⁶ km) |

Every class carries:
- a common **Crypto/Command Authentication Module (CAM)**;
- an ultra-stable oscillator (one-way Doppler, Allan deviation ≤1×10⁻¹² at 1–1000 s);
- a regenerative PN ranging channel (CCSDS 414.1);
- beacon-tone mode.

### 5.2 Link budgets (design point 2.0 AU = 3.0×10¹¹ m)

Assumptions:
- Reflector efficiency 0.55–0.60.
- Required Eb/N0 = 2.5 dB (LDPC rate 1/2, including implementation loss) + 3 dB margin = **5.5 dB**.
- Ka atmosphere 1.0 dB at 20° elevation, 90% weather; pointing 1 dB total.
- Ground G/T:

| Antenna | Ka 32 GHz | X 8.4 GHz |
|---|---|---|
| 18 m commercial with cryo LNA | 53 dB/K | 45 dB/K |
| 34 m class | 64 dB/K | 54.5 dB/K |

| Link | EIRP (dBW) | FSPL (dB) | Rx G/T or G | C/N0 (dB-Hz) | Data rate |
|---|---|---|---|---|---|
| Site N → 18 m, Ka, 2.0 AU | 80.3 (57.8 dBi + 24.0 − 1.5) | 292.1 | 53 | 67.8 | **1.7 Mbps** (6.8 Mbps at 1 AU) |
| Site N → 2 × 18 m arrayed, Ka, 2.0 AU | 80.3 | 292.1 | 55.7 | 70.5 | 3.2 Mbps |
| Site N → 34 m, Ka, 2.0 AU | 80.3 | 292.1 | 64 | 78.8 | 21 Mbps |
| Site N → 18 m, X (engineering backup), 2.0 AU | 58.4 | 280.5 | 45 | 50.3 | 30 kbps |
| 18 m 2 kW X uplink → site HGA, 2.0 AU | 92.4 | 279.1 | G 44.5 dBi, T 400 K | 59.4 | 245 kbps (software uploads) |
| 34 m 20 kW X uplink → site **LGA** (3 dBi), 2.0 AU | 108.5 | 279.1 | | 34 | 7.8–250 bps (emergency) |
| 18 m 2 kW → site LGA | 92.4 | 279.1 | | 18 | **Not closed** |
| Tug T → 18 m, Ka, 1.5 AU | 72.1 | 289.6 | 53 | 62.1 | 460 kbps |
| Scout S (X, 15 W) → 18 m, 1.5 AU | 45.2 | 278.0 | 45 | 39.6 | 2.5 kbps (inadequate for encounter imaging) |
| Scout S (Ka, 30 W) → 18 m, 1.5 AU | 59.8 | 289.6 | 53 | 49.8 | 27 kbps |
| Scout S (Ka, 30 W) → 34 m, 1.5 AU | 59.8 | 289.6 | 64 | 60.8 | 340 kbps |

**Consequences.**
- **COM-010:** The site trunk delivers ≥10 GB/day at 2.0 AU (14 h contact into a single 18 m antenna) and ≥25 GB/day at ≤1.2 AU. This meets §3.1 with graceful degradation.
- **COM-011:** Emergency LGA commanding requires 34 m / 20 kW class. One standing cross-support agreement (DSN or ESTRACK) is mandatory. It is a small number of hours, but it is not optional.
- **COM-012 (to bom-0-1):** Scouts carry Ka downlink. Encounter campaigns use 34 m-class or arrayed apertures for 4–12 weeks each.

### 5.3 Ground aperture requirements (0B anchor-tenant spec)

| Parameter | Requirement |
|---|---|
| Aperture | ≥18 m single, or an array equivalent to G/T ≥53 dB/K Ka (32 GHz) and ≥45 dB/K X, at 20° elevation, 90% weather |
| Geography | 3 longitude bands, about 120° ±25° apart; ≥2 antennas per band (redundancy plus MSPA); dry sites preferred for Ka |
| Bands | Deep space (Category B): X 7145–7190 MHz up / 8400–8450 MHz down; Ka 31.8–32.3 GHz down (34.2–34.7 GHz up optional). Near-Earth S/X/Ka at ≥1 site per band for SEL1. |
| Uplink | X ≥2 kW |
| Radiometrics | Coherent Doppler ≤0.1 mm/s (60 s); PN ranging ≤1 m; H-maser at ≥1 site per band, or GPS-disciplined Rb with ΔDOR purchased separately |
| Interfaces | CCSDS SLE (RAF/RCF/FCLTU), CSTS tracking data; DTN-capable |
| Availability | ≥98% scheduled-pass success (Ka with X fallback) |
| Security | Station command path is pass-through of SDLS-protected frames; station never holds fleet keys |

### 5.4 Ground WAN and gateway

- Dual-carrier links with MPLS or encrypted SD-WAN; ≥100 Mbps per station.
- DTN gateway (BPv7 over LTP for space links; TCP-CL terrestrially) holds custody of bundles during gaps.
- CFDP Class 2 for file transfer.
- Throughput is trivial. Integrity and segregation are what matter.

---

## 6. Authenticated Command and Security Architecture

### 6.1 Layers

```
 Layer 5  Mission authority   Two-person release; multi-party for "Class 0-T"
 Layer 4  Application         Signed command sequences (Ed25519 / ECDSA-P384),
                              onboard validation against safety envelope
 Layer 3  Network (DTN)       BPSec integrity on bundles end-to-end MOC→asset
 Layer 2  Link                CCSDS SDLS: AES-256-GCM authenticated encryption,
                              anti-replay sequence numbers, OTAR rekey
 Layer 1  Physical            Station never holds keys; frames are opaque
 ─────────────────────────────────────────────────────────────────────────
 Site LAN  Fleet PKI certs per robot/plant unit; Site Gateway re-signs
           derived local commands under a site key with bounded authority
```

### 6.2 Command classes

| Class | Examples | Authorisation | Onboard check |
|---|---|---|---|
| **0-S** Safety | Safe-mode, transmitter off, abort | Emergency key set (separate HSM partition); single operator plus supervisor | Always accepted if authenticated |
| **0-T** Trajectory-critical | Tug burn plans, SEL1 approach, Earth-vicinity targeting | **Two of three** authorised signers from separate roles (MOC flight director, independent flight dynamics, safety officer) | **Onboard Trajectory Safety Envelope (OTSE):** rejects any plan whose propagated trajectory enters a keep-out region (e.g. Earth-intercept or a too-close lunar corridor) unless a separately keyed, time-limited waiver is present |
| 1 | Configuration, software loads | Two-person | Signature, version and rollback checks |
| 2 | Goal-level tasking | Single operator | Executive constraint check |
| 3 | Data requests | Automated | — |

The OTSE logic is specified here and implemented in tug flight software (bom-0-4). It is the single most important security requirement in Phase 0, and it supports the **licence gate**. Authorising states will want evidence of continuing supervision (Outer Space Treaty Art. VI) and protection against hijack of large masses.

### 6.3 Key management

- **KMF:** two geographically separated HSM clusters (FIPS 140-3 Level 3+), with documented key ceremonies.
- Each asset is loaded at integration with operational keys, a separate emergency key set, and a **sealed recovery key** usable only via LGA emergency command.
- **OTAR cadence:** operational keys every 90 days or on suspicion of compromise.
- **Key-loss failure mode:** if keys desynchronise, the asset falls back after T_lockout (e.g. 14 days without valid authenticated contact) to accepting the recovery key only. This prevents bricking; it never opens an unauthenticated path.
- Use commercial (non-classified) algorithms. Export-control review covers the international non-profit structure; EAR is the likely regime for commercial crypto, to be confirmed by counsel.

### 6.4 Ground cybersecurity

- Command enclave air-gapped from corporate IT.
- NIST SP 800-53 high-baseline overlay applied to command paths.
- Annual red-team exercises.
- Insider-threat controls: role separation, no single person able to originate a Class 0-T command.
- SOC monitoring of station SLE sessions.

---

## 7. Autonomy and Communications Requirements

These are levied on flight segments; the autonomy design itself sits with bom-0-3, bom-0-4 and bom-0-10.

| ID | Requirement | Rationale |
|---|---|---|
| COM-020 | Site operates **≥30 days** without any ground contact, maintaining production within safe limits | Conjunction and ground outages |
| COM-021 | Tugs in cruise operate **≥45 days** without contact; no trajectory-critical event is scheduled within ±10 days of SEP < 5° | Conjunction |
| COM-022 | Link-loss ladder: 24 h → beacon tone "need contact"; 72 h → switch terminal or antenna; 7 d → comm-search attitude (tug) or terminal-swap test (site); 14 d → recovery-key acceptance window | Deterministic recovery |
| COM-023 | Store-and-forward ≥7 days of routine data on site (≥300 GB) and ≥30 days of housekeeping | Outages and conjunction |
| COM-024 | Time distribution: asset clocks correlated to UTC within ≤1 ms via ranging/time-correlation packets | Sequencing and forensics |
| COM-025 | No Earth-in-the-loop control loop shorter than 1 h | Light time |
| COM-026 | Beacon-tone modes (4–16 MFSK tones) detectable with 18 m antennas at 2 AU | Cheap health monitoring |

### Conjunction

Solar conjunction degrades Ka-band below a Sun–Earth–Probe (SEP) angle of about 3° and X-band below about 2°. Low-Δv NEAs have Earth-like orbits and long synodic periods. Geometry therefore changes slowly, and **some targets can sit within a few degrees of the Sun for months.**

**Recommended target-gate criterion, passed to bom-0-1 and the target gate:**
- maximum continuous SEP < 3° during the planned 0B operating window ≤ 45 days, and
- Earth range ≤ 2.0 AU for ≥80% of the window.

A target that fails reopens the relay trade (§13).

---

## 8. Tracking and Navigation Support

- **Products:** two-way Doppler, PN ranging and ΔDOR, delivered to flight dynamics (bom-0-10).
- **ΔDOR:**
  - Needed for scout approach (0A) and tug arrival at SEL1 (0B).
  - Buy 20–60 sessions/yr from DSN or ESTRACK; commercial ΔDOR is immature.
  - Combine with optical navigation on tugs and scouts.
- **SEL1 approaches** of 150–300 t loads are the highest-consequence navigation events. Each gets continuous two-station coverage for 72 h plus ΔDOR.
- **Debris and licence (bom-0-15):** tracking data feeds conjunction screening, and an assured disposal-command path is maintained for end-of-life tugs.

---

## 9. Spectrum and Regulatory

- **Filing administration.** The non-profit needs a sponsoring national administration. Choose it jointly with the licence-gate state (bom-0-7). ITU advance publication of deep-space and near-Earth assignments should start in **2027**; lead time is 2–7 years.
- **Bandwidth.** Requested bandwidth is small: ≤20 MHz Ka down and ≤1 MHz X up per asset, which helps coordination with existing SFCG users of 8400–8450 MHz and 31.8–32.3 GHz.
- **Ground stations.** Station licences are the provider's responsibility under anchor-tenant contracts, but are a contract deliverable.
- **Budget:** $2–5M per phase for legal, filing and coordination effort.

---

## 10. Manufacturing and Procurement

| Item | Qty (0A / 0B) | Approach | Unit cost basis |
|---|---|---|---|
| Common transponder (Classes S, T, N, P, E) | 6–12 / 16–26 | **Single fleet buy** of a heritage deep-space transponder (Iris-class for scouts, SDST-class or equivalent for N and T) for price leverage and one qualification campaign | $0.6–3M each, budgeted in host BOMs; qualification in bom-0-9 |
| CAM crypto module | 6–12 / 20–30 | FPGA-based (rad-tolerant), single design, built to print | $0.2–0.6M recurring; NRE $5–12M here |
| Site trunk terminal (Class N) | — / 2 flight + 1 qual (spare in bom-0-14) | Built to print from pathfinder prototype; heritage 3 m composite reflector, commercial GEO-derived 250 W Ka TWTA re-tuned to 32 GHz | $8–20M per flight unit |
| Ground 18 m Ka/X antennas | 0 owned / 6 (if owned) | COTS from established antenna vendors; cryo LNAs; 2–3 yr lead time | $15–30M each including site works |
| Station Ka upgrades (0A co-investment) | 2–3 stations | Feed, cryo LNA, 32 GHz downconverter, SLE stack on existing commercial antennas | $5–13M per station |

**Manufacturing risks specific to Class N**
- Reflector surface accuracy of ≤0.25 mm RMS (λ/40 at Ka) must survive launch, landing loads and regolith thermal cycling.
- Dust: a deployable shroud, electrostatic-dust mitigation coating, and periodic gimbal "shake-off" are needed.
- The gimbal must handle Earth-tracking rates of up to about 3°/min on a fast rotator (2 h period). Specify ≥5°/min slew and ≤0.05° pointing error, against a 0.22° HPBW at Ka.

---

## 11. Environmental Interfaces of Concern

| Concern | Affects | Mitigation | TRL now |
|---|---|---|---|
| RF propagation through, and noise from, MW-class iodine or argon EP plumes | Tugs (Class T) | HGA placement outside a ≥45° plume cone; plasma-noise characterisation in the bom-0-11 EP life test (add RF probes, ~$1–2M here); X fallback | 3–4 |
| Iodine condensation on reflector and feed surfaces (D-05 reference propellant) | Tugs, site (tug loiter), SEL1 | Heated feed window; surface-coating compatibility tests; RF loss allowance of 0.5 dB | 3 |
| HV tether (1–3 kV) arcing and partial-discharge EMI on site | Site trunk terminals | Separation ≥50 m from tether reels; EMC spec in ICD; fibre (not copper) data run | 4 |
| Regolith dust and electrostatic levitation at the terminator | Class N | As §10 | 4 |
| Plant thermal and outgassing plumes | Class N | Siting upwind (sunward) of plant radiators and exhaust | 4 |

---

## 12. Roadmap and Technology Readiness

### 12.1 Schedule

```
2027 ── Fleet Comms ICD v1.0; spectrum filing begun; DSN+ESTRACK cross-support
        agreements; commercial service RFP (≥2 providers)
2028 ── Scout launches (bom-0-1): services live, X+Ka; KMF IOC; SOC light
2029 ── Ka deep-space upgrades complete at 2–3 commercial stations
        CAM crypto qualification (TRL 6); OTAR demo on first scout
2030 ── EP-plume RF test campaign (with bom-0-11); Class N CDR
2031 ── Pathfinder (bom-0-12) carries Class N prototype → TRL 6–7 in relevant
        environment (dust, rotation, thermal); site-gateway/DTN demo
2032 ── KDP-0B input: make/buy analysis, signed anchor-tenant term sheets
        (conditional), target conjunction criterion verified
2033–34 ── (if 0B) Anchor-tenant antenna build; Class N flight units ×2
2035–41 ── 0B operations; annual security audit; OTAR every 90 days
```

### 12.2 TRL against D-02 gates

Requirement: KDP-0B needs TRL 6 for any project-ending item; internal 0A milestones need TRL 4–5.

| Technology | Current TRL | KDP-0B target | Project-ending? | Path |
|---|---|---|---|---|
| Deep-space X/Ka transponders | 9 | 9 | No | Heritage |
| 250 W-class 32 GHz TWTA | 6 | 7 | No (fallback: 2 × 100 W combined) | Vendor qualification |
| 3 m Ka terminal on rotating NEA surface (Class N) | 4 | **6–7** | **Possibly.** Loss of trunk means loss of supervision, which is a licence issue. | Pathfinder |
| SDLS + OTAR + recovery-key scheme | 5–6 | **6** | **Yes, for licence** (assured command) | Scout flight demo 2029 |
| Onboard Trajectory Safety Envelope | 3–4 | **6** | **Yes, for licence** | Software qualification plus tug pathfinder hardware-in-the-loop (bom-0-4 / 0-11) |
| DTN BPv7/LTP operations | 7 | 7 | No | Flown on ISS and elsewhere |
| Commercial 18 m Ka deep-space receive | 5–6 | 7 | No (fallback: DSN/ESTRACK at higher cost) | 0A co-investment |
| RF compatibility with MW EP plume | 3–4 | 6 | No (X fallback, placement) | EP life test add-on |
| Iodine surface contamination of RF | 3 | 5–6 | No | Coupon tests |

---

## 13. Cost Analysis

All figures are real-year-agnostic 2026 USD. Ranges reflect estimating uncertainty only; programme contingency is in bom-0-17.

### 13.1 0A (≈2027–2033)

| Line | Low | High | Basis |
|---|---|---|---|
| Network services (scouts, pathfinder) | 15 | 90 | 1,500–4,000 h/yr × ~5 ops-yr; $1–2.5k/h commercial 18 m-class, $2–6k/h 34 m-class. DSN rates are published as aperture fees but are not assured available; budgeted, not assumed free. |
| ΔDOR and emergency-command cross-support | 3 | 10 | 20–60 sessions/yr |
| Commercial Ka deep-space station upgrades (2–3) | 15 | 40 | $5–13M per station |
| Comms NRE (CAM crypto, OTAR, OTSE spec, DTN, Class N design to CDR, transponder fleet qualification, EP-plume RF tests) | 25 | 60 | Comparable deep-space comms subsystem developments |
| Ground WAN, DTN gateway, KMF/HSM, SOC (initial) | 10 | 25 | Commercial IT security build plus HSMs |
| Spectrum and regulatory | 2 | 5 | Legal plus filing effort |
| Comms and ground engineering staff (10–20 FTE × ~6 yr × $250k loaded) | 15 | 30 | |
| **0A total** | **85** | **260** | **Central ≈$140M.** Quote as **$80–250M**. |

### 13.2 0B (gated; 2 yr pre-ops + 7 yr ops)

| Line | Low | High | Basis |
|---|---|---|---|
| Ground apertures, anchor-tenant lease (baseline) | 80 | 330 | 8,000–14,000 h/yr at $0.8–2.5k/h effective take-or-pay. Covers ~9 yr including ramp. |
| 34 m-class cross-support (ΔDOR, LGA emergency, scouts) | 10 | 60 | 500–1,500 h/yr at $2–6k/h |
| Site Trunk Terminals, 2 flight + qual (flight spare in bom-0-14) | 30 | 70 | $8–20M per unit plus qualification and integration |
| Ground WAN, KMF and SOC operations | 25 | 60 | $3–6M/yr |
| Comms engineering sustaining (8–15 FTE) | 20 | 45 | |
| Spectrum (0B assignments, renewals) | 2 | 5 | |
| **0B total** | **167** | **570** | **Central ≈$330M** |

**Owned-network alternative (0B-O):**

| Component | Cost |
|---|---|
| 6 × 18 m antennas | $90–180M |
| Sites | $20–40M |
| O&M over 7 yr | $80–150M |
| Residual services | $30–80M |
| **Aperture subtotal** | **$220–450M** |

This compares with $80–330M for the lease. The lease wins unless commercial operators cannot or will not meet the Ka deep-space specification by KDP-0B. Ownership also makes us a station operator, a capability the non-profit does not otherwise need.

### 13.3 Phasing summary

| | 0A | 0B | Total |
|---|---|---|---|
| Range | $80–250M | $170–570M | $0.25–0.81B |
| Central | $140M | $330M | ≈$0.47B |

### 13.4 Where I disagree with the round-2 figures

1. **Gemini: "3 × 35 m + 2 relays, ~$0.6B".**
   - *New 35 m antennas are unnecessary.* With Class N and Class T terminals carrying 250 W and 150 W Ka on 3 m and 1.5 m dishes, 18 m-class ground antennas close at 2 AU (§5.2). A new 34–35 m deep-space antenna costs about $50–90M each before O&M. If Gemini meant using ESTRACK's existing 35 m antennas, I agree with using them, but only for ΔDOR and emergency commanding.
   - *Relays are rejected as baseline.* Two deep-space relays cost about $200–400M including launch to SEL4/L5-type positions. Their only real benefit is conjunction coverage, which I handle with autonomy (COM-020/021) and target selection (§7).
   - Overall, my total is lower than Gemini's for the space segment and similar overall, because I explicitly include multi-year service fees that Gemini's figure appears not to itemise.
2. **Claude ($0.15–0.5B) and GPT ($0.2–0.5B).** The structure matches mine: "one network", buy or lease. The **low ends are only reachable if 0B never proceeds** (my 0A alone is $80–250M), or if DSN/ESTRACK cross-support is in effect subsidised, which contradicts "DSN not assumed free". The upper ends of about $0.5B are consistent with my central estimate. My high case of $0.81B comes from pessimistic hourly rates over 9 years of 0B, plus security operations that I believe round-2 under-counted.
3. **Quantity.** "3 apertures" (Claude) is too few for redundancy at Ka with weather; I propose 3 bands × 2. "1 network" (GPT) is correct as a contract construct.
4. **Command security** was absent from all round-2 costings. The OTSE and two-of-three Class 0-T rules are new requirements with modest cost (~$5–15M inside the NRE line) but high licence value.

---

## 14. Risk Assessment

| # | Risk | L | C | Mitigation | Residual |
|---|---|---|---|---|---|
| R1 | DSN/ESTRACK time unavailable (Artemis and other users oversubscribe) | H | M | Design for 18 m commercial; limit 34 m use to ΔDOR and emergencies; sign cross-support MOUs early | M |
| R2 | Commercial Ka deep-space capacity does not mature | M | M | 0A co-investment; owned-network fallback at KDP-0B | L–M |
| R3 | Selected NEA has long conjunction or >2 AU geometry | M | H | Target-gate criterion; relay trade reopened at KDP-0B ($200–400M) | M |
| R4 | Cyber compromise or hijack of a tug | L | **Catastrophic** | SDLS, BPSec, signed sequences, 2-of-3 authorisation, OTSE onboard, air-gapped enclave | L |
| R5 | Key desynchronisation bricks an asset | M | H | Recovery key via LGA/34 m; tested on every asset before launch and in flight | L |
| R6 | Class N terminal degraded by dust, thermal or rotation | M | H | Two terminals; pathfinder demonstration; tug relay fallback | L–M |
| R7 | EP-plume or iodine RF degradation on tugs | M | M | Placement, X fallback, contamination tests | L |
| R8 | Spectrum filing delayed (sponsor administration) | M | M | Start in 2027; operate scouts on existing provider assignments | L |
| R9 | Crypto export control blocks international partner stations | L–M | M | Station-blind architecture (stations never hold keys); legal review | L |
| R10 | Single-provider concentration | M | M | ≥2 providers per band by 0B, enforced through SLE standardisation | L |
| R11 | Ka rain fade | M | L | Dry sites, X fallback, data-volume margin | L |

---

## 15. Open Engineering Questions

1. **Target spin state and geometry.** Is the two-terminal surface concept adequate for the candidate targets' spin axes and periods, or does a fast rotator force an orbiting or hovering trunk node? This is answerable only after bom-0-1 characterisation.
2. **Conjunction criterion.** Is 45 days the right limit? It must be jointly set with bom-0-3 (how long can the plant run unsupervised?) and bom-0-10.
3. **Ka uplink.** Is a 34 GHz uplink worth it for faster software loads, given that X at 245 kbps already suffices?
4. **Commercial ΔDOR.** Can a commercial provider deliver ΔDOR to the accuracy needed for 300 t SEL1 approaches, or is DSN/ESTRACK a permanent dependency?
5. **OTSE keep-out definitions.** Who defines the regions (bom-0-15 with the licensing state), and how are waivers time-limited and audited?
6. **Iodine deposition rates** near tugs loitering at the site and the SEL1 node, and their effect on Ka feed windows.
7. **Optical growth slot.** Is optical needed in 0B or Phase 1 at all, given the demand of §3? I recommend reserving mass, power and thermal provisions on Class N (≈50 kg, 300 W) and making no other spend.
8. **Hourly-rate reality.** Firm quotes for 18 m Ka deep-space hours under a 9-year take-or-pay are the largest cost uncertainty; get indicative bids during 0A.
9. **Sponsoring administration** for ITU filings, and its interplay with the licence gate and non-profit domicile (bom-0-7).
10. **Phase 1 scale-up.** Does the anchor-tenant network scale to Phase 1 swarm element counts (10²–10⁴ assets), or is a different architecture needed, such as SEL1-hub crosslinks with Earth trunking? This should inform the lease term and options at KDP-0B.

---

**Recommendation for the baseline freeze:**
- Adopt Terminal Classes N, T, S, P and E.
- Adopt the anchor-tenant ground concept with 34 m cross-support for emergencies and ΔDOR.
- Adopt the security architecture of §6, including the OTSE.
- Carry the cost at **0A $80–250M and 0B $170–570M (central ≈$0.47B)**.
- Delete relays and new 35 m antennas from the baseline.