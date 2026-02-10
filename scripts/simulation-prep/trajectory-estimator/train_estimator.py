#!/usr/bin/env python3
"""
Train a small MLP to estimate delta-V for orbital transfers.

Generates training data from Hohmann transfer calculations,
then trains a 3-layer MLP and exports weight matrices as JSON
for the browser runtime.

Usage:
    pip install -r requirements.txt
    python train_estimator.py

Output:
    static/content/simulation-data/trajectory-estimator/nn-weights.json
"""

import json
import os
import sys

import numpy as np

# Physical constants
MU_SUN = 1.32712440018e20  # m^3/s^2
AU_M = 1.496e11  # meters per AU


def hohmann_delta_v(r1_au: float, r2_au: float) -> float:
    """Delta-V for Hohmann transfer between circular orbits (m/s)."""
    r1 = r1_au * AU_M
    r2 = r2_au * AU_M
    a = (r1 + r2) / 2
    v1 = np.sqrt(MU_SUN / r1)
    v_t1 = np.sqrt(MU_SUN * (2 / r1 - 1 / a))
    v2 = np.sqrt(MU_SUN / r2)
    v_t2 = np.sqrt(MU_SUN * (2 / r2 - 1 / a))
    return abs(v_t1 - v1) + abs(v2 - v_t2)


def hohmann_transfer_time(r1_au: float, r2_au: float) -> float:
    """Hohmann transfer time in days."""
    r1 = r1_au * AU_M
    r2 = r2_au * AU_M
    a = (r1 + r2) / 2
    T = 2 * np.pi * np.sqrt(a**3 / MU_SUN)
    return T / 2 / 86400  # half period in days


def generate_training_data(n_samples: int = 500000, seed: int = 42):
    """Generate training pairs: (|r1|, |r2|, tof) -> delta_V."""
    rng = np.random.RandomState(seed)

    # Random orbital radii between 0.3 and 3.0 AU
    r1 = rng.uniform(0.3, 3.0, n_samples)
    r2 = rng.uniform(0.3, 3.0, n_samples)

    # Time of flight: related to Hohmann time but with variance
    tof = np.array([hohmann_transfer_time(r1[i], r2[i]) for i in range(n_samples)])
    # Add some noise to tof (flights can be shorter or longer than Hohmann)
    tof = tof * rng.uniform(0.5, 2.0, n_samples)
    tof = np.maximum(tof, 10)  # minimum 10 days

    # Target: Hohmann delta-V (ground truth approximation)
    delta_v = np.array([hohmann_delta_v(r1[i], r2[i]) for i in range(n_samples)])

    # Add phasing component proportional to time deviation from ideal
    hohmann_times = np.array([hohmann_transfer_time(r1[i], r2[i]) for i in range(n_samples)])
    time_ratio = tof / np.maximum(hohmann_times, 1)
    phasing_penalty = np.abs(time_ratio - 1.0) * 200  # m/s penalty for non-optimal timing
    delta_v = delta_v + phasing_penalty

    X = np.column_stack([r1, r2, tof])
    y = delta_v

    return X, y


class SimpleNN:
    """Minimal 3-layer MLP implementation using numpy only (for training without PyTorch)."""

    def __init__(self, input_size=3, hidden_size=128, output_size=1, lr=0.001):
        self.lr = lr
        # Xavier initialization
        self.W1 = np.random.randn(input_size, hidden_size) * np.sqrt(2.0 / input_size)
        self.b1 = np.zeros(hidden_size)
        self.W2 = np.random.randn(hidden_size, hidden_size) * np.sqrt(2.0 / hidden_size)
        self.b2 = np.zeros(hidden_size)
        self.W3 = np.random.randn(hidden_size, output_size) * np.sqrt(2.0 / hidden_size)
        self.b3 = np.zeros(output_size)

    def relu(self, x):
        return np.maximum(0, x)

    def relu_grad(self, x):
        return (x > 0).astype(float)

    def forward(self, X):
        self.z1 = X @ self.W1 + self.b1
        self.a1 = self.relu(self.z1)
        self.z2 = self.a1 @ self.W2 + self.b2
        self.a2 = self.relu(self.z2)
        self.z3 = self.a2 @ self.W3 + self.b3
        return self.z3

    def backward(self, X, y_true, y_pred):
        batch_size = X.shape[0]
        # Output gradient (MSE loss)
        dz3 = (y_pred - y_true.reshape(-1, 1)) * 2 / batch_size

        dW3 = self.a2.T @ dz3
        db3 = dz3.sum(axis=0)

        da2 = dz3 @ self.W3.T
        dz2 = da2 * self.relu_grad(self.z2)

        dW2 = self.a1.T @ dz2
        db2 = dz2.sum(axis=0)

        da1 = dz2 @ self.W2.T
        dz1 = da1 * self.relu_grad(self.z1)

        dW1 = X.T @ dz1
        db1 = dz1.sum(axis=0)

        # Gradient descent update
        self.W3 -= self.lr * dW3
        self.b3 -= self.lr * db3
        self.W2 -= self.lr * dW2
        self.b2 -= self.lr * db2
        self.W1 -= self.lr * dW1
        self.b1 -= self.lr * db1

    def get_weights(self):
        return {
            "layers": [
                {
                    "weights": self.W1.tolist(),
                    "biases": self.b1.tolist(),
                },
                {
                    "weights": self.W2.tolist(),
                    "biases": self.b2.tolist(),
                },
                {
                    "weights": self.W3.tolist(),
                    "biases": self.b3.tolist(),
                },
            ]
        }


def train_model(X_train, y_train, X_val, y_val, epochs=50, batch_size=1024):
    """Train the MLP on normalized data."""
    nn = SimpleNN(input_size=3, hidden_size=128, output_size=1, lr=0.0005)

    n_train = X_train.shape[0]
    best_val_loss = float("inf")
    best_weights = None

    for epoch in range(epochs):
        # Shuffle training data
        indices = np.random.permutation(n_train)
        X_shuffled = X_train[indices]
        y_shuffled = y_train[indices]

        epoch_loss = 0
        n_batches = 0

        for start in range(0, n_train, batch_size):
            end = min(start + batch_size, n_train)
            X_batch = X_shuffled[start:end]
            y_batch = y_shuffled[start:end]

            y_pred = nn.forward(X_batch)
            loss = np.mean((y_pred.flatten() - y_batch) ** 2)
            epoch_loss += loss
            n_batches += 1

            nn.backward(X_batch, y_batch, y_pred)

        avg_train_loss = epoch_loss / n_batches

        # Validation
        y_val_pred = nn.forward(X_val)
        val_loss = np.mean((y_val_pred.flatten() - y_val) ** 2)

        if val_loss < best_val_loss:
            best_val_loss = val_loss
            best_weights = nn.get_weights()

        if (epoch + 1) % 5 == 0:
            print(
                f"  Epoch {epoch + 1}/{epochs} - "
                f"Train MSE: {avg_train_loss:.4f}, "
                f"Val MSE: {val_loss:.4f}"
            )

    return best_weights, best_val_loss


def main():
    output_dir = os.path.join(
        os.path.dirname(__file__),
        "..",
        "..",
        "..",
        "static",
        "content",
        "simulation-data",
        "trajectory-estimator",
    )
    os.makedirs(output_dir, exist_ok=True)

    print("Generating training data (500K samples)...")
    X, y = generate_training_data(n_samples=500000)

    # Normalize inputs to [0, 1]
    x_min = X.min(axis=0)
    x_max = X.max(axis=0)
    X_norm = (X - x_min) / (x_max - x_min + 1e-8)

    # Normalize output to [0, 1]
    y_min = y.min()
    y_max = y.max()
    y_norm = (y - y_min) / (y_max - y_min + 1e-8)

    # Split into train/val
    n = len(X_norm)
    split = int(0.9 * n)
    X_train, X_val = X_norm[:split], X_norm[split:]
    y_train, y_val = y_norm[:split], y_norm[split:]

    print(f"Training set: {X_train.shape[0]}, Validation set: {X_val.shape[0]}")
    print(f"Input ranges: r1=[{x_min[0]:.2f},{x_max[0]:.2f}] AU, "
          f"r2=[{x_min[1]:.2f},{x_max[1]:.2f}] AU, "
          f"tof=[{x_min[2]:.0f},{x_max[2]:.0f}] days")
    print(f"Output range: dV=[{y_min:.0f},{y_max:.0f}] m/s")

    print("\nTraining 3-layer MLP (3 -> 128 -> 128 -> 1)...")
    weights, val_loss = train_model(X_train, y_train, X_val, y_val, epochs=50, batch_size=1024)

    if weights is None:
        print("ERROR: Training failed to produce weights")
        sys.exit(1)

    # Add normalization parameters to weights
    weights["inputNorm"] = {
        "min": x_min.tolist(),
        "max": x_max.tolist(),
    }
    weights["outputNorm"] = {
        "min": float(y_min),
        "max": float(y_max),
    }

    # Save weights
    output_path = os.path.join(output_dir, "nn-weights.json")
    with open(output_path, "w") as f:
        json.dump(weights, f)

    file_size = os.path.getsize(output_path)
    print(f"\nSaved weights to {output_path}")
    print(f"  File size: {file_size / 1024:.0f} KB")
    print(f"  Best validation MSE (normalized): {val_loss:.6f}")

    # Generate reference solutions for validation
    print("\nGenerating reference solutions...")
    ref_counts = [100, 500, 1000, 2000, 5000]
    references = {}

    for count in ref_counts:
        # Brute force: compute all transfer costs from L1 to evenly spaced slots
        node_r = 0.99  # L1
        swarm_r = 1.0
        angles = np.linspace(0, 360, count, endpoint=False)

        costs = []
        for angle in angles:
            dv = hohmann_delta_v(node_r, swarm_r)
            phasing = (min(angle, 360 - angle) / 180) * 500  # m/s phasing
            costs.append(dv + phasing)

        # Greedy order: sort by cost
        sorted_costs = sorted(costs)
        total_dv = sum(sorted_costs)

        references[str(count)] = {
            "totalDeltaV_ms": round(total_dv, 2),
            "avgDeltaV_ms": round(total_dv / count, 2),
            "minTransfer_ms": round(min(costs), 2),
            "maxTransfer_ms": round(max(costs), 2),
        }
        print(f"  {count} units: total={total_dv/1000:.1f} km/s, avg={total_dv/count:.1f} m/s")

    ref_path = os.path.join(output_dir, "reference-solutions.json")
    with open(ref_path, "w") as f:
        json.dump(references, f, indent=2)

    print(f"\nSaved reference solutions to {ref_path}")
    print("Done!")


if __name__ == "__main__":
    main()
