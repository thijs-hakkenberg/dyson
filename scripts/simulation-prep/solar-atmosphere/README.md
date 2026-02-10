# Solar Atmosphere Response Surface Generator

Offline Python script that computes response surfaces for the Solar Mass Extraction Rate Simulator (RQ-3b-2).

## What it does

Solves simplified 1D radial solar atmosphere energy balance equations across a parameter grid:
- **Extraction rates**: 50 log-spaced points from 10^9 to 10^13 kg/s
- **Beam powers**: 10 log-spaced points from 10^18 to 10^22 W

For each parameter combination, computes:
- Plume velocity from beam heating of chromospheric gas
- Mass flow rate per extraction station
- Lifting efficiency (kinetic energy vs beam power)
- Stability margin (extraction power vs solar luminosity)
- Luminosity perturbation over mission duration
- Feasibility assessment

## Physics Model

The model uses parameterized solar atmosphere profiles:
- **Density**: Exponential scale height model from chromosphere base (~10^-8 kg/m^3) with H ~ 2000 km
- **Temperature**: Chromospheric minimum at 4400 K, transition region at ~20000 K, corona at ~1 MK
- **Plume dynamics**: v = sqrt(2P / (rho * A)), energy balance between beam heating and kinetic lifting

## Usage

```bash
pip install -r requirements.txt
python generate_response_surfaces.py [--output path/to/output.json] [--er-points 50] [--bp-points 10]
```

Default output: `static/data/solar-atmosphere-response-surfaces.json`

## Output Format

```json
{
  "grid": {
    "extractionRates": [1e9, ..., 1e13],
    "beamPowers": [1e18, ..., 1e22]
  },
  "points": [
    {
      "er": 0, "bp": 0,
      "efficiency": 0.05,
      "plumeVelocity": 50000,
      "stabilityMargin": 0.98,
      "luminosityPerturbation": 1e-8,
      "stationsRequired": 100,
      "feasible": true
    }
  ]
}
```

The browser simulator loads this file and uses bilinear interpolation in log-space for real-time parameter exploration.
