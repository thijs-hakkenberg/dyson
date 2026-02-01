---
questionId: "rq-0-19"
slug: "fleet-size-vs-vehicle-capacity"
title: "Fleet size vs vehicle capacity tradeoff"
questionType: "simulation"
priority: "medium"
status: "open"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-4"
sourceBOMItemSlug: "transport-vehicles"
sourceBOMItemName: "Transport Vehicles"
relatedBOMItems:
  - "bom-0-4"
tags:
  - "fleet-sizing"
  - "logistics"
  - "optimization"
createdDate: "2026-01-31"
---

## Background

Transport Vehicles constitute a critical logistics element of the Dyson swarm construction infrastructure, responsible for moving processed materials between the asteroid Processing Station and the solar collector manufacturing and deployment zones. The consensus document specifies an initial fleet of 10 vehicles with payload capacities ranging from 150,000 to 250,000 kg per vehicle, ion propulsion systems capable of 6-10 km/s delta-V, and a 15-year design life supporting 10+ mission cycles per vehicle.

This fleet sizing question emerges directly from divergent model perspectives: Gemini advocates for 150,000 kg payloads enabling faster transit times, while Claude specifies 200,000 kg as baseline, and GPT recommends variable configuration. The fundamental question is whether the project should deploy more smaller vehicles or fewer larger ones within the $2B total budget allocation.

## Why This Matters

The fleet architecture decision cascades through nearly every aspect of the transport logistics chain. A suboptimal choice creates compounding inefficiencies over the project's multi-decade timeline.

**Throughput Dependencies**: The Processing Station's output rate and the Manufacturing Hub's input requirements establish minimum mass-flow constraints. If the fleet cannot sustain required throughput, either upstream processing must throttle back (wasting capacity) or downstream manufacturing starves (creating schedule delays).

**Failure Mode Resilience**: With 10 vehicles, losing one unit reduces fleet capacity by 10%. A 20-vehicle fleet of smaller craft loses only 5% capacity per failure. Given the 15-year design life and harsh space environment, redundancy directly impacts mission assurance.

**Cost Risk**: At $200M per unit, each vehicle represents significant capital exposure. Smaller vehicles may cost less individually but require more total units, potentially shifting risk profiles in either direction.

**Schedule Sensitivity**: Larger vehicles require longer propellant loading, cargo handling, and potentially longer transit times due to lower thrust-to-mass ratios. Smaller vehicles may complete more frequent round trips, smoothing delivery schedules.

## Key Considerations

**Propulsion Scaling**: Hall-effect thrusters (the recommended propulsion type) scale non-linearly. Doubling payload mass does not double propulsion system mass, creating economies of scale favoring larger vehicles. However, thruster lifetime (an identified open question) may constrain maximum vehicle size if power requirements exceed practical array dimensions.

**Solar Array Constraints**: The consensus specifies 300-500 m² deployable arrays. Larger payloads require proportionally more power for equivalent transit times, potentially pushing array sizes beyond current deployment technology limits.

**Cargo Container Standardization**: The recommendation to standardize cargo containers early implies that container dimensions constrain both vehicle bay design and handling equipment. Optimizing container size affects the entire logistics chain.

**Delta-V Budget**: The 6-10 km/s round-trip capability must account for propellant mass fraction. Larger vehicles carrying more propellant may achieve the same delta-V as smaller vehicles, but the mass ratio tradeoffs differ significantly.

**Docking Operations**: The consensus recommends autonomous docking with robotic berthing backup. More vehicles mean more docking cycles, increasing wear on station-side equipment and collision risk probability.

**Human Rating Consideration**: The open question regarding future crew transport capability suggests structural margins may be required. Larger vehicles more easily accommodate human-rating mass penalties.

## Research Directions

1. **Discrete Event Simulation of Logistics Chain**: Model the complete material flow from Processing Station output through transport to Manufacturing Hub input. Vary fleet configurations (e.g., 8×250,000 kg, 10×200,000 kg, 15×133,000 kg, 20×100,000 kg) while holding total fleet capacity constant. Measure throughput variance, queue depths, and schedule sensitivity to vehicle failures.

2. **Propulsion System Scaling Analysis**: Develop parametric models of Hall-effect thruster clusters, power systems, and propellant tankage across the 100,000-300,000 kg payload range. Identify mass fraction breakpoints where larger vehicles become disproportionately efficient or where array size constraints impose hard limits.

3. **Monte Carlo Reliability Modeling**: Using historical spacecraft failure rate data and the 15-year design life requirement, simulate fleet availability across different fleet sizes. Quantify the probability of falling below minimum throughput thresholds for various redundancy levels.

4. **Cost Sensitivity Analysis**: Develop parametric cost models incorporating non-recurring engineering (higher for larger, novel vehicles), recurring production costs (potentially lower per-kg for larger vehicles), and launch costs (Starship payload constraints may favor specific vehicle masses). Identify cost-optimal configurations within the $2B envelope.

5. **Cargo Handling Time Study**: Analyze microgravity cargo transfer operations for different container sizes and vehicle configurations. Quantify turnaround time impacts on effective fleet throughput, as handling time may dominate over transit time for shorter routes.
