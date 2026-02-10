# Trajectory Estimator Training Script

Trains a small MLP neural network to estimate delta-V for orbital transfers
in the **deployment regime (0.9-1.1 AU)**, then exports the weight matrices
as JSON for use in the browser-based simulator.

## Overview

The ML Trajectory Deployment Optimization simulator (RQ-1-43) compares deployment
strategies for distributing collector units from an assembly node to orbital slots.
The NN replaces expensive Lambert solver iterations with a fast forward pass.

**Architecture**: 3-layer MLP (3 -> 128 -> 128 -> 1)
- Input: |r1| (AU), |r2| (AU), time-of-flight (days) - all normalized to [0,1]
- Output: estimated delta-V (m/s)

## Training Domain

The NN is trained specifically on the deployment transfer regime:
- Orbital radii: 0.9-1.1 AU (70% clustered in 0.98-1.02 AU core)
- Delta-V range: 0-2000 m/s
- TOF range: 1-500+ days (0.3x to 5.0x Hohmann time)

A previous version trained on 0.3-3.0 AU had a ~5000 m/s output floor that
overestimated deployment-scale transfers (50-500 m/s) by 50-80x. This version
provides accurate estimates in the narrow band relevant to collector deployment.

## Usage

```bash
pip install -r requirements.txt
python train_estimator.py
```

## Output

Files are written to `static/content/simulation-data/trajectory-estimator/`:

- `nn-weights.json` - Weight matrices and normalization parameters for browser inference
- `reference-solutions.json` - Brute-force reference solutions for validation

The browser simulator gracefully falls back to Hohmann approximation if
NN weights are not available.
