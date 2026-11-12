/**
 * Gate Tunnel: Phase 0 decision gates and technology readiness as a corridor.
 *
 * The tunnel axis is time in months from the (assumed) Phase 0 start. Each
 * decision gate (D-02: KDPs, reviews and discriminating gates) is a ring at the
 * earliest month of its proposed window; the window runs to decisionMonthMax.
 * Its arc segments are its criteria (lit = met). Each technology stands on the
 * tunnel floor in its thread's lane, at the month it is projected to reach its
 * target TRL (today + yearsToTarget, optimistic and pessimistic).
 *
 * A link is timed against the TRL the gate actually requires of that technology
 * (the highest `trlRequired` among the criteria naming it), reached by linear
 * interpolation between the current and target TRL. It is "late" if that TRL
 * arrives after the gate's latest month even on the panel's optimistic estimate
 * (red), and "at risk" if the pessimistic estimate arrives after the window opens
 * (amber). Criteria that name a technology without a TRL requirement (evidence
 * registers, funded plans) give an untimed link. A gate that names the
 * technology in no criterion (old-style data) is timed against the target TRL.
 * This answers "what's blocking gate N?".
 */

import { DECISION_GATES, getGateReadiness, type DecisionGate } from '$lib/services/decision-gates';
import { TRL_ASSESSMENTS, type TRLAssessment } from '$lib/services/trl-assessment';
import { TECHNOLOGY_THREADS } from '$lib/services/critical-path';
import { ASSUMED_PHASE0_START } from './timeline';

/** Scene units per month along the tunnel (−z is forward). */
export const UNITS_PER_MONTH = 0.5;
export const TUNNEL_RADIUS = 6;
export const FLOOR_Y = -TUNNEL_RADIUS * 0.8;
/** Height of one TRL level on a technology column. */
export const TRL_UNIT = 0.5;

export const monthToZ = (m: number) => -m * UNITS_PER_MONTH;

/** Months from the assumed Phase 0 start to a decimal year. */
export function yearToPhase0Month(year: number): number {
	return (year - ASSUMED_PHASE0_START) * 12;
}

export interface TunnelGate {
	gate: DecisionGate;
	readiness: number;
	z: number;
	/** z of the latest month in the gate's window */
	zMax: number;
	/** Technologies this gate depends on that arrive after its latest month */
	late: string[];
	/** …that arrive inside its window */
	atRisk: string[];
}

export interface TunnelTech {
	trl: TRLAssessment;
	/** Projected month the target TRL is reached (nominal / pessimistic) */
	arrival: number;
	arrivalMax: number;
	lane: number;
	x: number;
	z: number;
	threadColor: string;
}

export interface TunnelLink {
	gateId: string;
	techId: string;
	late: boolean;
	atRisk: boolean;
	/** TRL the gate requires of this technology; null = no timing requirement */
	requiredTRL: number | null;
	/** Projected month that TRL is reached (null when untimed) */
	arrivesAt: number | null;
}

/** TRL a gate requires of a technology: highest trlRequired among criteria naming it. */
export function requiredTRL(gate: DecisionGate, trl: TRLAssessment): number | null {
	const naming = gate.criteria.filter((c) => c.technologies?.includes(trl.id));
	if (naming.length === 0) return trl.targetTRL;
	const levels = naming.map((c) => c.trlRequired).filter((x): x is number => typeof x === 'number');
	return levels.length ? Math.max(...levels) : null;
}

/** Years until a technology reaches `level`, interpolated between current and target TRL. */
export function yearsToTRL(trl: TRLAssessment, level: number, pessimistic = false): number {
	const years = pessimistic ? (trl.yearsToTargetMax ?? trl.yearsToTarget) : trl.yearsToTarget;
	if (level <= trl.currentTRL) return 0;
	const span = Math.max(1, trl.targetTRL - trl.currentTRL);
	return years * Math.min(1, (level - trl.currentTRL) / span);
}

export interface TunnelLayout {
	gates: TunnelGate[];
	techs: TunnelTech[];
	links: TunnelLink[];
	todayMonth: number;
	startMonth: number;
	endMonth: number;
	lanes: { threadId: string; name: string; color: string; x: number }[];
}

export function layoutTunnel(
	todayYear: number,
	gates: DecisionGate[] = DECISION_GATES,
	trls: TRLAssessment[] = TRL_ASSESSMENTS
): TunnelLayout {
	const todayMonth = yearToPhase0Month(todayYear);
	const threads = TECHNOLOGY_THREADS.filter((t) => trls.some((a) => a.threadId === t.id));
	const laneWidth = (TUNNEL_RADIUS * 1.2) / Math.max(1, threads.length - 1);
	const lanes = threads.map((t, i) => ({
		threadId: t.id,
		name: t.name,
		color: t.color,
		x: -TUNNEL_RADIUS * 0.6 + i * laneWidth
	}));

	const techs: TunnelTech[] = trls.map((trl) => {
		const lane = Math.max(
			0,
			lanes.findIndex((l) => l.threadId === trl.threadId)
		);
		const arrival = todayMonth + trl.yearsToTarget * 12;
		const arrivalMax = todayMonth + (trl.yearsToTargetMax ?? trl.yearsToTarget) * 12;
		return {
			trl,
			arrival,
			arrivalMax,
			lane,
			x: lanes[lane]?.x ?? 0,
			z: monthToZ(arrival),
			threadColor: lanes[lane]?.color ?? '#94a3b8'
		};
	});
	// Separate techs that land on the same lane and nearly the same month
	const byLane = new Map<number, TunnelTech[]>();
	for (const t of techs) byLane.set(t.lane, [...(byLane.get(t.lane) ?? []), t]);
	for (const group of byLane.values()) {
		group.sort((a, b) => a.arrival - b.arrival);
		for (let i = 1; i < group.length; i++) {
			if (Math.abs(group[i].z - group[i - 1].z) < 1.2) group[i].x += 0.55 * (i % 2 ? 1 : -1);
		}
	}

	const byId = new Map(techs.map((t) => [t.trl.id, t]));
	const links: TunnelLink[] = [];
	const tunnelGates: TunnelGate[] = gates.map((gate) => {
		const last = gate.decisionMonthMax ?? gate.decisionMonth;
		const late: string[] = [];
		const atRisk: string[] = [];
		for (const id of gate.relatedTRLIds) {
			const t = byId.get(id);
			if (!t) continue;
			const req = requiredTRL(gate, t.trl);
			const arrivesAt = req === null ? null : todayMonth + yearsToTRL(t.trl, req) * 12;
			const arrivesAtMax = req === null ? null : todayMonth + yearsToTRL(t.trl, req, true) * 12;
			const isLate = arrivesAt !== null && arrivesAt > last;
			const isAtRisk = arrivesAtMax !== null && !isLate && arrivesAtMax > gate.decisionMonth;
			if (isLate) late.push(id);
			if (isAtRisk) atRisk.push(id);
			links.push({ gateId: gate.id, techId: id, late: isLate, atRisk: isAtRisk, requiredTRL: req, arrivesAt });
		}
		return { gate, readiness: getGateReadiness(gate), z: monthToZ(gate.decisionMonth), zMax: monthToZ(last), late, atRisk };
	});

	const endMonth = Math.max(...tunnelGates.map((g) => g.gate.decisionMonthMax ?? g.gate.decisionMonth), ...techs.map((t) => t.arrivalMax));
	return {
		gates: tunnelGates.sort((a, b) => a.gate.decisionMonth - b.gate.decisionMonth),
		techs,
		links,
		todayMonth,
		startMonth: Math.min(todayMonth, 0),
		endMonth: endMonth + 6,
		lanes
	};
}

/** Calendar year for a Phase 0 month (assumed start). */
export function phase0MonthToYear(m: number): number {
	return ASSUMED_PHASE0_START + m / 12;
}
