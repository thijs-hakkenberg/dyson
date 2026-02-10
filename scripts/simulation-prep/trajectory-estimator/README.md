# Trajectory Estimator Training Script

Trains a small MLP neural network to estimate delta-V for orbital transfers,
then exports the weight matrices as JSON for use in the browser-based simulator.

## Overview

The ML Trajectory Deployment Optimization simulator (RQ-1-43) compares deployment
strategies for distributing collector units from an assembly node to orbital slots.
The NN replaces expensive Lambert solver iterations with a fast forward pass.

**Architecture**: 3-layer MLP (3 -> 128 -> 128 -> 1)
- Input: |r1| (AU), |r2| (AU), time-of-flight (days) - all normalized to [0,1]
- Output: estimated delta-V (m/s)

## Usage

```bash
pip install -r requirements.txt
python train_estimator.py
```

## Output

Files are written to `static/content/simulation-data/trajectory-estimator/`:

- `nn-weights.json` - Weight matrices and normalization parameters for browser inference
- `reference-solutions.json` - Brute-force reference solutions for validation

## Training Data

500K samples generated from Hohmann transfer calculations:
- Random orbital radii: 0.3 - 3.0 AU
- Time of flight: 0.5x - 2.0x Hohmann transfer time
- Target: Hohmann delta-V + phasing penalty

The browser simulator gracefully falls back to Hohmann approximation if
NN weights are not available.
