---
bomId: "bom-0-4"
itemName: "Transport Vehicles"
itemSlug: "transport-vehicles"
generated: "2026-01-31"
phase: "phase-0"
type: "consensus"
---

# Transport Vehicles - Consensus Analysis

This document synthesizes specifications from Claude Opus 4.5, Gemini 3 Pro, and GPT-5.2 to identify areas of agreement, divergence, and open questions.

## Key Specifications

All models agree on these fundamental specifications:

- Fleet of 10 vehicles for initial operations
- Payload capacity: 150,000-250,000 kg per vehicle
- Ion propulsion (Hall-effect or gridded ion) for high specific impulse
- Delta-V capability: 6-10 km/s for round-trip missions
- 15-year design life with 10+ mission cycles
- Autonomous navigation and docking capability
- Solar-powered with large deployable arrays (300-500 m²)
- Standardized cargo container system

## Divergent Views

Models have different perspectives on these aspects:

- **Propulsion Type**: Claude and GPT favor Hall-effect thrusters; Gemini prefers gridded ion for higher Isp despite lower thrust.
- **Payload Capacity**: Claude specifies 200,000 kg, Gemini suggests 150,000 kg for faster transits, GPT recommends variable configuration.
- **Propellant Source**: All assume xenon initially, but differ on timeline for asteroid-derived alternatives.
- **Docking Approach**: Claude emphasizes autonomous docking; GPT suggests robotic berthing backup; Gemini favors dedicated cargo handling spacecraft.
- **Cost Per Unit**: Estimates range from $150M to $250M per vehicle.

## Open Questions

Critical decisions and research needs identified across all models:

- What is the optimal thruster lifetime vs. Isp tradeoff for mission requirements?
- How to efficiently transfer large cargo containers in microgravity?
- Should vehicles be human-ratable for future crew transport?
- What is the optimal fleet size vs. vehicle capacity tradeoff?
- How to source xenon propellant economically at scale?

## Recommended Approach

Based on multi-model analysis, the recommended approach is:

1. **Select Hall-effect thrusters** for balance of thrust and efficiency
2. **Design for 200,000 kg payload** as baseline with growth potential
3. **Implement autonomous docking** with robotic berthing backup
4. **Standardize cargo containers** early for fleet-wide compatibility
5. **Plan for propellant resupply** at Processing Station
6. **Consider future human rating** in structural design

The total budget of $2B for 10 units ($200M/unit) is consistent with estimates. Launch costs are significant driver - consider Starship for cost reduction.
