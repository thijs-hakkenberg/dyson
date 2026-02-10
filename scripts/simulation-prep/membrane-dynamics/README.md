# Membrane Dynamics Modal Grid Generator

Pre-computes eigenvalue analyses for the membrane deployment dynamics simulator.

## Setup

```bash
pip install -r requirements.txt
```

## Usage

```bash
python generate_modal_grid.py
```

## Output

Generates `static/content/simulation-data/membrane-dynamics/modal-grid.json` containing a 4D grid (1000 points) of eigenvalue data across:

- 5 diameters: 100, 250, 500, 750, 1000 m
- 10 tensions: 0.1-10 N/m (log-spaced)
- 5 spin rates: 0, 0.1, 0.2, 0.35, 0.5 RPM
- 4 areal densities: 35, 40, 45, 50 g/m^2

Each point includes first 20 eigenvalues, flutter margin, and stability classification.

The browser simulator loads this JSON and interpolates between grid points for real-time parameter exploration. If the JSON is not available, the simulator falls back to analytical plate theory.
