/**
 * Decision gates for Phase 0 (D-02)
 *
 * D-02 (accepted 2026-10-12): NASA-style programme decisions with TRL and AD² for each critical
 * technology, plus four discriminating gates TRL cannot express (target, demand, economics,
 * licence). Stringency follows reversibility: KDP-0B, the one-way decision, needs TRL 6 in a
 * relevant environment with no waivers for project-ending technologies; internal 0A milestones
 * need TRL 4–5.
 *
 * Built from the WP-A gate proposal (reconciliation/phase-0/trl/round-1/gates-proposal.yaml) by
 * `scripts/build-readiness-data.js`. Gate months are ranges from Phase 0 start, as the panel
 * proposed them; nothing is scheduled by hand. Each criterion carries its ruling status:
 * decided (D-xx, G-x.x), interim (proposed D-xx), pending (an owner ruling with the evidence
 * questions that inform it), or a panel disagreement.
 *
 * The five March 2026 gates are in decision-gates-legacy.ts; `RETIRED_GATES` records why each
 * was retired and what replaced it.
 */

import readiness from '$lib/data/phase-0-readiness.json';
import { MARCH_2026_GATES } from './decision-gates-legacy';
import type { RulingStatus } from './trl-assessment';

export type GateStatus = 'not-started' | 'in-progress' | 'evidence-gathering' | 'ready-for-review' | 'passed' | 'failed' | 'deferred';
export type GateType = 'kdp' | 'review' | 'discriminating';

export interface DecisionCriterion {
	id: string;
	description: string;
	/** Measurable success metric */
	metric: string;
	/** Current best evidence */
	currentEvidence?: string;
	/** Whether this criterion is met */
	met: boolean;
	// D-02 fields
	/** Pass threshold as proposed, with model attributions where they differ */
	threshold?: string | null;
	technologies?: string[];
	trlRequired?: number | null;
	evidenceFrom?: string[];
	proposedBy?: string[];
	disputed?: boolean;
	rulingStatus?: RulingStatus | null;
}

export interface DecisionGate {
	id: string;
	name: string;
	description: string;
	/** Earliest month (from Phase 0 start) the decision can be taken */
	decisionMonth: number;
	/** Latest month in the proposed window */
	decisionMonthMax?: number;
	status: GateStatus;
	/** What happens if this gate passes */
	passOutcome: string;
	/** What happens if this gate fails */
	failOutcome: string;
	/** Measurable criteria for passing */
	criteria: DecisionCriterion[];
	/** Research questions that provide evidence */
	relatedQuestionIds: string[];
	/** TRL assessments relevant to this gate */
	relatedTRLIds: string[];
	/** Technology thread this gate belongs to */
	threadId: string;
	/** Architectural decisions that depend on this gate */
	gatedDecisions: string[];
	// D-02 fields
	type?: GateType;
	proposedBy?: string[];
	disputed?: boolean;
	rulingStatus?: RulingStatus | null;
}

/** A March 2026 gate and why it was retired */
export interface RetiredGate extends DecisionGate {
	retiredReason: string;
	replacedBy: string[];
}

export const GATE_TYPE_LABELS: Record<GateType, string> = {
	kdp: 'Programme decision (KDP)',
	review: 'Review',
	discriminating: 'Discriminating gate'
};

const THREAD: Record<string, string> = {
	'0a-scout-pdr': 'prospecting',
	'g-scout-flight': 'prospecting',
	'g-target': 'prospecting',
	'g-water-pilot': 'isru-materials'
};

const isRq = (id: string) => id.startsWith('rq-');

type RawGate = (typeof readiness.gates)[number];

function toGate(g: RawGate): DecisionGate {
	const criteria: DecisionCriterion[] = g.criteria.map((c) => ({
		id: c.id,
		description: c.description ?? '',
		metric: c.metric ?? '',
		met: false,
		threshold: c.threshold,
		technologies: c.technologies,
		trlRequired: c.trlRequired,
		evidenceFrom: c.evidenceFrom,
		proposedBy: c.proposedBy,
		disputed: c.disputed,
		rulingStatus: c.status as RulingStatus | null
	}));
	const pending = [g.status, ...g.criteria.map((c) => c.status)].flatMap((s) => (s as RulingStatus | null)?.pending ?? []);
	return {
		id: g.id,
		name: g.name,
		description: g.purpose ?? '',
		decisionMonth: g.month.min,
		decisionMonthMax: g.month.max,
		status: 'not-started',
		passOutcome: g.pass ?? '',
		failOutcome: g.fail ?? '',
		criteria,
		relatedQuestionIds: [
			...new Set([...g.criteria.flatMap((c) => c.evidenceFrom.filter(isRq)), ...pending.flatMap((p) => [p.question, ...p.evidence])])
		],
		relatedTRLIds: [...new Set(g.criteria.flatMap((c) => c.technologies))],
		threadId: THREAD[g.id] ?? 'governance-integration',
		gatedDecisions: g.pass ? [g.pass] : [],
		type: g.type as GateType,
		proposedBy: g.proposedBy,
		disputed: g.disputed,
		rulingStatus: g.status as RulingStatus | null
	};
}

export const DECISION_GATES: DecisionGate[] = readiness.gates.map(toGate);

export const RETIRED_GATES: RetiredGate[] = MARCH_2026_GATES.map((g) => {
	const r = readiness.retiredGates.find((x) => x.id === g.id);
	return { ...g, status: 'deferred', retiredReason: r?.reason ?? '', replacedBy: r?.replaced_by ?? [] };
});

/** D-01 … D-05 with their sign-off status */
export const PHASE_0_DECISIONS = readiness.decisions;

/** Gate rulings the owner has confirmed (gate-rulings.yaml) */
export const GATE_RULINGS = readiness.gateRulings;

// === Helper functions ===

/** Get gate by ID (current, or a retired March 2026 gate) */
export function getGate(id: string): DecisionGate | undefined {
	return DECISION_GATES.find((g) => g.id === id) ?? RETIRED_GATES.find((g) => g.id === id);
}

/** Get gates by thread */
export function getGatesByThread(threadId: string): DecisionGate[] {
	return DECISION_GATES.filter((g) => g.threadId === threadId);
}

/** Get gates related to a specific question */
export function getGatesForQuestion(questionId: string): DecisionGate[] {
	return DECISION_GATES.filter((g) => g.relatedQuestionIds.includes(questionId));
}

/** Get gates sorted by decision month */
export function getGateTimeline(): DecisionGate[] {
	return [...DECISION_GATES].sort((a, b) => a.decisionMonth - b.decisionMonth || (a.decisionMonthMax ?? 0) - (b.decisionMonthMax ?? 0));
}

/** "M48–180" or "M36" */
export function gateWindow(g: DecisionGate): string {
	return g.decisionMonthMax != null && g.decisionMonthMax !== g.decisionMonth ? `M${g.decisionMonth}–${g.decisionMonthMax}` : `M${g.decisionMonth}`;
}

/** Compute gate readiness (percentage of criteria met) */
export function getGateReadiness(gate: DecisionGate): number {
	if (gate.criteria.length === 0) return 0;
	const met = gate.criteria.filter((c) => c.met).length;
	return Math.round((met / gate.criteria.length) * 100);
}

/** Criteria whose threshold waits on an owner ruling */
export function getPendingCriteria(gate: DecisionGate): DecisionCriterion[] {
	return gate.criteria.filter((c) => (c.rulingStatus?.pending?.length ?? 0) > 0);
}

/** Get overall decision gate statistics */
export function getGateStats() {
	const gates = DECISION_GATES;
	const totalCriteria = gates.reduce((sum, g) => sum + g.criteria.length, 0);
	const metCriteria = gates.reduce((sum, g) => sum + g.criteria.filter((c) => c.met).length, 0);
	const allCriteria = gates.flatMap((g) => g.criteria);

	return {
		totalGates: gates.length,
		passed: gates.filter((g) => g.status === 'passed').length,
		inProgress: gates.filter((g) => g.status === 'in-progress' || g.status === 'evidence-gathering').length,
		notStarted: gates.filter((g) => g.status === 'not-started').length,
		totalCriteria,
		metCriteria,
		overallReadiness: totalCriteria > 0 ? Math.round((metCriteria / totalCriteria) * 100) : 0,
		nextGate: getGateTimeline().find((g) => g.status !== 'passed') ?? null,
		byType: {
			kdp: gates.filter((g) => g.type === 'kdp').length,
			review: gates.filter((g) => g.type === 'review').length,
			discriminating: gates.filter((g) => g.type === 'discriminating').length
		},
		disputedCriteria: allCriteria.filter((c) => c.disputed).length,
		pendingCriteria: allCriteria.filter((c) => (c.rulingStatus?.pending?.length ?? 0) > 0).length,
		retired: RETIRED_GATES.length
	};
}
