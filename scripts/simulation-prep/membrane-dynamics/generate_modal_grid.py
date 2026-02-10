#!/usr/bin/env python3
"""
Generate pre-computed modal grid for membrane dynamics simulator.

Creates a 4D grid of eigenvalue analyses across:
- 5 diameters (100, 250, 500, 750, 1000 m)
- 10 tensions (0.1 to 10 N/m, log-spaced)
- 5 spin rates (0, 0.1, 0.2, 0.35, 0.5 RPM)
- 4 areal densities (0.035, 0.040, 0.045, 0.050 kg/m^2)

For each point, constructs a simplified 1D radial membrane FE model,
solves the generalized eigenvalue problem, and determines flutter boundary.

Output: static/content/simulation-data/membrane-dynamics/modal-grid.json
"""

import json
import os
import sys
import time

import numpy as np
from scipy.sparse import diags
from scipy.sparse.linalg import eigsh

# --- Grid parameters ---
DIAMETERS = [100, 250, 500, 750, 1000]  # meters
TENSIONS = np.logspace(np.log10(0.1), np.log10(10.0), 10).tolist()  # N/m
SPIN_RATES = [0, 0.1, 0.2, 0.35, 0.5]  # RPM
AREAL_DENSITIES = [0.035, 0.040, 0.045, 0.050]  # kg/m^2

# FE model parameters
N_ELEMENTS = 50  # Number of radial elements
N_EIGENVALUES = 20  # Number of eigenvalues to extract

# SRP at 0.5 AU (reference for flutter calculation)
SRP_1AU = 4.56e-6  # N/m^2
REFERENCE_DISTANCE_AU = 0.5
SRP_FORCE = SRP_1AU / (REFERENCE_DISTANCE_AU ** 2) * 1.1  # reflectivity ~ 0.1

# Reference damping ratio for flutter boundary calculation
REFERENCE_DAMPING = 0.03


def build_stiffness_matrix(n, tension, radius, dr):
    """
    Build 1D radial membrane stiffness matrix.

    For a radial membrane element, the stiffness contribution is:
    K[i,i] = T * (1/dr + 1/dr) for interior nodes
    K[i,i+1] = K[i+1,i] = -T/dr

    With geometric factor for cylindrical coordinates: r_i
    """
    main_diag = np.zeros(n)
    off_diag = np.zeros(n - 1)

    for i in range(n):
        r = (i + 1) * dr  # radial position (avoid r=0 singularity)
        r_factor = max(r, dr)  # regularize near center

        if i == 0:
            main_diag[i] = tension * r_factor / dr
        elif i == n - 1:
            main_diag[i] = tension * r_factor / dr
        else:
            main_diag[i] = 2 * tension * r_factor / dr

        if i < n - 1:
            r_mid = (i + 1.5) * dr
            off_diag[i] = -tension * r_mid / dr

    K = diags([off_diag, main_diag, off_diag], [-1, 0, 1], format='csr')
    return K


def build_mass_matrix(n, sigma, dr):
    """
    Build lumped mass matrix for radial membrane.

    M[i,i] = sigma * 2*pi*r_i * dr (annular area element)
    """
    main_diag = np.zeros(n)

    for i in range(n):
        r = (i + 1) * dr
        main_diag[i] = sigma * 2 * np.pi * r * dr

    M = diags([main_diag], [0], format='csr')
    return M


def build_centrifugal_stiffness(n, sigma, omega_rad, dr):
    """
    Build centrifugal stiffness contribution from spin.

    K_spin[i,i] = sigma * omega^2 * r_i^2 * 2*pi*r_i*dr / r_i
                = sigma * omega^2 * r_i * 2*pi * dr

    This represents the centrifugal tension that stiffens the membrane.
    """
    main_diag = np.zeros(n)

    for i in range(n):
        r = (i + 1) * dr
        main_diag[i] = sigma * omega_rad ** 2 * r * 2 * np.pi * dr

    K_spin = diags([main_diag], [0], format='csr')
    return K_spin


def compute_flutter_margin(eigenvalues, sigma, damping_ratio, srp_force):
    """
    Compute flutter margin from lowest positive eigenvalue.

    Flutter margin = (damping * 2 * sigma * omega_n) / srp_force
    """
    positive_eigs = [e for e in eigenvalues if e > 0]
    if not positive_eigs:
        return 0.0

    omega_n = np.sqrt(min(positive_eigs))
    if srp_force <= 0:
        return 100.0

    damping_capacity = damping_ratio * 2 * sigma * omega_n
    return damping_capacity / srp_force


def classify_stability(flutter_margin):
    """Classify stability based on flutter margin."""
    if flutter_margin >= 2.0:
        return "stable"
    elif flutter_margin >= 1.0:
        return "marginal"
    else:
        return "flutter"


def analyze_point(diameter, tension, spin_rpm, sigma):
    """
    Analyze a single grid point.

    Args:
        diameter: Membrane diameter in meters
        tension: Applied tension in N/m
        spin_rpm: Spin rate in RPM
        sigma: Areal density in kg/m^2

    Returns:
        dict with eigenvalues, flutter_margin, stability
    """
    radius = diameter / 2
    dr = radius / N_ELEMENTS
    n = N_ELEMENTS

    # Convert spin rate
    omega_rad = spin_rpm * 2 * np.pi / 60

    # Build matrices
    K = build_stiffness_matrix(n, tension, radius, dr)
    K_spin = build_centrifugal_stiffness(n, sigma, omega_rad, dr)
    K_total = K + K_spin
    M = build_mass_matrix(n, sigma, dr)

    # Ensure positive definite mass matrix (regularize zero entries)
    M_dense = M.toarray()
    min_mass = np.min(M_dense[M_dense > 0]) * 1e-6 if np.any(M_dense > 0) else 1e-12
    M_dense[M_dense <= 0] = min_mass
    M_reg = diags([np.diag(M_dense)], [0], format='csr')

    try:
        # Solve generalized eigenvalue problem
        n_eigs = min(N_EIGENVALUES, n - 2)
        eigenvalues, _ = eigsh(K_total, k=n_eigs, M=M_reg, which='SM')
        eigenvalues = sorted(eigenvalues.real.tolist())
    except Exception:
        # Fallback to analytical Bessel zeros if eigensolver fails
        bessel_zeros = [2.4048, 3.8317, 5.1356, 6.3802, 7.5883,
                        8.7715, 9.9361, 11.0864, 12.2251, 13.3543,
                        14.4755, 15.5898, 16.6983, 17.8014, 18.9000,
                        19.9944, 21.0852, 22.1725, 23.2568, 24.3383]

        effective_tension = tension + sigma * omega_rad ** 2 * radius ** 2 / 4
        factor = np.sqrt(effective_tension / sigma) / (np.pi * diameter)
        freqs = [alpha * factor for alpha in bessel_zeros[:N_EIGENVALUES]]
        eigenvalues = [(2 * np.pi * f) ** 2 for f in freqs]

    # Pad to N_EIGENVALUES if needed
    while len(eigenvalues) < N_EIGENVALUES:
        eigenvalues.append(eigenvalues[-1] * 1.2 if eigenvalues else 1.0)

    eigenvalues = eigenvalues[:N_EIGENVALUES]

    # Compute flutter margin
    flutter_margin = compute_flutter_margin(
        eigenvalues, sigma, REFERENCE_DAMPING, SRP_FORCE
    )

    stability = classify_stability(flutter_margin)

    return {
        "eigenvalues": [round(e, 6) for e in eigenvalues],
        "flutterMargin": round(flutter_margin, 4),
        "stability": stability
    }


def main():
    """Generate the full modal grid and save to JSON."""
    start_time = time.time()

    # Round tension values for clean JSON
    tensions_rounded = [round(t, 3) for t in TENSIONS]

    total_points = (len(DIAMETERS) * len(tensions_rounded) *
                    len(SPIN_RATES) * len(AREAL_DENSITIES))
    print(f"Generating modal grid: {total_points} points")
    print(f"  Diameters: {DIAMETERS}")
    print(f"  Tensions: {tensions_rounded}")
    print(f"  Spin rates: {SPIN_RATES}")
    print(f"  Areal densities: {AREAL_DENSITIES}")

    points = []
    count = 0

    for d_idx, diameter in enumerate(DIAMETERS):
        for t_idx, tension in enumerate(tensions_rounded):
            for s_idx, spin_rate in enumerate(SPIN_RATES):
                for a_idx, sigma in enumerate(AREAL_DENSITIES):
                    result = analyze_point(diameter, tension, spin_rate, sigma)

                    points.append({
                        "d": d_idx,
                        "t": t_idx,
                        "s": s_idx,
                        "a": a_idx,
                        **result
                    })

                    count += 1
                    if count % 100 == 0:
                        elapsed = time.time() - start_time
                        pct = count / total_points * 100
                        print(f"  {count}/{total_points} ({pct:.0f}%) - "
                              f"{elapsed:.1f}s elapsed")

    grid_data = {
        "grid": {
            "diameters": DIAMETERS,
            "tensions": tensions_rounded,
            "spinRates": SPIN_RATES,
            "arealDensities": AREAL_DENSITIES
        },
        "points": points
    }

    # Determine output path
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(script_dir, '..', '..', '..'))
    output_dir = os.path.join(
        project_root, 'static', 'content', 'simulation-data', 'membrane-dynamics'
    )
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, 'modal-grid.json')

    with open(output_path, 'w') as f:
        json.dump(grid_data, f, separators=(',', ':'))

    elapsed = time.time() - start_time
    file_size = os.path.getsize(output_path)
    print(f"\nComplete: {total_points} points in {elapsed:.1f}s")
    print(f"Output: {output_path} ({file_size / 1024:.0f} KB)")


if __name__ == '__main__':
    main()
