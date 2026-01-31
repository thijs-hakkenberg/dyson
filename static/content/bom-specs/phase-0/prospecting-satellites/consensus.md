---
bomId: "bom-0-1"
itemName: "Prospecting Satellites"
itemSlug: "prospecting-satellites"
generated: "2026-01-31"
phase: "phase-0"
type: "consensus"
---

# Prospecting Satellites - Consensus Analysis

This document synthesizes specifications from Claude Opus 4.5, Gemini 3 Pro, and GPT-5.2 to identify areas of agreement, divergence, and open questions.

## Key Specifications

All models agree on these fundamental specifications:

- Fleet size of 50 satellites is appropriate for comprehensive NEA survey
- Each satellite should mass 80-120 kg with deployable solar arrays
- Visible/NIR spectroscopy (0.4-2.5 μm) is essential for composition analysis
- 7-year design life with potential for extended mission
- X-band primary communication with S-band backup
- Level 3 autonomy enabling 30-day independent operation
- Survey rate target of 20+ asteroids per satellite per year

## Divergent Views

Models have different perspectives on these aspects:

- **Propulsion System**: Claude recommends green monopropellant for simplicity, while Gemini favors electric propulsion for higher delta-V. GPT suggests a hybrid approach.
- **Thermal Infrared Capability**: Claude and GPT include TIR mapping (3-14 μm), but Gemini considers it optional due to cooling complexity.
- **Inter-satellite Communication**: Gemini emphasizes mesh networking for data relay, while Claude and GPT treat it as secondary to ground communication.
- **Cost Estimates**: Estimates range from $4.5M to $6M per unit, primarily driven by different spectrometer cost assumptions.

## Open Questions

Critical decisions and research needs identified across all models:

- What is the optimal spectrometer resolution vs. mass/power tradeoff?
- How effective is on-board spectral unmixing compared to ground processing?
- What is the minimum constellation size for acceptable survey coverage?
- Should the fleet use dedicated launches or rideshare opportunities?
- How to validate asteroid composition algorithms before deployment?

## Recommended Approach

Based on multi-model analysis, the recommended approach is:

1. **Start with proven SmallSat bus** adapted for deep space operations
2. **Prioritize visible/NIR spectrometer** development as the critical path item
3. **Design for rideshare launches** to reduce per-unit launch costs
4. **Plan phased deployment** starting with 5 pathfinders before full constellation
5. **Invest in autonomy software** early to reduce operational burden
6. **Maintain flexibility** in final constellation size based on pathfinder results

The total budget allocation of $250M for 50 units ($5M/unit) appears achievable but leaves limited margin for development cost overruns. Consider 15-20% contingency.
