---
bomId: "bom-0-9"
itemName: "Communications and Ground Segment"
itemSlug: "comms-ground-segment"
modelId: "gpt-6-1-sol"
modelName: "GPT-6.1 Sol"
generated: "2026-10-20"
phase: "phase-0"
---

# bom-0-9 — Communications and Ground Segment  
## Proposed technical baseline for Phase 0A and gated Phase 0B

**Recommendation:** Procure a geographically diverse, commercial-first deep-space communications service, supported by Project Dyson-owned command security, scheduling, and data-delivery infrastructure. Equip scouts and industrial spacecraft with standardized X-band terminals; add Ka-band selectively at the processing site after target selection and traffic measurements justify it.

**Do not build a dedicated three-station network or deploy communications relays in the baseline.** Neither is presently supported by a target orbit, a demonstrated coverage deficit, or an approved industrial traffic model.

The communications system should enable **autonomous, intermittently connected industrial operations**, not continuous Earth-based teleoperation.

### Proposed headline parameters

| Parameter | Phase 0A | Incremental Phase 0B |
|---|---|---|
| Spacecraft supported | 4–10 scouts, one pathfinder, survey interfaces | 10–18 cargo tugs, one industrial NEA site, one Phase 1 receiving-node interface |
| Ground coverage | Access to at least three geographically separated deep-space sites | Reserved capacity across at least three sites, with additional provider diversity where available |
| Baseline RF | X-band uplink/downlink | X-band fleet-wide; optional Ka-band site downlink |
| Dedicated communications relays | None | None unless justified at the gate |
| Routine traffic allocation | Approximately 5–50 MB/day aggregate, excluding separately scoped remote-survey science | Approximately 50–200 MB/day aggregate; higher-volume opportunistic campaigns |
| Ground-service usage | 1,500–3,000 antenna-hours/year during four active service years | 8,000–14,000 antenna-hours/year during a five-year operating period |
| Preliminary bom-0-9 cost | **$55–125M** | **$110–285M** |
| Combined programme allowance | **$165–410M**, approximately **$290M planning case**, before central contingency |

These are **2026-dollar planning estimates**, not supplier quotations. The industrial allocation is a priced option, not an authorization to proceed.

---

## 1. Design basis and boundaries

### 1.1 Binding architectural assumptions

This proposal assumes:

- Beneficiation and primary Fe-Ni processing occur at the selected NEA.
- Production is uncrewed.
- Cargo transport uses 10–18 MW-class electric-propulsion tugs.
- The receiving node is provisionally at **Sun–Earth L1**, subject to the joint Phase 1 decision at KDP-0B.
- Production rates and communications capacity are sized to signed Phase 1 demand.
- No free DSN access is assumed.
- No communications system is required to support crew safety or continuous remote piloting.

### 1.2 Preliminary engineering assumptions

The following assumptions must be replaced by target-specific values during 0A.

| Assumption | Preliminary value | Consequence |
|---|---:|---|
| Earth–spacecraft distance | 0.2–3 AU service envelope | Rate adaptation and substantial onboard storage |
| Primary design link distance | 2 AU | Common sizing point, not guaranteed target geometry |
| One-way light time | Approximately 100–1,500 s across the assumed envelope | Local autonomous protection is mandatory |
| RF solar-conjunction interruption | Initially allow 14–30 days of degraded or unavailable service | Validate against selected orbit and solar-angle constraints |
| Industrial operating period priced here | Five years | Extension requires additional service procurement |
| Local site dimensions | Approximately 0.1–5 km | Site radio coverage is a separate problem from Earth links |
| Industrial sites | One baseline site | Additional sites trigger re-sizing |

The 14–30-day conjunction allowance is a **planning placeholder**, not a guarantee that communications will be usable immediately outside that interval.

### 1.3 Scope ownership

To avoid double counting:

**Included in bom-0-9**

- Deep-space radios, amplifiers, antennas, antenna drives and communications-specific interface electronics.
- Site-to-Earth gateway terminals.
- Purchased ground antenna access and tracking services.
- Ground-station interface equipment, communications scheduling and link monitoring.
- Authenticated-command transport, key-management infrastructure and communications data delivery.
- Communications-specific supplier acceptance and integration.

**Excluded**

- Routine flight control, mission planning and operational staffing: **bom-0-10**.
- Organization-wide IT, corporate security and administration: **bom-0-7**.
- Dedicated development laboratories, technology maturation and qualification campaigns: **bom-0-11**.
- Pathfinder bus and mission demonstration costs: **bom-0-12**.
- Host spacecraft structures, launch and delivery: respective vehicle lines and **bom-0-8**.
- Robot access radios and plant instrumentation networks: **bom-0-2/3**, with interfaces controlled here.
- Replacement flight terminals held as spares: **bom-0-14**.
- Programme contingency: **bom-0-17**.

Flight communications equipment is costed here and carried as allocated mass and power on its host. It must not also appear as purchased hardware in the host subsystem budget.

---

## 2. Recommended architecture

```text
                  PROJECT DYSON CONTROLLED DOMAIN
       +------------------------------------------------+
       | Mission operations — bom-0-10                 |
       | Mission planning, flight dynamics, approvals  |
       +------------------------+-----------------------+
                                |
                  Authenticated command packages
                                |
       +------------------------v-----------------------+
       | Communications service layer — bom-0-9        |
       | Scheduling | keys/HSMs | routing | data archive|
       | link monitoring | provider interfaces         |
       +-----------+--------------------+---------------+
                   |                    |
             Provider A            Provider B
                   |                    |
       +-----------v--------------------v---------------+
       | Geographically distributed deep-space stations |
       | Nominally 3 longitude regions; X-band baseline |
       +-----------+---------------------+--------------+
                   |                     |
              Direct to Earth       Direct to Earth
                   |                     |
        +----------v----------+   +------v--------------+
        | Scouts / cargo tugs |   | NEA gateway pair    |
        | Receiving-node link|   | A: normal operations|
        +---------------------+   | B: independent rescue|
                                  +----------+-----------+
                                             |
                                  Local plant/site network
                                             |
                                  Robots and process controls
```

### Architectural choices

1. **Every independently flying vehicle retains direct-to-Earth command and telemetry.**  
   A tug must not become dependent on the processing site for survival communications.

2. **The NEA site has two independently powered gateway chains.**  
   One supports normal production data; the other preserves recovery communications after a gateway or local network failure.

3. **Ground infrastructure is service-procured first.**  
   Geographic diversity is required; ownership is not.

4. **Ka-band is an upgrade, not a prerequisite for Phase 0 success.**

5. **No optical communications dependency in Phase 0.**  
   Optical terminals may be evaluated experimentally, but weather, fine pointing, acquisition and station availability make them inappropriate as the sole industrial command path.

---

## 3. Flight-segment specifications

These are procurement envelopes. They are not claims that a specific qualified product already meets every parameter simultaneously.

### 3.1 Standard terminal classes

| Characteristic | Scout terminal | Tug terminal | NEA production gateway |
|---|---:|---:|---:|
| Quantity | 4–10 | 10–18 | Two independent chains at one site |
| High-gain antenna diameter | 0.5–0.8 m | 0.8–1.2 m | 1.5–2.0 m primary; 0.6–1.0 m rescue |
| X-band RF output | 15–30 W | 25–60 W | 40–100 W primary; 15–40 W rescue |
| Installed terminal mass | 12–25 kg | 20–40 kg | 60–120 kg per primary-capability installation |
| Transmit-mode DC demand | 80–180 W | 120–300 W | 250–600 W, excluding optional Ka-band |
| Standby/receive demand | 10–30 W | 15–40 W | 30–80 W |
| Onboard communications storage | 64–256 GB | 128–512 GB | 2–8 TB usable, fault-tolerant |
| Antenna pointing target | ≤0.5° | ≤0.3–0.5° | ≤0.2° X-band; approximately ≤0.08° for Ka option |
| Low-gain antennas | At least two, with complementary coverage | At least two | Multiple fixed coverage sectors or equivalent |

Mass includes radio, amplifier, antenna, drive where fitted, communications electronics and local harness allowance. It excludes the host avionics computer and structural reinforcement.

**Important limitation:** Low-gain antennas do not provide a guaranteed full-range rescue link in arbitrary attitude. Their purpose is acquisition and constrained contingency service. At large Earth range, recovery may require an autonomous Earth-search sequence using the high-gain antenna.

### 3.2 Site gateway mechanical configuration

The preferred production gateway is mounted on a dedicated mast or pedestal, isolated from:

- Excavation and beneficiation ejecta.
- Thermal processing plumes.
- High-voltage tether routes.
- Major electric-propulsion plume lines.
- Plant structural vibration.

A preliminary gateway installation occupies approximately:

- **2–3 m swept antenna envelope** for a 1.5–2 m dish.
- **1–3 m mast height**, subject to local horizon analysis.
- **0.5–1 m³ equipment enclosure**.
- **Approximately 1–3 m² effective radiator area** for a continuously transmitting primary chain, depending on temperature, view factors and duty cycle.

The gateway’s thermal requirement is provided to the host thermal system. Shared radiator hardware is not purchased twice.

A final pedestal design cannot be selected before the target’s rotation, shape, surface attachment method and sky visibility are known.

### 3.3 Optional Ka-band terminal

For the production site only:

- Downlink near the allocated deep-space Ka-band service around 32 GHz.
- 20–50 W RF output.
- Shared or dedicated 1.5–2 m aperture.
- Approximately 15–35 kg additional equipment if sharing the reflector and mount.
- Approximately 150–350 W additional transmitting demand.
- Weather-aware scheduling with X-band fallback.

The upgrade should be purchased only if traffic forecasts demonstrate that its delivered cost per useful bit is better than additional X-band contact time.

---

## 4. Link performance and service envelope

### 4.1 Illustrative X-band downlink budget

Reference case:

- Frequency: 8.4 GHz.
- Earth distance: 2 AU.
- Spacecraft antenna: 1.5 m, 55% aperture efficiency.
- Transmitter RF output: 60 W.
- Spacecraft feeder loss: 1 dB.
- Ground receive performance: **G/T = 50 dB/K**.
- Additional propagation, pointing and polarization loss: 2 dB.
- Required coded \(E_b/N_0\), including implementation allowance: approximately 1.5 dB.
- Additional operating margin: 3 dB.

| Parameter | Value |
|---|---:|
| Transmit power | 17.8 dBW |
| Spacecraft antenna gain | Approximately 39.8 dBi |
| Effective isotropic radiated power | Approximately 56.6 dBW |
| Free-space path loss at 2 AU | Approximately 280.5 dB |
| Ground G/T | 50 dB/K |
| Boltzmann conversion term | 228.6 dB |
| Other losses | 2 dB |
| Resulting \(C/N_0\) | Approximately 52.7 dB-Hz |
| \(E_b/N_0\) at 64 kbit/s | Approximately 4.6 dB |

This supports **approximately 64 kbit/s under the stated conditions**, with little excess beyond the allocated margin. It is not a universal guaranteed rate.

### 4.2 Indicative information rates

Assuming a capable 34–35 m-class receiving station or equivalent G/T:

| Terminal | Around 1 AU | Around 2 AU | Around 3 AU |
|---|---:|---:|---:|
| Scout: 0.6 m, 25 W | 8–16 kbit/s | 2–4 kbit/s | 0.5–1 kbit/s |
| Tug: 1.0 m, 40 W | 32–64 kbit/s | 8–16 kbit/s | 2–8 kbit/s |
| Site: 1.5 m, 60 W | 128–256 kbit/s | 32–64 kbit/s | 8–16 kbit/s |

Rates depend on actual antenna efficiency, ground elevation, weather, coding and interference. Near conjunction, this table is not applicable.

**Smaller ground antennas cannot simply be substituted at the same price and performance.** Ground procurement should specify G/T, availability and uplink EIRP rather than aperture diameter alone.

### 4.3 Ground uplink

Specify provider capability of approximately:

- X-band uplink in the licensed deep-space allocation.
- **2–20 kW transmitter capability**, subject to antenna gain and required rescue cases.
- Coherent two-way ranging and Doppler.
- Recorded tracking observables delivered with calibrated timing and station metadata.

The uplink is normally less bandwidth-constrained than the downlink, but the difficult case is acquisition or recovery through a low-gain spacecraft antenna—not routine commanding through a pointed dish.

---

## 5. Traffic and capacity model

The rejected multi-terabyte daily concept is unnecessary for Phase 0. The right approach is to perform process supervision and data reduction locally.

### 5.1 Industrial daily allocation

| Data category | Preliminary allocation |
|---|---:|
| NEA plant health, production records and selected imagery | 20–100 MB/day |
| 10–18 tugs, fleet total | 10–50 MB/day |
| Receiving-node communications interface | 5–20 MB/day |
| Residual scout/pathfinder traffic | 5–20 MB/day |
| Events, protocol overhead and scheduling allowance | 10–30 MB/day |
| **Routine aggregate** | **50–200 MB/day** |

These figures assume event-triggered image selection, local compression and onboard analysis—not continuous raw video transmission.

A 64 kbit/s link operating for eight hours carries about **230 MB before protocol losses**. One site pass therefore cannot simultaneously satisfy the upper site allocation, all fleet needs, navigation and outage recovery. Fleet scheduling is a real capacity constraint.

At approximately 3 AU, reduce routine quotas to roughly **25–75 MB/day** unless more contact time, larger apertures or Ka-band are procured.

### 5.2 Priority classes

1. Emergency beacons and safe-state confirmation.
2. Authenticated commands and command acknowledgements.
3. Navigation and collision-avoidance information.
4. Equipment health and production accounting.
5. Engineering investigations.
6. Selected science, imagery and bulk archives.

The system must be able to discard or defer low-priority data without affecting command access.

### 5.3 Storage sizing

A 2 TB site archive holds far more than a month of routine Earth-bound telemetry. Its purpose is also to retain higher-rate local diagnostic records for later selection.

Require:

- At least 30 days of prioritized store-and-forward telemetry.
- A protected command/audit partition.
- Error detection and correction, scrubbing and wear monitoring.
- Automatic deletion policies by priority class.
- No command inhibition caused by a full science or imagery partition.

---

## 6. Ground segment

### 6.1 Coverage and procurement

Procure access in three broad longitude regions:

- Americas.
- Europe/Africa.
- Asia-Pacific.

This is not equivalent to guaranteed continuous visibility. Declination, station latitude, elevation masks, maintenance and spacecraft occultation must be modeled.

Required provider features:

- Contracted minimum annual antenna-hours.
- Reserved windows for critical maneuvers.
- Defined emergency pre-emption terms.
- Transparent cancellation and weather rules.
- Tracking observables and calibration data.
- Independent terrestrial routing where practical.
- Export-control and licensing compatibility.
- Tested interoperability with Project Dyson radios and command security.

DSN may be purchased when available and eligible. It is neither free nor presumed to provide industrial service priority.

### 6.2 Service levels

Preliminary requirements:

- Ground command-delivery infrastructure availability: **≥99.9% annually**, excluding scheduled maintenance agreed in advance.
- Successful execution of usable booked passes: **≥98%**, with exclusions and remedies explicitly negotiated.
- Emergency ground response: target **≤4 hours** to a feasible contact opportunity, not an unconditional four-hour spacecraft contact guarantee.
- No single terrestrial network failure may remove all command routes.
- Local plant safety must not depend on any of these service levels.

### 6.3 Project-owned infrastructure

Deploy two geographically separated communications service environments, with:

- Redundant scheduling and station interfaces.
- Hardware security modules.
- Independent audit storage.
- Automated link-quality assessment.
- Provider-neutral data routing.
- Time synchronization and controlled time-source monitoring.
- An isolated integration environment for spacecraft and station testing.

Avoid unnecessary proprietary ground software. Use open, version-controlled interfaces wherever feasible.

---

## 7. Autonomy, control and cybersecurity

### 7.1 Autonomy requirements

The communications architecture must support:

- Normal unattended operation for **72 hours without Earth contact**.
- Survival without Earth contact for **at least 30 days**, subject to target-specific power and thermal analysis.
- Autonomous suspension of hazardous operations when local state estimates become unreliable.
- Autonomous gateway reboot, alternate-radio selection and Earth reacquisition.
- Scheduled command execution with explicit validity windows.
- Local rejection of stale, contradictory or unsafe commands.

Thirty-day survival does **not** mean thirty-day full-rate production. Planned conjunction operations should initially shut down or simplify difficult-to-recover processes.

Robot motion, tether protection, power switching and molten-metal containment remain local control functions.

### 7.2 Command authentication

Baseline requirements:

- Cryptographic authentication and integrity protection for every executable command.
- Anti-replay counters and mission-appropriate freshness checks.
- Per-spacecraft identities and separated command authorities.
- Hardware-protected ground signing keys.
- Controlled key rotation and tested recovery procedures.
- Secure boot and signed flight-software updates.
- Separation between telemetry reception, routine commanding and flight-software release authority.
- Dual authorization for high-consequence actions, implemented in mission operations and enforced where appropriate onboard.

Use CCSDS Space Data Link Security where supported by selected equipment, supplemented by application-level protection for commands and software packages that cross multiple storage and transport systems.

Do not design the system so that a normal radio modem reset, expired terrestrial certificate or temporary loss of accurate clock time permanently locks out recovery.

### 7.3 Protocols and interfaces

Preferred standards and practices:

- CCSDS telemetry and telecommand framing.
- CCSDS-compatible error correction selected through link testing.
- CCSDS File Delivery Protocol for files and software loads.
- CCSDS Space Link Extension or equivalent standardized station services.
- Delay-tolerant networking only where it demonstrably simplifies disrupted multi-hop operations.

The baseline does not require a fleet-wide relay network, so delay-tolerant networking is useful but not itself a project-ending technology.

---

## 8. Manufacturing and qualification strategy

### 8.1 Product family

Use a common radio and communications computer across scouts, tugs and gateways where practical. Vary:

- Amplifier rating.
- Antenna diameter.
- Drive capability.
- Storage capacity.
- Redundancy.

This reduces software variants, test equipment, qualification burden and operator training.

Prefer fixed antennas on scouts where spacecraft attitude permits. Use articulated antennas on tugs where thrust-vector or array-pointing constraints make body pointing inefficient.

### 8.2 Industrial-environment concerns

The site installation is harder than a conventional deep-space radio installation because it combines:

- Conductive Fe-Ni dust.
- High-voltage distribution.
- Large solar arrays.
- Power converters and MW-class EP systems.
- Intermittent mechanical disturbances.
- Process-generated electromagnetic interference.

Required verification includes RF performance with representative power electronics operating, contamination exposure, thermal distortion and antenna-drive life.

Procure filters, grounding and shielding as a coordinated spacecraft EMC design—not as late radio-box fixes.

### 8.3 Relevant-environment qualification

The radio technology may be mature, but the integrated site gateway is not automatically TRL 6.

At KDP-0B:

- Any communications function whose failure could end the industrial mission must meet the programme’s **TRL 6 relevant-environment requirement without waiver**.
- Conventional hardware heritage can supply evidence, but it cannot replace demonstration of new contamination, pointing, autonomy or EMC interfaces.
- Communications-related development and dedicated qualification campaigns are budgeted under bom-0-11; flight demonstration is coordinated with bom-0-12.

---

## 9. Development roadmap and gates

### Stage A — Requirements and service feasibility

**Indicative duration: 6–12 months**

- Develop target-orbit visibility and link models.
- Obtain budgetary station-service quotations.
- Freeze spectrum assumptions and licensing responsibility.
- Establish fleet traffic allocations.
- Complete spacecraft/ground command-security architecture.

**Exit criterion:** Credible station capacity and link performance for the candidate target set.

### Stage B — 0A engineering demonstration

**Indicative duration: 12–24 months, overlapping procurement**

- Integrate common flight terminal.
- Demonstrate authenticated command and software update recovery.
- Test multi-provider ground interoperability.
- Exercise simulated 30-day communications interruption.
- Demonstrate link adaptation and telemetry prioritization.

Internal maturity targets follow the programme’s TRL 4–5 expectations where new technology is involved.

### Stage C — Pathfinder validation

- Measure actual antenna pointing and acquisition behavior.
- Validate downlink rates against range and station elevation.
- Exercise gateway failover and local safe-state behavior.
- Operate a representative power-converter/communications configuration.
- Measure actual daily engineering-data demand.

### Stage D — KDP-0B decision

Communications evidence must show:

1. Target-specific contact capacity closes.
2. Industrial traffic closes with a proposed **≥30% capacity margin** at the relevant scheduling level.
3. No unqualified project-ending communications technology remains.
4. Ground-service availability is contractually credible.
5. Spectrum and national authorizations have a viable approved path.
6. Conjunction survival and recovery are demonstrated to the required level.

The 30% margin applies to the analyzed traffic and contact plan. It is not a substitute for separately analyzing long outages.

---

## 10. Cost estimate

### 10.1 Basis

- Constant 2026 USD.
- 0A includes four active ground-service years within the wider development programme.
- 0B includes five incremental industrial operating years.
- Purchased station service, not three new owned stations.
- Existing qualified radio products used where possible.
- Dedicated NRE, pathfinder mission, spares, launch and central contingency excluded as assigned above.

### 10.2 Preliminary allocation

| Cost element | 0A | Incremental 0B |
|---|---:|---:|
| Flight communications terminals and gateway equipment | $8–20M | $25–55M |
| Purchased deep-space antenna service and tracking | $8–30M | $40–130M |
| Provider interfaces and ground-station integration | $6–14M | $8–20M |
| Communications scheduling, routing and data-delivery platform | $12–22M | $10–22M |
| Command-security infrastructure and communications networks | $8–15M | $8–18M |
| Capacity reservation and emergency-access arrangements | $5–12M | $10–25M |
| Systems integration and supplier acceptance | $6–12M | $8–15M |
| **Calculated subtotal** | **$53–125M** | **$109–285M** |
| **Rounded planning envelope** | **$55–125M** | **$110–285M** |

**Combined envelope: $165–410M.**

A reasonable provisional planning allocation is **$90M for 0A plus $200M conditional for 0B**, excluding central reserve.

### 10.3 Service-cost sensitivity

The service estimate assumes approximately:

- 0A: 6,000–12,000 total antenna-hours.
- 0B: 40,000–70,000 total antenna-hours.
- Effective contracted rates generally around **$1,000–2,500/hour**, with the upper industrial budget relying on negotiated bulk rates below the highest spot-equivalent price.

These are estimating assumptions, not verified market tariffs. Station size, uplink power, staffing, tracking products and emergency priority materially affect price.

At 70,000 hours and $2,500/hour, 0B antenna service alone becomes **$175M**, above the table’s $130M upper allowance. That is a procurement stress case requiring re-budgeting—not a cost to hide in contingency.

### 10.4 Disagreement with round-2 proposals

- **Claude’s $150–500M:** Broadly compatible with this proposal. Its three-aperture concept should be interpreted initially as contracted access, not necessarily ownership.
- **GPT’s $200–500M:** Also broadly compatible. My lower bound is smaller because dedicated station construction, relays and full mission-operations staffing are excluded.
- **Gemini’s approximately $600M including three 35 m stations and two relays:** Not justified as the baseline. The target geometry and business case do not yet establish a need for either owned stations or relays.

Three owned stations could become attractive for a larger, long-duration fleet, but that decision needs a life-cycle utilization and staffing comparison. It should not precede service-market testing.

---

## 11. Principal risks

| Risk | Consequence | Mitigation |
|---|---|---|
| Commercial capacity unavailable at needed times | Fleet contact shortfalls | Early reservations, provider diversity, lower data quotas |
| Target geometry creates poor visibility | Loss of operational cadence | Include communications in target-selection scoring |
| Conjunction longer or worse than assumed | Production interruption, recovery risk | Target-specific analysis and autonomous shutdown/restart |
| Site dust or thermal distortion degrades pointing | Downlink failure | Separated gateway placement, contamination testing, rescue chain |
| EP/power-system interference | Intermittent RF outage | Representative integrated EMC testing |
| Security failure or key lockout | Unauthorized control or loss of command | Independent authorities, protected keys, tested recovery |
| Nominally diverse providers share infrastructure | Common-mode outage | Audit physical stations, backhaul and control centers |
| Data demand grows after deployment | Excess contact cost | Enforced quotas and local processing |
| Ground-service price escalation | Programme cost growth | Multi-year terms and explicit option pricing |
| Ka-band underperforms in weather | Lost bulk-data opportunities | X-band remains the command and essential-telemetry baseline |

The most important operational hazard is **designing the plant as if a reliable broadband connection to Earth always exists**. Ground-network reliability cannot compensate for inadequate local autonomy.

---

## 12. Open engineering decisions

Before preliminary design review:

1. What are the actual target orbit, spin state and gateway sky-access constraints?
2. Can a surface-mounted gateway maintain Earth access, or is a different installation geometry necessary?
3. Which providers can contractually support the required deep-space G/T, uplink EIRP and annual hours?
4. What communications traffic is required to certify Fe-Ni product quality and delivery acceptance?
5. Which tug maneuvers require continuous tracking, and for how long?
6. What are the communications blackout constraints during EP operation?
7. Can gateway redundancy share a mast or reflector without creating an unacceptable common-mode failure?
8. Which authorities license spectrum use and ground transmissions?
9. How much survey science data belongs to bom-0-1 rather than this fleet communications allocation?
10. At what measured traffic level does Ka-band become cheaper than more X-band contact time?
11. Does the final SEL1 receiving-node trajectory provide useful communications geometry, without assuming a relay function?
12. What communications availability is actually required to meet contracted Phase 1 delivery dates?

---

## Final recommendation

Approve **0A communications procurement and interoperability work**, with a **$55–125M planning envelope**. Carry **$110–285M for industrial expansion as a gated option**.

Freeze the initial baseline around:

- Direct-to-Earth X-band.
- Commercially procured, geographically diverse ground access.
- Two independent site gateway chains.
- Strong authenticated command and recoverable key management.
- Store-and-forward operations and bounded data quotas.
- Local industrial autonomy through long communications outages.

Do not buy dedicated relays, build three owned deep-space stations, or make Ka-band mandatory until target geometry, signed demand and measured pathfinder traffic demonstrate that those investments close a specific requirement.