#!/usr/bin/env python3
"""
Solar Atmosphere Response Surface Generator

Solves simplified 1D radial solar atmosphere energy balance equations
across a parameter grid of extraction rates and beam powers.
Outputs response surfaces for browser interpolation.

Usage:
    python generate_response_surfaces.py [--output OUTPUT_PATH]
"""

import argparse
import json
import math
import sys

import numpy as np

# Physical constants
R_SUN = 6.957e8       # Solar radius in meters
M_SUN = 1.989e30      # Solar mass in kg
L_SUN = 3.828e26      # Solar luminosity in Watts
T_SURFACE = 5778      # Surface temperature in Kelvin
V_ESCAPE = 617700     # Escape velocity at surface in m/s
SOLAR_WIND_RATE = 2e9 # Natural solar wind mass loss in kg/s
G = 6.674e-11         # Gravitational constant
k_B = 1.381e-23       # Boltzmann constant
m_p = 1.673e-27       # Proton mass in kg
SIGMA_SB = 5.670e-8   # Stefan-Boltzmann constant

# Beam parameters
BEAM_RADIUS = 1000    # 1 km beam radius
BEAM_AREA = math.pi * BEAM_RADIUS**2  # ~3.14e6 m^2


def solar_density_profile(r_fraction):
    """
    Parameterized chromospheric density profile.
    r_fraction: radius as fraction of R_sun (1.0 = surface, 2.0 = 2 R_sun)

    Returns density in kg/m^3.
    Chromosphere: density drops roughly exponentially from ~1e-8 at base
    to ~1e-12 at transition region.
    """
    # Scale height model: rho = rho_0 * exp(-(r - R_sun) / H)
    rho_base = 1e-8  # kg/m^3 at chromosphere base
    H = 2000e3  # Scale height ~2000 km
    height = (r_fraction - 1.0) * R_SUN
    return rho_base * np.exp(-height / H)


def solar_temperature_profile(r_fraction):
    """
    Parameterized solar atmosphere temperature profile.
    Chromosphere: ~4400 K minimum, rising to ~20000 K at transition region.
    Corona: rises to ~1-2 MK following T ~ (R_sun/r)^{-0.4} approximation.
    """
    if r_fraction < 1.003:
        # Lower chromosphere: temperature minimum ~4400 K
        t_min = 4400
        t_base = T_SURFACE
        frac = (r_fraction - 1.0) / 0.003
        return t_base - (t_base - t_min) * frac
    elif r_fraction < 1.01:
        # Upper chromosphere: rising to transition region ~20000 K
        frac = (r_fraction - 1.003) / 0.007
        return 4400 + (20000 - 4400) * frac
    else:
        # Corona: T ~ T_corona * (R_sun / r)^{-0.4}
        # T increases with r (initially), then decreases
        t_corona_base = 1e6  # 1 MK at base of corona
        return t_corona_base * (1.0 / r_fraction)**(-0.4)


def calculate_plume_velocity(beam_power, density):
    """
    Calculate plume velocity from beam heating.
    v = sqrt(2 * P / (rho * A_beam))
    """
    if density <= 0:
        return 0
    return math.sqrt(2 * beam_power / (density * BEAM_AREA))


def calculate_mass_flow_per_station(density, velocity):
    """Mass flow rate per station: mdot = rho * v * A"""
    return density * velocity * BEAM_AREA


def calculate_lifting_efficiency(mass_flow, beam_power):
    """
    Lifting efficiency: eta = (mdot * v_escape^2 / 2) / P_beam
    """
    if beam_power <= 0:
        return 0
    return (mass_flow * V_ESCAPE**2 / 2) / beam_power


def calculate_stability_margin(total_power):
    """Stability margin: 1 - P_extraction / L_sun"""
    return 1 - total_power / L_SUN


def calculate_luminosity_perturbation(extraction_rate, duration_years=1000):
    """
    Luminosity perturbation over mission.
    delta_L/L ~ 3.5 * delta_M / M_sun (mass-luminosity relation)
    """
    duration_s = duration_years * 3.156e7
    total_mass = extraction_rate * duration_s
    return 3.5 * total_mass / M_SUN


def analyze_point(extraction_rate, beam_power):
    """
    Full analysis at one (extraction_rate, beam_power) parameter point.
    Uses the 1D radial atmosphere model.
    """
    # Sample chromospheric density at optimal lifting height (~1.005 R_sun)
    r_frac = 1.005
    density = solar_density_profile(r_frac)

    # Plume dynamics per station
    plume_vel = calculate_plume_velocity(beam_power, density)
    mass_flow = calculate_mass_flow_per_station(density, plume_vel)
    efficiency = calculate_lifting_efficiency(mass_flow, beam_power)

    # Stations required
    if mass_flow > 0:
        stations = math.ceil(extraction_rate / mass_flow)
    else:
        stations = 999999

    # Total power and stability
    total_power = stations * beam_power
    stability = calculate_stability_margin(total_power)
    lum_perturbation = calculate_luminosity_perturbation(extraction_rate)

    # Feasibility check
    feasible = (
        stability > 0.80 and
        total_power < L_SUN and
        efficiency > 0.001 and
        plume_vel > V_ESCAPE * 0.1  # At least 10% of escape velocity
    )

    return {
        "efficiency": float(np.clip(efficiency, 0, 1)),
        "plumeVelocity": float(plume_vel),
        "stabilityMargin": float(np.clip(stability, 0, 1)),
        "luminosityPerturbation": float(lum_perturbation),
        "stationsRequired": int(min(stations, 999999)),
        "feasible": bool(feasible)
    }


def main():
    parser = argparse.ArgumentParser(
        description="Generate solar atmosphere response surfaces"
    )
    parser.add_argument(
        "--output",
        default="static/data/solar-atmosphere-response-surfaces.json",
        help="Output JSON file path"
    )
    parser.add_argument(
        "--er-points", type=int, default=50,
        help="Number of extraction rate grid points"
    )
    parser.add_argument(
        "--bp-points", type=int, default=10,
        help="Number of beam power grid points"
    )
    args = parser.parse_args()

    # Generate parameter grid (log-spaced)
    extraction_rates = np.logspace(9, 13, args.er_points).tolist()
    beam_powers = np.logspace(18, 22, args.bp_points).tolist()

    total = len(extraction_rates) * len(beam_powers)
    print(f"Generating {total} grid points "
          f"({len(extraction_rates)} extraction rates x {len(beam_powers)} beam powers)...")

    points = []
    for er_idx, er in enumerate(extraction_rates):
        for bp_idx, bp in enumerate(beam_powers):
            result = analyze_point(er, bp)
            points.append({
                "er": er_idx,
                "bp": bp_idx,
                **result
            })

        # Progress
        pct = (er_idx + 1) / len(extraction_rates) * 100
        sys.stdout.write(f"\r  Progress: {pct:.0f}%")
        sys.stdout.flush()

    print("\n")

    output_data = {
        "grid": {
            "extractionRates": extraction_rates,
            "beamPowers": beam_powers
        },
        "points": points
    }

    # Write output
    import os
    os.makedirs(os.path.dirname(args.output) or ".", exist_ok=True)
    with open(args.output, "w") as f:
        json.dump(output_data, f, indent=2)

    print(f"Response surfaces written to {args.output}")
    print(f"  Grid: {len(extraction_rates)} x {len(beam_powers)} = {total} points")

    # Summary statistics
    feasible_count = sum(1 for p in points if p["feasible"])
    print(f"  Feasible points: {feasible_count}/{total} ({feasible_count/total*100:.1f}%)")

    efficiencies = [p["efficiency"] for p in points if p["feasible"]]
    if efficiencies:
        print(f"  Efficiency range (feasible): {min(efficiencies):.4f} - {max(efficiencies):.4f}")


if __name__ == "__main__":
    main()
