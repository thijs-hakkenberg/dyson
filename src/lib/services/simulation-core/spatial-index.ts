/**
 * Spatial Indexing Utilities
 *
 * Efficient spatial indexing for collision detection and neighbor queries
 * in large swarms. Uses a simple 3D grid approach suitable for uniformly
 * distributed swarm elements.
 */

/**
 * 3D position vector
 */
export interface Vector3 {
	x: number;
	y: number;
	z: number;
}

/**
 * Swarm element with position and optional velocity
 */
export interface SwarmElement {
	id: string;
	position: Vector3;
	velocity?: Vector3;
	radius?: number; // Collision radius in meters
}

/**
 * Collision pair
 */
export interface CollisionPair {
	element1: SwarmElement;
	element2: SwarmElement;
	distance: number;
}

/**
 * Calculate Euclidean distance between two points
 */
export function distance(a: Vector3, b: Vector3): number {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	const dz = a.z - b.z;
	return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Calculate squared distance (faster for comparisons)
 */
export function distanceSquared(a: Vector3, b: Vector3): number {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	const dz = a.z - b.z;
	return dx * dx + dy * dy + dz * dz;
}

/**
 * 3D spatial grid for efficient neighbor queries
 */
export class SpatialGrid {
	private cells: Map<string, SwarmElement[]> = new Map();
	private cellSize: number;

	/**
	 * Create a spatial grid
	 * @param cellSize Size of each grid cell in meters
	 */
	constructor(cellSize: number) {
		this.cellSize = cellSize;
	}

	/**
	 * Get cell key for a position
	 */
	private getCellKey(pos: Vector3): string {
		const cx = Math.floor(pos.x / this.cellSize);
		const cy = Math.floor(pos.y / this.cellSize);
		const cz = Math.floor(pos.z / this.cellSize);
		return `${cx},${cy},${cz}`;
	}

	/**
	 * Insert an element into the grid
	 */
	insert(element: SwarmElement): void {
		const key = this.getCellKey(element.position);
		if (!this.cells.has(key)) {
			this.cells.set(key, []);
		}
		this.cells.get(key)!.push(element);
	}

	/**
	 * Insert multiple elements
	 */
	insertAll(elements: SwarmElement[]): void {
		for (const element of elements) {
			this.insert(element);
		}
	}

	/**
	 * Clear all elements
	 */
	clear(): void {
		this.cells.clear();
	}

	/**
	 * Get all neighbors within a radius
	 * @param center Center position
	 * @param radius Search radius
	 * @returns Array of elements within radius
	 */
	getNeighbors(center: Vector3, radius: number): SwarmElement[] {
		const neighbors: SwarmElement[] = [];
		const radiusSq = radius * radius;

		// Calculate cell range to check
		const cellRadius = Math.ceil(radius / this.cellSize);
		const cx = Math.floor(center.x / this.cellSize);
		const cy = Math.floor(center.y / this.cellSize);
		const cz = Math.floor(center.z / this.cellSize);

		// Check all cells in range
		for (let dx = -cellRadius; dx <= cellRadius; dx++) {
			for (let dy = -cellRadius; dy <= cellRadius; dy++) {
				for (let dz = -cellRadius; dz <= cellRadius; dz++) {
					const key = `${cx + dx},${cy + dy},${cz + dz}`;
					const cell = this.cells.get(key);
					if (cell) {
						for (const element of cell) {
							if (distanceSquared(center, element.position) <= radiusSq) {
								neighbors.push(element);
							}
						}
					}
				}
			}
		}

		return neighbors;
	}

	/**
	 * Find all collision pairs within the grid
	 * @param minDistance Minimum safe distance between elements
	 * @returns Array of collision pairs
	 */
	findCollisionPairs(minDistance: number): CollisionPair[] {
		const pairs: CollisionPair[] = [];
		const checked = new Set<string>();
		const minDistSq = minDistance * minDistance;

		for (const [key, cell] of this.cells) {
			// Parse cell coordinates
			const [cx, cy, cz] = key.split(',').map(Number);

			// Check within this cell
			for (let i = 0; i < cell.length; i++) {
				for (let j = i + 1; j < cell.length; j++) {
					const distSq = distanceSquared(cell[i].position, cell[j].position);
					if (distSq < minDistSq) {
						pairs.push({
							element1: cell[i],
							element2: cell[j],
							distance: Math.sqrt(distSq)
						});
					}
				}

				// Check adjacent cells (only in positive direction to avoid duplicates)
				for (let dx = 0; dx <= 1; dx++) {
					for (let dy = 0; dy <= 1; dy++) {
						for (let dz = 0; dz <= 1; dz++) {
							if (dx === 0 && dy === 0 && dz === 0) continue;

							const adjKey = `${cx + dx},${cy + dy},${cz + dz}`;
							const adjCell = this.cells.get(adjKey);
							if (adjCell) {
								for (const adjElement of adjCell) {
									const distSq = distanceSquared(cell[i].position, adjElement.position);
									if (distSq < minDistSq) {
										pairs.push({
											element1: cell[i],
											element2: adjElement,
											distance: Math.sqrt(distSq)
										});
									}
								}
							}
						}
					}
				}
			}
		}

		return pairs;
	}

	/**
	 * Count elements in the grid
	 */
	size(): number {
		let count = 0;
		for (const cell of this.cells.values()) {
			count += cell.length;
		}
		return count;
	}
}

/**
 * Calculate collision probability using gas kinetics model
 * @param numElements Number of elements in swarm
 * @param volumeM3 Total volume occupied by swarm in m³
 * @param crossSectionM2 Collision cross-section per element in m²
 * @param relativeVelocityMs Typical relative velocity in m/s
 * @param timeSeconds Time period in seconds
 * @returns Expected number of collisions
 */
export function collisionProbabilityGasModel(
	numElements: number,
	volumeM3: number,
	crossSectionM2: number,
	relativeVelocityMs: number,
	timeSeconds: number
): number {
	// Number density (elements per m³)
	const n = numElements / volumeM3;

	// Mean free path (simplified)
	const mfp = 1 / (n * crossSectionM2 * Math.sqrt(2));

	// Collision rate per element
	const collisionRatePerElement = relativeVelocityMs / mfp;

	// Expected collisions in swarm (divide by 2 to avoid double-counting)
	const expectedCollisions = (numElements * collisionRatePerElement * timeSeconds) / 2;

	return expectedCollisions;
}

/**
 * Calculate collision probability per element per year
 * @param spacing Average spacing between elements in meters
 * @param elementSizeM Characteristic element size in meters
 * @param velocityUncertaintyMs Velocity uncertainty in m/s
 * @returns Collision probability per element per year
 */
export function annualCollisionProbability(
	spacing: number,
	elementSizeM: number,
	velocityUncertaintyMs: number
): number {
	// Simplified model: probability of encounter per element per year
	// Based on sweep volume over time

	const secondsPerYear = 31557600;
	const crossSection = Math.PI * elementSizeM * elementSizeM; // Circular approximation
	const sweepVolume = crossSection * velocityUncertaintyMs * secondsPerYear;
	const volumePerElement = spacing * spacing * spacing;

	// Probability = swept volume / volume per element (capped at 1)
	return Math.min(1, sweepVolume / volumePerElement);
}

/**
 * Calculate minimum safe spacing for target collision probability
 * @param targetProbability Target collision probability per element per year
 * @param elementSizeM Characteristic element size in meters
 * @param velocityUncertaintyMs Velocity uncertainty in m/s
 * @returns Required spacing in meters
 */
export function minimumSafeSpacing(
	targetProbability: number,
	elementSizeM: number,
	velocityUncertaintyMs: number
): number {
	const secondsPerYear = 31557600;
	const crossSection = Math.PI * elementSizeM * elementSizeM;
	const sweepVolume = crossSection * velocityUncertaintyMs * secondsPerYear;

	// Rearranging: spacing³ = sweepVolume / probability
	return Math.pow(sweepVolume / targetProbability, 1 / 3);
}
