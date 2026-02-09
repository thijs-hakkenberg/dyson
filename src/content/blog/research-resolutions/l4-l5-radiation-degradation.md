---
slug: "l4-l5-radiation-degradation"
title: "Can Solar Arrays Survive 15 Years at Lagrange Points? What the Research Says"
description: "A deep dive into radiation degradation research for III-V solar cells operating outside Earth's magnetosphere at the L4/L5 Lagrange points."
author: "Project Dyson Team"
date: "2026-02-09"
category: "Research Resolutions"
tags:
  - "radiation"
  - "solar-cells"
  - "lagrange-points"
  - "space-environment"
  - "research-resolution"
relatedPhases:
  - "phase-0"
---

# Can Solar Arrays Survive 15 Years at Lagrange Points? What the Research Says

One of the most critical questions for Project Dyson's Phase 0 operations concerns the longevity of our power generation infrastructure. The Solar Power Arrays specification calls for 100 MW of capacity using InGaP/GaAs/Ge triple-junction cells, with a degradation target of less than 1.5% per year over a 15-year design life. But can we actually achieve this at the L4 or L5 Lagrange points, where our arrays will operate fully outside Earth's protective magnetosphere?

We conducted a systematic review of arxiv literature to answer this question. The short answer: **conditionally yes**, but with important caveats that will shape our design decisions.

## The Challenge: Naked in the Solar Wind

The L4/L5 Lagrange points present a radiation environment unlike anything we have extensive flight heritage for. Unlike low Earth orbit, where the magnetosphere provides substantial shielding, or even geostationary orbit, where some protection remains, L4/L5 positions are fully exposed to:

- **Solar Energetic Particles (SEPs)**: Bursts of high-energy protons during solar flares and coronal mass ejections
- **Galactic Cosmic Rays (GCRs)**: A constant rain of heavy ions from beyond the solar system
- **Solar Wind**: The continuous outflow of charged particles from the Sun

Over a 15-year mission spanning roughly 1.4 solar cycles, cumulative radiation exposure will be dominated by a handful of large SEP events, with GCRs providing a continuous background dose.

## The Research Foundation

Our analysis drew on several key papers that illuminate how III-V solar cells respond to space radiation.

### Understanding the Damage Mechanism

The foundational work by Baur, Campesato, and Casale (arxiv:1704.06495, arxiv:1811.11583) establishes that **displacement damage**---not ionization---is what kills III-V solar cells. When energetic particles strike the crystal lattice, they knock atoms out of position, creating defects that trap charge carriers and reduce the cell's ability to generate current.

Critically, this research shows that the GaAs middle junction in triple-junction cells is the weak link. While the InGaP top cell and Ge bottom cell have some radiation tolerance margin, the GaAs subcell shows 15-20% more degradation than its neighbors at equivalent radiation doses. This finding directly supports the design philosophy of current-matching optimization in our cell design.

The papers also validate a powerful analytical tool: the Non-Ionizing Energy Loss (NIEL) methodology. By calculating the "displacement damage dose" from any arbitrary particle spectrum, we can predict degradation using a unified curve that works for electrons, protons, and heavier ions alike. This lets us translate L4/L5 environmental models into expected cell performance.

### The Silver Lining: Annealing Effects

Lang et al. (arxiv:2004.00308) provide encouraging data on thermal annealing---the partial self-repair of radiation damage at elevated temperatures. GaInAsP cells show 5-15% recovery of lost performance when heated to 100-200 degrees Celsius after irradiation.

This matters because solar arrays at L4/L5 will naturally cycle through temperatures of 60-80 degrees Celsius during illumination. This continuous "baking" may provide ongoing partial recovery that offsets damage accumulation. The trade-off is that higher operating temperatures also reduce baseline efficiency, requiring careful thermal design optimization.

### Learning from Outside the Magnetosphere

While no III-V cells have operated at L4/L5, we can draw insights from analogous environments. Horeau et al. (arxiv:1207.5597) documented radiation effects on the Herschel Space Observatory at the L2 Lagrange point, which shares L4/L5's exposure outside the magnetosphere. Their cosmic ray measurements validate environmental models for Sun-Earth Lagrange points.

Girish and Aranya (arxiv:1012.0717) analyzed solar cell performance on the lunar surface, another environment without magnetospheric protection. Silicon cells from the Apollo era showed 15-25% degradation over multi-year exposures---a useful upper bound given that III-V cells are inherently more radiation-hard than silicon.

## The Bottom Line: Degradation Predictions

Synthesizing the literature, we estimate the following for 15-year L4/L5 operations:

**Base Case (Standard Coverglass, 100-150 micrometers):**
- Remaining power factor: 75-85%
- Annual degradation rate: 1.0-1.7%/year

**Optimized Case (Thick Coverglass, 300-500 micrometers):**
- Remaining power factor: 80-88%
- Annual degradation rate: 0.8-1.3%/year

The 1.5%/year target falls within both ranges, but achieving it reliably will require:

1. **Thicker coverglass** than standard GEO specifications, optimized for the L4/L5 proton spectrum
2. **Design margins** accounting for solar cycle variability (add +/- 0.5%/year uncertainty)
3. **Thermal design** that captures annealing benefits without excessive efficiency loss
4. **No extreme SEP events** during the mission---a risk we cannot fully control

## What We Still Don't Know

The honest assessment is that significant uncertainties remain:

- **Zero flight heritage**: No III-V solar cells have ever operated at Earth-Sun L4 or L5. Our predictions are extrapolations, not measurements.
- **Spectrum mismatch**: Standard ground testing uses radiation spectra matched to GEO or MEO environments, not L4/L5. The particle energy distributions differ.
- **SEP statistics**: We understand general occurrence probabilities for solar particle events, but predicting what will happen during *our specific* 15-year window requires probabilistic modeling.

## Design Implications

Based on this research, we recommend several modifications to the baseline Solar Power Arrays specification:

1. **Increase end-of-life power margin** from approximately 10% to 15-20% to account for environmental uncertainty
2. **Prioritize coverglass optimization study** as a precursor engineering activity, with ground testing using L4/L5-representative spectra
3. **Design for modular replacement** capability so individual array segments can be swapped if degradation exceeds predictions
4. **Seek flight experiment opportunities** on planned Lagrange point or deep-space missions to gather direct data

The research gives us confidence that our degradation targets are achievable, but not guaranteed. The prudent engineering approach is to design for the upper bound of the uncertainty range while working to narrow that uncertainty through targeted testing and, ideally, precursor flight data.

## References

Key papers analyzed in this research:

- Baur et al., "Displacement Damage dose and DLTS Analyses on Triple and Single Junction solar cells" (arxiv:1704.06495)
- Campesato et al., "NIEL DOSE and DLTS Analyses on Triple and Single Junction solar cells" (arxiv:1811.11583)
- Lang et al., "Radiation hardness and post irradiation regeneration behavior of GaInAsP solar cells" (arxiv:2004.00308)
- Girish & Aranya, "Moon's Radiation Environment and Expected Performance of Solar Cells" (arxiv:1012.0717)
- Horeau et al., "Impacts of The Radiation Environment At L2 On Bolometers Onboard The Herschel Space Observatory" (arxiv:1207.5597)
