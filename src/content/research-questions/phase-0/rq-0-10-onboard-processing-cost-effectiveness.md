---
questionId: "rq-0-10"
slug: "onboard-processing-cost-effectiveness"
title: "On-board processing cost-effectiveness vs bulk transport"
questionType: "engineering-decision"
priority: "medium"
status: "open"
sourcePhase: "phase-0"
sourceBOMItemId: "bom-0-2"
sourceBOMItemSlug: "mining-robots"
sourceBOMItemName: "Mining Robots"
relatedBOMItems:
  - "bom-0-2"
  - "bom-0-3"
  - "bom-0-4"
tags:
  - "processing"
  - "logistics"
  - "cost-analysis"
createdDate: "2026-01-31"
---

## Background

Mining Robots are autonomous extraction systems designed to harvest raw materials from asteroids for Dyson swarm construction. The consensus document specifies a fleet of 20 robots, each massing 2,500-3,500 kg, with a target extraction rate of 1,000+ tonnes per robot per year. A critical architectural decision identified across all three AI models concerns the level of material processing performed on the robot itself versus transporting bulk regolith to centralized processing facilities.

The models show significant divergence on this question: Claude and Gemini advocate for on-board magnetic and electrostatic separation capabilities, while GPT-5.2 recommends minimal processing with bulk transport. This disagreement directly impacts robot mass, complexity, power requirements, and the overall logistics architecture of the mining operation.

## Why This Matters

This decision cascades through multiple project systems and fundamentally shapes the mining operation's economics:

**Mass and Complexity Tradeoffs**: Adding separation equipment increases robot mass toward the upper 3,500 kg limit, reducing payload capacity for extracted material and increasing launch costs. Each additional kilogram of processing equipment displaces extraction tooling or propellant reserves.

**Logistics Architecture**: Bulk transport requires significantly more cargo shuttle capacity and fuel expenditure. If robots extract 1,000 tonnes annually but only 15-20% represents useful material (typical for C-type asteroids), bulk transport moves 800+ tonnes of waste per robot per year. Concentrated material transport reduces this by 5-10x.

**Fleet Utilization**: Robots performing on-board processing spend operational time on separation rather than excavation. This reduces effective extraction rates but may improve overall system throughput by reducing transport bottlenecks.

**Failure Modes**: Processing equipment introduces additional failure points. The 5-year operational lifetime requirement becomes harder to achieve with more complex systems operating in abrasive regolith environments.

**Cost Implications**: The $15-25M spread in per-unit cost estimates ($40M-$65M) largely stems from differing processing capability assumptions. This represents $300-500M variance across the 20-unit fleet.

## Key Considerations

**Material Concentration Ratios**: C-type asteroids contain approximately 10-20% extractable volatiles and metals. S-type asteroids offer higher metal content (20-30%) but less water. M-type asteroids may be 80%+ metal. Processing value varies dramatically by target.

**Power Budget**: On-board processing requires sustained power for magnetic separation (estimated 2-5 kW) and electrostatic systems (1-3 kW). Solar-powered robots in asteroid shadow must rely on battery backup, limiting processing operations during eclipse periods.

**Transport Energy Costs**: Moving material from asteroid surface to processing facility requires delta-v expenditure. For a typical near-Earth asteroid, this may be 50-200 m/s depending on orbital geometry. Fuel costs scale linearly with transported mass.

**Processing Efficiency**: Centralized facilities can achieve higher separation efficiency (95%+) compared to compact on-board systems (70-85%). This efficiency gap may offset transport costs for high-value materials.

**Operational Flexibility**: Modular tool systems (recommended in consensus) could allow processing capability to be added or removed based on operational experience, but this requires designing appropriate interfaces from the start.

**Pathfinder Learning**: The recommended 2-3 robot pathfinder deployment provides opportunity to test both approaches before committing the full fleet.

## Research Directions

1. **Develop Mass-Energy Trade Model**: Create a quantitative model comparing total system mass and energy expenditure for three scenarios: no on-board processing, partial concentration (2-3x), and full separation (10x concentration). Include robot mass, transport shuttle requirements, fuel consumption, and centralized facility sizing. Use the 1,000 tonnes/year extraction target as baseline.

2. **Characterize Processing Equipment Mass and Reliability**: Survey existing magnetic and electrostatic separation technologies. Determine mass, power, and mean-time-between-failure for systems capable of processing 3-5 tonnes of regolith daily. Assess compatibility with microgravity operation and abrasive particle environments.

3. **Analyze Asteroid-Type Sensitivity**: Calculate break-even points for on-board processing across C, S, and M-type asteroid compositions. Determine whether a single robot design can be cost-effective across all types or if specialized variants are justified.

4. **Simulate Fleet Operations**: Model fleet throughput under both architectures, including transport shuttle availability, processing queue times, and robot utilization rates. Identify bottlenecks that emerge at scale with 20 operational robots.

5. **Design Pathfinder Experiment Protocol**: Develop a test plan for the initial 2-3 robot deployment that directly compares processing approaches, including metrics for cost-per-tonne of delivered refined material and equipment degradation rates.
