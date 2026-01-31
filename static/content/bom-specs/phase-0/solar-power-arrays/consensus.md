---
bomId: "bom-0-5"
itemName: "Solar Power Arrays"
itemSlug: "solar-power-arrays"
generated: "2026-01-31"
phase: "phase-0"
type: "consensus"
---

# Solar Power Arrays - Consensus Analysis

This document synthesizes specifications from Claude Opus 4.5, Gemini 3 Pro, and GPT-5.2 to identify areas of agreement, divergence, and open questions.

## Key Specifications

All models agree on these fundamental specifications:

- Total capacity: 100 MW at 1 AU for Phase 0 operations
- Modular architecture with 1-2 MW units for scalability
- Triple-junction III-V solar cells (InGaP/GaAs/Ge)
- Cell efficiency: 32-36% at beginning of life
- 15-year design life with <1.5%/year degradation
- Distributed architecture for fault tolerance
- 600V DC primary distribution
- Autonomous sun tracking and power management

## Divergent Views

Models have different perspectives on these aspects:

- **Concentrator vs. Flat-Plate**: Claude and GPT favor flat-plate for simplicity; Gemini suggests concentrators could reduce cell costs.
- **Energy Storage**: Claude specifies 500 MWh Li-ion; Gemini suggests 200 MWh is sufficient; GPT recommends flow batteries for longer life.
- **Module Size**: Claude recommends 2 MW modules; Gemini prefers 1 MW for easier handling; GPT suggests 5 MW for efficiency.
- **Cell Technology**: Agreement on III-V cells, but divergence on whether to wait for next-generation (40%+) options.
- **Cost Per Watt**: Estimates range from $3.50 to $5.00 per watt installed.

## Open Questions

Critical decisions and research needs identified across all models:

- What is the optimal module size for manufacturing and deployment?
- Should concentrators be used to reduce cell area requirements?
- What energy storage technology best suits 30-year station life?
- Can array structures be manufactured in space using station output?
- What is the radiation degradation rate at L4/L5 location?

## Recommended Approach

Based on multi-model analysis, the recommended approach is:

1. **Use proven III-V cell technology** rather than waiting for next-generation
2. **Select 2 MW module size** as balance of handling and efficiency
3. **Implement flat-plate design** initially with concentrator option for expansion
4. **Include 500 MWh Li-ion storage** for operational flexibility
5. **Plan phased deployment** aligned with Processing Station power needs
6. **Design for in-space manufacturing** of structural components in later phases

The total budget of $500M for 100 MW ($5/W) is achievable with current technology but leaves limited margin. Volume production should drive costs toward $3-4/W.
