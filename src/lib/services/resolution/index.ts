/**
 * Resolution Services Module
 *
 * Re-exports all resolution-related functionality for convenient imports.
 */

export {
	getResolvedQuestions,
	getOpenQuestions,
	getResolutionHistory,
	getImplicationsForResolution,
	computeResolutionStats,
	filterByResolutionStatus,
	filterByResolutionSource,
	getQuestionsResolvedInRange,
	getAllImplications,
	type ResolutionEvent,
	type Implication,
	type ResolutionStats
} from './resolution-service';
