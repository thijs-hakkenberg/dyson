/**
 * The stellar engine's plasma loop (Caplan-type), from the Phase 3b consensus:
 *
 *   lift ──► collection ring ──► helium separation ──┬─► He exhaust, 0.01c, away (thrust)
 *   10¹² kg/s    5–8 R☉            0.05–0.15 AU         └─► H return beam, ≤0.005c, into the Sun
 *
 * The engine holds station: the hydrogen beam's push on it balances gravity and
 * the helium jet's reaction. Net, the Sun gains the momentum the helium exhaust
 * carries away, in the opposite direction, so the engine sits on the trailing
 * side of the thrust axis and the exhaust leaves backwards.
 *
 * Flow scales with the least-built stage (a chain runs at its bottleneck).
 */

import { itemProgress } from './progress';

const C = 299_792_458;

/** Consensus figures, with where they come from. */
export const PLASMA = {
	/** Lifted solar plasma (kg/s): all three models, mass-lifting-systems */
	liftKgS: 1e12,
	/** Mass fractions of the lifted plasma (~solar composition), mass-lifting-systems */
	xH: 0.735,
	xHe: 0.249,
	/** Helium product (kg/s), helium-separation-plant */
	heKgS: 2.5e11,
	/** Helium exhaust velocity, all models: 0.01c */
	vHe: 0.01 * C,
	/** Hydrogen return velocity, "≤0.005c" (Claude's figure) */
	vH: 0.005 * C,
	/** Collection ring radius (solar radii), Claude / GPT manifold hubs */
	ringRsun: [5, 8] as const,
	/** Processing zone (AU), helium-separation-plant */
	zoneAU: [0.05, 0.15] as const
};

/** Chain stages in flow order; the flow runs at the least-deployed one. */
export const PLASMA_STAGES = [
	{ bomId: 'bom-3b-4', label: 'Mass lifting' },
	{ bomId: 'bom-3b-5', label: 'Helium separation' },
	{ bomId: 'bom-3b-6', label: 'EM accelerators' },
	{ bomId: 'bom-3b-2', label: 'Thermonuclear jet' }
] as const;

export interface PlasmaFlow {
	/** Fraction of the design flow (0–1), set by the bottleneck stage */
	fraction: number;
	bottleneck: string | null;
	liftKgS: number;
	heKgS: number;
	/** Hydrogen returned to the Sun (kg/s): lifted minus helium product (metals ignored) */
	hKgS: number;
	/** Momentum flux of the helium exhaust (N): the net push on the Sun */
	thrustN: number;
	/** Momentum flux of the hydrogen beam into the Sun (N) */
	hBeamN: number;
	/** Kinetic power in each beam (W) */
	hePowerW: number;
	hPowerW: number;
}

export function plasmaFlowAt(year: number): PlasmaFlow {
	let fraction = 1;
	let bottleneck: string | null = null;
	for (const s of PLASMA_STAGES) {
		const p = itemProgress(s.bomId, 'phase-3b', year);
		if (p < fraction) {
			fraction = p;
			bottleneck = s.label;
		}
	}
	fraction = Math.max(0, fraction);
	const liftKgS = PLASMA.liftKgS * fraction;
	const heKgS = PLASMA.heKgS * fraction;
	const hKgS = Math.max(0, liftKgS * (1 - 0.016) - heKgS);
	return {
		fraction,
		bottleneck: fraction < 1 ? bottleneck : null,
		liftKgS,
		heKgS,
		hKgS,
		thrustN: heKgS * PLASMA.vHe,
		hBeamN: hKgS * PLASMA.vH,
		hePowerW: 0.5 * heKgS * PLASMA.vHe ** 2,
		hPowerW: 0.5 * hKgS * PLASMA.vH ** 2
	};
}
