/**
 * Phase 0 plan after the October 2026 re-assessment: the agreed architecture changes, each
 * model's phase cost, the proposed BOM delta (round-2 reconciliation §2, §3.17, §4) and D-01's
 * assumptions with their falsifiers. Generated into src/lib/data/phase-0-readiness.json by
 * scripts/build-readiness-data.js; figures are the models' own, attributed, never merged.
 */

import readiness from '$lib/data/phase-0-readiness.json';

export const PHASE_0_ARCHITECTURE = readiness.architecture;
export const PHASE_0_ASSUMPTIONS = readiness.assumptions;
export const PHASE_0_DECISION_LIST = readiness.decisions;

/** D-01, the decision that frames Phase 0 */
export const D01 = readiness.decisions.find((d) => d.id === 'D-01')!;
