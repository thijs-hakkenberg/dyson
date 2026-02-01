/**
 * Questions Services Module
 *
 * Re-exports all question-related functionality for convenient imports.
 */

// Fetcher exports (async loading from markdown files)
export {
	fetchQuestion,
	fetchQuestionById,
	fetchQuestionsForPhase,
	fetchQuestionsForBOMItem,
	fetchQuestionsForBOMItemSlug,
	fetchAllQuestions,
	fetchQuestionIndex,
	clearQuestionsCache
} from './questions-fetchers';

// Parser exports
export {
	parseQuestionFrontmatter,
	parseQuestionFile,
	frontmatterToQuestion,
	getQuestionFilename,
	type QuestionFrontmatter
} from './questions-parsers';

// Service exports (filtering and stats - work on arrays)
export {
	filterQuestions,
	computeQuestionStats,
	extractAllTags,
	filterQuestionsByTag,
	filterCriticalQuestions,
	filterOpenQuestions,
	filterQuestionsByPhase,
	filterQuestionsByBOMItem,
	filterQuestionsByBOMItemSlug,
	findQuestionBySlug,
	findQuestionById,
	type QuestionFilters,
	type QuestionStats
} from './questions-service';
